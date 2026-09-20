---
id: "doc-022"
title: "Node.js"
slug: "node-js"
description: "Cel tego dokumentu: nie nauczyć Cię programować w Node.js od zera, tylko sprawić, żebyś potrafił:"
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "node"
  - "nodejs"
  - "javascript"
---

# Node.js

> Cel tego dokumentu: **nie nauczyć Cię programować w Node.js od zera**, tylko sprawić, żebyś potrafił:
>
> - sklonować cudzy projekt,
> - rozpoznać jego strukturę,
> - zrozumieć podstawową składnię,
> - wiedzieć skąd biorą się zależności,
> - uruchomić projekt lokalnie,
> - zbudować go,
> - debugować podstawowe problemy,
> - uruchomić testy,
> - wdrożyć aplikację na serwer,
> - zorientować się, co się właściwie dzieje w kodzie.

---

# 1. Czym właściwie jest Node.js?

Node.js to środowisko pozwalające uruchamiać JavaScript **poza przeglądarką**.

W przeglądarce JavaScript korzysta między innymi z:

- DOM,
- `window`,
- `document`,
- zdarzeń przeglądarki,
- API przeglądarkowych.

Node.js daje JavaScriptowi inne możliwości:

- dostęp do plików,
- dostęp do sieci,
- uruchamianie serwerów HTTP,
- procesy systemowe,
- zmienne środowiskowe,
- komunikację z bazami danych,
- obsługę socketów,
- skrypty CLI.

Przykład:

```js
console.log("Hello from Node.js");
```

Uruchomienie:

```bash
node app.js
```

---

# 2. Node.js, npm, npx — co jest czym?

## Node.js

Interpreter / runtime JavaScript.

Sprawdzenie wersji:

```bash
node --version
```

lub:

```bash
node -v
```

---

## npm

Node Package Manager.

Instaluje zależności projektu.

```bash
npm --version
```

Typowe polecenie:

```bash
npm install
```

npm czyta plik:

```text
package.json
```

i instaluje potrzebne paczki.

---

## npx

Uruchamia program znajdujący się w paczce npm bez konieczności instalowania go globalnie.

Przykład:

```bash
npx eslint .
```

albo:

```bash
npx vite
```

---

# 3. Instalacja Node.js

Na systemach developerskich najlepiej unikać przypadkowych, bardzo starych wersji Node dostarczanych przez repozytorium systemowe.

Najwygodniejsze rozwiązania:

- nvm,
- fnm,
- Volta.

Najbardziej klasyczny jest `nvm`.

Po instalacji można wykonać:

```bash
nvm install --lts
```

Następnie:

```bash
node -v
npm -v
```

Lista zainstalowanych wersji:

```bash
nvm list
```

Zmiana wersji:

```bash
nvm use 22
```

Jeżeli projekt ma plik:

```text
.nvmrc
```

można wykonać:

```bash
nvm use
```

---

# 4. Projekt Node.js — najważniejsze pliki

Typowy projekt może wyglądać tak:

```text
my-project/
├── package.json
├── package-lock.json
├── node_modules/
├── src/
│   ├── index.js
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── services/
├── tests/
├── public/
├── .env
├── .env.example
├── .gitignore
└── README.md
```

Najważniejsze pliki:

## package.json

Serce projektu Node.

Przykład:

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch src/index.js",
    "start": "node src/index.js",
    "test": "vitest",
    "lint": "eslint ."
  },
  "dependencies": {
    "express": "^5.0.0"
  },
  "devDependencies": {
    "eslint": "^9.0.0",
    "vitest": "^3.0.0"
  }
}
```

Z tego pliku można bardzo szybko dowiedzieć się:

- jak projekt się nazywa,
- jaką ma wersję,
- jakie ma zależności,
- jakie polecenia można uruchamiać,
- czy używa ES Modules,
- czego używa do testów,
- czego używa do developmentu.

---

# 5. Sekcja scripts w package.json

To pierwsze miejsce, które powinieneś sprawdzić po sklonowaniu projektu.

Przykład:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "start": "node dist/server.js",
  "test": "vitest",
  "lint": "eslint ."
}
```

Uruchomienie:

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run test
```

Wyjątkiem jest:

```bash
npm start
```

które może być uruchamiane bez `run`.

Lista dostępnych skryptów:

```bash
npm run
```

---

# 6. package-lock.json

Plik:

```text
package-lock.json
```

zapamiętuje dokładne wersje zależności.

Przykład:

```json
"express": "5.1.0"
```

Dzięki temu dwie osoby instalujące projekt powinny dostać praktycznie ten sam zestaw paczek.

Nie kasuj `package-lock.json` bez powodu.

---

# 7. node_modules

Po wykonaniu:

```bash
npm install
```

powstaje katalog:

```text
node_modules/
```

Może zawierać dziesiątki albo tysiące paczek.

Nigdy nie wrzuca się go do Git.

`.gitignore` powinien zawierać:

```gitignore
node_modules/
```

Jeżeli coś dziwnie zachowuje się po zmianie zależności, czasami pomaga:

```bash
rm -rf node_modules
npm install
```

Jeszcze lepiej dla powtarzalnych instalacji:

```bash
npm ci
```

---

# 8. npm install kontra npm ci

## npm install

```bash
npm install
```

Instaluje zależności.

Może również aktualizować `package-lock.json`.

Używane zwykle podczas developmentu.

---

## npm ci

```bash
npm ci
```

Instaluje dokładnie wersje zapisane w `package-lock.json`.

Wymaga istniejącego lockfile.

Najlepsze dla:

- CI/CD,
- serwerów,
- Dockerfile,
- powtarzalnych buildów.

---

# 9. dependencies i devDependencies

W `package.json`:

```json
"dependencies": {
  "express": "^5.0.0"
}
```

To biblioteki wymagane do działania aplikacji.

Przykłady:

- Express,
- Fastify,
- PostgreSQL driver,
- Redis client.

---

```json
"devDependencies": {
  "eslint": "^9.0.0",
  "vitest": "^3.0.0"
}
```

Potrzebne głównie podczas tworzenia aplikacji.

Przykłady:

- test framework,
- linter,
- bundler,
- formatter,
- TypeScript compiler.

---

# 10. Instalowanie paczek

Biblioteka runtime:

```bash
npm install express
```

Biblioteka developerska:

```bash
npm install --save-dev eslint
```

lub krócej:

```bash
npm i -D eslint
```

Usunięcie:

```bash
npm uninstall express
```

---

# 11. Wersjonowanie paczek

Przykład:

```json
"express": "^5.1.0"
```

Znaki mają znaczenie.

## Dokładna wersja

```text
5.1.0
```

Tylko ta wersja.

---

## Caret

```text
^5.1.0
```

Pozwala zwykle aktualizować wersje minor i patch:

```text
5.x.x
```

---

## Tilde

```text
~5.1.0
```

Pozwala głównie na aktualizacje patch:

```text
5.1.x
```

---

# 12. Aktualizacja paczek

Sprawdzenie starych paczek:

```bash
npm outdated
```

Aktualizacja zgodnie z zakresem zapisanym w `package.json`:

```bash
npm update
```

Audyt bezpieczeństwa:

```bash
npm audit
```

Automatyczna próba naprawy:

```bash
npm audit fix
```

Nie stosuj bezmyślnie:

```bash
npm audit fix --force
```

bo może przeskoczyć na niekompatybilne wersje bibliotek.

---

# 13. JavaScript potrzebny do czytania Node.js

## Zmienna let

```js
let counter = 1;

counter = 2;
```

Wartość może się zmienić.

---

## Stała const

```js
const port = 3000;
```

Nie można przypisać nowej wartości do tej zmiennej.

W nowoczesnym JS najczęściej zobaczysz:

```js
const
```

a dopiero gdy wartość musi się zmieniać:

```js
let
```

---

## var

Starsza forma:

```js
var name = "Karol";
```

Obecnie zwykle się jej unika.

Jeżeli widzisz dużo `var`, prawdopodobnie patrzysz na starszy kod.

---

# 14. Typy danych

JavaScript jest dynamicznie typowany.

```js
const name = "Karol";
const age = 46;
const active = true;
const nothing = null;
const missing = undefined;
```

Podstawowe typy:

```text
string
number
boolean
null
undefined
bigint
symbol
object
```

---

# 15. Stringi

```js
const name = "Karol";
```

lub:

```js
const name = 'Karol';
```

Template string:

```js
const text = `Hello ${name}`;
```

To bardzo częsta konstrukcja.

---

# 16. Tablice

```js
const users = ["Anna", "Karol", "Jan"];
```

Dostęp:

```js
users[0]
```

Rezultat:

```text
Anna
```

Dodanie:

```js
users.push("Marek");
```

Iteracja:

```js
for (const user of users) {
  console.log(user);
}
```

---

# 17. Obiekty

Bardzo ważne w JavaScript.

```js
const user = {
  name: "Karol",
  age: 46,
  active: true
};
```

Dostęp:

```js
user.name
```

lub:

```js
user["name"]
```

---

# 18. Destrukturyzacja

Bardzo częsta konstrukcja.

Zamiast:

```js
const name = user.name;
const age = user.age;
```

można:

```js
const { name, age } = user;
```

W funkcjach często zobaczysz:

```js
function createUser({ name, email }) {
  // ...
}
```

---

# 19. Spread operator

```js
const newUser = {
  ...user,
  active: false
};
```

Znaczy mniej więcej:

> weź pola z `user`, a następnie nadpisz `active`.

Tablice:

```js
const allUsers = [...users, "Adam"];
```

---

# 20. Funkcje

Klasyczna funkcja:

```js
function add(a, b) {
  return a + b;
}
```

Wywołanie:

```js
add(2, 3);
```

---

# 21. Arrow functions

Bardzo popularne:

```js
const add = (a, b) => {
  return a + b;
};
```

Krótka forma:

```js
const add = (a, b) => a + b;
```

Jedna zmienna:

```js
const square = x => x * x;
```

---

# 22. Warunki

```js
if (user.active) {
  console.log("active");
}
```

---

```js
if (age >= 18) {
  console.log("adult");
} else {
  console.log("minor");
}
```

---

# 23. Porównania

Preferuj:

```js
===
```

zamiast:

```js
==
```

Przykład:

```js
5 === "5"
```

wynik:

```text
false
```

Natomiast:

```js
5 == "5"
```

może dać:

```text
true
```

przez automatyczną konwersję typów.

---

# 24. Operatory logiczne

AND:

```js
a && b
```

OR:

```js
a || b
```

NOT:

```js
!a
```

Przykład:

```js
if (user && user.active) {
  // ...
}
```

---

# 25. Optional chaining

Bardzo użyteczna składnia:

```js
user?.profile?.email
```

Jeżeli któryś element nie istnieje, kod nie wywali od razu wyjątku.

Bez tego:

```js
user.profile.email
```

może się wywalić, jeśli `profile` jest `undefined`.

---

# 26. Nullish coalescing

```js
const port = process.env.PORT ?? 3000;
```

Jeżeli `PORT` jest `null` lub `undefined`, użyje:

```text
3000
```

---

# 27. Operator warunkowy

```js
const status = active ? "online" : "offline";
```

To krótka forma:

```js
if (active) {
  status = "online";
} else {
  status = "offline";
}
```

---

# 28. Pętle

```js
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

Częściej w nowoczesnym JS:

```js
for (const user of users) {
  console.log(user);
}
```

---

# 29. map, filter, find

Bardzo częste w kodzie JS.

## map

```js
const names = users.map(user => user.name);
```

Tworzy nową tablicę.

---

## filter

```js
const activeUsers = users.filter(user => user.active);
```

Filtruje elementy.

---

## find

```js
const admin = users.find(user => user.role === "admin");
```

Zwraca pierwszy pasujący element.

---

# 30. Moduły

Kod Node zwykle podzielony jest na wiele plików.

Są dwa główne systemy modułów.

---

# 31. CommonJS

Starszy system Node.

Import:

```js
const express = require("express");
```

Eksport:

```js
module.exports = something;
```

lub:

```js
exports.foo = foo;
```

---

# 32. ES Modules

Nowoczesny styl.

Import:

```js
import express from "express";
```

Eksport:

```js
export function foo() {
}
```

lub:

```js
export default foo;
```

W `package.json` często zobaczysz:

```json
"type": "module"
```

To sygnał, że projekt używa ES Modules.

---

# 33. import — jak go czytać

```js
import express from "express";
```

Import domyślny.

---

```js
import { readFile } from "node:fs/promises";
```

Import nazwany.

---

```js
import * as fs from "node:fs";
```

Import całego modułu.

---

```js
import config from "./config.js";
```

Import lokalnego pliku.

---

# 34. Moduły wbudowane Node.js

Node ma wiele własnych modułów.

Przykłady:

```text
node:fs
node:path
node:http
node:https
node:os
node:crypto
node:events
node:stream
node:url
node:process
node:child_process
```

Przykład:

```js
import fs from "node:fs";
```

Jeżeli import zaczyna się od:

```text
node:
```

to biblioteka jest częścią Node.js.

---

# 35. Praca z plikami

Przykład:

```js
import { readFile } from "node:fs/promises";

const text = await readFile("config.json", "utf8");
```

Zapis:

```js
import { writeFile } from "node:fs/promises";

await writeFile("output.txt", "hello");
```

---

# 36. Asynchroniczność — klucz do Node.js

Node bardzo intensywnie korzysta z operacji asynchronicznych.

Przykład:

```js
const data = await readFile("file.txt", "utf8");
```

Program może wykonywać inne rzeczy, kiedy czeka na:

- dysk,
- bazę danych,
- sieć,
- HTTP,
- Redis,
- API.

---

# 37. Promise

Funkcja może zwrócić obietnicę przyszłego wyniku.

```js
fetch(url)
```

zwraca `Promise`.

Można użyć:

```js
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

---

# 38. async / await

Czytelniejsza forma:

```js
async function loadData() {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}
```

Jeżeli widzisz:

```js
await
```

to kod czeka na zakończenie operacji asynchronicznej.

---

# 39. Obsługa błędów

Klasycznie:

```js
try {
  const data = await loadData();
} catch (error) {
  console.error(error);
}
```

Jeżeli szukasz problemu, bardzo często warto znaleźć:

```text
try
catch
throw
```

---

# 40. throw

Ręczne zgłoszenie błędu:

```js
throw new Error("User not found");
```

---

# 41. Event loop — wystarczy tyle

Node nie tworzy osobnego systemowego wątku dla każdego requestu.

Podstawowy model wygląda mniej więcej tak:

```text
request
   |
   v
Node.js
   |
   +--> zleca I/O
   |
   +--> obsługuje inne rzeczy
   |
   v
callback / Promise
```

Dlatego Node dobrze nadaje się do aplikacji wykonujących dużo:

- requestów HTTP,
- operacji bazodanowych,
- komunikacji sieciowej,
- I/O.

Gorzej radzi sobie z ciężkimi obliczeniami CPU, jeżeli wykonuje się je bezpośrednio w głównym wątku.

---

# 42. process

Globalny obiekt Node.

Przykład:

```js
console.log(process.pid);
```

Argumenty programu:

```js
console.log(process.argv);
```

Wyjście:

```js
process.exit(1);
```

---

# 43. Zmienne środowiskowe

Jedna z najważniejszych rzeczy w deploymentach.

```js
const port = process.env.PORT;
```

Shell:

```bash
export PORT=3000
node server.js
```

lub:

```bash
PORT=3000 node server.js
```

---

# 44. Plik .env

Bardzo wiele projektów posiada:

```text
.env
```

Przykład:

```env
PORT=3000
DATABASE_URL=postgres://user:password@localhost/app
OPENAI_API_KEY=...
```

Nigdy nie commituj sekretów.

`.gitignore`:

```gitignore
.env
```

Projekt często dostarcza:

```text
.env.example
```

Przykład:

```env
PORT=
DATABASE_URL=
OPENAI_API_KEY=
```

---

# 45. Uruchomienie po sklonowaniu projektu

Standardowy workflow:

```bash
git clone https://github.com/example/app.git
cd app
```

Sprawdzenie:

```bash
ls
```

Następnie przeczytaj:

```text
README.md
package.json
.env.example
```

Instalacja:

```bash
npm ci
```

Jeżeli lockfile nie istnieje:

```bash
npm install
```

Potem:

```bash
npm run
```

Sprawdź dostępne skrypty.

Najczęściej:

```bash
npm run dev
```

lub:

```bash
npm start
```

---

# 46. Jak znaleźć punkt wejścia aplikacji

Sprawdź `package.json`.

Może być:

```json
"main": "src/index.js"
```

lub skrypt:

```json
"start": "node src/server.js"
```

Wtedy wiadomo, że aplikacja zaczyna się tutaj:

```text
src/server.js
```

Szukaj nazw:

```text
index.js
server.js
app.js
main.js
cli.js
```

---

# 47. Jak czytać projekt Node.js

Nie czytaj wszystkich plików po kolei.

Najlepsza kolejność:

1. `README.md`
2. `package.json`
3. główny plik aplikacji
4. konfiguracja
5. routing
6. logika biznesowa
7. dostęp do danych
8. testy

Typowy backend:

```text
request
  |
  v
route
  |
  v
controller
  |
  v
service
  |
  v
repository / database
```

---

# 48. Typowa architektura Express

```text
src/
├── app.js
├── server.js
├── routes/
├── controllers/
├── services/
├── middleware/
├── models/
└── config/
```

Znaczenie:

## routes

Definicje endpointów.

Przykład:

```js
router.get("/users", getUsers);
```

---

## controllers

Obsługa requestu HTTP.

Przykład:

```js
async function getUsers(req, res) {
  // ...
}
```

---

## services

Logika biznesowa.

```js
userService.createUser(...)
```

---

## models

Modele danych.

---

## middleware

Kod uruchamiany pomiędzy requestem a właściwym handlerem.

Przykłady:

- autoryzacja,
- logowanie,
- CORS,
- parsowanie danych,
- rate limiting.

---

# 49. req i res

W Express:

```js
app.get("/hello", (req, res) => {
  res.json({ message: "hello" });
});
```

`req`:

```text
request
```

czyli żądanie klienta.

`res`:

```text
response
```

czyli odpowiedź serwera.

---

# 50. Parametry URL

Endpoint:

```text
/users/123
```

Kod:

```js
app.get("/users/:id", (req, res) => {
  console.log(req.params.id);
});
```

---

# 51. Query string

URL:

```text
/users?page=2
```

Kod:

```js
req.query.page
```

---

# 52. Body requestu

JSON:

```json
{
  "name": "Karol"
}
```

Kod:

```js
req.body.name
```

---

# 53. Status HTTP

```js
res.status(404).json({
  error: "Not found"
});
```

Typowe:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```

---

# 54. Backend Node i frontend

Node nie oznacza automatycznie backendu.

Node może służyć również do:

- budowania Reacta,
- budowania Vue,
- budowania Angulara,
- uruchamiania Vite,
- narzędzi developerskich,
- lintowania,
- testowania.

Przykład:

```text
React source
     |
     v
Vite
     |
     v
Node.js
     |
     v
dist/
```

Po buildzie Node może już wcale nie być potrzebny.

---

# 55. Czy Node.js się kompiluje?

To zależy.

Sam kod JavaScript zazwyczaj **nie jest klasycznie kompilowany jak C czy Go**.

Uruchamiasz:

```bash
node app.js
```

Node wykonuje kod przez silnik V8.

Ale projekt może posiadać etap:

```bash
npm run build
```

który może wykonywać:

- transpiling,
- bundling,
- minifikację,
- kompilację TypeScript,
- generowanie assetów,
- budowanie frontendu.

---

# 56. TypeScript

Bardzo częsty w projektach Node.

Pliki:

```text
.ts
.tsx
```

TypeScript dodaje statyczne typowanie.

Przykład:

```ts
const age: number = 46;
```

TypeScript jest zwykle zamieniany na JavaScript.

```text
src/
  server.ts

       |
       v

npm run build

       |
       v

dist/
  server.js
```

---

# 57. tsconfig.json

Konfiguracja TypeScript.

Przykład:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "outDir": "dist",
    "strict": true
  }
}
```

Jeżeli widzisz:

```text
tsconfig.json
```

projekt korzysta z TypeScript.

---

# 58. Build projektu

Najpierw:

```bash
npm ci
```

Potem:

```bash
npm run build
```

Sprawdź, czy powstał katalog:

```text
dist/
```

lub:

```text
build/
```

Następnie zazwyczaj:

```bash
npm start
```

---

# 59. Development kontra production

Development:

```bash
npm run dev
```

Może uruchamiać:

- watcher,
- hot reload,
- sourcemapy,
- szczegółowe logi.

Production:

```bash
npm start
```

lub:

```bash
NODE_ENV=production npm start
```

---

# 60. NODE_ENV

Popularna zmienna:

```bash
NODE_ENV=production
```

Kod:

```js
if (process.env.NODE_ENV === "production") {
  // ...
}
```

Typowe wartości:

```text
development
test
production
```

---

# 61. Watch mode

Node może automatycznie restartować aplikację po zmianie pliku.

Przykład:

```bash
node --watch src/index.js
```

Starsze projekty często używają:

```text
nodemon
```

---

# 62. Debugowanie najprostsze

Najważniejsza metoda:

```js
console.log(variable);
```

Lepsze:

```js
console.log({ variable });
```

Błędy:

```js
console.error(error);
```

Ostrzeżenia:

```js
console.warn(message);
```

---

# 63. Debugger Node

Uruchomienie:

```bash
node --inspect src/index.js
```

lub zatrzymanie przed wykonaniem kodu:

```bash
node --inspect-brk src/index.js
```

Można potem podłączyć:

- Chrome DevTools,
- VS Code.

---

# 64. debugger

W kodzie można wstawić:

```js
debugger;
```

Debugger zatrzyma wykonanie w tym miejscu.

---

# 65. Stack trace

Przykład błędu:

```text
TypeError: Cannot read properties of undefined
    at createUser (/app/services/user.js:42:17)
    at handler (/app/routes/users.js:18:5)
```

Czytaj od góry.

Najważniejsza informacja:

```text
/app/services/user.js:42:17
```

czyli:

```text
plik
linia
kolumna
```

---

# 66. Linter

Najpopularniejszy:

```text
ESLint
```

Uruchomienie:

```bash
npm run lint
```

lub:

```bash
npx eslint .
```

Linter wykrywa między innymi:

- błędy składni,
- podejrzany kod,
- nieużywane zmienne,
- naruszenia standardów projektu.

---

# 67. Formatter

Bardzo popularny:

```text
Prettier
```

Przykład:

```bash
npx prettier --check .
```

Formatowanie:

```bash
npx prettier --write .
```

---

# 68. Testy

Najczęstsze frameworki:

- Vitest,
- Jest,
- Mocha,
- Node test runner.

Najpierw:

```bash
npm test
```

albo:

```bash
npm run test
```

---

# 69. Wbudowany test runner Node

Przykład:

```js
import test from "node:test";
import assert from "node:assert";

test("2 + 2", () => {
  assert.equal(2 + 2, 4);
});
```

Uruchomienie:

```bash
node --test
```

---

# 70. Jak znaleźć testy

Szukaj:

```text
test/
tests/
__tests__/
```

lub plików:

```text
*.test.js
*.spec.js
*.test.ts
*.spec.ts
```

Testy są świetną dokumentacją zachowania aplikacji.

---

# 71. Najważniejsze narzędzia ecosystemu

## Express

Klasyczny framework HTTP.

---

## Fastify

Nowoczesny i szybki framework backendowy.

---

## NestJS

Duży framework aplikacyjny.

Struktura przypomina rozwiązania enterprise.

---

## Vite

Build tool dla frontendu.

---

## React

Biblioteka UI.

---

## Vue

Framework UI.

---

## Angular

Rozbudowany framework frontendowy.

---

## Prisma

ORM / narzędzie do pracy z bazami.

---

## Sequelize

ORM.

---

## Drizzle

Nowoczesny ORM / query builder.

---

# 72. JSON

W Node spotkasz JSON wszędzie.

```json
{
  "name": "Karol",
  "active": true
}
```

JavaScript:

```js
const text = JSON.stringify(object);
```

JSON -> obiekt:

```js
const object = JSON.parse(text);
```

---

# 73. npm, yarn, pnpm

Nie każdy projekt używa npm.

## npm

Plik:

```text
package-lock.json
```

---

## yarn

Plik:

```text
yarn.lock
```

---

## pnpm

Plik:

```text
pnpm-lock.yaml
```

Nie mieszaj menedżerów bez potrzeby.

Jeżeli projekt ma:

```text
pnpm-lock.yaml
```

używaj `pnpm`.

---

# 74. Corepack

Node może współpracować z Corepack do zarządzania Yarn/pnpm.

Projekt może posiadać w `package.json`:

```json
"packageManager": "pnpm@10.0.0"
```

To dobra wskazówka, czego użyć.

---

# 75. Jak rozpoznać technologię projektu

## Express

```json
"express": "..."
```

---

## React

```json
"react": "..."
```

---

## Vue

```json
"vue": "..."
```

---

## Angular

```json
"@angular/core": "..."
```

---

## Vite

```json
"vite": "..."
```

---

## Next.js

```json
"next": "..."
```

---

## NestJS

```json
"@nestjs/core": "..."
```

---

# 76. npm run build — co naprawdę robi?

Sprawdź:

```json
"scripts": {
  "build": "tsc"
}
```

oznacza TypeScript compiler.

---

```json
"build": "vite build"
```

oznacza build Vite.

---

```json
"build": "webpack"
```

oznacza Webpack.

---

```json
"build": "next build"
```

oznacza Next.js.

---

# 77. Environment produkcyjny

Typowy backend Node potrzebuje:

```text
Node.js
aplikacja
node_modules
config / env
baza danych
reverse proxy
manager procesu
```

---

# 78. Najprostszy deployment na Debianie

Załóżmy:

```text
/opt/myapp
```

Klon:

```bash
sudo git clone https://github.com/example/myapp.git /opt/myapp
```

Przejście:

```bash
cd /opt/myapp
```

Instalacja:

```bash
npm ci
```

Build:

```bash
npm run build
```

Start testowy:

```bash
npm start
```

---

# 79. Nie uruchamiaj produkcji przez terminal

Nie rób:

```bash
ssh server
npm start
```

i zostawienia aplikacji w terminalu.

Po zamknięciu SSH proces może zniknąć.

Użyj:

- systemd,
- Dockera,
- ewentualnie PM2.

---

# 80. systemd

Dobre rozwiązanie dla jednej aplikacji Node.

Plik:

```text
/etc/systemd/system/myapp.service
```

Przykład:

```ini
[Unit]
Description=My Node App
After=network.target

[Service]
Type=simple
User=myapp
WorkingDirectory=/opt/myapp
Environment=NODE_ENV=production
EnvironmentFile=/etc/myapp.env
ExecStart=/usr/bin/node /opt/myapp/dist/server.js
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

---

# 81. Uruchomienie systemd

Po dodaniu service:

```bash
sudo systemctl daemon-reload
```

Start:

```bash
sudo systemctl start myapp
```

Autostart:

```bash
sudo systemctl enable myapp
```

Status:

```bash
sudo systemctl status myapp
```

Logi:

```bash
journalctl -u myapp
```

Live:

```bash
journalctl -u myapp -f
```

---

# 82. Nginx jako reverse proxy

Aplikacja Node może słuchać lokalnie:

```text
127.0.0.1:3000
```

Nginx wystawia ją na świat:

```text
https://example.com
```

Schemat:

```text
Internet
   |
   v
Nginx :443
   |
   v
Node :3000
```

Przykład:

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;

        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

# 83. Port aplikacji

Typowy kod:

```js
const port = process.env.PORT ?? 3000;

app.listen(port);
```

Produkcja:

```env
PORT=3000
```

Aplikacji nie musisz wystawiać bezpośrednio na port 80/443.

Od tego jest Nginx.

---

# 84. PM2

Popularny manager procesów Node.

Instalacja:

```bash
npm install -g pm2
```

Start:

```bash
pm2 start dist/server.js --name myapp
```

Lista:

```bash
pm2 list
```

Logi:

```bash
pm2 logs myapp
```

Restart:

```bash
pm2 restart myapp
```

PM2 jest wygodny, ale na klasycznym Debianie często wystarcza zwykły `systemd`.

---

# 85. Deployment przez Docker

Typowy Dockerfile:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]
```

Build:

```bash
docker build -t myapp .
```

Uruchomienie:

```bash
docker run -d \
  --name myapp \
  -p 3000:3000 \
  --env-file .env \
  myapp
```

---

# 86. Multi-stage Docker build

Lepszy model dla projektów wymagających kompilacji.

```dockerfile
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

ENV NODE_ENV=production

CMD ["node", "dist/server.js"]
```

Zaletą jest mniejszy finalny obraz.

---

# 87. .dockerignore

Przykład:

```dockerignore
node_modules
.git
.env
npm-debug.log
coverage
```

---

# 88. Deployment statycznego frontendu

Projekt React/Vue może po:

```bash
npm run build
```

utworzyć:

```text
dist/
```

Jeżeli wynik to statyczne:

```text
HTML
CSS
JS
assets
```

nie trzeba uruchamiać Node na produkcji.

Można skopiować `dist/` do:

```text
/var/www/example.com
```

i obsługiwać przez Nginx.

---

# 89. Typowy deployment backendu

```text
Git
 |
 v
npm ci
 |
 v
npm run build
 |
 v
dist/
 |
 v
systemd / Docker
 |
 v
127.0.0.1:3000
 |
 v
Nginx
 |
 v
HTTPS
```

---

# 90. Deployment ręczny po aktualizacji

Przykład:

```bash
cd /opt/myapp
git pull
npm ci
npm run build
sudo systemctl restart myapp
```

Potem:

```bash
sudo systemctl status myapp
```

i:

```bash
journalctl -u myapp -n 100
```

---

# 91. Prosty skrypt deploy

```bash
#!/usr/bin/env bash
set -e

cd /opt/myapp

git pull
npm ci
npm run build

sudo systemctl restart myapp
sudo systemctl status myapp --no-pager
```

---

# 92. CI/CD

Automatyczny deployment może wyglądać tak:

```text
git push
   |
   v
GitHub
   |
   v
GitHub Actions
   |
   +--> npm ci
   +--> npm test
   +--> npm run build
   |
   v
deployment
```

---

# 93. Podstawowy GitHub Actions

```yaml
name: Node CI

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci

      - run: npm test

      - run: npm run build
```

---

# 94. Logi

Najprościej:

```js
console.log("server started");
```

W większych projektach spotkasz:

- Pino,
- Winston.

Przykładowy wpis JSON:

```json
{
  "level": "info",
  "message": "server started",
  "port": 3000
}
```

---

# 95. Problemy z portem

Błąd:

```text
EADDRINUSE
```

oznacza, że port jest zajęty.

Linux:

```bash
ss -ltnp
```

lub:

```bash
sudo lsof -i :3000
```

---

# 96. Problem: command not found

Przykład:

```text
vite: command not found
```

Najpierw:

```bash
npm install
```

lub:

```bash
npm ci
```

Nie musisz instalować Vite globalnie, jeśli jest zależnością projektu.

---

# 97. Problem: Cannot find module

Przykład:

```text
Cannot find module 'express'
```

Najczęściej:

```bash
npm install
```

albo:

```bash
npm ci
```

---

# 98. Problem: wersja Node

Możesz zobaczyć błędy typu:

```text
Unsupported engine
```

Sprawdź:

```bash
node -v
```

i:

```json
"engines": {
  "node": ">=22"
}
```

---

# 99. engines

W `package.json`:

```json
"engines": {
  "node": ">=22"
}
```

To informacja, jakiej wersji Node oczekuje projekt.

---

# 100. Problem z ES Modules

Błędy związane z:

```text
require
import
module.exports
export
```

często wynikają z mieszania:

```text
CommonJS
```

i:

```text
ES Modules
```

Sprawdź:

```json
"type": "module"
```

---

# 101. Problem z .env

Aplikacja działa lokalnie, ale nie na serwerze.

Najczęstsze przyczyny:

```text
brak DATABASE_URL
brak PORT
brak API_KEY
brak JWT_SECRET
```

Sprawdź środowisko procesu.

Systemd:

```bash
systemctl show myapp --property=Environment
```

---

# 102. Debugowanie deploymentu

Kolejność:

```bash
systemctl status myapp
```

potem:

```bash
journalctl -u myapp -n 100
```

potem:

```bash
ss -ltnp
```

potem lokalnie:

```bash
curl http://127.0.0.1:3000
```

Jeżeli działa lokalnie, ale nie przez domenę:

sprawdź Nginx.

```bash
sudo nginx -t
```

Następnie:

```bash
sudo systemctl status nginx
```

---

# 103. curl — bardzo ważny przy backendzie

GET:

```bash
curl http://localhost:3000/api/users
```

POST:

```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Karol"}' \
  http://localhost:3000/api/users
```

---

# 104. Bezpieczeństwo

Nie commituj:

```text
.env
API keys
hasła
tokeny
certyfikaty prywatne
```

Szukaj przypadkiem wrzuconych sekretów:

```bash
git grep -i "password"
```

lub:

```bash
git grep -i "api_key"
```

---

# 105. npm scripts mogą robić wszystko

To bardzo ważne.

Przykład:

```json
"scripts": {
  "build": "rm -rf dist && tsc",
  "start": "node dist/server.js"
}
```

`npm run build` może wykonać praktycznie dowolne polecenie shellowe.

Dlatego przed uruchomieniem nieznanego projektu warto zobaczyć:

```json
"scripts"
```

---

# 106. Lifecycle scripts

npm ma specjalne hooki:

```text
preinstall
install
postinstall
prepare
prepublish
```

Przykład:

```json
"scripts": {
  "postinstall": "node scripts/setup.js"
}
```

Oznacza to, że:

```bash
npm install
```

może automatycznie uruchomić kod.

To ważne również ze względów bezpieczeństwa.

---

# 107. instalowanie bez scripts

Dla nieznanego projektu można czasami najpierw użyć:

```bash
npm install --ignore-scripts
```

albo:

```bash
npm ci --ignore-scripts
```

Pozwala obejrzeć projekt bez uruchamiania jego lifecycle scripts.

Nie zawsze aplikacja będzie potem kompletna, ale to przydatne przy analizie obcego repo.

---

# 108. package.json — szybki audyt

Przed uruchomieniem projektu sprawdź:

```text
name
version
type
scripts
dependencies
devDependencies
engines
packageManager
```

---

# 109. Co jeszcze może znajdować się w projekcie

```text
eslint.config.js
.prettierrc
vite.config.js
webpack.config.js
tsconfig.json
Dockerfile
docker-compose.yml
compose.yml
.env.example
prisma/
migrations/
.github/workflows/
```

Każdy z tych plików mówi coś ważnego o projekcie.

---

# 110. docker compose

Projekt może wymagać kilku usług:

```text
Node
PostgreSQL
Redis
```

Przykład:

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"

  db:
    image: postgres:17

  redis:
    image: redis:7
```

Start:

```bash
docker compose up
```

W tle:

```bash
docker compose up -d
```

---

# 111. Bazy danych

Node sam nie jest bazą.

Popularne:

```text
PostgreSQL
MySQL
MariaDB
SQLite
MongoDB
Redis
```

Sterownik PostgreSQL:

```text
pg
```

Prisma może ukrywać część SQL za ORM.

---

# 112. Migracje

Projekt może posiadać:

```text
migrations/
```

Są to kolejne zmiany schematu bazy.

Przykładowy workflow:

```bash
npm run migrate
```

lub:

```bash
npx prisma migrate deploy
```

Nie uruchamiaj migracji produkcyjnych bez sprawdzenia, co robią.

---

# 113. Prisma

Jeżeli widzisz:

```text
prisma/schema.prisma
```

projekt używa Prisma.

Przykład:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
}
```

---

# 114. Middleware

Przykład:

```js
app.use(authMiddleware);
```

Kod będzie wykonany przy requestach zanim request dotrze do endpointu.

Możliwe zastosowania:

```text
auth
logging
CORS
rate limiting
JSON parsing
cookies
sessions
```

---

# 115. Callback

Starsza składnia asynchroniczna:

```js
readFile("file.txt", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});
```

W nowszym kodzie częściej spotkasz:

```js
await readFile(...)
```

---

# 116. Klasy

JavaScript posiada klasy:

```js
class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  async getUser(id) {
    return this.repository.findById(id);
  }
}
```

Spotkasz je szczególnie w:

- NestJS,
- większych aplikacjach enterprise.

---

# 117. this

`this` oznacza kontekst obiektu.

Przykład:

```js
this.repository
```

zwykle oznacza:

> pole `repository` bieżącego obiektu.

W JavaScript zachowanie `this` potrafi być bardziej skomplikowane niż w C++/Java, ale do czytania większości kodu ta definicja wystarcza.

---

# 118. Import aliasy

TypeScript może mieć:

```js
import config from "@/config";
```

zamiast:

```js
import config from "../../config";
```

Alias jest zazwyczaj zdefiniowany w:

```text
tsconfig.json
vite.config.js
```

---

# 119. index.js jako barrel

Możesz zobaczyć:

```js
export * from "./user.js";
export * from "./auth.js";
```

Plik `index.js` zbiera eksporty z wielu modułów.

---

# 120. Czytanie funkcji

Przykład:

```js
async function createUser(data) {
  const existing = await repository.findByEmail(data.email);

  if (existing) {
    throw new Error("User already exists");
  }

  return repository.create(data);
}
```

Czytaj krokami:

```text
1. funkcja jest async
2. przyjmuje data
3. szuka użytkownika po mailu
4. jeśli istnieje -> błąd
5. jeśli nie -> tworzy użytkownika
```

Nie analizuj od razu każdego operatora.

Najpierw zrozum przepływ.

---

# 121. Jak czytać większą funkcję

Patrz na:

```text
input
walidację
operacje
wywołania innych funkcji
return
błędy
```

Przykład:

```text
request
  |
  v
validate
  |
  v
database lookup
  |
  v
business logic
  |
  v
database write
  |
  v
response
```

---

# 122. Jak sprawdzić, skąd pochodzi funkcja

Masz:

```js
await sendEmail(user.email);
```

Najpierw znajdź import:

```js
import { sendEmail } from "./mail.js";
```

Następnie otwórz:

```text
mail.js
```

To podstawowa technika czytania projektu.

---

# 123. Jak znaleźć użycie funkcji

Shell:

```bash
grep -R "sendEmail" src/
```

Lepsze:

```bash
rg "sendEmail"
```

`rg` = ripgrep.

Bardzo dobre narzędzie do czytania kodu.

---

# 124. rg — podstawy

Szukaj tekstu:

```bash
rg "DATABASE_URL"
```

Szukaj funkcji:

```bash
rg "createUser"
```

Tylko JS:

```bash
rg "createUser" -g '*.js'
```

Tylko TS:

```bash
rg "createUser" -g '*.ts'
```

---

# 125. find

Znajdź package.json:

```bash
find . -name package.json
```

Znajdź pliki TypeScript:

```bash
find src -name '*.ts'
```

---

# 126. tree

Świetne do orientacji.

```bash
tree -L 2
```

Przykład:

```text
.
├── package.json
├── src
│   ├── controllers
│   ├── routes
│   └── services
└── tests
```

---

# 127. npm ls

Lista paczek:

```bash
npm ls --depth=0
```

Pokazuje główne zależności.

---

# 128. npm explain

Chcesz wiedzieć, dlaczego paczka jest zainstalowana:

```bash
npm explain lodash
```

---

# 129. npm view

Informacje o paczce:

```bash
npm view express
```

Wersja:

```bash
npm view express version
```

---

# 130. Globalne paczki

Lista:

```bash
npm list -g --depth=0
```

Instalacja:

```bash
npm install -g some-tool
```

Nie instaluj globalnie bibliotek projektu takich jak:

```text
express
react
axios
```

---

# 131. shebang w narzędziach CLI

Możesz zobaczyć:

```js
#!/usr/bin/env node
```

Na początku pliku.

Oznacza:

> uruchom ten skrypt przez Node.js.

---

# 132. CLI w Node

Przykład:

```js
#!/usr/bin/env node

console.log(process.argv);
```

Uruchomienie:

```bash
node cli.js hello
```

---

# 133. Streams

Node bardzo często używa strumieni.

Przykład:

```js
readStream.pipe(writeStream);
```

Mentalny model:

```text
duży plik
 |
 v
małe kawałki danych
 |
 v
odbiorca
```

Dzięki temu nie trzeba ładować całego pliku do RAM.

---

# 134. Buffer

Node reprezentuje dane binarne przez:

```text
Buffer
```

Przykład:

```js
const buffer = Buffer.from("hello");
```

Spotkasz przy:

- plikach,
- sieci,
- obrazach,
- protokołach binarnych.

---

# 135. EventEmitter

Node ma system zdarzeń.

```js
emitter.on("data", data => {
  console.log(data);
});
```

Możesz myśleć o tym tak:

```text
kiedy pojawi się event "data"
uruchom tę funkcję
```

---

# 136. HTTP bez frameworka

Node ma własny serwer HTTP.

```js
import http from "node:http";

const server = http.createServer((req, res) => {
  res.end("hello");
});

server.listen(3000);
```

Express i Fastify budują wygodniejsze API na tej podstawie.

---

# 137. fetch

W nowoczesnym Node można używać:

```js
const response = await fetch("https://example.com");
```

Następnie:

```js
const data = await response.json();
```

---

# 138. API REST

Typowe endpointy:

```text
GET    /users
GET    /users/123
POST   /users
PUT    /users/123
PATCH  /users/123
DELETE /users/123
```

Node bardzo często służy właśnie do takich API.

---

# 139. WebSocket

Node nadaje się również do:

- czatów,
- statusów live,
- gier,
- dashboardów,
- powiadomień.

Biblioteki:

```text
ws
Socket.IO
```

---

# 140. worker_threads

Ciężkie operacje CPU można przenieść poza główny wątek.

```text
worker_threads
```

Nie musisz znać szczegółów, ale gdy widzisz:

```js
new Worker(...)
```

oznacza to wykorzystanie dodatkowego wątku.

---

# 141. child_process

Node może uruchamiać programy systemowe.

Przykład:

```js
import { exec } from "node:child_process";
```

To potężne, ale wymaga ostrożności ze względów bezpieczeństwa.

Szczególnie jeżeli argument pochodzi od użytkownika.

---

# 142. Najważniejsze pułapki bezpieczeństwa

Zwracaj uwagę na:

```js
eval(...)
```

```js
exec(userInput)
```

```js
fs.readFile(userControlledPath)
```

```js
res.send(rawUserHtml)
```

oraz sekrety w kodzie.

---

# 143. Sanitizacja i walidacja

Backend nie powinien ufać danym klienta.

Przykładowe biblioteki:

```text
Zod
Joi
Yup
Ajv
```

Przykład Zod:

```js
const UserSchema = z.object({
  email: z.string().email()
});
```

---

# 144. CORS

CORS kontroluje, jakie strony mogą wykonywać requesty do backendu.

Przykład:

```js
app.use(cors());
```

Na produkcji często należy ograniczyć do konkretnego origin.

---

# 145. JWT

Token często używany do autoryzacji.

```text
header.payload.signature
```

JWT nie jest szyfrowanym magazynem danych.

Dane tokenu można zwykle odczytać.

Bezpieczeństwo daje podpis.

---

# 146. Session

Alternatywa:

```text
cookie
 |
 v
session ID
 |
 v
server
```

Node może przechowywać sesje np. w Redis.

---

# 147. Hashowanie haseł

Nigdy nie zapisuj hasła jako plain text.

Biblioteki:

```text
bcrypt
argon2
```

---

# 148. Semantyczne wersjonowanie

Format:

```text
MAJOR.MINOR.PATCH
```

Przykład:

```text
4.2.7
```

- MAJOR — zmiana niekompatybilna,
- MINOR — nowe funkcje,
- PATCH — poprawki.

---

# 149. ESM rozszerzenia

Możesz zobaczyć:

```text
.mjs
```

ES Module.

```text
.cjs
```

CommonJS.

```text
.js
```

znaczenie zależy między innymi od `package.json`.

---

# 150. npm cache

Sprawdzenie:

```bash
npm cache verify
```

Czyszczenie cache jest rzadko potrzebne.

Nie zaczynaj debugowania od:

```bash
npm cache clean --force
```

---

# 151. Memory leak i RAM

Sprawdzenie procesu:

```bash
ps aux | grep node
```

lub:

```bash
top
```

Na produkcji można obserwować:

```text
RSS
heap
CPU
event loop lag
```

---

# 152. NODE_OPTIONS

Można przekazać ustawienia runtime.

Przykład:

```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

Czasami buildy frontendowe potrzebują więcej RAM.

---

# 153. Exit code

Unix:

```text
0 = sukces
inne = błąd
```

Node:

```js
process.exit(0);
```

lub:

```js
process.exit(1);
```

Ma znaczenie w:

- CI,
- systemd,
- Dockerze,
- skryptach shellowych.

---

# 154. Signals

Proces może dostać sygnał.

Typowe:

```text
SIGTERM
SIGINT
```

Poprawna aplikacja powinna zamknąć się elegancko.

Przykład:

```js
process.on("SIGTERM", async () => {
  await server.close();
  process.exit(0);
});
```

---

# 155. Graceful shutdown

Przy deploymencie proces może otrzymać SIGTERM.

Dobrze napisany serwer:

```text
przestaje przyjmować requesty
czeka na bieżące
zamyka bazę
zamyka serwer
kończy proces
```

---

# 156. package-lock i bezpieczeństwo repo

Po aktualizacji zależności commitujesz zazwyczaj:

```text
package.json
package-lock.json
```

Nie tylko `package.json`.

---

# 157. Monorepo

Projekt może mieć:

```text
apps/
packages/
```

oraz narzędzia:

```text
npm workspaces
pnpm workspaces
Turborepo
Nx
```

Wtedy jeden Git repozytorium zawiera wiele aplikacji/paczek.

---

# 158. Workspaces

Przykład:

```json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

Może istnieć:

```text
apps/frontend
apps/backend
packages/shared
```

---

# 159. npm run z katalogu głównego

Monorepo często posiada skrypty typu:

```bash
npm run build
```

które budują wiele podprojektów.

Nie zakładaj, że `package.json` aplikacji znajduje się tylko jeden.

Sprawdź:

```bash
find . -name package.json -not -path '*/node_modules/*'
```

---

# 160. Source maps

Kod produkcyjny może być zbudowany.

Błąd pokazuje:

```text
dist/server.js
```

ale źródła są w:

```text
src/server.ts
```

Source maps pozwalają debuggerowi mapować:

```text
dist -> src
```

Pliki:

```text
*.map
```

---

# 161. Co oznacza dist

Najczęściej:

```text
distribution
```

czyli gotowy output builda.

Nie edytuj ręcznie plików `dist`, jeżeli są generowane.

Edytuj `src`.

---

# 162. public

Katalog:

```text
public/
```

zwykle zawiera:

- obrazy,
- favicon,
- statyczne pliki,
- czasami gotowy HTML.

---

# 163. static

Express może wystawiać statyczne pliki:

```js
app.use(express.static("public"));
```

---

# 164. Template engines

Nie każdy Node backend zwraca tylko JSON.

Może generować HTML.

Popularne:

```text
EJS
Pug
Handlebars
Nunjucks
```

Przykład:

```js
res.render("index", { user });
```

---

# 165. Next.js

Next.js łączy:

- React,
- routing,
- server rendering,
- API/server functions,
- build tooling.

Typowy:

```bash
npm run dev
npm run build
npm start
```

Deploy bywa bardziej złożony niż zwykłego statycznego Reacta.

---

# 166. SSR

Server Side Rendering:

```text
request
 |
 v
Node
 |
 v
generuje HTML
 |
 v
browser
```

Node musi działać na produkcji.

---

# 167. SPA

Single Page Application:

```text
browser
 |
 v
HTML + JS
 |
 v
API
```

Frontend może być statyczny, backend osobno.

---

# 168. Jak ocenić, czy Node jest wymagany na produkcji

Po buildzie sprawdź:

Czy wynik to tylko:

```text
index.html
assets/
*.js
*.css
```

Jeśli tak, prawdopodobnie można użyć samego Nginx.

Jeżeli start wymaga:

```bash
node server.js
```

Node musi działać na produkcji.

---

# 169. Kolejność analizy obcego repo

Praktyczna procedura:

```text
1. README.md
2. package.json
3. lockfile
4. .env.example
5. Dockerfile / compose
6. tsconfig
7. główny entry point
8. routes
9. services
10. DB layer
11. tests
12. CI workflow
```

---

# 170. Pierwsze polecenia po clone

```bash
git clone ...
cd project

tree -L 2

cat package.json

cat README.md

ls -la
```

Potem:

```bash
node -v
npm -v
```

Następnie:

```bash
npm ci
```

i:

```bash
npm run
```

---

# 171. Audyt bez uruchamiania kodu

Dla obcego projektu:

```bash
cat package.json
```

Sprawdź:

```text
scripts
postinstall
dependencies
```

Następnie:

```bash
find . -maxdepth 2 -type f | sort
```

i:

```bash
rg "process.env"
```

Pozwoli znaleźć wymagane zmienne środowiskowe.

---

# 172. Znajdowanie zmiennych środowiskowych

```bash
rg "process\.env"
```

Przykład wyniku:

```text
process.env.PORT
process.env.DATABASE_URL
process.env.JWT_SECRET
```

Na tej podstawie można stworzyć:

```text
.env
```

---

# 173. Znajdowanie portu

```bash
rg "listen\("
```

lub:

```bash
rg "PORT"
```

---

# 174. Znajdowanie endpointów

Express:

```bash
rg "router\.(get|post|put|patch|delete)"
```

lub:

```bash
rg "app\.(get|post|put|patch|delete)"
```

---

# 175. Znajdowanie bazy danych

```bash
rg "DATABASE_URL"
```

lub sprawdź zależności:

```text
pg
mysql2
mongoose
prisma
sequelize
drizzle
```

---

# 176. Znajdowanie API zewnętrznych

```bash
rg "fetch\("
```

```bash
rg "axios"
```

```bash
rg "https://"
```

---

# 177. Czytanie stacku technologicznego z package.json

Przykład:

```json
{
  "dependencies": {
    "express": "...",
    "pg": "...",
    "zod": "...",
    "jsonwebtoken": "..."
  },
  "devDependencies": {
    "typescript": "...",
    "vitest": "...",
    "eslint": "..."
  }
}
```

Można od razu wywnioskować:

```text
Express -> HTTP backend
pg -> PostgreSQL
Zod -> walidacja
JWT -> autoryzacja
TypeScript -> kod TS
Vitest -> testy
ESLint -> lintowanie
```

---

# 178. Jak nie czytać Node

Nie zaczynaj od:

```text
node_modules/
```

To kod zależności.

Nie czytaj `dist/`, jeżeli jest generowany.

Nie analizuj minifikowanych plików.

Skup się na:

```text
src/
app/
server/
packages/
```

---

# 179. Najważniejsze rozszerzenia plików

```text
.js    JavaScript
.mjs   ES Module
.cjs   CommonJS
.ts    TypeScript
.tsx   TypeScript + JSX
.jsx   JavaScript + JSX
.json  dane / konfiguracja
.yaml  konfiguracja
.yml   konfiguracja
.env   zmienne środowiskowe
```

---

# 180. JSX

React używa składni:

```jsx
function Button() {
  return <button>Hello</button>;
}
```

To wygląda jak HTML, ale jest składnią JavaScript/JSX.

Node/Vite/React build przetwarza ją do JS.

---

# 181. import CSS

Frontend może mieć:

```js
import "./style.css";
```

To nie jest standardowy import Node.

Obsługuje go bundler:

```text
Vite
Webpack
Next.js
```

---

# 182. Dynamic import

```js
const module = await import("./module.js");
```

Moduł jest ładowany dynamicznie.

Spotykane między innymi przy:

- lazy loading,
- pluginach,
- warunkowym ładowaniu modułów.

---

# 183. JSON import

Możesz spotkać:

```js
import data from "./data.json" with { type: "json" };
```

lub starsze rozwiązania zależne od toolchainu.

---

# 184. top-level await

W ES Modules można czasem zobaczyć:

```js
const data = await loadConfig();
```

bez opakowania w:

```js
async function main()
```

---

# 185. main pattern

Częsty czytelny wzorzec:

```js
async function main() {
  // start aplikacji
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
```

To dobry punkt wejścia do analizy.

---

# 186. Dependency injection

W większych projektach zobaczysz konstrukcje typu:

```js
new UserService(userRepository)
```

Oznacza:

> UserService dostaje zależność z zewnątrz.

NestJS robi to bardzo intensywnie automatycznie.

---

# 187. Repository

Repository to warstwa dostępu do danych.

Przykład:

```js
userRepository.findById(id)
```

Mentalny model:

```text
service
  |
  v
repository
  |
  v
database
```

---

# 188. Controller

Controller zwykle tłumaczy:

```text
HTTP request
```

na wywołanie logiki aplikacji.

I wynik:

```text
service
```

na:

```text
HTTP response
```

---

# 189. Service

Service powinien zawierać główną logikę biznesową.

Jeżeli chcesz zrozumieć:

> co aplikacja naprawdę robi,

często warto czytać właśnie katalog:

```text
services/
```

---

# 190. Config

Szukaj:

```text
config/
configuration/
settings/
```

Znajdziesz tam:

- port,
- DB,
- API URL,
- feature flags,
- tryb produkcyjny.

---

# 191. Feature flags

Przykład:

```js
if (config.enableNewCheckout) {
  // ...
}
```

Pozwalają włączać/wyłączać funkcje.

---

# 192. Logging requestów

Popularne:

```text
morgan
pino-http
```

Log:

```text
GET /users 200 12ms
```

Pomaga debugować API.

---

# 193. Health endpoint

Dobra aplikacja może mieć:

```text
GET /health
```

Przykład odpowiedzi:

```json
{
  "status": "ok"
}
```

Przydaje się do:

- Docker healthcheck,
- monitoringu,
- load balancera.

---

# 194. Healthcheck w shellu

```bash
curl -f http://127.0.0.1:3000/health
```

Exit code 0 oznacza sukces.

---

# 195. npm start produkcyjnie

Warto sprawdzić, czy:

```bash
npm start
```

naprawdę uruchamia produkcję.

Może być:

```json
"start": "node dist/index.js"
```

ale czasami:

```json
"start": "vite"
```

co niekoniecznie jest właściwe na produkcję.

Zawsze czytaj `scripts`.

---

# 196. Dev server to nie production server

Narzędzia takie jak:

```text
Vite dev server
```

służą do developmentu.

Nie używaj:

```bash
npm run dev
```

jako produkcyjnego deploymentu bez powodu.

---

# 197. Minimalny workflow produkcyjny

```bash
git pull
npm ci
npm test
npm run build
sudo systemctl restart myapp
curl -f http://127.0.0.1:3000/health
```

Jeżeli wszystko przechodzi — deploy jest prawdopodobnie OK.

---

# 198. Rollback

Przed deploymentem warto znać poprzedni commit:

```bash
git log --oneline -5
```

Jeżeli deploy się nie uda:

```bash
git checkout <stary-commit>
npm ci
npm run build
sudo systemctl restart myapp
```

Lepsze systemy robią rollback automatycznie.

---

# 199. npm ci i production dependencies

Jeżeli aplikacja jest już zbudowana:

```bash
npm ci --omit=dev
```

instaluje tylko zależności produkcyjne.

Nie stosuj przed buildem, jeśli build potrzebuje:

```text
typescript
vite
webpack
eslint
```

z `devDependencies`.

---

# 200. Build i deploy — dobre rozdzielenie

Model:

```text
CI
 |
 +--> npm ci
 +--> npm test
 +--> npm run build
 |
 v
artefakt
 |
 v
serwer
```

Serwer produkcyjny dostaje gotowy artefakt.

To bardziej przewidywalne niż kompilowanie wszystkiego bezpośrednio na serwerze.

---

# 201. Node w Dockerze — dobry model mentalny

```text
Docker image
├── Node runtime
├── aplikacja
├── node_modules
└── konfiguracja startu
```

Kontener nie jest maszyną wirtualną.

To izolowany proces z własnym filesystemem i zależnościami.

---

# 202. Docker volumes

Dane, które muszą przetrwać restart kontenera, nie powinny siedzieć tylko w filesystemie kontenera.

Dotyczy szczególnie:

```text
uploadów
SQLite
plików użytkownika
```

Stosuje się:

```text
volumes
```

---

# 203. Node i SQLite

Dla małych projektów SQLite może być świetne.

Plik:

```text
app.db
```

Jeżeli aplikacja działa w Dockerze, ten plik powinien być na volume.

---

# 204. Node jako narzędzie developerskie

Nawet jeżeli aplikacja końcowa nie używa Node, Node może być potrzebny do:

```text
npm install
npm run build
npm run lint
npm run test
```

To szczególnie ważne przy frontendzie.

---

# 205. Znaczenie lockfile podczas deploymentu

Bez lockfile:

```text
npm install
```

dzisiaj może zainstalować trochę inne wersje niż za pół roku.

Z lockfile i:

```bash
npm ci
```

build jest znacznie bardziej przewidywalny.

---

# 206. Minimalna lista rzeczy, które trzeba znać ze składni

Jeżeli chcesz tylko czytać kod, opanuj rozpoznawanie:

```text
const
let
object {}
array []
function
arrow function =>
if / else
for
return
async
await
try / catch
throw
import
export
class
new
this
?. 
??
...
```

To pozwala zrozumieć zdecydowaną większość typowego kodu Node.

---

# 207. Mentalny model funkcji async

Kod:

```js
const user = await getUser(id);
```

Czytaj:

> wywołaj `getUser`, poczekaj na wynik i przypisz go do `user`.

---

# 208. Mentalny model importu

Kod:

```js
import { getUser } from "./userService.js";
```

Czytaj:

> funkcja `getUser` znajduje się w `userService.js`.

---

# 209. Mentalny model middleware

Kod:

```js
app.use(auth);
```

Czytaj:

> zanim request pójdzie dalej, przejdzie przez `auth`.

---

# 210. Mentalny model callbacku

Kod:

```js
doSomething(result => {
  console.log(result);
});
```

Czytaj:

> kiedy `doSomething` będzie miało wynik, uruchom tę funkcję.

---

# 211. Mentalny model map

```js
users.map(user => user.name)
```

Czytaj:

> dla każdego użytkownika pobierz jego `name` i zbuduj z tego nową tablicę.

---

# 212. Mentalny model filter

```js
users.filter(user => user.active)
```

Czytaj:

> zostaw tylko aktywnych użytkowników.

---

# 213. Mentalny model destructuring

```js
const { id, email } = user;
```

Czytaj:

> wyciągnij pola `id` i `email` z obiektu `user`.

---

# 214. Mentalny model spread

```js
const updated = {
  ...user,
  active: false
};
```

Czytaj:

> skopiuj user i zmień active na false.

---

# 215. Checklist: dostałem obce repo Node

```text
[ ] Przeczytaj README.md
[ ] Otwórz package.json
[ ] Sprawdź scripts
[ ] Sprawdź Node engines
[ ] Sprawdź packageManager
[ ] Znajdź lockfile
[ ] Sprawdź .env.example
[ ] Znajdź entry point
[ ] Sprawdź Dockerfile / compose
[ ] Sprawdź testy
[ ] Sprawdź CI
[ ] npm ci
[ ] npm test
[ ] npm run build
[ ] npm start / npm run dev
```

---

# 216. Checklist: deployment na Debianie

```text
[ ] Node właściwej wersji
[ ] osobny użytkownik systemowy
[ ] repo / artefakt w /opt
[ ] npm ci
[ ] npm test
[ ] npm run build
[ ] .env poza repo
[ ] systemd lub Docker
[ ] aplikacja na localhost
[ ] Nginx reverse proxy
[ ] HTTPS
[ ] logi
[ ] healthcheck
[ ] restart po awarii
[ ] autostart po reboot
```

---

# 217. Checklist: coś nie działa

```text
1. node -v
2. npm -v
3. npm ci
4. npm run
5. npm test
6. npm run build
7. npm start
8. przeczytaj stack trace
9. sprawdź .env
10. sprawdź port
11. sprawdź logi
12. curl localhost
13. sprawdź Nginx
```

---

# 218. Najważniejsze komendy Node/npm

```bash
node -v
npm -v

npm install
npm ci

npm run
npm run dev
npm run build
npm test
npm start

npm outdated
npm audit

npm ls --depth=0

node --watch app.js
node --inspect app.js
node --test
```

---

# 219. Najważniejsze komendy deploymentowe

```bash
systemctl status myapp
systemctl restart myapp

journalctl -u myapp
journalctl -u myapp -f

ss -ltnp

curl http://127.0.0.1:3000

nginx -t
systemctl reload nginx
```

---

# 220. Najważniejsze pytania przy analizie projektu

Zadaj sobie:

```text
1. Gdzie jest entry point?
2. Jak uruchamia się development?
3. Jak robi się build?
4. Co trafia do dist?
5. Jak uruchamia się production?
6. Jakiej wersji Node potrzebuje projekt?
7. Jakiego package managera używa?
8. Jakich zmiennych środowiskowych potrzebuje?
9. Jakiej bazy używa?
10. Czy wymaga migracji?
11. Jak uruchamia się testy?
12. Na jakim porcie działa?
13. Czy jest Dockerfile?
14. Czy jest system healthcheck?
15. Gdzie są logi?
```

---

# 221. Przykład analizy fikcyjnego projektu

Załóżmy:

```text
promo-monitor/
├── package.json
├── package-lock.json
├── tsconfig.json
├── src/
│   ├── server.ts
│   ├── routes/
│   ├── services/
│   └── db/
├── tests/
├── .env.example
└── Dockerfile
```

`package.json`:

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "vitest"
  },
  "dependencies": {
    "express": "...",
    "pg": "...",
    "zod": "..."
  },
  "devDependencies": {
    "typescript": "...",
    "tsx": "...",
    "vitest": "..."
  }
}
```

Z samego tego można wywnioskować:

```text
- projekt jest w TypeScript,
- korzysta z ES Modules,
- development uruchamia tsx,
- produkcja działa z JavaScript z dist/,
- build wykonuje TypeScript compiler,
- backend używa Express,
- baza to PostgreSQL,
- Zod robi walidację,
- testy są w Vitest.
```

Workflow:

```bash
npm ci
npm test
npm run build
npm start
```

---

# 222. Przykład deploymentu tego projektu

```bash
cd /opt/promo-monitor

git pull

npm ci

npm test

npm run build

sudo systemctl restart promo-monitor

sudo systemctl status promo-monitor
```

Test:

```bash
curl -f http://127.0.0.1:3000/health
```

---

# 223. Node.js kontra Go — szybkie porównanie mentalne

Go:

```text
kod
 |
 v
kompilator
 |
 v
jeden binarny program
```

Node:

```text
kod JS
 |
 v
Node runtime
 |
 v
proces
```

TypeScript:

```text
kod TS
 |
 v
tsc
 |
 v
JavaScript
 |
 v
Node
```

Frontend:

```text
JS/TS/React
 |
 v
Vite
 |
 v
HTML/CSS/JS
 |
 v
Nginx / CDN
```

---

# 224. Node.js kontra JavaScript

JavaScript to język.

Node.js to środowisko uruchomieniowe JavaScript.

Tak samo jak:

```text
C -> język
gcc -> kompilator
```

w przybliżeniu:

```text
JavaScript -> język
Node.js -> runtime
```

---

# 225. Co musisz naprawdę zapamiętać

Jeżeli masz pamiętać tylko kilka rzeczy:

```text
package.json mówi, jak projekt działa.

npm ci instaluje zależności powtarzalnie.

npm run pokazuje dostępne skrypty.

npm run build buduje projekt, jeżeli build istnieje.

npm start uruchamia aplikację, ale zawsze sprawdź, co faktycznie robi.

Node nie zawsze oznacza backend.

Frontend może potrzebować Node tylko do builda.

Na produkcji używaj systemd albo Dockera.

Nginx powinien stać przed backendem.

.env zawiera konfigurację i sekrety.

Nie commituj sekretów.

Czytaj kod od entry pointu, potem routes -> controller -> service -> database.

Testy są często najlepszą dokumentacją zachowania systemu.

Nie zaczynaj analizy od node_modules.
```

---

# 226. Ściąga — analiza projektu w 5 minut

```bash
tree -L 2
```

```bash
cat package.json
```

```bash
cat README.md
```

```bash
cat .env.example
```

```bash
npm run
```

```bash
rg "process\.env"
```

```bash
rg "listen\("
```

```bash
find . -name package.json -not -path '*/node_modules/*'
```

```bash
npm ls --depth=0
```

Po tych poleceniach zwykle wiesz już bardzo dużo.

---

# 227. Ściąga — czytanie składni

```js
const x = 1;
```

stała.

```js
let x = 1;
```

zmienna.

```js
const x = {};
```

obiekt.

```js
const x = [];
```

tablica.

```js
const x = () => {};
```

funkcja.

```js
await foo();
```

czekaj na wynik operacji async.

```js
const { a, b } = object;
```

wyciągnij pola.

```js
const x = { ...a };
```

skopiuj pola obiektu.

```js
user?.email
```

bezpieczny dostęp.

```js
value ?? defaultValue
```

wartość domyślna dla null/undefined.

```js
import x from "module";
```

import.

```js
export x;
```

eksport.

---

# 228. Ściąga — deployment

```text
git pull
npm ci
npm test
npm run build
restart procesu
healthcheck
```

Systemd:

```bash
sudo systemctl restart myapp
sudo systemctl status myapp
journalctl -u myapp -f
```

Docker:

```bash
docker build -t myapp .
docker run -d --name myapp myapp
```

---

# 229. Co warto umieć później

Jeżeli będziesz chciał wejść poziom głębiej, warto poznać:

```text
TypeScript
Express albo Fastify
REST
WebSocket
PostgreSQL
Redis
Docker
Nginx
systemd
GitHub Actions
Vitest
ESLint
Zod
Prisma lub Drizzle
```

Ale do **czytania, uruchamiania i deployowania** większości projektów Node nie musisz być ekspertem w żadnym z nich.

---

# 230. Ostateczny model mentalny

Node.js projekt można sprowadzić do kilku pytań:

```text
Jaki kod?
↓
src/

Jakie zależności?
↓
package.json

Jakie dokładne wersje?
↓
package-lock.json

Jak uruchomić development?
↓
npm run dev

Jak zbudować?
↓
npm run build

Co jest wynikiem?
↓
dist/ albo build/

Jak uruchomić production?
↓
npm start / node dist/...

Jak skonfigurować?
↓
.env / process.env

Jak sprawdzić działanie?
↓
npm test / curl / healthcheck

Jak utrzymać proces?
↓
systemd / Docker

Jak wystawić internetowo?
↓
Nginx + HTTPS
```

Jeżeli potrafisz odpowiedzieć na te pytania, **rozumiesz operacyjnie projekt Node.js**, nawet jeżeli nie zamierzasz zawodowo pisać w nim kodu.
