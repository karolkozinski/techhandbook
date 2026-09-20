---
id: "doc-013"
title: "Git w praktyce zespołowej"
slug: "git-w-praktyce-zespolowej"
description: "Git to system kontroli wersji."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "git"
  - "branch"
  - "merge"
  - "rebase"
---

# Git w praktyce zespołowej

## 1. Git a GitHub

Git to system kontroli wersji.

GitHub to platforma przechowująca repozytoria Git i dodająca:
- Pull Requests,
- Issues,
- Actions,
- Releases,
- permissions.

## 2. Podstawowy cykl

```bash
git status
git add .
git commit -m "Opis zmiany"
git push
```

## 3. Klonowanie

```bash
git clone git@github.com:user/repo.git
cd repo
```

## 4. Remote

```bash
git remote -v
```

Dodanie:

```bash
git remote add origin git@github.com:user/repo.git
```

## 5. Branch

Lista:

```bash
git branch
```

Nowy branch:

```bash
git switch -c feature/login
```

Zmiana:

```bash
git switch main
```

Usunięcie:

```bash
git branch -d feature/login
```

## 6. Merge

```bash
git switch main
git merge feature/login
```

## 7. Konflikt

Git oznaczy fragment:

```text
<<<<<<< HEAD
wersja A
=======
wersja B
>>>>>>> feature
```

Po ręcznym rozwiązaniu:

```bash
git add plik
git commit
```

## 8. Pull

```bash
git pull
```

To najczęściej fetch + merge.

Bezpieczniej rozumieć oba kroki:

```bash
git fetch
git log --oneline --graph --all
git merge origin/main
```

## 9. Rebase

```bash
git switch feature/login
git rebase main
```

Rebase przepisuje historię brancha.

Nie rebazuj pochopnie historii, z której korzystają inni.

## 10. Stash

```bash
git stash
git stash list
git stash pop
```

Z opisem:

```bash
git stash push -m "WIP login"
```

## 11. Cherry-pick

Przenosi konkretny commit:

```bash
git cherry-pick abc1234
```

## 12. revert

Tworzy nowy commit odwracający wcześniejszy:

```bash
git revert abc1234
```

Dobre rozwiązanie dla historii współdzielonej.

## 13. reset

Miękki:

```bash
git reset --soft HEAD~1
```

Mieszany:

```bash
git reset HEAD~1
```

Twardy:

```bash
git reset --hard HEAD~1
```

`--hard` usuwa niezapisane zmiany.

## 14. restore

Przywrócenie pliku:

```bash
git restore plik.txt
```

Usunięcie ze staging:

```bash
git restore --staged plik.txt
```

## 15. Historia

```bash
git log
git log --oneline
git log --oneline --graph --decorate --all
```

## 16. diff

```bash
git diff
git diff --staged
git diff main..feature
```

## 17. Tags

```bash
git tag v1.0.0
git push origin v1.0.0
```

Annotated:

```bash
git tag -a v1.0.0 -m "Release 1.0.0"
```

## 18. .gitignore

Przykład:

```gitignore
.env
node_modules/
dist/
*.log
.DS_Store
```

Plik już śledzony nie zniknie tylko dlatego, że trafił do `.gitignore`.

```bash
git rm --cached plik
```

## 19. Feature branch workflow

```text
main
 └─ feature/x
      commits
      ↓
Pull Request
      ↓
review
      ↓
merge
```

## 20. Fork workflow

1. fork repo,
2. clone swojego forka,
3. dodaj upstream,
4. twórz branch,
5. push do forka,
6. Pull Request do upstream.

```bash
git remote add upstream git@github.com:ORG/REPO.git
git fetch upstream
```

## 21. Dobra historia commitów

Dobre:

```text
Add health check endpoint
Fix nginx proxy headers
Document deployment process
```

Słabe:

```text
fix
update
stuff
changes
```

## 22. Małe commity

Commit powinien przedstawiać jedną logiczną zmianę.

Dzięki temu łatwiej:
- review,
- revert,
- bisect,
- zrozumieć historię.

## 23. git bisect

Do znalezienia commita, który wprowadził błąd:

```bash
git bisect start
git bisect bad
git bisect good v1.0.0
```

Git wybiera kolejne punkty historii.

## 24. Detached HEAD

Możesz przejść do starego commita:

```bash
git checkout abc1234
```

Nie jesteś wtedy na branchu.

Jeśli chcesz pracować:

```bash
git switch -c investigation
```

## 25. Typowy workflow solo

```bash
git pull --ff-only
git switch -c feature/foo
# praca
git add .
git commit -m "Add foo"
git push -u origin feature/foo
```

Potem PR i merge.

## 26. Co trzeba umieć

- branchować,
- scalać,
- rozwiązywać konflikty,
- używać stash,
- znać różnicę revert/reset,
- czytać historię,
- pracować z remote,
- sensownie organizować commity.
