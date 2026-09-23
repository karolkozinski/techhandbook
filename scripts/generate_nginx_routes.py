#!/usr/bin/env python3
import json
from pathlib import Path

index = json.loads(Path("content-index.json").read_text(encoding="utf-8"))
routes = sorted({
    item.get("route")
    for item in index.get("files", [])
    if item.get("route")
})

lines = [
    "# Generated from content-index.json. Do not edit manually.",
]
for route in routes:
    if not route.startswith("/"):
        continue
    escaped = route.replace("\\", "\\\\").replace('"', '\\"')
    lines.extend([
        f'location = "{escaped}" {{',
        "    try_files $uri/index.html =404;",
        "}",
    ])

output = Path("deploy/generated-routes.conf")
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text("\n".join(lines) + "\n", encoding="utf-8")
