import{r as d,j as e}from"./vendor-react-D380Hx73.js";import{getContextualRefs as D,searchKnowledge as P}from"./domain-digitalfire-DfgmtSpv.js";import{D as T}from"./data-digitalfire-CCT-bSzB.js";const F="https://digitalfire.com/";let c=null,L=null,m=null,N=null;function C(){return c!==null}function $(){return N}function w(){return(c==null?void 0:c.length)??0}async function _(){return c||m||(m=(async()=>{try{let t;{const i=await fetch("/data/digitalfire/pages.json");if(!i.ok)throw new Error(`Failed to load library: ${i.status}`);t=await i.json()}c=t.map(a=>({url:a.u.startsWith("http")?a.u:F+a.u,title:a.t??"",category:a.c,description:a.d,body:a.b})),L=new Map;for(const a of c)L.set(a.url,a);return N=null,c}catch(t){throw N=t instanceof Error?t.message:"Unknown error",m=null,t}})(),m)}function A(t,a=20){if(!c||!t.trim())return[];const i=t.toLowerCase().trim(),l=i.split(/\s+/).filter(r=>r.length>=2);if(l.length===0)return[];const f=[];for(const r of c){const s=r.title.toLowerCase(),p=r.body.toLowerCase(),u=(r.description||"").toLowerCase();let o=0;s===i?o+=200:s.startsWith(i)?o+=100:s.includes(i)&&(o+=60),u.includes(i)&&(o+=30);for(const x of l)s.includes(x)&&(o+=15),u.includes(x)&&(o+=8),p.slice(0,2e3).includes(x)?o+=5:p.includes(x)&&(o+=2);o>0&&(o+={glossary:10,trouble:8,article:6,oxide:5,material:4,test:3,recipe:3,hazard:2}[r.category]||0,f.push({page:r,score:o}))}return f.sort((r,s)=>s.score-r.score),f.slice(0,a).map(r=>r.page)}const z={glossary:{icon:"📖",color:"#3498db",label:"Definition"},trouble:{icon:"⚠️",color:"#e67e22",label:"Troubleshooting"},oxide:{icon:"⚗️",color:"#9b59b6",label:"Oxide"},material:{icon:"🪨",color:"#27ae60",label:"Material"},article:{icon:"📄",color:"#2c3e50",label:"Article"},test:{icon:"🔬",color:"#e74c3c",label:"Test"},picture:{icon:"📷",color:"#16a085",label:"Picture"},recipe:{icon:"🧪",color:"#d35400",label:"Recipe"},hazard:{icon:"☠️",color:"#c0392b",label:"Hazard"},typecode:{icon:"🏷️",color:"#7f8c8d",label:"Type"},video:{icon:"🎬",color:"#2980b9",label:"Video"},temperature:{icon:"🌡️",color:"#e74c3c",label:"Temperature"},project:{icon:"🔧",color:"#34495e",label:"Project"},property:{icon:"📊",color:"#8e44ad",label:"Property"},schedule:{icon:"📅",color:"#1abc9c",label:"Schedule"}};function E(t){return z[t]||z.article}function R({ref:t}){const a=E(t.category);return e.jsxs("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",className:"df-ref-card",title:"Read more at Digitalfire",children:[e.jsxs("div",{className:"df-ref-header",children:[e.jsx("span",{className:"df-ref-icon",children:a.icon}),e.jsx("span",{className:"df-ref-title",children:t.title}),e.jsx("span",{className:"df-ref-badge",style:{background:a.color},children:a.label})]}),e.jsx("p",{className:"df-ref-excerpt",children:t.excerpt}),e.jsx("span",{className:"df-ref-link",children:"Read at digitalfire.com →"})]})}function M({page:t}){const[a,i]=d.useState(!1),l=E(t.category),f=t.body.length>300?t.body.slice(0,300).replace(/\s+\S*$/,"")+"...":t.body;return e.jsxs("div",{className:`df-article-card ${a?"expanded":""}`,children:[e.jsxs("div",{className:"df-article-header",onClick:()=>i(!a),role:"button",tabIndex:0,onKeyDown:r=>r.key==="Enter"&&i(!a),children:[e.jsx("span",{className:"df-ref-icon",children:l.icon}),e.jsx("span",{className:"df-ref-title",children:t.title}),e.jsx("span",{className:"df-ref-badge",style:{background:l.color},children:l.label}),e.jsx("span",{className:"df-expand-icon",children:a?"▲":"▼"})]}),a?e.jsxs("div",{className:"df-article-body",children:[e.jsx("pre",{className:"df-article-text",children:t.body}),e.jsx("div",{className:"df-article-footer",children:e.jsx("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",children:"View original at digitalfire.com →"})})]}):e.jsxs("div",{className:"df-article-preview",onClick:()=>i(!0),role:"button",tabIndex:0,onKeyDown:r=>r.key==="Enter"&&i(!0),children:[e.jsx("p",{className:"df-ref-excerpt",children:f}),e.jsx("span",{className:"df-expand-hint",children:"Click to read full article"})]})]})}function H({selectedGlaze:t}){const[a,i]=d.useState(""),[l,f]=d.useState(""),[r,s]=d.useState("context"),[p,u]=d.useState(!1),[o,x]=d.useState(C()),j=d.useMemo(()=>{if(!t)return[];const n=t.umf,b=[];if(n)for(const[g,v]of Object.entries(n))g.startsWith("_")||v&&typeof v=="object"&&"value"in v&&v.value>.01&&b.push(g);const I=t.ingredients.map(g=>g.material);return D({materialNames:I,oxideSymbols:b,surfaceType:t.surfaceType,atmosphere:t.atmosphere,glazeFamily:t.glazeTypeId!=null?String(t.glazeTypeId):void 0})},[t]),y=d.useMemo(()=>r!=="search"||!a.trim()?[]:P(a,10),[r,a]),h=d.useMemo(()=>r!=="library"||!o||!l.trim()?[]:A(l,30),[r,o,l]),k=d.useCallback(()=>{s("library"),!C()&&!p&&(u(!0),_().then(()=>{x(!0),u(!1)}).catch(()=>{u(!1)}))},[p]),S=r==="search"?y:j;return e.jsxs("div",{className:"df-panel",children:[e.jsxs("div",{className:"df-tabs",children:[e.jsx("button",{className:`df-tab ${r==="context"?"active":""}`,onClick:()=>s("context"),children:"Context"}),e.jsx("button",{className:`df-tab ${r==="search"?"active":""}`,onClick:()=>s("search"),children:"Search"}),e.jsxs("button",{className:`df-tab ${r==="library"?"active":""}`,onClick:k,children:["Library ",o&&e.jsx("span",{className:"df-tab-count",children:w().toLocaleString()})]})]}),r==="search"&&e.jsx("div",{className:"df-search",children:e.jsx("input",{type:"text",placeholder:"Search ceramic knowledge...",value:a,onChange:n=>i(n.target.value),className:"df-search-input",autoFocus:!0})}),r==="library"&&e.jsx("div",{className:"df-search",children:e.jsx("input",{type:"text",placeholder:o?`Search ${w().toLocaleString()} articles...`:"Loading library...",value:l,onChange:n=>f(n.target.value),className:"df-search-input",disabled:!o,autoFocus:!0})}),e.jsxs("div",{className:"df-results",children:[r==="context"&&S.length>0&&S.map((n,b)=>e.jsx(R,{ref:n},n.url+b)),r==="context"&&!t&&e.jsxs("div",{className:"df-empty",children:[e.jsx("p",{children:"Select a glaze to see relevant ceramic knowledge."}),e.jsxs("p",{style:{marginTop:8},children:["Or switch to ",e.jsx("button",{className:"df-link-btn",onClick:()=>s("search"),children:"Search"})," or"," ",e.jsx("button",{className:"df-link-btn",onClick:k,children:"Library"})," to explore."]})]}),r==="context"&&t&&j.length===0&&e.jsxs("div",{className:"df-empty",children:[e.jsx("p",{children:"No contextual references found for this glaze."}),e.jsxs("p",{style:{marginTop:8},children:["Try ",e.jsx("button",{className:"df-link-btn",onClick:()=>s("search"),children:"searching"})," for a specific topic."]})]}),r==="search"&&!a.trim()&&e.jsxs("div",{className:"df-empty",children:[e.jsx("p",{children:"Search Tony Hansen's ceramic reference library."}),e.jsx("p",{style:{fontSize:11,marginTop:4},children:'Try: "crawling", "EPK", "cone 6 matte", "alumina"'})]}),r==="search"&&a.trim()&&y.length===0&&e.jsxs("div",{className:"df-empty",children:[e.jsxs("p",{children:['No results for "',a,'".']}),e.jsxs("p",{style:{fontSize:11,marginTop:4},children:["Try the ",e.jsx("button",{className:"df-link-btn",onClick:k,children:"Library"})," tab for full-text search across all articles."]})]}),r==="search"&&y.length>0&&y.map((n,b)=>e.jsx(R,{ref:n},n.url+b)),r==="library"&&p&&e.jsxs("div",{className:"df-empty",children:[e.jsx("div",{className:"df-loading-spinner"}),e.jsx("p",{children:"Loading Digitalfire Reference Library..."}),e.jsx("p",{style:{fontSize:11,marginTop:4},children:"4,800+ articles by Tony Hansen"})]}),r==="library"&&!p&&$()&&e.jsxs("div",{className:"df-empty",children:[e.jsx("p",{style:{color:"var(--text-error, #e74c3c)"},children:"Could not load the full library."}),e.jsxs("p",{style:{fontSize:11,marginTop:4},children:["The full Digitalfire library is available in the Studio Edition.",e.jsx("br",{}),"Excerpt search still works in the Search tab."]})]}),r==="library"&&o&&!l.trim()&&e.jsxs("div",{className:"df-empty",children:[e.jsx("p",{children:"Search the complete Digitalfire Reference Library."}),e.jsxs("p",{style:{fontSize:11,marginTop:4,color:"var(--text-secondary)"},children:[w().toLocaleString()," articles, full text.",e.jsx("br",{}),'Try: "crawling", "thermal expansion", "nepheline syenite",',e.jsx("br",{}),'"cone 6 clear", "crazing solutions", "ball clay"']})]}),r==="library"&&o&&l.trim()&&h.length===0&&e.jsxs("div",{className:"df-empty",children:[e.jsxs("p",{children:['No results for "',l,'".']}),e.jsx("p",{style:{fontSize:11,marginTop:4},children:"Try broader or different terms."})]}),r==="library"&&h.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"df-result-count",children:[h.length," result",h.length!==1?"s":""]}),h.map(n=>e.jsx(M,{page:n},n.url))]})]}),e.jsx("div",{className:"df-attribution",children:e.jsx("a",{href:T.url,target:"_blank",rel:"noopener noreferrer",children:T.text})}),e.jsx("style",{children:O})]})}const O=`
  .df-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 200px;
  }

  .df-tabs {
    display: flex;
    gap: 2px;
    margin-bottom: 12px;
  }

  .df-tab {
    flex: 1;
    padding: 6px 8px;
    background: var(--bg-input);
    border: 1px solid var(--border-secondary);
    border-radius: 4px;
    color: var(--text-secondary);
    font-size: 11px;
    cursor: pointer;
    text-transform: capitalize;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  .df-tab.active {
    background: var(--accent-bg);
    border-color: var(--accent);
    color: var(--text-bright);
  }

  .df-tab-count {
    font-size: 9px;
    opacity: 0.7;
    font-weight: 400;
  }

  .df-search {
    margin-bottom: 12px;
  }

  .df-search-input {
    width: 100%;
    padding: 8px 10px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    color: var(--text-primary);
    font-size: 12px;
    outline: none;
    box-sizing: border-box;
  }

  .df-search-input:focus {
    border-color: var(--accent);
  }

  .df-search-input::placeholder {
    color: var(--text-dim);
  }

  .df-search-input:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  .df-results {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 8px;
  }

  .df-result-count {
    font-size: 10px;
    color: var(--text-dim);
    padding: 0 2px 2px;
  }

  .df-ref-card {
    display: block;
    padding: 10px 12px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.15s, background 0.15s;
    cursor: pointer;
  }

  .df-ref-card:hover {
    border-color: var(--accent);
    background: var(--bg-secondary);
  }

  .df-ref-header, .df-article-header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 6px;
  }

  .df-ref-icon {
    font-size: 12px;
    flex-shrink: 0;
  }

  .df-ref-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-bright);
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .df-ref-badge {
    font-size: 9px;
    padding: 2px 6px;
    border-radius: 3px;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    font-weight: 600;
    flex-shrink: 0;
  }

  .df-ref-excerpt {
    font-size: 11px;
    line-height: 1.5;
    color: var(--text-secondary);
    margin: 0 0 6px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .df-ref-link {
    font-size: 10px;
    color: var(--text-link);
    opacity: 0.7;
  }

  .df-ref-card:hover .df-ref-link {
    opacity: 1;
  }

  /* Article cards (expandable full-text) */
  .df-article-card {
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    overflow: hidden;
    transition: border-color 0.15s;
  }

  .df-article-card:hover,
  .df-article-card.expanded {
    border-color: var(--accent);
  }

  .df-article-header {
    padding: 10px 12px;
    cursor: pointer;
    user-select: none;
    margin-bottom: 0;
  }

  .df-article-header:hover {
    background: var(--bg-secondary);
  }

  .df-expand-icon {
    font-size: 9px;
    color: var(--text-dim);
    flex-shrink: 0;
    margin-left: 4px;
  }

  .df-article-preview {
    padding: 0 12px 10px;
    cursor: pointer;
  }

  .df-article-preview .df-ref-excerpt {
    -webkit-line-clamp: 2;
  }

  .df-expand-hint {
    font-size: 10px;
    color: var(--text-link);
    opacity: 0.7;
  }

  .df-article-body {
    padding: 0 12px 12px;
    border-top: 1px solid var(--border-subtle, var(--border-primary));
  }

  .df-article-text {
    font-family: var(--font-body, Georgia, serif);
    font-size: 12px;
    line-height: 1.7;
    color: var(--text-primary);
    white-space: pre-wrap;
    word-wrap: break-word;
    margin: 12px 0;
    padding: 0;
    background: none;
    border: none;
    max-height: 500px;
    overflow-y: auto;
  }

  .df-article-footer {
    padding-top: 8px;
    border-top: 1px solid var(--border-subtle, var(--border-primary));
  }

  .df-article-footer a {
    font-size: 10px;
    color: var(--text-link);
    text-decoration: none;
  }

  .df-article-footer a:hover {
    text-decoration: underline;
  }

  /* Empty & loading states */
  .df-empty {
    padding: 20px 12px;
    text-align: center;
    color: var(--text-muted);
    font-size: 12px;
    line-height: 1.6;
  }

  .df-link-btn {
    background: none;
    border: none;
    color: var(--text-link);
    cursor: pointer;
    font-size: inherit;
    text-decoration: underline;
    padding: 0;
  }

  .df-loading-spinner {
    width: 24px;
    height: 24px;
    border: 2px solid var(--border-primary);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: df-spin 0.8s linear infinite;
    margin: 0 auto 12px;
  }

  @keyframes df-spin {
    to { transform: rotate(360deg); }
  }

  .df-attribution {
    padding: 8px 0 0;
    border-top: 1px solid var(--border-subtle, var(--border-primary));
    text-align: center;
    flex-shrink: 0;
  }

  .df-attribution a {
    font-size: 10px;
    color: var(--text-dim);
    text-decoration: none;
    letter-spacing: 0.2px;
  }

  .df-attribution a:hover {
    color: var(--text-link);
    text-decoration: underline;
  }
`;export{H as DigitalfirePanel,H as default};
