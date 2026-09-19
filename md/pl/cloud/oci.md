# oci

> Aktualizacja: 2026-09-19  
> Cel: poznać OCI od podstaw — tenancy, compartments, VCN, Compute, storage, bazy Oracle/PostgreSQL/MySQL, kontenery, IAM, CLI i automatyzację.

## 1. Czym jest OCI

Oracle Cloud Infrastructure to globalna chmura IaaS/PaaS Oracle. Jest szczególnie istotna w środowiskach korzystających z baz Oracle, systemów enterprise, HPC, bare metal i infrastruktury AI/GPU.

OCI ma te same podstawowe klocki co AWS/Azure/GCP, ale używa własnych nazw. Najważniejsze jest zrozumienie: **tenancy → compartments → region → VCN → compute/data → IAM**.

## 2. Hierarchia

Po utworzeniu konta otrzymujesz **tenancy**.

```text
Tenancy
└── Compartment
    ├── VCN
    ├── Compute Instance
    ├── Database
    ├── Object Storage
    └── Load Balancer
```

**Compartment** jest bardzo ważnym pojęciem OCI. To logiczny kontener do organizowania zasobów, IAM i kosztów.

Przykład:

```text
root compartment
├── prod
├── dev
├── network
└── security
```

## 3. Regiony, Availability Domains i Fault Domains

OCI używa pojęć:

- **Region** — obszar geograficzny,
- **Availability Domain (AD)** — niezależna domena dostępności,
- **Fault Domain (FD)** — dodatkowa separacja sprzętowa wewnątrz AD.

Dostępność liczby AD zależy od regionu.

## 4. Najważniejsze usługi — mapa

| Potrzeba | OCI |
|---|---|
| VM / bare metal | Compute |
| Autoscaling | Autoscaling |
| Object storage | Object Storage |
| Dyski | Block Volume |
| Filesystem | File Storage |
| Sieć | Virtual Cloud Network (VCN) |
| Firewall | Security Lists / Network Security Groups |
| NAT | NAT Gateway |
| Internet | Internet Gateway |
| Load balancer | Load Balancer / Network Load Balancer |
| DNS | OCI DNS |
| Kubernetes | OKE |
| Kontenery bez K8s | Container Instances |
| Registry | OCIR |
| Serverless | Functions |
| Baza Oracle | Base Database / Exadata / Autonomous Database |
| MySQL | MySQL HeatWave |
| PostgreSQL | OCI Database with PostgreSQL / usługi zależne od regionu |
| Cache | OCI Cache / Redis-compatible offerings zależnie od portfolio |
| IAM | OCI IAM / Identity Domains |
| Sekrety | Vault |
| Monitoring | Monitoring |
| Logi | Logging |
| Audyt | Audit |
| IaC | Terraform / Resource Manager |
| AI | Generative AI / Data Science / AI Infrastructure |

## 5. Compute

OCI Compute oferuje:

- VM,
- bare metal,
- różne shape'y CPU/RAM,
- elastyczne shape'y w części rodzin,
- GPU.

Tworząc instancję wybierasz:

1. image,
2. shape,
3. VCN/subnet,
4. public/private IP,
5. boot volume,
6. SSH key,
7. opcjonalnie instance principal/dynamic group.

CLI:

```bash
oci compute instance list --compartment-id OCID
```

Każdy zasób OCI ma zwykle identyfikator **OCID**.

## 6. OCID

OCID to unikalny Oracle Cloud Identifier.

Przykładowo narzędzia CLI często wymagają:

- tenancy OCID,
- user OCID,
- compartment OCID,
- subnet OCID,
- instance OCID.

Warto szybko przyzwyczaić się do pracy na tych identyfikatorach.

## 7. VCN

Virtual Cloud Network to odpowiednik VPC/VNet.

Elementy:

- VCN,
- regionalne subnety,
- route tables,
- Internet Gateway,
- NAT Gateway,
- Service Gateway,
- DRG (Dynamic Routing Gateway),
- Network Security Groups,
- Security Lists,
- peering.

Typowa aplikacja:

```text
Internet
 -> Load Balancer
 -> private app subnet
 -> private DB subnet
```

## 8. Security Lists i NSG

**Security List** działa na poziomie subnetu.  
**Network Security Group** grupuje reguły dla konkretnych VNIC/zasobów i jest zwykle wygodniejszy do precyzyjnego modelowania aplikacji.

Przykład:

```text
LB NSG: 443 z Internetu
APP NSG: 8080 tylko z LB NSG
DB NSG: 1521/5432 tylko z APP NSG
```

## 9. Object Storage

Object Storage służy do:

- backupów,
- assetów,
- archiwów,
- danych aplikacyjnych,
- data lake.

Ma klasy storage i mechanizmy lifecycle. Nie jest zwykłym dyskiem POSIX.

CLI:

```bash
oci os ns get
oci os bucket list --compartment-id OCID
oci os object list --bucket-name BUCKET
```

## 10. Block Volume i File Storage

**Block Volume** — dyski blokowe dla Compute.  
**File Storage** — współdzielony system plików.

Snapshot/backup woluminu nie zastępuje backupu spójnego aplikacyjnie dla każdej bazy, ale jest ważnym elementem DR.

## 11. Oracle Database

Tu OCI ma naturalną przewagę kompetencyjną: szerokie portfolio Oracle Database.

W zależności od wymagań dostępne są m.in.:

- Autonomous Database,
- Base Database Service,
- Exadata Database Service,
- rozwiązania dedicated/enterprise.

Dla firm mających ciężkie systemy Oracle migracja do OCI może być naturalnym kierunkiem.

## 12. Autonomous Database

Autonomous Database automatyzuje dużą część administracji, patchingu, backupów i skalowania.

Nie oznacza to, że nie trzeba znać SQL, modelu danych i wydajności zapytań. „Autonomous” dotyczy infrastruktury/operacji, nie logiki biznesowej.

## 13. MySQL HeatWave

MySQL HeatWave łączy zarządzany MySQL z mechanizmami analitycznymi/akceleracją. Jest istotnym elementem portfolio OCI poza klasycznym Oracle Database.

## 14. OKE

Oracle Kubernetes Engine to zarządzany Kubernetes.

Typowy pipeline:

```text
GitHub/CI
 -> image
 -> OCIR
 -> OKE
 -> Load Balancer
```

Podobnie jak w innych chmurach: nie wybieraj Kubernetes automatycznie do jednej małej aplikacji.

## 15. Container Instances

Container Instances pozwalają uruchamiać kontenery bez zarządzania pełnym klastrem Kubernetes. Dla prostych usług może to być znacznie lżejszy wybór niż OKE.

## 16. Functions

OCI Functions to serverless functions. Dobre do:

- event-driven processing,
- integracji,
- krótkich API,
- automatyzacji.

## 17. OCIR

Oracle Cloud Infrastructure Registry przechowuje obrazy kontenerów.

Schemat:

```text
docker build -> OCIR -> OKE / Container Instances / Functions workflow
```

## 18. IAM

OCI IAM korzysta z:

- users,
- groups,
- policies,
- dynamic groups,
- identity domains,
- compartments.

Polityki mają własną składnię, np. koncepcyjnie:

```text
Allow group Developers to manage instances in compartment Dev
```

To czytelny model: kto może wykonać jaki zakres operacji w danym compartment.

## 19. Dynamic Groups i Instance Principals

Workloady mogą dostać uprawnienia bez przechowywania statycznych credentials.

Przykład:

```text
Compute Instance
 -> Dynamic Group
 -> IAM Policy
 -> Object Storage
```

To odpowiednik wzorca managed/workload identity z innych chmur.

## 20. Vault

OCI Vault przechowuje klucze i sekrety.

Nie trzymaj haseł do DB i API keys w obrazie kontenera lub repo. Nadaj aplikacji minimalne uprawnienie do konkretnego sekretu.

## 21. Monitoring, Logging i Audit

- **Monitoring** — metryki i alarmy.
- **Logging** — logi usług i aplikacji.
- **Audit** — historia wywołań API/zdarzeń administracyjnych.

W praktyce pierwsze dashboardy powinny obejmować:

- CPU/RAM tam, gdzie metryka jest dostępna,
- latency/error rate,
- stan LB,
- DB,
- storage,
- koszty i quota.

## 22. Load Balancer

OCI ma klasyczny Load Balancer oraz Network Load Balancer.

- Load Balancer — HTTP/HTTPS i funkcje warstwy aplikacyjnej.
- NLB — wysoka wydajność L4.

Publiczną aplikację projektuj tak, aby backend nie musiał mieć publicznych IP.

## 23. DNS

OCI DNS obsługuje publiczne i prywatne strefy DNS. Domenę możesz trzymać u zewnętrznego rejestratora i delegować DNS do OCI.

## 24. OCI CLI

CLI jest narzędziem Pythonowym/cross-platform.

Konfiguracja tworzy zwykle plik `~/.oci/config`.

Podstawy:

```bash
oci --help
oci iam region list
oci compute instance list --compartment-id OCID
oci os bucket list --compartment-id OCID
```

CLI ma rozbudowaną pomoc:

```bash
oci compute instance -h
oci os bucket create -?
```

## 25. Terraform i Resource Manager

OCI mocno wspiera Terraform. **Resource Manager** uruchamia stosy Terraform jako usługę zarządzaną.

Dobry model:

```text
infra repo
 -> Terraform
 -> VCN
 -> NSG
 -> Compute/OKE
 -> DB
 -> Logging
```

## 26. AI i GPU

OCI inwestuje mocno w infrastrukturę AI, GPU, bare metal i klastry sieciowe dla obciążeń modelowych.

Dla developera usługami wyższego poziomu są m.in. Generative AI i Data Science. Dla dużych klientów istotna jest także infrastruktura GPU jako surowa warstwa compute.

## 27. Przykładowe architektury

### Prosty backend

```text
DNS
 -> Load Balancer
 -> Container Instance / Compute
 -> PostgreSQL/MySQL/Oracle DB
 -> Object Storage
 -> Vault
 -> Logging
```

### Enterprise Oracle

```text
private connectivity
 -> app tier
 -> Exadata/Oracle Database
 -> Object Storage backups
```

### Kubernetes

```text
Load Balancer -> OKE -> DB/Object Storage
```

## 28. Koszty

OCI jest często rozważane ze względu na relację ceny do zasobów, szczególnie w wybranych typach compute/network, ale ceny trzeba zawsze sprawdzać dla konkretnego regionu i aktualnego cennika.

Pilnuj:

- compute,
- GPU,
- baz,
- boot/block volumes,
- load balancerów,
- transferu,
- Object Storage,
- logów.

Używaj Budgets i cost analysis.

## 29. Free Tier

OCI historycznie oferuje zasoby Always Free/Free Tier, ale zakres promocji i limity mogą się zmieniać. Przed projektowaniem środowiska „za zero” sprawdzaj aktualne zasady, region i dostępność capacity.

Nigdy nie buduj istotnego systemu na założeniu, że promocja cenowa będzie wieczna.

## 30. Bezpieczeństwo — minimum

- MFA/federacja.
- Compartmenty zamiast jednego wielkiego worka.
- Least privilege IAM policies.
- Dynamic Groups/Instance Principals zamiast kluczy.
- Vault.
- Prywatne subnety dla backendu i DB.
- NSG.
- Audit logs.
- Backup.
- Budżety i alerty.
- Regularne patchowanie Compute.

## 31. Typowe pułapki

1. Wszystko w root compartment.
2. Brak zrozumienia OCID.
3. Zbyt szerokie policy `manage all-resources`.
4. Publiczne IP na bazie.
5. Klucze API użytkownika na serwerze zamiast Instance Principal.
6. Brak kontroli quota/limits.
7. OKE do aplikacji, która nie potrzebuje Kubernetes.
8. Poleganie na Free Tier jako gwarancji architektury.

## 32. Co wybrać dla małego projektu

Jeżeli chcesz tylko hostować kontener:

```text
Container Instances + Object Storage + zarządzana DB
```

Jeżeli potrzebujesz pełnej kontroli:

```text
Compute VM
```

Jeśli projekt jest mocno oparty o Oracle Database, OCI robi się znacznie bardziej naturalnym kandydatem niż w typowej małej stronie internetowej.

## 33. Ściąga CLI

```bash
oci iam region list
oci iam availability-domain list
oci iam compartment list --compartment-id-in-subtree true
oci compute instance list --compartment-id OCID
oci network vcn list --compartment-id OCID
oci network subnet list --compartment-id OCID
oci os bucket list --compartment-id OCID
oci db system list --compartment-id OCID
oci ce container list --compartment-id OCID
```

## 34. Co powinien umieć początkujący administrator OCI

- wyjaśnić tenancy i compartment,
- znaleźć OCID,
- uruchomić Compute Instance,
- skonfigurować VCN/subnet/NSG,
- korzystać z Object Storage,
- rozumieć portfolio baz,
- używać Vault,
- zbudować policy IAM,
- użyć Instance Principal,
- czytać logi i Audit,
- używać OCI CLI,
- wdrażać Terraformem,
- kontrolować budżet.

## 35. Źródła i dalsza nauka

- OCI Documentation: https://docs.oracle.com/en-us/iaas/
- Getting Started: https://docs.oracle.com/en-us/iaas/Content/GSG/Reference/tutorials.htm
- OCI CLI: https://docs.oracle.com/en-us/iaas/Content/API/Concepts/cliconcepts.htm
- Architecture Center: https://docs.oracle.com/solutions/
- Pricing: https://www.oracle.com/cloud/pricing/

---

### Najważniejsza myśl

OCI przestaje wyglądać egzotycznie, gdy przetłumaczysz nazwy: **Tenancy = organizacja/konto główne, Compartment = logiczny obszar, VCN = VPC/VNet, Compute = VM, Object Storage = S3/Blob**. Reszta układa się już podobnie jak w innych hyperscalerach.
