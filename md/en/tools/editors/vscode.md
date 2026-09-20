---
id: "doc-039"
title: "Visual Studio Code - Knowledge Handbook"
slug: "visual-studio-code-knowledge-handbook"
description: "VS Code is a cross-platform code editor with project navigation, Git integration, terminal, debugger, language servers, extensions and AI tooling. It sits…"
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "vscode"
  - "editor"
  - "copilot"
  - "codex"
---

# Visual Studio Code - Knowledge Handbook

VS Code is a workspace for the whole project: files, search, terminal, Git, debugging, language services, tasks and AI tooling share one context. Agents can now plan work, edit multiple files and run commands, but the result should still go through diff review, tests and normal code review.

Current VS Code distinguishes lighter AI assistance from agentic workflows; depending on configuration, sessions can use targets such as Copilot or Codex.

Related topics: [GitHub](techhandbook:doc-014), [Git in Team Workflows](techhandbook:doc-013), [Software Testing](techhandbook:doc-049), [AI Prompting](techhandbook:doc-002) and [vi / Vim / gVim / Neovim](techhandbook:doc-038).

## 1. What Visual Studio Code is
VS Code is a cross-platform code editor with project navigation, Git integration, terminal, debugger, language servers, extensions and AI tooling. It sits between a simple editor and a full IDE.
# 2. Installation
## Debian / Ubuntu
Install from Microsoft's repository/package or use a distribution-supported build. Keep the package source explicit so updates remain predictable.
## Windows
Install the official Windows build and enable PATH integration if you want to launch projects with `code .`.
## FreeBSD
Use the available package/ports variant where suitable. Some proprietary Microsoft extensions/services may behave differently from the official Microsoft build.
# 3. Main interface areas
## Activity Bar
Left-side icons for Explorer, Search, Source Control, Run/Debug and Extensions.
## Side Bar
Context-specific project tree, search results, Git changes and other views.
## Editor
Main file-editing area, supporting multiple tabs and split groups.
## Panel
Bottom area for Terminal, Problems, Output and Debug Console.
## Status Bar
Shows branch, line/column, encoding, language mode, errors, remote state and extension-specific status.
# 4. Command Palette - control center
```text
Ctrl+Shift+P   Windows/Linux
Cmd+Shift+P    macOS
```
Use it to discover commands instead of memorizing menus.
# 5. Opening a project
```bash
code .
```
Open the directory, not just one file, so VS Code can understand workspace settings, Git, tasks and project-wide navigation.
# 6. Workspace
A workspace is the project context VS Code uses for files, settings, tasks, extensions and debugging. Multi-root workspaces can combine several folders.
# 7. Explorer and file operations
Create, rename, delete and move project files from Explorer, but remember those operations also affect Git working-tree state.
# 8. Search
## In the current file
```text
Ctrl+F
```
## Replace
```text
Ctrl+H
```
## Across the whole project
```text
Ctrl+Shift+F
```
Use include/exclude filters to narrow large repositories.
# 9. Quick Open
```text
Ctrl+P
```
Type part of a filename and jump directly to it.
# 10. Go to symbol
## Symbol in current file
```text
Ctrl+Shift+O
```
## Symbol in project
Use workspace-symbol search through the Command Palette or the configured shortcut/language server.
# 11. Code navigation
## Go to Definition
Jump to where the selected symbol is defined, usually powered by the language server.
## Peek Definition
Open the definition inline without leaving the current file.
## Find All References
Find every known use of a symbol across the workspace.
# 12. Editing code
VS Code supports selections, snippets, auto-indent, bracket matching, code actions and language-aware editing.
# 13. Multi-cursor
Create several cursors to edit repeated patterns simultaneously. Use carefully when structure differs between occurrences.
# 14. Selecting next occurrences
Select the next matching occurrence repeatedly to build multi-cursor edits.
# 15. Moving lines
Move selected lines up/down with keyboard shortcuts instead of cut/paste.
# 16. Copying lines
Duplicate a line or selection with the configured shortcut.
# 17. Comments
Toggle line/block comments with language-aware shortcuts.
# comment
```text
Ctrl+/   toggle line comment
```
# 18. Formatting
Use Format Document/Selection with a project formatter such as gofmt, Prettier, Black or language-native tools.
# 19. settings.json
Settings can be edited through UI or JSON. JSON is useful when you want versionable, explicit configuration.
# 20. User and project settings
## User Settings
Apply globally for your account/profile.
## Workspace Settings
Apply only to the current project and may live under `.vscode/settings.json`.
# 21. `.vscode` directory
## settings.json
Project-specific editor/language settings.
## launch.json
Debugger configurations.
## tasks.json
Build/test/tool tasks runnable from VS Code.
## extensions.json
Recommended extensions for contributors.
# 22. Extensions
### Web
Typical examples: HTML/CSS/JS helpers, ESLint, Prettier, framework tooling.
### Go
The Go extension integrates gopls, formatting, tests and debugging.
### Python
Python extension plus Pylance or equivalent language tooling.
### Docker
Container tooling can help inspect images/containers and edit Docker/Compose files.
### Git
Built-in Git is usually sufficient; GitLens-like tools add history/blame exploration.
### AI
Copilot, Codex and other agent/chat integrations can operate inside the editor.
# 23. Do not install everything
Too many extensions slow startup, add overlapping shortcuts and increase supply-chain risk. Keep only tools that solve a real need.
# 24. Profiles
Profiles isolate extension/settings sets for different workflows, e.g. web, Go, minimal server editing.
# 25. Terminal
```text
Ctrl+`
```
The integrated terminal uses your normal shell and current workspace context.
# 26. Terminal and VS Code
Treat the terminal as a real shell: commands have real filesystem/Git consequences.
# 27. Tasks
Tasks wrap repeatable commands such as build, test, lint or deploy. Store project tasks in `.vscode/tasks.json` when useful.
# 28. Git in VS Code
Source Control shows modified/staged files and provides commit, branch, pull/push and conflict workflows.
# 29. Source Control
Review diffs before staging. Do not use Source Control as a substitute for understanding Git concepts.
# 30. Typical commit
```text
edit → inspect diff → stage selected files/hunks → write commit message → commit → push
```
# 31. Diff
Use side-by-side or inline diff to review exact changes before commit or after AI edits.
# 32. Branch
Create task branches for isolated work. Branches make experimentation and review safer.
# 33. GitHub
VS Code can integrate with GitHub authentication, issues, pull requests and repository workflows through extensions.
# 34. Running a program
## Go
```bash
go run .
go test ./...
```
## Python
```bash
python script.py
pytest
```
## Node.js
```bash
node app.js
```
## npm
```bash
npm run dev
npm test
```
# 35. Debugger
The debugger lets you pause execution, inspect variables, call stacks and evaluate expressions.
# 36. Breakpoint
Click the gutter or use the shortcut to pause when execution reaches a line.
# 37. Debug controls
### Step Over
Execute the current line without entering called functions.
### Step Into
Enter a called function.
### Step Out
Run until the current function returns.
# 38. launch.json
Stores repeatable debugger configurations: program, arguments, environment, working directory and debugger type.
# 39. Problems
Aggregates compiler, linter and language-server diagnostics. Treat it as a fast navigation list, not as infallible truth.
# 40. Linter
Linters detect suspicious patterns and style/quality problems. Configure the project linter rather than relying on editor defaults alone.
# 41. IntelliSense
Completion, signatures, hover documentation and symbol navigation generated by language services.
# 42. Refactoring
Language-aware refactors change code structurally rather than textually.
### Rename Symbol
Rename a symbol across references using the language server instead of blind search-and-replace.
# 43. Remote SSH
Remote SSH opens a remote server filesystem/workspace while the UI remains local.
# 44. SSH configuration
```text
Host vps
    HostName 203.0.113.10
    User example
    IdentityFile ~/.ssh/id_ed25519
```
# 45. Why Remote SSH is excellent
You edit and run tools in the real remote environment while keeping local VS Code UX. Good for VPS administration and remote development.
# 46. Dev Containers
Dev Containers define a reproducible containerized development environment for VS Code.
# 47. Docker
VS Code can edit Dockerfiles/Compose and use the integrated terminal for Docker commands. Keep actual deployment logic in versioned files/scripts.
# 48. Tests
Use test integration when available, but always know the real command that runs tests in CI.
# 49. Shortcuts really worth knowing
```text
Ctrl+P file
Ctrl+Shift+P command
Ctrl+F search
Ctrl+Shift+F project search
Ctrl+` terminal
F12 definition
Shift+F12 references
```
# 50. Keyboard Shortcuts
Open the shortcut editor to inspect conflicts and customize only high-value bindings.
# 51. VS Code as a Markdown editor
Preview Markdown, navigate headings and edit repository documentation comfortably.
# 52. Instruction files for AI agents
Keep persistent project rules in repository files so agents know build/test conventions and constraints.
# Agent instructions
Example agent instruction document:
## Build
```bash
go build ./...
```
## Tests
```bash
go test ./...
```
## Rules
Do not change public APIs without approval. Do not commit secrets. Run tests before finishing.
# 53. AI in VS Code - three different levels
## 1. Autocomplete
Predicts code as you type. Best for repetitive/local patterns.
## 2. Chat
Conversational explanation, questions, small edits and code guidance.
## 3. Agent
Can inspect multiple files, edit, run commands and iterate toward a task.
# 54. GitHub Copilot
Copilot provides code completion, chat and agent-oriented workflows depending on product/version.
# 55. Copilot Chat
Use it for repository questions, explanation, planning, debugging and scoped edits.
# 56. Copilot modes
## Ask
Primarily conversational/explanatory; suitable before making changes.
## Plan
Creates a proposed implementation approach before editing.
## Agent
Performs multi-step edits and tool/terminal actions within granted permissions.
# 57. Good practice: Plan → Agent
For non-trivial work, inspect and plan first, then let the agent implement against explicit acceptance criteria.
# 58. Copilot Agent Mode
Agent Mode can modify multiple files and execute tools/commands. Always review the resulting diff.
# 59. Copilot Cloud Agent
Cloud agents run tasks in remote/cloud environments rather than your current local editor session.
### Agent Mode
Works interactively in the current repository/session.
### Cloud Agent
Runs delegated work remotely and returns changes/results for review.
# 60. OpenAI Codex
Codex is an AI coding agent that can inspect repositories, edit code, run commands/tests and complete software tasks.
# 61. Codex in VS Code
Use the Codex integration to work directly against the repository while retaining Git review and terminal visibility.
# 62. Local and cloud Codex
## local work
Agent operates against your current files and local tools.
## cloud task
Delegated task runs in an isolated remote environment and returns results/changes.
# 63. VS Code as a hub for multiple agents
You can use Copilot, Codex and other assistants in one editor, but define clear responsibilities and avoid concurrent edits to the same files.
# 64. Copilot or Codex?
Choose by task and workflow: autocomplete/chat convenience versus stronger multi-step repository work. The important factor is reviewability, not brand.
# 65. How to instruct an agent
State goal, relevant files, constraints, test commands and definition of done.
# 66. Definition of Done
Example: code compiles, tests pass, docs/config updated, no secrets added, diff reviewed.
# 67. Split large tasks into stages
Architecture → implementation slice → tests → cleanup is safer than asking an agent to rewrite everything at once.
# 68. Agent should know project commands
Keep canonical build/test/lint commands in README, AGENTS.md or package scripts.
# 69. AI should not receive unlimited trust
Treat agent output like code from a fast junior/senior collaborator: useful, but still requiring validation.
# 70. Always inspect the diff
A passing build does not guarantee the change is scoped, secure or maintainable.
# 71. Commit before larger AI work
A clean checkpoint makes rollback and comparison trivial.
# 72. Branch for an AI task
```bash
git switch -c ai/task-name
```
# 73. Worktree
```bash
git worktree add ../project-ai -b ai/experiment
```
Worktrees isolate concurrent efforts without repeatedly switching the main working tree.
# 74. Agent and terminal
Terminal access is powerful: agents can build, test and inspect, but can also delete files or alter environments. Scope permissions accordingly.
# 75. Be especially careful with
Deployment commands, migrations, credential tools, `rm`, Git history rewrites, package upgrades and production infrastructure.
# 76. Secrets
Never paste or commit API keys, passwords, private keys or production credentials into prompts/files unless the environment is explicitly approved.
# 77. MCP
Model Context Protocol integrations can expose external tools/data to agents. Grant only required capabilities and understand what actions are possible.
# 78. AI and context
Give relevant repository files and constraints, not massive unrelated chat history.
# 79. Rule: inspect first
For unfamiliar repositories, ask the agent to map structure and commands before editing.
# 80. AI as a code teacher
Ask it to explain data flow, unfamiliar syntax and architecture while referencing concrete files.
# 81. AI as reviewer
Ask for correctness, security, maintainability and regression risks, then verify the claims.
# 82. AI as debugger
Provide exact symptoms/logs and require reproduction/root-cause analysis before edits.
# 83. AI for documentation
Useful for turning actual code/config into README, runbooks and API explanations. Verify against the repository.
# 84. AI for refactoring
Define invariants and tests first. Refactor in small slices.
# 85. AI for tests
Have the agent add regression tests around real behavior, not meaningless coverage padding.
# 86. AI and dependencies
Require justification before adding a new package. Prefer existing stack/standard library when adequate.
# 87. AI and architecture
Use AI to enumerate trade-offs and constraints, but keep architectural decisions explicit and documented.
# 88. Useful workflow for a small project
Open repo → inspect README → run tests → create branch → plan → implement small slice → run tests → inspect diff → commit.
# 89. Workflow for your own idea
Start with a minimal working vertical slice, deploy it, then iterate. Avoid generating a huge architecture before the first usable version.
# 90. `README.md` as a project map
## Build
Document the exact build command.
## Run
Document local run command and required services/config.
## Test
Document the canonical test command.
# 91. `AGENTS.md`
Use AGENTS.md or similar to capture durable agent-facing project rules.
# Project rules
Keep rules concise and enforceable.
## Stack
State languages, frameworks and infrastructure.
## Commands
List build/test/lint/deploy commands.
## Rules
List constraints such as no new dependencies, required tests or forbidden generated-file edits.
# 92. `.gitignore`
Exclude build artifacts, local settings, secrets and dependency caches that should not be versioned.
# 93. Emmet
Speeds HTML/CSS authoring through abbreviations.
# 94. Snippets
Reusable templates for common code patterns. Keep custom snippets for genuinely repetitive structures.
# 95. Zen Mode
Hides interface clutter for focused editing.
# 96. Split Editor
View related files side by side, useful for implementation/test or source/config comparisons.
# 97. Breadcrumbs
Show current symbol/file hierarchy at the top of the editor.
# 98. Outline
Lists symbols/headings in the current file.
# 99. Minimap
Visual overview of long files. Disable it if it adds no value.
# 100. Autosave
Convenient, but be careful with tools that react immediately to file writes.
# 101. Hot reload
Framework/dev-server feature, not VS Code itself. The editor simply triggers/saves changes the tool watches.
# 102. VS Code + Go
Install the Go extension, use gopls, gofmt, `go test ./...` and Delve. Keep project commands standard.
# 103. VS Code + JavaScript / Node
Use built-in JS/TS language support plus project linters/formatters and npm scripts.
# 104. VS Code + Python
Select the correct interpreter/venv, use language tooling, formatter/linter and pytest/unittest integration.
# 105. VS Code as a server client
Remote SSH turns VS Code into a comfortable client for editing and running tools directly on servers.
# 106. Local development, Git deployment
Develop locally → commit/push → pull on server → build/restart using documented commands.
# 107. Local development, Docker deployment
Develop locally → build/test image → push registry or transfer → pull/recreate on server.
# 108. Source Control + AI - good combination
Let AI modify files, but use Git diff/staging to inspect exactly what changed.
# 109. Common beginner mistakes in VS Code
## Opening a single file instead of the project
You lose workspace context, project search, settings, tasks and Git awareness.
## Installing dozens of extensions
Creates conflicts and complexity.
## No Git
Without version control, experimenting with AI/refactors becomes unnecessarily risky.
## Blind Accept All
Review every non-trivial AI change.
## No tests
Without automated checks, agent/editor productivity can accelerate regressions.
# 110. Good prompt for first repository inspection
```text
Inspect this repository without changing files. Explain entry points, architecture, build/test commands, configuration and risky areas.
```
# 111. Good implementation prompt
```text
Implement FEATURE with minimal changes. Follow existing style. Do not add dependencies unless necessary. Add/update tests and run the canonical test command.
```
# 112. Good bug-fix prompt
```text
Reproduce or trace the bug first. Explain root cause. Make the smallest safe fix. Add a regression test. Run relevant checks.
```
# 113. Good refactoring prompt
```text
Refactor COMPONENT without changing external behavior. Keep public API stable. Run tests before and after and summarize structural changes.
```
# 114. Good code-review prompt
```text
Review this diff for correctness, security, regressions, maintainability and missing tests. Do not rewrite code unless asked.
```
# 115. When to use autocomplete
For local repetitive code and familiar patterns where you already know the intended result.
# 116. When to use chat
For explanations, small questions, code reading and scoped guidance.
# 117. When to use Plan
Before multi-file or architectural changes.
# 118. When to use Agent / Codex
For repository-wide implementation, debugging, tests or repetitive multi-step work that can be validated.
# 119. When it is better to work manually
Tiny obvious edits, sensitive production changes, or situations where explaining the task costs more than doing it.
# 120. Minimal extension set - example
Language extension for your primary stack, one formatter/linter integration, GitHub/remote tooling if needed, and one AI assistant. Add more only when justified.
# 121. Minimal settings - example
```json
{
  "editor.formatOnSave": true,
  "files.trimTrailingWhitespace": true,
  "editor.rulers": [100],
  "git.autofetch": true
}
```
# 122. Practical daily workflow
Pull → open project → check branch/status → work → run tests/lint → inspect diff → commit → push.
# 123. AI work model that makes sense
Inspect → plan → small edit → test → diff review → iterate → commit.
# 124. Most important AI coding rule
AI may type faster than you, but you remain responsible for the repository and the deployed result.
# 125. Cheat sheet - VS Code in 60 seconds
```text
Ctrl+P files
Ctrl+Shift+P commands
Ctrl+Shift+F project search
Ctrl+` terminal
F12 definition
Shift+F12 references
Source Control → diff/stage/commit
```
# 126. Cheat sheet - AI in 60 seconds
```text
Ask = explain
Plan = design work
Agent/Codex = execute multi-step task
Always: give constraints + tests + definition of done + inspect diff
```
# 127. Sources and further reading
Use official VS Code documentation, GitHub Copilot documentation, OpenAI Codex documentation and each language extension's official docs.
# 128. Summary
VS Code becomes powerful when you treat it as a project workspace: files + terminal + Git + debugger + tasks + language services + carefully scoped AI agents.
