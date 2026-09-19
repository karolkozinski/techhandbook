# freebsd-server

> Praktyczny przewodnik po administracji FreeBSD na serwerze.  
> Nacisk: usługi, `rc.conf`, `service`, pakiety, aktualizacje, sieć, SSH, ZFS, jails, firewall, logi, cron, diagnostyka i utrzymanie.  
> Shell jest opisany tylko pobieżnie — tyle, ile potrzeba do administracji.

**Stan wiedzy:** wrzesień 2026  
**Punkt odniesienia:** FreeBSD 15.1-RELEASE  
**Dla kogo:** osoba, która zna ogólne podstawy systemów uniksowych i chce rozumieć oraz sprawnie obsługiwać FreeBSD jako serwer.

---

# 1. Jak myśleć o FreeBSD

FreeBSD nie jest dystrybucją Linuksa. To kompletny system operacyjny rozwijany jako spójna całość:

- kernel,
- podstawowe narzędzia systemowe,
- biblioteki,
- system startowy,
- narzędzia sieciowe,
- dokumentacja,
- mechanizmy aktualizacji.

To, co w Linuksie często pochodzi z wielu osobnych projektów, we FreeBSD w dużej części należy do jednego **base system**.

Oprogramowanie dodatkowe — nginx, PostgreSQL, Git, Vim, Samba itd. — pochodzi natomiast z systemu **Packages/Ports**.

To rozróżnienie jest fundamentalne:

```text
FreeBSD base system
├── kernel
├── /bin
├── /sbin
├── /usr/bin
├── /usr/sbin
├── /etc
└── podstawowe biblioteki

Pakiety dodatkowe
├── /usr/local/bin
├── /usr/local/sbin
├── /usr/local/etc
├── /usr/local/lib
└── /usr/local/etc/rc.d
```

Dlatego typowa konfiguracja wygląda tak:

```text
/etc/ssh/sshd_config
```

dla OpenSSH należącego do systemu bazowego, ale:

```text
/usr/local/etc/nginx/nginx.conf
```

dla nginx zainstalowanego przez `pkg`.

Ta reguła bardzo często pomaga odnaleźć konfigurację usługi.

---

# 2. Wersja systemu

Podstawowe polecenia:

```sh
freebsd-version
```

Pokazuje wersję zainstalowanego userlandu.

```sh
uname -r
```

Pokazuje wersję uruchomionego kernela.

```sh
uname -a
```

Pokazuje więcej informacji o systemie.

Po aktualizacji może się zdarzyć, że:

```sh
freebsd-version
```

i:

```sh
uname -r
```

pokazują różne wersje.

Najczęściej oznacza to, że kernel został zaktualizowany, ale system nie został jeszcze zrestartowany.

---

# 3. Najważniejsze katalogi

## `/etc`

Konfiguracja systemu bazowego.

Najważniejsze pliki:

```text
/etc/rc.conf
/etc/sysctl.conf
/etc/fstab
/etc/hosts
/etc/resolv.conf
/etc/ssh/
/etc/pf.conf
/etc/jail.conf
/etc/jail.conf.d/
```

---

## `/usr/local`

Tutaj trafia oprogramowanie instalowane z Packages/Ports.

Najważniejsze miejsca:

```text
/usr/local/bin
/usr/local/sbin
/usr/local/etc
/usr/local/etc/rc.d
/usr/local/lib
```

Przykładowo:

```text
/usr/local/etc/nginx/nginx.conf
/usr/local/etc/postgresql.conf
```

---

## `/var`

Dane zmienne:

```text
/var/log
/var/db
/var/run
/var/tmp
```

W szczególności:

```text
/var/log/messages
```

jest jednym z najważniejszych logów systemowych.

---

## `/home` i `/usr/home`

W FreeBSD katalogi domowe użytkowników często znajdują się fizycznie pod:

```text
/usr/home
```

a `/home` może być dowiązaniem.

---

## `/boot`

Kernel, moduły i konfiguracja startu systemu.

Ważne:

```text
/boot/loader.conf
```

Nie należy tam wpisywać rzeczy, które mogą być ustawione przez `sysctl`, jeśli nie ma ku temu powodu.

---

# 4. Minimalny shell administratora

Nie jest to kurs shella. Poniższe polecenia wystarczą jednak do większości prostych zadań administracyjnych.

## Poruszanie się

```sh
pwd
ls
ls -la
cd /katalog
cd ..
cd ~
```

---

## Pliki

```sh
cp plik kopia
mv stary nowy
rm plik
mkdir katalog
rmdir katalog
```

Rekurencyjne usuwanie:

```sh
rm -r katalog
```

Używać ostrożnie.

---

## Podgląd plików

```sh
cat plik
less plik
tail plik
head plik
```

Śledzenie logu na żywo:

```sh
tail -f /var/log/messages
```

---

## Wyszukiwanie

```sh
grep tekst plik
grep -R tekst /usr/local/etc
find /usr/local -name "*.conf"
```

---

## Procesy

```sh
ps aux
top
pgrep nginx
pkill proces
```

---

## Pomoc

Najważniejsze narzędzie FreeBSD:

```sh
man polecenie
```

Przykłady:

```sh
man service
man rc.conf
man sysrc
man pf.conf
man zfs
man jail
```

Sekcję manuala można wskazać jawnie:

```sh
man 5 rc.conf
man 8 service
```

---

# 5. Root i uprawnienia

Konto `root` ma pełne prawa do systemu.

Przejście na roota:

```sh
su -
```

Zwykły użytkownik musi zwykle należeć do grupy:

```text
wheel
```

Sprawdzenie grup:

```sh
id
```

Dodanie użytkownika do grupy:

```sh
pw groupmod wheel -m user
```

Można również zainstalować `sudo`:

```sh
pkg install sudo
```

i skonfigurować:

```text
/usr/local/etc/sudoers
```

Bezpieczniej edytować przez:

```sh
visudo
```

---

# 6. Użytkownicy i grupy

## Lista użytkowników

```sh
cat /etc/passwd
```

---

## Dodanie użytkownika

Interaktywnie:

```sh
adduser
```

---

## Usunięcie użytkownika

```sh
rmuser nazwa
```

---

## Narzędzie `pw`

Bardziej skryptowalne:

```sh
pw useradd nazwa
pw usermod nazwa
pw userdel nazwa
pw groupshow wheel
```

Przykład:

```sh
pw useradd webapp -m -s /bin/sh
```

---

# 7. Pakiety — `pkg`

`pkg` jest podstawowym narzędziem do instalacji oprogramowania.

Jeśli nie jest jeszcze zainstalowane, pierwsze uruchomienie:

```sh
pkg
```

zaproponuje bootstrap.

---

## Aktualizacja katalogu pakietów

```sh
pkg update
```

---

## Aktualizacja wszystkich pakietów

```sh
pkg upgrade
```

Typowy zestaw:

```sh
pkg update
pkg upgrade
```

---

## Instalacja

```sh
pkg install nginx
```

Kilka pakietów:

```sh
pkg install nginx git vim
```

---

## Usuwanie

```sh
pkg delete nginx
```

---

## Lista zainstalowanych pakietów

```sh
pkg info
```

Informacje o konkretnym pakiecie:

```sh
pkg info nginx
```

---

## Wyszukiwanie

```sh
pkg search nginx
```

Dokładniejsze:

```sh
pkg search -f nginx
```

---

## Zależności, które nie są już potrzebne

```sh
pkg autoremove
```

Najpierw zawsze przeczytaj, co `pkg` chce usunąć.

---

## Audyt podatności

Bardzo przydatne na serwerze:

```sh
pkg audit -F
```

`-F` pobiera świeżą bazę podatności.

---

## Informacja, skąd pochodzi plik

```sh
pkg which /usr/local/bin/nginx
```

---

## Pliki należące do pakietu

```sh
pkg info -l nginx
```

---

# 8. Packages a Ports

FreeBSD posiada dwa sposoby instalowania oprogramowania:

1. **Packages** — gotowe binaria,
2. **Ports** — kompilacja ze źródeł.

Na zwykłym serwerze najczęściej używaj:

```sh
pkg
```

Ports mają sens, gdy potrzebujesz:

- nietypowych opcji kompilacji,
- własnych patchy,
- wersji/konfiguracji niedostępnej jako standardowy pakiet.

Drzewo Ports zwykle znajduje się w:

```text
/usr/ports
```

Na typowym serwerze nie ma powodu komplikować życia bez potrzeby.

---

# 9. Najważniejsza rzecz: system usług FreeBSD

FreeBSD nie używa systemd.

Usługi obsługuje klasyczny mechanizm:

```text
rc(8)
rc.conf
rc.d
service
sysrc
```

To trzeba znać dobrze.

---

# 10. Gdzie znajdują się skrypty usług

Usługi systemowe:

```text
/etc/rc.d
```

Usługi zainstalowane z pakietów:

```text
/usr/local/etc/rc.d
```

Przykład:

```text
/etc/rc.d/sshd
/usr/local/etc/rc.d/nginx
```

Nie trzeba uruchamiać tych skryptów bezpośrednio.

Używaj:

```sh
service
```

---

# 11. Lista usług

Wszystkie skrypty usług:

```sh
service -l
```

Usługi włączone:

```sh
service -e
```

Usługi uporządkowane zgodnie z kolejnością startu:

```sh
service -r
```

Bardziej szczegółowo:

```sh
service -rv
```

---

# 12. Uruchamianie usług

Schemat:

```sh
service NAZWA AKCJA
```

Przykład:

```sh
service sshd status
```

```sh
service sshd start
```

```sh
service sshd stop
```

```sh
service sshd restart
```

```sh
service nginx restart
```

Najczęstsze akcje:

```text
start
stop
restart
reload
status
rcvar
```

Nie każda usługa obsługuje wszystkie.

---

# 13. Dlaczego `service nginx start` czasem nie działa

We FreeBSD zwykłe:

```sh
service nginx start
```

zakłada, że usługa jest **włączona w konfiguracji startowej**.

Jeżeli nie jest, zobaczysz komunikat sugerujący ustawienie odpowiedniej zmiennej.

Dla nginx:

```text
nginx_enable="YES"
```

---

# 14. `rc.conf` — centrum konfiguracji systemu

Najważniejszy plik:

```text
/etc/rc.conf
```

Przykład:

```sh
hostname="server.example"
sshd_enable="YES"
nginx_enable="YES"
pf_enable="YES"
```

Nie edytuj:

```text
/etc/defaults/rc.conf
```

To plik z wartościami domyślnymi systemu.

Własne ustawienia umieszczaj w:

```text
/etc/rc.conf
```

---

# 15. `sysrc` — najlepszy sposób zmiany `rc.conf`

Zamiast ręcznie dopisywać:

```text
nginx_enable="YES"
```

można zrobić:

```sh
sysrc nginx_enable="YES"
```

To bezpieczne i wygodne.

---

## Odczyt wartości

```sh
sysrc nginx_enable
```

---

## Sama wartość

```sh
sysrc -n nginx_enable
```

---

## Włączenie usługi

```sh
sysrc nginx_enable="YES"
```

---

## Wyłączenie

```sh
sysrc nginx_enable="NO"
```

---

## Usunięcie zmiennej

```sh
sysrc -x nginx_enable
```

---

# 16. Typowy cykl instalacji nowej usługi

Przykład nginx.

## 1. Instalacja

```sh
pkg install nginx
```

## 2. Sprawdzenie plików

```sh
pkg info -l nginx
```

## 3. Sprawdzenie skryptu usługi

```sh
service nginx rcvar
```

Najczęściej zobaczysz informację w rodzaju:

```text
nginx_enable="NO"
```

## 4. Włączenie autostartu

```sh
sysrc nginx_enable="YES"
```

## 5. Uruchomienie

```sh
service nginx start
```

## 6. Status

```sh
service nginx status
```

## 7. Sprawdzenie portu

```sh
sockstat -4 -6 -l
```

## 8. Logi

Zależnie od aplikacji:

```text
/var/log
/usr/local/var/log
```

lub ścieżka skonfigurowana przez usługę.

---

# 17. `onestart`, `onestop` i `onerestart`

Czasem chcesz uruchomić usługę bez włączania jej na stałe.

Wtedy:

```sh
service nginx onestart
```

Zatrzymanie:

```sh
service nginx onestop
```

Restart:

```sh
service nginx onerestart
```

To omija wymóg:

```text
nginx_enable="YES"
```

Bardzo przydatne podczas testów.

---

# 18. `force*`

Istnieją również warianty typu:

```sh
service nginx forcestart
```

```sh
service nginx forcestop
```

Nie należy ich używać jako standardowego sposobu administracji.

`force*` ignoruje część normalnych zabezpieczeń mechanizmu rc.

Najpierw rozwiąż przyczynę problemu.

---

# 19. Restart wszystkich lokalnych usług

Można wykonać:

```sh
service -R
```

Polecenie restartuje włączone lokalne usługi.

Nie jest to coś, co należy robić bezmyślnie na produkcji.

---

# 20. Autostart usług — zasada

Jeśli usługa ma wystartować po reboot:

```sh
sysrc nazwa_enable="YES"
```

Przykłady:

```sh
sysrc sshd_enable="YES"
sysrc nginx_enable="YES"
sysrc postgresql_enable="YES"
```

Następnie:

```sh
service nazwa start
```

---

# 21. Konfiguracja usług

Dobra reguła:

### usługa systemowa

szukaj w:

```text
/etc
```

### usługa z pakietu

szukaj w:

```text
/usr/local/etc
```

Przykłady:

```text
/etc/ssh/sshd_config
/usr/local/etc/nginx/nginx.conf
```

Pakiety często instalują:

```text
plik.conf.sample
```

który trzeba skopiować:

```sh
cp plik.conf.sample plik.conf
```

---

# 22. Sprawdzenie konfiguracji przed restartem

To bardzo ważny nawyk.

Przykłady:

```sh
nginx -t
```

```sh
sshd -t
```

```sh
pfctl -vnf /etc/pf.conf
```

Najpierw test konfiguracji, dopiero potem:

```sh
service nginx reload
```

lub:

```sh
service nginx restart
```

Na zdalnym serwerze może to uratować dostęp.

---

# 23. Własna aplikacja jako usługa

Załóżmy, że masz program:

```text
/usr/local/bin/myapp
```

który działa ciągle w tle.

Najlepiej utworzyć dla niego skrypt:

```text
/usr/local/etc/rc.d/myapp
```

Minimalny przykład:

```sh
#!/bin/sh

# PROVIDE: myapp
# REQUIRE: NETWORKING
# KEYWORD: shutdown

. /etc/rc.subr

name="myapp"
rcvar="${name}_enable"

pidfile="/var/run/${name}.pid"

command="/usr/sbin/daemon"
command_args="-f -S -p ${pidfile} -u myapp /usr/local/bin/myapp"

load_rc_config "$name"

: ${myapp_enable:="NO"}

run_rc_command "$1"
```

Nadaj wykonywalność:

```sh
chmod +x /usr/local/etc/rc.d/myapp
```

Włącz:

```sh
sysrc myapp_enable="YES"
```

Uruchom:

```sh
service myapp start
```

Sprawdź:

```sh
service myapp status
```

W tym przykładzie `daemon(8)`:

- odłącza aplikację od terminala,
- uruchamia ją jako użytkownik `myapp`,
- zapisuje PID,
- może kierować wyjście do sysloga.

Dla własnych aplikacji Go jest to bardzo wygodny sposób integracji z FreeBSD.

---

# 24. `daemon(8)`

`daemon` uruchamia zwykły program jak proces serwerowy.

Przykład:

```sh
daemon -u webapp /usr/local/bin/webapp
```

Można włączyć logowanie do sysloga:

```sh
daemon -S -u webapp /usr/local/bin/webapp
```

PID:

```sh
daemon -p /var/run/webapp.pid /usr/local/bin/webapp
```

Automatyczny restart po zakończeniu:

```sh
daemon -r /usr/local/bin/webapp
```

To bardzo przydatne dla małych własnych usług.

---

# 25. Aktualizacje systemu

FreeBSD należy aktualizować w dwóch warstwach:

1. **base system**,
2. **pakiety**.

To nie jest to samo.

---

# 26. Aktualizacja pakietów

Standardowo:

```sh
pkg update
pkg upgrade
```

Potem:

```sh
pkg audit -F
```

---

# 27. Aktualizacja systemu bazowego

Tradycyjna instalacja FreeBSD używa:

```sh
freebsd-update
```

Aktualizacje bezpieczeństwa:

```sh
freebsd-update fetch
freebsd-update install
```

Po aktualizacji kernela:

```sh
shutdown -r now
```

Po restarcie sprawdź:

```sh
freebsd-version
uname -r
```

---

# 28. Uwaga: pkgbase

FreeBSD 15 rozwija również mechanizm zarządzania systemem bazowym przez pakiety — **pkgbase**.

Nie mieszaj metod aktualizacji bez zrozumienia, w jaki sposób system został zainstalowany.

Typowa instalacja klasyczna:

```text
freebsd-update → system bazowy
pkg            → aplikacje
```

Instalacja używająca pkgbase może zarządzać systemem bazowym przez repozytorium pakietów.

Jeśli administrujesz istniejącym serwerem, najpierw ustal sposób instalacji i aktualizacji, zamiast automatycznie przełączać go na inną metodę.

---

# 29. Boot Environments — jedna z najlepszych rzeczy przy ZFS

Jeśli root znajduje się na ZFS, możesz korzystać z boot environments.

Polecenie:

```sh
bectl
```

Lista:

```sh
bectl list
```

Przed dużą aktualizacją:

```sh
bectl create before-upgrade
```

Jeżeli coś pójdzie źle, można uruchomić wcześniejsze środowisko.

Aktywacja:

```sh
bectl activate before-upgrade
```

To bardzo dobry nawyk przed:

- dużym upgradem,
- zmianą kernela,
- ryzykowną modyfikacją systemu.

---

# 30. Sieć — najważniejsze narzędzia

Lista interfejsów:

```sh
ifconfig
```

Konkretny:

```sh
ifconfig igc0
```

Routing:

```sh
netstat -rn
```

Trasa domyślna:

```sh
route -n get default
```

Otwarte porty:

```sh
sockstat -4 -6 -l
```

To polecenie jest jednym z najważniejszych podczas administracji serwerem.

Przykład:

```text
USER     COMMAND    PID   FD PROTO LOCAL ADDRESS
root     sshd       ...      tcp4 *:22
www      nginx      ...      tcp4 *:80
```

---

# 31. Konfiguracja interfejsu w `rc.conf`

DHCP:

```sh
sysrc ifconfig_igc0="DHCP"
```

Statyczny adres:

```sh
sysrc ifconfig_igc0="inet 192.168.10.20 netmask 255.255.255.0"
```

Brama:

```sh
sysrc defaultrouter="192.168.10.1"
```

Hostname:

```sh
sysrc hostname="server.example"
```

Po zmianach sieci można restartować odpowiednie elementy, ale na zdalnym serwerze rób to bardzo ostrożnie.

Pełny restart sieci może odciąć SSH.

Często bezpieczniejszy jest reboot, jeśli masz pewny dostęp konsolowy/IPMI.

---

# 32. DNS

Konfiguracja resolvera:

```text
/etc/resolv.conf
```

Przykład:

```text
nameserver 1.1.1.1
nameserver 9.9.9.9
```

Test DNS:

```sh
host freebsd.org
```

Jeżeli `host` nie jest dostępny, przydatne mogą być pakiety zawierające `dig`.

---

# 33. `/etc/hosts`

Lokalne mapowanie nazw:

```text
127.0.0.1 localhost
192.168.10.20 server
192.168.10.30 nas
```

Sprawdzenie:

```sh
getent hosts server
```

---

# 34. SSH

FreeBSD posiada OpenSSH w systemie bazowym.

Usługa:

```sh
service sshd status
```

Włączenie:

```sh
sysrc sshd_enable="YES"
```

Uruchomienie:

```sh
service sshd start
```

Konfiguracja:

```text
/etc/ssh/sshd_config
```

---

# 35. SSH — klucze

Na komputerze klienta:

```sh
ssh-keygen
```

Klucz publiczny trafia na serwer do:

```text
~/.ssh/authorized_keys
```

Uprawnienia:

```sh
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

---

# 36. SSH — podstawowe utwardzenie

Rozważ:

```text
PermitRootLogin no
```

Po upewnieniu się, że logowanie kluczem działa:

```text
PasswordAuthentication no
```

Przed restartem SSH:

```sh
sshd -t
```

Dopiero potem:

```sh
service sshd reload
```

**Nie wyłączaj logowania hasłem zdalnie, zanim nie sprawdzisz w osobnej sesji, że logowanie kluczem rzeczywiście działa.**

---

# 37. Firewall

FreeBSD zawiera kilka firewalli:

- PF,
- IPFW,
- IPFILTER.

Na nowym serwerze sensownym wyborem jest najczęściej PF albo IPFW.

W tym kompendium używamy PF.

---

# 38. PF — włączenie

Konfiguracja:

```text
/etc/pf.conf
```

Test konfiguracji:

```sh
pfctl -vnf /etc/pf.conf
```

Włączenie przy starcie:

```sh
sysrc pf_enable="YES"
```

Start:

```sh
service pf start
```

---

# 39. Minimalny PF dla serwera

Przykład:

```pf
ext_if="igc0"

set skip on lo0

block return all

pass out all keep state

pass in on $ext_if proto tcp to ($ext_if) port 22 keep state
```

To:

- blokuje przychodzący ruch domyślnie,
- pozwala na ruch wychodzący,
- pozwala na SSH.

Jeśli serwer ma nginx:

```pf
pass in on $ext_if proto tcp to ($ext_if) port { 80 443 } keep state
```

---

# 40. PF — test przed przeładowaniem

Zawsze:

```sh
pfctl -vnf /etc/pf.conf
```

Jeśli poprawne:

```sh
pfctl -f /etc/pf.conf
```

Podgląd reguł:

```sh
pfctl -sr
```

Stany:

```sh
pfctl -ss
```

Statystyki:

```sh
pfctl -si
```

Na zdalnym serwerze błędna reguła PF może odciąć SSH. Dobrze mieć konsolę awaryjną.

---

# 41. Procesy i zasoby

## `top`

```sh
top
```

Pokazuje:

- CPU,
- pamięć,
- load average,
- procesy.

---

## `ps`

```sh
ps aux
```

Wyszukiwanie:

```sh
ps aux | grep nginx
```

Lepiej:

```sh
pgrep -fl nginx
```

---

## Pamięć

```sh
sysctl hw.physmem
```

Informacje o VM:

```sh
vmstat
```

---

## CPU

```sh
sysctl hw.model
```

Liczba CPU:

```sh
sysctl hw.ncpu
```

---

# 42. Dyski

Lista urządzeń:

```sh
geom disk list
```

Prościej:

```sh
camcontrol devlist
```

Zajętość filesystemów:

```sh
df -h
```

---

# 43. ZFS — dlaczego warto

ZFS jest bardzo dobrym wyborem dla FreeBSD jako serwera.

Zapewnia:

- checksums,
- snapshoty,
- pule,
- mirrory,
- RAID-Z,
- kompresję,
- klony,
- send/receive,
- scrub,
- boot environments.

---

# 44. Podstawowe pojęcia ZFS

## Pool

Najwyższy poziom magazynu:

```text
zroot
tank
storage
```

Polecenie:

```sh
zpool
```

---

## Dataset

Logiczny filesystem wewnątrz puli:

```text
tank/media
tank/backups
tank/jails
```

Polecenie:

```sh
zfs
```

---

# 45. ZFS — najważniejsze polecenia

Lista pul:

```sh
zpool list
```

Stan:

```sh
zpool status
```

Bardzo ważne:

```sh
zpool status -x
```

Jeżeli wszystko jest zdrowe, ZFS poinformuje, że wszystkie pule są zdrowe.

---

## Datasety

```sh
zfs list
```

---

## Utworzenie

```sh
zfs create tank/data
```

---

## Kompresja

```sh
zfs set compression=lz4 tank/data
```

Sprawdzenie:

```sh
zfs get compression tank/data
```

---

# 46. ZFS snapshoty

Snapshot:

```sh
zfs snapshot tank/data@before-upgrade
```

Lista:

```sh
zfs list -t snapshot
```

Usunięcie:

```sh
zfs destroy tank/data@before-upgrade
```

Rollback:

```sh
zfs rollback tank/data@before-upgrade
```

**Rollback usuwa późniejsze zmiany. Zawsze upewnij się, co robisz.**

---

# 47. ZFS scrub

Scrub sprawdza integralność danych.

Uruchomienie:

```sh
zpool scrub tank
```

Status:

```sh
zpool status tank
```

Zatrzymanie:

```sh
zpool scrub -s tank
```

Na serwerze z ważnymi danymi okresowy scrub jest dobrą praktyką.

---

# 48. ZFS send / receive

Snapshot można wysłać do drugiej puli:

```sh
zfs send tank/data@snap | zfs receive backup/data
```

Przez SSH:

```sh
zfs send tank/data@snap | ssh backup-server zfs receive backup/data
```

To potężna baza do backupu ZFS.

---

# 49. ZFS to nie backup

Mirror ZFS:

```text
dysk A + dysk B
```

chroni przed awarią pojedynczego dysku.

Nie chroni przed:

- przypadkowym usunięciem,
- błędem administratora,
- ransomware,
- pożarem,
- kradzieżą,
- uszkodzeniem całej maszyny.

RAID ≠ backup.

---

# 50. SMART

Zainstaluj:

```sh
pkg install smartmontools
```

Sprawdzenie dysku:

```sh
smartctl -a /dev/ada0
```

Test krótki:

```sh
smartctl -t short /dev/ada0
```

Test długi:

```sh
smartctl -t long /dev/ada0
```

Potem ponownie:

```sh
smartctl -a /dev/ada0
```

Nazwy urządzeń zależą od kontrolera i typu dysku.

---

# 51. Montowanie filesystemów

Aktualnie zamontowane:

```sh
mount
```

Zajętość:

```sh
df -h
```

Konfiguracja montowania przy starcie:

```text
/etc/fstab
```

Przykład:

```text
/dev/ada1p1    /data    ufs    rw    2    2
```

Przed rebootem warto sprawdzić:

```sh
mount -a
```

Błąd w `fstab` może utrudnić boot.

---

# 52. Logi

Najważniejsze miejsce:

```text
/var/log
```

Typowe pliki:

```text
/var/log/messages
/var/log/security
/var/log/auth.log
/var/log/cron
```

Nie każda instalacja musi mieć dokładnie ten sam zestaw.

---

# 53. Logi na żywo

```sh
tail -f /var/log/messages
```

Kilka ostatnich linii:

```sh
tail -100 /var/log/messages
```

Wyszukanie błędów:

```sh
grep -i error /var/log/messages
```

---

# 54. Syslog

Systemowy daemon:

```sh
service syslogd status
```

Konfiguracja:

```text
/etc/syslog.conf
```

Po zmianie:

```sh
service syslogd reload
```

---

# 55. Rotacja logów

FreeBSD używa:

```text
newsyslog
```

Konfiguracja:

```text
/etc/newsyslog.conf
/usr/local/etc/newsyslog.conf.d/
```

Możesz wymusić rotację zgodnie z konfiguracją:

```sh
newsyslog
```

Aplikacje instalowane z pakietów mogą dostarczać własne wpisy konfiguracyjne.

---

# 56. Cron

Edycja crona bieżącego użytkownika:

```sh
crontab -e
```

Lista:

```sh
crontab -l
```

Format:

```text
minuta godzina dzień_miesiąca miesiąc dzień_tygodnia polecenie
```

Przykład codziennie o 03:30:

```cron
30 3 * * * /usr/local/bin/backup.sh
```

---

# 57. Cron roota

Jako root:

```sh
crontab -e
```

Zadania roota wykonują się z uprawnieniami administratora.

Nie wpisuj tam skryptów, których właścicielem może być zwykły użytkownik.

---

# 58. `periodic`

FreeBSD ma dodatkowy mechanizm:

```sh
periodic
```

Standardowe zadania:

```sh
periodic daily
periodic weekly
periodic monthly
```

Konfiguracja:

```text
/etc/periodic.conf
```

Jeżeli chcesz poznać dostępne opcje:

```sh
man periodic.conf
```

`periodic` wykonuje typowe prace konserwacyjne systemu i generuje raporty.

---

# 59. `sysctl`

`sysctl` pozwala odczytywać i zmieniać wiele parametrów kernela podczas pracy systemu.

Lista:

```sh
sysctl -a
```

Przykład:

```sh
sysctl hw.ncpu
```

```sh
sysctl hw.physmem
```

---

# 60. Tymczasowa zmiana `sysctl`

Przykład:

```sh
sysctl net.inet.ip.forwarding=1
```

Po restarcie zmiana znika.

---

# 61. Trwała zmiana `sysctl`

Plik:

```text
/etc/sysctl.conf
```

Przykład:

```text
net.inet.ip.forwarding=1
```

Nie kopiuj losowych „tuningów FreeBSD” z blogów.

Najpierw zrozum parametr i sprawdź:

```sh
man 4 ...
man 5 sysctl.conf
```

---

# 62. `/boot/loader.conf`

Używany głównie do ustawień wymaganych podczas startu kernela.

Przykład ładowania modułu:

```text
foo_load="YES"
```

Nie wrzucaj tam każdego tuningu znalezionego w Internecie.

Jeżeli parametr można ustawić po starcie przez `sysctl`, zazwyczaj powinien trafić do:

```text
/etc/sysctl.conf
```

---

# 63. Moduły kernela

Lista:

```sh
kldstat
```

Załadowanie:

```sh
kldload modul
```

Usunięcie:

```sh
kldunload modul
```

Informacje:

```sh
kldstat -v
```

---

# 64. Jails — podstawowa idea

Jail to natywna izolacja FreeBSD.

Można myśleć o niej jak o bardzo lekkim kontenerze systemowym.

Jail:

- korzysta z kernela hosta,
- ma własny filesystem/userland,
- może mieć własny adres IP,
- może mieć własne procesy i usługi,
- jest izolowany od hosta.

To jeden z najmocniejszych elementów FreeBSD jako serwera.

---

# 65. Do czego używać jails

Przykładowy serwer:

```text
host FreeBSD
├── jail: reverse-proxy
├── jail: aplikacja
├── jail: postgres
└── jail: monitoring
```

Korzyści:

- separacja usług,
- łatwiejsze backupy,
- prostsze migracje,
- ograniczenie skutków włamania,
- porządek w konfiguracji.

---

# 66. Konfiguracja jails

Główne miejsca:

```text
/etc/jail.conf
/etc/jail.conf.d/
```

Dobrą praktyką jest osobny plik:

```text
/etc/jail.conf.d/www.conf
```

---

# 67. Minimalna definicja jail

Zakładamy, że system jail znajduje się już w:

```text
/usr/local/jails/www
```

Przykład:

```conf
www {
    host.hostname = "www.local";
    path = "/usr/local/jails/www";

    exec.start = "/bin/sh /etc/rc";
    exec.stop = "/bin/sh /etc/rc.shutdown";

    mount.devfs;

    ip4.addr = "192.168.10.50";
    interface = "igc0";
}
```

Szczegóły sieci zależą od architektury serwera.

---

# 68. Autostart jails

```sh
sysrc jail_enable="YES"
```

Opcjonalnie równoległy start:

```sh
sysrc jail_parallel_start="YES"
```

---

# 69. Zarządzanie jail

Lista:

```sh
jls
```

Start wszystkich:

```sh
service jail start
```

Start konkretnego:

```sh
service jail start www
```

Stop:

```sh
service jail stop www
```

Restart:

```sh
service jail restart www
```

---

# 70. Wejście do jail

```sh
jexec www /bin/sh
```

lub:

```sh
jexec www /bin/csh
```

Wtedy pracujesz wewnątrz jail.

---

# 71. Usługi w jail

Można używać:

```sh
service -j www nginx status
```

Przykład:

```sh
service -j www nginx restart
```

To pozwala zarządzać usługami jail bez ręcznego `jexec`.

---

# 72. ZFS i jails

Bardzo wygodny układ:

```text
zroot/jails
zroot/jails/www
zroot/jails/db
```

Daje to możliwość:

- snapshotów pojedynczego jail,
- backupu `zfs send`,
- quota,
- klonowania.

Przykład:

```sh
zfs create zroot/jails
zfs create zroot/jails/www
```

---

# 73. Service Jails w FreeBSD 15

FreeBSD 15 wprowadził **service jails**.

Pozwalają uruchomić pojedynczą usługę w automatycznie tworzonej izolacji jail bez budowania kompletnego tradycyjnego jail.

Przykładowa idea:

```sh
service syslogd stop
sysrc syslogd_svcj="YES"
service syslogd start
```

To rozwiązanie bardziej zaawansowane.

Najpierw dobrze opanuj klasyczne:

```text
rc.conf
service
jails
```

dopiero potem eksperymentuj z service jails.

---

# 74. Backup

Backup powinien obejmować co najmniej:

```text
/etc
/usr/local/etc
/home lub /usr/home
ważne datasety
bazy danych
klucze SSH
konfigurację aplikacji
```

Nie wystarczy backup plików aplikacji.

---

# 75. Backup baz danych

Nie kopiuj na żywo plików bazy PostgreSQL/MySQL jako zwykłych plików i nie zakładaj, że backup będzie spójny.

Używaj narzędzi bazy:

PostgreSQL:

```sh
pg_dump
pg_dumpall
```

lub kontrolowanego snapshotu przy poprawnie przygotowanej procedurze.

---

# 76. ZFS jako mechanizm backupu

Dobry schemat:

```text
snapshot
↓
zfs send
↓
drugi serwer / drugi pool / backup off-site
```

Przykład:

```sh
zfs snapshot tank/data@2026-09-19
zfs send tank/data@2026-09-19 | ssh backup zfs receive backups/server/data
```

---

# 77. Aktualizacje — rozsądna procedura

Dla domowego lub małego serwera:

1. sprawdź backup,
2. sprawdź stan ZFS,
3. utwórz boot environment,
4. zaktualizuj base system,
5. zrestartuj jeśli trzeba,
6. zaktualizuj pakiety,
7. sprawdź usługi,
8. sprawdź logi,
9. sprawdź porty,
10. wykonaj podstawowe testy aplikacji.

Przykład:

```sh
zpool status -x
bectl create before-update

freebsd-update fetch
freebsd-update install

shutdown -r now
```

Po restarcie:

```sh
pkg update
pkg upgrade
pkg audit -F
```

Następnie:

```sh
service -e
sockstat -4 -6 -l
tail -100 /var/log/messages
```

---

# 78. Monitoring podstawowy

Bez instalowania ciężkich systemów monitoringu warto regularnie sprawdzać:

```sh
uptime
```

```sh
top
```

```sh
df -h
```

```sh
zpool status
```

```sh
sockstat -4 -6 -l
```

```sh
service -e
```

```sh
pkg audit -F
```

---

# 79. `uptime`

```sh
uptime
```

Pokazuje między innymi:

- jak długo działa system,
- ilu jest użytkowników,
- load average.

Load average nie oznacza bezpośrednio procentów CPU.

---

# 80. `dmesg`

Komunikaty kernela:

```sh
dmesg
```

Przydatne przy:

- problemach z dyskami,
- siecią,
- sterownikami,
- USB,
- błędach sprzętowych.

Ostatnie linie:

```sh
dmesg | tail
```

---

# 81. Porty i nasłuchujące procesy

Najważniejsze:

```sh
sockstat -4 -6 -l
```

Tylko TCP:

```sh
sockstat -4 -6 -l -P tcp
```

Jeżeli aplikacja „działa”, ale nie można się z nią połączyć:

1. `service app status`
2. `sockstat -4 -6 -l`
3. sprawdź firewall,
4. sprawdź bind address,
5. sprawdź logi.

---

# 82. Typowy problem: localhost zamiast wszystkich interfejsów

Aplikacja może nasłuchiwać tylko:

```text
127.0.0.1:8080
```

Wtedy z innego komputera nie będzie dostępna.

Sprawdź:

```sh
sockstat -4 -6 -l
```

Jeśli ma być dostępna z sieci, aplikacja musi nasłuchiwać na odpowiednim adresie, np.:

```text
0.0.0.0:8080
```

albo konkretnym IP serwera.

Nie wystawiaj jednak bazy danych czy paneli administracyjnych na wszystkie interfejsy bez potrzeby.

---

# 83. Reverse proxy

Typowy serwer może wyglądać tak:

```text
Internet
   ↓
PF
   ↓
nginx :80/:443
   ↓
aplikacja :8080
```

Aplikacja może wtedy nasłuchiwać wyłącznie na:

```text
127.0.0.1:8080
```

a nginx wystawia ją na zewnątrz.

To często lepsze niż bezpośrednie wystawianie aplikacji.

---

# 84. Nginx — szybki przykład

Instalacja:

```sh
pkg install nginx
```

Włączenie:

```sh
sysrc nginx_enable="YES"
```

Test konfiguracji:

```sh
nginx -t
```

Start:

```sh
service nginx start
```

Reload:

```sh
service nginx reload
```

Konfiguracja:

```text
/usr/local/etc/nginx/nginx.conf
```

---

# 85. Reverse proxy nginx

Przykładowa sekcja:

```nginx
server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Po zmianie:

```sh
nginx -t
service nginx reload
```

---

# 86. Bazy danych jako usługi

Pakiet zwykle instaluje:

- binaria,
- konfigurację,
- skrypt rc.d.

Schemat pozostaje ten sam:

```sh
pkg install pakiet
service nazwa rcvar
sysrc nazwa_enable="YES"
service nazwa start
service nazwa status
```

Część baz wymaga dodatkowej inicjalizacji katalogu danych przed pierwszym startem.

Zawsze czytaj komunikaty wyświetlane przez `pkg install`.

---

# 87. WireGuard

FreeBSD posiada obsługę WireGuarda.

W zależności od sposobu konfiguracji możesz używać narzędzi:

```sh
wg
wg-quick
```

oraz interfejsów FreeBSD.

Kluczowa zasada administracyjna:

po uruchomieniu sprawdź:

```sh
ifconfig
```

```sh
wg show
```

```sh
netstat -rn
```

Routing jest równie ważny jak sama konfiguracja tunelu.

---

# 88. System DNS, routing i firewall — diagnostyka warstwami

Jeżeli „sieć nie działa”, nie zgaduj.

Sprawdzaj po kolei:

## 1. Interfejs

```sh
ifconfig
```

## 2. Adres IP

Czy interfejs ma poprawny adres?

## 3. Routing

```sh
netstat -rn
```

## 4. Brama

```sh
route -n get default
```

## 5. IP bez DNS

```sh
ping 1.1.1.1
```

## 6. DNS

```sh
host freebsd.org
```

## 7. Firewall

```sh
pfctl -sr
```

## 8. Nasłuch

```sh
sockstat -4 -6 -l
```

Takie podejście jest znacznie skuteczniejsze niż losowe restartowanie usług.

---

# 89. Diagnostyka usługi — uniwersalny schemat

Załóżmy, że nginx nie działa.

## 1. Czy usługa istnieje?

```sh
service -l | grep nginx
```

## 2. Czy jest włączona?

```sh
service nginx rcvar
```

lub:

```sh
sysrc nginx_enable
```

## 3. Status

```sh
service nginx status
```

## 4. Test konfiguracji

```sh
nginx -t
```

## 5. Próba startu

```sh
service nginx start
```

## 6. Logi

```sh
tail -100 /var/log/messages
```

plus log aplikacji.

## 7. Proces

```sh
pgrep -fl nginx
```

## 8. Port

```sh
sockstat -4 -6 -l
```

## 9. Firewall

```sh
pfctl -sr
```

---

# 90. Co uruchamia się podczas bootowania

W uproszczeniu:

```text
loader
↓
kernel
↓
init
↓
rc
↓
rc.conf
↓
skrypty /etc/rc.d
↓
skrypty /usr/local/etc/rc.d
```

Kolejność usług ustalana jest przez zależności w skryptach rc.d.

Nie musisz ręcznie tworzyć kolejności typu:

```text
01-database
02-web
03-app
```

Mechanizm rc potrafi zależności uporządkować.

---

# 91. Zależności w skryptach rc.d

Własny skrypt może zawierać:

```sh
# PROVIDE: myapp
# REQUIRE: NETWORKING
# BEFORE: LOGIN
# KEYWORD: shutdown
```

Znaczenie:

- `PROVIDE` — co skrypt zapewnia,
- `REQUIRE` — czego wymaga wcześniej,
- `BEFORE` — przed czym ma wystartować,
- `KEYWORD` — dodatkowe właściwości.

Kolejność można zobaczyć:

```sh
service -r
```

---

# 92. Awaryjny start i problemy z bootem

Jeśli system nie bootuje poprawnie, FreeBSD pozwala wejść w tryb single-user.

Po uruchomieniu mogą być potrzebne:

```sh
fsck
```

dla UFS lub diagnostyka ZFS.

Root filesystem może być tylko do odczytu.

Remount:

```sh
mount -u /
mount -a
```

Nie wykonuj `fsck` na zamontowanym do zapisu filesystemie.

---

# 93. Reboot i shutdown

Restart:

```sh
shutdown -r now
```

Wyłączenie:

```sh
shutdown -p now
```

Można też:

```sh
reboot
```

ale `shutdown` daje czytelniejszą kontrolę.

---

# 94. Sprawdzanie startu po reboot

Po restarcie:

```sh
uptime
```

```sh
service -e
```

```sh
sockstat -4 -6 -l
```

```sh
zpool status -x
```

```sh
tail -100 /var/log/messages
```

To szybki sanity check.

---

# 95. Bezpieczeństwo — minimum dla serwera

Przynajmniej:

1. regularne aktualizacje,
2. `pkg audit -F`,
3. SSH na kluczach,
4. root bez logowania po SSH,
5. firewall,
6. nie wystawiać niepotrzebnych usług,
7. osobni użytkownicy dla aplikacji,
8. backup poza maszyną,
9. regularna kontrola logów,
10. sprawdzanie otwartych portów.

---

# 96. Najważniejsza reguła bezpieczeństwa usług

Nie uruchamiaj aplikacji jako `root`, jeżeli nie musi działać jako root.

Przykład użytkownika:

```sh
pw useradd webapp -d /nonexistent -s /usr/sbin/nologin
```

Następnie aplikację uruchamiaj przez:

```sh
daemon -u webapp ...
```

Jeżeli proces zostanie przejęty, atakujący nie uzyskuje automatycznie praw roota.

---

# 97. Użytkownik bez logowania

Dla usług dobry shell to:

```text
/usr/sbin/nologin
```

Sprawdzenie:

```sh
grep nologin /etc/shells
```

Konta aplikacyjne nie potrzebują interaktywnego logowania.

---

# 98. Uprawnienia plików

Zmiana właściciela:

```sh
chown user:group plik
```

Rekurencyjnie:

```sh
chown -R webapp:webapp /usr/local/webapp
```

Zmiana trybu:

```sh
chmod 640 config.conf
chmod 750 katalog
```

Nie rozwiązuj problemów przez:

```sh
chmod -R 777
```

To niemal zawsze zły pomysł.

---

# 99. Proces instalacji nowego serwera

Praktyczna kolejność:

## 1. Instalacja FreeBSD

Preferuj:

- ZFS jako root,
- rozsądny hostname,
- poprawną sieć,
- konto administratora.

## 2. Aktualizacja

```sh
freebsd-update fetch
freebsd-update install
pkg update
pkg upgrade
```

## 3. SSH

- klucze,
- test,
- ograniczenie logowania.

## 4. Firewall

- minimalny ruleset,
- test składni,
- dopiero potem aktywacja.

## 5. ZFS

- datasety,
- snapshoty,
- plan scrub,
- backup.

## 6. Usługi

Każda według schematu:

```text
pkg install
→ konfiguracja
→ test konfiguracji
→ sysrc *_enable=YES
→ service start
→ status
→ port
→ log
```

---

# 100. Serwer aplikacji — przykładowa architektura

Prosty i czytelny układ:

```text
FreeBSD host
│
├── PF
│
├── nginx
│   ├── :80
│   └── :443
│
├── aplikacja Go
│   └── 127.0.0.1:8080
│
├── PostgreSQL
│   └── 127.0.0.1:5432
│
└── ZFS
    ├── zroot/app
    ├── zroot/db
    └── zroot/backups
```

Można to później rozdzielić na jails:

```text
FreeBSD host
│
├── jail nginx
├── jail app
└── jail postgres
```

Nie trzeba zaczynać od najbardziej złożonej architektury.

---

# 101. Co warto instalować na nowym serwerze

Przykładowy zestaw:

```sh
pkg install vim git curl rsync smartmontools
```

Opcjonalnie:

```sh
pkg install sudo tmux htop
```

Nie instaluj narzędzi tylko dlatego, że „wszyscy je mają”.

FreeBSD base system zawiera bardzo dużo użytecznych narzędzi.

---

# 102. Dokumentacja systemowa

Najważniejszą dokumentacją FreeBSD są manuale.

Przykład:

```sh
man service
```

Jeśli chcesz wiedzieć, jak działa konfiguracja:

```sh
man rc.conf
```

Jeśli nie pamiętasz nazwy polecenia:

```sh
apropos service
```

lub:

```sh
man -k jail
```

---

# 103. Jak czytać nazwy manuali

W dokumentacji zobaczysz zapis:

```text
service(8)
rc.conf(5)
zfs(8)
```

Liczba oznacza sekcję manuala.

Typowo:

```text
1 — polecenia użytkownika
2 — syscall
3 — biblioteki
4 — sterowniki/kernel
5 — formaty plików konfiguracyjnych
8 — administracja systemem
```

Przykład:

```sh
man 8 service
man 5 rc.conf
```

---

# 104. Najważniejsze komendy administratora

## System

```sh
freebsd-version
uname -a
uptime
dmesg
sysctl
```

## Pakiety

```sh
pkg update
pkg upgrade
pkg install
pkg delete
pkg info
pkg audit -F
```

## Usługi

```sh
service -l
service -e
service nazwa status
service nazwa start
service nazwa stop
service nazwa restart
service nazwa reload
service nazwa rcvar
```

## Autostart

```sh
sysrc nazwa_enable="YES"
```

## Sieć

```sh
ifconfig
netstat -rn
route -n get default
sockstat -4 -6 -l
```

## Procesy

```sh
top
ps aux
pgrep -fl nazwa
```

## Dyski

```sh
df -h
zpool list
zpool status
zfs list
```

## Jails

```sh
jls
jexec
service jail
service -j jail usluga
```

## Logi

```sh
tail -f /var/log/messages
grep
```

---

# 105. Codzienna kontrola serwera

Nie trzeba wykonywać jej codziennie ręcznie, ale warto znać schemat:

```sh
uptime
zpool status -x
df -h
sockstat -4 -6 -l
pkg audit -F
```

Jeżeli coś wygląda źle:

```sh
tail -100 /var/log/messages
```

---

# 106. Kontrola po zmianie konfiguracji

Po każdej większej zmianie:

1. test składni,
2. reload zamiast restartu, jeśli możliwe,
3. sprawdzenie statusu,
4. sprawdzenie portu,
5. sprawdzenie logu.

Schemat:

```sh
nginx -t
service nginx reload
service nginx status
sockstat -4 -6 -l
tail -50 /var/log/messages
```

---

# 107. Kontrola raz na tydzień / miesiąc

Warto sprawdzać:

```sh
pkg audit -F
```

```sh
pkg upgrade
```

```sh
zpool status
```

```sh
zfs list
```

```sh
df -h
```

SMART:

```sh
smartctl -a /dev/ada0
```

Okresowo:

```sh
zpool scrub tank
```

oraz przede wszystkim:

**czy backup naprawdę da się odtworzyć.**

Backup, którego nigdy nie testowano, jest tylko nadzieją.

---

# 108. Najczęstsze różnice względem Debiana/Linuxa

| Debian/Linux | FreeBSD |
|---|---|
| `apt` | `pkg` |
| `systemctl` | `service` |
| systemd units | rc.d scripts |
| `/etc/default/...` | zwykle `rc.conf` + config aplikacji |
| `/etc/systemd/system` | `/usr/local/etc/rc.d` dla własnych usług |
| `/etc` dla pakietów | często `/usr/local/etc` |
| Linux namespaces/containers | jails |
| `ip addr` | `ifconfig` |
| `ss -lntp` | `sockstat -4 -6 -l` |
| `/proc` intensywnie używane | dużo danych przez `sysctl` |
| distro + kernel | spójny base system |

To nie znaczy, że FreeBSD jest „lepszym Linuksem”.

To inny system z inną filozofią.

---

# 109. Czego nie robić

## Nie edytuj:

```text
/etc/defaults/rc.conf
```

Edytuj:

```text
/etc/rc.conf
```

---

## Nie instaluj wszystkiego ze źródeł

Jeśli:

```sh
pkg install
```

wystarcza, użyj pakietu.

---

## Nie uruchamiaj wszystkiego jako root

Twórz użytkowników usług.

---

## Nie otwieraj każdego portu w firewallu

Otwieraj tylko to, co rzeczywiście potrzebne.

---

## Nie rób `chmod 777`, żeby „zadziałało”

Znajdź problem z uprawnieniami.

---

## Nie restartuj całej maszyny przy każdym problemie

Najpierw:

```sh
service nazwa restart
```

lub:

```sh
service nazwa reload
```

---

## Nie zakładaj, że mirror jest backupem

Nie jest.

---

# 110. Gdy usługa nie chce wystartować

Uniwersalne pytania:

### Czy pakiet jest zainstalowany?

```sh
pkg info | grep nazwa
```

### Czy skrypt istnieje?

```sh
service -l | grep nazwa
```

### Czy jest włączona?

```sh
service nazwa rcvar
```

### Czy config jest poprawny?

Użyj testera aplikacji.

### Co mówi start?

```sh
service nazwa start
```

### Co mówią logi?

```sh
tail -100 /var/log/messages
```

### Czy proces istnieje?

```sh
pgrep -fl nazwa
```

### Czy port jest otwarty?

```sh
sockstat -4 -6 -l
```

### Czy firewall przepuszcza?

```sh
pfctl -sr
```

---

# 111. Przykład: instalacja własnej aplikacji Go

Załóżmy:

```text
/usr/local/myapp/myapp
```

## 1. Użytkownik

```sh
pw useradd myapp -d /nonexistent -s /usr/sbin/nologin
```

## 2. Katalog

```sh
mkdir -p /usr/local/myapp
chown -R myapp:myapp /usr/local/myapp
```

## 3. Konfiguracja

```text
/usr/local/etc/myapp.conf
```

Ustaw właściciela i prawa odpowiednio do tego, czy plik zawiera sekrety.

## 4. Skrypt rc.d

```text
/usr/local/etc/rc.d/myapp
```

## 5. Włączenie

```sh
sysrc myapp_enable="YES"
```

## 6. Start

```sh
service myapp start
```

## 7. Kontrola

```sh
service myapp status
pgrep -fl myapp
sockstat -4 -6 -l
```

## 8. Reverse proxy

nginx kieruje:

```text
app.example.com
```

do:

```text
127.0.0.1:8080
```

---

# 112. Przykład: bezpieczna zmiana nginx

Edytujesz:

```text
/usr/local/etc/nginx/nginx.conf
```

Następnie:

```sh
nginx -t
```

Jeżeli test jest OK:

```sh
service nginx reload
```

Kontrola:

```sh
service nginx status
```

```sh
sockstat -4 -6 -l
```

Jeśli coś nie działa:

```sh
tail -100 /var/log/messages
```

plus log nginx.

---

# 113. Przykład: pakiet został zaktualizowany i usługa nie działa

Sprawdź:

```sh
pkg info nginx
```

```sh
service nginx status
```

```sh
nginx -t
```

```sh
tail -100 /var/log/messages
```

Sprawdź także:

```text
/usr/local/etc
```

Pakiet może zainstalować nowy plik:

```text
*.sample
```

z nowymi opcjami konfiguracji.

Nie zakładaj automatycznie, że stary config jest kompatybilny.

---

# 114. Przykład: po reboot aplikacja nie wystartowała

Najpierw:

```sh
service myapp status
```

Potem:

```sh
service myapp rcvar
```

Jeżeli:

```text
myapp_enable="NO"
```

to brak autostartu.

Włącz:

```sh
sysrc myapp_enable="YES"
```

Uruchom:

```sh
service myapp start
```

---

# 115. Przykład: serwer odpowiada lokalnie, ale nie z LAN

Na serwerze:

```sh
curl http://127.0.0.1:8080
```

działa.

Z innej maszyny nie działa.

Sprawdź:

```sh
sockstat -4 -6 -l
```

Jeżeli widzisz:

```text
127.0.0.1:8080
```

to aplikacja celowo słucha tylko lokalnie.

Jeżeli powinna być dostępna bezpośrednio w LAN, zmień bind address.

Jeżeli ma być za nginx, nie zmieniaj — skonfiguruj reverse proxy.

---

# 116. Przykład: brak miejsca na dysku

Sprawdź:

```sh
df -h
```

Dla ZFS:

```sh
zfs list
```

Snapshoty:

```sh
zfs list -t snapshot
```

Pakiety:

```sh
pkg clean
```

Nie zaczynaj od losowego kasowania plików w:

```text
/var
```

Najpierw ustal, co zajmuje miejsce.

Pomocne:

```sh
du -sh /*
```

oraz bardziej lokalnie:

```sh
du -sh /var/*
```

Na dużych filesystemach `du` może działać długo.

---

# 117. Przykład: podejrzenie problemu z dyskiem

Sprawdź:

```sh
zpool status
```

```sh
dmesg | tail -100
```

```sh
smartctl -a /dev/ada0
```

Nie ignoruj:

- checksum errors,
- read errors,
- write errors,
- urządzeń DEGRADED/FAULTED.

ZFS potrafi wykryć problemy, ale nie naprawi fizycznie umierającego dysku.

---

# 118. Dobra filozofia administracji FreeBSD

FreeBSD najlepiej administruje się spokojnie i deklaratywnie:

```text
/etc/rc.conf
/usr/local/etc
/etc/pf.conf
/etc/jail.conf.d
/etc/sysctl.conf
```

Zamiast wykonywać serię losowych komend, staraj się tak skonfigurować system, żeby po reboot sam odtworzył poprawny stan.

To znaczy:

- usługi mają autostart,
- sieć ma trwałą konfigurację,
- firewall ładuje swoje reguły,
- jails startują automatycznie,
- filesystemy montują się automatycznie,
- zadania są w cron/periodic,
- aplikacje nie zależą od ręcznego uruchamiania.

---

# 119. Minimalny workflow administratora

Jeżeli masz zapamiętać tylko jeden schemat pracy:

```text
1. zmień konfigurację
2. sprawdź składnię
3. uruchom/reloaduj usługę
4. sprawdź status
5. sprawdź port
6. sprawdź log
7. upewnij się, że zmiana przetrwa reboot
```

Czyli:

```sh
edytor config
tester config
service app reload
service app status
sockstat -4 -6 -l
tail /var/log/...
sysrc ...
```

---

# 120. Ściąga: usługi

```sh
service -l
service -e

service nginx rcvar
service nginx status
service nginx start
service nginx stop
service nginx restart
service nginx reload

sysrc nginx_enable="YES"
sysrc nginx_enable="NO"

service nginx onestart
service nginx onestop
```

---

# 121. Ściąga: system

```sh
freebsd-version
uname -a
uptime
dmesg
top
ps aux
sysctl hw.model
sysctl hw.ncpu
```

---

# 122. Ściąga: pakiety

```sh
pkg update
pkg upgrade
pkg search nazwa
pkg install nazwa
pkg delete nazwa
pkg info
pkg info nazwa
pkg info -l nazwa
pkg which /sciezka/do/pliku
pkg autoremove
pkg audit -F
```

---

# 123. Ściąga: sieć

```sh
ifconfig
netstat -rn
route -n get default
sockstat -4 -6 -l
host freebsd.org
ping 1.1.1.1
```

---

# 124. Ściąga: ZFS

```sh
zpool list
zpool status
zpool status -x
zfs list

zfs create tank/data
zfs snapshot tank/data@snap
zfs list -t snapshot
zfs destroy tank/data@snap

zpool scrub tank
```

---

# 125. Ściąga: jails

```sh
jls
service jail status
service jail start
service jail stop

service jail start www
service jail stop www

jexec www /bin/sh

service -j www nginx status
service -j www nginx restart
```

---

# 126. Ściąga: PF

```sh
pfctl -vnf /etc/pf.conf
pfctl -f /etc/pf.conf
pfctl -sr
pfctl -ss
pfctl -si

sysrc pf_enable="YES"
service pf start
service pf status
```

---

# 127. Ściąga: logi

```sh
tail -100 /var/log/messages
tail -f /var/log/messages
grep -i error /var/log/messages

service syslogd status
```

---

# 128. Ściąga: diagnostyka usługi

```sh
service app status
service app rcvar
pgrep -fl app
sockstat -4 -6 -l
tail -100 /var/log/messages
```

Plus własny test konfiguracji aplikacji.

---

# 129. Co warto opanować po tym kompendium

W tej kolejności:

1. `pkg`,
2. `rc.conf`,
3. `sysrc`,
4. `service`,
5. `sockstat`,
6. SSH,
7. PF,
8. ZFS,
9. cron/periodic,
10. jails,
11. własne skrypty rc.d,
12. backup przez ZFS send/receive.

Jeżeli te elementy masz opanowane, jesteś w stanie samodzielnie utrzymywać mały lub średni serwer FreeBSD.

---

# 130. Dokumentacja i źródła

Oficjalna dokumentacja powinna być pierwszym źródłem informacji.

## FreeBSD Handbook

https://docs.freebsd.org/en/books/handbook/

## Configuration, Services, Logging and Power Management

https://docs.freebsd.org/en/books/handbook/config/

## Packages and Ports

https://docs.freebsd.org/en/books/handbook/ports/

## Updating and Upgrading FreeBSD

https://docs.freebsd.org/en/books/handbook/cutting-edge/

## ZFS

https://docs.freebsd.org/en/books/handbook/zfs/

## Jails and Containers

https://docs.freebsd.org/en/books/handbook/jails/

## Firewalls

https://docs.freebsd.org/en/books/handbook/firewalls/

## Manual pages

https://man.freebsd.org/

## Informacje o wydaniach

https://www.freebsd.org/releases/

## Informacje o wsparciu i bezpieczeństwie

https://www.freebsd.org/security/

---

# 131. Ostatnia rzecz do zapamiętania

FreeBSD jako serwer robi się znacznie prostszy, kiedy zrozumiesz pięć elementów:

```text
pkg       → instalacja aplikacji
sysrc     → trwała konfiguracja systemu/usług
service   → sterowanie usługami
ZFS       → magazyn danych i snapshoty
jails     → izolacja usług
```

I najważniejszy wzorzec:

```sh
pkg install aplikacja

sysrc aplikacja_enable="YES"

service aplikacja start

service aplikacja status

sockstat -4 -6 -l
```

To jest odpowiednik dużej części codziennej administracji serwerem FreeBSD.
