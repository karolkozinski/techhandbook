---
id: "doc-001"
title: "Hermes Agent - User Handbook"
slug: "hermes-agent-user-handbook"
description: "Hermes is an AI-agent environment that can combine model access, shell tools, files, memory, profiles, gateways and messaging integrations."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "ai"
  - "hermes"
  - "agent"
---

# Hermes Agent - User Handbook

Hermes Agent combines an AI model with shell tools, files, skills, memory, cron and messaging channels. The safest rollout is to get ordinary CLI/chat working first, then add the gateway, Signal, cron, browser automation and broader permissions.

The official installation path covers Linux, macOS, WSL2 and Android/Termux. FreeBSD is not listed as a primary host, so this handbook treats it mainly as a system managed over SSH.

Related topics: [AI Prompting](techhandbook:doc-002), [SSH and Remote Administration](techhandbook:doc-018), [Debian Desktop and Server](techhandbook:doc-033), [FreeBSD as a Server](techhandbook:doc-034) and [Documenting Technical Solutions](techhandbook:doc-056).

## Debian as host, FreeBSD as host/managed machine
# 1. What Hermes Agent is
Hermes is an AI-agent environment that can combine model access, shell tools, files, memory, profiles, gateways and messaging integrations.
# 2. Most important decision: where to run Hermes
## Debian
Best default host because Linux tooling, Python, Docker, systemd and VPS support are straightforward.
## FreeBSD
Excellent managed target over SSH; native Hermes hosting may be more experimental depending on upstream support.
### Recommendation
Run the main agent/gateway on Debian and manage FreeBSD remotely over SSH.
# 3. Minimal home / VPS architecture
```text
Signal / CLI / Web UI
        ↓
Hermes gateway
        ↓
model provider
        ↓
local shell / SSH / tools
```
# 4. Installing on Debian
## 4.1. Minimum requirements
A small VPS can be enough when using hosted models; browser automation needs more RAM/disk than pure shell/chat use.
# 5. Installing Hermes
Follow the current upstream install procedure and keep the installation/version explicit.
# 6. Post-install diagnostics
Verify binary, config, provider credentials, network access, shell tools and gateway startup.
# 7. First run
Start with CLI interaction before adding Signal, browser automation, cron and multiple profiles.
# 8. Configuration
Separate normal configuration from secrets and version reusable templates where practical.
# 9. `~/.hermes` directory
Stores configuration, memory/session data, profiles and local state.
# 10. `config.yaml`
Use for provider/model defaults, tools, gateway behavior and non-secret settings.
# 11. `.env`
Use for secrets where supported; lock file permissions and never commit it.
# 12. Provider and model
Provider is the API/backend; model is the concrete LLM selected for a task.
# 13. `hermes model` vs `/model`
## Outside a session
CLI/config selection changes defaults for future sessions.
## In conversation
Slash commands can change the active model for the current session when supported.
# 14. OpenRouter
Useful as a multi-provider gateway with broad model choice and fallback possibilities.
# 15. OpenAI
Direct provider option when supported; keep API keys in protected secret storage.
# 16. Model strategy
Use fast/cheap models for routine tasks and stronger models for complex coding/reasoning.
# 17. Model fallback
Fallback improves resilience but should be logged so behavior/cost changes are visible.
# 18. Mixture of Agents
Use multiple agents/models only when parallel work or independent review justifies extra cost and complexity.
# 19. Terminal - the agent's most important capability
Shell access lets Hermes inspect files, run tests, build software and administer systems.
# 20. Be careful with permissions
Do not run permanently as root. Grant the minimum rights needed for the intended workflows.
# 21. Local terminal vs sandbox
Local shell changes the real host; sandboxed execution reduces blast radius.
# 22. Docker
Useful on Debian for isolated dev/test environments; not a substitute for strict privilege boundaries.
# 23. SSH - main way to work with FreeBSD
Use dedicated SSH keys/users from the Debian Hermes host to FreeBSD targets.
# 24. `~/.ssh/config`
```text
Host homeserver
    HostName 192.0.2.10
    User hermes
    IdentityFile ~/.ssh/id_ed25519_hermes
```
# 25. Detecting Debian and FreeBSD
```bash
uname -s
cat /etc/os-release 2>/dev/null || true
freebsd-version 2>/dev/null || true
```
# 26. Debian vs FreeBSD differences the agent should know
## Packages
Debian: apt/dpkg. FreeBSD: pkg/Ports.
## Services
Debian: systemd/systemctl. FreeBSD: rc.d/service/sysrc.
## Logs
Debian commonly uses journald/journalctl; FreeBSD commonly uses files under `/var/log` plus syslog.
# 27. Project instructions for Hermes
Keep repository-specific build/test/style rules in files the agent can read.
# 28. Example `AGENTS.md`
# Project
Short project description and scope.
## Build
```bash
go build ./...
```
## Test
```bash
go test ./...
```
## Frontend
Document framework or plain HTML/CSS/JS expectations.
## Rules
No secrets, no unrelated changes, run tests, preserve public APIs unless task requires change.
# 29. `SOUL.md`
Persona/identity file; keep personality separate from operational/security rules.
# Identity
Describe stable tone/identity without embedding credentials or authority escalation.
# 30. `USER.md`
Stable user preferences and working conventions.
# 31. `MEMORY.md`
Durable useful context, not a dump of every session.
# 32. Memory vs session history
Session history is temporary conversation context; memory is selected durable knowledge.
# 33. Important memory property
Bad memory can create persistent mistakes, so stored facts should be concise and verified.
# 34. Controlling memory writes
Decide what the agent may retain, especially personal data, credentials and temporary project state.
# 35. Skills
Reusable procedures/tool instructions for recurring tasks.
# 36. Why skills matter
They turn repeated prompting into consistent documented workflows.
# 37. Skills and secrets
Reference secret locations, never embed secret values inside reusable skill files.
# 38. Cron - automation
Use schedules for recurring deterministic or agent-assisted work. Make jobs idempotent and observable.
# 39. Tasks without an AI model
If a task is deterministic, prefer a normal shell/Python/Go script.
# 40. Quick commands
Wrap frequent safe workflows in short documented commands.
# 41. Signal
Can serve as a remote conversational/control interface.
# 42. Signal - requirements
Working Signal account/number plus the gateway/integration required by your Hermes version.
# 43. Signal - Hermes configuration
Keep account identifiers and gateway settings outside public repositories.
# 44. Signal - example variables
```env
SIGNAL_ACCOUNT=...
SIGNAL_ALLOWED_SENDER=...
```
# 45. Signal - security
Treat incoming messages as remote commands. Restrict authorized senders and dangerous actions.
# 46. Running the gateway
Run under a dedicated user and collect logs.
# 47. Gateway as a Debian service
Use systemd user/system unit depending deployment model.
# 48. User services and linger
```bash
loginctl enable-linger USER
systemctl --user enable --now SERVICE
```
# 49. FreeBSD and gateway
Keep gateway on Debian if native FreeBSD support is awkward; control FreeBSD over SSH.
# 50. `hermes send`
Use message-sending CLI for scripted notifications where supported.
# 51. Example usage in a script
```bash
if backup-command; then
  hermes send "Backup completed"
else
  hermes send "Backup failed"
fi
```
# 52. Browser / Chromium
Browser automation enables GUI/web tasks but consumes more resources and expands attack surface.
# 53. When a browser is needed
Use only when API/CLI/direct HTTP cannot perform the task reliably.
# 54. Updating Hermes
Read release notes, back up config/state and update in a controlled window.
# 55. Backup
Back up config, memory and custom skills; exclude disposable caches.
# 56. Encrypted backup
Encrypt backups containing sensitive agent state and store keys separately.
# 57. Logs
Record gateway starts, provider/tool errors and important actions without leaking secrets.
# 58. Useful shell tools for Hermes administration
```text
ssh
tmux
git
curl
jq
rsync
systemctl
journalctl
pkg
service
sysrc
```
# 59. Profiles
Separate roles, model policies, repositories or environments.
# 60. Why profiles
Avoid mixing context/secrets between independent agent purposes.
# 61. Creating a profile
Use the profile mechanism supported by your Hermes version and keep profile state separate where isolation matters.
# 62. Do not share one `HERMES_HOME` among independent agents
Shared state can leak sessions, memory and credentials or corrupt concurrent state.
# 63. Sessions
Use one session for one coherent task/thread.
# 64. When to start a new session
When context becomes irrelevant, contradictory or too large.
# 65. Checkpoints
Before risky actions create a Git commit, filesystem snapshot or explicit backup.
# 66. Git + Hermes
Git is the primary safety net for agent coding: small diffs, review, reversible commits.
# 67. Repository permissions
Grant write access only to repositories the agent must modify.
# 68. Project secrets
Use environment variables, protected files or a secret manager.
# 69. Prompt injection
Treat webpages, emails and documents as untrusted data that may contain malicious instructions.
# 70. Destructive commands
Guard rm -rf, formatting, database deletion, firewall changes and history rewrites with explicit confirmation/checkpoints.
# 71. FreeBSD + ZFS
Use ZFS snapshots/boot environments as rollback aids; remember snapshots are not independent backups.
# 72. Example workflow: inspect FreeBSD
```text
SSH → freebsd-version → uptime → zpool status → df -h → service status → sockstat → logs
```
# 73. Example workflow: deploy Go application
```text
update source/artifact → build/test → config check → restart service → local health check → external check
```
# 74. Example workflow: monitoring
Use deterministic checks and let Hermes summarize/notify only when useful.
# 75. Example workflow: error analysis
Inspect logs, config and recent changes before editing.
# 76. Good prompt for an agent
```text
Inspect first. Do not change anything yet.
Explain root cause and proposed steps.
Then make the smallest safe change.
Run tests/checks and report results.
```
# 77. Autonomy modes
## Level 1 - analysis only
Read/inspect, no modifications.
## Level 2 - limited action
Narrow, explicit write/command permissions.
## Level 3 - autonomous execution
Only for well-defined, low-risk, observable and reversible workflows.
# 78. WebUI
Optional. CLI/Signal are enough for a first deployment.
# 79. What to launch first
One provider/model, CLI, one profile, SSH and one communication channel.
# 80. What NOT to do on day one
Do not add browser automation, many models, broad sudo and production write access simultaneously.
# 81. Suggested VPS layout
```text
/home/hermes/.hermes
/home/hermes/projects
/home/hermes/.ssh
journald / log files
```
# 82. Suggested dedicated user
Create a normal Unix account specifically for Hermes.
# 83. Controlled sudo
Allow only explicit required commands, not unrestricted NOPASSWD root.
# 84. Firewall
Expose only required gateway/UI ports, preferably behind VPN/reverse proxy as appropriate.
# 85. SSH from Hermes to FreeBSD - security
Dedicated key, dedicated account, limited sudo/doas and network restrictions.
# 86. FreeBSD - user for the agent
Grant only groups/filesystem permissions required for its tasks.
# 87. FreeBSD - sudo/doas
Use tightly scoped privilege rules.
# 88. Native Hermes on FreeBSD - experimental
Treat as experimental unless upstream explicitly supports your FreeBSD version.
# 89. Debian VM on FreeBSD
A Debian VM is a clean compatibility boundary when Linux-only dependencies are required.
# 90. Monitoring Hermes itself
Monitor process health, restart count, disk usage, provider errors and message-gateway connectivity.
# 91. Watchdog
Prefer systemd restart policies or external monitoring over a second uncontrolled agent.
# 92. System updates
Patch the host regularly, separating OS maintenance from application changes.
# 93. Do not let the agent blindly update production
Require plan, checkpoint and post-update validation.
# 94. Agent as administrator
Strong at gathering state, running known procedures and summarizing.
# 95. Agent as developer
Strong when repository instructions, tests and Git workflow are clear.
# 96. Agent as server operator
Use runbooks; avoid improvisational root access.
# 97. Most important slash commands
Exact commands vary by version; commonly model/session/profile/memory controls.
# 98. Most important administrative CLI commands
Keep a local cheat sheet aligned with your installed Hermes version.
# 99. Diagnostics - first set
```bash
command -v hermes
hermes --help
env | grep -E 'HERMES|OPENAI|OPENROUTER'
```
# 100. Signal does not work - checklist
Gateway process, account/session, allowed sender, network, config and logs.
# 101. SSH to FreeBSD does not work - checklist
DNS/IP, route, port 22, sshd, key permissions, remote user and firewall.
# 102. Hermes uses the wrong system command
Detect OS explicitly and document Debian/FreeBSD command differences in runbooks.
# 103. Separate infrastructure repository
Store scripts, service units, runbooks and host notes in a private infra repo when useful.
# 104. `hosts.md`
# Hosts
Document aliases and purpose, not passwords.
## vps
Debian VPS running Hermes/public services.
## homeserver
FreeBSD home server/storage.
## router
Network edge; no broad agent write access.
# 105. Procedures instead of improvisation
Turn repeated administration into scripts/runbooks.
# 106. API keys
Scope narrowly, rotate, never expose in logs/prompts.
# 107. Model costs
Track spend; use cheap models for routine tasks and stronger ones selectively.
# 108. Tokens and long sessions
Long context costs more and can dilute relevance; start fresh when task changes.
# 109. When to use subagents
Clearly separable parallel work, independent review or research branches.
# 110. Minimal production configuration
Dedicated user, explicit provider/model, protected secrets, SSH keys, controlled sudo, service supervision, logs, backups and monitoring.
# 111. Sensible work model
```text
human goal → inspect → plan → controlled execution → validation → Git/log record
```
# 112. What to store where
```text
config → ~/.hermes / templates
secrets → protected env/secret store
projects → Git repos
runbooks → docs/repo
host access → ~/.ssh
logs → journald/files
```
# 113. Commands - cheat sheet
## Installation
follow current upstream install command.
## Diagnostics
hermes --help + provider/env checks.
## Start
start CLI/gateway according to installed version.
## Configuration
edit config.yaml / protected env.
## Gateway
service/systemd user unit.
## Sessions
list/new/switch according to version.
## Profiles
create/select profile.
## Memory
inspect/update memory policy.
## Message
hermes send where supported.
# 114. FreeBSD - cheat sheet for Hermes
## System
```sh
freebsd-version
uptime
```
## Packages
```sh
pkg update
pkg upgrade
```
## Services
```sh
service NAME status
```
## Enable
```sh
sysrc NAME_enable=YES
```
## Network
```sh
ifconfig
netstat -rn
sockstat -4 -6 -l
```
## Disks
```sh
df -h
gpart show
```
## ZFS
```sh
zpool status
zfs list
```
# 115. Debian - cheat sheet for Hermes
## System
```bash
cat /etc/os-release
uptime
```
## Packages
```bash
sudo apt update
sudo apt upgrade
```
## Services
```bash
systemctl status NAME
```
## Logs
```bash
journalctl -u NAME
```
## Network
```bash
ip addr
ip route
ss -lntup
```
## Resources
```bash
df -h
free -h
top
```
# 116. How to teach your own Hermes
Give concise project instructions, host runbooks, examples of good changes and clear definitions of done.
# 117. Most important rule
Do not grant an autonomous agent more power than you can audit and recover from.
# 118. Recommended Debian + FreeBSD architecture
```text
Debian VPS: Hermes + gateway + Signal + model access
        ↓ SSH
FreeBSD: storage/services managed by limited account
```
# 119. First day - concrete checklist
Install Hermes, configure one provider/model, create dedicated user, verify CLI, configure SSH, set up one communication channel, create backup, test one harmless workflow.
# 120. Second stage
Add systemd gateway, profiles, memory policy, notifications and repository workflows.
# 121. Third stage
Only then add browser automation, cron, multiple models, wider host access or autonomous procedures.
# 122. Useful sources
Current Hermes upstream docs/repository, model-provider docs, Debian docs and FreeBSD Handbook.
# 123. TL;DR
Run Hermes on Debian for simplicity, manage FreeBSD over SSH, use dedicated users/limited privileges/Git/backups/runbooks, and increase autonomy gradually.
