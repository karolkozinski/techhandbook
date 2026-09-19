# small-web-apps

## 1. Goal

A small project does not need microservices, Kubernetes and five databases.

Often this is enough:

```text
Browser
  ↓
nginx
  ↓
backend
  ↓
PostgreSQL
```

## 2. Monolith

A monolith is one application containing most of the business logic.

Advantages:

- simple deployment,
- less infrastructure,
- simpler debugging,
- easier transactions.

For small and medium projects it is often the best choice.

## 3. Frontend

It may use:

- server-rendered HTML,
- static HTML/CSS/JS,
- a React/Vue SPA.

Do not choose an SPA automatically.

## 4. Backend

Responsible for logic, authentication, APIs, database access, integrations and validation.

## 5. Reverse proxy

nginx can handle TLS, domain routing, static files and proxying to the backend.

## 6. Database

PostgreSQL provides durable data, constraints, transactions and indexes.

## 7. Cache

Redis becomes useful when you have a concrete reason such as caching, sessions, queues or rate limiting.

Do not add it just because it feels expected.

## 8. Configuration

```text
code          → repository
environment   → env / config
secrets       → secret store / env
```

Keep these concerns separate.

## 9. Example Go structure

```text
cmd/
internal/
  http/
  service/
  repository/
  config/
migrations/
web/
Dockerfile
README.md
```

## 10. Layers

A practical split:

```text
handler
 ↓
service
 ↓
repository
 ↓
database
```

You do not need twelve layers.

## 11. Request flow

```text
GET /orders/42
  ↓
nginx
  ↓
router
  ↓
handler
  ↓
service
  ↓
repository
  ↓
PostgreSQL
  ↓
JSON/HTML response
```

## 12. Background jobs

For long-running work:

```text
request
 ↓
enqueue
 ↓
worker
```

But do not add a queue when a normal cron job is enough.

## 13. Cron / scheduler

Good for reports, synchronization, periodic checks and cleanup.

## 14. External APIs

Keep integration code separate:

```text
internal/integrations/openrouter
internal/integrations/github
```

This makes testing and provider changes easier.

## 15. Error handling

Differentiate user errors, missing resources, conflicts and system failures.

Do not return HTTP 500 for everything.

## 16. Logging

Useful logs contain timestamp, level, event, request ID and relevant context.

## 17. Request ID

A request ID helps trace one operation across several layers.

```text
request_id=abc123
```

## 18. Deployment

A simple approach:

```text
GitHub
  ↓
CI
  ↓
Docker image
  ↓
VPS
  ↓
docker compose
  ↓
nginx
```

## 19. Backup

Back up the database, uploads and possibly configuration. Source code belongs in Git.

## 20. Scaling

Measure first.

Typical order:

1. improve queries,
2. add indexes,
3. add cache where it helps,
4. add resources,
5. only then consider more complex architecture.

## 21. Microservices

They make sense when there are real reasons such as independent teams, separate scaling, independent deployment cycles or clear domain boundaries.

They are not an automatic “higher level”.

## 22. MVP

A good MVP can be one application, one database, simple deployment, monitoring and backups.

## 23. What you should know

You should be able to sketch request flow, choose a simple architecture, separate configuration from code, understand nginx/backend/database roles, avoid overengineering and plan deployment and backups.
