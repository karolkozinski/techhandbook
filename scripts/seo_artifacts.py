#!/usr/bin/env python3
"""Generate preproduction/production SEO and LLM discovery artifacts."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
INDEX_PATH = ROOT / "content-index.json"
CONFIG_PATH = ROOT / "site-config.json"
ROBOTS_PATH = ROOT / "robots.txt"
SITEMAP_PATH = ROOT / "sitemap.xml"
LLMS_PATH = ROOT / "llms.txt"


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def base_url(config: dict) -> str:
    value = str(config.get("productionBaseUrl", "")).strip().rstrip("/")
    if not value.startswith("https://"):
        raise ValueError("productionBaseUrl must use https://")
    return value


def indexable_files(index: dict) -> list[dict]:
    return [item for item in index.get("files", []) if item.get("index", True)]


def render_robots(config: dict) -> str:
    if not config.get("indexingEnabled", False):
        return (
            "User-agent: *\n"
            "Disallow: /\n\n"
            "# Preproduction: public indexing is intentionally disabled.\n"
        )

    base = base_url(config)
    return (
        "User-agent: *\n"
        "Allow: /\n\n"
        f"Sitemap: {base}/sitemap.xml\n"
    )


def render_sitemap(config: dict, index: dict) -> str:
    base = base_url(config)
    urls = [base + item["route"] for item in indexable_files(index)]
    body = "\n".join(f"  <url><loc>{escape(url)}</loc></url>" for url in urls)
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{body}\n"
        "</urlset>\n"
    )


def render_llms(config: dict, index: dict) -> str:
    base = base_url(config)
    site_name = config.get("siteName", "Null Yard Tech Handbook")
    description = config.get("description", "")
    files = indexable_files(index)

    lines = [
        f"# {site_name}",
        "",
        f"> {description}",
        "",
        "Technical reference handbooks in Polish and English. "
        "Stable article URLs are listed below.",
        "",
    ]

    for language in index.get("languages", ["pl", "en"]):
        language_files = [item for item in files if item.get("language") == language]
        if not language_files:
            continue
        lines.extend([f"## {language.upper()}", ""])
        for item in language_files:
            lines.append(f"- [{item['title']}]({base}{item['route']})")
        lines.append("")

    return "\n".join(lines).rstrip() + "\n"


def generated() -> dict[Path, str]:
    config = load_json(CONFIG_PATH)
    index = load_json(INDEX_PATH)
    return {
        ROBOTS_PATH: render_robots(config),
        SITEMAP_PATH: render_sitemap(config, index),
        LLMS_PATH: render_llms(config, index),
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--write", action="store_true")
    mode.add_argument("--check", action="store_true")
    args = parser.parse_args()

    try:
        outputs = generated()
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    if args.write:
        for path, content in outputs.items():
            path.write_text(content, encoding="utf-8")
            print(f"Wrote {path.relative_to(ROOT)}")
        return 0

    if args.check:
        stale = []
        for path, content in outputs.items():
            if not path.exists() or path.read_text(encoding="utf-8") != content:
                stale.append(path.relative_to(ROOT).as_posix())
        if stale:
            print("ERROR: stale SEO artifacts: " + ", ".join(stale), file=sys.stderr)
            return 1

    config = load_json(CONFIG_PATH)
    index = load_json(INDEX_PATH)
    print(
        f"OK: {len(indexable_files(index))} indexable routes; "
        f"public indexing={'on' if config.get('indexingEnabled') else 'off'}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
