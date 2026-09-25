---
id: "doc-058"
title: "20 modern programming languages worth knowing"
slug: "20-modern-programming-languages-worth-knowing"
description: "A practical overview of 20 modern programming languages: use cases, installation on Windows, macOS and Linux, running, compiling, and the same small program implemented in each language."
lang: "en"
audience: "standard"
published: "2026-09-25"
updated: "2026-09-25"
tags:
  - "programming"
  - "languages"
  - "python"
  - "javascript"
  - "typescript"
  - "java"
  - "c"
  - "cpp"
  - "csharp"
  - "go"
  - "rust"
---

# 20 modern programming languages worth knowing

There is no single “best programming language.” Python, JavaScript, C, Go, or Rust solve different kinds of problems, run in different environments, and make different trade-offs.

This article is not a ranking from best to worst. It is a **practical cross-section of 20 languages that are genuinely used professionally in 2026 or still have an active and meaningful niche**.

For each language, we will look at:

- what it is,
- who develops it,
- what it is commonly used for,
- how to install the environment on **Windows**,
- how to install it on **macOS**,
- how to install it on **Linux**, using Debian as the main example,
- how to verify the installation,
- how to run or compile a program,
- how the same simple **“guess a number from 0 to 100”** game looks in that language.

Using the same example everywhere makes it much easier to compare syntax and tooling.

> This article is an overview, not a full course. Wherever TechHandbook already has a dedicated guide, you will find a direct link to the more detailed material.

Useful general references:

- [Debian - desktop and server](techhandbook:doc-033)
- [Debian - shell](techhandbook:doc-027)
- [Visual Studio Code](techhandbook:doc-039)
- [GitHub](techhandbook:doc-014)

---

# Quick map

| Language | Typical uses | Typical execution model |
|---|---|---|
| Python | AI, data, automation, backend | interpreter / bytecode |
| JavaScript | browser, frontend, Node.js | VM / JIT |
| TypeScript | large web applications, Node.js | compiled to JavaScript |
| Java | enterprise, backend, JVM | JVM bytecode / JIT |
| C | systems, embedded, libraries | machine code |
| C++ | games, engines, high-performance applications | machine code |
| C# | .NET, backend, desktop, Unity | IL + .NET runtime |
| Go | backend, infrastructure, CLI | machine code |
| Rust | systems, CLI, infrastructure | machine code |
| PHP | web backend, CMS platforms | interpreter / VM / JIT |
| Kotlin | Android, JVM, backend | JVM bytecode / other targets |
| Swift | Apple platforms, native applications, CLI | machine code |
| Dart | Flutter | JIT / AOT |
| Ruby | web, Rails, scripting | interpreter / VM |
| R | statistics, data analysis | interpreter |
| Scala | JVM, big data, backend | JVM bytecode |
| Lua | games, embedded scripting | interpreter / VM |
| Julia | science, numerical computing | JIT |
| Elixir | concurrent backend, real-time systems | BEAM bytecode |
| Solidity | EVM smart contracts | EVM bytecode |

---

# Before we start: three ways to “install a language”

In practice, programming environments are installed in several different ways.

## 1. System package

Debian example:

```bash
sudo apt install python3
```

Advantage: simple and well integrated with the operating system.

Disadvantage: the version shipped by a stable distribution may be older than the newest upstream release.

## 2. Official installer or SDK

Windows example:

```text
download installer -> run it -> add tools to PATH
```

This is common for JDKs, Go, Swift, .NET, and many other ecosystems.

## 3. Version manager

Examples:

```text
rustup
juliaup
SDKMAN!
Coursier
```

This is useful when you want multiple language versions or easy toolchain upgrades.

---

# 1. Python

## What is it?

Python is a dynamically typed high-level language designed with readability in mind.

It is developed by the Python Software Foundation and the Python core developer community.

## Where is it used?

- AI and machine learning,
- data analysis,
- automation,
- backend development,
- testing,
- scripting,
- administration,
- learning programming.

More detail:

[Python - basics](techhandbook:doc-023)

## Installation - Windows

The simplest route is the official installer:

https://www.python.org/downloads/windows/

During installation it is worth enabling:

```text
Add python.exe to PATH
```

On newer Windows systems, you can also use `winget` if the package is available:

```powershell
winget search Python.Python
```

Verify:

```powershell
python --version
```

or:

```powershell
py --version
```

## Installation - macOS

You can use the official installer from python.org or Homebrew:

```bash
brew install python
```

Verify:

```bash
python3 --version
```

## Installation - Linux / Debian

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

Verify:

```bash
python3 --version
```

## Running a program

File:

```text
guess.py
```

Windows:

```powershell
python guess.py
```

Linux/macOS:

```bash
python3 guess.py
```

Python normally does not produce a native executable. The source is executed by the Python runtime.

## Guess the number

```python
import random

secret = random.randint(0, 100)

while True:
    try:
        guess = int(input("Enter a number from 0 to 100: "))
    except ValueError:
        print("Enter a valid number.")
        continue

    if guess < secret:
        print("Too low!")
    elif guess > secret:
        print("Too high!")
    else:
        print("Correct!")
        break
```

---

# 2. JavaScript

## What is it?

JavaScript is the primary programming language of web browsers.

The language standard is ECMAScript and is developed through TC39. Popular JavaScript engines include V8, SpiderMonkey, and JavaScriptCore.

Outside the browser, JavaScript is commonly run with Node.js.

More detail:

- [JavaScript - handbook](techhandbook:doc-021)
- [Node.js](techhandbook:doc-022)

## Where is it used?

- web frontend,
- SPA applications,
- Node.js,
- APIs,
- serverless,
- desktop applications,
- browser extensions,
- developer tooling.

## Installation - Windows

For JavaScript outside the browser, install Node.js:

https://nodejs.org/

The current LTS version is usually the best default.

Verify:

```powershell
node --version
npm --version
```

You can also use a Node version manager, such as nvm-windows.

## Installation - macOS

Homebrew:

```bash
brew install node
```

Verify:

```bash
node --version
npm --version
```

For project work, a version manager such as `nvm`, `fnm`, or `volta` is often useful.

## Installation - Linux / Debian

The simplest route:

```bash
sudo apt update
sudo apt install nodejs npm
```

Verify:

```bash
node --version
npm --version
```

Debian's package may be older than the current Node.js LTS release, so project work often benefits from a version manager.

## Running a program

```bash
node guess.js
```

## Guess the number

```javascript
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const secret = Math.floor(Math.random() * 101);

function ask() {
  rl.question("Enter a number from 0 to 100: ", (answer) => {
    const guess = Number(answer);

    if (!Number.isInteger(guess)) {
      console.log("Enter a valid number.");
      ask();
      return;
    }

    if (guess < secret) {
      console.log("Too low!");
      ask();
    } else if (guess > secret) {
      console.log("Too high!");
      ask();
    } else {
      console.log("Correct!");
      rl.close();
    }
  });
}

ask();
```

---

# 3. TypeScript

## What is it?

TypeScript is a Microsoft-developed superset of JavaScript.

It adds, among other things:

- static typing,
- interfaces,
- generics,
- better code analysis,
- earlier detection of many errors.

TypeScript is normally transformed into JavaScript before execution.

## Where is it used?

- React,
- Angular,
- Vue,
- Node.js,
- large frontend applications,
- backend services,
- libraries,
- developer tools.

TypeScript uses the Node.js ecosystem, so this guide is relevant:

[Node.js](techhandbook:doc-022)

## Installation - Windows

Install Node.js first:

https://nodejs.org/

Then create a project directory:

```powershell
mkdir ts-guess
cd ts-guess
npm init -y
npm install --save-dev typescript @types/node
```

## Installation - macOS

```bash
brew install node
mkdir ts-guess
cd ts-guess
npm init -y
npm install --save-dev typescript @types/node
```

## Installation - Linux / Debian

```bash
sudo apt update
sudo apt install nodejs npm

mkdir ts-guess
cd ts-guess
npm init -y
npm install --save-dev typescript @types/node
```

## Verify

```bash
npx tsc --version
```

## Compilation

```bash
npx tsc guess.ts --target ES2022 --module commonjs
```

This produces:

```text
guess.js
```

Run it:

```bash
node guess.js
```

## Guess the number

```typescript
import * as readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const secret: number = Math.floor(Math.random() * 101);

function ask(): void {
  rl.question("Enter a number from 0 to 100: ", (answer: string) => {
    const guess: number = Number(answer);

    if (!Number.isInteger(guess)) {
      console.log("Enter a valid number.");
      ask();
      return;
    }

    if (guess < secret) {
      console.log("Too low!");
      ask();
    } else if (guess > secret) {
      console.log("Too high!");
      ask();
    } else {
      console.log("Correct!");
      rl.close();
    }
  });
}

ask();
```

---

# 4. Java

## What is it?

Java is a statically typed language normally executed on the JVM - the Java Virtual Machine.

Source code is compiled to bytecode:

```text
.java -> javac -> .class -> JVM
```

The main open implementation project is OpenJDK.

## Where is it used?

- enterprise backend,
- banking,
- corporate systems,
- large server applications,
- JVM applications,
- existing Android projects.

## Installation - Windows

Install a JDK, for example an OpenJDK build from Eclipse Temurin:

https://adoptium.net/

Verify:

```powershell
java --version
javac --version
```

## Installation - macOS

Homebrew:

```bash
brew install openjdk
```

Verify:

```bash
java --version
javac --version
```

You can also use Temurin or SDKMAN!.

## Installation - Linux / Debian

```bash
sudo apt update
sudo apt install default-jdk
```

Verify:

```bash
java --version
javac --version
```

## Compilation

File:

```text
Guess.java
```

Compile:

```bash
javac Guess.java
```

Result:

```text
Guess.class
```

Run:

```bash
java Guess
```

## Guess the number

```java
import java.util.Random;
import java.util.Scanner;

public class Guess {
    public static void main(String[] args) {
        Random random = new Random();
        Scanner scanner = new Scanner(System.in);

        int secret = random.nextInt(101);

        while (true) {
            System.out.print("Enter a number from 0 to 100: ");

            if (!scanner.hasNextInt()) {
                scanner.next();
                System.out.println("Enter a valid number.");
                continue;
            }

            int guess = scanner.nextInt();

            if (guess < secret) {
                System.out.println("Too low!");
            } else if (guess > secret) {
                System.out.println("Too high!");
            } else {
                System.out.println("Correct!");
                break;
            }
        }

        scanner.close();
    }
}
```

---

# 5. C

## What is it?

C is one of the most important languages in computing history and remains one of the foundations of modern systems software.

It has no garbage collector. The programmer has direct control over memory and data representation.

Full TechHandbook material:

[C - reading, building and debugging projects](techhandbook:doc-019)

## Where is it used?

- operating systems,
- kernels,
- drivers,
- embedded systems,
- firmware,
- microcontrollers,
- libraries,
- Unix tools.

## Installation - Windows

Two common options are:

### Visual Studio Build Tools / MSVC

Install Visual Studio or Build Tools with:

```text
Desktop development with C++
```

Compiler:

```powershell
cl
```

### MSYS2 + GCC

https://www.msys2.org/

After installation, GCC can be used from an MSYS2 environment.

## Installation - macOS

Apple provides Clang in Command Line Tools:

```bash
xcode-select --install
```

Verify:

```bash
clang --version
```

## Installation - Linux / Debian

```bash
sudo apt update
sudo apt install build-essential
```

Verify:

```bash
gcc --version
```

## Compilation

Linux:

```bash
gcc -Wall -Wextra -O2 guess.c -o guess
./guess
```

macOS:

```bash
clang -Wall -Wextra -O2 guess.c -o guess
./guess
```

MSVC:

```powershell
cl /W4 guess.c
.\guess.exe
```

## Guess the number

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
    srand((unsigned)time(NULL));

    int secret = rand() % 101;
    int guess;

    while (1) {
        printf("Enter a number from 0 to 100: ");

        if (scanf("%d", &guess) != 1) {
            return 1;
        }

        if (guess < secret) {
            puts("Too low!");
        } else if (guess > secret) {
            puts("Too high!");
        } else {
            puts("Correct!");
            break;
        }
    }

    return 0;
}
```

---

# 6. C++

## What is it?

C++ grew out of C, but today it is a very large and independent language.

It supports, among other things:

- procedural programming,
- object-oriented programming,
- templates,
- generic programming,
- functional techniques,
- low-level memory control.

The standard is developed by ISO C++ WG21.

## Where is it used?

- games,
- Unreal Engine,
- engines,
- browsers,
- databases,
- desktop applications,
- real-time software,
- high-performance systems.

## Installation - Windows

The most convenient route is Visual Studio or Visual Studio Build Tools.

Select:

```text
Desktop development with C++
```

Verify from a Developer Command Prompt:

```powershell
cl
```

Alternative: MSYS2 + GCC/Clang.

## Installation - macOS

```bash
xcode-select --install
```

Verify:

```bash
clang++ --version
```

## Installation - Linux / Debian

```bash
sudo apt update
sudo apt install build-essential
```

Verify:

```bash
g++ --version
```

## Compilation

Linux:

```bash
g++ -std=c++20 -Wall -Wextra -O2 guess.cpp -o guess
./guess
```

macOS:

```bash
clang++ -std=c++20 -Wall -Wextra -O2 guess.cpp -o guess
./guess
```

Windows / MSVC:

```powershell
cl /std:c++20 /EHsc guess.cpp
.\guess.exe
```

## Guess the number

```cpp
#include <iostream>
#include <random>

int main() {
    std::random_device rd;
    std::mt19937 generator(rd());
    std::uniform_int_distribution<int> distribution(0, 100);

    const int secret = distribution(generator);
    int guess = 0;

    while (true) {
        std::cout << "Enter a number from 0 to 100: ";

        if (!(std::cin >> guess)) {
            return 1;
        }

        if (guess < secret) {
            std::cout << "Too low!\n";
        } else if (guess > secret) {
            std::cout << "Too high!\n";
        } else {
            std::cout << "Correct!\n";
            break;
        }
    }
}
```

---

# 7. C#

## What is it?

C# is the main language of the .NET platform.

It is developed by Microsoft together with the wider .NET community.

Code is compiled to IL and then executed by the .NET runtime.

## Where is it used?

- ASP.NET Core,
- backend,
- business applications,
- desktop software,
- Azure,
- Unity,
- server tools.

## Installation - Windows

Official .NET SDK:

https://dotnet.microsoft.com/download

You can also use `winget`:

```powershell
winget search Microsoft.DotNet.SDK
```

Verify:

```powershell
dotnet --version
```

## Installation - macOS

Use the official .NET installer or Homebrew:

```bash
brew install --cask dotnet-sdk
```

Verify:

```bash
dotnet --version
```

## Installation - Linux / Debian

Microsoft publishes official repositories for supported Debian releases.

After adding the Microsoft repository, install an SDK version, for example:

```bash
sudo apt update
sudo apt install dotnet-sdk-10.0
```

Verify:

```bash
dotnet --version
dotnet --list-sdks
```

> The exact package number depends on the current .NET version and Debian release. Check the current Microsoft instructions before installing.

## Create a project

```bash
dotnet new console -n Guess
cd Guess
```

Place the code in:

```text
Program.cs
```

Run:

```bash
dotnet run
```

Build:

```bash
dotnet build
```

Publish:
```bash
dotnet publish -c Release
```

## Guess the number

```csharp
int secret = Random.Shared.Next(0, 101);

while (true)
{
    Console.Write("Enter a number from 0 to 100: ");

    if (!int.TryParse(Console.ReadLine(), out int guess))
    {
        Console.WriteLine("Enter a valid number.");
        continue;
    }

    if (guess < secret)
    {
        Console.WriteLine("Too low!");
    }
    else if (guess > secret)
    {
        Console.WriteLine("Too high!");
    }
    else
    {
        Console.WriteLine("Correct!");
        break;
    }
}
```

---

# 8. Go

## What is it?

Go is a compiled language created at Google.

It emphasizes:

- simplicity,
- fast compilation,
- easy network programming,
- concurrency,
- convenient deployment as standalone binaries.

More detail:

[Go - reading code](techhandbook:doc-020)

## Where is it used?

- backend,
- APIs,
- microservices,
- cloud,
- DevOps,
- CLI tools,
- networking,
- infrastructure.

## Installation - Windows

Official installer:

https://go.dev/dl/

Verify:

```powershell
go version
```

## Installation - macOS

Use the official package from go.dev or:

```bash
brew install go
```

Verify:

```bash
go version
```

## Installation - Linux / Debian

Simplest route:

```bash
sudo apt update
sudo apt install golang-go
```

Verify:

```bash
go version
```

The Debian package may be older. The newest toolchain can be installed from:

https://go.dev/dl/

## Running

Without producing a final binary:

```bash
go run guess.go
```

Compile:

```bash
go build -o guess guess.go
```

Windows produces:

```text
guess.exe
```

Linux/macOS:

```bash
./guess
```

## Guess the number

```go
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	secret := rand.Intn(101)

	for {
		var guess int

		fmt.Print("Enter a number from 0 to 100: ")

		if _, err := fmt.Scan(&guess); err != nil {
			fmt.Println("Input error.")
			return
		}

		if guess < secret {
			fmt.Println("Too low!")
		} else if guess > secret {
			fmt.Println("Too high!")
		} else {
			fmt.Println("Correct!")
			break
		}
	}
}
```

---

# 9. Rust

## What is it?

Rust is a systems language focused on performance and memory safety.

Its most distinctive ideas are:

- ownership,
- borrowing,
- lifetimes.

Many errors that would appear at runtime in C or C++ are rejected during compilation.

## Where is it used?

- CLI tools,
- systems software,
- infrastructure,
- networking,
- WebAssembly,
- high-performance components,
- libraries,
- parts of operating systems.

## Installation - Windows

Official method:

https://rustup.rs/

Download and run:

```text
rustup-init.exe
```

On Windows, Rust may require Visual Studio Build Tools.

Verify:

```powershell
rustc --version
cargo --version
```

## Installation - macOS

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Then:

```bash
source "$HOME/.cargo/env"
```

## Installation - Linux / Debian

Same as other Unix-like systems:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Then:

```bash
source "$HOME/.cargo/env"
```

Verify:

```bash
rustc --version
cargo --version
```

## Project

```bash
cargo new guess
cd guess
cargo add rand
```

Code goes into:

```text
src/main.rs
```

Run:

```bash
cargo run
```

Release build:

```bash
cargo build --release
```

## Guess the number

```rust
use rand::Rng;
use std::io;

fn main() {
    let secret = rand::rng().random_range(0..=100);

    loop {
        println!("Enter a number from 0 to 100:");

        let mut input = String::new();

        io::stdin()
            .read_line(&mut input)
            .expect("Failed to read input");

        let guess: i32 = match input.trim().parse() {
            Ok(number) => number,
            Err(_) => {
                println!("Enter a valid number.");
                continue;
            }
        };

        if guess < secret {
            println!("Too low!");
        } else if guess > secret {
            println!("Too high!");
        } else {
            println!("Correct!");
            break;
        }
    }
}
```

---

# 10. PHP

## What is it?

PHP was designed primarily for server-side web applications.

Modern PHP includes:

- classes,
- interfaces,
- types,
- exceptions,
- attributes,
- frameworks,
- the Composer package manager.

## Where is it used?

- WordPress,
- Drupal,
- Magento,
- Laravel,
- Symfony,
- CMS platforms,
- e-commerce,
- web backends.

## Installation - Windows

Download official binaries:

https://windows.php.net/download/

After extracting them, add the directory containing `php.exe` to `PATH`.

Verify:

```powershell
php --version
```

Bundles such as XAMPP are also popular, but for CLI learning the standalone PHP runtime is enough.

## Installation - macOS

Homebrew:

```bash
brew install php
```

Verify:

```bash
php --version
```

## Installation - Linux / Debian

```bash
sudo apt update
sudo apt install php-cli
```

Verify:

```bash
php --version
```

## Running

```bash
php guess.php
```

## Guess the number

```php
<?php

$secret = random_int(0, 100);

while (true) {
    $input = readline("Enter a number from 0 to 100: ");

    if (!is_numeric($input)) {
        echo "Enter a valid number.\n";
        continue;
    }

    $guess = (int) $input;

    if ($guess < $secret) {
        echo "Too low!\n";
    } elseif ($guess > $secret) {
        echo "Too high!\n";
    } else {
        echo "Correct!\n";
        break;
    }
}
```

---

# 11. Kotlin

## What is it?

Kotlin is a modern statically typed language developed by JetBrains.

It most commonly targets the JVM, but can also compile to JavaScript and native code.

## Where is it used?

- Android,
- JVM backend,
- multiplatform applications,
- modern projects replacing parts of Java codebases.

## Installation - Windows

The official Kotlin documentation recommends a manual command-line compiler installation on Windows.

Download Kotlin Compiler from:

https://github.com/JetBrains/kotlin/releases

Extract it and add:

```text
kotlinc\bin
```

to `PATH`.

You also need a JDK.

Verify:

```powershell
kotlinc -version
```

## Installation - macOS

Convenient via SDKMAN!:

```bash
sdk install kotlin
```

or Homebrew:

```bash
brew install kotlin
```

A JDK is required.

## Installation - Linux / Debian

Install Java first:

```bash
sudo apt update
sudo apt install default-jdk
```

Then install SDKMAN! and run:

```bash
sdk install kotlin
```

Verify:

```bash
kotlinc -version
```

## Compilation

```bash
kotlinc guess.kt -include-runtime -d guess.jar
```

Run:

```bash
java -jar guess.jar
```

## Guess the number

```kotlin
import kotlin.random.Random

fun main() {
    val secret = Random.nextInt(0, 101)

    while (true) {
        print("Enter a number from 0 to 100: ")

        val guess = readln().toIntOrNull()

        if (guess == null) {
            println("Enter a valid number.")
            continue
        }

        when {
            guess < secret -> println("Too low!")
            guess > secret -> println("Too high!")
            else -> {
                println("Correct!")
                break
            }
        }
    }
}
```

---

# 12. Swift

## What is it?

Swift was created by Apple as a modern successor to Objective-C.

It is statically typed, compiled, and developed as an open-source project.

Swift runs not only on macOS - official toolchains are also available for Linux and Windows.

## Where is it used?

- iOS,
- macOS,
- iPadOS,
- watchOS,
- tvOS,
- CLI tools,
- some backend services.

## Installation - Windows

Swift has official Windows support.

Install the required Visual Studio components and then the Swift toolchain. The official instructions support installation through WinGet.

Documentation:

https://www.swift.org/install/windows/

Verify:

```powershell
swift --version
```

## Installation - macOS

For Apple platform applications, the standard environment is Xcode.

You can also use the official `swiftly` tool.

Documentation:

https://www.swift.org/install/macos/

Verify:

```bash
swift --version
```

## Installation - Linux / Debian

Swift.org provides official Debian instructions:

https://www.swift.org/install/linux/debian/

Modern installation can use `swiftly`.

Verify:

```bash
swift --version
```

## Running

Run directly:

```bash
swift guess.swift
```

Compile:

```bash
swiftc guess.swift -o guess
```

Linux/macOS:

```bash
./guess
```

Windows:

```powershell
.\guess.exe
```

## Guess the number

```swift
let secret = Int.random(in: 0...100)

while true {
    print("Enter a number from 0 to 100: ", terminator: "")

    guard let line = readLine(),
          let guess = Int(line) else {
        print("Enter a valid number.")
        continue
    }

    if guess < secret {
        print("Too low!")
    } else if guess > secret {
        print("Too high!")
    } else {
        print("Correct!")
        break
    }
}
```

---

# 13. Dart

## What is it?

Dart is a general-purpose language developed by Google.

It is most strongly associated with Flutter.

## Where is it used?

- Flutter,
- Android,
- iOS,
- desktop,
- web,
- cross-platform applications,
- CLI tools.

## Installation - Windows

Official documentation:

https://dart.dev/get-dart

You can install the standalone Dart SDK or Flutter SDK, which already includes Dart.

Verify:

```powershell
dart --version
```

## Installation - macOS

Using Homebrew:

```bash
brew tap dart-lang/dart
brew install dart
```

If you install Flutter, Dart is already included.

## Installation - Linux / Debian

Dart publishes an official APT repository.

Check the current repository setup instructions at:

https://dart.dev/get-dart

After configuring it:

```bash
sudo apt update
sudo apt install dart
```

Verify:

```bash
dart --version
```

## Running

```bash
dart run guess.dart
```

Compile to an executable:

```bash
dart compile exe guess.dart -o guess
```

## Guess the number

```dart
import 'dart:io';
import 'dart:math';

void main() {
  final secret = Random().nextInt(101);

  while (true) {
    stdout.write('Enter a number from 0 to 100: ');

    final input = stdin.readLineSync();
    final guess = int.tryParse(input ?? '');

    if (guess == null) {
      print('Enter a valid number.');
      continue;
    }

    if (guess < secret) {
      print('Too low!');
    } else if (guess > secret) {
      print('Too high!');
    } else {
      print('Correct!');
      break;
    }
  }
}
```

---

# 14. Ruby

## What is it?

Ruby is a dynamic language created by Yukihiro “Matz” Matsumoto.

It places a strong emphasis on readability and programmer convenience.

## Where is it used?

- Ruby on Rails,
- web applications,
- scripting,
- automation,
- existing business systems.

## Installation - Windows

The easiest option is RubyInstaller:

https://rubyinstaller.org/

Verify:

```powershell
ruby --version
gem --version
```

## Installation - macOS

The system Ruby should not be treated as a project environment.

A simple option:

```bash
brew install ruby
```

For multiple projects, `rbenv` or `asdf` is often better.

## Installation - Linux / Debian

For simple experiments:

```bash
sudo apt update
sudo apt install ruby-full
```

Verify:

```bash
ruby --version
```

Project work often uses a version manager.

## Running

```bash
ruby guess.rb
```

## Guess the number

```ruby
secret = rand(0..100)

loop do
  print "Enter a number from 0 to 100: "

  input = gets
  break if input.nil?

  begin
    guess = Integer(input)
  rescue ArgumentError
    puts "Enter a valid number."
    next
  end

  if guess < secret
    puts "Too low!"
  elsif guess > secret
    puts "Too high!"
  else
    puts "Correct!"
    break
  end
end
```

---

# 15. R

## What is it?

R is a language and environment designed mainly for statistical computing and data analysis.

It is developed by the R Core Team and the R Foundation.

## Where is it used?

- statistics,
- data science,
- bioinformatics,
- econometrics,
- research,
- visualization,
- reporting.

## Installation - Windows

Download the installer from CRAN:

https://cran.r-project.org/

Choose:

```text
Download R for Windows
```

Verify:

```powershell
R --version
```

## Installation - macOS

CRAN provides a `.pkg` installer.

You can also use Homebrew:

```bash
brew install r
```

## Installation - Linux / Debian

Simplest route:

```bash
sudo apt update
sudo apt install r-base
```

Verify:

```bash
R --version
```

CRAN also publishes repositories for users who need a newer version than the one included in stable Debian.

## Running

Interactive console:

```bash
R
```

Script:

```bash
Rscript guess.R
```

## Guess the number

```r
secret <- sample(0:100, 1)

repeat {
  input <- readline("Enter a number from 0 to 100: ")
  guess <- suppressWarnings(as.integer(input))

  if (is.na(guess)) {
    cat("Enter a valid number.\n")
    next
  }

  if (guess < secret) {
    cat("Too low!\n")
  } else if (guess > secret) {
    cat("Too high!\n")
  } else {
    cat("Correct!\n")
    break
  }
}
```

---

# 16. Scala

## What is it?

Scala is a statically typed language that primarily runs on the JVM.

It combines:

- object-oriented programming,
- functional programming,
- a sophisticated type system.

## Where is it used?

- JVM backend,
- distributed systems,
- big data,
- Apache Spark,
- functional applications.

## Installation - Windows

The officially recommended route uses Coursier:

https://www.scala-lang.org/download/

Coursier can install:
- a JVM,
- Scala CLI,
- the main Scala tools.

Verify:

```powershell
scala -version
```

## Installation - macOS

A simple route:

```bash
brew install coursier/formulas/coursier
cs setup
```

## Installation - Linux / Debian

For x86-64:

```bash
curl -fL https://github.com/coursier/coursier/releases/latest/download/cs-x86_64-pc-linux.gz | gzip -d > cs
chmod +x cs
./cs setup
```

After restarting the shell:

```bash
scala -version
```

## Running

Modern Scala tooling allows direct file execution:

```bash
scala run guess.scala
```

Larger projects commonly use:

- sbt,
- Mill,
- Scala CLI.

## Guess the number

```scala
import scala.io.StdIn
import scala.util.Random

@main def guess(): Unit =
  val secret = Random.nextInt(101)
  var found = false

  while !found do
    print("Enter a number from 0 to 100: ")

    StdIn.readLine().toIntOption match
      case None =>
        println("Enter a valid number.")

      case Some(value) if value < secret =>
        println("Too low!")

      case Some(value) if value > secret =>
        println("Too high!")

      case Some(_) =>
        println("Correct!")
        found = true
```

---

# 17. Lua

## What is it?

Lua is a small dynamic scripting language created in Brazil.

One of its greatest strengths is that the Lua interpreter is easy to embed inside other applications.

## Where is it used?

- games,
- mods,
- engines,
- configuration,
- embedded scripting,
- OpenResty,
- Neovim.

## Installation - Windows

Official site:

https://www.lua.org/

On Windows, people often use ready-made binaries, MSYS2, or a package manager.

With MSYS2, install a Lua package and use it from an MSYS2 terminal.

Verify:

```powershell
lua -v
```

## Installation - macOS

```bash
brew install lua
```

Verify:

```bash
lua -v
```

## Installation - Linux / Debian

```bash
sudo apt update
sudo apt install lua5.4
```

Verify:

```bash
lua5.4 -v
```

Depending on the system configuration, you may also have:

```bash
lua
```

## Running

```bash
lua guess.lua
```

or:

```bash
lua5.4 guess.lua
```

## Guess the number

```lua
math.randomseed(os.time())

local secret = math.random(0, 100)

while true do
    io.write("Enter a number from 0 to 100: ")

    local guess = tonumber(io.read())

    if guess == nil then
        print("Enter a valid number.")
    elseif guess < secret then
        print("Too low!")
    elseif guess > secret then
        print("Too high!")
    else
        print("Correct!")
        break
    end
end
```

---

# 18. Julia

## What is it?

Julia was designed mainly for scientific and numerical computing.

It combines high-level syntax with LLVM-based JIT compilation.

## Where is it used?

- mathematics,
- physics,
- simulations,
- modelling,
- data science,
- optimization,
- HPC.

## Installation - Windows

The project currently recommends `juliaup`.

Official site:

https://julialang.org/downloads/

Verify:

```powershell
julia --version
```

## Installation - macOS

`juliaup` is also the preferred route.

You can additionally use an installer or Homebrew.

Verify:

```bash
julia --version
```

## Installation - Linux / Debian

The official `juliaup` tool is preferable because distribution packages may lag behind current releases.

Documentation:

https://julialang.org/downloads/

Verify:

```bash
julia --version
```

## Running

REPL:

```bash
julia
```

File:

```bash
julia guess.jl
```

## Guess the number

```julia
secret = rand(0:100)

while true
    print("Enter a number from 0 to 100: ")

    input = readline()
    guess = tryparse(Int, input)

    if guess === nothing
        println("Enter a valid number.")
    elseif guess < secret
        println("Too low!")
    elseif guess > secret
        println("Too high!")
    else
        println("Correct!")
        break
    end
end
```

---

# 19. Elixir

## What is it?

Elixir is a functional language running on the BEAM virtual machine.

BEAM comes from the Erlang ecosystem and was designed for:

- concurrency,
- fault tolerance,
- distributed systems,
- long-running systems.

## Where is it used?

- backend,
- real-time systems,
- chat systems,
- communication platforms,
- highly available services,
- Phoenix Framework.

## Installation - Windows

Official instructions:

https://elixir-lang.org/install.html

Elixir requires Erlang/OTP.

On Windows, the most convenient options are official packages or an ecosystem-supported version manager.

Verify:

```powershell
elixir --version
```

## Installation - macOS

Homebrew:

```bash
brew install elixir
```

Verify:

```bash
elixir --version
```

## Installation - Linux / Debian

For simple experiments:

```bash
sudo apt update
sudo apt install elixir erlang-dev
```

Verify:

```bash
elixir --version
```

Production projects should control the exact Elixir + Erlang/OTP version pair.

## Running

Script:

```text
guess.exs
```

Run:

```bash
elixir guess.exs
```

Larger projects:

```bash
mix new my_app
```

## Guess the number

```elixir
secret = :rand.uniform(101) - 1

ask = fn ask ->
  input =
    "Enter a number from 0 to 100: "
    |> IO.gets()
    |> String.trim()

  case Integer.parse(input) do
    {guess, ""} when guess < secret ->
      IO.puts("Too low!")
      ask.(ask)

    {guess, ""} when guess > secret ->
      IO.puts("Too high!")
      ask.(ask)

    {_, ""} ->
      IO.puts("Correct!")

    _ ->
      IO.puts("Enter a valid number.")
      ask.(ask)
  end
end

ask.(ask)
```

In this example, the “loop” is implemented recursively, which nicely demonstrates Elixir's functional style.

---

# 20. Solidity

## What is it?

Solidity is a language designed for smart contracts, primarily those running on the Ethereum Virtual Machine.

It is not a conventional desktop or CLI application language.

Once deployed, the program runs inside a blockchain environment.

## Where is it used?

- smart contracts,
- tokens,
- DeFi,
- DAOs,
- NFTs,
- EVM applications,
- blockchain logic.

## Installation - Windows

For first experiments, you can install nothing locally and use:

https://remix.ethereum.org/

For local compilation, Node.js plus the Solidity compiler is convenient.

Install Node.js first, then:

```powershell
npm install --global solc
```

Verify:

```powershell
solcjs --version
```

## Installation - macOS

Node.js:

```bash
brew install node
```

Solidity:

```bash
npm install --global solc
```

Verify:

```bash
solcjs --version
```

## Installation - Linux / Debian

```bash
sudo apt update
sudo apt install nodejs npm
sudo npm install --global solc
```

Verify:

```bash
solcjs --version
```

The official documentation also describes native binaries and other installation methods:

https://docs.soliditylang.org/

## Compilation

```bash
solcjs --bin --abi GuessNumber.sol
```

This produces, among other things:

- bytecode,
- ABI.

Compiling does not itself “run” the contract.

You need an EVM environment such as:

- Remix VM,
- a local blockchain,
- a test network,
- a public network.

## Guess the number - smart contract version

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GuessNumber {
    uint8 private immutable secret;

    constructor(uint8 _secret) {
        require(_secret <= 100, "Secret must be 0-100");
        secret = _secret;
    }

    function guess(uint8 number) public view returns (string memory) {
        require(number <= 100, "Guess must be 0-100");

        if (number < secret) {
            return "Too low!";
        }

        if (number > secret) {
            return "Too high!";
        }

        return "Correct!";
    }
}
```

## Important: blockchain data is not truly private

The keyword:

```solidity
private
```

limits access through the contract interface, but **does not make the value secret from the outside world**.

The state of a public blockchain can be inspected.

So this guessing game is a useful syntax example but a poor design for a real game that depends on a secret value.

---

# Interpreter, compiler, VM and JIT - what is the difference?

After twenty examples, it becomes clear that “running a program” can mean very different things.

## Native code

C, C++, Go, Rust, and Swift can be compiled to code executed directly by the CPU:

```text
source code
    |
    v
compiler
    |
    v
executable
    |
    v
CPU
```

Example:

```bash
gcc hello.c -o hello
./hello
```

## Virtual machine

Java:

```text
.java -> javac -> .class -> JVM
```

Kotlin and Scala often use the same JVM.

C# runs in the .NET ecosystem.

Elixir runs on BEAM.

Solidity runs on the EVM.

## JIT

JIT means:

```text
Just-In-Time Compilation
```

Parts of the program are compiled while the program runs.

JIT mechanisms are used in, among others:

- JavaScript,
- the JVM,
- .NET,
- Julia,
- Dart.

## Interpreter

Python, Ruby, PHP, R, and Lua are often described as interpreted languages.

That is a useful simplification, but modern implementations may also use:

- bytecode,
- virtual machines,
- JIT compilation,
- native libraries.

The boundary is therefore more complex than:

```text
compiled vs interpreted
```

---

# The same logic in twenty syntaxes

Every version of the guessing game implements roughly the same algorithm:

```text
generate a number from 0 to 100

until the player guesses correctly:
    read a value

    if the input is invalid:
        ask again

    if the number is lower:
        print "Too low"

    if the number is higher:
        print "Too high"

    if it is equal:
        print "Correct"
        finish
```

This is an important observation.

Once you learn **programming as a way of thinking**, learning another language usually means learning:

- new syntax,
- another type system,
- a different memory model,
- new libraries,
- a new toolchain,
- another way to build and deploy.

The underlying algorithm does not change.

---

# How to recognize a project by its files

You open an unfamiliar repository. Before reading the code, look at the top-level files.

## Python

```text
pyproject.toml
requirements.txt
setup.py
*.py
```

See:

[Python - basics](techhandbook:doc-023)

## JavaScript / TypeScript

```text
package.json
package-lock.json
pnpm-lock.yaml
yarn.lock
tsconfig.json
```

See:

- [JavaScript - handbook](techhandbook:doc-021)
- [Node.js](techhandbook:doc-022)

## Java

```text
pom.xml
build.gradle
build.gradle.kts
```

## C

```text
Makefile
CMakeLists.txt
*.c
*.h
```

See:

[C - reading, building and debugging projects](techhandbook:doc-019)

## C++

```text
CMakeLists.txt
*.cpp
*.hpp
```

## C#

```text
*.csproj
*.sln
```

## Go

```text
go.mod
go.sum
*.go
```

See:

[Go - reading code](techhandbook:doc-020)

## Rust

```text
Cargo.toml
Cargo.lock
src/main.rs
src/lib.rs
```

## Kotlin

```text
build.gradle.kts
settings.gradle.kts
*.kt
```

## Swift

```text
Package.swift
*.swift
```

## Dart

```text
pubspec.yaml
*.dart
```

## Ruby

```text
Gemfile
Gemfile.lock
*.rb
```

## R

```text
*.R
DESCRIPTION
renv.lock
```

## Scala

```text
build.sbt
*.scala
```

## Elixir

```text
mix.exs
mix.lock
*.ex
*.exs
```

## Solidity

```text
*.sol
hardhat.config.*
foundry.toml
```

Simply recognizing the ecosystem is already a useful practical skill.

---

# Which languages are related?

## C-style syntax family

You will find familiar braces, operators, and control-flow patterns in:

- C,
- C++,
- Java,
- C#,
- JavaScript,
- TypeScript,
- Go,
- Rust,
- Swift,
- Kotlin,
- Solidity.

This does not mean the languages behave the same way.

It only means that much of the syntax can look familiar at first glance.

## JVM

A common platform is used by, among others:

- Java,
- Kotlin,
- Scala.

They can all draw from the huge JVM library ecosystem.

## Web

The most common languages here include:

- JavaScript,
- TypeScript,
- PHP,
- Python,
- Ruby,
- Java,
- C#,
- Go,
- Elixir.

## Systems

The most characteristic group:

- C,
- C++,
- Rust.

Go usually sits a little further away from the hardware, but is extremely strong in systems tooling and infrastructure.

## Mobile

- Kotlin - Android,
- Swift - Apple platforms,
- Dart - Flutter.

## Data and science

- Python,
- R,
- Julia,
- Scala.

---

# Do you need to know all of them?

No.

It is much more valuable to know a few technologies well than to learn twenty languages superficially.

However, it is useful to recognize all of them.

If you see:

```text
Cargo.toml
```

you know you are in a Rust project.

If you see:

```text
go.mod
```

you know it is Go.

If you see:

```text
mix.exs
```

you know it is Elixir.

If you see:

```text
pubspec.yaml
```

you expect Dart or Flutter.

That is often enough to know:

- what documentation to look for,
- what toolchain to install,
- what build command to search for,
- what kinds of errors to expect.

---

# If you remember only one sentence about each language

**Python** - a simple language with a huge ecosystem, especially strong in AI, data, and automation.

**JavaScript** - the browser's primary programming language, which also moved to the server.

**TypeScript** - JavaScript with types and stronger control over large projects.

**Java** - one of the main languages of large business systems and the JVM world.

**C** - a foundational language of operating systems, embedded software, and libraries.

**C++** - enormous control and performance at the cost of significant complexity.

**C#** - a modern .NET language, strong in backend, business applications, and games.

**Go** - a simple compiled language that excels at backend services, CLI tools, and infrastructure.

**Rust** - a systems language combining high performance with strong memory-safety guarantees.

**PHP** - one of the foundations of web backends, still powering a huge part of the web.

**Kotlin** - a modern JVM language and one of the main languages of Android development.

**Swift** - Apple's main modern language, also usable outside macOS.

**Dart** - the language most strongly associated with cross-platform Flutter development.

**Ruby** - a dynamic language focused on programmer productivity, best known for Rails.

**R** - a specialized language for statistics and data analysis.

**Scala** - the JVM combined with strong functional programming and a sophisticated type system.

**Lua** - a small language that is excellent for embedding inside larger applications.

**Julia** - a scientific-computing language that tries to combine convenience with high performance.

**Elixir** - a language for concurrent and fault-tolerant systems running on BEAM.

**Solidity** - the smart-contract language of the EVM ecosystem.

---

# What about languages not included here?

Leaving a language out does not mean it is dead.

## Assembly

Assembly deserves a dedicated article.

There is no single universal “Assembly language.” Code depends on the CPU architecture, for example:
- MOS 6502,
- x86,
- x86-64,
- ARM,
- RISC-V.

Assembly is the third article in this series.

## Ada

Ada also gets a separate, detailed article.

It is still used where the following matter especially:

- predictability,
- safety,
- analyzability,
- safety-critical systems.

Ada is the fourth article in this series.

## FORTRAN and COBOL

Both languages still do real work.

They belong in the historical article because their importance is much bigger than the number of greenfield projects using them today.

## Objective-C

It still exists in a vast body of Apple platform code, but Swift has largely replaced it for new projects.

## Perl

Perl still appears in older systems and automation, but it is chosen much less often for new applications.

## Zig

Zig is an interesting modern systems language worth watching, but its ecosystem and job market are still much smaller than C, C++, or Rust.

---

# Why these 20?

There is no single objective programming-language ranking.

Different sources measure different things:

- GitHub - repository activity,
- Stack Overflow - what developers report using,
- TIOBE - visibility and presence across multiple sources,
- RedMonk - a combination of code and developer-discussion data.

So instead of asking:

> Which language is exactly number 17?

it is more useful to ask:

> Which languages should I at least recognize to understand the modern programming landscape?

That is the question this list answers.

---

# Cheat sheet: installation on three systems

| Language | Windows | macOS | Debian/Linux |
|---|---|---|---|
| Python | python.org / `winget` | python.org / Homebrew | `apt install python3` |
| JavaScript | Node.js installer | Homebrew / Node.js | `apt install nodejs npm` |
| TypeScript | npm | npm | npm |
| Java | JDK / Temurin | JDK / Homebrew | `apt install default-jdk` |
| C | MSVC / MSYS2 | Xcode CLT | `apt install build-essential` |
| C++ | MSVC / MSYS2 | Xcode CLT | `apt install build-essential` |
| C# | .NET SDK | .NET SDK | Microsoft repo + .NET SDK |
| Go | go.dev installer | go.dev / Homebrew | APT or go.dev |
| Rust | rustup | rustup | rustup |
| PHP | windows.php.net | Homebrew | `apt install php-cli` |
| Kotlin | compiler ZIP / IDE | SDKMAN! / Homebrew | JDK + SDKMAN! |
| Swift | WinGet / installer | Xcode / swiftly | swiftly / official toolchain |
| Dart | Dart SDK / Flutter | Homebrew / Flutter | official APT repository |
| Ruby | RubyInstaller | Homebrew / rbenv | `apt install ruby-full` |
| R | CRAN | CRAN / Homebrew | `apt install r-base` |
| Scala | Coursier | Coursier | Coursier |
| Lua | binaries / MSYS2 | Homebrew | `apt install lua5.4` |
| Julia | juliaup | juliaup | juliaup |
| Elixir | Erlang + Elixir | Homebrew | APT or version manager |
| Solidity | Node.js + solcjs / Remix | Node.js + solcjs | Node.js + solcjs |

---

# Further learning in TechHandbook

If you want to go deeper after this overview:

- [C - reading, building and debugging projects](techhandbook:doc-019)
- [Go - reading code](techhandbook:doc-020)
- [JavaScript - handbook](techhandbook:doc-021)
- [Node.js](techhandbook:doc-022)
- [Python - basics](techhandbook:doc-023)
- [Debian - shell](techhandbook:doc-027)
- [Visual Studio Code](techhandbook:doc-039)
- [GitHub](techhandbook:doc-014)

---

# Official sources

Material status: September 2026.

- Python - https://www.python.org/
- Node.js - https://nodejs.org/
- TypeScript - https://www.typescriptlang.org/
- OpenJDK - https://openjdk.org/
- Eclipse Temurin - https://adoptium.net/
- GCC - https://gcc.gnu.org/
- LLVM/Clang - https://llvm.org/
- .NET - https://dotnet.microsoft.com/
- Go - https://go.dev/
- Rust - https://www.rust-lang.org/
- PHP - https://www.php.net/
- Kotlin - https://kotlinlang.org/
- Swift - https://www.swift.org/
- Dart - https://dart.dev/
- Ruby - https://www.ruby-lang.org/
- R - https://www.r-project.org/
- Scala - https://www.scala-lang.org/
- Lua - https://www.lua.org/
- Julia - https://julialang.org/
- Elixir - https://elixir-lang.org/
- Solidity - https://soliditylang.org/

---

# Next articles in the series

1. **20 modern programming languages worth knowing** - this article.
2. **Old programming languages that shaped computing** - FORTRAN, COBOL, ALGOL, BASIC, Pascal, Lisp, Smalltalk, Prolog, Forth, PL/I, Logo, and more.
3. **Assembly from scratch - from registers and memory to a real program**.
4. **Ada - the language where mistakes are meant to be harder to make**.
