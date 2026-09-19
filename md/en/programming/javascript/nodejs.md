# Node.js — Practical Handbook

> Goal: understand Node.js projects well enough to read code, install dependencies, run and build applications, deploy them on Debian, troubleshoot common failures and recognize the ecosystem around npm, Express, frameworks and frontend tooling.

# 1. What Node.js is

Node.js is a JavaScript runtime outside the browser.

It uses the V8 JavaScript engine and provides APIs for:

- files,
- networking,
- processes,
- HTTP servers,
- streams,
- child processes,
- environment variables.

Node.js is not a programming language. The language is JavaScript.

# 2. Node.js, npm and npx

Node.js:

```text
runtime
```

npm:

```text
package manager + script runner
```

npx:

```text
run a package command without manually installing it globally
```

Examples:

```bash
node app.js
npm install
npm run build
npx vite
```

# 3. Installation

On Debian, use the distribution package if its version fits the project, or install the required LTS/current version through an appropriate version-management method.

Check:

```bash
node --version
npm --version
```

Version managers such as nvm/fnm can be useful on developer machines.

On production servers, prefer an explicit, reproducible Node version.

# 4. Important project files

Typical project:

```text
project/
├── package.json
├── package-lock.json
├── src/
├── tests/
├── .env.example
└── README.md
```

# 5. package.json

Example:

```json
{
  "name": "example-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "node src/server.js",
    "test": "node --test",
    "build": "vite build"
  },
  "dependencies": {
    "express": "^5.0.0"
  }
}
```

Read package.json first when entering an unfamiliar Node project.

# 6. scripts

Run:

```bash
npm run dev
npm test
npm run build
npm start
```

A script can execute arbitrary commands, so inspect unfamiliar scripts before running them.

# 7. package-lock.json

The lockfile records resolved dependency versions and integrity information.

Commit it for normal npm applications.

It makes installs more reproducible.

# 8. node_modules

Installed package files live in:

```text
node_modules/
```

Do not commit this directory.

Recreate it with npm.

# 9. npm install vs npm ci

`npm install`:

- installs dependencies,
- may update lockfile,
- useful during development.

`npm ci`:

- requires a lockfile,
- removes existing node_modules,
- installs exactly from lockfile,
- ideal for CI and reproducible deployments.

# 10. dependencies and devDependencies

Runtime dependency:

```bash
npm install express
```

Development dependency:

```bash
npm install -D eslint
```

# 11. Installing packages

```bash
npm install PACKAGE
npm install -D PACKAGE
npm uninstall PACKAGE
```

# 12. Package versions

Exact:

```json
"express": "5.1.0"
```

Caret:

```json
"express": "^5.1.0"
```

Tilde:

```json
"express": "~5.1.0"
```

Read SemVer as:

```text
MAJOR.MINOR.PATCH
```

# 13. Updating dependencies

```bash
npm outdated
npm update
```

Do not update production blindly. Run tests and review breaking changes.

# 14. JavaScript you need for Node

You should recognize:

- const / let,
- objects,
- arrays,
- destructuring,
- spread,
- functions,
- arrow functions,
- Promises,
- async/await,
- modules,
- error handling.

# 15. Strings

```js
const name = "Alice";
const message = `Hello ${name}`;
```

# 16. Arrays

```js
const items = ["a", "b"];
items.push("c");
```

# 17. Objects

```js
const config = {
  port: 8080,
  host: "127.0.0.1",
};
```

# 18. Destructuring

```js
const { port, host } = config;
```

# 19. Spread

```js
const production = {
  ...config,
  host: "0.0.0.0",
};
```

# 20. Functions

```js
function add(a, b) {
  return a + b;
}
```

Arrow:

```js
const add = (a, b) => a + b;
```

# 21. Conditions and comparisons

```js
if (status === "ready") {
}
```

Prefer strict equality:

```text
=== !==
```

# 22. Logical operators

```js
a && b
a || b
!a
```

# 23. Optional chaining

```js
user?.profile?.email
```

# 24. Nullish coalescing

```js
const port = process.env.PORT ?? "3000";
```

# 25. Ternary

```js
const mode = production ? "prod" : "dev";
```

# 26. Loops

```js
for (const item of items) {
}
```

# 27. map, filter and find

```js
users.map((u) => u.name);
users.filter((u) => u.active);
users.find((u) => u.id === 42);
```

# 28. Modules

Node supports CommonJS and ES Modules.

Modern projects increasingly use ESM.

# 29. CommonJS

```js
const fs = require("node:fs");

module.exports = {
  load,
};
```

# 30. ES Modules

```js
import fs from "node:fs";

export function load() {
}
```

Often enabled by:

```json
{
  "type": "module"
}
```

# 31. Reading imports

```js
import express from "express";
import { readFile } from "node:fs/promises";
import { loadConfig } from "./config.js";
```

Interpret them as:

```text
external package
built-in Node module
local project module
```

# 32. Built-in modules

Important examples:

```text
node:fs
node:fs/promises
node:path
node:http
node:https
node:url
node:crypto
node:os
node:process
node:child_process
node:stream
node:events
```

# 33. Files

Promises API:

```js
import { readFile, writeFile } from "node:fs/promises";

const text = await readFile("config.json", "utf8");
await writeFile("output.txt", "Hello");
```

# 34. Asynchronous programming

Node is heavily asynchronous because servers spend much of their time waiting for I/O.

# 35. Promise

```js
readFile("file.txt", "utf8")
  .then((text) => console.log(text))
  .catch((error) => console.error(error));
```

# 36. async / await

```js
async function load() {
  const text = await readFile("file.txt", "utf8");
  return text;
}
```

# 37. Error handling

```js
try {
  const result = await load();
} catch (error) {
  console.error(error);
}
```

# 38. throw

```js
throw new Error("Invalid configuration");
```

# 39. Event loop

Mental model:

```text
JavaScript execution
↓
async I/O delegated to runtime/OS
↓
completion queued
↓
event loop
↓
callback / Promise continuation
```

Avoid blocking the main thread with long CPU-heavy work.

# 40. process

```js
process.argv
process.env
process.cwd()
process.pid
process.exitCode
```

# 41. Environment variables

```js
const port = process.env.PORT ?? "3000";
```

On Linux:

```bash
PORT=8080 node src/server.js
```

# 42. .env

Many projects use a library or framework feature to load a `.env` file.

Example:

```env
PORT=8080
DATABASE_URL=postgres://...
API_KEY=...
```

Do not commit production secrets.

# 43. Running a cloned project

Typical first attempt:

```bash
git clone REPO
cd REPO
cat README.md
cat package.json
npm ci
npm test
npm run build
npm start
```

Follow the project's actual scripts rather than assuming names.

# 44. Finding the entry point

Look at:

- scripts in package.json,
- `main`,
- `exports`,
- `bin`,
- framework config.

Example:

```json
"scripts": {
  "start": "node src/server.js"
}
```

Entry point:

```text
src/server.js
```

# 45. Reading a Node project

1. package.json,
2. README,
3. entry point,
4. configuration,
5. routes,
6. controllers/handlers,
7. services,
8. data layer,
9. external APIs,
10. tests.

# 46. Typical Express architecture

```text
src/
├── server.js
├── routes/
├── controllers/
├── services/
├── repositories/
├── middleware/
└── config/
```

Do not assume every project needs all these layers.

# 47. routes

Routes map HTTP method/path to handler logic.

```js
router.get("/users/:id", getUser);
```

# 48. controllers

Controllers translate HTTP requests into service calls and responses.

# 49. services

Services contain application/business logic.

# 50. models / repositories

They represent persistent data and database operations.

# 51. middleware

Express-style middleware:

```js
function requestLogger(req, res, next) {
  console.log(req.method, req.url);
  next();
}
```

Mental model:

```text
request
↓
middleware
↓
middleware
↓
route handler
↓
response
```

# 52. req and res

Typical Express handler:

```js
app.get("/hello", (req, res) => {
  res.json({ message: "hello" });
});
```

# 53. URL parameters

```text
/users/42
```

```js
req.params.id
```

# 54. Query string

```text
/search?q=node&page=2
```

```js
req.query.q
```

# 55. Request body

With JSON body parsing enabled:

```js
req.body
```

Always validate input.

# 56. HTTP status

```js
res.status(201).json(data);
res.status(404).json({ error: "Not found" });
```

# 57. Backend Node and frontend

They may live in one repository or separate repositories.

Common pattern:

```text
browser
↓
frontend
↓ HTTP/JSON
Node backend
↓
database
```

# 58. Does Node.js compile?

Plain Node JavaScript normally runs directly.

But projects may have a build step because they use:

- TypeScript,
- bundling,
- frontend assets,
- code generation,
- transpilation.

# 59. TypeScript

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

TypeScript is checked/transformed before Node executes the resulting JavaScript, unless a runtime/tool explicitly supports TS.

# 60. tsconfig.json

Defines compiler options such as target, module format, source maps, strictness and output directory.

# 61. Build project

```bash
npm run build
```

Always inspect package.json to learn what that actually means.

# 62. Development vs production

Development may use:

- watch mode,
- source maps,
- hot reload,
- verbose logging.

Production should use:

- stable start command,
- controlled environment,
- service manager/container,
- proper logs,
- health checks.

# 63. NODE_ENV

```bash
NODE_ENV=production node dist/server.js
```

Libraries may change behaviour based on NODE_ENV.

Do not treat it as your only configuration mechanism.

# 64. Watch mode

Modern Node supports:

```bash
node --watch src/server.js
```

Other projects use nodemon or framework-specific dev servers.

# 65. Simple debugging

```js
console.log(value);
console.dir(object, { depth: null });
```

# 66. Node debugger

```bash
node --inspect src/server.js
```

Then attach browser DevTools or an IDE debugger.

# 67. debugger statement

```js
debugger;
```

Execution pauses when a debugger is attached.

# 68. Stack traces

Read the first relevant application frame and follow the chain.

Do not focus only on the top framework-internal line.

# 69. Linting

Common choice:

```text
ESLint
```

# 70. Formatting

Common choice:

```text
Prettier
```

Follow repository configuration.

# 71. Tests

Popular options:

- built-in `node:test`,
- Vitest,
- Jest,
- framework-specific tools.

# 72. Built-in Node test runner

```js
import test from "node:test";
import assert from "node:assert/strict";

test("add", () => {
  assert.equal(2 + 3, 5);
});
```

Run:

```bash
node --test
```

# 73. Finding tests

Look for:

```text
test/
tests/
*.test.js
*.spec.js
```

and package.json scripts.

# 74. Important ecosystem tools

Express — minimal web framework.

Fastify — fast web framework with plugin/schema ecosystem.

NestJS — strongly structured framework.

Vite — frontend build/dev tool.

React / Vue / Angular — frontend ecosystems.

Prisma / Sequelize / Drizzle — database tooling/ORM layers.

# 75. JSON

Native:

```js
JSON.parse(text);
JSON.stringify(data);
```

# 76. npm, yarn and pnpm

All are package managers.

Use the one indicated by the repository lockfile:

```text
package-lock.json → npm
yarn.lock         → yarn
pnpm-lock.yaml    → pnpm
```

# 77. Corepack

Corepack can manage package-manager versions for supported tools where the project uses it.

# 78. Recognising project technology

Express clues:

```text
express
app.get
router
```

React:

```text
react
jsx/tsx
useState
```

Vue:

```text
vue
.vue files
```

Angular:

```text
@angular/*
angular.json
```

Vite:

```text
vite.config.*
```

Next.js:

```text
next
next.config.*
app/ or pages/
```

NestJS:

```text
@nestjs/*
@Module
@Controller
@Injectable
```

# 79. What npm run build really does

Whatever package.json says.

Examples:

```json
"build": "tsc"
```

or:

```json
"build": "vite build"
```

or:

```json
"build": "next build"
```

Never assume.

# 80. Production environment

A Node backend typically needs:

- correct Node version,
- production dependencies,
- configuration/secrets,
- database connectivity,
- listening port,
- reverse proxy,
- service supervision,
- logs,
- health checks.

# 81. Simple Debian deployment

Example layout:

```text
/srv/myapp/
├── package.json
├── package-lock.json
├── dist/
└── .env
```

Install/build:

```bash
npm ci
npm run build
```

Start using systemd or Docker rather than an interactive shell.

# 82. Do not run production from a terminal

Bad:

```bash
node server.js
```

inside an SSH session that must remain open.

Use systemd, Docker or another supervisor.

# 83. systemd

Example:

```ini
[Unit]
Description=Node application
After=network.target

[Service]
Type=simple
User=myapp
Group=myapp
WorkingDirectory=/srv/myapp
Environment=NODE_ENV=production
EnvironmentFile=/etc/myapp/myapp.env
ExecStart=/usr/bin/node /srv/myapp/dist/server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

# 84. Start systemd service

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now myapp
systemctl status myapp
journalctl -u myapp -f
```

# 85. nginx reverse proxy

```nginx
server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Bind the Node app to localhost when nginx is the only public entry point.

# 86. Application port

Find it in:

- environment variables,
- config files,
- source code,
- README.

Search:

```bash
rg 'PORT|listen\('
```

# 87. PM2

PM2 is a Node process manager used in some projects.

It can supervise processes and handle logs/restarts.

On a simple Linux server, systemd is often enough.

# 88. Docker deployment

Typical Dockerfile:

```dockerfile
FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

CMD ["node", "src/server.js"]
```

For TypeScript/build projects, use a multi-stage build.

# 89. Multi-stage Docker build

```dockerfile
FROM node:22-bookworm-slim AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-bookworm-slim

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

CMD ["node", "dist/server.js"]
```

# 90. .dockerignore

```dockerignore
node_modules
.git
.env
npm-debug.log
coverage
```

# 91. Static frontend deployment

If a Vite/React/Vue build produces static files:

```text
dist/
```

Node may not be needed in production at all.

Serve dist through nginx/CDN/static hosting.

# 92. Typical backend deployment

```text
source
↓
npm ci
↓
tests
↓
npm run build
↓
production install/artifact
↓
systemd or container
↓
nginx
```

# 93. Manual update

```bash
cd /srv/myapp
git pull --ff-only
npm ci
npm test
npm run build
sudo systemctl restart myapp
systemctl status myapp
```

For serious deployments, build artifacts in CI and support rollback.

# 94. Simple deploy script

```bash
#!/usr/bin/env bash
set -euo pipefail

cd /srv/myapp
git pull --ff-only
npm ci
npm test
npm run build
sudo systemctl restart myapp
```

Use deployment users and permissions carefully.

# 95. CI/CD

Typical pipeline:

```text
push
↓
npm ci
↓
lint/test
↓
build
↓
package/container
↓
deploy
```

# 96. Basic GitHub Actions

```yaml
name: CI

on:
  push:
  pull_request:

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

# 97. Logs

Application logs:

```text
stdout
stderr
```

With systemd:

```bash
journalctl -u myapp
journalctl -u myapp -f
```

Docker:

```bash
docker logs -f CONTAINER
```

# 98. Port problems

Inspect:

```bash
ss -lntp
sudo lsof -i :3000
```

Common causes:

- app not running,
- wrong port,
- wrong bind address,
- port already in use,
- firewall,
- reverse proxy mismatch.

# 99. command not found

Check:

```bash
which node
which npm
echo "$PATH"
```

For project tools, prefer npm scripts or npx over expecting global commands.

# 100. Cannot find module

Possible causes:

- npm install not run,
- wrong working directory,
- dependency missing,
- wrong import path,
- ESM/CommonJS mismatch,
- build output missing.

# 101. Wrong Node version

Check:

```bash
node --version
```

Inspect:

- README,
- package.json `engines`,
- .nvmrc,
- .node-version,
- CI configuration.

# 102. engines

Example:

```json
"engines": {
  "node": ">=22"
}
```

This documents expected runtime compatibility.

# 103. ESM problems

Common issues:

- missing file extension in relative ESM imports,
- using `require` inside ESM,
- package not exporting requested path,
- wrong `type` field.

# 104. .env problems

Check:

- file exists,
- correct working directory,
- loader called before values are read,
- systemd/Docker environment is configured,
- variable names match.

# 105. Deployment troubleshooting

Start from facts:

```bash
node --version
npm --version
npm ci
npm run build
systemctl status myapp
journalctl -u myapp -n 100
ss -lntp
curl -v http://127.0.0.1:3000/health
```

# 106. curl for backend testing

```bash
curl -I http://127.0.0.1:3000/
curl -v http://127.0.0.1:3000/health
```

POST:

```bash
curl -X POST   -H 'Content-Type: application/json'   -d '{"name":"Alice"}'   http://127.0.0.1:3000/api/users
```

# 107. Security

Keep Node and dependencies patched.

Validate input.

Use parameterized database queries.

Protect secrets.

Use HTTPS.

Run as a non-root service user where practical.

# 108. npm scripts can run arbitrary code

Installing packages can execute lifecycle scripts.

Treat unknown dependencies/repositories as code you are running, not as passive data.

# 109. Lifecycle scripts

Examples include:

```text
preinstall
install
postinstall
prepare
```

# 110. Install without scripts

For inspection/testing scenarios:

```bash
npm ci --ignore-scripts
```

Some legitimate packages need install scripts, so this may break them.

# 111. package.json quick audit

Check:

- scripts,
- dependencies,
- devDependencies,
- type,
- engines,
- bin,
- workspaces,
- package manager,
- main/exports.

# 112. Other files you may see

```text
tsconfig.json
vite.config.js
eslint.config.js
next.config.js
nest-cli.json
prisma/
docker-compose.yml
compose.yaml
Dockerfile
.env.example
```

# 113. docker compose

Typical backend + DB:

```yaml
services:
  app:
    build: .
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      DATABASE_URL: postgres://app:secret@db/app
    depends_on:
      - db

  db:
    image: postgres:17
```

# 114. Databases

Common choices:

- PostgreSQL,
- MySQL/MariaDB,
- SQLite,
- MongoDB.

Node does not prescribe a database.

# 115. Migrations

Migrations version schema changes.

Run them as a controlled deployment step.

Do not assume every app can automatically migrate safely on startup.

# 116. Prisma

Prisma provides schema tooling, migrations and a generated database client.

# 117. Middleware

Think of middleware as a pipeline around requests.

Common uses:

- authentication,
- logging,
- CORS,
- parsing,
- validation,
- rate limiting.

# 118. Callbacks

Classic Node style:

```js
fs.readFile(path, (error, data) => {
  if (error) {
    ...
    return;
  }

  ...
});
```

Promises/async-await are now often easier to read.

# 119. Classes

```js
class UserService {
  constructor(repository) {
    this.repository = repository;
  }
}
```

# 120. this

`this` depends on how a function is called.

Arrow functions do not bind their own `this`.

# 121. Import aliases

Build tools/TypeScript may define aliases:

```js
import { config } from "@/config";
```

Check tsconfig/bundler config to resolve them.

# 122. Barrel files

An `index.js` may re-export a directory API:

```js
export { UserService } from "./user-service.js";
export { UserRepository } from "./user-repository.js";
```

# 123. Reading a function

Ask:

- what are inputs?
- what does it return?
- is it async?
- what external state does it touch?
- what can throw?
- what I/O occurs?

# 124. Reading a larger function

Split mentally into:

```text
validate
↓
load
↓
transform
↓
save
↓
return
```

# 125. Finding function origin

Use editor “Go to definition” or:

```bash
rg 'functionName'
rg 'export .*functionName'
```

# 126. Finding uses

```bash
rg 'functionName\('
```

IDE references are even better.

# 127. rg

```bash
rg 'DATABASE_URL'
rg 'app\.listen'
rg 'router\.'
```

# 128. find

```bash
find . -maxdepth 3 -type f | sort
```

# 129. tree

```bash
tree -L 3
```

# 130. npm ls

```bash
npm ls
npm ls express
```

# 131. npm explain

```bash
npm explain PACKAGE
```

Shows why a dependency exists.

# 132. npm view

```bash
npm view express version
npm view express engines
```

# 133. Global packages

```bash
npm list -g --depth=0
```

Avoid relying on globally installed project dependencies.

# 134. CLI tools in Node

package.json:

```json
"bin": {
  "mytool": "./bin/mytool.js"
}
```

CLI file may start with:

```js
#!/usr/bin/env node
```

# 135. Streams

Streams process data incrementally.

Important for large files, network I/O and pipelines.

```js
readable.pipe(writable);
```

# 136. Buffer

Buffer represents binary data.

```js
const data = Buffer.from("hello");
```

# 137. EventEmitter

```js
import { EventEmitter } from "node:events";

const events = new EventEmitter();

events.on("ready", () => {
  console.log("ready");
});

events.emit("ready");
```

# 138. HTTP without a framework

```js
import http from "node:http";

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify({ status: "ok" }));
});

server.listen(3000);
```

# 139. fetch in Node

Modern Node provides fetch:

```js
const response = await fetch("https://example.com/api");
const data = await response.json();
```

# 140. REST APIs

Typical patterns:

```text
GET    /users
GET    /users/:id
POST   /users
PATCH  /users/:id
DELETE /users/:id
```

Use HTTP semantics deliberately.

# 141. WebSocket

Useful for long-lived bidirectional connections such as realtime updates.

Libraries often handle protocol details.

# 142. worker_threads

For CPU-heavy JavaScript work, worker threads can move work off the main event loop.

Do not use them for ordinary I/O.

# 143. child_process

```js
import { execFile } from "node:child_process";
```

Prefer argument arrays and avoid shell interpolation with untrusted input.

# 144. Security traps

Watch for:

- command injection,
- path traversal,
- unsafe deserialization,
- SSRF,
- SQL injection,
- weak auth,
- exposed secrets,
- vulnerable dependencies,
- XSS in generated HTML.

# 145. Validation and sanitization

Validation asks whether data is acceptable.

Sanitization transforms data into a safer form.

Do not confuse the two.

# 146. CORS

CORS controls browser-origin access.

It is not authentication.

# 147. JWT

JWT is one token format.

Validate signature, issuer, audience and expiration.

Do not choose JWT automatically for every application.

# 148. Sessions

Classic server-side sessions with secure cookies are often a simple and strong choice for web applications.

# 149. Password hashing

Use established libraries implementing Argon2id, bcrypt or scrypt.

Never store plaintext passwords.

# 150. Semantic versioning

```text
MAJOR.MINOR.PATCH
```

Major = breaking.

Minor = compatible features.

Patch = compatible fixes.

# 151. ESM file extensions

Relative imports normally include extensions:

```js
import { load } from "./config.js";
```

# 152. npm cache

```bash
npm cache verify
```

Cache corruption is less common than many people assume; diagnose before deleting it.

# 153. Memory leaks

Watch:

- unbounded caches,
- event listeners never removed,
- timers never cleared,
- retained large objects,
- queues that only grow.

Inspect process memory and use profiling tools if needed.

# 154. NODE_OPTIONS

Example:

```bash
NODE_OPTIONS="--max-old-space-size=2048" node app.js
```

Use deliberately, not as a first response to every memory issue.

# 155. Exit code

```js
process.exitCode = 1;
```

Prefer allowing cleanup rather than calling `process.exit()` abruptly when possible.

# 156. Signals

Common Linux signals:

```text
SIGTERM
SIGINT
```

# 157. Graceful shutdown

```js
process.on("SIGTERM", async () => {
  server.close(async () => {
    await database.close();
  });
});
```

Production services should stop accepting traffic and close resources cleanly.

# 158. Lockfile and repository security

Commit lockfiles.

Review dependency changes.

Use Dependabot/Renovate or equivalent tooling where appropriate.

# 159. Monorepos

One repository can contain many packages/apps.

# 160. Workspaces

npm workspaces:

```json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

# 161. Running workspace scripts

```bash
npm run build --workspace apps/web
```

# 162. Source maps

Source maps map built/minified code back to original sources for debugging.

Protect production source maps according to your threat/model requirements.

# 163. dist

`dist/` commonly contains generated production output.

Do not assume it is source of truth.

# 164. public / static

Often holds assets copied/served without bundling.

Meaning depends on framework.

# 165. Template engines

Examples:

- EJS,
- Pug,
- Handlebars.

They render HTML on the server.

# 166. Next.js

React framework that can provide:

- routing,
- SSR,
- static generation,
- server components,
- backend/server functionality.

A Next.js production deployment often needs Node or a compatible platform, unless the project is fully statically exported.

# 167. SSR

Server-Side Rendering produces HTML on the server.

# 168. SPA

Single Page Application renders much of its UI client-side after initial load.

# 169. Does production need Node?

Ask what the build produces.

If:

```text
dist/index.html
dist/assets/*
```

and the app is fully static, Node may only be needed to build.

If the application has server routes/SSR/API handlers, Node may be required at runtime.

# 170. Order for analyzing an unfamiliar repo

1. README,
2. package.json,
3. lockfile,
4. Node version,
5. scripts,
6. entry points,
7. env variables,
8. database,
9. external APIs,
10. build output,
11. deployment files,
12. tests.

# 171. First commands after clone

```bash
git status
cat package.json
node --version
npm --version
npm ci
npm test
npm run build
```

Do not run unknown install scripts blindly if you do not trust the repository.

# 172. Audit without running code

Inspect:

```bash
cat package.json
rg 'process\.env'
rg 'listen\('
rg 'DATABASE|postgres|mysql|sqlite|mongo'
rg 'fetch\(|axios|http'
find . -maxdepth 2 -type f | sort
```

# 173. Find environment variables

```bash
rg 'process\.env'
```

# 174. Find port

```bash
rg 'PORT|listen\('
```

# 175. Find endpoints

Express-like:

```bash
rg 'app\.(get|post|put|patch|delete)'
rg 'router\.(get|post|put|patch|delete)'
```

# 176. Find database

Search package.json and source for:

```text
pg
postgres
mysql
sqlite
mongoose
prisma
sequelize
drizzle
```

# 177. Find external APIs

Search for:

```text
fetch(
axios
https.request
API_URL
BASE_URL
```

# 178. Read the stack from package.json

Dependencies often reveal the architecture faster than random source reading.

# 179. How not to read Node projects

Do not start by reading every file linearly.

Do not start inside node_modules.

Do not assume `src/index.js` is the entry point without checking scripts.

# 180. Important file extensions

```text
.js
.mjs
.cjs
.ts
.tsx
.jsx
.json
.yaml
.yml
```

# 181. JSX

JSX embeds UI syntax inside JavaScript/TypeScript.

It normally requires a build tool/framework.

# 182. CSS imports

Frontend bundlers may allow:

```js
import "./style.css";
```

Plain Node does not interpret CSS as executable code.

# 183. Dynamic import

```js
const module = await import("./feature.js");
```

# 184. JSON import

Support depends on Node version/module rules.

Often it is simpler and more portable to read JSON explicitly when uncertain.

# 185. top-level await

ES Modules can use await at module top level in supported Node versions.

Use it carefully because it affects module initialization.

# 186. main pattern

```js
async function main() {
  ...
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

This creates an explicit startup boundary.

# 187. Dependency injection

Pass dependencies into services rather than importing hidden global instances everywhere.

```js
const service = new UserService(repository, logger);
```

# 188. Repository

Repository layer hides data persistence details.

# 189. Controller

Controller/handler converts HTTP input to service calls and service results to HTTP responses.

# 190. Service

Service contains application logic.

# 191. Config

Centralize validated configuration.

Fail early when required variables are missing.

# 192. Feature flags

Feature flags enable/disable behaviour without branching deployment code.

Treat them as configuration with lifecycle and ownership.

# 193. Request logging

Log:

- method,
- path,
- status,
- duration,
- request ID.

Avoid logging secrets and sensitive payloads.

# 194. Health endpoint

```text
GET /health
```

Example:

```json
{"status":"ok"}
```

# 195. Healthcheck from shell

```bash
curl -fsS http://127.0.0.1:3000/health
```

# 196. npm start in production

Only use it if package.json defines a real production start command.

# 197. Dev server is not a production server

Tools such as Vite dev server are designed for development.

Build static assets or use the framework's documented production runtime.

# 198. Minimal production workflow

```text
known Node version
↓
npm ci
↓
test
↓
build
↓
deploy artifact
↓
service manager/container
↓
reverse proxy
↓
health check
```

# 199. Rollback

Keep a previous working release/image.

Rollback should be faster than debugging a broken production deployment live.

# 200. Production dependencies

For projects where runtime does not need dev dependencies:

```bash
npm ci --omit=dev
```

But build first if the build needs devDependencies.

# 201. Separate build from deploy

Strong model:

```text
CI:
install → test → build → artifact/image

server:
receive artifact/image → configure → start
```

This reduces “works on server because it built differently” problems.

# 202. Node in Docker — mental model

```text
host Linux
↓
Docker
↓
Node runtime
↓
your app
↓
database / external services
```

# 203. Docker volumes

Use volumes for persistent database/uploads where appropriate.

Do not treat the container filesystem as permanent storage.

# 204. Node and SQLite

SQLite can be excellent for small single-instance applications.

Place the database file in persistent storage and understand locking/backups.

# 205. Node as developer tooling

Many frontend projects require Node only for:

- npm,
- Vite,
- TypeScript,
- bundling,
- tests.

The final deployment may be static HTML/CSS/JS.

# 206. Minimum syntax to recognize

```js
const
let
{}
[]
function
() => {}
async
await
try/catch
import/export
?. 
??
...
map/filter/find
```

# 207. Mental model of async function

```text
call async function
↓
returns Promise
↓
await pauses this function
↓
event loop continues other work
↓
Promise settles
↓
function resumes
```

# 208. Mental model of import

```text
module A
↓ imports
module B
↓ imports
module C
```

Imports build the dependency graph.

# 209. Mental model of middleware

```text
request
↓
middleware A
↓
middleware B
↓
handler
↓
response
```

# 210. Mental model of callback

```text
give function to another API
↓
API calls it later
```

# 211. Mental model of map

```text
array of A
↓ transform each
array of B
```

# 212. Mental model of filter

```text
array
↓ keep matching values
smaller array
```

# 213. Mental model of destructuring

```text
object/array
↓ extract selected values
variables
```

# 214. Mental model of spread

```text
copy/expand elements or properties
```

# 215. Checklist: unfamiliar Node repo

- read README,
- inspect package.json,
- identify package manager,
- identify Node version,
- inspect scripts,
- inspect env variables,
- inspect database,
- identify entry point,
- install reproducibly,
- run tests,
- run build,
- understand deployment.

# 216. Checklist: Debian deployment

- dedicated service user,
- correct Node version,
- source/artifact under /srv,
- secrets outside repo,
- npm ci/build,
- systemd or Docker,
- localhost binding,
- nginx reverse proxy,
- TLS,
- health endpoint,
- logs,
- backup where persistent data exists.

# 217. Checklist: something is broken

1. check process,
2. check logs,
3. check Node version,
4. check dependencies,
5. check env,
6. check port,
7. curl localhost,
8. check nginx,
9. check DNS/TLS,
10. check database/external APIs.

# 218. Important Node/npm commands

```bash
node --version
npm --version
npm install
npm ci
npm test
npm run
npm run dev
npm run build
npm start
npm ls
npm explain PACKAGE
npm outdated
```

# 219. Deployment commands

```bash
systemctl status myapp
journalctl -u myapp -f
ss -lntp
curl -fsS http://127.0.0.1:3000/health
sudo systemctl restart myapp
sudo nginx -t
sudo systemctl reload nginx
```

# 220. Important questions when analyzing a project

- What Node version?
- Which package manager?
- What starts the app?
- What does build produce?
- Which env variables are required?
- Which port?
- Which database?
- Which external APIs?
- Where are logs?
- How is it deployed?
- How are migrations run?
- What is persistent?

# 221. Example project analysis

Given:

```json
{
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "node dist/server.js",
    "build": "tsc"
  },
  "dependencies": {
    "express": "^5.0.0",
    "pg": "^8.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

You can infer:

```text
Node backend
Express HTTP server
PostgreSQL
TypeScript build
production starts dist/server.js
```

# 222. Example deployment

```bash
npm ci
npm test
npm run build
NODE_ENV=production npm prune --omit=dev
sudo systemctl restart myapp
curl -fsS http://127.0.0.1:3000/health
```

# 223. Node.js vs Go

Node:

- JavaScript ecosystem,
- excellent web tooling,
- dynamic language,
- runtime required.

Go:

- compiled static typing,
- simple binaries,
- strong concurrency model,
- often simpler production deployment.

# 224. Node.js vs JavaScript

```text
JavaScript = language
Node.js    = runtime for JavaScript outside browser
```

# 225. What you really need to remember

Understand:

- package.json,
- lockfiles,
- npm ci,
- scripts,
- imports/modules,
- async/await,
- process.env,
- entry points,
- build output,
- service supervision,
- logs,
- ports,
- deployment boundaries.

# 226. Five-minute repository analysis

```bash
cat package.json
node --version
find . -maxdepth 2 -type f | sort | head -100
rg 'process\.env'
rg 'listen\('
rg 'DATABASE|postgres|mysql|sqlite|mongo'
```

# 227. Syntax cheat sheet

```js
const value = 1;
let count = 0;

const user = { name: "Alice" };
const items = [1, 2, 3];

const names = users.map((u) => u.name);

async function load() {
  const response = await fetch(url);
  return response.json();
}
```

# 228. Deployment cheat sheet

```text
clone/artifact
↓
correct Node
↓
npm ci
↓
test
↓
build
↓
service/container
↓
nginx
↓
health check
```

# 229. Learn later

Once the basics are natural, explore:

- streams in depth,
- worker threads,
- profiling,
- advanced ESM,
- package publishing,
- monorepo tooling,
- observability,
- distributed tracing,
- queue systems,
- framework internals.

# 230. Final mental model

```text
package.json tells you HOW
source tells you WHAT
env tells you WITH WHICH CONFIG
lockfile tells you WHICH DEPENDENCIES
build tells you WHAT GOES TO PRODUCTION
systemd/Docker tells you HOW IT STAYS RUNNING
nginx tells you HOW TRAFFIC REACHES IT
logs tell you WHY IT FAILED
```
