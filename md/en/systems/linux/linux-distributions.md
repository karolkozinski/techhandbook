# Linux Distributions — Practical Handbook

## 1. What a Linux distribution is

Linux itself is the kernel.

A distribution combines:

- the Linux kernel,
- system tools,
- package manager,
- repositories,
- installer,
- default configuration,
- release model,
- desktop choices,
- documentation and community.

Most differences users experience come from the distribution around the kernel.

## 2. The major families

A useful mental map:

```text
Debian family
Red Hat / Fedora family
Arch family
SUSE family
independent distributions
```

## 3. Debian

Characteristics:

- stability,
- huge repositories,
- strong documentation,
- conservative Stable releases,
- common on servers and desktops.

Package tools:

```bash
apt
apt-cache
dpkg
```

Good for:

- servers,
- development,
- people who value predictability.

## 4. Ubuntu

Based on Debian.

Adds:

- regular releases,
- LTS releases,
- Canonical ecosystem,
- broad commercial support,
- Snap integration.

Often chosen for cloud servers and desktops because many vendors document Ubuntu first.

## 5. Linux Mint

Based mainly on Ubuntu, with a Debian Edition also available.

Focused on desktop usability.

Common desktop:

```text
Cinnamon
```

Good for users moving from Windows who want a traditional interface.

## 6. Fedora

Community distribution sponsored by Red Hat.

Characteristics:

- modern packages,
- new Linux technologies appear early,
- SELinux,
- strong GNOME experience.

Package manager:

```bash
dnf
```

Excellent for development and learning the Red Hat ecosystem.

## 7. RHEL

Red Hat Enterprise Linux.

Enterprise focus:

- long support lifecycle,
- certifications,
- commercial support,
- conservative package versions.

Common in corporate infrastructure.

## 8. Rocky Linux and AlmaLinux

Enterprise-compatible distributions in the RHEL ecosystem.

Useful when you need a RHEL-like environment without a traditional RHEL subscription model for every use case.

## 9. Arch Linux

Rolling-release distribution.

Characteristics:

- current packages,
- minimal initial system,
- user makes many choices,
- excellent Arch Wiki,
- `pacman`.

Install software:

```bash
sudo pacman -S package
```

Good for users who want to understand and control their system.

## 10. Manjaro

Arch-based but more preconfigured and user-oriented.

It has its own repository timing and should not be treated as identical to Arch.

## 11. EndeavourOS

Arch-based distribution aiming to stay relatively close to Arch while providing an easier installation experience.

## 12. openSUSE

Two important variants:

- Leap — more conservative,
- Tumbleweed — rolling release.

Package tools:

```bash
zypper
```

Strong administration tooling through YaST.

## 13. Pop!_OS

Ubuntu-derived desktop distribution created by System76.

Known for workstation and developer usability, especially on System76 hardware.

## 14. Zorin OS

Ubuntu-based desktop distribution focused on users moving from Windows/macOS and polished desktop defaults.

## 15. elementary OS

Ubuntu-based, strongly opinionated desktop experience with its own design language.

## 16. Kali Linux

Debian-derived security-testing distribution.

It includes many pentesting tools by default.

Important:

> Kali is a toolbox, not a magical hacking operating system and not necessarily the best everyday Linux for a beginner.

Use security tools only on systems you are authorized to test.

## 17. Alpine Linux

Small, security-oriented distribution using:

- musl libc,
- BusyBox,
- OpenRC,
- apk.

Package manager:

```bash
apk add package
```

Very common in containers.

Compatibility can differ from glibc-based distributions.

## 18. Gentoo

Source-based distribution.

Key concepts:

- Portage,
- USE flags,
- compiling packages,
- deep customization.

Excellent for learning internals, but more maintenance-intensive.

## 19. NixOS

Declarative distribution built around the Nix package manager.

System configuration can be described as code.

Advantages:

- reproducibility,
- rollback,
- atomic-style generations,
- strong environment isolation.

It requires learning a different mental model.

## 20. Void Linux

Independent rolling distribution.

Uses:

- runit init system,
- xbps package manager.

Known for simplicity and not using systemd.

## 21. Slackware

One of the oldest active Linux distributions.

Traditional Unix-like philosophy and relatively little automation compared with mainstream desktop distributions.

## 22. SteamOS

Gaming-focused Linux system used on Steam Deck.

Modern versions are based on Arch concepts and are designed around Steam's appliance-like update model.

## 23. Proxmox VE

Debian-based virtualization platform.

Combines:

- KVM virtual machines,
- LXC containers,
- web administration,
- clustering,
- storage features.

It is not an ordinary desktop distribution.

## 24. Desktop Environment is not a distribution

You can often install different desktops on the same distribution.

Examples:

- GNOME,
- KDE Plasma,
- XFCE,
- Cinnamon,
- LXQt.

Do not choose a distribution only because a screenshot has a particular panel layout.

## 25. GNOME

Modern, opinionated desktop with a workflow centered around Activities and workspaces.

Common default on Fedora and many enterprise/workstation environments.

## 26. KDE Plasma

Highly configurable desktop built on Qt.

Suitable for users who want a traditional layout or extensive customization.

## 27. XFCE

Lightweight, mature, traditional desktop.

Good for older hardware and users who prefer stability over visual novelty.

## 28. Flatpak

Cross-distribution application packaging.

Strong desktop sandboxing model and popular through Flathub.

## 29. Snap

Canonical's cross-distribution packaging technology.

Integrated strongly with Ubuntu.

## 30. AppImage

Single-file portable application format.

Simple to distribute, but update/sandbox integration depends on the application.

## 31. systemd

Used by most major distributions.

Basic service commands:

```bash
systemctl status service
sudo systemctl restart service
sudo systemctl enable service
journalctl -u service
```

## 32. Alternatives to systemd

Examples:

- OpenRC,
- runit,
- s6,
- traditional init systems.

The init system matters more to administrators than to many desktop users.

## 33. Package-manager families

```text
Debian/Ubuntu     apt + dpkg
Fedora/RHEL       dnf + rpm
Arch              pacman
openSUSE          zypper + rpm
Alpine            apk
Void              xbps
Gentoo            emerge/Portage
NixOS             nix
```

Recognizing the package family is often enough to orient yourself on an unfamiliar machine.

## 34. Release models

### Fixed release

A major release has a known package baseline.

Examples:

- Debian Stable,
- Ubuntu LTS,
- RHEL.

### Rolling release

Packages continuously move forward.

Examples:

- Arch,
- openSUSE Tumbleweed,
- Void.

Neither model is universally better.

## 35. Choosing a distribution

### “I just want a stable desktop”

Consider:

- Debian,
- Ubuntu LTS,
- Linux Mint.

### “I want to learn Linux deeply”

Consider:

- Debian,
- Fedora,
- Arch.

### “I want a server”

Consider:

- Debian,
- Ubuntu LTS,
- RHEL-family systems.

### “I want the newest packages”

Consider:

- Arch,
- Fedora,
- openSUSE Tumbleweed.

### “I want old hardware to feel light”

Consider a lightweight desktop on Debian/Xubuntu/MX-type systems rather than assuming you need a special kernel.

### “I want gaming”

SteamOS, Fedora-family gaming spins, Ubuntu-based systems, and Arch-derived environments are all viable; driver and game-platform support matter more than distro branding.

## 36. What matters most when choosing

- release lifecycle,
- package freshness,
- hardware support,
- documentation,
- package availability,
- administration model,
- community/commercial support.

## 37. What matters less than it seems

### Appearance

Most desktop themes and layouts can be changed.

### Default applications

They can usually be replaced.

Do not confuse defaults with technical limitations.

## 38. Differences are smaller than they look

Most mainstream distributions can run the same:

- browsers,
- editors,
- Go,
- Python,
- Node.js,
- Docker/Podman,
- PostgreSQL,
- nginx.

The difference is primarily how the system is packaged, updated, configured, and supported.

## 39. Practical family map

```text
Debian
 ├── Ubuntu
 │    ├── Mint
 │    ├── Pop!_OS
 │    └── Zorin
 └── Kali

Fedora
 └── RHEL ecosystem
      ├── Rocky
      └── AlmaLinux

Arch
 ├── EndeavourOS
 └── Manjaro

SUSE
 ├── Leap
 └── Tumbleweed
```

## 40. Five distributions worth recognizing

If you know only five, make them:

1. Debian,
2. Ubuntu,
3. Fedora,
4. Arch Linux,
5. openSUSE.

They expose the major approaches and families.

## 41. Five package managers worth recognizing

```text
apt
dnf
pacman
zypper
apk
```

## 42. Key idea

Do not ask only:

```text
Which distribution is best?
```

Ask:

```text
Which release model, package ecosystem, support level,
and administration style fit this machine and workload?
```
