---
id: "doc-041"
title: "Architektura małych aplikacji webowych"
slug: "architektura-malych-aplikacji-webowych"
description: "Mały projekt nie potrzebuje mikroserwisów, Kubernetesa i pięciu baz."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "architecture"
  - "web"
  - "backend"
  - "frontend"
---

# Architektura małych aplikacji webowych

Dla małych aplikacji najważniejsza jest przewidywalność, nie liczba technologii. Prosty monolit z jedną bazą i jasnym deploymentem zwykle daje mniej punktów awarii i łatwiejszą diagnostykę niż przedwczesne mikroserwisy.

Powiązane tematy: [nginx i reverse proxy](techhandbook:doc-045), [SQL i PostgreSQL](techhandbook:doc-010), [Docker](techhandbook:doc-012), [API i integracje systemów](techhandbook:doc-008) oraz [Testowanie oprogramowania](techhandbook:doc-049).

## 1. Cel

Mały projekt nie potrzebuje mikroserwisów, Kubernetesa i pięciu baz.

Najczęściej wystarczy:

```text
Browser
  ↓
nginx
  ↓
backend
  ↓
PostgreSQL
```

## 2. Monolit

Monolit to jedna aplikacja zawierająca większość logiki.

Zalety:
- prosty deployment,
- mniej infrastruktury,
- prostszy debugging,
- łatwiejsze transakcje.

Dla małych i średnich projektów często jest najlepszym wyborem.

## 3. Frontend

Może być:
- server-rendered HTML,
- statyczne HTML/CSS/JS,
- SPA React/Vue.

Nie wybieraj SPA automatycznie.

## 4. Backend

Odpowiada za:
- logikę,
- auth,
- API,
- bazę,
- integracje,
- walidację.

## 5. Reverse proxy

nginx:
- TLS,
- routing domen,
- static,
- proxy do backendu.

## 6. Baza

PostgreSQL:
- dane trwałe,
- constraints,
- transakcje,
- indeksy.

## 7. Cache

Redis przydaje się dopiero, gdy masz konkretny powód:
- cache,
- sessions,
- queues,
- rate limiting.

Nie dodawaj go „bo wypada”.

## 8. Config

Kod:

```text
repo
```

Konfiguracja środowiska:

```text
env / config
```

Sekrety:

```text
secret store / env
```

Nigdy nie mieszaj ich bez potrzeby.

## 9. Przykład struktury Go

```text
cmd/
internal/
  http/
  service/
  repository/
  config/
migrations/
web/
Dockerfile
README.md
```

## 10. Layers

Praktyczny podział:

```text
handler
 ↓
service
 ↓
repository
 ↓
database
```

Nie musisz robić 12 warstw.

## 11. Request flow

```text
GET /orders/42
  ↓
nginx
  ↓
router
  ↓
handler
  ↓
service
  ↓
repository
  ↓
PostgreSQL
  ↓
JSON/HTML response
```

## 12. Background jobs

Jeśli coś trwa długo:

```text
request
 ↓
enqueue
 ↓
worker
```

Ale nie dodawaj kolejki, jeśli zwykły cron wystarcza.

## 13. Cron / scheduler

Dobre do:
- raportów,
- synchronizacji,
- okresowych kontroli,
- cleanup.

## 14. External API

Oddziel logikę integracji:

```text
internal/integrations/openrouter
internal/integrations/github
```

Dzięki temu łatwiej testować i zmieniać dostawcę.

## 15. Error handling

Rozróżniaj:
- błąd użytkownika,
- brak zasobu,
- konflikt,
- błąd systemowy.

Nie zwracaj wszystkiego jako HTTP 500.

## 16. Logging

Logi powinny zawierać:
- timestamp,
- level,
- event,
- request ID,
- istotny kontekst.

## 17. Request ID

Przydatny do śledzenia jednej operacji przez kilka warstw.

```text
request_id=abc123
```

## 18. Deployment

Prosty wariant:

```text
GitHub
  ↓
CI
  ↓
Docker image
  ↓
VPS
  ↓
docker compose
  ↓
nginx
```

## 19. Backup

Backupuj:
- bazę,
- uploady,
- ewentualnie konfigurację.

Kod masz w Git.

## 20. Skalowanie

Najpierw mierz.

Typowa kolejność:
1. lepsze zapytania,
2. indeksy,
3. cache tam, gdzie ma sens,
4. więcej zasobów,
5. dopiero później bardziej złożona architektura.

## 21. Mikroserwisy

Mają sens, gdy istnieją realne powody:
- niezależne zespoły,
- osobne skalowanie,
- niezależny cykl wdrożeń,
- wyraźne granice domen.

Nie są automatycznym „wyższym poziomem”.

## 22. MVP

Dobre MVP:
- jedna aplikacja,
- jedna baza,
- prosty deployment,
- monitoring,
- backup.

## 23. Co trzeba umieć

- rozrysować request flow,
- dobrać prostą architekturę,
- oddzielić config od kodu,
- rozumieć rolę nginx/backend/db,
- unikać overengineeringu,
- zaplanować deployment i backup.

## Źródła i dalsza dokumentacja

- The Twelve-Factor App: https://12factor.net/
- PostgreSQL documentation: https://www.postgresql.org/docs/current/
- nginx documentation: https://nginx.org/en/docs/
