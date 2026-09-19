# dns-domains-routing

## 1. Why this matters

If you publish a website, API or application on a VPS, you should understand the path from entering a domain such as example.com in a browser to receiving the server response. In practice this means understanding domains, DNS, IP addresses, routing, NAT and the basics of IPv4/IPv6.

## 2. Domain and DNS

A domain is a human-readable name:

```text
example.com
api.example.com
www.example.com
```

DNS translates a name into data needed by a client, most often an IP address.

Typical resolution path:

```text
browser
  ↓
DNS resolver
  ↓
root servers
  ↓
TLD servers (.com, .pl)
  ↓
authoritative DNS servers
  ↓
A / AAAA record
  ↓
server IP address
```

## 3. Important DNS records

### A

Points to an IPv4 address.

```text
example.com. 300 IN A 203.0.113.10
```

### AAAA

Points to an IPv6 address.

```text
example.com. 300 IN AAAA 2001:db8::10
```

### CNAME

Aliases one name to another.

```text
www.example.com. IN CNAME example.com.
```

Do not use CNAME as a replacement for every record type. A CNAME should not coexist with other records at the same name.

### MX

Mail servers for a domain:

```text
example.com. IN MX 10 mail.example.com.
```

A lower number means higher priority.

### TXT

Free-form text, often used for SPF, DKIM, DMARC, domain verification and SaaS services.

### NS

Defines the authoritative DNS servers for a domain.

### PTR

Reverse DNS: IP address → name. It is normally configured by the VPS or hosting provider, not the domain registrar.

## 4. TTL

TTL defines how long a resolver may cache an answer.

```text
300 seconds = 5 minutes
3600 seconds = 1 hour
86400 seconds = 1 day
```

Before a migration it is often useful to lower TTL in advance.

## 5. Domain delegation

At the registrar you configure nameservers, for example:

```text
ns1.provider.net
ns2.provider.net
```

After delegation, DNS records are managed at the DNS provider. Domain registration and DNS hosting do not need to be with the same company.

## 6. Subdomains

You may run many services:

```text
www.example.com
api.example.com
admin.example.com
status.example.com
cdn.example.com
```

Each can point to the same or a different server.

## 7. Tools

### dig

```bash
dig example.com
dig A example.com
dig AAAA example.com
dig MX example.com
dig TXT example.com
dig NS example.com
dig +short example.com
dig @1.1.1.1 example.com
dig +trace example.com
```

### host

```bash
host example.com
host -t MX example.com
```

### nslookup

Older, but still common:

```bash
nslookup example.com
```

## 8. IPv4 and IPv6

IPv4:

```text
192.0.2.10
```

IPv6:

```text
2001:db8::10
```

Private IPv4 ranges:

```text
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
```

Loopback:

```text
127.0.0.1
::1
```

## 9. CIDR

```text
192.168.1.0/24
```

/24 means 24 network bits. A typical /24 contains 256 addresses.

```text
/32 — one IPv4 address
/24 — 256 addresses
/16 — 65536 addresses
```

## 10. Routing

Routing decides where a packet should be sent.

```bash
ip route
```

Example:

```text
default via 192.168.1.1 dev eth0
192.168.1.0/24 dev eth0 proto kernel
```

The default route is used when no more specific route matches.

## 11. Gateway

The default gateway is the router that forwards traffic outside the local network.

```text
host:    192.168.1.20
gateway: 192.168.1.1
```

## 12. NAT

NAT allows multiple devices to share one public IPv4 address.

```text
PC 192.168.1.10 ┐
phone            ├─ NAT router ─ public IP
home server      ┘
```

## 13. Port forwarding

If a server is behind NAT, the router can forward a port:

```text
public_IP:443 → 192.168.1.50:443
```

A VPS usually does not need home-style NAT.

## 14. DNS propagation

DNS “propagation” is mostly cache expiration at resolvers. A change may be visible immediately in one place and only after the old TTL expires somewhere else.

## 15. DNSSEC

DNSSEC cryptographically signs DNS responses. It protects against forged DNS answers but does not encrypt DNS traffic.

## 16. DNS and email

SPF example:

```text
v=spf1 include:_spf.example.net -all
```

DKIM signs mail with a private key while the public key is published in DNS.

DMARC example:

```text
v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com
```

## 17. Common mistakes

- wrong A record,
- CNAME pointing to the wrong place,
- TTL too long during migration,
- stale AAAA record,
- incorrect Host handling in a reverse proxy,
- firewall blocking the port even though DNS is correct,
- DNS works but the application is not listening.

## 18. Domain deployment checklist

1. Buy the domain.
2. Configure NS.
3. Add A and optionally AAAA records.
4. Verify:

```bash
dig +short example.com
```

5. Check routing and firewall.
6. Configure nginx.
7. Enable HTTPS.
8. Verify:

```bash
curl -I https://example.com
```

## 19. Practical example

VPS address:

```text
203.0.113.20
```

Required names:

```text
example.com
api.example.com
```

DNS:

```text
example.com      A 203.0.113.20
api.example.com  A 203.0.113.20
```

Both names can reach the same nginx instance, which routes them to different applications based on the Host header.

## 20. What you should know

You should understand domain → DNS → IP → server, diagnose DNS with dig, understand A/AAAA/CNAME/MX/TXT/NS records, understand NAT/routing/port forwarding and prepare a domain for a VPS and reverse proxy.
