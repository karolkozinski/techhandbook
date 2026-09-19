# debian-shells-overview

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
kernel
```

Terminal i shell to dwie różne rzeczy. GNOME Terminal, Konsole, xterm czy terminal SSH to terminale. Bash, sh, dash, zsh czy fish to shelle.

## 2. Najważniejsze pojęcia

### Login shell

Shell przypisany do Twojego konta:

```sh
echo "$SHELL"
```

Typowo:

```text
/bin/bash
```

### Aktualny shell

Shell, w którym właśnie pracujesz:

```sh
ps -p $$ -o comm=
```

### `/bin/sh`

W Debianie `/bin/sh` wskazuje zwykle na Dash:

```sh
ls -l /bin/sh
```

Typowy wynik:

```text
/bin/sh -> dash
```

### Interpreter skryptu

Określa go shebang:

```sh
#!/bin/sh
```

albo:

```sh
#!/usr/bin/env bash
```

## 3. Jak Debian używa shelli

Typowy układ:

```text
użytkownik
    ↓
/bin/bash

/bin/sh
    ↓
dash
```

Bash służy do codziennej pracy interaktywnej. Dash wykonuje wiele skryptów systemowych zgodnych z POSIX.

## 4. Najważniejsze shelle

| Shell | Rola |
|---|---|
| `bash` | główny shell interaktywny |
| `dash` | interpreter `/bin/sh` |
| `sh` | przenośne skrypty POSIX |
| `zsh` | rozbudowany shell interaktywny |
| `fish` | wygodny shell interaktywny |
| `ksh` | klasyczny shell unixowy |
| `mksh` | lekki Korn shell |
| `tcsh` | shell z rodziny C shell |

## 5. Bash

Uruchomienie:

```sh
bash
```

Wyjście:

```sh
exit
```

Bash oferuje historię, completion, aliasy, funkcje, tablice, job control i rozbudowane skrypty.

Przykład:

```bash
for file in *.log; do
    echo "$file"
done
```

Tablica:

```bash
servers=(web db cache)
echo "${servers[0]}"
```

Warunek:

```bash
if [[ -f config.ini && -r config.ini ]]; then
    echo "OK"
fi
```

## 6. Konfiguracja Basha

Najważniejszy plik:

```text
~/.bashrc
```

Przykład:

```bash
alias ll='ls -lah'
alias grep='grep --color=auto'
export EDITOR=vim
PS1='\u@\h:\w\$ '
```

Po zmianie:

```sh
source ~/.bashrc
```

lub:

```sh
. ~/.bashrc
```

Login shell może korzystać także z:

```text
/etc/profile
~/.bash_profile
~/.bash_login
~/.profile
```

## 7. Dash

Dash jest małym i szybkim shellem zgodnym z POSIX.

Uruchomienie:

```sh
dash
```

Jeśli skrypt zaczyna się od:

```sh
#!/bin/sh
```

nie używaj bashizmów.

Nieprzenośne:

```bash
[[ -f file ]]
```

Przenośne:

```sh
[ -f file ]
```

Nieprzenośne:

```bash
array=(one two three)
```

Tablice Basha nie należą do POSIX `sh`.

## 8. `sh` w Debianie

Skrypt:

```sh
#!/bin/sh

NAME="Karol"

if [ -f /etc/passwd ]; then
    echo "$NAME"
fi
```

powinien używać tylko składni POSIX.

## 9. Zsh

Instalacja:

```sh
sudo apt install zsh
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

## 10. Fish

Instalacja:

```sh
sudo apt install fish
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

Bash:

```bash
export EDITOR=vim
```

Fish:

```fish
set -gx EDITOR vim
```

## 11. ksh i mksh

Przykładowa instalacja:

```sh
sudo apt install ksh
```

albo:

```sh
sudo apt install mksh
```

To ważne historycznie shelle unixowe, nadal spotykane w starszych środowiskach enterprise.

## 12. tcsh

Instalacja:

```sh
sudo apt install tcsh
```

Uruchomienie:

```sh
tcsh
```

Przykład:

```tcsh
setenv EDITOR vim
alias ll 'ls -lah'
```

## 13. Lista dostępnych login shelli

```sh
cat /etc/shells
```

## 14. Sprawdzanie shella

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

## 15. Uruchamianie innego shella

```sh
zsh
```

Powstaje:

```text
bash
 └── zsh
```

Powrót:

```sh
exit
```

## 16. `exec`

```sh
exec zsh
```

zastępuje bieżący shell Zsh-em.

## 17. Zmiana login shella

Bash:

```sh
chsh -s /bin/bash
```

Zsh:

```sh
chsh -s /usr/bin/zsh
```

Fish:

```sh
chsh -s /usr/bin/fish
```

## 18. Shebang

POSIX:

```sh
#!/bin/sh
```

Bash:

```bash
#!/usr/bin/env bash
```

Zsh:

```sh
#!/usr/bin/env zsh
```

## 19. Nie zmieniaj `/bin/sh`

Nie podmieniaj `/bin/sh` tylko dlatego, że wolisz Bash. Shell użytkownika i systemowy `/bin/sh` pełnią inne role.

## 20. Przekierowania i potoki

```sh
command > file
command >> file
command 2> errors.log
command > output.log 2>&1
ps aux | grep nginx
```

## 21. Zmienne

```sh
NAME="Karol"
echo "$NAME"
export EDITOR=vim
DATE=$(date)
```

## 22. Cytowanie

```sh
echo "Hello $NAME"
echo 'Hello $NAME'
echo "\$HOME"
```

Double quotes interpretują zmienne. Single quotes traktują tekst literalnie.

## 23. Globbing

Shell rozwija:

```text
*
?
[abc]
```

Przykład:

```sh
ls *.txt
```

## 24. Builtiny i programy

```sh
type cd
type ls
command -v vim
```

`cd` jest builtin-em shella.

## 25. Aliasy

```sh
alias ll='ls -lah'
alias
unalias ll
```

## 26. Funkcje

```sh
mkcd() {
    mkdir -p "$1" && cd "$1"
}
```

## 27. Historia

```sh
history
history | grep ssh
!!
```

Wyszukiwanie historii:

```text
Ctrl-R
```

## 28. Job control

```sh
sleep 1000
```

`Ctrl-Z`, a potem:

```sh
jobs
fg
bg
```

Uruchomienie w tle:

```sh
sleep 1000 &
```

## 29. Login i interactive shell

```sh
bash -l
bash -i
```

Skrypt:

```sh
./backup.sh
```

uruchamia shell nieinteraktywny.

## 30. `$PATH`

```sh
echo "$PATH"
```

Shell szuka programów kolejno w katalogach z `$PATH`.

## 31. Praktyczny wybór

Najbardziej sensowny zestaw:

```text
interaktywnie: Bash
skrypty systemowe/przenośne: POSIX sh
/bin/sh: Dash
```

Najwięcej warto nauczyć się:

```text
Bash + POSIX sh
```

## 32. Szybka ściąga

```sh
echo "$SHELL"
ps -p $$ -o comm=
cat /etc/shells
command -v bash
type cd
echo "$PATH"
```

## 33. Najważniejsza zasada

> W Debianie `/bin/sh` to nie Bash.

Jeśli piszesz:

```sh
#!/bin/sh
```

pisz zgodnie z POSIX.

Jeśli potrzebujesz funkcji Basha:

```bash
#!/usr/bin/env bash
```
