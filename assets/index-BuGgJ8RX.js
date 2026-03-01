import{r,j as t}from"./vendor-react-D0vdeqNS.js";import{k as E,b as A,w as D}from"./index-DFhyK2mv.js";import{D as z}from"./data-digitalfire-CCT-bSzB.js";import{u as G}from"./vendor-router-DjLFn5nj.js";import"./vendor-state-DTYbmM1J.js";const I={page:"Pages",glaze:"Glazes",knowledge:"Digitalfire Reference"},O={page:"→",glaze:"◆",knowledge:"📖"},T={oxide:"#e67e22",material:"#27ae60",glossary:"#3498db",trouble:"#e74c3c",article:"#9b59b6",test:"#1abc9c"};function B(){const d=G(),h=r.useRef(null),p=r.useRef(null),b=E(e=>e.setSelectedGlaze),v=A(e=>e.getGlazesArray),{open:m,query:x,setQuery:j,close:i,grouped:n,flatResults:s,selectedIndex:a,setSelectedIndex:N,handleKeyDown:y}=D();r.useEffect(()=>{m&&requestAnimationFrame(()=>{var e;return(e=h.current)==null?void 0:e.focus()})},[m]),r.useEffect(()=>{if(!p.current)return;const e=p.current.querySelector('[data-selected="true"]');e==null||e.scrollIntoView({block:"nearest"})},[a]);const u=r.useCallback(e=>{switch(i(),e.category){case"page":d(e.action);break;case"glaze":{const o=v().find(c=>c.id===e.action);o&&(d("/"),setTimeout(()=>{b(o)},100));break}case"knowledge":window.open(e.action,"_blank","noopener,noreferrer");break}},[i,d,v,b]),R=r.useCallback(e=>{y(e),e.key==="Enter"&&s[a]&&(e.preventDefault(),u(s[a]))},[y,s,a,u]);if(!m)return null;const C=s.length>0,w=x.trim().length>=2,S=n.knowledge.length>0,l=[];n.page.length&&l.push({category:"page",items:n.page}),n.glaze.length&&l.push({category:"glaze",items:n.glaze}),n.knowledge.length&&l.push({category:"knowledge",items:n.knowledge});let k=0;return t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"omni-backdrop",onClick:i}),t.jsxs("div",{className:"omni-container",role:"dialog","aria-label":"Search",children:[t.jsxs("div",{className:"omni-input-row",children:[t.jsx("span",{className:"omni-search-icon",children:"⌘K"}),t.jsx("input",{ref:h,type:"text",className:"omni-input",placeholder:"Search glazes, materials, oxides, articles...",value:x,onChange:e=>j(e.target.value),onKeyDown:R,autoComplete:"off",spellCheck:!1}),t.jsx("button",{className:"omni-close",onClick:i,"aria-label":"Close search",children:"Esc"})]}),t.jsxs("div",{className:"omni-results",ref:p,children:[!w&&t.jsx("div",{className:"omni-hint",children:"Type to search across glazes, Digitalfire materials, oxides, glossary, and more."}),w&&!C&&t.jsxs("div",{className:"omni-empty",children:['No results for "',x,'"']}),l.map(e=>{const g=k;return t.jsxs("div",{className:"omni-section",children:[t.jsxs("div",{className:"omni-section-label",children:[t.jsx("span",{children:O[e.category]}),I[e.category]]}),e.items.map((o,c)=>{const f=g+c;return c===e.items.length-1&&(k=g+e.items.length),t.jsxs("button",{className:`omni-result${f===a?" selected":""}`,"data-selected":f===a,onClick:()=>u(o),onMouseEnter:()=>N(f),children:[t.jsxs("div",{className:"omni-result-main",children:[t.jsx("span",{className:"omni-result-title",children:o.title}),o.badge&&t.jsx("span",{className:"omni-badge",style:{background:T[o.badge]||"var(--bg-input)"},children:o.badge})]}),o.subtitle&&t.jsx("div",{className:"omni-result-subtitle",children:o.subtitle}),t.jsx("span",{className:"omni-result-action",children:o.category==="knowledge"?"↗":"↵"})]},o.id)})]},e.category)}),S&&t.jsxs("div",{className:"omni-attribution",children:[z.text," ·"," ",t.jsx("a",{href:z.url,target:"_blank",rel:"noopener noreferrer",children:"digitalfire.com"})]})]}),t.jsx("style",{children:`
          .omni-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9998;
            animation: omni-fade-in 0.12s ease;
          }

          .omni-container {
            position: fixed;
            top: min(20vh, 140px);
            left: 50%;
            transform: translateX(-50%);
            width: min(640px, calc(100vw - 32px));
            max-height: 70vh;
            background: var(--bg-secondary);
            border: 1px solid var(--border-secondary);
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            animation: omni-slide-in 0.15s ease;
            overflow: hidden;
          }

          .omni-input-row {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 14px 16px;
            border-bottom: 1px solid var(--border-primary);
          }

          .omni-search-icon {
            font-size: 11px;
            font-weight: 700;
            color: var(--text-muted);
            background: var(--bg-input);
            border: 1px solid var(--border-secondary);
            border-radius: 5px;
            padding: 3px 7px;
            white-space: nowrap;
            flex-shrink: 0;
          }

          .omni-input {
            flex: 1;
            background: none;
            border: none;
            outline: none;
            font-size: 16px;
            color: var(--text-primary);
            font-family: var(--font-body);
          }

          .omni-input::placeholder {
            color: var(--text-muted);
          }

          .omni-close {
            font-size: 11px;
            font-weight: 600;
            color: var(--text-muted);
            background: var(--bg-input);
            border: 1px solid var(--border-secondary);
            border-radius: 5px;
            padding: 3px 8px;
            cursor: pointer;
            flex-shrink: 0;
            transition: all 0.12s;
          }

          .omni-close:hover {
            color: var(--text-primary);
            border-color: var(--accent);
          }

          .omni-results {
            overflow-y: auto;
            flex: 1;
            padding: 6px 0;
          }

          .omni-hint,
          .omni-empty {
            padding: 24px 20px;
            text-align: center;
            color: var(--text-muted);
            font-size: 14px;
          }

          .omni-section {
            padding: 4px 0;
          }

          .omni-section-label {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 16px 4px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
          }

          .omni-result {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            padding: 8px 16px;
            background: none;
            border: none;
            text-align: left;
            cursor: pointer;
            font-family: var(--font-body);
            transition: background 0.08s;
            color: var(--text-primary);
          }

          .omni-result:hover,
          .omni-result.selected {
            background: var(--bg-elevated);
          }

          .omni-result.selected {
            border-left: 2px solid var(--accent);
            padding-left: 14px;
          }

          .omni-result-main {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 1;
            min-width: 0;
          }

          .omni-result-title {
            font-size: 14px;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .omni-badge {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: #fff;
            padding: 1px 6px;
            border-radius: 4px;
            flex-shrink: 0;
          }

          .omni-result-subtitle {
            font-size: 12px;
            color: var(--text-muted);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 220px;
            flex-shrink: 1;
          }

          .omni-result-action {
            font-size: 14px;
            color: var(--text-dim);
            flex-shrink: 0;
            margin-left: auto;
          }

          .omni-attribution {
            padding: 8px 16px;
            font-size: 11px;
            color: var(--text-dim);
            border-top: 1px solid var(--border-subtle);
            text-align: center;
          }

          .omni-attribution a {
            color: var(--text-link);
            text-decoration: none;
          }

          .omni-attribution a:hover {
            text-decoration: underline;
          }

          @keyframes omni-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes omni-slide-in {
            from { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.98); }
            to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
          }

          @media (max-width: 640px) {
            .omni-container {
              top: 12px;
              border-radius: 8px;
            }

            .omni-result-subtitle {
              display: none;
            }
          }
        `})]})]})}export{B as OmniSearch,B as default};
