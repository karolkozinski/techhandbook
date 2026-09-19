# gcp

> Aktualizacja: 2026-09-19  
> Cel: zrozumieć Google Cloud jako platformę do VM, kontenerów, serverless, danych, AI i aplikacji webowych.

## 1. Czym jest Google Cloud

Google Cloud to jedna z trzech największych globalnych platform chmurowych. Szczególnie silne obszary to kontenery/Kubernetes, data analytics, BigQuery, sieć globalna, serverless Cloud Run oraz AI/Vertex AI.

Podobnie jak w innych chmurach, konsola jest tylko klientem API. Prawdziwym modelem operacyjnym są zasoby, IAM, projekty, API i automatyzacja.

## 2. Hierarchia zasobów

Typowa struktura:

```text
Organization
└── Folder
    └── Project
        ├── Compute Engine
        ├── Cloud Storage
        ├── Cloud SQL
        └── Cloud Run
```

**Project** jest podstawową granicą zasobów, API, IAM i rozliczeń. Każdy projekt ma unikalny `project_id`.

W większej organizacji foldery porządkują projekty według zespołów, środowisk lub jednostek biznesowych.

## 3. Regiony i strefy

GCP rozróżnia:

- **region** — obszar geograficzny,
- **zone** — strefę wewnątrz regionu,
- zasoby regionalne,
- zasoby zonalne,
- zasoby globalne.

Ciekawostka istotna operacyjnie: sieci VPC w GCP są zasobami globalnymi, a subnety regionalnymi.

## 4. Najważniejsze usługi — mapa

| Potrzeba | Google Cloud |
|---|---|
| VM | Compute Engine |
| Autoscaling VM | Managed Instance Groups |
| Object storage | Cloud Storage |
| Dyski | Persistent Disk / Hyperdisk |
| Filesystem | Filestore |
| Sieć | VPC |
| Firewall | VPC firewall rules/policies |
| Kontenery serverless | Cloud Run |
| Kubernetes | GKE |
| Funkcje | Cloud Run functions / Cloud Functions |
| Registry | Artifact Registry |
| Relacyjna DB | Cloud SQL |
| Globalna relacyjna DB | Spanner |
| NoSQL dokumentowy | Firestore |
| Hurtownia danych | BigQuery |
| Cache | Memorystore |
| Messaging | Pub/Sub |
| Workflow/eventy | Eventarc / Workflows |
| DNS | Cloud DNS |
| Load balancing | Cloud Load Balancing |
| CDN | Cloud CDN |
| IAM | Cloud IAM |
| Sekrety | Secret Manager |
| Klucze | Cloud KMS |
| Monitoring | Cloud Monitoring |
| Logi | Cloud Logging |
| Audyt | Cloud Audit Logs |
| IaC | Terraform / Infrastructure Manager |
| AI/ML | Vertex AI |

## 5. Project i włączanie API

W GCP niektóre usługi wymagają jawnego włączenia API w projekcie.

Przykładowo:

```bash
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

To ważny element modelu GCP: projekt ma listę aktywnych API, które można kontrolować politykami.

## 6. Compute Engine

Compute Engine to VM.

Wybierasz:

- machine type,
- obraz,
- zone,
- boot disk,
- VPC/subnet,
- service account,
- firewall/network tags.

Przykłady:

```bash
gcloud compute instances list
gcloud compute instances describe NAZWA --zone=europe-west1-b
```

Google oferuje również preemptible/Spot VMs do zadań odpornych na przerwanie.

## 7. VPC

GCP VPC ma ciekawy model: sama sieć jest globalna, a subnety są regionalne.

Elementy:

- VPC,
- subnets,
- routes,
- firewall rules/policies,
- Cloud NAT,
- Cloud Router,
- Private Service Connect,
- VPC Peering,
- Cloud VPN,
- Cloud Interconnect.

Przykład:

```text
Global Load Balancer
  |
Cloud Run / GKE / MIG
  |
private connectivity
  |
Cloud SQL
```

## 8. Firewall

Reguły firewall kontrolują ruch do/z instancji. W nowych projektach warto myśleć o politykach hierarchicznych i zasadzie least privilege.

Nie opieraj bezpieczeństwa wyłącznie na tagach sieciowych; ważne jest połączenie IAM, service accounts, firewalli i prywatnych endpointów.

## 9. Cloud Storage

Cloud Storage to object storage odpowiednik S3/Blob/OSS.

Zastosowania:

- assety,
- backupy,
- statyczne pliki,
- archiwa,
- data lake,
- wejście/wyjście pipeline'ów.

Podstawy:

```bash
gcloud storage buckets list
gcloud storage ls gs://bucket
gcloud storage cp file.zip gs://bucket/releases/
```

Funkcje:

- storage classes,
- lifecycle,
- versioning,
- retention policies,
- signed URLs,
- IAM.

## 10. Persistent Disk i Filestore

**Persistent Disk/Hyperdisk** — storage blokowy dla VM.  
**Filestore** — zarządzany filesystem NFS.

Nie używaj dysku VM jako jedynego miejsca na krytyczne dane bez snapshotów i planu odtwarzania.

## 11. Cloud Run — jedna z najważniejszych usług GCP

Cloud Run uruchamia kontener i automatycznie skaluje go, nawet do zera.

To świetna usługa dla:

- API Go/Node/Python,
- małych serwisów,
- webhooków,
- workerów,
- aplikacji HTTP.

Typowy przepływ:

```text
GitHub
 -> build image
 -> Artifact Registry
 -> Cloud Run
 -> Cloud SQL
```

Cloud Run jest jednym z najprostszych sposobów na przeniesienie własnego kontenera do dużej chmury bez zarządzania klastrem.

## 12. GKE

Google Kubernetes Engine to zarządzany Kubernetes. Google ma wyjątkowo mocne doświadczenie w tym obszarze.

Tryby i konfiguracje zależą od potrzeb, ale ogólna zasada pozostaje: Kubernetes warto brać, gdy jego możliwości są potrzebne. Do jednej aplikacji Cloud Run jest często znacznie prostszy.

## 13. Cloud Functions / Cloud Run functions

Funkcje serverless nadają się do:

- triggerów,
- webhooków,
- prostych API,
- reakcji na Pub/Sub,
- automatyzacji.

Granica między funkcją a Cloud Run jest coraz mniej istotna operacyjnie; w obu przypadkach chodzi o zarządzane uruchamianie kodu bez własnego serwera.

## 14. Artifact Registry

Przechowuje obrazy kontenerów i paczki.

```text
Docker build -> Artifact Registry -> Cloud Run/GKE
```

To standardowy element pipeline'u.

## 15. Cloud SQL

Cloud SQL dostarcza zarządzane:

- PostgreSQL,
- MySQL,
- SQL Server.

Najważniejsze:

- HA,
- backup,
- private IP,
- kontrola połączeń,
- automatyczne maintenance windows,
- monitoring.

Dla aplikacji Cloud Run można używać mechanizmów bezpiecznego połączenia bez wystawiania bazy publicznie.

## 16. Spanner

Spanner jest rozproszoną, skalowalną relacyjną bazą danych do systemów, które potrzebują bardzo dużej skali i wysokiej dostępności.

Nie jest domyślnym wyborem dla małego projektu. To narzędzie do problemów, których zwykły PostgreSQL często jeszcze długo nie ma.

## 17. Firestore

Firestore to zarządzana baza dokumentowa NoSQL, popularna w aplikacjach web/mobile i Firebase.

Dobrze pasuje do danych dokumentowych i aplikacji realtime, ale projekt modelu danych różni się od SQL.

## 18. BigQuery

BigQuery to jedna z najbardziej charakterystycznych usług Google Cloud: serverless data warehouse do analizy ogromnych zbiorów danych SQL-em.

Przykład zastosowania:

```text
logi / eventy / dane sprzedażowe
 -> BigQuery
 -> SQL / dashboard / ML
```

Koszt zależy m.in. od storage i ilości przetwarzanych danych/modelu rozliczeń, więc źle napisane zapytanie może być drogie.

## 19. Pub/Sub

Pub/Sub to skalowalny messaging/event system.

```text
publisher -> topic -> subscription -> consumer
```

Używaj do luźnego sprzęgania usług, eventów i przetwarzania asynchronicznego.

## 20. IAM

Google Cloud IAM odpowiada na:

```text
principal + role + resource
```

Principalem może być:

- użytkownik,
- grupa,
- service account,
- tożsamość federowana.

Role mogą być:

- basic,
- predefined,
- custom.

Zasada: unikaj szerokich ról typu Owner/Editor w codziennej pracy.

## 21. Service Accounts

Service Account to tożsamość workloadu/aplikacji.

Zamiast trzymać plik JSON z długowiecznym kluczem, używaj mechanizmów przypisania tożsamości do uruchamianego zasobu lub Workload Identity Federation.

To jeden z najważniejszych wzorców bezpieczeństwa w GCP.

## 22. Secret Manager i KMS

**Secret Manager** — sekrety aplikacji.  
**Cloud KMS** — klucze kryptograficzne.

Aplikacja powinna pobierać sekret dzięki swojej tożsamości IAM, nie przez hardcoded password.

## 23. Cloud Logging i Monitoring

**Cloud Logging** — centralne logi.  
**Cloud Monitoring** — metryki, alerty, dashboardy.  
**Cloud Trace / Profiler** — dodatkowa obserwowalność.  
**Audit Logs** — historia istotnych operacji administracyjnych.

Ustawiaj alerty na objawy ważne biznesowo, a nie tylko na CPU.

Przykłady:

- 5xx,
- latency,
- brak zdrowych instancji,
- kolejka rośnie,
- Cloud Run error rate,
- brak miejsca w DB,
- budżet.

## 24. gcloud CLI

Podstawy:

```bash
gcloud auth login
gcloud auth list
gcloud config list
gcloud projects list
gcloud config set project PROJECT_ID
```

Compute:

```bash
gcloud compute instances list
```

Cloud Run:

```bash
gcloud run services list
```

Storage:

```bash
gcloud storage buckets list
```

Pomoc:

```bash
gcloud help
gcloud compute --help
gcloud run --help
```

## 25. Terraform

Google Cloud jest bardzo dobrze obsługiwany przez Terraform/OpenTofu.

Typowy model:

```text
project bootstrap
 -> IAM
 -> VPC
 -> Artifact Registry
 -> Cloud Run
 -> Cloud SQL
 -> Monitoring
```

Infrastructure as Code jest szczególnie ważne, gdy projekty dev/stage/prod mają mieć podobną strukturę.

## 26. Load Balancing, CDN i DNS

- **Cloud Load Balancing** — globalny/regionalny load balancing zależnie od typu.
- **Cloud CDN** — cache na edge.
- **Cloud DNS** — zarządzany DNS.
- **Cloud Armor** — polityki bezpieczeństwa/WAF/DDoS na warstwie aplikacyjnej.

## 27. Vertex AI

Vertex AI jest główną platformą Google do AI/ML, w tym generative AI.

Obejmuje m.in.:

- modele generatywne,
- endpointy,
- narzędzia do trenowania,
- ewaluację,
- pipelines,
- integrację z danymi.

GCP jest naturalnym wyborem, gdy system mocno korzysta z BigQuery, danych i modeli Google.

## 28. Przykładowe architektury

### Mała aplikacja Go

```text
Cloud DNS
 -> HTTPS Load Balancer lub bezpośrednio Cloud Run
 -> Cloud Run
 -> Cloud SQL PostgreSQL
 -> Cloud Storage
 -> Secret Manager
 -> Cloud Logging/Monitoring
```

### Data pipeline

```text
Pub/Sub
 -> Dataflow / Cloud Run
 -> BigQuery
 -> Looker / analiza SQL
```

### Kubernetes

```text
Load Balancer
 -> GKE
 -> Cloud SQL / Spanner
 -> Cloud Storage
```

## 29. Koszty

Najczęstsze źródła kosztu:

- VM i GPU,
- bazy danych,
- BigQuery queries,
- storage,
- egress,
- load balancing,
- log ingestion/retention,
- Cloud Run przy dużym ruchu,
- usługi AI.

Ustaw:

- Billing Account,
- Budgets & Alerts,
- labels,
- eksport billing data do BigQuery, jeśli chcesz robić dokładniejsze analizy kosztowe.

## 30. Organizacja projektów

Dobry wzorzec enterprise:

```text
Organization
├── folder: production
│   ├── app1-prod
│   └── app2-prod
├── folder: nonproduction
│   ├── app1-dev
│   └── app1-stage
└── folder: shared
```

Separate projects są wygodnym mechanizmem izolacji uprawnień, quota i billing.

## 31. Bezpieczeństwo — minimum

- MFA/federacja dla ludzi.
- IAM least privilege.
- Service Accounts dla workloadów.
- Bez długowiecznych service-account keys, jeśli istnieje federacja/tożsamość workloadu.
- Secret Manager.
- Prywatna baza.
- VPC/firewall.
- Audit Logs.
- Organization Policies w większym środowisku.
- Cloud Armor dla publicznych aplikacji wymagających WAF.
- Budżety.

## 32. Typowe pułapki

1. Jeden projekt do wszystkiego.
2. Role Owner/Editor dla całego zespołu.
3. Klucze service account w repo.
4. Publiczny Cloud SQL bez powodu.
5. Brak limitów kosztowych i analizy BigQuery.
6. Włączanie Kubernetes, gdy Cloud Run wystarcza.
7. Niezrozumienie różnicy global VPC vs regional subnet.
8. Brak kontroli egressu.

## 33. Co wybrać dla małego projektu

Najbardziej przyjazny wariant:

```text
Cloud Run + Cloud SQL PostgreSQL + Cloud Storage + Secret Manager
```

Frontend statyczny może trafić do Cloud Storage/CDN albo platformy Firebase zależnie od charakteru projektu.

VM wybierz, gdy naprawdę chcesz administrować systemem lub potrzebujesz niestandardowego środowiska.

## 34. Ściąga CLI

```bash
gcloud auth login
gcloud projects list
gcloud config set project PROJECT_ID
gcloud services list --enabled
gcloud compute instances list
gcloud compute networks list
gcloud run services list
gcloud sql instances list
gcloud storage buckets list
gcloud artifacts repositories list
gcloud iam service-accounts list
```

## 35. Co powinien umieć początkujący administrator GCP

- rozumieć Organization/Folder/Project,
- rozumieć region/zone,
- uruchomić VM,
- zbudować podstawową VPC,
- użyć Cloud Storage,
- wdrożyć kontener do Cloud Run,
- uruchomić Cloud SQL,
- skonfigurować IAM i Service Account,
- użyć Secret Manager,
- znaleźć logi i metryki,
- używać `gcloud`,
- tworzyć zasoby Terraformem,
- kontrolować billing.

## 36. Źródła i dalsza nauka

- Google Cloud Docs: https://cloud.google.com/docs
- Architecture Center: https://cloud.google.com/architecture
- gcloud CLI: https://cloud.google.com/sdk/gcloud
- Well-Architected Framework: https://cloud.google.com/architecture/framework
- Pricing Calculator: https://cloud.google.com/products/calculator

---

### Najważniejsza myśl

W GCP warto zacząć od **Project + IAM + VPC**, a potem nauczyć się **Cloud Run, Cloud Storage i Cloud SQL**. To daje bardzo dużą część praktycznej wiedzy potrzebnej do uruchomienia współczesnej aplikacji.
