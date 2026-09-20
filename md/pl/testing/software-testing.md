---
id: "doc-049"
title: "Testowanie oprogramowania — kompendium"
slug: "testowanie-oprogramowania-kompendium"
description: "Testy mają zmniejszać ryzyko regresji i dostarczać informacji o jakości systemu."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "testing"
  - "unit"
  - "integration"
  - "e2e"
  - "playwright"
  - "go test"
---

# Testowanie oprogramowania — kompendium

## 1. Po co testy

Testy mają zmniejszać ryzyko regresji i dostarczać informacji o jakości systemu.

Nie chodzi o maksymalną liczbę testów, lecz o dobre pokrycie ryzyka.

## 2. Poziomy testów

Najczęściej:

- unit,
- integration,
- end-to-end,
- smoke,
- regression,
- acceptance.

## 3. Unit test

Testuje mały fragment logiki w izolacji.

Przykład:

```text
calculatePrice()
validateEmail()
parseConfig()
```

Zalety:

- szybkie,
- precyzyjne,
- łatwe do uruchomienia.

## 4. Integration test

Sprawdza współpracę kilku elementów:

```text
backend + database
service + API client
router + handler
```

## 5. E2E

Testuje system z perspektywy użytkownika:

```text
browser
→ frontend
→ backend
→ database
```

E2E są wartościowe, ale droższe i wolniejsze.

## 6. Smoke test

Krótki zestaw testów:

```text
czy aplikacja wstaje?
czy homepage działa?
czy login działa?
```

Dobry po deploymencie.

## 7. Regression test

Sprawdza, czy wcześniejsze funkcje nadal działają po zmianie.

## 8. Test pyramid

Klasyczna idea:

```text
       E2E
    integration
       unit
```

Więcej szybkich testów niż drogich E2E.

Nie jest to sztywne prawo.

## 9. Arrange / Act / Assert

Typowy układ:

```text
Arrange — przygotuj dane
Act     — wykonaj operację
Assert  — sprawdź wynik
```

## 10. Mock

Mock udaje zależność.

Przykład:

```text
prawdziwe API płatności
↓
mock API
```

Mocki pomagają izolować, ale ich nadmiar może tworzyć testy oderwane od rzeczywistości.

## 11. Stub i fake

Stub:
- zwraca przygotowaną odpowiedź.

Fake:
- uproszczona działająca implementacja.

## 12. Co testować

Najpierw:

- krytyczną logikę,
- przypadki brzegowe,
- bugi, które już wystąpiły,
- kontrakty API,
- integracje,
- najważniejsze user flows.

## 13. Co zwykle ma mały sens

- testowanie frameworka,
- testy identyczne z implementacją,
- testy tylko dla procentu coverage.

## 14. Coverage

Coverage mówi, jaka część kodu została wykonana przez testy.

Nie mówi, czy testy są dobre.

100% coverage nie gwarantuje jakości.

## 15. Testowanie Go

Podstawowo:

```bash
go test ./...
```

Verbose:

```bash
go test -v ./...
```

Race detector:

```bash
go test -race ./...
```

## 16. Testowanie JavaScript

Popularne narzędzia:

- Vitest,
- Jest,
- Testing Library.

Ważne jest testowanie zachowania, nie szczegółów implementacji.

## 17. Playwright

Playwright pozwala automatyzować przeglądarkę.

Przykładowy flow:

```text
wejdź na stronę
kliknij Login
wpisz dane
wyślij
sprawdź wynik
```

## 18. API testing

Testuj:

- status,
- body,
- headers,
- walidację,
- błędy,
- autoryzację.

## 19. Test data

Dane testowe powinny być:

- kontrolowane,
- powtarzalne,
- niezależne od produkcji.

## 20. Flaky tests

Flaky test raz przechodzi, raz nie.

Przyczyny:

- timing,
- zależność od sieci,
- shared state,
- data race,
- kolejność testów.

Flaky testy obniżają zaufanie do całego CI.

## 21. Test isolation

Test powinien dawać ten sam wynik niezależnie od kolejności uruchomienia.

## 22. Fixtures

Fixtures przygotowują dane lub środowisko.

Nie rób z fixture ogromnego magicznego świata trudnego do zrozumienia.

## 23. CI

Dobry pipeline:

```text
format
→ lint
→ unit
→ integration
→ build
→ opcjonalnie E2E
```

## 24. Manual testing

Automatyzacja nie zastępuje całkowicie ręcznego sprawdzenia.

Manual jest dobry dla:

- UX,
- nowych funkcji,
- eksploracji,
- przypadków trudnych do przewidzenia.

## 25. Checklist przed releasem

- testy przechodzą,
- build działa,
- migracje sprawdzone,
- smoke test,
- najważniejszy flow użytkownika,
- logi bez nowych błędów,
- rollback możliwy.

## 26. Co trzeba umieć

- odróżnić unit/integration/E2E,
- dobrać poziom testu,
- rozumieć mocki,
- uruchamiać testy w CI,
- rozpoznawać flaky tests,
- pisać testy najważniejszych zachowań.
