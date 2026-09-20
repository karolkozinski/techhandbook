# Tech Handbook - statyczny frontend

Ten pakiet jest przeznaczony do rozpakowania bezpośrednio w katalogu `techhandbook/`.

Zakładana struktura:

```text
techhandbook/
├── README.md
├── index.html
├── content-index.json
├── article.schema.json
├── CONTENT-MODEL.md
├── assets/
│   ├── app.js
│   └── styles.css
└── md/
    ├── pl/
    └── en/
```

## Jak działa

- żadnego backendu,
- żadnego Go,
- żadnych frameworków,
- katalogi i pliki są obecnie renderowane z `content-index.json`,
- wyszukiwarka przeszukuje dane z indeksu,
- dokument Markdown jest pobierany dopiero po kliknięciu,
- użytkownik nie dostaje w interfejsie bezpośredniego linku do pliku `.md`,
- artykuły używają stabilnych ścieżek URL z językiem, kategorią i slugiem, np. `/pl/programming/python/python-podstawy`,
- katalogi używają `/pl/browse/...`, wyszukiwanie `/pl/search?q=...`, a JUNIOR prefiksu `/pl/junior/...`,
- stare linki `#/...` pozostają obsługiwane i są zamieniane na nowe adresy.

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

Sprawdza:

- poprawność front matter,
- zgodność H1 z tytułem,
- stabilne ID i unikalne slugi,
- kompletność tłumaczeń STANDARD,
- relacje i linki wewnętrzne,
- zgodność wygenerowanego `content-index.json` ze źródłami.

Ten workflow nie publikuje strony. GitHub Pages pozostaje osobnym mechanizmem deploymentu.

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

## Publikacja

Projekt działa na hostingu statycznym. Plik `.nojekyll` w katalogu głównym wyłącza przetwarzanie przez Jekyll na GitHub Pages, dzięki czemu pliki Markdown są publikowane jako surowe `.md` i mogą być pobierane przez frontend.

Na GitHub Pages plik `404.html` przekazuje bezpośrednie wejścia na głębokie adresy do aplikacji. Docelowy nginx na VPS powinien zamiast tego wykonywać normalny fallback wszystkich tras aplikacji do `index.html`.

Uwaga: otwieranie `index.html` bezpośrednio z `file://` może blokować `fetch()` do JSON i Markdownów z powodu polityki bezpieczeństwa przeglądarki.


## SEO i LLM discovery

SEO działa w dwóch stanach:

- preproduction: `site-config.json -> indexingEnabled: false`,
- production: po wdrożeniu na docelową domenę ustawiamy `indexingEnabled: true` i regenerujemy artefakty.

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

Canonical i sitemap wskazują docelową domenę z `site-config.json`. Na GitHub Pages publiczne indeksowanie pozostaje wyłączone do momentu produkcyjnego deploymentu.


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
