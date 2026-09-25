---
id: "doc-033"
title: "Debian - desktop i serwer"
slug: "debian-desktop-i-serwer"
description: "Debian to stabilna, uniwersalna dystrybucja GNU/Linux używana zarówno na komputerach osobistych, jak i na serwerach. To kompendium zbiera najważniejsze…"
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-25"
tags:
  - "debian"
  - "linux"
  - "gnome"
  - "kde"
  - "server"
---

# Debian - desktop i serwer

Debian to stabilna, uniwersalna dystrybucja GNU/Linux używana zarówno na komputerach osobistych, jak i na serwerach. To kompendium zbiera najważniejsze mechanizmy potrzebne do codziennej pracy: pakiety, usługi, logi, sieć, uprawnienia, storage, środowiska GNOME/KDE oraz podstawy administracji serwerem.

**Kiedy ten materiał jest przydatny:** przy konfiguracji nowego systemu, utrzymaniu stacji roboczej, administracji VPS-em, diagnozowaniu usług i sieci oraz wtedy, gdy trzeba zrozumieć, gdzie Debian przechowuje konfigurację i stan systemu.

**Punkt odniesienia:** Debian 13 „Trixie”. Na 20 września 2026 aktualnym wydaniem stable jest **13.7**. Numer punktowy może się zmieniać, ale opisane tu podstawowe mechanizmy Debiana 13 pozostają te same.

Tematy rozwijane osobno: [SSH i zdalna administracja](techhandbook:doc-018), [Docker](techhandbook:doc-012), [systemd, cron i schedulery](techhandbook:doc-052) oraz [Linux permissions i bezpieczeństwo serwera](techhandbook:doc-025).

## stable

Wersja produkcyjna.

Przykład:

```text
Debian 13 „Trixie”
```

To najlepszy wybór dla:

- serwera,
- zwykłego desktopu,
- laptopa do pracy,
- środowiska, które ma po prostu działać.

## testing

Pakiety, które mają trafić do następnego stable.

Zalety:

- nowsze oprogramowanie,
- nowsze biblioteki,
- nowsze środowiska graficzne.

Wady:

- możliwe przejściowe konflikty,
- czasem zależności są przez kilka dni niespójne,
- gorszy wybór na serwer produkcyjny.

## unstable / Sid

Gałąź rozwojowa.

Nie oznacza, że system cały czas się psuje. „Unstable” oznacza przede wszystkim, że interfejs pakietów i ich wersje stale się zmieniają.

Na serwer produkcyjny - zwykle nie.

---

# 3. Jak zbudowany jest system

W dużym uproszczeniu:

```text
sprzęt
  ↓
firmware / UEFI
  ↓
bootloader GRUB
  ↓
kernel Linux
  ↓
systemd
  ↓
usługi systemowe
  ↓
login / display manager
  ↓
GNOME / KDE albo shell
  ↓
programy użytkownika
```

Najważniejszy podział mentalny:

- **kernel** - obsługa sprzętu, pamięci, procesów, sieci;
- **systemd** - uruchamianie systemu i usług;
- **APT/dpkg** - instalacja i aktualizacja oprogramowania;
- **NetworkManager / systemd-networkd** - sieć;
- **GNOME/KDE** - interfejs desktopowy;
- **OpenSSH** - zdalne logowanie;
- **journald** - logi;
- **nftables** - firewall.

---

# 4. Najważniejsze katalogi

Hierarchia katalogów jest jedną z rzeczy, które trzeba rozumieć.

## `/`

Korzeń całego systemu.

Nie ma odpowiednika „C:, D:, E:” znanego z Windows.

Wszystkie dyski i systemy plików są montowane gdzieś pod `/`.

---

## `/home`

Katalogi użytkowników.

Przykład:

```text
/home/user
```

Zawiera:

- Dokumenty,
- Pobrane,
- konfigurację użytkownika,
- profile aplikacji,
- klucze SSH,
- lokalne dane programów.

Ukryte pliki zaczynają się od kropki:

```text
.bashrc
.profile
.config/
.local/
.ssh/
```

---

## `/root`

Katalog domowy użytkownika `root`.

To nie jest to samo co `/`.

---

## `/etc`

Konfiguracja systemu.

To jeden z najważniejszych katalogów administratora.

Przykłady:

```text
/etc/ssh/
/etc/systemd/
/etc/nginx/
/etc/NetworkManager/
/etc/apt/
/etc/fstab
/etc/hosts
```

Jeśli zastanawiasz się:

> „Gdzie Linux trzyma konfigurację tej usługi?”

bardzo często odpowiedź brzmi:

```text
/etc
```

---

## `/var`

Dane zmienne.

Przykłady:

```text
/var/log
/var/lib
/var/cache
/var/www
```

Typowe zastosowania:

- logi,
- bazy danych,
- cache,
- dane usług,
- strony WWW.

---

## `/usr`

Programy i biblioteki dostarczane przez system.

Przykłady:

```text
/usr/bin
/usr/sbin
/usr/lib
/usr/share
```

---

## `/bin`, `/sbin`, `/lib`

W nowoczesnym Debianie są zwykle powiązane z odpowiednimi katalogami w `/usr`.

---

## `/tmp`

Pliki tymczasowe.

Ich zawartość może zniknąć przy restarcie.

---

## `/run`

Dane bieżącego uruchomienia systemu.

Np.:

- PID-y,
- sockety,
- informacje o aktywnych usługach.

Po restarcie zawartość jest odtwarzana.

---

## `/mnt`

Tradycyjne miejsce do ręcznego montowania systemów plików.

Np.:

```bash
sudo mount /dev/sdb1 /mnt
```

---

## `/media`

Często wykorzystywany przez środowiska desktopowe do automatycznego montowania pendrive'ów i dysków USB.

---

## `/opt`

Dodatkowe oprogramowanie instalowane poza typowym systemem pakietów.

---

# 5. Użytkownicy i uprawnienia

Linux jest od początku systemem wieloużytkownikowym.

Każdy plik ma:

- właściciela,
- grupę,
- uprawnienia.

Sprawdzenie:

```bash
ls -l
```

Przykład:

```text
-rw-r--r-- 1 user user 1240 Sep 19 08:00 notatki.md
```

Interpretacja:

```text
rw-   właściciel
r--   grupa
r--   pozostali
```

---

# 6. root i sudo

`root` jest administratorem systemu.

Ma praktycznie nieograniczone prawa.

W Debianie administrację najlepiej wykonywać poprzez:

```bash
sudo polecenie
```

Przykład:

```bash
sudo apt update
```

Zamiast pracować cały czas jako root.

Wejście do shella root:

```bash
sudo -i
```

Wyjście:

```bash
exit
```

---

# 7. chmod, chown i grupy

## zmiana właściciela

```bash
sudo chown user:user plik
```

Rekurencyjnie:

```bash
sudo chown -R user:user katalog
```

---

## zmiana praw

```bash
chmod 644 plik
```

Typowe wartości:

```text
644 - zwykły plik
755 - katalog lub skrypt wykonywalny
600 - plik prywatny
700 - prywatny katalog
```

Przykład:

```bash
chmod 600 ~/.ssh/id_ed25519
```

---

## dodanie użytkownika do grupy

```bash
sudo usermod -aG docker user
```

Po zmianie grup zwykle należy się wylogować i zalogować ponownie.

Sprawdzenie grup:

```bash
groups
```

---

# 8. Zarządzanie pakietami - APT

To jeden z fundamentów Debiana.

APT zarządza:

- repozytoriami,
- zależnościami,
- instalacją,
- aktualizacjami,
- usuwaniem pakietów.

---

# 9. Aktualizacja systemu

Najważniejszy duet:

```bash
sudo apt update
sudo apt upgrade
```

`apt update`:

- nie aktualizuje programów,
- pobiera aktualną listę pakietów.

`apt upgrade`:

- aktualizuje zainstalowane pakiety.

Bardziej agresywne rozwiązywanie zależności:

```bash
sudo apt full-upgrade
```

Przy normalnym stable najczęściej wystarczy:

```bash
sudo apt update
sudo apt upgrade
```

---

# 10. Instalowanie pakietów

```bash
sudo apt install nazwa
```

Przykład:

```bash
sudo apt install vim git curl
```

Kilka jednocześnie:

```bash
sudo apt install vim git curl wget htop
```

---

# 11. Usuwanie pakietów

Usunięcie programu:

```bash
sudo apt remove nginx
```

Usunięcie programu i jego konfiguracji systemowej:

```bash
sudo apt purge nginx
```

Usunięcie niepotrzebnych zależności:

```bash
sudo apt autoremove
```

---

# 12. Szukanie pakietów

```bash
apt search nginx
```

Informacje:

```bash
apt show nginx
```

Sprawdzenie, czy pakiet jest zainstalowany:

```bash
dpkg -l | grep nginx
```

---

# 13. dpkg

APT działa wyżej. `dpkg` jest narzędziem niższego poziomu.

Instalacja lokalnego `.deb`:

```bash
sudo dpkg -i program.deb
```

Lepsza metoda:

```bash
sudo apt install ./program.deb
```

APT potrafi wtedy automatycznie dociągnąć zależności.

---

# 14. Repozytoria APT

Konfiguracja znajduje się głównie w:

```text
/etc/apt/
```

Na Debianie 13 spotkasz między innymi pliki typu:

```text
/etc/apt/sources.list.d/debian.sources
```

Po zmianie repozytoriów:

```bash
sudo apt update
```

---

# 15. main, contrib, non-free, non-free-firmware

Repozytoria mogą zawierać różne sekcje.

## main

Wolne oprogramowanie spełniające zasady Debiana.

## contrib

Wolne oprogramowanie zależne od elementów spoza `main`.

## non-free

Pakiety niewolne.

## non-free-firmware

Firmware potrzebny np. do:

- Wi-Fi,
- GPU,
- kart sieciowych,
- części laptopów.

Na współczesnym desktopie sekcja firmware jest często niezbędna.

---

# 16. Flatpak

Na desktopie warto znać Flatpaka.

Instalacja:

```bash
sudo apt install flatpak
```

Dodanie Flathub:

```bash
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

Instalowanie:

```bash
flatpak install flathub ID.programu
```

Lista:

```bash
flatpak list
```

Aktualizacja:

```bash
flatpak update
```

Usuwanie:

```bash
flatpak uninstall ID.programu
```

Flatpak jest dobry dla aplikacji desktopowych, które chcemy mieć nowsze niż wersje dostępne w stable.

---

# 17. Co instalować przez APT, a co przez Flatpak

Dobra reguła:

## APT

Używaj dla:

- bibliotek,
- sterowników,
- serwerów,
- usług,
- CLI,
- narzędzi programistycznych,
- komponentów systemu.

Przykłady:

```text
nginx
git
vim
openssh-server
postgresql
curl
gcc
```

## Flatpak

Dobrze pasuje do:

- komunikatorów,
- aplikacji multimedialnych,
- narzędzi desktopowych,
- aplikacji, których chcesz mieć nowszą wersję.

---

# 18. Debian jako desktop

Desktop Linux składa się z kilku warstw.

```text
kernel
↓
sterowniki
↓
Wayland / X11
↓
display manager
↓
GNOME lub KDE
↓
aplikacje
```

---

# 19. GNOME

GNOME stawia na:

- prostotę,
- małą liczbę opcji widocznych na pierwszy rzut oka,
- workflow oparty na Activities,
- wirtualne pulpity,
- Wayland.

Display manager:

```text
gdm3
```

Pakiety mogą obejmować:

```text
gnome
gnome-core
gdm3
```

---

# 20. KDE Plasma

KDE Plasma jest bardziej konfigurowalne.

Charakterystyka:

- klasyczny pulpit,
- panel,
- menu aplikacji,
- ogromna liczba ustawień,
- rozbudowane skróty,
- bardzo konfigurowalny wygląd.

Display manager najczęściej:

```text
sddm
```

Pakiety:

```text
kde-standard
kde-plasma-desktop
sddm
```

---

# 21. GNOME kontra KDE

W uproszczeniu:

| Cecha | GNOME | KDE |
|---|---|---|
| filozofia | minimalizm | konfiguracja |
| ustawienia | proste | bardzo rozbudowane |
| workflow | Activities | klasyczny desktop |
| manager logowania | GDM | SDDM |
| menedżer plików | Files / Nautilus | Dolphin |
| terminal | GNOME Console/Terminal | Konsole |
| ustawienia | GNOME Settings | System Settings |

Oba są pełnoprawnymi środowiskami.

Nie istnieje techniczny powód, by Debian „musiał” używać jednego z nich.

---

# 22. Można mieć GNOME i KDE jednocześnie

Tak.

Na ekranie logowania można wybrać sesję.

Jednak instalowanie wielu pełnych środowisk powoduje:

- duplikację aplikacji,
- kilka terminali,
- kilka edytorów,
- kilka narzędzi ustawień,
- czasem bałagan z domyślnymi aplikacjami.

Do testów - OK.

Na głównym systemie wygodniej zwykle wybrać jedno.

---

# 23. Wayland i X11

Współczesny Debian preferuje Wayland.

Wayland odpowiada za komunikację między aplikacjami a systemem graficznym.

Starszy system:

```text
X11 / Xorg
```

Wayland daje m.in.:

- lepszą izolację aplikacji,
- nowocześniejszą obsługę ekranów,
- lepszą architekturę bezpieczeństwa.

X11 nadal może być przydatny dla niektórych starszych aplikacji.

Sprawdzenie sesji:

```bash
echo $XDG_SESSION_TYPE
```

Może zwrócić:

```text
wayland
```

lub:

```text
x11
```

---

# 24. Display manager

Display manager pokazuje ekran logowania.

GNOME:

```text
gdm3
```

KDE:

```text
sddm
```

Status:

```bash
systemctl status gdm3
```

albo:

```bash
systemctl status sddm
```

Restart:

```bash
sudo systemctl restart gdm3
```

UWAGA: zakończy to aktywną sesję graficzną.

---

# 25. NetworkManager

Na desktopie Debian zwykle korzysta z NetworkManagera.

GUI:

- GNOME Settings,
- KDE System Settings.

CLI:

```bash
nmcli
```

Lista urządzeń:

```bash
nmcli device
```

Połączenia:

```bash
nmcli connection show
```

Aktywne:

```bash
nmcli connection show --active
```

Wi-Fi:

```bash
nmcli device wifi list
```

Połączenie:

```bash
nmcli device wifi connect "SSID" password "HASLO"
```

---

# 26. Sprawdzanie adresów IP

Nowoczesne narzędzie:

```bash
ip addr
```

Krócej:

```bash
ip a
```

Routing:

```bash
ip route
```

Typowy wynik:

```text
default via 192.168.1.1 dev enp3s0
```

oznacza bramę domyślną.

---

# 27. Interfejsy sieciowe

Nazwy typu:

```text
enp3s0
wlp2s0
```

są przewidywalnymi nazwami interfejsów.

Typowo:

```text
en...  Ethernet
wl...  Wi-Fi
```

---

# 28. DNS

Sprawdzenie resolvera:

```bash
resolvectl status
```

Plik:

```text
/etc/resolv.conf
```

może być generowany automatycznie.

Nie należy go zawsze ręcznie edytować.

W systemie desktopowym DNS-em zazwyczaj zarządza NetworkManager.

---

# 29. Testowanie sieci

Czy działa IP:

```bash
ping 1.1.1.1
```

Czy działa DNS:

```bash
ping debian.org
```

Jeżeli:

```text
ping 1.1.1.1
```

działa, ale:

```text
ping debian.org
```

nie działa, problem najprawdopodobniej dotyczy DNS.

---

# 30. curl i wget

Pobranie strony:

```bash
curl https://example.com
```

Nagłówki HTTP:

```bash
curl -I https://example.com
```

Pobranie pliku:

```bash
wget https://example.com/file.zip
```

---

# 31. Audio - PipeWire

Współczesny Debian korzysta przede wszystkim z PipeWire.

Elementy:

```text
PipeWire
WirePlumber
PulseAudio compatibility layer
```

Sprawdzenie:

```bash
systemctl --user status pipewire
```

oraz:

```bash
systemctl --user status wireplumber
```

---

# 32. Bluetooth

Typowa usługa:

```bash
systemctl status bluetooth
```

Restart:

```bash
sudo systemctl restart bluetooth
```

CLI:

```bash
bluetoothctl
```

---

# 33. Sterowniki i firmware

Linux posiada ogromną część sterowników w jądrze.

Dlatego zwykle nie instaluje się osobnych „driver packages” jak w Windows.

Jednak firmware może być dostarczany jako pakiety.

Diagnostyka sprzętu:

```bash
lspci
```

USB:

```bash
lsusb
```

Kernel wykrył urządzenie:

```bash
dmesg
```

---

# 34. NVIDIA

NVIDIA jest szczególnym przypadkiem.

Debian może korzystać z:

- otwartego Nouveau,
- oficjalnego sterownika NVIDIA.

Pakiety sterownika zależą od generacji GPU.

Najpierw warto sprawdzić sprzęt:

```bash
lspci | grep -i nvidia
```

Informacje o rekomendowanych sterownikach:

```bash
apt search nvidia-driver
```

---

# 35. Intel i AMD

Dla większości współczesnych układów Intel i AMD sterownik graficzny znajduje się bezpośrednio w:

- kernelu,
- Mesa.

Zwykle nic nie trzeba instalować ręcznie.

---

# 36. Laptop - bateria i energia

Stan baterii:

```bash
upower -i "$(upower -e | grep BAT)"
```

Informacje z sysfs:

```bash
cat /sys/class/power_supply/BAT0/capacity
```

Nie każdy laptop nazywa baterię `BAT0`.

---

# 37. Uśpienie

Polecenie:

```bash
systemctl suspend
```

Hibernacja:

```bash
systemctl hibernate
```

Dostępność hibernacji zależy m.in. od:

- swap,
- konfiguracji kernela,
- firmware.

---

# 38. Drukarki

Linux wykorzystuje CUPS.

Status:

```bash
systemctl status cups
```

Panel WWW lokalnie:

```text
http://localhost:631
```

Pakiety:

```bash
sudo apt install cups
```

---

# 39. Systemd - serce uruchamiania usług

Debian używa systemd.

Systemd uruchamia:

- sieć,
- SSH,
- serwery,
- display manager,
- harmonogramy,
- usługi użytkowników.

Podstawowa jednostka:

```text
unit
```

Najczęściej spotkasz:

```text
.service
.timer
.socket
.mount
.target
```

---

# 40. systemctl

Status usługi:

```bash
systemctl status nginx
```

Start:

```bash
sudo systemctl start nginx
```

Stop:

```bash
sudo systemctl stop nginx
```

Restart:

```bash
sudo systemctl restart nginx
```

Przeładowanie konfiguracji bez pełnego restartu:

```bash
sudo systemctl reload nginx
```

---

# 41. Włączanie przy starcie

```bash
sudo systemctl enable nginx
```

Wyłączenie:

```bash
sudo systemctl disable nginx
```

Start + enable:

```bash
sudo systemctl enable --now nginx
```

To bardzo przydatna konstrukcja.

---

# 42. Czy usługa działa

```bash
systemctl is-active nginx
```

Czy startuje automatycznie:

```bash
systemctl is-enabled nginx
```

---

# 43. Lista działających usług

```bash
systemctl --type=service --state=running
```

Wszystkie usługi:

```bash
systemctl --type=service
```

---

# 44. Usługi użytkownika

Systemd działa także dla zwykłego użytkownika.

Przykład:

```bash
systemctl --user status pipewire
```

Własne jednostki użytkownika można umieszczać w:

```text
~/.config/systemd/user/
```

---

# 45. Logi - journalctl

Jedno z najważniejszych narzędzi administratora.

Ostatnie logi:

```bash
journalctl
```

Logi bieżącego uruchomienia:

```bash
journalctl -b
```

Poprzedniego uruchomienia:

```bash
journalctl -b -1
```

---

# 46. Log konkretnej usługi

```bash
journalctl -u nginx
```

Ostatnie wpisy:

```bash
journalctl -u nginx -n 50
```

Śledzenie na żywo:

```bash
journalctl -u nginx -f
```

To odpowiednik:

```bash
tail -f
```

dla journald.

---

# 47. Logi kernela

```bash
journalctl -k
```

lub:

```bash
dmesg
```

Przy problemach z:

- dyskiem,
- USB,
- GPU,
- Wi-Fi,
- zasilaniem,

warto zacząć właśnie tutaj.

---

# 48. Procesy

Klasyczne:

```bash
ps aux
```

Interaktywne:

```bash
top
```

Wygodniejsze:

```bash
htop
```

Instalacja:

```bash
sudo apt install htop
```

---

# 49. PID

Każdy proces ma numer:

```text
PID
```

Przykład:

```bash
ps aux | grep nginx
```

Zabicie procesu:

```bash
kill PID
```

Wymuszenie:

```bash
kill -9 PID
```

`kill -9` używaj dopiero, gdy normalne zakończenie nie działa.

---

# 50. pkill i killall

Po nazwie:

```bash
pkill firefox
```

lub:

```bash
killall firefox
```

---

# 51. Pamięć RAM

```bash
free -h
```

Przykład:

```text
Mem:
Swap:
```

Linux wykorzystuje wolny RAM jako cache.

Duża wartość „used” nie oznacza automatycznie problemu.

---

# 52. CPU i load average

```bash
uptime
```

Przykład:

```text
load average: 0.22, 0.30, 0.25
```

To średnie obciążenie z:

- 1 minuty,
- 5 minut,
- 15 minut.

Na maszynie 4-rdzeniowej load `4.0` oznacza mniej więcej pełne wykorzystanie możliwości planowania CPU.

---

# 53. Dyski

Lista urządzeń:

```bash
lsblk
```

Z systemami plików:

```bash
lsblk -f
```

Zajętość:

```bash
df -h
```

Rozmiary katalogów:

```bash
du -sh katalog
```

Największe katalogi:

```bash
du -h --max-depth=1 /var | sort -h
```

---

# 54. Montowanie dysków

Przykład:

```bash
sudo mount /dev/sdb1 /mnt
```

Odmontowanie:

```bash
sudo umount /mnt
```

Nie:

```text
unmount
```

lecz:

```text
umount
```

---

# 55. `/etc/fstab`

Definiuje systemy plików montowane podczas startu.

Przykład:

```text
UUID=xxxx-xxxx /data ext4 defaults 0 2
```

UUID:

```bash
blkid
```

Po zmianie `fstab` warto przetestować:

```bash
sudo mount -a
```

Jeżeli polecenie nie zgłasza błędu, konfiguracja zwykle jest poprawna.

---

# 56. ext4

Domyślny, konserwatywny wybór.

Zalety:

- stabilny,
- prosty,
- bardzo dobrze wspierany,
- łatwy w administracji.

---

# 57. Btrfs

Posiada m.in.:

- snapshoty,
- subvolume,
- checksumming.

Na desktopie może być ciekawy, ale wymaga trochę większej wiedzy.

---

# 58. ZFS

Nie jest częścią głównego kernela Linux.

Świetny dla:

- NAS,
- serwerów,
- dużych zbiorów danych,
- snapshotów,
- mirrorów.

Na zwykłym laptopie zwykle nie jest potrzebny.

---

# 59. SMART

Stan dysku:

```bash
sudo apt install smartmontools
```

Sprawdzenie:

```bash
sudo smartctl -a /dev/sda
```

Dla NVMe:

```bash
sudo smartctl -a /dev/nvme0
```

---

# 60. Debian jako serwer

Serwer Debiana może działać bez GUI.

Typowy minimalny zestaw:

```text
Debian
OpenSSH
systemd
APT
firewall
aplikacje/usługi
```

Brak GNOME/KDE:

- oszczędza RAM,
- zmniejsza liczbę pakietów,
- zmniejsza powierzchnię ataku,
- upraszcza system.

---

# 61. Instalacja SSH

```bash
sudo apt install openssh-server
```

Status:

```bash
systemctl status ssh
```

Włączenie:

```bash
sudo systemctl enable --now ssh
```

---

# 62. Łączenie przez SSH

```bash
ssh user@192.168.1.20
```

Na niestandardowym porcie:

```bash
ssh -p 2222 user@server
```

---

# 63. Klucze SSH

Generowanie:

```bash
ssh-keygen -t ed25519
```

Domyślne pliki:

```text
~/.ssh/id_ed25519
~/.ssh/id_ed25519.pub
```

Klucz prywatny:

```text
id_ed25519
```

NIE udostępniamy go nikomu.

Klucz publiczny:

```text
id_ed25519.pub
```

można kopiować na serwery.

---

# 64. ssh-copy-id

Najprostsze kopiowanie klucza:

```bash
ssh-copy-id user@server
```

Potem:

```bash
ssh user@server
```

może działać bez hasła.

---

# 65. authorized_keys

Serwer przechowuje zaakceptowane klucze w:

```text
~/.ssh/authorized_keys
```

Uprawnienia powinny być poprawne:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

---

# 66. Konfiguracja klienta SSH

Plik:

```text
~/.ssh/config
```

Przykład:

```text
Host moj-vps
    HostName 192.0.2.10
    User user
    Port 22
    IdentityFile ~/.ssh/id_ed25519
```

Potem:

```bash
ssh moj-vps
```

---

# 67. Konfiguracja sshd

Serwer:

```text
/etc/ssh/sshd_config
```

Po zmianie najpierw:

```bash
sudo sshd -t
```

Jeżeli nie ma błędu:

```bash
sudo systemctl reload ssh
```

Nigdy nie zamykaj aktywnej sesji SSH przed sprawdzeniem, czy nowe ustawienia rzeczywiście działają.

---

# 68. Wyłączenie logowania root przez SSH

Typowe bezpieczne ustawienie:

```text
PermitRootLogin no
```

Administrację wykonujemy przez zwykłego użytkownika + `sudo`.

---

# 69. Logowanie tylko kluczem

Po upewnieniu się, że klucz działa:

```text
PasswordAuthentication no
```

Następnie:

```bash
sudo sshd -t
sudo systemctl reload ssh
```

Zawsze sprawdź nowe połączenie w drugim terminalu przed zamknięciem obecnej sesji.

---

# 70. SCP

Kopiowanie plików przez SSH.

Na serwer:

```bash
scp plik.txt user@server:/home/user/
```

Z serwera:

```bash
scp user@server:/home/user/plik.txt .
```

Katalog:

```bash
scp -r katalog user@server:/home/user/
```

---

# 71. rsync

Lepszy do synchronizacji.

```bash
rsync -av katalog/ user@server:/srv/katalog/
```

Po SSH:

```bash
rsync -avz katalog/ user@server:/srv/katalog/
```

Przy dużych transferach `rsync` jest niezwykle przydatny, ponieważ kopiuje tylko różnice.

---

# 72. Porty

Usługi sieciowe słuchają na portach.

Typowe:

```text
22    SSH
53    DNS
80    HTTP
443   HTTPS
5432  PostgreSQL
3306  MySQL/MariaDB
6379  Redis
```

---

# 73. Co słucha na serwerze

```bash
ss -tulpn
```

Bardzo ważna komenda.

Można zobaczyć:

- port,
- adres,
- proces,
- protokół.

---

# 74. localhost

Adres:

```text
127.0.0.1
```

IPv6:

```text
::1
```

Usługa słuchająca tylko na:

```text
127.0.0.1
```

nie jest dostępna bezpośrednio z sieci.

To dobre rozwiązanie np. dla:

- PostgreSQL,
- Redis,
- backendu za reverse proxy.

---

# 75. 0.0.0.0

Jeżeli aplikacja słucha na:

```text
0.0.0.0
```

oznacza to wszystkie interfejsy IPv4.

Może być dostępna z sieci, jeśli firewall tego nie blokuje.

---

# 76. nftables - firewall

Debian używa nowoczesnego nftables.

Instalacja:

```bash
sudo apt install nftables
```

Start:

```bash
sudo systemctl enable --now nftables
```

Konfiguracja:

```text
/etc/nftables.conf
```

Sprawdzenie aktywnych reguł:

```bash
sudo nft list ruleset
```

---

# 77. Minimalna idea firewalla

Dla publicznego VPS najczęściej chcesz:

- zezwolić na ruch istniejących połączeń,
- zezwolić na loopback,
- otworzyć SSH,
- otworzyć HTTP,
- otworzyć HTTPS,
- resztę ruchu przychodzącego blokować.

Nie kopiuj bezmyślnie reguł firewalla na zdalny serwer - błędna reguła może odciąć SSH.

---

# 78. UFW

Jeżeli chcesz prostszą warstwę nad firewallem:

```bash
sudo apt install ufw
```

Przykład:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

Status:

```bash
sudo ufw status verbose
```

UFW jest prostszy. nftables daje większą kontrolę.

---

# 79. fail2ban

Może czasowo blokować adresy wykonujące wiele błędnych prób logowania.

```bash
sudo apt install fail2ban
```

Status:

```bash
systemctl status fail2ban
```

Nie zastępuje:

- kluczy SSH,
- aktualizacji,
- firewalla.

---

# 80. Nginx

Popularny serwer WWW i reverse proxy.

Instalacja:

```bash
sudo apt install nginx
```

Start:

```bash
sudo systemctl enable --now nginx
```

Test:

```bash
curl http://localhost
```

---

# 81. Konfiguracja Nginx

Główne miejsca:

```text
/etc/nginx/nginx.conf
/etc/nginx/sites-available/
/etc/nginx/sites-enabled/
```

Typowy model:

```text
sites-available
    ↓ symlink
sites-enabled
```

---

# 82. Test konfiguracji Nginx

Zawsze przed restartem:

```bash
sudo nginx -t
```

Jeżeli jest OK:

```bash
sudo systemctl reload nginx
```

To bardzo dobry nawyk administracyjny.

---

# 83. Reverse proxy

Załóżmy, że aplikacja Go działa na:

```text
127.0.0.1:8080
```

Nginx może przyjąć ruch na:

```text
https://example.com
```

i przekazać go do:

```text
127.0.0.1:8080
```

Dzięki temu aplikacja:

- nie musi sama obsługiwać TLS,
- nie musi działać na porcie 443,
- może być niewidoczna bezpośrednio z Internetu.

---

# 84. Certbot i HTTPS

Let's Encrypt pozwala uzyskać darmowe certyfikaty TLS.

Typowo:

```bash
sudo apt install certbot python3-certbot-nginx
```

Następnie:

```bash
sudo certbot --nginx -d example.com
```

Certbot może też skonfigurować automatyczne odnawianie.

---

# 85. Własna aplikacja jako usługa systemd

Załóżmy:

```text
/usr/local/bin/mojserwer
```

Tworzymy:

```text
/etc/systemd/system/mojserwer.service
```

Przykład:

```ini
[Unit]
Description=Moj serwer Go
After=network.target

[Service]
User=www-data
WorkingDirectory=/opt/mojserwer
ExecStart=/usr/local/bin/mojserwer
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Następnie:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now mojserwer
```

Status:

```bash
systemctl status mojserwer
```

Logi:

```bash
journalctl -u mojserwer -f
```

To jest jeden z najważniejszych wzorców administracji serwerem.

---

# 86. `/usr/local/bin`

Dobre miejsce dla własnych skryptów i programów administratora.

Np.:

```text
/usr/local/bin/backup
/usr/local/bin/workvpn
/usr/local/bin/check-server
```

Plik musi być wykonywalny:

```bash
sudo chmod +x /usr/local/bin/skrypt
```

Ponieważ `/usr/local/bin` jest zwykle w `$PATH`, można uruchamiać:

```bash
skrypt
```

z dowolnego katalogu.

---

# 87. PATH

Sprawdzenie:

```bash
echo $PATH
```

Przykład:

```text
/usr/local/bin:/usr/bin:/bin
```

Shell szuka poleceń właśnie w tych katalogach.

---

# 88. which i command -v

Sprawdzenie, jaki program zostanie uruchomiony:

```bash
command -v vim
```

albo:

```bash
which vim
```

Lepszym, bardziej przenośnym wyborem w skryptach jest:

```bash
command -v
```

---

# 89. Cron

Klasyczny harmonogram.

Edycja:

```bash
crontab -e
```

Przykład:

```cron
30 7 * * * /usr/local/bin/backup
```

Uruchamia codziennie o 07:30.

---

# 90. Timery systemd

Nowocześniejsza alternatywa dla crona.

Tworzymy:

```text
backup.service
backup.timer
```

Zalety:

- integracja z systemd,
- logi w journalctl,
- zależności,
- łatwy status.

Lista timerów:

```bash
systemctl list-timers
```

---

# 91. Aktualizacje bezpieczeństwa

Regularnie:

```bash
sudo apt update
sudo apt upgrade
```

Można skonfigurować automatyczne aktualizacje:

```bash
sudo apt install unattended-upgrades
```

Konfiguracja:

```text
/etc/apt/apt.conf.d/
```

Na serwerze warto świadomie zdecydować, czy:

- wszystkie aktualizacje instalować automatycznie,
- tylko security,
- wszystko robić ręcznie.

---

# 92. Sprawdzanie wersji Debiana

```bash
cat /etc/debian_version
```

Pełniejsze:

```bash
cat /etc/os-release
```

Kernel:

```bash
uname -r
```

Architektura:

```bash
uname -m
```

---

# 93. Hostname

Sprawdzenie:

```bash
hostname
```

Pełniej:

```bash
hostnamectl
```

Zmiana:

```bash
sudo hostnamectl set-hostname moj-serwer
```

---

# 94. Czas i strefa czasowa

```bash
timedatectl
```

Zmiana strefy:

```bash
sudo timedatectl set-timezone Europe/Warsaw
```

Lista:

```bash
timedatectl list-timezones
```

---

# 95. Synchronizacja czasu

System zwykle synchronizuje czas automatycznie.

Sprawdzenie:

```bash
timedatectl status
```

Prawidłowy czas jest bardzo ważny dla:

- TLS,
- logów,
- baz danych,
- Kerberosa,
- uwierzytelniania,
- TOTP.

---

# 96. `hostname`, `/etc/hosts` i DNS

Przykład `/etc/hosts`:

```text
127.0.0.1 localhost
127.0.1.1 moj-komputer
```

`/etc/hosts` pozwala lokalnie przypisać nazwę do adresu bez DNS.

---

# 97. Archiwa

tar:

```bash
tar -cvf archiwum.tar katalog/
```

Rozpakowanie:

```bash
tar -xvf archiwum.tar
```

gzip:

```bash
tar -czvf archiwum.tar.gz katalog/
```

Rozpakowanie:

```bash
tar -xzvf archiwum.tar.gz
```

---

# 98. zip

```bash
zip -r archiwum.zip katalog/
```

Rozpakowanie:

```bash
unzip archiwum.zip
```

---

# 99. `find`

Szukanie plików:

```bash
find /var/log -name "*.log"
```

Bez rozróżniania wielkości liter:

```bash
find . -iname "*.jpg"
```

Pliki większe niż 1 GB:

```bash
find / -type f -size +1G 2>/dev/null
```

---

# 100. grep

Szukanie tekstu:

```bash
grep "error" plik.log
```

Bez rozróżniania wielkości liter:

```bash
grep -i "error" plik.log
```

Rekurencyjnie:

```bash
grep -R "listen" /etc/nginx
```

---

# 101. less

Czytanie dużych plików:

```bash
less /var/log/syslog
```

Nawigacja:

```text
q       wyjście
/tekst  wyszukiwanie
n       następny wynik
g       początek
G       koniec
```

---

# 102. tail

Ostatnie linie:

```bash
tail /var/log/plik.log
```

Na żywo:

```bash
tail -f /var/log/plik.log
```

---

# 103. head

Pierwsze linie:

```bash
head plik
```

Np. pierwsze 20:

```bash
head -n 20 plik
```

---

# 104. Potoki

Jedna z najważniejszych cech shella.

```bash
polecenie1 | polecenie2
```

Przykład:

```bash
ps aux | grep nginx
```

Wynik pierwszego polecenia trafia do drugiego.

---

# 105. Przekierowania

Do pliku:

```bash
polecenie > wynik.txt
```

Dopisanie:

```bash
polecenie >> wynik.txt
```

Błędy:

```bash
polecenie 2> bledy.txt
```

Standardowe wyjście + błędy:

```bash
polecenie > wszystko.txt 2>&1
```

---

# 106. `tee`

Zapisuje wynik i jednocześnie pokazuje go na ekranie.

```bash
polecenie | tee wynik.txt
```

Dopisanie:

```bash
polecenie | tee -a wynik.txt
```

Przydatne z sudo:

```bash
echo "tekst" | sudo tee /etc/jakis-plik
```

---

# 107. Edytory

Na serwerze warto znać przynajmniej jeden edytor terminalowy.

Typowe:

```text
vi
vim
nano
micro
```

Debian niemal zawsze posiada jakąś implementację `vi`.

Dla sprawnego administratora Vim jest bardzo praktycznym wyborem.

---

# 108. Konfiguracja użytkownika shella

Najczęściej Bash.

Pliki:

```text
~/.bashrc
~/.profile
```

Po zmianie `.bashrc` można wykonać:

```bash
source ~/.bashrc
```

---

# 109. Aliasy

Przykład:

```bash
alias ll='ls -lah'
```

Dodany do:

```text
~/.bashrc
```

będzie dostępny w nowych sesjach.

---

# 110. Zmienne środowiskowe

Przykład:

```bash
export EDITOR=vim
```

Sprawdzenie:

```bash
echo $EDITOR
```

Nie zapisuj sekretów bezmyślnie w `.bashrc`.

---

# 111. `sudoedit`

Bezpieczny sposób edytowania pliku root.

```bash
sudoedit /etc/ssh/sshd_config
```

Edytor działa jako zwykły użytkownik, a zapis do chronionego pliku obsługuje sudo.

---

# 112. Diagnostyka - metoda krok po kroku

Zamiast losowo wpisywać komendy, stosuj schemat.

## 1. Co dokładnie nie działa?

Np.:

```text
strona nie odpowiada
```

## 2. Czy proces działa?

```bash
systemctl status nginx
```

## 3. Co mówią logi?

```bash
journalctl -u nginx -n 100
```

## 4. Czy usługa słucha?

```bash
ss -tulpn
```

## 5. Czy działa lokalnie?

```bash
curl http://127.0.0.1
```

## 6. Czy działa przez właściwy adres?

```bash
curl http://IP_SERWERA
```

## 7. Czy firewall pozwala?

```bash
sudo nft list ruleset
```

## 8. Czy DNS wskazuje właściwy adres?

```bash
dig example.com
```

To podejście jest dużo skuteczniejsze niż „restart wszystkiego”.

---

# 113. Gdy system długo startuje

```bash
systemd-analyze
```

Co opóźnia start:

```bash
systemd-analyze blame
```

Łańcuch zależności:

```bash
systemd-analyze critical-chain
```

---

# 114. Gdy system nie startuje poprawnie

Przydatne:

```bash
journalctl -b -p err
```

Poprzedni boot:

```bash
journalctl -b -1
```

Kernel:

```bash
journalctl -k
```

---

# 115. Gdy nagle zabrakło miejsca

Najpierw:

```bash
df -h
```

Potem:

```bash
sudo du -xh /var --max-depth=1 | sort -h
```

Częste miejsca:

```text
/var/log
/var/lib/docker
/var/cache
/home
```

Journal:

```bash
journalctl --disk-usage
```

Zmniejszenie:

```bash
sudo journalctl --vacuum-time=14d
```

---

# 116. Gdy nie działa DNS

Sprawdź IP:

```bash
ping 1.1.1.1
```

Potem DNS:

```bash
ping debian.org
```

Sprawdź:

```bash
resolvectl status
```

oraz:

```bash
cat /etc/resolv.conf
```

---

# 117. Gdy nie działa SSH

Na serwerze:

```bash
systemctl status ssh
```

Czy słucha:

```bash
ss -tulpn | grep ':22'
```

Logi:

```bash
journalctl -u ssh
```

Konfiguracja:

```bash
sudo sshd -t
```

Firewall:

```bash
sudo nft list ruleset
```

---

# 118. Gdy aplikacja nie startuje

```bash
systemctl status aplikacja
```

Następnie:

```bash
journalctl -u aplikacja -n 100
```

Sprawdź:

- ścieżkę `ExecStart`,
- prawa do pliku,
- użytkownika,
- WorkingDirectory,
- zmienne środowiskowe,
- port,
- zależności.

---

# 119. Desktop - gdzie szukać konfiguracji użytkownika

Najczęściej:

```text
~/.config
~/.local
~/.cache
```

`~/.cache` zwykle można usunąć bez utraty konfiguracji.

Nie usuwaj jednak losowo `~/.config`, bo znajduje się tam właściwa konfiguracja aplikacji.

---

# 120. XDG

Współczesne aplikacje starają się używać standardu XDG.

Typowe miejsca:

```text
~/.config
~/.local/share
~/.cache
```

To dlatego coraz mniej aplikacji tworzy setki pojedynczych `.plików` bezpośrednio w katalogu domowym.

---

# 121. GNOME - ustawienia zaawansowane

Przydatny pakiet:

```bash
sudo apt install gnome-tweaks
```

GNOME używa również systemu ustawień:

```text
gsettings / dconf
```

Przykład odczytu:

```bash
gsettings list-schemas
```

Nie ma potrzeby korzystać z tego przy zwykłej pracy, ale dobrze wiedzieć, że istnieje.

---

# 122. KDE - konfiguracja

KDE zapisuje sporą część ustawień w:

```text
~/.config
```

Pliki często mają nazwy typu:

```text
kdeglobals
kwinrc
plasmarc
```

Nie warto ręcznie ich edytować bez potrzeby - panel System Settings potrafi większość rzeczy skonfigurować wygodniej.

---

# 123. Domyślne aplikacje

Desktop wykorzystuje MIME types.

Można sprawdzić domyślną aplikację:

```bash
xdg-mime query default text/html
```

Otwieranie domyślną aplikacją:

```bash
xdg-open plik.pdf
```

lub:

```bash
xdg-open https://debian.org
```

---

# 124. Schowek i Wayland

Pod Waylandem klasyczne narzędzia X11 typu `xclip` nie zawsze są właściwym wyborem.

Dla Waylanda przydatne:

```bash
sudo apt install wl-clipboard
```

Kopiowanie:

```bash
echo "tekst" | wl-copy
```

Odczyt:

```bash
wl-paste
```

---

# 125. Monitorowanie temperatur

```bash
sudo apt install lm-sensors
```

Wykrywanie:

```bash
sudo sensors-detect
```

Odczyt:

```bash
sensors
```

---

# 126. Informacje o sprzęcie

CPU:

```bash
lscpu
```

RAM:

```bash
free -h
```

PCI:

```bash
lspci
```

USB:

```bash
lsusb
```

Dyski:

```bash
lsblk
```

Pełniejsze informacje:

```bash
sudo lshw
```

---

# 127. Pakiety development

Częsty zestaw:

```bash
sudo apt install build-essential git curl wget pkg-config
```

`build-essential` instaluje podstawowe narzędzia kompilacji C/C++.

---

# 128. Git

Instalacja:

```bash
sudo apt install git
```

Konfiguracja:

```bash
git config --global user.name "Imię Nazwisko"
git config --global user.email "mail@example.com"
```

Klonowanie:

```bash
git clone URL
```

---

# 129. `apt install ./pakiet.deb`

Jeżeli pobierzesz lokalny pakiet:

```bash
sudo apt install ./program.deb
```

jest zwykle lepsze niż:

```bash
sudo dpkg -i program.deb
```

bo APT rozwiązuje zależności.

---

# 130. AppImage

Nie wymaga instalacji.

Przykład:

```bash
chmod +x Program.AppImage
./Program.AppImage
```

Zaletą jest prostota.

Wadą:

- brak centralnego zarządzania aktualizacjami,
- każda aplikacja dostarcza własne biblioteki.

---

# 131. Docker na Debianie

Docker jest przydatny dla aplikacji serwerowych.

Mentalny model:

```text
host Debian
  ↓
Docker daemon
  ↓
container
```

Kontener nie jest maszyną wirtualną.

Korzysta z kernela hosta.

---

# 132. Kontener kontra VM

## kontener

- współdzieli kernel,
- lekki,
- szybki start,
- świetny dla aplikacji.

## maszyna wirtualna

- własny kernel,
- pełny OS,
- większa izolacja,
- większy narzut.

---

# 133. Docker Compose

Pozwala opisać kilka usług.

Przykładowa aplikacja:

```text
frontend
backend
postgres
redis
```

może zostać opisana w jednym:

```text
compose.yaml
```

Na małym VPS to bardzo wygodny model deploymentu.

---

# 134. Kiedy nie używać Dockera

Nie każda usługa go potrzebuje.

Jeżeli masz pojedynczy statyczny binarny program Go, często wystarczy:

```text
Go binary
+
systemd
+
nginx
```

Docker ma sens, gdy:

- chcesz identycznego środowiska lokalnie i na serwerze,
- aplikacja ma wiele zależności,
- używasz wielu usług,
- deployment ma być powtarzalny.

---

# 135. Backupi

Backup powinien spełniać przynajmniej zasadę 3-2-1:

```text
3 kopie danych
2 różne media
1 kopia poza lokalizacją
```

Nie jest backupem:

```text
RAID
```

RAID zwiększa dostępność.

Nie chroni przed:

- przypadkowym usunięciem,
- ransomware,
- błędem administratora,
- spaleniem urządzenia.

---

# 136. rsync jako prosty backup

Przykład:

```bash
rsync -a --delete /srv/dane/ /backup/dane/
```

UWAGA:

`--delete` usuwa w backupie pliki, których nie ma już w źródle.

To może być dobre dla mirrora, ale nie daje historii zmian.

---

# 137. Narzędzia backupowe

Warto znać nazwy:

```text
restic
borgbackup
rsnapshot
rclone
```

## restic

Świetny do:

- szyfrowanych backupów,
- obiektowego storage,
- snapshotów.

## Borg

Bardzo dobry do:

- deduplikacji,
- lokalnych repozytoriów,
- serwerów backupowych.

## rclone

Świetny do:

- synchronizacji z cloud storage,
- S3,
- WebDAV,
- Google Drive,
- Dropbox itp.

---

# 138. Bezpieczeństwo serwera - sensowna baza

Na publicznym VPS:

1. aktualizuj system,
2. loguj się zwykłym użytkownikiem,
3. korzystaj z sudo,
4. używaj kluczy SSH,
5. wyłącz bezpośrednie logowanie root,
6. rozważ wyłączenie haseł SSH,
7. uruchom firewall,
8. wystawiaj tylko potrzebne porty,
9. obserwuj logi,
10. rób backup.

To jest dużo ważniejsze niż instalowanie dziesięciu „security tools”.

---

# 139. Zmiana portu SSH

Może ograniczyć ilość automatycznego spamu w logach, ale nie jest realnym zabezpieczeniem kryptograficznym.

Klucz SSH jest zabezpieczeniem.

Zmiana portu to głównie redukcja szumu.

---

# 140. `sudo` zamiast root

Daje:

- logowanie wykonanych poleceń,
- mniejsze ryzyko przypadkowego zniszczenia systemu,
- możliwość ograniczenia uprawnień.

Długotrwałe działanie jako root jest zwykle złym nawykiem.

---

# 141. Nie uruchamiaj losowych skryptów z Internetu

Popularny wzorzec:

```bash
curl URL | sudo bash
```

jest wygodny, ale ryzykowny.

Bezpieczniej:

```bash
curl -O URL
less skrypt.sh
sudo bash skrypt.sh
```

Przynajmniej widzisz, co uruchamiasz.

---

# 142. `sudo apt install` kontra ręczne instalowanie

Preferowana kolejność:

1. repozytorium Debiana,
2. oficjalne repo producenta,
3. Flatpak - dla desktopu,
4. lokalny `.deb`,
5. ręczna instalacja,
6. kompilacja ze źródeł.

Im niżej, tym więcej administracji spada na Ciebie.

---

# 143. Co po instalacji Debiana na desktopie

Praktyczny zestaw:

```bash
sudo apt update
sudo apt upgrade
sudo apt install \
    git \
    curl \
    wget \
    vim \
    htop \
    tree \
    rsync \
    unzip \
    zip \
    lm-sensors \
    smartmontools
```

Opcjonalnie:

```bash
sudo apt install flatpak
```

---

# 144. Co po instalacji Debiana na serwerze

Minimum:

```bash
sudo apt update
sudo apt upgrade
sudo apt install \
    openssh-server \
    curl \
    wget \
    vim \
    git \
    htop \
    rsync \
    nftables \
    unattended-upgrades
```

Następnie:

- użytkownik administracyjny,
- sudo,
- klucz SSH,
- firewall,
- backup,
- monitoring.

---

# 145. Przydatne pakiety CLI

```text
htop
btop
tree
ripgrep
fd-find
jq
curl
wget
rsync
ncdu
tmux
screen
lsof
strace
dnsutils
netcat-openbsd
```

---

# 146. `ncdu`

Świetne narzędzie do szukania, co zjadło dysk.

```bash
sudo apt install ncdu
```

Uruchomienie:

```bash
sudo ncdu /
```

---

# 147. `lsof`

Pokazuje otwarte pliki i sockety.

Co używa portu 8080:

```bash
sudo lsof -i :8080
```

Co trzyma plik:

```bash
lsof /ścieżka/do/pliku
```

---

# 148. `strace`

Pokazuje wywołania systemowe procesu.

Przykład:

```bash
strace ./program
```

Jest bardzo przydatny, gdy program:

- nie znajduje pliku,
- nie może otworzyć socketu,
- kończy się bez sensownego komunikatu.

To narzędzie bardziej zaawansowane, ale warto znać jego istnienie.

---

# 149. tmux

Pozwala zachować sesję terminalową po zerwaniu SSH.

Instalacja:

```bash
sudo apt install tmux
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

Lista:

```bash
tmux ls
```

Powrót:

```bash
tmux attach
```

Na serwerze bardzo przydatne.

---

# 150. sudo i `visudo`

Konfiguracja:

```text
/etc/sudoers
```

Nigdy nie edytuj jej zwykłym edytorem.

Używaj:

```bash
sudo visudo
```

Dodatkowe reguły:

```text
/etc/sudoers.d/
```

---

# 151. Dodawanie użytkownika

```bash
sudo adduser user
```

Dodanie do sudo:

```bash
sudo usermod -aG sudo user
```

---

# 152. Blokowanie użytkownika

```bash
sudo passwd -l użytkownik
```

Odblokowanie:

```bash
sudo passwd -u użytkownik
```

---

# 153. Kto jest zalogowany

```bash
who
```

lub:

```bash
w
```

Historia logowań:

```bash
last
```

---

# 154. Ostatnie logowania SSH

Można analizować:

```bash
journalctl -u ssh
```

oraz:

```bash
last
```

---

# 155. Podstawowy troubleshooting desktopu

Jeżeli GNOME/KDE zaczyna zachowywać się dziwnie:

1. wyloguj i zaloguj,
2. sprawdź logi użytkownika,
3. sprawdź wolne miejsce,
4. sprawdź aktualizacje,
5. sprawdź GPU,
6. sprawdź błędy kernela.

Przykłady:

```bash
df -h
journalctl --user -b
journalctl -k -p err
```

---

# 156. Gdy aplikacja GUI nie startuje

Uruchom ją z terminala.

Zamiast kliknąć ikonę:

```bash
program
```

Terminal często pokaże błąd, którego GUI nie wyświetla.

To jedna z najlepszych technik diagnostycznych na Linuxie.

---

# 157. Gdy aktualizacja APT się nie udaje

Najpierw:

```bash
sudo apt update
```

Czytaj dokładnie komunikat.

Częste problemy:

- nieaktualne repozytorium,
- błędny klucz,
- przerwane zależności,
- repozytorium dla złej wersji Debiana.

Można spróbować:

```bash
sudo apt --fix-broken install
```

ale nie należy używać tego mechanicznie bez przeczytania błędu.

---

# 158. Sprawdzenie, skąd pochodzi pakiet

```bash
apt policy pakiet
```

Przykład:

```bash
apt policy nginx
```

Pokazuje:

- wersję zainstalowaną,
- dostępną,
- repozytorium.

---

# 159. Co zainstalował dany pakiet

```bash
dpkg -L nginx
```

To świetna odpowiedź na pytanie:

> „Gdzie ten program wrzucił pliki?”

---

# 160. Do jakiego pakietu należy plik

```bash
dpkg -S /usr/bin/vim
```

---

# 161. Dokumentacja pakietów

Często:

```text
/usr/share/doc/nazwa-pakietu/
```

Przykład:

```bash
ls /usr/share/doc/openssh-server/
```

Debian bardzo często umieszcza tam:

- README,
- changelog,
- przykłady konfiguracji.

---

# 162. man

Podstawowa dokumentacja systemu.

```bash
man ssh
```

Sekcje:

```text
1 - polecenia użytkownika
5 - formaty plików
8 - polecenia administratora
```

Przykłady:

```bash
man ssh
man ssh_config
man sshd_config
man systemd.service
```

---

# 163. `--help`

Szybka pomoc:

```bash
ip --help
```

lub:

```bash
curl --help
```

Często jest szybsza niż `man`.

---

# 164. systemd targets

Zamiast dawnych runleveli systemd używa targetów.

Najważniejsze:

```text
multi-user.target
graphical.target
rescue.target
emergency.target
```

Serwer bez GUI:

```text
multi-user.target
```

Desktop:

```text
graphical.target
```

Sprawdzenie domyślnego:

```bash
systemctl get-default
```

Zmiana:

```bash
sudo systemctl set-default multi-user.target
```

---

# 165. Uruchomienie GUI ręcznie

Jeżeli domyślnie system startuje tekstowo:

```bash
sudo systemctl isolate graphical.target
```

Powrót:

```bash
sudo systemctl isolate multi-user.target
```

---

# 166. Kernel

Sprawdzenie:

```bash
uname -a
```

Wersja:

```bash
uname -r
```

Pakiety kernela:

```bash
dpkg -l | grep linux-image
```

Nie usuwaj wszystkich starszych kernelów.

Posiadanie jednego poprzedniego jest przydatne awaryjnie.

---

# 167. GRUB

Bootloader.

Konfiguracja:

```text
/etc/default/grub
```

Po zmianach:

```bash
sudo update-grub
```

Nie edytuj ręcznie:

```text
/boot/grub/grub.cfg
```

bo jest generowany automatycznie.

---

# 168. Initramfs

Wczesne środowisko startowe systemu.

Aktualizacja:

```bash
sudo update-initramfs -u
```

Potrzebne np. po zmianach dotyczących:

- szyfrowania,
- sterowników startowych,
- modułów kernela.

---

# 169. LUKS

Standard szyfrowania dysków w Linuxie.

Na laptopie warto rozważyć pełne szyfrowanie dysku już podczas instalacji Debiana.

Chroni dane, gdy:

- laptop zostanie zgubiony,
- dysk zostanie wyjęty.

Nie chroni systemu, gdy komputer jest już odblokowany i działa.

---

# 170. Swap

Sprawdzenie:

```bash
swapon --show
```

Pamięć:

```bash
free -h
```

Swap może być:

- partycją,
- plikiem.

Jest używany jako bufor pamięci i może być wymagany do hibernacji.

---

# 171. OOM

Jeśli zabraknie RAM i swap, kernel może uruchomić OOM Killer.

Szukaj:

```bash
journalctl -k | grep -i oom
```

lub:

```bash
dmesg | grep -i "out of memory"
```

---

# 172. DNS tools

Pakiet:

```bash
sudo apt install dnsutils
```

Zapytanie:

```bash
dig example.com
```

Serwery nazw:

```bash
dig NS example.com
```

MX:

```bash
dig MX example.com
```

---

# 173. traceroute

```bash
sudo apt install traceroute
```

Użycie:

```bash
traceroute example.com
```

Pokazuje kolejne routery na trasie.

---

# 174. netcat

Instalacja:

```bash
sudo apt install netcat-openbsd
```

Test portu:

```bash
nc -vz server 443
```

Przykład:

```bash
nc -vz 192.168.1.10 22
```

---

# 175. SSH tunneling

Lokalny tunel:

```bash
ssh -L 8080:127.0.0.1:8080 user@server
```

Pozwala otworzyć lokalnie:

```text
http://localhost:8080
```

i skierować ruch do usługi działającej na serwerze.

Świetne dla:

- paneli administracyjnych,
- baz danych,
- usług nieudostępnionych publicznie.

---

# 176. PostgreSQL - podstawy administracyjne

Instalacja:

```bash
sudo apt install postgresql
```

Status:

```bash
systemctl status postgresql
```

Shell postgres:

```bash
sudo -u postgres psql
```

Baza nie musi być wystawiana do Internetu.

Najbezpieczniej aplikacja i DB komunikują się lokalnie.

---

# 177. Redis

Instalacja:

```bash
sudo apt install redis-server
```

Redis również zazwyczaj powinien słuchać tylko lokalnie.

Nigdy nie wystawiaj bez potrzeby Redis do publicznego Internetu.

---

# 178. Serwer plików Samba

Dla klientów Windows:

```bash
sudo apt install samba
```

Konfiguracja:

```text
/etc/samba/smb.conf
```

---

# 179. NFS

Dobrze pasuje do środowisk Linux/Unix.

Serwer:

```bash
sudo apt install nfs-kernel-server
```

Eksporty:

```text
/etc/exports
```

---

# 180. Dziennik administratora

Warto prowadzić np.:

```text
~/server-notes.md
```

Zapisywać:

- co zmieniłeś,
- kiedy,
- dlaczego,
- jakie porty otworzyłeś,
- jakie usługi uruchomiłeś,
- gdzie są backupy,
- co trzeba zrobić po awarii.

Przy półrocznej przerwie taki plik potrafi uratować godzinę grzebania.

---

# 181. Snapshot to nie backup

Snapshot pozwala wrócić do wcześniejszego stanu.

Jeżeli jednak zginie cały dysk, lokalny snapshot ginie razem z nim.

Dlatego:

```text
snapshot ≠ backup
```

---

# 182. Aktualizacja bez restartu?

Większość aktualizacji aplikacji nie wymaga restartu całego systemu.

Kernel:

- nowa wersja jest instalowana,
- działa dopiero po ponownym uruchomieniu.

Biblioteki systemowe mogą wymagać restartu konkretnych usług.

---

# 183. Czy system wymaga restartu

Można użyć pakietu:

```bash
sudo apt install needrestart
```

Po aktualizacjach informuje, które usługi korzystają ze starych bibliotek.

---

# 184. Dobre praktyki desktop

1. trzymaj się `stable`,
2. instaluj z APT, gdy to możliwe,
3. Flatpak używaj głównie do aplikacji desktopowych,
4. nie dodawaj dziesiątek przypadkowych repozytoriów,
5. aktualizuj regularnie,
6. szyfruj laptop,
7. rób backup `/home`,
8. ucz się diagnozować przez `journalctl`,
9. nie walcz z systemem, jeżeli problem da się rozwiązać standardową metodą Debiana.

---

# 185. Dobre praktyki serwerowe

1. minimalna instalacja,
2. tylko potrzebne usługi,
3. SSH z kluczem,
4. root przez SSH wyłączony,
5. firewall,
6. regularne aktualizacje,
7. backup poza serwerem,
8. logi w journald,
9. aplikacje jako usługi systemd,
10. reverse proxy,
11. HTTPS,
12. baza danych niewystawiona publicznie,
13. dokumentuj zmiany.

---

# 186. Praktyczny scenariusz: nowy VPS

Po instalacji:

```bash
sudo apt update
sudo apt upgrade
```

Narzędzia:

```bash
sudo apt install \
    vim git curl wget rsync htop \
    nftables openssh-server
```

Użytkownik:

```bash
sudo adduser user
sudo usermod -aG sudo user
```

SSH:

```bash
ssh-copy-id user@SERVER
```

Sprawdź nowe logowanie.

Następnie skonfiguruj:

```text
PermitRootLogin no
```

Opcjonalnie:

```text
PasswordAuthentication no
```

Test:

```bash
sudo sshd -t
```

Reload:

```bash
sudo systemctl reload ssh
```

Dopiero potem zamknij starą sesję.

---

# 187. Praktyczny scenariusz: postawienie strony

Instalujemy Nginx:

```bash
sudo apt install nginx
sudo systemctl enable --now nginx
```

Sprawdzamy:

```bash
curl http://localhost
```

Firewall:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

Konfigurujemy domenę w DNS.

Tworzymy konfigurację Nginx.

Test:

```bash
sudo nginx -t
```

Reload:

```bash
sudo systemctl reload nginx
```

HTTPS:

```bash
sudo certbot --nginx -d example.com
```

---

# 188. Praktyczny scenariusz: aplikacja Go

Budujemy:

```bash
go build -o app
```

Kopiujemy:

```bash
sudo mkdir -p /opt/mojapp
sudo cp app /opt/mojapp/
```

Tworzymy:

```text
/etc/systemd/system/mojapp.service
```

Uruchamiamy:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now mojapp
```

Sprawdzamy:

```bash
systemctl status mojapp
```

Logi:

```bash
journalctl -u mojapp -f
```

Nginx proxy:

```text
Internet
↓
443 nginx
↓
127.0.0.1:8080
↓
Go
```

---

# 189. Praktyczny scenariusz: coś zajmuje port

Aplikacja mówi:

```text
address already in use
```

Sprawdź:

```bash
sudo ss -tulpn | grep ':8080'
```

lub:

```bash
sudo lsof -i :8080
```

Zobaczysz proces.

Potem decydujesz:

- zatrzymać usługę,
- zmienić jej port,
- zmienić port nowej aplikacji.

---

# 190. Praktyczny scenariusz: strona odpowiada lokalnie, ale nie z Internetu

Lokalnie:

```bash
curl http://localhost
```

działa.

Sprawdź:

```bash
ss -tulpn
```

Jeżeli Nginx słucha poprawnie:

```text
0.0.0.0:80
```

sprawdź firewall:

```bash
sudo nft list ruleset
```

Potem firewall dostawcy VPS.

Potem DNS.

Diagnostyka powinna iść warstwami.

---

# 191. Praktyczny scenariusz: Wi-Fi nie działa

Najpierw:

```bash
nmcli device
```

Czy karta istnieje?

```bash
lspci
```

Log kernela:

```bash
journalctl -k | grep -i firmware
```

NetworkManager:

```bash
systemctl status NetworkManager
```

Sieci:

```bash
nmcli device wifi list
```

To daje więcej informacji niż kilkukrotne klikanie ikonki Wi-Fi.

---

# 192. Praktyczny scenariusz: laptop się wyłącza

Sprawdź poprzedni boot:

```bash
journalctl -b -1
```

Błędy kernela:

```bash
journalctl -b -1 -k -p warning
```

Temperatury:

```bash
sensors
```

Bateria:

```bash
upower -i "$(upower -e | grep BAT)"
```

Logi zasilania mogą pomóc rozróżnić:

- awarię baterii,
- thermal shutdown,
- panic kernela,
- normalny shutdown wywołany przez firmware/ACPI.

---

# 193. Praktyczny scenariusz: brak miejsca przez Dockera

Sprawdź:

```bash
docker system df
```

Obrazy:

```bash
docker images
```

Kontenery:

```bash
docker ps -a
```

Czyszczenie nieużywanych danych:

```bash
docker system prune
```

UWAGA: przeczytaj, co zostanie usunięte.

---

# 194. Praktyczny scenariusz: plik konfiguracyjny przed zmianą

Zrób backup:

```bash
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak
```

Edytuj:

```bash
sudoedit /etc/nginx/nginx.conf
```

Test:

```bash
sudo nginx -t
```

Dopiero potem reload.

To jest dobry wzorzec dla prawie każdej usługi.

---

# 195. Schemat administracji usługi

Prawie zawsze:

```text
1. znajdź konfigurację
2. zrób backup
3. zmień konfigurację
4. przetestuj składnię
5. reload/restart
6. sprawdź status
7. sprawdź log
8. sprawdź usługę z zewnątrz
```

Np.:

```bash
sudo nginx -t
sudo systemctl reload nginx
systemctl status nginx
journalctl -u nginx -n 50
curl https://example.com
```

---

# 196. Najważniejsze polecenia - ściąga

## system

```bash
uname -a
hostnamectl
timedatectl
uptime
```

## pakiety

```bash
sudo apt update
sudo apt upgrade
sudo apt install PAKIET
sudo apt remove PAKIET
apt search PAKIET
apt show PAKIET
apt policy PAKIET
```

## usługi

```bash
systemctl status USŁUGA
sudo systemctl start USŁUGA
sudo systemctl stop USŁUGA
sudo systemctl restart USŁUGA
sudo systemctl reload USŁUGA
sudo systemctl enable --now USŁUGA
```

## logi

```bash
journalctl -b
journalctl -u USŁUGA
journalctl -u USŁUGA -f
journalctl -k
```

## sieć

```bash
ip a
ip route
nmcli device
ss -tulpn
ping HOST
curl URL
dig DOMENA
```

## procesy

```bash
ps aux
top
htop
kill PID
```

## dyski

```bash
lsblk
lsblk -f
df -h
du -sh KATALOG
blkid
```

## pliki

```bash
cp
mv
rm
mkdir
find
grep
less
head
tail
```

## SSH

```bash
ssh user@host
ssh-keygen -t ed25519
ssh-copy-id user@host
scp
rsync
```

---

# 197. Pięć poleceń, które warto odruchowo znać na serwerze

Jeżeli coś nie działa:

```bash
systemctl status NAZWA
```

```bash
journalctl -u NAZWA -n 100
```

```bash
ss -tulpn
```

```bash
df -h
```

```bash
free -h
```

Tymi pięcioma poleceniami da się rozpocząć diagnostykę ogromnej liczby problemów.

---

# 198. Pięć poleceń, które warto znać na desktopie

```bash
sudo apt update
```

```bash
sudo apt upgrade
```

```bash
journalctl -b
```

```bash
nmcli device
```

```bash
lsblk -f
```

---

# 199. Jak myśleć o Debianie

Nie ucz się Debiana jako listy poleceń.

Zapamiętaj model:

```text
program
↓
proces
↓
usługa systemd
↓
logi
↓
port/socket
↓
sieć
↓
firewall
```

oraz:

```text
pakiet
↓
pliki programu
↓
konfiguracja w /etc
↓
dane w /var
↓
logi
```

Jeżeli rozumiesz te zależności, nawet nieznaną usługę da się zwykle rozgryźć bez tutoriala.

---

# 200. Minimalny zestaw wiedzy administratora Debiana

Powinieneś umieć:

- zaktualizować system,
- znaleźć i zainstalować pakiet,
- znaleźć plik konfiguracji,
- uruchomić i zatrzymać usługę,
- przeczytać jej logi,
- znaleźć proces,
- sprawdzić port,
- sprawdzić adres IP,
- sprawdzić routing,
- sprawdzić DNS,
- połączyć się przez SSH,
- skonfigurować klucz SSH,
- przesłać pliki przez SSH,
- sprawdzić zajętość dysku,
- zamontować filesystem,
- zrozumieć `/etc/fstab`,
- znaleźć błąd w journalctl,
- zrobić prosty firewall,
- zrobić backup,
- uruchomić własny program jako usługę systemd.

Jeżeli to potrafisz, Debian przestaje być „systemem, na którym wpisuje się magiczne komendy”, a zaczyna być logicznym i przewidywalnym środowiskiem.

---

# 201. GNOME/KDE a serwer - najważniejsza różnica mentalna

Na desktopie wiele rzeczy wykonujesz przez GUI:

```text
Wi-Fi
Bluetooth
ekrany
audio
drukarki
użytkownicy
```

Jednak pod spodem nadal działają:

```text
NetworkManager
BlueZ
PipeWire
CUPS
systemd
```

Na serwerze po prostu komunikujesz się z tymi samymi elementami bez warstwy GUI.

Dlatego znajomość shella bardzo pomaga również na desktopie.

---

# 202. Przydatna filozofia pracy

Najpierw:

```text
sprawdź
```

dopiero potem:

```text
zmieniaj
```

Czyli zamiast:

```bash
sudo systemctl restart nginx
```

odruchowo zacznij od:

```bash
systemctl status nginx
```

Zamiast usuwać pakiety:

```bash
apt policy pakiet
```

Zamiast zmieniać konfigurację:

```bash
cp plik plik.bak
```

Administrator, który najpierw zbiera informacje, psuje mniej rzeczy.

---

# 203. Najważniejsze ścieżki do zapamiętania

```text
/home/$USER              dane użytkownika
/root                    home roota
/etc                     konfiguracja systemowa
/var/log                 tradycyjne logi
/var/lib                 dane usług
/var/www                 typowe dane WWW
/usr/bin                 programy
/usr/local/bin           własne narzędzia
/tmp                     dane tymczasowe
/run                     dane runtime
/boot                    kernel i bootloader
/mnt                     ręczne mounty
/media                   media wymienne
~/.config                konfiguracja desktopowa użytkownika
~/.local                 dane użytkownika
~/.ssh                   SSH
/etc/systemd/system      własne unity systemd
/etc/ssh                 SSH
/etc/nginx               Nginx
/etc/apt                 APT
```

---

# 204. Najważniejsze pliki do zapamiętania

```text
/etc/fstab
/etc/hosts
/etc/os-release
/etc/ssh/sshd_config
/etc/nftables.conf
/etc/default/grub
~/.ssh/config
~/.ssh/authorized_keys
~/.bashrc
~/.profile
```

---

# 205. Najważniejsze narzędzia do zapamiętania

```text
apt
dpkg
systemctl
journalctl
ip
nmcli
ss
ssh
rsync
curl
grep
find
lsblk
df
du
ps
htop
sudo
vim
```

Jeżeli naprawdę dobrze poznasz te narzędzia, poradzisz sobie z ogromną częścią codziennej administracji.

---

# 206. Gdzie szukać pomocy

Najpierw lokalnie:

```bash
man polecenie
```

Potem:

```bash
polecenie --help
```

Dokumentacja pakietu:

```text
/usr/share/doc/
```

Oficjalna dokumentacja Debiana:

- Informacje o aktualnym wydaniu stable  
  https://www.debian.org/releases/stable/

- Aktualizacje Debian 13  
  https://www.debian.org/News/

- Debian Reference  
  https://www.debian.org/doc/manuals/debian-reference/

- Debian Documentation  
  https://www.debian.org/doc/

- Debian Wiki  
  https://wiki.debian.org/

- Debian Administrator's Handbook  
  https://debian-handbook.info/

---

# 207. Ostateczna ściąga: jak diagnozować prawie wszystko

## Problem z usługą

```bash
systemctl status usługa
journalctl -u usługa -n 100
```

## Problem z siecią

```bash
ip a
ip route
ping 1.1.1.1
ping debian.org
resolvectl status
```

## Problem z portem

```bash
ss -tulpn
sudo lsof -i :PORT
```

## Problem z dyskiem

```bash
df -h
lsblk -f
sudo smartctl -a /dev/DYSK
```

## Problem z RAM

```bash
free -h
htop
```

## Problem z bootem

```bash
journalctl -b
journalctl -b -1
journalctl -k
```

## Problem z pakietem

```bash
apt policy pakiet
dpkg -L pakiet
```

## Problem z konfiguracją

```text
/etc
```

## Problem z aplikacją desktopową

Uruchom ją z terminala i przeczytaj komunikat błędu.

---

# 208. Najważniejsza zasada

Debian jest bardzo przewidywalny.

Jeżeli coś działa jako usługa, prawdopodobnie:

```text
systemctl
journalctl
```

Jeżeli dotyczy pakietu:

```text
apt
dpkg
```

Jeżeli dotyczy sieci:

```text
ip
nmcli
ss
```

Jeżeli dotyczy konfiguracji:

```text
/etc
```

Jeżeli dotyczy danych usługi:

```text
/var
```

Jeżeli dotyczy użytkownika:

```text
/home
~/.config
```

Jeżeli dotyczy sprzętu:

```text
lspci
lsusb
lsblk
journalctl -k
```

To kilka prostych reguł, które pozwalają odnaleźć się w systemie nawet wtedy, gdy pierwszy raz widzisz daną usługę lub aplikację.

---

# 209. Podsumowanie

Debian może być jednocześnie:

```text
wygodnym desktopem GNOME/KDE
+
stabilnym workstation
+
serwerem zarządzanym przez SSH
+
platformą dla aplikacji
+
hostem Dockera
+
bazą homelabu
```

Na desktopie GUI jest wygodną warstwą nad mechanizmami systemu.

Na serwerze pracujesz bezpośrednio z tymi mechanizmami.

Najważniejsze rzeczy do naprawdę dobrego opanowania to:

```text
APT
systemd
journalctl
SSH
sieć
uprawnienia
filesystem
backup
```

Reszta to w dużej mierze rozwinięcie tych kilku fundamentów.

---

## Stan dokumentu

Dokument przygotowany dla Debiana 13 „Trixie”.  
W chwili przygotowania aktualne wydanie stabilne Debiana to **13.7**.
