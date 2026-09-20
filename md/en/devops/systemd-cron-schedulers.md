# systemd, cron and Schedulers

A background service and a periodically executed job are two different problems. On Debian and many other Linux distributions, **systemd** normally manages long-running services, while scheduling can be handled by **systemd timers**, classic **cron**, or an application-level scheduler.

**When this handbook is useful:** when an application must start after boot, restart after failure, expose useful logs, or execute a task at a defined time without an interactive user session.

For broader context, see [Debian 13 — Desktop + Server Handbook](techhandbook:doc-033), [Shell Scripting — Debian and FreeBSD](techhandbook:doc-031), and [Documenting Technical Solutions](techhandbook:doc-056).

## 1. The problem

A server application should start after boot, run without an interactive user session, restart after failure, produce logs and be easy to stop.

Periodic tasks need a scheduler.

## 2. systemd service

```ini
[Unit]
Description=Example application
After=network.target

[Service]
Type=simple
User=example
Group=example
WorkingDirectory=/srv/example
ExecStart=/srv/example/example
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

File:

```text
/etc/systemd/system/example.service
```

## 3. daemon-reload

After changing a unit:

```bash
sudo systemctl daemon-reload
```

## 4. Start and stop

```bash
sudo systemctl start example
sudo systemctl stop example
sudo systemctl restart example
sudo systemctl reload example
```

Reload works only when supported by the service.

## 5. Enable

```bash
sudo systemctl enable example
sudo systemctl enable --now example
```

## 6. Status

```bash
systemctl status example
```

## 7. Logs

```bash
journalctl -u example
journalctl -u example -f
journalctl -u example -b
```

## 8. Environment

```ini
EnvironmentFile=/etc/example/example.env
```

Secret-containing files should have restrictive permissions.

## 9. Restart policy

```ini
Restart=on-failure
RestartSec=5
```

Common strategies include no, on-success, on-failure and always.

## 10. WorkingDirectory

```ini
WorkingDirectory=/srv/example
```

Do not assume the process starts in the binary directory.

## 11. User

Do not run an application as root unless required.

```ini
User=example
Group=example
```

## 12. Dependencies

```ini
After=network-online.target
Wants=network-online.target
```

After controls ordering; it does not by itself create a dependency.

## 13. systemd timer

Service:

```ini
[Unit]
Description=Generate report

[Service]
Type=oneshot
ExecStart=/usr/local/bin/report
```

Timer:

```ini
[Unit]
Description=Run report daily

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
```

## 14. Timers

```bash
systemctl list-timers
```

## 15. OnCalendar

```text
daily
hourly
Mon..Fri 08:00
*-*-* 07:30:00
```

Test an expression:

```bash
systemd-analyze calendar 'Mon..Fri 08:00'
```

## 16. Persistent

```ini
Persistent=true
```

If the machine was off at the scheduled time, the task can run after startup.

## 17. cron

```bash
crontab -e
crontab -l
```

## 18. cron syntax

```text
minute hour day month weekday command
```

Example:

```cron
30 7 * * * /usr/local/bin/report
```

Every day at 07:30.

## 19. cron examples

Hourly:

```cron
0 * * * * command
```

Weekdays:

```cron
0 8 * * 1-5 command
```

Every 10 minutes:

```cron
*/10 * * * * command
```

## 20. PATH in cron

Cron has a limited environment. Prefer full paths:

```cron
/usr/bin/python3 /srv/app/task.py
```

## 21. Redirecting logs

```cron
0 8 * * * /usr/local/bin/task >> /var/log/task.log 2>&1
```

## 22. cron vs systemd timer

cron is simple, widely known and good for straightforward jobs.

systemd timers integrate with journald, dependencies, service hardening and status reporting, and support Persistent=true.

## 23. Application scheduler

A scheduler may live inside the application, for example in a worker or queue system.

Be careful with multiple application instances: each instance may execute the same job.

## 24. Idempotency

A scheduled job should be safe to repeat.

```text
job runs twice
→ does not create two identical payments
```

## 25. Locking

```bash
flock -n /run/report.lock /usr/local/bin/report
```

A lock can prevent parallel execution.

## 26. Time zone

Always know which time zone the scheduler uses. Servers often run in UTC.

## 27. Job monitoring

Do not stop at “cron exists”. Monitor exit code, execution time, last success, errors and missed executions.

## 28. What you should know

You should be able to write a simple systemd service, operate and troubleshoot it, read the journal, create a timer, write cron expressions, understand cron vs timers and design idempotent jobs.


## 29. Documentation and sources

For the installed system, the local manual pages are the most precise reference for the exact systemd and cron versions:

```bash
man systemd.service
man systemd.timer
man systemd.time
man systemctl
man journalctl
man 5 crontab
```

Online references:

- systemd project documentation  
  https://systemd.io/
- Debian Trixie `crontab(5)`  
  https://manpages.debian.org/trixie/cron/crontab.5.en.html

For scheduled jobs, always verify the time zone, process environment, output/error logging, and the behaviour after a missed schedule.
