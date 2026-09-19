# Kompendium nowoczesnego HTML i CSS

Praktyczne kompendium referencyjne dla osoby, która chce samodzielnie tworzyć współczesne, semantyczne, responsywne i dostępne strony internetowe.

> HTML opisuje **strukturę i znaczenie treści**.  
> CSS odpowiada za **wygląd, układ i prezentację**.  
> JavaScript dodaje **logikę i interakcję**, gdy HTML i CSS nie wystarczają.

---

## Spis treści

1. [HTML — podstawy](#1-html--podstawy)
2. [Struktura dokumentu](#2-struktura-dokumentu)
3. [Semantyka HTML](#3-semantyka-html)
4. [Tekst, listy i linki](#4-tekst-listy-i-linki)
5. [Obrazy i multimedia](#5-obrazy-i-multimedia)
6. [Tabele](#6-tabele)
7. [Formularze](#7-formularze)
8. [Dostępność](#8-dostępność)
9. [CSS — podstawy](#9-css--podstawy)
10. [Selektory](#10-selektory)
11. [Kaskada, dziedziczenie i specificity](#11-kaskada-dziedziczenie-i-specificity)
12. [Box model](#12-box-model)
13. [Jednostki](#13-jednostki)
14. [Kolory i zmienne CSS](#14-kolory-i-zmienne-css)
15. [Typografia](#15-typografia)
16. [Normal flow](#16-normal-flow)
17. [Flexbox](#17-flexbox)
18. [CSS Grid](#18-css-grid)
19. [Pozycjonowanie](#19-pozycjonowanie)
20. [Responsywność](#20-responsywność)
21. [Container Queries](#21-container-queries)
22. [Nowoczesny CSS](#22-nowoczesny-css)
23. [Dark mode](#23-dark-mode)
24. [Animacje](#24-animacje)
25. [Formularze w CSS](#25-formularze-w-css)
26. [Reset / baza CSS](#26-reset--baza-css)
27. [Organizacja projektu](#27-organizacja-projektu)
28. [Kompletny przykład strony](#28-kompletny-przykład-strony)
29. [Dobre praktyki](#29-dobre-praktyki)
30. [Ściąga](#30-ściąga)
31. [Co trzeba umieć](#31-co-trzeba-umieć)

---

# 1. HTML — podstawy

HTML nie służy do rysowania strony. Jego zadaniem jest opisanie, **czym są poszczególne elementy treści**.

Przykład:

```html
<article class="product">
    <h2>Example Laptop</h2>
    <p>Lekki notebook biznesowy.</p>
    <a href="/prestige-13">Zobacz produkt</a>
</article>
```

HTML mówi:

- to jest samodzielny fragment treści,
- ma nagłówek,
- ma opis,
- zawiera link.

CSS dopiero określa wygląd:

```css
.product {
    padding: 2rem;
    border-radius: 1rem;
    background: white;
}

.product h2 {
    font-size: 1.5rem;
}
```

Nie warto używać nazw klas opisujących wyłącznie wygląd:

```html
<div class="big-red-text">
    Example notebook
</div>
```

Jeśli coś jest nagłówkiem, lepiej napisać:

```html
<h2 class="product-title">
    Example notebook
</h2>
```

---

# 2. Struktura dokumentu

Minimalny współczesny dokument HTML:

```html
<!doctype html>
<html lang="pl">

<head>
    <meta charset="utf-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >

    <title>Moja strona</title>

    <meta
        name="description"
        content="Krótki opis strony."
    >

    <link rel="stylesheet" href="/css/style.css">
</head>

<body>

    <h1>Moja strona</h1>

</body>

</html>
```

## `<!doctype html>`

Informuje przeglądarkę, że dokument używa współczesnego HTML.

Zawsze powinien być pierwszą linią pliku.

## `<html lang="pl">`

Element główny dokumentu.

```html
<html lang="pl">
```

Atrybut `lang` określa język dokumentu i pomaga:

- czytnikom ekranu,
- wyszukiwarkom,
- tłumaczom automatycznym,
- sprawdzaniu pisowni.

## `<head>`

Zawiera metadane dokumentu.

Kodowanie:

```html
<meta charset="utf-8">
```

Viewport:

```html
<meta
    name="viewport"
    content="width=device-width, initial-scale=1"
>
```

Tytuł:

```html
<title>Example Site — opowiadania</title>
```

Opis:

```html
<meta
    name="description"
    content="Opowiadania grozy, weird fiction i science fiction."
>
```

CSS:

```html
<link rel="stylesheet" href="/css/style.css">
```

Favicon:

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
```

---

# 3. Semantyka HTML

Nowoczesna strona nie powinna być zbudowana wyłącznie z `div`.

Typowa struktura:

```html
<body>

<header>
    ...
</header>

<nav>
    ...
</nav>

<main>
    ...
</main>

<footer>
    ...
</footer>

</body>
```

## `<header>`

Nagłówek strony albo sekcji.

```html
<header>
    <h1>Example Site</h1>
    <p>Opowiadania z miejsc, których nie ma.</p>
</header>
```

`header` może występować wiele razy.

```html
<article>
    <header>
        <h2>Głosy z Blackwater</h2>
        <p>Jan Kowalski</p>
    </header>
</article>
```

## `<main>`

Główna treść dokumentu:

```html
<main>
    ...
</main>
```

Zwykle powinien istnieć jeden główny `main`.

## `<nav>`

Nawigacja:

```html
<nav aria-label="Główna nawigacja">
    <a href="/">Start</a>
    <a href="/stories">Opowiadania</a>
    <a href="/cycles">Cykle</a>
    <a href="/about">O stronie</a>
</nav>
```

## `<section>`

Tematyczna sekcja dokumentu:

```html
<section>
    <h2>Najnowsze opowiadania</h2>
</section>
```

Nie używaj `section` jako automatycznego zamiennika `div`.

## `<article>`

Samodzielna treść, która mogłaby istnieć niezależnie:

```html
<article>
    <h2>Dom przy Gray Street</h2>
    <p>...</p>
</article>
```

Typowe zastosowania:

- wpis blogowy,
- artykuł,
- karta produktu,
- news,
- komentarz,
- opowiadanie.

## `<aside>`

Treść poboczna:

```html
<aside>
    <h2>Podobne historie</h2>
</aside>
```

## `<footer>`

Stopka dokumentu lub sekcji:

```html
<footer>
    <p>&copy; 2026 Example Site</p>
</footer>
```

## `<div>`

Neutralny kontener:

```html
<div class="wrapper">
    ...
</div>
```

`div` jest prawidłowy, kiedy potrzebujemy elementu wyłącznie do layoutu albo stylowania.

---

# 4. Tekst, listy i linki

## Nagłówki

HTML ma sześć poziomów nagłówków:

```html
<h1>...</h1>
<h2>...</h2>
<h3>...</h3>
<h4>...</h4>
<h5>...</h5>
<h6>...</h6>
```

Przykład:

```html
<h1>Kompendium FreeBSD</h1>

<h2>System plików</h2>

<h3>ZFS</h3>

<h4>Snapshoty</h4>
```

Nagłówki określają hierarchię treści, nie jej wygląd.

## Akapity

```html
<p>
    To jest akapit tekstu.
</p>
```

## Wyróżnienia

```html
<strong>bardzo ważne</strong>
```

`strong` oznacza znaczeniową wagę.

```html
<em>naprawdę</em>
```

`em` oznacza akcent.

## Cytaty

Krótki cytat:

```html
<p>
    Autor napisał <q>to jest cytat</q>.
</p>
```

Dłuższy cytat:

```html
<blockquote>
    <p>Tekst cytatu.</p>
</blockquote>
```

## Kod

Kod w tekście:

```html
<code>sudo apt update</code>
```

Blok kodu:

```html
<pre><code>sudo apt update
sudo apt upgrade</code></pre>
```

## Listy

Nieuporządkowana:

```html
<ul>
    <li>Debian</li>
    <li>FreeBSD</li>
    <li>OpenBSD</li>
</ul>
```

Numerowana:

```html
<ol>
    <li>Zainstaluj system</li>
    <li>Zaktualizuj pakiety</li>
    <li>Skonfiguruj nginx</li>
</ol>
```

Lista definicji:

```html
<dl>
    <dt>HTML</dt>
    <dd>Struktura dokumentu.</dd>

    <dt>CSS</dt>
    <dd>Wygląd dokumentu.</dd>
</dl>
```

## Linki

```html
<a href="/about">O nas</a>
```

Link zewnętrzny:

```html
<a href="https://example.com">
    Example
</a>
```

Nowa karta:

```html
<a
    href="https://example.com"
    target="_blank"
    rel="noopener"
>
    Example
</a>
```

E-mail:

```html
<a href="mailto:test@example.com">
    Napisz do nas
</a>
```

Telefon:

```html
<a href="tel:+48123456789">
    123 456 789
</a>
```

Kotwica:

```html
<a href="#kontakt">Kontakt</a>

<section id="kontakt">
    <h2>Kontakt</h2>
</section>
```

## Link a przycisk

Link służy do nawigacji:

```html
<a href="/products">
    Produkty
</a>
```

Przycisk służy do wykonania akcji:

```html
<button type="button">
    Otwórz menu
</button>
```

Nie warto robić:

```html
<div onclick="...">Kliknij</div>
```

jeśli element faktycznie jest przyciskiem.

---

# 5. Obrazy i multimedia

## Obraz

```html
<img
    src="/images/castle.jpg"
    alt="Ruiny zamku na wzgórzu"
>
```

`alt` opisuje znaczenie grafiki.

Jeżeli obraz jest dekoracyjny:

```html
<img
    src="/images/decoration.svg"
    alt=""
>
```

## Rozmiary

Dobrze podawać rozmiary:

```html
<img
    src="photo.jpg"
    alt="Stary dom"
    width="1200"
    height="800"
>
```

CSS:

```css
img {
    max-width: 100%;
    height: auto;
}
```

## `srcset`

```html
<img
    src="photo-800.jpg"
    srcset="
        photo-480.jpg 480w,
        photo-800.jpg 800w,
        photo-1600.jpg 1600w
    "
    sizes="
        (max-width: 700px) 100vw,
        800px
    "
    alt="Widok miasta"
>
```

Przeglądarka sama wybiera odpowiedni plik.

## `<picture>`

```html
<picture>

    <source
        srcset="hero.avif"
        type="image/avif"
    >

    <source
        srcset="hero.webp"
        type="image/webp"
    >

    <img
        src="hero.jpg"
        alt="Górski krajobraz"
    >

</picture>
```

## Lazy loading

```html
<img
    src="photo.jpg"
    alt="..."
    loading="lazy"
>
```

Nie dodawaj `loading="lazy"` do najważniejszego obrazu od razu widocznego na ekranie.

## `figure`

```html
<figure>

    <img
        src="server.jpg"
        alt="Serwer stojący w szafie rack"
    >

    <figcaption>
        Domowy serwer FreeBSD.
    </figcaption>

</figure>
```

---

# 6. Tabele

Tabele służą do danych tabelarycznych.

```html
<table>

    <caption>Ceny serwerów</caption>

    <thead>
        <tr>
            <th scope="col">Serwer</th>
            <th scope="col">RAM</th>
            <th scope="col">Cena</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <th scope="row">VPS-1</th>
            <td>4 GB</td>
            <td>20 zł</td>
        </tr>

        <tr>
            <th scope="row">VPS-2</th>
            <td>8 GB</td>
            <td>40 zł</td>
        </tr>
    </tbody>

</table>
```

Nie używaj tabel do budowania layoutu strony.

---

# 7. Formularze

Podstawowy formularz:

```html
<form action="/contact" method="post">

    <label for="name">
        Imię
    </label>

    <input
        id="name"
        name="name"
        type="text"
    >

    <button type="submit">
        Wyślij
    </button>

</form>
```

`name` określa nazwę pola przesyłaną do backendu.

`id` pozwala między innymi powiązać pole z `label`.

## Typy inputów

```html
<input type="text">
<input type="email">
<input type="password">
<input type="number">
<input type="date">
<input type="checkbox">
<input type="radio">
<input type="file">
<input type="url">
<input type="search">
```

## Walidacja

Pole wymagane:

```html
<input
    type="email"
    name="email"
    required
>
```

Minimalna długość:

```html
<input
    type="text"
    minlength="3"
>
```

Maksymalna długość:

```html
<input
    type="text"
    maxlength="100"
>
```

Zakres:

```html
<input
    type="number"
    min="1"
    max="100"
>
```

Wzorzec:

```html
<input
    type="text"
    pattern="[0-9]{6}"
>
```

Walidacja HTML nie zastępuje walidacji backendowej.

## `textarea`

```html
<label for="message">
    Wiadomość
</label>

<textarea
    id="message"
    name="message"
    rows="8"
></textarea>
```

## `select`

```html
<label for="country">
    Kraj
</label>

<select id="country" name="country">

    <option value="">Wybierz</option>
    <option value="pl">Polska</option>
    <option value="de">Niemcy</option>
    <option value="cz">Czechy</option>

</select>
```

## `fieldset`

```html
<fieldset>

    <legend>Rodzaj konta</legend>

    <label>
        <input
            type="radio"
            name="account"
            value="private"
        >
        Prywatne
    </label>

    <label>
        <input
            type="radio"
            name="account"
            value="business"
        >
        Firmowe
    </label>

</fieldset>
```

## `autocomplete`

```html
<input
    type="text"
    name="name"
    autocomplete="name"
>
```

```html
<input
    type="email"
    autocomplete="email"
>
```

```html
<input
    type="password"
    autocomplete="current-password"
>
```

## `details`

Prosty element rozwijany bez JavaScriptu:

```html
<details>

    <summary>
        Więcej informacji
    </summary>

    <p>
        Tutaj znajduje się dodatkowa treść.
    </p>

</details>
```

## `data-*`

```html
<article
    data-product-id="123"
    data-category="laptop"
>
```

JavaScript może później odczytać te dane.

---

# 8. Dostępność

Dostępność zaczyna się od poprawnego HTML.

Lepiej:

```html
<button>
    Otwórz
</button>
```

niż:

```html
<div role="button">
    Otwórz
</div>
```

Lepiej:

```html
<label for="email">
    E-mail
</label>

<input
    id="email"
    type="email"
>
```

niż pole bez etykiety.

## ARIA

ARIA jest przydatna wtedy, gdy natywny HTML nie wystarcza.

```html
<nav aria-label="Menu główne">
```

```html
<button
    aria-expanded="false"
    aria-controls="main-menu"
>
    Menu
</button>
```

Ogólna zasada:

> Jeżeli istnieje odpowiedni natywny element HTML, użyj go zamiast odtwarzać jego zachowanie ARIA.

---

# 9. CSS — podstawy

Podłączanie:

```html
<link rel="stylesheet" href="/css/style.css">
```

Podstawowa składnia:

```css
selector {
    property: value;
}
```

Przykład:

```css
h1 {
    color: navy;
    font-size: 3rem;
}
```

---

# 10. Selektory

Element:

```css
p {
}
```

Klasa:

```css
.card {
}
```

ID:

```css
#header {
}
```

Atrybut:

```css
input[type="email"] {
}
```

Kilka selektorów:

```css
h1,
h2,
h3 {
    font-family: sans-serif;
}
```

Potomek:

```css
article p {
}
```

Bezpośrednie dziecko:

```css
article > p {
}
```

Następny element:

```css
h2 + p {
}
```

Późniejsze rodzeństwo:

```css
h2 ~ p {
}
```

## Pseudoklasy

```css
a:hover {
    color: red;
}
```

```css
button:focus-visible {
    outline: 3px solid blue;
}
```

```css
li:first-child {
}
```

```css
li:last-child {
}
```

```css
li:nth-child(even) {
}
```

## `:not()`

```css
button:not(.primary) {
    opacity: 0.8;
}
```

## `:is()`

```css
article :is(h1, h2, h3) {
    color: navy;
}
```

## `:where()`

```css
:where(article, section, aside) p {
    line-height: 1.6;
}
```

`where()` nie zwiększa specificity.

## `:has()`

```css
.card:has(img) {
    padding-top: 0;
}
```

```css
.field:has(input:invalid) {
    border-color: red;
}
```

```css
body:has(dialog[open]) {
    overflow: hidden;
}
```

## Pseudoelementy

```css
.external-link::after {
    content: " ↗";
}
```

Najczęstsze:

```css
::before
::after
```

---

# 11. Kaskada, dziedziczenie i specificity

CSS oznacza **Cascading Style Sheets**.

Jeżeli kilka reguł dotyczy tego samego elementu, przeglądarka ustala, która deklaracja wygrywa.

Przykład:

```css
p {
    color: red;
}

.text {
    color: blue;
}
```

Dla:

```html
<p class="text">
```

wygrywa `.text`.

Na wynik wpływają między innymi:

- źródło stylu,
- `!important`,
- `@layer`,
- specificity,
- kolejność reguł.

W uproszczeniu:

```css
p
```

jest słabsze niż:

```css
.text
```

a to jest słabsze niż:

```css
#article
```

Nie warto budować selektorów typu:

```css
body main section article div.card p.description {
}
```

Lepiej:

```css
.card-description {
}
```

## `!important`

```css
color: red !important;
```

Używaj wyjątkowo.

Jeśli jest potrzebne wszędzie, architektura CSS prawdopodobnie wymaga poprawy.

## Dziedziczenie

Właściwości typograficzne często są dziedziczone:

```css
body {
    color: #222;
    font-family: sans-serif;
}
```

Natomiast między innymi:

```css
margin
padding
border
```

nie są normalnie dziedziczone.

---

# 12. Box model

Każdy element jest pudełkiem:

```text
margin
└── border
    └── padding
        └── content
```

Przykład:

```css
.card {
    width: 300px;
    padding: 20px;
    border: 2px solid black;
    margin: 20px;
}
```

## `box-sizing`

Bardzo przydatna baza:

```css
*,
*::before,
*::after {
    box-sizing: border-box;
}
```

Wtedy `width` obejmuje również padding i border.

## Margin

```css
margin: 2rem;
```

```css
margin: 1rem 2rem;
```

```css
margin: 1rem 2rem 3rem 4rem;
```

Kolejność:

```text
góra prawa dół lewa
```

## Padding

```css
padding: 1rem;
```

## Właściwości logiczne

Zamiast:

```css
margin-left: 2rem;
margin-right: 2rem;
```

można użyć:

```css
margin-inline: 2rem;
```

Zamiast:

```css
margin-top: 1rem;
margin-bottom: 1rem;
```

można:

```css
margin-block: 1rem;
```

Podobnie:

```css
padding-inline
padding-block
border-inline
border-block
inline-size
block-size
```

---

# 13. Jednostki

## `px`

Dobre między innymi dla cienkich granic:

```css
border: 1px solid;
```

## `rem`

```css
padding: 2rem;
```

Dobre do:

- odstępów,
- fontów,
- komponentów.

## `em`

Zależne od aktualnego rozmiaru fontu:

```css
button {
    padding: 0.7em 1.2em;
}
```

## `%`

```css
width: 50%;
```

## `vw` i `vh`

```css
width: 100vw;
min-height: 100vh;
```

Nowoczesne warianty:

```css
svh
lvh
dvh
```

Na urządzeniach mobilnych często warto:

```css
.hero {
    min-height: 100dvh;
}
```

## `min()`

```css
width: min(100%, 1200px);
```

## `max()`

```css
width: max(50%, 400px);
```

## `clamp()`

Płynna typografia:

```css
h1 {
    font-size: clamp(
        2rem,
        5vw,
        5rem
    );
}
```

Czyli:

- minimum: `2rem`,
- wartość preferowana: `5vw`,
- maksimum: `5rem`.

## `calc()`

```css
width: calc(100% - 2rem);
```

```css
height: calc(100vh - 80px);
```

---

# 14. Kolory i zmienne CSS

Hex:

```css
color: #ff0000;
```

RGB:

```css
color: rgb(255 0 0);
```

Alpha:

```css
color: rgb(255 0 0 / 50%);
```

HSL:

```css
color: hsl(0 100% 50%);
```

## `currentColor`

```css
.button {
    color: blue;
    border: 1px solid currentColor;
}
```

## `color-mix()`

```css
background:
    color-mix(
        in srgb,
        var(--primary) 20%,
        white
    );
```

## Custom Properties

```css
:root {
    --color-bg: #fff;
    --color-text: #111;
    --color-primary: #4058d6;

    --space-small: 0.5rem;
    --space-medium: 1rem;
    --space-large: 2rem;
}
```

Użycie:

```css
body {
    background: var(--color-bg);
    color: var(--color-text);
}
```

Fallback:

```css
color: var(--link-color, blue);
```

Zmienne można nadpisywać lokalnie:

```css
.card {
    --card-color: blue;
}

.card.warning {
    --card-color: red;
}
```

---

# 15. Typografia

Typowa baza:

```css
body {
    font-family:
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;

    font-size: 1rem;
    line-height: 1.6;

    color: #222;
}
```

## Długość tekstu

Bardzo szerokie akapity źle się czyta:

```css
.article {
    max-width: 70ch;
}
```

`ch` świetnie sprawdza się przy szerokości treści tekstowej.

---

# 16. Normal flow

HTML ma domyślny przepływ dokumentu.

Elementy blokowe:

```html
<div>
<p>
<section>
<article>
```

układają się jeden pod drugim.

Zanim użyjesz Grid, Flexbox albo `position`, sprawdź, czy zwykły flow nie wystarcza.

---

# 17. Flexbox

Flexbox służy głównie do układania elementów w jednym wymiarze.

```css
.navigation {
    display: flex;
    gap: 1rem;
}
```

## Kierunek

Domyślnie:

```css
flex-direction: row;
```

Pionowo:

```css
flex-direction: column;
```

## `justify-content`

Steruje osią główną:

```css
justify-content: center;
justify-content: space-between;
justify-content: space-around;
justify-content: flex-start;
justify-content: flex-end;
```

## `align-items`

Oś poprzeczna:

```css
align-items: center;
```

Typowy wzorzec:

```css
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

## `gap`

```css
display: flex;
gap: 1.5rem;
```

## Zawijanie

```css
display: flex;
flex-wrap: wrap;
gap: 1rem;
```

## `flex`

```css
.content {
    flex: 1;
}
```

Przykład layoutu:

```css
.layout {
    display: flex;
    gap: 2rem;
}

.sidebar {
    flex: 0 0 250px;
}

.content {
    flex: 1;
}
```

---

# 18. CSS Grid

Grid służy do układów dwuwymiarowych.

```css
.grid {
    display: grid;

    grid-template-columns:
        1fr 1fr 1fr;

    gap: 2rem;
}
```

## `fr`

```css
grid-template-columns:
    1fr 2fr;
```

Druga kolumna dostaje dwa razy więcej dostępnego miejsca.

## `repeat()`

```css
grid-template-columns:
    repeat(3, 1fr);
```

## `minmax()`

```css
grid-template-columns:
    repeat(
        3,
        minmax(200px, 1fr)
    );
```

## Responsywny Grid

Bardzo ważny wzorzec:

```css
.cards {
    display: grid;

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(250px, 1fr)
        );

    gap: 2rem;
}
```

Bez media query otrzymujemy:

- więcej kolumn na szerokim ekranie,
- mniej kolumn na węższym,
- jedną kolumnę na telefonie.

## Grid Areas

```css
.layout {
    display: grid;

    grid-template-columns:
        250px 1fr;

    grid-template-areas:
        "sidebar content";
}
```

```css
.sidebar {
    grid-area: sidebar;
}

.content {
    grid-area: content;
}
```

## `subgrid`

```css
.cards {
    display: grid;
    grid-template-columns:
        repeat(3, 1fr);
}

.card {
    display: grid;

    grid-template-rows:
        subgrid;

    grid-row:
        span 3;
}
```

## Flexbox czy Grid?

Flexbox:

> Ułóż elementy w rzędzie albo kolumnie.

Grid:

> Potrzebuję kontroli nad kolumnami i wierszami.

---

# 19. Pozycjonowanie

Najważniejsze wartości:

```css
position: static;
position: relative;
position: absolute;
position: fixed;
position: sticky;
```

## `relative`

```css
.card {
    position: relative;
}
```

Często służy jako punkt odniesienia dla elementów absolutnych.

## `absolute`

```css
.badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
}
```

Typowy wzorzec:

```css
.card {
    position: relative;
}

.badge {
    position: absolute;
    inset-block-start: 1rem;
    inset-inline-end: 1rem;
}
```

## `fixed`

```css
.cookie-button {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
}
```

## `sticky`

```css
.sidebar {
    position: sticky;
    top: 1rem;
}
```

## `z-index`

```css
.modal {
    z-index: 100;
}
```

Nie rozwiązuj problemów przez:

```css
z-index: 999999999;
```

Jeżeli `z-index` nie działa zgodnie z oczekiwaniem, sprawdź stacking context.

## Overflow

```css
overflow: hidden;
overflow: auto;
overflow: scroll;
```

Kod:

```css
.code {
    overflow-x: auto;
}
```

## `aspect-ratio`

```css
.thumbnail {
    aspect-ratio: 16 / 9;
}
```

## `object-fit`

```css
.thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

## Kontener strony

```css
.container {
    width:
        min(
            100% - 2rem,
            1200px
        );

    margin-inline: auto;
}
```

---

# 20. Responsywność

Najpraktyczniejsze podejście to mobile first.

Bazowy layout:

```css
.cards {
    display: grid;
    gap: 1rem;
}
```

Dla większych ekranów:

```css
@media (width >= 700px) {
    .cards {
        grid-template-columns:
            repeat(2, 1fr);
    }
}
```

Jeszcze szerzej:

```css
@media (width >= 1100px) {
    .cards {
        grid-template-columns:
            repeat(3, 1fr);
    }
}
```

## Nowoczesna składnia

Zamiast:

```css
@media (min-width: 768px) {
}
```

można:

```css
@media (width >= 768px) {
}
```

Zakres:

```css
@media (600px <= width < 1000px) {
}
```

## Breakpointy

Breakpoint powinien wynikać z layoutu, a nie z listy konkretnych modeli telefonów.

Nie myśl:

```text
iPhone = X
tablet = Y
desktop = Z
```

Myśl:

> W którym miejscu layout przestaje wyglądać dobrze?

---

# 21. Container Queries

Media query reaguje na viewport.

Container query reaguje na szerokość kontenera.

```css
.card-wrapper {
    container-type: inline-size;
}
```

```css
@container (width >= 500px) {

    .card {
        display: grid;
        grid-template-columns:
            200px 1fr;
    }

}
```

Dzięki temu ten sam komponent może wyglądać inaczej w sidebarze i inaczej w głównej kolumnie.

## Nazwane kontenery

```css
.products {
    container:
        products / inline-size;
}
```

```css
@container products (width >= 700px) {
    ...
}
```

---

# 22. Nowoczesny CSS

## `@layer`

Pozwala jawnie kontrolować kolejność warstw:

```css
@layer reset, base, components, utilities;
```

```css
@layer reset {

    * {
        box-sizing: border-box;
    }

}
```

```css
@layer base {

    body {
        font-family: system-ui;
    }

}
```

```css
@layer components {

    .button {
        padding: 0.7rem 1rem;
    }

}
```

```css
@layer utilities {

    .hidden {
        display: none;
    }

}
```

## CSS Nesting

Zamiast:

```css
.card {
    padding: 2rem;
}

.card h2 {
    font-size: 2rem;
}

.card a {
    color: blue;
}

.card a:hover {
    color: red;
}
```

można:

```css
.card {
    padding: 2rem;

    h2 {
        font-size: 2rem;
    }

    a {
        color: blue;

        &:hover {
            color: red;
        }
    }
}
```

Media query wewnątrz:

```css
.card {
    padding: 1rem;

    @media (width >= 700px) {
        padding: 2rem;
    }
}
```

## Prosta konwencja klas

```css
.card
.card-title
.card-image
.card-description
.card-actions
```

Stan:

```css
.card.is-active
```

Wariant:

```css
.card.card-featured
```

## Design tokens

```css
:root {

    --color-bg: #fafafa;
    --color-surface: #fff;
    --color-text: #171717;
    --color-muted: #666;
    --color-primary: #4058d6;
    --color-border: #ddd;

    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 1rem;
    --space-4: 1.5rem;
    --space-5: 2rem;
    --space-6: 3rem;

    --radius-small: 0.3rem;
    --radius-medium: 0.7rem;
    --radius-large: 1.2rem;
}
```

---

# 23. Dark mode

```css
:root {
    color-scheme: light dark;

    --bg: white;
    --text: #181818;
}
```

```css
@media (prefers-color-scheme: dark) {

    :root {
        --bg: #111;
        --text: #eee;
    }

}
```

```css
body {
    background: var(--bg);
    color: var(--text);
}
```

---

# 24. Animacje

## Transition

```css
.button {
    background: blue;

    transition:
        background 200ms ease,
        transform 200ms ease;
}

.button:hover {
    background: navy;
    transform: translateY(-2px);
}
```

Lepiej określać konkretne właściwości niż pisać:

```css
transition: all 1s;
```

## Transform

```css
transform: translateX(10px);
transform: translateY(-5px);
transform: scale(1.05);
transform: rotate(5deg);
```

Łączenie:

```css
transform:
    translateY(-2px)
    scale(1.02);
```

## `@keyframes`

```css
@keyframes pulse {

    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
    }

}
```

```css
.logo {
    animation:
        pulse 2s infinite;
}
```

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {
        animation-duration: 0.01ms;
        animation-iteration-count: 1;
        transition-duration: 0.01ms;
    }

}
```

---

# 25. Formularze w CSS

```css
.form {
    display: grid;
    gap: 1.5rem;
}

.field {
    display: grid;
    gap: 0.4rem;
}

input,
textarea,
select {
    width: 100%;

    padding: 0.8rem 1rem;

    font: inherit;

    border: 1px solid #aaa;
    border-radius: 0.4rem;

    background: white;
    color: #111;
}
```

## Focus

Nie usuwaj focusa bez zastąpienia go czymś sensownym.

```css
input:focus-visible,
textarea:focus-visible,
button:focus-visible,
a:focus-visible {

    outline:
        3px solid
        royalblue;

    outline-offset: 3px;
}
```

## Stan niepoprawny

```css
input:invalid:not(:placeholder-shown) {
    border-color: red;
}
```

---

# 26. Reset / baza CSS

Rozsądny punkt startowy:

```css
*,
*::before,
*::after {
    box-sizing: border-box;
}

html {
    hanging-punctuation:
        first last;
}

body {
    margin: 0;

    min-height: 100dvh;

    font-family:
        system-ui,
        sans-serif;

    line-height: 1.6;
}

img,
picture,
svg,
video {
    display: block;
    max-width: 100%;
}

input,
button,
textarea,
select {
    font: inherit;
}

h1,
h2,
h3,
h4 {
    line-height: 1.2;
}

p,
h1,
h2,
h3,
h4 {
    overflow-wrap:
        break-word;
}
```

---

# 27. Organizacja projektu

Mały projekt:

```text
project/
│
├── index.html
├── about.html
├── contact.html
│
├── css/
│   └── style.css
│
├── images/
│   ├── hero.webp
│   └── logo.svg
│
└── js/
    └── main.js
```

Większy projekt:

```text
css/
│
├── reset.css
├── tokens.css
├── base.css
├── layout.css
├── components.css
└── utilities.css
```

Nie dziel CSS na dziesiątki plików bez realnej potrzeby.

---

# 28. Kompletny przykład strony

## HTML

```html
<!doctype html>

<html lang="pl">

<head>

    <meta charset="utf-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >

    <title>Null Yard</title>

    <meta
        name="description"
        content="Eksperymentalne projekty programistyczne."
    >

    <link
        rel="stylesheet"
        href="style.css"
    >

</head>

<body>

<header class="site-header">

    <div class="container header-inner">

        <a
            class="logo"
            href="/"
        >
            Null Yard
        </a>

        <nav
            class="navigation"
            aria-label="Główna nawigacja"
        >
            <a href="#projects">Projekty</a>
            <a href="#about">O mnie</a>
            <a href="#contact">Kontakt</a>
        </nav>

    </div>

</header>


<main>

<section class="hero">

    <div class="container">

        <p class="hero-label">
            Software experiments
        </p>

        <h1>
            Buduję rzeczy,
            które rozwiązują
            prawdziwe problemy.
        </h1>

        <p class="hero-description">
            Go, HTML, CSS, automatyzacja
            i eksperymenty z AI.
        </p>

        <a
            class="button"
            href="#projects"
        >
            Zobacz projekty
        </a>

    </div>

</section>


<section
    class="projects"
    id="projects"
>

    <div class="container">

        <header class="section-header">

            <h2>Projekty</h2>

            <p>
                Kilka rzeczy,
                nad którymi pracuję.
            </p>

        </header>

        <div class="project-grid">

            <article class="card">

                <h3>Web Monitor</h3>

                <p>
                    Automatyczne monitorowanie
                    stron promocji.
                </p>

                <a href="#">
                    Zobacz projekt
                </a>

            </article>

            <article class="card">

                <h3>Example Site</h3>

                <p>
                    Minimalistyczna platforma
                    do publikacji opowiadań.
                </p>

                <a href="#">
                    Zobacz projekt
                </a>

            </article>

            <article class="card">

                <h3>Hermes Tools</h3>

                <p>
                    Eksperymenty z agentami AI
                    i automatyzacją.
                </p>

                <a href="#">
                    Zobacz projekt
                </a>

            </article>

        </div>

    </div>

</section>


<section
    class="about"
    id="about"
>

    <div class="container prose">

        <h2>
            O Null Yard
        </h2>

        <p>
            Null Yard jest miejscem
            dla małych eksperymentalnych
            projektów programistycznych.
        </p>

    </div>

</section>

</main>


<footer
    class="site-footer"
    id="contact"
>

    <div class="container">

        <p>
            © 2026 Null Yard
        </p>

    </div>

</footer>

</body>

</html>
```

## CSS

```css
@layer reset, base, layout, components;


@layer reset {

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
    }

    img,
    svg,
    picture {
        display: block;
        max-width: 100%;
    }

    button,
    input,
    textarea,
    select {
        font: inherit;
    }

}


@layer base {

    :root {

        --color-bg:
            #f7f7f7;

        --color-surface:
            #ffffff;

        --color-text:
            #161616;

        --color-muted:
            #666666;

        --color-primary:
            #4058d6;

        --color-border:
            #dddddd;

        --space-small:
            0.5rem;

        --space-medium:
            1rem;

        --space-large:
            2rem;

        --space-xl:
            4rem;

        --radius:
            0.75rem;
    }


    body {

        min-height:
            100dvh;

        font-family:
            system-ui,
            sans-serif;

        font-size:
            1rem;

        line-height:
            1.6;

        background:
            var(--color-bg);

        color:
            var(--color-text);
    }


    h1,
    h2,
    h3 {

        line-height:
            1.15;

        text-wrap:
            balance;
    }


    h1 {

        font-size:
            clamp(
                2.5rem,
                7vw,
                6rem
            );

        max-width:
            15ch;

        margin-block:
            0 1.5rem;
    }


    h2 {

        font-size:
            clamp(
                2rem,
                4vw,
                3rem
            );
    }


    a {

        color:
            var(--color-primary);

        text-underline-offset:
            0.2em;
    }


    :focus-visible {

        outline:
            3px solid
            var(--color-primary);

        outline-offset:
            4px;
    }

}


@layer layout {

    .container {

        width:
            min(
                100% - 2rem,
                1200px
            );

        margin-inline:
            auto;
    }


    .header-inner {

        min-height:
            70px;

        display:
            flex;

        align-items:
            center;

        justify-content:
            space-between;

        gap:
            2rem;
    }


    .project-grid {

        display:
            grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(
                    min(250px, 100%),
                    1fr
                )
            );

        gap:
            1.5rem;
    }

}


@layer components {

    .site-header {

        border-block-end:
            1px solid
            var(--color-border);

        background:
            var(--color-surface);
    }


    .logo {

        color:
            inherit;

        font-weight:
            800;

        text-decoration:
            none;
    }


    .navigation {

        display:
            flex;

        flex-wrap:
            wrap;

        gap:
            1.5rem;

        a {

            color:
                inherit;

            text-decoration:
                none;

            &:hover {
                color:
                    var(--color-primary);
            }

        }

    }


    .hero {

        padding-block:
            clamp(
                5rem,
                12vw,
                10rem
            );
    }


    .hero-label {

        color:
            var(--color-primary);

        font-weight:
            700;

        text-transform:
            uppercase;

        letter-spacing:
            0.1em;
    }


    .hero-description {

        max-width:
            50ch;

        font-size:
            1.2rem;

        color:
            var(--color-muted);

        margin-block-end:
            2rem;
    }


    .button {

        display:
            inline-block;

        padding:
            0.8em 1.4em;

        border-radius:
            0.5rem;

        background:
            var(--color-primary);

        color:
            white;

        font-weight:
            700;

        text-decoration:
            none;

        transition:
            transform 150ms ease;

        &:hover {

            transform:
                translateY(-2px);

        }

    }


    .projects {

        padding-block:
            var(--space-xl);
    }


    .section-header {

        margin-block-end:
            2rem;
    }


    .card {

        padding:
            1.5rem;

        border:
            1px solid
            var(--color-border);

        border-radius:
            var(--radius);

        background:
            var(--color-surface);

        h3 {

            margin-block-start:
                0;

        }

    }


    .about {

        padding-block:
            var(--space-xl);
    }


    .prose {

        max-width:
            70ch;
    }


    .site-footer {

        margin-block-start:
            4rem;

        padding-block:
            2rem;

        border-block-start:
            1px solid
            var(--color-border);

        color:
            var(--color-muted);
    }

}
```

---

# 29. Dobre praktyki

## Używaj semantycznego HTML

Dobrze:

```html
<nav>
<main>
<article>
<button>
```

Zamiast:

```html
<div class="nav">
<div class="main">
<div class="article">
<div class="button">
```

## Nie koduj layoutu w HTML

Źle:

```html
<br>
<br>
<br>
```

dla uzyskania odstępu.

Lepiej:

```css
margin-block: 3rem;
```

## Nie używaj tabel do layoutu

Tabela służy do danych.

Układ twórz przez:

```css
display: grid;
```

lub:

```css
display: flex;
```

## Nie ustawiaj wszystkiego absolutnie

Układ typu:

```css
position: absolute;
top: 162px;
left: 534px;
```

bardzo łatwo się rozpada.

Podstawa:

- normal flow,
- Flexbox,
- Grid.

## Nie ustawiaj wysokości bez potrzeby

Źle:

```css
.card {
    height: 400px;
}
```

jeśli zawartość może mieć różną długość.

## Nie projektuj dla jednej rozdzielczości

Strona może działać na:

- telefonie,
- tablecie,
- laptopie,
- dużym monitorze,
- połowie monitora,
- przy powiększeniu 200%.

## Nie przesadzaj z breakpointami

Najpierw sprawdź:

```text
auto-fit
minmax()
clamp()
flex-wrap
container queries
```

## Nie usuwaj focusa

Źle:

```css
*:focus {
    outline: none;
}
```

## Nie buduj wszystkiego JavaScriptem

HTML i CSS potrafią dziś bardzo dużo.

HTML:

```text
details
summary
dialog
required
pattern
loading="lazy"
```

CSS:

```text
Grid
Flexbox
:has()
sticky
container queries
animations
```

---

# 30. Ściąga

## HTML

```html
<html>
<head>
<body>

<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>

<h1> ... <h6>
<p>
<strong>
<em>

<a>

<ul>
<ol>
<li>

<img>
<picture>
<figure>
<figcaption>

<table>
<thead>
<tbody>
<tr>
<th>
<td>

<form>
<label>
<input>
<textarea>
<select>
<option>
<button>
<fieldset>
<legend>

<details>
<summary>

<div>
<span>
```

## CSS

```css
color
background

font-family
font-size
font-weight
line-height

width
max-width
min-width

height
min-height

margin
padding

border
border-radius

display

flex
grid

gap

position

overflow

aspect-ratio
object-fit

transform
transition
animation

@media
@container
@layer

var()
calc()
min()
max()
clamp()

:is()
:where()
:not()
:has()

:hover
:focus-visible
:nth-child()

::before
::after
```

---

# 31. Co trzeba umieć

Żeby móc powiedzieć „umiem HTML i CSS”, nie trzeba znać wszystkich właściwości na pamięć.

Trzeba rozumieć:

1. strukturę dokumentu HTML,
2. semantykę,
3. linki i obrazy,
4. formularze,
5. podstawy dostępności,
6. selektory CSS,
7. kaskadę,
8. specificity,
9. box model,
10. jednostki,
11. typografię,
12. normal flow,
13. Flexbox,
14. Grid,
15. pozycjonowanie,
16. responsywność,
17. media queries,
18. custom properties,
19. animacje,
20. container queries,
21. `clamp()`,
22. `:has()`,
23. CSS nesting,
24. `@layer`.

Najważniejsza umiejętność to nie pamiętanie całej składni, lecz rozpoznawanie rodzaju problemu.

Przykładowo:

> To układ dwuwymiarowy — użyję Grid.

> To układ w jednym rzędzie — użyję Flexbox.

> Komponent powinien reagować na własną szerokość — użyję container query.

> Rozmiar tekstu ma płynnie skalować się z ekranem — użyję `clamp()`.

---

# Mentalny model tworzenia strony

```text
treść
   ↓
semantyczny HTML
   ↓
normal flow
   ↓
Grid / Flexbox
   ↓
responsywne wartości
min() / max() / clamp()
   ↓
media queries tylko tam,
gdzie są naprawdę potrzebne
   ↓
container queries
dla niezależnych komponentów
   ↓
CSS variables
dla wspólnych wartości
   ↓
@layer
dla kontroli kaskady
   ↓
nesting
dla czytelności komponentów
   ↓
JavaScript tylko tam,
gdzie potrzebna jest logika
```

HTML powinien nadal mieć sens po wyłączeniu CSS.

CSS powinien prezentować dobrze zaprojektowaną strukturę HTML, a nie naprawiać jej błędy.

To jest bardzo dobra baza do tworzenia nowoczesnych stron bez Bootstrapa, Tailwinda czy frameworków JavaScriptowych.
