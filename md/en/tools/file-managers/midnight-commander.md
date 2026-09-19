# Midnight Commander — Knowledge Handbook

## 1. What Midnight Commander is

Midnight Commander (MC) is a two-panel terminal file manager inspired by Norton Commander.

It is especially useful on servers because it combines:

- directory navigation,
- copy/move/delete operations,
- built-in viewer,
- built-in editor,
- shell command line,
- archive browsing,
- remote filesystem support.

## 2. Installation

Debian / Ubuntu:

```bash
sudo apt install mc
```

FreeBSD:

```bash
pkg install mc
```

Run:

```bash
mc
```

## 3. Screen layout

MC normally shows:

- left panel,
- right panel,
- command line,
- function-key menu.

One panel is active.

## 4. Basic navigation

Arrow keys:
move selection.

Enter:
open directory/file action.

Parent directory:

```text
..
```

## 5. Switching panels

```text
Tab
```

## 6. F1–F10

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

## 7. F3 — viewer

Use F3 to read a file without editing it.

Useful for:

- configs,
- logs,
- source files,
- text documents.

## 8. F4 — editor

F4 opens the configured editor, commonly MC's built-in `mcedit`.

## 9. F5 — copy

Copy selected files from the active panel to the directory displayed in the other panel.

## 10. F6 — move/rename

Move files between panels or rename within the current location.

## 11. F7 — create directory

Creates a directory in the active panel.

## 12. F8 — delete

Deletes the selected item(s). Check the selection before confirming.

## 13. Selecting files

```text
Insert
```

toggles selection.

## 14. Mask selection

MC can select groups of files using filename masks.

Useful patterns:

```text
*.log
*.md
*.conf
```

## 15. Quick directory changes

Use the command line:

```bash
cd /var/log
```

MC panels follow directory changes depending on context.

## 16. Directory Hotlist

MC can store frequently used locations for fast access.

Good candidates:

```text
/etc
/usr/local/etc
/var/log
/srv
/home/user/projects
```

## 17. Sorting

Panels can sort by:

- name,
- size,
- modification time,
- extension.

## 18. Hidden files

Enable display of files beginning with `.` when needed.

## 19. Refresh

Refresh the active panel if external commands changed directory contents.

## 20. Shell inside MC

The bottom line is a normal shell command line.

Example:

```bash
git status
```

runs in the active panel's directory.

## 21. Hide panels

MC can temporarily hide panels so you can use the full terminal shell while keeping MC running.

This is one of its strongest features for administration.

## 22. Command history

MC integrates with shell command history and its own command-line interaction.

## 23. Insert filename into command line

MC provides shortcuts to insert selected filenames/paths into the command line.

Exact key behavior can depend on terminal and MC configuration.

## 24. Search files

MC includes a file-search dialog that can search by filename and optionally text content.

## 25. mcedit

mcedit is MC's text editor.

Run separately:

```bash
mcedit file.conf
```

## 26. mcedit basics

Use cursor keys normally.

Common operations include:

- save,
- search,
- replace,
- block selection,
- clipboard-like copy/paste.

The function-key bar shows current shortcuts.

## 27. Editing system files

Prefer:

```bash
sudoedit /etc/file
```

or run an elevated editor only when necessary.

Do not run your entire file-management session as root without a reason.

## 28. Permissions and ownership

MC can inspect and change Unix permissions and ownership.

Shell equivalents:

```bash
chmod 640 file
chown user:group file
```

## 29. Symbolic links

MC can display and create symbolic links.

Shell equivalent:

```bash
ln -s TARGET LINK
```

## 30. Archives

MC can browse many archives like directories through its virtual filesystem layer.

This is convenient for quick inspection.

For automation and large backups, use archive tools directly.

## 31. MC on servers

MC is useful when:

- you need visual directory comparison,
- you are moving config files,
- you want quick built-in viewing/editing,
- you are working through SSH.

## 32. SFTP / SSH

MC can access remote locations through its VFS mechanisms.

For long-term mounts, SSHFS may be more predictable.

For occasional remote browsing, MC's integrated remote access can be convenient.

## 33. FTP

MC also supports FTP-style VFS access, but SFTP/SSH is generally preferable for secure administration.

## 34. Info and tree panels

Panels can show alternative views such as directory tree or information.

## 35. Comparing directories

The two-panel layout makes manual comparison easy.

For exact automated synchronization, use tools such as:

```bash
rsync
diff
git
```

## 36. Directory sizes

MC can calculate directory sizes, but very large trees may take time.

For shell use:

```bash
du -sh *
```

## 37. Git and MC

A useful workflow:

- navigate/edit with MC,
- use Git commands in the command line,
- inspect diffs with Git.

Example:

```bash
git status
git diff
git add FILE
git commit
```

## 38. Docker and MC

MC can help inspect project files around Docker, but container operations should normally use:

```bash
docker
docker compose
```

## 39. systemd and MC

On Debian, edit service/config files with MC if convenient, but manage services with:

```bash
systemctl
journalctl
```

## 40. FreeBSD and MC

On FreeBSD, remember package configuration usually lives under:

```text
/usr/local/etc
```

Service management still uses:

```bash
service
sysrc
```

## 41. Configuration

User configuration is typically under:

```text
~/.config/mc/
```

Older setups may use:

```text
~/.mc/
```

## 42. External editor/viewer

MC can be configured to use another editor such as Vim or Neovim.

## 43. Start in a directory

```bash
mc /var/log
```

Start with two directories:

```bash
mc /etc /usr/local/etc
```

## 44. MC through SSH

```bash
ssh server
mc
```

This gives you a two-panel file manager directly on the remote machine.

## 45. tmux and screen

A strong server workflow:

```text
SSH → tmux → mc
```

If the connection drops, tmux keeps the session alive.

## 46. Function keys and terminal problems

Some terminals intercept F1–F10.

If that happens, check terminal emulator shortcuts, function-key mode on the keyboard and MC alternative key combinations.

## 47. Meta in MC documentation

`Meta` usually means the Alt key in common terminal setups.

## 48. MC and sudo

Avoid launching MC as root for routine work.

Better:

- run MC as your user,
- elevate specific commands,
- use sudoedit for privileged files.

## 49. Comfortable workflow

```text
left panel  → source
right panel → destination
bottom line → shell commands
F3          → inspect
F4          → edit
F5/F6       → copy/move
```

## 50. Backup MC configuration

Back up:

```text
~/.config/mc/
```

if you heavily customize the application.

## 51. Large directories

For directories with huge file counts, command-line tools may be faster and more scriptable.

## 52. MC does not replace rsync

MC is excellent for interactive copying.

rsync is better for:

- synchronization,
- repeated backups,
- resume/incremental transfer,
- scripting.

## 53. MC does not replace the shell

Treat MC as a file-management interface around the shell, not as a reason to stop learning shell commands.

## 54. Example — edit nginx

```text
open /etc/nginx
F4 nginx.conf
save
```

Then:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 55. Example — Go deployment

Use MC to inspect files, then shell commands for controlled deployment:

```bash
git pull
go build
sudo systemctl restart myapp
```

## 56. Example — configuration backup

Copy a config to a backup location with F5 or use:

```bash
cp file.conf file.conf.bak
```

## 57. Example — copy from VPS

Use SFTP/SSH VFS or simply:

```bash
scp user@server:/path/file .
```

## 58. Example — find large files

MC can sort by size.

For full-system analysis:

```bash
du -xhd1 /var | sort -h
```

## 59. Example — logs

Open `/var/log` in one panel, inspect logs with F3, and use:

```bash
tail -f LOGFILE
```

when you need live output.

## 60. Minimum to remember

```text
Tab  switch panel
F3   view
F4   edit
F5   copy
F6   move
F7   mkdir
F8   delete
F10  quit
Insert select
```

## 61. When MC is especially good

- SSH administration,
- visual file operations,
- quick config edits,
- browsing archives,
- comparing directory trees.

## 62. When another tool is better

Use:

- rsync for synchronization,
- find/rg for large searches,
- Git for versioned changes,
- dedicated IDE/editor for large coding work,
- scripts for repeatable operations.

# Summary

Midnight Commander is a powerful bridge between graphical file-manager habits and Unix shell administration.

Its greatest strength is not replacing the shell, but combining a visual two-panel workflow with the shell.
