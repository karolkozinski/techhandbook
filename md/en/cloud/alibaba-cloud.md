---
id: "doc-003"
title: "Alibaba Cloud - Practical Handbook"
slug: "alibaba-cloud-practical-handbook"
description: "Alibaba Cloud is a large public cloud platform offering compute, storage, networking, databases, containers, serverless, CDN, observability and AI services."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "cloud"
  - "alibaba"
---

# Alibaba Cloud - Practical Handbook

Alibaba Cloud uses the same core patterns as other large cloud platforms: regions, private networking, compute, object storage, managed databases, Kubernetes, serverless and IAM. The main differences for someone coming from AWS/Azure/GCP are service names and the additional China-market context.

Related topics: [Computer Networks for Developers](techhandbook:doc-016), [Docker](techhandbook:doc-012), [SQL and PostgreSQL](techhandbook:doc-010), [Linux Permissions and Server Security](techhandbook:doc-025) and [CI/CD and GitHub Actions](techhandbook:doc-011).

## 1. What Alibaba Cloud is

Alibaba Cloud is a large public cloud platform offering compute, storage, networking, databases, containers, serverless, CDN, observability and AI services.

## 2. When Alibaba Cloud makes particular sense

Alibaba Cloud is especially relevant when:

- operating in or near the Chinese market,
- integrating with Alibaba ecosystem services,
- needing strong regional presence in Asia,
- working with organizations already standardized on Alibaba Cloud.

## 3. Regions and zones

Region:
geographic cloud location.

Zone:
isolated infrastructure location inside a region.

Choose region based on users, compliance, latency and service availability.

## 4. Core services - map

```text
ECS          virtual machines
VPC          networking
vSwitch      subnet-like network segment
Security Group firewall rules
OSS          object storage
Cloud Disk   block storage
NAS          shared file storage
RDS          managed relational database
PolarDB      cloud-native relational database
ACK          Kubernetes
ACR          container registry
Function Compute serverless
SLB/ALB/NLB  load balancing
CDN/DCDN     content delivery
RAM          identity/access management
KMS          encryption keys
Secrets Manager secrets
CloudMonitor monitoring
ActionTrail  audit logs
CEN          multi-network connectivity
Model Studio / Qwen AI
```

## 5. ECS

Elastic Compute Service provides virtual machines.

Important concepts:

- instance type,
- image,
- system disk,
- data disk,
- VPC/vSwitch,
- security group,
- RAM role.

## 6. VPC and vSwitch

VPC provides isolated networking.

vSwitch is the subnet-like building block inside a VPC.

## 7. Security Groups

Stateful instance-level traffic filtering.

Keep rules narrow and avoid broad public access to management/database ports.

## 8. OSS

Object Storage Service stores files/objects in buckets.

Use cases:

- static files,
- backups,
- logs,
- data archives,
- media.

## 9. Cloud Disks and NAS

Cloud Disk:
block storage.

NAS:
managed shared filesystem.

## 10. ApsaraDB RDS

Managed relational databases such as MySQL and PostgreSQL.

## 11. PolarDB

Cloud-native relational database designed for scalability and managed operation.

## 12. ACK

Alibaba Cloud Container Service for Kubernetes.

Use it when Kubernetes is actually required.

## 13. Container Registry

Stores container images for deployment to ACK and other compute services.

## 14. Function Compute

Serverless functions triggered by HTTP or events.

## 15. SLB, ALB and NLB

SLB:
general load-balancing family.

ALB:
Layer 7 HTTP/HTTPS.

NLB:
Layer 4 TCP/UDP.

## 16. CDN and DCDN

CDN accelerates static/distributed content delivery.

DCDN extends acceleration to more dynamic traffic scenarios.

## 17. RAM

Resource Access Management controls users, roles and permissions.

Use least privilege.

## 18. Roles instead of static AccessKey credentials

Prefer RAM roles and temporary credentials for ECS/workloads.

Static AccessKey credentials should not be embedded in source code or images.

## 19. KMS and Secrets Manager

KMS:
encryption-key management.

Secrets Manager:
managed application secrets.

## 20. CloudMonitor

Metrics, alarms and infrastructure monitoring.

## 21. ActionTrail

Audit trail of management/API activity.

## 22. Alibaba Cloud CLI

The Alibaba Cloud CLI can authenticate and manage resources from the shell.

Follow current official documentation for installation and credential configuration.

## 23. Terraform and ROS

Terraform supports Alibaba Cloud.

Resource Orchestration Service (ROS) is Alibaba Cloud's native IaC service.

## 24. CEN

Cloud Enterprise Network connects multiple VPCs and regions.

Useful in larger multi-network architectures.

## 25. AI: Qwen and Model Studio

Alibaba Cloud provides Qwen models and Model Studio tooling for generative AI and model access.

## 26. Example architectures

### Classic web app

```text
ALB
→ ECS
→ RDS
→ OSS
```

### Kubernetes

```text
ALB
→ ACK
→ RDS/PolarDB
→ OSS
```

### Event-driven

```text
HTTP/event
→ Function Compute
→ OSS/database/message service
```

## 27. Chinese market - important differences

Operating services for users in mainland China can involve additional regulatory, domain and ICP-related requirements.

Do not assume deployment rules are identical to Europe or North America.

## 28. Costs

Watch:

- idle ECS,
- database tiers,
- load balancers,
- public bandwidth/egress,
- OSS lifecycle,
- snapshots/disks,
- log retention.

## 29. Security baseline

- MFA,
- least privilege RAM,
- workload roles,
- KMS/Secrets Manager,
- restricted security groups,
- audit logs,
- patching,
- budgets.

## 30. Common traps

- embedding AccessKeys,
- public RDS,
- broad 0.0.0.0/0 admin access,
- choosing ACK when ECS/containers would be simpler,
- ignoring regional/regulatory differences.

## 31. Small-project choices

For simple applications, ECS plus managed database may be easier than Kubernetes.

Function Compute is useful for event-driven workloads.

## 32. CLI cheat sheet

Common tasks include:

```text
list regions
list ECS instances
inspect VPCs
list OSS buckets
list RDS instances
inspect RAM roles
view monitoring/logging
```

Exact CLI command names can evolve, so use the current Alibaba Cloud CLI reference.

## 33. Beginner administrator skills

Know how to:

- choose region,
- create VPC/vSwitch,
- launch ECS,
- configure security groups,
- use OSS,
- understand RAM roles,
- deploy managed database,
- inspect monitoring/audit,
- control costs.

## 34. Sources and further learning

Official documentation:
https://www.alibabacloud.com/help/

### Main idea

Alibaba Cloud uses the same broad cloud patterns as AWS/Azure/GCP, but its product names, IAM model and China-market context deserve specific attention.
