---
id: "junior-005"
title: "05. CSS — nadajemy styl"
slug: "05-css-nadajemy-styl"
description: "HTML mówi, co jest na stronie. CSS mówi, jak to wygląda."
lang: "pl"
audience: "junior"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "junior"
  - "css"
  - "web"
  - "styl"
---

# 05. CSS — nadajemy styl

HTML mówi, **co jest na stronie**. CSS mówi, **jak to wygląda**.

W katalogu `tech-lab/moja-strona` utwórz plik:

`style.css`

Wklej do niego:

```css
body {
  font-family: Arial, sans-serif;
  max-width: 700px;
  margin: 40px auto;
  padding: 20px;
}

h1 {
  font-size: 42px;
}

p {
  line-height: 1.6;
}
```

Teraz trzeba powiedzieć HTML-owi, że ma używać tego pliku.

W `index.html`, wewnątrz `<head>`, dodaj:

```html
<link rel="stylesheet" href="style.css">
```

Zapisz oba pliki i odśwież stronę.

## Jak czytać CSS?

Ten fragment:

```css
h1 {
  font-size: 42px;
}
```

oznacza:

- wybierz wszystkie elementy `h1`,
- ustaw ich rozmiar tekstu na `42px`.

`h1` jest **selektorem**, `font-size` jest **właściwością**, a `42px` jej **wartością**.

## Pobaw się

Zmień kolejno:

- `42px` na `60px`,
- `700px` na `500px`,
- `40px` na `80px`.

Za każdym razem zapisz plik i odśwież stronę. Najszybciej uczysz się CSS, kiedy zmieniasz jedną rzecz i patrzysz, co się stało.

## Co już potrafisz?

Masz własny katalog projektu, plik HTML i osobny arkusz CSS. To jest już prawdziwa, choć bardzo mała, strona internetowa.

Następny krok może dodać JavaScript, a później Git i publikację strony.
