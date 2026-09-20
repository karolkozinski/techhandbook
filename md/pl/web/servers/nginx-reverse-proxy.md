---
id: "doc-045"
title: "nginx i reverse proxy"
slug: "nginx-i-reverse-proxy"
description: "nginx i reverse proxy — praktyczne kompendium TechHandbook."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "nginx"
  - "reverse proxy"
  - "web server"
---

# nginx i reverse proxy

nginx często stoi na granicy między internetem a aplikacją. Może serwować pliki statyczne, kończyć TLS, przekazywać ruch do backendów i rozdzielać kilka usług działających na jednym adresie IP.

Powiązane tematy: [HTTP, HTTPS i TLS](techhandbook:doc-044), [DNS, domeny i routing](techhandbook:doc-017), [Docker](techhandbook:doc-012), [Debian - desktop i serwer](techhandbook:doc-033) oraz [Bezpieczeństwo aplikacji webowych](techhandbook:doc-026).

## 1. Do czego służy nginx

nginx może działać jako:
- serwer statycznych plików,
- reverse proxy,
- terminator TLS,
- load balancer,
- proxy cache.

Typowy układ:

```text
Internet
   ↓
nginx :80/:443
   ├─ app1 → localhost:8080
   ├─ app2 → localhost:3000
   └─ pliki statyczne
```

## 2. Instalacja Debian

```bash
sudo apt update
sudo apt install nginx
sudo systemctl enable --now nginx
```

Status:

```bash
systemctl status nginx
```

## 3. Najważniejsze katalogi na Debianie

```text
/etc/nginx/nginx.conf
/etc/nginx/sites-available/
/etc/nginx/sites-enabled/
/var/log/nginx/access.log
/var/log/nginx/error.log
/var/www/
```

## 4. Minimalny virtual host

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    root /var/www/example;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Aktywacja:

```bash
sudo ln -s /etc/nginx/sites-available/example \
  /etc/nginx/sites-enabled/example
```

Test:

```bash
sudo nginx -t
```

Reload:

```bash
sudo systemctl reload nginx
```

## 5. Reverse proxy

Backend Go działa na:

```text
127.0.0.1:8080
```

nginx:

```nginx
server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 6. Kilka aplikacji na jednym IP

```text
app1.example.com → 127.0.0.1:8080
app2.example.com → 127.0.0.1:3000
api.example.com  → 127.0.0.1:9000
```

nginx rozróżnia je po `server_name`.

## 7. HTTPS

Z Certbotem:

```bash
sudo certbot --nginx -d app.example.com
```

Po konfiguracji nginx zwykle nasłuchuje na `443 ssl`.

## 8. Redirect HTTP → HTTPS

```nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```

## 9. Pliki statyczne

```nginx
location /assets/ {
    alias /srv/myapp/assets/;
}
```

`root` i `alias` działają inaczej. Przy `alias` ścieżka jest podstawiana bezpośrednio.

## 10. SPA

Dla React/Vue:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Dzięki temu routing po stronie klienta działa po odświeżeniu.

## 11. Proxy WebSocket

```nginx
location /ws/ {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

## 12. Limity uploadu

```nginx
client_max_body_size 20M;
```

## 13. Timeout

```nginx
proxy_connect_timeout 5s;
proxy_read_timeout 60s;
proxy_send_timeout 60s;
```

## 14. Cache statycznych plików

```nginx
location ~* \.(css|js|png|jpg|jpeg|gif|svg|webp)$ {
    expires 30d;
    add_header Cache-Control "public";
}
```

## 15. Logi

```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

Filtrowanie:

```bash
grep ' 500 ' /var/log/nginx/access.log
```

## 16. Diagnostyka

Najpierw:

```bash
sudo nginx -t
systemctl status nginx
```

Potem:

```bash
curl -I http://127.0.0.1:8080
curl -I https://app.example.com
```

Jeżeli backend działa lokalnie, ale publicznie jest 502, szukaj w nginx/proxy.

## 17. Security headers — podstawy

Przykładowo:

```nginx
add_header X-Content-Type-Options nosniff always;
add_header Referrer-Policy strict-origin-when-cross-origin always;
```

CSP konfiguruj świadomie pod aplikację.

## 18. Ukrywanie wersji

```nginx
server_tokens off;
```

## 19. Load balancing

```nginx
upstream backend {
    server 127.0.0.1:8081;
    server 127.0.0.1:8082;
}

server {
    location / {
        proxy_pass http://backend;
    }
}
```

## 20. nginx + Docker

Container może wystawiać port tylko lokalnie:

```text
127.0.0.1:8080:8080
```

nginx na hoście:

```nginx
proxy_pass http://127.0.0.1:8080;
```

## 21. Typowy flow deploymentu

1. aplikacja działa lokalnie,
2. budujesz binarkę lub kontener,
3. uruchamiasz backend na localhost,
4. DNS wskazuje VPS,
5. nginx kieruje domenę na backend,
6. dodajesz TLS,
7. sprawdzasz logi i healthcheck.

## 22. Najważniejsze komendy

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl restart nginx
systemctl status nginx
journalctl -u nginx
tail -f /var/log/nginx/error.log
```

## 23. Co trzeba umieć

- wystawić statyczną stronę,
- skonfigurować reverse proxy,
- obsłużyć kilka domen na jednym VPS,
- dodać HTTPS,
- znaleźć przyczynę 502/504,
- czytać access/error logs.

## Oficjalne źródła

- nginx documentation: https://nginx.org/en/docs/
- nginx Beginner's Guide: https://nginx.org/en/docs/beginners_guide.html
- ngx_http_proxy_module: https://nginx.org/en/docs/http/ngx_http_proxy_module.html
