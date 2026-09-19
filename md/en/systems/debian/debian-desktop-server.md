# Debian 13 "Trixie" — Desktop and Server Handbook

## 1. What Debian is

Debian is a GNU/Linux distribution known for:

- stability,
- a large package repository,
- predictable release cycles,
- strong documentation,
- broad architecture support,
- suitability for both desktops and servers.

Debian can be a workstation with GNOME/KDE, a minimal server accessed through SSH, or both.

## 2. Debian branches

### stable

The recommended branch for systems where predictability matters.

Packages are not always the newest, but security and important bug fixes are maintained.

### testing

The next Stable release in preparation.

Packages are newer and change more frequently.

### unstable / Sid

The development branch.

Useful for contributors and users who deliberately accept more churn.

For a production server, Stable is the normal default.

## 3. System structure

A simplified view:

```text
Linux kernel
  ↓
systemd / userspace
  ↓
GNU/Linux tools
  ↓
APT packages
  ↓
desktop/server applications
```

Debian follows standard Unix filesystem conventions with some Debian-specific packaging and service integration.

## 4. Important directories

### /

Filesystem root.

Everything is mounted below it.

### /home

Normal users' home directories.

### /root

Root user's home directory.

### /etc

System configuration.

Examples:

```text
/etc/ssh
/etc/nginx
/etc/systemd
/etc/apt
```

### /var

Variable data:

- logs,
- caches,
- databases,
- package state,
- web/app data.

### /usr

Most installed programs and shared data.

### /bin, /sbin, /lib

On modern Debian these may be merged into `/usr` through symlinks.

Do not rely on historical physical separation.

### /tmp

Temporary files.

Usually not suitable for persistent data.

### /run

Runtime state since boot:

- PID files,
- sockets,
- temporary service state.

### /mnt

Manual mount point convention.

### /media

Often used for removable media mounted by desktop tools.

### /opt

Optional third-party application trees.

## 5. Users and permissions

Check current identity:

```bash
whoami
id
groups
```

File permissions:

```bash
ls -l
```

A typical line:

```text
-rw-r----- 1 app developers 2048 Sep 19 config.yml
```

means:

```text
owner: rw-
group: r--
others: ---
```

## 6. root and sudo

Root has unrestricted system privileges.

For normal administration, prefer:

```bash
sudo command
```

rather than staying logged in as root.

Root shell:

```bash
sudo -i
```

Use it only when necessary.

## 7. chmod, chown, groups

Permissions:

```bash
chmod 644 file
chmod 755 script
chmod 600 secret
```

Ownership:

```bash
sudo chown user:group file
```

Recursive:

```bash
sudo chown -R app:app /srv/app
```

Add user to a group:

```bash
sudo usermod -aG docker user
```

Check afterward:

```bash
id user
```

## 8. APT package management

Refresh package metadata:

```bash
sudo apt update
```

Upgrade installed packages:

```bash
sudo apt upgrade
```

Install:

```bash
sudo apt install PACKAGE
```

Remove:

```bash
sudo apt remove PACKAGE
```

Purge config too:

```bash
sudo apt purge PACKAGE
```

Remove unused dependencies:

```bash
sudo apt autoremove
```

## 9. Searching packages

```bash
apt search nginx
apt show nginx
apt list --installed
apt list --upgradable
```

Package policy/source:

```bash
apt-cache policy nginx
```

## 10. dpkg

Low-level package database tool.

List:

```bash
dpkg -l
```

Files in package:

```bash
dpkg -L nginx
```

Package owning a file:

```bash
dpkg -S /usr/sbin/nginx
```

Install a local deb with apt:

```bash
sudo apt install ./package.deb
```

This handles dependencies better than a raw `dpkg -i` in many cases.

## 11. APT repositories

Repository configuration is stored under:

```text
/etc/apt/sources.list
/etc/apt/sources.list.d/
```

Modern Debian may use deb822 `.sources` files.

Do not add random third-party repositories without understanding:

- signing keys,
- package priorities,
- update policy,
- trust implications.

## 12. main, contrib, non-free, non-free-firmware

Repository components categorize software by licensing/dependency status.

### main

Software meeting Debian Free Software Guidelines and depending on compatible components.

### contrib

Free software that depends on non-free components.

### non-free

Software not meeting Debian's free-software criteria.

### non-free-firmware

Firmware separated for practical hardware support.

Exact repository layout should follow your Debian release documentation.

## 13. Flatpak

Flatpak is a desktop application packaging system independent of APT.

Install if desired:

```bash
sudo apt install flatpak
```

It is useful for:

- desktop apps,
- sandboxed application delivery,
- newer application versions than Stable repositories.

For system libraries and server software, APT is normally the better fit.

## 14. APT vs Flatpak

Use APT for:

- system services,
- development libraries,
- CLI tools,
- drivers,
- system integration.

Use Flatpak for:

- desktop applications where sandboxing/newer releases are useful.

Avoid installing the same app through several systems unless you know which copy you are running.

## 15. Debian as a desktop

A Debian desktop consists of:

```text
kernel
+ graphics stack
+ display manager
+ desktop environment
+ NetworkManager/PipeWire/etc.
+ user applications
```

Two strong choices:

- GNOME,
- KDE Plasma.

## 16. GNOME

GNOME provides:

- Mutter compositor/window manager,
- GNOME Shell,
- Settings,
- Files,
- integrated Wayland session,
- extensions ecosystem.

It has an opinionated workspace-oriented workflow.

Useful settings command:

```bash
gnome-control-center
```

Advanced settings often use:

```bash
gsettings
dconf
```

## 17. KDE Plasma

KDE Plasma provides:

- KWin,
- System Settings,
- Dolphin,
- highly configurable panels and shortcuts,
- Wayland/X11 sessions depending on setup.

It is a good fit if you want extensive desktop customization.

## 18. GNOME vs KDE

Both can be excellent.

The practical differences are mostly:

- workflow,
- default applications,
- customization style,
- resource use,
- integration preferences.

They run the same Debian kernel, packages, shell tools, and server services.

## 19. Having GNOME and KDE together

It is possible to install both.

At login, the display manager can offer multiple sessions.

Potential downsides:

- duplicate applications,
- mixed settings daemons,
- extra packages,
- confusion over default apps/themes.

Not dangerous, just less minimal.

## 20. Wayland and X11

Wayland is the modern display protocol.

X11 remains available for compatibility.

Check session:

```bash
echo "$XDG_SESSION_TYPE"
```

Typical output:

```text
wayland
```

or:

```text
x11
```

Use X11 as a fallback when a specific application/driver workflow still requires it.

## 21. Display manager

Common login managers:

- GDM for GNOME,
- SDDM for KDE.

Check:

```bash
systemctl status display-manager
```

## 22. NetworkManager

On desktops, NetworkManager commonly manages network configuration.

Devices:

```bash
nmcli device
```

Connections:

```bash
nmcli connection show
```

Text UI:

```bash
nmtui
```

Useful for Wi-Fi, Ethernet, VPNs, DNS, and profiles.

## 23. IP addresses and interfaces

```bash
ip -br addr
ip addr
ip link
```

Routes:

```bash
ip route
```

## 24. DNS

With systemd-resolved/NetworkManager environments:

```bash
resolvectl status
```

Also inspect:

```bash
cat /etc/resolv.conf
```

Do not edit generated `/etc/resolv.conf` blindly if NetworkManager/systemd manages it.

## 25. Network diagnostics

Basic sequence:

```bash
ip -br addr
ip route
ping GATEWAY
ping 1.1.1.1
dig example.com
nc -vz example.com 443
curl -v https://example.com
```

Each command tests a different layer.

## 26. curl and wget

```bash
curl -I https://example.com
curl -fsS https://example.com/health
wget https://example.com/file
```

Use them for APIs, downloads, and diagnostics.

## 27. PipeWire

Modern Debian desktops commonly use PipeWire for audio/media routing.

Useful commands may include:

```bash
wpctl status
pactl info
```

Graphical mixers can be used through GNOME/KDE tools.

## 28. Bluetooth

Typical stack uses BlueZ.

CLI:

```bash
bluetoothctl
```

Inside:

```text
power on
scan on
devices
pair ...
connect ...
```

Desktop settings provide an easier interface for normal pairing.

## 29. Firmware and drivers

Hardware support often depends on:

- Linux kernel,
- firmware packages,
- Mesa,
- proprietary vendor drivers where needed.

Inspect hardware:

```bash
lspci -k
lsusb
dmesg
```

## 30. NVIDIA

NVIDIA may use proprietary drivers.

Important points:

- use packages intended for your Debian release,
- understand kernel-module updates,
- Secure Boot can affect unsigned modules,
- Wayland compatibility depends on current driver stack.

Do not install random vendor scripts over Debian packages unless you deliberately choose that maintenance model.

## 31. Intel and AMD graphics

Modern Intel/AMD desktop graphics are usually supported through:

- kernel DRM drivers,
- Mesa userspace,
- firmware.

Check:

```bash
lspci -k
glxinfo
vulkaninfo
```

where relevant tools are installed.

## 32. Laptop battery and power

Useful:

```bash
upower -e
upower -i DEVICE
```

Systemd/logs:

```bash
journalctl -b | grep -i battery
```

Power profiles may be available through desktop/system services.

Avoid stacking several conflicting power-management daemons unless you understand them.

## 33. Suspend

Suspend from systemd:

```bash
systemctl suspend
```

Diagnose resume problems with:

```bash
journalctl -b
journalctl -b -1
dmesg
```

Firmware/graphics drivers are common factors.

## 34. Printers

CUPS is the common printing stack.

Install/manage through desktop tools or:

```bash
systemctl status cups
lpstat -t
```

Modern network printers may also use driverless IPP.

## 35. systemd

systemd manages:

- boot targets,
- services,
- sockets,
- timers,
- logging integration,
- sessions and more.

The key command is:

```bash
systemctl
```

## 36. systemctl basics

Status:

```bash
systemctl status SERVICE
```

Start/stop/restart/reload:

```bash
sudo systemctl start SERVICE
sudo systemctl stop SERVICE
sudo systemctl restart SERVICE
sudo systemctl reload SERVICE
```

Enable at boot:

```bash
sudo systemctl enable SERVICE
```

Enable and start:

```bash
sudo systemctl enable --now SERVICE
```

## 37. Is a service active/enabled?

```bash
systemctl is-active SERVICE
systemctl is-enabled SERVICE
```

Exit status can be used in scripts.

## 38. Running services

```bash
systemctl --type=service --state=running
```

Failed:

```bash
systemctl --failed
```

## 39. User services

```bash
systemctl --user status
systemctl --user list-units
```

User services are useful for applications that should run under a login account without system-wide root service configuration.

## 40. journalctl

System log:

```bash
journalctl
```

Current boot:

```bash
journalctl -b
```

Previous boot:

```bash
journalctl -b -1
```

Service:

```bash
journalctl -u nginx
```

Follow:

```bash
journalctl -u nginx -f
```

## 41. Kernel logs

```bash
journalctl -k
dmesg -T
```

Useful for hardware, storage, network drivers, and OOM events.

## 42. Processes

```bash
ps aux
pgrep -af NAME
top
htop
```

Find process tree:

```bash
pstree
```

when installed.

## 43. Signals

Graceful:

```bash
kill PID
```

Force:

```bash
kill -9 PID
```

By name:

```bash
pkill NAME
```

Understand what you are terminating.

## 44. Memory

```bash
free -h
```

Largest memory users:

```bash
ps aux --sort=-%mem | head
```

OOM events:

```bash
dmesg -T | grep -i oom
```

## 45. CPU and load

```bash
uptime
top
lscpu
```

Load average represents runnable/uninterruptible work over time, not raw CPU percentage.

Interpret it relative to CPU count and workload type.

## 46. Disk space

```bash
df -h
df -i
du -sh DIRECTORY
sudo du -xhd1 / | sort -h
```

When a disk is full, check:

- logs,
- containers,
- package caches,
- backups,
- deleted-but-open files.

## 47. lsblk and blkid

```bash
lsblk -f
sudo blkid
```

Shows devices, filesystems, labels, UUIDs, mount points.

## 48. Mounting filesystems

```bash
sudo mount /dev/sdb1 /mnt/data
sudo umount /mnt/data
```

Persistent mounts go in:

```text
/etc/fstab
```

Test after editing:

```bash
sudo mount -a
```

## 49. ext4

A common default Linux filesystem.

Tools include:

```text
fsck.ext4
tune2fs
resize2fs
```

Do not run destructive filesystem checks on mounted writable filesystems without understanding the rules.

## 50. Btrfs

Copy-on-write filesystem with features such as:

- snapshots,
- subvolumes,
- checksums,
- compression.

Not automatically better for every workload.

Understand its maintenance model before choosing it.

## 51. ZFS on Debian

ZFS is available through external/module packaging in Debian ecosystems.

Strengths:

- checksums,
- snapshots,
- replication,
- pooling.

It adds kernel-module/licensing/upgrade considerations compared with filesystems shipped directly in the Linux kernel.

For a homelab/server, it can still be an excellent choice.

## 52. SMART

Install:

```bash
sudo apt install smartmontools
```

Inspect disk:

```bash
sudo smartctl -a /dev/sda
```

Run tests according to drive type/documentation.

## 53. Debian as a server

A minimal server usually needs:

- SSH,
- firewall,
- updates,
- service management,
- logs,
- backup,
- monitoring.

A GUI is normally unnecessary on a VPS.

## 54. SSH server

Install:

```bash
sudo apt install openssh-server
```

Enable/start:

```bash
sudo systemctl enable --now ssh
```

Status:

```bash
systemctl status ssh
```

## 55. SSH client and keys

Connect:

```bash
ssh user@server
```

Generate key:

```bash
ssh-keygen -t ed25519
```

Copy key:

```bash
ssh-copy-id user@server
```

User authorized keys:

```text
~/.ssh/authorized_keys
```

Permissions:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

## 56. SSH client config

```text
~/.ssh/config
```

Example:

```sshconfig
Host vps
    HostName 203.0.113.10
    User karol
    IdentityFile ~/.ssh/id_ed25519
```

Then:

```bash
ssh vps
```

## 57. sshd configuration

Server config:

```text
/etc/ssh/sshd_config
```

Validate:

```bash
sudo sshd -t
```

Reload:

```bash
sudo systemctl reload ssh
```

Keep your current session open until a new login is tested.

## 58. Root login and password auth

Common hardening direction:

- normal admin user,
- key authentication,
- root SSH login disabled/restricted,
- passwords disabled only after keys work.

Do not copy settings blindly without testing access.

## 59. scp and rsync

SCP:

```bash
scp file vps:/tmp/
```

Rsync:

```bash
rsync -avz ./site/ vps:/srv/site/
```

Preview destructive synchronization:

```bash
rsync -av --delete --dry-run source/ destination/
```

## 60. Ports and listeners

```bash
sudo ss -lntup
```

Port 443:

```bash
sudo lsof -i :443
```

Understand the difference:

```text
127.0.0.1:8080 → local only
0.0.0.0:8080   → all IPv4 interfaces
[::]:8080      → IPv6/all depending on socket config
```

## 61. Firewall

Debian supports nftables as the modern kernel firewall framework.

Inspect:

```bash
sudo nft list ruleset
```

A simpler frontend can be UFW.

Install:

```bash
sudo apt install ufw
```

Example:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

Check:

```bash
sudo ufw status verbose
```

## 62. fail2ban

Can react to repeated authentication failures.

Install:

```bash
sudo apt install fail2ban
```

It is not a substitute for:

- SSH keys,
- proper firewalling,
- updates,
- strong authentication.

## 63. nginx

Install:

```bash
sudo apt install nginx
```

Status:

```bash
systemctl status nginx
```

Main configuration:

```text
/etc/nginx/nginx.conf
/etc/nginx/sites-available/
/etc/nginx/sites-enabled/
```

Validate:

```bash
sudo nginx -t
```

Reload:

```bash
sudo systemctl reload nginx
```

## 64. Reverse proxy

Example:

```nginx
server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Keep backends on localhost when they do not need direct public exposure.

## 65. HTTPS and Certbot

A common Let's Encrypt workflow uses Certbot.

Install the appropriate package for your server stack, then request certificates.

Always test automatic renewal.

Exact Certbot integration commands can change, so follow current Debian/Certbot documentation.

## 66. Your own application as a systemd service

Example:

```ini
[Unit]
Description=Example app
After=network.target

[Service]
User=example
WorkingDirectory=/srv/example
ExecStart=/srv/example/example
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Save under:

```text
/etc/systemd/system/example.service
```

Then:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now example
```

## 67. /usr/local/bin

A good location for manually installed system-wide commands/scripts:

```text
/usr/local/bin
```

Personal commands:

```text
~/.local/bin
```

## 68. PATH

```bash
echo "$PATH"
command -v PROGRAM
type -a PROGRAM
```

Do not solve command conflicts by randomly copying binaries into system directories.

## 69. cron

```bash
crontab -e
crontab -l
```

Example:

```cron
30 7 * * * /usr/local/bin/report >> /var/log/report.log 2>&1
```

Cron has a smaller environment than an interactive shell.

Use full paths where practical.

## 70. systemd timers

List:

```bash
systemctl list-timers
```

Timers are excellent for server jobs because they integrate with:

- systemd services,
- logging,
- boot behavior,
- dependencies.

## 71. Security updates

Regularly:

```bash
sudo apt update
sudo apt upgrade
```

For production, use a planned patching policy.

Automatic security updates can be appropriate, but configure and monitor them deliberately.

## 72. Debian version

```bash
cat /etc/os-release
cat /etc/debian_version
```

Kernel:

```bash
uname -a
```

These answer different questions.

## 73. Hostname and /etc/hosts

Check:

```bash
hostname
hostnamectl
cat /etc/hosts
```

Change:

```bash
sudo hostnamectl set-hostname newname
```

Local hostname resolution and DNS are related but separate.

## 74. Time and timezone

```bash
timedatectl
```

Set:

```bash
sudo timedatectl set-timezone Europe/Warsaw
```

Accurate time matters for:

- TLS,
- logs,
- Kerberos,
- cron,
- databases.

## 75. Archives

tar.gz:

```bash
tar -czf backup.tar.gz directory/
tar -tzf backup.tar.gz
tar -xzf backup.tar.gz
```

zip:

```bash
zip -r archive.zip directory/
unzip archive.zip
```

## 76. find, grep, less, tail

These four tools solve a huge amount of daily administration:

```bash
find /etc -name '*.conf'
grep -Rni 'listen' /etc/nginx
less /var/log/app.log
tail -f /var/log/app.log
```

## 77. tee

Write as root through a pipeline:

```bash
echo 'value' | sudo tee /etc/example.conf
```

Append:

```bash
echo 'value' | sudo tee -a /etc/example.conf
```

## 78. Shell configuration

Bash:

```text
~/.bashrc
~/.profile
```

Environment variables:

```bash
export EDITOR=nvim
```

Aliases:

```bash
alias ll='ls -lah'
```

Keep shell config version-controlled only if secrets are excluded.

## 79. sudoedit

For configuration files:

```bash
sudoedit /etc/ssh/sshd_config
```

This uses your editor without running the editor itself as root.

## 80. Troubleshooting method

Universal sequence:

```text
What exactly fails?
↓
Is the process/service running?
↓
What do logs say?
↓
Is the service listening?
↓
Does it work locally?
↓
Does routing/firewall/DNS permit access?
↓
Did configuration or deployment change?
```

## 81. Slow boot

```bash
systemd-analyze
systemd-analyze blame
systemd-analyze critical-chain
systemctl --failed
journalctl -b
```

## 82. Broken boot

Use:

- previous boot journal,
- recovery mode,
- rescue/emergency targets,
- live media when necessary.

Do not change many unrelated things at once; first identify the failed unit/filesystem/kernel component.

## 83. Disk suddenly full

```bash
df -h
df -i
sudo du -xhd1 / | sort -h
journalctl --disk-usage
docker system df
sudo lsof +L1
```

Deleted files held open by processes can consume space until the process closes/restarts.

## 84. DNS not working

Check:

```bash
ip route
ping 1.1.1.1
resolvectl status
dig example.com
dig @1.1.1.1 example.com
```

If public resolver works but system resolver does not, focus on local DNS configuration.

## 85. SSH not working

On the server:

```bash
systemctl status ssh
sudo ss -lntp | grep ':22'
sudo sshd -t
journalctl -u ssh -n 100
```

On client:

```bash
ssh -vvv user@server
```

Also check firewall and routing.

## 86. Application does not start

```bash
systemctl status app
journalctl -u app -n 100
sudo -u app /srv/app/app
```

if running directly is safe.

Then check:

- config,
- file permissions,
- environment,
- dependencies,
- port conflicts.

## 87. Desktop user configuration

Common locations:

```text
~/.config
~/.local/share
~/.cache
```

These are part of XDG desktop conventions.

Do not delete them blindly to “reset everything” without backup.

## 88. XDG

Important variables:

```bash
echo "$XDG_CONFIG_HOME"
echo "$XDG_DATA_HOME"
echo "$XDG_CACHE_HOME"
```

Defaults are often:

```text
~/.config
~/.local/share
~/.cache
```

when variables are unset.

## 89. GNOME advanced settings

Useful tools:

```bash
gsettings list-schemas
gsettings get SCHEMA KEY
```

GNOME Tweaks may expose additional user settings.

Use extensions carefully; they can affect shell upgrades.

## 90. KDE configuration

KDE stores many settings under:

```text
~/.config
~/.local/share
```

Use System Settings for normal changes.

Manual file editing is possible but less safe while applications are running.

## 91. Default applications

Desktop defaults can be inspected/changed through GNOME/KDE settings and XDG MIME tools.

Useful command:

```bash
xdg-open FILE
```

## 92. Wayland clipboard

Tools may include:

```bash
wl-copy
wl-paste
```

On X11:

- xclip,
- xsel.

Desktop environments also provide clipboard integration.

## 93. Temperatures

Install:

```bash
sudo apt install lm-sensors
sudo sensors-detect
sensors
```

Do not blindly accept every hardware-probing option on critical systems; read prompts.

## 94. Hardware information

```bash
lscpu
lsblk
lspci -k
lsusb
sudo dmidecode
```

`dmidecode` needs root and reads firmware tables.

## 95. Development packages

Common base tools:

```bash
sudo apt install build-essential git curl pkg-config
```

This provides compiler/make essentials for many source builds.

Install language-specific toolchains separately.

## 96. Git

```bash
sudo apt install git
git --version
git config --global user.name "Name"
git config --global user.email "email@example.com"
```

Use SSH keys or an appropriate credential manager for remotes.

## 97. AppImage

An AppImage is a portable desktop application file.

Typical:

```bash
chmod +x App.AppImage
./App.AppImage
```

It is not integrated with APT by default.

Use trusted sources and understand update mechanisms.

## 98. Docker on Debian

Docker is well supported on Debian.

For current Docker Engine installation, follow Docker's official repository instructions.

Check:

```bash
docker --version
docker compose version
systemctl status docker
```

## 99. Container vs VM

Container:

- shares host kernel,
- lightweight,
- fast,
- excellent for applications.

VM:

- separate guest OS/kernel,
- stronger isolation boundary,
- can run another OS.

Use the right abstraction.

## 100. Docker Compose

```bash
docker compose up -d
docker compose ps
docker compose logs -f
docker compose down
```

Back up persistent data separately from container definitions.

## 101. When not to use Docker

Do not add Docker when:

- a single binary/service is simpler,
- the team cannot operate the container stack,
- native packages/systemd solve the problem better,
- the workload needs host-level integration that containers complicate.

Docker is a tool, not a requirement.

## 102. Backups

A real backup should be:

- automated,
- restorable,
- outside the primary disk/server,
- monitored,
- tested.

A local snapshot alone is not enough.

## 103. rsync backup

Example:

```bash
rsync -aHAX --delete   /srv/data/   backup:/backup/server/data/
```

Use `--dry-run` before destructive sync and understand filesystem support for metadata options.

## 104. Backup tools

Popular:

### restic

Encrypted backups to many backends.

### Borg

Deduplicating encrypted backups, often to SSH-accessible repositories.

### rclone

Sync/copy across many cloud storage providers.

Choose based on recovery workflow, not only upload speed.

## 105. Server security baseline

At minimum:

- regular user + sudo,
- SSH keys,
- minimal open ports,
- firewall,
- updates,
- services under dedicated users,
- no secrets in Git,
- backups,
- logs/monitoring.

## 106. Changing SSH port

Changing port can reduce random noise but is not a primary security control.

Keys, least privilege, firewalling, MFA/jump-host/VPN where appropriate matter more.

## 107. sudo instead of root

Keep normal interactive work under an ordinary account.

Elevate specific commands.

This reduces accidental damage and improves auditability.

## 108. Do not run random Internet scripts

Before:

```bash
curl URL | sh
```

download/read or inspect the source and verify the project.

A shell script can do anything your account is allowed to do.

## 109. apt vs manual installation

Prefer APT when software is available in Debian and the packaged version is suitable.

Manual installation may be reasonable for:

- language toolchains,
- vendor software,
- current upstream releases.

Document where it is installed and how it will be updated.

## 110. After installing Debian Desktop

Useful checklist:

```text
[ ] update packages
[ ] firmware/drivers
[ ] network
[ ] backup
[ ] browser/password manager
[ ] Git/dev tools
[ ] encryption status
[ ] Flatpak only if needed
[ ] remove unnecessary startup software
```

## 111. After installing Debian Server

```text
[ ] create admin user
[ ] SSH keys
[ ] update system
[ ] firewall
[ ] time/DNS
[ ] backups
[ ] monitoring
[ ] install only required services
[ ] document configuration
```

## 112. Useful CLI packages

Depending on needs:

```text
curl
wget
git
vim/nvim
mc
tmux
htop
ripgrep
jq
rsync
lsof
ncdu
dnsutils
netcat-openbsd
traceroute
smartmontools
```

## 113. ncdu

Install:

```bash
sudo apt install ncdu
```

Run:

```bash
sudo ncdu /
```

Interactive disk-usage analysis.

Useful when `du` output is cumbersome.

## 114. lsof

```bash
sudo lsof -i :8080
sudo lsof +L1
```

Excellent for ports and deleted/open files.

## 115. strace

Trace system calls:

```bash
strace ./program
```

Useful for:

- missing files,
- permission errors,
- failed network calls,
- mysterious process behavior.

## 116. tmux

Persistent terminal multiplexer.

```bash
tmux
tmux ls
tmux attach
```

Ideal on SSH.

## 117. visudo

Always edit sudoers with:

```bash
sudo visudo
```

It checks syntax before saving.

## 118. Add/lock users

Add:

```bash
sudo adduser alice
```

Lock:

```bash
sudo passwd -l alice
```

Unlock:

```bash
sudo passwd -u alice
```

Understand whether SSH keys and other auth methods remain possible.

## 119. Who is logged in?

```bash
who
w
```

Recent logins:

```bash
last
```

Failed-login information depends on configured logging/security tools.

## 120. Desktop troubleshooting

If an application fails:

1. launch it from a terminal,
2. read stderr,
3. check user logs,
4. inspect package/source,
5. test clean config only after backing it up,
6. inspect graphics/session type if relevant.

## 121. GUI application does not start

Run:

```bash
application-name
```

from a terminal.

Check:

```bash
journalctl --user -b
journalctl -b
```

Look for missing libraries, permissions, Wayland/X11 issues, broken user configuration.

## 122. APT update fails

```bash
sudo apt update
```

Read the exact error.

Common causes:

- unreachable repository,
- expired/wrong signing key,
- wrong release entry,
- DNS/network failure,
- duplicate sources.

Do not delete package metadata randomly.

## 123. Where did a package come from?

```bash
apt-cache policy PACKAGE
```

Shows installed and candidate versions and repositories.

## 124. Package files

```bash
dpkg -L PACKAGE
```

Package owning a file:

```bash
dpkg -S PATH
```

## 125. Package documentation

Look under:

```text
/usr/share/doc/PACKAGE/
```

and use:

```bash
man PROGRAM
PROGRAM --help
```

## 126. systemd targets

Targets group units and represent boot states.

Common concepts:

- multi-user,
- graphical,
- rescue,
- emergency.

Check default:

```bash
systemctl get-default
```

## 127. Kernel

```bash
uname -r
apt list --installed 'linux-image*'
```

Do not remove old kernels until you know which ones are in use and keep at least a recovery option.

## 128. GRUB

GRUB is a common Debian bootloader.

Configuration:

```text
/etc/default/grub
/etc/grub.d/
```

After changes:

```bash
sudo update-grub
```

Be careful: bootloader mistakes can make the system unbootable.

## 129. initramfs

Early userspace loaded during boot.

Rebuild:

```bash
sudo update-initramfs -u
```

Needed after certain driver/storage/encryption changes.

## 130. LUKS

Linux disk encryption commonly uses LUKS/dm-crypt.

Inspect:

```bash
lsblk -f
sudo cryptsetup status NAME
```

Changing encryption layouts is high-risk; keep verified backups.

## 131. Swap

```bash
swapon --show
free -h
```

Swap can be:

- partition,
- file,
- zram depending on setup.

It is not a substitute for adequate RAM but helps with memory pressure.

## 132. OOM

When memory is exhausted, the kernel may invoke the OOM killer.

Check:

```bash
journalctl -k | grep -i oom
dmesg -T | grep -i oom
```

Then find why memory demand exceeded capacity.

## 133. traceroute and netcat

```bash
traceroute example.com
nc -vz example.com 443
```

Useful network-layer and port diagnostics.

## 134. SSH tunneling

Local tunnel:

```bash
ssh -L 5433:127.0.0.1:5432 vps
```

Now local port 5433 reaches PostgreSQL on the server side.

Useful for private admin access.

## 135. PostgreSQL administration basics

Status:

```bash
systemctl status postgresql
```

Open psql as postgres:

```bash
sudo -u postgres psql
```

Back up:

```bash
pg_dump DATABASE > backup.sql
```

Use database-specific backup and recovery procedures.

## 136. Redis

Status:

```bash
systemctl status redis-server
```

Redis is an in-memory data store often used for cache/queues.

Do not expose it publicly without proper security architecture.

## 137. Samba

Samba provides SMB file sharing.

Configuration:

```text
/etc/samba/smb.conf
```

Validate:

```bash
testparm
```

Then reload/restart according to service needs.

## 138. NFS

NFS provides Unix-style network file sharing.

Use exports and firewall/network restrictions carefully.

NFS security depends heavily on the environment and version/options.

## 139. Administrator journal

Document:

- changes,
- reasons,
- dates,
- commands,
- rollback plan,
- incidents.

Git for configuration and a small operations log can save hours later.

## 140. Snapshot is not backup

Snapshots protect against some local mistakes.

They do not protect against:

- server loss,
- disk-array loss,
- theft,
- ransomware with sufficient access,
- site disaster.

Keep independent backups.

## 141. Does the system require reboot?

After kernel/libc/system updates, some processes may still use old libraries.

Tools such as `needrestart` may help identify services or reboot needs.

Always review before rebooting production.

## 142. Good desktop practices

- keep system updated,
- maintain backups,
- use full-disk encryption where appropriate,
- keep firmware current,
- avoid unnecessary PPAs/vendor scripts,
- use password manager/MFA,
- understand where user config lives.

## 143. Good server practices

- minimal services,
- least privilege,
- keys instead of weak passwords,
- firewall,
- automated/tested backups,
- monitoring,
- documented deployments,
- regular patching,
- no manual mystery changes.

## 144. Scenario: new VPS

```text
1. login with provider access
2. create admin user
3. add SSH key
4. verify second session
5. update system
6. firewall
7. disable unnecessary SSH auth paths
8. install nginx/app stack
9. configure backups
10. configure monitoring
```

## 145. Scenario: publish a site

```text
DNS
→ nginx
→ static files or backend on localhost
→ HTTPS
→ logs
→ health check
```

Verify each layer separately.

## 146. Scenario: Go application

```text
build binary
→ /srv/app
→ dedicated user
→ systemd service
→ 127.0.0.1:8080
→ nginx
→ HTTPS
```

Docker is optional.

## 147. Scenario: something occupies a port

```bash
sudo ss -lntp | grep ':8080'
sudo lsof -i :8080
```

Then inspect:

```bash
ps -fp PID
```

## 148. Scenario: works locally, not from Internet

Check:

```text
backend bind address
nginx
firewall
provider firewall
DNS
TLS
```

Do not change all layers at once.

## 149. Scenario: Wi-Fi fails

```bash
nmcli device
rfkill
ip -br addr
journalctl -b | grep -iE 'wifi|wlan|firmware'
lspci -k
```

Possible causes:

- blocked radio,
- missing firmware,
- NetworkManager profile,
- driver,
- power management.

## 150. Scenario: laptop powers off unexpectedly

Check:

```bash
journalctl -b -1
journalctl -k -b -1
dmesg -T
sensors
```

Look for:

- battery events,
- thermal shutdown,
- ACPI,
- kernel panic,
- power-management bugs.

## 151. Scenario: Docker consumed disk

```bash
docker system df
docker image ls
docker ps -a
docker volume ls
```

Do not immediately run aggressive prune commands without checking whether volumes/images are needed.

## 152. Scenario: edit a config safely

```bash
sudo cp -a /etc/app/config /etc/app/config.bak
sudoedit /etc/app/config
app-config-test
sudo systemctl reload app
systemctl status app
```

## 153. Universal service workflow

```text
status
→ logs
→ config test
→ process
→ port
→ local request
→ firewall/network
→ change
→ reload/restart
→ verify
```

## 154. Core command cheat sheet

System:

```bash
cat /etc/os-release
uname -a
hostnamectl
timedatectl
uptime
```

Packages:

```bash
sudo apt update
sudo apt upgrade
apt search
apt show
dpkg -l
```

Services:

```bash
systemctl status
systemctl --failed
sudo systemctl restart
sudo systemctl enable --now
```

Logs:

```bash
journalctl -b
journalctl -u SERVICE
journalctl -f
```

Network:

```bash
ip -br addr
ip route
ss -lntup
dig
curl
nc
```

Processes:

```bash
ps aux
pgrep -af
top
kill
```

Storage:

```bash
df -h
df -i
du -sh
lsblk -f
blkid
```

Files:

```bash
ls -lah
find
grep
rg
less
tail
rsync
tar
```

SSH:

```bash
ssh
scp
rsync
ssh-keygen
ssh-copy-id
```

## 155. Five commands to know instinctively on a server

```bash
systemctl status SERVICE
journalctl -u SERVICE -n 100
sudo ss -lntup
df -h
free -h
```

These immediately reveal a lot.

## 156. Five commands to know on a desktop

```bash
nmcli device
journalctl -b
lspci -k
lsusb
systemctl --user status
```

## 157. How to think about Debian

Debian is easier when you separate layers:

```text
hardware/kernel
→ systemd/services
→ packages
→ system configuration
→ user session
→ desktop/applications
```

Do not debug a browser problem by editing the kernel until evidence points there.

## 158. Minimal Debian administrator knowledge

You should understand:

- APT/dpkg,
- users/groups/permissions,
- systemd,
- journal,
- SSH,
- networking,
- storage/mounts,
- firewall,
- backup,
- configuration paths.

Everything else can be learned when needed.

## 159. GNOME/KDE vs server — mental difference

Desktop:

```text
user session
GUI applications
audio
display
Wi-Fi
power management
```

Server:

```text
services
network
storage
security
logs
automation
uptime
```

The same OS supports both, but the operational priorities differ.

## 160. Useful philosophy

Before changing anything:

```text
observe
→ understand
→ back up
→ change one thing
→ verify
```

This is faster than random experimentation on important systems.

## 161. Important paths to remember

```text
/etc
/var/log
/var/lib
/run
/home
/root
/usr/local/bin
/srv
/opt
/tmp
```

## 162. Important files to recognize

```text
/etc/os-release
/etc/fstab
/etc/hosts
/etc/ssh/sshd_config
/etc/apt/sources.list*
/etc/systemd/system/
/etc/nginx/
```

## 163. Where to find help

```bash
man COMMAND
COMMAND --help
apropos TOPIC
```

Then:

- Debian documentation,
- package docs under `/usr/share/doc`,
- upstream documentation.

Prefer current docs for the release you actually use.

## 164. Final troubleshooting cheat sheet

Service:

```bash
systemctl status SERVICE
journalctl -u SERVICE -n 100
```

Network:

```bash
ip -br addr
ip route
dig NAME
nc -vz HOST PORT
curl -v URL
```

Disk:

```bash
df -h
df -i
du
```

Memory:

```bash
free -h
top
dmesg -T | grep -i oom
```

Boot:

```bash
systemctl --failed
journalctl -b
systemd-analyze blame
```

Configuration:

```text
backup
edit
validate
reload
verify
```

## 165. Most important rule

Do not memorize Debian as a bag of commands.

Learn the system model and ask:

```text
Which layer is failing?
Which command can show me the truth about that layer?
```

That approach scales from a laptop to a production VPS.
