# FreeBSD as a Server — Administrator Handbook

## 1. How to think about FreeBSD

FreeBSD is a complete operating system: kernel and base userland are developed together.

This differs from Linux distributions, which combine the Linux kernel with components from many projects.

A useful FreeBSD model:

```text
FreeBSD base system
  +
third-party packages under /usr/local
  +
rc.d service system
  +
optional ZFS/jails/bhyve
```

This consistency is one of FreeBSD's strongest server features.

## 2. System version

```sh
freebsd-version
uname -a
uname -K
```

These show slightly different aspects of installed userland/kernel.

For upgrades, always read release notes for the exact version.

## 3. Important directories

### /etc

Base-system configuration.

Examples:

```text
/etc/rc.conf
/etc/ssh
/etc/pf.conf
/etc/fstab
```

### /usr/local

Third-party packages.

Typical:

```text
/usr/local/bin
/usr/local/sbin
/usr/local/etc
/usr/local/lib
```

### /var

Logs, spool, runtime/application state.

### /home and /usr/home

Home-directory layout depends on install/filesystem setup; `/home` may be linked or mounted accordingly.

### /boot

Boot loader, kernel-related configuration.

## 4. Minimal administrator shell

Navigation:

```sh
pwd
ls -lah
cd
```

Files:

```sh
cp
mv
rm
mkdir
touch
```

Viewing:

```sh
cat
less
head
tail
```

Search:

```sh
grep
find
```

Processes:

```sh
ps
top
pgrep
kill
```

Help:

```sh
man
apropos
```

## 5. Root and permissions

Use ordinary users for normal work.

Become root only when needed through your configured privilege mechanism:

```sh
su -
```

or sudo/doas if installed.

File permissions:

```sh
chmod
chown
chgrp
```

## 6. Users and groups

Interactive user creation:

```sh
adduser
```

Remove:

```sh
rmuser
```

Scriptable administration:

```sh
pw usershow USER
pw groupshow GROUP
```

Use:

```sh
man pw
```

for exact modification syntax.

## 7. Packages — pkg

Refresh:

```sh
pkg update
```

Upgrade:

```sh
pkg upgrade
```

Install:

```sh
pkg install nginx
```

Remove:

```sh
pkg delete nginx
```

Search:

```sh
pkg search nginx
```

Installed:

```sh
pkg info
```

Audit:

```sh
pkg audit -F
```

Which package owns a file:

```sh
pkg which /usr/local/sbin/nginx
```

Files in package:

```sh
pkg info -l nginx
```

## 8. Packages vs Ports

Packages are precompiled.

Ports are source build recipes with optional configuration.

Use packages unless you have a concrete reason for custom compilation.

Mixing approaches without planning can complicate upgrades.

## 9. Services — core FreeBSD model

FreeBSD does not use systemd.

Services are managed by rc.d scripts and settings in `rc.conf`.

Think:

```text
service script
+ enable variable
+ configuration
```

## 10. Service script locations

Base:

```text
/etc/rc.d/
```

Packages:

```text
/usr/local/etc/rc.d/
```

This mirrors the base-vs-third-party split.

## 11. Listing services

Enabled service scripts:

```sh
service -e
```

All available rc scripts can be inspected in the directories above.

## 12. Service actions

```sh
service nginx status
service nginx start
service nginx stop
service nginx restart
service nginx reload
```

Supported actions depend on the rc script.

## 13. Why `service nginx start` may fail

The service may not be enabled.

Check:

```sh
sysrc nginx_enable
```

Enable:

```sh
sysrc nginx_enable=YES
```

For one test without enabling:

```sh
service nginx onestart
```

## 14. rc.conf

Main persistent system startup configuration:

```text
/etc/rc.conf
```

Example:

```text
sshd_enable="YES"
nginx_enable="YES"
```

Use `sysrc` for simple variable changes.

## 15. sysrc

Read:

```sh
sysrc sshd_enable
```

Set:

```sh
sysrc sshd_enable=YES
```

Delete:

```sh
sysrc -x variable_name
```

This avoids quoting/editing mistakes.

## 16. Typical new-service workflow

1. Install:

```sh
pkg install nginx
```

2. Inspect package:

```sh
pkg info nginx
pkg info -l nginx
```

3. Inspect service script:

```sh
less /usr/local/etc/rc.d/nginx
```

4. Enable:

```sh
sysrc nginx_enable=YES
```

5. Validate configuration:

```sh
nginx -t
```

6. Start:

```sh
service nginx start
```

7. Status:

```sh
service nginx status
```

8. Socket:

```sh
sockstat -4 -6 -l
```

9. Logs.

## 17. onestart/onestop

```sh
service NAME onestart
service NAME onestop
```

Useful for testing a service not enabled in rc.conf.

## 18. force actions

Some rc scripts support:

```text
forcestart
forcestop
forcerestart
```

These bypass normal checks.

Use them only if you understand the consequences.

## 19. Restart local services

FreeBSD provides rc mechanisms for services, but restarting “everything” casually is rarely a good administration strategy.

Restart only what changed.

## 20. Service autostart rule

A service should normally be enabled before being started persistently:

```sh
sysrc service_enable=YES
service service start
```

## 21. Service configuration

Base service:

```text
/etc/...
```

Package service:

```text
/usr/local/etc/...
```

Example nginx:

```text
/usr/local/etc/nginx/
```

## 22. Validate before restart

Examples:

nginx:

```sh
nginx -t
```

sshd:

```sh
sshd -t
```

PF:

```sh
pfctl -nf /etc/pf.conf
```

This principle prevents avoidable outages.

## 23. Your own application as an rc.d service

A custom script can be placed under:

```text
/usr/local/etc/rc.d/
```

Typical rc metadata includes:

```sh
# PROVIDE: myapp
# REQUIRE: NETWORKING
# KEYWORD: shutdown
```

Use `rc.subr` conventions and read:

```sh
man rc
man rc.subr
man rc.conf
```

A correct rc.d script integrates with boot ordering and service commands.

## 24. daemon(8)

FreeBSD's `daemon` utility can supervise/run ordinary programs as daemons.

Check:

```sh
man daemon
```

Useful for wrapping simple applications in an rc.d service without adding a separate supervisor.

## 25. Updates

FreeBSD separates:

- base system,
- third-party packages.

Update strategy depends on your installed FreeBSD release and whether you use classic or pkgbase-style mechanisms.

Always use current official documentation for your version.

## 26. Package updates

```sh
pkg update
pkg upgrade
pkg audit -F
```

Review changes before confirming on production.

## 27. Base-system updates

Historically FreeBSD used tools such as `freebsd-update` for supported binary-update paths, while newer release generations increasingly support package-based base system workflows.

The exact method is version-dependent.

Never assume a guide written for FreeBSD 13 applies unchanged to FreeBSD 15.

## 28. pkgbase

Pkgbase manages base-system components as packages.

If your release/setup uses it, understand:

- repository configuration,
- package names,
- kernel/world coordination,
- boot environments where available.

Do not mix update models randomly.

## 29. Boot Environments

On ZFS-root systems, boot environments provide snapshots/clone-like bootable system states.

Tools depend on release/setup, commonly using `bectl`/related mechanisms.

Check:

```sh
bectl list
```

when available.

Before a major upgrade:

```text
create boot environment
→ upgrade
→ test
→ rollback if needed
```

This is one of ZFS-root FreeBSD's best operational features.

## 30. Network tools

Interfaces:

```sh
ifconfig
```

Routes:

```sh
netstat -rn
route -n get default
```

Sockets:

```sh
sockstat -4 -6
```

DNS:

```sh
drill
host
```

Connectivity:

```sh
ping
nc
fetch
curl
```

## 31. Interface configuration

Persistent network settings belong in `rc.conf`.

Examples vary by interface and DHCP/static setup.

Inspect current config:

```sh
sysrc -a | grep ifconfig
```

Do not copy an interface name from another machine; inspect:

```sh
ifconfig
```

## 32. DNS

Resolver configuration:

```text
/etc/resolv.conf
```

Check:

```sh
cat /etc/resolv.conf
drill example.com
```

DHCP may generate resolver settings.

## 33. /etc/hosts

Local static name mappings:

```text
/etc/hosts
```

Useful for local hostnames and boot-time resolution, but not a replacement for proper DNS at scale.

## 34. SSH

Enable:

```sh
sysrc sshd_enable=YES
service sshd start
```

Config:

```text
/etc/ssh/sshd_config
```

Validate:

```sh
sshd -t
```

## 35. SSH keys

Generate:

```sh
ssh-keygen -t ed25519
```

Authorized keys:

```text
~/.ssh/authorized_keys
```

Permissions:

```sh
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

## 36. SSH hardening

A sensible direction:

- keys,
- ordinary admin account,
- root login disabled/restricted,
- passwords disabled only after keys are verified,
- firewall/source restrictions,
- VPN/jump host where appropriate.

Keep an existing session open while testing changes.

## 37. Firewall

FreeBSD supports several firewall systems; PF is a popular choice.

This handbook uses PF examples.

## 38. Enable PF

Persistent settings are configured via rc.conf/sysrc.

Typical variables include enabling PF and specifying a rules file.

Check current handbook/man pages:

```sh
man pf
man pf.conf
man rc.conf
```

## 39. PF basics

A minimal server policy might:

- block by default,
- allow established traffic,
- allow loopback,
- allow SSH from trusted sources,
- allow HTTP/HTTPS.

Do not paste a firewall template into a remote server without adjusting interface names and access rules.

## 40. Test PF syntax

```sh
pfctl -nf /etc/pf.conf
```

Show rules:

```sh
pfctl -sr
```

Status:

```sh
pfctl -s info
```

Reload after a successful syntax check:

```sh
pfctl -f /etc/pf.conf
```

## 41. Processes and resources

```sh
ps aux
top
uptime
sysctl hw.ncpu
sysctl hw.physmem
```

Find:

```sh
pgrep -af nginx
```

## 42. Disks

```sh
gpart show
geom disk list
camcontrol devlist
df -h
```

On ZFS systems, also:

```sh
zpool status
zpool list
zfs list
```

## 43. ZFS

ZFS combines:

- storage pooling,
- filesystem,
- checksums,
- snapshots,
- replication,
- compression,
- redundancy.

It is deeply integrated with FreeBSD and is an excellent server filesystem when understood.

## 44. ZFS concepts

### Pool

Storage pool:

```text
tank
```

### Dataset

Filesystem-like unit:

```text
tank/data
tank/backups
tank/jails
```

Datasets can have independent properties and snapshots.

## 45. Core ZFS commands

Pools:

```sh
zpool list
zpool status
```

Datasets:

```sh
zfs list
```

Create:

```sh
zfs create tank/data
```

Compression:

```sh
zfs set compression=lz4 tank/data
```

Inspect:

```sh
zfs get compression tank/data
```

## 46. Snapshots

Create:

```sh
zfs snapshot tank/data@before-change
```

List:

```sh
zfs list -t snapshot
```

Destroy:

```sh
zfs destroy tank/data@old
```

## 47. Scrub

```sh
zpool scrub tank
```

Status:

```sh
zpool status tank
```

Scrubs verify checksums and repair data where redundancy allows.

Schedule appropriate scrubs for important pools.

## 48. ZFS send / receive

Full replication:

```sh
zfs send tank/data@snap | zfs receive backup/data
```

Remote:

```sh
zfs send tank/data@snap | ssh backup zfs receive backup/data
```

Incremental replication is also possible.

Read `man zfs-send`/`zfs-receive` for exact syntax.

## 49. ZFS is not backup

A mirror protects against a disk failure.

A snapshot protects against some logical changes.

Neither alone protects against:

- total server loss,
- theft,
- fire,
- catastrophic pool damage,
- privileged attacker destroying snapshots.

Keep independent backups.

## 50. SMART

Install:

```sh
pkg install smartmontools
```

Inspect:

```sh
smartctl -a /dev/ada0
```

Device names vary.

Combine SMART with ZFS error counters and physical drive identification.

## 51. Mounting filesystems

Current mounts:

```sh
mount
```

Persistent non-ZFS mounts:

```text
/etc/fstab
```

ZFS datasets normally manage their own mountpoints through ZFS properties.

## 52. Logs

Important locations:

```text
/var/log/messages
/var/log/auth.log
/var/log/maillog
```

depending on configuration.

Package services often log separately.

## 53. Live logs

```sh
tail -f /var/log/messages
```

For nginx:

```sh
tail -f /var/log/nginx/error.log
```

paths depend on service config.

## 54. syslog

Configuration:

```text
/etc/syslog.conf
```

Syslog routes messages by facility/severity.

## 55. Log rotation

FreeBSD commonly uses `newsyslog`.

Config:

```text
/etc/newsyslog.conf
/etc/newsyslog.conf.d/
```

Packages may install additional snippets.

## 56. cron

User crontab:

```sh
crontab -e
```

List:

```sh
crontab -l
```

Root:

```sh
sudo crontab -e
```

Use full command paths when jobs depend on environment.

## 57. periodic

FreeBSD provides:

```text
daily
weekly
monthly
```

maintenance through the periodic framework.

Run:

```sh
periodic daily
```

Configuration can adjust reports/tasks.

## 58. sysctl

Read:

```sh
sysctl hw.model
sysctl hw.ncpu
```

All:

```sh
sysctl -a
```

Temporary set:

```sh
sysctl name=value
```

Persistent runtime tunables commonly go to:

```text
/etc/sysctl.conf
```

when appropriate.

## 59. loader.conf

Early boot/kernel module settings:

```text
/boot/loader.conf
```

Use for settings that must exist before normal rc startup.

Do not copy random tuning values from Internet guides.

## 60. Kernel modules

List:

```sh
kldstat
```

Load:

```sh
kldload MODULE
```

Unload if supported/safe:

```sh
kldunload MODULE
```

## 61. Jails

Jails isolate userland environments while sharing the FreeBSD kernel.

Use cases:

- web services,
- applications,
- separation between roles,
- test environments.

They are the native FreeBSD container technology.

## 62. Jail configuration

Modern FreeBSD commonly uses:

```text
/etc/jail.conf
```

Third-party tools may provide their own abstractions.

## 63. Minimal jail idea

A jail requires:

- root filesystem,
- name,
- hostname,
- path,
- network configuration,
- start command/rc behavior.

Do not build a complex jail framework until you understand the base `jail(8)` model.

## 64. Jail autostart

Jail startup can integrate with rc.conf and jail configuration.

Check:

```sh
man jail
man jail.conf
man rc.conf
```

for your release.

## 65. Managing jails

List:

```sh
jls
```

Start/stop methods depend on base configuration/tooling.

Execute inside:

```sh
jexec JID /bin/sh
```

## 66. Services inside jails

Inside a jail, manage services with:

```sh
service
sysrc
```

just like a smaller FreeBSD userspace, subject to jail restrictions.

## 67. ZFS and jails

A strong pattern:

```text
tank/jails/web
tank/jails/db
```

Benefits:

- snapshots,
- clones,
- quotas,
- send/receive.

Keep application state and lifecycle design explicit.

## 68. Service Jails

Newer FreeBSD releases add evolving service-jail functionality around rc.d/jails.

Because details change by release, consult the current Handbook and manual pages instead of relying on an old example.

## 69. Backup

Back up:

- configuration,
- application data,
- databases,
- important datasets,
- encryption keys,
- documentation.

Do not waste backup space on easily reinstallable packages if recovery documentation can recreate them.

## 70. Database backup

Use database-native tools:

PostgreSQL:

```sh
pg_dump
pg_dumpall
```

MySQL/MariaDB:

```sh
mysqldump
```

or vendor-recommended hot-backup mechanisms.

Filesystem snapshots complement, not automatically replace, application-consistent backup.

## 71. ZFS backup

Excellent pattern:

```text
snapshot
→ zfs send
→ another machine/pool
→ retention
→ restore test
```

Remote backups should not remain fully destroyable by the same compromised credentials if you can avoid it.

## 72. Sensible update procedure

1. read release/security notes,
2. verify backups,
3. create boot environment/snapshot where appropriate,
4. update test/noncritical system first,
5. update base,
6. update packages,
7. reboot if required,
8. verify services,
9. run application health checks.

## 73. Monitoring basics

Watch:

- uptime,
- CPU/load,
- memory,
- disk/ZFS capacity,
- pool health,
- service status,
- ports,
- backups,
- SMART,
- application health.

## 74. uptime

```sh
uptime
```

Shows uptime and load.

## 75. dmesg

```sh
dmesg
```

Useful for:

- disks,
- NICs,
- driver errors,
- boot detection,
- kernel warnings.

Search:

```sh
dmesg | grep -i error
```

## 76. Ports and listening processes

```sh
sockstat -4 -6 -l
```

Find port:

```sh
sockstat -4 -6 | grep ':443'
```

## 77. localhost vs all interfaces

An application bound to:

```text
127.0.0.1:8080
```

is only reachable locally.

Bound to:

```text
0.0.0.0:8080
```

it listens on all IPv4 interfaces.

Behind nginx, localhost binding is often desirable.

## 78. Reverse proxy

Typical architecture:

```text
Internet
→ PF
→ nginx :443
→ app 127.0.0.1:8080
```

Only nginx needs public exposure.

## 79. nginx

Install:

```sh
pkg install nginx
```

Enable:

```sh
sysrc nginx_enable=YES
```

Config:

```text
/usr/local/etc/nginx/nginx.conf
```

Test:

```sh
nginx -t
```

Start:

```sh
service nginx start
```

## 80. Reverse proxy nginx example

```nginx
server {
    listen 443 ssl;
    server_name app.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

TLS certificate management depends on your chosen ACME client.

## 81. Databases as services

Third-party databases install under `/usr/local`.

Example workflow:

```text
pkg install
→ initialize database if required
→ sysrc enable
→ configure under /usr/local/etc or database path
→ start service
→ verify socket/listener
→ configure backups
```

Always read the package message:

```sh
pkg info -D PACKAGE
```

when useful.

## 82. WireGuard

FreeBSD supports WireGuard functionality through current base/package mechanisms depending on release.

Use current FreeBSD documentation for interface configuration.

A VPN is useful for:

- administrative access,
- private services,
- homelab connectivity.

Do not expose admin panels publicly if VPN access solves the requirement.

## 83. Network troubleshooting by layers

### 1. Interface

```sh
ifconfig
```

### 2. IP address

Confirm expected address/prefix.

### 3. Route

```sh
netstat -rn
```

### 4. Gateway

```sh
route -n get default
```

### 5. Internet by IP

```sh
ping 1.1.1.1
```

### 6. DNS

```sh
drill example.com
```

### 7. Firewall

```sh
pfctl -sr
pfctl -s info
```

### 8. Listener

```sh
sockstat -4 -6 -l
```

## 84. Universal service troubleshooting

1. Does the rc script exist?
2. Is service enabled?

```sh
sysrc NAME_enable
```

3. Status:

```sh
service NAME status
```

4. Validate config.
5. Start manually if appropriate.
6. Read logs.
7. Check process.
8. Check port.
9. Check firewall.

## 85. Boot process

FreeBSD boot involves:

- firmware/loader,
- kernel,
- init,
- rc system,
- rc.conf service configuration.

Read:

```sh
man boot
man rc
```

for detailed architecture.

## 86. rc.d dependencies

Service scripts can declare:

```sh
# PROVIDE: myapp
# REQUIRE: NETWORKING
# BEFORE: LOGIN
# KEYWORD: shutdown
```

These help order startup/shutdown.

## 87. Recovery and boot problems

Tools may include:

- loader prompt,
- single-user mode,
- boot environments,
- rescue media.

On ZFS root, boot environments provide a particularly strong rollback option if created before risky changes.

## 88. Reboot and shutdown

```sh
shutdown -r now
shutdown -p now
```

Check important operations first:

```sh
zpool status
ps aux
```

## 89. Verify after reboot

After planned reboot:

```sh
uptime
service -e
sockstat -4 -6 -l
zpool status -x
tail -n 100 /var/log/messages
```

Then application health checks.

## 90. Security minimum

- ordinary admin account,
- SSH keys,
- restricted root login,
- PF/firewall,
- minimum public ports,
- current packages/base,
- services under dedicated users,
- backups,
- logs/monitoring,
- least privilege.

## 91. Most important service-security rule

Bind internal services to private addresses/localhost whenever they do not need to be public.

Example:

```text
database → private only
application → localhost/private
nginx → public 443
```

## 92. User without login

Service accounts can be configured with a non-login shell where appropriate.

Use system tools/user account conventions rather than sharing one privileged account among applications.

## 93. File permissions

Secrets:

```sh
chmod 600 secret
```

Application directory ownership:

```sh
chown -R app:app /srv/app
```

Do not make everything `777` to “fix permissions.”

## 94. New server setup

1. install FreeBSD,
2. configure storage/ZFS,
3. update base according to release,
4. update packages,
5. create admin user,
6. SSH keys,
7. firewall,
8. DNS/time,
9. install required services only,
10. configure backups,
11. monitoring.

## 95. Example application architecture

```text
Internet
  ↓
PF
  ↓
nginx
  ↓
Go/Node/Python app on localhost or jail
  ↓
PostgreSQL in private jail/host
  ↓
ZFS datasets
```

Keep interfaces between layers explicit.

## 96. Useful packages on a new server

Depending on needs:

```text
bash/zsh
sudo/doas
vim/neovim
mc
tmux
curl
git
rsync
ripgrep
jq
smartmontools
nginx
```

Do not install everything by habit.

## 97. Documentation

FreeBSD's local manual pages are excellent.

```sh
man service
man rc.conf
man jail
man zfs
man pf.conf
```

Also use the FreeBSD Handbook matching your release.

## 98. Manual section numbers

Unix manuals have sections.

Examples:

```text
1 user commands
2 system calls
3 library functions
5 file formats
8 system administration commands
```

Disambiguate:

```sh
man 5 rc.conf
man 8 jail
```

## 99. Core admin commands

System:

```sh
freebsd-version
uname -a
uptime
sysctl
```

Packages:

```sh
pkg update
pkg upgrade
pkg info
pkg audit
```

Services:

```sh
service
sysrc
```

Network:

```sh
ifconfig
netstat -rn
route
sockstat
ping
drill
nc
```

Processes:

```sh
ps
top
pgrep
kill
```

Storage:

```sh
df
du
gpart
camcontrol
zpool
zfs
```

Jails:

```sh
jls
jexec
```

Logs:

```sh
tail
grep
less
```

## 100. Daily health check

```sh
uptime
zpool status -x
zpool list
df -h
pkg audit -F
sockstat -4 -6 -l
service -e
```

Add application-specific health checks and backup verification.

## 101. Package upgrade workflow

```sh
pkg update
pkg upgrade
pkg audit
```

Read package messages:

```sh
pkg info -D PACKAGE
```

Check whether services need restart and verify them afterward.

## 102. Configuration backup before change

Example:

```sh
cp -p /usr/local/etc/nginx/nginx.conf       /usr/local/etc/nginx/nginx.conf.bak
```

Better yet, version important configuration in a private Git repository or configuration-management system, excluding secrets.

## 103. ZFS snapshot before application change

If application data lives in a dedicated dataset:

```sh
zfs snapshot tank/app@before-upgrade
```

This can speed local rollback, but still keep external backups.

## 104. Service deployment workflow

```text
backup/snapshot
→ deploy files
→ permissions
→ config validation
→ service restart/reload
→ status
→ socket
→ HTTP/application health check
→ logs
```

## 105. Common FreeBSD mistakes from Linux users

- typing `systemctl`,
- looking for package config under `/etc` instead of `/usr/local/etc`,
- expecting GNU-only command options,
- assuming `pkg upgrade` equals a full base OS upgrade,
- treating Docker as native,
- ignoring rc.conf enable flags,
- ignoring ZFS pool health.

## 106. Homelab strengths

FreeBSD is particularly attractive for:

- ZFS storage,
- jails,
- network services,
- stable long-running servers,
- learning Unix architecture.

It is less ideal when your application stack assumes Linux-specific container/runtime features.

## 107. Docker alternative model

Instead of:

```text
FreeBSD → Docker directly
```

use:

```text
FreeBSD host
├── jails for native FreeBSD services
└── bhyve
    └── Debian VM
        └── Docker
```

This respects each platform's strengths.

## 108. bhyve

bhyve is FreeBSD's native hypervisor.

Use it when you need:

- Linux VM,
- Windows VM,
- strong OS isolation,
- Docker host inside Linux.

Third-party management tools can simplify VM lifecycle.

## 109. Backup architecture example

```text
live dataset
  ↓ snapshots
  ↓ incremental zfs send
backup server
  ↓ retention
offsite copy
```

Test restoration from each important layer.

## 110. Monitoring ZFS

Alert on:

- non-healthy pool,
- checksum/read/write errors,
- capacity threshold,
- failed scrub,
- degraded device.

Do not wait until users report missing files.

## 111. Monitoring services

At minimum:

- process/service status,
- listening port,
- application health endpoint,
- logs,
- disk,
- backup freshness.

## 112. Monitoring networking

Watch:

- interface state,
- packet errors,
- routes,
- firewall changes,
- DNS,
- WAN/VPN health.

## 113. Administration workflow

For any change:

```text
inspect
→ document current state
→ backup/snapshot
→ change one thing
→ validate
→ restart/reload only what is needed
→ verify
→ record result
```

## 114. Troubleshooting a 502 from nginx

1. nginx status:

```sh
service nginx status
```

2. nginx config:

```sh
nginx -t
```

3. backend process:

```sh
pgrep -af app
```

4. port:

```sh
sockstat -4 -6 -l
```

5. local request:

```sh
curl -v http://127.0.0.1:8080
```

6. nginx error log.

If backend local request fails, nginx is probably not the root cause.

## 115. Troubleshooting SSH

Server:

```sh
service sshd status
sshd -t
sockstat -4 -6 -l | grep ':22'
tail -n 100 /var/log/auth.log
```

Client:

```sh
ssh -vvv user@server
```

Then inspect PF/network.

## 116. Troubleshooting a full pool

```sh
zpool list
zfs list
zfs list -t snapshot
du
```

Possible causes:

- snapshots retaining deleted data,
- growing datasets,
- reservations/refreservations,
- application logs/backups.

ZFS free-space behavior differs from a simple ext filesystem.

## 117. Troubleshooting package conflicts

```sh
pkg check
pkg info
pkg which FILE
pkg audit
```

Read the exact solver/error output.

Avoid manually deleting package-managed files.

## 118. Security audit questions

Ask:

- Which ports are public?
- Which services run as root?
- Are SSH passwords needed?
- Are packages/base current?
- Is PF active?
- Are backups restorable?
- Are secrets separated?
- Are jails/VMs isolated as intended?
- Who has wheel/root access?

## 119. Important paths cheat sheet

```text
/etc
/etc/rc.conf
/etc/ssh
/etc/pf.conf
/usr/local/etc
/usr/local/etc/rc.d
/var/log
/boot
/boot/loader.conf
/etc/sysctl.conf
/etc/jail.conf
```

## 120. Final command cheat sheet

```sh
freebsd-version
pkg update
pkg upgrade
pkg audit -F

service NAME status
sysrc NAME_enable=YES

ifconfig
netstat -rn
sockstat -4 -6 -l
drill example.com
curl -v URL

ps aux
top
pgrep -af NAME

df -h
gpart show
camcontrol devlist
zpool status
zpool list
zfs list

jls
jexec

pfctl -nf /etc/pf.conf
pfctl -sr
```

## 121. Most important idea

FreeBSD administration becomes simple once you internalize four concepts:

```text
base system vs /usr/local
rc.d + rc.conf/sysrc
ZFS
jails/VMs
```

Treat FreeBSD as FreeBSD, not as a Linux distribution with renamed commands, and the system becomes very coherent.
