# Logging, Monitoring and Troubleshooting — Handbook

## 1. Rule

Do not guess. Gather facts.

Typical order:

```text
symptom
 ↓
service status
 ↓
logs
 ↓
ports
 ↓
network
 ↓
configuration
 ↓
resources
```

## 2. systemctl

```bash
systemctl status nginx
systemctl status myapp
```

## 3. journalctl

```bash
journalctl -u myapp
journalctl -u myapp -b
journalctl -u myapp -f
journalctl -u myapp -n 100
```

## 4. Log files

```text
/var/log/
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
grep -C 3 ERROR app.log
```

## 7. CPU and RAM

```bash
top
htop
free -h
```

## 8. Disk

```bash
df -h
du -sh *
sudo du -xhd1 / | sort -h
```

## 9. Inodes

A filesystem can have free gigabytes but no free inodes:

```bash
df -i
```

## 10. Processes

```bash
ps aux
pgrep nginx
pgrep -af myapp
```

## 11. Ports

```bash
ss -lntup
```

## 12. lsof

```bash
sudo lsof -i :443
sudo lsof /path/to/file
```

## 13. Testing localhost

```bash
curl -v http://127.0.0.1:8080/health
```

If localhost works, investigate proxy, firewall and DNS next.

## 14. Health endpoint

A backend can expose:

```text
GET /health
```

returning:

```json
{"status":"ok"}
```

## 15. Docker logs

```bash
docker logs CONTAINER
docker logs -f CONTAINER
docker logs --tail 100 CONTAINER
docker compose logs -f
```

## 16. dmesg

Kernel or hardware problems:

```bash
dmesg
dmesg -T
```

## 17. uptime and load

```bash
uptime
```

Load average is not the same as CPU percentage.

## 18. iostat

After installing sysstat:

```bash
iostat -xz 1
```

Useful for I/O troubleshooting.

## 19. vmstat

```bash
vmstat 1
```

## 20. Network toolkit

```text
ping
dig
curl
nc
ss
traceroute
tcpdump
```

## 21. 502 troubleshooting

1. Check nginx.
2. Check the backend.
3. Check listening ports.
4. Test the backend locally.
5. Inspect nginx error logs.

## 22. “The site is down” checklist

1. DNS,
2. port 443,
3. certificate,
4. nginx,
5. backend,
6. database,
7. resources.

## 23. Monitoring minimum

Monitor uptime, CPU, RAM, disk, health endpoint, container/service status and important log errors.

## 24. Alerts

A useful alert says what failed, where, since when, the relevant metric and ideally links to logs or a dashboard.

## 25. Do not alert on everything

Alert fatigue makes all alerts less useful. Alerts should correspond to issues that need action.

## 26. Log rotation

Logs need rotation. Linux commonly uses logrotate or journald retention.

## 27. What you should know

You should be able to read journalctl, locate processes and ports, assess CPU/RAM/disk, diagnose 502 errors, separate application problems from proxy/network problems and create a basic health check.
