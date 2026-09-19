# Docker — praktyczne kompendium używania

> Cel: nie nauczyć się „administracji Dockerem od zera do eksperta”, tylko swobodnie uruchamiać cudze projekty, tworzyć własne obrazy, przenosić je między komputerami i serwerami, diagnozować problemy oraz rozumieć, co Docker właściwie robi.

---

# 1. Czym jest Docker

Docker uruchamia aplikacje w **kontenerach**.

Kontener to odizolowane środowisko procesu, które korzysta z kernela hosta, ale może mieć własne:

- system plików,
- biblioteki,
- konfigurację,
- zmienne środowiskowe,
- porty,
- sieć,
- limity zasobów.

To nie jest pełna maszyna wirtualna.

Schemat:

```text
Linux host
│
├── Docker Engine
│
├── kontener aplikacji A
│   ├── program
│   ├── biblioteki
│   └── filesystem
│
├── kontener aplikacji B
│
└── kontener bazy danych
```

Najważniejsze pojęcia:

| Pojęcie | Znaczenie |
|---|---|
| image | gotowy szablon aplikacji |
| container | uruchomiona instancja obrazu |
| Dockerfile | instrukcja budowania obrazu |
| volume | trwałe dane poza kontenerem |
| network | sieć łącząca kontenery |
| registry | magazyn obrazów, np. Docker Hub |
| Compose | opis wielu kontenerów w jednym pliku |

---

# 2. Docker a maszyna wirtualna

Maszyna wirtualna:

```text
Host
└── Hypervisor
    └── VM
        ├── Kernel
        ├── OS
        └── aplikacja
```

Docker:

```text
Host Linux
└── Docker
    ├── aplikacja
    ├── aplikacja
    └── aplikacja
```

Kontenery:

- uruchamiają się szybciej,
- zajmują mniej miejsca,
- łatwo je usuwać i odtwarzać,
- łatwo je przenosić,
- dobrze nadają się do backendów, usług i aplikacji webowych.

---

# 3. Ważna uwaga o systemach

Docker działa natywnie przede wszystkim na **Linuxie**.

Na:

- Debianie,
- Ubuntu,
- Fedora,
- Arch Linux,
- Rocky Linux,
- AlmaLinux

działa bezpośrednio.

Na Windows i macOS Docker Desktop uruchamia pod spodem środowisko linuksowe.

Na FreeBSD Docker nie jest natywną technologią systemową. FreeBSD ma własne rozwiązanie kontenerowe: **jails**.

---

# 4. Sprawdzenie instalacji

```bash
docker --version
```

Przykładowy wynik:

```text
Docker version 28.x.x
```

Więcej informacji:

```bash
docker info
```

Pokazuje m.in.:

- wersję serwera,
- liczbę kontenerów,
- liczbę obrazów,
- sterownik storage,
- dostępne sieci,
- konfigurację runtime.

---

# 5. Uruchamianie i zatrzymywanie Dockera

Na Debianie z systemd:

```bash
sudo systemctl start docker
```

Zatrzymanie:

```bash
sudo systemctl stop docker
```

Restart:

```bash
sudo systemctl restart docker
```

Status:

```bash
sudo systemctl status docker
```

Automatyczny start przy bootowaniu:

```bash
sudo systemctl enable docker
```

Start od razu + włączenie autostartu:

```bash
sudo systemctl enable --now docker
```

---

# 6. Docker bez sudo

Domyślnie Docker często wymaga:

```bash
sudo docker ...
```

Można dodać użytkownika do grupy `docker`:

```bash
sudo usermod -aG docker "$USER"
```

Następnie:

```bash
newgrp docker
```

albo wylogować się i zalogować ponownie.

Test:

```bash
docker ps
```

## Uwaga bezpieczeństwa

Użytkownik należący do grupy `docker` ma praktycznie uprawnienia równoważne rootowi.

Na prywatnym serwerze jest to często akceptowalne, ale warto wiedzieć, co to oznacza.

---

# 7. Pierwszy kontener

Najprostszy test:

```bash
docker run hello-world
```

Docker:

1. sprawdzi, czy obraz istnieje lokalnie,
2. jeśli nie — pobierze go,
3. utworzy kontener,
4. uruchomi program,
5. program zakończy działanie.

---

# 8. Obrazy

Lista lokalnych obrazów:

```bash
docker images
```

lub:

```bash
docker image ls
```

Przykład:

```text
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
nginx        latest    abcdef123456   2 weeks ago   190MB
```

---

# 9. Pobieranie obrazu

```bash
docker pull nginx
```

Konkretny tag:

```bash
docker pull nginx:1.28
```

Inny przykład:

```bash
docker pull postgres:17
```

---

# 10. Usuwanie obrazu

```bash
docker rmi nginx
```

lub:

```bash
docker image rm nginx
```

Po ID:

```bash
docker rmi abcdef123456
```

Wymuszenie:

```bash
docker rmi -f nginx
```

---

# 11. Uruchamianie kontenera

Podstawowa składnia:

```bash
docker run IMAGE
```

Przykład:

```bash
docker run nginx
```

Kontener działa wtedy w terminalu na pierwszym planie.

Najczęściej używa się trybu detached:

```bash
docker run -d nginx
```

`-d` = detached, czyli działanie w tle.

---

# 12. Nadawanie nazwy kontenerowi

Bez nazwy Docker wygeneruje losową.

Lepiej użyć:

```bash
docker run -d --name web nginx
```

Teraz można pisać:

```bash
docker stop web
docker start web
docker logs web
```

zamiast używać ID.

---

# 13. Lista kontenerów

Tylko działające:

```bash
docker ps
```

Wszystkie:

```bash
docker ps -a
```

Alternatywnie:

```bash
docker container ls
docker container ls -a
```

---

# 14. Start, stop, restart

```bash
docker start web
docker stop web
docker restart web
```

---

# 15. Usuwanie kontenera

```bash
docker rm web
```

Działający kontener trzeba najpierw zatrzymać.

Albo:

```bash
docker rm -f web
```

---

# 16. Porty

Kontener ma własną przestrzeń sieciową.

Jeżeli nginx słucha wewnątrz kontenera na:

```text
80
```

to nie oznacza jeszcze, że port jest dostępny z hosta.

Trzeba go opublikować:

```bash
docker run -d \
  --name web \
  -p 8080:80 \
  nginx
```

Znaczenie:

```text
HOST:KONTENER
8080:80
```

Czyli:

```text
http://localhost:8080
```

trafia do portu 80 w kontenerze.

---

# 17. Port tylko na localhost

Jeżeli usługa ma być dostępna wyłącznie lokalnie:

```bash
docker run -d \
  -p 127.0.0.1:8080:80 \
  nginx
```

To bardzo przydatne, gdy przed Dockerem stoi nginx jako reverse proxy.

---

# 18. Sprawdzanie mapowania portów

```bash
docker port web
```

lub:

```bash
docker ps
```

---

# 19. Logi kontenera

```bash
docker logs web
```

Ostatnie 50 linii:

```bash
docker logs --tail 50 web
```

Śledzenie logów na żywo:

```bash
docker logs -f web
```

Ostatnie 100 linii + dalsze śledzenie:

```bash
docker logs --tail 100 -f web
```

---

# 20. Wejście do kontenera

Jeśli obraz ma bash:

```bash
docker exec -it web bash
```

Jeżeli bash nie istnieje:

```bash
docker exec -it web sh
```

`-i`:

```text
interactive
```

`-t`:

```text
pseudo-terminal
```

Po wejściu można np.:

```bash
ls
cd /app
ps aux
cat /etc/os-release
```

---

# 21. Uruchomienie pojedynczego polecenia

Nie trzeba wchodzić do shella.

```bash
docker exec web ls /etc
```

Przykład:

```bash
docker exec postgres pg_isready
```

---

# 22. Zmienne środowiskowe

Można przekazywać wartości przez:

```bash
-e
```

Przykład:

```bash
docker run -d \
  -e APP_ENV=production \
  -e PORT=8080 \
  myapp
```

W kontenerze będą dostępne:

```bash
echo "$APP_ENV"
```

---

# 23. Plik `.env`

Przykład:

```env
APP_ENV=production
DATABASE_URL=postgres://app:secret@db/app
PORT=8080
```

Uruchomienie:

```bash
docker run --env-file .env myapp
```

Nie należy wrzucać pliku `.env` z hasłami do publicznego repozytorium.

Typowy `.gitignore`:

```gitignore
.env
.env.*
```

---

# 24. System plików kontenera

Zmiany wykonane bezpośrednio w filesystemie kontenera są nietrwałe w sensie infrastruktury.

Można np.:

```bash
docker exec -it web sh
```

i utworzyć:

```bash
echo test > /tmp/test.txt
```

Plik będzie istniał, dopóki istnieje dany kontener.

Po usunięciu kontenera:

```bash
docker rm -f web
```

dane z jego zapisywalnej warstwy znikną.

Dlatego trwałe dane przechowujemy w:

- volumes,
- bind mounts,
- zewnętrznych bazach danych,
- object storage.

---

# 25. Bind mount

Bind mount podłącza katalog hosta do kontenera.

Przykład:

```bash
docker run -d \
  -p 8080:80 \
  -v "$PWD/html:/usr/share/nginx/html" \
  nginx
```

Znaczenie:

```text
HOST                          KONTENER
./html        ->              /usr/share/nginx/html
```

Zmiana pliku na hoście jest natychmiast widoczna w kontenerze.

---

# 26. Składnia `--mount`

Bardziej czytelna wersja:

```bash
docker run -d \
  --mount type=bind,source="$PWD/html",target=/usr/share/nginx/html \
  nginx
```

---

# 27. Volumes

Volume jest zarządzany przez Dockera.

Lista:

```bash
docker volume ls
```

Utworzenie:

```bash
docker volume create postgres-data
```

Użycie:

```bash
docker run -d \
  --name db \
  -v postgres-data:/var/lib/postgresql/data \
  postgres:17
```

---

# 28. Gdzie Docker trzyma volume

Na Linuksie zazwyczaj:

```text
/var/lib/docker/volumes/
```

Nie należy jednak budować workflow na bezpośrednim grzebaniu w tym katalogu.

Do obsługi używamy:

```bash
docker volume ...
```

---

# 29. Informacje o volume

```bash
docker volume inspect postgres-data
```

---

# 30. Usuwanie volume

```bash
docker volume rm postgres-data
```

Usunięcie volume oznacza utratę zapisanych tam danych.

---

# 31. Sieci Dockera

Lista:

```bash
docker network ls
```

Standardowo Docker tworzy m.in.:

```text
bridge
host
none
```

Najczęściej używana jest własna sieć bridge.

---

# 32. Tworzenie sieci

```bash
docker network create app-network
```

---

# 33. Uruchamianie kontenerów w jednej sieci

Baza:

```bash
docker run -d \
  --name db \
  --network app-network \
  postgres:17
```

Backend:

```bash
docker run -d \
  --name app \
  --network app-network \
  myapp
```

Backend może odwoływać się do bazy po nazwie:

```text
db
```

np.:

```text
postgres://user:password@db:5432/app
```

Nie trzeba znać adresu IP kontenera.

---

# 34. Inspect

Jedno z najważniejszych poleceń diagnostycznych:

```bash
docker inspect web
```

Pokazuje ogrom informacji:

- konfigurację,
- IP,
- sieci,
- mounty,
- zmienne środowiskowe,
- porty,
- stan,
- obraz,
- entrypoint,
- command.

Można użyć formatu:

```bash
docker inspect -f '{{.State.Status}}' web
```

---

# 35. Statystyki kontenerów

```bash
docker stats
```

Pokazuje:

- CPU,
- RAM,
- sieć,
- I/O,
- liczbę procesów.

---

# 36. Procesy w kontenerze

```bash
docker top web
```

---

# 37. Dockerfile

Dockerfile opisuje, jak zbudować obraz.

Przykład prostego projektu Go:

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

---

# 38. Jak czytać Dockerfile

## `FROM`

```dockerfile
FROM golang:1.25
```

Obraz bazowy.

---

## `WORKDIR`

```dockerfile
WORKDIR /app
```

Ustawia bieżący katalog.

---

## `COPY`

```dockerfile
COPY . .
```

Kopiuje pliki z hosta do obrazu.

---

## `RUN`

```dockerfile
RUN go build -o app
```

Uruchamia polecenie podczas budowania obrazu.

---

## `ENV`

```dockerfile
ENV PORT=8080
```

Definiuje zmienną środowiskową.

---

## `EXPOSE`

```dockerfile
EXPOSE 8080
```

Dokumentuje port używany przez aplikację.

Nie publikuje portu automatycznie.

---

## `CMD`

```dockerfile
CMD ["./app"]
```

Domyślne polecenie uruchamiane po starcie kontenera.

---

## `ENTRYPOINT`

Przykład:

```dockerfile
ENTRYPOINT ["/app/app"]
```

Definiuje główny program kontenera.

---

# 39. Budowanie obrazu

Będąc w katalogu zawierającym Dockerfile:

```bash
docker build -t myapp .
```

`-t` oznacza tag/nazwę.

```text
myapp
```

a kropka:

```text
.
```

oznacza bieżący katalog jako build context.

---

# 40. Tagowanie obrazu

```bash
docker tag myapp myapp:1.0
```

Przykładowe wersje:

```text
myapp:1.0
myapp:1.1
myapp:latest
```

---

# 41. Uruchomienie własnego obrazu

```bash
docker run -d \
  --name myapp \
  -p 8080:8080 \
  myapp:1.0
```

---

# 42. `.dockerignore`

Docker podczas builda wysyła build context.

Nie warto wysyłać rzeczy zbędnych.

Przykład:

```dockerignore
.git
.gitignore
.env
node_modules
tmp
dist
*.log
```

Działa podobnie jak `.gitignore`.

---

# 43. Multi-stage build

Bardzo ważna technika.

Zamiast wrzucać do końcowego obrazu:

- kompilator Go,
- source code,
- cache,
- narzędzia buildowe,

można użyć pierwszego obrazu tylko do kompilacji.

Przykład:

```dockerfile
FROM golang:1.25 AS builder

WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o app

FROM debian:13-slim

WORKDIR /app
COPY --from=builder /src/app /app/app

CMD ["/app/app"]
```

Końcowy obraz jest dużo mniejszy.

---

# 44. Jeszcze mniejszy obraz Go

Dla statycznie skompilowanego programu:

```dockerfile
FROM golang:1.25 AS builder

WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o app

FROM scratch

COPY --from=builder /src/app /app

ENTRYPOINT ["/app"]
```

`scratch` to praktycznie pusty obraz.

Nie ma w nim shella.

Dlatego:

```bash
docker exec -it app sh
```

nie zadziała.

---

# 45. Docker Compose

Compose pozwala opisać cały zestaw usług w jednym pliku.

Najczęściej:

```text
compose.yaml
```

Przykład:

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

---

# 46. Start Compose

```bash
docker compose up
```

W tle:

```bash
docker compose up -d
```

---

# 47. Budowanie i uruchamianie

```bash
docker compose up -d --build
```

To jedno z najczęściej używanych poleceń podczas developmentu i deployu.

---

# 48. Status Compose

```bash
docker compose ps
```

---

# 49. Logi Compose

Wszystkie:

```bash
docker compose logs
```

Na żywo:

```bash
docker compose logs -f
```

Tylko aplikacja:

```bash
docker compose logs -f app
```

---

# 50. Zatrzymanie Compose

```bash
docker compose stop
```

Kontenery pozostają.

Ponowny start:

```bash
docker compose start
```

---

# 51. Usunięcie kontenerów Compose

```bash
docker compose down
```

Usuwa m.in.:

- kontenery,
- automatycznie utworzone sieci.

Domyślnie nie usuwa nazwanych volumes.

---

# 52. Usunięcie Compose razem z volume

```bash
docker compose down -v
```

Uwaga:

To może usunąć bazę danych.

---

# 53. Restart pojedynczej usługi

```bash
docker compose restart app
```

---

# 54. Shell w kontenerze Compose

```bash
docker compose exec app sh
```

Jeśli jest bash:

```bash
docker compose exec app bash
```

---

# 55. Uruchomienie jednorazowego polecenia

```bash
docker compose exec app ./app migrate
```

Przykład Node:

```bash
docker compose exec app npm test
```

Przykład Django:

```bash
docker compose exec app python manage.py migrate
```

---

# 56. Sprawdzanie poprawności Compose

```bash
docker compose config
```

To bardzo przydatne.

Pokazuje finalną konfigurację po:

- interpolacji zmiennych,
- merge,
- odczycie `.env`.

---

# 57. Nazwy projektów Compose

Compose tworzy nazwy np.:

```text
example-site-app-1
example-site-db-1
```

Nazwa projektu zwykle pochodzi z nazwy katalogu.

Można ustawić ją ręcznie:

```bash
docker compose -p example-site up -d
```

---

# 58. Restart policy

Dla usług serwerowych warto ustawić:

```yaml
services:
  app:
    image: myapp
    restart: unless-stopped
```

Najczęstsze wartości:

```text
no
always
on-failure
unless-stopped
```

Dla VPS często najlepsze:

```text
unless-stopped
```

Kontener uruchomi się ponownie po restarcie Dockera/serwera, chyba że został ręcznie zatrzymany.

---

# 59. Healthcheck

Kontener może mieć test zdrowia.

Przykład:

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

Status:

```bash
docker ps
```

może wtedy pokazać:

```text
healthy
unhealthy
```

---

# 60. Limity pamięci

Przykład `docker run`:

```bash
docker run \
  --memory=512m \
  myapp
```

CPU:

```bash
docker run \
  --cpus=1.0 \
  myapp
```

---

# 61. Kopiowanie plików do i z kontenera

Host → kontener:

```bash
docker cp config.json web:/app/config.json
```

Kontener → host:

```bash
docker cp web:/app/report.txt ./report.txt
```

---

# 62. Eksport obrazu — `docker save`

To właściwy sposób przenoszenia gotowego obrazu Dockera jako pliku.

```bash
docker save myapp:1.0 -o myapp.tar
```

Powstanie:

```text
myapp.tar
```

Na innym komputerze:

```bash
docker load -i myapp.tar
```

Po imporcie:

```bash
docker images
```

---

# 63. Kompresowanie obrazu

Można zrobić:

```bash
docker save myapp:1.0 | gzip > myapp.tar.gz
```

Import:

```bash
gunzip -c myapp.tar.gz | docker load
```

Albo:

```bash
gzip -dc myapp.tar.gz | docker load
```

---

# 64. `docker save` vs `docker export`

To bardzo ważne.

## `docker save`

Eksportuje **image**.

Zachowuje:

- warstwy obrazu,
- tagi,
- historię,
- metadata.

Najlepsze do przenoszenia obrazów.

```bash
docker save myapp:1.0 -o myapp.tar
```

Import:

```bash
docker load -i myapp.tar
```

---

## `docker export`

Eksportuje filesystem **kontenera**.

```bash
docker export web -o web.tar
```

Import:

```bash
docker import web.tar myweb
```

Nie zachowuje pełnej historii obrazu ani konfiguracji w taki sposób jak `save`.

W praktyce dużo rzadziej potrzebujesz `docker export`.

---

# 65. Zasada

Do przenoszenia aplikacji:

```text
docker save
docker load
```

Do zrzutu samego filesystemu kontenera:

```text
docker export
docker import
```

---

# 66. Registry

Zamiast kopiować pliki `.tar`, można przechowywać obraz w registry.

Schemat:

```text
komputer lokalny
     │
     │ docker push
     ▼
Docker Registry
     │
     │ docker pull
     ▼
serwer
```

Przykłady:

- Docker Hub,
- GitHub Container Registry,
- GitLab Container Registry,
- prywatne registry.

---

# 67. Logowanie do registry

```bash
docker login
```

Lub do konkretnego:

```bash
docker login ghcr.io
```

---

# 68. Push obrazu

Najpierw tag:

```bash
docker tag myapp:1.0 username/myapp:1.0
```

Push:

```bash
docker push username/myapp:1.0
```

Na serwerze:

```bash
docker pull username/myapp:1.0
```

---

# 69. Typowy deploy przez registry

Lokalnie:

```bash
docker build -t ghcr.io/user/myapp:1.2.0 .
docker push ghcr.io/user/myapp:1.2.0
```

Na VPS:

```bash
docker pull ghcr.io/user/myapp:1.2.0
docker compose up -d
```

---

# 70. Typowy deploy bez registry

Lokalnie:

```bash
docker build -t myapp:1.0 .
docker save myapp:1.0 | gzip > myapp.tar.gz
```

Kopiowanie:

```bash
scp myapp.tar.gz user@server:/tmp/
```

Na serwerze:

```bash
gzip -dc /tmp/myapp.tar.gz | docker load
```

Potem:

```bash
docker compose up -d
```

---

# 71. Najlepszy model dla małych projektów

Dla własnych małych aplikacji sensowny układ to:

```text
GitHub
  │
  ├── source code
  ├── Dockerfile
  └── compose.yaml

VPS
  │
  ├── nginx
  ├── Docker
  └── aplikacje
```

Możliwe są dwa workflow.

## Wariant A — build na serwerze

```bash
git pull
docker compose up -d --build
```

Najprostszy.

## Wariant B — gotowe obrazy

CI albo komputer lokalny:

```text
build → registry
```

VPS:

```text
pull → restart
```

Lepsze przy większych projektach.

---

# 72. Docker + nginx reverse proxy

Przykład aplikacji:

```yaml
services:
  app:
    build: .
    ports:
      - "127.0.0.1:8080:8080"
    restart: unless-stopped
```

Nginx hosta:

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

Dzięki temu:

```text
Internet
   │
   ▼
nginx :443
   │
   ▼
127.0.0.1:8080
   │
   ▼
Docker
   │
   ▼
aplikacja
```

---

# 73. Aktualizacja aplikacji

Dla projektu budowanego lokalnie na VPS:

```bash
cd /srv/myapp
git pull
docker compose up -d --build
```

Compose przebuduje obraz i wymieni kontener.

---

# 74. Aktualizacja obrazu z registry

```bash
docker compose pull
docker compose up -d
```

---

# 75. Sprawdzanie logów po deployu

```bash
docker compose logs --tail 100 -f
```

Jeżeli wszystko działa:

```text
Ctrl+C
```

nie zatrzymuje kontenera — tylko kończy śledzenie logów.

---

# 76. Backup volume

Przykład volume:

```text
postgres-data
```

Backup:

```bash
docker run --rm \
  -v postgres-data:/data \
  -v "$PWD:/backup" \
  alpine \
  tar czf /backup/postgres-data.tar.gz -C /data .
```

---

# 77. Restore volume

Najpierw utwórz volume:

```bash
docker volume create postgres-data
```

Potem:

```bash
docker run --rm \
  -v postgres-data:/data \
  -v "$PWD:/backup" \
  alpine \
  sh -c 'cd /data && tar xzf /backup/postgres-data.tar.gz'
```

---

# 78. Backup bazy danych

W przypadku bazy danych często lepiej robić backup logiczny niż kopiować jej filesystem.

PostgreSQL:

```bash
docker exec db \
  pg_dump -U app app > backup.sql
```

Restore:

```bash
cat backup.sql | docker exec -i db \
  psql -U app app
```

---

# 79. Prune — sprzątanie

Docker zostawia:

- stare obrazy,
- cache,
- nieużywane sieci,
- zatrzymane kontenery.

Podstawowe:

```bash
docker system df
```

Pokazuje zajęte miejsce.

---

# 80. Usuwanie nieużywanych rzeczy

```bash
docker system prune
```

Bardziej agresywnie:

```bash
docker system prune -a
```

Uwaga:

`-a` usuwa wszystkie nieużywane obrazy, nie tylko dangling images.

---

# 81. Volume prune

```bash
docker volume prune
```

Uwaga:

volumes mogą zawierać dane.

---

# 82. Build cache

Sprawdzenie:

```bash
docker builder du
```

Sprzątanie:

```bash
docker builder prune
```

---

# 83. Najczęstsze problemy

## Port już zajęty

Błąd podobny do:

```text
bind: address already in use
```

Sprawdzenie:

```bash
sudo ss -lntp
```

albo:

```bash
sudo ss -lntp | grep ':8080'
```

Rozwiązanie:

- zatrzymać konfliktującą usługę,
- użyć innego portu.

---

# 84. Kontener natychmiast się zatrzymuje

Sprawdź:

```bash
docker ps -a
```

Potem:

```bash
docker logs NAZWA
```

Kontener działa tylko tak długo, jak działa jego główny proces.

---

# 85. Nie mogę wejść przez bash

Spróbuj:

```bash
docker exec -it app sh
```

Minimalne obrazy mogą nie mieć `bash`.

Obrazy `scratch` mogą nie mieć nawet `sh`.

---

# 86. Zmieniłem kod, ale aplikacja jest stara

Jeżeli kod został skopiowany do obrazu podczas `docker build`, trzeba przebudować obraz:

```bash
docker compose up -d --build
```

---

# 87. Docker używa starego cache

Wymuszenie pełnego rebuilda:

```bash
docker build --no-cache -t myapp .
```

Compose:

```bash
docker compose build --no-cache
docker compose up -d
```

---

# 88. Nie działa komunikacja między kontenerami

Nie używaj:

```text
localhost
```

do połączenia z innym kontenerem.

`localhost` wewnątrz kontenera oznacza ten sam kontener.

Jeżeli Compose ma:

```yaml
services:
  app:
  db:
```

aplikacja powinna łączyć się do:

```text
db
```

czyli np.:

```text
db:5432
```

---

# 89. `localhost` — ważna zasada

Host:

```text
localhost → host
```

W kontenerze:

```text
localhost → ten kontener
```

Inny kontener:

```text
nazwa-usługi → inny kontener
```

---

# 90. Kontener nie widzi usługi hosta

Na Linuksie sytuacja jest bardziej złożona niż w Docker Desktop.

Często lepiej:

- wystawić usługę przez konkretny interfejs,
- użyć wspólnej sieci,
- przenieść zależność również do Compose.

---

# 91. Debugowanie krok po kroku

Jeżeli aplikacja nie działa:

```bash
docker ps -a
```

Potem:

```bash
docker logs app
```

Potem:

```bash
docker inspect app
```

Potem:

```bash
docker exec -it app sh
```

Sprawdź:

```bash
env
ps aux
ls -la
```

Jeżeli problem sieciowy:

```bash
docker network ls
docker network inspect NAZWA
```

---

# 92. Debugowanie Compose

```bash
docker compose ps
```

```bash
docker compose logs
```

```bash
docker compose config
```

```bash
docker compose exec app sh
```

To cztery najważniejsze komendy.

---

# 93. Bezpieczeństwo

Kilka praktycznych zasad.

Nie wkładaj haseł do Dockerfile:

```dockerfile
ENV DB_PASSWORD=sekret
```

to zły pomysł.

Lepiej:

```text
.env
```

albo system secrets.

---

# 94. Nie używaj `latest` w krytycznych usługach

Zamiast:

```yaml
image: postgres:latest
```

lepiej:

```yaml
image: postgres:17
```

Jeszcze dokładniej:

```yaml
image: postgres:17.6
```

Zapobiega niespodziewanym zmianom.

---

# 95. Nie wystawiaj bez potrzeby baz danych do Internetu

Złe:

```yaml
ports:
  - "5432:5432"
```

jeżeli tylko aplikacja ma korzystać z PostgreSQL.

Jeżeli `app` i `db` są w Compose, PostgreSQL nie potrzebuje `ports`.

Kontenery mogą się komunikować przez wewnętrzną sieć.

---

# 96. Uruchamianie jako non-root

Dobrze przygotowany obraz powinien uruchamiać aplikację jako zwykły użytkownik.

Przykład:

```dockerfile
RUN useradd -r -u 10001 appuser

USER appuser

CMD ["/app/app"]
```

---

# 97. Read-only filesystem

Dla niektórych usług można użyć:

```bash
docker run --read-only myapp
```

Albo Compose:

```yaml
read_only: true
```

Jeżeli aplikacja musi pisać np. do `/tmp`, można podłączyć tmpfs.

---

# 98. `docker run --rm`

Bardzo przydatne dla narzędzi jednorazowych:

```bash
docker run --rm alpine echo hello
```

Po zakończeniu kontener zostanie automatycznie usunięty.

---

# 99. Tymczasowy shell Linuxa

Docker może służyć jako szybkie środowisko testowe.

```bash
docker run --rm -it debian:13 bash
```

Masz czystego Debiana.

Po:

```bash
exit
```

kontener znika.

---

# 100. Testowanie różnych wersji oprogramowania

Node:

```bash
docker run --rm -it node:24 bash
```

Python:

```bash
docker run --rm -it python:3.14 bash
```

Go:

```bash
docker run --rm -it golang:1.25 bash
```

PostgreSQL:

```bash
docker run --rm postgres:17
```

---

# 101. Przegląd najważniejszych komend

## Kontenery

```bash
docker ps
docker ps -a
docker run IMAGE
docker run -d IMAGE
docker start NAME
docker stop NAME
docker restart NAME
docker rm NAME
docker logs NAME
docker exec -it NAME sh
docker inspect NAME
docker stats
```

## Obrazy

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

## Sieci

```bash
docker network ls
docker network create NAME
docker network inspect NAME
docker network rm NAME
```

## Compose

```bash
docker compose up
docker compose up -d
docker compose up -d --build
docker compose down
docker compose ps
docker compose logs
docker compose logs -f
docker compose pull
docker compose build
docker compose restart
docker compose exec SERVICE sh
docker compose config
```

---

# 102. Typowy projekt Go + Docker

Struktura:

```text
myapp/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
├── static/
├── templates/
├── go.mod
├── go.sum
├── Dockerfile
├── compose.yaml
└── .dockerignore
```

Dockerfile:

```dockerfile
FROM golang:1.25 AS build

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build \
    -o /out/myapp ./cmd/server

FROM debian:13-slim

WORKDIR /app

COPY --from=build /out/myapp /app/myapp
COPY static /app/static
COPY templates /app/templates

EXPOSE 8080

CMD ["/app/myapp"]
```

---

# 103. Compose dla aplikacji Go

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

Start:

```bash
docker compose up -d --build
```

---

# 104. Go + PostgreSQL

```yaml
services:
  app:
    build: .
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:8080"
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/app
    depends_on:
      - db

  db:
    image: postgres:17
    restart: unless-stopped
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

---

# 105. Co powinno być w Git

Najczęściej:

```text
Dockerfile
compose.yaml
.dockerignore
.env.example
kod aplikacji
```

Nie:

```text
.env
sekrety
backupy bazy
obrazy .tar
```

---

# 106. `.env.example`

Można utrzymywać:

```env
APP_ENV=production
DATABASE_URL=
OPENROUTER_API_KEY=
```

Użytkownik kopiuje:

```bash
cp .env.example .env
```

i wypełnia wartości.

---

# 107. Typowy workflow lokalny

Kodujesz:

```bash
vim main.go
```

Budujesz:

```bash
docker compose build
```

Uruchamiasz:

```bash
docker compose up -d
```

Sprawdzasz:

```bash
docker compose logs -f app
```

Po zmianach:

```bash
docker compose up -d --build
```

---

# 108. Typowy workflow lokalnie → VPS

Na komputerze:

```bash
git add .
git commit -m "Add feature"
git push
```

Na VPS:

```bash
cd /srv/myapp
git pull
docker compose up -d --build
docker compose logs --tail 100
```

To bardzo dobry model na początek.

---

# 109. Typowy workflow z registry

Lokalnie/CI:

```bash
docker build -t ghcr.io/user/myapp:1.5.0 .
docker push ghcr.io/user/myapp:1.5.0
```

VPS:

```bash
docker compose pull
docker compose up -d
```

---

# 110. Jak aktualizować bez długiego downtime

Compose zwykle:

1. tworzy nowy kontener,
2. zatrzymuje stary,
3. uruchamia nowy.

Przy pojedynczej instancji może wystąpić krótka przerwa.

Dla małych prywatnych projektów zwykle jest to całkowicie akceptowalne.

Zero-downtime wymaga bardziej rozbudowanego deploymentu.

---

# 111. Jak zobaczyć ile Docker zajmuje miejsca

```bash
docker system df
```

Dokładniej:

```bash
docker system df -v
```

---

# 112. Gdzie Docker trzyma dane

Typowy root:

```text
/var/lib/docker
```

Sprawdzenie:

```bash
docker info | grep "Docker Root Dir"
```

---

# 113. Nie kopiuj ręcznie `/var/lib/docker`

To nie jest dobry sposób migracji.

Lepsze są:

- `docker save`,
- registry,
- backup volumes,
- backup baz danych,
- Git dla kodu i konfiguracji.

---

# 114. Migracja aplikacji między serwerami

Najbezpieczniejszy model:

1. skopiować repozytorium,
2. przenieść `.env`,
3. przenieść backup danych,
4. odbudować/pobrać obrazy,
5. odtworzyć volumes,
6. uruchomić Compose.

Przykład:

```bash
git clone ...
cd app
cp /secure-backup/.env .
docker compose pull
docker compose up -d
```

Potem przywrócić bazę.

---

# 115. Co naprawdę warto eksportować

Dla aplikacji:

```text
kod źródłowy → Git
Dockerfile → Git
compose.yaml → Git
obrazy → registry lub docker save
sekrety → osobny bezpieczny backup
database → dump
volumes → backup
```

Nie traktuj kontenera jako miejsca, w którym „mieszka aplikacja”.

Kontener powinien być odtwarzalny.

---

# 116. Najważniejsza filozofia Dockera

Kontener powinien być:

```text
disposable
```

czyli możliwy do wyrzucenia.

Powinieneś móc zrobić:

```bash
docker rm -f app
```

a następnie:

```bash
docker compose up -d
```

i odzyskać działającą aplikację.

Jeżeli ważne dane giną po usunięciu kontenera, projekt jest źle skonfigurowany.

---

# 117. Przykład kompletnego małego deploymentu

Struktura:

```text
/srv/myapp/
├── compose.yaml
├── Dockerfile
├── .env
└── source/
```

Compose:

```yaml
services:
  app:
    build: .
    restart: unless-stopped
    env_file:
      - .env
    ports:
      - "127.0.0.1:8080:8080"
```

Nginx:

```text
https://myapp.example.com
        │
        ▼
      nginx
        │
        ▼
127.0.0.1:8080
        │
        ▼
 Docker container
```

Deploy:

```bash
cd /srv/myapp
git pull
docker compose up -d --build
```

Kontrola:

```bash
docker compose ps
docker compose logs --tail 100
```

---

# 118. Przydatne aliasy

Można dodać do:

```text
~/.bashrc
```

np.:

```bash
alias dps='docker ps'
alias dpa='docker ps -a'
alias di='docker images'
alias dc='docker compose'
alias dcl='docker compose logs -f'
alias dcu='docker compose up -d'
alias dcd='docker compose down'
```

Po zmianie:

```bash
source ~/.bashrc
```

---

# 119. Pomoc

Docker:

```bash
docker --help
```

Polecenie:

```bash
docker run --help
```

Compose:

```bash
docker compose --help
```

Konkretne polecenie:

```bash
docker compose up --help
```

---

# 120. Minimalny zestaw poleceń do zapamiętania

Jeżeli chcesz pamiętać tylko kilkanaście:

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

---

# 121. Minimalny workflow projektu

## Pierwsze uruchomienie

```bash
git clone REPO
cd PROJECT
cp .env.example .env
vim .env

docker compose up -d --build
```

## Sprawdzenie

```bash
docker compose ps
docker compose logs --tail 100
```

## Aktualizacja

```bash
git pull
docker compose up -d --build
```

## Debug

```bash
docker compose logs -f app
```

lub:

```bash
docker compose exec app sh
```

## Zatrzymanie

```bash
docker compose down
```

---

# 122. Przykłady z prawdziwego życia

## Przykład 1 — szybki nginx

```bash
docker run -d \
  --name nginx-test \
  -p 8080:80 \
  nginx
```

Wejdź:

```text
http://localhost:8080
```

Logi:

```bash
docker logs nginx-test
```

Usuń:

```bash
docker rm -f nginx-test
```

---

## Przykład 2 — tymczasowy Debian

```bash
docker run --rm -it debian:13 bash
```

W środku:

```bash
apt update
apt install curl
curl https://example.com
```

Wyjście:

```bash
exit
```

Kontener znika.

---

## Przykład 3 — PostgreSQL

```bash
docker volume create pgdata
```

```bash
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=secret \
  -v pgdata:/var/lib/postgresql/data \
  postgres:17
```

Logi:

```bash
docker logs postgres
```

Shell:

```bash
docker exec -it postgres bash
```

---

## Przykład 4 — eksport obrazu na drugi komputer

Komputer A:

```bash
docker build -t web-monitor:1.0 .
docker save web-monitor:1.0 | gzip > web-monitor.tar.gz
```

Kopiowanie:

```bash
scp web-monitor.tar.gz server:/tmp/
```

Serwer:

```bash
gzip -dc /tmp/web-monitor.tar.gz | docker load
```

Sprawdzenie:

```bash
docker images
```

---

## Przykład 5 — aplikacja Go na VPS

Repo:

```bash
git clone git@github.com:user/app.git
```

```bash
cd app
```

```bash
docker compose up -d --build
```

Sprawdzenie:

```bash
docker compose ps
```

Logi:

```bash
docker compose logs -f app
```

Aktualizacja tydzień później:

```bash
git pull
docker compose up -d --build
```

---

# 123. Docker — mapa mentalna

```text
Dockerfile
    │
    │ docker build
    ▼
  IMAGE
    │
    │ docker run
    ▼
CONTAINER
    │
    ├── porty
    ├── env
    ├── networks
    └── volumes
```

Dla wielu usług:

```text
compose.yaml
    │
    ▼
docker compose up
    │
    ├── app
    ├── database
    ├── redis
    └── inne usługi
```

---

# 124. Co powinieneś umieć po przeczytaniu tego kompendium

Powinieneś rozumieć:

- czym różni się image od container,
- jak uruchomić i zatrzymać Docker Engine,
- jak uruchamiać kontenery,
- jak publikować porty,
- jak wejść do kontenera,
- jak czytać logi,
- jak używać volumes,
- jak łączyć kontenery przez sieć,
- jak czytać Dockerfile,
- jak budować własny image,
- jak korzystać z Docker Compose,
- jak aktualizować aplikację,
- jak przenosić obrazy,
- czym różni się `save/load` od `export/import`,
- jak backupować dane,
- jak diagnozować typowe problemy,
- jak wdrażać mały projekt na VPS.

---

# 125. Ściąga — jednoekranowa

```bash
# status
docker ps
docker ps -a
docker images

# run
docker run -d --name app -p 8080:8080 image

# logi
docker logs -f app

# shell
docker exec -it app sh

# stop/start
docker stop app
docker start app
docker restart app

# usuń
docker rm -f app
docker rmi image

# build
docker build -t app:1.0 .

# eksport obrazu
docker save app:1.0 -o app.tar

# import obrazu
docker load -i app.tar

# compose
docker compose up -d
docker compose up -d --build
docker compose ps
docker compose logs -f
docker compose down

# miejsce
docker system df

# sprzątanie
docker system prune
```

---

# 126. Najważniejsze rzeczy do zapamiętania

1. **Image to szablon, container to uruchomiona instancja.**
2. Kontener powinien być odtwarzalny i możliwy do wyrzucenia.
3. Trwałe dane trzymaj w volumes lub poza Dockerem.
4. Kod i konfigurację infrastruktury trzymaj w Git.
5. Do wielu usług używaj Compose.
6. `docker logs` to pierwsza komenda przy problemach.
7. `docker inspect` pokazuje prawie wszystko o kontenerze.
8. `docker save/load` służy do przenoszenia obrazów.
9. `docker export/import` służy do zrzutu filesystemu kontenera i jest potrzebne znacznie rzadziej.
10. Na małym VPS wystarczy zwykle:
    `Git + Docker + Compose + nginx + backup`.

---

# Koniec

Dla małych prywatnych projektów nie trzeba od razu wdrażać Kubernetes, Swarm ani rozbudowanego CI/CD.

Bardzo rozsądny stos to:

```text
Debian
+
Git
+
Docker
+
Docker Compose
+
nginx
+
Let's Encrypt
+
regularny backup
```

Taki zestaw spokojnie wystarcza do hostowania wielu własnych backendów, stron i małych usług na jednym VPS.
