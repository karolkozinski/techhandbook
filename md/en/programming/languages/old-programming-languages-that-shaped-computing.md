---
id: "doc-059"
title: "Old programming languages that shaped computing"
slug: "old-programming-languages-that-shaped-computing"
description: "A historical and practical guide to the languages that shaped modern computing: FORTRAN, COBOL, ALGOL, BASIC, Pascal, Lisp, Smalltalk, Prolog, Forth, PL/I, Logo, Ada, and assembly."
lang: "en"
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

# Old programming languages that shaped computing

When we look at modern programming languages, it is easy to get the impression that programming started with C, Java, Python, and JavaScript.

It did not.

Before Unix existed, before anyone built a web browser, before personal computers reached ordinary desks, programmers were already solving problems that are still familiar today:

- how to describe an algorithm independently of a particular processor,
- how to manage memory,
- how to create procedures and functions,
- how to organize code into blocks,
- how to represent data,
- how to communicate with databases,
- how to express logic,
- how to make programming accessible to people outside electronics laboratories.

Many ideas that now seem obvious were created or popularized in those early languages.

This article is not a list of “dead languages.”

Some are mostly historical. Others still run in banks, laboratories, scientific computing centers, aviation, rail systems, and large enterprises.

More importantly, most of them can still be run on a modern computer.

So we will do two things at once:

1. see **what each language contributed to computing**,
2. see **how to run it today**.

And we will even force FORTRAN and COBOL to play our standard game:

> guess a number from 0 to 100.

---

# First: what programming looked like before IDEs

A modern programmer opens VS Code, IntelliJ, or a terminal, writes code, presses `Run`, and sees the result a second later.

For much of computing history, that was not how programming worked.

## Punched cards

A program could exist as a physical stack of cards.

Each card stored information through a pattern of holes.

A typical workflow looked roughly like this:

```text
write program
    |
    v
transfer program to cards
    |
    v
hand the deck to a computer operator
    |
    v
wait for your turn
    |
    v
computer processes the job
    |
    v
collect the printout
```

If there was a syntax error, you did not necessarily fix it five seconds later.

You might correct a card and submit the job again.

That helps explain why early languages cared so much about:

- unambiguous syntax,
- conserving memory,
- predictable data layout,
- whole-program compilation.

## Mainframe

A mainframe was not simply “a large PC.”

It was a central computer serving users and entire organizations.

Programmers did not need to sit next to the machine.

Programs entered a job queue:

```text
JOB 1
JOB 2
JOB 3
JOB 4
```

The system executed them according to scheduling rules.

COBOL grew out of this world.

## Terminal

Later came something much closer to modern interactive computing.

A terminal allowed a user to communicate with a central computer.

It might look like:

```text
keyboard + screen
```

but the terminal itself did not run the program.

The program ran on the central machine.

Time-sharing systems allowed many users to work with one computer at once and dramatically accelerated experimentation.

## Microcomputer

The 1970s and 1980s changed everything.

The computer moved:

```text
from the computing center
        ↓
to the company
        ↓
onto the desk
        ↓
into the home
```

This was the era in which BASIC, Pascal, assembly language, and platform-specific programming exploded in popularity.

For the first time on a large scale, a programmer could:

```text
write
run
see the error
fix
run again
```

without involving a computer-center operator.

---

# Short timeline

| Year | Language / event | Why it mattered |
|---:|---|---|
| 1940s/50s | Assembly | symbolic representation of CPU instructions |
| 1957 | FORTRAN | practical high-level programming for science |
| 1958 | Lisp | symbolic and functional programming |
| 1959 | COBOL | business-oriented programming and data processing |
| 1960 | ALGOL 60 | block structure and enormous influence on later syntax |
| 1964 | BASIC | programming made accessible to students and later microcomputers |
| mid-1960s | PL/I | attempt to combine scientific and business computing |
| 1967 | Logo | programming as an educational tool |
| late 1960s/70s | Forth | stack-based minimalism and embedded systems |
| 1968 | ALGOL 68 | ambitious type system and general-purpose design |
| 1970 | Pascal | structured programming education |
| 1970s | Smalltalk | objects, GUI, integrated programming environment |
| 1972 | Prolog | logic programming |
| 1983 | Ada | safety and large high-integrity systems |

These dates do not mean that a language appeared on a single day. Language projects evolved over years, and standards and implementations continued developing for decades.

---

# 1. FORTRAN

## What does the name mean?

The name comes from:

```text
FORmula TRANslation
```

FORTRAN was created at IBM under the leadership of John Backus.

The first compiler appeared in 1957.

For a modern programmer this may sound ordinary, but at the time the idea was revolutionary:

> a scientist should be able to describe calculations using formulas and high-level instructions instead of manually constructing processor instructions.

## Why FORTRAN was revolutionary

Early computers were programmed very close to the hardware.

FORTRAN demonstrated that a compiler could translate a readable expression such as:

```fortran
C = A + B
```

into efficient machine code.

In the 1950s it was not obvious that compiler-generated programs could be fast enough to convince scientists to stop hand-writing low-level code.

FORTRAN helped break that barrier.

## Is FORTRAN dead?

No.

The spelling changed as well. Modern standards usually use:

```text
Fortran
```

rather than the historical:

```text
FORTRAN
```

Modern Fortran is still used in:

- scientific computing,
- physics,
- meteorology,
- climate models,
- HPC,
- simulation,
- numerical libraries.

Modern Fortran looks much more contemporary than FORTRAN 77.

## How to run Fortran today

The easiest option is GNU Fortran:

```text
gfortran
```

It is the Fortran frontend in GCC.

### Windows

One convenient route is MSYS2.

After installing MSYS2, open a UCRT64 terminal:

```bash
pacman -S mingw-w64-ucrt-x86_64-gcc-fortran
```

Verify:

```bash
gfortran --version
```

### macOS

Homebrew:

```bash
brew install gcc
```

The GCC package includes `gfortran`.

Verify:

```bash
gfortran --version
```

### Linux / Debian

```bash
sudo apt update
sudo apt install gfortran
```

Verify:

```bash
gfortran --version
```

## First program

File:

```text
hello.f90
```

Code:

```fortran
program hello
    implicit none

    print *, "Hello from Fortran!"
end program hello
```

Compile:

```bash
gfortran hello.f90 -o hello
```

Run:

Linux/macOS:

```bash
./hello
```

Windows:

```powershell
.\hello.exe
```

## Why `.f90`?

Historical source files such as:

```text
.f
.for
.ftn
```

are often interpreted by compilers as old `fixed form` source.

The extension:

```text
.f90
```

usually means modern `free form`.

It does not mean the program must use only the Fortran 90 standard.

## FORTRAN versus modern Fortran

Old code might look like:

```fortran
      DO 100 I = 1, 10
      PRINT *, I
  100 CONTINUE
```

Modern style:

```fortran
do i = 1, 10
    print *, i
end do
```

It is still the same language family, but the ergonomics are very different.

---

# Guess a number from 0 to 100 in Fortran

Yes, it can do that too.

File:

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

    print *, "Guess a number from 0 to 100."

    do
        write(*, '(A)', advance='no') "Your guess: "
        read(*, *, iostat=io_status) guess

        if (io_status /= 0) then
            print *, "Enter a valid number."
            stop
        end if

        if (guess < secret) then
            print *, "Too low!"
        else if (guess > secret) then
            print *, "Too high!"
        else
            print *, "Correct!"
            exit
        end if
    end do

end program guess_number
```

Compile:

```bash
gfortran guess.f90 -o guess
```

Run:

```bash
./guess
```

A language whose first implementation appeared in the 1950s has just played a guessing game with us.

---

# 2. COBOL

## What is it?

COBOL stands for:

```text
COmmon Business-Oriented Language
```

It was created at the end of the 1950s as a language for business computing.

The language emerged from work by the CODASYL committee. Grace Hopper was one of the key figures whose earlier work and ideas about more human-readable programming languages strongly influenced COBOL's development.

However, it is too simplistic to say:

> Grace Hopper invented COBOL by herself.

COBOL was the result of work by many people and organizations.

## What problem did it solve?

Business computing primarily needed:

- record processing,
- reports,
- invoices,
- payroll,
- accounts,
- transactions,
- large data sets.

That is why COBOL looks different from C.

Its syntax was intended to be descriptive.

Example:

```cobol
ADD TAX TO TOTAL
```

or:

```cobol
IF BALANCE IS GREATER THAN ZERO
    DISPLAY "ACCOUNT ACTIVE"
END-IF
```

It is verbose.

That is a feature, not an accident.

## Classic program structure

A traditional COBOL program is divided into divisions:

```text
IDENTIFICATION DIVISION
ENVIRONMENT DIVISION
DATA DIVISION
PROCEDURE DIVISION
```

Roughly:

```text
what the program is
where it runs
what data it has
what it does
```

## Does COBOL still run?

Yes.

COBOL is still found especially in:

- banking,
- insurance,
- government systems,
- mainframes,
- settlement systems,
- long-lived transaction-processing systems.

The reason is straightforward.

If a system:

- has worked for decades,
- handles huge numbers of transactions,
- contains millions of lines of proven code,

rewriting it purely because the language is old may be riskier than maintaining it.

## GnuCOBOL

For experiments we will use:

```text
GnuCOBOL
```

The `cobc` compiler translates COBOL into C and then uses a C compiler and linker to produce an executable.

### Windows

The easiest option is MSYS2.

In a UCRT64 terminal:

```bash
pacman -S mingw-w64-ucrt-x86_64-gnucobol
```

Verify:

```bash
cobc --version
```

### macOS

Homebrew:

```bash
brew install gnucobol
```

Verify:

```bash
cobc --version
```

### Linux / Debian

```bash
sudo apt update
sudo apt install gnucobol
```

Verify:

```bash
cobc --version
```

## Hello World

File:

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

Compile:

```bash
cobc -x -free hello.cob -o hello
```

Run:

```bash
./hello
```

The option:

```text
-free
```

allows a freer source layout instead of the historical fixed-column format.

---

# Guess a number from 0 to 100 in COBOL

COBOL can do this as well.

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

           DISPLAY "Guess a number from 0 to 100.".

           PERFORM UNTIL FINISHED = "Y"

               DISPLAY "Your guess: " WITH NO ADVANCING
               ACCEPT GUESS-NUMBER

               IF GUESS-NUMBER < SECRET-NUMBER
                   DISPLAY "Too low!"
               ELSE
                   IF GUESS-NUMBER > SECRET-NUMBER
                       DISPLAY "Too high!"
                   ELSE
                       DISPLAY "Correct!"
                       MOVE "Y" TO FINISHED
                   END-IF
               END-IF

           END-PERFORM.

           STOP RUN.
```

Compile:

```bash
cobc -x -free guess.cob -o guess
```

Run:

```bash
./guess
```

COBOL is not elegant for this kind of task.

But that is not what it was designed for.

It feels far more natural with a problem such as:

```text
read a million records
check accounts
calculate interest
produce a report
write results
```

That is exactly the kind of work it performed for decades.

---

# 3. ALGOL

## Not one language, but a family

ALGOL stands for:

```text
ALGOrithmic Language
```

The most important versions are:

- ALGOL 58,
- ALGOL 60,
- ALGOL 68.

ALGOL 60 in particular had an enormous influence on languages that came later.

## What did ALGOL give us?

Among other things, it helped popularize:

- block structure,
- local variables,
- recursion,
- formal syntax descriptions,
- writing algorithms in academic publications.

If you see:

```text
begin
    ...
end
```

or blocks such as:

```text
{
    ...
}
```

you are looking at ideas whose popularization owes a great deal to the ALGOL family.

Its influence can be seen in:

- Pascal,
- C,
- Ada,
- Modula,
- many later structured languages.

## BNF

ALGOL is also strongly connected to a notation used for formally describing programming-language syntax:

```text
Backus-Naur Form
```

or BNF.

A simplified grammar rule might look like:

```text
<expression> ::= <number> | <expression> "+" <expression>
```

This describes:

> what a valid expression may consist of.

Formal grammars like this are still foundational when designing parsers and languages.

## ALGOL 68

ALGOL 68 was a much more ambitious language.

It included, among other things:

- a rich type system,
- references,
- data structures,
- arrays,
- procedures as values,
- extensive operators.

For many years it was mostly historical rather than practical.

Then something amusing happened.

In 2026, ALGOL 68 can still be run on a modern computer, and GCC 16 even gained an experimental frontend named:

```text
ga68
```

## Simplest route: Algol 68 Genie

For learning, Algol 68 Genie is still easier.

### Windows

The project publishes a ready-made executable for Windows 11.

After extracting:

```powershell
a68g --version
```

### macOS

Homebrew:

```bash
brew install algol68g
```

### Linux / Debian

Debian provides a package:

```bash
sudo apt update
sudo apt install algol68g
```

Verify:

```bash
a68g --version
```

## Program

File:

```text
hello.a68
```

```algol68
BEGIN
    print(("Hello from ALGOL 68!", new line))
END
```

Run:

```bash
a68g hello.a68
```

## What about GCC?

In GCC 16, the experimental ALGOL 68 compiler is called:

```text
ga68
```

It is remarkable that a language designed more than half a century ago gained a modern frontend in one of the world's most important compiler suites.

For ordinary experiments, Algol 68 Genie is still the easier choice.

---

# 4. BASIC

## The name

BASIC was originally developed as:

```text
Beginner's All-purpose Symbolic Instruction Code
```

It was created at Dartmouth College in 1964.

Its main creators were John Kemeny and Thomas Kurtz.

## The goal

BASIC tried to do something extremely important:

> let people who were not professional programmers use computers.

That sounds familiar.

Today Python often fills a similar role.

## Time-sharing

BASIC was closely associated with time-sharing systems.

A student could sit at a terminal and type:

```basic
PRINT 2 + 2
```

instead of preparing a deck of cards.

That dramatically changed how programming could be taught.

## BASIC and microcomputers

Later BASIC became almost synonymous with home computers.

On many systems, users saw a BASIC interpreter immediately after startup.

This included machines from families such as:

- Commodore,
- Apple,
- Atari,
- ZX Spectrum,
- IBM PC and compatibles.

The computer would greet you with something like:

```text
READY.
```

and wait for you to type.

## Line numbers

Classic BASIC:

```basic
10 PRINT "HELLO"
20 GOTO 10
```

Line numbers served as both:

- ordering,
- jump targets.

Hence the famous:

```text
GOTO
```

## How to experiment with BASIC today

A useful modern implementation is:

```text
QB64-PE
```

or QB64 Phoenix Edition.

It is compatible with a large part of QBasic/QuickBASIC while producing modern programs for:

- Windows,
- macOS,
- Linux.

Project site:

https://www.qb64phoenix.com/

## Guess the number

```basic
RANDOMIZE TIMER
secret% = INT(RND * 101)

PRINT "Guess a number from 0 to 100."

DO
    INPUT "Your guess: ", guess%

    IF guess% < secret% THEN
        PRINT "Too low!"
    ELSEIF guess% > secret% THEN
        PRINT "Too high!"
    ELSE
        PRINT "Correct!"
        EXIT DO
    END IF
LOOP
```

This already looks surprisingly modern.

---

# 5. Pascal

## Why was it created?

Pascal was designed by Niklaus Wirth.

The first version appeared around 1970.

One of its main goals was teaching:

```text
well-structured programming
```

## Structured programming

Instead of building a program as a maze of:

```text
GOTO 100
GOTO 450
GOTO 20
```

the programmer was encouraged to use readable structures:

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

## Types

Pascal was also strongly typed.

That helped teach discipline:

```pascal
var
  Age: Integer;
  Name: String;
```

## Turbo Pascal

For an enormous number of programmers in the 1980s and 1990s, Pascal meant:

```text
Turbo Pascal
```

Borland combined:

- compiler,
- editor,
- debugger,
- build environment,

into one fast integrated tool.

In a sense, it was one of the experiences that led toward the modern IDE.

## Pascal today

The easiest modern implementation to experiment with is:

```text
Free Pascal
```

It also supports many Object Pascal features.

### Windows

Installer:

https://www.freepascal.org/

Verify:

```powershell
fpc -iV
```

### macOS

Free Pascal publishes macOS packages.

You can also use Lazarus, a graphical IDE built around Free Pascal.

### Linux / Debian

```bash
sudo apt update
sudo apt install fpc
```

Verify:

```bash
fpc -iV
```

## Compilation

```bash
fpc hello.pas
```

## Guess the number

```pascal
program GuessNumber;

var
  Secret: Integer;
  Guess: Integer;

begin
  Randomize;
  Secret := Random(101);

  Writeln('Guess a number from 0 to 100.');

  repeat
    Write('Your guess: ');
    Readln(Guess);

    if Guess < Secret then
      Writeln('Too low!')
    else if Guess > Secret then
      Writeln('Too high!')
    else
      Writeln('Correct!');

  until Guess = Secret;
end.
```

Compile:

```bash
fpc guess.pas
```

Run:

```bash
./guess
```

---

# 6. Lisp

## One of the oldest languages that still looks futuristic

Lisp was created at the end of the 1950s.

Its creator was John McCarthy.

The name comes from:

```text
LISt Processing
```

## Parentheses

Lisp code has a distinctive appearance:

```lisp
(+ 2 3)
```

instead of:

```text
2 + 3
```

The function appears first in the list.

```lisp
(print "Hello")
```

```lisp
(* 5 10)
```

## Code as data

One of Lisp's most influential ideas is the close relationship between code and data.

The program:

```lisp
(+ 1 2)
```

has a structure very similar to a data list:

```lisp
(+ 1 2)
```

That property opened the door to:

- macros,
- programs that transform code,
- metaprogramming.

## Functional roots

Lisp strongly influenced functional programming.

Ideas from the Lisp family later appeared in many other languages.

## Garbage collection

Lisp was also a pioneer of automatic memory management.

Instead of requiring the programmer to manually release every object, the runtime could discover objects that were no longer reachable.

Today garbage collection is ordinary in languages such as:

- Java,
- C#,
- Go,
- JavaScript.

## Lisp is not one modern language

The family includes:

- Common Lisp,
- Scheme,
- Clojure,
- Racket,
- Emacs Lisp.

For experiments we will use:

```text
Common Lisp + SBCL
```

or Steel Bank Common Lisp.

## Installation

### Windows

SBCL publishes Windows binaries:

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

Verify:

```bash
sbcl --version
```

## REPL

```bash
sbcl
```

Then:

```lisp
(+ 2 3)
```

## Guess the number

```lisp
(defun guess-number ()
  (let ((secret (random 101)))
    (format t "Guess a number from 0 to 100.~%")

    (loop
      (format t "Your guess: ")
      (force-output)

      (let ((guess (read)))
        (cond
          ((< guess secret)
           (format t "Too low!~%"))

          ((> guess secret)
           (format t "Too high!~%"))

          (t
           (format t "Correct!~%")
           (return)))))))

(guess-number)
```

File:

```text
guess.lisp
```

Run:

```bash
sbcl --script guess.lisp
```

---

# 7. Smalltalk

## This is where modern “everything is an object” thinking really took off

Smalltalk was developed in the 1970s at Xerox PARC.

People closely associated with the language include:

- Alan Kay,
- Dan Ingalls,
- Adele Goldberg.

Smalltalk was not merely a language.

It was also an environment and a way of thinking about computing.

## Objects

In Smalltalk, programming is communication between objects.

Example:

```smalltalk
3 + 4
```

can be understood as:

> send the object `3` the message `+` with argument `4`.

## Messages

Characteristic syntax:

```smalltalk
Transcript show: 'Hello'.
```

The `Transcript` object receives the message:

```text
show:
```

with a string as its argument.

## Influence

Smalltalk influenced:

- object-oriented programming,
- IDEs,
- refactoring,
- interactive debugging,
- GUIs,
- MVC,
- live programming environments.

Many ideas found in modern IDEs were explored in Smalltalk systems decades earlier.

## How to run Smalltalk today

One active modern descendant is:

```text
Pharo
```

Pharo provides a launcher for:

- Windows,
- macOS Intel,
- macOS Apple Silicon,
- GNU/Linux.

Website:

https://pharo.org/

The easiest way is to install:

```text
Pharo Launcher
```

and create an image of the current stable release.

## First experiments

In a Workspace:

```smalltalk
3 + 4
```

select and execute it.

Text:

```smalltalk
'Hello from Smalltalk'
```

Or display:

```smalltalk
Transcript show: 'Hello from Smalltalk'; cr.
```

## Why an image?

Smalltalk environments often store the entire working state in an:

```text
image
```

This is not just a source-code directory.

An image can contain:

- objects,
- classes,
- code,
- variables,
- the environment state.

That is a very different workflow from:

```text
editor -> file -> compiler -> program
```

---

# 8. Prolog

## Programming without explicitly describing every step

Prolog was created in the early 1970s.

Its origins are strongly associated with Alain Colmerauer and Philippe Roussel, while the theoretical foundations are also connected to Robert Kowalski.

The name comes from:

```text
PROgramming in LOGic
```

## A different way of thinking

In a procedural language you write:

```text
do A
then B
if C, do D
```

In Prolog you often describe:

```text
facts
rules
query
```

## Facts

```prolog
parent(anna, bob).
parent(bob, carol).
```

Meaning:

```text
Anna is Bob's parent.
Bob is Carol's parent.
```

## Rule

```prolog
grandparent(X, Z) :-
    parent(X, Y),
    parent(Y, Z).
```

Meaning:

> X is Z's grandparent if X is Y's parent and Y is Z's parent.

## Query

```prolog
?- grandparent(anna, carol).
```

Prolog tries to prove it.

## Backtracking

When multiple possibilities exist, the interpreter can backtrack and try alternatives.

That is one of the language's defining characteristics.

## Installation: SWI-Prolog

### Windows

SWI-Prolog publishes an official 64-bit installer:

https://www.swi-prolog.org/

### macOS

You can download an official bundle or use:

```bash
brew install swi-prolog
```

### Linux / Debian

```bash
sudo apt update
sudo apt install swi-prolog
```

Verify:

```bash
swipl --version
```

## REPL

```bash
swipl
```

## Guess the number

```prolog
:- use_module(library(random)).

guess_number :-
    random_between(0, 100, Secret),
    writeln('Guess a number from 0 to 100.'),
    ask(Secret).

ask(Secret) :-
    write('Your guess: '),
    read(Guess),
    compare_guess(Guess, Secret).

compare_guess(Guess, Secret) :-
    Guess < Secret,
    writeln('Too low!'),
    ask(Secret).

compare_guess(Guess, Secret) :-
    Guess > Secret,
    writeln('Too high!'),
    ask(Secret).

compare_guess(Secret, Secret) :-
    writeln('Correct!').
```

File:

```text
guess.pl
```

Run:

```bash
swipl -s guess.pl
```

Then:

```prolog
?- guess_number.
```

In the Prolog console, values are entered as terms, so type a period after a number:

```text
42.
```

---

# 9. Forth

## Minimalism taken seriously

Forth was created by Charles H. Moore.

The language developed from the late 1960s into the early 1970s.

It is:

- stack-based,
- interactive,
- very small,
- easy to port,
- close to the hardware.

## The stack

In most languages:

```text
2 + 3
```

In Forth:

```forth
2 3 +
```

Meaning:

```text
push 2
push 3
pop two values
add
push the result
```

Display it:

```forth
2 3 + .
```

Result:

```text
5
```

## Defining a word

Functions are commonly called:

```text
words
```

Example:

```forth
: square dup * ;
```

Now:

```forth
5 square .
```

prints:

```text
25
```

## Why is Forth important?

It demonstrates a radically different language design.

Instead of a huge runtime:

```text
small core
+
stack
+
dictionary of words
+
language extension by the user
```

Forth has been used in:

- embedded systems,
- firmware,
- astronomy,
- hardware control,
- bootloaders,
- low-resource systems.

## Gforth

For learning we will use:

```text
Gforth
```

It is an implementation of the Forth standard.

### Windows

The project provides Windows builds:

https://gforth.org/

### macOS

Simplest route:

```bash
brew install gforth
```

If a Homebrew package is unavailable for a particular macOS release, Gforth can also be built from source.

### Linux / Debian

```bash
sudo apt update
sudo apt install gforth
```

Verify:

```bash
gforth --version
```

## REPL

```bash
gforth
```

Then:

```forth
2 3 + .
```

## Small program

```forth
: square dup * ;

5 square .
cr
```

File:

```text
square.fs
```

Run:

```bash
gforth square.fs
```

---

# 10. PL/I

## An attempt to create a language for everything

PL/I was created at IBM in the 1960s.

The name means:

```text
Programming Language One
```

IBM had a problem.

There were two major computing worlds:

```text
FORTRAN -> science and numerical computing
COBOL   -> business and data processing
```

Large organizations sometimes needed both.

PL/I was designed to combine:

- numerical capabilities,
- business processing,
- systems programming,
- text processing,
- exception handling,
- concurrency,
- file operations.

## A large language

The result was a very large language.

PL/I included features that were extremely ambitious for the 1960s.

It did not, however, become a universal replacement for FORTRAN and COBOL.

## Why does it matter?

PL/I demonstrated that a large general-purpose language could try to cover many very different domains.

It also influenced later language designs.

## Is PL/I still alive?

Yes.

IBM still provides modern implementations for its platforms.

There is also:

```text
Iron Spring PL/I
```

which was still receiving updates in 2026.

## Linux

Iron Spring publishes a compiler for Linux.

After installation, the compiler command is:

```text
plic
```

Example compilation:

```bash
plic hello.pli
```

The exact linking command depends on the runtime installation and the documentation for the particular release.

## Windows

The current open Iron Spring version is mainly a Linux project.

On Windows, the easiest experimental environment is:

```text
WSL
```

and then the Linux toolchain inside WSL.

Historical versions also exist for OS/2.

## macOS

There is no equally convenient native modern path like there is for Fortran or Pascal.

The easiest choices are:

- a Linux virtual machine,
- a container,
- a remote Linux host.

This nicely illustrates the difference between:

> a language still exists

and:

> a language has a convenient modern desktop ecosystem.

## Example

```pli
HELLO: PROCEDURE OPTIONS(MAIN);

    PUT SKIP LIST('Hello from PL/I!');

END HELLO;
```

That is enough to see the characteristic style of the language.

---

# 11. Logo

## An educational language, but not a toy

Logo was created in the 1960s.

People associated with the project include:

- Wally Feurzeig,
- Seymour Papert,
- Cynthia Solomon.

The language was strongly connected to research into education and how children learn algorithmic thinking.

## The turtle

Logo's best-known feature is:

```text
turtle graphics
```

We control a “turtle” moving on the screen.

Example:

```logo
forward 100
right 90
forward 100
```

The turtle draws as it moves.
## A square

```logo
repeat 4 [
    forward 100
    right 90
]
```

This is an excellent example of abstraction.

Instead of saying:

```text
forward
right
forward
right
forward
right
forward
right
```

we say:

```text
repeat four times
```

A child learns loops without a lecture on compiler theory.

## Procedure

```logo
to square :size
    repeat 4 [
        forward :size
        right 90
    ]
end
```

Then:

```logo
square 100
```

This is already ordinary programming:

- parameter,
- procedure,
- loop,
- state.

## How do you run Logo today?

The ecosystem is more fragmented than Python or Prolog.

Different implementations exist for different platforms.

For quick learning, browser-based modern implementations are convenient.

Classic local projects include:

- Berkeley Logo / UCBLogo,
- FMSLogo.

There is no reason to pretend that one dominant modern Windows/macOS/Linux toolchain exists.

The important thing here is the language's idea and its influence on computing education.

---

# 12. Ada

## The military had a language problem

In the 1970s, the U.S. Department of Defense used an enormous number of languages and dialects across different projects.

Every system could have its own:

- language,
- compiler,
- libraries,
- tools.

Maintaining this world became increasingly difficult.

A project was started to design a new language.

The team that produced the winning design was led by Jean Ichbiah.

The language was named:

```text
Ada
```

after Ada Lovelace.

## Philosophy

Ada was designed for:

- large systems,
- real-time systems,
- high-reliability software,
- critical systems.

The language is strongly typed.

We can write:

```ada
subtype Percentage is Integer range 0 .. 100;
```

and restrict valid values at the type level.

## Ada today

Ada is still used in areas including:

- aviation,
- rail,
- defense,
- embedded systems,
- safety-critical systems.

Modern tooling includes:

- GNAT,
- Alire,
- SPARK.

### Linux / Debian

Simplest route:

```bash
sudo apt update
sudo apt install gnat gprbuild
```

### Windows / macOS / Linux

A more modern toolchain manager is:

```text
Alire
```

The command:

```bash
alr
```

plays a role somewhat similar to:

```text
cargo
npm
```

in the Ada ecosystem.

A project can use it to obtain GNAT and dependencies.

## Hello

```ada
with Ada.Text_IO;
use Ada.Text_IO;

procedure Hello is
begin
   Put_Line ("Hello from Ada!");
end Hello;
```

Compile with classic GNAT:

```bash
gnatmake hello.adb
```

Run:

```bash
./hello
```

## Why only a short section here?

Because Ada gets **its own article**.

There we go much deeper into:

- the type system,
- ranges,
- records,
- tasking,
- exceptions,
- contracts,
- SPARK,
- formal verification,
- modern Alire workflows.

---

# 13. Assembly - a language that is not one language

Assembly sits slightly apart from the other languages in this article.

There is no single universal:

```text
Assembly
```

Instruction syntax depends on the CPU architecture.

## Examples

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

These are different instruction sets.

## Why is assembly so important?

Early assembly languages allowed programmers to move away from entering raw numerical instruction codes.

Instead of remembering that a bit pattern means:

```text
load a value into a register
```

you could write a symbolic mnemonic such as:

```asm
LOAD
MOV
LDA
```

depending on the architecture.

Assembly introduced or popularized:

- instruction mnemonics,
- labels,
- symbols,
- easier addressing.

It was one of the first great abstraction layers above machine code.

## Why not go deeper here?

Because assembly deserves its own article.

The third article in this series covers:

- CPU,
- registers,
- memory,
- stack,
- instructions,
- jumps,
- addressing,
- assembly,
- linking,
- MOS 6502,
- x86-64,
- ARM,
- RISC-V.

---

# What did these languages give modern programming?

The most interesting question is not:

> which old language was best?

A much better question is:

> which ideas survived?

## FORTRAN

It demonstrated that a high-level language could generate genuinely fast code.

Legacy:

```text
optimizing compilers
numerical computing
HPC
```

## COBOL

It demonstrated the importance of languages and data structures designed around a particular domain.

Legacy:

```text
business systems
records
reporting
transaction processing
```

## ALGOL

One of the largest donors of DNA to modern programming languages.

Legacy:

```text
blocks
scope
recursion
formal syntax descriptions
structured programming
```

## BASIC

It demonstrated that programming could be accessible to ordinary users.

Legacy:

```text
low entry barrier
interactivity
education
personal-computer programming
```

## Pascal

It taught generations of programmers structured programming.

Legacy:

```text
readable control structures
typing
education
Turbo Pascal-style IDEs
```

## Lisp

Its influence on theoretical and practical computing is enormous.

Legacy:

```text
functional programming
garbage collection
macros
code as data
REPL
```

## Smalltalk

One of the most important projects in the history of interactive programming.

Legacy:

```text
objects
messages
GUI
IDE
refactoring
MVC
live programming
```

## Prolog

It demonstrated a completely different model:

```text
describe knowledge
describe rules
ask a question
```

Legacy:

```text
logic programming
rule systems
symbolic AI
constraint solving
```

## Forth

It demonstrated the power of an extremely small, extensible language.

Legacy:

```text
stack
embedded
interactivity
DSLs
minimalism
```

## PL/I

It was a major experiment in general-purpose language design.

Legacy:

```text
combining many domains
large type systems
exception handling
systems capabilities in a high-level language
```

## Logo

It demonstrated that programming can be a way of thinking rather than only a way of producing software.

Legacy:

```text
education
turtle graphics
learning by experimentation
constructionism
```

## Ada

It demonstrated that a language can actively help prevent entire classes of mistakes.

Legacy:

```text
strong typing
contracts
safety-critical software
concurrency
formal verification
```

## Assembly

It represented the first major step from raw processor codes to symbolic programming.

Legacy:

```text
assembler
linker
symbols
low-level debugging
CPU model
```

---

# Influence tree - highly simplified

Programming-language history is not a clean family tree, but a rough map of ideas can look like this:

```text
machine code
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

COBOL ------------------> business systems

Smalltalk --------------> OOP / GUI / IDE
    |
    +----> influence on Objective-C
    +----> influence on Ruby
    +----> influence on many object models

Prolog -----------------> logic languages / rule systems

Forth ------------------> embedded / stack languages

BASIC ------------------> microcomputers
    |
    +----> QuickBASIC
    +----> Visual Basic

Logo -------------------> educational programming languages
```

This is a map of ideas, not a precise genealogy.

Languages influenced one another through many paths at once.

---

# How the act of programming changed

We can look at history not only through languages, but through levels of abstraction.

## Stage 1 - machine code

```text
10110000 01100001
```

The programmer thinks almost exactly like the processor.

## Stage 2 - assembly

```asm
MOV AL, 61h
```

The instruction has a symbolic name.

## Stage 3 - early high-level language

```fortran
X = A + B
```

The programmer describes an operation mathematically.

## Stage 4 - structure

ALGOL and Pascal:

```text
if
while
procedure
block
scope
```

## Stage 5 - data abstraction

Languages gain richer constructs:

```text
record
struct
type
class
```

## Stage 6 - objects

Smalltalk:

```text
object + message
```

## Stage 7 - declarative programming

Prolog:

```text
what is true?
```

instead of:

```text
how do I calculate the answer step by step?
```

## Stage 8 - modern software stacks

A modern program may combine many layers:

```text
TypeScript
    ↓
JavaScript
    ↓
VM
    ↓
JIT
    ↓
machine code
    ↓
CPU
```

A programmer can work far above the hardware, but all lower layers still exist.

---

# “Old” does not mean “primitive”

This is one of the most important conclusions.

Some old languages had ideas that entered the mainstream much later.

Lisp had garbage collection before most modern languages existed.

Smalltalk offered remarkably interactive development environments decades before today's IDEs.

ALGOL 68 had an ambitious type system.

Ada was designed from the beginning around reliable large systems.

Prolog allowed logical problems to be expressed in a radically different way from procedural languages.

The age of a technology tells you very little about the quality of its ideas.

---

# “Old” does not mean “dead” either

Let us look at the situation in 2026.

## Fortran

GNU Fortran is an actively maintained part of GCC and supports modern language standards.

## COBOL

GnuCOBOL 3.2 is a usable free compiler running on modern systems.

GCC also has its own COBOL frontend:

```text
gcobol
```

## ALGOL 68

Algol 68 Genie is actively maintained.

Version 3.13.3 was released in August 2026.

And GCC 16 includes an experimental frontend:

```text
ga68
```

## Pascal

Free Pascal remains an active project and supports many modern platforms.

## Lisp

SBCL is an actively developed Common Lisp compiler.

## Smalltalk

Pharo is an active modern Smalltalk environment.

## Prolog

SWI-Prolog remains actively developed; the 10.0 line is available in 2026.

## Forth

Gforth is still maintained.

## PL/I

Iron Spring released version 1.4.1 for Linux in 2026.

## Ada

Ada, GNAT, Alire, and SPARK continue to be actively developed and used professionally.

So our “museum” contains a surprising number of exhibits that still run.

---

# How to run historical languages today - cheat sheet

| Language | Implementation to try | Windows | macOS | Debian/Linux |
|---|---|---|---|---|
| Fortran | GNU Fortran | MSYS2 | Homebrew GCC | `apt install gfortran` |
| COBOL | GnuCOBOL | MSYS2 | `brew install gnucobol` | `apt install gnucobol` |
| ALGOL 68 | Algol 68 Genie | official Win64 build | `brew install algol68g` | `apt install algol68g` |
| BASIC | QB64-PE | yes | yes | yes |
| Pascal | Free Pascal | official installer | official package | `apt install fpc` |
| Lisp | SBCL | official binaries | `brew install sbcl` | `apt install sbcl` |
| Smalltalk | Pharo | Pharo Launcher | Pharo Launcher | Pharo Launcher |
| Prolog | SWI-Prolog | official installer | bundle / Homebrew | `apt install swi-prolog` |
| Forth | Gforth | build/binaries | Homebrew/source | `apt install gforth` |
| PL/I | Iron Spring | easiest through WSL | VM/Linux | official Linux build |
| Logo | various implementations | yes | yes | yes |
| Ada | GNAT / Alire | Alire | Alire | `apt install gnat gprbuild` |

---

# Which of these are actually worth running?

If you only want the history, you do not need to install everything.

The most interesting practical selection is:

## FORTRAN

Because you can run a language from 1957 that is still production technology.

## COBOL

Because its syntax is very different from modern fashion, yet perfectly logical for its original domain.

## Lisp

Because it forces a different way of thinking about code and data.

## Prolog

Because it shows that programming does not have to mean writing a sequence of instructions.

## Forth

Because it demonstrates extreme minimalism and a stack machine.

## Smalltalk

Because it reveals how many supposedly “modern” IDE ideas are half a century old.

## ALGOL 68

Because it is historically important, strange, ambitious - and in 2026 it received new life inside GCC.

---

# Four different philosophies for solving one problem

Take the problem:

```text
find the result
```

## FORTRAN

You think:

```text
how should I perform the calculation?
```

## COBOL

You think:

```text
how should I process business records and data?
```

## Lisp

You think:

```text
how should I compose functions and data structures?
```

## Prolog

You think:

```text
which facts and rules make the answer a logical consequence?
```

This demonstrates something important: a programming language is not just syntax.

It is also:

```text
a model for thinking about a problem
```

---

# What came before all of this?

Before high-level languages, programmers used:

- machine code,
- symbolic codes,
- assemblers,
- procedure libraries,
- loading and linking systems.

That is why the third article in this series goes one level lower.

It follows the path:

```text
source code
    ↓
assembler
    ↓
object code
    ↓
linker
    ↓
program
    ↓
CPU instructions
```

And we write real assembly code.

---

# Conclusions

Looking at old languages, it is easy to laugh at:

```text
line numbers
punched cards
COBOL columns
Lisp parentheses
Forth stacks
PL/I verbosity
```

But almost every one of these languages solved a real problem of its era.

FORTRAN meant scientists no longer had to write everything in assembly.

COBOL made large business processes programmable.

ALGOL gave programming languages structure.

BASIC opened programming to students and microcomputer users.

Pascal taught generations of programmers to structure code.

Lisp showed that code can be data.

Smalltalk showed a world of objects and interactive IDEs.

Prolog showed programming as logic.

Forth proved that an entire language can be very small.

Logo showed that children can learn mathematics through programming.

Ada put safety and predictability at the center of language design.

Assembly allowed humans to stop thinking only in raw numerical processor codes.

Modern programming did not replace these ideas.

It was largely **built out of them**.

---

# Related TechHandbook material

If you want to move closer to the hardware or see modern equivalents of these ideas:

- [C - reading, building and debugging projects](techhandbook:doc-019)
- [Go - reading code](techhandbook:doc-020)
- [JavaScript - handbook](techhandbook:doc-021)
- [Node.js](techhandbook:doc-022)
- [Python - basics](techhandbook:doc-023)
- [Debian - shell](techhandbook:doc-027)
- [Shell programming](techhandbook:doc-031)
- [Visual Studio Code](techhandbook:doc-039)

---

# Sources and projects

Status of implementation information: September 2026.

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

# Next in the series

1. **20 modern programming languages worth knowing**
2. **Old programming languages that shaped computing** - this article
3. **Assembly from scratch - from registers and memory to a real program**
4. **Ada - the language where mistakes are meant to be harder to make**
