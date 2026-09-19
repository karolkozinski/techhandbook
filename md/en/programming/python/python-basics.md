# Python — Practical Fundamentals Handbook

## 1. What Python is

Python is an interpreted, high-level programming language widely used for:

- automation,
- scripts,
- data processing,
- web backends,
- AI/ML,
- testing,
- administration,
- small utilities.

Its syntax is designed to be readable.

## 2. Check the version

```bash
python3 --version
```

On modern Debian/FreeBSD, use `python3` unless the system deliberately provides another command.

## 3. First program

```python
print("Hello")
```

Run:

```bash
python3 hello.py
```

## 4. Interactive interpreter

```bash
python3
```

Then:

```python
2 + 2
print("hello")
```

Exit:

```python
exit()
```

or Ctrl+D on Unix.

## 5. Indentation matters

Python uses indentation as syntax.

Correct:

```python
if active:
    print("yes")
```

Incorrect indentation changes the program or causes an error.

Use a consistent style, normally four spaces.

## 6. Variables

```python
name = "Karol"
count = 10
active = True
```

Python variables do not require explicit type declarations.

## 7. Basic types

Common:

```text
str
int
float
bool
None
list
tuple
dict
set
bytes
```

Check:

```python
type(value)
```

## 8. Strings

```python
name = "Karol"
message = 'hello'
```

f-string:

```python
print(f"Hello {name}")
```

Multi-line:

```python
text = """Line one
Line two"""
```

## 9. Numbers

```python
count = 10
price = 19.99
```

Arithmetic:

```python
+ - * / // % **
```

`/` returns floating-point division.

`//` performs floor division.

## 10. Booleans

```python
enabled = True
disabled = False
```

Logical operators:

```text
and
or
not
```

## 11. None

```python
value = None
```

Compare with:

```python
if value is None:
    ...
```

rather than:

```python
value == None
```

## 12. Lists

```python
items = ["a", "b", "c"]
```

Access:

```python
items[0]
items[-1]
```

Add:

```python
items.append("d")
```

Slice:

```python
items[1:3]
```

## 13. Tuples

```python
point = (10, 20)
```

Tuples are immutable sequences.

They are often used for fixed collections of values.

## 14. Dictionaries

```python
user = {
    "id": 1,
    "name": "Karol",
}
```

Read:

```python
user["name"]
```

Safer optional access:

```python
user.get("email")
```

## 15. Sets

```python
tags = {"go", "python", "linux"}
```

Sets contain unique values and support fast membership testing.

```python
if "python" in tags:
    ...
```

## 16. if / elif / else

```python
if score > 90:
    print("great")
elif score > 50:
    print("ok")
else:
    print("low")
```

No parentheses are required around the condition.

## 17. for

```python
for item in items:
    print(item)
```

With index:

```python
for index, item in enumerate(items):
    print(index, item)
```

## 18. range

```python
for i in range(10):
    print(i)
```

Produces numbers 0 through 9.

## 19. while

```python
count = 0

while count < 5:
    print(count)
    count += 1
```

## 20. break and continue

`break` exits a loop.

`continue` skips to the next iteration.

## 21. Functions

```python
def add(a, b):
    return a + b
```

Call:

```python
result = add(2, 3)
```

## 22. Default arguments

```python
def greet(name="friend"):
    print(f"Hello {name}")
```

Be careful with mutable default arguments such as `[]` or `{}`.

Prefer:

```python
def f(items=None):
    if items is None:
        items = []
```

## 23. Keyword arguments

```python
connect(host="localhost", port=5432)
```

This can make calls more readable.

## 24. *args and **kwargs

```python
def f(*args, **kwargs):
    print(args)
    print(kwargs)
```

- `args` is a tuple of extra positional arguments.
- `kwargs` is a dict of extra keyword arguments.

## 25. Scope

Variables inside a function are normally local.

Python uses lexical scope.

Avoid unnecessary global mutable state.

## 26. Modules

File:

```text
math_utils.py
```

Import:

```python
import math_utils
```

or:

```python
from math_utils import add
```

## 27. Packages

A package is a collection of modules.

Traditional packages contain:

```text
__init__.py
```

Modern namespace-package behavior can differ, but `__init__.py` remains common.

## 28. __name__

Common script pattern:

```python
def main():
    print("run")

if __name__ == "__main__":
    main()
```

When imported, `main()` does not run automatically.

## 29. Exceptions

```python
try:
    value = int(text)
except ValueError:
    print("Not a number")
```

Add cleanup:

```python
try:
    ...
finally:
    ...
```

Do not use a bare:

```python
except:
```

unless you have a very specific reason.

## 30. Raising exceptions

```python
raise ValueError("invalid port")
```

Exceptions are normal Python error propagation.

## 31. with

Resource-management context:

```python
with open("file.txt", "r", encoding="utf-8") as f:
    text = f.read()
```

The file is closed automatically.

## 32. Reading files

```python
from pathlib import Path

text = Path("file.txt").read_text(encoding="utf-8")
```

Write:

```python
Path("out.txt").write_text("hello\n", encoding="utf-8")
```

`pathlib` is often cleaner than manual path strings.

## 33. JSON

```python
import json

data = json.loads(text)
text = json.dumps(data, indent=2)
```

File:

```python
with open("data.json", encoding="utf-8") as f:
    data = json.load(f)
```

## 34. CSV

Standard library:

```python
import csv
```

Use the CSV module rather than manually splitting lines on commas.

CSV has quoting and escaping rules.

## 35. Dataclasses

```python
from dataclasses import dataclass

@dataclass
class User:
    id: int
    name: str
```

Useful for structured data.

Type annotations do not enforce types at runtime by themselves.

## 36. Type hints

```python
def add(a: int, b: int) -> int:
    return a + b
```

Static type checkers such as mypy or pyright can analyze them.

Python remains dynamically typed at runtime.

## 37. Classes

```python
class User:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hello {self.name}"
```

Use:

```python
user = User("Karol")
print(user.greet())
```

## 38. Inheritance

```python
class Admin(User):
    def can_delete(self):
        return True
```

Python supports inheritance, but composition is often simpler.

## 39. Comprehensions

List:

```python
squares = [x * x for x in range(10)]
```

Filtered:

```python
active = [u for u in users if u.active]
```

Dict:

```python
mapping = {u.id: u for u in users}
```

Use comprehensions when they remain readable.

## 40. Iterators and generators

Generator:

```python
def numbers():
    yield 1
    yield 2
    yield 3
```

It produces values lazily.

Useful for large sequences and pipelines.

## 41. Standard library highlights

Useful modules:

```text
pathlib
json
csv
datetime
subprocess
argparse
logging
sqlite3
http
urllib
re
os
sys
shutil
tempfile
collections
itertools
concurrent.futures
asyncio
```

Python's standard library is extensive.

## 42. argparse

Simple CLI:

```python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("file")
parser.add_argument("--verbose", action="store_true")
args = parser.parse_args()
```

This automatically provides help and argument validation.

## 43. subprocess

Run an external command:

```python
import subprocess

result = subprocess.run(
    ["git", "status"],
    check=True,
    text=True,
    capture_output=True,
)
```

Prefer argument lists over `shell=True` with untrusted data.

## 44. Environment variables

```python
import os

port = os.environ.get("PORT", "8080")
```

Require:

```python
api_key = os.environ["API_KEY"]
```

which raises `KeyError` if missing.

## 45. Logging

```python
import logging

logging.basicConfig(level=logging.INFO)
logging.info("started")
```

For services, use structured/contextual logging conventions appropriate to the project.

## 46. pip

Install a package into the active Python environment:

```bash
python3 -m pip install PACKAGE
```

Prefer:

```bash
python3 -m pip
```

over guessing which interpreter a bare `pip` command belongs to.

## 47. Virtual environments

Create:

```bash
python3 -m venv .venv
```

Activate on Unix shells:

```bash
. .venv/bin/activate
```

Then:

```bash
python --version
python -m pip install ...
```

Deactivate:

```bash
deactivate
```

## 48. Why venv matters

Without a virtual environment, project dependencies may conflict with:

- system Python,
- other projects,
- operating-system packages.

Keep project packages isolated.

## 49. Debian and system Python

Modern Debian protects the system Python environment from arbitrary global pip installs.

Use:

- apt for system packages,
- venv for projects,
- pipx for standalone Python applications.

Do not bypass packaging safeguards casually.

## 50. pipx

Install a Python CLI application in its own environment:

```bash
pipx install TOOL
```

Useful for tools you want globally available without polluting system Python.

## 51. requirements.txt

A traditional dependency file:

```text
requests==2.32.0
flask==3.1.0
```

Install:

```bash
python -m pip install -r requirements.txt
```

Exact versions here are only examples; use the project's actual requirements.

## 52. pyproject.toml

Modern Python projects commonly use:

```text
pyproject.toml
```

It can define:

- build system,
- project metadata,
- dependencies,
- tool configuration.

Tools such as Poetry, Hatch, PDM, uv, setuptools, Ruff, and others can use it.

## 53. uv

`uv` is a modern fast Python package/project tool you may encounter.

Depending on project conventions, it can manage:

- virtual environments,
- dependencies,
- lock files,
- Python versions,
- commands.

Follow the project's README rather than mixing tools.

## 54. Project structure

Simple:

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

Some projects place the package directly at repository root.

## 55. Running modules

```bash
python -m package.module
```

This often handles imports more correctly than running an internal file directly.

## 56. pytest

Very popular testing framework.

Install in the project environment.

Run:

```bash
pytest
```

Example:

```python
def test_add():
    assert add(2, 3) == 5
```

## 57. unittest

Python also includes the standard `unittest` framework.

Many modern projects prefer pytest for ergonomics.

## 58. Ruff

Ruff is a fast linter/formatter tool commonly used in modern Python projects.

Typical commands depend on project config, for example:

```bash
ruff check .
ruff format .
```

Use the project's documented tool versions/configuration.

## 59. Black

Black is a widely used formatter.

You may still encounter it in many projects.

Do not run a different formatter across a whole repository without agreement.

## 60. mypy / pyright

Static type checkers can validate type hints.

Examples:

```bash
mypy src
pyright
```

Run whichever the project uses.

## 61. Web frameworks

Popular:

- Django,
- Flask,
- FastAPI.

### Flask

Small/simple web framework.

### Django

Full framework with:

- ORM,
- admin,
- templates,
- authentication,
- migrations.

### FastAPI

API-oriented framework with type hints and automatic OpenAPI documentation.

Choose based on project requirements.

## 62. Minimal Flask concept

```python
from flask import Flask

app = Flask(__name__)

@app.get("/")
def index():
    return "hello"
```

## 63. Minimal FastAPI concept

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def index():
    return {"message": "hello"}
```

Production serving requires an ASGI server/setup.

## 64. Django concept

A Django project typically contains:

- settings,
- URLs,
- apps,
- models,
- migrations,
- templates.

Do not approach it like a single-file script.

## 65. Database

Python supports SQLite in the standard library.

For PostgreSQL, common libraries include:

- psycopg,
- asyncpg,
- SQLAlchemy,
- framework ORMs.

Use parameterized queries.

## 66. SQLAlchemy

SQLAlchemy can be used as:

- SQL toolkit,
- ORM.

Modern versions support both synchronous and asynchronous patterns.

It is powerful but adds a substantial abstraction layer.

## 67. asyncio

Python supports asynchronous programming:

```python
import asyncio

async def main():
    await something()

asyncio.run(main())
```

Use async primarily for concurrent I/O, not because it is fashionable.

## 68. await

Inside `async def`:

```python
result = await fetch_data()
```

The called operation must be awaitable.

Mixing sync and async code incorrectly is a common source of confusion.

## 69. Threads and processes

Python provides:

- `threading`,
- `concurrent.futures.ThreadPoolExecutor`,
- `multiprocessing`,
- `ProcessPoolExecutor`.

Threads are useful for many I/O tasks.

Processes are often more appropriate for CPU-bound Python work because of interpreter/runtime constraints.

## 70. GIL

In the standard CPython implementation, the Global Interpreter Lock affects parallel execution of Python bytecode.

The ecosystem is evolving, so always check the current Python version/runtime if advanced parallelism matters.

For ordinary scripts, you do not need to obsess over the GIL.

## 71. Requests

A popular third-party HTTP client:

```python
import requests

response = requests.get(
    "https://example.com/api",
    timeout=10,
)
response.raise_for_status()
data = response.json()
```

Always use timeouts.

## 72. httpx

Modern HTTP client supporting sync and async APIs.

Common in FastAPI/async projects.

## 73. Regular expressions

Standard library:

```python
import re

match = re.search(r"\d+", text)
```

Use raw strings for regex patterns:

```python
r"\d+"
```

## 74. datetime

```python
from datetime import datetime, timezone

now = datetime.now(timezone.utc)
```

Prefer timezone-aware values for real systems.

## 75. pathlib

```python
from pathlib import Path

root = Path("/srv/app")
config = root / "config.json"
```

This is usually cleaner than manual string concatenation.

## 76. Databases and context managers

Many resources support:

```python
with connection:
    ...
```

or async:

```python
async with ...
```

Read library documentation for transaction behavior.

## 77. Decorators

Syntax:

```python
@decorator
def function():
    ...
```

A decorator wraps/modifies a function or class.

Frameworks use decorators heavily for:

- routes,
- validation,
- registration.

## 78. Lambda

Small anonymous function:

```python
key = lambda item: item["name"]
```

Use normal `def` when logic becomes non-trivial.

## 79. * unpacking

List/tuple:

```python
values = [1, 2]
print(*values)
```

Dict:

```python
config = {**base, **override}
```

These patterns are common in modern Python.

## 80. Context managers

Implement the protocol through `__enter__`/`__exit__` or use `contextlib`.

They make cleanup predictable.

## 81. Dunder methods

Names like:

```text
__init__
__str__
__repr__
__len__
__iter__
```

are special protocol methods.

They let custom objects integrate with Python syntax/functions.

## 82. Reading an unfamiliar project

Start:

```text
README.md
pyproject.toml / requirements.txt
src/
tests/
Dockerfile
compose.yaml
.env.example
```

Then identify:

- entry point,
- framework,
- dependency tool,
- test command,
- build/deploy method.

## 83. Install unfamiliar project safely

Typical:

```bash
git clone ...
cd project
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements.txt
```

or follow the project's `pyproject.toml` tool.

Read install scripts before running them.

## 84. Debugging with pdb

Built-in debugger:

```bash
python -m pdb script.py
```

Common commands:

```text
l list
n next
s step
c continue
p expression
q quit
```

Editors can provide graphical debugging around the same concepts.

## 85. Tracebacks

Read from the bottom for the exception message, then trace upward through application frames.

Example:

```text
ValueError: invalid port
```

Find the first relevant line in your own code.

## 86. Syntax errors

Python points to a line, but the real mistake can be just before it:

- missing parenthesis,
- missing colon,
- bad indentation,
- unclosed string.

## 87. Import errors

Typical causes:

- wrong virtual environment,
- dependency not installed,
- incorrect package layout,
- running a file from the wrong working directory,
- name shadowing.

Check:

```bash
which python
python -c 'import sys; print(sys.executable)'
python -m pip list
```

## 88. Name shadowing

Do not create files named like standard modules:

```text
json.py
email.py
random.py
```

unless intentional.

They may shadow the real module and create confusing import errors.

## 89. Encoding

Use UTF-8 explicitly for text files where appropriate:

```python
Path("file.txt").read_text(encoding="utf-8")
```

## 90. Security

Avoid:

- `eval` on untrusted input,
- unsafe YAML loaders,
- shell commands built from user strings,
- hardcoded secrets,
- deserializing untrusted pickle data.

`pickle` is not a safe format for untrusted data.

## 91. subprocess security

Prefer:

```python
subprocess.run(["git", "status"], check=True)
```

over:

```python
subprocess.run(f"command {user_input}", shell=True)
```

when input can be influenced by users.

## 92. Deployment

A web application often runs behind:

```text
nginx/load balancer
  ↓
Gunicorn/Uvicorn/application server
  ↓
Python app
```

or inside Docker.

Do not use a framework's development server as production infrastructure unless its docs explicitly support the scenario.

## 93. systemd

A Python service can be managed by systemd.

Important:

- dedicated user,
- virtual-environment interpreter or installed package,
- working directory,
- environment/secrets,
- restart policy,
- logs.

## 94. Docker

Typical image concept:

```dockerfile
FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "-m", "app"]
```

Use current supported versions and project-specific tooling.

## 95. Python on FreeBSD

Install:

```sh
pkg search python
pkg install python3
```

Exact package names depend on the current FreeBSD release/ports tree.

Use virtual environments just as on Linux.

## 96. Python on Debian

Prefer distribution packages for system tooling and virtual environments for project dependencies.

Do not modify Python packages used by the operating system without understanding the consequences.

## 97. Useful commands

```bash
python3 --version
python3 -m venv .venv
. .venv/bin/activate
python -m pip install PACKAGE
python -m pip list
python -m pip freeze
python -m pytest
python -m pdb script.py
```

## 98. What to recognize in code

- indentation blocks,
- `def`,
- `class`,
- imports,
- list/dict/set literals,
- comprehensions,
- exceptions,
- context managers,
- decorators,
- async/await,
- type hints.

## 99. Mental model

When reading Python code, ask:

```text
What is the entry point?
Which virtual environment?
Where are dependencies declared?
Which framework?
Where is configuration loaded?
What exceptions can escape?
Is code synchronous or async?
How are tests run?
How is production started?
```

## 100. Summary

The fastest path to useful Python knowledge is:

```text
syntax
containers
functions
modules
exceptions
files/JSON
venv
pip/pyproject
tests
debugger
one web/automation use case
```

You do not need to memorize the entire ecosystem. Learn to identify the project's tools and follow its documented workflow.
