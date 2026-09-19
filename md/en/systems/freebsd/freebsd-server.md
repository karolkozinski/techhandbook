# FreeBSD as a Server — Administrator Handbook

## 1. How to think about FreeBSD

FreeBSD is a complete operating system: kernel, base userland, documentation and release engineering are developed together. Third-party software is added through packages or Ports.

## 2. System version

```bash
freebsd-version
uname -a
```

## 3. Important directories

```text
/etc            base-system configuration
/usr/local      third-party software
/usr/local/etc  package configuration
/var            logs and changing data
/home           user homes
/usr/home       common historical home location
/boot           boot configuration
```

## 4. Minimal administrator shell

Navigation and files:

```bash
pwd
ls -lah
cd /path
cp
mv
rm
less
tail
grep
find
```

Processes and help:

```bash
ps aux
top
pgrep
kill
man COMMAND
```

## 5. Root and permissions

Use root only for administrative tasks. If sudo or doas is installed, use privilege elevation rather than working permanently as root.

## 6. Users and groups

Create interactively:

```bash
adduser
```

pw utility:

```bash
pw useradd USER -m
pw userdel USER -r
pw groupshow GROUP
```

## 7. Packages — pkg

```bash
pkg update
pkg upgrade
pkg install PACKAGE
pkg delete PACKAGE
pkg info
pkg search NAME
pkg autoremove
pkg audit -F
pkg which FILE
pkg info -l PACKAGE
```

## 8. Packages vs Ports

Packages are prebuilt binaries and are the practical default for most servers. Ports build software from source and are useful when compile-time options or custom builds are required.

## 9. Service system

FreeBSD services use rc.d scripts and rc.conf-style configuration rather than systemd.

## 10. Service scripts

Base-system scripts live under /etc/rc.d. Package service scripts usually live under /usr/local/etc/rc.d.

## 11. Managing services

```bash
service -e
service nginx status
service nginx start
service nginx stop
service nginx restart
service nginx reload
```

## 12. Why service start may fail

A service may need to be enabled in rc.conf before a normal start. For one-off manual starts, rc.d supports onestart/onestop/onerestart.

## 13. rc.conf and sysrc

Read:

```bash
sysrc nginx_enable
```

Enable:

```bash
sysrc nginx_enable=YES
```

Disable/remove:

```bash
sysrc nginx_enable=NO
sysrc -x nginx_enable
```

Use sysrc rather than editing rc.conf mechanically when changing single values.

## 14. Typical new-service workflow

Install package, inspect config, validate syntax, enable with sysrc, start service, check status, check listening port and inspect logs.

## 15. onestart and force commands

```bash
service nginx onestart
service nginx onestop
service nginx onerestart
```

force* variants bypass some rc checks and should be used only when you understand why.

## 16. Service configuration paths

Base services usually use /etc. Package services usually use /usr/local/etc.

## 17. Your own application as an rc.d service

Typical rc.d script metadata includes PROVIDE, REQUIRE and KEYWORD lines. Use daemon(8) where appropriate to supervise foreground applications.

Example concept:

```sh
# PROVIDE: myapp
# REQUIRE: NETWORKING
# KEYWORD: shutdown
```

## 18. daemon(8)

daemon can detach, create pid files, restart or supervise processes depending on options. It is useful for wrapping custom services.

## 19. Updates

Third-party packages:

```bash
pkg update
pkg upgrade
```

Base-system update method depends on FreeBSD release generation and deployment model. On classic supported release systems, freebsd-update may be used.

## 20. Boot Environments

On ZFS-root systems, boot environments provide a powerful rollback mechanism around upgrades and risky changes. They are not a replacement for backup.

## 21. Networking

```bash
ifconfig
netstat -rn
route -n get default
sockstat -4 -6 -l
ping HOST
dig DOMAIN
curl -v URL
```

Persistent interface configuration is usually stored in /etc/rc.conf.

## 22. DNS and hosts

Resolver configuration uses /etc/resolv.conf. Static name mappings use /etc/hosts.

## 23. SSH

Enable:

```bash
sysrc sshd_enable=YES
service sshd start
```

Keys:

```bash
ssh-keygen -t ed25519
ssh-copy-id user@server
```

Server configuration is under /etc/ssh/sshd_config. Prefer key authentication and restricted root access.

## 24. Firewall — PF

Enable PF carefully and keep console access when testing remote firewall changes.

Example rc.conf settings:

```text
pf_enable="YES"
pf_rules="/etc/pf.conf"
```

Validate rules before loading:

```bash
pfctl -nf /etc/pf.conf
```

## 25. Minimal PF idea

Allow loopback, established traffic, SSH from trusted networks and only required public service ports. Block the rest according to your network model.

## 26. Processes and resources

```bash
top
ps aux
pgrep -af NAME
sysctl hw.physmem
sysctl hw.ncpu
uptime
```

## 27. Disks and ZFS

Disk tools:

```bash
geom disk list
gpart show
camcontrol devlist
```

ZFS:

```bash
zpool status
zpool list
zfs list
```

## 28. ZFS concepts

Pool = storage pool. Dataset = filesystem-like ZFS object with its own properties.

Create dataset:

```bash
zfs create tank/apps
```

Compression:

```bash
zfs set compression=lz4 tank/apps
```

## 29. ZFS snapshots

```bash
zfs snapshot tank/apps@before-upgrade
zfs list -t snapshot
```

Snapshots are fast local restore points, not independent backups.

## 30. ZFS scrub

```bash
zpool scrub tank
zpool status tank
```

Scrub verifies data against checksums and repairs when redundant copies are available.

## 31. ZFS send/receive

Useful for replication:

```bash
zfs send tank/apps@snap | ssh backup zfs receive backup/apps
```

## 32. SMART

Install smartmontools if needed and inspect drive health:

```bash
smartctl -a /dev/ada0
```

## 33. Logs

Important log directory: /var/log.

Follow:

```bash
tail -f /var/log/messages
```

syslog and newsyslog handle logging/rotation for many system components.

## 34. Cron and periodic

```bash
crontab -e
crontab -l
```

FreeBSD also has periodic for scheduled system-maintenance tasks.

## 35. sysctl

Read:

```bash
sysctl kern.ostype
```

Temporary change:

```bash
sysctl net.inet.ip.forwarding=1
```

Persistent tunables may belong in /etc/sysctl.conf; loader-time settings belong in /boot/loader.conf where appropriate.

## 36. Kernel modules

Inspect loaded modules with kldstat. Load with kldload when appropriate. Persistent boot loading may use loader.conf.

## 37. Jails

Jails provide OS-level isolation native to FreeBSD.

Typical uses: isolate services, separate application environments and reduce blast radius.

Basic management depends on your jail framework/configuration. Native commands include jail, jls and jexec.

```bash
jls
jexec JID /bin/sh
```

## 38. Service jails

Newer FreeBSD releases continue to evolve jail/service integration. Follow the Handbook and release documentation for the exact supported mechanism in your version.

## 39. Backup

Back up databases logically where appropriate, configuration files and application data. Use ZFS snapshots/send-receive as part of a strategy, but keep an independent copy.

## 40. Monitoring basics

Monitor uptime, load, memory, pool health, disk health, service state, listening ports, logs and backup success.

## 41. Listening ports

```bash
sockstat -4 -6 -l
```

A common failure is an application listening only on 127.0.0.1 when it is expected to serve LAN traffic, or listening publicly when only a reverse proxy should reach it.

## 42. Reverse proxy with nginx

Package config is usually under /usr/local/etc/nginx.

Test:

```bash
nginx -t
```

Example proxy:

```nginx
server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
    }
}
```

## 43. Databases as services

PostgreSQL, Redis and similar packages follow the same general lifecycle: install, initialize if required, enable, configure, start, inspect ports/logs and back up data.

## 44. WireGuard

FreeBSD supports WireGuard solutions depending on version/package/kernel support. Treat VPN routing and firewall rules as one network design, not separate magic layers.

## 45. Layered network diagnostics

Check in order: interface, IP address, route, gateway, Internet by IP, DNS, firewall and listening service.

## 46. Universal service troubleshooting

Check: package/script exists, service enabled, status, config syntax, startup error, logs, process, port and firewall.

## 47. Boot process

rc.d ordering is driven by dependency metadata such as PROVIDE, REQUIRE, BEFORE and KEYWORD.

## 48. Reboot and shutdown

```bash
shutdown -r now
shutdown -p now
reboot
```

After reboot, verify critical services, network, pools and mounts rather than assuming success.

## 49. Security baseline

Use updates, SSH keys, minimal root login, PF, service-specific users, least privilege, backups and logs. Do not expose ports without a reason.

## 50. Service users and file permissions

Run applications under dedicated users with no interactive login when appropriate. Avoid chmod 777 as a troubleshooting method.

## 51. New server workflow

```text
install FreeBSD
→ update
→ create admin access
→ SSH keys
→ PF
→ ZFS/boot environment strategy
→ backups/monitoring
→ services
```

## 52. Example application-server architecture

```text
Internet
↓
PF
↓
nginx
↓
application on localhost/jail
↓
database/storage
```

## 53. Useful packages

Examples: vim/neovim, tmux, curl, git, rsync, smartmontools, nginx and monitoring tools appropriate to your environment.

## 54. Documentation

FreeBSD man pages are first-class documentation. Examples:

```bash
man rc.conf
man service
man sysrc
man jail
man pf.conf
man zfs
```

Also use the FreeBSD Handbook and release notes for your exact version.

## 55. Daily server check

```bash
uptime
zpool status
df -h
sockstat -4 -6 -l
service -e
tail -n 50 /var/log/messages
```

## 56. After a configuration change

Validate syntax, reload only the affected service, inspect logs and test from the local host before testing remotely.

## 57. Weekly/monthly review

Review updates, pkg audit, SMART, ZFS scrub/health, backup success, disk growth and stale services/accounts.

## 58. Differences from Debian/Linux

FreeBSD uses rc.d/sysrc rather than systemd, ifconfig rather than ip as the core network tool, sockstat for sockets, /usr/local for packages and native jails/ZFS integration.

## 59. What not to do

Do not edit generated files blindly, compile everything from Ports without a reason, run every service as root, open every port, use chmod 777 to solve permissions, reboot for every service problem or treat mirrors/snapshots as backups.

## 60. Example: custom Go app

Create a service user, install binary under /usr/local/bin or /srv-style application path, store config under /usr/local/etc/app, add rc.d script, enable with sysrc, start, inspect sockstat and put nginx in front if needed.

## 61. Example: safe nginx change

Back up config, edit, run nginx -t, reload, inspect logs and curl the endpoint.

## 62. Example: service broke after package update

Read pkg messages, compare config changes, inspect service logs, validate syntax and only then roll back or change config.

## 63. Example: app failed after reboot

Check sysrc enable flag, rc.d dependencies, filesystem mounts, network readiness and service logs.

## 64. Example: local works, LAN does not

Check bind address, sockstat, PF and route/interface state.

## 65. Example: disk full

```bash
df -h
zfs list
du -sh /var/*
```

## 66. Example: suspected disk issue

Check zpool status, SMART, dmesg and recent I/O errors before replacing hardware blindly.

## 67. Administration philosophy

FreeBSD rewards explicit configuration and understanding of the base system. Change one layer at a time, use built-in documentation and keep rollback options.

## 68. Minimal workflow

```text
status → logs → config test → process → port → firewall → remote test
```

## 69. Cheat sheet — services

```bash
service NAME status
service NAME restart
sysrc NAME_enable=YES
```

## 70. Cheat sheet — packages

```bash
pkg update
pkg upgrade
pkg install
pkg info
pkg audit -F
```

## 71. Cheat sheet — network

```bash
ifconfig
netstat -rn
sockstat -4 -6 -l
ping
dig
curl
```

## 72. Cheat sheet — ZFS

```bash
zpool status
zfs list
zfs snapshot
zpool scrub
zfs send
zfs receive
```

## 73. Cheat sheet — jails

```bash
jls
jexec JID /bin/sh
```

## 74. Cheat sheet — PF

```bash
pfctl -nf /etc/pf.conf
pfctl -sr
pfctl -si
```

## 75. Cheat sheet — logs

```bash
tail -f /var/log/messages
grep -i error /var/log/messages
```

## 76. What to master next

Learn ZFS administration, jails, PF, rc.d scripting, backup/restore and network diagnostics more deeply.

## 77. Final thing to remember

On FreeBSD, understand the separation between base system and packages, rc.d service management, /usr/local conventions, ZFS and jails. Those concepts explain most of the platform.
