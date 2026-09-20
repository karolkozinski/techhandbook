---
id: "doc-037"
title: "Windows Server in the Enterprise — Administrator Fundamentals"
slug: "windows-server-in-the-enterprise-administrator-fundamentals"
description: "This handbook focuses on the practical core of Windows Server administration in a corporate environment: Active Directory, permissions, Group Policy,…"
lang: "en"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "windows"
  - "server"
  - "active directory"
  - "administration"
---

# Windows Server in the Enterprise — Administrator Fundamentals

## Table of Contents

This handbook focuses on the practical core of Windows Server administration in a corporate environment: Active Directory, permissions, Group Policy, deployment, PowerShell, networking, security and routine support.

# 1. Role of Windows Server in a company

Windows Server commonly provides identity, authentication, centralized policy, DNS, DHCP, file and print services, remote administration, application hosting and virtualization.

# 2. Core concepts

## Domain

A domain is a centrally managed identity and security boundary. Users, computers and policies can be managed consistently across the organization.

## Domain Controller — DC

A Domain Controller hosts Active Directory Domain Services and participates in domain authentication and directory replication.

## Active Directory

Active Directory stores directory objects such as users, groups, computers and service identities.

## OU — Organizational Unit

An OU organizes directory objects and can be used for delegated administration and Group Policy scope.

## GPO — Group Policy Object

A GPO contains centralized settings applied to users or computers.

# 3. Active Directory Domain Services

AD DS provides authentication, directory queries, replication and policy integration. Kerberos is the main domain authentication protocol, with NTLM still present for compatibility scenarios.

# 4. Users, groups and organizational units

Organize users and computers around administration and policy needs, not just the company org chart.

## Creating a user

PowerShell example:

```powershell
New-ADUser -Name "John Smith" -SamAccountName "jsmith" -Enabled $true -AccountPassword (Read-Host -AsSecureString)
```

## Initial password

Use a temporary strong password or approved onboarding flow. Require password change where policy calls for it and avoid sending credentials insecurely.

# Groups

Grant permissions through groups rather than directly to individual accounts whenever possible.

## Typical groups

Security groups grant access. Distribution groups are normally used for messaging rather than authorization.

# AGDLP

Classic access model:

```text
Accounts
→ Global groups
→ Domain Local groups
→ Permissions
```

This separates business membership from resource permissions.

# 5. NTFS permissions and network shares

Access to shared folders is determined by both share permissions and NTFS permissions.

# NTFS permissions

## Read

Read files and folder contents.

## Write

Create or modify content depending on inherited rights.

## Modify

Read, write, create and delete; common for normal working folders.

## Full Control

Includes permission-management capabilities. Grant sparingly.

# Inheritance

Permissions normally inherit from parent folders. Break inheritance only when there is a clear design reason.

# Effective Permissions

Effective access is the result of all group memberships, inherited rights and explicit allow/deny entries. Use effective-access tools before adding more privileges.

# 6. Assigning resources to users

Typical resources include file shares, printers, applications and mapped drives. Prefer group-based assignment.

# Drive mapping

A mapped drive presents a UNC share such as `\\fileserver\sales` as a drive letter.

## Mapping through GPO

Group Policy Preferences can map drives based on group membership, OU or other targeting conditions.

# 7. Group Policy — GPO

Group Policy centralizes workstation and user settings.

# GPO structure

## Computer Configuration

Applies settings to computer objects regardless of who logs in.

## User Configuration

Applies settings to user objects.

# Updating GPO

```powershell
gpupdate /force
```

# Checking applied GPOs

```powershell
gpresult /r
gpresult /h report.html
```

# RSOP

Resultant Set of Policy tools help explain which settings are effective and where they came from.

# GPO processing order

Policies are evaluated by scope and inheritance. Local, site, domain and OU placement matter, along with enforcement, blocking and security filtering.

# 8. Workstation installation and deployment

Standardize installation, naming, drivers, patching, domain join, policy placement, applications, encryption and endpoint security.

# Joining a computer to the domain

Ensure DNS points to the correct domain DNS infrastructure before joining. Domain-join failures are very often DNS problems.

# Computer naming

Use predictable names that support inventory and troubleshooting without encoding too much personal data.

# Deployment tools

Depending on architecture, organizations may use Configuration Manager, Intune, Autopilot, MDT, imaging solutions or scripted provisioning.

# 9. Installing software on endpoints

Prefer managed and repeatable deployment rather than manual installation per workstation.

# Silent installation

MSI example:

```powershell
msiexec /i app.msi /qn /norestart
```

# Uninstall

```powershell
msiexec /x app.msi /qn /norestart
```

# Installation log

```powershell
msiexec /i app.msi /qn /l*v C:\Temp\app-install.log
```

# EXE installation

EXE switches are vendor specific. Verify the vendor's documented silent-install options.

# 10. DNS and DHCP

# DNS

Active Directory depends heavily on DNS. Domain clients should normally use the organization's domain-aware DNS servers, not arbitrary public resolvers.

# DHCP

DHCP provides IP address, subnet mask, gateway, DNS servers and lease information.

# DHCP reservation

A reservation assigns a predictable address to a known device while keeping DHCP management centralized.

# 11. File server

Use SMB shares with group-based permissions, quotas where needed and a clear data-owner model.

# Hidden shares

A share name ending in `$` is hidden from casual browse lists:

```text
\\server\department$
```

# Administrative shares

Built-in administrative shares include `C$`, `ADMIN$` and `IPC$`. Access should be limited to authorized administrators.

# 12. Network printers

Print servers can centralize queues and permissions.

# Distribution through GPO

Printers can be deployed using Group Policy Preferences or modern device-management tooling.

# 13. RDP and remote administration

Remote Desktop is useful for administration but should not be broadly exposed to the Internet.

# Safe RDP use

Use NLA, restricted firewall scope, gateways/VPN where appropriate, MFA where available, separate admin accounts and logging.

# Windows Admin Center

Windows Admin Center provides browser-based administration for many Windows Server roles and features.

# 14. PowerShell for administrators

PowerShell is the primary automation and administration language for modern Windows environments.

# Get-Help

```powershell
Get-Help Get-Service -Full
```

# Get-Command

```powershell
Get-Command *ADUser*
```

# Pipeline

PowerShell passes objects rather than plain text:

```powershell
Get-Service | Where-Object Status -eq 'Running'
```

# Process list

```powershell
Get-Process
```

# Service list

```powershell
Get-Service
```

# Restart a service

```powershell
Restart-Service Spooler
```

# Computer information

```powershell
Get-ComputerInfo
```

# IP configuration

```powershell
Get-NetIPAddress
Get-DnsClientServerAddress
```

# Network adapters

```powershell
Get-NetAdapter
```

# Connectivity test

```powershell
Test-Connection server01
```

# Port test

```powershell
Test-NetConnection server01 -Port 443
```

# 15. Service management

Use `Get-Service`, `Start-Service`, `Stop-Service`, `Restart-Service` and service-management tools appropriate to the server role.

# Startup Type

Typical startup types: Automatic, Automatic (Delayed Start), Manual and Disabled.

# 16. Logs and diagnostics

Windows Event Logs are central to troubleshooting.

# Important logs

# Application

Application-generated events.

# System

Operating-system, driver and service-control events.

# Security

Audit and security events when configured.

# PowerShell

PowerShell operational logs can provide important evidence for administration and security review.

Example:

```powershell
Get-WinEvent -LogName System -MaxEvents 50
```

# 17. Updates and patch management

Patch in controlled windows and keep a recovery plan for critical infrastructure.

# Wave approach

```text
test devices
→ pilot group
→ wider endpoints
→ critical servers
```

Monitor failures before widening rollout.

# 18. Security

# Administrator account

Use separate privileged identities rather than using a normal daily account for administration.

# Tiering

Separate highly privileged administration from lower-trust devices and workloads. Exact tier models vary by organization.

# Local Administrator

Do not share one static local-admin password across machines. Use Windows LAPS or another managed rotation mechanism.

# BitLocker

Use full-disk encryption where appropriate and escrow recovery keys securely.

# Microsoft Defender

Keep endpoint protection and security intelligence current. Centralized monitoring improves response.

# Firewall

Keep Windows Defender Firewall enabled and define narrow inbound rules.

# MFA

Use MFA for privileged/cloud access and wherever the identity architecture supports it.

# 19. Backup and recovery

Backups matter only if they can be restored.

# 3-2-1 rule

A practical guideline: multiple copies, different storage/media, at least one independent/off-site copy.

# Active Directory

AD recovery needs domain-aware procedures. Back up appropriately and understand authoritative/non-authoritative restore concepts before an incident.

# 20. Hyper-V virtualization

Hyper-V runs virtual machines on Windows Server.

# Virtual Switch

Virtual switches connect VMs to external, internal or private networks depending on configuration.

Checkpoints are operational rollback aids, not a substitute for backups.

# 21. Basic domain administration

## Check a user

```powershell
Get-ADUser jsmith -Properties *
```

# Create user

```powershell
New-ADUser -Name "John Smith" -SamAccountName jsmith
```

# Disable account

```powershell
Disable-ADAccount jsmith
```

# Enable

```powershell
Enable-ADAccount jsmith
```

# Reset password

```powershell
Set-ADAccountPassword jsmith -Reset -NewPassword (Read-Host -AsSecureString)
```

# Unlock account

```powershell
Unlock-ADAccount jsmith
```

# Check groups

```powershell
Get-ADPrincipalGroupMembership jsmith
```

# Add to group

```powershell
Add-ADGroupMember "GG-Sales" jsmith
```

# Remove from group

```powershell
Remove-ADGroupMember "GG-Sales" jsmith
```

# 22. Typical administrator tasks

## Case 1 — new employee

Create the identity, assign groups, provision mailbox/licenses where required, configure MFA, map resources, prepare the workstation and test login.

# Case 2 — user changes department

Remove old role groups and add new ones. Do not simply clone another employee's permissions.

# Case 3 — user has no network drive

Check network, authentication, GPO application, group membership and share availability.

# Case 4 — computer cannot see the domain

Check DNS first, then IP configuration, time synchronization, domain-controller reachability and firewall.

# Case 5 — account is locked

Find the source of repeated bad credentials: old phone profile, mapped drive, service, scheduled task or cached session.

# Case 6 — user cannot access a folder

Check effective NTFS permissions, share permissions, inheritance and group membership.

# Case 7 — new application for the whole company

Package and test silent deployment, pilot it, collect logs, define rollback and then expand rollout.

# 23. Important commands

## Network

```powershell
ipconfig /all
ping server01
nslookup example.com
Test-NetConnection server01 -Port 443
```

# Modern PowerShell equivalents

```powershell
Get-NetIPAddress
Get-NetAdapter
Get-DnsClientServerAddress
Resolve-DnsName example.com
```

# Domain

```powershell
whoami
whoami /groups
gpresult /r
nltest /dsgetdc:example.local
```

# Computer

```powershell
hostname
Get-ComputerInfo
```

# Users

```powershell
Get-ADUser USER
Get-LocalUser
```

# Services

```powershell
Get-Service
```

# Processes

```powershell
Get-Process
```

# Files

```powershell
Get-ChildItem
Get-Acl PATH
```

# 24. New-user checklist

```text
identity verified
account created
correct OU
correct groups
secure initial access
MFA
mailbox/licenses
shares/printers
applications
workstation
test login
```

# 25. New-computer checklist

```text
firmware baseline
OS installed/patched
correct name
domain/identity join
correct OU/policies
BitLocker
endpoint protection
applications
inventory
user test
```

# 26. What to learn next

## Active Directory

Replication, sites, FSMO roles, trusts, DNS integration and recovery.

## Group Policy

Loopback processing, security filtering, WMI filters, inheritance and troubleshooting.

## PowerShell

Remoting, functions, modules, error handling and automation.

## Networking

DNS, DHCP, VLANs, routing, certificates and firewalls.

## Microsoft 365

Microsoft Entra ID, Intune, Exchange Online and hybrid identity.

## Security

Privileged access, LAPS, Defender, auditing, hardening and incident response.

# Windows administrator mental model

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

When something fails, identify which layer is wrong before granting more rights.

# Most important enterprise administration rule

Use groups and policy, automate repeatable work, keep privileged access minimal, document changes and make every critical change recoverable.
