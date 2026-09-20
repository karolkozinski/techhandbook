---
id: "doc-014"
title: "GitHub"
slug: "github"
description: "Kompendium do codziennej pracy z GitHubem i Gitem: repozytoria, commity, branche, synchronizacja, forki, Pull Requesty, Issues, Releases, GitHub CLI, SSH,…"
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "github"
  - "git"
  - "repo"
  - "repository"
---

# GitHub

GitHub jest warstwą współpracy zbudowaną wokół repozytoriów Git. Najważniejsze elementy codziennej pracy to Pull Request, Issues, Actions, permissions, Releases i przegląd diffów - a nie samo klikanie po interfejsie.

Powiązane tematy: [Git w praktyce zespołowej](techhandbook:doc-013), [CI/CD i GitHub Actions](techhandbook:doc-011), [Visual Studio Code](techhandbook:doc-039) oraz [Dokumentowanie rozwiązań technicznych](techhandbook:doc-056).

> Kompendium do codziennej pracy z GitHubem i Gitem: repozytoria, commity, branche, synchronizacja, forki, Pull Requesty, Issues, Releases, GitHub CLI, SSH, konflikty i typowe workflow.

---

## 1. Git a GitHub - to nie jest to samo

### Git

**Git** to rozproszony system kontroli wersji.

Działa lokalnie na komputerze i pozwala:

- śledzić historię zmian,
- zapisywać kolejne wersje projektu,
- tworzyć gałęzie,
- scalać zmiany,
- cofać błędy,
- pracować bez dostępu do internetu.

Najważniejsze polecenie:

```bash
git
```

Przykład:

```bash
git status
```

### GitHub

**GitHub** to serwis internetowy przechowujący repozytoria Git i dodający wokół nich narzędzia do współpracy.

GitHub oferuje m.in.:

- hosting repozytoriów,
- Pull Requesty,
- Issues,
- Actions / CI/CD,
- Releases,
- Wikis,
- Discussions,
- Projects,
- zarządzanie zespołami i uprawnieniami,
- GitHub Pages,
- Codespaces,
- GitHub Copilot,
- przeglądanie historii kodu,
- code review.

Najprościej:

```text
Git     = system kontroli wersji
GitHub  = serwer + interfejs + narzędzia wokół Gita
```

Można używać Gita bez GitHuba.

Można także korzystać z GitLaba, Bitbucketa, Forgejo, Gitea lub własnego serwera Git.

---

# 2. Podstawowe pojęcia

## Repository / repozytorium

Repozytorium to katalog projektu zarządzany przez Git.

Może istnieć:

- lokalnie,
- na GitHubie,
- jednocześnie lokalnie i zdalnie.

Repozytorium zawiera kod oraz katalog:

```text
.git/
```

To właśnie `.git` przechowuje historię projektu.

---

## Working tree

Aktualny stan plików projektu znajdujących się na dysku.

---

## Staging area

Obszar pośredni pomiędzy zmianą pliku a wykonaniem commita.

Dodajesz pliki do staging area poleceniem:

```bash
git add
```

---

## Commit

Commit to zapisany punkt historii projektu.

Można go traktować jak:

```text
snapshot + opis + autor + data
```

Przykład:

```bash
git commit -m "Dodaj formularz kontaktowy"
```

---

## Branch

Branch to niezależna linia rozwoju projektu.

Typowa główna gałąź:

```text
main
```

Przykładowe dodatkowe branche:

```text
feature/login
fix/mobile-menu
experiment/new-layout
```

---

## Remote

Remote to zdalne repozytorium.

Najczęściej główny remote nosi nazwę:

```text
origin
```

Sprawdzenie:

```bash
git remote -v
```

---

## origin

`origin` nie jest specjalnym słowem Gita.

To tylko zwyczajowa nazwa zdalnego repozytorium.

Przykład:

```text
origin -> git@github.com:user/projekt.git
```

---

## upstream

`upstream` jest zwyczajową nazwą repozytorium źródłowego.

Najczęściej występuje przy pracy z forkiem.

Przykład:

```text
upstream -> oryginalny projekt
origin   -> twój fork
```

---

## HEAD

`HEAD` wskazuje aktualnie używany commit/branch.

Najczęściej:

```text
HEAD -> main
```

---

# 3. Instalacja Gita

## Debian / Ubuntu

```bash
sudo apt update
sudo apt install git
```

Sprawdzenie:

```bash
git --version
```

---

## FreeBSD

```bash
sudo pkg install git
```

---

## Windows

Najpopularniej:

- Git for Windows,
- instalacja przez `winget`.

Przykład:

```powershell
winget install Git.Git
```

---

# 4. Pierwsza konfiguracja Gita

Ustaw nazwę autora:

```bash
git config --global user.name "Anna"
```

Ustaw e-mail:

```bash
git config --global user.email "adres@example.com"
```

Sprawdzenie:

```bash
git config --global --list
```

---

## Domyślna gałąź main

```bash
git config --global init.defaultBranch main
```

---

## Domyślny edytor

Vim:

```bash
git config --global core.editor "vim"
```

VS Code:

```bash
git config --global core.editor "code --wait"
```

---

# 5. Tworzenie repozytorium lokalnego

Przejdź do katalogu:

```bash
cd moj-projekt
```

Uruchom:

```bash
git init
```

Git utworzy:

```text
.git/
```

Sprawdź:

```bash
git status
```

---

# 6. Klonowanie repozytorium

Jeżeli repozytorium istnieje już na GitHubie:

```bash
git clone ADRES
```

HTTPS:

```bash
git clone https://github.com/user/projekt.git
```

SSH:

```bash
git clone git@github.com:user/projekt.git
```

Git:

1. pobierze repozytorium,
2. utworzy katalog,
3. skonfiguruje remote `origin`.

---

## Klonowanie pod inną nazwą katalogu

```bash
git clone git@github.com:user/projekt.git lokalny-projekt
```

---

# 7. Codzienny cykl pracy

Typowy workflow:

```bash
git pull
git status
# edycja plików
git diff
git add .
git commit -m "Opis zmian"
git push
```

W praktyce warto robić mniejsze, logiczne commity.

---

# 8. git status

Jedno z najważniejszych poleceń:

```bash
git status
```

Pokazuje:

- aktualny branch,
- zmodyfikowane pliki,
- nowe pliki,
- pliki dodane do staging,
- pliki usunięte,
- relację do zdalnej gałęzi.

Krótka forma:

```bash
git status -s
```

Przykład:

```text
 M README.md
?? notes.md
```

`M` oznacza modified.

`??` oznacza plik nieśledzony.

---

# 9. git add

Dodanie jednego pliku:

```bash
git add README.md
```

Kilku:

```bash
git add README.md main.go
```

Wszystkich zmian:

```bash
git add .
```

Lub:

```bash
git add -A
```

---

## Dodawanie fragmentów zmian

Bardzo użyteczne:

```bash
git add -p
```

Git pozwoli wybrać konkretne fragmenty zmian.

Dzięki temu można stworzyć czyste, logiczne commity.

---

# 10. git diff

Zmiany jeszcze niedodane do staging:

```bash
git diff
```

Zmiany już dodane przez `git add`:

```bash
git diff --staged
```

Zmiany względem innego brancha:

```bash
git diff main
```

---

# 11. Commit

Podstawowo:

```bash
git commit -m "Dodaj obsługę formularza"
```

Jeżeli chcesz otworzyć edytor:

```bash
git commit
```

---

## Dobry commit

Dobry commit powinien reprezentować jedną logiczną zmianę.

Dobrze:

```text
Dodaj walidację formularza kontaktowego
```

Gorzej:

```text
zmiany
```

Jeszcze gorzej:

```text
asdf
```

---

# 12. Historia commitów

```bash
git log
```

Krótsza forma:

```bash
git log --oneline
```

Przykład:

```text
d91fc21 Add contact form
81ac812 Fix navigation
2b917df Initial commit
```

---

## Przydatny widok historii

```bash
git log --graph --oneline --decorate --all
```

Można stworzyć alias:

```bash
git config --global alias.lg "log --graph --oneline --decorate --all"
```

Potem:

```bash
git lg
```

---

# 13. Branche

Lista branchy:

```bash
git branch
```

Nowy branch:

```bash
git branch feature/login
```

Przełączenie:

```bash
git switch feature/login
```

---

## Utworzenie i przełączenie jednocześnie

```bash
git switch -c feature/login
```

Starszy odpowiednik:

```bash
git checkout -b feature/login
```

W nowoczesnym Git warto preferować:

```bash
git switch
```

do pracy z branchami.

---

# 14. Usuwanie brancha

Po mergu:

```bash
git branch -d feature/login
```

Wymuszenie:

```bash
git branch -D feature/login
```

Branch zdalny:

```bash
git push origin --delete feature/login
```

---

# 15. Merge

Załóżmy:

```text
main
feature/login
```

Chcesz dodać feature do `main`.

Najpierw:

```bash
git switch main
```

Potem:

```bash
git merge feature/login
```

---

# 16. Fast-forward merge

Jeżeli od utworzenia feature brancha `main` się nie zmienił, Git może po prostu przesunąć wskaźnik brancha.

To właśnie:

```text
fast-forward
```

---

# 17. Merge commit

Jeżeli obie gałęzie rozwijały się niezależnie, Git może utworzyć dodatkowy commit scalający.

Schemat:

```text
A---B---C main
     \
      D---E feature
```

Po mergu:

```text
A---B---C-------M
     \         /
      D---E----
```

`M` jest merge commitem.

---

# 18. Konflikty

Konflikt pojawia się wtedy, gdy Git nie potrafi automatycznie zdecydować, którą wersję zachować.

Przykład:

```text
<<<<<<< HEAD
wersja z main
=======
wersja z feature
>>>>>>> feature
```

Musisz ręcznie zdecydować, jak ma wyglądać poprawna wersja.

Po poprawieniu:

```bash
git add plik
git commit
```

---

## Przerwanie merge

```bash
git merge --abort
```

---

# 19. Rebase

Rebase przenosi commity na nową podstawę.

Przykład:

```bash
git switch feature/login
git rebase main
```

Pozwala zachować bardziej liniową historię.

---

## Merge vs rebase

Merge:

```text
zachowuje historię rozgałęzienia
```

Rebase:

```text
przepisuje historię commitów
```

Dobra zasada:

> Nie rób rebase cudzych commitów, które zostały już opublikowane i są aktywnie używane przez innych.

---

# 20. git pull

Najprościej:

```bash
git pull
```

W uproszczeniu:

```text
git pull = git fetch + integracja zmian
```

Integracją może być merge albo rebase, zależnie od konfiguracji i parametrów.

---

## Pull z rebase

```bash
git pull --rebase
```

Często daje czystszą historię.

---

# 21. git fetch

```bash
git fetch
```

Pobiera informacje o nowych commitach i branchach z serwera, ale nie zmienia automatycznie twojego working tree.

To bezpieczny sposób na sprawdzenie, co zmieniło się zdalnie.

Przykład:

```bash
git fetch origin
```

---

# 22. git push

Wysłanie commitów:

```bash
git push
```

Pierwszy push nowego brancha:

```bash
git push -u origin feature/login
```

`-u` ustawia upstream tracking branch.

Potem wystarczy:

```bash
git push
```

---

# 23. Remote

Lista:

```bash
git remote
```

Więcej informacji:

```bash
git remote -v
```

Dodanie:

```bash
git remote add origin git@github.com:user/repo.git
```

Zmiana adresu:

```bash
git remote set-url origin git@github.com:user/nowe-repo.git
```

Usunięcie:

```bash
git remote remove origin
```

---

# 24. Lokalne repozytorium → GitHub

Załóżmy, że masz lokalny projekt:

```bash
git init
git add .
git commit -m "Initial commit"
```

Na GitHubie tworzysz puste repozytorium.

Następnie:

```bash
git remote add origin git@github.com:user/projekt.git
git branch -M main
git push -u origin main
```

---

# 25. .gitignore

`.gitignore` określa pliki, których Git nie powinien śledzić.

Przykład:

```gitignore
.env
node_modules/
dist/
build/
*.log
.DS_Store
```

---

## Ważne

`.gitignore` nie przestanie śledzić pliku, który został wcześniej dodany do repozytorium.

Wtedy:

```bash
git rm --cached plik
```

Np.:

```bash
git rm --cached .env
```

---

# 26. Nigdy nie wrzucaj sekretów do repozytorium

Nie commituj:

```text
API keys
hasła
tokeny
klucze prywatne SSH
pliki .env
sekrety produkcyjne
credentials
```

Samo późniejsze usunięcie pliku nie oznacza usunięcia sekretu z historii Git.

Jeżeli sekret trafił do repozytorium:

1. unieważnij go,
2. wygeneruj nowy,
3. dopiero potem czyść historię repozytorium.

---

# 27. Fork

Fork to osobne repozytorium utworzone na podstawie innego repozytorium.

GitHub zachowuje informację:

```text
twój fork -> upstream
```

Fork ma własne:

- branche,
- ustawienia,
- Issues,
- Pull Requesty,
- Actions,
- tagi,
- uprawnienia.

---

# 28. Po co fork?

Najczęściej:

### Open source

Nie masz prawa pushować do oryginalnego projektu.

Robisz więc:

```text
fork
↓
clone twojego forka
↓
branch
↓
zmiany
↓
push
↓
Pull Request do oryginalnego repo
```

### Eksperyment

Chcesz rozwijać własną wersję projektu.

### Długotrwała własna odmiana

Fork może funkcjonować jako osobny wariant projektu.

---

# 29. Fork a branch

To bardzo ważne rozróżnienie.

## Branch

Istnieje w tym samym repozytorium.

```text
repo
 ├── main
 ├── feature-a
 └── feature-b
```

## Fork

Jest osobnym repozytorium.

```text
oryginał
   |
   └── fork użytkownikaa
```

Jeżeli masz write access do projektu, zwykle wygodniej użyć brancha.

Jeżeli go nie masz - często używa się forka.

---

# 30. Workflow z forkiem

Forkujesz projekt na GitHubie.

Potem:

```bash
git clone git@github.com:user/projekt.git
cd projekt
```

Twój fork:

```text
origin
```

Dodajesz oryginalne repo:

```bash
git remote add upstream git@github.com:autor/projekt.git
```

Sprawdzenie:

```bash
git remote -v
```

Powinno być mniej więcej:

```text
origin    git@github.com:user/projekt.git
upstream  git@github.com:autor/projekt.git
```

---

# 31. Synchronizacja forka

Pobierz upstream:

```bash
git fetch upstream
```

Przejdź na main:

```bash
git switch main
```

Zaktualizuj:

```bash
git merge upstream/main
```

lub:

```bash
git rebase upstream/main
```

Następnie:

```bash
git push origin main
```

---

# 32. Pull Request

Pull Request, czyli PR, to propozycja włączenia zmian z jednego brancha do drugiego.

Najczęściej:

```text
feature/login -> main
```

albo:

```text
fork użytkownikaa -> upstream/main
```

Pull Request umożliwia:

- przegląd kodu,
- komentarze,
- code review,
- automatyczne testy,
- dyskusję,
- zatwierdzanie,
- merge.

---

# 33. Typowy Pull Request

```text
main
 ↓
feature branch
 ↓
commity
 ↓
push
 ↓
Pull Request
 ↓
review
 ↓
poprawki
 ↓
merge
```

---

# 34. Draft Pull Request

Jeżeli praca nie jest jeszcze gotowa:

```text
Draft PR
```

Pozwala pokazać zmiany innym bez sugerowania, że są gotowe do mergowania.

---

# 35. Merge PR

GitHub najczęściej oferuje trzy strategie.

## Merge commit

Zachowuje wszystkie commity i tworzy merge commit.

## Squash and merge

Wszystkie commity PR-a zostają połączone w jeden commit.

Przydatne, gdy branch zawiera:

```text
fix
fix2
oops
really fix
final fix
```

Po squash:

```text
Add login validation
```

## Rebase and merge

Commity zostają kolejno przeniesione na koniec brancha docelowego.

Historia pozostaje liniowa.

---

# 36. Issues

Issue to zadanie, problem, pomysł lub zgłoszenie.

Przykłady:

```text
Bug: formularz nie działa w Firefox
Feature: dodać wyszukiwarkę
Task: przygotować Dockerfile
```

Issue może mieć:

- opis,
- komentarze,
- labels,
- assignee,
- milestone,
- powiązany PR.

---

# 37. Automatyczne zamykanie Issue

W Pull Requeście lub commit message można wpisać:

```text
Fixes #42
```

Po mergu GitHub automatycznie zamknie Issue #42.

Inne formy:

```text
Closes #42
Resolves #42
```

---

# 38. Labels

Labels pomagają klasyfikować Issues i PR-y.

Przykłady:

```text
bug
feature
documentation
good first issue
help wanted
priority-high
backend
frontend
```

---

# 39. Milestones

Milestone grupuje Issues i PR-y związane z większym celem.

Np.:

```text
v1.0
MVP
Beta
Q1 2027
```

---

# 40. Releases

Release reprezentuje oficjalnie opublikowaną wersję projektu.

Przykład:

```text
v1.0.0
```

Release może zawierać:

- opis zmian,
- pliki binarne,
- archiwa,
- instalatory,
- dokumentację,
- release notes.

---

# 41. Tagi Git

Tag wskazuje konkretny commit.

Przykład:

```bash
git tag v1.0.0
```

Lista:

```bash
git tag
```

Push taga:

```bash
git push origin v1.0.0
```

Wszystkie tagi:

```bash
git push origin --tags
```

---

# 42. Semantic Versioning

Popularny schemat:

```text
MAJOR.MINOR.PATCH
```

Np.:

```text
2.4.1
```

Interpretacja:

```text
2 = duże zmiany / potencjalna niekompatybilność
4 = nowe funkcje
1 = poprawki błędów
```

---

# 43. README.md

README jest wizytówką repozytorium.

Dobry README zawiera:

```text
Nazwa projektu
Opis
Screenshot
Funkcje
Instalacja
Uruchomienie
Konfiguracja
Przykłady
Roadmap
Licencja
```

---

# 44. LICENSE

Licencja określa, co inni mogą robić z kodem.

Popularne:

```text
MIT
Apache 2.0
GPLv3
BSD
MPL
```

Brak licencji nie oznacza:

```text
rób co chcesz
```

Wręcz przeciwnie - standardowo autor zachowuje prawa.

---

# 45. CONTRIBUTING.md

Plik opisujący sposób współpracy z projektem.

Może zawierać:

- standard kodu,
- sposób tworzenia branchy,
- sposób nazywania commitów,
- proces PR,
- wymagane testy,
- zasady zgłaszania Issues.

---

# 46. CODEOWNERS

Plik:

```text
.github/CODEOWNERS
```

Pozwala przypisać właścicieli fragmentów projektu.

Np.:

```text
/frontend/ @frontend-team
/backend/ @backend-team
```

GitHub może automatycznie prosić odpowiednie osoby o review.

---

# 47. GitHub Actions

GitHub Actions automatyzuje zadania.

Przykłady:

```text
build
testy
lint
deploy
publikowanie obrazu Docker
release
skan bezpieczeństwa
```

Workflow znajduje się zwykle w:

```text
.github/workflows/
```

Np.:

```text
.github/workflows/test.yml
```

---

# 48. GitHub Pages

GitHub Pages pozwala publikować statyczne strony WWW bezpośrednio z repozytorium.

Nadaje się m.in. do:

- dokumentacji,
- portfolio,
- stron projektu,
- prostych statycznych serwisów.

---

# 49. GitHub Projects

Projects to narzędzie do organizacji pracy.

Można używać:

```text
Backlog
Todo
In progress
Review
Done
```

Może działać podobnie do prostego Kanbana.

---

# 50. GitHub Discussions

Discussions są przeznaczone bardziej do rozmów społeczności niż do konkretnych bugów.

Dobre do:

- pytań,
- pomysłów,
- głosowań,
- dyskusji o kierunku projektu.

---

# 51. GitHub CLI - `gh`

GitHub posiada oficjalny CLI:

```bash
gh
```

Pozwala obsługiwać GitHub bez przeglądarki.

---

# 52. Instalacja GitHub CLI

## Debian

Najlepiej użyć oficjalnego repozytorium pakietów GitHub CLI albo pakietu dostępnego dla używanej wersji systemu.

Sprawdzenie:

```bash
gh --version
```

## FreeBSD

```bash
sudo pkg install gh
```

---

# 53. Logowanie do GitHub CLI

```bash
gh auth login
```

CLI zapyta m.in.:

```text
GitHub.com
HTTPS lub SSH
sposób uwierzytelnienia
```

Sprawdzenie:

```bash
gh auth status
```

---

# 54. Tworzenie repo przez CLI

Interaktywnie:

```bash
gh repo create
```

Np.:

```bash
gh repo create example-site
```

Publiczne:

```bash
gh repo create example-site --public
```

Prywatne:

```bash
gh repo create example-site --private
```

---

# 55. Klonowanie przez gh

```bash
gh repo clone owner/repository
```

Np.:

```bash
gh repo clone user/example-site
```

---

# 56. Fork przez CLI

```bash
gh repo fork owner/repository
```

Można również od razu sklonować fork.

---

# 57. Pull Request przez CLI

Utworzenie:

```bash
gh pr create
```

Podgląd:

```bash
gh pr view
```

Lista:

```bash
gh pr list
```

Checkout PR:

```bash
gh pr checkout 42
```

Merge:

```bash
gh pr merge 42
```

---

# 58. Issues przez CLI

Lista:

```bash
gh issue list
```

Nowe Issue:

```bash
gh issue create
```

Podgląd:

```bash
gh issue view 42
```

Zamknięcie:

```bash
gh issue close 42
```

---

# 59. Releases przez CLI

Lista:

```bash
gh release list
```

Utworzenie:

```bash
gh release create v1.0.0
```

Podgląd:

```bash
gh release view v1.0.0
```

---

# 60. Actions przez CLI

Lista workflow:

```bash
gh workflow list
```

Lista uruchomień:

```bash
gh run list
```

Podgląd konkretnego runa:

```bash
gh run view
```

Śledzenie działania:

```bash
gh run watch
```

---

# 61. SSH do GitHuba

SSH jest bardzo wygodne do codziennego używania.

Generowanie klucza:

```bash
ssh-keygen -t ed25519 -C "adres@example.com"
```

Domyślnie powstaną:

```text
~/.ssh/id_ed25519
~/.ssh/id_ed25519.pub
```

Publiczny klucz:

```bash
cat ~/.ssh/id_ed25519.pub
```

Dodajesz go do GitHuba.

---

## Test połączenia

```bash
ssh -T git@github.com
```

---

## Adres SSH repozytorium

```text
git@github.com:user/repository.git
```

---

# 62. HTTPS vs SSH

## HTTPS

Zalety:

- łatwe na start,
- działa praktycznie wszędzie.

## SSH

Zalety:

- wygodne po konfiguracji,
- bez wpisywania danych przy każdym push,
- popularne w pracy developerskiej.

Do stałej pracy developerskiej SSH jest bardzo wygodne.

---

# 63. git restore

Przywrócenie pliku do wersji z ostatniego commita:

```bash
git restore plik
```

UWAGA: tracisz niezapisane zmiany w tym pliku.

---

## Usunięcie pliku ze staging

```bash
git restore --staged plik
```

Plik pozostanie zmodyfikowany, ale przestanie być przygotowany do commita.

---

# 64. git reset

Reset pozwala przesuwać aktualny branch do wcześniejszego commita.

### Soft

```bash
git reset --soft HEAD~1
```

Cofa commit, ale pozostawia zmiany w staging.

### Mixed

```bash
git reset HEAD~1
```

Cofa commit i staging, ale pozostawia zmiany w plikach.

### Hard

```bash
git reset --hard HEAD~1
```

Cofa commit i usuwa lokalne zmiany.

`--hard` należy traktować ostrożnie.

---

# 65. git revert

Bezpieczny sposób cofnięcia opublikowanego commita:

```bash
git revert HASH
```

Git tworzy nowy commit odwracający stare zmiany.

Dobre rozwiązanie dla historii, która została już wypchnięta do wspólnego repozytorium.

---

# 66. Amend

Zmiana ostatniego commita:

```bash
git commit --amend
```

Zmiana komunikatu:

```bash
git commit --amend -m "Nowy opis"
```

Jeżeli commit był już opublikowany, amend zmienia jego hash.

---

# 67. Stash

Stash pozwala tymczasowo schować niezacommitowane zmiany.

```bash
git stash
```

Lista:

```bash
git stash list
```

Przywrócenie:

```bash
git stash pop
```

Bez usunięcia ze stash:

```bash
git stash apply
```

---

# 68. Praktyczny przykład stash

Pracujesz nad:

```text
feature/search
```

Nagle musisz poprawić błąd na `main`.

```bash
git stash
git switch main
```

Naprawiasz błąd.

Potem:

```bash
git switch feature/search
git stash pop
```

I kontynuujesz pracę.

---

# 69. Cherry-pick

Pozwala przenieść konkretny commit z innego brancha.

```bash
git cherry-pick HASH
```

Przykład:

```bash
git cherry-pick a12bc34
```

Przydatne, gdy potrzebujesz jednej konkretnej poprawki bez mergowania całej gałęzi.

---

# 70. Git blame

Pokazuje, kto i kiedy zmienił konkretne linie:

```bash
git blame plik
```

Np.:

```bash
git blame main.go
```

To narzędzie do badania historii, niekoniecznie do szukania winnych.

---

# 71. Git show

Pokazuje szczegóły commita:

```bash
git show HASH
```

Np.:

```bash
git show a12bc34
```

---

# 72. Git grep

Wyszukiwanie w śledzonych plikach repo:

```bash
git grep "TODO"
```

---

# 73. Git clean

Pokazuje nieśledzone pliki, które mogą zostać usunięte:

```bash
git clean -n
```

Usunięcie:

```bash
git clean -f
```

Katalogi:

```bash
git clean -fd
```

Najpierw praktycznie zawsze używaj:

```bash
git clean -n
```

---

# 74. Force push

```bash
git push --force
```

Może nadpisać historię na serwerze.

Bezpieczniejsza odmiana:

```bash
git push --force-with-lease
```

`--force-with-lease` sprawdza, czy ktoś inny nie zmienił zdalnego brancha.

Jeżeli musisz użyć force push, zwykle wybieraj:

```bash
git push --force-with-lease
```

---

# 75. Detached HEAD

Możesz przejść bezpośrednio do konkretnego commita:

```bash
git switch --detach HASH
```

Wtedy:

```text
HEAD nie wskazuje na branch
```

To tzw. detached HEAD.

Możesz oglądać kod i eksperymentować.

Jeśli chcesz zachować zmiany:

```bash
git switch -c nowy-branch
```

---

# 76. GitHub branch protection / rulesets

Można chronić ważne branche, np.:

```text
main
```

Typowe zasady:

- zakaz bezpośredniego push,
- wymagany Pull Request,
- wymagane review,
- wymagane testy,
- zakaz force push,
- wymagany podpis commitów.

Dobre dla zespołów i ważnych projektów.

---

# 77. GitHub Secrets

Sekrety dla Actions można przechowywać w GitHubie.

Przykładowo:

```text
API_TOKEN
SSH_KEY
DEPLOY_PASSWORD
```

Workflow może korzystać z nich bez umieszczania sekretu w repozytorium.

---

# 78. GitHub Organizations

Organization grupuje:

- repozytoria,
- użytkowników,
- zespoły,
- uprawnienia.

Przykład:

```text
Null Yard
 ├── martwy-kompas
 ├── web-monitor
 ├── hermes-tools
 └── experiments
```

Przy wielu projektach organizacja jest wygodniejsza niż trzymanie wszystkiego na koncie osobistym.

---

# 79. Publiczne i prywatne repozytorium

## Public

Każdy może zobaczyć repozytorium.

Dobre do:

- portfolio,
- open source,
- narzędzi publicznych,
- demonstracji projektu.

## Private

Kod widzą tylko osoby z odpowiednimi uprawnieniami.

Dobre do:

- projektów firmowych,
- eksperymentów,
- niedokończonych produktów,
- kodu zawierającego rozwiązania, których nie chcesz publikować.

Sekretów nadal nie należy commitować nawet do prywatnego repozytorium.

---

# 80. Typowy workflow dla własnego projektu

Przykład:

```bash
git switch main
git pull

git switch -c feature/search

# praca

git status
git diff
git add .
git commit -m "Add story search"

git push -u origin feature/search
```

Tworzysz Pull Request.

Po merge:

```bash
git switch main
git pull
git branch -d feature/search
```

---

# 81. Typowy workflow solo - prostszy wariant

Jeżeli projekt robisz sam i nie potrzebujesz PR do każdej zmiany:

```bash
git pull
# praca
git add .
git commit -m "Improve article layout"
git push
```

Nie trzeba sztucznie komplikować workflow.

Branche warto jednak stosować przy:

- większych zmianach,
- eksperymentach,
- refactoringu,
- ryzykownych funkcjach.

---

# 82. Workflow open source

```bash
gh repo fork owner/project --clone
cd project
```

Dodaj upstream, jeśli nie zrobił tego automatycznie workflow:

```bash
git remote add upstream git@github.com:owner/project.git
```

Nowa gałąź:

```bash
git switch -c fix/readme
```

Zmiany:

```bash
git add README.md
git commit -m "Fix installation instructions"
```

Push:

```bash
git push -u origin fix/readme
```

PR:

```bash
gh pr create
```

---

# 83. Aktualizacja brancha przed PR

```bash
git fetch upstream
git rebase upstream/main
```

Jeżeli pojawią się konflikty:

```bash
# popraw pliki
git add .
git rebase --continue
```

Jeżeli chcesz przerwać:

```bash
git rebase --abort
```

Po rebase opublikowanego własnego brancha może być potrzebne:

```bash
git push --force-with-lease
```

---

# 84. GitHub Web UI - rzeczy, które warto znać

W repozytorium najczęściej zobaczysz:

```text
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
```

## Code

Kod projektu i historia plików.

## Issues

Zadania i błędy.

## Pull requests

Propozycje zmian.

## Actions

Automatyzacje CI/CD.

## Security

Alerty bezpieczeństwa i zależności.

## Insights

Statystyki projektu.

## Settings

Konfiguracja repozytorium.

---

# 85. Commit hash

Każdy commit ma unikalny identyfikator.

Przykład:

```text
8a3d9c6e81923...
```

Zwykle wystarczy krótki fragment:

```text
8a3d9c6
```

Używany np.:

```bash
git show 8a3d9c6
git revert 8a3d9c6
git cherry-pick 8a3d9c6
```

---

# 86. Origin/main

Po:

```bash
git fetch
```

Git może mieć lokalny wskaźnik:

```text
origin/main
```

To nie jest zwykły lokalny branch.

To lokalna informacja o stanie zdalnego brancha `main` z repozytorium `origin`.

---

# 87. Sprawdzenie różnicy local vs remote

```bash
git fetch
git log HEAD..origin/main --oneline
```

Commity dostępne zdalnie, których nie masz lokalnie.

Odwrotnie:

```bash
git log origin/main..HEAD --oneline
```

Twoje lokalne commity, których nie ma jeszcze na GitHubie.

---

# 88. Alias przydatnych komend

Możesz stworzyć:

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
```

Przykład:

```bash
git st
```

---

# 89. Najważniejsze pliki GitHubowe

Typowe:

```text
README.md
LICENSE
CONTRIBUTING.md
SECURITY.md
CODE_OF_CONDUCT.md
.github/
```

W `.github/` mogą być:

```text
workflows/
ISSUE_TEMPLATE/
PULL_REQUEST_TEMPLATE.md
CODEOWNERS
dependabot.yml
```

---

# 90. Pull Request Template

Przykład pliku:

```text
.github/PULL_REQUEST_TEMPLATE.md
```

Może automatycznie dodawać formularz:

```markdown
## Co zmieniono?

## Jak przetestować?

## Powiązane Issue

## Checklist
- [ ] testy przechodzą
- [ ] dokumentacja zaktualizowana
```

---

# 91. Issue Templates

Możesz mieć osobne szablony:

```text
Bug report
Feature request
Documentation issue
```

Pomagają uzyskać kompletne zgłoszenia.

---

# 92. GitHub Actions - minimalna idea

Workflow może wyglądać koncepcyjnie tak:

```yaml
name: Test

on:
  push:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v7
      - run: go test ./...
```

Nie musisz znać Actions od razu.

Warto jednak rozumieć zasadę:

```text
zdarzenie
↓
runner
↓
kolejne kroki
↓
wynik
```

---

# 93. CI/CD

## CI - Continuous Integration

Automatycznie:

```text
build
test
lint
security checks
```

po push lub PR.

## CD - Continuous Delivery / Deployment

Automatyczne:

```text
release
deployment
publikacja aplikacji
```

---

# 94. GitHub Packages

GitHub może przechowywać pakiety i obrazy kontenerów.

Przykład:

```text
ghcr.io
```

GitHub Container Registry może przechowywać obrazy Dockera.

---

# 95. Gist

Gist służy do przechowywania małych fragmentów kodu lub tekstu.

CLI:

```bash
gh gist create plik.txt
```

Dobre do:

- snippetów,
- notatek,
- małych przykładów.

Nie zastępuje pełnego repozytorium.

---

# 96. Clone vs fork

## Clone

Tworzy lokalną kopię repozytorium.

```bash
git clone ...
```

Nie tworzy nowego repozytorium na GitHubie.

## Fork

Tworzy nowe repozytorium na GitHubie powiązane z upstream.

Potem fork zazwyczaj klonujesz.

---

# 97. Pull vs fetch

## fetch

```bash
git fetch
```

Pobiera informacje.

Nie integruje automatycznie zmian.

## pull

```bash
git pull
```

Pobiera i integruje zmiany.

Jeżeli chcesz najpierw zobaczyć, co się zmieniło:

```bash
git fetch
git log HEAD..origin/main --oneline
```

---

# 98. Add vs commit vs push

To jeden z najważniejszych modeli mentalnych.

```text
plik
 ↓
git add
 ↓
staging
 ↓
git commit
 ↓
lokalne repozytorium
 ↓
git push
 ↓
GitHub
```

`commit` nie wysyła kodu na GitHuba.

`push` wysyła istniejące lokalne commity.

---

# 99. Pull Request nie jest git pull

To często mylone pojęcia.

```text
git pull
```

jest komendą Gita pobierającą zmiany.

```text
Pull Request
```

jest funkcją GitHuba służącą do proponowania zmian.

---

# 100. Fork nie jest kopią ZIP

Fork zachowuje relację z repozytorium źródłowym.

GitHub wie:

```text
forked from owner/project
```

Dzięki temu można:

- synchronizować zmiany,
- tworzyć PR do upstream,
- śledzić relację między repozytoriami.

---

# 101. Praca z istniejącym projektem - bezpieczna procedura

Po sklonowaniu:

```bash
git status
git remote -v
git branch -a
git log --oneline -10
```

Jeżeli chcesz coś zmienić:

```bash
git switch -c moja-zmiana
```

Po pracy:

```bash
git diff
git add .
git commit -m "Opis zmiany"
git push -u origin moja-zmiana
```

---

# 102. Jak przeczytać repozytorium, którego nie znasz

Najpierw zobacz:

```text
README.md
LICENSE
CONTRIBUTING.md
```

Potem:

```bash
git log --oneline -20
```

Sprawdź:

```bash
git branch -a
```

Następnie strukturę katalogów:

```bash
tree -L 2
```

lub:

```bash
find . -maxdepth 2 -type f
```

Sprawdź build system:

```text
Makefile
package.json
go.mod
Cargo.toml
pyproject.toml
requirements.txt
Dockerfile
docker-compose.yml
```

---

# 103. Jak sprawdzić, co ostatnio zmieniono

```bash
git log --oneline -10
```

Szczegóły:

```bash
git show HEAD
```

Poprzedni commit:

```bash
git show HEAD~1
```

Zmiany między dwoma commitami:

```bash
git diff HASH1 HASH2
```

---

# 104. Jak cofnąć przypadkową zmianę

Plik niezacommitowany:

```bash
git restore plik
```

Plik przypadkowo dodany do staging:

```bash
git restore --staged plik
```

Ostatni commit lokalny:

```bash
git reset --soft HEAD~1
```

Opublikowany commit:

```bash
git revert HASH
```

---

# 105. Jak znaleźć zgubiony commit

Git posiada:

```bash
git reflog
```

Pokazuje historię zmian wskaźnika HEAD.

Przykład:

```bash
git reflog
```

Możesz znaleźć commit nawet po nieudanym reset/rebase.

To jedno z najlepszych narzędzi ratunkowych Gita.

---

# 106. Typowe sytuacje awaryjne

## „Zrobiłem zmiany na złym branchu”

Jeżeli jeszcze nie commitowałeś:

```bash
git switch -c poprawny-branch
```

Zmiany przejdą razem z tobą, jeśli Git może bezpiecznie przełączyć branch.

---

## „Zacommitowałem na złym branchu”

Możesz utworzyć branch z obecnego miejsca:

```bash
git branch poprawny-branch
```

Potem naprawić poprzedni branch odpowiednim resetem.

---

## „Pull wywołał konflikt”

Sprawdź:

```bash
git status
```

Popraw pliki.

Potem:

```bash
git add .
```

Następnie zależnie od operacji:

```bash
git commit
```

lub:

```bash
git rebase --continue
```

---

## „Chcę się wycofać z merge”

```bash
git merge --abort
```

---

## „Chcę się wycofać z rebase”

```bash
git rebase --abort
```

---

# 107. Dobre praktyki

1. Rób małe, logiczne commity.
2. Czytaj `git status`.
3. Przed commitem używaj `git diff`.
4. Przed większą pracą zrób branch.
5. Regularnie synchronizuj projekt.
6. Nie commituj sekretów.
7. Nie używaj `git push --force` bez powodu.
8. Nie rób rebase wspólnej historii bez uzgodnienia.
9. Pisz sensowne komunikaty commitów.
10. Utrzymuj README.
11. Używaj Issues do większych zadań.
12. Używaj PR do zmian, które warto przejrzeć.

---

# 108. Prosty model pracy dla własnych projektów

Dla małego projektu prowadzonego solo dobrze działa:

```text
main
 │
 ├── feature/*
 ├── fix/*
 └── experiment/*
```

Przykład:

```bash
git switch main
git pull
git switch -c feature/search
```

Po zakończeniu:

```bash
git add .
git commit -m "Add search"
git push -u origin feature/search
```

Następnie PR i merge.

Drobne zmiany można wykonywać bezpośrednio na `main`, jeśli świadomie wybierasz prostszy workflow.

---

# 109. Sensowne nazwy branchy

Przykłady:

```text
feature/search
feature/login
fix/mobile-layout
fix/api-timeout
docs/install-guide
refactor/database
experiment/new-ui
```

Nie jest to wymóg GitHuba, tylko dobra organizacja.

---

# 110. Conventional Commits - opcjonalnie

Popularna konwencja:

```text
feat: add search
fix: repair mobile menu
docs: update installation guide
refactor: simplify API client
test: add login tests
chore: update dependencies
```

Nie jest obowiązkowa.

Przy większych projektach pomaga automatyzować changelog i release.

---

# 111. Przykład pełnego workflow feature

```bash
git switch main
git pull --rebase

git switch -c feature/search

# edycja

git status
git diff

git add .
git commit -m "feat: add story search"

git push -u origin feature/search

gh pr create
```

Po merge:

```bash
git switch main
git pull
git branch -d feature/search
```

---

# 112. Przykład poprawki błędu

```bash
git switch main
git pull
git switch -c fix/mobile-menu

# poprawka

git add .
git commit -m "fix: repair mobile navigation"
git push -u origin fix/mobile-menu
gh pr create
```

---

# 113. Przykład synchronizacji forka

```bash
git fetch upstream
git switch main
git rebase upstream/main
git push origin main
```

Następnie nowa praca:

```bash
git switch -c fix/docs
```

---

# 114. Przydatne polecenia - ściąga

## Stan projektu

```bash
git status
git status -s
git diff
git diff --staged
```

## Historia

```bash
git log
git log --oneline
git log --graph --oneline --decorate --all
git show HEAD
git reflog
```

## Commit

```bash
git add .
git add -p
git commit -m "Opis"
git commit --amend
```

## Branch

```bash
git branch
git switch main
git switch -c nowy-branch
git branch -d branch
```

## Synchronizacja

```bash
git fetch
git pull
git pull --rebase
git push
git push -u origin branch
```

## Remote

```bash
git remote -v
git remote add origin URL
git remote add upstream URL
```

## Merge / rebase

```bash
git merge branch
git merge --abort
git rebase main
git rebase --continue
git rebase --abort
```

## Cofanie

```bash
git restore plik
git restore --staged plik
git reset --soft HEAD~1
git revert HASH
```

## Tymczasowe zmiany

```bash
git stash
git stash list
git stash pop
```

## GitHub CLI

```bash
gh auth login
gh repo clone owner/repo
gh repo create
gh repo fork owner/repo
gh pr create
gh pr list
gh pr view
gh pr merge
gh issue list
gh issue create
gh release create
gh run list
```

---

# 115. Minimum do codziennej pracy

Jeżeli zapamiętasz tylko kilkanaście poleceń, niech będą to:

```bash
git clone
git status
git diff
git add
git commit
git log
git switch
git branch
git pull
git fetch
git push
git merge
git restore
git stash
git remote -v
```

oraz:

```bash
gh auth login
gh pr create
gh pr list
gh repo clone
gh repo fork
```

---

# 116. Model mentalny Git + GitHub

Najważniejszy schemat:

```text
WORKING DIRECTORY
      │
      │ git add
      ▼
STAGING AREA
      │
      │ git commit
      ▼
LOCAL REPOSITORY
      │
      │ git push
      ▼
GITHUB
```

W drugą stronę:

```text
GITHUB
   │
   │ git fetch / git pull
   ▼
LOCAL REPOSITORY
   │
   ▼
WORKING DIRECTORY
```

---

# 117. Branch / Fork / PR - model mentalny

```text
UPSTREAM REPOSITORY
        │
        │ fork
        ▼
YOUR FORK
        │
        │ clone
        ▼
LOCAL REPOSITORY
        │
        │ branch
        ▼
FEATURE BRANCH
        │
        │ commits
        ▼
PUSH TO FORK
        │
        │ Pull Request
        ▼
UPSTREAM
```

---

# 118. Co warto znać później

Gdy podstawy będą już naturalne, warto poznać:

- interactive rebase,
- `git bisect`,
- submodules,
- worktrees,
- signed commits,
- Git LFS,
- branch protection,
- GitHub Actions,
- GitHub Packages,
- GitHub API,
- Dependabot,
- CODEOWNERS,
- release automation,
- semantic-release,
- conventional commits.

---

# 119. Najważniejsza zasada

Git jest bardzo trudny, kiedy próbuje się zapamiętać wszystkie komendy.

Staje się znacznie prostszy, gdy rozumiesz model:

```text
zmieniam pliki
↓
wybieram zmiany
↓
tworzę commit
↓
wysyłam commit
```

oraz:

```text
branch = linia pracy
fork   = osobne repo
PR     = propozycja połączenia zmian
```

To wystarcza do większości codziennej pracy.

---

# 120. Podręczny workflow dla jednej osoby

Start dnia:

```bash
git switch main
git pull --rebase
```

Nowa funkcja:

```bash
git switch -c feature/nazwa
```

Podczas pracy:

```bash
git status
git diff
```

Commit:

```bash
git add -p
git commit -m "feat: opis zmiany"
```

Publikacja:

```bash
git push -u origin feature/nazwa
```

PR:

```bash
gh pr create
```

Po merge:

```bash
git switch main
git pull
git branch -d feature/nazwa
```

Gotowe.

---

## Oficjalna dokumentacja

Aktualne źródła:

- Git: `https://git-scm.com/docs`
- GitHub Docs: `https://docs.github.com/`
- GitHub CLI: `https://docs.github.com/en/github-cli`
- GitHub CLI repository: `https://github.com/cli/cli`

---

## Podsumowanie

Do sprawnej pracy z GitHubem trzeba przede wszystkim rozumieć:

```text
repository
commit
branch
remote
origin
upstream
fetch
pull
push
merge
rebase
fork
Pull Request
Issue
Release
```

Git przechowuje historię.

GitHub przechowuje repozytorium i organizuje współpracę.

Najczęstsza codzienna sekwencja pozostaje bardzo prosta:

```bash
git pull
git status
git add .
git commit -m "Opis"
git push
```

A przy większej zmianie:

```bash
git switch -c feature/nazwa
# praca
git add .
git commit -m "Opis"
git push -u origin feature/nazwa
gh pr create
```
