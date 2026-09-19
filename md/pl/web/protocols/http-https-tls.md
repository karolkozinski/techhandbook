# http-https-tls

## 1. Model klient–serwer

Przeglądarka lub aplikacja wysyła request:

```text
klient → request → serwer
klient ← response ← serwer
```

HTTP jest protokołem aplikacyjnym działającym zwykle nad TCP, a HTTP/3 nad QUIC/UDP.

## 2. Request HTTP

Przykład:

```http
GET /products/42 HTTP/1.1
Host: example.com
Accept: application/json
User-Agent: Mozilla/5.0
```

Elementy:
- metoda,
- ścieżka,
- wersja protokołu,
- nagłówki,
- opcjonalne body.

## 3. Metody

```text
GET     pobranie
POST    utworzenie/wykonanie operacji
PUT     pełna aktualizacja
PATCH   częściowa aktualizacja
DELETE  usunięcie
HEAD    jak GET, ale bez body
OPTIONS informacje o możliwościach
```

## 4. Statusy

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

## 5. Nagłówki

Przykłady:

```text
Content-Type
Content-Length
Authorization
Accept
Accept-Encoding
Cache-Control
ETag
Cookie
Set-Cookie
Location
Origin
Referer
User-Agent
```

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

Serwer:

```http
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax
```

Przeglądarka później:

```http
Cookie: session=abc123
```

Ważne flagi:
- `HttpOnly`,
- `Secure`,
- `SameSite`.

## 8. Cache

Przykład:

```http
Cache-Control: public, max-age=3600
```

Walidacja:

```text
ETag
If-None-Match
Last-Modified
If-Modified-Since
```

Odpowiedź:

```text
304 Not Modified
```

## 9. HTTPS

HTTPS to HTTP szyfrowany przez TLS.

Zapewnia:
- poufność,
- integralność,
- uwierzytelnienie serwera.

## 10. Certyfikaty

Certyfikat wiąże nazwę domeny z kluczem publicznym.

Typowo:
- certyfikat serwera,
- certyfikaty pośrednie,
- root CA zaufany przez system/przeglądarkę.

## 11. Let's Encrypt

Darmowe certyfikaty TLS.

Na nginx często używa się Certbota:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
```

Test odnowienia:

```bash
sudo certbot renew --dry-run
```

## 12. TLS handshake — uproszczenie

1. klient łączy się z serwerem,
2. serwer przedstawia certyfikat,
3. klient sprawdza certyfikat,
4. uzgadniane są klucze sesyjne,
5. dalszy ruch jest szyfrowany.

## 13. SNI

SNI pozwala serwerowi obsługiwać wiele domen HTTPS na jednym IP.

Klient podczas handshake wskazuje, do jakiej domeny chce się połączyć.

## 14. CORS

CORS steruje dostępem skryptów z innych originów.

Origin:

```text
scheme + host + port
```

Przykład:

```text
https://app.example.com
https://api.example.com
```

to dwa różne originy.

Nagłówki:

```http
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST
```

## 15. Preflight

Przeglądarka może najpierw wysłać:

```http
OPTIONS /api/resource
```

i dopiero po zgodzie właściwy request.

## 16. Compression

Najczęściej:

```text
gzip
br
```

Klient:

```http
Accept-Encoding: gzip, br
```

Serwer:

```http
Content-Encoding: br
```

## 17. HTTP/1.1, HTTP/2, HTTP/3

HTTP/1.1:
- klasyczny,
- wiele połączeń.

HTTP/2:
- multiplexing,
- binarne ramki,
- jedno połączenie dla wielu requestów.

HTTP/3:
- QUIC,
- UDP,
- mniejsze problemy przy utracie pakietów.

## 18. HSTS

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Informuje przeglądarkę, że ma używać HTTPS.

Włączaj świadomie.

## 19. curl

Nagłówki:

```bash
curl -I https://example.com
```

Pełny verbose:

```bash
curl -v https://example.com
```

POST JSON:

```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{"name":"Karol"}' \
  https://example.com/api/users
```

Bearer token:

```bash
curl -H 'Authorization: Bearer TOKEN' \
  https://example.com/api/private
```

## 20. Typowe problemy

### 502 Bad Gateway

Reverse proxy nie może połączyć się z backendem.

### 504 Gateway Timeout

Backend nie odpowiedział na czas.

### CORS error

Backend nie zezwala na origin lub preflight.

### Mixed content

Strona HTTPS próbuje pobrać zasób przez HTTP.

### Certyfikat nie pasuje

Certyfikat nie obejmuje danej domeny.

## 21. Co powinieneś umieć

- czytać request i response,
- rozpoznawać klasy statusów,
- testować endpoint przez `curl`,
- rozumieć cookies, cache i CORS,
- rozumieć rolę TLS i certyfikatów,
- rozpoznać różnicę między błędem aplikacji a proxy.
