# Windows Server in the Enterprise — Administrator Fundamentals

## 1. Role of Windows Server in a company

Windows Server often provides identity, authentication, centralized policy, file and print services, DNS, DHCP, remote administration, application hosting and virtualization.

## 2. Core concepts

Domain: centrally managed identity and security boundary.

Domain Controller: server running Active Directory Domain Services and participating in domain authentication.

Active Directory: directory service storing users, groups, computers and other objects.

OU: Organizational Unit used to organize objects and target administration or Group Policy.

GPO: Group Policy Object containing centralized configuration for users and computers.

## 3. Active Directory Domain Services

AD DS provides identities, Kerberos/NTLM authentication, LDAP directory access, policy integration and replication between domain controllers.

## 4. Users, groups and OUs

Use groups for access instead of assigning permissions directly to individuals.

PowerShell:

```powershell
Get-ADUser -Identity jsmith
```

Create a user:

```powershell
New-ADUser -Name "John Smith" -SamAccountName "jsmith" -Enabled $true -AccountPassword (Read-Host -AsSecureString)
```

Classic AGDLP model:

```text
Accounts → Global groups → Domain Local groups → Permissions
```

## 5. NTFS permissions and shares

Common NTFS rights: Read, Write, Modify and Full Control. Permissions may be inherited. Effective access depends on group membership, inheritance and explicit permissions.

## 6. Assigning resources

Typical resources include network shares, printers, mapped drives and applications. Group Policy Preferences can map drives and printers.

## 7. Group Policy

Main branches:

```text
Computer Configuration
User Configuration
```

Refresh and report:

```powershell
gpupdate /force
gpresult /r
gpresult /h report.html
```

RSOP tools help show effective policy. Scope and inheritance matter.

## 8. Workstation deployment

Typical process: install Windows, patch it, apply drivers, name the device, join domain, place it in the correct OU, apply policy, deploy applications and verify the security baseline.

Modern tooling may include Configuration Manager, Intune, Autopilot or imaging/provisioning systems.

## 9. Software deployment

Prefer unattended installers.

MSI example:

```powershell
msiexec /i app.msi /qn /norestart
```

Uninstall:

```powershell
msiexec /x app.msi /qn /norestart
```

Vendor EXE installers use product-specific silent switches. Keep install logs for troubleshooting.

## 10. DNS and DHCP

Active Directory depends heavily on DNS. Domain clients should normally use organizational AD-aware DNS servers.

DHCP distributes address, subnet, gateway, DNS and lease data. Reservations can bind a known device to a chosen IP.

## 11. File server

Example share:

```text
\\fileserver\department
```

Hidden share:

```text
\\fileserver\department$
```

Administrative shares include C$, ADMIN$ and IPC$.

## 12. Printers

Print servers can centralize queues and drivers. Printers can be deployed with Group Policy.

## 13. RDP and remote administration

Use RDP with restricted firewall scope, NLA, MFA or gateway where available, privileged-account separation and logging.

Windows Admin Center provides browser-based administration for many server tasks.

## 14. PowerShell for administrators

```powershell
Get-Help Get-Service -Full
Get-Command *ADUser*
Get-Service
Restart-Service Spooler
Get-Process
Get-ComputerInfo
Get-NetIPAddress
Get-NetAdapter
Test-Connection server01
Test-NetConnection server01 -Port 443
```

## 15. Services

Startup types include automatic, manual and disabled. Use Get-Service, Start-Service, Stop-Service and Restart-Service.

## 16. Logs and diagnostics

Important logs: Application, System, Security, PowerShell and service-specific channels.

```powershell
Get-WinEvent -LogName System -MaxEvents 50
```

## 17. Updates and patch management

Use staged deployment: test group, pilot group, wider rollout, critical systems. Plan maintenance windows and recovery.

## 18. Security

Use separate admin accounts, least privilege, minimal Domain Admin membership, Windows LAPS, BitLocker, Microsoft Defender, firewalling and MFA.

## 19. Backup and recovery

Apply a 3-2-1-style strategy where practical. Test restores. Active Directory recovery requires domain-specific planning.

## 20. Hyper-V

Core concepts include virtual machines, virtual disks, virtual switches and checkpoints. Checkpoints are not backups.

## 21. Basic domain administration

```powershell
Get-ADUser jsmith -Properties *
Disable-ADAccount jsmith
Enable-ADAccount jsmith
Unlock-ADAccount jsmith
Get-ADPrincipalGroupMembership jsmith
Add-ADGroupMember "GG-Sales" jsmith
Remove-ADGroupMember "GG-Sales" jsmith
```

## 22. Typical administrator tasks

New employee: create account, assign groups, prepare mailbox/license if required, configure MFA, map resources, prepare workstation and verify access.

Department transfer: change group memberships and resources rather than cloning another user blindly.

Missing mapped drive: check network, authentication, GPO, group membership and share availability.

Computer cannot see domain: check DNS first, then IP, time synchronization and domain-controller reachability.

Locked account: find the source of stale credentials before repeatedly unlocking.

No folder access: check effective NTFS/share permissions and group membership.

New application: test silent deployment on a pilot group before wider rollout.

## 23. Important commands

```powershell
ipconfig /all
Get-NetIPAddress
Get-DnsClientServerAddress
Test-Connection HOST
Test-NetConnection HOST -Port 443
nslookup DOMAIN
Resolve-DnsName DOMAIN
whoami
whoami /groups
gpresult /r
hostname
Get-ComputerInfo
Get-Service
Get-Process
Get-Acl PATH
```

## 24. New-user checklist

Verify identity, account, OU, groups, initial password/activation, MFA, mailbox/license, shares, applications, printers, workstation and test login.

## 25. New-computer checklist

Patch firmware and OS, follow naming convention, join the required directory, place in the correct OU, apply encryption and endpoint protection, deploy applications and verify inventory.

## 26. What to learn next

Active Directory replication, sites, FSMO roles and trusts; advanced GPO troubleshooting; PowerShell remoting and modules; DNS/DHCP/VLANs; Entra ID, Intune and Microsoft 365; privileged-access security.

# Administrator mental model

```text
identity
↓
groups
↓
policy
↓
resources
↓
device state
↓
logs
```

# Most important enterprise rule

Manage access through groups and policy, automate repeatable work, document changes and keep privileged access minimal.
