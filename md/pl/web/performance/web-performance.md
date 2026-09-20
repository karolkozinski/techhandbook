---
id: "doc-048"
title: "Web Performance — kompendium"
slug: "web-performance-kompendium"
description: "Szybkość strony wpływa na:"
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "performance"
  - "cwv"
  - "lcp"
  - "inp"
  - "cls"
  - "cache"
  - "images"
---

# Web Performance — kompendium

Web performance warto optymalizować na podstawie pomiarów, a nie intuicji. Najpierw ustal, czy problem leży w sieci, backendzie, zasobach, JavaScriptcie czy renderowaniu, a dopiero potem zmieniaj kod.

Core Web Vitals obejmują obecnie LCP, INP i CLS. Progi "good" to LCP do 2,5 s, INP do 200 ms i CLS do 0,1, oceniane na 75. percentylu wizyt.

Powiązane tematy: [Browser DevTools](techhandbook:doc-046), [Nowoczesny HTML i CSS](techhandbook:doc-042), [JavaScript](techhandbook:doc-021), [HTTP, HTTPS i TLS](techhandbook:doc-044) oraz [Technical SEO](techhandbook:doc-047).

## 1. Cel

Szybkość strony wpływa na:

- UX,
- konwersję,
- dostępność,
- zużycie baterii i transferu,
- SEO.

Optymalizacja powinna być oparta na pomiarach.

## 2. Gdzie ginie czas

Uproszczony request:

```text
DNS
→ TCP
→ TLS
→ request
→ TTFB
→ download
→ parse
→ render
→ interakcja
```

## 3. TTFB

Time To First Byte mierzy czas do otrzymania pierwszych danych.

Wpływają na niego:

- sieć,
- backend,
- baza,
- cache,
- CDN.

## 4. Core Web Vitals

### LCP

Czas wyrenderowania największego ważnego elementu.

Typowe problemy:

- duży hero image,
- blokujący CSS,
- wolny backend.

### INP

Responsywność interakcji.

Typowe problemy:

- ciężki JS,
- long tasks,
- dużo pracy na main thread.

### CLS

Nieoczekiwane przesunięcia layoutu.

Typowe źródła:

- obrazy bez rozmiaru,
- późno ładowane fonty,
- reklamy/komponenty bez zarezerwowanego miejsca.

## 5. Obrazy

Najważniejsze zasady:

- właściwy format,
- właściwy rozmiar,
- responsive images,
- lazy loading.

Przykład:

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

## 6. Formaty

Najczęściej:

- JPEG — fotografie,
- PNG — przezroczystość / grafika,
- WebP — nowoczesny format,
- AVIF — bardzo dobra kompresja,
- SVG — wektory.

## 7. Lazy loading

```html
<img loading="lazy" ...>
```

Nie lazy-loaduj krytycznego obrazu LCP bez powodu.

## 8. CSS

Problemy:

- ogromne arkusze,
- nieużywany CSS,
- render blocking,
- zbyt dużo fontów.

Krytyczny CSS powinien być dostępny wcześnie.

## 9. JavaScript

JavaScript kosztuje:

- transfer,
- parse,
- compile,
- execute.

Najpierw usuń niepotrzebny JS.

## 10. async i defer

```html
<script src="app.js" defer></script>
```

`defer`:
- pobiera równolegle,
- wykonuje po parsowaniu HTML,
- zachowuje kolejność.

`async`:
- wykonuje po pobraniu,
- kolejność nie jest gwarantowana.

## 11. Code splitting

Nie wysyłaj użytkownikowi kodu, którego nie potrzebuje na tej stronie.

## 12. Cache

Przykład:

```http
Cache-Control: public, max-age=31536000, immutable
```

Dobre dla wersjonowanych assetów:

```text
app.abc123.js
style.def456.css
```

## 13. ETag

Pozwala sprawdzić, czy zasób się zmienił.

Przy poprawnym cache klient może dostać:

```text
304 Not Modified
```

## 14. Compression

Najczęściej:

- Brotli,
- gzip.

Tekstowe zasoby powinny być kompresowane.

## 15. CDN

CDN może:

- skrócić dystans,
- cache'ować,
- terminować TLS,
- chronić origin.

Nie naprawi jednak wolnego kodu front-endowego.

## 16. preconnect

```html
<link rel="preconnect" href="https://cdn.example.com">
```

Używaj dla ważnych zewnętrznych originów.

## 17. preload

```html
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin>
```

Preload powinien dotyczyć zasobów faktycznie krytycznych.

## 18. Fonty

Dobre praktyki:

- WOFF2,
- mało wariantów,
- subset,
- sensowny fallback,
- `font-display`.

```css
font-display: swap;
```

## 19. Layout thrashing

Kod może naprzemiennie czytać i modyfikować layout, powodując kosztowne reflow.

Lepiej grupować operacje.

## 20. Long tasks

Długie zadanie blokuje main thread.

W DevTools Performance szukaj szczególnie zadań > 50 ms.

## 21. Lighthouse

Daje wskazówki dotyczące:

- obrazów,
- JS,
- CSS,
- cache,
- render blocking.

Nie optymalizuj tylko pod wynik liczbowy.

## 22. Real User Monitoring

Lab i prawdziwi użytkownicy to dwie różne rzeczy.

RUM mierzy rzeczywiste doświadczenie użytkowników.

## 23. Budżet wydajności

Przykład:

```text
JS < 250 KB compressed
LCP <= 2.5 s
INP <= 200 ms
CLS <= 0.1
```

Budżet pomaga zapobiec stopniowemu pogarszaniu strony.

## 24. Kolejność optymalizacji

1. zmierz,
2. znajdź największy problem,
3. popraw,
4. zmierz ponownie,
5. dopiero potem przejdź dalej.

## 25. Co trzeba umieć

- rozumieć waterfall,
- diagnozować LCP/INP/CLS,
- optymalizować obrazy,
- używać cache i compression,
- ograniczać JS,
- interpretować Lighthouse,
- mierzyć przed i po zmianie.

## Oficjalne źródła

- Web Vitals: https://web.dev/articles/vitals
- Core Web Vitals thresholds: https://web.dev/articles/defining-core-web-vitals-thresholds
- Chrome DevTools Performance: https://developer.chrome.com/docs/devtools/performance/
