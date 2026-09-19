# Debian 13 “Trixie” — Desktop + Server Handbook

## 1. What Debian is

Debian is a community-developed Linux distribution known for stability, a large package ecosystem and strong server use. Debian 13 is the Trixie release.

## 2. Debian branches

stable — production-oriented and conservative.

testing — future stable branch with newer packages.

unstable/Sid — continuously changing development branch.

## 3. System structure

Debian combines the Linux kernel, GNU/user-space tools, APT/dpkg packaging, systemd and a large repository ecosystem.

## 4. Important directories

```text
/          filesystem root
/home      user homes
/root      root home
/etc       system configuration
/var       logs, caches, databases and changing data
/usr       programs and shared resources
/tmp       temporary files
/run       runtime state
/mnt       manual mounts
/media     removable-media mounts
/opt       optional software
```

## 5. Users and permissions

Inspect identity:

```bash
whoami
id
groups
```

Create a user:

```bash
sudo adduser alice
```

## 6. root and sudo

Use sudo for administrative commands instead of staying logged in as root.

## 7. chmod, chown and groups

```bash
sudo chown user:group file
chmod 640 file
chmod u+x script.sh
sudo usermod -aG GROUP USER
```

## 8. APT package management

```bash
sudo apt update
sudo apt upgrade
sudo apt install PACKAGE
sudo apt remove PACKAGE
sudo apt purge PACKAGE
sudo apt autoremove
apt search NAME
apt show PACKAGE
```

## 9. dpkg

```bash
dpkg -l
dpkg -L PACKAGE
dpkg -S /path/to/file
```

## 10. APT repositories

Debian repositories are configured under /etc/apt/sources.list and /etc/apt/sources.list.d/. Components include main, contrib, non-free and non-free-firmware.

## 11. Flatpak

Flatpak is useful primarily for desktop applications that benefit from sandboxing and distribution-independent packaging.

## 12. APT vs Flatpak

Use APT for system packages, CLI tools, libraries and services. Use Flatpak when it gives a practical desktop-app advantage.

## 13. Debian as a desktop

Debian can run GNOME, KDE Plasma and many other desktop environments.

## 14. GNOME and KDE Plasma

GNOME emphasizes an integrated workflow. KDE Plasma emphasizes configurability and a traditional desktop model. Both can coexist on one installation, although duplicated applications/settings can be confusing.

## 15. Wayland and X11

Modern Debian desktops increasingly use Wayland by default while retaining X11 compatibility through XWayland or optional sessions.

## 16. Display managers

Common display managers include GDM, SDDM and LightDM.

## 17. NetworkManager

```bash
nmcli device
nmcli connection show
nmcli connection show --active
```

## 18. IP, interfaces and DNS

```bash
ip addr
ip link
ip route
resolvectl status
dig example.com
```

## 19. Network testing

```bash
ping 1.1.1.1
curl -I https://example.com
wget URL
traceroute example.com
nc -vz HOST PORT
```

## 20. Audio and Bluetooth

Modern Debian desktops commonly use PipeWire for audio. Bluetooth tooling depends on desktop integration and BlueZ underneath.

## 21. Drivers and firmware

Firmware packages may come from non-free-firmware. Intel and AMD graphics generally use in-kernel/open drivers. NVIDIA may require the proprietary driver depending on hardware and needs.

## 22. Laptop power and sleep

Inspect battery and power behavior through desktop tools, systemd/logind, kernel logs and firmware settings. Suspend failures should be diagnosed with journalctl and dmesg rather than guessed at.

## 23. Printers

CUPS is the standard printing system in many Linux setups.

## 24. systemd and services

```bash
systemctl status SERVICE
sudo systemctl start SERVICE
sudo systemctl stop SERVICE
sudo systemctl restart SERVICE
sudo systemctl reload SERVICE
sudo systemctl enable SERVICE
sudo systemctl enable --now SERVICE
```

## 25. User services

```bash
systemctl --user status
systemctl --user enable --now SERVICE
```

## 26. Logs with journalctl

```bash
journalctl -u SERVICE
journalctl -u SERVICE -f
journalctl -b
journalctl -k
journalctl -p err
```

## 27. Processes

```bash
ps aux
top
htop
pgrep -af NAME
kill PID
pkill NAME
```

## 28. RAM, CPU and load

```bash
free -h
uptime
top
lscpu
```

## 29. Disks and mounts

```bash
lsblk -f
df -h
du -sh *
mount
findmnt
```

Persistent mounts are configured in /etc/fstab.

## 30. Filesystems

ext4 is a common default. Btrfs offers snapshots and advanced features. ZFS can be used but is not part of the Linux kernel tree and needs additional integration.

## 31. SMART

```bash
sudo smartctl -a /dev/sdX
```

## 32. Debian as a server

Server administration centers on SSH, services, logs, networking, firewalling, updates, backups and observability.

## 33. SSH

Install:

```bash
sudo apt install openssh-server
```

Connect:

```bash
ssh user@server
```

Keys:

```bash
ssh-keygen -t ed25519
ssh-copy-id user@server
```

Client config lives in ~/.ssh/config. Server config lives in /etc/ssh/sshd_config.

## 34. SSH hardening

Prefer keys, restrict root login, and disable password authentication only after verifying key access. Always test a new session before closing the old one.

## 35. SCP and rsync

```bash
scp file user@server:/tmp/
rsync -avz source/ user@server:/srv/app/
```

## 36. Ports and listeners

```bash
ss -lntup
sudo lsof -i :8080
```

localhost means loopback-only. 0.0.0.0 means all IPv4 interfaces.

## 37. Firewall

nftables is Debian's native firewall framework. UFW is a simpler frontend for many common cases.

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 38. fail2ban

fail2ban can react to repeated authentication failures, but it does not replace keys, MFA or proper service configuration.

## 39. nginx

```bash
sudo apt install nginx
sudo nginx -t
sudo systemctl reload nginx
```

Reverse proxy example:

```nginx
server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 40. HTTPS

Let's Encrypt/Certbot can automate TLS certificate deployment for nginx.

## 41. Your own app as a systemd service

```ini
[Unit]
Description=My application
After=network.target

[Service]
User=myapp
WorkingDirectory=/srv/myapp
ExecStart=/srv/myapp/myapp
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

## 42. /usr/local/bin and PATH

Locally installed administrative/user tools belong under /usr/local/bin or ~/.local/bin rather than random system directories.

## 43. Cron and systemd timers

```bash
crontab -e
systemctl list-timers
```

systemd timers integrate better with journald and service units; cron remains simple and ubiquitous.

## 44. Security updates and system version

```bash
cat /etc/debian_version
cat /etc/os-release
sudo apt update
sudo apt upgrade
```

## 45. Hostname and time

```bash
hostnamectl
timedatectl
```

Keep time synchronized; authentication and TLS can break when clocks drift badly.

## 46. Useful shell tools

```bash
find
grep
less
tail
head
tee
tar
zip
unzip
```

## 47. User shell configuration

Typical files include ~/.profile, ~/.bashrc and ~/.zshrc depending on shell.

## 48. Environment variables and aliases

Use environment variables for runtime configuration and aliases only for interactive convenience.

## 49. sudoedit

Use sudoedit for safer editing of privileged configuration files:

```bash
sudoedit /etc/ssh/sshd_config
```

## 50. Troubleshooting method

Ask in order: what exactly fails, is the process running, what do logs say, is it listening, does it work locally, does networking/firewall allow it, and does DNS point correctly.

## 51. Slow boot

```bash
systemd-analyze
systemd-analyze blame
systemd-analyze critical-chain
```

## 52. Boot problems

Use journalctl from the failed boot, recovery targets, kernel logs and GRUB/initramfs knowledge rather than random package removal.

## 53. Disk full

```bash
df -h
df -i
sudo du -xhd1 /var | sort -h
```

## 54. DNS problems

```bash
resolvectl status
dig example.com
ping 1.1.1.1
```

## 55. SSH problems

```bash
systemctl status ssh
journalctl -u ssh
ss -lntp | grep ':22'
ssh -vvv user@server
```

## 56. Application fails to start

```bash
systemctl status myapp
journalctl -u myapp -n 100
```

Then test the binary manually under the service user if appropriate.

## 57. Desktop configuration

User settings commonly live under ~/.config, ~/.local/share and ~/.cache according to XDG conventions.

## 58. GNOME and KDE advanced settings

GNOME uses tools such as gsettings/dconf. KDE stores much configuration under ~/.config in KDE-specific files.

## 59. Hardware information

```bash
lscpu
lspci
lsusb
sensors
```

## 60. Development packages and Git

```bash
sudo apt install build-essential git
git --version
```

Install a local .deb with:

```bash
sudo apt install ./package.deb
```

## 61. AppImage

AppImage is a portable single-file desktop application format. It is not integrated into system package management by default.

## 62. Docker

Docker is suitable for isolated application deployment. It is not automatically the best answer for every service.

```bash
docker ps
docker compose up -d
```

## 63. Containers vs virtual machines

Containers share the host kernel. VMs run their own guest kernel and provide stronger isolation boundaries at higher overhead.

## 64. Backups

Back up configuration, databases, user data and application state. Git is not a backup for databases/uploads.

Useful tools include rsync, restic, Borg and rclone.

## 65. Server security baseline

Use updates, SSH keys, minimal open ports, separate service users, firewalling, backups, logs and least privilege.

Changing the SSH port is not a substitute for authentication security.

## 66. Do not run random Internet scripts blindly

Read installation scripts and understand what they change, especially when run as root.

## 67. After desktop installation

Update packages, install firmware/drivers if needed, configure backups, power behavior, browser/dev tools and desktop applications.

## 68. After server installation

Create admin user, configure SSH keys, update system, configure firewall, install monitoring/backups and only then deploy services.

## 69. Useful CLI tools

Examples: curl, wget, git, vim/neovim, tmux, htop, ncdu, lsof, strace, jq, ripgrep and rsync.

## 70. User administration

```bash
sudo adduser USER
sudo usermod -aG GROUP USER
sudo passwd -l USER
who
last
```

## 71. Package troubleshooting

```bash
apt policy PACKAGE
dpkg -L PACKAGE
dpkg -S FILE
man COMMAND
COMMAND --help
```

## 72. systemd targets

Targets group units into system states such as multi-user.target and graphical.target.

## 73. Kernel, GRUB and initramfs

The kernel boots hardware support and core OS functionality. GRUB loads the kernel. initramfs provides early userspace needed before the real root filesystem is mounted.

## 74. LUKS, swap and OOM

LUKS provides disk encryption. Swap extends virtual memory but is not a substitute for RAM. The OOM killer terminates processes when memory is exhausted.

## 75. SSH tunneling

```bash
ssh -L 8080:127.0.0.1:8080 user@server
```

## 76. PostgreSQL, Redis, Samba and NFS

These are common server services. Run them only when required, bind them appropriately and keep database/storage ports private when possible.

## 77. Administrator journal

Document meaningful changes: what changed, when, why, how to roll back and where configuration lives.

## 78. Snapshot is not backup

Snapshots are useful for rollback but usually share the same storage failure domain. Keep independent backups.

## 79. Reboots

Some updates do not require immediate reboot; kernel and core-library updates may. Plan reboots rather than ignoring them indefinitely.

## 80. Good desktop practices

Keep the system updated, backups tested, user configuration in home, and do not solve every GUI issue by reinstalling the OS.

## 81. Good server practices

Minimal services, explicit configuration, logs, backups, monitoring, least privilege and repeatable deployment.

## 82. Scenario: new VPS

```text
create admin user
→ SSH key
→ updates
→ firewall
→ backups/monitoring
→ nginx/app/database
→ TLS
→ health check
```

## 83. Scenario: site works locally but not from Internet

Check listener address, firewall, VPS/provider firewall, nginx, DNS and TLS in that order.

## 84. Scenario: Wi-Fi fails

Check NetworkManager state, rfkill, device/driver, firmware, logs and access point connectivity.

## 85. Scenario: Docker consumed disk

```bash
docker system df
docker image ls
docker container ls -a
```

Prune only after understanding what is unused.

## 86. Before editing configuration

Back up the file or keep it in version control, validate syntax before reload and have a rollback path.

## 87. Service administration pattern

```text
status → logs → config test → local test → port → firewall → DNS/external
```

## 88. Five server commands to know instinctively

```bash
systemctl status SERVICE
journalctl -u SERVICE
ss -lntup
df -h
ip route
```

## 89. Five desktop commands worth knowing

```bash
journalctl -b
nmcli device
lspci
lsusb
systemctl --user status
```

## 90. Mental model of Debian

```text
packages + configuration + services + logs + users + network + storage
```

## 91. Important paths to remember

```text
/etc
/var/log
/srv
/usr/local/bin
/home
/run
```

## 92. Help sources

Use man pages, package documentation under /usr/share/doc, Debian documentation, service project docs and logs.

## 93. Final troubleshooting cheat sheet

Service: systemctl + journalctl.

Network: ip + ping + dig + curl.

Port: ss + lsof.

Disk: df + du.

RAM: free + top.

Boot: journalctl -b + systemd-analyze.

Package: apt policy + dpkg.

Desktop app: terminal launch + journalctl --user.

## 94. Most important rule

Do not guess. Observe state, read logs, test one layer at a time and change only what you understand.
