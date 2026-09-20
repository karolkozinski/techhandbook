---
id: "doc-005"
title: "Microsoft Azure"
slug: "microsoft-azure"
description: "Microsoft Azure - praktyczne kompendium Entra ID, subskrypcji, VNet, compute, storage, baz, kontenerów, serverless i monitoringu."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "cloud"
  - "azure"
  - "microsoft"
---

# Microsoft Azure

Azure najlepiej rozumieć przez hierarchię tożsamości i zasobów: Entra tenant, subscription, resource group, region, sieć i konkretne usługi. Dla małych aplikacji App Service lub Container Apps często są prostszym punktem wejścia niż pełny klaster AKS.

Powiązane tematy: [Sieci komputerowe dla developera](techhandbook:doc-016), [Docker](techhandbook:doc-012), [SQL i PostgreSQL](techhandbook:doc-010), [Windows Server - administracja korporacyjna](techhandbook:doc-037) oraz [CI/CD i GitHub Actions](techhandbook:doc-011).

## 1. Czym jest Azure

Microsoft Azure to globalna chmura IaaS/PaaS/serverless szczególnie mocno zintegrowana ze środowiskiem Microsoft: Microsoft Entra ID, Windows Server, Microsoft 365, SQL Server, .NET, GitHub i narzędziami enterprise.

Azure nie oznacza jednak „chmury tylko dla Windows”. Linux, PostgreSQL, Kubernetes, kontenery i aplikacje Go/Node/Python są pełnoprawnymi scenariuszami.

## 2. Hierarchia zasobów

Najważniejsze poziomy:

```text
Microsoft Entra tenant
└── Management Group
    └── Subscription
        └── Resource Group
            ├── Virtual Network
            ├── Virtual Machine
            ├── Storage Account
            └── Database
```

**Tenant** - obszar tożsamości Entra.  
**Subscription** - granica rozliczeniowa i administracyjna.  
**Resource Group** - logiczny kontener na zasoby projektu/systemu.  
**Resource** - konkretna usługa, np. VM, Key Vault, App Service.

Tagi typu `project`, `environment`, `owner`, `cost-center` bardzo ułatwiają późniejsze zarządzanie.

## 3. Najważniejsze usługi - mapa

| Potrzeba | Azure |
|---|---|
| VM | Azure Virtual Machines |
| Skalowanie VM | Virtual Machine Scale Sets |
| Object storage | Blob Storage |
| Pliki SMB/NFS | Azure Files |
| Dyski VM | Managed Disks |
| Sieć | Virtual Network (VNet) |
| Firewall VM | Network Security Groups |
| Load balancer L4 | Azure Load Balancer |
| Load balancer/WAF L7 | Application Gateway |
| Global edge/CDN | Azure Front Door |
| DNS | Azure DNS |
| PaaS web | App Service |
| Kontenery PaaS | Azure Container Apps |
| Registry | Azure Container Registry |
| Kubernetes | AKS |
| Serverless | Azure Functions |
| SQL | Azure SQL Database |
| PostgreSQL | Azure Database for PostgreSQL |
| NoSQL | Cosmos DB |
| Cache | Azure Cache for Redis / następcy usług zarządzanych |
| Kolejki/eventy | Service Bus / Event Grid / Event Hubs |
| Tożsamość | Microsoft Entra ID |
| Dostęp do zasobów | Azure RBAC |
| Sekrety i certyfikaty | Key Vault |
| Monitoring | Azure Monitor |
| Logi | Log Analytics |
| IaC | Bicep / ARM / Terraform |
| AI | Azure AI Foundry / Azure OpenAI |

## 4. Regiony i Availability Zones

Region to obszar geograficzny, np. `West Europe`, `North Europe`, `Poland Central` w zależności od dostępności usług. Availability Zones zapewniają separację infrastruktury wewnątrz regionu.

Nie każda usługa jest dostępna w każdym regionie i nie każda ma identyczną cenę. Region wybiera się ze względu na:

- opóźnienia,
- wymogi prawne i data residency,
- dostępność usługi,
- cenę,
- plan DR.

## 5. Resource Groups

Resource Group nie jest folderem w sensie plików, tylko kontenerem zarządzania zasobami.

Dobra praktyka dla małej aplikacji:

```text
rg-kompas-prod
  app service/container app
  postgres
  storage
  key vault
  monitor
```

Usunięcie Resource Group usuwa zawarte w niej zasoby, więc to wygodny mechanizm dla środowisk testowych - i potencjalnie bardzo niebezpieczny w produkcji.

## 6. Virtual Machines

Azure VM to klasyczna maszyna wirtualna Linux lub Windows.

Wybierasz:

- image,
- size,
- VNet/subnet,
- dyski,
- public IP lub brak,
- NSG,
- identity,
- availability options.

Przykład CLI:

```bash
az vm list -o table
az vm show -g rg-demo -n vm-demo
```

Do zwykłego hostingu jednej aplikacji VM działa, ale podobnie jak w AWS oznacza administrację systemem. Jeśli nie potrzebujesz dostępu do całego OS, często lepsze są App Service albo Container Apps.

## 7. VNet i networking

Virtual Network to prywatna sieć Azure.

Elementy:

- VNet,
- subnety,
- route tables,
- NSG,
- public IP,
- NAT Gateway,
- Private Endpoint,
- VPN Gateway,
- ExpressRoute,
- Azure Firewall,
- peering.

Przykład:

```text
Internet
  |
Front Door / Application Gateway
  |
subnet aplikacji
  |
Private Endpoint
  |
PostgreSQL / Storage
```

**Private Endpoint** pozwala wystawić zarządzaną usługę do twojego VNet bez publicznego endpointu.

## 8. Network Security Groups

NSG filtruje ruch przychodzący i wychodzący dla interfejsu/subnetu.

Typowy błąd początkującego: otwarcie RDP/SSH na cały Internet. Lepiej użyć Azure Bastion, VPN, JIT access lub ograniczenia źródłowego IP.

## 9. Storage Account

W Azure wiele usług storage znajduje się pod wspólnym zasobem **Storage Account**.

Najważniejsze typy danych:

- **Blob Storage** - obiekty/pliki,
- **Azure Files** - SMB/NFS,
- **Queues** - proste kolejki,
- **Tables** - prosty NoSQL,
- **Managed Disks** - dyski VM są osobną kategorią zarządzanego storage.

Blob Storage jest odpowiednikiem S3/GCS/OSS.

Przydatne funkcje:

- lifecycle,
- tiers Hot/Cool/Archive,
- versioning,
- soft delete,
- SAS tokens,
- private endpoints,
- encryption.

## 10. App Service

App Service to PaaS do hostowania aplikacji webowych i API. Obsługuje popularne runtime'y i kontenery.

Dla małego backendu jest bardzo wygodny:

```text
GitHub -> deployment -> App Service -> PostgreSQL
```

Nie zarządzasz systemem operacyjnym. Skalujesz plan i liczbę instancji.

## 11. Azure Container Apps

Container Apps daje uruchamianie kontenerów bez pełnego zarządzania Kubernetesem.

Pasuje do:

- mikroserwisów,
- API,
- workerów,
- aplikacji z autoscalingiem,
- event-driven workloads.

Dla developera, który ma gotowy `Dockerfile`, Container Apps bywa jednym z najprzyjemniejszych punktów wejścia do Azure.

## 12. AKS

Azure Kubernetes Service to zarządzany Kubernetes.

Używaj go, gdy naprawdę potrzebujesz Kubernetes API, ecosystemu Helm/operatorów, zaawansowanej orkiestracji lub masz standard organizacyjny oparty o K8s.

Dla jednej lub kilku prostych aplikacji Container Apps/App Service może być znacznie prostsze.

## 13. Azure Functions

Functions to serverless. Funkcja może reagować np. na:

- HTTP,
- timer,
- kolejkę,
- Blob Storage,
- Event Grid.

Typowe zastosowanie: małe integracje, webhooki, przetwarzanie zdarzeń i automatyzacja.

## 14. Azure SQL i PostgreSQL

**Azure SQL Database** to zarządzany silnik z rodziny SQL Server.  
**Azure Database for PostgreSQL** to zarządzany PostgreSQL.

Przy bazie produkcyjnej zwracaj uwagę na:

- HA,
- backup retention,
- private networking,
- firewall,
- monitoring,
- connection limits,
- sizing compute/storage.

Nie przechowuj connection stringów w repo - używaj Key Vault i managed identities.

## 15. Cosmos DB

Cosmos DB to globalnie rozproszona baza NoSQL z wieloma modelami API i mechanizmami replikacji.

Jest potężna, ale jej model kosztowy i sposób projektowania partycji trzeba zrozumieć przed produkcyjnym użyciem. Do zwykłego CRUD z relacjami PostgreSQL może być prostszy.

## 16. Service Bus, Event Grid i Event Hubs

- **Service Bus** - kolejki i messaging enterprise.
- **Event Grid** - routing eventów.
- **Event Hubs** - duży strumień eventów/telemetrii.

W uproszczeniu:

```text
polecenia i kolejki -> Service Bus
zdarzenia zasobów -> Event Grid
telemetria/stream -> Event Hubs
```

## 17. Microsoft Entra ID

Dawniej Azure AD. To centralny system tożsamości Microsoftu.

Obsługuje:

- użytkowników,
- grupy,
- aplikacje,
- service principals,
- managed identities,
- SSO,
- Conditional Access,
- MFA.

Ważne rozróżnienie:

- **Entra ID** mówi, kim jesteś,
- **Azure RBAC** mówi, co wolno ci zrobić na zasobie Azure.

## 18. RBAC

Role mogą być przypisywane na różnych scope'ach:

```text
Management Group
 -> Subscription
   -> Resource Group
     -> Resource
```

Popularne role:

- Reader,
- Contributor,
- Owner,
- User Access Administrator,
- role specyficzne dla usług.

Nie dawaj `Owner`, gdy wystarczy rola wąska lub `Contributor`.

## 19. Managed Identity

Managed Identity pozwala zasobowi Azure dostać tożsamość bez przechowywania hasła/klucza.

Przykład:

```text
Container App
  -> Managed Identity
  -> Key Vault
  -> sekret bazy
```

To jeden z najważniejszych wzorców Azure.

## 20. Key Vault

Key Vault przechowuje:

- sekrety,
- certyfikaty,
- klucze kryptograficzne.

Aplikacja powinna uzyskiwać dostęp przez Managed Identity/RBAC zamiast trzymać credentials w konfiguracji.

## 21. Azure Monitor i Log Analytics

Azure Monitor zbiera metryki i telemetrykę. Log Analytics pozwala analizować logi, m.in. językiem KQL.

Typowe pytania operacyjne:

- czy rośnie CPU,
- ile jest 5xx,
- jak długo odpowiada API,
- czy aplikacja restartuje się,
- które requesty są najwolniejsze,
- kto zmienił zasób.

Application Insights dodaje APM dla aplikacji.

## 22. Azure CLI

Instalujesz `az`, logujesz się i wybierasz subskrypcję.

```bash
az login
az account show
az account list -o table
az account set --subscription "SUBSCRIPTION"
```

Resource Groups:

```bash
az group list -o table
az group create -n rg-demo -l westeurope
```

Zasoby:

```bash
az resource list -g rg-demo -o table
```

Pomoc:

```bash
az --help
az vm --help
az storage --help
```

Azure CLI jest cross-platform i nadaje się do skryptów. Microsoft udostępnia także Cloud Shell.

## 23. Bicep, ARM i Terraform

**ARM** to natywny model deklaratywny Azure.  
**Bicep** to znacznie czytelniejszy język do definiowania zasobów ARM.  
**Terraform/OpenTofu** jest popularny, szczególnie przy multi-cloud.

Dla projektu:

```text
infra/
  main.tf lub main.bicep
app/
  Dockerfile
.github/workflows/
```

## 24. Azure Container Registry

ACR przechowuje obrazy Dockera/OCI.

Schemat:

```text
GitHub Actions
 -> build
 -> ACR
 -> Container Apps / AKS / App Service
```

Do GitHub Actions warto używać federacji OIDC zamiast statycznego secretu service principal.

## 25. Front Door, Application Gateway i Load Balancer

- **Front Door** - globalny edge, routing HTTP, CDN/WAF.
- **Application Gateway** - regionalny L7 load balancer i WAF.
- **Load Balancer** - L4 TCP/UDP.

Dla publicznej aplikacji globalnej Front Door często jest warstwą wejściową.

## 26. Azure DNS

Azure DNS hostuje strefy DNS. Domena może być zarejestrowana gdzie indziej, a rekordy DNS delegowane do Azure.

## 27. AI

Azure ma szeroki stos AI. Z perspektywy developera szczególnie istotne są:

- Azure AI Foundry,
- Azure OpenAI,
- usługi vision/speech/document intelligence,
- integracje z wyszukiwaniem i danymi.

W enterprise mocną stroną jest integracja z Entra, siecią prywatną i politykami organizacji.

## 28. Przykładowe architektury

### Strona statyczna

```text
Azure DNS -> Front Door -> Storage static website
```

### Go API w kontenerze

```text
GitHub
 -> ACR
 -> Container Apps
 -> PostgreSQL
 -> Blob Storage
 -> Key Vault
 -> Azure Monitor
```

### Klasyczny serwer

```text
VNet -> NSG -> Linux VM -> Managed Disk
```

### Serverless

```text
HTTP/Event Grid -> Function -> Cosmos DB / Storage
```

## 29. Koszty

Najczęściej płacisz za:

- czas/rozmiar VM,
- plany App Service,
- vCPU/RAM kontenerów,
- bazy,
- storage,
- requesty,
- logi,
- load balancery/gateway,
- transfer wychodzący.

Używaj:

- Cost Management + Billing,
- Budgets,
- tagów,
- kalkulatora cen.

W środowiskach dev VM można automatycznie wyłączać poza godzinami pracy.

## 30. Azure Policy i governance

W większej organizacji Azure Policy pilnuje reguł, np.:

- tylko wybrane regiony,
- wymagane tagi,
- zakaz publicznych IP,
- wymagane szyfrowanie,
- określone SKU.

Management Groups + Policy + RBAC to fundament governance przy wielu subskrypcjach.

## 31. Bezpieczeństwo - minimum

- MFA i Conditional Access.
- Entra groups zamiast uprawnień „na człowieka”, gdzie to możliwe.
- Least privilege w RBAC.
- Managed Identities zamiast sekretów.
- Key Vault.
- Private Endpoints dla danych wrażliwych.
- Nie wystawiaj RDP/SSH na `0.0.0.0/0`.
- Backup i soft delete.
- Logowanie zmian i alerty.
- Defender for Cloud tam, gdzie organizacja tego potrzebuje.
- Budżety kosztowe.

## 32. Typowe pułapki

1. Pomieszanie Entra ID z RBAC.
2. Wszystko w jednej subskrypcji i jednej Resource Group.
3. Publiczna baza „bo działa”.
4. Nadawanie Owner wszystkim administratorom.
5. Brak tagowania kosztów.
6. Trzymanie sekretów w pipeline lub repo.
7. Kubernetes do aplikacji, która spokojnie zmieściłaby się w Container Apps.
8. Log Analytics bez kontroli retencji i wolumenu logów.

## 33. Co wybrać dla małego projektu

Najprostszy wariant kontenerowy:

```text
Container Apps + ACR + PostgreSQL + Key Vault + Blob Storage
```

Dla statycznego frontendu:

```text
Storage + Front Door
```

Dla pełnej kontroli systemu:

```text
Linux VM
```

Jeśli aplikacja ma tylko kilka endpointów i jest zdarzeniowa:

```text
Functions
```

## 34. Ściąga CLI

```bash
az login
az account show
az account list -o table
az group list -o table
az resource list -o table
az vm list -o table
az network vnet list -o table
az storage account list -o table
az postgres flexible-server list -o table
az keyvault list -o table
az containerapp list -o table
az aks list -o table
```

## 35. Co powinien umieć początkujący administrator Azure

- rozumieć tenant/subscription/resource group,
- stworzyć VNet i subnet,
- uruchomić VM,
- ustawić NSG,
- stworzyć Storage Account,
- uruchomić App Service lub Container App,
- stworzyć zarządzaną bazę,
- nadać rolę RBAC,
- użyć Managed Identity i Key Vault,
- znaleźć logi w Azure Monitor,
- używać `az`,
- tworzyć zasoby Bicepem/Terraformem,
- znaleźć koszty projektu.

## 36. Źródła i dalsza nauka

- Azure Documentation: https://learn.microsoft.com/azure/
- Azure CLI: https://learn.microsoft.com/cli/azure/
- Azure Architecture Center: https://learn.microsoft.com/azure/architecture/
- Azure Well-Architected Framework: https://learn.microsoft.com/azure/well-architected/
- Pricing Calculator: https://azure.microsoft.com/pricing/calculator/

---

### Najważniejsza myśl

Azure najlepiej zacząć od **Entra → Subscription → Resource Group → VNet → compute → storage/database → Monitor**. Gdy ten łańcuch jest jasny, setki pozostałych nazw zaczynają układać się w logiczny system.
