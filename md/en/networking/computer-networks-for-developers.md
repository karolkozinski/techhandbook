---
id: "doc-016"
title: "Computer Networks for Developers"
slug: "computer-networks-for-developers"
description: "This is not CCNA preparation. The goal is to understand the networking concepts a developer actually uses:"
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "network"
  - "tcp"
  - "udp"
  - "ip"
  - "vlan"
---

# Computer Networks for Developers

Networking is the layer through which almost every modern application communicates. This handbook focuses on what matters when working with servers, APIs, databases, containers and connection troubleshooting.

Related topics: [DNS, Domains and Internet Routing](techhandbook:doc-017), [SSH and Remote Administration](techhandbook:doc-018) and [HTTP, HTTPS and TLS](techhandbook:doc-044).

## 1. Goal

This is not CCNA preparation. The goal is to understand the networking concepts a developer actually uses:

- IP addresses,
- ports,
- TCP and UDP,
- DHCP,
- DNS,
- routing,
- NAT,
- VLANs,
- firewalls,
- basic troubleshooting.

## 2. Layers - practical view

A simplified model:

```text
Application      HTTP, DNS, SSH
Transport        TCP, UDP
Network          IP
Data link        Ethernet, Wi-Fi
Physical         cable, radio
```

## 3. MAC and IP

A MAC address identifies an interface on the local Layer 2 network.

IP is used for routed communication.

```bash
ip link
ip addr
```

## 4. TCP

TCP is connection-oriented, acknowledges data, preserves order and retransmits lost segments.

It is used by services such as HTTP/1.1, HTTP/2, SSH and PostgreSQL.

## 5. UDP

UDP does not establish a connection, does not guarantee delivery and has lower overhead.

It is used by services such as DNS, DHCP, QUIC/HTTP/3 and VoIP.

## 6. Ports

Range:

```text
0-65535
```

Common ports:

```text
22   SSH
53   DNS
80   HTTP
443  HTTPS
5432 PostgreSQL
6379 Redis
```

## 7. Listening ports

```bash
ss -lntup
```

TCP only:

```bash
ss -lnt
```

Find the process using port 8080:

```bash
sudo lsof -i :8080
```

## 8. DHCP

DHCP automatically assigns the IP address, mask/prefix, gateway and DNS servers.

## 9. ARP and Neighbor Discovery

IPv4 uses ARP:

```bash
ip neigh
```

It shows IP ↔ MAC mappings on the LAN. IPv6 uses Neighbor Discovery.

## 10. Routing

```bash
ip route
```

Example:

```text
default via 192.168.1.1 dev eth0
10.0.0.0/8 via 192.168.1.254 dev eth0
```

The most specific matching route wins.

## 11. NAT

A typical home router rewrites private source addresses to the public WAN address.

## 12. VLAN

A VLAN logically separates one Layer 2 infrastructure.

Example:

- VLAN 10 - home,
- VLAN 20 - IoT,
- VLAN 30 - guests,
- VLAN 40 - servers.

Communication between VLANs requires routing.

## 13. Firewall

A firewall can make decisions based on source address, destination address, port, protocol and connection state.

A useful server rule:

```text
open only what is actually required
```

## 14. ping

```bash
ping 1.1.1.1
ping example.com
```

If the IP works but the domain does not, suspect DNS.

No ping reply does not always mean failure because ICMP may be blocked.

## 15. traceroute

```bash
traceroute example.com
```

or:

```bash
tracepath example.com
```

These commands show routers along the path.

## 16. curl

Application-layer test:

```bash
curl -v https://example.com
```

## 17. nc / netcat

Check a port:

```bash
nc -vz example.com 443
```

Temporary listener:

```bash
nc -l 9000
```

## 18. tcpdump

Inspect traffic:

```bash
sudo tcpdump -i any
sudo tcpdump -i any port 443
sudo tcpdump -i any host 192.168.1.20
```

## 19. DNS configuration

```bash
resolvectl status
```

or:

```bash
cat /etc/resolv.conf
```

## 20. Public and private IP

Local addresses:

```bash
ip addr
```

A public address can be checked through an external HTTP service.

## 21. MTU

MTU is the maximum packet/frame size for an interface. Ethernet commonly uses 1500.

MTU problems often become visible when VPNs are involved.

## 22. Troubleshooting step by step

1. Does the interface have an IP address?

```bash
ip addr
```

2. Is there a route?

```bash
ip route
```

3. Can you reach the gateway?

```bash
ping GATEWAY
```

4. Does the Internet work by IP?

```bash
ping 1.1.1.1
```

5. Does DNS work?

```bash
dig example.com
```

6. Is the remote port reachable?

```bash
nc -vz example.com 443
```

7. Does the application protocol work?

```bash
curl -v https://example.com
```

8. Is the local service listening?

```bash
ss -lntup
```

## 23. What you should know

You should be able to distinguish DNS problems from general network problems, find the process bound to a port, inspect routes, understand TCP/UDP, understand NAT and VLANs, and test connectivity with ping, nc, curl and tcpdump.

## Official references

- RFC 9293 - Transmission Control Protocol: https://www.rfc-editor.org/rfc/rfc9293
- RFC 768 - User Datagram Protocol: https://www.rfc-editor.org/rfc/rfc768
- RFC 8200 - Internet Protocol Version 6 (IPv6): https://www.rfc-editor.org/rfc/rfc8200
