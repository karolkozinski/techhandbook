#!/usr/bin/env python3
"""Create a new TechHandbook article scaffold and refresh generated artifacts."""

from __future__ import annotations

import json
import re
import subprocess
import sys
import unicodedata
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MD_ROOT = ROOT / "md"
INDEX_PATH = ROOT / "content-index.json"
RELATIONS_PATH = ROOT / "content-relations.json"


def ask(label: str, default: str | None = None) -> str:
    suffix = f" [{default}]" if default else ""
    value = input(f"{label}{suffix}: ").strip()
    return value or (default or "")


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value)
    value = "".join(ch for ch in value if not unicodedata.combining(ch))
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def next_id(prefix: str) -> str:
    highest = 0
    for path in MD_ROOT.rglob("*.md"):
        text = path.read_text(encoding="utf-8", errors="ignore")
        m = re.search(rf'^id:\s*"{re.escape(prefix)}-(\d+)"', text, re.MULTILINE)
        if m:
            highest = max(highest, int(m.group(1)))
    return f"{prefix}-{highest + 1:03d}"


def yaml_quote(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def render_article(
    article_id: str,
    title: str,
    slug: str,
    description: str,
    lang: str,
    audience: str,
    tags: list[str],
) -> str:
    today = date.today().isoformat()
    lines = [
        "---",
        f'id: {yaml_quote(article_id)}',
        f'title: {yaml_quote(title)}',
        f'slug: {yaml_quote(slug)}',
        f'description: {yaml_quote(description)}',
        f'lang: {yaml_quote(lang)}',
        f'audience: {yaml_quote(audience)}',
        f'published: {yaml_quote(today)}',
        f'updated: {yaml_quote(today)}',
        "",
        "tags:",
    ]
    for tag in tags:
        lines.append(f"  - {yaml_quote(tag)}")
    lines += [
        "",
        "ai:",
        "  assisted: true",
        "  human_reviewed: false",
        "",
        "seo:",
        "  index: true",
        "  ads: true",
        "---",
        "",
        f"# {title}",
        "",
        description,
        "",
        "## TODO",
        "",
        "Uzupełnij treść artykułu przed publikacją.",
        "",
    ]
    return "\n".join(lines)


def write_file(path: Path, content: str) -> None:
    if path.exists():
        raise SystemExit(f"ERROR: file already exists: {path.relative_to(ROOT)}")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    print(f"Created {path.relative_to(ROOT)}")


def run(*args: str) -> None:
    print("+", " ".join(args))
    subprocess.run(args, cwd=ROOT, check=True)


def main() -> int:
    print("TechHandbook - new article")
    print()

    audience = ask("Audience (standard/junior)", "standard").lower()
    if audience not in {"standard", "junior"}:
        raise SystemExit("ERROR: audience must be standard or junior")

    tags = [x.strip() for x in ask("Tags, comma-separated").split(",") if x.strip()]

    if audience == "standard":
        article_id = next_id("doc")
        category = ask("Category path, e.g. programming/go").strip("/")
        if not category:
            raise SystemExit("ERROR: category is required for STANDARD")

        title_pl = ask("PL title")
        title_en = ask("EN title")
        if not title_pl or not title_en:
            raise SystemExit("ERROR: both PL and EN titles are required")

        slug_pl = ask("PL slug", slugify(title_pl))
        slug_en = ask("EN slug", slugify(title_en))
        desc_pl = ask("PL description")
        desc_en = ask("EN description")
        if not desc_pl or not desc_en:
            raise SystemExit("ERROR: both descriptions are required")

        related = [x.strip() for x in ask("Related IDs (4-6, comma-separated)").split(",") if x.strip()]
        if not 4 <= len(related) <= 6:
            raise SystemExit("ERROR: STANDARD requires 4-6 related IDs")

        index = json.loads(INDEX_PATH.read_text(encoding="utf-8"))
        known_ids = {item["id"] for item in index.get("files", [])}
        unknown = [item for item in related if item not in known_ids]
        if unknown:
            raise SystemExit("ERROR: unknown related IDs: " + ", ".join(unknown))

        pl_path = MD_ROOT / "pl" / category / f"{slug_pl}.md"
        en_path = MD_ROOT / "en" / category / f"{slug_en}.md"
        write_file(pl_path, render_article(article_id, title_pl, slug_pl, desc_pl, "pl", "standard", tags))
        write_file(en_path, render_article(article_id, title_en, slug_en, desc_en, "en", "standard", tags))

        relations = json.loads(RELATIONS_PATH.read_text(encoding="utf-8"))
        relations.setdefault("related", {})[article_id] = related
        relations["updated"] = date.today().isoformat()
        RELATIONS_PATH.write_text(
            json.dumps(relations, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"Updated content-relations.json for {article_id}")

    else:
        article_id = next_id("junior")
        lang = ask("Language (pl/en)", "pl").lower()
        if lang not in {"pl", "en"}:
            raise SystemExit("ERROR: language must be pl or en")

        title = ask("Title")
        if not title:
            raise SystemExit("ERROR: title is required")
        slug = ask("Slug", slugify(title))
        description = ask("Description")
        if not description:
            raise SystemExit("ERROR: description is required")

        path = MD_ROOT / lang / "junior" / f"{slug}.md"
        write_file(path, render_article(article_id, title, slug, description, lang, "junior", tags))

    print()
    print("Refreshing generated artifacts...")
    run(sys.executable, "scripts/content_index.py", "--write")
    run(sys.executable, "scripts/seo_artifacts.py", "--write")
    run(sys.executable, "scripts/content_index.py", "--check")
    run(sys.executable, "scripts/seo_artifacts.py", "--check")
    run(sys.executable, "scripts/style_audit.py")

    print()
    print("DONE.")
    print("Now replace the TODO section with the real article content, review it,")
    print("then rerun the checks before commit/deploy.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
