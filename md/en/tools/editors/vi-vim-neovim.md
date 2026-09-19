# vi / Vim / gVim / Neovim — Text Editing Handbook

## 1. The family

These programs share the same editing model but are not identical.

- **vi** — the traditional Unix editor interface; often a small implementation.
- **Vim** — “Vi Improved,” with many additional features.
- **gVim** — graphical Vim.
- **Neovim (`nvim`)** — modern Vim-compatible editor with Lua configuration and a strong plugin ecosystem.

Check what commands actually point to:

```bash
command -v vi vim gvim nvim
readlink -f "$(command -v vi)"
```

## 2. Which one to use

Use `vi` when:

- you are on a minimal server,
- nothing else is guaranteed,
- you only need a quick configuration edit.

Use Vim/Neovim for regular editing.

Use gVim when you want the Vim model in a graphical window.

## 3. The most important concept: modes

Vim is modal.

### Normal mode

For navigation and commands.

Press:

```text
Esc
```

to return here.

### Insert mode

For typing text.

Enter with:

```text
i a I A o O
```

### Visual mode

For selecting text.

```text
v
V
Ctrl+V
```

### Command-line mode

From Normal mode:

```text
:
```

for commands such as save, quit, and substitute.

## 4. Opening files

```bash
vi /etc/hosts
vim README.md
nvim main.go
gvim notes.txt
```

Open at a line:

```bash
vim +120 file.txt
```

Open read-only:

```bash
vim -R file.txt
```

## 5. Save and quit

```text
:w      save
:q      quit
:wq     save and quit
:x      save if changed and quit
:q!     quit without saving
:w!     force write when appropriate
```

The emergency minimum:

```text
Esc
:wq
Enter
```

## 6. Entering Insert mode

```text
i   insert before cursor
a   append after cursor
I   insert at beginning of line
A   append at end of line
o   new line below
O   new line above
```

Return:

```text
Esc
```

## 7. Movement

Basic:

```text
h left
j down
k up
l right
```

Faster:

```text
w   next word
b   previous word
e   end of word
0   beginning of line
^   first non-blank character
$   end of line
gg  first line
G   last line
42G line 42
```

## 8. Scrolling

```text
Ctrl+F page forward
Ctrl+B page backward
Ctrl+D half-page down
Ctrl+U half-page up
zz center current line
zt top
zb bottom
```

## 9. Deleting

```text
x    delete character
dd   delete line
dw   delete word
d$   delete to end of line
D    same idea: delete to end
```

Counts:

```text
5dd
3dw
```

Deleted text usually enters a register and can be pasted.

## 10. Undo and redo

```text
u       undo
Ctrl+R  redo
```

## 11. Changing text

```text
cw   change word
ciw  change inner word
cc   change line
c$   change to end of line
rX   replace one character with X
R    Replace mode
```

## 12. Copy and paste

Vim calls copy “yank.”

```text
yy   yank line
yw   yank word
p    paste after/below
P    paste before/above
```

## 13. Search

Forward:

```text
/pattern
```

Backward:

```text
?pattern
```

Next/previous:

```text
n
N
```

Search word under cursor:

```text
*
#
```

## 14. Replace

Whole file:

```text
:%s/old/new/g
```

Ask for confirmation:

```text
:%s/old/new/gc
```

Current line:

```text
:s/old/new/g
```

## 15. Counts

Many commands accept a number:

```text
10j
5w
3dd
4yy
```

This is one of the reasons Vim becomes fast after practice.

## 16. Visual mode

Character selection:

```text
v
```

Line selection:

```text
V
```

Block selection:

```text
Ctrl+V
```

Then use operations such as:

```text
d y c > <
```

## 17. Repeat last change

```text
.
```

The dot command is extremely powerful: it repeats the last editing change.

## 18. Matching brackets

On a bracket:

```text
%
```

jumps to its pair.

Useful for code and configuration.

## 19. Text objects

Examples:

```text
ciw  change inner word
di"  delete inside quotes
ci(  change inside parentheses
da{  delete around braces
```

Think:

```text
operator + scope/object
```

## 20. Multiple files

Open:

```bash
vim file1 file2 file3
```

Navigate buffers:

```text
:bn
:bp
:ls
:b NUMBER
```

Neovim and full Vim handle this well. Tiny vi implementations may provide fewer conveniences.

## 21. Splits

```text
:split file
:vsplit file
```

Move between windows:

```text
Ctrl+W h/j/k/l
Ctrl+W w
```

## 22. Tabs

```text
:tabnew file
:tabnext
:tabprevious
```

Vim tabs are window-layout containers, not exactly the same concept as browser tabs.

## 23. Running shell commands

```text
:!ls
:!git status
```

Shell:

```text
:shell
```

Return with `exit`.

## 24. Line numbers

Temporary:

```text
:set number
:set nonumber
:set relativenumber
```

## 25. Syntax highlighting

Full Vim/Neovim:

```text
:syntax on
```

Modern Neovim may use Treesitter through plugins for richer highlighting.

## 26. System clipboard

Clipboard support depends on the build.

Check Vim:

```bash
vim --version | grep clipboard
```

Common registers:

```text
"+y
"+p
```

gVim usually has clipboard support. Minimal `vim.tiny` may not.

Neovim integrates with clipboard providers depending on the platform.

## 27. Configuration

### vi / tiny Vim

Keep assumptions minimal.

### Vim / gVim

```text
~/.vimrc
```

Example:

```vim
set number
set expandtab
set shiftwidth=4
set tabstop=4
syntax on
```

### Neovim

Modern configuration:

```text
~/.config/nvim/init.lua
```

Example:

```lua
vim.opt.number = true
vim.opt.expandtab = true
vim.opt.shiftwidth = 4
vim.opt.tabstop = 4
```

## 28. Key differences

| Feature | vi/tiny | Vim | gVim | Neovim |
|---|---|---|---|---|
| basic modal editing | yes | yes | yes | yes |
| GUI | no | no | yes | optional GUIs |
| plugins | limited | rich | rich | rich |
| config | vi/vim style | Vimscript | Vimscript | Lua + Vimscript |
| LSP integration | external/plugins | plugins | plugins | built-in client |
| remote-server minimalism | excellent | good | not relevant | good |

## 29. Absolute minimum to memorize

```text
i       type
Esc     Normal mode
:w      save
:q      quit
:wq     save + quit
:q!     quit without saving
dd      delete line
yy      copy line
p       paste
u       undo
/word   search
n       next result
```

## 30. A more comfortable minimum

Add:

```text
w b 0 $ gg G
ciw
:%s/old/new/gc
.
V
Ctrl+W w
:set number
```

## 31. Typical configuration-file edit

```bash
sudoedit /etc/nginx/nginx.conf
```

or:

```bash
sudo vim /etc/nginx/nginx.conf
```

Inside:

```text
/search
n
i
edit
Esc
:wq
```

Then validate configuration with the service's own tooling before restarting it.

## 32. Mental model

Do not think:

```text
I am always typing text
```

Think:

```text
Normal mode: describe editing operations
Insert mode: type new text
```

Vim becomes much easier once Normal mode feels like the default.

## 33. Which one to use for what

```text
emergency/minimal server → vi
regular terminal work → Vim or Neovim
GUI Vim workflow → gVim
modern extensible environment → Neovim
```

## 34. Final cheat sheet

```text
OPEN        vim file
INSERT      i
NORMAL      Esc
SAVE        :w
QUIT        :q
SAVE+QUIT   :wq
FORCE QUIT  :q!
MOVE        h j k l / w b / 0 $
TOP/BOTTOM  gg / G
DELETE      x dd dw
CHANGE      cw ciw
COPY        yy
PASTE       p
UNDO/REDO   u / Ctrl+R
SEARCH      /text
NEXT        n
REPLACE     :%s/a/b/gc
VISUAL      v / V / Ctrl+V
REPEAT      .
```
