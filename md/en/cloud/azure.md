---
id: "doc-005"
title: "Microsoft Azure - Practical Handbook"
slug: "microsoft-azure-practical-handbook"
description: "Microsoft Azure is a public cloud platform covering compute, networking, storage, databases, identity, containers, serverless, analytics, AI and enterprise…"
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "cloud"
  - "azure"
  - "microsoft"
---

# Microsoft Azure - Practical Handbook

Azure is easiest to understand through its identity and resource hierarchy: Entra tenant, subscription, resource group, region, network and individual services. For small applications, App Service or Container Apps are often a simpler entry point than a full AKS cluster.

Related topics: [Computer Networks for Developers](techhandbook:doc-016), [Docker](techhandbook:doc-012), [SQL and PostgreSQL](techhandbook:doc-010), [Windows Server Administration](techhandbook:doc-037) and [CI/CD and GitHub Actions](techhandbook:doc-011).

## 1. What Azure is

Microsoft Azure is a public cloud platform covering compute, networking, storage, databases, identity, containers, serverless, analytics, AI and enterprise governance.

## 2. Resource hierarchy

A useful model:

```text
tenant
↓
management groups
↓
subscriptions
↓
resource groups
↓
resources
```

## 3. Core services - map

```text
Virtual Machines       compute
VNet                   networking
NSG                    network filtering
Storage Account        blobs/files/queues/tables
App Service            managed web apps
Container Apps         managed containers
AKS                    Kubernetes
Functions              serverless functions
Azure SQL              managed SQL Server
PostgreSQL             managed PostgreSQL
Cosmos DB              globally distributed NoSQL
Service Bus            messaging
Event Grid             event routing
Event Hubs             event streaming
Entra ID               identity
RBAC                    authorization
Key Vault               secrets/keys/certificates
Azure Monitor           observability
ACR                     container registry
Front Door              global HTTP edge/load balancing
```

## 4. Regions and Availability Zones

Regions are geographic cloud locations.

Availability Zones are separate datacenter locations within supported regions.

Use multiple zones when the availability requirement justifies the cost and complexity.

## 5. Resource Groups

Resource Groups organize related resources.

They are useful for:

- lifecycle management,
- RBAC,
- cost tracking,
- policy scope.

## 6. Virtual Machines

Azure VMs are classic cloud servers.

Key concepts:

- image,
- size,
- OS disk,
- data disk,
- VNet/subnet,
- public IP,
- NSG,
- managed identity.

## 7. VNet and networking

Core elements:

- VNet,
- subnet,
- route table,
- NAT Gateway,
- VPN Gateway,
- peering,
- private endpoints.

## 8. Network Security Groups

NSGs filter network traffic to subnets and interfaces.

Keep rules narrow and explicit.

## 9. Storage Account

A Storage Account can provide:

- Blob Storage,
- Azure Files,
- queues,
- tables.

Blob Storage is the main object-storage service.

## 10. App Service

Managed web-app hosting.

Useful when you want deployment without managing the underlying OS.

## 11. Azure Container Apps

Managed container platform suited to APIs, workers and event-driven workloads without managing Kubernetes directly.

## 12. AKS

Azure Kubernetes Service is managed Kubernetes.

Use it when you genuinely need Kubernetes features and operating model.

## 13. Azure Functions

Serverless functions triggered by HTTP, queues, timers and events.

## 14. Azure SQL and PostgreSQL

Managed relational database services.

Prefer managed databases when reduced administration is worth the additional cost.

## 15. Cosmos DB

Distributed NoSQL database with multiple APIs and global replication options.

## 16. Service Bus, Event Grid and Event Hubs

Service Bus:
reliable queues/topics.

Event Grid:
event routing.

Event Hubs:
high-throughput event streaming.

## 17. Microsoft Entra ID

Cloud identity platform for users, applications and service principals.

## 18. RBAC

Role-Based Access Control grants permissions to identities at scopes such as subscription, resource group or resource.

Use least privilege.

## 19. Managed Identity

Lets Azure resources authenticate to other Azure services without storing static credentials.

Prefer managed identities over embedded secrets where possible.

## 20. Key Vault

Stores:

- secrets,
- encryption keys,
- certificates.

## 21. Azure Monitor and Log Analytics

Azure Monitor collects metrics and logs.

Log Analytics workspaces provide centralized log querying and analysis.

## 22. Azure CLI

Login:

```bash
az login
```

Show account:

```bash
az account show
```

List subscriptions:

```bash
az account list -o table
```

## 23. Bicep, ARM and Terraform

ARM templates:
native JSON infrastructure definitions.

Bicep:
higher-level Azure-native IaC language.

Terraform:
cross-cloud IaC.

## 24. Azure Container Registry

ACR stores private container images.

## 25. Front Door, Application Gateway and Load Balancer

Front Door:
global Layer 7 edge routing.

Application Gateway:
regional HTTP/HTTPS load balancing and optional WAF.

Load Balancer:
Layer 4 TCP/UDP balancing.

## 26. Azure DNS

Managed DNS zones and records.

## 27. AI

Azure provides AI services including Azure OpenAI, Azure AI services and machine-learning platforms.

Use the service that matches your workload rather than defaulting to a large platform.

## 28. Example architectures

### Static site

```text
Storage / static hosting
→ Front Door/CDN
→ DNS
```

### Go API in a container

```text
Container Apps
→ managed PostgreSQL
→ Key Vault
```

### Classic server

```text
VM
→ nginx
→ app
```

### Serverless

```text
API / Event Grid
→ Azure Functions
→ Cosmos DB or SQL
```

## 29. Costs

Watch:

- idle VMs,
- managed databases,
- outbound transfer,
- log retention,
- premium networking,
- forgotten public IPs/disks.

Use budgets and cost alerts.

## 30. Azure Policy and governance

Azure Policy can enforce or audit configuration rules across subscriptions/resource groups.

Useful for:

- allowed regions,
- required tags,
- encryption rules,
- network restrictions.

## 31. Security baseline

- Entra MFA,
- least privilege RBAC,
- managed identities,
- Key Vault,
- private endpoints where useful,
- logging,
- patching,
- Defender for Cloud where appropriate.

## 32. Common traps

- too many subscriptions/resource groups without naming standards,
- storing secrets in app settings carelessly,
- public databases,
- overusing AKS,
- forgetting log/egress costs.

## 33. Small-project choices

For small apps, App Service or Container Apps can be simpler than AKS.

Use a VM when direct OS control is actually the simpler option.

## 34. CLI cheat sheet

```bash
az account show
az group list
az vm list -o table
az network vnet list -o table
az storage account list -o table
az webapp list -o table
az containerapp list -o table
az aks list -o table
az functionapp list -o table
```

## 35. Beginner administrator skills

Know how to:

- select a subscription,
- create a resource group,
- understand VNet/subnets,
- deploy a VM/app,
- assign RBAC,
- use managed identity,
- inspect logs,
- monitor cost.

## 36. Sources and further learning

Official documentation:
https://learn.microsoft.com/azure/

### Main idea

Azure becomes much easier when you first understand its hierarchy, identity model and networking. Most other services fit into that structure.
