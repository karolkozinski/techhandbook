# Go — Handbook for Reading Code

## Table of contents

This handbook focuses on understanding Go code, project structure, build tooling, web backends, concurrency and common libraries.

# 1. How to think about Go

Go is a compiled, statically typed language designed around simplicity, fast builds, explicit error handling, concurrency and easy deployment.

A Go program is usually compiled to a single native binary.

# 2. Installation and tools

Debian:

```bash
sudo apt install golang-go
```

FreeBSD:

```bash
sudo pkg install go
```

Check:

```bash
go version
```

Useful editor tooling is provided by `gopls`.

# 3. First program and file anatomy

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello")
}
```

`package main` defines an executable package.

`func main()` is the program entry point.

# 4. Syntax basics

Blocks use braces.

Semicolons are normally inserted automatically.

Comments:

```go
// line comment

/*
block comment
*/
```

Names beginning with an uppercase letter are exported from a package.

# 5. Variables, constants and zero values

```go
var count int = 10
name := "Alice"
const MaxRetries = 5
```

Short declaration `:=` works inside functions.

Zero values:

```text
int      0
float    0
bool     false
string   ""
pointer  nil
slice    nil
map      nil
```

# 6. Basic types

Common integer types:

```go
int
int8
int16
int32
int64
uint
uint64
```

Floating point:

```go
float32
float64
```

Boolean:

```go
bool
```

Named types:

```go
type UserID int64
```

# 7. string, byte and rune

Go strings are UTF-8 byte sequences.

`byte` is an alias for `uint8`.

`rune` is an alias for `int32` and usually represents a Unicode code point.

```go
for _, r := range "Zażółć" {
    fmt.Printf("%c
", r)
}
```

# 8. Arrays, slices and maps

Array:

```go
var a [3]int
```

Slice:

```go
items := []string{"a", "b"}
items = append(items, "c")
```

Map:

```go
users := map[string]int{
    "alice": 42,
}
```

Read with presence check:

```go
age, ok := users["alice"]
```

# 9. Structs

```go
type User struct {
    ID   int64
    Name string
}
```

Literal:

```go
u := User{
    ID:   1,
    Name: "Alice",
}
```

Embedding:

```go
type Admin struct {
    User
    Level int
}
```

# 10. Pointers

```go
value := 10
ptr := &value
fmt.Println(*ptr)
```

Pointers are used to share/mutate values and avoid copies.

Go has no pointer arithmetic.

`nil` means no value/reference.

# 11. Control flow

```go
if err != nil {
    return err
}
```

```go
switch status {
case "ready":
    ...
default:
    ...
}
```

Go has one loop keyword:

```go
for i := 0; i < 10; i++ {
}
```

Range:

```go
for i, value := range items {
}
```

# 12. Functions

```go
func Add(a, b int) int {
    return a + b
}
```

Multiple returns:

```go
func Load() (string, error) {
    ...
}
```

Function value:

```go
handler := func(name string) error {
    return nil
}
```

Variadic:

```go
func Log(values ...string) {
}
```

# 13. Methods and receivers

Value receiver:

```go
func (u User) DisplayName() string {
    return u.Name
}
```

Pointer receiver:

```go
func (u *User) Rename(name string) {
    u.Name = name
}
```

Use pointer receivers when the method mutates the receiver or copying would be undesirable.

# 14. Interfaces

```go
type Store interface {
    Get(id int64) (*User, error)
}
```

Types satisfy interfaces implicitly.

Empty interface is now commonly written as `any`.

Type assertion:

```go
value, ok := x.(string)
```

Type switch:

```go
switch v := x.(type) {
case string:
    fmt.Println(v)
}
```

# 15. Generics

```go
func First[T any](items []T) T {
    return items[0]
}
```

Constraint example:

```go
type Number interface {
    ~int | ~int64 | ~float64
}
```

Use generics when they improve reuse without obscuring code.

# 16. Errors

Go treats errors as normal values.

```go
value, err := load()
if err != nil {
    return err
}
```

Create:

```go
errors.New("not found")
```

Wrap:

```go
fmt.Errorf("load user: %w", err)
```

Check wrapped errors:

```go
errors.Is(err, ErrNotFound)
```

# 17. defer, panic and recover

`defer` schedules cleanup when the surrounding function returns.

```go
f, err := os.Open(path)
if err != nil {
    return err
}
defer f.Close()
```

`panic` is for unrecoverable programming/runtime failures, not routine business errors.

`recover` can catch panics in deferred functions and is used sparingly.

# 18. Packages, modules and imports

A directory normally contains one package.

A module is defined by `go.mod`.

```bash
go mod init example.com/project
```

Imports:

```go
import (
    "fmt"
    "net/http"

    "github.com/go-chi/chi/v5"
)
```

# 19. Visibility

Uppercase identifier = exported.

Lowercase identifier = package-private.

```go
type User struct{}
type internalConfig struct{}
```

# 20. Typical project structure

```text
project/
├── go.mod
├── go.sum
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── http/
│   ├── service/
│   └── repository/
└── migrations/
```

`internal/` prevents external modules from importing those packages.

# 21. go.mod, go.sum and dependencies

```bash
go get github.com/go-chi/chi/v5
go mod tidy
go list -m all
go mod why MODULE
go mod graph
```

`go.sum` records module checksums.

# 22. Run and build

```bash
go run .
go run main.go
go build .
go build -o app .
go build ./...
go install ./cmd/tool
```

# 23. Cross-compilation

```bash
GOOS=linux GOARCH=amd64 go build -o app
```

CGO can complicate cross-compilation.

For pure-Go projects:

```bash
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build
```

# 24. Formatting and analysis

```bash
gofmt -w .
go vet ./...
staticcheck ./...
```

Typical quality pass:

```bash
gofmt -w .
go vet ./...
go test ./...
```

# 25. Tests

File names end in `_test.go`.

```go
func TestAdd(t *testing.T) {
    got := Add(2, 3)
    if got != 5 {
        t.Fatalf("got %d", got)
    }
}
```

Run:

```bash
go test ./...
```

Table-driven tests are common.

# 26. Benchmarks, coverage, race detector and fuzzing

Benchmark:

```bash
go test -bench=. ./...
```

Coverage:

```bash
go test -cover ./...
```

Race detector:

```bash
go test -race ./...
```

Fuzzing:

```bash
go test -fuzz=FuzzName
```

# 27. Debugging

Simple diagnostics:

```go
fmt.Printf("value=%+v
", value)
```

For interactive debugging, Delve is the standard choice.

```bash
dlv debug
```

# 28. Files and OS

Read whole file:

```go
data, err := os.ReadFile("file.txt")
```

Write:

```go
err := os.WriteFile("file.txt", data, 0644)
```

Paths:

```go
filepath.Join(root, "config.json")
```

Environment:

```go
os.Getenv("PORT")
```

# 29. JSON

```go
type User struct {
    Name string `json:"name"`
    Age  int    `json:"age,omitempty"`
}

data, err := json.Marshal(user)
```

Decode:

```go
err := json.Unmarshal(data, &user)
```

Ignore field:

```go
Secret string `json:"-"`
```

# 30. Time and dates

```go
now := time.Now()
deadline := now.Add(5 * time.Minute)
formatted := now.Format(time.RFC3339)
```

# 31. Logging

Standard:

```go
log.Printf("started on %s", addr)
```

Modern Go also includes structured logging through `log/slog`.

# 32. context.Context

Contexts carry cancellation, deadlines and request-scoped values.

```go
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()
```

Pass context as the first parameter where appropriate.

Do not store Context inside structs unless there is a specific design reason.

# 33. Goroutines and channels

Start concurrent work:

```go
go worker()
```

Channel:

```go
ch := make(chan Result)
```

Buffered:

```go
ch := make(chan Result, 10)
```

Select:

```go
select {
case result := <-ch:
    fmt.Println(result)
case <-ctx.Done():
    return ctx.Err()
}
```

# 34. Mutex, WaitGroup and atomics

Mutex:

```go
var mu sync.Mutex

mu.Lock()
defer mu.Unlock()
```

WaitGroup:

```go
var wg sync.WaitGroup
wg.Add(1)

go func() {
    defer wg.Done()
}()

wg.Wait()
```

Use atomics for small lock-free counters/state when appropriate.

# 35. HTTP standard library

Handler:

```go
func hello(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("hello"))
}
```

ServeMux:

```go
mux := http.NewServeMux()
mux.HandleFunc("GET /hello", hello)

http.ListenAndServe(":8080", mux)
```

JSON response:

```go
w.Header().Set("Content-Type", "application/json")
json.NewEncoder(w).Encode(data)
```

Use `http.Server` for production configuration and graceful shutdown.

# 36. Templates and static files

```go
tmpl := template.Must(template.ParseFiles("page.html"))
tmpl.Execute(w, data)
```

Static files:

```go
http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("assets"))))
```

# 37. embed

Package files into the binary:

```go
//go:embed templates/*
var templatesFS embed.FS
```

# 38. Routers and frameworks

Standard `net/http` is often enough.

Popular additions:

- Chi — minimal router,
- Gin — full-featured web framework,
- Echo — web framework,
- Fiber — API inspired by Express.

Understand the standard library before relying heavily on a framework.

# 39. Databases

`database/sql` provides a generic database API.

PostgreSQL projects often use `pgx`.

Pool example:

```go
pool, err := pgxpool.New(ctx, databaseURL)
```

Transactions are explicit.

# 40. ORM, sqlc and migrations

GORM is a popular ORM.

sqlc generates type-safe Go code from SQL.

Migration tools manage schema versions.

For small systems, direct SQL + pgx/sqlc is often clear and effective.

# 41. Redis

Use Redis when you have a concrete need such as cache, rate limiting, queues or shared state.

Do not add it automatically.

# 42. Application configuration

Prefer environment variables and explicit config structures.

```go
type Config struct {
    Port string
    DB   string
}
```

Libraries such as Viper exist, but simple projects may not need them.

# 43. CLI tools

Cobra is a popular library for larger CLI applications.

Simple tools can use the standard `flag` package.

# 44. Games in Go

Go is suitable for small games and simulation projects, especially 2D.

# 45. Ebitengine

Ebitengine provides a practical 2D game loop with:

- `Update`,
- `Draw`,
- `Layout`.

Typical structure:

```go
type Game struct {
    player Player
}

func (g *Game) Update() error {
    return nil
}

func (g *Game) Draw(screen *ebiten.Image) {
}

func (g *Game) Layout(outsideWidth, outsideHeight int) (int, int) {
    return 640, 360
}
```

# 46. Other game libraries

raylib-go — bindings for raylib.

SDL bindings — lower-level multimedia.

Pixel — older 2D library you may encounter.

# 47. CGO

CGO lets Go call C libraries.

It affects portability, cross-compilation and deployment.

Pure-Go dependencies are simpler operationally.

# 48. Common Go idioms

Error handling:

```go
if err != nil {
    return err
}
```

Ignore unused return value:

```go
_, err := io.Copy(dst, src)
```

Constructor-style function:

```go
func NewServer(cfg Config) *Server {
    return &Server{cfg: cfg}
}
```

Compile-time interface check:

```go
var _ Store = (*PostgresStore)(nil)
```

Common names:

- `New...`,
- `Must...`,
- `With...`.

# 49. Syntax that looks unusual

```go
:=                    // short declaration
&User{}               // pointer to struct
*User                 // pointer type
[]User                // slice of values
[]*User               // slice of pointers
map[string]User       // map
chan Result           // bidirectional channel
<-chan Result         // receive-only
chan<- Result         // send-only
func() error          // function type
...string             // variadic
struct{}              // zero-size struct
map[string]any        // dynamic map
```

# 50. Reading an unfamiliar Go project

1. find `go.mod`,
2. find `package main`,
3. inspect what `main()` constructs,
4. identify handlers/services/repositories,
5. read structs,
6. read interfaces,
7. find HTTP routes,
8. identify goroutines,
9. identify I/O,
10. run tests.

# 51. Mini backend example

```go
package main

import (
    "encoding/json"
    "net/http"
)

func main() {
    mux := http.NewServeMux()

    mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
    })

    http.ListenAndServe(":8080", mux)
}
```

# 52. Mini game structure

```text
cmd/game/main.go
internal/game/game.go
internal/game/player.go
assets/
```

Keep game state inside a small number of explicit structures.

# 53. Command cheat sheet

Project:

```bash
go run .
go build .
go build ./...
go test ./...
```

Dependencies:

```bash
go get MODULE
go mod tidy
go list -m all
go mod why MODULE
```

Quality:

```bash
gofmt -w .
go vet ./...
go test -race ./...
```

# 54. Syntax cheat sheet

```go
x := 1
const Max = 10

items := []string{"a", "b"}
users := map[string]User{}

type User struct {
    Name string
}

func Load(id int64) (*User, error) {
    return nil, nil
}

func (u *User) Rename(name string) {
    u.Name = name
}

type Store interface {
    Get(id int64) (*User, error)
}

go worker()
```

# 55. What to know now vs later

Know well:

- variables and types,
- slices/maps/structs,
- pointers,
- functions/methods,
- interfaces,
- error handling,
- packages/modules,
- build/test commands,
- basic goroutines/channels,
- HTTP and JSON.

Understand generally:

- context,
- synchronization,
- database access,
- generics,
- CGO.

Know that they exist:

- advanced reflection,
- unsafe,
- compiler internals,
- complex generic metaprogramming.

# 56. Further documentation

Official:

- https://go.dev/doc/
- https://pkg.go.dev/
- https://go.dev/tour/

Backend:

- standard `net/http`,
- Chi,
- pgx.

Games:

- Ebitengine,
- raylib-go.

# Mental summary

Go code is usually easy to follow if you identify:

```text
package
↓
types
↓
interfaces
↓
constructors
↓
main wiring
↓
handlers/services/repositories
↓
I/O and concurrency
```

# Final practical advice

When reading unfamiliar Go, do not start from every function. Start from `go.mod`, `main()`, public types and interfaces, then follow the data flow.
