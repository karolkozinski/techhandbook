# TechHandbook — model treści

Ten dokument definiuje docelowy model metadanych artykułów TechHandbooka.

## Zasada nadrzędna

Artykuł Markdown jest źródłem prawdy dla metadanych należących do artykułu.

Nie zapisujemy ręcznie w kilku miejscach informacji, które można jednoznacznie wyprowadzić z pliku lub jego położenia.

Docelowo `content-index.json` jest artefaktem generowanym, używanym przez statyczny frontend. Nie jest miejscem ręcznej edycji tytułów, ścieżek ani tagów.

## Front matter

Każdy artykuł STANDARD i JUNIOR ma blok YAML na samym początku pliku:

```yaml
---
id: "doc-023"
title: "Python — podstawy"
slug: "podstawy-pythona"
description: "Praktyczne kompendium podstaw języka Python, składni i uruchamiania programów."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"

tags:
  - "python"
  - "programowanie"

ai:
  assisted: true
  human_reviewed: true

seo:
  index: true
  ads: true
---
```

## Pola wymagane

### `id`

Stabilna tożsamość artykułu.

- nie zależy od nazwy pliku,
- nie zależy od katalogu,
- nie zależy od slugu,
- nie zmienia się przy przenoszeniu artykułu,
- ta sama treść w różnych językach używa tego samego `id`.

Przykład:

```text
PL: doc-023
EN: doc-023
```

Nie używamy pola `translation_of`. Wspólne `id` pełni rolę klucza łączącego tłumaczenia.

### `title`

Tytuł widoczny dla użytkownika.

Musi być identyczny z pierwszym nagłówkiem H1 renderowanego artykułu.

`title` jest źródłem prawdy dla:

- listy artykułów,
- H1,
- tytułu dokumentu,
- późniejszego SEO i danych strukturalnych.

### `slug`

Stabilny, czytelny fragment przyszłego URL-a.

Zasady:

- małe litery,
- ASCII,
- cyfry są dozwolone,
- wyrazy rozdzielone pojedynczym `-`,
- bez spacji i podkreślników,
- unikalny w obrębie kombinacji `lang + audience`.

Zmiana tytułu nie powinna automatycznie zmieniać istniejącego slugu.

### `description`

Krótki opis artykułu napisany dla człowieka.

Będzie wykorzystywany m.in. w:

- wynikach wyszukiwania serwisu,
- meta description,
- kartach i podglądach,
- danych strukturalnych.

Zalecana długość redakcyjna: około 80–160 znaków. Walidator wymaga obecności pola, ale nie powinien wymuszać sztucznego dopisywania tekstu tylko dla długości.

### `lang`

Język artykułu, np. `pl` lub `en`.

Pole musi zgadzać się z katalogiem językowym pliku.

Model nie jest ograniczony wyłącznie do PL/EN — nowe języki mogą zostać dodane bez zmiany formatu front matter.

### `audience`

Tryb treści:

```text
standard
junior
```

Nie wyprowadzamy go wyłącznie z katalogu, ponieważ jest istotną cechą treści i powinien być jawny.

### `published`

Data pierwszej publikacji treści w formacie ISO:

```text
YYYY-MM-DD
```

Podczas migracji istniejących artykułów data powinna zostać ustalona na podstawie historii Git, a nie wymyślona ręcznie.

### `updated`

Data ostatniej istotnej zmiany treści w formacie ISO:

```text
YYYY-MM-DD
```

Musi być równa lub późniejsza niż `published`.

## Pola opcjonalne

### `tags`

Redakcyjne tagi pomagające w wyszukiwaniu i grupowaniu treści.

Nie określają automatycznie:

- kategorii,
- relacji między artykułami,
- routingu.

### `ai`

Informacje o sposobie przygotowania treści.

Dozwolone pola:

```yaml
ai:
  generated: false
  assisted: true
  human_reviewed: true
```

Brak sekcji `ai` oznacza brak zadeklarowanej informacji. Generator ani frontend nie mogą zgadywać pochodzenia artykułu.

### `seo`

Jawne wyjątki lub ustawienia publikacyjne:

```yaml
seo:
  index: true
  ads: true
```

Domyślnie:

```text
index = true
ads = true
```

Pole służy do świadomego wyłączenia indeksowania lub reklam, a nie do ręcznego wpisywania canonical URL.

## Dane wyprowadzane z filesystemu

Poniższych pól nie zapisujemy w front matter:

### `name`

Nazwa pliku, np. `python-basics.md`.

### `path`

Pełna ścieżka pliku, np.:

```text
md/pl/programming/python/python-basics.md
```

### `category`

Ścieżka katalogu pomiędzy rootem języka/audience a plikiem.

Przykład:

```text
programming/python
```

Dzięki temu przeniesienie pliku wymaga zmiany tylko filesystemu, a nie ręcznej synchronizacji pola `category`.

## Powiązane artykuły

`related` nie należy do front matter pojedynczego tłumaczenia.

Relacje są:

- redakcyjne,
- wspólne dla wszystkich wersji językowych tego samego `id`,
- oparte wyłącznie na stabilnych ID.

Docelowe źródło prawdy będzie osobną mapą relacji:

```json
{
  "doc-012": ["doc-011", "doc-015", "doc-025", "doc-033", "doc-041", "doc-045"]
}
```

Generator indeksu dołącza tę samą relację do wpisów PL i EN.

Nie generujemy relacji automatycznie z tagów.

## Wewnętrzne linki

Preferowany format:

```markdown
[Docker](techhandbook:doc-012)
```

Link do sekcji:

```markdown
[Konfiguracja nginx](techhandbook:doc-045#konfiguracja-nginx)
```

Ścieżka pliku nie jest tożsamością artykułu i nie powinna być używana jako podstawowy mechanizm referencji między kompendiami.

## Co trafia do content-index.json

Po migracji wpis runtime będzie składany z trzech źródeł:

1. front matter artykułu,
2. położenie pliku,
3. mapa relacji.

Przykładowy wygenerowany wpis:

```json
{
  "id": "doc-023",
  "name": "python-basics.md",
  "title": "Python — podstawy",
  "slug": "podstawy-pythona",
  "description": "Praktyczne kompendium podstaw języka Python, składni i uruchamiania programów.",
  "path": "md/pl/programming/python/python-basics.md",
  "category": "programming/python",
  "tags": ["python", "programowanie"],
  "language": "pl",
  "audience": "standard",
  "published": "2026-09-19",
  "updated": "2026-09-20",
  "seo": {
    "index": true,
    "ads": true
  },
  "related": ["doc-008", "doc-009", "doc-031", "doc-039", "doc-049", "doc-050"]
}
```

## Walidacja modelu

Docelowy walidator powinien przerwać build, gdy:

- brakuje wymaganego pola,
- `id` ma niepoprawny format,
- dwa artykuły w tym samym języku/audience mają ten sam `id`,
- para tłumaczeń nie używa wspólnego `id`,
- `slug` ma niepoprawny format,
- `slug` jest zduplikowany w tym samym `lang + audience`,
- `lang` nie zgadza się z położeniem pliku,
- `audience` nie zgadza się z położeniem pliku,
- `updated < published`,
- H1 nie zgadza się z `title`,
- wewnętrzny link wskazuje nieistniejące `id`,
- relacja wskazuje nieistniejące `id`,
- relacja wskazuje samą siebie,
- relacja zawiera duplikaty.

Dla STANDARD zachowujemy obecną regułę 4–6 redakcyjnych relacji na artykuł.

## Zasada migracji

Migracja istniejących treści nie może zmienić stabilnych `doc-XXX`.

Kolejność:

1. odczytać istniejący `content-index.json`,
2. pobrać `id`, `title`, `tags`, język i audience,
3. wyznaczyć `slug`,
4. przygotować `description`,
5. ustalić `published` i `updated` z historii Git,
6. zapisać front matter do Markdown,
7. przenieść `related` do wspólnej mapy relacji,
8. wygenerować nowy `content-index.json`,
9. porównać nowy indeks ze starym pod kątem liczby artykułów, ID i relacji.

Dopiero po udanej migracji `content-index.json` przestaje być ręcznie utrzymywanym źródłem danych.
