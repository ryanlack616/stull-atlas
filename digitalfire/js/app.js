/**
 * Digitalfire Archive — The Hansen Reference
 * 
 * Single-page app with sql.js (SQLite in WASM).
 * Searches 8,884 entries via FTS5, displays detail views,
 * oxide chemistry filtering, and pre-computed relationships.
 */

const app = {
  db: null,
  currentQuery: '',
  currentCategory: 'all',
  debounceTimer: null,
  filterRows: [],
  darkMode: true,
  imgDepth: 0,
  currentDetailPageId: null,
  currentDetailCategory: null,
  searchMode: 'normal',   // 'normal' | 'fuzzy' | 'deep'

  // Category config
  categories: {
    material:    { icon: '🧪', label: 'Materials' },
    glossary:    { icon: '📖', label: 'Glossary' },
    article:     { icon: '📄', label: 'Articles' },
    picture:     { icon: '📷', label: 'Pictures' },
    recipe:      { icon: '🔥', label: 'Recipes' },
    oxide:       { icon: '⚗️', label: 'Oxides' },
    hazard:      { icon: '⚠️', label: 'Hazards' },
    trouble:     { icon: '🔧', label: 'Troubleshooting' },
    test:        { icon: '🧪', label: 'Tests' },
    video:       { icon: '🎬', label: 'Videos' },
    mineral:     { icon: '💎', label: 'Minerals' },
    project:     { icon: '📐', label: 'Projects' },
    schedule:    { icon: '📅', label: 'Schedules' },
    temperature: { icon: '🌡️', label: 'Temperatures' },
    property:    { icon: '📊', label: 'Properties' },
  },

  DB_GZ_SIZE: 26910515,  // gzipped size in bytes
  DB_CACHE_VERSION: 'df-db-v1',  // bump this when the DB file changes

  async init() {
    this.setLoadStatus('Loading SQL engine...');
    this.setProgress(5);

    const SQL = await initSqlJs({
      locateFile: file => `js/${file}`
    });

    // --- Try cache first ---
    let gzBlob = null;
    const cacheAvailable = typeof caches !== 'undefined';

    if (cacheAvailable) {
      try {
        const cache = await caches.open(this.DB_CACHE_VERSION);
        const cached = await cache.match('digitalfire_reference.db.gz');
        if (cached) {
          this.setLoadStatus('Loading from cache...');
          this.setProgress(40);
          gzBlob = await cached.blob();
        }
      } catch (e) { /* cache unavailable, fall through */ }
    }

    // --- Download if not cached ---
    if (!gzBlob) {
      this.setLoadStatus('Downloading database...');
      this.setProgress(10);

      const response = await fetch('digitalfire_reference.db.gz');
      const reader = response.body.getReader();
      const compressed = [];
      let received = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        compressed.push(value);
        received += value.length;
        const pct = Math.min(75, 10 + (received / this.DB_GZ_SIZE) * 65);
        this.setProgress(pct);
        const mb = (received / 1048576).toFixed(1);
        this.setLoadStatus(`Downloading... ${mb} / ${(this.DB_GZ_SIZE / 1048576).toFixed(0)} MB`);
      }
      gzBlob = new Blob(compressed);

      // Store in cache for next visit (fire-and-forget)
      if (cacheAvailable) {
        try {
          const cache = await caches.open(this.DB_CACHE_VERSION);
          cache.put('digitalfire_reference.db.gz',
            new Response(gzBlob, {
              headers: {
                'Content-Type': 'application/gzip',
                'Content-Length': String(this.DB_GZ_SIZE)
              }
            })
          );
        } catch (e) { /* storage quota exceeded or unavailable */ }
      }
    }

    // --- Decompress ---
    this.setLoadStatus('Decompressing database...');
    this.setProgress(78);
    const ds = new DecompressionStream('gzip');
    const decompressed = gzBlob.stream().pipeThrough(ds);
    const buf = new Uint8Array(await new Response(decompressed).arrayBuffer());

    this.setLoadStatus('Opening database...');
    this.setProgress(92);
    this.db = new SQL.Database(buf);

    // --- Load incremental delta updates ---
    try {
      const deltaResp = await fetch('updates/updates.json?_=' + Date.now());
      if (deltaResp.ok) {
        const delta = await deltaResp.json();
        const pages = delta.pages || [];
        if (pages.length > 0) {
          this.setLoadStatus('Applying updates...');
          const maxRowidRow = this.query('SELECT MAX(rowid) as n FROM search_index');
          let rowid = (maxRowidRow[0]?.n ?? 0);
          for (const p of pages) {
            rowid++;
            this.db.run(
              'INSERT OR REPLACE INTO search_index (rowid,category,title,snippet,url,page_id) VALUES (?,?,?,?,?,?)',
              [rowid, p.category || 'picture', p.title || '', p.snippet || '', p.url || '', p.page_id || 0]
            );
            this.db.run(
              'INSERT INTO search_fts (rowid,title,body,category) VALUES (?,?,?,?)',
              [rowid, p.title || '', p.body || '', p.category || 'picture']
            );
          }
          console.log(`[delta] +${pages.length} pages applied`);
        }
      }
    } catch (e) {
      // Delta unavailable — base DB is still fully functional
      console.warn('[delta] load skipped:', e.message);
    }

    this.setLoadStatus('Ready.');
    this.setProgress(100);

    // Get stats
    const stats = this.query("SELECT COUNT(*) as n FROM search_index")[0];
    const matCount = this.query("SELECT COUNT(*) as n FROM material_info")[0];
    document.getElementById('header-stats').textContent = 
      `${stats.n.toLocaleString()} entries · ${matCount.n.toLocaleString()} materials`;

    // Render home view
    this.renderHome();

    // Bind events
    this.bindEvents();

    // Initialize theme
    this.initTheme();

    // Initialize search mode UI
    this.updateSearchModeUI();

    // Handle deep-link URL params (?q=search+term&cat=glossary or ?id=123&cat=material)
    this.handleDeepLink();

    // Handle browser back/forward
    window.addEventListener('popstate', () => this.handleDeepLink());

    // Hide loading screen
    setTimeout(() => {
      document.getElementById('loading-screen').classList.add('hidden');
    }, 300);
  },

  setProgress(pct) {
    document.getElementById('load-progress').style.width = pct + '%';
  },
  setLoadStatus(msg) {
    document.getElementById('load-status').textContent = msg;
  },

  query(sql, params = []) {
    try {
      const stmt = this.db.prepare(sql);
      stmt.bind(params);
      const results = [];
      while (stmt.step()) {
        const row = stmt.getAsObject();
        results.push(row);
      }
      stmt.free();
      return results;
    } catch(e) {
      console.error('Query error:', sql, e);
      return [];
    }
  },

  bindEvents() {
    const input = document.getElementById('search-input');
    input.addEventListener('input', () => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => this.onSearch(), 150);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        input.value = '';
        this.onSearch();
      }
    });

    document.getElementById('detail-overlay').addEventListener('click', () => this.closeDetail());
    document.getElementById('detail-close').addEventListener('click', () => this.closeDetail());
    
    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
      }
      if (e.key === 'Escape') this.closeDetail();
    });
  },

  initTheme() {
    // Check localStorage, then system preference, default dark
    const stored = localStorage.getItem('df-theme');
    if (stored) {
      this.darkMode = stored === 'dark';
    } else {
      this.darkMode = !window.matchMedia('(prefers-color-scheme: light)').matches;
    }
    this.applyTheme();

    // Bind toggle button
    document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
  },

  toggleTheme() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('df-theme', this.darkMode ? 'dark' : 'light');
    this.applyTheme();
  },

  applyTheme() {
    const btn = document.getElementById('theme-toggle');
    if (this.darkMode) {
      document.documentElement.removeAttribute('data-theme');
      btn.innerHTML = '&#9790;';  // crescent moon
      btn.title = 'Switch to light mode';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      btn.innerHTML = '&#9728;';  // sun
      btn.title = 'Switch to dark mode';
    }
  },

  // --- Search Mode ---
  cycleSearchMode() {
    const modes = ['normal', 'fuzzy', 'deep'];
    const i = modes.indexOf(this.searchMode);
    this.searchMode = modes[(i + 1) % modes.length];
    this.updateSearchModeUI();
    if (this.currentQuery) this.doSearch(this.currentQuery, this.currentCategory);
  },

  updateSearchModeUI() {
    const btn  = document.getElementById('search-mode-btn');
    const hint = document.getElementById('search-mode-hint');
    if (!btn) return;
    const labels = {
      normal: 'Normal',
      fuzzy:  '⚡ Fuzzy',
      deep:   '⬡ Deep',
    };
    const hints = {
      normal: '',
      fuzzy:  '⚡ Fuzzy — partial substring matching, forgiving of typos and alternate spellings',
      deep:   '⬡ Deep — expands results by following pre-computed topic relationships in the graph',
    };
    btn.textContent = labels[this.searchMode];
    btn.className   = `search-mode-btn${this.searchMode !== 'normal' ? ' mode-' + this.searchMode : ''}`;
    hint.textContent = hints[this.searchMode];
  },

  handleDeepLink() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const cat = params.get('cat') || 'all';
    const itemId = params.get('id');

    if (itemId) {
      // Direct item link: ?id=123&cat=material
      this.openDetail(parseInt(itemId), cat);
    } else if (q) {
      // Search link: ?q=feldspar&cat=material
      const input = document.getElementById('search-input');
      input.value = q;
      this.currentQuery = q;
      this.currentCategory = cat;
      document.getElementById('search-view').style.display = 'block';
      document.getElementById('home-view').classList.remove('visible');
      this.doSearch(q, cat);
    }
  },

  updateUrl(q, cat) {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (cat && cat !== 'all') params.set('cat', cat);
    const qs = params.toString();
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    history.replaceState(null, '', url);
  },

  onSearch() {
    const q = document.getElementById('search-input').value.trim();
    this.currentQuery = q;
    this.currentCategory = 'all';
    
    if (!q) {
      document.getElementById('search-view').style.display = 'none';
      document.getElementById('home-view').classList.add('visible');
      this.updateUrl('', '');
      return;
    }

    document.getElementById('search-view').style.display = 'block';
    document.getElementById('home-view').classList.remove('visible');
    this.updateUrl(q, 'all');
    this.doSearch(q);
  },

  doSearch(q, category = 'all') {
    const t0 = performance.now();
    let results;
    if (this.searchMode === 'fuzzy') {
      results = this.doFuzzySearch(q, category);
    } else if (this.searchMode === 'deep') {
      results = this.doDeepSearch(q, category);
    } else {
      results = this.doNormalSearch(q, category);
    }
    const elapsed = (performance.now() - t0).toFixed(1);

    const catCounts = {};
    let total = 0;
    for (const r of results) {
      catCounts[r.category] = (catCounts[r.category] || 0) + 1;
      total++;
    }
    this.renderCategoryTabs(catCounts, category, q);
    this.renderResults(results, total, elapsed);
  },

  // Normal — FTS5 prefix match (fast, exact)
  doNormalSearch(q, category) {
    const ftsQuery = q.split(/\s+/).filter(w => w).map(w => `"${w}"*`).join(' ');
    if (category === 'all') {
      return this.query(`
        SELECT si.rowid, si.category, si.title, si.snippet, si.url, si.page_id, rank
        FROM search_fts
        JOIN search_index si ON si.rowid = search_fts.rowid
        WHERE search_fts MATCH ?
        ORDER BY rank LIMIT 200
      `, [ftsQuery]);
    }
    return this.query(`
      SELECT si.rowid, si.category, si.title, si.snippet, si.url, si.page_id, rank
      FROM search_fts
      JOIN search_index si ON si.rowid = search_fts.rowid
      WHERE search_fts MATCH ? AND si.category = ?
      ORDER BY rank LIMIT 200
    `, [ftsQuery, category]);
  },

  // Fuzzy — substring LIKE, OR across words, forgiving of typos
  doFuzzySearch(q, category) {
    const words = q.split(/\s+/).filter(w => w.length > 1);
    if (!words.length) return [];
    const conditions = words.map(() => `(si.title LIKE ? OR si.snippet LIKE ?)`).join(' OR ');
    const scoreExpr  = words.map(() => `CASE WHEN si.title LIKE ? THEN 1 ELSE 0 END`).join(' + ');
    const catClause  = category !== 'all' ? 'AND si.category = ?' : '';
    const likes      = words.map(w => `%${w}%`);
    const sql = `
      SELECT si.rowid, si.category, si.title, si.snippet, si.url, si.page_id,
             (${scoreExpr}) AS score
      FROM search_index si
      WHERE (${conditions}) ${catClause}
      ORDER BY score DESC, si.title
      LIMIT 200
    `;
    // Param order: scoreExpr CASE params (N), then conditions params (2N), then optional category
    const params = [
      ...likes,
      ...words.flatMap(w => [`%${w}%`, `%${w}%`]),
      ...(category !== 'all' ? [category] : []),
    ];
    return this.query(sql, params);
  },

  // Deep — FTS5 seeds + related_content graph expansion
  doDeepSearch(q, category) {
    const direct    = this.doNormalSearch(q, 'all');
    const directIds = new Set(direct.map(r => r.page_id));
    const filtered  = category === 'all' ? direct : direct.filter(r => r.category === category);

    const seedIds = direct.slice(0, 12).map(r => r.page_id);
    if (!seedIds.length) return filtered;

    const ph = seedIds.map(() => '?').join(',');
    const related = this.query(`
      SELECT rc.related_page_id AS page_id, SUM(rc.link_score) AS total_score
      FROM related_content rc
      WHERE rc.page_id IN (${ph})
        AND rc.related_page_id NOT IN (${ph})
      GROUP BY rc.related_page_id
      ORDER BY total_score DESC
      LIMIT 120
    `, [...seedIds, ...seedIds]);

    const relatedIds = related.map(r => r.page_id).filter(id => !directIds.has(id));
    if (!relatedIds.length) return filtered;

    const relPh    = relatedIds.map(() => '?').join(',');
    const catClause = category !== 'all' ? 'AND si.category = ?' : '';
    const relResults = this.query(`
      SELECT si.rowid, si.category, si.title, si.snippet, si.url, si.page_id
      FROM search_index si
      WHERE si.page_id IN (${relPh}) ${catClause}
      LIMIT 150
    `, [...relatedIds, ...(category !== 'all' ? [category] : [])]);

    for (const r of relResults) r._isRelated = true;
    return [...filtered, ...relResults];
  },

  renderCategoryTabs(counts, active, query) {
    const tabs = document.getElementById('category-tabs');
    
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    
    let html = `<button class="cat-tab ${active === 'all' ? 'active' : ''}" 
      onclick="app.selectCategory('all', '${this.escAttr(query)}')">
      All<span class="cat-count">${total}</span></button>`;
    
    // Sort categories by count
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    for (const [cat, count] of sorted) {
      const cfg = this.categories[cat] || { icon: '📄', label: cat };
      html += `<button class="cat-tab ${active === cat ? 'active' : ''}"
        onclick="app.selectCategory('${cat}', '${this.escAttr(query)}')">
        ${cfg.icon} ${cfg.label}<span class="cat-count">${count}</span></button>`;
    }

    // Chemistry filter toggle (only when searching materials)
    if (counts.material) {
      html += `<button class="cat-tab" onclick="app.toggleFilterPanel()" 
        style="margin-left:auto;border-color:var(--oxide);color:var(--oxide)">
        ⚗️ Chemistry Filter</button>`;
    }

    tabs.innerHTML = html;
  },

  selectCategory(cat, query) {
    this.currentCategory = cat;
    this.updateUrl(query, cat);
    this.doSearch(query, cat);
  },

  renderResults(results, total, elapsed) {
    document.getElementById('results-count').textContent = 
      `${total} result${total !== 1 ? 's' : ''}`;
    document.getElementById('results-time').textContent = `${elapsed}ms`;

    const list = document.getElementById('results-list');
    if (results.length === 0) {
      list.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--text-muted)">No results found</div>';
      return;
    }

    let html = '';
    let shownDivider = false;
    for (const r of results) {
      const cfg = this.categories[r.category] || { icon: '📄', label: r.category };
      if (r._isRelated && !shownDivider) {
        html += `<div class="deep-divider">↳ Also related via topic graph</div>`;
        shownDivider = true;
      }
      const badge = r._isRelated ? `<span class="rc-related-badge">related</span>` : '';
      html += `
        <div class="result-card" onclick="app.openDetail(${r.page_id}, '${r.category}')">
          <div class="rc-header">
            <span class="rc-cat ${r.category}">${cfg.icon} ${r.category}</span>
            <span class="rc-title">${this.esc(r.title || 'Untitled')}</span>
            ${badge}
          </div>
          <div class="rc-snippet">${this.esc(r.snippet || '')}</div>
        </div>
      `;
    }
    list.innerHTML = html;
  },

  // --- Detail View ---
  openDetail(pageId, category) {
    const page = this.query("SELECT * FROM pages WHERE id = ?", [pageId])[0];
    if (!page) return;

    this.currentDetailPageId = pageId;
    this.currentDetailCategory = category;

    document.getElementById('detail-title').textContent = page.title || 'Untitled';
    const catEl = document.getElementById('detail-cat');
    catEl.textContent = category;
    catEl.className = `rc-cat ${category}`;

    let bodyHtml = '';
    const neighborhood = this.renderImageNeighborhood(pageId, category, this.imgDepth);

    // For picture pages, own images come first (large), neighborhood below content
    if (category === 'picture') bodyHtml += this.renderImages(pageId, category);

    // Category-specific content
    switch (category) {
      case 'material':
        bodyHtml += this.renderMaterialDetail(pageId, page);
        break;
      case 'glossary':
        bodyHtml += this.renderGlossaryDetail(pageId, page);
        break;
      case 'recipe':
        bodyHtml += this.renderRecipeDetail(pageId, page);
        break;
      default:
        bodyHtml += this.renderGenericDetail(pageId, page, category);
    }

    // Image neighborhood (with depth selector) for all pages
    bodyHtml += neighborhood;

    // Related content (all categories)
    bodyHtml += this.renderRelated(pageId);

    document.getElementById('detail-body').innerHTML = bodyHtml;
    document.getElementById('detail-overlay').classList.add('visible');
    document.getElementById('detail-panel').classList.add('open');
    document.getElementById('detail-panel').scrollTop = 0;
  },

  closeDetail() {
    document.getElementById('detail-overlay').classList.remove('visible');
    document.getElementById('detail-panel').classList.remove('open');
  },

  // --- Image Gallery ---
  renderImages(pageId, category) {
    const isPicture = category === 'picture';
    const limit = isPicture ? 20 : 6;
    const imgs = this.query(
      'SELECT image_url, alt_text FROM image_urls WHERE page_id = ? ORDER BY id LIMIT ' + limit,
      [pageId]
    );
    if (!imgs.length) return '';

    let html = `<div class="detail-section">`;
    if (isPicture) {
      html += `<div class="img-grid img-grid-large">`;
      for (const img of imgs) {
        const url = img.image_url;
        const alt = img.alt_text || '';
        html += `<a href="${url}" target="_blank" rel="noopener" class="img-cell img-cell-large">
          <img src="${url}" alt="${this.esc(alt)}" loading="lazy" onerror="this.parentElement.style.display='none'">
          ${alt ? `<div class="img-caption">${this.esc(alt)}</div>` : ''}
        </a>`;
      }
    } else {
      html += `<div class="img-grid">`;
      for (const img of imgs) {
        const url = img.image_url;
        const alt = img.alt_text || '';
        html += `<a href="${url}" target="_blank" rel="noopener" class="img-cell">
          <img src="${url}" alt="${this.esc(alt)}" loading="lazy" onerror="this.parentElement.style.display='none'">
        </a>`;
      }
    }
    html += `</div></div>`;
    return html;
  },

  // --- Image Neighborhood (layered graph traversal) ---
  getNeighborhood(pageId, depth) {
    // Returns [{pageId, title, category, layer, images:[{image_url,alt_text}]}]
    const seen = new Set([pageId]);
    const result = [];
    const caps = [0, 8, 4, 3]; // related pages to fetch per node at each layer
    const imgCaps = [6, 3, 2, 2]; // images per node per layer

    // Layer 0: own images
    const ownImgs = this.query(
      'SELECT image_url, alt_text FROM image_urls WHERE page_id = ? ORDER BY id LIMIT 6', [pageId]);
    result.push({ pageId, title: null, category: null, layer: 0, images: ownImgs });
    if (depth < 1) return result;

    // Layers 1–3
    const layerIds = [[pageId]]; // layerIds[n] = page IDs in layer n
    for (let layer = 1; layer <= depth; layer++) {
      const nextIds = [];
      for (const pid of layerIds[layer - 1]) {
        const rels = this.query(
          'SELECT related_page_id, related_title, related_category FROM related_content ' +
          'WHERE page_id = ? AND related_page_id IS NOT NULL ORDER BY rank LIMIT ' + caps[layer],
          [pid]
        );
        for (const rel of rels) {
          const rid = rel.related_page_id;
          if (seen.has(rid)) continue;
          seen.add(rid);
          const imgs = this.query(
            'SELECT image_url, alt_text FROM image_urls WHERE page_id = ? ORDER BY id LIMIT ' + imgCaps[layer],
            [rid]
          );
          if (!imgs.length) continue; // skip pages with no images
          result.push({ pageId: rid, title: rel.related_title, category: rel.related_category, layer, images: imgs });
          nextIds.push(rid);
        }
      }
      layerIds.push(nextIds);
    }
    return result;
  },

  renderImageNeighborhood(pageId, category, depth) {
    const nodes = this.getNeighborhood(pageId, depth);
    const layerNodes = [[], [], [], []];
    for (const n of nodes) layerNodes[n.layer].push(n);

    // Only show if there are images anywhere
    const hasAny = nodes.some(n => n.images.length);
    if (!hasAny) return '';

    const layerLabels = ['', 'Related pages', '2 hops out', '3 hops out'];
    const depthBtns = [0,1,2,3].map(d =>
      `<button class="depth-btn${d === depth ? ' active' : ''}" onclick="app.setImgDepth(${d})">${d}</button>`
    ).join('');

    let html = `<div class="detail-section img-neighborhood">
      <div class="img-depth-header">
        <span>Images</span>
        <div class="depth-selector">
          <span class="depth-label">depth</span>${depthBtns}
        </div>
      </div>`;

    // Layer 0: own images (shown without label, respecting picture vs thumbnail style)
    if (layerNodes[0].length && layerNodes[0][0].images.length) {
      const isPic = category === 'picture';
      html += `<div class="img-grid${isPic ? ' img-grid-large' : ''}">` ;
      for (const img of layerNodes[0][0].images) {
        html += `<a href="${img.image_url}" target="_blank" rel="noopener" class="img-cell${isPic ? ' img-cell-large' : ''}">
          <img src="${img.image_url}" alt="${this.esc(img.alt_text||'')}" loading="lazy" onerror="this.parentElement.style.display='none'">
        </a>`;
      }
      html += `</div>`;
    }

    // Layers 1–3: grouped by source page
    for (let layer = 1; layer <= 3; layer++) {
      if (!layerNodes[layer].length) continue;
      html += `<div class="img-layer img-layer-${layer}">
        <div class="img-layer-label">${layerLabels[layer]}</div>
        <div class="img-neighbors">`;
      for (const node of layerNodes[layer]) {
        const cat = node.category || '';
        html += `<div class="img-neighbor">
          <div class="img-neighbor-title">
            <span class="rc-cat ${cat}">${cat}</span>
            <a href="#" onclick="event.preventDefault();app.openDetail(${node.pageId},'${cat}')">${this.esc(node.title || '')}</a>
          </div>
          <div class="img-grid img-grid-mini">`;
        for (const img of node.images) {
          html += `<a href="#" onclick="event.preventDefault();app.openDetail(${node.pageId},'${cat}')" class="img-cell">
            <img src="${img.image_url}" alt="" loading="lazy" onerror="this.parentElement.style.display='none'">
          </a>`;
        }
        html += `</div></div>`;
      }
      html += `</div></div>`;
    }

    html += `</div>`;
    return html;
  },

  setImgDepth(depth) {
    this.imgDepth = depth;
    const container = document.querySelector('.img-neighborhood');
    if (!container || !this.currentDetailPageId) return;
    const html = this.renderImageNeighborhood(this.currentDetailPageId, this.currentDetailCategory, depth);
    container.outerHTML = html;
  },


  renderMaterialDetail(pageId, page) {
    let html = '';

    // Description
    const info = this.query("SELECT * FROM material_info WHERE page_id = ?", [pageId])[0];
    if (info && info.description) {
      html += `<div class="detail-section">
        <h3>Description</h3>
        <div class="body-text">${this.renderContent(info.description)}</div>
      </div>`;
    }

    // Alternate names
    const alts = this.query("SELECT alt_name FROM material_alt_names WHERE page_id = ?", [pageId]);
    if (alts.length) {
      html += `<div class="detail-section">
        <h3>Also Known As</h3>
        <div class="alt-names">${alts.map(a => `<span class="alt-pill">${this.esc(a.alt_name)}</span>`).join('')}</div>
      </div>`;
    }

    // Oxide analysis
    const oxides = this.query(
      "SELECT oxide, percent FROM material_oxides WHERE page_id = ? ORDER BY percent DESC", [pageId]
    );
    if (oxides.length) {
      const maxPct = Math.max(...oxides.map(o => o.percent || 0));
      html += `<div class="detail-section">
        <h3>Oxide Analysis</h3>
        <table class="oxide-table">
          <tr><th>Oxide</th><th>%</th><th></th></tr>`;
      for (const o of oxides) {
        const barW = maxPct > 0 ? ((o.percent / maxPct) * 120) : 0;
        html += `<tr>
          <td>${this.esc(o.oxide)}</td>
          <td>${o.percent != null ? o.percent.toFixed(2) : '-'}</td>
          <td><span class="oxide-bar" style="width:${barW}px"></span></td>
        </tr>`;
      }
      html += `</table></div>`;
    }

    // Properties
    const props = this.query("SELECT * FROM material_properties WHERE page_id = ?", [pageId])[0];
    if (props) {
      const propLabels = {
        density: 'Density', thermal_expansion: 'Thermal Expansion', softening_point: 'Softening Point',
        melting_range: 'Melting Range', glass_transition: 'Glass Transition', hardness: 'Hardness',
        bulk_density_lbs: 'Bulk Density (lbs)', bulk_density_gcc: 'Bulk Density (g/cc)',
        surface_area: 'Surface Area', particle_size_dist: 'Particle Size Dist.',
        median_particle_size: 'Median Particle Size', body_thermal_expansion: 'Body Thermal Expansion',
        body_color: 'Body Color', glaze_color: 'Glaze Color', glaze_surface_texture: 'Glaze Surface',
        decomposition_temp: 'Decomposition Temp', modulus_of_rupture: 'Modulus of Rupture',
        moisture_content: 'Moisture Content', density_loose: 'Density (Loose)',
        particle_shape: 'Particle Shape', heating_microscope: 'Heating Microscope', loi_property: 'LOI'
      };
      const entries = Object.entries(propLabels).filter(([k]) => props[k]);
      if (entries.length) {
        html += `<div class="detail-section"><h3>Properties</h3><table class="oxide-table">`;
        for (const [k, label] of entries) {
          html += `<tr><td>${label}</td><td>${this.esc(String(props[k]))}</td></tr>`;
        }
        html += `</table></div>`;
      }
    }

    // Similar materials (oxide similarity)
    const similar = this.query(
      `SELECT similar_name, similarity FROM oxide_similarity 
       WHERE material_url = ? ORDER BY rank LIMIT 8`, [page.url]
    );
    if (similar.length) {
      html += `<div class="detail-section"><h3>Similar Materials (by chemistry)</h3>
        <div class="similar-list">`;
      for (const s of similar) {
        const pct = (s.similarity * 100).toFixed(1);
        html += `<div class="similar-item" onclick="app.searchFor('${this.escAttr(s.similar_name)}')">
          <span>${this.esc(s.similar_name)}</span>
          <span class="sim-score">${pct}%</span>
        </div>`;
      }
      html += `</div></div>`;
    }

    // Notes
    const notes = this.query("SELECT notes_text FROM material_notes WHERE page_id = ?", [pageId]);
    if (notes.length) {
      html += `<div class="detail-section"><h3>Notes</h3>`;
      for (const n of notes) {
        html += `<div class="body-text" style="margin-bottom:0.5rem">${this.renderContent(n.notes_text)}</div>`;
      }
      html += `</div>`;
    }

    // Full body text
    const content = this.query("SELECT body_text FROM material_content WHERE url = ?", [page.url])[0];
    if (content && content.body_text) {
      html += `<div class="detail-section">
        <h3>Full Article</h3>
        <div class="body-text" id="mat-body">${this.renderContent(content.body_text)}</div>
        <button class="expand-btn" onclick="document.getElementById('mat-body').classList.toggle('expanded');this.textContent=this.textContent==='Show more'?'Show less':'Show more'">Show more</button>
      </div>`;
    }

    return html;
  },

  renderGlossaryDetail(pageId, page) {
    let html = '';

    const def = this.query("SELECT definition FROM glossary_defs WHERE page_id = ?", [pageId])[0];
    if (def && def.definition) {
      html += `<div class="detail-section">
        <h3>Definition</h3>
        <div class="body-text">${this.renderContent(def.definition)}</div>
      </div>`;
    }

    const content = this.query("SELECT body_text FROM glossary_content WHERE url = ?", [page.url])[0];
    if (content && content.body_text) {
      html += `<div class="detail-section">
        <h3>Full Article</h3>
        <div class="body-text" id="glo-body">${this.renderContent(content.body_text)}</div>
        <button class="expand-btn" onclick="document.getElementById('glo-body').classList.toggle('expanded');this.textContent=this.textContent==='Show more'?'Show less':'Show more'">Show more</button>
      </div>`;
    }

    return html;
  },

  renderRecipeDetail(pageId, page) {
    let html = '';

    // Firing info
    const firing = this.query("SELECT * FROM recipe_firing_info WHERE page_id = ?", [pageId])[0];
    if (firing) {
      let firingText = '';
      if (firing.cone) firingText += `Cone ${firing.cone}`;
      if (firing.atmosphere) firingText += ` · ${firing.atmosphere}`;
      if (firing.temperature_c) firingText += ` · ${firing.temperature_c}°C`;
      if (firing.temperature_f) firingText += ` (${firing.temperature_f}°F)`;
      if (firingText) {
        html += `<div class="detail-section">
          <h3>Firing</h3>
          <div style="font-size:1rem;font-weight:600;color:var(--recipe)">${firingText}</div>
        </div>`;
      }
    }

    // Ingredients
    const ingredients = this.query(
      "SELECT material, amount, percent FROM recipe_ingredients WHERE page_id = ? ORDER BY percent DESC", [pageId]
    );
    if (ingredients.length) {
      const maxPct = Math.max(...ingredients.map(i => i.percent || 0));
      html += `<div class="detail-section">
        <h3>Recipe</h3>
        <table class="ingredients-table">
          <tr><th>Material</th><th>Amount</th><th>%</th><th></th></tr>`;
      for (const ing of ingredients) {
        const barW = maxPct > 0 ? ((ing.percent / maxPct) * 120) : 0;
        html += `<tr>
          <td><span style="cursor:pointer;color:var(--material)" onclick="app.searchFor('${this.escAttr(ing.material)}')">${this.esc(ing.material)}</span></td>
          <td>${ing.amount || ''}</td>
          <td>${ing.percent != null ? ing.percent.toFixed(1) : '-'}</td>
          <td><span class="pct-bar" style="width:${barW}px"></span></td>
        </tr>`;
      }
      html += `</table></div>`;
    }

    // Body text
    const content = this.query("SELECT body_text FROM recipe_content WHERE url = ?", [page.url])[0];
    if (content && content.body_text) {
      html += `<div class="detail-section">
        <h3>Full Article</h3>
        <div class="body-text" id="rec-body">${this.renderContent(content.body_text)}</div>
        <button class="expand-btn" onclick="document.getElementById('rec-body').classList.toggle('expanded');this.textContent=this.textContent==='Show more'?'Show less':'Show more'">Show more</button>
      </div>`;
    }

    return html;
  },

  renderGenericDetail(pageId, page, category) {
    let html = '';

    // Try to find body text from the appropriate content table
    const contentQueries = {
      article: "SELECT body FROM article_content WHERE page_id = ?",
      hazard: "SELECT body FROM hazard_content WHERE page_id = ?",
      trouble: "SELECT details as body FROM trouble_guides WHERE page_id = ?",
      test: "SELECT description as body FROM test_definitions WHERE page_id = ?",
      video: "SELECT transcript as body FROM video_transcripts WHERE page_id = ?",
      oxide: "SELECT notes as body FROM oxide_descriptions WHERE page_id = ?",
      mineral: "SELECT description as body FROM mineral_descriptions WHERE page_id = ?",
      picture: "SELECT caption, body_text as body FROM picture_content WHERE url = '" + (page.url || '').replace(/'/g, "''") + "'",
      project: "SELECT body_text as body FROM project_content WHERE url = '" + (page.url || '').replace(/'/g, "''") + "'",
    };

    const cq = contentQueries[category];
    if (cq) {
      let content;
      if (cq.includes('page_id')) {
        content = this.query(cq, [pageId])[0];
      } else {
        content = this.query(cq)[0];
      }
      if (content) {
        if (content.caption) {
          html += `<div class="detail-section">
            <h3>Caption</h3>
            <div class="body-text">${this.renderContent(content.caption)}</div>
          </div>`;
        }
        if (content.body) {
          html += `<div class="detail-section">
            <h3>Content</h3>
            <div class="body-text" id="gen-body">${this.renderContent(content.body)}</div>
            <button class="expand-btn" onclick="document.getElementById('gen-body').classList.toggle('expanded');this.textContent=this.textContent==='Show more'?'Show less':'Show more'">Show more</button>
          </div>`;
        }
      }
    }

    return html;
  },

  renderRelated(pageId) {
    const related = this.query(
      `SELECT related_title, related_category, related_url, link_score 
       FROM related_content WHERE page_id = ? ORDER BY rank LIMIT 10`, [pageId]
    );
    if (!related.length) return '';

    let html = `<div class="detail-section"><h3>Related</h3><div class="related-list">`;
    for (const r of related) {
      const cfg = this.categories[r.related_category] || { icon: '📄' };
      // Find page_id for the related item
      html += `<div class="related-item" onclick="app.searchFor('${this.escAttr(r.related_title)}')">
        <span class="ri-cat rc-cat ${r.related_category}">${cfg.icon}</span>
        <span>${this.esc(r.related_title || 'Untitled')}</span>
      </div>`;
    }
    html += `</div></div>`;
    return html;
  },

  searchFor(term) {
    this.closeDetail();
    const input = document.getElementById('search-input');
    input.value = term;
    this.onSearch();
  },

  // --- Oxide Filter ---
  toggleFilterPanel() {
    const panel = document.getElementById('filter-panel');
    panel.classList.toggle('visible');
    if (panel.classList.contains('visible') && this.filterRows.length === 0) {
      this.addFilterRow();
    }
  },

  addFilterRow() {
    const container = document.getElementById('filter-rows');
    const id = this.filterRows.length;
    
    // Get available oxides
    const oxides = this.query("SELECT DISTINCT oxide FROM material_oxides ORDER BY oxide");
    const opts = oxides.map(o => `<option value="${o.oxide}">${o.oxide}</option>`).join('');
    
    const row = document.createElement('div');
    row.className = 'filter-row';
    row.innerHTML = `
      <select id="foxide-${id}">${opts}</select>
      <select id="fop-${id}">
        <option value=">">&gt;</option>
        <option value=">=">&ge;</option>
        <option value="<">&lt;</option>
        <option value="<=">&le;</option>
        <option value="=">&#61;</option>
      </select>
      <input type="number" id="fval-${id}" step="0.1" min="0" max="100" placeholder="%">
    `;
    container.appendChild(row);
    this.filterRows.push(id);
  },

  applyFilters() {
    if (!this.filterRows.length) return;

    let conditions = [];
    let params = [];

    for (const id of this.filterRows) {
      const oxide = document.getElementById(`foxide-${id}`)?.value;
      const op = document.getElementById(`fop-${id}`)?.value;
      const val = parseFloat(document.getElementById(`fval-${id}`)?.value);
      
      if (!oxide || isNaN(val)) continue;
      if (!['>', '>=', '<', '<=', '='].includes(op)) continue;

      conditions.push(`page_id IN (
        SELECT page_id FROM material_oxides 
        WHERE oxide = ? AND percent ${op} ?
      )`);
      params.push(oxide, val);
    }

    if (!conditions.length) return;

    const t0 = performance.now();
    const sql = `
      SELECT DISTINCT p.id, p.url, p.title, p.category,
             mi.description
      FROM pages p
      JOIN material_info mi ON mi.page_id = p.id
      WHERE p.category = 'material' AND ${conditions.join(' AND ')}
      ORDER BY p.title
      LIMIT 200
    `;
    
    const results = this.query(sql, params);
    const elapsed = (performance.now() - t0).toFixed(1);

    // Format as result cards
    document.getElementById('results-count').textContent = `${results.length} materials matching chemistry filter`;
    document.getElementById('results-time').textContent = `${elapsed}ms`;

    let html = '';
    for (const r of results) {
      html += `
        <div class="result-card" onclick="app.openDetail(${r.id}, 'material')">
          <div class="rc-header">
            <span class="rc-cat material">🧪 material</span>
            <span class="rc-title">${this.esc(r.title || 'Untitled')}</span>
          </div>
          <div class="rc-snippet">${this.esc(r.description || '')}</div>
        </div>
      `;
    }
    document.getElementById('results-list').innerHTML = html || '<div style="text-align:center;padding:3rem;color:var(--text-muted)">No materials match these criteria</div>';
  },

  clearFilters() {
    document.getElementById('filter-rows').innerHTML = '';
    this.filterRows = [];
    document.getElementById('filter-panel').classList.remove('visible');
    // Re-run current search
    if (this.currentQuery) this.doSearch(this.currentQuery, this.currentCategory);
  },

  // --- Home View ---
  renderHome() {
    const cats = this.query(`
      SELECT category, COUNT(*) as n 
      FROM search_index 
      GROUP BY category 
      ORDER BY n DESC
    `);

    let html = `
      <div style="text-align:center;padding:3rem 0 2rem">
        <h1 style="font-size:2rem;font-weight:700;margin-bottom:0.5rem">
          Digitalfire Archive
        </h1>
        <p style="color:var(--text-dim);font-size:1rem;max-width:520px;margin:0 auto">
          Tony Hansen's 40-year ceramics knowledge base.<br>
          Materials, glazes, chemistry, techniques — fully searchable offline.
        </p>
        <p style="color:var(--text-muted);font-size:0.8rem;margin-top:0.75rem">
          Type anything to search, or press <kbd style="background:var(--bg-card);padding:0.15rem 0.4rem;border-radius:3px;border:1px solid var(--border);font-family:var(--mono);font-size:0.75rem">/</kbd> to focus
        </p>
      </div>
      <div class="home-grid">
    `;

    for (const c of cats) {
      const cfg = this.categories[c.category] || { icon: '📄', label: c.category };
      const color = `var(--${c.category})`;
      html += `
        <div class="home-card" onclick="app.browseCategory('${c.category}')" style="border-color:${color}22">
          <div class="hc-count" style="color:${color}">${c.n.toLocaleString()}</div>
          <div class="hc-label">${cfg.icon} ${cfg.label}</div>
        </div>
      `;
    }
    html += '</div>';

    document.getElementById('home-view').innerHTML = html;
  },

  browseCategory(cat) {
    const input = document.getElementById('search-input');
    input.value = '*';
    document.getElementById('search-view').style.display = 'block';
    document.getElementById('home-view').classList.remove('visible');
    
    // Browse all items in this category
    const t0 = performance.now();
    const results = this.query(`
      SELECT si.rowid, si.category, si.title, si.snippet, si.url, si.page_id
      FROM search_index si
      WHERE si.category = ?
        AND si.title IS NOT NULL
        AND si.title != ''
      ORDER BY si.title
      LIMIT 200
    `, [cat]);
    const elapsed = (performance.now() - t0).toFixed(1);

    const counts = {};
    counts[cat] = results.length;
    this.renderCategoryTabs(counts, cat, '*');
    this.renderResults(results, results.length, elapsed);
  },

  // --- Utilities ---
  esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },
  escAttr(str) {
    if (!str) return '';
    return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
  },

  // URL-to-page_id cache (built on first use)
  _urlMap: null,
  _buildUrlMap() {
    if (this._urlMap) return;
    this._urlMap = {};
    const rows = this.query("SELECT id, url, category, title FROM pages");
    for (const r of rows) {
      if (r.url) this._urlMap[r.url] = { id: r.id, cat: r.category, title: r.title };
    }
  },

  // Resolve a digitalfire.com URL to an internal page
  _resolveUrl(url) {
    this._buildUrlMap();
    // Try exact match first
    if (this._urlMap[url]) return this._urlMap[url];
    // Try decoding
    try {
      const decoded = decodeURIComponent(url);
      if (this._urlMap[decoded]) return this._urlMap[decoded];
    } catch(e) {}
    return null;
  },

  // Render body text with markdown-ish formatting and internal link resolution
  renderContent(str) {
    if (!str) return '';
    let text = String(str);

    // Escape HTML first
    text = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

    // Convert digitalfire.com URLs to internal links
    text = text.replace(/https?:\/\/digitalfire\.com\/[^\s<&"\)\]]+/g, (url) => {
      // Decode the escaped URL back for lookup
      const rawUrl = url.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
      const page = this._resolveUrl(rawUrl);
      if (page) {
        return `<a href="#" class="internal-link" onclick="event.preventDefault();app.openDetail(${page.id},'${page.cat}')" title="${this.esc(page.title)}">${this.esc(page.title)}</a>`;
      }
      // External link (not in our archive) — skip dead linkmaker CTAs
      if (rawUrl.includes('/home/linkmaker')) return '';
      // Just show the path portion as a label
      const path = rawUrl.replace(/https?:\/\/digitalfire\.com\/?/, '');
      return `<span class="dead-link" title="Not in archive">${this.esc(decodeURIComponent(path) || 'digitalfire.com')}</span>`;
    });

    // Convert other http(s) URLs to external links
    text = text.replace(/(https?:\/\/(?!digitalfire\.com)[^\s<&"\)\]]+)/g, 
      '<a href="$1" target="_blank" rel="noopener" class="ext-link">$1</a>');

    // Markdown headings
    text = text.replace(/^#### (.+)$/gm, '<h5>$1</h5>');
    text = text.replace(/^### (.+)$/gm, '<h4>$1</h4>');
    text = text.replace(/^## (.+)$/gm, '<h3 class="content-h3">$1</h3>');
    text = text.replace(/^# (.+)$/gm, '<h2 class="content-h2">$1</h2>');

    // Horizontal rules
    text = text.replace(/^---+$/gm, '<hr>');

    // Pipe-delimited tables
    text = text.replace(/((?:^[^\n]*\|[^\n]*$\n?)+)/gm, (block) => {
      const rows = block.trim().split('\n').filter(r => r.includes('|'));
      if (rows.length < 2) return block;
      let tbl = '<table class="content-table">';
      rows.forEach((row, i) => {
        const cells = row.split('|').map(c => c.trim()).filter(c => c);
        const tag = i === 0 ? 'th' : 'td';
        tbl += '<tr>' + cells.map(c => `<${tag}>${c}</${tag}>`).join('') + '</tr>';
      });
      tbl += '</table>';
      return tbl;
    });

    // Strip "Learn more" and "-Learn more" remnants from linkmaker removals
    text = text.replace(/-?Learn more\s*/g, '');
    // Strip orphaned "Key phrases linking here:" lines
    text = text.replace(/Key phrases linking here:[^\n]*/g, '');

    // Paragraphs: double newlines
    text = text.replace(/\n\n+/g, '</p><p>');
    text = '<p>' + text + '</p>';
    // Single newlines to <br> (within paragraphs)
    text = text.replace(/\n/g, '<br>');
    // Clean up empty paragraphs
    text = text.replace(/<p>\s*<\/p>/g, '');
    // Don't wrap block elements in <p>
    text = text.replace(/<p>(<h[2-5])/g, '$1');
    text = text.replace(/(<\/h[2-5]>)<\/p>/g, '$1');
    text = text.replace(/<p>(<hr>)<\/p>/g, '$1');
    text = text.replace(/<p>(<table)/g, '$1');
    text = text.replace(/(<\/table>)<\/p>/g, '$1');

    return text;
  }
};

// Boot
app.init().catch(err => {
  console.error('Failed to initialize:', err);
  document.getElementById('load-status').textContent = `Error: ${err.message}`;
});
