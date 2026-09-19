# Midnight Commander — Practical Handbook

## 1. What Midnight Commander is

Midnight Commander (`mc`) is a two-panel terminal file manager inspired by Norton Commander.

It combines:

- filesystem navigation,
- copying, moving, and deleting,
- archive browsing,
- remote connections,
- file viewing,
- text editing,
- an embedded shell command line.

It is especially useful over SSH and on servers.

## 2. Installation

Debian:

```bash
sudo apt install mc
```

FreeBSD:

```sh
sudo pkg install mc
```

Start:

```bash
mc
```

## 3. The interface

Typical layout:

```text
┌──────────── left panel ────────────┐┌────────── right panel ───────────┐
│ /home/user                         ││ /etc                             │
│ files                              ││ files                            │
└────────────────────────────────────┘└──────────────────────────────────┘
 F1 Help F2 Menu F3 View F4 Edit F5 Copy F6 RenMov F7 Mkdir F8 Delete
```

One panel is active. Many operations use the other panel as the destination.

## 4. Navigation

Arrow keys move the selection.

```text
Enter    open/enter
..       parent directory
Tab      switch panel
```

The two-panel model is the core of MC.

## 5. Function keys

```text
F1  Help
F2  User menu
F3  View
F4  Edit
F5  Copy
F6  Move/Rename
F7  Make directory
F8  Delete
F9  Menu
F10 Quit
```

If your terminal intercepts F-keys, use the menu or adjust terminal shortcuts.

## 6. F3 — view

Use F3 when you only want to inspect a file.

Excellent for:

- logs,
- configs,
- source files,
- documentation.

This avoids accidental edits.

## 7. F4 — edit

F4 opens the configured editor.

By default this is often MC's built-in editor, `mcedit`.

## 8. F5 — copy

Typical workflow:

1. put the source directory in one panel,
2. put the destination in the other,
3. select a file,
4. press F5,
5. verify the destination,
6. confirm.

## 9. F6 — move / rename

F6 can:

- move a file to the opposite panel,
- rename a file in the same directory.

Always inspect the destination shown in the dialog.

## 10. F7 — directory

```text
F7
```

creates a directory.

## 11. F8 — delete

Deletes selected items.

Be especially careful:

- as root,
- with multiple selected files,
- on remote systems.

## 12. Selecting multiple files

```text
Insert
```

toggles selection.

Then F5/F6/F8 operates on the selected set.

## 13. Masks

MC can select groups by masks such as:

```text
*.log
*.jpg
backup-*
```

Use the panel/menu selection commands.

## 14. Hidden files

Hidden Unix files begin with a dot:

```text
.git
.env
.ssh
.config
```

Toggle their display from panel settings/menu.

## 15. Sorting

Panels can sort by:

- name,
- extension,
- size,
- modification time.

Use the panel menu.

## 16. Refresh

A common shortcut:

```text
Ctrl+R
```

refreshes panel contents after external changes.

## 17. Directory Hotlist

Keep frequently used locations such as:

```text
/etc/nginx
/var/log
/srv/projects
/home/user/projects
```

in the hotlist.

It is faster and safer than repeatedly typing long paths.

## 18. Tree view

A panel can show a directory tree.

Useful when you know the hierarchy but not the exact path.

## 19. The shell command line

The line at the bottom is a real shell command line.

If the active panel is in:

```text
/etc/nginx
```

then:

```bash
ls -lah
```

runs in that directory.

## 20. Hiding the panels

A famous MC shortcut:

```text
Ctrl+O
```

hides and restores the panels so you can see command output.

That creates a powerful workflow:

```text
navigate visually
→ execute shell command
→ return to panels
```

## 21. Finding files

Use:

```text
Command → Find File
```

and, in common keymaps, the corresponding Alt shortcut.

Search can use:

- filename mask,
- starting directory,
- text inside files.

## 22. mcedit

Launch directly:

```bash
mcedit file.txt
```

It is a conventional terminal editor and is often easier for occasional users than Vim.

## 23. Saving and exiting mcedit

Common keys are displayed at the bottom.

Typically:

```text
F2   save
F10  exit
```

Use F1 for the exact active keymap.

## 24. Search and replace in mcedit

The editor supports:

- search,
- replace,
- syntax highlighting,
- selection,
- undo.

For automated large replacements, use dedicated shell/editor tooling.

## 25. Editing system files

Running:

```bash
sudo mc
```

makes the entire file manager root.

That is convenient but increases the blast radius of every mistake.

Often better:

```bash
sudoedit /etc/file
```

or elevate only individual operations.

## 26. Permissions

MC can display and modify Unix file permissions.

Shell equivalent:

```bash
ls -l
```

Understand:

```text
r read
w write
x execute
```

before changing them.

## 27. Ownership

Shell equivalent:

```bash
sudo chown user:user file.txt
```

MC exposes ownership and permission controls through its menus.

## 28. Symbolic links

A symbolic link references another path.

Shell equivalent:

```bash
ln -s TARGET LINK
```

Do not confuse a symlink with a copied file.

## 29. Archives

MC can browse many archives almost like directories.

Examples:

- tar,
- tar.gz,
- zip.

This is implemented through MC's Virtual File System mechanisms.

## 30. VFS — Virtual File System

VFS lets MC treat non-local structures like directories.

Depending on build/version this can include:

- archives,
- remote shell/SFTP connections,
- other virtual resources.

## 31. Remote access

MC can access remote systems through SSH/SFTP-style VFS mechanisms when supported.

Use the menu and built-in help because path syntax can vary between versions.

Conceptually:

```text
local panel  ←→  remote server panel
```

This is convenient for small manual transfers.

## 32. SSHFS

Another approach is mounting a remote tree:

```bash
sshfs user@server:/ ~/server
```

Then all applications see the mounted path.

For large repeatable synchronization, prefer `rsync`.

## 33. FTP

MC may support FTP through VFS.

For administration, prefer encrypted SSH/SFTP where possible.

## 34. Information panel

One panel can display metadata about the selected item:

- type,
- permissions,
- ownership,
- filesystem information.

Useful for quick inspection.

## 35. Compare directories

MC can help visually compare panel contents.

For exact recursive comparison:

```bash
diff -ruN dir1/ dir2/
```

or use:

```bash
rsync --dry-run
```

for synchronization scenarios.

## 36. Directory sizes

MC can calculate directory sizes.

Shell equivalent:

```bash
du -sh directory
```

On very large trees this can take time.

## 37. Git and MC

Use MC for:

- browsing,
- quick editing,
- inspecting project files.

Use Git itself for version control:

```bash
git status
git diff
git log --oneline
```

## 38. Docker and MC

MC is useful for inspecting:

- Compose files,
- bind-mount directories,
- application files.

Use Docker CLI for runtime state:

```bash
docker ps
docker logs
docker compose ps
```

## 39. systemd and MC

Browse configuration with MC, but manage services with:

```bash
systemctl
journalctl
```

## 40. FreeBSD and MC

Install:

```sh
pkg install mc
```

Combine it with FreeBSD-native tools:

```sh
service
sysrc
sockstat
zpool
zfs
```

## 41. MC configuration

User settings commonly live under:

```text
~/.config/mc/
```

Exact files depend on version/build.

Back up this directory if you customize MC heavily.

## 42. External editor

MC can use another editor such as:

- Vim,
- Neovim,
- nano.

Configure it through MC settings and/or environment variables as appropriate.

## 43. Start in a directory

```bash
mc /etc/nginx
```

Check all invocation options:

```bash
mc --help
```

## 44. MC over SSH

Classic workflow:

```bash
ssh server
mc
```

It uses little bandwidth and is excellent for remote hosts.

## 45. tmux

For longer SSH work:

```bash
tmux
mc
```

If the connection drops, the session can continue.

## 46. Shortcuts worth memorizing

```text
Tab      switch panel
Insert   select
F3       view
F4       edit
F5       copy
F6       move/rename
F7       mkdir
F8       delete
F9       menu
F10      quit
Ctrl+O   hide/show panels
Ctrl+R   refresh
```

## 47. “Meta” key

In MC documentation, Meta generally means Alt.

For example:

```text
M-x
```

usually means:

```text
Alt+x
```

## 48. Root MC

Avoid leaving a root MC session open all day.

A mistaken delete/move operation as root is much more serious than as an ordinary user.

## 49. Configuration backup

Example:

```bash
tar -czf mc-config.tar.gz ~/.config/mc
```

Adjust the path to your installation.

## 50. Very large directories

For huge trees, specialized CLI tools can be better:

```bash
find
du
rsync
fd
rg
ncdu
```

MC is optimized for interactive browsing, not every bulk-data operation.

## 51. MC does not replace rsync

For repeatable synchronization:

```bash
rsync -av --dry-run source/ destination/
```

is safer and more reproducible than manually copying thousands of files.

## 52. MC does not replace the shell

Learn both.

MC is excellent for spatial navigation.

The shell is better for:

- automation,
- filtering,
- repeatability,
- bulk operations,
- scripting.

## 53. Example — nginx configuration

Navigate to:

```text
/etc/nginx
```

Inspect/edit, then validate:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Never restart blindly after editing.

## 54. Example — Go project

MC:

- browse source,
- inspect files,
- edit a small config.

Shell:

```bash
git status
go test ./...
go build ./...
```

Use a documented deployment process for production.

## 55. Example — backup a configuration directory

Left panel:

```text
/etc/nginx
```

Right panel:

```text
/home/user/backup/nginx
```

F5 copies selected files.

For scheduled backups, use a real backup tool.

## 56. Example — remote project copy

For a few files, an MC remote panel is convenient.

For a whole project:

```bash
rsync -avz user@server:/srv/project/ ./project/
```

is usually more reproducible.

## 57. Example — large files

```bash
du -ah . | sort -h | tail
```

or use:

```bash
ncdu
```

## 58. Example — logs

Navigate to:

```text
/var/log
```

Use F3 for static inspection.

For a live log:

```bash
tail -f app.log
```

## 59. Example — Git workflow

Use MC for navigation/editing and the embedded shell for:

```bash
git diff
git status
git add -p
git commit
```

This combination is highly productive.

## 60. Example — FreeBSD service

Navigate to:

```text
/usr/local/etc
```

After editing:

```sh
service nginx configtest
service nginx reload
```

where supported by the rc script.

## 61. When MC is especially good

- SSH sessions,
- configuration directories,
- manual cleanup,
- moving a small number of files,
- quick text edits,
- archive inspection,
- users who think well in a two-panel model.

## 62. When another tool is better

- code refactoring → IDE/Vim/Neovim,
- large synchronization → rsync,
- automation → shell/Python/Go,
- backup → dedicated backup tooling,
- Git history → Git CLI or dedicated client,
- millions of files → specialized CLI tools.

## 63. Minimal mental model

```text
left panel  = one location
right panel = another location
Tab         = choose active side
F5/F6       = transfer between them
Ctrl+O      = use the real shell
```

## Summary

Midnight Commander remains useful because it does not try to replace Unix.

Its strongest combination is:

```text
visual navigation + real shell + quick editor
```

That works extremely well on both Debian and FreeBSD.
