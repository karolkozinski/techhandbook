# C — Reading, Building and Debugging Projects

## 1. Goal

This handbook is not intended to make you a professional C programmer.

The goal is to let you:

- recognize basic C syntax,
- understand the structure of a C project,
- read common declarations and control flow,
- clone an unfamiliar project,
- discover how it is built,
- compile it,
- run tests,
- use a debugger,
- diagnose typical build and runtime problems.

C is close enough to the operating system that understanding it also helps you understand Linux, FreeBSD, libraries, compilers, and many tools written in C.

## 2. What C is

C is a compiled, procedural systems-programming language.

A typical flow:

```text
source .c files
  ↓
preprocessor
  ↓
compiler
  ↓
object files .o
  ↓
linker
  ↓
executable / library
```

C gives you direct control over:

- memory,
- pointers,
- data layout,
- system calls,
- libraries.

That power also means many safety checks are your responsibility.

## 3. First program

```c
#include <stdio.h>

int main(void)
{
    printf("Hello, world!\n");
    return 0;
}
```

Compile:

```bash
cc hello.c -o hello
```

Run:

```bash
./hello
```

On Linux, `cc` usually points to GCC or Clang depending on the system.

On FreeBSD, Clang is the standard base-system compiler.

## 4. Compiler commands

Common compilers:

```text
cc
gcc
clang
```

Basic:

```bash
cc main.c -o app
```

Warnings:

```bash
cc -Wall -Wextra -Wpedantic main.c -o app
```

Debug symbols:

```bash
cc -g main.c -o app
```

Optimization:

```bash
cc -O2 main.c -o app
```

Do not mix aggressive optimization with debugging assumptions without understanding the effect.

## 5. Source and header files

Typical project:

```text
src/
  main.c
  config.c
  network.c

include/
  config.h
  network.h
```

`.c` files contain implementations.

`.h` files usually contain:

- function declarations,
- type declarations,
- macros,
- constants.

## 6. `#include`

System header:

```c
#include <stdio.h>
```

Project header:

```c
#include "config.h"
```

The exact search order depends on compiler flags and include style.

## 7. Preprocessor

Lines beginning with `#` are handled by the preprocessor.

Common directives:

```c
#include
#define
#ifdef
#ifndef
#endif
```

Example:

```c
#define PORT 8080
```

Conditional compilation:

```c
#ifdef DEBUG
printf("debug mode\n");
#endif
```

## 8. Include guards

Header:

```c
#ifndef CONFIG_H
#define CONFIG_H

int load_config(void);

#endif
```

This prevents repeated inclusion problems.

Some projects use:

```c
#pragma once
```

which is widely supported but historically non-standard.

## 9. Basic types

Common built-in types:

```c
char
short
int
long
long long
float
double
```

Signedness:

```c
unsigned int count;
signed char value;
```

Portable fixed-width types from `<stdint.h>`:

```c
uint8_t
uint32_t
int64_t
```

## 10. Variables

```c
int count = 10;
double price = 19.99;
char letter = 'A';
```

A string is commonly represented as an array of `char` ending with a null byte:

```c
char name[] = "Karol";
```

## 11. Constants

```c
const int port = 8080;
```

Macro constant:

```c
#define MAX_USERS 100
```

Prefer typed constants where practical.

## 12. Operators

Arithmetic:

```text
+ - * / %
```

Comparison:

```text
== != < > <= >=
```

Logical:

```text
&& || !
```

Bitwise:

```text
& | ^ ~ << >>
```

Assignment:

```text
= += -= *= /=
```

## 13. `if`

```c
if (count > 0) {
    printf("positive\n");
} else {
    printf("zero or negative\n");
}
```

In C, zero is false and non-zero is true.

## 14. `switch`

```c
switch (command) {
case 1:
    start();
    break;
case 2:
    stop();
    break;
default:
    usage();
    break;
}
```

Without `break`, execution normally falls through into the next case.

Sometimes that is intentional.

## 15. Loops

`for`:

```c
for (int i = 0; i < 10; i++) {
    printf("%d\n", i);
}
```

`while`:

```c
while (running) {
    poll_events();
}
```

`do while`:

```c
do {
    read_input();
} while (retry);
```

## 16. Functions

Declaration:

```c
int add(int a, int b);
```

Definition:

```c
int add(int a, int b)
{
    return a + b;
}
```

Call:

```c
int result = add(2, 3);
```

## 17. `void`

No return value:

```c
void log_message(const char *message)
{
    printf("%s\n", message);
}
```

No parameters in modern C:

```c
int get_status(void);
```

## 18. Scope

Local variable:

```c
void f(void)
{
    int x = 1;
}
```

Global variable:

```c
int global_count;
```

Avoid unnecessary global mutable state.

## 19. Arrays

```c
int numbers[3] = {10, 20, 30};
```

Access:

```c
numbers[0]
```

C does not automatically check array bounds.

This is one of the language's major sources of bugs.

## 20. Strings

```c
char text[] = "hello";
```

Memory layout:

```text
h e l l o \0
```

Standard string functions live in:

```c
#include <string.h>
```

Examples:

```c
strlen
strcmp
memcpy
memset
```

Many C security problems come from incorrect buffer-size handling.

## 21. Pointers

A pointer stores an address.

```c
int x = 42;
int *p = &x;
```

- `&x` — address of `x`,
- `p` — pointer containing that address,
- `*p` — value at that address.

Example:

```c
*p = 100;
```

now changes `x`.

## 22. Why pointers matter

Pointers are used for:

- dynamic memory,
- arrays,
- strings,
- structures,
- callbacks,
- system APIs,
- efficient parameter passing.

If you are only reading C, learn to recognize them before trying to master every pointer trick.

## 23. NULL

A pointer may intentionally point nowhere:

```c
int *p = NULL;
```

Always check APIs that may return `NULL`.

Dereferencing `NULL` is invalid and typically crashes.

## 24. Structures

```c
struct User {
    int id;
    char name[64];
};
```

Use:

```c
struct User user;
user.id = 1;
```

With a pointer:

```c
struct User *p = &user;
p->id = 2;
```

`p->id` is equivalent to:

```c
(*p).id
```

## 25. typedef

```c
typedef struct {
    int x;
    int y;
} Point;
```

Then:

```c
Point p;
```

## 26. enum

```c
enum Status {
    STATUS_OK,
    STATUS_ERROR,
    STATUS_UNKNOWN
};
```

Useful for named integer states.

## 27. union

A union lets several fields share the same memory.

```c
union Value {
    int i;
    double d;
};
```

Used in low-level data structures, protocols, and systems code.

## 28. Dynamic memory

Allocate:

```c
int *values = malloc(100 * sizeof *values);
```

Check:

```c
if (values == NULL) {
    return 1;
}
```

Free:

```c
free(values);
```

Header:

```c
#include <stdlib.h>
```

## 29. Common memory bugs

- memory leak,
- use-after-free,
- double free,
- out-of-bounds access,
- uninitialized memory,
- invalid pointer dereference.

These are central concepts when debugging C.

## 30. Stack vs heap

Very simplified:

### Stack

Automatic local variables:

```c
int x;
char buffer[256];
```

Lifetime typically follows function/block execution.

### Heap

Dynamic memory:

```c
malloc(...)
free(...)
```

Lifetime is controlled manually.

## 31. Command-line arguments

```c
int main(int argc, char **argv)
{
    printf("program: %s\n", argv[0]);

    if (argc > 1) {
        printf("arg: %s\n", argv[1]);
    }

    return 0;
}
```

## 32. Exit status

```c
return 0;
```

means success.

Common constants:

```c
#include <stdlib.h>

return EXIT_SUCCESS;
return EXIT_FAILURE;
```

## 33. errno

Many system/library calls indicate failure and set `errno`.

Example:

```c
FILE *f = fopen("config.txt", "r");

if (f == NULL) {
    perror("fopen");
    return 1;
}
```

Do not assume every function uses `errno`; read its documentation.

## 34. Files

Open:

```c
FILE *f = fopen("data.txt", "r");
```

Read:

```c
char line[256];

while (fgets(line, sizeof line, f) != NULL) {
    printf("%s", line);
}
```

Close:

```c
fclose(f);
```

## 35. Standard streams

```text
stdin
stdout
stderr
```

Print error:

```c
fprintf(stderr, "error\n");
```

## 36. Object files

Compile without linking:

```bash
cc -c main.c -o main.o
cc -c config.c -o config.o
```

Link:

```bash
cc main.o config.o -o app
```

This is what build systems automate.

## 37. Static libraries

Typical extension:

```text
.a
```

Create:

```bash
ar rcs libexample.a example.o
```

Link:

```bash
cc main.o -L. -lexample -o app
```

## 38. Shared libraries

Linux commonly uses:

```text
.so
```

FreeBSD also uses `.so`.

Inspect dependencies:

Linux:

```bash
ldd ./app
```

FreeBSD:

```sh
ldd ./app
```

## 39. Compiler include/library flags

Header search path:

```bash
-Iinclude
```

Library path:

```bash
-L/path/to/lib
```

Link library:

```bash
-lssl
```

Example:

```bash
cc -Iinclude main.c -L/usr/local/lib -lexample -o app
```

## 40. pkg-config

Many libraries publish metadata for compiler/linker flags.

Example:

```bash
pkg-config --cflags --libs openssl
```

A build system may call this automatically.

## 41. Makefile

Simple example:

```make
CC ?= cc
CFLAGS += -Wall -Wextra -O2

app: main.o config.o
	$(CC) $(CFLAGS) main.o config.o -o app

main.o: main.c config.h
	$(CC) $(CFLAGS) -c main.c

config.o: config.c config.h
	$(CC) $(CFLAGS) -c config.c

clean:
	rm -f app *.o
```

Important: recipe lines traditionally begin with a tab.

Run:

```bash
make
make clean
```

## 42. Common Make targets

```text
all
build
clean
install
test
check
dist
```

Inspect the Makefile before running `make install`, especially as root.

## 43. CMake

A project may use:

```text
CMakeLists.txt
```

Typical out-of-tree build:

```bash
cmake -S . -B build
cmake --build build
```

Tests:

```bash
ctest --test-dir build
```

Install:

```bash
cmake --install build
```

possibly with elevated permissions depending on destination.

## 44. Meson + Ninja

Files:

```text
meson.build
```

Build:

```bash
meson setup build
meson compile -C build
```

Tests:

```bash
meson test -C build
```

## 45. Autotools

Older Unix projects may use:

```text
configure
Makefile.am
Makefile.in
```

Typical flow:

```bash
./configure
make
make check
sudo make install
```

Sometimes you first need:

```bash
autoreconf -fi
```

Read `README` and `INSTALL` before guessing.

## 46. How to approach an unfamiliar C repository

First:

```bash
ls -la
find . -maxdepth 2 -type f | sort | less
```

Look for:

```text
README.md
INSTALL
Makefile
CMakeLists.txt
meson.build
configure
configure.ac
src/
include/
tests/
```

Then read the README and build files before reading every source file.

## 47. Find the entry point

Search:

```bash
rg 'int main\s*\('
```

or:

```bash
grep -R 'int main' .
```

Then follow function calls outward.

## 48. Find a function definition

```bash
rg 'function_name'
```

With editor tooling, use:

- go to definition,
- references,
- ctags,
- clangd.

## 49. clangd

`clangd` is a language server for C/C++.

It provides:

- diagnostics,
- navigation,
- completion,
- references.

Editors such as VS Code, Vim, and Neovim can integrate with it.

A `compile_commands.json` file greatly improves accuracy.

## 50. compile_commands.json

CMake:

```bash
cmake -S . -B build -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
```

This database records compiler flags per source file.

Language servers and static analyzers use it.

## 51. Warnings

Warnings are valuable.

Start with:

```bash
-Wall -Wextra -Wpedantic
```

In a mature project, warnings may be treated as errors:

```bash
-Werror
```

Do not enable `-Werror` blindly for third-party code or a new compiler before checking impact.

## 52. Debug build

Common:

```bash
cc -g -O0 ...
```

This preserves debug information and simplifies stepping through code.

Some projects use:

```text
Debug
Release
RelWithDebInfo
```

build modes.

## 53. gdb

On Linux:

```bash
gdb ./app
```

Useful commands:

```text
break main
run
next
step
continue
print variable
backtrace
frame
list
quit
```

## 54. lldb

FreeBSD commonly includes LLDB.

```bash
lldb ./app
```

Typical commands:

```text
breakpoint set --name main
run
next
step
continue
frame variable
bt
quit
```

## 55. Core dumps

A crash may produce a core file depending on system configuration.

Analyze:

```bash
gdb ./app core
```

or:

```bash
lldb -c core ./app
```

Backtraces are often the fastest way to identify where a crash occurred.

## 56. AddressSanitizer

Compile:

```bash
cc -g -fsanitize=address -fno-omit-frame-pointer   main.c -o app
```

Run normally.

ASan can find:

- out-of-bounds access,
- use-after-free,
- some memory leaks depending on platform/tooling.

## 57. UndefinedBehaviorSanitizer

```bash
cc -g -fsanitize=undefined main.c -o app
```

Helps detect some forms of undefined behavior.

Sanitizer support depends on compiler/platform.

## 58. Valgrind

On Linux, Valgrind can help diagnose memory problems:

```bash
valgrind --leak-check=full ./app
```

On FreeBSD support/version may differ; sanitizers and LLDB are often the more natural tools.

## 59. strace and truss

Linux:

```bash
strace ./app
```

FreeBSD:

```sh
truss ./app
```

They show system calls.

Useful when a program:

- cannot open a file,
- cannot connect,
- gets permission errors,
- behaves differently from expectations.

## 60. Static analysis

Clang analyzer:

```bash
clang --analyze file.c
```

Other tools include:

- clang-tidy,
- cppcheck,
- CodeQL.

Use them as complements to compiler warnings and tests.

## 61. Tests

Projects may use:

- custom test binaries,
- CTest,
- Meson tests,
- Check,
- CUnit,
- Unity,
- cmocka.

Always look for the project's documented command.

Examples:

```bash
make test
make check
ctest --test-dir build
meson test -C build
```

## 62. Undefined behavior

C has operations for which the language does not define a result.

Examples include:

- out-of-bounds access,
- dereferencing invalid pointers,
- signed integer overflow,
- some use of uninitialized values.

The compiler may optimize under the assumption that undefined behavior never happens.

This explains many “impossible” C bugs.

## 63. Endianness

Low-level/network code may care about byte order.

Network byte order is big-endian.

Functions:

```c
htons
htonl
ntohs
ntohl
```

Do not manually guess byte order in protocol code.

## 64. Struct layout and padding

The compiler may insert padding between structure fields.

Do not assume:

```text
sizeof(struct) = sum of field sizes
```

This matters in binary protocols and file formats.

## 65. Function pointers

Example:

```c
int add(int a, int b)
{
    return a + b;
}

int (*operation)(int, int) = add;
```

Used for:

- callbacks,
- dispatch tables,
- plugin APIs.

## 66. `static`

At file scope:

```c
static int helper(void);
```

limits symbol visibility to that translation unit.

Inside a function:

```c
static int counter;
```

gives static storage duration.

The keyword has context-dependent meaning.

## 67. `extern`

Declares a symbol defined elsewhere:

```c
extern int global_value;
```

The linker resolves it.

## 68. Build errors vs link errors

Compiler error:

```text
syntax error
unknown type
wrong function call
```

Linker error:

```text
undefined reference
duplicate symbol
missing library
```

Recognizing the stage narrows debugging quickly.

## 69. `undefined reference`

Usually means:

- implementation object file not linked,
- wrong library order,
- missing `-l...`,
- function excluded by conditional compilation,
- symbol name mismatch.

Inspect the final link command.

## 70. `No such file or directory` for a header

Check:

- development package installed,
- `-I` path,
- correct header name,
- generated headers created by configure/CMake.

## 71. Libraries on Debian

Development packages often end in:

```text
-dev
```

Example:

```bash
sudo apt install libssl-dev
```

Runtime and development packages can be separate.

## 72. Libraries on FreeBSD

Install packages with:

```sh
pkg install ...
```

Third-party headers/libraries commonly live under:

```text
/usr/local/include
/usr/local/lib
```

Build systems usually know these paths or discover them with pkg-config.

## 73. Debugging a crash

A sensible order:

1. rebuild with `-g`,
2. reproduce,
3. get a backtrace,
4. inspect the crashing frame,
5. check pointers/array indexes,
6. run ASan/UBSan,
7. add a regression test.

Do not start by randomly rewriting code.

## 74. Reading style

When you see:

```c
const struct config *cfg
```

read it from the variable outward:

```text
cfg is a pointer
to a const struct config
```

Practice reading declarations slowly.

## 75. Macros

Example:

```c
#define MAX(a, b) ((a) > (b) ? (a) : (b))
```

Macros are text substitution and can have surprising side effects.

Modern C code often prefers inline functions when possible.

## 76. Conditional platform code

Typical:

```c
#ifdef __FreeBSD__
...
#elif defined(__linux__)
...
#endif
```

This is common in portable systems projects.

## 77. Feature detection

Good projects prefer detecting capabilities/libraries in the build system rather than hardcoding operating-system assumptions everywhere.

## 78. Installation prefix

Common Unix convention:

```text
/usr/local
```

A local build may install:

```text
/usr/local/bin
/usr/local/lib
/usr/local/include
```

Packaging systems may use different paths.

## 79. Do not use `sudo make` for compilation

Build as your normal user:

```bash
make
```

Elevate only the install step if the destination requires it:

```bash
sudo make install
```

Even then, package managers or staged installation can be safer.

## 80. Clean builds

When generated files cause confusion:

```bash
rm -rf build
cmake -S . -B build
cmake --build build
```

Do not delete directories until you understand whether they contain source or only generated artifacts.

## 81. Useful repository commands

```bash
git status
git log --oneline --graph --all
git diff
rg 'symbol'
find . -maxdepth 2 -type f
```

## 82. What you should be able to recognize

After this handbook you should recognize:

- includes,
- functions,
- pointers,
- structures,
- arrays,
- loops,
- conditions,
- memory allocation,
- headers,
- object files,
- libraries,
- Make/CMake/Meson,
- compiler/linker errors,
- debugger backtraces.

## 83. Minimal project-reading workflow

```text
README
 ↓
build system
 ↓
main()
 ↓
public headers
 ↓
important modules
 ↓
tests
 ↓
debugger / sanitizers if needed
```

## 84. Final command cheat sheet

```bash
# compile one file
cc -Wall -Wextra -g main.c -o app

# Make
make
make clean
make test

# CMake
cmake -S . -B build
cmake --build build
ctest --test-dir build

# Meson
meson setup build
meson compile -C build
meson test -C build

# symbols/libraries
ldd ./app
pkg-config --cflags --libs LIB

# debugger
gdb ./app
lldb ./app

# system calls
strace ./app
truss ./app
```

## Summary

You do not need to write complex C to understand a C project.

Learn to answer:

```text
Where is main?
Which headers define the API?
How is the project built?
Which libraries are linked?
What does the compiler say?
Where did the program crash?
How do I run the tests?
```

That is enough to work intelligently with a large amount of C software.
