---
id: "doc-031"
title: "Shell Scripting - Debian and FreeBSD"
slug: "shell-scripting-debian-and-freebsd"
description: "For portable system scripts use POSIX sh. Use Bash only when you intentionally need Bash-specific syntax. FreeBSD /bin/sh and Debian /bin/sh are not Bash."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "shell"
  - "bash"
  - "scripting"
  - "script"
---

# Shell Scripting - Debian and FreeBSD

Related topics: [Debian Practical Shell Handbook](techhandbook:doc-027), [FreeBSD Practical Shell Handbook](techhandbook:doc-029), [Shells in Debian](techhandbook:doc-028) and [Shells in FreeBSD](techhandbook:doc-030).

# 1. Which shell should you choose for scripts?
For portable system scripts use POSIX `sh`. Use Bash only when you intentionally need Bash-specific syntax. FreeBSD `/bin/sh` and Debian `/bin/sh` are not Bash.
# 2. First script
```sh
#!/bin/sh

echo "Hello"
```
Make it executable with `chmod +x script.sh` and run `./script.sh`.
# 3. `echo` and `printf` - printing information
```sh
echo "Starting..."
printf 'Status: %s\n' "$status"
```
Prefer `printf` when exact formatting matters.
# 4. Variables
```sh
name="user"
echo "$name"
```
Do not put spaces around `=`. Quote variable expansions unless you explicitly want word splitting/globbing.
# 5. Environment variables
```sh
export APP_ENV=production
printf '%s\n' "$APP_ENV"
```
# 6. Reading user input
```sh
printf 'Name: '
read -r name
printf 'Hello %s\n' "$name"
```
# 7. Yes / no questions
```sh
printf 'Continue? [y/N] '
read -r answer
case "$answer" in
  y|Y|yes|YES) echo "Continuing" ;;
  *) echo "Cancelled" ;;
esac
```
# 8. `if` statement
```sh
if command; then
  echo "success"
else
  echo "failure"
fi
```
# 9. `test` and `[ ]`
```sh
if [ -f "$file" ]; then
  echo "file exists"
fi
```
Spaces inside `[ ... ]` are mandatory because `[` is a command.
# 10. Most important tests
## Does a file exist?
```sh
[ -f "$file" ]
```
## Does a directory exist?
```sh
[ -d "$dir" ]
```
## Does something exist regardless of type?
```sh
[ -e "$path" ]
```
## Is the file executable?
```sh
[ -x "$file" ]
```
## Is the file writable?
```sh
[ -w "$file" ]
```
## Is the variable empty?
```sh
[ -z "$value" ]
```
## Is the variable non-empty?
```sh
[ -n "$value" ]
```
# 11. Comparing numbers
```sh
[ "$a" -eq "$b" ]
[ "$a" -lt "$b" ]
[ "$a" -gt "$b" ]
```
# 12. `case` - ideal for menus
```sh
case "$choice" in
  1) do_one ;;
  2) do_two ;;
  q|Q) exit 0 ;;
  *) echo "Unknown option" ;;
esac
```
# 13. Reacting to command result
```sh
some_command
status=$?
echo "exit status: $status"
```
# 14. Best way to check command success
```sh
if some_command; then
  echo "OK"
else
  echo "FAILED" >&2
fi
```
Usually test the command directly rather than checking `$?` later.
# 15. `&&` and `||`
```sh
build && deploy
command || echo "failed" >&2
```
# 16. Output redirection
```sh
command >output.txt
command >>output.txt
command 2>errors.txt
command >all.txt 2>&1
```
# 17. Status messages
```sh
printf '[INFO] %s\n' "Starting backup"
printf '[ERROR] %s\n' "Backup failed" >&2
```
# 18. Functions
```sh
log() {
  printf '[INFO] %s\n' "$*"
}

log "Starting"
```
# 19. Arguments passed to the script
```sh
echo "$0"
echo "$1"
echo "$2"
echo "$#"
echo "$@"
```
# 20. Checking required arguments
```sh
if [ "$#" -lt 1 ]; then
  echo "Usage: $0 FILE" >&2
  exit 2
fi
```
# 21. `exit` - ending a script
Use `exit 0` for success and non-zero values for failure. Pick consistent exit codes for meaningful error classes.
# 22. Negation `!`
```sh
if ! command -v git >/dev/null 2>&1; then
  echo "git not found" >&2
fi
```
# 23. `for` loops
```sh
for file in *.log; do
  echo "$file"
done
```
# 24. `while` loop
```sh
while read -r line; do
  echo "$line"
done < file.txt
```
# 25. Menu loop
```sh
while :; do
  printf '1) status  q) quit\n> '
  read -r choice
  case "$choice" in
    1) status_cmd ;;
    q|Q) break ;;
  esac
done
```
# 26. Detecting the operating system
```sh
os=$(uname -s)
case "$os" in
  Linux) echo "Linux" ;;
  FreeBSD) echo "FreeBSD" ;;
  *) echo "Unsupported: $os" >&2; exit 1 ;;
esac
```
# 27. Debian + FreeBSD script
Branch only where platform commands differ, e.g. `apt/systemctl` on Debian versus `pkg/service/sysrc` on FreeBSD.
# 28. Command substitution
```sh
hostname=$(hostname)
now=$(date '+%F %T')
```
# 29. Arithmetic
```sh
count=$((count + 1))
total=$((a + b))
```
# 30. Default variable value
```sh
port=${PORT:-8080}
name=${1:-default}
```
# 31. Checking whether a program exists
```sh
if command -v curl >/dev/null 2>&1; then
  echo "curl available"
fi
```
# 32. Safer scripts
Quote variables, validate inputs, stop on real errors deliberately, use temporary files safely and keep destructive operations explicit.
# 33. Comments
```sh
# Explain why, not the obvious syntax.
```
**Check Internet connectivity**

```sh
if ping -c 1 1.1.1.1 >/dev/null 2>&1; then
  echo "network reachable"
fi
```
# 34. Clear script structure
# Configuration
Constants/defaults and configurable paths belong near the top.
# Functions
Put reusable actions into small named functions.
# Validation
Check required commands, arguments, files and privileges before changing anything.
# Main program
Keep the actual execution flow short and readable.
# ...
For larger scripts, split logic into separate files or move to a more suitable language.
# 35. `stderr` - error messages
```sh
echo "error" >&2
```
# 36. Running a script without `./`
Put it in a directory listed in `PATH`, such as `~/.local/bin`, and make it executable.
# 37. Best place for your own user scripts
```text
~/.local/bin
```
# 38. Adding `~/.local/bin` to `PATH`
```sh
export PATH="$HOME/.local/bin:$PATH"
```
# 39. Where to configure `PATH`
## Bash
Usually `~/.profile` for login environment and `~/.bashrc` for interactive Bash-specific setup.
## POSIX `sh`
Use a login/profile file appropriate to the shell/session, commonly `~/.profile`.
## Zsh
Use `~/.zshenv`/`~/.zprofile`/`~/.zshrc` according to whether the setting is environment, login or interactive.
## tcsh / csh
Use the csh/tcsh configuration files and `setenv PATH ...` syntax.
# 40. Reloading changes without logging out
```sh
. ~/.profile
```
For Bash interactive config use `source ~/.bashrc` or `. ~/.bashrc`.
# 41. Checking where a script runs from
```sh
command -v mytool
which mytool
```
# 42. Scripts available to all users
System-wide custom commands commonly belong in `/usr/local/bin`; install them as root with appropriate ownership/mode.
# 43. Script filename
Use simple lowercase names without spaces; a `.sh` suffix is optional for installed command-like tools.
# 44. Aliases vs scripts
Aliases are interactive shortcuts; scripts are reusable programs that work from any shell/session with predictable behavior.
# 45. Practical example - checking a server
```sh
#!/bin/sh
set -u
echo "Host: $(hostname)"
uptime
df -h
if command -v systemctl >/dev/null 2>&1; then
  systemctl --failed
fi
```
# 46. Practical example - administration menu
Use a `while` loop plus `case` to offer status, logs, restart and quit actions.
# 47. Practical example - confirmation before operation
```sh
printf 'Delete %s? [y/N] ' "$target"
read -r answer
case "$answer" in y|Y) rm -- "$target" ;; *) exit 0 ;; esac
```
# 48. Practical example - system update script
Detect OS, then run Debian `apt update/upgrade` or FreeBSD `pkg update/upgrade`, logging failures and exit status.
# 49. Practical example - series of commands with statuses
Wrap each operation in a function that prints `[OK]` or `[FAIL]` and returns a meaningful status.
# 50. Practical example - tool accepting commands
Use `case "$1"` to implement subcommands such as `status`, `start`, `stop`, `logs`.
# 51. More elaborate example
A useful admin tool can combine config variables, validation, OS detection, logging functions, subcommands and cleanup traps.
# 52. `return` vs `exit`
`return` leaves a function or sourced script. `exit` terminates the whole shell script process.
# 53. Pipeline
```sh
ps aux | grep nginx
find . -type f | sort | uniq
```
# 54. Searching text
```sh
grep -Rni 'error' /var/log
grep -E 'error|warning' file.log
```
# 55. Handling Ctrl+C and `trap`
```sh
cleanup() { rm -f "$tmp"; }
trap cleanup EXIT INT TERM
```
# 56. Temporary files
```sh
tmp=$(mktemp) || exit 1
trap 'rm -f "$tmp"' EXIT
```
# 57. Debugging a script
```sh
sh -x script.sh
```
Use `set -x` only where useful because traces may expose secrets.
# 58. Syntax checking
```sh
sh -n script.sh
bash -n script.sh
```
# 59. ShellCheck
```bash
shellcheck script.sh
```
ShellCheck catches quoting, portability and logic issues.
# 60. `shellcheck` + Vim
Run ShellCheck from Vim/Neovim through a command, quickfix integration or linting plugin, but keep the CLI command usable independently.
# 61. Permissions
```sh
chmod 755 ~/.local/bin/mytool
ls -l ~/.local/bin/mytool
```
# 62. Script requiring root
```sh
if [ "$(id -u)" -ne 0 ]; then
  echo "Run as root" >&2
  exit 1
fi
```
Prefer narrow sudo rules or specific privileged commands where possible.
# 63. Script configuration
Keep non-secret defaults in a config file or environment variables; do not hard-code credentials.
# 64. User configuration directory
```text
~/.config/mytool/config
```
# 65. Colors - optional
Use colors only for interactive terminals and provide plain output for logs/pipes. Check `[ -t 1 ]` before ANSI styling.
# 66. Basic template for your own tool
```sh
#!/bin/sh
set -u

die() { echo "ERROR: $*" >&2; exit 1; }

main() {
  command -v curl >/dev/null 2>&1 || die "curl required"
  # work
}

main "$@"
```
# 67. Example installation of your script
```bash
mkdir -p ~/.local/bin
install -m 755 mytool ~/.local/bin/mytool
command -v mytool
```
# 68. When the script should be really “installed”
Use `/usr/local/bin` for the executable, `/usr/local/etc` or `/etc` for system config, documentation/man page if appropriate, and package it if many hosts/users need managed upgrades.
# 69. What to learn next
Quoting/word splitting, `getopts`, traps, robust temp files, text processing (`awk`, `sed`), and when to switch from shell to Python/Go.
# 70. `getopts` - first step toward a proper CLI
```sh
while getopts 'vf:' opt; do
  case "$opt" in
    v) verbose=1 ;;
    f) file=$OPTARG ;;
    *) exit 2 ;;
  esac
done
```
# 71. Most important rules to remember
## Quote variables
```sh
rm -- "$file"
```
## Check errors
Do not assume a command succeeded; test it or let the failure propagate deliberately.
## Use functions
Functions keep repeated actions and error handling readable.
## Keep your own programs in the right place
Use `~/.local/bin` for user tools and `/usr/local/bin` for system-wide local tools.
## Use `command -v`
```sh
command -v curl >/dev/null 2>&1 || exit 1
```
## Check the script
```sh
sh -n script.sh
shellcheck script.sh
```
# 72. Minimum knowledge needed to write useful scripts
Shebang, variables, quoting, input, if/test, case, loops, functions, arguments, exit codes, redirection, command substitution, PATH and error handling.
# 73. How to think about a shell script
A shell script is glue around existing commands. Use it to orchestrate tools; do not force complex data structures/business logic into shell when another language is clearer.
# 74. Small project to build yourself
Create a `serverctl` tool with `status`, `logs`, `restart`, `backup` and `update` subcommands, supporting Debian and FreeBSD.
# Cheat sheet
## Script start
```sh
#!/bin/sh
```
## Message
```sh
printf '%s\n' "hello"
```
## Variable
```sh
name=value
echo "$name"
```
## Input
```sh
read -r value
```
## Condition
```sh
if [ -f "$file" ]; then ...; fi
```
## Menu
```sh
case "$choice" in ... esac
```
## Function
```sh
fn() { ...; }
```
## Command result
```sh
if command; then ...; fi
```
## Argument
```sh
first=$1
```
## Command result into variable
```sh
host=$(hostname)
```
## Check a program
```sh
command -v git
```
## Make available from every directory
```bash
install -m 755 tool ~/.local/bin/tool
```
## Check
```bash
sh -n tool
shellcheck tool
```
# Summary
Good shell scripts are small, explicit and defensive: quote input, validate assumptions, use exit codes, separate stderr, clean up temporary files and rely on existing Unix tools.

## Official references

- POSIX Shell Command Language: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/V3_chap02.html
- Debian Reference - shell programming: https://www.debian.org/doc/manuals/debian-reference/ch12
- FreeBSD sh(1): https://man.freebsd.org/cgi/man.cgi?query=sh&sektion=1
