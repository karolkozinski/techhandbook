---
id: "doc-014"
title: "GitHub — Practical Handbook"
slug: "github-practical-handbook"
description: "Git is a distributed version-control system that tracks file history locally."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "github"
  - "git"
  - "repo"
  - "repository"
---

# GitHub — Practical Handbook

GitHub is a collaboration layer around Git repositories. The important daily concepts are Pull Requests, Issues, Actions, permissions, Releases and diff review rather than memorizing the website interface.

Related topics: [Git in Team Workflows](techhandbook:doc-013), [CI/CD and GitHub Actions](techhandbook:doc-011), [Visual Studio Code](techhandbook:doc-039) and [Documenting Technical Solutions](techhandbook:doc-056).

## 1. Git and GitHub are not the same thing
### Git
Git is a distributed version-control system that tracks file history locally.
### GitHub
GitHub is a hosting/collaboration platform built around Git repositories.
# 2. Core concepts
## Repository
project history and files.
## Working tree
your checked-out files.
## Staging area
changes selected for the next commit.
## Commit
recorded snapshot with metadata.
## Branch
movable line of development.
## Remote
named external repository.
## origin
conventional name for the primary remote.
## upstream
conventional name for the original repo when working from a fork.
## HEAD
current checked-out commit/branch reference.
# 3. Installing Git
## Debian / Ubuntu
```bash
sudo apt install git
```
## FreeBSD
```bash
pkg install git
```
## Windows
Install Git for Windows and use Git Bash, PowerShell or VS Code terminal.
# 4. First Git configuration
```bash
git config --global user.name "Anna"
git config --global user.email "you@example.com"
```
## Default branch main
```bash
git config --global init.defaultBranch main
```
## Default editor
```bash
git config --global core.editor "nvim"
```
# 5. Creating a local repository
```bash
mkdir project && cd project
git init
```
# 6. Cloning a repository
```bash
git clone URL
```
## Clone under a different directory name
```bash
git clone URL local-name
```
# 7. Daily workflow
Edit → inspect → stage → commit → synchronize.
# editing files
```bash
git status
```
# 8. `git status`
```bash
git status
```
# 9. `git add`
```bash
git add file
git add .
```
## Adding parts of changes
```bash
git add -p
```
# 10. `git diff`
```bash
git diff
git diff --staged
```
# 11. Commit
```bash
git commit -m "Add feature"
```
## Good commit
Small, coherent, understandable, and ideally leaves the project in a working state.
# 12. Commit history
```bash
git log
```
## Useful history view
```bash
git log --oneline --graph --decorate --all
```
# 13. Branches
```bash
git branch
git switch main
```
## Create and switch at once
```bash
git switch -c feature/name
```
# 14. Deleting a branch
```bash
git branch -d feature/name
```
# 15. Merge
```bash
git switch main
git merge feature/name
```
# 16. Fast-forward merge
Git simply moves the branch pointer when no divergent commits exist.
# 17. Merge commit
A merge commit records the joining of diverged histories.
# 18. Conflicts
Resolve conflicted files manually, stage them and continue the merge.
## Abort merge
```bash
git merge --abort
```
# 19. Rebase
```bash
git rebase main
```
## Merge vs rebase
Merge preserves branch topology; rebase rewrites commits onto a new base for a linear history.
# 20. `git pull`
```bash
git pull
```
## Pull with rebase
```bash
git pull --rebase
```
# 21. `git fetch`
```bash
git fetch --all --prune
```
# 22. `git push`
```bash
git push
git push -u origin feature/name
```
# 23. Remote
```bash
git remote -v
```
# 24. Local repository → GitHub
```bash
git remote add origin git@github.com:user/repo.git
git push -u origin main
```
# 25. `.gitignore`
Lists files/patterns Git should not track.
## Important
Ignoring a file does not remove it from history if it was already committed.
# 26. Never commit secrets
Do not commit passwords, API keys, private keys or real `.env` files. Rotate credentials if they leak.
# 27. Fork
A fork is your GitHub-side copy of another repository.
# 28. Why fork?
### Open source
Contribute without direct write access.
### Experiment
Try changes independently.
### Long-lived custom variant
Maintain your own divergence from upstream.
# 29. Fork vs branch
## Branch
Lives inside one repository.
## Fork
Separate repository, typically under another account/org.
# 30. Fork workflow
Fork → clone your fork → add upstream → branch → commit → push → PR.
# 31. Synchronizing a fork
```bash
git fetch upstream
git switch main
git merge upstream/main
git push origin main
```
# 32. Pull Request
A PR proposes merging one branch/repository into another and provides review/discussion context.
# 33. Typical Pull Request
Describe what changed, why, how to test and any risks.
# 34. Draft Pull Request
Use when work is visible but not ready to merge.
# 35. Merge PR
## Merge commit
Keeps all branch commits and adds a merge commit.
## Squash and merge
Combines PR commits into one target-branch commit.
## Rebase and merge
Replays PR commits onto the target branch.
# 36. Issues
Track bugs, ideas, tasks and discussions around work.
# 37. Automatically closing an Issue
Use phrases like `Fixes #123` in a PR/commit description where supported.
# 38. Labels
Categorize issues and PRs.
# 39. Milestones
Group issues/PRs around a release or goal.
# 40. Releases
GitHub releases add downloadable release metadata/assets around Git tags.
# 41. Git tags
```bash
git tag v1.0.0
git push origin v1.0.0
```
# 42. Semantic Versioning
Major.Minor.Patch is a common versioning scheme for public APIs/releases.
# 43. README.md
Project entry point: purpose, setup, build, run, test and usage.
# 44. LICENSE
Defines legal permissions for using/copying/modifying the project.
# 45. CONTRIBUTING.md
Documents contribution workflow and standards.
# 46. CODEOWNERS
Maps paths to reviewers/owners.
# 47. GitHub Actions
GitHub's CI/CD automation system.
# 48. GitHub Pages
Static-site hosting from a repository.
# 49. GitHub Projects
Planning boards and project tracking around issues/PRs.
# 50. GitHub Discussions
Longer-form community discussion separate from Issues.
# 51. GitHub CLI — `gh`
```bash
gh --version
```
# 52. Installing GitHub CLI
## Debian
Install from GitHub's supported package source or distro package.
## FreeBSD
```bash
pkg install gh
```
# 53. Logging in to GitHub CLI
```bash
gh auth login
```
# 54. Creating a repository via CLI
```bash
gh repo create
```
# 55. Cloning via gh
```bash
gh repo clone owner/repo
```
# 56. Fork via CLI
```bash
gh repo fork owner/repo --clone
```
# 57. Pull Request via CLI
```bash
gh pr create
gh pr list
gh pr view
```
# 58. Issues via CLI
```bash
gh issue list
gh issue create
```
# 59. Releases via CLI
```bash
gh release list
gh release create v1.0.0
```
# 60. Actions via CLI
```bash
gh run list
gh run view
```
# 61. SSH to GitHub
## Test connection
```bash
ssh -T git@github.com
```
## SSH repository address
Use `git@github.com:owner/repo.git`.
# 62. HTTPS vs SSH
## HTTPS
Simple through credential helpers/tokens.
## SSH
Convenient for frequent authenticated Git operations with keys.
# 63. `git restore`
```bash
git restore file
```
## Remove file from staging
```bash
git restore --staged file
```
# 64. `git reset`
### Soft
```bash
git reset --soft HEAD~1
```
### Mixed
```bash
git reset HEAD~1
```
### Hard
```bash
git reset --hard HEAD~1
```
Hard reset discards changes. Use only when you understand the consequences.
# 65. `git revert`
```bash
git revert COMMIT
```
Creates a new commit that reverses an earlier commit; safer for shared history.
# 66. Amend
```bash
git commit --amend
```
# 67. Stash
```bash
git stash
git stash pop
```
# 68. Practical stash example
Stash unfinished work, switch branch for an urgent fix, then return and pop the stash.
# 69. Cherry-pick
```bash
git cherry-pick COMMIT
```
# 70. Git blame
```bash
git blame file
```
# 71. Git show
```bash
git show COMMIT
```
# 72. Git grep
```bash
git grep pattern
```
# 73. Git clean
```bash
git clean -n
git clean -fd
```
Preview first with `-n`.
# 74. Force push
```bash
git push --force-with-lease
```
Prefer `--force-with-lease` over plain `--force`.
# 75. Detached HEAD
You checked out a commit rather than a branch. Create a branch if you want to keep new commits.
# 76. GitHub branch protection / rulesets
Require reviews, checks, signed commits, restricted pushes or linear history on important branches.
# 77. GitHub Secrets
Encrypted values for Actions/environments. Still scope permissions minimally.
# 78. GitHub Organizations
Shared ownership/permissions across repositories and teams.
# 79. Public and private repository
## Public
World-readable.
## Private
Restricted to authorized users/teams.
# 80. Typical workflow for your own project
Main branch + short-lived feature branches + PR or direct reviewed merge.
# work
```bash
git switch -c feature/x
git add -p
git commit
git push -u origin feature/x
```
# 81. Typical solo workflow — simpler version
For low-risk personal projects, small direct commits to main can be acceptable if you keep history clean and tests/checks.
# work
```bash
git status
git add -p
git commit -m "Update"
git push
```
# 82. Open-source workflow
Fork → branch → changes → tests → push → PR to upstream.
# 83. Updating a branch before PR
```bash
git fetch upstream
git rebase upstream/main
```
# fix files
Resolve conflicts, continue rebase, rerun tests, then push with force-with-lease if history changed.
# 84. GitHub Web UI — useful areas
## Code
files/branches/releases.
## Issues
tasks and bugs.
## Pull requests
review and merge.
## Actions
automation runs.
## Security
alerts and security settings.
## Insights
traffic/contributors/history.
## Settings
repository configuration.
# 85. Commit hash
Unique identifier for a commit, commonly abbreviated.
# 86. origin/main
Remote-tracking reference for main on origin.
# 87. Checking local vs remote difference
```bash
git fetch
git log --oneline main..origin/main
git log --oneline origin/main..main
```
# 88. Aliases for useful commands
```bash
git config --global alias.lg "log --oneline --graph --decorate --all"
```
# 89. Important GitHub files
README, LICENSE, CONTRIBUTING, CODEOWNERS, issue/PR templates, workflows under `.github/workflows`.
# 90. Pull Request Template
## What changed?
Keep the section concise and actionable.
## How to test?
Keep the section concise and actionable.
## Related Issue
Keep the section concise and actionable.
## Checklist
Keep the section concise and actionable.
# 91. Issue Templates
Standardize bug reports/feature requests and required diagnostic information.
# 92. GitHub Actions — minimal idea
Events trigger workflows, workflows contain jobs, jobs contain steps that run on runners.
# 93. CI/CD
## CI — Continuous Integration
Automated build/test/lint on changes.
## CD — Continuous Delivery / Deployment
Automated packaging and/or deployment after successful validation.
# 94. GitHub Packages
Package/container registry integrated with GitHub.
# 95. Gist
Small Git repositories/snippets hosted by GitHub.
# 96. Clone vs fork
## Clone
Local copy of a repository.
## Fork
Server-side copy under another account/org.
# 97. Pull vs fetch
## fetch
Downloads refs/history without changing your working branch.
## pull
Fetch plus integration into the current branch.
# 98. Add vs commit vs push
add = stage, commit = record locally, push = send commits to remote.
# 99. Pull Request is not `git pull`
PR is a collaboration/review object; `git pull` is a local Git command.
# 100. Fork is not a ZIP copy
A fork is a Git repository with history and GitHub relationship metadata.
# 101. Working with an existing project — safe procedure
Clone → read README/contributing → install deps → run tests → create branch → change → test → diff → commit.
# 102. How to read an unfamiliar repository
Start with README, directory tree, package/build files, CI workflows and recent commits.
# 103. How to see what changed recently
```bash
git log --oneline -20
git show
git diff HEAD~1
```
# 104. How to undo an accidental change
```bash
git restore file
```
# 105. How to find a lost commit
```bash
git reflog
```
# 106. Common emergencies
## “I changed files on the wrong branch”
Create/switch to the intended branch before committing if possible.
## “I committed on the wrong branch”
Create the correct branch at that commit, then reset/revert the wrong branch as appropriate.
## “Pull caused a conflict”
Resolve or abort the merge/rebase depending on pull strategy.
## “I want to back out of a merge”
```bash
git merge --abort
```
## “I want to back out of a rebase”
```bash
git rebase --abort
```
# 107. Good practices
Small commits, meaningful messages, branches for risky work, tests before push, review diffs, never rewrite shared history casually.
# 108. Simple model for personal projects
main stays usable; feature branches for larger work; tag releases; push often enough to avoid single-machine risk.
# 109. Sensible branch names
```bash
text
feature/search
fix/login-timeout
docs/readme
```
# 110. Conventional Commits — optional
```bash
text
feat: add search
fix: handle timeout
docs: update setup
```
# 111. Full feature workflow example
```bash
git switch -c feature/search
```
# editing
```bash
git add -p
git commit -m "feat: add search"
git push -u origin feature/search
gh pr create
```
# 112. Bug-fix example
```bash
git switch -c fix/timeout
```
# fix
```bash
git add -p
git commit -m "fix: handle timeout"
git push -u origin fix/timeout
```
# 113. Fork synchronization example
```bash
git remote add upstream URL
git fetch upstream
git switch main
git rebase upstream/main
git push origin main
```
# 114. Useful commands — cheat sheet
## Project state
```bash
git status; git diff
```
## History
```bash
git log --oneline --graph --decorate --all
```
## Commit
```bash
git add -p; git commit
```
## Branch
```bash
git switch -c NAME; git branch
```
## Synchronization
```bash
git fetch; git pull --rebase; git push
```
## Remote
```bash
git remote -v
```
## Merge / rebase
```bash
git merge; git rebase
```
## Undo
```bash
git restore; git revert; git reset
```
## Temporary changes
```bash
git stash
```
## GitHub CLI
```bash
gh pr; gh issue; gh repo; gh run
```
# 115. Minimum for daily work
status, diff, add -p, commit, log, switch, fetch, pull --rebase, push, restore, stash.
# 116. Mental model Git + GitHub
Git manages history locally; GitHub hosts remotes and collaboration objects around that history.
# 117. Branch / Fork / PR — mental model
Branch = line of work; fork = separate repo; PR = proposal to merge changes.
# 118. What to learn later
Interactive rebase, bisect, submodules/subtrees, signed commits, hooks, advanced Actions and release automation.
# 119. Most important rule
Before any destructive Git command, understand which commits/files it will move or delete.
# 120. Handy workflow for one person
```bash
git status
git pull --rebase
git switch -c task/x
git add -p
git commit
git push -u origin task/x
```
## Official documentation
Use git-scm.com and docs.github.com for authoritative/current details.
## Summary
Git gives you versioned history; GitHub adds hosting, review, automation and collaboration.
# work
Keep changes reviewable, testable and recoverable.
