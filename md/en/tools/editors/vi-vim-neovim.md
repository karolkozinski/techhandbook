# vi / Vim / gVim / Neovim — Short Text Editing Handbook
## 1. What you have installed
`vi` may be vim.tiny or another implementation; `vim` is full terminal Vim; `gvim` is graphical Vim; `nvim` is Neovim.
## 2. What to use and when
### `vi`
Emergency/minimal editor available on many Unix systems.
### `vim`
Full-featured terminal editor with broad compatibility.
### `gvim`
Graphical Vim with menus and system clipboard integration.
### `nvim`
Modern Vim-compatible editor with Lua config and active plugin ecosystem.
# 3. Most important concept: modes
Normal = commands/navigation, Insert = typing, Visual = selection, Command-line = `:` commands.
# 4. Opening files
```text
vim file
nvim file
vi /etc/hosts
```
# 5. Save and quit
```text
:w
:q
:wq
:q!
:x
```
# 6. Entering insert mode
## `i`
insert before cursor.
## `a`
append after cursor.
## `I`
insert at first non-blank character.
## `A`
append at end of line.
## `o`
open line below.
## `O`
open line above.
# 7. Moving the cursor
```text
h left
j down
k up
l right
w next word
b previous word
0 line start
$ line end
gg file start
G file end
```
# 8. Scrolling
```text
Ctrl+f page forward
Ctrl+b page backward
Ctrl+d half-page down
Ctrl+u half-page up
```
# 9. Deleting
```text
x character
dd line
dw word
d$ to line end
```
# 10. Undo and redo
```text
u undo
Ctrl+r redo
```
# 11. Changing existing text
```text
cw change word
cc change line
C change to line end
r replace one character
```
# 12. Copy and paste
```text
yy yank line
yw yank word
p paste after
P paste before
```
# 13. Search
```text
/text
?text
n next
N previous
```
# 14. Replace text
```text
:s/old/new/
 :%s/old/new/g
:%s/old/new/gc
```
# 15. Numbers before commands
Prefix commands with counts: `5j`, `3dd`, `10w`.
# 16. VISUAL mode
```text
v character selection
V line selection
Ctrl+v block selection
```
# 17. Repeat last change
```text
.
```
# 18. Working with brackets
```text
% jump between matching (), {}, []
```
# 19. Operations “inside” an element
```text
ciw change inner word
di" delete inside quotes
ci( change inside parentheses
```
# 20. Multiple files
## Vim / Neovim
```text
:e file
:next
:previous
:buffers
:buffer N
```
## gVim
Same Vim commands plus GUI menus/tabs/clipboard.
## vi / vim.tiny
May lack some buffer/window features depending on build.
# 21. Splits
```text
:split file
:vsplit file
Ctrl+w h/j/k/l
```
# 22. Tabs
```text
:tabnew file
:tabnext
:tabprevious
```
# 23. Running shell commands
```text
:!ls
:!git status
```
# 24. Line numbers
```text
:set number
:set relativenumber
```
# 25. Syntax highlighting
```text
:syntax on
```
# 26. System clipboard
## gVim
Usually built with clipboard support.
## full Vim
Check `vim --version | grep clipboard`; use `"+y`/`"+p` if available.
## Neovim
Uses clipboard providers such as xclip/xsel/wl-clipboard depending environment.
## vi / vim.tiny
Usually no system clipboard integration.
# 27. Configuration
## vi / vim.tiny
Minimal/no advanced user config depending implementation.
## Vim / gVim
Use `~/.vimrc`.
## Neovim
Use `~/.config/nvim/init.lua` or init.vim.
# 28. Most important differences
vim.tiny is minimal; Vim is classic full editor; gVim adds GUI; Neovim modernizes internals/config/plugins.
# 29. What to memorize absolutely
```text
Esc
i
h j k l
w b
dd
yy
p
u
/text
:w
:q
:wq
:q!
```
# 30. Slightly more comfortable minimum
```text
gg G
0 $
cw ciw
V
Ctrl+v
n N
.
:%s/old/new/gc
```
# 31. Typical config-edit scenario
Open file → search → navigate → `i`/`cw` → Esc → review → `:w` → run syntax check in shell → quit.
# 32. Most important mental model
Normal mode is the command language; Insert mode is only for entering text.
# 33. Which one to use for what
Emergency remote edit: vi. Daily terminal editing: Vim/Neovim. GUI preference: gVim. Modern extensible setup: Neovim.
# 34. Final cheat sheet
```text
open: nvim file
insert: i
save: :w
quit: :q
force quit: :q!
search: /text
delete line: dd
copy line: yy
paste: p
undo: u
replace all: :%s/a/b/g
```
