#!/usr/bin/env python3
"""Build and validate TechHandbook's runtime content index."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
CONTENT_ROOT = ROOT / "md"
RELATIONS_PATH = ROOT / "content-relations.json"
INDEX_PATH = ROOT / "content-index.json"

REQUIRED = {"id", "title", "slug", "description", "lang", "audience", "published", "updated"}
ALLOWED = REQUIRED | {"tags", "ai", "seo"}
ID_RE = re.compile(r"^[a-z][a-z0-9-]*-[0-9]{3,}$")
SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
LINK_RE = re.compile(r"techhandbook:([a-z][a-z0-9-]*-[0-9]{3,})")
H1_RE = re.compile(r"^#\s+(.+?)\s*$", re.MULTILINE)
MANUAL_TOC_RE = re.compile(r"^##\s+(?:Spis treści|Mapa kompendium|Table of contents|Handbook map)\s*$", re.MULTILINE | re.IGNORECASE)


class ContentError(Exception):
    pass


def read_article(path: Path) -> tuple[dict, str]:
    text = path.read_text(encoding="utf-8").replace("\r\n", "\n").replace("\r", "\n")
    if not text.startswith("---\n"):
        raise ContentError(f"{path}: missing YAML front matter")

    end = text.find("\n---\n", 4)
    if end < 0:
        raise ContentError(f"{path}: unterminated YAML front matter")

    raw = text[4:end]
    body = text[end + 5 :].lstrip("\n")
    meta = yaml.safe_load(raw)

    if not isinstance(meta, dict):
        raise ContentError(f"{path}: front matter must be a mapping")

    return meta, body


def category_for(path: Path, lang: str, audience: str) -> str:
    rel = path.relative_to(CONTENT_ROOT)
    parts = rel.parts

    if not parts or parts[0] != lang:
        raise ContentError(f"{path}: lang={lang!r} does not match directory")

    inside = list(parts[1:-1])
    if audience == "junior":
        if not inside or inside[0] != "junior":
            raise ContentError(f"{path}: junior article must live below md/{lang}/junior/")
        return "junior"

    if inside and inside[0] == "junior":
        raise ContentError(f"{path}: standard article cannot live below a junior directory")

    return "/".join(inside)


def validate_meta(path: Path, meta: dict, body: str) -> None:
    missing = REQUIRED - set(meta)
    extra = set(meta) - ALLOWED

    if missing:
        raise ContentError(f"{path}: missing fields: {', '.join(sorted(missing))}")
    if extra:
        raise ContentError(f"{path}: unsupported fields: {', '.join(sorted(extra))}")

    if not isinstance(meta["id"], str) or not ID_RE.fullmatch(meta["id"]):
        raise ContentError(f"{path}: invalid id")
    if not isinstance(meta["title"], str) or not meta["title"].strip():
        raise ContentError(f"{path}: invalid title")
    if not isinstance(meta["slug"], str) or not SLUG_RE.fullmatch(meta["slug"]):
        raise ContentError(f"{path}: invalid slug")
    if not isinstance(meta["description"], str) or not meta["description"].strip():
        raise ContentError(f"{path}: invalid description")
    if not isinstance(meta["lang"], str) or not re.fullmatch(r"[a-z]{2}(?:-[A-Z]{2})?", meta["lang"]):
        raise ContentError(f"{path}: invalid lang")
    if meta["audience"] not in {"standard", "junior"}:
        raise ContentError(f"{path}: invalid audience")

    published = str(meta["published"])
    updated = str(meta["updated"])
    if not DATE_RE.fullmatch(published) or not DATE_RE.fullmatch(updated):
        raise ContentError(f"{path}: published/updated must use YYYY-MM-DD")
    if updated < published:
        raise ContentError(f"{path}: updated is earlier than published")

    tags = meta.get("tags", [])
    if not isinstance(tags, list) or any(not isinstance(x, str) or not x.strip() for x in tags):
        raise ContentError(f"{path}: tags must be a list of non-empty strings")
    if len(tags) != len(set(tags)):
        raise ContentError(f"{path}: duplicate tags")

    ai = meta.get("ai")
    if ai is not None:
        allowed_ai = {"generated", "assisted", "human_reviewed"}
        if not isinstance(ai, dict) or set(ai) - allowed_ai:
            raise ContentError(f"{path}: invalid ai metadata")
        if any(not isinstance(value, bool) for value in ai.values()):
            raise ContentError(f"{path}: ai values must be booleans")

    seo = meta.get("seo")
    if seo is not None:
        allowed_seo = {"index", "ads"}
        if not isinstance(seo, dict) or set(seo) - allowed_seo:
            raise ContentError(f"{path}: invalid seo metadata")
        if any(not isinstance(value, bool) for value in seo.values()):
            raise ContentError(f"{path}: seo values must be booleans")

    category_for(path, meta["lang"], meta["audience"])

    h1 = H1_RE.search(body)
    if not h1:
        raise ContentError(f"{path}: missing H1")
    if h1.group(1).strip() != meta["title"].strip():
        raise ContentError(f"{path}: H1 does not match title")

    if MANUAL_TOC_RE.search(body):
        raise ContentError(
            f"{path}: manual table of contents is not allowed; TOC is generated automatically"
        )


def load_relations() -> dict:
    data = json.loads(RELATIONS_PATH.read_text(encoding="utf-8"))
    if not isinstance(data, dict) or not isinstance(data.get("related"), dict):
        raise ContentError("content-relations.json: invalid structure")
    return data


def load_articles() -> list[dict]:
    articles = []
    for path in sorted(CONTENT_ROOT.rglob("*.md")):
        meta, body = read_article(path)
        validate_meta(path, meta, body)
        articles.append({"path": path, "meta": meta, "body": body})
    return articles


def validate_global(articles: list[dict], relations: dict) -> None:
    ids = set()
    by_key = set()
    slugs = set()
    availability = set()
    standard_languages = set()
    standard_by_id = {}

    for article in articles:
        meta = article["meta"]
        path = article["path"]
        key = (meta["id"], meta["lang"], meta["audience"])
        slug_key = (meta["lang"], meta["audience"], meta["slug"])

        if key in by_key:
            raise ContentError(f"{path}: duplicate id/lang/audience combination {key}")
        by_key.add(key)

        if slug_key in slugs:
            raise ContentError(f"{path}: duplicate slug in lang/audience: {meta['slug']}")
        slugs.add(slug_key)
        ids.add(meta["id"])
        availability.add(key)

        if meta["audience"] == "standard":
            standard_languages.add(meta["lang"])
            standard_by_id.setdefault(meta["id"], set()).add(meta["lang"])

    for article_id, languages in standard_by_id.items():
        if languages != standard_languages:
            missing = sorted(standard_languages - languages)
            raise ContentError(f"standard article {article_id}: missing translations: {', '.join(missing)}")

    relation_map = relations["related"]
    for article_id, related in relation_map.items():
        if article_id not in ids:
            raise ContentError(f"relations: unknown article id {article_id}")
        if not isinstance(related, list):
            raise ContentError(f"relations: {article_id} must map to a list")
        if len(related) != len(set(related)):
            raise ContentError(f"relations: duplicate target for {article_id}")
        if article_id in related:
            raise ContentError(f"relations: self-reference for {article_id}")
        if not 4 <= len(related) <= 6:
            raise ContentError(f"relations: {article_id} must have 4-6 related articles")
        for target in related:
            if target not in ids:
                raise ContentError(f"relations: {article_id} points to missing {target}")

    for article in articles:
        meta = article["meta"]
        if meta["audience"] == "standard" and meta["id"] not in relation_map:
            raise ContentError(f"{article['path']}: standard article has no related mapping")

        for target in LINK_RE.findall(article["body"]):
            target_key = (target, meta["lang"], meta["audience"])
            if target_key not in availability:
                raise ContentError(
                    f"{article['path']}: internal reference {target} has no target "
                    f"for lang={meta['lang']} audience={meta['audience']}"
                )


def article_route(meta: dict, category: str) -> str:
    parts = [meta["lang"]]
    if category:
        parts.extend(part for part in category.split("/") if part)
    parts.append(meta["slug"])
    return "/" + "/".join(parts)


def build_index(articles: list[dict], relations: dict) -> dict:
    relation_map = relations["related"]
    entries = []
    routes = set()

    for article in articles:
        path = article["path"]
        meta = article["meta"]
        rel_path = path.relative_to(ROOT).as_posix()

        category = category_for(path, meta["lang"], meta["audience"])
        route = article_route(meta, category)
        if route in routes:
            raise ContentError(f"{path}: duplicate generated route {route}")
        routes.add(route)

        item = {
            "id": meta["id"],
            "name": path.name,
            "title": meta["title"],
            "slug": meta["slug"],
            "route": route,
            "index": meta.get("seo", {}).get("index", True),
            "path": rel_path,
            "category": category,
            "tags": meta.get("tags", []),
            "language": meta["lang"],
            "audience": meta["audience"],
        }

        if meta["id"] in relation_map:
            item["related"] = relation_map[meta["id"]]

        entries.append(item)

    lang_order = {"pl": 0, "en": 1}
    audience_order = {"standard": 0, "junior": 1}
    entries.sort(key=lambda x: (
        lang_order.get(x["language"], 99),
        audience_order.get(x["audience"], 99),
        x["path"],
    ))

    languages = sorted({x["language"] for x in entries}, key=lambda x: lang_order.get(x, 99))
    updated = max(
        [str(a["meta"]["updated"]) for a in articles] + [str(relations.get("updated", "0000-00-00"))]
    )

    return {
        "version": 17,
        "updated": updated,
        "root": "md/pl",
        "files": entries,
        "defaultLanguage": "pl",
        "languages": languages,
        "roots": {lang: f"md/{lang}" for lang in languages},
        "modes": ["standard", "junior"],
        "juniorRoots": {lang: f"md/{lang}/junior" for lang in languages},
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--write", action="store_true", help="write content-index.json")
    group.add_argument("--check", action="store_true", help="verify content-index.json is current")
    args = parser.parse_args()

    try:
        articles = load_articles()
        relations = load_relations()
        validate_global(articles, relations)
        generated = build_index(articles, relations)
    except (ContentError, OSError, ValueError, yaml.YAMLError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    rendered = json.dumps(generated, ensure_ascii=False, indent=2) + "\n"

    if args.write:
        INDEX_PATH.write_text(rendered, encoding="utf-8")
        print(f"Wrote {INDEX_PATH.relative_to(ROOT)} ({len(generated['files'])} articles)")
        return 0

    if args.check:
        current = INDEX_PATH.read_text(encoding="utf-8")
        if current != rendered:
            print("ERROR: content-index.json is stale; run: python3 scripts/content_index.py --write", file=sys.stderr)
            return 1

    standard = sum(1 for x in generated["files"] if x["audience"] == "standard")
    junior = sum(1 for x in generated["files"] if x["audience"] == "junior")
    print(f"OK: {len(generated['files'])} articles ({standard} standard, {junior} junior)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
