# Popular Linux Distributions — Handbook

## 1. Why different distributions exist

A Linux distribution combines:

- Linux kernel,
- user-space tools,
- package manager,
- repositories,
- installer,
- release policy,
- defaults,
- documentation and community.

The kernel may be similar, but package versions, administration tools and philosophy can differ significantly.

## 2. Important concepts

### Distribution

A complete operating system built around Linux.

### Distribution family

A group sharing ancestry or packaging conventions.

Examples:

```text
Debian → Ubuntu → Linux Mint
Red Hat → Fedora / RHEL → Rocky / AlmaLinux
Arch → EndeavourOS / Manjaro
SUSE → openSUSE
```

## 3. Release models

### Stable release

Packages change conservatively within a release.

### Rolling release

Packages are continuously updated.

### LTS

Long-term support releases prioritize longer maintenance periods.

## 4. Package managers

Common ecosystems:

```text
Debian/Ubuntu  apt, dpkg
Fedora/RHEL    dnf, rpm
Arch           pacman
openSUSE       zypper, rpm
Alpine         apk
Gentoo         emerge
Void           xbps
```

## 5. Debian

Characteristics:

- conservative,
- huge repositories,
- strong server use,
- excellent documentation,
- clear stable/testing/unstable branches.

Branches:

```text
stable
testing
unstable
```

Packages:

```bash
apt
dpkg
```

Good for servers, desktops and learning core Linux administration.

## 6. Ubuntu

Built from Debian.

Desktop and Server editions are widely used.

Release types include regular releases and LTS releases.

Package ecosystem:

```text
apt
dpkg
Snap
```

Strengths include broad hardware/software support and a large community.

## 7. Linux Mint

Desktop-focused distribution, usually based on Ubuntu.

Known especially for Cinnamon.

Good for users who want a traditional desktop experience.

## 8. Fedora

Community distribution closely associated with Red Hat.

Uses:

```bash
dnf
rpm
```

Fedora tends to ship newer technologies earlier than enterprise distributions.

Good for developers and users who want a modern desktop/server stack.

## 9. Red Hat Enterprise Linux

Commercial enterprise Linux platform.

Focus:

- long lifecycle,
- enterprise support,
- certification,
- stable ABI/API expectations.

Uses RPM packages and DNF/YUM-family tooling.

## 10. Rocky Linux

Community enterprise distribution designed for RHEL compatibility.

Common on servers where RHEL-like behaviour is wanted without a commercial subscription.

## 11. AlmaLinux

Another major RHEL-compatible enterprise distribution.

## 12. Arch Linux

Rolling-release distribution.

Installation and administration are deliberately hands-on.

Package manager:

```bash
pacman
```

Arch is excellent for learning how a Linux system is assembled.

## 13. AUR

Arch User Repository provides community package build recipes.

It is powerful, but packages are community maintained and should be reviewed before building/installing.

## 14. EndeavourOS

Arch-based distribution with a friendlier installer and relatively light additional tooling.

## 15. Manjaro

Arch-based distribution with its own repositories and release approach.

It aims to simplify desktop use but differs operationally from pure Arch.

## 16. openSUSE

Major RPM-based distribution family.

## 17. openSUSE Leap

More conservative release model.

## 18. openSUSE Tumbleweed

Rolling-release openSUSE edition.

Package manager:

```bash
zypper
```

## 19. YaST

openSUSE administration toolset for system configuration.

## 20. Pop!_OS

Desktop-oriented distribution from System76, historically Ubuntu-based, focused on workstation usability.

## 21. Zorin OS

Ubuntu-based desktop distribution aimed at users moving from Windows/macOS.

## 22. elementary OS

Ubuntu-based desktop distribution with a strongly opinionated visual/UX design.

## 23. Kali Linux

Debian-based security-testing distribution.

Important:

Kali is not “more secure Linux”. It is a toolbox for authorized security work and labs.

## 24. Alpine Linux

Small distribution widely used in containers and minimal systems.

Uses:

```bash
apk
```

Notable characteristics:

- musl libc,
- BusyBox,
- small image size.

Some software assumes glibc and may require extra work.

## 25. Gentoo

Source-based distribution.

Portage and USE flags let users control build-time features.

Excellent for deep learning and customization, but administration takes more time.

## 26. NixOS

Declarative distribution built around the Nix package manager.

System configuration can be described as code.

Excellent reproducibility, but conceptually different from traditional Linux administration.

## 27. Void Linux

Independent rolling distribution.

Uses runit instead of systemd.

Package manager:

```text
xbps
```

## 28. Slackware

One of the oldest Linux distributions.

Conservative, simple and traditional, with less automation than many modern distributions.

## 29. SteamOS

Gaming-focused Linux distribution used by Valve, notably on Steam Deck.

## 30. Proxmox VE

Debian-based virtualization platform focused on KVM virtual machines, LXC containers, clustering and storage.

It is more an infrastructure platform than a general desktop distribution.

## 31. Desktop environment is not a distribution

GNOME, KDE Plasma, Cinnamon, XFCE and LXQt are desktop environments.

You can often install several on the same distribution.

## 32. Common desktop environments

GNOME:
- integrated,
- workflow-focused,
- common on Fedora and Ubuntu.

KDE Plasma:
- highly configurable,
- traditional desktop model,
- strong Wayland support.

Cinnamon:
- familiar traditional layout.

XFCE:
- lightweight and mature.

LXQt:
- light Qt-based desktop.

## 33. Flatpak

Distribution-independent application packaging focused on desktop apps and sandboxing.

## 34. Snap

Canonical packaging/runtime ecosystem, especially associated with Ubuntu.

## 35. AppImage

Single-file desktop application distribution format.

## 36. systemd

Most major distributions use systemd.

```bash
systemctl status SERVICE
systemctl restart SERVICE
systemctl enable SERVICE
journalctl -u SERVICE
```

## 37. Alternatives to systemd

Examples include:

- OpenRC,
- runit,
- s6,
- traditional SysV-style systems.

## 38. Main family comparison

Debian family:
- apt/dpkg,
- enormous ecosystem,
- common on desktop/server.

Red Hat family:
- rpm/dnf,
- strong enterprise presence.

Arch family:
- pacman,
- rolling model,
- hands-on.

SUSE family:
- rpm/zypper,
- YaST tooling.

## 39. How to choose

Want a stable server:
Debian, Ubuntu LTS, RHEL-like systems.

Want a modern developer desktop:
Fedora, Debian, Ubuntu, openSUSE Tumbleweed.

Want to learn Linux deeply:
Debian, Arch, Gentoo.

Want rolling releases:
Arch, Tumbleweed, Void.

Want old hardware:
XFCE/LXQt-based setups on Debian or similar.

Want gaming:
SteamOS, Fedora/Arch-family systems or Ubuntu-based gaming setups can all work.

## 40. What actually matters

More important than distro branding:

- package availability,
- release policy,
- hardware support,
- documentation,
- security update cadence,
- community/support,
- your own familiarity.

## 41. What matters less than people think

Default wallpaper, default applications and desktop theme can usually be changed.

## 42. Distribution differences are shrinking in some areas

Containers, Flatpak, language package managers and cross-platform tooling reduce some differences.

But system administration, boot, packages and filesystem conventions still matter.

## 43. Documentation and communities

Debian:
https://www.debian.org/doc/

Ubuntu:
https://help.ubuntu.com/

Arch:
https://wiki.archlinux.org/

Fedora:
https://docs.fedoraproject.org/

openSUSE:
https://doc.opensuse.org/

## 44. Family shortcut

```text
Debian → Ubuntu → Mint / Pop!_OS / Zorin
Red Hat → Fedora / RHEL → Rocky / AlmaLinux
Arch → EndeavourOS / Manjaro
SUSE → openSUSE Leap / Tumbleweed
```

## 45. Practical map of the Linux world

Learn at least one Debian-family system well.

Recognize RPM-based systems.

Understand what rolling release means.

Know that Alpine, NixOS and Gentoo use different assumptions.

## 46. Five distributions worth recognizing

Debian.

Ubuntu.

Fedora.

Arch Linux.

openSUSE.

If you understand these, most mainstream Linux discussions become much easier to follow.

## 47. Package managers worth recognizing

```text
apt
dnf
pacman
zypper
apk
```

## 48. Most important thing to remember

Linux distributions differ mainly in packaging, release policy, defaults and administration culture—not because they are completely different operating-system species.
