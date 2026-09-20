---
id: "doc-002"
title: "AI Prompting — Practical Handbook"
slug: "ai-prompting-practical-handbook"
description: "A prompt is the instruction and context given to an AI model."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "ai"
  - "prompt"
  - "prompting"
  - "llm"
---

# AI Prompting — Practical Handbook

Good prompting starts with a clear goal, relevant context, constraints and the expected result. As models and agents gain the ability to take actions, success criteria, stop rules and verification become increasingly important.

Modern models often respond better to shorter outcome-oriented instructions than to elaborate prompting rituals. Iterate from observed results instead of copying a rigid "magic" template.

Related topics: [Hermes Agent](techhandbook:doc-001), [Documenting Technical Solutions](techhandbook:doc-056), [Visual Studio Code](techhandbook:doc-039) and [Software Testing](techhandbook:doc-049).

## 1. What a prompt is

A prompt is the instruction and context given to an AI model.

It can include:

- the task,
- background context,
- constraints,
- examples,
- desired output format,
- files or data,
- acceptance criteria.

## 2. Most important rule

Tell the model clearly what success looks like.

Weak:

```text
Fix this.
```

Better:

```text
Find the cause of this error, explain it briefly, make the smallest safe fix, and show how to verify the result.
```

## 3. Context

Useful context includes:

- project purpose,
- relevant files,
- current behavior,
- expected behavior,
- environment,
- error messages,
- constraints.

Give enough context to reduce guessing.

## 4. Define the level

State the expected depth:

```text
Explain for a beginner.
```

or:

```text
Assume I understand Linux administration and Go.
```

## 5. Constraints

Examples:

```text
Do not add dependencies.
Do not change the public API.
Use only standard library packages.
Keep the answer under 500 words.
Return Markdown.
```

Constraints reduce unnecessary solution space.

## 6. Output format

Specify format when it matters:

```text
Return:
1. diagnosis,
2. patch,
3. test commands,
4. risks.
```

## 7. Input/output examples

Examples help models understand style and structure.

```text
Input: foo
Output: bar
```

## 8. Zero-shot and few-shot

Zero-shot:
ask without examples.

Few-shot:
provide one or more examples.

Few-shot is useful when exact structure, tone or transformation rules matter.

## 9. Split large tasks

Instead of:

```text
Rewrite the whole application.
```

use:

```text
1. Inspect architecture.
2. Identify affected modules.
3. Propose a plan.
4. Implement the first stage.
5. Run tests.
```

## 10. Iterate

A good workflow:

```text
draft
→ review
→ point out problems
→ revise
→ verify
```

## 11. Prompt for coding

```text
Inspect the repository first.

Implement FEATURE with minimal changes.

Constraints:
- do not change public interfaces,
- do not add dependencies unless necessary,
- follow existing style,
- add tests.

Run the documented test/build commands.
Summarize changed files and risks.
```

## 12. Prompt for debugging

```text
Reproduce or trace the failure first.

Explain the root cause before editing.

Make the smallest safe fix.

Add a regression test.

Run the relevant tests and show the result.
```

## 13. Prompt for code analysis

```text
Do not modify files.

Explain:
- entry points,
- data flow,
- main components,
- dependencies,
- risky areas,
- build/test commands.
```

## 14. Prompt for documentation

```text
Create documentation for this project.

Audience: developer who knows the language but not the repository.

Include:
- purpose,
- architecture,
- setup,
- run,
- test,
- configuration,
- troubleshooting.
```

## 15. Prompt for research

```text
Research TOPIC.

Prioritize current primary sources.
Separate facts from interpretation.
List uncertainties.
Cite every time-sensitive claim.
```

## 16. Roles

Role instructions can help frame expertise:

```text
Act as a senior PostgreSQL administrator reviewing this migration.
```

But role-playing does not replace concrete task instructions.

## 17. Negative instructions

Useful negatives:

```text
Do not invent missing values.
Do not change unrelated files.
Do not summarize code you have not inspected.
```

Avoid huge lists of prohibitions; they can make prompts harder to follow.

## 18. Priorities

State priority explicitly:

```text
Priority:
1. correctness,
2. safety,
3. simplicity,
4. performance.
```

## 19. Prompting AI agents

Agents can take actions, so prompts should include:

- scope,
- allowed tools,
- forbidden actions,
- test commands,
- definition of done,
- rollback expectations.

## 20. Prompting with files

Point to exact files:

```text
Read:
- cmd/server/main.go
- internal/api/
- README.md

Do not inspect vendor/ or generated files unless required.
```

## 21. Context chain

Long tasks often benefit from staged context:

```text
inspect
→ summarize findings
→ plan
→ implement
→ validate
```

## 22. Hallucinations

Models can produce plausible but wrong information.

Reduce risk by:

- providing source material,
- asking for citations,
- asking for uncertainty,
- verifying commands and APIs,
- testing generated code.

## 23. Prompt injection

When AI reads external content, that content may contain malicious instructions.

Treat webpage/email/document content as data, not trusted authority.

Do not let external text override your actual task or security rules.

## 24. Confidential data

Do not paste:

- passwords,
- API keys,
- private keys,
- production credentials,
- sensitive customer data,

unless the environment is explicitly approved for that data.

## 25. Tokens and prompt length

Longer is not automatically better.

Keep:

- relevant context,
- necessary examples,
- constraints,
- acceptance criteria.

Remove unrelated history.

## 26. Temperature and creativity

Lower randomness is usually better for:

- coding,
- extraction,
- factual formatting.

Higher creativity can help with:

- brainstorming,
- writing,
- naming.

Exact controls depend on the model/provider.

## 27. Universal template

```text
Goal:
CONCRETE OUTCOME

Context:
RELEVANT BACKGROUND

Input:
DATA / FILES / ERROR

Constraints:
- ...
- ...

Process:
- inspect first
- explain assumptions
- make minimal changes
- verify result

Output:
DESIRED FORMAT

Definition of done:
- ...
```

## 28. Complete example

```text
Goal:
Fix the API timeout bug.

Context:
Go backend, PostgreSQL, nginx reverse proxy.

Files:
- internal/api/client.go
- internal/api/client_test.go

Constraints:
- no new dependencies
- keep current public API
- preserve existing retry behavior

Process:
1. Inspect current implementation.
2. Identify root cause.
3. Implement smallest safe fix.
4. Add regression test.
5. Run go test ./...

Output:
- root cause
- changed files
- test result
- remaining risks
```

## 29. Common prompting mistakes

- vague goal,
- no context,
- conflicting instructions,
- too many unrelated tasks at once,
- no acceptance criteria,
- asking for certainty where information is missing,
- not reviewing generated output.

## 30. Good practice

For important tasks:

```text
context
→ plan
→ execute
→ verify
→ review
```

## 31. What you should know

You should be able to:

- define a concrete goal,
- provide relevant context,
- set constraints,
- choose output format,
- use examples,
- split large tasks,
- guide agents,
- reduce hallucination risk,
- protect sensitive data,
- verify results.

The strongest prompt is usually not the longest one. It is the one that makes the task, constraints and success criteria unambiguous.

## Sources and further reading

- OpenAI model guidance: https://developers.openai.com/api/docs/guides/latest-model
- OpenAI API documentation: https://developers.openai.com/api/docs/
- Hermes Agent documentation: https://hermes-agent.nousresearch.com/docs/
