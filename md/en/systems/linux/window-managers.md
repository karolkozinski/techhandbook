# Linux Window Managers — Handbook

## 1. What a window manager is

A window manager controls application windows:

- position,
- size,
- focus,
- borders,
- workspaces,
- keyboard shortcuts.

It is not necessarily a complete desktop environment.

## 2. Window Manager vs Desktop Environment

### Window Manager

Examples:

- i3,
- Sway,
- bspwm,
- Hyprland,
- Openbox.

Usually provides window placement and little else.

### Desktop Environment

Examples:

- GNOME,
- KDE Plasma,
- XFCE.

Includes:

- window manager/compositor,
- settings,
- panels,
- notifications,
- file manager,
- power management,
- integration services.

## 3. X11 and Wayland

### X11

Older display-system architecture with decades of compatibility.

X11 window managers include:

- i3,
- bspwm,
- Openbox,
- AwesomeWM,
- XMonad,
- dwm.

### Wayland

Modern display protocol/architecture.

Under Wayland, the compositor performs the window-manager role.

Examples:

- Sway,
- Hyprland,
- River,
- Wayfire,
- KWin,
- Mutter.

XWayland lets many X11 applications run inside Wayland sessions.

## 4. Floating vs tiling

### Floating

Windows overlap and are freely resized.

Examples:

- Openbox,
- traditional desktop environments.

### Tiling

Windows are automatically arranged without overlap.

Examples:

- i3,
- Sway,
- bspwm,
- XMonad,
- dwm.

## 5. Manual vs dynamic tiling

Manual tiling:

- the user chooses split direction/layout.

Dynamic tiling:

- the WM automatically applies a layout policy.

Different users prefer different mental models.

## 6. i3

Classic X11 tiling window manager.

Characteristics:

- simple text config,
- excellent documentation,
- predictable behavior,
- easy introduction to tiling.

Config:

```text
~/.config/i3/config
```

Typical shortcuts:

```text
Mod+Enter terminal
Mod+d     launcher
Mod+Shift+q close
Mod+1..9 workspaces
```

Good first tiling WM.

## 7. Sway

Wayland compositor designed to be largely compatible with i3 configuration concepts.

Install on Debian:

```bash
sudo apt install sway
```

Config:

```text
~/.config/sway/config
```

Typical companion tools:

- Waybar,
- wofi/bemenu,
- swaylock,
- swayidle,
- grim/slurp,
- wl-clipboard.

If you like i3 but want Wayland, Sway is the obvious candidate.

## 8. Hyprland

Dynamic Wayland compositor with emphasis on:

- animations,
- modern visuals,
- flexible configuration,
- active ecosystem.

Config commonly lives under:

```text
~/.config/hypr/
```

Good for users who want tiling plus a visually polished modern desktop.

## 9. bspwm

X11 tiling WM controlled through messages.

A common pairing:

```text
bspwm + sxhkd
```

Window management and keyboard bindings are deliberately separated.

Very modular.

## 10. AwesomeWM

X11 dynamic WM configured in Lua.

Strong choice if you enjoy programming the desktop rather than only editing simple key/value configuration.

## 11. XMonad

Tiling WM written and configured in Haskell.

Extremely flexible, with a steeper learning curve.

## 12. dwm

Minimal dynamic WM from suckless.

Configuration is traditionally done by editing C source and recompiling.

Advantages:

- tiny,
- understandable codebase,
- minimal runtime complexity.

Trade-off:

- customization often means patches and rebuilds.

## 13. Qtile

Tiling WM configured in Python.

Good choice for people who already know Python and want a programmable configuration.

## 14. Openbox

Classic lightweight floating X11 window manager.

Good for:

- minimal desktops,
- old hardware,
- traditional window behavior.

## 15. Fluxbox

Lightweight X11 floating/stacking WM with a traditional style and simple configuration.

## 16. IceWM

Very lightweight traditional window manager with familiar taskbar/menu behavior.

Useful on constrained systems.

## 17. Labwc

Wayland stacking compositor inspired by Openbox-style behavior.

A good option if you want classic floating windows on Wayland.

## 18. River

Minimal dynamic Wayland compositor with a keyboard-oriented workflow and external tools.

## 19. Wayfire

Wayland compositor inspired by compositing effects and plugin-based behavior.

## 20. Enlightenment

A long-running desktop/window-management project with a distinctive integrated environment and its own libraries.

## 21. KWin

KDE Plasma's window manager and Wayland compositor.

It can also be used in advanced/custom setups, but is primarily designed as part of Plasma.

## 22. Mutter

GNOME's window manager/compositor.

Tightly integrated with GNOME Shell.

## 23. Xfwm

XFCE's lightweight window manager.

Traditional floating behavior and low overhead.

## 24. Comparison

| WM/compositor | Protocol | Style | Config |
|---|---|---|---|
| i3 | X11 | manual tiling | text |
| Sway | Wayland | i3-style tiling | text |
| Hyprland | Wayland | dynamic tiling | text |
| bspwm | X11 | tiling | shell/messages |
| Awesome | X11 | dynamic | Lua |
| XMonad | X11 | dynamic | Haskell |
| dwm | X11 | dynamic | C source |
| Qtile | X11/Wayland support varies | tiling | Python |
| Openbox | X11 | floating | XML |
| Labwc | Wayland | floating | XML-style ecosystem |

Check current project documentation for exact backend support.

## 25. Typical i3 desktop

```text
i3
+ i3bar/polybar
+ rofi
+ dunst
+ picom
+ terminal
+ NetworkManager
```

## 26. Typical Sway desktop

```text
Sway
+ Waybar
+ wofi/bemenu
+ mako
+ swaylock
+ swayidle
+ grim/slurp
+ wl-clipboard
```

## 27. Typical Hyprland desktop

```text
Hyprland
+ Waybar
+ launcher
+ notification daemon
+ hyprlock
+ clipboard tools
```

## 28. Launchers

### dmenu

Minimal X11 launcher.

### rofi

Powerful X11 launcher/window switcher.

### wofi

Wayland launcher inspired by rofi concepts.

### bemenu

Minimal menu tool with Wayland/X11 support depending on build.

## 29. Panels

### Polybar

Popular X11 status bar.

### Waybar

Popular Wayland bar for Sway/Hyprland and other compositors.

### tint2

Lightweight X11 panel.

## 30. Notifications

Examples:

- dunst on X11,
- mako on Wayland.

A bare WM does not automatically provide a notification daemon.

## 31. Wallpaper

Examples:

- feh/nitrogen on X11,
- swaybg on Sway,
- compositor-specific tools on Wayland.

## 32. Screen locking

Examples:

- i3lock,
- swaylock,
- hyprlock.

A WM without a lock screen is not a complete workstation setup.

## 33. X11 compositor

On X11, tools such as picom can provide:

- transparency,
- shadows,
- vsync,
- animations/effects depending on fork/configuration.

Wayland compositors integrate compositing themselves.

## 34. Workspaces

Workspaces are virtual groups of windows.

A tiling workflow often relies heavily on:

```text
1 browser
2 editor
3 terminal
4 communication
```

## 35. Scratchpad

A hidden window that can be shown on demand.

Useful for:

- terminal,
- music player,
- calculator,
- notes.

## 36. Window rules

Rules can send applications to:

- a workspace,
- floating mode,
- a specific size,
- a monitor.

The syntax differs by WM.

## 37. Autostart

A minimal WM does not launch every desktop service automatically.

You may need to start:

- notification daemon,
- panel,
- polkit agent,
- network tray,
- clipboard manager,
- wallpaper,
- idle/lock service.

## 38. Terminal and file manager

Any terminal/file manager can be used.

Examples:

- foot,
- kitty,
- Alacritty,
- Konsole,
- Thunar,
- Dolphin,
- PCManFM,
- Midnight Commander.

## 39. Network and Bluetooth

With a minimal WM, graphical applets are optional.

Core tools still work:

```bash
nmcli
nmtui
bluetoothctl
```

## 40. Audio

Modern Linux desktops usually use PipeWire.

CLI tools and desktop mixers can work independently of the WM.

## 41. Brightness

Laptop setups often use:

```bash
brightnessctl
```

Bind it to multimedia keys.

## 42. Screenshots

X11 tools:

- scrot,
- maim.

Wayland tools:

- grim,
- slurp.

## 43. Clipboard

Wayland commonly uses:

```bash
wl-copy
wl-paste
```

X11 commonly uses:

- xclip,
- xsel.

## 44. Display managers

Examples:

- GDM,
- SDDM,
- LightDM.

A WM can also be started without a display manager through an appropriate login/startup setup.

## 45. Multiple monitors

Tiling WMs are often excellent on multi-monitor setups because workspaces can be assigned to outputs.

Use:

- `xrandr` on X11,
- compositor-specific output configuration on Wayland.

## 46. Minimalism and RAM

A minimal WM can use fewer resources than a full desktop environment, but the difference matters less on modern hardware than workflow and integration quality.

Do not optimize only for an idle-RAM screenshot.

## 47. What to choose

### Easiest introduction to tiling

i3.

### i3 ideas on Wayland

Sway.

### Modern visual Wayland desktop

Hyprland.

### Maximum modularity

bspwm.

### Configure in Python

Qtile.

### Configure in Lua

AwesomeWM.

### Extremely minimal

dwm.

### Classic floating workflow

Openbox or Labwc.

## 48. Good learning path

```text
i3
 ↓
understand workspaces, splits, focus, rules
 ↓
Sway or another Wayland compositor
 ↓
customize only what you actually need
```

## 49. Important config locations

Common examples:

```text
~/.config/i3/config
~/.config/sway/config
~/.config/hypr/
~/.config/bspwm/
~/.config/qtile/
~/.config/waybar/
```

## 50. Glossary

- **WM** — Window Manager.
- **Compositor** — combines window surfaces into the final image.
- **DE** — Desktop Environment.
- **Tiling** — automatic non-overlapping layout.
- **Floating** — freely positioned overlapping windows.
- **Workspace** — virtual desktop/group.
- **Launcher** — application launcher.
- **Status bar** — system/workspace information.
- **Scratchpad** — hidden on-demand window.
- **XWayland** — compatibility layer for X11 apps under Wayland.

## 51. Key idea

A window manager is not a religion and not a performance benchmark.

Choose the workflow that makes it easier to:

```text
launch applications
switch context
arrange windows
work without friction
```

For most people, i3 or Sway is the best place to understand the tiling model before experimenting with more specialized compositors.
