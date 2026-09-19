# Dokumentowanie rozwiązań technicznych — kompendium

## 1. Po co dokumentować

Dokumentacja ma zmniejszyć koszt ponownego zrozumienia systemu.

Powinna odpowiadać na pytania:

- co to jest?
- po co istnieje?
- jak uruchomić?
- jak zmienić?
- jak wdrożyć?
- co zrobić, gdy nie działa?
- dlaczego podjęto takie decyzje?

## 2. README

README jest punktem wejścia.

Dobre README zawiera:

- cel,
- wymagania,
- quick start,
- konfigurację,
- build,
- testy,
- deployment,
- linki do dalszej dokumentacji.

## 3. Quick start

Przykład:

```bash
git clone ...
cd project
cp .env.example .env
docker compose up
```

Quick start powinien prowadzić do działającego efektu.

## 4. Struktura repo

Warto opisać:

```text
cmd/
internal/
web/
migrations/
docs/
```

Szczególnie jeśli układ nie jest oczywisty.

## 5. Konfiguracja

Dokumentuj:

- wymagane zmienne,
- wartości domyślne,
- format,
- przykłady.

Nie umieszczaj sekretów w dokumentacji.

## 6. ADR

Architecture Decision Record dokumentuje ważną decyzję.

Przykład:

```text
Status
Context
Decision
Consequences
```

## 7. Przykład ADR

```md
# ADR-004: PostgreSQL jako główna baza

## Context
Potrzebujemy transakcji i relacyjnego modelu danych.

## Decision
Używamy PostgreSQL.

## Consequences
+ dobre wsparcie transakcji
+ dojrzałe narzędzia
- wymaga backupu i administracji
```

## 8. Dlaczego ADR jest ważny

Kod pokazuje:

```text
co zrobiono
```

ADR pokazuje:

```text
dlaczego
```

## 9. RFC

RFC jest propozycją większej zmiany przed implementacją.

Może zawierać:

- problem,
- cele,
- non-goals,
- propozycję,
- alternatywy,
- ryzyka,
- migrację.

## 10. Non-goals

Bardzo wartościowa sekcja.

Przykład:

```text
Ten projekt nie rozwiązuje:
- multi-region,
- SSO,
- offline mode.
```

Chroni projekt przed rozszerzaniem zakresu.

## 11. Diagram kontekstowy

Najprostszy:

```text
Browser
  ↓
Web app
  ↓
API
  ↓
Database
```

Nie każdy diagram wymaga ciężkiego narzędzia.

## 12. C4 — idea

Poziomy:

- Context,
- Container,
- Component,
- Code.

W większości małych projektów wystarczą pierwsze dwa.

## 13. Sequence diagram

Przykład:

```text
User → Web: login
Web → API: credentials
API → DB: lookup
DB → API: user
API → Web: session
```

Pokazuje kolejność interakcji.

## 14. API documentation

Dokumentuj:

- endpoint,
- metodę,
- auth,
- request,
- response,
- błędy.

Przykład:

```text
POST /api/users

201 Created
400 Bad Request
409 Conflict
```

## 15. OpenAPI

Dla REST API warto rozważyć OpenAPI.

Pomaga:

- generować dokumentację,
- walidować kontrakt,
- tworzyć klienty,
- testować.

## 16. Runbook

Runbook opisuje procedurę operacyjną.

Przykłady:

- restart usługi,
- restore backupu,
- rotacja certyfikatu,
- awaria bazy.

## 17. Dobry runbook

Powinien zawierać:

- warunki użycia,
- kroki,
- komendy,
- oczekiwany wynik,
- rollback,
- punkt eskalacji.

## 18. Troubleshooting guide

Układ:

```text
objaw
możliwe przyczyny
diagnostyka
naprawa
```

## 19. Changelog

Można używać:

```text
Added
Changed
Fixed
Removed
Security
```

Changelog nie powinien być surowym `git log`.

## 20. Versioning

SemVer:

```text
MAJOR.MINOR.PATCH
```

Nie każdy projekt musi stosować SemVer, ale zasady wersjonowania powinny być jasne.

## 21. Komentarze w kodzie

Dobry komentarz wyjaśnia:

```text
dlaczego
```

Słaby komentarz powtarza:

```text
co robi linia kodu
```

## 22. Dokumentacja żywa

Najlepiej, gdy dokumentacja:

- jest w repo,
- podlega review,
- zmienia się z kodem,
- ma właściciela.

## 23. Diagramy jako kod

Przykłady:

- Mermaid,
- PlantUML.

Zaletą jest wersjonowanie w Git.

## 24. Definition of Done

Dla większej zmiany można wymagać:

- kod,
- testy,
- dokumentacja,
- migracja,
- observability.

## 25. Minimalny zestaw dla małego projektu

```text
README.md
docs/architecture.md
docs/runbook.md
CHANGELOG.md
```

ADR tylko dla ważnych decyzji.

## 26. Co trzeba umieć

- napisać README,
- dokumentować konfigurację,
- tworzyć ADR,
- napisać prosty RFC,
- przygotować runbook,
- opisać API,
- utrzymywać dokumentację razem z kodem.
