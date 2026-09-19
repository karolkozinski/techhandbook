# window-managers

## 1. Czym jest menedżer okien?

**Window Manager (WM)**, czyli menedżer okien, odpowiada przede wszystkim za:

- pozycjonowanie okien,
- zmianę ich rozmiaru,
- przełączanie między oknami,
- obsługę pulpitów/workspace’ów,
- dekoracje okien,
- skróty klawiszowe związane z oknami,
- reguły określające, gdzie konkretne aplikacje mają się pojawić.

Menedżer okien nie musi dostarczać kompletnego środowiska graficznego.

Przykładowo:

- **GNOME** to kompletne środowisko graficzne,
- **KDE Plasma** to kompletne środowisko graficzne,
- **i3** to przede wszystkim menedżer okien,
- **Sway** to menedżer okien i compositor dla Waylanda,
- **Hyprland** to compositor Wayland z funkcjami menedżera okien.

Typowy minimalny system oparty o WM może składać się z:

```text
Linux
 ├── X11 albo Wayland
 ├── window manager / compositor
 ├── terminal
 ├── launcher aplikacji
 ├── panel/status bar
 ├── notification daemon
 ├── file manager
 └── aplikacje użytkownika
```

W środowisku typu GNOME albo KDE większość tych elementów otrzymujemy jako gotową całość.

---

# 2. Window Manager vs Desktop Environment

## Window Manager

WM zajmuje się głównie oknami.

Przykłady:

```text
i3
bspwm
Openbox
Fluxbox
IceWM
AwesomeWM
XMonad
dwm
Qtile
```

## Desktop Environment

Desktop Environment dostarcza całe środowisko pracy.

Przykłady:

```text
GNOME
KDE Plasma
XFCE
LXQt
Cinnamon
MATE
```

DE zazwyczaj posiada własny menedżer okien.

Przykładowo:

| Desktop Environment | Menedżer okien / compositor |
|---|---|
| GNOME | Mutter |
| KDE Plasma | KWin |
| XFCE | Xfwm |
| Cinnamon | Muffin |
| MATE | Marco |

---

# 3. X11 i Wayland

To jedna z najważniejszych rzeczy przy wyborze WM.

## X11

Starszy, bardzo dojrzały system graficzny.

Typowe WM-y:

```text
i3
bspwm
Openbox
Fluxbox
AwesomeWM
XMonad
dwm
IceWM
Qtile
```

Zalety:

- ogromna kompatybilność,
- mnóstwo narzędzi,
- łatwa automatyzacja,
- dużo dokumentacji,
- łatwe przechwytywanie wejścia i kontrolowanie okien.

Wady:

- stara architektura,
- słabsza izolacja aplikacji,
- trudniejsza obsługa niektórych nowoczesnych funkcji,
- wielomonitorowość i skalowanie bywają mniej eleganckie.

---

## Wayland

Nowszy standard komunikacji aplikacji z compositorami.

W Waylandzie compositor przejmuje również funkcję menedżera okien.

Typowe rozwiązania:

```text
Sway
Hyprland
Wayfire
River
Labwc
KWin
Mutter
```

Zalety:

- nowocześniejsza architektura,
- lepsza izolacja aplikacji,
- dobre skalowanie HiDPI,
- lepsza obsługa nowoczesnych monitorów,
- zwykle mniejsze problemy z tearingiem.

Wady:

- część starych aplikacji działa przez XWayland,
- niektóre narzędzia z X11 mają inne odpowiedniki,
- część automatyzacji wymaga innych metod.

---

# 4. Floating vs Tiling

## Floating Window Manager

Klasyczny model znany z Windows, macOS, GNOME czy KDE.

Okna:

- nakładają się,
- można je przeciągać myszką,
- ręcznie zmieniamy ich rozmiar.

Przykłady:

```text
Openbox
Fluxbox
IceWM
Labwc
```

---

## Tiling Window Manager

Okna automatycznie dzielą ekran.

Przykład:

```text
+-------------------+-------------------+
|                   |                   |
|     Terminal      |      Browser      |
|                   |                   |
+-------------------+-------------------+
|                                       |
|                 Editor                |
|                                       |
+---------------------------------------+
```

Najpopularniejsze:

```text
i3
Sway
bspwm
AwesomeWM
XMonad
dwm
Qtile
Hyprland
River
```

Tiling jest szczególnie wygodny dla:

- programistów,
- administratorów,
- użytkowników terminala,
- pracy na wielu monitorach.

---

# 5. Dynamiczne i manualne tiling WM

Tiling może działać na różne sposoby.

## Manual tiling

Użytkownik decyduje, gdzie pojawi się kolejne okno.

Przykład:

```text
i3
Sway
```

Można określić:

```text
split horizontal
split vertical
```

---

## Dynamic tiling

WM sam układa okna według określonego algorytmu.

Przykłady:

```text
dwm
AwesomeWM
XMonad
Qtile
```

Typowe układy:

```text
master + stack
columns
grid
monocle
spiral
```

---

# 6. i3

## Charakter

i3 to jeden z najbardziej znanych tiling window managerów dla X11.

Strona projektu:

```text
i3wm.org
```

Najważniejsze cechy:

- prosty,
- stabilny,
- świetnie udokumentowany,
- konfiguracja w zwykłym pliku tekstowym,
- bardzo popularny,
- dobry jako pierwszy tiling WM.

---

## Instalacja Debian

```bash
sudo apt install i3
```

Często warto również:

```bash
sudo apt install i3status i3lock dmenu
```

---

## Konfiguracja

Najczęściej:

```text
~/.config/i3/config
```

Przykład:

```text
set $mod Mod4
```

czyli klawisz:

```text
Super
```

---

## Typowe skróty

```text
Super + Enter
```

terminal

```text
Super + D
```

launcher

```text
Super + Shift + Q
```

zamknięcie okna

```text
Super + 1
Super + 2
Super + 3
```

zmiana workspace

```text
Super + Shift + 1
```

przeniesienie okna na workspace 1.

---

## Zalety

- łatwa konfiguracja,
- bardzo dobra dokumentacja,
- ogromna społeczność,
- przewidywalne działanie,
- świetny do pracy z klawiaturą.

## Wady

- X11,
- wygląd domyślny jest bardzo surowy,
- mniej efektów niż nowoczesne compository Wayland.

---

# 7. Sway

Sway jest w dużym uproszczeniu:

> i3 dla Waylanda.

Konfiguracja jest bardzo podobna do i3.

---

## Instalacja

Debian:

```bash
sudo apt install sway
```

---

## Konfiguracja

```text
~/.config/sway/config
```

Wiele fragmentów konfiguracji i3 można przenieść prawie bez zmian.

---

## Typowy zestaw

```text
Sway
Waybar
wofi / bemenu
mako
foot
```

Gdzie:

- **Waybar** – panel,
- **wofi** – launcher,
- **mako** – powiadomienia,
- **foot** – terminal.

---

## Zalety

- Wayland,
- bardzo stabilny,
- składnia podobna do i3,
- lekki,
- świetny dla użytkowników terminala.

## Wady

- mniej efektowny niż Hyprland,
- niektóre funkcje starego ekosystemu X11 wymagają zamienników.

---

# 8. Hyprland

Hyprland jest jednym z najpopularniejszych nowoczesnych compositorów Wayland.

Łączy:

- tiling,
- floating,
- animacje,
- dynamiczne workspace,
- nowoczesną konfigurację.

---

## Charakter

Hyprland stawia mocno na:

```text
estetykę
animacje
Wayland
customizację
```

Typowy desktop może wyglądać bardzo nowocześnie.

---

## Konfiguracja

```text
~/.config/hypr/hyprland.conf
```

Przykład:

```text
bind = SUPER, RETURN, exec, kitty
bind = SUPER, Q, killactive
```

---

## Typowy zestaw

```text
Hyprland
Waybar
wofi / rofi-wayland
mako
kitty
hyprpaper
hyprlock
```

---

## Zalety

- nowoczesny Wayland,
- świetna estetyka,
- dynamiczny tiling,
- dużo możliwości konfiguracji,
- dobra obsługa wielu monitorów.

## Wady

- więcej konfiguracji niż Sway,
- szybciej się zmienia,
- czasami aktualizacja zmienia zachowanie konfiguracji.

---

# 9. bspwm

bspwm oznacza:

```text
Binary Space Partitioning Window Manager
```

Działa na X11.

Sam WM odpowiada praktycznie tylko za rozmieszczenie okien.

Skróty klawiszowe często obsługuje osobny program:

```text
sxhkd
```

---

## Architektura

```text
bspwm
   |
   +--- sxhkd
   |
   +--- polybar
   |
   +--- rofi
```

To bardzo modularne podejście.

---

## Konfiguracja

bspwm:

```text
~/.config/bspwm/bspwmrc
```

sxhkd:

```text
~/.config/sxhkd/sxhkdrc
```

---

## Zalety

- bardzo lekki,
- logiczny system tilingu,
- świetny do skryptowania,
- modularność.

## Wady

- więcej elementów trzeba skonfigurować samemu,
- X11,
- mniej przyjazny dla początkujących niż i3.

---

# 10. AwesomeWM

AwesomeWM to tiling WM dla X11.

Jedną z jego największych cech jest konfiguracja w języku:

```text
Lua
```

---

## Konfiguracja

```text
~/.config/awesome/rc.lua
```

Przykład:

```lua
awful.key({ modkey }, "Return",
    function ()
        awful.spawn("kitty")
    end)
```

---

## Zalety

- bardzo elastyczny,
- ogromne możliwości konfiguracji,
- Lua pozwala praktycznie programować desktop,
- dynamiczne layouty.

## Wady

- konfiguracja jest kodem,
- próg wejścia większy niż w i3,
- X11.

---

# 11. XMonad

XMonad jest tiling WM napisanym w:

```text
Haskell
```

Konfiguracja również jest w Haskellu.

---

## Konfiguracja

```text
~/.xmonad/xmonad.hs
```

Po zmianie konfiguracji zazwyczaj następuje jej ponowna kompilacja.

---

## Charakter

XMonad jest:

- bardzo stabilny,
- ekstremalnie konfigurowalny,
- mocno oparty o klawiaturę,
- popularny wśród zaawansowanych użytkowników.

---

## Zalety

- bardzo potężny,
- ogromne możliwości konfiguracji,
- bardzo stabilna architektura.

## Wady

- Haskell,
- wysoki próg wejścia,
- więcej pracy przy konfiguracji.

---

# 12. dwm

dwm oznacza:

```text
dynamic window manager
```

Projekt rozwijany przez społeczność suckless.

Filozofia:

```text
minimalny kod
minimalne zależności
brak zbędnych funkcji
```

---

## Najważniejsza różnica

dwm nie posiada klasycznego pliku konfiguracyjnego.

Konfigurujemy:

```text
config.h
```

a następnie kompilujemy program.

Przykład:

```bash
make
sudo make install
```

---

## Rozszerzenia

Funkcje dodaje się często poprzez:

```text
patches
```

czyli łatki do kodu źródłowego.

Przykłady:

```text
gaps
systray
autostart
fullscreen
```

---

## Zalety

- ekstremalnie lekki,
- bardzo prosty kod,
- świetny dla ludzi lubiących C,
- niezwykle szybki.

## Wady

- konfiguracja wymaga rekompilacji,
- łatki trzeba czasem ręcznie łączyć,
- X11,
- mało wygodny dla początkujących.

---

# 13. Qtile

Qtile to tiling WM napisany w Pythonie.

Konfiguracja również odbywa się w Pythonie.

---

## Konfiguracja

```text
~/.config/qtile/config.py
```

---

## Przykład

```python
Key(
    [mod],
    "Return",
    lazy.spawn("kitty")
)
```

---

## Zalety

- Python,
- łatwy do rozszerzania,
- dynamiczne layouty,
- dobry dla osób znających podstawy programowania.

## Wady

- konfiguracja jest kodem,
- mniej popularny niż i3,
- część funkcji zależy od wersji i backendu.

---

# 14. Openbox

Openbox to klasyczny floating WM.

Przez lata był bardzo popularny w lekkich dystrybucjach Linux.

---

## Charakter

Openbox przypomina klasyczny desktop:

```text
okna
menu
myszka
pulpity
```

Sam nie dostarcza pełnego środowiska.

Można dodać:

```text
tint2
picom
rofi
pcmanfm
```

---

## Konfiguracja

Najczęściej:

```text
~/.config/openbox/
```

Pliki:

```text
rc.xml
menu.xml
autostart
```

---

## Zalety

- bardzo lekki,
- stabilny,
- prosty,
- świetny dla starszych komputerów.

## Wady

- X11,
- projekt jest klasyczny i mniej nowoczesny,
- większość desktopu trzeba złożyć samemu.

---

# 15. Fluxbox

Fluxbox to klasyczny lekki floating WM dla X11.

Ma charakterystyczne:

- menu pod prawym przyciskiem myszy,
- tabowanie okien,
- minimalny interfejs.

---

## Zalety

- bardzo lekki,
- szybki,
- niewielkie wymagania,
- klasyczny unixowy styl.

## Wady

- stary ekosystem,
- X11,
- mało nowoczesnych funkcji.

---

# 16. IceWM

IceWM to lekki floating WM przypominający klasyczne systemy desktopowe.

Interfejs:

```text
panel
menu start
taskbar
tray
```

Wyglądem może przypominać:

```text
Windows 95
Windows 98
Windows XP
```

---

## Zalety

- bardzo małe wymagania,
- prosty,
- znajomy sposób obsługi,
- dobry do słabych maszyn i VM.

## Wady

- klasyczny wygląd,
- X11,
- mniej elastyczny od bardziej zaawansowanych WM.

---

# 17. Labwc

Labwc to floating compositor dla Waylanda.

Można go traktować jako duchowego następcę Openboxa.

---

## Charakter

```text
Openbox-like
Wayland
floating
minimalizm
```

Dobre rozwiązanie dla osoby, która chce:

```text
Wayland
```

ale nie chce tilingu.

---

# 18. River

River to minimalistyczny tiling compositor dla Waylanda.

Charakter:

- minimalistyczny,
- skryptowalny,
- inspirowany filozofią suckless,
- lekki.

River oddziela część logiki layoutu od samego compositora.

To rozwiązanie raczej dla bardziej technicznych użytkowników.

---

# 19. Wayfire

Wayfire to compositor Wayland inspirowany nieco Compizem.

Stawia mocno na:

```text
efekty
animacje
pluginy
```

Możliwe są m.in.:

- obracany pulpit,
- animacje okien,
- efekty 3D,
- rozszerzenia.

Nie jest typowym minimalistycznym tiling WM.

---

# 20. Enlightenment

Enlightenment jest czymś pomiędzy:

```text
window manager
```

a

```text
desktop environment
```

Oferuje:

- własny panel,
- własne widgety,
- efekty,
- zarządzanie pulpitem,
- dużą konfigurowalność.

Historycznie był znany z bardzo efektownego GUI przy relatywnie małych wymaganiach.

---

# 21. KWin

KWin jest compositor-em i window managerem KDE Plasma.

Może działać na:

```text
X11
Wayland
```

Oferuje:

- floating,
- efekty,
- skróty,
- reguły okien,
- skrypty,
- częściowe funkcje tilingu.

KWin jest bardzo rozbudowany.

Jeżeli używamy KDE Plasma, zazwyczaj nie ma potrzeby zastępować go innym WM.

---

# 22. Mutter

Mutter to compositor i window manager GNOME.

Obsługuje:

```text
Wayland
X11
```

Jest silnie zintegrowany z GNOME Shell.

Nie jest zwykle używany jako niezależny WM.

---

# 23. Xfwm

Xfwm jest menedżerem okien XFCE.

Cechy:

- floating,
- lekki,
- prosty,
- stabilny,
- klasyczne zachowanie okien.

Dobrze pasuje do lekkich desktopów.

---

# 24. Najważniejsze WM-y — porównanie

| WM | Typ | System | Konfiguracja | Trudność |
|---|---|---|---|---|
| i3 | tiling | X11 | tekst | łatwa |
| Sway | tiling | Wayland | tekst | łatwa |
| Hyprland | dynamic tiling | Wayland | tekst | średnia |
| bspwm | tiling | X11 | shell | średnia |
| AwesomeWM | dynamic tiling | X11 | Lua | średnia |
| XMonad | dynamic tiling | X11 | Haskell | trudna |
| dwm | dynamic tiling | X11 | C | trudna |
| Qtile | dynamic tiling | X11/Wayland | Python | średnia |
| Openbox | floating | X11 | XML | łatwa |
| Fluxbox | floating | X11 | tekst | łatwa |
| IceWM | floating | X11 | tekst | łatwa |
| Labwc | floating | Wayland | XML | łatwa |
| River | tiling | Wayland | skrypty | trudniejsza |
| Wayfire | floating/effects | Wayland | tekst | średnia |

---

# 25. Typowy desktop z i3

Przykładowy zestaw:

```text
i3
polybar
rofi
picom
dunst
kitty
feh
```

Funkcje:

```text
i3       → okna
polybar  → panel
rofi     → launcher
picom    → compositor
dunst    → powiadomienia
kitty    → terminal
feh      → tapeta
```

---

# 26. Typowy desktop z Sway

```text
Sway
Waybar
wofi
mako
foot
swaybg
```

---

# 27. Typowy desktop z Hyprland

```text
Hyprland
Waybar
rofi-wayland
mako
kitty
hyprpaper
hyprlock
```

---

# 28. Typowy desktop z bspwm

```text
bspwm
sxhkd
polybar
rofi
picom
dunst
kitty
```

---

# 29. Launchery

Minimalny WM często potrzebuje launchera aplikacji.

Najpopularniejsze:

## dmenu

Klasyczny minimalistyczny launcher.

```bash
dmenu_run
```

---

## rofi

Bardziej rozbudowany.

```bash
rofi -show drun
```

Może również:

- przełączać okna,
- uruchamiać skrypty,
- działać jako menu.

---

## wofi

Launcher dla Waylanda inspirowany rofi.

---

## bemenu

Minimalistyczny launcher działający zarówno w niektórych środowiskach Wayland, jak i X11.

---

# 30. Panele

## Polybar

Popularny panel dla X11.

Może pokazywać:

```text
CPU
RAM
sieć
workspace
zegarek
temperaturę
baterię
```

---

## Waybar

Popularny panel dla Waylanda.

Często używany z:

```text
Sway
Hyprland
River
```

---

## tint2

Lekki klasyczny panel dla X11.

Często używany z Openboxem.

---

# 31. Powiadomienia

Minimalny WM zazwyczaj potrzebuje osobnego notification daemon.

X11:

```text
dunst
```

Wayland:

```text
mako
dunst
```

---

# 32. Tapeta

X11:

```text
feh
nitrogen
```

Wayland:

```text
swaybg
hyprpaper
swww
```

---

# 33. Blokowanie ekranu

X11:

```text
i3lock
betterlockscreen
```

Wayland:

```text
swaylock
hyprlock
```

---

# 34. Compositor w X11

W X11 window manager i compositor mogą być osobnymi programami.

Popularny compositor:

```text
picom
```

Zapewnia m.in.:

- przezroczystość,
- cienie,
- animacje,
- ograniczenie tearingu.

Przykład:

```bash
picom &
```

W Waylandzie compositor jest integralnym elementem środowiska.

---

# 35. Workspace

Workspace to wirtualny pulpit.

Przykład:

```text
1 → terminal
2 → przeglądarka
3 → VS Code
4 → komunikatory
5 → multimedia
```

W tiling WM korzystanie z workspace’ów jest bardzo naturalne.

Przykładowo i3:

```text
Super + 1
Super + 2
Super + 3
```

---

# 36. Scratchpad

Niektóre WM pozwalają ukrywać okno w specjalnym obszarze.

Przykład:

```text
terminal
```

można schować i wywołać skrótem.

i3 posiada:

```text
scratchpad
```

Przykład:

```text
Super + minus
```

może wywoływać terminal podręczny.

---

# 37. Reguły okien

Zaawansowane WM pozwalają definiować reguły.

Przykład:

```text
Firefox → workspace 2
VS Code → workspace 3
Discord → workspace 4
```

W i3:

```text
assign [class="Firefox"] workspace 2
```

Takie reguły mogą bardzo przyspieszyć start środowiska pracy.

---

# 38. Autostart

Minimalny WM nie zawsze posiada rozbudowany system autostartu.

Przykład i3:

```text
exec --no-startup-id dunst
exec --no-startup-id picom
exec --no-startup-id nm-applet
```

---

# 39. Terminal

Najczęściej używane terminale:

```text
kitty
Alacritty
foot
wezterm
xterm
```

Wayland:

```text
foot
kitty
wezterm
```

X11:

```text
kitty
Alacritty
wezterm
xterm
```

---

# 40. Menedżer plików

Minimalny WM nie dostarcza zwykle file managera.

Popularne:

```text
Thunar
PCManFM
Nemo
Dolphin
```

Terminalowe:

```text
mc
ranger
lf
nnn
```

---

# 41. Network Manager

Przy minimalistycznym desktopie można używać:

```text
nm-applet
```

lub terminalowo:

```bash
nmcli
```

Przykład:

```bash
nmcli device wifi list
```

---

# 42. Bluetooth

GUI:

```text
blueman
```

CLI:

```bash
bluetoothctl
```

---

# 43. Audio

Współczesny Linux często używa:

```text
PipeWire
```

GUI:

```text
pavucontrol
```

CLI:

```text
wpctl
```

Przykład:

```bash
wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+
```

---

# 44. Sterowanie jasnością

Popularne narzędzie:

```text
brightnessctl
```

Przykład:

```bash
brightnessctl set +10%
```

---

# 45. Screenshoty

X11:

```text
scrot
maim
flameshot
```

Wayland:

```text
grim
slurp
grimshot
```

Przykład:

```bash
grim screenshot.png
```

---

# 46. Clipboard

X11:

```text
xclip
xsel
```

Wayland:

```text
wl-copy
wl-paste
```

Przykład:

```bash
echo "tekst" | wl-copy
```

---

# 47. Menedżery logowania

WM można uruchomić z display managera.

Popularne:

```text
GDM
SDDM
LightDM
```

Po instalacji WM zwykle pojawia się jako dodatkowa sesja na ekranie logowania.

Przykładowo można mieć jednocześnie:

```text
GNOME
KDE Plasma
i3
Sway
```

i wybierać środowisko przy logowaniu.

---

# 48. Uruchamianie WM bez display managera

Można logować się w konsoli:

```text
tty
```

i uruchamiać sesję ręcznie.

Dla X11 historycznie:

```bash
startx
```

Konfiguracja:

```text
~/.xinitrc
```

Przykład:

```bash
exec i3
```

---

# 49. Tiling WM na wielu monitorach

Tiling WM świetnie współpracują z wieloma monitorami.

Można przypisać workspace:

```text
Monitor 1:
1 2 3 4 5

Monitor 2:
6 7 8 9 10
```

Przykład i3:

```text
workspace 1 output DP-1
workspace 6 output HDMI-1
```

---

# 50. Minimalizm i zużycie RAM

Orientacyjnie lekkie WM zużywają bardzo mało pamięci.

Sam WM może zużywać:

```text
kilkanaście–kilkadziesiąt MB RAM
```

Ale cały desktop zależy od:

- panelu,
- terminala,
- daemonów,
- NetworkManagera,
- przeglądarki,
- aplikacji.

Różnica między 200 MB a 500 MB desktopu zwykle nie ma większego znaczenia na współczesnym komputerze.

Największym konsumentem RAM zazwyczaj i tak będzie:

```text
przeglądarka
IDE
Electron
```

---

# 51. Co wybrać?

## Chcesz najprościej poznać tiling

```text
i3
```

Bardzo dobry pierwszy WM.

---

## Chcesz i3, ale Wayland

```text
Sway
```

---

## Chcesz nowoczesny wygląd i animacje

```text
Hyprland
```

---

## Chcesz maksymalnej modularności

```text
bspwm
```

---

## Chcesz konfigurować desktop w Pythonie

```text
Qtile
```

---

## Chcesz konfigurować desktop w Lua

```text
AwesomeWM
```

---

## Chcesz bardzo zaawansowanej konfiguracji

```text
XMonad
```

---

## Chcesz ekstremalnego minimalizmu

```text
dwm
```

---

## Chcesz klasyczne okna bez tilingu

X11:

```text
Openbox
```

Wayland:

```text
Labwc
```

---

# 52. Dobry zestaw do nauki

Jeżeli chcemy poznać różne filozofie działania WM, warto przetestować kolejno:

```text
Openbox
i3
Sway
Hyprland
dwm
```

Pozwoli to zobaczyć:

```text
floating
tiling
Wayland
dynamic tiling
suckless
```

---

# 53. Propozycja dla Debiana

Jeżeli Debian służy jako normalny desktop, rozsądny układ to:

```text
GNOME lub KDE jako środowisko podstawowe
+
i3 albo Sway jako środowisko eksperymentalne
```

Przy logowaniu wybieramy sesję.

Dzięki temu można uczyć się WM bez rozwalania działającego desktopu.

---

# 54. Najważniejsze pliki konfiguracyjne

| Program | Konfiguracja |
|---|---|
| i3 | `~/.config/i3/config` |
| Sway | `~/.config/sway/config` |
| Hyprland | `~/.config/hypr/hyprland.conf` |
| bspwm | `~/.config/bspwm/bspwmrc` |
| sxhkd | `~/.config/sxhkd/sxhkdrc` |
| AwesomeWM | `~/.config/awesome/rc.lua` |
| XMonad | `~/.xmonad/xmonad.hs` |
| dwm | `config.h` |
| Qtile | `~/.config/qtile/config.py` |
| Waybar | `~/.config/waybar/` |
| Polybar | `~/.config/polybar/` |
| rofi | `~/.config/rofi/` |
| dunst | `~/.config/dunst/dunstrc` |

---

# 55. Przydatne pojęcia

## WM

Window Manager.

Zarządza oknami.

## Compositor

Program odpowiadający za finalne składanie obrazu ekranu.

## DE

Desktop Environment.

Kompletne środowisko graficzne.

## Tiling

Automatyczne układanie okien.

## Floating

Klasyczne swobodne okna.

## Workspace

Wirtualny pulpit.

## Launcher

Program do uruchamiania aplikacji.

## Status bar

Panel pokazujący informacje systemowe.

## Scratchpad

Ukrywane okno podręczne.

## X11

Starszy system graficzny Linux/Unix.

## Wayland

Nowoczesny protokół graficzny.

## XWayland

Warstwa pozwalająca uruchamiać aplikacje X11 w środowisku Wayland.

---

# 56. Ściąga

```text
KLASYCZNY DESKTOP

Openbox
Fluxbox
IceWM
Labwc


TILING

i3
Sway
bspwm


DYNAMIC TILING

Hyprland
AwesomeWM
XMonad
dwm
Qtile
River


WAYLAND

Sway
Hyprland
River
Wayfire
Labwc


X11

i3
bspwm
AwesomeWM
XMonad
dwm
Openbox
Fluxbox
IceWM


NAJŁATWIEJSZY START

i3


NAJLEPSZY ODPOWIEDNIK i3 NA WAYLAND

Sway


NOWOCZESNY I EFEKTOWNY

Hyprland


MINIMALISTYCZNY

dwm


PROGRAMOWALNY W PYTHONIE

Qtile


PROGRAMOWALNY W LUA

AwesomeWM


PROGRAMOWALNY W HASKELLU

XMonad


KLASYCZNY FLOATING NA WAYLAND

Labwc
```

---

# 57. Najważniejsza rzecz do zapamiętania

Menedżer okien nie musi być całym pulpitem.

Minimalne środowisko można zbudować samemu:

```text
WM/compositor
+
panel
+
launcher
+
terminal
+
powiadomienia
+
blokada ekranu
+
narzędzia systemowe
```

To właśnie dlatego środowiska oparte o:

```text
i3
Sway
Hyprland
bspwm
dwm
```

mogą wyglądać i działać zupełnie inaczej u dwóch użytkowników.

Każdy z nich składa swój desktop z własnego zestawu komponentów.

---

# 58. Praktyczna rekomendacja do nauki

Dla osoby, która chce **rozumieć Linuxa**, a nie tylko używać gotowego desktopu, bardzo dobrym zestawem edukacyjnym jest:

```text
KDE/GNOME
    ↓
i3
    ↓
Sway
    ↓
Hyprland
    ↓
dwm lub bspwm
```

Każdy etap pokazuje kolejny poziom kontroli nad środowiskiem:

```text
gotowy desktop
→ konfiguracja WM
→ Wayland
→ compositor
→ samodzielne składanie całego desktopu
```

Po takim przejściu architektura graficznego Linuxa staje się znacznie bardziej zrozumiała.
