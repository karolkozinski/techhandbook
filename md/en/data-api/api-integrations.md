---
id: "doc-008"
title: "APIs and System Integrations — Practical Handbook"
slug: "apis-and-system-integrations-practical-handbook"
description: "An API is an interface that lets one system communicate with another in a structured way."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "api"
  - "rest"
  - "json"
  - "webhook"
  - "oauth"
---

# APIs and System Integrations — Practical Handbook

## 1. API

An API is an interface that lets one system communicate with another in a structured way.

Typical examples:

- frontend talking to backend,
- your application calling a payment provider,
- monitoring software reading an external service,
- one internal system pushing data to another.

## 2. REST

REST-style APIs commonly use HTTP methods:

```text
GET     read
POST    create / trigger
PUT     replace
PATCH   partially update
DELETE  remove
```

Example:

```http
GET /api/users/123
```

## 3. JSON

Most modern web APIs exchange JSON.

Example:

```json
{
  "id": 123,
  "name": "Alice",
  "active": true
}
```

## 4. HTTP status codes

Important groups:

```text
2xx success
3xx redirect
4xx client-side problem
5xx server-side problem
```

Common codes:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
429 Too Many Requests
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
```

## 5. API key

Simple authentication may use an API key.

Example:

```http
X-API-Key: SECRET
```

Never hard-code production keys in source code.

## 6. Bearer token

Common header:

```http
Authorization: Bearer TOKEN
```

Tokens should be treated as secrets.

## 7. OAuth 2.0 — practical view

OAuth 2.0 is used when a client needs delegated access without handling a user's password directly.

Common flows:

- Authorization Code,
- Authorization Code + PKCE,
- Client Credentials.

For machine-to-machine integrations, Client Credentials is common.

## 8. Pagination

Large result sets are usually paginated.

Examples:

```http
?page=2&limit=100
```

or cursor-based:

```json
{
  "items": [...],
  "next_cursor": "abc123"
}
```

Cursor pagination is often better for large or changing datasets.

## 9. Filtering and sorting

Examples:

```http
?status=active
?sort=created_at
?order=desc
```

Do not assume parameter names are standardized between APIs.

## 10. Rate limits

APIs often limit request frequency.

Relevant headers may include:

```text
Retry-After
X-RateLimit-Limit
X-RateLimit-Remaining
```

Your integration should expect 429 responses.

## 11. Retry

Retry only when the operation is safe.

A common approach:

```text
attempt
→ failure
→ short delay
→ retry
→ longer delay
```

Use exponential backoff with jitter for larger systems.

Do not retry every 4xx response blindly.

## 12. Idempotency

An idempotent operation can be repeated without causing an additional side effect.

GET is normally idempotent.

Payments and creation APIs may support an idempotency key:

```http
Idempotency-Key: 123e4567
```

This prevents accidental duplicate operations.

## 13. Webhook

A webhook lets a remote service push an event to your endpoint.

Example:

```text
payment provider
→ POST /webhooks/payment
→ your application
```

## 14. Webhook verification

Do not trust webhook requests merely because they reached your endpoint.

Typical protections:

- HMAC signature,
- shared secret,
- timestamp,
- replay protection,
- allowlist where appropriate.

## 15. Polling

Polling means asking repeatedly:

```text
Has anything changed?
```

Example:

```text
every 10 minutes
→ GET /status
```

Polling is simple but less efficient than event-driven integrations.

## 16. curl

GET:

```bash
curl https://api.example.com/users
```

Headers:

```bash
curl   -H "Authorization: Bearer $TOKEN"   https://api.example.com/users
```

POST JSON:

```bash
curl   -X POST   -H "Content-Type: application/json"   -d '{"name":"Alice"}'   https://api.example.com/users
```

Show response headers:

```bash
curl -i https://api.example.com
```

Verbose mode:

```bash
curl -v https://api.example.com
```

## 17. jq

Read a JSON field:

```bash
curl -s https://api.example.com/user | jq '.name'
```

Pretty-print JSON:

```bash
jq . file.json
```

Filter array:

```bash
jq '.items[] | select(.active == true)' file.json
```

## 18. Postman / Bruno

GUI tools such as Postman or Bruno are useful for:

- manually testing APIs,
- storing collections,
- sending custom headers,
- inspecting responses,
- documenting example requests.

For repeatable automation, shell scripts or code are usually better.

## 19. API versioning

Common patterns:

```text
/api/v1/users
/api/v2/users
```

or version headers.

Do not assume breaking changes will be backward compatible.

## 20. Timeout

Always set reasonable timeouts in production integrations.

A request that can hang forever is a reliability bug.

Think separately about:

- connection timeout,
- request/response timeout,
- total operation timeout.

## 21. Integration pattern

A good integration often looks like:

```text
validate config
→ authenticate
→ send request
→ check status code
→ parse response
→ handle pagination
→ retry selected failures
→ log result
```

## 22. Error-resistant integration

Use:

- explicit timeouts,
- structured logging,
- retry only where justified,
- idempotency,
- validation,
- secret management,
- metrics,
- dead-letter/error handling for asynchronous systems.

## 23. What you should know

You should understand:

- HTTP methods,
- status codes,
- JSON,
- API keys and bearer tokens,
- OAuth basics,
- pagination,
- rate limits,
- retries,
- idempotency,
- webhooks,
- curl,
- jq,
- timeouts.

The key rule: treat every external API as a system that can fail, slow down, change or return unexpected data.
