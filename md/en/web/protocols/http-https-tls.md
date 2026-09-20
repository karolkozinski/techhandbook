---
id: "doc-044"
title: "HTTP, HTTPS and TLS"
slug: "http-https-and-tls"
description: "A browser or application sends a request:"
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "http"
  - "https"
  - "tls"
  - "ssl"
---

# HTTP, HTTPS and TLS

HTTP defines application communication semantics, while TLS protects that communication cryptographically. In practice, understand requests and responses, status codes, headers, cookies, caching, certificates and the differences between HTTP/1.1, HTTP/2 and HTTP/3.

Related topics: [DNS, Domains and Internet Routing](techhandbook:doc-017), [APIs and System Integrations](techhandbook:doc-008), [nginx and Reverse Proxy](techhandbook:doc-045) and [Web Application Security](techhandbook:doc-026).

## 1. Client-server model

A browser or application sends a request:

```text
client → request → server
client ← response ← server
```

HTTP is an application protocol usually running over TCP; HTTP/3 runs over QUIC/UDP.

## 2. HTTP request

```http
GET /products/42 HTTP/1.1
Host: example.com
Accept: application/json
User-Agent: Mozilla/5.0
```

A request contains a method, path, protocol version, headers and optionally a body.

## 3. Methods

```text
GET     retrieve
POST    create/perform an operation
PUT     full update
PATCH   partial update
DELETE  remove
HEAD    like GET but without a body
OPTIONS describe capabilities
```

## 4. Status codes

### 2xx

```text
200 OK
201 Created
204 No Content
```

### 3xx

```text
301 Moved Permanently
302 Found
304 Not Modified
307 Temporary Redirect
308 Permanent Redirect
```

### 4xx

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
405 Method Not Allowed
409 Conflict
429 Too Many Requests
```

### 5xx

```text
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
```

## 5. Headers

Common headers include Content-Type, Content-Length, Authorization, Accept, Accept-Encoding, Cache-Control, ETag, Cookie, Set-Cookie, Location, Origin, Referer and User-Agent.

## 6. Content-Type

```text
text/html
text/css
application/javascript
application/json
image/png
image/webp
application/pdf
```

## 7. Cookies

Server:

```http
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax
```

Browser later sends:

```http
Cookie: session=abc123
```

Important flags: HttpOnly, Secure and SameSite.

## 8. Cache

```http
Cache-Control: public, max-age=3600
```

Validation headers include ETag, If-None-Match, Last-Modified and If-Modified-Since.

A valid cached response may result in:

```text
304 Not Modified
```

## 9. HTTPS

HTTPS is HTTP protected by TLS.

It provides confidentiality, integrity and server authentication.

## 10. Certificates

A certificate binds a domain name to a public key.

The usual chain includes the server certificate, intermediate certificates and a root CA trusted by the system/browser.

## 11. Let's Encrypt

Free TLS certificates.

On nginx, Certbot is commonly used:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
sudo certbot renew --dry-run
```

## 12. TLS handshake - simplified

1. client connects,
2. server presents the certificate,
3. client validates it,
4. session keys are negotiated,
5. further traffic is encrypted.

## 13. SNI

SNI allows one IP address to serve multiple HTTPS domains. During the TLS handshake, the client indicates which domain it wants.

## 14. CORS

CORS controls access by scripts from other origins.

An origin is:

```text
scheme + host + port
```

These are different origins:

```text
https://app.example.com
https://api.example.com
```

Example headers:

```http
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST
```

## 15. Preflight

The browser may first send:

```http
OPTIONS /api/resource
```

and only send the real request after approval.

## 16. Compression

Common encodings:

```text
gzip
br
```

Client:

```http
Accept-Encoding: gzip, br
```

Server:

```http
Content-Encoding: br
```

## 17. HTTP/1.1, HTTP/2 and HTTP/3

HTTP/1.1 is the classic model and commonly uses multiple connections.

HTTP/2 adds multiplexing and binary framing over one connection.

HTTP/3 uses QUIC over UDP and handles packet loss differently.

## 18. HSTS

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

It tells the browser to use HTTPS. Enable it deliberately.

## 19. curl

Headers:

```bash
curl -I https://example.com
```

Verbose:

```bash
curl -v https://example.com
```

POST JSON:

```bash
curl -X POST   -H 'Content-Type: application/json'   -d '{"name":"Anna"}'   https://example.com/api/users
```

Bearer token:

```bash
curl -H 'Authorization: Bearer TOKEN'   https://example.com/api/private
```

## 20. Common problems

### 502 Bad Gateway

The reverse proxy cannot connect to the backend.

### 504 Gateway Timeout

The backend did not answer in time.

### CORS error

The backend does not allow the origin or preflight request.

### Mixed content

An HTTPS page tries to fetch a resource over HTTP.

### Certificate mismatch

The certificate does not cover the requested domain.

## 21. What you should know

You should be able to read requests and responses, recognise status-code classes, test endpoints with curl, understand cookies/cache/CORS, understand TLS and certificates, and distinguish application failures from proxy failures.

## Official references

- HTTP Semantics - RFC 9110: https://www.rfc-editor.org/rfc/rfc9110
- HTTP/2 - RFC 9113: https://www.rfc-editor.org/rfc/rfc9113
- HTTP/3 - RFC 9114: https://www.rfc-editor.org/rfc/rfc9114
- TLS 1.3 - RFC 8446: https://www.rfc-editor.org/rfc/rfc8446
- TLS recommendations - RFC 9325: https://www.rfc-editor.org/rfc/rfc9325
