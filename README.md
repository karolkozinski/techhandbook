# Tech Handbook

Tech Handbook to otwarta, praktyczna baza wiedzy technicznej rozwijana w ramach projektów **Null Yard**.

Repozytorium zawiera zestaw kompendiów w formacie Markdown dotyczących programowania, systemów operacyjnych, sieci, infrastruktury, chmury, bezpieczeństwa, testowania, rozwiązań webowych, narzędzi developerskich, analityki cyfrowej oraz sztucznej inteligencji.

Celem projektu nie jest zastępowanie oficjalnej dokumentacji ani tworzenie akademickiego podręcznika. Materiały mają przede wszystkim pomagać szybko zrozumieć technologię, przypomnieć sobie najważniejsze polecenia i pojęcia oraz sprawnie wejść w nowe środowisko lub projekt.

## Wersja WWW

Tech Handbook jest dostępny również jako lekka statyczna strona:

**https://techhandbook.nullyard.com/**

Wersja webowa oferuje przeglądanie katalogów, wyszukiwanie materiałów oraz czytnik plików Markdown. Źródłem treści pozostają pliki znajdujące się w tym repozytorium. GitHub Pages pozostaje dodatkowym podglądem repozytorium, a domeną kanoniczną jest `techhandbook.nullyard.com`.

## Założenia

Każde kompendium powinno być:

- praktyczne,
- możliwie samodzielne,
- napisane prostym językiem,
- nastawione na realne zastosowania,
- uzupełnione przykładami,
- łatwe do przeszukiwania,
- przydatne jako materiał referencyjny podczas pracy.

Materiały nie są pisane jako klasyczne kursy prowadzące krok po kroku przez ćwiczenia. Ich zadaniem jest raczej zapewnienie uporządkowanej mapy danego zagadnienia.

## Zakres

Repozytorium obejmuje między innymi:

- Linux, Debian i FreeBSD,
- Windows Server,
- shell i shell scripting,
- Git i GitHub,
- Docker i CI/CD,
- systemd, cron i schedulery,
- HTML, CSS, JavaScript i Node.js,
- Go, Python i C,
- Browser DevTools,
- nginx,
- HTTP, HTTPS i TLS,
- DNS, routing i sieci komputerowe,
- SSH,
- PostgreSQL i SQL,
- API i integracje,
- OAuth 2.0, OpenID Connect, JWT i sesje,
- AWS, Azure, Google Cloud, Oracle Cloud i Alibaba Cloud,
- bezpieczeństwo aplikacji, cybersecurity i podstawy pentestingu,
- testowanie oprogramowania,
- wyrażenia regularne,
- Technical SEO,
- web performance i Core Web Vitals,
- web analytics, tagging i UTM,
- A/B testing i eksperymenty,
- HTML email / EDM,
- dokumentowanie rozwiązań technicznych,
- troubleshooting aplikacji webowych,
- AI, agenci i promptowanie,
- edytory i narzędzia developerskie,
- UX i dostępność.

Zakres będzie rozwijany wraz z pojawianiem się nowych potrzeb.

## Struktura repozytorium

Materiały są pogrupowane tematycznie w katalogu `md/` i rozdzielone według języka. Obecnie komplet dokumentów jest dostępny po polsku i po angielsku.

Przykładowa struktura:

```text
techhandbook/
├── README.md
├── README.en.md
├── index.html
├── content-index.json
├── assets/
└── md/
    ├── pl/
    │   ├── ai/
    │   ├── architecture/
    │   ├── cloud/
    │   ├── data-api/
    │   ├── devops/
    │   ├── digital/
    │   ├── networking/
    │   ├── programming/
    │   ├── security/
    │   ├── shell/
    │   ├── systems/
    │   ├── testing/
    │   ├── tools/
    │   ├── troubleshooting/
    │   └── web/
    └── en/
        └── ... ten sam układ kategorii
```

Każdy dokument jest niezależnym plikiem Markdown.

Dzięki temu można go:

- czytać bezpośrednio na GitHubie,
- otworzyć w dowolnym edytorze tekstowym,
- przeszukiwać przez `grep`,
- klonować lokalnie,
- wersjonować przez Git,
- czytać przez statyczny interfejs WWW.

## Dla kogo jest ten projekt

Tech Handbook jest przeznaczony przede wszystkim dla osób technicznych, które pracują na styku kilku obszarów.

W szczególności może być przydatny dla:

- developerów,
- front-end developerów,
- osób zajmujących się rozwiązaniami cyfrowymi,
- administratorów rozpoczynających pracę z nową technologią,
- technicznych project i solution managerów,
- osób budujących własny homelab lub VPS,
- osób rozwijających kompetencje DevOps.

Nie zakłada eksperckiej wiedzy we wszystkich opisanych dziedzinach.

## Jak korzystać

Repozytorium można sklonować:

```bash
git clone https://github.com/karolkozinski/techhandbook.git
cd techhandbook
```

Wyszukiwanie plików:

```bash
find md/pl md/en -iname '*dns*'
```

Wyszukiwanie wewnątrz dokumentów:

```bash
grep -Rni "reverse proxy" md/pl md/en
```

Do wygodnego czytania można również używać wersji WWW.

## Indeks treści

Interfejs webowy nie skanuje katalogów dynamicznie. Runtime index znajduje się w content-index.json.

Ten plik jest generowany automatycznie i nie należy edytować go ręcznie.

Źródłem metadanych artykułu jest front matter w Markdownzie, ścieżka i kategoria wynikają z filesystemu, a relacje między artykułami znajdują się w content-relations.json.

Walidacja i regeneracja indeksu:

    python3 -m pip install -r requirements-dev.txt
    python3 scripts/content_index.py --check
    python3 scripts/content_index.py --write

GitHub Actions sprawdza spójność indeksu przy zmianach treści.


## Dodawanie nowego artykułu

Repozytorium zawiera interaktywny generator:

```bash
python3 scripts/new_article.py
```

Dla treści STANDARD generator:

- wybiera następne wolne stabilne `doc-XXX`,
- tworzy od razu parę PL + EN z tym samym ID,
- pyta o kategorię, tytuły, slugi, opisy i tagi,
- wymaga 4-6 powiązanych artykułów,
- aktualizuje `content-relations.json`,
- regeneruje `content-index.json`, `sitemap.xml`, `robots.txt` i `llms.txt`,
- uruchamia walidację i style audit.

Dla treści JUNIOR generator tworzy pojedynczy artykuł w wybranym języku.

Generator tworzy szkielet z sekcją `TODO`. Przed commitem należy zastąpić ją właściwą treścią, ustawić `ai.human_reviewed: true` po przeglądzie i ponownie uruchomić:

```bash
python3 scripts/content_index.py --write
python3 scripts/seo_artifacts.py --write
python3 scripts/content_index.py --check
python3 scripts/seo_artifacts.py --check
python3 scripts/style_audit.py
```

Po przygotowaniu i sprawdzeniu nowego artykułu:

```bash
git status
git add md content-index.json content-relations.json sitemap.xml robots.txt llms.txt
git commit -m "content: add <nazwa-artykulu>"
git push
```

Następnie na VPS:

```bash
cd /srv/apps/techhandbook
sudo -u nullyard git pull --ff-only
sudo docker compose build --pull
sudo docker compose up -d --remove-orphans
sudo docker compose ps
curl -fsS http://127.0.0.1:8092/healthz
```

Health check powinien zwrócić:

```text
ok
```

Po wdrożeniu warto otworzyć bezpośredni URL nowego artykułu oraz sprawdzić, czy pojawił się w `sitemap.xml` i `llms.txt`.

Pełna instrukcja produkcyjnego deploymentu i rollbacku znajduje się w `DEPLOYMENT.md`.

## Deployment

Docelowy wariant produkcyjny wykorzystuje kontener nginx wystawiony wyłącznie na loopback VPS-a oraz hostowy nginx odpowiedzialny za domenę i TLS.

Instrukcja znajduje się w DEPLOYMENT.md.


## Stan produkcyjny

Stan na 2026-09-24:

- produkcja: `https://techhandbook.nullyard.com/`,
- deployment: Docker Compose + unprivileged nginx za hostowym nginx,
- HTTPS: aktywne,
- indeksowanie: włączone,
- Google Search Console: skonfigurowane,
- Bing Webmaster Tools: skonfigurowane,
- sitemap: opublikowana i zgłoszona,
- IndexNow: klucz wdrożony i URL-e zgłoszone,
- `robots.txt`: pozwala na crawl i wskazuje sitemapę,
- `llms.txt`: opublikowany z listą stabilnych URL-i PL/EN,
- prerender: aktywny dla artykułów, aby crawlery otrzymywały gotowy HTML,
- Umami: aktywne jako niezależna analityka,
- Google Tag Manager: aktywny,
- GA4: aktywne i zweryfikowane w Realtime,
- Google CMP: skonfigurowane dla EU i US,
- Google Consent Mode: skonfigurowany,
- `ads.txt`: opublikowany na `nullyard.com`,
- AdSense loader: aktywny wyłącznie w Tech Handbook,
- AdSense: witryna oczekuje na zakończenie review po stronie Google.

Główna strona `nullyard.com` nie zawiera kodu reklamowego Tech Handbooka. Plik `ads.txt` na domenie głównej służy wyłącznie autoryzacji wydawcy.

## Aktualność informacji

Technologie zmieniają się.

Polecenia, wersje oprogramowania, API, usługi chmurowe i dobre praktyki mogą z czasem ulec zmianie.

Dlatego przed wykonaniem operacji mającej wpływ na produkcję, bezpieczeństwo lub dane warto zawsze sprawdzić również aktualną dokumentację producenta.

Tech Handbook należy traktować jako mapę i podręczną dokumentację, a nie jako jedyne źródło prawdy.

## Bezpieczeństwo

Przykłady związane z cybersecurity, analizą sieci i pentestingiem są przeznaczone do:

- własnych systemów,
- laboratoriów,
- środowisk testowych,
- infrastruktury, do której użytkownik posiada odpowiednie uprawnienia.

Nie należy testować cudzych systemów bez zgody ich właściciela.

## Format

Podstawowym formatem projektu jest Markdown.

Markdown:

- jest czytelny jako zwykły tekst,
- dobrze działa z Git,
- jest renderowany przez GitHub,
- nie wymaga specjalnego oprogramowania,
- jest łatwy do edycji w wielu edytorach,
- może być łatwo prezentowany jako strona WWW.

## Rozwój projektu

Tech Handbook jest projektem rozwijanym iteracyjnie.

Nowe materiały mogą pojawiać się wraz z:

- pracą nad nowymi projektami,
- wdrażaniem nowych technologii,
- budową infrastruktury,
- eksperymentami,
- nauką,
- potrzebą uporządkowania wiedzy.

Istniejące dokumenty mogą być poprawiane i rozszerzane.

## Null Yard

Tech Handbook jest jednym z projektów rozwijanych pod nazwą **Null Yard**.

Null Yard skupia małe projekty programistyczne, narzędzia, eksperymenty i rozwiązania techniczne powstające z potrzeby zrozumienia problemu lub zbudowania czegoś użytecznego.

---

**Tech Handbook**

Praktyczna wiedza techniczna. Bez zbędnej teorii i bez potrzeby pamiętania wszystkiego.
