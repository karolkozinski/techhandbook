---
id: "doc-030"
title: "Shelle w FreeBSD — przegląd"
slug: "shelle-w-freebsd-przeglad"
description: "Shell, czyli powłoka, to program pośredniczący między użytkownikiem a systemem operacyjnym."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "freebsd"
  - "shell"
  - "sh"
  - "tcsh"
---

# Shelle w FreeBSD — przegląd

## 1. Czym jest shell?

Shell, czyli powłoka, to program pośredniczący między użytkownikiem a systemem operacyjnym.

Schemat:

```text
Ty
 ↓
terminal
 ↓
shell
 ↓
program
 ↓
kernel FreeBSD
```

Terminal i shell to różne rzeczy.

Przykładowe shelle:

- `sh`,
- `csh`,
- `tcsh`,
- `bash`,
- `zsh`,
- `fish`,
- `ksh`.

## 2. System bazowy a dodatkowe oprogramowanie

To bardzo ważne we FreeBSD.

System bazowy zawiera między innymi:

```text
/bin/sh
/bin/csh
/bin/tcsh
```

Programy instalowane dodatkowo przez `pkg` trafiają zwykle do:

```text
/usr/local/bin
```

Dlatego:

```text
/usr/local/bin/bash
/usr/local/bin/zsh
/usr/local/bin/fish
```

To jedna z podstawowych różnic względem typowego Linuksa.

## 3. Domyślny shell FreeBSD

We współczesnym FreeBSD podstawowym shellem systemowym jest:

```text
/bin/sh
```

Typowy układ:

```text
user → /bin/sh
root → /bin/sh
```

Tcsh nadal pozostaje częścią systemu bazowego.

## 4. Najważniejsze shelle

| Shell | Status | Typowe zastosowanie |
|---|---|---|
| `sh` | system bazowy | administracja, skrypty, root |
| `csh` | system bazowy | historyczny shell BSD |
| `tcsh` | system bazowy | rozwinięty C shell |
| `bash` | pakiet | wygodna codzienna praca |
| `zsh` | pakiet | rozbudowany shell interaktywny |
| `fish` | pakiet | wygodna interaktywna konsola |
| `ksh` | pakiet | klasyczny Unix |
| `mksh` | pakiet | lekki Korn shell |

## 5. `sh` we FreeBSD

FreeBSD ma własny `sh` jako część systemu bazowego.

Uruchomienie:

```sh
sh
```

Przykład:

```sh
#!/bin/sh

NAME="Karol"

if [ -f /etc/passwd ]; then
    echo "$NAME"
fi
```

Najważniejsze konstrukcje:

```sh
VAR=value
export VAR
```

```sh
if [ -f file ]; then
    echo "jest"
fi
```

```sh
for file in *.txt; do
    echo "$file"
done
```

## 6. Konfiguracja `sh`

Login shell korzysta typowo z:

```text
/etc/profile
~/.profile
```

Interaktywną konfigurację można powiązać ze zmienną `ENV`:

```sh
ENV="$HOME/.shrc"
export ENV
```

Dzięki temu możesz trzymać aliasy i ustawienia interaktywne w:

```text
~/.shrc
```

## 7. Bash we FreeBSD

Bash nie należy do systemu bazowego.

Instalacja:

```sh
sudo pkg install bash
```

Typowa lokalizacja:

```text
/usr/local/bin/bash
```

Uruchomienie:

```sh
bash
```

Bash oferuje:

- historię,
- aliasy,
- funkcje,
- completion,
- tablice,
- job control,
- rozbudowane warunki.

Przykład:

```bash
servers=(web db cache)
echo "${servers[0]}"
```

## 8. Konfiguracja Basha

Najważniejszy plik:

```text
~/.bashrc
```

Przykład:

```bash
alias ll='ls -lah'
export EDITOR=vim
PS1='\u@\h:\w\$ '
```

Przeładowanie:

```sh
source ~/.bashrc
```

lub:

```sh
. ~/.bashrc
```

## 9. Zsh

Instalacja:

```sh
sudo pkg install zsh
```

Uruchomienie:

```sh
zsh
```

Konfiguracja:

```text
~/.zshrc
```

Przykład:

```zsh
alias ll='ls -lah'
export EDITOR=vim

autoload -Uz compinit
compinit
```

Zsh jest bardzo dobrym shellem użytkownika, ale nie należy do systemu bazowego FreeBSD.

## 10. Fish

Instalacja:

```sh
sudo pkg install fish
```

Uruchomienie:

```sh
fish
```

Konfiguracja:

```text
~/.config/fish/config.fish
```

Fish nie jest zgodny składniowo z POSIX.

Bash/sh:

```sh
export EDITOR=vim
```

Fish:

```fish
set -gx EDITOR vim
```

## 11. csh

C shell należy do tradycji BSD.

Przykład:

```csh
set name = "Karol"
```

Zmienne środowiskowe:

```csh
setenv EDITOR vim
```

Składnia mocno różni się od `sh`.

## 12. tcsh

Tcsh jest rozwinięciem C shell i nadal znajduje się w FreeBSD base system.

Uruchomienie:

```sh
tcsh
```

Konfiguracja:

```text
~/.tcshrc
```

lub:

```text
~/.cshrc
```

Przykład:

```tcsh
setenv EDITOR vim
alias ll 'ls -lah'
set prompt = "%n@%m:%~%# "
```

Starsze poradniki FreeBSD często pokazują tcsh jako shell roota. W nowszych wersjach domyślnie używany jest `sh`.

## 13. KornShell i mksh

Instalacja:

```sh
sudo pkg install ksh
```

lub:

```sh
sudo pkg install mksh
```

Do administracji FreeBSD ważniejsze jest opanowanie `sh`, a do wygodnej pracy interaktywnej Basha lub Zsh.

## 14. Lista dostępnych login shelli

```sh
cat /etc/shells
```

Przykładowo:

```text
/bin/sh
/bin/csh
/bin/tcsh
/usr/local/bin/bash
/usr/local/bin/zsh
/usr/local/bin/fish
```

## 15. Sprawdzanie shella

Login shell:

```sh
echo "$SHELL"
```

Aktualny shell:

```sh
ps -p $$ -o comm=
```

Dodatkowo:

```sh
echo "$0"
```

## 16. Uruchamianie innego shella

Na przykład:

```sh
bash
```

Powstaje:

```text
sh
 └── bash
```

Powrót:

```sh
exit
```

## 17. `exec`

```sh
exec bash
```

zastępuje aktualny shell Bashem.

## 18. Zmiana login shella

Najpierw:

```sh
cat /etc/shells
```

Bash:

```sh
chsh -s /usr/local/bin/bash
```

Zsh:

```sh
chsh -s /usr/local/bin/zsh
```

Fish:

```sh
chsh -s /usr/local/bin/fish
```

## 19. Root — ważna praktyka

Root powinien korzystać z shella należącego do systemu bazowego.

Najbezpieczniej:

```text
root → /bin/sh
```

Nie warto ustawiać rootowi:

```text
/usr/local/bin/bash
```

jako jedynego login shella.

Powód: `/usr/local` zawiera oprogramowanie dodatkowe. W sytuacji awaryjnej root nadal powinien mieć dostęp do shella z systemu bazowego.

Dobry układ:

```text
root → /bin/sh
user → /usr/local/bin/bash
```

## 20. `sudo -i`

```sh
sudo -i
```

uruchamia środowisko loginowe roota.

Jeżeli root ma:

```text
/bin/sh
```

dostaniesz `sh`.

Natomiast:

```sh
sudo bash
```

jawnie uruchamia Bash jako root.

## 21. Shebang

Dla przenośnego skryptu:

```sh
#!/bin/sh
```

Jeżeli potrzebujesz Basha:

```bash
#!/usr/bin/env bash
```

To wygodne, ponieważ Bash znajduje się zwykle tutaj:

```text
/usr/local/bin/bash
```

## 22. Dlaczego `env bash` jest użyteczne

Na różnych systemach Bash może znajdować się w różnych miejscach.

FreeBSD:

```text
/usr/local/bin/bash
```

Linux:

```text
/usr/bin/bash
```

Dlatego:

```bash
#!/usr/bin/env bash
```

wyszukuje Basha przez `$PATH`.

## 23. Nie zastępuj systemowego `sh`

FreeBSD `sh` jest częścią systemu bazowego.

Możesz ustawić inny shell użytkownikowi, ale nie podmieniaj systemowego `/bin/sh`.

## 24. Przekierowania

```sh
command > file
command >> file
command 2> errors.log
command > output.log 2>&1
```

## 25. Potoki

```sh
ps aux | grep nginx
```

Shell tworzy potok między procesami.

## 26. Zmienne

```sh
NAME="Karol"
echo "$NAME"
export EDITOR=vim
DATE=$(date)
```

## 27. Cytowanie

```sh
echo "Hello $NAME"
echo 'Hello $NAME'
echo "\$HOME"
```

## 28. Globbing

Shell rozwija:

```text
*
?
[abc]
```

Przykład:

```sh
ls *.conf
```

## 29. Builtiny

```sh
type cd
type ls
command -v pkg
```

`cd` jest builtin-em.

## 30. Aliasy

```sh
alias ll='ls -lah'
alias
unalias ll
```

## 31. Funkcje

```sh
mkcd() {
    mkdir -p "$1" && cd "$1"
}
```

## 32. Historia

W Bash:

```sh
history
```

Wyszukiwanie:

```text
Ctrl-R
```

## 33. Job control

Uruchomienie:

```sh
sleep 1000
```

`Ctrl-Z`, a następnie:

```sh
jobs
fg
bg
```

Uruchomienie od razu w tle:

```sh
sleep 1000 &
```

## 34. `$PATH`

```sh
echo "$PATH"
```

We FreeBSD szczególnie ważne jest:

```text
/usr/local/bin
```

bo tam znajdują się programy instalowane przez `pkg`.

## 35. Instalowanie shelli przez `pkg`

```sh
sudo pkg install bash
sudo pkg install zsh
sudo pkg install fish
sudo pkg install mksh
```

Po instalacji:

```sh
cat /etc/shells
command -v bash
```

## 36. Dobry układ we FreeBSD

Dla roota:

```text
/bin/sh
```

Dla zwykłego użytkownika:

```text
/bin/sh
```

jeśli chcesz pracować blisko filozofii FreeBSD,

albo:

```text
/usr/local/bin/bash
```

jeśli chcesz środowisko podobne do Debiana.

## 37. Co warto nauczyć się najlepiej

Najważniejsze:

```text
1. FreeBSD sh
2. Bash
```

`sh` daje rozumienie systemu i przenośność.

Bash daje wygodę i podobne środowisko jak na Linuksie.

## 38. Szybka ściąga

```sh
echo "$SHELL"
ps -p $$ -o comm=
cat /etc/shells
command -v bash
echo "$PATH"
```

Instalacja Basha:

```sh
sudo pkg install bash
```

Zmiana shella:

```sh
chsh -s /usr/local/bin/bash
```

## 39. Najważniejsza zasada

> FreeBSD `sh` jest częścią systemu bazowego, a Bash, Zsh i Fish są dodatkami.

Dlatego:

```text
root → /bin/sh
```

jest rozsądnym wyborem, a zwykły użytkownik może korzystać z:

```text
/usr/local/bin/bash
```

lub:

```text
/usr/local/bin/zsh
```
