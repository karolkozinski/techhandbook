# vi / Vim / gVim / Neovim — Practical Text Editing Handbook

## 1. What these programs are

`vi` is the classic Unix editor interface.

`Vim` is a much richer vi-compatible editor.

`gVim` is Vim with a graphical interface.

`Neovim` is a modern Vim-family editor focused on extensibility, Lua configuration and editor integrations.

## 2. What to use and when

### vi

Use when you are on a minimal or remote system and only need basic editing.

### Vim

Use when you want a mature terminal editor with powerful text operations and wide availability.

### gVim

Use when you like Vim editing but want menus, GUI clipboard integration and a separate graphical window.

### Neovim

Use when you want modern plugins, LSP integration, Lua configuration and a richer development environment.

## 3. The most important concept: modes

Normal mode:
navigation and commands.

Insert mode:
typing text.

Visual mode:
selecting text.

Command-line mode:
commands such as save, quit and substitutions.

Return to Normal mode with:

```text
Esc
```

## 4. Opening files

```bash
vi file.txt
vim file.txt
gvim file.txt
nvim file.txt
```

Open several files:

```bash
vim file1 file2
```

## 5. Save and quit

```vim
:w
:q
:wq
:x
:q!
```

Save as:

```vim
:w newname.txt
```

## 6. Entering Insert mode

```text
i  insert before cursor
a  append after cursor
I  insert at first non-blank character
A  append at end of line
o  open line below
O  open line above
```

## 7. Moving the cursor

```text
h left
j down
k up
l right
w next word
b previous word
e end of word
0 start of line
^ first non-blank
$ end of line
gg first line
G last line
42G line 42
```

## 8. Scrolling

```text
Ctrl+f page forward
Ctrl+b page backward
Ctrl+d half-page down
Ctrl+u half-page up
zz center current line
```

## 9. Deleting

```text
x   delete character
dd  delete line
dw  delete word
d$  delete to end of line
D   same idea as d$
```

Deleted text usually goes into a register and can be pasted.

## 10. Undo and redo

```text
u       undo
Ctrl+r  redo
```

## 11. Changing text

```text
cw   change word
cc   change line
c$   change to end of line
rX   replace one character with X
R    replace mode
```

## 12. Copy and paste

```text
yy  yank line
yw  yank word
p   paste after
P   paste before
```

## 13. Search

Forward:

```vim
/pattern
```

Backward:

```vim
?pattern
```

Then:

```text
n next
N previous
```

## 14. Replace text

Current line:

```vim
:s/old/new/g
```

Whole file:

```vim
:%s/old/new/g
```

Confirm each replacement:

```vim
:%s/old/new/gc
```

## 15. Numbers before commands

Commands can be repeated:

```text
5j
3dd
10w
```

This is central to Vim's command language.

## 16. Visual mode

```text
v       character-wise
V       line-wise
Ctrl+v  block-wise
```

After selection, use operators such as `d`, `y`, `c` or indentation commands.

## 17. Repeat the last change

```text
.
```

One of the most useful Vim commands.

## 18. Matching brackets

```text
%
```

Jump between matching parentheses/brackets/braces where recognized.

## 19. Text objects

Examples:

```text
ciw   change inner word
di"   delete inside quotes
ci(   change inside parentheses
da{   delete around braces
```

Text objects are one of Vim's biggest productivity features.

## 20. Multiple files

Buffer list:

```vim
:ls
```

Next/previous buffer:

```vim
:bn
:bp
```

Open another file:

```vim
:e file.txt
```

## 21. Splits

Horizontal:

```vim
:split file.txt
```

Vertical:

```vim
:vsplit file.txt
```

Move between windows:

```text
Ctrl+w h/j/k/l
```

## 22. Tabs

```vim
:tabnew
:tabnext
:tabprevious
```

In Vim, tabs are collections of windows, not the same thing as browser tabs.

## 23. Shell commands

Run a shell command:

```vim
:!ls -lah
```

Read command output into the file:

```vim
:r !date
```

## 24. Line numbers

Temporary:

```vim
:set number
:set nonumber
```

Relative numbering:

```vim
:set relativenumber
```

## 25. Syntax highlighting

```vim
:syntax on
```

Full Vim/Neovim normally handle this automatically in typical setups.

## 26. System clipboard

When clipboard support is available:

```text
"+y
"+p
```

Check Vim features:

```bash
vim --version | grep clipboard
```

gVim normally includes clipboard integration.

Neovim relies on platform clipboard providers.

Minimal vi/vim.tiny builds may not support system clipboard.

## 27. Configuration

Vim/gVim:

```text
~/.vimrc
```

Neovim:

```text
~/.config/nvim/init.lua
```

or legacy:

```text
~/.config/nvim/init.vim
```

## 28. Important differences

vi:
minimal baseline.

Vim:
feature-rich classic.

gVim:
Vim plus GUI.

Neovim:
modern architecture, Lua config, LSP/plugin ecosystem.

The core movement/editing model is shared.

## 29. Commands worth memorising

```text
i Esc
:w :q :wq :q!
h j k l
w b
0 $
gg G
dd yy p
u Ctrl+r
/pattern
n N
:%s/old/new/g
.
```

## 30. Typical config-edit scenario

```bash
sudoedit /etc/nginx/nginx.conf
```

In Vim:

1. `/server_name`
2. edit with `i`, `cw` or `A`,
3. `:wq`,
4. validate configuration.

For privileged files, `sudoedit` is often safer than running the entire editor as root.

## 31. Mental model

Think of Vim commands as a language:

```text
operator + motion/text object
```

Examples:

```text
d + w   → delete word
c + i + " → change inside quotes
y + y   → yank line
```

## 32. Which one for what

Remote emergency:
vi.

Daily terminal editing:
Vim or Neovim.

GUI with Vim model:
gVim.

Modern coding environment:
Neovim.

## 33. Final cheat sheet

Open:

```bash
nvim file
```

Edit:

```text
i
```

Stop editing:

```text
Esc
```

Save/quit:

```vim
:w
:q
:wq
:q!
```

Search:

```vim
/pattern
```

Replace:

```vim
:%s/old/new/gc
```

Undo/redo:

```text
u
Ctrl+r
```
