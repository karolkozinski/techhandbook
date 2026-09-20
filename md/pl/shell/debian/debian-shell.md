---
id: "doc-027"
title: "Debian - shell"
slug: "debian-shell"
description: "Samodzielne kompendium do codziennej pracy w Debianie z terminala lub przez SSH."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "debian"
  - "shell"
  - "bash"
---

# Debian - shell

To kompendium dotyczy codziennej pracy administracyjnej w Debianie z powłoki. Dla przeglądu samych powłok zobacz [Shelle w Debianie - przegląd](techhandbook:doc-028), a dla automatyzacji [Programowanie w shellu](techhandbook:doc-031). Zdalną pracę opisuje [SSH i zdalna administracja](techhandbook:doc-018).

Samodzielne kompendium do codziennej pracy w Debianie z terminala lub przez SSH.

Cel: sprawnie poruszać się po systemie, pracować z plikami, procesami i siecią, aktualizować pakiety, obsługiwać `systemd`, czytać logi i diagnozować typowe awarie.

---

# Debian - administrator, system i katalogi

## `sudo`

Polecenie uruchamia pojedynczą komendę z uprawnieniami administratora:

```sh
sudo apt update
```

Interaktywny shell roota:

```sh
sudo -i
```

Po zakończeniu:

```sh
exit
```

Nie ma potrzeby pracować cały czas jako root. `sudo` ogranicza ryzyko przypadkowego wykonania destrukcyjnej komendy.

## Wersja Debiana

```sh
cat /etc/os-release
```

Przykładowy wynik:

```text
PRETTY_NAME="Debian GNU/Linux 13 (trixie)"
NAME="Debian GNU/Linux"
VERSION_ID="13"
```

## Najważniejsze katalogi

```text
/            korzeń systemu
/etc         konfiguracja systemowa
/home        katalogi użytkowników
/root        katalog domowy roota
/var         zmienne dane systemowe
/var/log     klasyczne pliki logów
/tmp         dane tymczasowe
/usr         programy, biblioteki i dane
/opt         dodatkowe oprogramowanie
/dev         urządzenia
/proc        wirtualne informacje o procesach i kernelu
/sys         informacje o urządzeniach i kernelu
/boot        kernel i pliki startowe
/srv         dane usług, jeśli administrator tak je organizuje
```

---

# 1. Shell, terminal i polecenia - co właściwie robisz?

Terminal to okno, w którym wpisujesz polecenia.

Shell to program, który te polecenia interpretuje.

Typowe shelle:

- Debian domyślnie często używa `bash` dla zwykłych użytkowników.
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

# 2. `pwd` - gdzie jestem?

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

# 3. `ls` - co jest w katalogu?

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

# 4. `cd` - zmiana katalogu

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

# 6. `touch` - tworzenie pustego pliku i zmiana czasu modyfikacji

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

# 7. `mkdir` - tworzenie katalogów

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

# 8. `cp` - kopiowanie

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

# 9. `mv` - przenoszenie i zmiana nazwy

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

# 10. `rm` - usuwanie

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

# 11. `cat` - szybkie wyświetlenie pliku

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

# 12. `less` - wygodne czytanie dużych plików

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

# 13. `head` - początek pliku

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

# 14. `tail` - koniec pliku

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

# 15. `grep` - wyszukiwanie tekstu

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

# 16. `find` - znajdowanie plików

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

# 17. `which`, `command -v`, `whereis` - gdzie jest program?

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

# 18. `file` - czym jest plik?

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

# 19. `stat` - szczegółowe informacje o pliku

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

# 20. `man` - dokumentacja poleceń

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

# 21. `echo` - wypisywanie tekstu i zmiennych

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

# 28. `uname` - kernel i platforma

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

# 32. `top` - procesy i obciążenie

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

# 33. `ps` - lista procesów

Najczęściej:

```sh
ps aux
```

Pokazuje wszystkie procesy.

Najważniejsze kolumny:

- `USER` - właściciel,
- `PID` - numer procesu,
- `%CPU`,
- `%MEM`,
- `COMMAND`.

Filtrowanie:

```sh
ps aux | grep nginx
```

---

# 34. `pgrep` - znajdź PID po nazwie

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

# 36. `df` - wolne miejsce na systemach plików

```sh
df -h
```

Przykład:

```text
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda2        40G   18G   20G  48% /
```

Najważniejsze:

- `Size` - rozmiar,
- `Used` - zajęte,
- `Avail` - wolne,
- `Use%` - procent,
- `Mounted on` - punkt montowania.

To jedno z pierwszych poleceń przy dziwnym zachowaniu serwera.

---

# 37. `du` - ile miejsca zajmuje katalog?

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

# 38. `mount` - co jest zamontowane?

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

# 39. `lsblk` - dyski w Debianie

```sh
lsblk
```

Przykład:

```text
NAME   SIZE TYPE MOUNTPOINTS
sda    500G disk
├─sda1 512M part /boot
└─sda2 499G part /
```

Dostajesz czytelny widok dysków i partycji.

FreeBSD nie ma standardowo `lsblk`.

---

# 42. Debian - `ip`

Adresy:

```sh
ip addr
```

skrót:

```sh
ip a
```

Pokazuje:

- interfejsy,
- adresy IPv4,
- IPv6,
- MAC,
- stan interfejsów.

Routing:

```sh
ip route
```

Przykład:

```text
default via 192.168.1.1 dev enp3s0
192.168.1.0/24 dev enp3s0 proto kernel
```

Wiesz wtedy:

- jaka jest brama,
- którym interfejsem wychodzi ruch.

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

# 47. DNS - `host` i `dig`

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

# 48. Debian - `ss`

```sh
ss -tulpn
```

Pokazuje porty i procesy.

Przełączniki:

- `-t` - TCP,
- `-u` - UDP,
- `-l` - nasłuchujące,
- `-p` - proces,
- `-n` - bez zamiany numerów na nazwy.

Przykład:

```sh
sudo ss -ltnp
```

Możesz dostać:

```text
LISTEN 0 511 0.0.0.0:80 0.0.0.0:* users:(("nginx",pid=1234,fd=6))
```

Wiesz wtedy:

- port 80 działa,
- nginx go obsługuje,
- PID procesu to 1234.

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

# 55. Debian - `apt`

## `apt update`

```sh
sudo apt update
```

Nie aktualizuje jeszcze programów.

Pobiera nowe informacje o pakietach z repozytoriów.

Po wykonaniu zobaczysz m.in.:

```text
Hit:1 ...
Get:2 ...
Reading package lists... Done
```

oraz informację, ile pakietów można zaktualizować.

## `apt upgrade`

```sh
sudo apt upgrade
```

Aktualizuje zainstalowane pakiety.

Przed wykonaniem pokaże listę zmian i zapyta:

```text
Do you want to continue? [Y/n]
```

## Typowa aktualizacja

```sh
sudo apt update
sudo apt upgrade
```

## `apt full-upgrade`

```sh
sudo apt full-upgrade
```

Może również:

- doinstalować zależności,
- usunąć pakiety,
- wykonać bardziej złożone zmiany.

## Instalacja

```sh
sudo apt install nginx
```

## Usuwanie

```sh
sudo apt remove nginx
```

Zostawia część konfiguracji.

## Purge

```sh
sudo apt purge nginx
```

Usuwa również konfigurację pakietu zarządzaną przez system pakietów.

## Autoremove

```sh
sudo apt autoremove
```

Usuwa zależności, które nie są już potrzebne.

## Szukanie

```sh
apt search nginx
```

## Informacje

```sh
apt show nginx
```

---

# 56. Debian - `dpkg`

Czy pakiet jest zainstalowany:

```sh
dpkg -l nginx
```

Do jakiego pakietu należy plik:

```sh
dpkg -S /usr/bin/curl
```

Lista plików pakietu:

```sh
dpkg -L nginx
```

---

# 58. Debian - systemd i `systemctl`

Status:

```sh
systemctl status nginx
```

Dostaniesz:

- czy usługa działa,
- PID,
- czas działania,
- kilka ostatnich logów,
- informację o błędzie.

Start:

```sh
sudo systemctl start nginx
```

Stop:

```sh
sudo systemctl stop nginx
```

Restart:

```sh
sudo systemctl restart nginx
```

Reload:

```sh
sudo systemctl reload nginx
```

Przeładowuje konfigurację, jeśli usługa to wspiera.

Autostart:

```sh
sudo systemctl enable nginx
```

Wyłączenie autostartu:

```sh
sudo systemctl disable nginx
```

Od razu start + autostart:

```sh
sudo systemctl enable --now nginx
```

Usługi z błędami:

```sh
systemctl --failed
```

---

# 59. Debian - `journalctl`

Cały journal:

```sh
journalctl
```

Ostatnie 100 wpisów:

```sh
journalctl -n 100
```

Na żywo:

```sh
journalctl -f
```

Konkretna usługa:

```sh
journalctl -u nginx
```

Ostatnie 100:

```sh
journalctl -u nginx -n 100
```

Na żywo:

```sh
journalctl -u nginx -f
```

Od ostatniego bootu:

```sh
journalctl -b
```

Tylko błędy:

```sh
journalctl -p err
```

Kernel:

```sh
journalctl -k
```

Bardzo użyteczne:

```sh
sudo journalctl -xe
```

---

# 65. Debian - NetworkManager

Sprawdzenie:

```sh
nmcli
```

Urządzenia:

```sh
nmcli device
```

Połączenia:

```sh
nmcli connection
```

Aktywne:

```sh
nmcli connection show --active
```

Szczegóły:

```sh
nmcli connection show "Wired connection 1"
```

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

# 67. `lscpu`, `lspci`, `lsusb` - Debian

CPU:

```sh
lscpu
```

PCI:

```sh
lspci
```

USB:

```sh
lsusb
```

Bardzo przydatne przy sprawdzaniu sprzętu.

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

- `-c` - create,
- `-z` - gzip,
- `-f` - plik wynikowy.

Rozpakowanie:

```sh
tar -xzf backup.tar.gz
```

- `-x` - extract.

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

# 81. Szybka diagnostyka Debiana

```sh
uptime
df -h
free -h
ip a
ip route
systemctl --failed
journalctl -b -p err
```

Co z tego uzyskasz:

- `uptime` - obciążenie i czas pracy,
- `df -h` - czy dysk nie jest pełny,
- `free -h` - RAM,
- `ip a` - adresy sieciowe,
- `ip route` - brama,
- `systemctl --failed` - uszkodzone usługi,
- `journalctl -b -p err` - błędy od bootu.

---

# Przykłady z prawdziwego życia - Debian

## 1. Strona WWW przestała odpowiadać

Sprawdź usługę:

```sh
systemctl status nginx
```

Jeżeli jest `failed`, przeczytaj log:

```sh
journalctl -u nginx -n 100
```

Sprawdź port 80:

```sh
sudo ss -ltnp | grep ':80'
```

Sprawdź odpowiedź lokalnie:

```sh
curl -I http://127.0.0.1
```

Jeżeli lokalny `curl` zwraca `200`, webserver działa i należy szukać dalej w firewallu, reverse proxy albo DNS.

## 2. Dysk jest prawie pełny

```sh
df -h
```

Znajdź największe katalogi:

```sh
sudo du -sh /var/* | sort -h
```

Jeżeli duży jest `/var/log`:

```sh
sudo du -sh /var/log/* | sort -h
```

Duże pojedyncze pliki:

```sh
sudo find /var -type f -size +500M
```

## 3. Nie pamiętasz, gdzie jest konfiguracja

```sh
sudo find /etc -name "nginx.conf"
```

albo tekst w konfiguracjach:

```sh
sudo grep -Rni "server_name" /etc/nginx/
```

## 4. Kto używa portu 8080?

```sh
sudo ss -ltnp | grep ':8080'
```

Dostaniesz nazwę programu i PID procesu.

## 5. Sieć nie działa

Sprawdź adres:

```sh
ip a
```

Trasę domyślną:

```sh
ip route
```

Internet po IP:

```sh
ping 1.1.1.1
```

DNS:

```sh
ping debian.org
dig debian.org
```

Jeżeli IP działa, a nazwa nie, problem zwykle dotyczy DNS.

## 6. Bezpieczna zmiana konfiguracji SSH

Najpierw kopia:

```sh
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
```

Edycja:

```sh
sudo vi /etc/ssh/sshd_config
```

Sprawdzenie konfiguracji:

```sh
sudo sshd -t
```

Jeśli polecenie nic nie wypisze, konfiguracja jest poprawna składniowo.

Przeładuj usługę:

```sh
sudo systemctl reload ssh
```

Nie zamykaj starej sesji SSH, dopóki nie sprawdzisz nowego połączenia.

## 7. Aplikacja zjada CPU

```sh
top
```

Potem szczegóły procesu:

```sh
ps -p 8421 -f
```

Normalne zakończenie:

```sh
kill 8421
```

Dopiero gdy nie reaguje:

```sh
kill -9 8421
```

## 8. Chcesz oglądać log podczas testowania aplikacji

```sh
journalctl -u myapp -f
```

W drugim terminalu wykonujesz test i natychmiast widzisz nowe wpisy.

## 9. Szybko rozpoznajesz obcy serwer

```sh
hostname
cat /etc/os-release
uname -r
uptime
df -h
free -h
ip a
```

W minutę poznasz system, kernel, uptime, przestrzeń, RAM i adresy.

## 10. Aktualizacja Debiana

```sh
sudo apt update
sudo apt upgrade
```

Potem:

```sh
systemctl --failed
```

i ewentualnie:

```sh
sudo reboot
```

jeżeli aktualizacja wymaga restartu.

## 11. Długi proces przez SSH

```sh
tmux
```

Uruchom pracę:

```sh
./long-job.sh
```

Odłącz sesję `Ctrl+B`, potem `D`.

Po ponownym logowaniu:

```sh
tmux attach
```

## 12. Backup konfiguracji systemowej

```sh
sudo tar -czf /tmp/etc-backup-$(date +%F).tar.gz /etc
```

Sprawdzenie pliku:

```sh
ls -lh /tmp/etc-backup-*.tar.gz
```

Podejrzenie zawartości:

```sh
tar -tzf /tmp/etc-backup-$(date +%F).tar.gz | less
```

---

# Debian - minimalny zestaw do pamięci

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
ip a
ip route
ping
curl
ssh
scp
sudo apt update
sudo apt upgrade
systemctl status
journalctl
ss -ltnp
```

## Oficjalne źródła

- Debian Reference: https://www.debian.org/doc/manuals/debian-reference/
- Debian manpages: https://manpages.debian.org/
- Debian documentation: https://www.debian.org/doc/
