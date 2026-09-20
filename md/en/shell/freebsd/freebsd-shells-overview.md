---
id: "doc-030"
title: "Shells in FreeBSD"
slug: "shells-in-freebsd"
description: "A shell is a command interpreter used to run programs, expand variables and globs, build pipelines and write scripts."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "freebsd"
  - "shell"
  - "sh"
  - "tcsh"
---

# Shells in FreeBSD

FreeBSD clearly separates the base system from package-installed software, so shell paths matter more than on many Linux distributions. This article organizes the shells included in the base system and those installed through pkg.

For practical administration see [FreeBSD Practical Shell Handbook](techhandbook:doc-029), and for automation see [Shell Scripting](techhandbook:doc-031).

## 1. What is a shell?

A shell is a command interpreter used to run programs, expand variables and globs, build pipelines and write scripts.

## 2. Base system vs additional software

FreeBSD clearly separates the base system from third-party packages. Base-system tools live under paths such as `/bin` and `/usr/bin`, while package-installed shells usually live under `/usr/local/bin`.

## 3. Default FreeBSD shell

Do not assume. Check the actual account configuration:

```sh
getent passwd "$USER"
```

Historically, FreeBSD has commonly used csh/tcsh-family shells for interactive accounts, while `/bin/sh` remains the base POSIX-style shell for scripts and system use.

## 4. Most important shells

Common choices include:

- sh,
- Bash,
- Zsh,
- Fish,
- csh,
- tcsh,
- KornShell-family shells such as ksh93 or mksh.

## 5. `sh` in FreeBSD

The system `/bin/sh` is part of the base system.

```sh
#!/bin/sh
```

It is the best default for portable system scripts.

## 6. Configuring `sh`

Typical login configuration:

```text
~/.profile
```

Keep POSIX shell startup files simple and portable.

## 7. Bash in FreeBSD

Install:

```sh
pkg install bash
```

Typical path:

```text
/usr/local/bin/bash
```

## 8. Configuring Bash

Common files:

```text
~/.bashrc
~/.bash_profile
~/.profile
```

Interactive Bash normally reads `.bashrc`; login behavior depends on how Bash is started.

## 9. Zsh

Install:

```sh
pkg install zsh
```

Typical path:

```text
/usr/local/bin/zsh
```

Configuration:

```text
~/.zshrc
```

## 10. Fish

Install:

```sh
pkg install fish
```

Configuration:

```text
~/.config/fish/config.fish
```

Fish is intentionally not POSIX-shell compatible.

## 11. csh

csh uses a different syntax family from sh/Bash. You will encounter it in historical Unix and FreeBSD contexts.

Typical configuration files include:

```text
~/.cshrc
~/.login
```

## 12. tcsh

tcsh is an enhanced csh-compatible shell with better interactive features such as command-line editing and completion.

Configuration commonly uses:

```text
~/.tcshrc
~/.cshrc
```

## 13. KornShell and mksh

FreeBSD packages provide KornShell-family options such as ksh93 or mksh depending on release and repository.

Use them when you specifically want KornShell syntax or compatibility.

## 14. List available login shells

```sh
cat /etc/shells
```

Only shells listed there should normally be selected as login shells.

## 15. Checking the shell

```sh
echo "$SHELL"
ps -p $$ -o comm=
getent passwd "$USER"
```

These answer different questions: configured login shell versus the process currently running.

## 16. Starting another shell

```sh
sh
bash
zsh
fish
tcsh
```

This starts a child shell without changing the account's login shell.

## 17. `exec`

```sh
exec zsh
```

`exec` replaces the current shell process instead of creating a child.

## 18. Changing the login shell

```sh
chsh -s /usr/local/bin/zsh
```

Use a path present in `/etc/shells`.

## 19. Root — important practice

Keep root on a shell from the FreeBSD base system unless you have a strong operational reason not to. During recovery, `/usr/local` may not be available.

## 20. `sudo -i`

If sudo is installed:

```sh
sudo -i
```

Traditional alternative:

```sh
su -
```

Both create a privileged login-style environment; understand which shell and startup files will be used.

## 21. Shebang

Portable POSIX script:

```sh
#!/bin/sh
```

Bash-specific script:

```sh
#!/usr/bin/env bash
```

## 22. Why `env bash` is useful

On FreeBSD, package-installed Bash commonly lives in `/usr/local/bin/bash`, while on Linux it is often under `/bin` or `/usr/bin`.

```sh
#!/usr/bin/env bash
```

finds Bash through `PATH`.

## 23. Do not replace the system `sh`

Install additional shells for users, but do not replace `/bin/sh`. Base-system scripts expect FreeBSD's system shell behavior.

## 24. Redirections

```sh
command > file
command >> file
command 2> errors
command > all.log 2>&1
```

## 25. Pipes

```sh
command1 | command2
```

The stdout of the first command becomes stdin of the second.

## 26. Variables

sh/Bash-style:

```sh
name="Alice"
echo "$name"
```

csh/tcsh syntax differs.

## 27. Quoting

Use double quotes around variable expansions unless you deliberately need word splitting or glob expansion.

```sh
printf '%s\n' "$file"
```

Single quotes preserve literal text.

## 28. Globbing

```text
*.txt
file?.conf
[abc]*
```

Globbing is filename expansion performed by the shell before the command runs.

## 29. Builtins

Some commands are implemented inside the shell itself.

```sh
type cd
command -V printf
```

## 30. Aliases

```sh
alias ll='ls -lah'
```

Use aliases for interactive convenience, not as the basis of important automation.

## 31. Functions

sh-style:

```sh
mkcd() {
    mkdir -p "$1" && cd "$1"
}
```

Functions are better than aliases for multi-step reusable shell logic.

## 32. History

Bash, Zsh, tcsh and other interactive shells provide history.

Exact files and options depend on the shell.

## 33. Job control

```sh
command &
jobs
fg
bg
```

Job control is an interactive-shell feature for background and suspended jobs.

## 34. `$PATH`

```sh
echo "$PATH"
```

Third-party FreeBSD commands commonly live in:

```text
/usr/local/bin
/usr/local/sbin
```

## 35. Installing shells with `pkg`

```sh
pkg search zsh
pkg install zsh
pkg install bash
```

After installation, verify the binary path and `/etc/shells`.

## 36. Good FreeBSD setup

```text
root / recovery shell      → base-system shell
interactive user shell     → sh, Bash, Zsh, Fish or tcsh
portable scripts           → /bin/sh
Bash-specific scripts      → /usr/bin/env bash
```

## 37. What is worth learning best

Learn:

- POSIX sh syntax for portable scripts,
- one interactive shell well,
- FreeBSD's `/usr/local` convention,
- how login shells differ from script interpreters.

## 38. Quick cheat sheet

```sh
echo "$SHELL"
ps -p $$ -o comm=
cat /etc/shells
chsh -s /usr/local/bin/zsh
pkg install bash zsh
exec sh
```

## 39. Most important rule

Do not confuse:

- the configured login shell,
- the shell process currently running,
- the interpreter selected by a script's shebang,
- the system `/bin/sh`.

They can all be different.

## Official references

- FreeBSD Handbook - Shells: https://docs.freebsd.org/en/books/handbook/basics/#shells
- FreeBSD manual pages: https://man.freebsd.org/
- FreeBSD Ports and Packages: https://docs.freebsd.org/en/books/handbook/ports/
