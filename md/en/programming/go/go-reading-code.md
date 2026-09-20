---
id: "doc-020"
title: "Go — Reading Code"
slug: "go-reading-code"
description: "Go is deliberately small, explicit and convention-heavy. Read code in terms of packages, structs, interfaces, functions and data flow rather than searching…"
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "go"
  - "golang"
---

# Go — Reading Code
## Table of Contents
# 1. How to think about Go
Go is deliberately small, explicit and convention-heavy. Read code in terms of packages, structs, interfaces, functions and data flow rather than searching for framework magic.
# 2. Installation and tools
### Debian
```bash
sudo apt install golang
go version
```
### FreeBSD
```sh
pkg install go
go version
```
### Editor
Any editor works. Neovim, Vim and VS Code with gopls are common choices.
# 3. First program and file anatomy
```go
package main

import "fmt"

func main() {
    fmt.Println("hello")
}
```
## `package main`
Marks an executable package.
## `import "fmt"`
Imports the standard fmt package.
## `func main()`
Entry point of an executable program.
# 4. Syntax — the most important rules
## Code blocks
Curly braces delimit blocks.
## Semicolons
Normally omitted; the lexer inserts them automatically.
## Comments
Use `//` for line comments and `/* ... */` for block comments.
## Names
Exported identifiers begin with an uppercase letter; unexported identifiers begin with lowercase.
# 5. Variables, constants and zero values
## Full declaration
```go
var count int = 10
```
## Short declaration `:=`
```go
count := 10
```
Valid inside functions.
## Multiple values
```go
name, age := "Ada", 30
```
## Constants
```go
const MaxRetries = 3
```
## Zero values
Numbers become 0, booleans false, strings empty, pointers/maps/slices/functions/interfaces nil where applicable.
# 6. Basic data types
## Integers
Common types: int, int8/16/32/64 and unsigned variants.
## Floating-point numbers
Use float32 or float64; float64 is the common default.
## Boolean
```go
var ok bool
```
## Character aliases
`byte` is alias for uint8; `rune` is alias for int32.
## Named types
```go
type UserID int64
```
Named types improve domain clarity and are distinct from their underlying type.
# 7. String, byte and rune
Strings are immutable byte sequences, usually UTF-8 text.
## UTF-8
Range over a string to iterate Unicode code points:
```go
for i, r := range s {
    fmt.Println(i, r)
}
```
# 8. Arrays, slices and maps
## Array
```go
var a [3]int
```
Array length is part of the type.
## Slice
```go
items := []string{"a", "b"}
items = append(items, "c")
```
### Important
Slices are descriptors over backing arrays; copying a slice does not necessarily copy underlying data.
## Map
```go
m := map[string]int{"a": 1}
v, ok := m["a"]
```
# 9. Struct — the basic data building block
```go
type User struct {
    ID   int64
    Name string
}
```
## Nesting
A struct can contain another struct as a named field.
## Embedding
```go
type Admin struct {
    User
    Level int
}
```
Embedding promotes fields/methods but is composition, not inheritance.
# 10. Pointers
```go
p := &user
fmt.Println(p.Name)
```
## Why pointers?
Use pointers to share/mutate a value, avoid large copies, or represent optional identity/reference semantics.
## `nil`
A pointer can be nil. Check before dereferencing when nil is possible.
# 11. Control statements
## `if`
```go
if err != nil {
    return err
}
```
## `else`
Go keeps braces explicit and discourages deeply nested logic through early returns.
## `switch`
```go
switch status {
case "ready":
    ...
default:
    ...
}
```
## `for`
Go has one loop keyword: `for`. It covers classic loops, while loops and range loops.
# 12. Functions
```go
func Add(a, b int) int { return a + b }
```
## Multiple return values
```go
func Lookup(id int) (User, error)
```
## Named return values
Allowed, but use sparingly when they genuinely improve clarity.
## Function as a value
```go
f := strings.ToUpper
```
## Function as an argument
Callbacks and higher-order helpers accept function values.
## Function as a result
Functions can return closures.
## Variadic
```go
func Sum(values ...int) int
```
# 13. Methods and receivers
## Value receiver
```go
func (u User) Label() string { return u.Name }
```
## Pointer receiver
```go
func (u *User) Rename(name string) { u.Name = name }
```
Use when mutating receiver or avoiding copies.
# 14. Interfaces
Interfaces are satisfied implicitly.
## Example
```go
type Reader interface {
    Read([]byte) (int, error)
}
```
## Empty interface
`any` is alias for `interface{}` and can hold any value.
## Type assertion
```go
s, ok := v.(string)
```
## Type switch
```go
switch x := v.(type) {
case string:
    _ = x
}
```
# 15. Generics
Generics parameterize functions/types over sets of types.
## Constraints
```go
func Max[T cmp.Ordered](a, b T) T
```
## Generic type
```go
type Box[T any] struct { Value T }
```
## Generic methods
Methods may use type parameters already declared on the receiver type. Go does not allow methods to introduce their own independent type parameters.
# 16. Errors — `error`
Errors are normal return values.
## Creating an error
```go
errors.New("not found")
fmt.Errorf("load user: %w", err)
```
## Wrapping errors
Use `%w` so callers can inspect the original error with errors.Is/errors.As.
## Sentinel errors
```go
var ErrNotFound = errors.New("not found")
```
## Why is `if err != nil` everywhere?
Because Go makes failure paths explicit instead of hiding them in exceptions.
# 17. `defer`, `panic`, `recover`
## `defer`
Schedules a call when the surrounding function returns. Common for Close/Unlock cleanup.
## `panic`
Abort normal flow for truly exceptional programmer/runtime conditions, not ordinary validation errors.
## `recover`
Can intercept panic inside a deferred function. Usually used at process/request boundaries, not as routine control flow.
# 18. Packages, modules and imports
## File
A `.go` file belongs to exactly one package.
## Package
A directory normally contains source files for one package.
## Module
A module is a versioned collection of packages defined by go.mod.
### Example
```text
example.com/myapp
├── go.mod
├── cmd/server
└── internal/app
```
# 19. Name visibility
Uppercase identifiers are exported from a package; lowercase identifiers are package-private.
# 20. Typical project structure
## `cmd/`
Executable entry points, often one directory per binary.
## `internal/`
Packages importable only within the parent module tree.
## `pkg/`
Optional convention for reusable public packages; not required by Go.
# 21. `go.mod`, `go.sum` and dependencies
## Adding a library
```bash
go get MODULE@VERSION
```
## Tidying dependencies
```bash
go mod tidy
```
## `go.sum`
Contains checksums used to verify module content.
## Module list
```bash
go list -m all
```
## Why does a dependency exist?
```bash
go mod why MODULE
```
## Dependency graph
```bash
go mod graph
```
# 22. Running and compiling
## Run project
```bash
go run .
```
## Specific file
```bash
go run main.go
```
## Build
```bash
go build
```
## Binary name
```bash
go build -o myapp .
```
## Build a specific program
```bash
go build ./cmd/server
```
## All packages
```bash
go build ./...
```
## Install a program
```bash
go install example.com/tool@latest
```
# 23. Cross-compilation
```bash
GOOS=linux GOARCH=amd64 go build .
```
## Important: CGO
Pure Go cross-compiles easily. CGO introduces native compiler/library requirements.
# 24. Formatting and code analysis
## `gofmt`
```bash
gofmt -w .
```
Canonical formatting is part of Go culture.
## `go vet`
```bash
go vet ./...
```
## `staticcheck`
Third-party static analyzer that catches many bugs and suspicious patterns.
## Practical set
```bash
gofmt -w .
go vet ./...
go test ./...
```
# 25. Tests
## One test
```go
func TestAdd(t *testing.T) {
    if got := Add(2,3); got != 5 { t.Fatalf("got %d", got) }
}
```
## Table-driven tests
Use slices of test cases and loop with `t.Run`.
## HTTP test
Use `net/http/httptest` to test handlers without binding a real port.
# 26. Benchmarks, fuzzing and race detector
## Benchmark
```go
func BenchmarkParse(b *testing.B) {
    for i := 0; i < b.N; i++ { Parse(data) }
}
```
## Coverage
```bash
go test -cover ./...
```
## Race detector
```bash
go test -race ./...
```
## Fuzzing
Use `FuzzXxx(*testing.F)` tests to explore unexpected input automatically.
# 27. Debugging
Delve is the standard Go debugger.
## Simplest debugging
Start with tests/logging and `go test -run TestName -v`; use Delve when state/control flow needs interactive inspection.
# 28. Files, directories and operating system
## Read entire file
```go
data, err := os.ReadFile(path)
```
## Write
```go
err := os.WriteFile(path, data, 0644)
```
## Open file
```go
f, err := os.Open(path)
defer f.Close()
```
## Create directory
```go
err := os.MkdirAll(path, 0755)
```
## Paths
Use `path/filepath` for OS filesystem paths.
## Environment variables
```go
value := os.Getenv("APP_ENV")
```
# 29. JSON
## Encoding
```go
data, err := json.Marshal(v)
```
## Decoding
```go
err := json.Unmarshal(data, &v)
```
## HTTP
Use json.NewEncoder(w).Encode and json.NewDecoder(r.Body).Decode for streams.
## `omitempty`
Omits zero-valued fields during encoding when the tag requests it.
## Ignore field
```go
Secret string `json:"-"`
```
# 30. Time and dates
Use `time.Time`, `time.Duration`, `time.NewTicker`, `time.After` and explicit locations/time zones.
# 31. Logging
Standard library offers `log` and structured `log/slog`. Include useful context, not secrets.
# 32. `context.Context`
Context carries cancellation, deadlines and request-scoped values across API boundaries.
## HTTP request
Incoming requests expose `r.Context()`.
## Timeout
```go
ctx, cancel := context.WithTimeout(parent, 2*time.Second)
defer cancel()
```
## Important rules
Pass context explicitly, usually as the first parameter. Do not store it in structs casually. Always call cancel when you create a cancellable child context.
# 33. Concurrency: goroutines and channels
## Goroutine
```go
go work()
```
## Anonymous function
```go
go func() { defer wg.Done(); work() }()
```
## Channel
```go
ch := make(chan Result)
```
## Buffered channel
```go
ch := make(chan Result, 10)
```
## Close
The sender that owns completion usually closes a channel. Receivers should not close channels they do not own.
## `select`
Wait on multiple channel operations/cancellation cases.
## Channel timeout
```go
select {
case v := <-ch:
    _ = v
case <-time.After(time.Second):
}
```
# 34. Mutex, WaitGroup and atomics
## Mutex
Protect shared mutable state with `sync.Mutex`.
## RWMutex
Useful when many readers and few writers justify the added complexity.
## WaitGroup
Wait for a set of goroutines to finish.
## Atomics
Use `sync/atomic` for simple lock-free counters/state where appropriate.
# 35. HTTP in the standard library
## Handler
Anything implementing `ServeHTTP(http.ResponseWriter,*http.Request)`.
## HandlerFunc
Function adapter for handlers.
## Modern ServeMux
Recent Go versions support richer method/path patterns in `http.ServeMux`.
## Status
```go
w.WriteHeader(http.StatusCreated)
```
## Header
Set headers before writing status/body.
## JSON response
Set `Content-Type: application/json` and encode with json.Encoder.
## Server with configuration
Use `http.Server` with explicit timeouts and graceful shutdown rather than bare `http.ListenAndServe` for production.
# 36. HTML templates and static files
## Template
Use `html/template` for escaped server-side HTML rendering.
## Static files
Use `http.FileServer` or embedded filesystem handlers.
# 37. Embed — package files into the binary
```go
//go:embed templates/*
var files embed.FS
```
# 38. Backend: routers and frameworks
## 1. Standard `net/http`
Excellent default for small/medium services.
## 2. Chi
Lightweight router that stays close to net/http.
## 3. Gin
Feature-rich HTTP framework with its own conventions.
## 4. Echo
Another mature web framework with routing/middleware helpers.
## 5. Fiber
Fast framework inspired by Express, built on fasthttp rather than net/http.
## Mental model
Learn net/http first; frameworks mostly add routing, middleware ergonomics and conventions.
# 39. Databases
## Native pgx
`pgx` is a strong PostgreSQL driver/toolkit.
## Pool
Use `pgxpool.Pool` for concurrent application access.
## `database/sql`
Standard abstraction used by many drivers/tools.
## Transaction
Begin, defer rollback, perform operations, then commit only after all succeed.
# 40. ORM, sqlc and migrations
## GORM
Full ORM; productive but adds abstraction and behavior you need to understand.
## sqlc
Generates type-safe Go code from SQL; good when you want explicit SQL.
## Migrations
Use versioned schema migrations with tools such as golang-migrate, Goose or framework-specific tooling.
# 41. Redis and cache
Use Redis for caching, queues or ephemeral coordination when the architecture needs it. Define expiration and failure behavior explicitly.
# 42. Application configuration
## `.env`
Useful locally, but do not commit real secrets.
## Viper
Popular configuration library supporting files, env vars and multiple formats. Standard library plus explicit config structs are often enough for small apps.
# 43. CLI and tools
## Cobra
Popular framework for larger command-line applications with subcommands and flags.
# 44. Games in Go
Go is suitable for 2D games and tooling. Ecosystem is smaller than Unity/Godot but pleasant for code-first projects.
# 45. Ebitengine — practical 2D game start
Ebitengine provides a cross-platform game loop and graphics/audio/input APIs.
## `Update`
Update game state at fixed ticks.
## `Draw`
Render the current state.
## `Layout`
Define logical screen dimensions.
## Run
```bash
go run .
```
## What belongs in `Game`?
World state, player state, assets/references, timers and systems needed by update/draw.
# 46. raylib-go and other game libraries
## raylib-go
Go bindings for raylib; simple and effective for 2D/3D experiments.
## SDL
Low-level multimedia bindings; powerful but more manual.
## Pixel
Older Go 2D library; useful to recognize in existing projects.
# 47. CGO — when Go uses C
CGO enables calls into C libraries but complicates builds, portability and cross-compilation. Prefer pure Go unless native integration is needed.
# 48. Common Go idioms
## `if err != nil`
Explicit error handling.
## Ignoring a value
```go
_, err := io.Copy(dst, src)
```
## Compile-time interface check
```go
var _ io.Reader = (*MyReader)(nil)
```
## Constructor-like function
`NewClient(...) *Client` is a convention, not a language feature.
## Functional options
`NewServer(WithPort(8080), WithLogger(log))` pattern for configurable constructors.
## `Must...`
Convention for helpers that panic on failure when failure is programmer/startup error.
## `New...`
Convention for constructors.
## `With...`
Convention for options/modifiers.
# 49. Things that look strange but are normal
## `:=`
Short variable declaration.
## `&User{}`
Pointer to a newly constructed User value.
## `*User`
Pointer-to-User type.
## `[]User`
Slice of User values.
## `[]*User`
Slice of pointers to User.
## `map[string]User`
Map string keys to User values.
## `map[string][]User`
Map string keys to slices of users.
## `chan Result`
Bidirectional channel of Result.
## `<-chan Result`
Receive-only channel.
## `chan<- Result`
Send-only channel.
## `func() error`
Function type returning error.
## `func(context.Context, string) (*User, error)`
Function type taking context/string and returning user pointer plus error.
## `...string`
Variadic string parameter.
## `struct{}`
Zero-size empty struct, commonly used as a signal/set value.
## `map[string]any`
Dynamic JSON-like object. Use typed structs when schema is known.
# 50. How to read an unfamiliar Go project
## Step 1 — find `go.mod`
It reveals module path, Go version and top-level dependencies.
## Step 2 — find `package main`
Locate executables, often under cmd/.
## Step 3 — see what `main()` constructs
Follow dependency wiring: config, DB, services, handlers, server.
## Step 4 — recognize layers
### Handler
HTTP/RPC boundary; parses requests and writes responses.
### Service
Business logic/application use cases.
### Repository
Persistence/data access.
## Step 5 — read structs
Struct fields show the application's main data and dependencies.
## Step 6 — read interfaces
Interfaces show boundaries and what implementations are expected to do.
## Step 7 — find HTTP routes
Search for Handle, HandleFunc, router.Get/Post or framework-specific registration.
## Step 8 — find goroutines
Search for `go ` and understand lifecycle/cancellation.
## Step 9 — find I/O
Database, HTTP, filesystem, queues and external APIs are major failure boundaries.
## Step 10 — run tests
```bash
go test ./...
```
# 51. Mini backend — complete shape
```text
cmd/server/main.go
internal/http/handlers.go
internal/service/users.go
internal/repository/postgres.go
internal/model/user.go
```
Main wires dependencies; handlers translate HTTP; services hold business rules; repositories persist data.
# 52. Mini game — structure example
```text
cmd/game/main.go
internal/game/game.go
internal/game/player.go
internal/assets/
```
Keep update/render state together and isolate reusable systems when complexity grows.
# 53. Command cheat sheet
## Project
```bash
go mod init example.com/app
go run .
go build ./...
```
## Dependencies
```bash
go get MODULE
go mod tidy
go mod why MODULE
```
## Quality
```bash
gofmt -w .
go vet ./...
go test -race ./...
```
## Information
```bash
go version
go env
go list ./...
```
# 54. Syntax cheat sheet
## Variable
```go
x := 1
```
## Constant
```go
const N = 10
```
## Slice
```go
xs := []int{1,2,3}
```
## Map
```go
m := map[string]int{}
```
## Struct
```go
type User struct { Name string }
```
## Pointer
```go
p := &u
```
## Function
```go
func Add(a,b int) int
```
## Function with error
```go
func Load() (Data, error)
```
## Method
```go
func (u User) Name() string
```
## Interface
```go
type Store interface { Save(User) error }
```
## `if`
```go
if ok { ... }
```
## `switch`
```go
switch x { case 1: ... }
```
## `for`
```go
for i := 0; i < 10; i++ { }
```
## `range`
```go
for i, v := range xs { _ = i; _ = v }
```
## Error handling
```go
if err != nil { return err }
```
## Goroutine
```go
go work()
```
## Channel
```go
ch := make(chan T)
```
## Context
```go
ctx, cancel := context.WithCancel(parent)
```
## JSON tag
```go
Name string `json:"name"`
```
## Grouped import
```go
import (
    "context"
    "fmt"
 )
```
# 55. What to know now vs later
## You must recognize well
Packages/modules, structs, methods, interfaces, errors, slices/maps, pointers, net/http basics and tests.
## You should understand generally
Contexts, goroutines/channels, DB layers, generics and common project structure.
## You can initially treat as 'I know it exists'
Advanced reflection, unsafe, compiler internals, cgo edge cases and complex lock-free algorithms.
## For web backends
Focus on net/http/chi, context, JSON, PostgreSQL, configuration, logging, testing and graceful shutdown.
## For games
Focus on update loops, input, state, asset management, rendering and your chosen game library.
# 56. Further documentation
## Official Go
https://go.dev/doc/
https://pkg.go.dev/
## Backend
Read net/http, context, database/sql and your chosen router/database driver's documentation.
## Games
Ebitengine: https://ebitengine.org/
Raylib: https://www.raylib.com/
# Mental summary
```text
module
→ packages
→ structs/interfaces/functions
→ explicit errors
→ goroutines/context for concurrency
→ tests + gofmt + go vet
```
# One practical final tip
When reading Go, start from `go.mod` and `main()`, then follow concrete values being constructed. Go code is usually easier to understand by tracing data and interfaces than by reading every file in directory order.
