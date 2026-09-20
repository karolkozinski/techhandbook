---
id: "doc-022"
title: "Node.js - Practical Handbook"
slug: "node-js-practical-handbook"
description: "Node.js is a JavaScript runtime built on V8 that lets JavaScript run outside the browser, especially for servers, CLI tools and build tooling."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "node"
  - "nodejs"
  - "javascript"
---

# Node.js - Practical Handbook

Node.js is a JavaScript runtime outside the browser. When reading a project, focus on `package.json`, the lockfile, modules, npm scripts, environment configuration and how the process is started in development and production.

For new projects, prefer a supported LTS line instead of tying the project to an arbitrary Current release.

Related topics: [JavaScript](techhandbook:doc-021), [APIs and System Integrations](techhandbook:doc-008), [SQL and PostgreSQL for Developers](techhandbook:doc-010), [Docker](techhandbook:doc-012) and [Software Testing](techhandbook:doc-049).

# 1. What Node.js actually is
Node.js is a JavaScript runtime built on V8 that lets JavaScript run outside the browser, especially for servers, CLI tools and build tooling.
# 2. Node.js, npm and npx - what is what?
## Node.js
The runtime that executes JavaScript.
## npm
Package manager and script runner distributed with Node.
## npx
Runs package-provided binaries, usually without requiring a permanent global install.
# 3. Installing Node.js
Use a supported Node release through your distro, NodeSource, nvm/fnm or another approved version manager.
# 4. Node.js project - most important files
## package.json
Project metadata, scripts, dependencies and module settings.
# 5. The `scripts` section in package.json
```js
"scripts": {
  "dev": "node --watch src/index.js",
  "test": "node --test"
}
```
# 6. package-lock.json
Locks exact dependency versions/resolution for reproducible npm installs.
# 7. node_modules
Directory containing installed dependencies. It is normally not committed.
# 8. `npm install` vs `npm ci`
## npm install
Installs dependencies and may update the lockfile.
## npm ci
Requires the lockfile to match package.json and installs a clean reproducible dependency tree.
# 9. dependencies and devDependencies
Runtime packages belong in dependencies; build/test/lint tooling usually belongs in devDependencies.
# 10. Installing packages
```bash
npm install express
npm install -D eslint
```
# 11. Package versioning
## Exact version
`1.2.3` pins exactly.
## Caret
`^1.2.3` normally allows compatible minor/patch updates within major 1.
## Tilde
`~1.2.3` normally allows patch-level updates.
# 12. Updating packages
```bash
npm outdated
npm update
```
# 13. JavaScript needed to read Node.js
## Variable `let`
Block-scoped mutable binding.
## Constant `const`
Block-scoped binding that cannot be reassigned.
## `var`
Legacy function-scoped declaration.
# 14. Data types
Node uses standard JavaScript types: string, number, boolean, null, undefined, object, bigint, symbol.
# 15. Strings
```js
const name = 'Ada';
const message = `Hello ${name}`;
```
# 16. Arrays
```js
const items = [1,2,3];
items.push(4);
```
# 17. Objects
```js
const user = { id: 1, name: 'Ada' };
```
# 18. Destructuring
```js
const {id, name} = user;
const [first] = items;
```
# 19. Spread operator
```js
const copy = {...user};
const all = [...a, ...b];
```
# 20. Functions
```js
function add(a,b) { return a+b; }
```
# 21. Arrow functions
```js
const add = (a,b) => a+b;
```
# 22. Conditions
```js
if (ready) { ... } else { ... }
```
# 23. Comparisons
Prefer strict equality `===` and `!==` unless coercion is intentionally required.
# 24. Logical operators
```js
a && b
a || b
!a
```
# 25. Optional chaining
```js
user.profile?.email
```
# 26. Nullish coalescing
```js
const port = env.PORT ?? 3000;
```
# 27. Conditional operator
```js
const label = ok ? 'yes' : 'no';
```
# 28. Loops
```js
for (const item of items) { ... }
```
# 29. map, filter, find
## map
Transforms every item and returns a new array.
## filter
Keeps items matching a predicate.
## find
Returns the first matching item.
# 30. Modules
Node supports CommonJS and ES Modules.
# 31. CommonJS
```js
const fs = require('node:fs');
module.exports = { helper };
```
# 32. ES Modules
```js
import fs from 'node:fs';
export function helper() {}
```
# 33. `import` - how to read it
Identify whether the import comes from Node core (`node:`), an npm package, or a local relative path.
# 34. Built-in Node.js modules
Recognize `node:fs`, `node:path`, `node:http`, `node:url`, `node:events`, `node:stream`, `node:crypto`, `node:child_process`.
# 35. Working with files
```js
import {readFile} from 'node:fs/promises';
const text = await readFile('file.txt', 'utf8');
```
# 36. Asynchrony - key to Node.js
Most I/O is asynchronous so one process can handle many waiting operations without blocking a thread per request.
# 37. Promise
Represents a future fulfilled or rejected result.
# 38. async / await
```js
async function load() {
  const data = await readFile('x.txt','utf8');
  return data;
}
```
# 39. Error handling
```js
try {
  await work();
} catch (err) {
  console.error(err);
}
```
# 40. throw
```js
throw new Error('invalid state');
```
# 41. Event loop - enough for now
JavaScript runs on a call stack while libuv coordinates timers and asynchronous I/O callbacks/promises.
# 42. process
Global object exposing arguments, environment, exit code, signals and process metadata.
# 43. Environment variables
```js
const port = process.env.PORT ?? '3000';
```
# 44. `.env` file
A common local convention for environment variables. Loading it requires Node's supported env-file option or a library/tool, depending on project/runtime.
# 45. Running after cloning a project
```bash
git clone REPO
cd PROJECT
npm ci
npm test
npm run dev
```
# 46. How to find the application entry point
Check package.json `main`, `exports`, `scripts`, framework config and files such as `src/index.js`, `server.js`, `app.js`.
# 47. How to read a Node.js project
Start with package.json and scripts, then entry point, routes/controllers/services, config and tests.
# 48. Typical Express architecture
## routes
Map HTTP methods/paths to handlers.
## controllers
Translate HTTP requests/responses.
## services
Business logic.
## models
Data models or persistence entities.
## middleware
Cross-cutting request processing such as auth/logging/validation.
# 49. req and res
Express request and response objects.
# 50. URL parameters
```js
app.get('/users/:id', (req,res) => req.params.id);
```
# 51. Query string
```js
const q = req.query.q;
```
# 52. Request body
Parsed by body middleware/framework support and should always be validated.
# 53. HTTP status
```js
res.status(201).json(data);
```
# 54. Node backend and frontend
A Node backend can serve APIs, HTML or static files; frontend code still runs in the browser.
# 55. Does Node.js compile?
Node normally executes JavaScript directly, though projects may transpile/bundle TypeScript or frontend code before production.
# 56. TypeScript
Adds static type checking and syntax that compiles/transpiles to JavaScript.
# 57. tsconfig.json
Configures TypeScript compiler behavior.
# 58. Project build
`npm run build` executes whatever command the project defines, often TypeScript compilation or bundling.
# 59. Development vs production
Development favors watch/debug tooling; production favors built artifacts, stable config, supervision and observability.
# 60. NODE_ENV
Common convention used by libraries/apps to select development/production behavior.
# 61. Watch mode
```bash
node --watch src/index.js
```
# 62. Simplest debugging
Start with stack traces, focused logs and reproducible inputs.
# 63. Node debugger
```bash
node --inspect src/index.js
```
# 64. `debugger`
```js
debugger;
```
Pauses when a debugger is attached.
# 65. Stack trace
Read the first application frame around the error and follow callers upward.
# 66. Linter
ESLint is a common static code-quality tool.
# 67. Formatter
Prettier or project-standard formatting keeps style automatic.
# 68. Tests
Projects may use Node test runner, Vitest, Jest, Mocha and others.
# 69. Built-in Node test runner
```bash
node --test
```
# 70. How to find tests
Look for `test`, `tests`, `__tests__`, `.test.js`, `.spec.js` and package scripts.
# 71. Most important ecosystem tools
## Express
Minimal web framework.
## Fastify
Fast structured web framework.
## NestJS
Opinionated TypeScript backend framework.
## Vite
Frontend dev/build tool.
## React
UI library.
## Vue
UI framework.
## Angular
Full frontend framework.
## Prisma
ORM/database toolkit.
## Sequelize
ORM.
## Drizzle
TypeScript SQL ORM/query toolkit.
# 72. JSON
```js
const text = JSON.stringify(obj);
const obj = JSON.parse(text);
```
# 73. npm, yarn, pnpm
## npm
Default Node package manager.
## yarn
Alternative package manager.
## pnpm
Alternative with content-addressable storage and efficient linking.
# 74. Corepack
Tool for managing supported package-manager versions such as Yarn/pnpm in projects.
# 75. How to recognize project technology
## Express
express dependency/routes.
## React
react/react-dom.
## Vue
vue dependency and SFCs.
## Angular
@angular packages/angular.json.
## Vite
vite dependency/vite.config.
## Next.js
next dependency/app or pages directory.
## NestJS
@nestjs packages and decorators.
# 76. What `npm run build` really does
Exactly whatever is defined under the `build` script in package.json.
# 77. Production environment
Use explicit Node version, immutable deployment artifact, secrets/config, process supervision, reverse proxy where appropriate and monitoring.
# 78. Simplest deployment on Debian
Build/test app, copy/pull source or artifact, `npm ci`, configure env, run under systemd and proxy with nginx.
# 79. Do not run production from a terminal
An SSH terminal is not a process supervisor. Use systemd, container orchestration or another service manager.
# 80. systemd
Define a unit with working directory, user, environment and ExecStart.
# 81. Starting systemd
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now myapp
systemctl status myapp
```
# 82. nginx as reverse proxy
Bind Node to localhost/private port and let nginx terminate TLS and expose the public hostname.
# 83. Application port
Read it from code/config/env and confirm with `ss -lntp`.
# 84. PM2
Node-focused process manager. Useful in some stacks, but systemd is often sufficient on a normal Debian server.
# 85. Deployment with Docker
Package runtime, app and production dependencies into an image; keep state outside the container.
# 86. Multi-stage Docker build
Use one stage to install/build and a slimmer stage for runtime.
# 87. `.dockerignore`
Exclude node_modules, Git, local secrets, logs and build junk from the Docker build context.
# 88. Deploying a static frontend
Build to `dist`/`build` and serve static files from nginx/CDN; Node may not be required at runtime.
# 89. Typical backend deployment
Reverse proxy → Node service/container → database/external services.
# 90. Manual deployment after update
```bash
git pull
npm ci
npm test
npm run build
sudo systemctl restart myapp
```
# 91. Simple deploy script
Automate the same validated steps and fail on errors.
# 92. CI/CD
CI validates code; CD packages and/or deploys after checks.
# 93. Basic GitHub Actions
Checkout → setup-node → npm ci → test → build.
# 94. Logs
Use stdout/stderr with systemd/container logging or structured logging library.
# 95. Port problems
```bash
ss -lntp | grep ':3000'
```
# 96. Problem: command not found
Check package script, local `node_modules/.bin`, PATH and whether dependencies were installed.
# 97. Problem: Cannot find module
Check dependency install, import path, package exports and case sensitivity.
# 98. Problem: Node version
Compare `node --version`, package `engines`, `.nvmrc`, `.node-version` and CI config.
# 99. engines
package.json field documenting supported Node/package-manager versions.
# 100. ES Modules problem
Check `type: module`, file extensions, import syntax and package exports.
# 101. Problem with `.env`
Check whether the project actually loads it, filename/path, process environment and working directory.
# 102. Deployment debugging
Service status → logs → env → process → port → local curl → reverse proxy → firewall/DNS.
# 103. curl - very important for backends
```bash
curl -v http://127.0.0.1:3000/health
```
# 104. Security
Validate input, protect secrets, keep dependencies current, use least privilege, secure cookies/headers and avoid unsafe eval/shell execution.
# 105. npm scripts can do anything
Installing or running packages may execute arbitrary shell commands through lifecycle scripts.
# 106. Lifecycle scripts
Hooks such as preinstall/postinstall/prepare can run during package operations.
# 107. Installing without scripts
```bash
npm ci --ignore-scripts
```
Useful for auditing, but some legitimate packages need build scripts.
# 108. package.json - quick audit
Check scripts, dependencies, engines, type, exports, package manager and suspicious lifecycle commands.
# 109. What else may exist in a project
Lockfiles, tsconfig, eslint/prettier config, Dockerfile, compose.yaml, framework config, migrations, env examples.
# 110. docker compose
Defines multi-service local/production stacks such as app + database + cache.
# 111. Databases
Node commonly talks to PostgreSQL, MySQL/MariaDB, SQLite, MongoDB, Redis and others.
# 112. Migrations
Versioned schema changes run through ORM/query/migration tools.
# 113. Prisma
Schema-driven ORM/database toolkit with generated client and migrations.
# 114. Middleware
Function in request pipeline that can inspect/modify request/response or delegate to next handler.
# 115. Callback
Function passed for later invocation. Modern code often wraps callbacks with Promises/async APIs.
# 116. Classes
```js
class Service {
  constructor(repo) { this.repo = repo; }
}
```
# 117. this
Depends on call form; arrow functions capture lexical `this`, normal functions have dynamic receiver binding.
# 118. Import aliases
Build/runtime config can map aliases such as `@/` to project paths.
# 119. index.js as a barrel
Re-exports items from multiple modules to present one import surface.
# 120. Reading a function
Identify inputs, outputs, side effects, awaits, thrown errors and dependencies.
# 121. How to read a larger function
Split it into phases: validation → loading → transformation → side effects → response.
# 122. How to check where a function comes from
Use editor Go to Definition or search imports/exports.
# 123. How to find function usage
```bash
rg 'functionName' .
```
# 124. rg - basics
```bash
rg 'pattern' src
```
# 125. find
```bash
find . -type f -name '*.js'
```
# 126. tree
```bash
tree -L 2
```
# 127. npm ls
```bash
npm ls package
```
# 128. npm explain
```bash
npm explain package
```
# 129. npm view
```bash
npm view package version
```
# 130. Global packages
```bash
npm list -g --depth=0
```
Prefer project-local tools unless a global CLI is intentionally needed.
# 131. Shebang in CLI tools
```js
#!/usr/bin/env node
```
# 132. CLI in Node
Parse `process.argv` directly or use libraries such as commander/yargs.
# 133. Streams
Incremental data interfaces for files, HTTP and pipelines; avoid loading huge data entirely into memory.
# 134. Buffer
Node's byte container for binary data.
# 135. EventEmitter
Publish/subscribe primitive used throughout Node APIs.
# 136. HTTP without a framework
```js
import http from 'node:http';
http.createServer((req,res)=>{ res.end('ok'); }).listen(3000);
```
# 137. fetch
Modern Node versions provide standards-based `fetch`.
# 138. REST API
Resource-oriented HTTP endpoints using methods/status codes/JSON conventions.
# 139. WebSocket
Persistent bidirectional connection for real-time communication.
# 140. worker_threads
Threads for CPU-heavy JavaScript work; not normally needed for ordinary I/O.
# 141. child_process
Runs external programs. Validate arguments and avoid shell injection.
# 142. Most important security traps
Command injection, path traversal, SSRF, prototype pollution, insecure deserialization patterns, secret leaks and vulnerable dependencies.
# 143. Sanitization and validation
Validate type/shape/range; sanitize only for the output context where needed.
# 144. CORS
Browser access-control policy, not authentication.
# 145. JWT
Signed token format. Validate signature, issuer/audience/expiry and keep signing keys safe.
# 146. Session
Server-side or store-backed authenticated session usually referenced by a secure cookie.
# 147. Password hashing
Use dedicated password-hashing algorithms/libraries such as Argon2 or bcrypt, never plain SHA.
# 148. Semantic versioning
Major.Minor.Patch convention used widely in npm.
# 149. ESM extensions
Relative ESM imports may require explicit file extensions depending on runtime/config.
# 150. npm cache
```bash
npm cache verify
```
# 151. Memory leak and RAM
Watch retained objects, unbounded caches/listeners/timers and long-lived closures. Use heap snapshots/profilers.
# 152. NODE_OPTIONS
Environment variable for Node runtime options; treat production use carefully.
# 153. Exit code
`0` means success by convention; non-zero means failure.
# 154. Signals
Servers commonly handle SIGTERM/SIGINT to begin graceful shutdown.
# 155. Graceful shutdown
Stop accepting new work, close server/database connections, finish bounded in-flight work, then exit.
# 156. package-lock and repository security
Commit the lockfile for applications and review unexpected dependency-tree changes.
# 157. Monorepo
One repository containing multiple packages/apps.
# 158. Workspaces
Package-manager feature for linking/managing multiple local packages.
# 159. Running npm from repository root
Workspace scripts can target one or many packages depending on package manager.
# 160. Source maps
Map generated/transpiled code back to original TypeScript/source for debugging.
# 161. What `dist` means
Conventional directory for built/transpiled distributable output.
# 162. public
Common directory for assets copied/served without module processing.
# 163. static
General name for files served directly rather than generated dynamically.
# 164. Template engines
Server-side HTML renderers such as EJS, Pug or Handlebars.
# 165. Next.js
React framework supporting server rendering, routing, server components/API routes and build tooling.
# 166. SSR
Server-side rendering generates HTML on the server per request/build strategy.
# 167. SPA
Single-page app updates client-side UI without full page reloads.
# 168. How to tell whether Node is required in production
If the result is only static files, no. If server-side rendering/API/background jobs run in Node, yes.
# 169. Order for analyzing an unfamiliar repo
package.json → lockfile → scripts → entry point/framework → env/config → routes/features → tests → deployment.
# 170. First commands after clone
```bash
node --version
npm --version
npm ci
npm test
npm run build
```
# 171. Audit without running code
Read package.json scripts/deps, lockfile, install hooks, Docker/CI config and env examples before executing anything.
# 172. Finding environment variables
```bash
rg 'process\.env' .
```
# 173. Finding the port
```bash
rg 'listen\(|PORT' src .
```
# 174. Finding endpoints
```bash
rg 'app\.(get|post|put|delete)|router\.' src
```
# 175. Finding the database
Look for ORM packages, connection URLs, migrations and config names such as DATABASE_URL.
# 176. Finding external APIs
Search `fetch`, axios/http clients, URLs, SDK packages and environment variables.
# 177. Reading the technology stack from package.json
Dependencies and scripts quickly reveal frameworks, database clients, test runners and build tools.
# 178. How not to read Node
Do not read `node_modules`; start from project code and package metadata.
# 179. Most important file extensions
`.js`, `.mjs`, `.cjs`, `.ts`, `.tsx`, `.jsx`, `.json` and framework-specific files.
# 180. JSX
JavaScript syntax extension compiled into element creation/framework calls.
# 181. Importing CSS
Frontend bundlers/frameworks may treat CSS as a module side effect; Node itself does not natively execute CSS.
# 182. Dynamic import
```js
const mod = await import('./feature.js');
```
# 183. JSON import
Support depends on module system/runtime version; many projects read JSON with fs or import attributes.
# 184. top-level await
Allowed in ES modules in supported Node versions.
# 185. main pattern
Keep startup in a small entry point that loads config, creates dependencies and starts services.
# 186. Dependency injection
Pass dependencies explicitly rather than importing global singletons everywhere.
# 187. Repository
Persistence/data-access abstraction.
# 188. Controller
HTTP/input boundary translating request into service call and response.
# 189. Service
Application/business logic.
# 190. Config
Validated configuration object derived from environment/files.
# 191. Feature flags
Runtime or deployment-controlled switches for staged functionality.
# 192. Request logging
Log method/path/status/duration/request ID, avoiding secrets.
# 193. Health endpoint
Simple endpoint indicating whether process/dependencies are healthy enough for traffic.
# 194. Healthcheck in shell
```bash
curl -fsS http://127.0.0.1:3000/health
```
# 195. `npm start` in production
Only meaningful if package.json defines a production-appropriate `start` script.
# 196. Dev server is not a production server
Watch/HMR tooling is for development; use the framework's documented production build/runtime.
# 197. Minimal production workflow
Install reproducibly → test → build → deploy artifact → start under supervisor → health check.
# 198. Rollback
Keep previous artifact/image/release and a documented database-compatible rollback path.
# 199. `npm ci` and production dependencies
```bash
npm ci --omit=dev
```
# 200. Build and deploy - good separation
Build in CI or controlled build stage; deploy immutable output rather than compiling unpredictably on production when possible.
# 201. Node in Docker - good mental model
Container = Node runtime + app + production dependencies; config/secrets/state arrive from outside.
# 202. Docker volumes
Use for persistent runtime data only when the application genuinely needs local persistence.
# 203. Node and SQLite
Fine for small/single-instance workloads; understand file locking, backups and container volume placement.
# 204. Node as developer tooling
Even static frontend projects may use Node only for npm/Vite/build/test and not in production.
# 205. Importance of lockfile during deployment
The lockfile ensures the dependency graph tested in CI is the one installed in deployment.
# 206. Minimal syntax you must recognize
const/let, objects/arrays, destructuring, functions, async/await, import/export, map/filter/find, try/catch.
# 207. Mental model of an async function
Calling it returns a Promise; `await` pauses that async function until the awaited promise settles.
# 208. Mental model of import
Import connects modules through explicit exported bindings.
# 209. Mental model of middleware
A chain around request handling that can act before/after delegating to the next layer.
# 210. Mental model of callback
A function value handed to code that calls it later.
# 211. Mental model of map
One input item becomes one output item; returns a new array.
# 212. Mental model of filter
Predicate decides which input items remain.
# 213. Mental model of destructuring
Pattern extracts named/indexed pieces from an object/array.
# 214. Mental model of spread
Copies/expands iterable/object properties into a new surrounding structure.
# 215. Checklist: I received an unfamiliar Node repo
Read package.json, identify Node/package manager version, inspect scripts/deps, install with lockfile, run tests/build, find entry/env/port and deployment files.
# 216. Checklist: deployment on Debian
Node version → service user → artifact/source → npm ci → build → env → systemd → localhost curl → nginx → logs.
# 217. Checklist: something does not work
Exact error → logs/stack → Node version → env → dependency install → process → port → local curl → proxy/network.
# 218. Most important Node/npm commands
```text
node --version
npm --version
npm ci
npm run
npm test
npm run build
npm ls
npm explain
```
# 219. Most important deployment commands
```text
systemctl status/restart
journalctl -u SERVICE
ss -lntp
curl -v localhost:PORT
nginx -t
```
# 220. Most important questions when analyzing a project
What starts it? Which Node version? Which scripts? Which env vars? Which port? Which DB/APIs? How is it built/tested/deployed?
# 221. Example analysis of a fictional project
package.json says Fastify + Prisma + TypeScript; scripts reveal dev/build/start; Prisma schema reveals DB; src/server.ts is entry point; Dockerfile/systemd reveals deployment.
# 222. Example deployment of that project
npm ci → tests → npm run build → migrations → restart service → health check → inspect logs.
# 223. Node.js vs Go - quick mental comparison
Node is dynamic JS with event-loop I/O and huge web ecosystem; Go is statically typed, compiled to a simple binary with built-in concurrency.
# 224. Node.js vs JavaScript
JavaScript is the language; Node.js is one runtime environment for that language.
# 225. What you really need to remember
package.json/scripts, lockfile, npm ci, modules, async/await, env vars, logs, process supervision, reverse proxy and reproducible deployment.
# 226. Cheat sheet - analyze a project in 5 minutes
```text
cat package.json
node --version
npm ci
npm test
npm run build
rg 'process.env|listen\(' src
tree -L 2
```
# 227. Cheat sheet - reading syntax
```text
const/let
{} object
[] array
=> function
await Promise
?. optional
?? fallback
... spread/rest
import/export
```
# 228. Cheat sheet - deployment
```text
npm ci
npm run build
systemctl restart APP
journalctl -u APP
curl localhost:PORT/health
nginx -t
```
# 229. What is worth learning later
Streams/backpressure, profiling, worker threads, advanced ESM/package exports, framework internals, observability and supply-chain security.
# 230. Final mental model
A Node project is package metadata + JavaScript/TypeScript modules + dependencies + scripts + runtime config. Understand those five and most unfamiliar repositories become manageable.

## Official references

- Node.js documentation: https://nodejs.org/docs/latest/api/
- Node.js release schedule: https://nodejs.org/en/about/previous-releases
- npm documentation: https://docs.npmjs.com/
