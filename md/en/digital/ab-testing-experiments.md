---
id: "doc-054"
title: "A/B Testing and Experiments - Practical Handbook"
slug: "a-b-testing-and-experiments-practical-handbook"
description: "An A/B test compares two or more variants under controlled conditions."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "ab testing"
  - "experiments"
  - "conversion"
  - "mde"
  - "metrics"
---

# A/B Testing and Experiments - Practical Handbook

A good experiment starts before results are visible: hypothesis, primary metric, guardrails, population and stopping rule should be defined in advance. This reduces the temptation to adapt the interpretation to the observed result.

Related topics: [Web Analytics and Tagging](techhandbook:doc-053), [Software Testing](techhandbook:doc-049) and [Web Performance](techhandbook:doc-048).

## 1. What an A/B test is

An A/B test compares two or more variants under controlled conditions.

Example:

```text
A = current checkout page
B = redesigned checkout page
```

Users are randomly assigned to variants and the chosen metric is compared.

## 2. Hypothesis

A good hypothesis connects a change to an expected measurable effect.

Example:

```text
If we shorten the checkout form,
then checkout completion will increase,
because users will face less friction.
```

## 3. Primary metric

Choose one main metric before the test starts.

Examples:

- conversion rate,
- revenue per visitor,
- activation rate,
- completion rate.

Do not change the primary metric after seeing results.

## 4. Guardrail metrics

Guardrails protect against harmful side effects.

Examples:

- error rate,
- refund rate,
- page speed,
- cancellation rate,
- support contacts.

A variant should not improve the primary metric while badly damaging the rest of the product.

## 5. Randomization

Users must be assigned randomly enough that groups are comparable.

Randomization protects the experiment from systematic bias.

## 6. Experiment unit

Define what gets randomized:

- user,
- account,
- session,
- device,
- organization.

The unit must match the product and risk of cross-contamination.

## 7. Sample size

Small samples produce noisy estimates.

Required sample size depends on:

- baseline conversion,
- expected effect,
- chosen significance level,
- desired statistical power.

Calculate it before the test when possible.

## 8. Minimum Detectable Effect

MDE is the smallest effect the experiment is designed to reliably detect.

Smaller MDE usually requires a larger sample.

## 9. Statistical significance

Statistical significance estimates whether an observed difference is unlikely under the null hypothesis.

It does not tell you:

- whether the effect is practically important,
- whether implementation is correct,
- whether the metric is trustworthy.

## 10. Confidence interval

A confidence interval gives a plausible range for the effect estimate.

It is often more informative than a single p-value.

Example:

```text
uplift: +3.2%
95% CI: +0.8% to +5.6%
```

## 11. Peeking

Repeatedly checking results and stopping when they look good can inflate false positives.

Use:

- fixed-horizon design,
- sequential testing methods,
- predefined stopping rules.

## 12. Multiple comparisons

The more variants and metrics you test, the greater the chance of finding a false positive by accident.

Control the number of hypotheses or use appropriate statistical correction.

## 13. Novelty effect

Users may react differently simply because a change is new.

Short tests can overestimate or misrepresent long-term behavior.

## 14. Seasonality

Traffic and behavior can vary by:

- weekday,
- holidays,
- promotions,
- payday,
- season,
- marketing campaigns.

Run long enough to cover normal cycles.

## 15. Sample Ratio Mismatch

If assignment was supposed to be 50/50 but observed traffic is far from that, the experiment may be broken.

Example:

```text
expected: 50% / 50%
observed: 61% / 39%
```

Investigate before interpreting results.

## 16. A/A test

An A/A test sends users to identical experiences.

Useful for validating:

- randomization,
- instrumentation,
- metric pipelines,
- false-positive behavior.

## 17. Feature flag

Feature flags are often used to control experiment exposure.

Benefits:

- gradual rollout,
- easy rollback,
- segment control,
- experiment assignment.

Do not leave obsolete flags forever.

## 18. Segmentation

Segments may reveal differences between groups.

Examples:

- new vs returning users,
- mobile vs desktop,
- country,
- acquisition channel.

Segment analysis should be planned carefully to avoid post-hoc fishing.

## 19. Technical experiment

Experiments can measure infrastructure changes too.

Examples:

- caching strategy,
- image format,
- CDN configuration,
- page-load optimization.

Metrics may include:

- latency,
- errors,
- CPU,
- conversion,
- Core Web Vitals.

## 20. Experiment vs rollout

Rollout asks:

```text
Can we safely release this?
```

Experiment asks:

```text
What causal effect does this change have?
```

A gradual rollout is not automatically an A/B test.

## 21. Experiment document

Before launch, document:

```text
hypothesis
primary metric
guardrails
variants
audience
randomization unit
sample-size assumptions
start/stop rules
known risks
```

## 22. Report

A useful result report contains:

- experiment dates,
- sample sizes,
- data-quality checks,
- primary metric,
- confidence interval,
- guardrails,
- anomalies,
- conclusion,
- next action.

## 23. Common mistakes

- too little traffic,
- changing metrics during the test,
- stopping early,
- broken assignment,
- many unplanned segments,
- duplicate events,
- using significance as business value,
- ignoring guardrails.

## 24. When not to run A/B tests

Avoid A/B testing when:

- traffic is too low,
- the change is required for security/compliance,
- the difference is obvious and low-risk,
- implementation cannot be isolated,
- the cost of delaying the change exceeds learning value.

## 25. What you should know

You should understand:

- hypotheses,
- primary metrics,
- guardrails,
- randomization,
- experiment units,
- sample size,
- MDE,
- significance,
- confidence intervals,
- peeking,
- SRM,
- A/A tests,
- feature flags,
- segmentation,
- rollout vs experiment.

The key rule: define the experiment before looking at the result.

## Sources and further reading

- Microsoft Experimentation Platform: https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/
- NIST Engineering Statistics Handbook: https://www.itl.nist.gov/div898/handbook/
