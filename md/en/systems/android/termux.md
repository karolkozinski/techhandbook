# Termux — Knowledge Handbook

## 1. What Termux is

Termux is a terminal emulator and Linux-like userspace environment for Android. It does **not** replace Android with a normal Linux distribution. It runs as an Android application inside the Android security model.

You get a shell, package manager, compilers, interpreters, SSH, Git and many Unix tools without rooting the phone.

## 2. How Termux works

### Kernel

Termux uses the Android device's existing Linux kernel. It does not boot its own kernel.

### Bionic instead of glibc

Android normally uses the Bionic C library rather than glibc. This is why Linux binaries built for Debian or Ubuntu do not automatically run in native Termux.

### Android sandbox

Termux runs with the permissions granted to the application. Without root, it cannot simply read or modify arbitrary Android system files or other applications' private data.

### Processes

Termux processes are Android application processes from the kernel's point of view. Android may stop them to reclaim resources.

## 3. Termux vs Debian vs FreeBSD

Termux:

- Android kernel,
- Android sandbox,
- own package repository,
- Bionic-based environment.

Debian:

- full Linux distribution,
- normal Linux filesystem hierarchy,
- glibc,
- systemd on standard installs.

FreeBSD:

- different kernel and userspace,
- native pkg/Ports,
- jails rather than Linux containers.

## 4. Installing Termux

Use a current supported source such as F-Droid or the project's official release channel.

Do not mix application builds and plugin applications from different signing sources.

## 5. First steps

Update packages:

```bash
pkg update
pkg upgrade
```

Install essentials:

```bash
pkg install git openssh vim tmux curl
```

## 6. Filesystem

Home:

```bash
echo "$HOME"
```

Termux prefix:

```bash
echo "$PREFIX"
```

Typical program location:

```text
$PREFIX/bin
```

Keep projects under your Termux home when possible:

```text
~/projects/
```

## 7. Package management

```bash
pkg update
pkg upgrade
pkg install PACKAGE
pkg uninstall PACKAGE
pkg search NAME
pkg show PACKAGE
pkg list-installed
```

`pkg` is a friendly wrapper around APT for the Termux environment.

## 8. Shell configuration

Bash:

```text
~/.bashrc
```

Zsh:

```text
~/.zshrc
```

History and aliases work similarly to normal Unix shells.

tmux is especially useful because Android may interrupt the visible terminal session.

## 9. Accessing shared Android storage

Run:

```bash
termux-setup-storage
```

This creates convenient links such as:

```text
~/storage/shared
~/storage/downloads
```

Shared storage has different permission and execution semantics from the Termux home directory.

Do not use shared storage as the default place for Unix-style project files if you need normal executable permissions and symlinks.

## 10. SSH

Client:

```bash
ssh user@server
```

Generate a key:

```bash
ssh-keygen -t ed25519
```

Client config:

```text
~/.ssh/config
```

Termux can also run an SSH server:

```bash
pkg install openssh
sshd
```

Set a password if needed:

```bash
passwd
```

Use key authentication and LAN/VPN exposure deliberately.

## 11. Git

```bash
pkg install git
git clone REPOSITORY
git status
git pull
git add .
git commit
git push
```

## 12. Editors

Vim:

```bash
pkg install vim
```

Neovim:

```bash
pkg install neovim
```

nano and micro are also available.

## 13. Programming

Termux can support Python, Go, C/C++, Node.js and many other development tools.

## 14. Python

```bash
pkg install python
python --version
python script.py
```

Virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

## 15. Go

```bash
pkg install golang
go version
go run .
go build .
```

## 16. C and C++

```bash
pkg install clang make cmake
clang --version
make --version
cmake --version
```

## 17. Node.js

```bash
pkg install nodejs
node --version
npm --version
```

## 18. Web servers

Python:

```bash
python -m http.server 8080
```

Go can run HTTP servers normally.

nginx is available as a Termux package.

Privileged ports such as 80/443 are restricted without elevated privileges, so development servers commonly use ports above 1024.

## 19. Background services

Install service support:

```bash
pkg install termux-services
```

Service management uses runit-style commands.

Wake lock:

```bash
termux-wake-lock
```

Release:

```bash
termux-wake-unlock
```

This can reduce the chance that Android suspends work, but battery optimization still matters.

## 20. Termux:API

Termux:API exposes selected Android functions to shell commands.

Examples may include:

```bash
termux-battery-status
termux-clipboard-get
termux-clipboard-set "text"
termux-notification --title "Done" --content "Task finished"
termux-vibrate
termux-wifi-connectioninfo
```

Useful for automation that interacts with the phone.

## 21. proot-distro

Install:

```bash
pkg install proot-distro
```

List:

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

This gives a distribution-like userspace, not a real VM and not real root over Android.

## 22. What root changes

With root, you may gain access to system-level networking, mounts, protected files and deeper Android administration.

Root also increases risk and can interfere with banking, DRM, enterprise policies and update workflows.

## 23. What native Termux cannot do without root

Normally it cannot:

- mount arbitrary filesystems,
- load kernel modules,
- control the system firewall,
- change global routing freely,
- change kernel sysctls requiring privilege,
- inspect other apps' private data,
- become Android PID 1.

## 24. Docker

Native Docker requires kernel features and privileges that standard unrooted Android/Termux does not expose in the normal way.

PRoot is not Docker.

If you need real Docker, use a VPS, Linux machine, VM or suitable rooted/custom environment.

## 25. Networking

Useful commands:

```bash
ip addr
ip route
ping HOST
dig DOMAIN
curl URL
wget URL
ss -lnt
```

Availability can vary with Android and package versions.

## 26. Backup and migration

Backup home:

```bash
tar -czf termux-home.tar.gz -C "$HOME" .
```

Keep Git repositories pushed to remotes.

Save package list:

```bash
pkg list-installed > packages.txt
```

Back up SSH keys securely.

## 27. Security

Do not pipe random internet scripts directly into a shell without reading them.

Protect SSH keys and API tokens.

If you run sshd, do not expose it to the Internet casually.

## 28. Performance and battery

Android may stop background work.

Long-running tasks are better handled with:

- tmux,
- wake locks when justified,
- disabled battery optimization where appropriate,
- a VPS/server for truly persistent workloads.

## 29. Common problems

### command not found

Install the package or check PATH.

### Linux binary does not run

It may expect glibc or a different dynamic loader.

### Script uses /bin/bash

Termux paths differ. Prefer:

```bash
#!/usr/bin/env bash
```

### Permission denied in shared storage

Android shared storage does not behave like a normal Unix filesystem.

### Process disappears

Android may have killed the application or background process.

### Termux:API does not work

Make sure the matching API plugin/application and package are installed from compatible sources.

## 30. Real-life uses

- emergency SSH terminal for a VPS,
- quick Git fixes,
- testing a static page,
- running a local Go backend,
- sending a phone notification after a script completes,
- monitoring a webpage,
- simple LAN file serving,
- portable Debian userspace with proot-distro,
- tmux + SSH administration from a phone.

## 31. Cheat sheet

```bash
pkg update
pkg upgrade
pkg install git openssh vim tmux curl
termux-setup-storage
ssh user@server
git clone REPO
python script.py
go run .
node app.js
tmux
proot-distro login debian
termux-wake-lock
```

# Mental model

```text
Android kernel
↓
Android app sandbox
↓
Termux userspace
↓
shell + Unix tools + compilers
```

Use native Termux for lightweight Unix work.

Use proot-distro when you need a more familiar Debian-like userspace.

Use a real Linux/FreeBSD server when you need persistent services, privileged networking or container infrastructure.

# Summary

Termux turns an Android device into a powerful portable terminal and development environment without pretending that Android has become a normal Linux server.
