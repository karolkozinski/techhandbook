---
id: "doc-057"
title: "Troubleshooting aplikacji webowej end-to-end"
slug: "troubleshooting-aplikacji-webowej-end-to-end"
description: "Troubleshooting aplikacji webowej end-to-end - praktyczne kompendium TechHandbook."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "troubleshooting"
  - "dns"
  - "tls"
  - "nginx"
  - "backend"
  - "database"
  - "debug"
---

# Troubleshooting aplikacji webowej end-to-end

Troubleshooting aplikacji webowej powinien iść warstwami od obserwowalnego objawu do przyczyny. Najpierw reprodukcja i dane, potem DNS/sieć/TLS, reverse proxy, backend, baza, zewnętrzne API i dopiero na końcu przypadkowe zmiany konfiguracji.

Powiązane tematy: [DNS, domeny i routing](techhandbook:doc-017), [HTTP, HTTPS i TLS](techhandbook:doc-044), [nginx i reverse proxy](techhandbook:doc-045), [SQL i PostgreSQL](techhandbook:doc-010), [Browser DevTools](techhandbook:doc-046) oraz [Logi, monitoring i troubleshooting](techhandbook:doc-015).

## 1. Cel

Gdy użytkownik mówi:

```text
strona nie działa
```

nie zaczynaj od przypadkowej zmiany konfiguracji.

Idź warstwami.

Uproszczony przepływ:

```text
Browser
→ DNS
→ Internet
→ TLS
→ reverse proxy
→ backend
→ cache
→ database
→ external API
```

## 2. Najpierw zdefiniuj objaw

Zamiast:

```text
nie działa
```

ustal:

- URL,
- czas,
- urządzenie,
- status HTTP,
- komunikat,
- czy problem jest stały,
- czy dotyczy wszystkich użytkowników.

## 3. Czy problem da się odtworzyć

Sprawdź:

- incognito,
- inna przeglądarka,
- inna sieć,
- curl.

```bash
curl -v https://example.com/
```

## 4. DNS

```bash
dig +short example.com
dig A example.com
dig AAAA example.com
```

Sprawdź:

- czy rekord istnieje,
- czy wskazuje właściwy IP,
- czy stary AAAA nie prowadzi gdzie indziej.

## 5. Routing / osiągalność

```bash
ping HOST
traceroute HOST
```

Brak ping nie dowodzi awarii, bo ICMP może być blokowany.

Port:

```bash
nc -vz example.com 443
```

## 6. TLS

```bash
openssl s_client -connect example.com:443 -servername example.com
```

Sprawdź:

- certyfikat,
- hostname,
- expiry,
- chain.

## 7. HTTP

```bash
curl -I https://example.com/
```

Redirecty:

```bash
curl -IL https://example.com/
```

## 8. Interpretacja statusów

```text
200 aplikacja odpowiedziała
301/302 redirect
401 brak auth
403 brak uprawnień
404 brak zasobu
429 limit
500 backend error
502 proxy nie dogadało się z upstream
503 niedostępność
504 timeout upstream
```

## 9. Reverse proxy

Status:

```bash
systemctl status nginx
```

Config:

```bash
sudo nginx -t
```

Logi:

```bash
tail -f /var/log/nginx/error.log
```

## 10. Backend

```bash
systemctl status myapp
journalctl -u myapp -n 100
```

Port:

```bash
ss -lntp
```

## 11. Test backendu bez proxy

Jeśli backend słucha na 8080:

```bash
curl -v http://127.0.0.1:8080/health
```

Interpretacja:

```text
localhost działa, publicznie nie
→ proxy / TLS / firewall / DNS
```

## 12. Health endpoint

Dobry endpoint:

```text
GET /health
```

Powinien być szybki i prosty.

Nie musi sprawdzać wszystkich zewnętrznych systemów.

## 13. Proces

```bash
pgrep -af myapp
ps aux
top
```

Sprawdź:

- czy działa,
- CPU,
- RAM,
- restart loop.

## 14. Dysk

```bash
df -h
df -i
```

Pełny dysk może powodować dziwne problemy:

- brak logów,
- błąd bazy,
- brak plików tymczasowych.

## 15. RAM

```bash
free -h
dmesg -T | grep -i oom
```

OOM killer może zabić proces.

## 16. Database

Sprawdź:

- czy proces bazy działa,
- czy aplikacja może się połączyć,
- pool,
- locks,
- wolne query.

PostgreSQL:

```bash
pg_isready
```

## 17. Connection pool

Objaw:

```text
aplikacja działa chwilę
potem wszystkie requesty wiszą
```

Możliwy problem:
- wyczerpany pool,
- niezamknięte connections,
- długie transakcje.

## 18. External API

Sprawdź:

- timeout,
- DNS,
- status,
- rate limit,
- credential expiry.

Nie zakładaj, że zewnętrzna usługa działa tylko dlatego, że działała godzinę wcześniej.

## 19. Browser Console

Sprawdź:

- JavaScript errors,
- CORS,
- CSP,
- failed fetch,
- mixed content.

## 20. Network w DevTools

Patrz na:

- czerwone requesty,
- status,
- response,
- timing,
- initiator.

## 21. CORS

Jeżeli request działa w curl, ale nie w browserze, sprawdź CORS.

Browser egzekwuje politykę origin, curl nie.

## 22. Cookies

Przy problemach z loginem sprawdź:

- czy cookie zostało ustawione,
- Domain,
- Path,
- Secure,
- SameSite,
- expiry.

## 23. Cache

Testuj bez cache:

```bash
curl -H 'Cache-Control: no-cache' ...
```

W browserze użyj Disable cache.

Sprawdź:

- CDN,
- service worker,
- browser cache,
- reverse proxy cache.

## 24. Service Worker

Stary service worker może serwować stary frontend.

Sprawdź Application → Service Workers.

## 25. Deployment

Pytania:

- co ostatnio wdrożono?
- jaki commit?
- czy migracja się udała?
- czy config jest zgodny?
- czy wszystkie instancje mają tę samą wersję?

## 26. Rollback

Jeśli ostatnia zmiana spowodowała awarię i rollback jest bezpieczny, często jest to najszybszy sposób przywrócenia usługi.

Najpierw przywróć działanie, potem analizuj.

## 27. Log correlation

Przydatny request ID:

```text
request_id=abc123
```

Pozwala powiązać:

- proxy,
- backend,
- worker,
- external API.

## 28. Timeline incydentu

Zapisuj:

```text
10:03 alert
10:05 potwierdzenie
10:08 znaleziono 502
10:12 backend restart loop
10:16 rollback
10:18 recovery
```

## 29. Po incydencie

Warto zapisać:

- root cause,
- impact,
- detection,
- recovery,
- co zadziałało,
- co poprawić.

## 30. Szybki playbook

```text
1. Objaw
2. DNS
3. Port 443
4. TLS
5. HTTP status
6. nginx
7. backend
8. database
9. external API
10. browser
11. cache
12. ostatni deploy
```

## 31. Co trzeba umieć

- diagnozować warstwami,
- odróżnić DNS od aplikacji,
- rozumieć 502/503/504,
- testować backend bez proxy,
- czytać logi,
- sprawdzać zasoby,
- analizować browser Network,
- myśleć o rollbacku i timeline.

## Źródła i narzędzia referencyjne

- Chrome DevTools: https://developer.chrome.com/docs/devtools/
- nginx documentation: https://nginx.org/en/docs/
- PostgreSQL documentation: https://www.postgresql.org/docs/current/
