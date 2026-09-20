---
id: "doc-035"
title: "Dystrybucje Linuxa"
slug: "dystrybucje-linuxa"
description: "Linux nie jest jednym kompletnym systemem operacyjnym w takim sensie jak Windows czy macOS."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "linux"
  - "distributions"
  - "distros"
---

# Dystrybucje Linuxa

To kompendium porządkuje najważniejsze rodziny dystrybucji, modele wydań i menedżery pakietów. Numery wersji zmieniają się szybko, dlatego ważniejsze od zapamiętywania numeru wydania jest rozumienie modelu stable, LTS i rolling release.

Powiązane tematy: [Debian - desktop i serwer](techhandbook:doc-033), [Debian - shell](techhandbook:doc-027) oraz [Menedżery okien w Linuxie](techhandbook:doc-036).

## 1. Po co w ogóle są różne dystrybucje?

Linux nie jest jednym kompletnym systemem operacyjnym w takim sensie jak Windows czy macOS.  
Ściśle mówiąc, **Linux to jądro systemu**. Dystrybucja Linuxa składa się z:

- jądra Linux,
- narzędzi systemowych,
- bibliotek,
- menedżera pakietów,
- instalatora,
- domyślnego środowiska graficznego,
- konfiguracji systemu,
- repozytoriów oprogramowania,
- polityki aktualizacji i bezpieczeństwa.

Dlatego Debian, Ubuntu, Fedora, Arch czy openSUSE używają tego samego jądra Linux, ale mogą bardzo różnić się sposobem instalowania programów, aktualizacji i administracji.

---

# 2. Najważniejsze pojęcia

## 2.1. Dystrybucja

Gotowy system operacyjny zbudowany wokół jądra Linux.

Przykłady:

- Debian
- Ubuntu
- Fedora
- Arch Linux
- Linux Mint
- openSUSE

---

## 2.2. Rodzina dystrybucji

Wiele dystrybucji powstaje na bazie innych.

Przykładowe drzewo:

```text
Debian
├── Ubuntu
│   ├── Linux Mint
│   ├── Pop!_OS
│   └── Zorin OS
└── Kali Linux

Red Hat
├── Fedora
├── RHEL
├── Rocky Linux
└── AlmaLinux

Arch Linux
├── EndeavourOS
└── Manjaro
```

Nie oznacza to jednak, że system pochodny jest tylko „Debianem z tapetą”.  
Często posiada własne repozytoria, instalator, narzędzia i politykę aktualizacji.

---

# 3. Modele wydawania systemu

## 3.1. Stable release

System wydawany w konkretnych wersjach.

Przykłady aktualne na wrzesień 2026:

```text
Debian 13
Ubuntu 26.04 LTS
Fedora 44
```

Pakiety są testowane jako całość.

Zalety:

- stabilność,
- przewidywalność,
- mniejsze ryzyko problemów po aktualizacji.

Wady:

- starsze wersje programów.

---

## 3.2. Rolling release

System jest aktualizowany cały czas.

Nie instalujesz „Arch Linux 2026”.  
Instalujesz Arch Linux i aktualizujesz go regularnie.

Przykłady:

- Arch Linux,
- openSUSE Tumbleweed,
- Void Linux.

Zalety:

- bardzo nowe pakiety,
- nowe jądro,
- najnowsze sterowniki.

Wady:

- aktualizacja może czasem coś zepsuć,
- system wymaga nieco więcej uwagi.

---

## 3.3. LTS

**Long Term Support**.

Wersja wspierana przez kilka lat.

Najbardziej znany przykład:

```text
Ubuntu LTS
```

LTS jest często używane na:

- serwerach,
- komputerach firmowych,
- stacjach roboczych.

---

# 4. Menedżery pakietów

Jedna z największych różnic między dystrybucjami.

| Rodzina | Format | Menedżer |
|---|---|---|
| Debian / Ubuntu | `.deb` | `apt` |
| Fedora / RHEL | `.rpm` | `dnf` |
| Arch | `.pkg.tar.zst` | `pacman` |
| openSUSE | `.rpm` | `zypper` |
| Alpine | `.apk` | `apk` |
| Gentoo | źródła | `emerge` |
| Void | `.xbps` | `xbps-install` |

---

# 5. Debian

## Charakterystyka

Debian jest jedną z najstarszych i najważniejszych dystrybucji Linuxa.

Jest podstawą wielu innych systemów, przede wszystkim Ubuntu.

Główna filozofia Debiana:

> stabilność i przewidywalność są ważniejsze niż najnowsze wersje pakietów.

Debian świetnie sprawdza się jako:

- serwer,
- desktop,
- system developerski,
- baza pod kontenery,
- system do homelabu.

---

## Gałęzie Debiana

### stable

Oficjalna stabilna wersja.

Najlepsza do normalnego użytkowania i serwerów.

### testing

Pakiety przygotowywane do następnej wersji Debiana.

### unstable

Znana również jako:

```text
sid
```

Pakiety trafiają tutaj wcześniej.

---

## Pakiety

Debian używa:

```bash
apt
```

Przykłady:

```bash
sudo apt update
sudo apt upgrade
sudo apt install nginx
sudo apt remove nginx
```

---

## Zalety

- bardzo stabilny,
- ogromne repozytoria,
- świetna dokumentacja,
- duża społeczność,
- idealny na serwer,
- bardzo przewidywalne aktualizacje.

## Wady

- pakiety mogą być starsze,
- mniej automatycznej konfiguracji niż w Ubuntu,
- czasami wymaga ręcznego doinstalowania firmware.

---

## Dla kogo?

Bardzo dobry wybór dla:

- administratora,
- developera,
- użytkownika chcącego nauczyć się Linuxa,
- serwera domowego,
- VPS.

---

# 6. Ubuntu

Ubuntu powstało na bazie Debiana.

Celem Ubuntu było stworzenie bardziej dostępnego Linuxa.

Ubuntu występuje zarówno jako:

- desktop,
- serwer,
- system chmurowy.

---

## Ubuntu Desktop

Domyślnie używa środowiska:

```text
GNOME
```

Canonical modyfikuje jednak GNOME własnymi rozszerzeniami.

---

## Ubuntu Server

Bardzo popularny system serwerowy.

Często spotykany w:

- AWS,
- Azure,
- Google Cloud,
- VPS,
- Docker,
- Kubernetes.

---

## Wersje

Przykład:

```text
24.04 LTS
24.10
25.04
```

Format:

```text
ROK.MIESIĄC
```

Czyli:

```text
24.04 = kwiecień 2024
```

---

## Pakiety

Ubuntu używa:

```bash
apt
```

oraz dodatkowo:

```text
Snap
```

Przykład:

```bash
sudo apt install nginx
```

---

## Zalety

- ogromna społeczność,
- bardzo dużo poradników,
- dobra obsługa sprzętu,
- wygodne instalatory,
- popularne w chmurze,
- wersje LTS.

## Wady

- Canonical mocno promuje Snap,
- część użytkowników uważa system za zbyt „korporacyjny”,
- niektóre pakiety są instalowane jako Snap zamiast klasycznego `.deb`.

---

## Dla kogo?

Dobry wybór dla:

- początkujących,
- desktopu,
- serwera,
- programisty,
- użytkownika laptopa.

---

# 7. Linux Mint

Linux Mint bazuje głównie na Ubuntu.

Istnieje również wersja:

```text
LMDE
```

czyli:

```text
Linux Mint Debian Edition
```

bazująca bezpośrednio na Debianie.

---

## Cinnamon

Najbardziej charakterystycznym środowiskiem Mint jest:

```text
Cinnamon
```

Interfejs przypomina klasyczny desktop:

```text
menu + pasek zadań + zasobnik systemowy
```

Przez to Mint jest często polecany osobom przechodzącym z Windows.

---

## Pakiety

```bash
apt
```

---

## Zalety

- bardzo łatwy w obsłudze,
- świetny desktop,
- niewiele zbędnych komplikacji,
- dobra obsługa multimediów,
- klasyczny interfejs.

## Wady

- przeznaczony głównie na desktop,
- mniejsza społeczność niż Ubuntu,
- nie jest typowym wyborem serwerowym.

---

# 8. Fedora

Fedora jest dystrybucją sponsorowaną przez Red Hat.

Często otrzymuje nowe technologie wcześniej niż większość dystrybucji.

Przykłady technologii szeroko wdrażanych przez Fedorę:

- systemd,
- Wayland,
- PipeWire,
- SELinux.

---

## Pakiety

Fedora używa:

```bash
dnf
```

Przykład:

```bash
sudo dnf install nginx
sudo dnf upgrade
```

Pakiety mają format:

```text
RPM
```

---

## Charakter

Fedora znajduje się pomiędzy światem stabilnych dystrybucji i bleeding edge.

Pakiety są nowe, ale system nadal przechodzi intensywne testowanie.

---

## Zalety

- nowoczesne technologie,
- świeże jądro,
- świetne GNOME,
- dobry system developerski,
- bardzo dobra integracja SELinux.

## Wady

- krótki cykl życia wersji,
- aktualizacje systemu są częstsze niż w Debianie,
- kodeki multimedialne czasami trzeba instalować z dodatkowych repozytoriów.

---

## Dla kogo?

Świetny wybór dla:

- programisty,
- entuzjasty Linuxa,
- użytkownika GNOME,
- osoby zainteresowanej technologiami Red Hat.

---

# 9. Red Hat Enterprise Linux — RHEL

RHEL to komercyjna dystrybucja firmy Red Hat.

Najczęściej spotykana w dużych organizacjach.

Typowe zastosowania:

- serwery korporacyjne,
- centra danych,
- infrastruktura krytyczna,
- Oracle,
- SAP,
- systemy bankowe.

---

## Cechy

- bardzo długi okres wsparcia,
- certyfikacje sprzętu,
- profesjonalny support,
- konserwatywne aktualizacje.

---

## Pakiety

```bash
dnf
```

---

# 10. Rocky Linux

Rocky Linux powstał jako kompatybilna alternatywa dla RHEL.

Jego celem jest zapewnienie systemu:

```text
RHEL-compatible
```

bez konieczności kupowania subskrypcji Red Hat.

Popularny na:

- serwerach,
- VPS,
- hostingach,
- klastrach HPC.

---

# 11. AlmaLinux

AlmaLinux ma podobny cel jak Rocky Linux.

Również jest systemem z rodziny RHEL.

Typowe zastosowania:

- serwery,
- hosting,
- VPS,
- infrastruktura firmowa.

---

# 12. Arch Linux

Arch jest jedną z najbardziej znanych dystrybucji typu:

```text
rolling release
```

Filozofia Arch:

```text
Keep It Simple
```

System dostarcza stosunkowo prostą bazę, którą użytkownik konfiguruje sam.

---

## Instalacja

Klasyczny Arch wymaga znacznie większej wiedzy niż Ubuntu czy Mint.

Trzeba skonfigurować m.in.:

- partycje,
- system plików,
- bootloader,
- sieć,
- użytkowników,
- środowisko graficzne.

Istnieje jednak instalator:

```bash
archinstall
```

który znacznie upraszcza proces.

---

## Pakiety

Arch używa:

```bash
pacman
```

Przykłady:

```bash
sudo pacman -Syu
sudo pacman -S nginx
sudo pacman -R nginx
```

---

# 13. AUR

Jedną z największych zalet Arch jest:

```text
Arch User Repository
```

czyli:

```text
AUR
```

To ogromna kolekcja skryptów budujących pakiety przygotowanych przez społeczność.

Popularne helpery AUR:

```text
yay
paru
```

Przykład:

```bash
yay -S visual-studio-code-bin
```

---

## Zalety

- najnowsze pakiety,
- świetna dokumentacja Arch Wiki,
- AUR,
- ogromna możliwość konfiguracji,
- bardzo dobre środowisko do nauki Linuxa.

## Wady

- wymaga większej wiedzy,
- rolling release wymaga regularnych aktualizacji,
- czasami aktualizacja wymaga ręcznej interwencji.

---

# 14. EndeavourOS

EndeavourOS można traktować jako:

```text
Arch Linux z wygodnym instalatorem
```

Po instalacji system pozostaje bardzo blisko Arch.

Pakiety:

```bash
pacman
```

Dostępny jest również AUR.

---

## Zalety

- łatwiejsza instalacja niż Arch,
- bardzo blisko czystego Arch,
- dobry wybór do nauki Arch Linux.

---

# 15. Manjaro

Manjaro również bazuje na Arch Linux.

Różni się jednak bardziej od Arch niż EndeavourOS.

Manjaro opóźnia część pakietów w swoich repozytoriach w celu dodatkowego testowania.

---

## Zalety

- łatwy instalator,
- dobre wsparcie sprzętu,
- dostęp do AUR.

## Wady

- własne repozytoria mogą powodować różnice względem Arch,
- AUR zakłada często aktualny system Arch, więc czasami może powstać konflikt wersji.

---

# 16. openSUSE

openSUSE występuje w kilku wariantach.

Najważniejsze:

```text
openSUSE Leap
openSUSE Tumbleweed
```

---

# 17. openSUSE Leap

Wersja stabilna.

Nadaje się do:

- desktopu,
- workstation,
- serwera.

---

# 18. openSUSE Tumbleweed

Rolling release.

Jedna z najbardziej dopracowanych dystrybucji rolling release.

Pakiety są intensywnie testowane automatycznie.

---

## Pakiety

```bash
zypper
```

Przykład:

```bash
sudo zypper refresh
sudo zypper update
sudo zypper install nginx
```

---

# 19. YaST

Jednym z charakterystycznych narzędzi openSUSE jest:

```text
YaST
```

YaST pozwala konfigurować m.in.:

- sieć,
- użytkowników,
- bootloader,
- firewall,
- pakiety,
- partycje,
- usługi.

Może działać zarówno w GUI, jak i terminalu.

---

# 20. Pop!_OS

Pop!_OS został stworzony przez firmę System76.

Bazował historycznie na Ubuntu i został zaprojektowany przede wszystkim jako desktop dla:

- programistów,
- twórców,
- graczy,
- użytkowników laptopów.

System76 rozwija własne środowisko:

```text
COSMIC
```

---

## Zalety

- dobre wsparcie sprzętu,
- wygodny desktop,
- dobre wsparcie GPU,
- system nastawiony na produktywność.

---

# 21. Zorin OS

Zorin OS jest systemem przeznaczonym przede wszystkim dla osób przechodzących z Windows.

Interfejs można skonfigurować tak, aby przypominał:

- Windows,
- macOS,
- klasyczne GNOME.

Bazą jest Ubuntu.

---

# 22. elementary OS

Dystrybucja nastawiona na estetykę i prostotę.

Jej środowisko graficzne:

```text
Pantheon
```

wyraźnie inspiruje się macOS.

---

# 23. Kali Linux

Kali Linux jest specjalistyczną dystrybucją przeznaczoną do:

- pentestów,
- analizy bezpieczeństwa,
- testów sieci,
- digital forensics.

Bazą Kali jest Debian.

---

## Ważne

Kali nie jest najlepszym wyborem jako typowy desktop.

Nie jest „lepszym Debianem dla hackerów”.

Jest zestawem narzędzi przygotowanym do pracy związanej z bezpieczeństwem.

---

## Przykładowe narzędzia

```text
nmap
metasploit
burp suite
aircrack-ng
wireshark
john
hashcat
```

---

# 24. Alpine Linux

Alpine jest bardzo małą dystrybucją.

Najczęściej spotyka się ją w:

```text
Docker containers
```

---

## Charakterystyczne cechy

Alpine używa:

```text
musl libc
```

zamiast popularnego:

```text
glibc
```

oraz:

```text
BusyBox
```

zamiast wielu klasycznych narzędzi GNU.

---

## Pakiety

```bash
apk
```

Przykład:

```bash
apk add nginx
apk update
apk upgrade
```

---

## Zalety

- bardzo mały system,
- małe obrazy kontenerów,
- prostota,
- bezpieczeństwo.

## Wady

- niektóre aplikacje zakładają obecność glibc,
- czasami występują problemy kompatybilności.

---

# 25. Gentoo

Gentoo jest jedną z najbardziej konfigurowalnych dystrybucji Linuxa.

Wiele pakietów jest kompilowanych lokalnie.

Menedżer pakietów:

```text
Portage
```

Polecenie:

```bash
emerge
```

---

## USE flags

Jedną z charakterystycznych cech Gentoo są:

```text
USE flags
```

Pozwalają określić funkcje, z którymi program zostanie skompilowany.

---

## Zalety

- ogromna kontrola nad systemem,
- możliwość optymalizacji,
- świetny system edukacyjny dla zaawansowanych użytkowników.

## Wady

- czasochłonna instalacja,
- kompilowanie dużych programów może trwać bardzo długo,
- wymaga dużo wiedzy.

---

# 26. NixOS

NixOS jest jedną z najbardziej nietypowych dystrybucji Linuxa.

System opisuje się deklaratywnie.

Przykład koncepcji:

```nix
services.nginx.enable = true;
```

Następnie konfiguracja systemu jest budowana na podstawie pliku.

---

## Zalety

- konfiguracja systemu jako kod,
- łatwe odtwarzanie systemu,
- rollback zmian,
- bardzo dobra reprodukowalność środowiska.

## Wady

- wysoki próg wejścia,
- inny sposób myślenia niż w klasycznych dystrybucjach.

---

# 27. Void Linux

Void jest niezależną dystrybucją rolling release.

Nie bazuje na:

- Debianie,
- Arch,
- Red Hat.

---

## Init

Void nie używa systemd.

Zamiast tego korzysta z:

```text
runit
```

---

## Pakiety

```text
XBPS
```

Przykład:

```bash
sudo xbps-install -S
sudo xbps-install nginx
sudo xbps-install -Su
```

---

# 28. Slackware

Slackware jest jedną z najstarszych nadal rozwijanych dystrybucji Linuxa.

Filozofia:

- prostota,
- minimalna automatyzacja,
- klasyczne podejście UNIX.

Slackware jest dziś systemem niszowym, ale bardzo interesującym edukacyjnie.

---

# 29. SteamOS

SteamOS jest systemem rozwijanym przez Valve.

Jest używany przede wszystkim w:

```text
Steam Deck
```

Nowoczesne wersje SteamOS bazują na Arch Linux.

SteamOS wykorzystuje m.in.:

```text
Steam
Proton
Gamescope
```

do uruchamiania gier Windows na Linuxie.

---

# 30. Proxmox VE

Proxmox nie jest klasycznym desktopowym Linuxem.

To platforma wirtualizacyjna bazująca na Debianie.

Obsługuje:

```text
KVM
LXC
ZFS
Ceph
```

i posiada bardzo wygodny panel WWW.

Popularny w:

- homelabach,
- małych firmach,
- serwerach wirtualizacyjnych.

---

# 31. Środowisko graficzne nie jest dystrybucją

Częsty błąd początkujących.

GNOME, KDE czy XFCE nie są systemami Linux.

To środowiska graficzne.

Przykład:

```text
Debian + GNOME
Debian + KDE
Debian + XFCE
```

to nadal Debian.

---

# 32. Najpopularniejsze środowiska graficzne

## GNOME

Minimalistyczne i nowoczesne.

Popularne w:

- Fedora,
- Ubuntu,
- Debian.

---

## KDE Plasma

Bardzo konfigurowalne.

Interfejs domyślnie przypomina klasyczny desktop.

Popularne w:

- KDE Neon,
- Kubuntu,
- openSUSE,
- Arch.

---

## Cinnamon

Rozwijane głównie dla Linux Mint.

Klasyczny desktop.

---

## XFCE

Lekkie i szybkie środowisko.

Dobre dla starszego sprzętu.

---

## LXQt

Jeszcze lżejsze środowisko.

---

# 33. Flatpak

Flatpak pozwala instalować aplikacje niezależnie od dystrybucji.

Popularne źródło:

```text
Flathub
```

Przykład:

```bash
flatpak install flathub org.videolan.VLC
```

Flatpak jest szczególnie popularny na desktopach.

---

# 34. Snap

Snap został opracowany przez Canonical.

Przykład:

```bash
sudo snap install code --classic
```

Snap jest mocno zintegrowany z Ubuntu.

---

# 35. AppImage

AppImage pozwala uruchomić aplikację z pojedynczego pliku.

Przykład:

```bash
chmod +x program.AppImage
./program.AppImage
```

Nie wymaga klasycznej instalacji.

---

# 36. systemd

Większość współczesnych dystrybucji używa:

```text
systemd
```

Przykłady:

```text
Debian
Ubuntu
Fedora
Arch
openSUSE
```

---

## Sterowanie usługami

```bash
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl status nginx
```

Automatyczny start:

```bash
sudo systemctl enable nginx
```

---

# 37. Alternatywy dla systemd

Niektóre dystrybucje używają innych systemów init.

Przykłady:

```text
Void Linux -> runit
Alpine -> OpenRC
Gentoo -> OpenRC lub systemd
```

---

# 38. Porównanie głównych rodzin

| Dystrybucja | Pakiety | Model | Poziom trudności | Typowe zastosowanie |
|---|---|---|---|---|
| Debian | APT | stable | średni | serwer / desktop |
| Ubuntu | APT | fixed / LTS | łatwy | desktop / server |
| Mint | APT | fixed | bardzo łatwy | desktop |
| Fedora | DNF | fixed | średni | desktop / dev |
| RHEL | DNF | enterprise | średni | serwer |
| Rocky | DNF | enterprise | średni | serwer |
| AlmaLinux | DNF | enterprise | średni | serwer |
| Arch | pacman | rolling | trudniejszy | desktop / dev |
| EndeavourOS | pacman | rolling | średni | desktop |
| Manjaro | pacman | rolling | łatwy/średni | desktop |
| openSUSE Leap | zypper | fixed | średni | desktop / server |
| openSUSE Tumbleweed | zypper | rolling | średni | desktop |
| Alpine | apk | rolling | średni | kontenery |
| Gentoo | emerge | rolling | trudny | eksperymenty / nauka |
| NixOS | nix | rolling/fixed | trudny | dev / infrastruktura |
| Void | XBPS | rolling | trudniejszy | minimalistyczny desktop |
| Kali | APT | rolling | średni | security |
| Proxmox | APT | fixed | średni | wirtualizacja |

---

# 39. Jak wybrać dystrybucję?

## Chcę po prostu używać Linuxa

Najłatwiejsze:

```text
Linux Mint
Ubuntu
Fedora
```

---

## Chcę nauczyć się Linuxa

Dobry wybór:

```text
Debian
Fedora
Arch
```

Debian pozwala poznać klasyczny Linux bez przesadnej automatyzacji.

Arch zmusza użytkownika do zrozumienia większej liczby elementów systemu.

---

## Chcę system do programowania

Dobre wybory:

```text
Fedora
Debian
Ubuntu
Arch
```

---

## Chcę stabilny serwer

Najczęstsze wybory:

```text
Debian
Ubuntu Server LTS
Rocky Linux
AlmaLinux
RHEL
```

---

## Chcę homelab

Bardzo dobre opcje:

```text
Debian
Ubuntu Server
Proxmox
Rocky Linux
```

---

## Chcę najnowsze pakiety

```text
Arch Linux
openSUSE Tumbleweed
Fedora
```

---

## Chcę starego laptopa

Można użyć:

```text
Debian + XFCE
Linux Mint XFCE
Lubuntu
Xubuntu
```

---

## Chcę grać

Popularne opcje:

```text
Fedora
Ubuntu
Pop!_OS
Arch
EndeavourOS
```

Najważniejszy jest jednak nie tyle wybór dystrybucji, co:

- aktualne sterowniki GPU,
- aktualny kernel,
- Steam,
- Proton,
- Mesa.

---

# 40. Co jest naprawdę ważne przy wyborze dystrybucji?

W praktyce warto patrzeć głównie na:

1. model aktualizacji,
2. menedżer pakietów,
3. jakość repozytoriów,
4. długość wsparcia,
5. dostępność dokumentacji,
6. wsparcie sprzętu,
7. środowisko graficzne,
8. wielkość społeczności.

---

# 41. Co jest mniej ważne niż się wydaje?

## Wygląd systemu

Wygląd można zmienić.

Przykład:

Ubuntu może działać z:

```text
GNOME
KDE
XFCE
Cinnamon
```

---

## Domyślne aplikacje

Większość można po prostu usunąć lub zastąpić.

---

# 42. Różnice między dystrybucjami maleją

Dzięki technologiom takim jak:

```text
Flatpak
Docker
Podman
AppImage
Snap
```

aplikacje są coraz mniej zależne od konkretnej dystrybucji.

Deweloper może używać:

```text
Debiana
Fedory
Archa
```

i uruchamiać ten sam kontener Docker.

---

# 43. Najważniejsze repozytoria i społeczności

## Debian

```text
packages.debian.org
Debian Wiki
```

## Ubuntu

```text
Ubuntu Documentation
Ask Ubuntu
```

## Arch

```text
Arch Wiki
AUR
```

Arch Wiki jest jednym z najlepszych źródeł wiedzy o Linuxie również dla użytkowników innych dystrybucji.

---

# 44. Rodziny dystrybucji — skrót

## Debian

```text
Debian
Ubuntu
Mint
Pop!_OS
Zorin
Kali
Proxmox
```

Menedżer:

```text
APT
```

---

## Red Hat

```text
Fedora
RHEL
Rocky
AlmaLinux
```

Menedżer:

```text
DNF
```

---

## Arch

```text
Arch
EndeavourOS
Manjaro
SteamOS
```

Menedżer:

```text
pacman
```

---

## SUSE

```text
openSUSE Leap
openSUSE Tumbleweed
SUSE Linux Enterprise
```

Menedżer:

```text
zypper
```

---

# 45. Moja praktyczna mapa świata Linuxa

Można myśleć o dystrybucjach tak:

```text
                    Linux
                      │
        ┌─────────────┼───────────────┐
        │             │               │
     Debian        Red Hat           Arch
        │             │               │
     Ubuntu         Fedora        EndeavourOS
        │             │
      Mint          RHEL
                      │
               Rocky / Alma
```

Obok tych rodzin istnieją niezależne projekty:

```text
Gentoo
Void
NixOS
Alpine
Slackware
```

---

# 46. Gdybym miał znać tylko pięć dystrybucji

Jeżeli celem jest rozumienie świata Linuxa, warto dobrze znać przede wszystkim:

## Debian

Reprezentuje stabilny, klasyczny Linux serwerowy.

## Ubuntu

Najbardziej rozpowszechniona pochodna Debiana.

## Fedora

Reprezentuje nowoczesny świat Red Hat.

## Arch Linux

Reprezentuje rolling release i minimalistyczne podejście.

## openSUSE

Pokazuje alternatywną dużą rodzinę dystrybucji i bardzo dobre narzędzia administracyjne.

---

# 47. Pięć menedżerów pakietów, które warto rozpoznawać

```bash
apt
dnf
pacman
zypper
apk
```

Jeżeli widzisz:

```bash
apt install
```

prawdopodobnie jesteś w rodzinie Debian.

Jeżeli:

```bash
dnf install
```

najpewniej Fedora/RHEL.

Jeżeli:

```bash
pacman -S
```

Arch.

Jeżeli:

```bash
zypper install
```

openSUSE.

Jeżeli:

```bash
apk add
```

Alpine.

---

# 48. Najważniejsza rzecz do zapamiętania

Nie istnieje jedna „najlepsza dystrybucja Linuxa”.

Są dystrybucje lepiej dopasowane do konkretnych zastosowań.

Przykładowo:

```text
serwer        -> Debian / Ubuntu / Rocky
desktop       -> Mint / Fedora / Ubuntu
rolling       -> Arch / Tumbleweed
security      -> Kali
kontenery     -> Alpine
wirtualizacja -> Proxmox
nauka systemu -> Debian / Arch
```

Po poznaniu dwóch lub trzech rodzin Linuxa przejście między dystrybucjami staje się stosunkowo łatwe.

Największe różnice dotyczą wtedy głównie:

```text
menedżera pakietów,
konfiguracji systemu,
modelu aktualizacji,
repozytoriów.
```

## Oficjalne źródła

- Debian Releases: https://www.debian.org/releases/
- Ubuntu release cycle: https://ubuntu.com/about/release-cycle
- Fedora Workstation: https://fedoraproject.org/workstation/
- Arch Linux - About: https://archlinux.org/about/
- openSUSE: https://www.opensuse.org/
