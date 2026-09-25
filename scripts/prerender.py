#!/usr/bin/env python3
import argparse
import html
import json
import re
import unicodedata
from pathlib import Path
from urllib.parse import quote

import markdown
import yaml


ROOT = Path(__file__).resolve().parents[1]


def split_front_matter(text: str):
    normalized = text.replace("\r\n", "\n").replace("\r", "\n")
    if not normalized.startswith("---\n"):
        return {}, normalized
    end = normalized.find("\n---\n", 4)
    if end == -1:
        return {}, normalized
    raw = normalized[4:end]
    meta = yaml.safe_load(raw) or {}
    body = normalized[end + 5 :].lstrip("\n")
    return meta, body


def normalize_title(body: str, title: str):
    lines = body.splitlines()
    for i, line in enumerate(lines):
        if re.match(r"^#\s+", line):
            lines[i] = f"# {title}"
            return "\n".join(lines)
    return f"# {title}\n\n{body}"


def heading_plain_text(value: str) -> str:
    value = re.sub(r"`([^`]+)`", r"\1", value)
    value = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", value)
    value = re.sub(r"[*_~]", "", value)
    value = re.sub(r"<[^>]+>", "", value)
    return value.strip()


def heading_slug(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", heading_plain_text(value).lower())
    normalized = "".join(ch for ch in normalized if not unicodedata.combining(ch))
    normalized = re.sub(r"[^a-z0-9\s-]", "", normalized).strip()
    normalized = re.sub(r"\s+", "-", normalized)
    return re.sub(r"-+", "-", normalized).strip("-") or "section"


def prepare_headings(body: str):
    lines = body.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    headings = []
    used = {}
    in_fence = False

    for index, line in enumerate(lines):
        if re.match(r"^```", line):
            in_fence = not in_fence
            continue
        if in_fence:
            continue

        match = re.match(r"^(#{1,6})\s+(.+)$", line)
        if not match:
            continue

        level = len(match.group(1))
        text = re.sub(r"\s+#+\s*$", "", match.group(2))
        base = heading_slug(text)
        used[base] = used.get(base, 0) + 1
        anchor = base if used[base] == 1 else f"{base}-{used[base]}"
        headings.append({"level": level, "text": text, "id": anchor})
        lines[index] = f"{'#' * level} {text} {{#{anchor}}}"

    return "\n".join(lines), headings


def render_article_toc(headings: list, language: str) -> str:
    items = [item for item in headings if item["level"] in (2, 3)]
    if sum(1 for item in items if item["level"] == 2) < 3:
        return ""

    label = "Table of contents" if language == "en" else "Spis treści"
    links = "".join(
        f'<li class="article-toc-level-{item["level"]}">'
        f'<a href="#{html.escape(item["id"], quote=True)}" '
        f'data-heading-id="{html.escape(item["id"], quote=True)}">'
        f'{html.escape(heading_plain_text(item["text"]))}</a></li>'
        for item in items
    )
    return (
        f'<nav class="article-toc" aria-label="{html.escape(label, quote=True)}">'
        f'<details><summary>{html.escape(label)}</summary>'
        f'<ul class="article-toc-list">{links}</ul></details></nav>'
    )


def rewrite_links(body: str, current_path: str, route_by_id: dict, route_by_path: dict):
    current_dir = Path(current_path).parent

    def replace(match):
        label, target = match.group(1), match.group(2).strip()
        if target.startswith("techhandbook:"):
            raw = target[len("techhandbook:") :]
            doc_id, sep, fragment = raw.partition("#")
            route = route_by_id.get(doc_id)
            if route:
                return f"[{label}]({route}{('#' + fragment) if sep else ''})"

        raw_path, sep, fragment = target.partition("#")
        if raw_path.lower().endswith(".md"):
            candidate = Path(raw_path) if raw_path.startswith("md/") else current_dir / raw_path
            try:
                normalized = candidate.as_posix()
                while normalized.startswith("./"):
                    normalized = normalized[2:]
                parts = []
                for part in normalized.split("/"):
                    if part in ("", "."):
                        continue
                    if part == "..":
                        if parts:
                            parts.pop()
                    else:
                        parts.append(part)
                normalized = "/".join(parts)
                route = route_by_path.get(normalized)
                if route:
                    return f"[{label}]({route}{('#' + fragment) if sep else ''})"
            except Exception:
                pass
        return match.group(0)

    return re.sub(r"\[([^\]]+)\]\(([^)]+)\)", replace, body)


def render_markdown(body: str, language: str):
    prepared, headings = prepare_headings(body)
    rendered = markdown.markdown(
        prepared,
        extensions=["fenced_code", "tables", "sane_lists", "attr_list"],
        output_format="html5",
    )
    toc = render_article_toc(headings, language)
    if toc:
        rendered = rendered.replace("</h1>", "</h1>" + toc, 1)
    return rendered


def inject_head(template: str, *, language: str, title: str, description: str, canonical: str,
                robots: str, alternates: list, json_ld: dict):
    out = re.sub(r'<html lang="[^"]*">', f'<html lang="{html.escape(language)}">', template, count=1)
    out = re.sub(
        r'<meta name="description" content="[^"]*">',
        f'<meta name="description" content="{html.escape(description, quote=True)}">',
        out,
        count=1,
    )
    out = re.sub(r"<title>.*?</title>", f"<title>{html.escape(title)}</title>", out, count=1)

    additions = [
        f'  <meta name="robots" content="{html.escape(robots, quote=True)}">',
        f'  <link id="techhandbook-canonical" rel="canonical" href="{html.escape(canonical, quote=True)}">',
    ]
    for lang, href in alternates:
        additions.append(
            f'  <link rel="alternate" hreflang="{html.escape(lang, quote=True)}" '
            f'href="{html.escape(href, quote=True)}" data-techhandbook-hreflang="1">'
        )
    additions.append(
        '  <script id="techhandbook-jsonld" type="application/ld+json">'
        + json.dumps(json_ld, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
        + "</script>"
    )
    out = out.replace("</head>", "\n".join(additions) + "\n</head>", 1)
    return out


def inject_article(template: str, article_html: str):
    template = template.replace(
        '<div id="welcome" class="welcome">',
        '<div id="welcome" class="welcome" hidden>',
        1,
    )
    target = '<article id="reader" class="markdown-body" hidden></article>'
    replacement = f'<article id="reader" class="markdown-body">{article_html}</article>'
    if target not in template:
        raise RuntimeError("reader placeholder not found in index.html")
    return template.replace(target, replacement, 1)


def build(output: Path):
    template = (ROOT / "index.html").read_text(encoding="utf-8")
    index = json.loads((ROOT / "content-index.json").read_text(encoding="utf-8"))
    config = json.loads((ROOT / "site-config.json").read_text(encoding="utf-8"))
    base = config["productionBaseUrl"].rstrip("/")

    files = index.get("files", [])
    route_by_id = {}
    route_by_path = {}
    for item in files:
        if item.get("id") and item.get("route"):
            route_by_id.setdefault(item["id"], item["route"])
        if item.get("path") and item.get("route"):
            route_by_path[item["path"]] = item["route"]

    generated = 0
    for item in files:
        route = item.get("route")
        path = item.get("path")
        if not route or not path:
            continue

        source = ROOT / path
        meta, body = split_front_matter(source.read_text(encoding="utf-8"))
        title = item.get("title") or meta.get("title") or item.get("name") or "Tech Handbook"
        description = meta.get("description") or config.get("description") or ""
        language = item.get("language") or meta.get("lang") or config.get("defaultLanguage") or "pl"
        body = normalize_title(body, title)
        body = rewrite_links(body, path, route_by_id, route_by_path)
        article_html = render_markdown(body, language)

        canonical = base + route
        indexable = config.get("indexingEnabled") is True and item.get("index") is not False
        robots = "index,follow,max-image-preview:large" if indexable else "noindex,follow"

        audience = item.get("audience") or "standard"
        counterparts = [
            other for other in files
            if other.get("id") == item.get("id")
            and (other.get("audience") or "standard") == audience
            and other.get("route")
        ]
        alternates = [(other.get("language") or "pl", base + other["route"]) for other in counterparts]
        default_language = config.get("defaultLanguage") or "pl"
        default_item = next((other for other in counterparts if (other.get("language") or "pl") == default_language), None)
        if default_item:
            alternates.append(("x-default", base + default_item["route"]))

        json_ld = {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": title,
            "description": description,
            "inLanguage": language,
            "mainEntityOfPage": canonical,
            "isPartOf": {
                "@type": "WebSite",
                "name": config.get("siteName") or "Null Yard Tech Handbook",
                "url": base + "/",
            },
        }
        if meta.get("published"):
            json_ld["datePublished"] = str(meta["published"])
        if meta.get("updated"):
            json_ld["dateModified"] = str(meta["updated"])

        page = inject_head(
            template,
            language=language,
            title=f"{title} - Tech Handbook",
            description=description,
            canonical=canonical,
            robots=robots,
            alternates=alternates,
            json_ld=json_ld,
        )
        page = inject_article(page, article_html)

        destination = output / route.lstrip("/") / "index.html"
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(page, encoding="utf-8")
        generated += 1

    print(f"Generated {generated} prerendered article pages")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", default="build/prerender")
    args = parser.parse_args()
    build(Path(args.output))


if __name__ == "__main__":
    main()
