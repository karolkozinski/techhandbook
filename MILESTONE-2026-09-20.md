# TechHandbook - milestone 2026-09-20

Stan zapisany przed przeniesieniem pracy do nowej rozmowy.

## Punkt odniesienia

Repozytorium:

- `karolkozinski/techhandbook`
- branch: `main`
- stan przed tym milestone: `902fef6b7f48bbc5cffe25bad02fceb519b8f051`
- ostatni commit przed milestone: `docs: document VPS deployment workflow`

Publiczny podgląd pozostaje na GitHub Pages.

Docelowa domena produkcyjna:

- `https://techhandbook.nullyard.com`

W `site-config.json` indeksowanie jest nadal wyłączone:

```json
"indexingEnabled": false
```

Nie włączać indeksowania przed działającym deploymentem na domenie produkcyjnej.

## Co jest zakończone

### 1. UI i nawigacja

Działa:

- PL / EN,
- STANDARD / JUNIOR,
- przeglądanie katalogów,
- wyszukiwarka,
- czytnik Markdown,
- linki zewnętrzne,
- stabilne linki wewnętrzne `techhandbook:doc-XXX`,
- historia Back / Forward artykułów,
- przywracanie pozycji scrolla,
- spis treści,
- sekcja powiązanych artykułów,
- przycisk „Do góry”,
- zachowanie czytnika jako widoku efemerycznego,
- responsywny interfejs mobilny,
- sensowny ekran startowy czytnika.

### 2. Model treści

Zdefiniowany jest finalny model metadanych:

- `CONTENT-MODEL.md`,
- `article.schema.json`.

Źródła prawdy:

```text
Markdown front matter = dane artykułu
filesystem            = ścieżka i kategoria
content-relations.json = related
content-index.json     = generowany indeks runtime
```

Stabilne ID są wspólne dla wersji PL / EN.

### 3. Migracja treści

Wszystkie 119 artykułów mają front matter.

Stan treści:

- 57 STANDARD PL,
- 57 STANDARD EN,
- 5 JUNIOR PL.

Dla STANDARD kompletne są wszystkie pary tłumaczeń PL / EN.

### 4. Generator i walidacja

Narzędzie:

```text
scripts/content_index.py
```

Obsługuje:

```bash
python3 scripts/content_index.py
python3 scripts/content_index.py --check
python3 scripts/content_index.py --write
```

Walidowane są między innymi:

- wymagane metadane,
- ID,
- slugi,
- H1 == title,
- język i audience względem filesystemu,
- daty,
- tagi,
- pola `ai` i `seo`,
- kompletność tłumaczeń STANDARD,
- related,
- stabilne linki wewnętrzne,
- aktualność `content-index.json`.

### 5. CI

Działa workflow:

```text
.github/workflows/content-check.yml
```

Sprawdza:

- model treści,
- wygenerowany indeks,
- składnię JavaScript,
- SEO / LLM artifacts,
- style audit.

CI było uruchamiane i przechodziło poprawnie.

### 6. Audyt treści

Wykonano szeroki audyt istniejących kompendiów, między innymi:

- networking / security / shell,
- systems,
- programming,
- data / API / testing,
- web security / protocols / nginx,
- frontend / performance / SEO,
- AI / tools / troubleshooting,
- DevOps / digital,
- cloud providers.

Nie należy zaczynać kolejnej rozmowy od ponownego audytowania całej obecnej biblioteki.

### 7. Stabilne URL-e

Wdrożony został routing z czystymi adresami.

Przykładowy docelowy format:

```text
/pl/programming/python/python-podstawy
/en/programming/python/python-practical-handbook
```

Obsługiwane są również:

- ścieżki katalogów,
- wyszukiwanie,
- JUNIOR,
- stare linki hash jako compatibility redirect.

### 8. SEO i LLM discovery

Przygotowane są:

- canonical,
- hreflang,
- meta description,
- robots,
- JSON-LD `TechArticle`,
- `robots.txt`,
- `sitemap.xml`,
- `llms.txt`,
- generator `scripts/seo_artifacts.py`.

Stan jest celowo preproduction: indeksowanie wyłączone.

### 9. Style audit

Działa:

```text
scripts/style_audit.py
```

Publiczna treść została ujednolicona typograficznie i objęta kontrolą CI.

## Deployment - stan przygotowany, ale NIE wdrożony na VPS

Tu zatrzymaliśmy pracę.

Przed zatrzymaniem weszły dwa commity:

```text
0c9dfce deploy: add production container layout
902fef6 docs: document VPS deployment workflow
```

Dodane zostały:

- `Dockerfile`,
- `compose.yaml`,
- `.dockerignore`,
- `deploy/container-nginx.conf`,
- `deploy/host-nginx.conf.example`,
- `.github/workflows/deploy-check.yml`,
- `DEPLOYMENT.md`,
- dokumentacja w README / PROJECT-NOTES.

Workflow `Deployment check` dla commita `0c9dfce` zakończył się sukcesem.

To oznacza wyłącznie, że konfiguracja deploymentu została przygotowana i statycznie sprawdzona.

**Nie oznacza to, że TechHandbook został wdrożony na VPS.**

Nie wykonywać automatycznie żadnych operacji na VPS na początku nowej rozmowy.

## Ważne decyzje architektoniczne

- frontend pozostaje prostą aplikacją statyczną,
- nie dokładamy frameworka bez realnej potrzeby,
- Markdown pozostaje źródłem treści,
- `content-index.json` nie jest ręcznie edytowany,
- linkowanie między artykułami opiera się na stabilnych ID, nie ścieżkach,
- `related` jest relacją redakcyjną, nie automatem z tagów,
- hostowy nginx ma docelowo obsługiwać TLS i routing wielu domen,
- kontener TechHandbook ma być dostępny lokalnie dla hosta, nie bezpośrednio z Internetu,
- indeksowanie wyszukiwarek włączamy dopiero po poprawnym uruchomieniu produkcji.

## Punkt startowy następnej rozmowy

Na początku:

1. przeczytać ten plik,
2. przeczytać `ROADMAP.md`,
3. sprawdzić aktualny HEAD,
4. nie powtarzać wykonanych etapów,
5. nie kontynuować deploymentu bez sprawdzenia stanu repo i uzgodnienia, że to nadal następny krok.

