---
id: "doc-013"
title: "Git in Team Workflows"
slug: "git-in-team-workflows"
description: "Git is a version control system."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "git"
  - "branch"
  - "merge"
  - "rebase"
---

# Git in Team Workflows

## 1. Git and GitHub

Git is a version control system.

GitHub hosts Git repositories and adds Pull Requests, Issues, Actions, Releases and permission management.

## 2. Basic cycle

```bash
git status
git add .
git commit -m "Describe the change"
git push
```

## 3. Cloning

```bash
git clone git@github.com:user/repo.git
cd repo
```

## 4. Remotes

```bash
git remote -v
git remote add origin git@github.com:user/repo.git
```

## 5. Branches

```bash
git branch
git switch -c feature/login
git switch main
git branch -d feature/login
```

## 6. Merge

```bash
git switch main
git merge feature/login
```

## 7. Conflicts

Git marks conflicting sections:

```text
<<<<<<< HEAD
version A
=======
version B
>>>>>>> feature
```

After resolving:

```bash
git add file
git commit
```

## 8. Pull

```bash
git pull
```

This is usually fetch + merge. It is useful to understand the underlying steps:

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

Rebase rewrites branch history. Do not casually rebase shared history.

## 10. Stash

```bash
git stash
git stash list
git stash pop
git stash push -m "WIP login"
```

## 11. Cherry-pick

```bash
git cherry-pick abc1234
```

Moves a selected commit onto the current branch.

## 12. revert

Creates a new commit that reverses an earlier one:

```bash
git revert abc1234
```

This is appropriate for shared history.

## 13. reset

```bash
git reset --soft HEAD~1
git reset HEAD~1
git reset --hard HEAD~1
```

`--hard` discards uncommitted changes.

## 14. restore

```bash
git restore file.txt
git restore --staged file.txt
```

## 15. History

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
git tag -a v1.0.0 -m "Release 1.0.0"
```

## 18. .gitignore

```gitignore
.env
node_modules/
dist/
*.log
.DS_Store
```

A tracked file does not disappear because it is added to .gitignore:

```bash
git rm --cached file
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

1. fork repository,
2. clone your fork,
3. add upstream,
4. create a branch,
5. push to your fork,
6. open a Pull Request to upstream.

```bash
git remote add upstream git@github.com:ORG/REPO.git
git fetch upstream
```

## 21. Good commit history

Good:

```text
Add health check endpoint
Fix nginx proxy headers
Document deployment process
```

Weak:

```text
fix
update
stuff
changes
```

## 22. Small commits

A commit should represent one logical change. This helps review, revert, bisect and understanding history.

## 23. git bisect

```bash
git bisect start
git bisect bad
git bisect good v1.0.0
```

Git chooses intermediate commits to help locate the regression.

## 24. Detached HEAD

```bash
git checkout abc1234
```

You are then not on a branch. To work from there:

```bash
git switch -c investigation
```

## 25. Typical solo workflow

```bash
git pull --ff-only
git switch -c feature/foo
# work
git add .
git commit -m "Add foo"
git push -u origin feature/foo
```

Then open a PR and merge it.

## 26. What you should know

You should be able to branch, merge, resolve conflicts, use stash, understand revert vs reset, read history, work with remotes and organise commits sensibly.
