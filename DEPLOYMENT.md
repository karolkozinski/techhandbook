# Tech Handbook - deployment na VPS

Docelowy układ produkcyjny:

    Internet
       |
    techhandbook.nullyard.com
       |
    host nginx :80/:443
       |
    127.0.0.1:8092
       |
    Docker: Tech Handbook + unprivileged nginx :8080

Hostowy nginx obsługuje domenę i TLS. Kontener obsługuje wyłącznie statyczny Tech Handbook i nie jest wystawiony bezpośrednio do Internetu.

## 1. Stan docelowy

- canonical URL: `https://techhandbook.nullyard.com`
- katalog: `/srv/apps/techhandbook`
- runtime: Docker Compose
- host loopback: `127.0.0.1:8092`
- port w kontenerze: `8080`
- kontener: NGINX unprivileged
- publiczny entry point: hostowy nginx
- indeksowanie przed smoke testem: wyłączone

Port 8092 został wybrany po sprawdzeniu rzeczywistego VPS. Porty 8080 i 8091 są już używane przez inne usługi Null Yard.

## 2. DNS

W DNS utwórz rekord:

    techhandbook.nullyard.com  A  145.239.89.57

Nie dodawaj rekordu AAAA, dopóki IPv6 nie zostanie świadomie skonfigurowane dla tej usługi.

Przed TLS sprawdź:

    getent ahosts techhandbook.nullyard.com

## 3. Przygotowanie katalogu i repozytorium

Katalog produkcyjny:

    /srv/apps/techhandbook

Przykładowe przygotowanie:

    sudo mkdir -p /srv/apps/techhandbook
    sudo chown nullyard:nullyard /srv/apps/techhandbook
    sudo -u nullyard git clone https://github.com/karolkozinski/techhandbook.git /srv/apps/techhandbook

## 4. Start kontenera

    cd /srv/apps/techhandbook
    sudo docker compose build --pull
    sudo docker compose up -d

Sprawdzenie lokalne:

    curl -fsS http://127.0.0.1:8092/healthz
    curl -fsS http://127.0.0.1:8092/ >/dev/null
    curl -fsS http://127.0.0.1:8092/pl/programming/python/python-podstawy >/dev/null

Pierwsze polecenie powinno zwrócić:

    ok

## 5. Hostowy nginx

Repo zawiera przykład:

    deploy/host-nginx.conf.example

Instalacja:

    sudo cp deploy/host-nginx.conf.example /etc/nginx/sites-available/techhandbook.nullyard.com
    sudo ln -s /etc/nginx/sites-available/techhandbook.nullyard.com /etc/nginx/sites-enabled/techhandbook.nullyard.com
    sudo nginx -t
    sudo systemctl reload nginx

Jeżeli link w `sites-enabled` już istnieje, nie twórz go ponownie.

Po tym strona powinna odpowiadać po HTTP:

    curl -I http://techhandbook.nullyard.com/

## 6. TLS

Gdy DNS wskazuje już na VPS:

    sudo certbot --nginx -d techhandbook.nullyard.com

Następnie:

    curl -fsS https://techhandbook.nullyard.com/healthz
    curl -fsS https://techhandbook.nullyard.com/pl/programming/python/python-podstawy >/dev/null

## 7. Production smoke test

Sprawdź co najmniej:

- HTTP -> HTTPS,
- stronę główną,
- bezpośredni clean URL PL,
- bezpośredni clean URL EN,
- STANDARD / JUNIOR,
- zmianę języka,
- wyszukiwarkę,
- assety CSS/JS,
- pliki Markdown,
- `robots.txt`,
- `sitemap.xml`,
- poprawne 404,
- mobile,
- brak publicznego portu 8092.

Na tym etapie indeksowanie pozostaje wyłączone.

## 8. Aktualizacja

Standardowy deployment zmian z repozytorium:

    cd /srv/apps/techhandbook
    sudo -u nullyard git pull --ff-only
    sudo docker compose build --pull
    sudo docker compose up -d --remove-orphans

Po aktualizacji:

    sudo docker compose ps
    curl -fsS http://127.0.0.1:8092/healthz

Health check powinien zwrócić:

    ok

### Deployment nowego artykułu

Przed push:

    python3 scripts/content_index.py --write
    python3 scripts/seo_artifacts.py --write
    python3 scripts/content_index.py --check
    python3 scripts/seo_artifacts.py --check
    python3 scripts/style_audit.py

Następnie:

    git status
    git add md content-index.json content-relations.json sitemap.xml robots.txt llms.txt
    git commit -m "content: add <nazwa-artykulu>"
    git push

Na VPS wykonaj standardowy deployment z początku tej sekcji.

Po wdrożeniu sprawdź:

    curl -fsS https://techhandbook.nullyard.com/healthz
    curl -fsS https://techhandbook.nullyard.com/sitemap.xml >/dev/null
    curl -fsS https://techhandbook.nullyard.com/llms.txt >/dev/null

Na koniec otwórz bezpośredni clean URL nowego artykułu w przeglądarce.

## 9. Rollback

    cd /srv/apps/techhandbook
    sudo -u nullyard git log --oneline -10
    sudo -u nullyard git checkout <SHA>
    sudo docker compose build
    sudo docker compose up -d

Po rozwiązaniu problemu:

    sudo -u nullyard git switch main
    sudo -u nullyard git pull --ff-only

## 10. Indeksowanie

`site-config.json` celowo ma:

    "indexingEnabled": false

Nie zmieniaj tego przed potwierdzeniem, że:

- domena działa po HTTPS,
- clean URL-e otwierają się bezpośrednio,
- PL i EN działają,
- `robots.txt` i `sitemap.xml` są dostępne z produkcyjnej domeny,
- nie ma błędów assetów ani Markdown,
- analityka bazowa Umami została zweryfikowana.

Dopiero wtedy włącz indeksowanie i wygeneruj artefakty ponownie:

    python3 scripts/seo_artifacts.py --write
    python3 scripts/seo_artifacts.py --check

Zmianę `indexingEnabled` i wygenerowane pliki commituj razem.

## 11. Port

Domyślny hostowy port Tech Handbooka to 8092.

Można go tymczasowo zmienić bez edycji Compose:

    TECHHANDBOOK_PORT=18092 sudo docker compose up -d

W takim przypadku trzeba odpowiednio zmienić `proxy_pass` hostowego nginx.
