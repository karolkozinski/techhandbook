(() => {
  "use strict";

  const I18N = {
    pl: {
      about: "O projekcie",
      search: "Szukaj",
      searchPlaceholder: "np. dns, freebsd, git*",
      searchHint: "Nazwa, katalog, tytuł i tagi. Obsługuje *.",
      browserLabel: "Przeglądarka kompendiów",
      breadcrumbLabel: "Ścieżka",
      welcomeTitle: "Praktyczna baza wiedzy technicznej.",
      welcomeText: "Wybierz katalog po lewej, a potem kompendium. Na telefonie przeglądarka plików pojawia się nad czytnikiem.",
      errorTitle: "Nie udało się otworzyć dokumentu",
      loading: "Wczytywanie…",
      parentDir: "katalog nadrzędny",
      directory: "katalog",
      item: "pozycja",
      items: "pozycji",
      results: "Wyniki",
      noResults: "Brak wyników dla",
      contentPendingTitle: "Angielska wersja jest w przygotowaniu.",
      contentPendingText: "Mechanizm językowy już działa. Dokumenty EN zostaną dodane w kolejnych etapach.",
      docs: "dokumentów",
      index: "indeks",
      fetchError: "Nie udało się pobrać",
      checkIndex: "Sprawdź wpis w content-index.json i położenie pliku.",
      indexError: "Nie udało się wczytać content-index.json",
      themeLabel: "Zmień motyw",
      homeLabel: "Tech Handbook — strona główna",
      home: "Start",
      back: "Wróć",
      backTo: "Wróć do",
      searchResults: "wyników wyszukiwania",
      browse: "Przeglądaj",
      backToBrowse: "Wróć do katalogów",
      toTop: "Do góry",
      close: "Zamknij",
      juniorWelcomeTitle: "Technologia bez strachu.",
      juniorWelcomeText: "Krótko, prosto i praktycznie. Wybierz temat i od razu spróbuj czegoś sam."
    },
    en: {
      about: "About",
      search: "Search",
      searchPlaceholder: "e.g. dns, freebsd, git*",
      searchHint: "Name, directory, title and tags. Supports *.",
      browserLabel: "Handbook browser",
      breadcrumbLabel: "Path",
      welcomeTitle: "A practical technical knowledge base.",
      welcomeText: "Choose a directory on the left, then select a handbook. On mobile, the file browser appears above the reader.",
      errorTitle: "Could not open the document",
      loading: "Loading…",
      parentDir: "parent directory",
      directory: "directory",
      item: "item",
      items: "items",
      results: "Results",
      noResults: "No results for",
      contentPendingTitle: "English content is being prepared.",
      contentPendingText: "Language switching is ready. English documents will be added in the next stages.",
      docs: "documents",
      index: "index",
      fetchError: "Could not fetch",
      checkIndex: "Check content-index.json and the file location.",
      indexError: "Could not load content-index.json",
      themeLabel: "Change theme",
      homeLabel: "Tech Handbook — home",
      home: "Home",
      back: "Back",
      backTo: "Back to",
      searchResults: "search results",
      browse: "Browse",
      backToBrowse: "Back to folders",
      toTop: "To top",
      close: "Close",
      juniorWelcomeTitle: "Technology without the scary bits.",
      juniorWelcomeText: "Short, clear and practical. Pick a topic and try something yourself."
    }
  };

  const state = {
    index: null,
    currentDir: "",
    currentDoc: null,
    language: "pl",
    mode: "standard",
    contentRoot: "md/pl",
    files: [],
    navigationContext: { type: "dir", path: "", query: "" }
  };

  const els = {
    browser: document.getElementById("fileBrowser"),
    breadcrumbs: document.getElementById("breadcrumbs"),
    location: document.getElementById("locationLabel"),
    count: document.getElementById("entryCount"),
    search: document.getElementById("searchInput"),
    results: document.getElementById("searchResults"),
    reader: document.getElementById("reader"),
    readerTop: document.getElementById("readerTop"),
    readerTopLabel: document.getElementById("readerTopLabel"),
    welcome: document.getElementById("welcome"),
    error: document.getElementById("readerError"),
    errorText: document.getElementById("readerErrorText"),
    about: document.getElementById("aboutButton"),
    theme: document.getElementById("themeButton"),
    indexInfo: document.getElementById("indexInfo"),
    language: document.getElementById("languageSelect"),
    mode: document.getElementById("modeSelect"),
    searchLabel: document.getElementById("searchLabel"),
    searchHint: document.getElementById("searchHint"),
    browserPanel: document.querySelector(".browser-panel"),
    browserToolbar: document.querySelector(".browser-toolbar"),
    welcomeTitle: document.getElementById("welcomeTitle"),
    welcomeText: document.getElementById("welcomeText"),
    errorTitle: document.getElementById("readerErrorTitle"),
    brand: document.querySelector(".brand")
  };

  const t = (key) => I18N[state.language]?.[key] || I18N.pl[key] || key;

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
      `<span title="${state.language === "en" ? "Link to source document" : "Link do dokumentu źródłowego"}">$1</span>`);

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

  const CATEGORY_LABELS = {
    pl: {
      ai: "AI", architecture: "Architektura", cloud: "Chmura", "data-api": "Dane i API",
      devops: "DevOps", digital: "Digital", programming: "Programowanie", security: "Bezpieczeństwo",
      shell: "Shell", systems: "Systemy", testing: "Testowanie", tools: "Narzędzia",
      troubleshooting: "Diagnostyka", web: "Web", android: "Android", debian: "Debian",
      freebsd: "FreeBSD", linux: "Linux", windows: "Windows", c: "C", go: "Go",
      javascript: "JavaScript", python: "Python", editors: "Edytory",
      "file-managers": "Menedżery plików", regex: "Wyrażenia regularne",
      scripting: "Skrypty", authentication: "Uwierzytelnianie", networking: "Sieci",
      performance: "Wydajność", seo: "SEO", junior: "Junior"
    },
    en: {
      ai: "AI", architecture: "Architecture", cloud: "Cloud", "data-api": "Data & API",
      devops: "DevOps", digital: "Digital", programming: "Programming", security: "Security",
      shell: "Shell", systems: "Systems", testing: "Testing", tools: "Tools",
      troubleshooting: "Troubleshooting", web: "Web", android: "Android", debian: "Debian",
      freebsd: "FreeBSD", linux: "Linux", windows: "Windows", c: "C", go: "Go",
      javascript: "JavaScript", python: "Python", editors: "Editors",
      "file-managers": "File Managers", regex: "Regular Expressions",
      scripting: "Scripting", authentication: "Authentication", networking: "Networking",
      performance: "Performance", seo: "SEO", junior: "Junior"
    }
  };

  function displaySegment(segment) {
    return CATEGORY_LABELS[state.language]?.[segment] ||
      segment.replace(/-/g, " ").replace(/\b\w/g, ch => ch.toUpperCase());
  }

  function displayPath(path) {
    if (!path) return t("home");
    return path.split("/").map(displaySegment).join(" / ");
  }

  function setNavigationContext(context) {
    state.navigationContext = { ...state.navigationContext, ...context };
  }
  function buildTree(files) {
    const root = { type: "dir", name: state.contentRoot, path: "", children: new Map() };

    for (const file of files) {
      const parts = file.path.replace(new RegExp(`^${state.contentRoot}/`), "").split("/");
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
    els.breadcrumbs.hidden = false;
    els.browserToolbar.hidden = false;

    const node = getDirNode(path);
    const entries = [...node.children.values()].sort((a, b) => {
      if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
      return a.name.localeCompare(b.name, state.language);
    });

    els.location.textContent = displayPath(path);
    els.count.textContent = `${entries.length} ${entries.length === 1 ? t("item") : t("items")}`;

    els.browser.innerHTML = "";

    if (path) {
      const parent = path.includes("/") ? path.split("/").slice(0, -1).join("/") : "";
      els.browser.appendChild(makeEntry({
        icon: "↰",
        name: "← " + t("back"),
        meta: displayPath(parent),
        arrow: "",
        onClick: () => navigateDir(parent)
      }));
    }

    for (const entry of entries) {
      if (entry.type === "dir") {
        els.browser.appendChild(makeEntry({
          icon: "▣",
          name: displaySegment(entry.name),
          meta: t("directory"),
          arrow: "›",
          onClick: () => navigateDir(entry.path)
        }));
      } else {
        els.browser.appendChild(makeEntry({
          icon: "▤",
          name: entry.file.title || entry.name.replace(/\.md$/i, ""),
          meta: entry.name,
          arrow: "›",
          onClick: () => openDocument(
            entry.file,
            { type: "dir", path: state.currentDir, query: "" },
            { focusReader: true }
          )
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
    rootBtn.textContent = t("home");
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
      btn.textContent = displaySegment(part);
      btn.addEventListener("click", () => navigateDir(target));
      els.breadcrumbs.appendChild(btn);
    }
  }

  function navigateDir(path) {
    els.search.value = "";
    setNavigationContext({ type: "dir", path, query: "" });
    history.replaceState(null, "", "#/" + encodeURI(path));
    renderDirectory(path);
  }

  async function openDocument(file, context = null, { focusReader = false } = {}) {
    if (context) setNavigationContext(context);
    state.currentDoc = file;
    els.welcome.hidden = true;
    els.error.hidden = true;
    els.reader.hidden = false;
    els.reader.innerHTML = `<p>${escapeHtml(t("loading"))}</p>`;

    try {
      const res = await fetch(file.path, { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      els.reader.innerHTML = renderMarkdown(text);
      document.title = `${file.title || file.name} — Tech Handbook`;
      history.replaceState(null, "", "#/doc/" + encodeURIComponent(file.id));
      if (els.readerTop) {
        els.readerTop.hidden = false;
        els.readerTopLabel.textContent = t("toTop");
      }
      if (focusReader) {
        els.reader.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (err) {
      els.reader.hidden = true;
      els.error.hidden = false;
      els.errorText.textContent =
        `${t("fetchError")} "${file.path}". ${err.message}. ${t("checkIndex")}`;
    }
  }

  async function openReadme({ focusReader = true } = {}) {
    const file = {
      id: "__readme__",
      title: t("about"),
      path: state.language === "en" ? "README.en.md" : "README.md",
      name: state.language === "en" ? "README.en.md" : "README.md"
    };

    els.search.value = "";
    setNavigationContext({ type: "dir", path: "", query: "" });
    renderDirectory("");
    await openDocument(file, { type: "dir", path: "", query: "" }, { focusReader });
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
      renderDirectory(state.currentDir);
      return;
    }

    const found = state.files.filter(file => matches(file, q));
    setNavigationContext({ type: "search", query: q, path: state.currentDir });

    els.browser.hidden = true;
    els.breadcrumbs.hidden = false;
    els.browserToolbar.hidden = false;
    els.results.hidden = false;

    els.breadcrumbs.innerHTML = "";
    const homeBtn = document.createElement("button");
    homeBtn.className = "crumb";
    homeBtn.type = "button";
    homeBtn.textContent = t("home");
    homeBtn.addEventListener("click", () => navigateDir(""));
    els.breadcrumbs.appendChild(homeBtn);

    const sep = document.createElement("span");
    sep.className = "crumb-separator";
    sep.textContent = "/";
    els.breadcrumbs.appendChild(sep);

    const resultLabel = document.createElement("span");
    resultLabel.className = "crumb current";
    resultLabel.textContent = t("results");
    els.breadcrumbs.appendChild(resultLabel);

    els.location.textContent = t("results") + ": “" + q + "”";
    els.count.textContent = found.length + " " + (found.length === 1 ? t("item") : t("items"));

    els.results.innerHTML = "";

    const backEntry = makeEntry({
      icon: "↰",
      name: "← " + t("back"),
      meta: state.currentDir ? displayPath(state.currentDir) : t("home"),
      arrow: "",
      onClick: () => navigateDir(state.currentDir || "")
    });
    els.results.appendChild(backEntry);

    if (!found.length) {
      els.results.insertAdjacentHTML(
        "beforeend",
        `<div class="no-results">${escapeHtml(t("noResults"))} „${escapeHtml(q)}”.</div>`
      );
      return;
    }

    const container = document.createElement("div");
    container.className = "file-browser";

    for (const file of found) {
      container.appendChild(makeEntry({
        icon: "▤",
        name: file.title || file.name,
        meta: (() => {
          const rel = file.path.replace(new RegExp(`^${state.contentRoot}/`), "");
          const dir = rel.includes("/") ? rel.split("/").slice(0, -1).join("/") : "";
          return displayPath(dir);
        })(),
        arrow: "›",
        onClick: () => openDocument(
          file,
          { type: "search", query: q, path: state.currentDir },
          { focusReader: true }
        )
      }));
    }

    els.results.appendChild(container);
  }

  function applyLanguage(language, { preserveHash = false } = {}) {
    const currentHash = location.hash || "#/";
    const currentDocId = state.currentDoc?.id ||
      (currentHash.startsWith("#/doc/") ? decodeURIComponent(currentHash.slice(6)) : null);

    const supported = state.index?.languages || ["pl"];
    state.language = supported.includes(language) ? language : (state.index?.defaultLanguage || "pl");
    state.contentRoot = state.mode === "junior"
      ? (state.index?.juniorRoots?.[state.language] || `md/${state.language}/junior`)
      : (state.index?.roots?.[state.language] || `md/${state.language}`);
    state.files = (state.index?.files || []).filter(file =>
      (file.language || "pl") === state.language &&
      (file.audience || "standard") === state.mode
    );
    state.tree = buildTree(state.files);

    document.documentElement.lang = state.language;
    document.documentElement.dataset.mode = state.mode;
    localStorage.setItem("techhandbook-language", state.language);

    if (els.language) els.language.value = state.language;
    if (els.mode) els.mode.value = state.mode;
    els.about.textContent = t("about");
    els.theme.setAttribute("aria-label", t("themeLabel"));
    els.searchLabel.textContent = t("search");
    els.search.placeholder = t("searchPlaceholder");
    els.searchHint.innerHTML = escapeHtml(t("searchHint")).replace("*", "<code>*</code>");
    els.browserPanel.setAttribute("aria-label", t("browserLabel"));
    els.breadcrumbs.setAttribute("aria-label", t("breadcrumbLabel"));
    els.welcomeTitle.textContent = state.mode === "junior" ? t("juniorWelcomeTitle") : t("welcomeTitle");
    els.welcomeText.textContent = state.mode === "junior" ? t("juniorWelcomeText") : t("welcomeText");
    els.errorTitle.textContent = t("errorTitle");
    els.brand.setAttribute("aria-label", t("homeLabel"));
    els.indexInfo.textContent = `${state.files.length} ${t("docs")} • ${t("index")} ${state.index?.updated || ""}`;

    els.search.value = "";
    els.results.hidden = true;
    els.reader.hidden = true;
    els.error.hidden = true;
    if (els.readerTop) els.readerTop.hidden = true;
    state.currentDoc = null;

    if (!state.files.length) {
      state.currentDir = "";
      els.browser.hidden = true;
      els.breadcrumbs.innerHTML = "";
      els.location.textContent = state.contentRoot + "/";
      els.count.textContent = "0 " + t("items");
      els.welcome.hidden = false;
      els.welcomeTitle.textContent = t("contentPendingTitle");
      els.welcomeText.textContent = t("contentPendingText");
      if (!preserveHash) history.replaceState(null, "", "#/");
      return;
    }

    els.browser.hidden = false;
    els.welcome.hidden = true;

    if (preserveHash && currentDocId) {
      if (currentDocId === "__readme__") {
        openReadme();
        return;
      }

      const counterpart = state.files.find(item => item.id === currentDocId);
      if (counterpart) {
        const rel = counterpart.path.replace(new RegExp(`^${state.contentRoot}/`), "");
        const dir = rel.includes("/") ? rel.split("/").slice(0, -1).join("/") : "";
        renderDirectory(dir);
        openDocument(counterpart);
        return;
      }
    }

    if (preserveHash && currentHash.startsWith("#/") && !currentHash.startsWith("#/doc/")) {
      const path = decodeURI(currentHash.slice(2));
      renderDirectory(path);
      return;
    }

    history.replaceState(null, "", "#/");
    renderDirectory("");
  }

  function applyMode(mode) {
    const supported = state.index?.modes || ["standard", "junior"];
    state.mode = supported.includes(mode) ? mode : "standard";
    localStorage.setItem("techhandbook-mode", state.mode);
    if (els.mode) els.mode.value = state.mode;
    applyLanguage(state.language, { preserveHash: false });
  }

  function initLanguage() {
    const saved = localStorage.getItem("techhandbook-language");
    const savedMode = localStorage.getItem("techhandbook-mode");
    const fallback = state.index?.defaultLanguage || "pl";
    state.mode = (state.index?.modes || ["standard", "junior"]).includes(savedMode)
      ? savedMode
      : "standard";
    applyLanguage(saved || fallback, { preserveHash: true });
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
        openReadme({ focusReader: false });
        return;
      }
      const file = state.files.find(item => item.id === id);
      if (file) {
        const rel = file.path.replace(new RegExp(`^${state.contentRoot}/`), "");
        const dir = rel.includes("/") ? rel.split("/").slice(0, -1).join("/") : "";
        renderDirectory(dir);
        setNavigationContext({ type: "dir", path: dir, query: "" });
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
      initLanguage();
    } catch (err) {
      els.browser.innerHTML =
        `<div class="no-results">${escapeHtml(t("indexError"))}: ${escapeHtml(err.message)}</div>`;
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

  els.about.addEventListener("click", () => {
    openReadme({ focusReader: true });
  });

  if (els.readerTop) {
    els.readerTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  els.language.addEventListener("change", e => {
    applyLanguage(e.target.value, { preserveHash: true });
  });

  if (els.mode) {
    els.mode.addEventListener("change", e => {
      applyMode(e.target.value);
    });
  }

  els.theme.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    applyTheme(current === "dark" ? "light" : "dark");
  });

  window.addEventListener("hashchange", () => {
    if (state.index) handleHash();
  });

  init();
})();
