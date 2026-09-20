---
id: "doc-038"
title: "Vi, Vim, gVim i Neovim"
slug: "vi-vim-gvim-i-neovim"
description: "Vi, Vim, gVim i Neovim — praktyczne kompendium TechHandbook."
lang: "pl"
audience: "standard"
published: "2026-09-19"
updated: "2026-09-19"
tags:
  - "vi"
  - "vim"
  - "gvim"
  - "neovim"
  - "editor"
---

# Vi, Vim, gVim i Neovim

## 1. Co masz zainstalowane

Na tym Debianie:

```text
vi   -> /usr/bin/vim.tiny
vim  -> /usr/bin/vim.gtk3
gvim -> /usr/bin/gvim
nvim -> Neovim 0.12.4
```

To daje cztery warianty tej samej rodziny edytorów.

---

## 2. Czego używać i kiedy

### `vi`

Uruchomienie:

```bash
vi plik.conf
```

U Ciebie `vi` wskazuje na `vim.tiny`, czyli małą, ograniczoną wersję Vima.

Używaj go przede wszystkim jako:

- treningu bazowego `vi`,
- edytora awaryjnego,
- przygotowania do pracy na minimalnych systemach,
- sposobu na poprawienie configu przez SSH,
- wspólnego mianownika dla świata Unix/Linux.

To nie jest oryginalny historyczny `vi`, lecz zachowuje jego podstawowy model pracy.

### `vim`

Uruchomienie:

```bash
vim plik.txt
```

Pełny Vim działający w terminalu.

W porównaniu z `vi` dostajesz m.in.:

- lepsze kolorowanie składni,
- więcej opcji,
- więcej komend,
- bufory,
- splity,
- taby,
- makra,
- pluginy,
- rozbudowaną konfigurację.

Do normalnej pracy w CLI jest wygodniejszy od minimalnego `vi`.

### `gvim`

Uruchomienie:

```bash
gvim plik.txt
```

To pełny Vim w graficznym oknie.

Dostajesz:

- normalne okno GTK,
- obsługę myszy,
- integrację ze schowkiem systemowym,
- menu,
- łatwiejsze korzystanie na GNOME/KDE.

Wewnątrz nadal jest to Vim i obowiązuje ten sam model:

```text
NORMAL -> INSERT -> NORMAL
```

oraz te same komendy typu:

```text
i
Esc
dd
:w
:wq
```

### `nvim`

Uruchomienie:

```bash
nvim plik.txt
```

Neovim to nowoczesny fork Vima.

Podstawowa obsługa pliku jest praktycznie taka sama jak w Vimie:

```text
i
Esc
dd
yy
p
:w
:q
/
```

Największe różnice pojawiają się później:

- nowocześniejsza architektura,
- Lua do konfiguracji,
- LSP,
- Tree-sitter,
- współczesny ekosystem pluginów,
- łatwiejsze budowanie terminalowego IDE.

Do prostego edytowania configu różnica między Vimem a Neovimem jest niewielka.

---

# 3. Najważniejsza rzecz: tryby

Edytory z rodziny `vi` są modalne.

Po uruchomieniu pliku jesteś zwykle w trybie:

```text
NORMAL
```

W nim klawisze są poleceniami.

Aby zacząć pisać:

```text
i
```

Przechodzisz do:

```text
INSERT
```

Aby wrócić:

```text
Esc
```

Podstawowy rytm pracy:

```text
NORMAL
  |
  | i
  v
INSERT
  |
  | Esc
  v
NORMAL
```

Jeżeli nie wiesz, w jakim jesteś trybie:

```text
Esc
```

To najbezpieczniejszy odruch.

---

# 4. Otwieranie plików

```bash
vi plik.txt
vim plik.txt
gvim plik.txt
nvim plik.txt
```

Plik systemowy:

```bash
sudo vi /etc/example.conf
```

Nowy plik:

```bash
vim nowy.txt
```

Jeśli nie istnieje, zostanie utworzony przy zapisie.

---

# 5. Zapis i wyjście

Najważniejsze polecenia:

```text
:w
```

zapisz plik.

```text
:q
```

wyjdź.

```text
:wq
```

zapisz i wyjdź.

```text
:q!
```

wyjdź bez zapisywania zmian.

Najbezpieczniejszy schemat:

```text
Esc
:wq
Enter
```

Jeśli zrobiłeś bałagan i chcesz porzucić wszystko:

```text
Esc
:q!
Enter
```

Alternatywnie:

```text
ZZ
```

w trybie NORMAL zapisuje plik i wychodzi.

Do nauki lepiej jednak używać:

```text
:wq
```

---

# 6. Wchodzenie w tryb pisania

## `i`

```text
i
```

Insert — pisz przed kursorem.

## `a`

```text
a
```

Append — pisz za kursorem.

## `I`

```text
I
```

Pisz od początku tekstu w bieżącej linii.

## `A`

```text
A
```

Pisz na końcu bieżącej linii.

## `o`

```text
o
```

Utwórz nową linię poniżej i zacznij pisać.

## `O`

```text
O
```

Utwórz nową linię powyżej i zacznij pisać.

Najbardziej praktyczne na początku:

```text
i
a
o
O
```

---

# 7. Poruszanie kursorem

Możesz używać strzałek.

Klasyczne sterowanie `vi`:

```text
h   lewo
j   dół
k   góra
l   prawo
```

Przydatniejsze ruchy:

```text
w   następne słowo
b   poprzednie słowo
e   koniec słowa
```

Początek i koniec linii:

```text
0   początek linii
^   pierwszy niepusty znak linii
$   koniec linii
```

Początek i koniec pliku:

```text
gg  początek pliku
G   koniec pliku
```

Konkretny numer linii:

```text
50G
```

przejdź do linii 50.

W Vimie i Neovimie możesz również:

```text
:50
```

---

# 8. Przewijanie

```text
Ctrl-f   ekran w dół
Ctrl-b   ekran w górę
Ctrl-d   pół ekranu w dół
Ctrl-u   pół ekranu w górę
```

Na początku możesz zwyczajnie używać Page Up / Page Down, jeśli terminal poprawnie je obsługuje.

---

# 9. Usuwanie

Usuń znak pod kursorem:

```text
x
```

Usuń całą linię:

```text
dd
```

Usuń kilka linii:

```text
3dd
```

Usuń słowo:

```text
dw
```

Usuń od kursora do końca linii:

```text
d$
```

Ważna zasada:

```text
d + ruch
```

czyli:

```text
dw   delete word
d$   delete to end of line
```

---

# 10. Cofanie i ponawianie

Cofnij:

```text
u
```

Ponów:

```text
Ctrl-r
```

W minimalnym `vi` / `vim.tiny` nie wszystkie zaawansowane mechanizmy undo muszą być tak rozbudowane jak w pełnym Vimie lub Neovimie.

---

# 11. Zmiana istniejącego tekstu

Zmiana słowa:

```text
cw
```

Vim usuwa fragment i automatycznie przechodzi do INSERT.

Zmiana całej linii:

```text
cc
```

Zmiana od kursora do końca linii:

```text
C
```

Zastąp pojedynczy znak:

```text
r
```

Przykład:

```text
rX
```

zamieni znak pod kursorem na `X`.

---

# 12. Kopiowanie i wklejanie

W terminologii Vima kopiowanie to `yank`.

Kopiuj linię:

```text
yy
```

Wklej:

```text
p
```

Wklej przed kursorem:

```text
P
```

Kopiuj słowo:

```text
yw
```

Kopiuj kilka linii:

```text
3yy
```

Usuń linię i wklej ją gdzie indziej:

```text
dd
```

przejdź w inne miejsce:

```text
p
```

W Vimie usuwanie również trafia do rejestru, dlatego `dd` + `p` działa jak wytnij/wklej.

---

# 13. Wyszukiwanie

Szukaj w dół:

```text
/tekst
```

potem:

```text
Enter
```

Następny wynik:

```text
n
```

Poprzedni wynik:

```text
N
```

Szukaj w górę:

```text
?tekst
```

Przykład:

```text
/PermitRootLogin
```

Bardzo przydatne w długich configach.

---

# 14. Zamiana tekstu

Zamiana pierwszego wystąpienia w bieżącej linii:

```text
:s/stare/nowe/
```

Wszystkie wystąpienia w bieżącej linii:

```text
:s/stare/nowe/g
```

W całym pliku:

```text
:%s/stare/nowe/g
```

Z potwierdzeniem każdej zamiany:

```text
:%s/stare/nowe/gc
```

To działa w pełnym Vimie i Neovimie.

W minimalnym `vim.tiny` część bardziej zaawansowanych możliwości może być ograniczona.

---

# 15. Liczby przed komendami

Wiele poleceń można poprzedzić liczbą.

Przykłady:

```text
5j
```

pięć linii w dół.

```text
3w
```

trzy słowa naprzód.

```text
4dd
```

usuń cztery linie.

```text
10x
```

usuń dziesięć znaków.

To jeden z najbardziej użytecznych mechanizmów `vi`.

---

# 16. Tryb VISUAL

Pełny Vim i Neovim mają tryb zaznaczania.

```text
v
```

zaznaczaj znakami.

```text
V
```

zaznaczaj całymi liniami.

Potem:

```text
d   usuń
y   kopiuj
c   zmień
```

Przykład:

```text
V
j
j
d
```

zaznaczy kilka linii i je usunie.

`vim.tiny` może mieć bardziej ograniczony zestaw funkcji niż pełny Vim.

---

# 17. Powtarzanie ostatniej zmiany

W Vimie i Neovimie:

```text
.
```

powtarza ostatnią zmianę.

Przykład:

- zmieniłeś jedno słowo,
- przechodzisz do kolejnego podobnego miejsca,
- naciskasz `.`.

To bardzo charakterystyczna i potężna funkcja Vima.

---

# 18. Praca z nawiasami

Skok między pasującymi nawiasami:

```text
%
```

Działa m.in. dla:

```text
()
[]
{}
```

Przydatne w kodzie i plikach konfiguracyjnych.

---

# 19. Operacje „wewnątrz” elementu

To jest już bardziej Vim niż klasyczne minimum `vi`.

Przykład:

```text
ci"
```

change inside quotes.

Masz:

```text
name="old"
```

ustawiasz kursor wewnątrz `old`:

```text
ci"
```

i wpisujesz nową wartość.

Podobnie:

```text
ci(
ci[
ci{
```

Usuń wnętrze:

```text
di"
di(
di[
di{
```

Bardzo wygodne w Vimie i Neovimie.

---

# 20. Kilka plików

## Vim / Neovim

Otwórz inny plik:

```text
:e plik.txt
```

Lista buforów:

```text
:ls
```

Następny bufor:

```text
:bn
```

Poprzedni:

```text
:bp
```

## gVim

To samo działa w GUI.

## vi / vim.tiny

Do prostych operacji lepiej traktować go jako edytor jednego pliku.

---

# 21. Splity

Pełny Vim / gVim / Neovim:

Poziomy:

```text
:split plik.txt
```

krócej:

```text
:sp plik.txt
```

Pionowy:

```text
:vsplit plik.txt
```

krócej:

```text
:vsp plik.txt
```

Przełączanie między oknami:

```text
Ctrl-w h
Ctrl-w j
Ctrl-w k
Ctrl-w l
```

---

# 22. Tab-y

Pełny Vim / gVim / Neovim:

Nowy tab:

```text
:tabnew
```

Otwórz plik w tabie:

```text
:tabedit plik.txt
```

Następny tab:

```text
gt
```

Poprzedni:

```text
gT
```

W Vimie tab nie jest dokładnie tym samym, czym tab w Sublime czy przeglądarce. Jest raczej zestawem okien.

---

# 23. Uruchamianie poleceń shella

Pełny Vim / Neovim:

```text
:!ls
```

```text
:!git status
```

```text
:!make
```

```text
:!go test ./...
```

Powrót następuje po zakończeniu komendy.

Można również uruchomić shell:

```text
:shell
```

Powrót:

```bash
exit
```

---

# 24. Numery linii

W Vimie / gVim / Neovim:

```text
:set number
```

Wyłącz:

```text
:set nonumber
```

Numery względne:

```text
:set relativenumber
```

Przydatne do poleceń takich jak:

```text
5j
3dd
```

---

# 25. Kolorowanie składni

Pełny Vim:

```text
:syntax on
```

Neovim domyślnie zapewnia nowoczesne mechanizmy highlightingu i może być dodatkowo rozbudowany przez Tree-sitter.

`gvim` korzysta z tego samego mechanizmu co Vim, tylko renderuje go w GUI.

`vim.tiny` ma mniej funkcji niż pełny Vim.

---

# 26. Schowek systemowy

To ważne przy GUI.

## gVim

Najwygodniejszy z całej rodziny Vima pod kątem klasycznego desktopowego schowka.

## pełny Vim

Jeśli build ma obsługę clipboardu:

```text
"+y
```

kopiuje do schowka systemowego.

```text
"+p
```

wkleja ze schowka systemowego.

Sprawdzenie:

```bash
vim --version | grep clipboard
```

## Neovim

Potrafi integrować się ze schowkiem systemowym, ale w środowisku Wayland/X11 może wymagać odpowiedniego programu pomocniczego, np. `wl-clipboard`.

## vi / vim.tiny

Nie traktuj go jako narzędzia do wygodnej pracy ze schowkiem GUI.

---

# 27. Konfiguracja

## vi / vim.tiny

Do treningu nie konfiguruj.

Ma przypominać środowisko minimalne.

## Vim / gVim

Główny config:

```text
~/.vimrc
```

Przykład:

```vim
set number
set tabstop=4
set shiftwidth=4
set expandtab
syntax on
```

gVim może dodatkowo używać:

```text
~/.gvimrc
```

## Neovim

Nowoczesny config:

```text
~/.config/nvim/init.lua
```

lub starszy styl:

```text
~/.config/nvim/init.vim
```

Przykład Lua:

```lua
vim.opt.number = true
vim.opt.tabstop = 4
vim.opt.shiftwidth = 4
vim.opt.expandtab = true
```

---

# 28. Najważniejsze różnice

| Funkcja | vi / vim.tiny | Vim | gVim | Neovim |
|---|---:|---:|---:|---:|
| Terminal | tak | tak | nie jako główny tryb | tak |
| GUI | nie | nie | tak | przez osobne frontend-y |
| Tryby vi | tak | tak | tak | tak |
| Podstawowe komendy vi | tak | tak | tak | tak |
| Syntax highlighting | ograniczony | tak | tak | tak |
| Bufory | ograniczone | tak | tak | tak |
| Splity | ograniczone | tak | tak | tak |
| Taby | ograniczone | tak | tak | tak |
| Pluginy | praktycznie nie | tak | tak | tak |
| Lua | nie | nie jako główny model | nie jako główny model | tak |
| LSP | nie | pluginy | pluginy | nowoczesna integracja |
| Tree-sitter | nie | nie jako rdzeń | nie jako rdzeń | tak / integracja |
| Najlepsze zastosowanie | awaria / minimum | pełny CLI | desktop GUI | nowoczesny CLI/IDE |

---

# 29. Co warto znać absolutnie na pamięć

Jeżeli masz znać tylko minimum do pracy z configiem:

```text
i       pisz
a       pisz za kursorem
o       nowa linia poniżej
O       nowa linia powyżej

Esc     wróć do NORMAL

h       lewo
j       dół
k       góra
l       prawo

0       początek linii
$       koniec linii
gg      początek pliku
G       koniec pliku

x       usuń znak
dd      usuń linię
u       cofnij

/tekst  szukaj
n       następny wynik

:w      zapisz
:q      wyjdź
:wq     zapisz i wyjdź
:q!     wyjdź bez zapisu
```

---

# 30. Minimum trochę wygodniejsze

Kiedy podstawy wejdą w ręce, dodaj:

```text
w       następne słowo
b       poprzednie słowo
dw      usuń słowo
cw      zmień słowo
yy      kopiuj linię
p       wklej
Ctrl-r  redo
.       powtórz zmianę
```

To już wystarcza do bardzo sprawnej edycji configów.

---

# 31. Typowy scenariusz edycji configu

Otwierasz:

```bash
sudo vi /etc/example.conf
```

Szukasz:

```text
/hostname
Enter
```

Przechodzisz do odpowiedniego miejsca.

Edytujesz:

```text
i
```

lub:

```text
cw
```

Po zmianie:

```text
Esc
```

Zapisujesz:

```text
:w
Enter
```

Jeśli wszystko jest OK:

```text
:q
Enter
```

albo od razu:

```text
:wq
Enter
```

Jeśli coś poszło źle:

```text
:q!
Enter
```

---

# 32. Najważniejszy model mentalny

Nie myśl:

```text
Vim = dziwny Notatnik
```

Lepiej:

```text
NORMAL = wydaję polecenia
INSERT = wpisuję tekst
```

Typowa operacja:

```text
i
tekst
Esc
:wq
```

Po kilku dniach `Esc` zaczyna działać automatycznie.

---

# 33. Którego używać na co

Na obcym/minimalnym systemie:

```bash
vi
```

Na swoim Debianie w CLI:

```bash
nvim
```

lub:

```bash
vim
```

Jeżeli chcesz klasycznego Vima w GUI:

```bash
gvim
```

Jeżeli chcesz rozwijać własne nowoczesne środowisko programistyczne:

```bash
nvim
```

Dobra praktyka:

```text
naucz się języka vi
używaj narzędzia, które jest najwygodniejsze
```

Dzięki temu potrafisz pracować zarówno na gołym FreeBSD przez SSH, jak i w pełnym środowisku desktopowym.

---

# 34. Ściąga końcowa

```text
TRYBY
i       INSERT
Esc     NORMAL

RUCH
h j k l
w b
0 $
gg G

EDYCJA
x       usuń znak
dd      usuń linię
dw      usuń słowo
cw      zmień słowo
yy      kopiuj linię
p       wklej
u       undo
Ctrl-r  redo

SZUKANIE
/tekst
n
N

ZAPIS
:w
:q
:wq
:q!

PRZYDATNE
o       nowa linia poniżej
O       nowa linia powyżej
.       powtórz zmianę
%       pasujący nawias

PEŁNY VIM / NVIM
:e plik
:ls
:bn
:bp
:sp plik
:vsp plik
:tabedit plik
:!polecenie
```

Najważniejsze dwa zestawy ratunkowe:

```text
Esc
:wq
Enter
```

oraz:

```text
Esc
:q!
Enter
```
