---
id: "doc-026"
title: "Web Application Security for Developers"
slug: "web-application-security-for-developers"
description: "This is not a pentesting course. The goal is to avoid introducing common vulnerabilities into your own applications."
lang: "en"
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

# Web Application Security for Developers

Web application security is not one scanner or one checklist. Trust boundaries, access control, safe input handling, session and secret management, and current dependencies matter most.

Related topics: [Cybersecurity and Pentesting Fundamentals](techhandbook:doc-024), [OAuth 2.0, OpenID Connect, JWT and Sessions](techhandbook:doc-051), [HTTP, HTTPS and TLS](techhandbook:doc-044), [APIs and System Integrations](techhandbook:doc-008) and [SQL and PostgreSQL](techhandbook:doc-010).

## 1. Goal

This is not a pentesting course. The goal is to avoid introducing common vulnerabilities into your own applications.

## 2. Basic rule

Never trust input.

Input sources include forms, query parameters, headers, cookies, APIs, uploads and webhooks.

## 3. XSS

Dangerous pattern:

```html
<div>{{ user_input }}</div>
```

if the rendering layer does not escape the value.

An attacker tries to inject JavaScript.

Protection:

- output escaping,
- safe framework templating,
- CSP,
- avoiding innerHTML where possible.

## 4. SQL Injection

Bad:

```text
"SELECT * FROM users WHERE email = '" + email + "'"
```

Good: parameterised queries and prepared statements.

## 5. CSRF

CSRF abuses the session of a logged-in user.

Protection can include CSRF tokens, SameSite cookies and Origin/Referer validation where appropriate.

## 6. Authentication

Passwords should never be stored as plaintext. Use established password-hashing libraries with algorithms such as Argon2id, bcrypt or scrypt.

Do not invent your own password hashing.

Use MFA where appropriate.

## 7. Authorization

Authentication asks who you are.

Authorization asks whether you are allowed to perform an operation.

Always enforce permissions on the backend.

## 8. IDOR

For a request such as:

```text
GET /invoice/123
```

the backend must verify that the current user is allowed to access invoice 123.

## 9. Secrets

Never commit API keys, passwords, private keys or tokens.

Use environment configuration, a secret manager or CI/CD secrets.

## 10. SSRF

If a backend fetches user-supplied URLs, attackers may try to reach localhost, metadata endpoints or internal services.

Validate destinations and restrict network access.

## 11. File upload

Validate size, extension, MIME type, file name and storage location.

Do not execute uploaded files.

## 12. Path traversal

Do not construct filesystem paths from unchecked input:

```text
/download?file=../../etc/passwd
```

## 13. CORS

CORS is not an authorization system.

Do not blindly use:

```text
Access-Control-Allow-Origin: *
```

where tight origin restrictions are required.

## 14. Cookies

For sessions, consider HttpOnly, Secure and SameSite.

## 15. Security headers

Useful headers include:

```text
Content-Security-Policy
Strict-Transport-Security
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
```

## 16. Dependencies

Keep libraries updated.

Node:

```bash
npm audit
```

Go:

```bash
govulncheck ./...
```

Do not update production blindly; test changes.

## 17. Least privilege

The application process should not run as root unless required.

Use a separate database user with only necessary permissions.

## 18. HTTPS

Logins, tokens and sessions should travel over HTTPS.

## 19. Logging

Log errors, important actions and suspicious attempts.

Do not log passwords, full tokens or unnecessary sensitive data.

## 20. Rate limiting

Useful against brute force and API abuse.

## 21. Error handling

Do not expose stack traces, secrets or connection strings in production responses.

User-facing response:

```json
{"error":"Internal server error"}
```

Detailed information belongs in logs.

## 22. OWASP Top 10

The current reference is OWASP Top 10:2025. Implementing controls that reduce the underlying risks matters more than memorising category names.

## 23. Pre-release checklist

- HTTPS,
- no secrets in the repository,
- correct authorization,
- parameterised SQL,
- secure cookies,
- upload limits,
- current dependencies,
- minimum privileges,
- error logging,
- backups,
- firewall.

## 24. What you should know

You should recognise XSS, SQL injection, CSRF and SSRF, understand authentication vs authorization, store secrets safely, protect cookies and uploads, and apply least privilege.

## Official references

- OWASP Top 10:2025: https://top10.owasp.org/2025/
- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
