---
id: "doc-021"
title: "JavaScript — kompendium"
slug: "javascript-kompendium"
description: "Praktyczne kompendium do tworzenia zwykłych, interaktywnych stron i małych aplikacji webowych."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "js"
  - "javascript"
  - "frontend"
---

# JavaScript — kompendium

JavaScript jest językiem przeglądarki i jednocześnie podstawą dużej części współczesnego webowego toolingu. Warto najpierw rozumieć język, DOM, zdarzenia, fetch i moduły, a frameworki traktować jako kolejną warstwę.

Kompendium obejmuje vanilla JS, Node/npm/Vite oraz orientacyjny przegląd React, Vue, Angular, PixiJS i TypeScript.

Powiązane tematy: [Nowoczesny HTML i CSS](techhandbook:doc-042), [Browser DevTools](techhandbook:doc-046), [API i integracje systemów](techhandbook:doc-008), [Node.js](techhandbook:doc-022) i [Testowanie oprogramowania](techhandbook:doc-049).

> Praktyczne kompendium do tworzenia zwykłych, interaktywnych stron i małych aplikacji webowych.  
---

# Spis treści

1. Co właściwie robi JavaScript
2. Jak osadzić JavaScript na stronie
3. Pierwszy skrypt
4. Zmienne, typy i operatory
5. Warunki i pętle
6. Funkcje
7. Tablice i obiekty
8. Destrukturyzacja, spread i rest
9. DOM — sterowanie stroną
10. Zdarzenia
11. Formularze
12. Tworzenie i usuwanie elementów
13. Klasy CSS i style z JavaScriptu
14. Timery
15. JSON
16. Fetch i komunikacja z API
17. Promise i async/await
18. Obsługa błędów
19. localStorage i sessionStorage
20. Moduły ES
21. Klasy i programowanie obiektowe
22. Przydatne metody tablic
23. Event loop — dlaczego async działa tak, jak działa
24. Nowoczesne środowisko: Node.js, npm i Vite
25. package.json i zależności
26. DevTools i debugowanie
27. Struktura małego projektu
28. Przykład kompletnej aplikacji Vanilla JS
29. React
30. Vue
31. Angular
32. PixiJS
33. TypeScript
34. Testy
35. Bezpieczeństwo
36. Dostępność
37. Wydajność
38. Czego nie robić
39. Jak wybrać technologię
40. Plan nauki
41. Projekty ćwiczeniowe
42. Ściąga
43. Oficjalne źródła

---

# 1. Co właściwie robi JavaScript

HTML opisuje **strukturę** strony.

CSS opisuje **wygląd**.

JavaScript opisuje **zachowanie**.

Przykładowo:

- kliknięcie przycisku,
- rozwinięcie menu,
- walidacja formularza,
- pobranie danych z API,
- filtrowanie listy produktów,
- dynamiczne dodawanie elementów,
- modal,
- slider,
- licznik,
- zapis ustawień użytkownika,
- komunikacja z backendem,
- renderowanie grafiki 2D,
- obsługa części interfejsu bez przeładowania strony.

JavaScript wykonywany w przeglądarce ma dostęp m.in. do:

```text
window
document
location
history
navigator
localStorage
fetch()
setTimeout()
```

Najważniejszy z punktu widzenia zwykłej strony jest `document`, czyli obiekt reprezentujący dokument HTML.

---

# 2. Jak osadzić JavaScript na stronie

Są trzy podstawowe sposoby.

## 2.1. Kod bezpośrednio w HTML

```html
<script>
  console.log("Cześć");
</script>
```

Dobre do szybkiego testu.

W prawdziwym projekcie zwykle lepiej trzymać JS osobno.

---

## 2.2. Zewnętrzny plik JavaScript

`index.html`:

```html
<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <title>Moja strona</title>
</head>
<body>

  <h1>Test</h1>

  <script src="script.js"></script>
</body>
</html>
```

`script.js`:

```js
console.log("JavaScript działa");
```

Jeśli `<script>` znajduje się na końcu `<body>`, DOM jest już zwykle zbudowany.

---

## 2.3. Nowoczesny sposób: moduł

```html
<script type="module" src="./src/main.js"></script>
```

To jest obecnie bardzo dobry domyślny wybór.

Moduły:

- obsługują `import` i `export`,
- mają własny zakres zmiennych,
- działają automatycznie w trybie strict,
- są wykonywane po sparsowaniu HTML.

Przykład:

```js
import { add } from "./math.js";

console.log(add(2, 3));
```

`math.js`:

```js
export function add(a, b) {
  return a + b;
}
```

---

# 3. `async`, `defer` i `type="module"`

Klasyczny skrypt:

```html
<script src="app.js"></script>
```

może zatrzymać parsowanie HTML, dopóki nie zostanie pobrany i wykonany.

## `defer`

```html
<script defer src="app.js"></script>
```

Skrypt pobiera się równolegle, ale uruchamia po sparsowaniu dokumentu.

Dobre dla klasycznych skryptów zależnych od DOM.

## `async`

```html
<script async src="analytics.js"></script>
```

Skrypt uruchomi się natychmiast po pobraniu.

Kolejność nie jest gwarantowana.

Dobre np. dla niezależnych skryptów analitycznych.

## `type="module"`

```html
<script type="module" src="main.js"></script>
```

W praktyce zachowuje się pod względem parsowania strony podobnie do `defer`.

Dla nowoczesnego projektu:

```html
<script type="module" src="/src/main.js"></script>
```

jest sensownym standardem.

---

# 4. Pierwszy skrypt

HTML:

```html
<button id="helloButton">Kliknij mnie</button>
<p id="message"></p>

<script type="module" src="./main.js"></script>
```

JS:

```js
const button = document.querySelector("#helloButton");
const message = document.querySelector("#message");

button.addEventListener("click", () => {
  message.textContent = "Działa!";
});
```

Co się stało:

1. znajdujemy przycisk,
2. znajdujemy paragraf,
3. nasłuchujemy kliknięcia,
4. po kliknięciu zmieniamy tekst.

To jest esencja interaktywnego front-endu.

---

# 5. Zmienne

Współczesny JavaScript używa głównie:

```js
const
let
```

## `const`

```js
const name = "Anna";
```

Nie można przypisać do tej zmiennej nowej wartości:

```js
name = "Adam"; // błąd
```

## `let`

```js
let counter = 0;

counter = counter + 1;
```

## `var`

Istnieje ze względów historycznych.

```js
var oldStyle = true;
```

W nowym kodzie najczęściej go unikamy.

Praktyczna zasada:

```text
Najpierw używaj const.
Jeśli wartość musi się zmieniać — użyj let.
```

---

# 6. Typy danych

## String

```js
const name = "Anna";
```

## Number

```js
const age = 46;
const price = 19.99;
```

JavaScript nie ma osobnego typu integer i float.

## Boolean

```js
const loggedIn = true;
const admin = false;
```

## null

Celowy brak wartości:

```js
const selectedUser = null;
```

## undefined

Wartość nie została ustawiona:

```js
let result;

console.log(result);
```

## Object

```js
const user = {
  name: "Anna",
  age: 46
};
```

## Array

```js
const technologies = ["HTML", "CSS", "JavaScript"];
```

## BigInt

```js
const hugeNumber = 12345678901234567890n;
```

## Symbol

Rzadziej używany:

```js
const id = Symbol("id");
```

---

# 7. Sprawdzanie typu

```js
typeof "abc";       // "string"
typeof 123;         // "number"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof {};          // "object"
typeof [];          // "object"
```

Tablicę sprawdzamy:

```js
Array.isArray([]);
```

---

# 8. Operatory

Arytmetyczne:

```js
2 + 2
10 - 3
4 * 5
10 / 2
10 % 3
2 ** 8
```

Porównania:

```js
5 > 3
5 >= 5
2 < 4
2 <= 2
```

Równość:

```js
5 === 5
5 !== 4
```

Unikaj, jeśli nie masz powodu:

```js
==
!=
```

ponieważ wykonują konwersję typów.

Przykład:

```js
5 == "5";   // true
5 === "5";  // false
```

Standardowo używaj:

```js
===
!==
```

---

# 9. Operatory logiczne

```js
&&
||
!
```

Przykład:

```js
if (loggedIn && admin) {
  console.log("Panel administratora");
}
```

---

# 10. Nullish coalescing `??`

```js
const displayName = user.name ?? "Anonim";
```

Wartość po prawej zostanie użyta tylko dla:

```text
null
undefined
```

To różni się od `||`.

```js
const value = 0 || 100;
// 100

const value2 = 0 ?? 100;
// 0
```

---

# 11. Optional chaining `?.`

Zamiast:

```js
if (user && user.address && user.address.city) {
  console.log(user.address.city);
}
```

możesz:

```js
console.log(user?.address?.city);
```

Jeśli któregoś elementu nie ma, otrzymasz `undefined`, zamiast wyjątku.

---

# 12. Template strings

Zamiast:

```js
const message = "Witaj " + name + "!";
```

używamy:

```js
const message = `Witaj ${name}!`;
```

Wielolinijkowo:

```js
const html = `
  <article>
    <h2>${title}</h2>
    <p>${description}</p>
  </article>
`;
```

---

# 13. Warunki

```js
if (age >= 18) {
  console.log("Dorosły");
} else {
  console.log("Niepełnoletni");
}
```

Kilka warunków:

```js
if (score >= 90) {
  grade = 5;
} else if (score >= 75) {
  grade = 4;
} else {
  grade = 3;
}
```

---

# 14. Operator trójargumentowy

```js
const label = loggedIn ? "Wyloguj" : "Zaloguj";
```

Dobrze nadaje się do prostych warunków.

Nie buduj z niego wielopiętrowej logiki.

---

# 15. `switch`

```js
switch (status) {
  case "loading":
    console.log("Ładowanie");
    break;

  case "success":
    console.log("Gotowe");
    break;

  case "error":
    console.log("Błąd");
    break;

  default:
    console.log("Nieznany status");
}
```

---

# 16. Pętle

## `for`

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

## `for...of`

Najlepszy do iterowania po elementach:

```js
const names = ["Ala", "Ola", "Jan"];

for (const name of names) {
  console.log(name);
}
```

## `forEach`

```js
names.forEach((name) => {
  console.log(name);
});
```

## `while`

```js
let i = 0;

while (i < 5) {
  console.log(i);
  i++;
}
```

---

# 17. Funkcje

## Klasyczna funkcja

```js
function add(a, b) {
  return a + b;
}
```

Wywołanie:

```js
const result = add(2, 3);
```

---

# 18. Funkcja strzałkowa

```js
const add = (a, b) => {
  return a + b;
};
```

Skrót:

```js
const add = (a, b) => a + b;
```

Jedna wartość:

```js
const double = x => x * 2;
```

Funkcje strzałkowe są bardzo częste w:

- event listenerach,
- `map`,
- `filter`,
- Promise,
- React,
- Vue,
- callbackach.

---

# 19. Parametry domyślne

```js
function greet(name = "Gość") {
  return `Cześć ${name}`;
}
```

---

# 20. Obiekty

```js
const user = {
  name: "Anna",
  age: 46,
  active: true
};
```

Dostęp:

```js
user.name
user.age
```

lub:

```js
user["name"]
```

Zmiana:

```js
user.active = false;
```

Dodanie:

```js
user.city = "Example City";
```

---

# 21. Metody obiektu

```js
const user = {
  name: "Anna",

  greet() {
    console.log(`Cześć, jestem ${this.name}`);
  }
};

user.greet();
```

---

# 22. Tablice

```js
const items = ["monitor", "laptop", "mysz"];
```

Dostęp:

```js
items[0];
```

Liczba elementów:

```js
items.length;
```

Dodawanie:

```js
items.push("klawiatura");
```

Usuwanie ostatniego:

```js
items.pop();
```

Początek tablicy:

```js
items.unshift("telefon");
items.shift();
```

---

# 23. Destrukturyzacja

Obiekt:

```js
const user = {
  name: "Anna",
  age: 46
};

const { name, age } = user;
```

Tablica:

```js
const coordinates = [51.1, 17.03];

const [lat, lon] = coordinates;
```

---

# 24. Spread `...`

Tablice:

```js
const oldItems = ["a", "b"];
const newItems = [...oldItems, "c"];
```

Obiekty:

```js
const user = {
  name: "Anna",
  active: true
};

const updatedUser = {
  ...user,
  active: false
};
```

Bardzo ważne w React i przy niemutowalnym aktualizowaniu danych.

---

# 25. Rest `...`

```js
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3, 4);
```

---

# 26. DOM

DOM to obiektowa reprezentacja dokumentu HTML.

HTML:

```html
<h1 id="title">Stary tytuł</h1>
```

JS:

```js
const title = document.querySelector("#title");

title.textContent = "Nowy tytuł";
```

---

# 27. Wyszukiwanie elementów

Najczęściej:

```js
document.querySelector()
document.querySelectorAll()
```

ID:

```js
document.querySelector("#menu");
```

Klasa:

```js
document.querySelector(".card");
```

Tag:

```js
document.querySelector("button");
```

Atrybut:

```js
document.querySelector("[data-action='save']");
```

Wszystkie:

```js
const cards = document.querySelectorAll(".card");
```

---

# 28. `querySelectorAll` i iteracja

```js
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  console.log(button.textContent);
});
```

---

# 29. Zmiana treści

```js
element.textContent = "Bezpieczny tekst";
```

Można też:

```js
element.innerHTML = "<strong>Hello</strong>";
```

Ale `innerHTML` wymaga ostrożności.

Nie wkładaj tam bezpośrednio danych pochodzących od użytkownika lub niezaufanego API.

To może prowadzić do XSS.

---

# 30. Atrybuty

HTML:

```html
<img id="photo" src="old.jpg" alt="">
```

JS:

```js
const photo = document.querySelector("#photo");

photo.src = "new.jpg";
photo.alt = "Nowe zdjęcie";
```

Ogólnie:

```js
element.getAttribute("data-id");
element.setAttribute("aria-expanded", "true");
element.removeAttribute("hidden");
```

---

# 31. `dataset`

HTML:

```html
<button data-product-id="123">Kup</button>
```

JS:

```js
const button = document.querySelector("button");

console.log(button.dataset.productId);
```

wynik:

```text
123
```

---

# 32. Zdarzenia

Podstawowy mechanizm interakcji:

```js
button.addEventListener("click", () => {
  console.log("Klik");
});
```

Popularne wydarzenia:

```text
click
dblclick
input
change
submit
keydown
keyup
focus
blur
mouseenter
mouseleave
pointerdown
pointerup
scroll
resize
DOMContentLoaded
```

---

# 33. Obiekt `event`

```js
button.addEventListener("click", (event) => {
  console.log(event);
  console.log(event.target);
});
```

Dla klawiatury:

```js
document.addEventListener("keydown", (event) => {
  console.log(event.key);
});
```

---

# 34. Formularze

HTML:

```html
<form id="loginForm">
  <input id="email" type="email">
  <button type="submit">Wyślij</button>
</form>
```

JS:

```js
const form = document.querySelector("#loginForm");
const emailInput = document.querySelector("#email");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  console.log(emailInput.value);
});
```

`event.preventDefault()` blokuje standardową akcję przeglądarki, np. przeładowanie formularza.

---

# 35. FormData

Dla większych formularzy:

```html
<form id="userForm">
  <input name="name">
  <input name="email">
  <button>Zapisz</button>
</form>
```

```js
const form = document.querySelector("#userForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const data = Object.fromEntries(formData.entries());

  console.log(data);
});
```

---

# 36. Tworzenie elementów

```js
const li = document.createElement("li");

li.textContent = "Nowy element";

document.querySelector("ul").append(li);
```

---

# 37. Usuwanie elementów

```js
element.remove();
```

---

# 38. Klonowanie

```js
const copy = element.cloneNode(true);
```

`true` oznacza kopiowanie również dzieci elementu.

---

# 39. Klasy CSS

Dodanie:

```js
element.classList.add("active");
```

Usunięcie:

```js
element.classList.remove("active");
```

Przełączenie:

```js
element.classList.toggle("active");
```

Sprawdzenie:

```js
element.classList.contains("active");
```

To jest zwykle lepsze niż ustawianie stylów bezpośrednio.

---

# 40. Style bezpośrednio

Możliwe:

```js
element.style.display = "none";
element.style.opacity = "0.5";
```

Ale zazwyczaj lepiej:

```js
element.classList.add("hidden");
```

i w CSS:

```css
.hidden {
  display: none;
}
```

Logika jest w JS, wygląd w CSS.

---

# 41. Event delegation

Załóżmy listę:

```html
<ul id="list">
  <li><button data-id="1">Usuń</button></li>
  <li><button data-id="2">Usuń</button></li>
</ul>
```

Zamiast dodawać listener do każdego przycisku:

```js
const list = document.querySelector("#list");

list.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");

  if (!button) {
    return;
  }

  console.log(button.dataset.id);
});
```

To jest bardzo użyteczny wzorzec przy dynamicznych listach.

---

# 42. Timery

## `setTimeout`

```js
setTimeout(() => {
  console.log("Minęła sekunda");
}, 1000);
```

## `setInterval`

```js
const timer = setInterval(() => {
  console.log("Tick");
}, 1000);
```

Zatrzymanie:

```js
clearInterval(timer);
```

---

# 43. JSON

JSON:

```json
{
  "name": "Anna",
  "active": true
}
```

JavaScript -> JSON:

```js
const json = JSON.stringify(user);
```

JSON -> JavaScript:

```js
const user = JSON.parse(json);
```

---

# 44. Fetch API

Najważniejsze narzędzie do komunikacji HTTP w przeglądarce.

```js
fetch("/api/products");
```

zwraca Promise.

Praktycznie używamy zwykle `async/await`.

---

# 45. Pobieranie danych z API

```js
async function loadUsers() {
  const response = await fetch("https://example.com/api/users");

  const users = await response.json();

  console.log(users);
}
```

Ale trzeba sprawdzić status odpowiedzi.

```js
async function loadUsers() {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}
```

---

# 46. POST

```js
async function createUser(user) {
  const response = await fetch("/api/users", {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(user)
  });

  if (!response.ok) {
    throw new Error("Nie udało się zapisać użytkownika");
  }

  return response.json();
}
```

Wywołanie:

```js
createUser({
  name: "Anna",
  active: true
});
```

---

# 47. Promise

Promise reprezentuje operację, która zakończy się później.

Może mieć stan:

```text
pending
fulfilled
rejected
```

Przykład:

```js
fetch("/api/users")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
```

Ten sam kod w `async/await` jest zwykle czytelniejszy.

---

# 48. async/await

```js
async function loadData() {
  const response = await fetch("/api/data");
  const data = await response.json();

  console.log(data);
}
```

`await` można stosować wewnątrz funkcji `async`.

---

# 49. Obsługa błędów

```js
async function loadData() {
  try {
    const response = await fetch("/api/data");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Błąd:", error);

    throw error;
  }
}
```

---

# 50. Stan interfejsu podczas pobierania

Typowy schemat:

```js
async function loadProducts() {
  status.textContent = "Ładowanie...";

  try {
    const response = await fetch("/api/products");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const products = await response.json();

    renderProducts(products);

    status.textContent = "";
  } catch (error) {
    status.textContent = "Nie udało się pobrać danych.";
  }
}
```

W prawdziwym UI zawsze myśl o trzech stanach:

```text
loading
success
error
```

---

# 51. localStorage

Dane przechowywane w przeglądarce.

Zapis:

```js
localStorage.setItem("theme", "dark");
```

Odczyt:

```js
const theme = localStorage.getItem("theme");
```

Usuwanie:

```js
localStorage.removeItem("theme");
```

Czyszczenie:

```js
localStorage.clear();
```

---

# 52. Zapisywanie obiektu

```js
const settings = {
  theme: "dark",
  compact: true
};

localStorage.setItem(
  "settings",
  JSON.stringify(settings)
);
```

Odczyt:

```js
const settings = JSON.parse(
  localStorage.getItem("settings") ?? "{}"
);
```

Nie zapisuj w localStorage:

- haseł,
- kluczy API,
- sekretów backendowych,
- danych, których kradzież byłaby poważnym problemem.

---

# 53. sessionStorage

API podobne:

```js
sessionStorage.setItem("tab", "products");
```

Dane istnieją tylko dla danej sesji karty/przeglądarki.

---

# 54. Moduły

`math.js`:

```js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

`main.js`:

```js
import { add, subtract } from "./math.js";

console.log(add(2, 3));
```

---

# 55. Default export

```js
export default function render() {
  console.log("Render");
}
```

Import:

```js
import render from "./render.js";
```

---

# 56. Sensowna organizacja modułów

```text
src/
├── main.js
├── api/
│   └── products.js
├── components/
│   ├── modal.js
│   └── product-card.js
├── utils/
│   ├── format-price.js
│   └── debounce.js
└── state/
    └── store.js
```

Nie rób od razu architektury korporacyjnej.

Dziel kod wtedy, gdy:

- plik zaczyna być nieczytelny,
- dana funkcja ma osobną odpowiedzialność,
- coś chcesz użyć w kilku miejscach.

---

# 57. Klasy

JavaScript obsługuje klasy:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Cześć ${this.name}`);
  }
}

const user = new User("Anna");

user.greet();
```

Dziedziczenie:

```js
class Admin extends User {
  deleteUser() {
    console.log("Usuwam użytkownika");
  }
}
```

W codziennym froncie często pracuje się jednak równie dobrze lub lepiej z:

- funkcjami,
- modułami,
- prostymi obiektami,
- kompozycją.

Nie musisz budować wszystkiego jako klasy.

---

# 58. Najważniejsze metody tablic

Załóżmy:

```js
const products = [
  { id: 1, name: "Laptop", price: 5000 },
  { id: 2, name: "Monitor", price: 1500 },
  { id: 3, name: "Mysz", price: 200 }
];
```

## `map`

Tworzy nową tablicę:

```js
const names = products.map(product => product.name);
```

## `filter`

```js
const cheap = products.filter(product => product.price < 2000);
```

## `find`

```js
const monitor = products.find(product => product.id === 2);
```

## `some`

```js
const hasExpensive = products.some(product => product.price > 4000);
```

## `every`

```js
const allPositive = products.every(product => product.price > 0);
```

## `reduce`

```js
const total = products.reduce(
  (sum, product) => sum + product.price,
  0
);
```

## `sort`

Uwaga: `sort()` mutuje tablicę.

```js
products.sort((a, b) => a.price - b.price);
```

Jeśli nie chcesz mutować:

```js
const sorted = [...products].sort(
  (a, b) => a.price - b.price
);
```

---

# 59. Mutacja i niemutowalność

Mutacja:

```js
user.name = "Adam";
```

Niemutowalne utworzenie nowego obiektu:

```js
const updatedUser = {
  ...user,
  name: "Adam"
};
```

W zwykłym JavaScript obie techniki są legalne.

W React niemutowalne aktualizacje stanu są bardzo ważne.

---

# 60. Event loop — podstawy

JavaScript w przeglądarce wykonuje kod zasadniczo na jednym głównym wątku.

Przykład:

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

Wynik:

```text
A
C
B
```

Dlaczego?

`setTimeout` nie wykonuje callbacku natychmiast.

Callback trafia do kolejki i zostaje wykonany dopiero, gdy bieżący stos wywołań jest pusty.

---

# 61. Promise a timer

```js
console.log("A");

Promise.resolve().then(() => {
  console.log("Promise");
});

setTimeout(() => {
  console.log("Timer");
}, 0);

console.log("B");
```

Typowy wynik:

```text
A
B
Promise
Timer
```

Callbacki Promise trafiają do kolejki mikro-zadań, która ma wyższy priorytet niż timer.

Nie musisz znać całej specyfikacji event loop, ale warto rozumieć, że:

```text
async !== osobny magiczny wątek
```

---

# 62. Node.js

Node.js pozwala wykonywać JavaScript poza przeglądarką.

W nowoczesnym froncie jest potrzebny głównie do:

- uruchamiania npm,
- Vite,
- bundlerów,
- frameworków,
- narzędzi developerskich,
- testów,
- buildów.

Nie oznacza to automatycznie, że backend musi być napisany w Node.

Możesz mieć:

```text
frontend: JavaScript / React / Vue
backend: Go
```

i jest to absolutnie normalne.

---

# 63. Środowisko — stan na 2026

Na moment przygotowania tego kompendium bezpiecznym wyborem do pracy developerskiej jest:

```text
Node.js 24 LTS
npm
Vite
```

Sprawdzenie:

```bash
node --version
npm --version
```

Node 24 jest obecnie linią LTS.

Nie ma potrzeby używania najnowszego Node „Current”, jeśli nie potrzebujesz nowych funkcji.

---

# 64. npm

npm to menedżer pakietów.

Inicjalizacja projektu:

```bash
npm init
```

Szybciej:

```bash
npm init -y
```

Instalacja biblioteki:

```bash
npm install axios
```

Zależność developerska:

```bash
npm install --save-dev eslint
```

Usunięcie:

```bash
npm uninstall axios
```

Aktualizacja:

```bash
npm update
```

---

# 65. Vite

Dla zwykłego projektu Vanilla JS:

```bash
npm create vite@latest
```

W kreatorze wybierz:

```text
Vanilla
JavaScript
```

Potem:

```bash
cd projekt
npm install
npm run dev
```

Vite uruchomi lokalny serwer developerski.

Build produkcyjny:

```bash
npm run build
```

Zwykle wynik trafi do:

```text
dist/
```

Podgląd buildu:

```bash
npm run preview
```

---

# 66. Vite bez kreatora

Możesz utworzyć projekt bez pytań:

```bash
npm create vite@latest my-app -- --template vanilla
```

React:

```bash
npm create vite@latest my-react-app -- --template react
```

Vue:

```bash
npm create vite@latest my-vue-app -- --template vue
```

---

# 67. Typowa struktura Vite

```text
my-app/
├── index.html
├── package.json
├── package-lock.json
├── node_modules/
├── public/
└── src/
    ├── main.js
    └── style.css
```

`node_modules`:

- może być duży,
- nie wrzucamy go do Git.

`.gitignore`:

```gitignore
node_modules/
dist/
.env
.env.*
```

---

# 68. package.json

Przykład:

```json
{
  "name": "my-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^7.0.0"
  }
}
```

Najważniejsze sekcje:

```text
scripts
dependencies
devDependencies
```

Uruchomienie skryptu:

```bash
npm run dev
npm run build
```

---

# 69. dependencies vs devDependencies

## `dependencies`

Biblioteki potrzebne aplikacji.

Przykład:

```text
react
vue
pixi.js
```

## `devDependencies`

Narzędzia potrzebne głównie podczas developmentu.

Przykład:

```text
vite
eslint
prettier
vitest
```

W nowoczesnych buildach granica nie zawsze oznacza „czy kod trafi do przeglądarki”, ale semantycznie taki podział nadal jest użyteczny.

---

# 70. Import biblioteki z npm

Instalacja:

```bash
npm install lodash-es
```

Kod:

```js
import { debounce } from "lodash-es";
```

To właśnie bundler/dev server rozwiązuje import po nazwie pakietu.

Bez bundlera przeglądarka nie wie automatycznie, gdzie znajduje się:

```js
"lodash-es"
```

---

# 71. DevTools

W Chrome/Edge/Firefox otwórz narzędzia developerskie.

Najważniejsze zakładki:

```text
Elements
Console
Sources
Network
Application
Performance
```

---

# 72. Console

```js
console.log(value);
console.warn(value);
console.error(value);
console.table(array);
```

`console.table` jest bardzo wygodne dla tablic obiektów:

```js
console.table(products);
```

---

# 73. Breakpoint

Zamiast miliona `console.log` możesz zatrzymać program.

W DevTools -> Sources kliknij numer linii.

Albo wpisz:

```js
debugger;
```

Przeglądarka zatrzyma wykonanie, jeśli DevTools są otwarte.

---

# 74. Network

Zakładka Network pokazuje:

- requesty HTTP,
- odpowiedzi,
- statusy,
- nagłówki,
- payload,
- czas,
- CORS,
- błędy ładowania.

Jeśli `fetch()` „nie działa”, Network jest jednym z pierwszych miejsc do sprawdzenia.

---

# 75. Application

Przydatna do:

- localStorage,
- sessionStorage,
- cookies,
- cache,
- service workers.

---

# 76. Struktura małego projektu Vanilla JS

Przykład:

```text
promo-auditor/
├── index.html
├── package.json
├── public/
└── src/
    ├── main.js
    ├── style.css
    ├── api.js
    ├── render.js
    └── utils.js
```

`main.js`:

```js
import { loadPromotions } from "./api.js";
import { renderPromotions } from "./render.js";

async function init() {
  const promotions = await loadPromotions();

  renderPromotions(promotions);
}

init();
```

`api.js`:

```js
export async function loadPromotions() {
  const response = await fetch("/api/promotions");

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}
```

`render.js`:

```js
export function renderPromotions(promotions) {
  const list = document.querySelector("#promotions");

  list.replaceChildren();

  for (const promo of promotions) {
    const item = document.createElement("li");

    item.textContent = promo.title;

    list.append(item);
  }
}
```

To już jest pełnoprawna mała aplikacja.

---

# 77. Kompletny przykład Vanilla JS — lista zadań

## HTML

```html
<!doctype html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>Todo</title>

  <link rel="stylesheet" href="/src/style.css">
</head>

<body>

  <main>
    <h1>Todo</h1>

    <form id="todoForm">
      <input
        id="todoInput"
        name="title"
        placeholder="Nowe zadanie"
        required
      >

      <button>Dodaj</button>
    </form>

    <ul id="todoList"></ul>
  </main>

  <script type="module" src="/src/main.js"></script>

</body>
</html>
```

## JavaScript

```js
const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");

let todos = loadTodos();

function loadTodos() {
  return JSON.parse(
    localStorage.getItem("todos") ?? "[]"
  );
}

function saveTodos() {
  localStorage.setItem(
    "todos",
    JSON.stringify(todos)
  );
}

function addTodo(title) {
  todos.push({
    id: crypto.randomUUID(),
    title,
    done: false
  });

  saveTodos();
  render();
}

function toggleTodo(id) {
  todos = todos.map(todo => {
    if (todo.id !== id) {
      return todo;
    }

    return {
      ...todo,
      done: !todo.done
    };
  });

  saveTodos();
  render();
}

function removeTodo(id) {
  todos = todos.filter(
    todo => todo.id !== id
  );

  saveTodos();
  render();
}

function render() {
  list.replaceChildren();

  for (const todo of todos) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    checkbox.addEventListener("change", () => {
      toggleTodo(todo.id);
    });

    const text = document.createElement("span");

    text.textContent = todo.title;

    if (todo.done) {
      text.classList.add("done");
    }

    const removeButton =
      document.createElement("button");

    removeButton.textContent = "Usuń";

    removeButton.addEventListener("click", () => {
      removeTodo(todo.id);
    });

    li.append(
      checkbox,
      text,
      removeButton
    );

    list.append(li);
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const title = input.value.trim();

  if (!title) {
    return;
  }

  addTodo(title);

  form.reset();
  input.focus();
});

render();
```

To ćwiczenie wykorzystuje:

- DOM,
- eventy,
- formularz,
- tablice,
- obiekty,
- `map`,
- `filter`,
- localStorage,
- renderowanie UI,
- stan aplikacji.

Jeżeli rozumiesz ten przykład, masz już praktyczne podstawy front-endowego JavaScriptu.

---

# 78. Kiedy Vanilla JS wystarcza

Vanilla JS jest bardzo dobry dla:

- prostych stron firmowych,
- landing pages,
- kalkulatorów,
- formularzy,
- małych paneli,
- widgetów,
- modalów,
- galerii,
- wyszukiwarek,
- filtrów,
- integracji z backendem Go,
- wewnętrznych narzędzi,
- prostych dashboardów.

Nie zaczynaj automatycznie od Reacta.

Jeżeli aplikacja ma:

```text
3 przyciski
formularz
modal
fetch
listę wyników
```

to Vanilla JS może być wszystkim, czego potrzebujesz.

---

# 79. Po co framework

Problem pojawia się, gdy UI składa się z wielu zależnych elementów.

Przykład:

```text
filtry
sortowanie
paginated list
modal
koszyk
liczniki
routing
formularze
komponenty
wiele ekranów
stan użytkownika
```

Wtedy ręczne:

```js
querySelector(...)
element.textContent = ...
element.classList...
```

zaczyna być trudniejsze do utrzymania.

Framework pozwala opisywać:

```text
jak UI ma wyglądać dla danego stanu
```

zamiast ręcznie sterować każdą zmianą DOM.

---

# 80. React — czym jest

React jest biblioteką do budowania interfejsów z komponentów.

Komponent:

```jsx
function Hello() {
  return <h1>Cześć</h1>;
}
```

React wykorzystuje JSX.

JSX wygląda jak HTML, ale jest składnią JavaScriptu.

---

# 81. Utworzenie projektu React + Vite

Do nauki klientowego Reacta bardzo wygodny jest Vite:

```bash
npm create vite@latest my-react-app -- --template react
```

Potem:

```bash
cd my-react-app
npm install
npm run dev
```

Create React App jest rozwiązaniem historycznym i nie powinien być bazą nowego kursu.

---

# 82. Podstawowa struktura React

```text
src/
├── App.jsx
├── main.jsx
└── index.css
```

`main.jsx`:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

# 83. Komponent React

```jsx
function ProductCard() {
  return (
    <article>
      <h2>Laptop</h2>
      <p>5000 zł</p>
    </article>
  );
}

export default ProductCard;
```

---

# 84. Props

```jsx
function ProductCard({ name, price }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{price} zł</p>
    </article>
  );
}
```

Użycie:

```jsx
<ProductCard
  name="Monitor"
  price={1500}
/>
```

Props to dane przekazane z komponentu rodzica.

---

# 85. State — `useState`

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
    >
      Kliknięcia: {count}
    </button>
  );
}
```

Nie robisz:

```js
count++;
```

Stan aktualizujesz przez setter:

```js
setCount(...)
```

---

# 86. Renderowanie warunkowe

```jsx
function Account({ loggedIn }) {
  if (!loggedIn) {
    return <p>Zaloguj się</p>;
  }

  return <p>Witaj!</p>;
}
```

Lub:

```jsx
{loggedIn ? <Dashboard /> : <Login />}
```

---

# 87. Listy w React

```jsx
const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Monitor" }
];

function ProductList() {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
        </li>
      ))}
    </ul>
  );
}
```

`key` powinien być stabilnym identyfikatorem.

---

# 88. Formularz React

```jsx
import { useState } from "react";

function Search() {
  const [query, setQuery] = useState("");

  function submit(event) {
    event.preventDefault();

    console.log(query);
  }

  return (
    <form onSubmit={submit}>
      <input
        value={query}
        onChange={event =>
          setQuery(event.target.value)
        }
      />

      <button>Szukaj</button>
    </form>
  );
}
```

---

# 89. `useEffect`

Przykład:

```jsx
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const response =
        await fetch("/api/products");

      const data = await response.json();

      setProducts(data);
    }

    load();
  }, []);

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
        </li>
      ))}
    </ul>
  );
}
```

Nie traktuj `useEffect` jako miejsca na dowolny kod.

Używamy go głównie do synchronizacji komponentu ze światem zewnętrznym:

- request,
- timer,
- event listener,
- API przeglądarki,
- biblioteka zewnętrzna.

---

# 90. React — kiedy

Dobry wybór, jeśli:

- aplikacja jest mocno komponentowa,
- UI ma sporo stanu,
- chcesz duży ekosystem,
- zależy Ci na znajomości bardzo popularnej technologii,
- aplikacja może się rozrosnąć.

Dla zwykłej strony firmowej React często nie jest konieczny.

---

# 91. Vue — czym jest

Vue jest frameworkiem do budowy interfejsów.

Jest często bardziej zbliżony składniowo do klasycznego HTML niż React.

Typowy komponent `.vue`:

```vue
<script setup>
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <button @click="count++">
    Kliknięcia: {{ count }}
  </button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

---

# 92. Utworzenie Vue

Oficjalny generator:

```bash
npm create vue@latest
```

Potem:

```bash
cd nazwa-projektu
npm install
npm run dev
```

Vue wykorzystuje obecnie bardzo naturalnie:

```text
Composition API
<script setup>
Single File Components
Vite
```

---

# 93. `ref`

```vue
<script setup>
import { ref } from "vue";

const name = ref("Anna");

function changeName() {
  name.value = "Adam";
}
</script>

<template>
  <p>{{ name }}</p>

  <button @click="changeName">
    Zmień
  </button>
</template>
```

W `<script>`:

```js
name.value
```

W template:

```text
{{ name }}
```

Vue automatycznie rozpakowuje `ref`.

---

# 94. `computed`

```vue
<script setup>
import { computed, ref } from "vue";

const firstName = ref("Anna");
const lastName = ref("Kowalski");

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`;
});
</script>

<template>
  <p>{{ fullName }}</p>
</template>
```

---

# 95. Warunki Vue

```vue
<p v-if="loggedIn">
  Witaj
</p>

<p v-else>
  Zaloguj się
</p>
```

---

# 96. Pętle Vue

```vue
<ul>
  <li
    v-for="product in products"
    :key="product.id"
  >
    {{ product.name }}
  </li>
</ul>
```

---

# 97. Eventy Vue

```vue
<button @click="save">
  Zapisz
</button>
```

To skrót od:

```vue
<button v-on:click="save">
```

---

# 98. Binding Vue

```vue
<img :src="imageUrl" :alt="title">
```

To skrót od:

```vue
v-bind:src
```

---

# 99. `v-model`

```vue
<script setup>
import { ref } from "vue";

const query = ref("");
</script>

<template>
  <input v-model="query">

  <p>Szukasz: {{ query }}</p>
</template>
```

Bardzo wygodne dla formularzy.

---

# 100. Vue — kiedy

Dobry wybór, jeśli:

- chcesz framework komponentowy,
- lubisz HTML-ową składnię template,
- chcesz prosty start,
- budujesz małe lub średnie SPA,
- nie potrzebujesz ciężkiej struktury Angulara.

Dla człowieka dobrze znającego HTML i CSS Vue często wchodzi bardzo naturalnie.

---

# 101. Angular — czym jest

Angular jest pełnym frameworkiem aplikacyjnym.

Daje m.in.:

- komponenty,
- routing,
- dependency injection,
- formularze,
- narzędzia CLI,
- testy,
- TypeScript,
- strukturę aplikacji.

Jest bardziej opiniotwórczy niż React lub Vue.

---

# 102. Utworzenie Angulara

Instalacja CLI:

```bash
npm install -g @angular/cli
```

Nowy projekt:

```bash
ng new my-app
```

Uruchomienie:

```bash
cd my-app
npm start
```

albo:

```bash
ng serve --open
```

Domyślny adres developerski:

```text
http://localhost:4200
```

---

# 103. Współczesny Angular i standalone components

Nowoczesny Angular używa domyślnie standalone APIs.

Przykład:

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  standalone: true,

  template: `
    <h1>Hello Angular</h1>
  `
})
export class App {}
```

Nie musisz na starcie uczyć się starego modelu opartego wszędzie na `NgModule`.

W starych projektach nadal go spotkasz.

---

# 104. Angular i sygnały

Przykład:

```ts
import {
  Component,
  signal
} from "@angular/core";

@Component({
  selector: "app-counter",
  standalone: true,

  template: `
    <button (click)="increment()">
      {{ count() }}
    </button>
  `
})
export class Counter {
  count = signal(0);

  increment() {
    this.count.update(
      value => value + 1
    );
  }
}
```

---

# 105. Angular template

Warunek:

```html
@if (loggedIn()) {
  <p>Witaj</p>
} @else {
  <p>Zaloguj się</p>
}
```

Pętla:

```html
@for (product of products(); track product.id) {
  <p>{{ product.name }}</p>
}
```

---

# 106. Generowanie komponentu

```bash
ng generate component product-card
```

Skrót:

```bash
ng g c product-card
```

CLI jest istotną częścią pracy z Angularem.

---

# 107. Angular — kiedy

Angular ma sens, gdy:

- aplikacja jest większa,
- zespół chce narzuconej struktury,
- projekt ma dużo formularzy, routingu i usług,
- chcesz gotową architekturę,
- TypeScript jest standardem od początku.

Do:

```text
landing page + modal + formularz
```

Angular byłby najczęściej przerostem formy nad treścią.

---

# 108. React vs Vue vs Angular

## Vanilla JS

Najmniej warstw.

Dobre do:

- stron,
- widgetów,
- małych aplikacji,
- integracji z backendem.

## React

Najbardziej „JavaScriptowe” podejście.

Duży ekosystem.

JSX.

Dobre dla komponentowych aplikacji.

## Vue

Bardzo przyjazne połączenie:

```text
HTML + JS + CSS
```

Dobry próg wejścia.

## Angular

Pełny framework.

Najwięcej struktury.

Najwięcej rzeczy dostajesz w jednym ekosystemie.

---

# 109. Czy trzeba znać wszystkie trzy?

Nie.

Trzeba rozumieć:

- Vanilla JS,
- DOM,
- eventy,
- moduły,
- async,
- API,
- npm,
- Vite.

Następnie dobrze znać jeden framework komponentowy.

Pozostałe wystarczy początkowo rozumieć na poziomie:

```text
co robią
jak wygląda komponent
jak uruchomić projekt
jak działa stan
```

---

# 110. PixiJS

PixiJS jest biblioteką/rendering engine do grafiki 2D.

Nadaje się do:

- animacji,
- gier 2D,
- interaktywnych wizualizacji,
- efektów graficznych,
- aplikacji działających na canvas,
- bardzo dynamicznych scen.

Nie służy jako zamiennik zwykłego HTML/CSS dla strony firmowej.

---

# 111. Instalacja PixiJS

Nowy projekt:

```bash
npm create pixi.js@latest
```

Dokumentacja PixiJS rekomenduje m.in. wariant oparty na Vite.

Można też dodać PixiJS do projektu:

```bash
npm install pixi.js
```

---

# 112. Minimalny PixiJS 8

```js
import { Application } from "pixi.js";

async function main() {
  const app = new Application();

  await app.init({
    width: 800,
    height: 600,
    backgroundColor: 0x202020
  });

  document.body.appendChild(app.canvas);
}

main();
```

W PixiJS 8 inicjalizacja aplikacji jest asynchroniczna.

---

# 113. Grafika w PixiJS

Przykład:

```js
import {
  Application,
  Graphics
} from "pixi.js";

async function main() {
  const app = new Application();

  await app.init({
    resizeTo: window
  });

  document.body.appendChild(app.canvas);

  const square = new Graphics()
    .rect(0, 0, 100, 100)
    .fill(0xff0000);

  square.x = 100;
  square.y = 100;

  app.stage.addChild(square);
}

main();
```

---

# 114. Animacja PixiJS

```js
app.ticker.add(ticker => {
  square.rotation +=
    0.01 * ticker.deltaTime;
});
```

Ticker wykonuje funkcję dla kolejnych klatek renderowania.

---

# 115. Interakcja PixiJS

Ogólny schemat:

```js
sprite.eventMode = "static";

sprite.on("pointerdown", () => {
  console.log("Klik");
});
```

Dzięki pointer events jedna logika może obsługiwać mysz i dotyk.

---

# 116. HTML czy PixiJS?

Używaj HTML/CSS dla:

- tekstu,
- formularzy,
- menu,
- artykułów,
- SEO,
- standardowej nawigacji,
- dostępności.

PixiJS dla:

- sceny,
- animacji,
- sprite'ów,
- dużej liczby obiektów graficznych,
- grafiki działającej jak gra.

Można połączyć:

```text
HTML UI
+
PixiJS canvas
```

To bardzo normalny układ.

---

# 117. TypeScript

TypeScript to JavaScript z systemem typów.

JavaScript:

```js
function add(a, b) {
  return a + b;
}
```

TypeScript:

```ts
function add(
  a: number,
  b: number
): number {
  return a + b;
}
```

---

# 118. Obiekt TypeScript

```ts
interface Product {
  id: number;
  name: string;
  price: number;
}

function renderProduct(
  product: Product
) {
  console.log(product.name);
}
```

---

# 119. Czy uczyć się TypeScript od razu?

Najpierw musisz rozumieć JavaScript.

Potem TypeScript jest bardzo dobrym krokiem.

Proponowana kolejność:

```text
HTML
CSS
JavaScript
DOM
async/fetch
moduły
npm/Vite
framework
TypeScript
```

Jeśli zaczniesz TS przed zrozumieniem JS, będziesz rozwiązywał błędy typów bez zrozumienia działania języka.

---

# 120. Testy jednostkowe

Dla projektu Vite popularnym wyborem jest Vitest.

Instalacja:

```bash
npm install -D vitest
```

Przykład funkcji:

```js
export function add(a, b) {
  return a + b;
}
```

Test:

```js
import {
  describe,
  expect,
  it
} from "vitest";

import { add } from "./math.js";

describe("add", () => {
  it("dodaje liczby", () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

---

# 121. Testy E2E

Do automatycznego sterowania przeglądarką można używać np. Playwright.

Test E2E sprawdza aplikację podobnie jak użytkownik:

```text
otwórz stronę
kliknij
wpisz tekst
sprawdź wynik
```

Dla małych prywatnych projektów nie musisz od razu tworzyć ogromnej infrastruktury testowej.

Ale krytyczna logika powinna być możliwie testowalna.

---

# 122. ESLint

ESLint analizuje kod i wykrywa problemy.

Instalacja zależy od konfiguracji projektu.

Ogólnie jego rola to:

```text
linting
wykrywanie błędów
pilnowanie reguł kodu
```

---

# 123. Prettier

Prettier formatuje kod.

Przykład:

```js
const foo={a:1,b:2}
```

może zamienić na:

```js
const foo = {
  a: 1,
  b: 2,
};
```

ESLint i Prettier rozwiązują inne problemy:

```text
ESLint -> jakość i reguły kodu
Prettier -> formatowanie
```

---

# 124. Bezpieczeństwo — najważniejsze zasady

## Nie ufaj inputowi

Nigdy nie zakładaj, że dane użytkownika są poprawne.

Frontendowa walidacja poprawia UX.

Backend musi walidować dane ponownie.

---

# 125. XSS

Nie rób:

```js
result.innerHTML = userInput;
```

Bezpieczniej:

```js
result.textContent = userInput;
```

Jeśli naprawdę musisz renderować HTML z niezaufanego źródła, trzeba go poprawnie sanityzować.

---

# 126. Klucze API

Kod front-endowy jest dostępny użytkownikowi.

Jeżeli wpiszesz:

```js
const SECRET_KEY = "abc123";
```

to klucz nie jest sekretem.

`.env` w projekcie frontendowym również nie robi z wartości sekretu, jeżeli finalnie jest wstrzykiwana do kodu przeglądarkowego.

Sekretne klucze trzymaj po stronie backendu.

Schemat:

```text
Browser
   |
   v
Twój backend
   |
   v
zewnętrzne API
```

---

# 127. CORS

CORS to mechanizm przeglądarki kontrolujący requesty między originami.

Jeżeli frontend:

```text
https://app.example.com
```

odpytuje:

```text
https://api.other.com
```

serwer API musi pozwolić na taki request.

CORS nie naprawia się po stronie frontendu magicznym nagłówkiem.

---

# 128. Dostępność

Interaktywny element powinien być semantyczny.

Dobrze:

```html
<button id="save">
  Zapisz
</button>
```

Gorzej:

```html
<div id="save">
  Zapisz
</div>
```

z listenerem kliknięcia.

`button` dostaje automatycznie:

- fokus,
- obsługę klawiatury,
- semantykę,
- zachowanie oczekiwane przez użytkownika.

---

# 129. ARIA

Używaj wtedy, gdy HTML nie wystarcza.

Np. przy przycisku otwierającym panel:

```html
<button
  aria-expanded="false"
  aria-controls="menu"
>
  Menu
</button>
```

JS:

```js
button.setAttribute(
  "aria-expanded",
  String(open)
);
```

Najpierw semantyczny HTML, potem ARIA.

---

# 130. Wydajność

Dla zwykłej strony największe zyski często daje nie „super algorytm”, lecz:

- mniej JS,
- mniejsze obrazy,
- lazy loading,
- nieładowanie niepotrzebnych bibliotek,
- dzielenie kodu,
- rozsądny DOM,
- unikanie setek niepotrzebnych listenerów,
- unikanie niepotrzebnego renderowania.

---

# 131. Debounce

Przydatny np. w wyszukiwaniu podczas wpisywania.

Bez debounce:

```text
k
ka
kar
karo
user
```

może wykonać 5 requestów.

Debounce czeka chwilę od ostatniego inputu.

Przykład:

```js
function debounce(fn, delay) {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const search = debounce(query => {
  console.log("Szukam:", query);
}, 300);
```

---

# 132. Dynamiczny import

Możesz załadować moduł dopiero, gdy jest potrzebny.

```js
button.addEventListener(
  "click",
  async () => {
    const module =
      await import("./heavy-module.js");

    module.openEditor();
  }
);
```

To może pomóc zmniejszyć początkowy bundle.

---

# 133. Nie używaj frameworka tylko dlatego, że istnieje

Zła motywacja:

```text
To jest strona, więc zrobię React.
```

Lepsza:

```text
Czy stan i liczba komponentów są na tyle złożone,
że framework uprości projekt?
```

---

# 134. Nie buduj SPA, jeśli jej nie potrzebujesz

Jeśli strona to:

```text
Home
O nas
Kontakt
3 artykuły
```

nie musisz budować skomplikowanego klientowego routera.

Klasyczny HTML generowany przez backend + trochę JS może być:

- prostszy,
- szybszy,
- łatwiejszy w SEO,
- łatwiejszy w utrzymaniu.

---

# 135. JavaScript z backendem Go

Przykładowa architektura:

```text
Browser
   |
   | GET /
   v
Go server
   |
   | HTML/CSS/JS
   v
Browser

Browser
   |
   | fetch("/api/promotions")
   v
Go API
   |
   | JSON
   v
Browser
```

Frontend:

```js
const response =
  await fetch("/api/promotions");

const promotions =
  await response.json();
```

Go może służyć:

- HTML,
- statyczne assety,
- API JSON.

Nie musisz przerabiać backendu na Node tylko dlatego, że używasz nowoczesnego front-endu.

---

# 136. Mój praktyczny podział technologii

## Poziom 1 — zwykła interaktywna strona

```text
HTML
CSS
Vanilla JS
ES modules
fetch
```

## Poziom 2 — nowoczesne środowisko

```text
Node LTS
npm
Vite
ESLint
```

## Poziom 3 — aplikacja komponentowa

Wybierz jeden:

```text
React
Vue
Angular
```

## Poziom 4 — typowanie

```text
TypeScript
```

## Poziom 5 — grafika specjalna

```text
PixiJS
Canvas
WebGL/WebGPU
```

---

# 137. Co wybrałabym do typowych małych projektów

## Prosty widget / formularz / narzędzie wewnętrzne

```text
Vanilla JS + Vite
```

## Mała aplikacja z wieloma komponentami

```text
Vue lub React
```

## Projekt, w którym chcesz mocno rozwijać kompetencję rynkową

```text
React + TypeScript
```

## Duży panel biznesowy ze ścisłą strukturą

```text
Angular + TypeScript
```

## Wizualizacja / gra / animowany canvas

```text
PixiJS
```

---

# 138. Jak naprawdę uczyć się JavaScriptu

Nie ucz się przez czytanie samej składni.

Po każdej grupie tematów napisz coś działającego.

Przykład:

## Po zmiennych, warunkach i funkcjach

Kalkulator.

## Po DOM

Menu i modal.

## Po formularzach

Walidator formularza.

## Po tablicach

Filtr produktów.

## Po localStorage

Todo list.

## Po fetch

Wyszukiwarka danych z API.

## Po modułach

Rozbij projekt na kilka plików.

## Po Vite

Zbuduj i wypuść produkcyjny `dist/`.

## Po frameworku

Przepisz jeden wcześniejszy projekt.

To daje znacznie więcej niż 50 godzin oglądania tutoriali.

---

# 139. Proponowana ścieżka — etap 1

Opanuj bardzo dobrze:

```text
const / let
string / number / boolean
array
object
if
for
function
arrow function
map
filter
find
destructuring
spread
```

Cel:

umiesz przekształcać dane bez patrzenia co chwilę do dokumentacji.

---

# 140. Etap 2 — przeglądarka

Opanuj:

```text
querySelector
querySelectorAll
textContent
classList
dataset
createElement
append
remove
addEventListener
preventDefault
FormData
```

Cel:

potrafisz stworzyć stronę reagującą na użytkownika.

---

# 141. Etap 3 — asynchroniczność

Opanuj:

```text
Promise
async
await
fetch
try/catch
response.ok
JSON
```

Cel:

potrafisz pobrać dane z backendu i pokazać loading/error/success.

---

# 142. Etap 4 — organizacja kodu

Opanuj:

```text
import
export
moduły
foldery
separację odpowiedzialności
```

Cel:

projekt nie jest jednym `script.js` mającym 2500 linii.

---

# 143. Etap 5 — tooling

Opanuj:

```text
Node
npm
package.json
Vite
npm run dev
npm run build
.gitignore
DevTools
```

Cel:

potrafisz samodzielnie postawić środowisko.

---

# 144. Etap 6 — framework

Najpierw wybierz jeden.

Moja praktyczna kolejność nauki:

```text
1. Vanilla JS
2. React albo Vue
3. TypeScript
4. drugi framework tylko jeśli jest potrzebny
5. Angular, jeśli projekt/praca go wymaga
6. PixiJS jako osobna specjalizacja
```

Nie próbuj „opanować Reacta, Vue i Angulara naraz”.

To są trzy sposoby rozwiązania podobnego problemu.

---

# 145. Projekt ćwiczeniowy 1 — FAQ

Funkcje:

- lista pytań,
- kliknięcie rozwija odpowiedź,
- tylko jedna odpowiedź otwarta,
- `aria-expanded`,
- animacja CSS.

Ćwiczysz:

```text
DOM
eventy
classList
dataset
dostępność
```

---

# 146. Projekt 2 — kalkulator ceny

Funkcje:

- input liczby,
- select,
- checkboxy,
- dynamiczne podsumowanie,
- formatowanie PLN.

Ćwiczysz:

```text
formularze
Number
warunki
funkcje
Intl.NumberFormat
```

---

# 147. Projekt 3 — Todo

Funkcje:

- dodawanie,
- usuwanie,
- oznaczanie jako wykonane,
- filtry,
- localStorage.

Ćwiczysz:

```text
state
render
array
map
filter
localStorage
```

---

# 148. Projekt 4 — wyszukiwarka produktów

Funkcje:

- pobranie JSON,
- input search,
- debounce,
- sortowanie,
- filtrowanie,
- loading,
- error.

Ćwiczysz:

```text
fetch
async
DOM
array methods
debounce
```

---

# 149. Projekt 5 — dashboard

Funkcje:

- kilka endpointów,
- karty statystyk,
- tabela,
- filtry,
- modal,
- odświeżanie.

Zrób najpierw w Vanilla JS.

Potem przepisz na:

```text
React
```

albo:

```text
Vue
```

Dopiero wtedy zobaczysz realną różnicę.

---

# 150. Projekt 6 — PixiJS

Zrób:

- canvas full screen,
- 100 sprite'ów,
- animację,
- hover,
- kliknięcie,
- prosty HUD w HTML.

Ćwiczysz połączenie:

```text
HTML
CSS
DOM
PixiJS
animation loop
```

---

# 151. Projekt 7 — frontend do backendu Go

Backend:

```text
GET /api/items
POST /api/items
DELETE /api/items/:id
```

Frontend:

- pobiera listę,
- dodaje element,
- usuwa element,
- pokazuje błędy.

To jest bardzo praktyczne ćwiczenie pod prawdziwe projekty.

---

# 152. Przydatne API przeglądarki

Warto wiedzieć, że istnieją:

```text
fetch
localStorage
sessionStorage
URL
URLSearchParams
FormData
File
Blob
Clipboard API
IntersectionObserver
ResizeObserver
MutationObserver
WebSocket
EventSource
Web Workers
Geolocation
History API
Canvas
Web Audio
WebRTC
```

Nie ucz się wszystkich na pamięć.

Wiedz, że istnieją i wracaj do dokumentacji, gdy ich potrzebujesz.

---

# 153. URLSearchParams

Adres:

```text
/products?q=laptop&page=2
```

Kod:

```js
const params =
  new URLSearchParams(location.search);

console.log(params.get("q"));
console.log(params.get("page"));
```

Ustawienie:

```js
const params =
  new URLSearchParams();

params.set("q", "laptop");

history.replaceState(
  null,
  "",
  `?${params.toString()}`
);
```

---

# 154. Clipboard

```js
await navigator.clipboard.writeText(
  "Tekst do schowka"
);
```

---

# 155. IntersectionObserver

Przydatny do wykrywania, czy element pojawił się na ekranie.

```js
const observer =
  new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        console.log("Widoczny");
      }
    }
  });

observer.observe(
  document.querySelector("#section")
);
```

Zastosowania:

- lazy loading,
- animacje,
- infinite scroll.

---

# 156. WebSocket

Dla połączenia dwukierunkowego w czasie rzeczywistym:

```js
const socket =
  new WebSocket("wss://example.com/ws");

socket.addEventListener(
  "message",
  event => {
    console.log(event.data);
  }
);
```

Nie potrzebujesz WebSocket do zwykłego request/response.

Do tego jest HTTP + fetch.

---

# 157. Custom events

Możesz tworzyć własne eventy:

```js
const event =
  new CustomEvent("cart:updated", {
    detail: {
      count: 3
    }
  });

document.dispatchEvent(event);
```

Nasłuch:

```js
document.addEventListener(
  "cart:updated",
  event => {
    console.log(event.detail.count);
  }
);
```

Przydaje się czasem do komunikacji między niezależnymi fragmentami Vanilla JS.

---

# 158. `Intl`

Formatowanie waluty:

```js
const formatPrice =
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN"
  });

formatPrice.format(1234.56);
```

Daty:

```js
const formatDate =
  new Intl.DateTimeFormat(
    "pl-PL",
    {
      dateStyle: "long"
    }
  );

formatDate.format(new Date());
```

Nie pisz własnego formatowania dat/walut bez potrzeby.

---

# 159. Daty

```js
const now = new Date();
```

ISO:

```js
const iso = now.toISOString();
```

Parsowanie:

```js
const date =
  new Date("2026-09-19T10:00:00Z");
```

Daty i strefy czasowe potrafią być skomplikowane.

W poważnej logice zawsze jasno ustal:

```text
czy dana data jest lokalna
czy UTC
czy zawiera offset
```

---

# 160. `crypto.randomUUID`

Do prostych lokalnych identyfikatorów:

```js
const id = crypto.randomUUID();
```

Nie zastępuje to logiki ID po stronie bazy danych, ale jest bardzo wygodne w UI.

---

# 161. Modułowa aplikacja — przykład

```text
src/
├── main.js
├── api.js
├── storage.js
├── state.js
├── ui.js
└── utils.js
```

`state.js`:

```js
export const state = {
  products: [],
  query: ""
};
```

`api.js`:

```js
export async function fetchProducts() {
  const response =
    await fetch("/api/products");

  if (!response.ok) {
    throw new Error("API error");
  }

  return response.json();
}
```

`ui.js`:

```js
export function renderProducts(
  products
) {
  const list =
    document.querySelector("#list");

  list.replaceChildren();

  for (const product of products) {
    const li =
      document.createElement("li");

    li.textContent =
      product.name;

    list.append(li);
  }
}
```

`main.js`:

```js
import {
  fetchProducts
} from "./api.js";

import {
  renderProducts
} from "./ui.js";

import {
  state
} from "./state.js";

async function init() {
  state.products =
    await fetchProducts();

  renderProducts(
    state.products
  );
}

init();
```

To jest już architektura wystarczająca dla wielu małych narzędzi.

---

# 162. Framework nie zastępuje JavaScriptu

React:

```jsx
products
  .filter(...)
  .map(...)
```

Vue:

```js
computed(() =>
  products.value.filter(...)
);
```

Angular:

```ts
products().filter(...)
```

W każdym przypadku nadal używasz:

```text
JavaScript
arrays
objects
functions
async
HTTP
modules
```

Dlatego najważniejszą inwestycją jest sam język.

---

# 163. Co trzeba znać „na pamięć”

Warto mieć w głowie:

```text
const
let
if
for
function
=> 
array
object
map
filter
find
querySelector
addEventListener
textContent
classList
fetch
async
await
try/catch
import/export
```

---

# 164. Czego nie trzeba pamiętać

Nie musisz pamiętać:

- wszystkich opcji `fetch`,
- wszystkich metod `Date`,
- całego DOM API,
- wszystkich hooków frameworka,
- pełnej składni konfiguracji Vite,
- każdego CLI switcha.

Od tego jest dokumentacja.

Dobry developer nie jest kompilatorem dokumentacji.

Dobry developer:

```text
rozumie model
wie czego szukać
potrafi złożyć rozwiązanie
potrafi zdebugować problem
```

---

# 165. Minimalna codzienna ściąga

## DOM

```js
const el =
  document.querySelector("#id");

const all =
  document.querySelectorAll(".item");

el.textContent = "Hello";

el.classList.add("active");

el.addEventListener(
  "click",
  handler
);
```

## API

```js
const response =
  await fetch("/api/data");

if (!response.ok) {
  throw new Error(
    `HTTP ${response.status}`
  );
}

const data =
  await response.json();
```

## Tablice

```js
items.map(...)
items.filter(...)
items.find(...)
items.some(...)
items.every(...)
```

## Moduły

```js
export function foo() {}

import {
  foo
} from "./foo.js";
```

## npm

```bash
npm install
npm run dev
npm run build
```

---

# 166. Szybka decyzja technologiczna

Zadaj pytania.

## Czy strona potrzebuje tylko trochę interakcji?

Tak:

```text
Vanilla JS
```

## Czy UI ma wiele zależnych komponentów i dużo stanu?

Tak:

```text
React lub Vue
```

## Czy projekt wymaga dużej, mocno narzuconej architektury?

Tak:

```text
Angular
```

## Czy głównym problemem jest wydajna grafika 2D?

Tak:

```text
PixiJS
```

---

# 167. Finalny cel

Po przerobieniu tego materiału powinieneś potrafić samodzielnie:

1. stworzyć HTML,
2. podłączyć JS,
3. znaleźć element DOM,
4. obsłużyć kliknięcie,
5. odczytać formularz,
6. zmienić UI,
7. pracować z tablicą danych,
8. pobrać dane przez API,
9. obsłużyć błąd,
10. zapisać stan lokalnie,
11. podzielić kod na moduły,
12. stworzyć projekt npm,
13. odpalić Vite,
14. zbudować `dist`,
15. zdebugować kod w DevTools,
16. stworzyć podstawowy komponent React/Vue/Angular,
17. zrozumieć, po co framework istnieje,
18. uruchomić prostą scenę PixiJS,
19. podłączyć frontend pod backend Go,
20. świadomie zdecydować, czy framework jest w ogóle potrzebny.

Jeżeli umiesz te rzeczy, JavaScript przestaje być „czymś doczepionym do HTML”, a staje się normalnym narzędziem pracy.

---

# 168. Oficjalne źródła

## JavaScript i Web APIs

- MDN JavaScript:
  https://developer.mozilla.org/docs/Web/JavaScript

- MDN DOM:
  https://developer.mozilla.org/docs/Web/API/Document_Object_Model

- MDN Fetch:
  https://developer.mozilla.org/docs/Web/API/Fetch_API

- MDN `<script>`:
  https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/script

- MDN JavaScript Modules:
  https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules

## Node.js

- https://nodejs.org/

## Vite

- https://vite.dev/guide/

## React

- https://react.dev/

- React — installation:
  https://react.dev/learn/installation

- React — build from scratch:
  https://react.dev/learn/build-a-react-app-from-scratch

## Vue

- https://vuejs.org/

- Vue quick start:
  https://vuejs.org/guide/quick-start

## Angular

- https://angular.dev/

- Angular installation:
  https://angular.dev/installation

## PixiJS

- https://pixijs.com/

- PixiJS quick start:
  https://pixijs.com/8.x/guides/getting-started/quick-start

- PixiJS Application:
  https://pixijs.com/8.x/guides/components/application

---

# 169. Najkrótsze podsumowanie całego kursu

JavaScript na stronie działa według bardzo prostego modelu:

```text
1. Pobierz dane
2. Trzymaj stan
3. Reaguj na zdarzenia
4. Zmieniaj UI
```

W Vanilla JS robisz to ręcznie:

```js
state.count++;

element.textContent =
  state.count;
```

Framework robi część synchronizacji za Ciebie:

```text
stan się zmienił
        ↓
framework aktualizuje UI
```

Dlatego kolejność nauki ma ogromne znaczenie:

```text
JavaScript
   ↓
DOM
   ↓
events
   ↓
async / fetch
   ↓
modules
   ↓
npm / Vite
   ↓
React / Vue / Angular
   ↓
TypeScript
```

A PixiJS traktuj jako osobną warstwę do grafiki i animacji, nie jako zamiennik całego webowego stacku.

To wystarczy, żeby przejść od:

```html
<script>
  alert("hej");
</script>
```

do normalnej, modularnej, interaktywnej aplikacji webowej.

## Oficjalne źródła

- ECMAScript specification: https://tc39.es/ecma262/
- MDN JavaScript Guide: https://developer.mozilla.org/docs/Web/JavaScript/Guide
- Vite documentation: https://vite.dev/guide/
- React: https://react.dev/
- Vue: https://vuejs.org/
- Angular: https://angular.dev/
- PixiJS: https://pixijs.com/
