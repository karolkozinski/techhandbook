# Python — Practical Handbook

## 1. What Python is

Python is a high-level, general-purpose language used for scripting, automation, backend development, data processing, testing and AI/ML.

Its strengths are readable syntax, a large standard library and a huge ecosystem.

## 2. How Python runs

Python source files usually use the `.py` extension.

A Python interpreter reads and executes the program:

```bash
python3 script.py
```

Python normally compiles source internally to bytecode and executes it in the Python virtual machine.

## 3. Python 2 vs Python 3

Use Python 3.

Check:

```bash
python3 --version
```

## 4. Installation

Debian / Ubuntu:

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

FreeBSD:

```bash
sudo pkg install python3 py311-pip
```

Windows can use the official installer or package managers such as winget.

## 5. Interactive interpreter

```bash
python3
```

Exit with:

```python
exit()
```

## 6. Running a file

```bash
python3 app.py
```

Executable script:

```python
#!/usr/bin/env python3

print("Hello")
```

Then:

```bash
chmod +x app.py
./app.py
```

## 7. Indentation is syntax

Python uses indentation to define blocks.

```python
if ready:
    print("Go")
```

Do not mix tabs and spaces.

## 8. Comments

```python
# comment
```

## 9. Variables

```python
name = "Alice"
age = 42
active = True
```

Python is dynamically typed.

## 10. Naming

Common style:

```python
user_name = "Alice"
MAX_RETRIES = 5
```

Use snake_case for functions and variables, PascalCase for classes and UPPER_CASE for constants.

## 11. Basic data types

Integer:

```python
count = 10
```

Float:

```python
price = 19.99
```

String:

```python
name = "Alice"
```

Boolean:

```python
enabled = True
```

No value:

```python
result = None
```

## 12. Checking and converting types

```python
type(value)

int("42")
float("3.14")
str(123)
bool(1)
```

## 13. Operators

```python
+ - * / // % **
== != < <= > >=
and or not
```

## 14. Strings

```python
text = "hello"
text.upper()
text.lower()
text.strip()
text.replace("h", "H")
```

f-string:

```python
name = "Alice"
print(f"Hello {name}")
```

Indexing and slicing:

```python
text[0]
text[-1]
text[1:4]
```

## 15. Lists

```python
items = ["a", "b", "c"]

items.append("d")
items.remove("b")
print(items[0])
```

## 16. Tuples

Immutable sequence:

```python
point = (10, 20)
x, y = point
```

## 17. Dictionaries

```python
user = {
    "name": "Alice",
    "age": 42,
}

print(user["name"])
print(user.get("email"))
```

## 18. Sets

```python
roles = {"admin", "editor"}
roles.add("viewer")
```

Sets store unique values.

## 19. Conditions

```python
if age >= 18:
    print("adult")
elif age >= 13:
    print("teen")
else:
    print("child")
```

Falsy values include `False`, `None`, zero and empty containers.

## 20. Loops

```python
for item in items:
    print(item)
```

```python
for index, item in enumerate(items):
    print(index, item)
```

```python
for a, b in zip(list_a, list_b):
    print(a, b)
```

```python
while running:
    ...
```

Use `break` and `continue` when needed.

## 21. Functions

```python
def add(a, b):
    return a + b
```

Default argument:

```python
def greet(name="World"):
    print(f"Hello {name}")
```

Keyword arguments:

```python
greet(name="Alice")
```

Variable arguments:

```python
def total(*values):
    return sum(values)
```

Keyword dictionary:

```python
def configure(**options):
    print(options)
```

## 22. Type hints

```python
def add(a: int, b: int) -> int:
    return a + b
```

Type hints improve tooling and readability but are not runtime enforcement by default.

## 23. List comprehensions

```python
squares = [x * x for x in range(10)]
active = [u for u in users if u["active"]]
```

## 24. Modules and imports

```python
import os
from pathlib import Path
from package import helper
```

## 25. Standard library

Important modules include:

- `os`,
- `sys`,
- `pathlib`,
- `json`,
- `datetime`,
- `subprocess`,
- `argparse`,
- `logging`,
- `sqlite3`,
- `asyncio`.

## 26. `__name__` and main

```python
def main():
    print("start")

if __name__ == "__main__":
    main()
```

This allows a file to work as both an importable module and an executable script.

## 27. Packages

A package is a directory of Python modules, traditionally containing `__init__.py`.

Modern projects often use a `src/` layout.

## 28. pip

```bash
python3 -m pip install requests
python3 -m pip list
python3 -m pip show requests
```

Prefer `python -m pip` when you want to be sure which interpreter owns the package installation.

## 29. Virtual environments

Do not install every project dependency globally.

Create:

```bash
python3 -m venv .venv
```

Activate on Linux:

```bash
source .venv/bin/activate
```

Deactivate:

```bash
deactivate
```

Add `.venv/` to `.gitignore`.

## 30. requirements.txt

```bash
python3 -m pip install -r requirements.txt
python3 -m pip freeze > requirements.txt
```

## 31. pyproject.toml

Modern Python projects commonly define package metadata and tooling in `pyproject.toml`.

A project may be installed with:

```bash
python3 -m pip install .
```

Editable mode:

```bash
python3 -m pip install -e .
```

## 32. Reading files

Simple:

```python
from pathlib import Path

text = Path("file.txt").read_text(encoding="utf-8")
```

Classic form:

```python
with open("file.txt", "r", encoding="utf-8") as f:
    text = f.read()
```

Using `with` ensures cleanup.

## 33. Writing files

```python
from pathlib import Path

Path("output.txt").write_text("Hello", encoding="utf-8")
```

## 34. JSON

```python
import json

data = json.loads('{"name":"Alice"}')
text = json.dumps(data)
```

Files:

```python
with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)
```

## 35. Exceptions

```python
try:
    value = int(text)
except ValueError:
    print("Invalid number")
else:
    print(value)
finally:
    print("done")
```

Raise:

```python
raise ValueError("invalid value")
```

## 36. Classes

```python
class User:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hello {self.name}"
```

`self` refers to the current instance.

Inheritance:

```python
class Admin(User):
    pass
```

## 37. dataclass

```python
from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int
```

Useful for data-oriented classes.

## 38. Lambda

```python
double = lambda x: x * 2
```

Use sparingly; normal functions are often clearer.

## 39. pathlib

```python
from pathlib import Path

root = Path("/srv/app")
for file in root.glob("*.json"):
    print(file)
```

Prefer `pathlib` for portable path handling.

## 40. sys

```python
import sys

print(sys.argv)
print(sys.version)
```

## 41. argparse

```python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--port", type=int, default=8080)
args = parser.parse_args()
```

## 42. subprocess

```python
import subprocess

result = subprocess.run(
    ["git", "status"],
    capture_output=True,
    text=True,
    check=True,
)
```

Avoid shell=True with untrusted input.

## 43. HTTP requests

Third-party `requests`:

```python
import requests

response = requests.get("https://example.com", timeout=10)
response.raise_for_status()
print(response.text)
```

## 44. Web backends

Flask is small and flexible.

FastAPI is modern and API-oriented.

Django is a larger full-stack framework.

Choose based on project needs, not fashion.

## 45. SQLite

```python
import sqlite3

conn = sqlite3.connect("app.db")
cursor = conn.execute("select sqlite_version()")
print(cursor.fetchone())
conn.close()
```

## 46. Logging

```python
import logging

logging.basicConfig(level=logging.INFO)
logging.info("Application started")
```

## 47. Tests

Standard library:

```bash
python3 -m unittest
```

Common third-party choice:

```bash
pytest
```

## 48. Debugging

Print debugging:

```python
print(value)
```

Built-in debugger:

```python
breakpoint()
```

Then run the program normally.

## 49. Tracebacks

Read from the bottom upward to find the final exception, then inspect the call stack above it.

## 50. Formatting and linting

Popular tools:

- Black,
- Ruff,
- mypy.

Ruff can handle linting and, in modern setups, formatting.

## 51. Typical project structure

```text
project/
├── pyproject.toml
├── README.md
├── src/
│   └── app/
│       ├── __init__.py
│       └── main.py
└── tests/
```

## 52. Running an unfamiliar project

1. read README,
2. check `pyproject.toml` / `requirements.txt`,
3. create `.venv`,
4. install dependencies,
5. identify entry point,
6. check environment variables,
7. run tests,
8. run the app.

## 53. Using `-m`

```bash
python3 -m package.module
python3 -m pip
python3 -m unittest
```

This runs a module using the selected interpreter.

## 54. Interpreter path

```bash
which python3
python3 -c 'import sys; print(sys.executable)'
```

## 55. Python versions

Use project metadata or documentation to determine required versions.

Tools such as pyenv can manage multiple installed versions.

## 56. `__pycache__`

Python stores compiled bytecode there. It should usually not be committed.

## 57. Environment variables

```python
import os

token = os.getenv("API_TOKEN")
```

## 58. .env

Many projects load development variables from a `.env` file using tools such as python-dotenv.

Do not commit real secrets.

## 59. Decorators

```python
@decorator
def function():
    ...
```

A decorator wraps or modifies a function/class.

## 60. Generators and yield

```python
def numbers():
    yield 1
    yield 2
```

Generators produce values lazily.

## 61. Iterators

Objects used in `for` loops follow the iterator protocol.

Usually you consume them rather than implementing them manually.

## 62. async / await

```python
import asyncio

async def main():
    await asyncio.sleep(1)

asyncio.run(main())
```

Use async primarily for concurrent I/O, not automatically for every program.

## 63. Threads and processes

`threading` is useful for some I/O workloads.

`multiprocessing` uses separate processes and is suitable for CPU-bound parallel work.

## 64. Popular libraries

HTTP:
- requests,
- httpx.

Backend:
- Flask,
- FastAPI,
- Django.

Data:
- pandas,
- NumPy.

Charts:
- matplotlib.

AI/ML:
- scikit-learn,
- PyTorch,
- TensorFlow.

CLI:
- Typer,
- Click.

Testing:
- pytest.

Browser automation:
- Playwright,
- Selenium.

## 65. Where Python is weaker

Python may be a weaker choice for:

- tiny standalone binaries,
- low-latency systems code,
- mobile-native apps,
- browser frontend code,
- CPU-heavy workloads without native extensions.

## 66. Python vs JavaScript

Python is strong for automation, backend and data.

JavaScript is native to the browser and central to frontend development.

## 67. Python vs Go

Python optimizes developer speed and ecosystem breadth.

Go emphasizes static binaries, concurrency, simple deployment and predictable performance.

## 68. Common beginner errors

IndentationError — wrong indentation.

NameError — unknown variable.

TypeError — operation on incompatible type.

ValueError — invalid value.

KeyError — missing dictionary key.

IndexError — list index out of range.

FileNotFoundError — missing file.

ModuleNotFoundError — dependency or import-path problem.

## 69. Discovering modules

```python
import module

print(module.__file__)
print(dir(module))
help(module)
```

## 70. pipx

Use pipx for installing Python CLI tools globally in isolated environments.

## 71. Poetry, uv and similar tools

Modern Python has several project/dependency managers.

`uv` is a fast modern tool that can manage environments, Python versions and dependencies.

Do not introduce a tool just because it is popular; follow the project you are working on.

## 72. Docker and Python

Typical Dockerfile:

```dockerfile
FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "app.py"]
```

For production, pin dependencies and run as a non-root user where practical.

## 73. Example .gitignore

```gitignore
__pycache__/
*.py[cod]
.venv/
.env
.pytest_cache/
.mypy_cache/
.ruff_cache/
.vscode/
.idea/
```

## 74. Minimal CLI

```python
#!/usr/bin/env python3
import argparse

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("name")
    args = parser.parse_args()
    print(f"Hello {args.name}")

if __name__ == "__main__":
    main()
```

## 75. Simple file-processing script

```python
from pathlib import Path

for path in Path(".").glob("*.txt"):
    text = path.read_text(encoding="utf-8")
    print(path.name, len(text))
```

## 76. Reading Python code — order

1. find entry point,
2. read imports,
3. identify configuration,
4. identify main data structures/classes,
5. trace function calls,
6. locate I/O and external services,
7. inspect tests.

## 77. Recognising the entry point

Look for:

```python
if __name__ == "__main__":
```

or framework-specific startup configuration.

## 78. Understanding imports

Standard library:

```python
import os
import json
```

Third party:

```python
import requests
```

Project code:

```python
from app.service import UserService
```

## 79. Useful commands

```bash
python3 --version
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 -m pip list
python3 -m pytest
python3 -m unittest
python3 -m package.module
```

## 80. Syntax cheat sheet

Variable:

```python
x = 1
```

List:

```python
items = [1, 2, 3]
```

Dictionary:

```python
user = {"name": "Alice"}
```

Function:

```python
def add(a, b):
    return a + b
```

Class:

```python
class User:
    pass
```

Exception:

```python
try:
    ...
except Exception as exc:
    ...
```

## 81. Minimal new-project workflow

```bash
mkdir project
cd project
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -U pip
```

Then add project metadata and source files.

## 82. Minimal cloned-project workflow

```bash
git clone REPOSITORY
cd REPOSITORY
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
```

Or follow `pyproject.toml` instructions.

## 83. What to remember

Understand:

- indentation,
- basic data types,
- lists/dicts,
- conditions and loops,
- functions,
- imports,
- exceptions,
- classes,
- virtual environments,
- pip,
- project metadata,
- files and JSON,
- debugging tracebacks.

## 84. Commands worth memorising

```bash
python3
python3 script.py
python3 -m module
python3 -m venv .venv
python3 -m pip install PACKAGE
python3 -m pip install -r requirements.txt
python3 -m pip list
python3 -m pytest
```
