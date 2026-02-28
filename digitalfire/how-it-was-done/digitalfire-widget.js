/**
 * Digitalfire Search Widget
 * 
 * One <script> tag gives any page instant search over Tony Hansen's
 * 40-year ceramics knowledge base — 8,884 entries, full-text search,
 * oxide chemistry, cross-references.
 *
 * Usage:
 *   <script src="https://YOUR_HOST/widget/digitalfire-widget.js" 
 *           data-api="https://YOUR_HOST" async></script>
 *
 * That's it. A search button appears. Click it. Search everything.
 */

(function() {
  'use strict';

  // --- Configuration ---
  const SCRIPT = document.currentScript;
  const API_BASE = (SCRIPT && SCRIPT.getAttribute('data-api')) || 
                   window.DIGITALFIRE_API || 
                   'http://localhost:8321';
  const POSITION = (SCRIPT && SCRIPT.getAttribute('data-position')) || 'bottom-right';

  // Category display config
  const CATS = {
    material:    { icon: '\u{1F9EA}', label: 'Materials',       color: '#e8a838' },
    glossary:    { icon: '\u{1F4D6}', label: 'Glossary',        color: '#4ecdc4' },
    article:     { icon: '\u{1F4C4}', label: 'Articles',        color: '#9b7cf7' },
    picture:     { icon: '\u{1F4F7}', label: 'Pictures',        color: '#f77c7c' },
    recipe:      { icon: '\u{1F525}', label: 'Recipes',         color: '#f7a84a' },
    oxide:       { icon: '\u{2697}\u{FE0F}', label: 'Oxides',   color: '#a8e86b' },
    hazard:      { icon: '\u{26A0}\u{FE0F}', label: 'Hazards',  color: '#ff6b6b' },
    trouble:     { icon: '\u{1F527}', label: 'Troubleshooting', color: '#ffb347' },
    test:        { icon: '\u{1F9EA}', label: 'Tests',           color: '#6bcfff' },
    video:       { icon: '\u{1F3AC}', label: 'Videos',          color: '#ff8fd4' },
    mineral:     { icon: '\u{1F48E}', label: 'Minerals',        color: '#88d8b0' },
    project:     { icon: '\u{1F4D0}', label: 'Projects',        color: '#b8b0ff' },
    schedule:    { icon: '\u{1F4C5}', label: 'Schedules',       color: '#f9c74f' },
    temperature: { icon: '\u{1F321}\u{FE0F}', label: 'Temperatures', color: '#f94144' },
    property:    { icon: '\u{1F4CA}', label: 'Properties',      color: '#90be6d' },
  };

  // --- State ---
  let isOpen = false;
  let debounceTimer = null;
  let currentQuery = '';
  let detailStack = [];

  // --- Inject Styles ---
  function injectStyles() {
    if (document.getElementById('df-widget-styles')) return;
    const style = document.createElement('style');
    style.id = 'df-widget-styles';
    style.textContent = `
      /* Digitalfire Widget — Scoped to #df-widget */
      #df-widget-trigger {
        position: fixed;
        ${POSITION.includes('right') ? 'right: 20px' : 'left: 20px'};
        ${POSITION.includes('bottom') ? 'bottom: 20px' : 'top: 20px'};
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #1a1d27;
        border: 2px solid #4a6cf7;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        box-shadow: 0 4px 20px rgba(74, 108, 247, 0.3);
        z-index: 99998;
        transition: transform 0.2s, box-shadow 0.2s;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      #df-widget-trigger:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 28px rgba(74, 108, 247, 0.45);
      }
      #df-widget-trigger .df-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        background: #4a6cf7;
        color: white;
        font-size: 9px;
        padding: 2px 5px;
        border-radius: 8px;
        font-weight: 700;
        letter-spacing: 0.03em;
      }

      #df-widget-panel {
        position: fixed;
        ${POSITION.includes('right') ? 'right: 20px' : 'left: 20px'};
        ${POSITION.includes('bottom') ? 'bottom: 88px' : 'top: 88px'};
        width: 420px;
        max-height: 580px;
        background: #0f1117;
        border: 1px solid #2a2e3d;
        border-radius: 12px;
        box-shadow: 0 12px 48px rgba(0,0,0,0.5);
        z-index: 99999;
        display: none;
        flex-direction: column;
        overflow: hidden;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        color: #e8eaed;
        font-size: 14px;
        line-height: 1.5;
      }
      #df-widget-panel.df-open {
        display: flex;
        animation: df-slide-up 0.2s ease-out;
      }
      @keyframes df-slide-up {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }

      #df-widget-panel * { box-sizing: border-box; margin: 0; padding: 0; }

      .df-header {
        padding: 12px 16px;
        border-bottom: 1px solid #2a2e3d;
        display: flex;
        align-items: center;
        gap: 10px;
        background: #0f1117;
        flex-shrink: 0;
      }
      .df-header-title {
        font-size: 13px;
        font-weight: 700;
        color: #e8eaed;
        letter-spacing: 0.02em;
      }
      .df-header-title span { color: #4a6cf7; }
      .df-header-close {
        margin-left: auto;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid #2a2e3d;
        background: transparent;
        color: #8b8fa3;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        transition: all 0.15s;
      }
      .df-header-close:hover {
        background: #232733;
        color: #e8eaed;
      }

      .df-search-wrap {
        padding: 10px 16px;
        border-bottom: 1px solid #2a2e3d;
        flex-shrink: 0;
      }
      .df-search-input {
        width: 100%;
        padding: 8px 12px 8px 36px;
        background: #141620;
        border: 1px solid #2a2e3d;
        border-radius: 8px;
        color: #e8eaed;
        font-size: 14px;
        font-family: inherit;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .df-search-input:focus {
        border-color: #4a6cf7;
        box-shadow: 0 0 0 3px rgba(74, 108, 247, 0.15);
      }
      .df-search-input::placeholder {
        color: #5c6078;
      }
      .df-search-icon {
        position: absolute;
        left: 28px;
        top: 50%;
        transform: translateY(-50%);
        color: #5c6078;
        font-size: 14px;
        pointer-events: none;
      }

      .df-categories {
        padding: 6px 16px;
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
        border-bottom: 1px solid #2a2e3d;
        flex-shrink: 0;
      }
      .df-cat-pill {
        padding: 3px 8px;
        border-radius: 6px;
        font-size: 11px;
        cursor: pointer;
        border: 1px solid transparent;
        background: transparent;
        color: #8b8fa3;
        font-family: inherit;
        transition: all 0.15s;
        white-space: nowrap;
      }
      .df-cat-pill:hover {
        background: #232733;
        color: #e8eaed;
      }
      .df-cat-pill.df-active {
        background: rgba(74, 108, 247, 0.15);
        border-color: #4a6cf7;
        color: #4a6cf7;
      }
      .df-cat-count {
        font-size: 10px;
        opacity: 0.6;
        margin-left: 3px;
      }

      .df-results-meta {
        padding: 4px 16px;
        font-size: 11px;
        color: #5c6078;
        flex-shrink: 0;
      }

      .df-results {
        flex: 1;
        overflow-y: auto;
        padding: 0 8px 8px;
      }
      .df-results::-webkit-scrollbar { width: 4px; }
      .df-results::-webkit-scrollbar-track { background: transparent; }
      .df-results::-webkit-scrollbar-thumb { background: #2a2e3d; border-radius: 2px; }

      .df-result {
        padding: 10px 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.12s;
        margin-top: 2px;
      }
      .df-result:hover {
        background: #1a1d27;
      }
      .df-result-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 2px;
      }
      .df-result-cat {
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        padding: 2px 6px;
        border-radius: 3px;
        font-weight: 600;
        white-space: nowrap;
      }
      .df-result-title {
        font-size: 14px;
        font-weight: 600;
        color: #e8eaed;
      }
      .df-result-snippet {
        font-size: 12px;
        color: #8b8fa3;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      /* Detail view */
      .df-detail {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
      }
      .df-detail::-webkit-scrollbar { width: 4px; }
      .df-detail::-webkit-scrollbar-track { background: transparent; }
      .df-detail::-webkit-scrollbar-thumb { background: #2a2e3d; border-radius: 2px; }

      .df-detail-back {
        font-size: 12px;
        color: #4a6cf7;
        cursor: pointer;
        margin-bottom: 12px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        border: none;
        background: none;
        font-family: inherit;
        padding: 0;
      }
      .df-detail-back:hover { text-decoration: underline; }

      .df-detail-title {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 4px;
      }
      .df-detail-cat {
        display: inline-block;
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        padding: 2px 6px;
        border-radius: 3px;
        font-weight: 600;
        margin-bottom: 16px;
      }
      .df-detail-section {
        margin-bottom: 16px;
      }
      .df-detail-section h4 {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #5c6078;
        margin-bottom: 6px;
        padding-bottom: 4px;
        border-bottom: 1px solid #2a2e3d;
        font-weight: 500;
      }
      .df-detail-section .df-body {
        font-size: 13px;
        color: #8b8fa3;
        line-height: 1.6;
        white-space: pre-wrap;
        word-wrap: break-word;
        max-height: 200px;
        overflow-y: auto;
      }
      .df-detail-section .df-body.df-expanded {
        max-height: none;
      }
      .df-show-more {
        font-size: 11px;
        color: #4a6cf7;
        cursor: pointer;
        margin-top: 4px;
        border: none;
        background: none;
        font-family: inherit;
        padding: 0;
      }
      .df-show-more:hover { text-decoration: underline; }

      /* Oxide table */
      .df-oxide-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
        font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
      }
      .df-oxide-table th {
        text-align: left;
        padding: 3px 6px;
        border-bottom: 1px solid #2a2e3d;
        color: #5c6078;
        font-weight: 500;
        font-size: 10px;
        text-transform: uppercase;
      }
      .df-oxide-table td {
        padding: 3px 6px;
        border-bottom: 1px solid rgba(42,46,61,0.4);
        color: #8b8fa3;
      }
      .df-oxide-bar {
        display: inline-block;
        height: 3px;
        background: #4a6cf7;
        border-radius: 2px;
        vertical-align: middle;
      }

      /* Alt name pills */
      .df-alt-names { display: flex; flex-wrap: wrap; gap: 4px; }
      .df-alt-pill {
        padding: 2px 6px;
        background: #232733;
        border-radius: 4px;
        font-size: 11px;
        color: #8b8fa3;
        border: 1px solid #2a2e3d;
      }

      /* Similar materials */
      .df-similar-item, .df-related-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 6px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        color: #8b8fa3;
        transition: background 0.12s;
      }
      .df-similar-item:hover, .df-related-item:hover {
        background: #232733;
        color: #e8eaed;
      }
      .df-sim-score {
        font-family: monospace;
        font-size: 11px;
        color: #5c6078;
      }
      .df-related-cat-badge {
        font-size: 9px;
        text-transform: uppercase;
        padding: 1px 5px;
        border-radius: 3px;
        font-weight: 600;
        margin-right: 6px;
      }

      /* Ingredients table */
      .df-recipe-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }
      .df-recipe-table th {
        text-align: left;
        padding: 3px 6px;
        border-bottom: 1px solid #2a2e3d;
        color: #5c6078;
        font-weight: 500;
        font-size: 10px;
        text-transform: uppercase;
      }
      .df-recipe-table td {
        padding: 3px 6px;
        border-bottom: 1px solid rgba(42,46,61,0.4);
        color: #8b8fa3;
      }
      .df-pct-bar {
        display: inline-block;
        height: 3px;
        background: #f7a84a;
        border-radius: 2px;
        vertical-align: middle;
      }

      /* Home view */
      .df-home {
        padding: 20px 16px;
        text-align: center;
      }
      .df-home h3 {
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 4px;
      }
      .df-home p {
        font-size: 12px;
        color: #5c6078;
        margin-bottom: 16px;
      }
      .df-home-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
      }
      .df-home-card {
        background: #1a1d27;
        border: 1px solid #2a2e3d;
        border-radius: 8px;
        padding: 10px 6px;
        cursor: pointer;
        text-align: center;
        transition: all 0.15s;
      }
      .df-home-card:hover {
        border-color: #4a6cf7;
        transform: translateY(-1px);
      }
      .df-home-card .df-hc-count {
        font-size: 16px;
        font-weight: 700;
        font-family: monospace;
      }
      .df-home-card .df-hc-label {
        font-size: 10px;
        color: #8b8fa3;
        margin-top: 2px;
      }

      .df-footer {
        padding: 6px 16px;
        border-top: 1px solid #2a2e3d;
        font-size: 10px;
        color: #5c6078;
        text-align: center;
        flex-shrink: 0;
      }
      .df-footer a { color: #4a6cf7; text-decoration: none; }
      .df-footer a:hover { text-decoration: underline; }

      .df-empty {
        text-align: center;
        padding: 32px 16px;
        color: #5c6078;
        font-size: 13px;
      }

      /* Loading spinner */
      .df-loading {
        text-align: center;
        padding: 24px;
        color: #5c6078;
      }

      /* Responsive */
      @media (max-width: 480px) {
        #df-widget-panel {
          width: calc(100vw - 24px);
          max-height: calc(100vh - 120px);
          right: 12px !important;
          left: 12px !important;
          bottom: 78px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // --- HTML Helpers ---
  function esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function catStyle(cat) {
    const c = CATS[cat] || { color: '#8b8fa3' };
    return `background:${c.color}22;color:${c.color}`;
  }

  function catLabel(cat) {
    return CATS[cat] ? CATS[cat].icon + ' ' + cat : cat;
  }

  // --- API calls ---
  async function apiSearch(q, category, limit) {
    const params = new URLSearchParams({ q, category: category || 'all', limit: limit || 25 });
    const resp = await fetch(`${API_BASE}/api/search?${params}`);
    return resp.json();
  }

  async function apiDetail(pageId) {
    const resp = await fetch(`${API_BASE}/api/detail/${pageId}`);
    return resp.json();
  }

  async function apiStats() {
    const resp = await fetch(`${API_BASE}/api/stats`);
    return resp.json();
  }

  // --- Build DOM ---
  function buildWidget() {
    // Trigger button
    const trigger = document.createElement('button');
    trigger.id = 'df-widget-trigger';
    trigger.innerHTML = '\u{1F50D}<span class="df-badge">DF</span>';
    trigger.title = 'Search Digitalfire Archive';
    trigger.addEventListener('click', togglePanel);

    // Panel
    const panel = document.createElement('div');
    panel.id = 'df-widget-panel';
    panel.innerHTML = `
      <div class="df-header">
        <div class="df-header-title"><span>DF</span> Archive Search</div>
        <button class="df-header-close" id="df-close">&times;</button>
      </div>
      <div class="df-search-wrap" style="position:relative">
        <span class="df-search-icon">\u{1F50E}</span>
        <input type="text" class="df-search-input" id="df-search" 
               placeholder="Search materials, glazes, chemistry..." 
               autocomplete="off" spellcheck="false">
      </div>
      <div class="df-categories" id="df-cats" style="display:none"></div>
      <div class="df-results-meta" id="df-meta" style="display:none"></div>
      <div class="df-results" id="df-results">
        <div class="df-home" id="df-home"></div>
      </div>
      <div class="df-footer">
        Data by <a href="https://digitalfire.com" target="_blank">Tony Hansen</a> &middot; 
        40 years of ceramics science
      </div>
    `;

    document.body.appendChild(trigger);
    document.body.appendChild(panel);

    // Bind events
    panel.querySelector('#df-close').addEventListener('click', closePanel);
    const searchInput = panel.querySelector('#df-search');
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => onSearch(searchInput.value.trim()), 180);
    });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        showHome();
      }
    });

    // Global Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closePanel();
    });

    // Load stats and show home
    loadHome();
  }

  // --- Panel controls ---
  function togglePanel() {
    isOpen ? closePanel() : openPanel();
  }

  function openPanel() {
    isOpen = true;
    const panel = document.getElementById('df-widget-panel');
    panel.classList.add('df-open');
    setTimeout(() => {
      document.getElementById('df-search').focus();
    }, 100);
  }

  function closePanel() {
    isOpen = false;
    document.getElementById('df-widget-panel').classList.remove('df-open');
    detailStack = [];
  }

  // --- Home view ---
  async function loadHome() {
    try {
      const data = await apiStats();
      showHomeWithStats(data);
    } catch (e) {
      document.getElementById('df-home').innerHTML = 
        '<div class="df-empty">Unable to connect to search server</div>';
    }
  }

  function showHomeWithStats(data) {
    const top = (data.categories || []).slice(0, 9);
    let html = `
      <h3>Digitalfire Archive</h3>
      <p>${(data.total || 0).toLocaleString()} entries &middot; Search everything</p>
      <div class="df-home-grid">
    `;
    for (const cat of top) {
      const cfg = CATS[cat.category] || { icon: '\u{1F4C4}', color: '#8b8fa3' };
      html += `
        <div class="df-home-card" onclick="window._dfWidget.browseCategory('${cat.category}')" 
             style="border-color:${cfg.color}22">
          <div class="df-hc-count" style="color:${cfg.color}">${cat.n.toLocaleString()}</div>
          <div class="df-hc-label">${cfg.icon} ${cfg.label || cat.category}</div>
        </div>
      `;
    }
    html += '</div>';
    document.getElementById('df-home').innerHTML = html;
  }

  function showHome() {
    document.getElementById('df-cats').style.display = 'none';
    document.getElementById('df-meta').style.display = 'none';
    document.getElementById('df-results').innerHTML = '<div class="df-home" id="df-home"></div>';
    loadHome();
    detailStack = [];
  }

  // --- Search ---
  async function onSearch(q) {
    currentQuery = q;
    if (!q) {
      showHome();
      return;
    }

    document.getElementById('df-results').innerHTML = '<div class="df-loading">Searching...</div>';
    document.getElementById('df-cats').style.display = 'none';
    document.getElementById('df-meta').style.display = 'none';

    try {
      const data = await apiSearch(q, 'all', 30);
      renderSearchResults(data, q);
    } catch (e) {
      document.getElementById('df-results').innerHTML = 
        '<div class="df-empty">Search failed — check connection</div>';
    }
  }

  function renderSearchResults(data, q, activeCategory) {
    const active = activeCategory || 'all';
    const results = data.results || [];
    const catCounts = data.categories || {};
    const ms = data.ms || 0;

    // Category pills
    const catsEl = document.getElementById('df-cats');
    const total = Object.values(catCounts).reduce((a, b) => a + b, 0);
    let catsHtml = `<button class="df-cat-pill ${active === 'all' ? 'df-active' : ''}" 
      onclick="window._dfWidget.filterCategory('all')">All<span class="df-cat-count">${total}</span></button>`;
    
    const sorted = Object.entries(catCounts).sort((a, b) => b[1] - a[1]);
    for (const [cat, count] of sorted) {
      const cfg = CATS[cat] || { icon: '\u{1F4C4}', label: cat };
      catsHtml += `<button class="df-cat-pill ${active === cat ? 'df-active' : ''}"
        onclick="window._dfWidget.filterCategory('${cat}')">${cfg.icon} ${cfg.label}<span class="df-cat-count">${count}</span></button>`;
    }
    catsEl.innerHTML = catsHtml;
    catsEl.style.display = 'flex';

    // Meta
    const metaEl = document.getElementById('df-meta');
    metaEl.textContent = `${results.length} results in ${ms}ms`;
    metaEl.style.display = 'block';

    // Results
    const resultsEl = document.getElementById('df-results');
    if (results.length === 0) {
      resultsEl.innerHTML = '<div class="df-empty">No results found</div>';
      return;
    }

    // Filter by active category
    const filtered = active === 'all' ? results : results.filter(r => r.category === active);

    let html = '';
    for (const r of filtered) {
      html += `
        <div class="df-result" onclick="window._dfWidget.openDetail(${r.page_id}, '${r.category}')">
          <div class="df-result-header">
            <span class="df-result-cat" style="${catStyle(r.category)}">${catLabel(r.category)}</span>
            <span class="df-result-title">${esc(r.title || 'Untitled')}</span>
          </div>
          <div class="df-result-snippet">${esc(r.snippet || '')}</div>
        </div>
      `;
    }
    resultsEl.innerHTML = html;
  }

  // --- Detail View ---
  async function openDetail(pageId, category) {
    detailStack.push({ query: currentQuery });

    const resultsEl = document.getElementById('df-results');
    resultsEl.innerHTML = '<div class="df-loading">Loading...</div>';

    try {
      const data = await apiDetail(pageId);
      renderDetail(data, category);
    } catch (e) {
      resultsEl.innerHTML = '<div class="df-empty">Failed to load detail</div>';
    }
  }

  function renderDetail(data, category) {
    const page = data.page || {};
    const cat = category || page.category;
    const cfg = CATS[cat] || { icon: '\u{1F4C4}', color: '#8b8fa3' };

    // Hide category pills and meta
    document.getElementById('df-cats').style.display = 'none';
    document.getElementById('df-meta').style.display = 'none';

    let html = `<div class="df-detail">`;
    html += `<button class="df-detail-back" onclick="window._dfWidget.goBack()">\u2190 Back to results</button>`;
    html += `<div class="df-detail-title">${esc(page.title || 'Untitled')}</div>`;
    html += `<span class="df-detail-cat" style="${catStyle(cat)}">${catLabel(cat)}</span>`;

    // Material detail
    if (cat === 'material') {
      // Description
      if (data.info && data.info.length && data.info[0].description) {
        html += `<div class="df-detail-section"><h4>Description</h4>
          <div class="df-body">${esc(data.info[0].description)}</div></div>`;
      }

      // Alt names
      if (data.alt_names && data.alt_names.length) {
        html += `<div class="df-detail-section"><h4>Also Known As</h4>
          <div class="df-alt-names">${data.alt_names.map(a => `<span class="df-alt-pill">${esc(a.alt_name)}</span>`).join('')}</div></div>`;
      }

      // Oxides
      if (data.oxides && data.oxides.length) {
        const maxPct = Math.max(...data.oxides.map(o => o.percent || 0));
        html += `<div class="df-detail-section"><h4>Oxide Analysis</h4>
          <table class="df-oxide-table"><tr><th>Oxide</th><th>%</th><th></th></tr>`;
        for (const o of data.oxides) {
          const barW = maxPct > 0 ? ((o.percent / maxPct) * 100) : 0;
          html += `<tr><td>${esc(o.oxide)}</td>
            <td>${o.percent != null ? o.percent.toFixed(2) : '-'}</td>
            <td><span class="df-oxide-bar" style="width:${barW}px"></span></td></tr>`;
        }
        html += `</table></div>`;
      }

      // Similar materials
      if (data.similar && data.similar.length) {
        html += `<div class="df-detail-section"><h4>Similar Materials (by chemistry)</h4>`;
        for (const s of data.similar) {
          const pct = (s.similarity * 100).toFixed(1);
          html += `<div class="df-similar-item" onclick="window._dfWidget.searchFor('${esc(s.similar_name)}')">
            <span>${esc(s.similar_name)}</span>
            <span class="df-sim-score">${pct}%</span></div>`;
        }
        html += `</div>`;
      }

      // Content
      if (data.content && data.content.length && data.content[0].body_text) {
        html += `<div class="df-detail-section"><h4>Full Article</h4>
          <div class="df-body" id="df-body-text">${esc(data.content[0].body_text)}</div>
          <button class="df-show-more" onclick="document.getElementById('df-body-text').classList.toggle('df-expanded');this.textContent=this.textContent==='Show more'?'Show less':'Show more'">Show more</button></div>`;
      }

    // Glossary detail
    } else if (cat === 'glossary') {
      if (data.definition && data.definition.length && data.definition[0].definition) {
        html += `<div class="df-detail-section"><h4>Definition</h4>
          <div class="df-body">${esc(data.definition[0].definition)}</div></div>`;
      }
      if (data.content && data.content.length && data.content[0].body_text) {
        html += `<div class="df-detail-section"><h4>Full Article</h4>
          <div class="df-body" id="df-body-text">${esc(data.content[0].body_text)}</div>
          <button class="df-show-more" onclick="document.getElementById('df-body-text').classList.toggle('df-expanded');this.textContent=this.textContent==='Show more'?'Show less':'Show more'">Show more</button></div>`;
      }

    // Recipe detail
    } else if (cat === 'recipe') {
      if (data.firing && data.firing.length) {
        const f = data.firing[0];
        let ft = '';
        if (f.cone) ft += `Cone ${f.cone}`;
        if (f.atmosphere) ft += ` \u00B7 ${f.atmosphere}`;
        if (f.temperature_c) ft += ` \u00B7 ${f.temperature_c}\u00B0C`;
        if (ft) {
          html += `<div class="df-detail-section"><h4>Firing</h4>
            <div style="font-size:14px;font-weight:600;color:${cfg.color}">${ft}</div></div>`;
        }
      }
      if (data.ingredients && data.ingredients.length) {
        const maxPct = Math.max(...data.ingredients.map(i => i.percent || 0));
        html += `<div class="df-detail-section"><h4>Recipe</h4>
          <table class="df-recipe-table"><tr><th>Material</th><th>Amount</th><th>%</th><th></th></tr>`;
        for (const ing of data.ingredients) {
          const barW = maxPct > 0 ? ((ing.percent / maxPct) * 100) : 0;
          html += `<tr>
            <td><span style="cursor:pointer;color:#e8a838" onclick="window._dfWidget.searchFor('${esc(ing.material)}')">${esc(ing.material)}</span></td>
            <td>${ing.amount || ''}</td>
            <td>${ing.percent != null ? ing.percent.toFixed(1) : '-'}</td>
            <td><span class="df-pct-bar" style="width:${barW}px"></span></td></tr>`;
        }
        html += `</table></div>`;
      }
      if (data.content && data.content.length && data.content[0].body_text) {
        html += `<div class="df-detail-section"><h4>Full Article</h4>
          <div class="df-body" id="df-body-text">${esc(data.content[0].body_text)}</div>
          <button class="df-show-more" onclick="document.getElementById('df-body-text').classList.toggle('df-expanded');this.textContent=this.textContent==='Show more'?'Show less':'Show more'">Show more</button></div>`;
      }

    // Generic detail
    } else {
      if (data.content && data.content.length) {
        const c = data.content[0];
        if (c.caption) {
          html += `<div class="df-detail-section"><h4>Caption</h4>
            <div class="df-body">${esc(c.caption)}</div></div>`;
        }
        const bodyText = c.body_text || c.body || '';
        if (bodyText) {
          html += `<div class="df-detail-section"><h4>Content</h4>
            <div class="df-body" id="df-body-text">${esc(bodyText)}</div>
            <button class="df-show-more" onclick="document.getElementById('df-body-text').classList.toggle('df-expanded');this.textContent=this.textContent==='Show more'?'Show less':'Show more'">Show more</button></div>`;
        }
      }
    }

    // Related content
    if (data.related && data.related.length) {
      html += `<div class="df-detail-section"><h4>Related</h4>`;
      for (const r of data.related) {
        const rcfg = CATS[r.related_category] || { icon: '\u{1F4C4}', color: '#8b8fa3' };
        html += `<div class="df-related-item" onclick="window._dfWidget.searchFor('${esc(r.related_title)}')">
          <span><span class="df-related-cat-badge" style="${catStyle(r.related_category)}">${rcfg.icon}</span>${esc(r.related_title)}</span></div>`;
      }
      html += `</div>`;
    }

    // Link to original
    if (page.url) {
      html += `<div class="df-detail-section" style="margin-top:20px">
        <a href="https://digitalfire.com${page.url}" target="_blank" 
           style="font-size:12px;color:#4a6cf7;text-decoration:none">
          View on digitalfire.com \u2192</a></div>`;
    }

    html += `</div>`;

    document.getElementById('df-results').innerHTML = html;
  }

  function goBack() {
    detailStack.pop();
    if (currentQuery) {
      onSearch(currentQuery);
    } else {
      showHome();
    }
  }

  function searchFor(term) {
    const input = document.getElementById('df-search');
    input.value = term;
    currentQuery = term;
    onSearch(term);
  }

  async function browseCategory(cat) {
    const input = document.getElementById('df-search');
    input.value = '';
    currentQuery = '';

    // Search with wildcard for this category
    document.getElementById('df-results').innerHTML = '<div class="df-loading">Loading...</div>';
    
    try {
      // Use a broad search to get items from this category
      const data = await apiSearch('*', cat, 50);
      if (data.results.length === 0) {
        // Fallback: search by category name
        const data2 = await apiSearch(cat, cat, 50);
        renderSearchResults(data2, cat, cat);
      } else {
        renderSearchResults(data, cat, cat);
      }
    } catch (e) {
      document.getElementById('df-results').innerHTML = 
        '<div class="df-empty">Failed to load category</div>';
    }
  }

  function filterCategory(cat) {
    if (!currentQuery) return;
    apiSearch(currentQuery, cat === 'all' ? 'all' : cat, 30).then(data => {
      renderSearchResults(data, currentQuery, cat);
    });
  }

  // --- Public API (for onclick handlers) ---
  window._dfWidget = {
    openDetail,
    goBack,
    searchFor,
    browseCategory,
    filterCategory,
    toggle: togglePanel,
    open: openPanel,
    close: closePanel,
  };

  // --- Initialize ---
  function init() {
    injectStyles();
    buildWidget();
    console.log('[Digitalfire Widget] Ready — API:', API_BASE);
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
