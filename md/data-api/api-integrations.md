# API i integracje systemów — kompendium praktyczne

## 1. API

API to kontrakt komunikacji między systemami.

Przykład:

```text
frontend → API → backend → baza
```

albo:

```text
system A → API systemu B
```

## 2. REST

Typowe endpointy:

```text
GET    /users
GET    /users/42
POST   /users
PATCH  /users/42
DELETE /users/42
```

## 3. JSON

Request:

```json
{
  "name": "Karol",
  "role": "manager"
}
```

Response:

```json
{
  "id": 42,
  "name": "Karol",
  "role": "manager"
}
```

## 4. Statusy

API powinno sensownie używać HTTP:

```text
200 sukces
201 utworzono
204 sukces bez treści
400 błędny request
401 brak uwierzytelnienia
403 brak uprawnień
404 brak zasobu
409 konflikt
422 dane poprawne składniowo, ale semantycznie błędne
429 rate limit
500 błąd serwera
```

## 5. API key

Przykład:

```http
Authorization: Bearer API_KEY
```

lub:

```http
X-API-Key: API_KEY
```

Nie wkładaj sekretów do repo.

## 6. Bearer token

```http
Authorization: Bearer eyJ...
```

Token może reprezentować użytkownika lub aplikację.

## 7. OAuth 2.0 — praktycznie

OAuth służy delegowaniu dostępu.

Typowy flow:

```text
użytkownik
  ↓
autoryzacja u dostawcy
  ↓
authorization code
  ↓
backend wymienia code na token
  ↓
API dostawcy
```

Nie implementuj kryptografii samodzielnie.

## 8. Pagination

Przykład offset:

```text
GET /products?limit=50&offset=100
```

Cursor:

```text
GET /products?cursor=abc123
```

Cursor lepiej skaluje się przy zmieniających danych.

## 9. Filtering i sorting

```text
GET /orders?status=paid&sort=-created_at
```

## 10. Rate limits

API może ograniczać liczbę requestów.

Przykład:

```text
100 req/min
```

Po przekroczeniu:

```text
429 Too Many Requests
```

Klient powinien respektować retry/backoff.

## 11. Retry

Nie ponawiaj bezmyślnie wszystkiego.

Zwykle warto retry dla:
- timeout,
- 502,
- 503,
- 504.

Ostrożnie dla POST, jeśli operacja nie jest idempotentna.

## 12. Idempotency

Operacja idempotentna daje ten sam efekt po wielokrotnym wykonaniu.

GET powinien być idempotentny.

Dla płatności często używa się:

```http
Idempotency-Key: UUID
```

## 13. Webhook

Webhook to callback HTTP.

Zamiast pytać:

```text
czy coś się zmieniło?
czy coś się zmieniło?
```

system wysyła:

```text
POST https://twoja-aplikacja/webhook
```

gdy wydarzenie nastąpi.

## 14. Weryfikacja webhooka

Dobre systemy podpisują payload.

Schemat:

```text
HMAC(secret, request_body)
```

Odbiorca porównuje podpis.

## 15. Polling

Czasem webhooków nie ma.

Wtedy:

```text
co 10 minut → GET /events
```

Ważne:
- zapamiętać ostatni stan,
- unikać duplikatów,
- respektować rate limit.

## 16. curl

GET:

```bash
curl https://api.example.com/users
```

JSON:

```bash
curl \
  -H 'Accept: application/json' \
  https://api.example.com/users
```

POST:

```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{"name":"Karol"}' \
  https://api.example.com/users
```

Auth:

```bash
curl \
  -H "Authorization: Bearer $TOKEN" \
  https://api.example.com/me
```

## 17. jq

Formatowanie JSON:

```bash
curl -s https://api.example.com/users | jq
```

Pole:

```bash
... | jq '.items[0].name'
```

## 18. Postman / Bruno

Przydatne do:
- kolekcji requestów,
- środowisk,
- tokenów,
- testowania endpointów.

Bruno przechowuje kolekcje w plikach tekstowych dobrze współpracujących z Git.

## 19. API versioning

Typowo:

```text
/api/v1/users
```

albo nagłówkami.

Nie zmieniaj istniejącego kontraktu bez kontroli kompatybilności.

## 20. Timeout

Każdy klient API powinien mieć timeout.

Bez timeoutu request może wisieć bardzo długo.

## 21. Schemat integracji

```text
scheduler
  ↓
API klient
  ↓
zewnętrzne API
  ↓
walidacja
  ↓
baza
  ↓
logi / alert
```

## 22. Integracja odporna na błędy

Uwzględnij:
- timeout,
- retry,
- rate limit,
- błędny JSON,
- brak pól,
- duplikaty,
- logowanie,
- monitoring.

## 23. Co trzeba umieć

- czytać dokumentację API,
- testować `curl`,
- rozumieć REST i JSON,
- obsłużyć token,
- rozumieć webhook i polling,
- rozumieć pagination, rate limits i retry.
