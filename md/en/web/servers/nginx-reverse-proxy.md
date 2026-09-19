# nginx-reverse-proxy

## 1. What nginx is used for

nginx can act as a static file server, reverse proxy, TLS terminator, load balancer and proxy cache.

Typical setup:

```text
Internet
   ↓
nginx :80/:443
   ├─ app1 → localhost:8080
   ├─ app2 → localhost:3000
   └─ static files
```

## 2. Debian installation

```bash
sudo apt update
sudo apt install nginx
sudo systemctl enable --now nginx
systemctl status nginx
```

## 3. Important Debian paths

```text
/etc/nginx/nginx.conf
/etc/nginx/sites-available/
/etc/nginx/sites-enabled/
/var/log/nginx/access.log
/var/log/nginx/error.log
/var/www/
```

## 4. Minimal virtual host

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

Enable it:

```bash
sudo ln -s /etc/nginx/sites-available/example   /etc/nginx/sites-enabled/example
sudo nginx -t
sudo systemctl reload nginx
```

## 5. Reverse proxy

Go backend:

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

## 6. Several applications on one IP

```text
app1.example.com → 127.0.0.1:8080
app2.example.com → 127.0.0.1:3000
api.example.com  → 127.0.0.1:9000
```

nginx distinguishes them using server_name.

## 7. HTTPS

With Certbot:

```bash
sudo certbot --nginx -d app.example.com
```

After configuration, nginx normally listens on 443 ssl.

## 8. Redirect HTTP → HTTPS

```nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```

## 9. Static files

```nginx
location /assets/ {
    alias /srv/myapp/assets/;
}
```

root and alias behave differently. With alias, the path is substituted directly.

## 10. SPA

For React/Vue:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

This keeps client-side routing working after a refresh.

## 11. WebSocket proxy

```nginx
location /ws/ {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

## 12. Upload limits

```nginx
client_max_body_size 20M;
```

## 13. Timeouts

```nginx
proxy_connect_timeout 5s;
proxy_read_timeout 60s;
proxy_send_timeout 60s;
```

## 14. Static asset caching

```nginx
location ~* .(css|js|png|jpg|jpeg|gif|svg|webp)$ {
    expires 30d;
    add_header Cache-Control "public";
}
```

## 15. Logs

```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
grep ' 500 ' /var/log/nginx/access.log
```

## 16. Troubleshooting

Start with:

```bash
sudo nginx -t
systemctl status nginx
```

Then:

```bash
curl -I http://127.0.0.1:8080
curl -I https://app.example.com
```

If the backend works locally but public access returns 502, investigate nginx/proxy configuration.

## 17. Security headers — basics

```nginx
add_header X-Content-Type-Options nosniff always;
add_header Referrer-Policy strict-origin-when-cross-origin always;
```

Configure CSP deliberately for the application.

## 18. Hide version

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

A container can expose its port only on localhost:

```text
127.0.0.1:8080:8080
```

Host nginx:

```nginx
proxy_pass http://127.0.0.1:8080;
```

## 21. Typical deployment flow

1. application works locally,
2. build a binary or container,
3. run the backend on localhost,
4. DNS points to the VPS,
5. nginx routes the domain to the backend,
6. add TLS,
7. check logs and health checks.

## 22. Important commands

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl restart nginx
systemctl status nginx
journalctl -u nginx
tail -f /var/log/nginx/error.log
```

## 23. What you should know

You should be able to serve a static site, configure a reverse proxy, host several domains on one VPS, add HTTPS, diagnose 502/504 errors and read access/error logs.
