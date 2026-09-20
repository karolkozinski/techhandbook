---
id: "doc-023"
title: "Python — podstawy"
slug: "python-podstawy"
description: "Python to język programowania wysokiego poziomu, zaprojektowany tak, aby kod był możliwie czytelny."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "python"
---

# Python — podstawy

## 1. Czym jest Python

Python to język programowania wysokiego poziomu, zaprojektowany tak, aby kod był możliwie czytelny.

Najważniejsze cechy:

- prosta składnia,
- dynamiczne typowanie,
- automatyczne zarządzanie pamięcią,
- ogromna liczba bibliotek,
- działa na Linuxie, FreeBSD, macOS i Windows,
- często używany do:
  - automatyzacji,
  - skryptów,
  - backendu,
  - analizy danych,
  - AI/ML,
  - administracji systemami,
  - testów,
  - narzędzi CLI.

Python jest językiem interpretowanym w praktycznym znaczeniu: zwykle uruchamiasz kod bez ręcznego etapu kompilacji do programu wykonywalnego.

Najpopularniejsza implementacja to **CPython**.

---

# 2. Jak działa Python

Typowy plik Pythona:

```python
print("Hello world")
```

zapisujesz jako:

```text
hello.py
```

i uruchamiasz:

```bash
python3 hello.py
```

Python:

1. czyta kod,
2. analizuje składnię,
3. kompiluje kod do wewnętrznego bytecode,
4. wykonuje go w maszynie wirtualnej Pythona.

Bytecode może być zapisywany w katalogach:

```text
__pycache__/
```

z plikami podobnymi do:

```text
module.cpython-313.pyc
```

Nie jest to samodzielny program jak binarka C czy Go.

---

# 3. Python 2 a Python 3

Obecnie używa się **Pythona 3**.

Sprawdzenie:

```bash
python3 --version
```

lub czasami:

```bash
python --version
```

Na Linuxie polecenie:

```bash
python
```

nie zawsze istnieje.

Dlatego bezpieczniej używać:

```bash
python3
```

---

# 4. Instalacja

## Debian / Ubuntu

```bash
sudo apt update
sudo apt install python3
```

Przydatne dodatkowe pakiety:

```bash
sudo apt install python3-pip python3-venv
```

Sprawdzenie:

```bash
python3 --version
pip3 --version
```

---

## FreeBSD

```sh
pkg install python3
```

Lista dostępnych wersji:

```sh
pkg search python3
```

Przykładowo system może zainstalować:

```text
python311
python312
python313
```

---

## Windows

Python można zainstalować z:

```text
python.org
```

Podczas instalacji warto zaznaczyć:

```text
Add Python to PATH
```

Uruchamianie:

```powershell
python --version
```

lub:

```powershell
py --version
```

Windows posiada także launcher:

```powershell
py
```

Przykład:

```powershell
py script.py
```

---

# 5. Interpreter interaktywny

Uruchom:

```bash
python3
```

Dostaniesz prompt:

```text
>>>
```

Możesz wpisywać kod bez tworzenia pliku:

```python
>>> 2 + 2
4

>>> print("hello")
hello
```

Wyjście:

```python
exit()
```

albo:

```text
Ctrl+D
```

na Linux/Unix.

Interpreter świetnie nadaje się do:

- testowania składni,
- sprawdzania bibliotek,
- prostych obliczeń,
- eksperymentów.

---

# 6. Uruchamianie pliku

Plik:

```text
app.py
```

Uruchomienie:

```bash
python3 app.py
```

Można przekazać argumenty:

```bash
python3 app.py test.txt --verbose
```

---

# 7. Python jako wykonywalny skrypt

Na Linuxie / FreeBSD można dodać na początku:

```python
#!/usr/bin/env python3
```

Przykład:

```python
#!/usr/bin/env python3

print("Hello")
```

Nadaj prawa:

```bash
chmod +x script.py
```

Uruchom:

```bash
./script.py
```

---

# 8. Wcięcia są częścią składni

W Pythonie nie używa się klamer jak w C, Go czy JavaScript.

Zamiast:

```javascript
if (x > 5) {
    console.log(x);
}
```

Python:

```python
if x > 5:
    print(x)
```

Kod należący do bloku musi mieć wcięcie.

Najczęściej:

```text
4 spacje
```

Przykład błędny:

```python
if x > 5:
print(x)
```

Python zgłosi:

```text
IndentationError
```

Nie mieszaj tabulatorów i spacji.

---

# 9. Komentarze

Komentarz jednoliniowy:

```python
# komentarz
```

Przykład:

```python
x = 10  # liczba użytkowników
```

Docstring:

```python
def hello():
    """Wyświetla powitanie."""
    print("Hello")
```

Docstringi są używane do dokumentowania:

- funkcji,
- klas,
- modułów.

---

# 10. Zmienne

Nie trzeba deklarować typu.

```python
name = "Karol"
age = 46
price = 19.99
active = True
```

Typ może się zmienić:

```python
x = 10
x = "hello"
```

To jest poprawne.

Python jest:

```text
dynamicznie typowany
```

ale jednocześnie:

```text
silnie typowany
```

Przykład:

```python
"5" + 5
```

spowoduje błąd.

Trzeba zrobić:

```python
int("5") + 5
```

---

# 11. Nazwy zmiennych

Typowy styl:

```python
user_name = "Karol"
max_connections = 100
```

Stałe umownie:

```python
MAX_CONNECTIONS = 100
API_URL = "https://example.com"
```

Nazwy klas:

```python
class UserAccount:
    pass
```

Standard stylu Pythona opisuje dokument:

```text
PEP 8
```

---

# 12. Podstawowe typy danych

## int

Liczby całkowite:

```python
x = 10
y = -5
```

---

## float

```python
price = 19.99
```

---

## str

Tekst:

```python
name = "Karol"
```

lub:

```python
name = 'Karol'
```

---

## bool

```python
True
False
```

---

## None

Brak wartości:

```python
result = None
```

Odpowiednik w pewnym sensie:

```text
null
nil
```

z innych języków.

---

# 13. Sprawdzanie typu

```python
x = 10

print(type(x))
```

wynik:

```text
<class 'int'>
```

Sprawdzanie typu:

```python
isinstance(x, int)
```

---

# 14. Konwersje typów

```python
int("123")
float("12.5")
str(100)
bool(1)
```

Przykład:

```python
age = int(input("Podaj wiek: "))
```

---

# 15. Operatory matematyczne

```python
a + b
a - b
a * b
a / b
```

Dzielenie całkowite:

```python
10 // 3
```

wynik:

```text
3
```

Reszta:

```python
10 % 3
```

wynik:

```text
1
```

Potęga:

```python
2 ** 8
```

wynik:

```text
256
```

---

# 16. Porównania

```python
x == y
x != y
x > y
x < y
x >= y
x <= y
```

UWAGA:

```python
=
```

to przypisanie.

```python
==
```

to porównanie.

---

# 17. Operatory logiczne

```python
and
or
not
```

Przykład:

```python
if age >= 18 and active:
    print("OK")
```

---

# 18. Łańcuchy tekstowe

```python
text = "Hello world"
```

Długość:

```python
len(text)
```

Zmiana wielkości liter:

```python
text.upper()
text.lower()
```

Usuwanie białych znaków:

```python
text.strip()
```

Zamiana:

```python
text.replace("world", "Python")
```

Podział:

```python
text.split(" ")
```

Sprawdzenie:

```python
"world" in text
```

---

# 19. f-string

Najwygodniejszy sposób składania tekstu:

```python
name = "Karol"
age = 46

print(f"{name} ma {age} lat")
```

Można umieszczać wyrażenia:

```python
print(f"2 + 2 = {2 + 2}")
```

Formatowanie liczb:

```python
price = 12.3456

print(f"{price:.2f}")
```

wynik:

```text
12.35
```

---

# 20. Dostęp do znaków tekstu

```python
text = "Python"
```

Pierwszy znak:

```python
text[0]
```

wynik:

```text
P
```

Ostatni:

```python
text[-1]
```

wynik:

```text
n
```

Fragment:

```python
text[0:3]
```

wynik:

```text
Pyt
```

---

# 21. Listy

Lista:

```python
users = ["Anna", "Karol", "Piotr"]
```

Dostęp:

```python
users[0]
```

Dodawanie:

```python
users.append("Jan")
```

Usuwanie:

```python
users.remove("Anna")
```

Liczba elementów:

```python
len(users)
```

Iteracja:

```python
for user in users:
    print(user)
```

---

# 22. Tuple

Tuple jest podobne do listy, ale jest niemodyfikowalne.

```python
point = (10, 20)
```

Dostęp:

```python
point[0]
```

Tuple często reprezentują:

- współrzędne,
- pary wartości,
- wyniki funkcji.

---

# 23. Słownik — dict

Bardzo ważny typ.

```python
user = {
    "name": "Karol",
    "age": 46,
    "admin": True
}
```

Dostęp:

```python
user["name"]
```

Bezpieczniejsze:

```python
user.get("name")
```

Można podać wartość domyślną:

```python
user.get("email", "brak")
```

Dodanie:

```python
user["email"] = "user@example.com"
```

Iteracja:

```python
for key, value in user.items():
    print(key, value)
```

---

# 24. Set

Zbiór unikalnych elementów:

```python
numbers = {1, 2, 3}
```

Dodanie:

```python
numbers.add(4)
```

Set automatycznie usuwa duplikaty.

```python
{1, 1, 2, 2, 3}
```

da:

```text
{1, 2, 3}
```

---

# 25. if / elif / else

```python
age = 20

if age >= 18:
    print("dorosły")
else:
    print("niepełnoletni")
```

Kilka warunków:

```python
if score >= 90:
    print("A")
elif score >= 75:
    print("B")
else:
    print("C")
```

---

# 26. Wartości traktowane jako False

Python traktuje jako fałsz między innymi:

```python
False
None
0
0.0
""
[]
{}
set()
```

Dlatego często spotkasz:

```python
if users:
    print("Lista nie jest pusta")
```

zamiast:

```python
if len(users) > 0:
```

---

# 27. Pętla for

```python
for x in [1, 2, 3]:
    print(x)
```

Range:

```python
for i in range(5):
    print(i)
```

wynik:

```text
0
1
2
3
4
```

Zakres:

```python
range(1, 5)
```

wynik odpowiada:

```text
1 2 3 4
```

Krok:

```python
range(0, 10, 2)
```

---

# 28. enumerate

Gdy potrzebujesz indeksu:

```python
users = ["Anna", "Karol", "Jan"]

for index, user in enumerate(users):
    print(index, user)
```

---

# 29. zip

Łączenie kilku kolekcji:

```python
names = ["Anna", "Jan"]
ages = [30, 40]

for name, age in zip(names, ages):
    print(name, age)
```

---

# 30. Pętla while

```python
x = 0

while x < 5:
    print(x)
    x += 1
```

---

# 31. break i continue

Przerwanie pętli:

```python
for x in range(10):
    if x == 5:
        break
```

Pominięcie iteracji:

```python
for x in range(10):
    if x == 5:
        continue

    print(x)
```

---

# 32. Funkcje

Definicja:

```python
def hello():
    print("Hello")
```

Wywołanie:

```python
hello()
```

Argument:

```python
def hello(name):
    print(f"Hello {name}")
```

Wywołanie:

```python
hello("Karol")
```

---

# 33. return

```python
def add(a, b):
    return a + b
```

Użycie:

```python
result = add(2, 3)
```

---

# 34. Argument domyślny

```python
def hello(name="world"):
    print(f"Hello {name}")
```

```python
hello()
hello("Karol")
```

---

# 35. Argumenty nazwane

```python
def user(name, age):
    print(name, age)
```

Można:

```python
user(age=30, name="Karol")
```

---

# 36. *args

Dowolna liczba argumentów pozycyjnych:

```python
def add(*numbers):
    return sum(numbers)
```

```python
add(1, 2, 3, 4)
```

---

# 37. **kwargs

Dowolne argumenty nazwane:

```python
def show(**data):
    print(data)
```

```python
show(name="Karol", age=30)
```

otrzymasz słownik:

```python
{
    "name": "Karol",
    "age": 46
}
```

---

# 38. Typowanie opcjonalne — type hints

Python pozwala opisać typy:

```python
def add(a: int, b: int) -> int:
    return a + b
```

Zmienne:

```python
name: str = "Karol"
age: int = 46
```

Python zwykle nie wymusza tych typów podczas działania programu.

Służą przede wszystkim:

- IDE,
- analizatorom kodu,
- programistom,
- narzędziom takim jak mypy.

---

# 39. List comprehension

Bardzo częsta konstrukcja:

```python
numbers = [1, 2, 3, 4]

squares = [x * x for x in numbers]
```

wynik:

```python
[1, 4, 9, 16]
```

Z filtrem:

```python
even = [x for x in numbers if x % 2 == 0]
```

---

# 40. Moduły

Plik:

```text
math_utils.py
```

zawiera:

```python
def add(a, b):
    return a + b
```

Inny plik:

```python
import math_utils

print(math_utils.add(2, 3))
```

Można importować konkretną funkcję:

```python
from math_utils import add
```

i potem:

```python
add(2, 3)
```

---

# 41. Biblioteka standardowa

Python ma dużą bibliotekę standardową.

Przykłady:

```python
import os
import sys
import json
import pathlib
import subprocess
import datetime
import logging
import argparse
import sqlite3
```

Nie trzeba ich instalować przez pip.

---

# 42. __name__ i main

Bardzo częsta konstrukcja:

```python
def main():
    print("Program startuje")


if __name__ == "__main__":
    main()
```

Co to oznacza?

Jeśli uruchomisz:

```bash
python3 app.py
```

to:

```python
__name__
```

będzie miało wartość:

```text
__main__
```

Jeśli natomiast plik zostanie zaimportowany jako moduł, funkcja `main()` nie uruchomi się automatycznie.

---

# 43. Pakiety

Przykład projektu:

```text
project/
├── app.py
└── mypackage/
    ├── __init__.py
    ├── users.py
    └── database.py
```

Import:

```python
from mypackage.users import User
```

`__init__.py` historycznie oznaczał katalog jako pakiet Pythona i nadal jest bardzo często używany.

---

# 44. pip

`pip` jest menedżerem pakietów Pythona.

Instalacja biblioteki:

```bash
python3 -m pip install requests
```

To jest zwykle lepsza forma niż:

```bash
pip3 install requests
```

ponieważ jednoznacznie wskazuje interpreter.

Sprawdzenie pakietów:

```bash
python3 -m pip list
```

Informacje:

```bash
python3 -m pip show requests
```

Usunięcie:

```bash
python3 -m pip uninstall requests
```

---

# 45. Dlaczego nie instalować wszystkiego globalnie

Jeżeli projekt A potrzebuje:

```text
biblioteka 1.0
```

a projekt B:

```text
biblioteka 2.0
```

mogą pojawić się konflikty.

Dlatego projekty powinny mieć własne środowiska.

---

# 46. venv — środowisko wirtualne

Tworzenie:

```bash
python3 -m venv .venv
```

Powstanie katalog:

```text
.venv/
```

Aktywacja Linux / FreeBSD:

```bash
source .venv/bin/activate
```

Prompt zwykle zmieni się:

```text
(.venv) user@server:~/project$
```

Od tego momentu:

```bash
python
pip
```

dotyczą środowiska projektu.

Instalacja:

```bash
pip install requests
```

Wyjście:

```bash
deactivate
```

---

# 47. .venv w Git

Nie wrzucaj środowiska wirtualnego do Git.

`.gitignore`:

```gitignore
.venv/
__pycache__/
*.pyc
```

---

# 48. requirements.txt

Klasyczny sposób zapisywania zależności.

Eksport:

```bash
pip freeze > requirements.txt
```

Przykład:

```text
requests==2.32.5
flask==3.1.2
```

Instalacja:

```bash
pip install -r requirements.txt
```

---

# 49. pyproject.toml

Nowoczesne projekty Python coraz częściej używają:

```text
pyproject.toml
```

Może zawierać:

- dane projektu,
- zależności,
- konfigurację builda,
- konfigurację narzędzi.

Przykład:

```toml
[project]
name = "example"
version = "0.1.0"
dependencies = [
    "requests>=2.32",
]
```

Jeżeli widzisz `pyproject.toml`, zacznij od jego przeczytania.

---

# 50. Instalacja projektu

W katalogu z projektem:

```bash
pip install .
```

Tryb developerski:

```bash
pip install -e .
```

`-e` oznacza editable.

Zmiany w kodzie projektu są dostępne bez ponownej instalacji.

---

# 51. Czytanie plików

Nowoczesny sposób:

```python
from pathlib import Path

text = Path("file.txt").read_text()
print(text)
```

Zapis:

```python
Path("file.txt").write_text("Hello")
```

Kodowanie UTF-8:

```python
Path("file.txt").read_text(encoding="utf-8")
```

---

# 52. Klasyczne open()

```python
with open("file.txt", "r", encoding="utf-8") as file:
    content = file.read()
```

Zapis:

```python
with open("file.txt", "w", encoding="utf-8") as file:
    file.write("Hello")
```

Dopisanie:

```python
with open("file.txt", "a", encoding="utf-8") as file:
    file.write("kolejna linia\n")
```

---

# 53. with

Konstrukcja:

```python
with ...
```

zarządza zasobem.

Dzięki temu plik zostanie zamknięty automatycznie.

```python
with open("file.txt") as f:
    data = f.read()
```

Nie trzeba:

```python
f.close()
```

---

# 54. JSON

```python
import json
```

Python → JSON:

```python
data = {
    "name": "Karol",
    "age": 46
}

text = json.dumps(data)
```

JSON → Python:

```python
data = json.loads(text)
```

Plik:

```python
with open("data.json", "r") as f:
    data = json.load(f)
```

Zapis:

```python
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)
```

---

# 55. Wyjątki

Przykład błędu:

```python
x = int("abc")
```

spowoduje:

```text
ValueError
```

Obsługa:

```python
try:
    x = int("abc")
except ValueError:
    print("Niepoprawna liczba")
```

---

# 56. try / except / else / finally

```python
try:
    x = int(input("Liczba: "))
except ValueError:
    print("Błąd")
else:
    print("OK")
finally:
    print("Koniec")
```

`finally` wykona się niezależnie od wyniku.

---

# 57. raise

Można samemu zgłosić wyjątek:

```python
if age < 0:
    raise ValueError("Wiek nie może być ujemny")
```

---

# 58. Klasy

Podstawowa klasa:

```python
class User:
    def __init__(self, name):
        self.name = name

    def hello(self):
        print(f"Hello {self.name}")
```

Utworzenie obiektu:

```python
user = User("Karol")
```

Wywołanie:

```python
user.hello()
```

---

# 59. self

`self` oznacza bieżący obiekt.

```python
self.name
```

to pole konkretnej instancji klasy.

Podobna koncepcja do:

```text
this
```

w JavaScript, Java czy C++.

---

# 60. Dziedziczenie

```python
class Animal:
    def speak(self):
        print("...")


class Dog(Animal):
    def speak(self):
        print("Woof")
```

---

# 61. dataclass

Do prostych struktur danych często używa się:

```python
from dataclasses import dataclass


@dataclass
class User:
    name: str
    age: int
```

Użycie:

```python
user = User("Karol", 30)
```

Python automatycznie tworzy między innymi konstruktor.

---

# 62. Lambda

Krótka anonimowa funkcja:

```python
square = lambda x: x * x
```

Najczęściej spotkasz ją jako argument:

```python
users.sort(key=lambda user: user["name"])
```

Nie należy przesadzać z lambda — zwykła funkcja jest często czytelniejsza.

---

# 63. import os

Obsługa systemu:

```python
import os

print(os.getcwd())
```

Zmienne środowiskowe:

```python
api_key = os.getenv("API_KEY")
```

To częsty sposób przechowywania sekretów.

---

# 64. pathlib

Nowoczesna obsługa ścieżek:

```python
from pathlib import Path

path = Path("data") / "file.txt"
```

Sprawdzenie:

```python
path.exists()
```

Katalog:

```python
path.parent
```

Nazwa:

```python
path.name
```

---

# 65. sys

```python
import sys
```

Argumenty programu:

```python
print(sys.argv)
```

Jeśli uruchomisz:

```bash
python3 app.py hello world
```

to:

```python
sys.argv
```

będzie podobne do:

```python
["app.py", "hello", "world"]
```

---

# 66. argparse

Do tworzenia prawdziwego CLI:

```python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("name")
parser.add_argument("--verbose", action="store_true")

args = parser.parse_args()

print(args.name)
```

Uruchomienie:

```bash
python3 app.py Karol --verbose
```

Pomoc generowana automatycznie:

```bash
python3 app.py --help
```

---

# 67. subprocess

Uruchamianie poleceń systemowych:

```python
import subprocess

subprocess.run(["ls", "-la"])
```

Pobranie wyniku:

```python
result = subprocess.run(
    ["uname", "-a"],
    capture_output=True,
    text=True
)

print(result.stdout)
```

Unikaj składania poleceń z niesprawdzonego inputu użytkownika.

---

# 68. requests

Popularna biblioteka do HTTP.

Instalacja:

```bash
pip install requests
```

Kod:

```python
import requests

response = requests.get("https://example.com")

print(response.status_code)
print(response.text)
```

JSON:

```python
data = response.json()
```

---

# 69. Backend webowy

Popularne frameworki:

## Flask

Prosty i lekki.

```bash
pip install flask
```

Minimalna aplikacja:

```python
from flask import Flask

app = Flask(__name__)


@app.route("/")
def index():
    return "Hello"
```

Uruchomienie:

```bash
flask --app app run
```

---

## FastAPI

Bardzo popularny do API.

```bash
pip install fastapi uvicorn
```

Kod:

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def index():
    return {"hello": "world"}
```

Start:

```bash
uvicorn app:app --reload
```

---

## Django

Duży framework posiadający m.in.:

- ORM,
- panel admina,
- routing,
- formularze,
- autoryzację,
- system szablonów.

Instalacja:

```bash
pip install django
```

Nadaje się do większych aplikacji webowych.

---

# 70. SQLite

Python ma SQLite w bibliotece standardowej:

```python
import sqlite3

conn = sqlite3.connect("app.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT
)
""")

conn.commit()
conn.close()
```

---

# 71. Logging

Zamiast wielu `print()` w większych programach:

```python
import logging

logging.basicConfig(level=logging.INFO)

logging.info("Program uruchomiony")
logging.warning("Uwaga")
logging.error("Błąd")
```

---

# 72. Testy

Python posiada `unittest`:

```python
import unittest


def add(a, b):
    return a + b


class TestMath(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)


if __name__ == "__main__":
    unittest.main()
```

Popularniejsze w wielu projektach jest:

```text
pytest
```

Instalacja:

```bash
pip install pytest
```

Test:

```python
def test_add():
    assert 2 + 3 == 5
```

Uruchomienie:

```bash
pytest
```

---

# 73. Debugowanie

Najprostsze:

```python
print(variable)
```

Lepsze:

```python
breakpoint()
```

Przykład:

```python
x = 10

breakpoint()

print(x)
```

Uruchomienie programu zatrzyma się w debuggerze Pythona.

Podstawowe komendy:

```text
n
```

next

```text
s
```

step

```text
c
```

continue

```text
p x
```

print wartości `x`

```text
q
```

quit

---

# 74. Traceback

Gdy program się wywróci, Python pokaże traceback.

Przykład:

```text
Traceback (most recent call last):
  File "/home/user/app.py", line 12, in <module>
    run()
  File "/home/user/app.py", line 8, in run
    x = int("abc")
ValueError: invalid literal for int()
```

Czytaj od końca:

```text
ValueError
```

to typ błędu.

Następnie zobacz:

```text
File ...
line ...
```

Traceback pokazuje drogę, którą program doszedł do błędu.

---

# 75. Formatowanie kodu

Popularny formatter:

```text
black
```

Instalacja:

```bash
pip install black
```

Uruchomienie:

```bash
black .
```

---

# 76. Ruff

Bardzo szybkie narzędzie do lintingu i formatowania.

Instalacja:

```bash
pip install ruff
```

Sprawdzenie kodu:

```bash
ruff check .
```

Automatyczne poprawki:

```bash
ruff check . --fix
```

Formatowanie:

```bash
ruff format .
```

---

# 77. mypy

Statyczne sprawdzanie type hints:

```bash
pip install mypy
```

Uruchomienie:

```bash
mypy app.py
```

---

# 78. Typowa struktura prostego projektu

```text
project/
├── .gitignore
├── README.md
├── pyproject.toml
├── .venv/
├── src/
│   └── app/
│       ├── __init__.py
│       ├── main.py
│       └── utils.py
└── tests/
    └── test_main.py
```

W mniejszych projektach spotkasz też:

```text
project/
├── app.py
├── utils.py
├── requirements.txt
└── README.md
```

---

# 79. Jak uruchomić cudzy projekt

Najpierw:

```bash
git clone ADRES_REPO
cd projekt
```

Sprawdź:

```bash
ls -la
```

Szukaj:

```text
README.md
pyproject.toml
requirements.txt
setup.py
Pipfile
poetry.lock
uv.lock
```

Najważniejszy jest zwykle:

```text
README.md
```

---

# 80. Typowy workflow z requirements.txt

```bash
git clone ...
cd projekt

python3 -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt
```

Potem np.:

```bash
python app.py
```

---

# 81. Typowy workflow z pyproject.toml

```bash
python3 -m venv .venv
source .venv/bin/activate

pip install .
```

albo developersko:

```bash
pip install -e .
```

Następnie przeczytaj README, aby znaleźć komendę startową.

---

# 82. Uruchamianie modułu przez -m

Można uruchamiać moduły:

```bash
python3 -m moduł
```

Przykład:

```bash
python3 -m http.server
```

uruchamia prosty serwer HTTP.

Domyślnie:

```text
http://localhost:8000
```

Inny port:

```bash
python3 -m http.server 9000
```

---

# 83. python -m pip

Lepsze:

```bash
python3 -m pip install requests
```

niż:

```bash
pip3 install requests
```

Dlaczego?

Bo masz pewność, że pip należy do tego samego interpretera:

```bash
python3
```

---

# 84. Sprawdzanie interpretera

```bash
which python3
```

Przykład:

```text
/usr/bin/python3
```

Po aktywacji venv:

```bash
which python
```

może zwrócić:

```text
/home/user/project/.venv/bin/python
```

---

# 85. Wersje Pythona

Sprawdzenie:

```bash
python3 --version
```

W kodzie:

```python
import sys

print(sys.version)
```

Wersja jako struktura:

```python
print(sys.version_info)
```

---

# 86. __pycache__

Python może tworzyć:

```text
__pycache__/
```

To cache skompilowanego bytecode.

Możesz go usunąć.

Nie powinien trafiać do repozytorium.

`.gitignore`:

```gitignore
__pycache__/
*.py[cod]
```

---

# 87. Zmienne środowiskowe

Shell:

```bash
export API_KEY="abc123"
```

Python:

```python
import os

api_key = os.getenv("API_KEY")
```

Nie zapisuj sekretów bezpośrednio w kodzie:

```python
API_KEY = "tajny-klucz"
```

szczególnie jeśli kod trafia do GitHub.

---

# 88. .env

Popularny sposób lokalnego przechowywania konfiguracji:

```text
.env
```

Przykład:

```text
API_KEY=abc123
DATABASE_URL=...
```

Biblioteka:

```bash
pip install python-dotenv
```

Kod:

```python
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("API_KEY")
```

`.gitignore`:

```gitignore
.env
```

---

# 89. Dekoratory

Spotkasz kod:

```python
@something
def function():
    pass
```

`@something` to dekorator.

Pozwala zmodyfikować lub opakować zachowanie funkcji albo klasy.

Przykład:

```python
@staticmethod
def hello():
    pass
```

We frameworkach spotkasz często:

```python
@app.get("/")
```

albo:

```python
@app.route("/")
```

Nie musisz od razu rozumieć mechanizmu dekoratorów, aby czytać większość kodu.

---

# 90. Generator i yield

Zwykła funkcja:

```python
def numbers():
    return [1, 2, 3]
```

Generator:

```python
def numbers():
    yield 1
    yield 2
    yield 3
```

Iteracja:

```python
for n in numbers():
    print(n)
```

Generator tworzy wartości na bieżąco zamiast trzymać cały wynik w pamięci.

---

# 91. Iterator

Python często używa protokołu iteratorów.

Przykład:

```python
for item in items:
    ...
```

Lista, generator, plik i wiele innych obiektów może być iterowane.

Funkcja:

```python
iter()
```

tworzy iterator.

```python
next()
```

pobiera kolejny element.

---

# 92. async / await

Python obsługuje programowanie asynchroniczne.

Przykład:

```python
import asyncio


async def main():
    await asyncio.sleep(1)
    print("gotowe")


asyncio.run(main())
```

Spotkasz je szczególnie w:

- API,
- crawlerach,
- botach,
- aplikacjach sieciowych,
- kodzie korzystającym z wielu połączeń.

---

# 93. await

`await` mówi mniej więcej:

> poczekaj na wynik tej operacji, ale pozwól pętli zdarzeń wykonywać inne zadania.

Nie oznacza automatycznie:

```text
nowy wątek
```

Asyncio jest innym modelem współbieżności.

---

# 94. threading

Python posiada wątki:

```python
import threading
```

W CPython istnieje mechanizm:

```text
GIL — Global Interpreter Lock
```

który wpływa na wykonywanie kodu CPU-bound w wielu wątkach.

Do operacji:

- sieciowych,
- dyskowych,
- I/O

wątki nadal mogą być bardzo użyteczne.

---

# 95. multiprocessing

Dla zadań mocno obciążających CPU można używać:

```python
multiprocessing
```

Procesy mają osobne interpretery i mogą wykorzystać wiele rdzeni CPU.

---

# 96. Popularne biblioteki

## HTTP

```text
requests
httpx
aiohttp
```

## Backend

```text
Flask
FastAPI
Django
```

## Dane

```text
NumPy
pandas
Polars
```

## Wykresy

```text
Matplotlib
Plotly
```

## AI / ML

```text
PyTorch
TensorFlow
scikit-learn
transformers
```

## CLI

```text
argparse
click
typer
```

## Testy

```text
pytest
```

## Browser automation

```text
Playwright
Selenium
```

---

# 97. Gdzie Python jest słabszym wyborem

Python zwykle nie jest pierwszym wyborem dla:

- kodu wymagającego maksymalnej wydajności,
- sterowników,
- kernela,
- bardzo małych systemów embedded,
- frontendowego kodu wykonywanego bezpośrednio w przeglądarce,
- aplikacji wymagających jednej bardzo małej binarki bez runtime.

W takich miejscach częściej pojawia się:

```text
C
C++
Rust
Go
JavaScript
```

---

# 98. Python a JavaScript

Python:

```python
name = "Karol"

if name:
    print(name)
```

JavaScript:

```javascript
const name = "Karol";

if (name) {
    console.log(name);
}
```

Największa różnica wizualna:

Python używa:

```text
wcięć
```

zamiast:

```text
{}
```

---

# 99. Python a Go

Python:

```python
def add(a, b):
    return a + b
```

Go:

```go
func add(a int, b int) int {
    return a + b
}
```

Python jest bardziej dynamiczny.

Go jest:

- statycznie typowany,
- kompilowany do binarki,
- bardziej restrykcyjny,
- zwykle prostszy w deploymencie.

---

# 100. Typowe błędy początkujących

## Złe wcięcie

```text
IndentationError
```

---

## Literówka w nazwie

```text
NameError
```

---

## Zły typ

```text
TypeError
```

---

## Niepoprawna wartość

```text
ValueError
```

---

## Brak klucza

```text
KeyError
```

---

## Brak elementu listy

```text
IndexError
```

---

## Brak pliku

```text
FileNotFoundError
```

---

## Brak modułu

```text
ModuleNotFoundError
```

Najczęściej oznacza:

- brak biblioteki,
- nieaktywne venv,
- uruchomienie złego interpretera.

---

# 101. Jak sprawdzić, skąd ładowany jest moduł

```python
import requests

print(requests.__file__)
```

Przydatne, gdy masz kilka środowisk lub wersji pakietu.

---

# 102. help()

W interpreterze:

```python
help(str)
```

lub:

```python
help(list.append)
```

Wyjście:

```python
help()
```

i wpisz:

```text
quit
```

---

# 103. dir()

Lista atrybutów obiektu:

```python
dir(str)
```

Przydatne do eksploracji API.

---

# 104. Dokumentacja funkcji

```python
print(print.__doc__)
```

albo:

```python
help(print)
```

---

# 105. dir + type + help

Trzy bardzo przydatne narzędzia do eksploracji:

```python
type(obj)
dir(obj)
help(obj)
```

Pozwalają szybko zrozumieć nieznany obiekt.

---

# 106. Instalacja narzędzi CLI — pipx

Niektórych narzędzi nie warto instalować do projektu.

Przykłady:

```text
black
ruff
poetry
httpie
```

Do takich programów często wygodne jest:

```text
pipx
```

Debian:

```bash
sudo apt install pipx
pipx ensurepath
```

Instalacja:

```bash
pipx install ruff
```

Każde narzędzie dostaje własne środowisko.

---

# 107. Poetry, uv i inne narzędzia

W projektach możesz spotkać:

```text
Poetry
Pipenv
uv
Hatch
PDM
```

Ich zadaniem jest zarządzanie:

- zależnościami,
- środowiskami,
- buildem projektu.

Jeśli projekt używa jednego z nich, najlepiej używać narzędzia przewidzianego przez autora projektu zamiast przebudowywać projekt na własną rękę.

---

# 108. uv

`uv` to nowoczesne i bardzo szybkie narzędzie do zarządzania Pythonem, środowiskami i zależnościami.

Możesz spotkać plik:

```text
uv.lock
```

Typowy workflow może wyglądać:

```bash
uv sync
```

a uruchomienie:

```bash
uv run python app.py
```

Jeżeli repo posiada `uv.lock`, przeczytaj README projektu przed ręcznym instalowaniem pakietów pipem.

---

# 109. Docker i Python

Przykładowy Dockerfile:

```dockerfile
FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "app.py"]
```

Budowanie:

```bash
docker build -t my-python-app .
```

Uruchomienie:

```bash
docker run --rm my-python-app
```

---

# 110. Przykładowy .gitignore

```gitignore
# Python
__pycache__/
*.py[cod]

# virtualenv
.venv/
venv/

# secrets
.env

# tests / tools
.pytest_cache/
.mypy_cache/
.ruff_cache/

# IDE
.vscode/
.idea/
```

---

# 111. Minimalny program CLI

```python
#!/usr/bin/env python3

def main():
    name = input("Jak masz na imię? ")

    if not name:
        print("Nie podałeś imienia.")
        return

    print(f"Cześć, {name}!")


if __name__ == "__main__":
    main()
```

Uruchomienie:

```bash
python3 app.py
```

---

# 112. Prosty skrypt przetwarzający plik

```python
from pathlib import Path


def main():
    path = Path("input.txt")

    if not path.exists():
        print("Brak pliku.")
        return

    text = path.read_text(encoding="utf-8")

    lines = text.splitlines()

    print(f"Liczba linii: {len(lines)}")
    print(f"Liczba znaków: {len(text)}")


if __name__ == "__main__":
    main()
```

---

# 113. Proste pobranie API

```python
import requests


def main():
    response = requests.get(
        "https://api.github.com",
        timeout=10,
    )

    response.raise_for_status()

    data = response.json()

    print(data)


if __name__ == "__main__":
    main()
```

Instalacja:

```bash
python3 -m venv .venv
source .venv/bin/activate

pip install requests
```

Uruchomienie:

```bash
python app.py
```

---

# 114. response.raise_for_status()

Przy requests:

```python
response.raise_for_status()
```

zgłosi wyjątek dla błędów HTTP takich jak:

```text
404
500
403
```

To często lepsze niż zakładanie, że każde zapytanie się udało.

---

# 115. Czytanie kodu Pythona — kolejność

Gdy otwierasz nieznany projekt:

1. przeczytaj `README.md`,
2. znajdź `pyproject.toml` lub `requirements.txt`,
3. znajdź punkt startowy,
4. szukaj `main()`,
5. szukaj:

```python
if __name__ == "__main__":
```

6. zobacz importy,
7. znajdź konfigurację,
8. sprawdź zmienne środowiskowe,
9. zobacz katalog testów,
10. dopiero potem czytaj implementację szczegółową.

---

# 116. Jak rozpoznać punkt wejścia

Może nim być:

```text
main.py
app.py
server.py
cli.py
manage.py
```

lub wpis w:

```text
pyproject.toml
```

Na przykład:

```toml
[project.scripts]
myapp = "myapp.cli:main"
```

oznacza mniej więcej:

```text
uruchom funkcję main z modułu myapp.cli
```

---

# 117. Jak znaleźć zależności

Szukaj:

```text
requirements.txt
requirements-dev.txt
pyproject.toml
Pipfile
poetry.lock
uv.lock
```

Nigdy nie zakładaj, że samo:

```bash
pip install -r requirements.txt
```

jest właściwe dla każdego projektu.

Najpierw przeczytaj README.

---

# 118. Jak sprawdzić importy

Przykład:

```python
import os
import requests

from pathlib import Path
from flask import Flask
from project.database import Database
```

Możesz podzielić je na:

### standard library

```python
os
pathlib
```

### zewnętrzne biblioteki

```python
requests
flask
```

### kod projektu

```python
project.database
```

To pomaga szybko zrozumieć architekturę.

---

# 119. Jak czytać traceback

Załóżmy:

```text
Traceback...
File "app.py", line 20
File "users.py", line 10
File "database.py", line 42

KeyError: 'name'
```

Najpierw:

```text
KeyError: 'name'
```

Potem:

```text
database.py line 42
```

To najbliższe miejsce faktycznego błędu.

Dopiero potem patrz wyżej na ścieżkę wywołań.

---

# 120. Przydatne polecenia

Wersja:

```bash
python3 --version
```

Interpreter:

```bash
which python3
```

pip:

```bash
python3 -m pip --version
```

Pakiety:

```bash
python3 -m pip list
```

Środowisko:

```bash
python3 -m venv .venv
```

Aktywacja:

```bash
source .venv/bin/activate
```

Instalacja zależności:

```bash
pip install -r requirements.txt
```

Uruchomienie:

```bash
python app.py
```

Testy:

```bash
pytest
```

Wyjście z venv:

```bash
deactivate
```

---

# 121. Cheat sheet składni

## zmienna

```python
x = 10
```

## tekst

```python
name = "Karol"
```

## lista

```python
items = [1, 2, 3]
```

## słownik

```python
user = {"name": "Karol"}
```

## if

```python
if x > 5:
    print(x)
```

## for

```python
for item in items:
    print(item)
```

## while

```python
while x > 0:
    x -= 1
```

## funkcja

```python
def add(a, b):
    return a + b
```

## klasa

```python
class User:
    pass
```

## wyjątek

```python
try:
    ...
except ValueError:
    ...
```

## import

```python
import os
```

## plik

```python
with open("file.txt") as f:
    data = f.read()
```

---

# 122. Minimalny workflow nowego projektu

```bash
mkdir projekt
cd projekt

python3 -m venv .venv

source .venv/bin/activate
```

Utwórz:

```text
app.py
```

Kod:

```python
def main():
    print("Hello Python")


if __name__ == "__main__":
    main()
```

Uruchom:

```bash
python app.py
```

Jeżeli potrzebujesz biblioteki:

```bash
pip install requests
```

Zapis zależności:

```bash
pip freeze > requirements.txt
```

---

# 123. Minimalny workflow pobranego projektu

```bash
git clone URL
cd REPO
```

Przeczytaj:

```bash
less README.md
```

Sprawdź pliki:

```bash
ls -la
```

Utwórz środowisko:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Jeśli projekt posiada:

```text
requirements.txt
```

to najczęściej:

```bash
pip install -r requirements.txt
```

Jeśli ma:

```text
pyproject.toml
```

to może być:

```bash
pip install -e .
```

ale zawsze najpierw sprawdź instrukcję autora.

---

# 124. Najważniejsze rzeczy do zapamiętania

Jeżeli chcesz przede wszystkim rozumieć i uruchamiać kod Pythona, zapamiętaj te rzeczy:

1. Python używa **wcięć zamiast klamer**.
2. Pliki mają zwykle rozszerzenie:

```text
.py
```

3. Uruchomienie:

```bash
python3 app.py
```

4. Projekty powinny używać:

```text
venv
```

5. Biblioteki instalujesz przez:

```bash
pip
```

6. Zależności znajdziesz najczęściej w:

```text
requirements.txt
pyproject.toml
```

7. Najważniejsze typy:

```text
int
float
str
bool
list
tuple
dict
set
None
```

8. Najważniejsze konstrukcje:

```text
if
for
while
def
class
try
import
with
```

9. Przy błędzie czytaj **koniec tracebacka**.

10. Cudzego projektu nie uruchamiaj w ciemno. Najpierw:

```text
README → zależności → venv → instalacja → konfiguracja → start
```

11. Nie zapisuj sekretów w kodzie ani w repozytorium.

12. `python -m ...` jest bardzo przydatnym mechanizmem.

13. `type()`, `dir()` i `help()` pozwalają szybko eksplorować nieznany kod.

14. `pathlib` jest zwykle wygodniejsze od starego stylu ręcznego składania ścieżek.

15. Python jest świetnym językiem do automatyzacji i klejenia różnych systemów w całość.

---

# 125. Komendy, które warto znać na pamięć

```bash
python3 --version

python3

python3 app.py

python3 -m venv .venv

source .venv/bin/activate

python -m pip install PACKAGE

python -m pip install -r requirements.txt

python -m pip list

pytest

deactivate
```

Jeżeli swobodnie rozumiesz powyższe polecenia oraz konstrukcje opisane w tym kompendium, jesteś w stanie uruchomić, przejrzeć i wstępnie debugować większość zwykłych projektów napisanych w Pythonie.
