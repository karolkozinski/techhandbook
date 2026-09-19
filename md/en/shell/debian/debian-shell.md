# Debian Shell — Practical Command-Line Handbook

## 1. Goal

This handbook is for practical daily work on Debian from a terminal or over SSH.

It focuses on:

- moving around the filesystem,
- reading and editing files,
- finding things,
- managing packages,
- controlling services,
- inspecting processes,
- networking,
- disks and storage,
- permissions,
- logs,
- troubleshooting.

The emphasis is on what a command does, the most useful options, and what information you should expect from it.

## 2. Getting help

### man

```bash
man ls
man systemctl
man ssh
```

Manual pages are the primary local documentation on Unix-like systems.

Useful navigation:

```text
Space       next page
b           previous page
/search     search
n           next result
q           quit
```

### --help

Most GNU tools support:

```bash
command --help
```

Example:

```bash
ls --help
```

### apropos

Search manual-page descriptions:

```bash
apropos network
apropos archive
```

## 3. pwd — where am I?

```bash
pwd
```

Prints the current working directory.

Example output:

```text
/home/karol/projects
```

Useful when a long shell session has left you unsure which directory is active.

## 4. ls — list directory contents

Basic:

```bash
ls
```

Long format:

```bash
ls -l
```

Human-readable sizes:

```bash
ls -lh
```

Include hidden files:

```bash
ls -la
```

Sort by modification time:

```bash
ls -lt
```

Reverse order:

```bash
ls -ltr
```

A long listing shows:

```text
permissions links owner group size date name
```

## 5. cd — change directory

```bash
cd /etc/nginx
```

Home:

```bash
cd
cd ~
```

Parent:

```bash
cd ..
```

Previous directory:

```bash
cd -
```

Absolute paths start at `/`.

Relative paths start from the current directory.

## 6. mkdir — create directories

```bash
mkdir logs
```

Create parents too:

```bash
mkdir -p /srv/app/data/cache
```

`-p` is one of the most useful options because it avoids errors when parent directories do not yet exist.

## 7. rmdir — remove empty directory

```bash
rmdir old-directory
```

It works only when the directory is empty.

For non-empty trees, use `rm -r` carefully.

## 8. touch — create/update a file timestamp

Create an empty file:

```bash
touch notes.txt
```

If the file already exists, its timestamps are updated.

Useful for quick test files.

## 9. cp — copy files

File:

```bash
cp source.txt destination.txt
```

Directory recursively:

```bash
cp -r source-dir destination-dir
```

Preserve metadata:

```bash
cp -a source-dir destination-dir
```

Verbose:

```bash
cp -av source-dir destination-dir
```

For large repeatable directory copies, `rsync` is often better.

## 10. mv — move or rename

Rename:

```bash
mv old.txt new.txt
```

Move:

```bash
mv file.txt /tmp/
```

Move directory:

```bash
mv project /srv/
```

Be careful when the destination already exists.

## 11. rm — remove files

File:

```bash
rm file.txt
```

Directory recursively:

```bash
rm -r directory
```

Force:

```bash
rm -rf directory
```

`rm -rf` is intentionally dangerous. Verify variables and paths before running it.

Useful interactive mode:

```bash
rm -i file
```

## 12. cat — print/concatenate files

```bash
cat file.txt
```

Several files:

```bash
cat part1 part2
```

Good for short files.

For long files, use `less`.

## 13. less — view long text

```bash
less /var/log/example.log
```

Useful keys:

```text
Space   next page
b       previous page
/search search
n       next match
G       end
g       beginning
q       quit
```

Follow a growing file:

```bash
less +F file.log
```

Press Ctrl+C to stop following while remaining in `less`.

## 14. head and tail

First lines:

```bash
head file.txt
head -n 20 file.txt
```

Last lines:

```bash
tail file.txt
tail -n 100 file.log
```

Follow:

```bash
tail -f app.log
```

Excellent for application logs.

## 15. file — identify a file type

```bash
file image
file executable
```

Output may identify:

- text,
- ELF executable,
- PNG/JPEG,
- archive,
- script and interpreter.

Useful when an extension is missing or misleading.

## 16. stat — detailed file metadata

```bash
stat file.txt
```

Shows:

- size,
- inode,
- permissions,
- owner/group,
- timestamps.

## 17. find — search filesystem

By name:

```bash
find . -name '*.md'
```

Case-insensitive:

```bash
find . -iname '*.jpg'
```

Files only:

```bash
find /var/log -type f
```

Directories only:

```bash
find /srv -type d
```

Modified in last day:

```bash
find . -type f -mtime -1
```

Do not blindly combine `find` with destructive `-delete` or `rm` until the selection is verified.

## 18. grep — search text

Basic:

```bash
grep error app.log
```

Case-insensitive:

```bash
grep -i error app.log
```

Recursive:

```bash
grep -R "listen" /etc/nginx
```

Line numbers:

```bash
grep -n "error" app.log
```

Context:

```bash
grep -C 3 "ERROR" app.log
```

Only matching file names:

```bash
grep -Rl "example.com" .
```

## 19. ripgrep — fast recursive search

Install:

```bash
sudo apt install ripgrep
```

Use:

```bash
rg 'pattern'
rg 'func main' .
rg -n 'TODO'
```

It respects common ignore files such as `.gitignore` by default.

Excellent for source trees.

## 20. sort and uniq

Sort lines:

```bash
sort file.txt
```

Unique adjacent lines:

```bash
sort file.txt | uniq
```

Count occurrences:

```bash
sort file.txt | uniq -c | sort -nr
```

## 21. wc — count

```bash
wc file.txt
```

Lines:

```bash
wc -l file.txt
```

Words:

```bash
wc -w file.txt
```

Bytes:

```bash
wc -c file.txt
```

## 22. cut

Extract delimited fields:

```bash
cut -d: -f1 /etc/passwd
```

This prints the first colon-separated field: usernames.

For complex structured data, use a real parser.

## 23. sed

Print selected lines:

```bash
sed -n '1,20p' file.txt
```

Replace text in output:

```bash
sed 's/old/new/g' file.txt
```

Modify a file in place:

```bash
sed -i 's/old/new/g' file.txt
```

Back up important configuration before bulk in-place replacements.

## 24. awk

Field processing:

```bash
awk '{print $1}' file.txt
```

Custom delimiter:

```bash
awk -F: '{print $1, $3}' /etc/passwd
```

AWK is a small programming language specialized for text records and fields.

## 25. Pipes

```bash
command1 | command2
```

The stdout of the first command becomes stdin of the second.

Example:

```bash
ps aux | grep nginx
```

Better process lookup:

```bash
pgrep -af nginx
```

when available.

## 26. Redirection

Overwrite stdout:

```bash
command > file
```

Append:

```bash
command >> file
```

stderr:

```bash
command 2> errors.log
```

Both:

```bash
command > output.log 2>&1
```

Discard:

```bash
command >/dev/null 2>&1
```

## 27. tee

Write output to a file and display it:

```bash
command | tee output.log
```

Append:

```bash
command | tee -a output.log
```

Useful with sudo:

```bash
echo 'value' | sudo tee /etc/example.conf
```

because shell redirection itself is not elevated by `sudo command > file`.

## 28. chmod — permissions

Symbolic:

```bash
chmod u+x script.sh
chmod g-w file
```

Numeric:

```bash
chmod 644 file
chmod 755 script
chmod 600 secret
```

Numbers:

```text
4 read
2 write
1 execute
```

## 29. chown and chgrp

Owner and group:

```bash
sudo chown user:group file
```

Recursive:

```bash
sudo chown -R app:app /srv/app
```

Group only:

```bash
sudo chgrp developers file
```

Be careful with recursive ownership changes on system directories.

## 30. id and groups

```bash
id
groups
id username
```

Shows:

- UID,
- GID,
- supplementary groups.

Useful for permission troubleshooting.

## 31. sudo

Run one command as root:

```bash
sudo command
```

Root login shell:

```bash
sudo -i
```

Edit sudo configuration safely:

```bash
sudo visudo
```

Prefer least privilege to permanently working as root.

## 32. sudoedit

Edit a root-owned file using your editor:

```bash
sudoedit /etc/nginx/nginx.conf
```

This is often safer than running a full editor/file manager as root.

## 33. users and groups

Add user:

```bash
sudo adduser alice
```

Add to group:

```bash
sudo usermod -aG docker alice
```

Important: forgetting `-a` with `usermod -G` can replace supplementary groups.

Check:

```bash
id alice
```

## 34. passwd

Change your password:

```bash
passwd
```

Administrator resets another user's password:

```bash
sudo passwd alice
```

## 35. apt — package management

Refresh package indexes:

```bash
sudo apt update
```

Upgrade installed packages:

```bash
sudo apt upgrade
```

Install:

```bash
sudo apt install nginx
```

Remove package:

```bash
sudo apt remove nginx
```

Remove including package configuration:

```bash
sudo apt purge nginx
```

Remove unused dependencies:

```bash
sudo apt autoremove
```

## 36. apt search and show

Search:

```bash
apt search nginx
```

Package information:

```bash
apt show nginx
```

Installed packages:

```bash
apt list --installed
```

Upgradeable:

```bash
apt list --upgradable
```

## 37. dpkg

List installed packages:

```bash
dpkg -l
```

Files belonging to a package:

```bash
dpkg -L nginx
```

Which package owns a file:

```bash
dpkg -S /usr/sbin/nginx
```

Install a local `.deb` with dependency handling through apt:

```bash
sudo apt install ./package.deb
```

## 38. apt-cache policy

```bash
apt-cache policy nginx
```

Shows:

- installed version,
- candidate version,
- repository priorities/source.

Very useful when multiple repositories are configured.

## 39. systemctl — services

Status:

```bash
systemctl status nginx
```

Start:

```bash
sudo systemctl start nginx
```

Stop:

```bash
sudo systemctl stop nginx
```

Restart:

```bash
sudo systemctl restart nginx
```

Reload configuration if supported:

```bash
sudo systemctl reload nginx
```

Enable at boot:

```bash
sudo systemctl enable nginx
```

Enable and start now:

```bash
sudo systemctl enable --now nginx
```

Disable:

```bash
sudo systemctl disable nginx
```

## 40. Listing services

Running services:

```bash
systemctl --type=service --state=running
```

Failed units:

```bash
systemctl --failed
```

Unit files:

```bash
systemctl list-unit-files
```

## 41. journalctl — system logs

Current boot:

```bash
journalctl -b
```

Specific service:

```bash
journalctl -u nginx
```

Last 100 entries:

```bash
journalctl -u nginx -n 100
```

Follow:

```bash
journalctl -u nginx -f
```

Since a time:

```bash
journalctl --since "1 hour ago"
```

Errors from current boot:

```bash
journalctl -b -p err
```

## 42. ps — processes

```bash
ps aux
```

Common columns include:

- user,
- PID,
- CPU,
- memory,
- command.

Find:

```bash
ps aux | grep nginx
```

Usually better:

```bash
pgrep -af nginx
```

## 43. top and htop

```bash
top
```

Shows live:

- CPU,
- load,
- RAM,
- processes.

Install htop:

```bash
sudo apt install htop
```

Then:

```bash
htop
```

## 44. kill

Graceful termination:

```bash
kill PID
```

This sends SIGTERM by default.

Force:

```bash
kill -9 PID
```

Use SIGKILL only when normal termination fails.

By name:

```bash
pkill processname
```

## 45. uptime

```bash
uptime
```

Shows:

- how long the system has been running,
- logged-in users,
- load averages.

Load average is not simply CPU percentage.

## 46. free — memory

```bash
free -h
```

Shows:

- total RAM,
- used,
- free,
- buffers/cache,
- available,
- swap.

The `available` column is often more useful than raw `free`.

## 47. df — filesystem space

```bash
df -h
```

Shows filesystem capacity and usage.

Specific path:

```bash
df -h /srv
```

Inodes:

```bash
df -i
```

A filesystem can run out of inodes even with free gigabytes.

## 48. du — directory sizes

```bash
du -sh /var/log
```

Top-level sizes:

```bash
du -h --max-depth=1 /var | sort -h
```

Stay on one filesystem:

```bash
sudo du -xhd1 / | sort -h
```

## 49. lsblk

```bash
lsblk
```

Shows block devices:

- disks,
- partitions,
- mount points.

Include filesystem info:

```bash
lsblk -f
```

## 50. blkid

```bash
sudo blkid
```

Shows filesystem types and UUIDs.

Useful when editing `/etc/fstab`.

## 51. mount and umount

List mounts:

```bash
mount
```

Mount:

```bash
sudo mount /dev/sdb1 /mnt/data
```

Unmount:

```bash
sudo umount /mnt/data
```

Do not unplug a mounted writable filesystem without unmounting it.

## 52. /etc/fstab

Persistent mounts are configured in:

```text
/etc/fstab
```

After editing, test without reboot:

```bash
sudo mount -a
```

If it reports an error, fix it before rebooting.

## 53. ip — network interfaces and routes

Addresses:

```bash
ip addr
```

Short form:

```bash
ip -br addr
```

Routes:

```bash
ip route
```

Links:

```bash
ip link
```

## 54. NetworkManager

Status:

```bash
nmcli general status
```

Devices:

```bash
nmcli device
```

Connections:

```bash
nmcli connection show
```

Text UI:

```bash
nmtui
```

Very useful on servers/desktops using NetworkManager.

## 55. ping

```bash
ping 1.1.1.1
ping example.com
```

Stop with Ctrl+C.

If IP works but hostname does not, DNS is a likely problem.

ICMP can be blocked, so failed ping is not absolute proof that a service is down.

## 56. dig

Install:

```bash
sudo apt install dnsutils
```

Query:

```bash
dig example.com
dig +short example.com
dig MX example.com
```

Specific resolver:

```bash
dig @1.1.1.1 example.com
```

## 57. curl

Headers:

```bash
curl -I https://example.com
```

Verbose:

```bash
curl -v https://example.com
```

Fail on HTTP errors and stay quiet except errors:

```bash
curl -fsS https://example.com/health
```

Download:

```bash
curl -LO https://example.com/file.zip
```

## 58. wget

Download:

```bash
wget https://example.com/file.zip
```

Resume:

```bash
wget -c https://example.com/file.zip
```

Recursive website mirroring exists, but use it responsibly.

## 59. ss — sockets and ports

Listening TCP ports:

```bash
ss -lnt
```

Listening TCP/UDP with processes:

```bash
sudo ss -lntup
```

Established connections:

```bash
ss -tn
```

If a service should listen on port 8080, this command answers whether anything actually does.

## 60. lsof

Install if needed:

```bash
sudo apt install lsof
```

Port:

```bash
sudo lsof -i :443
```

Open file:

```bash
sudo lsof /path/to/file
```

Useful when a filesystem cannot be unmounted because a process still uses it.

## 61. nc — netcat

Test TCP port:

```bash
nc -vz example.com 443
```

Listen:

```bash
nc -l 9000
```

Excellent for simple connectivity tests.

## 62. traceroute and tracepath

```bash
tracepath example.com
```

or install/use `traceroute`.

They show network hops toward a destination.

## 63. ssh

Connect:

```bash
ssh user@server
```

Custom port:

```bash
ssh -p 2222 user@server
```

Verbose diagnostics:

```bash
ssh -v user@server
```

Very verbose:

```bash
ssh -vvv user@server
```

## 64. SSH keys

Generate:

```bash
ssh-keygen -t ed25519
```

Copy:

```bash
ssh-copy-id user@server
```

Never share the private key.

## 65. ~/.ssh/config

Example:

```sshconfig
Host myserver
    HostName 203.0.113.10
    User karol
    IdentityFile ~/.ssh/id_ed25519
```

Then:

```bash
ssh myserver
```

## 66. scp

Upload:

```bash
scp file.txt myserver:/tmp/
```

Download:

```bash
scp myserver:/var/log/app.log .
```

For large recurring transfers, prefer `rsync`.

## 67. rsync

Local:

```bash
rsync -av source/ destination/
```

Remote:

```bash
rsync -avz ./site/ myserver:/srv/site/
```

Dry run:

```bash
rsync -av --dry-run source/ destination/
```

Delete destination files absent from source:

```bash
rsync -av --delete source/ destination/
```

Use `--delete` only after a dry run.

## 68. tar

Create gzip archive:

```bash
tar -czf backup.tar.gz directory/
```

List:

```bash
tar -tzf backup.tar.gz
```

Extract:

```bash
tar -xzf backup.tar.gz
```

Create uncompressed tar:

```bash
tar -cf archive.tar directory/
```

## 69. gzip and xz

Compress:

```bash
gzip file
xz file
```

Decompress:

```bash
gunzip file.gz
unxz file.xz
```

`xz` generally compresses more but can be slower.

## 70. zip and unzip

Install:

```bash
sudo apt install zip unzip
```

Create:

```bash
zip -r archive.zip directory/
```

Extract:

```bash
unzip archive.zip
```

## 71. hostname

```bash
hostname
hostnamectl
```

`hostnamectl` also shows system/OS/kernel information on systemd systems.

Change hostname:

```bash
sudo hostnamectl set-hostname newname
```

Understand `/etc/hosts` and DNS implications.

## 72. timedatectl

```bash
timedatectl
```

Shows:

- local time,
- UTC,
- timezone,
- clock synchronization state.

Set timezone:

```bash
sudo timedatectl set-timezone Europe/Warsaw
```

## 73. uname

```bash
uname -a
```

Kernel name/version and architecture information.

Machine architecture:

```bash
uname -m
```

## 74. /etc/os-release

```bash
cat /etc/os-release
```

Shows distribution information.

On Debian, this is a good way to confirm release identity.

## 75. dmesg

Kernel messages:

```bash
dmesg
```

Human-readable timestamps when supported:

```bash
dmesg -T
```

Search:

```bash
dmesg -T | grep -i error
```

Useful for:

- disks,
- drivers,
- USB,
- OOM,
- kernel events.

## 76. lsusb and lspci

USB:

```bash
lsusb
```

PCI:

```bash
lspci
```

Kernel driver details:

```bash
lspci -k
```

Useful for hardware troubleshooting.

## 77. system information

CPU:

```bash
lscpu
```

Memory:

```bash
free -h
```

Block devices:

```bash
lsblk
```

Kernel:

```bash
uname -a
```

## 78. Environment variables

List:

```bash
env
```

One variable:

```bash
echo "$PATH"
```

Temporary value for one command:

```bash
APP_ENV=test ./app
```

Export:

```bash
export EDITOR=nvim
```

## 79. PATH

```bash
echo "$PATH"
```

Find command:

```bash
command -v vim
```

All matches in Bash:

```bash
type -a python3
```

Personal scripts commonly belong in:

```text
~/.local/bin
```

## 80. aliases

```bash
alias ll='ls -lah'
```

Show:

```bash
alias
```

Remove:

```bash
unalias ll
```

Aliases are interactive convenience, not a replacement for scripts.

## 81. history

```bash
history
```

Reverse search:

```text
Ctrl+R
```

Run history carefully; do not paste secrets into the shell if history retention matters.

## 82. jobs, bg, fg

Suspend:

```text
Ctrl+Z
```

List jobs:

```bash
jobs
```

Continue in background:

```bash
bg
```

Bring foreground:

```bash
fg
```

Start directly in background:

```bash
command &
```

For persistent remote work, use `tmux` or a proper service manager.

## 83. nohup

```bash
nohup command > app.log 2>&1 &
```

Keeps a simple process from receiving terminal hangup.

For real services, prefer systemd.

## 84. tmux

Install:

```bash
sudo apt install tmux
```

Start:

```bash
tmux
```

Detach:

```text
Ctrl+B then D
```

List:

```bash
tmux ls
```

Attach:

```bash
tmux attach
```

Great for SSH sessions.

## 85. cron

Edit your jobs:

```bash
crontab -e
```

List:

```bash
crontab -l
```

Every day at 07:30:

```cron
30 7 * * * /usr/local/bin/report
```

Use full paths and redirect logs.

## 86. systemd timers

List:

```bash
systemctl list-timers
```

Timers integrate better with systemd services/logs than cron for many server tasks.

## 87. nano, Vim, MC

Simple editor:

```bash
nano file
```

Vim:

```bash
vim file
```

Midnight Commander:

```bash
mc
```

Use the editor you can operate reliably when changing important configuration.

## 88. jq

Install:

```bash
sudo apt install jq
```

Pretty-print JSON:

```bash
jq . file.json
```

Field:

```bash
jq '.name' file.json
```

From curl:

```bash
curl -s https://example.com/api | jq
```

## 89. process/service troubleshooting workflow

When a service fails:

1. status:

```bash
systemctl status SERVICE
```

2. logs:

```bash
journalctl -u SERVICE -n 100
```

3. process:

```bash
pgrep -af PROCESS
```

4. port:

```bash
sudo ss -lntup
```

5. local application test:

```bash
curl -v http://127.0.0.1:PORT
```

6. configuration test if the application provides one.

Do not restart blindly before collecting evidence.

## 90. Network troubleshooting workflow

1. interface:

```bash
ip -br addr
```

2. route:

```bash
ip route
```

3. gateway connectivity.

4. Internet by IP:

```bash
ping 1.1.1.1
```

5. DNS:

```bash
dig example.com
```

6. port:

```bash
nc -vz example.com 443
```

7. application protocol:

```bash
curl -v https://example.com
```

## 91. Disk troubleshooting workflow

```bash
df -h
df -i
sudo du -xhd1 / | sort -h
docker system df
journalctl --disk-usage
```

Check whether:

- filesystem is full,
- inodes are exhausted,
- logs grew,
- Docker data grew,
- deleted files are still open.

Find open deleted files:

```bash
sudo lsof +L1
```

## 92. Memory troubleshooting

```bash
free -h
top
ps aux --sort=-%mem | head
dmesg -T | grep -i oom
```

Look for:

- memory pressure,
- swap use,
- OOM killer events,
- one process growing unexpectedly.

## 93. Boot troubleshooting

Analyze boot duration:

```bash
systemd-analyze
systemd-analyze blame
systemd-analyze critical-chain
```

Failed services:

```bash
systemctl --failed
```

Current boot logs:

```bash
journalctl -b
```

Previous boot:

```bash
journalctl -b -1
```

## 94. Safe config-edit workflow

Before editing:

```bash
sudo cp -a /etc/service/config   /etc/service/config.bak
```

Edit:

```bash
sudoedit /etc/service/config
```

Validate:

```bash
service-specific-config-test
```

Reload:

```bash
sudo systemctl reload SERVICE
```

Verify:

```bash
systemctl status SERVICE
journalctl -u SERVICE -n 50
```

## 95. Real-life example: find what uses port 8080

```bash
sudo ss -lntp | grep ':8080'
```

or:

```bash
sudo lsof -i :8080
```

You get the process/PID and can then inspect:

```bash
ps -fp PID
```

## 96. Real-life example: site works locally but not from Internet

Local:

```bash
curl -v http://127.0.0.1:8080
```

Listening address:

```bash
ss -lntp
```

Proxy:

```bash
sudo nginx -t
systemctl status nginx
tail -n 100 /var/log/nginx/error.log
```

Firewall and DNS then become the next layers.

## 97. Real-life example: locate a configuration value

```bash
sudo rg -n 'server_name|listen' /etc/nginx
```

If ripgrep is not available:

```bash
sudo grep -RniE 'server_name|listen' /etc/nginx
```

## 98. Real-life example: find largest files

```bash
sudo find /var -xdev -type f -printf '%s %p\n'   | sort -n   | tail -20
```

Or use:

```bash
sudo ncdu /var
```

if `ncdu` is installed.

## 99. Real-life example: safely synchronize a site

Preview:

```bash
rsync -av --delete --dry-run ./public/ server:/srv/site/
```

Only after checking the output:

```bash
rsync -av --delete ./public/ server:/srv/site/
```

## 100. Commands worth knowing instinctively

```text
pwd
ls -lah
cd
less
grep / rg
find
cp / mv / rm
chmod / chown
apt
systemctl
journalctl
ps / pgrep
top
df / du
ip
ss
curl
dig
ssh
rsync
tar
```

## 101. The shell mindset

Do not memorize every option.

Learn to:

1. identify the layer where the problem exists,
2. choose one command that exposes that layer,
3. read its output,
4. narrow the problem,
5. verify the fix.

A good Debian administrator does not “know every command.” They know how to discover what the system is actually doing.
