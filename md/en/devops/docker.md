# Docker — Practical Handbook
> Goal: not to become a Docker expert from scratch, but to confidently run existing projects, build your own images, move them between computers and servers, troubleshoot problems, and understand what Docker is actually doing.
# 1. What Docker is
Docker runs applications in containers. A container is an isolated process environment that shares the host kernel but can have its own filesystem, libraries, configuration, environment variables, ports, networks and resource limits.
It is not a full virtual machine.
```text
Linux host
│
├── Docker Engine
├── application container A
├── application container B
└── database container
```
Core concepts: image = application template, container = running image instance, Dockerfile = image build recipe, volume = persistent data, network = container connectivity, registry = image storage, Compose = multi-container application definition.
# 2. Docker vs virtual machines
A VM includes its own kernel and operating system. Containers share the host kernel and therefore start faster and usually use fewer resources.
```text
Virtual machine: Host → Hypervisor → Guest Kernel + OS + app
Docker: Linux Host → Docker Engine → isolated application containers
```
Containers are especially useful for backend services, web applications, databases used in development, CI jobs and reproducible runtime environments.
# 3. Operating systems
Docker is fundamentally a Linux container technology. It runs natively on Linux distributions such as Debian, Ubuntu, Fedora, Rocky Linux and AlmaLinux.
Docker Desktop on Windows and macOS uses a Linux environment underneath. FreeBSD does not use Docker as a native container technology; its native isolation mechanism is jails.
# 4. Check installation
```bash
docker --version
docker info
```
`docker info` shows engine version, images, containers, storage driver, runtimes and other daemon details.
# 5. Start and stop Docker
```bash
sudo systemctl start docker
sudo systemctl stop docker
sudo systemctl restart docker
sudo systemctl status docker
sudo systemctl enable --now docker
```
# 6. Docker without sudo
```bash
sudo usermod -aG docker "$USER"
newgrp docker
docker ps
```
## Security note
Membership in the `docker` group is effectively root-equivalent on a normal Docker host. Treat it as privileged access.
# 7. First container
```bash
docker run hello-world
```
Docker checks for the image locally, pulls it if missing, creates a container, runs it and shows the program output.
# 8. Images
```bash
docker images
docker image ls
```
# 9. Pulling an image
```bash
docker pull nginx
docker pull nginx:1.28
docker pull postgres:17
```
# 10. Removing an image
```bash
docker rmi nginx
docker image rm nginx
docker rmi IMAGE_ID
docker rmi -f nginx
```
# 11. Running a container
```bash
docker run IMAGE
docker run -d nginx
```
`-d` means detached mode, so the container runs in the background.
# 12. Naming a container
```bash
docker run -d --name web nginx
docker stop web
docker start web
docker logs web
```
# 13. Listing containers
```bash
docker ps
docker ps -a
docker container ls
docker container ls -a
```
# 14. Start, stop, restart
```bash
docker start web
docker stop web
docker restart web
```
# 15. Removing a container
```bash
docker rm web
docker rm -f web
```
# 16. Ports
A container has its own network namespace. Publishing a port maps a host port to a container port.
```bash
docker run -d --name web -p 8080:80 nginx
```
```text
HOST:CONTAINER
8080:80
```
Now `http://localhost:8080` reaches port 80 inside the container.
# 17. Port only on localhost
```bash
docker run -d -p 127.0.0.1:8080:80 nginx
```
This is useful when nginx on the host acts as a reverse proxy and the container should not be directly reachable from the network.
# 18. Checking port mappings
```bash
docker port web
docker ps
```
# 19. Container logs
```bash
docker logs web
docker logs --tail 50 web
docker logs -f web
docker logs --tail 100 -f web
```
# 20. Entering a container
```bash
docker exec -it web bash
docker exec -it web sh
```
Use `sh` when the image does not contain Bash. Minimal images may not contain any shell.
# 21. Running a single command
```bash
docker exec web ls /etc
docker exec postgres pg_isready
```
# 22. Environment variables
```bash
docker run -d -e APP_ENV=production -e PORT=8080 myapp
```
# 23. `.env` file
```env
APP_ENV=production
DATABASE_URL=postgres://app:secret@db/app
PORT=8080
```
```bash
docker run --env-file .env myapp
```
Do not commit secret-filled `.env` files to a public repository.
```gitignore
.env
.env.*
```
# 24. Container filesystem
Changes made in a container's writable layer disappear when that container is removed. Persistent state belongs in volumes, bind mounts, external databases or object storage.
# 25. Bind mount
```bash
docker run -d -p 8080:80 -v "$PWD/html:/usr/share/nginx/html" nginx
```
Host file changes are immediately visible inside the container.
# 26. `--mount` syntax
```bash
docker run -d --mount type=bind,source="$PWD/html",target=/usr/share/nginx/html nginx
```
# 27. Volumes
```bash
docker volume ls
docker volume create postgres-data
docker run -d --name db -v postgres-data:/var/lib/postgresql/data postgres:17
```
# 28. Where Docker stores volumes
On Linux Docker commonly stores managed volume data under `/var/lib/docker/volumes/`, but you should manage volumes through Docker commands rather than editing that directory directly.
# 29. Volume information
```bash
docker volume inspect postgres-data
```
# 30. Removing a volume
```bash
docker volume rm postgres-data
```
Removing a volume destroys the data stored there.
# 31. Docker networks
```bash
docker network ls
```
Docker normally provides `bridge`, `host` and `none`. User-defined bridge networks are the usual choice for multi-container applications.
# 32. Creating a network
```bash
docker network create app-network
```
# 33. Running containers on the same network
```bash
docker run -d --name db --network app-network postgres:17
docker run -d --name app --network app-network myapp
```
The application can address the database by container name, for example `db:5432`.
# 34. Inspect
```bash
docker inspect web
docker inspect -f '{{.State.Status}}' web
```
Inspect exposes configuration, networks, mounts, environment, ports, state, image and entrypoint.
# 35. Container statistics
```bash
docker stats
```
# 36. Processes in a container
```bash
docker top web
```
# 37. Dockerfile
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
# 38. How to read a Dockerfile
## `FROM`
Selects the base image or starts a new build stage.
## `WORKDIR`
Sets the working directory for later instructions.
## `COPY`
Copies files from the build context into the image.
## `RUN`
Executes a command during image build and stores the result in a layer.
## `ENV`
Defines an environment variable in the image/runtime.
## `EXPOSE`
Documents an intended container port; it does not publish the port by itself.
## `CMD`
Defines the default command/arguments for the container.
## `ENTRYPOINT`
Defines the primary executable; `CMD` can then provide default arguments.
# 39. Building an image
```bash
docker build -t myapp .
```
# 40. Tagging an image
```bash
docker tag myapp myapp:1.0
```
Use explicit versions such as `myapp:1.0` instead of relying only on `latest`.
# 41. Running your own image
```bash
docker run -d --name myapp -p 8080:8080 myapp:1.0
```
# 42. `.dockerignore`
```dockerignore
.git
.gitignore
.env
node_modules
tmp
dist
*.log
```
`.dockerignore` keeps unnecessary files out of the build context.
# 43. Multi-stage build
Use one stage for compilation and a smaller stage for runtime. This avoids shipping compilers, source code and build caches in production images.
# 44. Even smaller Go image
```dockerfile
FROM golang:1.25 AS builder
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o app

FROM scratch
COPY --from=builder /src/app /app
ENTRYPOINT ["/app"]
```
A `scratch` image has no shell, so `docker exec -it app sh` will not work.
# 45. Docker Compose
Compose describes a multi-container application in one YAML file, commonly `compose.yaml`.
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
# 46. Starting Compose
```bash
docker compose up
docker compose up -d
```
# 47. Build and run
```bash
docker compose up -d --build
```
# 48. Compose status
```bash
docker compose ps
```
# 49. Compose logs
```bash
docker compose logs
docker compose logs -f
docker compose logs -f app
```
# 50. Stopping Compose
```bash
docker compose stop
docker compose start
```
# 51. Removing Compose containers
```bash
docker compose down
```
Named volumes are preserved by default.
# 52. Removing Compose with volumes
```bash
docker compose down -v
```
This can delete database data. Use with care.
# 53. Restarting one service
```bash
docker compose restart app
```
# 54. Shell in a Compose container
```bash
docker compose exec app sh
docker compose exec app bash
```
# 55. Running a one-off command
```bash
docker compose exec app ./app migrate
docker compose exec app npm test
```
# 56. Validating Compose
```bash
docker compose config
```
This shows the effective configuration after variable interpolation and merges.
# 57. Compose project names
```bash
docker compose -p example-site up -d
```
Project names influence generated container/network names.
# 58. Restart policy
```yaml
services:
  app:
    image: myapp
    restart: unless-stopped
```
Common values are `no`, `always`, `on-failure` and `unless-stopped`.
# 59. Healthcheck
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
# 60. Memory limits
```bash
docker run --memory=512m myapp
docker run --cpus=1.0 myapp
```
# 61. Copying files to and from a container
```bash
docker cp config.json web:/app/config.json
docker cp web:/app/report.txt ./report.txt
```
# 62. Exporting an image — `docker save`
```bash
docker save myapp:1.0 -o myapp.tar
docker load -i myapp.tar
```
# 63. Compressing an image archive
```bash
docker save myapp:1.0 | gzip > myapp.tar.gz
gzip -dc myapp.tar.gz | docker load
```
# 64. `docker save` vs `docker export`
## `docker save`
Exports an image with its layers, tags and metadata. Use it for moving images.
## `docker export`
Exports the filesystem of a container. It does not preserve image history/configuration like save/load.
# 65. Rule
```text
Move application image: docker save / docker load
Dump container filesystem: docker export / docker import
```
# 66. Registry
A registry stores images so hosts can push and pull them. Examples: Docker Hub, GitHub Container Registry, GitLab Container Registry and private registries.
# 67. Logging in to a registry
```bash
docker login
docker login ghcr.io
```
# 68. Pushing an image
```bash
docker tag myapp:1.0 username/myapp:1.0
docker push username/myapp:1.0
docker pull username/myapp:1.0
```
# 69. Typical deployment through a registry
```bash
docker build -t ghcr.io/user/myapp:1.2.0 .
docker push ghcr.io/user/myapp:1.2.0
```
On the VPS:
```bash
docker pull ghcr.io/user/myapp:1.2.0
docker compose up -d
```
# 70. Typical deployment without a registry
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
# 71. Best model for small projects
A simple small-project layout is source + Dockerfile + compose.yaml in Git, with Docker and nginx on the VPS.
## Variant A — build on the server
```bash
git pull
docker compose up -d --build
```
## Variant B — prebuilt images
Build in CI/local → push to registry → pull and restart on the VPS.
# 72. Docker + nginx reverse proxy
```yaml
services:
  app:
    build: .
    ports:
      - "127.0.0.1:8080:8080"
    restart: unless-stopped
```
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
# 73. Updating an application
```bash
cd /srv/myapp
git pull
docker compose up -d --build
```
# 74. Updating an image from a registry
```bash
docker compose pull
docker compose up -d
```
# 75. Checking logs after deployment
```bash
docker compose logs --tail 100 -f
```
# 76. Backing up a volume
```bash
docker run --rm -v postgres-data:/data -v "$PWD:/backup" alpine tar czf /backup/postgres-data.tar.gz -C /data .
```
# 77. Restoring a volume
```bash
docker volume create postgres-data
docker run --rm -v postgres-data:/data -v "$PWD:/backup" alpine sh -c 'cd /data && tar xzf /backup/postgres-data.tar.gz'
```
# 78. Database backup
```bash
docker exec db pg_dump -U app app > backup.sql
cat backup.sql | docker exec -i db psql -U app app
```
For databases, logical backups are often safer than copying live database files.
# 79. Prune — cleanup
```bash
docker system df
```
# 80. Removing unused resources
```bash
docker system prune
docker system prune -a
```
`-a` is more aggressive and removes all unused images.
# 81. Volume prune
```bash
docker volume prune
```
Volumes may contain important data.
# 82. Build cache
```bash
docker builder du
docker builder prune
```
# 83. Common problems
## Port already in use
```bash
sudo ss -lntp | grep ':8080'
```
Stop the conflicting service or publish a different host port.
# 84. Container exits immediately
```bash
docker ps -a
docker logs NAME
```
A container runs only while its main process is running.
# 85. Bash is unavailable
```bash
docker exec -it app sh
```
Minimal images may not contain Bash. `scratch` images may contain no shell at all.
# 86. Code changed but application is old
```bash
docker compose up -d --build
```
# 87. Docker uses old cache
```bash
docker build --no-cache -t myapp .
docker compose build --no-cache
docker compose up -d
```
# 88. Containers cannot communicate
Do not use `localhost` to reach another container. Use the Compose service name, e.g. `db:5432`.
# 89. `localhost` — important rule
```text
on host: localhost = host
inside container: localhost = that container
another container: use service/container name
```
# 90. Container cannot reach a host service
On Linux, host access is different from Docker Desktop. Prefer explicit interfaces, shared networks, or move the dependency into Compose when practical.
# 91. Step-by-step debugging
```bash
docker ps -a
docker logs app
docker inspect app
docker exec -it app sh
```
Inside the container inspect environment, process list and filesystem. For network issues inspect Docker networks.
# 92. Compose debugging
```bash
docker compose ps
docker compose logs
docker compose config
docker compose exec app sh
```
# 93. Security
Do not bake secrets into Dockerfiles or images. Pass them at runtime via protected environment/configuration or a proper secret-management mechanism.
# 94. Do not use `latest` for critical services
Pin meaningful versions such as `postgres:17` or even an exact patch version when reproducibility matters.
# 95. Do not expose databases to the Internet unnecessarily
If only the application needs PostgreSQL, keep it on the internal Compose network and omit `ports:`.
# 96. Run as non-root
```dockerfile
RUN useradd -r -u 10001 appuser
USER appuser
CMD ["/app/app"]
```
# 97. Read-only filesystem
```bash
docker run --read-only myapp
```
```yaml
read_only: true
```
# 98. `docker run --rm`
```bash
docker run --rm alpine echo hello
```
The container is automatically removed after it exits.
# 99. Temporary Linux shell
```bash
docker run --rm -it debian:13 bash
```
# 100. Testing different software versions
```bash
docker run --rm -it node:24 bash
docker run --rm -it python:3.14 bash
docker run --rm -it golang:1.25 bash
```
# 101. Overview of important commands
## Containers
```bash
docker ps
docker ps -a
docker run IMAGE
docker stop NAME
docker restart NAME
docker rm NAME
docker logs NAME
docker exec -it NAME sh
docker inspect NAME
docker stats
```
## Images
```bash
docker images
docker pull IMAGE
docker build -t NAME .
docker rmi IMAGE
docker tag SOURCE TARGET
docker save IMAGE -o image.tar
docker load -i image.tar
```
## Volumes
```bash
docker volume ls
docker volume create NAME
docker volume inspect NAME
docker volume rm NAME
docker volume prune
```
## Networks
```bash
docker network ls
docker network create NAME
docker network inspect NAME
docker network rm NAME
```
## Compose
```bash
docker compose up -d
docker compose up -d --build
docker compose down
docker compose ps
docker compose logs -f
docker compose pull
docker compose exec SERVICE sh
docker compose config
```
# 102. Typical Go + Docker project
```text
myapp/
├── cmd/server/main.go
├── internal/
├── static/
├── templates/
├── go.mod
├── go.sum
├── Dockerfile
├── compose.yaml
└── .dockerignore
```
# 103. Compose for a Go application
```yaml
services:
  app:
    build: .
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:8080"
    environment:
      APP_ENV: production
```
# 104. Go + PostgreSQL
Put `app` and `db` on the same Compose network, use `db` as the database host, persist database data in a named volume, and avoid exposing port 5432 unless external access is actually needed.
# 105. What should be in Git
```text
Dockerfile
compose.yaml
.dockerignore
.env.example
application source code
```
Do not commit `.env`, secrets, database backups or image tar archives.
# 106. `.env.example`
```env
APP_ENV=production
DATABASE_URL=
OPENROUTER_API_KEY=
```
```bash
cp .env.example .env
```
# 107. Typical local workflow
```bash
docker compose build
docker compose up -d
docker compose logs -f app
docker compose up -d --build
```
# 108. Typical local → VPS workflow
```bash
git add .
git commit -m "Add feature"
git push
```
On the VPS:
```bash
cd /srv/myapp
git pull
docker compose up -d --build
docker compose logs --tail 100
```
# 109. Typical registry workflow
```bash
docker build -t ghcr.io/user/myapp:1.5.0 .
docker push ghcr.io/user/myapp:1.5.0
```
On the VPS:
```bash
docker compose pull
docker compose up -d
```
# 110. Updating without long downtime
A single-instance Compose deployment may have a short interruption during replacement. True zero-downtime requires multiple instances/load balancing or more advanced deployment tooling.
# 111. Check how much space Docker uses
```bash
docker system df
docker system df -v
```
# 112. Where Docker stores data
```bash
docker info | grep "Docker Root Dir"
```
The default root is commonly `/var/lib/docker`.
# 113. Do not manually copy `/var/lib/docker`
Use image export/registry, volume backups, database dumps and Git instead of copying the Docker engine's internal directory.
# 114. Migrating an application between servers
Move the repository, secrets/config, database/volume backups, then pull or rebuild images and recreate containers.
# 115. What is actually worth exporting
```text
source code → Git
Dockerfile/compose.yaml → Git
images → registry or docker save
secrets → protected backup
database → logical dump
volumes → backup
```
Treat containers as disposable runtime instances.
# 116. Docker's most important philosophy
A container should be disposable and reproducible. If deleting and recreating it destroys important data, your persistence design is wrong.
# 117. Complete small deployment example
A common small VPS stack is nginx on the host, the application on `127.0.0.1:8080` in Docker, secrets in `.env`, and source/compose files under `/srv/myapp`.
```bash
cd /srv/myapp
git pull
docker compose up -d --build
docker compose ps
docker compose logs --tail 100
```
# 118. Useful aliases
```bash
alias dps='docker ps'
alias dpa='docker ps -a'
alias di='docker images'
alias dc='docker compose'
alias dcl='docker compose logs -f'
alias dcu='docker compose up -d'
alias dcd='docker compose down'
```
# 119. Help
```bash
docker --help
docker run --help
docker compose --help
docker compose up --help
```
# 120. Minimal commands to remember
```bash
docker ps
docker ps -a
docker images
docker run
docker stop
docker start
docker rm
docker logs
docker exec -it NAME sh
docker inspect
docker build -t NAME .
docker pull
docker compose up -d
docker compose up -d --build
docker compose down
docker compose logs -f
docker system df
docker system prune
```
# 121. Minimal project workflow
## First run
```bash
git clone REPO
cd PROJECT
cp .env.example .env
docker compose up -d --build
```
## Check
```bash
docker compose ps
docker compose logs --tail 100
```
## Update
```bash
git pull
docker compose up -d --build
```
## Debug
```bash
docker compose logs -f app
docker compose exec app sh
```
## Stop
```bash
docker compose down
```
# 122. Real-life examples
## Example 1 — quick nginx
```bash
docker run -d --name nginx-test -p 8080:80 nginx
docker logs nginx-test
docker rm -f nginx-test
```
## Example 2 — temporary Debian
```bash
docker run --rm -it debian:13 bash
```
## Example 3 — PostgreSQL
```bash
docker volume create pgdata
docker run -d --name postgres -e POSTGRES_PASSWORD=secret -v pgdata:/var/lib/postgresql/data postgres:17
```
## Example 4 — export image to another computer
```bash
docker build -t web-monitor:1.0 .
docker save web-monitor:1.0 | gzip > web-monitor.tar.gz
scp web-monitor.tar.gz server:/tmp/
```
## Example 5 — Go application on VPS
```bash
git clone git@github.com:user/app.git
cd app
docker compose up -d --build
docker compose logs -f app
```
# 123. Docker — mental map
```text
Dockerfile → docker build → IMAGE → docker run → CONTAINER
CONTAINER uses ports + env + networks + volumes
compose.yaml → docker compose up → multiple coordinated services
```
# 124. What you should know after this handbook
You should understand image vs container, engine lifecycle, ports, logs, exec, volumes, networks, Dockerfiles, image builds, Compose, deployment, image transfer, backups, cleanup, troubleshooting and basic security.
# 125. Cheat sheet — one screen
# status
```bash
docker ps
docker ps -a
docker images
```
# run
```bash
docker run -d --name app -p 8080:8080 image
```
# logs
```bash
docker logs -f app
```
# shell
```bash
docker exec -it app sh
```
# stop/start
```bash
docker stop app
docker start app
docker restart app
```
# remove
```bash
docker rm -f app
docker rmi image
```
# build
```bash
docker build -t app:1.0 .
```
# export image
```bash
docker save app:1.0 -o app.tar
```
# import image
```bash
docker load -i app.tar
```
# compose
```bash
docker compose up -d
docker compose up -d --build
docker compose ps
docker compose logs -f
docker compose down
```
# disk usage
```bash
docker system df
```
# cleanup
```bash
docker system prune
```
# 126. Most important things to remember
1. Image is a template; container is a running instance. 2. Containers should be disposable. 3. Keep persistent data in volumes or external storage. 4. Keep source and infrastructure config in Git. 5. Use Compose for multi-service apps. 6. Start troubleshooting with `docker logs`. 7. Use `docker inspect` for details. 8. Use save/load for images. 9. Export/import is for container filesystems and is rarely the right migration tool. 10. A small VPS usually needs only Git + Docker + Compose + nginx + backups.
# End
For small private projects you usually do not need Kubernetes or Swarm. Debian + Git + Docker + Compose + nginx + Let's Encrypt + regular backups is a perfectly sensible stack.
