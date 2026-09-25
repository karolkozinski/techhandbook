# Tech Handbook - roadmap

## Status na 2026-09-25

Tech Handbook v1.0 jest wdrożony produkcyjnie.

Platforma posiada:

- publiczną bibliotekę PL/EN,
- stabilny model treści i clean URL-i,
- automatyczną walidację treści,
- powtarzalny deployment,
- SEO i discovery,
- analytics i consent,
- system zgłaszania problemów z treścią,
- prywatną administrację zgłoszeń,
- izolowany backend pomocniczy,
- automatyczną analizę zgłoszeń,
- politykę retencji danych,
- security hardening publicznego repozytorium.

Dalsze prace są utrzymaniem, obserwacją danych i rozwojem treści lub funkcji, a nie częścią pierwszego uruchomienia platformy.

## v1.0 - zakończone

- [x] uporządkowanie modelu treści i front matter,
- [x] wersje PL/EN i stabilne identyfikatory dokumentów,
- [x] content index i mapa relacji,
- [x] clean URL-e i prawdziwe HTTP 404,
- [x] VPS, Docker Compose, nginx i TLS,
- [x] produkcyjny health check,
- [x] canonical, hreflang i JSON-LD,
- [x] sitemap, robots i `llms.txt`,
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
- [x] loader AdSense wyłącznie w Tech Handbook,
- [x] review API,
- [x] prywatny panel administracyjny zgłoszeń,
- [x] automatyczna analiza zgłoszeń,
- [x] rozdzielenie tokenów review/admin,
- [x] retencja `reporter_stamp`,
- [x] systemd timer retencji,
- [x] hardening tras administracyjnych,
- [x] `no-store`, `noindex` i security headers dla admina,
- [x] secret scanning w CI,
- [x] końcowy audyt bezpieczeństwa publicznego repozytorium.

## W toku po stronie zewnętrznej

- AdSense: review witryny po stronie Google.

## Zasady dalszego rozwoju

- nie dokładamy infrastruktury bez konkretnej potrzeby,
- publiczna część pozostaje static-first,
- backend pozostaje mały i izolowany,
- nowe funkcje muszą przejść istniejące checki CI,
- treści rozwijamy na podstawie realnych potrzeb i użycia,
- dane zbieramy tylko wtedy, gdy służą konkretnej decyzji,
- bezpieczeństwo publicznego repo traktujemy jako warunek, nie późniejszy etap.

## Następna kolejność prac

```text
v1.0 production
    ↓
utrzymanie i obserwacja
    ↓
rozwój treści
    ↓
narzędzia interaktywne
    ↓
optymalizacja UX / wydajności / discovery
```

## Obserwacja i utrzymanie

Regularnie sprawdzać:

- uptime i health check,
- błędy nginx,
- nietypowe 404,
- działanie review API,
- timer retencji,
- Search Console,
- Bing Webmaster Tools,
- indeksację,
- Core Web Vitals,
- Umami i GA4,
- skuteczność wyszukiwarki wewnętrznej,
- wyniki CI i secret scanning.

## Treści

Priorytetem po v1.0 jest jakość istniejącej biblioteki.

Przed tworzeniem nowego artykułu sprawdzić, czy materiał nie jest naturalnym rozszerzeniem istniejącego dokumentu.

Sensowne kierunki dalszej rozbudowy:

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

## Narzędzia interaktywne

Potencjalna pierwsza paczka:

- kalkulator chmod,
- generator crona,
- kalkulator CIDR,
- wyszukiwarka HTTP status codes,
- baza / wyszukiwarka portów.

Każde narzędzie powinno:

- być lekkie,
- działać bez backendu, jeśli backend nie jest potrzebny,
- mieć link z odpowiednich artykułów,
- korzystać ze spójnego modelu eventów.

## Reklamy i eksperymenty

AdSense i ewentualne przyszłe kampanie reklamowe nie są blockerem rozwoju projektu.

Zasady:

- żadnych agresywnych formatów,
- czytelność Tech Handbooka ma pierwszeństwo,
- placementy wprowadzamy dopiero po uzyskaniu danych bazowych,
- zmiany mierzymy, zamiast zakładać ich skuteczność.

## Rzeczy odłożone

Nie są obecnie priorytetem:

- Google Ad Manager,
- alternatywni providerzy reklam,
- rozbudowany backend,
- framework frontendowy,
- centralny Null Yard Web Core.

Wspólny web core ma sens dopiero wtedy, gdy kilka projektów pokaże rzeczywiste, powtarzalne potrzeby.
