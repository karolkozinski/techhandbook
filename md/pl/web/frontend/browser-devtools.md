---
id: "doc-046"
title: "Browser DevTools — kompendium praktyczne"
slug: "browser-devtools-kompendium-praktyczne"
description: "Narzędzia deweloperskie przeglądarki są jednym z najważniejszych narzędzi przy pracy z aplikacjami webowymi. Pozwalają diagnozować problemy bez zgadywania."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "devtools"
  - "browser"
  - "network"
  - "console"
  - "debug"
---

# Browser DevTools — kompendium praktyczne

## 1. Po co znać DevTools

Narzędzia deweloperskie przeglądarki są jednym z najważniejszych narzędzi przy pracy z aplikacjami webowymi. Pozwalają diagnozować problemy bez zgadywania.

Najczęściej używane obszary:

- Elements / Inspector,
- Console,
- Network,
- Sources,
- Application / Storage,
- Performance,
- Lighthouse,
- Accessibility.

## 2. Otwieranie DevTools

Najczęściej:

```text
F12
Ctrl+Shift+I
Ctrl+Shift+J  Console
Ctrl+Shift+C  wybór elementu
```

W macOS zwykle używa się `Cmd` zamiast `Ctrl`.

## 3. Elements / Inspector

Panel pokazuje aktualny DOM i zastosowane style CSS.

Możesz:

- edytować HTML na żywo,
- włączać i wyłączać reguły CSS,
- sprawdzać box model,
- badać dziedziczenie,
- sprawdzać computed styles,
- testować pseudo-klasy.

### Box model

Typowa kolejność:

```text
margin
border
padding
content
```

Jeżeli element ma zły rozmiar, sprawdź:

- `width`,
- `height`,
- `padding`,
- `border`,
- `box-sizing`.

## 4. Computed styles

Panel computed pokazuje końcową wartość właściwości po uwzględnieniu:

- cascade,
- specificity,
- inheritance,
- media queries.

To najlepsze miejsce, jeśli nie wiadomo, dlaczego CSS zachowuje się inaczej niż oczekiwano.

## 5. Responsive mode

DevTools potrafi emulować viewport urządzenia mobilnego.

Sprawdzaj:

- szerokość,
- wysokość,
- orientację,
- DPR,
- touch,
- throttling sieci.

Emulacja nie zastępuje testu na prawdziwym urządzeniu, ale pozwala szybko znaleźć większość problemów.

## 6. Console

Console służy do:

- błędów JavaScript,
- warningów,
- logów,
- wykonywania kodu,
- sprawdzania obiektów.

Przykład:

```js
console.log("test");
console.table(data);
console.error(error);
```

Przydatne:

```js
document.querySelector("selector")
localStorage
location
navigator
```

## 7. Network

Network pokazuje wszystkie requesty wykonane przez stronę.

Najważniejsze kolumny:

- Name,
- Status,
- Type,
- Size,
- Time,
- Initiator.

Można filtrować:

```text
Fetch/XHR
JS
CSS
Img
Doc
Font
```

## 8. Analiza requestu

Po kliknięciu requestu sprawdź:

### Headers

- URL,
- metoda,
- status,
- request headers,
- response headers.

### Payload

Dane POST/PUT/PATCH.

### Response

Treść odpowiedzi.

### Timing

Czas:

- DNS,
- connection,
- TLS,
- TTFB,
- download.

## 9. Disable cache

W Network można wyłączyć cache podczas otwartych DevTools.

To bardzo przydatne przy diagnozowaniu:

- starych CSS,
- starego JS,
- nieaktualnych obrazów.

## 10. Throttling

Można symulować wolniejszą sieć i CPU.

Przykładowe scenariusze:

- Fast 3G,
- Slow 3G,
- offline.

Dzięki temu łatwo znaleźć aplikacje, które działają dobrze tylko na szybkim komputerze i światłowodzie.

## 11. Preserve log

`Preserve log` zachowuje requesty po:

- reloadzie,
- redirectach,
- zmianie strony.

Przydatne przy logowaniu i OAuth.

## 12. Copy as cURL

Bardzo użyteczna funkcja:

```text
Network → request → Copy → Copy as cURL
```

Dostajesz request, który można odtworzyć w terminalu.

## 13. Sources

Panel Sources pozwala:

- oglądać JS,
- ustawiać breakpointy,
- wykonywać kod krok po kroku,
- analizować call stack.

## 14. Breakpoint

Typowy flow:

1. ustaw breakpoint,
2. wykonaj akcję,
3. kod się zatrzyma,
4. sprawdź wartości zmiennych,
5. przechodź krok po kroku.

Najważniejsze operacje:

- step over,
- step into,
- step out,
- resume.

## 15. Event listener breakpoints

Można zatrzymać kod przy:

- click,
- submit,
- keyboard,
- timer,
- XHR/fetch.

To bardzo przydatne w obcym projekcie.

## 16. Application / Storage

Można sprawdzić:

- cookies,
- localStorage,
- sessionStorage,
- IndexedDB,
- service workers,
- cache storage.

## 17. Cookies

Sprawdzaj:

- Name,
- Domain,
- Path,
- Expires,
- HttpOnly,
- Secure,
- SameSite.

To pomaga diagnozować sesje i logowanie.

## 18. LocalStorage i sessionStorage

Można ręcznie:

- czytać wartości,
- zmieniać je,
- usuwać,
- czyścić storage.

Nie przechowuj sekretów tylko dlatego, że localStorage jest wygodny.

## 19. Performance

Performance pozwala nagrać działanie strony i zobaczyć:

- long tasks,
- scripting,
- rendering,
- layout,
- paint,
- network.

Szukaj przede wszystkim:

- długich blokad main thread,
- częstych layoutów,
- ciężkiego JavaScript.

## 20. Lighthouse

Lighthouse ocenia m.in.:

- Performance,
- Accessibility,
- Best Practices,
- SEO.

Wynik jest wskazówką, nie absolutną prawdą.

Najważniejsze jest zrozumienie konkretnej rekomendacji.

## 21. Accessibility

DevTools pomaga sprawdzać:

- role,
- accessible name,
- contrast,
- focus,
- ARIA.

Dla formularza sprawdź, czy input ma poprawną nazwę dostępną.

## 22. Device emulation

Można zmieniać:

- viewport,
- touch,
- geolocation,
- user agent,
- network.

Nie zakładaj, że emulacja identycznie odwzorowuje prawdziwy telefon.

## 23. Screenshot

DevTools potrafi wykonywać:

- screenshot viewportu,
- full page screenshot,
- screenshot wybranego elementu.

## 24. Przydatny workflow debugowania

Gdy „strona nie działa”:

1. Console — błędy JS.
2. Network — requesty 4xx/5xx.
3. Elements — DOM i CSS.
4. Storage — sesja/cookies.
5. Performance — jeśli problem dotyczy szybkości.

## 25. Co trzeba umieć

- sprawdzić CSS i DOM,
- znaleźć błąd w Console,
- przeanalizować request,
- odtworzyć request przez cURL,
- użyć breakpointu,
- sprawdzić cookies i storage,
- użyć throttlingu,
- wykonać podstawowy audyt Lighthouse.
