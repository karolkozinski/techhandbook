# Tech Handbook

Tech Handbook is an open, practical technical knowledge base developed as part of **Null Yard**.

The repository contains Markdown handbooks covering programming, operating systems, networking, infrastructure, cloud platforms, security, testing, web technologies, developer tools, digital analytics and artificial intelligence.

The goal is not to replace official vendor documentation or create an academic textbook. The handbooks are designed to help you quickly understand a technology, refresh important commands and concepts, and enter a new environment or project with a useful mental map.

## Web version

Tech Handbook is also available as a lightweight static website:

**https://karolkozinski.github.io/techhandbook/**

The web version provides directory browsing, search, a Markdown reader and language switching between Polish and English.

## Principles

Each handbook should be:

- practical,
- as self-contained as possible,
- written in clear language,
- focused on real use,
- supported with examples,
- easy to search,
- useful as a reference while working.

These documents are not step-by-step exercise courses. Their purpose is to provide an organized map of a topic.

## Scope

The repository includes, among other topics:

- Linux, Debian and FreeBSD,
- Windows Server,
- shells and shell scripting,
- Git and GitHub,
- Docker and CI/CD,
- systemd, cron and schedulers,
- HTML, CSS, JavaScript and Node.js,
- Go, Python and C,
- Browser DevTools,
- nginx,
- HTTP, HTTPS and TLS,
- DNS, routing and computer networks,
- SSH,
- PostgreSQL and SQL,
- APIs and integrations,
- OAuth 2.0, OpenID Connect, JWT and sessions,
- AWS, Azure, Google Cloud, Oracle Cloud and Alibaba Cloud,
- application security and cybersecurity,
- software testing,
- regular expressions,
- Technical SEO,
- web performance and Core Web Vitals,
- web analytics, tagging and UTM,
- A/B testing and experimentation,
- HTML email / EDM,
- technical documentation,
- end-to-end web troubleshooting,
- AI, agents and prompting,
- editors and developer tools,
- UX and accessibility.

## Repository structure

Content is stored under `md/` and split by language.

```text
techhandbook/
├── README.md
├── README.en.md
├── index.html
├── content-index.json
├── assets/
└── md/
    ├── pl/
    │   └── ... topic categories
    └── en/
        └── ... the same topic categories
```

Every Polish handbook has an English counterpart using the same relative path and document ID.

## Who this project is for

Tech Handbook is primarily for technical people working across several areas at once, including:

- developers,
- front-end developers,
- digital-solutions specialists,
- administrators entering a new technology,
- technical project and solution managers,
- people building a homelab or VPS,
- people developing DevOps skills.

It does not assume expert knowledge in every covered area.

## How to use it

Clone the repository:

```bash
git clone https://github.com/karolkozinski/techhandbook.git
cd techhandbook
```

Find files:

```bash
find md/pl md/en -iname '*dns*'
```

Search inside documents:

```bash
grep -Rni "reverse proxy" md/pl md/en
```

You can also use the web interface.

## Content index

The web interface does not scan directories dynamically. Its runtime index is stored in content-index.json.

This file is generated and should not be edited manually.

Article-owned metadata lives in Markdown front matter, paths and categories come from the filesystem, and editorial relationships live in content-relations.json.

Validate or regenerate the index with:

    python3 -m pip install -r requirements-dev.txt
    python3 scripts/content_index.py --check
    python3 scripts/content_index.py --write

GitHub Actions checks index consistency whenever content changes.

Polish and English STANDARD counterparts intentionally share the same document ID so the web interface can switch languages while staying on the same handbook.

## Deployment

The production layout uses an nginx container bound only to the VPS loopback interface, with a host nginx instance handling the public domain and TLS.

See DEPLOYMENT.md for the deployment procedure.

## Information freshness

Technology changes.

Commands, software versions, APIs, cloud services and recommended practices can become outdated.

Before performing operations that affect production systems, security or data, verify current vendor documentation as well.

Treat Tech Handbook as a map and practical reference, not the only source of truth.

## Security

Cybersecurity, networking and penetration-testing examples are intended for:

- your own systems,
- laboratories,
- test environments,
- infrastructure for which you have explicit authorization.

Do not test third-party systems without permission.

## Format

Markdown is the project's primary format because it is:

- readable as plain text,
- Git-friendly,
- rendered by GitHub,
- easy to edit,
- easy to search,
- easy to present in a static web interface.

## Development

Tech Handbook is developed iteratively.

New material may appear as new projects, technologies and practical needs emerge. Existing documents may be corrected, expanded and updated.

## Null Yard

Tech Handbook is one of the projects developed under **Null Yard**.

Null Yard groups small software projects, tools, experiments and technical solutions created to understand a problem or build something useful.

---

**Tech Handbook**

Practical technical knowledge, without requiring you to remember everything.
