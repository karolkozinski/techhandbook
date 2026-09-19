# Shells in FreeBSD — Handbook

## 1. What is a shell?

A shell is a command interpreter used to run programs, expand variables/globs, create pipelines and write scripts.

## 2. Base system vs additional software

FreeBSD clearly separates the base system from third-party packages. Shells from packages commonly live under `/usr/local/bin`.

## 3. Default shell

Always check the actual account:

```bash
getent passwd "$USER"
```

## 4. Important shells

Common choices include sh, csh, tcsh, Bash, Zsh, Fish and KornShell-family shells.

## 5. sh on FreeBSD

The system `/bin/sh` is part of the base system and is appropriate for POSIX-style scripts.

```sh
#!/bin/sh
```

## 6. sh configuration

Interactive login configuration commonly involves:

```text
~/.profile
```

## 7. Bash

Install:

```bash
pkg install bash
```

Common path:

```text
/usr/local/bin/bash
```

## 8. Bash configuration

```text
~/.bashrc
~/.profile
~/.bash_profile
```

## 9. Zsh

```bash
pkg install zsh
```

Common path:

```text
/usr/local/bin/zsh
```

Configuration:

```text
~/.zshrc
```

## 10. Fish

```bash
pkg install fish
```

Configuration:

```text
~/.config/fish/config.fish
```

Fish is intentionally not POSIX-shell compatible.

## 11. csh and tcsh

FreeBSD historically has strong C-shell-family usage. Their syntax differs significantly from sh/Bash.

## 12. KornShell and mksh

Install the package available for your FreeBSD release, for example ksh93 or mksh.

## 13. Available login shells

```bash
cat /etc/shells
```

## 14. Checking the shell

```bash
echo "$SHELL"
ps -p $$ -o comm=
getent passwd "$USER"
```

## 15. Start another shell

```bash
sh
bash
zsh
fish
tcsh
```

## 16. exec

```bash
exec zsh
```

Replaces the current shell process.

## 17. Change login shell

```bash
chsh -s /usr/local/bin/zsh
```

Use a path present in `/etc/shells`.

## 18. Root — practical advice

Keep root on a base-system shell unless you fully understand recovery implications. A package-installed shell under `/usr/local` may not be desirable for root recovery.

## 19. sudo -i and su -

If sudo is installed:

```bash
sudo -i
```

Traditional approach:

```bash
su -
```

## 20. Shebang

Portable:

```sh
#!/bin/sh
```

Bash:

```bash
#!/usr/bin/env bash
```

## 21. Why env bash helps

FreeBSD Bash commonly lives in `/usr/local/bin/bash`, while Linux paths differ. `/usr/bin/env bash` finds Bash through PATH.

## 22. Do not replace system sh

Install additional user shells without replacing `/bin/sh`.

## 23. Redirections and pipelines

```bash
command > file
command >> file
command 2> errors
command1 | command2
```

## 24. Variables and quoting

sh/Bash style:

```bash
name="Alice"
echo "$name"
```

csh/tcsh use different syntax.

## 25. Globbing

```text
*.txt
file?.conf
[abc]*
```

## 26. Builtins

```bash
type cd
command -V printf
```

## 27. Aliases

```bash
alias ll='ls -lah'
```

Interactive convenience only.

## 28. Functions

sh-style:

```bash
mkcd() {
    mkdir -p "$1" && cd "$1"
}
```

## 29. History

Bash, Zsh and tcsh provide history mechanisms.

## 30. Job control

```bash
command &
jobs
fg
bg
```

## 31. PATH

```bash
echo "$PATH"
```

Third-party commands commonly live under:

```text
/usr/local/bin
/usr/local/sbin
```

## 32. Installing shells with pkg

```bash
pkg search zsh
pkg install zsh
```

## 33. Good FreeBSD setup

```text
system/root recovery shell → base /bin/sh
interactive user shell     → sh, Bash or Zsh
portable scripts           → /bin/sh
Bash-specific scripts      → /usr/bin/env bash
```

## 34. What to learn

Learn POSIX sh basics plus FreeBSD path/service/pkg conventions. Use Bash or Zsh interactively if you prefer them.

## 35. Quick reference

```bash
echo "$SHELL"
ps -p $$ -o comm=
cat /etc/shells
chsh -s /usr/local/bin/zsh
pkg install bash zsh
exec sh
```

## 36. Most important rule

Do not confuse interactive shell, login shell, script interpreter and system `/bin/sh`. They may all differ.
