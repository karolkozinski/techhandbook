---
id: "doc-004"
title: "Amazon Web Services (AWS) — Practical Handbook"
slug: "amazon-web-services-aws-practical-handbook"
description: "AWS is a large public-cloud platform offering compute, storage, databases, networking, identity, observability, AI and managed application services."
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "cloud"
  - "aws"
  - "amazon"
---

# Amazon Web Services (AWS) — Practical Handbook

AWS is easier to learn through a small set of building blocks than by memorizing the entire service catalog: account and IAM, region/AZ, VPC, compute, storage, databases, observability and cost. Console, CLI, SDKs and IaC are different clients of the same API-driven model.

Related topics: [Computer Networks for Developers](techhandbook:doc-016), [Docker](techhandbook:doc-012), [SQL and PostgreSQL](techhandbook:doc-010), [Linux Permissions and Server Security](techhandbook:doc-025) and [CI/CD and GitHub Actions](techhandbook:doc-011).

## 1. What AWS is
AWS is a large public-cloud platform offering compute, storage, databases, networking, identity, observability, AI and managed application services.
## 2. How to think about AWS structure
Think in layers: account → organization → region → availability zone → VPC/network → services/resources → IAM permissions.
## 3. Most important services — map
Compute: EC2/Lambda/ECS/EKS. Storage: S3/EBS/EFS. Database: RDS/Aurora/DynamoDB. Network: VPC/Route 53/CloudFront/ALB. Security: IAM/KMS/Secrets Manager.
## 4. EC2 — classic server
EC2 provides virtual machines. Choose instance type, image, storage, network, security group and IAM role.
### Example CLI commands
```bash
aws ec2 describe-instances
aws ec2 describe-security-groups
```
## 5. VPC — network
A VPC is your isolated virtual network containing subnets, route tables, gateways and network controls.
## 6. Security Groups
Stateful virtual firewalls attached to resources such as EC2 and load balancers. Open only required ports from required sources.
## 7. S3 — object storage
Stores objects in buckets. Use for static files, backups, logs and data lakes. Understand bucket policies, versioning and lifecycle rules.
## 8. EBS and EFS
EBS is block storage typically attached to EC2; EFS is managed shared network filesystem storage.
## 9. RDS and Aurora
Managed relational databases. AWS handles much of patching, backups and failover, but schema/query/application design remains your responsibility.
## 10. DynamoDB
Managed NoSQL key-value/document database designed for predictable low-latency access at scale.
## 11. ECS, EKS and Fargate
### ECS
AWS-native container orchestration.
### EKS
Managed Kubernetes control plane.
### Fargate
Serverless compute for containers so you do not manage worker servers directly.
## 12. Lambda
Event-driven serverless functions billed around execution. Good for small jobs, APIs and integrations where the execution model fits.
## 13. Route 53, CloudFront, ALB and API Gateway
Route 53 = DNS, CloudFront = CDN/edge, ALB = HTTP load balancer, API Gateway = managed API front door.
## 14. IAM — the most important security service
IAM controls identities, roles, policies and permissions. Prefer roles and least privilege over long-lived access keys.
## 15. Secrets Manager, Parameter Store, KMS
Secrets Manager stores/rotates secrets, Parameter Store manages configuration/secrets, KMS manages encryption keys.
## 16. CloudWatch and CloudTrail
CloudWatch provides metrics/logs/alarms; CloudTrail records API/account activity for audit.
## 17. AWS CLI
```bash
aws configure
aws sts get-caller-identity
aws configure list
```
## 18. Infrastructure as Code
Use CloudFormation, CDK, Terraform/OpenTofu or other IaC so infrastructure is reviewable and reproducible.
## 19. ECR and CI/CD pipeline
ECR stores container images. CI builds/tests/pushes images; deployment pulls a pinned image into ECS/EKS/EC2.
## 20. AI: Bedrock and SageMaker
Bedrock provides managed access to foundation models; SageMaker provides a broader ML development/training/deployment platform.
## 21. Typical architectures
### Small static website
S3 + CloudFront + Route 53 + ACM.
### Go backend + PostgreSQL
ALB → ECS/EC2 → RDS PostgreSQL, with secrets in Secrets Manager and logs in CloudWatch.
### Simple serverless API
API Gateway → Lambda → DynamoDB or managed database.
### Classic VPS in AWS
EC2 + EBS + Security Group + Elastic IP/DNS; closest mental model to a normal VPS.
## 22. Costs — where people get caught
Idle EC2/RDS, NAT Gateway traffic, data transfer, oversized storage, snapshots, logs and forgotten resources can dominate bills.
## 23. Reserved, Savings Plans and Spot
Reservations/Savings Plans trade commitment for discounts. Spot uses spare capacity at lower cost but instances can be interrupted.
## 24. Backup and disaster recovery
Use snapshots, automated DB backups, S3 versioning/replication where appropriate and documented restore procedures. Test recovery.
## 25. Security — minimum
MFA, least-privilege IAM, no root access keys, private subnets where appropriate, encryption, CloudTrail, logging and regular review.
## 26. What to choose for a small project
For simplicity, a normal VPS may still be cheaper/easier. In AWS, EC2 + RDS or ECS Fargate + RDS are straightforward starting points.
## 27. What a beginner AWS administrator should know
Accounts/regions, IAM, VPC, EC2, S3, RDS, Security Groups, CloudWatch, billing and CLI basics.
## 28. Command cheat sheet
# who am I
```bash
aws sts get-caller-identity
```
# regions
```bash
aws ec2 describe-regions
```
# EC2
```bash
aws ec2 describe-instances
```
# networks
```bash
aws ec2 describe-vpcs
aws ec2 describe-subnets
aws ec2 describe-security-groups
```
# S3
```bash
aws s3 ls
aws s3 cp file s3://bucket/
```
# RDS
```bash
aws rds describe-db-instances
```
# ECS
```bash
aws ecs list-clusters
aws ecs list-services --cluster NAME
```
# Lambda
```bash
aws lambda list-functions
```
# IAM
```bash
aws iam list-roles
```
# logs
```bash
aws logs describe-log-groups
```
## 29. AWS name glossary
ARN = resource identifier; AMI = machine image; AZ = availability zone; VPC = virtual network; SG = security group; IAM = identity/permissions; ECR = container registry.
## 30. Sources and further learning
Use current AWS documentation, service user guides, Well-Architected guidance and pricing calculators before production decisions.
### Most important thought
AWS is not one service but a toolbox. Start with the smallest set of services that solves the problem and understand cost/security boundaries before adding more.
