# technical-seo

## 1. Czym jest Technical SEO

Technical SEO obejmuje techniczne elementy wpływające na możliwość:

- znalezienia strony przez crawler,
- zaindeksowania treści,
- poprawnego zrozumienia struktury,
- wyboru właściwego URL,
- oceny wydajności i jakości strony.

Nie zastępuje treści ani linków, ale może sprawić, że dobra treść nie będzie poprawnie widoczna.

## 2. Crawling i indexing

Crawler:

```text
odkrywa URL
pobiera dokument
analizuje linki
odkrywa kolejne URL
```

Indexing:

```text
analiza treści
wybór wersji kanonicznej
zapis informacji w indeksie
```

Strona może być crawlable, ale nieindexed.

## 3. robots.txt

Typowy plik:

```text
User-agent: *
Disallow:

Sitemap: https://example.com/sitemap.xml
```

Blokada:

```text
Disallow: /admin/
```

`robots.txt` nie jest mechanizmem bezpieczeństwa.

## 4. meta robots

Przykład:

```html
<meta name="robots" content="noindex, follow">
```

Najczęściej:

- index,
- noindex,
- follow,
- nofollow.

## 5. Sitemap XML

Przykład:

```xml
<url>
  <loc>https://example.com/article</loc>
  <lastmod>2026-09-19</lastmod>
</url>
```

Sitemap pomaga w odkrywaniu URL, ale nie gwarantuje indeksacji.

## 6. Canonical

```html
<link rel="canonical" href="https://example.com/product">
```

Canonical wskazuje preferowaną wersję URL.

Typowe duplikaty:

```text
/product
/product?source=campaign
/product?sort=price
```

## 7. Redirecty

### 301

Stałe przekierowanie.

### 302 / 307

Tymczasowe.

Unikaj łańcuchów:

```text
A → B → C → D
```

Lepiej:

```text
A → D
```

## 8. Statusy HTTP

Dla SEO ważne są szczególnie:

```text
200 OK
301 Permanent Redirect
404 Not Found
410 Gone
5xx Server Error
```

Soft 404 to strona zwracająca 200, mimo że treść faktycznie nie istnieje.

## 9. HTTPS

Strona powinna być dostępna przez jedną spójną wersję HTTPS.

Unikaj równoległego indeksowania:

```text
http://
https://
www
bez www
```

Wybierz wersję docelową i przekieruj pozostałe.

## 10. Title

```html
<title>Opis strony</title>
```

Powinien być:

- unikalny,
- opisowy,
- zgodny z zawartością.

## 11. Meta description

```html
<meta name="description" content="Krótki opis strony">
```

Nie jest bezpośrednim sygnałem rankingowym, ale może wpływać na sposób prezentacji wyniku.

## 12. Nagłówki

Dobra struktura:

```text
H1
 ├─ H2
 │   ├─ H3
 │   └─ H3
 └─ H2
```

Nie używaj headingów wyłącznie do stylowania.

## 13. Internal linking

Linkowanie wewnętrzne pomaga crawlerom i użytkownikom.

Dobre linki:

```html
<a href="/docs/http">HTTP i HTTPS</a>
```

Unikaj ważnej nawigacji dostępnej wyłącznie po JS, jeśli nie ma dobrego powodu.

## 14. Structured data

JSON-LD:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Tytuł"
}
</script>
```

Structured data powinno opisywać faktycznie widoczną treść.

## 15. hreflang

Dla wersji językowych:

```html
<link rel="alternate" hreflang="pl" href="https://example.com/pl/page">
<link rel="alternate" hreflang="en" href="https://example.com/en/page">
```

Ważna jest wzajemność linków.

## 16. Core Web Vitals

Najważniejsze:

- LCP — Largest Contentful Paint,
- INP — Interaction to Next Paint,
- CLS — Cumulative Layout Shift.

To nie są jedyne metryki wydajności, ale warto je monitorować.

## 17. Mobile-first

Projekt powinien poprawnie działać na mobilkach:

- layout,
- viewport,
- font,
- interakcje,
- touch targets.

## 18. JavaScript i SEO

Nowoczesne crawlery potrafią renderować JS, ale renderowanie może być droższe i opóźnione.

Ważna treść powinna być dostępna możliwie prosto.

## 19. Pagination

Dla dużych zbiorów:

```text
/page/1
/page/2
/page/3
```

Każda strona powinna mieć normalny URL i linkowanie.

## 20. Faceted navigation

Filtrowanie może wygenerować ogromną liczbę kombinacji URL.

Przykład:

```text
?color=black
?color=black&size=m
?size=m&sort=price
```

Trzeba kontrolować:

- indeksację,
- canonical,
- linkowanie,
- crawl budget.

## 21. Open Graph

Nie jest SEO w ścisłym sensie, ale wpływa na udostępnianie:

```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
```

## 22. Narzędzia

Przydatne:

- Google Search Console,
- Bing Webmaster Tools,
- Lighthouse,
- PageSpeed Insights,
- Screaming Frog,
- curl,
- browser DevTools.

## 23. curl

Nagłówki:

```bash
curl -I https://example.com
```

Redirecty:

```bash
curl -IL https://example.com/old-url
```

## 24. Checklista

- HTTPS,
- poprawne statusy,
- canonical,
- robots.txt,
- sitemap,
- title,
- meta description,
- struktura nagłówków,
- linkowanie wewnętrzne,
- mobile,
- CWV,
- structured data,
- brak przypadkowego noindex.

## 25. Co trzeba umieć

- rozumieć crawling i indexing,
- diagnozować statusy i redirecty,
- używać canonical,
- przygotować robots.txt i sitemap,
- sprawdzać podstawy structured data,
- rozumieć wpływ wydajności i mobile.
