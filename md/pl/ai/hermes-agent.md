---
id: "doc-001"
title: "Hermes Agent"
slug: "hermes-agent"
description: "Stan dokumentacji: 19 września 2026 Projekt: NousResearch Hermes Agent Oficjalna dokumentacja: https://hermes-agent.nousresearch.com/docs/"
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-20"
tags:
  - "ai"
  - "hermes"
  - "agent"
---

# Hermes Agent

Hermes Agent jest środowiskiem agentowym łączącym model AI z shellem, plikami, skills, pamięcią, cronem i kanałami komunikacji. Najbezpieczniejsza ścieżka wdrożenia to uruchomić najpierw zwykły chat/CLI, a dopiero potem dokładać gateway, Signal, cron, browser automation i szersze uprawnienia.

Oficjalna ścieżka instalacyjna obejmuje Linux, macOS, WSL2 i Android/Termux. FreeBSD nie jest wymieniony jako podstawowy host, dlatego w tym handbooku traktujemy go przede wszystkim jako maszynę zarządzaną przez SSH.

Powiązane tematy: [Promptowanie AI](techhandbook:doc-002), [SSH i zdalna administracja](techhandbook:doc-018), [Debian - desktop i serwer](techhandbook:doc-033), [FreeBSD jako serwer](techhandbook:doc-034) oraz [Dokumentowanie rozwiązań technicznych](techhandbook:doc-056).

## Debian jako host, FreeBSD jako host/maszyna zarządzana

> Stan dokumentacji: 19 września 2026  
> Projekt: **NousResearch Hermes Agent**  
> Oficjalna dokumentacja: https://hermes-agent.nousresearch.com/docs/

---

# 1. Czym jest Hermes Agent

Hermes Agent to lokalnie uruchamiany agent AI, który może:

- prowadzić normalną rozmowę z modelem językowym,
- wykonywać polecenia w shellu,
- czytać i modyfikować pliki,
- pracować na repozytoriach Git,
- korzystać z przeglądarki i narzędzi webowych,
- tworzyć i używać własnych **skills**,
- zapamiętywać informacje pomiędzy sesjami,
- uruchamiać zadania cykliczne,
- działać przez komunikatory, np. Signal,
- używać różnych modeli i providerów,
- delegować zadania do podagentów,
- pracować lokalnie albo na zdalnej maszynie przez SSH.

To nie jest tylko klient do API modelu. Hermes jest warstwą wykonawczą pomiędzy Tobą, modelem AI, systemem operacyjnym i narzędziami.

Najprostszy model działania:

```text
Ty
 │
 ▼
Hermes
 │
 ├── model AI
 ├── shell
 ├── pliki
 ├── Git
 ├── przeglądarka
 ├── skills
 ├── pamięć
 ├── cron
 └── komunikatory
```

---

# 2. Najważniejsza decyzja: gdzie uruchamiać Hermesa

## Debian

Debian jest bardzo dobrym środowiskiem dla Hermesa.

Hermes oficjalnie wspiera Linux x86_64 i ARM64. Instalator zakłada środowisko typowego Linuksa, a część funkcji korzysta z systemd, glibc, Node.js, Pythona, Playwrighta i Chromium.

Dla serwera lub VPS najwygodniejszy układ to:

```text
Debian
└── Hermes Agent
    ├── Signal
    ├── modele AI
    ├── narzędzia
    ├── skills
    └── SSH
         ├── FreeBSD
         ├── inne serwery
         └── urządzenia w LAN
```

To jest konfiguracja rekomendowana w tym kompendium.

---

## FreeBSD

FreeBSD **nie jest oficjalnie wspieraną platformą Hermesa**.

Nie oznacza to, że absolutnie niczego nie da się uruchomić ręcznie. Problemem jest jednak cały ekosystem zależności:

- instalator jest pisany pod Linux/macOS,
- niektóre elementy zakładają systemd,
- Chromium/Playwright mają inne wymagania,
- Docker nie jest natywnym mechanizmem FreeBSD,
- nie wszystkie Pythonowe lub Node'owe zależności muszą działać,
- aktualizacja Hermesa może w każdej chwili popsuć nieoficjalny port.

Dlatego znacznie rozsądniejszy układ to:

```text
Debian / VPS
└── Hermes
    └── SSH
         └── FreeBSD
```

Hermes wykonuje wtedy polecenia FreeBSD przez SSH.

Alternatywnie na fizycznym hoście FreeBSD można uruchomić maszynę wirtualną Debian przez **bhyve** i wewnątrz niej uruchomić Hermesa.

### Rekomendacja

Na FreeBSD:

- **nie instaluj Hermesa natywnie jako podstawowej konfiguracji**, jeśli zależy Ci na stabilności;
- używaj FreeBSD jako zarządzanej maszyny przez SSH;
- ewentualnie użyj Debiana w VM przez bhyve.

---

# 3. Minimalna architektura domowa / VPS

Praktyczny układ:

```text
Internet
   │
   ▼
VPS Debian
   │
   ├── Hermes Agent
   │
   ├── Signal gateway
   │
   ├── repozytoria Git
   │
   ├── cron
   │
   └── SSH
   │      │
   │      ├── serwer FreeBSD
   │      └── inne hosty
   │
   └── nginx / aplikacje / Docker
```

Hermes może działać praktycznie cały czas na VPS.

Nie potrzebujesz mocnego GPU, jeżeli modele są używane przez API.

---

# 4. Instalacja na Debianie

## 4.1. Minimalne wymagania

Najpierw:

```bash
sudo apt update
sudo apt install -y git curl xz-utils
```

Dla funkcji desktopowych / natywnych modułów:

```bash
sudo apt install -y build-essential
```

Oficjalny instalator sam instaluje między innymi:

- `uv`,
- Python 3.11,
- Node.js,
- `ripgrep`,
- `ffmpeg`,
- środowisko wirtualne,
- zależności Hermesa.

---

# 5. Instalacja Hermesa

Oficjalna metoda:

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

Po instalacji przeładuj shell:

```bash
source ~/.bashrc
```

albo wyloguj się i zaloguj ponownie.

Sprawdzenie:

```bash
which hermes
hermes --help
```

Typowa lokalizacja:

```text
~/.local/bin/hermes
```

Kod programu:

```text
~/.hermes/hermes-agent/
```

Dane użytkownika:

```text
~/.hermes/
```

---

# 6. Diagnostyka po instalacji

Uruchom:

```bash
hermes doctor
```

To jedna z najważniejszych komend diagnostycznych.

Jeżeli:

```bash
hermes: command not found
```

sprawdź:

```bash
ls ~/.local/bin/hermes
```

i PATH:

```bash
echo $PATH
```

W razie potrzeby:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

---

# 7. Pierwsze uruchomienie

Najprościej:

```bash
hermes
```

Hermes otworzy interaktywną sesję.

Zasada na początku:

> Najpierw doprowadź do sytuacji, w której zwykła rozmowa z jednym modelem działa poprawnie. Dopiero później konfiguruj Signal, crona, browser, skills i routing modeli.

---

# 8. Konfiguracja

Główna komenda:

```bash
hermes setup
```

Można konfigurować poszczególne części:

```bash
hermes setup model
hermes setup terminal
hermes setup gateway
hermes setup tools
hermes setup agent
```

Konfigurację można również później modyfikować poleceniami:

```bash
hermes config get
hermes config set
```

---

# 9. Katalog ~/.hermes

To najważniejszy katalog instalacji.

Przykładowa struktura:

```text
~/.hermes/
├── config.yaml
├── .env
├── auth.json
├── SOUL.md
├── memories/
│   ├── MEMORY.md
│   └── USER.md
├── skills/
├── cron/
├── sessions/
├── logs/
└── hermes-agent/
```

Warto wiedzieć, co gdzie trzymać.

---

# 10. config.yaml

Główny plik konfiguracji:

```text
~/.hermes/config.yaml
```

Tu powinny znajdować się ustawienia, które **nie są sekretami**.

Na przykład:

- model,
- provider,
- ustawienia terminala,
- pamięć,
- bezpieczeństwo,
- cron,
- zachowanie interfejsu,
- gateway,
- konfiguracja skills.

Nie wpisuj tu kluczy API, jeżeli istnieje możliwość trzymania ich w `.env`.

---

# 11. .env

Sekrety:

```text
~/.hermes/.env
```

Na przykład:

```bash
OPENROUTER_API_KEY=...
OPENAI_API_KEY=...
SIGNAL_HTTP_URL=http://127.0.0.1:8080
SIGNAL_ACCOUNT=+48...
```

Zabezpiecz plik:

```bash
chmod 600 ~/.hermes/.env
```

Nigdy nie commituj go do Git.

---

# 12. Provider i model

Do konfiguracji modeli służy:

```bash
hermes model
```

To jest pełny konfigurator providerów.

Możesz w nim:

- dodać providera,
- wpisać klucz API,
- zalogować się przez OAuth,
- wybrać model,
- skonfigurować własny endpoint,
- ustawić model domyślny.

---

# 13. `hermes model` a `/model`

To ważne.

## Poza sesją

```bash
hermes model
```

służy do konfiguracji providerów.

## W rozmowie

```text
/model
```

służy do zmiany pomiędzy modelami/providerami, które są już skonfigurowane.

Czyli:

```text
hermes model
```

= administracja

a:

```text
/model
```

= szybkie przełączenie podczas pracy.

---

# 14. OpenRouter

Hermes obsługuje OpenRouter.

Klucz:

```bash
OPENROUTER_API_KEY=...
```

Możesz wpisać go przez:

```bash
hermes model
```

albo ręcznie do:

```text
~/.hermes/.env
```

OpenRouter jest przydatny, gdy chcesz mieć dostęp do wielu różnych modeli bez konfigurowania osobnego API każdego dostawcy.

---

# 15. OpenAI

Jeżeli używasz bezpośredniego endpointu OpenAI lub zgodnego API:

```bash
OPENAI_API_KEY=...
```

Hermes obsługuje także endpointy zgodne z API OpenAI.

Można więc podpiąć m.in.:

- lokalny serwer modeli,
- vLLM,
- SGLang,
- inne serwery OpenAI-compatible.

---

# 16. Strategia modeli

Nie ma potrzeby uruchamiać każdego zadania na najmocniejszym modelu.

Dobry schemat:

```text
Model szybki/tani
        │
        ├── proste pytania
        ├── pliki
        ├── statusy
        └── proste zadania
                │
                ▼
Model średni
        │
        ├── programowanie
        ├── analiza
        ├── refaktoryzacja
        └── zadania wieloetapowe
                │
                ▼
Model mocny
        ├── trudne debugowanie
        ├── architektura
        └── skomplikowane zadania
```

Hermes umożliwia również konfigurację fallbacków i bardziej rozbudowanego routingu.

---

# 17. Fallback modeli

Hermes posiada mechanizm providerów zapasowych:

```bash
hermes fallback
```

Idea:

```text
model podstawowy
      │
      ├── działa → odpowiedź
      │
      └── błąd
            │
            ▼
      provider zapasowy
```

To szczególnie przydatne dla agenta działającego 24/7.

---

# 18. Mixture of Agents

Hermes posiada również:

```bash
hermes moa
```

MoA oznacza **Mixture of Agents**.

Pozwala używać kilku agentów/modeli do rozwiązania jednego zadania.

Nie warto uruchamiać tego do wszystkiego — zwiększa:

- koszt,
- liczbę tokenów,
- czas odpowiedzi.

Przydaje się przy bardziej złożonych analizach.

---

# 19. Terminal — najważniejsza funkcja agenta

Hermes może wykonywać polecenia systemowe.

Na Debianie np.:

```bash
systemctl status nginx
df -h
free -h
git status
docker ps
journalctl -u nginx
```

Na FreeBSD przez SSH:

```bash
service nginx status
df -h
sysctl hw.model
pkg info
zpool status
```

To właśnie powoduje, że agent jest czymś więcej niż zwykłym chatbotem.

---

# 20. Ostrożnie z uprawnieniami

Agentowi nie warto dawać pełnego roota bez ograniczeń.

Lepszy układ:

```text
użytkownik hermes
        │
        ├── zwykłe polecenia
        ├── repozytoria
        ├── Docker
        └── sudo tylko do wybranych operacji
```

Nie dawaj agentowi:

```text
NOPASSWD: ALL
```

jeżeli nie ma ku temu realnego powodu.

---

# 21. Lokalny terminal vs sandbox

Hermes może wykonywać polecenia:

- lokalnie,
- w Dockerze,
- przez SSH,
- w zdalnych sandboxach.

Dla ważnego serwera dobrym podejściem jest używanie izolacji.

Schemat:

```text
Hermes
  │
  ├── bezpieczne operacje → host
  │
  └── eksperymenty → sandbox
```

---

# 22. Docker

Hermes obsługuje backend Docker.

Daje to izolację dla wykonywanego kodu.

Przydaje się np. gdy agent:

- instaluje przypadkowe zależności,
- uruchamia kod z repozytorium,
- testuje skrypty,
- analizuje nieznane projekty.

Docker jest dobrym dodatkiem na Debianie.

Na FreeBSD nie należy zakładać natywnego Dockera jako podstawowej warstwy.

---

# 23. SSH — najważniejszy sposób pracy z FreeBSD

Najbardziej praktyczny układ:

```text
Hermes na Debianie
        │
        └── SSH
             │
             └── FreeBSD
```

Najpierw skonfiguruj normalne logowanie SSH.

Na Debianie:

```bash
ssh-keygen -t ed25519
```

Skopiuj klucz:

```bash
ssh-copy-id user@freebsd-host
```

Jeżeli `ssh-copy-id` nie jest dostępne po stronie FreeBSD, można ręcznie wkleić zawartość:

```text
~/.ssh/id_ed25519.pub
```

do:

```text
~/.ssh/authorized_keys
```

na FreeBSD.

Test:

```bash
ssh user@freebsd-host
```

Dopiero gdy zwykłe SSH działa bezproblemowo, konfiguruj korzystanie z niego przez Hermesa.

---

# 24. ~/.ssh/config

Bardzo warto utworzyć aliasy hostów.

Przykład:

```text
Host homeserver
    HostName 192.168.1.10
    User user
    IdentityFile ~/.ssh/id_ed25519

Host vps
    HostName 203.0.113.10
    User user
    IdentityFile ~/.ssh/id_ed25519
```

Wtedy:

```bash
ssh homeserver
```

zamiast:

```bash
ssh user@192.168.1.10
```

Agentowi również łatwiej operować nazwami typu:

```text
homeserver
backup
vps
router
```

niż zapamiętywać IP.

---

# 25. Rozpoznawanie Debiana i FreeBSD

Hermes powinien najpierw sprawdzić system.

Uniwersalnie:

```bash
uname -a
uname -s
```

Debian:

```bash
cat /etc/os-release
```

FreeBSD:

```bash
freebsd-version
uname -K
```

Dzięki temu agent może dobrać prawidłowe polecenia.

---

# 26. Różnice Debian vs FreeBSD, które agent powinien znać

## Pakiety

Debian:

```bash
sudo apt update
sudo apt install nginx
sudo apt upgrade
```

FreeBSD:

```bash
sudo pkg update
sudo pkg install nginx
sudo pkg upgrade
```

---

## Usługi

Debian:

```bash
systemctl status nginx
systemctl restart nginx
systemctl enable nginx
```

FreeBSD:

```bash
service nginx status
service nginx restart
sysrc nginx_enable=YES
```

---

## Logi

Debian:

```bash
journalctl -u nginx
```

FreeBSD:

```bash
tail -f /var/log/messages
```

oraz logi konkretnej aplikacji.

---

# 27. Projektowe instrukcje dla Hermesa

Hermes potrafi czytać instrukcje umieszczone w repozytorium.

Najważniejsze pliki:

```text
.hermes.md
AGENTS.md
CLAUDE.md
.cursorrules
```

Hermes wybiera plik kontekstu projektu według priorytetu.

Najlepiej używać:

```text
AGENTS.md
```

albo:

```text
.hermes.md
```

---

# 28. Przykład AGENTS.md

```markdown
# Projekt

Backend napisany w Go.

## Build

go build ./...

## Test

go test ./...

## Frontend

Pliki statyczne znajdują się w ./web.

## Zasady

- nie zmieniaj API bez pytania,
- przed commitem uruchom testy,
- nie modyfikuj plików w /vendor,
- kod formatuj przez gofmt.
```

Taki plik może dramatycznie poprawić jakość pracy agenta.

---

# 29. SOUL.md

Plik:

```text
~/.hermes/SOUL.md
```

definiuje osobowość agenta.

Możesz tam ustawić:

- styl komunikacji,
- ton,
- imię,
- sposób zachowania,
- poziom szczegółowości,
- rzeczy, których ma unikać.

Przykład:

```markdown
# Identity

Your name is Hermes.

Be concise and technical.

Explain destructive commands before executing them.

Never hide uncertainty.

Prefer simple solutions over unnecessary frameworks.
```

Nie wpisuj tu instrukcji dotyczących jednego konkretnego projektu.

Od tego jest `AGENTS.md`.

---

# 30. USER.md

Plik:

```text
~/.hermes/memories/USER.md
```

zawiera informacje o użytkowniku.

Hermes może zapisywać tam np.:

- preferowany styl odpowiedzi,
- poziom wiedzy,
- preferowane technologie,
- zwyczaje pracy.

Jest to część pamięci trwałej.

---

# 31. MEMORY.md

Plik:

```text
~/.hermes/memories/MEMORY.md
```

zawiera informacje, które agent zapamiętał.

Na przykład:

```text
Serwer homeserver działa na FreeBSD.
Projekt X używa PostgreSQL.
Do deploymentu używamy Dockera.
```

Pamięć jest mała i celowo ograniczona.

Nie jest przeznaczona do przechowywania całej historii rozmów.

---

# 32. Pamięć a historia sesji

Hermes posiada dwa różne mechanizmy:

```text
MEMORY / USER
```

oraz:

```text
historia sesji
```

Pamięć przechowuje wybrane ważne fakty.

Historia sesji może być przeszukiwana, gdy agent potrzebuje znaleźć wcześniejszą rozmowę.

To lepsze niż upychanie wszystkiego do MEMORY.md.

---

# 33. Ważna cecha pamięci

Pamięć jest ładowana na początku sesji.

Jeżeli agent zapisze coś do pamięci podczas rozmowy, nowa wersja będzie w pełni widoczna dla system promptu dopiero w kolejnej sesji.

Dlatego po dużej zmianie kontekstu warto użyć:

```text
/new
```

---

# 34. Kontrola zapisu pamięci

Możesz wymusić zatwierdzanie zapisów pamięci.

W `config.yaml`:

```yaml
memory:
  write_approval: true
```

Wtedy możesz sprawdzać proponowane zapisy:

```text
/memory pending
```

zatwierdzić:

```text
/memory approve <id>
```

odrzucić:

```text
/memory reject <id>
```

To dobry pomysł, gdy agent ma samodzielnie działać przez długi czas.

---

# 35. Skills

Skill to zestaw instrukcji i narzędzi opisujących, jak agent ma wykonywać konkretny typ zadania.

Przykładowe skills:

```text
deploy-go-app
check-freebsd-zfs
backup-project
publish-website
check-server-health
manage-nginx
```

Skills znajdują się między innymi w:

```text
~/.hermes/skills/
```

---

# 36. Po co skills

Zamiast za każdym razem tłumaczyć:

```text
wejdź na serwer,
sprawdź repo,
git pull,
zbuduj aplikację,
zrestartuj usługę,
sprawdź log
```

tworzysz skill:

```text
deploy-martwy-kompas
```

i agent zna procedurę.

To jest jedna z najważniejszych funkcji Hermesa w długim okresie.

---

# 37. Skills i sekrety

Skill może deklarować potrzebne zmienne środowiskowe.

Np.:

```yaml
required_environment_variables:
  - name: API_KEY
    prompt: API key
```

Sekret jest przechowywany poza samym skillem.

To znacznie bezpieczniejsze niż wpisanie tokena do pliku instrukcji.

---

# 38. Cron — automatyzacja

Hermes może uruchamiać zadania cyklicznie.

Przykłady:

```text
sprawdź codziennie wolne miejsce
sprawdź logi o 7:30
co godzinę sprawdź działanie strony
wyślij rano status serwera
```

Zadania przechowywane są w:

```text
~/.hermes/cron/
```

---

# 39. Zadania bez modelu AI

Nie każde zadanie potrzebuje LLM.

Jeżeli chcesz tylko:

```bash
df -h
```

i alarm, gdy dysk przekroczy 90%, można zrobić zadanie skryptowe bez modelu.

To:

- jest tańsze,
- szybsze,
- bardziej przewidywalne.

AI powinno być używane tam, gdzie potrzebna jest interpretacja.

---

# 40. Quick commands

Możesz tworzyć własne szybkie polecenia.

Przykład:

```yaml
quick_commands:
  disk:
    type: exec
    command: df -h /

  nginx:
    type: exec
    command: systemctl status nginx
```

Potem:

```text
/disk
```

lub:

```text
/nginx
```

nie wymaga wywołania modelu AI.

---

# 41. Signal

Hermes obsługuje Signal poprzez `signal-cli`.

Układ:

```text
telefon
  │
Signal
  │
signal-cli
  │
Hermes Gateway
  │
Hermes
```

Signal jest bardzo wygodny do zdalnego sterowania agentem działającym na VPS.

---

# 42. Signal — wymagania

Potrzebujesz:

- numeru telefonu,
- `signal-cli`,
- Java 17+,
- działającego demona HTTP `signal-cli`,
- Hermes Gateway.

Najpierw uruchom i skonfiguruj samo `signal-cli`.

---

# 43. Signal — konfiguracja Hermesa

Uruchom:

```bash
hermes gateway setup
```

Wybierz Signal.

Hermes zapyta między innymi o:

- URL `signal-cli`,
- numer konta,
- użytkowników mających dostęp.

Domyślny URL może wyglądać tak:

```text
http://127.0.0.1:8080
```

---

# 44. Signal — przykładowe zmienne

W:

```text
~/.hermes/.env
```

np.:

```bash
SIGNAL_HTTP_URL=http://127.0.0.1:8080
SIGNAL_ACCOUNT=+48XXXXXXXXX
SIGNAL_ALLOWED_USERS=+48YYYYYYYYY
SIGNAL_HOME_CHANNEL=+48YYYYYYYYY
```

Numery zapisuj w formacie E.164:

```text
+48123456789
```

---

# 45. Signal — bezpieczeństwo

To szczególnie ważne.

Agent przez Signal może mieć dostęp do shella.

Dlatego zawsze ogranicz użytkowników:

```bash
SIGNAL_ALLOWED_USERS=...
```

Nie ustawiaj bez potrzeby:

```bash
SIGNAL_ALLOW_ALL_USERS=true
```

Grupy Signal najlepiej pozostawić wyłączone, jeśli nie są potrzebne.

---

# 46. Uruchamianie gateway

Na pierwsze testy:

```bash
hermes gateway
```

lub zależnie od wersji CLI:

```bash
hermes gateway run
```

Dzięki temu widzisz logi bezpośrednio w terminalu.

Gdy wszystko działa, uruchom jako usługę.

---

# 47. Gateway jako usługa na Debianie

Hermes potrafi zainstalować gateway jako usługę użytkownika:

```bash
hermes gateway install
```

Dla systemowej usługi startującej przy bootowaniu:

```bash
sudo hermes gateway install --system
```

Można potem sprawdzić:

```bash
hermes gateway status
```

oraz:

```bash
systemctl status ...
```

w zależności od sposobu instalacji.

---

# 48. Usługi użytkownika i linger

Jeżeli gateway działa jako systemd user service i ma przeżyć logout, może być potrzebne:

```bash
sudo loginctl enable-linger USER
```

Np.:

```bash
sudo loginctl enable-linger hermes
```

---

# 49. FreeBSD i gateway

Na FreeBSD nie ma systemd.

Dlatego oficjalne mechanizmy instalacji usługi Hermesa nie są przeznaczone dla tego systemu.

To kolejny powód, by:

```text
Hermes + gateway → Debian
FreeBSD → host zarządzany przez SSH
```

---

# 50. `hermes send`

Hermes może wysłać pojedynczą wiadomość bez uruchamiania pełnej sesji agenta.

Przykład:

```bash
hermes send --to signal "Backup zakończony."
```

Albo plik:

```bash
hermes send --to signal --file /tmp/report.txt
```

To bardzo użyteczne w zwykłych skryptach shellowych.

---

# 51. Przykład użycia w skrypcie

```bash
#!/bin/sh

if ! zpool status -x | grep -q "all pools are healthy"; then
    hermes send --to signal "UWAGA: problem z ZFS."
fi
```

Na Debianie Hermes może w ten sposób wysyłać informacje o stanie zdalnego FreeBSD.

---

# 52. Browser / Chromium

Hermes może korzystać z automatyzacji przeglądarki.

Wykorzystuje m.in. Playwright i Chromium.

Ta część ma więcej zależności systemowych niż zwykły agent CLI.

Na Debianie wymagane biblioteki można zainstalować przez Playwright.

Jeżeli nie potrzebujesz browser automation, instalator można uruchomić bez przeglądarki:

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash -s -- --skip-browser
```

Na małym VPS jest to całkiem rozsądna opcja na początek.

---

# 53. Kiedy browser jest potrzebny

Przydaje się, gdy agent ma:

- obsługiwać stronę WWW jak użytkownik,
- klikać w interfejs,
- logować się do paneli,
- pobierać dane niedostępne przez API.

Do zwykłego web search browser nie zawsze jest potrzebny.

---

# 54. Aktualizacja Hermesa

Przed aktualizacją dobrze wykonać backup.

Następnie korzystaj z oficjalnego mechanizmu aktualizacji dla sposobu, w jaki Hermes został zainstalowany.

Sprawdź:

```bash
hermes --help
```

oraz dokumentację aktualnej wersji.

Nie aktualizuj na ślepo działającego produkcyjnego agenta tuż przed ważnym zadaniem.

---

# 55. Backup

Najważniejszy katalog:

```text
~/.hermes/
```

Zawiera on:

- konfigurację,
- osobowość,
- pamięć,
- skills,
- cron,
- historię,
- część credentiali.

Hermes posiada własne mechanizmy backup/import.

Warto jednak dodatkowo wykonywać zwykłą kopię katalogu.

Przykład:

```bash
tar -czf hermes-backup.tar.gz ~/.hermes
```

UWAGA:

taki backup może zawierać sekrety.

Traktuj go jak magazyn haseł.

---

# 56. Backup zaszyfrowany

Lepszy wariant:

```bash
tar -czf - ~/.hermes | age -p > hermes-backup.tar.gz.age
```

albo użyj innego sprawdzonego narzędzia szyfrującego.

Nie wrzucaj surowego `~/.hermes/` do publicznego repozytorium.

---

# 57. Logi

Logi znajdują się w:

```text
~/.hermes/logs/
```

Przykładowo mogą występować:

```text
gateway.log
errors.log
agent.log
```

Podstawowa diagnostyka:

```bash
ls -lah ~/.hermes/logs
tail -f ~/.hermes/logs/gateway.log
```

Szukaj błędów:

```bash
grep -Ri "error" ~/.hermes/logs
```

---

# 58. Przydatne narzędzia shellowe do administracji Hermesa

```bash
ps aux | grep hermes
pgrep -af hermes
ss -lntp
df -h
free -h
uptime
top
htop
journalctl
systemctl
tail
grep
rg
```

Na FreeBSD odpowiednio:

```bash
ps aux
sockstat -4 -6
df -h
top
service
sysrc
tail
grep
```

---

# 59. Profile

Hermes może obsługiwać wiele niezależnych profili/agentów.

Przykładowo:

```text
default
work
server
experiments
```

Każdy może mieć:

- inną osobowość,
- inne API keys,
- inne memories,
- inne skills,
- inną konfigurację.

To bardzo wygodne.

---

# 60. Po co profile

Przykład:

```text
Hermes "Siostra"
 ├── codzienne użycie
 └── Signal

Hermes "Dev"
 ├── repozytoria
 ├── coding
 └── szerokie uprawnienia

Hermes "Infra"
 ├── serwery
 ├── FreeBSD
 └── ograniczone komendy administracyjne
```

Nie musisz mieszać wszystkiego w jednej instancji.

---

# 61. Tworzenie profilu

Przykładowo:

```bash
hermes profile create work
```

Można także klonować konfigurację istniejącego profilu.

Sprawdź dostępne opcje:

```bash
hermes profile --help
```

---

# 62. Nie współdziel jednego HERMES_HOME pomiędzy niezależnymi agentami

Dwa procesy zapisujące tę samą pamięć mogą doprowadzić do konfliktów.

Każdy agent powinien mieć własny profil lub własne:

```text
HERMES_HOME
```

---

# 63. Sesje

Hermes przechowuje historię sesji.

Możesz je przeglądać między innymi przez:

```bash
hermes sessions list
```

Agent posiada także narzędzie wyszukiwania wcześniejszych rozmów.

---

# 64. Kiedy zaczynać nową sesję

Nową sesję warto rozpocząć:

- po zakończeniu zadania,
- przy zmianie projektu,
- gdy kontekst stał się ogromny,
- po zmianie SOUL.md,
- po zmianie projektowego AGENTS.md,
- gdy chcesz załadować świeżą pamięć.

W rozmowie:

```text
/new
```

---

# 65. Checkpointy

Hermes może wykonywać checkpointy plików przed zmianami.

Jeżeli coś pójdzie źle, przydatne jest:

```text
/rollback
```

Mimo tego Git nadal powinien być podstawowym mechanizmem wersjonowania kodu.

---

# 66. Git + Hermes

Przed większą pracą:

```bash
git status
git add .
git commit -m "checkpoint before Hermes changes"
```

Po pracy:

```bash
git diff
git status
```

Nigdy nie traktuj pamięci agenta jako zamiennika kontroli wersji.

---

# 67. Uprawnienia repozytoriów

Dobrą praktyką jest uruchamianie Hermesa jako użytkownika, który posiada tylko te repozytoria, do których agent powinien mieć dostęp.

Nie dawaj mu automatycznie całego:

```text
/home
```

jeżeli nie jest to potrzebne.

---

# 68. Sekrety projektowe

Nie umieszczaj sekretów w:

```text
AGENTS.md
SOUL.md
README.md
skills
```

Sekrety trzymaj w:

```text
.env
```

albo dedykowanym managerze sekretów.

---

# 69. Prompt injection

Agent może czytać:

- strony WWW,
- pliki,
- dokumenty,
- repozytoria.

Treść takiego pliku może próbować przekonać model do wykonania czegoś niepożądanego.

Hermes posiada mechanizmy skanowania kontekstu, ale nie należy zakładać, że rozwiązują każdy możliwy przypadek.

Zasada:

> Kod lub dokument pobrany z Internetu jest niezaufanym inputem.

---

# 70. Polecenia destrukcyjne

Szczególną ostrożność zachowuj przy:

```bash
rm -rf
zpool destroy
zfs destroy
dd
mkfs
gpart destroy
pkg delete
apt purge
DROP DATABASE
docker system prune
```

Przed pozwoleniem agentowi na takie operacje dobrze wymusić:

1. pokazanie dokładnego polecenia,
2. wyjaśnienie skutków,
3. backup lub snapshot,
4. dopiero później wykonanie.

---

# 71. FreeBSD + ZFS

Jeżeli Hermes ma zarządzać FreeBSD z ZFS, warto stworzyć osobny skill opisujący:

```text
zpool status
zfs list
zfs snapshot
zfs rollback
zfs send
zfs receive
```

Operacje destrukcyjne powinny wymagać potwierdzenia.

---

# 72. Przykładowy workflow: sprawdzenie FreeBSD

Ty:

```text
Sprawdź stan homeservera.
```

Hermes może wykonać:

```bash
ssh homeserver 'uptime'
ssh homeserver 'zpool status'
ssh homeserver 'df -h'
ssh homeserver 'service nginx status'
```

i zinterpretować wynik.

To jest idealny przykład zastosowania Hermesa.

---

# 73. Przykładowy workflow: deployment aplikacji Go

Hermes:

```bash
cd project
git status
git pull
go test ./...
go build ./...
docker build -t app .
docker compose up -d
docker compose ps
```

Na końcu:

```bash
curl -I https://example.com
```

Taki proces warto później zapisać jako skill.

---

# 74. Przykładowy workflow: monitoring

Cron:

```text
co 10 minut
```

wykonuje skrypt:

```bash
curl -fsS https://example.com/health
```

Jeżeli skrypt wykryje błąd:

```bash
hermes send --to signal "Serwis nie odpowiada."
```

AI wcale nie musi być angażowane.

---

# 75. Przykładowy workflow: analiza błędu

Ty:

```text
Strona zwraca 502. Sprawdź dlaczego, ale niczego nie restartuj bez pytania.
```

Hermes może:

```bash
systemctl status nginx
journalctl -u nginx
docker ps
docker logs app
ss -lntp
```

następnie przedstawić diagnozę.

To jest bardzo dobry styl wydawania poleceń agentowi: jasno określ granicę autonomii.

---

# 76. Dobry prompt do agenta

Zamiast:

```text
Napraw serwer.
```

lepiej:

```text
Sprawdź dlaczego nginx zwraca 502.
Możesz czytać logi i konfigurację.
Nie restartuj usług i nie modyfikuj plików bez mojego potwierdzenia.
Na końcu przedstaw diagnozę i proponowaną zmianę.
```

Agent działa lepiej, gdy dokładnie wie:

- cel,
- zakres,
- czego może dotknąć,
- czego nie wolno robić,
- jak ma zakończyć zadanie.

---

# 77. Tryby autonomii

Możesz mentalnie podzielić zadania na trzy poziomy.

## Poziom 1 — tylko analiza

```text
Sprawdź i powiedz, co jest nie tak.
Nic nie zmieniaj.
```

## Poziom 2 — ograniczone działanie

```text
Możesz poprawić konfigurację aplikacji,
ale nie restartuj usług.
```

## Poziom 3 — autonomiczne wykonanie

```text
Napraw problem, uruchom testy,
zrestartuj usługę i zweryfikuj rezultat.
```

Do produkcji najlepiej zaczynać od poziomu 1.

---

# 78. WebUI

Hermes może mieć dodatkowe interfejsy WWW.

Nie są one potrzebne do działania samego agenta.

Na początku zdecydowanie wystarczają:

```text
CLI + Signal
```

WebUI warto dodać dopiero wtedy, gdy faktycznie zacznie brakować wygodniejszego interfejsu.

---

# 79. Co warto uruchomić najpierw

Kolejność wdrożenia:

```text
1. Debian
2. Hermes
3. jeden model
4. zwykły chat
5. shell
6. SSH do FreeBSD
7. SOUL.md
8. AGENTS.md dla projektów
9. Signal
10. skills
11. cron
12. dodatkowe modele
13. fallback
14. browser
15. WebUI
```

Taka kolejność bardzo upraszcza diagnostykę.

---

# 80. Czego NIE robić pierwszego dnia

Nie konfiguruj od razu:

- pięciu providerów,
- dziesięciu modeli,
- kilkunastu skills,
- wielu komunikatorów,
- browser automation,
- crona,
- WebUI,
- pełnego roota,
- automatycznych deploymentów produkcyjnych.

Najpierw zwykła rozmowa i shell.

---

# 81. Proponowany układ na VPS

Dla małego Debiana:

```text
Debian VPS
├── nginx
├── Docker
├── projekty
├── Hermes
├── Signal CLI
└── SSH
     └── homelab FreeBSD
```

4 GB RAM jest rozsądnym punktem startowym dla samego Hermesa i lekkich usług, jeżeli modele działają przez API.

Chromium może jednak zauważalnie zwiększyć zużycie RAM.

---

# 82. Proponowany osobny użytkownik

Możesz utworzyć:

```bash
sudo adduser hermes
```

i uruchamiać agenta właśnie na tym koncie.

Zalety:

- osobny katalog domowy,
- łatwiejsze kontrolowanie uprawnień,
- osobne klucze SSH,
- prostsza separacja sekretów.

---

# 83. Kontrolowane sudo

Przez:

```bash
sudo visudo
```

można dopuścić tylko konkretne polecenia.

Nie twórz jednak skomplikowanych reguł sudo bez zrozumienia ich konsekwencji — obejścia są czasem możliwe przez pozornie niewinne programy.

---

# 84. Firewall

Hermes sam w sobie nie wymaga wystawiania całego systemu na Internet.

Jeżeli `signal-cli` słucha na:

```text
127.0.0.1:8080
```

nie wystawiaj tego portu publicznie.

Sprawdź:

```bash
ss -lntp
```

Powinno być:

```text
127.0.0.1:8080
```

a nie:

```text
0.0.0.0:8080
```

chyba że dokładnie wiesz, dlaczego tego potrzebujesz.

---

# 85. SSH z Hermesa do FreeBSD — bezpieczeństwo

Dobrze utworzyć osobny klucz:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/hermes_freebsd
```

i użyć go w:

```text
~/.ssh/config
```

Przykład:

```text
Host homeserver
    HostName 192.168.1.10
    User hermes
    IdentityFile ~/.ssh/hermes_freebsd
```

Możesz wtedy ograniczyć konto `hermes` na FreeBSD.

---

# 86. FreeBSD — użytkownik dla agenta

Na FreeBSD:

```bash
adduser
```

utwórz osobnego użytkownika np.:

```text
hermes
```

Nie musi być rootem.

Daj mu tylko prawa potrzebne do:

- odczytu logów,
- sprawdzania usług,
- deploymentu konkretnych aplikacji,
- wykonywania uzgodnionych komend.

---

# 87. FreeBSD — sudo/doas

Możesz użyć:

```text
sudo
```

lub:

```text
doas
```

Nie dawaj agentowi automatycznie pełnej kontroli nad hostem.

Na początek zwykły użytkownik SSH często w zupełności wystarczy.

---

# 88. Native Hermes na FreeBSD — eksperymentalnie

Jeżeli mimo wszystko chcesz próbować:

1. zainstaluj Git,
2. zainstaluj nowego Pythona,
3. zainstaluj Node.js,
4. zainstaluj `ripgrep`,
5. zainstaluj `ffmpeg`,
6. sklonuj repo,
7. utwórz virtualenv,
8. spróbuj instalacji zależności ręcznie.

Ale:

> Nie traktuj takiej instalacji jako stabilnej konfiguracji.

Aktualizacje Hermesa mogą ją złamać.

Nie jest to oficjalnie wspierana platforma.

---

# 89. Debian VM na FreeBSD

Jeżeli fizyczny serwer działa na FreeBSD, możesz zrobić:

```text
FreeBSD
└── bhyve
     └── Debian VM
          └── Hermes
```

Hermes może wtedy zarządzać hostem FreeBSD przez SSH.

To bardzo czysta architektura.

---

# 90. Monitorowanie samego Hermesa

Warto sprawdzać:

```bash
pgrep -af hermes
hermes gateway status
df -h
free -h
```

i logi:

```bash
tail -n 100 ~/.hermes/logs/gateway.log
```

---

# 91. Watchdog

Na Debianie można użyć systemd, żeby gateway był automatycznie restartowany po błędzie.

Jeżeli Hermes sam instaluje usługę, warto najpierw użyć jego własnego mechanizmu.

Potem sprawdź jednostkę:

```bash
systemctl --user list-units | grep -i hermes
```

lub systemową:

```bash
systemctl list-units | grep -i hermes
```

---

# 92. Aktualizacje systemu

Debian:

```bash
sudo apt update
sudo apt upgrade
```

FreeBSD:

```bash
sudo pkg update
sudo pkg upgrade
```

System bazowy FreeBSD aktualizuje się innymi mechanizmami niż pakiety.

Agent powinien odróżniać:

```text
base system
```

od:

```text
pkg
```

---

# 93. Nie pozwalaj agentowi ślepo aktualizować produkcji

Polecenie:

```text
zaktualizuj wszystko
```

jest kiepskim zadaniem dla serwera produkcyjnego.

Lepsze:

```text
Sprawdź dostępne aktualizacje.
Pokaż pakiety, które zostaną zmienione.
Nie wykonuj aktualizacji bez potwierdzenia.
```

---

# 94. Agent jako administrator

Hermes może być świetnym pomocnikiem administracyjnym, ale powinien działać według zasady:

```text
obserwuj → diagnozuj → zaproponuj → zmień → zweryfikuj
```

Nie:

```text
zmieniaj wszystko aż zacznie działać
```

---

# 95. Agent jako developer

Dobry workflow:

```text
issue
  │
  ▼
analiza repo
  │
  ▼
plan
  │
  ▼
zmiany
  │
  ▼
testy
  │
  ▼
git diff
  │
  ▼
commit
```

Warto wpisać ten workflow do projektowego `AGENTS.md`.

---

# 96. Agent jako operator serwera

Dobry workflow:

```text
status
  │
  ▼
logi
  │
  ▼
diagnoza
  │
  ▼
snapshot / backup
  │
  ▼
zmiana
  │
  ▼
restart
  │
  ▼
health check
```

---

# 97. Najważniejsze slash commands

Lista może się zmieniać pomiędzy wersjami, dlatego zawsze możesz użyć:

```text
/help
```

Szczególnie przydatne są:

```text
/new
/model
/memory
/context
/rollback
/help
```

Dokładny zestaw sprawdzaj w aktualnej wersji Hermesa.

---

# 98. Najważniejsze komendy administracyjne CLI

Warto zapamiętać:

```bash
hermes
hermes doctor
hermes setup
hermes model
hermes tools
hermes gateway setup
hermes gateway status
hermes config get
hermes config set
hermes sessions list
hermes send
hermes profile
hermes memory
```

Sprawdzanie podkomend:

```bash
hermes COMMAND --help
```

---

# 99. Diagnostyka — pierwszy zestaw

Jeżeli Hermes przestaje działać:

```bash
hermes doctor
which hermes
hermes --help
pgrep -af hermes
df -h
free -h
```

Następnie:

```bash
ls -lah ~/.hermes/logs
tail -n 200 ~/.hermes/logs/errors.log
tail -n 200 ~/.hermes/logs/gateway.log
```

---

# 100. Signal nie działa — checklista

Sprawdź:

```bash
java -version
signal-cli --version
```

Czy daemon działa:

```bash
ps aux | grep signal-cli
```

Czy port działa:

```bash
ss -lntp | grep 8080
```

Czy endpoint jest dostępny tylko lokalnie.

Następnie:

```bash
hermes gateway status
```

i logi gateway.

---

# 101. SSH do FreeBSD nie działa — checklista

Na Debianie:

```bash
ssh -v homeserver
```

Na FreeBSD:

```bash
service sshd status
sockstat -4 -6 | grep :22
```

Sprawdź:

```text
~/.ssh/authorized_keys
```

oraz uprawnienia:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

---

# 102. Hermes używa złej komendy systemowej

Jeżeli agent próbuje np.:

```bash
systemctl
```

na FreeBSD, popraw jego kontekst.

W `AGENTS.md` dla infrastruktury napisz:

```markdown
Host homeserver runs FreeBSD.

Use:
- `service`, not `systemctl`
- `pkg`, not `apt`
- `sysrc` for service enablement
- `sockstat`, not `ss`
```

To prosty sposób na ograniczenie pomyłek.

---

# 103. Osobny repozytorium infrastruktury

Warto mieć np.:

```text
infra/
├── AGENTS.md
├── hosts.md
├── procedures/
│   ├── backup.md
│   ├── restore.md
│   └── deploy.md
└── scripts/
```

Hermes uruchomiony w tym katalogu dostanie dobry kontekst infrastruktury.

---

# 104. Hosts.md

Przykład:

```markdown
# Hosts

## vps
OS: Debian
Role: public applications

## homeserver
OS: FreeBSD
Role: storage, Jellyfin, backups

## router
OS: RouterOS
Role: firewall and routing
```

Nie wpisuj tu haseł.

---

# 105. Procedury zamiast improwizacji

Im bardziej krytyczne zadanie, tym lepiej, by istniała procedura.

Np.:

```text
procedures/update-freebsd.md
procedures/deploy-site.md
procedures/recover-postgresql.md
```

Hermes może je czytać i wykonywać krok po kroku.

---

# 106. Klucze API

Podstawowe zasady:

- jeden klucz na usługę,
- ograniczaj uprawnienia,
- rotuj klucze,
- nie zapisuj ich w repo,
- nie wysyłaj ich w rozmowie, jeśli nie jest to konieczne,
- trzymaj w `.env` lub managerze sekretów.

---

# 107. Koszty modeli

Największym bieżącym kosztem agenta są zwykle wywołania modeli.

Koszt ograniczają:

- tani model jako domyślny,
- mocny model tylko do trudnych zadań,
- quick commands,
- zadania cron bez LLM,
- sensowne rozpoczynanie nowych sesji,
- niezapychana pamięć,
- ograniczanie niepotrzebnych podagentów.

---

# 108. Tokeny a długie sesje

Bardzo długa rozmowa:

- zwiększa kontekst,
- może zwiększyć koszt,
- może spowolnić pracę,
- zwiększa ryzyko pomyłek.

Po zakończeniu tematu:

```text
/new
```

Hermes zachowa pamięć i historię sesji.

---

# 109. Kiedy używać podagentów

Podagenci są sensowni, gdy zadanie można podzielić.

Np.:

```text
agent 1 → analizuje backend
agent 2 → analizuje frontend
agent 3 → analizuje testy
```

Nie ma sensu uruchamiać podagentów do:

```text
sprawdź wolne miejsce na dysku
```

---

# 110. Minimalna konfiguracja produkcyjna

Po kilku dniach zabawy sensowne minimum może wyglądać tak:

```text
Debian VPS
│
├── osobny user hermes
├── Hermes
├── jeden tani model
├── jeden mocny model
├── fallback
├── Signal
├── SSH do FreeBSD
├── backup ~/.hermes
└── ograniczone sudo
```

---

# 111. Sensowny model pracy

Na co dzień:

```text
Signal
  │
  ▼
Hermes na VPS
  │
  ├── pytania
  ├── projekty
  ├── cron
  ├── monitoring
  └── SSH
       └── FreeBSD
```

Do poważniejszych prac developerskich:

```text
SSH / terminal
   │
   ▼
Hermes CLI
   │
   ▼
repozytorium
```

---

# 112. Co trzymać gdzie

| Informacja | Miejsce |
|---|---|
| osobowość agenta | `SOUL.md` |
| preferencje użytkownika | `USER.md` |
| wiedza trwała agenta | `MEMORY.md` |
| instrukcje projektu | `AGENTS.md` / `.hermes.md` |
| konfiguracja | `config.yaml` |
| sekrety | `.env` |
| własne procedury agenta | `skills/` |
| harmonogramy | `cron/` |
| historia | `sessions/` |
| diagnostyka | `logs/` |

---

# 113. Komendy — ściąga

## Instalacja

```bash
sudo apt update
sudo apt install -y git curl xz-utils
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
source ~/.bashrc
```

## Diagnostyka

```bash
hermes doctor
```

## Start

```bash
hermes
```

## Konfiguracja

```bash
hermes setup
hermes model
hermes tools
```

## Gateway

```bash
hermes gateway setup
hermes gateway status
```

## Sesje

```bash
hermes sessions list
```

## Profile

```bash
hermes profile --help
```

## Pamięć

```bash
hermes memory --help
```

## Wiadomość

```bash
hermes send --to signal "test"
```

---

# 114. FreeBSD — ściąga dla Hermesa

## System

```bash
freebsd-version
uname -a
```

## Pakiety

```bash
pkg info
sudo pkg update
sudo pkg upgrade
sudo pkg install PACKAGE
```

## Usługi

```bash
service -e
service SERVICE status
sudo service SERVICE restart
```

## Enable

```bash
sudo sysrc service_enable=YES
```

## Sieć

```bash
ifconfig
netstat -rn
sockstat -4 -6
```

## Dyski

```bash
df -h
gpart show
camcontrol devlist
```

## ZFS

```bash
zpool status
zpool list
zfs list
```

---

# 115. Debian — ściąga dla Hermesa

## System

```bash
cat /etc/os-release
uname -a
```

## Pakiety

```bash
apt list --installed
sudo apt update
sudo apt upgrade
sudo apt install PACKAGE
```

## Usługi

```bash
systemctl status SERVICE
sudo systemctl restart SERVICE
sudo systemctl enable SERVICE
```

## Logi

```bash
journalctl -u SERVICE
journalctl -xe
```

## Sieć

```bash
ip addr
ip route
ss -lntup
```

## Zasoby

```bash
df -h
free -h
uptime
```

---

# 116. Jak uczyć własnego Hermesa

Najlepsza droga to nie ogromny prompt startowy.

Lepsza jest ewolucja:

```text
SOUL.md
   +
USER.md
   +
MEMORY.md
   +
AGENTS.md
   +
skills
```

Agent stopniowo poznaje:

- Ciebie,
- Twoje środowisko,
- Twoje projekty,
- procedury pracy.

---

# 117. Najważniejsza zasada

Hermes jest najbardziej użyteczny, gdy staje się **operatorem znanego środowiska**, a nie modelem, który za każdym razem zgaduje od zera.

Dlatego:

```text
dobre instrukcje
+ ograniczone uprawnienia
+ powtarzalne procedury
+ Git
+ SSH
+ skills
+ monitoring
```

są ważniejsze niż samo użycie najmocniejszego dostępnego modelu.

---

# 118. Rekomendowana architektura Debian + FreeBSD

Docelowo:

```text
                     ┌─────────────┐
                     │   Signal    │
                     └──────┬──────┘
                            │
                            ▼
                 ┌────────────────────┐
                 │     Debian VPS     │
                 │                    │
                 │  Hermes Agent      │
                 │  ├── models        │
                 │  ├── memory        │
                 │  ├── skills        │
                 │  ├── cron          │
                 │  ├── Git           │
                 │  └── gateway       │
                 └─────────┬──────────┘
                           │
                          SSH
                           │
                ┌──────────▼──────────┐
                │      FreeBSD        │
                │                     │
                │ ZFS                 │
                │ jails               │
                │ services            │
                │ backups             │
                │ Jellyfin / storage  │
                └─────────────────────┘
```

To daje Ci:

- stabilne środowisko dla agenta,
- pełną funkcjonalność Hermesa,
- prostą aktualizację,
- naturalne zarządzanie FreeBSD,
- izolację systemów,
- możliwość łatwego przeniesienia Hermesa na inny VPS.

---

# 119. Pierwszy dzień — konkretna checklista

```text
[ ] Zainstaluj Debiana
[ ] Zaktualizuj system
[ ] Zainstaluj git/curl/xz-utils
[ ] Zainstaluj Hermesa
[ ] Uruchom hermes doctor
[ ] Skonfiguruj jeden model
[ ] Uruchom zwykłą rozmowę
[ ] Sprawdź terminal
[ ] Utwórz ~/.hermes/SOUL.md
[ ] Skonfiguruj SSH do FreeBSD
[ ] Sprawdź z Hermesa uname/freebsd-version
[ ] Dopiero potem skonfiguruj Signal
```

---

# 120. Drugi etap

```text
[ ] Signal
[ ] gateway jako usługa
[ ] ograniczenie dostępu Signal
[ ] backup ~/.hermes
[ ] osobny użytkownik systemowy
[ ] pierwszy AGENTS.md
[ ] pierwszy skill
[ ] prosty cron
[ ] powiadomienie przez hermes send
```

---

# 121. Trzeci etap

```text
[ ] drugi model
[ ] model fallback
[ ] profile
[ ] browser automation
[ ] rozbudowane skills
[ ] monitoring usług
[ ] automatyczny deployment
[ ] WebUI, jeśli faktycznie potrzebne
```

---

# 122. Przydatne źródła

Oficjalna dokumentacja:

https://hermes-agent.nousresearch.com/docs/

Instalacja:

https://hermes-agent.nousresearch.com/docs/getting-started/installation

Obsługiwane platformy:

https://hermes-agent.nousresearch.com/docs/getting-started/platform-support

Konfiguracja:

https://hermes-agent.nousresearch.com/docs/user-guide/configuration

CLI:

https://hermes-agent.nousresearch.com/docs/reference/cli-commands

Slash commands:

https://hermes-agent.nousresearch.com/docs/reference/slash-commands

Pamięć:

https://hermes-agent.nousresearch.com/docs/user-guide/features/memory

Skills:

https://hermes-agent.nousresearch.com/docs/user-guide/features/skills

Cron:

https://hermes-agent.nousresearch.com/docs/user-guide/features/cron

Security:

https://hermes-agent.nousresearch.com/docs/user-guide/security

Messaging gateway:

https://hermes-agent.nousresearch.com/docs/user-guide/messaging

Signal:

https://hermes-agent.nousresearch.com/docs/user-guide/messaging/signal

GitHub:

https://github.com/NousResearch/hermes-agent

---

# 123. TL;DR

Jeżeli chcesz po prostu wiedzieć, jak to ustawić:

```text
Debian → Hermes → Signal
               → modele przez API
               → Git
               → cron
               → skills
               → SSH → FreeBSD
```

Nie próbuj robić z FreeBSD głównego hosta Hermesa, dopóki projekt oficjalnie go nie wspiera.

FreeBSD świetnie nadaje się natomiast na maszynę, którą Hermes administruje przez SSH.

Na początek wystarczą:

```bash
hermes
hermes doctor
hermes setup
hermes model
hermes gateway setup
```

oraz wiedza, gdzie znajdują się:

```text
~/.hermes/config.yaml
~/.hermes/.env
~/.hermes/SOUL.md
~/.hermes/memories/
~/.hermes/skills/
~/.hermes/logs/
```

Resztę warto dokładać dopiero wtedy, gdy podstawowy agent działa stabilnie.
