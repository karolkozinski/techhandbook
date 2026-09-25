#!/usr/bin/env python3
import hashlib
import hmac
import json
import os
import re
import sqlite3
import uuid
from datetime import datetime, timedelta, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

DB_PATH = Path(os.environ.get("REVIEW_DB_PATH", "/data/reviews.sqlite3"))
HOST = os.environ.get("REVIEW_API_HOST", "0.0.0.0")
PORT = int(os.environ.get("REVIEW_API_PORT", "8081"))
ENABLED = os.environ.get("REVIEW_API_ENABLED", "false").strip().lower() in {"1", "true", "yes", "on"}
STAMP_SECRET = os.environ.get("REVIEW_STAMP_SECRET", "")
ACCESS_TOKEN = os.environ.get("REVIEW_ACCESS_TOKEN", "")
MAX_BODY_BYTES = 16 * 1024
RATE_LIMIT_PER_HOUR = int(os.environ.get("REVIEW_RATE_LIMIT_PER_HOUR", "30"))

ARTICLE_ID_RE = re.compile(r"^doc-[0-9]+$")
LANGUAGE_RE = re.compile(r"^[a-z]{2,3}(?:-[A-Z]{2})?$")

TARGET_TYPES = {"heading", "paragraph", "list-item", "code-block", "table"}
REASONS = {"outdated", "incorrect", "unclear", "incomplete", "broken", "typo-format"}

SCHEMA = """
CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY,
    schema_version INTEGER NOT NULL DEFAULT 1,
    article_id TEXT NOT NULL,
    language TEXT NOT NULL,
    route TEXT NOT NULL,
    section_id TEXT NOT NULL,
    target_type TEXT NOT NULL,
    block_index INTEGER NOT NULL,
    text_snapshot TEXT NOT NULL,
    reason TEXT NOT NULL,
    reporter_stamp TEXT NOT NULL,
    created_at TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open',
    resolved_at TEXT,
    analysis_status TEXT,
    analysis_result TEXT,
    analysis_model TEXT,
    analyzed_at TEXT,
    analysis_error TEXT
);

CREATE INDEX IF NOT EXISTS idx_reports_status_created
    ON reports(status, created_at);

CREATE INDEX IF NOT EXISTS idx_reports_article
    ON reports(article_id, language, section_id);

CREATE INDEX IF NOT EXISTS idx_reports_reporter_stamp
    ON reports(reporter_stamp);

CREATE INDEX IF NOT EXISTS idx_reports_rate_limit
    ON reports(reporter_stamp, created_at);
"""


def connect():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA journal_mode=WAL")
    connection.execute("PRAGMA busy_timeout=5000")
    return connection


def init_db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with connect() as connection:
        connection.executescript(SCHEMA)
        columns = {row["name"] for row in connection.execute("PRAGMA table_info(reports)")}
        migrations = {
            "analysis_status": "ALTER TABLE reports ADD COLUMN analysis_status TEXT",
            "analysis_result": "ALTER TABLE reports ADD COLUMN analysis_result TEXT",
            "analysis_model": "ALTER TABLE reports ADD COLUMN analysis_model TEXT",
            "analyzed_at": "ALTER TABLE reports ADD COLUMN analyzed_at TEXT",
            "analysis_error": "ALTER TABLE reports ADD COLUMN analysis_error TEXT",
        }
        for column, statement in migrations.items():
            if column not in columns:
                connection.execute(statement)


def error(message, field=None):
    payload = {"error": message}
    if field:
        payload["field"] = field
    return payload


def normalize_user_agent(value):
    value = re.sub(r"\s+", " ", (value or "").strip().lower())
    return value[:512] or "unknown"


def reporter_stamp(client_ip, user_agent):
    source = "\0".join((STAMP_SECRET, client_ip, normalize_user_agent(user_agent)))
    return hashlib.sha256(source.encode("utf-8")).hexdigest()


def authorized(headers):
    auth = headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return False
    supplied = auth[7:]
    return bool(ACCESS_TOKEN) and hmac.compare_digest(supplied, ACCESS_TOKEN)


def validate(payload):
    if not isinstance(payload, dict):
        return None, error("JSON body must be an object")

    allowed = {
        "article_id",
        "language",
        "route",
        "section_id",
        "target_type",
        "block_index",
        "text_snapshot",
        "reason",
    }
    unknown = sorted(set(payload) - allowed)
    if unknown:
        return None, error(f"Unknown field: {unknown[0]}", unknown[0])

    missing = sorted(allowed - set(payload))
    if missing:
        return None, error(f"Missing field: {missing[0]}", missing[0])

    article_id = payload["article_id"]
    if not isinstance(article_id, str) or not ARTICLE_ID_RE.fullmatch(article_id):
        return None, error("Invalid article_id", "article_id")

    language = payload["language"]
    if not isinstance(language, str) or not LANGUAGE_RE.fullmatch(language):
        return None, error("Invalid language", "language")

    route = payload["route"]
    if not isinstance(route, str) or not route.startswith("/") or len(route) > 512:
        return None, error("Invalid route", "route")

    section_id = payload["section_id"]
    if not isinstance(section_id, str) or not section_id.strip() or len(section_id) > 256:
        return None, error("Invalid section_id", "section_id")

    target_type = payload["target_type"]
    if target_type not in TARGET_TYPES:
        return None, error("Invalid target_type", "target_type")

    block_index = payload["block_index"]
    if isinstance(block_index, bool) or not isinstance(block_index, int) or block_index < 0:
        return None, error("Invalid block_index", "block_index")

    text_snapshot = payload["text_snapshot"]
    if not isinstance(text_snapshot, str):
        return None, error("Invalid text_snapshot", "text_snapshot")
    text_snapshot = text_snapshot.strip()
    if not text_snapshot or len(text_snapshot) > 4000:
        return None, error("text_snapshot must contain 1-4000 characters", "text_snapshot")

    reason = payload["reason"]
    if reason not in REASONS:
        return None, error("Invalid reason", "reason")

    return {
        "article_id": article_id,
        "language": language,
        "route": route,
        "section_id": section_id.strip(),
        "target_type": target_type,
        "block_index": block_index,
        "text_snapshot": text_snapshot,
        "reason": reason,
    }, None


def find_duplicate(connection, data, stamp):
    return connection.execute(
        """
        SELECT id, created_at, status
        FROM reports
        WHERE reporter_stamp = ?
          AND article_id = ?
          AND language = ?
          AND section_id = ?
          AND target_type = ?
          AND block_index = ?
          AND reason = ?
          AND status = 'open'
        ORDER BY created_at DESC
        LIMIT 1
        """,
        (
            stamp,
            data["article_id"],
            data["language"],
            data["section_id"],
            data["target_type"],
            data["block_index"],
            data["reason"],
        ),
    ).fetchone()


def rate_limit_exceeded(connection, stamp, now):
    cutoff = (now - timedelta(hours=1)).isoformat().replace("+00:00", "Z")
    row = connection.execute(
        """
        SELECT COUNT(*) AS count
        FROM reports
        WHERE reporter_stamp = ?
          AND created_at >= ?
        """,
        (stamp, cutoff),
    ).fetchone()
    return row["count"] >= RATE_LIMIT_PER_HOUR


class Handler(BaseHTTPRequestHandler):
    server_version = "TechHandbookReviewAPI/1"

    def log_message(self, fmt, *args):
        print(f"{self.address_string()} - {fmt % args}", flush=True)

    def send_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/healthz":
            self.send_json(
                200,
                {
                    "status": "ok",
                    "enabled": ENABLED,
                    "stamp_secret_configured": bool(STAMP_SECRET),
                    "access_token_configured": bool(ACCESS_TOKEN),
                },
            )
            return

        if self.path == "/review-mode":
            if not ENABLED:
                self.send_json(503, {"error": "Review API is disabled"})
                return
            if not authorized(self.headers):
                self.send_json(401, {"error": "Unauthorized"})
                return
            self.send_json(200, {"review_mode": True})
            return

        self.send_json(404, {"error": "Not found"})

    def do_POST(self):
        if self.path != "/report":
            self.send_json(404, {"error": "Not found"})
            return

        if not ENABLED:
            self.send_json(503, {"error": "Review API is disabled"})
            return

        if not STAMP_SECRET:
            self.send_json(503, {"error": "Review API stamp secret is not configured"})
            return

        if not authorized(self.headers):
            self.send_json(401, {"error": "Unauthorized"})
            return

        content_type = self.headers.get("Content-Type", "").split(";", 1)[0].strip().lower()
        if content_type != "application/json":
            self.send_json(415, {"error": "Content-Type must be application/json"})
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self.send_json(400, {"error": "Invalid Content-Length"})
            return

        if length <= 0:
            self.send_json(400, {"error": "Empty request body"})
            return
        if length > MAX_BODY_BYTES:
            self.send_json(413, {"error": "Request body too large"})
            return

        try:
            payload = json.loads(self.rfile.read(length))
        except (json.JSONDecodeError, UnicodeDecodeError):
            self.send_json(400, {"error": "Invalid JSON"})
            return

        data, validation_error = validate(payload)
        if validation_error:
            self.send_json(422, validation_error)
            return

        client_ip = (self.headers.get("X-Real-IP") or self.client_address[0]).strip()
        stamp = reporter_stamp(client_ip, self.headers.get("User-Agent"))
        now = datetime.now(timezone.utc)
        created_at = now.isoformat().replace("+00:00", "Z")

        try:
            with connect() as connection:
                duplicate = find_duplicate(connection, data, stamp)
                if duplicate:
                    self.send_json(
                        200,
                        {
                            "id": duplicate["id"],
                            "created_at": duplicate["created_at"],
                            "status": duplicate["status"],
                            "duplicate": True,
                        },
                    )
                    return

                if rate_limit_exceeded(connection, stamp, now):
                    self.send_json(
                        429,
                        {
                            "error": "Too many review reports",
                            "retry_after_seconds": 3600,
                        },
                    )
                    return

                report_id = "rpt-" + uuid.uuid4().hex
                connection.execute(
                    """
                    INSERT INTO reports (
                        id, schema_version, article_id, language, route, section_id,
                        target_type, block_index, text_snapshot, reason,
                        reporter_stamp, created_at, status
                    ) VALUES (?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'open')
                    """,
                    (
                        report_id,
                        data["article_id"],
                        data["language"],
                        data["route"],
                        data["section_id"],
                        data["target_type"],
                        data["block_index"],
                        data["text_snapshot"],
                        data["reason"],
                        stamp,
                        created_at,
                    ),
                )
        except sqlite3.Error:
            self.send_json(500, {"error": "Could not save report"})
            return

        self.send_json(
            201,
            {
                "id": report_id,
                "created_at": created_at,
                "status": "open",
                "duplicate": False,
            },
        )


def main():
    init_db()
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(
        f"Review API listening on {HOST}:{PORT}; database={DB_PATH}; enabled={ENABLED}",
        flush=True,
    )
    server.serve_forever()


if __name__ == "__main__":
    main()
