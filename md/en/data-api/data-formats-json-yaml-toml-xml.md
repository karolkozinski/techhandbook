---
id: "doc-009"
title: "JSON, YAML, TOML and XML - Data and Configuration Handbook"
slug: "json-yaml-toml-and-xml-data-and-configuration-handbook"
description: "JSON is a structured text format widely used by APIs and configuration files."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "json"
  - "yaml"
  - "toml"
  - "xml"
---

# JSON, YAML, TOML and XML - Data and Configuration Handbook

A data format is part of a system interface. JSON dominates web APIs, YAML and TOML are common in configuration, and XML is still widespread in older and enterprise integrations. The important part is understanding syntax, data types and the limitations of each format.

Related topics: [APIs and System Integrations](techhandbook:doc-008), [Docker](techhandbook:doc-012), [Go - Reading Code](techhandbook:doc-020) and [Python](techhandbook:doc-023).

## 1. JSON

JSON is a structured text format widely used by APIs and configuration files.

Example:

```json
{
  "name": "Alice",
  "age": 30,
  "active": true,
  "roles": ["admin", "editor"]
}
```

Data types:

- string,
- number,
- boolean,
- null,
- object,
- array.

### Validation

Use tools such as:

```bash
jq . file.json
```

Invalid JSON will produce an error.

## 2. YAML

YAML is common in infrastructure and configuration.

Example:

```yaml
name: Alice
active: true
roles:
  - admin
  - editor
```

### List of objects

```yaml
servers:
  - name: app1
    port: 8080
  - name: app2
    port: 8081
```

Indentation matters.

## 3. TOML

TOML aims to be readable and predictable for configuration.

Example:

```toml
name = "Alice"
active = true

[server]
host = "127.0.0.1"
port = 8080
```

Arrays:

```toml
roles = ["admin", "editor"]
```

## 4. XML

XML is a markup format still common in enterprise systems, document formats and older integrations.

Example:

```xml
<user>
  <name>Alice</name>
  <active>true</active>
</user>
```

XML supports attributes, namespaces and schemas.

## 5. When to use which format

JSON:
best for APIs and machine-to-machine data exchange.

YAML:
good for human-edited configuration, but indentation can be error-prone.

TOML:
good for clear application configuration.

XML:
use when the ecosystem, protocol or tooling requires it.

## 6. JSON escaping

Inside JSON strings:

```json
{
  "message": "He said \"hello\""
}
```

Newline:

```json
{
  "message": "line1\nline2"
}
```

Backslash:

```json
{
  "path": "C:\\Temp\\file.txt"
}
```

## 7. YAML pitfalls

Be careful with:

- indentation,
- tabs,
- implicit type conversion,
- duplicate keys,
- quoting strings that look like numbers or booleans.

When portability matters, quote ambiguous values.

## 8. JSON Lines

JSON Lines stores one JSON object per line.

Example:

```jsonl
{"id":1,"name":"Alice"}
{"id":2,"name":"Bob"}
```

Useful for:

- logs,
- streaming,
- large datasets,
- line-oriented processing.

## 9. jq

Pretty-print:

```bash
jq . file.json
```

Read a field:

```bash
jq '.name' file.json
```

Iterate over array:

```bash
jq '.items[]' file.json
```

## 10. yq

`yq` is a command-line processor commonly used for YAML.

Exact syntax depends on the implementation/version.

Typical use:

```bash
yq '.server.port' config.yaml
```

## 11. Schemas

Schemas validate expected structure.

Common examples:

- JSON Schema,
- XML Schema (XSD),
- OpenAPI schemas.

Validation is useful when config or API payloads are consumed automatically.

## 12. Configuration vs secrets

Do not store secrets casually inside normal configuration files committed to Git.

Good split:

```text
config:
  host
  port
  feature flags

secrets:
  passwords
  API tokens
  private keys
```

Use environment variables or secret-management systems for sensitive values.

## 13. What you should know

You should be comfortable with:

- JSON objects and arrays,
- YAML indentation,
- TOML sections,
- basic XML structure,
- escaping,
- jq,
- schema validation,
- keeping secrets separate from ordinary config.

The main rule: choose the simplest format that matches the surrounding ecosystem.

## Official references

- RFC 8259 - JSON: https://www.rfc-editor.org/rfc/rfc8259
- YAML specification: https://yaml.org/spec/
- TOML specification: https://toml.io/en/v1.0.0
- W3C XML specification: https://www.w3.org/TR/xml/
