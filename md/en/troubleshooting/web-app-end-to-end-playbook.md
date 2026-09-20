---
id: "doc-057"
title: "End-to-End Web Application Troubleshooting — Playbook"
slug: "end-to-end-web-application-troubleshooting-playbook"
description: "Troubleshoot a web application systematically from user-visible symptom to root cause."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "troubleshooting"
  - "dns"
  - "tls"
  - "nginx"
  - "backend"
  - "database"
  - "debug"
---

# End-to-End Web Application Troubleshooting — Playbook

## 1. Goal

Troubleshoot a web application systematically from user-visible symptom to root cause.

Do not jump directly to code.

Follow layers:

```text
DNS
→ network
→ TLS
→ reverse proxy
→ backend
→ database/external services
→ browser
```

## 2. Define the symptom first

Write the exact symptom.

Examples:

- domain does not resolve,
- timeout,
- TLS error,
- 502,
- 500,
- page loads but API fails,
- login fails,
- only one browser fails.

Precise symptoms reduce wasted work.

## 3. Can you reproduce it?

Record:

- URL,
- user/account,
- browser,
- device,
- time,
- network,
- exact steps.

If you cannot reproduce it, collect logs and telemetry around the reported time.

## 4. DNS

Check:

```bash
dig example.com
dig +short example.com
nslookup example.com
```

Verify the returned IP is the intended server/CDN/load balancer.

## 5. Routing / reachability

Test:

```bash
ping HOST
traceroute HOST
curl -v https://example.com
```

Remember that ping may be blocked even when the service works.

## 6. TLS

Inspect:

```bash
openssl s_client -connect example.com:443 -servername example.com
```

Check:

- certificate expiration,
- hostname match,
- chain,
- SNI,
- proxy configuration.

## 7. HTTP

Use:

```bash
curl -I https://example.com
curl -v https://example.com
```

Inspect:

- status code,
- redirects,
- headers,
- server/proxy response.

## 8. Interpreting status codes

```text
200  request succeeded
301/302 redirect
400  malformed request
401  authentication required/failed
403  forbidden
404  not found
429  rate limited
500  backend error
502  proxy could not get valid upstream response
503  unavailable
504  gateway timeout
```

## 9. Reverse proxy

For nginx:

```bash
sudo nginx -t
sudo systemctl status nginx
sudo journalctl -u nginx
```

Check:

- upstream address,
- port,
- Host header,
- TLS termination,
- timeout,
- proxy headers.

## 10. Backend

Check service state:

```bash
systemctl status myapp
journalctl -u myapp -n 100
```

Check process and listener:

```bash
ps aux | grep myapp
ss -lntp
```

## 11. Test backend without proxy

If nginx proxies to:

```text
127.0.0.1:8080
```

test directly:

```bash
curl -v http://127.0.0.1:8080/
```

If direct access fails, nginx is probably not the root cause.

## 12. Health endpoint

A health endpoint can simplify diagnosis.

Example:

```http
GET /health
```

Useful output may include only safe operational state.

Do not expose secrets or internal topology.

## 13. Process

Check:

```bash
ps aux
top
systemctl status myapp
```

Look for:

- crash loops,
- high CPU,
- stuck process,
- wrong user,
- missing environment variables.

## 14. Disk

```bash
df -h
df -i
du -sh /var/* 2>/dev/null
```

Full disk or exhausted inodes can break:

- logs,
- databases,
- uploads,
- temp files,
- package updates.

## 15. RAM

```bash
free -h
top
journalctl -k | grep -i -E 'oom|killed process'
```

Watch for OOM kills.

## 16. Database

Check:

- database service,
- network connectivity,
- credentials,
- migrations,
- locks,
- slow queries,
- disk space.

PostgreSQL example:

```bash
psql "$DATABASE_URL"
```

## 17. Connection pool

Symptoms of pool exhaustion:

- requests hang,
- intermittent 500s,
- database appears healthy,
- many waiting connections.

Check pool limits and leaked/long-running connections.

## 18. External API

Test external dependencies separately.

```bash
curl -v https://api.provider.example
```

Check:

- DNS,
- TLS,
- credentials,
- rate limits,
- timeouts,
- provider status.

## 19. Browser Console

Open DevTools Console.

Look for:

- JavaScript exceptions,
- CSP errors,
- CORS errors,
- blocked resources,
- failed promises.

## 20. Network in DevTools

Inspect failed requests.

Check:

- URL,
- method,
- status,
- request headers,
- response headers,
- response body,
- timing,
- initiator.

## 21. CORS

CORS is enforced by browsers.

Typical symptom:

backend works in curl but browser blocks frontend request.

Check:

```text
Access-Control-Allow-Origin
Access-Control-Allow-Methods
Access-Control-Allow-Headers
```

Do not use wildcard origins casually with credentials.

## 22. Cookies

Check:

- Domain,
- Path,
- Secure,
- HttpOnly,
- SameSite,
- expiration.

Authentication often fails because cookie scope differs between environments.

## 23. Cache

Possible cache layers:

- browser,
- service worker,
- CDN,
- reverse proxy,
- application cache.

Test with explicit cache bypass before assuming deployment failed.

## 24. Service Worker

A stale service worker can serve old assets even after deployment.

Inspect it in browser DevTools.

For debugging, temporarily unregister or bypass it.

## 25. Deployment

Check:

- which commit/version is deployed,
- build artifact timestamp,
- container image tag/digest,
- migration status,
- config/environment,
- service restart.

Never assume production is running the code you just pushed.

## 26. Rollback

A good deployment process has a rollback path.

Examples:

- previous container image,
- previous binary,
- Git release/tag,
- database-compatible rollback plan.

## 27. Log correlation

Use request IDs/correlation IDs across:

```text
reverse proxy
→ backend
→ database/external calls
```

This makes one request traceable across layers.

## 28. Incident timeline

Record:

```text
12:03 deploy
12:05 errors increase
12:07 first alert
12:12 rollback
12:14 recovery
```

Timelines help separate cause from coincidence.

## 29. After the incident

Document:

- root cause,
- impact,
- detection gap,
- fix,
- prevention,
- monitoring changes,
- runbook changes.

Focus on system improvement rather than blame.

## 30. Quick playbook

```text
1. define symptom
2. reproduce
3. DNS
4. curl public endpoint
5. TLS
6. reverse proxy
7. backend direct
8. service logs
9. process/port
10. disk/RAM
11. database
12. external API
13. browser console/network
14. cookies/CORS/cache
15. deployed version
16. rollback if needed
```

## 31. What you should know

You should be able to debug:

- DNS,
- routing,
- TLS,
- HTTP,
- nginx/reverse proxy,
- backend services,
- processes and ports,
- disk/RAM,
- databases,
- external APIs,
- browser Console/Network,
- CORS,
- cookies,
- cache,
- service workers,
- deployment versioning,
- rollback,
- incident timelines.

The key rule: troubleshoot one layer at a time and prove where the request stops working.
