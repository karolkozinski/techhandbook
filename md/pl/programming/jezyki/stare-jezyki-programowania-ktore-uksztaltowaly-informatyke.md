---
id: "doc-059"
title: "Stare języki programowania, które ukształtowały informatykę"
slug: "stare-jezyki-programowania-ktore-uksztaltowaly-informatyke"
description: "Historia i praktyczny przewodnik po językach, bez których współczesne programowanie wyglądałoby inaczej: FORTRAN, COBOL, ALGOL, BASIC, Pascal, Ada, Lisp, Smalltalk, Prolog, Forth, PL/I, Logo i assembler."
lang: "pl"
audience: "standard"
published: "2026-09-25"
updated: "2026-09-25"
tags:
  - "programming"
  - "history"
  - "fortran"
  - "cobol"
  - "algol"
  - "basic"
  - "pascal"
  - "lisp"
  - "smalltalk"
  - "prolog"
  - "forth"
  - "pli"
  - "logo"
  - "ada"
---

# Stare języki programowania, które ukształtowały informatykę

Kiedy patrzymy na współczesne języki, łatwo odnieść wrażenie, że programowanie zaczęło się od C, Javy, Pythona i JavaScriptu.

Nie zaczęło się.

Zanim powstał Unix, zanim ktokolwiek napisał przeglądarkę WWW, zanim komputer osobisty pojawił się na biurku, programiści już rozwiązywali problemy, które znamy do dziś:

- jak opisać algorytm w sposób niezależny od procesora,
- jak zarządzać pamięcią,
- jak tworzyć procedury i funkcje,
- jak rozdzielać kod na bloki,
- jak reprezentować dane,
- jak rozmawiać z bazą danych,
- jak uczyć komputer logiki,
- jak zrobić język zrozumiały dla ludzi spoza świata elektroniki.

Wiele pomysłów, które dziś uznajemy za oczywiste, pojawiło się właśnie wtedy.

Ten artykuł nie jest listą „martwych języków”. Niektóre są przede wszystkim historyczne, inne nadal pracują w bankach, laboratoriach, systemach naukowych, lotnictwie, kolei i wielkich przedsiębiorstwach.

Co więcej, większość z nich nadal można uruchomić na współczesnym komputerze.

Spróbujemy więc dwóch rzeczy jednocześnie:

1. zobaczyć, **co każdy z tych języków wniósł do informatyki**,
2. sprawdzić, **jak uruchomić go dzisiaj**.

A FORTRAN i COBOL zmusimy nawet do zagrania w naszą standardową grę:

> zgadnij liczbę od 0 do 100.

---

# Najpierw: jak wyglądało programowanie przed IDE

Dzisiejszy programista otwiera VS Code, IntelliJ albo terminal, wpisuje kod, naciska `Run` i po sekundzie widzi wynik.

Przez większość historii informatyki wyglądało to zupełnie inaczej.

## Karty perforowane

Program mógł istnieć jako stos fizycznych kart. Każda karta przechowywała fragment informacji poprzez układ dziurek.

Typowy proces wyglądał mniej więcej tak:

```text
napisz program
    |
    v
przenieś program na karty
    |
    v
oddaj talię operatorowi komputera
    |
    v
czekaj na swoją kolej
    |
    v
komputer przetwarza program
    |
    v
odbierz wydruk
```

Jeżeli w programie był błąd składni, nie zawsze poprawiałeś go po pięciu sekundach. Czasem poprawiałeś kartę i ponownie czekałeś na wykonanie zadania.

To tłumaczy, dlaczego wczesne języki tak mocno skupiały się na:

- jednoznacznej składni,
- oszczędności pamięci,
- przewidywalnym układzie danych,
- kompilacji całych programów.

## Mainframe

Mainframe nie był po prostu „dużym PC”. To był centralny komputer obsługujący zadania wielu użytkowników i całej organizacji.

Programista nie musiał siedzieć obok maszyny. Kod trafiał do kolejki zadań:

```text
JOB 1
JOB 2
JOB 3
JOB 4
```

System wykonywał je kolejno lub według reguł planisty. Z tego świata wyrósł między innymi COBOL.

## Terminal

Później pojawiło się coś znacznie bliższego dzisiejszej pracy interaktywnej.

Terminal był urządzeniem pozwalającym komunikować się z centralnym komputerem. Mógł wyglądać jak:

```text
klawiatura + ekran
```

ale sam nie wykonywał programu. Program działał na komputerze centralnym.

To właśnie systemy time-sharing pozwoliły wielu osobom jednocześnie korzystać z jednego komputera i znacznie przyspieszyły eksperymentowanie z kodem.

## Mikrokomputer

Lata 70. i 80. zmieniły wszystko.

Komputer trafił:

```text
z centrum obliczeniowego
        ↓
do firmy
        ↓
na biurko
        ↓
do domu
```

W tej epoce eksplodowała popularność BASIC-a, Pascala, assemblera i języków związanych z konkretnymi platformami.

Programista mógł na wielką skalę:

```text
napisać
uruchomić
zobaczyć błąd
poprawić
uruchomić ponownie
```

bez operatora centrum obliczeniowego.

---

# Krótka oś czasu

| Rok | Język / wydarzenie | Dlaczego ważne |
|---:|---|---|
| lata 40./50. | Assembly | symboliczny zapis instrukcji procesora |
| 1957 | FORTRAN | praktyczne programowanie wysokiego poziomu dla nauki |
| 1958 | Lisp | programowanie symboliczne i funkcyjne |
| 1959 | COBOL | język biznesu i przetwarzania danych |
| 1960 | ALGOL 60 | struktura blokowa i ogromny wpływ na składnię języków |
| 1964 | BASIC | programowanie dostępne dla studentów i później mikrokomputerów |
| połowa lat 60. | PL/I | próba połączenia świata nauki i biznesu |
| 1967 | Logo | programowanie jako narzędzie edukacji |
| koniec lat 60./70. | Forth | stos, minimalizm, systemy wbudowane |
| 1968 | ALGOL 68 | ambitny system typów i język ogólnego przeznaczenia |
| 1970 | Pascal | nauka programowania strukturalnego |
| lata 70. | Smalltalk | obiekty, GUI, środowisko programistyczne |
| 1972 | Prolog | programowanie logiczne |
| 1983 | Ada | bezpieczeństwo i duże systemy o wysokiej niezawodności |

Daty nie oznaczają oczywiście, że języki pojawiły się jednego dnia. Projekty powstawały przez lata, a standardy i implementacje rozwijały się później przez dekady.

---

# 1. FORTRAN

## Co to właściwie znaczy?

Nazwa pochodzi od:

```text
FORmula TRANslation
```

FORTRAN powstał w IBM pod kierownictwem Johna Backusa. Pierwszy kompilator pojawił się w 1957 roku.

Dla dzisiejszego programisty może to brzmieć zwyczajnie, ale pomysł był rewolucyjny:

> naukowiec miał opisać obliczenia wzorami i instrukcjami wysokiego poziomu zamiast ręcznie układać instrukcje procesora.

## Dlaczego FORTRAN był przełomem

Wczesne komputery były programowane bardzo blisko sprzętu.

FORTRAN pokazał, że kompilator może przetłumaczyć czytelniejszy zapis:

```fortran
C = A + B
```

na wydajny kod maszynowy.

W latach 50. nie było oczywiste, że program wygenerowany przez kompilator może być wystarczająco szybki, żeby naukowcy zgodzili się odejść od ręcznego programowania niskopoziomowego.

FORTRAN pomógł tę barierę przełamać.

## Czy FORTRAN umarł?

Nie.

Zmienił się również zapis nazwy. Współczesne standardy zwykle zapisuje się jako:

```text
Fortran
```

a nie historyczne:

```text
FORTRAN
```

Współczesny Fortran nadal jest używany w:

- obliczeniach naukowych,
- fizyce,
- meteorologii,
- modelach klimatycznych,
- HPC,
- symulacjach,
- bibliotekach numerycznych.

Dzisiejszy Fortran wygląda znacznie nowocześniej niż FORTRAN 77.

## Jak uruchomić Fortran dzisiaj

Najłatwiej użyć GNU Fortran:

```text
gfortran
```

Jest to frontend Fortrana należący do GCC.

### Windows

Jedną z wygodniejszych dróg jest MSYS2.

Po instalacji MSYS2 otwieramy terminal UCRT64:

```bash
pacman -S mingw-w64-ucrt-x86_64-gcc-fortran
```

Sprawdzenie:

```bash
gfortran --version
```

### macOS

Homebrew:

```bash
brew install gcc
```

Pakiet GCC zawiera `gfortran`.

Sprawdzenie:

```bash
gfortran --version
```

### Linux / Debian

```bash
sudo apt update
sudo apt install gfortran
```

Sprawdzenie:

```bash
gfortran --version
```

## Pierwszy program

Plik:

```text
hello.f90
```

Kod:

```fortran
program hello
    implicit none

    print *, "Hello from Fortran!"
end program hello
```

Kompilacja:

```bash
gfortran hello.f90 -o hello
```

Uruchomienie Linux/macOS:

```bash
./hello
```

Windows:

```powershell
.\hello.exe
```

## Dlaczego `.f90`?

Historyczne pliki:

```text
.f
.for
.ftn
```

są zwykle traktowane przez kompilatory jako kod w starym układzie `fixed form`.

Rozszerzenie:

```text
.f90
```

oznacza zwykle współczesny `free form`.

Nie oznacza ono, że program musi być zgodny wyłącznie z Fortranem 90.

## FORTRAN kontra współczesny Fortran

Stary kod mógł wyglądać tak:

```fortran
      DO 100 I = 1, 10
      PRINT *, I
  100 CONTINUE
```

Współczesny zapis:

```fortran
do i = 1, 10
    print *, i
end do
```

To nadal ta sama rodzina języka, ale różnica ergonomii jest ogromna.

## Zgadnij liczbę 0-100 w Fortranie

Tak. Da się.

Plik:

```text
guess.f90
```

```fortran
program guess_number
    implicit none

    integer :: secret
    integer :: guess
    integer :: io_status
    real :: r

    call random_seed()
    call random_number(r)

    secret = int(r * 101.0)

    print *, "Zgadnij liczbe od 0 do 100."

    do
        write(*, '(A)', advance='no') "Twoj strzal: "
        read(*, *, iostat=io_status) guess

        if (io_status /= 0) then
            print *, "Podaj poprawna liczbe."
            stop
        end if

        if (guess < secret) then
            print *, "Za malo!"
        else if (guess > secret) then
            print *, "Za duzo!"
        else
            print *, "Brawo!"
            exit
        end if
    end do

end program guess_number
```

Kompilacja:

```bash
gfortran guess.f90 -o guess
```

Uruchomienie:

```bash
./guess
```

I tak - język, którego pierwsza implementacja powstała w latach 50., właśnie zagrał z nami w zgadywankę.

---

# 2. COBOL

## Co to jest

COBOL oznacza:

```text
COmmon Business-Oriented Language
```

Powstał pod koniec lat 50. jako język do zastosowań biznesowych.

Nad projektem pracował komitet CODASYL. Grace Hopper była jedną z kluczowych osób, których wcześniejsze prace i idee dotyczące języków zbliżonych do języka naturalnego silnie wpłynęły na rozwój COBOL-a.

Nie należy jednak upraszczać historii do:

> Grace Hopper sama wymyśliła COBOL.

COBOL był wynikiem pracy wielu osób i organizacji.

## Co miał rozwiązać?

Świat biznesu potrzebował przede wszystkim:

- przetwarzania rekordów,
- raportów,
- faktur,
- płac,
- kont,
- transakcji,
- dużych zbiorów danych.

Dlatego COBOL wygląda inaczej niż C.

Kod miał być możliwie opisowy.

Przykład:

```cobol
ADD TAX TO TOTAL
```

albo:

```cobol
IF BALANCE IS GREATER THAN ZERO
    DISPLAY "ACCOUNT ACTIVE"
END-IF
```

Jest rozwlekły.

To cecha, nie przypadek.

## Struktura klasycznego programu

Program COBOL tradycyjnie dzieli się na sekcje:

```text
IDENTIFICATION DIVISION
ENVIRONMENT DIVISION
DATA DIVISION
PROCEDURE DIVISION
```

Czyli mniej więcej:

```text
kim jest program
w jakim środowisku działa
jakie ma dane
co ma zrobić
```

## Czy COBOL nadal działa?

Tak.

COBOL nadal występuje szczególnie w:

- bankowości,
- ubezpieczeniach,
- systemach rządowych,
- mainframe'ach,
- rozliczeniach,
- wieloletnich systemach transakcyjnych.

Powód jest prosty.

Jeżeli system:

- działa od dziesięcioleci,
- obsługuje ogromną liczbę transakcji,
- posiada miliony linii sprawdzonego kodu,

to jego przepisanie tylko dlatego, że język jest stary, może być większym ryzykiem niż jego utrzymywanie.

## GnuCOBOL

Do eksperymentów użyjemy:

```text
GnuCOBOL
```

Kompilator `cobc` tłumaczy COBOL do C, a następnie korzysta z kompilatora C i linkera do stworzenia programu wykonywalnego.

### Windows

Najwygodniej użyć MSYS2.

W terminalu UCRT64:

```bash
pacman -S mingw-w64-ucrt-x86_64-gnucobol
```

Sprawdzenie:

```bash
cobc --version
```

### macOS

Homebrew:

```bash
brew install gnucobol
```

Sprawdzenie:

```bash
cobc --version
```

### Linux / Debian

```bash
sudo apt update
sudo apt install gnucobol
```

Sprawdzenie:

```bash
cobc --version
```

## Hello World

Plik:

```text
hello.cob
```

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO.

       PROCEDURE DIVISION.
           DISPLAY "Hello from COBOL!".
           STOP RUN.
```

Kompilacja:

```bash
cobc -x -free hello.cob -o hello
```

Uruchomienie:

```bash
./hello
```

Opcja:

```text
-free
```

pozwala korzystać z wygodniejszego swobodnego układu źródła zamiast historycznego układu kolumn.

## Zgadnij liczbę 0-100 w COBOL-u

Da się również to.

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. GUESS-NUMBER.

       DATA DIVISION.
       WORKING-STORAGE SECTION.

       01 SECRET-NUMBER PIC 9(3).
       01 GUESS-NUMBER  PIC 9(3).
       01 FINISHED      PIC X VALUE "N".

       PROCEDURE DIVISION.

           COMPUTE SECRET-NUMBER =
               FUNCTION INTEGER(FUNCTION RANDOM * 101).

           DISPLAY "Zgadnij liczbe od 0 do 100.".

           PERFORM UNTIL FINISHED = "Y"

               DISPLAY "Twoj strzal: " WITH NO ADVANCING
               ACCEPT GUESS-NUMBER

               IF GUESS-NUMBER < SECRET-NUMBER
                   DISPLAY "Za malo!"
               ELSE
                   IF GUESS-NUMBER > SECRET-NUMBER
                       DISPLAY "Za duzo!"
                   ELSE
                       DISPLAY "Brawo!"
                       MOVE "Y" TO FINISHED
                   END-IF
               END-IF

           END-PERFORM.

           STOP RUN.
```

Kompilacja:

```bash
cobc -x -free guess.cob -o guess
```

Uruchomienie:

```bash
./guess
```

COBOL nie jest piękny w tym zastosowaniu.

Ale nie po to powstał.

Znacznie naturalniej czuje się przy programie w rodzaju:

```text
wczytaj milion rekordów
sprawdź konta
wylicz odsetki
utwórz raport
zapisz wynik
```

I właśnie takie zadania wykonywał przez dziesięciolecia.

---

# 3. ALGOL

## Nie jeden język, lecz rodzina

ALGOL oznacza:

```text
ALGOrithmic Language
```

Najważniejsze odmiany to:

- ALGOL 58,
- ALGOL 60,
- ALGOL 68.

Szczególnie ALGOL 60 miał gigantyczny wpływ na języki, które powstały później.

## Co zawdzięczamy ALGOL-owi?

Między innymi popularyzację:

- struktury blokowej,
- lokalnych zmiennych,
- rekursji,
- formalnego opisu składni,
- zapisu algorytmów w publikacjach naukowych.

Jeżeli dziś widzisz:

```text
begin
    ...
end
```

albo bloki:

```text
{
    ...
}
```

to patrzysz na ideę, której popularyzacji mocno pomogła rodzina ALGOL.

Wpływ ALGOL-a widać między innymi w:

- Pascalu,
- C,
- Adzie,
- Moduli,
- wielu późniejszych językach strukturalnych.

## BNF

Z ALGOL-em związana jest również notacja używana do formalnego opisu składni języków:

```text
Backus-Naur Form
```

czyli BNF.

W uproszczeniu możemy zapisać regułę języka:

```text
<expression> ::= <number> | <expression> "+" <expression>
```

To sposób opisania:

> z czego może składać się poprawne wyrażenie.

Takie formalne gramatyki są dziś podstawowym narzędziem przy projektowaniu parserów i języków.

## ALGOL 68

ALGOL 68 był dużo bardziej ambitnym językiem.

Posiadał między innymi:

- bogaty system typów,
- referencje,
- struktury danych,
- tablice,
- procedury jako wartości,
- rozbudowane operatory.

Przez lata był raczej językiem historycznym niż praktycznym.

I tu wydarzyło się coś zabawnego.

W 2026 roku ALGOL 68 nadal można normalnie uruchomić na współczesnym komputerze, a GCC 16 otrzymał nawet eksperymentalny frontend języka o nazwie:

```text
ga68
```

## Najprostsza droga: Algol 68 Genie

Dla nauki łatwiejszy jest dziś Algol 68 Genie.

### Windows

Projekt publikuje gotowy plik wykonywalny dla Windows 11.

Po rozpakowaniu:

```powershell
a68g --version
```

### macOS

Homebrew:

```bash
brew install algol68g
```

### Linux / Debian

Debian posiada pakiet:

```bash
sudo apt update
sudo apt install algol68g
```

Sprawdzenie:

```bash
a68g --version
```

## Program

Plik:

```text
hello.a68
```

```algol68
BEGIN
    print(("Hello from ALGOL 68!", new line))
END
```

Uruchomienie:

```bash
a68g hello.a68
```

## A co z GCC?

W GCC 16 eksperymentalny kompilator ALGOL 68 nazywa się:

```text
ga68
```

To niezwykła sytuacja: język zaprojektowany ponad pół wieku temu dostał w 2026 roku nowoczesny frontend w jednym z najważniejszych zestawów kompilatorów świata.

Do zwykłej zabawy nadal łatwiej użyć Algol 68 Genie.

---

# 4. BASIC

## Nazwa

BASIC pierwotnie rozwijano jako:

```text
Beginner's All-purpose Symbolic Instruction Code
```

Powstał w Dartmouth College w 1964 roku.

Głównymi twórcami byli John Kemeny i Thomas Kurtz.

## Cel

BASIC miał zrobić coś bardzo ważnego:

> pozwolić korzystać z komputera ludziom, którzy nie byli zawodowymi programistami.

To brzmi znajomo.

Dzisiaj podobną rolę pełni często Python.

## Time-sharing

BASIC był mocno związany z systemami współdzielenia czasu.

Student mógł usiąść przy terminalu i wpisać:

```basic
PRINT 2 + 2
```

zamiast przygotowywać talię kart perforowanych.

Była to ogromna zmiana w sposobie nauki.

## BASIC i mikrokomputery

Później BASIC stał się niemal symbolem komputerów domowych.

W wielu maszynach po uruchomieniu użytkownik od razu widział interpreter BASIC-a.

Dotyczyło to różnych platform:

- Commodore,
- Apple,
- Atari,
- ZX Spectrum,
- IBM PC i kompatybilnych.

Komputer zachęcał:

```text
READY.
```

i czekał, aż coś napiszesz.

## Numery linii

Klasyczny BASIC:

```basic
10 PRINT "HELLO"
20 GOTO 10
```

Numery były jednocześnie:

- kolejnością instrukcji,
- punktami skoku.

Stąd słynne:

```text
GOTO
```

## Jak pobawić się BASIC-em dzisiaj

Dobrą współczesną implementacją do eksperymentów jest:

```text
QB64-PE
```

czyli QB64 Phoenix Edition.

Jest kompatybilny z dużą częścią QBasic/QuickBASIC, ale potrafi tworzyć współczesne programy na:

- Windows,
- macOS,
- Linux.

Strona projektu:

https://www.qb64phoenix.com/

## Zgadnij liczbę

```basic
RANDOMIZE TIMER

secret% = INT(RND * 101)

PRINT "Zgadnij liczbe od 0 do 100."

DO
    INPUT "Twoj strzal: ", guess%

    IF guess% < secret% THEN
        PRINT "Za malo!"
    ELSEIF guess% > secret% THEN
        PRINT "Za duzo!"
    ELSE
        PRINT "Brawo!"
        EXIT DO
    END IF
LOOP
```

To już wygląda zaskakująco normalnie.

---

# 5. Pascal
## Dlaczego powstał

Pascal został zaprojektowany przez Niklausa Wirtha.

Pierwsza wersja języka pojawiła się około 1970 roku.

Jednym z głównych celów było nauczanie:

```text
dobrze ustrukturyzowanego programowania
```

## Programowanie strukturalne

Zamiast budować program jako plątaninę:

```text
GOTO 100
GOTO 450
GOTO 20
```

programista miał korzystać z czytelnych struktur:

```pascal
if ... then
begin
    ...
end;
```

```pascal
while ... do
begin
    ...
end;
```

```pascal
for i := 1 to 10 do
begin
    ...
end;
```

## Typy

Pascal był również językiem mocno typowanym.

To pomagało uczyć dyscypliny:

```pascal
var
  Age: Integer;
  Name: String;
```

## Turbo Pascal

Dla ogromnej liczby programistów w latach 80. i 90. Pascal oznaczał:

```text
Turbo Pascal
```

Borland połączył:

- kompilator,
- edytor,
- debugger,
- system budowania,

w jednym szybkim środowisku.

W pewnym sensie było to jedno z doświadczeń prowadzących do współczesnego IDE.

## Pascal dzisiaj

Najłatwiej eksperymentować z:

```text
Free Pascal
```

Projekt obsługuje również wiele elementów Object Pascala.

### Windows

Instalator:

https://www.freepascal.org/

Po instalacji:

```powershell
fpc -iV
```

### macOS

Free Pascal publikuje pakiety dla macOS.

Można też korzystać z Lazarusa, który jest graficznym IDE opartym o Free Pascal.

### Linux / Debian

```bash
sudo apt update
sudo apt install fpc
```

Sprawdzenie:

```bash
fpc -iV
```

## Kompilacja

```bash
fpc hello.pas
```

## Zgadnij liczbę

```pascal
program GuessNumber;

var
  Secret: Integer;
  Guess: Integer;

begin
  Randomize;
  Secret := Random(101);

  Writeln('Zgadnij liczbe od 0 do 100.');

  repeat
    Write('Twoj strzal: ');
    Readln(Guess);

    if Guess < Secret then
      Writeln('Za malo!')
    else if Guess > Secret then
      Writeln('Za duzo!')
    else
      Writeln('Brawo!');

  until Guess = Secret;
end.
```

Kompilacja:

```bash
fpc guess.pas
```

Uruchomienie:

```bash
./guess
```

---

# 6. Lisp

## Jeden z najstarszych języków, który nadal wygląda futurystycznie

Lisp powstał pod koniec lat 50.

Jego twórcą był John McCarthy.

Nazwa pochodzi od:

```text
LISt Processing
```

## Nawiasy

Program w Lispie wygląda charakterystycznie:

```lisp
(+ 2 3)
```

zamiast:

```text
2 + 3
```

Funkcja znajduje się na początku listy.

```lisp
(print "Hello")
```

```lisp
(* 5 10)
```

## Kod jako dane

Jednym z najbardziej wpływowych pomysłów Lispa jest bliskość reprezentacji kodu i danych.

Program:

```lisp
(+ 1 2)
```

ma strukturę bardzo podobną do listy danych.

Ta właściwość otworzyła drogę między innymi do:

- makr,
- programów modyfikujących kod,
- metaprogramowania.

## Funkcyjne korzenie

Lisp silnie wpłynął na rozwój programowania funkcyjnego.

Pomysły z rodziny Lisp znajdziemy później w wielu językach.

## Garbage collector

Lisp był również jednym z pionierów automatycznego zarządzania pamięcią.

Zamiast wymagać od programisty ręcznego zwalniania każdego obiektu, system mógł wykrywać obiekty, które nie są już używane.

Dzisiaj garbage collection jest codziennością w językach takich jak:

- Java,
- C#,
- Go,
- JavaScript.

## Lisp nie jest jednym współczesnym językiem

Rodzina obejmuje między innymi:

- Common Lisp,
- Scheme,
- Clojure,
- Racket,
- Emacs Lisp.

Do eksperymentów użyjemy:

```text
Common Lisp + SBCL
```

czyli Steel Bank Common Lisp.

## Instalacja

### Windows

SBCL publikuje binaria dla Windowsa:

https://www.sbcl.org/

### macOS

```bash
brew install sbcl
```

### Linux / Debian

```bash
sudo apt update
sudo apt install sbcl
```

Sprawdzenie:

```bash
sbcl --version
```

## REPL

```bash
sbcl
```

Potem:

```lisp
(+ 2 3)
```

## Zgadnij liczbę

```lisp
(defun guess-number ()
  (let ((secret (random 101)))
    (format t "Zgadnij liczbe od 0 do 100.~%")

    (loop
      (format t "Twoj strzal: ")
      (force-output)

      (let ((guess (read)))
        (cond
          ((< guess secret)
           (format t "Za malo!~%"))

          ((> guess secret)
           (format t "Za duzo!~%"))

          (t
           (format t "Brawo!~%")
           (return)))))))

(guess-number)
```

Plik:

```text
guess.lisp
```

Uruchomienie:

```bash
sbcl --script guess.lisp
```

---

# 7. Smalltalk

## Tu zaczyna się współczesne „wszystko jest obiektem”

Smalltalk powstał w latach 70. w Xerox PARC.

Z językiem związani byli między innymi:

- Alan Kay,
- Dan Ingalls,
- Adele Goldberg.

Smalltalk nie był wyłącznie językiem.

Był również środowiskiem pracy i sposobem myślenia o komputerze.

## Obiekty

W Smalltalku programowanie jest komunikacją między obiektami.

Przykład:

```smalltalk
3 + 4
```

można rozumieć jako:

> wyślij obiektowi `3` komunikat `+` z argumentem `4`.

## Wiadomości

Charakterystyczna składnia:

```smalltalk
Transcript show: 'Hello'.
```

Obiekt `Transcript` otrzymuje wiadomość:

```text
show:
```

z tekstem jako argumentem.

## Wpływ

Smalltalk wpłynął na:

- programowanie obiektowe,
- IDE,
- refaktoryzację,
- debugowanie interaktywne,
- GUI,
- MVC,
- dynamiczne środowiska programistyczne.

Wiele idei obecnych dziś w IDE było testowanych w środowiskach Smalltalka dekady temu.

## Jak uruchomić Smalltalk dzisiaj

Jednym z aktywnych potomków jest:

```text
Pharo
```

Pharo posiada launcher dla:

- Windows,
- macOS Intel,
- macOS Apple Silicon,
- GNU/Linux.

Strona:

https://pharo.org/

Najłatwiej zainstalować:

```text
Pharo Launcher
```

i utworzyć obraz aktualnej stabilnej wersji.

## Pierwsze eksperymenty

W Workspace:

```smalltalk
3 + 4
```

zaznaczamy i wykonujemy.

Tekst:

```smalltalk
'Hello from Smalltalk'
```

Możemy również wyświetlić:

```smalltalk
Transcript show: 'Hello from Smalltalk'; cr.
```

## Dlaczego obraz?

Środowiska Smalltalk często zapisują cały stan pracy w:

```text
image
```

To nie tylko katalog źródeł.

Image może zawierać:

- obiekty,
- klasy,
- kod,
- zmienne,
- stan środowiska.

To bardzo inny model pracy niż klasyczny:

```text
edytor -> plik -> kompilator -> program
```

---

# 8. Prolog

## Programowanie bez opisywania kolejnych kroków

Prolog powstał na początku lat 70.

Z jego początkami związani są przede wszystkim Alain Colmerauer i Philippe Roussel, a rozwój podstaw teoretycznych wiąże się również z Robertem Kowalskim.

Nazwa pochodzi od:

```text
PROgramming in LOGic
```

## Inny sposób myślenia

W języku proceduralnym piszesz:

```text
zrób A
potem B
jeśli C, wykonaj D
```

W Prologu często opisujesz:

```text
fakty
reguły
pytanie
```

## Fakty

```prolog
parent(anna, bob).
parent(bob, carol).
```

Czyli:

```text
Anna jest rodzicem Boba.
Bob jest rodzicem Carol.
```

## Reguła

```prolog
grandparent(X, Z) :-
    parent(X, Y),
    parent(Y, Z).
```

Czyli:

> X jest dziadkiem/babcią Z, jeśli X jest rodzicem Y i Y jest rodzicem Z.

## Pytanie

```prolog
?- grandparent(anna, carol).
```

Prolog próbuje znaleźć dowód.

## Backtracking

Jeżeli istnieje kilka możliwości, interpreter może cofać się i próbować kolejnych.

To jedna z najbardziej charakterystycznych cech języka.

## Instalacja: SWI-Prolog

### Windows

SWI-Prolog publikuje oficjalny instalator 64-bitowy:

https://www.swi-prolog.org/

### macOS

Można pobrać oficjalny bundle albo:

```bash
brew install swi-prolog
```

### Linux / Debian

```bash
sudo apt update
sudo apt install swi-prolog
```

Sprawdzenie:

```bash
swipl --version
```

## REPL

```bash
swipl
```

## Zgadnij liczbę

```prolog
:- use_module(library(random)).

guess_number :-
    random_between(0, 100, Secret),
    writeln('Zgadnij liczbe od 0 do 100.'),
    ask(Secret).

ask(Secret) :-
    write('Twoj strzal: '),
    read(Guess),
    compare_guess(Guess, Secret).

compare_guess(Guess, Secret) :-
    Guess < Secret,
    writeln('Za malo!'),
    ask(Secret).

compare_guess(Guess, Secret) :-
    Guess > Secret,
    writeln('Za duzo!'),
    ask(Secret).

compare_guess(Secret, Secret) :-
    writeln('Brawo!').
```

Plik:

```text
guess.pl
```

Uruchomienie:

```bash
swipl -s guess.pl
```

Następnie:

```prolog
?- guess_number.
```

W konsoli Prologa liczby wpisujemy jako terminy, więc po liczbie podajemy kropkę:

```text
42.
```

---

# 9. Forth

## Minimalizm do bólu

Forth został stworzony przez Charlesa H. Moore'a.

Język rozwijał się od końca lat 60. i początku 70.

Jest:

- stosowy,
- interaktywny,
- bardzo mały,
- łatwy do przenoszenia,
- bliski sprzętowi.

## Stos

W większości języków:

```text
2 + 3
```

W Forth:

```forth
2 3 +
```

Czyli:

```text
wrzuć 2 na stos
wrzuć 3 na stos
zdejmij dwie wartości
dodaj
wrzuć wynik
```

Wyświetlenie:

```forth
2 3 + .
```

Da:

```text
5
```

## Definiowanie słowa

W Forth funkcje nazywa się często:

```text
words
```

Przykład:

```forth
: square dup * ;
```

Od tej chwili:

```forth
5 square .
```

da:

```text
25
```

## Dlaczego Forth jest ważny?

Pokazuje zupełnie inne podejście do języka.

Zamiast ogromnego runtime'u:

```text
mały rdzeń
+
stos
+
słownik słów
+
rozszerzanie języka przez użytkownika
```

Forth znalazł zastosowanie między innymi w:

- systemach embedded,
- firmware,
- astronomii,
- sterowaniu sprzętem,
- bootloaderach,
- systemach o małych zasobach.

## Gforth

Do nauki użyjemy:

```text
Gforth
```

Jest implementacją standardu Forth.

### Windows

Projekt udostępnia buildy dla Windowsa:

https://gforth.org/

### macOS

Gforth można zainstalować przez pakiet systemowy lub zbudować ze źródeł; aktualne możliwości zależą od wersji macOS.

### Linux / Debian

```bash
sudo apt update
sudo apt install gforth
```

Sprawdzenie:

```bash
gforth --version
```

## REPL

```bash
gforth
```

Potem:

```forth
2 3 + .
```

## Mały program

```forth
: square dup * ;

5 square .
cr
```

Plik:

```text
square.fs
```

Uruchomienie:

```bash
gforth square.fs
```

---

# 10. PL/I

## Próba stworzenia języka do wszystkiego

PL/I powstał w IBM w latach 60.

Nazwa oznacza:

```text
Programming Language One
```

IBM miał problem.

Istniały dwa wielkie światy:

```text
FORTRAN -> nauka i obliczenia
COBOL   -> biznes i dane
```

A duże organizacje potrzebowały czasem obu.

PL/I miał połączyć możliwości:

- numeryczne,
- biznesowe,
- systemowe,
- tekstowe,
- obsługę wyjątków,
- współbieżność,
- operacje na plikach.

## Wielki język

Efektem był bardzo rozbudowany język.

PL/I posiadał możliwości, które jak na lata 60. były niezwykle ambitne.

Nie został jednak uniwersalnym następcą FORTRAN-u i COBOL-a.

## Dlaczego jest ważny?

Pokazał, że duży język ogólnego przeznaczenia może próbować obsługiwać bardzo różne dziedziny.

Wpłynął również na późniejsze projekty języków.

## Czy PL/I nadal istnieje?

Tak.

IBM nadal posiada współczesne implementacje dla swoich platform.

Istnieje też:

```text
Iron Spring PL/I
```

który w 2026 roku nadal otrzymywał aktualizacje.

## Linux

Iron Spring publikuje kompilator dla Linuxa.

Po instalacji dostępny jest program:

```text
plic
```

Przykładowa kompilacja:

```bash
plic hello.pli
```

Dokładne polecenie linkowania zależy od instalacji runtime'u i dokumentacji danej wersji.

## Windows

Aktualna otwarta wersja Iron Spring jest przede wszystkim projektem linuksowym.

Na Windowsie najprostsze środowisko eksperymentalne to:

```text
WSL
```

i uruchomienie linuksowego toolchainu wewnątrz WSL.

Historycznie istnieją również wersje dla OS/2.

## macOS

Nie ma równie wygodnej, współczesnej natywnej ścieżki jak dla Fortrana czy Pascala.

Najprościej użyć:

- maszyny wirtualnej z Linuxem,
- kontenera,
- zdalnego Linuxa.

To dobra ilustracja różnicy między:

> język nadal istnieje

a:

> język ma wygodny współczesny ekosystem desktopowy.

## Przykład

```pli
HELLO: PROCEDURE OPTIONS(MAIN);

    PUT SKIP LIST('Hello from PL/I!');

END HELLO;
```

To wystarczy, aby zobaczyć charakterystyczny styl języka.

---

# 11. Logo

## Język edukacyjny, ale nie zabawka

Logo powstało w latach 60.

Z projektem związani byli między innymi:

- Wally Feurzeig,
- Seymour Papert,
- Cynthia Solomon.

Język był mocno związany z badaniami nad edukacją i sposobem, w jaki dzieci uczą się myślenia algorytmicznego.

## Żółw

Najbardziej znanym elementem Logo jest:

```text
turtle graphics
```

Sterujemy „żółwiem” poruszającym się po ekranie.

Przykład:

```logo
forward 100
right 90
forward 100
```

Żółw rysuje linię podczas ruchu.

## Kwadrat

```logo
repeat 4 [
    forward 100
    right 90
]
```

To niezwykle dobry przykład abstrakcji.

Zamiast mówić:

```text
naprzód
w prawo
naprzód
w prawo
naprzód
w prawo
naprzód
w prawo
```

mówimy:

```text
powtórz 4 razy
```

Dziecko uczy się pętli bez wykładu o teorii kompilatorów.

## Procedura
```logo
to square :size
    repeat 4 [
        forward :size
        right 90
    ]
end
```

Potem:

```logo
square 100
```

To już normalne programowanie:

- parametr,
- procedura,
- pętla,
- stan.

## Jak uruchomić Logo dziś?

Ekosystem jest bardziej rozdrobniony niż w przypadku Pythona czy Prologa.

Istnieją różne implementacje dla różnych platform.

Do szybkiej nauki bardzo wygodne są współczesne implementacje działające w przeglądarce.

Klasyczne lokalne projekty to między innymi:

- Berkeley Logo / UCBLogo,
- FMSLogo.

W tym przypadku nie warto na siłę udawać, że istnieje jeden dominujący współczesny toolchain dla Windows/macOS/Linux.

Najważniejsza jest idea języka i jego wpływ na edukację informatyczną.

---

# 12. Ada

## Wojsko miało problem z liczbą języków

W latach 70. Departament Obrony USA korzystał z ogromnej liczby języków i dialektów w różnych projektach.

Każdy system mógł posiadać własny:

- język,
- kompilator,
- biblioteki,
- narzędzia.

Utrzymanie tego świata stawało się coraz trudniejsze.

Rozpoczęto więc projekt nowego języka.

Zespół, który stworzył zwycięski projekt, prowadził Jean Ichbiah.

Język nazwano:

```text
Ada
```

na cześć Ady Lovelace.

## Filozofia

Ada miała dobrze sprawdzać się w:

- dużych systemach,
- systemach czasu rzeczywistego,
- oprogramowaniu o wysokiej niezawodności,
- systemach krytycznych.

Język jest bardzo mocno typowany.

Możemy napisać:

```ada
subtype Percentage is Integer range 0 .. 100;
```

i ograniczyć zakres poprawnych wartości już na poziomie typu.

## Ada dzisiaj

Ada nadal jest używana między innymi w:

- lotnictwie,
- kolei,
- obronności,
- embedded,
- systemach safety-critical.

Do współczesnej pracy można użyć:

- GNAT,
- Alire,
- SPARK.

### Linux / Debian

Najprościej:

```bash
sudo apt update
sudo apt install gnat gprbuild
```

### Windows / macOS / Linux

Bardziej współczesnym sposobem zarządzania toolchainem jest:

```text
Alire
```

Polecenie:

```bash
alr
```

pełni dla ekosystemu Ada rolę trochę podobną do:

```text
cargo
npm
```

Projekt może sam pobrać GNAT i zależności.

## Hello

```ada
with Ada.Text_IO;
use Ada.Text_IO;

procedure Hello is
begin
   Put_Line ("Hello from Ada!");
end Hello;
```

Kompilacja klasycznym GNAT-em:

```bash
gnatmake hello.adb
```

Uruchomienie:

```bash
./hello
```

## Dlaczego tylko tyle?

Bo Ada dostanie **osobny artykuł**.

Tam wejdziemy dużo głębiej w:

- system typów,
- zakresy,
- rekordy,
- tasking,
- wyjątki,
- kontrakty,
- SPARK,
- formalną weryfikację,
- współczesny workflow Alire.

---

# 13. Assembly - język, który nie jest jednym językiem

Assembler stoi trochę obok reszty tego artykułu.

Nie istnieje jeden uniwersalny:

```text
Assembly
```

Instrukcje zależą od architektury procesora.

## Przykłady

MOS 6502:

```asm
LDA #$01
STA $0400
```

x86:

```asm
mov eax, 1
add eax, 2
```

ARM:

```asm
mov w0, #1
add w0, w0, #2
```

RISC-V:

```asm
li a0, 1
addi a0, a0, 2
```

To są różne zestawy instrukcji.

## Dlaczego assembler jest tak ważny?

Pierwsze języki asemblerowe pozwoliły odejść od wpisywania surowych kodów instrukcji.

Zamiast pamiętać, że pewien ciąg bitów oznacza:

```text
załaduj wartość do rejestru
```

można było napisać symbolicznie:

```asm
LOAD
MOV
LDA
```

zależnie od architektury.

Assembler wprowadził między innymi:

- nazwy instrukcji,
- etykiety,
- symbole,
- prostsze adresowanie.

Był pierwszą wielką warstwą abstrakcji nad kodem maszynowym.

## Dlaczego nie rozwijamy go tutaj?

Bo assembler zasługuje na osobny artykuł.

Trzeci tekst tej serii będzie poświęcony właśnie jemu:

- CPU,
- rejestry,
- pamięć,
- stos,
- instrukcje,
- skoki,
- adresowanie,
- assembler,
- linker,
- MOS 6502,
- x86-64,
- ARM i RISC-V jako porównanie.

---

# Co te języki dały współczesnemu programowaniu?

Najważniejsza część całej historii nie brzmi:

> który stary język był najlepszy?

Znacznie ciekawsze jest pytanie:

> jakie pomysły przetrwały?

## FORTRAN

Pokazał, że język wysokiego poziomu może generować naprawdę wydajny kod.

Dziedzictwo:

```text
kompilatory optymalizujące
obliczenia numeryczne
HPC
```

## COBOL

Pokazał znaczenie języków i struktur danych dopasowanych do konkretnej domeny.

Dziedzictwo:

```text
systemy biznesowe
rekordy
raportowanie
przetwarzanie transakcji
```

## ALGOL

Jeden z największych dawców DNA współczesnych języków.

Dziedzictwo:

```text
bloki
scope
rekursja
formalny opis składni
programowanie strukturalne
```

## BASIC

Pokazał, że programowanie może być dostępne dla zwykłego użytkownika.

Dziedzictwo:

```text
niski próg wejścia
interaktywność
edukacja
programowanie na komputerze osobistym
```

## Pascal

Uczył całe pokolenia programowania strukturalnego.

Dziedzictwo:

```text
czytelne struktury sterujące
typowanie
edukacja
IDE Turbo Pascala
```

## Lisp

Ogromny wpływ na informatykę teoretyczną i praktyczną.

Dziedzictwo:

```text
programowanie funkcyjne
garbage collection
makra
kod jako dane
REPL
```

## Smalltalk

Jeden z najważniejszych projektów w historii interaktywnego programowania.

Dziedzictwo:

```text
obiekty
wiadomości
GUI
IDE
refaktoryzacja
MVC
live programming
```

## Prolog

Pokazał zupełnie inny model:

```text
opisz wiedzę
opisz reguły
zadaj pytanie
```

Dziedzictwo:

```text
programowanie logiczne
systemy reguł
AI symboliczne
constraint solving
```

## Forth

Pokazał siłę ekstremalnie małego, rozszerzalnego języka.

Dziedzictwo:

```text
stos
embedded
interaktywność
DSL
minimalizm
```

## PL/I

Był wielkim eksperymentem języka ogólnego przeznaczenia.

Dziedzictwo:

```text
łączenie wielu domen
duże systemy typów
obsługa wyjątków
systemowe możliwości w języku wysokiego poziomu
```

## Logo

Pokazało, że programowanie może być narzędziem myślenia, a nie tylko sposobem na produkowanie oprogramowania.

Dziedzictwo:

```text
edukacja
turtle graphics
nauka przez eksperyment
konstrukcjonizm
```

## Ada

Pokazała, że język może aktywnie pomagać ograniczać klasy błędów.

Dziedzictwo:

```text
silne typowanie
kontrakty
safety-critical
współbieżność
formalna weryfikacja
```

## Assembly

Pokazał pierwszy wielki krok od kodów procesora do symbolicznego programowania.

Dziedzictwo:

```text
assembler
linker
symbole
debugowanie niskopoziomowe
model procesora
```

---

# Drzewo wpływów - bardzo uproszczone

Historia języków nie jest prostym drzewem genealogicznym, ale można zbudować orientacyjną mapę:

```text
kod maszynowy
    |
    v
Assembly
    |
    +----------------------+
    |                      |
    v                      v
FORTRAN                  Lisp
    |                      |
    |                      +----> Scheme
    |                      |
    |                      +----> Common Lisp
    |                      |
    |                      +----> Clojure
    |
    v
ALGOL
    |
    +----> Pascal ----> Modula
    |
    +----> C ----> C++ ----> Java / C#
    |
    +----> Ada

COBOL ------------------> systemy biznesowe

Smalltalk --------------> OOP / GUI / IDE
    |
    +----> wpływ na Objective-C
    +----> wpływ na Ruby
    +----> wpływ na wiele modeli obiektowych

Prolog -----------------> języki logiczne / systemy reguł

Forth ------------------> embedded / języki stosowe

BASIC ------------------> mikrokomputery
    |
    +----> QuickBASIC
    +----> Visual Basic

Logo -------------------> edukacyjne języki programowania
```

To jest mapa idei, a nie dokładna genealogia.

Języki wpływały na siebie wieloma drogami jednocześnie.

---

# Jak zmieniał się sposób programowania

Możemy spojrzeć na historię nie przez języki, lecz przez poziom abstrakcji.

## Etap 1 - kod maszynowy

```text
10110000 01100001
```

Programista myśli prawie dokładnie tak jak procesor.

## Etap 2 - assembler

```asm
MOV AL, 61h
```

Instrukcja ma nazwę.

## Etap 3 - pierwszy język wysokiego poziomu

```fortran
X = A + B
```

Programista opisuje operację matematycznie.

## Etap 4 - struktura

ALGOL i Pascal:

```text
if
while
procedure
block
scope
```

## Etap 5 - abstrakcja danych

Pojawiają się coraz bogatsze:

```text
record
struct
type
class
```

## Etap 6 - obiekty

Smalltalk:

```text
obiekt + wiadomość
```

## Etap 7 - programowanie deklaratywne

Prolog:

```text
co jest prawdą?
```

zamiast:

```text
jak krok po kroku policzyć odpowiedź?
```

## Etap 8 - współczesność

Dzisiejszy program może łączyć kilkanaście poziomów:

```text
TypeScript
    ↓
JavaScript
    ↓
VM
    ↓
JIT
    ↓
kod maszynowy
    ↓
CPU
```

Programista może pracować bardzo wysoko nad sprzętem, ale wszystkie warstwy poniżej nadal istnieją.

---

# „Stary” nie oznacza „prymitywny”

To jeden z najważniejszych wniosków.

Niektóre stare języki posiadały idee, które do mainstreamu weszły dużo później.

Lisp miał garbage collection, gdy większość dzisiejszych języków jeszcze nie istniała.

Smalltalk oferował niezwykle interaktywne środowisko programistyczne dekady przed współczesnymi IDE.

ALGOL 68 posiadał bardzo ambitny system typów.

Ada od początku była projektowana z myślą o niezawodności wielkich systemów.

Prolog pozwalał opisywać problemy logiczne zupełnie inaczej niż klasyczne języki proceduralne.

Wiek technologii nie mówi automatycznie nic o jakości jej pomysłów.

---

# „Stary” nie oznacza też „martwy”

Sprawdźmy sytuację w 2026 roku.

## Fortran

GNU Fortran jest normalnie rozwijanym elementem GCC i obsługuje współczesne standardy języka.

## COBOL

GnuCOBOL 3.2 jest używalnym, wolnym kompilatorem działającym na współczesnych systemach.

Co więcej, GCC posiada również własny frontend COBOL:

```text
gcobol
```

## ALGOL 68

Algol 68 Genie jest aktywnie rozwijany.

W sierpniu 2026 opublikowano wersję 3.13.3.

A GCC 16 zawiera eksperymentalny frontend:

```text
ga68
```

## Pascal

Free Pascal nadal jest aktywnym projektem i obsługuje wiele współczesnych platform.

## Lisp

SBCL jest aktywnie rozwijanym kompilatorem Common Lisp.

## Smalltalk

Pharo jest aktywnym współczesnym środowiskiem Smalltalk.

## Prolog

SWI-Prolog jest aktywnie rozwijany; w 2026 dostępna jest linia 10.0.

## Forth

Gforth nadal jest utrzymywany.

## PL/I

Iron Spring wydał wersję 1.4.1 dla Linuxa w 2026 roku.

## Ada

Ada, GNAT, Alire i SPARK są aktywnie rozwijane i używane zawodowo.

Czyli nasze „muzeum” ma zaskakująco dużo działających eksponatów.

---

# Jak uruchomić historyczne języki dzisiaj - ściąga

| Język | Implementacja do zabawy | Windows | macOS | Debian/Linux |
|---|---|---|---|---|
| Fortran | GNU Fortran | MSYS2 | Homebrew GCC | `apt install gfortran` |
| COBOL | GnuCOBOL | MSYS2 | `brew install gnucobol` | `apt install gnucobol` |
| ALGOL 68 | Algol 68 Genie | oficjalny Win64 | `brew install algol68g` | `apt install algol68g` |
| BASIC | QB64-PE | tak | tak | tak |
| Pascal | Free Pascal | oficjalny installer | oficjalny pakiet | `apt install fpc` |
| Lisp | SBCL | oficjalne binaria | `brew install sbcl` | `apt install sbcl` |
| Smalltalk | Pharo | Pharo Launcher | Pharo Launcher | Pharo Launcher |
| Prolog | SWI-Prolog | oficjalny installer | bundle / Homebrew | `apt install swi-prolog` |
| Forth | Gforth | build/binaria | źródła / pakiet | `apt install gforth` |
| PL/I | Iron Spring | najlepiej WSL | VM/Linux | oficjalny Linux build |
| Logo | różne implementacje | tak | tak | tak |
| Ada | GNAT / Alire | Alire | Alire | `apt install gnat gprbuild` |

---

# Które z nich warto naprawdę uruchomić?

Jeżeli chcesz tylko poznać historię, nie musisz instalować wszystkiego.

Najciekawszy praktyczny zestaw to:

## FORTRAN

Bo zobaczysz język z 1957 roku, który nadal jest technologią produkcyjną.

## COBOL

Bo składnia jest kompletnie inna od współczesnej mody, a mimo to bardzo logiczna dla swojej domeny.

## Lisp

Bo wymusza inne spojrzenie na kod i dane.

## Prolog

Bo pokazuje, że programowanie nie musi oznaczać listy instrukcji.

## Forth

Bo pokazuje ekstremalny minimalizm i maszynę stosową.

## Smalltalk

Bo uświadamia, ile „nowoczesnych” idei środowisk programistycznych ma pół wieku.

## ALGOL 68

Bo jest historycznie ważny, dziwny, ambitny - i w 2026 dostał drugie życie w GCC.

---

# Cztery różne filozofie rozwiązania jednego problemu

Weźmy problem:

```text
znajdź wynik
```

## FORTRAN

Myślisz:

```text
jak wykonać obliczenie?
```

## COBOL

Myślisz:

```text
jak przetworzyć biznesowe dane i rekordy?
```

## Lisp

Myślisz:

```text
jak złożyć funkcje i struktury danych?
```

## Prolog

Myślisz:

```text
jakie fakty i reguły sprawią, że odpowiedź będzie logiczną konsekwencją?
```

To świetnie pokazuje, że język programowania nie jest tylko składnią.

Jest również:

```text
modelem myślenia o problemie
```

---

# Co było przed tym wszystkim?

Jeszcze przed językami wysokiego poziomu programiści używali:

- kodu maszynowego,
- kodów symbolicznych,
- assemblerów,
- bibliotek procedur,
- systemów ładowania i linkowania.

Dlatego trzeci artykuł tej serii schodzi poziom niżej.

Zobaczymy w nim drogę:

```text
kod źródłowy
    ↓
assembler
    ↓
kod obiektowy
    ↓
linker
    ↓
program
    ↓
instrukcje CPU
```

I napiszemy prawdziwy kod asemblerowy.

---

# Wnioski

Patrząc na stare języki, łatwo śmiać się z:

```text
numerów linii
kart perforowanych
kolumn COBOL-a
nawiasów Lispa
stosowego Forth
rozwlekłości PL/I
```

Ale praktycznie każdy z tych języków rozwiązywał realny problem swojej epoki.

FORTRAN sprawił, że naukowcy nie musieli pisać wszystkiego w assemblerze.

COBOL pozwolił opisywać wielkie procesy biznesowe.

ALGOL dał językom strukturę.

BASIC otworzył programowanie dla studentów i użytkowników mikrokomputerów.

Pascal uczył całe pokolenia porządnego kodu.

Lisp pokazał, że kod może być danymi.

Smalltalk pokazał świat obiektów i interaktywnego IDE.

Prolog pokazał programowanie jako logikę.

Forth udowodnił, że cały język może być bardzo mały.

Logo pokazało, że dziecko może poznawać matematykę poprzez programowanie.

Ada postawiła bezpieczeństwo i przewidywalność programu na pierwszym miejscu.

Assembler pozwolił ludziom przestać myśleć wyłącznie w kodach liczbowych procesora.

Współczesne programowanie nie zastąpiło tych pomysłów.

W dużej mierze **zbudowało się z nich**.

---

# Powiązane materiały w TechHandbooku

Jeśli chcesz zejść bliżej sprzętu lub zobaczyć współczesne odpowiedniki tych idei:

- [C - czytanie, kompilacja i debugowanie](techhandbook:doc-019)
- [Go - czytanie kodu](techhandbook:doc-020)
- [JavaScript - kompendium](techhandbook:doc-021)
- [Node.js](techhandbook:doc-022)
- [Python - podstawy](techhandbook:doc-023)
- [Debian - shell](techhandbook:doc-027)
- [Programowanie w shellu](techhandbook:doc-031)
- [Visual Studio Code](techhandbook:doc-039)

---

# Źródła i projekty

Stan informacji o współczesnych implementacjach: wrzesień 2026.

## Fortran

- GNU Fortran: https://gcc.gnu.org/fortran/
- GCC: https://gcc.gnu.org/

## COBOL

- GnuCOBOL: https://gnucobol.sourceforge.io/
- GnuCOBOL documentation: https://gnucobol.sourceforge.io/guides.html
- GCC COBOL: https://gcc.gnu.org/onlinedocs/gcobol/

## ALGOL 68

- Algol 68 Genie: https://algol68genie.nl/
- GNU Algol 68: https://gcc.gnu.org/onlinedocs/ga68/

## BASIC

- QB64 Phoenix Edition: https://www.qb64phoenix.com/

## Pascal

- Free Pascal: https://www.freepascal.org/

## Lisp

- SBCL: https://www.sbcl.org/

## Smalltalk

- Pharo: https://pharo.org/

## Prolog

- SWI-Prolog: https://www.swi-prolog.org/

## Forth

- Gforth: https://gforth.org/

## PL/I

- Iron Spring PL/I: https://www.iron-spring.com/

## Ada

- Alire: https://alire.ada.dev/
- AdaCore: https://www.adacore.com/

---

# Dalej w serii

1. **20 współczesnych języków programowania, które warto znać**
2. **Stare języki programowania, które ukształtowały informatykę** - ten artykuł
3. **Assembler od podstaw - od rejestrów i pamięci do prawdziwego programu**
4. **Ada - język, w którym błędy mają być trudniejsze do popełnienia**
