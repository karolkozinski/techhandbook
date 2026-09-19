# Node.js — Reading, Running and Deploying Projects

## 1. What Node.js is

Node.js is a JavaScript runtime built for running JavaScript outside the browser.

It provides APIs for:

- files,
- processes,
- networking,
- HTTP servers,
- streams,
- operating-system interaction.

Node.js uses the V8 JavaScript engine and an event-driven runtime.

It is not a frontend framework.

## 2. Node.js vs browser JavaScript

Browser:

- DOM,
- `document`,
- `window`,
- browser storage,
- browser security model.

Node.js:

- filesystem,
- process environment,
- server sockets,
- child processes,
- server-side modules.

Some standard JavaScript works in both, but platform APIs differ.

## 3. Check installation

```bash
node --version
npm --version
```

Run code:

```bash
node app.js
```

Interactive REPL:

```bash
node
```

Exit:

```text
Ctrl+D
```

or:

```js
.exit
```

## 4. First program

```js
console.log("Hello from Node.js");
```

Run:

```bash
node app.js
```

## 5. package.json

A Node project commonly has:

```text
package.json
```

Example:

```json
{
  "name": "example-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node src/server.js",
    "test": "node --test"
  }
}
```

It describes:

- project metadata,
- scripts,
- dependencies,
- module mode,
- engine requirements.

## 6. npm

Install dependencies:

```bash
npm install
```

Clean reproducible CI install:

```bash
npm ci
```

Add dependency:

```bash
npm install express
```

Development dependency:

```bash
npm install --save-dev eslint
```

Remove:

```bash
npm uninstall express
```

## 7. package-lock.json

npm's lock file records the resolved dependency graph.

Commit it for normal applications.

Use:

```bash
npm ci
```

in CI/deployment when you want the locked dependency set.

## 8. node_modules

Installed packages are usually stored under:

```text
node_modules/
```

Do not commit this directory.

Add:

```gitignore
node_modules/
```

## 9. npm scripts

If `package.json` contains:

```json
{
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "node src/server.js",
    "test": "node --test"
  }
}
```

run:

```bash
npm run dev
npm start
npm test
```

Read scripts before guessing how a project runs.

## 10. ES modules

Modern module syntax:

```js
import fs from "node:fs";
export function load() {}
```

A project may declare:

```json
{
  "type": "module"
}
```

or use `.mjs`.

## 11. CommonJS

Older Node syntax:

```js
const fs = require("fs");

module.exports = {
  load
};
```

CommonJS and ES modules have different semantics.

Do not casually mix them.

## 12. Core modules

Common built-in modules:

```text
node:fs
node:path
node:http
node:https
node:url
node:os
node:crypto
node:stream
node:events
node:child_process
node:process
```

Built-ins do not need `npm install`.

## 13. Filesystem

Promises API:

```js
import { readFile } from "node:fs/promises";

const text = await readFile("config.json", "utf8");
```

Write:

```js
import { writeFile } from "node:fs/promises";

await writeFile("out.txt", "hello\n");
```

## 14. Paths

```js
import path from "node:path";

const file = path.join("data", "items.json");
```

Use path utilities rather than hardcoding `/` or `\` where portability matters.

## 15. process

Arguments:

```js
console.log(process.argv);
```

Environment:

```js
console.log(process.env.PORT);
```

Exit:

```js
process.exitCode = 1;
```

Prefer setting `exitCode` when normal cleanup should still occur.

## 16. Environment variables

Shell:

```bash
PORT=8080 node src/server.js
```

Code:

```js
const port = Number(process.env.PORT ?? 8080);
```

Validate important configuration on startup.

## 17. .env

Many projects use a local `.env` file through framework/tool support.

Do not commit real secrets.

Typical:

```gitignore
.env
.env.local
```

Commit:

```text
.env.example
```

with non-secret placeholders.

## 18. Asynchronous I/O

Node.js is designed around non-blocking I/O.

Example:

```js
const data = await readFile("data.json", "utf8");
```

While waiting on I/O, Node can handle other events.

CPU-heavy JavaScript still blocks the main event loop.

## 19. Promises

```js
readFile("data.json", "utf8")
  .then((text) => JSON.parse(text))
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

Modern code commonly uses async/await.

## 20. async / await

```js
async function loadConfig() {
  const text = await readFile("config.json", "utf8");
  return JSON.parse(text);
}
```

Errors are handled with `try/catch` or by letting the Promise reject upward.

## 21. Event loop

Node runs JavaScript primarily on one event-loop thread.

This works well for:

- network services,
- many concurrent I/O operations.

It is less ideal for long CPU-bound work on the main thread.

For CPU-heavy tasks, consider:

- worker threads,
- child processes,
- separate services,
- native/other language tooling where appropriate.

## 22. HTTP server without a framework

```js
import http from "node:http";

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "content-type": "text/plain; charset=utf-8"
  });
  res.end("hello\n");
});

server.listen(8080);
```

Node can build servers without Express.

## 23. Express

A common web framework:

```js
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(8080);
```

Express is simple and mature, but not mandatory.

## 24. Other web frameworks

You may encounter:

- Fastify,
- Koa,
- Hapi,
- NestJS.

NestJS is a much more structured application framework with dependency injection and decorators.

Choose according to project complexity.

## 25. JSON API

With Express:

```js
app.use(express.json());

app.post("/api/items", (req, res) => {
  console.log(req.body);
  res.status(201).json({ ok: true });
});
```

Always validate untrusted input.

## 26. Middleware

Middleware runs in the request pipeline.

Example uses:

- logging,
- authentication,
- parsing,
- rate limiting,
- CORS,
- error handling.

Concept:

```text
request
→ middleware
→ middleware
→ route
→ response
```

## 27. Error handling

Do not silently ignore rejected Promises.

At process level, unhandled failures should be logged and the service should fail predictably rather than remain in an unknown state.

Frameworks have their own error-handling conventions.

## 28. Streams

Streams process data in chunks.

Useful for:

- large files,
- HTTP bodies,
- compression,
- pipes.

Example:

```js
import fs from "node:fs";

fs.createReadStream("large.bin")
  .pipe(fs.createWriteStream("copy.bin"));
```

## 29. Events

Node has an EventEmitter abstraction.

```js
import { EventEmitter } from "node:events";

const bus = new EventEmitter();

bus.on("ready", () => {
  console.log("ready");
});

bus.emit("ready");
```

Useful internally, but avoid creating an invisible event maze.

## 30. child_process

Run external programs carefully.

```js
import { execFile } from "node:child_process";
```

Prefer `execFile`/argument arrays when possible rather than building shell command strings from user input.

Shell injection is a real risk.

## 31. TypeScript

Many modern Node projects use TypeScript.

Example:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

The project may compile with:

```bash
npm run build
```

into:

```text
dist/
```

Read `package.json` and `tsconfig.json`.

## 32. Build step

Plain Node JavaScript may need no compilation.

A project may still have a build step for:

- TypeScript,
- bundling,
- code generation,
- native addons,
- frontend assets.

Do not assume every Node project is “compiled” in the same way.

## 33. Native addons

Some dependencies include native C/C++ code.

Then installation may require:

- compiler toolchain,
- Python for node-gyp,
- platform-specific libraries.

Errors mentioning `node-gyp`, compiler, or headers usually mean a native dependency is being built.

## 34. Version management

Projects may specify a required Node version in:

- `package.json` `engines`,
- `.nvmrc`,
- `.node-version`,
- Volta configuration.

Use the version the project expects.

Version managers include:

- nvm,
- fnm,
- asdf,
- Volta.

## 35. Testing

Node includes a built-in test runner:

```bash
node --test
```

Projects may use:

- Vitest,
- Jest,
- Mocha,
- Ava.

Run the project's documented script:

```bash
npm test
```

## 36. Linting and formatting

Common:

- ESLint,
- Prettier,
- Biome.

Scripts might be:

```bash
npm run lint
npm run format
```

## 37. Security audit

npm:

```bash
npm audit
```

This reports known vulnerabilities in dependencies.

Review impact rather than blindly accepting every automatic fix.

## 38. Dependency updates

Check:

```bash
npm outdated
```

Update deliberately.

Major-version changes may break APIs.

Dependabot/Renovate can automate update PRs.

## 39. Lock-file discipline

Do not randomly switch between npm, Yarn, and pnpm in the same project.

Each has its own lock file and resolution behavior.

Use the package manager selected by the project.

## 40. npm, pnpm, Yarn

Common package managers:

```text
npm
pnpm
Yarn
```

`pnpm` stores packages more efficiently through a content-addressed store and linking model.

The project lock file usually tells you what it expects.

## 41. Project structure

Simple backend:

```text
project/
├── package.json
├── package-lock.json
├── src/
│   ├── server.js
│   ├── routes/
│   ├── services/
│   └── db/
├── test/
├── .env.example
└── README.md
```

There is no single required structure.

## 42. Databases

Popular choices include:

- PostgreSQL,
- MySQL,
- SQLite,
- MongoDB.

Libraries may be:

- low-level drivers,
- query builders,
- ORMs.

Examples you may encounter:

- pg,
- Prisma,
- Drizzle,
- Knex,
- Sequelize,
- Mongoose.

Do not choose an ORM before understanding the data model and query requirements.

## 43. PostgreSQL

Low-level `pg` example concept:

```js
const result = await pool.query(
  "SELECT id, name FROM users WHERE id = $1",
  [id]
);
```

Use parameterized queries.

Never concatenate untrusted input into SQL.

## 44. Logging

For small apps, `console` may be enough initially.

Larger services often use structured loggers such as:

- Pino,
- Winston.

Logs should include useful context and avoid secrets.

## 45. Configuration

Validate configuration at startup.

Bad:

```js
const port = process.env.PORT;
```

with no checks.

Better:

```js
const port = Number(process.env.PORT ?? 8080);

if (!Number.isInteger(port)) {
  throw new Error("PORT must be an integer");
}
```

## 46. Graceful shutdown

A server should react to termination signals:

```js
process.on("SIGTERM", async () => {
  server.close(() => {
    process.exitCode = 0;
  });
});
```

Also close:

- DB pools,
- queues,
- background workers.

## 47. Running in production

Do not use:

```bash
node server.js
```

inside a random SSH shell and expect it to survive logout.

Use:

- systemd,
- Docker,
- another process supervisor/platform.

## 48. systemd

Example concept:

```ini
[Service]
User=myapp
WorkingDirectory=/srv/myapp
ExecStart=/usr/bin/node /srv/myapp/src/server.js
Restart=on-failure
Environment=NODE_ENV=production
```

Then use:

```bash
systemctl
journalctl
```

for operation.

## 49. PM2

PM2 is a Node-specific process manager you may encounter.

It can provide:

- restarts,
- logs,
- clustering,
- startup integration.

On a normal Linux server, systemd or containers may already solve the process-management problem.

Do not add two supervisors unless necessary.

## 50. Docker

A simple Dockerfile:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

USER node

CMD ["node", "src/server.js"]
```

For TypeScript/build steps, use a multi-stage build.

## 51. Multi-stage Node build

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
USER node
CMD ["node", "dist/server.js"]
```

Adapt to the project's actual scripts.

## 52. Reverse proxy

Typical production:

```text
Internet
  ↓
nginx :443
  ↓
Node app :3000 on localhost
```

Node does not need to handle public TLS itself when nginx/load balancer already does it.

## 53. Environment modes

Common convention:

```text
NODE_ENV=production
```

Libraries may change behavior based on it.

Do not assume it magically configures your application correctly.

## 54. Performance

Node is strong for I/O-heavy applications.

Watch:

- synchronous filesystem calls in request paths,
- CPU-heavy loops,
- huge JSON processing,
- memory leaks,
- unbounded concurrency.

Use profiling when there is a real performance problem.

## 55. Synchronous APIs

Example:

```js
readFileSync(...)
```

They block the event loop.

Fine for:

- short startup tasks,
- simple CLI tools.

Usually avoid in high-traffic request paths.

## 56. Worker threads

For CPU-heavy JavaScript:

```text
worker_threads
```

can run work on additional threads.

Do not use workers to solve ordinary async I/O.

## 57. Cluster and multiple processes

Modern deployment can scale Node by running multiple independent processes/containers behind a load balancer.

You do not need Node's older cluster model for every application.

## 58. Memory

Node has a managed heap.

Symptoms of memory problems:

- process RSS keeps increasing,
- GC pauses,
- out-of-memory crash.

Use heap snapshots/profilers when needed.

## 59. Debugging

Run with inspector:

```bash
node --inspect src/server.js
```

Then attach DevTools/VS Code.

Set breakpoints and inspect variables.

## 60. Logs and stack traces

Read the first application frames.

Example:

```text
TypeError: ...
    at loadConfig (.../config.js:42:10)
    at main (.../server.js:10:3)
```

Start at the first frame in your code.

## 61. Source maps

TypeScript/bundled output can use source maps so stack traces/debuggers refer to original source.

Ensure production tooling is configured correctly.

## 62. ESM file paths

ES modules do not provide CommonJS globals such as `__dirname` in the same way.

Modern code may derive paths using `import.meta.url`.

This is a common migration issue.

## 63. Fetch in Node

Modern Node versions include a browser-like `fetch` API.

Example:

```js
const response = await fetch("https://example.com/api");
```

Check the required Node version before assuming availability.

## 64. Web standards APIs

Modern Node supports increasing numbers of Web APIs, but browser DOM APIs are still not available.

There is no normal:

```js
document.querySelector(...)
```

in a plain Node process.

## 65. CLI tools

Node can also build CLI programs.

Read arguments:

```js
process.argv
```

Popular CLI libraries include:

- Commander,
- yargs.

For small commands, direct argument parsing may be enough.

## 66. Executable script

Unix shebang:

```js
#!/usr/bin/env node
```

Then:

```bash
chmod +x tool.js
./tool.js
```

A package can expose binaries through the `bin` field in `package.json`.

## 67. Reading an unfamiliar Node project

Start:

```bash
cat package.json
```

Look for:

- `type`,
- `scripts`,
- `dependencies`,
- `devDependencies`,
- `engines`.

Then inspect:

```text
README
src/
test/
tsconfig.json
Dockerfile
compose.yaml
.env.example
```

## 68. Basic unfamiliar-project workflow

```bash
git clone ...
cd project
node --version
npm ci
npm test
npm run build
npm start
```

Only run scripts after reading what they do.

## 69. Finding entry points

Check:

- package.json `main`,
- package.json scripts,
- `src/index.js`,
- `src/server.js`,
- framework conventions.

Search:

```bash
rg 'listen\(' src
rg 'createServer' src
```

## 70. What “compile” means in Node

Possible meanings:

1. no compile step — run JS directly,
2. transpile TypeScript,
3. bundle files,
4. compile native addons,
5. package into an executable with extra tooling.

Always inspect project scripts.

## 71. Deployment checklist

```text
[ ] correct Node version
[ ] lock file respected
[ ] npm ci succeeds
[ ] tests pass
[ ] build succeeds
[ ] secrets outside repo
[ ] process supervisor/container configured
[ ] app binds expected host/port
[ ] reverse proxy configured
[ ] logs visible
[ ] health endpoint works
[ ] backup/database plan exists
```

## 72. Common mistakes

- committing `.env`,
- deleting the lock file casually,
- mixing package managers,
- using synchronous I/O in hot paths,
- unhandled Promise rejections,
- shell injection in child processes,
- no validation of request data,
- running as root unnecessarily,
- development dependencies/tooling in production without need,
- assuming Node = frontend.

## 73. Commands to remember

```bash
node --version
npm --version
npm ci
npm install
npm test
npm run build
npm start
npm audit
npm outdated
```

## 74. Mental model

When reading Node code, ask:

```text
What is the entry point?
CommonJS or ESM?
Which Node version?
What npm scripts exist?
What listens for requests?
Where is configuration loaded?
Where are async errors handled?
Which database/client libraries are used?
How is it started in production?
```

## 75. Summary

You do not need to become a Node specialist to operate a Node project.

Learn:

```text
package.json
lock file
npm scripts
ES modules/CommonJS
async/await
process.env
HTTP framework
tests
build
production process management
```

Then the project becomes much less mysterious.
