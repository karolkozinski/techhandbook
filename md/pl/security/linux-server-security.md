---
id: "doc-025"
title: "Linux permissions i bezpieczeństwo serwera"
slug: "linux-permissions-i-bezpieczenstwo-serwera"
description: "Linux permissions i bezpieczeństwo serwera - praktyczne kompendium TechHandbook."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "linux"
  - "security"
  - "permissions"
  - "ssh"
  - "firewall"
---

# Linux permissions i bezpieczeństwo serwera

Bezpieczeństwo serwera zaczyna się od podstaw systemu: użytkowników, grup, praw dostępu, aktualizacji, ograniczenia usług i kontroli tego, co jest wystawione do sieci. To nie jest lista magicznych ustawień, tylko zestaw mechanizmów do świadomego ograniczania ryzyka.

Powiązane tematy: [SSH i zdalna administracja](techhandbook:doc-018), [Debian - desktop i serwer](techhandbook:doc-033), [Docker](techhandbook:doc-012) oraz [systemd, cron i schedulery](techhandbook:doc-052).

## 1. Użytkownicy i grupy

```bash
id
whoami
groups
```

Utworzenie:

```bash
sudo adduser app
```

Grupa:

```bash
sudo groupadd developers
sudo usermod -aG developers user
```

## 2. Uprawnienia

```bash
ls -l
```

Przykład:

```text
-rw-r----- 1 app developers config.yml
```

Znaczenie:

```text
owner: rw-
group: r--
others: ---
```

## 3. chmod

Symbolicznie:

```bash
chmod u+x script.sh
chmod g-w file
chmod o-r file
```

Liczbowo:

```text
r=4
w=2
x=1
```

Przykład:

```bash
chmod 640 config.yml
chmod 755 script.sh
```

## 4. chown

```bash
sudo chown app:app file
sudo chown -R app:app /srv/myapp
```

## 5. sudo

Nie pracuj stale jako root.

```bash
sudo command
```

Konfigurację sudo edytuj:

```bash
sudo visudo
```

## 6. SSH keys

Generowanie:

```bash
ssh-keygen -t ed25519
```

Kopiowanie:

```bash
ssh-copy-id user@server
```

## 7. sshd

Konfiguracja:

```text
/etc/ssh/sshd_config
```

Po zmianach:

```bash
sudo sshd -t
sudo systemctl reload ssh
```

Nigdy nie zamykaj aktywnej sesji przed sprawdzeniem nowego logowania.

## 8. Wyłączenie hasła

Po sprawdzeniu kluczy:

```text
PasswordAuthentication no
```

## 9. Root login

Często:

```text
PermitRootLogin prohibit-password
```

albo całkowite wyłączenie.

## 10. Firewall

Na Debianie możesz użyć nftables lub UFW.

UFW przykład:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

Status:

```bash
sudo ufw status verbose
```

## 11. Otwieraj minimum

Typowy web VPS:

```text
22/tcp  SSH
80/tcp  HTTP
443/tcp HTTPS
```

Baza PostgreSQL nie musi być publiczna, jeśli korzysta z niej tylko lokalny backend.

## 12. Aktualizacje

```bash
sudo apt update
sudo apt upgrade
```

Sprawdzaj komunikaty o usługach wymagających restartu.

## 13. Usługi

```bash
systemctl --type=service --state=running
```

Wyłącz zbędne:

```bash
sudo systemctl disable --now SERVICE
```

## 14. Proces jako osobny user

Systemd:

```ini
[Service]
User=myapp
Group=myapp
ExecStart=/srv/myapp/myapp
```

## 15. Sekrety

Plik:

```text
/etc/myapp/myapp.env
```

Uprawnienia:

```bash
sudo chown root:myapp /etc/myapp/myapp.env
sudo chmod 640 /etc/myapp/myapp.env
```

## 16. fail2ban

Może blokować powtarzające się próby logowania.

Nie zastępuje dobrych kluczy i konfiguracji SSH.

## 17. Logi SSH

```bash
journalctl -u ssh
```

## 18. Audyt portów

```bash
ss -lntup
```

Zadaj pytanie:
- dlaczego ten port jest otwarty?
- kto go używa?
- czy musi być publiczny?

## 19. Backup

Bez backupu nie ma sensownego bezpieczeństwa operacyjnego.

Backup powinien być:
- automatyczny,
- testowany,
- poza serwerem,
- wersjonowany/rotowany.

## 20. Zasada least privilege

Każdy element ma mieć tylko uprawnienia, których potrzebuje.

Dotyczy:
- userów,
- plików,
- baz,
- API,
- kontenerów,
- GitHub Actions.

## 21. Checklist nowego VPS

1. utwórz zwykłego usera,
2. dodaj klucz SSH,
3. sprawdź logowanie,
4. zaktualizuj system,
5. skonfiguruj firewall,
6. ogranicz SSH,
7. uruchamiaj aplikacje jako osobni userzy,
8. skonfiguruj backup,
9. sprawdź otwarte porty,
10. ustaw monitoring/logi.

## 22. Co trzeba umieć

- chmod/chown,
- user/group,
- SSH key auth,
- firewall,
- systemd service user,
- kontrola otwartych portów,
- podstawowy hardening VPS.

## Oficjalne źródła

- GNU Coreutils - prawa dostępu do plików: https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html
- OpenSSH sshd_config: https://man.openbsd.org/sshd_config
- Debian Security: https://www.debian.org/security/
