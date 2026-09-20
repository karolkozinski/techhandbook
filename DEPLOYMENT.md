# Tech Handbook - deployment na VPS

Docelowy układ jest celowo prosty:

    Internet
       |
    techhandbook.nullyard.com
       |
    host nginx :80/:443
       |
    127.0.0.1:8080
       |
    Docker: Tech Handbook + nginx

Hostowy nginx obsługuje domenę i TLS. Kontener nginx zajmuje się wyłącznie statycznym Tech Handbookiem.

## 1. Wymagania

Na serwerze potrzebne są:

- Debian 13 lub inny współczesny Linux,
- Git,
- Docker Engine,
- Docker Compose plugin,
- nginx na hoście,
- Certbot z integracją nginx.

Dla Dockera użyj aktualnej instrukcji instalacji dla Debiana:

https://docs.docker.com/engine/install/debian/

Po instalacji sprawdź:

    docker version
    docker compose version
    nginx -v

## 2. DNS

W DNS utwórz rekord:

    techhandbook.nullyard.com  A  <PUBLICZNE_IP_VPS>

Rekord AAAA dodawaj tylko wtedy, gdy IPv6 na VPS jest faktycznie skonfigurowane i dostępne z Internetu.

Przed uruchomieniem Certbota sprawdź:

    getent ahosts techhandbook.nullyard.com

## 3. Pobranie projektu

    sudo mkdir -p /srv/techhandbook
    sudo chown "$USER":"$USER" /srv/techhandbook
    git clone https://github.com/karolkozinski/techhandbook.git /srv/techhandbook
    cd /srv/techhandbook

## 4. Start kontenera

    docker compose build --pull
    docker compose up -d

Kontener nie jest wystawiony publicznie. Domyślnie nasłuchuje tylko przez 127.0.0.1:8080.

Sprawdzenie:

    curl -fsS http://127.0.0.1:8080/healthz
    curl -fsS http://127.0.0.1:8080/ >/dev/null
    curl -fsS http://127.0.0.1:8080/pl/programming/python/python-podstawy >/dev/null

Pierwsze polecenie powinno zwrócić: ok

## 5. Hostowy nginx

Repo zawiera przykład deploy/host-nginx.conf.example.

Instalacja konfiguracji:

    sudo cp deploy/host-nginx.conf.example /etc/nginx/sites-available/techhandbook.nullyard.com
    sudo ln -s /etc/nginx/sites-available/techhandbook.nullyard.com /etc/nginx/sites-enabled/techhandbook.nullyard.com
    sudo nginx -t
    sudo systemctl reload nginx

Jeśli link w sites-enabled już istnieje, nie twórz go ponownie.

Po tym strona powinna odpowiadać po HTTP:

    curl -I http://techhandbook.nullyard.com/

## 6. TLS

Gdy DNS wskazuje już na VPS i porty 80/443 są dostępne:

    sudo certbot --nginx -d techhandbook.nullyard.com

Następnie:

    curl -fsS https://techhandbook.nullyard.com/healthz
    curl -fsS https://techhandbook.nullyard.com/pl/programming/python/python-podstawy >/dev/null

## 7. Aktualizacja

    cd /srv/techhandbook
    git pull --ff-only
    docker compose build --pull
    docker compose up -d --remove-orphans

Po aktualizacji:

    docker compose ps
    curl -fsS http://127.0.0.1:8080/healthz

## 8. Rollback

    git log --oneline -10
    git checkout <SHA>
    docker compose build
    docker compose up -d

Po rozwiązaniu problemu:

    git switch main
    git pull --ff-only

## 9. Indeksowanie

Na tym etapie site-config.json celowo ma indexingEnabled ustawione na false.

Nie zmieniaj tego przed potwierdzeniem, że:

- domena działa po HTTPS,
- czyste URL-e otwierają się bezpośrednio,
- robots.txt i sitemap.xml są dostępne z produkcyjnej domeny,
- nie ma błędów 404 dla plików Markdown i assetów.

Dopiero wtedy włącz indeksowanie i wygeneruj artefakty ponownie:

    python3 scripts/seo_artifacts.py --write
    python3 scripts/seo_artifacts.py --check

Zmianę indexingEnabled i wygenerowane pliki należy commitować razem.

## 10. Port kontenera

Domyślny port hosta to 8080. Można go zmienić bez edycji Compose:

    TECHHANDBOOK_PORT=18080 docker compose up -d

Wtedy trzeba odpowiednio zmienić proxy_pass w konfiguracji hostowego nginx.
