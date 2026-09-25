#!/usr/bin/env python3
import argparse
import sqlite3
import sys
from datetime import datetime, timezone
from pathlib import Path

DEFAULT_DB = "/data/reviews.sqlite3"
STATUSES = ("open", "resolved", "dismissed")
REASONS = ("outdated", "incorrect", "unclear", "incomplete", "broken", "typo-format")


def connect(path):
    db = Path(path)
    if not db.exists():
        raise SystemExit(f"Database not found: {db}")
    connection = sqlite3.connect(db)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA busy_timeout=5000")
    return connection


def short(value, limit=90):
    text = " ".join((value or "").split())
    return text if len(text) <= limit else text[: limit - 1] + "…"


def print_row(row):
    print(f"{row['id']}  [{row['status']}]  {row['article_id']}  {row['language']}  {row['reason']}")
    print(f"  {row['route']}#{row['section_id']}")
    print(f"  {row['target_type']}[{row['block_index']}]  {short(row['text_snapshot'])}")
    print(f"  created: {row['created_at']}  reporter: {row['reporter_stamp'][:12]}…")
    if row["resolved_at"]:
        print(f"  resolved: {row['resolved_at']}")
    print()


def cmd_list(args):
    clauses = ["1=1"]
    params = []

    if args.status != "all":
        clauses.append("status = ?")
        params.append(args.status)
    if args.article:
        clauses.append("article_id = ?")
        params.append(args.article)
    if args.reason:
        clauses.append("reason = ?")
        params.append(args.reason)
    if args.language:
        clauses.append("language = ?")
        params.append(args.language)

    query = f"""
        SELECT *
        FROM reports
        WHERE {' AND '.join(clauses)}
        ORDER BY
          CASE status WHEN 'open' THEN 0 WHEN 'resolved' THEN 1 ELSE 2 END,
          created_at DESC
        LIMIT ?
    """
    params.append(args.limit)

    with connect(args.db) as connection:
        rows = connection.execute(query, params).fetchall()

    if not rows:
        print("No reports.")
        return

    for row in rows:
        print_row(row)

    print(f"{len(rows)} report(s)")


def cmd_show(args):
    with connect(args.db) as connection:
        row = connection.execute("SELECT * FROM reports WHERE id = ?", (args.id,)).fetchone()

    if not row:
        raise SystemExit(f"Report not found: {args.id}")

    print(f"id:             {row['id']}")
    print(f"status:         {row['status']}")
    print(f"article:        {row['article_id']}")
    print(f"language:       {row['language']}")
    print(f"route:          {row['route']}")
    print(f"section:        {row['section_id']}")
    print(f"target:         {row['target_type']}[{row['block_index']}]")
    print(f"reason:         {row['reason']}")
    print(f"created_at:     {row['created_at']}")
    print(f"resolved_at:    {row['resolved_at'] or '-'}")
    print(f"reporter_stamp: {row['reporter_stamp']}")
    print()
    print("text_snapshot:")
    print(row["text_snapshot"])


def set_status(args, status):
    now = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    with connect(args.db) as connection:
        row = connection.execute("SELECT id, status FROM reports WHERE id = ?", (args.id,)).fetchone()
        if not row:
            raise SystemExit(f"Report not found: {args.id}")

        connection.execute(
            "UPDATE reports SET status = ?, resolved_at = ? WHERE id = ?",
            (status, now, args.id),
        )

    print(f"{args.id}: {row['status']} -> {status}")


def cmd_resolve(args):
    set_status(args, "resolved")


def cmd_dismiss(args):
    set_status(args, "dismissed")


def build_parser():
    parser = argparse.ArgumentParser(description="TechHandbook review report CLI")
    parser.add_argument("--db", default=DEFAULT_DB, help=f"SQLite database path (default: {DEFAULT_DB})")
    sub = parser.add_subparsers(dest="command", required=True)

    list_parser = sub.add_parser("list", help="List review reports")
    list_parser.add_argument("--status", choices=("all",) + STATUSES, default="open")
    list_parser.add_argument("--article", help="Filter by stable article ID, e.g. doc-023")
    list_parser.add_argument("--reason", choices=REASONS)
    list_parser.add_argument("--language", help="Filter by language, e.g. pl or en")
    list_parser.add_argument("--limit", type=int, default=100)
    list_parser.set_defaults(func=cmd_list)

    show_parser = sub.add_parser("show", help="Show one report with full text snapshot")
    show_parser.add_argument("id")
    show_parser.set_defaults(func=cmd_show)

    resolve_parser = sub.add_parser("resolve", help="Mark a report as resolved")
    resolve_parser.add_argument("id")
    resolve_parser.set_defaults(func=cmd_resolve)

    dismiss_parser = sub.add_parser("dismiss", help="Mark a report as dismissed")
    dismiss_parser.add_argument("id")
    dismiss_parser.set_defaults(func=cmd_dismiss)

    return parser


def main():
    parser = build_parser()
    args = parser.parse_args()
    if getattr(args, "limit", 1) < 1:
        parser.error("--limit must be >= 1")
    args.func(args)


if __name__ == "__main__":
    main()
