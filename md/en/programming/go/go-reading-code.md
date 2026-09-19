# Go — Reading Code and Understanding Projects

## 1. Goal

This handbook is for someone who does not necessarily want to become a full-time Go programmer, but wants to:

- read Go code,
- understand data and control flow,
- recognize project structure,
- compile and run projects,
- test them,
- understand packages and modules,
- recognize common backend and game libraries,
- diagnose typical errors.

Go is intentionally small as a language. That makes it unusually friendly for reading unfamiliar code.

## 2. What Go is

Go is a compiled, garbage-collected language created at Google.

It emphasizes:

- simple syntax,
- fast builds,
- explicit error handling,
- concurrency,
- strong standard library,
- straightforward deployment.

A Go program can often be deployed as a single executable binary.

## 3. First program

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello")
}
```

Run:

```bash
go run .
```

Build:

```bash
go build
```

## 4. package

Every Go file begins with a package declaration:

```go
package main
```

or:

```go
package config
```

`package main` with a `main()` function creates an executable.

Other packages provide reusable code.

## 5. imports

```go
import (
    "fmt"
    "net/http"
)
```

Project package:

```go
import "example.com/project/internal/config"
```

Unused imports are compile errors. Go expects clean source files.

## 6. main

Executable entry point:

```go
func main() {
    // ...
}
```

Search in a repository:

```bash
rg 'func main\(\)'
```

A project may have several executables under `cmd/`.

## 7. Variables

Explicit type:

```go
var port int = 8080
```

Inferred:

```go
var port = 8080
```

Short declaration inside functions:

```go
port := 8080
```

## 8. Basic types

Common:

```text
bool
string
int
int64
uint
byte
rune
float64
```

Aliases:

```text
byte = uint8
rune = int32
```

## 9. Constants

```go
const Port = 8080
const AppName = "techhandbook"
```

Constants can be untyped until context requires a concrete type.

## 10. Exported names

Names beginning with an uppercase letter are exported from a package.

```go
func LoadConfig() {}
type Server struct {}
```

Lowercase names are package-private:

```go
func parseConfig() {}
```

This is one of the most important Go conventions.

## 11. Functions

```go
func add(a int, b int) int {
    return a + b
}
```

Shorter parameter syntax:

```go
func add(a, b int) int {
    return a + b
}
```

Multiple return values:

```go
func load() (Config, error) {
    // ...
}
```

## 12. Error handling

A common pattern:

```go
cfg, err := loadConfig()
if err != nil {
    return fmt.Errorf("load config: %w", err)
}
```

Go does not normally use exceptions for ordinary errors.

Errors are values.

## 13. `if`

```go
if port == 8080 {
    fmt.Println("default port")
} else {
    fmt.Println("custom port")
}
```

Initialization in condition:

```go
if err := run(); err != nil {
    log.Fatal(err)
}
```

## 14. `for`

Go has one looping keyword:

```go
for i := 0; i < 10; i++ {
    fmt.Println(i)
}
```

While-style:

```go
for running {
    work()
}
```

Infinite:

```go
for {
    serve()
}
```

## 15. `range`

```go
for i, value := range values {
    fmt.Println(i, value)
}
```

Ignore index:

```go
for _, value := range values {
    fmt.Println(value)
}
```

## 16. switch

```go
switch command {
case "start":
    start()
case "stop":
    stop()
default:
    usage()
}
```

Go does not fall through by default.

## 17. Arrays and slices

Fixed array:

```go
var a [3]int
```

Slice:

```go
values := []int{1, 2, 3}
```

Slices are used far more often than arrays.

Append:

```go
values = append(values, 4)
```

## 18. Maps

```go
users := map[string]int{
    "alice": 1,
    "bob":   2,
}
```

Read:

```go
id := users["alice"]
```

Check presence:

```go
id, ok := users["alice"]
```

## 19. Structs

```go
type User struct {
    ID   int
    Name string
}
```

Create:

```go
u := User{
    ID:   1,
    Name: "Karol",
}
```

Access:

```go
fmt.Println(u.Name)
```

## 20. Methods

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

## 21. Pointers

```go
x := 10
p := &x
fmt.Println(*p)
```

Go has pointers but no pointer arithmetic.

The garbage collector manages most memory lifetime.

## 22. Interfaces

```go
type Writer interface {
    Write([]byte) (int, error)
}
```

A type implements an interface implicitly by providing its methods.

No explicit `implements` keyword is required.

## 23. Empty interface / any

Modern Go:

```go
var value any
```

`any` is an alias for:

```go
interface{}
```

Use concrete types when possible.

## 24. Type assertion

```go
s, ok := value.(string)
```

Type switch:

```go
switch v := value.(type) {
case string:
    fmt.Println(v)
case int:
    fmt.Println(v)
}
```

## 25. Generics

Example:

```go
func First[T any](items []T) T {
    return items[0]
}
```

Constraints define allowed type sets.

You do not need generics to understand most Go projects, but recognize square-bracket type parameters.

## 26. defer

```go
f, err := os.Open("file.txt")
if err != nil {
    return err
}
defer f.Close()
```

Deferred calls run when the surrounding function returns.

Common for cleanup.

## 27. panic and recover

`panic` is for exceptional situations and programmer assumptions, not ordinary error flow.

`recover` can catch a panic in a deferred function.

Most application code should prefer normal errors.

## 28. Goroutines

Start concurrent work:

```go
go process()
```

A goroutine is a lightweight concurrent function execution managed by the Go runtime.

## 29. Channels

```go
ch := make(chan int)

go func() {
    ch <- 42
}()

value := <-ch
```

Channels allow goroutines to communicate.

## 30. select

```go
select {
case value := <-ch:
    fmt.Println(value)
case <-ctx.Done():
    return ctx.Err()
}
```

Used with channels and cancellation.

## 31. context

`context.Context` is important in servers.

It carries:

- cancellation,
- deadlines,
- request-scoped values.

Typical function:

```go
func Fetch(ctx context.Context, id string) error
```

Do not store application state in context casually.

## 32. Concurrency safety

Shared data may require:

- mutexes,
- channels,
- atomic operations,
- single-owner design.

Race bugs can be detected with:

```bash
go test -race ./...
```

## 33. Modules

Modern Go projects use modules.

File:

```text
go.mod
```

Example:

```text
module example.com/myproject

go 1.25
```

Dependencies are listed there.

## 34. go.sum

`go.sum` stores checksums for module content.

Commit it for normal applications.

Do not edit it manually.

## 35. Common module commands

```bash
go mod tidy
go mod download
go list -m all
go env
```

`go mod tidy` adds/removes module requirements based on imports.

Review the diff afterward.

## 36. Typical project structure

Small:

```text
project/
├── go.mod
├── go.sum
├── main.go
└── README.md
```

Larger:

```text
project/
├── cmd/
│   └── app/
│       └── main.go
├── internal/
│   ├── config/
│   ├── http/
│   ├── service/
│   └── repository/
├── migrations/
├── web/
├── go.mod
└── README.md
```

Go does not enforce one project layout.

## 37. internal

Code under an `internal` directory has special import restrictions enforced by the Go toolchain.

It is used for implementation details that should not become public API.

## 38. cmd

A common convention:

```text
cmd/server/main.go
cmd/tool/main.go
```

Each subdirectory can build a separate executable.

## 39. Build

Current package:

```bash
go build
```

All packages:

```bash
go build ./...
```

Specific command:

```bash
go build -o bin/server ./cmd/server
```

## 40. Run

```bash
go run .
```

or:

```bash
go run ./cmd/server
```

`go run` builds a temporary executable and runs it.

For production, build a real binary.

## 41. Cross-compilation

Example:

```bash
GOOS=linux GOARCH=amd64 go build -o app-linux-amd64
```

FreeBSD target:

```bash
GOOS=freebsd GOARCH=amd64 go build -o app-freebsd-amd64
```

Pure-Go projects often cross-compile easily.

CGO dependencies complicate cross-compilation.

## 42. CGO

CGO allows Go to call C code.

Detect settings:

```bash
go env CGO_ENABLED
```

A static-ish pure-Go server build often uses:

```bash
CGO_ENABLED=0 go build
```

but not every project can disable CGO.

## 43. Formatting

Go has an official formatter.

```bash
gofmt -w .
```

or:

```bash
go fmt ./...
```

Do not manually debate formatting that `gofmt` already decides.

## 44. Tests

Test files end with:

```text
_test.go
```

Example:

```go
func TestAdd(t *testing.T) {
    got := Add(2, 3)
    if got != 5 {
        t.Fatalf("got %d, want 5", got)
    }
}
```

Run:

```bash
go test ./...
```

Verbose:

```bash
go test -v ./...
```

## 45. Table-driven tests

Common style:

```go
tests := []struct {
    name string
    in   int
    want int
}{
    {"zero", 0, 0},
    {"one", 1, 2},
}
```

Then iterate with `t.Run`.

Recognizing this pattern helps when reading tests.

## 46. Benchmarks

```go
func BenchmarkFoo(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Foo()
    }
}
```

Run:

```bash
go test -bench=. ./...
```

## 47. Fuzzing

Modern Go supports fuzz tests.

Useful for parsers, validators, and edge cases.

Read the current `testing` package documentation for exact syntax and workflow.

## 48. Static checks

Built-in vet:

```bash
go vet ./...
```

Popular additional linter aggregator:

```text
golangci-lint
```

Security/vulnerability check:

```bash
govulncheck ./...
```

## 49. Documentation

```bash
go doc net/http
go doc http.Server
```

Online package documentation is generated from source comments and API declarations.

## 50. Standard library for web backends

Important packages:

```text
net/http
encoding/json
html/template
database/sql
context
log/slog
os
io
time
crypto/tls
```

The standard library is strong enough to build serious small web applications without a large framework.

## 51. Minimal HTTP server

```go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "hello")
    })

    http.ListenAndServe(":8080", nil)
}
```

Real code must handle the returned error.

## 52. JSON

Encode:

```go
json.NewEncoder(w).Encode(value)
```

Struct tags:

```go
type User struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}
```

Tags in backticks are metadata interpreted by libraries.

## 53. HTML templates

```go
html/template
```

Use `html/template` for HTML, not `text/template`, because it performs contextual escaping.

## 54. Database access

Standard abstraction:

```go
database/sql
```

A driver is still required for the chosen database.

Popular PostgreSQL ecosystem includes:

- pgx,
- database/sql-compatible drivers,
- sqlc for generated typed query code,
- migration tools.

## 55. Web routers/frameworks

Popular options include:

- standard `net/http`,
- Chi,
- Gin,
- Echo,
- Fiber.

For small services, the standard library or a light router is often enough.

Do not assume a framework is mandatory.

## 56. Logging

Modern standard library:

```go
log/slog
```

Structured logs are easier to search:

```go
slog.Info("server started", "port", 8080)
```

## 57. Configuration

Common sources:

- environment variables,
- command-line flags,
- config files.

Standard packages:

```text
os
flag
encoding/json
```

Third-party libraries may support YAML/TOML and richer validation.

## 58. CLI applications

Standard:

```text
flag
```

Popular frameworks:

- Cobra,
- urfave/cli.

For a small command, `flag` may be enough.

## 59. Game development libraries

Go is not the dominant AAA game language, but it has useful 2D/game libraries.

Examples:

- Ebitengine,
- Pixel,
- raylib Go bindings,
- SDL bindings.

Ebitengine is a popular pure-Go-oriented 2D choice.

Always check current project status before selecting a library.

## 60. Backend libraries and tools

Common categories:

- router: Chi/Gin/Echo,
- DB: pgx/sqlc/GORM,
- migrations: golang-migrate/Goose,
- config: standard library/Viper-like tools,
- validation: validator libraries,
- logging: slog/Zerolog/Zap,
- testing: standard `testing`, testify.

Prefer the standard library when it solves the problem cleanly.

## 61. Dependencies

Add:

```bash
go get example.com/module@version
```

Then:

```bash
go mod tidy
```

Do not casually add a dependency for a tiny helper function.

## 62. Workspaces

A `go.work` file can combine several modules during local development.

Useful for multi-module repositories.

Not every project needs it.

## 63. Error wrapping

```go
return fmt.Errorf("load user %s: %w", id, err)
```

This adds context while preserving the underlying error for:

```go
errors.Is
errors.As
```

## 64. Sentinel errors

Example:

```go
var ErrNotFound = errors.New("not found")
```

Then:

```go
if errors.Is(err, ErrNotFound) {
    ...
}
```

## 65. Custom errors

A type can implement:

```go
Error() string
```

to satisfy the `error` interface.

## 66. Nil

`nil` can represent the zero value for:

- pointers,
- slices,
- maps,
- channels,
- functions,
- interfaces.

But an interface containing a typed nil pointer can itself be non-nil.

This is a famous Go subtlety.

## 67. Slice capacity

A slice has:

```text
pointer
length
capacity
```

`append` may allocate a new backing array.

Do not assume references to old backing storage remain connected forever.

## 68. Maps and concurrency

Normal Go maps are not safe for arbitrary concurrent writes.

Use synchronization or a design that avoids shared mutation.

## 69. Interfaces — keep them small

Idiomatic Go often uses small interfaces:

```go
type Reader interface {
    Read([]byte) (int, error)
}
```

Define interfaces where they are consumed rather than creating huge abstract class hierarchies.

## 70. Dependency injection

Go often uses simple constructor parameters:

```go
func NewService(repo Repository, log *slog.Logger) *Service
```

No DI framework is required for many applications.

## 71. HTTP handlers

Typical signature:

```go
func handler(w http.ResponseWriter, r *http.Request)
```

Read:

- URL,
- headers,
- body,
- context.

Write:

- status,
- headers,
- body.

## 72. Middleware

Middleware wraps handlers:

```text
request
→ logging
→ authentication
→ handler
→ response
```

Common for:

- logging,
- request IDs,
- auth,
- rate limits,
- recovery.

## 73. Graceful shutdown

Servers should handle process signals and stop accepting new work before exiting.

Typical building blocks:

- `signal.NotifyContext`,
- `http.Server.Shutdown`,
- context cancellation.

## 74. Environment variables

Read:

```go
value := os.Getenv("APP_ENV")
```

Do not silently accept missing critical configuration unless a default is intentional.

## 75. Files

Read entire file:

```go
data, err := os.ReadFile("config.json")
```

Write:

```go
err := os.WriteFile("out.txt", data, 0644)
```

For large streams, use `io.Reader`/`io.Writer`.

## 76. `io.Reader` and `io.Writer`

These are central interfaces in Go.

Many APIs compose around:

```go
Read(p []byte) (n int, err error)
Write(p []byte) (n int, err error)
```

Understanding them helps with files, HTTP, compression, encryption, and buffers.

## 77. Reflection

Package:

```text
reflect
```

Used by:

- serializers,
- ORMs,
- validators,
- generic infrastructure.

Application code should not use reflection when ordinary typed code is clearer.

## 78. Embedding

```go
type Server struct {
    *http.Server
    Logger *slog.Logger
}
```

Embedded fields promote methods/fields.

This is composition, not classical inheritance.

## 79. init functions

```go
func init() {
    ...
}
```

Run before `main` for package initialization.

Overuse can hide control flow.

Prefer explicit initialization for important application setup.

## 80. Build tags

Example:

```go
//go:build linux
```

Used for platform-specific files or build variants.

Common in portable Debian/FreeBSD code.

## 81. File naming by platform

Go recognizes suffixes such as:

```text
file_linux.go
file_freebsd.go
file_windows.go
```

Only matching files are compiled for a target.

## 82. Environment inspection

```bash
go version
go env
go env GOOS GOARCH GOPATH GOMOD
```

## 83. GOPATH today

Modules reduced the importance of GOPATH for project layout.

You usually do **not** need to place modern projects under:

```text
$GOPATH/src
```

## 84. Installing Go tools

```bash
go install example.com/tool@latest
```

Installed binaries commonly go to:

```text
$GOBIN
```

or:

```text
$GOPATH/bin
```

## 85. Reading an unfamiliar project

Start with:

```text
README.md
go.mod
cmd/
internal/
main functions
tests
configuration
```

Commands:

```bash
go list ./...
go test ./...
go build ./...
rg 'func main\('
```

## 86. Diagnosing compile errors

Go compiler messages are usually direct.

Typical issues:

- unused import,
- undefined identifier,
- wrong type,
- wrong number of return values,
- module dependency missing,
- interface not implemented.

Read the first meaningful error, not only the last line.

## 87. Stack traces

A panic prints goroutine stacks.

Read:

1. panic message,
2. first application frame,
3. file and line,
4. call chain.

Run with a debugger if needed.

## 88. Delve

Go debugger:

```text
dlv
```

Typical:

```bash
dlv debug
```

or:

```bash
dlv test ./path/package
```

Editors integrate with Delve.

## 89. Profiling

Standard library:

```text
runtime/pprof
net/http/pprof
```

Useful for:

- CPU,
- heap,
- goroutines,
- blocking.

Do not publicly expose debugging endpoints without access control.

## 90. Race detector

```bash
go test -race ./...
```

One of the most valuable tools for concurrent Go programs.

## 91. Vulnerability scan

```bash
govulncheck ./...
```

Review whether findings actually affect your code paths.

## 92. Deployment

A simple server deployment:

```text
go build
 ↓
single binary
 ↓
systemd
 ↓
nginx
```

Docker deployment:

```text
multi-stage image
 ↓
container
 ↓
nginx/load balancer
```

Both are valid.

## 93. Static assets

A Go application may:

- serve files from disk,
- embed them into the binary using `embed`,
- let nginx/CDN serve them.

Example:

```go
//go:embed web/*
var webFS embed.FS
```

## 94. Database migrations

Keep schema changes versioned.

Typical directory:

```text
migrations/
  001_init.sql
  002_add_status.sql
```

Migration tools vary.

Do not hide irreversible production changes inside application startup without a plan.

## 95. Common mistakes

- ignoring returned errors,
- using `panic` for normal failures,
- creating goroutines with no shutdown path,
- forgetting context cancellation,
- data races,
- overengineering interfaces,
- adding large frameworks without need,
- not running `gofmt`,
- not checking `go test -race`.

## 96. What to memorize

```bash
go run .
go build ./...
go test ./...
go test -race ./...
go fmt ./...
go vet ./...
go mod tidy
go env
govulncheck ./...
```

## 97. Mental model for reading Go

When opening a file, ask:

```text
Which package?
What is exported?
Which structs define the data?
Which interfaces define behavior?
Where do errors go?
Where are goroutines started?
How is cancellation handled?
What does this function return?
```

## 98. Minimal backend toolkit

For a small web application:

```text
net/http
html/template
encoding/json
database/sql or pgx
context
log/slog
testing
```

Add third-party libraries only where they clearly improve the solution.

## 99. Minimal game toolkit

For experimentation:

```text
Ebitengine or another maintained Go game library
+ standard library
+ simple asset pipeline
```

Go is excellent for small 2D projects and tooling, even though it is not the mainstream language for large commercial game engines.

## 100. Summary

You can understand a large amount of Go by learning a small set of ideas:

```text
package
struct
function
interface
error
slice/map
goroutine/channel
context
module
test
```

Then use the toolchain:

```text
go fmt
go test
go build
go vet
```

Go's simplicity is a feature: read the code from the entry point outward and let the compiler help you.
