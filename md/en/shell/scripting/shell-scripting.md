# Shell Scripting — Practical Handbook for Debian and FreeBSD

## 1. Which shell should you choose?

For portable system scripts on Debian and FreeBSD, use:

```sh
#!/bin/sh
```

Use Bash explicitly when you need Bash-only features:

```bash
#!/usr/bin/env bash
```

Do not write Bash syntax under a `#!/bin/sh` shebang.

## 2. First script

```sh
#!/bin/sh
echo "Hello"
```

Make it executable and run it:

```bash
chmod +x hello
./hello
```

## 3. Output: `echo` and `printf`

```sh
echo "Starting..."
printf 'Status: %s\n' "OK"
```

For scripts, `printf` is more predictable across shells.

## 4. Variables

```sh
NAME="Karol"
PORT=8080

echo "$NAME"
printf '%s\n' "$PORT"
```

No spaces around `=`.

Quote expansions by default:

```sh
cp -- "$SOURCE" "$DESTINATION"
```

## 5. Environment variables

```sh
echo "$HOME"
echo "$PATH"
export APP_ENV=production
```

Exported variables are inherited by child processes.

## 6. Reading user input

```sh
printf 'Your name: '
read -r NAME
printf 'Hello, %s\n' "$NAME"
```

Use `read -r` so backslashes are not treated specially.

## 7. Yes/no question

```sh
printf 'Continue? [y/N] '
read -r ANSWER

case "$ANSWER" in
    y|Y|yes|YES)
        echo "Continuing"
        ;;
    *)
        echo "Cancelled"
        exit 0
        ;;
esac
```

## 8. `if`

```sh
if command -v git >/dev/null 2>&1; then
    echo "Git is installed."
else
    echo "Git is missing."
fi
```

## 9. `test` and `[ ]`

Equivalent in normal POSIX usage:

```sh
test -f "$FILE"
[ -f "$FILE" ]
```

Spaces inside `[ ... ]` are required.

## 10. Important tests

```sh
[ -f "$FILE" ]   # regular file
[ -d "$DIR" ]    # directory
[ -e "$PATHNAME" ] # exists
[ -x "$FILE" ]   # executable
[ -w "$FILE" ]   # writable
[ -z "$VALUE" ]  # empty
[ -n "$VALUE" ]  # non-empty
```

## 11. Comparing numbers and strings

Numbers:

```sh
[ "$COUNT" -eq 10 ]
[ "$COUNT" -ne 10 ]
[ "$COUNT" -lt 10 ]
[ "$COUNT" -le 10 ]
[ "$COUNT" -gt 10 ]
[ "$COUNT" -ge 10 ]
```

Strings:

```sh
[ "$NAME" = "Karol" ]
[ "$NAME" != "Karol" ]
```

## 12. `case`

Excellent for menus and subcommands:

```sh
case "${1:-}" in
    start)
        echo "Starting"
        ;;
    stop)
        echo "Stopping"
        ;;
    status)
        echo "Status"
        ;;
    *)
        echo "Usage: $0 {start|stop|status}"
        exit 2
        ;;
esac
```

## 13. Exit status

Commands return:

```text
0     success
non-0 another condition or failure
```

Check immediately:

```sh
command
STATUS=$?
echo "$STATUS"
```

## 14. Prefer direct conditional checks

```sh
if curl -fsS https://example.com >/dev/null; then
    echo "Site responds."
else
    echo "Site check failed."
fi
```

This is clearer than checking `$?` much later.

## 15. `&&` and `||`

```sh
mkdir -p backup && cp file backup/
command || echo "Command failed"
```

Use these for simple flows, not for deeply nested logic.

## 16. Redirection

```sh
command > output.log
command >> output.log
command 2> error.log
command > all.log 2>&1
command >/dev/null 2>&1
```

## 17. Status messages

```sh
printf '[INFO] Checking disk...\n'
df -h /
printf '[OK] Done.\n'
```

Errors:

```sh
printf '[ERROR] Something failed.\n' >&2
```

## 18. Functions

```sh
log_info() {
    printf '[INFO] %s\n' "$*"
}

check_file() {
    [ -f "$1" ]
}
```

## 19. Arguments

```text
$0  script name
$1  first argument
$2  second argument
$#  argument count
"$@" all arguments, safely separated
```

Example:

```sh
printf 'First argument: %s\n' "${1:-}"
```

## 20. Required arguments

```sh
if [ "$#" -lt 1 ]; then
    echo "Usage: $0 FILE" >&2
    exit 2
fi

FILE=$1
```

## 21. `exit`

```sh
exit 0
```

means success.

Any non-zero value indicates another result or an error.

## 22. Negation

```sh
if ! command -v jq >/dev/null 2>&1; then
    echo "jq is not installed"
fi
```

## 23. `for`

```sh
for FILE in *.log; do
    echo "$FILE"
done
```

Arguments:

```sh
for ARG in "$@"; do
    printf '%s\n' "$ARG"
done
```

## 24. `while`

```sh
COUNT=1

while [ "$COUNT" -le 5 ]; do
    echo "$COUNT"
    COUNT=$((COUNT + 1))
done
```

## 25. Menu loop

```sh
while :; do
    printf '%s\n'         "1) Status"         "2) Disk"         "q) Quit"

    read -r CHOICE

    case "$CHOICE" in
        1) uptime ;;
        2) df -h ;;
        q|Q) break ;;
        *) echo "Unknown option" ;;
    esac
done
```

## 26. Detecting the operating system

```sh
case "$(uname -s)" in
    Linux)
        echo "Linux"
        ;;
    FreeBSD)
        echo "FreeBSD"
        ;;
    *)
        echo "Unsupported system" >&2
        exit 1
        ;;
esac
```

Do not assume all Linux systems are Debian.

## 27. Debian + FreeBSD differences

Package management:

```text
Debian   apt
FreeBSD  pkg
```

Services:

```text
Debian   systemctl
FreeBSD  service + sysrc
```

Network tools differ too. Detect capabilities instead of blindly assuming command names.

## 28. Command substitution

```sh
HOST=$(hostname)
NOW=$(date '+%F %T')
```

Prefer `$(...)` to legacy backticks.

## 29. Arithmetic

```sh
COUNT=$((COUNT + 1))
PORT=$((8000 + 80))
```

## 30. Default values

```sh
PORT=${PORT:-8080}
```

Require a variable:

```sh
: "${API_URL:?API_URL is required}"
```

## 31. Check whether a command exists

```sh
if ! command -v curl >/dev/null 2>&1; then
    echo "curl is required" >&2
    exit 1
fi
```

Prefer `command -v` over parsing `which`.

## 32. Safer scripts

POSIX shell:

```sh
set -eu
```

Bash often uses:

```bash
set -euo pipefail
```

Understand `set -e`; it has important exceptions. `pipefail` is not POSIX.

## 33. Comments

```sh
# Check connectivity before downloading data.
ping -c 1 1.1.1.1 >/dev/null 2>&1
```

Explain **why**, not obvious syntax.

## 34. Readable structure

A useful layout:

```text
shebang
safety options
configuration
functions
argument validation
main logic
```

Example:

```sh
#!/bin/sh
set -eu

log() {
    printf '%s\n' "$*"
}

main() {
    log "Starting"
}

main "$@"
```

## 35. stderr

```sh
echo "Missing configuration" >&2
```

This keeps normal output and errors separate.

## 36. Running without `./`

The file must:

1. be executable,
2. be located in a directory in `PATH`.

## 37. Personal scripts

A good location:

```text
~/.local/bin
```

Install:

```bash
mkdir -p ~/.local/bin
install -m 755 myscript ~/.local/bin/myscript
```

## 38. Adding to PATH

```sh
export PATH="$HOME/.local/bin:$PATH"
```

Add it to the appropriate shell startup file if needed.

## 39. Startup files

Bash commonly uses:

```text
~/.bashrc
~/.profile
```

POSIX login environment:

```text
~/.profile
```

Zsh:

```text
~/.zshrc
```

csh/tcsh use different syntax.

## 40. Reloading settings

Portable:

```sh
. ~/.profile
```

Bash:

```bash
source ~/.bashrc
```

## 41. Finding a command

```bash
command -v myscript
```

Inside a script, `$0` contains the invocation name/path.

## 42. System-wide scripts

A common location:

```text
/usr/local/bin
```

Install:

```bash
sudo install -m 755 myscript /usr/local/bin/myscript
```

## 43. Script names

Prefer simple command names:

```text
servercheck
backup-db
deploy-site
```

The `.sh` extension is optional for installed commands.

## 44. Aliases vs scripts

Aliases are interactive conveniences.

Scripts are:

- executable,
- reusable,
- versionable,
- callable by cron/systemd/other programs.

## 45. Practical server check

```sh
#!/bin/sh
set -eu

HOST=${1:-example.com}

printf 'Checking %s... ' "$HOST"

if ping -c 1 "$HOST" >/dev/null 2>&1; then
    echo "OK"
else
    echo "FAILED"
    exit 1
fi
```

## 46. Administrative menu

```sh
#!/bin/sh

while :; do
    printf '%s\n'         "1) Disk"         "2) Uptime"         "q) Quit"

    read -r CHOICE

    case "$CHOICE" in
        1) df -h ;;
        2) uptime ;;
        q|Q) exit 0 ;;
        *) echo "Unknown option" ;;
    esac
done
```

## 47. Confirm destructive operations

```sh
printf 'Delete temporary files? [y/N] '
read -r ANSWER

case "$ANSWER" in
    y|Y|yes|YES)
        rm -rf -- "$TMPDIR"
        ;;
    *)
        echo "Cancelled"
        ;;
esac
```

Validate variables before destructive commands.

## 48. Updating systems

Debian:

```sh
sudo apt update &&
sudo apt upgrade
```

FreeBSD packages:

```sh
sudo pkg update &&
sudo pkg upgrade
```

FreeBSD base-system updates are a separate concept.

## 49. Run commands with status output

```sh
run() {
    printf '[RUN] %s\n' "$*"
    "$@"
    printf '[OK]  %s\n' "$*"
}

run git status
run go test ./...
```

## 50. Subcommands

```sh
case "${1:-}" in
    up) start_service ;;
    down) stop_service ;;
    status|"") show_status ;;
    *)
        echo "Usage: $0 {up|down|status}" >&2
        exit 2
        ;;
esac
```

## 51. Structured CLI example

```sh
#!/bin/sh
set -eu

usage() {
    echo "Usage: $0 [-v] FILE"
}

VERBOSE=0

while getopts "vh" OPT; do
    case "$OPT" in
        v) VERBOSE=1 ;;
        h) usage; exit 0 ;;
        *) usage >&2; exit 2 ;;
    esac
done

shift $((OPTIND - 1))

[ "$#" -eq 1 ] || {
    usage >&2
    exit 2
}

FILE=$1

[ -f "$FILE" ] || {
    echo "File not found: $FILE" >&2
    exit 1
}

[ "$VERBOSE" -eq 0 ] || echo "Processing $FILE"
wc -l "$FILE"
```

## 52. `return` vs `exit`

```sh
return 1
```

returns from a function.

```sh
exit 1
```

terminates the whole script.

## 53. Pipelines

```sh
ps aux | grep nginx
```

Pipeline exit-status behavior differs between plain POSIX shell and Bash with `pipefail`.

## 54. Searching text

```sh
if grep -q "ERROR" app.log; then
    echo "Errors found"
fi
```

## 55. `trap`

Cleanup on exit/signals:

```sh
cleanup() {
    rm -f -- "$TMPFILE"
}

trap cleanup EXIT HUP INT TERM
```

## 56. Temporary files

```sh
TMPFILE=$(mktemp)
```

Do not use predictable temporary filenames for sensitive operations.

## 57. Debugging

```bash
sh -x script.sh
bash -x script.sh
```

Inside:

```sh
set -x
```

Tracing can expose secrets, so use it carefully.

## 58. Syntax checks

```bash
sh -n script.sh
bash -n script.sh
```

## 59. ShellCheck

Debian:

```bash
sudo apt install shellcheck
```

FreeBSD:

```sh
pkg search shellcheck
sudo pkg install hs-ShellCheck
```

Then:

```bash
shellcheck script.sh
```

Package names can change; search if needed.

## 60. Permissions

```bash
chmod 755 tool
chmod 700 private-tool
chmod 600 .env
```

## 61. Root requirement

```sh
if [ "$(id -u)" -ne 0 ]; then
    echo "Run as root." >&2
    exit 1
fi
```

Do not require root if only one operation needs elevated privileges.

## 62. Configuration

Separate:

```text
logic
configuration
secrets
```

Possible locations:

```text
/etc/mytool.conf
~/.config/mytool/config
environment variables
```

## 63. XDG configuration

```sh
CONFIG_HOME=${XDG_CONFIG_HOME:-"$HOME/.config"}
CONFIG_DIR="$CONFIG_HOME/mytool"
```

## 64. Colors

Treat colors as optional decoration.

Scripts should remain understandable in plain text, logs, and redirected output.

## 65. Reusable template

```sh
#!/bin/sh
set -eu

PROGRAM=${0##*/}

usage() {
    echo "Usage: $PROGRAM COMMAND"
}

die() {
    echo "$PROGRAM: $*" >&2
    exit 1
}

need() {
    command -v "$1" >/dev/null 2>&1 ||
        die "required command not found: $1"
}

main() {
    case "${1:-}" in
        status)
            uptime
            ;;
        *)
            usage
            exit 2
            ;;
    esac
}

main "$@"
```

## 66. Installing a tool

Personal:

```bash
install -m 755 tool ~/.local/bin/tool
```

System-wide:

```bash
sudo install -m 755 tool /usr/local/bin/tool
```

## 67. When a script becomes a program

As complexity grows, consider:

- `getopts`,
- `--help`,
- documented exit codes,
- config files,
- logging,
- tests,
- packaging.

At some point, Python or Go may be clearer than a very large shell script.

## 68. `getopts`

```sh
while getopts "vf:" OPT; do
    case "$OPT" in
        v) VERBOSE=1 ;;
        f) FILE=$OPTARG ;;
        *) exit 2 ;;
    esac
done
```

## 69. Useful next tools

Learn:

- `grep`,
- `sed`,
- `awk`,
- regex,
- `jq`,
- `xargs`,
- cron/systemd timers.

## 70. Core rules

- quote variables,
- check failures,
- use functions,
- use `command -v`,
- keep scripts in sensible locations,
- run ShellCheck,
- avoid unnecessary root privileges.

## 71. Mental model

A shell script is mostly:

```text
run command
 ↓
inspect status/output
 ↓
make decision
 ↓
run next command
```

Shell is excellent glue between programs.

## 72. Final cheat sheet

```sh
#!/bin/sh

VAR="value"
printf '%s\n' "$VAR"
read -r INPUT

if command; then
    ...
fi

case "${1:-}" in
    start) ... ;;
    *) ... ;;
esac

for X in "$@"; do
    ...
done

while condition; do
    ...
done

func() {
    ...
}

command -v curl
RESULT=$(command)
exit 0
```

## Summary

Write shell scripts that are:

- small,
- readable,
- explicit,
- portable when practical,
- checked before use,
- careful around quoting and destructive commands.

For larger application logic, choose a general-purpose language rather than turning shell into an entire software platform.
