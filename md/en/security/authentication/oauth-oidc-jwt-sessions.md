# OAuth 2.0, OpenID Connect, JWT and Sessions — Handbook

## 1. Concepts first

Authentication:

```text
who are you?
```

Authorization:

```text
what are you allowed to do?
```

OAuth 2.0 is mainly about delegated authorization.

OpenID Connect adds an authentication layer.

JWT is a token format.

A session is a way to maintain logged-in state.

These concepts are not interchangeable.

## 2. Classic session

```text
login
↓
backend verifies credentials
↓
backend creates session ID
↓
browser receives cookie
↓
later requests include cookie
```

The server stores session state.

## 3. Session cookie

```http
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax
```

Important flags: HttpOnly, Secure and SameSite.

## 4. Session fixation

After successful login, generate a new session ID. Do not keep the identifier that existed before authentication.

## 5. Session expiry

A session should have an idle timeout, absolute timeout and a revocation mechanism.

## 6. CSRF

With cookie-based authentication, browsers automatically send cookies. This is why CSRF protection matters.

Common protections include SameSite, CSRF tokens and Origin validation where appropriate.

## 7. JWT

JWT usually looks like:

```text
header.payload.signature
```

The three parts are Base64URL encoded.

## 8. JWT is not encrypted by default

The payload is readable. Do not put secrets in it.

A signature provides integrity and authenticity, not confidentiality.

## 9. Common claims

```text
iss  issuer
sub  subject
aud  audience
exp  expiration
iat  issued at
nbf  not before
```

## 10. JWT validation

Decoding is not enough. Validate the signature, algorithm, issuer, audience, expiration and any required claims.

## 11. Access token

Used to access an API. It should usually be short-lived, scope-limited and intended for a specific resource server.

## 12. Refresh token

Used to obtain a new access token. It usually lives longer and therefore requires stronger protection.

## 13. OAuth 2.0 roles

Common roles:

- Resource Owner,
- Client,
- Authorization Server,
- Resource Server.

## 14. Authorization Code Flow

```text
browser → authorization server
      ← login/consent
      ← authorization code
backend → token endpoint
backend ← access token
```

## 15. PKCE

PKCE protects Authorization Code Flow from code interception and is especially important for public clients.

```text
code_verifier
code_challenge
```

## 16. Redirect URI

Redirect URIs must be controlled and strictly validated. Loose wildcards can enable code theft.

## 17. state

The state parameter binds the response to the initiating authorization session and helps protect against some CSRF attacks.

## 18. OpenID Connect

OIDC builds on OAuth 2.0 and adds identity.

Key element:

```text
ID Token
```

## 19. ID Token vs Access Token

ID Token:

```text
information about user authentication
```

Access Token:

```text
access to an API
```

Do not use an ID Token as an API access token.

## 20. nonce

In OIDC, nonce helps bind an ID Token to an initiated flow and reduce replay risk.

## 21. Scopes

```text
openid
profile
email
read:orders
write:orders
```

Grant only the minimum necessary scope.

## 22. Client secret

A client secret is only secret if the client can actually hide it.

Browser applications cannot safely keep a fixed client secret.

## 23. SPA

Typical browser approach:

- Authorization Code + PKCE,
- no client secret in the frontend.

## 24. BFF

A Backend for Frontend can handle tokens server-side while the browser receives a classic session cookie.

This often simplifies frontend security.

## 25. Token storage

Do not automatically put everything in localStorage. XSS risk becomes especially important. Storage choice depends on the architecture.

## 26. Token revocation

Tokens need an expiration, revocation and rotation strategy.

## 27. Refresh token rotation

After use, a server can issue a new refresh token and invalidate the old one. This helps detect replay.

## 28. JWKS

A server may publish public keys at:

```text
/.well-known/jwks.json
```

Clients use them to verify signatures.

## 29. Discovery

OIDC metadata:

```text
/.well-known/openid-configuration
```

It describes provider endpoints and capabilities.

## 30. Common mistakes

- not validating aud,
- accepting arbitrary iss,
- excessively long-lived tokens,
- tokens in URLs,
- frontend secrets,
- missing PKCE,
- weak redirect URI validation,
- confusing ID Tokens with Access Tokens,
- no refresh-token rotation.

## 31. Session or token?

Classic web app:

```text
session cookie
```

Distributed APIs / integrations:

```text
access token
```

Do not choose JWT just because it sounds modern.

## 32. What you should know

You should distinguish authentication from authorization, understand cookie sessions and JWT, know Authorization Code + PKCE, distinguish ID Tokens and Access Tokens, understand scopes and reason safely about storage and expiration.
