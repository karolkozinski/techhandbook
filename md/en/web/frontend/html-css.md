# html-css

A practical reference for building modern, semantic, responsive and accessible websites.

> HTML describes the **structure and meaning of content**.  
> CSS controls **appearance, layout and presentation**.  
> JavaScript adds **logic and interaction** when HTML and CSS are not enough.

---

## Table of contents

1. [HTML basics](#1-html-basics)
2. [Document structure](#2-document-structure)
3. [HTML semantics](#3-html-semantics)
4. [Text, lists and links](#4-text-lists-and-links)
5. [Images and media](#5-images-and-media)
6. [Tables](#6-tables)
7. [Forms](#7-forms)
8. [Accessibility](#8-accessibility)
9. [CSS basics](#9-css-basics)
10. [Selectors](#10-selectors)
11. [Cascade, inheritance and specificity](#11-cascade-inheritance-and-specificity)
12. [Box model](#12-box-model)
13. [Units](#13-units)
14. [Colours and CSS variables](#14-colours-and-css-variables)
15. [Typography](#15-typography)
16. [Normal flow](#16-normal-flow)
17. [Flexbox](#17-flexbox)
18. [CSS Grid](#18-css-grid)
19. [Positioning](#19-positioning)
20. [Responsive design](#20-responsive-design)
21. [Container Queries](#21-container-queries)
22. [Modern CSS](#22-modern-css)
23. [Dark mode](#23-dark-mode)
24. [Animations](#24-animations)
25. [Styling forms](#25-styling-forms)
26. [CSS reset / base](#26-css-reset--base)
27. [Project organisation](#27-project-organisation)
28. [Complete page example](#28-complete-page-example)
29. [Good practices](#29-good-practices)
30. [Cheat sheet](#30-cheat-sheet)
31. [What you should know](#31-what-you-should-know)

---

# 1. HTML basics

HTML is not for drawing a page. Its job is to describe **what each piece of content is**.

```html
<article class="product">
    <h2>Example Laptop</h2>
    <p>Lightweight business notebook.</p>
    <a href="/prestige-13">View product</a>
</article>
```

This tells the browser and assistive technology that the block is a self-contained piece of content with a heading, description and link.

CSS defines the presentation:

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

Prefer class names that describe purpose rather than appearance.

Better:

```html
<h2 class="product-title">Example notebook</h2>
```

instead of:

```html
<div class="big-red-text">Example notebook</div>
```

---

# 2. Document structure

A minimal modern HTML document:

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >

    <title>My website</title>

    <meta
        name="description"
        content="Short description of the page."
    >

    <link rel="stylesheet" href="/css/style.css">
</head>

<body>

    <h1>My website</h1>

</body>

</html>
```

## `<!doctype html>`

Tells the browser to use modern HTML rendering. It should be the first line of the file.

## `<html lang="en">`

The root element of the document.

The `lang` attribute helps screen readers, search engines, automatic translation and spell checking.

## `<head>`

Contains document metadata.

Encoding:

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

Title:

```html
<title>Example Site — stories</title>
```

Description:

```html
<meta
    name="description"
    content="Horror, weird fiction and science-fiction stories."
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

# 3. HTML semantics

A modern page should not be built only from `div` elements.

Typical structure:

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

Header of a page or section.

```html
<header>
    <h1>Example Site</h1>
    <p>Stories from places that do not exist.</p>
</header>
```

A document may contain more than one header.

## `<main>`

The main content of the document. Usually there should be one primary `main`.

## `<nav>`

Navigation:

```html
<nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/stories">Stories</a>
    <a href="/cycles">Series</a>
    <a href="/about">About</a>
</nav>
```

## `<section>`

A thematic section:

```html
<section>
    <h2>Latest stories</h2>
</section>
```

Do not use `section` as an automatic replacement for `div`.

## `<article>`

Independent content that could stand on its own:

```html
<article>
    <h2>The House on Gray Street</h2>
    <p>...</p>
</article>
```

Typical uses include blog posts, articles, product cards, news items, comments and stories.

## `<aside>`

Secondary or complementary content.

## `<footer>`

Footer for a document or section.

## `<div>`

A neutral container. Use it when you need an element for layout or styling and no semantic element fits.

---

# 4. Text, lists and links

## Headings

HTML has six heading levels:

```html
<h1>...</h1>
<h2>...</h2>
<h3>...</h3>
<h4>...</h4>
<h5>...</h5>
<h6>...</h6>
```

Headings describe content hierarchy, not visual size.

## Paragraphs

```html
<p>This is a paragraph.</p>
```

## Emphasis

```html
<strong>very important</strong>
<em>really</em>
```

`strong` expresses importance. `em` expresses emphasis.

## Quotes

Inline:

```html
<p>The author wrote <q>this is a quote</q>.</p>
```

Block quote:

```html
<blockquote>
    <p>Quoted text.</p>
</blockquote>
```

## Code

Inline:

```html
<code>sudo apt update</code>
```

Block:

```html
<pre><code>sudo apt update
sudo apt upgrade</code></pre>
```

## Lists

Unordered:

```html
<ul>
    <li>Debian</li>
    <li>FreeBSD</li>
    <li>OpenBSD</li>
</ul>
```

Ordered:

```html
<ol>
    <li>Install the system</li>
    <li>Update packages</li>
    <li>Configure nginx</li>
</ol>
```

Definition list:

```html
<dl>
    <dt>HTML</dt>
    <dd>Document structure.</dd>

    <dt>CSS</dt>
    <dd>Document presentation.</dd>
</dl>
```

## Links

```html
<a href="/about">About us</a>
```

External link:

```html
<a href="https://example.com">Example</a>
```

New tab:

```html
<a
    href="https://example.com"
    target="_blank"
    rel="noopener"
>
    Example
</a>
```

Email:

```html
<a href="mailto:test@example.com">Write to us</a>
```

Anchor:

```html
<a href="#contact">Contact</a>

<section id="contact">
    <h2>Contact</h2>
</section>
```

## Link vs button

Links navigate:

```html
<a href="/products">Products</a>
```

Buttons perform actions:

```html
<button type="button">Open menu</button>
```

Avoid clickable `div` elements when the element is really a button.

---

# 5. Images and media

Basic image:

```html
<img
    src="/images/castle.jpg"
    alt="Castle ruins on a hill"
>
```

The `alt` attribute describes the meaning of the image.

Decorative image:

```html
<img
    src="/images/decoration.svg"
    alt=""
>
```

Provide dimensions when possible:

```html
<img
    src="photo.jpg"
    alt="Old house"
    width="1200"
    height="800"
>
```

Responsive baseline:

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
    alt="City view"
>
```

The browser chooses the most appropriate file.

## `<picture>`

```html
<picture>
    <source srcset="hero.avif" type="image/avif">
    <source srcset="hero.webp" type="image/webp">

    <img
        src="hero.jpg"
        alt="Mountain landscape"
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

Do not automatically lazy-load the main above-the-fold/LCP image.

## `figure`

```html
<figure>
    <img
        src="server.jpg"
        alt="Server in a rack cabinet"
    >

    <figcaption>
        Home FreeBSD server.
    </figcaption>
</figure>
```

---

# 6. Tables

Tables are for tabular data.

```html
<table>
    <caption>Server prices</caption>

    <thead>
        <tr>
            <th scope="col">Server</th>
            <th scope="col">RAM</th>
            <th scope="col">Price</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <th scope="row">VPS-1</th>
            <td>4 GB</td>
            <td>20 EUR</td>
        </tr>

        <tr>
            <th scope="row">VPS-2</th>
            <td>8 GB</td>
            <td>40 EUR</td>
        </tr>
    </tbody>
</table>
```

Do not use tables for page layout.

---

# 7. Forms

Basic form:

```html
<form action="/contact" method="post">

    <label for="name">
        Name
    </label>

    <input
        id="name"
        name="name"
        type="text"
    >

    <button type="submit">
        Send
    </button>

</form>
```

`name` defines the field name sent to the backend.

`id` lets you associate the control with its `label`.

## Input types

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

## Validation

Required field:

```html
<input
    type="email"
    name="email"
    required
>
```

Length:

```html
<input type="text" minlength="3" maxlength="100">
```

Range:

```html
<input type="number" min="1" max="100">
```

Pattern:

```html
<input type="text" pattern="[0-9]{6}">
```

HTML validation does not replace backend validation.

## `textarea`

```html
<label for="message">Message</label>

<textarea
    id="message"
    name="message"
    rows="8"
></textarea>
```

## `select`

```html
<label for="country">Country</label>

<select id="country" name="country">
    <option value="">Choose</option>
    <option value="pl">Poland</option>
    <option value="de">Germany</option>
    <option value="cz">Czechia</option>
</select>
```

## `fieldset`

```html
<fieldset>
    <legend>Account type</legend>

    <label>
        <input
            type="radio"
            name="account"
            value="private"
        >
        Personal
    </label>

    <label>
        <input
            type="radio"
            name="account"
            value="business"
        >
        Business
    </label>
</fieldset>
```

## `autocomplete`

```html
<input type="text" name="name" autocomplete="name">
<input type="email" autocomplete="email">
<input type="password" autocomplete="current-password">
```

## `details`

Expandable content without JavaScript:

```html
<details>
    <summary>More information</summary>
    <p>Additional content goes here.</p>
</details>
```

## `data-*`

```html
<article
    data-product-id="123"
    data-category="laptop"
>
```

JavaScript can read these values later.

---

# 8. Accessibility

Accessibility starts with correct HTML.

Prefer:

```html
<button>Open</button>
```

instead of:

```html
<div role="button">Open</div>
```

Prefer a labelled field:

```html
<label for="email">Email</label>
<input id="email" type="email">
```

## ARIA

ARIA is useful when native HTML is not enough.

```html
<nav aria-label="Main menu">
```

```html
<button
    aria-expanded="false"
    aria-controls="main-menu"
>
    Menu
</button>
```

General rule:

> If an appropriate native HTML element exists, use it instead of recreating its behaviour with ARIA.

---

# 9. CSS basics

Attach a stylesheet:

```html
<link rel="stylesheet" href="/css/style.css">
```

Syntax:

```css
selector {
    property: value;
}
```

Example:

```css
h1 {
    color: navy;
    font-size: 3rem;
}
```

---

# 10. Selectors

Element:

```css
p {}
```

Class:

```css
.card {}
```

ID:

```css
#header {}
```

Attribute:

```css
input[type="email"] {}
```

Multiple selectors:

```css
h1,
h2,
h3 {
    font-family: sans-serif;
}
```

Descendant:

```css
article p {}
```

Direct child:

```css
article > p {}
```

Adjacent sibling:

```css
h2 + p {}
```

General sibling:

```css
h2 ~ p {}
```

## Pseudo-classes

```css
a:hover {
    color: red;
}

button:focus-visible {
    outline: 3px solid blue;
}

li:first-child {}
li:last-child {}
li:nth-child(even) {}
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

`:where()` adds no selector specificity.

## `:has()`

```css
.card:has(img) {
    padding-top: 0;
}

.field:has(input:invalid) {
    border-color: red;
}

body:has(dialog[open]) {
    overflow: hidden;
}
```

## Pseudo-elements

```css
.external-link::after {
    content: " ↗";
}
```

Most common:

```css
::before
::after
```

---

# 11. Cascade, inheritance and specificity

CSS means **Cascading Style Sheets**.

When several declarations target the same property, the browser determines which one wins.

```css
p {
    color: red;
}

.text {
    color: blue;
}
```

For:

```html
<p class="text">
```

the class rule wins.

The result is affected by origin, `!important`, cascade layers, specificity and source order.

Simplified specificity order:

```text
element < class < id
```

Avoid deeply coupled selectors such as:

```css
body main section article div.card p.description {}
```

Prefer:

```css
.card-description {}
```

Use `!important` only when justified. If you need it everywhere, the CSS architecture probably needs work.

Typography-related properties often inherit:

```css
body {
    color: #222;
    font-family: sans-serif;
}
```

Properties such as margin, padding and border normally do not.

---

# 12. Box model

Every element is a box:

```text
margin
└── border
    └── padding
        └── content
```

Useful baseline:

```css
*,
*::before,
*::after {
    box-sizing: border-box;
}
```

With `border-box`, declared width includes padding and border.

Margin shorthand:

```css
margin: 2rem;
margin: 1rem 2rem;
margin: 1rem 2rem 3rem 4rem;
```

Order:

```text
top right bottom left
```

Logical properties are often preferable:

```css
margin-inline: 2rem;
margin-block: 1rem;

padding-inline: 1rem;
padding-block: 1rem;
```

Related logical properties include `border-inline`, `border-block`, `inline-size` and `block-size`.

---

# 13. Units

## `px`

Useful for things such as thin borders.

```css
border: 1px solid;
```

## `rem`

Useful for spacing, typography and component sizing.

```css
padding: 2rem;
```

## `em`

Relative to the current font size.

```css
button {
    padding: 0.7em 1.2em;
}
```

## Percentages

```css
width: 50%;
```

## Viewport units

```css
width: 100vw;
min-height: 100vh;
```

Modern mobile-friendly variants:

```css
svh
lvh
dvh
```

Example:

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

Fluid typography:

```css
h1 {
    font-size: clamp(2rem, 5vw, 5rem);
}
```

This means minimum 2rem, preferred 5vw and maximum 5rem.

## `calc()`

```css
width: calc(100% - 2rem);
height: calc(100vh - 80px);
```

---

# 14. Colours and CSS variables

Hex:

```css
color: #ff0000;
```

Modern RGB:

```css
color: rgb(255 0 0);
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

## Custom properties

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

Use:

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

Variables can be overridden locally.

---

# 15. Typography

Typical baseline:

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

Very wide paragraphs are hard to read:

```css
.article {
    max-width: 70ch;
}
```

The `ch` unit is useful for readable text widths.

---

# 16. Normal flow

HTML already has a default document flow.

Block elements such as `div`, `p`, `section` and `article` normally stack vertically.

Before reaching for Grid, Flexbox or `position`, check whether normal flow already solves the problem.

---

# 17. Flexbox

Flexbox is mainly for one-dimensional layout.

```css
.navigation {
    display: flex;
    gap: 1rem;
}
```

Default direction:

```css
flex-direction: row;
```

Vertical:

```css
flex-direction: column;
```

Main-axis alignment:

```css
justify-content: center;
justify-content: space-between;
justify-content: space-around;
justify-content: flex-start;
justify-content: flex-end;
```

Cross-axis alignment:

```css
align-items: center;
```

Typical header:

```css
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

Wrapping:

```css
display: flex;
flex-wrap: wrap;
gap: 1rem;
```

Flexible content:

```css
.content {
    flex: 1;
}
```

Sidebar layout:

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

Grid is designed for two-dimensional layouts.

```css
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
}
```

## `fr`

```css
grid-template-columns: 1fr 2fr;
```

The second column receives twice as much available space.

## `repeat()`

```css
grid-template-columns: repeat(3, 1fr);
```

## `minmax()`

```css
grid-template-columns:
    repeat(
        3,
        minmax(200px, 1fr)
    );
```

## Responsive Grid

A very useful pattern:

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

This can adapt column count without a media query.

## Grid Areas

```css
.layout {
    display: grid;

    grid-template-columns:
        250px 1fr;

    grid-template-areas:
        "sidebar content";
}

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
    grid-template-columns: repeat(3, 1fr);
}

.card {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 3;
}
```

## Flexbox or Grid?

Flexbox:

> Arrange items in a row or column.

Grid:

> Control rows and columns together.

---

# 19. Positioning

Important values:

```css
position: static;
position: relative;
position: absolute;
position: fixed;
position: sticky;
```

Relative positioning is often used as the containing block for absolutely positioned children.

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

Fixed:

```css
.cookie-button {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
}
```

Sticky:

```css
.sidebar {
    position: sticky;
    top: 1rem;
}
```

Do not solve stacking problems with absurd values such as `z-index: 999999999`. Understand stacking contexts.

Overflow:

```css
overflow: hidden;
overflow: auto;
overflow: scroll;
```

Horizontal code scrolling:

```css
.code {
    overflow-x: auto;
}
```

Aspect ratio:

```css
.thumbnail {
    aspect-ratio: 16 / 9;
}
```

Object fit:

```css
.thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

Typical page container:

```css
.container {
    width: min(100% - 2rem, 1200px);
    margin-inline: auto;
}
```

---

# 20. Responsive design

A practical approach is mobile first.

Base layout:

```css
.cards {
    display: grid;
    gap: 1rem;
}
```

Larger screens:

```css
@media (width >= 700px) {
    .cards {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

Wider still:

```css
@media (width >= 1100px) {
    .cards {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

Modern range syntax:

```css
@media (600px <= width < 1000px) {
}
```

Breakpoints should come from the layout, not from a list of device models.

Ask:

> At what width does this layout stop working well?

---

# 21. Container Queries

A media query reacts to the viewport.

A container query reacts to a component container.

```css
.card-wrapper {
    container-type: inline-size;
}
```

```css
@container (width >= 500px) {
    .card {
        display: grid;
        grid-template-columns: 200px 1fr;
    }
}
```

This lets the same component adapt differently in a sidebar and a main column.

Named container:

```css
.products {
    container: products / inline-size;
}

@container products (width >= 700px) {
    ...
}
```

---

# 22. Modern CSS

## `@layer`

Explicitly control cascade layer order:

```css
@layer reset, base, components, utilities;
```

```css
@layer reset {
    * {
        box-sizing: border-box;
    }
}

@layer base {
    body {
        font-family: system-ui;
    }
}

@layer components {
    .button {
        padding: 0.7rem 1rem;
    }
}

@layer utilities {
    .hidden {
        display: none;
    }
}
```

## CSS nesting

Instead of:

```css
.card {
    padding: 2rem;
}

.card h2 {
    font-size: 2rem;
}

.card a:hover {
    color: red;
}
```

you can write:

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

Media query inside a rule:

```css
.card {
    padding: 1rem;

    @media (width >= 700px) {
        padding: 2rem;
    }
}
```

## Simple class convention

```css
.card
.card-title
.card-image
.card-description
.card-actions
```

State:

```css
.card.is-active
```

Variant:

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

# 24. Animations

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

Prefer specific properties over:

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

Combine transforms:

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

.logo {
    animation: pulse 2s infinite;
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

# 25. Styling forms

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

Never remove focus without a meaningful replacement.

```css
input:focus-visible,
textarea:focus-visible,
button:focus-visible,
a:focus-visible {
    outline: 3px solid royalblue;
    outline-offset: 3px;
}
```

## Invalid state

```css
input:invalid:not(:placeholder-shown) {
    border-color: red;
}
```

---

# 26. CSS reset / base

A sensible starting point:

```css
*,
*::before,
*::after {
    box-sizing: border-box;
}

html {
    hanging-punctuation: first last;
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
    overflow-wrap: break-word;
}
```

---

# 27. Project organisation

Small project:

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

Larger CSS structure:

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

Do not split CSS into dozens of files without a real need.

---

# 28. Complete page example

## HTML

```html
<!doctype html>

<html lang="en">

<head>
    <meta charset="utf-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >

    <title>Null Yard</title>

    <meta
        name="description"
        content="Experimental software projects."
    >

    <link
        rel="stylesheet"
        href="style.css"
    >
</head>

<body>

<header class="site-header">

    <div class="container header-inner">

        <a class="logo" href="/">
            Null Yard
        </a>

        <nav
            class="navigation"
            aria-label="Main navigation"
        >
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
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
            I build things
            that solve
            real problems.
        </h1>

        <p class="hero-description">
            Go, HTML, CSS, automation
            and AI experiments.
        </p>

        <a class="button" href="#projects">
            View projects
        </a>

    </div>

</section>

<section class="projects" id="projects">

    <div class="container">

        <header class="section-header">
            <h2>Projects</h2>
            <p>A few things I am working on.</p>
        </header>

        <div class="project-grid">

            <article class="card">
                <h3>Web Monitor</h3>
                <p>Automatic monitoring of promotion pages.</p>
                <a href="#">View project</a>
            </article>

            <article class="card">
                <h3>Example Site</h3>
                <p>A minimalist platform for publishing stories.</p>
                <a href="#">View project</a>
            </article>

            <article class="card">
                <h3>Hermes Tools</h3>
                <p>Experiments with AI agents and automation.</p>
                <a href="#">View project</a>
            </article>

        </div>

    </div>

</section>

<section class="about" id="about">

    <div class="container prose">
        <h2>About Null Yard</h2>

        <p>
            Null Yard is a place for small
            experimental software projects.
        </p>
    </div>

</section>

</main>

<footer class="site-footer" id="contact">

    <div class="container">
        <p>© 2026 Null Yard</p>
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
        --color-bg: #f7f7f7;
        --color-surface: #ffffff;
        --color-text: #161616;
        --color-muted: #666666;
        --color-primary: #4058d6;
        --color-border: #dddddd;

        --space-small: 0.5rem;
        --space-medium: 1rem;
        --space-large: 2rem;
        --space-xl: 4rem;

        --radius: 0.75rem;
    }

    body {
        min-height: 100dvh;

        font-family:
            system-ui,
            sans-serif;

        font-size: 1rem;
        line-height: 1.6;

        background: var(--color-bg);
        color: var(--color-text);
    }

    h1,
    h2,
    h3 {
        line-height: 1.15;
        text-wrap: balance;
    }

    h1 {
        font-size: clamp(2.5rem, 7vw, 6rem);
        max-width: 15ch;
        margin-block: 0 1.5rem;
    }

    h2 {
        font-size: clamp(2rem, 4vw, 3rem);
    }

    a {
        color: var(--color-primary);
        text-underline-offset: 0.2em;
    }

    :focus-visible {
        outline: 3px solid var(--color-primary);
        outline-offset: 4px;
    }
}

@layer layout {
    .container {
        width: min(100% - 2rem, 1200px);
        margin-inline: auto;
    }

    .header-inner {
        min-height: 70px;

        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
    }

    .project-grid {
        display: grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(
                    min(250px, 100%),
                    1fr
                )
            );

        gap: 1.5rem;
    }
}

@layer components {
    .site-header {
        border-block-end: 1px solid var(--color-border);
        background: var(--color-surface);
    }

    .logo {
        color: inherit;
        font-weight: 800;
        text-decoration: none;
    }

    .navigation {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;

        a {
            color: inherit;
            text-decoration: none;

            &:hover {
                color: var(--color-primary);
            }
        }
    }

    .hero {
        padding-block: clamp(5rem, 12vw, 10rem);
    }

    .hero-label {
        color: var(--color-primary);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    .hero-description {
        max-width: 50ch;
        font-size: 1.2rem;
        color: var(--color-muted);
        margin-block-end: 2rem;
    }

    .button {
        display: inline-block;
        padding: 0.8em 1.4em;
        border-radius: 0.5rem;
        background: var(--color-primary);
        color: white;
        font-weight: 700;
        text-decoration: none;
        transition: transform 150ms ease;

        &:hover {
            transform: translateY(-2px);
        }
    }

    .projects,
    .about {
        padding-block: var(--space-xl);
    }

    .section-header {
        margin-block-end: 2rem;
    }

    .card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius);
        background: var(--color-surface);

        h3 {
            margin-block-start: 0;
        }
    }

    .prose {
        max-width: 70ch;
    }

    .site-footer {
        margin-block-start: 4rem;
        padding-block: 2rem;
        border-block-start: 1px solid var(--color-border);
        color: var(--color-muted);
    }
}
```

---

# 29. Good practices

## Use semantic HTML

Prefer:

```html
<nav>
<main>
<article>
<button>
```

instead of:

```html
<div class="nav">
<div class="main">
<div class="article">
<div class="button">
```

## Do not encode layout in HTML

Do not add repeated `<br>` elements just to create spacing. Use CSS margins or gaps.

## Do not use tables for layout

Tables are for data. Use Grid or Flexbox for layout.

## Do not absolutely position everything

Layouts based on hard-coded top/left pixel positions break easily.

Prefer normal flow, Flexbox and Grid.

## Avoid unnecessary fixed heights

Do not force a card to a fixed height when content length can vary.

## Do not design for one resolution

A page may be used on a phone, tablet, laptop, large monitor, half-screen window or at 200% zoom.

## Do not overuse breakpoints

First consider:

```text
auto-fit
minmax()
clamp()
flex-wrap
container queries
```

## Do not remove focus indication

Avoid:

```css
*:focus {
    outline: none;
}
```

## Do not build everything with JavaScript

Modern HTML and CSS already provide a lot.

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

# 30. Cheat sheet

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

# 31. What you should know

To say “I know HTML and CSS”, you do not need to memorise every property.

You should understand:

1. HTML document structure,
2. semantics,
3. links and images,
4. forms,
5. accessibility basics,
6. CSS selectors,
7. the cascade,
8. specificity,
9. the box model,
10. units,
11. typography,
12. normal flow,
13. Flexbox,
14. Grid,
15. positioning,
16. responsive design,
17. media queries,
18. custom properties,
19. animations,
20. container queries,
21. `clamp()`,
22. `:has()`,
23. CSS nesting,
24. `@layer`.

The most important skill is not memorising syntax. It is recognising the type of problem.

Examples:

> This is a two-dimensional layout — use Grid.

> This is a single row or column — use Flexbox.

> The component should react to its own width — use a container query.

> Text size should scale smoothly with the screen — use `clamp()`.

---

# Mental model for building a page

```text
content
   ↓
semantic HTML
   ↓
normal flow
   ↓
Grid / Flexbox
   ↓
responsive values
min() / max() / clamp()
   ↓
media queries only where
they are actually needed
   ↓
container queries
for independent components
   ↓
CSS variables
for shared values
   ↓
@layer
for cascade control
   ↓
nesting
for component readability
   ↓
JavaScript only where
logic is required
```

HTML should still make sense with CSS disabled.

CSS should present a well-designed HTML structure rather than compensate for a poor one.

This is a strong foundation for building modern websites without Bootstrap, Tailwind or JavaScript frameworks.
