# 04. HTML — pierwsza strona

HTML opisuje **co znajduje się na stronie internetowej**: nagłówki, tekst, obrazki, linki i inne elementy.

Otwórz plik `tech-lab/moja-strona/index.html` w edytorze tekstu.

Wpisz:

```html
<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <title>Moja strona</title>
</head>
<body>
  <h1>Cześć!</h1>
  <p>To jest moja pierwsza strona.</p>
</body>
</html>
```

Zapisz plik i otwórz go w przeglądarce.

Właśnie zrobiłeś stronę WWW.

## Co tu się dzieje?

- `<html>` obejmuje całą stronę,
- `<head>` zawiera informacje dla przeglądarki,
- `<title>` ustawia tytuł karty,
- `<body>` zawiera to, co widzi użytkownik,
- `<h1>` jest dużym nagłówkiem,
- `<p>` jest akapitem tekstu.

Większość elementów ma znacznik otwierający i zamykający:

```html
<p>Tekst</p>
```

## Dodaj coś swojego

Pod pierwszym akapitem dodaj:

```html
<h2>O mnie</h2>
<p>Lubię...</p>
```

Wpisz tam cokolwiek chcesz i odśwież stronę.

## Zapamiętaj

HTML przede wszystkim opisuje **strukturę i znaczenie treści**. Wyglądem zajmiemy się w CSS.
