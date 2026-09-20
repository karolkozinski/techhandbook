# Tech Handbook — statyczny frontend

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
- routing interfejsu używa fragmentów `#/...`, więc działa na zwykłym hostingu statycznym.

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

### Stan przejściowy

Generator indeksu nie jest jeszcze wdrożony.

Do zakończenia migracji istniejący `content-index.json` nadal jest wymagany przez frontend i pozostaje bieżącym runtime source. Po wdrożeniu parsera i migracji wszystkich artykułów nie będzie edytowany ręcznie.

Stabilne `id` są już używane przez linki wewnętrzne i relacje. Nie wolno ich zmieniać podczas migracji.

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

Projekt działa na hostingu statycznym.

Uwaga: otwieranie `index.html` bezpośrednio z `file://` może blokować `fetch()` do JSON i Markdownów z powodu polityki bezpieczeństwa przeglądarki.
