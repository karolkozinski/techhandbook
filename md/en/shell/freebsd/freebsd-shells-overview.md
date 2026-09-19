# Shells on FreeBSD — Overview

## 1. What a shell is

A shell is the command interpreter between the user and the operating system.

It handles:

- commands,
- variables,
- pipelines,
- redirections,
- globbing,
- scripts,
- job control.

A terminal is not a shell; it is the interface in which the shell runs.

## 2. Base system vs additional software

FreeBSD clearly separates:

```text
base system
```

from:

```text
third-party packages
```

This matters for shells.

Some shells are part of the base system; others are installed with `pkg`.

## 3. Default FreeBSD shell

Modern FreeBSD uses `sh` as an important system shell, while root and historical environments may expose C-shell family behavior depending on version and configuration.

Always inspect the actual account:

```sh
echo "$SHELL"
getent passwd "$USER"
ps -p $$ -o comm=
```

Do not assume from an old tutorial.

## 4. Important shells

| Shell | Role |
|---|---|
| sh | system/POSIX-style shell |
| csh/tcsh | traditional BSD interactive shell family |
| Bash | popular extra shell |
| Zsh | advanced interactive shell |
| Fish | friendly interactive shell |
| ksh/mksh | KornShell family |

## 5. `sh` on FreeBSD

FreeBSD `sh` is part of the base system.

For portable system scripts:

```sh
#!/bin/sh
```

is the natural choice.

It is different from Debian's dash, but both aim at POSIX-style scripting.

## 6. `sh` configuration

Common files include:

```text
~/.profile
~/.shrc
```

Exactly which files are read depends on login/interactive mode and FreeBSD version.

Check:

```sh
man sh
```

## 7. Bash on FreeBSD

Install:

```sh
sudo pkg install bash
```

Typical path:

```text
/usr/local/bin/bash
```

This differs from many Linux systems.

## 8. Bash configuration

```text
~/.bashrc
~/.bash_profile
```

Example:

```bash
alias ll='ls -lah'
export EDITOR=nvim
```

## 9. Zsh

```sh
sudo pkg install zsh
```

Usually:

```text
/usr/local/bin/zsh
```

Config:

```text
~/.zshrc
```

## 10. Fish

```sh
sudo pkg install fish
```

Config:

```text
~/.config/fish/config.fish
```

Fish is intentionally not POSIX-compatible. Use it as an interactive shell, not as a replacement interpreter for `/bin/sh` scripts.

## 11. csh

The C-shell family has syntax different from POSIX shells.

Examples differ in:

- variable assignment,
- conditionals,
- loops,
- startup files.

Do not paste Bash syntax into csh and expect it to work.

## 12. tcsh

tcsh is an enhanced C shell and has historically been common in BSD environments.

Check:

```sh
tcsh --version
```

Use it if you like it interactively or maintain an existing environment, but write portable automation in `sh` unless there is a reason not to.

## 13. KornShell and mksh

Install from packages when needed:

```sh
sudo pkg install ksh93
```

or an available `mksh` package.

Package names can vary by release, so search:

```sh
pkg search ksh
```

## 14. Available login shells

```sh
cat /etc/shells
```

Third-party shells installed under `/usr/local/bin` should appear there before being selected as login shells.

## 15. Checking the shell

```sh
echo "$SHELL"
ps -p $$ -o comm=
getent passwd "$USER"
```

## 16. Starting another shell

```sh
bash
zsh
fish
```

Return:

```sh
exit
```

## 17. `exec`

```sh
exec zsh
```

This replaces the current shell process.

## 18. Changing the login shell

```sh
chsh -s /usr/local/bin/zsh
```

or use:

```sh
chpass
```

Verify the exact path first.

## 19. Root — important practice

Do not change root's shell casually.

During recovery or single-user mode, third-party filesystems and `/usr/local` availability may differ.

Keeping critical administrative tooling close to the base system reduces recovery surprises.

## 20. `sudo -i`

If sudo is installed:

```sh
sudo -i
```

starts a login-like root environment.

FreeBSD can also use `su` or `doas` depending on configuration.

## 21. Shebang

Portable:

```sh
#!/bin/sh
```

Bash from packages:

```bash
#!/usr/bin/env bash
```

## 22. Why `env bash` is useful

On Linux Bash may be:

```text
/bin/bash
```

while on FreeBSD it is commonly:

```text
/usr/local/bin/bash
```

Using:

```bash
#!/usr/bin/env bash
```

lets `PATH` locate it.

## 23. Do not replace system `sh`

The base system expects a working system shell.

Your interactive preference should not modify core assumptions.

## 24. Redirections

```sh
command > file
command >> file
command 2> errors
command 2>&1
```

## 25. Pipelines

```sh
ps aux | grep nginx
sockstat -4 -6 | grep ':443'
```

## 26. Variables

POSIX:

```sh
NAME="Karol"
echo "$NAME"
```

No spaces around `=`.

## 27. Quoting

Quote expansions:

```sh
cp -- "$source" "$destination"
```

Single quotes are literal; double quotes allow variable expansion.

## 28. Globbing

```text
*.conf
file?.txt
[0-9]*
```

The shell expands patterns before starting the program.

## 29. Builtins

```sh
type cd
type echo
type printf
```

## 30. Aliases

```sh
alias ll='ls -lah'
```

Best for interactive convenience.

## 31. Functions

```sh
mkcd() {
    mkdir -p "$1" && cd "$1"
}
```

## 32. History

Available behavior depends on the shell.

Typical interactive tools provide command history and reverse search.

## 33. Job control

```text
Ctrl+Z
jobs
bg
fg
```

## 34. `$PATH`

On FreeBSD, packages are typically under:

```text
/usr/local/bin
/usr/local/sbin
```

Check:

```sh
echo "$PATH"
```

## 35. Installing shells with `pkg`

```sh
pkg search zsh
sudo pkg install zsh
```

Then inspect:

```sh
which zsh
cat /etc/shells
```

## 36. Good FreeBSD setup

A practical arrangement:

```text
system scripts → /bin/sh
portable automation → /bin/sh
personal interactive shell → sh, tcsh, Bash, Zsh, or Fish
root/recovery → keep base-system assumptions simple
```

## 37. What to learn best

For administration and portability:

```text
POSIX sh syntax
```

For everyday interactive work:

```text
choose the shell you actually enjoy using
```

## 38. Quick reference

```sh
echo "$SHELL"
ps -p $$ -o comm=
cat /etc/shells
pkg search zsh
sudo pkg install zsh
chsh -s /usr/local/bin/zsh
man sh
```

## 39. Key rule

On FreeBSD, know the distinction between:

```text
base system
```

and:

```text
software installed under /usr/local
```

It explains many path and shell differences compared with Linux.
