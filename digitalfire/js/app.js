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

  async init() {
    this.setLoadStatus('Loading SQL engine...');
    this.setProgress(10);

    const SQL = await initSqlJs({
      locateFile: file => `js/${file}`
    });

    this.setLoadStatus('Downloading database (122 MB)...');
    this.setProgress(20);

    const response = await fetch('digitalfire_reference.db');
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length') || 128000000;
    
    let received = 0;
    const chunks = [];
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      received += value.length;
      const pct = Math.min(85, 20 + (received / contentLength) * 65);
      this.setProgress(pct);
      this.setLoadStatus(`Downloading... ${(received / 1048576).toFixed(0)} MB`);
    }

    const buf = new Uint8Array(received);
    let pos = 0;
    for (const chunk of chunks) {
      buf.set(chunk, pos);
      pos += chunk.length;
    }

    this.setLoadStatus('Opening database...');
    this.setProgress(90);
    this.db = new SQL.Database(buf);

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

  onSearch() {
    const q = document.getElementById('search-input').value.trim();
    this.currentQuery = q;
    this.currentCategory = 'all';
    
    if (!q) {
      document.getElementById('search-view').style.display = 'none';
      document.getElementById('home-view').classList.add('visible');
      return;
    }

    document.getElementById('search-view').style.display = 'block';
    document.getElementById('home-view').classList.remove('visible');
    this.doSearch(q);
  },

  doSearch(q, category = 'all') {
    const t0 = performance.now();
    
    // FTS5 search with ranking
    let sql, params;
    
    // Clean query for FTS5 — wrap each word in quotes for prefix matching
    const ftsQuery = q.split(/\s+/).filter(w => w).map(w => `"${w}"*`).join(' ');
    
    if (category === 'all') {
      sql = `
        SELECT si.rowid, si.category, si.title, si.snippet, si.url, si.page_id,
               rank
        FROM search_fts
        JOIN search_index si ON si.rowid = search_fts.rowid
        WHERE search_fts MATCH ?
        ORDER BY rank
        LIMIT 200
      `;
      params = [ftsQuery];
    } else {
      sql = `
        SELECT si.rowid, si.category, si.title, si.snippet, si.url, si.page_id,
               rank
        FROM search_fts
        JOIN search_index si ON si.rowid = search_fts.rowid
        WHERE search_fts MATCH ? AND si.category = ?
        ORDER BY rank
        LIMIT 200
      `;
      params = [ftsQuery, category];
    }

    const results = this.query(sql, params);
    const elapsed = (performance.now() - t0).toFixed(1);

    // Count by category
    const catCounts = {};
    let total = 0;
    for (const r of results) {
      catCounts[r.category] = (catCounts[r.category] || 0) + 1;
      total++;
    }

    // Render category tabs
    this.renderCategoryTabs(catCounts, category, q);

    // Render results
    this.renderResults(category === 'all' ? results : results, total, elapsed);
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
    for (const r of results) {
      const cfg = this.categories[r.category] || { icon: '📄', label: r.category };
      html += `
        <div class="result-card" onclick="app.openDetail(${r.page_id}, '${r.category}')">
          <div class="rc-header">
            <span class="rc-cat ${r.category}">${cfg.icon} ${r.category}</span>
            <span class="rc-title">${this.esc(r.title || 'Untitled')}</span>
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

    document.getElementById('detail-title').textContent = page.title || 'Untitled';
    const catEl = document.getElementById('detail-cat');
    catEl.textContent = category;
    catEl.className = `rc-cat ${category}`;

    let bodyHtml = '';

    // Category-specific content
    switch (category) {
      case 'material':
        bodyHtml = this.renderMaterialDetail(pageId, page);
        break;
      case 'glossary':
        bodyHtml = this.renderGlossaryDetail(pageId, page);
        break;
      case 'recipe':
        bodyHtml = this.renderRecipeDetail(pageId, page);
        break;
      default:
        bodyHtml = this.renderGenericDetail(pageId, page, category);
    }

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

  renderMaterialDetail(pageId, page) {
    let html = '';

    // Description
    const info = this.query("SELECT * FROM material_info WHERE page_id = ?", [pageId])[0];
    if (info && info.description) {
      html += `<div class="detail-section">
        <h3>Description</h3>
        <div class="body-text">${this.esc(info.description)}</div>
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
        html += `<div class="body-text" style="margin-bottom:0.5rem">${this.esc(n.notes_text)}</div>`;
      }
      html += `</div>`;
    }

    // Full body text
    const content = this.query("SELECT body_text FROM material_content WHERE url = ?", [page.url])[0];
    if (content && content.body_text) {
      html += `<div class="detail-section">
        <h3>Full Article</h3>
        <div class="body-text" id="mat-body">${this.esc(content.body_text)}</div>
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
        <div class="body-text">${this.esc(def.definition)}</div>
      </div>`;
    }

    const content = this.query("SELECT body_text FROM glossary_content WHERE url = ?", [page.url])[0];
    if (content && content.body_text) {
      html += `<div class="detail-section">
        <h3>Full Article</h3>
        <div class="body-text" id="glo-body">${this.esc(content.body_text)}</div>
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
        <div class="body-text" id="rec-body">${this.esc(content.body_text)}</div>
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
            <div class="body-text">${this.esc(content.caption)}</div>
          </div>`;
        }
        if (content.body) {
          html += `<div class="detail-section">
            <h3>Content</h3>
            <div class="body-text" id="gen-body">${this.esc(content.body)}</div>
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
  }
};

// Boot
app.init().catch(err => {
  console.error('Failed to initialize:', err);
  document.getElementById('load-status').textContent = `Error: ${err.message}`;
});
