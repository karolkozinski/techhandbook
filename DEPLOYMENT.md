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
    Docker Compose
       |
       +--> Tech Handbook / unprivileged nginx :8080
       |
       +--> review-api :8081 (internal only)

Hostowy nginx obsługuje domenę i TLS. Publiczny frontend pozostaje statyczny. Pomocniczy `review-api` jest osobnym komponentem backendowym i nie publikuje portu na hoście. Kontenerowy nginx przekazuje do niego wyłącznie jawnie skonfigurowane ścieżki review/admin.

## 1. Stan docelowy

- canonical URL: `https://techhandbook.nullyard.com`
- katalog: `/srv/apps/techhandbook`
- runtime: Docker Compose
- host loopback: `127.0.0.1:8092`
- port w kontenerze: `8080`
- frontend container: NGINX unprivileged
- backend pomocniczy: `review-api`, sieć wewnętrzna Compose
- publiczny entry point: hostowy nginx
- review/admin: wyłącznie jawnie skonfigurowane trasy
- sekrety: runtime configuration poza repozytorium
- indeksowanie: włączone na produkcji

Port hostowy można zmienić zmienną `TECHHANDBOOK_PORT`; domyślna wartość projektu to `8092`.

## 2. DNS

W DNS utwórz rekord:

    techhandbook.nullyard.com  A  <VPS_IP>

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

## Przegląd zgłoszeń review

CLI jest dostępne wewnątrz kontenera `review-api`.

Lista otwartych zgłoszeń:

    sudo docker compose exec review-api python3 /app/review_reports.py list

Pełny podgląd jednego zgłoszenia:

    sudo docker compose exec review-api python3 /app/review_reports.py show <REPORT_ID>

Filtrowanie:

    sudo docker compose exec review-api python3 /app/review_reports.py list --article doc-023
    sudo docker compose exec review-api python3 /app/review_reports.py list --reason outdated
    sudo docker compose exec review-api python3 /app/review_reports.py list --language pl
    sudo docker compose exec review-api python3 /app/review_reports.py list --status all

Zamknięcie zgłoszenia po poprawce:

    sudo docker compose exec review-api python3 /app/review_reports.py resolve <REPORT_ID>

Odrzucenie zgłoszenia:

    sudo docker compose exec review-api python3 /app/review_reports.py dismiss <REPORT_ID>

Rekordy nie są kasowane. Status przechodzi z `open` do `resolved` albo `dismissed`, a CLI zapisuje czas zamknięcia.

### Retencja pseudonimu zgłaszającego

`reporter_stamp` służy do rate limitingu i deduplikacji otwartych zgłoszeń. Po zamknięciu zgłoszenia nie jest potrzebny bezterminowo.

Anonimizacja stampów w zgłoszeniach zamkniętych ponad 90 dni temu:

    sudo docker compose exec review-api python3 /app/review_reports.py prune-stamps --days 90

Polecenie nie usuwa zgłoszeń, treści, analizy ani decyzji administratora. Czyści wyłącznie `reporter_stamp` w starych rekordach `resolved` i `dismissed`.

Na VPS z systemd repo zawiera gotowy timer:

    sudo cp deploy/systemd/techhandbook-review-retention.service /etc/systemd/system/
    sudo cp deploy/systemd/techhandbook-review-retention.timer /etc/systemd/system/
    sudo systemctl daemon-reload
    sudo systemctl enable --now techhandbook-review-retention.timer

Sprawdzenie:

    systemctl list-timers techhandbook-review-retention.timer


## Review API - konfiguracja prywatnego stampa

Review API jest funkcją opcjonalną z punktu widzenia konfiguracji projektu i domyślnie pozostaje wyłączone w czystym środowisku. Na produkcji Tech Handbooka jest świadomie włączone.

Do jego uruchomienia trzeba ustawić lokalne sekrety na VPS, poza repozytorium:

    REVIEW_STAMP_SECRET=<losowy-sekret>
    REVIEW_ACCESS_TOKEN=<losowy-token-review>
    ADMIN_ACCESS_TOKEN=<losowy-token-admin>
    REVIEW_API_ENABLED=true

REVIEW_ACCESS_TOKEN służy do wejścia w zaufany tryb review. `ADMIN_ACCESS_TOKEN` jest osobnym sekretem dla panelu administracyjnego i nie może być równy tokenowi review. Nie tworzymy kont ani logowania. Reviewer otwiera stronę jednorazowo z fragmentem URL:

    https://techhandbook.nullyard.com/#review=<token>

Fragment po znaku # nie jest wysyłany do serwera. Frontend odczytuje token, usuwa fragment z paska adresu i trzyma token wyłącznie w pamięci bieżącej karty. Nie używa do tego cookies, localStorage ani sessionStorage. Po odświeżeniu strony review mode trzeba włączyć ponownie.

Sekret REVIEW_STAMP_SECRET służy wyłącznie do pseudonimizacji źródła zgłoszenia. Backend wylicza:

    SHA256(secret + IP + normalized User-Agent)

Surowe IP nie jest zapisywane w bazie. Klient nie przesyła ani nie kontroluje `reporter_stamp`.

Domyślny limit wynosi 30 nowych zgłoszeń na godzinę dla jednego stampa i może zostać zmieniony przez:

    REVIEW_RATE_LIMIT_PER_HOUR=30

Zmienne należy przekazać Docker Compose z lokalnego środowiska lub pliku `.env`, którego nie commitujemy. Repo zawiera wyłącznie bezpieczny szablon `.env.example`.

Na serwerze plik z sekretami powinien mieć ograniczone uprawnienia:

    chmod 600 .env

Do wygenerowania niezależnych sekretów można użyć np.:

    openssl rand -hex 32

Uruchom polecenie osobno dla `REVIEW_STAMP_SECRET`, `REVIEW_ACCESS_TOKEN` i `ADMIN_ACCESS_TOKEN`.

## 11. Port

Domyślny hostowy port Tech Handbooka to 8092.

Można go tymczasowo zmienić bez edycji Compose:

    TECHHANDBOOK_PORT=18092 sudo docker compose up -d

W takim przypadku trzeba odpowiednio zmienić `proxy_pass` hostowego nginx.


## Automatyczna analiza zgłoszeń review

Analyzer działa wewnątrz kontenera `review-api` i analizuje wyłącznie zgłoszenia ze statusem `open`.

Wymagane zmienne środowiskowe:

    REVIEW_LLM_URL=<endpoint zgodny z OpenAI chat completions>
    REVIEW_LLM_API_KEY=<klucz API>
    REVIEW_LLM_MODEL=<nazwa modelu>

Analyzer nie zmienia artykułów. Dla każdego zgłoszenia zapisuje w SQLite:

    analysis_status
    analysis_result
    analysis_model
    analyzed_at
    analysis_error

Wynik `analysis_result` zawiera:

    verdict: confirmed | likely | unclear | not_confirmed
    summary
    suggested_fix
    needs_external_verification
    confidence

Ręczne uruchomienie wszystkich nowych/nieudanych analiz:

    sudo docker compose exec review-api python3 /app/review_analyze.py

Analiza jednego konkretnego zgłoszenia:

    sudo docker compose exec review-api python3 /app/review_analyze.py --id <REPORT_ID>

Ponowna analiza wszystkich otwartych zgłoszeń:

    sudo docker compose exec review-api python3 /app/review_analyze.py --reanalyze

Docelowy prosty cron raz dziennie, np. o 03:15:

    15 3 * * * cd /srv/apps/techhandbook && /usr/bin/docker compose exec -T review-api python3 /app/review_analyze.py >> /var/log/techhandbook-review.log 2>&1

Analyzer korzysta z aktualnego `content-index.json` i katalogu `md/` zamontowanych read-only do kontenera. Próbuje odnaleźć sekcję po tym samym anchorze, którego używa spis treści. Jeśli fakt wymaga aktualnego zewnętrznego potwierdzenia, model ma zaznaczyć `needs_external_verification=true` zamiast udawać pewność.


## 12. Security closure - 2026-09-25

Po końcowym audycie bezpieczeństwa publicznego repozytorium przyjęto następujące zasady operacyjne:

- publiczne repozytorium traktujemy jako publiczne od pierwszej linijki;
- żaden sekret produkcyjny nie trafia do Git ani Docker build context;
- `REVIEW_ACCESS_TOKEN` i `ADMIN_ACCESS_TOKEN` są zawsze niezależne;
- `review-api` nie publikuje portu hosta;
- nowe ścieżki API/admin wymagają jawnej konfiguracji nginx;
- panel administracyjny używa `no-store`, `noindex` i restrykcyjnych security headers;
- `reporter_stamp` ma skończoną retencję i jest anonimizowany przez timer systemd;
- zmiany produkcyjne muszą przejść content checks, deployment checks i secret scan.

Przed wdrożeniem zmiany obejmującej review/admin/API należy ponownie sprawdzić routing nginx, ekspozycję portów, konfigurację sekretów i politykę retencji.
