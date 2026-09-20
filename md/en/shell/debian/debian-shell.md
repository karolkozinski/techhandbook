---
id: "doc-027"
title: "Debian — Practical Shell Handbook"
slug: "debian-practical-shell-handbook"
description: "Debian is a Linux distribution built around the Linux kernel, GNU/user-space tools, APT/dpkg package management and usually systemd."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "debian"
  - "shell"
  - "bash"
---

# Debian — Practical Shell Handbook

# Debian — Administrator, System and Directories

Debian is a Linux distribution built around the Linux kernel, GNU/user-space tools, APT/dpkg package management and usually systemd.

## `sudo`

Run one command with administrative privileges:

```bash
sudo COMMAND
```

Use sudo instead of staying logged in as root for routine administration.

## Debian version

```bash
cat /etc/os-release
cat /etc/debian_version
uname -a
```

## Important directories

```text
/etc        system configuration
/var/log    logs
/home       user homes
/root       root home
/usr        programs/libraries
/usr/local  locally installed software
/srv        service data
/run        runtime state
/tmp        temporary files
```

# 1. Shell, terminal and commands — what are you actually doing?

The terminal displays input/output. The shell interprets commands. Bash is common on Debian interactive accounts, while `/bin/sh` is typically dash for system scripting.

# 2. `pwd` — where am I?

```bash
pwd
```

# 3. `ls` — what is in the directory?

```bash
ls
```

## Important options

### `-l`

Long listing with permissions, owner, size and timestamps.

### `-a`

Include hidden files.

### `-h`

Human-readable sizes with long listing.

### `-t`

Sort by modification time.

### `-S`

Sort by size.

## Most common form

```bash
ls -lah
```

# 4. `cd` — change directory

```bash
cd /etc
```

## Important variants

### Parent directory

```bash
cd ..
```

### Home directory

```bash
cd
cd ~
```

### Previous directory

```bash
cd -
```

# 5. Relative and absolute paths

Absolute paths begin with `/`. Relative paths are interpreted from the current directory.

### `.`

Current directory.

### `..`

Parent directory.

# 6. `touch` — create empty file and update modification time

```bash
touch file.txt
```

# 7. `mkdir` — create directories

```bash
mkdir logs
```

## `-p`

Create missing parents:

```bash
mkdir -p project/logs/archive
```

# 8. `cp` — copy

```bash
cp source target
```

## `-r`

Recursive directory copy.

## `-i`

Prompt before overwrite.

## `-v`

Verbose output.

## Typical case

Back up a configuration file before editing:

```bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
```

# 9. `mv` — move and rename

```bash
mv old.txt new.txt
```

## `-i`

Prompt before overwrite.

## `-v`

Show performed operations.

# 10. `rm` — delete

```bash
rm file.txt
```

## `-i`

Prompt before removal.

## `-r`

Recursive deletion.

## `-f`

Force mode.

## `-rf`

Recursive force. Dangerous when the path is wrong. Never type it mechanically.

# 11. `cat` — quickly display a file

```bash
cat /etc/hosts
```

# 12. `less` — read large files comfortably

```bash
less /var/log/syslog
```

Useful keys: `/` search, `n` next, `G` end, `g` start, `q` quit.

# 13. `head` — start of a file

```bash
head file.txt
```

## `-n`

```bash
head -n 20 file.txt
```

# 14. `tail` — end of a file

```bash
tail file.txt
```

## `-n`

```bash
tail -n 50 file.txt
```

## `-f`

Follow a growing file:

```bash
tail -f /var/log/nginx/error.log
```

# 15. `grep` — search text

```bash
grep error file.log
```

## `-i`

Case-insensitive.

## `-n`

Show line numbers.

## `-R`

Recursive search.

## `-v`

Invert match.

## `-E`

Extended regular expressions.

## Very practical

```bash
grep -RniE 'error|warning' /etc /var/log 2>/dev/null
```

# 16. `find` — find files

## `-name`

```bash
find /etc -name '*.conf'
```

## `-iname`

Case-insensitive name matching.

## `-type`

```bash
find /var -type f
```

## `-mtime`

```bash
find /var/log -type f -mtime -7
```

## `-size`

```bash
find /var -type f -size +100M
```

# 17. `which`, `command -v`, `whereis` — where is a program?

```bash
which nginx
command -v bash
whereis nginx
```

# 18. `file` — what kind of file is this?

```bash
file /bin/bash
```

# 19. `stat` — detailed file information

```bash
stat file.txt
```

# 20. `man` — command documentation

```bash
man systemctl
man 5 sshd_config
```

# 21. `echo` — print text and variables

```bash
echo hello
echo "$HOME"
```

# 22. Redirection `>` and `>>`

`>` overwrites, `>>` appends.

```bash
echo test > file.txt
echo second >> file.txt
```

# 23. Pipe `|`

```bash
ss -lntp | grep ':8080'
```

# 24. `sort`, `uniq`, `wc`

## `sort`

```bash
sort names.txt
```

## `uniq`

```bash
sort names.txt | uniq
```

## `wc`

```bash
wc -l file.txt
```

# 25. `whoami`, `id`, `groups`

```bash
whoami
id
groups
```

# 26. `who` and `w`

```bash
who
w
```

# 28. `uname` — kernel and platform

## `-a`

```bash
uname -a
```

## `-r`

```bash
uname -r
```

# 30. `hostname`

```bash
hostname
hostnamectl
```

# 31. `uptime`

```bash
uptime
```

# 32. `top` — processes and load

```bash
top
```

Install htop if you prefer a more interactive display.

# 33. `ps` — process list

```bash
ps aux
```

# 34. `pgrep` — find PID by name

## `-f`

Match full command line.

## `-l`

Show process names.

```bash
pgrep -af nginx
```

# 35. `kill` and `pkill`

```bash
kill PID
pkill processname
```

# 36. `df` — free filesystem space

```bash
df -h
```

# 37. `du` — how much space does a directory use?

## `-s`

Summary.

## `-h`

Human-readable sizes.

```bash
du -sh /var/*
```

# 38. `mount` — what is mounted?

```bash
mount
findmnt
```

# 39. `lsblk` — disks on Debian

```bash
lsblk
lsblk -f
```

# 42. Debian — `ip`

```bash
ip addr
ip link
ip route
```

# 45. `ping`

```bash
ping 1.1.1.1
ping example.com
```

# 46. `curl`

```bash
curl -I https://example.com
curl -v https://example.com
```

# 47. DNS — `host` and `dig`

```bash
host example.com
dig example.com
```

Install `dnsutils` if needed.

# 48. Debian — `ss`

```bash
ss -lntup
```

Use it to see listening ports and sockets.

# 50. `ssh`

```bash
ssh user@server
```

## Different port

```bash
ssh -p 2222 user@server
```

## More diagnostics

```bash
ssh -vvv user@server
```

# 51. `scp`

```bash
scp file user@server:/tmp/
```

# 52. `ssh-keygen`

```bash
ssh-keygen -t ed25519
```

# 53. `chmod`

## Add execute permission

```bash
chmod +x script.sh
```

## Numeric mode

```bash
chmod 640 config.conf
chmod 755 script.sh
```

# 54. `chown`

```bash
sudo chown user:group file
```

# 55. Debian — `apt`

## `apt update`

Refresh package metadata:

```bash
sudo apt update
```

## `apt upgrade`

Upgrade installed packages without removing installed packages to satisfy dependency changes:

```bash
sudo apt upgrade
```

## Typical update

```bash
sudo apt update && sudo apt upgrade
```

## `apt full-upgrade`

Allows dependency changes/removals when required. Review the proposed transaction.

## Install

```bash
sudo apt install nginx
```

## Remove

```bash
sudo apt remove nginx
```

## Purge

```bash
sudo apt purge nginx
```

## Autoremove

```bash
sudo apt autoremove
```

## Search

```bash
apt search nginx
```

## Information

```bash
apt show nginx
apt policy nginx
```

# 56. Debian — `dpkg`

```bash
dpkg -l
dpkg -L PACKAGE
dpkg -S /path/to/file
```

# 58. Debian — systemd and `systemctl`

```bash
systemctl status nginx
sudo systemctl start nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl enable --now nginx
```

# 59. Debian — `journalctl`

```bash
journalctl -u nginx
journalctl -u nginx -f
journalctl -b
journalctl -k
```

# 65. Debian — NetworkManager

```bash
nmcli device
nmcli connection show
nmcli connection show --active
```

# 66. `dmesg`

```bash
dmesg | tail -n 50
```

On restricted systems use `sudo dmesg` if required.

# 67. `lscpu`, `lspci`, `lsusb` — Debian

```bash
lscpu
lspci
lsusb
```

# 69. `date`

```bash
date
timedatectl
```

# 70. `history`

```bash
history
```

# 71. `Ctrl+R`

Reverse-search previous shell commands interactively.

# 72. Keyboard shortcuts

Common: Ctrl+C interrupt, Ctrl+D EOF/logout, Ctrl+L clear, Ctrl+Z suspend, Ctrl+A line start, Ctrl+E line end.

# 73. `&&`, `||`, `;`

## `&&`

Run next command only on success:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## `||`

Run next command only if the previous command failed.

## `;`

Run sequentially regardless of exit status.

# 74. Background processes

```bash
long-command &
jobs
fg
bg
```

# 75. `tmux`

```bash
sudo apt install tmux
tmux new -s admin
tmux attach -t admin
```

# 76. `tar` archives

```bash
tar -czf backup.tar.gz directory/
tar -xzf backup.tar.gz
```

# 77. `gzip`, `gunzip`

```bash
gzip file
gunzip file.gz
```

# 78. `crontab`

```bash
crontab -e
crontab -l
```

# 81. Quick Debian diagnostics

```bash
cat /etc/os-release
uptime
df -h
free -h
ip addr
ip route
ss -lntup
systemctl --failed
journalctl -p err -b
```

# Real-life examples — Debian

## 1. Website stopped responding

```bash
systemctl status nginx
nginx -t
ss -lntp | grep -E ':80|:443'
journalctl -u nginx -n 100
curl -v http://127.0.0.1/
```

## 2. Disk is almost full

```bash
df -h
df -i
sudo du -xhd1 /var | sort -h
```

## 3. You forgot where configuration is

```bash
dpkg -L PACKAGE | grep -E '/etc/|conf'
find /etc -iname '*name*'
```

## 4. Who uses port 8080?

```bash
sudo ss -lntp | grep ':8080'
sudo lsof -i :8080
```

## 5. Network does not work

```bash
ip addr
ip route
ping 1.1.1.1
dig example.com
resolvectl status
```

## 6. Safe SSH configuration change

```bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
sudoedit /etc/ssh/sshd_config
sudo sshd -t
sudo systemctl reload ssh
```

Keep the current SSH session open and test a second login before disconnecting.

## 7. Application consumes CPU

```bash
top
ps aux --sort=-%cpu | head
pgrep -af appname
```

## 8. Watch logs while testing an application

```bash
journalctl -u myapp -f
```

## 9. Quickly recognize an unfamiliar server

```bash
cat /etc/os-release
hostname
uptime
df -h
ip addr
systemctl --failed
ss -lntup
```

## 10. Update Debian

```bash
sudo apt update
sudo apt upgrade
```

Review held packages and whether a reboot is required.

## 11. Long process over SSH

```bash
tmux new -s work
long-command
```

## 12. System configuration backup

```bash
sudo tar -czf /tmp/etc-backup.tar.gz /etc
```

For a real backup, copy it off the server and include application data/databases separately.

# Debian — minimal set to remember

```text
pwd / ls / cd
cp / mv / rm
less / tail / grep / find
ps / top / kill
df / du / lsblk
ip / ss / dig / curl
ssh / scp
apt / dpkg
systemctl / journalctl
tmux / tar / crontab
```

The practical Debian pattern is: inspect state, read logs, test one layer at a time, then make the smallest change you understand.
