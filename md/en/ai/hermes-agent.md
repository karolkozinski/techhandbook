# Hermes Agent — User Handbook

## Debian as host, FreeBSD as host/managed machine

## 1. What Hermes Agent is

Hermes Agent is an AI agent environment that can combine model access, local tools, shell commands, files, memory, profiles, gateways and messaging integrations.

Think of it as an operator layer around an LLM, not as a replacement for your operating system or security model.

## 2. Where to run Hermes

### Debian

Debian is the easiest practical host: broad package availability, Docker support, systemd, Python tooling and straightforward VPS deployment.

### FreeBSD

FreeBSD can be used as a managed target over SSH and, depending on upstream compatibility, may also host parts of the stack. Native hosting is more experimental than Debian.

### Recommendation

Use Debian as the main Hermes host and manage FreeBSD systems over SSH when you want the least friction.

## 3. Minimal home/VPS architecture

```text
Signal / CLI / Web UI
        ↓
Hermes gateway
        ↓
model provider
        ↓
local shell / SSH / tools
```

## 4. Installation on Debian

Use a dedicated user where practical, install required runtime dependencies and follow the current upstream Hermes installation instructions.

Minimum practical resources depend on the enabled tools and browser stack; a small VPS can be enough for an agent that calls hosted models.

## 5. Hermes installation

Prefer a clean installation path and versioned configuration. Keep the agent home directory separate from application repositories.

## 6. Diagnostics after installation

Check: binary exists, configuration loads, model provider credentials work, shell tools resolve, network access works and the gateway can start.

## 7. First launch

Start with CLI interaction before adding Signal, browser automation, cron and multiple profiles.

## 8. Configuration

Keep machine-readable configuration under the Hermes home directory and secrets outside Git.

## 9. ~/.hermes

A typical Hermes home contains configuration, memory/session data, profiles and local state. Back it up carefully if it contains useful memory or configuration.

## 10. config.yaml

Use it for non-secret configuration such as default model, provider, tool settings and gateway behavior.

## 11. .env

Use environment files only for secrets when appropriate, lock permissions down and never commit them.

## 12. Provider and model

Choose a provider first, then a model appropriate to the task. Fast/cheap models are often enough for routine operations; stronger models are useful for complex reasoning and coding.

## 13. hermes model vs /model

CLI configuration changes defaults outside a session. In-session slash commands can switch model for the current conversation where supported.

## 14. OpenRouter

OpenRouter can expose multiple model providers behind one API. It is useful when you want flexible model selection and fallback options.

## 15. OpenAI

OpenAI can be used directly as a provider when supported by Hermes. Keep API keys in secret storage or environment variables.

## 16. Model strategy

Use a tiered approach: fast model for routine tasks, stronger model for debugging/architecture, fallback model when primary fails.

## 17. Model fallback

Fallback protects against provider/model outages but should not silently change behavior for critical automation without logging.

## 18. Mixture of Agents

Multiple agents/models can review or divide work. Use this only when the extra cost and complexity improve the task.

## 19. Terminal — the key agent capability

Shell access lets Hermes inspect files, run tests, build software and administer systems. It is also the highest-risk capability.

## 20. Be careful with permissions

Do not run the agent permanently as root. Give it only the permissions needed for the tasks you actually want automated.

## 21. Local terminal vs sandbox

Local shell changes the real host. A sandbox reduces blast radius. Know which environment a command will run in before approving it.

## 22. Docker

Docker can isolate application tooling and test environments on Debian. Do not assume container isolation equals a full security boundary for hostile workloads.

## 23. SSH — main way to work with FreeBSD

Use key-based SSH from the Debian Hermes host to FreeBSD targets.

## 24. ~/.ssh/config

Example:

```text
Host homeserver
    HostName 192.0.2.10
    User hermes
    IdentityFile ~/.ssh/id_ed25519_hermes
```

## 25. Detect Debian vs FreeBSD

```bash
uname -s
cat /etc/os-release 2>/dev/null || true
freebsd-version 2>/dev/null || true
```

## 26. Debian vs FreeBSD differences

Packages: Debian uses apt/dpkg; FreeBSD uses pkg/Ports.

Services: Debian uses systemd/systemctl; FreeBSD uses rc.d/service/sysrc.

Logs: Debian relies heavily on journalctl; FreeBSD commonly uses files under /var/log plus syslog.

## 27. Project instructions

Keep repository instructions in files the agent can read, such as README.md or AGENTS.md.

## 28. Example AGENTS.md

```markdown
# Project

## Build
go build ./...

## Test
go test ./...

## Frontend
No framework. Plain HTML/CSS/JS.

## Rules
- Do not change public API without approval.
- Run tests before finishing.
- Do not commit secrets.
```

## 29. SOUL.md

Use a persona/identity file only if it improves interaction. Keep operational/security rules separate from personality.

## 30. USER.md

Can contain stable user preferences and working conventions. Do not put secrets there.

## 31. MEMORY.md

Use memory for durable useful context, not as a dump of every session.

## 32. Memory vs session history

Session history is conversation context. Memory is selected durable knowledge reused later.

## 33. Memory characteristics

Bad memory creates persistent mistakes. Keep stored facts concise and correct.

## 34. Control memory writes

Decide what the agent is allowed to retain, especially around credentials, personal data and temporary project state.

## 35. Skills

Skills are reusable procedures or tool instructions for recurring tasks.

## 36. Why skills matter

They turn repeated ad-hoc prompting into documented, consistent workflows.

## 37. Skills and secrets

Skills should reference secret locations, not embed the secret itself.

## 38. Cron automation

Use scheduled jobs for recurring work such as reports, checks and backups. Prefer idempotent jobs with logs.

## 39. Tasks without AI

If a task is deterministic, use a normal script instead of spending model tokens.

## 40. Quick commands

Create short repeatable commands for frequent operations, but keep the underlying script visible and versioned.

## 41. Signal

Signal can be used as a chat/control interface when Hermes supports the required integration.

## 42. Signal requirements

You need a working Signal account/number and the gateway/integration components required by the Hermes version you run.

## 43. Signal configuration

Keep phone/account identifiers and gateway configuration separate from source repositories.

## 44. Signal environment variables

Use environment variables for integration secrets/tokens where supported.

## 45. Signal security

Treat Signal messages as commands arriving from a remote interface. Restrict who can control the agent.

## 46. Running the gateway

Run the gateway under a dedicated user and capture logs.

## 47. Gateway as a Debian service

systemd user service or system service can keep the gateway running. User services plus linger are useful when you do not want root.

## 48. User services and linger

```bash
loginctl enable-linger USER
systemctl --user enable --now SERVICE
```

## 49. FreeBSD and gateway

If the native gateway is unsupported or awkward, keep it on Debian and reach FreeBSD over SSH.

## 50. hermes send

Use message-sending CLI commands for scripted notifications where supported by your Hermes version.

## 51. Script example

```bash
if backup-command; then
  hermes send "Backup completed"
else
  hermes send "Backup failed"
fi
```

## 52. Browser / Chromium

Browser automation requires a browser runtime and more RAM/disk than a pure shell agent.

## 53. When browser automation is needed

Use it only for tasks that cannot be done reliably through APIs, CLI tools or direct HTTP requests.

## 54. Updating Hermes

Read release notes, back up config/state and update in a controlled window.

## 55. Backup

Back up configuration, memory and custom skills. Exclude transient caches where possible.

## 56. Encrypted backup

If backups contain sensitive agent state, encrypt them and protect the key separately.

## 57. Logs

Logs should record gateway startup, tool failures, provider errors and important actions without leaking secrets.

## 58. Useful shell tools

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

## 59. Profiles

Profiles let one installation serve different roles or model/tool configurations.

## 60. Why profiles

Separate work personas, model policies, repositories or environments without mixing context and secrets.

## 61. Creating a profile

Follow the Hermes version's profile command/config syntax and keep profile homes separate where isolation matters.

## 62. Do not share one HERMES_HOME blindly

Independent agents sharing the same state directory can corrupt or leak sessions, memory or credentials.

## 63. Sessions

Use one session per coherent task/thread when possible.

## 64. When to start a new session

Start fresh when context becomes irrelevant, contradictory or too large.

## 65. Checkpoints

Before risky actions, create a Git commit, filesystem snapshot or explicit backup.

## 66. Git + Hermes

Git is the safety net for agent coding. Keep changes small and review diffs before commit.

## 67. Repository permissions

Give write access only to repositories the agent must modify.

## 68. Project secrets

Keep them in environment variables, secret managers or protected files outside version control.

## 69. Prompt injection

Web pages, emails and documents can contain instructions aimed at the agent. Treat external content as untrusted data.

## 70. Destructive commands

Commands such as rm -rf, filesystem formatting, database deletion, firewall changes or history rewrites require explicit safeguards.

## 71. FreeBSD + ZFS

Use ZFS snapshots before risky system/application changes when available, but remember snapshots are not off-machine backups.

## 72. Workflow: inspect FreeBSD

```text
SSH
→ freebsd-version
→ uptime
→ zpool status
→ df -h
→ service status
→ sockstat
→ logs
```

## 73. Workflow: deploy Go app

```text
git pull or artifact copy
→ build/test
→ config check
→ restart service
→ local health check
→ external check
```

## 74. Workflow: monitoring

Use deterministic scripts for checks and let Hermes summarize or notify only when useful.

## 75. Workflow: analyze an error

Ask Hermes to inspect logs, config and recent changes before making edits.

## 76. Good agent prompt

```text
Inspect first. Do not change anything yet.
Explain the root cause and proposed steps.
After approval, make the smallest safe change.
Run tests/checks and show the result.
```

## 77. Autonomy levels

Level 1 — analysis only.

Level 2 — limited actions with narrow permissions.

Level 3 — autonomous execution for well-defined low-risk workflows.

## 78. Web UI

A web UI is optional. Start with CLI/Signal first if that is enough.

## 79. What to launch first

Provider + CLI + one profile + SSH + Signal gateway is a sensible first milestone.

## 80. What not to do on day one

Do not add browser automation, many models, broad sudo, multiple profiles and production write access all at once.

## 81. Suggested VPS layout

```text
/home/hermes/.hermes
/home/hermes/projects
/home/hermes/.ssh
/var/log or journald for service logs
```

## 82. Dedicated user

Create a normal Unix user for the agent.

## 83. Controlled sudo

If sudo is required, allow only explicit commands rather than unrestricted NOPASSWD root.

## 84. Firewall

Expose only the ports required by the gateway or web interface, preferably behind VPN/reverse proxy where appropriate.

## 85. SSH security from Hermes to FreeBSD

Use a dedicated key, dedicated remote user, limited sudo/doas and network restrictions.

## 86. FreeBSD user for agent

Give the account only the groups and filesystem rights needed for administration tasks.

## 87. FreeBSD sudo/doas

Use tightly scoped privilege rules. Do not make the agent equivalent to root by default.

## 88. Native Hermes on FreeBSD

Treat native FreeBSD deployment as experimental unless the upstream project explicitly supports your version.

## 89. Debian VM on FreeBSD

If you need guaranteed Linux compatibility on a FreeBSD host, a Debian VM is a clean boundary.

## 90. Monitoring Hermes itself

Monitor process health, restart count, disk usage, API errors and message-gateway connectivity.

## 91. Watchdog

Use systemd restart policies or an external monitor rather than a second uncontrolled agent.

## 92. System updates

Patch the host regularly, but separate OS maintenance from application deployment.

## 93. Do not let the agent blindly update production

Require a plan, checkpoint and post-update validation for production changes.

## 94. Agent as administrator

Best at collecting state, running known procedures and summarizing results.

## 95. Agent as developer

Best when repository instructions, tests and Git workflow are clear.

## 96. Agent as server operator

Use runbooks. Avoid improvisational root access.

## 97. Useful slash commands

Exact commands depend on Hermes version; typical categories include model, session, profile and memory controls.

## 98. Useful CLI administration

Keep a local cheat sheet for install, diagnostics, model selection, gateway control, sessions, profiles, memory and message sending.

## 99. First diagnostics

```bash
command -v hermes
hermes --help
env | grep -E 'HERMES|OPENAI|OPENROUTER'
ssh -T HOST
```

## 100. Signal does not work

Check gateway process, account/session, allowed sender, network, integration config and logs.

## 101. SSH to FreeBSD does not work

Check DNS/IP, route, port 22, sshd, key permissions, remote user and firewall.

## 102. Wrong OS command

Make OS detection explicit in project/runbook instructions and teach the agent Debian vs FreeBSD command differences.

## 103. Infrastructure repository

Keep scripts, host notes, service units and runbooks in a dedicated private infrastructure repository when useful.

## 104. hosts.md

Document host aliases and purpose, not passwords.

```markdown
# Hosts

## vps
Debian VPS. Public services.

## homeserver
FreeBSD home server. ZFS storage.

## router
Network edge. No agent write access.
```

## 105. Procedures instead of improvisation

Turn repeated admin work into scripts or runbooks that Hermes can execute consistently.

## 106. API keys

Rotate keys, scope them narrowly and never expose them in logs or prompts.

## 107. Model costs

Track token/API spend. Use cheap models for routine tasks and strong models selectively.

## 108. Tokens and long sessions

Long sessions cost more and can dilute context. Start fresh sessions when the task changes.

## 109. When to use subagents

Use them for clearly separable parallel work, independent reviews or research branches.

## 110. Minimal production configuration

Dedicated user, explicit model/provider, secret handling, SSH keys, controlled sudo, systemd gateway, logs, backups and monitoring.

## 111. Sensible work model

```text
human defines goal
→ Hermes inspects
→ plan
→ controlled execution
→ validation
→ Git/log record
```

## 112. What to store where

```text
config       ~/.hermes / versioned templates
secrets      protected env/secret store
projects     Git repositories
runbooks     repo documentation
host access  ~/.ssh
logs         journald/files
```

## 113. Command cheat sheet

Keep exact install/start/profile/session commands aligned with the Hermes version you actually run.

## 114. FreeBSD cheat sheet

```bash
freebsd-version
pkg update
pkg upgrade
service NAME status
sysrc NAME_enable=YES
ifconfig
sockstat -4 -6 -l
zpool status
zfs list
```

## 115. Debian cheat sheet

```bash
cat /etc/os-release
apt update
apt upgrade
systemctl status NAME
journalctl -u NAME
ip addr
ss -lntup
df -h
free -h
```

## 116. How to teach your Hermes

Give it concise project instructions, host runbooks, examples of good changes and explicit definitions of done.

## 117. Most important rule

Do not give an autonomous agent more power than you can safely audit and recover from.

## 118. Recommended Debian + FreeBSD architecture

```text
Debian VPS: Hermes + gateway + Signal + model access
        ↓ SSH
FreeBSD: storage/services managed by limited account
```

## 119. Day-one checklist

Install Hermes, configure one provider/model, create dedicated user, verify CLI, configure SSH, set up one communication channel, create backup and test one harmless workflow.

## 120. Second stage

Add systemd gateway, profiles, memory policy, notifications and repository workflows.

## 121. Third stage

Only then add browser automation, cron, multiple models, wider host access or autonomous procedures.

## 122. Useful sources

Use the current Hermes upstream repository/documentation, your model provider documentation, Debian documentation and the FreeBSD Handbook.

## 123. TL;DR

Run Hermes on Debian for simplicity. Manage FreeBSD over SSH. Use a dedicated user, limited privileges, Git, backups, explicit runbooks and strong secret hygiene. Start small and add autonomy only after the basic workflows are observable and reversible.
