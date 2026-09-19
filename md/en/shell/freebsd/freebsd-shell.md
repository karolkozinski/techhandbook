# FreeBSD — Practical Shell Handbook

> Everyday command-line work and basic server administration on FreeBSD.

# FreeBSD — administrator, system and directories

Traditional root access:

```bash
su -
```

If installed, `sudo` or `doas` may also be used.

System version:

```bash
freebsd-version
uname -a
```

Important directories:

```text
/etc            base-system configuration
/usr/local/etc  package configuration
/var            logs and variable data
/home           user homes
/root           root home
/usr/local      third-party software
/boot           boot configuration
```

# 1. Core shell commands

```bash
pwd
ls -lah
cd /path
touch file
mkdir -p dir/subdir
cp -r src dst
mv old new
rm file
less file
head -n 20 file
tail -f file
grep -R pattern .
find . -name '*.conf'
command -v program
file PATH
stat PATH
man COMMAND
```

# 2. Redirection and pipelines

```bash
command > file
command >> file
command 2> errors
command1 | command2
```

# 3. Identity and sessions

```bash
whoami
id
groups
who
w
```

# 4. Kernel and host

```bash
uname -a
uname -r
hostname
uptime
```

# 5. Processes

```bash
top
ps aux
pgrep nginx
pgrep -af myapp
kill PID
pkill nginx
```

# 6. Filesystems and disk usage

```bash
df -h
du -sh *
mount
```

# 7. Disks

```bash
geom disk list
gpart show
camcontrol devlist
```

# 8. ZFS

```bash
zpool status
zpool list
zfs list
zfs list -t snapshot
```

Create snapshot:

```bash
zfs snapshot pool/dataset@name
```

# 9. Networking — ifconfig and routing

```bash
ifconfig
ifconfig em0
netstat -rn
route -n get default
```

# 10. Connectivity

```bash
ping 1.1.1.1
ping example.com
curl -I https://example.com
curl -v https://example.com
host example.com
dig example.com
```

# 11. Listening ports — sockstat

```bash
sockstat -4 -6
sockstat -l
sockstat -4 -l
sockstat -4 -l | grep ':8080'
```

# 12. SSH

```bash
ssh user@server
ssh -p 2222 user@server
ssh -v user@server
scp file user@server:/tmp/
ssh-keygen -t ed25519
```

# 13. Permissions

```bash
chmod u+x script.sh
chmod 640 config.yml
chmod 755 script.sh
chown user:group file
chown -R app:app /srv/app
```

# 14. pkg

```bash
pkg update
pkg upgrade
pkg install nginx
pkg delete nginx
pkg search nginx
pkg info nginx
pkg info
pkg autoremove
pkg which /usr/local/bin/nginx
```

# 15. Services

```bash
service nginx status
service nginx start
service nginx stop
service nginx restart
```

# 16. sysrc

Enable service:

```bash
sysrc nginx_enable=YES
```

Check:

```bash
sysrc nginx_enable
sysrc -a
```

# 17. Logs

```bash
tail -f /var/log/messages
```

Third-party services may log under `/var/log` or application-specific locations.

# 18. Base system vs packages

FreeBSD separates the base operating system from third-party packages.

Use `pkg` for packages.

On supported release systems, binary base updates commonly use `freebsd-update`.

# 19. Updating the base system

```bash
freebsd-update fetch
freebsd-update install
```

For upgrades between releases, follow official FreeBSD release documentation.

# 20. dmesg and sysctl

```bash
dmesg
sysctl kern.ostype
sysctl hw.ncpu
sysctl hw.physmem
```

Search:

```bash
sysctl -a | grep NAME
```

# 21. date, history and shortcuts

```bash
date
history
```

Useful interactive shortcuts in compatible shells:

```text
Ctrl+R reverse history
Ctrl+C interrupt
Ctrl+D EOF/logout
Ctrl+L clear
```

# 22. Command chaining

```bash
command1 && command2
command1 || command2
command1 ; command2
```

# 23. Background jobs

```bash
command &
jobs
fg
bg
```

# 24. tmux

```bash
pkg install tmux
tmux new -s work
tmux attach -t work
```

# 25. Archives

```bash
tar -czf backup.tar.gz directory/
tar -xzf backup.tar.gz
gzip file
gunzip file.gz
```

# 26. crontab

```bash
crontab -e
crontab -l
```

# 27. Quick troubleshooting

```bash
freebsd-version
uptime
df -h
zpool status
ifconfig
netstat -rn
sockstat -4 -6 -l
service SERVICE status
tail -n 100 /var/log/messages
```

# Real-life examples

## Website stopped responding

```bash
service nginx status
sockstat -4 -l | grep ':80\|:443'
tail -n 100 /var/log/nginx/error.log
curl -I http://127.0.0.1
```

## Disk almost full

```bash
df -h
du -sh /var/*
```

## Check ZFS health

```bash
zpool status
zpool list
zfs list
```

## Find nginx configuration

```bash
find /usr/local/etc -iname '*nginx*'
```

## Who uses port 8080?

```bash
sockstat -4 -l | grep ':8080'
```

## Network does not work

```bash
ifconfig
netstat -rn
ping 1.1.1.1
dig example.com
```

## Install nginx

```bash
pkg install nginx
sysrc nginx_enable=YES
service nginx start
```

## nginx fails after config change

```bash
nginx -t
service nginx status
tail -n 100 /var/log/nginx/error.log
```

## Application consumes CPU

```bash
top
ps aux
```

## Identify an unfamiliar server

```bash
freebsd-version
uname -a
uptime
df -h
zpool status
ifconfig
sockstat -4 -6 -l
service -e
```

## Update packages

```bash
pkg update
pkg upgrade
```

## Update base system

```bash
freebsd-update fetch
freebsd-update install
```

## Long SSH task

```bash
tmux new -s work
```

## Backup configuration

```bash
tar -czf config-backup.tar.gz /etc /usr/local/etc
```

# Minimum to memorize

```text
pwd ls cd
cp mv rm
cat less tail
grep find
ps top pgrep kill
df du
ifconfig netstat sockstat
curl dig ssh scp
chmod chown
pkg
service sysrc
zpool zfs
sysctl
tar tmux
```
