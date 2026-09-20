---
id: "doc-053"
title: "Web Analytics and Tagging — Practical Handbook"
slug: "web-analytics-and-tagging-practical-handbook"
description: "Web analytics should answer concrete business and product questions."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "analytics"
  - "tagging"
  - "ga4"
  - "gtm"
  - "datalayer"
  - "utm"
---

# Web Analytics and Tagging — Practical Handbook

## 1. Purpose of analytics

Web analytics should answer concrete business and product questions.

Typical goals:

- understand traffic sources,
- measure user behavior,
- measure conversions,
- find funnel drop-offs,
- compare campaigns,
- validate experiments,
- monitor data quality.

Do not track everything just because you can. Track what supports a decision.

## 2. Page view

A page view records that a page was displayed.

Typical fields:

```text
page_location
page_title
page_referrer
timestamp
user/session context
```

In traditional multi-page sites, page views usually happen on navigation.

In SPAs, page-view events may need to be sent manually when routes change.

## 3. Event

An event represents an action or state change.

Examples:

```text
product_view
add_to_cart
form_submit
download
video_start
login
purchase
```

## 4. Good event name

Use names that are:

- short,
- descriptive,
- stable,
- consistently formatted.

Prefer:

```text
form_submit
product_view
cta_click
```

Avoid ambiguous names such as:

```text
click1
event_new
button_test
```

## 5. Event schema

Define what each event contains.

Example:

```json
{
  "event": "product_view",
  "product_id": "ABC123",
  "category": "laptop",
  "price": 4999,
  "currency": "PLN"
}
```

Document required and optional fields.

## 6. dataLayer

A data layer separates application data from analytics tools.

Example:

```js
window.dataLayer = window.dataLayer || [];

window.dataLayer.push({
  event: "purchase",
  transaction_id: "T123",
  value: 499.99,
  currency: "PLN"
});
```

The website emits structured events; the tag manager decides what to send where.

## 7. Tag manager

A tag manager lets teams manage analytics and marketing tags without hard-coding each integration directly into the application.

Typical concepts:

- tags,
- triggers,
- variables,
- containers,
- environments.

Keep governance strict. A tag manager can execute code in the browser.

## 8. GA4 — event model

Google Analytics 4 uses an event-oriented data model.

Important concepts include:

- events,
- event parameters,
- user properties,
- conversions/key events,
- sessions.

Do not invent a new naming convention for every campaign or page.

## 9. UTM parameters

Typical UTM parameters:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

Example:

```text
https://example.com/?utm_source=newsletter&utm_medium=email&utm_campaign=autumn_sale
```

## 10. Consistent UTM naming

Choose conventions once.

For example:

```text
source: newsletter, facebook, linkedin
medium: email, paid_social, organic_social
campaign: autumn_sale_2026
```

Avoid mixing:

```text
FB
facebook
Facebook
facebook.com
```

## 11. Source / Medium

Source identifies where traffic came from.

Medium identifies the channel type.

Example:

```text
source = linkedin
medium = paid_social
```

## 12. Campaign

Campaign should represent the marketing initiative, not the individual creative asset.

Creative-level differentiation belongs in `utm_content` where appropriate.

## 13. Conversion

A conversion is an event important enough to represent business or product success.

Examples:

- purchase,
- lead submission,
- account creation,
- subscription.

Define conversions explicitly.

## 14. Funnel

A funnel is a sequence of steps.

Example:

```text
landing page
→ product view
→ add to cart
→ checkout
→ purchase
```

Measure both completion and drop-off.

## 15. Attribution

Attribution assigns credit for a conversion to touchpoints.

There is no universally perfect attribution model.

Treat attribution as a model, not an objective truth.

## 16. First click / last click

First click:
credits the first known touchpoint.

Last click:
credits the final touchpoint before conversion.

Each answers a different question.

## 17. Consent

Analytics and advertising tracking may require user consent depending on jurisdiction and implementation.

Your tracking architecture should respect consent state before firing restricted tags.

## 18. PII

Do not send personally identifiable information into analytics tools unless explicitly permitted and required.

Avoid fields such as:

- email addresses,
- phone numbers,
- names,
- raw form contents.

## 19. Debugging

Use:

- browser DevTools,
- network requests,
- tag-manager preview/debug mode,
- analytics debug views,
- console logging in development.

Verify both the event and its parameters.

## 20. Duplicate events

Common causes:

- handler registered twice,
- SPA route event + automatic pageview,
- both frontend and backend sending the same conversion,
- tag firing on multiple triggers.

Duplicates corrupt reporting.

## 21. SPA

Single-page applications require explicit route-change tracking.

Watch for:

- virtual page views,
- route timing,
- duplicate initialization,
- stale page metadata.

## 22. Server-side tracking

Server-side tracking can improve control and reliability.

Possible flow:

```text
browser
→ your backend
→ analytics/marketing endpoint
```

It does not automatically remove consent/privacy obligations.

## 23. Data quality

Monitor:

- missing events,
- duplicates,
- invalid parameters,
- sudden volume changes,
- broken campaign tagging,
- impossible funnel transitions.

Analytics without data quality checks becomes misleading quickly.

## 24. Tracking-plan documentation

A tracking plan should include:

```text
event name
purpose
trigger
parameters
required/optional fields
data source
destination
owner
```

## 25. Minimal workflow

```text
define business question
→ define event
→ define schema
→ implement
→ test in browser
→ verify destination
→ document
→ monitor quality
```

## 26. What you should know

You should understand:

- page views,
- events,
- event schemas,
- dataLayer,
- tag managers,
- GA4 event logic,
- UTM parameters,
- attribution,
- consent,
- PII,
- SPA tracking,
- server-side tracking,
- debugging,
- data-quality monitoring.

The key rule: analytics is only useful when event definitions are stable, documented and trusted.
