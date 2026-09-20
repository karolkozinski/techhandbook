---
id: "doc-011"
title: "CI/CD and GitHub Actions"
slug: "ci-cd-and-github-actions"
description: "CI/CD and GitHub Actions — a practical TechHandbook reference."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "ci"
  - "cd"
  - "github"
  - "actions"
---

# CI/CD and GitHub Actions

## 1. CI and CD

CI:

```text
commit → test → build
```

CD:

```text
build → deploy
```

The goal is to automate repeatable steps.

## 2. GitHub Actions

A workflow lives in:

```text
.github/workflows/ci.yml
```

## 3. Minimal workflow

```yaml
name: CI

on:
  push:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Test
        run: echo "Run tests here"
```

## 4. Go

```yaml
- uses: actions/setup-go@v5
  with:
    go-version: '1.25'

- run: go test ./...
- run: go build ./...
```

## 5. Node

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 22

- run: npm ci
- run: npm test
- run: npm run build
```

## 6. Triggers

Only main:

```yaml
on:
  push:
    branches: [main]
```

Manual trigger:

```yaml
on:
  workflow_dispatch:
```

## 7. Jobs

```yaml
jobs:
  test:
    ...
  build:
    needs: test
    ...
  deploy:
    needs: build
    ...
```

## 8. Matrix

```yaml
strategy:
  matrix:
    node: [20, 22]
```

This lets you test against several versions.

## 9. Secrets

GitHub:

```text
Settings → Secrets and variables → Actions
```

Workflow:

```yaml
env:
  API_TOKEN: ${{ secrets.API_TOKEN }}
```

Never print secrets to logs.

## 10. Artifacts

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: build
    path: dist/
```

## 11. Docker build

```yaml
- run: docker build -t myapp:${{ github.sha }} .
```

## 12. Container Registry

GitHub Container Registry:

```text
ghcr.io/OWNER/IMAGE
```

Typical flow:

```text
commit
 ↓
test
 ↓
docker build
 ↓
push image
 ↓
deploy
```

## 13. Deployment over SSH

```text
GitHub Actions
  ↓ SSH
VPS
  ↓
docker compose pull
docker compose up -d
```

Store deployment keys as secrets.

## 14. Environments

You may define development, staging and production environments with separate secrets and approvals.

## 15. Pull Request checks

Before merge, require tests, build and linting where appropriate.

## 16. Cache

Node:

```yaml
with:
  cache: npm
```

Go workflows can also cache modules and build data.

## 17. Workflow permissions

Grant only what is needed.

```yaml
permissions:
  contents: read
```

## 18. Release workflow

For tags:

```yaml
on:
  push:
    tags:
      - 'v*'
```

You can build binaries, create a release and publish a Docker image.

## 19. CI for a small project

A good starting point:

```text
push/PR
  ↓
format/lint
  ↓
tests
  ↓
build
```

Do not begin with an unnecessarily complex pipeline.

## 20. Common problems

- local and runner environments differ,
- missing secrets,
- incorrect permissions,
- inconsistent Node/Go versions,
- deployment runs despite failed tests,
- unversioned latest-only images.

## 21. What you should know

You should be able to write a basic workflow, run tests and builds, use secrets, build a container, connect CI with deployment and understand job dependencies.
