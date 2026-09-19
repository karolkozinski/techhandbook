# Tech Handbook — statyczny frontend

Ten pakiet jest przeznaczony do rozpakowania bezpośrednio w katalogu `techhandbook/`.

Zakładana struktura:

```text
techhandbook/
├── README.md
├── index.html
├── content-index.json
├── assets/
│   ├── app.js
│   └── styles.css
└── md/
    ├── ai/
    ├── cloud/
    ├── devops/
    └── ...
```

## Jak działa

- żadnego backendu,
- żadnego Go,
- żadnego build systemu,
- żadnych frameworków,
- katalogi i pliki są renderowane z `content-index.json`,
- wyszukiwarka przeszukuje wyłącznie dane z JSON,
- dokument Markdown jest pobierany dopiero po kliknięciu,
- użytkownik nie dostaje w interfejsie bezpośredniego linku do pliku `.md`,
- routing interfejsu używa fragmentów `#/...`, więc działa na zwykłym hostingu statycznym.

## Aktualizacja indeksu

Po dodaniu nowego kompendium dopisz wpis w `content-index.json`.

Przykład:

```json
{
  "id": "doc-999",
  "name": "example.md",
  "title": "Example",
  "path": "md/example/example.md",
  "category": "example",
  "tags": ["example", "demo"]
}
```

`id` musi być unikalne.

Wyszukiwarka sprawdza:

- `name`,
- `title`,
- `path`,
- `category`,
- `tags`.

Zwykłe wyszukiwanie działa jako case-insensitive substring, więc `dns` znajdzie dokument zawierający `dns` w nazwie, tytule, ścieżce lub tagach.

Obsługiwany jest też `*`, np.:

```text
free*
*security
git*
```

## Publikacja

Projekt nadaje się do dowolnego hostingu statycznego, np. GitHub Pages.

Uwaga: otwieranie `index.html` bezpośrednio z `file://` może blokować `fetch()` do JSON i Markdownów z powodu polityki bezpieczeństwa przeglądarki. Na hostingu statycznym działa normalnie.
