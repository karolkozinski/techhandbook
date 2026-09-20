---
id: "doc-018"
title: "SSH i zdalna administracja"
slug: "ssh-i-zdalna-administracja"
description: "SSH (Secure Shell) to podstawowy protokół do bezpiecznego, zdalnego logowania i wykonywania poleceń na systemach uniksowych. Ten materiał obejmuje codzienny…"
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "ssh"
  - "scp"
  - "sftp"
  - "rsync"
  - "tunnel"
---

# SSH i zdalna administracja

SSH (Secure Shell) to podstawowy protokół do bezpiecznego, zdalnego logowania i wykonywania poleceń na systemach uniksowych. Ten materiał obejmuje codzienny zestaw narzędzi: połączenia, klucze, konfigurację klienta, transfer plików, tunneling, host keys oraz diagnostykę.

**Kiedy ten materiał jest przydatny:** przy administracji VPS-em lub serwerem w LAN, automatyzacji połączeń, bezpiecznym kopiowaniu plików, dostępie do usług przez tunel oraz diagnozowaniu problemów z uwierzytelnianiem.

Dla kontekstu systemowego warto znać także [Debiana jako desktop i serwer](techhandbook:doc-033), [FreeBSD jako serwer](techhandbook:doc-034) oraz [Linux permissions i bezpieczeństwo serwera](techhandbook:doc-025).

## 1. SSH

Podstawowe połączenie:

```bash
ssh user@server
```

Port:

```bash
ssh -p 2222 user@server
```

## 2. Klucze

```bash
ssh-keygen -t ed25519
```

Domyślnie:

```text
~/.ssh/id_ed25519
~/.ssh/id_ed25519.pub
```

Prywatnego klucza nie udostępniaj.

## 3. Kopiowanie klucza

```bash
ssh-copy-id user@server
```

## 4. authorized_keys

Na serwerze:

```text
~/.ssh/authorized_keys
```

Uprawnienia:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

## 5. ssh config

```text
~/.ssh/config
```

Przykład:

```sshconfig
Host myvps
    HostName 203.0.113.10
    User user
    IdentityFile ~/.ssh/id_ed25519
```

Potem:

```bash
ssh myvps
```

## 6. SCP

Plik na serwer:

```bash
scp file.txt myvps:/tmp/
```

Z serwera:

```bash
scp myvps:/var/log/app.log .
```

## 7. rsync

Lepszy do katalogów i aktualizacji:

```bash
rsync -avz ./site/ myvps:/var/www/site/
```

Usuń po stronie docelowej to, czego nie ma źródłowo:

```bash
rsync -avz --delete ./site/ myvps:/var/www/site/
```

Używaj `--delete` ostrożnie.

## 8. SFTP

```bash
sftp myvps
```

Komendy:

```text
ls
cd
lcd
get
put
exit
```

## 9. Agent SSH

```bash
ssh-add ~/.ssh/id_ed25519
ssh-add -l
```

Agent przechowuje odblokowany klucz w sesji.

## 10. Forwarding lokalny

```bash
ssh -L 5433:127.0.0.1:5432 myvps
```

Teraz lokalny port 5433 tuneluje do PostgreSQL na serwerze.

## 11. Remote forwarding

```bash
ssh -R 9000:127.0.0.1:3000 myvps
```

Pozwala wystawić lokalną usługę po stronie zdalnej.

## 12. SOCKS proxy

```bash
ssh -D 1080 myvps
```

Tworzy lokalny proxy SOCKS.

## 13. ProxyJump

```sshconfig
Host internal
    HostName 10.0.0.20
    User user
    ProxyJump bastion
```

## 14. Komenda zdalna

```bash
ssh myvps 'systemctl status nginx'
```

## 15. SSHFS

Jeśli zainstalowane:

```bash
sshfs myvps:/srv/project ~/mnt/project
```

## 16. Diagnostyka

Verbose:

```bash
ssh -v myvps
ssh -vvv myvps
```

## 17. Known hosts

SSH zapamiętuje fingerprint hosta:

```text
~/.ssh/known_hosts
```

Zmiana fingerprintu może być:
- legalną reinstalacją serwera,
- albo sygnałem ataku MITM.

Nie ignoruj komunikatu bez sprawdzenia.

## 18. Keepalive

Config:

```sshconfig
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

## 19. Bezpieczeństwo

- klucze zamiast haseł,
- passphrase do klucza,
- ograniczone uprawnienia,
- nie kopiuj prywatnych kluczy bez potrzeby,
- nie używaj root jako codziennego konta.

## 20. Co trzeba umieć

- połączyć się kluczem,
- skonfigurować `~/.ssh/config`,
- używać scp/rsync/sftp,
- zrobić tunnel lokalny,
- diagnozować przez `ssh -v`.


## 21. Dokumentacja i źródła

OpenSSH jest najlepiej dokumentowany przez własne strony podręcznika:

- `ssh(1)`  
  https://man.openbsd.org/ssh
- `ssh_config(5)`  
  https://man.openbsd.org/ssh_config
- `sshd_config(5)`  
  https://man.openbsd.org/sshd_config
- `ssh-keygen(1)`  
  https://man.openbsd.org/ssh-keygen
- `ssh-agent(1)`  
  https://man.openbsd.org/ssh-agent

Klucz prywatny należy traktować jak sekret. Klucz publiczny może zostać umieszczony w `~/.ssh/authorized_keys` na hoście docelowym.
