---
id: "doc-047"
title: "Technical SEO — Practical Handbook"
slug: "technical-seo-practical-handbook"
description: "Technical SEO covers technical factors that affect whether a crawler can discover a page, index content, understand structure, select the correct URL and…"
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "seo"
  - "technical seo"
  - "robots"
  - "sitemap"
  - "canonical"
  - "cwv"
---

# Technical SEO — Practical Handbook

## 1. What Technical SEO is

Technical SEO covers technical factors that affect whether a crawler can discover a page, index content, understand structure, select the correct URL and evaluate performance and page quality.

It does not replace content or links, but poor technical implementation can prevent good content from being properly visible.

## 2. Crawling and indexing

Crawler:

```text
discover URL
fetch document
analyse links
discover more URLs
```

Indexing:

```text
analyse content
choose canonical version
store information in the index
```

A page can be crawlable but not indexed.

## 3. robots.txt

Typical file:

```text
User-agent: *
Disallow:

Sitemap: https://example.com/sitemap.xml
```

Block a path:

```text
Disallow: /admin/
```

robots.txt is not a security mechanism.

## 4. meta robots

```html
<meta name="robots" content="noindex, follow">
```

Common values: index, noindex, follow and nofollow.

## 5. XML sitemap

```xml
<url>
  <loc>https://example.com/article</loc>
  <lastmod>2026-09-19</lastmod>
</url>
```

A sitemap helps URL discovery but does not guarantee indexing.

## 6. Canonical

```html
<link rel="canonical" href="https://example.com/product">
```

Canonical indicates the preferred URL version.

Typical duplicates:

```text
/product
/product?source=campaign
/product?sort=price
```

## 7. Redirects

301 is permanent.

302 / 307 are temporary.

Avoid chains:

```text
A → B → C → D
```

Prefer:

```text
A → D
```

## 8. HTTP status codes

Especially important:

```text
200 OK
301 Permanent Redirect
404 Not Found
410 Gone
5xx Server Error
```

A soft 404 returns 200 even though the content effectively does not exist.

## 9. HTTPS

Use one consistent HTTPS version of the site.

Avoid parallel indexing of http/https or www/non-www variants. Choose the target version and redirect the others.

## 10. Title

```html
<title>Page description</title>
```

It should be unique, descriptive and consistent with the page content.

## 11. Meta description

```html
<meta name="description" content="Short page description">
```

It is not a direct ranking signal, but it can influence how a result is presented.

## 12. Headings

A good hierarchy:

```text
H1
 ├─ H2
 │   ├─ H3
 │   └─ H3
 └─ H2
```

Do not use headings only for visual styling.

## 13. Internal linking

Internal links help crawlers and users.

```html
<a href="/docs/http">HTTP and HTTPS</a>
```

Avoid important navigation that exists only through JavaScript unless there is a good reason.

## 14. Structured data

JSON-LD:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Title"
}
</script>
```

Structured data should describe content that is actually visible.

## 15. hreflang

For language versions:

```html
<link rel="alternate" hreflang="pl" href="https://example.com/pl/page">
<link rel="alternate" hreflang="en" href="https://example.com/en/page">
```

Reciprocal linking matters.

## 16. Core Web Vitals

Important metrics include LCP, INP and CLS. They are not the only performance metrics, but they are worth monitoring.

## 17. Mobile-first

The site should work correctly on mobile: layout, viewport, fonts, interactions and touch targets.

## 18. JavaScript and SEO

Modern crawlers can render JavaScript, but rendering may be more expensive and delayed. Important content should be available as directly as practical.

## 19. Pagination

For large sets:

```text
/page/1
/page/2
/page/3
```

Each page should have a normal URL and links.

## 20. Faceted navigation

Filters can generate huge numbers of URL combinations.

```text
?color=black
?color=black&size=m
?size=m&sort=price
```

Control indexing, canonicals, linking and crawl budget.

## 21. Open Graph

Not SEO in the strict sense, but important for sharing:

```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
```

## 22. Tools

Useful tools include Google Search Console, Bing Webmaster Tools, Lighthouse, PageSpeed Insights, Screaming Frog, curl and browser DevTools.

## 23. curl

Headers:

```bash
curl -I https://example.com
```

Redirects:

```bash
curl -IL https://example.com/old-url
```

## 24. Checklist

- HTTPS,
- correct status codes,
- canonical,
- robots.txt,
- sitemap,
- title,
- meta description,
- heading hierarchy,
- internal linking,
- mobile,
- Core Web Vitals,
- structured data,
- no accidental noindex.

## 25. What you should know

You should understand crawling and indexing, diagnose status codes and redirects, use canonical URLs, prepare robots.txt and sitemaps, check structured data basics and understand the impact of performance and mobile experience.
