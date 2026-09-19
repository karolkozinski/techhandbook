# Visual Studio Code — Practical Handbook

## 1. What Visual Studio Code is

Visual Studio Code (VS Code) is a graphical code editor with:

- project/workspace support,
- integrated terminal,
- Git integration,
- debugger,
- extensions,
- language servers,
- remote development,
- AI coding assistants such as GitHub Copilot and OpenAI Codex integrations.

It is not a full IDE in the traditional sense, but with extensions it can behave like one.

## 2. Installation

Use the current official Microsoft packages or your operating-system repositories.

On Debian, a common approach is the Microsoft repository or a distribution package.

On Windows, use the official installer.

On FreeBSD, check current package availability; many users prefer a compatible build/editor package or run VS Code on a client machine and connect to FreeBSD over SSH.

Always verify the current supported platform list.

## 3. Main interface areas

### Activity Bar

Usually on the left.

Contains icons for:

- Explorer,
- Search,
- Source Control,
- Run and Debug,
- Extensions.

### Side Bar

Shows the selected activity's content.

### Editor

The main file-editing area.

### Panel

Usually at the bottom:

- Terminal,
- Problems,
- Output,
- Debug Console.

### Status Bar

Bottom line with:

- branch,
- language mode,
- encoding,
- line/column,
- interpreter/tooling status.

## 4. Command Palette

Open:

```text
Ctrl+Shift+P
```

The Command Palette is the central control surface.

Instead of memorizing every menu location, type what you want:

```text
Format Document
Git: Clone
Preferences: Open Settings
Developer: Reload Window
```

## 5. Opening a project

From shell:

```bash
code .
```

or:

```bash
code /path/to/project
```

Open the project directory, not only one source file.

VS Code understands repository context much better when the folder/workspace is open.

## 6. Workspace

A workspace can be:

- a single folder,
- multiple folders,
- a `.code-workspace` file.

Multi-root workspaces are useful when several repositories belong to one task.

## 7. Explorer

Use Explorer to:

- create files,
- create directories,
- rename,
- move,
- delete,
- reveal files.

Right-click menus expose many operations.

For bulk or scripted file work, the terminal may be faster.

## 8. Search

Current file:

```text
Ctrl+F
```

Replace:

```text
Ctrl+H
```

Whole workspace:

```text
Ctrl+Shift+F
```

Workspace replace:

```text
Ctrl+Shift+H
```

Search supports regular expressions.

## 9. Quick Open

```text
Ctrl+P
```

Type part of a filename.

This is often faster than navigating folders.

## 10. Go to Symbol

Current file:

```text
Ctrl+Shift+O
```

Workspace symbol:

```text
Ctrl+T
```

Exact shortcuts can vary by platform/keymap.

## 11. Navigation

Common actions:

- Go to Definition,
- Peek Definition,
- Go to Type Definition,
- Find All References,
- Go Back,
- Go Forward.

These depend on language-server support.

## 12. Editing

Useful general shortcuts:

```text
Ctrl+Z       undo
Ctrl+Shift+Z redo
Ctrl+S       save
Ctrl+Shift+S save as
Ctrl+/       toggle line comment
```

On Linux/Windows, `Alt+Up/Down` commonly moves lines.

## 13. Multi-cursor

Add cursors with:

- Alt+Click,
- keyboard shortcuts for next occurrence,
- column selection.

Multi-cursor editing is excellent for small repeated edits.

For structural refactoring, use language-aware tools instead of blind text changes.

## 14. Select next occurrence

A common shortcut:

```text
Ctrl+D
```

Selects the next matching occurrence.

Repeated use creates multiple cursors.

## 15. Move and duplicate lines

Typical shortcuts:

```text
Alt+Up/Down
Shift+Alt+Up/Down
```

Check Keyboard Shortcuts for your OS.

## 16. Comments

Toggle line comment:

```text
Ctrl+/
```

Block comment shortcut depends on language/keymap.

## 17. Formatting

Command Palette:

```text
Format Document
```

Common shortcut:

```text
Shift+Alt+F
```

Formatting depends on the configured formatter.

Examples:

- gofmt,
- Prettier,
- Ruff/Black,
- clang-format.

## 18. settings.json

VS Code settings can be edited through UI or JSON.

Command Palette:

```text
Preferences: Open User Settings (JSON)
```

Example:

```json
{
  "editor.formatOnSave": true,
  "editor.rulers": [100],
  "files.trimTrailingWhitespace": true
}
```

## 19. User vs workspace settings

User settings apply globally.

Workspace settings apply to the current project and commonly live in:

```text
.vscode/settings.json
```

Use workspace settings for project-specific tooling where appropriate.

## 20. .vscode directory

Common files:

```text
.vscode/
├── settings.json
├── launch.json
├── tasks.json
└── extensions.json
```

Decide which files belong in Git.

Project-wide settings/tasks often do.

Personal-only preferences may not.

## 21. Extensions

Extensions add support for languages and workflows.

Install only what you need.

Too many extensions can:

- slow startup,
- create conflicting formatters,
- add security surface,
- clutter commands/settings.

## 22. Useful extension categories

Web:

- language tooling,
- formatter/linter,
- browser/debug tooling.

Go:

- official Go extension.

Python:

- Python extension,
- language server/type checker as appropriate.

Docker:

- container tooling.

Git:

VS Code has built-in Git; additional extensions are optional.

AI:

- GitHub Copilot,
- Codex integrations,
- other approved tools.

## 23. Profiles

VS Code Profiles can separate configurations.

Example:

```text
Web
Go
Python
Minimal
Work
```

Each profile can have different:

- extensions,
- settings,
- UI layout.

Useful when one editor serves several technology stacks.

## 24. Integrated terminal

Open it from View → Terminal or use your configured shortcut.

Use the same shell you would use outside VS Code.

You can run:

```bash
git status
go test ./...
npm test
docker compose ps
ssh server
```

The terminal is not a special sandbox.

Commands have your normal account permissions.

## 25. Tasks

Tasks automate repeatable shell commands.

File:

```text
.vscode/tasks.json
```

Example:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "test",
      "type": "shell",
      "command": "go test ./...",
      "group": "test"
    }
  ]
}
```

Use tasks for common project operations, not to hide mysterious scripts.

## 26. Git integration

Source Control view shows:

- modified files,
- staging,
- diffs,
- branches,
- commits.

You can stage selected hunks/lines.

The Git CLI remains valuable for understanding what is happening.

## 27. Typical commit workflow

1. inspect Source Control,
2. open diffs,
3. stage intended changes,
4. write a meaningful message,
5. commit,
6. push.

Do not commit generated/secrets files just because they appear in the list.

## 28. Diff view

VS Code can show side-by-side or inline diffs.

Use it before every important commit, especially after AI-generated changes.

## 29. Branches

Click the branch indicator in the Status Bar or use Command Palette.

CLI equivalent:

```bash
git switch -c feature/name
```

## 30. GitHub integration

With GitHub authentication/extensions, VS Code can work with:

- repositories,
- Pull Requests,
- Issues,
- Codespaces,
- Copilot.

You do not need all integrations for normal Git work.

## 31. Running programs

Go:

```bash
go run .
```

Python:

```bash
python script.py
```

Node:

```bash
node app.js
npm run dev
```

Use the integrated terminal or Run/Debug configuration.

## 32. Debugger

VS Code debugger provides:

- breakpoints,
- call stack,
- variables,
- watch expressions,
- step operations,
- debug console.

Language-specific adapters are required.

## 33. Breakpoints

Click next to a line number.

When execution reaches the line, the debugger pauses.

Then inspect state rather than adding dozens of print statements.

## 34. Debug controls

Common concepts:

- Continue,
- Step Over,
- Step Into,
- Step Out,
- Restart,
- Stop.

Understand these before configuring complex launch setups.

## 35. launch.json

Debug configuration lives in:

```text
.vscode/launch.json
```

Example fields depend on language:

- program,
- args,
- cwd,
- environment,
- request type.

Prefer generated/official templates and keep configuration understandable.

## 36. Problems panel

Shows diagnostics from:

- compiler,
- language server,
- linter,
- TypeScript,
- extensions.

Open:

```text
Ctrl+Shift+M
```

Fix the first meaningful error rather than only the last cascade.

## 37. Linter

A linter finds suspicious or style-related code.

Examples:

- ESLint,
- golangci-lint,
- Ruff,
- ShellCheck.

Use project configuration so editor and CI agree.

## 38. IntelliSense

VS Code's completion/navigation umbrella includes:

- suggestions,
- parameter hints,
- documentation,
- symbol navigation.

Quality depends on the language server and project metadata.

## 39. Refactoring

Language-aware refactors are safer than text replacement.

Example:

```text
Rename Symbol
```

This can update references across a project.

Still review the diff.

## 40. Remote SSH

Remote SSH lets the VS Code UI run locally while opening a project on a remote machine.

Architecture:

```text
local VS Code UI
  ↓ SSH
remote server
  ↓
remote VS Code server/components
  ↓
project files/tools
```

Excellent for VPS development and administration.

## 41. SSH configuration

Use:

```text
~/.ssh/config
```

Example:

```sshconfig
Host vps
    HostName 203.0.113.10
    User karol
    IdentityFile ~/.ssh/id_ed25519
```

Then connect to host `vps` from VS Code.

## 42. Why Remote SSH is useful

You can:

- edit remote files,
- run remote terminal commands,
- debug with remote toolchains,
- keep large repositories on the server,
- use local UI convenience.

Be careful: saving a file may modify production directly.

Prefer development/staging environments for code work.

## 43. Dev Containers

Dev Containers define a development environment in a container.

Useful when the team needs a reproducible toolchain.

They add complexity and are not required for small projects.

## 44. Docker integration

VS Code can help inspect:

- Dockerfiles,
- Compose files,
- containers,
- images,
- logs.

Use Docker CLI knowledge too; do not depend entirely on UI buttons.

## 45. Tests

VS Code can display and run tests for supported languages/frameworks.

Still know the command-line test command:

```text
go test ./...
npm test
pytest
```

CI uses commands, not your editor buttons.

## 46. Keyboard shortcuts worth learning

```text
Ctrl+P        open file
Ctrl+Shift+P  command palette
Ctrl+F        find
Ctrl+H        replace
Ctrl+Shift+F  search project
Ctrl+/        comment
F5            start debugging
F12           go to definition
Shift+F12     find references
```

Exact shortcuts can vary by OS/keymap.

## 47. Keyboard Shortcuts editor

Open Command Palette:

```text
Preferences: Open Keyboard Shortcuts
```

Search commands and assign keys.

Avoid remapping everything immediately; learn the defaults first.

## 48. Markdown editing

VS Code is excellent for Markdown.

Preview:

```text
Ctrl+Shift+V
```

Side preview is available through commands.

Useful for:

- README,
- documentation,
- handbooks,
- project notes.

## 49. AI coding assistance — three levels

### Autocomplete

AI suggests code while typing.

Good for:

- repetitive syntax,
- boilerplate,
- simple patterns.

### Chat

Ask questions about code or request explanations.

### Agent

The AI can inspect files, edit multiple files, run commands, and work toward a larger goal.

The more autonomy you give, the more important review becomes.

## 50. GitHub Copilot

Copilot can provide:

- completions,
- chat,
- code explanation,
- edits,
- agent-style workflows depending on current product version.

Features and mode names evolve, so check current official documentation.

## 51. Copilot Chat

Useful for:

- explaining unfamiliar code,
- generating tests,
- proposing changes,
- asking about errors.

Give context:

```text
Goal
Current architecture
Constraints
Commands used to test
What must not change
```

## 52. Ask / Plan / Agent concepts

Different products/versions may expose modes with names such as:

- Ask,
- Plan,
- Agent.

A useful workflow regardless of exact labels is:

```text
understand
→ plan
→ edit
→ run tests
→ inspect diff
```

## 53. Plan before large edits

For a large task, ask the agent to:

1. inspect repository,
2. explain architecture,
3. propose files to change,
4. identify risks,
5. only then implement.

This reduces random multi-file rewrites.

## 54. Agent mode

An agent may be able to:

- read project files,
- search,
- edit,
- run terminal commands,
- run tests,
- iterate.

Set boundaries:

```text
Do not change database schema.
Do not update dependencies.
Do not commit.
Run tests after changes.
```

## 55. Cloud agents

Some AI tools can run tasks in remote/cloud environments.

Treat them as separate execution environments:

- confirm repository/branch,
- understand permissions,
- review produced commits/diffs,
- never assume they share local uncommitted state.

## 56. OpenAI Codex

Codex integrations can act as coding agents that inspect and modify repositories, run commands, and prepare changes.

Exact VS Code features depend on the current extension/product version.

The core workflow remains:

```text
task
→ repository analysis
→ changes
→ tests
→ diff
→ human review
```

## 57. Local vs cloud coding agent

Local:

- sees your local workspace,
- can use local tools,
- may touch uncommitted files.

Cloud:

- works in a remote environment,
- usually starts from a repository state,
- may create commits/PRs,
- requires explicit synchronization of local-only state.

Know which environment is active before delegating work.

## 58. Several agents in one editor

VS Code can become a control center for multiple AI assistants.

This is useful only if responsibilities are clear.

Avoid having two agents edit the same files simultaneously.

Git branches/worktrees help isolate work.

## 59. Choosing an AI coding assistant

Choose based on:

- tool access,
- repository context,
- team policy,
- task type,
- cost,
- privacy requirements.

Do not treat any assistant as an authority.

Use the tool that best fits the workflow and review its output.

## 60. Writing good agent instructions

Bad:

```text
Make it better.
```

Better:

```text
Add a language selector to the static site.

Requirements:
- PL and ENG
- selection stored in localStorage
- search only active language
- no framework
- preserve hash routing
- run existing checks
- show the diff before committing
```

## 61. Definition of Done

Tell the agent when the task is complete.

Example:

```text
Done when:
- site works locally,
- no console errors,
- both language versions open,
- mobile layout still works,
- README updated.
```

## 62. Split large tasks

Instead of one giant instruction, use stages:

```text
1. inspect
2. architecture plan
3. data model
4. implementation
5. tests
6. documentation
```

## 63. Agent should know project commands

Document:

```text
Build:
go build ./...

Test:
go test ./...

Run:
docker compose up
```

Put stable instructions into repository documentation such as `AGENTS.md`.

## 64. Do not give unlimited trust

AI can:

- misunderstand requirements,
- delete code,
- invent APIs,
- introduce security bugs,
- update dependencies unnecessarily,
- produce plausible but wrong fixes.

Review important changes.

## 65. Always inspect the diff

Use Source Control or:

```bash
git diff
git diff --staged
```

Look for:

- unrelated changes,
- removed checks,
- secret files,
- generated files,
- dependency changes,
- suspicious cleanup.

## 66. Commit before large AI work

A clean checkpoint helps rollback:

```bash
git status
git add .
git commit -m "Checkpoint before large change"
```

or use a dedicated branch.

## 67. Use a branch

```bash
git switch -c feature/i18n
```

Then AI work does not immediately affect `main`.

## 68. Git worktrees

```bash
git worktree add ../project-ai feature/ai-task
```

Useful for parallel tasks without file conflicts.

## 69. Agent and terminal

When an agent can run commands, treat it like a developer/admin with shell access.

Define:

- allowed commands,
- forbidden areas,
- whether network access is allowed,
- whether installs are allowed,
- whether commits/pushes are allowed.

## 70. Be especially careful with destructive actions

```text
rm -rf
git reset --hard
git clean -fdx
database migrations
docker compose down -v
package upgrades
production SSH
cloud resources
secret files
```

Require explicit review for high-impact steps.

## 71. Secrets

Never put secrets into source files or prompts unnecessarily.

Use:

- environment variables,
- secret stores,
- GitHub Actions secrets,
- local ignored files.

Check AI-generated diffs for accidental exposure.

## 72. MCP and external tools

Editor agents may connect to external tools and services.

This can grant real access to:

- GitHub,
- databases,
- ticket systems,
- cloud APIs,
- documentation.

Grant minimum permissions.

An agent with a connector can perform real actions, not just suggest code.

## 73. Context

An agent works best when context is explicit:

```text
README
AGENTS.md
architecture docs
tests
build scripts
current branch
task description
```

Do not assume it knows unwritten conventions.

## 74. Start with repository reconnaissance

```text
Inspect this repository.
Do not change files yet.

Explain:
- architecture,
- entry points,
- build/test commands,
- important directories,
- risks relevant to the task.
```

Then implement.

## 75. AI as teacher

```text
Explain this file from top to bottom.
Assume I understand programming fundamentals
but not this framework.
Point out control flow and dependencies.
```

Excellent for unfamiliar code.

## 76. AI as reviewer

```text
Review the current diff.
Focus on:
- bugs,
- security,
- regressions,
- missing error handling,
- tests.
Do not rewrite the code yet.
```

## 77. AI as debugger

Provide:

- exact error,
- command,
- environment,
- expected behavior,
- relevant logs.

Ask for hypotheses and verification before edits.

## 78. AI for documentation

Generate/update:

- README,
- setup,
- architecture,
- runbook,
- API docs

from actual repository code.

Verify every command afterward.

## 79. AI for refactoring

Define invariants:

```text
Public API must not change.
Tests must remain green.
No new dependencies.
```

Without constraints, scope often expands.

## 80. AI for tests

Ask:

```text
Identify important untested behavior first.
Then add tests for those cases.
Do not write tests that only mirror implementation details.
```

## 81. AI and dependencies

A useful rule:

```text
Prefer the standard library and existing dependencies.
If a new dependency is needed, explain why before adding it.
```

## 82. AI and architecture

Use agents to explain options and trade-offs.

Ask for:

- simplest viable option,
- alternatives,
- operational cost,
- migration impact.

Then make the decision yourself.

## 83. Small-project workflow

```text
open folder
→ git status
→ create branch
→ edit
→ test
→ diff
→ commit
→ push/PR
```

With AI:

```text
plan
→ agent edits
→ tests
→ human diff review
→ commit
```

## 84. README as project map

A good README contains:

```text
Purpose
Requirements
Build
Run
Test
Configuration
Deployment
```

This helps people and agents.

## 85. AGENTS.md

Example:

```markdown
# Project rules

## Stack
Go + static HTML/CSS/JS

## Commands
- Build: go build ./...
- Test: go test ./...

## Rules
- no framework
- no dependency updates without approval
- keep paths relative for GitHub Pages
```

## 86. .gitignore

Some teams ignore:

```text
.vscode/
```

Others commit selected shared files such as tasks or recommended extensions.

Choose deliberately.

## 87. Emmet

Emmet expands HTML/CSS abbreviations.

Example:

```text
ul>li*3
```

can create a small list structure.

## 88. Snippets

Snippets store reusable code templates.

Use them for repetitive boilerplate, not to hide complex logic.

## 89. Zen Mode

Use the command:

```text
View: Toggle Zen Mode
```

for a distraction-reduced interface.

## 90. Split Editor

View two files side by side:

- source + test,
- HTML + CSS,
- code + documentation.

Very useful for review.

## 91. Breadcrumbs and Outline

Breadcrumbs show file/symbol hierarchy.

Outline lists functions/classes/headings.

Helpful in large files.

## 92. Minimap

A compressed overview of the file.

Optional preference; disable it if it adds noise.

## 93. Autosave

VS Code supports several autosave modes.

On remote production files, autosave can be risky because every edit becomes an immediate file change.

## 94. Hot reload

Framework/dev servers provide hot reload.

Examples:

- Vite,
- Node dev tools,
- framework reloaders.

VS Code is the editor, not the runtime.

## 95. VS Code + Go

Use:

- official Go extension,
- gopls,
- gofmt/goimports,
- Delve.

Still know:

```bash
go test ./...
go build ./...
```

## 96. VS Code + JavaScript / Node

Built-in JS/TS support is strong.

Add only needed tools such as:

- ESLint,
- formatter,
- framework extension.

Project commands come from `package.json`.

## 97. VS Code + Python

Select the correct interpreter/venv.

Verify:

```bash
python -c 'import sys; print(sys.executable)'
```

Use the project's pytest/Ruff/type-checking/debugger setup.

## 98. VS Code as a remote client

A strong model:

```text
local workstation
→ VS Code Remote SSH
→ VPS or dev server
```

For production, prefer controlled deployment over direct live-file editing.

## 99. Local development + Git deployment

```text
edit locally
→ tests
→ commit
→ push
→ CI/deployment
```

More reproducible than manual production edits.

## 100. Local development + Docker

```text
VS Code
→ source
→ docker compose
→ local test
→ image/registry
→ server
```

## 101. Source Control + AI

Excellent workflow:

```text
AI changes
→ Source Control diff
→ human review
→ tests
→ commit
```

Git makes experimentation reversible.

## 102. Common beginner mistakes

- opening one file instead of the project,
- installing dozens of extensions,
- not using Git,
- blind Accept All,
- skipping tests,
- running random terminal commands suggested by AI,
- editing production directly.

## 103. Good repository-inspection prompt

```text
Inspect this repository without changing anything.

Explain:
- purpose,
- stack,
- entry point,
- directory structure,
- build/test commands,
- deployment,
- major dependencies,
- risky areas.
```

## 104. Good implementation prompt

```text
Implement X.

Constraints:
- no new dependencies,
- preserve public API,
- follow existing style,
- add/update tests,
- run tests,
- summarize files changed.
```

## 105. Good bug-fix prompt

```text
Reproduce and diagnose this bug first.
Do not edit until you can explain the likely cause.

Error:
...

Expected:
...

Then make the smallest safe fix and run tests.
```

## 106. Good refactor prompt

```text
Refactor this module for readability.

Do not change behavior or public API.
Do not add dependencies.
Keep tests green.
```

## 107. Good review prompt

```text
Review the current diff only.

Focus on:
- correctness,
- security,
- error handling,
- concurrency,
- regressions,
- tests.

List findings before proposing changes.
```

## 108. When autocomplete is best

Use for:

- predictable code,
- boilerplate,
- repetitive tests,
- small transformations.

Read every accepted completion.

## 109. When chat is best

Use for:

- explanations,
- questions,
- architecture discussion,
- debugging hypotheses,
- small transformations.

## 110. When planning is best

Use before:

- multi-file features,
- migrations,
- architecture changes,
- unfamiliar repositories.

## 111. When agent mode is best

Use when the task requires:

- searching many files,
- editing several files,
- running tests,
- repeated iteration.

Keep scope explicit.

## 112. When manual work is better

Manual editing is often faster for:

- obvious one-line fixes,
- sensitive operations,
- tasks you already understand completely.

AI is optional.

## 113. Minimal extension strategy

Start with:

```text
one language extension
one formatter/linter
Git built-in
one AI assistant if desired
Remote/Docker only when used
```

## 114. Minimal settings example

```json
{
  "editor.formatOnSave": true,
  "files.trimTrailingWhitespace": true,
  "editor.rulers": [100],
  "editor.minimap.enabled": false
}
```

## 115. Daily workflow

```text
code .
→ git status
→ fetch/pull
→ branch
→ work
→ tests
→ diff
→ commit
→ push
```

## 116. Most important AI coding rule

Never confuse:

```text
the agent generated code
```

with:

```text
the code is correct
```

Correctness comes from:

- understanding,
- execution,
- tests,
- review.

## 117. VS Code in 60 seconds

```text
Ctrl+P        file
Ctrl+Shift+P  command palette
Ctrl+Shift+F  project search
Ctrl+F        file search
Ctrl+/        comment
F12           definition
Shift+F12     references
F5            debug
Source Control → diff/commit
```

## 118. AI in 60 seconds

```text
give goal
give context
give constraints
ask for plan
let agent edit
run tests
inspect diff
commit after review
```

## 119. Sources

Use current:

- Visual Studio Code documentation,
- language-extension documentation,
- GitHub Copilot documentation,
- OpenAI Codex documentation for the installed integration.

AI product features evolve quickly, so exact mode names and UI details can change.

## Summary

VS Code is most effective as a project workbench:

```text
files
+ terminal
+ language server
+ debugger
+ Git
+ optional AI agent
```

Keep the command-line workflow understandable underneath the UI.
