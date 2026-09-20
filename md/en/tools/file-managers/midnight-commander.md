---
id: "doc-040"
title: "Midnight Commander — Knowledge Handbook"
slug: "midnight-commander-knowledge-handbook"
description: "Midnight Commander (MC) is a two-panel terminal file manager inspired by Norton Commander. It combines file operations, a shell command line, viewer, editor…"
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "mc"
  - "midnight commander"
  - "file manager"
---

# Midnight Commander — Knowledge Handbook

Midnight Commander is a convenient visual layer over ordinary file operations and the shell. It works especially well on servers over SSH when you want to compare directories, copy files, inspect logs or drop into a normal command without leaving the program.

Related topics: [Debian Practical Shell Handbook](techhandbook:doc-027), [FreeBSD Practical Shell Handbook](techhandbook:doc-029), [vi / Vim / gVim / Neovim](techhandbook:doc-038) and [SSH and Remote Administration](techhandbook:doc-018).

## 1. What Midnight Commander is
Midnight Commander (MC) is a two-panel terminal file manager inspired by Norton Commander. It combines file operations, a shell command line, viewer, editor and virtual filesystem features.
# 2. Installation
## Debian / Ubuntu
```bash
sudo apt update
sudo apt install mc
```
## FreeBSD
```sh
pkg install mc
```
# 3. What the MC screen looks like
The default screen contains two file panels, a menu bar, a command line and function-key hints.
# 4. Basic navigation
## Arrow keys
Move selection up/down and navigate menus.
## Enter
Open directories, launch files according to associations or confirm selections.
## Return to parent directory
Select `..` and press Enter, or use the appropriate navigation shortcut.
# 5. Switching panels
Use Tab to move focus between the left and right panels.
# 6. Function keys F1–F10
The bottom bar shows the default actions mapped to function keys.
# 7. F1 — help
Opens context-sensitive help and key documentation.
# 8. F2 — user menu
Opens a configurable menu of custom shell commands/actions.
# 9. F3 — file viewer
View a file without editing it. Useful for configs, logs and quick inspection.
# 10. F4 — edit file
Opens the selected file in mcedit or the configured external editor.
# 11. F5 — copy
Copies selected files/directories to the opposite panel by default.
# 12. F6 — move / rename
Moves selected files or renames them when source/target are in the same directory context.
# 13. F7 — create directory
Creates a new directory in the active panel.
# 14. F8 — delete
Deletes selected files/directories after confirmation. Review the selection carefully.
# 15. F9 — main menu
Activates the top menu where panel, file, command and options features are available.
# 16. F10 — quit
Exits Midnight Commander.
# 17. Selecting files
## Insert
Insert toggles selection/marking of the current file and usually moves to the next item.
# 18. Selecting by mask
Use group selection to mark files matching a shell-style pattern such as `*.log`.
## Unselecting
Use the group-unselect command or toggle marks individually.
# 19. Quick directory change
Use the Quick cd command to jump to a path without manually traversing every directory.
# 20. Directory Hotlist
Store frequently used directories for fast access.
# 21. Quick directory preview
Panel modes can show tree/info views to help orient yourself in unfamiliar filesystems.
# 22. Sorting
Sort by name, extension, size, modification time or other supported fields.
# 23. Showing hidden files
Toggle dotfiles when working with configuration directories such as `.ssh`, `.config` or `.git`.
# 24. Refreshing a panel
Refresh when external shell commands or other programs changed the directory contents.
# 25. Shell inside MC
The command line at the bottom runs normal shell commands in the active panel's directory.
# 26. Hiding panels and using the full shell
Use the panel toggle shortcut to temporarily hide panels and work with a full terminal view.
# 27. Command history
Recall previously executed shell commands from MC's command line.
# 28. Insert filename into command line
## Ctrl+Enter
Insert the selected filename/path according to MC's shortcut behavior.
## Ctrl+Shift+Enter
Depending on terminal/MC version, inserts a more complete path variant. If the terminal intercepts the key, remap or use menus.
# 29. Searching for files
Use MC's Find File feature for recursive filename/content searches.
# 30. mcedit — built-in editor
mcedit is a capable terminal editor integrated with MC, useful for configs and quick remote edits.
# 31. mcedit basics
Navigate with arrows/PageUp/PageDown, type normally, and use function-key/menu commands for block operations and options.
# 32. Saving a file in mcedit
Use the Save command, typically F2 in mcedit. Confirm filename/permissions when editing system files.
# 33. Searching text in mcedit
Use Search to find text or regex-like patterns depending on configuration.
# 34. Replacing text
Use Replace carefully, especially in configuration/code files; review each replacement when risk is high.
# 35. Selecting text
Use block-marking commands to select text for copy, move or delete operations.
# 36. Editing system files
Launch the editor with appropriate privileges only for the specific file, e.g. `sudoedit` or root MC when absolutely necessary.
# 37. File permissions
MC can display and change Unix mode bits. Understand read/write/execute semantics before changing them.
# 38. File owner
Ownership operations correspond to `chown`/`chgrp`; use them deliberately.
# 39. Symbolic links
MC can create and inspect symlinks. Remember a symlink points to another path rather than containing data itself.
# 40. Archives
MC can browse many archives through its virtual filesystem layer and copy files in/out as if they were directories.
# 41. MC as a server file manager
MC is especially useful over SSH when you need a visual two-panel workflow without a GUI.
# 42. SFTP / SSH connections
MC's virtual filesystem can open remote locations over SSH/SFTP, depending on build/features.
# 43. SSHFS versus MC VFS
SSHFS mounts remote files into the normal filesystem; MC VFS keeps remote browsing inside MC. Use SSHFS when multiple tools need the mount.
# 44. FTP
MC can access FTP via VFS, but prefer SFTP/SSH for secure administration.
# 45. Information panel
Info panel can show metadata about the selected file/filesystem.
# 46. Tree View
Tree view helps navigate deep directory hierarchies quickly.
# 47. Comparing directories
Use panel comparison to mark differences between two directories. Verify criteria before synchronizing or deleting.
# 48. Calculating directory sizes
Use directory-size calculation to identify large directories without leaving MC.
# 49. Shell commands and active directory
Commands entered in MC run with the active panel's directory as the current working directory.
# 50. Git and MC
Use MC for file navigation and terminal Git for repository operations. Hidden `.git` remains a normal directory but should not be edited casually.
# 51. Docker and MC
MC is useful for browsing project/volume backup directories on Docker hosts, but container internals should normally be inspected with Docker commands.
# 52. systemd and MC
Use MC/mcedit to inspect unit files and configs, then use `systemctl` and `journalctl` for service control and logs.
# 53. FreeBSD and MC
MC works well on FreeBSD; remember package configs live mostly under `/usr/local/etc` and services use rc.d/sysrc.
# 54. MC configuration
Configure panel layout, confirmation behavior, editor/viewer, colors and other preferences through Options menus.
# 55. Configuration files
User configuration lives under MC's config directories, typically under `~/.config/mc/` on modern systems.
# 56. External editor
You can configure MC to use Vim/Neovim or another editor instead of mcedit.
# 57. External viewer
Similarly, file viewing can be delegated to another tool if preferred.
# 58. Starting MC in a specific directory
```bash
mc /etc
```
# 59. MC with two directories
```bash
mc /etc /usr/local/etc
```
The directories become the initial left/right panel locations.
# 60. MC over SSH
```bash
ssh user@server
mc
```
A simple and robust way to administer remote servers.
# 61. tmux and screen sessions
Run MC inside tmux/screen so your file-management session survives an SSH disconnect.
# 62. Useful shortcuts — cheat sheet
```text
Tab switch panels
F3 view
F4 edit
F5 copy
F6 move/rename
F7 mkdir
F8 delete
F9 menu
F10 quit
Insert mark
Ctrl+O hide/show panels
```
# 63. Terminal and F1–F10 problems
Laptop/terminal function keys may be intercepted by the desktop or terminal emulator. Use Fn, remap keys or choose menu commands.
# 64. “Meta” in MC documentation
Meta usually means Alt. If Alt combinations do not work, Esc followed by the key often acts as a Meta sequence.
# 65. MC and sudo
Avoid running an entire privileged MC session for routine work. Prefer normal-user MC and elevate only the exact edit/copy operation when practical.
# 66. Comfortable workflow
Left panel = source/project, right panel = destination/config/backup. Use shell commands at the bottom and viewer/editor only when needed.
# 67. Backing up MC configuration
```bash
tar -czf mc-config.tar.gz ~/.config/mc
```
# 68. Working with very large directories
Disable expensive size calculations/sorting and use shell tools like `find`, `du`, `rg` or `fd` when MC becomes slow.
# 69. MC does not replace rsync
For repeatable synchronization/backups, use rsync or dedicated backup tools. MC is interactive.
# 70. MC does not replace the shell
Use MC for navigation and file operations; use shell commands for automation, filtering, bulk processing and reproducibility.
# 71. Example 1 — editing nginx
Navigate to `/etc/nginx` on Debian or `/usr/local/etc/nginx` on FreeBSD, inspect config with F3, edit carefully, then test with `nginx -t`.
# 72. Example 2 — deploying a Go application
One panel can show the release/build directory and the other `/srv/app`; copy the binary/config, then restart the service from MC's shell line.
# 73. Example 3 — configuration backup
Mark config files/directories and copy them to a dated backup location before changes.
# 74. Example 4 — copying files from a VPS
Use SFTP VFS or a normal SSH session plus `scp`/`rsync`; for repeated transfers, rsync is usually better.
# 75. Example 5 — finding large files
Use MC size calculation for quick inspection, or drop to shell with `du -xhd1 | sort -h` for large trees.
# 76. Example 6 — searching configuration
Use Find File to search names/content under `/etc` or `/usr/local/etc`, or run `grep -Rni` from the command line.
# 77. Example 7 — working with logs
Open `/var/log`, sort by time, use F3 to inspect, and switch to `tail -f` in shell for live logs.
# 78. Example 8 — Git + MC
Browse/edit files in MC, then use `git status`, `git diff`, `git add` and `git commit` in the command line.
# 79. Example 9 — quick production vs development comparison
Open corresponding directories in both panels and use Compare Directories, then manually verify meaningful differences.
# 80. Example 10 — FreeBSD
Left `/usr/local/etc`, right `/var/log`; use shell line for `service`, `sysrc`, `sockstat` and `pkg` commands.
# 81. Example workflow
Use MC as the visual layer on servers: two panels for files, shell at the bottom, Vim/Neovim or mcedit for edits, tmux for persistence, Git/rsync for repeatable operations.
# 82. Minimum worth remembering
Tab, F3, F4, F5, F6, F7, F8, Ctrl+O, Insert, Quick cd, Find File and the command line.
# 83. Cheat sheet — Debian
```bash
sudo apt install mc
mc
systemctl status SERVICE
journalctl -u SERVICE
sudoedit /etc/...
```
# 84. Cheat sheet — FreeBSD
```sh
pkg install mc
mc
service SERVICE status
sysrc SERVICE_enable
sockstat -4 -6 -l
```
# 85. When MC is especially good
Remote SSH sessions, unfamiliar directory trees, interactive copies/moves, config inspection and users who think spatially with two panels.
# 86. When other tools are better
Use rsync for synchronization, find/grep/ripgrep for large searches, Git for versioning, scripts for automation and dedicated backup tools for backups.
# Summary
Midnight Commander is most valuable as a fast two-panel terminal workspace that complements, rather than replaces, the Unix shell.

## Official references

- Midnight Commander: https://midnight-commander.org/
- MC manual: https://midnight-commander.org/wiki/doc/common/index
