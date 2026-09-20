---
id: "doc-015"
title: "Logi, monitoring i troubleshooting"
slug: "logi-monitoring-i-troubleshooting"
description: "Nie zgaduj. Zbieraj fakty."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "logs"
  - "monitoring"
  - "debug"
  - "troubleshooting"
---

# Logi, monitoring i troubleshooting

Troubleshooting zaczyna się od obserwacji, nie od zmian konfiguracji. Logi mówią, co wydarzyło się w systemie, monitoring pokazuje stan i trendy, a alerty powinny wskazywać sytuacje wymagające reakcji.

Powiązane tematy: [Troubleshooting aplikacji webowej end-to-end](techhandbook:doc-057), [systemd, cron i schedulery](techhandbook:doc-052), [HTTP, HTTPS i TLS](techhandbook:doc-044) oraz [Docker](techhandbook:doc-012).

## 1. Zasada

Nie zgaduj. Zbieraj fakty.

Typowa kolejność:

```text
objaw
 ↓
status usługi
 ↓
logi
 ↓
porty
 ↓
sieć
 ↓
konfiguracja
 ↓
zasoby
```

## 2. systemctl

```bash
systemctl status nginx
systemctl status myapp
```

## 3. journalctl

Usługa:

```bash
journalctl -u myapp
```

Od bieżącego bootu:

```bash
journalctl -u myapp -b
```

Na żywo:

```bash
journalctl -u myapp -f
```

Ostatnie 100:

```bash
journalctl -u myapp -n 100
```

## 4. Pliki logów

```text
/var/log/
```

Przykłady:

```text
/var/log/nginx/access.log
/var/log/nginx/error.log
```

## 5. tail

```bash
tail -f /var/log/nginx/error.log
```

## 6. grep

```bash
grep ERROR app.log
grep -i timeout app.log
```

Kontekst:

```bash
grep -C 3 ERROR app.log
```

## 7. CPU i RAM

```bash
top
htop
free -h
```

## 8. Dysk

```bash
df -h
du -sh *
```

Największe katalogi:

```bash
sudo du -xhd1 / | sort -h
```

## 9. Inodes

Dysk może mieć wolne GB, ale brak inode:

```bash
df -i
```

## 10. Procesy

```bash
ps aux
pgrep nginx
pgrep -af myapp
```

## 11. Porty

```bash
ss -lntup
```

## 12. lsof

```bash
sudo lsof -i :443
sudo lsof /path/to/file
```

## 13. Test localhost

```bash
curl -v http://127.0.0.1:8080/health
```

Jeśli localhost działa, szukaj dalej w proxy/firewall/DNS.

## 14. Health endpoint

Dobry backend może mieć:

```text
GET /health
```

odpowiadający:

```json
{"status":"ok"}
```

## 15. Docker logs

```bash
docker logs CONTAINER
docker logs -f CONTAINER
docker logs --tail 100 CONTAINER
```

Compose:

```bash
docker compose logs -f
```

## 16. dmesg

Problemy kernela/sprzętu:

```bash
dmesg
dmesg -T
```

## 17. uptime i load

```bash
uptime
```

Load average to nie to samo co procent CPU.

## 18. iostat

Po instalacji `sysstat`:

```bash
iostat -xz 1
```

Pomaga diagnozować problem z I/O.

## 19. vmstat

```bash
vmstat 1
```

## 20. Sieć

```bash
ping
dig
curl
nc
ss
traceroute
tcpdump
```

## 21. Schemat diagnozy 502

1. nginx działa?

```bash
systemctl status nginx
```

2. backend działa?

```bash
systemctl status myapp
```

3. backend słucha?

```bash
ss -lntp
```

4. działa lokalnie?

```bash
curl http://127.0.0.1:8080
```

5. nginx error log:

```bash
tail -f /var/log/nginx/error.log
```

## 22. Schemat diagnozy „strona nie działa”

1. DNS,
2. port 443,
3. certyfikat,
4. nginx,
5. backend,
6. baza,
7. zasoby.

## 23. Monitoring

Minimum:
- uptime,
- CPU,
- RAM,
- disk,
- health endpoint,
- status kontenerów/usług,
- ważne błędy w logach.

## 24. Alerty

Alert powinien mówić:
- co nie działa,
- gdzie,
- od kiedy,
- jaka jest metryka,
- najlepiej link do dashboardu/logów.

## 25. Nie alertuj wszystkiego

Zbyt wiele alertów powoduje ignorowanie wszystkich.

Alert powinien odpowiadać na problem wymagający reakcji.

## 26. Rotacja logów

Logi muszą mieć rotację.

Linux często używa `logrotate` lub journald retention.

## 27. Co trzeba umieć

- czytać journalctl,
- znaleźć proces i port,
- ocenić CPU/RAM/dysk,
- diagnozować 502,
- odróżnić problem aplikacji od proxy/sieci,
- tworzyć prosty healthcheck.

## Oficjalne źródła

- systemd journalctl: https://www.freedesktop.org/software/systemd/man/latest/journalctl.html
- OpenTelemetry documentation: https://opentelemetry.io/docs/
