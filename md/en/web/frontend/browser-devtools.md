---
id: "doc-046"
title: "Browser DevTools - Practical Handbook"
slug: "browser-devtools-practical-handbook"
description: "Browser developer tools are among the most important tools for working with web applications. They let you diagnose problems instead of guessing."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "devtools"
  - "browser"
  - "network"
  - "console"
  - "debug"
---

# Browser DevTools - Practical Handbook

DevTools replace guessing with observation: inspect the DOM, computed styles, network requests, storage, JavaScript execution and performance traces. Panel names differ between browsers, but the diagnostic workflow is similar.

Related topics: [Modern HTML and CSS](techhandbook:doc-042), [JavaScript](techhandbook:doc-021), [HTTP, HTTPS and TLS](techhandbook:doc-044), [Web Performance](techhandbook:doc-048) and [UX and Accessibility](techhandbook:doc-043).

## 1. Why DevTools matter

Browser developer tools are among the most important tools for working with web applications. They let you diagnose problems instead of guessing.

Common areas:

- Elements / Inspector,
- Console,
- Network,
- Sources,
- Application / Storage,
- Performance,
- Lighthouse,
- Accessibility.

## 2. Opening DevTools

Common shortcuts:

```text
F12
Ctrl+Shift+I
Ctrl+Shift+J  Console
Ctrl+Shift+C  select element
```

On macOS, Cmd is commonly used instead of Ctrl.

## 3. Elements / Inspector

The panel shows the current DOM and applied CSS styles.

You can edit HTML live, enable and disable CSS rules, inspect the box model, inheritance and computed styles, and test pseudo-classes.

### Box model

```text
margin
border
padding
content
```

When an element has the wrong size, inspect width, height, padding, border and box-sizing.

## 4. Computed styles

Computed styles show final property values after cascade, specificity, inheritance and media queries.

Use this view when CSS behaves differently than expected.

## 5. Responsive mode

DevTools can emulate mobile viewports. Check width, height, orientation, DPR, touch support and network throttling.

Emulation does not replace real-device testing, but it finds many issues quickly.

## 6. Console

Use Console for JavaScript errors, warnings, logs, running code and inspecting objects.

```js
console.log("test");
console.table(data);
console.error(error);
```

Useful objects:

```js
document.querySelector("selector")
localStorage
location
navigator
```

## 7. Network

Network shows all requests made by the page.

Important columns include Name, Status, Type, Size, Time and Initiator.

Useful filters include Fetch/XHR, JS, CSS, Img, Doc and Font.

## 8. Analysing a request

Check Headers for URL, method, status and request/response headers.

Payload shows POST/PUT/PATCH data.

Response shows the returned content.

Timing breaks the request into DNS, connection, TLS, TTFB and download time.

## 9. Disable cache

While DevTools is open, Network can disable cache. This is useful for diagnosing stale CSS, JavaScript and images.

## 10. Throttling

You can emulate slower network and CPU conditions, including Fast 3G, Slow 3G and offline mode.

## 11. Preserve log

Preserve log keeps requests across reloads, redirects and navigation. It is useful for authentication and OAuth flows.

## 12. Copy as cURL

```text
Network → request → Copy → Copy as cURL
```

This gives you a request that can be replayed in a terminal.

## 13. Sources

Sources lets you inspect JavaScript, add breakpoints, execute code step by step and inspect the call stack.

## 14. Breakpoints

Typical workflow:

1. set a breakpoint,
2. perform the action,
3. let execution pause,
4. inspect values,
5. step through the code.

Important operations include step over, step into, step out and resume.

## 15. Event listener breakpoints

You can pause on click, submit, keyboard, timer and XHR/fetch events. This is especially useful in unfamiliar codebases.

## 16. Application / Storage

Inspect cookies, localStorage, sessionStorage, IndexedDB, service workers and Cache Storage.

## 17. Cookies

Check Name, Domain, Path, Expires, HttpOnly, Secure and SameSite. This helps diagnose sessions and authentication.

## 18. LocalStorage and sessionStorage

You can inspect, edit, remove and clear values manually.

Do not store secrets in localStorage just because it is convenient.

## 19. Performance

Performance recordings show long tasks, scripting, rendering, layout, paint and network activity.

Look for long main-thread blocks, repeated layout work and heavy JavaScript.

## 20. Lighthouse

Lighthouse audits Performance, Accessibility, Best Practices and SEO.

The score is a hint, not absolute truth. Understand the specific recommendation.

## 21. Accessibility

DevTools can inspect roles, accessible names, contrast, focus and ARIA.

For forms, verify that every input has a correct accessible name.

## 22. Device emulation

You can emulate viewport, touch, geolocation, user agent and network conditions.

Do not assume emulation exactly matches a real phone.

## 23. Screenshots

DevTools can capture viewport, full-page and selected-element screenshots.

## 24. Useful debugging workflow

When “the page does not work”:

1. Console - JavaScript errors.
2. Network - 4xx/5xx requests.
3. Elements - DOM and CSS.
4. Storage - session and cookies.
5. Performance - if the issue is speed.

## 25. What you should know

You should be able to inspect CSS and DOM, find Console errors, analyse requests, replay a request with cURL, use breakpoints, inspect cookies/storage, use throttling and run a basic Lighthouse audit.

## Official references

- Chrome DevTools: https://developer.chrome.com/docs/devtools/
- Firefox Developer Tools: https://firefox-source-docs.mozilla.org/devtools-user/
