---
id: "doc-023"
title: "Python — Practical Handbook"
slug: "python-practical-handbook"
description: "Python is a high-level interpreted language focused on readability and a large ecosystem."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "python"
---

# Python — Practical Handbook

Python is a strong fit for automation, CLI tools, backends, testing and data work. In practice, virtual environments, explicit dependencies and project documentation matter more than memorizing a particular interpreter version.

Related topics: [APIs and System Integrations](techhandbook:doc-008), [JSON, YAML, TOML and XML](techhandbook:doc-009), [SQL and PostgreSQL for Developers](techhandbook:doc-010), [Software Testing](techhandbook:doc-049) and [Shell Scripting](techhandbook:doc-031).

## 1. What Python is
Python is a high-level interpreted language focused on readability and a large ecosystem.
# 2. How Python works
Source is compiled to bytecode and executed by an interpreter such as CPython.
# 3. Python 2 vs Python 3
Use Python 3. Python 2 is obsolete.
# 4. Installation
## Debian / Ubuntu
```bash
sudo apt install python3 python3-venv python3-pip
```
## FreeBSD
```sh
pkg install python
```
## Windows
Install Python 3 from python.org or approved package manager; enable launcher/PATH as needed.
# 5. Interactive interpreter
```bash
python3
```
# 6. Running a file
```bash
python3 script.py
```
# 7. Python as executable script
```python
#!/usr/bin/env python3
print('hello')
```
# 8. Indentation is syntax
Blocks are defined by indentation. Use consistent spaces.
# 9. Comments
```python
# comment
```
Comments should explain intent, not restate obvious code.
# 10. Variables
```python
name = 'Ada'
count = 3
```
# 11. Variable names
Use snake_case for variables/functions and clear descriptive names.
# 12. Basic data types
## int
```python
value = 42
```
## float
```python
value = 3.14
```
## str
```python
value = 'hello'
```
## bool
```python
value = True
```
## None
```python
value = None
```
# 13. Checking type
```python
type(value)
isinstance(value, str)
```
# 14. Type conversions
```python
int('42')
str(42)
float('3.14')
bool(value)
```
# 15. Arithmetic operators
```python
a + b
a - b
a * b
a / b
a // b
a % b
a ** b
```
# 16. Comparisons
```python
a == b
a != b
a < b
a >= b
```
# 17. Logical operators
```python
a and b
a or b
not a
```
# 18. Strings
```python
text = 'hello'
text.upper()
text.strip()
```
# 19. f-string
```python
name = 'Ada'
print(f'Hello {name}')
```
# 20. Accessing characters
```python
text[0]
text[-1]
text[1:4]
```
# 21. Lists
```python
items = [1, 2, 3]
items.append(4)
```
# 22. Tuple
```python
point = (10, 20)
```
# 23. Dictionary — dict
```python
user = {'name': 'Ada', 'age': 30}
user['name']
```
# 24. Set
```python
tags = {'go', 'python'}
tags.add('js')
```
# 25. if / elif / else
```python
if x > 0:
    print('positive')
elif x == 0:
    print('zero')
else:
    print('negative')
```
# 26. Values treated as False
Examples: False, None, 0, 0.0, empty string/list/dict/set.
# 27. for loop
```python
for item in items:
    print(item)
```
# 28. enumerate
```python
for i, item in enumerate(items):
    print(i, item)
```
# 29. zip
```python
for name, age in zip(names, ages):
    print(name, age)
```
# 30. while loop
```python
while count > 0:
    count -= 1
```
# 31. break and continue
break exits a loop; continue skips to the next iteration.
# 32. Functions
```python
def add(a, b):
    return a + b
```
# 33. return
Returns a value and exits the function.
# 34. Default argument
```python
def greet(name='world'):
    print(name)
```
# 35. Named arguments
```python
greet(name='Ada')
```
# 36. *args
```python
def f(*args):
    print(args)
```
# 37. **kwargs
```python
def f(**kwargs):
    print(kwargs)
```
# 38. Optional typing — type hints
```python
def add(a: int, b: int) -> int:
    return a + b
```
# 39. List comprehension
```python
squares = [x*x for x in range(10)]
```
# 40. Modules
```python
import json
from pathlib import Path
```
# 41. Standard library
Python ships with batteries included: pathlib, json, argparse, logging, sqlite3, subprocess, asyncio and more.
# 42. `__name__` and main
```python
def main():
    ...

if __name__ == '__main__':
    main()
```
# 43. Packages
A package groups modules, typically in directories and optionally with `__init__.py`.
# 44. pip
```bash
python3 -m pip install requests
```
# 45. Why not install everything globally
Global installs create dependency conflicts and make projects harder to reproduce.
# 46. venv — virtual environment
```bash
python3 -m venv .venv
source .venv/bin/activate
```
# 47. `.venv` in Git
Do not commit the virtual environment. Add `.venv/` to `.gitignore`.
# 48. requirements.txt
```bash
python3 -m pip freeze > requirements.txt
python3 -m pip install -r requirements.txt
```
# 49. pyproject.toml
Modern standard place for project metadata/build-system/tool configuration.
# 50. Installing a project
```bash
python3 -m pip install .
python3 -m pip install -e .
```
# 51. Reading files
```python
text = Path('file.txt').read_text()
```
# 52. Classic `open()`
```python
f = open('file.txt', 'r', encoding='utf-8')
```
# 53. `with`
```python
with open('file.txt', encoding='utf-8') as f:
    text = f.read()
```
# 54. JSON
```python
import json
data = json.loads(text)
text = json.dumps(data)
```
# 55. Exceptions
Exceptions represent error conditions that can propagate until handled.
# 56. try / except / else / finally
```python
try:
    value = int(text)
except ValueError:
    ...
else:
    ...
finally:
    ...
```
# 57. raise
```python
raise ValueError('bad value')
```
# 58. Classes
```python
class User:
    def __init__(self, name):
        self.name = name
```
# 59. self
Reference to the current instance in instance methods.
# 60. Inheritance
```python
class Admin(User):
    pass
```
# 61. dataclass
```python
from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int
```
# 62. Lambda
```python
key = lambda x: x['name']
```
# 63. import os
```python
import os
os.getenv('HOME')
```
# 64. pathlib
```python
from pathlib import Path
Path('data').mkdir(exist_ok=True)
```
# 65. sys
```python
import sys
print(sys.version)
print(sys.argv)
```
# 66. argparse
Standard library CLI argument parser.
# 67. subprocess
```python
import subprocess
subprocess.run(['git', 'status'], check=True)
```
# 68. requests
```python
import requests
r = requests.get('https://example.com', timeout=10)
```
# 69. Web backend
## Flask
Minimal traditional web framework.
## FastAPI
Modern API framework with typing and OpenAPI integration.
## Django
Full-stack framework with ORM, admin, auth and strong conventions.
# 70. SQLite
```python
import sqlite3
con = sqlite3.connect('app.db')
```
# 71. Logging
```python
import logging
logging.basicConfig(level=logging.INFO)
logging.info('started')
```
# 72. Tests
```bash
python3 -m unittest
pytest
```
# 73. Debugging
Use prints/logging, debugger, IDE integration and focused tests.
# 74. Traceback
Read from the bottom for the final exception, then trace upward through the call stack.
# 75. Code formatting
Use Black or Ruff formatter, or project-standard tooling.
# 76. Ruff
```bash
ruff check .
ruff format .
```
# 77. mypy
```bash
mypy .
```
# 78. Typical simple project structure
```text
project/
├── pyproject.toml
├── src/app/
├── tests/
└── README.md
```
# 79. How to run someone else's project
Read README, identify pyproject/requirements, create venv, install dependencies, run tests, then run app.
# 80. Typical workflow with requirements.txt
```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
```
# 81. Typical workflow with pyproject.toml
```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -e .
```
# 82. Running a module with `-m`
```bash
python3 -m package.module
```
# 83. `python -m pip`
Ensures pip belongs to the interpreter you are invoking.
# 84. Checking interpreter
```bash
which python3
python3 -c 'import sys; print(sys.executable)'
```
# 85. Python versions
```bash
python3 --version
```
# 86. `__pycache__`
Contains cached bytecode. Do not commit it.
# 87. Environment variables
```python
import os
token = os.getenv('API_TOKEN')
```
# 88. `.env`
Convenient local config format, usually loaded by a library. Never commit real secrets.
# 89. Decorators
Functions/classes that wrap or modify other callables/classes using `@decorator` syntax.
# 90. Generator and yield
```python
def numbers():
    yield 1
    yield 2
```
# 91. Iterator
Object implementing iteration protocol; `iter()` returns an iterator and `next()` advances it.
# 92. async / await
Syntax for cooperative asynchronous I/O.
# 93. await
Suspends the current coroutine until an awaitable completes.
# 94. threading
Useful mainly for I/O-bound concurrency in CPython because of the GIL.
# 95. multiprocessing
Runs multiple processes and can use multiple CPU cores for CPU-bound work.
# 96. Popular libraries
## HTTP
requests, httpx.
## Backend
Flask, FastAPI, Django.
## Data
pandas, polars, numpy.
## Charts
matplotlib, plotly.
## AI / ML
PyTorch, transformers, scikit-learn.
## CLI
Typer, Click.
## Tests
pytest.
## Browser automation
Playwright, Selenium.
# 97. Where Python is a weaker choice
Very low-latency systems, tiny static binaries, hard real-time, some memory-constrained environments.
# 98. Python vs JavaScript
Python dominates scripting/data/backend; JavaScript is native to browsers and strong across web stacks.
# 99. Python vs Go
Python is faster to write dynamically; Go gives simpler deployment, stronger static typing and predictable concurrency.
# 100. Common beginner errors
## Bad indentation
IndentationError.
## Typo in name
NameError.
## Wrong type
TypeError.
## Invalid value
ValueError.
## Missing key
KeyError.
## Missing list element
IndexError.
## Missing file
FileNotFoundError.
## Missing module
ModuleNotFoundError.
# 101. Check where a module is loaded from
```python
import requests
print(requests.__file__)
```
# 102. help()
```python
help(str.split)
```
# 103. dir()
```python
dir(object)
```
# 104. Function documentation
Use docstrings and `help()`.
# 105. dir + type + help
A useful REPL trio for exploring unfamiliar objects.
# 106. Installing CLI tools — pipx
```bash
pipx install TOOL
```
# 107. Poetry, uv and other tools
Higher-level dependency/project tools manage environments, lockfiles and packaging.
# 108. uv
Fast modern Python project/package manager that can replace several pip/venv workflows.
# 109. Docker and Python
Use slim base images, virtualenv/build isolation as appropriate, pinned dependencies and non-root runtime users.
# 110. Example `.gitignore`
# Python
```gitignore
__pycache__/
*.pyc
```
# virtualenv
```gitignore
.venv/
```
# secrets
```gitignore
.env
```
# tests / tools
```gitignore
.pytest_cache/
.mypy_cache/
.ruff_cache/
```
# IDE
```gitignore
.idea/
```
# 111. Minimal CLI program
```python
import argparse

p = argparse.ArgumentParser()
p.add_argument('name')
args = p.parse_args()
print(args.name)
```
# 112. Simple file-processing script
```python
from pathlib import Path
text = Path('input.txt').read_text()
Path('output.txt').write_text(text.upper())
```
# 113. Simple API request
```python
import requests
r = requests.get('https://api.example.com/items', timeout=10)
data = r.json()
```
# 114. `response.raise_for_status()`
```python
r.raise_for_status()
```
# 115. Reading Python code — order
Start with pyproject/requirements, entry point, package structure, key classes/functions and tests.
# 116. How to recognize the entry point
Look for `if __name__ == '__main__'`, console scripts in pyproject, framework commands or executable modules.
# 117. How to find dependencies
Check pyproject.toml, requirements files and lockfiles.
# 118. How to inspect imports
### standard library
Modules shipped with Python.
### external libraries
Installed third-party packages.
### project code
Imports from your own package/module tree.
# 119. How to read a traceback
Identify final exception and line, then inspect preceding stack frames to find the call path.
# 120. Useful commands
```bash
python3 --version
python3 -m venv .venv
python3 -m pip install -r requirements.txt
python3 -m pytest
ruff check .
```
# 121. Syntax cheat sheet
## variable
```python
x = 1
```
## text
```python
s = 'hello'
```
## list
```python
xs = [1,2]
```
## dict
```python
d = {'a': 1}
```
## if
```python
if x: ...
```
## for
```python
for x in xs: ...
```
## while
```python
while x: ...
```
## function
```python
def f(x): return x
```
## class
```python
class C: ...
```
## exception
```python
try: ... except Exception: ...
```
## import
```python
import json
```
## file
```python
Path('x').read_text()
```
# 122. Minimal workflow for a new project
```bash
mkdir app && cd app
python3 -m venv .venv
source .venv/bin/activate
```
# 123. Minimal workflow for a downloaded project
```bash
git clone REPO
cd PROJECT
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
```
# 124. Most important things to remember
Indentation matters, use venv, prefer `python -m pip`, read tracebacks, keep dependencies explicit, use type hints/tests where useful.
# 125. Commands worth memorizing
```bash
python3 script.py
python3 -m venv .venv
python3 -m pip install ...
python3 -m pytest
python3 -m module
```

## Official references

- Python documentation: https://docs.python.org/3/
- Python downloads and supported releases: https://www.python.org/downloads/
- venv: https://docs.python.org/3/library/venv.html
- Packaging guide: https://packaging.python.org/
