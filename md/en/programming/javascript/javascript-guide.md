# JavaScript — From Basics to Modern Front-End

> A practical handbook for understanding browser JavaScript, DOM work, async code, modern tooling, frameworks and small interactive applications.

# 1. What JavaScript does

JavaScript adds behaviour to web pages:

- reacts to user input,
- changes the DOM,
- validates forms,
- calls APIs,
- stores local state,
- creates interactive interfaces,
- powers frameworks such as React, Vue and Angular,
- can also run outside the browser through Node.js.

# 2. Adding JavaScript to a page

Inline:

```html
<script>
  console.log("Hello");
</script>
```

External file:

```html
<script src="/js/app.js" defer></script>
```

Modern module:

```html
<script type="module" src="/js/app.js"></script>
```

# 3. async, defer and modules

`defer` downloads in parallel and executes after HTML parsing.

`async` executes as soon as download finishes; order is not guaranteed.

`type="module"` behaves like deferred loading and enables `import` / `export`.

# 4. First script

```js
console.log("Hello world");
```

# 5. Variables

Prefer `const` by default:

```js
const name = "Alice";
```

Use `let` when reassignment is required:

```js
let count = 0;
count += 1;
```

Avoid `var` in modern code unless reading legacy projects.

# 6. Data types

Common values:

```js
const text = "hello";       // string
const count = 42;           // number
const enabled = true;       // boolean
const nothing = null;       // intentional absence
let missing;                // undefined
const user = {};            // object
const items = [];           // array
const big = 123n;           // BigInt
```

Symbols are specialized unique identifiers.

# 7. Checking types

```js
typeof value
Array.isArray(value)
value === null
```

Remember:

```js
typeof null === "object"
```

is a historical JavaScript quirk.

# 8. Operators

Arithmetic:

```text
+ - * / % **
```

Comparison:

```text
=== !== < <= > >=
```

Prefer strict equality `===` / `!==`.

# 9. Logical operators

```js
a && b
a || b
!a
```

They short-circuit.

# 10. Nullish coalescing

```js
const port = config.port ?? 8080;
```

Uses the fallback only for `null` or `undefined`.

# 11. Optional chaining

```js
const city = user?.address?.city;
```

Stops safely if an intermediate value is nullish.

# 12. Template strings

```js
const message = `Hello ${name}`;
```

# 13. Conditions

```js
if (age >= 18) {
  console.log("adult");
} else if (age >= 13) {
  console.log("teen");
} else {
  console.log("child");
}
```

# 14. Ternary operator

```js
const label = active ? "Active" : "Inactive";
```

# 15. switch

```js
switch (status) {
  case "ready":
    break;
  case "error":
    break;
  default:
    break;
}
```

# 16. Loops

Classic:

```js
for (let i = 0; i < 10; i += 1) {
}
```

Values:

```js
for (const item of items) {
}
```

Array method:

```js
items.forEach((item) => {
  console.log(item);
});
```

While:

```js
while (running) {
}
```

# 17. Functions

```js
function add(a, b) {
  return a + b;
}
```

# 18. Arrow functions

```js
const add = (a, b) => a + b;
```

Arrow functions do not have their own `this`.

# 19. Default parameters

```js
function greet(name = "World") {
  return `Hello ${name}`;
}
```

# 20. Objects

```js
const user = {
  id: 1,
  name: "Alice",
  active: true,
};
```

Read:

```js
user.name
user["name"]
```

# 21. Object methods

```js
const user = {
  name: "Alice",
  greet() {
    return `Hello ${this.name}`;
  },
};
```

# 22. Arrays

```js
const items = ["a", "b", "c"];

items.push("d");
items.pop();
```

# 23. Destructuring

Object:

```js
const { name, age } = user;
```

Array:

```js
const [first, second] = items;
```

# 24. Spread

```js
const copy = [...items];
const updated = { ...user, active: false };
```

# 25. Rest

```js
function sum(...values) {
  return values.reduce((a, b) => a + b, 0);
}
```

# 26. DOM

The DOM is the browser's object representation of the HTML document.

# 27. Finding elements

```js
const button = document.querySelector("#save");
const form = document.querySelector(".contact-form");
```

# 28. querySelectorAll

```js
const buttons = document.querySelectorAll(".button");

for (const button of buttons) {
  console.log(button);
}
```

# 29. Changing content

```js
element.textContent = "New text";
```

Use `textContent` for plain text.

Avoid assigning untrusted data to `innerHTML`.

# 30. Attributes

```js
link.setAttribute("href", "/about");
const value = link.getAttribute("href");
```

# 31. dataset

HTML:

```html
<button data-user-id="42">Open</button>
```

JavaScript:

```js
button.dataset.userId
```

# 32. Events

```js
button.addEventListener("click", () => {
  console.log("clicked");
});
```

# 33. event object

```js
button.addEventListener("click", (event) => {
  console.log(event.target);
});
```

# 34. Forms

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();
});
```

# 35. FormData

```js
const data = new FormData(form);
const email = data.get("email");
```

# 36. Creating elements

```js
const li = document.createElement("li");
li.textContent = "New item";
list.append(li);
```

# 37. Removing elements

```js
element.remove();
```

# 38. Cloning

```js
const copy = element.cloneNode(true);
```

# 39. CSS classes

```js
element.classList.add("active");
element.classList.remove("active");
element.classList.toggle("active");
element.classList.contains("active");
```

# 40. Inline styles

```js
element.style.display = "none";
```

Prefer classes for most visual state.

# 41. Event delegation

Instead of attaching handlers to every child:

```js
list.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;

  console.log(button.dataset.id);
});
```

Useful for dynamic lists.

# 42. Timers

```js
const timeout = setTimeout(() => {
  console.log("later");
}, 1000);

clearTimeout(timeout);
```

Interval:

```js
const timer = setInterval(tick, 1000);
clearInterval(timer);
```

# 43. JSON

```js
const text = JSON.stringify(user);
const data = JSON.parse(text);
```

# 44. Fetch API

```js
const response = await fetch("/api/users");
```

Fetch only rejects for network-level failures, not automatically for HTTP 404/500.

# 45. Getting API data

```js
const response = await fetch("/api/users");

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const users = await response.json();
```

# 46. POST

```js
const response = await fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Alice",
  }),
});
```

# 47. Promise

A Promise represents a future result.

```js
fetch("/api")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

# 48. async / await

```js
async function loadUsers() {
  const response = await fetch("/api/users");
  return response.json();
}
```

It is syntax around Promises.

# 49. Error handling

```js
try {
  const data = await loadUsers();
} catch (error) {
  console.error(error);
}
```

# 50. Loading UI state

Typical flow:

```text
idle
↓
loading
↓
success OR error
```

Do not leave users guessing whether an action is still running.

# 51. localStorage

```js
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
localStorage.removeItem("theme");
```

Values are strings.

# 52. Storing objects

```js
localStorage.setItem("settings", JSON.stringify(settings));

const settings = JSON.parse(
  localStorage.getItem("settings") ?? "{}"
);
```

# 53. sessionStorage

Same basic API as localStorage, but scoped to the browser tab/session.

# 54. Modules

```js
export function add(a, b) {
  return a + b;
}
```

```js
import { add } from "./math.js";
```

# 55. Default export

```js
export default function App() {
}
```

```js
import App from "./App.js";
```

Use named exports when they make dependencies clearer.

# 56. Module organization

```text
src/
├── api.js
├── dom.js
├── state.js
├── utils.js
└── main.js
```

Split by responsibility, not arbitrarily.

# 57. Classes

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello ${this.name}`;
  }
}
```

Modern frontend code often uses plain objects/functions just as much as classes.

# 58. Important array methods

map:

```js
const names = users.map((user) => user.name);
```

filter:

```js
const active = users.filter((user) => user.active);
```

find:

```js
const user = users.find((user) => user.id === 42);
```

some:

```js
users.some((user) => user.admin);
```

every:

```js
users.every((user) => user.active);
```

reduce:

```js
const total = values.reduce((sum, value) => sum + value, 0);
```

sort:

```js
const sorted = [...users].sort((a, b) =>
  a.name.localeCompare(b.name)
);
```

# 59. Mutation and immutability

Mutation:

```js
user.active = false;
```

Immutable-style update:

```js
const updated = {
  ...user,
  active: false,
};
```

Framework state systems often prefer immutable updates.

# 60. Event loop

JavaScript runs code on a main execution thread, while browser APIs schedule work.

Mental model:

```text
call stack
↓
browser / runtime APIs
↓
task queues
↓
event loop
↓
call stack
```

# 61. Promise vs timer

Promise callbacks (microtasks) normally run before later timer tasks in the same turn.

You do not need every event-loop detail for daily frontend work, but you should know asynchronous ordering is not purely line-by-line.

# 62. Node.js

Node.js runs JavaScript outside the browser.

It provides filesystem, networking, process and server APIs.

# 63. Modern environment

Typical 2026 frontend environment may include:

- Node.js,
- npm / pnpm,
- Vite,
- ESLint,
- Prettier or another formatter,
- TypeScript,
- a framework only if needed.

# 64. npm

Initialize:

```bash
npm init -y
```

Install:

```bash
npm install lodash
npm install -D vite
```

Run scripts:

```bash
npm run dev
npm run build
```

# 65. Vite

Create:

```bash
npm create vite@latest
```

Typical commands:

```bash
npm install
npm run dev
npm run build
npm run preview
```

# 66. Vite without a generator

Minimal `package.json`:

```json
{
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

# 67. Typical Vite structure

```text
project/
├── index.html
├── package.json
├── src/
│   ├── main.js
│   └── style.css
└── public/
```

# 68. package.json

Defines scripts, dependencies and project metadata.

# 69. dependencies vs devDependencies

`dependencies` are runtime application dependencies.

`devDependencies` are build/test/lint tooling.

Frontend bundlers often include both in the development/build environment even though the final browser bundle contains only built assets.

# 70. Importing npm libraries

```js
import dayjs from "dayjs";
```

The bundler resolves the package from node_modules.

# 71. DevTools

Core panels:

- Elements,
- Console,
- Network,
- Sources,
- Application,
- Performance.

# 72. Console

Use it for logs, errors and quick expressions.

```js
console.log(value);
console.table(users);
console.error(error);
```

# 73. Breakpoints

Set a breakpoint in Sources, trigger the behaviour, then inspect variables and call stack.

# 74. Network

Use it to inspect:

- API calls,
- status codes,
- headers,
- payloads,
- responses,
- timing.

# 75. Application

Inspect localStorage, sessionStorage, cookies, IndexedDB and service workers.

# 76. Small Vanilla JS structure

```text
src/
├── api.js
├── ui.js
├── storage.js
└── main.js
```

# 77. Tiny Todo example

HTML:

```html
<form id="todo-form">
  <input name="title" required>
  <button>Add</button>
</form>

<ul id="todo-list"></ul>
```

JavaScript:

```js
const form = document.querySelector("#todo-form");
const list = document.querySelector("#todo-list");

const todos = [];

function render() {
  list.replaceChildren();

  for (const todo of todos) {
    const li = document.createElement("li");
    li.textContent = todo.title;
    list.append(li);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  todos.push({
    title: data.get("title"),
  });

  form.reset();
  render();
});
```

# 78. When Vanilla JS is enough

Use plain JavaScript for:

- small widgets,
- forms,
- simple dashboards,
- internal tools,
- mostly static sites,
- pages with limited state.

# 79. Why frameworks exist

Frameworks help when UI has many components, shared state, routing, complex updates and long-term structure.

They do not replace JavaScript knowledge.

# 80. React

React is a component-based UI library.

# 81. React + Vite

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

# 82. Basic React structure

```jsx
function App() {
  return <h1>Hello</h1>;
}

export default App;
```

# 83. Components

```jsx
function UserCard({ user }) {
  return <article>{user.name}</article>;
}
```

# 84. Props

Props are inputs passed from parent to child components.

# 85. State with useState

```jsx
const [count, setCount] = useState(0);
```

# 86. Conditional rendering

```jsx
return loggedIn ? <Dashboard /> : <Login />;
```

# 87. Lists

```jsx
{users.map((user) => (
  <UserCard key={user.id} user={user} />
))}
```

# 88. React forms

Controlled example:

```jsx
const [name, setName] = useState("");

<input
  value={name}
  onChange={(event) => setName(event.target.value)}
/>
```

# 89. useEffect

Used for synchronizing with external systems such as network requests, subscriptions or browser APIs.

Do not use effects for calculations that can happen directly during render.

# 90. When React fits

Good when:

- component ecosystem matters,
- team already knows React,
- stateful UI is substantial,
- routing/data libraries are useful.

# 91. Vue

Vue is a component framework with templates and reactive state.

# 92. Creating Vue

```bash
npm create vue@latest
```

# 93. ref

```js
const count = ref(0);
```

# 94. computed

```js
const doubled = computed(() => count.value * 2);
```

# 95. Vue conditions

```html
<p v-if="ready">Ready</p>
```

# 96. Vue loops

```html
<li v-for="user in users" :key="user.id">
  {{ user.name }}
</li>
```

# 97. Vue events

```html
<button @click="count++">Add</button>
```

# 98. Binding

```html
<a :href="url">Open</a>
```

# 99. v-model

```html
<input v-model="name">
```

# 100. When Vue fits

Useful when you want a component framework with approachable templates and reactivity.

# 101. Angular

Angular is a full application framework with strong conventions, dependency injection, routing, forms and tooling.

# 102. Creating Angular

```bash
npx @angular/cli new my-app
```

# 103. Standalone components

Modern Angular favors standalone components instead of requiring NgModules everywhere.

# 104. Signals

Signals provide reactive state in modern Angular.

# 105. Angular template

```html
<button (click)="increment()">
  {{ count() }}
</button>
```

# 106. Generate component

```bash
ng generate component user-card
```

# 107. When Angular fits

Often useful for large business applications that benefit from a strict framework and consistent architecture.

# 108. React vs Vue vs Angular

Vanilla JS:
- smallest complexity,
- browser-native,
- ideal for limited interaction.

React:
- large ecosystem,
- flexible architecture,
- strong market adoption.

Vue:
- approachable,
- cohesive,
- template-centric.

Angular:
- full framework,
- strong conventions,
- heavier but structured.

# 109. Do you need all three?

No.

Understand the ideas behind components, state, props, routing and data fetching.

Then learn one ecosystem deeply enough for real work.

# 110. PixiJS

PixiJS is a high-performance 2D rendering library using WebGL/WebGPU where supported.

Useful for:

- games,
- maps,
- visualizations,
- animated canvas scenes.

# 111. Installing PixiJS

```bash
npm install pixi.js
```

# 112. Minimal PixiJS

```js
import { Application, Graphics } from "pixi.js";

const app = new Application();

await app.init({
  width: 800,
  height: 600,
});

document.body.append(app.canvas);

const box = new Graphics()
  .rect(0, 0, 100, 100)
  .fill(0xff0000);

app.stage.addChild(box);
```

# 113. Pixi graphics

Sprites, Graphics, Text and Containers are central scene objects.

# 114. Animation

Use the ticker:

```js
app.ticker.add(() => {
  box.x += 1;
});
```

# 115. Interaction

Interactive display objects can respond to pointer events.

# 116. HTML or PixiJS?

Use HTML/CSS for regular documents, forms and accessible UI.

Use PixiJS when the main problem is high-performance 2D rendering.

# 117. TypeScript

TypeScript adds static type checking to JavaScript.

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

# 118. TypeScript object

```ts
type User = {
  id: number;
  name: string;
};
```

# 119. Learn TypeScript immediately?

Learn core JavaScript first.

Then TypeScript becomes much easier and helps with larger codebases.

# 120. Unit tests

Popular choices:

- Vitest,
- Jest,
- Node's built-in test runner for Node projects.

# 121. E2E tests

Popular tools:

- Playwright,
- Cypress.

# 122. ESLint

Static analysis for JavaScript/TypeScript.

# 123. Prettier

Automatic formatting.

Some teams use alternative formatters; follow the project.

# 124. Security essentials

Never trust input.

Validate server-side even if the browser also validates.

# 125. XSS

Avoid injecting untrusted HTML.

Prefer `textContent`.

If rich HTML is necessary, sanitize it with a well-maintained library.

# 126. API keys

A browser cannot safely hide a secret API key.

Anything shipped to the frontend can be inspected.

Keep real secrets on the backend.

# 127. CORS

CORS is a browser security policy, not authentication.

Configure allowed origins deliberately.

# 128. Accessibility

Interactive controls should be keyboard-accessible and have proper names.

Prefer semantic HTML over custom clickable divs.

# 129. ARIA

Use ARIA when native HTML semantics are insufficient.

Do not use ARIA to recreate controls that already exist in HTML.

# 130. Performance

Main costs:

- too much JavaScript,
- large dependencies,
- unnecessary rerenders,
- blocking main-thread work,
- large images,
- excessive network requests.

# 131. Debounce

Useful for search inputs:

```js
function debounce(fn, delay) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

# 132. Dynamic import

```js
const module = await import("./feature.js");
```

Useful for code splitting.

# 133. Do not use a framework just because it exists

Complexity is a cost.

Choose the smallest tool that solves the real problem.

# 134. Do not build an SPA unless you need one

Many websites are better served by server-rendered or mostly static HTML plus focused JavaScript.

# 135. JavaScript with a Go backend

A simple architecture:

```text
browser JS
   ↓ fetch JSON
Go API / server
   ↓
database
```

Or Go can render HTML and JavaScript can progressively enhance it.

# 136. Practical technology levels

Level 1:
plain HTML/CSS/JS.

Level 2:
ES modules + Vite.

Level 3:
component framework.

Level 4:
TypeScript.

Level 5:
special rendering such as PixiJS.

# 137. Practical choices

Small widget/form/internal tool:
Vanilla JS.

Small component-heavy app:
Vue or React.

Market-oriented frontend skill:
React + TypeScript is a common path.

Large enterprise panel:
Angular can be a strong fit.

2D visualization/game:
PixiJS.

# 138. How to learn JavaScript effectively

Build small things in sequence:

1. variables/functions,
2. DOM,
3. forms,
4. arrays,
5. localStorage,
6. fetch,
7. modules,
8. Vite,
9. one framework.

# 139. Stage 1 — language basics

Build a calculator or text utility.

# 140. Stage 2 — browser

Build FAQ accordion, modal or tabs.

# 141. Stage 3 — async

Fetch and display data from an API.

# 142. Stage 4 — code organization

Split the application into modules.

# 143. Stage 5 — tooling

Use npm, Vite, linting and formatting.

# 144. Stage 6 — framework

Rebuild one known project in React or Vue.

# 145. Exercise: FAQ

Practice selectors, events and class toggling.

# 146. Exercise: price calculator

Practice numbers, forms and DOM updates.

# 147. Exercise: Todo

Practice arrays, localStorage and rendering.

# 148. Exercise: product search

Practice filter, debounce and URL parameters.

# 149. Exercise: dashboard

Practice API calls, loading/error states and charts.

# 150. Exercise: PixiJS

Practice rendering, ticker and pointer interaction.

# 151. Exercise: frontend to Go backend

Practice fetch, JSON, API errors and deployment boundaries.

# 152. Useful browser APIs

Important examples:

- URL / URLSearchParams,
- Clipboard,
- IntersectionObserver,
- WebSocket,
- CustomEvent,
- Intl,
- Date,
- crypto.randomUUID.

# 153. URLSearchParams

```js
const params = new URLSearchParams(location.search);
const q = params.get("q");
```

# 154. Clipboard

```js
await navigator.clipboard.writeText("Hello");
```

Requires secure context/permissions depending on environment.

# 155. IntersectionObserver

Useful for lazy behaviour and visibility tracking without scroll-event polling.

# 156. WebSocket

Persistent bidirectional connection:

```js
const socket = new WebSocket("wss://example.com/ws");

socket.addEventListener("message", (event) => {
  console.log(event.data);
});
```

# 157. Custom events

```js
element.dispatchEvent(
  new CustomEvent("saved", {
    detail: { id: 42 },
  })
);
```

# 158. Intl

```js
new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(1234.5);
```

# 159. Dates

```js
const now = new Date();
console.log(now.toISOString());
```

Be careful with time zones.

# 160. crypto.randomUUID

```js
const id = crypto.randomUUID();
```

Useful for client-generated unique identifiers.

# 161. Modular app example

```text
src/
├── api/
│   └── users.js
├── ui/
│   └── user-list.js
├── storage.js
└── main.js
```

# 162. A framework does not replace JavaScript

You still need to understand:

- functions,
- objects,
- arrays,
- modules,
- Promises,
- async/await,
- events,
- browser APIs.

# 163. Things worth memorising

```js
const
let
if
for
function
=> 
[]
{}
.map()
.filter()
.find()
querySelector()
addEventListener()
fetch()
async
await
import
export
```

# 164. Things you do not need to memorise

Exact signatures of every Web API, framework hook or build-tool option.

Know the concept, then consult documentation.

# 165. Daily cheat sheet

DOM:

```js
document.querySelector()
document.querySelectorAll()
element.textContent
element.classList
element.addEventListener()
```

API:

```js
const response = await fetch(url);
const data = await response.json();
```

Arrays:

```js
map
filter
find
some
every
reduce
```

Modules:

```js
export
import
```

npm:

```bash
npm install
npm run dev
npm run build
```

# 166. Fast technology decision

Only a little interaction?
Use Vanilla JS.

Many stateful components?
Consider React/Vue.

Large structured enterprise application?
Consider Angular.

Main challenge is 2D rendering?
Consider PixiJS.

# 167. Final goal

You should be able to:

- read browser JavaScript,
- manipulate the DOM,
- handle forms,
- call APIs,
- understand Promises and async/await,
- structure modules,
- use npm and Vite,
- understand why frameworks exist,
- build a small app with one framework,
- choose when not to use one.

# 168. Official sources

JavaScript and Web APIs:
https://developer.mozilla.org/

Node.js:
https://nodejs.org/docs/

Vite:
https://vite.dev/

React:
https://react.dev/

Vue:
https://vuejs.org/

Angular:
https://angular.dev/

PixiJS:
https://pixijs.com/

# 169. Shortest summary

```text
HTML = structure
CSS = presentation
JavaScript = behaviour

Vanilla JS first
↓
DOM + events
↓
fetch + async
↓
modules
↓
npm + Vite
↓
one framework if needed
↓
TypeScript when the project benefits
```
