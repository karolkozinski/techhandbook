---
id: "doc-025"
title: "Linux Permissions and Server Security"
slug: "linux-permissions-and-server-security"
description: "Linux Permissions and Server Security - a practical TechHandbook reference."
lang: "en"
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

# Linux Permissions and Server Security

Server security starts with operating-system basics: users, groups, permissions, updates, limiting services and controlling what is exposed to the network. This is not a list of magic settings, but a set of mechanisms for reducing risk deliberately.

Related topics: [SSH and Remote Administration](techhandbook:doc-018), [Debian Desktop and Server](techhandbook:doc-033), [Docker](techhandbook:doc-012) and [systemd, cron and Schedulers](techhandbook:doc-052).

## 1. Users and groups

```bash
id
whoami
groups
sudo adduser app
sudo groupadd developers
sudo usermod -aG developers user
```

## 2. Permissions

```bash
ls -l
```

Example:

```text
-rw-r----- 1 app developers config.yml
```

Meaning:

```text
owner: rw-
group: r--
others: ---
```

## 3. chmod

Symbolic:

```bash
chmod u+x script.sh
chmod g-w file
chmod o-r file
```

Numeric:

```text
r=4
w=2
x=1
```

Examples:

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

Do not work permanently as root.

```bash
sudo command
sudo visudo
```

## 6. SSH keys

```bash
ssh-keygen -t ed25519
ssh-copy-id user@server
```

## 7. sshd

Configuration:

```text
/etc/ssh/sshd_config
```

After changes:

```bash
sudo sshd -t
sudo systemctl reload ssh
```

Never close the active session before confirming that a new login works.

## 8. Disable password authentication

After verifying key login:

```text
PasswordAuthentication no
```

## 9. Root login

Common setting:

```text
PermitRootLogin prohibit-password
```

or disable it completely.

## 10. Firewall

On Debian you can use nftables or UFW.

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status verbose
```

## 11. Open the minimum

Typical web VPS:

```text
22/tcp  SSH
80/tcp  HTTP
443/tcp HTTPS
```

PostgreSQL does not need to be public if only the local backend uses it.

## 12. Updates

```bash
sudo apt update
sudo apt upgrade
```

Pay attention to services that require restart.

## 13. Services

```bash
systemctl --type=service --state=running
sudo systemctl disable --now SERVICE
```

Disable unnecessary services.

## 14. Separate service user

```ini
[Service]
User=myapp
Group=myapp
ExecStart=/srv/myapp/myapp
```

## 15. Secrets

Example file:

```text
/etc/myapp/myapp.env
```

Permissions:

```bash
sudo chown root:myapp /etc/myapp/myapp.env
sudo chmod 640 /etc/myapp/myapp.env
```

## 16. fail2ban

It can block repeated login attempts, but it does not replace good SSH keys and configuration.

## 17. SSH logs

```bash
journalctl -u ssh
```

## 18. Port audit

```bash
ss -lntup
```

Ask: why is this port open, which process uses it and does it need to be public?

## 19. Backup

Operational security without backups is incomplete.

Backups should be automated, tested, off-server and rotated/versioned.

## 20. Least privilege

Every component should have only the permissions it needs: users, files, databases, APIs, containers and CI/CD.

## 21. New VPS checklist

1. create a normal user,
2. add an SSH key,
3. verify login,
4. update the system,
5. configure firewall,
6. restrict SSH,
7. run applications as separate users,
8. configure backups,
9. inspect open ports,
10. configure monitoring and logs.

## 22. What you should know

You should understand chmod/chown, users/groups, SSH key authentication, firewalling, systemd service users, open-port inspection and basic VPS hardening.

## Official references

- GNU Coreutils - file permissions: https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html
- OpenSSH sshd_config: https://man.openbsd.org/sshd_config
- Debian Security: https://www.debian.org/security/
