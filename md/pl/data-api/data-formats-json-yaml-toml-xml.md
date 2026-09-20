---
id: "doc-009"
title: "JSON, YAML, TOML i XML"
slug: "json-yaml-toml-i-xml"
description: "JSON, YAML, TOML i XML — praktyczne kompendium TechHandbook."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "json"
  - "yaml"
  - "toml"
  - "xml"
---

# JSON, YAML, TOML i XML

Format danych jest częścią interfejsu systemu. JSON dominuje w API, YAML i TOML są częste w konfiguracji, a XML nadal występuje w wielu starszych i korporacyjnych integracjach. Najważniejsze jest rozumienie składni, typów danych i ograniczeń każdego formatu.

Powiązane tematy: [API i integracje systemów](techhandbook:doc-008), [Docker](techhandbook:doc-012), [Go - czytanie kodu](techhandbook:doc-020) oraz [Python - podstawy](techhandbook:doc-023).

## 1. JSON

Przykład:

```json
{
  "name": "app",
  "port": 8080,
  "debug": false,
  "tags": ["go", "web"]
}
```

Typy:
- string,
- number,
- boolean,
- null,
- array,
- object.

JSON nie wspiera komentarzy.

### Walidacja

```bash
jq . config.json
```

## 2. YAML

Przykład:

```yaml
name: app
port: 8080
debug: false

tags:
  - go
  - web
```

Wcięcia mają znaczenie.

Nie używaj tabów do indentacji.

### Lista obiektów

```yaml
services:
  - name: api
    port: 8080
  - name: web
    port: 3000
```

## 3. TOML

Przykład:

```toml
name = "app"
port = 8080
debug = false

[database]
host = "localhost"
port = 5432
```

Tablice:

```toml
tags = ["go", "web"]
```

TOML jest często czytelniejszy od YAML dla zwykłej konfiguracji.

## 4. XML

```xml
<app>
  <name>app</name>
  <port>8080</port>
</app>
```

Atrybuty:

```xml
<server port="8080" enabled="true" />
```

XML jest bardziej rozwlekły, ale nadal powszechny w starszych systemach, integracjach, dokumentach i części narzędzi enterprise.

## 5. Kiedy czego używać

JSON:
- API,
- dane,
- komunikacja między usługami.

YAML:
- CI/CD,
- Docker Compose,
- Kubernetes,
- konfiguracja.

TOML:
- konfiguracja aplikacji,
- narzędzia developerskie.

XML:
- legacy,
- SOAP,
- niektóre formaty dokumentów,
- konfiguracje enterprise.

## 6. Escaping JSON

```json
{
  "text": "Linia 1\nLinia 2",
  "quote": "\"tekst\""
}
```

## 7. YAML i pułapki

Warto cytować wartości, które mogą zostać zinterpretowane dziwnie:

```yaml
version: "1.0"
date: "2026-09-19"
```

## 8. JSON Lines

Format:

```text
{"id":1,"name":"A"}
{"id":2,"name":"B"}
```

Każda linia to osobny JSON.

Dobry do logów i streamingu.

## 9. jq

Pole:

```bash
jq '.name' config.json
```

Lista:

```bash
jq '.items[]' data.json
```

Filtrowanie:

```bash
jq '.items[] | select(.active == true)' data.json
```

## 10. yq

Analogiczne narzędzie do YAML.

Składnia zależy od konkretnej implementacji `yq`.

## 11. Schematy

JSON może być walidowany przez JSON Schema.

XML przez XSD.

Walidacja pozwala wykrywać:
- brak pól,
- zły typ,
- błędną strukturę.

## 12. Config a secrets

Plik config może trafić do Git:

```text
config.example.toml
```

Sekretów nie wrzucaj:

```text
API_KEY
DB_PASSWORD
PRIVATE_KEY
```

## 13. Co trzeba umieć

- czytać wszystkie cztery formaty,
- rozumieć nesting i arrays,
- używać `jq`,
- rozpoznawać błędy indentacji YAML,
- dobierać format do zastosowania.

## Oficjalne źródła

- RFC 8259 - JSON: https://www.rfc-editor.org/rfc/rfc8259
- YAML specification: https://yaml.org/spec/
- TOML specification: https://toml.io/en/v1.0.0
- W3C XML specification: https://www.w3.org/TR/xml/
