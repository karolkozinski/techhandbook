# Oracle Cloud Infrastructure (OCI) — Practical Handbook

## 1. What OCI is

Oracle Cloud Infrastructure is Oracle's public cloud platform, offering compute, networking, storage, databases, containers, serverless, observability and AI services.

## 2. Hierarchy

A useful model:

```text
tenancy
↓
compartments
↓
resources
```

Compartments are central to organization and access control.

## 3. Regions, Availability Domains and Fault Domains

Region:
geographic area.

Availability Domain:
isolated datacenter group inside a region.

Fault Domain:
smaller failure-isolation domain inside an Availability Domain.

## 4. Core services — map

```text
Compute                 virtual machines
VCN                     networking
NSG/Security Lists      filtering
Object Storage          object storage
Block Volume            block storage
File Storage            shared filesystem
Oracle Database         managed Oracle DB
Autonomous Database     automated managed database
MySQL HeatWave          managed MySQL + analytics
OKE                     Kubernetes
Container Instances     managed containers
Functions               serverless
OCIR                    container registry
IAM                     identity/authorization
Vault                   keys/secrets
Monitoring/Logging      observability
Audit                   API audit
Load Balancer           traffic distribution
DNS                     managed DNS
```

## 5. Compute

Classic virtual machines and bare-metal instances.

Important concepts:

- shape,
- image,
- boot volume,
- VCN/subnet,
- NSG,
- public IP,
- instance principal.

## 6. OCID

OCI resources use Oracle Cloud Identifiers.

They are long unique identifiers used by CLI, API and policies.

## 7. VCN

Virtual Cloud Network is OCI's private network.

Includes:

- subnets,
- route tables,
- gateways,
- NSGs,
- security lists.

## 8. Security Lists and NSGs

Security Lists apply at subnet level.

Network Security Groups can group filtering rules around selected resources.

Prefer NSGs for application-oriented policy where practical.

## 9. Object Storage

Stores objects in buckets.

Use for backups, archives, static assets and data exchange.

## 10. Block Volume and File Storage

Block Volume:
persistent block disks.

File Storage:
managed shared filesystem.

## 11. Oracle Database

OCI is especially strong in Oracle database workloads and enterprise integration.

## 12. Autonomous Database

Managed Oracle database with automation around patching, scaling and tuning.

## 13. MySQL HeatWave

Managed MySQL service with integrated analytics capabilities.

## 14. OKE

Oracle Kubernetes Engine is managed Kubernetes.

## 15. Container Instances

Run containers without managing Kubernetes clusters or full VMs.

## 16. Functions

Event-driven serverless functions.

## 17. OCIR

Oracle Cloud Infrastructure Registry stores container images.

## 18. IAM

OCI IAM uses users, groups, policies and compartments.

Policies are written as readable statements defining which group can perform which actions in which compartment.

## 19. Dynamic Groups and Instance Principals

Dynamic Groups can represent compute resources.

Instance Principals let instances authenticate to OCI services without static API keys.

Prefer this to embedded credentials.

## 20. Vault

Stores encryption keys and secrets.

## 21. Monitoring, Logging and Audit

Monitoring:
metrics and alarms.

Logging:
service/application logs.

Audit:
records API activity.

## 22. Load Balancer

Managed traffic distribution for applications.

## 23. DNS

OCI DNS manages zones and records.

## 24. OCI CLI

Configure:

```bash
oci setup config
```

List regions:

```bash
oci iam region list
```

## 25. Terraform and Resource Manager

Terraform is strongly supported in OCI.

Resource Manager provides managed Terraform execution.

## 26. AI and GPU

OCI provides GPU compute and managed AI services for enterprise and generative-AI workloads.

## 27. Example architectures

### Simple backend

```text
Load Balancer
→ Compute or Container Instances
→ managed database
```

### Enterprise Oracle

```text
private VCN
→ application tier
→ Oracle Database
→ Object Storage backup
```

### Kubernetes

```text
Load Balancer
→ OKE
→ managed storage/database
```

## 28. Costs

Watch:

- compute shapes,
- database services,
- outbound transfer,
- idle block volumes,
- snapshots,
- load balancers.

## 29. Free Tier

OCI has historically offered Always Free / Free Tier resources, but exact limits and availability can change. Check current OCI documentation before planning around them.

## 30. Security baseline

- least privilege IAM,
- compartments,
- NSGs,
- instance principals,
- Vault,
- private database access,
- logging/audit,
- MFA for users.

## 31. Common traps

- weak compartment design,
- overly broad policies,
- public database endpoints,
- static API keys on instances,
- assuming Free Tier limits never change.

## 32. Small-project choices

Compute is easy to understand for VPS-like use.

Container Instances can be attractive for containerized apps without Kubernetes.

OKE is for cases that actually need Kubernetes.

## 33. CLI cheat sheet

```bash
oci iam region list
oci iam compartment list
oci compute instance list
oci network vcn list
oci os bucket list
oci db system list
oci ce cluster list
oci logging log-group list
```

## 34. Beginner administrator skills

Know how to:

- navigate tenancy/compartments,
- create VCN/subnets,
- launch compute,
- configure NSGs,
- understand IAM policies,
- use instance principals,
- inspect logs,
- monitor cost.

## 35. Sources and further learning

Official documentation:
https://docs.oracle.com/en-us/iaas/

### Main idea

OCI becomes much easier once you understand compartments, policies and VCNs. Oracle database services are a major differentiator, but small projects can still use OCI like a conventional cloud.
