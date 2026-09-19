# GitHub — Practical Handbook

> A handbook for everyday work with Git and GitHub: repositories, commits, branches, synchronization, forks, Pull Requests, Issues, Releases, GitHub CLI, SSH, conflicts and common workflows.

---

# 1. Git and GitHub are not the same thing

**Git** is a distributed version control system. It works locally and tracks project history.

**GitHub** hosts Git repositories and adds collaboration features such as Pull Requests, Issues, Actions, Releases, Pages, Projects, code review and permissions.

```text
Git     = version control system
GitHub  = hosting + interface + collaboration around Git
```

You can use Git without GitHub.

# 2. Core concepts

## Repository

A project directory managed by Git. Local repositories contain a `.git/` directory with project history and metadata.

## Working tree

The current project files on disk.

## Staging area

The intermediate area between file changes and a commit.

```bash
git add
```

## Commit

A recorded point in project history: snapshot, message, author and date.

```bash
git commit -m "Add contact form"
```

## Branch

An independent line of work.

```text
main
feature/login
fix/mobile-menu
experiment/new-layout
```

## Remote

A reference to a remote repository.

```bash
git remote -v
```

The main remote is commonly named `origin`.

## upstream

Common name for the original repository when working with a fork.

```text
origin   → your fork
upstream → original project
```

## HEAD

Points to the currently checked-out commit/branch.

# 3. Installing Git

Debian / Ubuntu:

```bash
sudo apt update
sudo apt install git
```

FreeBSD:

```bash
sudo pkg install git
```

Windows:

```powershell
winget install Git.Git
```

# 4. First configuration

```bash
git config --global user.name "Your Name"
git config --global user.email "address@example.com"
git config --global init.defaultBranch main
git config --global core.editor "vim"
git config --global --list
```

For VS Code:

```bash
git config --global core.editor "code --wait"
```

# 5. Creating a repository

```bash
cd my-project
git init
git status
```

# 6. Cloning

HTTPS:

```bash
git clone https://github.com/user/project.git
```

SSH:

```bash
git clone git@github.com:user/project.git
```

Custom local directory:

```bash
git clone git@github.com:user/project.git local-project
```

# 7. Everyday workflow

```bash
git pull
git status
# edit files
git diff
git add .
git commit -m "Describe changes"
git push
```

Prefer small, logical commits.

# 8. git status

```bash
git status
git status -s
```

Shows current branch, modified files, untracked files, staged changes and relation to the remote branch.

# 9. git add

```bash
git add README.md
git add README.md main.go
git add .
git add -A
git add -p
```

`git add -p` lets you stage selected hunks and is excellent for clean commits.

# 10. git diff

```bash
git diff
git diff --staged
git diff main
git diff main..feature
```

# 11. Commits

```bash
git commit -m "Add form validation"
git commit
git commit --amend
```

A good commit represents one logical change.

Good:

```text
Add contact form validation
Fix nginx proxy headers
Document deployment
```

Weak:

```text
fix
changes
stuff
```

# 12. History

```bash
git log
git log --oneline
git log --graph --oneline --decorate --all
git show HEAD
```

Useful alias:

```bash
git config --global alias.lg "log --graph --oneline --decorate --all"
```

# 13. Branches

```bash
git branch
git switch feature/login
git switch -c feature/login
git branch -d feature/login
git branch -D feature/login
git push origin --delete feature/login
```

Prefer `git switch` for branch work in modern Git.

# 14. Merge

```bash
git switch main
git merge feature/login
```

A fast-forward merge simply moves the branch pointer when no divergent commits exist.

# 15. Merge conflicts

Git marks conflicts:

```text
<<<<<<< HEAD
version A
=======
version B
>>>>>>> feature
```

Resolve the content, then:

```bash
git add file
git commit
```

Abort a merge:

```bash
git merge --abort
```

# 16. fetch, pull and push

```bash
git fetch
git pull
git pull --rebase
git push
git push -u origin feature/search
```

`fetch` updates remote-tracking information without merging.

`pull` fetches and integrates.

`push` uploads local commits.

# 17. Rebase

```bash
git switch feature/login
git rebase main
```

Continue after conflict resolution:

```bash
git add .
git rebase --continue
```

Abort:

```bash
git rebase --abort
```

Do not casually rebase shared history.

# 18. Stash

```bash
git stash
git stash list
git stash pop
git stash push -m "WIP login"
```

# 19. restore, reset and revert

Restore a file:

```bash
git restore file.txt
git restore --staged file.txt
```

Reset local history:

```bash
git reset --soft HEAD~1
git reset HEAD~1
git reset --hard HEAD~1
```

`--hard` discards working changes.

Revert shared history safely:

```bash
git revert HASH
```

# 20. Cherry-pick

```bash
git cherry-pick HASH
```

Copies a selected commit onto the current branch.

# 21. Tags

```bash
git tag v1.0.0
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0
```

# 22. .gitignore

```gitignore
.env
node_modules/
dist/
*.log
.DS_Store
```

If a file is already tracked:

```bash
git rm --cached file
```

# 23. SSH access to GitHub

Generate a key:

```bash
ssh-keygen -t ed25519
```

Test:

```bash
ssh -T git@github.com
```

SSH avoids repeatedly authenticating HTTPS Git operations.

# 24. GitHub repositories

Repositories may contain:

- source code,
- README,
- license,
- Issues,
- Pull Requests,
- Actions,
- Releases,
- Wiki,
- Projects,
- Pages configuration.

A useful README normally explains what the project is, how to run it and where important files live.

# 25. Public vs private repositories

Public repositories are visible to everyone.

Private repositories require access permission.

Never assume private visibility is a replacement for secret management.

# 26. Forks

A fork is a separate repository copied under another account or organization.

Typical open-source workflow:

```text
upstream repository
      ↓ fork
your fork
      ↓ clone
local repository
      ↓ branch
changes
      ↓ push
Pull Request
      ↓
upstream
```

Add upstream:

```bash
git remote add upstream git@github.com:ORG/REPO.git
git fetch upstream
```

# 27. Pull Requests

A Pull Request proposes merging one branch into another.

Typical workflow:

1. create a branch,
2. make commits,
3. push the branch,
4. open PR,
5. review,
6. fix comments,
7. merge.

PRs are useful even in solo projects when you want a clean review point.

# 28. GitHub CLI

Install and authenticate:

```bash
gh auth login
```

Useful commands:

```bash
gh repo clone owner/repo
gh repo create
gh repo fork owner/repo

gh pr create
gh pr list
gh pr view
gh pr checkout
gh pr merge

gh issue list
gh issue create

gh release create
gh run list
```

# 29. Issues

Issues are useful for bugs, tasks, feature requests and planning.

A good issue explains context, expected behaviour, actual behaviour and acceptance criteria where useful.

# 30. Releases

Releases group a version/tag with notes and downloadable artifacts.

Typical version tag:

```text
v1.2.0
```

# 31. GitHub Actions

Workflows live under:

```text
.github/workflows/
```

They can run tests, builds, linters, image builds, releases and deployments.

# 32. Branch protection

For team repositories you can protect `main` by requiring PRs, status checks or reviews.

This helps keep the main branch stable.

# 33. CODEOWNERS

`CODEOWNERS` can map paths to responsible reviewers.

This is useful in larger teams.

# 34. GitHub Pages

GitHub Pages can publish static content directly from a repository or through Actions.

It works well for documentation, project pages and static websites.

# 35. GitHub Packages / GHCR

GitHub Container Registry:

```text
ghcr.io/OWNER/IMAGE
```

Use it to publish Docker images tied to GitHub projects.

# 36. Releases and semantic versions

Semantic Versioning often uses:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
1.4.2
```

# 37. git reflog

```bash
git reflog
```

Reflog records local movements of HEAD and branch references and is one of Git's most useful recovery tools.

# 38. git bisect

```bash
git bisect start
git bisect bad
git bisect good v1.0.0
```

Git helps locate the commit that introduced a regression.

# 39. Detached HEAD

Checking out a commit directly:

```bash
git checkout HASH
```

puts you in detached HEAD state.

To continue work:

```bash
git switch -c investigation
```

# 40. Common emergency situations

## Changes on the wrong branch

If not committed yet:

```bash
git switch -c correct-branch
```

## Commit on the wrong branch

Create a branch at the current point, then repair the original branch with an appropriate reset/revert strategy.

## Pull caused conflicts

```bash
git status
```

Resolve files and continue with commit or rebase.

## Abort merge

```bash
git merge --abort
```

## Abort rebase

```bash
git rebase --abort
```

# 41. Good practices

1. Make small logical commits.
2. Read `git status`.
3. Use `git diff` before committing.
4. Create a branch before substantial work.
5. Synchronize regularly.
6. Never commit secrets.
7. Avoid `git push --force` unless you understand the consequences.
8. Do not rebase shared history casually.
9. Write meaningful commit messages.
10. Maintain a useful README.
11. Use Issues for larger tasks.
12. Use PRs for changes worth reviewing.

# 42. Simple solo branch model

```text
main
 ├── feature/*
 ├── fix/*
 └── experiment/*
```

Example:

```bash
git switch main
git pull
git switch -c feature/search

# work

git add .
git commit -m "Add search"
git push -u origin feature/search
```

Then open a PR and merge.

# 43. Branch naming

Examples:

```text
feature/search
feature/login
fix/mobile-layout
fix/api-timeout
docs/install-guide
refactor/database
experiment/new-ui
```

# 44. Conventional Commits — optional

```text
feat: add search
fix: repair mobile menu
docs: update installation guide
refactor: simplify API client
test: add login tests
chore: update dependencies
```

This convention can help automate changelogs and releases.

# 45. Full feature workflow

```bash
git switch main
git pull --rebase

git switch -c feature/search

# edit

git status
git diff

git add .
git commit -m "feat: add story search"

git push -u origin feature/search

gh pr create
```

After merge:

```bash
git switch main
git pull
git branch -d feature/search
```

# 46. Fork synchronization

```bash
git fetch upstream
git switch main
git rebase upstream/main
git push origin main
```

Then start new work from the updated main.

# 47. Command cheat sheet

Status and diff:

```bash
git status
git status -s
git diff
git diff --staged
```

History:

```bash
git log
git log --oneline
git log --graph --oneline --decorate --all
git show HEAD
git reflog
```

Commits:

```bash
git add .
git add -p
git commit -m "Message"
git commit --amend
```

Branches:

```bash
git branch
git switch main
git switch -c new-branch
git branch -d branch
```

Synchronization:

```bash
git fetch
git pull
git pull --rebase
git push
git push -u origin branch
```

Merge / rebase:

```bash
git merge branch
git merge --abort
git rebase main
git rebase --continue
git rebase --abort
```

Undo:

```bash
git restore file
git restore --staged file
git reset --soft HEAD~1
git revert HASH
```

Temporary work:

```bash
git stash
git stash list
git stash pop
```

# 48. Minimum daily command set

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

GitHub CLI:

```bash
gh auth login
gh pr create
gh pr list
gh repo clone
gh repo fork
```

# 49. Mental model: Git + GitHub

```text
WORKING DIRECTORY
      │ git add
      ▼
STAGING AREA
      │ git commit
      ▼
LOCAL REPOSITORY
      │ git push
      ▼
GITHUB
```

Reverse direction:

```text
GITHUB
   │ git fetch / git pull
   ▼
LOCAL REPOSITORY
   ▼
WORKING DIRECTORY
```

# 50. Mental model: Branch / Fork / PR

```text
UPSTREAM REPOSITORY
        │ fork
        ▼
YOUR FORK
        │ clone
        ▼
LOCAL REPOSITORY
        │ branch
        ▼
FEATURE BRANCH
        │ commits
        ▼
PUSH TO FORK
        │ Pull Request
        ▼
UPSTREAM
```

# 51. Learn later

Once the basics are natural, explore:

- interactive rebase,
- git bisect,
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
- conventional commits.

# 52. The most important rule

Git becomes much easier when you understand the model instead of memorising every command:

```text
change files
↓
select changes
↓
create commit
↓
push commit
```

and:

```text
branch = line of work
fork   = separate repository
PR     = proposal to merge changes
```

# 53. Personal daily workflow

Start:

```bash
git switch main
git pull --rebase
```

New feature:

```bash
git switch -c feature/name
```

During work:

```bash
git status
git diff
```

Commit:

```bash
git add -p
git commit -m "feat: describe change"
```

Publish:

```bash
git push -u origin feature/name
```

PR:

```bash
gh pr create
```

After merge:

```bash
git switch main
git pull
git branch -d feature/name
```

# 54. Official documentation

- Git: https://git-scm.com/docs
- GitHub Docs: https://docs.github.com/
- GitHub CLI: https://docs.github.com/en/github-cli
- GitHub CLI repository: https://github.com/cli/cli

# Summary

To work comfortably with GitHub, understand repository, commit, branch, remote, origin, upstream, fetch, pull, push, merge, rebase, fork, Pull Request, Issue and Release.

Git stores history.

GitHub hosts repositories and organises collaboration.
