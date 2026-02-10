/**
 * StullAtlas Explorer Styles
 * 
 * Extracted from StullAtlas/index.tsx for maintainability.
 */

export const explorerStyles = `
  .stull-explorer {
    display: flex;
    flex: 1;
    overflow: hidden;
  }
  
  .controls-panel {
    width: 280px;
    padding: 16px;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border-primary);
    overflow-y: auto;
  }
  
  .control-group {
    margin-bottom: 20px;
  }
  
  .control-group h3 {
    margin: 0 0 12px 0;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-secondary);
  }
  
  .axis-controls {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .axis-controls label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
    color: var(--text-label);
  }
  
  .axis-controls select,
  .color-select {
    padding: 8px 10px;
    background: var(--bg-input);
    border: 1px solid var(--border-secondary);
    border-radius: 6px;
    color: var(--text-bright);
    font-size: 14px;
  }
  
  .zoom-control {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .zoom-control input[type="range"] {
    flex: 1;
    height: 4px;
    -webkit-appearance: none;
    background: var(--border-secondary);
    border-radius: 2px;
  }
  
  .zoom-control input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    background: var(--text-bright);
    border-radius: 50%;
    cursor: pointer;
  }
  
  .zoom-value {
    font-size: 12px;
    color: var(--text-secondary);
    min-width: 32px;
  }
  
  .reset-zoom {
    margin-top: 8px;
    padding: 6px 12px;
    background: var(--bg-input);
    border: 1px solid var(--border-secondary);
    border-radius: 4px;
    color: var(--text-label);
    font-size: 12px;
    cursor: pointer;
  }
  
  .reset-zoom:hover {
    background: var(--border-secondary);
    color: var(--text-bright);
  }
  
  .view-toggle {
    width: 100%;
    padding: 8px 12px;
    background: var(--bg-input);
    border: 1px solid var(--border-secondary);
    border-radius: 6px;
    color: var(--text-label);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.15s;
    margin-bottom: 8px;
  }
  
  .view-toggle:hover {
    background: var(--border-secondary);
    color: var(--text-bright);
  }
  
  .view-toggle.active {
    background: var(--accent-bg);
    border-color: var(--accent);
    color: var(--text-bright);
  }
  
  .z-axis-control {
    margin-top: 8px;
  }
  
  .z-axis-control label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
    color: var(--text-label);
  }
  
  .z-axis-control select {
    padding: 8px 10px;
    background: var(--bg-input);
    border: 1px solid var(--border-secondary);
    border-radius: 6px;
    color: var(--text-bright);
    font-size: 14px;
  }

  /* 3D-specific controls */

  .three-d-extras {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .surface-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--text-label);
    cursor: pointer;
  }

  .surface-toggle input[type="checkbox"] {
    accent-color: var(--accent);
  }

  .surface-opacity {
    display: grid;
    grid-template-columns: 50px 1fr 36px;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text-secondary);
    padding-left: 2px;
  }

  .surface-opacity input[type="range"] {
    width: 100%;
    height: 4px;
    -webkit-appearance: none;
    background: var(--border-secondary);
    border-radius: 2px;
  }

  .surface-opacity input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: var(--text-bright);
    border-radius: 50%;
    cursor: pointer;
  }

  .opacity-value {
    text-align: right;
    font-variant-numeric: tabular-nums;
    color: var(--text-muted);
    font-size: 11px;
  }

  .camera-presets {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .presets-label {
    font-size: 12px;
    color: var(--text-secondary);
    font-weight: 600;
    text-transform: uppercase;
  }

  .preset-buttons {
    display: flex;
    gap: 4px;
  }

  .preset-btn {
    flex: 1;
    padding: 6px 0;
    background: var(--bg-input);
    border: 1px solid var(--border-secondary);
    border-radius: 4px;
    color: var(--text-label);
    font-size: 16px;
    cursor: pointer;
    transition: all 0.15s;
    text-align: center;
    line-height: 1;
  }

  .preset-btn:hover {
    background: var(--border-secondary);
    color: var(--text-bright);
  }

  .preset-btn.active {
    background: var(--accent-bg);
    border-color: var(--accent);
    color: var(--text-bright);
  }

  /* 3D compact control rows */

  .three-d-control-row {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .control-row-label {
    font-size: 12px;
    color: var(--text-secondary);
    font-weight: 600;
  }

  .inline-slider {
    display: grid;
    grid-template-columns: 1fr 36px;
    align-items: center;
    gap: 6px;
  }

  .inline-slider input[type="range"] {
    width: 100%;
    height: 4px;
    -webkit-appearance: none;
    background: var(--border-secondary);
    border-radius: 2px;
  }

  .inline-slider input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: var(--text-bright);
    border-radius: 50%;
    cursor: pointer;
  }

  .slider-value {
    text-align: right;
    font-variant-numeric: tabular-nums;
    color: var(--text-muted);
    font-size: 11px;
  }

  .three-d-shortcuts-hint {
    margin-top: 10px;
    padding: 6px 8px;
    background: var(--bg-tertiary);
    border-radius: 4px;
    font-size: 10px;
    line-height: 1.5;
    color: var(--text-muted);
  }

  .three-d-shortcuts-hint kbd {
    display: inline-block;
    padding: 1px 4px;
    background: var(--bg-input);
    border: 1px solid var(--border-secondary);
    border-radius: 3px;
    font-size: 10px;
    font-family: inherit;
    color: var(--text-label);
    min-width: 16px;
    text-align: center;
  }

  /* Proximity nearby ranked list */
  .proximity-nearby-list {
    margin-top: 10px;
    border-top: 1px solid var(--border-secondary);
    padding-top: 8px;
  }

  .proximity-nearby-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 11px;
    font-weight: 600;
    color: var(--text-label);
  }

  .proximity-axis-label {
    font-size: 10px;
    font-weight: 400;
    color: var(--text-muted);
  }

  .proximity-nearby-scroll {
    max-height: 240px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .proximity-nearby-scroll::-webkit-scrollbar {
    width: 4px;
  }
  .proximity-nearby-scroll::-webkit-scrollbar-thumb {
    background: var(--border-secondary);
    border-radius: 2px;
  }

  .proximity-nearby-item {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    padding: 4px 6px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    font-size: 11px;
    color: var(--text-primary);
    text-align: left;
    transition: background 0.1s, border-color 0.1s;
  }

  .proximity-nearby-item:hover {
    background: var(--bg-tertiary);
    border-color: var(--border-secondary);
  }

  .proximity-nearby-item:active {
    background: var(--bg-input);
  }

  .proximity-nearby-item.active {
    background: var(--bg-tertiary);
    border-color: var(--accent-primary, #6366f1);
    box-shadow: inset 2px 0 0 var(--accent-primary, #6366f1);
  }

  .proximity-nearby-item.hovered {
    background: var(--bg-tertiary);
    border-color: rgba(250, 204, 21, 0.5);
    box-shadow: inset 2px 0 0 #facc15;
  }

  .proximity-nearby-rank {
    flex-shrink: 0;
    width: 18px;
    font-size: 10px;
    color: var(--text-muted);
    text-align: right;
  }

  .proximity-nearby-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .proximity-nearby-cone {
    flex-shrink: 0;
    font-size: 9px;
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
    opacity: 0.7;
  }

  .proximity-nearby-surface {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    border-radius: 3px;
    font-size: 8px;
    font-weight: 700;
    line-height: 14px;
    text-align: center;
    color: var(--bg-primary);
  }
  .proximity-nearby-surface.st-gloss { background: #3b82f6; }
  .proximity-nearby-surface.st-matte { background: #22c55e; }
  .proximity-nearby-surface.st-satin { background: #f59e0b; }
  .proximity-nearby-surface.st-crystalline { background: #a855f7; }
  .proximity-nearby-surface.st-crawl { background: #ef4444; }
  .proximity-nearby-surface.st-unknown { background: var(--text-muted); opacity: 0.4; }

  .proximity-nearby-dist {
    flex-shrink: 0;
    font-size: 10px;
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
  }

  .proximity-pin-btn {
    background: transparent;
    border: 1px solid var(--border-secondary);
    border-radius: 3px;
    padding: 1px 5px;
    font-size: 10px;
    cursor: pointer;
    color: var(--text-muted);
    transition: all 0.15s;
    line-height: 1.3;
  }
  .proximity-pin-btn:hover {
    background: var(--bg-tertiary);
    border-color: var(--text-muted);
  }
  .proximity-pin-btn.pinned {
    background: var(--accent-primary, #6366f1);
    border-color: var(--accent-primary, #6366f1);
    color: white;
  }

  .proximity-filter-pills {
    display: flex;
    gap: 3px;
    margin-bottom: 6px;
    flex-wrap: wrap;
  }

  .proximity-pill {
    padding: 1px 6px;
    border-radius: 3px;
    font-size: 9px;
    font-weight: 700;
    border: 1px solid var(--border-secondary);
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.12s;
    line-height: 1.4;
  }
  .proximity-pill:hover {
    border-color: var(--text-muted);
  }
  .proximity-pill.on.st-gloss { background: #3b82f6; color: white; border-color: #3b82f6; }
  .proximity-pill.on.st-matte { background: #22c55e; color: white; border-color: #22c55e; }
  .proximity-pill.on.st-satin { background: #f59e0b; color: white; border-color: #f59e0b; }
  .proximity-pill.on.st-crystalline { background: #a855f7; color: white; border-color: #a855f7; }
  .proximity-pill.on.st-crawl { background: #ef4444; color: white; border-color: #ef4444; }
  .proximity-pill.on.st-unknown { background: var(--text-muted); color: var(--bg-primary); border-color: var(--text-muted); }
  .proximity-pill.clear {
    font-size: 11px;
    padding: 0 4px;
    color: var(--text-muted);
  }
  .proximity-pill.clear:hover {
    color: #ef4444;
    border-color: #ef4444;
  }

  /* Sort buttons */
  .proximity-sort-btns {
    display: flex;
    gap: 1px;
    border: 1px solid var(--border-secondary);
    border-radius: 3px;
    overflow: hidden;
  }
  .proximity-sort-btn {
    background: transparent;
    border: none;
    padding: 1px 5px;
    font-size: 10px;
    cursor: pointer;
    color: var(--text-muted);
    transition: all 0.1s;
    line-height: 1.3;
  }
  .proximity-sort-btn:hover {
    background: var(--bg-tertiary);
  }
  .proximity-sort-btn.on {
    background: var(--bg-input);
    color: var(--text-primary);
    font-weight: 600;
  }

  /* Per-axis similarity bars */
  .proximity-nearby-bars {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
    width: 28px;
    height: 12px;
    justify-content: center;
  }
  .sim-bar {
    display: block;
    height: 3px;
    border-radius: 1px;
    min-width: 1px;
    transition: width 0.2s;
  }
  .sim-bar.bar-x { background: #3b82f6; }
  .sim-bar.bar-y { background: #22c55e; }
  .sim-bar.bar-z { background: #f59e0b; }

  /* Similarity legend */
  .proximity-nearby-legend {
    display: flex;
    gap: 8px;
    margin-top: 4px;
    padding: 3px 0;
    font-size: 9px;
    color: var(--text-muted);
  }
  .sim-legend-item {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .sim-dot {
    display: inline-block;
    width: 6px;
    height: 3px;
    border-radius: 1px;
  }
  .sim-dot.dot-x { background: #3b82f6; }
  .sim-dot.dot-y { background: #22c55e; }
  .sim-dot.dot-z { background: #f59e0b; }

  /* Mini UMF preview card */
  .proximity-preview {
    margin-top: 6px;
    padding: 8px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-secondary);
    border-radius: 6px;
    animation: fadeSlideIn 0.15s ease;
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .proximity-preview-name {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .proximity-preview-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }
  .proximity-preview-meta {
    display: flex;
    gap: 8px;
    font-size: 10px;
    color: var(--text-muted);
    flex-wrap: wrap;
  }

  /* Exploration breadcrumb */
  .proximity-breadcrumb {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 3px 0 6px;
    overflow-x: auto;
    white-space: nowrap;
    font-size: 10px;
  }
  .proximity-breadcrumb::-webkit-scrollbar { height: 2px; }
  .proximity-breadcrumb::-webkit-scrollbar-thumb { background: var(--border-secondary); border-radius: 1px; }
  .breadcrumb-arrow {
    color: var(--text-muted);
    font-size: 12px;
    flex-shrink: 0;
  }
  .breadcrumb-btn {
    background: transparent;
    border: 1px solid var(--border-secondary);
    border-radius: 3px;
    padding: 1px 5px;
    font-size: 10px;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.1s;
    white-space: nowrap;
    max-width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 0;
  }
  .breadcrumb-btn:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    border-color: var(--text-muted);
  }

  .plot-container {
    flex: 1;
    min-width: 0;
  }
  
  .detail-panel {
    width: 320px;
    padding: 16px;
    background: var(--bg-secondary);
    border-left: 1px solid var(--border-primary);
    overflow-y: auto;
    position: relative;
  }
  
  .close-sidebar {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 28px;
    height: 28px;
    background: var(--bg-input);
    border: none;
    border-radius: 4px;
    color: var(--text-secondary);
    font-size: 18px;
    cursor: pointer;
  }
  
  .close-sidebar:hover {
    background: var(--border-secondary);
    color: var(--text-bright);
  }
  
  .glaze-detail h2 {
    margin: 0 0 16px 0;
    font-size: 18px;
    padding-right: 32px;
  }
  
  .detail-section {
    margin-bottom: 20px;
  }
  
  .detail-section h4 {
    margin: 0 0 8px 0;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-secondary);
  }
  
  .detail-section p {
    margin: 0 0 4px 0;
    font-size: 14px;
  }
  
  .detail-section a {
    font-size: 13px;
    color: var(--accent);
    text-decoration: none;
  }
  
  .detail-section a:hover {
    text-decoration: underline;
  }
  
  .recipe-table {
    width: 100%;
    font-size: 13px;
    border-collapse: collapse;
  }
  
  .recipe-table td {
    padding: 6px 0;
    border-bottom: 1px solid var(--border-primary);
  }
  
  .recipe-table .amount {
    text-align: right;
    color: var(--text-secondary);
  }
  
  .no-selection {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: var(--text-muted);
    font-size: 14px;
  }
  
  .sidebar-tabs {
    display: flex;
    gap: 2px;
    margin-bottom: 16px;
    padding-right: 32px;
  }
  
  .sidebar-tab {
    flex: 1;
    padding: 6px 12px;
    background: transparent;
    border: 1px solid var(--border-secondary);
    border-radius: 4px;
    color: var(--text-secondary);
    font-size: 12px;
    cursor: pointer;
  }
  
  .sidebar-tab:hover {
    color: var(--text-label);
    border-color: var(--text-muted);
  }
  
  .sidebar-tab.active {
    background: var(--accent-bg);
    border-color: var(--accent);
    color: var(--text-bright);
  }

  .add-compare-btn {
    width: 100%;
    padding: 8px 12px;
    margin-top: 12px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-secondary);
    border-radius: 6px;
    color: var(--text-label);
    font-size: 13px;
    cursor: pointer;
    transition: all 0.15s;
  }

  .add-compare-btn:hover:not(:disabled) {
    background: var(--accent-bg);
    border-color: var(--accent);
    color: var(--text-bright);
  }

  .add-compare-btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .compare-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    color: var(--text-muted);
    font-size: 14px;
    text-align: center;
    padding: 20px;
  }

  .compare-clear-btn {
    padding: 4px 8px;
    background: var(--bg-input);
    border: 1px solid var(--border-secondary);
    border-radius: 4px;
    color: var(--text-secondary);
    font-size: 11px;
    cursor: pointer;
  }

  .compare-clear-btn:hover {
    background: var(--border-secondary);
    color: var(--text-bright);
  }

  .compare-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }

  .compare-table th {
    padding: 4px 6px;
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    color: var(--text-primary);
    border-bottom: 2px solid var(--border-secondary);
    position: relative;
    max-width: 100px;
    vertical-align: bottom;
  }

  .compare-name-btn {
    background: none;
    border: none;
    color: var(--text-link);
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    text-align: center;
    word-break: break-word;
  }

  .compare-name-btn:hover {
    text-decoration: underline;
  }

  .compare-remove {
    position: absolute;
    top: 2px;
    right: 2px;
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 14px;
    cursor: pointer;
    padding: 0 2px;
    line-height: 1;
  }

  .compare-remove:hover {
    color: var(--danger);
  }

  .compare-table td {
    padding: 3px 6px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .compare-table td:first-child {
    color: var(--text-secondary);
    white-space: nowrap;
    font-size: 11px;
  }

  .compare-value {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  .compare-meta-row td {
    font-size: 12px;
  }

  .compare-group-row td {
    color: var(--text-muted) !important;
    font-weight: 600;
    font-size: 10px !important;
    text-transform: uppercase;
    padding-top: 10px !important;
    border-bottom: 1px solid var(--border-secondary) !important;
  }

  /* ── Filter Panel ── */
  .filter-panel h3 {
    margin-bottom: 8px !important;
  }

  .filter-badge {
    background: var(--accent-primary, #4a9eff);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    min-width: 18px;
    height: 18px;
    border-radius: 9px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    text-transform: none;
  }

  .filter-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .filter-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .filter-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .filter-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .filter-chip {
    padding: 3px 8px;
    font-size: 11px;
    border: 1px solid var(--border-secondary);
    border-radius: 12px;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.12s;
    text-transform: capitalize;
  }

  .filter-chip:hover {
    border-color: var(--accent-primary, #4a9eff);
    color: var(--text-bright);
  }

  .filter-chip.active {
    background: var(--accent-primary, #4a9eff);
    border-color: var(--accent-primary, #4a9eff);
    color: #fff;
  }

  .cone-range-inputs {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .cone-input {
    width: 56px;
    padding: 4px 6px;
    font-size: 12px;
    background: var(--bg-input);
    border: 1px solid var(--border-secondary);
    border-radius: 4px;
    color: var(--text-bright);
    text-align: center;
  }

  .cone-input:focus {
    outline: none;
    border-color: var(--accent-primary, #4a9eff);
  }

  .filter-flag {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text-secondary);
    cursor: pointer;
  }

  .filter-flag:hover {
    color: var(--text-bright);
  }

  .filter-clear {
    padding: 5px 0;
    font-size: 11px;
    color: var(--accent-primary, #4a9eff);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }

  .filter-clear:hover {
    text-decoration: underline;
  }

  /* ─── Aesthetic Compass ──────────────────────────────────── */

  .aesthetic-compass {
    margin-top: 6px;
    border: 1px solid var(--border-color, #333);
    border-radius: 6px;
    overflow: hidden;
  }

  .compass-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    padding: 6px 8px;
    background: var(--bg-secondary, #1e1e1e);
    border: none;
    color: var(--text-primary, #ccc);
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
  }
  .compass-toggle:hover {
    background: var(--bg-hover, #2a2a2a);
  }
  .compass-toggle.open {
    border-bottom: 1px solid var(--border-color, #333);
  }
  .compass-icon {
    font-size: 13px;
  }
  .compass-active-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #f59e0b;
    flex-shrink: 0;
  }
  .compass-chevron {
    margin-left: auto;
    font-size: 10px;
    opacity: 0.5;
  }

  .compass-body {
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    animation: fadeSlideIn 0.15s ease;
  }

  /* Presets row */
  .compass-presets {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  .compass-preset-btn {
    padding: 3px 7px;
    font-size: 10px;
    border-radius: 10px;
    border: 1px solid var(--border-color, #444);
    background: transparent;
    color: var(--text-secondary, #999);
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
  }
  .compass-preset-btn:hover {
    border-color: var(--accent-primary, #4a9eff);
    color: var(--text-primary, #ccc);
  }
  .compass-preset-btn.active {
    background: var(--accent-primary, #4a9eff);
    color: #fff;
    border-color: var(--accent-primary, #4a9eff);
  }

  /* Sliders */
  .compass-sliders {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .compass-slider-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .compass-slider-label {
    font-size: 10px;
    font-weight: 600;
    width: 42px;
    flex-shrink: 0;
    text-align: right;
  }
  .compass-slider {
    flex: 1;
    height: 3px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--border-color, #333);
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }
  .compass-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--slider-color, #4a9eff);
    border: 2px solid var(--bg-primary, #1a1a1a);
    cursor: pointer;
    transition: transform 0.1s;
  }
  .compass-slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }
  .compass-slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--slider-color, #4a9eff);
    border: 2px solid var(--bg-primary, #1a1a1a);
    cursor: pointer;
  }
  .compass-slider-val {
    font-size: 9px;
    color: var(--text-tertiary, #666);
    width: 28px;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  /* Reset */
  .compass-reset-btn {
    padding: 3px 0;
    font-size: 10px;
    color: var(--accent-primary, #4a9eff);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    opacity: 0.8;
  }
  .compass-reset-btn:hover {
    opacity: 1;
    text-decoration: underline;
  }
`
