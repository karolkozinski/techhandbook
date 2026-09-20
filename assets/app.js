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
      article: "artykuł",
      articlesFew: "artykuły",
      articlesMany: "artykułów",
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
      relatedArticles: "Powiązane artykuły",
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
      article: "article",
      articlesFew: "articles",
      articlesMany: "articles",
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
      relatedArticles: "Related articles",
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


  function findHeadingTarget(fragment) {
    if (!fragment) return null;

    let decoded = fragment;
    try {
      decoded = decodeURIComponent(fragment);
    } catch {
      decoded = fragment;
    }

    const exact = document.getElementById(decoded);
    if (exact) return exact;

    const normalized = slugify(decoded);
    if (!normalized) return null;
    return document.getElementById(normalized);
  }

  function normalizeRepoPath(path) {
    const parts = [];
    for (const part of path.split("/")) {
      if (!part || part === ".") continue;
      if (part === "..") parts.pop();
      else parts.push(part);
    }
    return parts.join("/");
  }

  function resolveDocumentLink(target) {
    const [rawPath, rawFragment = ""] = target.split("#", 2);

    if (rawPath.startsWith("techhandbook:")) {
      const id = rawPath.slice("techhandbook:".length);
      const file = state.files.find(item => item.id === id);
      return file ? { file, fragment: rawFragment } : null;
    }

    if (!/\.md$/i.test(rawPath)) return null;

    const currentPath = state.currentDoc?.path || "";
    const currentDir = currentPath.includes("/")
      ? currentPath.split("/").slice(0, -1).join("/")
      : "";

    const candidate = rawPath.startsWith("md/")
      ? normalizeRepoPath(rawPath)
      : normalizeRepoPath((currentDir ? currentDir + "/" : "") + rawPath);

    const file = state.files.find(item => item.path === candidate);
    return file ? { file, fragment: rawFragment } : null;
  }

  function safeHref(target) {
    const trimmed = target.trim();
    if (/^(?:javascript|data|vbscript):/i.test(trimmed)) return null;
    return trimmed;
  }

  function renderMarkdownLink(label, target) {
    const safeLabel = escapeHtml(label);
    const safeTarget = safeHref(target);
    if (!safeTarget) return safeLabel;

    if (safeTarget.startsWith("#")) {
      const heading = safeTarget.slice(1);
      return `<a href="${escapeHtml(safeTarget)}" data-heading-id="${escapeHtml(heading)}">${safeLabel}</a>`;
    }

    const internal = resolveDocumentLink(safeTarget);
    if (internal) {
      return `<a href="#/doc/${encodeURIComponent(internal.file.id)}" data-doc-id="${escapeHtml(internal.file.id)}" data-doc-fragment="${escapeHtml(internal.fragment || "")}">${safeLabel}</a>`;
    }

    const external = /^(?:https?:\/\/|mailto:)/i.test(safeTarget);
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${escapeHtml(safeTarget)}"${attrs}>${safeLabel}</a>`;
  }

  function inlineMarkdown(text) {
    const codeTokens = [];
    const linkTokens = [];

    let source = text.replace(/`([^`]+)`/g, (_, code) => {
      const token = "\u0000CODE" + codeTokens.length + "\u0000";
      codeTokens.push(code);
      return token;
    });

    source = source.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, target) => {
      const token = "\u0000LINK" + linkTokens.length + "\u0000";
      linkTokens.push({ label, target: target.trim() });
      return token;
    });

    let s = escapeHtml(source);

    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/__([^_]+)__/g, "<strong>$1</strong>");
    s = s.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "<em>$1</em>");
    s = s.replace(/(?<!_)_([^_\n]+)_(?!_)/g, "<em>$1</em>");

    s = s.replace(/(^|[\s(>])((?:https?:\/\/)[^\s<]+)/g, (match, prefix, url) => {
      let trailing = "";
      while (/[.,;:!?)]$/.test(url)) {
        trailing = url.slice(-1) + trailing;
        url = url.slice(0, -1);
      }
      return prefix + '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + "</a>" + trailing;
    });

    s = s.replace(/\u0000LINK(\d+)\u0000/g, (_, index) => {
      const link = linkTokens[Number(index)];
      return renderMarkdownLink(link.label, link.target);
    });

    s = s.replace(/\u0000CODE(\d+)\u0000/g, (_, index) =>
      "<code>" + escapeHtml(codeTokens[Number(index)]) + "</code>"
    );

    return s;
  }

  function stripFrontMatter(markdown) {
    const normalized = markdown.replace(/\r\n?/g, "\n");
    if (!normalized.startsWith("---\n")) return normalized;

    const end = normalized.indexOf("\n---\n", 4);
    if (end === -1) return normalized;

    return normalized.slice(end + 5).replace(/^\n+/, "");
  }

  function normalizeArticleTitle(markdown, title) {
    if (!title) return markdown;
    const safeTitle = title.replace(/\r?\n/g, " ").trim();
    const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
    const firstH1 = lines.findIndex(line => /^#\s+/.test(line));
    if (firstH1 >= 0) {
      lines[firstH1] = "# " + safeTitle;
    } else {
      lines.unshift("# " + safeTitle, "");
    }
    return lines.join("\n");
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

  function currentHistoryState() {
    const query = els.search.value.trim();
    const base = {
      language: state.language,
      mode: state.mode,
      scrollY: window.scrollY
    };

    if (state.currentDoc) {
      return {
        ...base,
        view: "article",
        docId: state.currentDoc.id,
        directory: state.currentDir,
        context: { ...state.navigationContext }
      };
    }

    if (query && !els.results.hidden) {
      return {
        ...base,
        view: "search",
        query,
        directory: state.currentDir
      };
    }

    return {
      ...base,
      view: "dir",
      path: state.currentDir
    };
  }

  function saveCurrentHistoryState() {
    history.replaceState(currentHistoryState(), "", location.href);
  }

  function writeHistory(viewState, url, mode = "replace") {
    if (mode === "none") return;
    if (mode === "push") {
      saveCurrentHistoryState();
      history.pushState(viewState, "", url);
      return;
    }
    if (mode === "pushPrepared") {
      history.pushState(viewState, "", url);
      return;
    }
    history.replaceState(viewState, "", url);
  }

  function restoreScroll(scrollY = 0) {
    requestAnimationFrame(() => {
      window.scrollTo({ top: Number(scrollY) || 0, behavior: "auto" });
    });
  }
  function clearReader() {
    state.currentDoc = null;
    els.reader.hidden = true;
    els.reader.innerHTML = "";
    els.error.hidden = true;
    els.errorText.textContent = "";
    if (els.readerTop) els.readerTop.hidden = true;
    els.welcome.hidden = true;
    document.title = "Null Yard Tech Handbook";
  }

  function countArticles(node) {
    if (!node) return 0;
    if (node.type === "file") return 1;
    let total = 0;
    for (const child of node.children.values()) {
      total += countArticles(child);
    }
    return total;
  }

  function articleCountLabel(count) {
    if (state.language === "en") {
      return count + " " + (count === 1 ? t("article") : t("articlesMany"));
    }
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (count === 1) return count + " " + t("article");
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
      return count + " " + t("articlesFew");
    }
    return count + " " + t("articlesMany");
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

  function renderDirectory(path = "", { clearContent = true } = {}) {
    if (clearContent) clearReader();
    state.currentDir = path;
    els.results.hidden = true;
    els.browser.hidden = false;
    els.breadcrumbs.hidden = false;
    els.browserToolbar.hidden = false;

    const node = getDirNode(path);
    const entries = [...node.children.values()].sort((a, b) => {
      if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
      const aLabel = a.type === "dir"
        ? displaySegment(a.name)
        : (a.file.title || a.name.replace(/\.md$/i, ""));
      const bLabel = b.type === "dir"
        ? displaySegment(b.name)
        : (b.file.title || b.name.replace(/\.md$/i, ""));
      return aLabel.localeCompare(bLabel, state.language, { sensitivity: "base" });
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
          name: displaySegment(entry.name).toLocaleUpperCase(state.language),
          meta: "(" + articleCountLabel(countArticles(entry)) + ")",
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
            { focusReader: true, historyMode: "push" }
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

  function navigateDir(path, { historyMode = "replace" } = {}) {
    els.search.value = "";
    setNavigationContext({ type: "dir", path, query: "" });
    renderDirectory(path);
    writeHistory(
      { ...currentHistoryState(), view: "dir", path, scrollY: window.scrollY },
      "#/" + encodeURI(path),
      historyMode
    );
  }

  async function openDocument(file, context = null, { focusReader = false, fragment = "", historyMode = "replace", targetDir = null } = {}) {
    if (historyMode === "push") saveCurrentHistoryState();
    if (targetDir !== null) renderDirectory(targetDir, { clearContent: false });
    if (context) setNavigationContext(context);
    state.currentDoc = file;
    els.welcome.hidden = true;
    els.error.hidden = true;
    els.reader.hidden = false;
    els.reader.innerHTML = `<p>${escapeHtml(t("loading"))}</p>`;

    try {
      const res = await fetch(file.path, { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = stripFrontMatter(await res.text());
      const titledText = normalizeArticleTitle(text, file.title || file.name.replace(/\.md$/i, ""));
      els.reader.innerHTML = renderMarkdown(titledText) + renderRelatedArticles(file);
      document.title = `${file.title || file.name} — Tech Handbook`;
      writeHistory(
        {
          ...currentHistoryState(),
          view: "article",
          docId: file.id,
          directory: state.currentDir,
          context: { ...state.navigationContext },
          scrollY: focusReader ? 0 : window.scrollY
        },
        "#/doc/" + encodeURIComponent(file.id),
        historyMode === "push" ? "pushPrepared" : historyMode
      );
      if (els.readerTop) {
        els.readerTop.hidden = false;
        els.readerTopLabel.textContent = t("toTop");
        const topButton = els.readerTop.querySelector(".reader-top");
        if (topButton) {
          topButton.setAttribute("aria-label", t("toTop"));
          topButton.setAttribute("title", t("toTop"));
        }
      }
      if (focusReader) {
        if (fragment) {
          const target = findHeadingTarget(fragment);
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
          else els.reader.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          els.reader.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } catch (err) {
      els.reader.hidden = true;
      els.error.hidden = false;
      els.errorText.textContent =
        `${t("fetchError")} "${file.path}". ${err.message}. ${t("checkIndex")}`;
    }
  }

  async function openReadme({ focusReader = true, historyMode = "push" } = {}) {
    const file = {
      id: "__readme__",
      title: t("about"),
      path: state.language === "en" ? "README.en.md" : "README.md",
      name: state.language === "en" ? "README.en.md" : "README.md"
    };

    els.search.value = "";
    setNavigationContext({ type: "dir", path: "", query: "" });
    await openDocument(
      file,
      { type: "dir", path: "", query: "" },
      { focusReader, historyMode, targetDir: "" }
    );
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

  function runSearch(query, { historyMode = "replace" } = {}) {
    clearReader();
    const q = query.trim();

    if (!q) {
      navigateDir(state.currentDir, { historyMode });
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
      writeHistory(
        { ...currentHistoryState(), view: "search", query: q, directory: state.currentDir, scrollY: window.scrollY },
        "#/search/" + encodeURIComponent(q),
        historyMode
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
          { focusReader: true, historyMode: "push" }
        )
      }));
    }

    els.results.appendChild(container);

    writeHistory(
      {
        ...currentHistoryState(),
        view: "search",
        query: q,
        directory: state.currentDir,
        scrollY: window.scrollY
      },
      "#/search/" + encodeURIComponent(q),
      historyMode
    );
  }


  function renderRelatedArticles(file) {
    const relatedIds = Array.isArray(file.related) ? file.related : [];
    const related = relatedIds
      .map(id => state.files.find(item => item.id === id))
      .filter(Boolean);

    if (!related.length) return "";

    return `
      <section class="related-articles" aria-label="${escapeHtml(t("relatedArticles"))}">
        <h2>${escapeHtml(t("relatedArticles"))}</h2>
        <ul>
          ${related.map(item =>
            `<li><a href="#/doc/${encodeURIComponent(item.id)}" data-doc-id="${escapeHtml(item.id)}">${escapeHtml(item.title || item.name)}</a></li>`
          ).join("")}
        </ul>
      </section>
    `;
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
        openReadme({ focusReader: false, historyMode: "replace" });
        return;
      }

      const counterpart = state.files.find(item => item.id === currentDocId);
      if (counterpart) {
        const rel = counterpart.path.replace(new RegExp(`^${state.contentRoot}/`), "");
        const dir = rel.includes("/") ? rel.split("/").slice(0, -1).join("/") : "";
        renderDirectory(dir);
        openDocument(counterpart, null, { historyMode: "replace" });
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

  async function restoreHistoryState(historyState) {
    if (!historyState) {
      handleHash();
      return;
    }

    if (historyState.view === "search") {
      state.currentDir = historyState.directory || "";
      els.search.value = historyState.query || "";
      runSearch(historyState.query || "", { historyMode: "none" });
      restoreScroll(historyState.scrollY);
      return;
    }

    if (historyState.view === "article") {
      const id = historyState.docId;
      if (id === "__readme__") {
        await openReadme({ focusReader: false, historyMode: "none" });
        restoreScroll(historyState.scrollY);
        return;
      }

      const file = state.files.find(item => item.id === id);
      if (file) {
        const dir = historyState.directory || "";
        const context = historyState.context || { type: "dir", path: dir, query: "" };

        if (context.type === "search" && context.query) {
          state.currentDir = context.path || dir;
          els.search.value = context.query;
          runSearch(context.query, { historyMode: "none" });
        } else {
          renderDirectory(dir, { clearContent: false });
        }

        setNavigationContext(context);
        await openDocument(file, null, { focusReader: false, historyMode: "none" });
        restoreScroll(historyState.scrollY);
        return;
      }
    }

    navigateDir(historyState.path || "", { historyMode: "none" });
    restoreScroll(historyState.scrollY);
  }

  function handleHash() {
    const hash = location.hash || "#/";

    if (hash.startsWith("#/search/")) {
      const query = decodeURIComponent(hash.slice(9));
      els.search.value = query;
      runSearch(query, { historyMode: "replace" });
      return;
    }

    if (hash.startsWith("#/doc/")) {
      const id = decodeURIComponent(hash.slice(6));
      if (id === "__readme__") {
        openReadme({ focusReader: false, historyMode: "replace" });
        return;
      }
      const file = state.files.find(item => item.id === id);
      if (file) {
        const rel = file.path.replace(new RegExp(`^${state.contentRoot}/`), "");
        const dir = rel.includes("/") ? rel.split("/").slice(0, -1).join("/") : "";
        renderDirectory(dir, { clearContent: false });
        setNavigationContext({ type: "dir", path: dir, query: "" });
        openDocument(file, null, { historyMode: "replace" });
        return;
      }
    }

    if (hash.startsWith("#/")) {
      const path = decodeURI(hash.slice(2));
      navigateDir(path, { historyMode: "replace" });
    }
  }

  async function init() {
    initTheme();

    try {
      const res = await fetch("content-index.json", { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      state.index = await res.json();
      initLanguage();
      requestAnimationFrame(() => {
        if (!history.state) history.replaceState(currentHistoryState(), "", location.href);
      });
    } catch (err) {
      els.browser.innerHTML =
        `<div class="no-results">${escapeHtml(t("indexError"))}: ${escapeHtml(err.message)}</div>`;
    }
  }


  els.reader.addEventListener("click", e => {
    const docLink = e.target.closest("a[data-doc-id]");
    if (docLink) {
      e.preventDefault();
      const file = state.files.find(item => item.id === docLink.dataset.docId);
      if (!file) return;

      const rel = file.path.replace(new RegExp(`^${state.contentRoot}/`), "");
      const dir = rel.includes("/") ? rel.split("/").slice(0, -1).join("/") : "";
      openDocument(
        file,
        { type: "dir", path: dir, query: "" },
        {
          focusReader: true,
          fragment: docLink.dataset.docFragment || "",
          historyMode: "push",
          targetDir: dir
        }
      );
      return;
    }

    const headingLink = e.target.closest("a[data-heading-id]");
    if (headingLink) {
      e.preventDefault();
      const target = findHeadingTarget(headingLink.dataset.headingId || "");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

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
    openReadme({ focusReader: true, historyMode: "push" });
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

  history.scrollRestoration = "manual";

  let scrollSaveQueued = false;
  window.addEventListener("scroll", () => {
    if (scrollSaveQueued || !history.state) return;
    scrollSaveQueued = true;
    requestAnimationFrame(() => {
      scrollSaveQueued = false;
      if (!history.state) return;
      history.replaceState(
        { ...history.state, scrollY: window.scrollY },
        "",
        location.href
      );
    });
  }, { passive: true });

  window.addEventListener("popstate", event => {
    if (state.index) restoreHistoryState(event.state);
  });

  init();
})();
