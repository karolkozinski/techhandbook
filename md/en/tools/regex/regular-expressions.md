# Regular Expressions (Regex) — Practical Handbook

## 1. What regex is

A regular expression is a pattern used to search, validate and transform text.

## 2. Simplest pattern

```regex
hello
```

Matches the literal text `hello`.

## 3. Special characters

Common metacharacters:

```text
. ^ $ * + ? { } [ ] \ | ( )
```

Escape a metacharacter with a backslash when you want its literal meaning.

## 4. Dot

```regex
a.c
```

Matches `abc`, `a-c`, `a c`, etc., depending on engine and flags.

## 5. Start and end

```regex
^start
end$
```

## 6. Character classes

```regex
[abc]
[a-z]
[A-Z0-9]
[^0-9]
```

## 7. Shortcuts

Typical Perl-style classes:

```regex
\d
\w
\s
\D
\W
\S
```

Exact behavior can vary by regex engine and Unicode settings.

## 8. Quantifiers

```regex
a*
a+
a?
a{3}
a{2,5}
```

Meaning:

- `*` zero or more,
- `+` one or more,
- `?` zero or one,
- `{n}` exactly n,
- `{n,m}` between n and m.

## 9. Groups

```regex
(ab)+
```

Groups let you apply quantifiers or capture submatches.

## 10. Alternation

```regex
cat|dog
```

## 11. Grouping alternation

```regex
^(cat|dog)$
```

## 12. Capturing groups

```regex
(\d{4})-(\d{2})-(\d{2})
```

Captures year, month and day separately.

## 13. Non-capturing group

```regex
(?:cat|dog)
```

## 14. Named groups

Syntax varies by engine.

JavaScript/Python commonly support forms such as:

```regex
(?<year>\d{4})
```

or in Python:

```regex
(?P<year>\d{4})
```

## 15. Greedy and lazy

Greedy:

```regex
".*"
```

Lazy:

```regex
".*?"
```

## 16. Lookahead

Positive:

```regex
foo(?=bar)
```

Negative:

```regex
foo(?!bar)
```

## 17. Lookbehind

Positive:

```regex
(?<=USD )\d+
```

Support differs by engine/version.

## 18. Flags

Common flags include:

- `i` case-insensitive,
- `m` multiline,
- `s` dot matches newlines,
- `g` global search in engines such as JavaScript.

## 19. JavaScript

```js
const re = /error/i;

re.test("ERROR");
"abc123".match(/\d+/);
"abc123".replace(/\d+/, "X");
```

## 20. Python

```python
import re

re.search(r"\d+", "abc123")
re.findall(r"\w+", "hello world")
re.sub(r"\s+", " ", text)
```

Use raw strings for most Python regexes.

## 21. grep

Basic:

```bash
grep 'error' file.log
```

Extended regex:

```bash
grep -E 'error|warning' file.log
```

Recursive:

```bash
grep -R -E 'TODO|FIXME' .
```

## 22. sed

```bash
sed -E 's/[[:space:]]+/ /g' file.txt
```

## 23. VS Code / Vim

VS Code search supports regex mode.

Vim search:

```vim
/pattern
```

Substitution:

```vim
:%s/old/new/g
```

Remember: regex dialects differ.

## 24. Email validation

Do not try to implement the full email RFC with one giant regex unless there is a real need.

For normal forms, use a practical syntax check and verify ownership by sending a confirmation message.

## 25. Regex and HTML

Regex can search simple HTML fragments, but it is not a reliable parser for arbitrary nested HTML.

Use an HTML parser for structural work.

## 26. Readability

Prefer simple expressions over clever one-liners.

Break complex validation into steps when possible.

## 27. Testing

Test against:

- expected matches,
- expected non-matches,
- empty input,
- long input,
- Unicode if relevant,
- malformed edge cases.

## 28. ReDoS

Some regexes can cause catastrophic backtracking on specially crafted input.

Be cautious with nested ambiguous quantifiers such as:

```regex
(a+)+$
```

especially on untrusted long input.

## 29. Examples

IPv4-like shape, not full semantic validation:

```regex
^(\d{1,3}\.){3}\d{1,3}$
```

Date shape:

```regex
^\d{4}-\d{2}-\d{2}$
```

Hex color:

```regex
^#[0-9A-Fa-f]{6}$
```

Simple identifier:

```regex
^[A-Za-z_][A-Za-z0-9_]*$
```

## 30. What you should know

You should understand:

- literals,
- character classes,
- anchors,
- quantifiers,
- groups,
- alternation,
- greedy vs lazy,
- lookarounds,
- engine differences,
- basic use in JavaScript, Python, grep and editors.

The main rule: use the simplest regex that solves the problem.
