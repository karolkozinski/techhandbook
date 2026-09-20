---
id: "doc-043"
title: "UX i dostępność dla developera"
slug: "ux-i-dostepnosc-dla-developera"
description: "UX i dostępność dla developera — praktyczne kompendium TechHandbook."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "ux"
  - "accessibility"
  - "a11y"
  - "wcag"
---

# UX i dostępność dla developera

## 1. UX dla developera

UX to nie tylko wygląd.

Dobre rozwiązanie:
- jest zrozumiałe,
- przewidywalne,
- daje feedback,
- pomaga naprawić błąd,
- nie wymaga zgadywania.

## 2. Hierarchia

Użytkownik powinien od razu wiedzieć:
- gdzie jest,
- co może zrobić,
- co jest najważniejsze.

## 3. Formularze

Każde pole powinno mieć label:

```html
<label for="email">E-mail</label>
<input id="email" name="email" type="email">
```

Placeholder nie zastępuje label.

## 4. Błędy

Słabo:

```text
Error 422
```

Lepiej:

```text
Adres e-mail ma nieprawidłowy format.
```

Jeszcze lepiej:
- wskaż konkretne pole,
- zachowaj poprawnie wprowadzone dane,
- powiedz jak naprawić problem.

## 5. Loading state

Jeżeli operacja trwa:
- pokaż stan,
- zablokuj podwójne wysłanie,
- daj informację o zakończeniu.

## 6. Empty state

Zamiast pustej tabeli:

```text
Nie masz jeszcze projektów.
Utwórz pierwszy projekt.
```

## 7. Keyboard navigation

Aplikacja powinna być używalna bez myszy.

Sprawdź:
- Tab,
- Shift+Tab,
- Enter,
- Space,
- Escape.

## 8. Focus

Nie usuwaj outline bez zapewnienia zamiennika.

```css
:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
}
```

## 9. Semantyczny HTML

Używaj:

```html
header
nav
main
section
article
button
form
label
footer
```

zamiast budować wszystko z `div`.

## 10. Button vs link

Link:
- prowadzi gdzieś.

Button:
- wykonuje akcję.

Nie rób klikalnego `div`, jeśli potrzebujesz przycisku.

## 11. Alt text

Informacyjny obraz:

```html
<img src="chart.png" alt="Wzrost sprzedaży o 18% rok do roku">
```

Dekoracyjny:

```html
<img src="decoration.svg" alt="">
```

## 12. Kontrast

Tekst musi być czytelny.

Nie projektuj tylko „na oko”. Warto używać narzędzi sprawdzających kontrast.

## 13. Kolor

Nie przekazuj informacji wyłącznie kolorem.

Źle:

```text
zielone = OK
czerwone = błąd
```

Lepiej:
- kolor,
- ikona,
- tekst.

## 14. Responsive design

Projektuj dla:
- telefonu,
- tabletu,
- desktopu.

Nie tylko skaluj wszystko proporcjonalnie.

## 15. Touch targets

Elementy dotykowe powinny być wystarczająco duże i mieć odstęp.

## 16. Motion

Animacja powinna:
- pomagać,
- nie przeszkadzać.

Respektuj:

```css
@media (prefers-reduced-motion: reduce) {
    /* ogranicz animacje */
}
```

## 17. ARIA

Zasada:

```text
najpierw semantyczny HTML, potem ARIA
```

Nie dodawaj ARIA, jeśli natywny element już ma odpowiednią semantykę.

## 18. aria-label

Przykład dla przycisku z samą ikoną:

```html
<button aria-label="Zamknij">
    ×
</button>
```

## 19. Screen reader

Sprawdź:
- kolejność nagłówków,
- nazwy przycisków,
- label formularzy,
- komunikaty błędów.

## 20. WCAG — praktycznie

Nie musisz znać całego standardu na pamięć.

Developer powinien przede wszystkim pilnować:
- semantyki,
- klawiatury,
- focus,
- kontrastu,
- label,
- alt,
- komunikatów błędów,
- responsywności.

## 21. UX procesu

Dobry proces:
1. użytkownik wie, co zrobić,
2. system pokazuje postęp,
3. sukces jest potwierdzony,
4. błąd można naprawić.

## 22. Potwierdzenie operacji destrukcyjnej

Przy usuwaniu ważnych danych:
- jednoznaczny komunikat,
- nazwa obiektu,
- jasny przycisk.

Nie pytaj o potwierdzenie każdej drobnostki.

## 23. Progressive disclosure

Nie pokazuj 30 opcji od razu.

Najczęstsze funkcje:
- widoczne,
- zaawansowane:
  ukryte głębiej.

## 24. Developer checklist

- semantyczny HTML,
- obsługa klawiatury,
- widoczny focus,
- label formularzy,
- czytelne błędy,
- loading state,
- empty state,
- responsive,
- poprawne button/link,
- sensowny alt,
- brak informacji tylko kolorem.

## 25. Co trzeba umieć

- ocenić formularz,
- znaleźć problemy dostępności,
- tworzyć semantyczny HTML,
- projektować stany loading/error/empty,
- rozumieć podstawowe wymagania WCAG.
