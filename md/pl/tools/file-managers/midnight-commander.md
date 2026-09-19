# Midnight Commander — kompendium wiedzy

## 1. Czym jest Midnight Commander?

**Midnight Commander (MC)** to tekstowy, dwupanelowy menedżer plików działający w terminalu.

Jeśli pamiętasz Norton Commandera, Total Commandera albo FAR Managera, idea jest bardzo podobna:

- lewy panel pokazuje jeden katalog,
- prawy panel pokazuje drugi katalog,
- między panelami można kopiować i przenosić pliki,
- operacje wykonuje się głównie klawiaturą,
- u dołu ekranu znajduje się linia poleceń shella,
- MC ma własny edytor tekstu: **mcedit**,
- potrafi pracować z archiwami i zdalnymi systemami plików.

MC świetnie sprawdza się na:

- Debianie,
- Ubuntu,
- FreeBSD,
- serwerach bez GUI,
- połączeniach SSH,
- stacjach roboczych Linux/BSD.

Nie zastępuje shella. Jest jego wygodnym uzupełnieniem.

---

# 2. Instalacja

## Debian / Ubuntu

```bash
sudo apt update
sudo apt install mc
```

Uruchomienie:

```bash
mc
```

---

## FreeBSD

```bash
pkg install mc
```

Uruchomienie:

```bash
mc
```

Jeżeli korzystasz z Ports:

```bash
cd /usr/ports/misc/mc
make install clean
```

---

# 3. Jak wygląda ekran MC?

Typowy ekran składa się z:

```text
┌──────────────────────┬──────────────────────┐
│ LEWY PANEL           │ PRAWY PANEL          │
│ /home/user          │ /etc                 │
│                      │                      │
│ pliki                │ pliki                │
│ katalogi             │ katalogi             │
│                      │                      │
├──────────────────────┴──────────────────────┤
│ linia poleceń shella                        │
├─────────────────────────────────────────────┤
│ F1 Help F2 Menu F3 View F4 Edit ...        │
└─────────────────────────────────────────────┘
```

Aktywny panel jest wyróżniony.

Najważniejsza idea:

> większość operacji odbywa się z aktywnego panelu do drugiego panelu.

Przykład:

- lewy panel: `/home/user/projekt`
- prawy panel: `/var/www`

Po zaznaczeniu pliku w lewym panelu i naciśnięciu `F5`, MC domyślnie zaproponuje skopiowanie pliku do `/var/www`.

---

# 4. Podstawowa nawigacja

## Strzałki

```text
↑ ↓
```

Przesuwają kursor po liście plików.

---

## Enter

```text
Enter
```

Na katalogu:

- wchodzi do katalogu.

Na pliku:

- uruchamia akcję przypisaną do typu pliku,
- czasami otwiera plik,
- czasami uruchamia program.

---

## Powrót do katalogu nadrzędnego

Wybierz:

```text
..
```

i naciśnij:

```text
Enter
```

Można też używać:

```text
Ctrl+PgUp
```

zależnie od konfiguracji terminala.

---

# 5. Przełączanie paneli

```text
Tab
```

Przełącza aktywny panel.

Przykład:

```text
lewy panel aktywny
Tab
prawy panel aktywny
```

To jeden z najczęściej używanych klawiszy w MC.

---

# 6. Klawisze funkcyjne F1–F10

Podstawowa belka MC wygląda zwykle tak:

```text
F1  Help
F2  Menu
F3  View
F4  Edit
F5  Copy
F6  Move
F7  Mkdir
F8  Delete
F9  Menu
F10 Quit
```

---

# 7. F1 — pomoc

```text
F1
```

Otwiera pomoc kontekstową.

Przydaje się szczególnie wtedy, gdy nie pamiętasz mniej używanego skrótu.

---

# 8. F2 — menu użytkownika

```text
F2
```

Uruchamia **User Menu**.

Można tam definiować własne polecenia.

Przykładowo:

- kompilowanie projektu,
- uruchamianie testów,
- pakowanie katalogu,
- deployment,
- wykonywanie skryptów.

Konfiguracja zwykle znajduje się w pliku:

```text
~/.config/mc/menu
```

lub w starszych instalacjach:

```text
~/.mc.menu
```

---

# 9. F3 — podgląd pliku

```text
F3
```

Otwiera plik w trybie tylko do odczytu.

Dobre do:

- logów,
- konfiguracji,
- kodu,
- plików tekstowych,
- dużych plików.

Wyjście:

```text
F10
```

lub:

```text
Esc
```

---

# 10. F4 — edycja pliku

```text
F4
```

Domyślnie uruchamia:

```text
mcedit
```

To wbudowany edytor Midnight Commandera.

Jeżeli skonfigurujesz zewnętrzny edytor, `F4` może uruchamiać np.:

```text
vim
nvim
nano
```

---

# 11. F5 — kopiowanie

```text
F5
```

Kopiuje zaznaczony plik lub katalog.

Najczęściej:

```text
aktywny panel → drugi panel
```

Przykład:

Lewy panel:

```text
/home/user/projekt
```

Prawy panel:

```text
/var/www/projekt
```

Zaznaczasz:

```text
index.html
```

i naciskasz:

```text
F5
```

MC zaproponuje:

```text
Copy "index.html" to "/var/www/projekt"
```

---

# 12. F6 — przenoszenie / zmiana nazwy

```text
F6
```

Służy do:

- przenoszenia pliku,
- przenoszenia katalogu,
- zmiany nazwy.

Zmiana nazwy:

```text
stary.txt
```

F6:

```text
nowy.txt
```

Jeżeli podasz inną ścieżkę, plik zostanie przeniesiony.

---

# 13. F7 — tworzenie katalogu

```text
F7
```

Tworzy nowy katalog.

Przykład:

```text
F7
backup
Enter
```

Efekt:

```text
./backup
```

---

# 14. F8 — usuwanie

```text
F8
```

Usuwa:

- plik,
- katalog,
- zaznaczoną grupę plików.

MC zwykle prosi o potwierdzenie.

Uwaga:

MC nie jest koszem systemowym.

Usunięcie pliku na serwerze zwykle oznacza prawdziwe:

```bash
rm
```

lub odpowiednik.

---

# 15. F9 — główne menu

```text
F9
```

Aktywuje górne menu.

Znajdziesz tam m.in.:

```text
Left
File
Command
Options
Right
```

Menu pozwala dostać się do praktycznie każdej funkcji MC.

---

# 16. F10 — wyjście

```text
F10
```

Kończy MC.

Jeżeli terminal przechwytuje F10, można użyć:

```text
Esc
0
```

---

# 17. Zaznaczanie plików

## Insert

```text
Insert
```

Zaznacza plik i przesuwa kursor do następnego.

Można zaznaczyć wiele plików:

```text
Insert
Insert
Insert
```

Potem:

```text
F5
```

skopiuje wszystkie zaznaczone pliki.

---

# 18. Zaznaczanie według maski

```text
+
```

Pozwala zaznaczyć pliki według wzorca.

Przykład:

```text
*.log
```

zaznaczy wszystkie logi.

Inny przykład:

```text
*.jpg
```

---

## Odznaczanie

```text
-
```

Pozwala odznaczyć pliki według maski.

---

# 19. Szybkie przejście do katalogu

Można wpisać:

```text
cd /etc/nginx
```

w linii poleceń MC.

Po:

```text
Enter
```

aktywny panel przejdzie do katalogu.

Można też użyć menu:

```text
F9
Command
Directory hotlist
```

---

# 20. Directory Hotlist

MC ma listę ulubionych katalogów.

Uruchomienie:

```text
Ctrl+\
```

Można tam dodać np.:

```text
/home/user/projects
/etc/nginx
/var/www
/var/log
/usr/local/etc
```

Dzięki temu nie trzeba pamiętać pełnych ścieżek.

---

# 21. Szybki podgląd katalogów

Można ustawić jeden z paneli jako:

```text
Quick View
```

Panel będzie automatycznie pokazywał zawartość wskazanego pliku.

Przydatne przy:

- przeglądaniu konfiguracji,
- czytaniu logów,
- porównywaniu plików.

---

# 22. Sortowanie

Panel można sortować według:

```text
Name
Extension
Size
Modify time
Access time
Change time
Unsorted
```

Menu:

```text
F9
Left / Right
Sort order
```

Popularne:

```text
Name
Modify time
Size
```

---

# 23. Pokazywanie ukrytych plików

Pliki zaczynające się od:

```text
.
```

np.:

```text
.bashrc
.ssh
.git
.config
```

są domyślnie plikami ukrytymi.

Włączenie / wyłączenie:

```text
Ctrl+H
```

---

# 24. Odświeżenie panelu

```text
Ctrl+R
```

Odświeża zawartość paneli.

Przydaje się, gdy pliki zmieniły się poza MC.

---

# 25. Shell wewnątrz MC

Jedną z największych zalet MC jest możliwość korzystania z normalnego shella.

Na dole znajduje się linia poleceń.

Możesz wpisać:

```bash
ls -lah
```

```bash
git status
```

```bash
docker ps
```

```bash
systemctl status nginx
```

```bash
service nginx status
```

```bash
make
```

```bash
go test ./...
```

MC uruchomi polecenie w katalogu aktywnego panelu.

---

# 26. Ukrywanie paneli i korzystanie z pełnego shella

```text
Ctrl+O
```

Ukrywa oba panele.

Dostajesz pełny terminal.

Ponowne:

```text
Ctrl+O
```

przywraca MC.

To bardzo wygodny tryb pracy:

```text
MC
↓
Ctrl+O
↓
shell
↓
Ctrl+O
↓
MC
```

---

# 27. Historia poleceń

Linia poleceń MC korzysta z historii.

Można używać:

```text
↑
↓
```

do poruszania się po poprzednich poleceniach.

---

# 28. Wstawianie nazwy pliku do linii poleceń

Bardzo przydatne skróty.

## Ctrl+Enter

Wstawia nazwę zaznaczonego pliku do linii poleceń.

Przykład:

zaznaczony:

```text
backup.tar.gz
```

Po:

```text
Ctrl+Enter
```

w linii poleceń pojawi się:

```text
backup.tar.gz
```

---

## Ctrl+Shift+Enter

W wielu terminalach wstawia pełną ścieżkę.

Obsługa może zależeć od emulatora terminala.

---

# 29. Wyszukiwanie plików

Menu:

```text
F9
Command
Find file
```

Można szukać:

```text
*.conf
```

```text
*.go
```

```text
nginx.conf
```

Możliwe jest również wyszukiwanie tekstu wewnątrz plików.

Przykład:

```text
Content:
listen 443
```

Dzięki temu MC może zastąpić prosty:

```bash
find
```

oraz:

```bash
grep -R
```

---

# 30. mcedit — wbudowany edytor

Uruchomienie z MC:

```text
F4
```

Uruchomienie bez MC:

```bash
mcedit plik.txt
```

---

# 31. Podstawy mcedit

Najważniejsze skróty:

```text
F2   zapis
F3   zaznaczanie
F4   zamiana
F5   kopiowanie
F6   przenoszenie zaznaczenia
F7   wyszukiwanie
F8   usuwanie zaznaczenia
F10  wyjście
```

W wielu konfiguracjach dostępne są również skróty:

```text
Ctrl+S
Ctrl+F
Ctrl+Z
Ctrl+Y
```

ale zachowanie może zależeć od konfiguracji i terminala.

---

# 32. Zapis pliku w mcedit

```text
F2
```

Zapisuje dokument.

Jeżeli plik jest nowy, MC zapyta o nazwę.

---

# 33. Wyszukiwanie tekstu w mcedit

```text
F7
```

Wpisujesz np.:

```text
server_name
```

MC znajduje następne wystąpienie.

---

# 34. Zamiana tekstu

```text
F4
```

Przykład:

```text
search:
www.example.com

replace:
example.com
```

---

# 35. Zaznaczanie tekstu

```text
F3
```

Rozpoczyna zaznaczenie.

Przesuwasz kursor.

Ponowne:

```text
F3
```

kończy zaznaczenie.

Potem można:

```text
F5
```

skopiować zaznaczenie.

---

# 36. Edycja plików systemowych

Jeżeli uruchomisz:

```bash
mc
```

jako zwykły użytkownik, nie będziesz mógł zapisywać np.:

```text
/etc/fstab
/etc/ssh/sshd_config
/etc/nginx/nginx.conf
```

Można uruchomić:

```bash
sudo mc
```

ale nie zawsze jest to najlepszy sposób.

Bezpieczniej często użyć:

```bash
sudoedit /etc/nginx/nginx.conf
```

lub:

```bash
sudo mcedit /etc/nginx/nginx.conf
```

Jeżeli świadomie administrujesz systemem:

```bash
sudo mc
```

jest oczywiście możliwe.

Trzeba jednak pamiętać, że wtedy wszystkie operacje MC wykonują się jako root.

---

# 37. Uprawnienia plików

MC pozwala zmieniać prawa dostępu.

Zaznacz plik.

Menu:

```text
F9
File
Chmod
```

lub skrót zależny od konfiguracji.

Zobaczysz prawa:

```text
Owner
Group
Other
```

oraz:

```text
read
write
execute
```

Czyli odpowiednik:

```bash
chmod
```

---

# 38. Właściciel pliku

MC umożliwia zmianę właściciela.

Menu:

```text
F9
File
Chown
```

Odpowiada poleceniu:

```bash
chown
```

Przykład shellowy:

```bash
sudo chown user:user plik.txt
```

---

# 39. Dowiązania symboliczne

MC potrafi tworzyć symlinki.

Menu:

```text
F9
File
Symlink
```

Odpowiednik:

```bash
ln -s źródło link
```

Przykład:

```bash
ln -s /var/www/site ~/site
```

---

# 40. Archiwa

Jedna z bardzo wygodnych funkcji MC:

archiwa można często otwierać tak, jak katalogi.

Przykład:

```text
backup.tar.gz
```

Naciśnij:

```text
Enter
```

MC pokaże zawartość archiwum.

Można wtedy kopiować pliki z archiwum do drugiego panelu.

Obsługiwane formaty zależą od zainstalowanych narzędzi, np.:

```text
tar
tar.gz
tar.bz2
tar.xz
zip
7z
rpm
deb
```

---

# 41. MC jako menedżer plików na serwerze

Typowy sposób pracy:

```text
lewy panel:
 /etc/nginx/sites-available

prawy panel:
 /var/www
```

Możesz:

- edytować konfigurację,
- kopiować pliki,
- podglądać logi,
- uruchamiać polecenia,
- restartować usługę.

---

# 42. Połączenia SFTP / SSH

MC posiada wirtualne systemy plików.

Można otworzyć zdalny serwer przez SFTP.

Przykład:

```text
sftp://user@server/
```

lub zależnie od wersji MC:

```text
sh://user@server/
```

Wpisz ścieżkę przez:

```text
Ctrl+L
```

lub odpowiednią funkcję menu.

Przykład:

```text
sftp://user@192.168.1.20/
```

Po połączeniu jeden panel może pokazywać komputer lokalny, a drugi serwer.

Przykład:

```text
LEFT
/home/user/project

RIGHT
sftp://user@server/var/www/project
```

Wtedy:

```text
F5
```

kopiuje plik przez sieć.

---

# 43. SSHFS kontra VFS MC

MC może korzystać ze swojego mechanizmu VFS.

Alternatywą jest:

```bash
sshfs
```

Przykład:

```bash
mkdir ~/server
sshfs user@server:/ ~/server
```

Następnie MC widzi:

```text
~/server
```

jak zwykły katalog.

---

# 44. FTP

MC historycznie obsługuje FTP.

Przykładowa ścieżka:

```text
ftp://user@server/
```

Do nowych zastosowań lepiej używać:

```text
SFTP
```

ponieważ klasyczny FTP nie szyfruje transmisji.

---

# 45. Panel informacji

Jeden panel może pokazywać informacje o zaznaczonym pliku.

Menu:

```text
Left / Right
Info
```

Można zobaczyć:

- rozmiar,
- właściciela,
- grupę,
- uprawnienia,
- czas modyfikacji,
- system plików.

---

# 46. Tree View

Panel można przełączyć w widok drzewa katalogów.

Menu:

```text
Left / Right
Tree
```

Pozwala poruszać się po strukturze katalogów.

---

# 47. Porównywanie katalogów

MC potrafi porównać katalogi w lewym i prawym panelu.

Menu:

```text
F9
Command
Compare directories
```

Przydatne np. dla:

```text
projekt lokalny
vs
projekt na serwerze
```

lub:

```text
backup
vs
oryginał
```

---

# 48. Obliczanie rozmiaru katalogów

Normalnie katalog może być pokazany jako:

```text
4096
```

co nie oznacza rozmiaru jego zawartości.

Aby policzyć rzeczywisty rozmiar katalogu:

```text
Ctrl+Space
```

MC obliczy rozmiar.

Przy dużych katalogach może to chwilę potrwać.

---

# 49. Polecenia shella i aktywny katalog

Jeżeli aktywny panel znajduje się w:

```text
/home/user/project
```

i wpiszesz:

```bash
git status
```

polecenie wykona się właśnie tam.

To bardzo wygodne.

MC działa wtedy trochę jak połączenie:

```text
file manager
+
terminal
+
edytor
```

---

# 50. Git i MC

MC nie jest klientem Git, ale świetnie współpracuje z Gitem.

Przykład:

```bash
git status
```

```bash
git diff
```

```bash
git add .
```

```bash
git commit -m "Update configuration"
```

```bash
git pull
```

```bash
git push
```

Możesz jednocześnie:

- przeglądać pliki w panelach,
- edytować je F4,
- wykonywać Git z linii poleceń.

---

# 51. Docker i MC

MC jest wygodnym dodatkiem przy pracy z Dockerem.

Przykłady:

```bash
docker ps
```

```bash
docker compose up -d
```

```bash
docker compose logs -f
```

```bash
docker exec -it container_name sh
```

Możesz edytować:

```text
Dockerfile
docker-compose.yml
.env
```

przy pomocy:

```text
F4
```

---

# 52. Systemd i MC

Na Debianie możesz np. edytować:

```text
/etc/systemd/system/moj-serwis.service
```

potem:

```bash
sudo systemctl daemon-reload
sudo systemctl restart moj-serwis
sudo systemctl status moj-serwis
```

Wszystko bez wychodzenia z MC.

---

# 53. FreeBSD i MC

Na FreeBSD MC działa praktycznie tak samo.

Różnica wynika głównie z samego systemu.

Konfiguracje usług często znajdują się w:

```text
/usr/local/etc
```

np.:

```text
/usr/local/etc/nginx
```

Konfiguracja startu usług:

```text
/etc/rc.conf
```

Sterowanie usługą:

```bash
service nginx status
service nginx restart
```

Pakiety:

```bash
pkg install
pkg upgrade
pkg delete
```

MC jest więc bardzo wygodnym narzędziem administracyjnym także na FreeBSD.

---

# 54. Konfiguracja MC

Menu:

```text
F9
Options
Configuration
```

Można ustawić m.in.:

- potwierdzenie usuwania,
- zachowanie przy kopiowaniu,
- wyświetlanie ukrytych plików,
- sposób pracy paneli,
- edytor,
- zachowanie klawiatury.

---

# 55. Pliki konfiguracyjne

Współczesne wersje MC używają zwykle:

```text
~/.config/mc/
```

Znajdziesz tam m.in.:

```text
ini
panels.ini
hotlist
menu
```

Przykład:

```bash
ls -la ~/.config/mc/
```

---

# 56. Zewnętrzny edytor

MC może używać np.:

```text
vim
nvim
nano
```

Zmienna środowiskowa:

```bash
export EDITOR=vim
```

lub:

```bash
export EDITOR=nvim
```

MC może jednak nadal korzystać z `mcedit`, jeśli opcja:

```text
Use internal edit
```

jest włączona.

Można ją zmienić w:

```text
F9
Options
Configuration
```

---

# 57. Zewnętrzny viewer

Podobnie można skonfigurować zewnętrzny program do podglądu.

Domyślny viewer MC jest jednak bardzo dobry do:

- logów,
- kodu,
- plików tekstowych.

---

# 58. Uruchomienie MC w konkretnym katalogu

```bash
mc /var/www
```

albo:

```bash
cd /var/www
mc
```

---

# 59. MC z dwoma katalogami

Można uruchomić:

```bash
mc /etc/nginx /var/www
```

Wtedy panele otworzą wskazane katalogi.

To bardzo wygodne.

---

# 60. MC przez SSH

Typowy scenariusz:

```bash
ssh user@server
```

a potem:

```bash
mc
```

Na serwerach bez GUI MC może znacząco przyspieszyć pracę.

---

# 61. Sesje tmux i screen

Dobrym połączeniem jest:

```text
SSH
+
tmux
+
MC
```

Przykład:

```bash
tmux
mc
```

Jeżeli połączenie SSH zostanie zerwane, sesja tmux może pozostać aktywna.

---

# 62. Przydatne skróty — ściąga

| Skrót | Funkcja |
|---|---|
| `Tab` | zmiana aktywnego panelu |
| `Enter` | wejście / uruchomienie |
| `F3` | podgląd |
| `F4` | edycja |
| `F5` | kopiowanie |
| `F6` | przenoszenie / rename |
| `F7` | nowy katalog |
| `F8` | usuwanie |
| `F9` | menu |
| `F10` | wyjście |
| `Insert` | zaznaczenie pliku |
| `Ctrl+O` | ukrycie/pokazanie paneli |
| `Ctrl+H` | ukryte pliki |
| `Ctrl+R` | odświeżenie |
| `Ctrl+\` | directory hotlist |
| `Ctrl+Space` | rozmiar katalogu |
| `Ctrl+Enter` | nazwa pliku do linii poleceń |
| `+` | zaznacz według maski |
| `-` | odznacz według maski |

---

# 63. Terminal i problemy z klawiszami F1–F10

Niektóre terminale lub środowiska graficzne przechwytują:

```text
F1
F10
Alt
Ctrl
```

MC posiada alternatywne sekwencje.

Klasyczny mechanizm MC:

```text
Esc
```

a następnie drugi klawisz.

Przykład:

```text
Esc
1
```

odpowiada często:

```text
F1
```

```text
Esc
2
```

→ F2

itd.

---

# 64. „Meta” w dokumentacji MC

W dokumentacji można spotkać:

```text
M-x
```

`M` oznacza:

```text
Meta
```

W praktyce zwykle:

```text
Alt+x
```

albo:

```text
Esc
x
```

---

# 65. MC i sudo

Uruchomienie:

```bash
sudo mc
```

daje pełne prawa root.

To bardzo wygodne, ale potencjalnie niebezpieczne.

Przykład:

```text
F8
```

może wtedy naprawdę usunąć:

```text
/etc
/usr
/var
```

Dlatego warto normalnie pracować jako zwykły użytkownik.

Root tylko wtedy, gdy faktycznie jest potrzebny.

---

# 66. Schemat wygodnej pracy

Dobry model:

```text
zwykły użytkownik
    ↓
mc
    ↓
przeglądanie / kopiowanie / edycja własnych plików
    ↓
sudo tylko dla konkretnych poleceń
```

np.:

```bash
sudo systemctl restart nginx
```

zamiast:

```bash
sudo mc
```

przez cały czas.

---

# 67. Backup konfiguracji MC

Warto skopiować:

```bash
cp -a ~/.config/mc ~/.config/mc.backup
```

lub:

```bash
tar czf mc-config.tar.gz ~/.config/mc
```

---

# 68. Praca z bardzo dużymi katalogami

MC może zwolnić w katalogach zawierających:

- setki tysięcy plików,
- bardzo wolny filesystem sieciowy,
- katalogi FUSE,
- ogromne archiwa.

W takich sytuacjach często szybszy będzie shell:

```bash
find
```

```bash
grep
```

```bash
rsync
```

```bash
cp
```

---

# 69. MC nie zastępuje rsync

Do prostego kopiowania:

```text
F5
```

jest świetne.

Do synchronizacji tysięcy plików lepiej:

```bash
rsync
```

Przykład:

```bash
rsync -avh --delete source/ destination/
```

MC jest dobry do zarządzania plikami.

`rsync` jest lepszy do masowej synchronizacji.

---

# 70. MC nie zastępuje shella

Warto znać oba.

MC:

```text
szybka orientacja
kopiowanie
przenoszenie
edycja
podgląd
```

Shell:

```text
automatyzacja
potoki
grep
find
awk
sed
rsync
skrypty
```

Najlepszy workflow to połączenie obu.

---

# 71. Przykład 1 — edycja nginx

Uruchamiasz:

```bash
mc
```

Lewy panel:

```text
/etc/nginx/sites-available
```

Zaznaczasz:

```text
example.conf
```

F4:

```text
edycja
```

Po zmianie:

```text
F2
```

Potem:

```text
Ctrl+O
```

i:

```bash
sudo nginx -t
```

Jeżeli konfiguracja jest poprawna:

```bash
sudo systemctl reload nginx
```

Wracasz:

```text
Ctrl+O
```

---

# 72. Przykład 2 — deployment aplikacji Go

Lewy panel:

```text
/home/user/project
```

Prawy:

```text
/var/www/project
```

Budowanie:

```bash
go build
```

Powstaje:

```text
app
```

Kopiujesz:

```text
F5
```

Potem:

```bash
sudo systemctl restart project
```

---

# 73. Przykład 3 — backup konfiguracji

Lewy panel:

```text
/etc/nginx
```

Prawy:

```text
/home/user/backup/nginx
```

Zaznaczasz pliki:

```text
Insert
```

kopiujesz:

```text
F5
```

---

# 74. Przykład 4 — kopiowanie plików z VPS

Lewy panel:

```text
/home/user/project
```

Prawy panel:

```text
sftp://user@vps/
```

Następnie:

```text
F5
```

Możesz kopiować pliki lokalne na serwer i odwrotnie.

---

# 75. Przykład 5 — znalezienie dużych plików

MC może sortować według rozmiaru:

```text
F9
Left
Sort order
Size
```

Dla dokładniejszej analizy lepiej jednak użyć:

```bash
du -sh *
```

lub:

```bash
du -ah . | sort -h | tail
```

---

# 76. Przykład 6 — szukanie konfiguracji

W MC:

```text
F9
Command
Find file
```

Nazwa:

```text
*.conf
```

Treść:

```text
listen 443
```

MC pokaże pliki zawierające daną frazę.

---

# 77. Przykład 7 — praca z logami

Przejdź do:

```text
/var/log
```

Zaznacz:

```text
syslog
```

lub:

```text
messages
```

i:

```text
F3
```

Dla logów aktualizowanych na żywo lepsze będzie:

```bash
tail -f plik.log
```

lub:

```bash
journalctl -f
```

---

# 78. Przykład 8 — Git + MC

Otwierasz projekt:

```bash
mc ~/projects/example-site
```

Edytujesz:

```text
F4
```

Potem:

```text
Ctrl+O
```

```bash
git diff
git status
git add .
git commit -m "Update layout"
```

Wracasz:

```text
Ctrl+O
```

---

# 79. Przykład 9 — szybkie porównanie produkcji i developmentu

Lewy:

```text
/home/user/project
```

Prawy:

```text
/var/www/project
```

Menu:

```text
Command
Compare directories
```

MC zaznaczy różnice.

---

# 80. Przykład 10 — FreeBSD

Uruchom:

```bash
mc
```

Przejdź do:

```text
/usr/local/etc/nginx
```

Edytuj:

```text
nginx.conf
```

F4.

Potem:

```text
Ctrl+O
```

Test:

```bash
nginx -t
```

Restart:

```bash
service nginx restart
```

---

# 81. Proponowany workflow Karola

Przy pracy na Debianie i FreeBSD bardzo wygodny zestaw to:

```text
MC
+
Vim / Neovim
+
shell
+
tmux
+
Git
```

MC służy wtedy głównie do:

```text
nawigacji
kopiowania
przenoszenia
szybkiego podglądu
pracy z katalogami
```

Vim / Neovim:

```text
edycja kodu i konfiguracji
```

Shell:

```text
administracja
Git
Docker
systemd
rc.d
kompilacja
```

tmux:

```text
utrzymywanie sesji
```

---

# 82. Minimum, które warto zapamiętać

Jeżeli chcesz używać MC sprawnie, wystarczy na początek zapamiętać:

```text
Tab       zmiana panelu

F3        podgląd
F4        edycja
F5        kopiuj
F6        przenieś / zmień nazwę
F7        katalog
F8        usuń
F10       wyjdź

Insert    zaznacz

Ctrl+O    shell
Ctrl+H    ukryte pliki
Ctrl+R    odśwież

Ctrl+\    ulubione katalogi
```

I jedną zasadę:

> aktywny panel jest źródłem, a drugi panel bardzo często jest miejscem docelowym operacji.

---

# 83. Ściąga — Debian

Instalacja:

```bash
sudo apt install mc
```

Start:

```bash
mc
```

Edycja:

```bash
mcedit plik
```

Konfiguracja:

```text
~/.config/mc/
```

---

# 84. Ściąga — FreeBSD

Instalacja:

```bash
pkg install mc
```

Start:

```bash
mc
```

Konfiguracja:

```text
~/.config/mc/
```

Systemowe konfiguracje programów z pakietów często:

```text
/usr/local/etc/
```

---

# 85. Kiedy MC jest szczególnie dobry?

MC jest świetny gdy:

- pracujesz po SSH,
- administrujesz VPS-em,
- zarządzasz FreeBSD,
- potrzebujesz szybko kopiować pliki między katalogami,
- przeglądasz konfigurację,
- chcesz uniknąć ciągłego pisania długich ścieżek,
- pracujesz na systemie bez GUI,
- chcesz mieć menedżer plików i shell w jednym terminalu.

---

# 86. Kiedy lepiej użyć innych narzędzi?

Do masowego wyszukiwania:

```bash
find
fd
```

Do szukania tekstu:

```bash
grep
rg
```

Do synchronizacji:

```bash
rsync
```

Do automatyzacji:

```text
Bash
Python
Go
```

Do zaawansowanej edycji:

```text
Vim
Neovim
```

Do utrzymywania sesji:

```text
tmux
```

MC nie konkuruje z tymi narzędziami.

On je bardzo wygodnie spina.

---

# Podsumowanie

Midnight Commander jest jednym z najbardziej praktycznych programów terminalowych dla administratora i użytkownika Linuxa lub FreeBSD.

Jego największą zaletą nie jest to, że zastępuje shell.

Największą zaletą jest to, że pozwala pracować jednocześnie w dwóch światach:

```text
graficzna logika menedżera plików
+
pełna moc terminala
```

Dobrze opanowany MC pozwala bardzo szybko:

- poruszać się po serwerze,
- kopiować i przenosić pliki,
- edytować konfiguracje,
- przeglądać logi,
- pracować ze zdalnymi maszynami,
- używać shella bez opuszczania programu.

Dla Debiana i FreeBSD jest to jedno z tych narzędzi, które warto mieć praktycznie na każdej maszynie.
