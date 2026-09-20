---
id: "doc-016"
title: "Sieci komputerowe dla developera"
slug: "sieci-komputerowe-dla-developera"
description: "Nie chodzi o przygotowanie do CCNA. Chodzi o sprawne rozumienie:"
lang: "pl"
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

# Sieci komputerowe dla developera

Sieci są warstwą, przez którą przechodzi praktycznie każda współczesna aplikacja. Ten materiał skupia się na tym, co trzeba rozumieć przy pracy z serwerem, API, bazą danych, kontenerami i diagnostyką połączeń.

Powiązane tematy: [DNS, domeny i routing internetowy](techhandbook:doc-017), [SSH i zdalna administracja](techhandbook:doc-018) oraz [HTTP, HTTPS i TLS](techhandbook:doc-044).

## 1. Cel

Nie chodzi o przygotowanie do CCNA. Chodzi o sprawne rozumienie:
- IP,
- portów,
- TCP/UDP,
- DHCP,
- DNS,
- routingu,
- NAT,
- VLAN,
- firewalli,
- podstaw diagnostyki.

## 2. Warstwy - praktycznie

Uproszczony model:

```text
Aplikacja       HTTP, DNS, SSH
Transport       TCP, UDP
Sieć            IP
Łącze danych    Ethernet, Wi‑Fi
Fizyczna        kabel, radio
```

## 3. MAC a IP

MAC identyfikuje interfejs w lokalnej sieci warstwy 2.

IP służy do komunikacji routowanej.

```bash
ip link
ip addr
```

## 4. TCP

TCP:
- połączeniowy,
- potwierdza dane,
- zachowuje kolejność,
- retransmituje zgubione segmenty.

Używa go m.in.:
- HTTP/1.1,
- HTTP/2,
- SSH,
- PostgreSQL.

## 5. UDP

UDP:
- bez ustanawiania połączenia,
- bez gwarancji dostarczenia,
- mniejszy narzut.

Używany m.in.:
- DNS,
- DHCP,
- QUIC/HTTP/3,
- VoIP.

## 6. Porty

Zakres:

```text
0-65535
```

Popularne:

```text
22   SSH
53   DNS
80   HTTP
443  HTTPS
5432 PostgreSQL
6379 Redis
```

## 7. Nasłuchujące porty

```bash
ss -lntup
```

Tylko TCP:

```bash
ss -lnt
```

Proces na porcie 8080:

```bash
sudo lsof -i :8080
```

## 8. DHCP

DHCP automatycznie przydziela:
- IP,
- maskę/prefix,
- gateway,
- DNS.

## 9. ARP i Neighbor Discovery

IPv4 używa ARP:

```bash
ip neigh
```

Pokazuje mapowanie IP ↔ MAC w LAN.

IPv6 używa Neighbor Discovery.

## 10. Routing

```bash
ip route
```

Przykład:

```text
default via 192.168.1.1 dev eth0
10.0.0.0/8 via 192.168.1.254 dev eth0
```

Najbardziej szczegółowa trasa wygrywa.

## 11. NAT

Typowy router domowy zmienia prywatne adresy źródłowe na publiczny adres WAN.

## 12. VLAN

VLAN logicznie rozdziela jedną infrastrukturę warstwy 2.

Przykład:
- VLAN 10 - dom,
- VLAN 20 - IoT,
- VLAN 30 - goście,
- VLAN 40 - serwery.

Komunikacja między VLAN-ami wymaga routingu.

## 13. Firewall

Firewall podejmuje decyzje na podstawie m.in.:
- adresu źródłowego,
- adresu docelowego,
- portu,
- protokołu,
- stanu połączenia.

Zasada serwera:

```text
otwieraj tylko to, co naprawdę potrzebne
```

## 14. ping

```bash
ping 1.1.1.1
ping example.com
```

Jeżeli IP działa, a domena nie, podejrzewaj DNS.

Brak odpowiedzi na ping nie zawsze oznacza awarię - ICMP może być blokowany.

## 15. traceroute

```bash
traceroute example.com
```

lub:

```bash
tracepath example.com
```

Pokazuje kolejne routery po drodze.

## 16. curl

Test warstwy aplikacyjnej:

```bash
curl -v https://example.com
```

## 17. nc / netcat

Sprawdzenie portu:

```bash
nc -vz example.com 443
```

Nasłuch testowy:

```bash
nc -l 9000
```

## 18. tcpdump

Podgląd ruchu:

```bash
sudo tcpdump -i any
```

Port 443:

```bash
sudo tcpdump -i any port 443
```

Host:

```bash
sudo tcpdump -i any host 192.168.1.20
```

## 19. DNS w systemie

```bash
resolvectl status
```

lub:

```bash
cat /etc/resolv.conf
```

## 20. Publiczne i prywatne IP

Sprawdzenie lokalnego:

```bash
ip addr
```

Publiczny można sprawdzić przez zewnętrzną usługę HTTP.

## 21. MTU

MTU określa maksymalny rozmiar pakietu/ramki dla interfejsu.

Typowo Ethernet:

```text
1500
```

Problemy z MTU często ujawniają się przy VPN.

## 22. Diagnostyka krok po kroku

Jeśli aplikacja nie działa:

1. Czy interfejs ma IP?

```bash
ip addr
```

2. Czy jest trasa?

```bash
ip route
```

3. Czy działa gateway?

```bash
ping GATEWAY
```

4. Czy działa internet po IP?

```bash
ping 1.1.1.1
```

5. Czy działa DNS?

```bash
dig example.com
```

6. Czy port jest osiągalny?

```bash
nc -vz example.com 443
```

7. Czy protokół aplikacyjny działa?

```bash
curl -v https://example.com
```

8. Czy lokalnie usługa słucha?

```bash
ss -lntup
```

## 23. Co trzeba umieć

- odróżnić problem DNS od problemu sieci,
- znaleźć proces na porcie,
- sprawdzić trasę,
- rozumieć TCP/UDP,
- rozumieć NAT i VLAN,
- testować połączenie przez `ping`, `nc`, `curl`, `tcpdump`.

## Oficjalne źródła

- RFC 9293 - Transmission Control Protocol: https://www.rfc-editor.org/rfc/rfc9293
- RFC 768 - User Datagram Protocol: https://www.rfc-editor.org/rfc/rfc768
- RFC 8200 - Internet Protocol Version 6 (IPv6): https://www.rfc-editor.org/rfc/rfc8200
