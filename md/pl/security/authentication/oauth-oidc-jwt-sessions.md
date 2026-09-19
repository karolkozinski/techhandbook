# oauth-oidc-jwt-sessions

## 1. Najpierw pojęcia

Authentication:

```text
kim jesteś?
```

Authorization:

```text
co wolno ci zrobić?
```

OAuth 2.0 dotyczy głównie delegowania autoryzacji.

OpenID Connect dodaje warstwę uwierzytelnienia.

JWT jest formatem tokenu.

Sesja jest sposobem utrzymywania stanu zalogowania.

To nie są zamienne pojęcia.

## 2. Klasyczna sesja

Flow:

```text
login
↓
backend sprawdza dane
↓
backend tworzy session ID
↓
browser dostaje cookie
↓
kolejne requesty zawierają cookie
```

Serwer przechowuje stan sesji.

## 3. Cookie sesyjne

Przykład:

```http
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax
```

Ważne flagi:

- HttpOnly,
- Secure,
- SameSite.

## 4. Session fixation

Po poprawnym logowaniu warto wygenerować nowe session ID.

Nie należy zachowywać identyfikatora, który istniał przed uwierzytelnieniem.

## 5. Session expiry

Sesja powinna mieć:

- idle timeout,
- absolute timeout,
- możliwość unieważnienia.

## 6. CSRF

Przy auth opartym na cookies przeglądarka automatycznie wysyła cookie.

To jest jeden z powodów, dla których trzeba myśleć o CSRF.

Ochrona:

- SameSite,
- token CSRF,
- walidacja Origin w odpowiednich miejscach.

## 7. JWT

JWT wygląda zwykle:

```text
header.payload.signature
```

To trzy fragmenty zakodowane Base64URL.

## 8. JWT nie jest szyfrowany domyślnie

Payload można odczytać.

Nie wkładaj tam sekretów.

Podpis zapewnia integralność i autentyczność, nie poufność.

## 9. Typowe claims

```text
iss  issuer
sub  subject
aud  audience
exp  expiration
iat  issued at
nbf  not before
```

## 10. Weryfikacja JWT

Nie wystarczy zdekodować token.

Trzeba sprawdzić:

- podpis,
- algorytm,
- issuer,
- audience,
- expiration,
- inne wymagane claims.

## 11. Access token

Access token służy do dostępu do API.

Powinien być:

- krótko żyjący,
- ograniczony zakresem,
- przeznaczony dla konkretnego resource servera.

## 12. Refresh token

Pozwala uzyskać nowy access token.

Jest bardziej wrażliwy, bo zwykle żyje dłużej.

Powinien być dobrze chroniony.

## 13. OAuth 2.0 — role

Najczęściej:

- Resource Owner,
- Client,
- Authorization Server,
- Resource Server.

## 14. Authorization Code Flow

Typowy flow webowy:

```text
browser → authorization server
      ← login/consent
      ← authorization code
backend → token endpoint
backend ← access token
```

## 15. PKCE

PKCE chroni Authorization Code Flow przed przejęciem kodu.

W praktyce jest standardem szczególnie dla klientów publicznych.

Elementy:

```text
code_verifier
code_challenge
```

## 16. Redirect URI

Redirect URI musi być kontrolowane i ściśle walidowane.

Luźne wildcardy mogą prowadzić do przejęcia kodu.

## 17. state

Parametr `state` pomaga powiązać odpowiedź z rozpoczętą sesją autoryzacji i chronić przed częścią ataków CSRF.

## 18. OpenID Connect

OIDC działa na OAuth 2.0 i dodaje tożsamość.

Najważniejszy element:

```text
ID Token
```

## 19. ID Token a Access Token

ID Token:

```text
informacja o uwierzytelnieniu użytkownika
```

Access Token:

```text
dostęp do API
```

Nie używaj ID Token jako access tokenu do API.

## 20. nonce

W OIDC `nonce` pomaga powiązać ID Token z rozpoczętym flow i ograniczać replay.

## 21. Scopes

Przykłady:

```text
openid
profile
email
read:orders
write:orders
```

Dawaj minimalny potrzebny zakres.

## 22. Client secret

Client secret jest sekretem tylko wtedy, gdy klient potrafi go faktycznie ukryć.

Aplikacja działająca w przeglądarce nie może bezpiecznie przechowywać stałego sekretu.

## 23. SPA

Dla aplikacji browserowych typowe podejście:

- Authorization Code + PKCE,
- bez client secret w frontendzie.

## 24. BFF

Backend for Frontend może przejąć obsługę tokenów po stronie serwera.

Browser dostaje klasyczną sesję/cookie.

To często upraszcza bezpieczeństwo frontendu.

## 25. Token storage

Unikaj automatycznej odpowiedzi:

```text
wrzuć wszystko do localStorage
```

Ryzyko XSS jest wtedy szczególnie istotne.

Wybór storage zależy od architektury.

## 26. Token revocation

Tokeny powinny mieć strategię:

- expiration,
- revocation,
- rotation.

## 27. Refresh token rotation

Po użyciu refresh tokenu serwer może wydać nowy i unieważnić poprzedni.

Pomaga wykrywać replay.

## 28. JWKS

Serwer może publikować klucze publiczne:

```text
/.well-known/jwks.json
```

Klient wykorzystuje je do weryfikacji podpisów.

## 29. Discovery

OIDC:

```text
/.well-known/openid-configuration
```

Dokument opisuje endpointy i możliwości dostawcy.

## 30. Najczęstsze błędy

- brak weryfikacji `aud`,
- akceptowanie dowolnego `iss`,
- zbyt długie tokeny,
- tokeny w URL,
- sekrety w frontendzie,
- brak PKCE,
- źle walidowane redirect URI,
- mylenie ID Token z Access Token,
- brak rotacji refresh tokenów.

## 31. Kiedy sesja, kiedy token

Klasyczna aplikacja webowa:

```text
session cookie
```

Rozproszone API / integracje:

```text
access token
```

Nie wybieraj JWT tylko dlatego, że brzmi nowocześnie.

## 32. Co trzeba umieć

- odróżnić authn od authz,
- rozumieć cookie session,
- rozumieć JWT,
- znać Authorization Code + PKCE,
- odróżnić ID Token i Access Token,
- rozumieć scopes,
- bezpiecznie myśleć o storage i expiration.
