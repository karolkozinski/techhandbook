---
id: "doc-061"
title: "Ada - the language where mistakes are meant to be harder to make"
slug: "ada-the-language-where-mistakes-are-meant-to-be-harder-to-make"
description: "A practical Ada handbook: history, GNAT and Alire installation on Windows, macOS and Linux, syntax, strong typing, ranges, packages, generics, tasking, contracts, SPARK and formal verification."
lang: "en"
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

# Ada - the language where mistakes are meant to be harder to make

Ada is an unusual language.

Not because its syntax is especially exotic.

If you know Pascal, C, Java, Go, or even a little Python, most basic constructs will make sense very quickly.

What is unusual is **what Ada expects from the programmer**.

In many popular languages the philosophy is roughly:

> write the code, then check whether it works.

Ada often encourages the opposite approach:

> first describe precisely which values make sense, what a function may receive, what it must return, and what the program must never do.

Only then write the implementation.

It is a language designed for large, long-lived systems where:

```text
"it seems to work"
```

is not an adequate quality standard.

Ada is used in domains including:

- avionics,
- aviation,
- rail systems,
- defense,
- real-time systems,
- space systems,
- medical systems,
- embedded software,
- software with high safety and reliability requirements.

But it is not only a “rocket language.”

You can write:

- a CLI program,
- a server,
- a library,
- embedded software,
- a game,
- a concurrent application,
- a system tool.

And of course:

> a number guessing game from 0 to 100.

This article covers Ada from basics to the features that make it distinctive:

- strong typing,
- types and subtypes,
- ranges,
- records,
- packages,
- generics,
- control over data representation,
- tasking,
- protected objects,
- contracts,
- SPARK,
- formal verification.

Related TechHandbook material:

- [20 modern programming languages worth knowing](techhandbook:doc-058)
- [Old programming languages that shaped computing](techhandbook:doc-059)
- [Assembly from scratch](techhandbook:doc-060)
- [C - reading, building and debugging projects](techhandbook:doc-019)
- [Debian - shell](techhandbook:doc-027)
- [Visual Studio Code](techhandbook:doc-039)
- [GitHub](techhandbook:doc-014)

---

# Where did Ada come from?

In the 1970s, the United States Department of Defense had a problem.

Different projects used an enormous number of programming languages and dialects.

Each system could have its own:

- tools,
- compilers,
- libraries,
- conventions,
- language.

For systems developed and maintained over decades, this was a nightmare.

The Department of Defense therefore started a process to design a new language for large systems.

The requirements were ambitious.

The language was expected to support, among other things:

- modularity,
- strong typing,
- reliability,
- concurrency,
- real-time systems,
- large development teams,
- long-term maintenance.

The winning design was created by a team led by:

```text
Jean Ichbiah
```

The language was named:

```text
Ada
```

after:

```text
Augusta Ada Lovelace
```

who worked with ideas surrounding Charles Babbage's Analytical Engine and is often described as the first programmer.

---

# Ada is not an acronym

Unlike names such as:

```text
BASIC
COBOL
FORTRAN
```

Ada does not expand into a longer phrase.

It is simply a name.

The correct spelling is:

```text
Ada
```

not:

```text
ADA
```

---

# Language versions

Ada is a standardized language.

The most important revisions are:

## Ada 83

The first full standard.

It introduced or standardized features including:

- packages,
- generics,
- exceptions,
- tasking,
- strong typing.

## Ada 95

A major modernization.

It added, among other things:

- object-oriented programming,
- hierarchical libraries,
- protected objects,
- many real-time extensions.

## Ada 2005

Further extensions in areas such as:

- OOP,
- interfaces,
- real-time systems,
- containers.

## Ada 2012

A particularly important version for modern Ada.

It introduced or expanded:

- preconditions,
- postconditions,
- type invariants,
- subtype predicates,
- contract-based programming.

## Ada 2022

The current generation of the language.

The Ada 2022 standard was published as:

```text
ISO/IEC 8652:2023
```

The revision itself is still called:

```text
Ada 2022
```

---

# Ada is not SPARK

This distinction matters.

## Ada

The full programming language.

## SPARK

A language and formal-analysis method based on a subset of Ada.

You can imagine it as:

```text
Ada
┌───────────────────────────────────┐
│                                   │
│        SPARK                      │
│        ┌────────────────┐         │
│        │ verifiable     │         │
│        │ subset         │         │
│        └────────────────┘         │
│                                   │
└───────────────────────────────────┘
```

SPARK restricts some Ada features that make mathematical reasoning more difficult.

In exchange, it supports much stronger analysis.

---

# GNAT

The most important modern Ada compiler is:

```text
GNAT
```

GNAT is part of:

```text
GNU Compiler Collection
```

or GCC.

This means Ada is not limited to one closed commercial compiler.

You can use the open GNAT FSF toolchain.

Important tools include:

```text
gcc        - contains the Ada frontend
gnatmake   - simple build driver
gprbuild   - project build system
gnatbind   - Ada binder
gnatlink   - linker driver
```

---

# Why does Ada have a binder?

Building Ada is not always just:

```text
source -> object -> linker
```

Ada includes an extra stage:

```text
binding
```

The binder analyzes, among other things:

- unit dependencies,
- elaboration order,
- program initialization.

Simplified build process:

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

`gnatmake` and `gprbuild` handle this automatically.

---

# Alire

A modern Ada project is very convenient to manage with:

```text
Alire
```

Command:

```text
alr
```

Alire acts as:

- package manager,
- package index,
- dependency manager,
- project generator,
- toolchain manager.

It can be compared loosely to:

```text
cargo - Rust
npm   - JavaScript
pip   - Python
opam  - OCaml
```

although the details differ.

---

# Two sensible installation strategies

There are two main approaches.

## Option 1 - system GNAT

Good for:

- learning,
- small programs,
- Linux systems,
- environments where distribution packages are preferred.

## Option 2 - Alire

Better for:

- new projects,
- dependencies,
- controlling compiler versions,
- libraries,
- SPARK,
- portable project workflows.

We will learn both.

---

# Installation - Linux / Debian

## Simplest system installation

On Debian:

```bash
sudo apt update
sudo apt install gnat gprbuild
```

Verify:

```bash
gnat --version
```

or:

```bash
gnatmake --version
```

and:

```bash
gprbuild --version
```

Depending on the Debian release, the package provides the GNAT version associated with that GCC generation.

---

# Installing Alire - Linux

Alire publishes an archive containing:

```text
alr
```

Download the current release from:

https://alire.ada.dev/

After extraction, add its `bin` directory to `PATH`.

Example:

```bash
export PATH="$HOME/tools/alire/bin:$PATH"
```

To make it permanent, add it to:

```text
~/.profile
```

or your shell configuration.

Verify:

```bash
alr --version
```

For the first project, Alire may offer to select or install GNAT and GPRbuild.

---

# Linux ARM

Prebuilt Alire toolchains are most straightforward on supported x86-64 environments.

On Linux ARM/AArch64 you may use:

- system GNAT,
- a compiler built for that platform,
- Alire with an external/system toolchain.

This matters for:

```text
Raspberry Pi
ARM servers
```

---

# Installation - Windows

The most convenient modern route is Alire.

Website:

https://alire.ada.dev/

An installer is available for Windows.

It installs `alr` into the environment.

Verify in PowerShell:

```powershell
alr --version
```

On first use, Alire may suggest installing:

```text
MSYS2
```

That is useful because some libraries and build steps depend on Unix-style tools such as:

```text
git
make
curl
```

Alire can use its managed MSYS2 environment.

---

# Windows alternative - MSYS2

Ada is also available directly in the MSYS2 ecosystem.

You can use GCC Ada and GPRbuild packages there.

This is a good option if you already use MSYS2 and want one MinGW-based toolchain.

For a fresh Ada project, Alire is usually more convenient.

---

# Installation - macOS

Alire publishes a macOS archive.

After extraction:

```bash
export PATH="/path/to/alire/bin:$PATH"
```

macOS may mark the downloaded executable with the quarantine attribute.

The Alire documentation shows removing it with:

```bash
xattr -d com.apple.quarantine bin/alr
```

Verify:

```bash
alr --version
```

---

# macOS and Apple Silicon

This deserves attention.

Prebuilt community toolchains may vary by architecture and release.

On Apple Silicon:

```text
M1
M2
M3
M4
...
```

you may need:

- an AArch64-compatible community toolchain,
- a native/system GNAT,
- tools built from source.

Check the current Alire/toolchain documentation for the release you use.

---

# First program - Hello World

Create:

```text
hello.adb
```

Code:

```ada
with Ada.Text_IO;

procedure Hello is
begin
   Ada.Text_IO.Put_Line ("Hello from Ada!");
end Hello;
```

Compile:

```bash
gnatmake hello.adb
```

Run on Linux/macOS:

```bash
./hello
```

Windows:

```powershell
.\hello.exe
```

---

# `with`

Line:

```ada
with Ada.Text_IO;
```

means that our unit depends on:

```text
Ada.Text_IO
```

You can loosely compare it to:

```text
import
include
use module
```

but Ada's library model has its own rules.

---

# Fully qualified names

Without `use`, we write:

```ada
Ada.Text_IO.Put_Line ("Hello");
```

This is very explicit.

You immediately know where `Put_Line` comes from.

---

# `use`

We can write:

```ada
with Ada.Text_IO;
use Ada.Text_IO;

procedure Hello is
begin
   Put_Line ("Hello");
end Hello;
```

`use` makes names from the package directly visible.

That is convenient, but in large programs it can increase the chance of name conflicts.

For that reason you will often see Ada code using full package names.

---

# Procedure structure

The simplest program:

```ada
procedure Main is
begin
   null;
end Main;
```

We have:

```text
procedure Main is
```

the declarative part,

```text
begin
```

the executable part,

```text
end Main;
```

the end of the unit.

---

# `null`

Instruction:

```ada
null;
```

means:

> intentionally do nothing.

Useful for example in:

```ada
if Something then
   null;
end if;
```

---

# Semicolons

Ada uses semicolons:

```ada
X := 10;
Put_Line ("Hello");
```

But structures also end explicitly:

```ada
end if;
end loop;
end Main;
```

That is very characteristic of the language.

---

# Comments

Comment:

```ada
-- This is a comment
```

Standard Ada does not use the classic:

```text
/* ... */
```

block comment.

A comment runs from:

```text
--
```

to the end of the line.

---

# Ada is case-insensitive

These identifiers mean the same thing:

```ada
Counter
COUNTER
counter
CoUnTeR
```

In practice, code follows conventions such as:

```ada
This_Is_A_Name
```

while keywords are commonly written in lowercase.

---

# Assignment

Ada uses:

```ada
:=
```

Example:

```ada
X := 10;
```

While:

```ada
=
```

means comparison.

```ada
if X = 10 then
   ...
end if;
```

This eliminates the classic C-family mistake:

```c
if (x = 10)
```

instead of:

```c
if (x == 10)
```

---

# Declaring variables

```ada
Age : Integer := 46;
```

Pattern:

```text
Name : Type := Value;
```

You can declare without explicit initialization:

```ada
Age : Integer;
```

but in safety-oriented code initialization should be considered carefully.

---

# Constants

```ada
Pi : constant Float := 3.14159;
```

After initialization, the value cannot be changed.

---

# Basic types

Common predefined types include:

```text
Integer
Float
Boolean
Character
String
Natural
Positive
```

Example:

```ada
Age     : Integer := 46;
Height  : Float := 1.80;
Enabled : Boolean := True;
Letter  : Character := 'A';
Name    : String := "Ada";
```

---

# Natural and Positive

Ada has predefined subtypes:

```ada
Natural
```

meaning integers:

```text
>= 0
```

and:

```ada
Positive
```

meaning:

```text
> 0
```

Example:

```ada
Count : Natural := 0;
Index : Positive := 1;
```

The declaration already says something about the meaning of the data.

---

# A type is more than a storage size

This is one of Ada's most important ideas.

In C:

```c
typedef float Meters;
typedef float Seconds;
```

both names are essentially aliases for the same type.

Ada can create **truly distinct types**:

```ada
type Meters is new Float;
type Seconds is new Float;
```

Now:

```ada
Distance : Meters := 10.0;
Time     : Seconds := 5.0;```

You cannot carelessly write:

```ada
Distance := Time;
```

or:

```ada
Distance + Time
```

just because both happen to be represented numerically.

---

# Why is this useful?

Imagine:

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

For the CPU, they may all be numbers.

For the application:

```text
10 meters + 5 seconds
```

makes no sense.

Ada lets you encode that knowledge in the type system.

---

# Explicit conversions

If you really want to convert one type to another, you do it explicitly.

```ada
type Celsius is new Float;
type Fahrenheit is new Float;

C : Celsius := 20.0;
F : Fahrenheit;

F := Fahrenheit (C);
```

This does not automatically convert the temperature scale.

It only converts the representation explicitly.

The actual physical formula must still be implemented by the programmer.

---

# Enumeration types

```ada
type Traffic_Light is
  (Red,
   Yellow,
   Green);
```

Variable:

```ada
Light : Traffic_Light := Red;
```

We are not storing magic numbers:

```text
0
1
2
```

The program operates on domain values.

---

# `case`

Enumeration types work beautifully with:

```ada
case
```

Example:

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

The compiler requires all possibilities to be handled.

If later we add:

```ada
Blinking_Yellow
```

the compiler can point out places that need updating.

---

# Subtypes

Type:

```ada
Integer
```

represents a huge set of values.

Sometimes a domain allows only a smaller range.

Example:

```ada
subtype Percentage is Integer range 0 .. 100;
```

Now:

```ada
Progress : Percentage := 75;
```

has a clearly defined constraint.

---

# A subtype is not a new type

This matters.

```ada
subtype Percentage is Integer range 0 .. 100;
```

creates a constrained view of `Integer`.

While:

```ada
type Percentage is range 0 .. 100;
```

creates a new integer type.

These are different mechanisms.

---

# Range checking

Example:

```ada
subtype Percentage is Integer range 0 .. 100;

P : Percentage;
X : Integer := 120;

begin
   P := X;
```

If the runtime value does not fit the subtype constraint, a check fails.

Ada may raise:

```text
Constraint_Error
```

Ada performs many such checks by default.

---

# Errors detected earlier

If the compiler can determine statically that a constant value violates a constraint:

```ada
P : Percentage := 150;
```

it may report the problem before the program runs.

That is very much Ada's philosophy:

```text
detect the error as early as possible
```

---

# Range as part of the model

Instead of:

```ada
Temperature : Integer;
```

we can write:

```ada
subtype Engine_Temperature is Integer range -40 .. 150;

Temperature : Engine_Temperature;
```

The code documents itself:

> legal engine temperatures in this model are -40..150.

This is more than a comment.

The compiler and runtime can use the information.

---

# Modular types

Ada has modular integer types.

Example of an 8-bit value:

```ada
type Byte is mod 2 ** 8;
```

Range:

```text
0..255
```

Overflow wraps modulo 256.

Example:

```ada
B : Byte := 255;

B := B + 1;
```

Result:

```text
0
```

Useful in:

- embedded code,
- cryptography,
- bit manipulation,
- protocols.

---

# Bitwise operations on modular types

You can use:

```ada
and
or
xor
not
```

Example:

```ada
type Byte is mod 2 ** 8;

A : Byte := 16#F0#;
B : Byte := 16#0F#;
C : Byte;

C := A xor B;
```

Result:

```text
16#FF#
```

---

# Number literals in other bases

Ada has a very readable notation for non-decimal numbers.

Hex:

```ada
16#FF#
```

Binary:

```ada
2#1111_0000#
```

Octal:

```ada
8#377#
```

Underscores improve readability:

```ada
1_000_000
```

---

# Floating point

You can define your own floating-point type.

```ada
type Real is digits 12;
```

`digits` specifies the required decimal precision.

This is a different perspective from directly choosing:

```text
float32
float64
```

as in many other languages.

---

# Fixed point

Ada has native fixed-point types.

Example:

```ada
type Money is delta 0.01 digits 12;
```

This is useful when we want to control the model's numeric resolution.

For financial calculations, ordinary binary floating point is not always the right choice.

---

# Physical units? Not automatically, but...

Ada does not include an automatic SI unit system in the standard.

But strong typing lets us define distinct types such as:

```ada
type Meters is new Float;
type Meters_Per_Second is new Float;
type Seconds is new Float;
```

and define only operations that make sense.

---

# Attributes

Ada has a powerful mechanism called:

```text
attributes
```

written with an apostrophe:

```ada
Type'Attribute
```

Examples:

```ada
Integer'First
Integer'Last
```

return the bounds of a type.

---

# `'First` and `'Last`

```ada
subtype Score is Integer range 0 .. 100;
```

We can use:

```ada
Score'First
```

which is:

```text
0
```

and:

```ada
Score'Last
```

which is:

```text
100
```

No duplicated magic values are needed.

---

# `'Range`

For an array:

```ada
for I in Values'Range loop
   ...
end loop;
```

instead of:

```ada
for I in 1 .. 100 loop
```

The code automatically follows the actual array bounds.

This is one of Ada's most pleasant features.

---

# `'Length`

```ada
Values'Length
```

returns the array length.

---

# `'Image`

```ada
Integer'Image (42)
```

creates a textual representation of a value.

Example:

```ada
Put_Line (Integer'Image (42));
```

Modern Ada expanded image facilities significantly.

---

# `'Value`

The reverse operation:

```ada
Integer'Value ("42")
```

returns:

```text
42
```

If the string is invalid, an exception may be raised.

---

# `if`

```ada
if Temperature > 100 then
   Put_Line ("Too hot");
end if;
```

---

# `elsif`

Ada uses:

```ada
elsif
```

not:

```text
else if
elseif
elif
```

Example:

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

# Boolean operators

```ada
and
or
xor
not
```

Ada also has:

```ada
and then
or else
```

for short-circuit evaluation.

Example:

```ada
if Ptr /= null and then Ptr.all > 0 then
   ...
end if;
```

The second condition is not evaluated if the first one is false.

---

# Infinite loop

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

A very readable construct.

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

`I` is created automatically.

You do not declare it beforehand.

---

# `reverse`

```ada
for I in reverse 1 .. 10 loop
   ...
end loop;
```

iterates in the opposite direction.

---

# Looping over an array

```ada
for I in Values'Range loop
   Values (I) := 0;
end loop;
```

We do not need to know the starting index.

Ada arrays do not have to start at:

```text
0
```

or even:

```text
1
```

---

# Arrays with custom index types

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

Now:

```ada
T : Temperatures;

T (Monday) := 20.0;
T (Friday) := 25.0;
```

The index type is:

```text
Day
```

not an integer.

This is very Ada.

---

# Unconstrained array types

You can declare:

```ada
type Integer_Array is array (Positive range <>) of Integer;
```

`<>` means:

> the bounds will be provided later.

Then:

```ada
A : Integer_Array (1 .. 10);
B : Integer_Array (100 .. 200);
```

Same array type, different bounds.

---

# Multidimensional arrays

```ada
type Matrix is
  array (Positive range <>,
         Positive range <>) of Float;
```

Example:

```ada
M : Matrix (1 .. 3, 1 .. 3);
```

Access:

```ada
M (2, 3)
```

---

# String is an array

The standard:

```ada
String
```

is an array of characters.

Example:

```ada
Name : String (1 .. 5) := "Ada!!";
```

And this leads to an important feature.

A normal `String` has fixed bounds.

---

# The String trap

```ada
Name : String := "Ada";
```

creates a string with length:

```text
3
```

You cannot later simply do:

```ada
Name := "Ada Lovelace";
```

because the new string has different bounds.

This often surprises people coming from Python.

---

# Unbounded_String

For dynamically sized text, one option is:

```text
Ada.Strings.Unbounded
```

Example:

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

# Records

A record is Ada's structured data type.

```ada
type Point is record
   X : Float;
   Y : Float;
end record;
```

Object:

```ada
P : Point :=
  (X => 10.0,
   Y => 20.0);
```

Access:

```ada
P.X
P.Y
```

---

# Named aggregates

Ada strongly encourages explicit field names.

```ada
P :=
  (X => 10.0,
   Y => 20.0);
```

This is clearer than relying only on positional order:

```text
(10.0, 20.0)
```

For larger records, it greatly reduces mistakes.

---

# `others`

You can initialize remaining fields with:

```ada
Config :=
  (Enabled => True,
   others  => <>);
```

The exact meaning of `<>` depends on context and defaults.

---

# Discriminated records

Ada can define records whose structure depends on a discriminant.

Example:

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

This can model variants more safely than a manually managed C union.

---

# Function

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

Use:

```ada
Result := Add (10, 20);
```

---

# Procedure

A procedure does not have to return a value.

```ada
procedure Greet (Name : String) is
begin
   Put_Line ("Hello " & Name);
end Greet;
```

Call:

```ada
Greet ("Ada");
```

---

# `in` parameters

The default mode for scalar inputs is:

```ada
in
```

Example:

```ada
procedure Show (X : in Integer);
```

The parameter is treated as input.

---

# `out`

```ada
procedure Get_Result
  (Result : out Integer);
```

The parameter carries a result to the caller.

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

Call:

```ada
Value : Integer := 10;

Increment (Value);
```

Afterwards:

```text
Value = 11
```

---

# Readable calls

You can call:

```ada
Move
  (X     => 10,
   Y     => 20,
   Speed => 5);
```

instead of:

```ada
Move (10, 20, 5);
```

Named parameters are particularly useful when several arguments have the same type.

---

# Default parameter values

```ada
procedure Log
  (Message : String;
   Level   : Natural := 1);
```

Call:

```ada
Log ("Started");
```

or:

```ada
Log
  (Message => "Failed",
   Level   => 3);
```

---

# Overloading

Ada supports overloading.

```ada
procedure Print (X : Integer);
procedure Print (X : Float);
procedure Print (X : String);
```

The compiler chooses the appropriate version from the types.

---

# Operators as functions

Operators can also be overloaded.

You can define:

```ada
"+"
```

for your own types.

Useful for domain types such as:

```text
Vector
Matrix
Distance
Money
```

---

# Packages

One of the foundations of large Ada systems is the:

```text
package
```

A package normally has:

```text
specification
body
```

Specification file:

```text
.ads
```

Implementation file:

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

This is the public interface.

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

# Program using the package

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

The compiler sees the dependency through:

```ada
with Calculator;
```

---

# Specification as contract

This is an important part of Ada's design philosophy.

A client of a package should mainly need:

```text
.ads
```

not:

```text
.adb
```

The specification says:

- which types exist,
- which operations are available,
- what their parameters are,
- what their contracts are.

The implementation may change without changing package clients.

---

# Private types

You can hide a type's representation.

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

Code outside the package knows that:

```text
Account
```

exists, but does not know its representation.

---

# Limited private

An even stronger restriction:

```ada
type Device is limited private;
```

Clients cannot freely copy values.

Useful for objects representing:

- handles,
- devices,
- mutexes,
- system resources.

---

# Child packages

Ada supports hierarchical library names.

Example:

```text
Network
Network.HTTP
Network.HTTP.Client
Network.HTTP.Server
```

This is a natural way to organize large systems.

---

# Generics

Ada has a powerful:

```text
generics
```

system.

Example generic swap procedure:

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

Instantiate it:

```ada
procedure Swap_Integer is
  new Generic_Swap (Integer);
```

Now we have a typed version for:

```text
Integer
```

---

# Containers

Ada's standard library contains containers.

Examples:

```text
Ada.Containers.Vectors
Ada.Containers.Doubly_Linked_Lists
Ada.Containers.Hashed_Maps
Ada.Containers.Ordered_Maps
Ada.Containers.Hashed_Sets
Ada.Containers.Ordered_Sets
```

Many are generic packages.

---

# Vector example

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

Ada's pointer-like facility is called:

```text
access types
```

Example:

```ada
type Integer_Access is
  access all Integer;

X : aliased Integer := 10;
P : Integer_Access := X'Access;
```

Dereference:

```ada
P.all
```

---

# `null`

An access value may be:

```ada
null
```

Before dereferencing it, you must know the access value is valid.

---

# Why Ada treats pointers carefully

Pointers are a major source of bugs in low-level languages.

Ada allows pointer-like programming, but:

- access types are explicit,
- checks are performed,
- types are strongly separated,
- accessibility rules apply,
- their use can be restricted.

High-integrity software often deliberately limits dynamic allocation.

---

# Unchecked_Access and the unsafe world

Ada allows some protections to be bypassed.

Mechanisms include:

```text
Unchecked_Access
Unchecked_Conversion
Unchecked_Deallocation
```

The word:

```text
Unchecked
```

is refreshingly honest.

The language is telling you:

> you can do this, but you are leaving the normal safety model.

---

# Exceptions

Ada has built-in exception handling.

Example:

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

# Standard exceptions

Typical ones include:

```text
Constraint_Error
Program_Error
Storage_Error
Tasking_Error
```

---

# Custom exception

```ada
Invalid_Temperature : exception;
```

Raise it:

```ada
raise Invalid_Temperature;
```

You can also attach a message:

```ada
raise Invalid_Temperature
  with "Temperature outside allowed range";
```

---

# Constraint_Error is not just “an error”

Example:

```ada
subtype Percentage is Integer range 0 .. 100;
```

Trying to assign:

```text
150
```

may result in:

```text
Constraint_Error
```

That is intentional enforcement of the program's semantics.

The language does not want to pretend that:

```text
150%
```

is a valid value of a subtype we explicitly defined as:

```text
0..100
```

---

# Runtime checks

Ada can check at runtime, among other things:

- ranges,
- array bounds,
- division by zero,
- overflow in relevant contexts,
- access-value validity,
- contracts.

This increases the chance of catching a bug near the point where it actually occurred.

---

# Array bounds

In C:

```c
int a[10];
a[100] = 5;
```

may lead to undefined behavior.

Ada:

```ada
A : array (1 .. 10) of Integer;

A (100) := 5;
```

violates the bounds.

Runtime can raise:

```text
Constraint_Error
```

---

# Design by Contract

One of modern Ada's most interesting features.

You can describe:

```text
what must be true before a call
```

and:

```text
what must be true after it returns
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

This says:

> `Withdraw` may only be called when Amount does not exceed Balance.

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

`Balance'Old` means:

```text
the value of Balance before the call
```

So the contract says:

> after the call, the balance must equal the old balance minus the withdrawal.

---

# Implementation

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

The interface and required behavior are tied together explicitly.

---

# Enabling assertion checks in GNAT

With classic GNAT builds, assertions can be enabled with:

```bash
-gnata
```

Example:

```bash
gnatmake -gnata main.adb
```

Then preconditions, postconditions, and assertions can be checked at runtime.

---

# `pragma Assert`

```ada
pragma Assert (Balance >= 0);
```

If the condition is false, the assertion reports a problem.

Assertions document assumptions and can actively check them.

---

# Subtype predicates

You can describe additional properties of a subtype.

```ada
subtype Even_Integer is Integer
with
  Dynamic_Predicate =>
    Even_Integer mod 2 = 0;
```

Object:

```ada
X : Even_Integer;
```

is intended to represent only even values.

---

# Static_Predicate

For statically analyzable sets, Ada also supports:

```text
Static_Predicate
```

Example:

```ada
subtype Day_Number is Integer
  with Static_Predicate =>
    Day_Number in 1 .. 31;
```

For a simple interval, ordinary `range` is better.

Predicates become more interesting for non-contiguous or more expressive sets.

---

# Type invariants

Private types can define properties that should always hold.

Ideas include:

```text
Balance is never negative
Start <= End
A list remains structurally consistent
```

An invariant is a formal version of:

> every valid object of this type should satisfy this condition.

---

# Why a contract is stronger than a comment

Comment:

```ada
-- Amount should not exceed Balance
```

is ignored by the compiler.

Contract:

```ada
with Pre => Amount <= Balance
```

can be:

- read by humans,
- checked at runtime,
- analyzed statically,
- formally proven by GNATprove.

That is a major difference.

---

# SPARK

Now we reach one of the areas Ada is especially known for.

SPARK is a subset of Ada together with a set of tools for formal analysis.

The main tool is:

```text
GNATprove
```

---

# What does “formal verification” mean?

A test says:

```text
for these particular inputs, the program behaved correctly
```

A formal proof tries to show:

```text
for all values satisfying the assumptions, a specific property is true
```

This is not magic:

```text
prove that the whole program is perfect
```

We prove particular properties.

---

# Example

```ada
procedure Increment
  (X : in out Integer)
with
  Pre  => X < Integer'Last,
  Post => X = X'Old + 1;
```

The precondition says:

```text
X must not already be the largest Integer value
```

because:

```text
X + 1
```

would overflow.

The postcondition says:

```text
the result is exactly one greater than the old value
```

---

# GNATprove

GNATprove can analyze:

- data flow,
- initialization,
- possible runtime errors,
- preconditions,
- postconditions,
- assertions,
- data dependencies.

Typical command:

```bash
gnatprove
```

In a real project it is usually run in the context of a GPR project file.

---

# Flow analysis

SPARK can analyze things such as:

- whether a variable was initialized,
- whether an assignment is actually used,
- which data a subprogram reads,
- which data it modifies.

This can reveal problems without executing the program.

---

# Absence of Run-Time Errors

One important proof goal is often written as:

```text
AoRTE
```

or:

```text
Absence of Run-Time Errors
```

We can try to prove that code cannot cause, for example:

- division by zero,
- an out-of-bounds array access,
- overflow,
- a range violation.

---

# Test versus proof

Suppose we have:

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

Tests may cover:

```text
10 / 2
20 / 5
0 / 1
```

but forget:

```text
B = 0
```

A proof tries to determine whether the division is safe for **all allowed inputs**.

---

# Add a precondition

```ada
function Divide
  (A : Integer;
   B : Integer)
   return Integer
with
  Pre => B /= 0;
```

Now the requirement is explicit.

GNATprove can analyze each call site and ask:

> can the caller prove that B is not zero?

---

# This changes API design

Instead of defensively writing everywhere:

```text
if bad input
   return error
```

we can define:

```text
legal conditions for calling the function
```
and make them the caller's responsibility.

That does not mean applications should stop validating untrusted user input.

Contracts define boundaries and responsibilities between components.

---

# Installing GNATprove through Alire

Inside an Alire project we can add:

```bash
alr with gnatprove
```

Alire can obtain the appropriate tool if a build is available for the platform.

Then run it inside the project environment:

```bash
alr exec -- gnatprove
```

---

# `SPARK_Mode`

Code can explicitly enable SPARK analysis.

Example:

```ada
package Math
with
  SPARK_Mode => On
is
   ...
end Math;
```

SPARK_Mode can also be controlled for different units and scopes.

This allows a single system to combine:

```text
full Ada
+
verified SPARK code
```

---

# Not everything has to be SPARK

That is important in practice.

A system might look like:

```text
UI          - Ada
network     - Ada
driver      - Ada
core logic  - SPARK
```

The most critical component receives stronger guarantees.

You do not have to formally prove the entire universe.

---

# Tasking

Ada includes concurrency as part of the language.

Not merely as an external library.

The basic unit is a:

```text
task
```

---

# Simplest task

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

`Worker` can execute concurrently with the main procedure.

---

# Why was this unusual?

Ada 83 already had a language-level concurrency model.

At a time when many languages treated concurrency mainly as a library or operating-system extension, Ada had:

```text
tasking
```

in the language specification.

---

# Rendezvous

Tasks can communicate through:

```text
entries
```

Conceptual example:

```ada
task Server is
   entry Send (Value : Integer);
end Server;
```

Client:

```ada
Server.Send (42);
```

The task can accept the call:

```ada
accept Send
  (Value : Integer)
do
   ...
end Send;
```

This is a synchronized rendezvous.

---

# Protected objects

For synchronized shared data, Ada provides:

```text
protected objects
```

This is a major language feature.

Example:

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

Ada provides the synchronization rules around access to the protected object.

---

# Why not just a mutex?

You can think of a protected object as:

```text
data + permitted operations + synchronization
```

combined in one language mechanism.

This reduces the chance of using a lock incorrectly around unrelated data.

---

# Real-time programming

Ada has extensive support for real-time systems.

Package:

```text
Ada.Real_Time
```

provides, among other things, a monotonic time model appropriate for scheduling.

Conceptual example:

```ada
delay until Next_Time;
```

rather than:

```text
sleep roughly 10 ms
```

That distinction matters for periodic tasks.

---

# Ravenscar

Ada provides the:

```text
Ravenscar
```

profile, restricting tasking to a subset that is easier to analyze in high-integrity and real-time systems.

Ada 2022 also includes the more flexible:

```text
Jorvik
```

profile.

The idea is very Ada-like:

> deliberately restrict the language to obtain a more predictable system.

---

# Representation clauses

Ada can precisely control the physical representation of data.

This is extremely important in:

- embedded systems,
- protocols,
- drivers,
- hardware registers.

---

# Type size

Example:

```ada
type Byte is mod 2 ** 8;

for Byte'Size use 8;
```

We tell the compiler that the representation should use 8 bits.

---

# Record representation

Example:

```ada
type Device_Register is record
   Enabled : Boolean;
   Ready   : Boolean;
   Error   : Boolean;
end record;
```

We can define bit positions:

```ada
for Device_Register use record
   Enabled at 0 range 0 .. 0;
   Ready   at 0 range 1 .. 1;
   Error   at 0 range 2 .. 2;
end record;
```

This is powerful for direct hardware interfaces.

---

# Memory-mapped I/O

In embedded systems, a device register may live at a specific address.

Ada can control:

- type,
- address,
- volatility,
- representation.

This lets you work close to the hardware without abandoning the type system.

---

# `Volatile`

If a value may change outside ordinary program control:

```text
hardware register
DMA
interrupt
```

we need to tell the compiler.

Ada has the:

```ada
Volatile
```

aspect.

Example:

```ada
Status : Interfaces.Unsigned_32
with
  Volatile;
```

---

# `Atomic`

Ada also has an:

```ada
Atomic
```

aspect for objects that should be accessed atomically when supported according to the language and target rules.

---

# Importing C

Ada can interoperate with C.

Example:

```ada
procedure C_Function
with
  Import,
  Convention    => C,
  External_Name => "c_function";
```

This says:

> the implementation exists outside Ada and follows the C calling convention.

---

# Exporting to C

We can expose Ada code to C as well:

```ada
procedure Ada_Function
with
  Export,
  Convention    => C,
  External_Name => "ada_function";
```

This is useful in mixed-language systems.

---

# `Interfaces.C`

The standard library contains:

```text
Interfaces.C
```

with types corresponding to C types.

Examples include:

```text
Interfaces.C.int
Interfaces.C.char
Interfaces.C.double
```

This is safer than guessing sizes manually.

---

# Ada and assembly

Ada can also work with low-level assembly code.

A typical embedded system might look like:

```text
Ada/SPARK
    |
    +---- C library
    |
    +---- startup assembly
    |
    +---- hardware registers
```

Ada does not pretend hardware does not exist.

It tries to let you work with it in a more controlled way.

See:

[Assembly from scratch](techhandbook:doc-060)

---

# Ada and C - the biggest philosophical difference

C often says:

> the programmer knows what they are doing.

Ada more often says:

> let the programmer describe what is allowed, then let the compiler and runtime help enforce it.

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

This captures the difference well.

---

# Ada and Rust

Ada and Rust solve some related problems, but their philosophies differ.

Rust strongly emphasizes:

- ownership,
- borrowing,
- memory safety,
- concurrency safety.

Ada strongly emphasizes:

- semantic types,
- ranges,
- contracts,
- runtime checks,
- real-time systems,
- high-integrity software,
- formal verification through SPARK.

There is little value in asking:

> which one is “better”?

They are different tools born in different eras and optimized for different concerns.

---

# Ada and Go

Go roughly says:

> keep the language small and simple.

Ada roughly says:

> make it possible to describe the system's model and constraints precisely.

Go has relatively few mechanisms.

Ada has many.

Both can lead to readable software, but through very different design philosophies.

---

# Ada and Pascal

Syntactically, Ada inherited much of the ALGOL/Pascal tradition.

You can see:

```ada
begin
end
procedure
function
record
```

But Ada is a much larger, more industrial language than classic Pascal.

---

# Ada and Python

Python:

```python
x = 10
```

Ada:

```ada
X : Integer := 10;
```

Python lets you experiment very quickly.

Ada asks you to say more about the data up front.

That reflects different priorities:

```text
rapid prototyping
vs
explicit modelling and constraints
```

---

# Reading input

The simplest option is:

```text
Ada.Text_IO
```

For integers there are specialized packages.

Example:

```ada
with Ada.Integer_Text_IO;
```

Then:

```ada
Ada.Integer_Text_IO.Get (X);
```

---

# Generic Text_IO packages

Ada also provides generic I/O packages for user-defined numeric types.

You can instantiate text I/O exactly for your own type.

That fits naturally with Ada's strong type model.

---

# Guess a number from 0 to 100

Time for our standard comparison program.

We will use the generic package:

```text
Ada.Numerics.Discrete_Random
```

---

# Code

File:

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
     ("Guess a number from 0 to 100.");

   loop

      Ada.Text_IO.Put ("Your guess: ");

      declare

         Line  : constant String :=
           Ada.Text_IO.Get_Line;

         Guess_Value : Integer;

      begin

         Guess_Value := Integer'Value (Line);

         if Guess_Value not in Guess_Range then

            Ada.Text_IO.Put_Line
              ("The allowed range is 0..100.");

         elsif Guess_Value < Secret then

            Ada.Text_IO.Put_Line
              ("Too low!");

         elsif Guess_Value > Secret then

            Ada.Text_IO.Put_Line
              ("Too high!");

         else

            Ada.Text_IO.Put_Line
              ("Correct!");

            exit;

         end if;

      exception

         when Constraint_Error =>

            Ada.Text_IO.Put_Line
              ("Enter a valid number.");

      end;

   end loop;

end Guess;
```

---

# Classic compilation

```bash
gnatmake guess.adb
```

Run on Linux/macOS:

```bash
./guess
```

Windows:

```powershell
.\guess.exe
```

---

# What is interesting in this version?

Even in such a small program, several Ada ideas appear.

## Subtype

```ada
subtype Guess_Range is
  Integer range 0 .. 100;
```

The game's domain is part of the code.

## Generic package

```ada
Ada.Numerics.Discrete_Random
```

is instantiated specifically for:

```text
Guess_Range
```

The generator does not produce arbitrary Integers.

It produces exactly values from the domain we defined.

## Explicit exception handling

Invalid text such as:

```text
banana
```

passed to `Integer'Value` raises:

```text
Constraint_Error
```

and we handle it locally.

## Membership test

```ada
Guess_Value not in Guess_Range
```

is extremely readable.

---

# The same project with Alire

Create a project:

```bash
alr init --bin ada_guess
```

Enter it:

```bash
cd ada_guess
```

Generated structure will look roughly like:

```text
ada_guess/
├── alire.toml
├── ada_guess.gpr
└── src/
    └── ada_guess.adb
```

Place the code in:

```text
src/ada_guess.adb
```

Build:

```bash
alr build
```

Run:

```bash
alr run
```

---

# `alire.toml`

This is the project manifest.

It can contain information such as:

```text
name
version
description
authors
licenses
dependencies
```

The idea is similar to:

```text
Cargo.toml
package.json
pyproject.toml
```

---

# Adding a library

Example:

```bash
alr with some_library
```

Alire records the dependency and resolves its dependency graph.

---

# Searching for libraries

```bash
alr search json
```

or:

```bash
alr search http
```

The ecosystem is obviously smaller than npm or PyPI, but it is a real modern package index.

---

# Alire toolchains

You can select a compiler/toolchain with:

```bash
alr toolchain --select
```

Alire can maintain multiple toolchains.

That is useful when projects require different GNAT versions.

---

# GPRbuild

Larger Ada projects commonly use:

```text
GPR project files
```

Example:

```text
project My_App is
   for Source_Dirs use ("src");
   for Object_Dir use "obj";
   for Main use ("main.adb");
end My_App;
```

File:

```text
my_app.gpr
```

Build:

```bash
gprbuild -P my_app.gpr
```

---

# Why a separate project system?

A large project needs configuration for:

- source directories,
- target,
- compiler,
- flags,
- libraries,
- languages,
- paths,
- build modes.

GPRbuild can also support multi-language projects.

---

# Debug and release builds

Different build scenarios may use different settings.

Debug:

```text
checks
debug symbols
less optimization
```

Release:

```text
optimization
carefully chosen checks
```

In Ada, disabling checks should be a deliberate decision.

In SPARK projects, some checks can be proven unnecessary because the violating condition is mathematically impossible.

---

# Debugger

GNAT works with:

```text
GDB
```

Example:

```bash
gdb ./program
```

Common commands:

```text
breakrun
next
step
print
backtrace
```

---

# GNAT Studio

AdaCore develops the IDE:

```text
GNAT Studio
```

It integrates closely with:

- GNAT,
- GPRbuild,
- SPARK,
- debuggers.

It is not required, however.

---

# Visual Studio Code

Ada has editor support and a language server for VS Code and other editors.

If you already work in VS Code, you do not have to change your whole workflow.

A typical modern setup can be:

```text
VS Code
+
Ada Language Server
+
Alire
+
GNAT
```

See:

[Visual Studio Code](techhandbook:doc-039)

---

# Formatting style

Ada has a recognizable visual style.

Example:

```ada
procedure Withdraw
  (Balance : in out Natural;
   Amount  : Positive)
is
begin
   Balance := Balance - Amount;
end Withdraw;
```

Code is often vertically laid out and deliberately explicit.

The goal is not minimizing character count.

The goal is readability.

---

# Naming

Typical Ada style:

```text
Engine_Temperature
Current_Balance
Read_Message
Maximum_Retry_Count
```

Ada works well with descriptive names.

In safety-critical software, a few extra characters are a tiny cost.

---

# Do not fight the language

If you try to write Ada exactly like C:

```text
everything is Integer
access types everywhere
unchecked operations everywhere
no ranges
no packages
no contracts
```

you lose much of the language's value.

Ada works best when the type system is allowed to describe the problem.

---

# Poor model example

```ada
Mode : Integer;
```

Meaning:

```text
0 = off
1 = standby
2 = run
3 = emergency
```

Now these are also legal values:

```text
-500
42
999999
```

---

# Better model

```ada
type Operating_Mode is
  (Off,
   Standby,
   Run,
   Emergency);

Mode : Operating_Mode := Off;
```

You cannot accidentally set:

```text
42
```

because 42 is not an operating mode.

---

# An even better domain model

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

The program begins to speak the language of its domain.

---

# Range checks as documentation

```ada
subtype Port_Number is
  Integer range 0 .. 65_535;
```

This is simultaneously:

- a type constraint,
- documentation,
- a runtime check opportunity,
- information for static analyzers.

A comment would be much weaker.

---

# Enumeration instead of Boolean

Sometimes:

```ada
Enabled : Boolean;
```

is enough.

But sometimes two states are not enough.

Instead of:

```ada
Is_Ready : Boolean;
```

perhaps use:

```ada
type Device_State is
  (Starting,
   Ready,
   Failed,
   Shutdown);
```

The model becomes more precise.

---

# Named ranges

Instead of:

```ada
for I in 0 .. 99 loop
```

often prefer:

```ada
for I in Buffer'Range loop
```

The code no longer depends on one fixed size.

---

# Unconstrained parameters

A procedure can accept a `String` of any bounds.

```ada
procedure Print_Name
  (Name : String)
is
begin
   ...
end Print_Name;
```

You do not need to know its length when compiling the procedure.

`Name'First`, `Name'Last`, and `Name'Range` describe the actual object.

---

# `declare` blocks

Ada allows local declaration blocks:

```ada
declare

   X : Integer := 10;

begin

   Put_Line
     (Integer'Image (X));

end;
```

The variables exist only within that scope.

This is useful for keeping scope small.

---

# Nested procedures

Procedures can be nested.

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

The nested procedure can access data from its enclosing scope.

---

# Scope

Ada controls name visibility carefully.

That matters in large systems.

Less global state usually means fewer surprises.

---

# Elaboration

Ada packages can contain initialization code.

Example:

```ada
package body Config is

begin

   Load_Config;

end Config;
```

This code executes during elaboration.

Ada must determine a valid elaboration order across dependencies.

That is one reason the binder exists.

---

# Finalization

Ada supports controlled initialization and finalization of objects.

Package:

```text
Ada.Finalization
```

provides mechanisms related to:

```text
Initialize
Adjust
Finalize
```

This covers ideas related to:

- RAII,
- destructors,
- resource management.

---

# Determinism

Ada is often chosen where predictable behavior matters.

That does not mean:

> every Ada program is automatically deterministic.

But the language and its profiles provide tools that support analyzability:

- ranges,
- static typing,
- controlled tasking,
- real-time facilities,
- restricted language profiles,
- formal analysis.

---

# Safety versus security

These are different concerns.

## Safety

Software must not cause unsafe physical or operational behavior.

Examples:

```text
train control
autopilot
medical device
```

## Security

Software should resist intentional hostile actions.

Examples:

```text
network attack
malicious input
privilege escalation
```

Ada and SPARK are used in both contexts.

---

# Certification

Ada is often found in projects subject to demanding standards.

Examples of standards used in relevant domains include:

```text
DO-178C
EN 50128 / EN 50657
ISO 26262
IEC 61508
ECSS
```

Using Ada does not automatically certify a system.

Certification concerns the process, artifacts, evidence, tools, and compliance strategy.

The language can, however, make certain required properties easier to demonstrate.

---

# There is no magical safe language

Ada does not eliminate the need for:

- good design,
- testing,
- code review,
- requirements analysis,
- secure architecture,
- disciplined engineering processes.

You can write a bad program in Ada.

The difference is that the language provides many mechanisms that make certain classes of mistakes harder to introduce or easier to detect.

---

# Why did Ada not conquer the whole software world?

Several reasons.

## History

For a long time the language was associated with:

```text
military projects
government contracts
expensive compilers
```

## Language size

Ada is large.

It has many mechanisms.

That can discourage people looking for a minimalist language.

## Ecosystem

It does not have an ecosystem the size of:

```text
npm
PyPI
Maven
```

## Market needs

Most web applications do not need avionics-level rigor.

JavaScript is sufficient for many problems.

---

# But Ada is not dead

This matters.

Ada still has:

- an active standard,
- GCC GNAT,
- Alire,
- GPRbuild,
- SPARK,
- GNATprove,
- libraries,
- modern IDE/editor support,
- industrial projects.

It is a niche language.

Not a dead language.

---

# Small domain project

Imagine a battery-management system.

Instead of:

```ada
Charge : Integer;
Voltage : Float;
Mode : Integer;
```

create:

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

Data:

```ada
Charge  : Charge_Percent := 80;
Voltage : Volts := 12.5;
Mode    : Battery_Mode := Idle;
```

The code is immediately more expressive.

---

# Battery contract

```ada
procedure Consume
  (Charge : in out Charge_Percent;
   Amount : Positive)
with
  Pre => Amount <= Charge;
```

No comment is needed saying:

```text
Amount cannot be larger than current charge
```

The rule is part of the program.

---

# SPARK version

We can add:

```ada
procedure Consume
  (Charge : in out Charge_Percent;
   Amount : Positive)
with
  Pre  => Amount <= Charge,
  Post => Charge =
            Charge'Old - Amount;
```

Now the specification also says exactly what the result must be.

---

# Testing

Formal proof does not replace every form of testing.

Tests still cover things such as:

- integration,
- hardware,
- UI,
- system behavior,
- timing,
- external libraries,
- real deployment environments.

The strongest approach often combines:

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

The Ada ecosystem includes the testing framework:

```text
AUnit
```

It can be used for conventional unit tests.

With Alire, testing libraries can be found and added as project dependencies.

---

# `pragma Assert`

For small checks, sometimes this is enough:

```ada
pragma Assert
  (Add (2, 3) = 5);
```

With assertions enabled, a failing condition is reported when the program runs.

---

# Fuzzing

Ada does not prevent fuzzing.

In fact, runtime checks can turn incorrect behavior into explicit exceptions instead of silent memory corruption.

That can be useful when testing robustness against unexpected inputs.

---

# Performance

Ada compiles to native code.

GNAT uses GCC infrastructure.

There is no fundamental reason an Ada program must be slow.

Costs can come from:

- runtime checks,
- tasking,
- abstractions,
- specific runtime choices.

But the compiler can optimize many constructs very effectively.

---

# Checks versus performance

Ada lets you control checks.

But the rule should be:

> do not disable checks merely because you can.

First:

1. measure,
2. locate the real problem,
3. understand the consequences,
4. consider proof,
5. only then consider disabling a specific check.

---

# `pragma Suppress`

Ada has mechanisms for disabling runtime checks.

Example:

```ada
pragma Suppress (Range_Check);
```

This is powerful.

And it is also an easy way to throw away some of Ada's strongest benefits.

Use it deliberately.

---

# Memory safety

Ada provides many memory-safety mechanisms:

- bounds checks,
- range checks,
- strong types,
- controlled access types,
- runtime checks.

That does not mean:

> every possible Ada program is completely memory-safe.

Mechanisms such as:

```text
Unchecked_*
address clauses
FFI
low-level system code
```

can bypass part of the normal protection model.

---

# `System.Address`

Low-level code can work with:

```text
System.Address
```

This is the world of raw addresses.

It should be used where necessary.

Not as a replacement for normal typed programming.

---

# Embedded without a full runtime

Ada can be used in very small environments.

Different runtime profiles can provide:

- full runtime,
- light runtime,
- minimal runtime,
- bare-metal support.

This allows Ada to be used where there is no full operating system.

---

# Cross compilation

Alire and GNAT ecosystems include cross toolchains for targets such as:

```text
ARM
RISC-V
AVR
```

That makes Ada usable directly on microcontrollers.

---

# Ada Drivers Library

The embedded Ada ecosystem includes libraries and examples for direct peripheral access on microcontrollers.

That is a good next step after learning the language fundamentals.

---

# Games and graphics

Ada is not the first language people associate with game development.

But bindings and libraries exist.

In Alire you can find bindings for ecosystems such as:

```text
raylib
SDL
OpenGL
```

So a normal small game is perfectly possible.

---

# Backend development

Ada can also be used for servers.

Libraries exist for:

- HTTP,
- sockets,
- TLS bindings,
- JSON,
- XML,
- databases.

The ecosystem is smaller than Go or Java, but there is no fundamental technical barrier to writing backend software in Ada.

---

# CLI applications

CLI programs are a natural use case.

Package:

```text
Ada.Command_Line
```

provides access to arguments.

Example:

```ada
with Ada.Command_Line;

if Ada.Command_Line.Argument_Count > 0 then
   ...
end if;
```

---

# Files

The standard library provides multiple I/O models.

Among them:

```text
Ada.Text_IO
Ada.Sequential_IO
Ada.Direct_IO
Ada.Streams
```

The appropriate one depends on the data model.

---

# Streams

Streams support serialization and transfer of values.

Ada includes stream-related attributes such as:

```text
'Read
'Write
'Input
'Output
```

This is another example of how much integration machinery exists directly in the language and standard library.

---

# Unicode

Ada 2022 defines a broad character model aligned with Unicode/ISO 10646.

In practice, file encoding and I/O behavior still depend on implementation and environment details.

Do not assume every historical Ada application behaves like a modern UTF-8-native stack.

---

# `Wide_Character` and `Wide_Wide_Character`

Ada provides:

```text
Character
Wide_Character
Wide_Wide_Character
```

and corresponding string types.

These support larger character repertoires.

---

# Dynamic allocation

Ada supports:

```ada
new
```

Example:

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

But in high-integrity and real-time systems, dynamic allocation is often deliberately restricted.

---

# Deterministic memory use

In real-time systems we often want to know:

```text
how much memory is needed
when it is allocated
how long operations take
```

So designs may prefer:

- static allocation,
- memory pools,
- controlled storage pools,
- restricted runtime profiles.

---

# Storage pools

Ada allows control over how access-type objects are allocated.

This is an advanced feature, but important in embedded and real-time software.

You can implement custom:

```text
storage pools
```

instead of relying on a general-purpose heap.

---

# Generics versus templates

Ada generics are related in spirit to:

- C++ templates,
- Java generics,
- Rust generics.

But the model is different.

An Ada generic explicitly declares what properties are required from formal types and operations.

That makes the generic interface a precise compile-time contract.

---
# Generic package

Conceptual example:

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

Instantiate:

```ada
package Integer_Stack is
  new Stack (Integer);
```

---

# Object-oriented programming

Ada 95 introduced a substantial object-oriented model.

Its foundation is:

```text
tagged types
```

Example:

```ada
type Shape is tagged record
   X : Float;
   Y : Float;
end record;
```

You can extend it:

```ada
type Circle is new Shape with record
   Radius : Float;
end record;
```

---

# Dispatching

Operations on tagged types can be dispatching operations.

This provides dynamic polymorphism similar in purpose to virtual dispatch in other object-oriented languages.

Ada does not require the whole program to be organized around objects.

You can combine:

- procedural code,
- packages,
- generics,
- object-oriented programming,

where each makes sense.

---

# Interfaces

Ada also supports interface types similar in purpose to interfaces in Java or C#.

They let you describe behavior independently of one concrete data representation.

---

# Not everything is an object

This distinguishes Ada from languages such as Smalltalk and from strongly class-centric designs.

Ada is:

```text
multi-paradigm
```

It does not force classes to be the central unit of every program.

---

# Operator overloading

For a type:

```ada
type Vector is record
   X : Float;
   Y : Float;
end record;
```

we can define:

```ada
function "+"
  (Left  : Vector;
   Right : Vector)
   return Vector;
```

Then:

```ada
C := A + B;
```

can have a natural domain-specific meaning.

---

# Syntactic noise?

Ada is more verbose than Go or Python.

Example:

```ada
if X > 10 then
   Do_Something;
end if;
```

instead of:

```c
if (x > 10) {
    doSomething();
}
```

But the reader sees:

```text
end if
```

rather than only:

```text
}
```

In long functions, that can be genuinely helpful.

---

# Is Ada difficult?

The basics:

```text
not especially
```

Much of the syntax is regular.

The more difficult areas are:

- the full type system,
- access types,
- tasking,
- representation clauses,
- generics,
- SPARK,
- real-time facilities,
- the complete language standard.

You do not need to know all of Ada to write useful software.

---

# Minimum set for an ordinary application

You mainly need:

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

Everything else can come later.

---

# Minimum set for embedded work

Add:

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

# Minimum set for SPARK

Add:

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

Formal proof of loops sometimes requires stating a property that remains true after each iteration.

This is a:

```text
loop invariant
```

Conceptual example:

```ada
pragma Loop_Invariant
  (Sum >= 0);
```

In a real proof, the invariant must be strong enough to connect the loop's internal state to the final property we want to prove.

---

# The prover cannot read your mind

This matters.

Code may be logically correct while GNATprove still lacks enough information to prove it automatically.

You may need to provide:

- a contract,
- an invariant,
- a lemma,
- a stronger type,
- a clearer program structure.

Formal verification is cooperation between:

```text
programmer
+
specification
+
automated prover
```

---

# Proof levels

GNATprove provides different analysis and proof modes.

A workflow can include quick:

```text
flow/check
```

analysis and deeper:

```text
prove
```

runs.

Large projects do not necessarily run the most expensive proof configuration after every tiny edit.

---

# False alarm versus unproved property

If the prover says:

```text
cannot prove
```

that does not automatically mean:

```text
the program definitely contains a bug
```

It may mean:

- there is a real bug,
- the contract is too weak,
- the prover needs more information,
- the construction is difficult for automatic reasoning.

But a successful proof of a specific property gives a much stronger guarantee than one passing test case.

---

# A contract is not a complete specification of reality

If you write the wrong contract and prove the implementation against it, you can still produce software that faithfully implements the wrong requirement.

Formal proof answers:

> does the implementation satisfy what you specified?

It does not automatically answer:

> did you specify what the customer actually needs?

---

# Example of a wrong specification

Suppose the requirement says:

```text
a withdrawal reduces the balance
```

but the contract says:

```ada
Post => Balance = Balance'Old + Amount
```

A prover may successfully verify an implementation that adds money.

The problem is the specification.

Formal methods do not replace understanding the domain.

---

# The strongest idea: layers of protection

Ada is at its best when several layers work together:

```text
type
+
range
+
contract
+
runtime check
+
static analysis
+
proof
+
test
```

Not every application needs every layer.

But the language makes them available.

---

# Comparing four language philosophies

## C

```text
you have full control
be careful
```

## Go

```text
keep the language small
so programs stay simple
```

## Rust

```text
ownership and the borrow checker
eliminate major classes of memory bugs
```

## Ada

```text
describe the domain,
constraints and contracts precisely,
then let the tools help enforce them
```

---

# What Ada gives you that is easy to underestimate

Its biggest value is often not any single feature.

It is the ability to encode **programmer intent directly in the program**.

Compare:

```ada
X : Integer;
```

with:

```ada
subtype Retry_Count is
  Integer range 0 .. 5;

Retries : Retry_Count := 0;
```

The second version says much more.

---

# Code as a model of the world

Good Ada code tries to mirror the problem domain.

Instead of:

```text
int
int
int
bool
```

we can have:

```text
Altitude
Airspeed
Temperature
Engine_State
Valve_Position
```

The compiler can then help catch cases where two things are mixed merely because they happen to use the same physical representation.

---

# Is Ada worth learning in 2026?

If your goal is:

```text
maximum number of frontend job offers
```

probably not.

TypeScript will provide a better market return.

If you are interested in:

- programming languages,
- systems,
- safety-critical development,
- embedded software,
- formal methods,
- strong type systems,
- reliable software design,

Ada is extremely interesting.

---

# Ada as an educational language

Ada teaches excellent habits:

- naming types,
- making ranges explicit,
- designing APIs,
- thinking about invariants,
- separating specification from implementation,
- controlling side effects.

Even if you later return to C, Go, or TypeScript, many of these habits remain valuable.

---

# Mini-project for further learning

A good next project after the guessing game is:

```text
bank account simulator
```

Types:

```ada
type Money is delta 0.01 digits 12;

subtype Percentage is
  Integer range 0 .. 100;
```

Operations:

```text
Deposit
Withdraw
Transfer
Balance
```

Contracts:

```text
Amount > 0
Amount <= Balance
total funds do not change during a transfer
```

That is an excellent laboratory for:

```text
Ada + SPARK
```

---

# Second project: temperature controller

Model:

```text
Temperature
Target_Temperature
Heater_State
Sensor_State
```

Ranges:

```text
-40..150
```

Contracts:

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

Now we are approaching a real embedded-system design.

---

# Third project: C64? Technically, as a thought experiment

After the assembly article, an amusing comparison is:

```text
6502/C64 + Ada
```

This is not the most natural current GNAT target, but it illustrates the philosophical contrast nicely.

Assembly:

```text
maximum proximity to hardware
```

Ada:

```text
maximum semantic information and constraint checking
```

In practice, much more realistic modern embedded targets are:

```text
ARM
RISC-V
AVR
```

---

# Quick syntax cheat sheet

## Variable

```ada
X : Integer := 10;
```

## Constant

```ada
Max : constant Integer := 100;
```

## Type

```ada
type Meters is new Float;
```

## Subtype

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

# Tool cheat sheet

| Tool | Purpose |
|---|---|
| `gnat` | Ada compiler toolchain |
| `gnatmake` | simple automatic build |
| `gprbuild` | GPR project build system |
| `alr` | Alire - packages, toolchains, projects |
| `gnatprove` | SPARK formal analysis |
| `gdb` | debugger |
| GNAT Studio | IDE |
| Ada Language Server | editor/IDE language support |

---

# File extension cheat sheet

| Extension | Meaning |
|---|---|
| `.adb` | body / procedure / implementation |
| `.ads` | specification |
| `.gpr` | GPRbuild project |
| `alire.toml` | Alire manifest |

---

# Typical new project in 2026

Simplest route:

```bash
alr init --bin my_app
cd my_app
alr build
alr run
```

Edit:

```text
src/my_app.adb
```

Add a dependency:

```bash
alr with crate_name
```

If you want SPARK tooling:

```bash
alr with gnatprove
```

and run the tools inside the project environment.

---

# Typical simple project without Alire

Files:

```text
main.adb
calculator.ads
calculator.adb
```

Build:

```bash
gnatmake main.adb
```

GNAT finds and builds the required units.

---

# Typical larger project

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

Tests can use:

```text
a separate test crate
or AUnit
```

---

# What should you learn next?

If you want to learn Ada properly:

## 1. Basics

- types,
- ranges,
- procedures,
- functions,
- packages.

## 2. Data modelling

- arrays,
- records,
- discriminants,
- access types.

## 3. Modularity

- packages,
- private types,
- generics.

## 4. Runtime model

- exceptions,
- tasks,
- protected objects.

## 5. Low-level programming

- representation clauses,
- volatile,
- C interfacing,
- embedded development.

## 6. High-integrity programming

- contracts,
- SPARK,
- GNATprove,
- real-time profiles.

---

# Most important things to remember

If you forget most of this article, remember these points:

1. Ada is a normal modern compiled programming language.
2. GNAT belongs to the GCC ecosystem.
3. Alire provides a modern package and toolchain workflow.
4. Ada is strongly typed.
5. A new type really is a new type.
6. A subtype can constrain legal values.
7. Bounds and range checks are fundamental to the language model.
8. A package separates specification from implementation.
9. Contracts can be part of code, not merely comments.
10. Tasking is built into the language.
11. Protected objects support safer concurrency.
12. Ada can work very close to hardware.
13. SPARK can formally prove specific properties of software.
14. Formal proof does not replace correct requirements or all testing.
15. Ada is not dead - it is niche and highly specialized.

---

# One sentence that best describes Ada

If C says:

> trust the programmer,

Ada says:

> **describe precisely what the program is allowed to do, so the language and tools can help you notice when it does something else.**

That is its greatest strength.

---

# Related TechHandbook material

- [20 modern programming languages worth knowing](techhandbook:doc-058)
- [Old programming languages that shaped computing](techhandbook:doc-059)
- [Assembly from scratch - from registers and memory to a real program](techhandbook:doc-060)
- [C - reading, building and debugging projects](techhandbook:doc-019)
- [Go - reading code](techhandbook:doc-020)
- [Python - basics](techhandbook:doc-023)
- [Debian - shell](techhandbook:doc-027)
- [Shell programming](techhandbook:doc-031)
- [Visual Studio Code](techhandbook:doc-039)
- [GitHub](techhandbook:doc-014)

---

# Official sources and documentation

Tooling information status: September 2026.

## Standard

- Ada 2022 documents: https://www.adaic.org/ada-resources/standards/ada22/
- Ada 2022 Reference Manual: https://www.adaic.org/resources/add_content/standards/22rm/html/RM-TTL.html

## Learning Ada

- AdaCore Learn: https://learn.adacore.com/- Introduction to Ada: https://learn.adacore.com/courses/intro-to-ada/

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

# End of the language series

This four-part series shows four very different views of programming.

## 1. Modern languages

The world you are likely to encounter in everyday software development:

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

## 2. Historical languages

Where many ideas that now seem obvious came from:

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

## 3. Assembly

What exists underneath nearly every abstraction:

```text
CPU
registers
memory
stack
instructions
```

## 4. Ada

What happens when a language is designed around the idea that:

```text
software should not merely run,
but should be easier to analyze,
constrain and verify
```

Together, these four articles show something more important than the syntax of any one language.

They show that a programming language is fundamentally:

> **a way of thinking about problems and a collection of trade-offs its designers considered important.**
