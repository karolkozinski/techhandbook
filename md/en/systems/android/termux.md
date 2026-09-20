---
id: "doc-032"
title: "Termux - Knowledge Handbook"
slug: "termux-knowledge-handbook"
description: "This handbook explains what Termux is, how it differs from a normal Linux distribution, how to use it productively, and where Android's security model…"
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "android"
  - "termux"
  - "linux"
---

# Termux - Knowledge Handbook

Related topics: [SSH and Remote Administration](techhandbook:doc-018), [Shell Scripting](techhandbook:doc-031), [GitHub](techhandbook:doc-014) and [Python](techhandbook:doc-023).

## Table of Contents

This handbook explains what Termux is, how it differs from a normal Linux distribution, how to use it productively, and where Android's security model limits it.

# 1. What Termux is

Termux is an Android terminal emulator and Linux-like userspace environment. It provides a shell, package manager, compilers, interpreters, SSH, Git and many Unix tools without replacing Android itself.

# 2. How Termux works internally

## 2.1. Kernel

Termux uses the Android device's existing Linux kernel. It does not boot a separate kernel.

## 2.2. Bionic instead of glibc

Android normally uses Bionic rather than glibc. This is a major reason why arbitrary Debian/Ubuntu binaries do not automatically run in native Termux.

## 2.3. Android sandbox

Termux runs as an Android application with the permissions granted to that application. Without root, it cannot freely inspect other apps or modify protected system areas.

## 2.4. Termux processes

Processes launched in Termux are Android application processes from the kernel's point of view. Android may suspend or kill them to reclaim resources.

# 3. Termux vs Debian, classic Linux and FreeBSD

## Termux

Android kernel, Bionic-based userspace, app sandbox, Termux package repository.

## Debian

Full Linux distribution with glibc, standard filesystem hierarchy and normal system-level privileges where root is available.

## FreeBSD

Separate operating system with its own kernel, base system, pkg/Ports and jails.

# 4. Installing Termux

## 4.1. Recommended sources

For the mainstream Termux app, F-Droid and the project's GitHub releases remain the primary sources. A separate Google Play branch exists for Android 11+, but it has different constraints and behavior.

## 4.2. Do not mix sources

Termux and plugin apps must come from compatible signing sources. Mixing packages from different sources can cause signature and integration problems.

# 5. First launch

Start by updating packages and installing a few basic tools:

```bash
pkg update
pkg upgrade
pkg install git openssh vim tmux curl
```

# 6. Termux filesystem

## 6.1. HOME

Your main working directory:

```bash
echo "$HOME"
```

Typical location is inside Termux's private application storage.

## 6.2. PREFIX

Termux installs its own userspace under:

```bash
echo "$PREFIX"
```

## 6.3. Where programs live

Executables are normally under:

```text
$PREFIX/bin
```

## 6.4. Where to keep projects

Prefer directories under your Termux home, for example:

```text
~/projects
```

Shared Android storage has different Unix permission semantics.

# 7. Packages: pkg and apt

## Update package lists

```bash
pkg update
```

## Upgrade installed packages

```bash
pkg upgrade
```

## Install

```bash
pkg install PACKAGE
```

## Remove

```bash
pkg uninstall PACKAGE
```

## Search

```bash
pkg search NAME
```

## Package information

```bash
pkg show PACKAGE
```

## Installed packages

```bash
pkg list-installed
```

## apt

Termux uses APT underneath. `pkg` is the recommended friendly wrapper for normal package operations.

# 8. Basic shell configuration

## Bash

Configuration:

```text
~/.bashrc
```

## Zsh

Install and configure separately:

```bash
pkg install zsh
```

Config: `~/.zshrc`.

## History

Shell history works similarly to normal Unix systems. Protect it if commands may contain secrets.

## tmux

```bash
pkg install tmux
tmux new -s work
```

tmux is especially useful because a dropped terminal or Android UI interruption does not have to kill the session.

# 9. Accessing Android storage

Grant shared-storage access:

```bash
termux-setup-storage
```

This creates convenient links under `~/storage/`.

## 9.1. Important difference

Shared storage is not a normal Unix filesystem. Executable permissions, symlinks and ownership behavior differ. Keep development projects in Termux home when possible.

# 10. SSH

## 10.1. SSH client

```bash
ssh user@server
```

## 10.2. SSH keys

```bash
ssh-keygen -t ed25519
```

Protect private keys and use passphrases where appropriate.

## 10.3. SSH config

```text
~/.ssh/config
```

Example:

```text
Host vps
    HostName 203.0.113.10
    User example
    IdentityFile ~/.ssh/id_ed25519
```

## 10.4. Termux as an SSH server

```bash
pkg install openssh
sshd
```

Default port may differ from standard Linux server expectations. Check the Termux OpenSSH documentation/package behavior.

## 10.5. Setting a password

```bash
passwd
```

Prefer key authentication for remote access.

# 11. Git

```bash
pkg install git
git clone REPOSITORY
git status
git pull
git add .
git commit
git push
```

# 12. Text editors

## Vim

```bash
pkg install vim
```

## Neovim

```bash
pkg install neovim
```

## nano

```bash
pkg install nano
```

## micro

Install if available in the current repository and you prefer a simpler terminal editor.

## In practice

Use the same editor you know from Debian/FreeBSD so server and phone workflows stay consistent.

# 13. Programming and compilation

Termux can run real compilers and interpreters. It is excellent for small scripts, learning and emergency development work.

# 14. Python

```bash
pkg install python
python --version
```

## pip

```bash
python -m pip install PACKAGE
```

## venv

```bash
python -m venv .venv
source .venv/bin/activate
```

## Running a file

```bash
python script.py
```

# 15. Go

```bash
pkg install golang
go version
go run .
go build .
```

# 16. C and C++

```bash
pkg install clang
clang hello.c -o hello
./hello
```

## make

```bash
pkg install make
```

## cmake

```bash
pkg install cmake
```

## Tools

Useful packages include clang, make, cmake, gdb/lldb availability depending on repository/version, pkg-config and Git.

# 17. Node.js and JavaScript

```bash
pkg install nodejs
node --version
npm --version
```

# 18. Web servers

## Python

```bash
python -m http.server 8080
```

## Go

A Go HTTP server runs normally on an unprivileged port such as 8080.

## nginx

```bash
pkg install nginx
```

Use it for experiments rather than assuming phone-hosted nginx should become production infrastructure.

## Privileged ports

Ports below 1024 traditionally require elevated privileges. On unrooted Android, use ports such as 8080, 8000 or 8443.

# 19. Services and background processes

## 19.1. termux-services

```bash
pkg install termux-services
```

Termux services use a runit-style mechanism.

## Start service

Use the service tooling documented by the package, for example `sv up SERVICE`.

## Stop

Use `sv down SERVICE`.

## Enable autostart within the service mechanism

Service enablement is handled through the runit service directory/symlinks used by termux-services.

## Disable

Disable the service using the corresponding service mechanism rather than killing the process only once.

## Status

Use `sv status SERVICE` where applicable.

## 19.2. Wake lock

```bash
termux-wake-lock
termux-wake-unlock
```

A wake lock can reduce suspension risk but increases battery usage.

# 20. Termux:API - controlling Android from the shell

Install the Termux:API application/plugin and package from compatible sources.

## Examples

### Battery status

```bash
termux-battery-status
```

### Clipboard

```bash
termux-clipboard-get
termux-clipboard-set "hello"
```

### Notification

```bash
termux-notification --title "Done" --content "Task completed"
```

### Vibration

```bash
termux-vibrate
```

### Wi-Fi information

```bash
termux-wifi-connectioninfo
```

## What this is useful for

Termux:API connects shell automation to phone features, useful for notifications, status checks and lightweight personal automation.

# 21. proot-distro - Debian and other distributions

```bash
pkg install proot-distro
```

## List

```bash
proot-distro list
```

## Debian

```bash
proot-distro install debian
proot-distro login debian
```

## This is not real root

PRoot emulates parts of a root-like environment in userspace. It does not give kernel-level root over Android.

## Why use proot-distro

Use it when software assumes Debian-style paths, glibc or package layout unavailable in native Termux.

## Cost

PRoot adds overhead and complexity. Prefer native Termux packages when they fit the task.

# 22. What root gives you

Root can expose system files, global networking controls, mounts and other privileged Android/Linux capabilities. It also increases security and maintenance risk.

# 23. What Termux cannot do without root

## Mount

Cannot freely mount arbitrary filesystems at the system level.

## Kernel modules

Cannot load kernel modules.

## System firewall

Cannot freely manage Android's global firewall stack as root could.

## System routing

Cannot arbitrarily rewrite global routing tables requiring privilege.

## Sysctl

Privileged kernel parameters are not generally writable.

## Other applications

Cannot read other apps' private data because of Android sandboxing.

## PID 1

Termux does not control Android's init process and does not become the system init.

# 24. Docker and containers

## PRoot is not Docker

PRoot changes the userspace view of the filesystem/process environment. It is not a normal Linux container runtime.

## If you need Docker

Use a real Linux host, VPS, VM or a carefully designed rooted/custom Android environment with the required kernel capabilities.

# 25. Networking

## Interfaces

Depending on Android/version permissions, tools such as `ip`, `ifconfig` or Termux-specific commands can expose network state.

## Routing

```bash
ip route
```

Availability/output may vary by Android version.

## DNS

```bash
dig example.com
host example.com
```

## Ports

```bash
ss -lnt
```

## curl

```bash
curl -I https://example.com
curl -v https://example.com
```

## wget

```bash
wget https://example.com/file
```

# 26. Backup and migration of Termux

## HOME backup

Example:

```bash
tar -czf termux-home.tar.gz -C "$HOME" .
```

## Git repositories

Push repositories to remote Git hosting so the phone is not the only copy.

## Package list

```bash
pkg list-installed > packages.txt
```

## SSH keys

Back them up securely and never put private keys in public repositories.

# 27. Security

## Do not execute blindly

Do not pipe random Internet scripts into a shell without reading them.

## SSH

Use key authentication, passphrases where useful and a clear SSH config.

## SSH server on the phone

Do not expose it directly to the Internet without a strong reason. Prefer LAN/VPN access.

## Secrets

Keep API tokens and passwords in protected files, environment stores or password managers, not Git.

# 28. Performance and battery

Android optimizes battery aggressively. Long-running tasks may be stopped. Use tmux, wake locks when justified and a real server for persistent services.

# 29. Common problems

## `command not found`

Install the package or inspect `PATH`:

```bash
echo "$PATH"
command -v COMMAND
```

## Packages do not work after a long time

Update Termux packages and ensure the application itself is from a supported current source.

## A Debian program does not run

It may depend on glibc, a different dynamic loader or Linux filesystem assumptions. Use a native Termux package or proot-distro.

## Script contains `#!/bin/bash`

Use:

```bash
#!/usr/bin/env bash
```

because Termux does not normally provide `/bin/bash` at the Android root filesystem.

## `Permission denied` in `/sdcard`

Shared storage does not support normal Unix executable permission behavior. Move scripts/projects into Termux home.

## Process disappeared after some time

Android may have killed the app/background process. Check battery optimization and whether the task belongs on a persistent server instead.

## Termux:API does not work

Check that the API app/plugin and Termux package come from compatible sources and permissions are granted.

# 30. Real-life examples

## 30.1. Phone as emergency VPS terminal

```bash
ssh vps
tmux attach -t admin
```

## 30.2. Quick Git project fix

```bash
git clone REPO
cd project
nvim file
git diff
git commit
git push
```

## 30.3. Test a simple website

```bash
cd site
python -m http.server 8080
```

Open `http://127.0.0.1:8080` in the phone browser.

## 30.4. Local Go backend

```bash
go run .
```

Bind to `127.0.0.1:8080` for local-only testing or a LAN address deliberately when needed.

## 30.5. Notification when a task finishes

```bash
long-command && termux-notification --title "Done" --content "Task finished"
```

## 30.6. Monitor a website

```bash
while sleep 300; do
  curl -fsS https://example.com >/dev/null || termux-notification --title "Alert" --content "Site check failed"
done
```

## 30.7. Phone as simple LAN file server

```bash
python -m http.server 8080 --directory ~/storage/shared
```

Use only on trusted networks and understand that this exposes files to clients that can reach the port.

## 30.8. Debian in your pocket

```bash
proot-distro login debian
```

## 30.9. Termux + tmux + SSH

```text
phone
→ Termux
→ SSH
→ tmux on server
```

This is one of the most practical mobile administration workflows.

# 31. Cheat sheet

## Update

```bash
pkg update && pkg upgrade
```

## Install

```bash
pkg install PACKAGE
```

## Search

```bash
pkg search NAME
```

## HOME

```bash
echo "$HOME"
```

## PREFIX

```bash
echo "$PREFIX"
```

## Phone storage

```bash
termux-setup-storage
ls ~/storage/shared
```

## SSH

```bash
ssh user@host
```

## SSH server

```bash
sshd
```

## Git

```bash
git status
```

## Vim

```bash
vim file
```

## Neovim

```bash
nvim file
```

## Python

```bash
python script.py
```

## Go

```bash
go run .
```

## C/C++

```bash
clang file.c -o app
```

## Node

```bash
node app.js
```

## tmux

```bash
tmux
```

## Debian

```bash
proot-distro login debian
```

## Termux API

```bash
termux-battery-status
```

## Wake lock

```bash
termux-wake-lock
```

## System information

```bash
uname -a
getprop ro.build.version.release
```

# Termux mental model

```text
Android Linux kernel
↓
Android application sandbox
↓
Termux userspace (Bionic)
↓
shell + Unix tools + compilers
```

# When to use what

## Native Termux

Use for SSH, Git, shell scripting, small development tools and lightweight automation.

## proot-distro

Use when you need a Debian-like userspace or glibc-oriented software.

## Debian/VPS

Use for persistent services, Docker, privileged networking and production workloads.

## Rooted Android

Use only when you explicitly need system-level control and accept the security/update trade-offs.

# 32. Sources

Official project sources:

- Termux App: https://github.com/termux/termux-app
- Termux Packages: https://github.com/termux/termux-packages
- Termux:API: https://github.com/termux/termux-api
- proot-distro: https://github.com/termux/proot-distro
- Google Play branch status: https://github.com/termux-play-store

Termux behavior changes with Android versions, so verify current project documentation before relying on an old tutorial.

# Summary

Termux is best understood as a powerful Unix userspace inside Android's application sandbox. It is excellent for administration, scripting and development on the move, but it is not a full Debian installation and not a replacement for a persistent server.
