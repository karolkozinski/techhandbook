FROM nginxinc/nginx-unprivileged:stable-alpine3.24

COPY deploy/container-nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html /usr/share/nginx/html/index.html
COPY favicon.ico /usr/share/nginx/html/favicon.ico
COPY content-index.json /usr/share/nginx/html/content-index.json
COPY site-config.json /usr/share/nginx/html/site-config.json
COPY robots.txt /usr/share/nginx/html/robots.txt
COPY sitemap.xml /usr/share/nginx/html/sitemap.xml
COPY llms.txt /usr/share/nginx/html/llms.txt
COPY assets /usr/share/nginx/html/assets
COPY md /usr/share/nginx/html/md

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -q -O - http://127.0.0.1:8080/healthz >/dev/null || exit 1
