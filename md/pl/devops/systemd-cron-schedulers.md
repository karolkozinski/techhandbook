---
id: "doc-052"
title: "systemd, cron i schedulery"
slug: "systemd-cron-i-schedulery"
description: "Usługa działająca w tle i zadanie uruchamiane okresowo to dwa różne problemy. W Debianie i wielu innych dystrybucjach Linuksa pierwszym zarządza zwykle…"
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "systemd"
  - "cron"
  - "timer"
  - "scheduler"
  - "service"
---

# systemd, cron i schedulery

Usługa działająca w tle i zadanie uruchamiane okresowo to dwa różne problemy. W Debianie i wielu innych dystrybucjach Linuksa pierwszym zarządza zwykle **systemd**, a harmonogram można realizować przez **systemd timers**, klasyczny **cron** albo scheduler w samej aplikacji.

**Kiedy ten materiał jest przydatny:** gdy aplikacja ma startować po bootowaniu, restartować się po awarii, zapisywać logi albo wykonywać zadanie o określonej porze bez aktywnej sesji użytkownika.

Dla szerszego kontekstu: [Debian — desktop i serwer](techhandbook:doc-033), [Shell scripting](techhandbook:doc-031) i [Dokumentowanie rozwiązań technicznych](techhandbook:doc-056).

## 1. Problem

Aplikacja serwerowa powinna:

- startować po boot,
- działać bez aktywnej sesji użytkownika,
- restartować się po awarii,
- mieć logi,
- być łatwa do zatrzymania.

Do zadań okresowych potrzebujemy schedulera.

## 2. systemd service

Przykład:

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

Plik:

```text
/etc/systemd/system/example.service
```

## 3. daemon-reload

Po zmianie unit:

```bash
sudo systemctl daemon-reload
```

## 4. Start i stop

```bash
sudo systemctl start example
sudo systemctl stop example
sudo systemctl restart example
```

Reload, jeśli usługa wspiera:

```bash
sudo systemctl reload example
```

## 5. Enable

```bash
sudo systemctl enable example
```

Od razu start:

```bash
sudo systemctl enable --now example
```

## 6. Status

```bash
systemctl status example
```

## 7. Logi

```bash
journalctl -u example
journalctl -u example -f
journalctl -u example -b
```

## 8. Environment

Można wskazać:

```ini
EnvironmentFile=/etc/example/example.env
```

Sekrety w pliku powinny mieć ograniczone permissions.

## 9. Restart

```ini
Restart=on-failure
RestartSec=5
```

Dostępne strategie zależą od systemd, np.:

- no,
- on-success,
- on-failure,
- always.

## 10. WorkingDirectory

```ini
WorkingDirectory=/srv/example
```

Nie zakładaj, że proces startuje w katalogu binarki.

## 11. User

Nie uruchamiaj aplikacji jako root, jeśli nie musi.

```ini
User=example
Group=example
```

## 12. Dependencies

```ini
After=network-online.target
Wants=network-online.target
```

`After` ustala kolejność, nie oznacza automatycznie zależności.

## 13. systemd timer

Timer może zastąpić część zadań cron.

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

## 14. Timery

Lista:

```bash
systemctl list-timers
```

## 15. OnCalendar

Przykłady:

```text
daily
hourly
Mon..Fri 08:00
*-*-* 07:30:00
```

Sprawdzenie:

```bash
systemd-analyze calendar 'Mon..Fri 08:00'
```

## 16. Persistent

```ini
Persistent=true
```

Jeżeli komputer był wyłączony podczas terminu, timer może uruchomić zadanie po starcie.

## 17. cron

Edytuj crontab:

```bash
crontab -e
```

Lista:

```bash
crontab -l
```

## 18. Składnia cron

```text
minute hour day month weekday command
```

Przykład:

```cron
30 7 * * * /usr/local/bin/report
```

Codziennie o 07:30.

## 19. Przykłady cron

Co godzinę:

```cron
0 * * * * command
```

Od poniedziałku do piątku:

```cron
0 8 * * 1-5 command
```

Co 10 minut:

```cron
*/10 * * * * command
```

## 20. PATH w cron

Cron ma ograniczone środowisko.

Lepiej używać pełnych ścieżek:

```cron
/usr/bin/python3 /srv/app/task.py
```

## 21. Redirect logów

```cron
0 8 * * * /usr/local/bin/task >> /var/log/task.log 2>&1
```

## 22. Cron vs systemd timer

cron:

- prosty,
- szeroko znany,
- dobry dla prostych zadań.

systemd timer:

- integracja z journal,
- dependencies,
- service hardening,
- lepsza kontrola statusu,
- `Persistent=true`.

## 23. Scheduler aplikacyjny

Czasem scheduler jest częścią aplikacji.

Przykłady:

- kolejki,
- worker,
- harmonogram w backendzie.

Uważaj przy wielu instancjach aplikacji: każde uruchomienie może wykonać ten sam job.

## 24. Idempotency

Zadanie okresowe powinno być odporne na powtórzenie.

Przykład:

```text
job uruchomiony dwa razy
→ nie tworzy dwóch identycznych płatności
```

## 25. Lock

Przy jobach można stosować lock, aby uniknąć równoległego wykonania.

Przykład:

```bash
flock -n /run/report.lock /usr/local/bin/report
```

## 26. Timezone

Zawsze ustal, w jakiej strefie działa harmonogram.

Serwer może używać UTC.

## 27. Monitoring jobów

Nie wystarczy „cron istnieje”.

Monitoruj:

- exit code,
- czas wykonania,
- ostatni sukces,
- błędy,
- brak wykonania.

## 28. Co trzeba umieć

- napisać prosty service systemd,
- uruchamiać i diagnozować usługę,
- czytać journal,
- stworzyć timer,
- napisać cron expression,
- rozumieć różnicę cron/timer,
- projektować idempotentne joby.


## 29. Dokumentacja i źródła

Najpewniejszym źródłem dla konkretnego systemu są lokalne strony `man` odpowiadające zainstalowanej wersji:

```bash
man systemd.service
man systemd.timer
man systemd.time
man systemctl
man journalctl
man 5 crontab
```

Dokumentacja online:

- systemd project documentation  
  https://systemd.io/
- Debian `crontab(5)` dla Trixie  
  https://manpages.debian.org/trixie/cron/crontab.5.en.html

Przy zadaniach okresowych warto zawsze sprawdzić strefę czasową, środowisko procesu, logowanie wyniku oraz zachowanie po pominiętym terminie.
