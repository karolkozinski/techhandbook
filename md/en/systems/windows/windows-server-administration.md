# Windows Server in the Enterprise — Administrator Fundamentals

## Contents

This handbook covers the core concepts an administrator should recognize in a corporate Windows environment:

- Active Directory,
- domains and domain controllers,
- users, groups, and OUs,
- Group Policy,
- NTFS and share permissions,
- workstation deployment,
- software distribution,
- DNS and DHCP,
- file and print services,
- PowerShell,
- remote administration,
- updates, security, backup, and Hyper-V.

## 1. The role of Windows Server in a company

Windows Server commonly provides:

- centralized identity,
- authentication,
- authorization,
- DNS,
- DHCP,
- file shares,
- printers,
- Group Policy,
- certificate services,
- remote administration,
- application services,
- virtualization.

The most important foundation in classic on-prem environments is usually **Active Directory Domain Services**.

## 2. Core concepts

### Domain

A logical administrative and security boundary.

Example:

```text
corp.example.com
```

Users and computers can belong to the domain.

### Domain Controller — DC

A server running Active Directory Domain Services.

It handles:

- authentication,
- directory queries,
- replication,
- Kerberos,
- domain policies.

Production domains should not rely on a single DC.

### Active Directory

A directory containing objects such as:

- users,
- groups,
- computers,
- service accounts,
- organizational units.

### OU — Organizational Unit

A logical container used to organize objects and target administration/GPOs.

Example:

```text
Company
├── Users
│   ├── Sales
│   └── IT
└── Computers
    ├── Workstations
    └── Servers
```

### GPO — Group Policy Object

A collection of centrally managed Windows settings.

## 3. Active Directory Domain Services

Useful tools:

- Active Directory Users and Computers,
- Active Directory Administrative Center,
- Group Policy Management,
- PowerShell AD module,
- DNS Manager,
- Sites and Services.

PowerShell:

```powershell
Get-ADDomain
Get-ADForest
Get-ADDomainController -Filter *
```

## 4. Users, groups, and OUs

Create a user:

```powershell
New-ADUser `
  -Name "Jan Kowalski" `
  -SamAccountName jkowalski `
  -UserPrincipalName jan.kowalski@example.com `
  -Enabled $true
```

Set an initial password:

```powershell
$Password = Read-Host -AsSecureString "Password"
Set-ADAccountPassword jkowalski -Reset -NewPassword $Password
```

Force password change at next logon if policy requires it.

### Groups

Use groups to assign permissions rather than assigning access directly to individual users.

Typical categories:

- security groups,
- distribution groups,
- domain local,
- global,
- universal.

### AGDLP

A common permission model:

```text
Accounts
  ↓
Global groups
  ↓
Domain Local groups
  ↓
Permissions
```

Example:

```text
user
→ GG_Finance_Users
→ DL_Finance_Share_Modify
→ NTFS permission
```

This scales much better than adding individual accounts to folder ACLs.

## 5. NTFS and share permissions

Common NTFS levels:

- Read,
- Write,
- Modify,
- Full Control.

Inspect:

```powershell
Get-Acl C:\Shares\Finance
```

### Inheritance

Folders usually inherit ACL entries from their parent.

Breaking inheritance can be useful, but creates administration complexity.

### Effective access

When access is confusing, evaluate:

- user memberships,
- NTFS ACL,
- share permissions,
- deny entries,
- inheritance.

The effective result is the combination of relevant permissions.

## 6. Network shares

Create:

```powershell
New-SmbShare `
  -Name Finance `
  -Path C:\Shares\Finance `
  -ChangeAccess "CORP\DL_Finance_Share_Modify"
```

Map:

```powershell
New-PSDrive `
  -Name F `
  -PSProvider FileSystem `
  -Root "\\fileserver\Finance" `
  -Persist
```

In enterprises, mappings are commonly delivered by Group Policy Preferences.

## 7. Group Policy

GPOs can configure machine and user settings.

### Computer Configuration

Examples:

- security,
- firewall,
- services,
- Windows Update,
- scripts,
- registry,
- software settings.

### User Configuration

Examples:

- desktop,
- drive mappings,
- printers,
- browser/Office settings,
- scripts.

Update:

```powershell
gpupdate /force
```

See applied policy:

```powershell
gpresult /r
gpresult /h C:\Temp\gp.html
```

Processing generally follows:

```text
Local
Site
Domain
OU
```

with inheritance, enforcement, security filtering, and WMI filters affecting the final result.

## 8. Workstation deployment

A corporate workstation typically needs:

1. firmware/BIOS standards,
2. operating-system image or automated provisioning,
3. drivers,
4. domain or cloud identity join,
5. security baseline,
6. applications,
7. monitoring/management agent,
8. policies.

Modern environments may use:

- Microsoft Intune,
- Windows Autopilot,
- Configuration Manager,
- MDT in legacy/on-prem scenarios.

## 9. Software deployment

Windows Installer:

```powershell
msiexec /i app.msi /qn
```

Uninstall:

```powershell
msiexec /x app.msi /qn
```

Verbose log:

```powershell
msiexec /i app.msi /qn /L*v C:\Temp\install.log
```

EXE installers use vendor-specific silent switches. Test them before broad deployment.

Deployment tools include:

- Intune,
- Configuration Manager,
- GPO for suitable MSI scenarios,
- PowerShell,
- enterprise package managers.

## 10. DNS and DHCP

### DNS

Active Directory depends heavily on DNS.

Domain clients should normally use the organization's AD-aware DNS resolvers instead of arbitrary public DNS directly.

Useful commands:

```powershell
Resolve-DnsName dc01.corp.example.com
ipconfig /all
ipconfig /flushdns
```

### DHCP

DHCP assigns:

- IP,
- subnet mask/prefix,
- default gateway,
- DNS servers,
- lease.

Examples:

```powershell
Get-DhcpServerv4Scope
Get-DhcpServerv4Lease -ScopeId 10.0.10.0
```

Reservations are useful for devices that should keep a known address while remaining centrally managed.

## 11. File server

Important concepts:

- SMB,
- NTFS ACL,
- shares,
- quotas,
- shadow copies,
- DFS in larger environments,
- backup.

Hidden share:

```text
Finance$
```

Administrative shares such as `C$` are not ordinary user shares.

## 12. Network printers

Printers can be deployed through:

- print servers,
- Group Policy,
- modern management platforms.

Central deployment is preferable to configuring every workstation manually.

## 13. RDP and remote administration

RDP is powerful and should be protected.

Good practices:

- restrict network access,
- use MFA/gateways where available,
- do not expose TCP 3389 directly to the Internet,
- use separate admin accounts,
- log administrative access.

Other tools:

- Windows Admin Center,
- PowerShell Remoting,
- Remote Server Administration Tools.

## 14. PowerShell for administrators

Help:

```powershell
Get-Help Get-Service -Full
Get-Command *ADUser*
```

Pipeline:

```powershell
Get-Service |
  Where-Object Status -eq Running |
  Sort-Object Name
```

Processes:

```powershell
Get-Process
```

Services:

```powershell
Get-Service
Restart-Service Spooler
```

Computer information:

```powershell
Get-ComputerInfo
```

Network:

```powershell
Get-NetIPAddress
Get-NetAdapter
Test-NetConnection server -Port 443
```

## 15. Managing services

```powershell
Get-Service
Start-Service NAME
Stop-Service NAME
Restart-Service NAME
Set-Service NAME -StartupType Automatic
```

Startup types include:

- Automatic,
- Automatic (Delayed Start),
- Manual,
- Disabled.

## 16. Logs and diagnostics

Event Viewer is central.

Important logs:

### Application

Application and service errors.

### System

Drivers, services, system events.

### Security

Authentication, authorization, auditing.

PowerShell:

```powershell
Get-WinEvent -LogName System -MaxEvents 50
```

Filter:

```powershell
Get-WinEvent -FilterHashtable @{
  LogName='System'
  Level=2
}
```

## 17. Updates and patch management

Do not update a large fleet randomly.

A sensible staged approach:

```text
test group
 ↓
pilot group
 ↓
broader deployment
 ↓
critical servers in planned windows
```

Have rollback and backup plans where appropriate.

## 18. Security

### Administrator accounts

Use separate everyday and administrative identities where practical.

### Tiering

Highly privileged domain administration should be isolated from ordinary workstations and browsing.

### Local Administrator

Avoid one shared local administrator password everywhere.

Use mechanisms such as Windows LAPS.

### BitLocker

Protect disks on laptops and appropriate servers/workstations.

### Microsoft Defender

Use endpoint protection, central policy, and monitoring.

### Firewall

Windows Defender Firewall should normally remain enabled.

### MFA

Use MFA for administrative and cloud identities wherever possible.

## 19. Backup and restore

A useful model is the 3-2-1 rule:

```text
3 copies
2 different media/storage types
1 offsite/offline copy
```

For Active Directory, understand System State and supported DC-recovery procedures rather than restoring arbitrary files.

Test restores.

## 20. Hyper-V

Windows Server can act as a hypervisor.

Concepts:

- virtual machine,
- virtual switch,
- VHDX,
- checkpoints,
- live migration in suitable infrastructure,
- failover clustering.

Do not treat checkpoints as backups.

## 21. Basic domain administration

Find a user:

```powershell
Get-ADUser jkowalski -Properties *
```

Disable:

```powershell
Disable-ADAccount jkowalski
```

Enable:

```powershell
Enable-ADAccount jkowalski
```

Unlock:

```powershell
Unlock-ADAccount jkowalski
```

Group membership:

```powershell
Get-ADPrincipalGroupMembership jkowalski
```

Add to group:

```powershell
Add-ADGroupMember GG_Finance_Users -Members jkowalski
```

Remove:

```powershell
Remove-ADGroupMember GG_Finance_Users -Members jkowalski
```

## 22. Typical administrator tasks

### New employee

1. create identity,
2. assign correct groups,
3. provision mailbox/cloud access where applicable,
4. prepare workstation,
5. deploy applications,
6. verify drives/printers,
7. deliver initial credentials safely.

### Department change

Change groups and permissions based on the new role.

Do not simply accumulate old access forever.

### Missing network drive

Check:

```text
network
DNS
domain login
GPO
group membership
share access
NTFS access
```

### Computer cannot see the domain

Check:

```powershell
ipconfig /all
Resolve-DnsName corp.example.com
Test-NetConnection dc01 -Port 53
Test-NetConnection dc01 -Port 88
```

DNS configuration is a common cause.

### Locked account

```powershell
Search-ADAccount -LockedOut
Unlock-ADAccount user
```

Then find the source of repeated bad credentials.

### No access to a folder

Check:

- group membership,
- share permission,
- NTFS permission,
- inheritance,
- deny entries,
- whether the user's security token is current.

### New application rollout

Pilot first.

Document:

- install method,
- silent switches,
- dependencies,
- uninstall command,
- detection logic,
- security impact,
- rollback.

## 23. Useful commands

Network:

```powershell
ipconfig /all
Resolve-DnsName example.com
Test-NetConnection server -Port 443
Get-NetTCPConnection
```

Domain:

```powershell
whoami /all
nltest /dsgetdc:corp.example.com
gpresult /r
```

Computer:

```powershell
Get-ComputerInfo
Get-CimInstance Win32_OperatingSystem
```

Users:

```powershell
Get-ADUser
Get-LocalUser
```

Services:

```powershell
Get-Service
```

Processes:

```powershell
Get-Process
```

Files:

```powershell
Get-ChildItem
Get-Acl
```

## 24. New-user checklist

```text
[ ] identity created
[ ] naming convention correct
[ ] department/OU correct
[ ] security groups assigned
[ ] license/mailbox if needed
[ ] MFA enrollment planned
[ ] workstation assigned
[ ] file-share access tested
[ ] applications available
[ ] initial password delivered safely
```

## 25. New-computer checklist

```text
[ ] inventory recorded
[ ] firmware updated
[ ] disk encryption enabled
[ ] OS patched
[ ] joined to management/domain
[ ] policies applied
[ ] endpoint protection active
[ ] required software installed
[ ] local-admin strategy applied
[ ] user sign-in tested
```

## 26. What to learn next

### Active Directory

- replication,
- FSMO roles,
- Sites and Services,
- Kerberos,
- trusts,
- recovery.

### Group Policy

- inheritance,
- loopback,
- security filtering,
- WMI filters,
- troubleshooting.

### PowerShell

- objects,
- remoting,
- modules,
- scripts,
- error handling.

### Networking

- DNS,
- DHCP,
- VLANs,
- routing,
- firewalls,
- certificates.

### Microsoft 365 / Entra

Modern identity often extends beyond classic AD.

### Security

- LAPS,
- privileged access,
- auditing,
- hardening baselines,
- incident response.

## Mental model

Think:

```text
identity
  ↓
group
  ↓
policy / permission
  ↓
resource
```

For troubleshooting:

```text
name resolution
→ connectivity
→ authentication
→ authorization
→ policy
→ application
```

## Most important enterprise rule

Do not manage hundreds of computers by manually touching hundreds of computers.

Use:

- groups,
- policies,
- automation,
- centralized management,
- repeatable deployment,
- documentation.
