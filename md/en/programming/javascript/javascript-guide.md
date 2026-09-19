# JavaScript — Practical Handbook for Interactive Websites

## 1. What JavaScript is

JavaScript is the programming language built into web browsers.

HTML defines structure, CSS defines presentation, and JavaScript adds behavior.

A simple model:

```text
HTML  → structure
CSS   → appearance
JS    → behavior
```

JavaScript is also used outside browsers through environments such as Node.js.

This handbook focuses first on browser JavaScript, then on frameworks and libraries you may encounter.

## 2. Adding JavaScript to a page

Inline:

```html
<script>
  console.log("hello");
</script>
```

External file:

```html
<script src="./assets/app.js"></script>
```

A good default:

```html
<script src="./assets/app.js" defer></script>
```

`defer` downloads the file while HTML is parsed and executes it after parsing, while preserving script order.

## 3. Browser developer tools

Open DevTools and use the Console.

Try:

```js
console.log("hello");
2 + 2;
document.title;
```

The Console is one of the most important JavaScript debugging tools.

## 4. Variables

Modern JavaScript mainly uses:

```js
const name = "Karol";
let count = 1;
```

Avoid `var` in new code unless you understand its older function-scoping behavior.

Use `const` when the binding will not be reassigned.

Use `let` when it will.

## 5. Basic types

Common primitive values:

```text
string
number
boolean
undefined
null
bigint
symbol
```

Objects include:

- plain objects,
- arrays,
- functions,
- dates,
- maps,
- sets,
- DOM elements.

Check:

```js
typeof value
```

Be aware:

```js
typeof null
```

returns:

```text
"object"
```

for historical reasons.

## 6. Strings

```js
const first = "hello";
const second = 'world';
```

Template literal:

```js
const name = "Karol";
const message = `Hello, ${name}`;
```

Multi-line:

```js
const html = `
  <article>
    <h2>Title</h2>
  </article>
`;
```

## 7. Numbers

JavaScript's normal `number` type is IEEE-754 floating point.

```js
const price = 19.99;
const count = 10;
```

Do not use floating-point arithmetic blindly for exact financial calculations.

## 8. Booleans

```js
const enabled = true;
const hidden = false;
```

Truthy/falsy values matter in conditions.

Falsy values include:

```text
false
0
""
null
undefined
NaN
```

## 9. Equality

Prefer strict equality:

```js
a === b
a !== b
```

Loose equality:

```js
a == b
```

performs type coercion and can produce surprising results.

## 10. Arrays

```js
const items = ["one", "two", "three"];
```

Access:

```js
items[0]
```

Length:

```js
items.length
```

Add:

```js
items.push("four");
```

Useful methods:

```text
map
filter
find
some
every
reduce
forEach
includes
```

## 11. Objects

```js
const user = {
  id: 1,
  name: "Karol",
  active: true
};
```

Access:

```js
user.name
user["name"]
```

Add/change:

```js
user.active = false;
```

## 12. Destructuring

Object:

```js
const { name, active } = user;
```

Array:

```js
const [first, second] = items;
```

## 13. Spread syntax

Array copy:

```js
const copy = [...items];
```

Object copy/update:

```js
const updated = {
  ...user,
  active: false
};
```

Spread is shallow.

Nested objects are still shared unless copied too.

## 14. Functions

Declaration:

```js
function add(a, b) {
  return a + b;
}
```

Expression:

```js
const add = function (a, b) {
  return a + b;
};
```

Arrow function:

```js
const add = (a, b) => a + b;
```

Arrow functions handle `this` differently from normal functions.

## 15. Default parameters

```js
function greet(name = "friend") {
  return `Hello, ${name}`;
}
```

## 16. Rest parameters

```js
function sum(...values) {
  return values.reduce((total, value) => total + value, 0);
}
```

## 17. if / else

```js
if (score > 90) {
  console.log("great");
} else if (score > 50) {
  console.log("ok");
} else {
  console.log("low");
}
```

## 18. switch

```js
switch (command) {
  case "start":
    start();
    break;
  case "stop":
    stop();
    break;
  default:
    showHelp();
}
```

## 19. Loops

Classic:

```js
for (let i = 0; i < items.length; i += 1) {
  console.log(items[i]);
}
```

Values:

```js
for (const item of items) {
  console.log(item);
}
```

Object keys:

```js
for (const key in user) {
  console.log(key);
}
```

For ordinary arrays, prefer `for...of` over `for...in`.

## 20. Optional chaining

```js
const city = user.address?.city;
```

If an intermediate value is null/undefined, the expression returns `undefined` instead of throwing.

## 21. Nullish coalescing

```js
const value = input ?? "default";
```

Unlike `||`, it treats only `null` and `undefined` as missing.

## 22. Scope

`let` and `const` are block scoped.

```js
if (true) {
  const x = 10;
}
// x is not available here
```

## 23. Closures

An inner function can keep access to variables from its outer scope.

```js
function counter() {
  let value = 0;

  return () => {
    value += 1;
    return value;
  };
}
```

Closures are fundamental to JavaScript.

## 24. Modules

Export:

```js
export function add(a, b) {
  return a + b;
}
```

Import:

```js
import { add } from "./math.js";
```

In HTML:

```html
<script type="module" src="./app.js"></script>
```

Modules are deferred automatically and have their own scope.

## 25. DOM

The DOM is the browser's object model of the HTML document.

Find an element:

```js
const button = document.querySelector("#save");
```

Multiple:

```js
const cards = document.querySelectorAll(".card");
```

## 26. Reading and changing content

Text:

```js
element.textContent = "New text";
```

HTML:

```js
element.innerHTML = "<strong>Hello</strong>";
```

Prefer `textContent` for untrusted text.

Using untrusted input in `innerHTML` can create XSS vulnerabilities.

## 27. Classes

```js
element.classList.add("active");
element.classList.remove("hidden");
element.classList.toggle("open");
```

This is usually better than manually manipulating a long `className` string.

## 28. Attributes

```js
element.setAttribute("aria-expanded", "true");
const value = element.getAttribute("data-id");
```

Data attributes:

```html
<button data-id="42">Edit</button>
```

Read:

```js
button.dataset.id
```

## 29. Creating DOM elements

```js
const li = document.createElement("li");
li.textContent = "Item";
list.append(li);
```

This avoids HTML string construction when you only need simple elements.

## 30. Events

```js
button.addEventListener("click", () => {
  console.log("clicked");
});
```

Common events:

- click,
- input,
- change,
- submit,
- keydown,
- focus,
- blur,
- load.

## 31. Event object

```js
button.addEventListener("click", (event) => {
  console.log(event.target);
});
```

## 32. Preventing default behavior

Form:

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();
});
```

Use this only when JavaScript is deliberately taking over the behavior.

## 33. Event delegation

Instead of adding one handler to every row:

```js
list.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  console.log(button.dataset.action);
});
```

Useful for dynamically created elements.

## 34. Forms

Read a form:

```js
const data = new FormData(form);
const email = data.get("email");
```

Browser validation:

```js
if (!form.checkValidity()) {
  form.reportValidity();
}
```

Client validation improves UX; server validation remains mandatory.

## 35. localStorage

Store a string:

```js
localStorage.setItem("theme", "dark");
```

Read:

```js
const theme = localStorage.getItem("theme");
```

Remove:

```js
localStorage.removeItem("theme");
```

Store JSON:

```js
localStorage.setItem("settings", JSON.stringify(settings));
```

Read:

```js
const settings = JSON.parse(localStorage.getItem("settings") ?? "{}");
```

Do not treat localStorage as a secure secret store.

## 36. sessionStorage

Similar to localStorage, but scoped to the browser tab/session.

## 37. URL and location

```js
location.href
location.pathname
location.hash
```

URL parser:

```js
const url = new URL("https://example.com/?q=test");
console.log(url.searchParams.get("q"));
```

## 38. Hash routing

A simple static application can use:

```text
#/docs
#/doc/docker
```

Listen:

```js
window.addEventListener("hashchange", renderRoute);
```

This works well on static hosting because the server only needs to serve the root document.

## 39. fetch

GET:

```js
const response = await fetch("./content-index.json");
```

Check status:

```js
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
```

JSON:

```js
const data = await response.json();
```

Text:

```js
const text = await response.text();
```

## 40. POST JSON

```js
const response = await fetch("/api/items", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Example"
  })
});
```

## 41. async / await

```js
async function loadData() {
  const response = await fetch("/api/data");

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}
```

`await` pauses the async function, not the whole browser.

## 42. Promises

A Promise represents a future result.

```js
fetch("/api/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

`async/await` is syntax built on Promises.

## 43. try / catch

```js
try {
  const data = await loadData();
  render(data);
} catch (error) {
  console.error(error);
  showError("Could not load data.");
}
```

## 44. Promise.all

Run independent async operations concurrently:

```js
const [users, products] = await Promise.all([
  fetchUsers(),
  fetchProducts()
]);
```

If one rejects, the whole Promise rejects.

## 45. Timers

```js
const id = setTimeout(() => {
  console.log("later");
}, 1000);
```

Repeating:

```js
const timer = setInterval(checkStatus, 10000);
```

Stop:

```js
clearInterval(timer);
```

Do not use aggressive polling when events/webhooks are better.

## 46. JSON

Parse:

```js
const object = JSON.parse(text);
```

Serialize:

```js
const text = JSON.stringify(object);
```

JSON cannot represent functions, `undefined`, or some richer JavaScript types directly.

## 47. Date

```js
const now = new Date();
console.log(now.toISOString());
```

Date/time handling has many edge cases.

For complex time-zone work, consider the modern Temporal API where supported or a maintained date library when needed.

## 48. Map and Set

Map:

```js
const map = new Map();
map.set("id", 42);
console.log(map.get("id"));
```

Set:

```js
const unique = new Set(["a", "a", "b"]);
```

## 49. Classes

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

JavaScript classes are syntax over the language's prototype system.

Many modern projects use functions and composition instead.

## 50. `this`

`this` depends on how a function is called.

Normal function:

```js
function show() {
  console.log(this);
}
```

Arrow functions do not create their own `this`; they capture it from the surrounding scope.

This difference is important in callbacks and object methods.

## 51. Prototypes

Objects can inherit behavior through prototypes.

You do not need to manipulate prototypes directly to write ordinary modern JavaScript, but understanding that classes use prototypes helps when debugging.

## 52. Errors

Throw:

```js
throw new Error("Invalid state");
```

Catch:

```js
try {
  run();
} catch (error) {
  console.error(error);
}
```

Do not silently swallow errors without a reason.

## 53. Strict mode

ES modules are strict by default.

Older scripts can use:

```js
"use strict";
```

Strict mode catches some unsafe legacy behaviors.

## 54. JavaScript in the browser

Useful global APIs include:

- document,
- window,
- fetch,
- URL,
- localStorage,
- history,
- navigator,
- location,
- console.

These are browser APIs, not language syntax itself.

## 55. Node.js is a different runtime

In Node.js you have server/OS APIs such as:

- filesystem,
- processes,
- networking.

In the browser, you have DOM APIs.

Some code can run in both environments, but not all.

## 56. npm

Modern frontend projects often use npm even when the application runs in a browser.

Typical files:

```text
package.json
package-lock.json
```

Commands:

```bash
npm install
npm run dev
npm test
npm run build
```

A simple static vanilla-JS project may need no npm at all.

## 57. package.json

Example:

```json
{
  "name": "app",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest"
  }
}
```

Scripts are commands run with:

```bash
npm run build
```

## 58. Bundlers and dev servers

Modern tools include:

- Vite,
- esbuild,
- Rollup,
- webpack.

They can provide:

- modules,
- bundling,
- minification,
- hot reload,
- TypeScript/JSX transformations.

Do not add a build system to a tiny site unless it solves a real problem.

## 59. TypeScript

TypeScript adds static type syntax on top of JavaScript.

Example:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

It compiles/transforms to JavaScript.

For larger frontends, TypeScript can make refactoring safer.

## 60. React

React builds interfaces from components.

Example:

```jsx
function Greeting({ name }) {
  return <h1>Hello {name}</h1>;
}
```

Core ideas:

- components,
- props,
- state,
- hooks,
- declarative rendering.

React is useful for complex stateful interfaces, but overkill for many small static pages.

## 61. React state

```jsx
const [count, setCount] = useState(0);
```

Changing state causes a re-render.

Do not mutate state directly.

## 62. Vue

Vue uses reactive components and templates.

Example:

```vue
<script setup>
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <button @click="count++">
    {{ count }}
  </button>
</template>
```

Vue is often approachable for developers coming from HTML.

## 63. Angular

Angular is a full framework.

It provides:

- components,
- routing,
- dependency injection,
- forms,
- HTTP,
- testing conventions,
- CLI/tooling.

It is usually chosen for larger structured applications rather than tiny sites.

## 64. React vs Vue vs Angular

Very simplified:

```text
React   component/UI library ecosystem
Vue     progressive framework, approachable templates
Angular full application framework
```

Choose based on project/team needs, not popularity alone.

## 65. Vanilla JavaScript

Vanilla JS means using browser APIs without a frontend framework.

It is excellent for:

- static websites,
- documentation sites,
- simple search/filtering,
- forms,
- small interactive widgets.

A lot of websites do not need React/Vue/Angular.

## 66. Web Components

Native browser component model:

- custom elements,
- shadow DOM,
- templates.

Example concept:

```js
class MyButton extends HTMLElement {
  connectedCallback() {
    this.textContent = "Hello";
  }
}

customElements.define("my-button", MyButton);
```

Useful when you want reusable browser-native components without a framework.

## 67. Canvas

HTML:

```html
<canvas id="game" width="800" height="600"></canvas>
```

JavaScript:

```js
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

ctx.fillRect(10, 10, 100, 100);
```

Canvas is useful for:

- games,
- custom drawing,
- charts,
- visualizations.

## 68. requestAnimationFrame

For animation:

```js
function frame(time) {
  update(time);
  draw();
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
```

Prefer this to a fixed `setInterval` for browser animation.

## 69. PixiJS

PixiJS is a 2D rendering library using WebGL/WebGPU where available.

Useful for:

- 2D games,
- interactive visualizations,
- many sprites.

It is more specialized than ordinary DOM programming.

## 70. Phaser

Phaser is a browser game framework with:

- scenes,
- sprites,
- input,
- physics integrations,
- asset loading.

A good option for 2D browser games.

## 71. Three.js

Three.js is a 3D rendering library on top of WebGL/WebGPU capabilities.

Use it for:

- 3D scenes,
- models,
- visualizations.

Do not use it for ordinary page layout.

## 72. HTTP requests and CORS

A browser enforces origin rules.

A fetch can fail in the browser due to CORS even if:

```bash
curl ...
```

works.

Inspect the Network panel and response headers.

## 73. Cookies and authentication

JavaScript may interact with cookies indirectly through HTTP requests.

Sensitive session cookies should often be:

```text
HttpOnly
Secure
SameSite
```

If `HttpOnly`, JavaScript cannot read the cookie, which is a security feature.

## 74. XSS

Never insert untrusted text as HTML without sanitization.

Dangerous:

```js
output.innerHTML = userInput;
```

Safer when plain text is intended:

```js
output.textContent = userInput;
```

## 75. CSP

Content Security Policy can reduce the impact of XSS.

It is configured through HTTP headers/meta policy and should be designed deliberately.

## 76. Accessibility

JavaScript must not break semantics.

Prefer:

```html
<button>
```

over:

```html
<div onclick="...">
```

Manage:

- focus,
- keyboard interaction,
- ARIA state,
- live messages,
- reduced motion.

## 77. Progressive enhancement

Start with working HTML, then enhance with JavaScript where possible.

Example:

```text
normal link works
+
JavaScript makes navigation faster
```

This improves resilience and accessibility.

## 78. Performance

Watch:

- bundle size,
- long tasks,
- unnecessary dependencies,
- repeated DOM work,
- excessive event listeners,
- unbounded polling.

Measure with DevTools.

## 79. Debounce

Useful for search input:

```js
function debounce(fn, delay) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

Do not call expensive work on every keystroke unnecessarily.

## 80. Throttle

Throttling limits how often an operation runs.

Useful for:

- scroll,
- resize,
- pointer events.

Modern browser APIs may provide better alternatives for some cases, such as IntersectionObserver or ResizeObserver.

## 81. Observers

Useful browser APIs:

- IntersectionObserver,
- ResizeObserver,
- MutationObserver.

They can avoid inefficient polling.

## 82. Web Workers

Workers run JavaScript off the main UI thread.

Useful for CPU-heavy work that would otherwise freeze the interface.

Workers cannot directly manipulate the DOM.

## 83. Service Workers

Service workers can intercept network requests and enable:

- offline behavior,
- caching,
- PWA features.

They are powerful and can also create difficult caching bugs.

Use them only when the project needs them.

## 84. IndexedDB

Browser database for larger structured client-side data.

For tiny preferences, localStorage is easier.

For serious offline data, IndexedDB is more appropriate.

## 85. Testing JavaScript

Unit-test tools include:

- Vitest,
- Jest.

Browser/E2E tools include:

- Playwright,
- Cypress.

Do not test implementation trivia. Test useful behavior.

## 86. Linting

ESLint can detect code-quality and correctness problems.

Formatting:

- Prettier or another project formatter.

A small project can also rely on simple conventions if tooling would add more complexity than value.

## 87. Debugging

Start with:

1. Console errors,
2. Network requests,
3. breakpoints in Sources,
4. inspect variables,
5. verify DOM state,
6. isolate the smallest failing code.

Avoid debugging only with dozens of `console.log` calls when a breakpoint would be clearer.

## 88. Source maps

Bundled/minified applications can publish source maps so DevTools maps execution back to original source.

Be deliberate about exposing source maps in production if source visibility matters.

## 89. Event loop

JavaScript in the browser runs code on a main event loop.

A long synchronous function blocks:

- rendering,
- input,
- timers,
- other JS tasks.

This is why heavy work can make a page feel frozen.

## 90. Microtasks and tasks

Promises schedule microtasks.

Timers/events schedule tasks.

You do not need to memorize every queue detail, but understand that async callbacks are scheduled rather than executed magically in parallel on the main thread.

## 91. Common mistakes

- using `var` without understanding it,
- using `==` accidentally,
- forgetting `await`,
- ignoring `response.ok`,
- using `innerHTML` with untrusted input,
- assuming Node APIs exist in the browser,
- adding a framework for three click handlers,
- giant global mutable state,
- swallowing errors,
- loading too much JavaScript.

## 92. A simple project structure

```text
site/
├── index.html
├── assets/
│   ├── app.js
│   └── styles.css
└── data/
    └── items.json
```

No build step is required.

## 93. A modern build-based project

```text
app/
├── package.json
├── src/
├── public/
├── tests/
└── vite.config.js
```

Commands depend on `package.json`.

## 94. Useful browser-JS checklist

You should be able to:

- select DOM elements,
- react to events,
- read forms,
- change classes/text,
- fetch JSON/text,
- use async/await,
- handle errors,
- use localStorage,
- split code into modules,
- debug in DevTools.

## 95. Framework decision

Ask:

```text
Do I actually have complex UI state?
Do I need reusable components?
Does the team already use a framework?
Do I need a router/build ecosystem?
```

If not, start with vanilla JS.

## 96. What to learn next

For ordinary websites:

```text
DOM
events
fetch
async/await
modules
DevTools
accessibility
security
```

For larger frontends:

```text
TypeScript
one framework
testing
state management only when needed
build tooling
```

For browser games:

```text
Canvas
requestAnimationFrame
PixiJS/Phaser
asset loading
input
game loop
```

## 97. Final cheat sheet

```js
const element = document.querySelector("#id");

element.addEventListener("click", () => {
  element.classList.toggle("active");
});

const response = await fetch("./data.json");
if (!response.ok) throw new Error(`HTTP ${response.status}`);

const data = await response.json();

localStorage.setItem("theme", "dark");

const saved = localStorage.getItem("theme");
```

## Summary

You do not need a framework to be productive with JavaScript.

First master:

```text
values
functions
arrays/objects
DOM
events
fetch
async/await
modules
debugging
```

Then add React, Vue, Angular, PixiJS, Phaser, or other libraries only when the problem actually requires them.
