# Debian 13 — Desktop + Server Handbook

Debian is a stable, general-purpose GNU/Linux distribution used on desktops, workstations and servers. This handbook focuses on the system model needed for practical administration: packages, services, logs, networking, permissions, storage, GNOME/KDE and server operation.

**When this handbook is useful:** while setting up a new machine, maintaining a workstation or VPS, diagnosing services and networking, or learning where Debian keeps configuration and runtime state.

**Reference release:** Debian 13 “Trixie”. As of September 20, 2026, the current stable point release is **13.7**. Point releases may advance, while the core Debian 13 administration model described here remains applicable.

Related handbooks: [SSH and Remote Administration](techhandbook:doc-018), [Docker](techhandbook:doc-012), [systemd, cron and Schedulers](techhandbook:doc-052), and [Linux Permissions and Server Security](techhandbook:doc-025).

## Handbook map

- [What Debian is](#1-what-debian-actually-is)
- [Packages and APT](#8-package-management-apt)
- [Debian as a desktop](#18-debian-as-a-desktop)
- [Networking and NetworkManager](#25-networkmanager)
- [Services and logs](#39-systemd-service-startup-core)
- [Disks and filesystems](#53-disks)
- [Debian as a server](#60-debian-as-a-server)
- [Troubleshooting](#112-troubleshooting-step-by-step-method)
- [Documentation and help](#206-where-to-get-help)

# 1. What Debian actually is
Debian is a community-developed GNU/Linux distribution known for stability, broad architecture support, large repositories and a strong server ecosystem.
# 2. Debian branches
## stable
Stable is the production-oriented branch with conservative updates.
## testing
Testing contains packages intended for the next stable release.
## unstable / Sid
Unstable is the continuously changing development branch.
# 3. How the system is built
Debian combines the Linux kernel, GNU/user-space tools, APT/dpkg packaging and, on normal installations, systemd.
# 4. Important directories
## `/`
filesystem root.
## `/home`
user homes.
## `/root`
root home.
## `/etc`
system configuration.
## `/var`
logs, databases, caches and changing data.
## `/usr`
installed programs and shared resources.
## `/bin, /sbin, /lib`
compatibility paths, commonly merged into /usr.
## `/tmp`
temporary files.
## `/run`
runtime state.
## `/mnt`
manual mounts.
## `/media`
removable media.
## `/opt`
optional third-party software.
# 5. Users and permissions
```bash
whoami
id
groups
sudo adduser alice
```
# 6. root and sudo
Use sudo for administrative commands instead of remaining logged in as root.
# 7. chmod, chown and groups
## change owner
```bash
sudo chown user:group file
```
## change permissions
```bash
chmod 640 file
chmod u+x script.sh
```
## add user to a group
```bash
sudo usermod -aG GROUP USER
```
# 8. Package management — APT
```bash
sudo apt update
sudo apt upgrade
```
# 9. Updating the system
```bash
sudo apt update && sudo apt upgrade
```
# 10. Installing packages
```bash
sudo apt install PACKAGE
```
# 11. Removing packages
```bash
sudo apt remove PACKAGE
sudo apt purge PACKAGE
sudo apt autoremove
```
# 12. Searching packages
```bash
apt search NAME
apt show PACKAGE
```
# 13. dpkg
```bash
dpkg -l
dpkg -L PACKAGE
dpkg -S /path/to/file
```
# 14. APT repositories
Repository definitions live in /etc/apt/sources.list and /etc/apt/sources.list.d/.
# 15. main, contrib, non-free, non-free-firmware
## main
Debian Free Software Guidelines-compatible software.
## contrib
free software depending on components outside main.
## non-free
software not meeting Debian free-software criteria.
## non-free-firmware
firmware separated from the main archive components.
# 16. Flatpak
Flatpak is useful mainly for desktop applications distributed independently of Debian packages.
# 17. What to install with APT and what with Flatpak
## APT
Prefer for system software, libraries, CLI tools and services.
## Flatpak
Prefer when a desktop app benefits from newer sandboxed distribution-independent packaging.
# 18. Debian as a desktop
Debian supports GNOME, KDE Plasma and many lighter desktop environments.
# 19. GNOME
Integrated workflow-oriented desktop with Mutter and strong Wayland support.
# 20. KDE Plasma
Highly configurable desktop built around KWin and the Qt ecosystem.
# 21. GNOME versus KDE
Choose by workflow and preferences; both are fully capable.
# 22. You can install GNOME and KDE together
Possible, but duplicate apps, settings and services can make the system less tidy.
# 23. Wayland and X11
Wayland is the modern default on many setups; X11 remains available for compatibility.
# 24. Display manager
Common display managers include GDM, SDDM and LightDM.
# 25. NetworkManager
```bash
nmcli device
nmcli connection show
nmcli connection show --active
```
# 26. Checking IP addresses
```bash
ip addr
```
# 27. Network interfaces
```bash
ip link
```
# 28. DNS
```bash
resolvectl status
dig example.com
```
# 29. Testing networking
```bash
ping 1.1.1.1
traceroute example.com
nc -vz HOST PORT
```
# 30. curl and wget
```bash
curl -I https://example.com
wget https://example.com/file
```
# 31. Audio — PipeWire
Modern Debian desktops commonly use PipeWire for audio and media routing.
# 32. Bluetooth
BlueZ provides the underlying Linux Bluetooth stack; desktop environments add GUI integration.
# 33. Drivers and firmware
Firmware often comes from non-free-firmware; inspect hardware with lspci/lsusb and logs with journalctl/dmesg.
# 34. NVIDIA
Depending on hardware and workload, the proprietary NVIDIA driver may be appropriate.
# 35. Intel and AMD
Modern Intel/AMD graphics usually use open kernel/Mesa drivers.
# 36. Laptop — battery and power
Use desktop power controls, logind/systemd tools and firmware settings; inspect real logs when diagnosing battery behavior.
# 37. Suspend
Suspend issues require checking kernel logs, firmware, drivers and wake sources rather than guessing.
# 38. Printers
CUPS is the traditional Linux printing stack.
# 39. systemd — service startup core
systemd manages system boot, services, timers and much runtime state.
# 40. systemctl
```bash
systemctl status SERVICE
sudo systemctl restart SERVICE
```
# 41. Enable at boot
```bash
sudo systemctl enable --now SERVICE
```
# 42. Is a service running?
```bash
systemctl is-active SERVICE
systemctl status SERVICE
```
# 43. List running services
```bash
systemctl --type=service --state=running
```
# 44. User services
```bash
systemctl --user status
systemctl --user enable --now SERVICE
```
# 45. Logs — journalctl
```bash
journalctl -b
journalctl -p err
```
# 46. Logs for one service
```bash
journalctl -u SERVICE
journalctl -u SERVICE -f
```
# 47. Kernel logs
```bash
journalctl -k
dmesg
```
# 48. Processes
```bash
ps aux
top
htop
```
# 49. PID
A PID uniquely identifies a process while it exists.
# 50. pkill and killall
```bash
pkill NAME
killall NAME
```
# 51. RAM
```bash
free -h
```
# 52. CPU and load average
```bash
lscpu
uptime
top
```
# 53. Disks
```bash
lsblk -f
df -h
```
# 54. Mounting disks
```bash
mount
findmnt
```
# 55. `/etc/fstab`
fstab defines persistent mounts; test changes before rebooting.
# 56. ext4
Mature general-purpose Linux filesystem and common default.
# 57. Btrfs
Copy-on-write filesystem with snapshots, checksums and subvolumes.
# 58. ZFS
Powerful external filesystem/storage stack requiring additional integration on Debian.
# 59. SMART
```bash
sudo smartctl -a /dev/sdX
```
# 60. Debian as a server
Server work centers on SSH, services, logs, networking, updates, backups and observability.
# 61. Installing SSH
```bash
sudo apt install openssh-server
```
# 62. Connecting with SSH
```bash
ssh user@server
```
# 63. SSH keys
```bash
ssh-keygen -t ed25519
```
# 64. ssh-copy-id
```bash
ssh-copy-id user@server
```
# 65. authorized_keys
Public keys authorized for login are commonly stored in ~/.ssh/authorized_keys.
# 66. SSH client configuration
Use ~/.ssh/config for host aliases, usernames, ports and key selection.
# 67. sshd configuration
Server configuration is primarily /etc/ssh/sshd_config.
# 68. Disable root login over SSH
Set an appropriate PermitRootLogin policy and test a normal privileged account first.
# 69. Key-only login
Disable password authentication only after verifying a second working key-based session.
# 70. SCP
```bash
scp file user@server:/tmp/
```
# 71. rsync
```bash
rsync -avz source/ user@server:/srv/app/
```
# 72. Ports
Ports identify transport endpoints; services must listen on the intended interface/port.
# 73. What is listening on the server
```bash
ss -lntup
sudo lsof -i :8080
```
# 74. localhost
127.0.0.1/::1 is loopback-only and not reachable from other machines.
# 75. 0.0.0.0
Binding to 0.0.0.0 listens on all IPv4 interfaces.
# 76. nftables — firewall
nftables is Debian's native packet-filtering framework.
# 77. Minimal firewall idea
Allow established traffic, SSH from trusted sources and only required public application ports.
# 78. UFW
```bash
sudo ufw allow OpenSSH
sudo ufw enable
```
# 79. fail2ban
fail2ban can react to repeated failures, but does not replace strong authentication and firewall policy.
# 80. Nginx
```bash
sudo apt install nginx
```
# 81. Nginx configuration
Main configuration is under /etc/nginx; site files are commonly under sites-available/sites-enabled.
# 82. Test Nginx configuration
```bash
sudo nginx -t
```
# 83. Reverse proxy
Proxy public HTTP traffic to a backend bound to localhost or a private network.
# 84. Certbot and HTTPS
Let's Encrypt/Certbot can automate certificate issuance and renewal.
# 85. Your application as a systemd service
Create a unit with explicit User, WorkingDirectory, ExecStart and restart policy.
# 86. `/usr/local/bin`
Use for locally installed executables not managed by APT.
# 87. PATH
```bash
echo "$PATH"
```
# 88. which and command -v
```bash
command -v nginx
which nginx
```
# 89. Cron
```bash
crontab -e
crontab -l
```
# 90. systemd timers
```bash
systemctl list-timers
```
# 91. Security updates
Keep package metadata fresh and apply security updates on a controlled schedule.
# 92. Checking Debian version
```bash
cat /etc/os-release
cat /etc/debian_version
```
# 93. Hostname
```bash
hostnamectl
```
# 94. Time and time zone
```bash
timedatectl
```
# 95. Time synchronization
Correct time is important for TLS, authentication, logs and distributed systems.
# 96. `hostname`, `/etc/hosts` and DNS
Hostname is local identity; /etc/hosts provides static mappings; DNS resolves names network-wide.
# 97. Archives
```bash
tar -czf backup.tar.gz directory/
tar -xzf backup.tar.gz
```
# 98. zip
```bash
zip -r archive.zip directory
unzip archive.zip
```
# 99. `find`
```bash
find /etc -iname '*.conf'
```
# 100. grep
```bash
grep -Rni 'pattern' /etc
```
# 101. less
```bash
less /var/log/file.log
```
# 102. tail
```bash
tail -f /var/log/file.log
```
# 103. head
```bash
head -n 20 file
```
# 104. Pipes
Use `|` to pass stdout from one command to stdin of another.
# 105. Redirections
Use `>` to overwrite and `>>` to append.
# 106. `tee`
```bash
echo value | sudo tee /etc/example.conf
```
# 107. Editors
vi/Vim/Neovim are reliable across servers; use whichever editor you can operate confidently.
# 108. User shell configuration
Common files include ~/.profile, ~/.bashrc and ~/.zshrc.
# 109. Aliases
Use aliases for interactive convenience, not critical automation.
# 110. Environment variables
```bash
export APP_ENV=production
env
```
# 111. `sudoedit`
```bash
sudoedit /etc/ssh/sshd_config
```
# 112. Troubleshooting — step-by-step method
## 1. What exactly is broken?
Define the symptom precisely.
## 2. Is the process running?
Check service/process state.
## 3. What do the logs say?
Read errors before changing configuration.
## 4. Is the service listening?
Inspect ports and bind addresses.
## 5. Does it work locally?
Test localhost/backend directly.
## 6. Does it work through the correct address?
Test the actual interface/URL.
## 7. Does the firewall allow it?
Inspect local and provider firewall rules.
## 8. Does DNS point to the correct address?
Resolve the hostname and compare with the intended endpoint.
# 113. When boot is slow
```bash
systemd-analyze
systemd-analyze blame
systemd-analyze critical-chain
```
# 114. When the system does not boot correctly
Use recovery mode, previous kernels, journalctl, GRUB and initramfs diagnostics rather than random package removal.
# 115. When disk space suddenly disappears
```bash
df -h
df -i
sudo du -xhd1 /var | sort -h
```
# 116. When DNS does not work
```bash
resolvectl status
dig example.com
ping 1.1.1.1
```
# 117. When SSH does not work
```bash
systemctl status ssh
journalctl -u ssh
ss -lntp | grep ':22'
ssh -vvv user@server
```
# 118. When an application will not start
```bash
systemctl status myapp
journalctl -u myapp -n 100
```
# 119. Desktop — where to look for user configuration
Most user settings live under ~/.config, ~/.local/share and ~/.cache.
# 120. XDG
XDG Base Directory conventions standardize config/data/cache locations.
# 121. GNOME — advanced settings
Use Settings, gsettings and dconf carefully.
# 122. KDE — configuration
KDE stores many settings under ~/.config and exposes extensive GUI controls.
# 123. Default applications
Desktop environments manage MIME-type associations and preferred apps.
# 124. Clipboard and Wayland
Wayland isolates clients more strictly; tools such as wl-copy/wl-paste are common.
# 125. Monitoring temperatures
```bash
sensors
```
# 126. Hardware information
```bash
lscpu
lspci
lsusb
```
# 127. Development packages
```bash
sudo apt install build-essential
```
# 128. Git
```bash
sudo apt install git
git --version
```
# 129. `apt install ./package.deb`
```bash
sudo apt install ./package.deb
```
# 130. AppImage
Portable application format; executable directly after permission changes, but not managed like APT packages.
# 131. Docker on Debian
Docker can package/deploy applications; understand volumes, networks, images and update strategy.
# 132. Container versus VM
## container
Shares the host kernel and isolates processes/filesystems.
## virtual machine
Runs its own guest kernel and provides a stronger isolation boundary at higher overhead.
# 133. Docker Compose
```bash
docker compose up -d
docker compose ps
```
# 134. When not to use Docker
Do not containerize a simple native service only because containers are fashionable.
# 135. Backups
Back up configuration, databases, application data and user data; test restore procedures.
# 136. rsync as a simple backup
```bash
rsync -aH --delete source/ backup/
```
# 137. Backup tools
## restic
Encrypted deduplicating backup tool with many backends.
## Borg
Deduplicating backup tool suitable for local/SSH repositories.
## rclone
Excellent for copying/synchronizing to cloud/object storage.
# 138. Server security — sensible baseline
Updates, SSH keys, least privilege, firewall, backups, logs, secret handling and minimal services.
# 139. Changing the SSH port
Can reduce noise but is not a security control equivalent to keys/MFA/firewalling.
# 140. `sudo` instead of root
Use temporary elevation and separate admin identities.
# 141. Do not run random scripts from the Internet
Read scripts first, especially before piping them to a root shell.
# 142. `sudo apt install` versus manual installation
Prefer package-managed software unless a manual install has a clear maintenance plan.
# 143. What to do after installing Debian on desktop
Update, install firmware/drivers, configure backups, power settings and the applications you actually use.
# 144. What to do after installing Debian on server
Create admin access, keys, updates, firewall, backups/monitoring, then deploy services.
# 145. Useful CLI packages
Examples: curl, wget, git, vim, tmux, htop, jq, ripgrep, rsync, lsof, strace and ncdu.
# 146. `ncdu`
```bash
ncdu /var
```
# 147. `lsof`
```bash
sudo lsof -i :8080
```
# 148. `strace`
```bash
strace -f COMMAND
```
# 149. tmux
```bash
tmux new -s admin
tmux attach -t admin
```
# 150. sudo and `visudo`
```bash
sudo visudo
```
# 151. Adding a user
```bash
sudo adduser USER
```
# 152. Locking a user
```bash
sudo passwd -l USER
```
# 153. Who is logged in
```bash
who
w
```
# 154. Recent SSH/logins
```bash
last
lastlog
```
# 155. Basic desktop troubleshooting
Check journalctl --user, journalctl -b, graphics/session logs, disk space and whether the app starts from a terminal.
# 156. When a GUI application does not start
Launch it from a terminal to capture stderr, then inspect user/system logs.
# 157. When APT update fails
Read the exact repository/signature/network error; verify sources, DNS, time and keys.
# 158. Check where a package comes from
```bash
apt policy PACKAGE
```
# 159. What a package installed
```bash
dpkg -L PACKAGE
```
# 160. Which package owns a file
```bash
dpkg -S /path/to/file
```
# 161. Package documentation
Check /usr/share/doc/PACKAGE and upstream docs.
# 162. man
```bash
man COMMAND
```
# 163. `--help`
```bash
COMMAND --help
```
# 164. systemd targets
Targets group units into system states such as multi-user.target and graphical.target.
# 165. Starting GUI manually
Usually use the display manager; advanced recovery may involve switching targets or starting a compositor/session manually.
# 166. Kernel
The Linux kernel provides scheduling, memory, drivers, networking and core system services.
# 167. GRUB
GRUB loads the selected kernel/initramfs and passes boot parameters.
# 168. Initramfs
Early userspace used before the real root filesystem is mounted.
# 169. LUKS
Standard Linux disk-encryption layer.
# 170. Swap
Extends virtual memory and can support hibernation, but is not a replacement for RAM.
# 171. OOM
The kernel OOM killer terminates processes when memory cannot be reclaimed.
# 172. DNS tools
```bash
dig
host
resolvectl status
```
# 173. traceroute
```bash
traceroute example.com
```
# 174. netcat
```bash
nc -vz HOST PORT
```
# 175. SSH tunneling
```bash
ssh -L 8080:127.0.0.1:8080 user@server
```
# 176. PostgreSQL — administrative basics
```bash
sudo systemctl status postgresql
sudo -u postgres psql
```
# 177. Redis
```bash
sudo systemctl status redis-server
redis-cli ping
```
# 178. Samba file server
Samba provides SMB/CIFS file sharing for Windows-compatible networks.
# 179. NFS
NFS provides Unix/Linux network filesystem sharing.
# 180. Administrator journal
Document what changed, when, why, how to verify it and how to roll it back.
# 181. Snapshot is not a backup
Snapshots usually share the same storage failure domain; keep independent copies.
# 182. Update without reboot?
Many user-space packages can be updated without immediate reboot.
# 183. Does the system require reboot?
Kernel/core library updates may justify reboot; tools such as needrestart can help identify affected services.
# 184. Good desktop practices
Updates, tested backups, minimal random PPAs/scripts, understandable configuration and reproducible setup.
# 185. Good server practices
Minimal services, explicit configuration, logging, backups, monitoring, least privilege and controlled deployment.
# 186. Practical scenario: new VPS
Create admin user → SSH key → update → firewall → backup/monitoring → deploy services → verify.
# 187. Practical scenario: publish a website
DNS → nginx → TLS → document root/app → logs → external test.
# 188. Practical scenario: Go application
Build binary → create service user → systemd unit → localhost listener → nginx reverse proxy → TLS.
# 189. Practical scenario: something occupies a port
```bash
sudo ss -lntup | grep ':PORT'
sudo lsof -i :PORT
```
# 190. Practical scenario: site works locally but not from Internet
Check bind address, firewall, cloud/provider firewall, reverse proxy, DNS and TLS.
# 191. Practical scenario: Wi-Fi does not work
```bash
nmcli device
rfkill list
lspci -k
journalctl -b | grep -i wifi
```
# 192. Practical scenario: laptop shuts down
Inspect battery health, kernel/power logs, firmware and thermal events; reproduce systematically.
# 193. Practical scenario: Docker filled disk
```bash
docker system df
docker image ls
docker container ls -a
```
# 194. Practical scenario: config file before editing
```bash
sudo cp FILE FILE.bak
sudoedit FILE
```
# 195. Service administration pattern
status → logs → config test → local test → port → firewall → DNS/external.
# 196. Most important commands — cheat sheet
## system
```bash
cat /etc/os-release; uptime
```
## packages
```bash
apt update; apt policy PACKAGE
```
## services
```bash
systemctl status SERVICE
```
## logs
```bash
journalctl -u SERVICE
```
## network
```bash
ip addr; ip route; ss -lntup
```
## processes
```bash
ps aux; top
```
## disks
```bash
lsblk -f; df -h
```
## files
```bash
find; grep; less; tail
```
## SSH
```bash
ssh; scp; rsync
```
# 197. Five commands to know instinctively on a server
```bash
systemctl status SERVICE
journalctl -u SERVICE
ss -lntup
df -h
ip route
```
# 198. Five commands worth knowing on desktop
```bash
journalctl -b
nmcli device
lspci
lsusb
systemctl --user status
```
# 199. How to think about Debian
Think in layers: packages, configuration, services, logs, users, network and storage.
# 200. Minimum Debian administrator knowledge
APT/dpkg, systemd/journalctl, SSH, permissions, networking, storage, firewalling, backups and troubleshooting.
# 201. GNOME/KDE versus server — key mental difference
Desktop environments provide integrated UI services; servers expose the same underlying system concepts without the desktop layer.
# 202. Useful work philosophy
Observe first, change one thing at a time, keep rollback options and document non-obvious decisions.
# 203. Important paths to remember
/etc, /var/log, /srv, /usr/local/bin, /home, /run.
# 204. Important files to remember
/etc/fstab, /etc/hosts, /etc/ssh/sshd_config, repository definitions and service unit/config files.
# 205. Important tools to remember
apt, dpkg, systemctl, journalctl, ip, ss, ssh, rsync, find, grep, tar and editor of choice.
# 206. Where to get help
man pages, /usr/share/doc, Debian documentation, upstream project docs, logs and package metadata.
## Official references

- Debian stable release information  
  https://www.debian.org/releases/stable/
- Debian documentation  
  https://www.debian.org/doc/
- Debian Reference  
  https://www.debian.org/doc/manuals/debian-reference/
- Debian Administrator's Handbook  
  https://debian-handbook.info/

# 207. Final cheat sheet: diagnose almost anything
## Service problem
systemctl + journalctl.
## Network problem
ip + ping + dig + curl.
## Port problem
ss + lsof.
## Disk problem
df + du + lsblk.
## RAM problem
free + top + OOM logs.
## Boot problem
journalctl -b + systemd-analyze.
## Package problem
apt policy + dpkg.
## Configuration problem
syntax check + diff + logs.
## Desktop application problem
terminal launch + journalctl --user.
# 208. Most important rule
Do not guess. Observe state, read logs, verify one layer at a time and make the smallest change you understand.
# 209. Summary
Debian is straightforward once you understand APT, systemd, filesystem layout, networking, permissions and logs.
## Document status
English edition aligned structurally with the Polish handbook.
