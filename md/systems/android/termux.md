# Termux — kompendium wiedzy

> Praktyczne kompendium Termuxa na Androidzie: czym jest, jak działa, jak go używać jako środowiska uniksowego i developerskiego, gdzie kończy się Termux, a zaczyna Android, oraz co zmienia root.
>
> Stan wiedzy: wrzesień 2026.

---

## Spis treści

1. [Czym jest Termux](#1-czym-jest-termux)
2. [Jak Termux działa od strony systemu](#2-jak-termux-działa-od-strony-systemu)
3. [Termux a Debian, klasyczny Linux i FreeBSD](#3-termux-a-debian-klasyczny-linux-i-freebsd)
4. [Instalacja Termuxa](#4-instalacja-termuxa)
5. [Pierwsze uruchomienie](#5-pierwsze-uruchomienie)
6. [Filesystem Termuxa](#6-filesystem-termuxa)
7. [Pakiety: pkg i apt](#7-pakiety-pkg-i-apt)
8. [Podstawowa konfiguracja shella](#8-podstawowa-konfiguracja-shella)
9. [Dostęp do pamięci Androida](#9-dostęp-do-pamięci-androida)
10. [SSH](#10-ssh)
11. [Git](#11-git)
12. [Edytory tekstu](#12-edytory-tekstu)
13. [Programowanie i kompilacja](#13-programowanie-i-kompilacja)
14. [Python](#14-python)
15. [Go](#15-go)
16. [C i C++](#16-c-i-c)
17. [Node.js i JavaScript](#17-nodejs-i-javascript)
18. [Serwery WWW](#18-serwery-www)
19. [Usługi i procesy działające w tle](#19-usługi-i-procesy-działające-w-tle)
20. [Termux:API — sterowanie Androidem z shella](#20-termuxapi--sterowanie-androidem-z-shella)
21. [proot-distro — Debian i inne dystrybucje](#21-proot-distro--debian-i-inne-dystrybucje)
22. [Co daje root](#22-co-daje-root)
23. [Czego Termux nie potrafi bez roota](#23-czego-termux-nie-potrafi-bez-roota)
24. [Docker i kontenery](#24-docker-i-kontenery)
25. [Sieć](#25-sieć)
26. [Backup i migracja Termuxa](#26-backup-i-migracja-termuxa)
27. [Bezpieczeństwo](#27-bezpieczeństwo)
28. [Wydajność i bateria](#28-wydajność-i-bateria)
29. [Najczęstsze problemy](#29-najczęstsze-problemy)
30. [Przykłady z prawdziwego życia](#30-przykłady-z-prawdziwego-życia)
31. [Ściąga](#31-ściąga)
32. [Źródła](#32-źródła)

---

# 1. Czym jest Termux

Termux jest aplikacją terminalową dla Androida połączoną z własnym środowiskiem uniksowym i systemem pakietów.

Najważniejsze jest to, czym Termux **nie jest**:

- nie jest maszyną wirtualną,
- nie jest emulatorem procesora,
- nie uruchamia osobnego kernela Linux,
- nie jest Dockerem,
- nie jest pełną dystrybucją Debian/Ubuntu,
- nie wymaga roota do normalnego działania.

Domyślnie programy Termuxa działają **natywnie na procesorze telefonu** i korzystają z **tego samego jądra Linux**, którego używa Android.

Schemat:

```text
Android
│
├── aplikacje Androida
│
├── framework Androida
│
├── Termux
│   ├── bash / zsh
│   ├── ssh
│   ├── git
│   ├── vim / neovim
│   ├── Python
│   ├── Go
│   ├── clang
│   ├── Node.js
│   └── inne pakiety
│
└── kernel Linux Androida
```

Termux jest więc czymś w rodzaju:

> „uniksowego userspace działającego jako zwykła aplikacja Androida”.

---

# 2. Jak Termux działa od strony systemu

## 2.1. Kernel

Termux **nie posiada własnego kernela**.

Polecenie:

```bash
uname -a
```

pokazuje kernel Androida.

Można także sprawdzić:

```bash
uname -r
cat /proc/version
uname -m
```

Na współczesnym Pixelu architektura zwykle będzie:

```text
aarch64
```

czyli ARM64.

Program skompilowany w Termuxie może więc działać bezpośrednio na CPU:

```text
program ARM64
      ↓
Bionic libc
      ↓
syscalls
      ↓
Linux kernel Androida
      ↓
sprzęt
```

Nie ma tutaj warstwy emulacji CPU.

---

## 2.2. Bionic zamiast glibc

Typowy Debian korzysta z:

```text
Linux + glibc
```

Android oraz Termux korzystają z:

```text
Linux + Bionic libc
```

Bionic jest biblioteką C stworzoną dla Androida.

To bardzo ważna różnica.

Program skompilowany dla Debiana ARM64 nie musi uruchomić się bezpośrednio w Termuxie, mimo że:

- procesor jest zgodny,
- oba środowiska używają Linuxa,
- oba używają ELF.

Problemem mogą być:

- inny linker dynamiczny,
- glibc kontra Bionic,
- inne ścieżki bibliotek,
- inne założenia dotyczące filesystemu.

Termux dlatego posiada **własne pakiety skompilowane specjalnie dla Androida**.

---

## 2.3. Android sandbox

Termux dla Androida jest zwykłą aplikacją.

Ma własny UID, np.:

```bash
id
```

może pokazać coś podobnego do:

```text
uid=10374(u0_a374)
gid=10374(u0_a374)
```

Nie jest to:

```text
uid=0(root)
```

Android wykorzystuje między innymi:

- UID/GID,
- SELinux,
- permissions,
- sandbox aplikacji,
- ograniczenia frameworka Androida.

Termux normalnie nie może czytać prywatnych danych innych aplikacji.

---

## 2.4. Procesy Termuxa

Termux uruchamia własne procesy potomne.

Przykładowo:

```text
Termux app
   │
   └── bash
       ├── vim
       ├── ssh
       ├── git
       └── python
```

Są to rzeczywiste procesy Linux widziane przez kernel Androida.

Można je oglądać:

```bash
ps
ps -ef
top
```

---

# 3. Termux a Debian, klasyczny Linux i FreeBSD

## Termux

```text
Linux kernel Androida
Bionic libc
Android sandbox
pakiety Termuxa
brak systemd
brak klasycznego root filesystemu
```

## Debian

```text
Linux kernel
glibc
GNU userspace
APT
systemd
klasyczny filesystem Unix/Linux
```

## FreeBSD

```text
kernel FreeBSD
FreeBSD libc
FreeBSD userland
rc.d
pkg
ZFS jako rozwiązanie natywne
```

Termux jest świetny do:

- shella,
- SSH,
- Gita,
- Vima,
- programowania,
- kompilacji,
- prostych usług,
- automatyzacji,
- pracy z siecią,
- zarządzania zdalnymi serwerami.

Termux jest słabszy jako środowisko do nauki:

- bootowania,
- systemd,
- partycji,
- sterowników,
- kernela,
- ZFS,
- pełnego firewalla,
- Dockera,
- klasycznej administracji systemowej.

Do tego lepszy jest Debian lub FreeBSD.

---

# 4. Instalacja Termuxa

## 4.1. Zalecane źródła

Projekt Termux udostępnia aplikację przede wszystkim przez:

- F-Droid,
- GitHub Releases.

W 2026 istnieje także wersja Google Play dla Androida 11+, ale jest rozwijana jako osobna, eksperymentalna gałąź i może posiadać ograniczenia wynikające z polityk Google Play.

Do normalnego zastosowania najlepiej trzymać się jednego z dwóch głównych źródeł:

```text
F-Droid
lub
GitHub
```

## 4.2. Nie mieszaj źródeł

Termux oraz dodatki takie jak:

- Termux:API,
- Termux:Widget,
- Termux:Boot,

muszą być podpisane zgodnymi kluczami.

Nie należy instalować np.:

```text
Termux z F-Droid
+
Termux:API z losowego APK/GitHub debug
```

Jeśli podpisy są inne, dodatki nie będą prawidłowo współpracować.

Najprostsza zasada:

> Termux i wszystkie jego dodatki instaluj z tego samego ekosystemu dystrybucji.

---

# 5. Pierwsze uruchomienie

Po instalacji pierwszą rzeczą powinno być:

```bash
pkg update
pkg upgrade
```

Można użyć:

```bash
pkg update && pkg upgrade
```

Następnie warto zainstalować podstawowy zestaw:

```bash
pkg install git
pkg install curl
pkg install wget
pkg install openssh
pkg install vim
pkg install neovim
pkg install tmux
pkg install tree
pkg install file
pkg install less
pkg install man
```

Lub naraz:

```bash
pkg install git curl wget openssh vim neovim tmux tree file less man
```

Przydatne informacje:

```bash
uname -a
uname -m
id
whoami
pwd
echo $HOME
echo $PREFIX
echo $PATH
```

---

# 6. Filesystem Termuxa

Termux nie może stworzyć sobie klasycznego:

```text
/
├── bin
├── etc
├── home
├── usr
└── var
```

we właściwym root filesystemie Androida.

Dlatego własne środowisko przechowuje w katalogu aplikacji.

Typowy układ:

```text
/data/data/com.termux/files/
├── home
└── usr
    ├── bin
    ├── etc
    ├── include
    ├── lib
    ├── share
    ├── tmp
    └── var
```

---

## 6.1. HOME

```bash
echo $HOME
```

zwykle:

```text
/data/data/com.termux/files/home
```

Skrót:

```text
~
```

oznacza `$HOME`.

Czyli:

```bash
cd ~
```

i:

```bash
cd $HOME
```

robią praktycznie to samo.

---

## 6.2. PREFIX

Bardzo ważna zmienna:

```bash
echo $PREFIX
```

typowo wskazuje:

```text
/data/data/com.termux/files/usr
```

Właśnie tutaj znajdują się:

```text
$PREFIX/bin
$PREFIX/etc
$PREFIX/lib
$PREFIX/share
$PREFIX/var
```

To odpowiednik dużej części:

```text
/usr
/etc
/var
```

z normalnej dystrybucji Linuxa.

---

## 6.3. Gdzie są programy

Na Debianie:

```text
/usr/bin/vim
/usr/bin/ssh
```

W Termuxie:

```text
$PREFIX/bin/vim
$PREFIX/bin/ssh
```

Sprawdzisz:

```bash
which vim
which ssh
which python
```

---

## 6.4. Gdzie przechowywać projekty

Najlepiej:

```text
~/projects
~/src
~/git
~/dev
```

Przykład:

```bash
mkdir -p ~/projects
cd ~/projects
```

Nie trzymaj kodu, który ma być kompilowany i wykonywany, bezpośrednio we współdzielonej pamięci Androida.

---

# 7. Pakiety: pkg i apt

Termux wykorzystuje własne repozytoria.

Najbardziej przyjaznym poleceniem jest:

```bash
pkg
```

`pkg` jest wrapperem upraszczającym pracę z menedżerem pakietów.

---

## Aktualizacja listy pakietów

```bash
pkg update
```

---

## Aktualizacja zainstalowanych pakietów

```bash
pkg upgrade
```

---

## Instalowanie

```bash
pkg install git
```

---

## Usuwanie

```bash
pkg uninstall git
```

---

## Szukanie

```bash
pkg search nginx
```

---

## Informacje o pakiecie

```bash
pkg show openssh
```

---

## Lista zainstalowanych

```bash
pkg list-installed
```

---

## apt

Można również używać:

```bash
apt update
apt upgrade
apt install
apt remove
apt search
```

Do codziennej pracy najprościej zostać przy:

```bash
pkg
```

---

# 8. Podstawowa konfiguracja shella

Domyślnie Termux udostępnia Bash.

Sprawdzenie:

```bash
echo $SHELL
```

---

## Bash

Plik konfiguracyjny:

```text
~/.bashrc
```

Przykład:

```bash
vim ~/.bashrc
```

Można dodać:

```bash
alias ll='ls -lah'
alias gs='git status'
alias ..='cd ..'
alias ...='cd ../..'
```

Po zapisaniu:

```bash
source ~/.bashrc
```

---

## Zsh

Instalacja:

```bash
pkg install zsh
```

Uruchomienie:

```bash
zsh
```

Zmiana domyślnego shella:

```bash
chsh -s zsh
```

---

## Historia

```bash
history
```

Szukanie historii:

```text
Ctrl+R
```

---

## tmux

Termux + tmux to bardzo dobre połączenie.

Instalacja:

```bash
pkg install tmux
```

Start:

```bash
tmux
```

Odłączenie:

```text
Ctrl+B
D
```

Lista sesji:

```bash
tmux ls
```

Powrót:

```bash
tmux attach
```

---

# 9. Dostęp do pamięci Androida

Termux ma własny prywatny filesystem.

Aby uzyskać wygodny dostęp do pamięci współdzielonej Androida:

```bash
termux-setup-storage
```

Android poprosi o odpowiednie uprawnienie.

Po konfiguracji pojawi się:

```text
~/storage/
```

Przykładowo:

```text
~/storage/shared
~/storage/downloads
~/storage/dcim
~/storage/pictures
~/storage/music
~/storage/movies
```

---

## 9.1. Ważna różnica

Współdzielona pamięć Androida nie zachowuje się jak normalny filesystem Unix.

Nie należy zakładać, że poprawnie działają tam:

- unixowe permission bits,
- symlinki,
- wykonywanie binariów,
- wszystkie właściwości plików.

Typowym problemem jest `noexec`.

Dlatego:

```text
kod → ~/projects
zdjęcia/dokumenty/wymiana z Androidem → ~/storage/shared
```

---

# 10. SSH

Termux może być zarówno:

- klientem SSH,
- serwerem SSH.

---

## 10.1. Klient SSH

Instalacja:

```bash
pkg install openssh
```

Połączenie:

```bash
ssh user@192.168.1.10
```

Z innym portem:

```bash
ssh -p 2222 user@server
```

---

## 10.2. Klucze SSH

Generowanie:

```bash
ssh-keygen -t ed25519
```

Pliki:

```text
~/.ssh/id_ed25519
~/.ssh/id_ed25519.pub
```

Wyświetlenie publicznego:

```bash
cat ~/.ssh/id_ed25519.pub
```

---

## 10.3. SSH config

```bash
vim ~/.ssh/config
```

Przykład:

```text
Host vps
    HostName 203.0.113.10
    User user
    Port 22
    IdentityFile ~/.ssh/id_ed25519

Host home
    HostName 192.168.88.10
    User user
```

Potem:

```bash
ssh vps
```

---

## 10.4. Termux jako serwer SSH

Uruchom:

```bash
sshd
```

Termux zazwyczaj używa portu:

```text
8022
```

Sprawdzenie użytkownika:

```bash
whoami
```

Adres IP:

```bash
ip addr
```

lub np.:

```bash
hostname -I
```

Połączenie z komputera:

```bash
ssh -p 8022 USER@IP_TELEFONU
```

---

## 10.5. Ustawienie hasła

```bash
passwd
```

Lepszym rozwiązaniem jest klucz SSH.

---

# 11. Git

Instalacja:

```bash
pkg install git
```

Konfiguracja:

```bash
git config --global user.name "Karol"
git config --global user.email "twoj@email"
```

Sprawdzenie:

```bash
git config --global --list
```

Clone:

```bash
git clone https://github.com/uzytkownik/projekt.git
```

SSH:

```bash
git clone git@github.com:uzytkownik/projekt.git
```

Typowa praca:

```bash
git status
git add .
git commit -m "Opis zmiany"
git push
```

Termux nadaje się bardzo dobrze do:

- szybkich poprawek,
- commitów,
- przeglądania repozytoriów,
- pracy przez SSH.

---

# 12. Edytory tekstu

## Vim

```bash
pkg install vim
```

```bash
vim plik.md
```

---

## Neovim

```bash
pkg install neovim
```

```bash
nvim plik.md
```

---

## nano

```bash
pkg install nano
```

---

## micro

Jeśli pakiet znajduje się w aktualnym repozytorium:

```bash
pkg search micro
```

---

## W praktyce

Jeśli na Debianie i FreeBSD używasz Vima/Neovima, warto zachować to samo środowisko również w Termuxie.

Dzięki temu:

```text
telefon
laptop
serwer
FreeBSD
```

mogą mieć bardzo podobny workflow.

---

# 13. Programowanie i kompilacja

Termux może być pełnoprawnym lekkim środowiskiem developerskim.

Nadaje się szczególnie do:

- Go,
- Python,
- C,
- C++,
- JavaScript/Node.js,
- Rust,
- shell scripts.

Niektóre duże frameworki mogą jednak zakładać glibc lub pełny Linux i wymagać poprawek.

---

# 14. Python

Instalacja:

```bash
pkg install python
```

Sprawdzenie:

```bash
python --version
```

Interpreter:

```bash
python
```

Przykład:

```python
print("Hello z Termuxa")
```

---

## pip

```bash
pip install nazwa_pakietu
```

---

## venv

```bash
python -m venv .venv
```

Aktywacja:

```bash
source .venv/bin/activate
```

Wyjście:

```bash
deactivate
```

---

## Uruchomienie pliku

```bash
python script.py
```

Termux jest bardzo wygodnym środowiskiem do:

- automatyzacji,
- parsowania danych,
- prostych serwerów,
- skryptów,
- pracy z API.

---

# 15. Go

Instalacja:

```bash
pkg install golang
```

Sprawdzenie:

```bash
go version
```

Nowy projekt:

```bash
mkdir hello
cd hello
go mod init hello
```

`main.go`:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello z Androida")
}
```

Uruchomienie:

```bash
go run .
```

Kompilacja:

```bash
go build
```

Uruchomienie:

```bash
./hello
```

Powstaje natywny program dla ARM64/Androida.

Go bardzo dobrze nadaje się w Termuxie do:

- narzędzi CLI,
- lokalnych backendów,
- prostych serwerów HTTP,
- narzędzi sieciowych.

---

# 16. C i C++

Termux używa Clanga.

Instalacja:

```bash
pkg install clang
```

Przykład:

```c
#include <stdio.h>

int main(void) {
    printf("Hello\n");
    return 0;
}
```

Kompilacja:

```bash
clang hello.c -o hello
```

Uruchomienie:

```bash
./hello
```

---

## make

```bash
pkg install make
```

---

## cmake

```bash
pkg install cmake
```

---

## Narzędzia

Przydatne:

```bash
pkg install clang make cmake pkg-config
```

Nie wszystkie projekty z klasycznego Linuxa skompilują się bez zmian.

Najczęstsze problemy:

- założenie obecności glibc,
- `/usr/bin`,
- `/bin/bash`,
- brak funkcji dostępnych w glibc,
- zależności specyficzne dla Linux desktop/server.

---

# 17. Node.js i JavaScript

Instalacja:

```bash
pkg install nodejs
```

Sprawdzenie:

```bash
node --version
npm --version
```

Uruchomienie:

```bash
node app.js
```

Projekt:

```bash
mkdir app
cd app
npm init -y
```

Instalacja Express:

```bash
npm install express
```

Termux dobrze nadaje się do:

- prostych backendów,
- skryptów JS,
- testowania aplikacji,
- zarządzania projektami frontendowymi.

Ciężkie środowiska frontendowe mogą zużywać dużo RAM-u i baterii.

---

# 18. Serwery WWW

Telefon może lokalnie uruchomić serwer HTTP.

---

## Python

```bash
python -m http.server 8000
```

Potem:

```text
http://127.0.0.1:8000
```

---

## Go

Program:

```go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello z Pixela")
    })

    http.ListenAndServe(":8080", nil)
}
```

Uruchomienie:

```bash
go run .
```

---

## nginx

Jeżeli znajduje się w aktywnym repozytorium:

```bash
pkg search nginx
pkg install nginx
```

Konfiguracja znajduje się w obrębie `$PREFIX`.

---

## Porty uprzywilejowane

Bez roota nie zakładaj możliwości bindu do:

```text
80
443
22
```

Zamiast tego używaj:

```text
8080
8443
8022
```

---

# 19. Usługi i procesy działające w tle

Android nie jest klasycznym serwerem.

Może ograniczać procesy aplikacji ze względu na:

- baterię,
- pamięć,
- politykę procesów w tle.

---

## 19.1. termux-services

Termux posiada pakiet wykorzystujący `runit`.

Instalacja:

```bash
pkg install termux-services
```

Po instalacji należy ponownie uruchomić shell.

---

## Start usługi

```bash
sv up NAZWA
```

---

## Stop

```bash
sv down NAZWA
```

---

## Włączenie autostartu w obrębie mechanizmu usług

```bash
sv-enable NAZWA
```

---

## Wyłączenie

```bash
sv-disable NAZWA
```

---

## Status

```bash
sv status NAZWA
```

Logi usług mogą znajdować się w:

```text
$PREFIX/var/log/sv/NAZWA/current
```

---

## 19.2. Wake lock

Jeśli aplikacja ma długo pracować:

```bash
termux-wake-lock
```

Zwolnienie:

```bash
termux-wake-unlock
```

Nie jest to gwarancja wiecznego działania procesu — Android nadal posiada własne mechanizmy zarządzania aplikacjami.

---

# 20. Termux:API — sterowanie Androidem z shella

Termux:API jest dodatkiem wystawiającym wybrane funkcje Androida do linii poleceń.

Potrzebne są:

1. aplikacja Termux:API,
2. pakiet CLI:

```bash
pkg install termux-api
```

---

## Przykłady

### Stan baterii

```bash
termux-battery-status
```

---

### Schowek

Odczyt:

```bash
termux-clipboard-get
```

Zapis:

```bash
echo "tekst" | termux-clipboard-set
```

---

### Powiadomienie

```bash
termux-notification \
  --title "Termux" \
  --content "Skrypt zakończył działanie"
```

---

### Wibracja

```bash
termux-vibrate
```

---

### Informacje o Wi-Fi

W zależności od wersji Androida i przyznanych uprawnień:

```bash
termux-wifi-connectioninfo
```

---

## Do czego to jest przydatne

Można tworzyć skrypty typu:

```text
sprawdź coś
↓
jeżeli warunek spełniony
↓
wyślij androidowe powiadomienie
```

albo:

```text
odczytaj baterię
↓
przetwórz JSON
↓
zapisz log
```

To jest jedna z najciekawszych cech Termuxa.

---

# 21. proot-distro — Debian i inne dystrybucje

Termux może uruchomić dodatkowy userspace dystrybucji Linux.

Najpopularniejszym sposobem jest:

```bash
pkg install proot-distro
```

---

## Lista

```bash
proot-distro list
```

---

## Debian

```bash
proot-distro install debian
```

Login:

```bash
proot-distro login debian
```

Można zobaczyć prompt przypominający:

```text
root@localhost:~#
```

---

## To nie jest prawdziwy root

Bardzo ważne:

```text
root w PRoot
≠
UID 0 kernela Androida
```

PRoot tworzy dla procesu iluzję innego root filesystemu i użytkownika.

Nadal:

- nie dostajesz prawdziwych capabilities kernela,
- nie możesz normalnie zarządzać hostem,
- nie możesz ładować modułów,
- nie dostajesz prawdziwego mount,
- Docker nadal nie staje się normalnie dostępny.

---

## Po co proot-distro

Jest przydatne, gdy potrzebujesz:

- pakietu dostępnego dla Debiana,
- typowej hierarchii `/usr`, `/etc`, `/var`,
- narzędzi zakładających glibc,
- środowiska zbliżonego do serwera Linux.

---

## Koszt

PRoot powoduje dodatkowy narzut.

Jeżeli program działa natywnie w Termuxie, zwykle lepiej uruchomić go bezpośrednio:

```text
Termux native
```

zamiast:

```text
Termux → PRoot → Debian → program
```

---

# 22. Co daje root

Po zrootowaniu Androida Termux może korzystać z:

```bash
su
```

i uzyskać prawdziwe uprawnienia UID 0.

Zmienia to możliwości bardzo mocno.

Potencjalnie dostępne stają się między innymi:

- większa część `/data`,
- konfiguracja sieci,
- routing,
- firewall,
- mount,
- namespaces,
- wybrane sysctl,
- procesy innych użytkowników,
- chroot,
- głębsza diagnostyka systemu.

Dokładne możliwości zależą od:

- kernela,
- SELinux,
- buildu Androida,
- Magiska,
- konfiguracji urządzenia.

Root nie zmienia Androida magicznie w Debiana.

Nadal istnieją:

- Android framework,
- SELinux,
- Bionic,
- Android init,
- Verified Boot / mechanizmy rozruchu,
- specyficzna architektura systemu.

---

# 23. Czego Termux nie potrafi bez roota

Typowe ograniczenia:

## Mount

```bash
mount ...
```

nie działa jak na normalnym serwerze.

---

## Moduły kernela

```bash
modprobe
insmod
rmmod
```

w praktyce odpadają.

---

## Firewall systemowy

Nie możesz dowolnie administrować systemowym firewallem tak jak root na Debianie.

---

## Routing systemowy

Nie masz pełnych praw administratora do tablic routingu całego Androida.

---

## Sysctl

Odczyt części wartości jest możliwy:

```bash
sysctl -a
```

ale zmiany wymagają odpowiednich praw.

---

## Inne aplikacje

Nie możesz po prostu:

```bash
cd /data/data/com.whatsapp
```

i czytać prywatnych danych aplikacji.

---

## PID 1

Termux nie kontroluje startu systemu.

Android ma własne `init`.

Nie uruchomisz Termuxa jako zwykłej dystrybucji z:

```text
kernel
→ systemd
→ services
```

---

# 24. Docker i kontenery

Standardowy Docker potrzebuje odpowiednich funkcji kernela i uprawnień, między innymi:

- namespaces,
- cgroups,
- mount namespaces,
- capabilities,
- overlay filesystem,
- konfiguracji sieci.

Nierootowany Termux nie ma normalnego dostępu do tych mechanizmów.

Dlatego:

```bash
docker run ...
```

nie jest typowym rozwiązaniem dla zwykłego Termuxa.

---

## PRoot to nie Docker

PRoot:

- emuluje pewne zachowania filesystemu i procesu,
- nie tworzy prawdziwego kontenera kernela,
- nie daje prawdziwego roota.

Schemat:

```text
Debian userspace
      ↓
PRoot
      ↓
Termux
      ↓
Android
      ↓
Linux kernel
```

---

## Jeśli potrzebujesz Dockera

Najprościej:

```text
Termux
↓ SSH
VPS Debian
↓
Docker
```

Telefon staje się wtedy świetnym terminalem administracyjnym.

---

# 25. Sieć

Termux posiada wiele klasycznych narzędzi.

Przydatne pakiety:

```bash
pkg install iproute2
pkg install net-tools
pkg install dnsutils
pkg install traceroute
pkg install nmap
pkg install curl
pkg install wget
pkg install openssh
```

---

## Interfejsy

```bash
ip addr
```

---

## Routing

```bash
ip route
```

Odczyt jest czym innym niż możliwość modyfikacji.

---

## DNS

```bash
nslookup example.com
```

lub:

```bash
dig example.com
```

---

## Porty

```bash
ss -tulpn
```

Niektóre informacje mogą być ograniczone przez Androida.

---

## curl

```bash
curl https://example.com
```

Nagłówki:

```bash
curl -I https://example.com
```

---

## wget

```bash
wget https://example.com/file
```

---

# 26. Backup i migracja Termuxa

Najważniejsze dane zwykle są w:

```text
$HOME
```

oraz część konfiguracji w:

```text
$PREFIX/etc
```

---

## Backup HOME

```bash
tar -czf termux-home.tar.gz -C "$HOME" .
```

Następnie można skopiować archiwum do:

```text
~/storage/downloads
```

---

## Repozytoria Git

Najlepszy backup kodu to oczywiście również:

```bash
git push
```

---

## Lista pakietów

```bash
pkg list-installed > packages.txt
```

Można przechować ją razem z backupem.

---

## Klucze SSH

Szczególnie ważny katalog:

```text
~/.ssh
```

Nie wysyłaj prywatnych kluczy do publicznych repozytoriów.

---

# 27. Bezpieczeństwo

Termux ma sporą moc, mimo że działa bez roota.

---

## Nie wykonuj bezmyślnie

```bash
curl URL | bash
```

To pobiera kod z internetu i natychmiast go wykonuje.

Lepiej:

```bash
curl -O URL
less plik
```

dopiero potem uruchamiać.

---

## SSH

Preferuj:

```text
klucze ed25519
```

zamiast słabego hasła.

---

## Serwer SSH w telefonie

Jeśli uruchamiasz:

```bash
sshd
```

pamiętaj, że otwierasz usługę sieciową.

Nie wystawiaj jej bez potrzeby do internetu.

---

## Sekrety

Nie przechowuj tokenów API bez potrzeby w:

```text
publicznym repo
skryptach commitowanych do Git
historii shella
```

Przydatne:

```bash
export OPENAI_API_KEY="..."
```

lecz nawet wtedy warto rozważyć bezpieczniejszy storage, jeśli sekret ma zostać na urządzeniu długo.

---

# 28. Wydajność i bateria

Termux działa natywnie, więc potrafi być bardzo szybki.

CPU telefonu może bez problemu:

- kompilować małe projekty,
- uruchamiać serwer,
- wykonywać Python,
- uruchamiać Go,
- obsługiwać SSH,
- wykonywać Git.

Problemy zaczynają się przy:

- długich kompilacjach,
- dużych projektach Node,
- ciężkich bazach,
- procesach działających cały dzień,
- dużym obciążeniu CPU.

Android może:

- ograniczyć aplikację,
- zamrozić ją,
- zakończyć proces,
- ograniczyć pracę w tle.

Telefon dodatkowo ma ograniczenia termiczne.

---

# 29. Najczęstsze problemy

## `command not found`

Najpierw:

```bash
pkg search NAZWA
```

---

## Pakiety nie działają po długim czasie

```bash
pkg update
pkg upgrade
```

Termux i jego biblioteki powinny być aktualizowane spójnie.

---

## Program z Debiana nie uruchamia się

Możliwy powód:

```text
program wymaga glibc
Termux używa Bionic
```

Rozwiązania:

- znajdź pakiet Termuxa,
- skompiluj ze źródła,
- użyj `proot-distro`.

---

## Skrypt ma `#!/bin/bash`

W Termuxie klasyczne:

```text
/bin/bash
```

nie jest lokalizacją Bash Termuxa.

Lepsze rozwiązanie przenośne:

```bash
#!/usr/bin/env bash
```

---

## `Permission denied` w `/sdcard`

Współdzielona pamięć Androida ma inne zasady i może być zamontowana jako `noexec`.

Przenieś kod do:

```bash
~/projects
```

---

## Proces zniknął po pewnym czasie

Prawdopodobnie Android ograniczył aplikację.

Można rozważyć:

```bash
termux-wake-lock
```

oraz ustawienia baterii Androida dla Termuxa.

---

## Termux:API nie działa

Sprawdź:

- czy aplikacja Termux:API jest zainstalowana,
- czy pakiet `termux-api` jest zainstalowany,
- czy Termux i Termux:API pochodzą ze zgodnego źródła,
- czy Android przyznał potrzebne uprawnienia.

---

# 30. Przykłady z prawdziwego życia

## 30.1. Telefon jako awaryjny terminal do VPS

Instalacja:

```bash
pkg install openssh
```

Konfiguracja:

```bash
vim ~/.ssh/config
```

```text
Host vps
    HostName 203.0.113.20
    User user
    IdentityFile ~/.ssh/id_ed25519
```

Potem wystarczy:

```bash
ssh vps
```

Telefon staje się pełnoprawnym terminalem administracyjnym.

---

## 30.2. Szybka poprawka w projekcie Git

```bash
cd ~/projects/example-site
git pull
vim README.md
git diff
git add README.md
git commit -m "Update README"
git push
```

---

## 30.3. Test prostej strony

```bash
cd ~/projects/site
python -m http.server 8000
```

W przeglądarce telefonu:

```text
http://127.0.0.1:8000
```

---

## 30.4. Lokalny backend w Go

```bash
cd ~/projects/api
go run .
```

Jeśli aplikacja słucha na:

```text
:8080
```

otwierasz:

```text
http://127.0.0.1:8080
```

---

## 30.5. Skrypt powiadamiający o zakończeniu zadania

```bash
#!/usr/bin/env bash

make build

if [ $? -eq 0 ]; then
    termux-notification \
        --title "Build" \
        --content "Kompilacja zakończona poprawnie"
else
    termux-notification \
        --title "Build" \
        --content "Kompilacja zakończona błędem"
fi
```

---

## 30.6. Monitorowanie strony

Przykład bardzo prostego skryptu:

```bash
#!/usr/bin/env bash

URL="https://example.com"

if curl -fsS "$URL" >/dev/null; then
    echo "$(date) OK"
else
    echo "$(date) ERROR"
    termux-notification \
        --title "Monitoring" \
        --content "$URL nie odpowiada"
fi
```

---

## 30.7. Telefon jako prosty serwer plików w LAN

```bash
cd ~/storage/shared
python -m http.server 8000 --bind 0.0.0.0
```

Sprawdź IP telefonu:

```bash
ip addr
```

Na komputerze:

```text
http://IP_TELEFONU:8000
```

Nie wystawiaj takiej usługi do publicznego internetu bez zabezpieczeń.

---

## 30.8. Debian w kieszeni

```bash
pkg install proot-distro
proot-distro install debian
proot-distro login debian
```

W środku:

```bash
apt update
apt install htop
```

Pamiętaj:

```text
root z PRoot
≠
root Androida
```

---

## 30.9. Termux + tmux + SSH

Bardzo praktyczny workflow:

```bash
tmux
ssh vps
```

Jeśli zamkniesz terminal lub zmienisz sesję:

```bash
tmux attach
```

Pozwala to wygodnie pracować na małym ekranie.

---

# 31. Ściąga

## Aktualizacja

```bash
pkg update && pkg upgrade
```

## Instalacja

```bash
pkg install NAZWA
```

## Szukanie

```bash
pkg search NAZWA
```

## HOME

```bash
echo $HOME
cd ~
```

## PREFIX

```bash
echo $PREFIX
```

## Pamięć telefonu

```bash
termux-setup-storage
cd ~/storage/shared
```

## SSH

```bash
pkg install openssh
ssh user@host
```

## Serwer SSH

```bash
sshd
```

Domyślny port Termuxa jest zwykle:

```text
8022
```

## Git

```bash
pkg install git
git clone URL
```

## Vim

```bash
pkg install vim
vim plik
```

## Neovim

```bash
pkg install neovim
nvim plik
```

## Python

```bash
pkg install python
python script.py
```

## Go

```bash
pkg install golang
go run .
go build
```

## C/C++

```bash
pkg install clang
clang hello.c -o hello
```

## Node

```bash
pkg install nodejs
node app.js
```

## tmux

```bash
pkg install tmux
tmux
```

## Debian

```bash
pkg install proot-distro
proot-distro install debian
proot-distro login debian
```

## Termux API

```bash
pkg install termux-api
termux-battery-status
```

## Wake lock

```bash
termux-wake-lock
termux-wake-unlock
```

## Informacje o systemie

```bash
uname -a
uname -m
cat /proc/version
id
echo $HOME
echo $PREFIX
```

---

# Model mentalny Termuxa

Jeśli zapamiętać tylko jedną rzecz, to tę:

```text
                  ┌───────────────────────────┐
                  │          Android          │
                  │                           │
                  │   Termux jest aplikacją   │
                  │                           │
                  │  ┌─────────────────────┐  │
                  │  │ Termux userspace    │  │
                  │  │                     │  │
                  │  │ bash                │  │
                  │  │ vim                 │  │
                  │  │ ssh                 │  │
                  │  │ git                 │  │
                  │  │ Python              │  │
                  │  │ Go                  │  │
                  │  │ clang               │  │
                  │  └─────────┬───────────┘  │
                  │            │              │
                  │          Bionic           │
                  │            │              │
                  └────────────┼──────────────┘
                               │ syscalls
                               ▼
                  ┌───────────────────────────┐
                  │ Linux kernel Androida     │
                  └────────────┬──────────────┘
                               │
                               ▼
                  ┌───────────────────────────┐
                  │ ARM64 / sprzęt telefonu   │
                  └───────────────────────────┘
```

Termux nie udaje Linuxa.

Termux uruchamia uniksowe programy **bezpośrednio na Linuxie Androida**, ale jako aplikacja ograniczona przez model bezpieczeństwa Androida.

To właśnie jednocześnie daje mu:

- wysoką wydajność,
- bardzo mały narzut,
- dostęp do wielu narzędzi Unix,
- oraz charakterystyczne ograniczenia.

---

# Kiedy używać czego

## Termux natywny

Najlepszy wybór do:

```text
SSH
Git
Vim
Python
Go
C
Node
shell
curl
rsync
narzędzia CLI
proste serwery
automatyzacja
```

## proot-distro

Użyj, kiedy:

```text
potrzebujesz glibc
potrzebujesz typowego Debiana
pakiet nie istnieje w Termuxie
program zakłada klasyczny root filesystem
```

## Debian/VPS

Użyj, kiedy potrzebujesz:

```text
Docker
systemd
pełne usługi serwerowe
firewall
klasyczna administracja
stabilna praca 24/7
```

## Rootowany Android

Użyj jako laboratorium, kiedy chcesz badać:

```text
Android od środka
procesy
mount
routing
firewall
/data
namespaces
kernel interfaces
```

---

# 32. Źródła

Oficjalne źródła projektu:

- Termux App: https://github.com/termux/termux-app
- Termux Packages: https://github.com/termux/termux-packages
- Termux execution environment:
  https://github.com/termux/termux-packages/wiki/Termux-execution-environment
- Termux:API: https://github.com/termux/termux-api
- termux-services: https://github.com/termux/termux-services
- proot-distro: https://github.com/termux/proot-distro

Najważniejsze techniczne fakty użyte w tym kompendium:

- Termux domyślnie wykonuje programy natywnie na kernelu Androida.
- Nie uruchamia własnego kernela.
- Pakiety są budowane dla Android NDK i Bionic libc.
- Standardowym rootfs Termuxa jest `/data/data/com.termux/files`.
- `$HOME` znajduje się standardowo w `/data/data/com.termux/files/home`.
- `$PREFIX` wskazuje standardowo `/data/data/com.termux/files/usr`.
- `termux-services` wykorzystuje `runit`.
- `proot-distro` nie zapewnia prawdziwego roota kernela.
- Termux:API udostępnia wybrane funkcje Androida programom linii poleceń.
- Stabilne źródła aplikacji to przede wszystkim F-Droid i GitHub; gałąź Google Play jest rozwijana osobno i ma inne ograniczenia.

---

# Podsumowanie

Termux najlepiej traktować jako:

> **natywny uniksowy warsztat działający wewnątrz sandboxa Androida.**

Nie zastępuje Debiana ani FreeBSD, ale bardzo dobrze je uzupełnia.

Na telefonie może zapewnić:

```text
shell
SSH
Git
Vim
Python
Go
C/C++
Node.js
proste serwery
automatyzację
narzędzia sieciowe
integrację z Androidem
```

A dzięki SSH może być również kieszonkową konsolą administracyjną do:

```text
VPS
homelabu
Debiana
FreeBSD
routera
serwera NAS
```

W praktyce to jeden z najciekawszych sposobów, żeby zmienić telefon z urządzenia wyłącznie konsumpcyjnego w mały komputer Unix.
