# C — Handbook for Reading, Building and Debugging Projects

> Goal: understand unfamiliar C projects, read their structure, build them, diagnose compiler/linker/runtime problems and recognize the language constructs you are most likely to encounter.

# 1. C in one sentence

C is a compiled systems language with explicit memory management, simple syntax and very little runtime machinery.

# 2. Smallest useful program

```c
#include <stdio.h>

int main(void) {
    printf("Hello\n");
    return 0;
}
```

Compile:

```bash
cc main.c -o app
./app
```

# 3. Common file extensions

```text
.c    source file
.h    header
.o    object file
.a    static library
.so   shared library on Linux
.dylib shared library on macOS
```

# 4. Typical project layout

```text
project/
├── src/
│   ├── main.c
│   ├── parser.c
│   └── network.c
├── include/
│   ├── parser.h
│   └── network.h
├── tests/
├── Makefile
└── README.md
```

Larger projects may use CMake, Meson or Autotools.

# 5. main()

```c
int main(void) {
    return 0;
}
```

With arguments:

```c
int main(int argc, char **argv) {
    ...
}
```

`argc` is argument count.

`argv` is the argument array.

# 6. Variables

```c
int count = 10;
double price = 19.99;
char letter = 'A';
```

Fixed-width integers:

```c
#include <stdint.h>

int32_t id;
uint64_t size;
```

# 7. const

```c
const int max_retries = 5;
```

Pointer forms:

```c
const char *p;      /* data is const */
char *const p2 = x; /* pointer is const */
```

# 8. sizeof

```c
sizeof(int)
sizeof value
sizeof array
```

Returns a value of type `size_t`.

# 9. Operators

Arithmetic:

```text
+ - * / %
```

Comparison:

```text
== != < <= > >=
```

Logical:

```text
&& || !
```

Bitwise:

```text
& | ^ ~ << >>
```

# 10. if

```c
if (value > 0) {
    ...
} else if (value == 0) {
    ...
} else {
    ...
}
```

# 11. switch

```c
switch (state) {
case STATE_READY:
    break;
case STATE_ERROR:
    break;
default:
    break;
}
```

Remember `break` unless fallthrough is deliberate.

# 12. Loops

for:

```c
for (int i = 0; i < 10; i++) {
}
```

while:

```c
while (running) {
}
```

do-while:

```c
do {
} while (condition);
```

Infinite loop:

```c
for (;;) {
}
```

# 13. Functions

```c
int add(int a, int b) {
    return a + b;
}
```

Void function:

```c
void log_message(const char *message) {
}
```

Declaration:

```c
int add(int a, int b);
```

Definition contains the body.

# 14. Header files

Headers usually contain public declarations:

```c
#ifndef USER_H
#define USER_H

struct user;
int user_load(int id);

#endif
```

# 15. #include

Standard/library header:

```c
#include <stdio.h>
```

Project header:

```c
#include "user.h"
```

# 16. Include guards

```c
#ifndef PROJECT_CONFIG_H
#define PROJECT_CONFIG_H

...

#endif
```

They prevent duplicate inclusion.

# 17. Preprocessor

The preprocessor handles directives before compilation.

```c
#define BUFFER_SIZE 4096
#include "config.h"
#ifdef DEBUG
...
#endif
```

# 18. Conditional compilation

```c
#ifdef __linux__
...
#elif defined(__FreeBSD__)
...
#endif
```

Build systems often define feature macros using `-DNAME=value`.

# 19. Macros

```c
#define MAX(a, b) ((a) > (b) ? (a) : (b))
```

Macros are text substitution. Be careful with side effects and parentheses.

# 20. typedef

```c
typedef unsigned long ulong;

typedef struct user {
    int id;
} user_t;
```

# 21. struct

```c
struct user {
    int id;
    char name[64];
};
```

Use:

```c
struct user u;
u.id = 1;
```

Pointer access:

```c
struct user *u = ...;
u->id = 1;
```

# 22. enum

```c
enum state {
    STATE_IDLE,
    STATE_RUNNING,
    STATE_ERROR
};
```

Enums are useful for named integer states.

# 23. union

```c
union value {
    int i;
    double d;
};
```

Members share the same memory.

# 24. Arrays

```c
int values[10];
char name[64];
```

Array length:

```c
size_t n = sizeof values / sizeof values[0];
```

This works only while `values` is still an actual array, not a pointer parameter.

# 25. Strings

C strings are arrays of char terminated by `'\0'`.

```c
char name[] = "Alice";
```

Important functions:

```c
strlen
strcmp
strncmp
strcpy
strncpy
snprintf
strchr
strstr
```

Be very careful with destination buffer sizes.

# 26. Pointers

A pointer stores an address.

```c
int value = 10;
int *ptr = &value;

printf("%d\n", *ptr);
```

`&value` = address of value.

`*ptr` = value stored at the pointed address.

# 27. Why pointers exist

Pointers are used for:

- modifying caller-owned data,
- passing large structures efficiently,
- dynamic memory,
- arrays/strings,
- data structures,
- callbacks,
- OS APIs.

# 28. NULL

```c
int *ptr = NULL;
```

Never dereference NULL.

# 29. Pointer to pointer

```c
char **argv;
struct user **out_user;
```

This commonly appears when a function needs to modify a caller's pointer.

# 30. Modifying through a pointer

```c
void increment(int *value) {
    (*value)++;
}
```

# 31. Dynamic memory

```c
void *malloc(size_t size);
void *calloc(size_t n, size_t size);
void *realloc(void *ptr, size_t size);
void free(void *ptr);
```

Typical pattern:

```c
struct user *u = malloc(sizeof *u);
if (u == NULL) {
    return NULL;
}

...

free(u);
```

# 32. Memory leaks

A leak happens when allocated memory is no longer reachable and was never freed.

Tools such as AddressSanitizer and Valgrind help detect leaks.

# 33. Use-after-free

```c
free(ptr);
printf("%d\n", *ptr); /* invalid */
```

After free, the pointer does not become safe automatically.

A common defensive pattern:

```c
free(ptr);
ptr = NULL;
```

# 34. Stack and heap

Stack:

- automatic local variables,
- lifetime tied to function scope,
- fast allocation.

Heap:

- explicit allocation,
- lifetime controlled by program,
- requires `free`.

# 35. Passing structures

By value:

```c
void show(struct user u);
```

By pointer:

```c
void show(const struct user *u);
```

Pointer passing is common for large or mutable structures.

# 36. Function pointers

```c
typedef int (*compare_fn)(const void *, const void *);
```

Example:

```c
qsort(array, count, sizeof array[0], compare);
```

Callbacks are common in C libraries.

# 37. static

Inside a function:

```c
static int counter;
```

Value persists across calls.

At file scope:

```c
static void helper(void) {
}
```

The symbol is private to that translation unit.

# 38. extern

```c
extern int global_config;
```

Declares a symbol defined elsewhere.

# 39. Global variables

Global state exists for the whole program lifetime and can make code harder to test and reason about.

Prefer explicit context objects when practical.

# 40. Return codes and errno

C APIs often return:

```text
0     success
-1    failure
NULL  failure for pointer-returning APIs
```

POSIX calls often set `errno`.

```c
#include <errno.h>
#include <string.h>

fprintf(stderr, "%s\n", strerror(errno));
```

# 41. Standard I/O

```c
stdin
stdout
stderr
```

Functions:

```c
printf
fprintf
fputs
fgets
fread
fwrite
```

# 42. printf formatting

```c
printf("%d\n", value);
printf("%s\n", text);
printf("%zu\n", size);
printf("%p\n", (void *)ptr);
```

Use correct format specifiers; mismatches can be undefined behavior.

# 43. Files

```c
FILE *f = fopen("data.txt", "r");
if (f == NULL) {
    perror("fopen");
    return 1;
}

fclose(f);
```

# 44. File descriptors

POSIX APIs use integer descriptors:

```c
int fd = open(path, O_RDONLY);
read(fd, buffer, size);
close(fd);
```

`FILE *` is stdio; file descriptors are lower-level OS interfaces.

# 45. C vs POSIX

ISO C standard library is portable across many systems.

POSIX adds Unix interfaces such as:

- fork,
- pipe,
- sockets,
- pthreads,
- open/read/write.

Not all POSIX code is portable to Windows.

# 46. Standard headers worth knowing

```text
stdio.h    I/O
stdlib.h   allocation, conversion, exit
string.h   memory/string functions
stdint.h   fixed-width integers
stdbool.h  bool
ctype.h    character classification
time.h     time
errno.h    errno
assert.h   assertions
```

# 47. bool

```c
#include <stdbool.h>

bool ready = true;
```

# 48. Assertions

```c
#include <assert.h>

assert(ptr != NULL);
```

Assertions are for programmer assumptions, not user input validation.

# 49. Compile one file

```bash
cc main.c -o app
```

With warnings:

```bash
cc -Wall -Wextra -Wpedantic main.c -o app
```

# 50. Compile several files

```bash
cc main.c parser.c network.c -o app
```

# 51. Compile in stages

```bash
cc -c main.c -o main.o
cc -c parser.c -o parser.o
cc main.o parser.o -o app
```

`-c` compiles but does not link.

# 52. Important compiler flags

```text
-Wall
-Wextra
-Wpedantic
-Werror
-g
-O0
-O2
-std=c11
-std=c17
-Ipath
-Lpath
-lname
-DNAME=value
```

# 53. Language standard

```bash
cc -std=c17 ...
```

Projects may use C99, C11, C17 or newer modes.

# 54. Optimization

Debug:

```bash
-O0 -g
```

Typical release:

```bash
-O2
```

Higher optimization can make debugging harder.

# 55. Include paths

```bash
cc -Iinclude src/main.c
```

# 56. Libraries

Static:

```text
libfoo.a
```

Shared:

```text
libfoo.so
```

Link:

```bash
cc main.o -L/path/to/lib -lfoo -o app
```

# 57. Compilation vs linking

Compilation translates source files into object files.

Linking resolves symbols between object files and libraries and creates the final executable/shared library.

Typical linker error:

```text
undefined reference to ...
```

This usually means the declaration was visible but the implementation was not linked.

# 58. pkg-config

```bash
pkg-config --cflags --libs libcurl
```

It prints the compiler and linker flags required by a library.

# 59. Make

```make
make clean
make test
make -j"$(nproc)"
```

Simple Makefile:

```make
CC = cc
CFLAGS = -Wall -Wextra -g

app: main.o parser.o
	$(CC) main.o parser.o -o app

main.o: main.c
	$(CC) $(CFLAGS) -c main.c

parser.o: parser.c
	$(CC) $(CFLAGS) -c parser.c

clean:
	rm -f *.o app
```

# 60. CMake

Typical workflow:

```bash
cmake -S . -B build
cmake --build build
ctest --test-dir build
```

Debug build:

```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
```

Install:

```bash
cmake --install build
```

List cache variables:

```bash
cmake -L build
```

# 61. Meson

```bash
meson setup build
meson compile -C build
meson test -C build
```

# 62. Autotools

Common workflow:

```bash
./configure
make
make check
sudo make install
```

Some Git checkouts require:

```bash
autoreconf -fi
```

# 63. Recognising the build system

Look for:

```text
Makefile
CMakeLists.txt
meson.build
configure
configure.ac
Makefile.am
```

# 64. First steps after git clone

```bash
git clone REPO
cd REPO
ls
sed -n '1,200p' README.md
```

Then identify the build system and dependencies.

# 65. Reading an unfamiliar C project

Start with:

1. README,
2. build files,
3. public headers,
4. `main()`,
5. central structs,
6. initialization,
7. cleanup,
8. I/O boundaries,
9. tests.

# 66. Public API of a module

Header:

```c
/* parser.h */
struct parser;

struct parser *parser_create(void);
int parser_parse(struct parser *, const char *);
void parser_destroy(struct parser *);
```

Implementation details can remain private in `parser.c`.

# 67. Opaque structs

Header:

```c
struct database;
```

Source:

```c
struct database {
    int fd;
    char *path;
};
```

This hides implementation and stabilizes APIs.

# 68. Program flow

Trace:

```text
main
↓
initialization
↓
configuration
↓
event loop / request loop
↓
work
↓
cleanup
```

# 69. Searching symbols

```bash
rg 'function_name'
grep -R 'function_name' .
```

With ctags:

```bash
ctags -R .
```

# 70. compile_commands.json

Many tools understand:

```text
compile_commands.json
```

CMake can generate it:

```bash
cmake -S . -B build -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
```

# 71. Debugging with printf

Still useful:

```c
fprintf(stderr, "state=%d ptr=%p\n", state, (void *)ptr);
```

# 72. GDB

Build with debug symbols:

```bash
cc -g -O0 main.c -o app
gdb ./app
```

Core commands:

```text
run
break main
break function
next
step
continue
print variable
backtrace
frame
info locals
quit
```

# 73. Segmentation faults

Run under GDB:

```bash
gdb ./app
(gdb) run
(gdb) bt
```

The backtrace often reveals where invalid memory access happened.

# 74. Core dumps

A core file captures process memory after a crash.

On systems configured to save cores:

```bash
gdb ./app core
```

# 75. LLDB

Clang/LLVM debugger:

```bash
lldb ./app
```

Useful on systems where LLDB is standard.

# 76. Sanitizers

AddressSanitizer:

```bash
cc -fsanitize=address -fno-omit-frame-pointer -g main.c -o app
```

UndefinedBehaviorSanitizer:

```bash
cc -fsanitize=undefined -g main.c -o app
```

Combined:

```bash
cc -fsanitize=address,undefined -g ...
```

ThreadSanitizer:

```bash
cc -fsanitize=thread -g ...
```

# 77. Valgrind

```bash
valgrind --leak-check=full ./app
```

Useful for memory diagnostics where available.

# 78. Static analysis

Clang:

```bash
clang --analyze file.c
```

cppcheck:

```bash
cppcheck --enable=all src/
```

clang-tidy provides deeper checks when configured.

# 79. clang-format

```bash
clang-format -i src/*.c include/*.h
```

Projects often include `.clang-format`.

# 80. Shared and static libraries

Static archive:

```bash
ar rcs libfoo.a foo.o
```

Shared library:

```bash
cc -fPIC -c foo.c
cc -shared foo.o -o libfoo.so
```

# 81. Binary inspection

```bash
file app
nm app
readelf -h app
objdump -d app
ldd app
```

These help inspect architecture, symbols, dependencies and machine code.

# 82. pthread

```c
#include <pthread.h>
```

Compile:

```bash
cc main.c -pthread -o app
```

Threads require careful synchronization.

# 83. Networking

POSIX sockets use functions such as:

```text
socket
bind
listen
accept
connect
send
recv
close
```

Network code often combines sockets with poll/select/epoll/kqueue or a library.

# 84. Event loops

Typical model:

```text
wait for events
↓
read/write sockets
↓
dispatch callbacks
↓
repeat
```

Libraries such as libuv abstract this.

# 85. Common libraries

libcurl — HTTP and network transfers.

OpenSSL — TLS/crypto.

SQLite — embedded SQL database.

libxml2 — XML.

jansson / cJSON — JSON.

libpng — PNG.

SDL / raylib — graphics and games.

ncurses — terminal UI.

libuv — event loop and async I/O.

# 86. goto

`goto` is legal C.

A common, reasonable use is centralized cleanup:

```c
int do_work(void) {
    FILE *f = NULL;
    void *buf = NULL;
    int rc = -1;

    f = fopen("data", "r");
    if (!f)
        goto cleanup;

    buf = malloc(1024);
    if (!buf)
        goto cleanup;

    rc = 0;

cleanup:
    free(buf);
    if (f)
        fclose(f);
    return rc;
}
```

# 87. Bit operations

```c
flags |= FLAG_READ;
flags &= ~FLAG_WRITE;
if (flags & FLAG_READ) {
}
```

Hex values:

```c
0xff
0x80000000u
```

# 88. Endianness

Endianness defines byte order for multi-byte integers.

Network protocols commonly use big-endian “network byte order”.

Functions:

```c
htons
htonl
ntohs
ntohl
```

# 89. volatile

`volatile` tells the compiler that a value can change outside normal program flow.

It is used for hardware registers and some signal-related cases.

It is not a thread-synchronization primitive.

# 90. Atomics

C11:

```c
#include <stdatomic.h>

atomic_int counter;
```

Use atomics for carefully designed lock-free/shared state.

# 91. inline

```c
static inline int min_int(int a, int b) {
    return a < b ? a : b;
}
```

The compiler ultimately decides whether to inline.

# 92. Ternary operator

```c
int max = a > b ? a : b;
```

# 93. Struct initialization

```c
struct user u = {0};
```

Designated initializers:

```c
struct user u = {
    .id = 1,
    .name = "Alice"
};
```

# 94. memset

```c
memset(buffer, 0, sizeof buffer);
```

Use it for bytes. Do not assume it safely creates arbitrary non-zero typed values.

# 95. Naming conventions

Common patterns:

```text
module_create
module_destroy
module_init
module_cleanup
module_get
module_set
```

The `_t` suffix often denotes a typedef.

# 96. size_t

Unsigned integer type suitable for sizes and array indexes.

Use `%zu` with printf.

# 97. Common compiler errors

`implicit declaration of function` — missing declaration/header.

`unknown type name` — type not declared or header missing.

`undeclared identifier` — name not in scope.

`conflicting types` — declaration and definition disagree.

# 98. Common linker errors

`undefined reference` — implementation/library missing from link.

`multiple definition` — same global symbol defined more than once.

# 99. Runtime failures

Common classes:

- segmentation fault,
- double free,
- heap corruption,
- use-after-free,
- buffer overflow,
- integer overflow,
- deadlock,
- unhandled error code.

# 100. Compiler warnings matter

Use at least:

```bash
-Wall -Wextra
```

Treat warnings as bugs until understood.

Some projects use:

```bash
-Werror
```

which turns warnings into errors.

# 101. Debug vs Release

Debug:

```text
-g -O0
assertions enabled
sanitizers possible
```

Release:

```text
-O2 / -O3
possibly NDEBUG
optimized binary
```

# 102. Dependencies on Debian

Development packages often end in `-dev`.

Example:

```bash
sudo apt install libcurl4-openssl-dev
```

Find a package containing a file:

```bash
apt-file search header.h
```

# 103. Dependencies on FreeBSD

```bash
pkg search curl
sudo pkg install curl
```

Ports can also be used, but binary packages are simpler for most users.

# 104. Submodules

```bash
git submodule update --init --recursive
```

Always inspect `.gitmodules` in unfamiliar projects.

# 105. Generated files

Do not edit generated files unless the project expects it.

Clues include:

```text
generated
do not edit
config.h
parser.c generated from grammar
```

# 106. config.h

Autotools/CMake projects may generate feature configuration headers.

Do not manually recreate them unless the build documentation says so.

# 107. Vendored libraries

Some repositories include third-party dependencies in:

```text
vendor/
third_party/
deps/
external/
```

# 108. Tests

Look for:

```text
tests/
test/
*_test.c
CTest
make test
make check
```

CMake:

```bash
ctest --test-dir build --output-on-failure
```

# 109. strace / truss / ltrace

Linux system calls:

```bash
strace ./app
```

FreeBSD equivalent:

```bash
truss ./app
```

Library calls on Linux:

```bash
ltrace ./app
```

These tools help when you need to see which files, sockets or syscalls a program actually uses.

# 110. Profiling

gprof is an older profiler.

Linux `perf` is very useful:

```bash
perf record ./app
perf report
```

# 111. Multithreaded debugging

In GDB:

```text
info threads
thread N
thread apply all bt
```

Deadlocks often appear as multiple threads waiting on locks.

# 112. Attach to a running process

```bash
gdb -p PID
```

# 113. Processes and signals

POSIX process concepts include:

```text
fork
exec
wait
kill
signals
```

Signals:

```text
SIGTERM
SIGINT
SIGHUP
SIGSEGV
```

A daemon should handle shutdown signals cleanly.

# 114. Logging

C programs may use stderr, syslog, journald integration or a custom logging library.

Always find where logs actually go before debugging.

# 115. README vs code

README describes intended workflow.

Build scripts and source code reveal the actual workflow.

Use both.

# 116. Show build commands

Make:

```bash
make V=1
```

CMake:

```bash
cmake --build build --verbose
```

Ninja:

```bash
ninja -C build -v
```

# 117. Choose Clang instead of GCC in CMake

```bash
CC=clang cmake -S . -B build
```

# 118. Sanitizer build with CMake

```bash
cmake -S . -B build   -DCMAKE_BUILD_TYPE=Debug   -DCMAKE_C_FLAGS="-fsanitize=address,undefined -fno-omit-frame-pointer"
```

# 119. Feature flags

Projects often expose options:

```bash
cmake -L build
./configure --help
meson configure build
```

# 120. Cross compilation

Cross compilation means building for a different target architecture/OS.

It requires a target compiler/toolchain and often a sysroot.

# 121. Compile-time vs runtime

Compile-time:

- syntax,
- types,
- missing declarations,
- build configuration.

Link-time:

- unresolved/duplicate symbols.

Runtime:

- invalid memory,
- files,
- networking,
- permissions,
- logic.

Knowing the phase narrows the search dramatically.

# 122. Undefined behavior

C permits situations where the standard imposes no defined result.

Examples:

- out-of-bounds access,
- use-after-free,
- signed integer overflow,
- invalid pointer dereference.

Optimized builds may expose UB differently from debug builds.

# 123. Buffer overflow

Never copy unbounded data into fixed buffers.

Prefer APIs where destination size is explicit and validate lengths.

# 124. Integer overflow

Unsigned overflow wraps modulo 2^N.

Signed overflow is undefined behavior.

Validate arithmetic when size calculations affect memory allocations.

# 125. Check return values

Many C bugs begin by ignoring failure.

```c
FILE *f = fopen(path, "r");
if (f == NULL) {
    ...
}
```

# 126. create/destroy and init/cleanup patterns

Common ownership patterns:

```c
obj = object_create();
...
object_destroy(obj);
```

or:

```c
object_init(&obj);
...
object_cleanup(&obj);
```

Recognizing pairs helps understand lifetime.

# 127. Context objects

A project may pass one structure containing shared state:

```c
struct app_context {
    struct logger *log;
    struct database *db;
    struct config cfg;
};
```

This is preferable to many globals.

# 128. Callback + void *userdata

Classic C pattern:

```c
typedef void (*callback_fn)(void *userdata, int event);
```

The callback gets caller-provided context through `userdata`.

# 129. Casts

```c
double x = (double)count;
```

Casts may be legitimate, but suspicious pointer casts deserve scrutiny.

# 130. void *

`void *` is a generic object pointer.

malloc returns `void *`.

Generic containers and callbacks often use it.

# 131. Flexible array members

```c
struct packet {
    size_t len;
    unsigned char data[];
};
```

Memory is allocated larger than the struct itself.

# 132. container_of

Kernel-style code may compute a parent structure pointer from a member pointer using offsets/macros.

It looks unusual but is a common low-level C technique.

# 133. Things that look scary but are normal

```text
char **argv
void *userdata
function pointers
macro-heavy headers
opaque structs
goto cleanup
manual allocation
bit masks
conditional compilation
```

The key is to trace ownership, lifetime and control flow.

# 134. Completely unfamiliar repository workflow

1. read README,
2. inspect tree,
3. identify build system,
4. inspect dependencies,
5. build unmodified,
6. run tests,
7. find main,
8. identify public headers,
9. map ownership and cleanup.

# 135. Minimal Make workflow

```bash
make
make test
make clean
```

If it fails:

```bash
make V=1
```

# 136. Minimal CMake workflow

```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build -j
ctest --test-dir build --output-on-failure
```

# 137. Sanitizer workflow

```bash
CC=clang CFLAGS="-g -O1 -fsanitize=address,undefined -fno-omit-frame-pointer" make
```

Then run tests/program normally.

# 138. Crash debugging workflow

1. reproduce the crash,
2. build with `-g -O0`,
3. run under GDB,
4. get `bt`,
5. inspect variables,
6. enable ASan,
7. fix,
8. add a regression test.

# 139. Memory bug workflow

1. enable ASan,
2. reproduce,
3. inspect allocation/free stack traces,
4. determine owner,
5. fix lifetime,
6. rerun tests,
7. optionally verify with Valgrind.

# 140. Program “does nothing”

Check:

```bash
echo $?
strace ./app
gdb ./app
```

Look for blocked reads, missing files, waiting sockets and early returns.

# 141. Missing library

Runtime:

```bash
ldd ./app
```

Build-time:

```bash
pkg-config --cflags --libs LIB
```

# 142. undefined reference

Ask:

- is the source file included in the build?
- is the library linked?
- is link order important?
- is feature conditional compilation hiding the symbol?
- do declarations and definitions match?

# 143. header not found

Check:

- package installed?
- development package installed?
- include path?
- generated header?
- wrong build directory?
- missing submodule?

# 144. Useful shell commands for C projects

```bash
find . -maxdepth 2 -type f | sort
rg '#include'
rg 'int main'
rg 'malloc|calloc|realloc|free'
rg 'TODO|FIXME'
file build/app
ldd build/app
nm build/app
```

# 145. Coding standard

Look for:

```text
.clang-format
.clang-tidy
.editorconfig
CONTRIBUTING.md
```

# 146. What you do not need for 80–90% of projects

You do not need to master:

- compiler internals,
- assembly,
- advanced lock-free algorithms,
- linker scripts,
- exotic preprocessor metaprogramming,
- every POSIX function.

# 147. What you should know well

You should be comfortable with:

- structs,
- pointers,
- arrays and strings,
- ownership,
- malloc/free,
- headers,
- build vs link phases,
- Make/CMake basics,
- compiler warnings,
- GDB,
- sanitizers,
- common Unix tools.

# 148. Mini glossary

Compiler — source to object code.

Preprocessor — handles `#include`, macros and conditional compilation.

Object file — compiled translation unit before final linking.

Linker — resolves symbols and creates binaries/libraries.

Header — declarations and macros shared between files.

Symbol — named function or global object visible to linker/debugger.

Shared library — dynamically loaded code, e.g. `.so`.

Static library — archive linked into the final binary.

ABI — binary-level calling/layout conventions.

API — source-level interface.

# 149. Syntax cheat sheet

```c
int x = 1;
const char *name = "Alice";

if (x > 0) {
}

for (int i = 0; i < 10; i++) {
}

struct user {
    int id;
};

struct user *u = malloc(sizeof *u);
if (!u) {
    return 1;
}

free(u);
```

# 150. Pointer cheat sheet

```c
int x = 10;
int *p = &x;

*p = 20;
```

Read:

```text
&p = address
*p = object pointed to
T * = pointer to T
T ** = pointer to pointer to T
```

# 151. Build cheat sheet

```bash
cc -Wall -Wextra -g main.c -o app
cc -c file.c
cc a.o b.o -o app
cc main.c -Iinclude -Llib -lfoo -o app
```

# 152. GDB cheat sheet

```text
break main
run
next
step
continue
print x
bt
frame N
info locals
quit
```

# 153. Diagnostic cheat sheet

```bash
file app
ldd app
nm app
readelf -h app
strace ./app
valgrind ./app
gdb ./app
```

# 154. How to mentally read a C function

Ask:

1. what are the inputs?
2. who owns the inputs?
3. what can be NULL?
4. what gets allocated?
5. what gets freed?
6. what errors can return?
7. what globals/context does it touch?
8. what side effects occur?

# 155. The ownership question

The single most important memory question is:

```text
Who owns this memory?
```

Look for names such as:

```text
create
new
alloc
clone
copy
retain
ref
destroy
free
release
unref
```

# 156. Reference counting

Libraries may use retain/release style ownership:

```text
ref++
use object
ref--
destroy when zero
```

Never mix refcounted ownership with unconditional free unless the API says so.

# 157. Very short map of the C world

```text
source .c
 + headers .h
      ↓ compiler
object files .o
 + libraries
      ↓ linker
binary / shared library
      ↓ runtime
OS / libc / POSIX / external libraries
```

# 158. Final checklist

When cloning an unfamiliar C project:

- read README,
- identify build system,
- install dev dependencies,
- initialize submodules,
- build with warnings,
- run tests,
- find main,
- map public APIs,
- map allocations and frees,
- use GDB/sanitizers for failures.

# 159. Minimum knowledge to remember

If you remember only the essentials:

```text
pointer       = address
*ptr          = pointed value
&value        = address of value
malloc/free   = heap lifetime
.h            = declarations
.c            = implementation
compile       = source → object
link          = objects + libs → binary
-g            = debug symbols
-Wall -Wextra = warnings
ASan/GDB      = first-line debugging tools
```
