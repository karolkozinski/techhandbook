---
id: "doc-037"
title: "Windows Server — administracja korporacyjna"
slug: "windows-server-administracja-korporacyjna"
description: "Windows Server w środowisku korporacyjnym pełni najczęściej kilka podstawowych funkcji:"
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "windows"
  - "server"
  - "active directory"
  - "administration"
---

# Windows Server — administracja korporacyjna

To kompendium opisuje mechanizmy administracji spotykane w środowisku domenowym Windows: Active Directory Domain Services, Group Policy, uprawnienia, DNS, DHCP, PowerShell, wdrażanie stacji i podstawy bezpieczeństwa. Skupia się na mechanizmach wspólnych dla współczesnych wydań Windows Server, zamiast na jednej konkretnej wersji.

Powiązane tematy: [Sieci komputerowe dla developera](techhandbook:doc-016) oraz [DNS, domeny i routing internetowy](techhandbook:doc-017).

## Spis treści

1. [Rola Windows Server w firmie](#1-rola-windows-server-w-firmie)
2. [Najważniejsze pojęcia](#2-najważniejsze-pojęcia)
3. [Active Directory Domain Services](#3-active-directory-domain-services)
4. [Użytkownicy, grupy i jednostki organizacyjne](#4-użytkownicy-grupy-i-jednostki-organizacyjne)
5. [Uprawnienia NTFS i udziały sieciowe](#5-uprawnienia-ntfs-i-udziały-sieciowe)
6. [Przydzielanie zasobów użytkownikom](#6-przydzielanie-zasobów-użytkownikom)
7. [Group Policy — GPO](#7-group-policy--gpo)
8. [Instalacja i wdrażanie stacji roboczych](#8-instalacja-i-wdrażanie-stacji-roboczych)
9. [Instalacja oprogramowania na końcówkach](#9-instalacja-oprogramowania-na-końcówkach)
10. [DNS i DHCP](#10-dns-i-dhcp)
11. [Serwer plików](#11-serwer-plików)
12. [Drukarki sieciowe](#12-drukarki-sieciowe)
13. [RDP i administracja zdalna](#13-rdp-i-administracja-zdalna)
14. [PowerShell dla administratora](#14-powershell-dla-administratora)
15. [Zarządzanie usługami](#15-zarządzanie-usługami)
16. [Logi i diagnostyka](#16-logi-i-diagnostyka)
17. [Aktualizacje i patch management](#17-aktualizacje-i-patch-management)
18. [Bezpieczeństwo](#18-bezpieczeństwo)
19. [Backup i odtwarzanie](#19-backup-i-odtwarzanie)
20. [Wirtualizacja Hyper-V](#20-wirtualizacja-hyper-v)
21. [Podstawowa administracja domeną](#21-podstawowa-administracja-domeną)
22. [Typowe zadania z życia administratora](#22-typowe-zadania-z-życia-administratora)
23. [Najważniejsze polecenia](#23-najważniejsze-polecenia)
24. [Checklista nowego użytkownika](#24-checklista-nowego-użytkownika)
25. [Checklista nowego komputera](#25-checklista-nowego-komputera)
26. [Co warto umieć dalej](#26-co-warto-umieć-dalej)

---

# 1. Rola Windows Server w firmie

Windows Server w środowisku korporacyjnym pełni najczęściej kilka podstawowych funkcji:

- zarządzanie kontami użytkowników,
- centralne uwierzytelnianie,
- zarządzanie komputerami firmowymi,
- przydzielanie zasobów,
- kontrolowanie uprawnień,
- przechowywanie plików,
- udostępnianie drukarek,
- automatyczna konfiguracja stacji roboczych,
- centralne wdrażanie oprogramowania,
- zarządzanie politykami bezpieczeństwa,
- obsługa DNS i DHCP,
- uruchamianie aplikacji biznesowych,
- hosting usług,
- wirtualizacja.

W klasycznym środowisku Microsoft podstawowym elementem infrastruktury jest:

**Active Directory Domain Services — AD DS**

czyli usługa katalogowa przechowująca informacje o:

- użytkownikach,
- komputerach,
- grupach,
- serwerach,
- uprawnieniach,
- zasadach konfiguracji.

---

# 2. Najważniejsze pojęcia

## Domena

Domena to logiczna struktura zarządzania komputerami i użytkownikami.

Przykład:

```text
corp.example.local
```

lub:

```text
firma.pl
```

Komputery mogą być członkami domeny.

Przykład:

```text
PC-USER01.corp.example.local
```

---

## Domain Controller — DC

Kontroler domeny to serwer obsługujący Active Directory.

Przechowuje między innymi:

- konta użytkowników,
- grupy,
- komputery,
- hasła,
- polityki domenowe.

Przykładowe kontrolery domeny:

```text
DC01
DC02
```

W poważnym środowisku powinny istnieć co najmniej dwa kontrolery domeny.

---

## Active Directory

Active Directory jest katalogiem zasobów firmy.

Można myśleć o nim jako o centralnej bazie:

```text
firma
 ├── użytkownicy
 ├── grupy
 ├── komputery
 ├── serwery
 └── polityki
```

---

## OU — Organizational Unit

OU służy do logicznego organizowania obiektów w Active Directory.

Przykład:

```text
Firma
 ├── Users
 │    ├── Marketing
 │    ├── Sales
 │    └── IT
 │
 ├── Computers
 │    ├── Laptops
 │    └── Desktops
 │
 └── Servers
```

OU jest bardzo ważne, ponieważ można do niego przypisać GPO.

---

## GPO — Group Policy Object

GPO pozwala centralnie konfigurować komputery i użytkowników.

Przykłady:

- blokowanie Panelu sterowania,
- ustawianie tapety,
- konfiguracja Windows Defender,
- instalowanie drukarek,
- mapowanie dysków,
- konfiguracja haseł,
- blokowanie USB,
- ustawianie proxy,
- ustawianie firewalla.

---

# 3. Active Directory Domain Services

Do zarządzania Active Directory najczęściej używa się:

```text
Active Directory Users and Computers
```

Uruchomienie:

```text
dsa.msc
```

Inne ważne konsole:

```text
gpmc.msc
```

Group Policy Management.

```text
dnsmgmt.msc
```

DNS Manager.

```text
dhcpmgmt.msc
```

DHCP Manager.

```text
compmgmt.msc
```

Computer Management.

```text
eventvwr.msc
```

Event Viewer.

```text
services.msc
```

Services.

---

# 4. Użytkownicy, grupy i jednostki organizacyjne

## Tworzenie użytkownika

Typowy użytkownik domenowy posiada:

```text
Imię: Jan
Nazwisko: Kowalski
login: jkowalski
email: jan.kowalski@example.com
```

Login domenowy może wyglądać:

```text
CORP\jkowalski
```

albo:

```text
jkowalski@example.com
```

---

## Hasło początkowe

Administrator często ustawia hasło tymczasowe:

```text
Temp-Password-123!
```

oraz opcję:

```text
User must change password at next logon
```

Dzięki temu użytkownik po pierwszym logowaniu ustawia własne hasło.

---

# Grupy

Nie należy przydzielać praw bezpośrednio użytkownikowi, jeśli można użyć grupy.

Zamiast:

```text
Jan Kowalski -> folder Marketing -> Modify
```

lepiej:

```text
Jan Kowalski
      ↓
GRP-Marketing-RW
      ↓
folder Marketing
```

To znacznie upraszcza administrację.

---

## Typowe grupy

```text
GRP-Marketing
GRP-Sales
GRP-Finance
GRP-IT
```

Grupy dostępu:

```text
FS-Marketing-Read
FS-Marketing-Modify
FS-Marketing-Full
```

---

# AGDLP

Klasyczna metoda zarządzania uprawnieniami w domenie Microsoft:

```text
A -> Accounts
G -> Global Groups
DL -> Domain Local Groups
P -> Permissions
```

Przykład:

```text
Jan Kowalski
        ↓
GG-Marketing
        ↓
DL-FS-Marketing-RW
        ↓
folder Marketing
```

Dzięki temu zmiana stanowiska użytkownika sprowadza się do zmiany członkostwa w grupach.

---

# 5. Uprawnienia NTFS i udziały sieciowe

Windows posiada dwa główne poziomy uprawnień do plików:

1. Share Permissions
2. NTFS Permissions

---

# Uprawnienia NTFS

Najważniejsze:

```text
Read
Write
Modify
Full Control
```

## Read

Pozwala:

- czytać pliki,
- otwierać foldery,
- uruchamiać programy.

---

## Write

Pozwala:

- tworzyć pliki,
- zapisywać dane.

---

## Modify

Pozwala:

- czytać,
- zapisywać,
- modyfikować,
- usuwać.

Najczęściej używane uprawnienie do folderów roboczych.

---

## Full Control

Pozwala dodatkowo:

- zmieniać uprawnienia,
- przejmować własność plików.

Full Control powinno być przydzielane ostrożnie.

---

# Dziedziczenie

Folder może dziedziczyć uprawnienia z folderu nadrzędnego.

Przykład:

```text
D:\Shares
    |
    └── Marketing
         |
         └── Kampanie
```

Jeżeli `Marketing` ma odpowiednie uprawnienia, folder `Kampanie` może je odziedziczyć.

---

# Effective Permissions

Jeśli użytkownik należy do kilku grup, jego końcowe prawa mogą wynikać z wielu źródeł.

Najważniejsza zasada:

```text
DENY zwykle ma pierwszeństwo przed ALLOW
```

Dlatego należy bardzo ostrożnie używać jawnego `Deny`.

Najlepsza praktyka:

zamiast:

```text
Deny
```

częściej lepiej po prostu:

```text
nie przydzielać Allow
```

---

# 6. Przydzielanie zasobów użytkownikom

Typowe zasoby:

- foldery sieciowe,
- dyski sieciowe,
- drukarki,
- aplikacje,
- serwery terminalowe,
- VPN,
- systemy biznesowe.

---

# Mapowanie dysków

Przykład:

```text
\\FS01\Marketing
```

Użytkownik może otrzymać dysk:

```text
M:
```

który wskazuje na:

```text
\\FS01\Marketing
```

---

## Mapowanie przez GPO

Najczęściej:

```text
User Configuration
→ Preferences
→ Windows Settings
→ Drive Maps
```

Przykład:

```text
M:
\\FS01\Marketing
```

Można zastosować Item-Level Targeting.

Przykład:

```text
jeżeli użytkownik należy do:
GG-Marketing
```

wtedy mapowany jest dysk:

```text
M:
```

---

# 7. Group Policy — GPO

GPO jest jednym z najważniejszych narzędzi administratora Windows.

Uruchomienie:

```text
gpmc.msc
```

---

# Struktura GPO

GPO posiada dwie części:

```text
Computer Configuration
User Configuration
```

## Computer Configuration

Dotyczy komputera.

Przykłady:

- firewall,
- Defender,
- usługi,
- aktualizacje,
- polityki bezpieczeństwa.

---

## User Configuration

Dotyczy użytkownika.

Przykłady:

- mapowanie dysków,
- drukarki,
- ustawienia pulpitu,
- ustawienia Explorer,
- skrypty logowania.

---

# Aktualizacja GPO

Na komputerze:

```powershell
gpupdate /force
```

---

# Sprawdzenie zastosowanych GPO

```powershell
gpresult /r
```

Dokładniejszy raport:

```powershell
gpresult /h report.html
```

---

# RSOP

Resultant Set of Policy.

Uruchomienie:

```text
rsop.msc
```

Pokazuje polityki faktycznie zastosowane do komputera i użytkownika.

---

# Kolejność przetwarzania GPO

Klasyczna kolejność:

```text
LSDOU
```

czyli:

```text
Local
Site
Domain
OU
```

---

# 8. Instalacja i wdrażanie stacji roboczych

W małej firmie komputer można przygotować ręcznie.

W korporacji często używa się automatyzacji.

Typowy proces:

```text
nowy komputer
↓
instalacja Windows
↓
sterowniki
↓
dołączenie do domeny
↓
GPO
↓
oprogramowanie
↓
konfiguracja zabezpieczeń
```

---

# Dołączenie komputera do domeny

Przykładowa domena:

```text
corp.example.local
```

Po dołączeniu komputer pojawia się w Active Directory.

Następnie można przenieść go do odpowiedniej OU.

Przykład:

```text
Computers
   ↓
Laptops
   ↓
Marketing
```

---

# Nazewnictwo komputerów

W firmie warto stosować jednolity schemat.

Przykład:

```text
PL-WRO-LT-001
PL-WRO-LT-002
PL-WRO-DT-001
```

gdzie:

```text
PL    kraj
WRO   lokalizacja
LT    laptop
DT    desktop
001   numer
```

---

# Narzędzia wdrożeniowe

W środowiskach Microsoft można spotkać między innymi:

```text
Windows Deployment Services
Microsoft Deployment Toolkit
Microsoft Configuration Manager
Microsoft Intune
Windows Autopilot
```

W nowoczesnych środowiskach chmurowych bardzo często używane są:

```text
Microsoft Intune
Windows Autopilot
Microsoft Entra ID
```

Klasyczne środowiska on-premises nadal często korzystają z:

```text
Active Directory
GPO
Configuration Manager
```

---

# 9. Instalacja oprogramowania na końcówkach

Administrator rzadko powinien instalować program ręcznie na setkach komputerów.

Typowe metody:

- GPO,
- PowerShell,
- Configuration Manager,
- Intune,
- systemy RMM,
- narzędzia producentów.

---

# Silent installation

W korporacji bardzo ważna jest instalacja bez interakcji użytkownika.

Przykład MSI:

```powershell
msiexec /i app.msi /qn
```

Parametr:

```text
/qn
```

oznacza instalację bez interfejsu.

---

# Odinstalowanie

```powershell
msiexec /x app.msi /qn
```

---

# Log instalacji

```powershell
msiexec /i app.msi /qn /L*v install.log
```

---

# Instalacja EXE

Każdy instalator może mieć inne przełączniki.

Najczęściej spotykane:

```text
/S
/silent
/verysilent
/quiet
```

Zawsze trzeba sprawdzić dokumentację producenta.

---

# 10. DNS i DHCP

# DNS

DNS tłumaczy nazwy na adresy IP.

Przykład:

```text
fileserver.corp.local
```

może wskazywać na:

```text
10.0.10.20
```

Sprawdzenie:

```powershell
nslookup fileserver
```

lub:

```powershell
Resolve-DnsName fileserver
```

---

# DHCP

DHCP automatycznie przydziela komputerom:

- adres IP,
- maskę,
- gateway,
- DNS.

Przykład:

```text
zakres:
10.0.10.100 - 10.0.10.200
```

---

# Rezerwacja DHCP

Można przypisać stały adres urządzeniu na podstawie MAC.

Przykład:

```text
drukarka:
MAC 00-11-22-33-44-55

IP:
10.0.10.50
```

---

# 11. Serwer plików

Typowy serwer:

```text
FS01
```

Udziały:

```text
\\FS01\Public
\\FS01\Marketing
\\FS01\Finance
\\FS01\IT
```

---

# Hidden shares

Udział zakończony `$` jest ukryty.

Przykład:

```text
\\FS01\Software$
```

---

# Administrative shares

Windows posiada między innymi:

```text
C$
ADMIN$
IPC$
```

Przykład:

```text
\\PC001\C$
```

pozwala administratorowi dostać się do dysku C zdalnego komputera.

---

# 12. Drukarki sieciowe

Windows Server może działać jako Print Server.

Przykład:

```text
PRINT01
```

Drukarka:

```text
\\PRINT01\HP-Marketing
```

---

# Dystrybucja przez GPO

Drukarki można przypisywać użytkownikom automatycznie.

Przykład:

```text
Marketing
↓
HP-Marketing
```

---

# 13. RDP i administracja zdalna

Remote Desktop Protocol:

```text
RDP
```

Domyślny port:

```text
TCP 3389
```

Uruchomienie klienta:

```text
mstsc
```

---

# Bezpieczne używanie RDP

Nie należy wystawiać RDP bezpośrednio do Internetu.

Lepsze rozwiązania:

```text
VPN
Remote Desktop Gateway
zero-trust access
```

---

# Windows Admin Center

Windows Admin Center umożliwia zarządzanie serwerami przez przeglądarkę.

Pozwala między innymi na:

- zarządzanie usługami,
- logami,
- storage,
- firewall,
- Hyper-V,
- aktualizacjami.

---

# 14. PowerShell dla administratora

PowerShell jest podstawowym narzędziem administratora Windows.

Sprawdzenie wersji:

```powershell
$PSVersionTable
```

---

# Get-Help

```powershell
Get-Help Get-Service
```

Pełna pomoc:

```powershell
Get-Help Get-Service -Full
```

Przykłady:

```powershell
Get-Help Get-Service -Examples
```

---

# Get-Command

```powershell
Get-Command
```

Wyszukanie poleceń:

```powershell
Get-Command *service*
```

---

# Pipeline

PowerShell przekazuje obiekty między poleceniami.

Przykład:

```powershell
Get-Service | Where-Object Status -eq "Running"
```

---

# Lista procesów

```powershell
Get-Process
```

---

# Lista usług

```powershell
Get-Service
```

---

# Restart usługi

```powershell
Restart-Service Spooler
```

---

# Informacje o komputerze

```powershell
Get-ComputerInfo
```

---

# Konfiguracja IP

```powershell
Get-NetIPConfiguration
```

---

# Adaptery sieciowe

```powershell
Get-NetAdapter
```

---

# Test połączenia

```powershell
Test-Connection server01
```

---

# Test portu

```powershell
Test-NetConnection server01 -Port 443
```

---

# 15. Zarządzanie usługami

GUI:

```text
services.msc
```

PowerShell:

```powershell
Get-Service
```

Uruchomienie:

```powershell
Start-Service Spooler
```

Zatrzymanie:

```powershell
Stop-Service Spooler
```

Restart:

```powershell
Restart-Service Spooler
```

---

# Startup Type

Typowe wartości:

```text
Automatic
Automatic (Delayed Start)
Manual
Disabled
```

---

# 16. Logi i diagnostyka

Najważniejsze narzędzie:

```text
Event Viewer
```

Uruchomienie:

```text
eventvwr.msc
```

---

# Najważniejsze logi

```text
Windows Logs
 ├── Application
 ├── Security
 ├── Setup
 └── System
```

---

# Application

Problemy aplikacji.

---

# System

Problemy:

- usług,
- sterowników,
- sprzętu,
- systemu.

---

# Security

Zdarzenia bezpieczeństwa:

- logowania,
- nieudane logowania,
- zmiany uprawnień.

---

# PowerShell

Ostatnie błędy systemowe:

```powershell
Get-WinEvent -LogName System -MaxEvents 50
```

---

# 17. Aktualizacje i patch management

W firmie aktualizacje powinny być kontrolowane centralnie.

Możliwe rozwiązania:

```text
Windows Update for Business
Microsoft Intune
Configuration Manager
WSUS
```

---

# Podejście falowe

Dobra praktyka:

```text
Ring 0 — IT
Ring 1 — pilot
Ring 2 — część firmy
Ring 3 — reszta organizacji
```

Dzięki temu problematyczna aktualizacja nie trafia od razu do wszystkich komputerów.

---

# 18. Bezpieczeństwo

Administrator Windows powinien przestrzegać zasady:

```text
least privilege
```

czyli:

```text
minimalnych potrzebnych uprawnień
```

---

# Konto administratora

Nie powinno się używać konta administratora do zwykłej pracy.

Przykład:

```text
jkowalski
```

konto zwykłe.

```text
adm-jkowalski
```

konto administracyjne.

---

# Tiering

W większych organizacjach konta administracyjne bywają rozdzielone:

```text
Admin workstation
Admin server
Domain admin
```

Nie należy używać Domain Admin do codziennych zadań.

---

# Local Administrator

Dostęp administratora lokalnego powinien być ograniczony.

Microsoft LAPS pozwala zarządzać unikalnymi hasłami lokalnych kont administratora.

---

# BitLocker

Szyfrowanie dysków:

```text
BitLocker
```

Powinno być stosowane szczególnie na laptopach.

---

# Microsoft Defender

Wbudowane zabezpieczenia obejmują między innymi:

- antywirus,
- firewall,
- ochronę przed ransomware,
- Attack Surface Reduction.

---

# Firewall

Sprawdzenie profili:

```powershell
Get-NetFirewallProfile
```

Reguły:

```powershell
Get-NetFirewallRule
```

---

# MFA

Dla kont administracyjnych MFA powinno być standardem tam, gdzie infrastruktura je obsługuje.

---

# 19. Backup i odtwarzanie

Najważniejsza zasada:

```text
backup nie istnieje, dopóki nie przetestowano restore
```

---

# Reguła 3-2-1

Minimum:

```text
3 kopie danych
2 różne nośniki
1 kopia poza główną lokalizacją
```

---

# Active Directory

W środowisku domenowym należy zapewnić backup:

- kontrolerów domeny,
- system state,
- kluczowych serwerów,
- danych użytkowników,
- konfiguracji.

---

# 20. Wirtualizacja Hyper-V

Windows Server może działać jako hypervisor.

Rola:

```text
Hyper-V
```

Pozwala uruchamiać maszyny wirtualne.

Przykład:

```text
HOST01
 ├── DC01
 ├── DC02
 ├── FS01
 └── APP01
```

---

# Virtual Switch

Hyper-V posiada przełączniki:

```text
External
Internal
Private
```

---

# 21. Podstawowa administracja domeną

## Sprawdzenie użytkownika

PowerShell:

```powershell
Get-ADUser jkowalski
```

Dokładniej:

```powershell
Get-ADUser jkowalski -Properties *
```

---

# Utworzenie użytkownika

Przykład:

```powershell
New-ADUser `
  -Name "Jan Kowalski" `
  -GivenName "Jan" `
  -Surname "Kowalski" `
  -SamAccountName "jkowalski" `
  -UserPrincipalName "jkowalski@example.com"
```

---

# Wyłączenie konta

```powershell
Disable-ADAccount jkowalski
```

---

# Włączenie

```powershell
Enable-ADAccount jkowalski
```

---

# Reset hasła

```powershell
Set-ADAccountPassword jkowalski -Reset
```

---

# Odblokowanie konta

```powershell
Unlock-ADAccount jkowalski
```

---

# Sprawdzenie grup

```powershell
Get-ADPrincipalGroupMembership jkowalski
```

---

# Dodanie do grupy

```powershell
Add-ADGroupMember GG-Marketing jkowalski
```

---

# Usunięcie z grupy

```powershell
Remove-ADGroupMember GG-Marketing jkowalski
```

---

# 22. Typowe zadania z życia administratora

## Przypadek 1 — nowy pracownik

Przychodzi nowa osoba do Marketingu.

Administrator:

1. tworzy konto,
2. przypisuje użytkownika do grup,
3. przypisuje licencje,
4. konfiguruje skrzynkę,
5. nadaje dostęp do folderów,
6. przypisuje drukarki,
7. przygotowuje komputer,
8. dołącza komputer do domeny,
9. sprawdza GPO,
10. testuje logowanie.

Przykład:

```text
jkowalski
↓
GG-Marketing
↓
DL-Marketing-RW
↓
\\FS01\Marketing
```

---

# Przypadek 2 — użytkownik zmienia dział

Użytkownik przechodzi:

```text
Marketing
```

do:

```text
Sales
```

Administrator nie powinien ręcznie zmieniać 20 uprawnień.

Powinien:

```text
usunąć użytkownika z GG-Marketing
```

oraz:

```text
dodać do GG-Sales
```

Reszta powinna wynikać z członkostwa w grupach.

---

# Przypadek 3 — użytkownik nie ma dysku sieciowego

Najpierw:

```powershell
gpupdate /force
```

Potem:

```powershell
gpresult /r
```

Sprawdzamy:

- czy GPO się zastosowało,
- czy użytkownik jest w odpowiedniej grupie,
- czy DNS działa,
- czy udział sieciowy jest dostępny.

Test:

```powershell
Test-Path \\FS01\Marketing
```

---

# Przypadek 4 — komputer nie widzi domeny

Sprawdzamy:

```powershell
ipconfig /all
```

Najważniejsze:

```text
DNS
```

Komputer domenowy powinien korzystać z DNS obsługującego domenę AD.

Następnie:

```powershell
nslookup corp.example.local
```

oraz:

```powershell
Test-Connection DC01
```

---

# Przypadek 5 — konto jest zablokowane

PowerShell:

```powershell
Unlock-ADAccount jkowalski
```

Potem trzeba znaleźć przyczynę.

Częste powody:

- stare hasło zapisane w telefonie,
- Outlook,
- VPN,
- mapowany dysk,
- usługa działająca na koncie użytkownika.

---

# Przypadek 6 — użytkownik nie ma dostępu do folderu

Sprawdzamy:

1. członkostwo w grupach,
2. Share Permissions,
3. NTFS Permissions,
4. dziedziczenie,
5. ewentualne `Deny`.

---

# Przypadek 7 — nowa aplikacja dla całej firmy

Najpierw test:

```text
IT
```

potem:

```text
Pilot Users
```

następnie:

```text
Production
```

Instalacja powinna być:

```text
silent
```

i posiadać możliwość automatycznego odinstalowania.

---

# 23. Najważniejsze polecenia

## Sieć

```powershell
ipconfig
ipconfig /all
ipconfig /flushdns
nslookup
ping
tracert
route print
netstat -ano
```

---

# Nowoczesne odpowiedniki PowerShell

```powershell
Get-NetIPConfiguration
Get-NetAdapter
Get-NetRoute
Get-NetTCPConnection
Resolve-DnsName
Test-NetConnection
```

---

# Domena

```powershell
whoami
whoami /groups
gpupdate /force
gpresult /r
nltest /dsgetdc:corp.example.local
```

---

# Komputer

```powershell
hostname
systeminfo
Get-ComputerInfo
```

---

# Użytkownicy

```powershell
Get-ADUser
Get-ADGroup
Get-ADComputer
```

---

# Usługi

```powershell
Get-Service
Start-Service
Stop-Service
Restart-Service
```

---

# Procesy

```powershell
Get-Process
Stop-Process
```

---

# Pliki

```powershell
Get-ChildItem
Copy-Item
Move-Item
Remove-Item
Test-Path
```

---

# 24. Checklista nowego użytkownika

```text
[ ] utworzyć konto AD
[ ] ustawić poprawne imię i nazwisko
[ ] ustawić login
[ ] ustawić UPN
[ ] ustawić hasło początkowe
[ ] wymusić zmianę hasła
[ ] przypisać grupy
[ ] przypisać dostęp do zasobów
[ ] skonfigurować pocztę
[ ] przypisać licencje
[ ] przypisać VPN
[ ] przypisać aplikacje
[ ] przypisać drukarki
[ ] przygotować komputer
[ ] przetestować logowanie
```

---

# 25. Checklista nowego komputera

```text
[ ] sprawdzić BIOS/UEFI
[ ] włączyć Secure Boot
[ ] zainstalować Windows
[ ] zainstalować sterowniki
[ ] zaktualizować system
[ ] ustawić nazwę komputera
[ ] dołączyć do domeny / Entra ID
[ ] przenieść komputer do poprawnego OU
[ ] sprawdzić GPO
[ ] włączyć BitLocker
[ ] sprawdzić Defender
[ ] zainstalować aplikacje
[ ] skonfigurować VPN
[ ] sprawdzić drukarki
[ ] sprawdzić udziały sieciowe
[ ] przetestować konto użytkownika
```

---

# 26. Co warto umieć dalej

Administrator Windows powinien stopniowo poznać:

## Active Directory

- struktura domeny,
- OU,
- grupy,
- delegowanie uprawnień,
- replikacja,
- FSMO,
- trusts.

---

## Group Policy

- Security Filtering,
- WMI Filtering,
- Loopback Processing,
- Preferences,
- Administrative Templates,
- troubleshooting GPO.

---

## PowerShell

Szczególnie:

```text
ActiveDirectory module
CIM
Remoting
pipeline
functions
scripts
CSV
JSON
REST API
```

---

## Sieci

Minimum:

```text
TCP/IP
DNS
DHCP
VLAN
routing
NAT
VPN
firewall
```

---

## Microsoft 365

W nowoczesnej firmie administrator Windows często pracuje także z:

```text
Microsoft Entra ID
Microsoft 365
Exchange Online
Microsoft Intune
Defender for Endpoint
Windows Autopilot
```

---

## Bezpieczeństwo

Warto znać:

```text
Microsoft LAPS
BitLocker
MFA
Conditional Access
Windows Defender
ASR
AppLocker
Windows Firewall
Privileged Access
```

---

# Mentalny model administratora Windows

Przy większości problemów warto myśleć w tej kolejności:

```text
użytkownik
↓
konto
↓
grupy
↓
komputer
↓
GPO
↓
DNS
↓
sieć
↓
serwer
↓
uprawnienia
↓
aplikacja
```

Przykład:

```text
"Nie mam dostępu do folderu."
```

Administrator sprawdza:

```text
czy użytkownik jest w odpowiedniej grupie?
↓
czy grupa posiada prawa?
↓
czy udział sieciowy działa?
↓
czy DNS działa?
↓
czy serwer jest dostępny?
↓
czy NTFS pozwala na dostęp?
```

Takie uporządkowane podejście jest znacznie skuteczniejsze niż przypadkowe klikanie ustawień.

---

# Najważniejsza zasada administracji korporacyjnej

Nie zarządzaj pojedynczym użytkownikiem, jeśli możesz zarządzać grupą.

Nie konfiguruj pojedynczego komputera, jeśli możesz użyć GPO.

Nie instaluj programu ręcznie, jeśli możesz zrobić deployment.

Nie używaj Domain Admin, jeśli wystarczy konto z niższymi uprawnieniami.

Nie zakładaj, że backup działa, dopóki nie przetestujesz odtwarzania.

Dobrze zaprojektowane środowisko Windows powinno pozwalać administratorowi zarządzać tysiącem komputerów niemal tak samo łatwo jak dziesięcioma.

## Oficjalne źródła

- Windows Server documentation: https://learn.microsoft.com/windows-server/
- Active Directory Domain Services: https://learn.microsoft.com/windows-server/identity/ad-ds/
- Group Policy: https://learn.microsoft.com/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview
- PowerShell documentation: https://learn.microsoft.com/powershell/
