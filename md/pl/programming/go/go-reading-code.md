---
id: "doc-020"
title: "Go - czytanie kodu"
slug: "go-czytanie-kodu"
description: "Cel tego materiału: po przeczytaniu nie musisz umieć samodzielnie projektować dużych aplikacji w Go. Masz natomiast rozumieć, co robi kod, jak jest…"
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-25"
tags:
  - "go"
  - "golang"
---

# Go - czytanie kodu

Go jest małym językiem o silnych konwencjach i rozbudowanym toolchainie. Najwygodniej czytać projekt od `go.mod` i `main()`, a potem śledzić przepływ danych przez struktury, interfejsy, funkcje i błędy.

Materiał obejmuje Go 1.27.x, w tym generic methods wprowadzone w Go 1.27.

Powiązane tematy: [API i integracje systemów](techhandbook:doc-008), [SQL i PostgreSQL dla developera](techhandbook:doc-010), [Testowanie oprogramowania](techhandbook:doc-049) oraz [Docker](techhandbook:doc-012).

> Cel tego materiału: po przeczytaniu nie musisz umieć samodzielnie projektować dużych aplikacji w Go. Masz natomiast rozumieć, **co robi kod, jak jest zbudowany, gdzie czego szukać i jak go uruchomić, skompilować oraz przetestować**.
>
> Materiał jest pisany pod współczesne Go 1.27.x i typowe projekty backendowe, narzędziowe oraz proste gry 2D.

---

## `package main`

Każdy plik `.go` należy do jakiegoś pakietu.

```go
package main
```

oznacza, że ten kod jest częścią programu wykonywalnego.

## `import "fmt"`

Importujemy pakiet standardowej biblioteki:

```go
import "fmt"
```

`fmt` odpowiada za formatowanie i wypisywanie tekstu.

## `func main()`

Program wykonywalny zaczyna pracę od:

```go
func main()
```

Musi ona znajdować się w pakiecie `main`.

Uruchomienie:

```bash
go run .
```

Kompilacja:

```bash
go build
```

Po `go build` otrzymujesz binarkę.

---

# 4. Składnia - najważniejsze reguły

## Bloki kodu

Go używa `{}`:

```go
if x > 10 {
    fmt.Println("duże")
}
```

Styl nawiasów nie jest dowolny. To jest prawidłowe:

```go
if x > 10 {
}
```

A to nie:

```go
if x > 10
{
}
```

## Średniki

Teoretycznie język posiada średniki, ale praktycznie ich nie piszesz:

```go
x := 10
y := 20
```

Lexer wstawia je automatycznie.

## Komentarze

Jedna linia:

```go
// komentarz
```

Wiele linii:

```go
/*
komentarz
wieloliniowy
*/
```

Komentarz dokumentujący eksportowaną funkcję zwykle zaczyna się od jej nazwy:

```go
// LoadUser loads a user from storage.
func LoadUser() {}
```

## Nazwy

Typowo:

```go
userName
requestID
httpClient
```

Nie:

```go
user_name
request_id
```

Go preferuje camelCase.

---

# 5. Zmienne, stałe i zero values

## Pełna deklaracja

```go
var age int
```

`age` automatycznie dostaje wartość zerową:

```text
0
```

Można od razu przypisać:

```go
var age int = 46
```

Kompilator potrafi wywnioskować typ:

```go
var age = 46
```

## Krótka deklaracja `:=`

Najczęściej spotykana forma wewnątrz funkcji:

```go
age := 46
name := "Anna"
```

`:=` oznacza:

> utwórz nową zmienną i wywnioskuj jej typ.

Późniejsze przypisanie używa już zwykłego `=`:

```go
age = 47
```

## Kilka wartości

```go
name, age := "Anna", 30
```

## Stałe

```go
const MaxUsers = 100
const AppName = "Web Monitor"
```

Możliwe są grupy:

```go
const (
    StatusNew    = "new"
    StatusActive = "active"
    StatusClosed = "closed"
)
```

## Zero values

To bardzo ważna cecha Go.

Zmienne mają sensowną wartość początkową nawet bez jawnego przypisania.

| Typ | zero value |
|---|---|
| `int` | `0` |
| `float64` | `0` |
| `bool` | `false` |
| `string` | `""` |
| pointer | `nil` |
| slice | `nil` |
| map | `nil` |
| channel | `nil` |
| function | `nil` |
| interface | `nil` |

Przykład:

```go
var enabled bool
fmt.Println(enabled)
```

wynik:

```text
false
```

---

# 6. Podstawowe typy danych

## Liczby całkowite

Najczęściej:

```go
int
int64
uint
uint64
```

Istnieją też:

```go
int8
int16
int32
uint8
uint16
uint32
```

`int` ma rozmiar zależny od architektury - w praktyce na współczesnych systemach 64-bitowych najczęściej 64 bity.

## Liczby zmiennoprzecinkowe

```go
float32
float64
```

Najczęściej używa się:

```go
float64
```

## Boolean

```go
bool
```

Wartości:

```go
true
false
```

Go nie konwertuje automatycznie liczby na bool.

Nie ma czegoś w rodzaju:

```go
if 1 {
}
```

## Aliasy znakowe

```go
byte
```

to alias `uint8`.

```go
rune
```

to alias `int32`, zwykle oznaczający kod Unicode.

## Typy nazwane

Można stworzyć własny typ:

```go
type UserID int64
```

Teraz `UserID` nie jest dokładnie tym samym typem co zwykły `int64`.

To pozwala kompilatorowi wyłapywać pomyłki.

---

# 7. String, byte i rune

String:

```go
name := "Anna"
```

String w Go jest niezmienny.

Nie możesz zrobić:

```go
name[0] = 'M'
```

## UTF-8

Go bardzo mocno opiera się na UTF-8.

String jest ciągiem bajtów.

```go
s := "żółw"
```

`len(s)` zwraca liczbę **bajtów**, a nie znaków Unicode.

Iterowanie:

```go
for i, r := range s {
    fmt.Println(i, r)
}
```

`r` jest typu `rune`.

Konwersja do bajtów:

```go
b := []byte(s)
```

Konwersja do rune:

```go
r := []rune(s)
```

To ważne przy:

- tekstach z polskimi znakami,
- obcinaniu napisów,
- liczeniu znaków,
- analizie tekstu.

---

# 8. Tablice, slice i mapy

## Tablica

```go
var numbers [3]int
```

Ma dokładnie trzy elementy.

```go
numbers := [3]int{10, 20, 30}
```

Rozmiar jest częścią typu.

`[3]int` i `[4]int` to dwa różne typy.

W praktyce częściej spotkasz slice.

---

## Slice

```go
numbers := []int{10, 20, 30}
```

To jeden z najważniejszych typów w Go.

Można myśleć o nim jako o dynamicznym widoku na tablicę.

Dodawanie:

```go
numbers = append(numbers, 40)
```

Fragment:

```go
part := numbers[1:3]
```

Element:

```go
x := numbers[0]
```

Długość:

```go
len(numbers)
```

Pojemność:

```go
cap(numbers)
```

Tworzenie:

```go
numbers := make([]int, 0, 100)
```

Znaczy:

- długość `0`,
- miejsce zarezerwowane na około `100` elementów.

### Ważne

Slice może współdzielić pamięć z innym slice.

```go
a := []int{1, 2, 3, 4}
b := a[1:3]
b[0] = 99
```

Po zmianie `b` zmieni się również `a`.

---

## Map

Mapa to kolekcja klucz → wartość.

```go
ages := map[string]int{
    "Anna": 30,
    "Anna": 40,
}
```

Odczyt:

```go
age := ages["Anna"]
```

Zapis:

```go
ages["Jan"] = 30
```

Usuwanie:

```go
delete(ages, "Jan")
```

Sprawdzenie, czy klucz istnieje:

```go
age, ok := ages["Anna"]
if ok {
    fmt.Println(age)
}
```

To bardzo typowy idiom Go.

Tworzenie pustej mapy:

```go
ages := make(map[string]int)
```

Uwaga:

```go
var ages map[string]int
```

tworzy mapę `nil`.

Można z niej czytać, ale zapis spowoduje panic.

---

# 9. Struct - podstawowy budulec danych

Go nie ma klas w klasycznym znaczeniu.

Zamiast tego bardzo często używa się struktur:

```go
type User struct {
    ID    int64
    Name  string
    Email string
}
```

Tworzenie:

```go
u := User{
    ID:    1,
    Name:  "Anna",
    Email: "user@example.com",
}
```

Dostęp:

```go
fmt.Println(u.Name)
```

Zmiana:

```go
u.Name = "Anna K."
```

## Zagnieżdżenie

```go
type Address struct {
    City string
}

type User struct {
    Name    string
    Address Address
}
```

## Embedding

Można osadzić typ bez nazwy pola:

```go
type Timestamps struct {
    CreatedAt time.Time
    UpdatedAt time.Time
}

type User struct {
    ID int64
    Timestamps
}
```

Wtedy:

```go
user.CreatedAt
```

zamiast:

```go
user.Timestamps.CreatedAt
```

Embedding jest jednym ze sposobów kompozycji w Go.

---

# 10. Wskaźniki

Wskaźnik przechowuje adres wartości.

```go
x := 10
p := &x
```

`p` ma typ:

```go
*int
```

Odczyt wartości spod wskaźnika:

```go
fmt.Println(*p)
```

Zmiana:

```go
*p = 20
```

Teraz:

```go
x == 20
```

## Po co wskaźniki?

Najczęściej:

1. aby funkcja lub metoda mogła zmienić obiekt,
2. aby nie kopiować dużych struktur,
3. aby `nil` mógł oznaczać brak wartości.

Przykład:

```go
func rename(u *User) {
    u.Name = "Nowa nazwa"
}
```

Go automatycznie upraszcza wiele operacji na pointerach do structów, więc zwykle piszesz:

```go
u.Name
```

a nie:

```go
(*u).Name
```

## `nil`

```go
var u *User
```

`u == nil`.

Próba:

```go
fmt.Println(u.Name)
```

spowoduje panic.

---

# 11. Instrukcje sterujące

## `if`

```go
if age >= 18 {
    fmt.Println("pełnoletni")
}
```

Nie ma nawiasów wokół warunku.

Możliwa jest inicjalizacja:

```go
if err := doSomething(); err != nil {
    return err
}
```

`err` istnieje tylko w obrębie tego `if`.

---

## `else`

```go
if x > 0 {
    fmt.Println("plus")
} else if x < 0 {
    fmt.Println("minus")
} else {
    fmt.Println("zero")
}
```

---

## `switch`

```go
switch status {
case "new":
    fmt.Println("nowy")
case "done":
    fmt.Println("gotowy")
default:
    fmt.Println("nieznany")
}
```

Nie trzeba `break`.

Go automatycznie kończy dany `case`.

Istnieje `fallthrough`, ale jest używany rzadko.

---

## `for`

Go ma tylko jedną konstrukcję pętli: `for`.

Klasycznie:

```go
for i := 0; i < 10; i++ {
    fmt.Println(i)
}
```

Jak `while`:

```go
for running {
}
```

Nieskończona:

```go
for {
}
```

Po kolekcji:

```go
for i, value := range values {
    fmt.Println(i, value)
}
```

Jeśli indeks niepotrzebny:

```go
for _, value := range values {
    fmt.Println(value)
}
```

`_` oznacza:

> wartość świadomie ignorowana.

W nowoczesnym Go możesz też zobaczyć:

```go
for i := range 10 {
    fmt.Println(i)
}
```

co iteruje po liczbach `0..9`.

---

# 12. Funkcje

Prosta funkcja:

```go
func add(a int, b int) int {
    return a + b
}
```

Skrót:

```go
func add(a, b int) int {
    return a + b
}
```

## Kilka wartości zwracanych

Bardzo częste:

```go
func loadUser(id int64) (User, error) {
    // ...
}
```

Wywołanie:

```go
user, err := loadUser(10)
```

## Nazwane wartości zwracane

Możliwe:

```go
func split() (left int, right int) {
    left = 10
    right = 20
    return
}
```

Nie należy ich nadużywać, ale w kodzie występują.

## Funkcja jako wartość

```go
handler := func(name string) {
    fmt.Println(name)
}

handler("Anna")
```

## Funkcja jako argument

```go
func run(fn func()) {
    fn()
}
```

## Funkcja jako wynik

```go
func makeGreeter(prefix string) func(string) string {
    return func(name string) string {
        return prefix + name
    }
}
```

## Variadic

```go
func sum(values ...int) int {
    total := 0
    for _, v := range values {
        total += v
    }
    return total
}
```

Wywołanie:

```go
sum(1, 2, 3, 4)
```

Slice można rozwinąć:

```go
values := []int{1, 2, 3}
sum(values...)
```

---

# 13. Metody i receivery

Metoda to funkcja przypięta do typu.

```go
type User struct {
    Name string
}

func (u User) Greeting() string {
    return "Cześć " + u.Name
}
```

`(u User)` to **receiver**.

Wywołanie:

```go
user.Greeting()
```

## Value receiver

```go
func (u User) NameUpper() string
```

Metoda dostaje kopię wartości.

## Pointer receiver

```go
func (u *User) Rename(name string) {
    u.Name = name
}
```

Może zmodyfikować oryginalny obiekt.

W praktyce często typ ma większość metod z receiverem pointerowym:

```go
func (s *Server) Start() error
func (s *Server) Stop() error
```

Czytając kod:

```go
func (p *Promo) Validate() error
```

czytaj to jako:

> metoda `Validate` działająca na obiekcie `Promo`.

---

# 14. Interfejsy

Interfejs opisuje zachowanie.

```go
type Writer interface {
    Write([]byte) (int, error)
}
```

Każdy typ posiadający metodę:

```go
Write([]byte) (int, error)
```

automatycznie implementuje `Writer`.

Nie ma:

```text
implements Writer
```

To bardzo ważne dla czytania Go.

## Przykład

```go
type Storage interface {
    Save(User) error
    Load(int64) (User, error)
}
```

Potem:

```go
type Service struct {
    storage Storage
}
```

`Service` nie musi wiedzieć, czy `Storage` jest:

- PostgreSQL,
- SQLite,
- pamięcią RAM,
- mockiem testowym.

## Pusty interfejs

Dawniej często:

```go
interface{}
```

Współcześnie preferowany alias:

```go
any
```

Przykład:

```go
var value any
```

`any` może przechowywać wartość dowolnego typu.

## Type assertion

```go
s, ok := value.(string)
```

Sprawdza, czy `value` zawiera string.

## Type switch

```go
switch v := value.(type) {
case string:
    fmt.Println("string", v)
case int:
    fmt.Println("int", v)
default:
    fmt.Println("coś innego")
}
```

---

# 15. Generics

Generics pozwalają pisać kod działający z wieloma typami.

Najprostszy przykład:

```go
func First[T any](values []T) T {
    return values[0]
}
```

`T` jest parametrem typu.

Wywołanie:

```go
x := First([]int{10, 20})
y := First([]string{"a", "b"})
```

Kompilator zwykle sam wywnioskuje typ.

## Constraints

```go
type Number interface {
    ~int | ~int64 | ~float64
}

func Add[T Number](a, b T) T {
    return a + b
}
```

Znak `~` oznacza w przybliżeniu:

> również typy zdefiniowane na bazie danego typu.

Przykład:

```go
type UserID int64
```

pasuje do `~int64`.

## Typ generyczny

```go
type Box[T any] struct {
    Value T
}
```

Użycie:

```go
b := Box[string]{Value: "hello"}
```

## Generyczne metody

W Go 1.27 możesz spotkać również metody deklarujące własne parametry typu.

Nie musisz od razu biegle ich pisać. Ważne, żeby rozpoznać składnię:

```text
N[Int intType](...)
```

Kwadratowe nawiasy przy nazwie funkcji/metody oznaczają parametry typów.

---

# 16. Błędy - `error`

To absolutnie centralny element Go.

Typowa funkcja:

```go
func loadConfig() (Config, error)
```

Wywołanie:

```go
cfg, err := loadConfig()
if err != nil {
    return err
}
```

## Tworzenie błędu

```go
errors.New("user not found")
```

lub:

```go
fmt.Errorf("cannot load user %d", id)
```

## Opakowanie błędu

Bardzo ważny idiom:

```go
return fmt.Errorf("load config: %w", err)
```

`%w` zachowuje oryginalny błąd wewnątrz nowego.

Potem:

```go
errors.Is(err, os.ErrNotExist)
```

albo:

```go
var pathErr *os.PathError
if errors.As(err, &pathErr) {
}
```

## Sentinel errors

Możesz zobaczyć:

```go
var ErrNotFound = errors.New("not found")
```

Potem:

```go
if errors.Is(err, ErrNotFound) {
}
```

## Dlaczego wszędzie jest `if err != nil`?

Bo Go celowo nie opiera zwykłego sterowania błędami na wyjątkach.

Błąd jest jawny.

Dzięki temu patrząc na funkcję od razu widzisz miejsca, w których coś może pójść nie tak.

---

# 17. `defer`, `panic`, `recover`

## `defer`

Odkłada wykonanie funkcji do momentu opuszczenia aktualnej funkcji.

Najczęściej do sprzątania zasobów:

```go
f, err := os.Open("config.json")
if err != nil {
    return err
}
defer f.Close()
```

Typowy wzorzec:

1. otwórz zasób,
2. sprawdź błąd,
3. natychmiast ustaw `defer Close()`.

Inny przykład:

```go
mu.Lock()
defer mu.Unlock()
```

## `panic`

```go
panic("fatal problem")
```

Przerywa normalny tok wykonywania.

`panic` nie jest normalnym sposobem obsługi błędów biznesowych.

Nie robimy:

```go
if user == nil {
    panic("user missing")
}
```

jeśli brak usera jest przewidywalnym przypadkiem.

## `recover`

Może przechwycić panic.

Najczęściej spotkasz go we frameworkach HTTP lub kodzie infrastrukturalnym.

```go
defer func() {
    if r := recover(); r != nil {
        log.Println("panic:", r)
    }
}()
```

---

# 18. Pakiety, moduły i importy

To trzy pojęcia, których nie należy mieszać.

## Plik

```text
user.go
```

jest po prostu plikiem źródłowym.

## Package

Wszystkie pliki `.go` w jednym katalogu zazwyczaj należą do jednego pakietu:

```go
package users
```

Mogą odwoływać się do swoich funkcji i typów bez importowania siebie nawzajem.

## Module

Moduł definiuje `go.mod`.

Przykład:

```go
module github.com/user/web-monitor

go 1.27
```

Moduł może zawierać wiele pakietów.

### Przykład

```text
web-monitor/
├── go.mod
├── cmd/
│   └── web-monitor/
│       └── main.go
├── internal/
│   ├── scanner/
│   └── validator/
└── web/
```

Moduł:

```text
github.com/user/web-monitor
```

Pakiety:

```text
github.com/user/web-monitor/internal/scanner
github.com/user/web-monitor/internal/validator
```

---

# 19. Widoczność nazw

Go ma wyjątkowo prostą zasadę.

Nazwa zaczynająca się wielką literą jest eksportowana:

```go
func LoadUser()
type User struct{}
const MaxUsers = 100
```

Nazwa małą literą jest prywatna dla pakietu:

```go
func loadUser()
type cacheEntry struct{}
```

Czyli:

```go
http.Server
```

`Server` jest publiczny.

Natomiast jakiś:

```go
http.someInternalThing
```

nie byłby dostępny poza pakietem.

Ta reguła zastępuje słowa typu:

```text
public
private
protected
```

---

# 20. Typowa struktura projektu

Go nie wymusza jednej struktury projektu, ale istnieją popularne wzorce.

Mały projekt:

```text
myapp/
├── go.mod
├── go.sum
├── main.go
├── server.go
├── storage.go
└── server_test.go
```

Większy projekt:

```text
myapp/
├── cmd/
│   └── myapp/
│       └── main.go
├── internal/
│   ├── config/
│   ├── httpserver/
│   ├── service/
│   └── storage/
├── migrations/
├── web/
│   ├── static/
│   └── templates/
├── go.mod
└── go.sum
```

## `cmd/`

Często zawiera programy wykonywalne.

```text
cmd/server/main.go
cmd/worker/main.go
```

Jeden moduł może budować kilka binarek.

## `internal/`

Specjalny mechanizm Go.

Pakiety wewnątrz `internal` mają ograniczoną możliwość importowania spoza odpowiedniego drzewa projektu.

To prawdziwa ochrona na poziomie toolchainu, a nie tylko konwencja.

## `pkg/`

Spotykany w wielu repozytoriach, ale **nie jest wymagany przez Go**.

Zwykle oznacza kod przeznaczony do użycia przez inne projekty.

Nie należy tworzyć `pkg/` automatycznie tylko dlatego, że ktoś tak robi.

---

# 21. `go.mod`, `go.sum` i zależności

Nowy moduł:

```bash
go mod init github.com/example/myapp
```

Powstaje:

```text
go.mod
```

Przykład:

```go
module github.com/example/myapp

go 1.27

require github.com/go-chi/chi/v5 v5.x.x
```

## Dodanie biblioteki

```bash
go get github.com/go-chi/chi/v5
```

## Porządkowanie zależności

```bash
go mod tidy
```

To bardzo ważne polecenie.

Usuwa niepotrzebne zależności i dopisuje brakujące.

## `go.sum`

Zawiera sumy kryptograficzne modułów.

Nie jest listą zależności w sensie `package-lock.json`, choć pełni pokrewną rolę w zapewnianiu powtarzalności i weryfikacji pobranych modułów.

Normalnie commitujesz zarówno:

```text
go.mod
go.sum
```

## Lista modułów

```bash
go list -m all
```

## Dlaczego dana zależność istnieje?

```bash
go mod why github.com/jackc/pgx/v5
```

## Graf zależności

```bash
go mod graph
```

---

# 22. Uruchamianie i kompilowanie

## Uruchomienie projektu

```bash
go run .
```

Go kompiluje program tymczasowo i go uruchamia.

## Konkretny plik

```bash
go run main.go
```

Ale przy większych projektach lepiej uruchamiać pakiet:

```bash
go run .
```

lub:

```bash
go run ./cmd/server
```

## Kompilacja

```bash
go build
```

## Nazwa binarki

```bash
go build -o web-monitor
```

## Budowa konkretnego programu

```bash
go build -o bin/web-monitor ./cmd/web-monitor
```

## Wszystkie pakiety

```bash
go build ./...
```

`./...` oznacza:

> ten pakiet i wszystkie podpakiety.

## Instalacja programu

```bash
go install ./cmd/web-monitor
```

Binarka trafia zwykle do katalogu binariów Go.

Sprawdź:

```bash
go env GOPATH
```

Typowo:

```text
~/go/bin
```

---

# 23. Cross-compilation

Jedna z mocnych stron Go.

Na Linuksie możesz często zbudować binarkę dla innego systemu bez specjalnego toolchainu.

Windows amd64:

```bash
GOOS=windows GOARCH=amd64 go build -o app.exe
```

Linux ARM64:

```bash
GOOS=linux GOARCH=arm64 go build -o app-arm64
```

FreeBSD amd64:

```bash
GOOS=freebsd GOARCH=amd64 go build -o app-freebsd
```

Lista wspieranych kombinacji:

```bash
go tool dist list
```

## Ważne: CGO

Cross-compilation jest najprostsze dla czystego Go.

Jeżeli projekt korzysta z bibliotek C przez CGO, sytuacja staje się trudniejsza i może wymagać odpowiedniego kompilatora C dla systemu docelowego.

---

# 24. Formatowanie i analiza kodu

## `gofmt`

```bash
gofmt -w .
```

W praktyce częściej:

```bash
go fmt ./...
```

Go ma jeden dominujący styl formatowania.

## `go vet`

```bash
go vet ./...
```

Wyszukuje podejrzane konstrukcje, których sam kompilator nie musi uznać za błąd.

## `staticcheck`

Popularne dodatkowe narzędzie:

```bash
go install honnef.co/go/tools/cmd/staticcheck@latest
```

Potem:

```bash
staticcheck ./...
```

## Praktyczny zestaw

Przed commitem:

```bash
go fmt ./...
go vet ./...
go test ./...
```

W większym projekcie dodatkowo:

```bash
staticcheck ./...
```

---

# 25. Testy

Go ma testy w standardowej bibliotece.

Plik testowy kończy się:

```text
_test.go
```

Przykład:

```go
package calc

import "testing"

func TestAdd(t *testing.T) {
    got := Add(2, 3)
    want := 5

    if got != want {
        t.Fatalf("got %d, want %d", got, want)
    }
}
```

Uruchomienie:

```bash
go test
```

Cały moduł:

```bash
go test ./...
```

Szczegółowo:

```bash
go test -v ./...
```

## Jeden test

```bash
go test -run TestAdd
```

## Table-driven tests

Bardzo charakterystyczny styl Go:

```go
func TestAdd(t *testing.T) {
    tests := []struct {
        name string
        a    int
        b    int
        want int
    }{
        {"positive", 2, 3, 5},
        {"zero", 0, 0, 0},
        {"negative", -2, 1, -1},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := Add(tt.a, tt.b)
            if got != tt.want {
                t.Fatalf("got %d, want %d", got, tt.want)
            }
        })
    }
}
```

Jeśli zobaczysz `tt`, to często oznacza po prostu:

```text
test table entry
```

## Test HTTP

Standardowa biblioteka ma:

```go
net/http/httptest
```

Przykład:

```go
req := httptest.NewRequest(http.MethodGet, "/health", nil)
w := httptest.NewRecorder()

handler(w, req)

if w.Code != http.StatusOK {
    t.Fatalf("unexpected status: %d", w.Code)
}
```

---

# 26. Benchmarki, fuzzing i race detector

## Benchmark

```go
func BenchmarkParser(b *testing.B) {
    for b.Loop() {
        Parse(data)
    }
}
```

Uruchomienie:

```bash
go test -bench=. ./...
```

Starszy kod może używać:

```go
for i := 0; i < b.N; i++ {
}
```

## Coverage

```bash
go test -cover ./...
```

Raport do pliku:

```bash
go test -coverprofile=coverage.out ./...
```

HTML:

```bash
go tool cover -html=coverage.out
```

## Race detector

Bardzo ważny przy goroutines:

```bash
go test -race ./...
```

Wykrywa wyścigi dostępu do pamięci.

## Fuzzing

Go ma fuzzing wbudowany w `testing`.

Przykład konstrukcji:

```go
func FuzzParse(f *testing.F) {
    f.Add("hello")

    f.Fuzz(func(t *testing.T, input string) {
        _ = Parse(input)
    })
}
```

Uruchomienie:

```bash
go test -fuzz=FuzzParse
```

---

# 27. Debugowanie

Najpopularniejszy debugger dla Go:

```text
Delve
```

Instalacja:

```bash
go install github.com/go-delve/delve/cmd/dlv@latest
```

Uruchomienie:

```bash
dlv debug
```

Test:

```bash
dlv test ./internal/service
```

W VS Code debugger Go zwykle korzysta właśnie z Delve.

## Najprostszy debug

Go bardzo często debugguje się również przez:

```go
fmt.Printf("user=%+v\n", user)
```

`%+v` pokazuje strukturę razem z nazwami pól.

Jeszcze czytelniej:

```go
fmt.Printf("user=%#v\n", user)
```

---

# 28. Pliki, katalogi i system operacyjny

Najważniejsze pakiety:

```text
os
io
io/fs
path/filepath
bufio
```

## Odczyt całego pliku

```go
data, err := os.ReadFile("config.json")
if err != nil {
    return err
}
```

`data` ma typ:

```go
[]byte
```

## Zapis

```go
err := os.WriteFile("output.txt", []byte("hello"), 0644)
```

## Otwieranie pliku

```go
f, err := os.Open("data.txt")
if err != nil {
    return err
}
defer f.Close()
```

## Tworzenie katalogu

```go
os.MkdirAll("data/cache", 0755)
```

## Ścieżki

```go
path := filepath.Join("data", "cache", "file.json")
```

Lepiej niż ręczne:

```go
"data/cache/file.json"
```

jeśli kod ma działać na wielu systemach.

## Zmienne środowiskowe

```go
value := os.Getenv("DATABASE_URL")
```

Bezpieczniejsza kontrola istnienia:

```go
value, ok := os.LookupEnv("DATABASE_URL")
```

---

# 29. JSON

Pakiet:

```go
encoding/json
```

Struktura:

```go
type User struct {
    ID   int64  `json:"id"`
    Name string `json:"name"`
}
```

Fragmenty:

```text
`json:"id"`
```

to **struct tags**.

Mówią bibliotece JSON, jak ma nazywać pole.

## Kodowanie

```go
u := User{ID: 1, Name: "Anna"}

data, err := json.Marshal(u)
```

Wynik:

```json
{"id":1,"name":"Anna"}
```

## Dekodowanie

```go
var u User
err := json.Unmarshal(data, &u)
```

Zwróć uwagę na:

```go
&u
```

Biblioteka musi dostać pointer, bo ma zmodyfikować strukturę.

## HTTP

Często:

```go
json.NewEncoder(w).Encode(data)
```

oraz:

```go
json.NewDecoder(r.Body).Decode(&input)
```

## `omitempty`

```go
Email string `json:"email,omitempty"`
```

Jeśli pole jest puste, może zostać pominięte w JSON.

## Ignorowanie pola

```go
Password string `json:"-"`
```

---

# 30. Czas i daty

Pakiet:

```go
time
```

Aktualny czas:

```go
now := time.Now()
```

Dodawanie:

```go
later := now.Add(10 * time.Minute)
```

Timeout:

```go
5 * time.Second
```

Sen:

```go
time.Sleep(time.Second)
```

Parsowanie:

```go
t, err := time.Parse("2006-01-02", "2026-09-19")
```

Dziwny layout:

```text
2006-01-02 15:04:05
```

jest charakterystyczny dla Go.

To wzorcowa data referencyjna używana do formatowania czasu.

Formatowanie:

```go
s := t.Format("2006-01-02")
```

Ticker:

```go
ticker := time.NewTicker(10 * time.Minute)
defer ticker.Stop()
```

Potem często:

```go
for range ticker.C {
    check()
}
```

To konstrukcja bardzo przydatna np. w Promoguardzie.

---

# 31. Logowanie

Najprostsze:

```go
log.Println("server started")
```

Współczesne Go posiada standardowy logger strukturalny:

```go
log/slog
```

Przykład:

```go
slog.Info("promotion checked",
    "url", promo.URL,
    "status", promo.Status,
)
```

Błąd:

```go
slog.Error("cannot connect to database", "error", err)
```

Log strukturalny jest łatwiejszy do późniejszego przetwarzania niż ręczne składanie stringów.

Możliwe formaty:

- tekst,
- JSON.

W większych aplikacjach spotkasz też:

- `zerolog`,
- `zap`.

Dla większości nowych projektów warto najpierw sprawdzić, czy `slog` nie wystarcza.

---

# 32. `context.Context`

To jedna z rzeczy, która na początku wygląda dziwnie, a jest wszędzie w backendzie.

Przykład:

```go
func LoadUser(ctx context.Context, id int64) (User, error)
```

`context.Context` służy przede wszystkim do przenoszenia:

- anulowania operacji,
- deadline,
- timeoutu,
- niewielkich danych związanych z requestem.

## Request HTTP

Każdy request ma context:

```go
ctx := r.Context()
```

Jeśli klient zerwie połączenie, context może zostać anulowany.

Baza danych może wtedy również przerwać zapytanie.

## Timeout

```go
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()
```

Potem:

```go
result, err := service.Load(ctx)
```

## Ważne zasady

Context zazwyczaj:

- jest pierwszym argumentem,
- nazywa się `ctx`,
- nie przechowuje się go w structach bez dobrego powodu,
- przekazuje się w dół stosu wywołań.

Jeśli widzisz:

```go
func (r *Repository) Find(ctx context.Context, id int64)
```

to jest całkowicie typowy kod Go.

---

# 33. Współbieżność: goroutines i channels

## Goroutine

Zwykłe wywołanie:

```go
work()
```

Uruchomienie współbieżne:

```go
go work()
```

To wszystko.

Przykład:

```go
go checkPromotions()
go sendReports()
```

Program może mieć tysiące goroutines.

## Funkcja anonimowa

Bardzo częste:

```go
go func() {
    doSomething()
}()
```

Końcowe `()` oznacza natychmiastowe wywołanie funkcji anonimowej.

## Channel

Tworzenie:

```go
ch := make(chan string)
```

Wysłanie:

```go
ch <- "hello"
```

Odbiór:

```go
msg := <-ch
```

## Buffered channel

```go
ch := make(chan string, 10)
```

Może tymczasowo przechować 10 wartości bez blokowania nadawcy.

## Zamknięcie

```go
close(ch)
```

Odbiorca może zrobić:

```go
for msg := range ch {
    fmt.Println(msg)
}
```

Pętla skończy się po zamknięciu kanału i opróżnieniu bufora.

## `select`

Działa podobnie do `switch`, ale dla operacji kanałowych.

```go
select {
case msg := <-messages:
    fmt.Println(msg)
case <-ctx.Done():
    return ctx.Err()
}
```

To jeden z najważniejszych wzorców współbieżności w Go.

## Timeout kanałowy

```go
select {
case result := <-ch:
    fmt.Println(result)
case <-time.After(2 * time.Second):
    fmt.Println("timeout")
}
```

---

# 34. Mutex, WaitGroup i atomiki

Nie każdą współbieżność robi się kanałami.

## Mutex

```go
var mu sync.Mutex
```

Sekcja krytyczna:

```go
mu.Lock()
defer mu.Unlock()

counter++
```

Chroni współdzieloną pamięć przed jednoczesną modyfikacją.

## RWMutex

```go
sync.RWMutex
```

Ma osobne blokady do:

- odczytu,
- zapisu.

```go
mu.RLock()
mu.RUnlock()
```

oraz:

```go
mu.Lock()
mu.Unlock()
```

## WaitGroup

Czeka na zakończenie grupy goroutines.

Klasyczny kod:

```go
var wg sync.WaitGroup

for _, job := range jobs {
    wg.Add(1)

    go func(job Job) {
        defer wg.Done()
        process(job)
    }(job)
}

wg.Wait()
```

W nowszym Go możesz też spotkać wygodniejsze API `WaitGroup.Go`, zależnie od wersji kodu/toolchainu.

## Atomiki

Pakiet:

```go
sync/atomic
```

Do prostych liczników i flag bez pełnego mutexa.

Nie używaj atomików jako pierwszego wyboru, jeśli nie rozumiesz dobrze modelu pamięci. Przy czytaniu kodu wystarczy wiedzieć, że służą do bardzo lekkiej synchronizacji pojedynczych wartości.

---

# 35. HTTP w standardowej bibliotece

Pakiet:

```go
net/http
```

Go potrafi postawić pełnoprawny serwer HTTP bez żadnego frameworka.

Minimalny serwer:

```go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello")
    })

    http.ListenAndServe(":8080", nil)
}
```

Najważniejsze typy:

```go
http.Request
http.ResponseWriter
http.Handler
http.HandlerFunc
http.Server
http.ServeMux
```

## Handler

Kluczowy interfejs:

```go
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
```

Jeśli coś ma metodę `ServeHTTP`, może być handlerem HTTP.

## HandlerFunc

Funkcja:

```go
func hello(w http.ResponseWriter, r *http.Request) {
}
```

może działać jako handler.

## Współczesny ServeMux

Nowoczesne Go potrafi routować także po metodzie i parametrach ścieżki.

Przykładowy styl:

```go
mux := http.NewServeMux()

mux.HandleFunc("GET /users/{id}", getUser)
mux.HandleFunc("POST /users", createUser)
```

Odczyt parametru:

```go
id := r.PathValue("id")
```

Dla prostych aplikacji może to całkowicie wystarczyć bez zewnętrznego routera.

## Status

```go
w.WriteHeader(http.StatusNotFound)
```

Lepiej używać nazw:

```go
http.StatusOK
http.StatusCreated
http.StatusBadRequest
http.StatusNotFound
http.StatusInternalServerError
```

niż magicznych liczb:

```go
200
201
400
404
500
```

## Header

```go
w.Header().Set("Content-Type", "application/json")
```

## Odpowiedź JSON

```go
func health(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{
        "status": "ok",
    })
}
```

## Serwer z konfiguracją

Zamiast:

```go
http.ListenAndServe(":8080", mux)
```

w poważniejszym kodzie zobaczysz:

```go
server := &http.Server{
    Addr:              ":8080",
    Handler:           mux,
    ReadHeaderTimeout: 5 * time.Second,
}

err := server.ListenAndServe()
```

To daje większą kontrolę.

---

# 36. HTML templates i pliki statyczne

Pakiet:

```go
html/template
```

jest przeznaczony do generowania HTML i automatycznie stosuje odpowiednie escaping kontekstowy.

## Szablon

```html
<h1>{{.Title}}</h1>
<p>{{.Text}}</p>
```

Kod:

```go
tmpl, err := template.ParseFiles("templates/index.html")
if err != nil {
    return err
}
```

Render:

```go
data := struct {
    Title string
    Text  string
}{
    Title: "Example Site",
    Text:  "Nowe opowiadanie",
}

err = tmpl.Execute(w, data)
```

## Pliki statyczne

```go
fs := http.FileServer(http.Dir("./static"))
http.Handle("/static/", http.StripPrefix("/static/", fs))
```

Typowa struktura:

```text
web/
├── static/
│   ├── css/
│   ├── js/
│   └── img/
└── templates/
    ├── layout.html
    └── index.html
```

Dla strony generowanej po stronie serwera Go + `html/template` może całkowicie zastąpić duży frontendowy framework.

---

# 37. Embed - pakowanie plików do binarki

Pakiet:

```go
embed
```

pozwala wbudować pliki do programu podczas kompilacji.

Przykład:

```go
import "embed"

//go:embed web/templates/*.html
var templatesFS embed.FS
```

Po kompilacji pliki znajdują się w binarce.

Zaleta:

```text
app
```

może być pojedynczym plikiem zawierającym:

- backend,
- HTML,
- CSS,
- JavaScript,
- inne assety.

To świetnie pasuje do małych projektów wdrażanych jako jedna binarka lub jeden kontener.

Można osadzić katalog:

```go
//go:embed web/static/*
var staticFS embed.FS
```

---

# 38. Backend: routery i frameworki

W Go warto najpierw znać `net/http`. Dopiero później framework.

## 1. Standardowe `net/http`

Dobre dla:

- małych stron,
- API,
- prostych usług,
- narzędzi wewnętrznych,
- projektów, gdzie chcesz minimalnych zależności.

Zalety:

- zero zewnętrznych zależności,
- bardzo stabilne API,
- świetna kompatybilność z ekosystemem.

## 2. Chi

Import:

```go
github.com/go-chi/chi/v5
```

Chi to lekki router bardzo blisko standardowego `net/http`.

Przykład:

```go
r := chi.NewRouter()

r.Get("/users/{id}", getUser)
r.Post("/users", createUser)
```

Dobre, gdy:

- `net/http` jest prawie wystarczające,
- potrzebujesz wygodnego routingu,
- chcesz zostać blisko idiomatycznego Go.

Dla wielu zwykłych backendów to bardzo rozsądny wybór.

## 3. Gin

Import:

```go
github.com/gin-gonic/gin
```

Framework mocniej opakowujący HTTP.

Przykładowy styl:

```go
r := gin.Default()

r.GET("/users/:id", func(c *gin.Context) {
    id := c.Param("id")
    c.JSON(200, gin.H{"id": id})
})
```

Daje dużo wygody i dużą społeczność.

## 4. Echo

Import:

```go
github.com/labstack/echo/v4
```

Przykład:

```go
e := echo.New()

e.GET("/", func(c echo.Context) error {
    return c.String(http.StatusOK, "Hello")
})
```

Echo oferuje router, middleware, binding danych i wygodne API do odpowiedzi.

## 5. Fiber

Aktualna główna linia to Fiber v3:

```go
github.com/gofiber/fiber/v3
```

Fiber jest inspirowany Express.js i działa na `fasthttp`, a nie na standardowym `net/http`.

Kod wygląda bardziej frameworkowo:

```go
app := fiber.New()

app.Get("/", func(c fiber.Ctx) error {
    return c.SendString("Hello")
})
```

To może być przyjemne dla osób przychodzących z JavaScript/Node, ale brak bezpośredniej zgodności ze standardowym `net/http` jest ważną różnicą architektoniczną.

## Jak to ustawić mentalnie

Od najmniejszej warstwy do największej:

```text
net/http
   ↓
chi
   ↓
Gin / Echo
   ↓
Fiber - osobniejszy ekosystem oparty o fasthttp
```

Nie oznacza to, że „niżej = gorzej” albo „wyżej = lepiej”. To po prostu inna ilość abstrakcji.

---

# 39. Bazy danych

Standardowa biblioteka ma:

```go
database/sql
```

To ogólny interfejs do relacyjnych baz danych.

Potrzebujesz jeszcze sterownika.

Dla PostgreSQL bardzo popularny jest:

```text
pgx
```

czyli:

```go
github.com/jackc/pgx/v5
```

## Natywne pgx

Przykładowy styl:

```go
conn, err := pgx.Connect(ctx, databaseURL)
if err != nil {
    return err
}
defer conn.Close(ctx)
```

Query:

```go
var name string
err := conn.QueryRow(ctx,
    "SELECT name FROM users WHERE id=$1",
    id,
).Scan(&name)
```

## Pool

W serwerze częściej spotkasz pulę połączeń:

```go
pgxpool.Pool
```

niż pojedynczy `pgx.Conn`.

## `database/sql`

Typowy kod:

```go
db, err := sql.Open("driver", dsn)
```

Potem:

```go
row := db.QueryRowContext(ctx,
    "SELECT name FROM users WHERE id = ?",
    id,
)
```

Konkretny placeholder zależy od bazy/drivera. PostgreSQL zwykle używa:

```text
$1
$2
$3
```

## Transakcja

```go
tx, err := db.BeginTx(ctx, nil)
if err != nil {
    return err
}
defer tx.Rollback()

// operacje

return tx.Commit()
```

`Rollback()` po udanym `Commit()` nic złego nie zrobi, a `defer` chroni przed zapomnieniem rollbacku po błędzie.

---

# 40. ORM, sqlc i migracje

## GORM

Popularny ORM:

```text
gorm.io/gorm
```

Pozwala pracować na strukturach zamiast pisać cały SQL ręcznie.

Przykładowy styl:

```go
db.First(&user, id)
```

Zaleta:

- szybkie CRUD.

Wada:

- większa warstwa abstrakcji,
- trudniej czasem zobaczyć faktyczny SQL.

## sqlc

Inne podejście:

> Ty piszesz SQL, a `sqlc` generuje typowany kod Go.

Przykład SQL:

```sql
-- name: GetUser :one
SELECT id, name, email
FROM users
WHERE id = $1;
```

`sqlc` może wygenerować metodę podobną do:

```go
func (q *Queries) GetUser(ctx context.Context, id int64) (User, error)
```

To bardzo ciekawy środek między:

- ręcznym SQL,
- pełnym ORM.

## Migracje

Popularne narzędzia:

- `golang-migrate/migrate`,
- `goose`,
- migracje konkretnego ORM.

Pliki często wyglądają tak:

```text
0001_create_users.up.sql
0001_create_users.down.sql
```

---

# 41. Redis i cache

Popularny klient:

```text
github.com/redis/go-redis/v9
```

Przykładowy styl:

```go
rdb := redis.NewClient(&redis.Options{
    Addr: "localhost:6379",
})
```

Zapis:

```go
err := rdb.Set(ctx, "key", "value", time.Hour).Err()
```

Odczyt:

```go
value, err := rdb.Get(ctx, "key").Result()
```

Redis spotkasz jako:

- cache,
- session storage,
- lock,
- kolejkę lub element systemu kolejkowego,
- licznik,
- magazyn krótkotrwałych danych.

Do małego projektu nie dodawaj Redis tylko dlatego, że „backend powinien mieć Redis”. Jeśli pamięć procesu lub PostgreSQL wystarczają, dodatkowa usługa tylko komplikuje system.

---

# 42. Konfiguracja aplikacji

Najprostszy sposób:

```go
os.Getenv("DATABASE_URL")
```

Struktura:

```go
type Config struct {
    ListenAddr  string
    DatabaseURL string
    LogLevel    string
}
```

Funkcja:

```go
func LoadConfig() (Config, error) {
    // ...
}
```

## `.env`

Biblioteka:

```text
github.com/joho/godotenv
```

pomaga ładować lokalny `.env`.

Na produkcji często lepiej używać normalnych zmiennych środowiskowych dostarczanych przez:

- systemd,
- Docker,
- Compose,
- Kubernetes,
- platformę hostingową.

## Viper

Popularna większa biblioteka konfiguracyjna:

```text
github.com/spf13/viper
```

Potrafi obsługiwać m.in.:

- env,
- YAML,
- JSON,
- TOML,
- wartości domyślne.

Do małego projektu może być przesadą.

---

# 43. CLI i narzędzia

Prosty CLI można napisać standardowym:

```go
flag
```

Przykład:

```go
port := flag.Int("port", 8080, "listen port")
flag.Parse()
```

Uruchomienie:

```bash
./app -port 9000
```

## Cobra

Duże i popularne narzędzie:

```text
github.com/spf13/cobra
```

Nadaje się do programów typu:

```bash
web-monitor scan
web-monitor report
web-monitor config show
```

Daje:

- komendy,
- podkomendy,
- flagi,
- help,
- completion.

Często występuje razem z Viperem.

Do prostego narzędzia jedna komenda + kilka flag → `flag` może być całkowicie wystarczający.

---

# 44. Gry w Go

Go nie jest pierwszym językiem kojarzonym z AAA, ale świetnie nadaje się do:

- prostych gier 2D,
- symulacji,
- roguelike,
- gier strategicznych,
- prototypów,
- serwerów gier,
- narzędzi do generowania danych,
- gier webowych przez WebAssembly.

Najbardziej praktyczne biblioteki do poznania:

1. **Ebitengine** - czysty Go, bardzo dobry do 2D.
2. **raylib-go** - binding Go do raylib, prosty i przyjemny API.
3. **SDL bindings** - niższy poziom, więcej kontroli, więcej konfiguracji.
4. **Pixel** - historycznie popularna biblioteka 2D; warto rozpoznawać w starszym kodzie, ale do nowego projektu lepiej najpierw sprawdzić aktywniej rozwijane opcje.

Jeśli celem jest „chcę zrobić małą grę i zrozumieć kod”, Ebitengine jest bardzo dobrym punktem startowym.

---

# 45. Ebitengine - najpraktyczniejszy start z grami 2D

Pakiet:

```text
github.com/hajimehoshi/ebiten/v2
```

Rdzeń gry wygląda zwykle mniej więcej tak:

```go
type Game struct {
    playerX float64
    playerY float64
}
```

Następnie implementuje się metody wymagane przez engine.

## `Update`

Logika gry:

```go
func (g *Game) Update() error {
    if ebiten.IsKeyPressed(ebiten.KeyArrowRight) {
        g.playerX++
    }
    return nil
}
```

## `Draw`

Renderowanie:

```go
func (g *Game) Draw(screen *ebiten.Image) {
    // rysowanie
}
```

## `Layout`

Rozmiar logicznego ekranu:

```go
func (g *Game) Layout(outsideWidth, outsideHeight int) (int, int) {
    return 1280, 720
}
```

## Uruchomienie

```go
func main() {
    ebiten.SetWindowSize(1280, 720)
    ebiten.SetWindowTitle("My Game")

    game := &Game{}

    if err := ebiten.RunGame(game); err != nil {
        log.Fatal(err)
    }
}
```

Mentalny model:

```text
RunGame
   ↓
Update
   ↓
Draw
   ↓
Update
   ↓
Draw
   ↓
...
```

## Co trzyma się w `Game`?

Na przykład:

```go
type Game struct {
    player Player
    enemies []Enemy
    score int
    state GameState
}
```

Typowa organizacja:

```text
game/
├── main.go
├── game.go
├── player.go
├── enemy.go
├── world.go
└── assets/
```

Ebitengine obsługuje m.in.:

- rysowanie 2D,
- input,
- audio,
- obrazy,
- shadery,
- WebAssembly,
- wiele platform desktopowych i mobilnych.

---

# 46. Raylib-go i inne biblioteki growe

## raylib-go

Raylib jest biblioteką C zaprojektowaną do prostego programowania gier. `raylib-go` daje binding dla Go.

Kod ma zwykle bardzo klasyczny game loop:

```go
rl.InitWindow(800, 450, "game")
defer rl.CloseWindow()

for !rl.WindowShouldClose() {
    rl.BeginDrawing()

    rl.ClearBackground(rl.RayWhite)
    rl.DrawText("Hello", 20, 20, 20, rl.Black)

    rl.EndDrawing()
}
```

To może być bardzo czytelne dla kogoś, kto chce zobaczyć „co komputer robi w każdej klatce”.

W porównaniu z Ebitengine raylib-go może wprowadzać zależność od natywnej biblioteki/C toolchainu, zależnie od sposobu budowy i platformy.

## SDL

SDL daje niższy poziom:

- okna,
- input,
- audio,
- rendering,
- urządzenia.

W Go korzysta się z bindingów.

Dobre, jeśli chcesz więcej kontroli, ale do zwykłej zabawy 2D Ebitengine/raylib są wygodniejsze.

## Pixel

W starszych tutorialach Go możesz trafić na:

```text
github.com/faiface/pixel
```

Biblioteka jest ciekawa historycznie i ma czytelne API 2D, ale aktywność projektu jest znacznie mniejsza niż w nowszych, żywiej rozwijanych alternatywach. Rozpoznawaj ją, ale nie musi być pierwszym wyborem do nowego projektu.

---

# 47. CGO - kiedy Go korzysta z C

Go może korzystać z kodu C przez mechanizm:

```text
CGO
```

Sprawdzenie:

```bash
go env CGO_ENABLED
```

Czysty Go jest prosty do budowania i cross-compilowania.

CGO może wprowadzać:

- zależność od kompilatora C,
- natywne biblioteki,
- trudniejszy deployment,
- trudniejszą cross-kompilację.

Przy czytaniu zależności warto wiedzieć, czy biblioteka jest:

```text
pure Go
```

czy opiera się o binding do biblioteki C.

Ebitengine we współczesnych wydaniach ma bardzo mocne wsparcie pure-Go na desktopie. Raylib-go jest bindingiem do raylib.

---

# 48. Najczęstsze idiomy Go

## `if err != nil`

```go
value, err := load()
if err != nil {
    return err
}
```

Czytaj:

> spróbuj operacji; jeśli nie wyszła, przerwij i zwróć błąd.

---

## Ignorowanie wartości

```go
value, _ := strconv.Atoi(input)
```

`_` = nie interesuje mnie ta wartość.

Uwaga: ignorowanie błędów często jest podejrzane.

---

## Compile-time interface check

Możesz zobaczyć:

```go
var _ io.Writer = (*MyWriter)(nil)
```

To nie jest sensowna wartość biznesowa.

To sztuczka kompilacyjna:

> sprawdź podczas kompilacji, czy `*MyWriter` implementuje `io.Writer`.

---

## Constructor-like function

Go nie ma konstruktorów językowych.

Często stosuje się:

```go
func NewServer(cfg Config) *Server {
    return &Server{
        cfg: cfg,
    }
}
```

Wywołanie:

```go
server := NewServer(cfg)
```

Nazwy:

```text
New
NewServer
NewClient
NewRepository
```

są tylko konwencją.

---

## Functional options

W większych bibliotekach zobaczysz:

```go
client := NewClient(
    WithTimeout(5*time.Second),
    WithRetries(3),
)
```

W środku opcja często jest funkcją:

```go
type Option func(*Client)
```

To popularny sposób konfiguracji API bez konstruktora z piętnastoma argumentami.

---

## `Must...`

Funkcja o nazwie:

```go
MustLoad
MustParse
MustCompile
```

zwykle oznacza:

> jeśli operacja się nie uda, funkcja zrobi panic.

Przykład ze standardowej biblioteki:

```go
template.Must(...)
```

Nadaje się zwykle tam, gdzie błąd jest błędem programisty lub start aplikacji bez danego zasobu nie ma sensu.

---

## `New...`

```go
http.NewServeMux()
bytes.NewBuffer(...)
json.NewEncoder(...)
```

zwykle tworzy i zwraca obiekt.

---

## `With...`

```go
context.WithTimeout(...)
context.WithCancel(...)
```

często oznacza utworzenie zmodyfikowanej wersji istniejącego obiektu/kontekstu.

---

# 49. Rzeczy, które wyglądają dziwnie, ale są normalne

## `:=`

```go
x := 10
```

Deklaracja + przypisanie.

## `&User{}`

```go
u := &User{}
```

Utwórz `User` i zwróć pointer do niego.

## `*User`

```go
func Save(u *User)
```

Pointer do `User`.

## `[]User`

Slice struktur `User`.

## `[]*User`

Slice pointerów do `User`.

## `map[string]User`

Mapa:

```text
string → User
```

## `map[string][]User`

Mapa:

```text
string → slice User
```

## `chan Result`

Kanał przenoszący `Result`.

## `<-chan Result`

Kanał tylko do odbierania.

## `chan<- Result`

Kanał tylko do wysyłania.

## `func() error`

Typ funkcji, która:

- nie przyjmuje argumentów,
- zwraca `error`.

## `func(context.Context, string) (*User, error)`

Typ funkcji:

- argument `context.Context`,
- argument `string`,
- zwraca `*User`,
- zwraca `error`.

## `...string`

Variadic:

```go
func Log(tags ...string)
```

przyjmuje dowolną liczbę stringów.

## `struct{}`

Pusta struktura.

```go
struct{}
```

zajmuje zero bajtów danych użytkowych i bywa używana do sygnalizacji.

Przykład:

```go
chan struct{}
```

czyli kanał służący nie do przesyłania danych, tylko sygnału.

## `map[string]any`

Dynamiczny zestaw danych:

```text
string → dowolny typ
```

Częsty przy luźnym JSON.

---

# 50. Jak czytać obcy projekt Go

To najważniejsza część całego kompendium, jeśli Twoim celem jest **rozumienie kodu**.

## Krok 1 - znajdź `go.mod`

```bash
cat go.mod
```

Dowiesz się:

- jak nazywa się moduł,
- jakiej wersji Go wymaga,
- jakich bibliotek używa.

Sprawdź przede wszystkim, czy widzisz:

```text
chi
gin
echo
fiber
pgx
gorm
redis
ebiten
cobra
viper
```

To od razu mówi dużo o projekcie.

---

## Krok 2 - znajdź `package main`

```bash
rg 'package main'
```

lub:

```bash
grep -R '^package main' .
```

Potem znajdź:

```go
func main()
```

To punkt startowy programu.

---

## Krok 3 - zobacz, co `main()` tworzy

Na przykład:

```go
func main() {
    cfg := loadConfig()
    db := openDatabase(cfg)
    repo := NewRepository(db)
    service := NewService(repo)
    server := NewServer(service)
    server.Run()
}
```

Już masz mapę programu:

```text
config
  ↓
database
  ↓
repository
  ↓
service
  ↓
HTTP server
```

---

## Krok 4 - rozpoznaj warstwy

Typowy backend:

```text
HTTP handler
    ↓
service
    ↓
repository
    ↓
database
```

### Handler

Odpowiada za HTTP:

```go
func (h *Handler) GetUser(w http.ResponseWriter, r *http.Request)
```

### Service

Logika aplikacji:

```go
func (s *Service) GetUser(ctx context.Context, id int64)
```

### Repository

Dostęp do danych:

```go
func (r *Repository) GetUser(ctx context.Context, id int64)
```

---

## Krok 5 - czytaj struktury

Jeśli widzisz:

```go
type Server struct {
    router  http.Handler
    service *Service
    logger  *slog.Logger
}
```

wiesz, od czego `Server` zależy.

Struct jest często najlepszą mapą architektury.

---

## Krok 6 - czytaj interfejsy

```go
type UserStore interface {
    Get(context.Context, int64) (User, error)
    Save(context.Context, User) error
}
```

Interfejs pokazuje kontrakt między warstwami.

---

## Krok 7 - znajdź trasy HTTP

Szukaj:

```text
HandleFunc
Handle
GET
POST
PUT
DELETE
Route
Mount
```

Dostajesz listę wejść do aplikacji.

---

## Krok 8 - znajdź goroutines

```bash
rg '\bgo\s+'
```

Sprawdź:

- co działa w tle,
- jak proces się zamyka,
- gdzie używany jest `context`,
- gdzie są kanały.

---

## Krok 9 - znajdź I/O

Szukaj:

```text
os.ReadFile
os.WriteFile
http.Client
pgx
sql.DB
redis
json.NewDecoder
json.NewEncoder
```

To pokaże, gdzie program komunikuje się ze światem.

---

## Krok 10 - uruchom testy

```bash
go test ./...
```

To często najlepszy szybki test zdrowia projektu.

Potem:

```bash
go vet ./...
```

---

# 51. Miniaturowy backend - przykład całości

Poniższy przykład pokazuje wszystkie najważniejsze klocki naraz.

```go
package main

import (
    "encoding/json"
    "log/slog"
    "net/http"
    "os"
)

type App struct {
    logger *slog.Logger
}

type HealthResponse struct {
    Status string `json:"status"`
}

func (a *App) health(w http.ResponseWriter, r *http.Request) {
    response := HealthResponse{
        Status: "ok",
    }

    w.Header().Set("Content-Type", "application/json")

    if err := json.NewEncoder(w).Encode(response); err != nil {
        a.logger.Error("cannot encode response", "error", err)
    }
}

func main() {
    logger := slog.New(slog.NewTextHandler(os.Stdout, nil))

    app := &App{
        logger: logger,
    }

    mux := http.NewServeMux()
    mux.HandleFunc("GET /health", app.health)

    server := &http.Server{
        Addr:    ":8080",
        Handler: mux,
    }

    logger.Info("server starting", "addr", server.Addr)

    if err := server.ListenAndServe(); err != nil {
        logger.Error("server stopped", "error", err)
    }
}
```

Rozbiór:

```go
type App struct {
    logger *slog.Logger
}
```

Aplikacja przechowuje logger.

```go
type HealthResponse struct {
    Status string `json:"status"`
}
```

Struktura odpowiedzi JSON.

```go
func (a *App) health(...)
```

Metoda `App`, działająca jako handler.

```go
json.NewEncoder(w).Encode(response)
```

Serializuje strukturę do JSON i zapisuje do odpowiedzi HTTP.

```go
mux.HandleFunc("GET /health", app.health)
```

Rejestruje trasę.

```go
server.ListenAndServe()
```

Uruchamia serwer.

To jest już prawdziwy, działający backend HTTP.

---

# 52. Miniaturowa gra - przykład struktury

Przykładowa koncepcja Ebitengine:

```go
type Player struct {
    X float64
    Y float64
}

type Game struct {
    Player Player
}

func (g *Game) Update() error {
    if ebiten.IsKeyPressed(ebiten.KeyArrowLeft) {
        g.Player.X -= 2
    }

    if ebiten.IsKeyPressed(ebiten.KeyArrowRight) {
        g.Player.X += 2
    }

    return nil
}

func (g *Game) Draw(screen *ebiten.Image) {
    // tutaj renderer
}

func (g *Game) Layout(w, h int) (int, int) {
    return 800, 600
}
```

Mentalnie:

```text
Game
├── dane świata
├── dane gracza
├── Update()   -> logika
├── Draw()     -> grafika
└── Layout()   -> ekran
```

Większa gra może wyglądać:

```text
cmd/game/main.go
internal/game/game.go
internal/game/player.go
internal/game/enemy.go
internal/game/world.go
internal/game/input.go
internal/game/render.go
assets/
```

Nie musisz jednak od razu dzielić wszystkiego na kilkanaście pakietów. W małej grze kilka plików w jednym pakiecie `main` może być znacznie czytelniejsze.

---

# 53. Ściąga poleceń

## Projekt

Nowy katalog:

```bash
mkdir myapp
cd myapp
```

Nowy moduł:

```bash
go mod init github.com/example/myapp
```

Uruchom:

```bash
go run .
```

Kompiluj:

```bash
go build
```

Kompiluj do konkretnej nazwy:

```bash
go build -o myapp
```

Wszystkie pakiety:

```bash
go build ./...
```

---

## Zależności

Dodaj:

```bash
go get github.com/go-chi/chi/v5
```

Porządkuj:

```bash
go mod tidy
```

Lista:

```bash
go list -m all
```

Dlaczego zależność istnieje:

```bash
go mod why MODULE
```

Graf:

```bash
go mod graph
```

---

## Jakość

Format:

```bash
go fmt ./...
```

Analiza:

```bash
go vet ./...
```

Testy:

```bash
go test ./...
```

Testy szczegółowo:

```bash
go test -v ./...
```

Race detector:

```bash
go test -race ./...
```

Coverage:

```bash
go test -cover ./...
```

Benchmark:

```bash
go test -bench=. ./...
```

---

## Informacje

Wersja:

```bash
go version
```

Środowisko:

```bash
go env
```

Dokumentacja symbolu:

```bash
go doc fmt.Println
```

Dokumentacja pakietu:

```bash
go doc net/http
```

Lista pakietów:

```bash
go list ./...
```

---

# 54. Ściąga składni

## Zmienna

```go
var x int
x := 10
```

## Stała

```go
const Max = 100
```

## Slice

```go
items := []string{"a", "b"}
items = append(items, "c")
```

## Map

```go
m := map[string]int{}
m["a"] = 1
```

## Struct

```go
type User struct {
    ID   int64
    Name string
}
```

## Pointer

```go
p := &user
```

## Funkcja

```go
func Add(a, b int) int {
    return a + b
}
```

## Funkcja z błędem

```go
func Load() (Data, error)
```

## Metoda

```go
func (u *User) Rename(name string)
```

## Interfejs

```go
type Store interface {
    Save(User) error
}
```

## `if`

```go
if x > 10 {
}
```

## `switch`

```go
switch x {
case 1:
case 2:
default:
}
```

## `for`

```go
for i := 0; i < 10; i++ {
}
```

## `range`

```go
for i, v := range values {
}
```

## Error handling

```go
value, err := load()
if err != nil {
    return err
}
```

## Goroutine

```go
go work()
```

## Channel

```go
ch := make(chan Result)
ch <- result
result := <-ch
```

## Context

```go
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()
```

## JSON tag

```go
Name string `json:"name"`
```

## Import grupowy

```go
import (
    "context"
    "fmt"
    "net/http"
)
```

---

# 55. Co warto znać, a czego na razie nie trzeba

Jeżeli Twoim celem jest głównie **rozumienie projektu, poprawianie go z pomocą AI, przeglądanie PR-ów i orientowanie się, co się dzieje**, skoncentruj się na tych rzeczach.

## Musisz dobrze rozpoznawać

```text
package
import
func
var
const
:=
struct
slice
map
pointer
if
switch
for
range
error
method
interface
context
goroutine
channel
go.mod
go test
go build
```

## Powinieneś rozumieć na poziomie ogólnym

```text
generics
mutex
WaitGroup
HTTP handler
middleware
database/sql
pgx
JSON
html/template
embed
```

## Możesz na razie traktować jako „wiem, że istnieje”

```text
reflection
unsafe
zaawansowany model pamięci
compiler internals
assembly
custom allocators
skomplikowane generic constraints
plugin package
linker flags
profilowanie runtime na głębokim poziomie
```

## Dla backendu stron

Najbardziej praktyczna ścieżka rozumienia kodu:

```text
Go syntax
   ↓
struct / method / interface
   ↓
error
   ↓
context
   ↓
net/http
   ↓
JSON / templates
   ↓
PostgreSQL + pgx
   ↓
chi lub inny router
   ↓
testy
```

## Dla gier

```text
Go syntax
   ↓
struct
   ↓
methods
   ↓
slices / maps
   ↓
input
   ↓
game loop
   ↓
Ebitengine lub raylib-go
```

---

# 56. Dalsza dokumentacja

Najbardziej wartościowe źródła:

## Oficjalne Go

- Dokumentacja: https://go.dev/doc/
- A Tour of Go: https://go.dev/tour/
- Standardowa biblioteka: https://pkg.go.dev/std
- Wyszukiwarka pakietów: https://pkg.go.dev/
- Moduły: https://go.dev/ref/mod
- Organizacja modułu: https://go.dev/doc/modules/layout
- Effective Go: https://go.dev/doc/effective_go

## Backend

- `net/http`: https://pkg.go.dev/net/http
- `html/template`: https://pkg.go.dev/html/template
- Chi: https://github.com/go-chi/chi
- Gin: https://gin-gonic.com/
- Echo: https://echo.labstack.com/
- Fiber: https://docs.gofiber.io/
- pgx: https://github.com/jackc/pgx
- sqlc: https://sqlc.dev/
- go-redis: https://github.com/redis/go-redis

## Gry

- Ebitengine: https://ebitengine.org/
- raylib: https://www.raylib.com/
- raylib-go: https://github.com/gen2brain/raylib-go

---

# Podsumowanie mentalne

Jeżeli otwierasz plik Go i widzisz:

```go
func (s *Service) Check(ctx context.Context, promo *Promotion) ([]Issue, error)
```

powinieneś umieć przeczytać go niemal po polsku:

> Jest metoda `Check` należąca do `Service`. Działa na pointerze do `Service`. Dostaje context i pointer do promocji. Zwraca slice problemów oraz błąd.

Jeżeli potem widzisz:

```go
issues, err := s.validator.Validate(ctx, promo)
if err != nil {
    return nil, fmt.Errorf("validate promotion: %w", err)
}
```

czytasz:

> Wywołaj walidator. Dostanę listę problemów i ewentualny błąd. Jeśli jest błąd, kończę działanie i opakowuję go dodatkowym kontekstem.

Jeśli zobaczysz:

```go
go s.sendReport(ctx, issues)
```

czytasz:

> Uruchom wysyłkę raportu współbieżnie w osobnej goroutine.

A jeśli:

```go
mux.HandleFunc("GET /api/promotions/{id}", app.getPromotion)
```

czytasz:

> Dla requestu `GET` pod tym URL-em uruchom metodę `getPromotion`.

I właśnie do tego poziomu rozumienia ten materiał ma Cię doprowadzić.

---

# Jedna praktyczna rada na koniec

Nie próbuj czytać dużego projektu Go od pierwszego pliku do ostatniego.

Czytaj go jako graf przepływu:

```text
main()
  ↓
co jest tworzone?
  ↓
co uruchamia serwer / CLI / grę?
  ↓
jakie są wejścia?
  ↓
jakie struktury przenoszą dane?
  ↓
jakie metody są wywoływane?
  ↓
gdzie pojawia się I/O?
  ↓
gdzie wraca error?
```

Jeżeli umiesz przejść tę ścieżkę, potrafisz zrozumieć zaskakująco dużą część realnego projektu Go nawet wtedy, gdy sam jeszcze nie napisałbyś go od zera.

## Oficjalne źródła

- Go documentation: https://go.dev/doc/
- Go 1.27 release notes: https://go.dev/doc/go1.27
- Go language specification: https://go.dev/ref/spec
- Standard library and packages: https://pkg.go.dev/
