# Docker — Practical Handbook

> Goal: comfortably run existing projects, build your own images, move them between machines and servers, troubleshoot problems and understand what Docker actually does.

---

# 1. What Docker is

Docker runs applications in **containers**.

A container is an isolated process environment that shares the host kernel but may have its own filesystem, libraries, configuration, environment variables, ports, network and resource limits.

It is not a full virtual machine.

```text
Linux host
│
├── Docker Engine
│
├── application container A
├── application container B
└── database container
```

Important concepts:

| Concept | Meaning |
|---|---|
| image | application template |
| container | running instance of an image |
| Dockerfile | instructions for building an image |
| volume | persistent data outside the container layer |
| network | network connecting containers |
| registry | image repository, e.g. Docker Hub |
| Compose | multi-container configuration |

# 2. Docker vs virtual machines

A VM includes its own kernel and operating system. Containers share the host kernel, so they usually start faster and use less storage.

Containers are a good fit for backends, services and web applications.

# 3. Operating systems

Docker is native primarily on Linux. On Windows and macOS, Docker Desktop runs a Linux environment underneath.

FreeBSD does not use Docker natively; its native container mechanism is jails.

# 4. Check installation

```bash
docker --version
docker info
```

`docker info` shows server version, containers, images, storage driver, networks and runtime configuration.

# 5. Start and stop Docker

On Debian with systemd:

```bash
sudo systemctl start docker
sudo systemctl stop docker
sudo systemctl restart docker
sudo systemctl status docker
sudo systemctl enable docker
sudo systemctl enable --now docker
```

# 6. Docker without sudo

```bash
sudo usermod -aG docker "$USER"
newgrp docker
docker ps
```

Membership in the docker group is effectively root-equivalent. Treat it accordingly.

# 7. First container

```bash
docker run hello-world
```

Docker checks for the image, pulls it if needed, creates a container, starts the program and exits when the program ends.

# 8. Images

```bash
docker images
docker image ls
docker pull nginx
docker pull nginx:1.28
docker pull postgres:17
docker rmi nginx
docker image rm nginx
```

# 9. Running containers

```bash
docker run IMAGE
docker run -d nginx
docker run -d --name web nginx
```

`-d` runs the container in the background.

# 10. Container list and lifecycle

```bash
docker ps
docker ps -a
docker container ls
docker container ls -a

docker start web
docker stop web
docker restart web
docker rm web
docker rm -f web
```

# 11. Ports

Container ports are not automatically available on the host.

```bash
docker run -d   --name web   -p 8080:80   nginx
```

Meaning:

```text
HOST:CONTAINER
8080:80
```

Bind only to localhost when a host reverse proxy sits in front:

```bash
docker run -d   -p 127.0.0.1:8080:80   nginx
```

Inspect mappings:

```bash
docker port web
docker ps
```

# 12. Logs

```bash
docker logs web
docker logs --tail 50 web
docker logs -f web
docker logs --tail 100 -f web
```

# 13. Entering a container

```bash
docker exec -it web bash
docker exec -it web sh
```

Run one command without opening a shell:

```bash
docker exec web ls /etc
docker exec postgres pg_isready
```

# 14. Environment variables

```bash
docker run -d   -e APP_ENV=production   -e PORT=8080   myapp
```

Using an env file:

```env
APP_ENV=production
DATABASE_URL=postgres://app:secret@db/app
PORT=8080
```

```bash
docker run --env-file .env myapp
```

Do not commit secret-filled env files.

# 15. Container filesystem

Changes made directly inside a container's writable layer disappear when that container is deleted.

Persistent data belongs in volumes, bind mounts, external databases or object storage.

# 16. Bind mounts

```bash
docker run -d   -p 8080:80   -v "$PWD/html:/usr/share/nginx/html"   nginx
```

Equivalent explicit syntax:

```bash
docker run -d   --mount type=bind,source="$PWD/html",target=/usr/share/nginx/html   nginx
```

# 17. Volumes

```bash
docker volume ls
docker volume create postgres-data
docker volume inspect postgres-data
docker volume rm postgres-data
```

Use a named volume:

```bash
docker run -d   --name db   -v postgres-data:/var/lib/postgresql/data   postgres:17
```

Deleting a volume deletes its stored data.

# 18. Docker networks

```bash
docker network ls
docker network create app-network
```

Containers on the same user-defined network can reach each other by container name.

```bash
docker run -d --name db --network app-network postgres:17
docker run -d --name app --network app-network myapp
```

The app can use:

```text
postgres://user:password@db:5432/app
```

# 19. Inspect and stats

```bash
docker inspect web
docker inspect -f '{{.State.Status}}' web
docker stats
docker top web
```

`inspect` is one of the most useful troubleshooting commands.

# 20. Dockerfile

Example Go multi-stage build:

```dockerfile
FROM golang:1.25 AS build

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 go build -o app ./cmd/server

FROM debian:13-slim

WORKDIR /app

COPY --from=build /src/app /app/app

EXPOSE 8080

CMD ["/app/app"]
```

Important instructions:

- `FROM` — base image,
- `WORKDIR` — working directory,
- `COPY` — copy build context files,
- `RUN` — execute during image build,
- `ENV` — set environment variables,
- `EXPOSE` — document a port,
- `CMD` — default command,
- `ENTRYPOINT` — main executable.

`EXPOSE` does not publish the port.

# 21. Build and tag images

```bash
docker build -t myapp .
docker tag myapp myapp:1.0
docker run -d --name myapp -p 8080:8080 myapp:1.0
```

The final dot is the build context.

# 22. .dockerignore

```dockerignore
.git
.gitignore
.env
node_modules
tmp
dist
*.log
```

Keep unnecessary and sensitive files out of build context.

# 23. Multi-stage builds

Use a build image for compilers and tooling, then copy only final artifacts to the runtime image.

For statically compiled Go software, a very small image can use `scratch`:

```dockerfile
FROM golang:1.25 AS builder
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o app

FROM scratch
COPY --from=builder /src/app /app
ENTRYPOINT ["/app"]
```

A scratch image has no shell.

# 24. Docker Compose

`compose.yaml` example:

```yaml
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/app
    depends_on:
      - db

  db:
    image: postgres:17
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

# 25. Compose commands

```bash
docker compose up
docker compose up -d
docker compose up -d --build
docker compose ps
docker compose logs
docker compose logs -f
docker compose logs -f app
docker compose stop
docker compose start
docker compose restart app
docker compose down
docker compose down -v
docker compose exec app sh
docker compose config
```

`docker compose down -v` may delete database volumes.

# 26. Project names

Compose usually derives names from the directory.

Override:

```bash
docker compose -p example-site up -d
```

# 27. Restart policy

```yaml
services:
  app:
    image: myapp
    restart: unless-stopped
```

Common values:

```text
no
always
on-failure
unless-stopped
```

For a simple VPS, `unless-stopped` is often a sensible choice.

# 28. Healthchecks

```yaml
services:
  app:
    image: myapp
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 5s
      retries: 3
```

Container state can then show healthy or unhealthy.

# 29. Resource limits

```bash
docker run --memory=512m myapp
docker run --cpus=1.0 myapp
```

# 30. Copying files

```bash
docker cp config.json web:/app/config.json
docker cp web:/app/report.txt ./report.txt
```

# 31. Moving images with save/load

```bash
docker save myapp:1.0 -o myapp.tar
docker load -i myapp.tar
```

Compressed:

```bash
docker save myapp:1.0 | gzip > myapp.tar.gz
gzip -dc myapp.tar.gz | docker load
```

# 32. save vs export

`docker save` exports an **image**, preserving image layers, tags and metadata.

```bash
docker save myapp:1.0 -o myapp.tar
docker load -i myapp.tar
```

`docker export` exports the writable filesystem of a **container**:

```bash
docker export web -o web.tar
docker import web.tar myweb
```

For normal application distribution, prefer save/load or a registry.

# 33. Registries

Typical flow:

```text
local machine
   │ docker push
   ▼
registry
   │ docker pull
   ▼
server
```

Common registries include Docker Hub, GitHub Container Registry and GitLab Container Registry.

```bash
docker login
docker login ghcr.io
docker tag myapp:1.0 username/myapp:1.0
docker push username/myapp:1.0
docker pull username/myapp:1.0
```

# 34. Deployment through a registry

Local/CI:

```bash
docker build -t ghcr.io/user/myapp:1.2.0 .
docker push ghcr.io/user/myapp:1.2.0
```

VPS:

```bash
docker pull ghcr.io/user/myapp:1.2.0
docker compose up -d
```

# 35. Deployment without a registry

```bash
docker build -t myapp:1.0 .
docker save myapp:1.0 | gzip > myapp.tar.gz
scp myapp.tar.gz user@server:/tmp/
```

On the server:

```bash
gzip -dc /tmp/myapp.tar.gz | docker load
docker compose up -d
```

# 36. Small-project model

```text
GitHub
  ├── source code
  ├── Dockerfile
  └── compose.yaml

VPS
  ├── nginx
  ├── Docker
  └── applications
```

Simple build-on-server workflow:

```bash
git pull
docker compose up -d --build
```

More mature workflow:

```text
CI build → registry → VPS pull → restart
```

# 37. Docker + nginx reverse proxy

Compose:

```yaml
services:
  app:
    build: .
    ports:
      - "127.0.0.1:8080:8080"
    restart: unless-stopped
```

Host nginx:

```nginx
server {
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

# 38. Updating an application

Typical VPS workflow:

```bash
cd /srv/myapp
git pull
docker compose up -d --build
docker compose ps
docker compose logs --tail 100
```

When using registry images:

```bash
docker compose pull
docker compose up -d
```

# 39. Backups

Containers are disposable; data is not.

Back up named volumes and databases separately.

For PostgreSQL, prefer logical backups such as `pg_dump` where appropriate rather than copying a live database directory blindly.

# 40. Cleanup

Inspect disk use:

```bash
docker system df
```

Remove unused objects carefully:

```bash
docker container prune
docker image prune
docker volume prune
docker network prune
docker system prune
```

`docker system prune -a` is more aggressive.

Always understand what will be removed before confirming.

# 41. Troubleshooting workflow

When a container does not work:

1. check `docker ps -a`,
2. inspect `docker logs CONTAINER`,
3. inspect configuration with `docker inspect`,
4. verify port mappings,
5. verify networks,
6. test the service from inside the container,
7. test from the host,
8. inspect Compose config,
9. inspect host firewall/reverse proxy.

Useful commands:

```bash
docker ps -a
docker logs --tail 100 app
docker inspect app
docker port app
docker network inspect NETWORK
docker compose config
docker compose ps
docker compose logs -f
```

# 42. Security basics

- avoid running containers as root when unnecessary,
- do not bake secrets into images,
- keep base images updated,
- use minimal images,
- publish only required ports,
- prefer localhost bindings behind a reverse proxy,
- scan images where appropriate,
- do not expose the Docker socket casually,
- remember that docker-group access is root-equivalent.

# 43. What you should know

You should be able to:

- run, stop and remove containers,
- inspect logs and configuration,
- publish ports,
- use bind mounts and volumes,
- connect containers with networks,
- read and write a Dockerfile,
- build and tag images,
- use Docker Compose,
- move images with save/load or a registry,
- deploy a small application behind nginx,
- back up persistent data,
- troubleshoot common container problems.
