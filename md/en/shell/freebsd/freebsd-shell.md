---
id: "doc-029"
title: "FreeBSD — Practical Shell Handbook"
slug: "freebsd-practical-shell-handbook"
description: "FreeBSD is a complete Unix-like operating system. The base system, kernel and core userland are developed together, while third-party applications are…"
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "freebsd"
  - "shell"
  - "sh"
  - "tcsh"
---

# FreeBSD — Practical Shell Handbook

This handbook covers day-to-day FreeBSD administration from the terminal. For shell selection and configuration see [Shells in FreeBSD](techhandbook:doc-030), for broader administration see [FreeBSD as a Server](techhandbook:doc-034), and for automation see [Shell Scripting](techhandbook:doc-031).

# FreeBSD — Administration, System and Directories

FreeBSD is a complete Unix-like operating system. The base system, kernel and core userland are developed together, while third-party applications are usually installed under /usr/local.

## `su`

Switch to another user, usually root:

```sh
su -
```

Use direct root sessions only when necessary. For routine work, sudo or doas can provide narrower privilege elevation.

## FreeBSD version

```sh
freebsd-version
uname -a
```

Use freebsd-version for the installed base-system version and uname for kernel/platform information.

## Important directories

```text
/etc            base-system configuration
/usr/local/etc  third-party package configuration
/var/log        logs
/usr/home       common home location
/home           often points to /usr/home
/boot           boot files/config
/usr/local/bin  third-party user commands
/usr/local/sbin third-party admin commands
```

# 1. Shell, terminal and commands — what are you actually doing?

The terminal is the interface. The shell interprets your commands. FreeBSD commonly uses sh for root/system scripts and tcsh for some interactive accounts, but other shells can be installed.

# 2. `pwd` — where am I?

```sh
pwd
```

Prints the current working directory.

# 3. `ls` — what is in the directory?

```sh
ls
```

## Important options

### `-l`

Long listing with permissions, owner, size and timestamps:

```sh
ls -l
```

### `-a`

Include hidden files:

```sh
ls -a
```

### `-h`

Human-readable sizes when combined with long listing:

```sh
ls -lh
```

### `-t`

Sort by modification time:

```sh
ls -lt
```

### `-S`

Sort by size:

```sh
ls -lS
```

## Most common form

```sh
ls -lah
```

# 4. `cd` — change directory

```sh
cd /usr/local/etc
```

## Important variants

### Parent directory

```sh
cd ..
```

### Home directory

```sh
cd
cd ~
```

### Previous directory

```sh
cd -
```

# 5. Relative and absolute paths

Absolute path starts at `/`, for example `/var/log/messages`. Relative path starts from the current directory.

### `.`

Means the current directory.

### `..`

Means the parent directory.

# 6. `touch` — create an empty file or update timestamp

```sh
touch test.txt
```

# 7. `mkdir` — create directories

```sh
mkdir logs
```

## `-p`

Create parent directories as needed:

```sh
mkdir -p /tmp/demo/a/b
```

# 8. `cp` — copy

```sh
cp source.conf copy.conf
```

## `-r`

Recursive directory copy:

```sh
cp -r source_dir target_dir
```

## `-i`

Ask before overwrite:

```sh
cp -i file target
```

## `-v`

Verbose output:

```sh
cp -v file target
```

## Typical case

Back up a config before editing:

```sh
cp /usr/local/etc/nginx/nginx.conf /usr/local/etc/nginx/nginx.conf.bak
```

# 9. `mv` — move and rename

```sh
mv old.txt new.txt
mv file.txt /tmp/
```

## `-i`

Prompt before overwrite.

## `-v`

Show performed operations.

# 10. `rm` — delete

```sh
rm file.txt
```

## `-i`

Prompt before removal.

## `-r`

Remove directories recursively.

## `-f`

Force removal without prompting for missing files.

## `-rf`

Recursive forced removal. Treat it as dangerous because path mistakes can destroy large directory trees.

# 11. `cat` — quickly print a file

```sh
cat /etc/hosts
```

Good for small files. Use less for long files.

# 12. `less` — read large files comfortably

```sh
less /var/log/messages
```

Useful keys: `/` search, `n` next match, `G` end, `g` start, `q` quit.

# 13. `head` — start of a file

```sh
head file.txt
```

## `-n`

```sh
head -n 20 file.txt
```

# 14. `tail` — end of a file

```sh
tail file.txt
```

## `-n`

```sh
tail -n 50 /var/log/messages
```

## `-f`

Follow a growing log:

```sh
tail -f /var/log/messages
```

# 15. `grep` — search text

```sh
grep error /var/log/messages
```

## `-i`

Case-insensitive search.

## `-n`

Show line numbers.

## `-R`

Recursive directory search.

## `-v`

Invert match.

## `-E`

Use extended regular expressions.

## Very practical

```sh
grep -RniE 'error|warning' /usr/local/etc
```

# 16. `find` — find files

## `-name`

```sh
find /usr/local/etc -name '*.conf'
```

## `-iname`

Case-insensitive filename match.

## `-type`

```sh
find /var -type f
find /usr/local -type d
```

## `-mtime`

Find by modification age:

```sh
find /var/log -type f -mtime -7
```

## `-size`

Example:

```sh
find /var -type f -size +100M
```

# 17. `which`, `command -v`, `whereis` — where is a program?

```sh
which nginx
command -v sh
whereis nginx
```

command -v is portable shell logic; whereis also searches known source/manual locations.

# 18. `file` — what kind of file is this?

```sh
file /bin/sh
file archive.tar.gz
```

# 19. `stat` — detailed file information

```sh
stat file.txt
```

Shows size, ownership, permissions and timestamps.

# 20. `man` — command documentation

```sh
man service
man rc.conf
man 5 rc.conf
```

FreeBSD manual pages are first-class documentation.

# 21. `echo` — print text and variables

```sh
echo hello
echo "$HOME"
```

# 22. Redirection `>` and `>>`

`>` overwrites a file. `>>` appends.

```sh
echo test > file.txt
echo another >> file.txt
```

# 23. Pipe `|`

A pipe sends stdout of one command into stdin of another:

```sh
sockstat -4 -l | grep nginx
```

# 24. `sort`, `uniq`, `wc`

## `sort`

```sh
sort names.txt
```

## `uniq`

Usually after sort:

```sh
sort names.txt | uniq
```

## `wc`

Count lines, words or bytes:

```sh
wc -l file.txt
```

# 25. `whoami`, `id`, `groups`

```sh
whoami
id
groups
```

Use these to confirm identity and group memberships before debugging permission issues.

# 26. `who` and `w`

```sh
who
w
```

Show logged-in users; `w` also shows activity/load information.

# 28. `uname` — kernel and platform

## `-a`

```sh
uname -a
```

## `-r`

```sh
uname -r
```

# 30. `hostname`

```sh
hostname
```

# 31. `uptime`

```sh
uptime
```

Shows uptime and load averages.

# 32. `top` — processes and load

```sh
top
```

Use it for a quick view of CPU, memory and busy processes.

# 33. `ps` — process list

```sh
ps aux
```

# 34. `pgrep` — find PID by name

```sh
pgrep nginx
```

## `-f`

Match full command line.

## `-l`

Show process names with PIDs.

# 35. `kill` and `pkill`

```sh
kill PID
pkill processname
```

Try normal termination before stronger signals.

# 36. `df` — free filesystem space

```sh
df -h
```

# 37. `du` — directory size

## `-s`

Summary only.

## `-h`

Human-readable sizes:

```sh
du -sh /var/*
```

# 38. `mount` — what is mounted?

```sh
mount
```

On ZFS systems, also inspect `zfs list` and `zpool status`.

# 40. FreeBSD — disks

Useful commands:

```sh
geom disk list
gpart show
camcontrol devlist
```

# 41. ZFS

Core checks:

```sh
zpool status
zpool list
zfs list
zfs list -t snapshot
```

# 43. FreeBSD — `ifconfig`

```sh
ifconfig
ifconfig -a
```

FreeBSD uses ifconfig as a primary network-interface tool.

# 44. Routing on FreeBSD

```sh
netstat -rn
route -n get default
```

# 45. `ping`

```sh
ping 1.1.1.1
ping example.com
```

If IP works but hostname does not, investigate DNS.

# 46. `curl`

```sh
curl -I https://example.com
curl -v https://example.com
```

# 47. DNS — `host` and `dig`

```sh
host example.com
dig example.com
```

# 49. FreeBSD — `sockstat`

Show listening sockets:

```sh
sockstat -4 -6 -l
```

Find a port:

```sh
sockstat -4 -6 -l | grep ':8080'
```

# 50. `ssh`

```sh
ssh user@server
```

## Different port

```sh
ssh -p 2222 user@server
```

## More diagnostics

```sh
ssh -vvv user@server
```

# 51. `scp`

```sh
scp file user@server:/tmp/
scp user@server:/tmp/file .
```

# 52. `ssh-keygen`

```sh
ssh-keygen -t ed25519
```

# 53. `chmod`

## Add execute permission

```sh
chmod +x script.sh
```

## Numeric mode

```sh
chmod 640 config.conf
chmod 755 script.sh
```

# 54. `chown`

```sh
chown user:group file
```

# 57. FreeBSD — `pkg`

## Update catalogue

```sh
pkg update
```

## Upgrade packages

```sh
pkg upgrade
```

## Install

```sh
pkg install nginx
```

## Remove

```sh
pkg delete nginx
```

## Search

```sh
pkg search nginx
```

## Information

```sh
pkg info nginx
```

## All installed

```sh
pkg info
```

## Unneeded dependencies

```sh
pkg autoremove
```

## Which package owns a file

```sh
pkg which /usr/local/sbin/nginx
```

# 60. FreeBSD — services with `service`

```sh
service nginx status
service nginx start
service nginx stop
service nginx restart
```

Use `onestart` for a one-off start when the service is not enabled.

# 61. FreeBSD — `sysrc`

Read and modify rc.conf-style variables safely:

```sh
sysrc nginx_enable
sysrc nginx_enable=YES
sysrc nginx_enable=NO
```

# 62. FreeBSD — logs

Common location:

```text
/var/log
```

Typical system log:

```sh
tail -f /var/log/messages
```

# 63. FreeBSD — base system and packages

Remember the separation: `/etc` and base tools belong to the operating system; `/usr/local` is where third-party packages normally live.

# 64. FreeBSD — base-system updates

Update method depends on FreeBSD release and deployment model. Follow the procedure documented for your supported release and read release notes before upgrades.

# 66. `dmesg`

```sh
dmesg
dmesg | tail -n 50
```

Useful for boot, hardware, disk and driver messages.

# 68. FreeBSD — `sysctl`

Read kernel/system parameters:

```sh
sysctl hw.ncpu
sysctl hw.physmem
```

Temporary changes may be possible with `sysctl name=value`; persistent settings belong in the correct configuration file.

# 69. `date`

```sh
date
```

# 70. `history`

Shows previous shell commands. Exact behavior depends on the shell.

# 71. `Ctrl+R`

In shells that support reverse history search, Ctrl+R searches previous commands interactively.

# 72. Keyboard shortcuts

Common terminal/shell shortcuts include Ctrl+C to interrupt, Ctrl+D for EOF/logout in many shells, Ctrl+L to clear, and Ctrl+Z to suspend a foreground job.

# 73. `&&`, `||`, `;`

## `&&`

Run the next command only if the previous succeeded:

```sh
nginx -t && service nginx reload
```

## `||`

Run the next command if the previous failed.

## `;`

Run commands sequentially regardless of status.

# 74. Background processes

Append `&` to launch in background:

```sh
long-command &
```

For remote sessions, tmux is safer for long interactive work.

# 75. `tmux`

```sh
pkg install tmux
tmux new -s admin
tmux attach -t admin
```

A tmux session survives an SSH disconnect.

# 76. `tar` archives

Create:

```sh
tar -czf backup.tar.gz directory/
```

Extract:

```sh
tar -xzf backup.tar.gz
```

# 77. `gzip`, `gunzip`

```sh
gzip file
gunzip file.gz
```

# 78. `crontab`

```sh
crontab -e
crontab -l
```

Use cron for simple scheduled commands; FreeBSD also has the `periodic` framework for system maintenance.

# 82. Quick FreeBSD diagnostics

```sh
freebsd-version
uptime
df -h
zpool status
ifconfig
netstat -rn
sockstat -4 -6 -l
ps aux
tail -n 50 /var/log/messages
```

# Real-life examples — FreeBSD

## 1. Website stopped responding

```sh
service nginx status
nginx -t
sockstat -4 -6 -l | grep ':80\|:443'
tail -n 100 /var/log/nginx/error.log
curl -v http://127.0.0.1/
```

## 2. Disk is almost full

```sh
df -h
zfs list
du -sh /var/* | sort -h
```

## 3. Check ZFS health

```sh
zpool status
zpool list
zfs list
```

## 4. You forgot where nginx configuration is

```sh
pkg info -l nginx | grep conf
find /usr/local/etc -iname '*nginx*'
```

## 5. Who uses port 8080?

```sh
sockstat -4 -6 -l | grep ':8080'
```

## 6. Network does not work

```sh
ifconfig
netstat -rn
ping 1.1.1.1
host example.com
cat /etc/resolv.conf
```

## 7. Install nginx from scratch

```sh
pkg install nginx
sysrc nginx_enable=YES
nginx -t
service nginx start
sockstat -4 -6 -l | grep nginx
```

## 8. Configuration changed and nginx will not start

```sh
nginx -t
service nginx status
tail -n 100 /var/log/nginx/error.log
```

Fix syntax before repeatedly restarting.

## 9. Application consumes CPU

```sh
top
ps aux
pgrep -af appname
```

## 10. Quick recognition of an unfamiliar server

```sh
freebsd-version
hostname
uptime
df -h
zpool status
pkg info | head
service -e
sockstat -4 -6 -l
```

## 11. Package update

```sh
pkg update
pkg upgrade
```

Read package messages after upgrades.

## 12. Classic base-system update

Follow the supported update mechanism for the installed FreeBSD release. Create a ZFS boot environment or other rollback point where appropriate before major changes.

## 13. Long process over SSH

```sh
tmux new -s work
long-command
```

Detach and later reattach instead of relying on one SSH connection.

## 14. Configuration backup

```sh
tar -czf /tmp/etc-backup.tar.gz /etc /usr/local/etc
```

For real backups, copy data off the machine and include application state/databases separately.

# FreeBSD — minimal set to remember

```text
pwd / ls / cd
cp / mv / rm
less / tail / grep / find
ps / top / kill
df / du
ifconfig / netstat / sockstat
ssh / scp
pkg
service / sysrc
zpool / zfs
dmesg / sysctl
tmux / tar / crontab
```

The practical FreeBSD pattern is: inspect first, use native tools, remember the `/usr/local` split, and read the manual page before forcing a change.

## Official references

- FreeBSD Handbook: https://docs.freebsd.org/en/books/handbook/
- FreeBSD manual pages: https://man.freebsd.org/
- FreeBSD release information: https://www.freebsd.org/releases/
