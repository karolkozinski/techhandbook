# Amazon Web Services (AWS) — Practical Handbook

## 1. What AWS is

Amazon Web Services is a large public cloud platform offering compute, storage, databases, networking, identity, observability, serverless, container, analytics and AI services.

## 2. How to think about AWS structure

A useful hierarchy is:

```text
AWS account
↓
region
↓
availability zones
↓
resources
```

Most resources are regional, but some services such as IAM have global scope.

## 3. Core services — map

```text
EC2        virtual machines
VPC        networking
S3         object storage
EBS        block storage
EFS        shared file storage
RDS        managed relational databases
Aurora     AWS relational database engine
DynamoDB   managed NoSQL
ECS/EKS    containers and Kubernetes
Fargate    serverless container runtime
Lambda     functions
Route 53   DNS
CloudFront CDN
ALB/NLB    load balancing
IAM        identities and permissions
CloudWatch monitoring/logging
CloudTrail audit trail
ECR        container registry
Bedrock    foundation-model platform
```

## 4. EC2

EC2 provides virtual machines.

Important concepts:

- instance type,
- AMI,
- EBS volume,
- security group,
- key pair,
- subnet,
- IAM role.

CLI examples:

```bash
aws ec2 describe-instances
aws ec2 describe-regions
```

## 5. VPC

A Virtual Private Cloud is your isolated network.

Core building blocks:

- subnets,
- route tables,
- Internet Gateway,
- NAT Gateway,
- security groups,
- network ACLs.

## 6. Security Groups

Stateful virtual firewalls attached to resources such as EC2 instances and load balancers.

Open only the ports and source ranges you actually need.

## 7. S3

Object storage for files, backups, static assets and data.

Important concepts:

- buckets,
- objects,
- prefixes,
- lifecycle rules,
- versioning,
- storage classes,
- bucket policies.

## 8. EBS and EFS

EBS:
block storage typically attached to EC2.

EFS:
managed shared network filesystem.

## 9. RDS and Aurora

Managed relational databases.

Common engines include PostgreSQL, MySQL and MariaDB.

Managed services reduce operational work but cost more than self-hosting.

## 10. DynamoDB

Managed key-value/document NoSQL database designed for high scale and low-latency access.

## 11. ECS, EKS and Fargate

ECS:
AWS-native container orchestration.

EKS:
managed Kubernetes.

Fargate:
run containers without managing EC2 worker nodes directly.

## 12. Lambda

Event-driven serverless functions.

Good for short-running stateless jobs, APIs and event processing.

## 13. Route 53, CloudFront, load balancers and API Gateway

Route 53:
DNS.

CloudFront:
CDN.

ALB:
Layer 7 HTTP/HTTPS load balancing.

NLB:
Layer 4 TCP/UDP load balancing.

API Gateway:
managed API entry point.

## 14. IAM

IAM controls identities and permissions.

Use:

- users sparingly,
- roles for workloads,
- groups for human access,
- least privilege,
- MFA for privileged users.

Prefer temporary credentials over static access keys.

## 15. Secrets Manager, Parameter Store and KMS

Secrets Manager:
managed secrets.

Systems Manager Parameter Store:
configuration and secrets.

KMS:
encryption-key management.

## 16. CloudWatch and CloudTrail

CloudWatch:
metrics, logs, dashboards and alarms.

CloudTrail:
audit history of API activity.

## 17. AWS CLI

Configure:

```bash
aws configure
```

Identity check:

```bash
aws sts get-caller-identity
```

List regions:

```bash
aws ec2 describe-regions
```

## 18. Infrastructure as Code

Common options:

- CloudFormation,
- AWS CDK,
- Terraform,
- Pulumi.

Treat infrastructure definitions as code and keep them under version control.

## 19. ECR and CI/CD

ECR stores container images.

A typical flow:

```text
Git push
→ CI build/test
→ image build
→ push to ECR
→ deploy to ECS/EKS
```

## 20. AI: Bedrock and SageMaker

Bedrock provides managed access to foundation models and generative-AI tooling.

SageMaker focuses more broadly on machine-learning development, training and deployment.

## 21. Typical architectures

### Small static site

```text
S3
→ CloudFront
→ Route 53
```

### Go backend + PostgreSQL

```text
ALB
→ ECS/Fargate or EC2
→ RDS PostgreSQL
```

### Serverless API

```text
API Gateway
→ Lambda
→ DynamoDB
```

### Classic VPS-style deployment

```text
EC2
→ nginx
→ application
→ EBS
```

## 22. Costs — common traps

Watch:

- NAT Gateway,
- cross-region transfer,
- Internet egress,
- idle EC2,
- unattached EBS,
- old snapshots,
- large CloudWatch logs,
- oversized managed databases.

Use AWS Budgets and cost alerts early.

## 23. Reserved capacity, Savings Plans and Spot

Savings Plans/Reserved options:
lower cost for predictable usage.

Spot:
deeply discounted spare capacity that can be interrupted.

## 24. Backup and disaster recovery

Use:

- EBS snapshots,
- RDS backups,
- S3 versioning/lifecycle,
- cross-region copies where required.

Test recovery, not only backup creation.

## 25. Security baseline

- MFA,
- least privilege,
- IAM roles,
- no public database ports,
- encryption,
- CloudTrail,
- logging,
- patching,
- secret management.

## 26. Small-project choices

For a tiny project, prefer the simplest architecture that works.

EC2 can be simpler than assembling many managed services.

For containerized apps, ECS/Fargate is often simpler than EKS.

## 27. Beginner administrator skills

Know how to:

- identify the active account/role,
- choose a region,
- create a VPC/subnet,
- launch EC2,
- configure security groups,
- use S3,
- inspect CloudWatch,
- manage IAM roles,
- estimate costs.

## 28. CLI cheat sheet

```bash
aws sts get-caller-identity
aws configure list
aws ec2 describe-regions
aws ec2 describe-instances
aws s3 ls
aws rds describe-db-instances
aws ecs list-clusters
aws lambda list-functions
aws iam list-roles
aws logs describe-log-groups
```

## 29. AWS vocabulary

```text
EC2      VM
S3       object storage
EBS      block disk
RDS      managed relational DB
IAM      identity/permissions
VPC      network
ALB      HTTP load balancer
ECR      container registry
ECS      container platform
EKS      Kubernetes
Lambda   function
```

## 30. Sources and further learning

Official documentation:
https://docs.aws.amazon.com/

### Main idea

AWS gives you many building blocks. The hard part is usually not creating resources, but choosing the smallest set that is secure, observable and cost-effective.
