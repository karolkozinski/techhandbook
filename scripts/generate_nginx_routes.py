#!/usr/bin/env python3
import json
from pathlib import Path

index = json.loads(Path("content-index.json").read_text(encoding="utf-8"))
config = json.loads(Path("site-config.json").read_text(encoding="utf-8"))

routes = sorted({
    item.get("route")
    for item in index.get("files", [])
    if item.get("route")
})
redirects = config.get("redirects", {})
base_url = str(config.get("productionBaseUrl", "")).rstrip("/")

if redirects and not base_url.startswith("https://"):
    raise ValueError("productionBaseUrl must use https:// when redirects are configured")

lines = [
    "# Generated from content-index.json and site-config.json. Do not edit manually.",
]

for source, target in sorted(redirects.items()):
    if not source.startswith("/") or not target.startswith("/"):
        raise ValueError("redirect routes must start with /")
    if source in routes:
        raise ValueError(f"redirect source is still an active route: {source}")
    lines.extend([
        f"location = {source} {{",
        f"    return 301 {base_url}{target};",
        "}",
    ])

for route in routes:
    if not route.startswith("/"):
        continue
    escaped = route.replace("\\", "\\\\").replace('"', '\"')
    lines.extend([
        f'location = "{escaped}" {{',
        "    try_files $uri/index.html =404;",
        "}",
    ])

output = Path("deploy/generated-routes.conf")
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text("\n".join(lines) + "\n", encoding="utf-8")
