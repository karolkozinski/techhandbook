# ci-cd-github-actions

## 1. CI i CD

CI:

```text
commit → test → build
```

CD:

```text
build → deploy
```

Celem jest automatyzacja powtarzalnych kroków.

## 2. GitHub Actions

Workflow:

```text
.github/workflows/ci.yml
```

## 3. Minimalny workflow

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

## 6. Trigger

Branch:

```yaml
on:
  push:
    branches: [main]
```

Ręczne uruchomienie:

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

Pozwala testować na wielu wersjach.

## 9. Secrets

GitHub:

```text
Settings → Secrets and variables → Actions
```

W workflow:

```yaml
env:
  API_TOKEN: ${{ secrets.API_TOKEN }}
```

Nie loguj sekretów.

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

Typowy flow:

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

## 13. Deployment po SSH

Możliwe podejście:

```text
GitHub Actions
  ↓ SSH
VPS
  ↓
docker compose pull
docker compose up -d
```

Klucz wdrożeniowy trzymaj jako secret.

## 14. Environments

Możesz mieć:

```text
development
staging
production
```

i osobne secrets/approval.

## 15. Pull Request checks

Przed merge wymagaj:
- testów,
- builda,
- lintera.

Dzięki temu `main` jest stabilniejszy.

## 16. Cache

Node:

```yaml
with:
  cache: npm
```

Go może cache'ować moduły i build cache.

## 17. Workflow permissions

Dawaj minimalne potrzebne uprawnienia.

```yaml
permissions:
  contents: read
```

## 18. Release workflow

Przy tagu:

```yaml
on:
  push:
    tags:
      - 'v*'
```

Możesz:
- zbudować binarki,
- utworzyć release,
- opublikować obraz Docker.

## 19. CI dla małego projektu

Dobry początek:

```text
push/PR
  ↓
format/lint
  ↓
tests
  ↓
build
```

Nie zaczynaj od skomplikowanego pipeline'u.

## 20. Typowe problemy

- różnice między środowiskiem lokalnym a runnerem,
- brak secret,
- złe permissions,
- niespójne wersje Node/Go,
- deployment mimo nieudanych testów,
- `latest` bez wersjonowania obrazów.

## 21. Co trzeba umieć

- napisać prosty workflow,
- uruchomić test/build,
- użyć secrets,
- zbudować kontener,
- połączyć CI z deploymentem,
- rozumieć zależności jobów.
