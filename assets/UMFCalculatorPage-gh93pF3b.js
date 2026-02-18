import{r as n,j as e,R as Y}from"./vendor-react-D380Hx73.js";import{R as Q}from"./index-KfmdK8FF.js";import{g as S,c as ee,r as re}from"./umf-WIqXF4ty.js";import{u as ae,m as G,A as te,P as se}from"./index-Djbrw6no.js";import{O as ie}from"./OxideLink-DfHeNf4K.js";import{p as W,v as J,a as oe}from"./validation-D_9phTw6.js";import{exportRecipeCSV as ne,exportAsPrintPDF as le}from"./export-DmptQqxz.js";import{u as de}from"./usePageTitle-DBGH44HI.js";import{F as ce,U as pe,O as xe}from"./OxideRadar-BRo5lEwo.js";import{c as ue}from"./calc-styles-u5C4IXOP.js";import"./vendor-state-CUnBHQ16.js";import"./vendor-router-1trnvaIQ.js";import"./domain-digitalfire-DfgmtSpv.js";import"./data-digitalfire-CCT-bSzB.js";const $={begin:"#3498db",material_resolution:"#2ecc71",oxide_contribution:"#e67e22",flux_sum:"#9b59b6",normalize:"#1abc9c",derived_values:"#e74c3c",verify:"#95a5a6",simplex_start:"#3498db",simplex_complete:"#2ecc71",grid_start:"#3498db",grid_complete:"#2ecc71"};function he({trace:t,title:g="Calculation Trace"}){const[l,m]=n.useState(!1),[p,x]=n.useState(null),y=p?t.filter(s=>s.operation===p):t,C=[...new Set(t.map(s=>s.operation))];return t.length===0?null:e.jsxs("div",{style:{border:"1px solid var(--border-primary)",borderRadius:8,overflow:"hidden",background:"var(--bg-secondary)"},children:[e.jsxs("button",{onClick:()=>m(!l),style:{width:"100%",padding:"10px 16px",background:"transparent",border:"none",color:"var(--text-secondary)",fontSize:13,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{children:[l?"▾":"▸"," ",g,e.jsxs("span",{style:{color:"var(--text-dim)",marginLeft:8},children:[t.length," steps"]})]}),e.jsx("span",{style:{fontSize:11,color:"var(--text-dim)"},children:"Show Your Work"})]}),l&&e.jsxs("div",{style:{padding:"0 16px 16px"},children:[e.jsxs("div",{style:{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12},children:[e.jsx("button",{onClick:()=>x(null),style:{...Z,background:p===null?"var(--accent-bg)":"var(--bg-tertiary)",borderColor:p===null?"var(--accent)":"var(--border-primary)",color:p===null?"var(--text-bright)":"var(--text-secondary)"},children:"All"}),C.map(s=>e.jsx("button",{onClick:()=>x(p===s?null:s),style:{...Z,background:p===s?"var(--accent-bg)":"var(--bg-tertiary)",borderColor:p===s?"var(--accent)":"var(--border-primary)",color:p===s?"var(--text-bright)":"var(--text-secondary)"},children:s.replace(/_/g," ")},s))]}),e.jsx("div",{style:{maxHeight:400,overflowY:"auto"},children:y.map((s,f)=>e.jsxs("div",{style:{padding:"8px 10px",marginBottom:2,background:"#161616",borderRadius:4,borderLeft:`3px solid ${$[s.operation]||"#555"}`,fontSize:12},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:2},children:[e.jsx("span",{style:{color:$[s.operation]||"#888",fontWeight:600},children:s.operation.replace(/_/g," ")}),s.output!==void 0&&e.jsxs("span",{style:{fontFamily:"'SF Mono', monospace",color:"#aaa"},children:["→ ",typeof s.output=="number"?s.output.toFixed(4):JSON.stringify(s.output)]})]}),s.note&&e.jsx("div",{style:{color:"var(--text-muted)",fontSize:11},children:s.note})]},f))})]})]})}const Z={padding:"3px 8px",border:"1px solid var(--border-primary)",borderRadius:4,fontSize:10,cursor:"pointer",background:"var(--bg-tertiary)",color:"var(--text-secondary)",textTransform:"capitalize"};function a(t,g){return{material:t,amount:g,unit:"weight"}}function j(t,g,l,m,p,x,y){return{id:`preset_${t}`,name:g,source:"calculated",ingredients:l,umf:null,coneRange:[m,m],atmosphere:p,surfaceType:x,umfConfidence:"declared",verified:!0,notes:y}}const q=[j("leach_4321","Leach 4321",[a("Custer Feldspar",40),a("Silica",30),a("Whiting",20),a("EPK Kaolin",10)],10,"reduction","gloss","Bernard Leach's classic proportional glaze. 4 parts feldspar, 3 silica, 2 whiting, 1 kaolin. A reliable glossy base at cone 10 reduction. Simple, transparent, forgiving."),j("tenmoku","Tenmoku (Iron Saturate)",[a("Custer Feldspar",44),a("Silica",27),a("Whiting",17),a("EPK Kaolin",12)],10,"reduction","gloss","Classic tenmoku base — black to dark brown iron saturate glaze. Add 8-12% Red Iron Oxide for the classic break-to-amber effect on edges. The base is slightly more alumina-rich than Leach 4321 for better suspension."),j("shino","Carbon Trap Shino",[a("Nepheline Syenite",80),a("EPK Kaolin",12),a("Ball Clay",8)],10,"reduction","satin","Malcolm Davis-style carbon trap shino. Very high soda content from nepheline syenite creates the characteristic orange peel + carbon trapping in reduction. Apply thick. Fire cone 10 with heavy reduction between 1100-1200°C."),j("celadon","Celadon (Cone 10)",[a("Custer Feldspar",41),a("Silica",30),a("Whiting",19),a("EPK Kaolin",10)],10,"reduction","gloss","Classic celadon base — very close to Leach 4321 proportions. Add 1-2% Red Iron Oxide for the characteristic blue-green color in reduction. Thickness-sensitive: thin = pale blue, thick = deeper green."),j("cone6_clear","Cone 6 Clear Base",[a("Nepheline Syenite",47),a("Silica",21),a("Whiting",12),a("Frit 3134",10),a("EPK Kaolin",10)],6,"oxidation","gloss","Reliable cone 6 oxidation clear glaze. Nepheline syenite reduces melting temperature while Frit 3134 provides boron flux. Good for layering and colorant testing. Adapt for colors by adding stains, oxides, or mason stains."),j("matte_base_6","Matte Base (Cone 6)",[a("Custer Feldspar",35),a("Silica",25),a("Whiting",20),a("EPK Kaolin",15),a("Talc",5)],6,"oxidation","matte","High-alumina matte base for cone 6 oxidation. The elevated Al₂O₃ from kaolin produces a true alumina matte (not underfired). Talc adds MgO for surface quality. Smooth, buttery matte when properly fired."),j("majolica","Majolica (Cone 04)",[a("Frit 3124",67),a("EPK Kaolin",18),a("Silica",10),a("Tin Oxide",5)],"04","oxidation","gloss","Classic white opaque majolica base for earthenware. Frit 3124 provides an early melt with good clarity, tin oxide gives opaque white coverage for overglaze decoration. Fire cone 04. Good brushing consistency."),j("floating_blue","Floating Blue (Cone 6)",[a("Nepheline Syenite",46),a("Silica",18),a("Dolomite",12),a("Gerstley Borate",14),a("EPK Kaolin",10)],6,"oxidation","gloss","A cone 6 fluid blue glaze — rutile and cobalt cause the characteristic floating quality with blue pools in thicker areas and tan-to-brown where thin. Add 2% Rutile + 0.5% Cobalt Carbonate. Apply thick. Best on textured surfaces."),j("ash_glaze","Wood Ash Glaze (Cone 10)",[a("Custer Feldspar",40),a("Silica",20),a("Whiting",15),a("Dolomite",10),a("EPK Kaolin",15)],10,"reduction","satin","Simulated wood ash glaze using conventional materials to approximate the UMF of a 50/50 feldspar/ash recipe. Real ash glazes vary enormously — the charm is the unpredictability. Substitute 40 parts of actual washed wood ash for the whiting + dolomite + extra kaolin."),j("crystalline","Crystalline Base (Cone 10)",[a("Frit 3110",52),a("Silica",25),a("Zinc Oxide",23)],10,"oxidation","gloss","Crystalline glaze base. Very high zinc + silica with no alumina — this is intentionally unstable (no kaolin = extreme fluidity). Requires a catch tray. Add 1-3% colorant oxides (cobalt, iron, manganese, copper, nickel). Slow cool through 1050-1100°C to grow crystals. Kiln control is everything.")],me={"High Fire (Cone 10)":["leach_4321","tenmoku","shino","celadon","ash_glaze","crystalline"],"Mid Fire (Cone 6)":["cone6_clear","matte_base_6","floating_blue"],"Low Fire (Cone 04)":["majolica"]},ge=[{oxide:"Na2O",label:"Na₂O",group:"Flux (R₂O)",max:.8,step:.01},{oxide:"K2O",label:"K₂O",group:"Flux (R₂O)",max:.8,step:.01},{oxide:"Li2O",label:"Li₂O",group:"Flux (R₂O)",max:.5,step:.01},{oxide:"CaO",label:"CaO",group:"Flux (RO)",max:1,step:.01},{oxide:"MgO",label:"MgO",group:"Flux (RO)",max:.6,step:.01},{oxide:"ZnO",label:"ZnO",group:"Flux (RO)",max:.5,step:.01},{oxide:"BaO",label:"BaO",group:"Flux (RO)",max:.4,step:.01},{oxide:"SrO",label:"SrO",group:"Flux (RO)",max:.4,step:.01},{oxide:"Al2O3",label:"Al₂O₃",group:"Stabilizer",max:1,step:.01},{oxide:"B2O3",label:"B₂O₃",group:"Stabilizer",max:1,step:.01},{oxide:"SiO2",label:"SiO₂",group:"Glass Former",max:8,step:.05}],X={matte:"#4caf50",satin:"#8bc34a",gloss:"#2196f3",underfired:"#9e9e9e",crazed:"#f44336",unknown:"#666"};function be({baseUMF:t,cone:g,onPositionChange:l}){const[m,p]=n.useState({}),x=n.useMemo(()=>{const i={...t};t._meta&&(i._meta={...t._meta});for(const[R,A]of Object.entries(m)){if(A===0)continue;const E=S(t,R),O=Math.max(0,E+A);i[R]=ee(O,"assumed","what-if")}const d=S(i,"SiO2"),u=S(i,"Al2O3");return u>.001&&(i._meta={...i._meta,SiO2_Al2O3_ratio:d/u}),i},[t,m]),y=n.useMemo(()=>W(t),[t]),C=n.useMemo(()=>W(x),[x]),s=n.useMemo(()=>J(x,g),[x,g]),f=Object.values(m).some(i=>i!==0),z=S(t,"SiO2"),_=S(t,"Al2O3"),k=S(x,"SiO2"),F=S(x,"Al2O3"),T=n.useCallback((i,d)=>{p(u=>({...u,[i]:d}))},[]);Y.useEffect(()=>{l&&f&&l(k,F)},[k,F,f,l]);const B=n.useCallback(()=>p({}),[]),N=n.useMemo(()=>{const i=new Map;for(const d of ge)(S(t,d.oxide)>.001||d.oxide==="SiO2"||d.oxide==="Al2O3")&&(i.has(d.group)||i.set(d.group,[]),i.get(d.group).push(d));return i},[t]);return e.jsxs("div",{className:"whatif-panel",children:[e.jsxs("div",{className:"whatif-header",children:[e.jsx("h3",{children:"What If...?"}),e.jsx("p",{className:"whatif-desc",children:"Drag an oxide to explore how changes affect the glaze."}),f&&e.jsx("button",{className:"whatif-reset",onClick:B,children:"Reset All"})]}),e.jsxs("div",{className:"whatif-prediction",children:[e.jsxs("div",{className:"pred-row",children:[e.jsx("span",{className:"pred-label",children:"Original:"}),e.jsx("span",{className:"pred-value",style:{color:X[y]},children:y}),e.jsxs("span",{className:"pred-detail",children:["SiO₂:Al₂O₃ = ",_>0?(z/_).toFixed(1):"—"]})]}),f&&e.jsxs("div",{className:"pred-row",children:[e.jsx("span",{className:"pred-label",children:"Adjusted:"}),e.jsxs("span",{className:"pred-value",style:{color:X[C]},children:[C,C!==y&&" ⬅ changed!"]}),e.jsxs("span",{className:"pred-detail",children:["SiO₂:Al₂O₃ = ",F>0?(k/F).toFixed(1):"—"]})]})]}),f&&e.jsx("div",{className:"whatif-position",children:e.jsxs("span",{children:["Stull position: (",z.toFixed(2),", ",_.toFixed(2),") → (",k.toFixed(2),", ",F.toFixed(2),")"]})}),Array.from(N.entries()).map(([i,d])=>e.jsxs("div",{className:"whatif-group",children:[e.jsx("div",{className:"group-label",children:i}),d.map(({oxide:u,label:R,max:A,step:E})=>{const O=S(t,u),v=m[u]||0,I=Math.max(0,O+v),M=Math.abs(v)>.001,P=-O,L=Math.max(A-O,O*2);return e.jsxs("div",{className:`whatif-slider-row ${M?"changed":""}`,children:[e.jsxs("div",{className:"slider-label",children:[e.jsx("span",{className:"oxide-name",children:R}),e.jsxs("span",{className:"oxide-value",children:[e.jsx("span",{className:"orig",children:O.toFixed(3)}),M&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"arrow",children:" → "}),e.jsx("span",{className:"adjusted",style:{color:v>0?"#4caf50":"#ef4444"},children:I.toFixed(3)}),e.jsxs("span",{className:"delta",style:{color:v>0?"#4caf50":"#ef4444"},children:["(",v>0?"+":"",v.toFixed(3),")"]})]})]})]}),e.jsx("input",{type:"range",min:P,max:L,step:E,value:v,onChange:K=>T(u,parseFloat(K.target.value)),className:"whatif-slider",style:{"--fill":M?v>0?"#4caf50":"#ef4444":"var(--text-muted)"}})]},u)})]},i)),f&&s.length>0&&e.jsxs("div",{className:"whatif-issues",children:[e.jsxs("div",{className:"issues-label",children:["Limit Warnings (Cone ",g,")"]}),s.map((i,d)=>e.jsxs("div",{className:"issue-row",style:{color:i.severity==="error"?"#ef4444":"#f59e0b"},children:[i.severity==="error"?"⛔":"⚠"," ",i.message]},d))]}),e.jsx("style",{children:fe})]})}const fe=`
  .whatif-panel {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    padding: 16px;
  }
  
  .whatif-header {
    margin-bottom: 12px;
  }
  
  .whatif-header h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-bright);
    margin: 0 0 4px;
  }
  
  .whatif-desc {
    font-size: 12px;
    color: var(--text-muted);
    margin: 0;
  }
  
  .whatif-reset {
    margin-top: 8px;
    padding: 4px 12px;
    font-size: 11px;
    background: var(--bg-input);
    border: 1px solid var(--border-secondary);
    border-radius: 4px;
    color: var(--text-secondary);
    cursor: pointer;
  }
  
  .whatif-reset:hover {
    border-color: var(--accent);
    color: var(--text-bright);
  }
  
  .whatif-prediction {
    background: var(--bg-primary);
    border-radius: 6px;
    padding: 10px 12px;
    margin-bottom: 12px;
  }
  
  .pred-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }
  
  .pred-row:last-child {
    margin-bottom: 0;
  }
  
  .pred-label {
    font-size: 11px;
    color: var(--text-muted);
    min-width: 56px;
  }
  
  .pred-value {
    font-size: 14px;
    font-weight: 600;
    text-transform: capitalize;
  }
  
  .pred-detail {
    font-size: 11px;
    color: var(--text-muted);
    font-family: 'SF Mono', monospace;
    margin-left: auto;
  }
  
  .whatif-position {
    font-size: 11px;
    color: var(--text-muted);
    font-family: 'SF Mono', monospace;
    padding: 6px 8px;
    background: var(--bg-primary);
    border-radius: 4px;
    margin-bottom: 12px;
  }
  
  .whatif-group {
    margin-bottom: 12px;
  }
  
  .group-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-muted);
    margin-bottom: 6px;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--border-secondary);
  }
  
  .whatif-slider-row {
    padding: 4px 0;
  }
  
  .whatif-slider-row.changed {
    background: rgba(99, 102, 241, 0.05);
    margin: 0 -8px;
    padding: 4px 8px;
    border-radius: 4px;
  }
  
  .slider-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2px;
  }
  
  .oxide-name {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-label);
  }
  
  .oxide-value {
    font-size: 11px;
    font-family: 'SF Mono', monospace;
    color: var(--text-secondary);
  }
  
  .oxide-value .arrow {
    color: var(--text-muted);
    margin: 0 2px;
  }
  
  .oxide-value .delta {
    font-size: 10px;
    margin-left: 4px;
  }
  
  .whatif-slider {
    width: 100%;
    height: 4px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--border-secondary);
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }
  
  .whatif-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: var(--fill, var(--text-muted));
    border: 2px solid var(--bg-primary);
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }
  
  .whatif-slider::-moz-range-thumb {
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: var(--fill, var(--text-muted));
    border: 2px solid var(--bg-primary);
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }
  
  .whatif-issues {
    margin-top: 12px;
    padding: 10px 12px;
    background: var(--bg-primary);
    border-radius: 6px;
    border: 1px solid var(--border-secondary);
  }
  
  .issues-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .issue-row {
    font-size: 12px;
    margin-bottom: 3px;
    line-height: 1.4;
  }
`,ve=["Li2O","Na2O","K2O","MgO","CaO","SrO","BaO","ZnO","PbO"],ye=["Al2O3","B2O3","Fe2O3"],je=["SiO2","TiO2","ZrO2","SnO2"],H={matte:{label:"Matte",color:"#4caf50"},satin:{label:"Satin",color:"#8bc34a"},gloss:{label:"Gloss",color:"#2196f3"},underfired:{label:"Underfired",color:"#9e9e9e"},crazed:{label:"Crazed",color:"#f44336"},unknown:{label:"Unknown",color:"#666"}};function Te(){var K,D,U,V;de("UMF Calculator");const[t,g]=n.useState(null),[l,m]=n.useState(null),[p,x]=n.useState([]),[y,C]=n.useState([]),[s,f]=n.useState([]),[z,_]=n.useState(null),[k,F]=n.useState([]),[T,B]=n.useState([]),[N,i]=n.useState("6"),[d,u]=n.useState(!1),[R,A]=n.useState([]),[E,O]=n.useState([]),{saveRecipe:v}=ae(),I=n.useCallback(()=>{if(!t)return;x([]),C([]),f([]),_(null),F([]),B([]),u(!1);const r=oe(t);if(F(r.warnings),B(r.suggestions),!r.valid){x(r.errors);return}const o=re(t,G),b=t.ingredients.reduce((h,w)=>h+(w.amount||0),0),c=t.ingredients.filter(h=>h.material.trim()&&h.amount>0).map(h=>{const w=G.resolve(h.material.trim());return{name:h.material.trim(),resolved:w?w.primaryName:null,amount:b>0?h.amount/b*100:0,discontinued:(w==null?void 0:w.discontinued)||!1}});if(O(c),A(o.trace||[]),o.value){m(o.value),C(o.warnings);const h=J(o.value,N);f(h);const w=W(o.value);_(w)}else x(o.errors)},[t,N]),M=t&&t.ingredients.some(r=>r.material.trim()&&r.amount>0),P=n.useCallback(()=>{t&&(v(t),u(!0))},[t,v]),L=(r,o)=>{if(!l)return null;const b=S(l,r);return b<.001?null:e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx(ie,{oxide:r}),""]}),e.jsx("td",{children:b.toFixed(se.umfOxide)}),e.jsx("td",{children:s.filter(c=>c.oxide===r||r==="Na2O"&&c.oxide==="K2O+Na2O"||r==="K2O"&&c.oxide==="K2O+Na2O").map((c,h)=>e.jsxs("span",{style:{color:c.severity==="error"?"#e74c3c":"#e67e22",fontSize:12},children:[c.severity==="error"?"⛔":"⚠"," ",c.message]},h))})]},r)};return e.jsxs("div",{className:"calc-page",children:[e.jsxs("div",{className:"calc-sidebar",onKeyDown:r=>{r.key==="Enter"&&!(r.target instanceof HTMLTextAreaElement)&&I()},children:[e.jsxs("div",{className:"calc-section",children:[e.jsx("h2",{children:"UMF Calculator"}),e.jsx("p",{className:"subtitle",children:"Enter a recipe → see its Unity Molecular Formula"})]}),e.jsxs("div",{className:"calc-section",children:[e.jsx("h3",{children:"Load a Preset"}),e.jsxs("select",{onChange:r=>{const o=r.target.value;if(!o)return;const b=q.find(c=>c.id===`preset_${o}`);if(b){const c=JSON.parse(JSON.stringify(b));c.id=`input_${Date.now()}_${Math.random().toString(36).substr(2,6)}`,g(c),i(String(c.coneRange[0])),m(null),u(!1)}r.target.value=""},style:{width:"100%",padding:"8px 10px",background:"var(--bg-input)",border:"1px solid var(--border-secondary)",borderRadius:6,color:"var(--text-bright)",fontSize:13},defaultValue:"",children:[e.jsx("option",{value:"",disabled:!0,children:"Select a classic recipe..."}),Object.entries(me).map(([r,o])=>e.jsx("optgroup",{label:r,children:o.map(b=>{const c=q.find(h=>h.id===`preset_${b}`);return c?e.jsx("option",{value:b,children:c.name},b):null})},r))]})]}),e.jsxs("div",{className:"calc-section",children:[e.jsx("h3",{children:"Recipe"}),e.jsx(Q,{label:"My Glaze",color:"#6366F1",recipe:t,onChange:g})]}),e.jsxs("div",{className:"calc-section",children:[e.jsx("h3",{children:"Target Cone"}),e.jsx("div",{className:"calc-controls",children:e.jsx("div",{className:"control-row",children:e.jsx("select",{value:N,onChange:r=>{i(r.target.value),m(null)},style:{flex:1,padding:"8px 10px",background:"var(--bg-input)",border:"1px solid var(--border-secondary)",borderRadius:6,color:"var(--text-bright)",fontSize:14},children:te.map(r=>e.jsxs("option",{value:r,children:["Cone ",r]},r))})})})]}),k.length>0&&e.jsx("div",{className:"calc-section",children:k.map((r,o)=>e.jsxs("p",{style:{color:"#e67e22",fontSize:12,margin:"4px 0"},children:["⚠ ",r]},o))}),T.length>0&&e.jsx("div",{className:"calc-section",children:T.map((r,o)=>e.jsxs("p",{style:{color:"#818CF8",fontSize:12,margin:"4px 0"},children:["💡 ",r]},o))}),p.length>0&&e.jsx("div",{className:"calc-section",children:p.map((r,o)=>e.jsxs("p",{style:{color:"#e74c3c",fontSize:13,margin:"4px 0"},children:["⛔ ",r]},o))}),e.jsx("button",{className:"calc-button",onClick:I,disabled:!M,children:"Calculate UMF"}),l&&e.jsx("button",{className:"calc-button",onClick:P,style:{background:d?"#2d5a27":"var(--bg-input)",borderColor:d?"#4caf50":"var(--border-secondary)",marginTop:4},children:d?"✓ Saved":"Save Recipe"}),l&&t&&e.jsx("button",{className:"calc-button",onClick:()=>ne(t,l),style:{background:"var(--bg-input)",borderColor:"var(--border-secondary)",marginTop:4},children:"Export CSV"}),l&&e.jsx("button",{className:"calc-button",onClick:()=>le(`UMF — ${(t==null?void 0:t.name)||"Recipe"}`),style:{background:"var(--bg-input)",borderColor:"var(--border-secondary)",marginTop:4},children:"Print / Save PDF"})]}),e.jsx("div",{className:"calc-main",children:l?e.jsxs(e.Fragment,{children:[z&&e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"center",padding:"16px 20px",background:"var(--bg-secondary)",borderRadius:8,border:"1px solid var(--border-primary)"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:12,color:"var(--text-secondary)",textTransform:"uppercase",marginBottom:4},children:"Predicted Surface"}),e.jsx("div",{style:{fontSize:22,fontWeight:700,color:H[z].color},children:H[z].label})]}),e.jsxs("div",{style:{marginLeft:"auto",textAlign:"right"},children:[e.jsx("div",{style:{fontSize:12,color:"var(--text-secondary)"},children:"SiO₂:Al₂O₃ ratio"}),e.jsx("div",{style:{fontSize:18,fontFamily:"'SF Mono', monospace"},children:((D=(K=l._meta)==null?void 0:K.SiO2_Al2O3_ratio)==null?void 0:D.toFixed(1))??"—"})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontSize:12,color:"var(--text-secondary)"},children:"R₂O:RO ratio"}),e.jsx("div",{style:{fontSize:18,fontFamily:"'SF Mono', monospace"},children:((V=(U=l._meta)==null?void 0:U.R2O_RO_ratio)==null?void 0:V.toFixed(2))??"—"})]})]}),y.length>0&&e.jsx("div",{style:{padding:"12px 16px",background:"#2a2200",border:"1px solid #554400",borderRadius:8},children:y.map((r,o)=>e.jsxs("p",{style:{color:"#e67e22",fontSize:13,margin:"2px 0"},children:["⚠ ",r]},o))}),e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"flex-start",padding:"12px 20px",background:"var(--bg-secondary)",borderRadius:8,border:"1px solid var(--border-primary)"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4},children:[e.jsx(ce,{umf:l,size:72}),e.jsx("span",{style:{fontSize:10,color:"var(--text-muted)"},children:"Flux Unity"})]}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:8},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:10,color:"var(--text-muted)",display:"block",marginBottom:2},children:"Oxide Fingerprint"}),e.jsx(pe,{umf:l,showLabels:!0,width:280,height:18})]}),e.jsx(xe,{umf:l,size:160})]})]}),e.jsxs("div",{className:"results-panel",children:[e.jsx("div",{className:"results-header",children:e.jsxs("h3",{children:["Unity Molecular Formula — Cone ",N]})}),e.jsx("div",{style:{padding:"0 16px 16px"},children:e.jsxs("table",{className:"results-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Oxide"}),e.jsx("th",{children:"UMF Value"}),e.jsx("th",{children:"Limits Check"})]})}),e.jsxs("tbody",{children:[e.jsx("tr",{children:e.jsx("td",{colSpan:3,style:{color:"var(--text-secondary)",fontWeight:600,paddingTop:12,borderBottom:"1px solid var(--border-secondary)"},children:"Fluxes (R₂O + RO) — sum to 1.0"})}),ve.map(r=>L(r)),e.jsx("tr",{children:e.jsx("td",{colSpan:3,style:{color:"var(--text-secondary)",fontWeight:600,paddingTop:12,borderBottom:"1px solid var(--border-secondary)"},children:"Stabilizers (R₂O₃)"})}),ye.map(r=>L(r)),e.jsx("tr",{children:e.jsx("td",{colSpan:3,style:{color:"var(--text-secondary)",fontWeight:600,paddingTop:12,borderBottom:"1px solid var(--border-secondary)"},children:"Glass Formers (RO₂)"})}),je.map(r=>L(r))]})]})})]}),E.length>0&&e.jsxs("div",{className:"results-panel",children:[e.jsx("div",{className:"results-header",children:e.jsx("h3",{children:"Recipe Breakdown"})}),e.jsx("div",{style:{padding:"0 16px 16px"},children:e.jsxs("table",{className:"results-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Ingredient"}),e.jsx("th",{children:"Resolved As"}),e.jsx("th",{children:"Weight %"})]})}),e.jsx("tbody",{children:E.map((r,o)=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontFamily:"inherit"},children:r.name}),e.jsxs("td",{style:{fontFamily:"inherit",color:r.resolved?r.discontinued?"#f59e0b":"var(--text-bright)":"#ef4444"},children:[r.resolved||"✗ unresolved",r.discontinued&&e.jsx("span",{style:{marginLeft:6,fontSize:10,color:"#f59e0b"},children:"discontinued"})]}),e.jsxs("td",{style:{fontFamily:"'SF Mono', monospace"},children:[r.amount.toFixed(1),"%"]})]},o))})]})})]}),R.length>0&&e.jsx(he,{trace:R}),e.jsx(be,{baseUMF:l,cone:N}),s.length>0&&e.jsxs("div",{className:"results-panel",children:[e.jsx("div",{className:"results-header",children:e.jsxs("h3",{children:["Cone ",N," Limit Warnings"]})}),e.jsx("div",{style:{padding:"12px 16px"},children:s.map((r,o)=>e.jsxs("div",{style:{padding:"8px 12px",marginBottom:4,borderRadius:6,background:r.severity==="error"?"#2a1515":"#2a2200",border:`1px solid ${r.severity==="error"?"#551515":"#554400"}`,fontSize:13,color:r.severity==="error"?"#e74c3c":"#e67e22"},children:[r.severity==="error"?"⛔":"⚠"," ",r.message,e.jsxs("span",{style:{float:"right",color:"var(--text-secondary)"},children:["range: ",r.limit.min,"–",r.limit.max]})]},o))})]})]}):e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"icon",children:"⚗"}),e.jsx("p",{children:"Enter a recipe and hit Calculate"}),e.jsx("p",{style:{fontSize:12,color:"var(--text-dim)"},children:"Materials resolved against Digitalfire database"})]})}),e.jsx("style",{children:ue})]})}export{Te as UMFCalculatorPage,Te as default};
