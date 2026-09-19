# Visual Studio Code — Knowledge Handbook

## 1. What Visual Studio Code is

Visual Studio Code is a cross-platform code editor with extensions, integrated terminal, Git support, debugging, remote development and AI-assisted workflows.

## 2. Installation

Debian/Ubuntu commonly use Microsoft's package repository or downloaded .deb packages. Windows can use the official installer or winget. FreeBSD typically uses ports/packages or alternative builds where available.

## 3. Main interface areas

Activity Bar: switches major views.

Side Bar: Explorer, Search, Source Control, extensions and other views.

Editor: where files are edited.

Panel: terminal, problems, output and debug console.

Status Bar: language mode, branch, diagnostics and environment state.

## 4. Command Palette

Open with Ctrl+Shift+P. It is the fastest way to discover commands and actions.

## 5. Opening a project

Prefer opening the project directory rather than a single file:

```bash
code .
```

This gives VS Code full workspace context for search, Git, tasks, extensions and language tooling.

## 6. Workspace

A workspace is the project context opened in VS Code. Multi-root workspaces can include several directories.

## 7. Explorer and file operations

Use Explorer to create, rename, move and delete files/directories. For bulk or scripted work, shell commands may be faster.

## 8. Search

Current file: Ctrl+F.

Replace: Ctrl+H.

Whole project: Ctrl+Shift+F.

## 9. Quick Open

Ctrl+P lets you quickly open files by name.

## 10. Symbols and navigation

Go to Definition: F12.

Peek Definition: Alt+F12.

Find All References: Shift+F12.

Symbols in current file: Ctrl+Shift+O.

Symbols in workspace: Ctrl+T.

## 11. Editing

VS Code supports multi-cursor editing, column selections, line movement, duplicate line, comment toggling and automatic formatting.

Common shortcuts:

```text
Alt+Up/Down          move line
Shift+Alt+Up/Down    copy line
Ctrl+/               toggle line comment
Ctrl+D               select next occurrence
Alt+Click             add cursor
```

## 12. Formatting

Format Document through Command Palette or configured shortcut. Use the formatter defined by the project rather than installing several competing formatters.

## 13. settings.json

User settings apply globally. Workspace settings apply to one project.

Project settings usually live under:

```text
.vscode/settings.json
```

## 14. .vscode directory

Common files:

```text
settings.json
launch.json
tasks.json
extensions.json
```

Use it for project-specific editor configuration, not secrets.

## 15. Extensions

Install only what you actually need.

Typical categories: language support, linters, formatters, Git helpers, Docker tooling, remote development and AI assistants.

## 16. Profiles

Profiles let you keep separate extension/settings sets for different workflows such as web, Go, Python or minimal editing.

## 17. Integrated terminal

Open a terminal inside the workspace and run normal shell commands.

This is useful because editor context and shell working directory stay aligned.

## 18. Tasks

Tasks automate repeatable commands such as build, test, lint or deploy steps.

Example concept:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "test",
      "type": "shell",
      "command": "go test ./..."
    }
  ]
}
```

## 19. Git and Source Control

VS Code can stage files, create commits, inspect diffs, switch branches and interact with remotes.

Still learn the equivalent Git commands so the UI never becomes a black box.

## 20. Typical commit workflow

Inspect diff, stage intended files, write a meaningful commit message, commit and push.

## 21. Running code

Go:

```bash
go run .
go test ./...
```

Python:

```bash
python3 app.py
```

Node.js:

```bash
node app.js
npm run dev
npm test
```

## 22. Debugger

Set breakpoints, launch a debug configuration and use Step Over, Step Into, Step Out and Continue.

launch.json stores explicit debug configurations when defaults are not enough.

## 23. Problems panel

Shows diagnostics from language servers, compilers, linters and extensions.

## 24. IntelliSense

Provides completion, symbol information, signature help and code navigation when language tooling is available.

## 25. Refactoring

Prefer semantic operations such as Rename Symbol over raw text replacement when changing identifiers across a codebase.

## 26. Remote SSH

Remote SSH lets the local VS Code interface operate on files and tools on a remote machine.

Your SSH config remains the foundation:

```text
~/.ssh/config
```

## 27. Why Remote SSH is useful

You edit remote source with local UI while compilers, Git and runtime execute on the server. This is especially useful for VPS work.

## 28. Dev Containers

Development Containers let a project define a reproducible containerized development environment. Use them when the project benefits from consistent dependencies and tooling.

## 29. Docker

VS Code can inspect Docker resources through extensions, but Docker commands remain the source of truth.

## 30. Tests

Use project-native test commands and let extensions surface results where helpful.

## 31. Shortcuts worth knowing

```text
Ctrl+Shift+P  Command Palette
Ctrl+P        Quick Open
Ctrl+Shift+F  project search
F12           definition
Shift+F12     references
Ctrl+`        terminal
Ctrl+Shift+G  Source Control
```

## 32. Markdown

VS Code is a strong Markdown editor with preview, outline and extension support.

Use Markdown source as the canonical document, not the preview.

## 33. AI instruction files

Repositories can contain files such as README.md, CONTRIBUTING.md, AGENTS.md or tool-specific instruction files that explain build, test and project rules.

Good AI instructions state: stack, commands, constraints, definitions of done and files that must not be changed.

## 34. AI in VS Code — three levels

Autocomplete predicts code inline.

Chat answers questions or proposes changes.

Agent mode can inspect files, edit multiple files and run permitted commands.

## 35. GitHub Copilot

Copilot can provide inline completion, chat and agent-style coding assistance depending on the installed product/version and account capabilities.

## 36. Copilot Chat modes

Common concepts include Ask, Plan and Agent workflows.

Use Plan before Agent for larger changes so scope and validation steps are explicit.

## 37. Agent Mode

An agent can inspect repository context, modify files and run commands. Treat the resulting diff as code written by another developer: review it.

## 38. Cloud agents

Some coding agents can execute tasks in remote/cloud environments. Their workflow differs from local editor agents because they may work in separate branches or workspaces.

## 39. OpenAI Codex

Codex can be used as a coding agent through supported OpenAI integrations and development workflows. Exact editor integration and features may evolve, so follow current OpenAI documentation for setup.

## 40. VS Code as a center for multiple agents

You can use different assistants for completion, chat, code review or larger repository tasks. Avoid giving several agents overlapping write access at the same time.

## 41. Copilot or Codex?

Choose based on the actual task and integration available. The important skill is not brand-specific prompting but defining scope, tests, constraints and review.

## 42. How to instruct an agent

Good request:

```text
Inspect the repository first.
Implement only the requested feature.
Do not change public interfaces unless required.
Run tests and formatting.
Show me the diff and summarize risks.
```

## 43. Definition of Done

State what must be true when the task is finished: build passes, tests pass, behavior works, docs updated and no unrelated files changed.

## 44. Split large work into stages

Examples: inspect architecture, create plan, implement core change, add tests, run validation, review diff.

## 45. Agents should know project commands

Keep build/test commands in README or AGENTS.md so automation does not guess.

## 46. Do not trust AI blindly

Review every meaningful diff. AI can introduce security, logic, dependency and architecture problems while producing plausible-looking code.

## 47. Commit before larger AI changes

A clean Git state makes rollback and diff review much easier.

## 48. Branches and worktrees

Use a dedicated branch for larger agent tasks.

Git worktrees can isolate parallel work without duplicating the full repository.

## 49. Agent and terminal access

Be cautious with commands that install packages, delete files, rewrite Git history, deploy code or access production systems.

## 50. Secrets

Never paste production credentials into prompts or commit them into the repository. Use environment variables and secret stores.

## 51. MCP and external tools

Model Context Protocol integrations can give assistants structured access to external systems. Grant only the permissions required for the task.

## 52. Context

AI works better when it sees relevant files, architecture notes, errors, test commands and acceptance criteria instead of vague requests.

## 53. First inspect, then change

Strong workflow:

```text
inspect → explain → plan → edit → test → review diff
```

## 54. AI as a teacher

Ask it to explain unfamiliar functions, trace data flow, identify entry points and compare implementation options.

## 55. AI as reviewer/debugger

Give exact errors, failing tests and relevant code. Ask for root cause and validation rather than a random patch.

## 56. AI for documentation, refactoring and tests

These are excellent uses when the requested behavior and constraints are explicit. Always validate generated tests and docs against real code.

## 57. AI and dependencies

Do not add a dependency merely because an agent suggests it. Check project need, maintenance, license and security implications.

## 58. AI and architecture

Agents are useful for exploring trade-offs, but architecture decisions should remain explicit human decisions based on project goals.

## 59. Small-project workflow

```text
open repository
→ git status
→ read README/AGENTS
→ run tests
→ create branch
→ ask agent to inspect
→ plan
→ implement
→ run tests
→ review diff
→ commit
```

## 60. README as project map

A useful README explains build, run, test, configuration and deployment basics.

## 61. AGENTS.md

Useful content: stack, commands, conventions, forbidden changes, test expectations and repository structure.

## 62. .gitignore

Exclude generated files, local caches, secrets and editor-specific files where appropriate.

## 63. Emmet and snippets

Emmet speeds up HTML/CSS authoring. Snippets expand reusable code patterns.

## 64. Zen Mode, Split Editor, Breadcrumbs, Outline

These are UI tools for reducing distraction and navigating larger files/projects.

## 65. Autosave and hot reload

Autosave is optional. Hot reload comes from the development framework/tooling, not VS Code itself.

## 66. VS Code + Go

Use the Go extension/language server, gofmt, go test and debugger support.

## 67. VS Code + JavaScript / Node

Use built-in JS/TS intelligence plus project npm scripts, debugger and framework tooling.

## 68. VS Code + Python

Select the correct interpreter/virtual environment, then use Python tooling for linting, tests and debugging.

## 69. VS Code as server client

Remote SSH is ideal when code must live/run on a VPS while you want a rich local editor.

## 70. Deployment workflows

Local development + Git deployment: commit locally, pull/build on server.

Local development + Docker: build/test image locally or in CI, push image, pull/restart on server.

## 71. Source Control + AI

Git gives you the safety net AI needs: small diffs, rollback, branches and reviewable commits.

## 72. Common beginner mistakes

Opening one file instead of the project, installing too many extensions, ignoring Git, accepting every AI change, and working without tests.

## 73. Prompt — learn a repository

```text
Inspect this repository without changing files.
Identify entry points, architecture, build/test commands, configuration and risky areas.
Explain how a request flows through the application.
```

## 74. Prompt — implement

```text
Implement FEATURE with minimal changes.
First inspect the relevant code.
Preserve existing public behavior.
Add/update tests.
Run the documented test/build commands.
Summarize changed files and remaining risks.
```

## 75. Prompt — fix a bug

```text
Reproduce or trace this failure first.
Explain the root cause before editing.
Make the smallest safe fix.
Add a regression test and run the relevant suite.
```

## 76. Prompt — refactor

```text
Refactor this area without changing external behavior.
Keep changes small and testable.
Do not introduce new dependencies unless necessary.
Run tests and show the diff.
```

## 77. Prompt — code review

```text
Review this diff for correctness, security, maintainability and missing tests.
Prioritize concrete issues by impact.
Do not rewrite code unless asked.
```

## 78. When to use autocomplete

Small local code completion where intent is already clear.

## 79. When to use chat

Explanation, exploration, debugging hypotheses and small edits.

## 80. When to use Plan

Multi-file changes, migrations, architecture work and anything with several dependent steps.

## 81. When to use Agent/Codex

Repository-wide work with a clear scope, commands and acceptance criteria.

## 82. When to work manually

Sensitive production actions, tiny obvious edits, tasks where explaining intent to an agent costs more than doing the work, and changes you do not yet understand well enough to review.

## 83. Minimal extension set

Install language tooling for the languages you actively use, Git/remote tooling you need, and at most one main AI assistant workflow at a time.

## 84. Minimal settings principle

Start from defaults and change settings only when a real need appears. Keep project-specific behavior in workspace configuration.

## 85. Daily workflow

```text
open workspace
→ git status
→ pull
→ run/inspect tests
→ edit
→ test
→ review diff
→ commit
→ push
```

## 86. Sensible AI coding model

Human defines the problem and verifies the result. AI accelerates inspection, implementation and explanation. Git and tests provide control.

## 87. Most important AI coding rule

Never accept code you cannot review well enough to own.

## 88. VS Code in 60 seconds

```text
Ctrl+Shift+P  commands
Ctrl+P        files
Ctrl+Shift+F  search
Ctrl+`        terminal
F12           definition
Shift+F12     references
Source Control for diff/commit
```

## 89. AI in 60 seconds

```text
give context
define scope
state commands/tests
ask for plan on larger work
let agent edit
review diff
run tests
commit only understood changes
```

## 90. Sources and further reading

VS Code documentation: https://code.visualstudio.com/docs/

GitHub Copilot documentation: https://docs.github.com/en/copilot/

OpenAI developer documentation: consult current OpenAI documentation for Codex/editor integration details.

## 91. Summary

VS Code is most useful when treated as a project workspace rather than a fancy text editor: editor + terminal + Git + debugger + language tools + remote access + carefully controlled AI assistance.
