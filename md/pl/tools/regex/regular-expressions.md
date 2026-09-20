---
id: "doc-050"
title: "Wyrażenia regularne (Regex) - kompendium praktyczne"
slug: "wyrazenia-regularne-regex-kompendium-praktyczne"
description: "Wyrażenie regularne opisuje wzorzec tekstu."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "regex"
  - "regexp"
  - "grep"
  - "sed"
  - "javascript"
  - "python"
---

# Wyrażenia regularne (Regex) - kompendium praktyczne

Regex to rodzina języków wzorców, a nie jeden identyczny standard we wszystkich programach. Składnia grep/POSIX, JavaScript, Python i PCRE jest podobna, ale różni się szczegółami, dlatego przed użyciem zaawansowanych konstrukcji warto wiedzieć, jakiego engine używa dane narzędzie.

Powiązane tematy: [Programowanie w shellu](techhandbook:doc-031), [Visual Studio Code](techhandbook:doc-039), [Vi, Vim, gVim i Neovim](techhandbook:doc-038) oraz [Python](techhandbook:doc-023).

## 1. Czym jest regex

Wyrażenie regularne opisuje wzorzec tekstu.

Przykłady zastosowań:

- wyszukiwanie,
- walidacja,
- zamiana,
- parsowanie prostych formatów,
- filtrowanie logów,
- praca w edytorze,
- grep, sed, JavaScript, Python.

Regex jest bardzo użyteczny, ale łatwo go nadużyć. Jeżeli format ma pełny parser, często lepiej użyć parsera.

## 2. Najprostszy wzorzec

Regex:

```text
cat
```

pasuje do:

```text
cat
concatenate
category
```

## 3. Znaki specjalne

Najczęstsze:

```text
.  dowolny znak
^  początek
$  koniec
*  zero lub więcej
+  jeden lub więcej
?  zero lub jeden
[] klasa znaków
() grupa
|  alternatywa
\  escape
```

## 4. Kropka

```text
a.c
```

pasuje do:

```text
abc
a-c
a c
```

Jeśli chcesz dosłowną kropkę:

```text
\.
```

## 5. Początek i koniec

```text
^hello$
```

pasuje tylko do całego:

```text
hello
```

Nie pasuje do:

```text
hello world
say hello
```

## 6. Klasy znaków

```text
[abc]
```

jeden z: a, b, c.

Zakres:

```text
[a-z]
[A-Z]
[0-9]
```

Negacja:

```text
[^0-9]
```

## 7. Skróty

Często:

```text
\d cyfra
\w znak słowa
\s whitespace
```

Negacje:

```text
\D
\W
\S
```

Znaczenie `\w` może się różnić zależnie od silnika i trybu Unicode.

## 8. Kwantyfikatory

```text
a*     0+
a+     1+
a?     0 lub 1
a{3}   dokładnie 3
a{2,5} od 2 do 5
a{2,}  co najmniej 2
```

## 9. Grupy

```text
(ab)+
```

pasuje do:

```text
ab
abab
ababab
```

## 10. Alternatywa

```text
cat|dog
```

## 11. Grupowanie alternatywy

```text
^(cat|dog)$
```

pasuje dokładnie do `cat` lub `dog`.

## 12. Grupy przechwytujące

```text
(\d{4})-(\d{2})-(\d{2})
```

Dla:

```text
2026-09-19
```

grupy:

```text
1 = 2026
2 = 09
3 = 19
```

## 13. Grupa nieprzechwytująca

W wielu silnikach:

```text
(?:abc)
```

Grupuje bez tworzenia numerowanej grupy.

## 14. Named groups

Przykład JavaScript:

```text
(?<year>\d{4})-(?<month>\d{2})
```

Nazwane grupy poprawiają czytelność.

## 15. Greedy i lazy

Greedy:

```text
".*"
```

Lazy:

```text
".*?"
```

Dla:

```text
"a" "b"
```

greedy może złapać całość, a lazy pierwszy najmniejszy fragment.

## 16. Lookahead

Positive:

```text
foo(?=bar)
```

pasuje do `foo`, jeśli dalej jest `bar`.

Negative:

```text
foo(?!bar)
```

## 17. Lookbehind

Jeżeli silnik wspiera:

```text
(?<=prefix)\d+
```

Nie każdy silnik ma identyczne możliwości.

## 18. Flagi

Popularne:

```text
i  case-insensitive
m  multiline
s  dotall
g  global
```

JavaScript:

```js
const re = /error/gi;
```

## 19. JavaScript

Test:

```js
const re = /^\d{4}-\d{2}-\d{2}$/;
console.log(re.test("2026-09-19"));
```

Match:

```js
const result = "id=123".match(/\d+/);
```

Replace:

```js
"hello world".replace(/world/, "regex");
```

## 20. Python

```python
import re

if re.search(r"error", text, re.I):
    print("found")
```

Raw strings `r"..."` ograniczają problem podwójnego escapowania.

## 21. grep

```bash
grep -E 'error|warning' app.log
```

Case-insensitive:

```bash
grep -Ei 'error|warning' app.log
```

## 22. sed

Zamiana:

```bash
sed -E 's/[0-9]+/NUMBER/g' file.txt
```

## 23. VS Code / Vim

Edytory potrafią wyszukiwać i zamieniać przy użyciu regex.

Przykład:

Znajdź:

```text
foo([0-9]+)
```

Zamień:

```text
bar$1
```

Składnia referencji do grup zależy od narzędzia.

## 24. Walidacja emaila

Nie próbuj odtwarzać całego RFC ogromnym regexem.

Praktyczna walidacja formularza powinna być rozsądna, a prawdziwym potwierdzeniem adresu jest np. wysłanie wiadomości weryfikacyjnej.

## 25. Regex a HTML

Nie używaj regexu jako pełnego parsera HTML.

HTML ma strukturę, nesting i wiele wyjątków.

Użyj parsera DOM.

## 26. Czytelność

Jeżeli regex robi się duży:

- dodaj komentarz,
- podziel problem,
- użyj named groups,
- rozważ parser.

## 27. Testowanie

Zawsze testuj:

- poprawne dane,
- błędne dane,
- pusty string,
- znaki Unicode,
- bardzo długie wejście.

## 28. ReDoS

Źle skonstruowane regexy mogą mieć bardzo kosztowny backtracking.

Nie uruchamiaj skomplikowanych wzorców na dowolnie długich danych użytkownika bez analizy.

## 29. Przykłady

IPv4 - prosty wzorzec składniowy:

```text
^(\d{1,3}\.){3}\d{1,3}$
```

Uwaga: dopuszcza np. 999.999.999.999. Walidacja semantyczna wymaga dodatkowej logiki.

Slug:

```text
^[a-z0-9]+(?:-[a-z0-9]+)*$
```

Prosty identyfikator:

```text
^[A-Za-z_][A-Za-z0-9_]*$
```

## 30. Co trzeba umieć

- czytać klasy znaków,
- używać anchors,
- stosować kwantyfikatory,
- grupować,
- robić search/replace,
- rozumieć greedy/lazy,
- korzystać z regex w grep, JS i Pythonie,
- wiedzieć, kiedy regex nie jest dobrym narzędziem.

## Źródła referencyjne

- POSIX regular expressions: https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/V1_chap09.html
- MDN regular expressions: https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_expressions
- Python re: https://docs.python.org/3/library/re.html
