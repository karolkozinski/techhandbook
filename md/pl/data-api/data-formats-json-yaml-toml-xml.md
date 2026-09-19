# data-formats-json-yaml-toml-xml

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
