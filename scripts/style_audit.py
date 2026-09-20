#!/usr/bin/env python3
"""Check public text files for TechHandbook style and work-trace regressions."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEXT_SUFFIXES = {".md", ".js", ".css", ".html", ".json", ".yml", ".yaml", ".py", ".txt"}
FORBIDDEN_TEXT = {
    "—": "use a regular hyphen (-) instead of an em dash",
    "–": "use a regular hyphen (-) instead of an en dash",
    "@msi.com": "work email must not be published",
    "U Ciebie": "remove conversation-specific wording",
    "u Ciebie": "remove conversation-specific wording",
    "Project52": "private project name must not be published",
}


def text_files() -> list[Path]:
    files = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if ".git" in path.parts:
            continue
        if path == Path(__file__).resolve():
            continue
        if path.suffix in TEXT_SUFFIXES or not path.suffix:
            files.append(path)
    return sorted(files)


def normalize(path: Path) -> bool:
    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return False

    fixed = text.replace("—", "-").replace("–", "-")
    if fixed == text:
        return False

    path.write_text(fixed, encoding="utf-8")
    return True


def check() -> list[str]:
    errors = []
    for path in text_files():
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue

        relative = path.relative_to(ROOT)
        for line_number, line in enumerate(text.splitlines(), start=1):
            for needle, message in FORBIDDEN_TEXT.items():
                if needle in line:
                    errors.append(f"{relative}:{line_number}: {message}")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="replace long dashes with regular hyphens")
    args = parser.parse_args()

    if args.write:
        changed = [path.relative_to(ROOT) for path in text_files() if normalize(path)]
        print(f"Normalized {len(changed)} files")

    errors = check()
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1

    print("OK: typography and public-work-trace checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
