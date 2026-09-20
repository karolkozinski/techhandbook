---
id: "doc-003"
title: "Alibaba Cloud"
slug: "alibaba-cloud"
description: "Alibaba Cloud - kompendium usług compute, sieci, storage, baz danych, kontenerów, serverless, IAM i specyfiki rynku chińskiego."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "cloud"
  - "alibaba"
---

# Alibaba Cloud

Alibaba Cloud używa tych samych podstawowych wzorców co inne duże chmury: regiony, prywatne sieci, compute, object storage, zarządzane bazy, Kubernetes, serverless i IAM. Największa różnica dla osoby znającej AWS/Azure/GCP to nazewnictwo usług oraz dodatkowy kontekst rynku chińskiego.

Powiązane tematy: [Sieci komputerowe dla developera](techhandbook:doc-016), [Docker](techhandbook:doc-012), [SQL i PostgreSQL](techhandbook:doc-010), [Linux permissions i bezpieczeństwo serwera](techhandbook:doc-025) oraz [CI/CD i GitHub Actions](techhandbook:doc-011).

## 1. Czym jest Alibaba Cloud

Alibaba Cloud (Aliyun) to duża publiczna platforma chmurowa i ważny dostawca na rynku chińskim. Oferuje klasyczne VM, sieci, storage, bazy, Kubernetes, serverless, CDN, security, analitykę i AI.

Jeżeli znasz AWS, wiele nazw ma bezpośrednie odpowiedniki:

```text
EC2 -> ECS
S3 -> OSS
IAM -> RAM
RDS -> ApsaraDB RDS
VPC -> VPC
CloudWatch -> CloudMonitor
CloudTrail -> ActionTrail
```

Uwaga: **ECS w Alibaba oznacza Elastic Compute Service**, czyli VM. Nie myl z Amazon ECS, gdzie ECS oznacza usługę kontenerową.

## 2. Kiedy Alibaba Cloud ma szczególny sens

- aplikacje kierowane na rynek Chin,
- infrastruktura w regionach azjatyckich,
- integracja z ekosystemem Alibaba,
- organizacje już używające Aliyun,
- workloady AI/data w ekosystemie Alibaba.

Dla projektu stricte europejskiego AWS/Azure/GCP zwykle mają większy lokalny ekosystem partnerów i kompetencji, ale Alibaba Cloud pozostaje pełnoprawnym hyperscalerem.

## 3. Regiony i zones

Model jest klasyczny:

- region,
- zone,
- zasoby regionalne/zonalne,
- VPC i vSwitch.

Przy usługach w Chinach trzeba dodatkowo brać pod uwagę lokalne wymogi prawne, dostępność usług oraz procesy związane z publicznym udostępnianiem stron, np. wymagania ICP zależnie od scenariusza.

## 4. Najważniejsze usługi - mapa

| Potrzeba | Alibaba Cloud |
|---|---|
| VM | Elastic Compute Service (ECS) |
| Autoscaling | Auto Scaling |
| Object storage | Object Storage Service (OSS) |
| Dyski | Elastic Block Storage / cloud disks |
| Pliki | NAS |
| Sieć | VPC |
| Subnet | vSwitch |
| Firewall instancji | Security Groups |
| Public IP | EIP |
| NAT | NAT Gateway |
| Load balancing | SLB / ALB / NLB |
| CDN | Alibaba Cloud CDN / DCDN |
| DNS | Alibaba Cloud DNS |
| Registry | Container Registry (ACR) |
| Kubernetes | ACK |
| Serverless | Function Compute |
| Relacyjna DB | ApsaraDB RDS |
| Cloud-native DB | PolarDB |
| NoSQL | Tair / MongoDB / Table Store zależnie od modelu |
| Messaging | RocketMQ / Message Queue |
| IAM | RAM |
| Sekrety/klucze | KMS / Secrets Manager |
| Monitoring | CloudMonitor |
| Audyt | ActionTrail |
| IaC | Terraform / ROS |
| AI | Model Studio / Qwen ecosystem |

## 5. ECS - Elastic Compute Service

ECS to VM. Instancja składa się z:

- instance type,
- image,
- storage,
- network,
- security group.

Rodziny instancji obejmują m.in. general purpose, compute-optimized, memory-optimized, storage-optimized, GPU i bare metal.

Przykładowe CLI:

```bash
aliyun ecs DescribeInstances --RegionId eu-central-1
```

Dokładne nazwy regionów i parametrów zawsze sprawdzaj w bieżącej dokumentacji.

## 6. VPC i vSwitch

**VPC** to prywatna sieć.  
**vSwitch** jest odpowiednikiem subnetu i działa w konkretnej zone.

Elementy:

- VPC,
- vSwitch,
- route table,
- security groups,
- EIP,
- NAT Gateway,
- VPN Gateway,
- CEN (Cloud Enterprise Network),
- PrivateLink.

Przykład:

```text
Internet
 -> ALB
 -> ECS/ACK w prywatnych vSwitchach
 -> RDS/PolarDB
```

## 7. Security Groups

Security Group kontroluje ruch instancji ECS i innych kompatybilnych zasobów.

Zasada jest podobna do AWS:

```text
ALB: 443 z Internetu
APP: port aplikacji tylko z warstwy LB
DB: port DB tylko z APP
```

Nie otwieraj SSH/RDP globalnie bez potrzeby.

## 8. OSS

Object Storage Service to odpowiednik S3.

Zastosowania:

- statyczne pliki,
- obrazy,
- backup,
- logi,
- archiwa,
- data lake.

Funkcje obejmują klasy storage, lifecycle, versioning, replication i mechanizmy dostępu czasowego.

W zależności od używanego narzędzia można korzystać z Alibaba Cloud CLI lub dedykowanych narzędzi OSS.

## 9. Cloud Disks i NAS

- cloud disk - storage blokowy dla ECS,
- NAS - zarządzany współdzielony filesystem.

Tak samo jak w innych chmurach: rozdzielaj storage aplikacyjny od efemerycznego filesystemu kontenera.

## 10. ApsaraDB RDS

RDS to zarządzane bazy relacyjne, zależnie od regionu i oferty obejmujące popularne silniki.

Cloud provider zarządza infrastrukturą, backupami i częścią HA; aplikacja nadal odpowiada za:

- schemat,
- indeksy,
- SQL,
- connection pooling,
- sensowny sizing.

## 11. PolarDB

PolarDB to cloud-native rodzina baz danych Alibaba, zaprojektowana do skalowania i środowiska chmurowego. Występują warianty zgodności z popularnymi silnikami/API zależnie od produktu.

Dla aplikacji przenoszonej między chmurami klasyczny PostgreSQL/MySQL może ułatwiać portability. PolarDB jest ciekawsze, gdy świadomie korzystasz z funkcji ekosystemu Alibaba.

## 12. ACK - Kubernetes

Alibaba Cloud Container Service for Kubernetes (ACK) to zarządzany Kubernetes.

Typowy pipeline:

```text
GitHub/GitLab
 -> image
 -> Alibaba Cloud Container Registry
 -> ACK
 -> ALB
```

Kubernetes ma sens przy większych systemach, wielu usługach lub wymaganiu zgodności z K8s. Dla jednej aplikacji wybierz prostszą platformę, jeśli spełnia wymagania.

## 13. Container Registry

Alibaba Cloud Container Registry przechowuje obrazy OCI/Docker.

W większych wdrożeniach warto używać wersjonowanych tagów lub digestów zamiast polegać wyłącznie na `latest`.

## 14. Function Compute

Function Compute to serverless.

Zastosowania:

- HTTP functions,
- eventy,
- automatyzacja,
- obróbka plików OSS,
- integracje.

Model jest podobny do AWS Lambda/Azure Functions/Cloud Run functions.

## 15. SLB, ALB i NLB

Alibaba używa kilku wariantów load balancingu:

- ALB - warstwa aplikacyjna HTTP/HTTPS,
- NLB - L4/high performance,
- starsze/ogólne nazewnictwo SLB może pojawiać się w dokumentacji i istniejących środowiskach.

Nie zakładaj, że każda nazwa ze starego tutoriala odpowiada aktualnemu portfolio 1:1 - Alibaba intensywnie rozwija i porządkuje usługi.

## 16. CDN i DCDN

CDN przyspiesza dostarczanie treści statycznych. Dynamic Route for CDN/DCDN rozszerza scenariusze o dynamiczne treści i routing edge.

Szczególnie przy użytkownikach rozproszonych po Azji CDN może mieć duże znaczenie.

## 17. RAM - Resource Access Management

RAM to odpowiednik IAM.

Elementy:

- RAM users,
- RAM roles,
- policies,
- groups,
- federation.

Najważniejsza zasada: nie używaj głównego konta Alibaba do codziennego zarządzania ani jego AccessKey w aplikacji.

Dokumentacja Alibaba wprost zaleca używanie kont RAM i minimalnych uprawnień zamiast AccessKey konta głównego.

## 18. Role zamiast statycznych AccessKey

Jeżeli usługa może otrzymać rolę, jest to preferowane wobec długowiecznych kluczy.

Klucze:

- mogą wyciec z repo,
- mogą znaleźć się w logu,
- trzeba rotować,
- trudno zarządzać nimi w skali.

## 19. KMS i Secrets Manager

- **KMS** - klucze szyfrujące.
- **Secrets Manager** - sekrety.

Wzorzec:

```text
app -> RAM role -> Secrets Manager -> DB credentials
```

## 20. CloudMonitor

CloudMonitor zbiera metryki i alarmy dla usług.

Monitoruj:

- CPU,
- network,
- disk,
- błędy HTTP,
- stan LB,
- DB connections/storage,
- kolejki,
- koszty.

## 21. ActionTrail

ActionTrail zapisuje operacje wykonywane przez użytkowników, role i usługi. To odpowiednik CloudTrail/Azure Activity Log/Cloud Audit Logs.

Przy incydencie administracyjnym jest jednym z pierwszych miejsc do sprawdzenia.

## 22. Alibaba Cloud CLI

CLI jest cross-platform i pozwala zarządzać setkami usług.

Przykładowa konfiguracja:

```bash
aliyun configure
```

Pomoc i wywołania są zbliżone do API produktu:

```bash
aliyun ecs help
aliyun ecs DescribeInstances --RegionId REGION
```

CLI nadaje się do skryptów, CI/CD i automatyzacji. Alibaba oferuje także Cloud Shell.

## 23. Terraform i ROS

Alibaba Cloud ma providera Terraform. Natywną usługą IaC jest Resource Orchestration Service (ROS).

Praktycznie:

- Terraform - dobry wybór dla multi-cloud i popularnych zespołów DevOps,
- ROS - natywne podejście Alibaba.

## 24. CEN - Cloud Enterprise Network

CEN służy do łączenia wielu VPC, regionów i sieci enterprise. Jest odpowiednikiem klasy rozwiązań typu AWS Transit Gateway / Azure Virtual WAN w zależności od scenariusza.

## 25. AI: Qwen i Model Studio

Alibaba rozwija rodzinę modeli Qwen i platformę Model Studio do budowania aplikacji generative AI.

Z perspektywy cloud developera typowy scenariusz to:

```text
aplikacja -> API modelu -> storage / baza / RAG -> monitoring
```

Przy rynku chińskim integracja z lokalnym ekosystemem modeli i usług może być szczególnie istotna.

## 26. Przykładowe architektury

### Klasyczna aplikacja web

```text
Alibaba Cloud DNS
 -> CDN/DCDN
 -> ALB
 -> ECS
 -> RDS/PolarDB
 -> OSS
```

### Kubernetes

```text
ALB -> ACK -> RDS/PolarDB -> OSS
```

### Event-driven

```text
OSS/Event -> Function Compute -> DB/Queue
```

## 27. Rynek chiński - ważne różnice

Jeżeli aplikacja ma być hostowana w Chinach kontynentalnych, technologia to tylko połowa problemu. Trzeba sprawdzić aktualne wymagania prawne, rejestracyjne, domenowe i sieciowe, w tym czy dla danego typu publicznej strony wymagane jest ICP filing/licensing.

Nie kopiuj procedury z bloga sprzed kilku lat. Wymogi i szczegóły zależą od scenariusza i mogą się zmieniać.

## 28. Koszty

Modele obejmują m.in.:

- pay-as-you-go,
- subscription,
- reserved/savings-type mechanizmy,
- spot/preemptible w wybranych usługach.

Pilnuj:

- ECS,
- EIP/bandwidth,
- NAT,
- load balancerów,
- RDS/PolarDB,
- OSS,
- CDN,
- transferu między regionami,
- logów i AI.

## 29. Bezpieczeństwo - minimum

- MFA na koncie głównym.
- RAM users/roles zamiast root account.
- Least privilege.
- Brak trwałych AccessKeys, jeśli można użyć roli.
- Security Groups.
- Prywatne vSwitche dla aplikacji/DB.
- KMS i Secrets Manager.
- ActionTrail.
- Backup i wersjonowanie.
- Alerty kosztowe.
- Zrozumienie wymogów prawnych dla Chin.

## 30. Typowe pułapki

1. Pomylenie Alibaba ECS z Amazon ECS.
2. Używanie AccessKey konta głównego.
3. Publiczne bazy danych.
4. Brak znajomości vSwitch/zone.
5. Projektowanie Chin tak samo jak regionu europejskiego bez sprawdzenia wymogów.
6. Kubernetes do zbyt małego projektu.
7. Brak kontroli transferu i EIP.
8. Zakładanie, że nazwy ze starej dokumentacji są nadal aktualnymi nazwami produktów.

## 31. Co wybrać dla małego projektu

Jeśli projekt musi być w Alibaba Cloud:

```text
ECS lub usługa kontenerowa
+ OSS
+ RDS
+ RAM
+ CloudMonitor
```

Na początek ECS jest najłatwiejszy do zrozumienia, bo zachowuje się jak zwykły serwer. Potem można przejść do usług zarządzanych i kontenerowych.

## 32. Ściąga CLI

```bash
aliyun configure
aliyun ecs DescribeRegions
aliyun ecs DescribeInstances --RegionId REGION
aliyun vpc DescribeVpcs --RegionId REGION
aliyun vpc DescribeVSwitches --RegionId REGION
aliyun rds DescribeDBInstances --RegionId REGION
```

Składnia wielu komend odwzorowuje nazwy operacji OpenAPI, dlatego jest bardziej „API-like” niż np. `az` czy `gcloud`.

## 33. Co powinien umieć początkujący administrator Alibaba Cloud

- rozróżnić region i zone,
- uruchomić ECS,
- zbudować VPC i vSwitch,
- ustawić Security Group,
- użyć OSS,
- uruchomić RDS,
- rozumieć RAM user/role/policy,
- znaleźć logi i ActionTrail,
- użyć Alibaba Cloud CLI,
- wdrożyć zasoby Terraformem/ROS,
- rozumieć specyfikę wdrożenia w Chinach,
- kontrolować koszty.

## 34. Źródła i dalsza nauka

- Alibaba Cloud Documentation: https://www.alibabacloud.com/help/
- ECS Quick Start: https://www.alibabacloud.com/help/en/ecs/quick-start
- Alibaba Cloud CLI: https://www.alibabacloud.com/help/en/cli/
- Architecture Center: https://www.alibabacloud.com/architecture
- Pricing: https://www.alibabacloud.com/pricing

---

### Najważniejsza myśl

Alibaba Cloud jest dużo łatwiejsza, gdy tłumaczysz jej nazwy na znane kategorie: **ECS = VM, OSS = object storage, RAM = IAM, vSwitch = subnet, RDS = zarządzana baza**. Największą dodatkową warstwą wiedzy jest specyfika rynku chińskiego i lokalnych wymogów.
