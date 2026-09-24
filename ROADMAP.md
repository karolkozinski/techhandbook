# TechHandbook - roadmap od milestone 2026-09-20

Ta roadmapa zaczyna się od aktualnego, uporządkowanego stanu projektu.

Nie obejmuje ponownego wykonywania zakończonych prac: migracji front matter, CI, pełnego audytu istniejącej biblioteki, stabilnych URL-i ani przygotowania SEO / LLM.


## Status na 2026-09-24

Etapy infrastrukturalne i discovery zostały zakończone.

### Zakończone

- [x] audyt i uruchomienie deploymentu,
- [x] VPS, Docker Compose, host nginx i TLS,
- [x] stabilne clean URL-e i prawdziwe 404,
- [x] production switch i włączenie indeksowania,
- [x] canonical, hreflang, JSON-LD, sitemap, robots i `llms.txt`,
- [x] prerender artykułów dla crawlerów,
- [x] Google Search Console,
- [x] Bing Webmaster Tools,
- [x] IndexNow,
- [x] Umami,
- [x] Google Tag Manager,
- [x] GA4,
- [x] CMP dla EU i US,
- [x] Google Consent Mode,
- [x] `ads.txt`,
- [x] loader AdSense wyłącznie w Tech Handbook.

### W toku po stronie zewnętrznej

- AdSense: review witryny / status `Getting ready`.

### Odłożone jako rozwój, nie blocker v1.0

- rozbudowane eventy analityczne,
- kampania edukacyjna Google Ads,
- fizyczne sloty reklamowe i testy placementu,
- narzędzia interaktywne,
- rozbudowany monitoring i optymalizacja,
- dalsze kompendia i rozszerzanie biblioteki.

### Kryterium zamknięcia v1.0

Tech Handbook można uznać za technicznie gotowy do pracy produkcyjnej. Dalsze zadania są utrzymaniem, obserwacją danych i rozwojem treści, a nie częścią uruchomienia platformy.

---

## Kolejność dalszych prac

```text
stan obecny
    ↓
weryfikacja przygotowanego deploymentu
    ↓
VPS + domena produkcyjna
    ↓
test produkcyjny
    ↓
włączenie indeksowania
    ↓
Search Console / Bing / IndexNow
    ↓
analytics + consent
    ↓
Google Ads - nauka i pomiar
    ↓
AdSense / reklamy serwisu
    ↓
narzędzia interaktywne
    ↓
monitoring, optymalizacja i dalsza rozbudowa treści
```

---

## Etap A - weryfikacja przygotowanego deploymentu

**Nie zaczynać od zmian. Najpierw audyt istniejących plików deploymentu.**

Sprawdzić:

- `Dockerfile`,
- `compose.yaml`,
- `deploy/container-nginx.conf`,
- `deploy/host-nginx.conf.example`,
- `DEPLOYMENT.md`,
- `.github/workflows/deploy-check.yml`.

Cel:

- upewnić się, że konfiguracja odpowiada rzeczywistemu VPS,
- upewnić się, że kontener binduje się tylko do localhost,
- sprawdzić fallback clean URL-i do `index.html`,
- sprawdzić cache headers dla assets / Markdown / JSON,
- nie włączać jeszcze indeksowania.

Definition of Done:

- deployment config jest zaakceptowany,
- brak zmian „na ślepo”,
- wiadomo dokładnie, jakie polecenia wykonamy na VPS.

---

## Etap B - uruchomienie na VPS

Założony model:

```text
Internet
   ↓
host nginx :80/:443
   ↓
127.0.0.1:<port>
   ↓
TechHandbook container
```

Plan:

1. przygotować Debian na VPS,
2. zainstalować Docker / Compose,
3. zainstalować hostowy nginx,
4. sklonować repo,
5. uruchomić `docker compose up -d --build`,
6. skonfigurować hostowy reverse proxy,
7. ustawić DNS `techhandbook.nullyard.com`,
8. uruchomić TLS,
9. sprawdzić clean URL-e,
10. sprawdzić PL / EN / STANDARD / JUNIOR,
11. sprawdzić bezpośrednie wejścia na artykuły,
12. sprawdzić mobile.

Na tym etapie:

```json
"indexingEnabled": false
```

---

## Etap C - production switch i indeksowanie

Dopiero po poprawnym działaniu domeny:

1. ustawić `indexingEnabled: true`,
2. ponownie wygenerować SEO artifacts,
3. sprawdzić canonical,
4. sprawdzić hreflang,
5. sprawdzić JSON-LD,
6. sprawdzić sitemap,
7. sprawdzić robots,
8. sprawdzić `llms.txt`,
9. uruchomić CI,
10. wdrożyć zmianę.

Następnie:

- Google Search Console,
- Bing Webmaster Tools,
- IndexNow.

---

## Etap D - analityka i consent

Dodać dopiero po ustabilizowaniu produkcji.

Plan:

1. GTM,
2. GA4,
3. Umami jako niezależny pomiar,
4. CMP,
5. Google Consent Mode,
6. porównanie danych GA4 i Umami.

Minimalne eventy:

- `article_view`,
- `search`,
- `search_click`,
- `language_change`,
- `copy_code`,
- `related_click`,
- `external_link`,
- `scroll_50`,
- `scroll_90`,
- później `tool_open` / `tool_use`.

Cel tego etapu to również nauka analityki, nie tylko zbieranie statystyk.

---

## Etap E - Google Ads

Dopiero gdy analytics działa poprawnie.

Założenie:

- mały budżet edukacyjny,
- kampania służy nauce Google Ads i mierzenia ruchu,
- nie udajemy, że TechHandbook na tym etapie musi mieć dodatni ROI.

Plan:

1. konto / konfiguracja Google Ads,
2. połączenie z GA4,
3. mała kampania kierująca do wybranego materiału,
4. UTM,
5. analiza query / CTR / CPC / zachowania na stronie,
6. poprawa landing page na podstawie danych.

---

## Etap F - reklamy / monetyzacja

Dopiero po zebraniu ruchu bazowego.

Plan:

1. neutralny komponent reklamowy w frontendzie,
2. slot nad / przy artykule,
3. opcjonalny slot wewnątrz długiego artykułu,
4. AdSense,
5. `ads.txt`,
6. baseline przychodu i wpływu reklam,
7. później A/B placementu.

Zasada:

- żadnych agresywnych formatów,
- czytelność TechHandbooka ważniejsza od krótkoterminowego RPM.

---

## Etap G - narzędzia interaktywne

Pierwsza paczka:

- kalkulator chmod,
- generator crona,
- kalkulator CIDR,
- wyszukiwarka HTTP status codes,
- baza / wyszukiwarka portów.

Każde narzędzie powinno:

- być lekkie,
- działać bez backendu, jeśli nie ma potrzeby,
- mieć link z odpowiednich artykułów,
- generować eventy `tool_open` i `tool_use`.

---

## Etap H - monitoring i optymalizacja

Po wejściu produkcji:

- uptime,
- błędy nginx,
- 404,
- crawler logs,
- ruch botów,
- Core Web Vitals,
- Search Console,
- indeksacja,
- popularne wyszukiwania wewnętrzne,
- wejścia / wyjścia artykułów.

Na tej podstawie:

- poprawiać nawigację,
- wzmacniać internal linking,
- rozbudowywać artykuły o realnym ruchu,
- usuwać ślepe uliczki.

---

## Etap I - dalsze treści

Dopiero po ustabilizowaniu całej platformy można wrócić do rozszerzania biblioteki.

Najbardziej sensowne nowe tematy:

### FreeBSD / storage

- ZFS w praktyce,
- FreeBSD Jails,
- backup i disaster recovery,
- pf / nftables.

### Go

- struktura projektu i idiomy,
- concurrency / context / testing,
- Go + PostgreSQL + API.

### PostgreSQL

- indeksy i `EXPLAIN`,
- backup / WAL / replication.

### AI

- integracja API LLM,
- RAG,
- embeddings,
- pgvector.

Nie dublować tematów, które już mają własne kompendia. Najpierw rozbudować istniejący artykuł, jeśli nowy materiał jest po prostu jego naturalną częścią.

---

## Rzeczy odłożone na później

Nie są teraz priorytetem:

- Google Ad Manager,
- alternatywni providerzy reklam,
- rozbudowany backend,
- framework frontendowy,
- centralny „Null Yard Web Core”.

Wspólny web core ma sens dopiero wtedy, gdy drugi lub trzeci projekt Null Yard pokaże rzeczywiste powtarzalne elementy.

---

## Następny krok

1. Obserwować indeksację w Google Search Console i Bing Webmaster Tools.
2. Poczekać na zakończenie review AdSense.
3. Nie dokładać nowych warstw infrastruktury bez konkretnej potrzeby.
4. Rozwijać treści i narzędzia iteracyjnie na podstawie realnego użycia.
5. Przy najbliższym porządkowaniu repo oznaczyć stan projektu jako v1.0.
