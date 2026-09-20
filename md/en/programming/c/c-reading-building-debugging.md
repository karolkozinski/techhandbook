---
id: "doc-019"
title: "C - Reading, Building and Debugging Projects"
slug: "c-reading-building-and-debugging-projects"
description: "C is a small, compiled systems language that gives you direct control over memory, data layout and operating-system APIs."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "c"
  - "gcc"
  - "clang"
  - "gdb"
---

# C - Reading, Building and Debugging Projects

C remains common in operating systems, libraries, drivers, CLI tools and embedded software. This handbook focuses on reading existing code, building projects and understanding compiler, linker and memory-related failures.

Related topics: [Software Testing](techhandbook:doc-049), [Shell Scripting](techhandbook:doc-031) and [Linux Permissions and Server Security](techhandbook:doc-025).

# 1. C in one sentence
C is a small, compiled systems language that gives you direct control over memory, data layout and operating-system APIs.
# 2. The simplest program
```c
#include <stdio.h>

int main(void) {
    puts("hello");
    return 0;
}
```
# 3. Basic file extensions
Typical files: `.c` source, `.h` headers, `.o` object files, `.a` static libraries and `.so` shared libraries on Unix-like systems.
# 4. What a typical project contains
```text
src/        source files
include/    public headers
tests/      tests
Makefile / CMakeLists.txt / meson.build
README.md   build and usage notes
```
# 5. The most important thing: `main()`
For a normal executable, execution starts in `main`. Common signatures are `int main(void)` and `int main(int argc, char **argv)`.
# 6. Variables
```c
int count = 3;
double price = 9.99;
char letter = 'A';
```
# 7. `const`
`const` expresses that code should not modify a value through that name or pointer.
# 8. `sizeof`
```c
size_t bytes = sizeof(int);
size_t n = sizeof array / sizeof array[0];
```
# 9. Operators
Arithmetic, comparison, logical, bitwise, assignment and pointer operators are all common in C.
# 10. The `if` statement
```c
if (value > 0) {
    puts("positive");
} else {
    puts("not positive");
}
```
# 11. `switch`
```c
switch (state) {
case READY:
    break;
default:
    break;
}
```
# 12. Loops
## `for`
Use when initialization, condition and update naturally belong together.
```c
for (size_t i = 0; i < n; i++) {
    use(items[i]);
}
```
## `while`
Runs while the condition remains true.
## `do while`
Runs the body at least once before checking the condition.
## infinite loop
Common in event loops and daemons; provide an explicit exit or signal path.
# 13. Functions
```c
int add(int a, int b) {
    return a + b;
}
```
# 14. A function returning nothing
```c
void log_message(const char *msg) {
    puts(msg);
}
```
# 15. Declaration vs definition
A declaration tells the compiler that a symbol exists; a definition provides storage or function body.
# 16. `.h` files
Headers normally expose declarations, types, constants and macros shared between translation units.
# 17. `#include`
```c
#include <stdio.h>
#include "project.h"
```
# 18. Include guards
```c
#ifndef PROJECT_H
#define PROJECT_H
/* declarations */
#endif
```
# 19. The preprocessor
The preprocessor handles directives such as `#include`, `#define` and conditional compilation before normal compilation.
# 20. Conditional compilation
```c
#ifdef DEBUG
fprintf(stderr, "debug\n");
#endif
```
# 21. Macros
Macros perform token substitution. Prefer functions or typed constants when they are clearer and safer.
# 22. `typedef`
```c
typedef unsigned long user_id_t;
```
# 23. `struct`
```c
struct user {
    int id;
    const char *name;
};
```
# 24. Pointer member access: `->`
```c
struct user *u = get_user();
printf("%d\n", u->id);
```
# 25. `enum`
```c
enum status { STATUS_OK, STATUS_ERROR };
```
# 26. `union`
A union stores different members in the same memory region. Only the active interpretation is meaningful.
# 27. Arrays
```c
int values[4] = {1,2,3,4};
```
# 28. Text in C
A C string is a sequence of bytes terminated by `\0`. It is not a distinct string object type.
# 29. Basic string functions
Recognize `strlen`, `strcmp`, `strcpy`/`strncpy`, `snprintf`, `strchr`, `strstr` and their safety constraints.
# 30. Pointers - the thing you must learn to read
A pointer stores an address. Read pointer-heavy code by asking what object it points to, whether it may be NULL and who owns that object.
# 31. Pointer example
```c
int value = 10;
int *p = &value;
printf("%d\n", *p);
```
# 32. Why pointers exist
Pointers enable mutation through references, dynamic data structures, buffers, callbacks and interaction with OS/library APIs.
# 33. `NULL`
`NULL` represents a null pointer constant. Check it before dereferencing when an API may return no object.
# 34. Pointer to pointer
```c
char **argv;
struct node **head;
```
# 35. Functions modifying data through pointers
```c
void reset(int *value) {
    *value = 0;
}
```
# 36. Dynamic memory
Heap allocation commonly uses `malloc`, `calloc`, `realloc` and `free`.
# 37. Typical `malloc` pattern
```c
struct user *u = malloc(sizeof *u);
if (u == NULL) {
    return -1;
}
/* use u */
free(u);
```
# 38. Memory leak
Allocated memory that is no longer reachable but was never freed.
# 39. Use-after-free
Accessing memory after it has been freed. This is undefined behavior and a serious security bug class.
# 40. Stack and heap
## stack
Automatic storage tied to scope/function lifetime.
## heap
Dynamically allocated storage controlled explicitly by the program.
# 41. Passing structures
Small structs may be passed by value; larger/mutable objects are often passed by pointer.
# 42. Function pointers
```c
int (*compare)(const void *, const void *);
```
# 43. `static`
At file scope, `static` gives internal linkage. Inside a function, it gives static storage duration.
# 44. `extern`
Declares an object or function defined in another translation unit.
# 45. Global variables
Globals simplify access but create hidden coupling. Keep them limited and well-defined.
# 46. Function return code
Many C APIs return `0` or a value for success and a negative/nonzero code for failure. Always read the API contract.
# 47. `errno`
Some library/system calls set `errno` on failure. Read it only when the called API documents that behavior.
# 48. Standard input and output
Use `stdin`, `stdout`, `stderr` with functions such as `fgets`, `printf`, `fprintf` and `perror`.
# 49. `printf` formatting
Match format specifiers to types. Use `<inttypes.h>` macros for fixed-width integer portability.
# 50. Files
```c
FILE *f = fopen("data.txt", "r");
if (f == NULL) {
    perror("fopen");
    return 1;
}
fclose(f);
```
# 51. File descriptors
POSIX uses integer file descriptors with calls such as `open`, `read`, `write`, `close`.
# 52. C vs POSIX
C defines the language and standard library; POSIX adds Unix APIs such as sockets, processes, pthreads and file descriptors.
# 53. Most important standard headers
## `stdio.h`
Formatted I/O, FILE streams.
## `stdlib.h`
Allocation, conversions, process helpers.
## `string.h`
Byte/string operations.
## `stdint.h`
Fixed-width integer types.
## `stdbool.h`
`bool`, `true`, `false` for pre-C23 codebases.
## `ctype.h`
Character classification/conversion.
## `time.h`
Time/date functions.
## `errno.h`
`errno` and error constants.
## `assert.h`
Debug-time assertions.
# 54. `bool`
```c
#include <stdbool.h>
bool ready = true;
```
# 55. Assertions
```c
#include <assert.h>
assert(ptr != NULL);
```
Assertions are for programmer invariants, not normal user-input validation.
# 56. Compiling one file
```bash
cc -Wall -Wextra -g main.c -o app
```
# 57. Compiling several files at once
```bash
cc -Wall -Wextra main.c util.c net.c -o app
```
# 58. Compiling in stages
```bash
cc -c main.c -o main.o
cc -c util.c -o util.o
cc main.o util.o -o app
```
# 59. What `-c` does
Compiles source to an object file without performing the final link.
# 60. Most important compiler flags
```bash
cc -Wall -Wextra -Wpedantic -g -O0 file.c -o app
```
# 61. Language standard
```bash
cc -std=c17 file.c -o app
cc -std=c23 file.c -o app
```
# 62. Optimization
Typical levels include `-O0`, `-O1`, `-O2`, `-O3`, `-Os`. Debug builds usually favor `-O0` or moderate optimization.
# 63. Include path
```bash
cc -Iinclude main.c -o app
```
# 64. Libraries
Libraries may be static archives or shared objects, and can be linked directly or through build-system discovery.
# 65. `-L` and `-l`
```bash
cc main.c -L/usr/local/lib -lfoo -o app
```
# 66. Compilation vs linking
Compilation turns source into object code; linking resolves symbols and combines objects/libraries into a final binary.
# 67. Typical linker error
`undefined reference` usually means a required definition/object/library was not linked, or library order/configuration is wrong.
# 68. `pkg-config`
```bash
pkg-config --cflags --libs libcurl
```
# 69. Make
Make executes build rules based on targets, prerequisites and recipes.
# 70. Simple Makefile
```text
app: main.o util.o
	$(CC) main.o util.o -o app
```
# 71. Most important `make` commands
```bash
make
make clean
make install
```
# 72. Inspecting Makefile targets
Read the Makefile; `make -n` previews commands without executing them.
# 73. Parallel compilation
```bash
make -j"$(nproc 2>/dev/null || sysctl -n hw.ncpu)"
```
# 74. CMake
```bash
cmake -S . -B build
cmake --build build
```
# 75. Debug build in CMake
```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
```
# 76. Installing a CMake project
```bash
cmake --install build
```
# 77. Cleaning CMake
Removing the out-of-tree build directory is the cleanest full reset for many CMake projects.
# 78. Meson
```bash
meson setup build
meson compile -C build
```
# 79. Autotools
```bash
./configure
make
make check
```
# 80. How to recognize the build system
Look for `Makefile`, `CMakeLists.txt`, `meson.build`, `configure`, `configure.ac`, `Makefile.am` and project documentation.
# 81. First steps after `git clone`
Read README, inspect build files, identify dependencies, build out-of-tree if possible, then run tests before changing code.
# 82. How to read an unfamiliar C project
Start from build files and `main`, then follow headers/APIs, ownership and call flow.
# 83. Public module API
Usually exposed in headers while implementation details remain in `.c` files.
# 84. Opaque struct
```c
typedef struct client client_t;
```
Callers know the type exists but not its fields, preserving encapsulation.
# 85. Program flow
Trace from `main` into initialization, event loop/request handlers and cleanup.
# 86. Searching for a symbol
```bash
rg 'symbol_name' .
grep -Rni 'symbol_name' .
```
# 87. `ctags`
```bash
ctags -R .
```
# 88. `compile_commands.json`
Compilation database used by clangd, static analysis and editors to know exact compiler flags.
# 89. Debugging with `printf`
Still useful for state/timing questions, but remove noisy ad-hoc diagnostics or convert them to structured logging.
# 90. GDB
```bash
gdb ./app
```
# 91. Most important GDB commands
```text
break main
run
next
step
continue
print variable
bt
quit
```
# 92. Useful GDB commands
```text
info locals
info args
watch variable
frame N
thread apply all bt
```
# 93. Segmentation fault and GDB
```bash
gdb ./app
run
bt
```
# 94. Core dump
A core file captures process memory/state at crash time and can be examined with a debugger.
# 95. LLDB
```bash
lldb ./app
```
# 96. Sanitizers
```bash
cc -g -fsanitize=address,undefined -fno-omit-frame-pointer main.c -o app
```
# 97. UndefinedBehaviorSanitizer
UBSan detects many forms of undefined behavior such as invalid shifts and signed overflow.
# 98. ThreadSanitizer
TSan detects many data races in multithreaded programs.
# 99. Valgrind
```bash
valgrind --leak-check=full ./app
```
# 100. Static code analysis
## Clang
Use Clang warnings, scan-build and clang-tidy.
## cppcheck
Lightweight static analyzer useful as an additional check.
# 101. `clang-format`
```bash
clang-format -i src/*.c include/*.h
```
# 102. `clang-tidy`
Performs configurable static analysis/refactoring using compilation information.
# 103. Shared libraries
Dynamically loaded `.so` libraries reduce duplication and allow independent updates but introduce ABI/runtime search concerns.
# 104. Program symbols
Functions/global objects become symbols that linkers/debuggers/loaders may reference.
# 105. `file`
```bash
file ./app
```
# 106. `readelf`
```bash
readelf -h ./app
readelf -Ws ./app
```
# 107. `objdump`
```bash
objdump -d ./app
```
# 108. Static libraries
```bash
ar rcs libfoo.a foo.o bar.o
```
# 109. Shared libraries
```bash
cc -shared -fPIC foo.c -o libfoo.so
```
# 110. `pthread`
POSIX threads provide threads, mutexes, condition variables and related synchronization primitives.
# 111. Networking
POSIX networking commonly uses sockets: `socket`, `bind`, `listen`, `accept`, `connect`, `send`, `recv`.
# 112. Event loop
An event loop waits for I/O/timers/signals and dispatches callbacks, often using `poll`, `select`, `epoll`, `kqueue` or libraries.
# 113. Popular C libraries you may encounter
## libcurl
HTTP and other URL transfers.
## OpenSSL
TLS and cryptography.
## SQLite
embedded SQL database.
## libxml2
XML parsing.
## jansson
JSON library.
## cJSON
small JSON library.
## libpng
PNG image handling.
## SDL
multimedia/game/window/input library.
## raylib
simple game/multimedia library.
## ncurses
terminal UI.
## libuv
cross-platform async I/O/event loop.
# 114. `goto`
Often avoided for general control flow, but a single cleanup path using `goto cleanup` is idiomatic in many C codebases.
# 115. Typical cleanup pattern
```c
int rc = -1;
resource_t *r = acquire();
if (!r) goto cleanup;
/* work */
rc = 0;
cleanup:
release(r);
return rc;
```
# 116. Bits
```c
flags |= FLAG_READ;
flags &= ~FLAG_WRITE;
if (flags & FLAG_READ) { ... }
```
# 117. Hexadecimal
```c
unsigned mask = 0xffu;
```
# 118. Endianness
Byte order matters for binary formats and networking. Do not cast arbitrary buffers and assume host endianness.
# 119. `volatile`
Tells the compiler that a value may change outside ordinary code flow. It is not a thread-synchronization primitive.
# 120. Atomics
C11 `<stdatomic.h>` provides atomic operations and memory-order primitives for lock-free/synchronization code.
# 121. `inline`
A language/linkage hint related to function definitions; the compiler may inline regardless of the keyword.
# 122. Ternary operator
```c
const char *label = ok ? "yes" : "no";
```
# 123. Structure initializers
```c
struct point p = { 1, 2 };
```
# 124. Designated initializers
```c
struct point p = { .y = 2, .x = 1 };
```
# 125. Zero initialization
```c
struct config cfg = {0};
```
# 126. `memset`
```c
memset(buffer, 0, sizeof buffer);
```
Do not assume memset is correct for every semantic initialization of complex objects.
# 127. Typical naming conventions
Projects often use prefixes for modules/types and `_create`, `_destroy`, `_init`, `_free` patterns.
# 128. The `_t` suffix
Common for typedef names, though POSIX reserves many `_t` names for its own types.
# 129. `size_t`
Unsigned type used for object sizes and many library lengths/indexes.
# 130. Common compile errors
## `implicit declaration of function`
The compiler has not seen a declaration/prototype before the call.
## `unknown type name`
Required typedef/header/feature macro is missing.
## `undeclared identifier`
Name is not visible in the current scope.
## `conflicting types`
Declarations/definitions disagree about a symbol's type.
# 131. Common linker errors
`undefined reference` and duplicate-symbol errors point to missing or conflicting definitions at link time.
# 132. Common runtime errors
Segfaults, aborts, assertion failures, leaks, races and corrupted output often stem from invalid memory/lifetime assumptions.
# 133. Compiler warnings matter
Build with strong warnings and fix them rather than normalizing noisy output.
# 134. `-Werror`
Turns warnings into errors. Useful in CI when the warning set/compiler version is controlled.
# 135. Debug vs Release
Debug favors symbols/assertions/sanitizers; Release favors optimization and production settings.
# 136. Installing dependencies - Debian
```bash
sudo apt install build-essential pkg-config cmake ninja-build
```
# 137. Installing dependencies - FreeBSD
```bash
pkg install pkgconf cmake ninja
```
# 138. `configure`: missing library
Read the exact check failure and install the development package/header/library it requests.
# 139. Development headers
On Debian, libraries often have separate `-dev` packages; FreeBSD packages commonly install headers with the package.
# 140. Find the package containing a file on Debian
Use `apt-file search` after installing/updating apt-file, or `dpkg -S` for already-installed files.
# 141. How to check what a project requires
Read README, build files, pkg-config checks, CI workflows and container/package manifests.
# 142. Git submodules
```bash
git submodule update --init --recursive
```
# 143. Git branch and build
Do not reuse stale build artifacts blindly after switching branches with major build-system changes.
# 144. Generated files
Recognize generated sources/configure files and avoid hand-editing unless the project explicitly expects it.
# 145. `config.h`
Often generated by configure/CMake to record detected platform features.
# 146. Vendored libraries
Dependencies copied into the repository. Check version, patches, license and update process.
# 147. Tests
Look for `make test`, `make check`, CTest, Meson test or custom harnesses.
# 148. CTest
```bash
ctest --test-dir build --output-on-failure
```
# 149. Debugging a test
Run the failing test directly under GDB/LLDB or with sanitizer options.
# 150. `strace`
```bash
strace -f ./app
```
# 151. FreeBSD: `truss`
```bash
truss ./app
```
# 152. `ltrace`
On systems where available, traces dynamic-library calls.
# 153. `gprof`
Traditional compiler-instrumentation profiler; recognize it in older projects.
# 154. `perf`
Linux performance tooling for CPU sampling, counters and profiling.
# 155. Multithreaded debugging
Inspect all threads, locks, waits and shared state; use TSan when practical.
# 156. Deadlock
Occurs when threads wait in a cycle for locks/resources that can never become available.
# 157. Attach GDB to a running process
```bash
gdb -p PID
```
# 158. Child processes
POSIX code may use `fork`, `exec`, pipes and `waitpid`.
# 159. Signals
Asynchronous process notifications such as SIGTERM and SIGINT. Signal handlers must use only async-signal-safe operations.
# 160. Daemons
Long-running background services need lifecycle, logging, privileges, signals and supervision.
# 161. Logging
Prefer structured levels/context and avoid leaking secrets.
# 162. System logs
On Linux services may log to journald/syslog; on FreeBSD commonly syslog/files under `/var/log`.
# 163. README vs code
README explains intended build/use; code and build scripts reveal the actual behavior. Check both.
# 164. How to see compilation commands
```bash
make V=1
ninja -v
cmake --build build --verbose
```
# 165. Set Clang instead of GCC in CMake
```bash
CC=clang cmake -S . -B build
```
# 166. How to set flags
Prefer build-system options/toolchain configuration over globally editing source files.
# 167. Debug build with sanitizers in CMake
```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug -DCMAKE_C_FLAGS='-fsanitize=address,undefined -fno-omit-frame-pointer'
```
# 168. `cmake -L`
```bash
cmake -L build
```
# 169. Feature flags
Build-time options enable/disable optional components and platform capabilities.
# 170. Cross compilation
Build for another target using a cross compiler/toolchain file and target sysroot/libraries.
# 171. Compile-time vs runtime
Compile-time decisions affect generated binary; runtime decisions depend on input/config/environment.
# 172. Undefined behavior
Behavior not defined by the C standard; the compiler may optimize under the assumption it never occurs.
# 173. Buffer overflow
Writing past an object's bounds can corrupt memory and become a security vulnerability.
# 174. Integer overflow
Unsigned overflow wraps; signed overflow is undefined behavior in standard C.
# 175. Checking return values
Always check APIs where failure matters: allocation, file/network I/O, parsing and system calls.
# 176. The `*_create` / `*_destroy` pattern
Signals ownership: create allocates/returns a resource; destroy releases it.
# 177. The `init` / `cleanup` pattern
Often initializes caller-owned storage and later releases contained resources.
# 178. Context object
A struct that groups subsystem state/config/dependencies and is passed through APIs instead of globals.
# 179. Callback + `void *userdata`
```c
typedef void (*callback_fn)(int event, void *userdata);
```
Common C pattern for generic callbacks with caller-owned context.
# 180. Casts
Casts can document intentional conversion but can also hide type errors. Avoid unnecessary casts.
# 181. `void *`
Generic object pointer type used by allocators, callbacks and generic containers.
# 182. Flexible array member
```c
struct packet {
    size_t len;
    unsigned char data[];
};
```
# 183. `container_of`
Macro technique used to recover a containing struct from a member pointer; common in kernels/low-level libraries.
# 184. Things that look scary but are normal
Pointers, double pointers, bit masks, callbacks, macros, opaque structs and cleanup gotos are common once you know the local ownership rules.
# 185. How to approach a completely unfamiliar repository
## Step 1
Read README and build instructions.
## Step 2
Identify the build system and dependencies.
## Step 3
Build the unmodified project.
## Step 4
Run tests.
## Step 5
Find executable entry points.
## Step 6
Read public headers/APIs.
## Step 7
Trace one feature from caller to implementation.
## Step 8
Inspect ownership and error paths.
## Step 9
Use debugger/search tools only after you know the structure.
# 186. Minimal workflow for Make
```bash
make clean
make -j4
make test
```
# 187. Minimal workflow for CMake
```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build -j4
ctest --test-dir build --output-on-failure
```
# 188. Minimal sanitizer workflow
```bash
CC=clang CFLAGS='-g -O1 -fsanitize=address,undefined -fno-omit-frame-pointer' make
```
# 189. Crash debugging - ready-made pattern
Reproduce → capture exact input/version → run under debugger/sanitizer → get backtrace → inspect faulting frame and ownership.
# 190. Memory bug debugging - ready-made pattern
Build with ASan/UBSan or Valgrind, reproduce, inspect allocation/free stack traces, then add a regression test.
# 191. Debugging “program does nothing”
Check exit status, stdout/stderr, logs, blocking syscalls, expected inputs and whether you are running the correct binary.
# 192. Debugging “missing library”
Inspect linker/runtime-loader error, pkg-config output, library search paths and package installation.
# 193. Debugging `undefined reference`
Find the symbol definition and make sure its object/library is linked in the correct order/configuration.
# 194. Debugging “header not found”
Verify dependency development headers and compiler include paths (`-I`, pkg-config, build config).
# 195. Useful shell commands for a C project
```bash
rg 'main\(' .
find . -maxdepth 2 -type f | sort
file build/app
ldd build/app 2>/dev/null || true
```
# 196. How to check the project's coding standard
Look for `.clang-format`, `.clang-tidy`, CONTRIBUTING, CI lint jobs and formatting scripts.
# 197. What you do not need to know to read 80-90% of projects
You usually do not need compiler internals, linker-script mastery, exotic atomics or advanced macro metaprogramming.
# 198. What you really need to know well
Pointers/lifetimes, structs, functions, headers, build/linking, error handling, memory ownership and debugger basics.
# 199. Mini glossary
## compiler
Translates source into machine/object code.
## preprocessor
Processes `#` directives before compilation.
## object file
Compiled but not fully linked machine code.
## linker
Resolves symbols and produces binaries/libraries.
## header
Declarations and shared definitions.
## symbol
Named function/object visible to compiler/linker/debugger.
## shared library
Runtime-loadable library.
## static library
Archive copied into link output.
## ABI
Binary calling/data-layout contract.
## API
Source-level interface contract.
# 200. Cheat sheet: syntax
```text
int x = 1;
if (x) { }
for (...) { }
return 0;
```
# 201. Cheat sheet: pointers
```text
&x address
*p dereference
T * pointer to T
T ** pointer to pointer
-> member through pointer
```
# 202. Cheat sheet: build
```bash
cc -Wall -Wextra -g main.c -o app
```
# 203. Cheat sheet: Make
```bash
make
make -j4
make clean
make test
```
# 204. Cheat sheet: CMake
```bash
cmake -S . -B build
cmake --build build
ctest --test-dir build
```
# 205. Cheat sheet: GDB
```text
break
run
next
step
continue
print
bt
```
# 206. Cheat sheet: diagnostics
```text
compiler warnings
ASan/UBSan
Valgrind
GDB/LLDB
strace/truss
logs
```
# 207. Cheat sheet: entering an unfamiliar repo
```text
README → build files → build → tests → main → headers → ownership → one feature flow
```
# 208. How to mentally read a C function
Identify inputs, outputs, nullable pointers, allocations, ownership transfers, error exits and cleanup.
# 209. Most important questions when reading C code
What can be NULL? Who allocates? Who frees? What is the lifetime? What does each return code mean? Can lengths overflow?
# 210. Most important question: who owns the memory?
Ownership determines who may mutate/free data and how long pointers remain valid.
# 211. Names that suggest ownership
Words such as `new`, `create`, `alloc`, `dup`, `copy`, `free`, `destroy`, `release`, `borrow`, `ref`, `unref` often reveal lifetime conventions.
# 212. Refcount
Reference counting keeps an object alive while its count is nonzero. Every retained reference must eventually be released.
# 213. Very short map of the C world
```text
source/header → compiler → object files → linker → binary
runtime: stack + heap + OS/lib APIs
debug: warnings + sanitizers + debugger + tracing
```
# 214. Final checklist
Build cleanly, run tests, understand entry point, know ownership, check warnings, reproduce failures, use sanitizers/debugger, review cleanup/error paths.
# 215. Minimum knowledge to remember
Pointers and lifetimes, structs, headers, compilation/linking, Make/CMake, return-value checking, sanitizers and GDB are enough to understand most everyday C projects.

## Official references

- GCC documentation: https://gcc.gnu.org/onlinedocs/
- Clang documentation: https://clang.llvm.org/docs/
- CMake documentation: https://cmake.org/documentation/
- GDB documentation: https://sourceware.org/gdb/documentation/
