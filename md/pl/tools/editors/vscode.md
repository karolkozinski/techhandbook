---
id: "doc-039"
title: "Visual Studio Code"
slug: "visual-studio-code"
description: "Praktyczny przewodnik po VS Code jako codziennym środowisku pracy z kodem, Gitem, terminalem, debugowaniem oraz agentami AI: GitHub Copilot i OpenAI Codex."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "vscode"
  - "editor"
  - "copilot"
  - "codex"
---

# Visual Studio Code

VS Code jest środowiskiem pracy nad całym projektem: pliki, wyszukiwanie, terminal, Git, debugger, language servers, zadania i narzędzia AI działają w jednym kontekście. Agenci potrafią dziś planować, edytować wiele plików i uruchamiać komendy, ale wynik nadal powinien przejść przez diff, testy i normalny review.

Aktualny VS Code rozróżnia lżejsze formy pomocy od pracy agentowej; w zależności od konfiguracji sesja może korzystać m.in. z Copilota lub Codexa.

Powiązane tematy: [GitHub](techhandbook:doc-014), [Git w praktyce zespołowej](techhandbook:doc-013), [Testowanie oprogramowania](techhandbook:doc-049), [Promptowanie AI](techhandbook:doc-002) oraz [Vi, Vim, gVim i Neovim](techhandbook:doc-038).

> Praktyczny przewodnik po VS Code jako codziennym środowisku pracy z kodem, Gitem, terminalem, debugowaniem oraz agentami AI: GitHub Copilot i OpenAI Codex.
>
> Stan narzędzi AI: wrzesień 2026.

---

## 1. Czym jest Visual Studio Code

Visual Studio Code, zwykle skracany do **VS Code**, to darmowy edytor kodu rozwijany przez Microsoft.

Nie jest klasycznym ciężkim IDE w rodzaju Visual Studio, IntelliJ IDEA czy PyCharm. Sam program jest stosunkowo lekki, a kolejne możliwości dodaje się przez rozszerzenia.

VS Code może pełnić kilka ról jednocześnie:

- edytora tekstu i kodu,
- środowiska programistycznego,
- klienta Git,
- terminala,
- debuggera,
- klienta SSH,
- edytora plików na zdalnym serwerze,
- klienta kontenerów i środowisk developerskich,
- interfejsu dla agentów AI.

Typowy sposób pracy wygląda tak:

```text
projekt
│
├── kod
├── konfiguracja
├── testy
├── dokumentacja
└── repozytorium Git
       │
       ▼
     VS Code
       │
       ├── edytor
       ├── terminal
       ├── Git
       ├── debugger
       ├── extensions
       └── AI: Copilot / Codex
```

---

# 2. Instalacja

Oficjalna strona:

https://code.visualstudio.com/

## Debian / Ubuntu

Microsoft udostępnia pakiet `.deb`.

Po pobraniu:

```bash
sudo apt install ./code_*.deb
```

Uruchomienie:

```bash
code
```

Otwarcie konkretnego katalogu:

```bash
code .
```

To jedno z najważniejszych poleceń podczas pracy.

Przykład:

```bash
cd ~/projekty/example-site
code .
```

## Windows

Po instalacji warto podczas instalatora zaznaczyć opcje:

- Add to PATH,
- Open with Code,
- Register Code as editor.

Dzięki temu można później używać:

```powershell
code .
```

## FreeBSD

Oficjalny VS Code Microsoftu nie jest typowym natywnym celem FreeBSD.

W praktyce na FreeBSD częściej używa się:

- `code-oss`,
- edytora lokalnego na innym komputerze + SSH,
- VS Code Remote SSH do pracy na serwerze FreeBSD.

Dla serwera FreeBSD bardzo wygodny jest model:

```text
VS Code na Debianie/Windows
        │
        │ SSH
        ▼
     FreeBSD
```

---

# 3. Najważniejsze elementy interfejsu

Standardowy ekran VS Code składa się z kilku głównych części.

## Activity Bar

Pasek ikon zwykle po lewej stronie.

Najważniejsze pozycje:

- Explorer — pliki,
- Search — wyszukiwanie,
- Source Control — Git,
- Run and Debug — uruchamianie i debugowanie,
- Extensions — rozszerzenia,
- Testing — testy,
- Copilot / Chat — funkcje AI.

## Side Bar

Panel wyświetlający zawartość wybranego modułu.

Przykładowo Explorer pokazuje drzewo katalogów.

## Editor

Główne okno edycji.

Można otworzyć wiele kart oraz podzielić ekran.

Przykład:

```text
+-----------------------+-----------------------+
| main.go               | config.go             |
|                       |                       |
|                       |                       |
+-----------------------+-----------------------+
| terminal                                      |
+-----------------------------------------------+
```

## Panel

Dolna część programu.

Może zawierać:

- Terminal,
- Problems,
- Output,
- Debug Console,
- Ports.

## Status Bar

Pasek na dole.

Pokazuje między innymi:

- gałąź Git,
- błędy,
- kodowanie pliku,
- typ końców linii,
- język pliku,
- pozycję kursora,
- środowisko programistyczne.

---

# 4. Command Palette — centrum sterowania

Jedną z najważniejszych funkcji VS Code jest **Command Palette**.

Linux / Windows:

```text
Ctrl+Shift+P
```

Można tam wyszukać praktycznie każdą funkcję.

Przykłady:

```text
Git: Clone
Git: Commit
Format Document
Developer: Reload Window
Preferences: Open Settings
Remote-SSH: Connect to Host
```

Jeżeli nie pamiętasz skrótu klawiaturowego, zwykle najprościej:

```text
Ctrl+Shift+P
```

i wpisać fragment nazwy funkcji.

---

# 5. Otwieranie projektu

Najlepiej otwierać **katalog projektu**, a nie pojedynczy plik.

CLI:

```bash
cd projekt
code .
```

Albo:

```bash
code ~/projekty/web-monitor
```

VS Code traktuje otwarty katalog jako **workspace**.

Dzięki temu:

- widzi wszystkie pliki,
- działa wyszukiwanie globalne,
- Git rozpoznaje repozytorium,
- AI ma lepszy kontekst,
- debugger zna projekt,
- rozszerzenia mogą rozpoznawać konfigurację.

---

# 6. Workspace

Workspace oznacza środowisko aktualnie otwartego projektu.

Najprostsza forma:

```text
jeden katalog = jeden workspace
```

VS Code obsługuje także **multi-root workspace**, czyli kilka katalogów w jednym oknie.

Można zapisać konfigurację w pliku:

```text
projekt.code-workspace
```

Przykład:

```json
{
  "folders": [
    {
      "path": "backend"
    },
    {
      "path": "frontend"
    }
  ]
}
```

---

# 7. Explorer i operacje na plikach

Explorer pozwala:

- tworzyć pliki,
- tworzyć katalogi,
- zmieniać nazwy,
- przenosić pliki,
- usuwać pliki,
- kopiować ścieżki.

Warto pamiętać, że pliki można również przeciągać pomiędzy katalogami.

---

# 8. Wyszukiwanie

## W aktualnym pliku

```text
Ctrl+F
```

Następny wynik:

```text
Enter
```

Poprzedni:

```text
Shift+Enter
```

## Zamiana

```text
Ctrl+H
```

## W całym projekcie

```text
Ctrl+Shift+F
```

To jedna z najważniejszych funkcji podczas czytania nieznanego kodu.

Przykład:

szukamy:

```text
LoadConfig
```

VS Code pokaże wszystkie wystąpienia funkcji w repozytorium.

---

# 9. Szybkie otwieranie plików

```text
Ctrl+P
```

Następnie można wpisać fragment nazwy:

```text
config
```

VS Code znajdzie np.:

```text
internal/config/config.go
config.yaml
config_test.go
```

To często szybsze niż używanie Explorera.

---

# 10. Przejście do symbolu

## Symbol w bieżącym pliku

```text
Ctrl+Shift+O
```

Można szybko znaleźć:

- funkcję,
- klasę,
- metodę,
- zmienną,
- strukturę.

## Symbol w projekcie

```text
Ctrl+T
```

Przy dużych projektach jest to niezwykle wygodne.

---

# 11. Nawigacja po kodzie

## Go to Definition

Najczęściej:

```text
F12
```

lub:

```text
Ctrl+klik
```

Przenosi do definicji funkcji, klasy, zmiennej itd.

## Peek Definition

Pozwala podejrzeć definicję bez opuszczania pliku.

## Find All References

Pokazuje wszystkie miejsca użycia danego symbolu.

To jedna z najlepszych funkcji przy analizie nieznanego projektu.

---

# 12. Edycja kodu

VS Code obsługuje typowe funkcje edytora programistycznego:

- automatyczne wcięcia,
- kolorowanie składni,
- autouzupełnianie,
- podpowiadanie parametrów,
- refaktoryzację,
- formatowanie,
- analizę błędów.

---

# 13. Multi-cursor

Można mieć wiele kursorów jednocześnie.

Linux / Windows:

```text
Alt+klik
```

Dodanie kursora w kolejnej linii:

```text
Ctrl+Alt+↓
Ctrl+Alt+↑
```

Przykład:

```text
user.name
user.name
user.name
```

Można zaznaczyć wszystkie trzy miejsca i zmienić jednocześnie.

---

# 14. Zaznaczanie kolejnych wystąpień

```text
Ctrl+D
```

Przykład:

```javascript
const user = getUser();
console.log(user);
save(user);
```

Zaznacz `user`, potem kilka razy:

```text
Ctrl+D
```

VS Code zaznaczy następne wystąpienia.

---

# 15. Przenoszenie linii

```text
Alt+↑
Alt+↓
```

Linia zostanie przesunięta bez kopiowania i wklejania.

---

# 16. Kopiowanie linii

```text
Shift+Alt+↓
Shift+Alt+↑
```

---

# 17. Komentarze

Typowy skrót:

```text
Ctrl+/
```

VS Code użyje właściwego komentarza dla języka.

JavaScript:

```javascript
// komentarz
```

Python:

```python
# komentarz
```

---

# 18. Formatowanie

Format całego dokumentu:

```text
Shift+Alt+F
```

VS Code może korzystać z formatterów takich jak:

- Prettier,
- gofmt,
- Black,
- Ruff,
- clang-format.

Można również włączyć formatowanie przy zapisie:

```json
"editor.formatOnSave": true
```

---

# 19. settings.json

VS Code ma graficzne ustawienia, ale większość z nich można zapisywać w JSON.

Command Palette:

```text
Preferences: Open User Settings (JSON)
```

Przykład:

```json
{
  "editor.fontSize": 15,
  "editor.tabSize": 4,
  "editor.formatOnSave": true,
  "editor.minimap.enabled": false,
  "files.autoSave": "afterDelay"
}
```

---

# 20. Ustawienia użytkownika i projektu

Są dwa główne poziomy konfiguracji.

## User Settings

Dotyczą wszystkich projektów.

## Workspace Settings

Dotyczą tylko konkretnego projektu.

Znajdują się zwykle w:

```text
.vscode/settings.json
```

Przykład:

```text
projekt/
├── .vscode/
│   └── settings.json
├── src/
└── README.md
```

---

# 21. Katalog `.vscode`

Może zawierać konfigurację projektu.

Typowe pliki:

```text
.vscode/
├── settings.json
├── launch.json
├── tasks.json
└── extensions.json
```

## settings.json

Ustawienia projektu.

## launch.json

Konfiguracja debuggera.

## tasks.json

Automatyczne zadania.

## extensions.json

Lista zalecanych rozszerzeń.

---

# 22. Extensions

VS Code zawdzięcza większość możliwości rozszerzeniom.

Panel:

```text
Ctrl+Shift+X
```

Przykładowe rozszerzenia:

### Web

- ESLint
- Prettier
- Live Server

### Go

- Go

### Python

- Python
- Pylance

### Docker

- Docker / Container Tools

### Git

- GitLens

### AI

- GitHub Copilot
- OpenAI Codex

---

# 23. Nie instaluj wszystkiego

Duża liczba rozszerzeń może:

- spowalniać start,
- zwiększać zużycie RAM,
- powodować konflikty,
- zwiększać powierzchnię ataku.

Rozsądna zasada:

```text
instaluj rozszerzenie wtedy, gdy naprawdę go potrzebujesz
```

---

# 24. Profiles

VS Code obsługuje profile.

Można mieć np.:

```text
Web Development
Go
Python
Minimal
Work
Private
```

Każdy profil może mieć inne:

- rozszerzenia,
- ustawienia,
- skróty,
- UI.

To wygodne, gdy ten sam VS Code służy do wielu różnych zastosowań.

---

# 25. Terminal

VS Code ma wbudowany terminal.

Skrót:

```text
Ctrl+`
```

Można uruchomić wiele terminali jednocześnie.

Przykładowe shelle:

```text
bash
zsh
fish
PowerShell
cmd
```

W praktyce terminal w VS Code może zastąpić osobne okno terminala.

Przykład pracy:

```bash
git status
go test ./...
npm install
docker compose up
ssh server
```

---

# 26. Terminal a VS Code

Ważne: VS Code **nie zastępuje shella**.

Terminal to zwykły shell działający wewnątrz VS Code.

Jeżeli wpiszesz:

```bash
ls
```

to wykonuje to Bash/Zsh itd., a nie sam VS Code.

---

# 27. Tasks

Powtarzalne polecenia można zapisać jako zadania.

Plik:

```text
.vscode/tasks.json
```

Przykład:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "build",
      "type": "shell",
      "command": "go build ./..."
    }
  ]
}
```

Potem można uruchamiać zadanie z Command Palette.

To przydatne dla:

- buildów,
- testów,
- generatorów,
- skryptów,
- deploymentu.

---

# 28. Git w VS Code

VS Code ma wbudowaną obsługę Git.

Repozytorium nadal jest normalnym repozytorium Git.

Można równolegle używać:

```bash
git status
git add
git commit
```

oraz GUI VS Code.

---

# 29. Source Control

Panel Source Control pokazuje:

```text
Changes
Staged Changes
Merge Changes
```

Przy każdym pliku można podejrzeć różnice.

Przykład:

```diff
- oldValue = 10
+ oldValue = 20
```

---

# 30. Typowy commit

Workflow:

```text
zmiana pliku
      ↓
Source Control
      ↓
review diff
      ↓
stage
      ↓
commit
      ↓
push
```

CLI odpowiednik:

```bash
git add .
git commit -m "Add promotion validation"
git push
```

---

# 31. Diff

VS Code ma bardzo dobry podgląd zmian.

Pokazuje:

- usunięte linie,
- dodane linie,
- zmienione fragmenty.

Przed zaakceptowaniem kodu wygenerowanego przez AI **zawsze warto obejrzeć diff**.

---

# 32. Branch

W lewym dolnym rogu widoczna jest aktualna gałąź.

Można:

- stworzyć branch,
- zmienić branch,
- zrobić checkout,
- merge,
- rebase.

Przykład:

```text
main
feature/promotions
fix/date-validator
```

---

# 33. GitHub

Rozszerzenia GitHub umożliwiają obsługę:

- repozytoriów,
- pull requestów,
- issues,
- code review.

VS Code może być więc pełnym klientem GitHub.

---

# 34. Uruchamianie programu

Sposób zależy od języka.

## Go

```bash
go run .
```

## Python

```bash
python app.py
```

## Node.js

```bash
node app.js
```

## npm

```bash
npm run dev
```

VS Code może uruchamiać te polecenia z:

- terminala,
- Run,
- Task,
- Debuggera.

---

# 35. Debugger

Debugger pozwala zatrzymać działanie programu i sprawdzić jego stan.

Najważniejsze pojęcia:

- breakpoint,
- step over,
- step into,
- step out,
- continue,
- variables,
- watch,
- call stack.

---

# 36. Breakpoint

Kliknięcie obok numeru linii tworzy breakpoint.

Program zatrzyma się przed wykonaniem tej linii.

Przykład:

```go
func calculatePrice(price float64) float64 {
    tax := price * 0.23
    return price + tax
}
```

Breakpoint przy:

```go
tax := price * 0.23
```

pozwoli sprawdzić wartość `price`.

---

# 37. Debug controls

Typowe operacje:

```text
Continue
Step Over
Step Into
Step Out
Restart
Stop
```

### Step Over

Wykonaj bieżącą linię.

### Step Into

Wejdź do wywoływanej funkcji.

### Step Out

Wyjdź z aktualnej funkcji.

---

# 38. launch.json

Bardziej złożony debugger konfiguruje się w:

```text
.vscode/launch.json
```

Przykład zależy od języka.

Nie zawsze trzeba pisać go ręcznie — rozszerzenia potrafią wygenerować konfigurację.

---

# 39. Problems

Panel:

```text
Problems
```

pokazuje:

- błędy kompilacji,
- błędy parsera,
- ostrzeżenia,
- problemy linters.

Przykład:

```text
main.go:42 undefined: config
```

Kliknięcie przenosi do błędu.

---

# 40. Linter

Linter analizuje kod bez uruchamiania programu.

Może wykrywać:

- błędy,
- nieużywane zmienne,
- podejrzane konstrukcje,
- problemy stylu.

Przykłady:

```text
ESLint
golangci-lint
Ruff
Pylint
Clang-Tidy
```

---

# 41. IntelliSense

IntelliSense to system podpowiadania kodu.

Może pokazywać:

- nazwy funkcji,
- parametry,
- pola struktury,
- typy,
- dokumentację.

Przykład:

```go
http.
```

może podpowiedzieć:

```text
Get
Post
ListenAndServe
NewRequest
```

---

# 42. Refactoring

VS Code i rozszerzenia potrafią wykonywać refaktoryzację.

Np.:

```text
Rename Symbol
Extract Function
Extract Variable
Organize Imports
```

### Rename Symbol

Zwykle:

```text
F2
```

Zmiana:

```text
getData
```

na:

```text
loadData
```

może zostać wykonana we wszystkich odwołaniach.

To dużo bezpieczniejsze niż zwykłe Search/Replace.

---

# 43. Remote SSH

Jedna z najważniejszych funkcji dla administratora i programisty.

Rozszerzenie:

```text
Remote - SSH
```

Pozwala otworzyć katalog znajdujący się na innym komputerze.

Schemat:

```text
VS Code
   │
   │ SSH
   ▼
serwer
```

Pliki wyglądają tak, jakby były lokalne.

---

# 44. Konfiguracja SSH

Normalny plik:

```text
~/.ssh/config
```

Przykład:

```text
Host vps
    HostName 203.0.113.10
    User user
    IdentityFile ~/.ssh/id_ed25519
```

Potem:

```text
Remote-SSH: Connect to Host
```

i:

```text
vps
```

---

# 45. Dlaczego Remote SSH jest świetne

Zamiast:

```text
SSH
nano config
scp plik
rsync
```

można:

```text
VS Code → Open Folder → /srv/app
```

i normalnie:

- edytować,
- wyszukiwać,
- używać Git,
- uruchamiać terminal,
- debugować.

---

# 46. Dev Containers

VS Code może otworzyć projekt wewnątrz kontenera developerskiego.

Konfiguracja:

```text
.devcontainer/
```

Dzięki temu środowisko może być dokładnie opisane:

```text
Node 24
Go
Python
PostgreSQL client
narzędzia build
```

Niezależnie od systemu hosta projekt zachowuje spójne środowisko.

---

# 47. Docker

VS Code dobrze współpracuje z Dockerem.

Można:

- przeglądać kontenery,
- uruchamiać kontenery,
- zatrzymywać je,
- czytać logi,
- otwierać shell,
- budować obrazy.

Jednak nadal warto znać CLI:

```bash
docker ps
docker images
docker build .
docker compose up
```

---

# 48. Testy

VS Code może integrować się z frameworkami testowymi.

Panel Testing pozwala:

- uruchomić wszystkie testy,
- uruchomić pojedynczy test,
- debugować test,
- zobaczyć błędy.

Przykład Go:

```bash
go test ./...
```

Python:

```bash
pytest
```

JavaScript:

```bash
npm test
```

---

# 49. Skróty, które naprawdę warto znać

| Funkcja | Linux / Windows |
|---|---|
| Command Palette | `Ctrl+Shift+P` |
| Quick Open | `Ctrl+P` |
| Search | `Ctrl+F` |
| Search Project | `Ctrl+Shift+F` |
| Replace | `Ctrl+H` |
| Terminal | `Ctrl+\`` |
| Extensions | `Ctrl+Shift+X` |
| Source Control | `Ctrl+Shift+G` |
| Go to Definition | `F12` |
| Rename Symbol | `F2` |
| Comment | `Ctrl+/` |
| Format Document | `Shift+Alt+F` |
| Next occurrence | `Ctrl+D` |
| Move line | `Alt+↑ / ↓` |
| Command Palette | `Ctrl+Shift+P` |

Nie trzeba uczyć się wszystkich skrótów. Najpierw kilka najczęściej używanych.

---

# 50. Keyboard Shortcuts

Lista skrótów:

```text
Ctrl+K Ctrl+S
```

Można zmienić dowolny skrót.

Konfiguracja trafia do:

```text
keybindings.json
```

---

# 51. VS Code jako edytor Markdown

VS Code bardzo dobrze nadaje się do Markdown.

Podgląd:

```text
Ctrl+Shift+V
```

Podgląd obok dokumentu:

```text
Ctrl+K V
```

Dobrze nadaje się do:

- README,
- dokumentacji,
- notatek,
- roadmap,
- specyfikacji,
- instrukcji dla AI.

---

# 52. Pliki instrukcji dla agentów AI

Coraz częściej repozytorium zawiera pliki opisujące sposób pracy agentów.

Przykładowo:

```text
AGENTS.md
README.md
CONTRIBUTING.md
docs/
```

Można w nich zapisać:

- architekturę projektu,
- komendy testowe,
- zasady formatowania,
- czego agent nie powinien zmieniać,
- sposób budowania projektu,
- strukturę katalogów.

Przykład:

```markdown
# Agent instructions

## Build

go build ./...

## Tests

go test ./...

## Rules

- nie zmieniaj publicznego API bez potrzeby
- nie dodawaj zależności bez uzasadnienia
- każda nowa funkcja ma mieć test
```

Dobre instrukcje znacznie poprawiają pracę agentów.

---

# 53. AI w VS Code — trzy różne poziomy

Warto rozróżnić trzy sposoby używania AI.

## 1. Autocomplete

AI podpowiada kod podczas pisania.

Ty piszesz:

```go
func loadConfig(
```

AI proponuje resztę.

To najbardziej klasyczny Copilot.

## 2. Chat

Pytasz:

```text
Wyjaśnij mi tę funkcję.
```

AI odpowiada, ale nie musi nic zmieniać.

## 3. Agent

Mówisz:

```text
Dodaj walidację konfiguracji.
Dodaj testy.
Uruchom testy.
Napraw błędy.
```

Agent:

1. analizuje repozytorium,
2. wybiera pliki,
3. modyfikuje kod,
4. może uruchamiać polecenia,
5. sprawdza wynik,
6. poprawia błędy.

To już nie jest zwykłe autouzupełnianie.

---

# 54. GitHub Copilot

GitHub Copilot jest systemem AI zintegrowanym z GitHubem oraz IDE.

W VS Code może służyć do:

- autocomplete,
- generowania kodu,
- tłumaczenia kodu,
- wyjaśniania projektu,
- refaktoryzacji,
- tworzenia testów,
- pracy agentowej.

---

# 55. Copilot Chat

Chat pozwala pytać o aktualny projekt.

Przykłady:

```text
Wyjaśnij strukturę tego repozytorium.
```

```text
Gdzie ładowana jest konfiguracja?
```

```text
Która funkcja odpowiada za logowanie?
```

```text
Znajdź możliwe race conditions.
```

AI może wykorzystywać kontekst otwartego workspace.

---

# 56. Tryby Copilota

W obecnych wersjach Copilot Chat dostępne są role/tryby przeznaczone do różnych zadań.

Najważniejsze:

```text
Ask
Plan
Agent
```

## Ask

Do pytań.

Przykład:

```text
Dlaczego ta funkcja zwraca wskaźnik?
```

AI przede wszystkim wyjaśnia.

## Plan

Do przygotowania planu.

Przykład:

```text
Zaplanuj migrację konfiguracji z JSON do YAML.
Nie zmieniaj jeszcze kodu.
```

Agent analizuje projekt i proponuje kroki.

## Agent

Do wykonywania zmian.

Przykład:

```text
Zaimplementuj plan migracji.
Uruchom testy po zmianach.
```

Agent może sam zdecydować:

- które pliki otworzyć,
- co zmienić,
- jakie komendy wykonać,
- jak naprawić błędy.

---

# 57. Dobra praktyka: Plan → Agent

Przy większych zmianach bardzo dobry workflow:

```text
Plan
  ↓
review człowieka
  ↓
Agent
  ↓
diff
  ↓
testy
  ↓
commit
```

Przykład:

```text
Przeanalizuj system konfiguracji.
Zaproponuj plan dodania obsługi zmiennych środowiskowych.
Nie edytuj jeszcze plików.
```

Po sprawdzeniu planu:

```text
Wdróż zaakceptowany plan.
Uruchom wszystkie testy.
```

---

# 58. Copilot Agent Mode

Agent Mode może działać nad całym zadaniem, a nie pojedynczą linijką.

Może:

- przeszukiwać repozytorium,
- edytować wiele plików,
- uruchamiać terminal,
- sprawdzać błędy,
- iteracyjnie poprawiać rozwiązanie.

Przykład zadania:

```text
Dodaj endpoint /health.

Wymagania:
- GET /health
- JSON {"status":"ok"}
- test endpointu
- nie zmieniaj pozostałego API
- uruchom testy
```

To dobry prompt, ponieważ cel i ograniczenia są jasne.

---

# 59. Copilot Cloud Agent

Nie należy mylić dwóch rzeczy:

```text
Agent Mode w IDE
```

i:

```text
Copilot Cloud Agent
```

### Agent Mode

Działa w kontekście lokalnego projektu/środowiska IDE.

### Cloud Agent

Może dostać zadanie związane z repozytorium GitHub, wykonać pracę w środowisku chmurowym i przygotować zmiany do przeglądu, np. w formie pull requestu.

To bardziej przypomina:

```text
delegowanie issue programiście
```

niż autocomplete.

---

# 60. OpenAI Codex

Codex jest agentem programistycznym OpenAI.

Może pracować m.in. przez:

- terminal / Codex CLI,
- rozszerzenie IDE,
- środowisko chmurowe,
- integracje z systemami obsługującymi agentów.

Rozszerzenie Codex jest dostępne dla VS Code oraz wielu edytorów opartych na VS Code.

---

# 61. Codex w VS Code

Codex może działać bezpośrednio w edytorze.

Dzięki temu może korzystać z kontekstu:

- otwartych plików,
- zaznaczonego kodu,
- repozytorium,
- terminala,
- zmian w workspace.

Typowy workflow:

```text
otwierasz repo
     ↓
opisujesz zadanie
     ↓
Codex analizuje projekt
     ↓
modyfikuje pliki
     ↓
uruchamia build/testy
     ↓
przeglądasz diff
```

---

# 62. Codex lokalny i chmurowy

W praktyce warto rozróżniać:

## lokalna praca

Agent działa w kontekście lokalnego workspace.

Dobre do:

- szybkich poprawek,
- debugowania,
- eksperymentów,
- pracy nad plikami, których jeszcze nie wypchnąłeś.

## zadanie chmurowe

Zadanie może zostać przekazane do wykonania poza lokalnym IDE.

Dobre do:

- dłuższych zadań,
- pracy odseparowanej od bieżącego workspace,
- równoległych zmian.

---

# 63. VS Code jako centrum wielu agentów

Współczesny VS Code nie ogranicza się już do jednego systemu AI.

Może służyć jako środowisko, w którym pracują różne agenty, np.:

```text
VS Code
│
├── GitHub Copilot
├── OpenAI Codex
└── inne agenty obsługiwane przez środowisko
```

Istnieją też mechanizmy zarządzania sesjami agentów.

Dzięki temu można np.:

```text
Agent A → analiza
Agent B → implementacja
człowiek → review
```

Nie oznacza to jednak, że im więcej agentów, tym lepiej.

W praktyce jeden dobrze prowadzony agent często wystarcza.

---

# 64. Copilot czy Codex?

Nie trzeba traktować ich jako konkurencyjnych edytorów.

Oba mogą działać wewnątrz VS Code.

Praktyczna różnica mentalna:

```text
Copilot
```

świetnie wpisuje się w codzienny workflow VS Code/GitHub:

- autocomplete,
- chat,
- szybkie edycje,
- Agent,
- integracja GitHub.

```text
Codex
```

można traktować jako osobnego agenta programistycznego:

- analiza repo,
- realizacja większych zadań,
- terminal,
- iteracyjne poprawki,
- praca lokalna lub delegowana.

Wybór zależy od zadania, dostępnego abonamentu, preferowanego modelu i tego, z którym agentem pracuje Ci się wygodniej.

---

# 65. Jak wydawać polecenia agentowi

Słaby prompt:

```text
napraw aplikację
```

Lepszy:

```text
Przeanalizuj dlaczego formularz logowania zwraca HTTP 500.

Znajdź przyczynę.
Nie zmieniaj publicznego API.
Dodaj test reprodukujący błąd.
Napraw problem.
Uruchom testy.
```

Jeszcze lepszy:

```text
Cel:
Napraw HTTP 500 przy pustym polu email w POST /login.

Ograniczenia:
- nie zmieniaj API endpointu
- bez nowych zależności
- zachowaj obecny format odpowiedzi

Definition of Done:
- pusty email zwraca 400
- istnieje test regresyjny
- go test ./... przechodzi
```

---

# 66. Definition of Done

Agentom bardzo pomaga jasne określenie końca zadania.

Przykład:

```text
Definition of Done:

- aplikacja się kompiluje
- wszystkie testy przechodzą
- nowa funkcja ma test
- README zostało zaktualizowane
- nie dodano nowych zależności
```

Agent wie wtedy, kiedy zadanie można uznać za zakończone.

---

# 67. Duże zadania dziel na etapy

Zamiast:

```text
napisz cały CMS
```

lepiej:

```text
1. zaprojektuj strukturę
2. przygotuj modele danych
3. dodaj API
4. dodaj testy
5. przygotuj frontend
6. integracja
```

Jeszcze lepiej wykonywać te kroki w osobnych commitach.

---

# 68. Agent powinien znać komendy projektu

Warto podać:

```text
Build:
go build ./...

Test:
go test ./...

Run:
go run ./cmd/server

Lint:
golangci-lint run
```

Można zapisać je w:

```text
README.md
AGENTS.md
CONTRIBUTING.md
```

Agent nie musi wtedy zgadywać.

---

# 69. AI nie powinno mieć nieograniczonego zaufania

Agent może:

- źle zrozumieć architekturę,
- usunąć potrzebny kod,
- dodać zbędną bibliotekę,
- zmienić API,
- stworzyć podatność,
- napisać test, który niczego sensownie nie sprawdza.

Dlatego model:

```text
AI pisze
człowiek zatwierdza
```

jest znacznie lepszy niż:

```text
AI robi wszystko
```

---

# 70. Zawsze patrz na diff

Przed commitem:

```bash
git diff
```

lub panel Source Control.

Sprawdź:

- co zostało dodane,
- co usunięto,
- czy agent nie zmienił innych plików,
- czy nie pojawiły się przypadkowe zależności,
- czy kod wygląda logicznie.

---

# 71. Commit przed większą pracą AI

Bardzo dobra praktyka:

```bash
git status
git add .
git commit -m "Checkpoint before AI changes"
```

Potem agent może pracować.

Jeżeli coś zepsuje:

```bash
git diff
```

albo można wrócić do poprzedniego stanu.

Git jest najlepszą siatką bezpieczeństwa dla agentów.

---

# 72. Branch dla zadania AI

Przy większych zmianach:

```bash
git switch -c feature/promo-validator
```

Potem agent pracuje tylko na tej gałęzi.

Po zakończeniu:

```bash
git diff main...HEAD
```

można zobaczyć cały zakres zmian.

---

# 73. Worktree

Git worktree pozwala utworzyć drugi katalog roboczy.

Przykład:

```bash
git worktree add ../projekt-agent feature/agent-test
```

Można mieć:

```text
projekt/
```

gdzie pracujesz sam,

oraz:

```text
projekt-agent/
```

gdzie działa agent.

To świetne rozwiązanie dla równoległej pracy.

Nowsze funkcje agentowe VS Code również wykorzystują ideę izolowanych worktree przy niektórych rodzajach sesji.

---

# 74. Agent i terminal

Agent może proponować lub wykonywać polecenia.

Przykład:

```bash
go test ./...
```

To bezpieczne.

Ale agent może też zaproponować:

```bash
rm -rf ...
```

lub:

```bash
sudo ...
```

Dlatego zawsze warto wiedzieć, co dane polecenie robi.

---

# 75. Szczególnie uważaj na

```bash
sudo
rm -rf
chmod -R
chown -R
curl ... | sh
wget ... | sh
docker system prune
git reset --hard
git clean -fd
```

Nie oznacza to, że te komendy są złe.

Po prostu mogą mieć duże skutki.

---

# 76. Sekrety

Nie należy bezmyślnie udostępniać agentowi:

```text
.env
API keys
tokenów
haseł
kluczy prywatnych
credentials
```

W repo powinny znajdować się np.:

```text
.env.example
```

a nie:

```text
.env
```

`.gitignore`:

```gitignore
.env
*.pem
*.key
```

---

# 77. MCP

Nowoczesne agenty mogą korzystać z **MCP — Model Context Protocol**.

W uproszczeniu MCP pozwala agentowi używać dodatkowych narzędzi lub źródeł danych.

Schemat:

```text
agent
  │
  ├── filesystem
  ├── terminal
  ├── GitHub
  ├── baza danych
  └── MCP server
```

Dzięki temu agent może uzyskać dostęp do funkcji wykraczających poza sam edytor.

MCP warto dodawać tylko wtedy, gdy rzeczywiście jest potrzebny.

Każde dodatkowe narzędzie zwiększa możliwości, ale również zakres uprawnień agenta.

---

# 78. AI i kontekst

Agent działa najlepiej, jeżeli kontekst jest czysty.

Dobrze:

```text
otwarty właściwy projekt
jasne zadanie
instrukcje repo
testy
Git
```

Źle:

```text
20 losowych folderów
niejasne wymagania
brak testów
brak informacji jak uruchomić projekt
```

---

# 79. Zasada: najpierw rozpoznanie

Przy obcym repo warto zacząć:

```text
Przeanalizuj repozytorium.

Opisz:
- główne katalogi
- entry point
- sposób uruchamiania
- sposób konfiguracji
- testy
- kluczowe zależności

Na razie niczego nie zmieniaj.
```

Dopiero potem zlecać implementację.

---

# 80. AI jako nauczyciel kodu

Bardzo dobry sposób poznawania projektu:

```text
Wyjaśnij ten plik jak programiście, który zna Go,
ale nie zna tego projektu.
```

Albo:

```text
Pokaż mi ścieżkę requestu od HTTP handlera do bazy danych.
```

Albo:

```text
Które pięć plików powinienem przeczytać najpierw,
żeby zrozumieć aplikację?
```

To często szybsze niż przypadkowe przeglądanie repo.

---

# 81. AI jako reviewer

Po napisaniu kodu samodzielnie:

```text
Zrób code review tej zmiany.

Szukaj:
- błędów logicznych
- problemów bezpieczeństwa
- edge cases
- niepotrzebnej złożoności

Nie edytuj jeszcze kodu.
```

To bardzo dobry przypadek użycia AI.

---

# 82. AI jako debugger

Przykład:

```text
Uruchom testy.

Znajdź przyczynę błędu.

Najpierw wyjaśnij problem.
Dopiero potem zaproponuj poprawkę.
```

Agent może połączyć:

```text
logi
+ kod
+ testy
+ terminal
```

co jest dużo skuteczniejsze niż sam chat bez dostępu do projektu.

---

# 83. AI do dokumentacji

Agent może dobrze pomagać przy:

```text
README.md
docs/
API docs
CHANGELOG
komentarze
instrukcja instalacji
```

Przykład:

```text
Przeczytaj aktualny kod i uaktualnij README.

Nie opisuj funkcji, których projekt faktycznie nie posiada.
```

Ta ostatnia linia jest ważna.

---

# 84. AI do refaktoryzacji

Przykład dobrego zadania:

```text
Plik internal/promotions/service.go stał się zbyt duży.

Zaproponuj podział na mniejsze komponenty.
Nie zmieniaj publicznego API.
Najpierw przygotuj plan.
```

Potem:

```text
Wykonaj plan.
Po każdym etapie uruchom go test ./...
```

---

# 85. AI do testów

Przykład:

```text
Dodaj testy dla parsera dat promocji.

Uwzględnij:
- poprawną datę
- brak daty
- błędny format
- zakres od-do
- datę końcową wcześniejszą niż początkowa
```

AI szczególnie dobrze radzi sobie z generowaniem dużej liczby wariantów testowych.

---

# 86. AI i zależności

Nie pozwalaj agentowi automatycznie dodawać biblioteki do każdej drobnej rzeczy.

Dobry prompt:

```text
Nie dodawaj nowych zależności,
chyba że obecny kod nie pozwala rozsądnie rozwiązać problemu.
```

W małych projektach zależności szybko stają się większym problemem niż kod.

---

# 87. AI i architektura

Agent potrafi napisać kod, ale nie zna wszystkich Twoich planów.

Dlatego decyzje takie jak:

```text
monolit czy mikroserwisy
PostgreSQL czy SQLite
REST czy eventy
Go templates czy SPA
```

warto podejmować świadomie.

AI może przedstawić warianty i konsekwencje, ale ostateczna architektura należy do człowieka.

---

# 88. Przydatny workflow dla małego projektu

Przykład projektu Go:

```text
1. git pull
2. code .
3. przeczytaj TODO / issue
4. zapytaj Plan
5. przejrzyj plan
6. utwórz branch
7. Agent / Codex implementuje
8. przejrzyj diff
9. go test ./...
10. uruchom aplikację
11. ręczny test
12. commit
13. push
```

---

# 89. Workflow dla własnego pomysłu

Jeżeli zaczynasz projekt od zera:

```text
pomysł
  ↓
spec.md
  ↓
architektura
  ↓
minimalny szkielet
  ↓
pierwszy działający vertical slice
  ↓
testy
  ↓
kolejne funkcje
```

Agentowi nie warto od razu mówić:

```text
zbuduj mi kompletną aplikację
```

Lepiej:

```text
Zbuduj minimalny szkielet projektu zgodnie ze spec.md.
Na razie tylko:
- routing
- konfiguracja
- health endpoint
- test health endpoint
```

---

# 90. `README.md` jako mapa projektu

Dobry README powinien odpowiadać:

```text
co to jest
jak uruchomić
jak zbudować
jak testować
jak skonfigurować
```

Przykład:

```markdown
## Build

go build ./...

## Run

go run ./cmd/server

## Test

go test ./...
```

To pomaga zarówno człowiekowi, jak i agentowi AI.

---

# 91. `AGENTS.md`

Jeżeli używasz agentów regularnie, warto przygotować plik:

```text
AGENTS.md
```

Przykład:

```markdown
# Project rules

## Stack

- Go
- PostgreSQL
- HTML templates
- vanilla JavaScript

## Commands

Build:

    go build ./...

Tests:

    go test ./...

## Rules

- prefer standard library
- do not introduce frameworks without approval
- keep handlers thin
- business logic belongs in services
- every bug fix should include a regression test
```

To działa jak instrukcja dla wirtualnego programisty.

---

# 92. `.gitignore`

Przykład prostego projektu:

```gitignore
.env
*.log
tmp/
dist/
bin/
node_modules/
.vscode/*.local.json
```

Nie należy jednak automatycznie ignorować całego:

```text
.vscode/
```

Część konfiguracji workspace może być przydatna dla całego zespołu.

---

# 93. Emmet

VS Code ma bardzo dobre wsparcie Emmet dla HTML/CSS.

W HTML:

```text
ul>li*3
```

może zostać rozwinięte do:

```html
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

Przykład:

```text
div.container>header+main+footer
```

znacznie przyspiesza pisanie HTML.

---

# 94. Snippets

Snippet to gotowy fragment kodu.

Przykład:

```text
for
```

może rozwinąć się do całej pętli.

Można również tworzyć własne snippets.

Przydaje się do często powtarzanych konstrukcji.

---

# 95. Zen Mode

Jeżeli interfejs przeszkadza:

```text
Ctrl+K Z
```

VS Code ukryje większość paneli.

Dobry tryb do:

- pisania,
- czytania kodu,
- dokumentacji.

---

# 96. Split Editor

Można podzielić edytor.

Przydatny układ:

```text
kod              test
kod              test
kod              test
```

albo:

```text
HTML             CSS
```

Przy programowaniu webowym to bardzo wygodne.

---

# 97. Breadcrumbs

Na górze edytora może być widoczna ścieżka:

```text
project > internal > api > handler.go > LoginHandler
```

Pomaga orientować się w dużym repozytorium.

---

# 98. Outline

Outline pokazuje strukturę aktualnego pliku:

```text
functions
classes
methods
variables
structs
```

Przy długich plikach pozwala szybko przechodzić pomiędzy elementami.

---

# 99. Minimap

Po prawej stronie może znajdować się miniaturowy podgląd pliku.

Można go wyłączyć:

```json
"editor.minimap.enabled": false
```

To kwestia preferencji.

---

# 100. Autosave

Opcje:

```text
off
afterDelay
onFocusChange
onWindowChange
```

Przykład:

```json
"files.autoSave": "afterDelay"
```

Przy niektórych projektach automatyczny zapis może natychmiast uruchamiać:

- formatter,
- linter,
- build,
- hot reload.

---

# 101. Hot reload

Frameworki developerskie często obserwują zmiany.

Przykład:

```bash
npm run dev
```

Po zapisaniu pliku strona może automatycznie się odświeżyć.

VS Code sam nie realizuje hot reload — robi to narzędzie/framework uruchomiony w terminalu.

---

# 102. VS Code + Go

Podstawowy zestaw:

```text
VS Code
+
Go extension
+
Go toolchain
```

Typowe komendy:

```bash
go run .
go build ./...
go test ./...
go fmt ./...
go vet ./...
```

Rozszerzenie Go dostarcza m.in.:

- IntelliSense,
- go to definition,
- refactoring,
- debugowanie,
- testy.

---

# 103. VS Code + JavaScript / Node

Przydatne:

```text
ESLint
Prettier
```

Typowe polecenia:

```bash
npm install
npm run dev
npm test
npm run build
```

VS Code ma bardzo dobre natywne wsparcie JavaScript i TypeScript.

---

# 104. VS Code + Python

Typowy zestaw:

```text
Python extension
Pylance
Ruff
```

Wybór interpretera:

```text
Python: Select Interpreter
```

Przykład:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

---

# 105. VS Code jako klient serwera

Dla własnego VPS bardzo wygodny model:

```text
laptop
│
│ VS Code
│
├── lokalne projekty
│
└── Remote SSH
       │
       ▼
      VPS
      ├── /srv/app1
      ├── /srv/app2
      └── /etc/nginx
```

Do konfiguracji systemowej nadal warto dobrze znać terminal i Vim, bo VS Code nie zawsze będzie dostępny.

---

# 106. Lokalny development, deployment z Gitem

Dobry model:

```text
lokalnie:
VS Code
↓
commit
↓
GitHub
↓
serwer:
git pull
build/deploy
```

Nie trzeba edytować produkcji ręcznie.

---

# 107. Lokalny development, deployment Docker

Alternatywa:

```text
VS Code
↓
Dockerfile
↓
docker build
↓
image
↓
server
↓
container
```

Dzięki temu środowisko developerskie i produkcyjne są bardziej przewidywalne.

---

# 108. Source Control + AI — dobry duet

Przy pracy z agentami panel Git powinien być praktycznie cały czas używany.

Po każdej większej zmianie:

```text
Source Control
↓
diff
↓
accept / popraw
```

Nie oceniaj pracy AI wyłącznie po tym, czy program się uruchamia.

---

# 109. Typowe błędy początkującego użytkownika VS Code

## Otwieranie pojedynczego pliku zamiast projektu

Źle:

```bash
code main.go
```

do pracy nad całym repo.

Lepiej:

```bash
code .
```

## Instalowanie dziesiątek rozszerzeń

Więcej nie znaczy lepiej.

## Brak Git

Agent bez Git to proszenie się o problemy.

## Bezmyślne Accept All

Każdy diff trzeba przynajmniej przejrzeć.

## Brak testów

Agent może powiedzieć:

```text
done
```

a aplikacja nadal być zepsuta.

---

# 110. Dobry prompt do pierwszego poznania repozytorium

```text
Przeanalizuj ten projekt.

Chcę zrozumieć:

1. jaki jest jego cel,
2. gdzie znajduje się entry point,
3. jaka jest architektura,
4. gdzie jest konfiguracja,
5. gdzie znajduje się logika biznesowa,
6. jak uruchomić projekt,
7. jak uruchomić testy,
8. które pliki powinienem przeczytać najpierw.

Na razie nie zmieniaj żadnego pliku.
```

---

# 111. Dobry prompt implementacyjny

```text
Dodaj walidację dat promocji.

Wymagania:

- data rozpoczęcia nie może być późniejsza niż końcowa,
- brak jednej z dat powinien być zgłoszony,
- nie zmieniaj publicznego API,
- nie dodawaj nowych bibliotek.

Dodaj testy.

Na końcu uruchom:

go test ./...

Pokaż krótkie podsumowanie zmian.
```

---

# 112. Dobry prompt naprawiający błąd

```text
Mamy błąd: aplikacja panicuje, jeżeli config.yaml nie istnieje.

Najpierw odtwórz problem.

Następnie:
1. znajdź przyczynę,
2. dodaj test regresyjny,
3. napraw problem,
4. uruchom cały zestaw testów.

Nie zmieniaj sposobu konfiguracji aplikacji.
```

---

# 113. Dobry prompt refaktoryzacyjny

```text
Przeanalizuj internal/promotions/service.go.

Chcę zmniejszyć jego złożoność.

Najpierw przygotuj plan refaktoryzacji.

Ograniczenia:
- nie zmieniaj publicznego API,
- nie dodawaj nowych zależności,
- zachowaj wszystkie obecne zachowania,
- testy muszą nadal przechodzić.

Nie zmieniaj jeszcze kodu.
```

---

# 114. Dobry prompt code review

```text
Przejrzyj aktualny git diff.

Szukaj:
- błędów logicznych,
- brakujących edge case,
- regresji,
- problemów bezpieczeństwa,
- zbędnej złożoności.

Nie modyfikuj kodu.
Najpierw przedstaw uwagi.
```

---

# 115. Kiedy używać autocomplete

Najlepiej przy:

- prostych funkcjach,
- boilerplate,
- testach,
- mapowaniu danych,
- powtarzalnym kodzie.

Nie trzeba uruchamiać pełnego agenta do:

```text
if err != nil
```

---

# 116. Kiedy używać chatu

Najlepiej gdy chcesz:

- coś zrozumieć,
- dostać wyjaśnienie,
- znaleźć fragment kodu,
- przedyskutować projekt,
- porównać rozwiązania.

---

# 117. Kiedy używać Plan

Najlepiej przed:

- większą zmianą,
- refaktoryzacją,
- migracją,
- zmianą architektury,
- zadaniem dotykającym wielu plików.

---

# 118. Kiedy używać Agent / Codex

Najlepiej gdy zadanie ma jasny cel i agent może rzeczywiście wykonać pracę:

```text
implementacja funkcji
naprawa błędu
dodanie testów
refaktoryzacja
aktualizacja dokumentacji
```

---

# 119. Kiedy lepiej pracować samemu

AI nie musi być używane do wszystkiego.

Samodzielna praca jest często lepsza, gdy:

- uczysz się nowego mechanizmu,
- zmiana ma 2–3 linie,
- znasz dokładnie miejsce poprawki,
- decyzja architektoniczna wymaga kontekstu biznesowego,
- kod dotyczy szczególnie wrażliwego bezpieczeństwa.

AI ma zwiększać produktywność, a nie odbierać zrozumienie projektu.

---

# 120. Minimalny zestaw rozszerzeń — przykład

Dla Go + web + Docker:

```text
Go
ESLint
Prettier
Container Tools / Docker
GitHub Copilot
OpenAI Codex
```

Opcjonalnie:

```text
GitLens
Markdown All in One
```

Nie ma potrzeby instalowania kilkudziesięciu rozszerzeń.

---

# 121. Minimalne ustawienia — przykład

```json
{
  "editor.fontSize": 15,
  "editor.formatOnSave": true,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "editor.minimap.enabled": false,
  "terminal.integrated.scrollback": 10000
}
```

To dobry prosty punkt startowy.

---

# 122. Praktyczny workflow codziennej pracy

```text
1. otwórz terminal
2. cd ~/projekty/projekt
3. git pull
4. code .
5. git status
6. wybierz zadanie
7. pracuj ręcznie / Copilot / Codex
8. uruchom testy
9. sprawdź git diff
10. uruchom aplikację
11. ręcznie sprawdź funkcję
12. commit
13. push
```

---

# 123. Model pracy z AI, który ma sens

Najbardziej praktyczny model:

```text
CZŁOWIEK
  │
  ├── określa cel
  ├── ustala ograniczenia
  ├── rozumie architekturę
  └── zatwierdza zmiany
        │
        ▼
AGENT AI
  │
  ├── analizuje repo
  ├── proponuje plan
  ├── pisze kod
  ├── uruchamia testy
  └── poprawia błędy
        │
        ▼
GIT DIFF
        │
        ▼
CZŁOWIEK
  │
  ├── review
  ├── test
  └── commit
```

To znacznie bezpieczniejsze i skuteczniejsze niż traktowanie agenta jako magicznego generatora kompletnej aplikacji.

---

# 124. Najważniejsza zasada AI coding

Agent powinien mieć możliwie dużo **kontekstu projektu**, ale możliwie mało **niepotrzebnych uprawnień**.

Czyli:

```text
dużo informacji
mało zgadywania
kontrolowane narzędzia
Git jako zabezpieczenie
testy jako weryfikacja
człowiek jako reviewer
```

---

# 125. Ściąga — VS Code w 60 sekund

Otwórz projekt:

```bash
code .
```

Command Palette:

```text
Ctrl+Shift+P
```

Znajdź plik:

```text
Ctrl+P
```

Znajdź tekst:

```text
Ctrl+F
```

Znajdź w projekcie:

```text
Ctrl+Shift+F
```

Terminal:

```text
Ctrl+`
```

Definicja:

```text
F12
```

Zmiana nazwy symbolu:

```text
F2
```

Formatowanie:

```text
Shift+Alt+F
```

Git:

```text
Ctrl+Shift+G
```

Rozszerzenia:

```text
Ctrl+Shift+X
```

Markdown preview:

```text
Ctrl+Shift+V
```

---

# 126. Ściąga — AI w 60 sekund

Chcesz coś zrozumieć:

```text
Ask
```

Chcesz najpierw zobaczyć sposób rozwiązania:

```text
Plan
```

Chcesz, żeby agent wykonał zadanie:

```text
Agent / Codex
```

Przed większym zadaniem:

```bash
git status
git commit
```

Po pracy agenta:

```bash
git diff
```

Następnie:

```bash
testy
build
ręczna kontrola
commit
```

---

# 127. Źródła i dalsza lektura

Oficjalna dokumentacja VS Code:

https://code.visualstudio.com/docs

Agenci w VS Code:

https://code.visualstudio.com/docs/agents/overview

GitHub Copilot:

https://docs.github.com/en/copilot

Copilot Chat i tryb Agent:

https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide

OpenAI Codex:

https://openai.com/codex/

Informacje OpenAI o rozszerzeniu Codex IDE:

https://openai.com/index/introducing-upgrades-to-codex/

---

# 128. Podsumowanie

VS Code najlepiej traktować nie jako zwykły edytor tekstu, ale jako centrum pracy nad projektem:

```text
                VS CODE
                   │
        ┌──────────┼──────────┐
        │          │          │
      EDYTOR      GIT      TERMINAL
        │          │          │
        └──────┬───┴────┬─────┘
               │        │
            DEBUG      TESTY
               │        │
               └───┬────┘
                   │
                 AI
            ┌──────┴──────┐
            │             │
         COPILOT         CODEX
```

Najważniejsze jest jednak nie samo narzędzie.

Dobry workflow pozostaje klasyczny:

```text
rozumiem problem
      ↓
planuję zmianę
      ↓
piszę / deleguję agentowi
      ↓
czytam diff
      ↓
testuję
      ↓
commituję
```

AI przyspiesza niemal każdy z tych kroków, ale nadal warto wiedzieć, **co dzieje się w kodzie, terminalu i repozytorium**.
