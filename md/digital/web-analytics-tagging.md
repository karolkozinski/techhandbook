# Web analytics i tagging — kompendium praktyczne

## 1. Cel analityki

Analityka powinna odpowiadać na konkretne pytania.

Przykłady:

- skąd przychodzą użytkownicy?
- jakie treści oglądają?
- gdzie odpadają?
- które działania prowadzą do konwersji?
- czy zmiana poprawiła wynik?

Nie zbieraj danych tylko dlatego, że można.

## 2. Page view

Najprostsze zdarzenie:

```text
page_view
```

W klasycznej stronie następuje przy załadowaniu dokumentu.

W SPA trzeba uważać na zmiany routingu bez pełnego reloadu.

## 3. Event

Przykładowy event:

```text
download_document
```

Parametry:

```text
document_name
category
source
```

## 4. Dobra nazwa eventu

Dobrze:

```text
signup_completed
search_performed
product_added_to_cart
```

Słabo:

```text
click1
button
event_new
```

## 5. Event schema

Przed implementacją ustal kontrakt.

Przykład:

```json
{
  "event": "search_performed",
  "query": "dns",
  "results_count": 4
}
```

## 6. dataLayer

Popularny wzorzec:

```js
window.dataLayer = window.dataLayer || [];

window.dataLayer.push({
  event: "search_performed",
  query: "dns"
});
```

Warstwa danych oddziela aplikację od konkretnego systemu analitycznego.

## 7. Tag manager

Tag manager pozwala konfigurować:

- tagi,
- triggers,
- variables.

Nie powinien zastępować porządnej architektury danych.

## 8. GA4 — model eventowy

GA4 opiera się na eventach.

W praktyce warto myśleć:

```text
zdarzenie
+ parametry
+ użytkownik/sesja
```

## 9. UTM

Typowe parametry:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

Przykład:

```text
?utm_source=newsletter&utm_medium=email&utm_campaign=autumn
```

## 10. Konsekwentne nazewnictwo UTM

Nie mieszaj:

```text
Email
email
e-mail
Newsletter
```

Jeśli oznaczają to samo, analityka będzie rozbita.

## 11. Source / Medium

Source:

```text
skąd
```

Medium:

```text
jakim kanałem
```

Przykład:

```text
source = newsletter
medium = email
```

## 12. Campaign

Nazwa kampanii powinna być:

- przewidywalna,
- stabilna,
- bez przypadkowej wariacji.

## 13. Conversion

Konwersja to biznesowo istotne zdarzenie.

Nie każde kliknięcie jest konwersją.

Przykłady:

- purchase,
- qualified_lead,
- signup_completed.

## 14. Funnel

Przykład:

```text
landing
→ product
→ cart
→ checkout
→ purchase
```

Analizuj miejsca największego odpływu.

## 15. Attribution

Attribution odpowiada na pytanie:

```text
który kanał otrzyma zasługę za konwersję?
```

To model analityczny, nie obiektywna prawda.

## 16. First click / last click

First click:
- kredyt dla pierwszego kontaktu.

Last click:
- kredyt dla ostatniego.

Każdy model pokazuje inny fragment rzeczywistości.

## 17. Consent

Tracking powinien uwzględniać:

- obowiązujące przepisy,
- consent,
- politykę prywatności,
- minimalizację danych.

Nie implementuj zgody jako pozornego popupu bez wpływu na tracking.

## 18. PII

Unikaj wysyłania do analityki danych osobowych, których system nie powinien otrzymywać.

Szczególnie:

- email,
- telefon,
- imię i nazwisko,
- dane formularzy.

## 19. Debugowanie

Sprawdzaj:

- DevTools Network,
- dataLayer,
- tryby preview/debug,
- payload requestu.

## 20. Duplicate events

Typowy błąd:

```text
click listener
+ tag manager
+ framework event
→ trzy razy ten sam event
```

Zawsze sprawdź liczbę wysłań.

## 21. SPA

Przy SPA kontroluj:

- route change,
- page title,
- virtual page view,
- duplicate tracking.

## 22. Server-side tracking

Może poprawić:

- kontrolę danych,
- niezawodność,
- integracje.

Nie rozwiązuje automatycznie problemów prawnych ani jakościowych.

## 23. Data quality

Regularnie sprawdzaj:

- nagły spadek/wzrost,
- brak eventów,
- zmienione nazwy,
- nowe parametry,
- duplikaty,
- nietypowe referral.

## 24. Dokumentacja tracking planu

Dobry tracking plan:

```text
event
kiedy
parametry
typ
przykład
właściciel
cel
```

## 25. Minimalny workflow

1. pytanie biznesowe,
2. event schema,
3. implementacja,
4. test w DevTools,
5. test w systemie analitycznym,
6. monitoring jakości danych.

## 26. Co trzeba umieć

- projektować eventy,
- rozumieć dataLayer,
- używać UTM,
- rozumieć funnel i attribution,
- debugować tracking,
- wykrywać duplikaty,
- myśleć o consent i minimalizacji danych.
