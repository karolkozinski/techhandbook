---
id: "doc-010"
title: "SQL and PostgreSQL for Developers — Handbook"
slug: "sql-and-postgresql-for-developers-handbook"
description: "A relational database stores data in tables."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "sql"
  - "postgres"
  - "postgresql"
  - "database"
---

# SQL and PostgreSQL for Developers — Handbook

## 1. Relational model

A relational database stores data in tables.

Core concepts:

- rows,
- columns,
- primary keys,
- foreign keys,
- constraints,
- indexes,
- relations between tables.

## 2. PostgreSQL

PostgreSQL is an open-source relational database known for reliability, standards support and advanced features.

It is widely used for web applications and backend systems.

## 3. Database and user

Create database:

```sql
CREATE DATABASE appdb;
```

Create user:

```sql
CREATE USER appuser WITH PASSWORD 'secret';
```

Grant access:

```sql
GRANT ALL PRIVILEGES ON DATABASE appdb TO appuser;
```

In production, use stronger role separation and secret handling.

## 4. Table

```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## 5. INSERT

```sql
INSERT INTO users (email, name)
VALUES ('alice@example.com', 'Alice');
```

Return inserted row:

```sql
INSERT INTO users (email, name)
VALUES ('bob@example.com', 'Bob')
RETURNING *;
```

## 6. SELECT

```sql
SELECT * FROM users;
```

Selected columns:

```sql
SELECT id, email, name
FROM users
WHERE active = TRUE;
```

## 7. ORDER BY and LIMIT

```sql
SELECT *
FROM users
ORDER BY created_at DESC
LIMIT 20;
```

## 8. UPDATE

```sql
UPDATE users
SET active = FALSE
WHERE id = 10;
```

Always check the `WHERE` clause before running destructive updates.

## 9. DELETE

```sql
DELETE FROM users
WHERE id = 10;
```

Without `WHERE`, every row is affected.

## 10. Foreign key

Example:

```sql
CREATE TABLE posts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    title TEXT NOT NULL
);
```

The foreign key ensures the referenced user exists.

## 11. JOIN

```sql
SELECT
    posts.id,
    posts.title,
    users.email
FROM posts
JOIN users ON users.id = posts.user_id;
```

Common join types:

- INNER JOIN,
- LEFT JOIN,
- RIGHT JOIN,
- FULL JOIN.

## 12. GROUP BY

```sql
SELECT user_id, COUNT(*) AS post_count
FROM posts
GROUP BY user_id;
```

## 13. NULL

`NULL` means missing/unknown value.

Correct comparison:

```sql
WHERE deleted_at IS NULL
```

Not:

```sql
WHERE deleted_at = NULL
```

## 14. Constraints

Common constraints:

- PRIMARY KEY,
- FOREIGN KEY,
- UNIQUE,
- NOT NULL,
- CHECK.

Example:

```sql
CHECK (price >= 0)
```

## 15. Indexes

Create:

```sql
CREATE INDEX idx_users_created_at
ON users(created_at);
```

Indexes can accelerate reads but increase storage and write overhead.

Do not add indexes blindly.

## 16. EXPLAIN

Inspect query plan:

```sql
EXPLAIN
SELECT *
FROM users
WHERE email = 'alice@example.com';
```

With execution statistics:

```sql
EXPLAIN ANALYZE
SELECT *
FROM users
WHERE email = 'alice@example.com';
```

`ANALYZE` actually executes the query.

## 17. Transactions

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 100
WHERE id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE id = 2;

COMMIT;
```

Rollback:

```sql
ROLLBACK;
```

## 18. ACID — short version

Atomicity:
all or nothing.

Consistency:
constraints/invariants remain valid.

Isolation:
concurrent transactions do not corrupt each other.

Durability:
committed changes survive failures according to database guarantees.

## 19. Upsert

```sql
INSERT INTO users (email, name)
VALUES ('alice@example.com', 'Alice')
ON CONFLICT (email)
DO UPDATE SET name = EXCLUDED.name;
```

## 20. JSONB

PostgreSQL can store structured JSON efficiently:

```sql
CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    payload JSONB NOT NULL
);
```

Query:

```sql
SELECT payload->>'type'
FROM events;
```

Use relational columns for strongly structured frequently queried data, and JSONB when flexible structure is genuinely useful.

## 21. Backup

Logical dump:

```bash
pg_dump appdb > appdb.sql
```

Restore:

```bash
psql appdb < appdb.sql
```

Custom format:

```bash
pg_dump -Fc appdb > appdb.dump
pg_restore -d appdb appdb.dump
```

Test restores.

## 22. psql basics

Connect:

```bash
psql -h localhost -U appuser -d appdb
```

Useful meta-commands:

```text
\l      databases
\c DB   connect
\dt     tables
\d NAME describe table
\du     roles
\q      quit
```

## 23. Connection string

Example:

```text
postgresql://appuser:password@localhost:5432/appdb
```

Do not commit real passwords in source code.

## 24. Migrations

Database schema changes should be versioned.

Typical migration flow:

```text
001_create_users.sql
002_add_posts.sql
003_add_index.sql
```

Use migration tools appropriate to the language/framework.

A migration should be repeatable, reviewable and safe for the target environment.

## 25. What you should know

You should understand:

- tables,
- primary/foreign keys,
- INSERT/SELECT/UPDATE/DELETE,
- JOIN,
- GROUP BY,
- NULL,
- constraints,
- indexes,
- EXPLAIN,
- transactions,
- upsert,
- JSONB,
- backups,
- psql,
- migrations.

The most important rule: treat the database schema as code and review every destructive query before execution.
