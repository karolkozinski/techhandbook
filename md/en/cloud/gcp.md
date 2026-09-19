# Google Cloud Platform (GCP) — Practical Handbook

## 1. What Google Cloud is

Google Cloud is a public cloud platform offering compute, storage, databases, analytics, networking, containers, serverless and AI services.

## 2. Resource hierarchy

```text
organization
↓
folders
↓
projects
↓
resources
```

Projects are central billing, IAM and API-management boundaries.

## 3. Regions and zones

Regions are geographic locations.

Zones are separate infrastructure locations inside a region.

## 4. Core services — map

```text
Compute Engine      virtual machines
VPC                 networking
Cloud Storage       object storage
Persistent Disk     block storage
Filestore           managed file storage
Cloud Run           managed serverless containers
GKE                 Kubernetes
Cloud Functions     functions
Artifact Registry   images/packages
Cloud SQL           relational databases
Spanner             distributed relational database
Firestore           document database
BigQuery            analytics warehouse
Pub/Sub             messaging
IAM                 permissions
Service Accounts    workload identities
Secret Manager      secrets
Cloud Logging       logs
Cloud Monitoring    metrics
Vertex AI           AI/ML platform
```

## 5. Projects and APIs

Many Google Cloud services require enabling a project API before use.

List enabled services:

```bash
gcloud services list --enabled
```

## 6. Compute Engine

Classic virtual machines.

Important concepts:

- machine type,
- image,
- persistent disk,
- VPC/subnet,
- firewall rules,
- service account,
- metadata.

## 7. VPC

Google Cloud VPC networks are global resources with regional subnets.

Core concepts:

- VPC,
- subnet,
- routes,
- Cloud NAT,
- peering,
- private service access.

## 8. Firewall

Firewall rules control traffic to VM workloads.

Use tags/service accounts and narrow source ranges where possible.

## 9. Cloud Storage

Object storage using buckets and objects.

Useful for static assets, backups, archives and data pipelines.

## 10. Persistent Disk and Filestore

Persistent Disk:
block storage for VMs.

Filestore:
managed shared file storage.

## 11. Cloud Run

One of the simplest GCP services for small containerized applications.

You provide a container image and Cloud Run handles scaling and HTTPS endpoint exposure.

## 12. GKE

Google Kubernetes Engine is managed Kubernetes.

Use it only when Kubernetes capabilities justify its operational complexity.

## 13. Cloud Functions / Cloud Run functions

Event-driven function execution.

Modern Google Cloud function products are increasingly integrated with Cloud Run infrastructure.

## 14. Artifact Registry

Stores container images and software packages.

## 15. Cloud SQL

Managed PostgreSQL, MySQL and SQL Server.

## 16. Spanner

Globally scalable distributed relational database.

Powerful, but usually unnecessary for small projects.

## 17. Firestore

Managed document database often used by web/mobile applications.

## 18. BigQuery

Serverless analytical data warehouse.

Designed for large-scale SQL analytics.

## 19. Pub/Sub

Managed messaging service for asynchronous/event-driven architectures.

## 20. IAM

IAM controls who can do what on which resource.

Prefer narrow roles over broad primitive roles.

## 21. Service Accounts

Workload identities for applications and machines.

Prefer attached service accounts and short-lived credentials over downloaded static keys.

## 22. Secret Manager and KMS

Secret Manager stores sensitive configuration.

Cloud KMS manages encryption keys.

## 23. Cloud Logging and Monitoring

Use these for:

- logs,
- metrics,
- dashboards,
- alerts,
- service troubleshooting.

## 24. gcloud CLI

Login:

```bash
gcloud auth login
```

Show configuration:

```bash
gcloud config list
```

Select project:

```bash
gcloud config set project PROJECT_ID
```

## 25. Terraform

Terraform is widely used for GCP infrastructure as code.

Google also provides native deployment/configuration tooling.

## 26. Load Balancing, CDN and DNS

Cloud Load Balancing supports global and regional architectures.

Cloud CDN provides content delivery.

Cloud DNS manages DNS zones.

## 27. Vertex AI

Managed AI/ML platform for model training, deployment and generative-AI services.

## 28. Example architectures

### Small Go application

```text
Cloud Run
→ Cloud SQL PostgreSQL
→ Secret Manager
```

### Data pipeline

```text
Pub/Sub
→ Dataflow / processing
→ BigQuery
```

### Kubernetes

```text
Load Balancer
→ GKE
→ managed databases/services
```

## 29. Costs

Watch:

- idle Compute Engine,
- Cloud SQL size,
- BigQuery scans,
- log volume,
- network egress,
- GKE clusters,
- retained disks/snapshots.

## 30. Project organization

Use separate projects for meaningful environment or ownership boundaries.

Examples:

```text
app-dev
app-prod
shared-network
data-platform
```

## 31. Security baseline

- MFA for users,
- least privilege IAM,
- service accounts for workloads,
- avoid static service-account keys,
- Secret Manager,
- private networking where useful,
- audit logging,
- budgets.

## 32. Common traps

- using one project for everything,
- leaving broad Owner/Editor roles,
- exposing Cloud SQL publicly,
- unnecessary GKE,
- ignoring BigQuery/logging costs.

## 33. Small-project choices

Cloud Run is often the first service to evaluate for small containerized apps.

Compute Engine is still useful when you want a classic VPS model.

## 34. CLI cheat sheet

```bash
gcloud auth list
gcloud config list
gcloud projects list
gcloud compute instances list
gcloud compute networks list
gcloud storage buckets list
gcloud run services list
gcloud sql instances list
gcloud artifacts repositories list
```

## 35. Beginner administrator skills

Know how to:

- select a project,
- enable APIs,
- manage IAM,
- deploy Compute Engine/Cloud Run,
- understand VPC/firewall rules,
- use service accounts,
- inspect logs,
- watch cost.

## 36. Sources and further learning

Official documentation:
https://cloud.google.com/docs

### Main idea

GCP is easiest to understand around projects, service accounts, VPC and managed platforms such as Cloud Run. Start simple before reaching for GKE.
