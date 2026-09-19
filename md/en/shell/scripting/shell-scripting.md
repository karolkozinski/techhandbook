# Shell Scripting — Practical Handbook for Debian and FreeBSD

> Goal: write useful scripts that run commands, display status, ask for input, react to that input and can be launched from any directory.

# 1. Which shell should you choose?

For portability between Debian and FreeBSD:

```sh
#!/bin/sh
```

Use Bash when you intentionally need Bash-specific features:

```bash
#!/usr/bin/env bash
```

Do not write Bash syntax under a `#!/bin/sh` shebang.

# 2. First script

```sh
#!/bin/sh

echo "Hello"
```

Make it executable:

```bash
chmod +x hello
./hello
```

# 3. echo and printf

```sh
echo "Starting..."
printf 'User: %s\n' "$USER"
```

Prefer `printf` when formatting matters.

# 4. Variables

```sh
name="Alice"
count=5

echo "$name"
```

No spaces around `=`.

Quote expansions:

```sh
"$name"
```

# 5. Environment variables

```sh
echo "$HOME"
echo "$PATH"
export APP_ENV="production"
```

# 6. Read input

```sh
printf 'Your name: '
read name
printf 'Hello %s\n' "$name"
```

# 7. Yes/no question

```sh
printf 'Continue? [y/N] '
read answer

case "$answer" in
    y|Y|yes|YES)
        echo "Continuing"
        ;;
    *)
        echo "Cancelled"
        exit 0
        ;;
esac
```

# 8. if

```sh
if [ "$name" = "Alice" ]; then
    echo "Match"
else
    echo "Different"
fi
```

# 9. test and [ ]

```sh
test -f file.txt
[ -f file.txt ]
```

Spaces around brackets are required.

# 10. Important tests

```sh
[ -f "$path" ]   # file
[ -d "$path" ]   # directory
[ -e "$path" ]   # exists
[ -x "$path" ]   # executable
[ -w "$path" ]   # writable
[ -z "$value" ]  # empty
[ -n "$value" ]  # non-empty
```

# 11. Numeric comparisons

```sh
[ "$count" -eq 5 ]
[ "$count" -ne 5 ]
[ "$count" -lt 10 ]
[ "$count" -le 10 ]
[ "$count" -gt 1 ]
[ "$count" -ge 1 ]
```

# 12. case — ideal for menus

```sh
case "$choice" in
    1)
        echo "Status"
        ;;
    2)
        echo "Restart"
        ;;
    q|Q)
        exit 0
        ;;
    *)
        echo "Unknown option"
        ;;
esac
```

# 13. React to command success

```sh
if ping -c 1 1.1.1 >/dev/null 2>&1; then
    echo "Network OK"
else
    echo "Network unavailable"
fi
```

# 14. Best way to test success

Prefer:

```sh
if command; then
    ...
fi
```

instead of reading `$?` later unless you need the numeric status.

# 15. && and ||

```sh
mkdir -p backup && echo "Created"
command || echo "Failed"
```

# 16. Redirecting output

```sh
command > output.log
command >> output.log
command 2> error.log
command >/dev/null 2>&1
```

# 17. Status messages

```sh
info() {
    printf '[INFO] %s\n' "$*"
}

error() {
    printf '[ERROR] %s\n' "$*" >&2
}
```

# 18. Functions

```sh
check_service() {
    service_name=$1

    if service "$service_name" status >/dev/null 2>&1; then
        echo "$service_name is running"
    else
        echo "$service_name is not running"
    fi
}
```

# 19. Script arguments

```text
$0  script name
$1  first argument
$2  second argument
$#  number of arguments
$@  all arguments
```

# 20. Required arguments

```sh
if [ "$#" -lt 1 ]; then
    echo "Usage: $0 HOST" >&2
    exit 2
fi
```

# 21. exit

```sh
exit 0
exit 1
```

Zero means success; non-zero means failure.

# 22. Negation

```sh
if ! command -v curl >/dev/null 2>&1; then
    echo "curl is missing"
fi
```

# 23. for loops

```sh
for file in *.log; do
    echo "$file"
done
```

Arguments:

```sh
for arg in "$@"; do
    echo "$arg"
done
```

# 24. while loop

```sh
while true; do
    echo "Running"
    sleep 5
done
```

# 25. Menu loop

```sh
while true; do
    echo "1) Status"
    echo "2) Restart"
    echo "q) Quit"

    printf '> '
    read choice

    case "$choice" in
        1) show_status ;;
        2) restart_service ;;
        q|Q) break ;;
        *) echo "Unknown option" ;;
    esac
done
```

# 26. Detect operating system

```sh
os=$(uname -s)

case "$os" in
    Linux)
        echo "Linux"
        ;;
    FreeBSD)
        echo "FreeBSD"
        ;;
    *)
        echo "Unsupported system: $os" >&2
        exit 1
        ;;
esac
```

# 27. Debian + FreeBSD script

```sh
update_system() {
    case "$(uname -s)" in
        Linux)
            sudo apt update &&
            sudo apt upgrade
            ;;
        FreeBSD)
            sudo pkg update &&
            sudo pkg upgrade
            ;;
        *)
            echo "Unsupported OS" >&2
            return 1
            ;;
    esac
}
```

# 28. Command substitution

```sh
hostname=$(hostname)
now=$(date)
```

# 29. Arithmetic

```sh
count=$((count + 1))
result=$((a + b))
```

# 30. Default variable value

```sh
port=${PORT:-8080}
```

Use `PORT` if set and non-empty; otherwise use 8080.

# 31. Check whether a program exists

```sh
if command -v curl >/dev/null 2>&1; then
    echo "curl available"
else
    echo "curl missing"
fi
```

# 32. Safer scripts

Bash often uses:

```bash
set -euo pipefail
```

Portable `sh` does not guarantee `pipefail`.

A common portable baseline is:

```sh
set -eu
```

Understand strict modes before applying them blindly.

# 33. Comments

```sh
# Check Internet connectivity
```

Comment why something is done.

# 34. Clear structure

```sh
#!/bin/sh
set -eu

# Configuration
DEFAULT_PORT=8080

# Functions
log() {
    printf '%s\n' "$*"
}

# Validation
if ! command -v curl >/dev/null 2>&1; then
    echo "curl missing" >&2
    exit 1
fi

# Main
log "Starting"
```

# 35. stderr

```sh
echo "Error" >&2
```

# 36. Run a script without ./

The script must be executable and in a directory listed in PATH.

# 37. User scripts

A good location:

```text
~/.local/bin
```

```bash
mkdir -p ~/.local/bin
mv mytool ~/.local/bin/
chmod +x ~/.local/bin/mytool
```

# 38. Add ~/.local/bin to PATH

```sh
PATH="$HOME/.local/bin:$PATH"
export PATH
```

# 39. Where to configure PATH

Bash:

```text
~/.profile
~/.bashrc
```

POSIX sh:

```text
~/.profile
```

Zsh:

```text
~/.zprofile
~/.zshrc
```

# 40. Reload changes

```bash
. ~/.bashrc
```

For login environment changes, a new login session is often cleaner.

# 41. Check which tool runs

```bash
command -v mytool
type mytool
```

# 42. Scripts for all users

```bash
sudo install -m 755 mytool /usr/local/bin/mytool
```

# 43. Naming scripts

CLI tools do not need a `.sh` extension.

Examples:

```text
backup-server
check-site
update-lab
```

# 44. Aliases vs scripts

Aliases are interactive shortcuts.

Scripts are reusable programs, can take arguments and work from automation.

# 45. Example — check server

```sh
#!/bin/sh

host=${1:-example.com}

printf 'Checking %s...\n' "$host"

if ping -c 1 "$host" >/dev/null 2>&1; then
    echo "Host reachable"
else
    echo "Host unreachable"
    exit 1
fi
```

# 46. Example — administration menu

```sh
#!/bin/sh

while true; do
    echo "1) Disk"
    echo "2) Memory"
    echo "3) Network"
    echo "q) Quit"

    printf '> '
    read choice

    case "$choice" in
        1) df -h ;;
        2)
            if command -v free >/dev/null 2>&1; then
                free -h
            else
                sysctl hw.physmem
            fi
            ;;
        3)
            case "$(uname -s)" in
                Linux) ip addr ;;
                FreeBSD) ifconfig ;;
            esac
            ;;
        q|Q) exit 0 ;;
        *) echo "Unknown option" ;;
    esac
done
```

# 47. Confirm before an operation

```sh
printf 'Delete backup? [y/N] '
read answer

case "$answer" in
    y|Y)
        rm -f backup.tar.gz
        ;;
    *)
        echo "Cancelled"
        ;;
esac
```

# 48. System update script

```sh
#!/bin/sh
set -e

case "$(uname -s)" in
    Linux)
        sudo apt update
        sudo apt upgrade
        ;;
    FreeBSD)
        sudo pkg update
        sudo pkg upgrade
        ;;
    *)
        echo "Unsupported OS" >&2
        exit 1
        ;;
esac
```

# 49. Commands with statuses

```sh
run_step() {
    label=$1
    shift

    printf '[...] %s\n' "$label"

    if "$@"; then
        printf '[ OK ] %s\n' "$label"
    else
        printf '[FAIL] %s\n' "$label" >&2
        return 1
    fi
}
```

# 50. Command-style tool

```sh
case "${1:-}" in
    status)
        show_status
        ;;
    restart)
        restart_service
        ;;
    *)
        echo "Usage: $0 {status|restart}" >&2
        exit 2
        ;;
esac
```

# 51. Larger pattern

```sh
#!/bin/sh
set -eu

usage() {
    echo "Usage: $0 HOST" >&2
}

check_dependency() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "Missing dependency: $1" >&2
        exit 1
    }
}

main() {
    [ "$#" -eq 1 ] || {
        usage
        exit 2
    }

    host=$1
    check_dependency curl

    if curl -fsS "https://$host" >/dev/null; then
        echo "OK"
    else
        echo "FAILED" >&2
        exit 1
    fi
}

main "$@"
```

# 52. return vs exit

`return` exits a function.

`exit` terminates the whole script.

# 53. Pipelines and searching text

```sh
ps aux | grep nginx
grep -i error logfile
grep -R pattern directory
```

# 54. Ctrl+C and trap

```sh
cleanup() {
    rm -f "$tmpfile"
}

trap cleanup EXIT INT TERM
```

# 55. Temporary files

```sh
tmpfile=$(mktemp)
trap 'rm -f "$tmpfile"' EXIT
```

Avoid predictable temporary filenames.

# 56. Debugging

```bash
sh -x script.sh
bash -x script.sh
```

Inside the script:

```sh
set -x
set +x
```

# 57. Syntax checking

```bash
sh -n script.sh
bash -n script.sh
```

# 58. ShellCheck

Debian:

```bash
sudo apt install shellcheck
```

FreeBSD:

```bash
pkg install hs-ShellCheck
```

Run:

```bash
shellcheck script.sh
```

# 59. Permissions

```bash
ls -l script
chmod +x script
```

# 60. Script requiring root

```sh
if [ "$(id -u)" -ne 0 ]; then
    echo "Run as root" >&2
    exit 1
fi
```

Prefer elevating only the commands that actually need root where practical.

# 61. Configuration

Use environment variables, command-line options, config files and sensible defaults.

Do not hard-code secrets.

# 62. User configuration

A common path:

```text
~/.config/mytool/config
```

# 63. Basic tool template

```sh
#!/bin/sh
set -eu

usage() {
    echo "Usage: $0 COMMAND" >&2
}

main() {
    cmd=${1:-}

    case "$cmd" in
        status)
            echo "OK"
            ;;
        *)
            usage
            exit 2
            ;;
    esac
}

main "$@"
```

# 64. Install your own tool

User:

```bash
install -m 755 mytool ~/.local/bin/mytool
```

System-wide:

```bash
sudo install -m 755 mytool /usr/local/bin/mytool
```

# 65. getopts

```sh
while getopts "h:p:" opt; do
    case "$opt" in
        h) host=$OPTARG ;;
        p) port=$OPTARG ;;
        *) exit 2 ;;
    esac
done
```

# 66. Rules worth remembering

Quote variables:

```sh
"$var"
```

Check failures.

Use functions.

Use `command -v` for dependencies.

Run ShellCheck.

# 67. Minimum knowledge

Know:

- shebang,
- variables,
- quoting,
- input,
- if,
- case,
- loops,
- functions,
- exit codes,
- arguments,
- redirections,
- pipelines,
- command substitution,
- PATH,
- executable permissions.

# 68. Mental model

```text
read configuration/input
↓
validate environment
↓
run commands
↓
check results
↓
print useful status
↓
return meaningful exit code
```

# 69. Small project idea

Create `server-check` that:

1. accepts a host,
2. checks ping,
3. checks HTTPS with curl,
4. prints DNS resolution,
5. returns success/failure,
6. runs from any directory.

# Cheat sheet

```sh
#!/bin/sh

name="Alice"

read value

if [ -f "$file" ]; then
    ...
fi

case "$choice" in
    1) ... ;;
    *) ... ;;
esac

hello() {
    echo "hello"
}

if command; then
    ...
fi

value=$(command)
command -v curl >/dev/null 2>&1
```

Install to:

```text
~/.local/bin
```

Check:

```bash
sh -n script.sh
shellcheck script.sh
```

# Summary

Shell scripting is ideal for combining existing commands into small operational tools.

For Debian + FreeBSD portability, start with POSIX `sh`.

Use Bash when Bash-specific features genuinely help.
