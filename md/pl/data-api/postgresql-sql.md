---
id: "doc-010"
title: "SQL i PostgreSQL dla developera"
slug: "sql-i-postgresql-dla-developera"
description: "Dane przechowujesz w tabelach."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "sql"
  - "postgres"
  - "postgresql"
  - "database"
---

# SQL i PostgreSQL dla developera

Relacyjna baza danych nie jest tylko miejscem do zapisywania rekordów. Kluczowe są model danych, constraints, transakcje, indeksy i sposób wykonywania zapytań. Ten materiał skupia się na SQL i PostgreSQL z perspektywy developera.

Stan na wrzesień 2026: PostgreSQL 18 jest najnowszą stabilną główną linią, a PostgreSQL 19 pozostaje w fazie beta. Przykłady niżej celowo opierają się głównie na mechanizmach, które nie wymagają konkretnego wydania.

Powiązane tematy: [API i integracje systemów](techhandbook:doc-008), [Go - czytanie kodu](techhandbook:doc-020), [Node.js](techhandbook:doc-022), [Python - podstawy](techhandbook:doc-023) oraz [Testowanie oprogramowania](techhandbook:doc-049).

## 1. Model relacyjny

Dane przechowujesz w tabelach.

Przykład:

```text
users
id | email | name

orders
id | user_id | total
```

Relacja:

```text
users.id ← orders.user_id
```

## 2. PostgreSQL

Instalacja Debian:

```bash
sudo apt install postgresql
sudo systemctl enable --now postgresql
```

Wejście:

```bash
sudo -u postgres psql
```

## 3. Baza i użytkownik

```sql
CREATE DATABASE appdb;
CREATE USER appuser WITH PASSWORD 'strong-password';
GRANT ALL PRIVILEGES ON DATABASE appdb TO appuser;
```

## 4. Tabela

```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## 5. INSERT

```sql
INSERT INTO users (email, name)
VALUES ('user@example.com', 'Anna');
```

Zwrócenie rekordu:

```sql
INSERT INTO users (email, name)
VALUES ('a@example.com', 'A')
RETURNING id;
```

## 6. SELECT

```sql
SELECT * FROM users;
```

Wybrane kolumny:

```sql
SELECT id, email FROM users;
```

Warunek:

```sql
SELECT * FROM users
WHERE id = 42;
```

## 7. ORDER BY i LIMIT

```sql
SELECT *
FROM users
ORDER BY created_at DESC
LIMIT 20;
```

## 8. UPDATE

```sql
UPDATE users
SET name = 'Anna K.'
WHERE id = 42;
```

## 9. DELETE

```sql
DELETE FROM users
WHERE id = 42;
```

Zawsze sprawdź `WHERE`.

## 10. Foreign key

```sql
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    total NUMERIC(12,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## 11. JOIN

```sql
SELECT
    orders.id,
    users.email,
    orders.total
FROM orders
JOIN users ON users.id = orders.user_id;
```

LEFT JOIN:

```sql
SELECT users.*, orders.id
FROM users
LEFT JOIN orders ON orders.user_id = users.id;
```

## 12. GROUP BY

```sql
SELECT user_id, COUNT(*), SUM(total)
FROM orders
GROUP BY user_id;
```

## 13. NULL

Nie porównuj:

```sql
field = NULL
```

Używaj:

```sql
field IS NULL
field IS NOT NULL
```

## 14. Constraints

Przydatne:

```text
PRIMARY KEY
FOREIGN KEY
UNIQUE
NOT NULL
CHECK
DEFAULT
```

Przykład:

```sql
price NUMERIC CHECK (price >= 0)
```

## 15. Indeksy

```sql
CREATE INDEX idx_orders_user_id
ON orders(user_id);
```

Indeks przyspiesza odczyt kosztem:
- miejsca,
- wolniejszych zapisów.

Nie indeksuj wszystkiego bez potrzeby.

## 16. EXPLAIN

```sql
EXPLAIN SELECT * FROM orders WHERE user_id = 42;
```

Z wykonaniem:

```sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 42;
```

## 17. Transakcje

```sql
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
```

Błąd:

```sql
ROLLBACK;
```

## 18. ACID — skrót

- Atomicity,
- Consistency,
- Isolation,
- Durability.

W praktyce: transakcja ma zachowywać integralność danych.

## 19. Upsert

```sql
INSERT INTO users (email, name)
VALUES ('a@example.com', 'A')
ON CONFLICT (email)
DO UPDATE SET name = EXCLUDED.name;
```

## 20. JSONB

PostgreSQL potrafi przechowywać JSON:

```sql
metadata JSONB
```

Nie zastępuj nim całego modelu relacyjnego tylko dlatego, że jest wygodny.

## 21. Backup

```bash
pg_dump appdb > appdb.sql
```

Custom format:

```bash
pg_dump -Fc appdb > appdb.dump
```

Restore:

```bash
pg_restore -d appdb appdb.dump
```

## 22. psql — podstawy

```text
\l       list databases
\c db    connect
\dt      tables
\d users describe table
\q       quit
```

## 23. Connection string

```text
postgresql://appuser:password@localhost:5432/appdb
```

Hasła trzymaj w secrets/env, nie w repo.

## 24. Migracje

Zmiany schematu powinny być wersjonowane.

Przykład:

```text
001_create_users.sql
002_create_orders.sql
003_add_status_to_orders.sql
```

## 25. Co trzeba umieć

- SELECT/INSERT/UPDATE/DELETE,
- JOIN,
- GROUP BY,
- indeksy,
- constraints,
- transakcje,
- backup/restore,
- podstawy migracji.

## Oficjalne źródła

- PostgreSQL documentation: https://www.postgresql.org/docs/current/
- SQL commands: https://www.postgresql.org/docs/current/sql-commands.html
- psql: https://www.postgresql.org/docs/current/app-psql.html
- Backup and restore: https://www.postgresql.org/docs/current/backup.html
- PostgreSQL release news: https://www.postgresql.org/about/news/
