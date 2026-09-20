---
id: "doc-017"
title: "DNS, domeny i routing internetowy"
slug: "dns-domeny-i-routing-internetowy"
description: "Jeśli publikujesz stronę, API albo aplikację na VPS, musisz rozumieć drogę od wpisania example.com w przeglądarce do odpowiedzi serwera. W praktyce oznacza…"
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "dns"
  - "domain"
  - "domains"
  - "routing"
---

# DNS, domeny i routing internetowy

DNS łączy nazwy domen z usługami działającymi w sieci. W praktyce trzeba umieć oddzielić problem DNS od problemu routingu, firewalla, reverse proxy albo samej aplikacji.

Powiązane tematy: [Sieci komputerowe dla developera](techhandbook:doc-016), [nginx i reverse proxy](techhandbook:doc-045) oraz [HTTP, HTTPS i TLS](techhandbook:doc-044).

## 1. Po co to znać

Jeśli publikujesz stronę, API albo aplikację na VPS, musisz rozumieć drogę od wpisania `example.com` w przeglądarce do odpowiedzi serwera. W praktyce oznacza to znajomość domen, DNS, adresów IP, routingu, NAT i podstaw IPv4/IPv6.

To kompendium skupia się na praktyce developera i osoby wdrażającej rozwiązania cyfrowe.

## 2. Domena a DNS

Domena to czytelna nazwa, np.:

```text
example.com
api.example.com
www.example.com
```

DNS zamienia nazwę na dane potrzebne klientowi, najczęściej adres IP.

Typowa ścieżka:

```text
przeglądarka
   ↓
resolver DNS
   ↓
serwery root
   ↓
serwery TLD (.com, .pl)
   ↓
autorytatywny DNS domeny
   ↓
rekord A / AAAA
   ↓
adres IP serwera
```

## 3. Najważniejsze rekordy DNS

### A

Wskazuje adres IPv4.

```text
example.com.  300  IN  A  203.0.113.10
```

### AAAA

Wskazuje adres IPv6.

```text
example.com.  300  IN  AAAA  2001:db8::10
```

### CNAME

Alias jednej nazwy do innej.

```text
www.example.com. IN CNAME example.com.
```

Nie stosuj CNAME jako zamiennika wszystkiego. CNAME nie powinien współistnieć z innymi rekordami tej samej nazwy.

### MX

Serwery obsługujące pocztę.

```text
example.com. IN MX 10 mail.example.com.
```

Niższa liczba oznacza wyższy priorytet.

### TXT

Dowolny tekst. Używany m.in. przez:

- SPF,
- DKIM,
- DMARC,
- weryfikację domeny,
- różne usługi SaaS.

### NS

Informuje, które serwery DNS są autorytatywne dla domeny.

### PTR

Reverse DNS: adres IP → nazwa.

Najczęściej ustawia go operator VPS lub hostingu, nie rejestrator domeny.

## 4. TTL

TTL określa, jak długo resolver może przechowywać odpowiedź w cache.

Przykład:

```text
300 sekund = 5 minut
3600 sekund = 1 godzina
86400 sekund = 1 dzień
```

Przed migracją warto wcześniej zmniejszyć TTL.

## 5. Delegacja domeny

Kupując domenę u rejestratora, ustawiasz serwery NS, np.:

```text
ns1.provider.net
ns2.provider.net
```

Od tej chwili rekordami zarządzasz u operatora DNS.

Domena i DNS nie muszą być w tej samej firmie.

## 6. Subdomeny

Możesz prowadzić wiele usług:

```text
www.example.com
api.example.com
admin.example.com
status.example.com
cdn.example.com
```

Każda może wskazywać na ten sam lub inny serwer.

## 7. Narzędzia

### dig

```bash
dig example.com
dig A example.com
dig AAAA example.com
dig MX example.com
dig TXT example.com
dig NS example.com
```

Krótka odpowiedź:

```bash
dig +short example.com
```

Sprawdzenie konkretnego serwera DNS:

```bash
dig @1.1.1.1 example.com
```

Śledzenie delegacji:

```bash
dig +trace example.com
```

### host

```bash
host example.com
host -t MX example.com
```

### nslookup

Starsze, ale nadal popularne:

```bash
nslookup example.com
```

## 8. IPv4 i IPv6

IPv4:

```text
192.0.2.10
```

IPv6:

```text
2001:db8::10
```

Adresy prywatne IPv4:

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

Przykład:

```text
192.168.1.0/24
```

`/24` oznacza 24 bity części sieciowej.

Typowa sieć `/24` ma 256 adresów.

Przykłady:

```text
/32 - pojedynczy adres IPv4
/24 - 256 adresów
/16 - 65536 adresów
```

## 10. Routing

Routing określa, którędy ma zostać wysłany pakiet.

Linux:

```bash
ip route
```

Typowy wynik:

```text
default via 192.168.1.1 dev eth0
192.168.1.0/24 dev eth0 proto kernel
```

`default` to trasa używana, gdy nie ma bardziej szczegółowej.

## 11. Gateway

Brama domyślna to router, który przekazuje ruch poza lokalną sieć.

Przykład:

```text
host:    192.168.1.20
gateway: 192.168.1.1
```

## 12. NAT

NAT pozwala wielu urządzeniom korzystać z jednego publicznego IPv4.

Typowy dom:

```text
PC 192.168.1.10 ┐
telefon          ├─ router NAT ─ publiczny IP
serwer domowy    ┘
```

## 13. Port forwarding

Jeżeli serwer stoi za NAT-em, router może przekierować port:

```text
publiczne_IP:443 → 192.168.1.50:443
```

Na VPS zwykle nie potrzebujesz domowego NAT-u.

## 14. Propagacja DNS

„Propagacja” to w praktyce wygasanie cache u resolverów.

Zmiana może być widoczna:
- natychmiast u jednego resolvera,
- po kilku minutach u drugiego,
- dopiero po wygaśnięciu starego TTL gdzie indziej.

## 15. DNSSEC

DNSSEC podpisuje kryptograficznie odpowiedzi DNS.

Chroni przed podmianą odpowiedzi DNS, ale nie szyfruje DNS.

## 16. DNS i poczta

SPF:

```text
v=spf1 include:_spf.example.net -all
```

DKIM:
- wiadomość podpisywana kluczem prywatnym,
- klucz publiczny publikowany w DNS.

DMARC:

```text
v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com
```

## 17. Typowe błędy

- zły rekord A,
- CNAME wskazujący w złe miejsce,
- zbyt długi TTL podczas migracji,
- stary rekord AAAA,
- brak odpowiedniego `Host` w reverse proxy,
- domena wskazuje na właściwy serwer, ale firewall blokuje port,
- DNS działa, lecz aplikacja nie nasłuchuje.

## 18. Checklista uruchomienia domeny

1. Kup domenę.
2. Ustaw NS.
3. Dodaj rekord A i opcjonalnie AAAA.
4. Sprawdź:

```bash
dig +short example.com
```

5. Sprawdź routing i firewall.
6. Skonfiguruj nginx.
7. Wystaw HTTPS.
8. Zweryfikuj:

```bash
curl -I https://example.com
```

## 19. Przykład praktyczny

Masz VPS:

```text
203.0.113.20
```

Chcesz:

```text
example.com
api.example.com
```

DNS:

```text
example.com      A 203.0.113.20
api.example.com  A 203.0.113.20
```

Obie domeny mogą trafiać do tego samego nginx, który na podstawie nagłówka `Host` kieruje ruch do różnych aplikacji.

## 20. Co trzeba umieć

Po opanowaniu tego kompendium powinieneś:
- rozumieć drogę domena → DNS → IP → serwer,
- umieć diagnozować DNS przez `dig`,
- rozumieć rekordy A, AAAA, CNAME, MX, TXT i NS,
- rozumieć NAT, routing i port forwarding,
- umieć przygotować domenę pod VPS i reverse proxy.

## Oficjalne źródła

- RFC 1034 - Domain Names: Concepts and Facilities: https://www.rfc-editor.org/rfc/rfc1034
- RFC 1035 - Domain Names: Implementation and Specification: https://www.rfc-editor.org/rfc/rfc1035
- RFC 7766 - DNS Transport over TCP: https://www.rfc-editor.org/rfc/rfc7766
