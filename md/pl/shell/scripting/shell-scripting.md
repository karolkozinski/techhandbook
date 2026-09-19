# shell-scripting

Shell to nie tylko miejsce do wpisywania poleceń. Jest też językiem programowania, w którym można pisać małe narzędzia administracyjne, automatyzować powtarzalne czynności, pytać użytkownika o dane, reagować na jego wybory, sprawdzać wyniki poleceń i wyświetlać status operacji.

Ten materiał skupia się na skryptach uruchamianych w terminalu na **Debianie** i **FreeBSD**.

---

# 1. Jaki shell wybrać do skryptów?

Najważniejsze rozróżnienie:

- `sh` — podstawowy, przenośny shell zgodny mniej więcej ze standardem POSIX,
- `bash` — rozbudowany shell popularny w Linuksie,
- `zsh` — rozbudowany shell używany często interaktywnie,
- `csh` / `tcsh` — spotykany szczególnie w świecie BSD, ale obecnie raczej nie jest najlepszym wyborem do nowych skryptów.

Dla prostych skryptów administracyjnych najlepszym punktem startowym jest:

```sh
#!/bin/sh
```

Taki skrypt będzie zwykle działał zarówno na Debianie, jak i FreeBSD.

W Debianie:

```text
/bin/sh -> dash
```

Najczęściej nie jest to Bash.

Na FreeBSD `/bin/sh` jest systemowym shellem FreeBSD.

Jeżeli używasz funkcji charakterystycznych dla Basha, używaj:

```bash
#!/usr/bin/env bash
```

To pozwala znaleźć `bash` przez `PATH`.

Na Debianie Bash jest zwykle dostępny domyślnie.

Na FreeBSD może być konieczna instalacja:

```sh
pkg install bash
```

Dla większości małych narzędzi:

> zacznij od `sh`; przechodź na Bash dopiero wtedy, gdy rzeczywiście potrzebujesz funkcji Basha.

---

# 2. Pierwszy skrypt

Tworzymy plik:

```sh
vim hello
```

Zawartość:

```sh
#!/bin/sh

echo "Cześć!"
echo "To jest mój pierwszy skrypt."
```

Pierwsza linia:

```sh
#!/bin/sh
```

to **shebang**.

Informuje system, jakim interpreterem ma zostać uruchomiony plik.

Nadajemy prawa wykonywania:

```sh
chmod +x hello
```

Uruchomienie:

```sh
./hello
```

Dlaczego trzeba pisać `./`?

Ponieważ bieżący katalog zwykle nie znajduje się w zmiennej `PATH`.

---

# 3. `echo` i `printf` — wypisywanie informacji

Najprostsze:

```sh
echo "Uruchamiam program..."
```

Kilka komunikatów:

```sh
echo "Sprawdzam konfigurację..."
echo "Łączę z serwerem..."
echo "Gotowe."
```

Do prostych komunikatów `echo` jest wystarczające.

Bardziej przewidywalny jest jednak:

```sh
printf '%s\n' "Uruchamiam program..."
```

Można też formatować dane:

```sh
NAME="Karol"
printf 'Użytkownik: %s\n' "$NAME"
```

Przykład:

```sh
COUNT=5
printf 'Znaleziono %s plików.\n' "$COUNT"
```

---

# 4. Zmienne

Przypisanie:

```sh
NAME="Karol"
```

Bardzo ważne:

```sh
NAME="Karol"
```

jest poprawne.

To:

```sh
NAME = "Karol"
```

jest błędne.

W shellu **nie daje się spacji wokół `=` przy przypisaniu**.

Odczyt zmiennej:

```sh
echo "$NAME"
```

Najlepiej prawie zawsze pisać:

```sh
"$NAME"
```

zamiast:

```sh
$NAME
```

Cudzysłowy chronią przed problemami ze spacjami i znakami specjalnymi.

Przykład:

```sh
FILE="/home/user/Moje Pliki/test.txt"

cat "$FILE"
```

---

# 5. Zmienne środowiskowe

Shell posiada wiele gotowych zmiennych.

Przykłady:

```sh
echo "$HOME"
echo "$USER"
echo "$PATH"
echo "$SHELL"
```

`HOME`:

```text
/home/user
```

`PATH` zawiera katalogi, w których shell szuka programów.

Przykładowo:

```text
/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin
```

Jeśli wpiszesz:

```sh
vim
```

shell przeszukuje po kolei katalogi zapisane w `PATH`.

---

# 6. Pobieranie danych od użytkownika

Do pobierania danych służy `read`.

Przykład:

```sh
printf 'Jak masz na imię? '
read NAME

echo "Cześć, $NAME."
```

Można też zrobić:

```sh
echo "Podaj nazwę pliku:"
read FILE

echo "Wybrałeś: $FILE"
```

Bezpieczniej:

```sh
IFS= read -r FILE
```

`-r` powoduje, że backslash `\` nie jest traktowany specjalnie.

---

# 7. Pytania typu tak / nie

Przykład:

```sh
printf 'Kontynuować? [t/N] '
read ANSWER
```

Następnie sprawdzamy odpowiedź:

```sh
if [ "$ANSWER" = "t" ]; then
    echo "Kontynuuję."
else
    echo "Przerwano."
fi
```

---

# 8. Instrukcja `if`

Podstawowa składnia:

```sh
if warunek; then
    polecenia
fi
```

Przykład:

```sh
if [ "$NAME" = "Karol" ]; then
    echo "Witaj Karol."
fi
```

Pełna wersja:

```sh
if [ "$ANSWER" = "1" ]; then
    echo "Wybrałeś opcję pierwszą."
elif [ "$ANSWER" = "2" ]; then
    echo "Wybrałeś opcję drugą."
else
    echo "Nieznana opcja."
fi
```

---

# 9. Polecenie `test` i nawiasy `[ ]`

To:

```sh
[ "$NAME" = "Karol" ]
```

jest tak naprawdę formą polecenia `test`.

Można napisać:

```sh
test "$NAME" = "Karol"
```

albo:

```sh
[ "$NAME" = "Karol" ]
```

Druga forma jest znacznie częściej używana.

Uwaga na spacje:

```sh
[ "$NAME" = "Karol" ]
```

jest poprawne.

To:

```sh
["$NAME"="Karol"]
```

jest błędne.

---

# 10. Najważniejsze testy

## Czy plik istnieje?

```sh
if [ -f "$FILE" ]; then
    echo "Plik istnieje."
fi
```

## Czy katalog istnieje?

```sh
if [ -d "$DIR" ]; then
    echo "Katalog istnieje."
fi
```

## Czy coś istnieje niezależnie od typu?

```sh
if [ -e "$PATHNAME" ]; then
    echo "Istnieje."
fi
```

## Czy plik jest wykonywalny?

```sh
if [ -x "$FILE" ]; then
    echo "Plik jest wykonywalny."
fi
```

## Czy plik jest zapisywalny?

```sh
if [ -w "$FILE" ]; then
    echo "Można zapisywać."
fi
```

## Czy zmienna jest pusta?

```sh
if [ -z "$NAME" ]; then
    echo "Brak nazwy."
fi
```

## Czy zmienna nie jest pusta?

```sh
if [ -n "$NAME" ]; then
    echo "Podano nazwę."
fi
```

---

# 11. Porównywanie liczb

Dla liczb nie używa się zwykle `=`.

Przykłady:

```sh
[ "$A" -eq "$B" ]
```

równe

```sh
[ "$A" -ne "$B" ]
```

różne

```sh
[ "$A" -gt "$B" ]
```

większe

```sh
[ "$A" -lt "$B" ]
```

mniejsze

```sh
[ "$A" -ge "$B" ]
```

większe lub równe

```sh
[ "$A" -le "$B" ]
```

mniejsze lub równe

Przykład:

```sh
if [ "$COUNT" -gt 10 ]; then
    echo "Dużo wyników."
fi
```

---

# 12. `case` — idealne do menu

Jeśli użytkownik ma wybrać jedną z kilku opcji, `case` jest często wygodniejsze niż wiele `if`.

```sh
echo "1 - aktualizacja"
echo "2 - informacje o systemie"
echo "3 - wyjście"

printf 'Wybór: '
read CHOICE

case "$CHOICE" in
    1)
        echo "Uruchamiam aktualizację..."
        ;;
    2)
        echo "Pokazuję informacje..."
        ;;
    3)
        echo "Koniec."
        exit 0
        ;;
    *)
        echo "Nieznana opcja."
        ;;
esac
```

`*)` oznacza wszystko, czego nie dopasowały wcześniejsze przypadki.

---

# 13. Reagowanie na wynik polecenia

Każde polecenie zwraca **kod wyjścia**.

Standard:

```text
0       sukces
inne    błąd lub inny stan
```

Kod ostatniego polecenia:

```sh
echo "$?"
```

Przykład:

```sh
ping -c 1 1.1.1.1
echo "$?"
```

Jeśli `ping` się uda, zwykle zobaczysz:

```text
0
```

---

# 14. Najlepszy sposób sprawdzania sukcesu polecenia

Zamiast:

```sh
command
if [ "$?" -eq 0 ]; then
```

lepiej:

```sh
if command; then
    echo "Sukces."
else
    echo "Błąd."
fi
```

Przykład:

```sh
if ping -c 1 1.1.1.1 >/dev/null 2>&1; then
    echo "Internet działa."
else
    echo "Brak odpowiedzi."
fi
```

---

# 15. `&&` i `||`

`&&` oznacza:

> wykonaj następne polecenie tylko wtedy, gdy poprzednie się udało.

```sh
mkdir backup && echo "Katalog utworzony."
```

`||` oznacza:

> wykonaj następne polecenie tylko wtedy, gdy poprzednie się nie udało.

```sh
mkdir backup || echo "Nie udało się utworzyć katalogu."
```

Można połączyć:

```sh
command && echo "OK" || echo "BŁĄD"
```

Ale przy bardziej rozbudowanej logice lepiej używać `if`.

---

# 16. Przekierowanie wyjścia

Standardowe wyjście programu:

```text
stdout
```

Błędy:

```text
stderr
```

Zapis stdout do pliku:

```sh
command > output.txt
```

Dopisanie:

```sh
command >> output.txt
```

Błędy do pliku:

```sh
command 2> errors.txt
```

Wszystko do jednego pliku:

```sh
command > output.txt 2>&1
```

Ukrycie całego wyjścia:

```sh
command >/dev/null 2>&1
```

---

# 17. Statusy na ekranie

Prosty schemat:

```sh
echo "[INFO] Sprawdzam połączenie..."

if ping -c 1 1.1.1.1 >/dev/null 2>&1; then
    echo "[OK] Sieć działa."
else
    echo "[ERROR] Brak połączenia."
fi
```

Można przyjąć własną konwencję:

```text
[INFO]
[OK]
[WARN]
[ERROR]
```

Dzięki temu skrypt jest znacznie czytelniejszy.

---

# 18. Funkcje

Jeśli jakaś czynność powtarza się kilka razy, warto zrobić funkcję.

```sh
show_status() {
    echo "[INFO] $1"
}
```

Wywołanie:

```sh
show_status "Uruchamiam aktualizację"
```

`$1` oznacza pierwszy argument funkcji.

Przykład:

```sh
success() {
    echo "[OK] $1"
}

error() {
    echo "[ERROR] $1"
}
```

Użycie:

```sh
success "Operacja zakończona."
error "Nie udało się połączyć."
```

---

# 19. Argumenty przekazane do skryptu

Jeżeli uruchomisz:

```sh
myscript test plik.txt
```

wewnątrz skryptu:

```text
$0    nazwa skryptu
$1    pierwszy argument
$2    drugi argument
$3    trzeci argument
```

Przykład:

```sh
#!/bin/sh

echo "Skrypt: $0"
echo "Argument 1: $1"
echo "Argument 2: $2"
```

Liczba argumentów:

```sh
echo "$#"
```

Wszystkie argumenty:

```sh
echo "$@"
```

---

# 20. Sprawdzanie wymaganych argumentów

Przykład:

```sh
if [ "$#" -lt 1 ]; then
    echo "Użycie: $0 nazwa_pliku"
    exit 1
fi
```

Potem:

```sh
FILE="$1"
```

Pełny przykład:

```sh
#!/bin/sh

if [ "$#" -lt 1 ]; then
    echo "Użycie: $0 plik"
    exit 1
fi

FILE="$1"

if [ -f "$FILE" ]; then
    echo "Plik istnieje."
else
    echo "Pliku nie znaleziono."
    exit 1
fi
```

---

# 21. `exit` — kończenie skryptu

Poprawne zakończenie:

```sh
exit 0
```

Błąd:

```sh
exit 1
```

Można używać innych wartości, ale najczęściej wystarcza:

```text
0 = OK
1 = błąd
```

Przykład:

```sh
if [ ! -f "$CONFIG" ]; then
    echo "Brak pliku konfiguracji."
    exit 1
fi
```

---

# 22. Negacja `!`

Warunek:

```sh
[ -f "$FILE" ]
```

oznacza:

> plik istnieje.

Natomiast:

```sh
[ ! -f "$FILE" ]
```

oznacza:

> plik nie istnieje.

Przykład:

```sh
if [ ! -d "$HOME/backup" ]; then
    mkdir "$HOME/backup"
fi
```

---

# 23. Pętle `for`

Przykład:

```sh
for FILE in *.txt; do
    echo "Plik: $FILE"
done
```

Lista wartości:

```sh
for ITEM in one two three; do
    echo "$ITEM"
done
```

Argumenty skryptu:

```sh
for ARG in "$@"; do
    echo "Argument: $ARG"
done
```

---

# 24. Pętla `while`

Przykład:

```sh
COUNT=1

while [ "$COUNT" -le 5 ]; do
    echo "$COUNT"
    COUNT=$((COUNT + 1))
done
```

---

# 25. Pętla menu

Bardzo przydatny wzorzec:

```sh
#!/bin/sh

while true; do
    echo
    echo "1 - pokaż uptime"
    echo "2 - pokaż dyski"
    echo "3 - pokaż pamięć"
    echo "q - wyjście"

    printf 'Wybór: '
    read CHOICE

    case "$CHOICE" in
        1)
            uptime
            ;;
        2)
            df -h
            ;;
        3)
            free -h
            ;;
        q|Q)
            exit 0
            ;;
        *)
            echo "Nieznana opcja."
            ;;
    esac
done
```

Uwaga:

```sh
free -h
```

jest typowe dla Linuksa.

Na FreeBSD pamięć można sprawdzać np.:

```sh
sysctl hw.physmem
```

lub:

```sh
top
```

Dlatego w skryptach działających na obu systemach czasem trzeba rozpoznać system.

---

# 26. Rozpoznawanie systemu

Polecenie:

```sh
uname -s
```

Na Debianie zwróci:

```text
Linux
```

Na FreeBSD:

```text
FreeBSD
```

Przykład:

```sh
OS="$(uname -s)"

case "$OS" in
    Linux)
        echo "To jest Linux."
        ;;
    FreeBSD)
        echo "To jest FreeBSD."
        ;;
    *)
        echo "Nieznany system: $OS"
        ;;
esac
```

---

# 27. Skrypt Debian + FreeBSD

Przykład aktualizacji pakietów:

```sh
#!/bin/sh

OS="$(uname -s)"

case "$OS" in
    Linux)
        echo "[INFO] Aktualizacja Debiana..."
        sudo apt update
        sudo apt upgrade
        ;;
    FreeBSD)
        echo "[INFO] Aktualizacja pakietów FreeBSD..."
        sudo pkg update
        sudo pkg upgrade
        ;;
    *)
        echo "[ERROR] Nieobsługiwany system: $OS"
        exit 1
        ;;
esac
```

To prosty przykład pokazujący, jak jeden skrypt może wykonać inne polecenia zależnie od systemu.

---

# 28. Podstawianie wyniku polecenia do zmiennej

Składnia:

```sh
VARIABLE="$(command)"
```

Przykład:

```sh
HOSTNAME="$(hostname)"
```

Potem:

```sh
echo "Host: $HOSTNAME"
```

Inny przykład:

```sh
KERNEL="$(uname -r)"

echo "Kernel: $KERNEL"
```

---

# 29. Operacje matematyczne

POSIX shell:

```sh
A=5
B=3

RESULT=$((A + B))

echo "$RESULT"
```

Inne przykłady:

```sh
COUNT=$((COUNT + 1))
```

```sh
RESULT=$((A * B))
```

```sh
RESULT=$((A / B))
```

---

# 30. Domyślna wartość zmiennej

Przydatny zapis:

```sh
NAME="${1:-world}"
```

Jeżeli podano pierwszy argument:

```sh
script Karol
```

`NAME` będzie:

```text
Karol
```

Jeżeli nie:

```sh
script
```

`NAME` będzie:

```text
world
```

---

# 31. Sprawdzanie, czy program istnieje

Bardzo przydatny wzorzec:

```sh
if command -v curl >/dev/null 2>&1; then
    echo "curl jest zainstalowany."
else
    echo "Brak curl."
fi
```

`command -v` jest bardziej przenośne niż `which`.

Można zrobić:

```sh
require_command() {
    if ! command -v "$1" >/dev/null 2>&1; then
        echo "[ERROR] Brak programu: $1"
        exit 1
    fi
}
```

Użycie:

```sh
require_command curl
require_command git
```

---

# 32. Bezpieczniejsze skrypty

W Bashu często spotkasz:

```bash
set -euo pipefail
```

Znaczenie:

```text
-e       zakończ skrypt po błędzie polecenia
-u       błąd przy użyciu niezdefiniowanej zmiennej
-o pipefail
         pipeline uznawany jest za błędny, jeśli którykolwiek element zawiedzie
```

`pipefail` nie jest przenośnym elementem POSIX `sh`.

Jeżeli piszesz:

```bash
#!/usr/bin/env bash
```

możesz użyć:

```bash
set -euo pipefail
```

Jeżeli piszesz przenośny:

```sh
#!/bin/sh
```

często stosuje się:

```sh
set -eu
```

ale trzeba rozumieć ich działanie, ponieważ mogą zakończyć skrypt w miejscu, którego początkowo się nie spodziewasz.

---

# 33. Komentarze

Komentarz zaczyna się od `#`.

```sh
# Sprawdzamy połączenie z internetem

ping -c 1 1.1.1.1
```

Wyjątkiem jest pierwsza linia:

```sh
#!/bin/sh
```

która jest interpretowana przez system jako shebang.

---

# 34. Czytelna struktura skryptu

Dobry skrypt często wygląda mniej więcej tak:

```sh
#!/bin/sh

# Konfiguracja

CONFIG="$HOME/.config/mytool.conf"

# Funkcje

info() {
    echo "[INFO] $1"
}

error() {
    echo "[ERROR] $1" >&2
}

# Walidacja

if [ ! -f "$CONFIG" ]; then
    error "Brak konfiguracji."
    exit 1
fi

# Główna część programu

info "Uruchamiam."

# ...

info "Gotowe."

exit 0
```

---

# 35. `stderr` — komunikaty błędów

Normalny komunikat:

```sh
echo "Gotowe."
```

Komunikat błędu warto wysłać do `stderr`:

```sh
echo "Błąd!" >&2
```

Dzięki temu użytkownik może osobno przekierować normalne wyniki i błędy.

Przykład:

```sh
mytool >output.txt 2>errors.txt
```

---

# 36. Jak uruchamiać skrypt bez `./`

Załóżmy, że masz:

```text
/home/user/scripts/workvpn
```

i próbujesz:

```sh
workvpn
```

Shell znajdzie program tylko wtedy, gdy jego katalog znajduje się w `PATH`.

Sprawdź:

```sh
echo "$PATH"
```

---

# 37. Najlepsze miejsce na własne skrypty użytkownika

Dobrym rozwiązaniem jest:

```text
~/.local/bin
```

Utwórz katalog:

```sh
mkdir -p "$HOME/.local/bin"
```

Przenieś skrypt:

```sh
mv myscript "$HOME/.local/bin/"
```

Nadaj prawa:

```sh
chmod +x "$HOME/.local/bin/myscript"
```

Teraz trzeba upewnić się, że katalog jest w `PATH`.

---

# 38. Dodanie `~/.local/bin` do `PATH`

Dla `sh` lub Bash:

```sh
PATH="$HOME/.local/bin:$PATH"
export PATH
```

Można też krócej:

```sh
export PATH="$HOME/.local/bin:$PATH"
```

Aby działało po ponownym logowaniu, wpis trzeba umieścić w pliku startowym shella.

---

# 39. Gdzie ustawić `PATH`

To zależy od shella.

## Bash

Najczęściej:

```text
~/.bashrc
```

lub przy logowaniu:

```text
~/.profile
```

Bezpieczna konfiguracja w `~/.profile`:

```sh
if [ -d "$HOME/.local/bin" ]; then
    PATH="$HOME/.local/bin:$PATH"
fi

export PATH
```

## POSIX `sh`

Najczęściej:

```text
~/.profile
```

## Zsh

Najczęściej:

```text
~/.zshrc
```

## tcsh / csh

Składnia jest inna.

Przykładowo w `tcsh`:

```csh
setenv PATH "$HOME/.local/bin:$PATH"
```

Typowy plik:

```text
~/.tcshrc
```

---

# 40. Wczytanie zmian bez wylogowania

Jeżeli zmieniłeś:

```text
~/.profile
```

możesz wykonać:

```sh
. "$HOME/.profile"
```

Kropka oznacza polecenie `source`.

W Bashu można też:

```bash
source ~/.bashrc
```

POSIX-owa wersja:

```sh
. ~/.profile
```

---

# 41. Sprawdzenie, skąd uruchamia się skrypt

Użyj:

```sh
command -v myscript
```

Przykład:

```text
/home/user/.local/bin/myscript
```

Możesz też:

```sh
type myscript
```

Wynik pokaże, czy jest to:

- alias,
- funkcja,
- builtin,
- plik wykonywalny.

---

# 42. Skrypty dostępne dla wszystkich użytkowników

Jeżeli skrypt ma być dostępny systemowo:

```text
/usr/local/bin
```

To zazwyczaj właściwe miejsce na ręcznie instalowane narzędzia administratora.

Przykład:

```sh
sudo cp myscript /usr/local/bin/myscript
sudo chmod 755 /usr/local/bin/myscript
```

Potem:

```sh
myscript
```

powinno działać z każdego katalogu.

`/usr/local/bin` jest dobrym wyborem zarówno na Debianie, jak i FreeBSD.

Nie wrzucaj własnych skryptów bez potrzeby do:

```text
/bin
/usr/bin
```

Są to katalogi należące do systemu i menedżera pakietów.

---

# 43. Nazwa pliku skryptu

Skrypt nie musi kończyć się:

```text
.sh
```

Dla narzędzi CLI często lepiej użyć po prostu:

```text
workvpn
backup
servercheck
web-monitor
```

zamiast:

```text
workvpn.sh
backup.sh
servercheck.sh
```

Jeżeli plik ma poprawny shebang i prawa wykonywania, rozszerzenie nie jest potrzebne.

---

# 44. Aliasy a skrypty

Alias:

```sh
alias ll='ls -la'
```

jest dobry dla prostego skrótu.

Skrypt jest lepszy, gdy potrzebujesz:

- warunków,
- zmiennych,
- pytań,
- funkcji,
- wielu poleceń,
- obsługi błędów.

Zamiast tworzyć ogromny alias, lepiej napisać program w shellu.

---

# 45. Prosty przykład praktyczny — sprawdzanie serwera

```sh
#!/bin/sh

HOST="${1:-1.1.1.1}"

echo "[INFO] Sprawdzam host: $HOST"

if ping -c 1 "$HOST" >/dev/null 2>&1; then
    echo "[OK] Host odpowiada."
    exit 0
else
    echo "[ERROR] Host nie odpowiada." >&2
    exit 1
fi
```

Użycie:

```sh
checkhost
```

albo:

```sh
checkhost 192.168.1.1
```

---

# 46. Przykład praktyczny — menu administracyjne

```sh
#!/bin/sh

while true; do
    echo
    echo "=== MENU ==="
    echo "1. Uptime"
    echo "2. Miejsce na dyskach"
    echo "3. Adresy IP"
    echo "4. Kernel"
    echo "q. Wyjście"

    printf 'Wybór: '
    read CHOICE

    case "$CHOICE" in
        1)
            uptime
            ;;
        2)
            df -h
            ;;
        3)
            if command -v ip >/dev/null 2>&1; then
                ip addr
            else
                ifconfig
            fi
            ;;
        4)
            uname -a
            ;;
        q|Q)
            echo "Koniec."
            exit 0
            ;;
        *)
            echo "Nieznana opcja."
            ;;
    esac
done
```

Ten przykład działa sensownie zarówno w Linuksie, jak i BSD dzięki sprawdzeniu obecności polecenia `ip`.

---

# 47. Przykład praktyczny — pytanie przed wykonaniem operacji

```sh
#!/bin/sh

printf 'Usunąć pliki tymczasowe? [t/N] '
read ANSWER

case "$ANSWER" in
    t|T|tak|TAK|Tak)
        echo "[INFO] Usuwam..."
        rm -rf "$HOME/tmp/test"
        echo "[OK] Gotowe."
        ;;
    *)
        echo "Anulowano."
        ;;
esac
```

---

# 48. Przykład praktyczny — skrypt aktualizujący system

```sh
#!/bin/sh

OS="$(uname -s)"

echo "[INFO] Wykryty system: $OS"

case "$OS" in
    Linux)
        echo "[INFO] Aktualizuję listę pakietów..."
        sudo apt update || exit 1

        printf 'Uruchomić apt upgrade? [t/N] '
        read ANSWER

        case "$ANSWER" in
            t|T|tak|TAK|Tak)
                sudo apt upgrade
                ;;
            *)
                echo "Pominięto upgrade."
                ;;
        esac
        ;;

    FreeBSD)
        echo "[INFO] Aktualizuję repozytoria pkg..."
        sudo pkg update || exit 1

        printf 'Uruchomić pkg upgrade? [t/N] '
        read ANSWER

        case "$ANSWER" in
            t|T|tak|TAK|Tak)
                sudo pkg upgrade
                ;;
            *)
                echo "Pominięto upgrade."
                ;;
        esac
        ;;

    *)
        echo "[ERROR] Nieobsługiwany system: $OS" >&2
        exit 1
        ;;
esac
```

---

# 49. Przykład praktyczny — wykonywanie serii poleceń ze statusami

```sh
#!/bin/sh

step() {
    echo
    echo "[INFO] $1"
}

success() {
    echo "[OK] $1"
}

error() {
    echo "[ERROR] $1" >&2
}

step "Sprawdzam DNS"

if ping -c 1 1.1.1.1 >/dev/null 2>&1; then
    success "Połączenie działa."
else
    error "Brak połączenia."
fi

step "Sprawdzam miejsce na dysku"

df -h

step "Sprawdzam kernel"

uname -a

success "Diagnostyka zakończona."
```

---

# 50. Przykład praktyczny — narzędzie przyjmujące polecenia

```sh
#!/bin/sh

COMMAND="${1:-}"

case "$COMMAND" in
    status)
        uptime
        df -h
        ;;
    network)
        if command -v ip >/dev/null 2>&1; then
            ip addr
        else
            ifconfig
        fi
        ;;
    kernel)
        uname -a
        ;;
    "")
        echo "Użycie:"
        echo "  syscheck status"
        echo "  syscheck network"
        echo "  syscheck kernel"
        ;;
    *)
        echo "Nieznane polecenie: $COMMAND" >&2
        exit 1
        ;;
esac
```

Użycie:

```sh
syscheck status
```

```sh
syscheck network
```

```sh
syscheck kernel
```

To jest już początek normalnego programu CLI.

---

# 51. Bardziej rozbudowany przykład

```sh
#!/bin/sh

info() {
    echo "[INFO] $1"
}

success() {
    echo "[OK] $1"
}

error() {
    echo "[ERROR] $1" >&2
}

check_network() {
    info "Sprawdzam sieć..."

    if ping -c 1 1.1.1.1 >/dev/null 2>&1; then
        success "Sieć działa."
        return 0
    else
        error "Brak odpowiedzi."
        return 1
    fi
}

show_system() {
    echo
    echo "System:"
    uname -a

    echo
    echo "Uptime:"
    uptime

    echo
    echo "Dyski:"
    df -h
}

main_menu() {
    while true; do
        echo
        echo "1. Sprawdź sieć"
        echo "2. Informacje o systemie"
        echo "q. Wyjście"

        printf '> '
        read CHOICE

        case "$CHOICE" in
            1)
                check_network
                ;;
            2)
                show_system
                ;;
            q|Q)
                exit 0
                ;;
            *)
                error "Nieznana opcja."
                ;;
        esac
    done
}

main_menu
```

Tutaj program jest już podzielony na funkcje.

To bardzo dobry sposób organizacji większych skryptów.

---

# 52. `return` kontra `exit`

`exit` kończy cały skrypt.

```sh
exit 1
```

`return` kończy funkcję.

```sh
my_function() {
    if coś; then
        return 1
    fi

    return 0
}
```

Przykład:

```sh
check_network() {
    ping -c 1 1.1.1.1 >/dev/null 2>&1
}
```

Możemy potem:

```sh
if check_network; then
    echo "Sieć działa."
fi
```

Funkcja zwraca status ostatniego polecenia.

---

# 53. Pipeline

Operator:

```sh
|
```

przekazuje wyjście jednego programu na wejście drugiego.

Przykład:

```sh
ps aux | grep nginx
```

Albo:

```sh
dmesg | grep -i error
```

Albo:

```sh
ls -la | less
```

Pipeline jest jedną z najważniejszych idei Uniksa:

> programy powinny robić małe rzeczy i dawać się łatwo łączyć.

---

# 54. Wyszukiwanie tekstu

Przykład:

```sh
grep "error" logfile.txt
```

Bez rozróżniania wielkości liter:

```sh
grep -i "error" logfile.txt
```

Rekurencyjnie:

```sh
grep -R "TODO" .
```

W skrypcie:

```sh
if grep -q "enabled=true" config.txt; then
    echo "Funkcja jest włączona."
fi
```

Opcja:

```text
-q
```

oznacza quiet — bez wypisywania wyniku.

---

# 55. Obsługa Ctrl+C i `trap`

Można reagować na sygnały.

Przykład:

```sh
cleanup() {
    echo
    echo "Sprzątam..."
    rm -f /tmp/mytool.lock
}

trap cleanup EXIT
```

Funkcja wykona się przy zakończeniu skryptu.

Można też:

```sh
trap 'echo "Przerwano."; exit 1' INT
```

`INT` odpowiada m.in. Ctrl+C.

Bardziej praktyczny przykład:

```sh
TMPFILE="$(mktemp)"

cleanup() {
    rm -f "$TMPFILE"
}

trap cleanup EXIT
```

Dzięki temu plik tymczasowy zostanie usunięty nawet po błędzie.

---

# 56. Pliki tymczasowe

Nie twórz przewidywalnych nazw typu:

```text
/tmp/test.txt
```

gdy skrypt może być uruchamiany równolegle.

Lepiej:

```sh
TMPFILE="$(mktemp)"
```

Potem:

```sh
echo "dane" > "$TMPFILE"
```

Na końcu:

```sh
rm -f "$TMPFILE"
```

Najlepiej razem z `trap`.

---

# 57. Debugowanie skryptu

Uruchom:

```sh
sh -x script
```

Shell będzie pokazywał wykonywane polecenia.

Dla Basha:

```sh
bash -x script
```

Można też chwilowo dodać:

```sh
set -x
```

a potem wyłączyć:

```sh
set +x
```

Przykład:

```sh
set -x
command1
command2
set +x
```

---

# 58. Sprawdzanie składni

Dla `sh`:

```sh
sh -n script
```

Dla Basha:

```sh
bash -n script
```

Opcja `-n` sprawdza składnię bez wykonywania skryptu.

---

# 59. ShellCheck

Bardzo przydatne narzędzie do sprawdzania skryptów.

Debian:

```sh
sudo apt install shellcheck
```

FreeBSD:

```sh
sudo pkg install hs-ShellCheck
```

Sprawdzenie:

```sh
shellcheck script
```

ShellCheck wykrywa m.in.:

- brakujące cudzysłowy,
- niebezpieczne konstrukcje,
- błędy składni,
- błędne użycie zmiennych,
- problemy z przenośnością.

Dla nauki shell scriptingu jest niezwykle przydatny.

---

# 60. `shellcheck` + Vim

Dobry prosty workflow:

```sh
vim myscript
```

potem:

```sh
sh -n myscript
```

następnie:

```sh
shellcheck myscript
```

i dopiero:

```sh
./myscript
```

---

# 61. Uprawnienia

Sprawdzenie:

```sh
ls -l myscript
```

Możesz zobaczyć:

```text
-rwxr-xr-x
```

Litera `x` oznacza prawo wykonywania.

Dodanie:

```sh
chmod +x myscript
```

Typowe prawa dla systemowego narzędzia:

```sh
chmod 755 myscript
```

czyli:

```text
właściciel: rwx
grupa:     r-x
inni:      r-x
```

---

# 62. Skrypt wymagający roota

Można sprawdzić UID:

```sh
id -u
```

Root ma UID:

```text
0
```

Przykład:

```sh
if [ "$(id -u)" -ne 0 ]; then
    echo "Ten skrypt musi być uruchomiony jako root." >&2
    exit 1
fi
```

Uruchomienie:

```sh
sudo myscript
```

Nie każdy skrypt administracyjny powinien być uruchamiany cały jako root.

Często bezpieczniej uruchamiać tylko konkretne polecenia przez:

```sh
sudo command
```

---

# 63. Konfiguracja skryptu

Zamiast wpisywać wszystko na stałe:

```sh
SERVER="192.168.1.10"
PORT="8080"
```

możesz użyć pliku konfiguracji.

Przykład:

```text
~/.config/mytool/config
```

Zawartość:

```sh
SERVER="192.168.1.10"
PORT="8080"
```

Wczytanie:

```sh
. "$HOME/.config/mytool/config"
```

Uwaga:

> plik wczytany przez `.` jest wykonywany jak kod shellowy.

Dlatego nie wolno wczytywać w ten sposób niezaufanych plików.

---

# 64. Katalog konfiguracji użytkownika

Dobry układ:

```text
~/.config/mytool/
```

np.:

```text
~/.config/mytool/config
```

Program:

```text
~/.local/bin/mytool
```

Dane:

```text
~/.local/share/mytool/
```

Logi można trzymać np.:

```text
~/.local/state/mytool/
```

To dobrze współgra z konwencjami XDG stosowanymi w nowoczesnych systemach uniksowych.

---

# 65. Kolory — opcjonalnie

Można użyć kodów ANSI.

Przykład:

```sh
printf '\033[32m[OK]\033[0m Gotowe\n'
```

Czerwony:

```sh
printf '\033[31m[ERROR]\033[0m Błąd\n'
```

Żółty:

```sh
printf '\033[33m[WARN]\033[0m Ostrzeżenie\n'
```

Warto jednak traktować kolory jako dodatek. Skrypt powinien być czytelny także bez nich.

---

# 66. Podstawowy szablon własnego narzędzia

Dobry start dla prostego programu:

```sh
#!/bin/sh

info() {
    echo "[INFO] $1"
}

success() {
    echo "[OK] $1"
}

error() {
    echo "[ERROR] $1" >&2
}

main() {
    info "Uruchamiam."

    printf 'Podaj nazwę hosta: '
    IFS= read -r HOST

    if [ -z "$HOST" ]; then
        error "Nie podano hosta."
        exit 1
    fi

    info "Sprawdzam $HOST..."

    if ping -c 1 "$HOST" >/dev/null 2>&1; then
        success "$HOST odpowiada."
    else
        error "$HOST nie odpowiada."
        exit 1
    fi
}

main "$@"
```

To dobry fundament do dalszego rozbudowywania.

---

# 67. Przykład instalacji własnego skryptu

Masz plik:

```text
servercheck
```

Nadajesz prawa:

```sh
chmod +x servercheck
```

Tworzysz lokalny katalog programów:

```sh
mkdir -p "$HOME/.local/bin"
```

Przenosisz:

```sh
mv servercheck "$HOME/.local/bin/"
```

Dodajesz do `~/.profile`:

```sh
if [ -d "$HOME/.local/bin" ]; then
    PATH="$HOME/.local/bin:$PATH"
fi

export PATH
```

Wczytujesz:

```sh
. "$HOME/.profile"
```

Sprawdzasz:

```sh
command -v servercheck
```

Powinno zwrócić coś w rodzaju:

```text
/home/user/.local/bin/servercheck
```

Od tej chwili możesz być w dowolnym katalogu:

```sh
cd /
```

i nadal uruchomić:

```sh
servercheck
```

---

# 68. Gdy skrypt ma być naprawdę „zainstalowany”

Dla prywatnego narzędzia użytkownika:

```text
~/.local/bin
```

Dla narzędzia dostępnego globalnie:

```text
/usr/local/bin
```

Przykład:

```sh
sudo install -m 755 servercheck /usr/local/bin/servercheck
```

Polecenie `install` jest wygodne, bo jednocześnie kopiuje plik i ustawia uprawnienia.

Sprawdzenie:

```sh
command -v servercheck
```

---

# 69. Czego nauczyć się w następnej kolejności

Jeżeli opanujesz materiał z tego dokumentu, kolejne przydatne tematy to:

1. `sed`
2. `awk`
3. bardziej zaawansowane `grep`
4. wyrażenia regularne
5. `find`
6. `xargs`
7. `getopts`
8. logowanie
9. lockfile
10. sygnały i `trap`
11. cron
12. systemd timers na Debianie
13. rc.d na FreeBSD

---

# 70. `getopts` — pierwszy krok do porządnego CLI

Z czasem zamiast:

```sh
myscript host port
```

możesz chcieć:

```sh
myscript -h server.example.com -p 8080
```

Do tego w POSIX shellu służy:

```sh
getopts
```

Przykład:

```sh
#!/bin/sh

while getopts "h:p:" OPT; do
    case "$OPT" in
        h)
            HOST="$OPTARG"
            ;;
        p)
            PORT="$OPTARG"
            ;;
        *)
            exit 1
            ;;
    esac
done

echo "Host: $HOST"
echo "Port: $PORT"
```

Nie trzeba znać `getopts` na początku, ale jest to naturalny następny krok, gdy skrypt zaczyna przypominać prawdziwe narzędzie CLI.

---

# 71. Najważniejsze zasady, które warto zapamiętać

## Cytuj zmienne

Zamiast:

```sh
rm $FILE
```

pisz:

```sh
rm "$FILE"
```

## Sprawdzaj błędy

Zamiast:

```sh
command
echo "Gotowe"
```

lepiej:

```sh
if command; then
    echo "[OK] Gotowe"
else
    echo "[ERROR] Operacja nieudana" >&2
    exit 1
fi
```

## Używaj funkcji

Zamiast jednego skryptu mającego 300 linii bez struktury, podziel go na:

```text
check_config
check_network
do_backup
show_status
main
```

## Trzymaj własne programy w odpowiednim miejscu

Prywatne:

```text
~/.local/bin
```

Systemowe:

```text
/usr/local/bin
```

## Używaj `command -v`

Zamiast:

```sh
which curl
```

preferuj:

```sh
command -v curl
```

## Sprawdzaj skrypt

```sh
sh -n script
```

i:

```sh
shellcheck script
```

---

# 72. Minimalny zestaw wiedzy potrzebny do pisania użytecznych skryptów

Jeżeli potrafisz używać:

```text
#!/bin/sh

echo
printf
read

VARIABLE=value
"$VARIABLE"

if
elif
else

[ ... ]

case

for
while

$1
$2
$@
$#

exit

$?

&&
||

>

>>

2>

|

$(command)

functions

command -v
```

to potrafisz już stworzyć bardzo dużą część praktycznych skryptów administracyjnych.

Reszta to przede wszystkim poznawanie kolejnych poleceń systemowych i łączenie ich w sensowną logikę.

---

# 73. Jak myśleć o skrypcie shellowym

Najprostszy model:

```text
INPUT
  ↓
sprawdzenie danych
  ↓
decyzja
  ↓
wykonanie poleceń
  ↓
sprawdzenie wyniku
  ↓
STATUS / OUTPUT
```

Przykład:

```text
użytkownik podaje host
        ↓
czy host jest pusty?
        ↓
       nie
        ↓
uruchamiamy ping
        ↓
czy ping zwrócił 0?
       ↙   ↘
     tak   nie
      ↓     ↓
    [OK]  [ERROR]
```

Właśnie na tym polega większość prostych programów shellowych.

---

# 74. Mały projekt do samodzielnego zrobienia

Dobrym pierwszym własnym programem byłby:

```text
sysinfo
```

Uruchamiany:

```sh
sysinfo
```

Menu:

```text
1. System
2. Sieć
3. Dyski
4. Procesy
5. Aktualizacje
q. Wyjście
```

Skrypt może sam rozpoznawać:

```text
Linux
FreeBSD
```

i używać właściwych poleceń dla danego systemu.

To mały projekt, ale wykorzystuje praktycznie wszystko:

- zmienne,
- `case`,
- funkcje,
- `read`,
- sprawdzanie systemu,
- polecenia zewnętrzne,
- kody błędów,
- menu,
- `PATH`.

Po napisaniu takiego narzędzia podstawy shell scriptingu przestają być teorią.

---

# Ściąga

## Początek skryptu

```sh
#!/bin/sh
```

## Komunikat

```sh
echo "Tekst"
```

## Zmienna

```sh
NAME="Karol"
echo "$NAME"
```

## Input

```sh
read NAME
```

## Warunek

```sh
if [ "$A" = "$B" ]; then
    echo "Tak"
fi
```

## Menu

```sh
case "$CHOICE" in
    1)
        command
        ;;
    *)
        echo "Błąd"
        ;;
esac
```

## Funkcja

```sh
hello() {
    echo "Hello"
}
```

## Wynik polecenia

```sh
if command; then
    echo "OK"
else
    echo "Błąd"
fi
```

## Argument

```sh
FILE="$1"
```

## Wynik polecenia do zmiennej

```sh
HOST="$(hostname)"
```

## Sprawdzenie programu

```sh
command -v git
```

## Udostępnienie z każdego katalogu

```sh
mkdir -p ~/.local/bin
mv script ~/.local/bin/
chmod +x ~/.local/bin/script
```

oraz w `~/.profile`:

```sh
export PATH="$HOME/.local/bin:$PATH"
```

## Sprawdzenie

```sh
command -v script
```

---

# Podsumowanie

Do tworzenia praktycznych programów shellowych nie trzeba poznawać ogromnego języka.

Najważniejsze jest opanowanie kilku elementów:

```text
polecenia
zmienne
input
warunki
case
pętle
funkcje
argumenty
kody wyjścia
przekierowania
pipeline
PATH
```

Shell jest szczególnie dobry wtedy, gdy program przede wszystkim:

- uruchamia inne programy,
- zarządza plikami,
- konfiguruje system,
- sprawdza usługi,
- przetwarza tekst,
- automatyzuje administrację.

Jeżeli logika programu zaczyna dominować nad wykonywaniem poleceń systemowych, kod robi się bardzo duży albo potrzebujesz skomplikowanych struktur danych, wtedy zwykle lepiej przejść do Pythona, Go lub innego pełnego języka programowania.

Do małych narzędzi systemowych shell pozostaje jednak jednym z najszybszych i najbardziej naturalnych rozwiązań.
