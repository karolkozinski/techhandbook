# Linux Window Managers — Handbook

## 1. What is a window manager?

A window manager controls placement, size, focus and decoration of application windows. It is not the same thing as a full desktop environment.

## 2. Window Manager vs Desktop Environment

A window manager manages windows and workspaces. A desktop environment adds panels, settings, session management, a file manager and integration.

```text
KDE Plasma → KWin
GNOME      → Mutter
XFCE       → Xfwm
```

## 3. X11 and Wayland

X11 uses an X server plus a window manager. Wayland compositors usually combine display-server, compositor and window-management roles.

## 4. Floating vs tiling

Floating managers place windows freely. Tiling managers arrange them automatically without overlap. Many managers support both.

## 5. Manual vs dynamic tiling

Manual tiling lets the user create splits explicitly. Dynamic tiling applies a layout automatically.

## 6. i3

Popular X11 tiling WM.

```bash
sudo apt install i3
```

Configuration:

```text
~/.config/i3/config
```

Strengths: simple, documented and excellent for learning tiling. Limitation: X11-only.

## 7. Sway

Wayland compositor inspired by i3.

```bash
sudo apt install sway
```

Configuration:

```text
~/.config/sway/config
```

Typical stack: Sway + Waybar + wofi/bemenu + mako + swaylock.

## 8. Hyprland

Wayland compositor focused on dynamic tiling, animations and customization. Configuration usually lives under ~/.config/hypr/.

## 9. bspwm

Modular X11 tiling WM. Configuration commonly uses ~/.config/bspwm/bspwmrc, with sxhkd for shortcuts.

## 10. AwesomeWM

Dynamic X11 WM configured in Lua, usually in ~/.config/awesome/rc.lua.

## 11. XMonad

Powerful tiling WM configured in Haskell. Very flexible, but with a steeper configuration curve.

## 12. dwm

Minimal suckless WM. Its defining feature is source-level configuration: edit C and recompile.

## 13. Qtile

Tiling WM configured in Python, typically ~/.config/qtile/config.py.

## 14. Openbox, Fluxbox and IceWM

These are lightweight floating X11 window managers suited to traditional workflows and low-resource systems.

## 15. Labwc, River and Wayfire

Labwc is a Wayland stacking compositor with an Openbox-like philosophy. River is a minimalist dynamic Wayland compositor. Wayfire uses a plugin-driven approach with visual effects.

## 16. KWin, Mutter and Xfwm

KWin powers KDE Plasma, Mutter powers GNOME Shell and Xfwm powers XFCE.

## 17. Practical comparison

```text
i3        X11      tiling      simple
Sway      Wayland  tiling      i3-like
Hyprland  Wayland  dynamic     visual/animated
bspwm     X11      tiling      modular
Awesome   X11      dynamic     Lua
XMonad    X11      tiling      Haskell
dwm       X11      dynamic     configured in C
Qtile     X11/WL   tiling      Python
Openbox   X11      floating    lightweight
Labwc     Wayland  floating    Openbox-like
```

## 18. Launchers, panels and notifications

Launchers: dmenu, rofi, wofi and bemenu.

Panels: Polybar, Waybar and tint2.

Notifications: dunst on X11 and mako on Wayland.

## 19. Wallpaper, locking and compositing

X11 setups often use tools such as feh, i3lock and picom. Wayland setups use compositor-specific tools such as swaybg/swaylock or Hyprland equivalents.

## 20. Workspaces, scratchpads and rules

Workspaces group tasks. Scratchpads provide quickly hidden and recalled windows. Rules can assign apps to workspaces or force floating mode.

## 21. Autostart and desktop components

Standalone window managers normally need explicit startup of panel, notifications, network applet, audio tools and other session components.

## 22. Terminal and file manager

Popular terminals include foot, Alacritty, Kitty and WezTerm. File managers can be Thunar, Dolphin, PCManFM or Nemo.

## 23. Network, Bluetooth and audio

Common tools include nm-applet/nmcli, Blueman, PipeWire utilities and pavucontrol.

## 24. Brightness, screenshots and clipboard

Tools include brightnessctl, grim, slurp, Spectacle, scrot, wl-copy/wl-paste, xclip and xsel.

## 25. Display managers

Common display managers are GDM, SDDM and LightDM. A window manager can also be started manually from a TTY.

## 26. Multiple monitors

Tiling managers can bind workspaces to outputs. Wayland and X11 use different tools and configuration models.

## 27. What should you choose?

Learn tiling simply: i3.

Want i3-style behavior on Wayland: Sway.

Want modern animations: Hyprland.

Want modular X11: bspwm.

Want Python configuration: Qtile.

Want Lua configuration: AwesomeWM.

Want extreme minimalism: dwm.

Want classic floating: Openbox, Labwc or IceWM.

## 28. Key configuration paths

```text
~/.config/i3/config
~/.config/sway/config
~/.config/hypr/
~/.config/bspwm/bspwmrc
~/.config/sxhkd/sxhkdrc
~/.config/awesome/rc.lua
~/.config/qtile/config.py
```

## 29. Key concepts

WM = manages windows. Compositor = produces final screen output. DE = complete desktop environment. Workspace = virtual desktop. Launcher = application launcher. XWayland = X11 compatibility under Wayland.

## 30. Most important thing to remember

A standalone window manager is only one part of a desktop session. If you choose one, you also choose how the rest of the desktop is assembled.
