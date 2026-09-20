---
id: "doc-048"
title: "Web Performance"
slug: "web-performance"
description: "Page speed affects UX, conversion, accessibility, battery/data use and SEO."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "performance"
  - "cwv"
  - "lcp"
  - "inp"
  - "cls"
  - "cache"
  - "images"
---

# Web Performance

## 1. Goal

Page speed affects UX, conversion, accessibility, battery/data use and SEO.

Optimisation should be measurement-driven.

## 2. Where time is spent

Simplified request path:

```text
DNS
→ TCP
→ TLS
→ request
→ TTFB
→ download
→ parse
→ render
→ interaction
```

## 3. TTFB

Time To First Byte measures the time until the first response data arrives.

It is affected by the network, backend, database, cache and CDN.

## 4. Core Web Vitals

### LCP

Time until the largest important content element is rendered.

Typical issues: large hero image, blocking CSS, slow backend.

### INP

Interaction responsiveness.

Typical issues: heavy JavaScript, long tasks and too much main-thread work.

### CLS

Unexpected layout shifts.

Common causes: images without dimensions, late-loading fonts and ads/components without reserved space.

## 5. Images

Use the right format and size, responsive images and lazy loading.

```html
<img
  src="image-800.webp"
  srcset="image-400.webp 400w, image-800.webp 800w"
  sizes="(max-width: 600px) 100vw, 800px"
  width="800"
  height="450"
  loading="lazy"
  alt=""
>
```

## 6. Formats

- JPEG — photos,
- PNG — transparency / graphics,
- WebP — modern general-purpose format,
- AVIF — very efficient compression,
- SVG — vector graphics.

## 7. Lazy loading

```html
<img loading="lazy" ...>
```

Do not lazy-load the critical LCP image without a reason.

## 8. CSS

Common problems include huge stylesheets, unused CSS, render blocking and too many fonts.

Critical CSS should be available early.

## 9. JavaScript

JavaScript costs transfer, parse, compile and execution time.

Remove unnecessary JavaScript first.

## 10. async and defer

```html
<script src="app.js" defer></script>
```

defer downloads in parallel, executes after HTML parsing and preserves order.

async executes after download and does not guarantee ordering.

## 11. Code splitting

Do not send code the user does not need on the current page.

## 12. Cache

```http
Cache-Control: public, max-age=31536000, immutable
```

Useful for versioned assets such as:

```text
app.abc123.js
style.def456.css
```

## 13. ETag

ETag lets the client check whether a resource changed.

With proper caching, the response can be:

```text
304 Not Modified
```

## 14. Compression

Common choices are Brotli and gzip. Text assets should normally be compressed.

## 15. CDN

A CDN can reduce distance, cache content, terminate TLS and protect the origin.

It does not fix slow frontend code.

## 16. preconnect

```html
<link rel="preconnect" href="https://cdn.example.com">
```

Use it for important external origins.

## 17. preload

```html
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin>
```

Only preload genuinely critical resources.

## 18. Fonts

Prefer WOFF2, few variants, subsets, sensible fallbacks and font-display.

```css
font-display: swap;
```

## 19. Layout thrashing

Alternating layout reads and writes can cause expensive reflows. Group operations when possible.

## 20. Long tasks

A long task blocks the main thread. In DevTools Performance, pay particular attention to tasks above 50 ms.

## 21. Lighthouse

Lighthouse provides guidance about images, JS, CSS, caching and render blocking.

Do not optimise only for the score.

## 22. Real User Monitoring

Lab tests and real users are different. RUM measures actual user experience.

## 23. Performance budget

Example:

```text
JS < 250 KB compressed
LCP < 2.5 s
CLS < 0.1
```

A budget helps prevent gradual performance regression.

## 24. Optimisation order

1. measure,
2. find the biggest problem,
3. improve it,
4. measure again,
5. move to the next problem.

## 25. What you should know

You should understand waterfalls, diagnose LCP/INP/CLS, optimise images, use caching and compression, reduce JavaScript, interpret Lighthouse and compare before/after measurements.
