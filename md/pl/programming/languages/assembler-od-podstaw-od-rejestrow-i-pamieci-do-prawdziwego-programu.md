---
id: "doc-060"
title: "Assembler od podstaw - od rejestrów i pamięci do prawdziwego programu"
slug: "assembler-od-podstaw-od-rejestrow-i-pamieci-do-prawdziwego-programu"
description: "Praktyczne wprowadzenie do assemblera: kod maszynowy, ISA, rejestry, pamięć, stos, flagi, adresowanie, linker i debugowanie. Główny tor opiera się na MOS 6502/6510 i Commodore 64, z porównaniem do x86-64, ARM i RISC-V."
lang: "pl"
audience: "standard"
published: "2026-09-25"
updated: "2026-09-25"
tags:
  - "assembler"
  - "assembly"
  - "6502"
  - "6510"
  - "c64"
  - "nasm"
  - "x86-64"
  - "arm"
  - "risc-v"
  - "low-level"
---

# Assembler od podstaw - od rejestrów i pamięci do prawdziwego programu

Assembler wygląda na pierwszy rzut oka jak język z innej planety:

```asm
LDA #$01
STA $0400
INX
BNE loop
```

Nie ma klas.

Nie ma obiektów.

Nie ma `npm install`.

Nie ma garbage collectora.

Nie ma nawet jednej wspólnej wersji języka.

A mimo to assembler jest jednym z najlepszych sposobów, żeby naprawdę zrozumieć:

- jak działa procesor,
- czym są rejestry,
- czym jest stos,
- jak wygląda pamięć,
- skąd biorą się adresy,
- czym naprawdę jest funkcja,
- co robi kompilator,
- co robi linker,
- czym różni się kod źródłowy od kodu maszynowego,
- dlaczego C wygląda tak, jak wygląda,
- skąd bierze się koszt wywołania funkcji,
- czym jest ABI,
- co znaczy „32-bit”, „64-bit” albo „8-bit”.

Ten materiał nie ma zrobić z Ciebie zawodowego programisty assemblera.

Ma sprawić, że kiedy zobaczysz:

```asm
mov rax, rbx
```

albo:

```asm
lda #$20
```

będziesz rozumiał, **co komputer właściwie robi**.

Głównym torem praktycznym będzie:

```text
MOS 6502 / MOS 6510 / Commodore 64
```

bo jest wystarczająco prosty, żeby zobaczyć procesor bez tysięcy szczegółów współczesnego x86-64.

Na końcu porównamy go z:

- x86-64,
- ARM,
- RISC-V.

Powiązane materiały:

- [C - czytanie, kompilacja i debugowanie](techhandbook:doc-019)
- [Debian - shell](techhandbook:doc-027)
- [Visual Studio Code](techhandbook:doc-039)
- [GitHub](techhandbook:doc-014)
- [20 współczesnych języków programowania, które warto znać](techhandbook:doc-058)
- [Stare języki programowania, które ukształtowały informatykę](techhandbook:doc-059)

---

# Najpierw jedna ważna rzecz: assembler czy assembly?

W codziennej polszczyźnie często mówi się:

> programuję w assemblerze

i wszyscy wiedzą, o co chodzi.

Technicznie warto jednak rozróżnić dwie rzeczy.

## Assembly language

To **język asemblera** - symboliczny zapis instrukcji procesora.

Przykład:

```asm
LDA #$01
```

## Assembler

To program tłumaczący zapis tekstowy na kod maszynowy.

Przykłady assemblerów:

```text
ca65
NASM
GNU as
MASM
64tass
DASM
```

Czyli:

```text
assembly source
      |
      v
 assembler
      |
      v
machine code
```

W tym artykule będziemy używać potocznego słowa „assembler” również na określenie samego języka, ale dobrze wiedzieć, co technicznie oznacza.

---

# Nie istnieje jeden assembler

To najważniejsza różnica względem Pythona, Javy czy Go.

Kod:

```asm
LDA #$10
```

ma sens dla procesorów z rodziny 6502.

Kod:

```asm
mov rax, 10
```

jest charakterystyczny dla x86-64.

Kod:

```asm
mov x0, #10
```

może pojawić się w AArch64.

Kod:

```asm
li a0, 10
```

jest typowy dla RISC-V.

Każda architektura ma własny:

```text
Instruction Set Architecture
```

czyli:

```text
ISA
```

ISA definiuje między innymi:

- jakie instrukcje rozumie procesor,
- jakie posiada rejestry,
- jak adresuje pamięć,
- jak reprezentowane są instrukcje,
- jakie typy operacji potrafi wykonywać.

---

# ISA - umowa między programem a procesorem

Wyobraź sobie procesor jako maszynę, która zna określony zestaw poleceń.

Przykładowy hipotetyczny procesor mógłby znać:

```text
LOAD
STORE
ADD
SUB
JUMP
COMPARE
```

Program:

```asm
LOAD A, 10
LOAD B, 20
ADD A, B
```

jest jedynie wygodnym zapisem dla człowieka.

Procesor nie czyta słowa:

```text
ADD
```

Procesor widzi liczby.

Na przykład hipotetycznie:

```text
00010010 00000001 00000010
```

Assembler wykonuje więc tłumaczenie:

```text
ADD A, B
```

na odpowiedni ciąg bitów.

---

# Kod maszynowy

Kod maszynowy jest bezpośrednio wykonywany przez CPU.

Jeżeli instrukcja 6502:

```asm
LDA #$01
```

zostanie zakodowana jako:

```text
A9 01
```

to:

```text
A9
```

jest kodem operacji:

```text
LDA immediate
```

a:

```text
01
```

jest argumentem.

W pamięci mamy więc dwa bajty:

```text
A9 01
```

Procesor:

1. pobiera `A9`,
2. rozpoznaje instrukcję,
3. pobiera kolejny bajt,
4. wykonuje operację.

---

# Hexadecymalny zapis liczb

W assemblerze bardzo często używa się systemu szesnastkowego.

Zamiast:

```text
0
1
2
...
9
10
11
```

mamy:

```text
0
1
2
...
9
A
B
C
D
E
F
10
```

Jedna cyfra hex reprezentuje dokładnie:

```text
4 bity
```

Dwie cyfry:

```text
8 bitów = 1 bajt
```

Przykład:

```text
$00 = 0
$01 = 1
$0A = 10
$10 = 16
$FF = 255
```

W dokumentacji 6502 często używa się:

```text
$FF
```

W C:

```c
0xFF
```

W NASM:

```asm
0xFF
```

To ta sama wartość.

---

# Bity i bajty

Bit może mieć wartość:

```text
0
```

albo:

```text
1
```

Osiem bitów tworzy bajt:

```text
10110100
```

Zakres bajtu bez znaku:

```text
0..255
```

czyli:

```text
$00..$FF
```

Procesor 6502 jest nazywany procesorem 8-bitowym między innymi dlatego, że jego podstawowy akumulator i główne operacje danych mają szerokość 8 bitów.

Nie oznacza to, że potrafi zaadresować tylko 256 bajtów.

Ma 16-bitową przestrzeń adresową:

```text
$0000..$FFFF
```

czyli:

```text
65536 bajtów = 64 KiB
```

---

# Co właściwie robi CPU?

W ogromnym uproszczeniu:

```text
pobierz instrukcję
      |
      v
zdekoduj instrukcję
      |
      v
wykonaj instrukcję
      |
      v
pobierz następną
```

To cykl:

```text
fetch -> decode -> execute
```

W środku procesora znajdują się między innymi:

- rejestry,
- jednostka arytmetyczno-logiczna,
- dekoder instrukcji,
- logika sterująca.

---

# Rejestry - najszybsza pamięć procesora

Rejestr jest małym miejscem przechowywania danych bezpośrednio wewnątrz CPU.

Nie myl go z RAM-em.

RAM jest osobnym obszarem pamięci.

Rejestr:

```text
CPU
┌────────────────────┐
│ register A         │
│ register X         │
│ register Y         │
│ program counter    │
│ stack pointer      │
└────────────────────┘
```

RAM:

```text
CPU <----> RAM
```

Dostęp do rejestru jest fundamentalnie inną operacją niż odczyt pamięci.

---

# MOS 6502 i MOS 6510

Klasyczny MOS 6502 był jednym z najważniejszych procesorów ery 8-bitowej.

Rodzina trafiła między innymi do:

- Apple II,
- Atari 2600 - wariant 6507,
- komputerów Atari 8-bit,
- BBC Micro,
- NES - pochodny procesor,
- wielu systemów embedded.

Commodore 64 używa procesora:

```text
MOS 6510
```

6510 jest bliskim krewnym 6502.

Najważniejszym dodatkiem jest wbudowany port I/O wykorzystywany przez C64 między innymi do sterowania mapowaniem pamięci.

Do nauki instrukcji możemy myśleć o nim praktycznie jak o:

```text
6502 + kilka cech specyficznych C64
```

---

# Rejestry 6502

6502 ma zaskakująco mało rejestrów.

To jedna z rzeczy, dzięki którym świetnie nadaje się do nauki.

## A - accumulator

```text
A
```

Główny rejestr danych.

Wiele operacji działa właśnie na nim.

Przykład:

```asm
LDA #10
```

oznacza:

```text
Load Accumulator
```

czyli:

```text
A = 10
```

---

# X

Rejestr indeksowy:

```text
X
```

Przydaje się między innymi do:

- indeksowania tablic,
- liczników,
- pętli.

Przykład:

```asm
LDX #0
```

---

# Y

Drugi rejestr indeksowy:

```text
Y
```

Podobny w zastosowaniach do X, choć zestaw dostępnych instrukcji nie jest identyczny.

---

# PC - Program Counter

```text
PC
```

to licznik programu.

Przechowuje adres następnej instrukcji.

Jeżeli:

```text
PC = $C000
```

procesor pobiera instrukcję spod adresu:

```text
$C000
```

Po wykonaniu przechodzi dalej.

Instrukcja skoku zmienia PC.

Przykład:

```asm
JMP $C100
```

oznacza w praktyce:

```text
PC = $C100
```

---

# SP - Stack Pointer

```text
SP
```

wskazuje pozycję stosu.

W 6502 stos znajduje się zawsze w stronie pamięci:

```text
$0100..$01FF
```

SP jest 8-bitowy.

Jeżeli:

```text
SP = $FD
```

to bieżąca pozycja stosu znajduje się w okolicy:

```text
$01FD
```

---

# P - Processor Status

Rejestr statusu zawiera flagi.

Najważniejsze z nich:

```text
N - Negative
V - Overflow
B - Break
D - Decimal
I - Interrupt Disable
Z - Zero
C - Carry
```

Można spotkać zapis:

```text
NV-BDIZC
```

Każda flaga jest pojedynczym bitem.

---

# Flaga Zero

Jeżeli wynik operacji wynosi zero:

```text
Z = 1
```

Przykład:

```asm
LDA #0
```

ustawi flagę Zero.

Możemy potem zrobić:

```asm
BEQ somewhere
```

czyli:

```text
Branch if Equal
```

W praktyce instrukcja sprawdza flagę Z.

---

# Flaga Carry

Carry jest wykorzystywana między innymi przy:

- dodawaniu,
- odejmowaniu,
- przesunięciach bitowych,
- liczbach większych niż jeden bajt.

Przykład:

```asm
CLC
LDA #200
ADC #100
```

Matematycznie:

```text
200 + 100 = 300
```

Ale 8-bitowy rejestr mieści maksymalnie:

```text
255
```

Wynik w A „zawinie się”, a dodatkowy bit informacji znajdzie się w Carry.

---

# Pamięć

Dla CPU pamięć jest zasadniczo dużą tablicą bajtów.

Wyobraź sobie:

```text
adres     wartość

$0000     $12
$0001     $A0
$0002     $FF
$0003     $00
...
```

Instrukcja:

```asm
LDA $2000
```

oznacza:

```text
weź bajt spod adresu $2000
i włóż go do A
```

Instrukcja:

```asm
STA $2000
```

oznacza:

```text
zapisz zawartość A pod adresem $2000
```

---

# Natychmiastowa wartość kontra adres

To jedna z pierwszych rzeczy, która myli początkujących.

## Immediate

```asm
LDA #$10
```

oznacza:

```text
A = $10
```

Znak:

```text
#
```

oznacza wartość bezpośrednią.

## Absolute

```asm
LDA $0010
```

oznacza:

```text
A = zawartość pamięci pod adresem $0010
```

To ogromna różnica.

```text
#$10
```

to liczba.

```text
$0010
```

to adres.

---

# Adresowanie

6502 posiada kilka trybów adresowania.

Nie trzeba zapamiętywać ich wszystkich od razu.

Najważniejsze:

## Immediate

```asm
LDA #$20
```

Wartość jest częścią instrukcji.

## Zero page

```asm
LDA $20
```

Adres z zakresu:

```text
$0000..$00FF
```

6502 posiada specjalne krótsze i często szybsze instrukcje dla tego obszaru.

## Absolute

```asm
LDA $2000
```

Pełny 16-bitowy adres.

## Indexed X

```asm
LDA table,X
```

Adres:

```text
table + X
```

Idealne do tablic.

## Indexed Y

```asm
LDA table,Y
```

## Indirect

Adres jest pobierany z pamięci.

To coś zbliżonego do wskaźnika.

---

# Zero page

Adresy:

```text
$0000..$00FF
```

tworzą:

```text
zero page
```

Dla 6502 ten obszar jest szczególnie ważny.

Można traktować go trochę jak zestaw bardzo szybkich pseudo-rejestrów.

Przykład:

```asm
LDA $10
```

może być krótsze niż:

```asm
LDA $2010
```

W starych programach 6502 zero page była cennym zasobem.

---

# Stos

Stos działa według zasady:

```text
Last In, First Out
```

czyli:

```text
LIFO
```

Wyobraź sobie stos talerzy.

Kładziesz:

```text
A
B
C
```

Zdejmujesz:

```text
C
B
A
```

## Push

6502:

```asm
PHA
```

czyli:

```text
Push Accumulator```

## Pull

```asm
PLA
```

czyli:

```text
Pull Accumulator
```

Przykład:

```asm
LDA #10
PHA

LDA #20

PLA
```

Po `PLA` A ponownie będzie zawierać:

```text
10
```

---

# Po co stos?

Między innymi do:

- zapisywania tymczasowych wartości,
- obsługi podprogramów,
- obsługi przerwań.

Instrukcja:

```asm
JSR subroutine
```

musi gdzieś zapamiętać:

```text
dokąd wrócić
```

Adres powrotu trafia na stos.

Potem:

```asm
RTS
```

go odczytuje.

---

# Funkcja w assemblerze nie jest magią

W C:

```c
foo();
```

wygląda jak jedna operacja.

Pod spodem trzeba jednak:

1. przygotować argumenty,
2. zapamiętać miejsce powrotu,
3. przejść do innego fragmentu kodu,
4. wykonać funkcję,
5. wrócić,
6. odzyskać wynik.

Na 6502 podstawowy mechanizm wygląda tak:

```asm
JSR foo
```

a funkcja kończy się:

```asm
RTS
```

Przykład:

```asm
        JSR clear_screen
        JSR draw_player
        JSR update_score
```

To bardzo bezpośrednia forma wywołań funkcji.

---

# Etykiety

Zamiast pisać:

```asm
JMP $C042
```

możemy nadać adresowi nazwę:

```asm
JMP game_loop
```

A potem:

```asm
game_loop:
    ...
```

Assembler podczas budowania programu wyliczy właściwy adres.

To właśnie jedna z podstawowych rzeczy, które odróżniły assembler od ręcznego kodu maszynowego.

---

# Pętla

Przykład 6502:

```asm
        LDX #0

loop:
        INX
        CPX #10
        BNE loop
```

Znaczenie:

```text
X = 0

loop:
    X = X + 1

    porównaj X z 10

    jeśli nie są równe:
        wróć do loop
```

To dokładnie ta sama logika, którą w C zapisalibyśmy:

```c
for (int x = 0; x < 10; x++) {
}
```

---

# Porównania na 6502

Instrukcja:

```asm
CMP
```

porównuje akumulator z wartością.

Przykład:

```asm
LDA score
CMP #10
BEQ player_won
```

CPU nie tworzy magicznej wartości:

```text
true
```

Ustawia flagi.

Potem:

```asm
BEQ
BNE
BCC
BCS
BMI
BPL
```

sprawdzają te flagi.

To pokazuje, skąd w językach wysokiego poziomu biorą się instrukcje:

```text
if
while
for
```

Procesor ich nie zna.

Kompilator buduje je ze skoków i porównań.

---

# Dodawanie

Na 6502:

```asm
CLC
LDA #10
ADC #20
```

Po wykonaniu:

```text
A = 30
```

`CLC` oznacza:

```text
Clear Carry
```

Dlaczego jest potrzebne?

Bo `ADC` wykonuje:

```text
A + wartość + Carry
```

Jeżeli Carry zostało po poprzedniej operacji ustawione, wynik mógłby być większy o 1.

---

# Odejmowanie

```asm
SEC
LDA #30
SBC #10
```

`SEC` oznacza:

```text
Set Carry
```

W 6502 semantyka Carry przy odejmowaniu jest trochę nieintuicyjna dla początkujących.

Dlatego typowy schemat zaczyna się od:

```asm
SEC
```

---

# Liczby większe niż 255

6502 jest 8-bitowy, ale oczywiście może liczyć większe wartości.

Trzeba tylko podzielić liczbę na bajty.

Na przykład liczba 16-bitowa:

```text
$1234
```

składa się z:

```text
high byte = $12
low byte  = $34
```

Dodawanie dwóch 16-bitowych liczb wykonujemy na dwóch bajtach, przenosząc Carry.

Przykład ideowy:

```asm
CLC

LDA a_low
ADC b_low
STA result_low

LDA a_high
ADC b_high
STA result_high
```

Carry z pierwszego dodawania trafia do drugiego.

W języku C piszesz:

```c
uint16_t c = a + b;
```

Kompilator wykonuje podobną pracę za Ciebie.

---

# Little endian

6502 zapisuje wartości wielobajtowe w kolejności:

```text
low byte
high byte
```

To:

```text
little endian
```

Liczba:

```text
$1234
```

w pamięci może wyglądać:

```text
adres $2000 -> $34
adres $2001 -> $12
```

x86 również jest little endian.

To między innymi dlatego czytając dump pamięci trzeba uważać na kolejność bajtów.

---

# Commodore 64 - mapa pamięci

C64 jest kapitalnym komputerem do nauki assemblera, bo sprzęt jest stosunkowo prosty i bardzo dobrze udokumentowany.

Procesor widzi przestrzeń:

```text
$0000..$FFFF
```

czyli 64 KiB adresów.

Najważniejsze obszary:

| Adres | Znaczenie |
|---|---|
| `$0000-$00FF` | zero page |
| `$0100-$01FF` | stos CPU |
| `$0400-$07E7` | domyślna pamięć ekranu tekstowego |
| `$0801...` | typowy początek programu BASIC |
| `$A000-$BFFF` | BASIC ROM, zależnie od mapowania |
| `$D000-$DFFF` | I/O / character ROM, zależnie od mapowania |
| `$D800-$DBE7` | pamięć kolorów |
| `$E000-$FFFF` | KERNAL ROM, zależnie od mapowania |

To mapa uproszczona.

C64 potrafi przełączać widoczność RAM-u, ROM-u i I/O.

---

# Ekran tekstowy C64

Domyślna pamięć znaków zaczyna się pod:

```text
$0400
```

Każda komórka odpowiada jednej pozycji na ekranie.

40 kolumn:

```text
40
```

25 wierszy:

```text
25
```

Razem:

```text
1000 znaków
```

Jeżeli zapiszesz odpowiedni kod ekranu pod:

```text
$0400
```

zmienisz znak w lewym górnym rogu.

Przykład:

```asm
LDA #1
STA $0400
```

Przy standardowym zestawie znaków kod ekranowy `1` odpowiada literze `A`.

To jest jedna z najpiękniejszych rzeczy w starym sprzęcie:

```text
zapis do pamięci
=
zmiana obrazu
```

Bez:

```text
DOM
Canvas
OpenGL
DirectX
browser API
```

---

# Pamięć koloru

Kolor znaków znajduje się osobno:

```text
$D800...
```

Przykład:

```asm
LDA #2
STA $D800
```

zmienia kolor pierwszej komórki.

Numer koloru zależy od palety C64.

Możemy więc:

```asm
LDA #1
STA $0400

LDA #2
STA $D800
```

i jednocześnie ustawić:

```text
znak
+
kolor
```

---

# Rejestry sprzętowe

W starych komputerach sprzętem często steruje się przez pamięć.

To:

```text
memory-mapped I/O
```

Przykładowo rejestry układu VIC-II znajdują się w przestrzeni:

```text
$D000...
```

Zmiana odpowiedniego bajtu może:

- przesunąć sprite,
- zmienić kolor tła,
- ustawić tryb grafiki,
- zmienić raster.

Dla procesora instrukcja:

```asm
STA $D020
```

jest po prostu zapisem do adresu.

Ale sprzęt interpretuje ten adres jako:

```text
rejestr koloru ramki
```

---

# Zmiana koloru ramki C64

Jedno z najprostszych doświadczeń.

```asm
        LDA #2
        STA $D020
```

Adres:

```text
$D020
```

to kolor ramki.

```text
2
```

oznacza czerwony w standardowej palecie C64.

Dwie instrukcje i fizyczny wygląd ekranu się zmienia.

---

# KERNAL - gotowe funkcje w ROM-ie

Nie wszystko trzeba robić ręcznie.

C64 ma ROM zawierający zestaw procedur systemowych.

Jedną z najbardziej znanych jest:

```text
CHROUT
```

pod adresem:

```text
$FFD2
```

Jeżeli umieścimy znak w A:

```asm
LDA #'A'
```

i wykonamy:

```asm
JSR $FFD2
```

KERNAL wypisze znak.

To odpowiednik bardzo prymitywnego systemowego API.

---

# Nasz toolchain 6502/C64

Użyjemy:

```text
cc65
```

Nie dlatego, że chcemy pisać C.

Pakiet cc65 zawiera cały zestaw narzędzi:

```text
cc65   - kompilator C
ca65   - assembler 6502
ld65   - linker
cl65   - program spinający build
da65   - disassembler
sim65  - simulator
```

Dla naszego artykułu najważniejsze są:

```text
ca65
ld65
cl65
```

---

# Instalacja cc65 - Windows

Projekt cc65 publikuje buildy dla Windows.

Strona projektu:

https://cc65.github.io/

Repozytorium:

https://github.com/cc65/cc65

Po instalacji lub rozpakowaniu narzędzi katalog `bin` dodajemy do:

```text
PATH
```

Sprawdzenie:

```powershell
ca65 --version
cl65 --version
```

---

# Instalacja cc65 - macOS

Homebrew:

```bash
brew install cc65
```

Sprawdzenie:

```bash
ca65 --version
cl65 --version
```

---

# Instalacja cc65 - Linux / Debian

```bash
sudo apt update
sudo apt install cc65
```

Sprawdzenie:

```bash
ca65 --version
cl65 --version
```

Pakiet zawiera pełny zestaw cross-development dla systemów 6502, w tym target C64.

---

# Emulator C64 - VICE

Nie potrzebujemy prawdziwego C64.

Do uruchamiania użyjemy:

```text
VICE
```

VICE emuluje między innymi:

- C64,
- C128,
- VIC-20,
- PET,
- Plus/4.

---

# VICE - Windows

Aktualne buildy znajdziesz na stronie projektu:

https://vice-emu.sourceforge.io/

Po instalacji interesuje nas przede wszystkim emulator C64:

```text
x64sc
```

---

# VICE - macOS

Homebrew:

```bash
brew install vice
```

Sprawdzenie:

```bash
x64sc --version
```

---

# VICE - Debian

VICE znajduje się w sekcji:

```text
contrib
```

repozytorium Debiana.

Po włączeniu `contrib`:

```bash
sudo apt update
sudo apt install vice
```

Sprawdzenie:

```bash
x64sc --version
```

W zależności od sposobu instalacji emulator może wymagać dostępnych legalnie obrazów ROM.

---

# VS Code

Assembler świetnie pisze się w zwykłym edytorze.

Możesz używać:

- VS Code,
- Vim,
- Neovim,
- Micro,
- dowolnego edytora tekstowego.

Pełny materiał:

[Visual Studio Code](techhandbook:doc-039)

Najważniejsze rzeczy:

- syntax highlighting,
- terminal,
- możliwość uruchamiania buildów,
- wygodne przełączanie między źródłem a debugerem.

Nie potrzebujesz rozbudowanego IDE.

---

# Pierwszy prawdziwy program C64

Utwórz:

```text
hello.s
```

Kod:

```asm
        .segment "CODE"

start:
        ldx #0

loop:
        lda message,x
        beq done

        jsr $ffd2

        inx
        bne loop

done:
        rts

message:
        .byte "HELLO FROM 6502!", 13, 0
```

---

# Co ten kod robi?

## Segment

```asm
.segment "CODE"
```

informuje assembler i linker, że kolejne dane należą do segmentu kodu.

## X = 0

```asm
LDX #0
```

X będzie indeksem tekstu.

## Pobieranie znaku

```asm
LDA message,X
```

Czyli:

```text
A = message[X]
```

## Koniec tekstu

Tekst kończymy bajtem:

```text
0
```

Po `LDA` procesor ustawia flagę Z, jeśli załadowana wartość jest zerem.

Dlatego:

```asm
BEQ done
```

kończy pętlę.

## Wypisanie

```asm
JSR $FFD2
```

wywołuje KERNAL `CHROUT`.

## Następny znak

```asm
INX
```

czyli:

```text
X++
```

## Pętla

```asm
BNE loop
```

Ponieważ X jest 8-bitowy, po 255 przepełni się do zera.

Dla krótkiego tekstu nie ma to znaczenia.

---

# Budowanie programu C64

cc65 posiada specjalną konfigurację dla programów assemblerowych C64:

```text
c64-asm.cfg
```

Możemy użyć:

```bash
cl65 \
  -o hello.prg \
  -u __EXEHDR__ \
  -t c64 \
  -C c64-asm.cfg \
  hello.s
```

Opcja:

```text
-u __EXEHDR__
```

dodaje mały nagłówek BASIC.

Dzięki temu po załadowaniu programu można wykonać:

```basic
RUN
```

zamiast ręcznie wpisywać adres `SYS`.

---

# Uruchomienie w VICE

```bash
x64sc -autostart hello.prg
```

VICE:

1. uruchomi C64,
2. załaduje plik PRG,
3. wystartuje program.

To już jest pełny cykl:

```text
source
  ↓
assembler
  ↓
object code
  ↓
linker
  ↓
PRG
  ↓
emulator
  ↓
MOS 6510
```

---

# ca65 i ld65 osobno

`cl65` robi kilka kroków automatycznie.

Warto jednak wiedzieć, co jest pod spodem.

## Assembler

```bash
ca65 -t c64 hello.s -o hello.o
```

Powstaje:

```text
hello.o
```

To nie jest jeszcze gotowy program C64.
## Linker

Linker:

```text
ld65
```

łączy:

- segmenty,
- symbole,
- biblioteki,
- adresy.

Do praktycznej pracy na C64 konfiguracja linkera ma ogromne znaczenie.

Dlatego na początku wygodniej używać:

```bash
cl65
```

---

# Co robi linker?

Wyobraź sobie dwa pliki.

`main.s`:

```asm
.import print_message

JSR print_message
```

`print.s`:

```asm
.export print_message

print_message:
    ...
    RTS
```

Assembler przetwarza je oddzielnie.

W `main.o` jeszcze nie musi być znany finalny adres:

```text
print_message
```

Linker:

1. łączy moduły,
2. przydziela adresy,
3. rozwiązuje symbole,
4. poprawia odwołania.

To dokładnie ten sam mechanizm, który spotkasz później w C i C++.

---

# Symbole

Assembler pozwala definiować nazwy:

```asm
SCREEN = $0400
BORDER = $D020
CHROUT = $FFD2
```

Dzięki temu:

```asm
STA BORDER
```

jest czytelniejsze niż:

```asm
STA $D020
```

Program:

```asm
SCREEN = $0400
COLOR  = $D800

LDA #1
STA SCREEN

LDA #2
STA COLOR
```

jest prawie samodokumentujący.

---

# Stałe kontra dane

Stała assemblera:

```asm
BORDER = $D020
```

nie zajmuje pamięci programu jako zmienna.

To po prostu symbol zastępowany podczas składania.

Zmienna:

```asm
counter:
    .byte 0
```

faktycznie tworzy bajt w danych programu.

---

# Tablica

```asm
numbers:
    .byte 1, 2, 3, 4, 5
```

Możemy czytać:

```asm
LDX #0
LDA numbers,X
```

Potem:

```asm
INX
```

i pobrać następny element.

---

# Kopiowanie tablicy

```asm
        ldx #0

loop:
        lda source,x
        sta destination,x

        inx
        cpx #10
        bne loop
```

Odpowiednik C:

```c
for (int x = 0; x < 10; x++) {
    destination[x] = source[x];
}
```

To bardzo dobry moment, żeby zobaczyć jak blisko C stoi assemblera.

---

# Wskaźniki

W C:

```c
char *ptr;
```

W assemblerze nie istnieje specjalny magiczny typ:

```text
pointer
```

Adres jest po prostu liczbą.

Na 6502 typowy wskaźnik 16-bitowy możemy przechowywać w dwóch bajtach zero page:

```asm
ptr:
    .word $0000
```

Potem używać adresowania pośredniego.

Przykład:

```asm
LDA (ptr),Y
```

Znaczenie ideowe:

```text
A = memory[ptr + Y]
```

To bardzo bliski odpowiednik:

```c
ptr[y]
```

---

# Dlaczego C i assembler są tak blisko?

C powstał jako język do pisania systemów.

Dlatego konstrukcje takie jak:

```c
*p
```

```c
p++
```

```c
array[i]
```

```c
uint8_t
```

```c
uint16_t
```

mają bardzo naturalne odpowiedniki niskopoziomowe.

Jeżeli assembler zacznie być czytelny, wiele elementów C nagle przestaje wyglądać dziwnie.

Zobacz:

[C - czytanie, kompilacja i debugowanie](techhandbook:doc-019)

---

# Mini-projekt: wypełniamy ekran

Domyślna pamięć ekranu:

```text
$0400
```

Chcemy wypełnić pierwsze 256 znaków literą A.

```asm
SCREEN = $0400

        .segment "CODE"

start:
        ldx #0
        lda #1

loop:
        sta SCREEN,x
        inx
        bne loop

        rts
```

Dlaczego pętla wykona się dokładnie 256 razy?

X jest 8-bitowy.

Kolejne wartości:

```text
0
1
2
...
254
255
0
```

Po przejściu:

```text
255 -> 0
```

flaga Zero zostanie ustawiona.

```asm
BNE loop
```

nie wykona skoku.

To piękny przykład wykorzystania zachowania procesora zamiast osobnego licznika.

---

# Czyszczenie całego ekranu

Ekran ma:

```text
1000
```

komórek.

Nie zmieści się więc w jednej 8-bitowej pętli.

Możemy czyścić go blokami:

```asm
SCREEN = $0400

        .segment "CODE"

start:
        lda #32
        ldx #0

loop:
        sta SCREEN,x
        sta SCREEN+$0100,x
        sta SCREEN+$0200,x

        inx
        bne loop

        ldx #0

last:
        sta SCREEN+$0300,x

        inx
        cpx #232
        bne last

        rts
```

Dlaczego:

```text
232
```

Bo:

```text
1000 - 768 = 232
```

Pierwsza pętla czyści:

```text
3 * 256 = 768
```

komórek.

Druga:

```text
232
```

Razem:

```text
1000
```

---

# Makra

Assembler może posiadać system makr.

ca65 pozwala napisać:

```asm
.macro set_border color
    lda #color
    sta $d020
.endmacro
```

Potem:

```asm
set_border 2
```

Assembler rozwinie makro podczas budowania.

To nie jest funkcja wykonywana przez CPU.

To transformacja kodu przed utworzeniem kodu maszynowego.

---

# Dyrektywy assemblera

Linia:

```asm
.byte 1, 2, 3
```

nie jest instrukcją CPU.

To polecenie dla assemblera:

> umieść te bajty w wyniku.

Podobnie:

```asm
.word $1234
```

```asm
.segment "CODE"
```

```asm
.import foo
```

```asm
.export bar
```

To:

```text
assembler directives
```

CPU nigdy ich nie widzi.

---

# Instrukcja CPU kontra dyrektywa

Instrukcja:

```asm
LDA #1
```

zamieni się na kod maszynowy wykonywany przez procesor.

Dyrektywa:

```asm
.byte 1
```

mówi assemblerowi, żeby umieścił bajt w pliku.

To fundamentalna różnica.

---

# Pseudo-instrukcje

Niektóre assemblery oferują zapis wyglądający jak instrukcja procesora, ale tak naprawdę składający się z jednej lub wielu prawdziwych instrukcji.

To:

```text
pseudo-instruction
```

Jest to szczególnie częste w RISC-V.

Na przykład:

```asm
li a0, 100
```

może zostać zamienione przez assembler na odpowiednią sekwencję instrukcji zależnie od wartości.

---

# Przerwania

Normalnie CPU wykonuje:

```text
instrukcja
instrukcja
instrukcja
instrukcja
```

Ale czasem sprzęt mówi:

> potrzebuję uwagi teraz

To:

```text
interrupt
```

Procesor:

1. kończy bieżącą instrukcję,
2. zapisuje potrzebny stan,
3. przechodzi do procedury przerwania,
4. obsługuje zdarzenie,
5. wraca.

Przerwania mogą obsługiwać między innymi:

- timer,
- klawiaturę,
- kartę sieciową,
- układ graficzny,
- kontroler dysku.

---

# Raster interrupt na C64

VIC-II rysuje ekran linia po linii.

Programista może skonfigurować przerwanie w określonej linii rastra.

Dzięki temu można np.:

- zmieniać kolor w trakcie rysowania ekranu,
- multipleksować sprite'y,
- synchronizować animację,
- wykonywać efekty demoscenowe.

To już zaawansowany temat.

Ale warto zrozumieć ideę:

```text
sprzęt
    |
    v
interrupt
    |
    v
nasz kod
```

---

# Cykl zegara

Stare procesory są świetne do nauki wydajności, bo koszt instrukcji jest bardzo namacalny.

Instrukcja może kosztować np.:

```text
2 cykle
3 cykle
4 cykle
```

Przy kodzie synchronizowanym z rasterem różnica jednego cyklu może mieć znaczenie.

Współczesny x86 jest dużo bardziej złożony:

- pipeline,
- cache,
- out-of-order execution,
- branch prediction,
- superscalar execution.

Na 6502 związek między instrukcją a czasem jest znacznie łatwiejszy do obserwowania.

---

# Samomodyfikujący się kod

Ponieważ program jest zapisany w pamięci, program może teoretycznie zmieniać własne instrukcje.

Przykład ideowy:

```text
zmień operand instrukcji LDA
```

Takie techniki były wykorzystywane w starych systemach dla wydajności.

Dziś samomodyfikujący się kod jest dużo rzadszy w normalnych aplikacjach, między innymi z powodów:

- bezpieczeństwa,
- ochrony pamięci,
- cache procesora,
- czytelności.

Ale warto wiedzieć, że kod też jest po prostu danymi w pamięci.

---

# Kod i dane

Dla procesora bajt:

```text
$A9
```

sam w sobie nie „jest instrukcją”.

Staje się instrukcją, jeśli Program Counter wskaże go jako początek instrukcji.

Ten sam bajt może być:

```text
liczbą
znakiem
kolorem
fragmentem instrukcji
częścią adresu
pikselem
```

Znaczenie nadaje kontekst.

---

# Disassembler

Assembler robi:

```text
assembly -> machine code
```

Disassembler próbuje zrobić odwrotnie:

```text
machine code -> assembly
```

W cc65 znajdziemy:

```text
da65
```

W NASM:

```text
ndisasm
```

W GNU binutils:

```text
objdump
```

Przykład:

```bash
objdump -d program
```

To jedno z podstawowych narzędzi reverse engineeringu.

---

# Debugger

Debugger pozwala:

- zatrzymać CPU,
- wykonać jedną instrukcję,
- sprawdzić rejestry,
- obejrzeć pamięć,
- ustawić breakpoint.

W assemblerze debugger jest szczególnie wartościowy.

Na wysokim poziomie patrzysz:

```text
zmienna x
```

Na niskim poziomie:

```text
RAX
RSP
memory[0x7fff...]
flags
```

---

# Monitor VICE

VICE posiada wbudowany monitor.

To debugger świata C64.

Pozwala między innymi:

- oglądać pamięć,
- disassemblować,
- ustawiać breakpointy,
- sprawdzać rejestry,
- zmieniać pamięć.

To idealne narzędzie do nauki.

W emulatorze można wejść do monitora i zobaczyć coś w rodzaju:

```text
A:00 X:00 Y:00 SP:F6
```

Nagle abstrakcyjne rejestry stają się czymś realnym.

---

# Symbole debugowe cc65

cc65 potrafi generować informacje debugowe.

Przy większym projekcie warto budować np. z opcją:

```bash
-g
```

Dzięki symbolom debugger może pokazywać nazwy zamiast samych surowych adresów.

---

# Drugi świat: x86-64

6502 jest prosty.

Procesor w Twoim współczesnym PC jest zupełnie inną bestią.

Najpopularniejsza architektura komputerów PC:

```text
x86-64
```

nazywana również:

```text
AMD64
```

Intel używa też nazwy:

```text
Intel 64
```

---

# x86-64 ma dużo większe rejestry

Przykłady:

```text
RAX
RBX
RCX
RDX
RSI
RDI
RSP
RBP
R8
R9
...
R15
```

Typowy rejestr ogólnego przeznaczenia ma:

```text
64 bity
```

czyli:

```text
8 bajtów
```

To ogromna różnica względem 8-bitowego A w 6502.

---

# RAX i jego fragmenty

Historyczne dziedzictwo x86 sprawia, że jeden rejestr ma kilka nazw.

```text
RAX - 64 bity
EAX - dolne 32 bity
AX  - dolne 16 bitów
AL  - dolne 8 bitów
AH  - kolejne 8 bitów historycznego AX
```

Czyli:

```text
RAX
┌────────────────────────────────────────────────────────────────┐
│                            64 bity                             │
└────────────────────────────────────────────────────────────────┘
                                └──────── EAX ───────────────────┘
                                                  └── AX ───────┘
                                                       AL / AH
```

To jeden z przykładów historycznego balastu architektury x86.

---

# Instalacja NASM - Windows

NASM:

```text
Netwide Assembler
```

to bardzo popularny assembler x86/x86-64.

Oficjalna strona:

https://www.nasm.us/

Pobieramy installer lub archiwum dla Windows.

Po dodaniu do PATH:

```powershell
nasm -v
```

---

# NASM - macOS

```bash
brew install nasm
```

Sprawdzenie:

```bash
nasm -v
```

---

# NASM - Debian

```bash
sudo apt update
sudo apt install nasm
```

Sprawdzenie:

```bash
nasm -v
```

---

# x86-64: Hello World na Linuxie

Linux pozwala programowi komunikować się z kernelem przez:

```text
system calls
```

Przykład NASM:

```asm
section .data
    message db "Hello from x86-64!", 10
    message_len equ $ - message

section .text
    global _start

_start:
    mov rax, 1
    mov rdi, 1
    mov rsi, message
    mov rdx, message_len
    syscall

    mov rax, 60
    xor rdi, rdi
    syscall
```

---

# Co oznaczają liczby?

Dla Linux x86-64:

```text
rax = 1
```

oznacza syscall:

```text
write
```

Argumenty:

```text
rdi = file descriptor
rsi = adres danych
rdx = długość
```

Czyli:

```asm
mov rdi, 1
```

oznacza:

```text
stdout
```

Potem:

```asm
syscall
```

prosi kernel o wykonanie operacji.

---

# Kompilacja x86-64 Linux

Assembler:

```bash
nasm -f elf64 hello.asm -o hello.o
```

Linker:

```bash
ld hello.o -o hello
```

Uruchomienie:

```bash./hello
```

Mamy więc dokładnie ten sam model co wcześniej:

```text
hello.asm
    |
    v
NASM
    |
    v
hello.o
    |
    v
ld
    |
    v
hello
```

---

# Dlaczego ten sam kod nie działa na Windows?

Bo assembler zależy nie tylko od CPU.

Zależy również od:

```text
systemu operacyjnego
ABI
formatu pliku wykonywalnego
API systemowego
```

Linux x86-64 używa między innymi:

```text
ELF
syscall ABI Linux
```

Windows używa:

```text
PE/COFF
Windows x64 ABI
WinAPI
```

Procesor może być ten sam.

Środowisko programu jest inne.

---

# ABI

ABI oznacza:

```text
Application Binary Interface
```

Określa między innymi:

- gdzie przekazuje się argumenty,
- gdzie zwracany jest wynik,
- które rejestry funkcja musi zachować,
- jak wygląda stos,
- jak program komunikuje się z systemem.

Na Linux x86-64 typowe argumenty funkcji trafiają kolejno do:

```text
RDI
RSI
RDX
RCX
R8
R9
```

Na Windows x64 pierwsze argumenty trafiają do:

```text
RCX
RDX
R8
R9
```

Ten sam procesor.

Inne ABI.

---

# Calling convention

Wyobraź sobie funkcję C:

```c
int add(int a, int b);
```

Kompilator musi wiedzieć:

```text
gdzie położyć a?
gdzie położyć b?
gdzie znaleźć wynik?
kto sprząta stos?
które rejestry wolno zniszczyć?
```

Odpowiedź daje:

```text
calling convention
```

Bez tego dwa moduły skompilowane przez różne narzędzia nie potrafiłyby ze sobą współpracować.

---

# Stack pointer w x86-64

Rejestr:

```text
RSP
```

wskazuje szczyt stosu.

Instrukcje:

```asm
push rax
pop rax
```

działają podobnie koncepcyjnie do:

```asm
PHA
PLA
```

na 6502.

Różnica:

```text
6502 -> stos w stałym obszarze $0100-$01FF
x86-64 -> stos w normalnej przestrzeni pamięci procesu
```

---

# CALL i RET

x86:

```asm
call function
```

zapisuje adres powrotu na stosie i przechodzi do funkcji.

Powrót:

```asm
ret
```

To ta sama podstawowa idea co:

```asm
JSR
RTS
```

na 6502.

---

# 6502 kontra x86-64

| Cecha | 6502/6510 | x86-64 |
|---|---|---|
| epoka | lata 70./80. | współczesność |
| główna szerokość danych | 8 bit | 64 bit |
| przestrzeń adresowa klasycznego CPU | 16 bit | bardzo duża 64-bitowa |
| rejestry ogólne | bardzo mało | dużo |
| ISA | stosunkowo prosta | bardzo duża |
| stos | strona `$0100` | normalna pamięć |
| zastosowanie do nauki | świetne | trudniejsze |
| współczesny desktop | nie | tak |

---

# Trzeci świat: ARM

ARM jest dziś wszędzie:

- telefony,
- tablety,
- Raspberry Pi,
- routery,
- mikrokontrolery,
- serwery,
- Mac z Apple Silicon.

Współczesne 64-bitowe ARM nazywamy:

```text
AArch64
```

---

# Rejestry AArch64

Podstawowe rejestry:

```text
X0..X30
```

Każdy:

```text
64 bity
```

Dolna 32-bitowa część:

```text
W0..W30
```

Przykład:

```asm
mov x0, #10
mov x1, #20
add x2, x0, x1
```

Znaczenie:

```text
X0 = 10
X1 = 20
X2 = X0 + X1
```

To wygląda znacznie bardziej regularnie niż x86.

---

# ARM i load/store

Architektury RISC często mocno rozdzielają:

```text
operacje na rejestrach
```

od:

```text
dostępu do pamięci
```

Typowy schemat:

```asm
ldr x0, [x1]
add x0, x0, #1
str x0, [x1]
```

Czyli:

```text
załaduj z pamięci
oblicz w rejestrze
zapisz do pamięci
```

---

# Cross-toolchain ARM - Debian

Dla mikrokontrolerów Cortex-M/R:

```bash
sudo apt update
sudo apt install gcc-arm-none-eabi
```

W pakiecie znajduje się również assembler GNU:

```text
arm-none-eabi-as
```

Sprawdzenie:

```bash
arm-none-eabi-as --version
```

---

# ARM - Windows i macOS

Arm publikuje oficjalny:

```text
Arm GNU Toolchain
```

dla:

- Windows,
- Linux,
- macOS.

Strona:

https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads

W zależności od targetu używa się narzędzi takich jak:

```text
arm-none-eabi-gcc
arm-none-eabi-as
aarch64-none-elf-gcc
```

---

# Czwarty świat: RISC-V

RISC-V jest otwartą ISA.

To ważna różnica.

x86 i ARM są architekturami kontrolowanymi przez konkretne firmy i ekosystemy licencyjne.

Specyfikacja RISC-V jest otwarta.

Architektura jest projektowana modułowo.

Podstawowy zestaw instrukcji może być rozszerzany o:

- mnożenie,
- atomiki,
- floating point,
- vector,
- compressed instructions.

---

# RISC-V wygląda bardzo regularnie

Przykład:

```asm
li a0, 10
li a1, 20
add a2, a0, a1
```

Rejestry argumentów:

```text
a0
a1
...
```

Rejestry tymczasowe:

```text
t0
t1
...
```

Zapisane rejestry:

```text
s0
s1
...
```

To sprawia, że kod jest często łatwiejszy do czytania niż x86.

---

# RISC-V na Debianie

Cross-toolchain Linux:

```bash
sudo apt install gcc-riscv64-linux-gnu
```

Bare metal:

```bash
sudo apt install gcc-riscv64-unknown-elf
```

Dostępne są narzędzia w rodzaju:

```text
riscv64-linux-gnu-as
riscv64-unknown-elf-as
```

---

# RISC kontra CISC

To temat dużo bardziej subtelny niż internetowe:

```text
RISC = proste
CISC = skomplikowane
```

ale na poziomie wprowadzającym:

## CISC

Klasyczny przykład:

```text
x86
```

Duża liczba instrukcji i wiele historycznych trybów.

## RISC

Przykłady:

```text
ARM
RISC-V
```

Bardziej regularny zestaw instrukcji i silna filozofia operacji wykonywanych na rejestrach.

Współczesne CPU są jednak znacznie bardziej złożone wewnętrznie i proste etykietki nie opisują całej rzeczywistości.

---

# Ta sama operacja na czterech ISA

Chcemy:

```text
10 + 20
```

## 6502

```asm
CLC
LDA #10
ADC #20
```

Wynik:

```text
A
```

## x86-64

```asm
mov rax, 10
add rax, 20
```

## AArch64

```asm
mov x0, #10
add x0, x0, #20
```

## RISC-V

```asm
li a0, 10
addi a0, a0, 20
```

Ta sama idea.

Cztery różne języki procesora.

---

# Dlaczego assembler nie jest przenośny?

Kod C:

```c
int x = a + b;
```

może zostać skompilowany dla:

```text
x86-64
ARM
RISC-V
PowerPC
```

Kompilator wybiera odpowiednie instrukcje.

Kod assemblerowy:

```asm
mov rax, rbx
```

jest związany z x86-64.

Dlatego assembler jest:

```text
architekturozależny
```

---

# Co robi kompilator C?

Weźmy:

```c
int add(int a, int b) {
    return a + b;
}
```

Kompilator może wygenerować coś w rodzaju:

```asm
mov eax, edi
add eax, esi
ret
```

Dzięki temu możesz używać C bez ręcznego pisania instrukcji procesora.

Kompilator jest automatycznym generatorem assemblera i kodu maszynowego.

---

# Zobacz assembler wygenerowany przez GCC

Utwórz:

```text
add.c
```

```c
int add(int a, int b) {
    return a + b;
}
```

Wygeneruj assembler:

```bash
gcc -S -O2 add.c
```

Powstanie:

```text
add.s
```

To jedno z najlepszych ćwiczeń do nauki assemblera.

Zmieniaj C:

```c
if
for
while
function
struct
```

i patrz, co generuje kompilator.

---

# Intel syntax kontra AT&T syntax

Na x86 spotkasz dwa główne style zapisu.

## Intel

```asm
mov rax, rbx
```

Czytaj:

```text
destination <- source
```

## AT&T

```asm
movq %rbx, %rax
```

Kolejność operandów jest odwrotna:

```text
source -> destination
```

Dodatkowo pojawiają się:

```text
%
$
suffixes
```

Dlatego ten sam kod w dwóch tutorialach może wyglądać inaczej.

NASM używa stylu zbliżonego do Intel syntax.

GNU `as` tradycyjnie używa AT&T, choć narzędzia GNU potrafią również pracować z Intel syntax.

---

# Object file

Po assemblerze często nie powstaje od razu program.

Powstaje:

```text
object file
```

Na Linuxie:

```text
.o
```

Zawiera między innymi:

- kod maszynowy,
- dane,
- symbole,
- informacje relokacyjne,
- czasem debug info.

---

# Relokacja

Załóżmy, że assembler tworzy:

```asm
call foo
```

ale nie wie jeszcze, pod jakim finalnym adresem znajdzie się:

```text
foo
```

Zostawia informację:

> linker, popraw ten adres później.

To:

```text
relocation
```

Linker po rozmieszczeniu segmentów wie już:

```text
foo = 0x401040
```

i może naprawić instrukcję.

---

# Segmenty i sekcje

Typowy program posiada osobne obszary.

Przykładowo:

```text
.text
.data
.bss
.rodata
```

## `.text`

Kod wykonywalny.

## `.data`

Zainicjalizowane dane zapisywalne.

## `.rodata`

Dane tylko do odczytu.

## `.bss`

Dane, które na starcie mają być wyzerowane.

W cc65 zobaczymy analogiczne koncepcje segmentów, choć ich nazwy i organizacja zależą od konfiguracji targetu.

---

# Loader

Po utworzeniu programu ktoś musi go załadować do pamięci.

Na współczesnym systemie robi to loader systemu operacyjnego.

W C64 plik:

```text
PRG
```

zawiera między innymi adres ładowania.

System wie, gdzie umieścić program w pamięci.

Potem CPU musi dostać adres startowy.

---

# Firmware, ROM i boot

Po włączeniu komputera CPU nie „wie”, gdzie jest system operacyjny.

Architektura definiuje mechanizm startu.

6502 pobiera wektory startowe z określonych adresów.

Współczesny PC przechodzi przez firmware:

```text
UEFI
```

a potem bootloader.

Na mikrokontrolerze kod może wystartować bezpośrednio z flash.

Assembler pozwala zobaczyć ten świat dużo wyraźniej.

---

# Reverse engineering

Assembler jest podstawowym językiem reverse engineeringu.

Jeżeli nie masz źródeł programu, możesz nadal zobaczyć:

```text
kod maszynowy
```

i go zdisassemblować.

Narzędzia:

- Ghidra,
- IDA,
- Binary Ninja,
- radare2,
- objdump,
- gdb.

Disassembler próbuje zamienić bajty na instrukcje.

Decompiler próbuje pójść krok dalej i zbudować coś przypominającego C.

---

# Assembler i bezpieczeństwo

Wiele klas podatności staje się dużo bardziej zrozumiałych po poznaniu podstaw assemblera:

- buffer overflow,
- stack smashing,
- use-after-free,
- ROP,
- shellcode,
- calling conventions,
- return address overwrite.

Nie dlatego, że musisz pisać exploit.

Po prostu widzisz, co naprawdę znaczy:

```text
nadpisanie pamięci
```

---

# Buffer overflow - idea

Wyobraź sobie stos:

```text
[ local buffer ]
[ saved register ]
[ return address ]
```

Jeżeli program zapisze poza granicę bufora, może nadpisać:

```text
return address
```

Po `RET` procesor może przejść pod inny adres.

Współczesne systemy stosują zabezpieczenia:

- ASLR,
- NX,
- stack canaries,
- PIE,
- CFI.

Ale mechanizm staje się znacznie bardziej zrozumiały, gdy wiesz, czym są:

```text
stack
return address
PC/RIP
```

---

# Cache

6502 pozwala myśleć o pamięci prawie jak o jednolitej przestrzeni.

Współczesny CPU posiada kilka poziomów cache:

```text
registers
L1
L2
L3
RAM
storage
```

Czas dostępu może różnić się gigantycznie.

Dlatego wydajność współczesnego kodu nie zależy tylko od liczby instrukcji.

Liczy się również:

- locality,
- cache misses,
- memory bandwidth,
- branch prediction.

To jeden z powodów, dla których ręczne „optymalizowanie assemblera” na nowoczesnym CPU jest znacznie trudniejsze niż na 6502.

---

# Pipeline

CPU nie musi kończyć jednej instrukcji, zanim zacznie przygotowywać następną.

Może nakładać etapy:

```text
fetch
decode
execute
memory
writeback
```

na wiele instrukcji jednocześnie.

To:

```text
pipeline
```

---

# Branch prediction

Jeżeli CPU widzi:

```text
if
```

nie zawsze chce czekać, aż zna wynik.

Próbuje przewidzieć:

```text
która gałąź zostanie wykonana
```

Jeżeli zgadnie:

```text
super
```

Jeżeli nie:

```text
pipeline trzeba częściowo wyczyścić
```

To kolejny powód, dla którego koszt instrukcji we współczesnym CPU nie jest prostą tabelką.

---

# Out-of-order execution

Współczesny CPU może wykonywać instrukcje w kolejności innej niż zapis programu, jeśli nie zmienia to obserwowalnego wyniku.

Przykładowo:

```text
A zależy od RAM
B jest niezależnym dodawaniem
```

CPU może zacząć liczyć B, czekając na dane A.

To jeden z fundamentów wydajności współczesnych procesorów.

Na 6502 świata tego praktycznie nie musimy brać pod uwagę.

---

# SIMD

Współczesne procesory potrafią wykonywać tę samą operację na wielu danych jednocześnie.

To:

```text
SIMD
```

Przykłady x86:

```text
SSE
AVXAVX2
AVX-512
```

ARM:

```text
NEON
SVE
```

RISC-V:

```text
Vector Extension
```

To ważne dla:

- grafiki,
- audio,
- kompresji,
- ML,
- obliczeń naukowych.

---

# Czy warto pisać normalne aplikacje w assemblerze?

Zwykle nie.

Powody:

- dużo kodu,
- słaba przenośność,
- trudniejsze testowanie,
- trudniejsze utrzymanie,
- kompilatory potrafią świetnie optymalizować.

Assembler ma sens między innymi w:

- bootloaderach,
- fragmentach kernela,
- firmware,
- startup code,
- bardzo specyficznym embedded,
- kryptografii,
- ręcznych optymalizacjach,
- reverse engineeringu,
- demoscenie,
- retrocomputingu.

---

# Assembler jako narzędzie do nauki

To być może jego najważniejsze zastosowanie dla większości współczesnych programistów.

Jeżeli rozumiesz assembler, lepiej rozumiesz:

```text
C
wskaźniki
stack
heap
ABI
debugger
kompilator
linker
system calls
proces
pamięć
CPU
```

Nie musisz pisać w nim zawodowo.

---

# Ćwiczenie 1 - rejestr

6502:

```asm
LDA #10
```

Zadaj sobie pytanie:

```text
co teraz zawiera A?
```

Odpowiedź:

```text
10
```

---

# Ćwiczenie 2 - pamięć

```asm
LDA #10
STA $2000
```

Pytanie:

```text
co znajduje się pod $2000?
```

Odpowiedź:

```text
10
```

---

# Ćwiczenie 3 - licznik

```asm
LDX #0

loop:
    INX
    CPX #5
    BNE loop
```

Po zakończeniu:

```text
X = 5
```

---

# Ćwiczenie 4 - tablica

```asm
values:
    .byte 10, 20, 30, 40
```

```asm
LDX #2
LDA values,X
```

W A znajdzie się:

```text
30
```

Indeks zaczyna się od zera.

---

# Ćwiczenie 5 - podprogram

```asm
        JSR foo

        ...

foo:
        LDA #10
        RTS
```

Po powrocie:

```text
A = 10
```

---

# Ćwiczenie 6 - stos

```asm
LDA #10
PHA

LDA #20

PLA
```

Po `PLA`:

```text
A = 10
```

---

# Ćwiczenie 7 - przepełnienie

```asm
CLC
LDA #255
ADC #1
```

8-bitowy A nie może przechować:

```text
256
```

Po operacji:

```text
A = 0
Carry = 1
```

To jedna z najbardziej namacalnych lekcji o szerokości liczb.

---

# Mini-projekt: migająca ramka C64

Możemy zrobić prostą pętlę zmieniającą kolor ramki.

```asm
BORDER = $D020

        .segment "CODE"

start:
        ldx #0

loop:
        stx BORDER

        jsr delay

        inx
        txa
        and #$0f
        tax

        jmp loop

delay:
        ldy #0

delay_outer:
        ldx #0

delay_inner:
        dex
        bne delay_inner

        dey
        bne delay_outer

        rts
```

To celowo prymitywny delay.

W prawdziwym kodzie C64 lepiej synchronizować animację ze sprzętem, np. rasterem.

Ale ćwiczenie pokazuje:

- zapis do I/O,
- pętle,
- rejestry,
- podprogram,
- maskowanie bitów.

---

# AND i maski bitowe

Instrukcja:

```asm
AND #$0F
```

zostawia tylko dolne cztery bity.

```text
$0F = 00001111
```

Jeżeli A:

```text
10110110
```

to:

```text
10110110
AND
00001111
=
00000110
```

Wynik:

```text
6
```

Maskowanie bitów jest wszędzie w programowaniu niskopoziomowym.

---

# OR

```asm
ORA #$80
```

ustawia określone bity.

Przykład:

```text
00100010
OR
10000000
=
10100010
```

---

# XOR

6502:

```asm
EOR
```

czyli exclusive OR.

```asm
EOR #$FF
```

odwróci wszystkie bity A.

---

# Shifty

Przesunięcia bitowe:

```asm
ASL
LSR
```

## ASL

```text
Arithmetic Shift Left
```

Przesunięcie w lewo o jeden bit jest dla liczby bez znaku podobne do:

```text
* 2
```

jeżeli nie wystąpi przepełnienie.

## LSR

```text
Logical Shift Right
```

jest podobne do:

```text
/ 2
```

dla wartości bez znaku.

---

# Bitowe flagi sprzętu

Rejestr sprzętowy często przechowuje wiele ustawień w jednym bajcie.

Przykład hipotetyczny:

```text
bit 7 = enable
bit 6 = interrupt
bit 5 = mode
...
```

Zamiast zmieniać cały bajt, możemy manipulować pojedynczym bitem:

```asm
ORA #%10000000
```

albo:

```asm
AND #%01111111
```

To fundament pracy z:

- mikrokontrolerami,
- sterownikami,
- urządzeniami.

---

# Binarny zapis

ca65 pozwala używać zapisu:

```text
%10101010
```

To bardzo wygodne przy bitach.

Przykład:

```asm
LDA #%00000001
```

Hex:

```asm
LDA #$01
```

Dziesiętnie:

```asm
LDA #1
```

To ta sama wartość.

---

# Jak czytać obcy assembler?

Nie próbuj czytać każdej instrukcji osobno.

Najpierw znajdź:

1. wejście programu,
2. główną pętlę,
3. podprogramy,
4. dane,
5. dostęp do pamięci,
6. wywołania systemowe lub firmware,
7. warunki i skoki.

Szukaj wzorców.

Przykład:

```asm
loop:
    ...
    dec counter
    bne loop
```

Od razu wiesz:

```text
pętla sterowana licznikiem
```

---

# Nazwy instrukcji 6502, które warto znać

## Transfer danych

```text
LDA
LDX
LDY

STA
STX
STY
```

## Transfer rejestrów

```text
TAX
TAY
TXA
TYA
TSX
TXS
```

## Stos

```text
PHA
PLA
PHP
PLP
```

## Arytmetyka

```text
ADC
SBC
INC
DEC
INX
DEX
INY
DEY
```

## Logika

```text
AND
ORA
EOR
```

## Przesunięcia

```text
ASL
LSR
ROL
ROR
```

## Porównania

```text
CMP
CPX
CPY
```

## Skoki

```text
JMP
JSR
RTS
```

## Branch

```text
BEQ
BNE
BCC
BCS
BMI
BPL
BVC
BVS
```

## Flagi

```text
CLC
SEC
CLI
SEI
CLD
SED
CLV
```

Nie musisz uczyć się całej tabeli na pamięć.

Po kilku małych programach większość zaczyna wyglądać naturalnie.

---

# Branch kontra jump

## JMP

```asm
JMP somewhere
```

zawsze zmienia wykonanie.

## Branch

```asm
BNE somewhere
```

wykonuje skok tylko wtedy, gdy spełniony jest warunek.

Dodatkowo klasyczne branche 6502 mają ograniczony zasięg względem bieżącego adresu.

To ważne przy dużych funkcjach.

---

# JSR kontra JMP

```asm
JMP foo
```

przechodzi do `foo` bez automatycznej drogi powrotnej.

```asm
JSR foo
```

zapisuje adres powrotu.

Dlatego funkcja kończy się:

```asm
RTS
```

---

# BRK

Instrukcja:

```asm
BRK
```

wywołuje programowe przerwanie.

Nie jest po prostu zwykłym:

```text
stop CPU
```

W 6502 kieruje wykonanie przez mechanizm przerwania.

---

# NOP

```asm
NOP
```

oznacza:

```text
No Operation
```

Procesor wykonuje instrukcję, która zasadniczo nic nie zmienia.

NOP-y przydają się między innymi do:

- wyrównywania,
- timingów,
- patchowania kodu,
- debugowania.

---

# Illegal opcodes

Klasyczny 6502 posiada kombinacje kodów instrukcji, które nie były oficjalnie dokumentowane, ale powodują określone zachowania.

Są nazywane między innymi:

```text
illegal opcodes
undocumented opcodes
```

Demoscena i stare gry czasem ich używały.

Na początek najlepiej ich unikać.

Najpierw poznaj oficjalny zestaw instrukcji.

---

# 6502 kontra 6510

W większości prostych przykładów instrukcje są takie same.

6510 dodaje port I/O widoczny między innymi pod:

```text
$0000
$0001
```

C64 wykorzystuje to do konfiguracji mapowania pamięci.

Zmiana `$0001` może wpływać na to, czy CPU widzi:

- BASIC ROM,
- KERNAL ROM,
- I/O,
- RAM znajdujący się „pod” ROM-em.

To jedna z rzeczy, które czynią C64 ciekawszym niż czysty komputer laboratoryjny 6502.

---

# RAM pod ROM-em

C64 ma fizycznie 64 KiB RAM-u.

A jednocześnie w tej samej przestrzeni adresowej widzimy:

```text
ROM
I/O
```

Jak to możliwe?

Sprzęt przełącza, co jest widoczne pod określonym adresem.

Pod adresem:

```text
$A000
```

CPU może w jednym ustawieniu widzieć BASIC ROM, a w innym RAM.

To:

```text
bank switching / memory mapping
```

---

# Sprzęt jest częścią programu

Na współczesnym systemie program często widzi:

```text
abstrakcję systemu operacyjnego
```

Na C64 program może bezpośrednio dotykać:

```text
VIC-II
SID
CIA
RAM
ROM
```

Dlatego assembler retro jest świetnym sposobem na naukę architektury komputera jako całości.

---

# Co warto opanować na C64 po tym artykule?

Naturalna kolejność:

1. rejestry,
2. pamięć,
3. pętle,
4. subroutines,
5. zero page,
6. ekran tekstowy,
7. kolory,
8. klawiatura,
9. sprite'y,
10. raster,
11. SID,
12. przerwania,
13. własne struktury danych,
14. optymalizacja cykli.

Po tym assembler nie wygląda już jak tajemnicze zaklęcia.

---

# Czy uczymy się 6502 czy C64?

To dwie warstwy.

## 6502/6510

Uczymy się:

```text
CPU
instructions
registers
flags
stack
addressing
```

## C64

Uczymy się:

```text
memory map
VIC-II
SID
CIA
KERNAL
BASIC ROM
screen memory
```

Możesz znać instrukcje 6502 i nadal niewiele wiedzieć o C64.

I odwrotnie.

---

# Jak zbudować mały projekt

Prosty katalog:

```text
hello-c64/
├── src/
│   └── main.s
├── Makefile
└── README.md
```

Przykładowy `Makefile`:

```make
PROGRAM = hello
SOURCE = src/main.s

all:
	cl65 -o $(PROGRAM).prg \
		-u __EXEHDR__ \
		-t c64 \
		-C c64-asm.cfg \
		$(SOURCE)

run: all
	x64sc -autostart $(PROGRAM).prg

clean:
	rm -f $(PROGRAM).prg
```

Budowanie:

```bash
make
```

Uruchomienie:

```bash
make run
```

Czyszczenie:

```bash
make clean
```

---

# Po co Makefile przy jednym pliku?

Przy jednym pliku prawie nie jest potrzebny.

Ale po chwili dojdą:

```text
main.s
screen.s
sprites.s
sound.s
input.s
```

i długa linia builda stanie się irytująca.

Automatyzacja procesu budowania to naturalny kolejny krok.

---

# Git

Assembler jest zwykłym tekstem.

Nadaje się idealnie do Git.

```bash
git init
git add .
git commit -m "Initial C64 assembly project"
```

Zobacz:

[GitHub](techhandbook:doc-014)

Nie wrzucaj do repo tylko wygenerowanych binarek, jeśli możesz je odtworzyć z kodu.

Typowe `.gitignore`:

```gitignore
*.o
*.prg
*.map
*.lbl
```

---

# Map file

Linker może wygenerować mapę programu.

To plik pokazujący między innymi:

- gdzie leżą segmenty,
- jakie adresy dostały symbole,
- ile pamięci zajmuje kod.

W programowaniu niskopoziomowym to bardzo przydatne.

---

# Label file

Dla emulatora/debuggera można generować symbole, aby zamiast:

```text
$C042
```

widzieć:

```text
game_loop
```

To dramatycznie ułatwia debugowanie.

---

# Jak myśleć o optymalizacji

Nie zaczynaj od:

> ile cykli mogę urwać?

Najpierw:

1. napisz poprawny kod,
2. sprawdź działanie,
3. zmierz,
4. znajdź wąskie gardło,
5. dopiero optymalizuj.

Nawet na C64.
Kod:

```text
krótszy
```

nie zawsze znaczy:

```text
szybszy
```

A kod szybszy nie zawsze jest wart utraty czytelności.

---

# Rozmiar kontra szybkość

W retro często wybierasz między:

```text
mniej bajtów
```

a:

```text
mniej cykli
```

Przykładowa tablica może zastąpić obliczenie:

```text
więcej pamięci
mniej CPU
```

Albo odwrotnie:

```text
mniej pamięci
więcej obliczeń
```

To kompromis obecny również we współczesnym programowaniu.

---

# Dlaczego demoscena kocha assembler?

Demoscena często próbuje zrobić maksymalnie dużo z bardzo ograniczonego sprzętu.

Liczy się:

- każdy bajt,
- każdy cykl,
- dokładna synchronizacja ze sprzętem.

Assembler daje kontrolę, której język wysokiego poziomu może nie zapewniać.

Dlatego platformy takie jak:

- C64,
- Amiga,
- Atari ST,
- ZX Spectrum,

mają gigantyczną historię programowania niskopoziomowego.

---

# Assembler a mikrokontrolery

W embedded nadal czasem trzeba czytać assembler, nawet jeśli projekt jest pisany w C lub Rust.

Przykłady:

- startup code,
- bootloader,
- interrupt vector,
- context switch,
- fault handler.

Na Cortex-M możesz spotkać plik:

```text
startup_stm32.s
```

Warto wiedzieć, co tam się dzieje, nawet jeśli nie zamierzasz pisać całej aplikacji ręcznie.

---

# Assembler a system operacyjny

Kernel musi wykonywać rzeczy, których zwykły program nie może.

Przykładowo:

- zmieniać tryb CPU,
- obsługiwać przerwania,
- przełączać kontekst procesów,
- zarządzać tablicami stron,
- wykonywać instrukcje uprzywilejowane.

Część takiego kodu naturalnie trafia do assemblera.

Większość kernela może być napisana w C lub Rust, ale najniższe warstwy nadal muszą rozumieć CPU.

---

# Assembler w kryptografii

Kryptografia często potrzebuje:

- bardzo wysokiej wydajności,
- SIMD,
- instrukcji sprzętowych,
- przewidywalności.

Dlatego biblioteki kryptograficzne mogą zawierać ręcznie napisane fragmenty assemblera.

Ale takie optymalizacje powinny być tworzone przez ludzi bardzo dobrze znających konkretną architekturę.

---

# Inline assembly

C i C++ pozwalają w niektórych kompilatorach umieszczać assembler wewnątrz kodu.

Przykład ideowy:

```c
asm("nop");
```

To:

```text
inline assembly
```

Jest jednak:

- zależne od kompilatora,
- zależne od architektury,
- łatwe do zepsucia.

Zwykle lepiej ograniczać takie fragmenty do minimum.

---

# Intrinsics

Zamiast pisać czysty assembler, współczesny kod często używa:

```text
intrinsics
```

To funkcje udostępniane przez kompilator reprezentujące konkretne instrukcje CPU.

Przykład dotyczy często:

- SIMD,
- kryptografii,
- atomików.

Kompilator nadal zarządza:

- rejestrami,
- calling convention,
- schedulerem.

To często lepszy kompromis niż ręczny assembler.

---

# Co naprawdę znaczy „64-bit”?

Nie istnieje jedna definicja dla wszystkich architektur.

Może odnosić się między innymi do:

- szerokości rejestrów,
- rozmiaru adresów,
- naturalnego typu danych,
- ISA.

x86-64 ma 64-bitowe rejestry ogólne.

Ale współczesne procesory nie muszą fizycznie implementować pełnych 64 bitów adresu pamięci.

To kolejny przykład, gdzie marketingowa etykieta upraszcza techniczną rzeczywistość.

---

# Co to jest opcode?

Opcode:

```text
operation code
```

identyfikuje operację.

6502:

```text
A9
```

może oznaczać:

```text
LDA immediate
```

Cała instrukcja:

```text
A9 10
```

oznacza:

```asm
LDA #$10
```

Opcode:

```text
A9
```

Operand:

```text
10
```

---

# Instrukcja o zmiennej długości

6502 ma instrukcje o różnych długościach:

```text
1 bajt
2 bajty
3 bajty
```

x86 idzie dużo dalej - instrukcje mogą mieć bardzo różne długości.

RISC-V ma bardziej regularny model, choć rozszerzenie compressed dodaje krótsze instrukcje.

Sposób kodowania instrukcji jest częścią ISA.

---

# Alignment

Niektóre architektury preferują lub wymagają określonego wyrównania danych.

Przykład:

```text
adres podzielny przez 4
```

dla 32-bitowej wartości.

Na starym 6502 temat wygląda inaczej niż na ARM czy nowoczesnym x86.

Współczesny programista spotka alignment między innymi przy:

- strukturach C,
- SIMD,
- pamięci,
- ABI.

---

# Atomiki

Wielordzeniowe CPU wymagają mechanizmów bezpiecznej synchronizacji pamięci.

ISA udostępnia specjalne operacje atomowe.

Na x86:

```text
LOCK
CMPXCHG
```

ARM i RISC-V mają własne mechanizmy.

To fundament implementacji:

- mutexów,
- spinlocków,
- atomics,
- lock-free structures.

6502 w typowym C64 nie musi rozwiązywać problemu wielu rdzeni.

---

# Privilege levels

Współczesne CPU mają różne poziomy uprzywilejowania.

Kod aplikacji nie może po prostu zrobić:

```text
wyłącz ochronę pamięci
```

Kernel może korzystać z instrukcji niedostępnych dla procesu użytkownika.

Na x86 spotkasz pojęcia:

```text
rings
```

na ARM:

```text
exception levels
```

To część fundamentu bezpieczeństwa systemu operacyjnego.

---

# Syscall kontra funkcja biblioteczna

W C:

```c
printf("Hello");
```

nie jest bezpośrednio instrukcją systemu operacyjnego.

`printf` jest funkcją biblioteki.

Może ostatecznie użyć wywołania systemowego:

```text
write
```

Assembler pozwala ominąć część tych warstw i bezpośrednio wywołać kernel.

Ale tracimy wygodę biblioteki.

---

# CPU nie zna tekstu

Procesor nie wie, czym jest:

```text
"Hello"
```

Widziać może tylko bajty.

Na przykład:

```text
48 65 6C 6C 6F
```

interpretujemy jako znaki ASCII.

Ta sama sekwencja mogłaby być potraktowana jako:

- liczby,
- instrukcje,
- piksele,
- dźwięk.

Format danych nadaje znaczenie.

---

# CPU nie zna zmiennych

W kodzie wysokiego poziomu:

```c
int score = 10;
```

CPU nie zna nazwy:

```text
score
```

Po kompilacji może to być:

```text
rejestr
```

albo:

```text
adres pamięci
```

Nazwa istnieje głównie dla człowieka i narzędzi.

---

# CPU nie zna pętli

CPU zna:

```text
skok
warunek
adres
```

Pętla:

```c
while (x != 0) {
    x--;
}
```

może zamienić się w:

```asm
loop:
    dec ...
    jne loop
```

To bardzo ważna zmiana perspektywy.

---

# CPU nie zna funkcji

CPU zna:

```text
adresy
stos
jump/call
return
```

„Funkcja” jest konwencją zbudowaną na tych mechanizmach.

---

# CPU nie zna obiektów

Obiekt C++:

```cpp
player.move();
```

na końcu staje się:

- adresami,
- wskaźnikami,
- funkcjami,
- danymi,
- instrukcjami CPU.

Warstwy abstrakcji są bardzo użyteczne.

Ale pod nimi nadal istnieje assembler.

---

# Dlaczego nie trzeba bać się assemblera?

Bo podstawy są prostsze niż składnia współczesnego frameworka frontendowego.

6502 ma bardzo mało podstawowych elementów:

```text
kilka rejestrów
kilkadziesiąt instrukcji
pamięć
flagi
stos
skoki
```

Trudność zaczyna się wtedy, gdy próbujesz z tych klocków zbudować duży system.

Do zrozumienia podstaw nie potrzebujesz wielkiej matematyki.

---

# Minimalna lista rzeczy do zapamiętania

Jeśli po tygodniu zapomnisz większość artykułu, zapamiętaj:

1. Procesor wykonuje kod maszynowy.
2. Assembler tłumaczy symbole na kod maszynowy.
3. Assembly zależy od ISA.
4. Rejestry znajdują się wewnątrz CPU.
5. RAM jest adresowaną przestrzenią bajtów.
6. PC wskazuje instrukcję.
7. SP wskazuje stos.
8. Flagi opisują wyniki operacji.
9. `JMP` zmienia przepływ wykonania.
10. `CALL/JSR` + `RET/RTS` budują funkcje.
11. Linker łączy moduły i rozwiązuje symbole.
12. ABI mówi, jak binarne fragmenty programu współpracują.
13. System operacyjny dodaje kolejną warstwę ponad ISA.
14. C64 jest świetnym laboratorium, bo sprzęt jest widoczny bez setek warstw abstrakcji.

---

# Ściąga 6502

| Instrukcja | Znaczenie |
|---|---|
| `LDA` | załaduj A |
| `STA` | zapisz A |
| `LDX` | załaduj X |
| `STX` | zapisz X |
| `LDY` | załaduj Y |
| `STY` | zapisz Y |
| `ADC` | dodaj z Carry |
| `SBC` | odejmij z Carry |
| `CMP` | porównaj A |
| `CPX` | porównaj X |
| `CPY` | porównaj Y |
| `INC` | zwiększ pamięć |
| `DEC` | zmniejsz pamięć |
| `INX` | X++ |
| `DEX` | X-- |
| `INY` | Y++ |
| `DEY` | Y-- |
| `AND` | AND bitowe |
| `ORA` | OR bitowe |
| `EOR` | XOR bitowe |
| `ASL` | shift left |
| `LSR` | shift right |
| `JMP` | bezwarunkowy skok |
| `JSR` | wywołaj podprogram |
| `RTS` | wróć |
| `BEQ` | skocz, jeśli Z=1 |
| `BNE` | skocz, jeśli Z=0 |
| `BCC` | skocz, jeśli C=0 |
| `BCS` | skocz, jeśli C=1 |
| `BMI` | skocz, jeśli N=1 |
| `BPL` | skocz, jeśli N=0 |
| `PHA` | push A |
| `PLA` | pull A |
| `CLC` | wyczyść Carry |
| `SEC` | ustaw Carry |
| `NOP` | nic nie rób |

---

# Ściąga rejestrów

## 6502/6510

```text
A   - accumulator
X   - index
Y   - index
PC  - program counter
SP  - stack pointer
P   - status
```

## x86-64

```text
RAX RBX RCX RDX
RSI RDI
RSP RBP
R8-R15
RIP
RFLAGS
```

## AArch64

```text
X0-X30
SP
PC - konceptualnie, nie jako zwykły GPR
PSTATE
```

## RISC-V

```text
x0-x31
pc
```

z nazwami ABI:

```text
zero
ra
sp
gp
tp
t0-t6
s0-s11
a0-a7
```

---

# Narzędzia - ściąga

| Cel | 6502/C64 | x86-64 | ARM | RISC-V |
|---|---|---|---|---|
| assembler | `ca65` | `nasm` / `as` | `arm-none-eabi-as` | `riscv64-unknown-elf-as` |
| linker | `ld65` | `ld` | GNU `ld` | GNU `ld` |
| disassembler | `da65` | `ndisasm`, `objdump` | `objdump` | `objdump` |
| emulator/sim | VICE / sim65 | QEMU / natywny CPU | QEMU / sprzęt | QEMU / sprzęt |
| debugger | VICE monitor | GDB | GDB | GDB |

---

# Instalacja - szybka ściąga

## C64 / 6502

### Debian

```bash
sudo apt install cc65
sudo apt install vice
```

VICE wymaga repozytorium `contrib`.

### macOS

```bash
brew install cc65
brew install vice
```

### Windows

Pobierz aktualne buildy:

```text
cc65
VICE
```

ze stron projektów.

---

# x86-64

### Debian

```bash
sudo apt install nasm binutils gdb
```

### macOS

```bash
brew install nasm
```

### Windows

NASM:

https://www.nasm.us/

Do linkowania natywnych programów Windows wygodnie użyć również Visual Studio Build Tools albo MinGW/MSYS2, zależnie od wybranego workflow.

---

# ARM bare-metal

### Debian

```bash
sudo apt install gcc-arm-none-eabi
```

### Windows/macOS

Arm GNU Toolchain:

https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads

---

# RISC-V bare-metal

### Debian

```bash
sudo apt install gcc-riscv64-unknown-elf
```

Linux cross:

```bash
sudo apt install gcc-riscv64-linux-gnu
```

---

# Jak ćwiczyć dalej?

Nie zaczynaj od:

```text
napiszę własny system operacyjny
```

Lepsza ścieżka:

## Krok 1

Rejestry:

```asm
LDA
LDX
LDY
```

## Krok 2

Pamięć:

```asm
STA
```

## Krok 3

Pętle:

```asm
CMP
BNE
```

## Krok 4

Tablice i indeksowanie.

## Krok 5

Podprogramy:

```asm
JSR
RTS
```

## Krok 6

Stos:

```asm
PHA
PLA
```

## Krok 7

C64:

```text
screen RAM
color RAM
VIC-II
```

## Krok 8

KERNAL.

## Krok 9

Przerwania.

## Krok 10

Sprite'y i SID.

Dopiero potem warto mocniej zanurzyć się w:

```text
x86-64
ARM
RISC-V
```

---

# Dlaczego zaczynamy od 6502, a nie Intela?

Bo na 6502 można niemal objąć cały model CPU głową.

Masz:

```text
A
X
Y
SP
PC
flags
```

Na x86-64 natychmiast dochodzą:

- dziesiątki lat kompatybilności,
- wiele rozmiarów rejestrów,
- wiele trybów adresowania,
- SIMD,
- ABI,
- privilege levels,
- nowoczesny pipeline,
- ogromna ISA.

6502 jest małym modelem, na którym nauczysz się zasad.

Potem x86 przestaje wyglądać jak kompletny chaos.

Wygląda raczej jak:

> te same podstawy, tylko czterdzieści lat rozbudowy.

---

# Najważniejszy eksperyment: porównaj C z assemblerem

Utwórz:

```text
example.c
```

```c
int sum(int a, int b)
{
    return a + b;
}
```

Potem:

```bash
gcc -O0 -S example.c -o example-O0.s
gcc -O2 -S example.c -o example-O2.s
```

Porównaj oba pliki.

Zobaczysz, co robi optymalizator.

To niezwykle pouczające.

Następnie:

```bash
gcc -O2 -c example.c -o example.o
objdump -d example.o
```

Masz pełną drogę:

```text
C
↓
assembly
↓
object code
↓
disassembly
```

---

# Compiler Explorer

Do szybkiego porównywania kodu wysokiego poziomu z assemblerem świetnie nadaje się:

https://godbolt.org/

Możesz wpisać:

```c
int add(int a, int b) {
    return a + b;
}
```

i zobaczyć kod dla:

- GCC,
- Clang,
- x86-64,
- ARM,
- RISC-V,
- wielu poziomów optymalizacji.

To jedno z najlepszych narzędzi edukacyjnych do nauki zależności:

```text
C/C++/Rust -> assembly
```

---

# Co assembler daje programiście wysokiego poziomu?

Nawet jeśli już nigdy nie napiszesz programu w czystym assemblerze, łatwiej zrozumiesz:

## Wskaźniki

To adresy.

## Referencje

Na końcu muszą prowadzić do danych.

## Stos

To realna pamięć z konkretnym wskaźnikiem.

## Funkcje

To konwencja przechodzenia między adresami i przekazywania danych.

## Typy

CPU widzi bity. Typy są warstwą nad nimi.

## Overflow

Wynika z fizycznej szerokości reprezentacji.

## Segmentation fault

Proces odwołał się do niedozwolonego obszaru pamięci.

## Calling convention

To umowa, która pozwala modułom ze sobą rozmawiać.

## Compiler optimization

To automatyczna transformacja kodu na bardziej efektywną sekwencję instrukcji.

---

# Czego assembler Ci nie nauczy?

Assembler nie zastąpi wiedzy o:

- algorytmach,
- architekturze aplikacji,
- bazach danych,
- sieciach,
- bezpieczeństwie aplikacyjnym,
- testowaniu,
- projektowaniu API.

To jedna warstwa.

Bardzo ważna, ale nadal jedna.

---

# Najważniejszy wniosek
Komputer nie wykonuje:

```javascript
button.addEventListener(...)
```

Nie wykonuje:

```python
for x in items:
```

Nie wykonuje:

```go
go worker()
```

Nie wykonuje:

```c
printf(...)
```

Na samym dole wykonuje instrukcje swojej architektury.

Cały współczesny stos:

```text
framework
runtime
biblioteka
język
kompilator
system operacyjny
```

ostatecznie prowadzi do:

```text
rejestry
pamięć
instrukcje
CPU
```

Assembler pozwala zajrzeć właśnie tam.

I dlatego warto go poznać, nawet jeśli nigdy nie będzie Twoim głównym językiem.

---

# Powiązane materiały TechHandbooka

- [C - czytanie, kompilacja i debugowanie](techhandbook:doc-019)
- [Go - czytanie kodu](techhandbook:doc-020)
- [Debian - shell](techhandbook:doc-027)
- [Programowanie w shellu](techhandbook:doc-031)
- [Debian - desktop i serwer](techhandbook:doc-033)
- [Visual Studio Code](techhandbook:doc-039)
- [GitHub](techhandbook:doc-014)
- [20 współczesnych języków programowania, które warto znać](techhandbook:doc-058)
- [Stare języki programowania, które ukształtowały informatykę](techhandbook:doc-059)

---

# Oficjalne źródła i dokumentacja

Stan sekcji narzędziowej: wrzesień 2026.

## 6502 / cc65

- cc65: https://cc65.github.io/
- ca65 User's Guide: https://cc65.github.io/doc/ca65.html
- ld65 User's Guide: https://cc65.github.io/doc/ld65.html
- C64-specific information: https://cc65.github.io/doc/c64.html
- GitHub cc65: https://github.com/cc65/cc65

## Commodore 64

- VICE: https://vice-emu.sourceforge.io/

## x86 / x86-64

- NASM: https://www.nasm.us/
- Intel Software Developer Manuals: https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html
- AMD64 Architecture Programmer's Manual: https://www.amd.com/en/search/documentation/hub.html

## ARM

- Arm developer documentation: https://developer.arm.com/
- Arm GNU Toolchain: https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads

## RISC-V

- RISC-V International: https://riscv.org/
- Specifications: https://riscv.org/technical/specifications/

## Narzędzia

- Compiler Explorer: https://godbolt.org/
- GNU Binutils: https://www.gnu.org/software/binutils/
- GDB: https://www.gnu.org/software/gdb/

---

# Dalej w serii

1. **20 współczesnych języków programowania, które warto znać**
2. **Stare języki programowania, które ukształtowały informatykę**
3. **Assembler od podstaw - od rejestrów i pamięci do prawdziwego programu** - ten artykuł
4. **Ada - język, w którym błędy mają być trudniejsze do popełnienia**

Następny artykuł przejdzie w zupełnie inną filozofię.

Po assemblerze, gdzie programista ma niemal całkowitą kontrolę nad maszyną, zobaczymy Adę - język zaprojektowany tak, żeby programista **nie mógł swobodnie zrobić wszystkiego, co tylko przyjdzie mu do głowy**.

I właśnie dlatego oba języki świetnie pokazują dwa skrajnie różne podejścia do programowania.
