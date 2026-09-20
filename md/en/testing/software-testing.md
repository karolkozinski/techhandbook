---
id: "doc-049"
title: "Software Testing — Handbook"
slug: "software-testing-handbook"
description: "Tests reduce the chance of shipping regressions and make refactoring safer."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "testing"
  - "unit"
  - "integration"
  - "e2e"
  - "playwright"
  - "go test"
---

# Software Testing — Handbook

Tests should provide information about risk, not merely increase a coverage number. A useful test suite combines fast tests of small units with integration tests and a smaller number of important end-to-end scenarios.

Related topics: [C - Reading, Building and Debugging Projects](techhandbook:doc-019), [Go - Reading Code](techhandbook:doc-020), [JavaScript](techhandbook:doc-021), [Node.js](techhandbook:doc-022), [Python](techhandbook:doc-023) and [APIs and System Integrations](techhandbook:doc-008).

## 1. Why tests exist

Tests reduce the chance of shipping regressions and make refactoring safer.

Good tests answer:

```text
Does the software behave as expected?
```

## 2. Test levels

Common levels:

- unit,
- integration,
- end-to-end,
- smoke,
- regression.

## 3. Unit test

Tests a small unit of behavior in isolation.

Example:

```go
func TestAdd(t *testing.T) {
    if Add(2, 3) != 5 {
        t.Fatal("expected 5")
    }
}
```

## 4. Integration test

Tests several components together.

Examples:

- application + PostgreSQL,
- service + HTTP API,
- repository layer + real database.

## 5. End-to-end test

Tests the application through its external interface.

Example:

```text
browser
→ login
→ create order
→ verify confirmation
```

E2E tests are valuable but slower and more fragile.

## 6. Smoke test

Small set of checks answering:

```text
Does the critical functionality basically work?
```

Useful immediately after deployment.

## 7. Regression test

A test added to ensure a fixed bug does not return.

## 8. Test pyramid

A common model:

```text
few E2E
some integration
many unit tests
```

Do not treat the shape as dogma; match tests to risk.

## 9. Arrange / Act / Assert

```text
Arrange  prepare input/state
Act      execute behavior
Assert   verify result
```

This makes tests easier to read.

## 10. Mock

A mock replaces a dependency and can verify how it was called.

Mocks are useful, but excessive mocking can test implementation details instead of behavior.

## 11. Stub and fake

Stub:
returns predefined data.

Fake:
working simplified implementation, e.g. in-memory repository.

## 12. What to test

Prioritize:

- business rules,
- parsing/validation,
- error paths,
- security-sensitive behavior,
- database interactions,
- API contracts,
- previous bugs.

## 13. What often has little value

Avoid tests that only confirm trivial language/library behavior.

Do not create brittle tests for private implementation details unless necessary.

## 14. Coverage

Coverage tells you which code executed during tests.

It does **not** tell you whether behavior is tested well.

High coverage with weak assertions can still be poor testing.

## 15. Testing Go

Run:

```bash
go test ./...
```

Verbose:

```bash
go test -v ./...
```

Coverage:

```bash
go test -cover ./...
```

Race detector:

```bash
go test -race ./...
```

## 16. Testing JavaScript

Typical commands depend on project tooling:

```bash
npm test
npm run test
```

Common frameworks include Vitest, Jest and Node's built-in test runner.

## 17. Playwright

Playwright is useful for browser E2E testing.

Example idea:

```js
test('login works', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByRole('button', { name: 'Login' }).click();
});
```

## 18. API testing

Useful checks:

- status code,
- headers,
- response schema,
- authorization,
- error responses,
- idempotency,
- rate limits.

Example:

```bash
curl -i https://api.example.com/health
```

## 19. Test data

Use deterministic test data.

Avoid depending on:

- production data,
- current time without control,
- external services unless the test explicitly targets them.

## 20. Flaky tests

A flaky test passes and fails without meaningful code changes.

Typical causes:

- timing,
- shared state,
- network dependency,
- random data,
- unordered results,
- parallel interference.

Fix flaky tests instead of rerunning until green.

## 21. Test isolation

Each test should leave the environment clean enough for the next test.

Use:

- transactions,
- temporary directories,
- dedicated test databases,
- teardown hooks.

## 22. Fixtures

Fixtures are predefined test inputs or environments.

Keep them small and understandable.

## 23. CI

Continuous Integration should run automated checks on every meaningful change.

Typical pipeline:

```text
checkout
→ install dependencies
→ lint
→ unit tests
→ integration tests
→ build
```

## 24. Manual testing

Manual testing is still useful for:

- exploratory testing,
- UX,
- visual behavior,
- unusual edge cases.

Automation and manual testing complement each other.

## 25. Pre-release checklist

- tests pass,
- build passes,
- migrations reviewed,
- configuration checked,
- secrets present,
- backup/rollback plan exists,
- smoke test prepared,
- monitoring ready.

## 26. What you should know

You should understand:

- unit vs integration vs E2E,
- smoke and regression tests,
- mocks/stubs/fakes,
- test isolation,
- fixtures,
- CI,
- coverage limitations,
- flaky tests,
- release validation.

The main rule: test important behavior, not just code lines.

## Official references

- Go testing package: https://pkg.go.dev/testing
- Node.js test runner: https://nodejs.org/api/test.html
- pytest documentation: https://docs.pytest.org/
- Playwright documentation: https://playwright.dev/docs/intro
