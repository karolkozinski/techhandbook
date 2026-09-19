# JavaScript — From Basics to Modern Front-End
# Table of Contents
# 1. What JavaScript actually does
JavaScript adds behavior to web pages, manipulates the DOM, communicates with APIs and can also run outside the browser in environments such as Node.js.
# 2. How to include JavaScript on a page
## 2.1. Code directly in HTML
```html
<script>console.log('hello')</script>
```
## 2.2. External JavaScript file
```html
<script src="app.js" defer></script>
```
## 2.3. Modern approach: module
```html
<script type="module" src="main.js"></script>
```
# 3. `async`, `defer` and `type="module"`
## `defer`
Downloads in parallel and executes after HTML parsing, preserving script order.
## `async`
Downloads in parallel and executes as soon as ready; execution order is not guaranteed.
## `type="module"`
Enables ES modules, strict mode and deferred execution semantics.
# 4. First script
```js
console.log('Hello JavaScript');
```
# 5. Variables
## `const`
Default choice when the binding will not be reassigned.
## `let`
Use when reassignment is needed.
## `var`
Legacy function-scoped declaration; avoid in modern code unless reading old projects.
# 6. Data types
## String
text.
## Number
floating-point numeric type.
## Boolean
true/false.
## null
explicit empty value.
## undefined
missing/unassigned value.
## Object
key/value objects.
## Array
ordered list object.
## BigInt
large integer type.
## Symbol
unique primitive identifier.
# 7. Checking type
```js
typeof value
Array.isArray(value)
```
# 8. Operators
```js
a + b
a - b
a * b
a / b
a % b
a ** b
```
# 9. Logical operators
```js
a && b
a || b
!a
```
# 10. Nullish coalescing `??`
```js
const value = input ?? 'default';
```
Falls back only for null/undefined, unlike `||`.
# 11. Optional chaining `?.`
```js
user.address?.city
```
# 12. Template strings
```js
const msg = `Hello ${name}`;
```
# 13. Conditions
```js
if (x > 0) { ... } else if (x === 0) { ... } else { ... }
```
# 14. Ternary operator
```js
const label = active ? 'on' : 'off';
```
# 15. `switch`
```js
switch (status) {
  case 'ready': break;
  default: break;
}
```
# 16. Loops
## `for`
```js
for (let i = 0; i < 10; i++) { ... }
```
## `for...of`
```js
for (const item of items) { ... }
```
## `forEach`
```js
items.forEach(item => console.log(item));
```
## `while`
```js
while (condition) { ... }
```
# 17. Functions
## Classic function
```js
function add(a, b) { return a + b; }
```
# 18. Arrow function
```js
const add = (a, b) => a + b;
```
# 19. Default parameters
```js
function greet(name = 'world') { ... }
```
# 20. Objects
```js
const user = { name: 'Ada', age: 30 };
```
# 21. Object methods
```js
const user = {
  greet() { return `Hi ${this.name}`; }
};
```
# 22. Arrays
```js
const items = [1,2,3];
items.push(4);
```
# 23. Destructuring
```js
const {name, age} = user;
const [first, second] = items;
```
# 24. Spread `...`
```js
const copy = {...user};
const merged = [...a, ...b];
```
# 25. Rest `...`
```js
function sum(...values) { ... }
```
# 26. DOM
The DOM is the browser's object representation of the HTML document.
# 27. Finding elements
```js
document.querySelector('#app')
document.getElementById('app')
```
# 28. `querySelectorAll` and iteration
```js
document.querySelectorAll('.item').forEach(el => { ... });
```
# 29. Changing content
```js
el.textContent = 'Hello';
el.innerHTML = '<strong>Hello</strong>';
```
# 30. Attributes
```js
el.setAttribute('aria-label', 'Close');
el.getAttribute('href')
```
# 31. `dataset`
```js
el.dataset.id
el.dataset.state = 'open';
```
# 32. Events
```js
button.addEventListener('click', () => { ... });
```
# 33. The `event` object
```js
button.addEventListener('click', event => {
  console.log(event.target);
});
```
# 34. Forms
Listen for `submit`, call `preventDefault()` when handling client-side, validate and send data deliberately.
# 35. FormData
```js
const data = new FormData(form);
console.log(data.get('email'));
```
# 36. Creating elements
```js
const li = document.createElement('li');
li.textContent = 'Item';
```
# 37. Removing elements
```js
el.remove();
```
# 38. Cloning
```js
const copy = el.cloneNode(true);
```
# 39. CSS classes
```js
el.classList.add('active');
el.classList.toggle('hidden');
```
# 40. Inline styles
```js
el.style.display = 'none';
```
Prefer classes for most styling.
# 41. Event delegation
```js
list.addEventListener('click', e => {
  const btn = e.target.closest('button[data-id]');
  if (!btn) return;
});
```
# 42. Timers
## `setTimeout`
```js
setTimeout(() => console.log('later'), 1000);
```
## `setInterval`
```js
const id = setInterval(refresh, 5000);
clearInterval(id);
```
# 43. JSON
```js
const text = JSON.stringify(data);
const obj = JSON.parse(text);
```
# 44. Fetch API
```js
const response = await fetch('/api/items');
```
# 45. Fetching data from an API
```js
const r = await fetch('/api/items');
if (!r.ok) throw new Error(`HTTP ${r.status}`);
const data = await r.json();
```
# 46. POST
```js
await fetch('/api/items', {
  method: 'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify(payload)
});
```
# 47. Promise
A Promise represents a future result: pending, fulfilled or rejected.
# 48. async/await
```js
async function load() {
  const r = await fetch('/api');
  return r.json();
}
```
# 49. Error handling
```js
try {
  await load();
} catch (err) {
  console.error(err);
}
```
# 50. UI state while loading
Track loading/success/error states and disable duplicate actions where appropriate.
# 51. localStorage
```js
localStorage.setItem('theme', 'dark');
localStorage.getItem('theme');
```
# 52. Saving an object
```js
localStorage.setItem('user', JSON.stringify(user));
const user = JSON.parse(localStorage.getItem('user') ?? 'null');
```
# 53. sessionStorage
Same API as localStorage, but scoped to the current browser tab/session.
# 54. Modules
```js
export function add(a,b){return a+b;}
import {add} from './math.js';
```
# 55. Default export
```js
export default function App() {}
import App from './App.js';
```
# 56. Sensible module organization
Split by responsibility: API, state, DOM/components, utilities, feature modules.
# 57. Classes
```js
class User {
  constructor(name) { this.name = name; }
}
```
# 58. Most important array methods
## `map`
```js
items.map(x => x * 2)
```
## `filter`
```js
items.filter(x => x.active)
```
## `find`
```js
items.find(x => x.id === id)
```
## `some`
```js
items.some(x => x.active)
```
## `every`
```js
items.every(x => x.valid)
```
## `reduce`
```js
items.reduce((sum,x)=>sum+x,0)
```
## `sort`
```js
items.toSorted((a,b)=>a-b)
```
# 59. Mutation and immutability
Know which methods mutate (`push`, `sort`) and which return new values (`map`, `filter`, `toSorted`).
# 60. Event loop — basics
JavaScript runs one call stack while browser/Node APIs schedule callbacks and promise jobs.
# 61. Promise vs timer
Promise microtasks run before timer macrotasks after the current stack finishes.
# 62. Node.js
Server/runtime environment for JavaScript outside the browser.
# 63. Environment — state in 2026
Modern JavaScript uses ES modules, async/await, native fetch in major runtimes, and build tools only when they add value.
# 64. npm
```bash
npm init -y
npm install package
npm run dev
```
# 65. Vite
Fast development/build tool for modern front-end projects.
# 66. Vite without a generator
```bash
npm install -D vite
```
# 67. Typical Vite structure
```text
index.html
src/main.js
src/style.css
package.json
```
# 68. package.json
Defines project metadata, scripts, dependencies and module behavior.
# 69. dependencies vs devDependencies
## `dependencies`
Needed by the application at runtime/build consumption.
## `devDependencies`
Development/build/test tooling.
# 70. Importing a library from npm
```js
import something from 'package';
```
# 71. DevTools
Browser developer tools are essential for frontend debugging.
# 72. Console
Inspect logs, values, errors and execute exploratory JavaScript.
# 73. Breakpoint
Pause execution and inspect scope/call stack.
# 74. Network
Inspect requests, responses, timing, headers and failures.
# 75. Application
Inspect storage, cookies, service workers and other browser application state.
# 76. Small Vanilla JS project structure
```text
index.html
src/main.js
src/api.js
src/ui.js
src/style.css
```
# 77. Complete Vanilla JS example — todo list
## HTML
Form, input and list container.
## JavaScript
State array + render() + submit handler + delete handler + optional localStorage persistence.
# 78. When Vanilla JS is enough
Small sites, widgets, forms, internal tools and pages with limited state.
# 79. Why use a framework
Component composition, state management patterns and large UI organization.
# 80. React — what it is
Component library centered on declarative rendering and state.
# 81. Creating React + Vite project
```bash
npm create vite@latest myapp -- --template react
```
# 82. Basic React structure
main entry renders App; components live in src; state flows through props/hooks.
# 83. React component
```jsx
function Hello({name}) { return <h1>Hello {name}</h1>; }
```
# 84. Props
Read-only inputs passed from parent to component.
# 85. State — `useState`
```jsx
const [count, setCount] = useState(0);
```
# 86. Conditional rendering
```jsx
{loading ? <Spinner/> : <Content/>}
```
# 87. Lists in React
```jsx
items.map(item => <Row key={item.id} item={item}/>)
```
# 88. React form
Use controlled inputs or form APIs/libraries as complexity grows.
# 89. `useEffect`
Synchronizes component with external systems; avoid using it for calculations that can happen during render.
# 90. React — when
Useful for component-heavy apps with meaningful client-side state.
# 91. Vue — what it is
Progressive component framework with templates, reactivity and Composition API.
# 92. Creating Vue
```bash
npm create vue@latest
```
# 93. `ref`
```js
const count = ref(0);
```
# 94. `computed`
```js
const total = computed(() => price.value * qty.value);
```
# 95. Vue conditions
```html
<p v-if="ready">Ready</p>
```
# 96. Vue loops
```html
<li v-for="item in items" :key="item.id">{{ item.name }}</li>
```
# 97. Vue events
```html
<button @click="save">Save</button>
```
# 98. Vue binding
```html
<img :src="url" :alt="title">
```
# 99. `v-model`
```html
<input v-model="name">
```
# 100. Vue — when
Good for approachable component apps and incremental adoption.
# 101. Angular — what it is
Full framework with strong architecture, TypeScript and batteries-included tooling.
# 102. Creating Angular
```bash
ng new myapp
```
# 103. Modern Angular and standalone components
Standalone components reduce NgModule boilerplate in modern Angular.
# 104. Angular and signals
Signals provide reactive state primitives in modern Angular.
# 105. Angular template
Uses interpolation, bindings, directives/control flow and event syntax.
# 106. Generating a component
```bash
ng generate component feature
```
# 107. Angular — when
Large structured applications and teams benefiting from strong conventions.
# 108. React vs Vue vs Angular
## Vanilla JS
small/simple interaction.
## React
large ecosystem/component apps.
## Vue
gentle component framework.
## Angular
full opinionated enterprise framework.
# 109. Do you need to know all three?
No. Know JavaScript deeply and one framework well; recognize the others.
# 110. PixiJS
High-performance 2D rendering library using Canvas/WebGL/WebGPU abstractions.
# 111. Installing PixiJS
```bash
npm install pixi.js
```
# 112. Minimal PixiJS 8
Create Application, initialize it, append canvas, add display objects.
# 113. Graphics in PixiJS
Use Graphics, Sprite and Text objects.
# 114. PixiJS animation
Use ticker/game loop to update state each frame.
# 115. PixiJS interaction
Enable eventMode and pointer events for interactive display objects.
# 116. HTML or PixiJS?
Use HTML for forms/content/accessibility; PixiJS for canvas-heavy 2D rendering.
# 117. TypeScript
JavaScript plus static type checking.
# 118. TypeScript object
```ts
type User = { id: number; name: string };
```
# 119. Learn TypeScript immediately?
Learn core JavaScript first, then add TypeScript early for larger projects.
# 120. Unit tests
Test small functions/components with tools such as Vitest/Jest.
# 121. E2E tests
Use Playwright/Cypress to test real browser workflows.
# 122. ESLint
```bash
npx eslint .
```
# 123. Prettier
```bash
npx prettier . --write
```
# 124. Security — key rules
Treat browser code and client input as untrusted.
## Do not trust input
Validate on the server; client validation is UX, not authority.
# 125. XSS
Avoid injecting unsanitized HTML; prefer textContent and framework escaping.
# 126. API keys
Secrets cannot be safely hidden in frontend JavaScript shipped to users.
# 127. CORS
Browser access-control mechanism configured by the server; not authentication.
# 128. Accessibility
Use semantic HTML, keyboard support, labels, focus states and sufficient contrast.
# 129. ARIA
Use ARIA to supplement semantics, not replace native HTML controls.
# 130. Performance
Measure first: network, rendering, JS execution, bundle size and Core Web Vitals.
# 131. Debounce
```js
const debounced = debounce(search, 300);
```
Useful for search/input events that should not fire on every keystroke.
# 132. Dynamic import
```js
const module = await import('./heavy.js');
```
# 133. Do not use a framework just because it exists
Framework cost is justified only when complexity benefits from it.
# 134. Do not build an SPA if you do not need one
Server-rendered/multi-page sites can be simpler, faster and easier to operate.
# 135. JavaScript with a Go backend
Go serves HTML/API/static assets; frontend JS handles interaction and fetch calls.
# 136. My practical technology split
## Level 1 — normal interactive page
Vanilla JS.
## Level 2 — modern environment
Vite + modules.
## Level 3 — component application
React/Vue/Angular.
## Level 4 — typing
TypeScript.
## Level 5 — special graphics
PixiJS/canvas.
# 137. What I would choose for typical small projects
## Simple widget / form / internal tool
Vanilla JS.
## Small app with many components
Vue or React.
## Project for marketable frontend skills
React + TypeScript.
## Large business panel with strict structure
Angular or strongly structured React.
## Visualization / game / animated canvas
PixiJS.
# 138. How to really learn JavaScript
## After variables, conditions and functions
build tiny console logic.
## After DOM
build interactive FAQ/menu.
## After forms
validate and submit data.
## After arrays
filter/sort lists.
## After localStorage
persist a todo/settings app.
## After fetch
build API-backed UI.
## After modules
split code by responsibility.
## After Vite
use package tooling/build.
## After framework
build one complete app.
# 139. Suggested path — stage 1
Syntax, functions, arrays, objects and errors.
# 140. Stage 2 — browser
DOM, events, forms, storage.
# 141. Stage 3 — asynchrony
Promises, fetch, async/await, error/loading states.
# 142. Stage 4 — code organization
Modules, separation of concerns and small architecture.
# 143. Stage 5 — tooling
npm, Vite, ESLint, Prettier, tests.
# 144. Stage 6 — framework
Choose one framework and build real components/state/data flow.
# 145. Practice project 1 — FAQ
Toggle questions using event listeners/classes.
# 146. Project 2 — price calculator
Form inputs + validation + calculation + formatted output.
# 147. Project 3 — Todo
CRUD state + localStorage.
# 148. Project 4 — product search
Fetch data + filters + debounce + loading/error.
# 149. Project 5 — dashboard
Multiple widgets/components + API data + state.
# 150. Project 6 — PixiJS
Interactive animated 2D scene.
# 151. Project 7 — frontend for Go backend
Go API + JS frontend + auth/forms/errors.
# 152. Useful browser APIs
URL, Clipboard, IntersectionObserver, WebSocket, CustomEvent, Intl, crypto and more.
# 153. URLSearchParams
```js
const params = new URLSearchParams(location.search);
```
# 154. Clipboard
```js
await navigator.clipboard.writeText(text);
```
# 155. IntersectionObserver
Efficiently observe element visibility for lazy loading/animations.
# 156. WebSocket
Persistent bidirectional connection for realtime updates.
# 157. Custom events
```js
el.dispatchEvent(new CustomEvent('saved', {detail: data}));
```
# 158. `Intl`
```js
new Intl.NumberFormat('pl-PL', {style:'currency', currency:'PLN'}).format(123)
```
# 159. Dates
Use Date carefully with time zones; prefer Intl for display and ISO formats for interchange.
# 160. `crypto.randomUUID`
```js
const id = crypto.randomUUID();
```
# 161. Modular application — example
main.js wires api.js, state.js, ui.js and feature modules.
# 162. Framework does not replace JavaScript
You still need closures, promises, arrays, objects, events and browser APIs.
# 163. What to know “by heart”
const/let, functions, arrays/objects, map/filter/find, DOM/events, fetch/async-await, modules, npm basics.
# 164. What you do not need to memorize
Every browser API, framework option or build-tool flag. Learn how to find documentation.
# 165. Minimal daily cheat sheet
## DOM
```js
document.querySelector
addEventListener
classList
```
## API
```js
const r = await fetch(url);
const data = await r.json();
```
## Arrays
```js
map
filter
find
some
every
```
## Modules
```js
export
import
```
## npm
```bash
npm install
npm run dev
npm test
```
# 166. Quick technology decision
## Does the page need only a little interaction?
Vanilla JS.
## Does UI have many dependent components and lots of state?
React/Vue.
## Does project need large strongly imposed architecture?
Angular.
## Is the main problem high-performance 2D graphics?
PixiJS.
# 167. Final goal
Be able to write interactive pages, call APIs, organize modules, use tooling and understand framework code.
# 168. Official sources
## JavaScript and Web APIs
MDN Web Docs.
## Node.js
nodejs.org/docs.
## Vite
vite.dev.
## React
react.dev.
## Vue
vuejs.org.
## Angular
angular.dev.
## PixiJS
pixijs.com.
# 169. Shortest summary of the whole course
Learn JavaScript first, browser APIs second, tooling third, and frameworks only when you need component/state architecture.
