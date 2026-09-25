---
id: "doc-060"
title: "Assembly from scratch - from registers and memory to a real program"
slug: "assembly-from-scratch-from-registers-and-memory-to-a-real-program"
description: "A practical introduction to assembly language: machine code, ISA, registers, memory, stack, flags, addressing, linking and debugging. The main path uses MOS 6502/6510 and Commodore 64, with comparisons to x86-64, ARM and RISC-V."
lang: "en"
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

# Assembly from scratch - from registers and memory to a real program

Assembly language looks like something from another planet at first:

```asm
LDA #$01
STA $0400
INX
BNE loop
```

There are no classes.

No objects.

No `npm install`.

No garbage collector.

There is not even one universal version of the language.

And yet assembly is one of the best ways to truly understand:

- how a processor works,
- what registers are,
- what the stack is,
- how memory is organized,
- where addresses come from,
- what a function really is,
- what a compiler does,
- what a linker does,
- how source code differs from machine code,
- why C looks the way it does,
- where function-call overhead comes from,
- what an ABI is,
- what “32-bit”, “64-bit”, or “8-bit” actually means.

This material is not meant to turn you into a professional assembly programmer.

Its goal is that when you see:

```asm
mov rax, rbx
```

or:

```asm
lda #$20
```

you understand **what the computer is actually doing**.

Our main practical path will be:

```text
MOS 6502 / MOS 6510 / Commodore 64
```

because it is simple enough to reveal the processor without immediately burying us under the enormous complexity of modern x86-64.

At the end we will compare it with:

- x86-64,
- ARM,
- RISC-V.

Related TechHandbook material:

- [C - reading, building and debugging projects](techhandbook:doc-019)
- [Debian - shell](techhandbook:doc-027)
- [Visual Studio Code](techhandbook:doc-039)
- [GitHub](techhandbook:doc-014)
- [20 modern programming languages worth knowing](techhandbook:doc-058)
- [Old programming languages that shaped computing](techhandbook:doc-059)

---

# First, one important distinction: assembler or assembly?

In everyday speech, people often say:

> I program in assembler.

Everyone understands what they mean.

Technically, however, it is useful to distinguish two things.

## Assembly language

This is the **symbolic language** used to write processor instructions.

Example:

```asm
LDA #$01
```

## Assembler

This is the program that translates textual assembly source into machine code.

Examples:

```text
ca65
NASM
GNU as
MASM
64tass
DASM
```

So the basic path is:

```text
assembly source
      |
      v
 assembler
      |
      v
machine code
```

In this article we may occasionally use “assembler” in the common informal sense, but it is worth knowing the technical distinction.

---

# There is no single assembly language

This is the most important difference compared with Python, Java, or Go.

Code such as:

```asm
LDA #$10
```

makes sense for the 6502 family.

Code such as:

```asm
mov rax, 10
```

is characteristic of x86-64.

Code such as:

```asm
mov x0, #10
```

can appear in AArch64.

Code such as:

```asm
li a0, 10
```

is typical RISC-V.

Every architecture has its own:

```text
Instruction Set Architecture
```

or:

```text
ISA
```

An ISA defines, among other things:

- which instructions the processor understands,
- which registers it has,
- how it addresses memory,
- how instructions are encoded,
- which kinds of operations it can perform.

---

# ISA - the contract between software and the processor

Imagine a processor as a machine that understands a fixed set of commands.

A hypothetical CPU might understand:

```text
LOAD
STORE
ADD
SUB
JUMP
COMPARE
```

A program such as:

```asm
LOAD A, 10
LOAD B, 20
ADD A, B
```

is only a convenient symbolic notation for humans.

The processor does not read the word:

```text
ADD
```

The processor sees numbers.

Hypothetically:

```text
00010010 00000001 00000010
```

The assembler therefore performs a translation from symbolic instructions to the correct bit patterns.

---

# Machine code

Machine code is executed directly by the CPU.

If the 6502 instruction:

```asm
LDA #$01
```

is encoded as:

```text
A9 01
```

then:

```text
A9
```

is the operation code for:

```text
LDA immediate
```

and:

```text
01
```

is the operand.

In memory we therefore have two bytes:

```text
A9 01
```

The processor:

1. fetches `A9`,
2. decodes the instruction,
3. fetches the next byte,
4. executes the operation.

---

# Hexadecimal numbers

Assembly code very often uses hexadecimal notation.

Instead of:

```text
0
1
2
...
9
10
11
```

we have:

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

One hex digit represents exactly:

```text
4 bits
```

Two hex digits represent:

```text
8 bits = 1 byte
```

Examples:

```text
$00 = 0
$01 = 1
$0A = 10
$10 = 16
$FF = 255
```

6502 documentation often uses:

```text
$FF
```

C commonly uses:

```c
0xFF
```

NASM can use:

```asm
0xFF
```

These are the same value.

---

# Bits and bytes

A bit can contain:

```text
0
```

or:

```text
1
```

Eight bits make one byte:

```text
10110100
```

The unsigned range of a byte is:

```text
0..255
```

or:

```text
$00..$FF
```

The 6502 is called an 8-bit processor partly because its main accumulator and primary data operations are 8 bits wide.

That does not mean it can address only 256 bytes.

It has a 16-bit address space:

```text
$0000..$FFFF
```

which is:

```text
65536 bytes = 64 KiB
```

---

# What does a CPU actually do?

In a very simplified model:

```text
fetch instruction
      |
      v
decode instruction
      |
      v
execute instruction
      |
      v
fetch next instruction
```

This is the:

```text
fetch -> decode -> execute
```

cycle.

Inside the processor we find, among other things:

- registers,
- an arithmetic and logic unit,
- an instruction decoder,
- control logic.

---

# Registers - the processor's fastest storage

A register is a small storage location directly inside the CPU.

Do not confuse it with RAM.

RAM is a separate memory area.

Registers:

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

Accessing a register is fundamentally different from reading ordinary memory.

---

# MOS 6502 and MOS 6510

The MOS 6502 was one of the most important processors of the 8-bit era.

Members of the family appeared in systems including:

- Apple II,
- Atari 2600 - through the 6507 variant,
- Atari 8-bit computers,
- BBC Micro,
- NES - through a related CPU,
- many embedded systems.

The Commodore 64 uses:

```text
MOS 6510
```

The 6510 is a close relative of the 6502.

Its most important addition is a built-in I/O port used by the C64, among other things, for memory mapping.

For learning the instruction set we can think of it roughly as:

```text
6502 + a few C64-specific features
```

---

# 6502 registers

The 6502 has surprisingly few registers.

That is one reason it is so good for learning.

## A - accumulator

```text
A
```

The main data register.

Many operations work through it.

Example:

```asm
LDA #10
```

means:

```text
Load Accumulator
```

or effectively:

```text
A = 10
```

## X

The index register:

```text
X
```

Useful for:

- indexing arrays,
- counters,
- loops.

Example:

```asm
LDX #0
```

## Y

The second index register:

```text
Y
```

It is used similarly to X, though the exact supported instructions differ.

## PC - Program Counter

```text
PC
```

is the program counter.

It stores the address of the next instruction.

If:

```text
PC = $C000
```

the processor fetches the instruction from:

```text
$C000
```

After executing it, execution proceeds.

A jump changes PC.

Example:

```asm
JMP $C100
```

is essentially:

```text
PC = $C100
```

## SP - Stack Pointer

```text
SP
```

points to the current stack position.

On the 6502, the stack always lives in:

```text
$0100..$01FF
```

SP itself is 8-bit.

If:

```text
SP = $FD
```

the active stack location is around:

```text
$01FD
```

## P - Processor Status

The processor status register contains flags.

The most important:

```text
N - Negative
V - Overflow
B - Break
D - Decimal
I - Interrupt Disable
Z - Zero
C - Carry
```

You may see the compact form:

```text
NV-BDIZC
```

Each flag is one bit.

---

# Zero flag

If the result of an operation is zero:

```text
Z = 1
```

For example:

```asm
LDA #0
```

sets the Zero flag.

We can then use:

```asm
BEQ somewhere
```

or:

```text
Branch if Equal
```

The instruction really checks Z.

---

# Carry flag

Carry is used, among other things, for:

- addition,
- subtraction,
- bit shifts,
- arithmetic larger than one byte.

Example:

```asm
CLC
LDA #200
ADC #100
```

Mathematically:

```text
200 + 100 = 300
```

But an 8-bit register can store at most:

```text
255
```

The value in A wraps, while the extra carry information is stored in the Carry flag.

---

# Memory

For the CPU, memory is essentially a large array of bytes.

Imagine:

```text
address    value

$0000      $12
$0001      $A0
$0002      $FF
$0003      $00
...
```

Instruction:

```asm
LDA $2000
```

means:

```text
read one byte from address $2000
and place it in A
```

Instruction:

```asm
STA $2000
```

means:

```text
store A at address $2000
```

---

# Immediate value versus address

This is one of the first things that confuses beginners.

## Immediate

```asm
LDA #$10
```

means:

```text
A = $10
```

The:

```text
#
```

marks an immediate value.

## Absolute memory access

```asm
LDA $0010
```

means:

```text
A = memory[$0010]
```

That is a completely different operation.

```text
#$10
```

is a value.

```text
$0010
```

is an address.

---

# Addressing modes

The 6502 supports several addressing modes.

You do not need to memorize all of them at once.

The most important ones are:

## Immediate

```asm
LDA #$20
```

The value is part of the instruction.

## Zero page

```asm
LDA $20
```

An address from:

```text
$0000..$00FF
```

The 6502 has shorter and often faster encodings for this memory region.

## Absolute

```asm
LDA $2000
```

A full 16-bit address.

## Indexed X

```asm
LDA table,X
```

Address:

```text
table + X
```

Very useful for arrays.

## Indexed Y

```asm
LDA table,Y
```

## Indirect

The effective address is loaded from memory.

This is similar in concept to a pointer.

---

# Zero page

Addresses:

```text
$0000..$00FF
```

form the:

```text
zero page
```

For the 6502 this region is especially important.

You can think of it a little like a bank of fast pseudo-registers.

Example:

```asm
LDA $10
```

can have a shorter encoding than:

```asm
LDA $2010
```

In old 6502 programs, zero-page space was a precious resource.

---

# The stack

A stack follows:

```text
Last In, First Out
```

or:

```text
LIFO
```

Imagine a stack of plates.

You push:

```text
A
B
C
```

You pop:

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

means:

```text
Push Accumulator
```

## Pull

```asm
PLA
```

means:

```text
Pull Accumulator
```
Example:

```asm
LDA #10
PHA

LDA #20

PLA
```

After `PLA`, A contains:

```text
10
```

again.

---

# Why do we need a stack?

Among other things:

- temporary values,
- subroutine calls,
- interrupt handling.

Instruction:

```asm
JSR subroutine
```

must remember:

```text
where to return
```

The return address goes onto the stack.

Then:

```asm
RTS
```

retrieves it.

---

# A function in assembly is not magic

In C:

```c
foo();
```

looks like one operation.

Underneath, something must:

1. prepare arguments,
2. save a return address,
3. transfer control,
4. execute the function,
5. return,
6. recover the result.

On 6502, the basic mechanism is:

```asm
JSR foo
```

and the function ends with:

```asm
RTS
```

Example:

```asm
        JSR clear_screen
        JSR draw_player
        JSR update_score
```

This is a very direct representation of function calls.

---

# Labels

Instead of writing:

```asm
JMP $C042
```

we can name the destination:

```asm
JMP game_loop
```

and later:

```asm
game_loop:
    ...
```

The assembler calculates the actual address during the build.

This is one of the most important improvements assembly brought over manually written machine code.

---

# A loop

6502 example:

```asm
        LDX #0

loop:
        INX
        CPX #10
        BNE loop
```

Meaning:

```text
X = 0

loop:
    X = X + 1

    compare X with 10

    if not equal:
        go back to loop
```

In C:

```c
for (int x = 0; x < 10; x++) {
}
```

Same logic, lower-level representation.

---

# Comparisons on 6502

Instruction:

```asm
CMP
```

compares the accumulator with a value.

Example:

```asm
LDA score
CMP #10
BEQ player_won
```

The CPU does not create a magical Boolean value called:

```text
true
```

It sets flags.

Instructions such as:

```asm
BEQ
BNE
BCC
BCS
BMI
BPL
```

inspect those flags.

This reveals where higher-level constructs such as:

```text
if
while
for
```

come from.

The processor does not know those concepts.

A compiler constructs them from comparisons and jumps.

---

# Addition

On 6502:

```asm
CLC
LDA #10
ADC #20
```

After execution:

```text
A = 30
```

`CLC` means:

```text
Clear Carry
```

Why is it needed?

Because `ADC` performs:

```text
A + value + Carry
```

If Carry was still set from an earlier operation, the result would be one larger.

---

# Subtraction

```asm
SEC
LDA #30
SBC #10
```

`SEC` means:

```text
Set Carry
```

Carry semantics during subtraction are initially a little unintuitive.

That is why the usual pattern begins with:

```asm
SEC
```

---

# Numbers larger than 255

The 6502 is 8-bit, but of course it can calculate larger values.

We simply split a number into bytes.

A 16-bit value:

```text
$1234
```

contains:

```text
high byte = $12
low byte  = $34
```

Adding two 16-bit values means adding both bytes and propagating Carry.

Conceptual example:

```asm
CLC

LDA a_low
ADC b_low
STA result_low

LDA a_high
ADC b_high
STA result_high
```

Carry from the first addition enters the second.

In C you write:

```c
uint16_t c = a + b;
```

The compiler does similar work for you.

---

# Little endian

6502 stores multi-byte values in:

```text
low byte
high byte
```

order.

That is:

```text
little endian
```

Value:

```text
$1234
```

may appear in memory as:

```text
address $2000 -> $34
address $2001 -> $12
```

x86 is also little endian.

That is why memory dumps need to be interpreted carefully.

---

# Commodore 64 - memory map

The C64 is an excellent machine for learning assembly because the hardware is relatively simple and exceptionally well documented.

The CPU sees an address space:

```text
$0000..$FFFF
```

or 64 KiB.

Important regions:

| Address | Meaning |
|---|---|
| `$0000-$00FF` | zero page |
| `$0100-$01FF` | CPU stack |
| `$0400-$07E7` | default text screen memory |
| `$0801...` | typical BASIC program start |
| `$A000-$BFFF` | BASIC ROM, depending on mapping |
| `$D000-$DFFF` | I/O / character ROM, depending on mapping |
| `$D800-$DBE7` | color memory |
| `$E000-$FFFF` | KERNAL ROM, depending on mapping |

This is a simplified map.

The C64 can switch the visibility of RAM, ROM, and I/O regions.

---

# C64 text screen

The default screen memory begins at:

```text
$0400
```

Each byte corresponds to one screen cell.

40 columns:

```text
40
```

25 rows:

```text
25
```

Total:

```text
1000 characters
```

If you store the appropriate screen code at:

```text
$0400
```

you change the top-left character.

Example:

```asm
LDA #1
STA $0400
```

With the standard character set, screen code `1` corresponds to `A`.

This is one of the beautiful things about old hardware:

```text
write to memory
=
change what appears on screen
```

No:

```text
DOM
Canvas
OpenGL
DirectX
browser API
```

---

# Color memory

Character color is stored separately:

```text
$D800...
```

Example:

```asm
LDA #2
STA $D800
```

changes the color of the first cell.

The color number refers to the standard C64 palette.

We can therefore do:

```asm
LDA #1
STA $0400

LDA #2
STA $D800
```

and set:

```text
character
+
color
```

---

# Hardware registers

In old computers, hardware is often controlled through memory addresses.

This is:

```text
memory-mapped I/O
```

For example, VIC-II registers live in:

```text
$D000...
```

Changing a byte can:

- move a sprite,
- change the background color,
- change a graphics mode,
- affect raster behavior.

For the CPU:

```asm
STA $D020
```

is simply a memory write.

But the hardware interprets `$D020` as:

```text
border color register
```

---

# Changing the C64 border color

One of the simplest experiments:

```asm
        LDA #2
        STA $D020
```

Address:

```text
$D020
```

is the border color register.

Value:

```text
2
```

is red in the standard C64 palette.

Two instructions and the physical appearance of the screen changes.

---

# KERNAL - ready-made ROM routines

You do not need to do everything manually.

The C64 contains ROM with system routines.

One of the best-known is:

```text
CHROUT
```

at address:

```text
$FFD2
```

If we place a character in A:

```asm
LDA #'A'
```

and execute:

```asm
JSR $FFD2
```

the KERNAL prints the character.

This is a primitive form of a system API.

---

# Our 6502/C64 toolchain

We will use:

```text
cc65
```

Not because we want to write C.

The cc65 package contains a complete toolkit:

```text
cc65   - C compiler
ca65   - 6502 assembler
ld65   - linker
cl65   - build driver
da65   - disassembler
sim65  - simulator
```

For this article, the most important are:

```text
ca65
ld65
cl65
```

---

# Installing cc65 - Windows

The cc65 project publishes Windows builds.

Project site:

https://cc65.github.io/

Repository:

https://github.com/cc65/cc65

After installing or extracting the tools, add the `bin` directory to:

```text
PATH
```

Verify:

```powershell
ca65 --version
cl65 --version
```

---

# Installing cc65 - macOS

Homebrew:

```bash
brew install cc65
```

Verify:

```bash
ca65 --version
cl65 --version
```

---

# Installing cc65 - Linux / Debian

```bash
sudo apt update
sudo apt install cc65
```

Verify:

```bash
ca65 --version
cl65 --version
```

The package contains cross-development tools for 6502 targets including the C64.

---

# C64 emulator - VICE

You do not need a physical C64.

We will use:

```text
VICE
```

VICE emulates, among other systems:

- C64,
- C128,
- VIC-20,
- PET,
- Plus/4.

---

# VICE - Windows

Current builds are available from:

https://vice-emu.sourceforge.io/

For C64 work we are mainly interested in:

```text
x64sc
```

---

# VICE - macOS

Homebrew:

```bash
brew install vice
```

Verify:

```bash
x64sc --version
```

---

# VICE - Debian

VICE is distributed in Debian's:

```text
contrib
```

section.

After enabling `contrib`:

```bash
sudo apt update
sudo apt install vice
```

Verify:

```bash
x64sc --version
```

Depending on installation method, VICE may require legally obtained ROM images.

---

# VS Code

Assembly works perfectly well in an ordinary text editor.

You can use:

- VS Code,
- Vim,
- Neovim,
- Micro,
- any editor you like.

More detail:

[Visual Studio Code](techhandbook:doc-039)

Useful features:

- syntax highlighting,
- integrated terminal,
- build commands,
- convenient switching between source and debugger.

You do not need a heavy IDE.

---

# First real C64 program

Create:

```text
hello.s
```

Code:

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

# What does this code do?

## Segment

```asm
.segment "CODE"
```

tells the assembler and linker that the following bytes belong to the code segment.

## X = 0

```asm
LDX #0
```

X will be the string index.

## Read one character

```asm
LDA message,X
```

Equivalent idea:

```text
A = message[X]
```

## End of string

The text ends with byte:

```text
0
```

After `LDA`, the processor sets Z if the loaded byte is zero.

So:

```asm
BEQ done
```

exits the loop.

## Output

```asm
JSR $FFD2
```

calls KERNAL `CHROUT`.

## Next character

```asm
INX
```

or:

```text
X++
```

## Loop

```asm
BNE loop
```

Because X is 8-bit, it wraps to zero after 255.

For a short string this does not matter.

---

# Building a C64 program

cc65 provides a special linker configuration:

```text
c64-asm.cfg
```

We can use:

```bash
cl65 \
  -o hello.prg \
  -u __EXEHDR__ \
  -t c64 \
  -C c64-asm.cfg \
  hello.s
```

Option:

```text
-u __EXEHDR__
```

adds a small BASIC header.

That allows the loaded program to be started with:

```basic
RUN
```

instead of manually typing a `SYS` address.

---

# Running in VICE

```bash
x64sc -autostart hello.prg
```

VICE:

1. starts a C64,
2. loads the PRG,
3. starts the program.

Now we have a complete chain:

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

# ca65 and ld65 separately

`cl65` performs multiple steps automatically.

It is useful to know what happens underneath.

## Assembler

```bash
ca65 -t c64 hello.s -o hello.o
```

Result:

```text
hello.o
```

This is not yet a ready C64 program.

## Linker

The linker:
```text
ld65
```

combines:

- segments,
- symbols,
- libraries,
- final addresses.

For practical C64 work, linker configuration matters a great deal.

That is why `cl65` is convenient at the beginning.

---

# What does the linker do?

Imagine two files.

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

The assembler processes them independently.

Inside `main.o`, the final address of:

```text
print_message
```

does not need to be known yet.

The linker:

1. combines the modules,
2. assigns addresses,
3. resolves symbols,
4. fixes references.

This is the same fundamental mechanism you later encounter in C and C++.

---

# Symbols

An assembler allows symbolic constants:

```asm
SCREEN = $0400
BORDER = $D020
CHROUT = $FFD2
```

Then:

```asm
STA BORDER
```

is easier to understand than:

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

is almost self-documenting.

---

# Constants versus data

Assembler constant:

```asm
BORDER = $D020
```

does not allocate a variable in program memory.

It is simply a symbolic substitution performed by the assembler.

A variable:

```asm
counter:
    .byte 0
```

actually reserves one byte in the program's data.

---

# Array

```asm
numbers:
    .byte 1, 2, 3, 4, 5
```

We can read:

```asm
LDX #0
LDA numbers,X
```

Then:

```asm
INX
```

to reach the next element.

---

# Copying an array

```asm
        ldx #0

loop:
        lda source,x
        sta destination,x

        inx
        cpx #10
        bne loop
```

Equivalent C:

```c
for (int x = 0; x < 10; x++) {
    destination[x] = source[x];
}
```

This is a good point to see how close C is to assembly concepts.

---

# Pointers

In C:

```c
char *ptr;
```

In assembly there is no special magical type called:

```text
pointer
```

An address is simply a number.

On 6502, a 16-bit pointer can be stored in two zero-page bytes:

```asm
ptr:
    .word $0000
```

and used with indirect addressing.

Example:

```asm
LDA (ptr),Y
```

Conceptually:

```text
A = memory[ptr + Y]
```

Very close to:

```c
ptr[y]
```

---

# Why are C and assembly so closely related?

C was created for systems programming.

That is why constructs such as:

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

map naturally onto low-level operations.

Once assembly becomes readable, many parts of C stop looking strange.

See:

[C - reading, building and debugging projects](techhandbook:doc-019)

---

# Mini-project: fill the screen

Default screen memory:

```text
$0400
```

We want to fill the first 256 cells with the letter A.

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

Why does the loop run exactly 256 times?

X is 8-bit.

Values:

```text
0
1
2
...
254
255
0
```

When:

```text
255 -> 0
```

the Zero flag is set.

```asm
BNE loop
```

does not branch.

This is a beautiful example of using processor behavior instead of maintaining another counter.

---

# Clearing the whole screen

The screen contains:

```text
1000
```

cells.

That does not fit in a single 8-bit loop.

We can clear it in chunks:

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

Why:

```text
232
```

Because:

```text
1000 - 768 = 232
```

The first loop clears:

```text
3 * 256 = 768
```

cells.

The second clears:

```text
232
```

Total:

```text
1000
```

---

# Macros

Assemblers can provide macro systems.

ca65 lets us write:

```asm
.macro set_border color
    lda #color
    sta $d020
.endmacro
```

Then:

```asm
set_border 2
```

The assembler expands the macro during the build.

This is not a CPU function.

It is a source transformation performed before machine code is produced.

---

# Assembler directives

Line:

```asm
.byte 1, 2, 3
```

is not a CPU instruction.

It tells the assembler:

> place these bytes in the output.

Likewise:

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

These are:

```text
assembler directives
```

The CPU never sees them.

---

# CPU instruction versus directive

Instruction:

```asm
LDA #1
```

becomes machine code executed by the processor.

Directive:

```asm
.byte 1
```

tells the assembler to insert a byte.

This distinction is fundamental.

---

# Pseudo-instructions

Some assemblers provide syntax that looks like a processor instruction but is actually translated into one or more real instructions.

This is called a:

```text
pseudo-instruction
```

It is especially common in RISC-V.

For example:

```asm
li a0, 100
```

may be expanded into an appropriate instruction sequence depending on the value.

---

# Interrupts

Normally the CPU executes:

```text
instruction
instruction
instruction
instruction
```

But sometimes hardware says:

> I need attention now.

That is an:

```text
interrupt
```

The processor:

1. finishes the current instruction,
2. saves necessary state,
3. jumps to an interrupt handler,
4. handles the event,
5. returns.

Interrupts can be used for:

- timers,
- keyboards,
- network cards,
- graphics hardware,
- disk controllers.

---

# Raster interrupt on the C64

VIC-II draws the screen line by line.

The programmer can configure an interrupt at a particular raster line.

That allows effects such as:

- changing colors while the screen is being drawn,
- multiplexing sprites,
- synchronizing animation,
- demoscene raster effects.

This is an advanced topic.

The important idea is:

```text
hardware
    |
    v
interrupt
    |
    v
our code
```

---

# Clock cycles

Old processors are excellent for learning performance because instruction cost is tangible.

An instruction may cost:

```text
2 cycles
3 cycles
4 cycles
```

In raster-synchronized code, a single cycle may matter.

Modern x86 is much more complex:

- pipelines,
- cache,
- out-of-order execution,
- branch prediction,
- superscalar execution.

On the 6502 the relationship between instruction and time is far easier to observe.

---

# Self-modifying code

Because a program is stored in memory, it can theoretically modify its own instructions.

For example:

```text
change the operand of an LDA instruction
```

Such techniques were used in old systems for performance.

Today self-modifying code is far less common in ordinary applications because of:

- security,
- memory protection,
- instruction caches,
- maintainability.

But it is worth remembering that code is also just data in memory.

---

# Code and data

For the processor, byte:

```text
$A9
```

is not inherently an instruction.

It becomes an instruction if the Program Counter points to it as the beginning of one.

The same byte may represent:

```text
number
character
color
instruction fragment
part of an address
pixel
```

Meaning comes from context.

---

# Disassembler

An assembler performs:

```text
assembly -> machine code
```

A disassembler tries the reverse:

```text
machine code -> assembly
```

In cc65 we have:

```text
da65
```

In NASM:

```text
ndisasm
```

In GNU binutils:

```text
objdump
```

Example:

```bash
objdump -d program
```

This is one of the fundamental tools of reverse engineering.

---

# Debugger

A debugger lets you:

- stop the CPU,
- execute one instruction,
- inspect registers,
- inspect memory,
- set breakpoints.

For assembly work, a debugger is especially valuable.

At a high level you look at:

```text
variable x
```

At a low level:

```text
RAX
RSP
memory[0x7fff...]
flags
```

---

# VICE monitor

VICE has a built-in monitor.

This is the debugger of the C64 world.

It allows you to:

- inspect memory,
- disassemble,
- set breakpoints,
- inspect registers,
- modify memory.

It is ideal for learning.

Inside the emulator you may see something like:

```text
A:00 X:00 Y:00 SP:F6
```

Suddenly abstract register names become real state.

---

# Debug symbols in cc65

cc65 can generate debugging information.

For a larger project, you may build with:

```bash
-g
```

With symbols, a debugger can show names instead of only raw addresses.

---

# The second world: x86-64

6502 is simple.

The processor in a modern PC is a completely different beast.

The dominant PC architecture is:

```text
x86-64
```

also known as:

```text
AMD64
```

Intel also uses the name:

```text
Intel 64
```

---

# x86-64 has much larger registers

Examples:

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

A typical general-purpose register is:

```text
64 bits
```

or:

```text
8 bytes
```

A huge difference from the 8-bit A register of the 6502.

---

# RAX and its subregisters

Historical compatibility in x86 gives one register several names.

```text
RAX - 64 bits
EAX - lower 32 bits
AX  - lower 16 bits
AL  - lower 8 bits
AH  - historical upper 8 bits of AX
```

Conceptually:

```text
RAX
┌────────────────────────────────────────────────────────────────┐
│                            64 bits                              │
└────────────────────────────────────────────────────────────────┘
                                └──────── EAX ───────────────────┘
                                                  └── AX ───────┘
                                                       AL / AH
```

This is one example of x86's historical baggage.

---

# Installing NASM - Windows

NASM:

```text
Netwide Assembler
```

is a popular x86/x86-64 assembler.

Official site:

https://www.nasm.us/

Download an installer or archive for Windows.

After adding it to PATH:

```powershell
nasm -v
```

---

# NASM - macOS

```bash
brew install nasm
```

Verify:

```bash
nasm -v
```

---

# NASM - Debian

```bash
sudo apt update
sudo apt install nasm
```

Verify:

```bash
nasm -v
```

---

# x86-64: Hello World on Linux

Linux lets a process communicate with the kernel using:

```text
system calls
```

NASM example:

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

# What do those numbers mean?

On Linux x86-64:

```text
rax = 1
```

selects the:

```text
write
```

system call.

Arguments:

```text
rdi = file descriptor
rsi = data address
rdx = length
```

So:

```asm
mov rdi, 1
```

means:

```text
stdout
```

Then:

```asm
syscall
```

asks the kernel to perform the operation.

---

# Building x86-64 on Linux

Assembler:

```bash
nasm -f elf64 hello.asm -o hello.o
```

Linker:

```bash
ld hello.o -o hello
```

Run:

```bash
./hello
```

We again have the same model:
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

# Why does the same code not run on Windows?

Because assembly depends not only on the CPU.

It also depends on:

```text
operating system
ABI
executable format
system API
```

Linux x86-64 uses, among other things:

```text
ELF
Linux syscall ABI
```

Windows uses:

```text
PE/COFF
Windows x64 ABI
WinAPI
```

The processor may be the same.

The program environment is different.

---

# ABI

ABI means:

```text
Application Binary Interface
```

It defines things such as:

- where arguments are passed,
- where return values are placed,
- which registers a function must preserve,
- how the stack is organized,
- how a process communicates with the system.

On Linux x86-64, typical function arguments are passed in:

```text
RDI
RSI
RDX
RCX
R8
R9
```

On Windows x64, the first arguments go into:

```text
RCX
RDX
R8
R9
```

Same processor.

Different ABI.

---

# Calling convention

Imagine a C function:

```c
int add(int a, int b);
```

The compiler must know:

```text
where does a go?
where does b go?
where is the result returned?
who restores the stack?
which registers may be overwritten?
```

The answer is provided by the:

```text
calling convention
```

Without one, binary modules produced by different tools could not interoperate reliably.

---

# Stack pointer in x86-64

Register:

```text
RSP
```

points to the top of the stack.

Instructions:

```asm
push rax
pop rax
```

are conceptually similar to:

```asm
PHA
PLA
```

on 6502.

Difference:

```text
6502 -> stack in fixed area $0100-$01FF
x86-64 -> stack in ordinary process memory
```

---

# CALL and RET

x86:

```asm
call function
```

stores the return address on the stack and transfers control.

Return:

```asm
ret
```

The same fundamental idea as:

```asm
JSR
RTS
```

on 6502.

---

# 6502 versus x86-64

| Feature | 6502/6510 | x86-64 |
|---|---|---|
| era | 1970s/80s | modern |
| main data width | 8 bit | 64 bit |
| classic address space | 16 bit | large 64-bit model |
| general registers | very few | many |
| ISA | relatively small | very large |
| stack | fixed `$0100` page | ordinary memory |
| learning | excellent | harder |
| modern desktop | no | yes |

---

# The third world: ARM

ARM is everywhere:

- phones,
- tablets,
- Raspberry Pi,
- routers,
- microcontrollers,
- servers,
- Apple Silicon Macs.

Modern 64-bit ARM is commonly called:

```text
AArch64
```

---

# AArch64 registers

Main registers:

```text
X0..X30
```

Each:

```text
64 bits
```

Their lower 32-bit parts are:

```text
W0..W30
```

Example:

```asm
mov x0, #10
mov x1, #20
add x2, x0, x1
```

Meaning:

```text
X0 = 10
X1 = 20
X2 = X0 + X1
```

This is much more regular than historical x86.

---

# ARM and load/store

RISC architectures often clearly separate:

```text
register operations
```

from:

```text
memory access
```

Typical pattern:

```asm
ldr x0, [x1]
add x0, x0, #1
str x0, [x1]
```

Meaning:

```text
load from memory
calculate in a register
store back to memory
```

---

# ARM cross-toolchain - Debian

For Cortex-M/R microcontrollers:

```bash
sudo apt update
sudo apt install gcc-arm-none-eabi
```

The package also contains the GNU assembler:

```text
arm-none-eabi-as
```

Verify:

```bash
arm-none-eabi-as --version
```

---

# ARM - Windows and macOS

Arm publishes the official:

```text
Arm GNU Toolchain
```

for:

- Windows,
- Linux,
- macOS.

Website:

https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads

Depending on target, you may use tools such as:

```text
arm-none-eabi-gcc
arm-none-eabi-as
aarch64-none-elf-gcc
```

---

# The fourth world: RISC-V

RISC-V is an open ISA.

That is an important distinction.

x86 and ARM are controlled by specific companies and licensing ecosystems.

The RISC-V specification is open.

The architecture is modular.

A base instruction set can be extended with:

- multiplication,
- atomics,
- floating point,
- vectors,
- compressed instructions.

---

# RISC-V is very regular

Example:

```asm
li a0, 10
li a1, 20
add a2, a0, a1
```

Argument registers:

```text
a0
a1
...
```

Temporary registers:

```text
t0
t1
...
```

Saved registers:

```text
s0
s1
...
```

This regularity often makes RISC-V easier to read than x86.

---

# RISC-V on Debian

Linux cross-toolchain:

```bash
sudo apt install gcc-riscv64-linux-gnu
```

Bare metal:

```bash
sudo apt install gcc-riscv64-unknown-elf
```

Tools include:

```text
riscv64-linux-gnu-as
riscv64-unknown-elf-as
```

---

# RISC versus CISC

This topic is more subtle than:

```text
RISC = simple
CISC = complicated
```

but as an introduction:

## CISC

Classic example:

```text
x86
```

A large instruction set with many historical addressing modes.

## RISC

Examples:

```text
ARM
RISC-V
```

More regular instruction sets and a strong register-oriented load/store philosophy.

Modern CPUs are internally much more complicated than these labels suggest.

---

# The same operation on four ISAs

We want:

```text
10 + 20
```

## 6502

```asm
CLC
LDA #10
ADC #20
```

Result:

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

Same idea.

Four different processor languages.

---

# Why assembly is not portable

C code:

```c
int x = a + b;
```

can be compiled for:

```text
x86-64
ARM
RISC-V
PowerPC
```

The compiler selects the correct instructions.

Assembly:

```asm
mov rax, rbx
```

is tied to x86-64.

That is why assembly is:

```text
architecture-dependent
```

---

# What does a C compiler do?

Take:

```c
int add(int a, int b) {
    return a + b;
}
```

A compiler may produce something like:

```asm
mov eax, edi
add eax, esi
ret
```

That lets you use C without manually writing processor instructions.

A compiler is, among other things, an automatic machine-code generator.

---

# See the assembly generated by GCC

Create:

```text
add.c
```

```c
int add(int a, int b) {
    return a + b;
}
```

Generate assembly:

```bash
gcc -S -O2 add.c
```

Result:

```text
add.s
```

This is one of the best assembly-learning exercises.

Change the C code:

```c
if
for
while
function
struct
```

and observe what the compiler generates.

---

# Intel syntax versus AT&T syntax

On x86 you will encounter two major syntaxes.

## Intel

```asm
mov rax, rbx
```

Read:

```text
destination <- source
```

## AT&T

```asm
movq %rbx, %rax
```

Operand order is reversed:

```text
source -> destination
```

You also see:

```text
%
$
suffixes
```

So the same x86 code can look very different in two tutorials.

NASM uses Intel-like syntax.

GNU `as` traditionally uses AT&T syntax, though GNU tools can also work with Intel syntax.

---

# Object file

After assembly, you often do not have a complete program yet.

You have an:

```text
object file
```

On Linux:

```text
.o
```

It contains, among other things:

- machine code,
- data,
- symbols,
- relocation information,
- possibly debug information.

---

# Relocation

Suppose the assembler sees:

```asm
call foo
```

but does not yet know where:

```text
foo
```

will finally be placed.

It records:

> linker, fix this address later.

That is:

```text
relocation
```

Once the linker lays out all sections, it may know:

```text
foo = 0x401040
```

and patch the reference.

---

# Segments and sections

A typical program has separate regions.

For example:

```text
.text
.data
.bss
.rodata
```

## `.text`

Executable code.

## `.data`

Initialized writable data.

## `.rodata`

Read-only data.

## `.bss`

Data that should start as zero.

In cc65 you encounter similar segment concepts, though names and organization depend on the target configuration.

---

# Loader

After producing an executable, something must load it into memory.

On a modern OS this is done by the operating-system loader.

On C64, a:

```text
PRG
```

contains a load address.

The system knows where to place the bytes.

Then the CPU must be given the entry point.

---

# Firmware, ROM and boot

When a computer powers on, the CPU does not magically know where the operating system is.

The architecture defines a reset/start mechanism.

6502 reads vectors from specific addresses.

A modern PC goes through firmware such as:

```text
UEFI
```

and then a bootloader.

On a microcontroller, code may begin directly from flash.

Assembly makes this layer much easier to understand.

---

# Reverse engineering

Assembly is the foundational language of reverse engineering.

Even without source code, you can inspect:

```text
machine code
```

and disassemble it.

Tools include:

- Ghidra,
- IDA,
- Binary Ninja,
- radare2,
- objdump,
- gdb.

A disassembler tries to turn bytes back into instructions.

A decompiler goes one step further and tries to reconstruct something resembling C.

---

# Assembly and security

Many vulnerability classes become much easier to understand after learning assembly basics:

- buffer overflow,
- stack smashing,
- use-after-free,
- ROP,
- shellcode,
- calling conventions,
- return-address overwrite.

Not because you need to write exploits.

Simply because you understand what:

```text
overwriting memory
```

really means.

---

# Buffer overflow - the core idea

Imagine a stack frame:

```text
[ local buffer ]
[ saved register ]
[ return address ]
```

If a program writes past the end of the buffer, it may overwrite the:

```text
return address
```

After `RET`, the processor may jump somewhere unexpected.

Modern systems use mitigations such as:

- ASLR,
- NX,
- stack canaries,
- PIE,
- CFI.

But the mechanism becomes much clearer when you understand:

```text
stack
return address
PC/RIP
```

---

# Cache

On 6502, memory can be understood almost as one uniform space.

Modern CPUs have several levels of cache:

```text
registers
L1
L2
L3
RAM
storage
```

Access times may differ enormously.

That means modern performance depends not only on instruction count.

It also depends on:

- locality,
- cache misses,
- memory bandwidth,
- branch prediction.

This is one reason hand-optimizing modern assembly is much harder than optimizing a simple 6502 routine.

---

# Pipeline

A CPU does not necessarily finish one instruction before beginning to process the next.

It can overlap stages:

```text
fetch
decode
execute
memory
writeback
```

across multiple instructions.

This is a:

```text
pipeline
```

---

# Branch prediction

When the CPU sees a branch:

```text
if
```

it may not want to wait until the condition is fully resolved.

It predicts:

```text
which path will execute
```

If correct:

```text
great
```

If wrong:

```text
part of the pipeline must be discarded
```

That is another reason modern instruction cost is not a simple table.

---

# Out-of-order execution

A modern CPU may execute instructions in a different internal order if doing so does not change the observable result.

For example:

```text
A waits for RAM
B is independent arithmetic
```

The CPU may begin B while waiting for A's data.

This is one of the foundations of modern processor performance.

On a typical 6502 we do not need to think about this world.

---

# SIMD

Modern CPUs can perform the same operation on multiple values at once.

This is:

```text
SIMD
```

x86 examples:

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

Useful for:

- graphics,
- audio,
- compression,
- ML,
- scientific computing.

---

# Should ordinary applications be written in assembly?

Usually no.

Reasons:

- far more code,
- poor portability,
- harder testing,
- harder maintenance,
- optimizing compilers are very good.

Assembly still makes sense in areas such as:

- bootloaders,
- parts of kernels,
- firmware,
- startup code,
- highly specific embedded code,
- cryptography,
- hand-tuned hot paths,
- reverse engineering,
- demoscene,
- retrocomputing.

---

# Assembly as a learning tool

For most modern programmers, this may be its most valuable use.

If you understand assembly, you better understand:

```text
C
pointers
stack
heap
ABI
debugger
compiler
linker
system calls
processes
memory
CPU
```

You do not need to use assembly professionally.

---

# Exercise 1 - register

6502:

```asm
LDA #10
```

Question:

```text
what does A contain now?
```

Answer:

```text
10
```

---

# Exercise 2 - memory

```asm
LDA #10
STA $2000
```

Question:

```text
what is stored at $2000?
```

Answer:

```text
10
```

---

# Exercise 3 - counter

```asm
LDX #0

loop:
    INX
    CPX #5
    BNE loop
```

After completion:

```text
X = 5
```

---

# Exercise 4 - array

```asm
values:
    .byte 10, 20, 30, 40
```

```asm
LDX #2
LDA values,X
```

A contains:

```text
30
```

The index starts at zero.

---

# Exercise 5 - subroutine

```asm
        JSR foo

        ...

foo:
        LDA #10
        RTS
```

After returning:

```text
A = 10
```

---

# Exercise 6 - stack

```asm
LDA #10
PHA

LDA #20

PLA
```

After `PLA`:

```text
A = 10
```

---

# Exercise 7 - overflow

```asm
CLC
LDA #255
ADC #1
```

8-bit A cannot store:

```text
256
```

After the operation:

```text
A = 0
Carry = 1
```

A very tangible lesson about fixed-width numbers.

---

# Mini-project: blinking C64 border

We can make a simple loop that changes the border color.

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

This delay is deliberately crude.

Real C64 code should often synchronize with hardware, for example with the raster.

But the exercise demonstrates:

- I/O writes,
- loops,
- registers,
- subroutines,
- bit masking.

---

# AND and bit masks

Instruction:

```asm
AND #$0F
```

keeps only the low four bits.

```text
$0F = 00001111
```

If A is:

```text
10110110
```

then:

```text
10110110
AND
00001111
=
00000110
```

Result:

```text
6
```

Bit masking is everywhere in low-level programming.

---

# OR

```asm
ORA #$80
```

sets selected bits.

Example:

```text
00100010
OR
10000000
=
10100010
```

---

# XOR

6502 instruction:

```asm
EOR
```

means exclusive OR.

```asm
EOR #$FF
```

flips all bits in A.

---

# Shifts

Shift instructions:

```asm
ASL
LSR
```

## ASL

```text
Arithmetic Shift Left
```

For unsigned values, shifting left by one bit is similar to:

```text
* 2
```

when there is no overflow.

## LSR

```text
Logical Shift Right
```

is similar to:

```text
/ 2
```

for unsigned values.

---

# Bit fields in hardware registers

A hardware register often contains several independent settings in one byte.

Hypothetical example:

```text
bit 7 = enable
bit 6 = interrupt
bit 5 = mode
...
```

Instead of replacing the whole byte, we can manipulate one bit:

```asm
ORA #%10000000
```

or:

```asm
AND #%01111111
```

This is foundational in:

- microcontrollers,
- drivers,
- device programming.

---

# Binary notation

ca65 supports:

```text
%10101010
```

which is convenient for bit patterns.

Example:

```asm
LDA #%00000001
```

Hex:

```asm
LDA #$01
```

Decimal:

```asm
LDA #1
```

Same value.

---

# How to read unfamiliar assembly

Do not try to understand every instruction independently.

First identify:

1. entry point,
2. main loop,
3. subroutines,
4. data,
5. memory accesses,
6. system or firmware calls,
7. conditions and branches.

Look for patterns.

Example:

```asm
loop:
    ...
    dec counter
    bne loop
```

You immediately recognize:

```text
counter-controlled loop
```

---

# 6502 instructions worth recognizing

## Data transfer

```text
LDA
LDX
LDY

STA
STX
STY
```

## Register transfer

```text
TAX
TAY
TXA
TYA
TSX
TXS
```

## Stack

```text
PHA
PLA
PHP
PLP
```

## Arithmetic

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

## Logic

```text
AND
ORA
EOR
```

## Shifts and rotates

```text
ASL
LSR
ROL
ROR
```

## Comparisons

```text
CMP
CPX
CPY
```

## Jumps and subroutines

```text
JMP
JSR
RTS
```

## Branches

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

## Flags

```text
CLC
SEC
CLI
SEI
CLD
SED
CLV
```

You do not need to memorize the entire table.

After a few small programs, most of it starts to feel natural.

---

# Branch versus jump

## JMP

```asm
JMP somewhere
```

always transfers control.

## Branch

```asm
BNE somewhere
```

transfers control only when a condition is satisfied.

Classic 6502 branches also have limited range relative to the current address.

That matters in larger functions.

---

# JSR versus JMP

```asm
JMP foo
```

jumps to `foo` with no automatic return mechanism.

```asm
JSR foo
```

stores a return address.

That is why a subroutine ends with:

```asm
RTS
```

---

# BRK

Instruction:

```asm
BRK
```

triggers a software interrupt.

It is not simply:

```text
stop CPU
```

On 6502 it enters the interrupt mechanism.

---

# NOP

```asm
NOP
```

means:

```text
No Operation
```

The CPU executes an instruction that intentionally changes almost nothing.

NOPs are useful for:

- timing,
- alignment,
- patching,
- debugging.

---

# Illegal opcodes

The classic 6502 has instruction encodings that were not officially documented but still produce defined hardware behavior.

They are called:

```text
illegal opcodes
undocumented opcodes
```

Demoscene programs and old games sometimes used them.

Beginners should avoid them.

Learn the official instruction set first.

---

# 6502 versus 6510

For most simple examples, the instruction set is effectively the same.

The 6510 adds an I/O port visible around:

```text
$0000
$0001
```

The C64 uses this to control memory mapping.

Changing `$0001` can influence whether the CPU sees:

- BASIC ROM,
- KERNAL ROM,
- I/O,
- RAM underneath ROM.

This is one of the things that makes the C64 more interesting than a purely abstract 6502 trainer.

---

# RAM under ROM

The C64 physically has 64 KiB of RAM.

At the same time, within the same address space we can see:

```text
ROM
I/O
```

How?

Hardware changes what is visible under particular addresses.

At:

```text
$A000
```

the CPU may see BASIC ROM in one configuration and RAM in another.

This is:

```text
bank switching / memory mapping
```

---

# Hardware is part of the program

On a modern operating system, an application mostly sees:

```text
OS abstractions
```

On C64, a program can directly touch:

```text
VIC-II
SID
CIA
RAM
ROM
```

That is why retro assembly is such a good way to study the architecture of a computer as a whole.

---

# What should you learn next on C64?

A natural order:

1. registers,
2. memory,
3. loops,
4. subroutines,
5. zero page,
6. text screen,
7. colors,
8. keyboard,
9. sprites,
10. raster,
11. SID,
12. interrupts,
13. custom data structures,
14. cycle optimization.

After that, assembly stops looking like mysterious incantations.

---

# Are we learning 6502 or C64?

These are two layers.

## 6502/6510

We learn:

```text
CPU
instructions
registers
flags
stack
addressing
```

## C64

We learn:

```text
memory map
VIC-II
SID
CIA
KERNAL
BASIC ROM
screen memory
```

You can know the 6502 instruction set and still know very little about the C64.

And vice versa.

---

# Building a small project

Simple layout:

```text
hello-c64/
├── src/
│   └── main.s
├── Makefile
└── README.md
```

Example `Makefile`:

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

Build:

```bash
make
```

Run:

```bash
make run
```

Clean:

```bash
make clean
```

---

# Why use a Makefile for one file?

For one source file, you barely need it.

But soon you may have:

```text
main.s
screen.s
sprites.s
sound.s
input.s
```

and the build command becomes tedious.

Automating the build is a natural next step.

---

# Git

Assembly source is plain text.

It works perfectly with Git.

```bash
git init
git add .
git commit -m "Initial C64 assembly project"
```

See:

[GitHub](techhandbook:doc-014)

Avoid committing generated binaries if they can be reproduced from source.

Typical `.gitignore`:

```gitignore
*.o
*.prg
*.map
*.lbl
```

---

# Map file

A linker can generate a map file.

It may show:

- segment placement,
- symbol addresses,
- code size.

In low-level programming this is extremely useful.

---

# Label file

You can generate symbol labels for an emulator or debugger, so instead of:

```text
$C042
```

you see:

```text
game_loop
```

That dramatically improves debugging.

---

# How to think about optimization

Do not start with:

> how many cycles can I shave off?

Start with:

1. write correct code,
2. test it,
3. measure,
4. find the bottleneck,
5. optimize only then.

Even on a C64.
Code that is:

```text
shorter
```

is not always:

```text
faster
```

And faster code is not always worth losing readability.

---

# Size versus speed

Retro programming often forces a trade-off between:

```text
fewer bytes
```

and:

```text
fewer cycles
```

A lookup table may replace a calculation:

```text
more memory
less CPU
```

or vice versa:

```text
less memory
more computation
```

The same trade-off still exists in modern software.

---

# Why does the demoscene love assembly?

Demoscene programming often tries to do the maximum possible with severely limited hardware.

Every:

- byte,
- cycle,
- timing detail

can matter.

Assembly gives a level of control that a high-level language may not.

That is why platforms such as:

- C64,
- Amiga,
- Atari ST,
- ZX Spectrum

have such a rich history of low-level programming.

---

# Assembly and microcontrollers

In embedded development you may still need to read assembly even when most of the project is written in C or Rust.

Examples:

- startup code,
- bootloader,
- interrupt vector,
- context switch,
- fault handler.

On Cortex-M you may encounter:

```text
startup_stm32.s
```

It is useful to understand what happens there even if you never write the entire application in assembly.

---

# Assembly and operating systems

A kernel must do things ordinary applications cannot.

For example:

- change CPU modes,
- handle interrupts,
- switch process context,
- manage page tables,
- execute privileged instructions.

Some of this code naturally belongs in assembly.

Most of a kernel can be written in C or Rust, but its lowest layers still have to understand the processor.

---

# Assembly in cryptography

Cryptographic software often needs:

- very high performance,
- SIMD,
- special hardware instructions,
- predictable execution.

That is why crypto libraries may contain hand-written assembly.

Such optimization should be done by people who deeply understand the target architecture.

---

# Inline assembly

C and C++ compilers may allow assembly inside source code.

Conceptual example:

```c
asm("nop");
```

This is:

```text
inline assembly
```

It is:

- compiler-specific,
- architecture-specific,
- easy to get wrong.

It should usually be kept to a minimum.

---

# Intrinsics

Instead of pure assembly, modern code often uses:

```text
intrinsics
```

These are compiler-provided functions that map to particular CPU operations.

They are common for:

- SIMD,
- cryptography,
- atomics.

The compiler still handles:

- register allocation,
- calling convention,
- instruction scheduling.

This is often a better compromise than hand-written assembly.

---

# What does “64-bit” really mean?

There is no single universal definition.

It can refer to:

- register width,
- address width,
- natural integer size,
- ISA family.

x86-64 has 64-bit general-purpose registers.

But modern CPUs do not necessarily implement every possible 64-bit virtual or physical address bit.

The marketing label simplifies the technical reality.

---

# What is an opcode?

Opcode means:

```text
operation code
```

It identifies an operation.

6502:

```text
A9
```

can mean:

```text
LDA immediate
```

Whole instruction:

```text
A9 10
```

means:

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

# Variable-length instructions

6502 instructions may be:

```text
1 byte
2 bytes
3 bytes
```

long.

x86 goes much further - instruction lengths vary considerably.

RISC-V uses a more regular format, though compressed instructions add shorter encodings.

Instruction encoding is part of the ISA.

---

# Alignment

Some architectures prefer or require data at aligned addresses.

For example:

```text
address divisible by 4
```

for a 32-bit value.

The situation differs between classic 6502, ARM, and modern x86.

Modern programmers encounter alignment in:

- C structures,
- SIMD,
- memory allocation,
- ABI rules.

---

# Atomics

Multicore CPUs need mechanisms for safe synchronization between cores.

ISAs provide special atomic operations.

On x86:

```text
LOCK
CMPXCHG
```

ARM and RISC-V have their own mechanisms.

These form the basis for:

- mutexes,
- spinlocks,
- atomics,
- lock-free structures.

A classic single-CPU C64 does not have to solve the same multicore problems.

---

# Privilege levels

Modern CPUs have different privilege levels.

Application code cannot simply:

```text
disable memory protection
```

The kernel can use instructions unavailable to normal processes.

On x86 you encounter:

```text
rings
```

On ARM:

```text
exception levels
```

This is part of the operating system's security foundation.

---

# Syscall versus library function

In C:

```c
printf("Hello");
```

is not directly an operating-system instruction.

`printf` is a library function.

It may eventually use a system call such as:

```text
write
```

Assembly lets us bypass some library layers and invoke the kernel more directly.

But we lose library convenience.

---

# The CPU does not know text

The processor does not know what:

```text
"Hello"
```

means.

It sees bytes.

For example:

```text
48 65 6C 6C 6F
```

may be interpreted as ASCII.

The same sequence could be treated as:

- numbers,
- instructions,
- pixels,
- audio data.

The data format gives those bytes meaning.

---

# The CPU does not know variables

In high-level code:

```c
int score = 10;
```

the CPU does not know the name:

```text
score
```

After compilation, the value may live in:

```text
a register
```

or:

```text
a memory address
```

The name mainly exists for humans and development tools.

---

# The CPU does not know loops

The CPU knows:

```text
jumps
conditions
addresses
```

Loop:

```c
while (x != 0) {
    x--;
}
```

may become:

```asm
loop:
    dec ...
    jne loop
```

This is an important shift in perspective.

---

# The CPU does not know functions

The CPU knows:

```text
addresses
stack
jump/call
return
```

A function is a convention built from those mechanisms.

---

# The CPU does not know objects

C++:

```cpp
player.move();
```

eventually becomes:

- addresses,
- pointers,
- functions,
- data,
- CPU instructions.

Abstraction layers are extremely useful.

But assembly remains underneath them.

---

# Why assembly is less frightening than it looks

The basics are often simpler than a modern frontend framework.

6502 gives you only a small set of fundamental concepts:

```text
a few registers
a small instruction set
memory
flags
stack
jumps
```

The difficulty appears when you build a large system from those small pieces.

You do not need advanced mathematics to understand the foundation.

---

# Minimal list to remember

If you forget most of this article, remember:

1. The processor executes machine code.
2. An assembler translates symbols into machine code.
3. Assembly depends on the ISA.
4. Registers live inside the CPU.
5. RAM is an addressable array of bytes.
6. PC points to an instruction.
7. SP points to the stack.
8. Flags describe operation results.
9. `JMP` changes control flow.
10. `CALL/JSR` + `RET/RTS` build function calls.
11. The linker combines modules and resolves symbols.
12. An ABI defines how binary components cooperate.
13. The operating system adds another layer above the ISA.
14. C64 is a great laboratory because hardware is visible without hundreds of abstraction layers.

---

# 6502 cheat sheet

| Instruction | Meaning |
|---|---|
| `LDA` | load A |
| `STA` | store A |
| `LDX` | load X |
| `STX` | store X |
| `LDY` | load Y |
| `STY` | store Y |
| `ADC` | add with Carry |
| `SBC` | subtract with Carry |
| `CMP` | compare A |
| `CPX` | compare X |
| `CPY` | compare Y |
| `INC` | increment memory |
| `DEC` | decrement memory |
| `INX` | X++ |
| `DEX` | X-- |
| `INY` | Y++ |
| `DEY` | Y-- |
| `AND` | bitwise AND |
| `ORA` | bitwise OR |
| `EOR` | bitwise XOR |
| `ASL` | shift left |
| `LSR` | shift right |
| `JMP` | unconditional jump |
| `JSR` | call subroutine |
| `RTS` | return |
| `BEQ` | branch if Z=1 |
| `BNE` | branch if Z=0 |
| `BCC` | branch if C=0 |
| `BCS` | branch if C=1 |
| `BMI` | branch if N=1 |
| `BPL` | branch if N=0 |
| `PHA` | push A |
| `PLA` | pull A |
| `CLC` | clear Carry |
| `SEC` | set Carry |
| `NOP` | no operation |

---

# Register cheat sheet

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
PC - conceptually, not as a regular GPR
PSTATE
```

## RISC-V

```text
x0-x31
pc
```

ABI aliases:

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

# Tools cheat sheet

| Purpose | 6502/C64 | x86-64 | ARM | RISC-V |
|---|---|---|---|---|
| assembler | `ca65` | `nasm` / `as` | `arm-none-eabi-as` | `riscv64-unknown-elf-as` |
| linker | `ld65` | `ld` | GNU `ld` | GNU `ld` |
| disassembler | `da65` | `ndisasm`, `objdump` | `objdump` | `objdump` |
| emulator/simulator | VICE / sim65 | QEMU / native CPU | QEMU / hardware | QEMU / hardware |
| debugger | VICE monitor | GDB | GDB | GDB |

---

# Installation - quick reference

## C64 / 6502

### Debian

```bash
sudo apt install cc65
sudo apt install vice
```

VICE requires `contrib`.

### macOS

```bash
brew install cc65
brew install vice
```

### Windows

Download current builds of:

```text
cc65
VICE
```

from the project sites.

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

For native Windows linking, Visual Studio Build Tools or MinGW/MSYS2 can also be useful depending on workflow.

---

# ARM bare metal

### Debian

```bash
sudo apt install gcc-arm-none-eabi
```

### Windows/macOS

Arm GNU Toolchain:

https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads

---

# RISC-V bare metal

### Debian

```bash
sudo apt install gcc-riscv64-unknown-elf
```

Linux cross:

```bash
sudo apt install gcc-riscv64-linux-gnu
```

---

# How to continue practicing

Do not begin with:

```text
I will write my own operating system
```

A better path:

## Step 1

Registers:

```asm
LDA
LDX
LDY
```

## Step 2

Memory:

```asm
STA
```

## Step 3

Loops:

```asm
CMP
BNE
```

## Step 4

Arrays and indexing.

## Step 5

Subroutines:

```asm
JSR
RTS
```

## Step 6

Stack:

```asm
PHA
PLA
```

## Step 7

C64:

```text
screen RAM
color RAM
VIC-II
```

## Step 8

KERNAL.

## Step 9

Interrupts.

## Step 10

Sprites and SID.

Only then does it make sense to dive more deeply into:

```text
x86-64
ARM
RISC-V
```

---

# Why start with 6502 instead of Intel?

Because you can almost hold the whole CPU model in your head.

You have:

```text
A
X
Y
SP
PC
flags
```

With x86-64 you immediately inherit:

- decades of compatibility,
- multiple register sizes,
- many addressing modes,
- SIMD,
- ABIs,
- privilege levels,
- a huge ISA.

6502 is a small model for learning the principles.

Then x86 stops looking like total chaos.

It looks more like:

> the same basic ideas after forty-plus years of expansion.

---

# The most important experiment: compare C with assembly

Create:

```text
example.c
```

```c
int sum(int a, int b)
{
    return a + b;
}
```

Then:

```bash
gcc -O0 -S example.c -o example-O0.s
gcc -O2 -S example.c -o example-O2.s
```

Compare the two files.

You will see what the optimizer changes.

Then:

```bash
gcc -O2 -c example.c -o example.o
objdump -d example.o
```

Now you can observe the full path:

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

For quickly comparing high-level code with generated assembly, use:

https://godbolt.org/

You can enter:

```c
int add(int a, int b) {
    return a + b;
}
```

and inspect output for:

- GCC,
- Clang,
- x86-64,
- ARM,
- RISC-V,
- multiple optimization levels.

It is one of the best educational tools for learning the relationship:

```text
C/C++/Rust -> assembly
```

---

# What does assembly give a high-level programmer?

Even if you never write another pure assembly program, you will understand these concepts better:

## Pointers

They are addresses.

## References

Eventually they must identify data.

## Stack

It is real memory with a real pointer.

## Functions

They are conventions for moving control between addresses and passing data.

## Types

The CPU sees bits. Types are a layer above them.

## Overflow

It follows from fixed-width representations.

## Segmentation fault

A process accessed memory it was not allowed to access.

## Calling convention

It is the agreement that lets binary components communicate.

## Compiler optimization

It is automatic transformation of code into a more efficient instruction sequence.

---

# What assembly does not teach you

Assembly does not replace knowledge of:

- algorithms,
- application architecture,
- databases,
- networking,
- application security,
- testing,
- API design.

It is one layer.

A very important one, but still only one.
---

# The key conclusion

The computer does not execute:

```javascript
button.addEventListener(...)
```

It does not execute:

```python
for x in items:
```

It does not execute:

```go
go worker()
```

It does not execute:

```c
printf(...)
```

At the bottom, it executes instructions of its architecture.

The entire modern stack:

```text
framework
runtime
library
language
compiler
operating system
```

eventually leads to:

```text
registers
memory
instructions
CPU
```

Assembly lets you look directly at that layer.

That is why it is worth learning even if it never becomes your main language.

---

# Related TechHandbook material

- [C - reading, building and debugging projects](techhandbook:doc-019)
- [Go - reading code](techhandbook:doc-020)
- [Debian - shell](techhandbook:doc-027)
- [Shell programming](techhandbook:doc-031)
- [Debian - desktop and server](techhandbook:doc-033)
- [Visual Studio Code](techhandbook:doc-039)
- [GitHub](techhandbook:doc-014)
- [20 modern programming languages worth knowing](techhandbook:doc-058)
- [Old programming languages that shaped computing](techhandbook:doc-059)

---

# Official sources and documentation

Tooling status: September 2026.

## 6502 / cc65

- cc65: https://cc65.github.io/
- ca65 User's Guide: https://cc65.github.io/doc/ca65.html
- ld65 User's Guide: https://cc65.github.io/doc/ld65.html
- C64-specific information: https://cc65.github.io/doc/c64.html
- cc65 GitHub: https://github.com/cc65/cc65

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

## Tools

- Compiler Explorer: https://godbolt.org/
- GNU Binutils: https://www.gnu.org/software/binutils/
- GDB: https://www.gnu.org/software/gdb/

---

# Next in the series

1. **20 modern programming languages worth knowing**
2. **Old programming languages that shaped computing**
3. **Assembly from scratch - from registers and memory to a real program** - this article
4. **Ada - the language where mistakes are meant to be harder to make**

The next article moves to a very different philosophy.

After assembly, where the programmer has almost complete control over the machine, we move to Ada - a language designed so that the programmer **cannot casually do everything that happens to be possible**.

That contrast makes the two languages excellent examples of two very different approaches to software development.
