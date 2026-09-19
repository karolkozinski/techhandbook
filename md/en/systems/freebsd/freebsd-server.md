# freebsd-server
# 1. How to think about FreeBSD
FreeBSD is a complete operating system: kernel, base userland, documentation and release engineering are developed together. Third-party software is added separately through packages or Ports.
# 2. System version
```sh
freebsd-version
uname -a
```
# 3. Important directories
## `/etc`
base-system configuration.
## `/usr/local`
third-party software and local hierarchy.
## `/var`
logs, databases and changing data.
## `/home and /usr/home`
user home locations.
## `/boot`
boot loader, kernel-related configuration and modules.
# 4. Minimal administrator shell
## Navigation
```sh
pwd; ls -lah; cd
```
## Files
```sh
cp; mv; rm; mkdir
```
## Viewing files
```sh
less; head; tail; cat
```
## Searching
```sh
grep; find
```
## Processes
```sh
ps aux; top; pgrep
```
## Help
```sh
man; apropos
```
# 5. Root and permissions
Use root only when needed. sudo or doas can provide controlled privilege elevation.
# 6. Users and groups
## User list
```sh
cut -d: -f1 /etc/passwd
```
## Add user
```sh
adduser
```
## Remove user
```sh
rmuser USER
```
## `pw` utility
```sh
pw useradd USER -m
pw userdel USER -r
pw groupshow GROUP
```
# 7. Packages — `pkg`
## Update package catalogue
```sh
pkg update
```
## Upgrade all packages
```sh
pkg upgrade
```
## Install
```sh
pkg install PACKAGE
```
## Remove
```sh
pkg delete PACKAGE
```
## Installed package list
```sh
pkg info
```
## Search
```sh
pkg search NAME
```
## Unused dependencies
```sh
pkg autoremove
```
## Vulnerability audit
```sh
pkg audit -F
```
## Find package owning a file
```sh
pkg which FILE
```
## Files belonging to package
```sh
pkg info -l PACKAGE
```
# 8. Packages vs Ports
Packages are prebuilt binaries and are the practical default. Ports build from source and are useful when compile-time options matter.
# 9. The key idea: FreeBSD service system
FreeBSD uses rc.d scripts and rc.conf-style configuration rather than systemd.
# 10. Where service scripts live
Base services live under /etc/rc.d; third-party package scripts usually live under /usr/local/etc/rc.d.
# 11. List services
```sh
service -e
service -l
```
# 12. Starting services
```sh
service nginx start
service nginx status
service nginx restart
```
# 13. Why `service nginx start` sometimes does not work
A normal start expects the service to be enabled in rc.conf. Use onestart for one-off execution when appropriate.
# 14. `rc.conf` — system configuration center
Persistent service/network/system settings are commonly stored in /etc/rc.conf.
# 15. `sysrc` — best way to change `rc.conf`
## Read value
```sh
sysrc nginx_enable
```
## Value only
```sh
sysrc -n nginx_enable
```
## Enable service
```sh
sysrc nginx_enable=YES
```
## Disable
```sh
sysrc nginx_enable=NO
```
## Remove variable
```sh
sysrc -x nginx_enable
```
# 16. Typical lifecycle of installing a new service
## 1. Install
```sh
pkg install nginx
```
## 2. Inspect files
```sh
pkg info -l nginx
```
## 3. Inspect service script
```sh
service nginx rcvar
```
## 4. Enable autostart
```sh
sysrc nginx_enable=YES
```
## 5. Start
```sh
service nginx start
```
## 6. Status
```sh
service nginx status
```
## 7. Check port
```sh
sockstat -4 -6 -l
```
## 8. Logs
```sh
tail -n 100 /var/log/messages
```
# 17. `onestart`, `onestop` and `onerestart`
```sh
service nginx onestart
service nginx onestop
service nginx onerestart
```
# 18. `force*`
force* actions bypass parts of the normal rc checks. Use only when you understand why.
# 19. Restart all local services
```sh
service -r
```
# 20. Service autostart — rule
Persistent startup belongs in rc.conf/sysrc, not in ad-hoc shell history.
# 21. Service configuration
### system service
Base-system configuration generally lives under /etc.
### package service
Third-party package configuration normally lives under /usr/local/etc.
# 22. Validate configuration before restart
Use each service's native syntax-check command before reload/restart, e.g. nginx -t.
# 23. Your own application as a service
Create an rc.d script with metadata and explicit command/user/pid behavior.
# PROVIDE: myapp
Names the service capability provided by the script.
# REQUIRE: NETWORKING
Declares that networking must be available first.
# KEYWORD: shutdown
Ensures the service participates correctly in shutdown ordering.
# 24. `daemon(8)`
daemon can detach and supervise foreground applications and is useful for wrapping custom services.
# 25. System updates
Treat base-system and package updates as separate concerns.
# 26. Package updates
```sh
pkg update
pkg upgrade
```
# 27. Base-system updates
Use the supported update mechanism for your FreeBSD release and read release notes before major upgrades.
# 28. Note: pkgbase
pkgbase changes how base-system components may be delivered/updated on newer FreeBSD generations. Follow documentation for your exact release.
# 29. Boot Environments — one of the best ZFS features
Boot environments provide fast rollback around risky upgrades on ZFS-root systems.
# 30. Networking — key tools
```sh
ifconfig
netstat -rn
route -n get default
sockstat -4 -6 -l
ping HOST
dig DOMAIN
curl -v URL
```
# 31. Interface configuration in `rc.conf`
Persistent addresses and interface settings are stored as rc.conf variables.
# 32. DNS
Resolver configuration is primarily in /etc/resolv.conf.
# 33. `/etc/hosts`
Static local hostname-to-address mappings.
# 34. SSH
```sh
sysrc sshd_enable=YES
service sshd start
ssh user@server
```
# 35. SSH — keys
```sh
ssh-keygen -t ed25519
ssh-copy-id user@server
```
# 36. SSH — basic hardening
Prefer keys, restrict root login, limit exposure and test new access before disabling old access.
# 37. Firewall
FreeBSD commonly uses PF, IPFW or IPFilter. This handbook focuses on PF.
# 38. PF — enabling
Set pf_enable=YES and pf_rules=/etc/pf.conf in rc.conf, ideally via sysrc.
# 39. Minimal PF for a server
Allow loopback, established traffic, trusted SSH and only required service ports.
# 40. PF — test before reload
```sh
pfctl -nf /etc/pf.conf
```
# 41. Processes and resources
## `top`
```sh
top
```
## `ps`
```sh
ps aux
```
## Memory
```sh
sysctl hw.physmem
vmstat
```
## CPU
```sh
sysctl hw.ncpu
uptime
```
# 42. Disks
```sh
geom disk list
gpart show
camcontrol devlist
```
# 43. ZFS — why it matters
ZFS combines filesystem and volume-management features with checksums, snapshots and replication.
# 44. Basic ZFS concepts
## Pool
A storage pool built from one or more vdevs.
## Dataset
A filesystem-like ZFS object with independent properties.
# 45. ZFS — important commands
## Datasets
```sh
zfs list
```
## Create
```sh
zfs create tank/apps
```
## Compression
```sh
zfs set compression=lz4 tank/apps
```
# 46. ZFS snapshots
```sh
zfs snapshot tank/apps@before-change
zfs list -t snapshot
```
# 47. ZFS scrub
```sh
zpool scrub tank
zpool status tank
```
# 48. ZFS send / receive
```sh
zfs send tank/apps@snap | ssh backup zfs receive backup/apps
```
# 49. ZFS is not a backup
Snapshots and mirrors can share the same failure domain. Keep independent/off-machine copies.
# 50. SMART
```sh
smartctl -a /dev/ada0
```
# 51. Mounting filesystems
```sh
mount
mount -t FILESYSTEM DEVICE MOUNTPOINT
```
# 52. Logs
Most classic system logs live under /var/log.
# 53. Live logs
```sh
tail -f /var/log/messages
```
# 54. Syslog
syslogd handles many system/service logs.
# 55. Log rotation
newsyslog rotates many FreeBSD logs according to configuration.
# 56. Cron
```sh
crontab -e
crontab -l
```
# 57. Root cron
```sh
sudo crontab -e
```
# 58. `periodic`
FreeBSD's periodic framework runs daily/weekly/monthly maintenance scripts.
# 59. `sysctl`
```sh
sysctl kern.ostype
sysctl hw.ncpu
```
# 60. Temporary `sysctl` change
```sh
sysctl net.inet.ip.forwarding=1
```
# 61. Persistent `sysctl` change
Use /etc/sysctl.conf for runtime-tunable values that should persist.
# 62. `/boot/loader.conf`
Use for loader-time settings and modules that must be configured before the kernel fully starts.
# 63. Kernel modules
```sh
kldstat
kldload MODULE
```
# 64. Jails — basic idea
Jails provide OS-level isolation native to FreeBSD.
# 65. What to use jails for
Isolate services, separate dependency sets and reduce blast radius.
# 66. Jail configuration
Native jail.conf or a jail-management framework can define jail settings.
# 67. Minimal jail definition
Define path, hostname, IP/network settings, startup behavior and allowed capabilities.
# 68. Jail autostart
Enable jails via rc.conf or the selected jail-management framework.
# 69. Jail management
```sh
jls
service jail status
```
# 70. Entering a jail
```sh
jexec JID /bin/sh
```
# 71. Services in a jail
Inside the jail, services are administered similarly, subject to jail restrictions.
# 72. ZFS and jails
Dedicated datasets simplify quotas, snapshots and delegation.
# 73. Service Jails in FreeBSD 15
Newer FreeBSD releases evolve service/jail integration. Use release-specific documentation for current syntax and support.
# 74. Backup
Back up configuration, application data and databases; keep at least one independent copy.
# 75. Database backups
Use database-native logical/physical backup methods in addition to filesystem-level protection.
# 76. ZFS as a backup mechanism
ZFS snapshots/send-receive are excellent building blocks, but destination independence still matters.
# 77. Updates — sensible procedure
Checkpoint/boot environment → update → read messages → restart affected services → test → reboot if required.
# 78. Basic monitoring
Monitor uptime, load, ZFS pool health, SMART, disk space, service state, ports, logs and backup success.
# 79. `uptime`
```sh
uptime
```
# 80. `dmesg`
```sh
dmesg | tail -n 50
```
# 81. Ports and listening processes
```sh
sockstat -4 -6 -l
```
# 82. Typical problem: localhost instead of all interfaces
A service bound to 127.0.0.1 works locally but is invisible to LAN/Internet clients.
# 83. Reverse proxy
Keep applications on localhost/private addresses and publish them through nginx or another proxy.
# 84. Nginx — quick example
```sh
pkg install nginx
sysrc nginx_enable=YES
nginx -t
service nginx start
```
# 85. Nginx reverse proxy
Use proxy_pass to a local backend and forward Host/client headers as required.
# 86. Databases as services
Install → initialize → enable → configure → start → verify port/logs → establish backup.
# 87. WireGuard
Use WireGuard for secure host/site connectivity where appropriate; routing and firewall policy still matter.
# 88. System DNS, routing and firewall — layered diagnostics
## 1. Interface
```sh
ifconfig
```
## 2. IP address
```sh
ifconfig
```
## 3. Routing
```sh
netstat -rn
```
## 4. Gateway
```sh
route -n get default
```
## 5. IP without DNS
```sh
ping 1.1.1.1
```
## 6. DNS
```sh
dig example.com
```
## 7. Firewall
```sh
pfctl -sr
```
## 8. Listener
```sh
sockstat -4 -6 -l
```
# 89. Service diagnostics — universal pattern
## 1. Does the service exist?
```sh
service -l | grep NAME
```
## 2. Is it enabled?
```sh
sysrc NAME_enable
```
## 3. Status
```sh
service NAME status
```
## 4. Configuration test
```sh
SERVICE_NATIVE_TEST
```
## 5. Start attempt
```sh
service NAME start
```
## 6. Logs
```sh
tail -n 100 /var/log/messages
```
## 7. Process
```sh
pgrep -af NAME
```
## 8. Port
```sh
sockstat -4 -6 -l
```
## 9. Firewall
```sh
pfctl -sr
```
# 90. What starts during boot
rc scripts are ordered by dependency metadata and enabled rc.conf variables.
# 91. Dependencies in rc.d scripts
# PROVIDE: myapp
Capability provided.
# REQUIRE: NETWORKING
Dependency that must run first.
# BEFORE: LOGIN
Ordering constraint before the named capability.
# KEYWORD: shutdown
Participates in shutdown ordering.
# 92. Emergency boot and boot problems
Use loader/single-user/recovery options, console access and boot environments when available.
# 93. Reboot and shutdown
```sh
shutdown -r now
shutdown -p now
reboot
```
# 94. Verify startup after reboot
Check network, pools, mounts, critical services and listeners.
# 95. Security — server minimum
Updates, keys, least privilege, PF, minimal services, backups and logs.
# 96. Most important service-security rule
Expose only what must be reachable and run each service with the minimum privileges it needs.
# 97. User without login
Create dedicated service users with nologin shells where interactive access is unnecessary.
# 98. File permissions
Prefer explicit ownership/modes; never use chmod 777 as a generic fix.
# 99. New server installation process
## 1. Install FreeBSD
Complete and verify this layer before moving to the next.
## 2. Update
Complete and verify this layer before moving to the next.
## 3. SSH
Complete and verify this layer before moving to the next.
## 4. Firewall
Complete and verify this layer before moving to the next.
## 5. ZFS
Complete and verify this layer before moving to the next.
## 6. Services
Complete and verify this layer before moving to the next.
# 100. Application server — example architecture
Internet → PF → nginx → application on localhost/jail → database/storage.
# 101. What to install on a new server
Only required tools: editor, tmux, curl, git, rsync, smartmontools, monitoring and actual application dependencies.
# 102. System documentation
FreeBSD man pages and Handbook are core operational documentation.
# 103. How to read manual names
Manual sections distinguish user commands, system calls, config formats, admin commands and more.
# 104. Most important administrator commands
## System
```sh
freebsd-version; uname -a; uptime
```
## Packages
```sh
pkg update; pkg upgrade; pkg audit -F
```
## Services
```sh
service NAME status
```
## Autostart
```sh
sysrc NAME_enable=YES
```
## Network
```sh
ifconfig; netstat -rn; sockstat -4 -6 -l
```
## Processes
```sh
ps aux; top
```
## Disks
```sh
gpart show; zpool status; zfs list
```
## Jails
```sh
jls; jexec JID /bin/sh
```
## Logs
```sh
tail -f /var/log/messages
```
# 105. Daily server check
```sh
uptime
zpool status
df -h
sockstat -4 -6 -l
service -e
```
# 106. Check after configuration change
Validate syntax → reload only affected service → inspect logs → test locally → test remotely.
# 107. Weekly / monthly check
Review updates, pkg audit, SMART, scrub status, backups, storage growth and stale accounts/services.
# 108. Main differences from Debian/Linux
rc.d/sysrc instead of systemd, ifconfig instead of ip, sockstat for sockets, /usr/local for packages and native ZFS/jails integration.
# 109. What not to do
## Do not edit generated files blindly
Use an explicit, reversible administrative procedure instead.
## Do not build everything from source without a reason
Use an explicit, reversible administrative procedure instead.
## Do not run everything as root
Use an explicit, reversible administrative procedure instead.
## Do not open every port in the firewall
Use an explicit, reversible administrative procedure instead.
## Do not use `chmod 777` so it 'works'
Use an explicit, reversible administrative procedure instead.
## Do not reboot the whole server for every service problem
Use an explicit, reversible administrative procedure instead.
## Do not assume a mirror is a backup
Use an explicit, reversible administrative procedure instead.
# 110. When a service will not start
### Is the package installed?
```sh
pkg info PACKAGE
```
### Does the script exist?
```sh
service -l | grep NAME
```
### Is it enabled?
```sh
sysrc NAME_enable
```
### Is config valid?
```sh
SERVICE_NATIVE_TEST
```
### What does start say?
```sh
service NAME start
```
### What do logs say?
```sh
tail -n 100 /var/log/messages
```
### Does the process exist?
```sh
pgrep -af NAME
```
### Is the port open?
```sh
sockstat -4 -6 -l
```
### Does firewall pass it?
```sh
pfctl -sr
```
# 111. Example: installing your own Go application
## 1. User
Create a dedicated service account.
## 2. Directory
Place binary/data under a clear application path.
## 3. Configuration
Store config under /usr/local/etc/app or another documented path.
## 4. rc.d script
Create service script and validate it.
## 5. Enable
Use sysrc app_enable=YES.
## 6. Start
Use service app start.
## 7. Check
Inspect process, port and logs.
## 8. Reverse proxy
Publish through nginx if HTTP should be public.
# 112. Example: safe nginx change
Backup config → edit → nginx -t → service nginx reload → inspect logs → curl endpoint.
# 113. Example: package updated and service broke
Read pkg messages, compare config changes, validate syntax, inspect logs and only then adjust/rollback.
# 114. Example: application did not start after reboot
Check enable flag, rc.d dependencies, mounts, network readiness and logs.
# 115. Example: server works locally but not from LAN
Check bind address, sockstat output, PF rules and interface/routing state.
# 116. Example: disk is full
```sh
df -h
zfs list
du -sh /var/*
```
# 117. Example: suspected disk problem
```sh
zpool status
smartctl -a /dev/ada0
dmesg | tail -n 100
```
# 118. Good FreeBSD administration philosophy
Prefer explicit configuration, native tools, documentation and rollback points.
# 119. Minimal administrator workflow
status → logs → config test → process → port → firewall → remote test.
# 120. Cheat sheet: services
```sh
service NAME status
service NAME restart
sysrc NAME_enable=YES
```
# 121. Cheat sheet: system
```sh
freebsd-version
uname -a
uptime
dmesg
```
# 122. Cheat sheet: packages
```sh
pkg update
pkg upgrade
pkg info
pkg audit -F
```
# 123. Cheat sheet: network
```sh
ifconfig
netstat -rn
sockstat -4 -6 -l
dig
curl
```
# 124. Cheat sheet: ZFS
```sh
zpool status
zfs list
zfs snapshot
zpool scrub
zfs send
zfs receive
```
# 125. Cheat sheet: jails
```sh
jls
jexec JID /bin/sh
```
# 126. Cheat sheet: PF
```sh
pfctl -nf /etc/pf.conf
pfctl -sr
pfctl -si
```
# 127. Cheat sheet: logs
```sh
tail -f /var/log/messages
grep -i error /var/log/messages
```
# 128. Cheat sheet: service diagnostics
service status → native config test → logs → pgrep → sockstat → firewall.
# 129. What to master after this handbook
ZFS administration, jails, PF, rc.d scripting, backup/restore and network diagnostics.
# 130. Documentation and sources
## FreeBSD Handbook
https://docs.freebsd.org/en/books/handbook/
## Configuration, Services, Logging and Power Management
See Handbook administration chapters.
## Packages and Ports
See Handbook Ports and Packages.
## Updating and Upgrading FreeBSD
Use release-specific Handbook/release notes.
## ZFS
Use OpenZFS and FreeBSD documentation.
## Jails and Containers
Use FreeBSD Handbook Jails.
## Firewalls
Use PF/IPFW Handbook chapters.
## Manual pages
Use man(1) locally.
## Release information
https://www.freebsd.org/releases/
## Support and security information
https://www.freebsd.org/security/
# 131. Final thing to remember
Understand the base-system/package split, rc.d/sysrc, /usr/local conventions, ZFS and jails. Those concepts explain most FreeBSD server administration.
