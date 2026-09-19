# GitHub — Practical Handbook

## 1. What GitHub is

GitHub is a platform built around Git repositories.

Git handles version control locally.

GitHub adds:

- remote repositories,
- collaboration,
- Pull Requests,
- Issues,
- Actions,
- Releases,
- project management,
- package/container registries,
- code review,
- permissions,
- automation.

A repository can be public or private.

## 2. Git and GitHub are different

Git:

```text
local history
branches
commits
merge
diff
```

GitHub:

```text
hosting
sharing
review
automation
issues
releases
access control
```

You can use Git without GitHub.

## 3. Repository

A repository contains:

- files,
- Git history,
- branches,
- tags,
- metadata,
- optionally Issues, Actions, Releases, etc.

Clone:

```bash
git clone git@github.com:OWNER/REPO.git
```

or HTTPS:

```bash
git clone https://github.com/OWNER/REPO.git
```

## 4. SSH authentication

Generate a key:

```bash
ssh-keygen -t ed25519
```

Add the public key to GitHub.

Test:

```bash
ssh -T git@github.com
```

Then use SSH remotes.

## 5. HTTPS authentication

For Git operations over HTTPS, GitHub does not use your normal account password as a Git password.

Use supported credential methods such as:

- Git Credential Manager,
- personal access tokens where appropriate,
- GitHub CLI authentication.

## 6. GitHub CLI

Install `gh`.

Login:

```bash
gh auth login
```

Check status:

```bash
gh auth status
```

Repository commands:

```bash
gh repo view
gh repo clone OWNER/REPO
gh repo create
```

## 7. Creating a repository

Through the web UI or:

```bash
gh repo create
```

Then connect local Git:

```bash
git remote add origin git@github.com:OWNER/REPO.git
git push -u origin main
```

## 8. Public vs private repositories

Public:

- source visible to everyone,
- useful for open-source and portfolio work.

Private:

- access limited by permissions,
- suitable for confidential/internal work.

Never publish secrets merely because a repository was intended to be private.

Repositories can accidentally become public later.

## 9. README

`README.md` is the repository entry point.

A good README answers:

- what is this?
- why does it exist?
- how do I install/run it?
- what are the requirements?
- how is the project structured?
- how do I contribute?
- what is the license?

## 10. .gitignore

Example:

```gitignore
.env
node_modules/
dist/
*.log
.DS_Store
```

It prevents untracked matching files from being added.

It does not retroactively untrack files already committed.

## 11. LICENSE

A public repository without a license does not automatically grant everyone broad reuse rights.

If you want open-source reuse, choose a license deliberately.

Examples:

- MIT,
- Apache-2.0,
- GPL-3.0.

Understand the license before choosing it.

## 12. Branches

Typical:

```text
main
feature/search
fix/login
docs/readme
```

Create locally:

```bash
git switch -c feature/search
```

Push:

```bash
git push -u origin feature/search
```

## 13. Pull Request

A Pull Request proposes merging changes from one branch into another.

A good PR contains:

- clear title,
- short explanation,
- reason for the change,
- testing information,
- screenshots where useful.

PRs make even solo work more reviewable and easier to understand later.

## 14. Creating a PR with gh

```bash
gh pr create
```

List:

```bash
gh pr list
```

View:

```bash
gh pr view
```

Checkout:

```bash
gh pr checkout NUMBER
```

## 15. Code review

Review should focus on:

- correctness,
- security,
- maintainability,
- tests,
- unintended changes,
- architecture when relevant.

Do not use review only for formatting arguments that an automated formatter can solve.

## 16. Merge strategies

Common options:

### Merge commit

Preserves branch commits and adds a merge commit.

### Squash merge

Combines PR commits into one commit on the target branch.

Useful when feature branches contain many small/WIP commits.

### Rebase merge

Replays commits onto the target branch, keeping a linear history.

Choose one approach deliberately and document it for the project.

## 17. Issues

Issues can track:

- bugs,
- features,
- documentation tasks,
- research,
- discussions requiring action.

A useful issue has:

- problem statement,
- expected result,
- reproduction steps for bugs,
- acceptance criteria when appropriate.

## 18. Issue templates

Templates can standardize:

- bug reports,
- feature requests,
- security reports.

They reduce missing information.

## 19. Labels

Useful labels:

```text
bug
enhancement
documentation
security
good first issue
blocked
priority
```

Keep the label set understandable.

## 20. Milestones

Milestones group issues/PRs around a release or goal.

Example:

```text
v1.0
Q4 release
MVP
```

## 21. GitHub Projects

Projects can provide:

- board views,
- tables,
- custom fields,
- automation.

Use them when the repository needs more planning than Issues alone provide.

## 22. Forks

A fork is a copy of another repository under your account/organization.

Typical contribution workflow:

```text
upstream repository
   ↓ fork
your repository
   ↓ branch
Pull Request back to upstream
```

## 23. Upstream remote

After cloning your fork:

```bash
git remote add upstream git@github.com:ORIGINAL/REPO.git
git fetch upstream
```

Update your main branch:

```bash
git switch main
git merge --ff-only upstream/main
```

or another workflow agreed for the project.

## 24. Stars, watchers, forks

Star:

- bookmark/show interest.

Watch:

- configure notifications.

Fork:

- create your own repository copy for development.

These are different concepts.

## 25. Organizations

A GitHub organization groups:

- repositories,
- teams,
- permissions,
- billing,
- policies.

Useful for a brand, company, or umbrella project.

## 26. Teams and permissions

Organizations can assign permissions through teams.

Prefer group/team-based access rather than managing every repository permission individually for every person.

## 27. Repository roles

Depending on repository/organization configuration, roles may include levels such as:

- Read,
- Triage,
- Write,
- Maintain,
- Admin.

Grant the minimum required access.

## 28. Branch protection and rulesets

Protect important branches.

Typical rules:

- PR required before merge,
- required reviews,
- required CI checks,
- no force push,
- no direct deletion,
- signed commits where required.

Modern GitHub also supports repository/organization rulesets.

## 29. Status checks

GitHub Actions or external CI can report:

```text
build passed
tests passed
lint passed
security scan passed
```

A protected branch can require them before merge.

## 30. GitHub Actions

Workflows live under:

```text
.github/workflows/
```

Example:

```yaml
name: CI

on:
  push:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - run: go test ./...
```

## 31. Workflow security

Be careful with:

- secrets,
- untrusted Pull Requests,
- broad permissions,
- third-party actions.

Use minimal permissions.

Example:

```yaml
permissions:
  contents: read
```

Pin important third-party actions appropriately for your security requirements.

## 32. Secrets and variables

Repository/organization/environment settings can store secrets used by Actions.

Reference:

```yaml
${{ secrets.API_TOKEN }}
```

Never print secrets intentionally to logs.

## 33. Environments

Environments can represent:

```text
development
staging
production
```

They can provide:

- separate secrets,
- approval gates,
- deployment history.

## 34. Releases

A Release is a published project version associated with a Git tag.

Example:

```bash
git tag v1.0.0
git push origin v1.0.0
gh release create v1.0.0
```

Attach:

- binaries,
- archives,
- release notes.

## 35. Tags

Tags mark specific commits.

Annotated tag:

```bash
git tag -a v1.0.0 -m "Release 1.0.0"
```

Push:

```bash
git push origin v1.0.0
```

## 36. GitHub Container Registry

Images can live under:

```text
ghcr.io/OWNER/IMAGE
```

Typical CI flow:

```text
push tag
→ Actions
→ docker build
→ push to GHCR
→ server pulls image
```

## 37. Packages

GitHub Packages can host supported package types in addition to containers.

Use package registries when distributing reusable libraries or artifacts.

## 38. Pages

GitHub Pages hosts static websites from repository content.

Good for:

- documentation,
- portfolios,
- project pages,
- static handbooks.

Typical project URL:

```text
https://USER.github.io/REPOSITORY/
```

Project sites live under a path prefix, so use relative URLs or correct base-path handling.

## 39. Custom domains for Pages

Pages can use a custom domain.

You configure:

- DNS,
- Pages settings,
- HTTPS.

Follow current GitHub Pages documentation for DNS records because exact recommendations can evolve.

## 40. Wiki

GitHub repositories can have a Wiki.

For many technical projects, documentation stored directly in the repository as Markdown is easier to version and review.

## 41. Discussions

Discussions are useful for:

- questions,
- community conversation,
- proposals that are not yet actionable issues.

Not every repository needs them.

## 42. Security tab

Depending on repository features, GitHub can provide:

- Dependabot alerts,
- dependency graph,
- code scanning,
- secret scanning,
- security advisories.

Use them as part of a security process, not as a substitute for review.

## 43. Dependabot

Dependabot can:

- report vulnerable dependencies,
- open dependency update PRs.

Automatic updates should still be tested.

## 44. CodeQL

CodeQL analyzes code for classes of security problems.

GitHub provides workflows for supported languages.

## 45. Secret scanning

Secret scanning detects credentials accidentally committed to repositories.

If a secret is committed:

1. rotate/revoke it,
2. do not assume deleting the file is enough,
3. clean history only if necessary,
4. review logs/access.

A leaked secret should be treated as compromised.

## 46. Releases vs repository source

Users who only want a binary should not need to clone the source and compile it.

Use Releases when distributing built artifacts makes sense.

## 47. Git LFS

Large File Storage is for large binary assets that do not fit normal Git workflows.

Examples:

- large media,
- large model assets,
- design files.

Do not use normal Git for huge frequently changing binaries without considering storage impact.

## 48. Repository structure

A clear repository might look like:

```text
.
├── README.md
├── LICENSE
├── .gitignore
├── .github/
│   ├── workflows/
│   └── ISSUE_TEMPLATE/
├── docs/
├── src/
├── tests/
└── Dockerfile
```

Keep the root understandable.

## 49. CONTRIBUTING.md

Useful for public or team repositories.

Document:

- setup,
- branch/PR rules,
- tests,
- formatting,
- commit expectations,
- review process.

## 50. CODEOWNERS

File:

```text
.github/CODEOWNERS
```

can define who should review changes in specific areas.

Example:

```text
/docs/ @docs-team
/security/ @security-team
```

## 51. Pull Request template

A template can ask:

```text
What changed?
Why?
How was it tested?
Any screenshots?
Any migration?
```

## 52. README badges

Badges can show:

- CI status,
- release version,
- license,
- coverage.

Use only useful badges. A wall of badges is not documentation.

## 53. Commit quality

Good:

```text
Add search index loader
Fix mobile navigation
Document deployment
```

Weak:

```text
stuff
update
fix
changes
```

Commit messages should explain the logical change.

## 54. Small commits

A commit should ideally represent one coherent change.

Benefits:

- easier review,
- easier revert,
- easier history reading,
- easier debugging with `git bisect`.

## 55. Pull Request size

Very large PRs are difficult to review.

Split independent changes when possible.

Do not split so aggressively that every tiny mechanical step becomes noise.

## 56. Draft Pull Requests

A draft PR is useful when:

- work is not ready,
- you want early feedback,
- CI should run,
- the branch should be visible.

## 57. Issues vs commits vs PRs

Issue:

```text
problem / task
```

Commit:

```text
specific code/history change
```

PR:

```text
proposed set of changes to merge
```

They serve different purposes.

## 58. GitHub CLI PR workflow

```bash
git switch -c feature/foo
# edit
git add .
git commit -m "Add foo"
git push -u origin feature/foo
gh pr create
```

After review and merge:

```bash
git switch main
git pull --ff-only
git branch -d feature/foo
```

## 59. Repository search

GitHub search can find:

- code,
- files,
- issues,
- commits,
- repositories.

Inside the local clone, use:

```bash
rg pattern
git grep pattern
```

for fast code search.

## 60. GitHub API

GitHub exposes REST and GraphQL APIs.

Use them for:

- automation,
- repository metadata,
- issues,
- PRs,
- releases,
- CI integrations.

Authentication and rate limits depend on endpoint and token type.

## 61. Personal Access Tokens

Use modern fine-grained permissions where they fit the task.

Rules:

- minimum scope,
- expiration where possible,
- do not share,
- store in a secret manager,
- rotate if exposed.

## 62. GitHub Apps

For integrations that need repository access at scale, GitHub Apps are often better than a personal token.

They can provide:

- installation-level access,
- fine-grained permissions,
- short-lived tokens.

## 63. Webhooks

GitHub can send events to your application.

Examples:

- push,
- pull request,
- issue,
- release.

Verify webhook signatures and handle retries/idempotency.

## 64. Notifications

Configure notifications instead of watching everything.

Useful categories:

- participating,
- mentions,
- review requests,
- CI failures.

Too many notifications reduce attention.

## 65. Portfolio repository

For a public portfolio project, prioritize:

- clean README,
- visible purpose,
- screenshots/demo,
- understandable history,
- issues/roadmap where useful,
- working Pages/deployment,
- a few meaningful commits rather than artificial noise.

## 66. Organizations for personal brands

An organization is useful when several related projects share a brand.

Example:

```text
Null Yard
├── techhandbook
├── promoguard
├── martwykompas
└── future projects
```

Keep project repositories independent even if they share branding.

## 67. Repository naming

Prefer names that are:

- short,
- lowercase,
- understandable,
- stable.

Examples:

```text
techhandbook
promoguard
martwykompas
```

## 68. Archived repositories

Archive repositories that are no longer maintained but should remain readable.

This clearly signals:

```text
historical / read-only
```

## 69. Transfer and rename

Repositories can be renamed or transferred.

GitHub usually maintains redirects for many repository URLs, but update documentation, remotes, CI, badges, and external integrations deliberately.

## 70. Updating a remote after rename

```bash
git remote -v
git remote set-url origin git@github.com:OWNER/NEWNAME.git
```

## 71. Fork vs template repository

Fork:

- retains fork relationship to another repository.

Template:

- creates a new independent repository from a starter structure.

Use templates for project scaffolding.

## 72. GitHub Pages deployment

For a simple static site, Pages may deploy directly from a branch or through Actions depending on project configuration.

For static HTML/CSS/JS, direct branch deployment is often enough.

## 73. Project-site paths

If the site URL is:

```text
https://user.github.io/techhandbook/
```

then this is dangerous:

```html
<script src="/assets/app.js"></script>
```

because it points to:

```text
https://user.github.io/assets/app.js
```

Use relative paths:

```html
<script src="./assets/app.js"></script>
```

or explicit base-path handling.

## 74. Security practices

- enable MFA,
- protect important branches,
- review repository access,
- use least-privilege tokens,
- prefer OIDC for cloud CI authentication,
- do not commit secrets,
- review Actions permissions,
- keep dependencies/actions current.

## 75. Backups

GitHub is not a substitute for every backup requirement.

For important repositories, clones and mirrors can provide extra resilience.

Code may be replicated easily; Issues, releases, packages, and settings require separate consideration.

## 76. Useful gh commands

```bash
gh auth status
gh repo view
gh repo clone OWNER/REPO
gh repo create
gh issue list
gh issue create
gh pr list
gh pr create
gh pr view
gh run list
gh run view
gh release list
gh release create TAG
```

## 77. Useful Git commands around GitHub

```bash
git status
git remote -v
git fetch --all --prune
git branch -a
git log --oneline --graph --decorate --all
git push
git pull --ff-only
```

## 78. Common mistakes

- committing secrets,
- doing all work directly on `main`,
- giant unclear commits,
- no README,
- broken CI ignored for months,
- granting Admin when Write is enough,
- using personal tokens in shared automation,
- relying on absolute paths in project Pages,
- treating a private repository as a secret vault.

## 79. Practical workflow for a small project

```text
idea
 ↓
Issue / note
 ↓
branch
 ↓
few logical commits
 ↓
tests
 ↓
Pull Request
 ↓
review diff
 ↓
merge
 ↓
tag/release when meaningful
 ↓
deploy
```

For solo work you can simplify this, but the model is still useful.

## 80. What you should be able to do

After mastering this handbook, you should be able to:

- create and clone repositories,
- configure SSH/gh,
- work with branches and PRs,
- use issues and releases,
- understand forks,
- configure basic Actions,
- publish a static Pages site,
- use organizations and permissions,
- protect secrets and important branches,
- read repository history confidently.

## Final mental model

GitHub is not only a place where source files sit.

Think of it as:

```text
Git history
+ collaboration
+ review
+ automation
+ releases
+ security
+ public project presence
```

Use only the pieces a project actually needs.
