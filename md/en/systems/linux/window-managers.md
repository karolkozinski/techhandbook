---
id: "doc-036"
title: "Linux Window Managers"
slug: "linux-window-managers"
description: "A window manager (WM) controls application windows: placement, size, focus, stacking order, borders, workspaces and keyboard-driven window operations."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "linux"
  - "window manager"
  - "wm"
---

# Linux Window Managers

A window manager is only one layer of a graphical session. X11 and Wayland organize this layer differently, so comparisons between i3, Sway, Hyprland or KWin should distinguish a classic window manager from a compositor.

Related topics: [Popular Linux Distributions](techhandbook:doc-035) and [Debian Desktop and Server](techhandbook:doc-033).

## 1. What is a window manager?

A window manager (WM) controls application windows: placement, size, focus, stacking order, borders, workspaces and keyboard-driven window operations.

A window manager is not the whole desktop. It is one layer of the graphical session.

# 2. Window Manager vs Desktop Environment

## Window Manager

A standalone window manager usually provides:

- window placement,
- focus,
- workspaces,
- keyboard shortcuts,
- basic rules.

You normally add the rest yourself: panel, launcher, notifications, lock screen, wallpaper, network applet and other tools.

## Desktop Environment

A desktop environment (DE) is a complete integrated desktop.

Examples:

```text
GNOME      → Mutter
KDE Plasma → KWin
XFCE       → Xfwm
```

A DE contains a window manager/compositor plus settings, panels, session management, file integration and utilities.

# 3. X11 and Wayland

## X11

Under X11, the X server and window manager are separate components.

Typical X11 WMs include:

- i3,
- bspwm,
- AwesomeWM,
- XMonad,
- dwm,
- Openbox,
- Fluxbox,
- IceWM.

X11 is mature and compatible with a huge amount of software, but its architecture is old and its security/isolation model is weaker.

## Wayland

Under Wayland, the compositor usually also acts as the window manager and display server.

Typical Wayland compositors include:

- Sway,
- Hyprland,
- River,
- Wayfire,
- Labwc,
- KWin,
- Mutter.

X11 applications can usually run through XWayland.

# 4. Floating vs Tiling

## Floating Window Manager

Floating WMs behave like classic desktop systems.

Windows overlap and can be freely moved and resized.

Examples:

- Openbox,
- IceWM,
- KWin in its default mode,
- Mutter,
- Xfwm.

## Tiling Window Manager

Tiling WMs automatically arrange windows so they do not overlap.

This is useful for keyboard-centric work, terminals and multi-monitor setups.

# 5. Dynamic and manual tiling

## Manual tiling

The user explicitly decides how the workspace is split.

i3 and Sway are good examples.

## Dynamic tiling

A layout algorithm automatically determines window placement.

Examples include dwm, AwesomeWM and some Hyprland workflows.

# 6. i3

i3 is one of the best-known X11 tiling window managers.

## Character

It is:

- simple,
- predictable,
- keyboard-oriented,
- well documented,
- excellent for learning tiling concepts.

## Debian installation

```bash
sudo apt update
sudo apt install i3
```

You can choose i3 from the display manager session menu.

## Configuration

Default configuration:

```text
~/.config/i3/config
```

or on older setups:

```text
~/.i3/config
```

Reload after changes:

```text
Mod+Shift+r
```

## Typical shortcuts

Common defaults:

```text
Mod+Enter       terminal
Mod+d           launcher
Mod+Shift+q     close window
Mod+1..9        workspace
Mod+Shift+1..9  move window to workspace
Mod+h/j/k/l     focus
Mod+Shift+h/j/k/l move window
```

The exact Mod key is usually Super/Windows or Alt.

## Advantages

- easy to understand,
- stable configuration,
- lightweight,
- huge amount of examples online,
- good stepping stone to Sway.

## Disadvantages

- X11 only,
- visual effects are minimal,
- some desktop conveniences need separate tools.

# 7. Sway

Sway is an i3-compatible Wayland compositor.

## Installation

On Debian:

```bash
sudo apt install sway
```

Availability and package freshness depend on the Debian release.

## Configuration

```text
~/.config/sway/config
```

A large part of i3 configuration syntax transfers directly.

## Typical set

A practical Sway desktop often includes:

```text
Sway
Waybar
foot / Alacritty
mako
wofi / bemenu
swaylock
swaybg
grim + slurp
wl-clipboard
```

## Advantages

- Wayland,
- familiar for i3 users,
- simple and stable mental model,
- good keyboard workflow.

## Disadvantages

- some X11-era utilities need Wayland alternatives,
- NVIDIA behavior depends on driver/platform state,
- visual customization is less flashy than Hyprland.

# 8. Hyprland

Hyprland is a modern Wayland compositor focused on dynamic tiling, animation and visual customization.

## Character

It combines:

- tiling,
- floating,
- animations,
- workspace effects,
- extensive configuration,
- a large community ecosystem.

## Configuration

Typical location:

```text
~/.config/hypr/hyprland.conf
```

Larger setups often split configuration into several files.

## Typical set

```text
Hyprland
Waybar
hyprlock
hypridle
wofi / rofi-wayland
mako / swaync
kitty / foot
grim + slurp
wl-clipboard
```

## Advantages

- modern Wayland stack,
- polished animations,
- flexible window rules,
- strong customization.

## Disadvantages

- configuration changes more often than in mature i3,
- many community dotfiles are unnecessarily complex,
- beginners can spend more time decorating than learning the workflow.

# 9. bspwm

bspwm is an X11 tiling window manager built around a binary-space-partition tree.

## Architecture

bspwm focuses on window management.

Keyboard shortcuts are typically handled separately by:

```text
sxhkd
```

This separation makes the system highly modular.

## Configuration

Common files:

```text
~/.config/bspwm/bspwmrc
~/.config/sxhkd/sxhkdrc
```

## Advantages

- clean architecture,
- scriptable through `bspc`,
- easy to combine with external tools.

## Disadvantages

- X11 only,
- requires more assembly than i3,
- shortcuts and WM configuration live in separate components.

# 10. AwesomeWM

AwesomeWM is a dynamic X11 window manager configured in Lua.

## Configuration

```text
~/.config/awesome/rc.lua
```

## Advantages

- extremely programmable,
- Lua configuration,
- built-in widgets and panels,
- dynamic layouts.

## Disadvantages

- configuration is effectively programming,
- easier to over-engineer than i3.

# 11. XMonad

XMonad is a tiling window manager written and configured in Haskell.

## Configuration

Typically:

```text
~/.xmonad/xmonad.hs
```

## Character

XMonad treats desktop configuration almost like a program.

## Advantages

- powerful layout model,
- highly extensible,
- stable architecture.

## Disadvantages

- Haskell creates a high entry barrier,
- troubleshooting configuration may require understanding compilation errors.

# 12. dwm

dwm is the suckless project's minimalist dynamic window manager.

## Most important difference

Configuration is largely done by editing C source and recompiling.

Typical workflow:

```text
edit config.h
→ compile
→ install
→ restart dwm
```

## Extensions

The ecosystem uses patches rather than a conventional plugin system.

## Advantages

- tiny,
- fast,
- simple source code,
- excellent for understanding how a WM works.

## Disadvantages

- source-level configuration,
- patch management becomes your responsibility,
- X11 only.

# 13. Qtile

Qtile is a tiling WM configured in Python.

## Configuration

```text
~/.config/qtile/config.py
```

## Example

A simplified key binding concept:

```python
Key([mod], "Return", lazy.spawn("foot"))
```

## Advantages

- Python configuration,
- good for users who already know Python,
- flexible layouts and widgets.

## Disadvantages

- configuration errors are Python errors,
- Wayland support and features may differ from X11 depending on version.

# 14. Openbox

Openbox is a classic lightweight floating X11 window manager.

## Character

It gives a traditional desktop experience without a full DE.

## Configuration

Typical directory:

```text
~/.config/openbox/
```

## Advantages

- light,
- mature,
- easy to combine with panels and launchers.

## Disadvantages

- X11 only,
- project/ecosystem is less central today than modern Wayland options.

# 15. Fluxbox

Fluxbox is another lightweight traditional X11 WM.

## Advantages

- low resource use,
- mature,
- simple.

## Disadvantages

- old-school workflow,
- X11 only,
- smaller modern ecosystem.

# 16. IceWM

IceWM provides a traditional desktop-like interface with very low resource use.

## Advantages

- excellent for old hardware,
- familiar taskbar/menu model,
- minimal overhead.

## Disadvantages

- visually traditional,
- less interesting if your goal is learning tiling.

# 17. Labwc

Labwc is a Wayland stacking compositor inspired by Openbox.

## Character

It is useful for people who want:

- Wayland,
- traditional floating windows,
- lightweight behavior,
- an Openbox-like mental model.

# 18. River

River is a minimalist Wayland compositor with a dynamic tiling philosophy.

It is attractive to users who prefer small composable tools and explicit configuration.

# 19. Wayfire

Wayfire is a Wayland compositor built around plugins and visual effects.

It can provide a more Compiz-like experience than minimalist tiling compositors.

# 20. Enlightenment

Enlightenment is a long-running desktop/window-management project with its own libraries, visual style and configuration model.

It sits somewhere between a WM and a broader desktop environment.

# 21. KWin

KWin is KDE Plasma's window manager and Wayland compositor.

It supports:

- floating windows,
- effects,
- window rules,
- scripting,
- virtual desktops,
- tiling features depending on version/plugins.

You normally use it as part of Plasma rather than as a standalone WM.

# 22. Mutter

Mutter is GNOME's window manager and Wayland compositor.

It is tightly integrated with GNOME Shell.

GNOME extensions can modify workflow, but Mutter is not normally treated as a standalone configurable WM like i3.

# 23. Xfwm

Xfwm is XFCE's lightweight floating window manager.

It is mature, fast and integrates tightly with XFCE.

# 24. Important WMs - comparison

| WM | Display system | Style | Configuration |
| --- | --- | --- | --- |
| i3 | X11 | manual tiling | text file |
| Sway | Wayland | manual tiling | i3-like text file |
| Hyprland | Wayland | dynamic/hybrid | text file |
| bspwm | X11 | tiling | shell + bspc |
| AwesomeWM | X11 | dynamic | Lua |
| XMonad | X11 | tiling | Haskell |
| dwm | X11 | dynamic | C source |
| Qtile | X11/Wayland | tiling | Python |
| Openbox | X11 | floating | XML |
| Labwc | Wayland | floating | text/XML-style config |

# 25. Typical desktop with i3

```text
i3
+ i3status / Polybar
+ rofi / dmenu
+ picom
+ dunst
+ terminal
+ nm-applet
```

# 26. Typical desktop with Sway

```text
Sway
+ Waybar
+ wofi / bemenu
+ mako
+ swaylock
+ swaybg
+ grim/slurp
+ wl-clipboard
```

# 27. Typical desktop with Hyprland

```text
Hyprland
+ Waybar
+ rofi-wayland / wofi
+ swaync / mako
+ hyprlock
+ hypridle
+ grim/slurp
+ wl-clipboard
```

# 28. Typical desktop with bspwm

```text
bspwm
+ sxhkd
+ Polybar
+ rofi
+ picom
+ dunst
```

# 29. Launchers

## dmenu

Minimal X11 launcher.

Excellent when you want the smallest possible tool.

## rofi

More feature-rich launcher and window switcher.

Common under X11; Wayland-capable variants also exist.

## wofi

Wayland-oriented launcher inspired by rofi.

## bemenu

Minimal menu usable in Wayland-oriented setups.

# 30. Panels

## Polybar

Popular X11 panel used with i3 and bspwm.

## Waybar

Common Wayland panel for Sway and Hyprland.

## tint2

Lightweight X11 panel for traditional WMs.

# 31. Notifications

Typical notification daemons:

```text
dunst   X11
mako    Wayland
swaync  Wayland notification center
```

# 32. Wallpaper

Common tools:

```text
feh       X11
nitrogen  X11
swaybg    Wayland/Sway
hyprpaper Hyprland ecosystem
```

# 33. Screen locking

Examples:

```text
i3lock
swaylock
hyprlock
```

A screen locker is a security component. Configure it carefully and test suspend/resume behavior.

# 34. Compositor in X11

Under X11, a separate compositor such as picom can add:

- transparency,
- shadows,
- vsync,
- animations depending on fork/config.

Under Wayland the compositor is already part of the core graphical stack.

# 35. Workspace

A workspace is a virtual desktop.

Tiling users often assign categories:

```text
1 terminal
2 browser
3 code
4 communication
```

# 36. Scratchpad

A scratchpad is a hidden area for windows you want to summon temporarily.

Typical use:

- terminal,
- calculator,
- music player.

# 37. Window rules

Rules can automatically:

- move an app to a workspace,
- make it floating,
- change size,
- set opacity,
- assign monitor.

Rules are powerful, but too many rules make configuration fragile.

# 38. Autostart

A standalone WM often needs explicit autostart for:

- panel,
- notifications,
- network applet,
- wallpaper,
- clipboard manager,
- polkit agent,
- authentication agents.

Do not forget a polkit agent on desktops that need graphical privilege prompts.

# 39. Terminal

Popular choices:

- foot,
- Alacritty,
- Kitty,
- WezTerm,
- xterm.

Choose based on features you need, not benchmark trivia.

# 40. File manager

Any file manager can be used with a standalone WM.

Examples:

- Thunar,
- Dolphin,
- Nemo,
- PCManFM.

# 41. Network Manager

NetworkManager can be controlled with:

```bash
nmcli
```

or graphical tools such as `nm-applet`.

# 42. Bluetooth

A common lightweight GUI is:

```text
blueman
```

The underlying Linux Bluetooth stack is BlueZ.

# 43. Audio

Modern Linux desktops commonly use PipeWire.

Useful GUI:

```text
pavucontrol
```

Useful CLI tools depend on PipeWire/PulseAudio compatibility setup.

# 44. Brightness control

A common utility:

```bash
brightnessctl
```

Example:

```bash
brightnessctl set 10%+
brightnessctl set 10%-
```

# 45. Screenshots

Wayland:

```text
grim
slurp
```

X11:

```text
scrot
maim
```

Desktop environments may provide Spectacle or GNOME Screenshot equivalents.

# 46. Clipboard

Wayland:

```bash
wl-copy
wl-paste
```

X11:

```text
xclip
xsel
```

Clipboard managers are separate tools.

# 47. Display managers

Common display managers:

- GDM,
- SDDM,
- LightDM.

They let you select sessions such as GNOME, Plasma, i3 or Sway.

# 48. Starting a WM without a display manager

You can start graphical sessions from a TTY.

Exact methods depend on X11/Wayland and distro configuration.

For X11, `startx` and `.xinitrc` are classic mechanisms.

For Wayland, many compositors can be launched directly from a login shell.

# 49. Tiling WMs on multiple monitors

A good tiling WM makes multi-monitor work very efficient.

Common ideas:

- bind workspaces to outputs,
- move focused workspace between monitors,
- keep workspace numbering stable,
- define startup placement rules.

# 50. Minimalism and RAM usage

A standalone WM can use much less memory than a full desktop environment.

But do not over-focus on idle RAM.

A modern browser can consume more memory than the entire desktop stack.

Choose a WM mainly for workflow.

# 51. What should you choose?

## You want the easiest introduction to tiling

Choose i3.

## You want i3, but Wayland

Choose Sway.

## You want modern visuals and animation

Choose Hyprland.

## You want maximum modularity

Choose bspwm.

## You want to configure the desktop in Python

Choose Qtile.

## You want Lua

Choose AwesomeWM.

## You want advanced functional configuration

Choose XMonad.

## You want extreme minimalism

Choose dwm.

## You want classic floating windows

Choose Openbox on X11 or Labwc on Wayland.

# 52. Good learning set

A useful path:

```text
GNOME/KDE
→ i3
→ Sway
→ Hyprland or programmable WM
```

This teaches concepts in increasing order of customization.

# 53. Proposal for Debian

For a Debian machine where reliability matters:

```text
GNOME or KDE as fallback session
+
i3 or Sway for learning
```

This lets you experiment without losing a known-good desktop.

# 54. Important configuration files

```text
i3       ~/.config/i3/config
Sway     ~/.config/sway/config
Hyprland ~/.config/hypr/hyprland.conf
bspwm    ~/.config/bspwm/bspwmrc
sxhkd    ~/.config/sxhkd/sxhkdrc
Awesome  ~/.config/awesome/rc.lua
Qtile    ~/.config/qtile/config.py
XMonad   ~/.xmonad/xmonad.hs
```

# 55. Useful concepts

## WM

Window manager.

## Compositor

Software that composes final window output, effects and often the display server role under Wayland.

## DE

Desktop environment.

## Tiling

Non-overlapping automatic layout.

## Floating

Free positioning and resizing.

## Workspace

Virtual desktop.

## Launcher

Tool that starts applications.

## Status bar

Displays workspaces, CPU, network, clock and other state.

## Scratchpad

Hidden temporary window area.

## X11

Traditional Unix/Linux display architecture.

## Wayland

Modern display protocol and compositor model.

## XWayland

Compatibility server allowing X11 applications to run inside a Wayland session.

# 56. Cheat sheet

```text
i3        easiest tiling start
Sway      i3-like Wayland
Hyprland  modern animated Wayland
bspwm     modular X11
Qtile     Python
Awesome   Lua
XMonad    Haskell
dwm       C/minimalism
Openbox   classic X11 floating
Labwc     classic Wayland floating
```

# 57. Most important thing to remember

A window manager is only one component of a desktop.

With a full DE, integration is provided for you.

With a standalone WM, **you** decide how the desktop is assembled.

# 58. Practical recommendation for learning

Start with i3 if you want to understand tiling itself.

Move to Sway when you want the same mental model on Wayland.

Try Hyprland only after you understand which pieces of the desktop you actually need.

That way you learn Linux desktop architecture instead of merely copying someone else's dotfiles.

## Official references

- X.Org documentation: https://www.x.org/wiki/Documentation/
- Wayland: https://wayland.freedesktop.org/
- i3 User's Guide: https://i3wm.org/docs/userguide.html
- Sway: https://github.com/swaywm/sway
- Hyprland Wiki: https://wiki.hypr.land/
