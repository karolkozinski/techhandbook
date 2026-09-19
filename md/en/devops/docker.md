# Docker — Practical Handbook

## 1. What Docker is

Docker packages an application together with the userspace environment it needs and runs it in an isolated container.

A useful mental model:

```text
source code
  ↓
Dockerfile
  ↓
image
  ↓
container
```

An image is a read-only template. A container is a running instance of that image.

Docker does **not** create a full virtual machine for every application. Containers share the host kernel.

## 2. Docker vs virtual machine

Virtual machine:

```text
hardware
└── hypervisor
    ├── guest OS
    ├── guest OS
    └── guest OS
```

Container:

```text
hardware
└── host OS
    └── container runtime
        ├── container
        ├── container
        └── container
```

Containers usually start faster and use fewer resources.

VMs provide a stronger operating-system boundary and can run different kernels.

## 3. When Docker is useful

Docker is useful when you want:

- repeatable application environments,
- easy deployment,
- isolated dependencies,
- predictable CI,
- several services on one server,
- straightforward rollback to a previous image.

It is not automatically necessary for every application.

A single Go binary behind nginx can be perfectly fine without Docker.

## 4. Installing Docker on Debian

Use the current official Docker repository instructions for production systems.

After installation, typical checks are:

```bash
docker --version
docker compose version
sudo systemctl status docker
```

A quick test:

```bash
docker run --rm hello-world
```

## 5. Docker on FreeBSD

Docker relies on Linux kernel features and is not a native FreeBSD container system.

On FreeBSD, native isolation mechanisms are:

- jails,
- bhyve virtual machines.

For a Docker-oriented workflow, run Docker on Linux, for example inside a Debian VM.

## 6. Important concepts

### Image

A packaged filesystem and metadata used to create containers.

### Container

A running process isolated with Linux namespaces/cgroups and related mechanisms.

### Registry

A server that stores images.

Examples:

- Docker Hub,
- GitHub Container Registry,
- cloud registries.

### Volume

Persistent Docker-managed storage.

### Bind mount

A host path mounted into a container.

### Network

Virtual networking connecting containers.

## 7. Images

List:

```bash
docker image ls
```

Pull:

```bash
docker pull nginx:alpine
```

Remove:

```bash
docker image rm IMAGE
```

Inspect:

```bash
docker image inspect IMAGE
```

## 8. Running a container

```bash
docker run nginx
```

Detached:

```bash
docker run -d nginx
```

Named:

```bash
docker run -d --name web nginx
```

Auto-remove after exit:

```bash
docker run --rm IMAGE
```

## 9. Listing containers

Running:

```bash
docker ps
```

All:

```bash
docker ps -a
```

## 10. Stop and remove

```bash
docker stop web
docker start web
docker restart web
docker rm web
```

Force removal if appropriate:

```bash
docker rm -f web
```

## 11. Logs

```bash
docker logs web
docker logs -f web
docker logs --tail 100 web
```

Logs are one of the first places to look when a container exits unexpectedly.

## 12. Executing a command in a container

```bash
docker exec -it web sh
```

If Bash exists:

```bash
docker exec -it web bash
```

Do not assume every minimal image contains Bash.

## 13. Port publishing

Application inside container listens on port 8080.

Publish it on the host:

```bash
docker run -p 8080:8080 myapp
```

Bind only to localhost:

```bash
docker run -p 127.0.0.1:8080:8080 myapp
```

This is a very useful pattern behind host nginx.

## 14. Environment variables

```bash
docker run   -e APP_ENV=production   -e PORT=8080   myapp
```

For secrets, use an appropriate secret-management method. Do not bake credentials into the image.

## 15. Bind mounts

```bash
docker run   -v "$PWD/config:/app/config:ro"   myapp
```

The host directory is directly visible inside the container.

Useful for:

- development,
- configuration,
- local files.

## 16. Named volumes

Create:

```bash
docker volume create app-data
```

Use:

```bash
docker run   -v app-data:/var/lib/app   myapp
```

List:

```bash
docker volume ls
```

Inspect:

```bash
docker volume inspect app-data
```

## 17. Persistence

Anything written only to the container's writable layer may disappear when the container is replaced.

Persistent data should live in:

- a named volume,
- bind mount,
- external database,
- object storage.

For databases, plan backup separately from container lifecycle.

## 18. Dockerfile

Example for a Go application:

```dockerfile
FROM golang:1.25 AS build

WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build -o /out/app ./cmd/app

FROM debian:bookworm-slim

WORKDIR /app
COPY --from=build /out/app /usr/local/bin/app

USER nobody
EXPOSE 8080

ENTRYPOINT ["app"]
```

This is a multi-stage build.

## 19. Why multi-stage builds matter

The build image may contain:

- compiler,
- source code,
- package caches.

The runtime image needs only what the application requires to run.

That makes the final image:

- smaller,
- easier to scan,
- less exposed.

## 20. Build an image

```bash
docker build -t myapp:1.0 .
```

Run it:

```bash
docker run --rm -p 8080:8080 myapp:1.0
```

## 21. Build context

The final dot:

```bash
docker build .
```

defines the build context.

Everything in the context may be sent to the Docker builder unless excluded.

Use `.dockerignore`.

## 22. .dockerignore

Example:

```text
.git
node_modules
dist
tmp
*.log
.env
```

This reduces build time and prevents accidental inclusion of unnecessary files.

## 23. Image tags

Examples:

```text
myapp:1.0.0
myapp:2026-09-19
myapp:git-abc123
```

Avoid relying only on:

```text
latest
```

for production rollback/version tracking.

## 24. Layers and cache

Each Dockerfile instruction can create/cache a build layer.

Good order:

```dockerfile
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build ...
```

Dependency download remains cached when only application code changes.

## 25. Inspecting an image

```bash
docker history myapp:1.0
docker inspect myapp:1.0
```

## 26. Docker Compose

Compose describes a multi-container application in YAML.

Example:

```yaml
services:
  app:
    build: .
    ports:
      - "127.0.0.1:8080:8080"
    environment:
      APP_ENV: production
    depends_on:
      - db

  db:
    image: postgres:17
    environment:
      POSTGRES_DB: app
      POSTGRES_USER: app
      POSTGRES_PASSWORD: change-me
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

Do not use hardcoded production passwords like the example.

## 27. Compose commands

Start:

```bash
docker compose up
```

Detached:

```bash
docker compose up -d
```

Status:

```bash
docker compose ps
```

Logs:

```bash
docker compose logs
docker compose logs -f
```

Stop and remove containers/network:

```bash
docker compose down
```

Pull newer images:

```bash
docker compose pull
```

Recreate:

```bash
docker compose up -d
```

## 28. `down` and volumes

By default:

```bash
docker compose down
```

does not remove named volumes.

This command is much more destructive:

```bash
docker compose down -v
```

because it removes volumes declared by the project.

Treat `-v` carefully around databases.

## 29. Compose service names and DNS

Services on the same Compose network can normally reach each other by service name.

Example:

```text
app → db:5432
```

Do not use `localhost` inside the app container to reach the database container.

Inside a container:

```text
localhost = this same container
```

## 30. Health checks

Example:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
  interval: 30s
  timeout: 5s
  retries: 3
```

The exact command must exist inside the image.

Health checks are useful, but they do not replace external monitoring.

## 31. Restart policies

Compose:

```yaml
restart: unless-stopped
```

or Docker run:

```bash
docker run --restart unless-stopped ...
```

Choose intentionally. An endlessly restarting broken application can hide the real problem if nobody watches logs.

## 32. Networking

List:

```bash
docker network ls
```

Inspect:

```bash
docker network inspect NETWORK
```

Create:

```bash
docker network create app-net
```

Compose creates a project network automatically in normal cases.

## 33. nginx on the host + Docker application

A simple VPS pattern:

```text
Internet
  ↓
nginx :443
  ↓
127.0.0.1:8080
  ↓
Docker container
```

Compose:

```yaml
ports:
  - "127.0.0.1:8080:8080"
```

nginx:

```nginx
location / {
    proxy_pass http://127.0.0.1:8080;
}
```

The application is not directly exposed to the Internet.

## 34. Dockerized nginx

Another model:

```text
Internet
  ↓
container nginx
  ↓
container app
```

This is useful when the whole stack should be portable as Compose.

For a small VPS, host nginx is often simpler if it already routes multiple applications and domains.

## 35. Database in Docker

A database can run in Docker, especially for:

- development,
- small projects,
- labs.

For production, consider:

- backup,
- persistence,
- upgrades,
- monitoring,
- memory,
- filesystem,
- recovery.

The fact that PostgreSQL runs in a container does not remove database administration.

## 36. Backup a PostgreSQL container

Prefer logical database tools:

```bash
docker compose exec -T db   pg_dump -U app app > backup.sql
```

Do not treat copying a live database directory as a universal safe backup method.

## 37. Resource usage

```bash
docker stats
```

Inspect one container:

```bash
docker inspect CONTAINER
```

Host resources still matter:

```bash
free -h
df -h
top
```

## 38. Resource limits

Compose example:

```yaml
services:
  app:
    mem_limit: 512m
```

Exact resource-control behavior can differ between Compose mode and orchestration platforms, so verify the current documentation for advanced constraints.

## 39. Disk usage

```bash
docker system df
```

Docker may consume disk through:

- images,
- stopped containers,
- volumes,
- build cache,
- logs.

## 40. Cleanup

Unused objects:

```bash
docker system prune
```

More aggressive options can remove more data.

Inspect first:

```bash
docker system df
docker ps -a
docker volume ls
docker image ls
```

Do not blindly prune a production server.

## 41. Container logs and disk growth

Docker's default logging can grow significantly.

For long-running services, configure sensible logging/rotation or integrate with your logging stack.

## 42. Security basics

- use trusted base images,
- scan images,
- keep images updated,
- do not run as root unless necessary,
- do not mount the Docker socket into random containers,
- do not put secrets into Dockerfiles,
- avoid privileged mode,
- expose only needed ports.

## 43. USER in Dockerfile

Example:

```dockerfile
RUN useradd --system --uid 10001 app
USER app
```

Running as non-root reduces impact if the application is compromised.

## 44. Privileged containers

Avoid:

```bash
--privileged
```

unless you understand exactly why it is needed.

It removes many isolation boundaries.

## 45. Docker socket

Mounting:

```text
/var/run/docker.sock
```

into a container often gives it near-root control over the Docker host.

Treat access to the socket as highly privileged.

## 46. Secrets

Bad:

```dockerfile
ENV API_KEY=secret
```

Secrets may remain in image metadata/layers.

Better options depend on the deployment environment:

- runtime environment variables,
- mounted secret files,
- Docker/Swarm/Kubernetes secrets,
- external secret managers.

## 47. Image scanning

Example tools:

- Trivy,
- Grype,
- registry-native scanners.

A scanner finding a CVE does not automatically mean the application is exploitable, but findings should be assessed.

## 48. Multi-architecture images

You may need:

```text
linux/amd64
linux/arm64
```

Buildx can build several architectures.

Example:

```bash
docker buildx build   --platform linux/amd64,linux/arm64   -t registry.example.com/myapp:1.0   --push .
```

## 49. Registries

Tag:

```bash
docker tag myapp:1.0 ghcr.io/owner/myapp:1.0
```

Push:

```bash
docker push ghcr.io/owner/myapp:1.0
```

Authenticate according to the registry's documentation.

## 50. Development workflow

A simple pattern:

```text
local source code
 ↓
docker build
 ↓
docker run / docker compose
 ↓
tests
 ↓
push Git
 ↓
CI builds image
 ↓
registry
 ↓
server pulls image
 ↓
docker compose up -d
```

## 51. Local to server migration

You do not normally “copy a running container.”

Move:

- source code,
- Dockerfile/Compose,
- configuration,
- images via a registry,
- persistent data through a deliberate migration/backup process.

The server recreates containers from the same definition.

## 52. How much overhead Docker adds

Docker adds:

- image layers,
- container metadata,
- logs,
- writable layers,
- runtime processes.

It does not add a full guest OS RAM allocation like a VM.

For a small Go application, the biggest disk cost is usually the base image and accumulated old images/build cache, not the Docker runtime itself.

## 53. Export and import

Export a container filesystem:

```bash
docker export CONTAINER > container.tar
```

Import:

```bash
docker import container.tar
```

This loses normal image history/config and is not the usual deployment method.

Save an image:

```bash
docker save myapp:1.0 | gzip > myapp.tar.gz
```

Load:

```bash
gunzip -c myapp.tar.gz | docker load
```

For normal deployments, a registry is usually better.

## 54. Volumes backup

A generic volume backup can be made by mounting it into a temporary container, but application-aware backups are safer for databases.

Before restoring, understand ownership and consistency requirements.

## 55. Updating a Compose application

Typical workflow:

```bash
cd /srv/myapp
git pull
docker compose pull
docker compose build
docker compose up -d
docker compose ps
docker compose logs --tail 100
```

Use either pulled images or local builds according to your deployment model; do not blindly do both if one is unnecessary.

## 56. Rollback

If images are versioned:

```yaml
image: ghcr.io/owner/myapp:1.4.2
```

rollback can mean changing to:

```yaml
image: ghcr.io/owner/myapp:1.4.1
```

then:

```bash
docker compose pull
docker compose up -d
```

Database migrations may complicate rollback.

## 57. Docker Compose project structure

Example:

```text
project/
├── compose.yaml
├── Dockerfile
├── .dockerignore
├── .env.example
├── README.md
├── cmd/
├── internal/
└── web/
```

Production secrets should not be committed.

## 58. .env in Compose

Compose can read variables from an environment file.

Example:

```text
APP_IMAGE=ghcr.io/owner/app:1.0.0
APP_PORT=8080
```

Compose:

```yaml
services:
  app:
    image: ${APP_IMAGE}
    ports:
      - "127.0.0.1:${APP_PORT}:8080"
```

Protect secret env files with appropriate permissions.

## 59. Docker Desktop vs Docker Engine

Docker Desktop is a desktop product that can bundle:

- Engine/VM integration,
- GUI,
- Compose,
- extensions.

On a Linux server you usually need Docker Engine and Compose, not Desktop.

## 60. Docker alternatives

Depending on the environment:

- Podman,
- containerd,
- nerdctl,
- Kubernetes runtimes,
- FreeBSD jails.

Know the OCI container-image ecosystem, not only one command name.

## 61. Troubleshooting checklist

If the app does not work:

1. Is the container running?

```bash
docker compose ps
```

2. Logs?

```bash
docker compose logs --tail 200
```

3. Is the expected port published?

```bash
docker ps
ss -lntp
```

4. Does the app work inside/locally?

```bash
curl http://127.0.0.1:8080/health
```

5. Is the volume mounted?

```bash
docker inspect CONTAINER
```

6. Does DNS/service-name resolution work between containers?

7. Is the host out of disk or memory?

```bash
df -h
free -h
docker system df
```

## 62. Common mistakes

- using `localhost` to reach another container,
- forgetting persistence,
- exposing database ports publicly,
- using `latest` everywhere,
- storing secrets in the image,
- running everything as root,
- using `docker compose down -v` by accident,
- no backups,
- no log rotation,
- blind `docker system prune`,
- no resource monitoring.

## 63. What to know by heart

```bash
docker ps
docker ps -a
docker image ls
docker logs -f NAME
docker exec -it NAME sh
docker inspect NAME
docker stats
docker system df

docker compose up -d
docker compose down
docker compose ps
docker compose logs -f
docker compose pull
docker compose build
```

## 64. Practical recommendation for small projects

For a small Go/HTML/CSS/JS project on Debian:

```text
Git repository
  ↓
Dockerfile
  ↓
container on localhost
  ↓
host nginx reverse proxy
  ↓
HTTPS/domain
```

Add PostgreSQL as a managed service or a carefully managed local/container database when needed.

This is simple, portable, and easy to understand.

## Summary

Docker is not magic. It is a reproducible way to package and run processes in isolated Linux environments.

Learn these five ideas first:

```text
image
container
port
volume
Compose
```

Then add registries, CI/CD, security, and advanced networking only when the project needs them.
