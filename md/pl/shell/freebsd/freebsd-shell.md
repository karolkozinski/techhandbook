---
id: "doc-029"
title: "FreeBSD — shell"
slug: "freebsd-shell"
description: "Samodzielne kompendium do codziennej pracy we FreeBSD z terminala lub przez SSH."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "freebsd"
  - "shell"
  - "sh"
  - "tcsh"
---

# FreeBSD — shell

Samodzielne kompendium do codziennej pracy we FreeBSD z terminala lub przez SSH.

Cel: sprawnie poruszać się po systemie, pracować z plikami, procesami i siecią, aktualizować pakiety, obsługiwać system `rc`, czytać logi, korzystać z ZFS i diagnozować typowe awarie.

---

# FreeBSD — administrator, system i katalogi

## `su`

Na FreeBSD często korzysta się z:

```sh
su -
```

Po podaniu hasła roota otrzymujesz login shell administratora.

Powrót:

```sh
exit
```

Jeżeli chcesz korzystać z `sudo`, możesz go zainstalować:

```sh
pkg install sudo
```

## Wersja FreeBSD

```sh
freebsd-version
```

Przykładowy wynik:

```text
15.0-RELEASE-p3
```

Kernel:

```sh
uname -r
```

## Najważniejsze katalogi

```text
/                  korzeń systemu
/etc               konfiguracja systemu bazowego
/usr/home           typowa lokalizacja katalogów użytkowników
/root              katalog roota
/var               dane zmienne
/var/log           logi
/tmp               dane tymczasowe
/usr/local          programy instalowane spoza systemu bazowego
/usr/local/bin      dodatkowe programy użytkowe
/usr/local/sbin     dodatkowe programy administracyjne
/usr/local/etc      konfiguracje programów z pkg/ports
/dev                urządzenia
/boot               kernel i pliki startowe
```

Bardzo ważna praktyczna zasada: konfiguracji programu zainstalowanego przez `pkg` najpierw szukaj w `/usr/local/etc`, a nie w `/etc`.

---

# 1. Shell, terminal i polecenia — co właściwie robisz?

Terminal to okno, w którym wpisujesz polecenia.

Shell to program, który te polecenia interpretuje.

Typowe shelle:

- FreeBSD może używać m.in. `sh`, `csh` lub `tcsh`, zależnie od użytkownika i konfiguracji.
- możesz też używać `zsh`, `fish` itd.

Sprawdzenie aktualnego shella:

```sh
echo "$SHELL"
```

Przykładowy wynik:

```text
/bin/bash
```

To oznacza, że twoim domyślnym shellem jest Bash.

Sprawdzenie, jaki proces shella działa teraz:

```sh
ps -p $$ -o comm=
```

Przykładowy wynik:

```text
bash
```

---

# 2. `pwd` — gdzie jestem?

Polecenie:

```sh
pwd
```

`pwd` oznacza `print working directory`.

Pokazuje pełną ścieżkę do katalogu, w którym aktualnie się znajdujesz.

Przykład:

```sh
pwd
```

Wynik:

```text
/home/user/projects/example-site
```

Dzięki temu wiesz, że wszystkie polecenia z nazwami względnymi będą wykonywane względem tego katalogu.

Przydaje się szczególnie wtedy, gdy:

- pracujesz głęboko w strukturze katalogów,
- używasz `rm`, `mv`, `cp`,
- logujesz się na obcy serwer i nie pamiętasz, gdzie jesteś.

---

# 3. `ls` — co jest w katalogu?

Podstawowa forma:

```sh
ls
```

Pokazuje pliki i katalogi w bieżącym katalogu.

Przykład:

```sh
ls
```

Wynik:

```text
README.md  config  main.go  static  templates
```

## Najważniejsze przełączniki

### `-l`

```sh
ls -l
```

Pokazuje szczegóły:

- prawa dostępu,
- liczbę dowiązań,
- właściciela,
- grupę,
- rozmiar,
- datę modyfikacji,
- nazwę.

Przykład:

```text
-rw-r--r--  1 user user  1820 Sep 19 07:00 README.md
drwxr-xr-x  3 user user  4096 Sep 18 22:10 static
```

### `-a`

```sh
ls -a
```

Pokazuje także pliki ukryte.

W Unixie plik jest ukryty, jeśli nazwa zaczyna się od kropki:

```text
.git
.ssh
.config
.bashrc
```

### `-h`

```sh
ls -lh
```

Pokazuje rozmiary w czytelnej formie:

```text
1.2K
54M
2.1G
```

zamiast:

```text
1256
56623104
2254857830
```

### `-t`

```sh
ls -lt
```

Sortuje od najnowszych plików.

### `-S`

```sh
ls -lS
```

Sortuje według rozmiaru.

## Najczęściej używana wersja

```sh
ls -lah
```

Dostajesz:

- wszystkie pliki,
- szczegóły,
- czytelne rozmiary.

---

# 4. `cd` — zmiana katalogu

Polecenie:

```sh
cd katalog
```

Przechodzi do wskazanego katalogu.

Przykład:

```sh
cd /etc
```

Teraz pracujesz w:

```text
/etc
```

## Najważniejsze warianty

### Katalog wyżej

```sh
cd ..
```

Przykład:

```text
/home/user/projects
```

po:

```sh
cd ..
```

trafisz do:

```text
/home/user
```

### Katalog domowy

```sh
cd ~
```

albo samo:

```sh
cd
```

Przenosi do katalogu domowego użytkownika.

### Poprzedni katalog

```sh
cd -
```

Przełącza między bieżącym i poprzednim katalogiem.

Przykład:

```sh
cd /etc
cd /var/log
cd -
```

wróci do:

```text
/etc
```

---

# 5. Ścieżki względne i absolutne

Ścieżka absolutna zaczyna się od `/`.

Przykład:

```text
/etc/nginx/nginx.conf
```

Ścieżka względna jest liczona od bieżącego katalogu.

Jeśli jesteś w:

```text
/home/user/project
```

to:

```sh
cat config/app.conf
```

oznacza:

```text
/home/user/project/config/app.conf
```

### `.`

Bieżący katalog:

```sh
./script.sh
```

### `..`

Katalog nadrzędny:

```sh
../config
```

---

# 6. `touch` — tworzenie pustego pliku i zmiana czasu modyfikacji

```sh
touch test.txt
```

Jeśli plik nie istnieje, zostanie utworzony.

Jeśli istnieje, jego czas modyfikacji zostanie odświeżony.

Przydaje się do:

- tworzenia pustych plików,
- testów,
- tworzenia placeholderów,
- aktualizacji znacznika czasu.

Przykład:

```sh
touch README.md
ls -l README.md
```

---

# 7. `mkdir` — tworzenie katalogów

Podstawowo:

```sh
mkdir backup
```

Tworzy katalog `backup`.

## `-p`

```sh
mkdir -p app/config/nginx
```

Tworzy całą strukturę, nawet jeśli katalogi pośrednie nie istnieją.

Bez `-p` polecenie zakończyłoby się błędem, jeśli `app` lub `config` nie istnieją.

---

# 8. `cp` — kopiowanie

Podstawowo:

```sh
cp source.txt copy.txt
```

Tworzy kopię pliku.

## `-r`

Kopiowanie katalogu wraz z zawartością:

```sh
cp -r config/ config-backup/
```

## `-i`

Pyta przed nadpisaniem:

```sh
cp -i config.conf config.conf.bak
```

## `-v`

Pokazuje, co jest kopiowane:

```sh
cp -v file.txt /tmp/
```

Przykładowy wynik:

```text
'file.txt' -> '/tmp/file.txt'
```

## Typowy przypadek

Przed edycją konfiguracji:

```sh
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
```

To prosty i bardzo dobry nawyk.

---

# 9. `mv` — przenoszenie i zmiana nazwy

Zmiana nazwy:

```sh
mv old.txt new.txt
```

Przeniesienie:

```sh
mv file.txt /tmp/
```

## `-i`

Pyta przed nadpisaniem:

```sh
mv -i file.txt /etc/app/
```

## `-v`

Pokazuje operację:

```sh
mv -v old.txt new.txt
```

---

# 10. `rm` — usuwanie

Usuwanie pliku:

```sh
rm file.txt
```

## `-i`

Pyta przed usunięciem:

```sh
rm -i file.txt
```

## `-r`

Usuwa katalog rekurencyjnie:

```sh
rm -r old-project/
```

## `-f`

Wymusza usuwanie bez pytań:

```sh
rm -f file.txt
```

## `-rf`

```sh
rm -rf directory/
```

Usuwa katalog i wszystko w środku bez pytania.

To jedna z najbardziej niebezpiecznych komend w Unixie.

Przed `rm -rf` warto sprawdzić:

```sh
pwd
ls
```

i dopiero potem wykonać usuwanie.

---

# 11. `cat` — szybkie wyświetlenie pliku

```sh
cat config.txt
```

Wyświetla cały plik na ekranie.

Dobre dla krótkich plików.

Słabe dla pliku mającego 20 000 linii, bo wszystko wyleci naraz.

Przydaje się do:

```sh
cat /etc/os-release
cat /etc/hostname
cat README.md
```

---

# 12. `less` — wygodne czytanie dużych plików

```sh
less /var/log/syslog
```

Pozwala przewijać plik.

Sterowanie:

```text
strzałki       przewijanie
PgUp/PgDn      strony
g              początek
G              koniec
/tekst         wyszukiwanie
n              następny wynik
N              poprzedni wynik
q              wyjście
```

Bardzo przydatne:

```sh
less /var/log/messages
```

na FreeBSD albo:

```sh
journalctl | less
```

na Debianie.

---

# 13. `head` — początek pliku

Domyślnie:

```sh
head file.txt
```

pokazuje pierwsze 10 linii.

## `-n`

```sh
head -n 30 file.txt
```

pokazuje pierwsze 30 linii.

Przydatne np. do szybkiego obejrzenia CSV, logu albo konfiguracji.

---

# 14. `tail` — koniec pliku

Domyślnie:

```sh
tail file.log
```

pokazuje ostatnie 10 linii.

## `-n`

```sh
tail -n 100 file.log
```

pokazuje ostatnie 100 linii.

## `-f`

```sh
tail -f file.log
```

Śledzi plik na żywo.

Kiedy aplikacja dopisuje nową linię do logu, widzisz ją od razu.

Zatrzymanie:

```text
Ctrl+C
```

---

# 15. `grep` — wyszukiwanie tekstu

Najprościej:

```sh
grep "error" app.log
```

Pokazuje wszystkie linie zawierające `error`.

## `-i`

Ignoruje wielkość liter:

```sh
grep -i "error" app.log
```

znajdzie:

```text
error
Error
ERROR
```

## `-n`

Pokazuje numery linii:

```sh
grep -n "listen" nginx.conf
```

## `-R`

Szuka rekurencyjnie w katalogach:

```sh
grep -R "example.com" /etc/nginx/
```

## `-v`

Pokazuje linie, które NIE pasują:

```sh
grep -v "^#" config.conf
```

Przydatne do usuwania komentarzy z widoku.

## `-E`

Rozszerzone wyrażenia regularne:

```sh
grep -E "error|warning|critical" app.log
```

## Bardzo praktyczne

Pokaż niepuste linie bez komentarzy:

```sh
grep -Ev '^\s*($|#)' config.conf
```

---

# 16. `find` — znajdowanie plików

Podstawowo:

```sh
find /etc -name "nginx.conf"
```

Szuka pliku od katalogu `/etc`.

## `-name`

Dokładne dopasowanie wielkości liter:

```sh
find . -name "*.md"
```

## `-iname`

Bez rozróżniania wielkości liter:

```sh
find . -iname "*.jpg"
```

## `-type`

Tylko pliki:

```sh
find . -type f
```

Tylko katalogi:

```sh
find . -type d
```

## `-mtime`

Pliki zmodyfikowane w ostatniej dobie:

```sh
find . -type f -mtime -1
```

Starsze niż 30 dni:

```sh
find . -type f -mtime +30
```

## `-size`

Duże pliki:

```sh
find /var -type f -size +100M
```

Znajdzie pliki większe niż 100 MB.

---

# 17. `which`, `command -v`, `whereis` — gdzie jest program?

Najbardziej przenośne:

```sh
command -v nginx
```

Przykładowy wynik:

```text
/usr/sbin/nginx
```

`which`:

```sh
which curl
```

też zwykle zwróci ścieżkę.

`whereis` może pokazać więcej:

```sh
whereis nginx
```

np.:

```text
nginx: /usr/sbin/nginx /usr/share/man/man8/nginx.8.gz
```

---

# 18. `file` — czym jest plik?

```sh
file program
```

Możliwy wynik:

```text
ELF 64-bit LSB pie executable, x86-64
```

albo:

```text
ASCII text
```

albo:

```text
PNG image data
```

Przydaje się, gdy rozszerzenie pliku nic nie mówi.

---

# 19. `stat` — szczegółowe informacje o pliku

```sh
stat README.md
```

Pokazuje m.in.:

- rozmiar,
- inode,
- właściciela,
- prawa,
- czas modyfikacji,
- czas dostępu.

---

# 20. `man` — dokumentacja poleceń

```sh
man grep
```

Otwiera manual do `grep`.

Sterowanie podobne jak w `less`.

Szukanie:

```text
/pattern
```

Wyjście:

```text
q
```

Sekcje manuala są ważne.

Przykład:

```sh
man 5 rc.conf
```

Sekcja 5 to formaty plików konfiguracyjnych.

Na FreeBSD to szczególnie użyteczne.

---

# 21. `echo` — wypisywanie tekstu i zmiennych

```sh
echo "Hello"
```

Wynik:

```text
Hello
```

Zmienne:

```sh
echo "$HOME"
```

Przykład:

```text
/home/user
```

Przydatne do sprawdzania:

```sh
echo "$PATH"
echo "$USER"
echo "$SHELL"
```

---

# 22. Przekierowanie `>` i `>>`

`>` zapisuje wynik do pliku i nadpisuje jego zawartość.

```sh
uname -a > system.txt
```

`>>` dopisuje na końcu:

```sh
df -h >> system.txt
```

Po tych dwóch poleceniach `system.txt` zawiera informacje o kernelu i dyskach.

---

# 23. Potok `|`

Przekazuje wynik jednego polecenia do kolejnego.

```sh
ps aux | grep nginx
```

Najpierw `ps aux` wypisuje procesy.

Potem `grep nginx` zostawia tylko linie zawierające `nginx`.

Inny przykład:

```sh
du -sh * | sort -h
```

Najpierw `du` liczy rozmiary katalogów.

Potem `sort -h` sortuje je według rozmiaru.

---

# 24. `sort`, `uniq`, `wc`

## `sort`

```sh
sort names.txt
```

Sortuje linie alfabetycznie.

Numerycznie:

```sh
sort -n numbers.txt
```

Czytelne rozmiary:

```sh
sort -h
```

## `uniq`

Usuwa powtarzające się kolejne linie:

```sh
sort names.txt | uniq
```

Zliczenie:

```sh
sort names.txt | uniq -c
```

## `wc`

```sh
wc file.txt
```

Pokazuje:

- linie,
- słowa,
- bajty.

Tylko linie:

```sh
wc -l file.txt
```

---

# 25. `whoami`, `id`, `groups`

`whoami`:

```sh
whoami
```

Wynik:

```text
user
```

`id`:

```sh
id
```

Przykład:

```text
uid=1000(user) gid=1000(user) groups=1000(user),27(sudo)
```

`groups`:

```sh
groups
```

Pokazuje grupy użytkownika.

Przydaje się przy problemach z prawami dostępu.

---

# 26. `who` i `w`

`who`:

```sh
who
```

Pokazuje zalogowanych użytkowników.

`w`:

```sh
w
```

Pokazuje:

- kto jest zalogowany,
- z jakiego adresu,
- jak długo,
- co wykonuje,
- load average.

---

# 28. `uname` — kernel i platforma

```sh
uname
```

Najczęściej zwróci:

```text
Linux
```

albo:

```text
FreeBSD
```

## `-a`

```sh
uname -a
```

Pokazuje dużo informacji naraz:

- system,
- hostname,
- wersję kernela,
- architekturę.

## `-r`

```sh
uname -r
```

Wersja kernela.

---

# 30. `hostname`

```sh
hostname
```

Pokazuje nazwę komputera.

Debian może dodatkowo używać:

```sh
hostnamectl
```

który pokazuje:

- hostname,
- system,
- kernel,
- architekturę.

---

# 31. `uptime`

```sh
uptime
```

Przykładowy wynik:

```text
07:24:01 up 12 days,  3:14,  1 user,  load average: 0.15, 0.22, 0.18
```

Odczytasz:

- aktualny czas,
- czas działania systemu,
- liczbę użytkowników,
- load average.

---

# 32. `top` — procesy i obciążenie

```sh
top
```

Pokazuje na żywo:

- procesy,
- CPU,
- RAM,
- load,
- czas działania.

Wyjście:

```text
q
```

Przydaje się, gdy system:

- zwolnił,
- grzeje CPU,
- zużywa dużo RAM,
- jakiś proces zwariował.

---

# 33. `ps` — lista procesów

Najczęściej:

```sh
ps aux
```

Pokazuje wszystkie procesy.

Najważniejsze kolumny:

- `USER` — właściciel,
- `PID` — numer procesu,
- `%CPU`,
- `%MEM`,
- `COMMAND`.

Filtrowanie:

```sh
ps aux | grep nginx
```

---

# 34. `pgrep` — znajdź PID po nazwie

```sh
pgrep nginx
```

Wynik:

```text
1234
1238
```

## `-f`

Przeszukuje pełną linię polecenia:

```sh
pgrep -f "python.*worker"
```

## `-l`

Pokazuje nazwę:

```sh
pgrep -l nginx
```

---

# 35. `kill` i `pkill`

Normalne zakończenie:

```sh
kill 1234
```

Wysyła domyślnie `SIGTERM`.

Proces może się poprawnie zamknąć.

Wymuszone:

```sh
kill -9 1234
```

wysyła `SIGKILL`.

Proces zostaje natychmiast zabity.

Stosuj dopiero, gdy zwykłe `kill` nie działa.

Po nazwie:

```sh
pkill nginx
```

---

# 36. `df` — wolne miejsce na systemach plików

```sh
df -h
```

Przykład:

```text
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda2        40G   18G   20G  48% /
```

Najważniejsze:

- `Size` — rozmiar,
- `Used` — zajęte,
- `Avail` — wolne,
- `Use%` — procent,
- `Mounted on` — punkt montowania.

To jedno z pierwszych poleceń przy dziwnym zachowaniu serwera.

---

# 37. `du` — ile miejsca zajmuje katalog?

```sh
du -sh /var/log
```

Przykład:

```text
630M    /var/log
```

## `-s`

Podsumowanie.

## `-h`

Czytelny rozmiar.

Sprawdzenie katalogów w bieżącym miejscu:

```sh
du -sh *
```

Posortowanie:

```sh
du -sh * | sort -h
```

---

# 38. `mount` — co jest zamontowane?

```sh
mount
```

Pokazuje systemy plików i punkty montowania.

Przydaje się przy:

- dyskach,
- pendrive'ach,
- ZFS,
- NFS,
- problemach z filesystemem.

---

# 40. FreeBSD — dyski

```sh
geom disk list
```

Pokazuje wykryte dyski.

Możesz też użyć:

```sh
camcontrol devlist
```

dla urządzeń CAM/SATA/SAS.

---

# 41. ZFS

Jeśli używasz ZFS:

```sh
zpool status
```

Najważniejsza komenda.

Pokazuje:

- stan puli,
- błędy,
- mirror/RAIDZ,
- uszkodzone urządzenia.

```sh
zpool list
```

Pokazuje pule i zajętość.

```sh
zfs list
```

Pokazuje datasety i ich wykorzystanie.

---

# 43. FreeBSD — `ifconfig`

```sh
ifconfig
```

Pokazuje interfejsy sieciowe.

Typowy fragment:

```text
em0: flags=...
    inet 192.168.1.20 netmask 0xffffff00
```

Dostajesz:

- nazwę interfejsu,
- adres,
- MAC,
- stan.

---

# 44. Routing na FreeBSD

```sh
netstat -rn
```

Pokazuje tablicę routingu.

Szukaj linii:

```text
default
```

To twoja domyślna brama.

---

# 45. `ping`

```sh
ping 1.1.1.1
```

Testuje połączenie IP.

Jeśli działa:

```sh
ping google.com
```

testuje również DNS.

Typowa diagnostyka:

Jeśli:

```sh
ping 1.1.1.1
```

działa, ale:

```sh
ping google.com
```

nie działa, problem jest prawdopodobnie w DNS.

---

# 46. `curl`

Pobranie strony:

```sh
curl https://example.com
```

Pokazuje treść odpowiedzi.

Nagłówki:

```sh
curl -I https://example.com
```

Przykładowy wynik:

```text
HTTP/2 200
content-type: text/html
server: nginx
```

Debugowanie:

```sh
curl -v https://example.com
```

Pobranie pliku:

```sh
curl -LO https://example.com/file.tar.gz
```

---

# 47. DNS — `host` i `dig`

```sh
host example.com
```

Pokazuje rozwiązany adres.

```sh
dig example.com
```

Pokazuje bardziej szczegółowe informacje DNS.

Tylko odpowiedź:

```sh
dig +short example.com
```

Przykład:

```text
93.184.216.34
```

Debian:

```sh
sudo apt install dnsutils
```

FreeBSD:

```sh
pkg install bind-tools
```

---

# 49. FreeBSD — `sockstat`

```sh
sockstat -4 -6 -l
```

Pokazuje procesy nasłuchujące na IPv4 i IPv6.

Przykład:

```text
USER COMMAND PID FD PROTO LOCAL ADDRESS
root nginx 1234 6 tcp4 *:80
```

---

# 50. `ssh`

Połączenie:

```sh
ssh user@server
```

Przykład:

```sh
ssh user@192.168.1.100
```

## Inny port

```sh
ssh -p 2222 user@server
```

## Więcej diagnostyki

```sh
ssh -v user@server
```

Jeszcze więcej:

```sh
ssh -vvv user@server
```

Przydaje się przy problemach z kluczami i autoryzacją.

---

# 51. `scp`

Kopiowanie na serwer:

```sh
scp file.txt user@server:/tmp/
```

Pobranie:

```sh
scp user@server:/tmp/file.txt .
```

Rekurencyjnie:

```sh
scp -r project/ user@server:/srv/
```

---

# 52. `ssh-keygen`

Nowoczesny klucz:

```sh
ssh-keygen -t ed25519
```

Pytania:

- gdzie zapisać,
- czy ustawić hasło.

Typowo powstają:

```text
~/.ssh/id_ed25519
~/.ssh/id_ed25519.pub
```

Prywatnego klucza nie udostępniasz.

---

# 53. `chmod`

Prawa dostępu:

```sh
ls -l
```

Przykład:

```text
-rwxr-xr--
```

Znaczenie:

```text
owner: rwx
group: r-x
others: r--
```

## Dodaj wykonywanie

```sh
chmod +x script.sh
```

## Tryb numeryczny

```sh
chmod 644 file.conf
```

oznacza:

```text
owner: rw-
group: r--
others: r--
```

```sh
chmod 755 script.sh
```

oznacza:

```text
owner: rwx
group: r-x
others: r-x
```

```sh
chmod 600 secret.txt
```

oznacza:

```text
owner: rw-
group: ---
others: ---
```

---

# 54. `chown`

Zmiana właściciela:

```sh
sudo chown user:user file.txt
```

Rekurencyjnie:

```sh
sudo chown -R www-data:www-data /srv/www
```

Przydaje się przy:

- webserwerach,
- plikach tworzonych przez roota,
- wolumenach aplikacji,
- backupach.

---

# 57. FreeBSD — `pkg`

## Aktualizacja katalogu

```sh
pkg update
```

Pobiera aktualne informacje o pakietach.

## Aktualizacja pakietów

```sh
pkg upgrade
```

Pokazuje, co zostanie:

- zaktualizowane,
- zainstalowane,
- usunięte.

## Instalacja

```sh
pkg install nginx
```

## Usuwanie

```sh
pkg delete nginx
```

## Szukanie

```sh
pkg search nginx
```

## Informacje

```sh
pkg info nginx
```

## Wszystkie zainstalowane

```sh
pkg info
```

## Zbędne zależności

```sh
pkg autoremove
```

## Do jakiego pakietu należy plik

```sh
pkg which /usr/local/bin/curl
```

---

# 60. FreeBSD — usługi `service`

Status:

```sh
service nginx status
```

Start:

```sh
service nginx start
```

Stop:

```sh
service nginx stop
```

Restart:

```sh
service nginx restart
```

Lista aktywnych usług:

```sh
service -e
```

---

# 61. FreeBSD — `sysrc`

FreeBSD zapisuje wiele ustawień startowych w:

```text
/etc/rc.conf
```

Zamiast edytować ręcznie możesz użyć:

```sh
sysrc nginx_enable="YES"
```

Dostaniesz np.:

```text
nginx_enable:  -> YES
```

Sprawdzenie:

```sh
sysrc nginx_enable
```

Wyłączenie:

```sh
sysrc nginx_enable="NO"
```

Usunięcie wpisu:

```sh
sysrc -x nginx_enable
```

---

# 62. FreeBSD — logi

Typowy katalog:

```text
/var/log
```

Zobacz:

```sh
ls -lah /var/log
```

Najczęściej ważne:

```text
/var/log/messages
/var/log/security
/var/log/auth.log
```

Przykład:

```sh
tail -n 100 /var/log/messages
```

Na żywo:

```sh
tail -f /var/log/messages
```

---

# 63. FreeBSD — system bazowy i pakiety

FreeBSD rozdziela:

- system bazowy,
- pakiety użytkowe.

Pakiety z `pkg` to np.:

```text
nginx
vim
git
tmux
curl
```

System bazowy zawiera m.in.:

- kernel,
- podstawowe narzędzia,
- `/bin`,
- `/sbin`,
- część `/usr/bin`,
- część `/usr/sbin`.

To ważna różnica względem Debiana.

---

# 64. FreeBSD — aktualizacja systemu bazowego

W zależności od sposobu instalacji system może używać klasycznego mechanizmu albo pkgbase.

Sprawdzenie:

```sh
pkg which /usr/bin/uname
```

Jeśli plik nie należy do pakietu:

```text
/usr/bin/uname was not found in the database
```

najprawdopodobniej korzystasz z klasycznego systemu bazowego.

Klasyczne aktualizacje bezpieczeństwa:

```sh
freebsd-update fetch
freebsd-update install
```

Jeśli system używa pkgbase, aktualizacja systemu bazowego odbywa się przez odpowiednie repozytorium pakietów bazowych.

Przy zmianie głównej wersji FreeBSD zawsze sprawdź dokumentację konkretnego RELEASE.

---

# 66. `dmesg`

```sh
dmesg
```

Pokazuje komunikaty kernela.

Przydatne przy:

- sprzęcie,
- USB,
- dyskach,
- kartach sieciowych,
- błędach sterowników.

Ostatnie wpisy:

```sh
dmesg | tail -n 50
```

---

# 68. FreeBSD — `sysctl`

CPU:

```sh
sysctl hw.model
```

Liczba CPU:

```sh
sysctl hw.ncpu
```

RAM:

```sh
sysctl hw.physmem
```

`sysctl` służy również do odczytu i zmiany parametrów kernela.

---

# 69. `date`

```sh
date
```

Pokazuje aktualny czas systemowy.

Formatowanie:

```sh
date "+%Y-%m-%d %H:%M:%S"
```

Wynik:

```text
2026-09-19 07:45:00
```

---

# 70. `history`

```sh
history
```

Pokazuje wcześniejsze polecenia.

Ponowne wykonanie ostatniego:

```sh
!!
```

Przykład:

```sh
apt update
```

dostajesz błąd braku uprawnień.

Możesz wpisać:

```sh
sudo !!
```

czyli:

```sh
sudo apt update
```

---

# 71. `Ctrl+R`

Interaktywne szukanie w historii.

Wciśnij:

```text
Ctrl+R
```

i wpisz fragment:

```text
ssh
```

Shell znajdzie poprzednie polecenie zawierające `ssh`.

To jedna z najbardziej użytecznych funkcji terminala.

---

# 72. Skróty klawiaturowe

```text
Ctrl+C    przerwij polecenie
Ctrl+D    EOF / wylogowanie
Ctrl+L    wyczyść ekran
Ctrl+R    historia
Ctrl+A    początek linii
Ctrl+E    koniec linii
Ctrl+U    usuń do początku
Ctrl+K    usuń do końca
Tab       autouzupełnienie
```

---

# 73. `&&`, `||`, `;`

## `&&`

Drugie polecenie wykona się tylko, jeśli pierwsze zakończy się sukcesem.

```sh
make && ./app
```

## `||`

Drugie wykona się tylko, jeśli pierwsze się nie powiedzie.

```sh
ping -c 1 server || echo "Brak połączenia"
```

## `;`

Wykonuje oba niezależnie:

```sh
date ; uptime
```

---

# 74. Procesy w tle

```sh
command &
```

Przykład:

```sh
sleep 300 &
```

Shell od razu wraca do prompta.

Lista:

```sh
jobs
```

Na pierwszy plan:

```sh
fg
```

Zatrzymanie bieżącego procesu:

```text
Ctrl+Z
```

Wznowienie w tle:

```sh
bg
```

---

# 75. `tmux`

Instalacja Debian:

```sh
sudo apt install tmux
```

FreeBSD:

```sh
pkg install tmux
```

Start:

```sh
tmux
```

Odłączenie:

```text
Ctrl+B
D
```

Lista:

```sh
tmux ls
```

Powrót:

```sh
tmux attach
```

Przydatne do pracy przez SSH.

---

# 76. Archiwa `tar`

Pakowanie:

```sh
tar -czf backup.tar.gz project/
```

Znaczenie:

- `-c` — create,
- `-z` — gzip,
- `-f` — plik wynikowy.

Rozpakowanie:

```sh
tar -xzf backup.tar.gz
```

- `-x` — extract.

Podejrzenie zawartości:

```sh
tar -tzf backup.tar.gz
```

---

# 77. `gzip`, `gunzip`

Kompresja:

```sh
gzip file.log
```

Powstanie:

```text
file.log.gz
```

Rozpakowanie:

```sh
gunzip file.log.gz
```

---

# 78. `crontab`

Edycja:

```sh
crontab -e
```

Lista:

```sh
crontab -l
```

Format:

```text
min godz dzień_mies miesiąc dzień_tyg polecenie
```

Codziennie o 07:30:

```cron
30 7 * * * /home/user/script.sh
```

Co 10 minut:

```cron
*/10 * * * * /home/user/check.sh
```

---

# 82. Szybka diagnostyka FreeBSD

```sh
uptime
df -h
ifconfig
netstat -rn
service -e
tail -100 /var/log/messages
dmesg | tail -50
```

Co uzyskasz:

- obciążenie,
- zajętość dysków,
- adresy,
- routing,
- uruchomione usługi,
- ostatnie komunikaty systemowe,
- ostatnie komunikaty kernela.

---

# Przykłady z prawdziwego życia — FreeBSD

## 1. Strona WWW przestała odpowiadać

Sprawdź usługę:

```sh
service nginx status
```

Sprawdź komunikaty:

```sh
tail -n 100 /var/log/messages
```

Sprawdź port:

```sh
sockstat -4 -6 -l | grep ':80'
```

Sprawdź serwer lokalnie:

```sh
curl -I http://127.0.0.1
```

## 2. Dysk jest prawie pełny

```sh
df -h
```

Największe katalogi:

```sh
du -sh /var/* | sort -h
```

Duże pliki:

```sh
find /var -type f -size +500M
```

Jeżeli używasz ZFS:

```sh
zpool list
zfs list
```

## 3. Kontrola stanu ZFS

Najpierw:

```sh
zpool status
```

Szukaj:

```text
state: ONLINE
```

oraz zerowych wartości w kolumnach błędów.

Pojemność:

```sh
zpool list
```

Datasety:

```sh
zfs list
```

## 4. Nie pamiętasz, gdzie jest konfiguracja nginx

```sh
find /usr/local/etc -name "nginx.conf"
```

Typowa lokalizacja:

```text
/usr/local/etc/nginx/nginx.conf
```

## 5. Kto używa portu 8080?

```sh
sockstat -4 -6 -l | grep ':8080'
```

Z wyniku poznasz użytkownika, program i PID.

## 6. Sieć nie działa

Interfejsy:

```sh
ifconfig
```

Routing:

```sh
netstat -rn
```

Internet po IP:

```sh
ping 1.1.1.1
```

DNS:

```sh
ping freebsd.org
dig freebsd.org
```

## 7. Instalujesz nginx od zera

```sh
pkg install nginx
```

Włącz autostart:

```sh
sysrc nginx_enable="YES"
```

Uruchom:

```sh
service nginx start
```

Sprawdź:

```sh
service nginx status
sockstat -l | grep ':80'
```

## 8. Zmieniłeś konfigurację i nginx nie chce wystartować

Sprawdź składnię:

```sh
nginx -t
```

Potem:

```sh
service nginx restart
```

Jeśli jest problem:

```sh
tail -n 100 /var/log/messages
```

## 9. Aplikacja zjada CPU

```sh
top
```

Szczegóły:

```sh
ps -p 8421 -f
```

Zakończenie:

```sh
kill 8421
```

Ostatecznie:

```sh
kill -9 8421
```

## 10. Szybkie rozpoznanie obcego serwera

```sh
hostname
freebsd-version
uname -r
uptime
df -h
ifconfig
netstat -rn
service -e
```

## 11. Aktualizacja pakietów

```sh
pkg update
pkg upgrade
```

Potem:

```sh
service -e
```

i sprawdzenie najważniejszych usług.

## 12. Aktualizacja klasycznego systemu bazowego

Jeżeli system korzysta z klasycznego mechanizmu:

```sh
freebsd-update fetch
freebsd-update install
```

Po aktualizacji sprawdź komunikaty i instrukcje narzędzia. Jeżeli potrzebny jest restart:

```sh
shutdown -r now
```

## 13. Długi proces przez SSH

```sh
pkg install tmux
tmux
```

Uruchom proces i odłącz `Ctrl+B`, `D`.

Powrót:

```sh
tmux attach
```

## 14. Backup konfiguracji

```sh
tar -czf /tmp/etc-backup-$(date +%F).tar.gz /etc /usr/local/etc
```

Dzięki temu zapisujesz konfigurację systemu bazowego i większości programów instalowanych z pakietów.

---

# FreeBSD — minimalny zestaw do pamięci

```sh
pwd
ls -lah
cd
cp
mv
rm
mkdir
less
tail
grep
find
man
ps aux
top
kill
df -h
du -sh
ifconfig
netstat -rn
ping
curl
ssh
scp
pkg update
pkg upgrade
service
sysrc
sockstat
zpool status
zfs list
tail -f /var/log/messages
```
