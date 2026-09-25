---
id: "doc-061"
title: "Ada - język, w którym błędy mają być trudniejsze do popełnienia"
slug: "ada-jezyk-w-ktorym-bledy-maja-byc-trudniejsze-do-popelnienia"
description: "Praktyczne kompendium języka Ada: historia, instalacja GNAT i Alire na Windowsie, macOS i Linuxie, składnia, silne typowanie, zakresy, pakiety, generyki, tasking, kontrakty, SPARK i formalna weryfikacja."
lang: "pl"
audience: "standard"
published: "2026-09-25"
updated: "2026-09-25"
tags:
  - "ada"
  - "spark"
  - "gnat"
  - "alire"
  - "formal-verification"
  - "safety-critical"
  - "programming"
  - "embedded"
---

# Ada - język, w którym błędy mają być trudniejsze do popełnienia

Ada jest dziwnym językiem.

Nie dlatego, że jej składnia jest szczególnie egzotyczna.

Jeżeli znasz Pascala, C, Javę, Go albo nawet trochę Pythona, większość podstawowych konstrukcji zrozumiesz bardzo szybko.

Dziwne jest raczej to, **czego Ada oczekuje od programisty**.

W wielu popularnych językach filozofia brzmi mniej więcej:

> napisz kod, a potem sprawdzimy, czy działa.

Ada bardzo często zachęca do odwrotnego podejścia:

> najpierw opisz dokładnie, jakie wartości mają sens, co funkcja może dostać, co musi zwrócić i czego programowi nie wolno zrobić.

Dopiero potem pisz implementację.

To język zaprojektowany dla dużych, długo żyjących systemów, w których:

```text
"jakoś działa"
```

nie jest wystarczającym standardem jakości.

Ada jest używana między innymi w domenach takich jak:

- awionika,
- lotnictwo,
- kolej,
- systemy wojskowe,
- systemy czasu rzeczywistego,
- kosmos,
- medycyna,
- systemy embedded,
- oprogramowanie o wysokich wymaganiach bezpieczeństwa i niezawodności.

Ale nie jest wyłącznie językiem „do rakiet”.

Można w niej napisać:

- program CLI,
- serwer,
- bibliotekę,
- aplikację embedded,
- grę,
- program wielowątkowy,
- narzędzie systemowe.

I oczywiście:

> zgadywankę liczby od 0 do 100.

Ten artykuł pokaże Adę od podstaw aż do rzeczy, które czynią ją wyjątkową:

- silne typowanie,
- typy i podtypy,
- zakresy,
- rekordy,
- pakiety,
- generyki,
- kontrolę reprezentacji danych,
- tasking,
- protected objects,
- kontrakty,
- SPARK,
- formalną weryfikację.

Powiązane materiały TechHandbooka:

- [20 współczesnych języków programowania, które warto znać](techhandbook:doc-058)
- [Stare języki programowania, które ukształtowały informatykę](techhandbook:doc-059)
- [Assembler od podstaw](techhandbook:doc-060)
- [C - czytanie, kompilacja i debugowanie](techhandbook:doc-019)
- [Debian - shell](techhandbook:doc-027)
- [Visual Studio Code](techhandbook:doc-039)
- [GitHub](techhandbook:doc-014)

---

# Skąd wzięła się Ada?

W latach 70. Departament Obrony Stanów Zjednoczonych miał problem.

W różnych projektach używano ogromnej liczby języków i dialektów programowania.

Każdy system mógł mieć własne:

- narzędzia,
- kompilatory,
- biblioteki,
- konwencje,
- język.

Dla systemów rozwijanych i utrzymywanych przez dziesięciolecia był to koszmar.

Departament Obrony rozpoczął więc proces projektowania jednego nowego języka przeznaczonego do dużych systemów.

Wymagania były bardzo ambitne.

Język miał wspierać między innymi:

- modularność,
- silne typowanie,
- niezawodność,
- współbieżność,
- systemy czasu rzeczywistego,
- duże zespoły,
- długotrwałe utrzymanie kodu.

Zwycięski projekt stworzył zespół kierowany przez:

```text
Jean Ichbiah
```

Język nazwano:

```text
Ada
```

na cześć:

```text
Augusta Ada Lovelace
```

związanej z maszyną analityczną Charlesa Babbage'a i często nazywanej pierwszą programistką.

---

# Ada nie jest skrótem

W przeciwieństwie do nazw takich jak:

```text
BASIC
COBOL
FORTRAN
```

Ada nie rozwija się do żadnej dłuższej nazwy.

To po prostu imię.

Poprawny zapis:

```text
Ada
```

a nie:

```text
ADA
```

---

# Wersje języka

Ada jest językiem standaryzowanym.

Najważniejsze wersje:

## Ada 83

Pierwszy pełny standard.

Wprowadził między innymi:

- pakiety,
- generyki,
- wyjątki,
- tasking,
- silne typowanie.

## Ada 95

Bardzo ważna modernizacja.

Dodano między innymi:

- programowanie obiektowe,
- hierarchiczne biblioteki,
- protected objects,
- wiele rozszerzeń czasu rzeczywistego.

## Ada 2005

Rozszerzenia między innymi dla:

- OOP,
- interfejsów,
- systemów czasu rzeczywistego,
- kontenerów.

## Ada 2012

Bardzo ważna wersja z punktu widzenia współczesnej Ady.

Pojawiły się między innymi:

- preconditions,
- postconditions,
- type invariants,
- subtype predicates,
- bardziej rozbudowane kontrakty.

## Ada 2022

Obecna generacja standardu.

Standard Ada 2022 został opublikowany jako:

```text
ISO/IEC 8652:2023
```

Nazwa:

```text
Ada 2022
```

pozostała nazwą rewizji języka.

---

# Ada to nie SPARK

To ważne rozróżnienie.

## Ada

Pełny język programowania.

## SPARK

Język i zestaw metod formalnej analizy oparty na podzbiorze Ady.

Można myśleć:

```text
Ada
┌───────────────────────────────────┐
│                                   │
│        SPARK                      │
│        ┌────────────────┐         │
│        │ weryfikowalny  │         │
│        │ podzbiór       │         │
│        └────────────────┘         │
│                                   │
└───────────────────────────────────┘
```

SPARK ogranicza pewne konstrukcje Ady, które utrudniają matematyczne dowodzenie właściwości programu.

W zamian otrzymujemy możliwość dużo silniejszej analizy.

---

# GNAT

Najważniejszym współczesnym kompilatorem Ady jest:

```text
GNAT
```

GNAT jest częścią:

```text
GNU Compiler Collection
```

czyli GCC.

To oznacza, że Ada nie jest wyłącznie językiem jednego zamkniętego kompilatora.

Można używać otwartego toolchainu GNAT FSF.

Najważniejsze narzędzia:

```text
gcc        - zawiera frontend Ada
gnatmake   - prosty build pojedynczych projektów
gprbuild   - system budowania projektów
gnatbind   - binder Ady
gnatlink   - linker
```

---

# Po co Ada ma binder?

Kompilacja Ady nie zawsze jest po prostu:

```text
source -> object -> linker
```

Ada posiada dodatkowy etap:

```text
binding
```

Binder analizuje między innymi:

- zależności jednostek,
- kolejność elaboracji pakietów,
- inicjalizację programu.

Uproszczony proces:

```text
Ada source
    |
    v
compiler
    |
    v
object files
    |
    v
binder
    |
    v
linker
    |
    v
program
```

`gnatmake` i `gprbuild` robią to automatycznie.

---

# Alire

Współczesny projekt Ada bardzo wygodnie prowadzić przez:

```text
Alire
```

Polecenie:

```text
alr
```

Alire jest jednocześnie:

- menedżerem pakietów,
- katalogiem bibliotek,
- menedżerem zależności,
- narzędziem do tworzenia projektów,
- menedżerem toolchainów.

Można go porównać do:

```text
cargo - Rust
npm   - JavaScript
pip   - Python
opam  - OCaml
```

choć oczywiście szczegóły działania są inne.

---

# Dwie sensowne drogi instalacji

Mamy dwa główne podejścia.

## Droga 1 - systemowy GNAT

Dobra do:

- nauki,
- prostych programów,
- systemów Linux,
- środowisk, w których chcemy używać pakietów dystrybucji.

## Droga 2 - Alire

Lepsza do:

- nowych projektów,
- zależności,
- kontrolowania wersji kompilatora,
- bibliotek,
- SPARK,
- projektów przenośnych.

W tym artykule poznamy obie.

---

# Instalacja - Linux / Debian

## Najprostsza instalacja systemowa

Na Debianie:

```bash
sudo apt update
sudo apt install gnat gprbuild
```

Sprawdzenie:

```bash
gnat --version
```

albo:

```bash
gnatmake --version
```

oraz:

```bash
gprbuild --version
```

W zależności od wersji Debiana pakiet może zawierać określoną wersję GNAT GCC.

---

# Instalacja Alire - Linux

Alire publikuje archiwum z programem:

```text
alr
```

Pobieramy aktualne wydanie ze strony:

https://alire.ada.dev/

Po rozpakowaniu dodajemy katalog `bin` do `PATH`.

Przykład:

```bash
export PATH="$HOME/tools/alire/bin:$PATH"
```

Na stałe można dodać wpis do:

```text
~/.profile
```

lub konfiguracji używanego shella.

Sprawdzenie:

```bash
alr --version
```

Przy pierwszym projekcie Alire może zaproponować wybór kompilatora GNAT i GPRbuild.

---

# Linux ARM

Oficjalne gotowe toolchainy Alire są najwygodniejsze na wspieranych platformach x86-64.

Jeżeli pracujesz na Linux ARM/AArch64, możesz używać:

- systemowego GNAT,
- kompilatora zbudowanego dla tej platformy,
- Alire z systemowym toolchainem.

To ważne szczególnie dla:

```text
Raspberry Pi
ARM servers
```

---

# Instalacja - Windows

Najwygodniejszą współczesną drogą jest Alire.

Strona:

https://alire.ada.dev/

Dla Windows dostępny jest instalator.

Instalator dodaje `alr` do środowiska.

Sprawdzenie w PowerShell:

```powershell
alr --version
```

Przy pierwszym użyciu Alire może zaproponować instalację:

```text
MSYS2
```

Jest to sensowne, ponieważ część bibliotek i narzędzi potrzebuje programów typowych dla środowiska Unix:

```text
git
make
curl
```

Alire potrafi wykorzystać własne środowisko MSYS2.

---

# Alternatywa Windows - MSYS2

Ada jest również dostępna bezpośrednio w ekosystemie MSYS2.

Można używać pakietów GCC Ada i GPRbuild.

To opcja dla osób, które już pracują w MSYS2 i chcą mieć jeden spójny toolchain MinGW.

Do zwykłego nowego projektu Ada wygodniejszy jest jednak Alire.

---

# Instalacja - macOS

Alire udostępnia archiwum dla macOS.

Po rozpakowaniu:

```bash
export PATH="/ścieżka/do/alire/bin:$PATH"
```

macOS może oznaczyć pobrany plik atrybutem quarantine.

W takim przypadku oficjalna instrukcja Alire pokazuje usunięcie atrybutu:

```bash
xattr -d com.apple.quarantine bin/alr
```

Sprawdzenie:

```bash
alr --version
```

---

# macOS i Apple Silicon

Tu trzeba uważać.

Gotowe community toolchainy Alire są przede wszystkim publikowane dla:

```text
macOS x86-64
```

Na Apple Silicon:

```text
M1
M2
M3
M4
...
```

może być potrzebny:

- community toolchain dla AArch64,
- systemowy/native GNAT,
- kompilacja narzędzi ze źródeł.

Dlatego na macOS ARM warto sprawdzić aktualną dokumentację konkretnego wydania Alire.

---

# Pierwszy program - Hello World

Utwórz:

```text
hello.adb
```

Kod:

```ada
with Ada.Text_IO;

procedure Hello is
begin
   Ada.Text_IO.Put_Line ("Hello from Ada!");
end Hello;
```

Kompilacja:

```bash
gnatmake hello.adb
```

Uruchomienie Linux/macOS:

```bash
./hello
```

Windows:

```powershell
.\hello.exe
```

---

# `with`

Linia:

```ada
with Ada.Text_IO;
```

oznacza, że nasza jednostka zależy od:

```text
Ada.Text_IO
```

Można to porównać bardzo luźno do:

```text
import
include
use module
```

ale model bibliotek Ady ma własne zasady.

---

# Pełna nazwa

Bez `use` piszemy:

```ada
Ada.Text_IO.Put_Line ("Hello");
```

To bardzo czytelne.

Od razu wiadomo, skąd pochodzi `Put_Line`.

---

# `use`

Możemy napisać:

```ada
with Ada.Text_IO;
use Ada.Text_IO;

procedure Hello is
begin
   Put_Line ("Hello");
end Hello;
```

`use` sprawia, że nazwy z pakietu są bezpośrednio widoczne.

To wygodne, ale w dużych programach może zwiększać ryzyko konfliktów nazw.

Dlatego często zobaczysz kod bez globalnego:

```ada
use
```

---

# Struktura procedury

Najprostszy program:

```ada
procedure Main is
begin
   null;
end Main;
```

Mamy:

```text
procedure Main is
```

część deklaracyjną,

```text
begin
```

część wykonywalną,

```text
end Main;
```

koniec jednostki.

---

# `null`

Instrukcja:

```ada
null;
```

oznacza:

> celowo nic nie rób.

To odpowiednik pustej operacji.

Przydaje się np.:

```ada
if Something then
   null;
end if;
```

---

# Średniki

Ada używa średników:

```ada
X := 10;
Put_Line ("Hello");
```

Ale struktury kończą się słownie:

```ada
end if;
end loop;
end Main;
```

To bardzo charakterystyczne.

---

# Komentarze

Komentarz:

```ada
-- To jest komentarz
```

Nie ma klasycznego blokowego:

```text
/* ... */
```

Standardowa Ada używa komentarza od:

```text
--
```

do końca linii.

---

# Ada jest case-insensitive

Te identyfikatory oznaczają to samo:

```ada
Counter
COUNTER
counter
CoUnTeR
```

W praktyce kod pisze się według konwencji:

```ada
This_Is_A_Name
```

a słowa kluczowe często:

```ada
procedure
begin
end
```

---

# Przypisanie

Ada używa:

```ada
:=
```

Przykład:

```ada
X := 10;
```

Natomiast:

```ada
=
```

oznacza porównanie.

```ada
if X = 10 then
   ...
end if;
```

To eliminuje klasyczny błąd z języków rodziny C:

```c
if (x = 10)
```

zamiast:

```c
if (x == 10)
```

---

# Deklarowanie zmiennych

```ada
Age : Integer := 46;
```

Schemat:

```text
Nazwa : Typ := Wartość;
```

Możemy zadeklarować bez inicjalizacji:

```ada
Age : Integer;
```

ale w bezpiecznym kodzie warto bardzo świadomie podchodzić do inicjalizacji.

---

# Stałe

```ada
Pi : constant Float := 3.14159;
```

Po inicjalizacji nie można zmienić wartości:

```ada
Pi := 4.0;
```

To błąd.

---

# Podstawowe typy

Typowe predefiniowane typy:

```text
Integer
Float
Boolean
Character
String
Natural
Positive
```

Przykład:

```ada
Age     : Integer := 46;
Height  : Float := 1.80;
Enabled : Boolean := True;
Letter  : Character := 'A';
Name    : String := "Ada";
```

---

# Natural i Positive

Ada ma predefiniowane podtypy:

```ada
Natural
```

czyli liczby całkowite:

```text
>= 0
```

oraz:

```ada
Positive
```

czyli:

```text
> 0
```

Przykład:

```ada
Count : Natural := 0;
Index : Positive := 1;
```

Już na poziomie deklaracji mówimy coś o sensie danych.

---

# Typ to nie tylko rozmiar

To jedna z najważniejszych idei Ady.
W C:

```c
typedef float Meters;
typedef float Seconds;
```

obie nazwy są w praktyce aliasami tego samego typu.

Ada pozwala stworzyć **naprawdę różne typy**:

```ada
type Meters is new Float;
type Seconds is new Float;
```

Teraz:

```ada
Distance : Meters := 10.0;
Time     : Seconds := 5.0;
```

Nie możemy bezmyślnie zrobić:

```ada
Distance := Time;
```

ani:

```ada
Distance + Time
```

tylko dlatego, że oba są reprezentowane jako liczby zmiennoprzecinkowe.

---

# Dlaczego to jest świetne?

Wyobraź sobie:

```text
meters
feet
seconds
milliseconds
volts
amps
degrees
radians
```

Dla CPU wszystko może być liczbą.

Dla programu:

```text
10 metrów + 5 sekund
```

nie ma sensu.

Ada pozwala zakodować tę wiedzę w systemie typów.

---

# Jawne konwersje

Jeżeli naprawdę chcesz zamienić jeden typ na drugi, robisz to jawnie.

```ada
type Celsius is new Float;
type Fahrenheit is new Float;

C : Celsius := 20.0;
F : Fahrenheit;

F := Fahrenheit (C);
```

Nie oznacza to oczywiście automatycznego przeliczenia skali temperatury.

To tylko jawna konwersja reprezentacji.

Właściwe przeliczenie trzeba napisać samemu.

---

# Typ wyliczeniowy

```ada
type Traffic_Light is
  (Red,
   Yellow,
   Green);
```

Zmienna:

```ada
Light : Traffic_Light := Red;
```

Nie przechowujemy magicznej liczby:

```text
0
1
2
```

Program operuje domenowymi wartościami.

---

# `case`

Typy wyliczeniowe świetnie współpracują z:

```ada
case
```

Przykład:

```ada
case Light is
   when Red =>
      Stop;

   when Yellow =>
      Prepare;

   when Green =>
      Go;
end case;
```

Kompilator wymaga obsłużenia wszystkich możliwości.

To bardzo cenna właściwość.

Jeżeli później dodamy:

```ada
Blinking_Yellow
```

kompilator może wskazać miejsca, które trzeba zaktualizować.

---

# Podtypy

Typ:

```ada
Integer
```

jest ogromnym zbiorem wartości.

Czasem domena dopuszcza tylko fragment.

Przykład:

```ada
subtype Percentage is Integer range 0 .. 100;
```

Teraz:

```ada
Progress : Percentage := 75;
```

ma jasno opisane ograniczenie.

---

# Podtyp nie jest nowym typem

To ważne.

```ada
subtype Percentage is Integer range 0 .. 100;
```

tworzy ograniczony widok typu `Integer`.

Natomiast:

```ada
type Percentage is range 0 .. 100;
```

tworzy nowy typ całkowity.

To dwa różne mechanizmy.

---

# Sprawdzanie zakresów

Przykład:

```ada
subtype Percentage is Integer range 0 .. 100;

P : Percentage;
X : Integer := 120;

begin
   P := X;
```

Jeżeli podczas działania wartość nie mieści się w zakresie, zostanie wykonany runtime check.

Może zostać zgłoszony:

```text
Constraint_Error
```

Ada domyślnie wykonuje wiele takich kontroli.

---

# Błąd wykryty wcześniej

Jeżeli kompilator może udowodnić już podczas kompilacji, że statyczna wartość łamie ograniczenie:

```ada
P : Percentage := 150;
```

może zgłosić problem jeszcze przed uruchomieniem programu.

To dokładnie filozofia Ady:

```text
wykryj błąd tak wcześnie, jak się da
```

---

# Zakres jako część modelu

Zamiast:

```ada
Temperature : Integer;
```

możemy napisać:

```ada
subtype Engine_Temperature is Integer range -40 .. 150;

Temperature : Engine_Temperature;
```

Kod sam dokumentuje:

> legalne temperatury w tym modelu to -40..150.

To więcej niż komentarz.

Kompilator i runtime mogą wykorzystać tę informację.

---

# Typ modularny

Ada posiada typy modularne.

Przykład 8-bitowej wartości:

```ada
type Byte is mod 2 ** 8;
```

Zakres:

```text
0..255
```

Po przepełnieniu wynik zawija się modulo 256.

Przykład:

```ada
B : Byte := 255;

B := B + 1;
```

wynik:

```text
0
```

To bardzo przydatne w:

- embedded,
- kryptografii,
- pracy bitowej,
- protokołach.

---

# Operacje bitowe na typach modularnych

Możemy używać operacji:

```ada
and
or
xor
not
```

Przykład:

```ada
type Byte is mod 2 ** 8;

A : Byte := 16#F0#;
B : Byte := 16#0F#;
C : Byte;

C := A xor B;
```

Wynik:

```text
16#FF#
```

---

# Zapis liczb w innych podstawach

Ada ma bardzo czytelny zapis liczb.

Hex:

```ada
16#FF#
```

Binarnie:

```ada
2#1111_0000#
```

Ósemkowo:

```ada
8#377#
```

Podkreślenia poprawiają czytelność:

```ada
1_000_000
```

---

# Floating point

Możemy definiować własne typy zmiennoprzecinkowe.

```ada
type Real is digits 12;
```

`digits` określa wymaganą precyzję dziesiętną.

To inny model niż bezpośrednie:

```text
float32
float64
```

znane z wielu języków.

---

# Fixed point

Ada ma natywne typy fixed-point.

Przykład:

```ada
type Money is delta 0.01 digits 12;
```

Taki typ jest przydatny, gdy chcemy kontrolować krok reprezentacji.

W finansach nie zawsze chcemy polegać na typowym floating point.

---

# Typy fizyczne? Nie bezpośrednio, ale...

Ada nie posiada w standardzie automatycznego systemu jednostek SI.

Ale silne typowanie pozwala bardzo skutecznie tworzyć osobne typy:

```ada
type Meters      is new Float;
type Meters_Per_Second is new Float;
type Seconds     is new Float;
```

i definiować tylko operacje, które mają sens.

---

# Atrybuty

Ada ma bardzo potężny mechanizm:

```text
attributes
```

Zapisywany apostrofem:

```ada
Type'Attribute
```

Przykłady:

```ada
Integer'First
Integer'Last
```

zwracają granice typu.

---

# `'First` i `'Last`

```ada
subtype Score is Integer range 0 .. 100;
```

Możemy użyć:

```ada
Score'First
```

czyli:

```text
0
```

oraz:

```ada
Score'Last
```

czyli:

```text
100
```

Kod nie musi powtarzać magicznych wartości.

---

# `'Range`

Dla tablicy:

```ada
for I in Values'Range loop
   ...
end loop;
```

Zamiast:

```ada
for I in 1 .. 100 loop
```

program automatycznie dostosuje się do rzeczywistego zakresu tablicy.

To jeden z najprzyjemniejszych elementów Ady.

---

# `'Length`

```ada
Values'Length
```

zwraca długość tablicy.

---

# `'Image`

```ada
Integer'Image (42)
```

tworzy tekstową reprezentację wartości.

Przykład:

```ada
Put_Line (Integer'Image (42));
```

W nowych wersjach Ady mechanizm obrazowania został mocno rozbudowany.

---

# `'Value`

Odwrotność:

```ada
Integer'Value ("42")
```

zwraca liczbę:

```text
42
```

Jeżeli tekst nie reprezentuje poprawnej wartości, może zostać zgłoszony wyjątek.

---

# Instrukcja `if`

```ada
if Temperature > 100 then
   Put_Line ("Too hot");
end if;
```

---

# `elsif`

Ada używa:

```ada
elsif
```

nie:

```text
else if
elseif
elif
```

Przykład:

```ada
if X < 0 then
   Put_Line ("Negative");

elsif X = 0 then
   Put_Line ("Zero");

else
   Put_Line ("Positive");
end if;
```

---

# Boolean

Operatory logiczne:

```ada
and
or
xor
not
```

Ada posiada też:

```ada
and then
or else
```

które wykonują short-circuit evaluation.

Przykład:

```ada
if Ptr /= null and then Ptr.all > 0 then
   ...
end if;
```

Drugi warunek nie zostanie wykonany, jeżeli pierwszy jest fałszywy.

---

# Pętla nieskończona

```ada
loop
   Do_Something;
end loop;
```

---

# `exit`

```ada
loop
   exit when Finished;
   Work;
end loop;
```

Bardzo czytelny zapis.

---

# `while`

```ada
while Count > 0 loop
   Count := Count - 1;
end loop;
```

---

# `for`

```ada
for I in 1 .. 10 loop
   Put_Line (Integer'Image (I));
end loop;
```

Zmienna `I` jest tworzona automatycznie.

Nie deklarujemy jej wcześniej.

---

# `reverse`

```ada
for I in reverse 1 .. 10 loop
   ...
end loop;
```

Wykonuje iterację w odwrotnej kolejności.

---

# Pętla po tablicy

```ada
for I in Values'Range loop
   Values (I) := 0;
end loop;
```

Nie musimy znać indeksu początkowego.

To ważne, bo Ada nie wymaga, aby tablica zaczynała się od:

```text
0
```

ani nawet:

```text
1
```

---

# Tablice z własnym indeksem

```ada
type Day is
  (Monday,
   Tuesday,
   Wednesday,
   Thursday,
   Friday,
   Saturday,
   Sunday);

type Temperatures is array (Day) of Float;
```

Teraz:

```ada
T : Temperatures;

T (Monday) := 20.0;
T (Friday) := 25.0;
```

Indeksem jest:

```text
Day
```

a nie liczba.

To bardzo Ada.

---

# Tablice o nieustalonym rozmiarze

Możemy zadeklarować typ:

```ada
type Integer_Array is array (Positive range <>) of Integer;
```

`<>` oznacza:

> zakres zostanie określony później.

Potem:

```ada
A : Integer_Array (1 .. 10);
B : Integer_Array (100 .. 200);
```

To ten sam typ tablicy z różnymi bounds.

---

# Tablice wielowymiarowe

```ada
type Matrix is
  array (Positive range <>,
         Positive range <>) of Float;
```

Przykład:

```ada
M : Matrix (1 .. 3, 1 .. 3);
```

Dostęp:

```ada
M (2, 3)
```

---

# String jest tablicą

Standardowy:

```ada
String
```

jest tablicą znaków.

Przykład:

```ada
Name : String (1 .. 5) := "Ada!!";
```

I tu pojawia się ważna cecha.

Standardowy `String` ma określony rozmiar.

---

# Pułapka String

```ada
Name : String := "Ada";
```

tworzy string długości:

```text
3
```

Nie możesz potem zrobić po prostu:

```ada
Name := "Ada Lovelace";
```

bo nowy tekst ma inną długość.

To częste zaskoczenie dla ludzi przychodzących z Pythona.

---

# Unbounded_String

Do dynamicznych tekstów służy między innymi:

```text
Ada.Strings.Unbounded
```

Przykład:

```ada
with Ada.Strings.Unbounded;

procedure Example is
   use Ada.Strings.Unbounded;

   Name : Unbounded_String :=
     To_Unbounded_String ("Ada");

begin
   Name := Name & " Lovelace";
end Example;
```

---

# Rekordy

Odpowiednik struktury danych:

```ada
type Point is record
   X : Float;
   Y : Float;
end record;
```

Obiekt:

```ada
P : Point :=
  (X => 10.0,
   Y => 20.0);
```

Dostęp:

```ada
P.X
P.Y
```

---

# Named aggregates

Ada bardzo lubi jawne nazwy pól.

```ada
P :=
  (X => 10.0,
   Y => 20.0);
```

To czytelniejsze niż poleganie wyłącznie na kolejności:

```text
(10.0, 20.0)
```

Przy dużych rekordach znacząco redukuje ryzyko pomyłki.

---

# `others`

Możemy ustawić pozostałe pola:

```ada
Config :=
  (Enabled => True,
   others  => <>);
```

Dokładne znaczenie `<>` zależy od kontekstu i wartości domyślnych.

---

# Discriminated records

Ada pozwala tworzyć rekordy, których struktura zależy od discriminant.

Przykład:

```ada
type Shape_Kind is
  (Circle,
   Rectangle);

type Shape
  (Kind : Shape_Kind := Circle)
is record
   case Kind is
      when Circle =>
         Radius : Float := 0.0;

      when Rectangle =>
         Width  : Float := 0.0;
         Height : Float := 0.0;
   end case;
end record;
```

To bezpieczniejszy model wariantów danych niż ręczne uniony znane z C.

---

# Funkcja

```ada
function Add
  (A : Integer;
   B : Integer)
   return Integer
is
begin
   return A + B;
end Add;
```

Użycie:

```ada
Result := Add (10, 20);
```

---

# Procedura

Procedura nie musi zwracać wartości.

```ada
procedure Greet (Name : String) is
begin
   Put_Line ("Hello " & Name);
end Greet;
```

Wywołanie:

```ada
Greet ("Ada");
```

---

# Parametry `in`
Domyślny tryb parametrów skalarnych to:

```ada
in
```

Przykład:

```ada
procedure Show (X : in Integer);
```

Procedura traktuje parametr jako wejście.

---

# `out`

```ada
procedure Get_Result
  (Result : out Integer);
```

Parametr służy do przekazania wyniku na zewnątrz.

---

# `in out`

```ada
procedure Increment
  (X : in out Integer)
is
begin
   X := X + 1;
end Increment;
```

Wywołanie:

```ada
Value : Integer := 10;

Increment (Value);
```

Po operacji:

```text
Value = 11
```

---

# Czytelność wywołań

Możemy wywołać:

```ada
Move
  (X     => 10,
   Y     => 20,
   Speed => 5);
```

zamiast:

```ada
Move (10, 20, 5);
```

Named parameters są bardzo przydatne przy funkcjach z wieloma argumentami tego samego typu.

---

# Wartości domyślne parametrów

```ada
procedure Log
  (Message : String;
   Level   : Natural := 1);
```

Możemy wywołać:

```ada
Log ("Started");
```

lub:

```ada
Log
  (Message => "Failed",
   Level   => 3);
```

---

# Przeciążanie

Ada obsługuje overload.

```ada
procedure Print (X : Integer);
procedure Print (X : Float);
procedure Print (X : String);
```

Kompilator wybiera wersję na podstawie typów.

---

# Operator jako funkcja

Operatory również mogą być przeciążane.

Możemy zdefiniować działanie:

```ada
"+"
```

dla własnych typów.

To przydatne w typach domenowych:

```text
Vector
Matrix
Distance
Money
```

---

# Packages

Jednym z fundamentów dużych programów Ada są:

```text
packages
```

Pakiet zwykle ma:

```text
specification
body
```

Plik specyfikacji:

```text
.ads
```

Plik implementacji:

```text
.adb
```

---

# Specification

`calculator.ads`:

```ada
package Calculator is

   function Add
     (A : Integer;
      B : Integer)
      return Integer;

end Calculator;
```

To publiczny interfejs.

---

# Body

`calculator.adb`:

```ada
package body Calculator is

   function Add
     (A : Integer;
      B : Integer)
      return Integer
   is
   begin
      return A + B;
   end Add;

end Calculator;
```

---

# Program używający pakietu

`main.adb`:

```ada
with Ada.Text_IO;
with Calculator;

procedure Main is
   Result : Integer;
begin
   Result := Calculator.Add (10, 20);

   Ada.Text_IO.Put_Line
     (Integer'Image (Result));
end Main;
```

Kompilator widzi zależność przez:

```ada
with Calculator;
```

---

# Specyfikacja jako kontrakt

To ważny element filozofii Ady.

Klient pakietu powinien potrzebować przede wszystkim:

```text
.ads
```

a nie implementacji:

```text
.adb
```

Specyfikacja mówi:

- jakie typy istnieją,
- jakie operacje są dostępne,
- jakie są parametry,
- jakie są kontrakty.

Implementacja może się zmieniać bez zmiany użytkowników pakietu.

---

# Private types

Możemy ukryć implementację typu.

`accounts.ads`:

```ada
package Accounts is

   type Account is private;

   function Balance
     (A : Account)
      return Integer;

private

   type Account is record
      Current_Balance : Integer := 0;
   end record;

end Accounts;
```

Kod poza pakietem wie, że istnieje:

```text
Account
```

ale nie zna jego wewnętrznej reprezentacji.

---

# Limited private

Jeszcze silniejsze ograniczenie:

```ada
type Device is limited private;
```

Klient nie może swobodnie kopiować wartości.

To przydatne dla obiektów reprezentujących:

- uchwyty,
- urządzenia,
- mutexy,
- zasoby systemowe.

---

# Child packages

Ada ma hierarchiczne nazwy bibliotek.

Przykład:

```text
Network
Network.HTTP
Network.HTTP.Client
Network.HTTP.Server
```

To naturalny sposób organizowania dużych systemów.

---

# Generyki

Ada posiada potężny system:

```text
generics
```

Przykład generycznej procedury swap.

```ada
generic
   type T is private;

procedure Generic_Swap
  (A : in out T;
   B : in out T);
```

Body:

```ada
procedure Generic_Swap
  (A : in out T;
   B : in out T)
is
   Temp : T := A;
begin
   A := B;
   B := Temp;
end Generic_Swap;
```

Instancja:

```ada
procedure Swap_Integer is
  new Generic_Swap (Integer);
```

Teraz mamy typowaną wersję dla:

```text
Integer
```

---

# Kontenery

Standardowa biblioteka Ady posiada kontenery.

Przykłady:

```text
Ada.Containers.Vectors
Ada.Containers.Doubly_Linked_Lists
Ada.Containers.Hashed_Maps
Ada.Containers.Ordered_Maps
Ada.Containers.Hashed_Sets
Ada.Containers.Ordered_Sets
```

Wiele z nich jest generycznych.

---

# Vector

Przykład:

```ada
with Ada.Containers.Vectors;

procedure Example is

   package Integer_Vectors is
     new Ada.Containers.Vectors
       (Index_Type   => Natural,
        Element_Type => Integer);

   V : Integer_Vectors.Vector;

begin
   V.Append (10);
   V.Append (20);
   V.Append (30);
end Example;
```

---

# Access types

Ada posiada odpowiednik wskaźników:

```text
access types
```

Przykład:

```ada
type Integer_Access is
  access all Integer;

X : aliased Integer := 10;
P : Integer_Access := X'Access;
```

Dostęp do wartości:

```ada
P.all
```

---

# `null`

Access value może być:

```ada
null
```

Przed dereferencją należy mieć pewność, że wskaźnik jest poprawny.

---

# Dlaczego Ada nie traktuje wskaźników lekko?

Wskaźniki są jedną z głównych przyczyn błędów w językach niskopoziomowych.

Ada daje do nich dostęp, ale:

- wymaga jawnych typów access,
- wykonuje kontrole,
- mocno rozróżnia typy,
- posiada zasady accessibility,
- pozwala ograniczyć ich użycie.

W kodzie high-integrity często świadomie ogranicza się dynamiczną alokację.

---

# Unchecked_Access i Unsafe World

Ada pozwala ominąć część zabezpieczeń.

Istnieją mechanizmy w rodzaju:

```text
Unchecked_Access
Unchecked_Conversion
Unchecked_Deallocation
```

Słowo:

```text
Unchecked
```

jest bardzo uczciwe.

Język mówi:

> możesz to zrobić, ale właśnie wychodzisz poza normalny model bezpieczeństwa.

---

# Wyjątki

Ada posiada wbudowany system wyjątków.

Przykład:

```ada
begin
   Dangerous_Operation;

exception
   when Constraint_Error =>
      Put_Line ("Constraint failed");

   when others =>
      Put_Line ("Unknown error");
end;
```

---

# Standardowe wyjątki

Typowe:

```text
Constraint_Error
Program_Error
Storage_Error
Tasking_Error
```

---

# Własny wyjątek

```ada
Invalid_Temperature : exception;
```

Rzucenie:

```ada
raise Invalid_Temperature;
```

Możemy również dodać komunikat:

```ada
raise Invalid_Temperature
  with "Temperature outside allowed range";
```

---

# Constraint_Error nie jest tylko błędem

Przykład:

```ada
subtype Percentage is Integer range 0 .. 100;
```

Próba przypisania wartości:

```text
150
```

może zakończyć się:

```text
Constraint_Error
```

To celowe zabezpieczenie semantyki programu.

Język nie chce udawać, że:

```text
150%
```

jest poprawną wartością typu, który zdefiniowaliśmy jako:

```text
0..100
```

---

# Runtime checks

Ada może sprawdzać podczas działania między innymi:

- zakresy,
- indeksy tablic,
- dzielenie przez zero,
- overflow w określonych sytuacjach,
- poprawność access values,
- kontrakty.

To zwiększa szansę wykrycia błędu blisko miejsca, gdzie naprawdę powstał.

---

# Array bounds

W C:

```c
int a[10];
a[100] = 5;
```

może prowadzić do undefined behavior.

Ada:

```ada
A : array (1 .. 10) of Integer;

A (100) := 5;
```

jest naruszeniem zakresu.

Runtime może zgłosić:

```text
Constraint_Error
```

---

# Design by Contract

Jedna z najciekawszych cech współczesnej Ady.

Możemy opisać:

```text
co musi być prawdą przed wywołaniem
```

i:

```text
co ma być prawdą po wykonaniu
```

---

# Precondition

```ada
procedure Withdraw
  (Balance : in out Natural;
   Amount  : Positive)
with
  Pre => Amount <= Balance;
```

To mówi:

> `Withdraw` wolno wywołać tylko wtedy, gdy Amount nie przekracza Balance.

---

# Postcondition

```ada
procedure Withdraw
  (Balance : in out Natural;
   Amount  : Positive)
with
  Pre  => Amount <= Balance,
  Post => Balance =
            Balance'Old - Amount;
```

`Balance'Old` oznacza:

```text
wartość Balance sprzed wywołania
```

Kontrakt mówi więc:

> po wykonaniu saldo musi być równe stare saldo minus wypłata.

---

# Implementacja

```ada
procedure Withdraw
  (Balance : in out Natural;
   Amount  : Positive)
with
  Pre  => Amount <= Balance,
  Post => Balance =
            Balance'Old - Amount
is
begin
   Balance := Balance - Amount;
end Withdraw;
```

Interfejs i zachowanie są powiązane formalnie.

---

# Włączenie assertion checks w GNAT

Przy klasycznej kompilacji GNAT można włączyć sprawdzanie assertions opcją:

```bash
-gnata
```

Przykład:

```bash
gnatmake -gnata main.adb
```

Wtedy preconditions, postconditions i assertions mogą być sprawdzane podczas działania.

---

# `pragma Assert`

```ada
pragma Assert (Balance >= 0);
```

Jeżeli warunek nie jest spełniony, assertion zgłasza problem.

Assertions świetnie dokumentują założenia programu.

---

# Subtype predicates

Możemy opisać dodatkową własność wartości.

```ada
subtype Even_Integer is Integer
with
  Dynamic_Predicate =>
    Even_Integer mod 2 = 0;
```

Obiekt:

```ada
X : Even_Integer;
```

ma reprezentować tylko liczby parzyste.

---

# Static_Predicate

Dla warunków możliwych do statycznej analizy istnieje:

```text
Static_Predicate
```

Przykład:

```ada
subtype Day_Number is Integer
  with Static_Predicate =>
    Day_Number in 1 .. 31;
```

W praktyce prosty zakres lepiej oczywiście zapisać zwykłym:

```ada
range
```

Predicates są ciekawsze przy bardziej złożonych zbiorach wartości.

---

# Type invariants

Typ prywatny może definiować właściwość, która ma pozostać prawdziwa.

Idea:

```text
Balance nigdy nie jest ujemne
Start <= End
Lista zachowuje spójność
```

Invariant jest bardziej formalnym odpowiednikiem:

> obiekt tego typu zawsze powinien być poprawny.

---

# Dlaczego kontrakt jest lepszy od komentarza?

Komentarz:

```ada
-- Amount should not exceed Balance
```

kompilator ignoruje.

Kontrakt:

```ada
with Pre => Amount <= Balance
```

może być:

- czytany przez człowieka,
- sprawdzany runtime,
- analizowany statycznie,
- formalnie dowodzony przez GNATprove.

To ogromna różnica.

---

# SPARK

Teraz dochodzimy do rzeczy, z której Ada jest szczególnie znana.

SPARK jest podzbiorem Ady oraz zestawem narzędzi umożliwiających formalną analizę kodu.

Główne narzędzie:

```text
GNATprove
```

---

# Co znaczy „formalna weryfikacja”?

Test mówi:

```text
dla tych danych program zachował się poprawnie
```

Formalny dowód próbuje wykazać:

```text
dla wszystkich wartości spełniających założenia określona właściwość jest prawdziwa
```

To nie jest magiczne:

```text
prove program is perfect
```

Dowodzimy konkretnych właściwości.

---

# Przykład

```ada
procedure Increment
  (X : in out Integer)
with
  Pre  => X < Integer'Last,
  Post => X = X'Old + 1;
```

Precondition mówi:

```text
X nie może być już maksymalnym Integer
```

bo:

```text
X + 1
```

spowodowałoby overflow.

Postcondition mówi:

```text
wynik jest dokładnie o 1 większy
```

---

# GNATprove

GNATprove może analizować:

- przepływ danych,
- inicjalizację,
- możliwość runtime errors,
- preconditions,
- postconditions,
- assertions,
- zależności danych.

Przykładowe polecenie:

```bash
gnatprove
```

W prawdziwym projekcie zwykle uruchamiamy je w kontekście pliku projektu GPR.

---

# Flow analysis

SPARK analizuje między innymi:

- czy zmienna została zainicjalizowana,
- czy przypisanie jest używane,
- jakie dane funkcja czyta,
- jakie dane modyfikuje.

To może znaleźć problemy bez wykonywania programu.

---

# Absence of Run-Time Errors

Jednym z bardzo ważnych celów proof jest:

```text
AoRTE
```

czyli:

```text
Absence of Run-Time Errors
```

Możemy próbować dowieść, że kod nie spowoduje np.:

- dzielenia przez zero,
- wyjścia poza tablicę,
- overflow,
- naruszenia zakresu.

---

# Test kontra proof

Załóżmy:

```ada
function Divide
  (A : Integer;
   B : Integer)
   return Integer
is
begin
   return A / B;
end Divide;
```

Testy mogą sprawdzić:

```text
10 / 2
20 / 5
0 / 1
```

Ale mogą nie sprawdzić:

```text
B = 0
```

Proof spróbuje wykazać, czy dzielenie jest bezpieczne dla **wszystkich dopuszczalnych wejść**.

---

# Dodajemy precondition

```ada
function Divide  (A : Integer;
   B : Integer)
   return Integer
with
  Pre => B /= 0;
```

Teraz wymaganie jest jawne.

GNATprove może analizować każde miejsce wywołania i sprawdzać:

> czy caller potrafi udowodnić, że B nie jest zerem?

---

# To zmienia sposób projektowania API

Zamiast pisać defensywnie wszędzie:

```text
if bad input
   return error
```

możemy określić:

```text
legalne warunki użycia funkcji
```

i wymagać ich od klienta.

Nie znaczy to, że każda aplikacja powinna porzucić obsługę błędnego wejścia użytkownika.

Kontrakty opisują granice między komponentami i odpowiedzialności.

---

# Instalacja GNATprove przez Alire

W projekcie Alire możemy dodać:

```bash
alr with gnatprove
```

Alire pobierze właściwe narzędzie, jeżeli dostępny jest build dla platformy.

Potem można wykonać narzędzie w środowisku projektu.

Przykład:

```bash
alr exec -- gnatprove
```

---

# `SPARK_Mode`

Kod może jawnie deklarować użycie SPARK.

Przykład:

```ada
package Math
with
  SPARK_Mode => On
is
   ...
end Math;
```

Możemy też kontrolować SPARK_Mode na poziomie różnych jednostek.

Pozwala to mieszać:

```text
pełną Adę
+
weryfikowany kod SPARK
```

w jednym systemie.

---

# Nie wszystko musi być SPARK

To bardzo praktyczne.

Przykładowy system może mieć:

```text
UI          - Ada
network     - Ada
driver      - Ada
core logic  - SPARK
```

Najbardziej krytyczna część otrzymuje silniejsze gwarancje.

Nie trzeba formalnie dowodzić całego świata.

---

# Tasking

Ada posiada współbieżność jako część języka.

Nie jako zewnętrzną bibliotekę.

Podstawowa jednostka:

```text
task
```

---

# Najprostszy task

```ada
with Ada.Text_IO;
use Ada.Text_IO;

procedure Demo is

   task Worker;

   task body Worker is
   begin
      Put_Line ("Worker");
   end Worker;

begin
   Put_Line ("Main");
end Demo;
```

`Worker` może wykonywać się współbieżnie z kodem głównym.

---

# Dlaczego to było wyjątkowe?

Ada 83 już posiadała natywny model współbieżności.

W epoce, gdy wiele języków traktowało concurrency jako bibliotekę lub systemowe rozszerzenie, Ada miała:

```text
tasking
```

w specyfikacji języka.

---

# Rendezvous

Tasks mogą komunikować się przez:

```text
entries
```

Przykład ideowy:

```ada
task Server is
   entry Send (Value : Integer);
end Server;
```

Klient:

```ada
Server.Send (42);
```

Task może zaakceptować:

```ada
accept Send
  (Value : Integer)
do
   ...
end Send;
```

To synchronizowany rendezvous.

---

# Protected objects

Do synchronizacji współdzielonych danych Ada posiada:

```text
protected objects
```

To bardzo ważny mechanizm.

Przykład:

```ada
protected Counter is

   procedure Increment;
   function Value return Natural;

private

   Count : Natural := 0;

end Counter;
```

Body:

```ada
protected body Counter is

   procedure Increment is
   begin
      Count := Count + 1;
   end Increment;

   function Value return Natural is
   begin
      return Count;
   end Value;

end Counter;
```

Ada zapewnia odpowiednią synchronizację dostępu.

---

# Dlaczego nie zwykły mutex?

Możesz myśleć o protected object jako o:

```text
dane + dozwolone operacje + synchronizacja
```

w jednym językowym mechanizmie.

To ogranicza możliwość przypadkowego używania locka w niewłaściwy sposób.

---

# Real-time

Ada ma rozbudowane mechanizmy dla systemów czasu rzeczywistego.

Pakiet:

```text
Ada.Real_Time
```

udostępnia między innymi monotoniczny zegar odpowiedni do planowania czasowego.

Przykład ideowy:

```ada
delay until Next_Time;
```

zamiast:

```text
śpij mniej więcej 10 ms
```

To ważne przy cyklicznych zadaniach.

---

# Ravenscar

Ada posiada profil:

```text
Ravenscar
```

ograniczający tasking do podzbioru łatwiejszego do analizy w systemach real-time i high-integrity.

Ada 2022 posiada również bardziej elastyczny profil:

```text
Jorvik
```

Idea jest bardzo Ada:

> ogranicz część języka, aby uzyskać bardziej przewidywalny system.

---

# Representation clauses

Ada pozwala bardzo precyzyjnie kontrolować fizyczny układ danych.

To niezwykle ważne w:

- embedded,
- protokołach,
- sterownikach,
- rejestrach sprzętowych.

---

# Rozmiar typu

Przykład:

```ada
type Byte is mod 2 ** 8;

for Byte'Size use 8;
```

Mówimy kompilatorowi, że reprezentacja ma mieć 8 bitów.

---

# Record representation

Przykład:

```ada
type Device_Register is record
   Enabled : Boolean;
   Ready   : Boolean;
   Error   : Boolean;
end record;
```

Możemy zdefiniować pozycje bitów:

```ada
for Device_Register use record
   Enabled at 0 range 0 .. 0;
   Ready   at 0 range 1 .. 1;
   Error   at 0 range 2 .. 2;
end record;
```

To bardzo mocne przy pracy ze sprzętem.

---

# Memory-mapped I/O

W embedded urządzenie może mieć rejestr pod konkretnym adresem.

Ada pozwala kontrolować:

- typ,
- adres,
- volatile,
- reprezentację.

Dzięki temu możemy pracować blisko sprzętu bez rezygnacji z systemu typów.

---

# `Volatile`

Jeżeli wartość może zmieniać się poza kontrolą programu:

```text
hardware register
DMA
interrupt
```

należy poinformować kompilator.

Ada posiada aspekt:

```ada
Volatile
```

Przykład:

```ada
Status : Interfaces.Unsigned_32
with
  Volatile;
```

---

# `Atomic`

Ada posiada również mechanizm:

```ada
Atomic
```

do określania atomowego dostępu do obiektów, jeśli implementacja to wspiera zgodnie z regułami języka.

---

# Import C

Ada może współpracować z C.

Przykład:

```ada
procedure C_Function
with
  Import,
  Convention    => C,
  External_Name => "c_function";
```

To mówi:

> implementacja tej procedury znajduje się poza Adą i używa konwencji C.

---

# Export do C

Możemy też wystawić funkcję Ada dla kodu C:

```ada
procedure Ada_Function
with
  Export,
  Convention    => C,
  External_Name => "ada_function";
```

To ważne w projektach mieszanych.

---

# `Interfaces.C`

Standardowa biblioteka zawiera:

```text
Interfaces.C
```

z typami odpowiadającymi typom języka C.

Na przykład:

```text
Interfaces.C.int
Interfaces.C.char
Interfaces.C.double
```

To dużo bezpieczniejsze niż zgadywanie rozmiarów.

---

# Ada i assembler

Ada może również współpracować z kodem niskopoziomowym.

Typowy system embedded może wyglądać:

```text
Ada/SPARK
    |
    +---- C library
    |
    +---- startup assembler
    |
    +---- hardware registers
```

Ada nie próbuje udawać, że sprzęt nie istnieje.

Próbuje pozwolić pracować z nim w bardziej kontrolowany sposób.

Zobacz:

[Assembler od podstaw](techhandbook:doc-060)

---

# Ada i C - najważniejsza różnica filozofii

C często mówi:

> programista wie, co robi.

Ada częściej mówi:

> niech programista opisze, co wolno zrobić, a kompilator i runtime pomogą tego pilnować.

C:

```c
int temperature;
```

Ada:

```ada
subtype Engine_Temperature is
  Integer range -40 .. 150;

Temperature : Engine_Temperature;
```

To pokazuje różnicę bardzo dobrze.

---

# Ada i Rust

Ada i Rust rozwiązują część podobnych problemów, ale ich filozofie są inne.

Rust bardzo mocno skupia się na:

- ownership,
- borrowing,
- bezpieczeństwie pamięci,
- concurrency safety.

Ada bardzo mocno skupia się na:

- semantyce typów,
- zakresach,
- kontraktach,
- runtime checks,
- real-time,
- high-integrity,
- formalnej weryfikacji przez SPARK.

Nie ma sensu pytać:

> który jest „lepszy”?

To różne narzędzia wyrosłe w innych epokach i z innych problemów.

---

# Ada i Go

Go mówi mniej więcej:

> język powinien być mały i prosty.

Ada mówi:

> język powinien pozwolić dokładnie opisać model systemu i jego ograniczenia.

Go ma mało konstrukcji.

Ada ma ich dużo.

Obie filozofie mogą prowadzić do czytelnego kodu, ale inną drogą.

---

# Ada i Pascal

Składniowo Ada odziedziczyła sporo ducha świata ALGOL/Pascal.

Widać:

```ada
begin
end
procedure
function
record
```

Ale Ada jest znacznie większym i bardziej przemysłowym językiem niż klasyczny Pascal.

---

# Ada i Python

Python:

```python
x = 10
```

Ada:

```ada
X : Integer := 10;
```

Python pozwala bardzo szybko eksperymentować.

Ada wymaga wcześniej powiedzieć więcej o danych.

To różnica priorytetów:

```text
szybkość tworzenia prototypu
vs
jawność modelu i ograniczeń
```

---

# Obsługa wejścia

Najprościej możemy użyć:

```text
Ada.Text_IO
```

Dla liczb istnieją wyspecjalizowane pakiety.

Przykład:

```ada
with Ada.Integer_Text_IO;
```

Potem:

```ada
Ada.Integer_Text_IO.Get (X);
```

---

# Generics w Text_IO

Ada posiada również generyczne pakiety IO dla własnych typów.

Możemy stworzyć tekstowe IO dla własnego typu liczbowego.

To bardzo elegancko współpracuje z systemem typów.

---

# Zgadnij liczbę 0-100

Czas na nasz standardowy test.

Użyjemy generycznego pakietu:

```text
Ada.Numerics.Discrete_Random
```

---

# Kod

Plik:

```text
guess.adb
```

```ada
with Ada.Text_IO;
with Ada.Numerics.Discrete_Random;

procedure Guess is

   subtype Guess_Range is
     Integer range 0 .. 100;

   package Random_Guess is
     new Ada.Numerics.Discrete_Random
       (Guess_Range);

   Generator : Random_Guess.Generator;
   Secret    : Guess_Range;

begin

   Random_Guess.Reset (Generator);
   Secret := Random_Guess.Random (Generator);

   Ada.Text_IO.Put_Line
     ("Zgadnij liczbe od 0 do 100.");

   loop

      Ada.Text_IO.Put ("Twoj strzal: ");

      declare

         Line  : constant String :=
           Ada.Text_IO.Get_Line;

         Guess_Value : Integer;

      begin

         Guess_Value := Integer'Value (Line);

         if Guess_Value not in Guess_Range then

            Ada.Text_IO.Put_Line
              ("Zakres to 0..100.");

         elsif Guess_Value < Secret then

            Ada.Text_IO.Put_Line
              ("Za malo!");

         elsif Guess_Value > Secret then

            Ada.Text_IO.Put_Line
              ("Za duzo!");

         else

            Ada.Text_IO.Put_Line
              ("Brawo!");

            exit;

         end if;

      exception

         when Constraint_Error =>

            Ada.Text_IO.Put_Line
              ("Podaj poprawna liczbe.");

      end;

   end loop;

end Guess;
```

---

# Kompilacja klasyczna

```bash
gnatmake guess.adb
```

Uruchomienie:

Linux/macOS:

```bash
./guess
```

Windows:

```powershell
.\guess.exe
```

---

# Co ciekawego jest w tej wersji?

Już w tak małym programie widzimy wiele cech Ady.

## Subtype

```ada
subtype Guess_Range is
  Integer range 0 .. 100;
```

Domena gry jest częścią kodu.

## Generyk

```ada
Ada.Numerics.Discrete_Random
```

instancjonujemy dokładnie dla:

```text
Guess_Range
```

Generator nie losuje „jakichś Integerów”.

Losuje wartość naszego konkretnego zakresu.

## Jawne wyjątki

Niepoprawny tekst:

```text
banana
```

w `Integer'Value` zgłosi:

```text
Constraint_Error
```

Obsługujemy go lokalnie.

## Membership

```ada
Guess_Value not in Guess_Range
```

jest niezwykle czytelne.

---

# Ten sam projekt w Alire

Tworzymy projekt:

```bash
alr init --bin ada_guess
```

Wchodzimy:

```bash
cd ada_guess
```

Wygenerowana struktura będzie podobna do:

```text
ada_guess/
├── alire.toml
├── ada_guess.gpr
└── src/
    └── ada_guess.adb
```

Wstawiamy kod do:

```text
src/ada_guess.adb
```

Budujemy:

```bash
alr build
```

Uruchamiamy:

```bash
alr run
```

---

# `alire.toml`

To manifest projektu.

Może zawierać między innymi:

```text
name
version
description
authors
licenses
dependencies
```

Bardzo podobna idea do:

```text
Cargo.toml
package.json
pyproject.toml
```

---

# Dodawanie biblioteki

Przykład:

```bash
alr with some_library
```

Alire dodaje zależność do projektu i rozwiązuje jej zależności.

---

# Szukanie bibliotek

```bash
alr search json
```

albo:

```bash
alr search http
```

Ekosystem jest oczywiście mniejszy niż npm czy PyPI, ale istnieje normalny współczesny katalog pakietów.

---

# Toolchain Alire

Możemy wybrać kompilator:

```bash
alr toolchain --select
```

Alire potrafi utrzymywać kilka toolchainów.

To świetne, jeśli różne projekty wymagają różnych wersji GNAT.

---

# GPRbuild

Większe projekty Ada często używają:

```text
GPR project files
```

Przykład:

```text
project My_App is
   for Source_Dirs use ("src");
   for Object_Dir use "obj";
   for Main use ("main.adb");
end My_App;
```

Plik:

```text
my_app.gpr
```

Budowanie:

```bash
gprbuild -P my_app.gpr
```

---

# Dlaczego oddzielny system projektów?

Duży projekt potrzebuje konfiguracji:

- źródeł,
- targetu,
- kompilatora,
- flag,
- bibliotek,
- języków,
- ścieżek,
- build modes.

GPRbuild może obsługiwać projekty wielojęzykowe.

---

# Debug build i release build

Możemy tworzyć różne scenariusze kompilacji.

Debug:

```text
checks
debug symbols
mniejsza optymalizacja
```
Release:

```text
optimizacja
świadomie dobrane checks
```

W Ada wyłączanie checks powinno być przemyślaną decyzją.

W projektach SPARK część checks można formalnie udowodnić jako niemożliwe do naruszenia.

---

# Debugger

GNAT współpracuje z:

```text
GDB
```

Przykład:

```bash
gdb ./program
```

Typowe komendy:

```text
break
run
next
step
print
backtrace
```

---

# GNAT Studio

AdaCore rozwija IDE:

```text
GNAT Studio
```

Jest mocno zintegrowane z:

- GNAT,
- GPRbuild,
- SPARK,
- debuggerem.

Nie jest jednak konieczne.

---

# Visual Studio Code

Ada ma rozszerzenia dla VS Code i Language Server.

Jeśli już pracujesz w VS Code, nie musisz zmieniać całego workflow.

W typowym projekcie:

```text
VS Code
+
Ada Language Server
+
Alire
+
GNAT
```

jest całkiem normalnym zestawem.

Zobacz:

[Visual Studio Code](techhandbook:doc-039)

---

# Formatowanie kodu

Ada ma bardzo charakterystyczny styl.

Przykład:

```ada
procedure Withdraw
  (Balance : in out Natural;
   Amount  : Positive)
is
begin
   Balance := Balance - Amount;
end Withdraw;
```

Kod jest zwykle pionowo rozłożony i bardzo jawny.

Nie chodzi o minimalizowanie liczby znaków.

Chodzi o czytelność.

---

# Nazewnictwo

Typowy styl:

```text
Engine_Temperature
Current_Balance
Read_Message
Maximum_Retry_Count
```

Ada bardzo dobrze wygląda z opisowymi nazwami.

W safety-critical software kilka dodatkowych znaków jest małym kosztem.

---

# Nie walcz z językiem

Jeżeli próbujesz pisać Adę dokładnie jak C:

```text
wszystko Integer
wszędzie access
wszędzie unchecked
brak zakresów
brak pakietów
brak kontraktów
```

tracisz większość jej wartości.

Ada działa najlepiej, gdy pozwolisz systemowi typów opisać problem.

---

# Przykład złego modelu

```ada
Mode : Integer;
```

Znaczenie:

```text
0 = off
1 = standby
2 = run
3 = emergency
```

Teraz legalne jest również:

```text
-500
42
999999
```

---

# Lepszy model

```ada
type Operating_Mode is
  (Off,
   Standby,
   Run,
   Emergency);

Mode : Operating_Mode := Off;
```

Nie da się przypadkiem ustawić:

```text
42
```

bo 42 nie jest trybem pracy.

---

# Jeszcze lepszy model domeny

```ada
type Celsius is
  range -273 .. 10_000;

type Pressure_Pascal is
  range 0 .. 1_000_000;

type Operating_Mode is
  (Off,
   Standby,
   Run,
   Emergency);
```

Program zaczyna mówić językiem domeny.

---

# Range checks jako dokumentacja

```ada
subtype Port_Number is
  Integer range 0 .. 65_535;
```

To jednocześnie:

- typ,
- dokumentacja,
- runtime constraint,
- informacja dla analizatora.

Komentarz byłby znacznie słabszy.

---

# Enumeration zamiast boolean

Czasem:

```ada
Enabled : Boolean;
```

jest wystarczające.

Ale czasem dwa stany to za mało.

Zamiast:

```ada
Is_Ready : Boolean;
```

może lepiej:

```ada
type Device_State is
  (Starting,
   Ready,
   Failed,
   Shutdown);
```

Model staje się bardziej precyzyjny.

---

# Named ranges

Zamiast:

```ada
for I in 0 .. 99 loop
```

lepiej często:

```ada
for I in Buffer'Range loop
```

Kod przestaje zależeć od konkretnego rozmiaru.

---

# Unconstrained parameters

Funkcja może przyjąć dowolny `String`.

```ada
procedure Print_Name
  (Name : String)
is
begin
   ...
end Print_Name;
```

Nie trzeba znać jego długości przy kompilacji procedury.

`Name'First`, `Name'Last`, `Name'Range` opisują konkretny obiekt.

---

# `declare` blocks

Ada pozwala otworzyć lokalny blok deklaracji:

```ada
declare

   X : Integer := 10;

begin

   Put_Line
     (Integer'Image (X));

end;
```

Zmienne istnieją tylko w tym zakresie.

To świetne do ograniczania scope.

---

# Nested procedures

Procedury mogą być zagnieżdżone.

```ada
procedure Main is

   procedure Helper is
   begin
      ...
   end Helper;

begin

   Helper;

end Main;
```

Helper może mieć dostęp do danych otaczającej procedury.

---

# Scope

Ada bardzo mocno kontroluje widoczność nazw.

To ważne w dużych systemach.

Mniej globalnego stanu oznacza mniej niespodzianek.

---

# Elaboracja

Pakiety Ady mogą mieć kod inicjalizacyjny.

Przykład:

```ada
package body Config is

begin

   Load_Config;

end Config;
```

Ten kod jest wykonywany podczas elaboracji jednostki.

Ada musi ustalić poprawną kolejność elaboracji zależności.

Stąd między innymi rola binder-a.

---

# Finalization

Ada ma mechanizmy kontrolowanej inicjalizacji i finalizacji obiektów.

Pakiet:

```text
Ada.Finalization
```

pozwala tworzyć typy z operacjami:

```text
Initialize
Adjust
Finalize
```

To odpowiednik części idei znanych z:

- RAII,
- destruktorów,
- resource management.

---

# Determinizm

Ada jest często wybierana tam, gdzie program musi zachowywać się przewidywalnie.

Nie oznacza to:

> każdy program Ada jest automatycznie deterministyczny.

Ale język i jego profile oferują mechanizmy sprzyjające analizowalności:

- zakresy,
- statyczne typowanie,
- kontrolowane tasking,
- real-time,
- ograniczenia języka,
- formalna analiza.

---

# Safety kontra security

To dwie różne rzeczy.

## Safety

Program nie może spowodować niebezpiecznego zachowania systemu.

Przykład:

```text
sterowanie pociągiem
autopilot
urządzenie medyczne
```

## Security

Program ma być odporny na celowe działania przeciwnika.

Przykład:

```text
atak sieciowy
złośliwe dane wejściowe
eskalacja uprawnień
```

Ada i SPARK są używane w obu kontekstach.

---

# Certification

Ada jest często spotykana w projektach podlegających rygorystycznym standardom.

Przykładowe domeny stosują standardy takie jak:

```text
DO-178C
EN 50128 / EN 50657
ISO 26262
IEC 61508
ECSS
```

Sam fakt użycia Ady nie certyfikuje programu.

Certyfikacji podlega proces, artefakty, narzędzia i dowody zgodności.

Język może jednak ułatwić osiąganie wymaganych właściwości.

---

# Nie istnieje magiczny bezpieczny język

Ada nie usuwa potrzeby:

- dobrego projektu,
- testów,
- code review,
- analizy wymagań,
- bezpiecznej architektury,
- właściwego procesu.

Można napisać zły program w Adzie.

Różnica polega na tym, że język daje dużo narzędzi utrudniających pewne klasy błędów.

---

# Dlaczego Ada nie podbiła całego świata?

Kilka powodów.

## Historia

Język długo kojarzył się z:

```text
wojskiem
kontraktami rządowymi
drogimi kompilatorami
```

## Rozmiar języka

Ada jest duża.

Ma dużo mechanizmów.

To może odstraszać ludzi szukających minimalistycznego języka.

## Ekosystem

Nie ma ekosystemu wielkości:

```text
npm
PyPI
Maven
```

## Rynek

Większość aplikacji webowych nie potrzebuje poziomu rygoru typowego dla avionics.

JavaScript wystarczy do wielu problemów.

---

# Ale Ada nie umarła

To bardzo ważne.

Ada nadal posiada:

- aktywny standard,
- GCC GNAT,
- Alire,
- GPRbuild,
- SPARK,
- GNATprove,
- biblioteki,
- współczesne IDE,
- projekty przemysłowe.

To język niszowy.

Nie martwy.

---

# Mały projekt domenowy

Załóżmy system baterii.

Zamiast:

```ada
Charge : Integer;
Voltage : Float;
Mode : Integer;
```

tworzymy:

```ada
subtype Charge_Percent is
  Integer range 0 .. 100;

type Volts is new Float;

type Battery_Mode is
  (Charging,
   Discharging,
   Idle,
   Fault);
```

Dane:

```ada
Charge  : Charge_Percent := 80;
Voltage : Volts := 12.5;
Mode    : Battery_Mode := Idle;
```

Kod od razu jest bardziej zrozumiały.

---

# Kontrakt baterii

```ada
procedure Consume
  (Charge : in out Charge_Percent;
   Amount : Positive)
with
  Pre => Amount <= Charge;
```

Nie musimy pisać komentarza:

```text
Amount cannot be larger than current charge
```

Warunek jest częścią programu.

---

# SPARK-owa wersja

Możemy dodać:

```ada
procedure Consume
  (Charge : in out Charge_Percent;
   Amount : Positive)
with
  Pre  => Amount <= Charge,
  Post => Charge =
            Charge'Old - Amount;
```

Teraz specyfikacja mówi również dokładnie, jaki ma być rezultat.

---

# Testowanie

Formal proof nie zastępuje wszystkich testów.

Test nadal sprawdza rzeczy takie jak:

- integracja,
- sprzęt,
- UI,
- zachowanie systemu,
- timing,
- biblioteki zewnętrzne,
- realne środowisko.

Najsilniejsze podejście często łączy:

```text
types
contracts
static analysis
formal proof
unit tests
integration tests
system tests
```

---

# AUnit

Ekosystem Ada posiada framework testowy:

```text
AUnit
```

Może być używany do klasycznych unit tests.

W Alire można wyszukać dostępne biblioteki testowe i dodać je jako zależność.

---

# `pragma Assert`

Do małych testów wystarczy czasem:

```ada
pragma Assert
  (Add (2, 3) = 5);
```

Przy włączonych assertions błąd będzie widoczny podczas uruchamiania.

---

# Fuzzing

Ada nie wyklucza fuzzingu.

Wręcz przeciwnie.

Runtime checks mogą sprawić, że błędne zachowanie zostanie wykryte jako jawny exception zamiast cichego uszkodzenia pamięci.

To może być bardzo użyteczne w testowaniu odporności.

---

# Wydajność

Ada jest językiem kompilowanym do kodu natywnego.

GNAT korzysta z infrastruktury GCC.

Nie ma fundamentalnego powodu, dla którego program Ada musi być wolny.

Koszt mogą dodawać:

- runtime checks,
- tasking,
- abstrakcje,
- konkretna implementacja.

Ale kompilator może również optymalizować wiele konstrukcji bardzo skutecznie.

---

# Checks kontra wydajność

Ada pozwala kontrolować checks.

Ale zasada powinna brzmieć:

> nie wyłączaj kontroli tylko dlatego, że możesz.

Najpierw:

1. zmierz,
2. znajdź problem,
3. zrozum konsekwencje,
4. ewentualnie użyj proof,
5. dopiero wtedy rozważ wyłączenie konkretnej kontroli.

---

# `pragma Suppress`

Ada posiada mechanizmy wyłączania części runtime checks.

Przykład:

```ada
pragma Suppress (Range_Check);
```

To potężne narzędzie.

I łatwy sposób na odebranie sobie części zalet Ady.

Używać tylko świadomie.

---

# Bezpieczeństwo pamięci

Ada posiada wiele mechanizmów chroniących pamięć:

- bounds checks,
- range checks,
- silne typy,
- kontrolowane access types,
- runtime checks.

Nie znaczy to jednak:

> Ada jest językiem całkowicie memory-safe w każdym możliwym programie.

Mechanizmy:

```text
Unchecked_*
address clauses
FFI
low-level system code
```

mogą ominąć część ochrony.

---

# `System.Address`

W niskopoziomowym kodzie możemy pracować z:

```text
System.Address
```

To świat fizycznych/logicznych adresów.

Powinien być używany tam, gdzie rzeczywiście jest potrzebny.

Nie jako zamiennik normalnego modelu typów.

---

# Embedded bez runtime?

Ada może być używana w bardzo małych środowiskach.

Istnieją runtime'y o różnych profilach:

- pełne,
- light,
- minimalne,
- bare metal.

To pozwala stosować język także tam, gdzie nie ma pełnego systemu operacyjnego.

---

# Cross compilation

Alire i GNAT mają toolchainy cross dla różnych targetów.

Typowe rodziny:

```text
ARM
RISC-V
AVR
```

Dzięki temu Ada może być używana bezpośrednio na mikrokontrolerach.

---

# Ada Drivers Library

W świecie embedded istnieją biblioteki i przykłady pokazujące bezpośrednią pracę z peryferiami MCU.

To dobry kolejny krok po opanowaniu języka.

---

# Gry i grafika

Ada nie jest pierwszym językiem, który przychodzi do głowy przy gamedevie.

Ale istnieją bindingi i biblioteki.

W Alire znajdziemy np. bindingi dla:

```text
raylib
SDL
OpenGL
```

Można więc napisać normalną prostą grę.

---

# Backend

Ada nadaje się również do serwerów.

Istnieją biblioteki:

- HTTP,
- sockets,
- TLS bindings,
- JSON,
- XML,
- bazy danych.

Ekosystem jest mniejszy niż Go czy Java, ale technicznie nie ma przeszkody, by stworzyć backend.

---

# CLI

CLI jest bardzo naturalnym zastosowaniem.

Pakiet:

```text
Ada.Command_Line
```

pozwala pobierać argumenty.

Przykład:

```ada
with Ada.Command_Line;

if Ada.Command_Line.Argument_Count > 0 then
   ...
end if;
```

---

# Pliki

Standardowa biblioteka oferuje operacje IO.

Między innymi:

```text
Ada.Text_IO
Ada.Sequential_IO
Ada.Direct_IO
Ada.Streams
```

W zależności od rodzaju danych.

---

# Streams

Streams pozwalają serializować i przesyłać wartości.

Ada ma językowe atrybuty związane ze strumieniami:

```text
'Read
'Write
'Input
'Output
```

To kolejny przykład, jak dużo mechanizmów integracyjnych język posiada w standardzie.

---

# Unicode

Ada 2022 definiuje szeroki model znaków zgodny z Unicode/ISO 10646.

W praktyce sposób kodowania plików i IO zależy również od implementacji i środowiska.

Nie należy zakładać, że każdy stary program Ada automatycznie działa jak współczesna biblioteka UTF-8.

---

# `Wide_Character` i `Wide_Wide_Character`

Ada posiada typy:

```text
Character
Wide_Character
Wide_Wide_Character
```

oraz odpowiadające typy stringów.

To element standardowej obsługi większych zestawów znaków.

---

# Dynamic allocation

Można używać:

```ada
new
```

Przykład:

```ada
type Node;
type Node_Access is access Node;

type Node is record
   Value : Integer;
   Next  : Node_Access;
end record;

P : Node_Access :=
  new Node'
    (Value => 10,
     Next  => null);
```

Ale w high-integrity i real-time dynamic allocation często jest ograniczana.

---

# Deterministyczna pamięć

W systemach czasu rzeczywistego chcemy wiedzieć:

```text
ile pamięci potrzebujemy
kiedy jest alokowana
ile trwa operacja
```

Dlatego często preferuje się:

- statyczną alokację,- pule pamięci,
- kontrolowane storage pools,
- ograniczone profile runtime.

---

# Storage pools

Ada pozwala kontrolować sposób alokacji obiektów access.

To zaawansowany temat, ale ważny dla embedded i real-time.

Można implementować własne:

```text
storage pools
```

zamiast polegać na ogólnym heapie.

---

# Generics kontra templates

Ada generics przypominają częściowo:

- C++ templates,
- Java generics,
- Rust generics.

Ale model jest inny.

W Ada generyk jawnie deklaruje, jakie właściwości formalnego typu lub funkcji są potrzebne.

To bardzo precyzyjny kontrakt kompilacyjny.

---

# Generic package

Przykład ideowy:

```ada
generic

   type Element_Type is private;

package Stack is

   procedure Push
     (Value : Element_Type);

   function Pop
     return Element_Type;

end Stack;
```

Potem:

```ada
package Integer_Stack is
  new Stack (Integer);
```

---

# OOP

Ada 95 dodała rozbudowany model programowania obiektowego.

Podstawą są:

```text
tagged types
```

Przykład:

```ada
type Shape is tagged record
   X : Float;
   Y : Float;
end record;
```

Możemy tworzyć rozszerzenia:

```ada
type Circle is new Shape with record
   Radius : Float;
end record;
```

---

# Dispatching

Operacje na tagged types mogą być dispatching operations.

To odpowiednik dynamicznego polimorfizmu znanego z języków OOP.

Ada nie wymaga jednak, aby cały program był zorganizowany obiektowo.

Możesz używać:

- proceduralnego stylu,
- pakietów,
- generyków,
- OOP,

tam, gdzie pasują.

---

# Interfaces

Ada posiada również interfejsy podobne ideowo do interfejsów Javy/C#.

Można budować hierarchie zachowań bez wymuszania jednej implementacji danych.

---

# Nie wszystko jest obiektem

To odróżnia Adę od Smalltalka czy części języków OOP.

Ada jest:

```text
multi-paradigm
```

Nie zmusza do klas jako podstawowej jednostki każdego programu.

---

# Operator overloading

Dla własnego typu:

```ada
type Vector is record
   X : Float;
   Y : Float;
end record;
```

możemy zdefiniować:

```ada
function "+"
  (Left  : Vector;
   Right : Vector)
   return Vector;
```

Dzięki temu:

```ada
C := A + B;
```

może mieć naturalne znaczenie domenowe.

---

# Syntactic noise?

Ada jest bardziej rozwlekła niż Go czy Python.

Przykład:

```ada
if X > 10 then
   Do_Something;
end if;
```

zamiast:

```c
if (x > 10) {
    doSomething();
}
```

Ale czytelnik widzi:

```text
koniec if
```

a nie tylko:

```text
}
```

Przy długich funkcjach ma to realną wartość.

---

# Czy Ada jest trudna?

Podstawy:

```text
nie
```

Duża część składni jest bardzo regularna.

Trudniejsze są:

- pełny system typów,
- access types,
- tasking,
- representation clauses,
- generics,
- SPARK,
- real-time,
- pełny standard.

Ale nie trzeba znać całej Ady, aby napisać przydatny program.

---

# Minimalny zestaw do zwykłej aplikacji

Wystarczy:

```text
procedures
functions
types
subtypes
arrays
records
packages
exceptions
containers
Alire
```

Reszta może przyjść później.

---

# Minimalny zestaw do embedded

Dodaj:

```text
modular types
representation clauses
volatile
address clauses
real-time
tasking/protected objects
cross compiler
```

---

# Minimalny zestaw do SPARK

Dodaj:

```text
Pre
Post
Global
Depends
SPARK_Mode
GNATprove
proof levels
loop invariants
```

---

# Loop invariants

Formalny proof pętli wymaga czasem powiedzenia proverowi, jaka własność pozostaje prawdziwa po każdej iteracji.

To:

```text
loop invariant
```

Przykład ideowy:

```ada
pragma Loop_Invariant
  (Sum >= 0);
```

W prawdziwym dowodzie invariant musi być wystarczająco precyzyjny, aby prover mógł udowodnić końcową właściwość.

---

# Prover nie czyta w myślach

To ważne.

Kod może być logicznie poprawny, ale GNATprove może nie mieć wystarczających informacji, by to automatycznie udowodnić.

Wtedy trzeba dostarczyć:

- kontrakt,
- invariant,
- lemma,
- mocniejszy typ,
- lepszą strukturę kodu.

Formalna weryfikacja jest współpracą:

```text
programista
+
specyfikacja
+
automatyczny prover
```

---

# Proof levels

GNATprove oferuje różne poziomy i tryby analizy.

Możemy wykonywać szybkie:

```text
flow/check
```

albo głębszy:

```text
prove
```

W dużym projekcie nie zawsze uruchamiamy najdroższy proof po każdej zmianie.

---

# False alarm kontra nieudowodniona właściwość

Jeżeli prover mówi:

```text
cannot prove
```

to nie zawsze znaczy:

```text
program na pewno ma błąd
```

Może znaczyć:

- błąd istnieje,
- kontrakt jest za słaby,
- prover potrzebuje dodatkowej informacji,
- konstrukcja jest trudna do automatycznego dowodu.

Natomiast udany proof konkretnej właściwości daje znacznie silniejszą gwarancję niż pojedynczy test.

---

# Kontrakt nie jest pełną specyfikacją świata

Jeżeli napiszesz zły kontrakt i poprawnie go udowodnisz, możesz nadal otrzymać program spełniający złą specyfikację.

Formalny proof odpowiada:

> czy implementacja spełnia to, co opisałeś?

Nie odpowiada automatycznie:

> czy to, co opisałeś, jest tym, czego naprawdę chciał klient?

---

# Przykład błędnej specyfikacji

Jeżeli wymaganie brzmi:

```text
saldo po wypłacie ma się zmniejszyć
```

a napiszesz:

```ada
Post => Balance = Balance'Old + Amount
```

prover może udowodnić implementację dodającą pieniądze.

Problem leży w specyfikacji.

Formal methods nie zastępują rozumienia domeny.

---

# Największa siła: warstwy zabezpieczeń

Ada działa najlepiej, gdy nakładamy wiele warstw:

```text
typ
+
zakres
+
kontrakt
+
runtime check
+
static analysis
+
proof
+
test
```

Nie każda aplikacja potrzebuje wszystkich.

Ale język daje możliwość ich użycia.

---

# Porównanie filozofii czterech języków

## C

```text
masz pełną kontrolę
uważaj
```

## Go

```text
dajmy mało mechanizmów
żeby kod pozostał prosty
```

## Rust

```text
ownership i borrow checker
mają wyeliminować całe klasy błędów pamięci
```

## Ada

```text
opisz dokładnie domenę,
ograniczenia i kontrakty,
a narzędzia będą ich pilnować
```

---

# Co Ada daje, czego łatwo nie docenić?

Największą wartością często nie jest pojedyncza funkcja języka.

Jest nią możliwość zapisania **intencji programisty w kodzie**.

Porównaj:

```ada
X : Integer;
```

z:

```ada
subtype Retry_Count is
  Integer range 0 .. 5;

Retries : Retry_Count := 0;
```

Drugi zapis mówi znacznie więcej.

---

# Kod jako model świata

Dobry program Ada próbuje odzwierciedlać domenę.

Zamiast:

```text
int
int
int
bool
```

mamy:

```text
Altitude
Airspeed
Temperature
Engine_State
Valve_Position
```

Kompilator może wtedy wychwycić mieszanie rzeczy, które przypadkiem mają ten sam fizyczny format.

---

# Czy warto uczyć się Ady w 2026?

Jeżeli celem jest:

```text
maksymalna liczba ofert frontendowych
```

nie.

TypeScript da lepszy zwrot.

Jeżeli interesują Cię:

- języki programowania,
- systemy,
- safety-critical,
- embedded,
- formal methods,
- silne systemy typów,
- projektowanie niezawodnego software,

Ada jest niezwykle ciekawa.

---

# Ada jako język edukacyjny

Ada uczy bardzo dobrych nawyków:

- nazywania typów,
- jawnych zakresów,
- projektowania API,
- myślenia o invariants,
- rozdzielenia specyfikacji od implementacji,
- kontrolowania side effects.

Nawet jeśli potem wrócisz do C, Go czy TypeScriptu, część tych nawyków zostanie.

---

# Mini-projekt do dalszej nauki

Dobrym projektem po zgadywance jest:

```text
symulator konta bankowego
```

Typy:

```ada
type Money is delta 0.01 digits 12;

subtype Percentage is
  Integer range 0 .. 100;
```

Operacje:

```text
Deposit
Withdraw
Transfer
Balance
```

Kontrakty:

```text
Amount > 0
Amount <= Balance
suma środków po transferze się nie zmienia
```

To świetne laboratorium dla:

```text
Ada + SPARK
```

---

# Drugi projekt: sterownik temperatury

Model:

```text
Temperature
Target_Temperature
Heater_State
Sensor_State
```

Zakresy:

```text
-40..150
```

Kontrakty:

```text
heater cannot turn on when sensor is failed
```

Protected object:

```text
shared sensor state
```

Periodic task:

```text
read every 100 ms
```

To już zaczyna przypominać prawdziwy system embedded.

---

# Trzeci projekt: C64? Tak

Po artykule assemblerowym można zrobić bardzo dziwny eksperyment:

```text
6502/C64 + Ada
```

Nie jest to najbardziej naturalny współczesny target GNAT, ale świetnie pokazuje różnicę filozofii:

Assembler:

```text
maksymalnie blisko hardware
```

Ada:

```text
maksymalnie dużo semantyki i kontroli
```

W praktyce sensowniejszym embedded targetem dla współczesnej Ady będzie:

```text
ARM
RISC-V
AVR
```

---

# Szybka ściąga składni

## Zmienna

```ada
X : Integer := 10;
```

## Stała

```ada
Max : constant Integer := 100;
```

## Typ

```ada
type Meters is new Float;
```

## Podtyp

```ada
subtype Percentage is
  Integer range 0 .. 100;
```

## Enumeration

```ada
type State is
  (Off, On, Failed);
```

## If

```ada
if X > 0 then
   ...
elsif X = 0 then
   ...
else
   ...
end if;
```

## Case

```ada
case State is
   when Off =>
      ...

   when On =>
      ...

   when Failed =>
      ...
end case;
```

## Loop

```ada
loop
   ...
   exit when Done;
end loop;
```

## While

```ada
while X > 0 loop
   ...
end loop;
```

## For

```ada
for I in 1 .. 10 loop
   ...
end loop;
```

## Function

```ada
function Add
  (A : Integer;
   B : Integer)
   return Integer;
```

## Procedure

```ada
procedure Increment
  (X : in out Integer);
```

## Record

```ada
type Point is record
   X : Float;
   Y : Float;
end record;
```

## Array

```ada
type Values is
  array (Positive range <>)
  of Integer;
```

## Exception

```ada
Invalid_Value : exception;
```

## Raise

```ada
raise Invalid_Value;
```

## Contract

```ada
with
  Pre  => X > 0,
  Post => Result > 0;
```

---

# Ściąga narzędzi

| Narzędzie | Do czego służy |
|---|---|
| `gnat` | toolchain kompilatora Ada |
| `gnatmake` | prosty automatyczny build |
| `gprbuild` | budowanie projektów GPR |
| `alr` | Alire - pakiety, toolchain, projekty |
| `gnatprove` | formalna analiza SPARK |
| `gdb` | debugger |
| GNAT Studio | IDE |
| Ada Language Server | obsługa IDE/editorów |

---

# Ściąga rozszerzeń plików

| Rozszerzenie | Znaczenie |
|---|---|
| `.adb` | body / procedura / implementacja |
| `.ads` | specification |
| `.gpr` | projekt GPRbuild |
| `alire.toml` | manifest Alire |

---

# Typowy nowy projekt 2026

Najprościej:

```bash
alr init --bin my_app
cd my_app
alr build
alr run
```

Edytujemy:

```text
src/my_app.adb
```

Dodajemy bibliotekę:

```bash
alr with nazwa_crate
```

Jeżeli chcemy SPARK:

```bash
alr with gnatprove
```

i uruchamiamy narzędzia w środowisku projektu.

---

# Typowy prosty projekt bez Alire

Pliki:

```text
main.adb
calculator.ads
calculator.adb
```

Budowanie:

```bash
gnatmake main.adb
```

GNAT odnajdzie zależności i zbuduje wymagane jednostki.

---

# Typowy większy projekt

```text
my-project/
├── alire.toml
├── my_project.gpr
├── src/
│   ├── main.adb
│   ├── network.ads
│   ├── network.adb
│   ├── storage.ads
│   └── storage.adb
├── tests/
└── README.md
```

Build:

```bash
alr build
```

Testy:

```text
osobny test crate
lub framework AUnit
```

---

# Co czytać dalej?

Jeżeli chcesz nauczyć się Ady naprawdę:

## 1. Podstawy

- typy,
- zakresy,
- procedury,
- funkcje,
- pakiety.

## 2. Model danych

- arrays,
- records,
- discriminants,
- access types.

## 3. Modularność

- packages,
- private types,
- generics.

## 4. Runtime

- exceptions,
- tasks,
- protected objects.

## 5. Low-level

- representation clauses,
- volatile,
- interfacing C,
- embedded.

## 6. High integrity

- contracts,
- SPARK,
- GNATprove,
- real-time profiles.

---

# Najważniejsze rzeczy do zapamiętania

Jeżeli zapomnisz większość artykułu, zapamiętaj te punkty:

1. Ada jest normalnym współczesnym językiem kompilowanym.
2. GNAT jest częścią świata GCC.
3. Alire daje współczesny workflow pakietów i toolchainów.
4. Ada jest bardzo silnie typowana.
5. Nowy typ naprawdę jest nowym typem.
6. Podtyp może ograniczyć legalny zakres wartości.
7. Bounds i range checks są fundamentalną częścią modelu.
8. Pakiet ma oddzielną specyfikację i implementację.
9. Kontrakty mogą być częścią kodu, nie komentarzem.
10. Tasking jest wbudowany w język.
11. Protected objects wspierają bezpieczniejszą współbieżność.
12. Ada potrafi zejść bardzo blisko hardware.
13. SPARK umożliwia formalne dowodzenie konkretnych właściwości programu.
14. Formal proof nie zastępuje poprawnych wymagań ani wszystkich testów.
15. Ada nie jest martwa - jest niszowa i bardzo wyspecjalizowana.

---

# Jedno zdanie, które najlepiej opisuje Adę

Jeżeli C mówi:

> ufam programiście,
to Ada mówi:

> **opisz dokładnie, co programowi wolno zrobić, żebym mogła pomóc Ci zauważyć, kiedy robi coś innego.**

To właśnie jest jej największa siła.

---

# Powiązane materiały TechHandbooka

- [20 współczesnych języków programowania, które warto znać](techhandbook:doc-058)
- [Stare języki programowania, które ukształtowały informatykę](techhandbook:doc-059)
- [Assembler od podstaw - od rejestrów i pamięci do prawdziwego programu](techhandbook:doc-060)
- [C - czytanie, kompilacja i debugowanie](techhandbook:doc-019)
- [Go - czytanie kodu](techhandbook:doc-020)
- [Python - podstawy](techhandbook:doc-023)
- [Debian - shell](techhandbook:doc-027)
- [Programowanie w shellu](techhandbook:doc-031)
- [Visual Studio Code](techhandbook:doc-039)
- [GitHub](techhandbook:doc-014)

---

# Oficjalne źródła i dokumentacja

Stan sekcji narzędziowej: wrzesień 2026.

## Standard

- Ada 2022 documents: https://www.adaic.org/ada-resources/standards/ada22/
- Ada 2022 Reference Manual: https://www.adaic.org/resources/add_content/standards/22rm/html/RM-TTL.html

## Nauka języka

- AdaCore Learn: https://learn.adacore.com/
- Introduction to Ada: https://learn.adacore.com/courses/intro-to-ada/

## GNAT / GCC

- GCC Ada: https://gcc.gnu.org/onlinedocs/gnat_ugn/
- GCC: https://gcc.gnu.org/

## Alire

- Alire: https://alire.ada.dev/
- Getting Started: https://alire.ada.dev/docs/getting-started
- Toolchain management: https://alire.ada.dev/docs/toolchains

## SPARK

- Introduction to SPARK: https://learn.adacore.com/courses/intro-to-spark/
- SPARK User's Guide: https://docs.adacore.com/spark2014-docs/html/ug/

## AdaCore

- AdaCore: https://www.adacore.com/
- GNAT Studio: https://github.com/AdaCore/gnatstudio

---

# Koniec serii językowej

Ta czteroczęściowa seria pokazuje cztery bardzo różne spojrzenia na programowanie:

## 1. Współczesne języki

Świat, z którym spotkasz się w codziennej pracy:

```text
Python
JavaScript
TypeScript
Java
C
C++
Go
Rust
...
```

## 2. Historyczne języki

Skąd wzięły się pomysły, które dziś wydają się oczywiste:

```text
FORTRAN
COBOL
ALGOL
Lisp
Pascal
Smalltalk
Prolog
...
```

## 3. Assembler

Co znajduje się pod wszystkimi abstrakcjami:

```text
CPU
rejestry
pamięć
stos
instrukcje
```

## 4. Ada

Co się dzieje, gdy język zostaje zaprojektowany z myślą:

```text
kod ma być nie tylko działający,
ale możliwie łatwy do analizowania,
ograniczania i weryfikowania
```

Razem te cztery teksty pokazują coś ważniejszego niż składnia poszczególnych języków.

Pokazują, że język programowania jest przede wszystkim:

> **sposobem myślenia o problemie i zestawem kompromisów, które twórcy języka uznali za najważniejsze.**
