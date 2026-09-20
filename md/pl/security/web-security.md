---
id: "doc-026"
title: "Bezpieczeństwo aplikacji webowych"
slug: "bezpieczenstwo-aplikacji-webowych"
description: "Nie chodzi o pentesting. Chodzi o to, żeby nie wprowadzać typowych podatności do własnych aplikacji."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "web"
  - "security"
  - "owasp"
  - "xss"
  - "csrf"
  - "sql injection"
---

# Bezpieczeństwo aplikacji webowych

Bezpieczeństwo aplikacji webowej nie sprowadza się do jednego skanera. Najważniejsze są poprawne granice zaufania, kontrola dostępu, bezpieczne przetwarzanie danych wejściowych, zarządzanie sesją i sekretami oraz aktualne zależności.

Powiązane tematy: [Cybersecurity i pentesting - podstawy](techhandbook:doc-024), [OAuth 2.0, OpenID Connect, JWT i sesje](techhandbook:doc-051), [HTTP, HTTPS i TLS](techhandbook:doc-044), [API i integracje systemów](techhandbook:doc-008) oraz [SQL i PostgreSQL](techhandbook:doc-010).

## 1. Cel

Nie chodzi o pentesting. Chodzi o to, żeby nie wprowadzać typowych podatności do własnych aplikacji.

## 2. Zasada podstawowa

Nigdy nie ufaj danym wejściowym.

Źródła danych:
- formularze,
- query params,
- headers,
- cookies,
- API,
- uploady,
- webhooki.

## 3. XSS

Niebezpieczeństwo:

```html
<div>{{ user_input }}</div>
```

jeśli framework/renderowanie nie escapuje danych.

Atakujący próbuje wstrzyknąć JavaScript.

Ochrona:
- escaping,
- frameworkowe mechanizmy templatingu,
- CSP,
- unikanie `innerHTML`.

## 4. SQL Injection

Źle:

```text
"SELECT * FROM users WHERE email = '" + email + "'"
```

Dobrze:
- parametryzowane zapytania,
- prepared statements.

## 5. CSRF

Atak wykorzystuje sesję zalogowanego użytkownika do wykonania operacji.

Ochrona:
- CSRF token,
- `SameSite` cookies,
- weryfikacja origin/referer tam, gdzie ma sens.

## 6. Authentication

Hasła:
- nie przechowuj plaintext,
- używaj Argon2id/bcrypt/scrypt zgodnie z bibliotekami,
- MFA, jeśli potrzebne.

Nie implementuj własnego algorytmu hashowania.

## 7. Authorization

Uwierzytelnienie:

```text
kim jesteś?
```

Autoryzacja:

```text
czy wolno ci wykonać tę operację?
```

Sprawdzaj uprawnienia po stronie backendu.

## 8. IDOR

Nie wystarczy:

```text
GET /invoice/123
```

Backend musi sprawdzić, czy użytkownik ma dostęp do faktury 123.

## 9. Secrets

Nigdy w repo:

```text
API keys
passwords
private keys
tokens
```

Używaj:
- env,
- secret managera,
- secrets GitHub Actions.

## 10. SSRF

Backend pobiera URL podany przez użytkownika.

Atakujący może próbować uzyskać dostęp do:

```text
localhost
169.254.169.254
wewnętrznych usług
```

Waliduj cele i ograniczaj dostęp sieciowy.

## 11. File upload

Sprawdzaj:
- rozmiar,
- rozszerzenie,
- MIME,
- nazwę,
- miejsce zapisu.

Nie wykonuj przesłanych plików.

## 12. Path traversal

Nie buduj ścieżki bez walidacji:

```text
/download?file=../../etc/passwd
```

## 13. CORS

CORS nie jest systemem autoryzacji.

Nie ustawiaj bezmyślnie:

```text
Access-Control-Allow-Origin: *
```

dla endpointów wymagających ciasnych ograniczeń.

## 14. Cookies

Dla sesji:

```text
HttpOnly
Secure
SameSite
```

## 15. Security headers

Przydatne:

```text
Content-Security-Policy
Strict-Transport-Security
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
```

## 16. Dependencies

Aktualizuj biblioteki.

Node:

```bash
npm audit
```

Go:

```bash
govulncheck ./...
```

Nie aktualizuj produkcji w ciemno - testuj.

## 17. Least privilege

Proces aplikacji nie powinien działać jako root, jeśli nie musi.

Baza:
- osobny użytkownik aplikacyjny,
- tylko potrzebne uprawnienia.

## 18. HTTPS

Wszystkie loginy, tokeny i sesje powinny iść przez HTTPS.

## 19. Logging

Loguj:
- błędy,
- ważne operacje,
- podejrzane próby.

Nie loguj:
- haseł,
- pełnych tokenów,
- danych, których nie potrzebujesz.

## 20. Rate limiting

Chroni m.in. przed:
- brute force,
- nadużyciem API.

## 21. Error handling

Nie zwracaj produkcyjnie:
- stack trace,
- sekretów,
- connection stringów.

Użytkownik:

```json
{"error":"Internal server error"}
```

Szczegóły trafiają do logu.

## 22. OWASP Top 10

Aktualnym punktem odniesienia jest OWASP Top 10:2025. Ważniejsze od zapamiętania nazw kategorii jest wdrażanie kontroli, które ograniczają odpowiadające im ryzyka.

## 23. Checklist przed publikacją

- HTTPS,
- brak sekretów w repo,
- poprawna autoryzacja,
- parametryzowane SQL,
- bezpieczne cookies,
- limit uploadów,
- aktualne dependencies,
- minimalne uprawnienia,
- logowanie błędów,
- backup,
- firewall.

## 24. Co trzeba umieć

- rozpoznawać XSS, SQLi, CSRF, SSRF,
- rozumieć auth vs authorization,
- bezpiecznie przechowywać sekrety,
- zabezpieczać cookies i uploady,
- stosować zasadę najmniejszych uprawnień.

## Oficjalne źródła

- OWASP Top 10:2025: https://top10.owasp.org/2025/
- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
