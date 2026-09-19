# Amazon Web Services (AWS) — kompendium praktyczne

> Aktualizacja: 2026-09-19  
> Cel: rozumieć AWS na tyle, aby świadomie uruchamiać aplikacje, serwery i usługi, czytać istniejącą architekturę, diagnozować problemy i nie zrobić sobie przypadkiem bardzo drogiego rachunku.

## 1. Czym jest AWS

Amazon Web Services to największa globalna platforma chmurowa typu IaaS/PaaS. AWS udostępnia setki usług, ale w praktyce większość typowych systemów opiera się na kilkunastu klockach: sieci VPC, maszynach EC2, storage S3/EBS/EFS, bazach RDS/DynamoDB, IAM, load balancerach, DNS Route 53, monitoringu CloudWatch oraz usługach kontenerowych i serverless.

Chmura nie jest „cudzym komputerem”, tylko zestawem zasobów zarządzanych przez API. Konsola WWW, CLI, Terraform i SDK robią ostatecznie to samo: wywołują API AWS.

Najważniejsze modele:

- **IaaS** — dostajesz VM, sieć, dyski; sam zarządzasz systemem. Przykład: EC2.
- **PaaS** — dostajesz platformę uruchomieniową, mniej administracji. Przykład: App Runner, RDS.
- **Serverless** — nie zarządzasz serwerem; płacisz głównie za wykonanie. Przykład: Lambda.
- **Managed service** — AWS administruje większą częścią stosu. Przykład: RDS, ElastiCache, OpenSearch.

## 2. Jak myśleć o strukturze AWS

Typowa hierarchia wygląda tak:

```text
AWS Organizations
└── konto produkcyjne
    ├── eu-central-1 (Frankfurt)
    │   ├── VPC
    │   │   ├── subnet publiczny
    │   │   └── subnet prywatny
    │   ├── EC2 / ECS / Lambda
    │   ├── RDS
    │   └── S3
    └── eu-west-1 (Irlandia)
```

**Region** to geograficzny obszar. **Availability Zone (AZ)** to osobne centrum lub grupa centrów danych w regionie. Produkcja powinna zwykle wykorzystywać przynajmniej dwie AZ.

Konto AWS jest silną granicą izolacji. W większych organizacjach lepiej mieć osobne konta np. `prod`, `dev`, `security`, `shared-services`, zamiast wrzucać wszystko do jednego worka.

## 3. Najważniejsze usługi — mapa

| Potrzeba | AWS |
|---|---|
| Maszyna wirtualna | EC2 |
| Autoscaling VM | Auto Scaling Groups |
| Obrazy VM | AMI |
| Dysk blokowy | EBS |
| Współdzielony filesystem | EFS |
| Object storage | S3 |
| Kontenery zarządzane | ECS |
| Kubernetes | EKS |
| Kontenery bez zarządzania VM | Fargate |
| Funkcje serverless | Lambda |
| Relacyjna baza danych | RDS / Aurora |
| NoSQL | DynamoDB |
| Cache | ElastiCache |
| Kolejki | SQS |
| Pub/sub | SNS |
| Event bus | EventBridge |
| DNS | Route 53 |
| CDN | CloudFront |
| Load balancer | ELB: ALB/NLB |
| API | API Gateway |
| Sieć prywatna | VPC |
| Tożsamość/uprawnienia | IAM / IAM Identity Center |
| Sekrety | Secrets Manager / Parameter Store |
| Klucze szyfrujące | KMS |
| Logi i metryki | CloudWatch |
| Audyt API | CloudTrail |
| WAF | AWS WAF |
| Ochrona DDoS | Shield |
| IaC AWS | CloudFormation / CDK |
| AI/LLM | Bedrock / SageMaker |

## 4. EC2 — klasyczny serwer

EC2 to wirtualne maszyny. Wybierasz:

1. region i AZ,
2. obraz systemu (AMI),
3. typ instancji,
4. dysk EBS,
5. sieć/subnet,
6. Security Group,
7. rolę IAM,
8. klucz SSH lub Session Manager.

Rodziny instancji mają różne zastosowania:

- `t*` — tanie, burstable, dobre do małych usług,
- `m*` — ogólnego przeznaczenia,
- `c*` — CPU,
- `r*` — dużo RAM,
- `g*`, `p*` — GPU,
- Graviton (`*g`) — ARM, często atrakcyjny cenowo.

### Przykładowe polecenia CLI

```bash
aws ec2 describe-instances
aws ec2 describe-vpcs
aws ec2 describe-security-groups
```

EC2 traktuj jak normalny serwer: aktualizacje systemu, SSH, firewall hosta, usługi systemd, backup i monitoring nadal są twoim problemem.

## 5. VPC — sieć

VPC to twoja logicznie odizolowana sieć.

Najważniejsze elementy:

- **CIDR** — zakres adresów, np. `10.20.0.0/16`,
- **subnet** — podsieć przypisana do jednej AZ,
- **route table** — routing,
- **Internet Gateway** — dostęp z/do Internetu,
- **NAT Gateway** — wyjście do Internetu dla prywatnych subnetów,
- **Security Group** — stanowy firewall przypięty do zasobu,
- **Network ACL** — firewall na poziomie subnetu,
- **VPC Endpoint / PrivateLink** — dostęp do usług AWS bez wychodzenia przez publiczny Internet,
- **Transit Gateway** — łączenie wielu VPC i sieci on-prem.

Typowy układ webowy:

```text
Internet
  |
CloudFront / WAF
  |
ALB --- publiczne subnety w 2 AZ
  |
ECS/EC2 --- prywatne subnety w 2 AZ
  |
RDS --- prywatne subnety DB
```

Nie wystawiaj bazy danych publicznie tylko dlatego, że „tak łatwiej się połączyć”.

## 6. Security Groups

Security Group określa, jaki ruch może wejść i wyjść z zasobu.

Przykład:

```text
ALB:
  inbound TCP/443 from 0.0.0.0/0

APP:
  inbound TCP/8080 tylko z Security Group ALB

DB:
  inbound TCP/5432 tylko z Security Group APP
```

To jest lepsze niż otwieranie portów na całe zakresy IP.

## 7. S3 — storage obiektowy

S3 przechowuje obiekty w bucketach. Świetnie nadaje się na:

- statyczne pliki strony,
- backup,
- logi,
- zdjęcia i assety,
- paczki instalacyjne,
- data lake.

S3 nie jest klasycznym filesystemem. Klucz obiektu może wyglądać jak `images/logo.png`, ale „katalog” jest logiczny.

Ważne funkcje:

- versioning,
- lifecycle rules,
- klasy storage,
- replication,
- Object Lock,
- presigned URLs,
- szyfrowanie SSE-S3 / SSE-KMS.

Przykłady:

```bash
aws s3 ls
aws s3 ls s3://moja-nazwa/
aws s3 cp plik.zip s3://moja-nazwa/releases/
aws s3 sync ./public s3://moja-strona/
```

Nigdy nie zakładaj, że bucket jest prywatny tylko dlatego, że nikt nie zna jego nazwy.

## 8. EBS i EFS

**EBS** to dysk blokowy dla EC2. Zachowuje się podobnie do dysku podłączonego do serwera. Możesz robić snapshoty.

**EFS** to współdzielony, zarządzany filesystem NFS. Przydaje się, gdy wiele maszyn/kontenerów musi widzieć te same pliki.

Do danych aplikacyjnych często lepiej użyć S3 lub bazy niż trzymać stan na lokalnym dysku kontenera.

## 9. RDS i Aurora

RDS uruchamia zarządzane bazy:

- PostgreSQL,
- MySQL,
- MariaDB,
- SQL Server,
- Oracle,
- Db2 w wybranych wariantach.

AWS zarządza dużą częścią infrastruktury, backupami i mechanizmami HA, ale ty nadal odpowiadasz za schemat, indeksy, zapytania i sensowne parametry.

**Aurora** to silnik AWS zgodny z PostgreSQL/MySQL API, zaprojektowany specjalnie pod chmurę.

Dobre praktyki:

- Multi-AZ dla ważnej produkcji,
- automatyczne backupy,
- prywatny subnet,
- dostęp z Security Group aplikacji,
- credentials w Secrets Manager,
- monitoruj storage, CPU, connections, replication lag.

## 10. DynamoDB

DynamoDB to zarządzana baza NoSQL typu key-value/document. Jest świetna do ogromnej skali i przewidywalnego dostępu po kluczu, ale wymaga innego sposobu modelowania niż SQL.

Nie zaczynaj projektu od DynamoDB tylko dlatego, że jest „cloud native”. Jeżeli dane są relacyjne i zespół zna PostgreSQL, RDS PostgreSQL bywa rozsądniejszy.

## 11. ECS, EKS i Fargate

### ECS

AWS-owy orchestrator kontenerów. Prostszym wyborem niż Kubernetes, jeśli system jest mocno związany z AWS.

### EKS

Zarządzany Kubernetes. Daje standard Kubernetes, ale dochodzi koszt i złożoność klastra.

### Fargate

Uruchamia kontenery bez zarządzania worker nodes. Można go używać z ECS i EKS.

Dla małego backendu w Go:

```text
GitHub
  -> build Docker image
  -> ECR
  -> ECS Fargate
  -> ALB
  -> Route 53
```

To bardzo sensowny układ dla aplikacji, która ma działać stale, ale nie chcesz administrować VM.

## 12. Lambda

Lambda uruchamia funkcje na żądanie. Typowe zastosowania:

- małe API,
- webhooki,
- obróbka pliku wrzuconego do S3,
- zadania cron/event-driven,
- integracje,
- automatyzacja.

Nie jest idealna do każdego backendu. Długie procesy, duży lokalny stan lub wymagania dotyczące stałego procesu mogą bardziej pasować do kontenera/VM.

## 13. Route 53, CloudFront, ALB i API Gateway

**Route 53** — DNS i health checks.  
**CloudFront** — CDN na edge.  
**ALB** — HTTP/HTTPS load balancer warstwy 7.  
**NLB** — wydajny load balancer TCP/UDP.  
**API Gateway** — zarządzana brama API, często przed Lambda.

Typowa strona:

```text
DNS Route 53
 -> CloudFront
 -> ALB lub S3
```

## 14. IAM — najważniejsza usługa bezpieczeństwa

IAM odpowiada na pytania:

- kto,
- może wykonać jaką akcję,
- na jakim zasobie,
- pod jakimi warunkami.

Elementy:

- users,
- groups,
- roles,
- policies,
- service roles,
- resource-based policies.

Przykładowa polityka jest JSON-em. Zasada numer jeden: **least privilege**.

Unikaj długowiecznych Access Keys, jeśli można użyć roli, SSO albo krótkotrwałych credentials.

Dla pracowników organizacji warto używać IAM Identity Center zamiast tworzyć każdemu IAM Usera.

## 15. Secrets Manager, Parameter Store, KMS

- **Secrets Manager** — hasła, tokeny, credentials, rotacja sekretów.
- **SSM Parameter Store** — konfiguracja i prostsze sekrety.
- **KMS** — zarządzanie kluczami szyfrującymi.

Nie wkładaj sekretów do obrazu Dockera, repo Git ani pliku `.env` publikowanego razem z aplikacją.

## 16. CloudWatch i CloudTrail

**CloudWatch** zbiera:

- metryki,
- logi,
- alarmy,
- dashboardy.

**CloudTrail** zapisuje historię wywołań API. To jedna z pierwszych rzeczy, do których zaglądasz przy pytaniu „kto zmienił ten zasób?”.

Przykład alarmów:

- CPU > 80%,
- brak zdrowych targetów ALB,
- RDS free storage poniżej progu,
- liczba błędów 5xx,
- koszty powyżej budżetu.

## 17. AWS CLI

Instalujesz AWS CLI v2, a następnie konfigurujesz dostęp.

```bash
aws configure
aws sts get-caller-identity
aws configure list
```

`aws sts get-caller-identity` to bardzo dobre polecenie diagnostyczne: pokazuje, jako kto aktualnie działasz.

Profile:

```bash
aws configure --profile dev
AWS_PROFILE=dev aws sts get-caller-identity
```

Pomoc:

```bash
aws help
aws ec2 help
aws s3api help
```

## 18. Infrastructure as Code

W produkcji zasoby powinny być odtwarzalne z kodu.

Najpopularniejsze opcje:

- Terraform / OpenTofu,
- AWS CloudFormation,
- AWS CDK.

Przykładowy workflow:

```text
kod aplikacji -> Git
infrastruktura -> Terraform
CI -> test -> build image -> ECR
CD -> terraform/app deploy
```

Ręczne klikanie w konsoli jest świetne do nauki i eksperymentu. Stała infrastruktura powinna szybko przejść do IaC.

## 19. ECR i pipeline CI/CD

**ECR** przechowuje obrazy kontenerów.

Przykładowy przebieg:

```text
1. git push
2. GitHub Actions uruchamia testy
3. docker build
4. push do ECR
5. ECS dostaje nową task definition
6. rolling deployment
```

Do autoryzacji GitHub Actions warto użyć OIDC zamiast trwałego AWS Access Key.

## 20. AI: Bedrock i SageMaker

**Amazon Bedrock** udostępnia modele generatywne i narzędzia do budowania aplikacji LLM bez samodzielnego hostowania modeli.  
**SageMaker** jest szerszą platformą ML do trenowania, hostowania, pipeline'ów i zarządzania modelami.

Dla zwykłej aplikacji korzystającej z LLM Bedrock jest zazwyczaj prostszy. Dla pełnego workflow data science/ML częściej wchodzi SageMaker.

## 21. Typowe architektury

### Mała strona statyczna

```text
Route 53 -> CloudFront -> S3
```

### Backend Go + PostgreSQL

```text
Route 53
 -> ALB
 -> ECS Fargate (2 taski w 2 AZ)
 -> RDS PostgreSQL Multi-AZ
 -> S3 na pliki
 -> Secrets Manager
 -> CloudWatch
```

### Prosty serverless API

```text
Route 53
 -> API Gateway
 -> Lambda
 -> DynamoDB
```

### Klasyczny VPS w AWS

```text
EC2 + EBS + Elastic IP + Security Group
```

Możliwe, ale AWS robi się wtedy drogim odpowiednikiem VPS-a i nie wykorzystujesz większości jego zalet.

## 22. Koszty — gdzie ludzie wpadają

Koszt może pochodzić z:

- czasu działania EC2,
- storage,
- snapshotów,
- NAT Gateway,
- transferu wychodzącego,
- load balancerów,
- requestów do usług,
- baz danych,
- logów,
- GPU.

Ustaw od razu:

- AWS Budgets,
- alert kosztowy,
- tagi `project`, `owner`, `environment`,
- regularny przegląd Cost Explorer.

Szczególnie pilnuj zasobów „zapomnianych”: EBS, Elastic IP, NAT Gateway, stare snapshoty, RDS i load balancery.

## 23. Reserved, Savings Plans i Spot

- **On-Demand** — bez zobowiązań.
- **Savings Plans / Reserved** — taniej w zamian za zobowiązanie.
- **Spot** — bardzo tanio, ale instancja może zostać odebrana.

Spot świetnie pasuje do batchy, workerów i zadań odpornych na przerwanie. Nie wrzucaj jedynej bazy produkcyjnej na mechanizm, który może zniknąć.

## 24. Backup i disaster recovery

Backup to nie to samo co HA.

Rozważ:

- snapshoty EBS,
- backup RDS,
- versioning S3,
- cross-region replication dla naprawdę krytycznych danych,
- AWS Backup,
- test odtwarzania.

Backup, którego nigdy nie odtworzyłeś testowo, jest tylko nadzieją.

## 25. Bezpieczeństwo — minimum

- MFA/SSO dla ludzi.
- Root account tylko do wyjątkowych operacji.
- Nie używaj root access keys.
- Least privilege w IAM.
- Role zamiast trwałych kluczy.
- S3 Block Public Access, jeśli nie ma jawnego powodu inaczej.
- Bazy w prywatnych subnetach.
- Sekrety w Secrets Manager/SSM.
- Szyfrowanie EBS/S3/RDS.
- CloudTrail.
- WAF tam, gdzie aplikacja publiczna tego wymaga.
- Regularne łatki na EC2.
- Budżety i alerty kosztowe — przejęte konto AWS może kosztować realne pieniądze.

## 26. Co wybrać dla małego projektu

Dla projektu hobbystycznego lub portfolio:

- statyczny frontend: S3 + CloudFront,
- mały backend: App Runner albo ECS Fargate,
- prosty webhook: Lambda,
- relacyjna baza: RDS PostgreSQL,
- pliki: S3,
- domena: Route 53 lub zewnętrzny DNS,
- sekrety: Secrets Manager.

Jeżeli celem jest po prostu jeden tani serwer z Dockerem, klasyczny VPS może być prostszy i tańszy. AWS zaczyna błyszczeć, gdy potrzebujesz skalowania, automatyzacji, usług zarządzanych i integracji między nimi.

## 27. Co powinien umieć początkujący administrator AWS

Po pierwszym etapie powinieneś potrafić:

1. rozróżnić region, AZ, konto, VPC i subnet,
2. uruchomić EC2 i połączyć się bezpiecznie,
3. skonfigurować Security Group,
4. korzystać z S3,
5. uruchomić RDS PostgreSQL,
6. odczytać logi i metryki w CloudWatch,
7. rozumieć IAM roles/policies,
8. używać AWS CLI,
9. wdrożyć prosty kontener,
10. odtworzyć infrastrukturę Terraformem,
11. znaleźć źródło kosztu.

## 28. Ściąga poleceń

```bash
# kim jestem
aws sts get-caller-identity

# regiony
aws ec2 describe-regions

# EC2
aws ec2 describe-instances

# sieci
aws ec2 describe-vpcs
aws ec2 describe-subnets
aws ec2 describe-security-groups

# S3
aws s3 ls
aws s3 cp file.txt s3://bucket/
aws s3 sync ./dir s3://bucket/path/

# RDS
aws rds describe-db-instances

# ECS
aws ecs list-clusters
aws ecs list-services --cluster CLUSTER

# Lambda
aws lambda list-functions

# IAM
aws iam list-roles

# logi
aws logs describe-log-groups
```

## 29. Słownik nazw AWS

- **EC2** — VM.
- **AMI** — obraz maszyny.
- **EBS** — dysk blokowy.
- **S3** — object storage.
- **VPC** — sieć prywatna.
- **SG** — Security Group.
- **ALB/NLB** — load balancer.
- **ECS** — orkiestracja kontenerów AWS.
- **EKS** — Kubernetes.
- **ECR** — registry obrazów.
- **RDS** — zarządzane SQL.
- **Lambda** — funkcje serverless.
- **IAM** — identity/access.
- **KMS** — klucze szyfrujące.
- **CloudWatch** — obserwowalność.
- **CloudTrail** — audyt API.
- **Route 53** — DNS.

## 30. Źródła i dalsza nauka

- Dokumentacja AWS: https://docs.aws.amazon.com/
- IAM: https://docs.aws.amazon.com/iam/
- AWS CLI: https://docs.aws.amazon.com/cli/
- Architecture Center: https://aws.amazon.com/architecture/
- Well-Architected Framework: https://aws.amazon.com/architecture/well-architected/
- Pricing Calculator: https://calculator.aws/

---

### Najważniejsza myśl

Nie ucz się AWS jako listy kilkuset nazw. Naucz się najpierw pięciu warstw: **tożsamość, sieć, compute, dane, obserwowalność**. Reszta usług jest zwykle wyspecjalizowaną odmianą jednego z tych problemów.
