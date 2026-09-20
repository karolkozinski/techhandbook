---
id: "doc-028"
title: "Shells in Debian"
slug: "shells-in-debian"
description: "A shell is a command interpreter. It reads commands, expands variables and globs, handles pipelines/redirections and starts programs."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "debian"
  - "shell"
  - "bash"
  - "zsh"
---

# Shells in Debian

## 1. What is a shell?

A shell is a command interpreter. It reads commands, expands variables and globs, handles pipelines/redirections and starts programs.

## 2. Important concepts

### Login shell

The shell configured for a user account.

```bash
getent passwd "$USER"
```

### Current shell

```bash
ps -p $$ -o comm=
```

`$SHELL` usually points to the login shell, not necessarily the currently running one.

### /bin/sh

On Debian, `/bin/sh` normally points to Dash. It is intended for POSIX-style shell scripts.

### Script interpreter

Defined by the shebang:

```sh
#!/bin/sh
```

or:

```bash
#!/usr/bin/env bash
```

## 3. How Debian uses shells

Interactive user sessions commonly use Bash. System scripts may use `/bin/sh` for POSIX portability and speed.

Do not assume every `sh` script supports Bash syntax.

## 4. Important shells

Common shells:

- Bash,
- Dash,
- Zsh,
- Fish,
- ksh/mksh,
- tcsh.

## 5. Bash

Bash is Debian's common interactive shell.

```bash
bash --version
```

Useful features include history, completion, arrays, `[[ ... ]]`, functions, job control and process substitution.

## 6. Bash configuration

Common files:

```text
~/.bashrc
~/.profile
~/.bash_profile
/etc/bash.bashrc
```

Interactive non-login Bash usually reads `~/.bashrc`.

## 7. Dash

Dash is a small POSIX-oriented shell. On Debian it commonly implements `/bin/sh`.

Do not use Bash-only syntax under:

```sh
#!/bin/sh
```

## 8. sh in Debian

```bash
readlink -f /bin/sh
```

Typical result:

```text
/usr/bin/dash
```

## 9. Zsh

```bash
sudo apt install zsh
zsh
```

Configuration:

```text
~/.zshrc
```

## 10. Fish

```bash
sudo apt install fish
fish
```

Configuration:

```text
~/.config/fish/config.fish
```

Fish intentionally differs from POSIX shell syntax.

## 11. ksh and mksh

```bash
sudo apt install ksh
sudo apt install mksh
```

## 12. tcsh

```bash
sudo apt install tcsh
```

Mostly encountered in legacy or specialized environments.

## 13. Available login shells

```bash
cat /etc/shells
```

## 14. Checking shell information

```bash
echo "$SHELL"
ps -p $$ -o comm=
getent passwd "$USER"
```

## 15. Running another shell

```bash
bash
zsh
fish
```

Exit with:

```bash
exit
```

## 16. exec

Replace the current shell process:

```bash
exec zsh
```

## 17. Changing login shell

```bash
chsh -s /usr/bin/zsh
```

Use a path listed in `/etc/shells`.

## 18. Shebang

Portable:

```sh
#!/bin/sh
```

Bash-specific:

```bash
#!/usr/bin/env bash
```

## 19. Do not change /bin/sh casually

Debian system scripts may depend on the system POSIX shell. Install another user shell instead of replacing `/bin/sh`.

## 20. Redirections and pipelines

```bash
command > file
command >> file
command 2> errors
command1 | command2
```

## 21. Variables

```bash
name="Alice"
echo "$name"
```

No spaces around `=`.

## 22. Quoting

```bash
echo '$HOME'
echo "$HOME"
```

Single quotes prevent expansion; double quotes allow variable expansion.

## 23. Globbing

```text
*.txt
file?.log
[abc]*
```

## 24. Builtins and programs

```bash
type cd
type ls
command -V printf
```

## 25. Aliases

```bash
alias ll='ls -lah'
```

Use aliases for interactive convenience, not script dependencies.

## 26. Functions

```bash
mkcd() {
    mkdir -p "$1" && cd "$1"
}
```

## 27. History

```bash
history
```

Reverse search:

```text
Ctrl+R
```

## 28. Job control

```bash
command &
jobs
fg
bg
```

## 29. Login and interactive shells

These are separate concepts. Startup files differ depending on whether a shell is login, interactive or non-interactive.

## 30. PATH

```bash
echo "$PATH"
```

Common user-script location:

```text
~/.local/bin
```

## 31. Practical choice

Interactive use: Bash or Zsh.

Portable scripts: `/bin/sh`.

Bash-specific scripts: `#!/usr/bin/env bash`.

Fish is excellent interactively but intentionally not POSIX-compatible.

## 32. Quick reference

```bash
echo "$SHELL"
ps -p $$ -o comm=
cat /etc/shells
readlink -f /bin/sh
chsh -s /usr/bin/zsh
exec bash
```

## 33. Most important rule

The interactive shell and a script's interpreter do not have to be the same. Always read the shebang.
