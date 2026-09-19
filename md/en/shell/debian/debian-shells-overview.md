# Shells on Debian — Overview

## 1. What a shell is

A shell is a command interpreter. It reads commands, expands variables and wildcards, performs redirections and pipelines, and starts programs.

A terminal is only the window or text interface in which a shell runs.

Typical stack:

```text
terminal emulator
    ↓
shell
    ↓
commands / programs
    ↓
kernel
```

## 2. Important terms

### Login shell

The shell assigned to a user account, recorded in `/etc/passwd`.

Check it with:

```bash
getent passwd "$USER"
```

or:

```bash
echo "$SHELL"
```

### Current shell

`$SHELL` usually describes the login shell, not necessarily the process currently running.

Check the current process:

```bash
ps -p $$ -o comm=
```

### `/bin/sh`

On Debian, `/bin/sh` normally points to **dash**.

It is intended for portable POSIX-style shell scripts.

### Script interpreter

The first line may select an interpreter:

```sh
#!/bin/sh
```

or:

```bash
#!/usr/bin/env bash
```

## 3. How Debian uses shells

Debian distinguishes between:

- interactive shells used by people,
- `/bin/sh` used by many system scripts,
- shells installed as optional user tools.

Do not change `/bin/sh` just because you prefer Bash or Zsh.

## 4. Important shells

| Shell | Typical role |
|---|---|
| dash | fast POSIX `/bin/sh` |
| Bash | common interactive and scripting shell |
| Zsh | powerful interactive shell |
| Fish | user-friendly interactive shell |
| ksh / mksh | KornShell family |
| tcsh | C-shell family, mostly legacy/specialized use |

## 5. Bash

Install:

```bash
sudo apt install bash
```

Usually already installed.

Start:

```bash
bash
```

Version:

```bash
bash --version
```

Bash is a good default if you want:

- wide documentation,
- strong scripting features,
- arrays,
- `[[ ... ]]`,
- functions,
- completion,
- compatibility across Linux systems.

## 6. Bash configuration

Common files:

```text
~/.bashrc
~/.profile
/etc/bash.bashrc
/etc/profile
```

For interactive Bash, most personal settings belong in:

```text
~/.bashrc
```

Example:

```bash
alias ll='ls -lah'
export EDITOR=nvim
```

Reload:

```bash
source ~/.bashrc
```

## 7. dash

dash is small and fast.

Start:

```bash
dash
```

It intentionally lacks many Bash-specific features.

A script using:

```sh
#!/bin/sh
```

should not assume Bash arrays, `[[ ... ]]`, or Bash-only expansions.

## 8. `sh` on Debian

Check:

```bash
readlink -f /bin/sh
```

Typical result:

```text
/usr/bin/dash
```

When writing portable scripts, test them with:

```bash
sh script.sh
```

## 9. Zsh

Install:

```bash
sudo apt install zsh
```

Start:

```bash
zsh
```

Configuration:

```text
~/.zshrc
```

Zsh is popular for interactive use because of its completion, globbing, prompts, and plugin ecosystem.

## 10. Fish

Install:

```bash
sudo apt install fish
```

Start:

```bash
fish
```

Fish is intentionally not POSIX-compatible. It is excellent as an interactive shell, but do not write `#!/bin/sh` scripts using Fish syntax.

Configuration:

```text
~/.config/fish/config.fish
```

## 11. ksh and mksh

Install, depending on repository availability:

```bash
sudo apt install ksh
sudo apt install mksh
```

KornShell influenced many later shell features and is still found in Unix environments and older enterprise scripts.

## 12. tcsh

Install:

```bash
sudo apt install tcsh
```

Its syntax differs significantly from POSIX shells.

Use it mainly when maintaining an environment that already depends on it.

## 13. Available login shells

```bash
cat /etc/shells
```

Only approved paths should normally be used as login shells.

## 14. Checking your shell

```bash
echo "$SHELL"
ps -p $$ -o comm=
getent passwd "$USER"
```

These commands answer slightly different questions.

## 15. Starting another shell

```bash
zsh
fish
bash
```

Exit back to the previous shell:

```bash
exit
```

## 16. `exec`

Replace the current shell process:

```bash
exec zsh
```

There is no nested shell to return to.

## 17. Changing the login shell

```bash
chsh -s /usr/bin/zsh
```

Log out and back in.

Verify the path first:

```bash
command -v zsh
cat /etc/shells
```

## 18. Shebang

Examples:

```sh
#!/bin/sh
```

```bash
#!/usr/bin/env bash
```

Use `/bin/sh` when the script is genuinely POSIX-compatible.

Use Bash explicitly when you use Bash features.

## 19. Do not replace `/bin/sh`

System scripts may depend on Debian's expected behavior.

Your preferred interactive shell and the system `sh` are separate choices.

## 20. Redirections and pipelines

```bash
command > output.txt
command >> output.txt
command 2> errors.txt
command 2>&1
command1 | command2
```

## 21. Variables

POSIX-style:

```sh
NAME="Karol"
echo "$NAME"
```

Environment variable:

```bash
export EDITOR=nvim
```

## 22. Quoting

Single quotes:

```bash
echo '$HOME'
```

print literally.

Double quotes:

```bash
echo "$HOME"
```

expand variables while preserving spaces as one argument.

Quote variables by default:

```bash
rm -- "$file"
```

## 23. Globbing

```text
*.log
file?.txt
[abc]*
```

The shell expands globs before the command receives arguments.

## 24. Builtins and external programs

Check:

```bash
type cd
type printf
type grep
```

`cd` must be a shell builtin because it changes the shell's own working directory.

## 25. Aliases

```bash
alias ll='ls -lah'
```

Aliases are useful interactively. For reusable automation, prefer scripts or functions.

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

History behavior differs between shells.

## 28. Job control

```text
Ctrl+Z
jobs
bg
fg
```

Start in background:

```bash
command &
```

## 29. Login and interactive shells

A login shell and an interactive shell may read different startup files.

When configuration “works in terminal but not over SSH/cron,” check which files are actually loaded.

## 30. `$PATH`

```bash
echo "$PATH"
command -v python3
```

A useful personal location:

```text
~/.local/bin
```

## 31. Practical choice

A sensible Debian setup:

```text
system scripts: /bin/sh → dash
portable scripts: #!/bin/sh
Bash-specific scripts: #!/usr/bin/env bash
interactive shell: Bash or Zsh
friendly alternative: Fish
```

## 32. Quick reference

```bash
echo "$SHELL"
ps -p $$ -o comm=
cat /etc/shells
command -v bash
chsh -s /usr/bin/zsh
exec zsh
source ~/.bashrc
```

## 33. Key rule

Choose the shell according to the task.

Do not confuse:

```text
your interactive preference
```

with:

```text
the interpreter a script explicitly requires
```
