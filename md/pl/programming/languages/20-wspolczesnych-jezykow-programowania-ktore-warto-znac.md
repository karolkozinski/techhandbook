---
id: "doc-058"
title: "20 współczesnych języków programowania, które warto znać"
slug: "20-wspolczesnych-jezykow-programowania-ktore-warto-znac"
description: "Praktyczny przegląd 20 współczesnych języków programowania: zastosowania, instalacja na Windowsie, macOS i Linuxie, uruchamianie, kompilacja oraz ten sam mały program w każdym języku."
lang: "pl"
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

# 20 współczesnych języków programowania, które warto znać

Nie istnieje jeden „najlepszy język programowania”. Python, JavaScript, C, Go czy Rust rozwiązują inne problemy, działają w innych środowiskach i mają inne kompromisy.

Ten artykuł nie jest rankingiem od najlepszego do najgorszego. To **praktyczny przekrój 20 języków, które w 2026 roku są realnie używane zawodowo albo mają aktywną, istotną niszę**.

Dla każdego języka zobaczymy:

- czym jest,
- kto go rozwija,
- gdzie się go używa,
- jak zainstalować środowisko na **Windowsie**,
- jak zainstalować środowisko na **macOS**,
- jak zainstalować środowisko na **Linuxie**, z Debianem jako głównym przykładem,
- jak sprawdzić instalację,
- jak uruchomić albo skompilować program,
- jak wygląda ta sama prosta gra **„zgadnij liczbę od 0 do 100”**.

Wspólny przykład pozwala szybko porównać składnię i sposób pracy z językiem.

> Ten tekst jest przeglądem, nie pełnym kursem. Tam, gdzie TechHandbook ma już osobny materiał, znajdziesz bezpośredni link do rozwinięcia tematu.

Przydatne materiały ogólne:

- [Debian - desktop i serwer](techhandbook:doc-033)
- [Debian - shell](techhandbook:doc-027)
- [Visual Studio Code](techhandbook:doc-039)
- [GitHub](techhandbook:doc-014)

---

# Szybka mapa

| Język | Typowe zastosowania | Typowy model wykonania |
|---|---|---|
| Python | AI, dane, automatyzacja, backend | interpreter / bytecode |
| JavaScript | przeglądarka, frontend, Node.js | VM / JIT |
| TypeScript | duże aplikacje webowe, Node.js | kompilowany do JavaScript |
| Java | enterprise, backend, JVM | bytecode JVM / JIT |
| C | systemy, embedded, biblioteki | kod maszynowy |
| C++ | gry, silniki, aplikacje wysokiej wydajności | kod maszynowy |
| C# | .NET, backend, desktop, Unity | IL + .NET runtime |
| Go | backend, infrastruktura, CLI | kod maszynowy |
| Rust | systemy, CLI, infrastruktura | kod maszynowy |
| PHP | backend WWW, CMS-y | interpreter / VM / JIT |
| Kotlin | Android, JVM, backend | bytecode JVM / inne targety |
| Swift | Apple, aplikacje natywne, CLI | kod maszynowy |
| Dart | Flutter | JIT / AOT |
| Ruby | web, Rails, skrypty | interpreter / VM |
| R | statystyka, analiza danych | interpreter |
| Scala | JVM, big data, backend | bytecode JVM |
| Lua | gry, embedded scripting | interpreter / VM |
| Julia | nauka, obliczenia numeryczne | JIT |
| Elixir | backend współbieżny, systemy realtime | BEAM bytecode |
| Solidity | smart kontrakty EVM | EVM bytecode |

---

# Zanim zaczniemy: trzy rodzaje „instalacji”

W praktyce środowisko programistyczne instaluje się na kilka sposobów.

## 1. Pakiet systemowy

Przykład Debiana:

```bash
sudo apt install python3
```

Zaleta: prostota.

Wada: wersja w stabilnej dystrybucji może być starsza niż najnowsze wydanie projektu.

## 2. Oficjalny instalator lub SDK

Przykład Windowsa:

```text
pobierz instalator -> uruchom -> dodaj narzędzia do PATH
```

Tak instaluje się często m.in. JDK, Go, Swift czy .NET.

## 3. Menedżer wersji

Przykłady:

```text
rustup
juliaup
SDKMAN!
Coursier
```

To wygodne rozwiązanie, jeśli chcesz mieć kilka wersji języka lub łatwo aktualizować toolchain.

---

# 1. Python

## Co to jest

Python jest dynamicznie typowanym językiem wysokiego poziomu, zaprojektowanym z naciskiem na czytelność.

Rozwijają go Python Software Foundation i społeczność Python Core Developers.

## Gdzie się go używa

- AI i machine learning,
- analiza danych,
- automatyzacja,
- backend,
- testy,
- skrypty,
- administracja,
- nauka programowania.

Pełniejszy materiał:

[Python - podstawy](techhandbook:doc-023)

## Instalacja - Windows

Najprostsza droga to oficjalny instalator z:

https://www.python.org/downloads/windows/

Podczas instalacji warto zaznaczyć:

```text
Add python.exe to PATH
```

W nowych wersjach Windows można też użyć `winget`, jeśli pakiet jest dostępny:

```powershell
winget search Python.Python
```

Po instalacji:

```powershell
python --version
```

albo:

```powershell
py --version
```

## Instalacja - macOS

Python można zainstalować oficjalnym instalatorem z python.org albo przez Homebrew:

```bash
brew install python
```

Sprawdzenie:

```bash
python3 --version
```

## Instalacja - Linux / Debian

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

Sprawdzenie:

```bash
python3 --version
```

## Uruchamianie

Plik:

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

Python zwykle nie tworzy natywnej binarki. Kod wykonuje interpreter.

## Zgadnij liczbę

```python
import random

secret = random.randint(0, 100)

while True:
    try:
        guess = int(input("Podaj liczbę 0-100: "))
    except ValueError:
        print("Podaj poprawną liczbę.")
        continue

    if guess < secret:
        print("Za mało!")
    elif guess > secret:
        print("Za dużo!")
    else:
        print("Brawo!")
        break
```

---

# 2. JavaScript

## Co to jest

JavaScript jest podstawowym językiem programowania przeglądarek internetowych.

Standard języka nazywa się ECMAScript i jest rozwijany przez TC39. Popularne silniki to m.in. V8, SpiderMonkey i JavaScriptCore.

Poza przeglądarką JavaScript działa przede wszystkim dzięki Node.js.

Pełniejsze materiały:

- [JavaScript - kompendium](techhandbook:doc-021)
- [Node.js](techhandbook:doc-022)

## Gdzie się go używa

- frontend WWW,
- aplikacje SPA,
- Node.js,
- API,
- serverless,
- aplikacje desktopowe,
- rozszerzenia,
- tooling.

## Instalacja - Windows

Do pracy poza przeglądarką instalujemy Node.js:

https://nodejs.org/

Najwygodniej wybrać aktualną wersję LTS.

Po instalacji:

```powershell
node --version
npm --version
```

Można też użyć menedżera wersji Node, np. nvm-windows.

## Instalacja - macOS

Homebrew:

```bash
brew install node
```

Sprawdzenie:

```bash
node --version
npm --version
```

W projektach warto rozważyć menedżer wersji, np. `nvm`, `fnm` lub `volta`.

## Instalacja - Linux / Debian

Najprościej:

```bash
sudo apt update
sudo apt install nodejs npm
```

Sprawdzenie:

```bash
node --version
npm --version
```

Pakiet Debiana może być starszy od aktualnego LTS Node.js. Przy pracy projektowej warto użyć menedżera wersji.

## Uruchamianie

```bash
node guess.js
```

## Zgadnij liczbę

```javascript
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const secret = Math.floor(Math.random() * 101);

function ask() {
  rl.question("Podaj liczbę 0-100: ", (answer) => {
    const guess = Number(answer);

    if (!Number.isInteger(guess)) {
      console.log("Podaj poprawną liczbę.");
      ask();
      return;
    }

    if (guess < secret) {
      console.log("Za mało!");
      ask();
    } else if (guess > secret) {
      console.log("Za dużo!");
      ask();
    } else {
      console.log("Brawo!");
      rl.close();
    }
  });
}

ask();
```

---

# 3. TypeScript

## Co to jest

TypeScript jest rozwijanym przez Microsoft nadzbiorem JavaScriptu.

Dodaje m.in.:

- statyczne typowanie,
- interfejsy,
- typy generyczne,
- lepszą analizę kodu,
- wcześniejsze wykrywanie wielu błędów.

TypeScript jest zwykle zamieniany na JavaScript.

## Gdzie się go używa

- React,
- Angular,
- Vue,
- Node.js,
- duże frontendowe aplikacje,
- backend,
- biblioteki,
- narzędzia deweloperskie.

TypeScript korzysta z tego samego ekosystemu Node.js, więc przyda się:

[Node.js](techhandbook:doc-022)

## Instalacja - Windows

Najpierw Node.js:

https://nodejs.org/

Potem w katalogu projektu:

```powershell
mkdir ts-guess
cd ts-guess
npm init -y
npm install --save-dev typescript @types/node
```

## Instalacja - macOS

```bash
brew install node
mkdir ts-guess
cd ts-guess
npm init -y
npm install --save-dev typescript @types/node
```

## Instalacja - Linux / Debian

```bash
sudo apt update
sudo apt install nodejs npm

mkdir ts-guess
cd ts-guess
npm init -y
npm install --save-dev typescript @types/node
```

## Sprawdzenie

```bash
npx tsc --version
```

## Kompilacja

```bash
npx tsc guess.ts --target ES2022 --module commonjs
```

Powstanie:

```text
guess.js
```

Uruchamiamy:

```bash
node guess.js
```

## Zgadnij liczbę

```typescript
import * as readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const secret: number = Math.floor(Math.random() * 101);

function ask(): void {
  rl.question("Podaj liczbę 0-100: ", (answer: string) => {
    const guess: number = Number(answer);

    if (!Number.isInteger(guess)) {
      console.log("Podaj poprawną liczbę.");
      ask();
      return;
    }

    if (guess < secret) {
      console.log("Za mało!");
      ask();
    } else if (guess > secret) {
      console.log("Za dużo!");
      ask();
    } else {
      console.log("Brawo!");
      rl.close();
    }
  });
}

ask();
```

---

# 4. Java

## Co to jest

Java jest statycznie typowanym językiem uruchamianym zwykle na JVM - Java Virtual Machine.

Kod źródłowy kompilujemy do bytecode'u:

```text
.java -> javac -> .class -> JVM
```

Głównym otwartym projektem implementacji jest OpenJDK.

## Gdzie się jej używa

- backend enterprise,
- bankowość,
- systemy korporacyjne,
- duże systemy serwerowe,
- aplikacje JVM,
- istniejące projekty Android.

## Instalacja - Windows

Najprościej zainstalować JDK - np. build OpenJDK od Eclipse Temurin:

https://adoptium.net/

Po instalacji:

```powershell
java --version
javac --version
```

## Instalacja - macOS

Przez Homebrew:

```bash
brew install openjdk
```

Sprawdzenie:

```bash
java --version
javac --version
```

Można też użyć dystrybucji Temurin lub SDKMAN!.

## Instalacja - Linux / Debian

```bash
sudo apt update
sudo apt install default-jdk
```

Sprawdzenie:

```bash
java --version
javac --version
```

## Kompilacja

Plik:

```text
Guess.java
```

Kompilujemy:

```bash
javac Guess.java
```

Powstanie:

```text
Guess.class
```

Uruchomienie:

```bash
java Guess
```

## Zgadnij liczbę

```java
import java.util.Random;
import java.util.Scanner;

public class Guess {
    public static void main(String[] args) {
        Random random = new Random();
        Scanner scanner = new Scanner(System.in);

        int secret = random.nextInt(101);

        while (true) {
            System.out.print("Podaj liczbę 0-100: ");

            if (!scanner.hasNextInt()) {
                scanner.next();
                System.out.println("Podaj poprawną liczbę.");
                continue;
            }

            int guess = scanner.nextInt();

            if (guess < secret) {
                System.out.println("Za mało!");
            } else if (guess > secret) {
                System.out.println("Za dużo!");
            } else {
                System.out.println("Brawo!");
                break;
            }
        }

        scanner.close();
    }
}
```

---

# 5. C

## Co to jest

C jest jednym z najważniejszych języków w historii informatyki i nadal jednym z fundamentów współczesnych systemów.

Nie posiada garbage collectora. Programista ma bardzo dużą kontrolę nad pamięcią i reprezentacją danych.

Pełniejszy materiał TechHandbooka:

[C - czytanie, kompilacja i debugowanie](techhandbook:doc-019)

## Gdzie się go używa

- systemy operacyjne,
- kernela,
- sterowniki,
- embedded,
- firmware,
- mikrokontrolery,
- biblioteki,
- narzędzia Unix.

## Instalacja - Windows

Najbardziej typowe opcje to:

### Visual Studio Build Tools / MSVC

Instalujemy Visual Studio lub Build Tools z komponentem:

```text
Desktop development with C++
```

Kompilator:

```powershell
cl
```

### MSYS2 + GCC

https://www.msys2.org/

Po instalacji można korzystać z GCC w środowisku MSYS2.

## Instalacja - macOS

Apple udostępnia Clang w Command Line Tools:

```bash
xcode-select --install
```

Sprawdzenie:

```bash
clang --version
```

## Instalacja - Linux / Debian

```bash
sudo apt update
sudo apt install build-essential
```

Sprawdzenie:

```bash
gcc --version
```

## Kompilacja

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

## Zgadnij liczbę

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
    srand((unsigned)time(NULL));

    int secret = rand() % 101;
    int guess;

    while (1) {
        printf("Podaj liczbe 0-100: ");

        if (scanf("%d", &guess) != 1) {
            return 1;
        }

        if (guess < secret) {
            puts("Za malo!");
        } else if (guess > secret) {
            puts("Za duzo!");
        } else {
            puts("Brawo!");
            break;
        }
    }

    return 0;
}
```

---

# 6. C++

## Co to jest

C++ wyrósł z C, ale dziś jest ogromnym, niezależnym językiem.

Obsługuje m.in.:

- programowanie proceduralne,
- programowanie obiektowe,
- szablony,
- programowanie generyczne,
- programowanie funkcyjne,
- niskopoziomową kontrolę nad pamięcią.

Standard rozwija komitet ISO C++ WG21.

## Gdzie się go używa

- gry,
- Unreal Engine,
- silniki,
- przeglądarki,
- bazy danych,
- aplikacje desktopowe,
- oprogramowanie czasu rzeczywistego,
- systemy wysokiej wydajności.

## Instalacja - Windows

Najwygodniej użyć Visual Studio lub Visual Studio Build Tools.

W instalatorze wybieramy:

```text
Desktop development with C++
```

Sprawdzenie w Developer Command Prompt:

```powershell
cl
```

Alternatywa: MSYS2 + GCC/Clang.

## Instalacja - macOS

```bash
xcode-select --install
```

Sprawdzenie:

```bash
clang++ --version
```

## Instalacja - Linux / Debian

```bash
sudo apt update
sudo apt install build-essential
```

Sprawdzenie:

```bash
g++ --version
```

## Kompilacja

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

## Zgadnij liczbę

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
        std::cout << "Podaj liczbe 0-100: ";

        if (!(std::cin >> guess)) {
            return 1;
        }

        if (guess < secret) {
            std::cout << "Za malo!\n";
        } else if (guess > secret) {
            std::cout << "Za duzo!\n";
        } else {
            std::cout << "Brawo!\n";
            break;
        }
    }
}
```

---

# 7. C#

## Co to jest

C# jest głównym językiem platformy .NET.

Rozwija go Microsoft wraz ze społecznością .NET.

Kod jest kompilowany do IL, a następnie wykonywany przez środowisko .NET.

## Gdzie się go używa

- ASP.NET Core,
- backend,
- aplikacje biznesowe,
- desktop,
- Azure,
- Unity,
- narzędzia serwerowe.

## Instalacja - Windows

Oficjalny .NET SDK:

https://dotnet.microsoft.com/download

Można też użyć `winget`:

```powershell
winget search Microsoft.DotNet.SDK
```

Po instalacji:

```powershell
dotnet --version
```

## Instalacja - macOS

Oficjalny instalator .NET albo Homebrew:

```bash
brew install --cask dotnet-sdk
```

Sprawdzenie:

```bash
dotnet --version
```

## Instalacja - Linux / Debian

Microsoft publikuje oficjalne repozytoria dla wspieranych wersji Debiana.

Po dodaniu repozytorium Microsoftu instalujemy SDK, np.:

```bash
sudo apt update
sudo apt install dotnet-sdk-10.0
```

Sprawdzenie:

```bash
dotnet --version
dotnet --list-sdks
```

> Numer pakietu zależy od aktualnej wersji .NET i wersji Debiana. Warto sprawdzić aktualną instrukcję Microsoftu przed instalacją.

## Tworzenie projektu

```bash
dotnet new console -n Guess
cd Guess
```

Kod zapisujemy w:

```text
Program.cs
```

Uruchomienie:

```bash
dotnet run
```

Kompilacja:

```bash
dotnet build
```

Publikacja:
```bash
dotnet publish -c Release
```

## Zgadnij liczbę

```csharp
int secret = Random.Shared.Next(0, 101);

while (true)
{
    Console.Write("Podaj liczbę 0-100: ");

    if (!int.TryParse(Console.ReadLine(), out int guess))
    {
        Console.WriteLine("Podaj poprawną liczbę.");
        continue;
    }

    if (guess < secret)
    {
        Console.WriteLine("Za mało!");
    }
    else if (guess > secret)
    {
        Console.WriteLine("Za dużo!");
    }
    else
    {
        Console.WriteLine("Brawo!");
        break;
    }
}
```

---

# 8. Go

## Co to jest

Go jest kompilowanym językiem stworzonym w Google.

Język stawia na:

- prostotę,
- szybkie kompilowanie,
- łatwe budowanie programów sieciowych,
- współbieżność,
- wygodne wdrażanie pojedynczych binarek.

Pełniejszy materiał:

[Go - czytanie kodu](techhandbook:doc-020)

## Gdzie się go używa

- backend,
- API,
- mikroserwisy,
- chmura,
- DevOps,
- CLI,
- systemy sieciowe,
- infrastruktura.

## Instalacja - Windows

Oficjalny instalator:

https://go.dev/dl/

Po instalacji:

```powershell
go version
```

## Instalacja - macOS

Oficjalny pakiet z go.dev albo:

```bash
brew install go
```

Sprawdzenie:

```bash
go version
```

## Instalacja - Linux / Debian

Najprościej:

```bash
sudo apt update
sudo apt install golang-go
```

Sprawdzenie:

```bash
go version
```

Pakiet Debiana może być starszy. Najnowszy toolchain można zainstalować z archiwum ze strony:

https://go.dev/dl/

## Uruchamianie

Bez tworzenia finalnego pliku:

```bash
go run guess.go
```

Kompilacja:

```bash
go build -o guess guess.go
```

Windows utworzy:

```text
guess.exe
```

Linux/macOS:

```bash
./guess
```

## Zgadnij liczbę

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

		fmt.Print("Podaj liczbę 0-100: ")

		if _, err := fmt.Scan(&guess); err != nil {
			fmt.Println("Błąd wejścia.")
			return
		}

		if guess < secret {
			fmt.Println("Za mało!")
		} else if guess > secret {
			fmt.Println("Za dużo!")
		} else {
			fmt.Println("Brawo!")
			break
		}
	}
}
```

---

# 9. Rust

## Co to jest

Rust jest językiem systemowym nastawionym na wydajność i bezpieczeństwo pamięci.

Najbardziej charakterystycznym elementem jest system:

- ownership,
- borrowing,
- lifetimes.

Wiele błędów, które w C lub C++ pojawiłyby się podczas działania programu, Rust próbuje wychwycić podczas kompilacji.

## Gdzie się go używa

- CLI,
- systemy,
- infrastruktura,
- sieci,
- WebAssembly,
- komponenty wysokiej wydajności,
- biblioteki,
- elementy systemów operacyjnych.

## Instalacja - Windows

Oficjalna metoda:

https://rustup.rs/

Pobieramy i uruchamiamy:

```text
rustup-init.exe
```

Na Windows Rust może wymagać narzędzi kompilacyjnych Visual Studio Build Tools.

Sprawdzenie:

```powershell
rustc --version
cargo --version
```

## Instalacja - macOS

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Po instalacji:

```bash
source "$HOME/.cargo/env"
```

## Instalacja - Linux / Debian

Tak samo jak na innych systemach Unix:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Następnie:

```bash
source "$HOME/.cargo/env"
```

Sprawdzenie:

```bash
rustc --version
cargo --version
```

## Projekt

```bash
cargo new guess
cd guess
cargo add rand
```

Kod:

```text
src/main.rs
```

Uruchomienie:

```bash
cargo run
```

Kompilacja release:

```bash
cargo build --release
```

## Zgadnij liczbę

```rust
use rand::Rng;
use std::io;

fn main() {
    let secret = rand::rng().random_range(0..=100);

    loop {
        println!("Podaj liczbę 0-100:");

        let mut input = String::new();

        io::stdin()
            .read_line(&mut input)
            .expect("Nie udało się odczytać wejścia");

        let guess: i32 = match input.trim().parse() {
            Ok(number) => number,
            Err(_) => {
                println!("Podaj poprawną liczbę.");
                continue;
            }
        };

        if guess < secret {
            println!("Za mało!");
        } else if guess > secret {
            println!("Za dużo!");
        } else {
            println!("Brawo!");
            break;
        }
    }
}
```

---

# 10. PHP

## Co to jest

PHP jest językiem zaprojektowanym przede wszystkim do aplikacji webowych po stronie serwera.

Współczesny PHP ma:

- klasy,
- interfejsy,
- typy,
- wyjątki,
- atrybuty,
- frameworki,
- menedżer pakietów Composer.

## Gdzie się go używa

- WordPress,
- Drupal,
- Magento,
- Laravel,
- Symfony,
- CMS-y,
- sklepy,
- backend WWW.

## Instalacja - Windows

Można pobrać oficjalne binaria:

https://windows.php.net/download/

Po rozpakowaniu katalog z `php.exe` dodajemy do `PATH`.

Sprawdzenie:

```powershell
php --version
```

Popularne są również zestawy takie jak XAMPP, ale do nauki CLI wystarczy sam PHP.

## Instalacja - macOS

Najprościej przez Homebrew:

```bash
brew install php
```

Sprawdzenie:

```bash
php --version
```

## Instalacja - Linux / Debian

```bash
sudo apt update
sudo apt install php-cli
```

Sprawdzenie:

```bash
php --version
```

## Uruchamianie

```bash
php guess.php
```

## Zgadnij liczbę

```php
<?php

$secret = random_int(0, 100);

while (true) {
    $input = readline("Podaj liczbę 0-100: ");

    if (!is_numeric($input)) {
        echo "Podaj poprawną liczbę.\n";
        continue;
    }

    $guess = (int) $input;

    if ($guess < $secret) {
        echo "Za mało!\n";
    } elseif ($guess > $secret) {
        echo "Za dużo!\n";
    } else {
        echo "Brawo!\n";
        break;
    }
}
```

---

# 11. Kotlin

## Co to jest

Kotlin jest nowoczesnym, statycznie typowanym językiem rozwijanym przez JetBrains.

Najczęściej pracuje na JVM, ale potrafi również kompilować się do JavaScriptu i kodu natywnego.

## Gdzie się go używa

- Android,
- backend JVM,
- aplikacje wieloplatformowe,
- współczesne projekty zastępujące część kodu Javy.

## Instalacja - Windows

Oficjalna dokumentacja Kotlin dla kompilatora CLI zaleca na Windows instalację ręczną.

Pobieramy Kotlin Compiler z:

https://github.com/JetBrains/kotlin/releases

Rozpakowujemy archiwum i dodajemy:

```text
kotlinc\bin
```

do `PATH`.

Potrzebny jest również JDK.

Sprawdzenie:

```powershell
kotlinc -version
```

## Instalacja - macOS

Wygodnie przez SDKMAN!:

```bash
sdk install kotlin
```

albo Homebrew:

```bash
brew install kotlin
```

Potrzebny jest JDK.

## Instalacja - Linux / Debian

Najpierw Java:

```bash
sudo apt update
sudo apt install default-jdk
```

Następnie SDKMAN! i:

```bash
sdk install kotlin
```

Sprawdzenie:

```bash
kotlinc -version
```

## Kompilacja

```bash
kotlinc guess.kt -include-runtime -d guess.jar
```

Uruchomienie:

```bash
java -jar guess.jar
```

## Zgadnij liczbę

```kotlin
import kotlin.random.Random

fun main() {
    val secret = Random.nextInt(0, 101)

    while (true) {
        print("Podaj liczbę 0-100: ")

        val guess = readln().toIntOrNull()

        if (guess == null) {
            println("Podaj poprawną liczbę.")
            continue
        }

        when {
            guess < secret -> println("Za mało!")
            guess > secret -> println("Za dużo!")
            else -> {
                println("Brawo!")
                break
            }
        }
    }
}
```

---

# 12. Swift

## Co to jest

Swift jest językiem stworzonym przez Apple jako współczesny następca Objective-C.

Jest statycznie typowany, kompilowany i rozwijany jako projekt open source.

Swift działa nie tylko na macOS - oficjalne toolchainy istnieją również dla Linuxa i Windowsa.

## Gdzie się go używa

- iOS,
- macOS,
- iPadOS,
- watchOS,
- tvOS,
- CLI,
- część backendów.

## Instalacja - Windows

Swift posiada oficjalne wsparcie dla Windowsa.

Najpierw instalujemy wymagane narzędzia Visual Studio, a następnie toolchain Swift. Oficjalna instrukcja udostępnia instalację przez WinGet.

Dokumentacja:

https://www.swift.org/install/windows/

Po instalacji:

```powershell
swift --version
```

## Instalacja - macOS

Jeżeli tworzysz aplikacje dla platform Apple, podstawowym środowiskiem jest Xcode.

Można też użyć oficjalnego `swiftly`.

Dokumentacja:

https://www.swift.org/install/macos/

Sprawdzenie:

```bash
swift --version
```

## Instalacja - Linux / Debian

Swift.org udostępnia oficjalne instrukcje również dla Debiana:

https://www.swift.org/install/linux/debian/

Współczesna instalacja może korzystać z `swiftly`.

Po instalacji:

```bash
swift --version
```

## Uruchamianie

Bez kompilowania finalnego programu:

```bash
swift guess.swift
```

Kompilacja:

```bash
swiftc guess.swift -o guess
```

Uruchomienie Linux/macOS:

```bash
./guess
```

Windows:

```powershell
.\guess.exe
```

## Zgadnij liczbę

```swift
let secret = Int.random(in: 0...100)

while true {
    print("Podaj liczbę 0-100: ", terminator: "")

    guard let line = readLine(),
          let guess = Int(line) else {
        print("Podaj poprawną liczbę.")
        continue
    }

    if guess < secret {
        print("Za mało!")
    } else if guess > secret {
        print("Za dużo!")
    } else {
        print("Brawo!")
        break
    }
}
```

---

# 13. Dart

## Co to jest

Dart jest rozwijanym przez Google językiem ogólnego przeznaczenia.

Najbardziej kojarzy się z Flutterem.

## Gdzie się go używa

- Flutter,
- Android,
- iOS,
- desktop,
- web,
- aplikacje wieloplatformowe,
- CLI.

## Instalacja - Windows

Oficjalna dokumentacja:

https://dart.dev/get-dart

Można zainstalować samo Dart SDK albo Flutter SDK, które zawiera Dart.

Po instalacji:

```powershell
dart --version
```

## Instalacja - macOS

Przez Homebrew:

```bash
brew tap dart-lang/dart
brew install dart
```

Jeśli instalujesz Fluttera, Dart jest już częścią środowiska.

## Instalacja - Linux / Debian

Dart udostępnia oficjalne repozytorium APT.

Aktualną procedurę dodania repozytorium należy sprawdzić na:

https://dart.dev/get-dart

Po skonfigurowaniu repozytorium:

```bash
sudo apt update
sudo apt install dart
```

Sprawdzenie:

```bash
dart --version
```

## Uruchamianie

```bash
dart run guess.dart
```

Kompilacja do wykonywalnego pliku:

```bash
dart compile exe guess.dart -o guess
```

## Zgadnij liczbę

```dart
import 'dart:io';
import 'dart:math';

void main() {
  final secret = Random().nextInt(101);

  while (true) {
    stdout.write('Podaj liczbę 0-100: ');

    final input = stdin.readLineSync();
    final guess = int.tryParse(input ?? '');

    if (guess == null) {
      print('Podaj poprawną liczbę.');
      continue;
    }

    if (guess < secret) {
      print('Za mało!');
    } else if (guess > secret) {
      print('Za dużo!');
    } else {
      print('Brawo!');
      break;
    }
  }
}
```

---

# 14. Ruby

## Co to jest

Ruby jest dynamicznym językiem stworzonym przez Yukihiro „Matz” Matsumoto.

Stawia mocno na czytelność i wygodę programisty.

## Gdzie się go używa

- Ruby on Rails,
- aplikacje webowe,
- skrypty,
- automatyzacja,
- istniejące systemy biznesowe.

## Instalacja - Windows

Najwygodniej użyć RubyInstaller:

https://rubyinstaller.org/

Po instalacji:

```powershell
ruby --version
gem --version
```

## Instalacja - macOS

Systemowy Ruby nie powinien być traktowany jako środowisko projektowe.

Najprościej:

```bash
brew install ruby
```

Przy wielu projektach warto użyć `rbenv` albo `asdf`.

## Instalacja - Linux / Debian

Do prostych eksperymentów:

```bash
sudo apt update
sudo apt install ruby-full
```

Sprawdzenie:

```bash
ruby --version
```

Przy pracy projektowej często używa się menedżera wersji.

## Uruchamianie

```bash
ruby guess.rb
```

## Zgadnij liczbę

```ruby
secret = rand(0..100)

loop do
  print "Podaj liczbę 0-100: "

  input = gets
  break if input.nil?

  begin
    guess = Integer(input)
  rescue ArgumentError
    puts "Podaj poprawną liczbę."
    next
  end

  if guess < secret
    puts "Za mało!"
  elsif guess > secret
    puts "Za dużo!"
  else
    puts "Brawo!"
    break
  end
end
```

---

# 15. R

## Co to jest

R jest językiem i środowiskiem zaprojektowanym przede wszystkim do analizy danych i statystyki.

Rozwijają go R Core Team i R Foundation.

## Gdzie się go używa

- statystyka,
- data science,
- bioinformatyka,
- ekonometria,
- badania naukowe,
- wizualizacja,
- raportowanie.

## Instalacja - Windows

Instalator pobieramy z CRAN:

https://cran.r-project.org/

Wybieramy:

```text
Download R for Windows
```

Sprawdzenie:

```powershell
R --version
```

## Instalacja - macOS

CRAN udostępnia instalator `.pkg`.

Można też użyć Homebrew:

```bash
brew install r
```

## Instalacja - Linux / Debian

Najprościej:

```bash
sudo apt update
sudo apt install r-base
```

Sprawdzenie:

```bash
R --version
```

CRAN publikuje również własne repozytoria dla użytkowników potrzebujących nowszej wersji niż w stabilnym Debianie.

## Uruchamianie

Konsola:

```bash
R
```

Skrypt:

```bash
Rscript guess.R
```

## Zgadnij liczbę

```r
secret <- sample(0:100, 1)

repeat {
  input <- readline("Podaj liczbę 0-100: ")
  guess <- suppressWarnings(as.integer(input))

  if (is.na(guess)) {
    cat("Podaj poprawną liczbę.\n")
    next
  }

  if (guess < secret) {
    cat("Za mało!\n")
  } else if (guess > secret) {
    cat("Za dużo!\n")
  } else {
    cat("Brawo!\n")
    break
  }
}
```

---

# 16. Scala

## Co to jest

Scala jest statycznie typowanym językiem działającym przede wszystkim na JVM.

Łączy:

- programowanie obiektowe,
- programowanie funkcyjne,
- rozbudowany system typów.

## Gdzie się jej używa

- backend JVM,
- systemy rozproszone,
- big data,
- Apache Spark,
- aplikacje funkcyjne.

## Instalacja - Windows

Oficjalnie rekomendowany jest instalator oparty o Coursier:

https://www.scala-lang.org/download/

Coursier może zainstalować:
- JVM,
- Scala CLI,
- podstawowe narzędzia Scala.

Po instalacji:

```powershell
scala -version
```

## Instalacja - macOS

Najprościej:

```bash
brew install coursier/formulas/coursier
cs setup
```

## Instalacja - Linux / Debian

Dla x86-64 można użyć Coursier:

```bash
curl -fL https://github.com/coursier/coursier/releases/latest/download/cs-x86_64-pc-linux.gz | gzip -d > cs
chmod +x cs
./cs setup
```

Po ponownym uruchomieniu shella:

```bash
scala -version
```

## Uruchamianie

Współczesne narzędzia Scala pozwalają uruchomić plik:

```bash
scala run guess.scala
```

Większe projekty używają m.in.:

- sbt,
- Mill,
- Scala CLI.

## Zgadnij liczbę

```scala
import scala.io.StdIn
import scala.util.Random

@main def guess(): Unit =
  val secret = Random.nextInt(101)
  var found = false

  while !found do
    print("Podaj liczbę 0-100: ")

    StdIn.readLine().toIntOption match
      case None =>
        println("Podaj poprawną liczbę.")

      case Some(value) if value < secret =>
        println("Za mało!")

      case Some(value) if value > secret =>
        println("Za dużo!")

      case Some(_) =>
        println("Brawo!")
        found = true
```

---

# 17. Lua

## Co to jest

Lua jest małym, dynamicznym językiem skryptowym powstałym w Brazylii.

Jedną z jego największych zalet jest łatwość osadzania interpretera Lua w innych programach.

## Gdzie się go używa

- gry,
- mody,
- silniki,
- konfiguracja,
- embedded scripting,
- OpenResty,
- Neovim.

## Instalacja - Windows

Oficjalna strona:

https://www.lua.org/

Na Windows często korzysta się z gotowych binariów, MSYS2 lub menedżera pakietów.

Przy MSYS2 można zainstalować odpowiedni pakiet Lua i używać go w terminalu MSYS2.

Sprawdzenie:

```powershell
lua -v
```

## Instalacja - macOS

```bash
brew install lua
```

Sprawdzenie:

```bash
lua -v
```

## Instalacja - Linux / Debian

```bash
sudo apt update
sudo apt install lua5.4
```

Sprawdzenie:

```bash
lua5.4 -v
```

W zależności od konfiguracji system może udostępnić również:

```bash
lua
```

## Uruchamianie

```bash
lua guess.lua
```

albo:

```bash
lua5.4 guess.lua
```

## Zgadnij liczbę

```lua
math.randomseed(os.time())

local secret = math.random(0, 100)

while true do
    io.write("Podaj liczbę 0-100: ")

    local guess = tonumber(io.read())

    if guess == nil then
        print("Podaj poprawną liczbę.")
    elseif guess < secret then
        print("Za mało!")
    elseif guess > secret then
        print("Za dużo!")
    else
        print("Brawo!")
        break
    end
end
```

---

# 18. Julia

## Co to jest

Julia została zaprojektowana przede wszystkim do obliczeń naukowych i numerycznych.

Łączy wygodną składnię języka wysokiego poziomu z kompilacją JIT opartą o LLVM.

## Gdzie się jej używa

- matematyka,
- fizyka,
- symulacje,
- modelowanie,
- data science,
- optymalizacja,
- HPC.

## Instalacja - Windows

Projekt rekomenduje dziś `juliaup`.

Oficjalna strona:

https://julialang.org/downloads/

Po instalacji:

```powershell
julia --version
```

## Instalacja - macOS

Również preferowany jest `juliaup`.

Można też użyć instalatora lub Homebrew.

Sprawdzenie:

```bash
julia --version
```

## Instalacja - Linux / Debian

Najlepiej korzystać z oficjalnego `juliaup`, ponieważ wersja w repozytorium dystrybucji może być starsza.

Dokumentacja:

https://julialang.org/downloads/

Po instalacji:

```bash
julia --version
```

## Uruchamianie

REPL:

```bash
julia
```

Plik:

```bash
julia guess.jl
```

## Zgadnij liczbę

```julia
secret = rand(0:100)

while true
    print("Podaj liczbę 0-100: ")

    input = readline()
    guess = tryparse(Int, input)

    if guess === nothing
        println("Podaj poprawną liczbę.")
    elseif guess < secret
        println("Za mało!")
    elseif guess > secret
        println("Za dużo!")
    else
        println("Brawo!")
        break
    end
end
```

---

# 19. Elixir

## Co to jest

Elixir jest językiem funkcyjnym działającym na maszynie wirtualnej BEAM.

BEAM wywodzi się ze świata Erlanga i została zaprojektowana pod kątem:

- współbieżności,
- odporności na błędy,
- systemów rozproszonych,
- długiego działania bez przestojów.

## Gdzie się go używa

- backend,
- systemy realtime,
- czaty,
- komunikacja,
- wysokodostępne usługi,
- Phoenix Framework.

## Instalacja - Windows

Oficjalne instrukcje:

https://elixir-lang.org/install.html

Elixir wymaga Erlang/OTP.

Na Windows najwygodniej korzystać z oficjalnych pakietów lub menedżera wersji wspieranego przez ekosystem.

Sprawdzenie:

```powershell
elixir --version
```

## Instalacja - macOS

Homebrew:

```bash
brew install elixir
```

Sprawdzenie:

```bash
elixir --version
```

## Instalacja - Linux / Debian

Do prostych eksperymentów:

```bash
sudo apt update
sudo apt install elixir erlang-dev
```

Sprawdzenie:

```bash
elixir --version
```

W projektach produkcyjnych warto kontrolować dokładną parę wersji Elixir + Erlang/OTP.

## Uruchamianie

Skrypt:

```text
guess.exs
```

Uruchomienie:

```bash
elixir guess.exs
```

Większe projekty:

```bash
mix new my_app
```

## Zgadnij liczbę

```elixir
secret = :rand.uniform(101) - 1

ask = fn ask ->
  input =
    "Podaj liczbę 0-100: "
    |> IO.gets()
    |> String.trim()

  case Integer.parse(input) do
    {guess, ""} when guess < secret ->
      IO.puts("Za mało!")
      ask.(ask)

    {guess, ""} when guess > secret ->
      IO.puts("Za dużo!")
      ask.(ask)

    {_, ""} ->
      IO.puts("Brawo!")

    _ ->
      IO.puts("Podaj poprawną liczbę.")
      ask.(ask)
  end
end

ask.(ask)
```

W tym przykładzie „pętla” jest zrealizowana rekurencyjnie, co dobrze pokazuje funkcyjny charakter języka.

---

# 20. Solidity

## Co to jest

Solidity jest językiem przeznaczonym do smart kontraktów działających przede wszystkim na Ethereum Virtual Machine.

To nie jest zwykły język aplikacji desktopowej czy CLI.

Program po wdrożeniu działa w środowisku blockchaina.

## Gdzie się go używa

- smart kontrakty,
- tokeny,
- DeFi,
- DAO,
- NFT,
- aplikacje EVM,
- logika blockchain.

## Instalacja - Windows

Do pierwszych eksperymentów można nie instalować nic lokalnie i użyć:

https://remix.ethereum.org/

Lokalnie można użyć kompilatora z ekosystemu Node.js.

Najpierw Node.js, potem:

```powershell
npm install --global solc
```

Sprawdzenie:

```powershell
solcjs --version
```

## Instalacja - macOS

Node.js:

```bash
brew install node
```

Solidity:

```bash
npm install --global solc
```

Sprawdzenie:

```bash
solcjs --version
```

## Instalacja - Linux / Debian

```bash
sudo apt update
sudo apt install nodejs npm
sudo npm install --global solc
```

Sprawdzenie:

```bash
solcjs --version
```

Oficjalna dokumentacja opisuje także natywne binaria i inne metody instalacji:

https://docs.soliditylang.org/

## Kompilacja

```bash
solcjs --bin --abi GuessNumber.sol
```

Powstaną m.in.:

- bytecode,
- ABI.

Sama kompilacja nie „uruchamia” kontraktu.

Do wykonania potrzebujesz EVM:

- Remix VM,
- lokalnego blockchaina,
- sieci testowej,
- prawdziwej sieci.

## Zgadnij liczbę - wersja kontraktowa

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
            return "Za malo!";
        }

        if (number > secret) {
            return "Za duzo!";
        }

        return "Brawo!";
    }
}
```

## Ważne: blockchain nie ma naprawdę prywatnych danych

Słowo:

```solidity
private
```

ogranicza dostęp z poziomu kontraktu, ale **nie sprawia, że wartość staje się tajna dla świata**.

Stan publicznego blockchaina można analizować.

Dlatego taka zgadywanka jest dobrym przykładem składni, ale kiepskim projektem prawdziwej gry wymagającej sekretu.

---

# Interpreter, kompilator, VM i JIT - czym się różnią?

Po dwudziestu przykładach widać, że słowo „uruchomić program” może oznaczać bardzo różne rzeczy.

## Kod natywny

C, C++, Go, Rust i Swift mogą zostać skompilowane do kodu wykonywanego bezpośrednio przez procesor:

```text
kod źródłowy
    |
    v
kompilator
    |
    v
plik wykonywalny
    |
    v
CPU
```

Przykład:

```bash
gcc hello.c -o hello
./hello
```

## Maszyna wirtualna

Java:

```text
.java -> javac -> .class -> JVM
```

Kotlin i Scala bardzo często korzystają z tej samej JVM.

C# działa w ekosystemie .NET.

Elixir działa na BEAM.

Solidity działa na EVM.

## JIT

JIT oznacza:

```text
Just-In-Time Compilation
```

Fragmenty programu są kompilowane podczas działania.

Mechanizmy JIT występują m.in. w:

- JavaScript,
- JVM,
- .NET,
- Julii,
- Darcie.

## Interpreter

Python, Ruby, PHP, R i Lua często nazywa się językami interpretowanymi.

To użyteczne uproszczenie, ale współczesne implementacje mogą po drodze używać:

- bytecode'u,
- maszyny wirtualnej,
- JIT,
- natywnych bibliotek.

Granica nie jest więc tak prosta jak:

```text
kompilowany vs interpretowany
```

---

# Ta sama logika, dwadzieścia składni

Każda nasza gra realizuje mniej więcej ten sam algorytm:

```text
wylosuj liczbę 0-100

dopóki gracz nie zgadł:
    pobierz wartość

    jeśli wejście jest niepoprawne:
        poproś ponownie

    jeśli liczba jest mniejsza:
        napisz "Za mało"

    jeśli liczba jest większa:
        napisz "Za dużo"

    jeśli jest równa:
        napisz "Brawo"
        zakończ
```

To bardzo ważna obserwacja.

Po nauczeniu się **programowania jako sposobu myślenia** kolejny język oznacza zwykle poznanie:

- nowej składni,
- innego systemu typów,
- innego modelu pamięci,
- nowych bibliotek,
- nowego toolchainu,
- nowego sposobu budowania i wdrażania.

Sam algorytm pozostaje ten sam.

---

# Jak rozpoznawać projekt po plikach?

Wchodzisz do nieznanego repozytorium. Zanim otworzysz kod, warto spojrzeć na pliki w katalogu głównym.

## Python

```text
pyproject.toml
requirements.txt
setup.py
*.py
```

Zobacz:

[Python - podstawy](techhandbook:doc-023)

## JavaScript / TypeScript

```text
package.json
package-lock.json
pnpm-lock.yaml
yarn.lock
tsconfig.json
```

Zobacz:

- [JavaScript - kompendium](techhandbook:doc-021)
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

Zobacz:

[C - czytanie, kompilacja i debugowanie](techhandbook:doc-019)

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

Zobacz:

[Go - czytanie kodu](techhandbook:doc-020)

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

Samo rozpoznanie ekosystemu to już bardzo praktyczna umiejętność.

---

# Które języki są do siebie podobne?

## Rodzina składni C

Podobne nawiasy, operatory i wiele podstawowych konstrukcji znajdziesz w:

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

To nie oznacza, że języki działają tak samo.

Oznacza tylko, że kod może na pierwszy rzut oka wyglądać znajomo.

## JVM

Wspólną platformę wykorzystują m.in.:

- Java,
- Kotlin,
- Scala.

Mogą korzystać z ogromnego ekosystemu bibliotek JVM.

## Web

Najczęściej spotkasz:

- JavaScript,
- TypeScript,
- PHP,
- Python,
- Ruby,
- Java,
- C#,
- Go,
- Elixir.

## Systemy

Najbardziej charakterystyczna grupa:

- C,
- C++,
- Rust.

Go często stoi krok wyżej od sprzętu, ale jest bardzo mocny w narzędziach systemowych i infrastrukturalnych.

## Mobile

- Kotlin - Android,
- Swift - platformy Apple,
- Dart - Flutter.

## Dane i nauka

- Python,
- R,
- Julia,
- Scala.

---

# Czy trzeba znać wszystkie?

Nie.

Dużo bardziej wartościowe jest dobre opanowanie kilku technologii niż powierzchowne nauczenie się dwudziestu języków.

Warto jednak rozpoznawać wszystkie.

Dzięki temu po zobaczeniu:

```text
Cargo.toml
```

wiesz, że wszedłeś do projektu Rust.

Po zobaczeniu:

```text
go.mod
```

wiesz, że to Go.

Po zobaczeniu:

```text
mix.exs
```

wiesz, że to Elixir.

Po zobaczeniu:

```text
pubspec.yaml
```

spodziewasz się Darta lub Fluttera.

To często wystarczy, żeby wiedzieć:

- czego szukać w dokumentacji,
- jaki toolchain zainstalować,
- jakiego polecenia build szukać,
- jakiego rodzaju błędów się spodziewać.

---

# Gdyby zapamiętać tylko jedno zdanie o każdym

**Python** - prosty język o gigantycznym ekosystemie, szczególnie mocny w AI, danych i automatyzacji.

**JavaScript** - podstawowy język programowania przeglądarki, który wyszedł również na serwery.

**TypeScript** - JavaScript z typami i większą kontrolą nad dużym projektem.

**Java** - jeden z głównych języków wielkich systemów biznesowych i świata JVM.

**C** - język fundamentów systemów operacyjnych, embedded i bibliotek.

**C++** - ogromna kontrola i wydajność za cenę dużej złożoności.

**C#** - współczesny język ekosystemu .NET, mocny w backendzie, biznesie i grach.

**Go** - prosty, kompilowany język świetny do backendu, CLI i infrastruktury.

**Rust** - język systemowy łączący wysoką wydajność z mocnym bezpieczeństwem pamięci.

**PHP** - jeden z filarów backendu WWW, który nadal obsługuje ogromną część internetu.

**Kotlin** - współczesny język JVM i jeden z podstawowych języków Androida.

**Swift** - podstawowy nowoczesny język platform Apple, działający również poza macOS.

**Dart** - język kojarzony przede wszystkim z wieloplatformowym Flutterem.

**Ruby** - dynamiczny język nastawiony na wygodę programisty, najbardziej znany z Rails.

**R** - wyspecjalizowane narzędzie do statystyki i analizy danych.

**Scala** - JVM połączona z mocnym programowaniem funkcyjnym i rozbudowanym systemem typów.

**Lua** - mały język świetny do osadzania wewnątrz innych aplikacji.

**Julia** - język obliczeń naukowych próbujący połączyć wygodę z dużą wydajnością.

**Elixir** - język do współbieżnych i odpornych systemów działających na BEAM.

**Solidity** - język smart kontraktów świata EVM.

---

# Co z językami, których nie ma na liście?

Brak języka w tym zestawieniu nie oznacza, że jest martwy.

## Assembly

Assembler zasługuje na osobny artykuł.

Nie istnieje jeden uniwersalny język Assembly. Kod zależy od architektury procesora, np.:
- MOS 6502,
- x86,
- x86-64,
- ARM,
- RISC-V.

Assembler będzie trzecim artykułem tej serii.

## Ada

Ada również dostanie osobny, rozbudowany materiał.

To język nadal używany tam, gdzie szczególnie ważne są:

- przewidywalność,
- bezpieczeństwo,
- możliwość dokładnej analizy programu,
- systemy safety-critical.

Ada będzie czwartym artykułem serii.

## FORTRAN i COBOL

Oba języki nadal wykonują prawdziwą pracę.

Umieścimy je jednak w osobnym materiale historycznym, ponieważ ich znaczenie jest dużo większe niż obecna liczba nowych projektów.

## Objective-C

Nadal występuje w ogromnej ilości istniejącego kodu Apple, ale w nowych projektach jego rolę w dużej mierze przejął Swift.

## Perl

Perl ciągle występuje w starszych systemach i automatyzacji, lecz znacznie rzadziej wybiera się go do nowych aplikacji.

## Zig

Zig jest ciekawym współczesnym językiem systemowym i warto go obserwować, ale jego ekosystem i rynek są nadal dużo mniejsze niż C, C++ czy Rust.

---

# Dlaczego właśnie te 20?

Nie istnieje jeden obiektywny ranking języków programowania.

Różne zestawienia mierzą różne rzeczy:

- GitHub - aktywność w repozytoriach,
- Stack Overflow - deklaracje programistów,
- TIOBE - widoczność i obecność języka w różnych źródłach,
- RedMonk - połączenie danych o kodzie i dyskusjach programistycznych.

Dlatego zamiast pytać:

> Który język jest dokładnie numerem 17?

lepiej zapytać:

> Jakie języki powinienem rozpoznawać, żeby rozumieć współczesny krajobraz programowania?

I właśnie na to pytanie odpowiada ta lista.

---

# Ściąga: instalacja na trzech systemach

| Język | Windows | macOS | Debian/Linux |
|---|---|---|---|
| Python | python.org / `winget` | python.org / Homebrew | `apt install python3` |
| JavaScript | Node.js installer | Homebrew / Node.js | `apt install nodejs npm` |
| TypeScript | npm | npm | npm |
| Java | JDK / Temurin | JDK / Homebrew | `apt install default-jdk` |
| C | MSVC / MSYS2 | Xcode CLT | `apt install build-essential` |
| C++ | MSVC / MSYS2 | Xcode CLT | `apt install build-essential` |
| C# | .NET SDK | .NET SDK | Microsoft repo + .NET SDK |
| Go | go.dev installer | go.dev / Homebrew | APT lub go.dev |
| Rust | rustup | rustup | rustup |
| PHP | windows.php.net | Homebrew | `apt install php-cli` |
| Kotlin | compiler ZIP / IDE | SDKMAN! / Homebrew | JDK + SDKMAN! |
| Swift | WinGet / installer | Xcode / swiftly | swiftly / official toolchain |
| Dart | Dart SDK / Flutter | Homebrew / Flutter | oficjalne repo APT |
| Ruby | RubyInstaller | Homebrew / rbenv | `apt install ruby-full` |
| R | CRAN | CRAN / Homebrew | `apt install r-base` |
| Scala | Coursier | Coursier | Coursier |
| Lua | binaria / MSYS2 | Homebrew | `apt install lua5.4` |
| Julia | juliaup | juliaup | juliaup |
| Elixir | Erlang + Elixir | Homebrew | APT lub version manager |
| Solidity | Node.js + solcjs / Remix | Node.js + solcjs | Node.js + solcjs |

---

# Dalsza nauka w TechHandbooku

Jeżeli po tym przeglądzie chcesz wejść głębiej:

- [C - czytanie, kompilacja i debugowanie](techhandbook:doc-019)
- [Go - czytanie kodu](techhandbook:doc-020)
- [JavaScript - kompendium](techhandbook:doc-021)
- [Node.js](techhandbook:doc-022)
- [Python - podstawy](techhandbook:doc-023)
- [Debian - shell](techhandbook:doc-027)
- [Visual Studio Code](techhandbook:doc-039)
- [GitHub](techhandbook:doc-014)

---

# Oficjalne źródła

Stan materiału: wrzesień 2026.

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

# Następne artykuły w serii

1. **20 współczesnych języków programowania, które warto znać** - ten artykuł.
2. **Stare języki programowania, które ukształtowały informatykę** - FORTRAN, COBOL, ALGOL, BASIC, Pascal, Lisp, Smalltalk, Prolog, Forth, PL/I, Logo i inne.
3. **Assembler od podstaw - od rejestrów i pamięci do prawdziwego programu**.
4. **Ada - język, w którym błędy mają być trudniejsze do popełnienia**.
