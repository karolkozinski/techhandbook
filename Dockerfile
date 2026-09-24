FROM python:3.13-alpine AS buildgen
WORKDIR /work

COPY requirements-prerender.txt requirements-prerender.txt
RUN pip install --no-cache-dir -r requirements-prerender.txt

COPY index.html index.html
COPY content-index.json content-index.json
COPY site-config.json site-config.json
COPY md md
COPY scripts/generate_nginx_routes.py scripts/generate_nginx_routes.py
COPY scripts/prerender.py scripts/prerender.py

RUN python3 scripts/generate_nginx_routes.py \
    && python3 scripts/prerender.py --output /prerender

FROM nginxinc/nginx-unprivileged:stable-alpine3.24

COPY deploy/container-nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=buildgen /work/deploy/generated-routes.conf /etc/nginx/generated-routes.conf

COPY index.html /usr/share/nginx/html/index.html
COPY README.md /usr/share/nginx/html/README.md
COPY README.en.md /usr/share/nginx/html/README.en.md
COPY favicon.ico /usr/share/nginx/html/favicon.ico
COPY content-index.json /usr/share/nginx/html/content-index.json
COPY site-config.json /usr/share/nginx/html/site-config.json
COPY robots.txt /usr/share/nginx/html/robots.txt
COPY sitemap.xml /usr/share/nginx/html/sitemap.xml
COPY llms.txt /usr/share/nginx/html/llms.txt
COPY assets /usr/share/nginx/html/assets
COPY md /usr/share/nginx/html/md
COPY --from=buildgen /prerender /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -q -O - http://127.0.0.1:8080/healthz >/dev/null || exit 1
