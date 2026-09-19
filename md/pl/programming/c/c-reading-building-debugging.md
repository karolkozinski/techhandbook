# C — kompendium do czytania, kompilowania i debugowania projektów

> Cel: nie nauczyć Cię „programować w C od zera”, tylko dać Ci taki poziom orientacji, żebyś po sklonowaniu projektu potrafił:
>
> - rozpoznać strukturę kodu,
> - zrozumieć podstawowe konstrukcje języka,
> - wiedzieć, gdzie program startuje i jak płynie wykonanie,
> - odróżnić deklarację od definicji,
> - zrozumieć pliki `.c` i `.h`,
> - skompilować projekt,
> - rozpoznać Makefile/CMake/Meson,
> - znaleźć błędy kompilacji i linkowania,
> - uruchomić debugger,
> - użyć sanitizerów,
> - znaleźć podstawowe problemy z pamięcią,
> - zorientować się, z jakich bibliotek korzysta program.

---

# 1. C w jednym zdaniu

C jest małym, stosunkowo prostym językiem kompilowanym, który daje programiście bardzo bezpośredni dostęp do pamięci i systemu operacyjnego.

Nie ma w nim wielu rzeczy znanych z języków wyższego poziomu:

- klas,
- garbage collectora,
- wyjątków,
- modułów w stylu JS/Pythona,
- automatycznego zarządzania pamięcią,
- rozbudowanej biblioteki standardowej.

Za to bardzo łatwo zobaczyć, co komputer faktycznie robi.

Typowy przepływ:

```text
kod .c
  ↓
preprocesor
  ↓
kompilator
  ↓
kod obiektowy .o
  ↓
linker
  ↓
program wykonywalny
```

---

# 2. Najprostszy program

```c
#include <stdio.h>

int main(void)
{
    printf("Hello, world!\n");
    return 0;
}
```

Najważniejsze elementy:

```c
#include <stdio.h>
```

dołącza deklaracje funkcji standardowego wejścia/wyjścia.

```c
int main(void)
```

to punkt wejścia programu.

```c
printf(...)
```

wywołuje funkcję.

```c
return 0;
```

oznacza poprawne zakończenie programu.

Kompilacja:

```bash
cc hello.c -o hello
```

Uruchomienie:

```bash
./hello
```

Na Debianie `cc` zwykle wskazuje GCC lub Clang.

Sprawdzenie:

```bash
cc --version
```

Możesz też użyć wprost:

```bash
gcc hello.c -o hello
```

lub:

```bash
clang hello.c -o hello
```

---

# 3. Podstawowe rozszerzenia plików

Najczęściej spotkasz:

```text
main.c
server.c
parser.c
database.c
utils.c
```

Kod źródłowy C.

Nagłówki:

```text
server.h
parser.h
database.h
utils.h
```

Pliki nagłówkowe.

Kod pośredni:

```text
server.o
parser.o
```

Pliki obiektowe.

Biblioteki:

```text
libfoo.a
libfoo.so
```

Linux:

```text
.a   biblioteka statyczna
.so  biblioteka współdzielona
```

FreeBSD również używa `.a` i `.so`.

---

# 4. Z czego składa się typowy projekt

Przykład:

```text
myproject/
├── README.md
├── LICENSE
├── Makefile
├── CMakeLists.txt
├── include/
│   ├── server.h
│   └── parser.h
├── src/
│   ├── main.c
│   ├── server.c
│   └── parser.c
├── tests/
│   └── parser_test.c
└── build/
```

Nie każdy projekt będzie miał wszystko.

Najważniejsze miejsca:

```text
README.md
```

zacznij od niego.

```text
src/
```

kod programu.

```text
include/
```

publiczne nagłówki.

```text
tests/
```

testy.

```text
Makefile
```

instrukcje dla `make`.

```text
CMakeLists.txt
```

konfiguracja CMake.

```text
meson.build
```

projekt wykorzystuje Meson.

```text
configure
```

często projekt oparty na Autotools.

---

# 5. Najważniejsza rzecz: `main()`

W zwykłym programie wykonywalnym szukasz:

```c
int main(...)
```

Najprościej:

```bash
grep -R "int main" .
```

albo:

```bash
rg "main\s*\("
```

jeżeli masz `ripgrep`.

Typowa wersja:

```c
int main(int argc, char **argv)
{
    ...
}
```

Znaczenie:

```c
argc
```

liczba argumentów.

```c
argv
```

tablica argumentów tekstowych.

Dla:

```bash
./app --port 8080
```

możesz mieć:

```text
argc = 3

argv[0] = "./app"
argv[1] = "--port"
argv[2] = "8080"
```

---

# 6. Zmienne

Przykłady:

```c
int age = 46;
float temperature = 21.5f;
double pi = 3.1415926535;
char letter = 'A';
```

Najczęstsze typy:

```text
char
short
int
long
long long

float
double
```

Wartości całkowite bez znaku:

```c
unsigned int count;
```

Typy o określonej szerokości znajdziesz w:

```c
#include <stdint.h>
```

Przykłady:

```c
uint8_t
uint16_t
uint32_t
uint64_t

int8_t
int16_t
int32_t
int64_t
```

W kodzie systemowym są bardzo popularne.

---

# 7. `const`

```c
const int max_users = 100;
```

oznacza:

> tego obiektu nie powinno się zmieniać przez tę nazwę.

Przy wskaźnikach sytuacja robi się ciekawsza:

```c
const char *name;
```

dane tekstowe są traktowane jako tylko do odczytu.

```c
char *const name;
```

sam wskaźnik jest stały.

To ważne podczas czytania API bibliotek.

---

# 8. `sizeof`

Operator:

```c
sizeof
```

zwraca rozmiar obiektu lub typu.

```c
sizeof(int)
sizeof(buffer)
```

Przykład:

```c
printf("%zu\n", sizeof(int));
```

`sizeof` jest bardzo często używany przy zarządzaniu pamięcią:

```c
malloc(sizeof(struct user))
```

---

# 9. Operatory

Podstawowe:

```c
+
-
*
/
%
```

Porównania:

```c
==
!=
<
>
<=
>=
```

Logiczne:

```c
&&
||
!
```

Przypisanie:

```c
=
```

Ważne:

```c
if (a == b)
```

porównanie.

```c
a = b;
```

przypisanie.

Klasyczny błąd:

```c
if (a = b)
```

To jest legalne C.

---

# 10. Instrukcja `if`

```c
if (age >= 18)
{
    printf("adult\n");
}
else
{
    printf("minor\n");
}
```

Możesz spotkać:

```c
if (!ptr)
```

oznacza:

```text
jeżeli ptr jest NULL
```

lub ogólnie:

```text
jeżeli wartość jest równa zero
```

---

# 11. `switch`

```c
switch (command)
{
    case 1:
        start();
        break;

    case 2:
        stop();
        break;

    default:
        show_help();
        break;
}
```

Brak `break` może oznaczać przejście do kolejnego `case`.

Czasami jest celowy.

---

# 12. Pętle

## `for`

```c
for (int i = 0; i < 10; i++)
{
    printf("%d\n", i);
}
```

## `while`

```c
while (running)
{
    process();
}
```

## `do while`

```c
do
{
    read_input();
}
while (running);
```

## nieskończona pętla

Bardzo częsta w serwerach i daemonach:

```c
while (1)
{
    ...
}
```

albo:

```c
for (;;)
{
    ...
}
```

---

# 13. Funkcje

Definicja:

```c
int add(int a, int b)
{
    return a + b;
}
```

Użycie:

```c
int result = add(2, 3);
```

Typ zwracany:

```c
int
```

Nazwa:

```c
add
```

Argumenty:

```c
int a, int b
```

---

# 14. Funkcja nic nie zwracająca

```c
void log_message(const char *message)
{
    printf("%s\n", message);
}
```

`void` oznacza brak wartości zwrotnej.

---

# 15. Deklaracja a definicja

Deklaracja mówi:

> taka funkcja istnieje.

```c
int add(int a, int b);
```

Definicja zawiera kod:

```c
int add(int a, int b)
{
    return a + b;
}
```

To rozróżnienie jest fundamentalne dla C.

---

# 16. Pliki `.h`

Nagłówek może zawierać:

```c
#ifndef USER_H
#define USER_H

struct user
{
    int id;
    const char *name;
};

int user_create(struct user *u);
void user_destroy(struct user *u);

#endif
```

Plik `.c`:

```c
#include "user.h"

int user_create(struct user *u)
{
    ...
}

void user_destroy(struct user *u)
{
    ...
}
```

Nagłówek mówi innym modułom:

> takie typy i funkcje są dostępne.

---

# 17. `#include`

Biblioteka systemowa:

```c
#include <stdio.h>
```

Własny nagłówek:

```c
#include "server.h"
```

Umowna różnica:

```text
<...>   nagłówki systemowe / biblioteki
"..."   pliki projektu
```

---

# 18. Include guards

Klasyczny wzorzec:

```c
#ifndef SERVER_H
#define SERVER_H

...

#endif
```

Chroni przed wielokrotnym dołączeniem tego samego nagłówka.

Możesz też zobaczyć:

```c
#pragma once
```

Jest powszechnie obsługiwane, ale nie należy do klasycznego standardu C.

---

# 19. Preprocesor

Przed właściwą kompilacją działa preprocesor.

Dyrektywy zaczynają się od:

```text
#
```

Najczęstsze:

```c
#include
#define
#if
#ifdef
#ifndef
#endif
```

Przykład:

```c
#define MAX_USERS 100
```

Potem:

```c
int users[MAX_USERS];
```

---

# 20. Warunkowa kompilacja

Bardzo częsta w projektach przenośnych.

```c
#ifdef __linux__
    ...
#endif
```

albo:

```c
#ifdef __FreeBSD__
    ...
#endif
```

Przykład:

```c
#ifdef DEBUG
printf("x=%d\n", x);
#endif
```

Kompilacja:

```bash
cc -DDEBUG app.c -o app
```

Opcja `-DDEBUG` definiuje makro `DEBUG`.

---

# 21. Makra

Przykład:

```c
#define SQUARE(x) ((x) * (x))
```

Użycie:

```c
int y = SQUARE(4);
```

Makro nie jest funkcją.

Preprocesor po prostu manipuluje tekstem kodu.

Dlatego makra mogą być zdradliwe.

---

# 22. `typedef`

Alias typu:

```c
typedef unsigned long ulong;
```

Częściej:

```c
typedef struct user
{
    int id;
    char name[64];
} User;
```

Potem:

```c
User u;
```

zamiast:

```c
struct user u;
```

---

# 23. `struct`

Najważniejsza konstrukcja danych w C.

```c
struct user
{
    int id;
    char name[64];
    int active;
};
```

Tworzenie:

```c
struct user u;
```

Dostęp:

```c
u.id = 1;
u.active = 1;
```

---

# 24. Dostęp przez wskaźnik: `->`

Jeżeli masz:

```c
struct user *u;
```

to używasz:

```c
u->id
u->name
```

To skrót od:

```c
(*u).id
```

To jeden z najważniejszych symboli podczas czytania kodu C.

---

# 25. `enum`

Lista nazwanych wartości:

```c
enum state
{
    STATE_STOPPED,
    STATE_RUNNING,
    STATE_ERROR
};
```

Użycie:

```c
enum state s = STATE_RUNNING;
```

Często stosowany do:

- statusów,
- typów komunikatów,
- rodzajów zdarzeń,
- kodów operacji.

---

# 26. `union`

Kilka interpretacji tego samego obszaru pamięci.

```c
union value
{
    int i;
    float f;
};
```

W danej chwili pamięć zawiera jedną z reprezentacji.

Często spotkasz w:

- protokołach,
- parserach,
- sterownikach,
- kodzie embedded.

---

# 27. Tablice

```c
int numbers[10];
```

Indeksy:

```text
0..9
```

Przykład:

```c
numbers[0] = 42;
```

C nie sprawdza granic tablicy.

To znaczy:

```c
numbers[100] = 42;
```

może uszkodzić pamięć.

---

# 28. Tekst w C

Nie istnieje specjalny typ `string`.

Tekst to tablica `char`.

```c
char name[] = "Karol";
```

W pamięci:

```text
K a r o l \0
```

`'\0'` oznacza koniec tekstu.

---

# 29. Podstawowe funkcje tekstowe

Nagłówek:

```c
#include <string.h>
```

Często spotkasz:

```c
strlen()
strcmp()
strncmp()
strcpy()
strncpy()
memcpy()
memmove()
memset()
```

Przykład:

```c
strlen(name)
```

długość tekstu.

```c
strcmp(a, b)
```

porównanie.

Jeżeli:

```c
strcmp(a, b) == 0
```

teksty są identyczne.

---

# 30. Wskaźniki — rzecz, której trzeba się nauczyć czytać

Wskaźnik przechowuje adres pamięci.

```c
int value = 42;

int *ptr = &value;
```

`&value`

oznacza:

> adres zmiennej `value`.

`ptr`

zawiera ten adres.

`*ptr`

oznacza:

> wartość znajdującą się pod tym adresem.

---

# 31. Przykład wskaźnika

```c
int value = 42;
int *ptr = &value;

printf("%d\n", *ptr);
```

wynik:

```text
42
```

Zmiana:

```c
*ptr = 10;
```

spowoduje:

```c
value == 10
```

---

# 32. Po co są wskaźniki

Między innymi:

- przekazywanie dużych struktur bez kopiowania,
- modyfikowanie argumentów funkcji,
- dynamiczna pamięć,
- tablice,
- struktury danych,
- API systemowe,
- callbacki,
- biblioteki.

---

# 33. `NULL`

Wskaźnik niewskazujący na obiekt.

```c
char *ptr = NULL;
```

Sprawdzenie:

```c
if (ptr == NULL)
```

częściej:

```c
if (!ptr)
```

Jeżeli program spróbuje zrobić:

```c
*ptr
```

gdy `ptr == NULL`, najczęściej zakończy się błędem typu:

```text
Segmentation fault
```

---

# 34. Wskaźnik do wskaźnika

```c
char **argv;
```

oznacza:

```text
wskaźnik do wskaźnika do char
```

W praktyce:

```c
char **argv
```

jest tablicą tekstów przekazywanych do programu.

---

# 35. Funkcje modyfikujące dane przez wskaźnik

```c
void set_value(int *value)
{
    *value = 42;
}
```

Wywołanie:

```c
int x = 0;

set_value(&x);
```

Po funkcji:

```text
x == 42
```

---

# 36. Dynamiczna pamięć

Nagłówek:

```c
#include <stdlib.h>
```

Podstawowe funkcje:

```c
malloc()
calloc()
realloc()
free()
```

Przykład:

```c
int *numbers = malloc(100 * sizeof(int));
```

Po użyciu:

```c
free(numbers);
```

---

# 37. Typowy wzorzec `malloc`

```c
struct user *u = malloc(sizeof(*u));

if (u == NULL)
{
    return -1;
}
```

To:

```c
sizeof(*u)
```

jest często preferowane nad:

```c
sizeof(struct user)
```

bo automatycznie dopasowuje się do typu zmiennej.

---

# 38. Memory leak

Jeżeli:

```c
malloc(...)
```

rezerwuje pamięć, a program nie wykona:

```c
free(...)
```

może powstać wyciek pamięci.

Przykład:

```c
char *buffer = malloc(1024);

/* ... */

return 0;
```

bez:

```c
free(buffer);
```

---

# 39. Use-after-free

Bardzo niebezpieczny błąd:

```c
char *p = malloc(100);

free(p);

p[0] = 'A';
```

Program używa pamięci, która została już zwolniona.

Sanitizery świetnie wykrywają takie problemy.

---

# 40. Stack i heap

Uproszczenie:

## stack

```c
int x;
char buffer[1024];
```

lokalne zmienne.

Żyją zwykle do końca funkcji.

## heap

```c
malloc(...)
```

pamięć dynamiczna.

Żyje aż do:

```c
free(...)
```

---

# 41. Przekazywanie struktur

Przez wartość:

```c
void print_user(struct user u)
```

tworzy kopię.

Przez wskaźnik:

```c
void print_user(const struct user *u)
```

bez kopiowania całej struktury.

To drugie jest bardzo częste.

---

# 42. Funkcyjne wskaźniki

Możesz spotkać coś takiego:

```c
void (*callback)(int);
```

oznacza:

> `callback` jest wskaźnikiem do funkcji przyjmującej `int` i niczego nie zwracającej.

Używane m.in. w:

- callbackach,
- bibliotekach GUI,
- bibliotekach sieciowych,
- event loopach,
- systemach pluginów.

---

# 43. `static`

`static` ma kilka znaczeń.

W pliku `.c`:

```c
static int helper(void)
{
    ...
}
```

oznacza zwykle:

> funkcja jest prywatna dla tego pliku.

To bardzo przydatne podczas czytania projektu.

Jeżeli widzisz:

```c
static void parse_header(...)
```

to funkcja nie jest publicznym API modułu.

---

# 44. `extern`

Deklaruje symbol znajdujący się gdzie indziej.

```c
extern int global_count;
```

Definicja może być w innym pliku:

```c
int global_count = 0;
```

---

# 45. Zmienne globalne

```c
int debug_enabled = 0;
```

Globalne zmienne są dostępne poza funkcjami.

Duże projekty często ograniczają ich używanie.

---

# 46. Kod zwrotny funkcji

W C funkcje często sygnalizują błędy liczbą.

Przykład:

```c
int result = connect_to_server();

if (result != 0)
{
    fprintf(stderr, "connection failed\n");
}
```

Umownie często:

```text
0      sukces
!= 0   błąd
```

ale API może stosować inne zasady.

Zawsze sprawdzaj dokumentację.

---

# 47. `errno`

Wiele funkcji systemowych ustawia:

```c
errno
```

Nagłówki:

```c
#include <errno.h>
#include <string.h>
```

Przykład:

```c
if (open(...) == -1)
{
    fprintf(stderr, "%s\n", strerror(errno));
}
```

Popularne:

```c
perror("open");
```

---

# 48. Standardowe wejście i wyjście

Nagłówek:

```c
#include <stdio.h>
```

Podstawowe strumienie:

```text
stdin
stdout
stderr
```

Wypisywanie:

```c
printf("hello\n");
```

Błędy:

```c
fprintf(stderr, "error\n");
```

---

# 49. Formatowanie `printf`

Przykłady:

```c
printf("%d", number);
printf("%u", unsigned_number);
printf("%ld", long_number);
printf("%f", floating);
printf("%s", text);
printf("%c", character);
printf("%p", pointer);
printf("%zu", size);
```

`printf` jest bardzo ważny przy czytaniu i prostym debugowaniu kodu.

---

# 50. Pliki

```c
FILE *f = fopen("data.txt", "r");

if (!f)
{
    perror("fopen");
    return 1;
}
```

Potem:

```c
fgets(...)
fprintf(...)
fread(...)
fwrite(...)
```

Zamykanie:

```c
fclose(f);
```

---

# 51. Deskryptory plików

Kod systemowy często nie korzysta z `FILE *`, lecz z deskryptorów.

Przykład:

```c
int fd = open(...);
```

`fd` to zwykła liczba.

Typowo:

```text
0 stdin
1 stdout
2 stderr
```

Systemowe funkcje:

```c
open()
read()
write()
close()
```

To POSIX, nie czysty standard C.

---

# 52. C vs POSIX

To bardzo ważne podczas czytania projektu.

Standard C dostarcza język i podstawową bibliotekę.

Linux, BSD i Unix dostarczają POSIX/API systemowe.

Przykłady POSIX:

```c
fork()
exec()
pipe()
socket()
pthread_create()
open()
read()
write()
mmap()
```

Jeśli projekt działa głównie na Linux/FreeBSD, zobaczysz tego dużo.

---

# 53. Najważniejsze biblioteki standardowe

## `stdio.h`

I/O:

```c
printf
fprintf
fopen
fclose
fread
fwrite
```

## `stdlib.h`

m.in.:

```c
malloc
free
exit
atoi
strtol
qsort
```

## `string.h`

```c
strlen
strcmp
memcpy
memset
```

## `stdint.h`

typy:

```c
uint32_t
int64_t
```

## `stdbool.h`

```c
bool
true
false
```

## `ctype.h`

znaki:

```c
isdigit
isalpha
tolower
toupper
```

## `time.h`

czas.

## `errno.h`

obsługa błędów.

## `assert.h`

asercje.

---

# 54. `bool`

Klasyczne C historycznie używało:

```text
0 = false
niezero = true
```

Nowocześniejszy kod często:

```c
#include <stdbool.h>

bool running = true;
```

---

# 55. Asercje

```c
#include <assert.h>

assert(ptr != NULL);
```

Jeżeli warunek jest fałszywy, program zostaje przerwany.

Asercje służą głównie do sprawdzania założeń programisty.

---

# 56. Kompilacja jednego pliku

```bash
cc main.c -o app
```

---

# 57. Kompilacja kilku plików naraz

```bash
cc main.c server.c parser.c -o app
```

---

# 58. Kompilacja etapami

```bash
cc -c main.c
cc -c server.c
cc -c parser.c
```

Powstają:

```text
main.o
server.o
parser.o
```

Linkowanie:

```bash
cc main.o server.o parser.o -o app
```

---

# 59. Co robi `-c`

```bash
cc -c server.c
```

oznacza:

> skompiluj, ale jeszcze nie twórz końcowego programu.

Powstaje:

```text
server.o
```

---

# 60. Najważniejsze flagi kompilatora

Dobry zestaw do czytania/debugowania:

```bash
cc \
  -Wall \
  -Wextra \
  -Wpedantic \
  -g \
  -O0 \
  main.c \
  -o app
```

Znaczenie:

```text
-Wall
```

włącza wiele ostrzeżeń.

```text
-Wextra
```

więcej ostrzeżeń.

```text
-Wpedantic
```

ostrzeżenia dotyczące zgodności ze standardem.

```text
-g
```

informacje dla debuggera.

```text
-O0
```

brak optymalizacji.

---

# 61. Standard języka

Możesz spotkać:

```bash
-std=c99
-std=c11
-std=c17
-std=c23
```

Przykład:

```bash
cc -std=c17 app.c -o app
```

W starszych projektach możesz zobaczyć:

```bash
-std=c89
```

lub:

```bash
-std=c90
```

---

# 62. Optymalizacja

Popularne:

```text
-O0
-O1
-O2
-O3
-Os
-Og
```

Podczas debugowania:

```bash
-O0
```

lub:

```bash
-Og
```

W buildzie produkcyjnym często:

```bash
-O2
```

---

# 63. Include path

Jeżeli nagłówki są w:

```text
include/
```

kompilatorowi można powiedzieć:

```bash
cc -Iinclude src/main.c src/server.c -o app
```

`-I` dodaje katalog z nagłówkami.

---

# 64. Biblioteki

Przykład:

```bash
cc main.c -lm -o app
```

`-lm`

linkuje bibliotekę matematyczną.

Inny przykład:

```bash
cc app.c -lcurl -o app
```

linkowanie libcurl.

---

# 65. `-L` i `-l`

```bash
-L/path/to/lib
```

dodaje katalog bibliotek.

```bash
-lfoo
```

linkuje:

```text
libfoo.so
```

lub:

```text
libfoo.a
```

Przykład:

```bash
cc app.o -L/usr/local/lib -lfoo -o app
```

---

# 66. Kompilacja a linkowanie

To jedno z najważniejszych rozróżnień.

Błąd kompilacji:

```text
syntax error
unknown type name
undeclared identifier
```

oznacza problem z kodem źródłowym.

Błąd linkera:

```text
undefined reference to `foo`
```

oznacza:

> kompilator wie, że funkcja `foo` istnieje, ale linker nie może znaleźć jej implementacji.

---

# 67. Typowy błąd linkera

Masz:

```c
int add(int, int);
```

i wywołujesz:

```c
add(1, 2);
```

ale nie dołączasz pliku zawierającego definicję.

Dostaniesz coś w rodzaju:

```text
undefined reference to `add`
```

Rozwiązaniem może być:

```bash
cc main.c math.c -o app
```

---

# 68. `pkg-config`

Bardzo przydatne przy bibliotekach.

Przykład:

```bash
pkg-config --cflags --libs libcurl
```

Możesz dostać:

```text
-I/usr/include/... -lcurl
```

Kompilacja:

```bash
cc app.c $(pkg-config --cflags --libs libcurl) -o app
```

---

# 69. Make

Najczęściej:

```bash
make
```

Program `make` czyta:

```text
Makefile
```

---

# 70. Prosty Makefile

```make
CC = cc
CFLAGS = -Wall -Wextra -g

app: main.o server.o
	$(CC) main.o server.o -o app

main.o: main.c server.h
	$(CC) $(CFLAGS) -c main.c

server.o: server.c server.h
	$(CC) $(CFLAGS) -c server.c

clean:
	rm -f *.o app
```

Uwaga:

polecenia Makefile tradycyjnie zaczynają się tabulatorem.

---

# 71. Najważniejsze polecenia `make`

```bash
make
```

standardowy build.

```bash
make clean
```

usuwa wynik kompilacji.

```bash
make test
```

jeżeli projekt ma taki target.

```bash
make install
```

instaluje program.

Czasem:

```bash
sudo make install
```

ale lepiej najpierw wiedzieć, gdzie projekt zamierza instalować pliki.

---

# 72. Podejrzenie targetów Makefile

Nie ma jednego obowiązkowego standardu, ale można sprawdzić:

```bash
grep -E '^[a-zA-Z0-9_.-]+:' Makefile
```

albo po prostu:

```bash
less Makefile
```

---

# 73. Równoległa kompilacja

```bash
make -j
```

lub:

```bash
make -j8
```

Kompiluje wiele plików równocześnie.

---

# 74. CMake

CMake nie jest kompilatorem.

Generuje konfigurację buildu.

Projekt ma zwykle:

```text
CMakeLists.txt
```

Typowy workflow:

```bash
cmake -S . -B build
cmake --build build
```

Potem program może znaleźć się np.:

```text
build/app
```

---

# 75. Debug build w CMake

```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
```

Release:

```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build
```

---

# 76. Instalacja projektu CMake

```bash
cmake --install build
```

czasem wymagane są uprawnienia administratora.

---

# 77. Czyszczenie CMake

Najprościej:

```bash
rm -rf build
```

i ponownie:

```bash
cmake -S . -B build
```

To jedna z zalet buildów out-of-source.

---

# 78. Meson

Projekt ma:

```text
meson.build
```

Workflow:

```bash
meson setup build
meson compile -C build
```

Testy:

```bash
meson test -C build
```

---

# 79. Autotools

Starsze projekty często używają:

```text
configure
Makefile.in
Makefile.am
```

Typowa instalacja:

```bash
./configure
make
make check
sudo make install
```

Czasem najpierw:

```bash
./autogen.sh
```

lub:

```bash
autoreconf -fi
```

---

# 80. Jak rozpoznać system budowania

Po sklonowaniu:

```bash
ls -la
```

Szukaj:

```text
Makefile
CMakeLists.txt
meson.build
configure
configure.ac
Makefile.am
build.ninja
```

Najpierw jednak:

```bash
less README.md
```

---

# 81. Pierwsze kroki po `git clone`

Przykład:

```bash
git clone https://github.com/example/project.git
cd project
```

Potem:

```bash
ls -la
```

Następnie:

```bash
less README.md
```

Sprawdź:

```bash
find . -maxdepth 2 -type f | sort | less
```

Potem szukaj:

```bash
rg "main\s*\("
```

Jeśli projekt jest duży:

```bash
tree -L 2
```

---

# 82. Jak czytać obcy projekt C

Dobra kolejność:

```text
1. README
2. plik build systemu
3. main()
4. publiczne nagłówki
5. moduły wywoływane przez main()
6. testy
7. dopiero potem szczegóły implementacji
```

Nie zaczynaj od losowego pliku `.c`.

---

# 83. Publiczne API modułu

Załóżmy:

```text
include/database.h
src/database.c
```

Najpierw czytaj:

```text
database.h
```

Możesz znaleźć:

```c
struct database;

int database_open(struct database **db, const char *path);
void database_close(struct database *db);
int database_query(struct database *db, const char *query);
```

Już z nagłówka rozumiesz dużą część modułu.

---

# 84. Opaque struct

Częsty wzorzec:

```c
struct database;
```

bez pokazania pól.

Implementacja znajduje się w `.c`.

To oznacza:

> użytkownik API może korzystać z typu, ale nie zna jego wewnętrznej struktury.

To odpowiednik ukrywania implementacji.

---

# 85. Przepływ programu

Przy czytaniu:

```c
int main(...)
{
    config_load();
    server_init();
    server_run();
    server_shutdown();
}
```

Nie czytaj od razu każdej funkcji.

Najpierw zbuduj sobie mentalne drzewo:

```text
main
├── config_load
├── server_init
├── server_run
└── server_shutdown
```

Potem schodź poziom niżej.

---

# 86. Wyszukiwanie symbolu

Przydatne:

```bash
rg "server_run"
```

lub:

```bash
grep -R "server_run" .
```

Dzięki temu znajdziesz:

- deklarację,
- definicję,
- wywołania.

---

# 87. `ctags`

Bardzo przydatne w dużym kodzie.

Instalujesz np.:

```bash
sudo apt install universal-ctags
```

Generowanie:

```bash
ctags -R .
```

W Vimie możesz potem skakać do definicji symboli.

To bardzo pasuje do czytania projektów C.

---

# 88. `compile_commands.json`

Nowoczesne projekty C/C++ często generują:

```text
compile_commands.json
```

Zawiera dokładne polecenia kompilacji każdego pliku.

CMake:

```bash
cmake -S . -B build -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
```

Plik:

```text
build/compile_commands.json
```

Jest używany m.in. przez:

- clangd,
- IDE,
- edytory,
- analizatory statyczne.

---

# 89. Debugowanie przez `printf`

Najprostsza metoda:

```c
fprintf(stderr, "x=%d\n", x);
```

Do szybkiego sprawdzania:

- czy kod został wykonany,
- jaka jest wartość zmiennej,
- gdzie program się zatrzymuje.

W poważniejszym debugowaniu użyj GDB lub LLDB.

---

# 90. GDB

Kompilacja:

```bash
cc -g -O0 main.c server.c -o app
```

Uruchom:

```bash
gdb ./app
```

---

# 91. Najważniejsze polecenia GDB

Uruchom program:

```text
run
```

Argumenty:

```text
run --port 8080
```

Breakpoint:

```text
break main
```

lub:

```text
break server_run
```

Kontynuuj:

```text
continue
```

Krok do następnej linii:

```text
next
```

Wejdź do funkcji:

```text
step
```

Wyświetl zmienną:

```text
print variable
```

Przykład:

```text
print user->name
```

---

# 92. Przydatne polecenia GDB

Backtrace:

```text
bt
```

Pokazuje stos wywołań.

Ramka:

```text
frame 2
```

Lokale:

```text
info locals
```

Argumenty funkcji:

```text
info args
```

Breakpointy:

```text
info breakpoints
```

Kasowanie breakpointa:

```text
delete 1
```

Wyjście:

```text
quit
```

---

# 93. Segmentation fault i GDB

Jeżeli program robi:

```text
Segmentation fault
```

uruchom:

```bash
gdb ./app
```

potem:

```text
run
```

Po crashu:

```text
bt
```

Bardzo często od razu zobaczysz miejsce problemu.

---

# 94. Core dump

System może zapisać stan programu po awarii.

Sprawdź:

```bash
ulimit -c
```

Możesz chwilowo włączyć:

```bash
ulimit -c unlimited
```

Potem analizować:

```bash
gdb ./app core
```

Mechanizm przechowywania core dumpów zależy od systemu.

---

# 95. LLDB

Alternatywa dla GDB.

Start:

```bash
lldb ./app
```

Breakpoint:

```text
breakpoint set --name main
```

Uruchomienie:

```text
run
```

Backtrace:

```text
bt
```

LLDB jest mocno związany z toolchainem LLVM/Clang.

---

# 96. Sanitizery

To jedna z najlepszych rzeczy przy debugowaniu C.

AddressSanitizer:

```bash
cc \
  -fsanitize=address \
  -g \
  -O1 \
  main.c \
  -o app
```

Uruchamiasz normalnie:

```bash
./app
```

Może wykryć m.in.:

- buffer overflow,
- use-after-free,
- double free,
- część wycieków pamięci.

---

# 97. UndefinedBehaviorSanitizer

```bash
cc \
  -fsanitize=undefined \
  -g \
  main.c \
  -o app
```

Wykrywa wiele form niezdefiniowanego zachowania.

Można łączyć:

```bash
cc \
  -fsanitize=address,undefined \
  -g \
  -O1 \
  main.c \
  -o app
```

---

# 98. ThreadSanitizer

Dla programów wielowątkowych:

```bash
-fsanitize=thread
```

Pomaga wykrywać wyścigi danych.

Nie należy zwykle łączyć go z AddressSanitizerem w jednym buildzie.

---

# 99. Valgrind

Na systemach, gdzie jest dostępny:

```bash
valgrind ./app
```

Dokładniejsze sprawdzenie pamięci:

```bash
valgrind \
  --leak-check=full \
  --show-leak-kinds=all \
  ./app
```

Sanitizery są zwykle szybsze, ale Valgrind nadal jest bardzo użyteczny.

---

# 100. Statyczna analiza kodu

## Clang

```bash
clang --analyze file.c
```

## cppcheck

```bash
cppcheck src/
```

Przydatne do szybkiego przeglądu projektu.

---

# 101. `clang-format`

Automatyczne formatowanie kodu:

```bash
clang-format file.c
```

Zmiana pliku:

```bash
clang-format -i file.c
```

Projekt może zawierać:

```text
.clang-format
```

z zasadami formatowania.

---

# 102. `clang-tidy`

Bardziej zaawansowana analiza kodu:

```bash
clang-tidy file.c -- ...
```

Najlepiej działa z:

```text
compile_commands.json
```

---

# 103. Biblioteki współdzielone

Sprawdzenie zależności programu w Linux:

```bash
ldd ./app
```

Przykład:

```text
libc.so
libssl.so
libcrypto.so
```

Na FreeBSD:

```bash
ldd ./app
```

również jest dostępne.

---

# 104. Symbole programu

Narzędzie:

```bash
nm
```

Przykład:

```bash
nm ./app
```

Możesz zobaczyć funkcje i symbole znajdujące się w binarce.

---

# 105. `file`

Bardzo użyteczne:

```bash
file ./app
```

Możesz dostać informacje typu:

```text
ELF 64-bit LSB pie executable...
```

---

# 106. `readelf`

Linux:

```bash
readelf -h ./app
```

Pokazuje informacje o formacie ELF.

Symbole:

```bash
readelf -s ./app
```

---

# 107. `objdump`

Przykład:

```bash
objdump -d ./app
```

Pokazuje kod maszynowy/disassembly.

Nie musisz rozumieć assemblera, ale warto wiedzieć, że takie narzędzie istnieje.

---

# 108. Biblioteki statyczne

Tworzenie:

```bash
ar rcs libfoo.a foo.o bar.o
```

Linkowanie:

```bash
cc main.o libfoo.a -o app
```

---

# 109. Biblioteki współdzielone

Na systemach Unix-like spotkasz:

```text
libfoo.so
```

Projekt może je linkować przez:

```bash
-lfoo
```

---

# 110. `pthread`

Wątki POSIX.

Nagłówek:

```c
#include <pthread.h>
```

Kompilacja:

```bash
cc app.c -pthread -o app
```

Typowe konstrukcje:

```c
pthread_create()
pthread_join()
pthread_mutex_lock()
pthread_mutex_unlock()
```

---

# 111. Sieć

Kod sieciowy C często zawiera:

```c
socket()
bind()
listen()
accept()
connect()
send()
recv()
```

Nagłówki zależą od platformy, np.:

```c
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
```

To POSIX/BSD sockets.

---

# 112. Event loop

Serwery i narzędzia sieciowe mogą używać:

Linux:

```text
epoll
```

BSD:

```text
kqueue
```

bardziej przenośnie:

```text
poll
select
```

Biblioteki:

```text
libevent
libev
libuv
```

---

# 113. Popularne biblioteki C, które możesz spotkać

## libcurl

HTTP, FTP i inne protokoły.

## OpenSSL

TLS, kryptografia.

## SQLite

wbudowana baza SQL.

## libxml2

XML.

## jansson

JSON.

## cJSON

lekka obsługa JSON.

## libpng

PNG.

## SDL

gry, multimedia, okna, wejście.

## raylib

prosta biblioteka do gier i grafiki.

## ncurses

interfejsy terminalowe.

## libuv

event loop, async I/O.

---

# 114. `goto`

C ma:

```c
goto
```

Przykład:

```c
if (error)
    goto cleanup;
```

Potem:

```c
cleanup:
    free(buffer);
    fclose(file);
    return -1;
```

W C `goto` bywa używane rozsądnie do obsługi cleanupu.

Nie zakładaj automatycznie, że jest to zły kod.

---

# 115. Typowy wzorzec cleanup

```c
int process(void)
{
    FILE *f = NULL;
    char *buffer = NULL;
    int result = -1;

    f = fopen("file.txt", "r");
    if (!f)
        goto cleanup;

    buffer = malloc(1024);
    if (!buffer)
        goto cleanup;

    result = 0;

cleanup:
    free(buffer);

    if (f)
        fclose(f);

    return result;
}
```

To bardzo typowe C.

---

# 116. Bity

C bardzo często operuje bitami.

Operatory:

```c
&
|
^
~
<<
>>
```

Przykład flag:

```c
#define FLAG_READ   0x01
#define FLAG_WRITE  0x02
#define FLAG_EXEC   0x04
```

Łączenie:

```c
flags = FLAG_READ | FLAG_WRITE;
```

Sprawdzenie:

```c
if (flags & FLAG_WRITE)
{
    ...
}
```

---

# 117. Hexadecimal

W kodzie systemowym często:

```c
0xFF
0x1000
0xDEADBEEF
```

To zapis szesnastkowy.

Bardzo często używany przy:

- bitach,
- protokołach,
- adresach,
- sterownikach,
- maskach.

---

# 118. Endianness

W kodzie sieciowym/systemowym możesz spotkać:

```c
htons()
htonl()
ntohs()
ntohl()
```

Służą do konwersji kolejności bajtów.

Sieć używa określonego porządku bajtów niezależnie od architektury CPU.

---

# 119. `volatile`

Możesz zobaczyć:

```c
volatile int flag;
```

Sugeruje kompilatorowi, że wartość może zmienić się poza normalnym przepływem kodu.

Częste w:

- embedded,
- sterownikach,
- memory-mapped I/O,
- kodzie niskopoziomowym.

`volatile` nie jest zamiennikiem poprawnej synchronizacji wielowątkowej.

---

# 120. Atomics

Nowoczesne C ma:

```c
#include <stdatomic.h>
```

Przykład:

```c
atomic_int counter;
```

W dużych projektach wielowątkowych możesz spotkać atomiki zamiast zwykłych zmiennych.

---

# 121. `inline`

Przykład:

```c
static inline int max(int a, int b)
{
    return a > b ? a : b;
}
```

`inline` jest wskazówką związaną z generowaniem kodu i semantyką funkcji.

Kompilator nie ma obowiązku faktycznie wstawić kodu funkcji inline.

---

# 122. Operator trójargumentowy

```c
condition ? value_if_true : value_if_false
```

Przykład:

```c
int max = a > b ? a : b;
```

---

# 123. Inicjalizatory struktur

```c
struct user u = {
    .id = 1,
    .name = "Karol",
    .active = 1
};
```

Bardzo czytelny sposób tworzenia struktur.

---

# 124. Designated initializers

```c
struct config cfg = {
    .port = 8080,
    .debug = true
};
```

Pola niepodane zwykle otrzymują wartość zerową.

---

# 125. Zero initialization

Popularny wzorzec:

```c
struct config cfg = {0};
```

zeruje całą strukturę.

---

# 126. `memset`

Alternatywa:

```c
memset(&cfg, 0, sizeof(cfg));
```

Często spotykana w starszym kodzie.

---

# 127. Typowe konwencje nazw

Projekt może używać:

```text
snake_case
```

np.:

```c
server_start()
user_create()
```

Makra i stałe:

```text
MAX_USERS
DEFAULT_PORT
```

Typy:

```text
struct user
user_t
User
```

Nie ma jednego obowiązkowego standardu.

---

# 128. Sufiks `_t`

Często:

```c
size_t
uint32_t
pthread_t
```

Projekty też czasem definiują:

```c
typedef struct user user_t;
```

W kodzie przenośnym trzeba uważać, bo część nazw kończących się `_t` może być zarezerwowana przez system.

---

# 129. `size_t`

Typ przeznaczony do reprezentowania rozmiarów.

```c
size_t length;
```

Funkcje takie jak:

```c
strlen()
sizeof
```

używają `size_t`.

Do `printf`:

```c
printf("%zu\n", length);
```

---

# 130. Typowe błędy podczas kompilacji

## `implicit declaration of function`

Przykład:

```text
implicit declaration of function 'foo'
```

Najczęściej brakuje odpowiedniego nagłówka.

## `unknown type name`

Brakuje definicji typu lub include.

## `undeclared identifier`

Zmienna/symbol nie jest widoczny.

## `conflicting types`

Deklaracja i definicja nie zgadzają się.

---

# 131. Typowe błędy linkera

```text
undefined reference
```

Brakuje implementacji lub biblioteki.

```text
multiple definition
```

Ten sam symbol został zdefiniowany więcej niż raz.

---

# 132. Typowe błędy wykonania

```text
Segmentation fault
```

najczęściej nieprawidłowy dostęp do pamięci.

```text
Bus error
```

błędny dostęp do pamięci zależny od architektury/systemu.

```text
Aborted
```

program został przerwany np. przez `abort()` albo nieudaną asercję.

---

# 133. Ostrzeżenia kompilatora są ważne

Nie ignoruj:

```text
warning:
```

W C ostrzeżenie często oznacza prawdziwy błąd.

Dobry projekt powinien kompilować się przynajmniej z:

```bash
-Wall -Wextra
```

bez lawiny ostrzeżeń.

---

# 134. `-Werror`

```bash
-Werror
```

zamienia ostrzeżenia w błędy.

Przydaje się w CI, ale czasami utrudnia kompilację starego projektu nowym kompilatorem.

Jeżeli klonujesz stary projekt i build pada tylko przez warning potraktowany jako error, sprawdź, czy projekt dodaje:

```text
-Werror
```

---

# 135. Debug vs Release

Debug:

```text
-g
-O0 / -Og
assertions
sanitizers
```

Release:

```text
-O2
czasem -DNDEBUG
brak sanitizerów
```

`NDEBUG` wyłącza standardowe `assert()`.

---

# 136. Instalowanie zależności — Debian

Podstawowy toolchain:

```bash
sudo apt update
sudo apt install build-essential
```

Daje m.in.:

```text
gcc
make
libc headers
```

Przydatne dodatkowo:

```bash
sudo apt install \
    clang \
    cmake \
    meson \
    ninja-build \
    gdb \
    valgrind \
    pkg-config \
    universal-ctags \
    cppcheck
```

---

# 137. Instalowanie zależności — FreeBSD

Podstawowy kompilator Clang znajduje się zwykle w systemie bazowym.

Dodatkowe narzędzia:

```bash
pkg install \
    cmake \
    meson \
    ninja \
    gdb \
    pkgconf \
    universal-ctags \
    cppcheck
```

Na FreeBSD odpowiednikiem `pkg-config` może być pakiet:

```text
pkgconf
```

polecenie nadal zwykle działa jako:

```bash
pkg-config
```

---

# 138. `configure`: brak biblioteki

Jeżeli:

```bash
./configure
```

kończy się błędem:

```text
library foo not found
```

zwykle potrzebujesz wersji developerskiej biblioteki.

Debian często:

```text
libfoo-dev
```

Przykład:

```bash
sudo apt install libssl-dev
```

---

# 139. Nagłówki developerskie

Do uruchomienia programu wystarcza czasem biblioteka runtime.

Do kompilacji potrzebne są również:

```text
*.h
```

Dlatego Debian rozdziela pakiety:

```text
libfoo
libfoo-dev
```

---

# 140. Jak znaleźć pakiet zawierający plik na Debianie

Jeżeli masz `apt-file`:

```bash
sudo apt install apt-file
sudo apt-file update
```

Potem:

```bash
apt-file search header.h
```

---

# 141. Jak sprawdzić, czego wymaga projekt

Najpierw:

```bash
cat README.md
```

Potem:

```bash
grep -Ri "depend" .
```

Sprawdź też:

```text
INSTALL
BUILDING
CONTRIBUTING.md
docs/
```

---

# 142. Submodules Git

Po klonowaniu projekt może mieć brakujące katalogi.

Sprawdź:

```bash
git submodule status
```

Pobranie:

```bash
git submodule update --init --recursive
```

Albo klonuj:

```bash
git clone --recursive URL
```

---

# 143. Git branch i build

Sprawdź:

```bash
git status
git branch
git log --oneline -10
```

W dużym projekcie warto wiedzieć, czy jesteś na:

```text
main
master
develop
release/*
```

---

# 144. Generowane pliki

Nie wszystko w projekcie musi być pisane ręcznie.

Możesz spotkać:

```text
generated/
config.h
version.h
parser.c
```

które są generowane podczas buildu.

Nie zakładaj, że każdy plik `.c` należy ręcznie edytować.

---

# 145. `config.h`

Autotools i CMake często generują:

```c
#define HAVE_OPENSSL 1
#define HAVE_EPOLL 1
```

Kod używa potem:

```c
#ifdef HAVE_OPENSSL
...
#endif
```

---

# 146. Biblioteki vendored

Projekt może zawierać:

```text
vendor/
third_party/
deps/
external/
```

czyli kopie kodu zewnętrznych bibliotek.

Podczas czytania projektu zwykle nie zaczynaj od nich.

---

# 147. Testy

Typowe nazwy:

```text
tests/
test/
unit/
```

Uruchamianie może wyglądać:

```bash
make test
```

lub:

```bash
ctest --test-dir build
```

lub:

```bash
meson test -C build
```

---

# 148. CTest

Projekt CMake może używać:

```bash
ctest --test-dir build
```

Więcej informacji:

```bash
ctest --test-dir build --output-on-failure
```

---

# 149. Debugging testu

Jeżeli test jest zwykłym programem:

```bash
gdb ./build/tests/parser_test
```

Możesz debugować test tak samo jak aplikację.

---

# 150. `strace`

Linux.

Pokazuje wywołania systemowe:

```bash
strace ./app
```

Przydatne gdy nie wiesz:

- jaki plik program otwiera,
- z czym się łączy,
- czego szuka,
- dlaczego dostaje `ENOENT`,
- gdzie czeka.

Przykład:

```bash
strace -f ./app
```

`-f` śledzi również procesy potomne.

---

# 151. FreeBSD: `truss`

Na FreeBSD podobną rolę pełni:

```bash
truss ./app
```

---

# 152. `ltrace`

Na Linux może pokazywać wywołania bibliotek:

```bash
ltrace ./app
```

Nie zawsze jest równie użyteczne jak `strace`, ale warto je znać.

---

# 153. `gprof`

Klasyczne profilowanie:

```bash
cc -pg app.c -o app
./app
gprof ./app gmon.out
```

Dziś często używa się nowocześniejszych profilerów, ale możesz spotkać `gprof` w starszych projektach.

---

# 154. `perf`

Linux:

```bash
perf record ./app
perf report
```

Do profilowania wydajności.

Nie musisz znać go na początku, ale warto wiedzieć, co to jest.

---

# 155. Debugowanie wielowątkowe

W GDB:

```text
info threads
```

Zmiana wątku:

```text
thread 2
```

Backtrace wszystkich wątków:

```text
thread apply all bt
```

To bardzo przydatne przy deadlockach.

---

# 156. Deadlock

Przykład problemu:

```text
thread A czeka na mutex B
thread B czeka na mutex A
```

Program „wisi”, ale się nie crashuje.

Przydatne:

```bash
gdb -p PID
```

potem:

```text
thread apply all bt
```

---

# 157. Podłączenie GDB do działającego procesu

Znajdź PID:

```bash
pgrep app
```

Potem:

```bash
gdb -p PID
```

Możesz sprawdzić, gdzie program aktualnie się znajduje.

---

# 158. Procesy potomne

W kodzie Unixowym możesz zobaczyć:

```c
fork()
```

Po `fork()` powstaje nowy proces.

Często potem:

```c
exec(...)
```

zastępuje kod procesu innym programem.

---

# 159. Sygnały

Nagłówek:

```c
#include <signal.h>
```

Przykłady:

```text
SIGINT
SIGTERM
SIGSEGV
SIGPIPE
```

Program może rejestrować handler:

```c
signal(SIGINT, handler);
```

lub korzystać z bardziej zaawansowanego:

```c
sigaction()
```

---

# 160. Daemony

Program działający w tle może:

- odłączyć się od terminala,
- zapisywać PID,
- reagować na sygnały,
- logować do sysloga.

Możesz spotkać:

```c
daemon(...)
```

albo własną implementację daemonizacji.

---

# 161. Logowanie

Popularne warianty:

```c
printf()
fprintf(stderr, ...)
syslog()
```

albo własne:

```c
log_info(...)
log_error(...)
log_debug(...)
```

Jeżeli projekt ma makra:

```c
LOG_DEBUG(...)
LOG_ERROR(...)
```

najpierw znajdź ich definicję.

---

# 162. Systemowe logi

Linux:

```bash
journalctl
```

FreeBSD:

```text
/var/log/
```

Jeżeli program jest uruchamiany jako usługa, jego output niekoniecznie pojawia się w terminalu.

---

# 163. README kontra kod

Jeżeli README mówi:

```bash
make
```

to zacznij od:

```bash
make
```

Nie próbuj ręcznie odtwarzać polecenia `cc`, dopóki nie ma takiej potrzeby.

Build system zna:

- zależności,
- flagi,
- biblioteki,
- generowanie plików,
- konfigurację platformy.

---

# 164. Jak zobaczyć polecenia kompilacji

`make` często pokazuje:

```text
cc -Iinclude -Wall -O2 -c src/main.c -o main.o
```

Jeżeli nie pokazuje, można czasem użyć:

```bash
make V=1
```

lub:

```bash
make VERBOSE=1
```

CMake:

```bash
cmake --build build --verbose
```

Ninja:

```bash
ninja -C build -v
```

To świetny sposób na zrozumienie buildu.

---

# 165. Jak ustawić Clang zamiast GCC w CMake

```bash
CC=clang cmake -S . -B build
```

GCC:

```bash
CC=gcc cmake -S . -B build
```

Najlepiej robić to dla świeżego katalogu `build`.

---

# 166. Jak ustawić flagi

Jednorazowo:

```bash
CFLAGS="-Wall -Wextra -g -O0" make
```

W CMake można np.:

```bash
cmake \
  -S . \
  -B build \
  -DCMAKE_C_FLAGS="-Wall -Wextra -g"
```

Nie zawsze projekt pozwala bezproblemowo nadpisywać flagi.

---

# 167. Debug build z sanitizerami w CMake

Prosty wariant:

```bash
cmake \
  -S . \
  -B build \
  -DCMAKE_BUILD_TYPE=Debug \
  -DCMAKE_C_FLAGS="-fsanitize=address,undefined -fno-omit-frame-pointer"

cmake --build build
```

W dużych projektach mogą istnieć własne opcje sanitizerów.

Sprawdź README i:

```bash
cmake -LH -S . -B build
```

---

# 168. `cmake -L`

Lista opcji:

```bash
cmake -L build
```

Więcej:

```bash
cmake -LAH build
```

Pozwala odkryć opcje projektu.

---

# 169. Feature flags

Projekt może mieć np.:

```bash
-DENABLE_TLS=ON
-DENABLE_TESTS=ON
-DBUILD_SHARED_LIBS=OFF
```

Dlatego warto przejrzeć:

```text
CMakeLists.txt
cmake/
```

---

# 170. Cross compilation

C pozwala łatwo kompilować na inne architektury.

Możesz spotkać kompilatory:

```text
aarch64-linux-gnu-gcc
arm-none-eabi-gcc
x86_64-w64-mingw32-gcc
```

Jeżeli zwykły:

```bash
cc
```

nie działa, sprawdź dokumentację projektu.

---

# 171. Compile-time vs runtime

Błąd compile-time:

```text
kod nie może zostać zbudowany
```

Błąd runtime:

```text
program się buduje, ale pada podczas działania
```

W C to bardzo ważne rozróżnienie.

---

# 172. Undefined behavior

C dopuszcza sytuacje, w których zachowanie programu nie jest zdefiniowane.

Przykład:

```c
int a[10];
a[50] = 1;
```

Albo:

```c
int *p = NULL;
*p = 10;
```

Kompilator nie musi Cię przed tym ochronić.

Dlatego sanitizery są tak ważne.

---

# 173. Buffer overflow

```c
char buffer[8];

strcpy(buffer, "bardzo dlugi tekst");
```

To może nadpisać pamięć poza tablicą.

Właśnie z takich problemów słynie C.

---

# 174. Integer overflow

Dla typów całkowitych mogą wystąpić przepełnienia.

Kod systemowy często sprawdza rozmiary bardzo dokładnie przed:

```c
malloc(count * size)
```

bo samo mnożenie może być problemem.

---

# 175. Return value checking

W C trzeba często sprawdzać wynik funkcji.

Źle:

```c
FILE *f = fopen("file.txt", "r");
fgets(buffer, sizeof(buffer), f);
```

Jeżeli `fopen` zwróci `NULL`, program może się wywrócić.

Poprawny kod sprawdza:

```c
if (!f)
{
    ...
}
```

---

# 176. Wzorzec `*_create` / `*_destroy`

C często naśladuje obiektowość przez funkcje.

```c
struct server *server_create(void);
void server_destroy(struct server *s);

int server_start(struct server *s);
void server_stop(struct server *s);
```

Mentalnie możesz traktować:

```text
struct server
```

jak „obiekt”, a:

```text
server_start()
server_stop()
```

jak „metody”.

---

# 177. Wzorzec `init` / `cleanup`

Inny styl:

```c
struct server s;

server_init(&s);
server_run(&s);
server_cleanup(&s);
```

Nie ma `new` i `delete`.

---

# 178. Context object

W dużych projektach często zobaczysz:

```c
struct context *ctx
```

przekazywany prawie wszędzie.

Może zawierać:

- konfigurację,
- logger,
- połączenia,
- pule pamięci,
- stan aplikacji.

To sposób na ograniczenie globalnych zmiennych.

---

# 179. Callback + `void *userdata`

Bardzo popularny wzorzec:

```c
void callback(void *userdata)
```

`void *` oznacza wskaźnik do nieokreślonego typu.

Biblioteka przekazuje go bez interpretowania.

Twój kod może potem zrobić:

```c
struct app *app = userdata;
```

---

# 180. Rzutowania

```c
(int)value
```

lub:

```c
(struct user *)ptr
```

W C często spotkasz casty wskaźników.

Uwaga: zbyt dużo castów może ukrywać błędy typów.

---

# 181. `void *`

Uniwersalny wskaźnik:

```c
void *ptr;
```

Może wskazywać na obiekt dowolnego typu.

`malloc()` zwraca:

```c
void *
```

W C nie trzeba pisać:

```c
(int *)malloc(...)
```

Wystarczy:

```c
int *p = malloc(...);
```

---

# 182. Flexible array member

Możesz spotkać:

```c
struct packet
{
    size_t length;
    unsigned char data[];
};
```

Tablica na końcu struktury ma rozmiar określany dynamicznie.

Używane w kodzie niskopoziomowym i protokołach.

---

# 183. `container_of`

W dużych projektach systemowych możesz zobaczyć makra obliczające adres struktury na podstawie adresu jej pola.

Linux kernel słynie z:

```text
container_of
```

Nie musisz od razu rozumieć wszystkich szczegółów.

To już zaawansowane C.

---

# 184. Lista rzeczy, które wyglądają groźnie, ale są normalne

```c
char **argv;
```

tablica stringów.

```c
const char *s;
```

wskaźnik do tekstu tylko do odczytu.

```c
struct foo *f;
```

wskaźnik do struktury.

```c
foo->bar
```

pole struktury przez wskaźnik.

```c
(*callback)(...)
```

wskaźnik do funkcji.

```c
void *userdata
```

generyczny kontekst.

```c
#ifdef SOMETHING
```

kompilacja warunkowa.

```c
goto cleanup;
```

często sensowna obsługa cleanupu.

---

# 185. Jak podejść do zupełnie obcego repo

Załóżmy:

```bash
git clone URL
cd projekt
```

## Krok 1

```bash
ls
```

## Krok 2

```bash
less README.md
```

## Krok 3

```bash
tree -L 2
```

## Krok 4

Rozpoznaj build system.

```bash
ls \
  Makefile \
  CMakeLists.txt \
  meson.build \
  configure \
  2>/dev/null
```

## Krok 5

Znajdź `main()`:

```bash
rg "main\s*\("
```

## Krok 6

Zbuduj projekt dokładnie według README.

## Krok 7

Uruchom testy.

## Krok 8

Uruchom program.

## Krok 9

Jeżeli się wywraca — debugger.

---

# 186. Minimalny workflow dla Make

```bash
git clone URL
cd project

less README.md

make

make test

./app
```

Jeżeli potrzebujesz debug:

```bash
make clean

CFLAGS="-g -O0 -Wall -Wextra" make
```

Potem:

```bash
gdb ./app
```

---

# 187. Minimalny workflow dla CMake

```bash
git clone URL
cd project

cmake \
  -S . \
  -B build \
  -DCMAKE_BUILD_TYPE=Debug

cmake --build build
```

Testy:

```bash
ctest \
  --test-dir build \
  --output-on-failure
```

---

# 188. Minimalny workflow z sanitizerami

Dla małego projektu:

```bash
cc \
  -g \
  -O1 \
  -Wall \
  -Wextra \
  -fsanitize=address,undefined \
  *.c \
  -o app
```

Uruchom:

```bash
./app
```

---

# 189. Debugowanie crasha — gotowy schemat

Program:

```bash
./app
```

Crash:

```text
Segmentation fault
```

Kompiluj z debug symbols:

```bash
cc -g -O0 *.c -o app
```

Uruchom:

```bash
gdb ./app
```

W GDB:

```text
run
bt
frame 0
info locals
print variable
```

To powinien być Twój pierwszy odruch.

---

# 190. Debugowanie memory buga — gotowy schemat

Build:

```bash
cc \
  -g \
  -O1 \
  -fsanitize=address,undefined \
  *.c \
  -o app
```

Uruchom:

```bash
./app
```

Jeżeli program ma problem z pamięcią, sanitizer zwykle poda:

- rodzaj błędu,
- adres,
- stack trace,
- linię kodu.

---

# 191. Debugowanie „program nic nie robi”

Linux:

```bash
strace -f ./app
```

Możesz sprawdzić:

- czy czeka na plik,
- czeka na socket,
- szuka konfiguracji,
- dostaje permission denied,
- robi timeout.

FreeBSD:

```bash
truss ./app
```

---

# 192. Debugowanie „brakuje biblioteki”

Uruchomienie:

```text
error while loading shared libraries: libfoo.so...
```

Sprawdź:

```bash
ldd ./app
```

Możesz zobaczyć:

```text
libfoo.so => not found
```

Potem trzeba zainstalować bibliotekę albo poprawić jej ścieżkę.

---

# 193. Debugowanie `undefined reference`

Przykład:

```text
undefined reference to `SSL_CTX_new`
```

To prawdopodobnie problem linkera.

Kod korzysta z OpenSSL, ale build nie linkuje odpowiedniej biblioteki.

Sprawdź polecenie linkowania.

Szukaj np.:

```text
-lssl
-lcrypto
```

---

# 194. Debugowanie „header not found”

Przykład:

```text
fatal error: curl/curl.h: No such file or directory
```

Brakuje nagłówków developerskich.

Na Debianie prawdopodobnie potrzebny będzie pakiet w rodzaju:

```text
libcurl*-dev
```

Nie zgaduj nazwy bez sprawdzenia dokumentacji projektu lub pakietów systemowych.

---

# 195. Przydatne polecenia shellowe do projektu C

Lista plików C:

```bash
find . -name '*.c'
```

Nagłówki:

```bash
find . -name '*.h'
```

Liczba linii:

```bash
find src include \
  \( -name '*.c' -o -name '*.h' \) \
  -print0 |
xargs -0 wc -l
```

Szukaj TODO:

```bash
rg 'TODO|FIXME'
```

Szukaj `malloc`:

```bash
rg 'malloc|calloc|realloc|free'
```

Szukaj socketów:

```bash
rg 'socket|bind|listen|accept|connect'
```

---

# 196. Jak sprawdzić standard kodowania projektu

Szukaj:

```text
.clang-format
.editorconfig
CONTRIBUTING.md
CODING_STYLE
STYLE.md
```

To może wyjaśnić:

- indentację,
- nazwy funkcji,
- długość linii,
- format nawiasów.

---

# 197. Czego nie musisz znać, żeby czytać 80–90% projektów

Na początku nie musisz znać:

- assemblera,
- ABI w szczegółach,
- implementacji linkera,
- ręcznego ELF,
- zaawansowanych makr preprocesora,
- lock-free programming,
- SIMD,
- compiler intrinsics,
- szczegółów C23.

Warto wiedzieć, że istnieją, ale nie są potrzebne do wejścia w większość repozytoriów.

---

# 198. Co trzeba znać naprawdę dobrze

Jeżeli chcesz tylko czytać C, opanuj przede wszystkim:

```text
if / switch
for / while
funkcje
struct
enum
typedef
wskaźniki
&
*
->
NULL
malloc/free
char*
.c / .h
#include
#define
static
const
return codes
```

Do pracy z repozytorium:

```text
cc
gcc / clang
make
cmake
gdb
sanitizery
pkg-config
git
```

---

# 199. Mini słownik

## compiler

kompilator.

Przykłady:

```text
gcc
clang
```

## preprocessor

obsługuje m.in.:

```text
#include
#define
#ifdef
```

## object file

plik `.o`.

## linker

łączy pliki `.o` i biblioteki w program.

## header

plik `.h`.

## symbol

nazwa funkcji lub zmiennej widoczna dla kompilatora/linkera.

## shared library

biblioteka `.so`.

## static library

biblioteka `.a`.

## ABI

zasady współpracy kodu binarnego.

## API

interfejs funkcji i typów dostępnych dla programisty.

---

# 200. Ściąga: składnia

```c
int x = 10;

if (x > 5)
{
    ...
}

for (int i = 0; i < 10; i++)
{
    ...
}

while (running)
{
    ...
}

int add(int a, int b)
{
    return a + b;
}

struct user
{
    int id;
    char name[64];
};

struct user u;

u.id = 1;

struct user *p = &u;

p->id = 2;
```

---

# 201. Ściąga: wskaźniki

```c
int x = 10;

int *p = &x;

*p = 20;
```

Mentalnie:

```text
x
```

wartość.

```text
&x
```

adres `x`.

```text
p
```

adres.

```text
*p
```

wartość pod adresem.

---

# 202. Ściąga: build

Jeden plik:

```bash
cc app.c -o app
```

Debug:

```bash
cc -g -O0 app.c -o app
```

Ostrzeżenia:

```bash
cc -Wall -Wextra app.c -o app
```

Sanitizery:

```bash
cc \
  -g \
  -fsanitize=address,undefined \
  app.c \
  -o app
```

---

# 203. Ściąga: Make

```bash
make
make -j
make test
make clean
```

---

# 204. Ściąga: CMake

```bash
cmake -S . -B build
cmake --build build
ctest --test-dir build
```

Debug:

```bash
cmake \
  -S . \
  -B build \
  -DCMAKE_BUILD_TYPE=Debug
```

---

# 205. Ściąga: GDB

```bash
gdb ./app
```

W debuggerze:

```text
break main
run
next
step
print variable
bt
info locals
continue
quit
```

---

# 206. Ściąga: diagnostyka

Zależności:

```bash
ldd ./app
```

Typ pliku:

```bash
file ./app
```

Symbole:

```bash
nm ./app
```

Linux:

```bash
strace ./app
```

FreeBSD:

```bash
truss ./app
```

Memory debugging:

```bash
valgrind ./app
```

---

# 207. Ściąga: wejście do obcego repo

```bash
git clone URL

cd project

less README.md

tree -L 2

rg "main\s*\("

make
```

albo:

```bash
cmake -S . -B build
cmake --build build
```

Potem:

```bash
make test
```

lub:

```bash
ctest --test-dir build
```

Jeżeli crash:

```bash
gdb ./app
```

Jeżeli problem z pamięcią:

```text
AddressSanitizer
```

Jeżeli program dziwnie korzysta z systemu:

Linux:

```bash
strace
```

FreeBSD:

```bash
truss
```

---

# 208. Jak mentalnie czytać funkcję C

Przykład:

```c
int user_load(struct user *user, const char *path)
{
    FILE *f;

    if (!user || !path)
        return -1;

    f = fopen(path, "r");

    if (!f)
        return -2;

    /* ... */

    fclose(f);

    return 0;
}
```

Czytaj ją tak:

```text
user_load
```

funkcja ładuje użytkownika.

```text
struct user *user
```

dostaje wskaźnik na strukturę, którą może zmienić.

```text
const char *path
```

dostaje tekstową ścieżkę, której nie powinna zmieniać.

```text
if (!user || !path)
```

sprawdza NULL.

```text
fopen
```

otwiera plik.

```text
return -2
```

sygnalizuje konkretny błąd.

```text
fclose
```

sprząta zasób.

```text
return 0
```

sukces.

To właśnie jest sposób czytania C: typy + przepływ + własność zasobów + kody błędów.

---

# 209. Najważniejsze pytania podczas czytania kodu C

Przy każdej funkcji zapytaj:

1. Co przyjmuje?
2. Co zwraca?
3. Czy argument może być `NULL`?
4. Czy funkcja modyfikuje przekazany obiekt?
5. Kto jest właścicielem pamięci?
6. Kto ma wykonać `free()`?
7. Jak sygnalizowany jest błąd?
8. Czy funkcja otwiera zasób?
9. Gdzie ten zasób jest zamykany?
10. Czy funkcja jest publiczna czy `static`?
11. Czy kod zależy od Linux/BSD/POSIX?
12. Czy występuje warunkowa kompilacja?

Jeżeli odpowiesz na te pytania, zwykle rozumiesz większość funkcji.

---

# 210. Najważniejsze pytanie: kto owns the memory?

W C nie ma garbage collectora.

Musisz wiedzieć:

> kto odpowiada za zwolnienie pamięci?

Przykład:

```c
char *get_name(void);
```

Nie wiadomo.

Może:

- zwracać wskaźnik do statycznego bufora,
- zwracać pamięć zaalokowaną przez `malloc`,
- zwracać wskaźnik należący do innego obiektu.

Dokumentacja API powinna to wyjaśnić.

W C własność pamięci jest częścią interfejsu.

---

# 211. Typowe nazwy sugerujące własność

Nie jest to standard, ale często:

```text
create
new
alloc
dup
clone
```

oznaczają, że powstaje nowy obiekt/pamięć.

A:

```text
destroy
free
release
unref
```

zwalniają zasób.

Przykład:

```c
user_create()
user_destroy()
```

---

# 212. Refcount

Duże biblioteki mogą używać liczników referencji.

Typowe funkcje:

```text
ref()
unref()
retain()
release()
```

Obiekt zostanie zwolniony dopiero, gdy licznik referencji spadnie do zera.

---

# 213. Bardzo krótka mapa świata C

Jeżeli widzisz:

```text
.c
.h
```

to kod C.

Jeżeli widzisz:

```text
Makefile
```

najpierw próbujesz:

```bash
make
```

Jeżeli:

```text
CMakeLists.txt
```

próbujesz:

```bash
cmake -S . -B build
cmake --build build
```

Jeżeli:

```text
meson.build
```

próbujesz:

```bash
meson setup build
meson compile -C build
```

Jeżeli crash:

```bash
gdb ./program
```

Jeżeli pamięć:

```text
ASan
UBSan
Valgrind
```

Jeżeli system:

```text
strace / truss
```

Jeżeli nie wiesz, skąd bierze się funkcja:

```bash
rg "nazwa_funkcji"
```

---

# 214. Ostateczna checklista

Po sklonowaniu projektu powinieneś być w stanie odpowiedzieć:

```text
[ ] Co projekt robi?
[ ] Gdzie jest main()?
[ ] Jaki system budowania wykorzystuje?
[ ] Jakie biblioteki są wymagane?
[ ] Jak uruchomić build?
[ ] Jak uruchomić testy?
[ ] Jak uruchomić program?
[ ] Gdzie są publiczne nagłówki?
[ ] Jakie są główne moduły?
[ ] Jak moduły się ze sobą komunikują?
[ ] Gdzie alokowana jest pamięć?
[ ] Gdzie pamięć jest zwalniana?
[ ] Jak sygnalizowane są błędy?
[ ] Czy projekt korzysta z POSIX?
[ ] Czy ma kod zależny od Linux/FreeBSD?
[ ] Jak włączyć debug symbols?
[ ] Jak uruchomić GDB/LLDB?
[ ] Jak uruchomić sanitizery?
[ ] Jak zobaczyć zależności bibliotek?
```

Jeżeli potrafisz przejść tę listę, możesz już całkiem sprawnie poruszać się po większości projektów napisanych w C.

---

# 215. Minimalny zestaw wiedzy do zapamiętania

Nie zapamiętuj całego dokumentu.

Zapamiętaj ten zestaw:

```text
.c        implementacja
.h        deklaracje/API

main()    start programu

struct    struktura danych
enum      zestaw wartości
typedef   alias typu

*         wskaźnik / dereferencja
&         adres
->        pole struktury przez wskaźnik

NULL      brak obiektu

malloc    rezerwacja pamięci
free      zwolnienie pamięci

#include  dołączenie nagłówka
#define   makro

static    często prywatne dla pliku
const     nie modyfikuj

cc/gcc/clang  kompilator
make         klasyczny build
cmake        generator build systemu

gdb          debugger
ASan         błędy pamięci
UBSan        undefined behavior

ldd          biblioteki
strace       system calls Linux
truss        system calls FreeBSD
```

To wystarczy, żeby zacząć czytać prawdziwy kod C bez poczucia, że patrzysz na hieroglify.
