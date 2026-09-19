# Debian — Practical Shell Handbook

> Everyday command-line work and basic server administration on Debian.

# Debian — administrator, system and directories

Use `sudo` for administrative commands:

```bash
sudo COMMAND
```

System version:

```bash
cat /etc/debian_version
cat /etc/os-release
```

Important directories:

```text
/etc      configuration
/var      logs, caches and changing data
/home     user homes
/root     root home
/usr      programs and shared data
/tmp      temporary files
/opt      optional software
/srv      service/application data
```

# 1. Shell, terminal and commands

The terminal is the interface window. The shell interprets commands.

Check the shell:

```bash
echo "$SHELL"
ps -p $$ -o comm=
```

# 2. pwd

```bash
pwd
```

Prints the current working directory.

# 3. ls

```bash
ls
ls -l
ls -a
ls -lh
ls -lt
ls -lS
ls -lah
```

# 4. cd

```bash
cd /etc
cd ..
cd ~
cd -
```

# 5. Paths

Absolute:

```text
/etc/nginx/nginx.conf
```

Relative:

```text
../config/app.conf
```

`.` means current directory, `..` means parent.

# 6. touch and mkdir

```bash
touch notes.txt
mkdir logs
mkdir -p /srv/app/data/cache
```

# 7. cp

```bash
cp file.txt copy.txt
cp -r source/ destination/
cp -i file target
cp -v file target
```

# 8. mv

```bash
mv old.txt new.txt
mv file /tmp/
mv -i source target
mv -v source target
```

# 9. rm

```bash
rm file
rm -i file
rm -r directory
rm -f file
```

Use `rm -rf` only when you understand exactly what path will be removed.

# 10. Reading files

```bash
cat file.txt
less file.txt
head -n 20 file.txt
tail -n 50 file.txt
tail -f /var/log/nginx/error.log
```

# 11. grep

```bash
grep pattern file
grep -i error file
grep -n pattern file
grep -R pattern directory/
grep -v pattern file
grep -E 'foo|bar' file
```

# 12. find

```bash
find /etc -name 'nginx.conf'
find . -iname '*.md'
find . -type f
find . -mtime -1
find . -size +100M
```

# 13. Finding programs and inspecting files

```bash
command -v nginx
which nginx
whereis nginx
file /usr/bin/nginx
stat file.txt
```

Prefer `command -v` in scripts.

# 14. man

```bash
man ls
man ssh
```

Search inside a man page with `/`.

# 15. echo, redirection and pipelines

```bash
echo "$HOME"
command > file.txt
command >> file.txt
command 2> errors.txt
command1 | command2
```

# 16. sort, uniq and wc

```bash
sort file
sort file | uniq
sort file | uniq -c
wc -l file
wc -w file
```

# 17. Identity and sessions

```bash
whoami
id
groups
who
w
```

# 18. Kernel and host

```bash
uname -a
uname -r
hostname
hostnamectl
uptime
```

# 19. Processes

```bash
top
ps aux
ps -ef
pgrep nginx
pgrep -af myapp
kill PID
pkill nginx
```

Prefer graceful termination before SIGKILL.

# 20. Disk and filesystems

```bash
df -h
df -i
du -sh directory
du -sh *
sudo du -xhd1 /var | sort -h
mount
findmnt
lsblk
lsblk -f
```

# 21. Networking

Interfaces and routes:

```bash
ip addr
ip link
ip route
```

Connectivity:

```bash
ping 1.1.1.1
ping example.com
```

HTTP:

```bash
curl https://example.com
curl -I https://example.com
curl -v https://example.com
```

DNS:

```bash
host example.com
dig example.com
dig +short example.com
```

Ports:

```bash
ss -lntup
ss -lnt
```

# 22. SSH and file transfer

```bash
ssh user@server
ssh -p 2222 user@server
ssh -v user@server
scp file.txt user@server:/tmp/
scp user@server:/tmp/file.txt .
ssh-keygen -t ed25519
```

# 23. Permissions

```bash
chmod u+x script.sh
chmod 640 config.yml
chmod 755 script.sh
sudo chown user:group file
sudo chown -R app:app /srv/app
```

# 24. apt

Refresh metadata:

```bash
sudo apt update
```

Upgrade:

```bash
sudo apt upgrade
```

Full dependency-changing upgrade:

```bash
sudo apt full-upgrade
```

Install/remove:

```bash
sudo apt install nginx
sudo apt remove nginx
sudo apt purge nginx
sudo apt autoremove
```

Search/info:

```bash
apt search nginx
apt show nginx
```

# 25. dpkg

```bash
dpkg -l
dpkg -L PACKAGE
dpkg -S /path/to/file
```

# 26. systemd and systemctl

```bash
systemctl status nginx
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl enable nginx
sudo systemctl enable --now nginx
```

# 27. journalctl

```bash
journalctl -u nginx
journalctl -u nginx -f
journalctl -u nginx -b
journalctl -p err
```

# 28. NetworkManager

```bash
nmcli device
nmcli connection show
nmcli connection show --active
```

# 29. dmesg and hardware

```bash
dmesg
dmesg -T
lscpu
lspci
lsusb
```

# 30. date, history and keyboard shortcuts

```bash
date
date -Iseconds
history
```

Useful shortcuts:

```text
Ctrl+R   reverse history search
Ctrl+C   interrupt
Ctrl+D   EOF/logout
Ctrl+L   clear screen
Ctrl+A   line start
Ctrl+E   line end
Ctrl+U   delete to start
Ctrl+K   delete to end
```

# 31. Command chaining

```bash
command1 && command2
command1 || command2
command1 ; command2
```

# 32. Background jobs

```bash
command &
jobs
fg
bg
```

# 33. tmux

```bash
tmux
tmux new -s work
tmux attach -t work
```

# 34. Archives

```bash
tar -czf backup.tar.gz directory/
tar -xzf backup.tar.gz
tar -tf backup.tar.gz
gzip file
gunzip file.gz
```

# 35. crontab

```bash
crontab -e
crontab -l
```

Example:

```cron
30 7 * * * /usr/local/bin/report
```

# 36. Quick troubleshooting

Service:

```bash
systemctl status SERVICE
journalctl -u SERVICE -n 100
```

Ports:

```bash
ss -lntup
```

Local application:

```bash
curl -v http://127.0.0.1:PORT
```

System resources:

```bash
df -h
free -h
uptime
top
```

Network:

```bash
ip addr
ip route
ping 1.1.1.1
dig example.com
```

# Real-life examples

## Website stopped responding

```bash
systemctl status nginx
journalctl -u nginx -n 100
ss -lntp
curl -I http://127.0.0.1
```

## Disk almost full

```bash
df -h
sudo du -xhd1 /var | sort -h
```

## Find a configuration file

```bash
find /etc -iname '*nginx*'
```

## Who uses port 8080?

```bash
sudo ss -lntp | grep ':8080'
sudo lsof -i :8080
```

## Network does not work

```bash
ip addr
ip route
ping 1.1.1.1
dig example.com
```

## Safe SSH configuration change

Keep the old SSH session open, validate, reload, then test a new login:

```bash
sudo sshd -t
sudo systemctl reload ssh
```

## Application consumes CPU

```bash
top
ps aux --sort=-%cpu | head
```

## Follow logs while testing

```bash
journalctl -u myapp -f
```

## Identify an unfamiliar server

```bash
cat /etc/os-release
uname -a
uptime
df -h
free -h
ip addr
ss -lntup
systemctl --type=service --state=running
```

## Update Debian

```bash
sudo apt update
sudo apt upgrade
```

## Long SSH task

```bash
tmux new -s update
```

## Backup system configuration

```bash
sudo tar -czf etc-backup.tar.gz /etc
```

# Minimum to memorize

```text
pwd ls cd
cp mv rm
cat less tail
grep find
ps top pgrep kill
df du
ip ss curl dig
ssh scp
chmod chown
apt
systemctl journalctl
tar tmux
```
