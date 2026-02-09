/**
 * Shared Calculator Page Styles
 */

export const calcStyles = `
  .calc-page {
    display: flex;
    flex: 1;
    overflow: hidden;
    background: var(--bg-primary);
    color: var(--text-primary);
  }

  .calc-sidebar {
    width: 360px;
    padding: 20px;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border-primary);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .calc-main {
    flex: 1;
    min-width: 0;
    overflow: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .calc-section {
    margin-bottom: 4px;
  }

  .calc-section h3 {
    margin: 0 0 12px 0;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-secondary);
    letter-spacing: 0.5px;
  }

  .calc-section h2 {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
  }

  .calc-section .subtitle {
    margin: 0 0 16px 0;
    font-size: 13px;
    color: var(--text-secondary);
  }

  /* Recipe Input Styles */
  .recipe-input {
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
  }

  .recipe-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    gap: 8px;
  }

  .recipe-label {
    border-left: 3px solid var(--accent, #6366F1);
    padding-left: 8px;
    flex: 1;
  }

  .name-input {
    background: transparent;
    border: none;
    color: var(--text-bright);
    font-size: 15px;
    font-weight: 600;
    width: 100%;
    padding: 2px 0;
  }

  .name-input::placeholder {
    color: var(--text-muted);
  }

  .recipe-meta {
    display: flex;
    gap: 8px;
  }

  .recipe-meta label {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 11px;
    color: var(--text-muted);
  }

  .recipe-meta select {
    padding: 4px 6px;
    background: var(--bg-input);
    border: 1px solid var(--border-secondary);
    border-radius: 4px;
    color: var(--text-label);
    font-size: 12px;
    width: 60px;
  }

  .ingredients-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .ingredient-row {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .material-input {
    flex: 1;
    padding: 6px 8px;
    background: var(--bg-elevated);
    border: 1px solid var(--border-input);
    border-radius: 4px;
    color: var(--text-primary);
    font-size: 13px;
  }

  .material-input:focus {
    border-color: var(--accent, #6366F1);
    outline: none;
  }

  .amount-input {
    width: 70px;
    padding: 6px 8px;
    background: var(--bg-elevated);
    border: 1px solid var(--border-input);
    border-radius: 4px;
    color: var(--text-primary);
    font-size: 13px;
    text-align: right;
  }

  .amount-input:focus {
    border-color: var(--accent, #6366F1);
    outline: none;
  }

  .remove-btn {
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: var(--text-dim);
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .remove-btn:hover:not(:disabled) {
    color: var(--danger);
    background: var(--bg-elevated);
  }

  .remove-btn:disabled {
    opacity: 0.3;
    cursor: default;
  }

  .recipe-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }

  .add-btn {
    padding: 4px 10px;
    background: transparent;
    border: 1px dashed var(--border-secondary);
    border-radius: 4px;
    color: var(--text-secondary);
    font-size: 12px;
    cursor: pointer;
  }

  .add-btn:hover {
    border-color: var(--text-muted);
    color: var(--text-label);
  }

  .total {
    font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', monospace;
  }

  /* Controls */
  .calc-controls {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .control-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .control-row label {
    font-size: 13px;
    color: var(--text-label);
    min-width: 80px;
  }

  .control-row select,
  .control-row input[type="number"] {
    padding: 6px 10px;
    background: var(--bg-input);
    border: 1px solid var(--border-secondary);
    border-radius: 6px;
    color: var(--text-bright);
    font-size: 14px;
  }

  .control-row input[type="range"] {
    flex: 1;
  }

  .control-row .range-value {
    font-size: 13px;
    color: var(--text-secondary);
    font-family: 'SF Mono', 'Fira Code', monospace;
    min-width: 32px;
    text-align: right;
  }

  /* Calculate button */
  .calc-button {
    width: 100%;
    padding: 12px;
    background: var(--accent-bg);
    border: 1px solid var(--accent);
    border-radius: 8px;
    color: var(--text-bright);
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    margin-top: 8px;
  }

  .calc-button:hover {
    background: var(--accent-hover);
  }

  .calc-button:disabled {
    opacity: 0.4;
    cursor: default;
  }

  /* Point count */
  .point-count {
    text-align: center;
    font-size: 13px;
    color: var(--text-secondary);
    margin-top: 4px;
  }

  .point-count strong {
    color: var(--text-label);
  }

  /* Results table */
  .results-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }

  .results-table th {
    padding: 8px 10px;
    text-align: left;
    border-bottom: 2px solid var(--border-primary);
    color: var(--text-secondary);
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    position: sticky;
    top: 0;
    background: var(--bg-secondary);
  }

  .results-table td {
    padding: 6px 10px;
    border-bottom: 1px solid var(--border-subtle);
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 12px;
  }

  .results-table tr:hover td {
    background: var(--bg-hover);
  }

  /* Results area */
  .results-panel {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    overflow: hidden;
  }

  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-primary);
  }

  .results-header h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }

  .results-scroll {
    max-height: 500px;
    overflow-y: auto;
  }

  /* Empty state */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    color: var(--text-dim);
    gap: 12px;
  }

  .empty-state .icon {
    font-size: 48px;
    opacity: 0.5;
  }

  .empty-state p {
    font-size: 14px;
    margin: 0;
  }

  /* Blend diagram */
  .blend-diagram {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    min-height: 200px;
  }

  /* Tabs for results view */
  .result-tabs {
    display: flex;
    gap: 2px;
  }

  .result-tab {
    padding: 6px 14px;
    background: transparent;
    border: none;
    color: var(--text-secondary);
    font-size: 13px;
    cursor: pointer;
    border-radius: 4px 4px 0 0;
  }

  .result-tab:hover {
    color: var(--text-label);
  }

  .result-tab.active {
    background: var(--bg-secondary);
    color: var(--text-bright);
  }

  /* Calculators index */
  .calc-index {
    padding: 40px;
    max-width: 900px;
    margin: 0 auto;
  }

  .calc-index h2 {
    font-size: 24px;
    margin: 0 0 8px 0;
  }

  .calc-index .intro {
    color: var(--text-secondary);
    font-size: 15px;
    margin: 0 0 32px 0;
    line-height: 1.5;
  }

  .calc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
  }

  .calc-card {
    display: block;
    padding: 20px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 10px;
    text-decoration: none;
    color: inherit;
    transition: all 0.15s;
  }

  .calc-card:hover {
    border-color: var(--text-dim);
    background: var(--bg-hover);
    transform: translateY(-2px);
  }

  .calc-card .card-icon {
    font-size: 32px;
    margin-bottom: 12px;
  }

  .calc-card h3 {
    margin: 0 0 6px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-bright);
  }

  .calc-card p {
    margin: 0;
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.4;
  }

  .calc-card .card-meta {
    margin-top: 10px;
    font-size: 12px;
    color: var(--text-dim);
  }
`
