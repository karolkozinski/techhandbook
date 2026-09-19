# Modern HTML and CSS — Practical Handbook

## Contents

This handbook is intended to be sufficient for building a modern, responsive static website without a framework.

It covers:

- semantic HTML,
- text and links,
- images,
- tables,
- forms,
- accessibility,
- modern CSS,
- box model,
- typography,
- Flexbox,
- Grid,
- responsive design,
- container queries,
- dark mode,
- animation,
- project organization,
- a complete example.

## 1. HTML basics

HTML describes document structure and meaning.

A page is built from elements:

```html
<p>Hello</p>
```

Element:

```text
opening tag
content
closing tag
```

Some elements are void elements:

```html
<img>
<input>
<meta>
<link>
```

## 2. Document structure

Minimal modern document:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Example</title>
  <meta name="description" content="Page description">
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <main>
    <h1>Hello</h1>
  </main>
</body>
</html>
```

### doctype

```html
<!doctype html>
```

tells the browser to use standards mode.

### lang

```html
<html lang="en">
```

helps:

- screen readers,
- search engines,
- spell checking,
- language-specific typography.

### head

Contains document metadata and linked resources, not normal visible page content.

## 3. Semantic HTML

Use elements according to meaning.

### header

Introductory/header content.

```html
<header>
  <h1>Tech Handbook</h1>
</header>
```

### nav

Major navigation.

```html
<nav aria-label="Primary">
  ...
</nav>
```

### main

The primary page content.

Normally one main landmark per document.

### section

A thematic section, usually with a heading.

### article

Self-contained content that could stand on its own.

Examples:

- blog post,
- handbook entry,
- news item.

### aside

Related but secondary content.

### footer

Footer for page or section.

### div

Generic block container.

Use it when no semantic element fits.

Do not turn every element into a `div`.

## 4. Headings

```html
<h1>Page title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
```

Use heading levels to describe hierarchy, not for font size.

Usually one clear top-level `h1` is appropriate.

## 5. Paragraphs and inline emphasis

```html
<p>This is a paragraph.</p>

<p>
  <strong>Important</strong>
  and
  <em>emphasized</em>.
</p>
```

`strong` and `em` carry meaning, not only visual style.

## 6. Code and preformatted text

Inline:

```html
<code>git status</code>
```

Block:

```html
<pre><code>git status
git diff</code></pre>
```

Escape HTML characters inside code when needed.

## 7. Quotes

Inline:

```html
<q>Short quotation</q>
```

Block:

```html
<blockquote>
  <p>Longer quotation.</p>
</blockquote>
```

## 8. Lists

Unordered:

```html
<ul>
  <li>One</li>
  <li>Two</li>
</ul>
```

Ordered:

```html
<ol>
  <li>First</li>
  <li>Second</li>
</ol>
```

Description list:

```html
<dl>
  <dt>DNS</dt>
  <dd>Name resolution system.</dd>
</dl>
```

## 9. Links

```html
<a href="https://example.com">Example</a>
```

Relative:

```html
<a href="./docs/http.html">HTTP</a>
```

Email:

```html
<a href="mailto:user@example.com">Email</a>
```

Use descriptive link text.

## 10. Link vs button

Use a link when the action navigates.

Use a button when it performs an action.

```html
<a href="/docs">Documentation</a>
<button type="button">Open menu</button>
```

Avoid clickable `div` elements for controls.

## 11. Images

```html
<img
  src="./images/photo.jpg"
  alt="Server rack in a small homelab"
  width="1200"
  height="800"
>
```

Consider:

- meaningful alt text,
- explicit dimensions,
- appropriate file size/format.

Dimensions reduce layout shift.

## 12. Decorative images

If an image carries no information:

```html
<img src="decoration.svg" alt="">
```

An empty alt tells assistive technology to ignore it.

## 13. Responsive images

```html
<img
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w
  "
  sizes="(max-width: 600px) 100vw, 800px"
  alt="..."
>
```

The browser can choose the appropriate resource.

## 14. picture

```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="...">
</picture>
```

Also useful for art direction at different viewport sizes.

## 15. Lazy loading

```html
<img loading="lazy" ...>
```

Good for below-the-fold images.

Do not lazy-load the critical LCP/hero image by default.

## 16. figure

```html
<figure>
  <img src="chart.png" alt="...">
  <figcaption>Monthly traffic.</figcaption>
</figure>
```

Use when caption and media form one unit.

## 17. Tables

Use for tabular data, not page layout.

```html
<table>
  <caption>Server inventory</caption>
  <thead>
    <tr>
      <th scope="col">Host</th>
      <th scope="col">OS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>vps</td>
      <td>Debian</td>
    </tr>
  </tbody>
</table>
```

For row headers:

```html
<th scope="row">...</th>
```

## 18. Forms

```html
<form action="/search" method="get">
  <label for="q">Search</label>
  <input id="q" name="q" type="search">
  <button type="submit">Search</button>
</form>
```

Every form control needs an accessible label.

## 19. Input types

Examples:

```html
<input type="text">
<input type="email">
<input type="password">
<input type="number">
<input type="date">
<input type="search">
<input type="checkbox">
<input type="radio">
<input type="file">
```

Use the semantically correct type.

Browsers then provide better keyboards, validation, and accessibility.

## 20. Form validation

```html
<input
  type="email"
  name="email"
  required
  minlength="5"
>
```

Useful attributes:

- required,
- minlength,
- maxlength,
- min,
- max,
- pattern.

Client-side validation improves UX.

Server-side validation remains mandatory.

## 21. textarea

```html
<label for="message">Message</label>
<textarea id="message" name="message" rows="6"></textarea>
```

## 22. select

```html
<label for="lang">Language</label>
<select id="lang" name="lang">
  <option value="pl">PL</option>
  <option value="en">ENG</option>
</select>
```

Use native select when it solves the UI. It has excellent keyboard/mobile/accessibility behavior.

## 23. fieldset

Group related controls:

```html
<fieldset>
  <legend>Theme</legend>

  <label>
    <input type="radio" name="theme" value="light">
    Light
  </label>

  <label>
    <input type="radio" name="theme" value="dark">
    Dark
  </label>
</fieldset>
```

## 24. autocomplete

Help browsers/password managers:

```html
<input
  type="email"
  name="email"
  autocomplete="email"
>
```

Use correct tokens instead of disabling autocomplete without reason.

## 25. details and summary

Native expandable section:

```html
<details>
  <summary>Advanced options</summary>
  <p>...</p>
</details>
```

Often better than writing custom accordion JavaScript.

## 26. data attributes

```html
<button data-document-id="docker">Open</button>
```

JavaScript:

```js
button.dataset.documentId
```

Useful for application metadata.

## 27. Accessibility fundamentals

Good frontend code should support:

- keyboard,
- screen readers,
- zoom,
- high contrast,
- reduced motion,
- mobile,
- visible focus.

Accessibility is part of correctness.

## 28. ARIA

ARIA adds accessibility semantics when native HTML is insufficient.

Rule:

> Use native semantic HTML first.

Bad:

```html
<div role="button">
```

when you can use:

```html
<button>
```

ARIA does not automatically add keyboard behavior.

## 29. CSS basics

CSS consists of selectors and declarations:

```css
.card {
  padding: 1rem;
  border: 1px solid #ccc;
}
```

`.card` is a selector.

Inside braces are property/value declarations.

## 30. Linking CSS

External stylesheet:

```html
<link rel="stylesheet" href="./assets/styles.css">
```

For real projects, external CSS is usually cleaner than large inline style blocks.

## 31. Selectors

Element:

```css
p { }
```

Class:

```css
.card { }
```

ID:

```css
#main { }
```

Attribute:

```css
input[type="email"] { }
```

Descendant:

```css
nav a { }
```

Child:

```css
nav > ul { }
```

## 32. Pseudo-classes

```css
a:hover { }
button:focus-visible { }
input:disabled { }
li:first-child { }
```

Modern helpers:

```css
:not(...)
:is(...)
:where(...)
:has(...)
```

Check browser support when targeting older environments.

## 33. Pseudo-elements

```css
.card::before { }
.card::after { }
p::first-line { }
::selection { }
```

Generated content should not contain essential information that exists nowhere in HTML.

## 34. Cascade

When rules conflict, the browser considers:

- origin/layer,
- importance,
- specificity,
- source order.

Do not fight the cascade by adding `!important` everywhere.

## 35. Specificity

Roughly:

```text
inline styles
IDs
classes/attributes/pseudo-classes
elements/pseudo-elements
```

Modern CSS architecture can reduce specificity problems with layers and low-specificity selectors.

## 36. !important

```css
color: red !important;
```

This overrides many normal cascade rules.

Use sparingly.

Frequent `!important` often signals poor CSS structure.

## 37. Inheritance

Some properties naturally inherit:

- color,
- font-family,
- line-height.

Others usually do not:

- margin,
- padding,
- border.

Use:

```css
font: inherit;
```

on form controls when you want them to match surrounding typography.

## 38. Box model

Every element has:

```text
content
padding
border
margin
```

Most projects prefer:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Then declared width includes padding and border.

## 39. Margin and padding

Margin is outside the border.

Padding is inside.

```css
.card {
  margin-block: 1rem;
  padding: 1.5rem;
}
```

## 40. Logical properties

```css
margin-inline: auto;
padding-block: 1rem;
```

Logical properties adapt better to different writing directions.

## 41. Units

### px

Useful for borders and exact small dimensions.

### rem

Relative to root font size.

Excellent for spacing and typography.

### em

Relative to the current element's font size.

### %

Relative to a containing/reference value depending on property.

### vw / vh

Viewport width/height units.

Modern browsers also provide dynamic/small/large viewport units useful on mobile.

## 42. min(), max(), clamp()

Responsive size:

```css
font-size: clamp(1.5rem, 3vw, 3rem);
```

Width:

```css
width: min(100%, 70rem);
```

These reduce the need for many media queries.

## 43. calc()

```css
height: calc(100vh - 4rem);
```

Can combine compatible units.

## 44. Colors

Common forms:

```css
color: #222;
color: rgb(34 34 34);
color: hsl(0 0% 13%);
```

Modern CSS supports additional color spaces/functions in current browsers.

## 45. currentColor

```css
.icon {
  fill: currentColor;
}
```

The element uses its current `color` value.

Excellent for SVG icons and borders.

## 46. CSS custom properties

```css
:root {
  --space-1: 0.5rem;
  --space-2: 1rem;
  --surface: #fff;
  --text: #111;
}

.card {
  padding: var(--space-2);
  background: var(--surface);
  color: var(--text);
}
```

Custom properties participate in the cascade and can change by theme/component.

## 47. color-mix()

Modern CSS:

```css
border-color: color-mix(in srgb, currentColor 20%, transparent);
```

Check target-browser support.

## 48. Typography

Good baseline:

```css
body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}
```

Readable text depends on:

- font size,
- line height,
- contrast,
- line length,
- spacing.

## 49. Line length

For long-form text:

```css
.prose {
  max-width: 70ch;
}
```

Around 60–75 characters per line is often comfortable, though context matters.

## 50. Normal flow

HTML elements naturally participate in document flow.

Before reaching for absolute positioning, let normal flow solve layout.

Most content pages need far less positioning than beginners expect.

## 51. display

Common values:

```text
block
inline
inline-block
flex
grid
none
```

Modern layout relies mainly on:

- normal flow,
- Flexbox,
- Grid.

## 52. Flexbox

Good for one-dimensional layout.

```css
.toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
}
```

## 53. Flex direction

```css
flex-direction: row;
flex-direction: column;
```

Default is row.

## 54. justify-content

Controls distribution along the main axis:

```css
justify-content: space-between;
justify-content: center;
```

## 55. align-items

Cross-axis alignment:

```css
align-items: center;
align-items: stretch;
```

## 56. gap

```css
gap: 1rem;
```

Use `gap` instead of complex child margins where possible.

## 57. flex-wrap

```css
flex-wrap: wrap;
```

Allows items to move to additional rows.

## 58. flex shorthand

```css
.item {
  flex: 1 1 20rem;
}
```

Means grow, shrink, basis.

## 59. CSS Grid

Excellent for two-dimensional layout.

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
}
```

## 60. fr unit

```css
grid-template-columns: 1fr 2fr;
```

The second track receives twice the remaining fraction space.

## 61. repeat()

```css
grid-template-columns: repeat(3, 1fr);
```

## 62. minmax()

```css
grid-template-columns: repeat(3, minmax(0, 1fr));
```

Useful to prevent overflow surprises.

## 63. Responsive Grid without a media query

```css
.cards {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
  gap: 1rem;
}
```

Cards wrap automatically.

## 64. Grid areas

```css
.layout {
  display: grid;
  grid-template-areas:
    "nav main"
    "nav footer";
}

.nav { grid-area: nav; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## 65. subgrid

```css
.child {
  display: grid;
  grid-template-columns: subgrid;
}
```

Useful for aligning nested layouts with parent tracks.

## 66. Flexbox or Grid?

Use Flexbox for:

- toolbars,
- navigation rows,
- one-dimensional component alignment.

Use Grid for:

- page columns,
- card grids,
- two-dimensional layout.

You can combine them.

## 67. Positioning

### relative

Keeps the element in normal flow and establishes a positioning context.

### absolute

Removed from normal flow and positioned relative to a containing block.

### fixed

Relative to viewport.

### sticky

Behaves normally until a scroll threshold.

```css
.sidebar {
  position: sticky;
  top: 1rem;
}
```

## 68. z-index

`z-index` works within stacking contexts.

If an enormous z-index does not work, inspect stacking contexts rather than adding more digits.

## 69. overflow

```css
overflow: auto;
overflow: hidden;
overflow-x: auto;
```

For code blocks:

```css
pre {
  overflow-x: auto;
}
```

## 70. aspect-ratio

```css
.video {
  aspect-ratio: 16 / 9;
}
```

Useful for media placeholders.

## 71. object-fit

```css
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

`cover` may crop.

`contain` keeps the full object visible.

## 72. Page container

```css
.container {
  width: min(100% - 2rem, 75rem);
  margin-inline: auto;
}
```

Responsive side spacing with a maximum width.

## 73. Responsive design

Start with a flexible base layout.

Add media queries where the content actually needs a different layout.

Mobile-first example:

```css
.layout {
  display: grid;
  gap: 1rem;
}

@media (min-width: 60rem) {
  .layout {
    grid-template-columns: 20rem 1fr;
  }
}
```

## 74. Modern media-query syntax

Modern:

```css
@media (width >= 60rem) {
  ...
}
```

Traditional:

```css
@media (min-width: 60rem) {
  ...
}
```

Both are useful depending on browser targets/project conventions.

## 75. Breakpoints

Do not choose breakpoints only from device labels.

Choose them where your content or layout needs change.

## 76. Container queries

A component can respond to its own container.

```css
.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 30rem) {
  .card {
    grid-template-columns: 10rem 1fr;
  }
}
```

Excellent for reusable components.

## 77. Named containers

```css
.sidebar {
  container: sidebar / inline-size;
}

@container sidebar (min-width: 25rem) {
  ...
}
```

## 78. Cascade layers

```css
@layer reset, base, components, utilities;
```

Then:

```css
@layer base {
  body { ... }
}
```

Layers let you control cascade priority without specificity wars.

## 79. CSS nesting

Modern CSS supports nesting in current browsers.

```css
.card {
  padding: 1rem;

  & h2 {
    margin-block-start: 0;
  }

  &:hover {
    box-shadow: 0 0 1rem rgb(0 0 0 / 0.1);
  }
}
```

Keep nesting shallow.

## 80. Class naming

Use clear names:

```text
site-header
doc-list
doc-card
theme-toggle
language-select
```

Avoid names tied only to appearance such as `leftBlueBox`.

## 81. Design tokens

```css
:root {
  --font-sans: system-ui, sans-serif;
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --radius: 0.6rem;
  --border: 1px solid var(--line);
}
```

This keeps spacing, colors, and component decisions consistent.

## 82. Dark mode

System preference:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --surface: #111;
    --text: #eee;
  }
}
```

Manual theme:

```html
<html data-theme="dark">
```

```css
[data-theme="dark"] {
  --surface: #111;
  --text: #eee;
}
```

JavaScript can store the user's choice in localStorage.

## 83. color-scheme

```css
:root {
  color-scheme: light dark;
}
```

This lets the browser style native controls/scrollbars more appropriately.

## 84. Transitions

```css
.button {
  transition:
    background-color 150ms ease,
    transform 150ms ease;
}
```

Animate only properties that help users understand state.

## 85. Transform

```css
.card:hover {
  transform: translateY(-2px);
}
```

Transforms usually animate efficiently.

## 86. keyframes

```css
@keyframes pulse {
  from { opacity: 0.6; }
  to   { opacity: 1; }
}
```

Use:

```css
.loading {
  animation: pulse 800ms ease-in-out infinite alternate;
}
```

## 87. Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .animated {
    animation: none;
    transition: none;
  }
}
```

Respect user preference without removing useful state feedback.

## 88. Form styling

```css
button,
input,
select,
textarea {
  font: inherit;
}
```

Do not remove native behavior/accessibility unnecessarily.

## 89. Focus

```css
:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}
```

Never globally remove focus indication without an accessible replacement.

## 90. Invalid state

```css
input:invalid:not(:placeholder-shown) {
  border-color: red;
}
```

Use text error messages too; color alone is insufficient.

## 91. Small CSS reset/base

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
}

img,
svg,
video {
  display: block;
  max-width: 100%;
}

button,
input,
select,
textarea {
  font: inherit;
}
```

Do not reset everything blindly.

## 92. Project organization

Small static site:

```text
project/
├── index.html
├── assets/
│   ├── styles.css
│   ├── app.js
│   └── images/
└── pages/
```

Avoid premature complexity.

## 93. Complete example — HTML

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Example Handbook</title>
  <meta name="description" content="A small responsive handbook">
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <header class="site-header">
    <div class="container header-row">
      <a class="brand" href="/">Handbook</a>

      <nav aria-label="Primary">
        <ul class="nav-list">
          <li><a href="#docs">Docs</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <p class="eyebrow">Technical notes</p>
      <h1>Practical documentation</h1>
      <p>
        Short, readable guides for everyday technical work.
      </p>
      <a class="button" href="#docs">Browse documents</a>
    </section>

    <section id="docs" aria-labelledby="docs-title">
      <h2 id="docs-title">Documents</h2>

      <div class="cards">
        <article class="card">
          <h3><a href="#">Docker</a></h3>
          <p>Containers, images, Compose and deployment.</p>
        </article>

        <article class="card">
          <h3><a href="#">GitHub</a></h3>
          <p>Repositories, Pull Requests and automation.</p>
        </article>
      </div>
    </section>
  </main>
</body>
</html>
```

## 94. Complete example — CSS

```css
@layer reset, base, components;

@layer reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body,
  h1,
  h2,
  h3,
  p {
    margin-block-start: 0;
  }

  img,
  svg {
    display: block;
    max-width: 100%;
  }
}

@layer base {
  :root {
    --bg: #ffffff;
    --surface: #f5f5f5;
    --text: #171717;
    --muted: #666666;
    --line: #dddddd;
    --accent: #1d4ed8;
    --radius: 0.75rem;

    color-scheme: light;
    font-family: system-ui, sans-serif;
    line-height: 1.6;
  }

  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
  }

  a {
    color: var(--accent);
  }

  :focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
  }
}

@layer components {
  .container {
    width: min(100% - 2rem, 72rem);
    margin-inline: auto;
  }

  .site-header {
    border-block-end: 1px solid var(--line);
  }

  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-height: 4rem;
  }

  .brand {
    color: inherit;
    font-weight: 700;
    text-decoration: none;
  }

  .nav-list {
    display: flex;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .hero {
    padding-block: clamp(4rem, 10vw, 8rem);
  }

  .hero h1 {
    max-width: 12ch;
    font-size: clamp(2.5rem, 8vw, 5rem);
    line-height: 1;
  }

  .hero p {
    max-width: 60ch;
  }

  .button {
    display: inline-block;
    padding: 0.75rem 1rem;
    border-radius: var(--radius);
    background: var(--accent);
    color: white;
    text-decoration: none;
  }

  .cards {
    display: grid;
    grid-template-columns:
      repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
    gap: 1rem;
  }

  .card {
    padding: 1.25rem;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: var(--surface);
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #111111;
    --surface: #1b1b1b;
    --text: #eeeeee;
    --muted: #aaaaaa;
    --line: #333333;
    --accent: #8ab4ff;

    color-scheme: dark;
  }
}
```

## 95. Good practices

### Use semantic HTML

It improves:

- accessibility,
- maintainability,
- SEO,
- default browser behavior.

### Keep layout in CSS

HTML should describe content and relationships.

### Do not use tables for layout

Use Flexbox/Grid.

### Avoid absolute positioning for whole pages

Absolute positioning is for overlays/specific components, not normal document layout.

### Avoid fixed heights without need

Content changes with:

- translations,
- zoom,
- font settings,
- viewport.

Prefer content-driven layout.

### Do not design for one resolution

Use flexible widths and responsive layout.

### Do not create dozens of breakpoints

Use natural layout, Grid/Flex wrapping, `clamp`, and container queries first.

### Never remove focus visibility

Keyboard users need it.

### Do not build everything in JavaScript

If HTML/CSS can implement it reliably, use HTML/CSS.

## 96. CSS architecture for small projects

A simple order:

```text
tokens
base
layout
components
utilities
responsive adjustments
```

You probably do not need a CSS framework for a small documentation site.

## 97. Utility classes

A few utilities can be useful:

```css
.flow > * + * {
  margin-block-start: 1rem;
}

.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
```

Do not reinvent a full utility framework accidentally.

## 98. Visually hidden content

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
```

Useful for icon-button labels and extra accessible text.

## 99. Sticky sidebar layout

```css
.docs-layout {
  display: grid;
  gap: 2rem;
}

@media (min-width: 60rem) {
  .docs-layout {
    grid-template-columns: 18rem minmax(0, 1fr);
  }

  .docs-sidebar {
    position: sticky;
    top: 1rem;
    align-self: start;
    max-height: calc(100vh - 2rem);
    overflow: auto;
  }
}
```

## 100. Long code blocks

```css
pre {
  max-width: 100%;
  overflow-x: auto;
  padding: 1rem;
  border-radius: 0.5rem;
}
```

Do not let code force the whole page wider than the viewport.

## 101. Responsive tables

Wrapper:

```html
<div class="table-scroll">
  <table>...</table>
</div>
```

```css
.table-scroll {
  overflow-x: auto;
}
```

Do not destroy table semantics just to fit mobile.

## 102. hidden attribute

```html
<section hidden>...</section>
```

JavaScript:

```js
panel.hidden = true;
```

Use the native `hidden` attribute for UI state where appropriate.

## 103. prefers-color-scheme

```css
@media (prefers-color-scheme: dark) {
  ...
}
```

If you provide a manual theme switch, define a clear precedence between user choice and system preference.

## 104. prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  .animated {
    animation: none;
    transition: none;
  }
}
```

## 105. Print CSS

Documentation may benefit from:

```css
@media print {
  nav,
  .toolbar {
    display: none;
  }

  body {
    color: black;
    background: white;
  }

  a {
    color: inherit;
  }
}
```

Test actual print/PDF output.

## 106. CSS debugging

When layout is wrong:

1. inspect the element,
2. view Computed styles,
3. inspect the box model,
4. check which rule wins,
5. toggle properties,
6. inspect containing block,
7. check overflow/Grid/Flex sizes.

Do not immediately add `!important`.

## 107. Common layout bugs

### Width overflow

Causes:

- fixed width,
- long unbreakable text,
- large image,
- `100vw` plus scrollbar/padding,
- flex item with `min-width:auto`.

Useful fix for grid/flex children:

```css
min-width: 0;
```

### Image overflow

```css
img {
  max-width: 100%;
  height: auto;
}
```

### Flex text does not shrink

Add:

```css
min-width: 0;
```

to the flex item.

## 108. Specificity debugging

If a rule is crossed out in DevTools, another rule won.

Inspect:

- selector specificity,
- layer,
- source order,
- inherited vs direct value,
- `!important`.

Fix architecture instead of escalating selectors.

## 109. Performance

HTML/CSS performance basics:

- optimize images,
- avoid huge CSS,
- remove unused frameworks,
- avoid layout-shifting media,
- use system fonts or optimize web fonts,
- keep critical content easy to render.

## 110. SEO basics in HTML

Use:

- unique `title`,
- meta description,
- semantic headings,
- meaningful links,
- canonical when needed,
- correct language,
- structured data only where appropriate.

SEO starts with a crawlable, understandable document.

## 111. Security

Frontend code should avoid:

- untrusted HTML injection,
- unsafe inline scripts where CSP matters,
- leaking secrets into HTML,
- exposing internal data in comments/source.

Anything delivered to the browser is visible to the user.

## 112. External links

If opening a new tab:

```html
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
>
  Example
</a>
```

Do not force every external link into a new tab unless UX requires it.

## 113. Favicons

Minimal setup:

```html
<link rel="icon" href="./favicon.ico">
```

or PNG/SVG variants according to browser support and branding needs.

Keep paths correct for project hosting such as GitHub Pages.

## 114. GitHub Pages path warning

For a project page:

```text
https://user.github.io/project/
```

this:

```html
<link rel="stylesheet" href="/assets/styles.css">
```

points to the domain root, not the project root.

Use:

```html
<link rel="stylesheet" href="./assets/styles.css">
```

or a deliberate base-path strategy.

## 115. What you need to build a site

HTML:

- document structure,
- semantic landmarks,
- headings,
- links,
- images,
- forms,
- tables.

CSS:

- cascade,
- box model,
- typography,
- Flexbox,
- Grid,
- responsive layout,
- focus/accessibility,
- variables/themes.

Then add JavaScript only for behavior.

## 116. Final cheat sheet

HTML:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
<h1>..<h6>
<p>
<a>
<img>
<ul><li>
<form>
<label>
<input>
<button>
<table>
```

CSS:

```css
display: flex;
display: grid;
gap: 1rem;
width: min(...);
max-width: ...;
margin-inline: auto;
padding: ...;
position: sticky;
overflow: auto;
font-size: clamp(...);
grid-template-columns: repeat(...);
@media (...);
@container (...);
var(--token);
```

## Mental model

Build a modern page in this order:

```text
semantic HTML
  ↓
normal document flow
  ↓
typography and spacing
  ↓
Flexbox/Grid
  ↓
responsive behavior
  ↓
accessibility states
  ↓
optional animation/theme
  ↓
JavaScript only where behavior requires it
```

A clean HTML/CSS foundation is easier to maintain than a page whose layout depends on layers of JavaScript and overrides.
