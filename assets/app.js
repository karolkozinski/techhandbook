(() => {
  "use strict";

  const CONTENT_ROOT = "md/pl";

  const state = {
    index: null,
    currentDir: "",
    currentDoc: null
  };

  const els = {
    browser: document.getElementById("fileBrowser"),
    breadcrumbs: document.getElementById("breadcrumbs"),
    location: document.getElementById("locationLabel"),
    count: document.getElementById("entryCount"),
    search: document.getElementById("searchInput"),
    results: document.getElementById("searchResults"),
    reader: document.getElementById("reader"),
    welcome: document.getElementById("welcome"),
    error: document.getElementById("readerError"),
    errorText: document.getElementById("readerErrorText"),
    about: document.getElementById("aboutButton"),
    theme: document.getElementById("themeButton"),
    indexInfo: document.getElementById("indexInfo")
  };

  const escapeHtml = (value = "") =>
    value.replace(/[&<>"']/g, ch => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[ch]);

  const slugify = (value) =>
    value.toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  function inlineMarkdown(text) {
    let s = escapeHtml(text);

    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/__([^_]+)__/g, "<strong>$1</strong>");
    s = s.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "<em>$1</em>");
    s = s.replace(/(?<!_)_([^_\n]+)_(?!_)/g, "<em>$1</em>");

    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+\.md(?:#[^)\s]+)?)\)/g,
      '<span title="Link do dokumentu źródłowego">$1</span>');

    return s;
  }

  function renderMarkdown(markdown) {
    const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
    const out = [];
    let i = 0;
    let listType = null;

    const closeList = () => {
      if (listType) {
        out.push(`</${listType}>`);
        listType = null;
      }
    };

    while (i < lines.length) {
      const line = lines[i];

      if (/^```/.test(line)) {
        closeList();
        const lang = line.slice(3).trim();
        const buf = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) {
          buf.push(lines[i]);
          i++;
        }
        out.push(
          `<pre data-language="${escapeHtml(lang)}"><code>${escapeHtml(buf.join("\n"))}</code></pre>`
        );
        i++;
        continue;
      }

      if (/^\s*$/.test(line)) {
        closeList();
        i++;
        continue;
      }

      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (heading) {
        closeList();
        const level = heading[1].length;
        const text = heading[2].replace(/\s+#+\s*$/, "");
        const id = slugify(text);
        out.push(`<h${level} id="${id}">${inlineMarkdown(text)}</h${level}>`);
        i++;
        continue;
      }

      if (/^---+$/.test(line.trim()) || /^\*\*\*+$/.test(line.trim())) {
        closeList();
        out.push("<hr>");
        i++;
        continue;
      }

      if (/^>\s?/.test(line)) {
        closeList();
        const quote = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) {
          quote.push(lines[i].replace(/^>\s?/, ""));
          i++;
        }
        out.push(`<blockquote>${quote.map(inlineMarkdown).join("<br>")}</blockquote>`);
        continue;
      }

      const ul = line.match(/^\s*[-+*]\s+(.+)$/);
      if (ul) {
        if (listType !== "ul") {
          closeList();
          listType = "ul";
          out.push("<ul>");
        }
        out.push(`<li>${inlineMarkdown(ul[1])}</li>`);
        i++;
        continue;
      }

      const ol = line.match(/^\s*\d+[.)]\s+(.+)$/);
      if (ol) {
        if (listType !== "ol") {
          closeList();
          listType = "ol";
          out.push("<ol>");
        }
        out.push(`<li>${inlineMarkdown(ol[1])}</li>`);
        i++;
        continue;
      }

      // Proste tabele Markdown
      if (line.includes("|") && i + 1 < lines.length &&
          /^\s*\|?[\s:-]+(?:\|[\s:-]+)+\|?\s*$/.test(lines[i + 1])) {
        closeList();
        const rows = [];
        const header = splitTableRow(line);
        i += 2;
        while (i < lines.length && lines[i].includes("|") && lines[i].trim()) {
          rows.push(splitTableRow(lines[i]));
          i++;
        }
        out.push("<table><thead><tr>" +
          header.map(cell => `<th>${inlineMarkdown(cell)}</th>`).join("") +
          "</tr></thead><tbody>" +
          rows.map(row => "<tr>" +
            row.map(cell => `<td>${inlineMarkdown(cell)}</td>`).join("") +
            "</tr>").join("") +
          "</tbody></table>");
        continue;
      }

      closeList();

      const para = [line.trim()];
      i++;
      while (
        i < lines.length &&
        lines[i].trim() &&
        !/^(#{1,6})\s+/.test(lines[i]) &&
        !/^```/.test(lines[i]) &&
        !/^>\s?/.test(lines[i]) &&
        !/^\s*[-+*]\s+/.test(lines[i]) &&
        !/^\s*\d+[.)]\s+/.test(lines[i])
      ) {
        para.push(lines[i].trim());
        i++;
      }

      out.push(`<p>${inlineMarkdown(para.join(" "))}</p>`);
    }

    closeList();
    return out.join("\n");
  }

  function splitTableRow(row) {
    return row.trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map(cell => cell.trim());
  }

  function buildTree(files) {
    const root = { type: "dir", name: CONTENT_ROOT, path: "", children: new Map() };

    for (const file of files) {
      const parts = file.path.replace(new RegExp(`^${CONTENT_ROOT}/`), "").split("/");
      let node = root;

      parts.forEach((part, idx) => {
        const isFile = idx === parts.length - 1;
        if (isFile) {
          node.children.set(part, { type: "file", name: part, file });
          return;
        }

        if (!node.children.has(part)) {
          const path = parts.slice(0, idx + 1).join("/");
          node.children.set(part, {
            type: "dir",
            name: part,
            path,
            children: new Map()
          });
        }
        node = node.children.get(part);
      });
    }

    return root;
  }

  function getDirNode(path) {
    let node = state.tree;
    if (!path) return node;

    for (const part of path.split("/")) {
      node = node.children.get(part);
      if (!node || node.type !== "dir") return state.tree;
    }
    return node;
  }

  function renderDirectory(path = "") {
    state.currentDir = path;
    els.results.hidden = true;
    els.browser.hidden = false;

    const node = getDirNode(path);
    const entries = [...node.children.values()].sort((a, b) => {
      if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
      return a.name.localeCompare(b.name, "pl");
    });

    els.location.textContent = `${CONTENT_ROOT}/${path}${path ? "/" : ""}`;
    els.count.textContent = `${entries.length} ${entries.length === 1 ? "pozycja" : "pozycji"}`;

    els.browser.innerHTML = "";

    if (path) {
      const parent = path.includes("/") ? path.split("/").slice(0, -1).join("/") : "";
      els.browser.appendChild(makeEntry({
        icon: "↰",
        name: "..",
        meta: "katalog nadrzędny",
        arrow: "",
        onClick: () => navigateDir(parent)
      }));
    }

    for (const entry of entries) {
      if (entry.type === "dir") {
        els.browser.appendChild(makeEntry({
          icon: "▣",
          name: entry.name,
          meta: "katalog",
          arrow: "›",
          onClick: () => navigateDir(entry.path)
        }));
      } else {
        els.browser.appendChild(makeEntry({
          icon: "▤",
          name: entry.file.title || entry.name.replace(/\.md$/i, ""),
          meta: entry.name,
          arrow: "›",
          onClick: () => openDocument(entry.file)
        }));
      }
    }

    renderBreadcrumbs(path);
  }

  function makeEntry({ icon, name, meta, arrow, onClick }) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "entry";
    btn.setAttribute("role", "listitem");
    btn.innerHTML = `
      <span class="entry-icon" aria-hidden="true">${escapeHtml(icon)}</span>
      <span class="entry-main">
        <span class="entry-name">${escapeHtml(name)}</span>
        <span class="entry-meta">${escapeHtml(meta)}</span>
      </span>
      <span class="entry-arrow" aria-hidden="true">${escapeHtml(arrow)}</span>
    `;
    btn.addEventListener("click", onClick);
    return btn;
  }

  function renderBreadcrumbs(path) {
    els.breadcrumbs.innerHTML = "";

    const rootBtn = document.createElement("button");
    rootBtn.className = "crumb";
    rootBtn.type = "button";
    rootBtn.textContent = CONTENT_ROOT;
    rootBtn.addEventListener("click", () => navigateDir(""));
    els.breadcrumbs.appendChild(rootBtn);

    if (!path) return;

    let acc = [];
    for (const part of path.split("/")) {
      const sep = document.createElement("span");
      sep.className = "crumb-separator";
      sep.textContent = "/";
      els.breadcrumbs.appendChild(sep);

      acc.push(part);
      const target = acc.join("/");
      const btn = document.createElement("button");
      btn.className = "crumb";
      btn.type = "button";
      btn.textContent = part;
      btn.addEventListener("click", () => navigateDir(target));
      els.breadcrumbs.appendChild(btn);
    }
  }

  function navigateDir(path) {
    els.search.value = "";
    history.replaceState(null, "", `#/${encodeURI(path)}`);
    renderDirectory(path);
  }

  async function openDocument(file) {
    state.currentDoc = file;
    els.welcome.hidden = true;
    els.error.hidden = true;
    els.reader.hidden = false;
    els.reader.innerHTML = `<p>Wczytywanie…</p>`;

    try {
      const res = await fetch(file.path, { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      els.reader.innerHTML = renderMarkdown(text);
      document.title = `${file.title || file.name} — Tech Handbook`;
      history.replaceState(null, "", `#/doc/${encodeURIComponent(file.id)}`);

      if (window.innerWidth <= 860) {
        els.reader.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      els.reader.hidden = true;
      els.error.hidden = false;
      els.errorText.textContent =
        `Nie udało się pobrać "${file.path}". ${err.message}. ` +
        `Sprawdź wpis w content-index.json i położenie pliku.`;
    }
  }

  async function openReadme() {
    const file = {
      id: "__readme__",
      title: "O projekcie",
      path: "README.md",
      name: "README.md"
    };
    await openDocument(file);
  }

  function compileWildcard(query) {
    const escaped = query
      .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\*/g, ".*");
    return new RegExp(escaped, "i");
  }

  function matches(file, query) {
    const haystack = [
      file.name,
      file.title,
      file.path,
      file.category,
      ...(file.tags || [])
    ].filter(Boolean).join(" ");

    if (query.includes("*")) {
      try { return compileWildcard(query).test(haystack); }
      catch { return haystack.toLowerCase().includes(query.toLowerCase()); }
    }

    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const normalized = haystack.toLowerCase();
    return terms.every(term => normalized.includes(term));
  }

  function runSearch(query) {
    const q = query.trim();

    if (!q) {
      els.results.hidden = true;
      els.browser.hidden = false;
      renderDirectory(state.currentDir);
      return;
    }

    const found = state.index.files.filter(file => matches(file, q));

    els.browser.hidden = true;
    els.results.hidden = false;
    els.results.innerHTML = `<h2>Wyniki: ${found.length}</h2>`;

    if (!found.length) {
      els.results.insertAdjacentHTML(
        "beforeend",
        `<div class="no-results">Brak wyników dla „${escapeHtml(q)}”.</div>`
      );
      return;
    }

    const container = document.createElement("div");
    container.className = "file-browser";

    for (const file of found) {
      container.appendChild(makeEntry({
        icon: "▤",
        name: file.title || file.name,
        meta: file.path.replace(new RegExp(`^${CONTENT_ROOT}/`), ""),
        arrow: "›",
        onClick: () => openDocument(file)
      }));
    }

    els.results.appendChild(container);
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("techhandbook-theme", theme);
  }

  function initTheme() {
    const saved = localStorage.getItem("techhandbook-theme");
    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
      return;
    }
    applyTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    );
  }

  function handleHash() {
    const hash = location.hash || "#/";

    if (hash.startsWith("#/doc/")) {
      const id = decodeURIComponent(hash.slice(6));
      if (id === "__readme__") {
        openReadme();
        return;
      }
      const file = state.index.files.find(item => item.id === id);
      if (file) {
        const rel = file.path.replace(new RegExp(`^${CONTENT_ROOT}/`), "");
        const dir = rel.includes("/") ? rel.split("/").slice(0, -1).join("/") : "";
        renderDirectory(dir);
        openDocument(file);
        return;
      }
    }

    if (hash.startsWith("#/")) {
      const path = decodeURI(hash.slice(2));
      renderDirectory(path);
    }
  }

  async function init() {
    initTheme();

    try {
      const res = await fetch("content-index.json", { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      state.index = await res.json();
      state.tree = buildTree(state.index.files || []);
      els.indexInfo.textContent =
        `${state.index.files.length} dokumentów • indeks ${state.index.updated || ""}`;
      handleHash();
    } catch (err) {
      els.browser.innerHTML =
        `<div class="no-results">Nie udało się wczytać content-index.json: ${escapeHtml(err.message)}</div>`;
    }
  }

  els.search.addEventListener("input", e => runSearch(e.target.value));

  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== els.search) {
      e.preventDefault();
      els.search.focus();
    }
    if (e.key === "Escape" && document.activeElement === els.search) {
      els.search.value = "";
      els.search.blur();
      renderDirectory(state.currentDir);
    }
  });

  els.about.addEventListener("click", openReadme);

  els.theme.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    applyTheme(current === "dark" ? "light" : "dark");
  });

  window.addEventListener("hashchange", () => {
    if (state.index) handleHash();
  });

  init();
})();
