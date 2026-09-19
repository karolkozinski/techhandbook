# FreeBSD Shell — Practical Command-Line Handbook

## 1. Goal

This handbook covers practical command-line administration on FreeBSD:

- filesystem work,
- packages,
- base-system concepts,
- services and rc.d,
- network diagnostics,
- processes,
- disks and ZFS,
- logs,
- permissions,
- jails,
- troubleshooting.

FreeBSD is Unix-like but not Linux. Do not blindly replace command names with Linux equivalents.

## 2. The first mental model: base system vs packages

FreeBSD deliberately separates:

```text
base system
```

from:

```text
third-party software under /usr/local
```

Examples:

Base configuration:

```text
/etc
```

Package configuration:

```text
/usr/local/etc
```

Base service scripts:

```text
/etc/rc.d
```

Package service scripts:

```text
/usr/local/etc/rc.d
```

Understanding this distinction explains many FreeBSD paths.

## 3. Getting help

Manual:

```sh
man ls
man rc.conf
man service
man zfs
```

Search manuals:

```sh
apropos jail
```

FreeBSD manual pages are excellent and should be your first reference.

## 4. freebsd-version

```sh
freebsd-version
```

Shows installed base-system version.

Useful variants may show kernel/userland differences depending on current release.

Also:

```sh
uname -a
uname -K
```

## 5. pwd

```sh
pwd
```

Prints the current directory.

## 6. ls

```sh
ls
ls -l
ls -lah
ls -lt
```

Long listing includes:

- permissions,
- links,
- owner,
- group,
- size,
- modification time,
- name.

FreeBSD `ls` options are similar to Linux but not identical in every detail.

## 7. cd

```sh
cd /usr/local/etc
cd ..
cd ~
cd -
```

Absolute paths begin at `/`.

## 8. mkdir

```sh
mkdir directory
mkdir -p /usr/local/etc/myapp
```

`-p` creates missing parent directories.

## 9. cp

File:

```sh
cp source destination
```

Recursive:

```sh
cp -R source-dir destination-dir
```

Preserve attributes with suitable options according to FreeBSD `cp(1)`; check:

```sh
man cp
```

Do not assume every GNU long option exists.

## 10. mv and rm

Rename/move:

```sh
mv old new
```

Remove file:

```sh
rm file
```

Recursive:

```sh
rm -rf directory
```

As everywhere, verify destructive paths carefully.

## 11. cat and less

Short file:

```sh
cat /etc/rc.conf
```

Long file:

```sh
less /var/log/messages
```

Search in less:

```text
/pattern
n
```

Quit:

```text
q
```

## 12. head and tail

```sh
head -n 20 file
tail -n 100 file
tail -f /var/log/messages
```

Useful for logs.

## 13. grep

```sh
grep error file
grep -i error file
grep -n error file
grep -R "listen" /usr/local/etc
```

Recursive behavior/options can differ slightly from GNU grep; use the local manual.

## 14. find

```sh
find . -name '*.conf'
find /usr/local/etc -type f
find /var/log -type f -mtime -1
```

Preview selections before combining with deletion commands.

## 15. sed and awk

Replace in output:

```sh
sed 's/old/new/g' file
```

AWK fields:

```sh
awk -F: '{print $1}' /etc/passwd
```

BSD `sed` differs from GNU `sed` in some in-place-edit details. Check `man sed` rather than copying Linux snippets blindly.

## 16. Pipes and redirection

```sh
command1 | command2
command > file
command >> file
command 2> errors
command > all.log 2>&1
```

The shell performs these operations before the program starts.

## 17. permissions

Display:

```sh
ls -l
```

Change:

```sh
chmod 644 file
chmod 755 script
chmod 600 secret
```

Owner:

```sh
chown user:group file
```

Recursive changes should be used carefully.

## 18. id and groups

```sh
id
id username
groups
```

Shows UID/GID and supplementary groups.

## 19. su, sudo, doas

Base FreeBSD provides `su`.

Third-party privilege tools may include:

- sudo,
- doas.

Install if desired:

```sh
pkg install sudo
```

or the available doas package.

Do not work permanently as root when unnecessary.

## 20. adduser

Interactive user creation:

```sh
adduser
```

Administrative scripting can use:

```sh
pw
```

Example inspection:

```sh
pw usershow username
```

## 21. pw

`pw(8)` is FreeBSD's command-line user/group management tool.

Examples:

```sh
pw usershow username
pw groupshow wheel
```

Use `man pw` before making complex changes.

## 22. pkg — package manager

Refresh repository metadata:

```sh
pkg update
```

Install:

```sh
pkg install nginx
```

Upgrade installed packages:

```sh
pkg upgrade
```

Remove:

```sh
pkg delete nginx
```

Search:

```sh
pkg search nginx
```

## 23. pkg info

Installed packages:

```sh
pkg info
```

One package:

```sh
pkg info nginx
```

Files:

```sh
pkg info -l nginx
```

Which package owns a file:

```sh
pkg which /usr/local/sbin/nginx
```

## 24. pkg audit

```sh
pkg audit -F
```

Fetches vulnerability information and checks installed packages.

Treat results as a starting point for patching/risk assessment.

## 25. pkg autoremove

```sh
pkg autoremove
```

Removes packages installed only as dependencies that are no longer required.

Review the list before confirming.

## 26. packages vs Ports

Packages are prebuilt binaries.

Ports are build recipes under the Ports Collection.

For ordinary systems, packages are simpler.

Use Ports when you specifically need compile-time options or custom builds.

Do not casually mix packages and custom Ports without understanding dependency consequences.

## 27. service — manage services

Status:

```sh
service nginx status
```

Start:

```sh
service nginx start
```

Stop:

```sh
service nginx stop
```

Restart:

```sh
service nginx restart
```

Reload where supported:

```sh
service nginx reload
```

List enabled/running scripts:

```sh
service -e
```

## 28. Why a service may refuse to start

FreeBSD rc.d normally expects a service to be enabled in `rc.conf`.

Example:

```sh
sysrc nginx_enable=YES
```

Then:

```sh
service nginx start
```

For one-off testing before enabling:

```sh
service nginx onestart
```

## 29. sysrc

Read a setting:

```sh
sysrc nginx_enable
```

Set:

```sh
sysrc nginx_enable=YES
```

Remove a variable:

```sh
sysrc -x nginx_enable
```

`sysrc` is preferable to fragile hand-editing for simple rc.conf variables.

## 30. /etc/rc.conf

Main persistent system-service/network configuration file.

Example:

```text
sshd_enable="YES"
nginx_enable="YES"
```

Package-specific configurations often live under:

```text
/usr/local/etc
```

## 31. rc.d scripts

System:

```text
/etc/rc.d
```

Packages:

```text
/usr/local/etc/rc.d
```

Inspect a script if you need to know:

- accepted actions,
- rc.conf variable names,
- dependencies.

## 32. onestart and onestop

```sh
service nginx onestart
service nginx onestop
```

These bypass the normal enabled-state requirement for one invocation.

Useful for testing.

## 33. force* actions

Some rc scripts support force variants.

Use only when you understand why the normal dependency/config checks are being bypassed.

## 34. Logs

General system log:

```sh
tail -f /var/log/messages
```

Authentication may be in:

```text
/var/log/auth.log
```

depending on configuration.

Services often log to their own files under `/var/log`.

## 35. syslog

FreeBSD uses syslog infrastructure.

Configuration:

```text
/etc/syslog.conf
```

Package applications may also integrate with syslog.

## 36. newsyslog

Log rotation is commonly managed by `newsyslog`.

Configuration:

```text
/etc/newsyslog.conf
/etc/newsyslog.conf.d/
```

and package-specific/local configuration depending on version.

## 37. ps

```sh
ps aux
```

Find process:

```sh
pgrep -af nginx
```

when available.

Process tree options differ; consult FreeBSD `ps(1)`.

## 38. top

```sh
top
```

Shows live CPU, memory, load, and processes.

FreeBSD's `top` output differs from Linux.

## 39. kill and pkill

Graceful:

```sh
kill PID
```

By name:

```sh
pkill nginx
```

Force:

```sh
kill -9 PID
```

SIGKILL is a last resort.

## 40. uptime

```sh
uptime
```

Shows uptime and load averages.

## 41. sysctl

Read kernel/system values:

```sh
sysctl hw.model
sysctl hw.ncpu
sysctl hw.physmem
```

List all:

```sh
sysctl -a
```

Temporary changes can use `sysctl name=value`.

Persistent tuning belongs in appropriate configuration files such as `/etc/sysctl.conf` when applicable.

## 42. ifconfig

Interfaces:

```sh
ifconfig
```

One interface:

```sh
ifconfig em0
```

Shows:

- addresses,
- link state,
- MAC,
- flags.

## 43. routing

Routing table:

```sh
netstat -rn
```

Modern route command:

```sh
route -n get default
```

Check the default gateway and specific route decisions.

## 44. sockstat

Listening Internet sockets:

```sh
sockstat -4 -6 -l
```

All Internet sockets:

```sh
sockstat -4 -6
```

Very useful FreeBSD equivalent to Linux `ss`/lsof-style socket inspection.

## 45. ping

```sh
ping 1.1.1.1
ping example.com
```

Stop with Ctrl+C.

If IP works and name fails, investigate DNS.

## 46. drill and host

FreeBSD commonly provides DNS tools through base/packages depending on release.

Check:

```sh
drill example.com
host example.com
```

Additional BIND utilities can be installed if needed.

## 47. fetch

FreeBSD's `fetch` downloads URLs:

```sh
fetch https://example.com/file.tar.gz
```

It is a native and convenient tool.

You can also install/use `curl`.

## 48. curl

```sh
pkg install curl
curl -I https://example.com
curl -v https://example.com
```

Useful for HTTP diagnostics.

## 49. nc

Netcat:

```sh
nc -vz example.com 443
```

Useful for testing ports.

## 50. SSH server

Status:

```sh
service sshd status
```

Enable:

```sh
sysrc sshd_enable=YES
```

Start:

```sh
service sshd start
```

Config:

```text
/etc/ssh/sshd_config
```

Validate before restart:

```sh
sshd -t
```

## 51. SSH client

```sh
ssh user@server
```

Verbose:

```sh
ssh -v user@server
```

Key generation:

```sh
ssh-keygen -t ed25519
```

## 52. df

```sh
df -h
```

Shows mounted filesystem usage.

## 53. du

```sh
du -sh directory
```

Top-level sizes:

```sh
du -hd 1 /var | sort -h
```

FreeBSD option syntax can differ from GNU tools, so check `man du`.

## 54. geom and gpart

Disk partitioning:

```sh
gpart show
```

Disk devices:

```sh
geom disk list
```

These are native FreeBSD storage tools.

## 55. camcontrol

List storage devices:

```sh
camcontrol devlist
```

Useful for SATA/SAS/SCSI device visibility.

## 56. mount

List mounts:

```sh
mount
```

Persistent mounts:

```text
/etc/fstab
```

Test carefully before reboot.

## 57. ZFS: zpool status

```sh
zpool status
```

This is one of the first commands on a ZFS server.

It shows:

- pool health,
- vdevs,
- disk errors,
- scrub/resilver state.

Short health check:

```sh
zpool status -x
```

Healthy pools should report no known data errors/problems.

## 58. zpool list

```sh
zpool list
```

Shows:

- size,
- allocated,
- free,
- fragmentation,
- capacity,
- health.

## 59. zfs list

```sh
zfs list
```

Shows datasets and usage.

Snapshots:

```sh
zfs list -t snapshot
```

## 60. ZFS snapshots

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

Snapshot deletion is destructive; verify names carefully.

## 61. ZFS rollback

```sh
zfs rollback tank/data@before-change
```

Rollback changes dataset state and can destroy newer changes/snapshots depending on options.

Understand consequences before using it.

## 62. scrub

Start:

```sh
zpool scrub tank
```

Status:

```sh
zpool status tank
```

A scrub verifies checksums and repairs data when redundancy permits.

## 63. zfs send / receive

Replication:

```sh
zfs send tank/data@snap | zfs receive backup/data
```

Over SSH:

```sh
zfs send tank/data@snap | ssh backup zfs receive backup/data
```

A powerful backup/replication mechanism.

Test restores and retention policy.

## 64. Snapshot is not backup

A snapshot on the same pool does not protect you from:

- total pool loss,
- theft,
- fire,
- catastrophic hardware failure,
- some administrative mistakes.

Use external/offsite backup.

## 65. SMART

Install tools:

```sh
pkg install smartmontools
```

Inspect:

```sh
smartctl -a /dev/ada0
```

Device names differ depending on controller/storage stack.

## 66. jails

Jails are FreeBSD's native OS-level isolation mechanism.

Conceptually:

```text
FreeBSD host
├── jail web
├── jail database
└── jail services
```

They share the host kernel but have isolated process/filesystem/network views.

## 67. jail command

List running jails:

```sh
jls
```

Execute:

```sh
jexec JID /bin/sh
```

Or by jail name where supported:

```sh
jexec jailname /bin/sh
```

Configuration depends on FreeBSD version and jail tooling.

## 68. /etc/jail.conf

Modern FreeBSD commonly uses:

```text
/etc/jail.conf
```

for jail definitions.

Third-party jail managers may use their own configuration.

## 69. service inside a jail

Once inside:

```sh
service nginx status
```

works using the jail's rc configuration, subject to jail permissions/capabilities.

## 70. pkg inside a jail

A jail can maintain its own installed packages:

```sh
pkg update
pkg install nginx
```

Treat each jail as its own userspace environment.

## 71. cron

Edit user crontab:

```sh
crontab -e
```

List:

```sh
crontab -l
```

System periodic maintenance is also important on FreeBSD.

## 72. periodic

FreeBSD includes the `periodic` framework.

Common schedules:

- daily,
- weekly,
- monthly.

Run manually:

```sh
periodic daily
```

Configuration is controlled through periodic.conf mechanisms.

## 73. /etc/periodic and /usr/local/etc/periodic

Base periodic scripts and package/local scripts are separated similarly to the rest of FreeBSD.

## 74. base-system updates

FreeBSD base updates differ by release generation and chosen update mechanism.

Use the current FreeBSD Handbook and release notes for your version.

Do not assume `pkg upgrade` updates the base OS.

`pkg` primarily manages third-party packages unless you deliberately use newer pkgbase mechanisms in an environment configured for them.

## 75. pkgbase caution

FreeBSD's package-based base-system mechanisms are evolving across versions.

Check the documentation for your installed release before mixing classic update procedures and pkgbase workflows.

## 76. shutdown and reboot

Reboot:

```sh
shutdown -r now
```

Power off:

```sh
shutdown -p now
```

Do not reboot an important server before checking active operations such as ZFS resilver/scrub, package upgrades, or critical jobs.

## 77. kldstat and kldload

Loaded kernel modules:

```sh
kldstat
```

Load module:

```sh
kldload module
```

Persistent boot-time module configuration may use `/boot/loader.conf`.

## 78. /boot/loader.conf

Used for boot-loader/kernel-module/tunable settings that must apply early.

Do not put ordinary runtime `sysctl` settings here without a reason.

## 79. rc.conf vs sysctl.conf vs loader.conf

Simplified:

```text
/etc/rc.conf       services/network/startup variables
/etc/sysctl.conf   runtime kernel tunables at boot
/boot/loader.conf  loader/early kernel settings/modules
```

## 80. PF firewall

FreeBSD supports PF.

Enable via rc.conf/sysrc according to configuration.

Rules commonly live in:

```text
/etc/pf.conf
```

Check syntax:

```sh
pfctl -nf /etc/pf.conf
```

Show rules:

```sh
pfctl -sr
```

Reload:

```sh
pfctl -f /etc/pf.conf
```

Be careful over remote SSH: a firewall mistake can lock you out.

## 81. pfctl status

```sh
pfctl -s info
```

Useful for checking whether PF is active and counters/state information.

## 82. process/service troubleshooting workflow

1. Is service enabled?

```sh
sysrc service_enable
```

2. Status:

```sh
service SERVICE status
```

3. Configuration test if available.

4. Logs.

5. Process:

```sh
pgrep -af PROCESS
```

6. Socket:

```sh
sockstat -4 -6 -l
```

7. Firewall.

## 83. Network troubleshooting workflow

1. Interface:

```sh
ifconfig
```

2. Route:

```sh
netstat -rn
```

3. Gateway.

4. IP connectivity:

```sh
ping 1.1.1.1
```

5. DNS:

```sh
drill example.com
```

6. Port:

```sh
nc -vz example.com 443
```

7. HTTP:

```sh
curl -v https://example.com
```

## 84. ZFS troubleshooting workflow

```sh
zpool status
zpool list
zfs list
zfs list -t snapshot
dmesg
camcontrol devlist
smartctl -a DEVICE
```

Look for:

- degraded/faulted devices,
- checksum/read/write errors,
- resilvering,
- capacity,
- hardware errors.

## 85. Real-life example: nginx does not start

```sh
service nginx status
sysrc nginx_enable
nginx -t
tail -n 100 /var/log/nginx/error.log
sockstat -4 -6 -l
```

Then try:

```sh
service nginx start
```

only after configuration is valid.

## 86. Real-life example: application port is unavailable

```sh
sockstat -4 -6 | grep ':8080'
```

Then inspect the owning process.

## 87. Real-life example: package file location

```sh
pkg which /usr/local/bin/program
```

Then:

```sh
pkg info PACKAGE
pkg info -l PACKAGE
```

## 88. Real-life example: enable a service

Install:

```sh
pkg install nginx
```

Enable:

```sh
sysrc nginx_enable=YES
```

Validate config:

```sh
nginx -t
```

Start:

```sh
service nginx start
```

Verify:

```sh
service nginx status
sockstat -4 -6 -l
```

## 89. Real-life example: check storage health

```sh
zpool status -x
zpool list
zfs list
df -h
```

If anything is unhealthy, inspect full:

```sh
zpool status
```

before taking action.

## 90. Real-life example: inspect boot messages

```sh
dmesg | less
```

Search:

```sh
dmesg | grep -iE 'error|fail|timeout'
```

## 91. Useful paths

```text
/etc                    base configuration
/usr/local/etc          package configuration
/etc/rc.d               base service scripts
/usr/local/etc/rc.d     package service scripts
/var/log                logs
/boot                   boot configuration
/usr/local/bin          package/user commands
/usr/local/sbin         package admin daemons/tools
```

## 92. Commands worth knowing instinctively

```text
freebsd-version
uname
ls
cd
less
grep
find
pkg
service
sysrc
ps
top
kill
ifconfig
netstat
sockstat
fetch
curl
ssh
df
du
gpart
camcontrol
zpool
zfs
sysctl
jls
jexec
pfctl
```

## 93. Debian vs FreeBSD mental translation

```text
apt            → pkg
systemctl      → service + sysrc
journalctl     → /var/log + syslog/service logs
ip addr        → ifconfig
ip route       → netstat -rn / route
ss             → sockstat
/etc app conf  → often /usr/local/etc for packages
containers     → jails as native FreeBSD mechanism
```

This is only a mental map, not exact equivalence.

## 94. Key rule

Do not administer FreeBSD as “Linux with different command names.”

Learn the FreeBSD architecture:

```text
base system
+ /usr/local packages
+ rc.d
+ rc.conf/sysrc
+ excellent man pages
+ ZFS/jails where appropriate
```

Once that model is clear, the shell becomes very predictable.
