import{r as g,j as e}from"./vendor-react-D0vdeqNS.js";import{r as k,M as W,F as X,E as G,m as F}from"./index-Cx-RWLMS.js";import{o as Z,a as q}from"./geneticOptimizer-Dfh4Oq3u.js";import{u as H}from"./usePageTitle-Dfez-EUD.js";import{O as K}from"./OxideLink-Ckb8-Aqr.js";import{c as V}from"./calc-styles-u5C4IXOP.js";import"./vendor-state-DTYbmM1J.js";import"./vendor-router-DjLFn5nj.js";import"./domain-digitalfire-DfgmtSpv.js";import"./data-digitalfire-CCT-bSzB.js";const J=Object.keys(W);function Q(o,u){const n=J,d=[],l=[];for(const x of o){const a=u.resolve(x),h=a?u.getAnalysis(a.id):null;l.push((a==null?void 0:a.primaryName)??x);const j=[];for(const w of n){const p=(h==null?void 0:h[w])??0,v=W[w];j.push(v?p/100/v:0)}d.push(j)}return{matrix:d,oxides:n,names:l}}function T(o,u,n){const d=new Array(n.length).fill(0);for(let a=0;a<o.length;a++)for(let h=0;h<n.length;h++)d[h]+=o[a]*u[a][h];let l=0;for(let a=0;a<n.length;a++)X.includes(n[a])&&(l+=d[a]);l<G&&(l=G);const x={};for(let a=0;a<n.length;a++){const h=d[a]/l;h>G&&(x[n[a]]=k(h,4))}return x}function B(o,u){let n=0;for(const d of u){const l=o[d.oxide]??0,x=d.weight??1;if(d.target!==void 0)n+=x*(l-d.target)**2;else{const a=d.min??-1/0,h=d.max??1/0;l<a?n+=x*(l-a)**2:l>h&&(n+=x*(l-h)**2)}}return n}function I(o,u,n,d){const l=o.length,{matrix:x,oxides:a,names:h}=Q(u,d),j=T(o,x,a),w=B(j,n),p=.005,v=new Array(l).fill(0),f=new Array(l).fill(0);for(let r=0;r<l;r++){const m=[...o],b=[...o];m[r]=Math.min(m[r]+p,1),b[r]=Math.max(b[r]-p,0);const A=m.reduce((i,c)=>i+c,0),C=b.reduce((i,c)=>i+c,0);A>0&&m.forEach((i,c)=>m[c]/=A),C>0&&b.forEach((i,c)=>b[c]/=C);const t=B(T(m,x,a),n),s=B(T(b,x,a),n);v[r]=(t-s)/(2*p),f[r]=(t-2*w+s)/(p*p)}const N=[];for(let r=0;r<l;r++){const m=a.map(i=>j[i]??0),b=[...o];b[r]+=p;const A=b.reduce((i,c)=>i+c,0);b.forEach((i,c)=>b[c]/=A);const C=T(b,x,a);let t=0,s="SiO2";for(let i=0;i<a.length;i++){const c=Math.abs((C[a[i]]??0)-m[i]);c>t&&(t=c,s=a[i])}N.push({material:h[r],index:r,sensitivity:k(Math.abs(v[r])*100,3),dominantOxide:s,direction:v[r]<-.001?"increase":v[r]>.001?"decrease":"stable"})}N.sort((r,m)=>m.sensitivity-r.sensitivity);const y=f.reduce((r,m)=>r+Math.abs(m),0)/l,O=Math.min(1,y*5),z=O>.7?"very stable":O>.4?"stable":O>.15?"moderate":"fragile",R=Math.sqrt(v.reduce((r,m)=>r+m*m,0)),$=R>.01?v.map(r=>k(-r/R,4)):null,L=N.filter(r=>r.sensitivity>.1).slice(0,3),S=[];return w<.001?S.push("Recipe is well-optimized."):S.push(`Residual: ${k(w,4)}.`),S.push(`Stability: ${z}.`),L.length>0&&S.push(`Most sensitive to: ${L.map(r=>`${r.material} (${r.direction==="increase"?"↑":r.direction==="decrease"?"↓":"—"} → ${r.dominantOxide})`).join(", ")}.`),{sensitivities:N,stability:k(O,3),stabilityLabel:z,curvatures:f.map(r=>k(r,4)),steepestDescent:$,interpretation:S.join(" ")}}const Y=["SiO2","Al2O3","B2O3","Na2O","K2O","CaO","MgO","ZnO","BaO"],U=F.getAllMaterials(),_={"Cone 6 Gloss":[{oxide:"SiO2",target:3.5,weight:2},{oxide:"Al2O3",target:.35,weight:2},{oxide:"CaO",min:.3,max:.5},{oxide:"Na2O",min:.1,max:.3},{oxide:"K2O",min:.05,max:.2}],"Cone 6 Satin":[{oxide:"SiO2",target:3,weight:2},{oxide:"Al2O3",target:.4,weight:2},{oxide:"CaO",min:.3,max:.5},{oxide:"MgO",min:.1,max:.25}],"Cone 6 Matte":[{oxide:"SiO2",target:2.8,weight:2},{oxide:"Al2O3",target:.5,weight:2},{oxide:"CaO",min:.35,max:.6},{oxide:"MgO",min:.15,max:.3}],"Cone 10 Gloss":[{oxide:"SiO2",target:4,weight:2},{oxide:"Al2O3",target:.4,weight:2},{oxide:"CaO",min:.4,max:.6},{oxide:"K2O",min:.1,max:.3}],"Low Fire Clear (06)":[{oxide:"SiO2",target:2.2,weight:2},{oxide:"Al2O3",target:.15,weight:2},{oxide:"B2O3",min:.3,max:.6},{oxide:"Na2O",min:.3,max:.5}]},D={"Basic Cone 6":["custer-feldspar","silica","epk","whiting","talc","zinc-oxide"],"Basic Cone 10":["custer-feldspar","silica","epk","whiting","dolomite"],"Low Fire":["ferro-frit-3134","ferro-frit-3124","silica","epk","whiting"],"Soda Fire":["nepheline-syenite","silica","epk","whiting","talc"]};function xe(){H("Recipe Optimizer");const[o,u]=g.useState([]),[n,d]=g.useState(""),[l,x]=g.useState([{oxide:"SiO2",target:3.5,weight:2},{oxide:"Al2O3",target:.35,weight:2}]),[a,h]=g.useState(null),[j,w]=g.useState(null),[p,v]=g.useState(null),[f,N]=g.useState(!1),[y,O]=g.useState("gradient"),z=g.useMemo(()=>{if(!n.trim())return U.slice(0,30);const t=n.toLowerCase();return U.filter(s=>s.primaryName.toLowerCase().includes(t)||s.aliases.some(i=>i.toLowerCase().includes(t))).slice(0,30)},[n]),R=g.useCallback(t=>{u(s=>s.includes(t)?s:[...s,t]),d("")},[]),$=g.useCallback(t=>{u(s=>s.filter(i=>i!==t))},[]),L=g.useCallback(t=>{x(s=>s.some(i=>i.oxide===t)?s:[...s,{oxide:t,target:.3,weight:1}])},[]),S=g.useCallback(t=>{x(s=>s.filter(i=>i.oxide!==t))},[]),r=g.useCallback((t,s,i)=>{x(c=>c.map(M=>M.oxide===t?{...M,[s]:i}:M))},[]),m=g.useCallback(t=>{const s=_[t];s&&x(s)},[]),b=g.useCallback(t=>{const s=D[t];s&&u(s)},[]),A=g.useCallback(()=>{o.length<2||l.length===0||(N(!0),v(null),setTimeout(()=>{const t={resolve(s){return F.resolve(s)??F.getMaterial(s)??null},getAnalysis(s){return F.getAnalysis(s)}};if(y==="genetic"){const i=Z({materialIds:o,targets:l,populationSize:80,generations:200,tolerance:.02},t);if(w(i),h(i.best),i.best.weights.length>0){const c=i.best.weights.map(P=>P/100),M=I(c,o,l,t);v(M)}}else{const i=q({materialIds:o,targets:l,maxIterations:3e3,tolerance:.02},t);if(h(i),w(null),i.weights.length>0){const c=i.weights.map(P=>P/100),M=I(c,o,l,t);v(M)}}N(!1)},16))},[o,l,y]),C=o.length>=2&&l.length>0&&!f;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:V}),e.jsx("style",{children:ee}),e.jsxs("div",{className:"calc-page",children:[e.jsxs("div",{className:"calc-sidebar",children:[e.jsxs("div",{className:"calc-section",children:[e.jsx("h2",{children:"Recipe Optimizer"}),e.jsx("p",{className:"subtitle",children:"Select materials and set target chemistry. The solver finds a recipe."})]}),e.jsxs("div",{className:"calc-section",children:[e.jsx("h3",{children:"Material Palettes"}),e.jsx("div",{className:"preset-row",children:Object.keys(D).map(t=>e.jsx("button",{className:"preset-btn",onClick:()=>b(t),children:t},t))})]}),e.jsxs("div",{className:"calc-section",children:[e.jsxs("h3",{children:["Materials (",o.length,")"]}),e.jsx("input",{className:"material-input",type:"text",placeholder:"Search materials...",value:n,onChange:t=>d(t.target.value),"aria-label":"Search materials to add"}),n.trim()&&e.jsxs("div",{className:"mat-dropdown",role:"listbox","aria-label":"Available materials",children:[z.map(t=>e.jsxs("button",{className:"mat-option",onClick:()=>R(t.id),role:"option","aria-selected":o.includes(t.id),children:[t.primaryName,e.jsx("span",{className:"mat-cat",children:t.category})]},t.id)),z.length===0&&e.jsx("div",{className:"mat-empty",children:"No materials found"})]}),e.jsxs("div",{className:"selected-mats",role:"list","aria-label":"Selected materials",children:[o.map(t=>{const s=F.getMaterial(t);return e.jsxs("div",{className:"selected-mat",role:"listitem",children:[e.jsx("span",{children:(s==null?void 0:s.primaryName)??t}),e.jsx("button",{className:"remove-btn",onClick:()=>$(t),"aria-label":`Remove ${(s==null?void 0:s.primaryName)??t}`,children:"×"})]},t)}),o.length===0&&e.jsx("p",{className:"hint",children:"Pick 2+ materials or choose a palette above"})]})]}),e.jsxs("div",{className:"calc-section",children:[e.jsx("h3",{children:"Target Presets"}),e.jsx("div",{className:"preset-row",children:Object.keys(_).map(t=>e.jsx("button",{className:"preset-btn",onClick:()=>m(t),children:t},t))})]}),e.jsxs("div",{className:"calc-section",children:[e.jsx("h3",{children:"Oxide Targets"}),e.jsx("div",{className:"targets-list",role:"list","aria-label":"Oxide targets",children:l.map(t=>e.jsxs("div",{className:"target-row",role:"listitem",children:[e.jsx("span",{className:"target-oxide",children:t.oxide}),e.jsxs("label",{className:"target-field",children:[e.jsx("span",{children:"Target"}),e.jsx("input",{type:"number",step:"0.05",value:t.target??"",onChange:s=>r(t.oxide,"target",s.target.value?+s.target.value:void 0),"aria-label":`${t.oxide} target value`})]}),e.jsxs("label",{className:"target-field",children:[e.jsx("span",{children:"Min"}),e.jsx("input",{type:"number",step:"0.05",value:t.min??"",onChange:s=>r(t.oxide,"min",s.target.value?+s.target.value:void 0),"aria-label":`${t.oxide} minimum`})]}),e.jsxs("label",{className:"target-field",children:[e.jsx("span",{children:"Max"}),e.jsx("input",{type:"number",step:"0.05",value:t.max??"",onChange:s=>r(t.oxide,"max",s.target.value?+s.target.value:void 0),"aria-label":`${t.oxide} maximum`})]}),e.jsx("button",{className:"remove-btn",onClick:()=>S(t.oxide),"aria-label":`Remove ${t.oxide} target`,children:"×"})]},t.oxide))}),e.jsx("div",{className:"add-oxide-row",children:Y.filter(t=>!l.some(s=>s.oxide===t)).map(t=>e.jsx("button",{className:"add-oxide-btn",onClick:()=>L(t),children:t},t))})]}),e.jsxs("div",{className:"calc-section",children:[e.jsx("h3",{children:"Method"}),e.jsxs("div",{style:{display:"flex",gap:4},children:[e.jsx("button",{className:`preset-btn ${y==="gradient"?"preset-active":""}`,onClick:()=>O("gradient"),style:y==="gradient"?{borderColor:"var(--accent)",color:"var(--text-bright)",background:"var(--accent-bg)"}:{},children:"Gradient"}),e.jsx("button",{className:`preset-btn ${y==="genetic"?"preset-active":""}`,onClick:()=>O("genetic"),style:y==="genetic"?{borderColor:"var(--accent)",color:"var(--text-bright)",background:"var(--accent-bg)"}:{},children:"Genetic (GA)"})]}),e.jsx("p",{className:"hint",style:{marginTop:4},children:y==="gradient"?"Fast convergence for well-defined targets":"Explores diverse solutions; finds multiple alternatives"})]}),e.jsx("button",{className:"calc-button",onClick:A,disabled:!C,"aria-busy":f,children:f?"Optimizing...":y==="genetic"?"Evolve Recipe":"Find Recipe"})]}),e.jsxs("div",{className:"calc-main",children:[!a&&!f&&e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"icon","aria-hidden":"true",children:"🧪"}),e.jsx("p",{children:'Select materials, set targets, then click "Find Recipe"'}),e.jsx("p",{style:{fontSize:12,color:"var(--text-muted)"},children:"The optimizer adjusts proportions to match your target UMF chemistry"})]}),f&&e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"icon","aria-hidden":"true",children:"⏳"}),e.jsx("p",{children:"Solving..."})]}),a&&!f&&e.jsxs("div",{className:"optimizer-results",children:[e.jsxs("div",{className:`opt-summary ${a.converged?"converged":"partial"}`,role:"status",children:[e.jsx("span",{className:"opt-status",children:a.converged?"✓ Converged":"⚠ Partial"}),e.jsx("span",{className:"opt-detail",children:a.summary})]}),e.jsxs("div",{className:"results-panel",children:[e.jsx("div",{className:"results-header",children:e.jsx("h3",{children:"Optimized Recipe"})}),e.jsx("div",{className:"results-scroll",children:e.jsxs("table",{className:"results-table","aria-label":"Optimized recipe proportions",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"Material"}),e.jsx("th",{scope:"col",style:{textAlign:"right"},children:"Amount"}),e.jsx("th",{scope:"col",style:{textAlign:"right"},children:"Batch (100g)"})]})}),e.jsx("tbody",{children:a.materialNames.map((t,s)=>({name:t,weight:a.weights[s]})).filter(t=>t.weight>.1).sort((t,s)=>s.weight-t.weight).map(({name:t,weight:s})=>e.jsxs("tr",{children:[e.jsx("td",{children:t}),e.jsxs("td",{style:{textAlign:"right"},children:[s.toFixed(1),"%"]}),e.jsxs("td",{style:{textAlign:"right"},children:[s.toFixed(1),"g"]})]},t))})]})})]}),e.jsxs("div",{className:"results-panel",children:[e.jsx("div",{className:"results-header",children:e.jsx("h3",{children:"Resulting UMF"})}),e.jsx("div",{className:"results-scroll",children:e.jsxs("table",{className:"results-table","aria-label":"Resulting Unity Molecular Formula",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"Group"}),e.jsx("th",{scope:"col",children:"Oxide"}),e.jsx("th",{scope:"col",style:{textAlign:"right"},children:"Value"})]})}),e.jsxs("tbody",{children:[E("Fluxes (R₂O)",["Li2O","Na2O","K2O"],a.umf),E("Fluxes (RO)",["MgO","CaO","SrO","BaO","ZnO"],a.umf),E("Stabilizers",["Al2O3","B2O3","Fe2O3"],a.umf),E("Glass Formers",["SiO2","TiO2","ZrO2"],a.umf)]})]})})]}),e.jsxs("div",{className:"results-panel",children:[e.jsx("div",{className:"results-header",children:e.jsx("h3",{children:"Target Results"})}),e.jsx("div",{className:"results-scroll",children:e.jsxs("table",{className:"results-table","aria-label":"How well each target was met",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"Oxide"}),e.jsx("th",{scope:"col",style:{textAlign:"right"},children:"Target"}),e.jsx("th",{scope:"col",style:{textAlign:"right"},children:"Actual"}),e.jsx("th",{scope:"col",style:{textAlign:"right"},children:"Delta"}),e.jsx("th",{scope:"col",style:{textAlign:"center"},children:"Status"})]})}),e.jsx("tbody",{children:a.targetResults.map(t=>{var s,i;return e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(K,{oxide:t.oxide})}),e.jsx("td",{style:{textAlign:"right"},children:t.target!==null?t.target.toFixed(2):`${((s=t.min)==null?void 0:s.toFixed(2))??"—"}–${((i=t.max)==null?void 0:i.toFixed(2))??"—"}`}),e.jsx("td",{style:{textAlign:"right"},children:t.actual.toFixed(3)}),e.jsxs("td",{style:{textAlign:"right",color:t.satisfied?"var(--text-muted)":"var(--warning)"},children:[t.delta>0?"+":"",t.delta.toFixed(3)]}),e.jsx("td",{style:{textAlign:"center"},children:e.jsx("span",{className:`status-badge ${t.satisfied?"met":"unmet"}`,children:t.satisfied?"✓":"✗"})})]},t.oxide)})})]})})]}),p&&e.jsxs("div",{className:"results-panel",children:[e.jsx("div",{className:"results-header",children:e.jsx("h3",{children:"Sensitivity Analysis (RSM)"})}),e.jsxs("div",{className:"results-scroll",children:[e.jsx("div",{style:{padding:"8px 0",fontSize:13,color:"var(--text-secondary)"},children:p.interpretation}),e.jsxs("div",{style:{display:"inline-block",padding:"4px 10px",borderRadius:4,fontSize:12,fontWeight:600,marginBottom:8,background:p.stabilityLabel==="very stable"?"rgba(76,175,80,.15)":p.stabilityLabel==="stable"?"rgba(76,175,80,.1)":p.stabilityLabel==="moderate"?"rgba(230,126,34,.12)":"rgba(244,67,54,.12)",color:p.stabilityLabel==="very stable"||p.stabilityLabel==="stable"?"#4caf50":p.stabilityLabel==="moderate"?"#e67e22":"#e74c3c"},children:["Stability: ",p.stabilityLabel," (",(p.stability*100).toFixed(0),"%)"]}),e.jsxs("table",{className:"results-table","aria-label":"Material sensitivity analysis",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"Material"}),e.jsx("th",{scope:"col",style:{textAlign:"right"},children:"Sensitivity"}),e.jsx("th",{scope:"col",style:{textAlign:"center"},children:"Direction"}),e.jsx("th",{scope:"col",children:"Dominant Oxide"})]})}),e.jsx("tbody",{children:p.sensitivities.filter(t=>t.sensitivity>.01).map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:t.material}),e.jsx("td",{style:{textAlign:"right"},children:t.sensitivity.toFixed(3)}),e.jsx("td",{style:{textAlign:"center"},children:t.direction==="increase"?"↑ more":t.direction==="decrease"?"↓ less":"— stable"}),e.jsx("td",{style:{color:"var(--text-muted)"},children:t.dominantOxide})]},t.material))})]})]})]}),j&&j.alternatives.length>0&&e.jsxs("div",{className:"results-panel",children:[e.jsx("div",{className:"results-header",children:e.jsxs("h3",{children:["Alternative Recipes (",j.alternatives.length,")"]})}),e.jsxs("div",{className:"results-scroll",children:[e.jsx("p",{style:{fontSize:12,color:"var(--text-muted)",margin:"0 0 8px"},children:"Diverse solutions found by the genetic algorithm"}),j.alternatives.map((t,s)=>e.jsxs("div",{style:{padding:"8px 10px",marginBottom:6,background:"var(--bg-tertiary)",border:"1px solid var(--border-primary)",borderRadius:6},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4},children:[e.jsxs("span",{style:{fontWeight:600},children:["Alternative ",s+1]}),e.jsx("span",{className:`status-badge ${t.converged?"met":"unmet"}`,style:{fontSize:10},children:t.converged?"✓":`residual ${t.residual.toFixed(4)}`})]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6,fontSize:11},children:t.materialNames.map((i,c)=>({name:i,w:t.weights[c]})).filter(i=>i.w>.5).sort((i,c)=>c.w-i.w).map(i=>e.jsxs("span",{style:{color:"var(--text-label)"},children:[i.name," ",i.w.toFixed(1),"%"]},i.name))})]},s))]})]})]})]})]})]})}function E(o,u,n){const d=u.filter(l=>(n[l]??0)>.001);return d.length===0?null:e.jsx(e.Fragment,{children:d.map((l,x)=>e.jsxs("tr",{children:[x===0&&e.jsx("td",{rowSpan:d.length,style:{fontWeight:600,color:"var(--text-secondary)"},children:o}),e.jsx("td",{children:e.jsx(K,{oxide:l})}),e.jsx("td",{style:{textAlign:"right"},children:(n[l]??0).toFixed(3)})]},l))})}const ee=`
  /* Material selection */
  .mat-dropdown {
    background: var(--bg-elevated);
    border: 1px solid var(--border-secondary);
    border-radius: 6px;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 4px;
  }

  .mat-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 6px 10px;
    background: transparent;
    border: none;
    color: var(--text-primary);
    font-size: 13px;
    cursor: pointer;
    text-align: left;
  }

  .mat-option:hover {
    background: var(--bg-hover);
  }

  .mat-cat {
    font-size: 11px;
    color: var(--text-muted);
  }

  .mat-empty {
    padding: 8px;
    font-size: 12px;
    color: var(--text-muted);
    text-align: center;
  }

  .selected-mats {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 8px;
  }

  .selected-mat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 8px;
    background: var(--bg-tertiary);
    border-radius: 4px;
    font-size: 13px;
  }

  .hint {
    font-size: 12px;
    color: var(--text-muted);
    margin: 4px 0;
  }

  /* Presets */
  .preset-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .preset-btn {
    padding: 4px 10px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-secondary);
    border-radius: 4px;
    color: var(--text-label);
    font-size: 11px;
    cursor: pointer;
    white-space: nowrap;
  }

  .preset-btn:hover {
    border-color: var(--accent);
    color: var(--text-bright);
  }

  /* Targets */
  .targets-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .target-row {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    padding: 6px 8px;
    background: var(--bg-tertiary);
    border-radius: 6px;
    flex-wrap: wrap;
  }

  .target-oxide {
    font-weight: 600;
    font-size: 13px;
    min-width: 48px;
    color: var(--text-bright);
    align-self: center;
  }

  .target-field {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 10px;
    color: var(--text-muted);
  }

  .target-field input {
    width: 60px;
    padding: 4px 6px;
    background: var(--bg-input);
    border: 1px solid var(--border-input);
    border-radius: 4px;
    color: var(--text-primary);
    font-size: 12px;
    font-family: 'SF Mono', 'Fira Code', monospace;
  }

  .target-field input:focus {
    border-color: var(--accent);
    outline: none;
  }

  .add-oxide-row {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 6px;
  }

  .add-oxide-btn {
    padding: 3px 8px;
    background: transparent;
    border: 1px dashed var(--border-secondary);
    border-radius: 4px;
    color: var(--text-dim);
    font-size: 11px;
    cursor: pointer;
  }

  .add-oxide-btn:hover {
    border-color: var(--accent);
    color: var(--text-label);
  }

  /* Results */
  .optimizer-results {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .opt-summary {
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .opt-summary.converged {
    background: rgba(76, 175, 80, 0.12);
    border: 1px solid rgba(76, 175, 80, 0.3);
  }

  .opt-summary.partial {
    background: rgba(230, 126, 34, 0.12);
    border: 1px solid rgba(230, 126, 34, 0.3);
  }

  .opt-status {
    font-weight: 600;
    white-space: nowrap;
  }

  .converged .opt-status { color: #4caf50; }
  .partial .opt-status { color: #e67e22; }

  .opt-detail {
    color: var(--text-secondary);
    font-size: 13px;
  }

  .status-badge {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    font-size: 12px;
  }

  .status-badge.met {
    background: rgba(76, 175, 80, 0.2);
    color: #4caf50;
  }

  .status-badge.unmet {
    background: rgba(230, 126, 34, 0.2);
    color: #e67e22;
  }
`;export{xe as OptimizerPage};
