# Termux — Practical Handbook

## 1. What Termux is

Termux is a terminal environment for Android.

It provides:

- a Linux-like userspace,
- a package manager,
- shells,
- SSH,
- Git,
- compilers,
- Python,
- Go,
- Node.js,
- editors,
- many standard command-line tools.

Termux is **not** a normal Debian installation and does not turn Android into a conventional GNU/Linux distribution.

It runs as an Android application inside Android's sandbox.

## 2. How Termux is built

Android uses the Linux kernel.

So the stack is roughly:

```text
hardware
  ↓
Linux kernel
  ↓
Android
  ↓
Termux application sandbox
  ↓
Termux userspace tools
```

Termux processes use the same Android/Linux kernel as the rest of the phone.

There is no separate Termux kernel.

## 3. The kernel

Check:

```bash
uname -a
```

You will see Android's Linux kernel.

This means Termux benefits from real Linux process and networking behavior, but it is still constrained by Android permissions, SELinux, application sandboxing, and device policy.

## 4. Bionic instead of glibc

Android uses **Bionic libc**, not GNU glibc.

This matters because ordinary Linux binaries built for Debian/Ubuntu may not run directly in Termux even when the CPU architecture matches.

Termux packages are compiled for the Android/Termux environment.

## 5. Android sandbox

Each Android application runs under its own UID and permissions.

Termux therefore does not automatically have access to:

- other applications' private data,
- arbitrary system directories,
- protected device settings,
- the root filesystem with root privileges.

This is one of the biggest differences from a normal Linux server.

## 6. Termux vs Debian vs FreeBSD

### Termux

- Android app,
- Linux kernel,
- Bionic libc,
- no normal systemd,
- restricted by Android sandbox,
- package paths under Termux prefix.

### Debian

- full GNU/Linux operating system,
- glibc,
- normal root/admin model,
- systemd by default,
- full server/workstation environment.

### FreeBSD

- separate operating system and kernel,
- BSD userland,
- rc.d services,
- pkg/Ports,
- jails/ZFS ecosystem.

Termux feels Unix-like, but it is its own environment.

## 7. Installation

Use a current trusted Termux distribution source recommended by the Termux project.

Avoid mixing application builds from different sources.

The Google Play build historically lagged or differed from actively maintained channels, so always check the current Termux documentation before installation.

## 8. First update

After installation:

```bash
pkg update
pkg upgrade
```

`pkg` is a convenience wrapper around the package-management stack used by Termux.

## 9. HOME

Your Termux home:

```bash
echo "$HOME"
```

typically points to an app-private directory.

You can safely keep:

- SSH config,
- scripts,
- repositories,
- shell configuration,
- small project files

there.

## 10. PREFIX

Termux installs software under its own prefix.

Check:

```bash
echo "$PREFIX"
```

Typical structure includes:

```text
$PREFIX/bin
$PREFIX/etc
$PREFIX/lib
$PREFIX/share
```

Do not assume:

```text
/usr/bin
/etc
/usr/local
```

have the same meaning as on Debian.

## 11. Where programs live

Find a command:

```bash
command -v ssh
command -v python
command -v vim
```

These usually resolve inside:

```text
$PREFIX/bin
```

## 12. Where to keep projects

Good default:

```text
$HOME/projects
```

Example:

```bash
mkdir -p ~/projects
cd ~/projects
```

Keeping Git repositories in Termux-private storage avoids some Android shared-storage filesystem limitations.

## 13. Package management

Refresh:

```bash
pkg update
```

Upgrade:

```bash
pkg upgrade
```

Install:

```bash
pkg install git
pkg install openssh
pkg install python
```

Remove:

```bash
pkg uninstall PACKAGE
```

Search:

```bash
pkg search PACKAGE
```

Info:

```bash
pkg show PACKAGE
```

List installed packages using the available package tools for your Termux version.

## 14. apt

Termux also exposes apt-level tooling.

For normal use, `pkg` is convenient.

When debugging dependency/repository details, understanding apt underneath can help.

## 15. Shells

Common choices:

- Bash,
- Zsh,
- Fish.

Check current shell process:

```bash
ps -p $$ -o comm=
```

Bash config:

```text
~/.bashrc
```

Zsh config:

```text
~/.zshrc
```

## 16. tmux

Install:

```bash
pkg install tmux
```

Start:

```bash
tmux
```

Detach:

```text
Ctrl+B then D
```

Reconnect:

```bash
tmux attach
```

Very useful when working over SSH or when Android may interrupt foreground sessions.

## 17. Access to Android shared storage

Termux can request storage integration.

Common command:

```bash
termux-setup-storage
```

After permission is granted, Termux creates convenient paths such as:

```text
~/storage/shared
~/storage/downloads
```

Exact names can depend on version.

## 18. Important shared-storage limitation

Android shared storage does not behave like a normal Unix filesystem in every respect.

Possible limitations include:

- executable permission behavior,
- symlinks,
- metadata,
- case sensitivity details,
- performance.

Keep executable projects under Termux HOME when possible.

Use shared storage mainly for data exchanged with Android apps.

## 19. SSH client

Install:

```bash
pkg install openssh
```

Connect:

```bash
ssh user@server
```

Termux is excellent as an emergency SSH client for a VPS or homelab.

## 20. SSH keys

Generate:

```bash
ssh-keygen -t ed25519
```

Files:

```text
~/.ssh/id_ed25519
~/.ssh/id_ed25519.pub
```

Protect the private key.

## 21. SSH config

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

## 22. Termux as an SSH server

Install OpenSSH and set a Termux account password if required by your chosen auth mode:

```bash
passwd
```

Start sshd:

```bash
sshd
```

Termux's SSH port is commonly non-privileged rather than TCP/22.

Check listening ports with tools available in your environment.

For LAN access, secure it with keys and avoid exposing it unnecessarily to the Internet.

## 23. Git

```bash
pkg install git
```

Then:

```bash
git clone ...
git status
git add .
git commit
git push
```

Git works very well inside Termux HOME.

## 24. Vim and Neovim

Install:

```bash
pkg install vim
```

or:

```bash
pkg install neovim
```

Then:

```bash
vim file
nvim file
```

For phone use, choose keyboard mappings you can operate comfortably.

## 25. nano and micro

Simpler editors may be easier on touch devices.

Search/install:

```bash
pkg search nano
pkg search micro
```

## 26. Python

Install:

```bash
pkg install python
```

Check:

```bash
python --version
```

Run:

```bash
python script.py
```

## 27. pip and virtual environments

Create:

```bash
python -m venv .venv
```

Activate:

```bash
. .venv/bin/activate
```

Install:

```bash
python -m pip install PACKAGE
```

Some packages with native dependencies may require Termux-specific build tools or may not support Android cleanly.

## 28. Go

Install:

```bash
pkg install golang
```

Check:

```bash
go version
```

Run/build:

```bash
go run .
go build ./...
```

Go is a particularly good fit for Termux because many projects compile into self-contained binaries.

## 29. C and C++

Install compiler tools through Termux packages.

Search:

```bash
pkg search clang
```

Typical compiler:

```bash
clang hello.c -o hello
```

Termux commonly uses Clang/LLVM.

Do not assume Linux/glibc build instructions work unchanged.

## 30. make and CMake

Install:

```bash
pkg install make
pkg install cmake
```

Then use normal project workflows, subject to Android compatibility.

## 31. Node.js

Search/install:

```bash
pkg search nodejs
pkg install nodejs
```

Check:

```bash
node --version
npm --version
```

Pure JavaScript packages work well.

Packages with native addons may need Android-compatible builds/toolchains.

## 32. Simple HTTP server

Python:

```bash
python -m http.server 8000
```

Then access from the phone:

```text
http://127.0.0.1:8000
```

For LAN access, use the phone's LAN address and consider firewall/network restrictions.

## 33. Go HTTP server

A Go application can listen on a high port such as:

```text
8080
```

This is useful for local development and quick demos.

## 34. nginx

Termux repositories may provide nginx.

Search:

```bash
pkg search nginx
```

Use a non-privileged port unless you have root or Android-specific capabilities.

Termux is fine for experiments; it is usually not the right place for an important public web server.

## 35. Privileged ports

Normal Android applications cannot simply bind privileged ports like a root system daemon.

Use high ports such as:

```text
8080
8443
8022
```

unless the device is rooted and deliberately configured otherwise.

## 36. Background processes

Android may stop application processes for:

- battery optimization,
- memory pressure,
- background restrictions,
- app lifecycle rules.

A process running in Termux is not equivalent to a Linux daemon managed by systemd.

## 37. termux-services

Termux provides a service mechanism through additional packages.

Search/install according to current project documentation.

It is commonly based on runit-style service management.

Use it when you want Termux-managed long-running services.

## 38. Wake lock

Termux can request a wake lock through supported add-ons/APIs.

This can help keep tasks running while the screen is off.

It also consumes battery.

Use deliberately and release it when no longer needed.

## 39. Termux:API

Termux:API connects shell commands to Android capabilities.

Depending on installed add-ons and permissions, commands can expose things such as:

- battery information,
- clipboard,
- notifications,
- vibration,
- Wi-Fi/network details,
- sensors,
- camera/location in supported configurations.

Check the current Termux:API package and add-on documentation.

## 40. Battery example

A typical Termux:API command may return battery information as JSON.

Pipe it through:

```bash
jq
```

for readable output.

Exact command names depend on installed API tools.

## 41. Clipboard

Termux:API can integrate with the Android clipboard.

This is useful for copying command output between terminal and normal phone apps.

Remember that clipboard contents are sensitive.

## 42. Notifications

A script can produce Android notifications through Termux:API.

Useful example:

```text
long backup finishes
→ send Android notification
```

This makes Termux a practical automation environment.

## 43. proot-distro

`proot-distro` can run a userspace filesystem from distributions such as Debian without root.

Concept:

```text
Android kernel
  ↓
Termux
  ↓
proot
  ↓
Debian userspace
```

This is **not** a real VM and not a real Linux container with its own kernel.

## 44. Installing a Debian userspace

Install:

```bash
pkg install proot-distro
```

List available distributions:

```bash
proot-distro list
```

Install Debian:

```bash
proot-distro install debian
```

Enter:

```bash
proot-distro login debian
```

## 45. What proot gives you

Benefits:

- familiar Debian filesystem layout,
- apt packages,
- easier compatibility with some Linux-oriented documentation,
- separate userspace.

Costs:

- overhead,
- incomplete kernel-level behavior,
- no real root privileges,
- some syscalls/features behave differently,
- services may need workarounds.

## 46. PRoot is not Docker

PROot translates filesystem/process behavior in userspace.

Docker depends on kernel features such as:

- namespaces,
- cgroups,
- mounts,
- capabilities.

A non-root Termux environment does not provide the same container model.

## 47. Docker

Normal Docker Engine is not a first-class unrooted Termux feature.

If you genuinely need Docker:

- use a VPS,
- use a Debian/Linux machine,
- use a remote Docker host,
- possibly experiment on a rooted Android device if you fully understand kernel requirements.

For normal phone use, SSH to a Docker host is much simpler.

## 48. Networking

Useful commands:

```bash
ip addr
ip route
ping
curl
ssh
nc
```

Availability/permissions can differ from standard Linux because Android restricts parts of network inspection.

If a low-level command returns permission errors, that may be Android policy rather than a missing Linux feature.

## 49. DNS

Use tools available through Termux packages:

- `nslookup`,
- `dig`,
- `host`,
- `getent` where applicable.

The Android resolver and VPN configuration can influence results.

## 50. curl and wget

Install/use:

```bash
pkg install curl wget
```

Examples:

```bash
curl -I https://example.com
wget https://example.com/file
```

## 51. Backup Termux HOME

Example:

```bash
tar -czf termux-home.tar.gz   --exclude='./storage'   -C "$HOME" .
```

Store backups outside the app-private area too.

Be careful: HOME may contain SSH keys and secrets.

Encrypt sensitive backups.

## 52. Git repositories as backup

Git is useful for source/configuration that belongs in repositories.

It is **not** a backup for:

- private keys,
- databases,
- uncommitted data,
- secrets,
- downloaded files.

## 53. Package list

Before migrating devices, keep a list of installed packages using the package manager tools available on your Termux version.

Then reinstall intentionally on the new device.

Do not blindly restore binaries from an older Android/architecture environment.

## 54. SSH key backup

Protect:

```text
~/.ssh
```

If backing it up:

- encrypt the backup,
- restrict permissions,
- consider generating new device-specific keys instead.

A separate key per device is often cleaner.

## 55. Security

Do not run random:

```bash
curl URL | sh
```

without reading the script.

Your Termux environment may contain:

- SSH keys,
- Git tokens,
- cloud credentials,
- VPN configs,
- project secrets.

Phone access does not make shell commands harmless.

## 56. Termux SSH server security

If you run `sshd`:

- use keys,
- restrict network exposure,
- avoid weak passwords,
- stop it when not needed,
- keep Termux updated.

On public Wi-Fi, be especially careful about listening services.

## 57. Secrets

Keep secrets out of public repositories.

Use:

- password managers,
- environment files with restricted permissions,
- dedicated secret stores,
- separate SSH keys.

## 58. Battery and performance

Compilers, servers, sync loops, and long-running processes can consume significant battery.

Android may also throttle background work.

A phone is a great emergency terminal and development companion, but not an ideal always-on server.

## 59. Common problem: command not found

Check:

```bash
command -v COMMAND
pkg search COMMAND
echo "$PATH"
```

If inside proot, remember you are now using the distro's package manager/environment.

## 60. Common problem: binary from Debian will not run

Possible causes:

- glibc vs Bionic,
- wrong architecture,
- dynamic loader path,
- unsupported syscall,
- executable stored on shared storage.

Install a Termux-native package or build for Android.

## 61. Common problem: `#!/bin/bash`

On Termux, Bash may not live at:

```text
/bin/bash
```

A portable Bash shebang is often:

```bash
#!/usr/bin/env bash
```

provided `bash` is installed and in PATH.

For POSIX scripts:

```sh
#!/usr/bin/env sh
```

can also avoid fixed filesystem assumptions.

## 62. Common problem: permission denied on shared storage

Android shared storage may not preserve executable Unix permissions.

Run executable scripts from Termux HOME instead.

Use shared storage to exchange data, not as your primary Unix project filesystem.

## 63. Common problem: process disappeared

Possible reasons:

- Android background restrictions,
- battery optimization,
- low-memory kill,
- Termux app process stopped,
- shell session ended.

Use tmux, appropriate Termux service mechanisms, and battery settings deliberately.

For important 24/7 services, use a server.

## 64. Real-life use: emergency VPS terminal

```bash
ssh vps
tmux attach
systemctl status nginx
journalctl -u app -n 100
```

This is one of the best Termux use cases.

## 65. Real-life use: quick Git fix

```bash
cd ~/projects/project
git pull --ff-only
nvim file
git diff
git commit
git push
```

Perfect for a small emergency change.

## 66. Real-life use: test a static site

```bash
cd ~/projects/site
python -m http.server 8000
```

Open:

```text
http://127.0.0.1:8000
```

in the phone browser.

## 67. Real-life use: local Go backend

```bash
cd ~/projects/app
go run .
```

Open its local high port in the browser.

## 68. Real-life use: Android notification after a job

Concept:

```bash
long-command &&
termux-notification --title "Done" --content "Job completed"
```

Exact Termux:API command/package must be installed.

## 69. Real-life use: monitoring a website

A simple loop can call:

```bash
curl -fsS https://example.com/health
```

But for continuous monitoring, a VPS or server is more reliable than a phone subject to Android lifecycle restrictions.

## 70. Real-life use: simple LAN file server

For temporary local transfer:

```bash
python -m http.server 8000
```

Run it only on trusted networks and stop it after use.

## 71. Real-life use: Debian in your pocket

Enter:

```bash
proot-distro login debian
```

Use it for:

- Debian package experiments,
- familiar CLI environment,
- testing documentation.

Remember it is still running on Android's kernel through PRoot.

## 72. Termux + tmux + SSH

A very productive phone setup:

```text
Termux
  ↓
tmux
  ↓
SSH
  ↓
VPS / FreeBSD / homelab
```

Your phone becomes a portable administration terminal rather than the server itself.

## 73. What root changes

A rooted Android device can potentially access much more:

- protected files,
- low ports,
- system networking,
- mounts,
- firewall features,
- other application data,
- deeper system modification.

But root also changes the security model and may affect:

- banking apps,
- DRM,
- device integrity checks,
- OTA/update workflows,
- warranty/support expectations depending on vendor.

Root is not required for normal Termux use.

## 74. What Termux cannot normally do without root

Typical limitations include:

- arbitrary mounts,
- loading kernel modules,
- full system firewall control,
- unrestricted sysctl changes,
- controlling PID 1,
- reading other apps' private data,
- acting like a full system service manager.

These are Android boundaries, not bugs in Termux.

## 75. Model for choosing tools

### Native Termux

Use for:

- SSH,
- Git,
- shell,
- editors,
- scripts,
- Go/Python/Node,
- lightweight local servers.

### proot-distro

Use when:

- you need a familiar Debian userspace,
- a tool expects Debian-like paths/packages,
- compatibility is more important than overhead.

### VPS / real Debian

Use for:

- Docker,
- reliable 24/7 services,
- public hosting,
- databases,
- systemd services,
- production monitoring.

### Rooted Android

Use only when you deliberately want to modify the Android system itself.

## 76. Command cheat sheet

```bash
pkg update
pkg upgrade
pkg install git openssh vim python golang nodejs tmux
termux-setup-storage

ssh HOST
git status
python script.py
go run .
node app.js
tmux

proot-distro list
proot-distro install debian
proot-distro login debian
```

## 77. Key paths

```text
$HOME
$PREFIX
~/.ssh
~/.config
~/projects
~/storage/shared
```

## 78. What to remember

Termux is best understood as:

```text
Android application
+ native Android-targeted Unix tools
+ Linux kernel underneath
+ Android sandbox around it
```

It is powerful precisely because it gives you a real shell and real development tools without pretending to be a full server operating system.

## Summary

For practical use, learn:

```text
pkg
HOME/PREFIX
SSH
Git
tmux
one editor
Python/Go/Node as needed
Termux:API
proot-distro
Android limitations
```

Then use the phone as a portable terminal and automation companion, while leaving long-running production infrastructure to machines designed for it.
