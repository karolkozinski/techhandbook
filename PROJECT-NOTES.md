# Tech Handbook - architektura projektu

Tech Handbook jest przede wszystkim statycznym serwisem z dokumentacją Markdown.

Publiczne treści, nawigacja, wyszukiwanie i czytnik działają jako lekki frontend bez zależności od backendu podczas normalnego czytania.

Projekt zawiera również mały, izolowany backend pomocniczy `review-api`, używany wyłącznie do obsługi zgłoszeń jakości treści, prywatnego panelu administracyjnego, przechowywania zgłoszeń, automatycznej analizy zgłoszeń oraz operacyjnej obsługi ich cyklu życia.

Backend nie jest wymagany do wyświetlania publicznych treści Tech Handbooka.

## Struktura

Główne elementy projektu:

```text
techhandbook/
├── README.md
├── README.en.md
├── PROJECT-NOTES.md
├── ROADMAP.md
├── DEPLOYMENT.md
├── CONTENT-MODEL.md
├── index.html
├── admin-reports.html
├── content-index.json
├── content-relations.json
├── article.schema.json
├── review-report.schema.json
├── Dockerfile
├── Dockerfile.review-api
├── compose.yaml
├── deploy/
├── scripts/
├── assets/
└── md/
    ├── pl/
    └── en/
```

Dokumenty opisujące cały projekt pozostają w katalogu głównym repozytorium. Katalog `deploy/` zawiera konfigurację wdrożeniową, a `md/` wyłącznie treści publikowane.

## Jak działa

- publiczny serwis pozostaje static-first,
- zwykłe czytanie artykułów nie wymaga backendu,
- frontend nie używa frameworka aplikacyjnego,
- katalogi i pliki są renderowane z `content-index.json`,
- wyszukiwarka przeszukuje dane z indeksu,
- dokument Markdown jest pobierany dopiero po kliknięciu,
- użytkownik nie dostaje w interfejsie bezpośredniego linku do pliku `.md`,
- artykuły używają stabilnych ścieżek URL z językiem, kategorią i slugiem, np. `/pl/programming/python/python-podstawy`,
- katalogi używają `/pl/browse/...`, wyszukiwanie `/pl/search?q=...`, a JUNIOR prefiksu `/pl/junior/...`,
- stare linki `#/...` pozostają obsługiwane i są zamieniane na nowe adresy,
- pomocniczy `review-api` jest odseparowany od publicznego frontendu,
- backend nie posiada bezpośrednio dostępnego publicznego portu,
- nginx wystawia wyłącznie jawnie skonfigurowane ścieżki potrzebne przez review i administrację.

## Model treści

Docelowy model metadanych opisuje [CONTENT-MODEL.md](CONTENT-MODEL.md).

Maszynowy schemat front matter znajduje się w [article.schema.json](article.schema.json).

Najważniejsza zasada:

```text
Markdown front matter = źródło prawdy danych artykułu
filesystem            = źródło prawdy ścieżki i kategorii
mapa relacji           = źródło prawdy related
content-index.json     = wygenerowany indeks runtime
```

### Generowanie indeksu

`content-index.json` jest generowany z front matter artykułów, położenia plików oraz `content-relations.json`.

Nie edytuj go ręcznie.

```bash
python3 -m pip install -r requirements-dev.txt
python3 scripts/content_index.py
python3 scripts/content_index.py --check
python3 scripts/content_index.py --write
```

Pierwsze polecenie skryptu waliduje treść bez zapisu. `--check` dodatkowo sprawdza, czy indeks w repo jest aktualny, a `--write` regeneruje indeks.

Stabilne `id` są używane przez linki wewnętrzne i relacje. Nie wolno ich zmieniać przy przenoszeniu ani zmianie tytułu artykułu.

## Automatyczna walidacja

Workflow `.github/workflows/content-check.yml` uruchamia walidację treści przy zmianach artykułów, indeksu, relacji lub samego walidatora.

Sprawdza m.in.:

- poprawność front matter,
- zgodność H1 z tytułem,
- stabilne ID i unikalne slugi,
- kompletność tłumaczeń STANDARD,
- relacje i linki wewnętrzne,
- zgodność wygenerowanego `content-index.json` ze źródłami.

Workflow `.github/workflows/deploy-check.yml` sprawdza konfigurację deploymentu i wykonuje smoke test obrazu.

CI obejmuje również skanowanie repozytorium pod kątem sekretów.

## Wyszukiwanie

Wyszukiwarka wykorzystuje m.in.:

- nazwę,
- tytuł,
- ścieżkę,
- kategorię,
- tagi.

Zwykłe wyszukiwanie działa jako case-insensitive substring.

Obsługiwany jest też `*`, np.:

```text
free*
*security
git*
```

## Review i administracja

Tech Handbook posiada pomocniczy system zgłoszeń jakości treści.

Warstwy mają rozdzielone uprawnienia:

- zwykły użytkownik - dostęp do publicznej treści,
- reviewer - operacje review przy użyciu `REVIEW_ACCESS_TOKEN`,
- administrator - operacje administracyjne przy użyciu osobnego `ADMIN_ACCESS_TOKEN`.

Token review nie daje dostępu administracyjnego.

Sekrety istnieją wyłącznie jako konfiguracja runtime i nie są częścią repozytorium ani obrazu aplikacji.

Panel administracyjny:

- nie jest przeznaczony do indeksowania,
- nie powinien być cache'owany,
- jest wystawiany wyłącznie przez jawnie zdefiniowane trasy reverse proxy,
- używa bardziej restrykcyjnych nagłówków niż publiczne treści.

`reporter_stamp` jest pseudonimowym identyfikatorem używanym do rate limitingu i deduplikacji. Po zamknięciu zgłoszenia podlega retencji opisanej w `DEPLOYMENT.md`.

Szczegóły konfiguracji, obsługi zgłoszeń, retencji i analyzera znajdują się w [DEPLOYMENT.md](DEPLOYMENT.md).

## Publikacja

Produkcja działa pod `https://techhandbook.nullyard.com`. GitHub Pages pozostaje dodatkowym środowiskiem podglądowym. Plik `.nojekyll` wyłącza przetwarzanie przez Jekyll.

Docelowy deployment VPS jest zdefiniowany w:

- `Dockerfile`,
- `Dockerfile.review-api`,
- `compose.yaml`,
- `deploy/container-nginx.conf`,
- `deploy/host-nginx.conf.example`,
- `deploy/systemd/`,
- `DEPLOYMENT.md`.

Publiczny frontend jest dostępny przez `127.0.0.1:8092` i hostowy nginx. `review-api` jest usługą wewnętrzną Compose i nie publikuje portu na hoście.

Kontenerowy nginx serwuje pliki statyczne i Markdown, obsługuje znane clean URL-e wygenerowane z `content-index.json` oraz jawnie przekazuje wymagane ścieżki review/admin do backendu. Nieznane ścieżki zwracają prawdziwe HTTP 404.

Uwaga: otwieranie `index.html` bezpośrednio z `file://` może blokować `fetch()` do JSON i Markdownów z powodu polityki bezpieczeństwa przeglądarki.

## SEO i LLM discovery

Generator:

```bash
python3 scripts/seo_artifacts.py --check
python3 scripts/seo_artifacts.py --write
```

Generuje:

- `robots.txt`,
- `sitemap.xml`,
- `llms.txt`.

Frontend ustawia dla artykułu dynamicznie:

- title,
- meta description,
- canonical,
- robots,
- hreflang,
- JSON-LD `TechArticle`.

Canonical i sitemap wskazują produkcyjną domenę z `site-config.json`. Produkcyjne indeksowanie jest włączone.

## Style audit

Public text uses a regular hyphen (`-`) instead of typographic em/en dashes.

Check:

```bash
python3 scripts/style_audit.py
```

Automatic dash normalization:

```bash
python3 scripts/style_audit.py --write
```

The CI check also guards against a small set of conversation-specific or work-only strings that must not be published.

## Produkcja - stan 2026-09-25

- canonical URL: `https://techhandbook.nullyard.com`,
- HTTPS: aktywne,
- host nginx -> `127.0.0.1:8092`,
- runtime: Docker Compose,
- publiczny frontend: unprivileged nginx,
- review API: izolowana usługa pomocnicza bez publicznego portu hosta,
- panel administracyjny: prywatny, jawnie routowany przez nginx,
- tokeny review/admin: rozdzielone,
- sekrety: wyłącznie konfiguracja runtime,
- retencja `reporter_stamp`: 90 dni po zamknięciu zgłoszenia,
- poprawne HTTP 404 dla nieznanych tras,
- Umami: osobny Website entry dla Tech Handbooka,
- bazowe eventy: `site_search`, `language_change`, `outbound_click`,
- indeksowanie: włączone,
- sitemap: opublikowana,
- secret scanning i security hardening publicznego repozytorium: wdrożone.
