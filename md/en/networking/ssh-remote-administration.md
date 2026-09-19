# SSH and Remote Administration — Handbook

## 1. SSH

Basic connection:

```bash
ssh user@server
```

Custom port:

```bash
ssh -p 2222 user@server
```

## 2. Keys

```bash
ssh-keygen -t ed25519
```

Default paths:

```text
~/.ssh/id_ed25519
~/.ssh/id_ed25519.pub
```

Never share the private key.

## 3. Copying a key

```bash
ssh-copy-id user@server
```

## 4. authorized_keys

On the server:

```text
~/.ssh/authorized_keys
```

Permissions:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

## 5. SSH config

```text
~/.ssh/config
```

Example:

```sshconfig
Host myvps
    HostName 203.0.113.10
    User user
    IdentityFile ~/.ssh/id_ed25519
```

Then:

```bash
ssh myvps
```

## 6. SCP

Upload:

```bash
scp file.txt myvps:/tmp/
```

Download:

```bash
scp myvps:/var/log/app.log .
```

## 7. rsync

Better for directories and updates:

```bash
rsync -avz ./site/ myvps:/var/www/site/
```

Delete destination files that no longer exist at the source:

```bash
rsync -avz --delete ./site/ myvps:/var/www/site/
```

Use --delete carefully.

## 8. SFTP

```bash
sftp myvps
```

Useful commands:

```text
ls
cd
lcd
get
put
exit
```

## 9. SSH agent

```bash
ssh-add ~/.ssh/id_ed25519
ssh-add -l
```

The agent keeps an unlocked key available during the session.

## 10. Local forwarding

```bash
ssh -L 5433:127.0.0.1:5432 myvps
```

Local port 5433 now tunnels to PostgreSQL on the server.

## 11. Remote forwarding

```bash
ssh -R 9000:127.0.0.1:3000 myvps
```

This can expose a local service on the remote side.

## 12. SOCKS proxy

```bash
ssh -D 1080 myvps
```

Creates a local SOCKS proxy.

## 13. ProxyJump

```sshconfig
Host internal
    HostName 10.0.0.20
    User user
    ProxyJump bastion
```

## 14. Remote command

```bash
ssh myvps 'systemctl status nginx'
```

## 15. SSHFS

If installed:

```bash
sshfs myvps:/srv/project ~/mnt/project
```

## 16. Troubleshooting

Verbose mode:

```bash
ssh -v myvps
ssh -vvv myvps
```

## 17. Known hosts

SSH stores host fingerprints in:

```text
~/.ssh/known_hosts
```

A changed fingerprint may indicate a legitimate reinstall or a MITM attack. Do not ignore the warning without checking.

## 18. Keepalive

```sshconfig
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

## 19. Security

- prefer keys over passwords,
- protect keys with passphrases,
- use limited permissions,
- do not copy private keys unnecessarily,
- do not use root as your everyday account.

## 20. What you should know

You should be able to connect with a key, configure ~/.ssh/config, use scp/rsync/sftp, create a local tunnel and diagnose a connection with ssh -v.
