const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/plotly-gl2d-B8_X3w7e.js","assets/vendor-react-D380Hx73.js","assets/plotly-gl3d-DYPPaO4p.js","assets/ComparePanel-D0QpnKE_.js","assets/index-Beyst0Xe.js","assets/vendor-state-CUnBHQ16.js","assets/vendor-router-1trnvaIQ.js","assets/index-JM3wRy89.css","assets/OxideRadar-BRo5lEwo.js","assets/OxideLink-DfHeNf4K.js","assets/domain-digitalfire-DfgmtSpv.js","assets/data-digitalfire-CCT-bSzB.js","assets/factory-BqgISpRP.js","assets/umf-Bpe2KrgL.js","assets/validation-B6d6hXn8.js","assets/featureFlags-DeKxyuZW.js","assets/glazeService-vFHoEM6o.js","assets/export-CUxvy3P4.js","assets/usePageTitle-DBGH44HI.js","assets/index-4a_lvNVI.js","assets/index-DNJCmhuO.js"])))=>i.map(i=>d[i]);
import{r as o,j as e,R as Ot}from"./vendor-react-D380Hx73.js";import{d as Wt,b as Re,g as Vt,f as Nt,h as er,_ as Ye,j as Mt,k as fe,u as Kt,l as Ht,C as St,n as Ct,o as Fe,q as tr,s as rr,t as ar,v as or}from"./index-Beyst0Xe.js";import{c as Gt}from"./factory-BqgISpRP.js";import{g as ht}from"./umf-Bpe2KrgL.js";import{C as nr}from"./validation-B6d6hXn8.js";import{f as $e}from"./featureFlags-DeKxyuZW.js";import{f as sr}from"./glazeService-vFHoEM6o.js";import{U as Yt,F as qt,O as ir}from"./OxideRadar-BRo5lEwo.js";import{a as lr}from"./OxideLink-DfHeNf4K.js";import{exportPlotAsImage as Lt,exportAsPrintPDF as cr,exportSurfaceAsOBJ as dr,exportSurfaceAsSTL as pr,exportScatterAsCSV as xr}from"./export-CUxvy3P4.js";import{u as ur}from"./usePageTitle-DBGH44HI.js";const ut=["SiO2","Al2O3","B2O3","Na2O","K2O","CaO","MgO","ZnO","SrO","BaO"];function mr(t,i){const[n,l]=o.useState(()=>ut.reduce((S,L)=>({...S,[L]:1}),{})),[c,u]=o.useState(6),[f,d]=o.useState(n),b=o.useRef();o.useEffect(()=>(b.current=setTimeout(()=>d(n),150),()=>clearTimeout(b.current)),[n]);const x=o.useCallback(()=>{const S=ut.reduce((L,k)=>({...L,[k]:1}),{});l(S),d(S)},[]),h=o.useCallback((S,L)=>{l(k=>({...k,[S]:L}))},[]);return{results:o.useMemo(()=>{if(!t)return[];const S=Array.from(i.values());return sr(t,S,{weights:f,count:c,oxides:ut})},[t,i,f,c]),weights:n,count:c,setCount:u,updateWeight:h,resetWeights:x,oxides:ut}}function Xt(t){const{atmospheres:i,surfaces:n,coneMin:l,coneMax:c,hasIngredients:u,hasImages:f,activeCount:d}=Wt(),b=Re(x=>x.glazes);return o.useMemo(()=>d===0?t:t.filter(x=>{const h=b.get(x.id);if(i.size>0){const g=(h==null?void 0:h.atmosphere)??"unknown";if(!i.has(g))return!1}return!(n.size>0&&!n.has(x.surfaceType)||l!==null&&x.cone!==null&&x.cone<l||c!==null&&x.cone!==null&&x.cone>c||u&&h&&(!h.ingredients||h.ingredients.length===0)||f&&h&&(!h.images||h.images.length===0))}),[t,i,n,l,c,u,f,d,b])}function hr({glazeTypeId:t,showParent:i=!1,size:n="md"}){if(t==null)return e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:5,padding:n==="sm"?"1px 6px":"2px 8px",borderRadius:10,background:"var(--bg-tertiary, #2a2a3a)",fontSize:n==="sm"?10:11,color:"var(--text-muted, #666)"},children:[e.jsx("span",{style:{width:n==="sm"?6:8,height:n==="sm"?6:8,borderRadius:"50%",background:"#555",flexShrink:0}}),"Unclassified"]});const l=Vt(t),c=Nt(t),u=er(t),f=u&&u.id!==t?u.name:null;return e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:5,padding:n==="sm"?"1px 6px":"2px 8px",borderRadius:10,background:`${c}18`,border:`1px solid ${c}40`,fontSize:n==="sm"?10:11,color:"var(--text-label, #ccc)",lineHeight:1.4},children:[e.jsx("span",{style:{width:n==="sm"?6:8,height:n==="sm"?6:8,borderRadius:"50%",background:c,flexShrink:0}}),i&&f&&e.jsxs("span",{style:{color:"var(--text-muted, #666)"},children:[f," ›"]}),l]})}const _t=[{cone:-6,label:"06",color:"#6366f1"},{cone:-5,label:"05",color:"#818cf8"},{cone:-4,label:"04",color:"#3b82f6"},{cone:-3,label:"03",color:"#06b6d4"},{cone:-2,label:"02",color:"#14b8a6"},{cone:-1,label:"01",color:"#10b981"},{cone:0,label:"0",color:"#22c55e"},{cone:1,label:"1",color:"#84cc16"},{cone:2,label:"2",color:"#a3e635"},{cone:3,label:"3",color:"#eab308"},{cone:4,label:"4",color:"#facc15"},{cone:5,label:"5",color:"#f59e0b"},{cone:6,label:"6",color:"#f97316"},{cone:7,label:"7",color:"#ef4444"},{cone:8,label:"8",color:"#dc2626"},{cone:9,label:"9",color:"#e11d48"},{cone:10,label:"10",color:"#be185d"},{cone:11,label:"11",color:"#a855f7"},{cone:12,label:"12",color:"#7c3aed"}];function Rt(t){if(typeof t=="number")return t;const i=String(t).trim().toLowerCase();return/^0\d$/.test(i)?-parseInt(i[1]):parseInt(i)||0}function gr({coneRange:t,width:i=220,height:n=20}){const l=Rt(t[0]),c=Rt(t[1]),u=Math.min(l,c),f=Math.max(l,c),d=_t.length,b=i/d,x=10,h=x+12;return e.jsx("svg",{width:i,height:n,viewBox:`0 0 ${i} ${n}`,style:{display:"block"},"aria-label":`Firing range: cone ${t[0]} to ${t[1]}`,children:_t.map((g,S)=>{const L=g.cone>=u&&g.cone<=f;return e.jsxs("g",{children:[e.jsx("rect",{x:S*b,y:0,width:b,height:x,fill:L?g.color:"var(--bg-tertiary, #2a2a3a)",opacity:L?.9:.3,rx:S===0||S===d-1?3:0,children:e.jsxs("title",{children:["Cone ",g.label]})}),(g.cone===u||g.cone===f||g.cone===6||g.cone===0&&!L)&&e.jsx("text",{x:S*b+b/2,y:h,textAnchor:"middle",fill:L?"var(--text-label, #ccc)":"var(--text-muted, #555)",fontSize:8,fontFamily:"system-ui, sans-serif",fontWeight:L?600:400,children:g.label})]},g.cone)})})}const Ft=["#3b82f6","#f59e0b","#22c55e","#ef4444","#8b5cf6","#06b6d4","#f97316","#14b8a6","#e11d48","#a3e635","#6366f1","#eab308"];function br({ingredients:t,width:i=220,barHeight:n=18,gap:l=3}){const c=o.useMemo(()=>[...t.filter(h=>h.amount>0)].sort((h,g)=>g.amount-h.amount),[t]);if(c.length===0)return null;const u=c.reduce((x,h)=>x+h.amount,0),f=90,d=i-f-35,b=c.length*(n+l)-l;return e.jsx("svg",{width:i,height:b,viewBox:`0 0 ${i} ${b}`,style:{display:"block"},"aria-label":"Recipe ingredient proportions",children:c.map((x,h)=>{const g=h*(n+l),S=x.amount/u*100,L=Math.max(S/100*d,2),k=Ft[h%Ft.length];return e.jsxs("g",{children:[e.jsx("text",{x:f-4,y:g+n/2+1,textAnchor:"end",dominantBaseline:"central",fill:"var(--text-label, #aaa)",fontSize:10,fontFamily:"system-ui, sans-serif",children:x.material.length>14?x.material.slice(0,13)+"…":x.material}),e.jsx("rect",{x:f,y:g,width:d,height:n,fill:"var(--bg-tertiary, #2a2a3a)",rx:3}),e.jsx("rect",{x:f,y:g,width:L,height:n,fill:k,opacity:.8,rx:3,children:e.jsxs("title",{children:[x.material,": ",x.amount.toFixed(1)," (",S.toFixed(1),"%)"]})}),e.jsxs("text",{x:f+d+4,y:g+n/2+1,dominantBaseline:"central",fill:"var(--text-muted, #888)",fontSize:9,fontFamily:"'SF Mono', monospace",children:[S.toFixed(0),"%"]})]},`${x.material}-${h}`)})})}const At=.5,fr=7.2,yr=0,Pt=1;function vr({x:t,y:i,comparePoint:n,size:l=80}){const c=b=>(b-At)/(fr-At)*l,u=b=>(Pt-b)/(Pt-yr)*l,f=c(t),d=u(i);return e.jsxs("svg",{width:l,height:l,viewBox:`0 0 ${l} ${l}`,style:{display:"block",border:"1px solid var(--border-primary, #333)",borderRadius:4,background:"var(--bg-tertiary, #1e1e2e)"},"aria-label":`Stull position: SiO₂=${t.toFixed(2)}, Al₂O₃=${i.toFixed(2)}`,children:[e.jsx("rect",{x:0,y:0,width:c(3.2),height:u(.4),fill:"rgba(139,92,246,0.1)",rx:2}),e.jsx("rect",{x:c(3.2),y:u(.4),width:l-c(3.2),height:l-u(.4),fill:"rgba(34,197,94,0.08)",rx:2}),e.jsx("line",{x1:c(1.5),y1:u(.85),x2:c(6),y2:u(.15),stroke:"var(--border-primary, #444)",strokeWidth:.8,strokeDasharray:"3,2"}),e.jsx("text",{x:l/2,y:l-2,textAnchor:"middle",fill:"var(--text-muted, #555)",fontSize:7,fontFamily:"system-ui",children:"SiO₂"}),e.jsx("text",{x:3,y:l/2,textAnchor:"start",dominantBaseline:"central",fill:"var(--text-muted, #555)",fontSize:7,fontFamily:"system-ui",transform:`rotate(-90, 6, ${l/2})`,children:"Al₂O₃"}),e.jsx("text",{x:c(2),y:u(.7),textAnchor:"middle",fill:"var(--text-muted, #444)",fontSize:7,children:"M"}),e.jsx("text",{x:c(4.5),y:u(.2),textAnchor:"middle",fill:"var(--text-muted, #444)",fontSize:7,children:"G"}),n&&e.jsx("circle",{cx:c(n.x),cy:u(n.y),r:3,fill:"none",stroke:"#ef4444",strokeWidth:1.5}),e.jsx("circle",{cx:f,cy:d,r:4,fill:"#3b82f6",stroke:"white",strokeWidth:1.5,children:e.jsxs("title",{children:["SiO₂: ",t.toFixed(2),", Al₂O₃: ",i.toFixed(2)]})})]})}function kr(){const t=Re(c=>c.glazes),[i,n]=o.useState(!1);return o.useMemo(()=>{const c=Array.from(t.values()),u=new Map,f=new Map;for(const x of c){u.set(x.surfaceType,(u.get(x.surfaceType)??0)+1);const h=x.glazeTypeId??null;f.set(h,(f.get(h)??0)+1)}const d=[...f.entries()].filter(([x])=>x!==null).sort((x,h)=>h[1]-x[1]).slice(0,8),b=f.get(null)??0;return{total:c.length,bySurface:u,topTypes:d,unclassified:b}},[t]).total===0,null}const jr={surface:"Viridis",source:"Set1",flux_ratio:"Portland",confidence:"Greys",boron:"YlOrRd"},wr=[[0,"#818cf8"],[.5/19,"#818cf8"],[.5/19,"#6366f1"],[1.5/19,"#6366f1"],[1.5/19,"#3b82f6"],[2.5/19,"#3b82f6"],[2.5/19,"#06b6d4"],[3.5/19,"#06b6d4"],[3.5/19,"#14b8a6"],[4.5/19,"#14b8a6"],[4.5/19,"#10b981"],[5.5/19,"#10b981"],[5.5/19,"#22c55e"],[6.5/19,"#22c55e"],[6.5/19,"#84cc16"],[7.5/19,"#84cc16"],[7.5/19,"#a3e635"],[8.5/19,"#a3e635"],[8.5/19,"#d9f99d"],[9.5/19,"#d9f99d"],[9.5/19,"#facc15"],[10.5/19,"#facc15"],[10.5/19,"#f59e0b"],[11.5/19,"#f59e0b"],[11.5/19,"#f97316"],[12.5/19,"#f97316"],[12.5/19,"#ef4444"],[13.5/19,"#ef4444"],[13.5/19,"#dc2626"],[14.5/19,"#dc2626"],[14.5/19,"#e11d48"],[15.5/19,"#e11d48"],[15.5/19,"#a855f7"],[16.5/19,"#a855f7"],[16.5/19,"#7c3aed"],[17.5/19,"#7c3aed"],[17.5/19,"#6d28d9"],[18.5/19,"#6d28d9"],[18.5/19,"#581c87"],[1,"#581c87"]],Sr={unfused:{path:"M 0.5,0.39 L 2.8,1.0 L 0.5,1.0 Z",color:"rgba(120, 120, 120, 0.12)",label:"Unfused"},matte:{path:"M 0.5,0.05 L 0.5,0.39 L 2.8,1.0 L 4.0,1.0 Z",color:"rgba(76, 175, 80, 0.12)",label:"Matte"},semi_matte:{path:"M 1.2,0.242 L 4.0,1.0 L 5.0,1.0 Z",color:"rgba(139, 195, 74, 0.10)",label:"Semi-Matte"},bright_gloss:{path:"M 0.5,0.0 L 0.5,1.0 L 1.67,1.0 L 2.1,0.5 L 2.38,0.25 L 2.7,0.23 L 3.3,0.25 L 3.9,0.28 L 4.2,0.29 L 5.4,0.49 L 7.2,0.615 L 7.2,0 Z",color:"rgba(33, 150, 243, 0.08)",label:"Bright Gloss"},underfired:{path:"M 1.75,0.0 L 7.2,0.65 L 7.2,0.0 Z",color:"rgba(158, 158, 158, 0.12)",label:"Underfired"},crazed:{path:"M 0.5,0.0 L 0.5,0.05 L 1.2,0.242 L 1.75,0.0 Z",color:"rgba(244, 67, 54, 0.12)",label:"Crazed"}},Et={path:"M 1.8,0.2 L 4.2,0.6 L 6.0,0.8 L 7.2,0.92",color:"rgba(255, 255, 255, 0.35)"},Cr={1280:{path:"M 1.8 0.4 L 1.8 0.85 L 6.6 0.85 L 6.6 0.4 Z",color:"rgba(255, 255, 255, 0.4)",label:"1280°C"},1270:{path:"M 1.8 0.68 L 2.0 0.69 L 2.05 0.8 L 2.12 0.85 L 6.6 0.85 L 6.6 0.455 L 6.35 0.43 L 5.8 0.4 L 1.8 0.4 Z",color:"rgba(255, 255, 204, 0.4)",label:"1270°C"},1260:{path:"M 1.8 0.642 L 2.05 0.66 L 2.18 0.8 L 2.28 0.85 L 5.55 0.85 L 6.1 0.83 L 6.6 0.83 L 6.6 0.483 L 6.2 0.46 L 5.75 0.45 L 5.4 0.422 L 5.05 0.4 L 1.8 0.4 Z",color:"rgba(255, 255, 136, 0.4)",label:"1260°C"},1250:{path:"M 1.8 0.63 L 2.25 0.66 L 2.4 0.76 L 2.35 0.81 L 2.43 0.85 L 4.3 0.85 L 4.6 0.84 L 5.0 0.86 L 5.55 0.82 L 6.1 0.8 L 6.6 0.79 L 6.6 0.58 L 6.2 0.55 L 5.65 0.49 L 5.4 0.48 L 5.05 0.47 L 4.35 0.4 L 1.8 0.4 Z",color:"rgba(255, 255, 34, 0.4)",label:"1250°C"},1240:{path:"M 2.7 0.85 L 2.65 0.8 L 2.71 0.765 L 2.6 0.72 L 2.45 0.655 L 2.0 0.618 L 1.8 0.58 L 1.8 0.4 L 3.55 0.424 L 4.2 0.438 L 4.6 0.475 L 4.9 0.505 L 4.96 0.545 L 5.4 0.572 L 6.0 0.62 L 6.2 0.67 L 6.1 0.72 L 5.55 0.77 L 5.05 0.77 L 4.8 0.79 L 4.42 0.821 L 4.1 0.84 L 3.9 0.85 Z",color:"rgba(255, 221, 0, 0.4)",label:"1240°C"}};function zr({xAxis:t="SiO2",yAxis:i="Al2O3",colorBy:n="cone",zoom:l=1,width:c,height:u,highlightPointIds:f,highlightCircle:d,densityMap:b,showLimits:x=!1,limitCone:h=null}){const[g,S]=o.useState(null),[L,k]=o.useState(!1),[v,H]=o.useState(!1),[ie,P]=o.useState(0);o.useEffect(()=>{let p=!0;k(!1),H(!1);const y=setTimeout(()=>{p&&H(!0)},12e3);return Ye(()=>import("./plotly-gl2d-B8_X3w7e.js").then(Y=>Y.p),__vite__mapDeps([0,1])).then(Y=>{if(!p)return;clearTimeout(y);const ue=Gt(Y.default??Y);S(()=>ue)}).catch(()=>{p&&(clearTimeout(y),k(!0))}),()=>{p=!1,clearTimeout(y)}},[ie]);const K=Re(p=>p.getPlotPoints),J=Mt(p=>p.currentSetId),G=fe(p=>p.selectedGlaze),U=fe(p=>p.setSelectedGlaze),se=fe(p=>p.setHoveredPoint),ee=fe(p=>p.selectedForBlend),z=Kt(p=>p.blendResults),I=Ht(p=>p.theme),w=o.useMemo(()=>{const p=I==="dark";return{paper:p?"#1a1a1a":"#ffffff",plot:p?"#1e1e1e":"#f8f8f8",grid:p?"#333":"#ddd",zeroline:p?"#444":"#ccc",axisTitle:p?"#aaa":"#555",tick:p?"#888":"#666",font:p?"#ccc":"#333",regionLabel:p?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.18)",regionLabelStrong:p?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.22)",qLabel:p?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.3)",tempLabel:p?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.4)",coneBorder:p?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.07)",limitFill:p?"rgba(59,130,246,0.12)":"rgba(59,130,246,0.08)",limitBorder:p?"rgba(59,130,246,0.5)":"rgba(59,130,246,0.4)",limitLabel:p?"rgba(59,130,246,0.7)":"rgba(59,130,246,0.6)",limitDimBorder:p?"rgba(150,150,150,0.15)":"rgba(100,100,100,0.12)"}},[I]),T=o.useMemo(()=>{if(!x)return{shapes:[],annotations:[]};const p=re=>({SiO2:"SiO2",Al2O3:"Al2O3",B2O3:"B2O3",Na2O:"KNaO",K2O:"KNaO",CaO:"CaO",MgO:"MgO",ZnO:"ZnO",BaO:"BaO"})[re]??null,y=p(t),Y=p(i);if(!y||!Y)return{shapes:[],annotations:[]};const ue=[],$=[],Z=h||null;for(const re of nr){const we=re[y],Ne=re[Y];if(!we||!Ne)continue;const de=Z===re.cone;ue.push({type:"rect",x0:we.min,x1:we.max,y0:Ne.min,y1:Ne.max,fillcolor:de?w.limitFill:"transparent",line:{color:de?w.limitBorder:w.limitDimBorder,width:de?2:1,dash:de?"solid":"dot"},layer:"below"}),$.push({x:we.max,y:Ne.max,text:`▲${re.cone}`,showarrow:!1,font:{color:de?w.limitBorder:w.limitDimBorder,size:de?11:9},xanchor:"right",yanchor:"bottom"})}return{shapes:ue,annotations:$}},[x,h,t,i,w]),ae=o.useMemo(()=>K(J),[K,J]),E=Xt(ae),le=o.useMemo(()=>{if(z.length===0)return null;const p=z.map(ue=>ht(ue.umf,t)),y=z.map(ue=>ht(ue.umf,i)),Y=z.map((ue,$)=>{var Z;return((Z=ue.recipe)==null?void 0:Z.name)||`Blend ${$+1}`});return{type:"scattergl",mode:"markers",x:p,y,text:Y,name:"Blend Results",marker:{size:8,symbol:"diamond",color:"#ff9800",opacity:.9,line:{width:1,color:"#fff"}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>${t}: %{x:.2f}<br>${i}: %{y:.2f}<extra>Blend</extra>`}},[z,t,i]),m=o.useMemo(()=>{if(!d)return null;const{x:p,y,r:Y}=d;return{type:"circle",xref:"x",yref:"y",x0:p-Y,y0:y-Y,x1:p+Y,y1:y+Y,fillcolor:"rgba(244, 67, 54, 0.08)",line:{color:"rgba(244, 67, 54, 0.5)",width:2,dash:"dash"},layer:"above"}},[d]),N=o.useMemo(()=>E.filter(p=>p.x!=null&&p.y!=null&&!isNaN(p.x)&&!isNaN(p.y)&&p.x>0&&p.y>0&&(p.cone==null||p.cone>=-6&&p.cone<=13)),[E]),C=o.useMemo(()=>{if(!f||f.length===0)return null;const p=N.filter(y=>f.includes(y.id));return p.length===0?null:{type:"scattergl",mode:"markers",x:p.map(y=>y.x),y:p.map(y=>y.y),text:p.map(y=>y.name),name:"Highlighted",marker:{size:10,symbol:"circle",color:"rgba(255, 235, 59, 0.8)",line:{width:2,color:"#fff"}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>${t}: %{x:.2f}<br>${i}: %{y:.2f}<extra>Cluster</extra>`}},[f,N,t,i]),A=o.useMemo(()=>{if(!b||b.grid.length===0)return null;const{grid:p,bounds:y,resolution:Y}=b,ue=Array.from({length:Y},(Z,re)=>y.xMin+re/(Y-1)*(y.xMax-y.xMin)),$=Array.from({length:p.length},(Z,re)=>y.yMin+re/(p.length-1)*(y.yMax-y.yMin));return{type:"contour",x:ue,y:$,z:p,name:"Density",showscale:!1,contours:{coloring:"heatmap"},colorscale:[[0,"rgba(0,0,0,0)"],[.2,"rgba(33,150,243,0.08)"],[.4,"rgba(33,150,243,0.15)"],[.6,"rgba(255,235,59,0.2)"],[.8,"rgba(255,152,0,0.25)"],[1,"rgba(244,67,54,0.3)"]],hoverinfo:"skip"}},[b]),W=o.useMemo(()=>n==="glaze_type"?N.map(p=>Nt(p.glazeTypeId)):N.map(p=>{switch(n){case"cone":return p.cone??6;case"surface":return Or(p.surfaceType);case"source":return Nr(p.source);case"flux_ratio":return p.fluxRatio;case"confidence":return Mr(p.confidence);case"boron":return p.boron;default:return 0}}),[N,n]),te=o.useMemo(()=>({type:"scattergl",mode:"markers",x:N.map(p=>p.x),y:N.map(p=>p.y),customdata:N.map(p=>p.id),text:N.map(p=>p.name),marker:{size:5,opacity:.7,color:W,...n==="glaze_type"?{}:{colorscale:n==="cone"?wr:jr[n]||"Viridis",reversescale:!1,cmin:n==="cone"?-6:void 0,cmax:n==="cone"?13:void 0,colorbar:{title:Tr(n),thickness:15,len:.7,tickvals:n==="cone"?Ct:void 0,ticktext:n==="cone"?St:void 0}},line:{width:N.map(p=>(G==null?void 0:G.id)===p.id?2:ee.some(y=>y.id===p.id)?1.5:0),color:N.map(p=>(G==null?void 0:G.id)===p.id?"white":ee.some(y=>y.id===p.id)?"orange":"transparent")}},hoverinfo:"text",hovertemplate:N.map(p=>{const y=[`<b>${p.name}</b>`,`${t}: ${p.x.toFixed(2)}`,`${i}: ${p.y.toFixed(2)}`,`Cone: ${p.cone!=null?Fe(p.cone):"unknown"}`];return n==="glaze_type"&&y.push(Vt(p.glazeTypeId)),y.join("<br>")+"<extra></extra>"})}),[N,W,n,t,i,G,ee]),ce=3.85,ve=.5,ke=3.35/l,he=.5/l,De=o.useMemo(()=>({xaxis:{title:{text:t,font:{color:w.axisTitle}},range:[ce-ke,ce+ke],gridcolor:w.grid,zerolinecolor:w.zeroline,tickfont:{color:w.tick}},yaxis:{title:{text:i,font:{color:w.axisTitle}},range:[ve-he,ve+he],gridcolor:w.grid,zerolinecolor:w.zeroline,tickfont:{color:w.tick}},paper_bgcolor:w.paper,plot_bgcolor:w.plot,font:{color:w.font},dragmode:"pan",hovermode:"closest",margin:{l:60,r:30,t:30,b:60},annotations:[{x:1.5,y:.75,text:"UNFUSED",showarrow:!1,font:{color:w.regionLabel,size:11},textangle:-35},{x:2.3,y:.55,text:"MATTE",showarrow:!1,font:{color:w.regionLabelStrong,size:12},textangle:-35},{x:3.4,y:.65,text:"SEMI-MATTE",showarrow:!1,font:{color:w.regionLabel,size:10},textangle:-30},{x:4.5,y:.25,text:"BRIGHT GLOSS",showarrow:!1,font:{color:w.regionLabel,size:11}},{x:5,y:.1,text:"UNDERFIRED",showarrow:!1,font:{color:w.regionLabelStrong,size:10},textangle:-15},{x:1.2,y:.08,text:"CRAZED",showarrow:!1,font:{color:w.regionLabelStrong,size:10}},{x:6.8,y:.88,text:"Q",showarrow:!1,font:{color:w.qLabel,size:11,family:"serif"}},...$e.tempContours?[{x:6.4,y:.42,text:"1280°C",showarrow:!1,font:{color:w.tempLabel,size:9}},{x:6.4,y:.48,text:"1270°C",showarrow:!1,font:{color:"rgba(255,255,204,0.6)",size:9}},{x:6.4,y:.52,text:"1260°C",showarrow:!1,font:{color:"rgba(255,255,136,0.7)",size:9}},{x:6.4,y:.6,text:"1250°C",showarrow:!1,font:{color:"rgba(255,255,34,0.7)",size:9}},{x:5.9,y:.68,text:"1240°C",showarrow:!1,font:{color:"rgba(255,221,0,0.8)",size:9}}]:[],...T.annotations],shapes:[...Object.values(Sr).map(p=>({type:"path",path:p.path,fillcolor:p.color,line:{width:0},layer:"below"})),{type:"path",path:Et.path,fillcolor:"transparent",line:{color:Et.color,width:1.5,dash:"dot"},layer:"below"},...$e.tempContours?Object.values(Cr).map(p=>({type:"path",path:p.path,fillcolor:"transparent",line:{color:p.color,width:1},layer:"below"})):[],...T.shapes,...m?[m]:[]]}),[t,i,ke,he,m,w,T]),Te=o.useCallback(p=>{var Y;const y=(Y=p.points)==null?void 0:Y[0];if(y!=null&&y.customdata){const $=Re.getState().glazes.get(y.customdata);$&&U($)}},[U]),Oe=o.useCallback(p=>{var Y;const y=(Y=p.points)==null?void 0:Y[0];y&&se({id:y.customdata,name:y.text,source:"unknown",x:y.x,y:y.y,cone:null,surfaceType:"unknown",fluxRatio:0,boron:0,confidence:"inferred",glazeTypeId:null})},[se]),Ie={displayModeBar:!0,modeBarButtonsToRemove:["select2d","lasso2d","autoScale2d"],scrollZoom:!0,doubleClick:"reset"};return g?e.jsx(g,{data:[...A?[A]:[],te,...le?[le]:[],...C?[C]:[]],layout:De,config:Ie,onClick:Te,onHover:Oe,useResizeHandler:!0,style:{width:c||"100%",height:u||"100%"}}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,width:c||"100%",height:u||"100%",color:"#777",fontSize:13,background:"var(--bg-secondary, #1a1a1a)",borderRadius:8,...L?{}:{animation:"pulse 1.5s ease-in-out infinite"}},children:[e.jsx("style",{children:"@keyframes pulse { 0%,100% { opacity: 0.6 } 50% { opacity: 1 } }"}),L?e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{fontSize:22},children:"⚠"}),e.jsx("span",{children:"Chart engine failed to load"}),e.jsx("button",{onClick:()=>P(p=>p+1),style:{marginTop:4,padding:"6px 16px",borderRadius:6,border:"1px solid #555",background:"var(--bg-tertiary, #252525)",color:"#ccc",cursor:"pointer",fontSize:13},children:"Tap to retry"})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Loading chart engine…"}),v&&e.jsx("span",{style:{fontSize:11,color:"#666"},children:"Slow connection — still trying…"})]})]})}function Or(t){return{matte:1,satin:2,gloss:3,crystalline:4,crawl:5,unknown:0}[t]??0}function Nr(t){return{glazy:1,digitalfire:2,user:3,calculated:4}[t]??0}function Mr(t){return{unknown:0,assumed:1,inferred:2,declared:3,verified:4}[t]??0}function Tr(t){return{cone:"Cone",surface:"Surface",source:"Source",flux_ratio:"R2O:RO",confidence:"Confidence",boron:"B2O3"}[t]||t}const Lr="https://iupac.org/what-we-do/periodic-table-of-elements/",_r="https://www.ciaaw.org/atomic-weights.htm",Rr=[{label:"Fluxes (R₂O)",oxides:["Li2O","Na2O","K2O"]},{label:"Fluxes (RO)",oxides:["MgO","CaO","SrO","BaO","ZnO","PbO"]},{label:"Stabilizers (R₂O₃)",oxides:["Al2O3","B2O3","Fe2O3"]},{label:"Glass Formers (RO₂)",oxides:["SiO2","TiO2","ZrO2","SnO2"]},{label:"Colorants / Other",oxides:["MnO","MnO2","NiO","CuO","Cu2O","CoO","Cr2O3","P2O5","F"]}],Fr=["₀","₁","₂","₃","₄","₅","₆","₇","₈","₉"];function Ar(t){return t.replace(/\d/g,i=>Fr[parseInt(i)])}function Pr(){const{currentSetId:t,availableSets:i,setMolarWeightSet:n}=Mt(),[l,c]=o.useState(!1),u=o.useMemo(()=>i.find(d=>d.id===t),[i,t]),f=o.useMemo(()=>tr(t),[t]);return e.jsxs("div",{className:"molar-set-picker",children:[e.jsxs("div",{className:"molar-header",children:[e.jsx("h3",{children:"Molar Weights"}),e.jsx("button",{className:"molar-info-toggle",onClick:()=>c(!l),title:l?"Hide weight table":"Show all molecular weights",children:l?"▾":"ⓘ"})]}),e.jsx("div",{className:"molar-set-buttons",children:i.map(d=>e.jsxs("button",{className:`molar-set-button ${t===d.id?"active":""}`,onClick:()=>n(d.id),title:d.notes,children:[e.jsx("span",{className:"molar-set-name",children:d.name}),d.year&&e.jsx("span",{className:"molar-set-year",children:d.year})]},d.id))}),e.jsxs("div",{className:"molar-source-info",children:[e.jsxs("p",{className:"molar-source-text",children:["Default: ",e.jsx("strong",{children:"IUPAC 2023"})," Standard Atomic Weights with 2024 revisions (Gd, Lu, Zr)."]}),e.jsxs("div",{className:"molar-source-links",children:[e.jsx("a",{href:Lr,target:"_blank",rel:"noopener noreferrer",children:"IUPAC Periodic Table"}),e.jsx("span",{className:"molar-link-sep",children:"·"}),e.jsx("a",{href:_r,target:"_blank",rel:"noopener noreferrer",children:"CIAAW Atomic Weights"})]})]}),l&&e.jsxs("div",{className:"molar-weight-table",children:[e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Oxide"}),e.jsx("th",{children:"g/mol"})]})}),e.jsx("tbody",{children:Rr.map(d=>e.jsxs(Ot.Fragment,{children:[e.jsx("tr",{className:"molar-group-header",children:e.jsx("td",{colSpan:2,children:d.label})}),d.oxides.map(b=>{var x;return e.jsxs("tr",{children:[e.jsx("td",{className:"molar-oxide-name",children:Ar(b)}),e.jsx("td",{className:"molar-oxide-value",children:((x=f[b])==null?void 0:x.toFixed(4))??"—"})]},b)})]},d.label))})]}),e.jsxs("p",{className:"molar-table-note",children:["Active set: ",(u==null?void 0:u.name)??t,(u==null?void 0:u.notes)&&e.jsxs(e.Fragment,{children:[e.jsx("br",{}),u.notes]})]})]}),e.jsx("style",{children:`
        .molar-set-picker {
          padding: 16px;
          background: var(--bg-elevated);
          border-radius: 8px;
        }
        .molar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .molar-header h3 {
          margin: 0;
          font-size: 14px;
          color: var(--text-bright);
        }
        .molar-info-toggle {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 16px;
          padding: 2px 6px;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .molar-info-toggle:hover {
          background: var(--bg-input);
          color: var(--accent);
        }
        .molar-set-buttons {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 12px;
        }
        .molar-set-button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          background: var(--bg-input);
          border: 1px solid var(--border-secondary);
          border-radius: 6px;
          color: var(--text-label);
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        .molar-set-button:hover {
          background: var(--border-input);
          border-color: var(--text-dim);
        }
        .molar-set-button.active {
          background: var(--accent-bg);
          border-color: var(--accent);
          color: var(--text-bright);
        }
        .molar-set-name {
          font-weight: 500;
          font-size: 13px;
        }
        .molar-set-year {
          font-size: 11px;
          background: var(--border-secondary);
          padding: 2px 6px;
          border-radius: 10px;
          color: var(--text-secondary);
        }
        .molar-source-info {
          padding: 10px 12px;
          background: var(--bg-input);
          border-radius: 6px;
          border-left: 3px solid var(--accent);
        }
        .molar-source-text {
          margin: 0 0 6px 0;
          font-size: 12px;
          color: var(--text-label);
          line-height: 1.4;
        }
        .molar-source-links {
          display: flex;
          gap: 4px;
          align-items: center;
        }
        .molar-source-links a {
          font-size: 11px;
          color: var(--accent);
          text-decoration: none;
        }
        .molar-source-links a:hover {
          text-decoration: underline;
        }
        .molar-link-sep {
          color: var(--text-dim);
          font-size: 11px;
        }
        .molar-weight-table {
          margin-top: 12px;
          border: 1px solid var(--border-secondary);
          border-radius: 6px;
          overflow: hidden;
        }
        .molar-weight-table table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }
        .molar-weight-table thead th {
          text-align: left;
          padding: 6px 10px;
          background: var(--bg-input);
          color: var(--text-secondary);
          font-weight: 600;
          border-bottom: 1px solid var(--border-secondary);
        }
        .molar-weight-table thead th:last-child {
          text-align: right;
        }
        .molar-group-header td {
          padding: 6px 10px;
          font-size: 11px;
          font-weight: 600;
          color: var(--accent);
          background: var(--bg-input);
          letter-spacing: 0.3px;
        }
        .molar-oxide-name {
          padding: 4px 10px;
          color: var(--text-label);
          font-family: 'SF Mono', 'Fira Code', monospace;
        }
        .molar-oxide-value {
          padding: 4px 10px;
          text-align: right;
          color: var(--text-bright);
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-variant-numeric: tabular-nums;
        }
        .molar-weight-table tbody tr:hover {
          background: var(--bg-input);
        }
        .molar-table-note {
          margin: 0;
          padding: 8px 10px;
          font-size: 10px;
          color: var(--text-tertiary);
          border-top: 1px solid var(--border-secondary);
          line-height: 1.3;
        }
      `})]})}function Er(){const{currentSetId:t,availableSets:i,setAnalysisSet:n}=rr(),[l,c]=o.useState(!1),u=i.find(d=>d.id===t),f=i.filter(d=>d.status==="populated"||d.id==="app_default");return f.length<=1?null:e.jsxs("div",{className:"analysis-set-picker",children:[e.jsxs("div",{className:"analysis-header",children:[e.jsx("h3",{children:"Material Analyses"}),e.jsx("button",{className:"analysis-info-toggle",onClick:()=>c(!l),title:l?"Hide details":"Show source details",children:l?"▾":"ⓘ"})]}),e.jsx("div",{className:"analysis-set-buttons",children:f.map(d=>e.jsxs("button",{className:`analysis-set-button ${t===d.id?"active":""}`,onClick:()=>n(d.id),title:d.notes,children:[e.jsx("span",{className:"analysis-set-name",children:d.name}),e.jsxs("span",{className:"analysis-set-meta",children:[d.year&&e.jsx("span",{className:"analysis-set-year",children:d.year}),d.materialCount>0&&e.jsxs("span",{className:"analysis-set-count",children:[d.materialCount," mat",d.materialCount!==1?"s":""]})]})]},d.id))}),e.jsxs("div",{className:"analysis-source-info",children:[e.jsx("p",{className:"analysis-source-text",children:(u==null?void 0:u.id)==="app_default"?e.jsxs(e.Fragment,{children:["Default: ",e.jsx("strong",{children:"Stull Atlas built-in"})," analyses from"," ",e.jsx("a",{href:"https://digitalfire.com",target:"_blank",rel:"noopener noreferrer",children:"Digitalfire"}),", verified Feb 2026."]}):e.jsxs(e.Fragment,{children:["Active: ",e.jsx("strong",{children:u==null?void 0:u.name}),(u==null?void 0:u.authority)&&e.jsxs(e.Fragment,{children:[" — ",u.authority]})]})}),u&&u.materialCount>0&&u.id!=="app_default"&&e.jsxs("p",{className:"analysis-override-note",children:[u.materialCount," material",u.materialCount!==1?"s":""," overridden — all others use default values."]})]}),l&&e.jsx("div",{className:"analysis-details",children:f.map(d=>e.jsxs("div",{className:"analysis-detail-row",children:[e.jsxs("div",{className:"analysis-detail-header",children:[e.jsx("strong",{children:d.name}),e.jsx("span",{className:"analysis-detail-year",children:d.year})]}),e.jsxs("div",{className:"analysis-detail-meta",children:[d.source,d.authority&&e.jsxs(e.Fragment,{children:[" — ",d.authority]})]}),d.notes&&e.jsx("div",{className:"analysis-detail-notes",children:d.notes})]},d.id))}),e.jsx("p",{className:"analysis-thanks",children:"Thanks, Tony"}),e.jsx("style",{children:`
        .analysis-set-picker {
          padding: 16px;
          background: var(--bg-elevated);
          border-radius: 8px;
        }
        .analysis-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .analysis-header h3 {
          margin: 0;
          font-size: 14px;
          color: var(--text-bright);
        }
        .analysis-info-toggle {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 16px;
          padding: 2px 6px;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .analysis-info-toggle:hover {
          background: var(--bg-input);
          color: var(--accent);
        }
        .analysis-set-buttons {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 12px;
        }
        .analysis-set-button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          background: var(--bg-input);
          border: 1px solid var(--border-secondary);
          border-radius: 6px;
          color: var(--text-label);
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        .analysis-set-button:hover {
          background: var(--border-input);
          border-color: var(--text-dim);
        }
        .analysis-set-button.active {
          background: var(--accent-bg);
          border-color: var(--accent);
          color: var(--text-bright);
        }
        .analysis-set-name {
          font-weight: 500;
          font-size: 13px;
        }
        .analysis-set-meta {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .analysis-set-year {
          font-size: 11px;
          background: var(--border-secondary);
          padding: 2px 6px;
          border-radius: 10px;
          color: var(--text-secondary);
        }
        .analysis-set-count {
          font-size: 10px;
          color: var(--text-tertiary);
        }
        .analysis-source-info {
          padding: 10px 12px;
          background: var(--bg-input);
          border-radius: 6px;
          border-left: 3px solid var(--accent);
        }
        .analysis-source-text {
          margin: 0;
          font-size: 12px;
          color: var(--text-label);
          line-height: 1.4;
        }
        .analysis-source-text a {
          color: var(--accent);
          text-decoration: none;
        }
        .analysis-source-text a:hover {
          text-decoration: underline;
        }
        .analysis-override-note {
          margin: 6px 0 0 0;
          font-size: 11px;
          color: var(--text-tertiary);
          font-style: italic;
        }
        .analysis-details {
          margin-top: 12px;
          border: 1px solid var(--border-secondary);
          border-radius: 6px;
          overflow: hidden;
        }
        .analysis-detail-row {
          padding: 10px 12px;
          border-bottom: 1px solid var(--border-secondary);
        }
        .analysis-detail-row:last-child {
          border-bottom: none;
        }
        .analysis-detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2px;
          font-size: 13px;
          color: var(--text-bright);
        }
        .analysis-detail-year {
          font-size: 11px;
          background: var(--border-secondary);
          padding: 2px 6px;
          border-radius: 10px;
          color: var(--text-secondary);
        }
        .analysis-detail-meta {
          font-size: 11px;
          color: var(--text-secondary);
          margin-bottom: 2px;
        }
        .analysis-detail-notes {
          font-size: 10px;
          color: var(--text-tertiary);
          line-height: 1.3;
          margin-top: 4px;
        }
        .analysis-thanks {
          margin: 8px 0 0 0;
          font-size: 10px;
          color: color-mix(in srgb, currentColor 25%, transparent);
          text-align: right;
        }
      `})]})}function Qt(t,i){return Math.exp(-t/(2*i))}function $r(t,i,n){const l=t.length;if(l<4)return .3;const c=i[1]-i[0]||1,u=n[1]-n[0]||1,f=t.map(k=>(k.x-i[0])/c),d=t.map(k=>(k.y-n[0])/u),b=f.reduce((k,v)=>k+v,0)/l,x=d.reduce((k,v)=>k+v,0)/l,h=Math.sqrt(f.reduce((k,v)=>k+(v-b)**2,0)/l)||.1,g=Math.sqrt(d.reduce((k,v)=>k+(v-x)**2,0)/l)||.1,L=1.4*((h+g)/2)*Math.pow(l,-.2);return Math.max(L,.03)}function Dr(t,i,n,l,c){let u=0,f=0;for(const d of n){const b=t-d.nx,x=i-d.ny,h=b*b+x*x,g=Qt(h,l)*d.robustWeight;u+=g*d.z,f+=g}return f>=c?u/f:null}function Ir(t,i,n){const l=i[t];let c=0,u=0;for(let f=0;f<i.length;f++){if(f===t)continue;const d=i[f],b=l.nx-d.nx,x=l.ny-d.ny,h=b*b+x*x,g=Qt(h,n)*d.robustWeight;c+=g*d.z,u+=g}return u>.01?c/u:null}function Br(t,i){const{xRange:n,yRange:l,resolution:c=35,minWeight:u=.5}=i,f=i.bandwidth??$r(t,n,l),d=n[1]-n[0],b=l[1]-l[0],x=Array.from({length:c},(z,I)=>n[0]+I/(c-1)*d),h=Array.from({length:c},(z,I)=>l[0]+I/(c-1)*b),g=1/(d||1),S=1/(b||1),L=f*f,k=t.filter(z=>isFinite(z.z)&&!isNaN(z.z)).map(z=>({nx:(z.x-n[0])*g,ny:(z.y-l[0])*S,z:z.z,robustWeight:1}));if(k.length===0)return{xCoords:x,yCoords:h,z:h.map(()=>x.map(()=>null)),stats:{validCells:0,totalCells:c*c,zMin:0,zMax:0,zMean:0}};const v=[];for(let z=0;z<k.length;z++){const I=Ir(z,k,L);v.push(I!=null?Math.abs(k[z].z-I):0)}const H=v.filter(z=>z>0).sort((z,I)=>z-I),ie=H.length>0?H[Math.floor(H.length/2)]*1.4826:1,P=3*Math.max(ie,1e-6);let K=0;for(let z=0;z<k.length;z++)v[z]>P&&(k[z].robustWeight=P/v[z],K++);const J=[];let G=0,U=1/0,se=-1/0,ee=0;for(let z=0;z<c;z++){const I=[],w=(h[z]-l[0])*S;for(let T=0;T<c;T++){const ae=(x[T]-n[0])*g,E=Dr(ae,w,k,L,u);E!=null?(I.push(E),G++,E<U&&(U=E),E>se&&(se=E),ee+=E):I.push(null)}J.push(I)}return K>0&&console.debug(`[surfaceFit] Robust fit downweighted ${K} of ${k.length} points (MAD=${ie.toFixed(4)}, threshold=${P.toFixed(4)})`),{xCoords:x,yCoords:h,z:J,stats:{validCells:G,totalCells:c*c,zMin:G>0?U:0,zMax:G>0?se:0,zMean:G>0?ee/G:0}}}function Zr(t,i){return Math.exp(-t/(2*i))}function Ur(t,i,n){const l=t.length;if(l<4)return .3;const c=i[1]-i[0]||1,u=n[1]-n[0]||1,f=t.map(k=>(k.x-i[0])/c),d=t.map(k=>(k.y-n[0])/u),b=f.reduce((k,v)=>k+v,0)/l,x=d.reduce((k,v)=>k+v,0)/l,h=Math.sqrt(f.reduce((k,v)=>k+(v-b)**2,0)/l)||.1,g=Math.sqrt(d.reduce((k,v)=>k+(v-x)**2,0)/l)||.1,L=1.6*((h+g)/2)*Math.pow(l,-.2);return Math.max(L,.03)}const Wr=["gloss","matte","satin","crystalline","crawl"];function Vr(t,i){const{xRange:n,yRange:l,resolution:c=30,minWeight:u=.3,minConfidence:f=.3}=i,d=i.bandwidth??Ur(t,n,l),b=n[1]-n[0],x=l[1]-l[0],h=Array.from({length:c},(K,J)=>n[0]+J/(c-1)*b),g=Array.from({length:c},(K,J)=>l[0]+J/(c-1)*x),S=1/(b||1),L=1/(x||1),k=d*d,v=t.filter(K=>K.surfaceType&&K.surfaceType!=="unknown").map(K=>({nx:(K.x-n[0])*S,ny:(K.y-l[0])*L,type:K.surfaceType}));if(v.length===0)return{xCoords:h,yCoords:g,cells:g.map(()=>h.map(()=>null)),stats:{validCells:0,totalCells:c*c,typeCounts:{}}};const H=[];let ie=0;const P={};for(let K=0;K<c;K++){const J=[],G=(g[K]-l[0])*L;for(let U=0;U<c;U++){const se=(h[U]-n[0])*S,ee={};let z=0;for(const I of v){const w=se-I.nx,T=G-I.ny,ae=w*w+T*T,E=Zr(ae,k);ee[I.type]=(ee[I.type]??0)+E,z+=E}if(z>=u){let I="unknown",w=0;for(const ae of Wr){const E=ee[ae]??0;E>w&&(w=E,I=ae)}const T=z>0?w/z:0;T>=f?(J.push({type:I,confidence:T,votes:ee}),ie++,P[I]=(P[I]??0)+1):J.push(null)}else J.push(null)}H.push(J)}return{xCoords:h,yCoords:g,cells:H,stats:{validCells:ie,totalCells:c*c,typeCounts:P}}}const Kr={gloss:"#3b82f6",matte:"#22c55e",satin:"#f59e0b",crystalline:"#a855f7",crawl:"#ef4444",unknown:"#6b7280"},$t=(t,i)=>{const n=Kr[t]??"#6b7280",l=parseInt(n.slice(1,3),16),c=parseInt(n.slice(3,5),16),u=parseInt(n.slice(5,7),16);return`rgba(${l}, ${c}, ${u}, ${i})`},Hr=[["SiO2",2,.48],["Al2O3",3,.6],["B2O3",3,.42],["Na2O",1,1.15],["K2O",1,1.4],["Li2O",1,1],["CaO",1,1],["MgO",1,.78],["BaO",1,1.15],["SrO",1,1.1],["ZnO",1,.92],["PbO",1,1.15],["Fe2O3",3,.75],["TiO2",2,.61],["ZrO2",2,.55],["MnO",1,.95],["NiO",1,.9],["CuO",1,.9],["CoO",1,.9],["Cr2O3",3,.65],["P2O5",5,.4]],Gr=[["SiO2",1,1.57],["Al2O3",2,.84],["B2O3",2,1.34],["Na2O",2,.19],["K2O",2,.13],["Li2O",2,.23],["CaO",1,.33],["MgO",1,.45],["BaO",1,.24],["SrO",1,.28],["ZnO",1,.4],["PbO",1,.27],["Fe2O3",2,.73],["TiO2",1,1.19]],_e={x:[.4,7.5],y:[0,1.1]};function zt(t,i,n){var I;if(i==="cone")return n??6;if(!t)return 0;const l=w=>{var T;return((T=t==null?void 0:t[w])==null?void 0:T.value)??0},c=l("SiO2"),u=l("Al2O3"),f=l("B2O3"),d=l("Na2O"),b=l("K2O"),x=l("Li2O"),h=l("CaO"),g=l("MgO"),S=l("ZnO"),L=l("BaO"),k=l("SrO"),v=l("PbO"),H=l("Fe2O3"),ie=l("TiO2"),P=l("MnO"),K=l("NiO"),J=l("CuO"),G=l("CoO"),U=l("Cr2O3");l("P2O5");const se=d+b+x,ee=h+g+S+L+k+v,z=se+ee;switch(i){case"flux_ratio":return z>0?se/z:0;case"SiO2_Al2O3_ratio":return u>0?c/u:0;case"total_flux_moles":return((I=t._meta)==null?void 0:I.totalFluxMoles)??0;case"thermal_expansion":return d*33.3+b*28.3+x*27+h*16.3+g*4.5+S*7+L*14+k*12+f*-5+u*5+c*3.8;case"nbo_t":{const w=c+2*u;return w>0?Math.max(0,2*(z-u))/w:0}case"optical_basicity":{let w=0,T=0;for(const[ae,E,le]of Hr){const m=l(ae);w+=m*E*le,T+=m*E}return T>0?w/T:0}case"flux_entropy":{const w=[d,b,x,h,g,S,L,k,v].filter(E=>E>0),T=w.reduce((E,le)=>E+le,0);if(T<=0)return 0;let ae=0;for(const E of w){const le=E/T;ae-=le*Math.log(le)}return ae}case"cao_mgo_ratio":return h+g>0?h/(h+g):.5;case"combined_alkali":return se;case"na2o_k2o_ratio":return d+b>0?d/(d+b):.5;case"viscosity_index":return z>0?(c+u)/z:0;case"surface_tension":{let w=0,T=0;for(const[ae,E,le]of Gr){const m=l(ae);w+=m*E*le,T+=m*E}return T>0?w/T:0}case"durability":return se>.001?c/se:c*100;case"total_colorant":return H+J+G+P+K+U+ie;case"fe_ti_ratio":return H+ie>0?H/(H+ie):.5;default:return l(i)}}const Ge={x:.5,y:.5,z:.5,cone:0,surface:0},Jt=[[0,"#818cf8"],[.5/19,"#818cf8"],[.5/19,"#6366f1"],[1.5/19,"#6366f1"],[1.5/19,"#3b82f6"],[2.5/19,"#3b82f6"],[2.5/19,"#06b6d4"],[3.5/19,"#06b6d4"],[3.5/19,"#14b8a6"],[4.5/19,"#14b8a6"],[4.5/19,"#10b981"],[5.5/19,"#10b981"],[5.5/19,"#22c55e"],[6.5/19,"#22c55e"],[6.5/19,"#84cc16"],[7.5/19,"#84cc16"],[7.5/19,"#a3e635"],[8.5/19,"#a3e635"],[8.5/19,"#d9f99d"],[9.5/19,"#d9f99d"],[9.5/19,"#facc15"],[10.5/19,"#facc15"],[10.5/19,"#f59e0b"],[11.5/19,"#f59e0b"],[11.5/19,"#f97316"],[12.5/19,"#f97316"],[12.5/19,"#ef4444"],[13.5/19,"#ef4444"],[13.5/19,"#dc2626"],[14.5/19,"#dc2626"],[14.5/19,"#e11d48"],[15.5/19,"#e11d48"],[15.5/19,"#a855f7"],[16.5/19,"#a855f7"],[16.5/19,"#7c3aed"],[17.5/19,"#7c3aed"],[17.5/19,"#6d28d9"],[18.5/19,"#6d28d9"],[18.5/19,"#581c87"],[1,"#581c87"]],Yr={cone:Jt,surface:"Viridis",source:"Set1",flux_ratio:"Portland",confidence:"Greys",boron:"YlOrRd",z_axis:"Viridis"},qr={default:t=>({eye:{x:1.5/t,y:-1.8/t,z:1.2/t},up:{x:0,y:0,z:1}}),top:t=>({eye:{x:.001,y:-.001,z:3/t},up:{x:0,y:1,z:0}}),"side-x":t=>({eye:{x:0,y:-3/t,z:.5/t},up:{x:0,y:0,z:1}}),"side-y":t=>({eye:{x:3/t,y:0,z:.5/t},up:{x:0,y:0,z:1}})};function Xr(t){return[{name:"Unfused",vertices:[[.5,.39],[2.8,1],[.5,1]],triangles:[[0,1,2]],color:"rgba(120, 120, 120, 0.15)"},{name:"Matte",vertices:[[.5,.05],[.5,.39],[2.8,1],[4,1]],triangles:[[0,1,2],[0,2,3]],color:"rgba(76, 175, 80, 0.15)"},{name:"Semi-Matte",vertices:[[1.2,.242],[4,1],[5,1]],triangles:[[0,1,2]],color:"rgba(139, 195, 74, 0.12)"},{name:"Crazed",vertices:[[.5,0],[.5,.05],[1.2,.242],[1.75,0]],triangles:[[0,1,2],[0,2,3]],color:"rgba(244, 67, 54, 0.15)"},{name:"Underfired",vertices:[[1.75,0],[7.2,.65],[7.2,0]],triangles:[[0,1,2]],color:"rgba(158, 158, 158, 0.15)"},{name:"Bright Gloss",vertices:[[.5,0],[.5,.05],[1.2,.242],[1.75,0],[2.7,.23],[3.3,.25],[3.9,.28],[4.2,.29],[5.4,.49],[7.2,.615],[7.2,0]],triangles:[[0,3,10],[3,4,10],[4,5,10],[5,6,10],[6,7,10],[7,8,10],[8,9,10]],color:"rgba(33, 150, 243, 0.10)"}].map(n=>{const l=[],c=[],u=[],f=[],d=[],b=[];for(const x of n.vertices)l.push(x[0]),c.push(x[1]),u.push(t);for(const x of n.triangles)f.push(x[0]),d.push(x[1]),b.push(x[2]);return{type:"mesh3d",x:l,y:c,z:u,i:f,j:d,k:b,color:n.color,opacity:.3,flatshading:!0,hoverinfo:"text",hovertext:n.name,name:n.name,showlegend:!1,lighting:{ambient:1,diffuse:0,specular:0}}})}function Qr(t,i){return[{label:"1280°C",vertices:[[1.8,.4],[1.8,.85],[6.6,.85],[6.6,.4]],triangles:[[0,1,2],[0,2,3]],color:i?"rgba(239, 68, 68, 0.06)":"rgba(239, 68, 68, 0.04)"},{label:"1260°C",vertices:[[2,.45],[2,.8],[6.2,.8],[6.2,.45]],triangles:[[0,1,2],[0,2,3]],color:i?"rgba(245, 158, 11, 0.06)":"rgba(245, 158, 11, 0.04)"},{label:"1240°C",vertices:[[2.4,.5],[2.4,.75],[5.8,.75],[5.8,.5]],triangles:[[0,1,2],[0,2,3]],color:i?"rgba(234, 179, 8, 0.06)":"rgba(234, 179, 8, 0.04)"}].map(l=>{const c=[],u=[],f=[],d=[],b=[],x=[];for(const h of l.vertices)c.push(h[0]),u.push(h[1]),f.push(t);for(const h of l.triangles)d.push(h[0]),b.push(h[1]),x.push(h[2]);return{type:"mesh3d",x:c,y:u,z:f,i:d,j:b,k:x,color:l.color,opacity:.5,flatshading:!0,hoverinfo:"text",hovertext:l.label,name:l.label,showlegend:!1,lighting:{ambient:1,diffuse:0,specular:0}}})}function Jr(t){return{type:"scatter3d",mode:"lines",x:[1.8,4.2,6,7.2],y:[.2,.6,.8,.92],z:[t,t,t,t],line:{color:"rgba(255, 255, 255, 0.4)",width:3,dash:"dot"},hoverinfo:"text",hovertext:"Q-line",name:"Q-line",showlegend:!1}}function ea(t,i,n,l,c){return{type:"surface",x:t.xCoords,y:t.yCoords,z:t.z,opacity:n,colorscale:"Viridis",showscale:!1,hoverinfo:"z",hovertemplate:`${ze(i)}: %{z:.3f}<extra>Surface</extra>`,name:"Fitted Surface",showlegend:!1,contours:{z:{show:!0,usecolormap:!0,highlightcolor:l?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.2)",project:{z:!0}}},lighting:c?{ambient:.5,diffuse:.8,specular:.4,roughness:.4,fresnel:.2}:{ambient:.8,diffuse:.3,specular:.15,roughness:.6},lightposition:c?{x:c.x*1e5,y:c.y*1e5,z:c.z*1e5}:{x:0,y:0,z:1e4}}}function ta(t,i,n,l){const u=[],f=[],d=[];for(let b=0;b<=32;b++){const x=b/32*Math.PI*2;u.push(t.x+i*Math.cos(x)),f.push(t.y+i*Math.sin(x)),d.push(n)}u.push(null),f.push(null),d.push(null);for(let b=0;b<=32;b++){const x=b/32*Math.PI*2;u.push(t.x+i*Math.cos(x)),f.push(t.y+i*Math.sin(x)),d.push(l)}u.push(null),f.push(null),d.push(null);for(let b=0;b<4;b++){const x=b/4*Math.PI*2,h=t.x+i*Math.cos(x),g=t.y+i*Math.sin(x);u.push(h,h,null),f.push(g,g,null),d.push(n,l,null)}return{type:"scatter3d",mode:"lines",x:u,y:f,z:d,line:{color:"rgba(244, 67, 54, 0.5)",width:2,dash:"dash"},hoverinfo:"text",hovertext:"Void region",name:"Void",showlegend:!1}}function Dt({zAxis:t="B2O3",colorBy:i="cone",zoom:n=1,width:l,height:c,highlightPointIds:u,highlightCircle:f,showSurface:d=!0,surfaceOpacity:b=.35,showPrediction:x=!1,cameraPreset:h="default",perspective:g=.5,lightPosition:S,onSurfaceGridReady:L,autoRotate:k=!1,autoRotateSpeed:v=.5,pointSize:H=2.5,zStretch:ie=.8,proximityRadius:P=null,proximityCenterId:K=null,proximityWeights:J=Ge,hoveredNeighborId:G=null,onProximityStats:U,onResetCamera:se,kioskMode:ee=!1}){const[z,I]=o.useState(null),[w,T]=o.useState(!1),[ae,E]=o.useState(!1),[le,m]=o.useState(0),N=o.useRef(null),C=o.useRef(null),A=o.useRef(null),W=o.useRef(0),te=o.useRef(null);o.useEffect(()=>{let r=!0;T(!1),E(!1);const s=setTimeout(()=>{r&&E(!0)},12e3);return Ye(()=>import("./plotly-gl3d-DYPPaO4p.js").then(O=>O.p),__vite__mapDeps([2,1])).then(O=>{if(!r)return;clearTimeout(s);const j=O.default??O;C.current=j;const D=Gt(j);I(()=>D)}).catch(()=>{r&&(clearTimeout(s),T(!0))}),()=>{r=!1,clearTimeout(s)}},[le]);const ce=Re(r=>r.getPlotPoints),ve=Mt(r=>r.currentSetId),ke=Re(r=>r.glazes),he=fe(r=>r.selectedGlaze),De=fe(r=>r.setSelectedGlaze),Te=fe(r=>r.setHoveredPoint),Oe=Kt(r=>r.blendResults),p=Ht(r=>r.theme)==="dark",y=o.useMemo(()=>({paper:p?"#1a1a1a":"#ffffff",bg:p?"#1a1a1a":"#f5f5f5",axisbg:p?"#1e1e1e":"#f8f8f8",grid:p?"#333":"#ddd",zeroline:p?"#444":"#ccc",axisTitle:p?"#aaa":"#555",tick:p?"#888":"#666",font:p?"#ccc":"#333",regionLabel:p?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.22)"}),[p]),Y=o.useMemo(()=>ce(ve),[ce,ve]),ue=Xt(Y),$=o.useMemo(()=>ue.filter(r=>r.x!=null&&r.y!=null&&!isNaN(r.x)&&!isNaN(r.y)&&r.x>=_e.x[0]&&r.x<=_e.x[1]&&r.y>=_e.y[0]&&r.y<=_e.y[1]&&(r.cone==null||r.cone>=-6&&r.cone<=13)).map(r=>{const s=ke.get(r.id),O=s==null?void 0:s.umf,j=zt(O,t,r.cone);return{...r,z:j}}).filter(r=>isFinite(r.z)),[ue,ke,t]),{visibleData:Z,proximityCenter:re,axisRanges:we,nearby:Ne}=o.useMemo(()=>{if(P==null||!he||$.length===0)return{visibleData:$,proximityCenter:null,axisRanges:null,nearby:[]};const r=K??he.id,s=$.find(M=>M.id===r);if(!s)return{visibleData:$,proximityCenter:null,axisRanges:null,nearby:[]};let O=1/0,j=-1/0,D=1/0,V=-1/0,oe=1/0,xe=-1/0,me=1/0,ne=-1/0;for(const M of $)M.x<O&&(O=M.x),M.x>j&&(j=M.x),M.y<D&&(D=M.y),M.y>V&&(V=M.y),isFinite(M.z)&&(M.z<oe&&(oe=M.z),M.z>xe&&(xe=M.z)),M.cone!=null&&(M.cone<me&&(me=M.cone),M.cone>ne&&(ne=M.cone));const q=Math.max(j-O,.001),ye=Math.max(V-D,.001),Se=Math.max(oe<1/0?xe-oe:1,.001),a=Math.max(ne-me,1),R={x:q,y:ye,z:Se},B=J,F=Math.max(0,Math.min(1,B.x)),je=Math.max(0,Math.min(1,B.y)),Ce=Math.max(0,Math.min(1,B.z)),X=Math.max(0,Math.min(1,B.cone)),Q=Math.max(0,Math.min(1,B.surface)),Le=F+je+Ce+X+Q,ot=Le>0?Math.sqrt(Le):1,Pe=[],We=[],yt=s.cone??6,pt=s.surfaceType??"unknown";for(const M of $){const Ve=(M.x-s.x)/R.x,nt=(M.y-s.y)/R.y,vt=(M.z-s.z)/R.z,kt=M.cone!=null&&s.cone!=null?Math.abs((M.cone-yt)/a):.5,jt=(M.surfaceType??"unknown")===pt?0:1,Tt=Math.sqrt(F*Ve*Ve+je*nt*nt+Ce*vt*vt+X*kt*kt+Q*jt*jt)/ot;Tt<=P&&(Pe.push(M),M.id!==s.id&&We.push({point:M,dist:Tt,dx:Math.abs(Ve),dy:Math.abs(nt),dz:Math.abs(vt),dCone:kt,dSurface:jt}))}Pe.find(M=>M.id===s.id)||Pe.push(s),We.sort((M,Ve)=>M.dist-Ve.dist);const xt=We.slice(0,50).map(M=>({id:M.point.id,name:M.point.name,distance:M.dist,x:M.point.x,y:M.point.y,z:M.point.z,cone:M.point.cone,surfaceType:M.point.surfaceType??"unknown",dx:M.dx,dy:M.dy,dz:M.dz,dCone:M.dCone,dSurface:M.dSurface}));return{visibleData:Pe,proximityCenter:s,axisRanges:R,nearby:xt}},[$,he,P,K,J]);o.useEffect(()=>{P!=null&&re?U==null||U({visible:Z.length,total:$.length,nearby:Ne}):U==null||U(null)},[Z.length,$.length,P,re,Ne,U]);const de=o.useMemo(()=>{if(i==="cone"||i==="glaze_type")return null;let r=1/0,s=-1/0;for(const O of $){let j;switch(i){case"z_axis":j=O.z;break;case"surface":j=It(O.surfaceType);break;case"source":j=Bt(O.source);break;case"flux_ratio":j=O.fluxRatio;break;case"confidence":j=Zt(O.confidence);break;case"boron":j=O.boron;break;default:j=0}isFinite(j)&&(j<r&&(r=j),j>s&&(s=j))}return r===1/0?null:{min:r,max:s===r?r+1:s}},[$,i]),Ke=o.useMemo(()=>i==="glaze_type"?Z.map(r=>Nt(r.glazeTypeId)):Z.map(r=>{switch(i){case"z_axis":return r.z;case"cone":return r.cone??6;case"surface":return It(r.surfaceType);case"source":return Bt(r.source);case"flux_ratio":return r.fluxRatio;case"confidence":return Zt(r.confidence);case"boron":return r.boron;default:return 0}}),[Z,i]),ge=o.useMemo(()=>{const r=[];for(const V of $)isFinite(V.z)&&!isNaN(V.z)&&r.push(V.z);if(r.length===0)return{min:0,max:1};r.sort((V,oe)=>V-oe);const s=r[0],O=r[Math.min(Math.floor(r.length*.99),r.length-1)],j=r[r.length-1],D=O===s?s+1:O*1.1;return{min:s,max:Math.min(D,j)}},[$]),pe=ge.min-(ge.max-ge.min)*.05,Be=o.useMemo(()=>!d||$.length<10?null:Br($.map(r=>({x:r.x,y:r.y,z:r.z})),{xRange:[..._e.x],yRange:[..._e.y],resolution:40}),[$,d]);o.useEffect(()=>{L==null||L(Be,$.map(r=>({x:r.x,y:r.y,z:r.z,name:r.name??""})))},[Be,$,L]);const qe=o.useMemo(()=>{if(!x||$.length<10)return null;const r=$.filter(s=>s.surfaceType&&s.surfaceType!=="unknown").map(s=>({x:s.x,y:s.y,surfaceType:s.surfaceType}));return r.length<5?null:Vr(r,{xRange:[..._e.x],yRange:[..._e.y],resolution:30})},[$,x]),Xe=o.useMemo(()=>{var R,B,F,je,Ce;if(!qe)return null;const{xCoords:r,yCoords:s,cells:O}=qe,j=r.length,D=s.length,V=[],oe=[],xe=[],me=[],ne=[],q=[],ye=[],Se=[],a=pe+(ge.max-ge.min)*.001;for(let X=0;X<D;X++)for(let Q=0;Q<j;Q++){V.push(r[Q]),oe.push(s[X]),xe.push(a);const Le=(R=O[X])==null?void 0:R[Q];me.push((Le==null?void 0:Le.confidence)??0)}for(let X=0;X<D-1;X++)for(let Q=0;Q<j-1;Q++){const Le=(B=O[X])==null?void 0:B[Q],ot=(F=O[X])==null?void 0:F[Q+1],Pe=(je=O[X+1])==null?void 0:je[Q],We=(Ce=O[X+1])==null?void 0:Ce[Q+1];if(!Le||!ot||!Pe||!We)continue;const yt=X*j+Q,pt=X*j+Q+1,xt=(X+1)*j+Q,M=(X+1)*j+Q+1,Ve=(Le.confidence+ot.confidence+Pe.confidence)/3,nt=(ot.confidence+Pe.confidence+We.confidence)/3;ne.push(yt),q.push(pt),ye.push(xt),Se.push($t(Le.type,.15+Ve*.35)),ne.push(pt),q.push(M),ye.push(xt),Se.push($t(We.type,.15+nt*.35))}return ne.length===0?null:{type:"mesh3d",x:V,y:oe,z:xe,i:ne,j:q,k:ye,facecolor:Se,opacity:.6,flatshading:!0,hoverinfo:"skip",name:"Surface Prediction",showlegend:!1,lighting:{ambient:1,diffuse:0,specular:0}}},[qe,pe,ge.max]),Ze=o.useMemo(()=>{const r=i==="cone";return{type:"scatter3d",mode:"markers",x:Z.map(s=>s.x),y:Z.map(s=>s.y),z:Z.map(s=>s.z),customdata:Z.map(s=>s.id),text:Z.map(s=>s.name),marker:{size:H,opacity:d?.65:.8,color:Ke,...i==="glaze_type"?{}:{colorscale:r?Jt:Yr[i]||"Viridis",reversescale:!1,cmin:r?-6:de==null?void 0:de.min,cmax:r?13:de==null?void 0:de.max,colorbar:{title:i==="z_axis"?ze(t):ra(i),thickness:15,len:.5,tickvals:r?Ct:void 0,ticktext:r?St:void 0}},line:{width:0}},hoverinfo:"text",hovertemplate:Z.map(s=>{const O=t==="cone"?s.cone!=null?Fe(s.cone):"unknown":s.z.toFixed(3),j=[`<b>${s.name}</b>`,`SiO₂: ${s.x.toFixed(2)}`,`Al₂O₃: ${s.y.toFixed(2)}`,`${ze(t)}: ${O}`];return s.cone!=null?j.push(`Cone: ${Fe(s.cone)}`):j.push("Cone: unknown"),s.surfaceType&&s.surfaceType!=="unknown"&&j.push(`Surface: ${s.surfaceType}`),s.source&&s.source!=="unknown"&&j.push(`Source: ${s.source}`),j.join("<br>")+"<extra></extra>"}),name:"Glazes",showlegend:!1}},[Z,Ke,i,de,t,d,H]),_=o.useMemo(()=>{if(!he)return null;const r=Z.find(s=>s.id===he.id);return r?{type:"scatter3d",mode:"markers",x:[r.x],y:[r.y],z:[r.z],text:[r.name],marker:{size:10,symbol:"circle",color:"rgba(255, 255, 255, 0.9)",line:{width:3,color:"#facc15"}},hoverinfo:"text",hovertemplate:"<b>%{text}</b> (selected)<extra></extra>",name:"Selected",showlegend:!1}:null},[he,Z]),Qe=o.useMemo(()=>{if(!he)return null;const r=Z.find(s=>s.id===he.id);return r?{type:"scatter3d",mode:"lines",x:[r.x,r.x],y:[r.y,r.y],z:[r.z,pe],line:{color:"rgba(250, 204, 21, 0.6)",width:2,dash:"dot"},hoverinfo:"skip",showlegend:!1,name:"selected-drop"}:null},[he,Z,pe]),be=o.useMemo(()=>{if(Oe.length===0)return null;const r=Oe.map(D=>ht(D.umf,"SiO2")),s=Oe.map(D=>ht(D.umf,"Al2O3")),O=Oe.map(D=>zt(D.umf,t)),j=Oe.map((D,V)=>{var oe;return((oe=D.recipe)==null?void 0:oe.name)||`Blend ${V+1}`});return{type:"scatter3d",mode:"markers",x:r,y:s,z:O,text:j,marker:{size:6,symbol:"diamond",color:"#ff9800",opacity:.9,line:{width:1,color:"#fff"}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>SiO₂: %{x:.2f}<br>Al₂O₃: %{y:.2f}<br>${ze(t)}: %{z:.3f}<br><extra>Blend</extra>`,name:"Blend Results",showlegend:!1}},[Oe,t]),Je=o.useMemo(()=>{if(!u||u.length===0)return null;const r=Z.filter(s=>u.includes(s.id));return r.length===0?null:{type:"scatter3d",mode:"markers",x:r.map(s=>s.x),y:r.map(s=>s.y),z:r.map(s=>s.z),text:r.map(s=>s.name),marker:{size:7,symbol:"circle",color:"rgba(255, 235, 59, 0.85)",line:{width:2,color:"#fff"}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>SiO₂: %{x:.2f}<br>Al₂O₃: %{y:.2f}<br>${ze(t)}: %{z:.3f}<br><extra>Cluster</extra>`,name:"Highlighted",showlegend:!1}},[u,Z,t]),Ae=o.useMemo(()=>f?ta(f,f.r,pe,ge.max):null,[f,pe,ge.max]),Ue=o.useMemo(()=>{if(Z.length>300)return null;const r=[],s=[],O=[];for(const j of Z)r.push(j.x,j.x,null),s.push(j.y,j.y,null),O.push(j.z,pe,null);return{type:"scatter3d",mode:"lines",x:r,y:s,z:O,line:{color:"rgba(255,255,255,0.04)",width:1},hoverinfo:"skip",showlegend:!1,name:"droplines"}},[Z,pe]),et=o.useMemo(()=>Xr(pe),[pe]),Me=o.useMemo(()=>$e.tempContours?Qr(pe,p):[],[pe,p]),st=o.useMemo(()=>Jr(pe),[pe]),it=o.useMemo(()=>({type:"scatter3d",mode:"text",x:[1.5,2.3,3.4,4.5,5,1.2],y:[.75,.55,.65,.25,.1,.08],z:Array(6).fill(pe),text:["UNFUSED","MATTE","SEMI-MATTE","BRIGHT GLOSS","UNDERFIRED","CRAZED"],textfont:{color:y.regionLabel,size:10},hoverinfo:"skip",showlegend:!1,name:"labels"}),[pe,y]),He=o.useMemo(()=>{if(!re||!we||P==null)return null;const r=24,s=re.x,O=re.y,j=re.z,D=P*we.x,V=P*we.y,oe=P*we.z,xe=[],me=[],ne=[];for(let q=0;q<=r;q+=3){const ye=Math.PI*q/r-Math.PI/2,Se=Math.cos(ye),a=Math.sin(ye);for(let R=0;R<=r;R++){const B=2*Math.PI*R/r;xe.push(s+D*Se*Math.cos(B)),me.push(O+V*Se*Math.sin(B)),ne.push(j+oe*a)}xe.push(null),me.push(null),ne.push(null)}for(let q=0;q<r;q+=3){const ye=2*Math.PI*q/r,Se=Math.cos(ye),a=Math.sin(ye);for(let R=0;R<=r;R++){const B=Math.PI*R/r-Math.PI/2;xe.push(s+D*Math.cos(B)*Se),me.push(O+V*Math.cos(B)*a),ne.push(j+oe*Math.sin(B))}xe.push(null),me.push(null),ne.push(null)}return{type:"scatter3d",mode:"lines",x:xe,y:me,z:ne,line:{color:"rgba(255,165,0,0.35)",width:1.5},hoverinfo:"skip",showlegend:!1,name:"proximity-sphere",connectgaps:!1}},[re,we,P]),tt=o.useMemo(()=>{const r=[...et,...Me,st,it];if(Ue&&r.push(Ue),Xe&&r.push(Xe),Be&&d){const s=P!=null&&Z.length<$.length;r.push(ea(Be,t,s?Math.min(b,.15):b,p,S))}if(r.push(Ze),Je&&r.push(Je),Ae&&r.push(Ae),be&&r.push(be),_&&r.push(_),Qe&&r.push(Qe),He&&r.push(He),re&&Ne.length>0){const s=Ne.slice(0,8),O=[],j=[],D=[];for(const V of s)O.push(re.x,V.x,null),j.push(re.y,V.y,null),D.push(re.z,V.z,null);r.push({type:"scatter3d",mode:"lines",x:O,y:j,z:D,line:{color:"rgba(250, 204, 21, 0.25)",width:1.5,dash:"dot"},hoverinfo:"skip",showlegend:!1,name:"proximity-lines",connectgaps:!1})}if(G){const s=Z.find(O=>O.id===G);s&&(r.push({type:"scatter3d",mode:"markers",x:[s.x],y:[s.y],z:[s.z],text:[s.name],marker:{size:12,symbol:"circle",color:"rgba(250, 204, 21, 0.2)",line:{width:2.5,color:"#facc15"}},hoverinfo:"skip",showlegend:!1,name:"hovered-neighbor"}),r.push({type:"scatter3d",mode:"lines",x:[s.x,s.x],y:[s.y,s.y],z:[s.z,pe],line:{color:"rgba(250, 204, 21, 0.4)",width:1.5,dash:"dot"},hoverinfo:"skip",showlegend:!1,name:"hovered-drop"}))}return r},[et,Me,st,it,Ue,Be,d,b,t,p,S,Xe,Ze,Je,Ae,be,_,Qe,He,P,Z.length,$.length,re,Ne,G,pe]),lt=qr[h](n),rt=A.current??lt;o.useEffect(()=>{A.current=null},[h,n]),o.useEffect(()=>{if(!k){te.current&&(cancelAnimationFrame(te.current),te.current=null);return}let r=performance.now();const s=O=>{var ne;const j=(ne=N.current)==null?void 0:ne.el,D=C.current;if(!j||!D){r=O,te.current=requestAnimationFrame(s);return}const V=(O-r)/1e3;r=O,W.current+=v*V*.5;const oe=W.current,xe=2.5/n,me={x:Math.cos(oe)*xe,y:Math.sin(oe)*xe,z:1.2/n};try{D.relayout(j,{"scene.camera.eye":me,"scene.camera.up":{x:0,y:0,z:1}})}catch{}te.current=requestAnimationFrame(s)};return te.current=requestAnimationFrame(s),()=>{te.current&&(cancelAnimationFrame(te.current),te.current=null)}},[k,v,n]);const ct=o.useCallback(r=>{const s=r==null?void 0:r["scene.camera"];s&&!k&&(A.current=s),s!=null&&s.eye&&k&&(W.current=Math.atan2(s.eye.y,s.eye.x))},[k]),at=o.useMemo(()=>({...rt,projection:{type:g>.01?"perspective":"orthographic"}}),[rt,g]),gt=o.useMemo(()=>({scene:{xaxis:{title:{text:"SiO₂",font:{color:y.axisTitle}},range:[..._e.x],gridcolor:y.grid,zerolinecolor:y.zeroline,tickfont:{color:y.tick},backgroundcolor:y.axisbg},yaxis:{title:{text:"Al₂O₃",font:{color:y.axisTitle}},range:[..._e.y],gridcolor:y.grid,zerolinecolor:y.zeroline,tickfont:{color:y.tick},backgroundcolor:y.axisbg},zaxis:{title:{text:ze(t),font:{color:y.axisTitle}},range:[ge.min-(ge.max-ge.min)*.05,ge.max],gridcolor:y.grid,zerolinecolor:y.zeroline,tickfont:{color:y.tick},backgroundcolor:y.axisbg,...t==="cone"?{tickvals:Ct,ticktext:St}:{}},bgcolor:y.bg,camera:at,aspectmode:"manual",aspectratio:{x:2,y:1,z:ie}},paper_bgcolor:y.paper,font:{color:y.font},margin:{l:0,r:0,t:0,b:0},hovermode:"closest",showlegend:!1,uirevision:"stull3d"}),[t,ge,y,at,ie]),bt=o.useCallback(r=>{var O,j,D;const s=(O=r.points)==null?void 0:O[0];if(s!=null&&s.customdata&&((j=s==null?void 0:s.data)==null?void 0:j.type)==="scatter3d"&&((D=s==null?void 0:s.data)==null?void 0:D.mode)==="markers"){const V=Re.getState().glazes.get(s.customdata);V&&De(V)}},[De]),dt=o.useCallback(r=>{var O,j,D,V,oe,xe,me,ne;const s=(O=r.points)==null?void 0:O[0];if(s!=null&&s.customdata&&((j=s==null?void 0:s.data)==null?void 0:j.type)==="scatter3d"&&((D=s==null?void 0:s.data)==null?void 0:D.mode)==="markers"){const q=Re.getState().glazes.get(s.customdata);if(q){const ye=(V=q.coneRange)==null?void 0:V[0];Te({id:s.customdata,name:q.name,source:q.source??"unknown",x:s.x,y:s.y,cone:typeof ye=="number"?ye:null,surfaceType:q.surfaceType??"unknown",fluxRatio:((xe=(oe=q.umf)==null?void 0:oe._meta)==null?void 0:xe.R2O_RO_ratio)??0,boron:((ne=(me=q.umf)==null?void 0:me.B2O3)==null?void 0:ne.value)??0,confidence:q.umfConfidence??"inferred",glazeTypeId:q.glazeTypeId??null})}}},[Te]),ft=o.useMemo(()=>({displayModeBar:!ee,modeBarButtonsToRemove:["select2d","lasso2d","toImage"],scrollZoom:!ee,displaylogo:!1}),[ee]);return z?e.jsx(z,{ref:N,data:tt,layout:gt,config:ft,onClick:bt,onHover:dt,onRelayout:ct,useResizeHandler:!0,style:{width:l||"100%",height:c||"100%"}}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,width:l||"100%",height:c||"100%",color:"#777",fontSize:13,background:"var(--bg-secondary, #1a1a1a)",borderRadius:8,...w?{}:{animation:"pulse 1.5s ease-in-out infinite"}},children:[e.jsx("style",{children:"@keyframes pulse { 0%,100% { opacity: 0.6 } 50% { opacity: 1 } }"}),w?e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{fontSize:22},children:"⚠"}),e.jsx("span",{children:"3D engine failed to load"}),e.jsx("button",{onClick:()=>m(r=>r+1),style:{marginTop:4,padding:"6px 16px",borderRadius:6,border:"1px solid #555",background:"var(--bg-tertiary, #252525)",color:"#ccc",cursor:"pointer",fontSize:13},children:"Tap to retry"})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Loading 3D engine…"}),ae&&e.jsx("span",{style:{fontSize:11,color:"#666"},children:"Slow connection — still trying…"})]})]})}function It(t){return{matte:1,satin:2,gloss:3,crystalline:4,crawl:5,unknown:0}[t]??0}function Bt(t){return{glazy:1,digitalfire:2,user:3,calculated:4}[t]??0}function Zt(t){return{unknown:0,assumed:1,inferred:2,declared:3,verified:4}[t]??0}function ra(t){return{cone:"Cone",surface:"Surface",source:"Source",flux_ratio:"R₂O:RO",confidence:"Confidence",boron:"B₂O₃"}[t]||t}function ze(t){return{Li2O:"Li₂O",Na2O:"Na₂O",K2O:"K₂O",MgO:"MgO",CaO:"CaO",SrO:"SrO",BaO:"BaO",ZnO:"ZnO",PbO:"PbO",B2O3:"B₂O₃",Fe2O3:"Fe₂O₃",TiO2:"TiO₂",ZrO2:"ZrO₂",SnO2:"SnO₂",MnO:"MnO",MnO2:"MnO₂",NiO:"NiO",CuO:"CuO",Cu2O:"Cu₂O",CoO:"CoO",Cr2O3:"Cr₂O₃",P2O5:"P₂O₅",cone:"Cone",flux_ratio:"R₂O:RO",SiO2_Al2O3_ratio:"SiO₂:Al₂O₃",total_flux_moles:"Total Flux Moles",thermal_expansion:"Thermal Exp. (COE)",nbo_t:"NBO/T",optical_basicity:"Optical Basicity (Λ)",flux_entropy:"Flux Diversity",cao_mgo_ratio:"CaO:MgO",combined_alkali:"Combined Alkali",na2o_k2o_ratio:"Na₂O:K₂O",viscosity_index:"Viscosity Index",surface_tension:"Surface Tension",durability:"Chem. Durability",total_colorant:"Total Colorant",fe_ti_ratio:"Fe:Ti"}[t]||t}const aa=Object.freeze(Object.defineProperty({__proto__:null,DEFAULT_PROXIMITY_WEIGHTS:Ge,StullPlot3D:Dt,computeZFromUMF:zt,default:Dt,zAxisLabel:ze},Symbol.toStringTag,{value:"Module"})),wt=t=>t==="gloss"?"G":t==="matte"?"M":t==="satin"?"S":t==="crystalline"?"X":t==="crawl"?"C":"?",oa=[{key:"gloss",label:"G"},{key:"matte",label:"M"},{key:"satin",label:"S"},{key:"crystalline",label:"X"},{key:"crawl",label:"C"},{key:"unknown",label:"?"}];function na({proximityStats:t,glazes:i,selectedGlaze:n,pinnedCenterId:l,hoveredNeighborId:c,explorationPath:u,zAxis:f,onSelectGlaze:d,onCompareGlaze:b,onHoverNeighbor:x,onPinCenter:h,onExplorationPathChange:g}){var E,le;const[S,L]=o.useState(new Set),[k,v]=o.useState(!1),[H,ie]=o.useState("distance"),[P,K]=o.useState("list"),J=o.useRef(null),G=o.useMemo(()=>new Set(t.nearby.map(m=>m.surfaceType)),[t.nearby]),U=o.useMemo(()=>{const m=new Map;for(const N of t.nearby){const C=i.get(N.id);C&&m.set(N.id,C)}return m},[t.nearby,i]),se=o.useMemo(()=>t.nearby.filter(m=>{const N=U.get(m.id);return(N==null?void 0:N.images)&&N.images.length>0}).length,[t.nearby,U]),ee=o.useMemo(()=>{let m=S.size===0?[...t.nearby]:t.nearby.filter(N=>S.has(N.surfaceType));return k&&(m=m.filter(N=>{const C=U.get(N.id);return(C==null?void 0:C.images)&&C.images.length>0})),H==="cone"?m.sort((N,C)=>(N.cone??99)-(C.cone??99)||N.distance-C.distance):H==="name"&&m.sort((N,C)=>N.name.localeCompare(C.name)),m},[t.nearby,S,k,H,U]),z=3,I=o.useCallback(m=>{var te;const N=J.current;if(!N)return;const C=Array.from(N.querySelectorAll(P==="gallery"?".gallery-card":".proximity-nearby-item"));if(C.length===0)return;const A=C.findIndex(ce=>ce===document.activeElement);let W=-1;switch(m.key){case"ArrowDown":P==="gallery"?W=A<0?0:Math.min(A+z,C.length-1):W=A<0?0:Math.min(A+1,C.length-1);break;case"ArrowUp":P==="gallery"?W=A<0?0:Math.max(A-z,0):W=A<0?0:Math.max(A-1,0);break;case"ArrowRight":P==="gallery"&&(W=A<0?0:Math.min(A+1,C.length-1));break;case"ArrowLeft":P==="gallery"&&(W=A<0?0:Math.max(A-1,0));break;case"Home":W=0;break;case"End":W=C.length-1;break;case"Enter":A>=0&&C[A].click();return;default:return}if(W>=0&&W!==A){m.preventDefault(),C[W].focus(),C[W].scrollIntoView({block:"nearest"});const ce=((te=ee[W])==null?void 0:te.id)??null;x(ce)}},[P,ee,x]),w=c?t.nearby.find(m=>m.id===c)??null:null,T=c?U.get(c)??null:null,ae=(m,N)=>{const C=U.get(N.id);C&&(m.shiftKey?b(C):(n&&!l&&g((()=>{const A=u;return A.length>0&&A[A.length-1].id===n.id?A:[...A,{id:n.id,name:n.name}].slice(-10)})()),d(C)))};return e.jsxs("div",{className:"proximity-nearby-list",children:[u.length>0&&e.jsx("div",{className:"proximity-breadcrumb",children:u.map((m,N)=>e.jsxs(Ot.Fragment,{children:[N>0&&e.jsx("span",{className:"breadcrumb-arrow",children:"›"}),e.jsx("button",{className:"breadcrumb-btn",onClick:()=>{const C=i.get(m.id);C&&(d(C),g(u.slice(0,N)))},title:m.name,children:m.name.length>12?m.name.slice(0,11)+"…":m.name})]},m.id))}),e.jsxs("div",{className:"proximity-nearby-header",children:[e.jsxs("span",{children:["Nearby (",ee.length,S.size>0?`/${t.nearby.length}`:"",")"]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsxs("div",{className:"proximity-sort-btns",children:[e.jsx("button",{className:`proximity-sort-btn${P==="list"?" on":""}`,onClick:()=>K("list"),title:"List view",children:"≡"}),e.jsx("button",{className:`proximity-sort-btn${P==="gallery"?" on":""}`,onClick:()=>K("gallery"),title:"Gallery view",children:"▦"})]}),e.jsx("div",{className:"proximity-sort-btns",children:["distance","cone","name"].map(m=>e.jsx("button",{className:`proximity-sort-btn${H===m?" on":""}`,onClick:()=>ie(m),title:`Sort by ${m}`,children:m==="distance"?"↔":m==="cone"?"△":"Az"},m))}),e.jsx("button",{className:`proximity-pin-btn${l?" pinned":""}`,onClick:()=>h(l?null:(n==null?void 0:n.id)??null),title:l?"Unpin center — proximity follows selection":"Pin center — keep this neighborhood while exploring",children:l?"📌":"📌Pin"})]})]}),e.jsxs("div",{className:"proximity-filter-pills",children:[oa.filter(m=>G.has(m.key)).map(m=>e.jsx("button",{className:`proximity-pill st-${m.key}${S.has(m.key)?" on":""}`,onClick:()=>L(N=>{const C=new Set(N);return C.has(m.key)?C.delete(m.key):C.add(m.key),C}),title:m.key,children:m.label},m.key)),e.jsxs("button",{className:`proximity-pill photo-pill${k?" on":""}`,onClick:()=>v(m=>!m),title:`Show only glazes with photos (${se})`,children:["📷",k?` ${se}`:""]}),(S.size>0||k)&&e.jsx("button",{className:"proximity-pill clear",onClick:()=>{L(new Set),v(!1)},title:"Clear all filters",children:"×"})]}),e.jsx("div",{ref:J,className:`proximity-nearby-scroll${P==="gallery"?" gallery-mode":""}`,onKeyDown:I,role:"listbox","aria-label":`Nearby glazes ${P} view`,children:P==="gallery"?ee.map((m,N)=>{var W,te;const C=U.get(m.id),A=((W=C==null?void 0:C.images)==null?void 0:W[0])??null;return e.jsxs("button",{className:`gallery-card${(n==null?void 0:n.id)===m.id?" active":""}${c===m.id?" hovered":""}`,onClick:ce=>ae(ce,m),onMouseEnter:()=>x(m.id),onMouseLeave:()=>x(null),onFocus:()=>x(m.id),onBlur:()=>x(null),role:"option","aria-selected":(n==null?void 0:n.id)===m.id,title:`${m.name}
SiO₂: ${m.x.toFixed(2)}, Al₂O₃: ${m.y.toFixed(2)}
Shift+click to compare`,children:[e.jsxs("div",{className:"gallery-thumb",children:[A?e.jsx("img",{src:A,alt:m.name,loading:"lazy",onError:ce=>{const ve=ce.currentTarget;ve.style.display="none";const ke=ve.nextElementSibling;ke&&(ke.style.display="")}}):null,e.jsx("div",{className:"gallery-no-photo",style:A?{display:"none"}:void 0,children:e.jsx("span",{className:`proximity-nearby-surface st-${m.surfaceType}`,children:wt(m.surfaceType)})}),e.jsxs("span",{className:"gallery-rank",children:["#",N+1]}),(((te=C==null?void 0:C.images)==null?void 0:te.length)??0)>1&&e.jsxs("span",{className:"gallery-photo-count",children:["📷",C.images.length]}),e.jsx("span",{className:"gallery-dist",children:m.distance.toFixed(2)})]}),e.jsxs("div",{className:"gallery-info",children:[e.jsx("span",{className:"gallery-name",children:m.name}),e.jsxs("div",{className:"gallery-meta",children:[m.cone!=null&&e.jsxs("span",{className:"proximity-nearby-cone",children:["△",Fe(m.cone)]}),e.jsx("span",{className:`proximity-nearby-surface st-${m.surfaceType}`,children:wt(m.surfaceType)})]})]})]},m.id)}):ee.map((m,N)=>{var W,te;const C=U.get(m.id),A=((W=C==null?void 0:C.images)==null?void 0:W[0])??null;return e.jsxs("button",{className:`proximity-nearby-item${(n==null?void 0:n.id)===m.id?" active":""}${c===m.id?" hovered":""}`,onClick:ce=>ae(ce,m),onMouseEnter:()=>x(m.id),onMouseLeave:()=>x(null),onFocus:()=>x(m.id),onBlur:()=>x(null),role:"option","aria-selected":(n==null?void 0:n.id)===m.id,title:`SiO₂: ${m.x.toFixed(2)}, Al₂O₃: ${m.y.toFixed(2)}, ${ze(f)}: ${m.z.toFixed(3)}
Shift+click to compare`,children:[A?e.jsx("img",{className:"list-thumb",src:A,alt:"",loading:"lazy",onError:ce=>{const ve=ce.currentTarget;ve.style.display="none";const ke=ve.nextElementSibling;ke&&(ke.style.display="")}}):null,e.jsx("span",{className:"list-thumb-placeholder",style:A?{display:"none"}:void 0}),(((te=C==null?void 0:C.images)==null?void 0:te.length)??0)>1&&e.jsx("span",{className:"list-photo-count",children:C.images.length}),e.jsx("span",{className:"proximity-nearby-rank",children:N+1}),e.jsx("span",{className:"proximity-nearby-name",children:m.name}),m.cone!=null&&e.jsxs("span",{className:"proximity-nearby-cone",children:["△",Fe(m.cone)]}),e.jsx("span",{className:`proximity-nearby-surface st-${m.surfaceType}`,title:m.surfaceType,children:wt(m.surfaceType)}),e.jsxs("span",{className:"proximity-nearby-bars",title:`SiO₂: ${(Math.max(0,1-m.dx)*100).toFixed(0)}% | Al₂O₃: ${(Math.max(0,1-m.dy)*100).toFixed(0)}% | ${ze(f)}: ${(Math.max(0,1-m.dz)*100).toFixed(0)}%`,children:[e.jsx("span",{className:"sim-bar bar-x",style:{width:`${Math.max(0,1-m.dx)*100}%`}}),e.jsx("span",{className:"sim-bar bar-y",style:{width:`${Math.max(0,1-m.dy)*100}%`}}),e.jsx("span",{className:"sim-bar bar-z",style:{width:`${Math.max(0,1-m.dz)*100}%`}})]}),e.jsx("span",{className:"proximity-nearby-dist",children:m.distance.toFixed(2)})]},m.id)})}),(T==null?void 0:T.umf)&&w&&e.jsxs("div",{className:"proximity-preview",children:[e.jsxs("div",{className:"proximity-preview-top",children:[((E=T.images)==null?void 0:E[0])&&e.jsx("img",{className:"preview-thumb",src:T.images[0],alt:"",loading:"lazy",onError:m=>{m.currentTarget.style.display="none"}}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"proximity-preview-name",children:T.name}),e.jsxs("div",{className:"proximity-preview-meta",children:[((le=T.coneRange)==null?void 0:le[0])!=null&&e.jsxs("span",{children:["△",Fe(Number(T.coneRange[0])),T.coneRange[1]!==T.coneRange[0]?`–${Fe(Number(T.coneRange[1]))}`:""]}),e.jsx("span",{children:T.surfaceType}),e.jsx("span",{children:T.atmosphere}),e.jsxs("span",{children:["d=",w.distance.toFixed(3)]})]})]})]}),e.jsxs("div",{className:"proximity-preview-row",children:[e.jsx(Yt,{umf:T.umf,width:120,height:10,compact:!0}),e.jsx(qt,{umf:T.umf,size:32,innerRadius:.55})]})]}),e.jsxs("div",{className:"proximity-nearby-legend",children:[e.jsxs("span",{className:"sim-legend-item",children:[e.jsx("span",{className:"sim-dot dot-x"}),"SiO","₂"]}),e.jsxs("span",{className:"sim-legend-item",children:[e.jsx("span",{className:"sim-dot dot-y"}),"Al","₂","O","₃"]}),e.jsxs("span",{className:"sim-legend-item",children:[e.jsx("span",{className:"sim-dot dot-z"}),ze(f)]})]})]})}function Ee(t,i,n){return n<=0?0:((t+i)%n+n)%n}function sa(t,i){return i<=0?0:Math.min(t,i-1)}function mt(t,i,n=.5,l=4){const c=t+i;return c>l?l:c<n?n:c}function ia(t){if(!t||typeof t!="object")return!1;const i=t;if(!i.tagName)return!1;const n=i.tagName;return!!(n==="INPUT"||n==="TEXTAREA"||n==="SELECT"||i.isContentEditable)}function la({images:t,glazeName:i,sidebarTab:n}){const[l,c]=o.useState(0),[u,f]=o.useState(!1),[d,b]=o.useState(1);o.useEffect(()=>{c(0),f(!1),b(1)},[t]),o.useEffect(()=>{if(!t||t.length===0)return;const h=g=>{ia(g.target)||(u?g.key==="Escape"?(f(!1),b(1),g.preventDefault()):g.key==="ArrowLeft"?(c(S=>Ee(S,-1,t.length)),g.preventDefault()):g.key==="ArrowRight"?(c(S=>Ee(S,1,t.length)),g.preventDefault()):g.key==="+"||g.key==="="?(b(S=>mt(S,.5)),g.preventDefault()):g.key==="-"?(b(S=>mt(S,-.5)),g.preventDefault()):g.key==="0"&&(b(1),g.preventDefault()):n==="detail"&&(g.key==="ArrowLeft"&&t.length>1?(c(S=>Ee(S,-1,t.length)),g.preventDefault()):g.key==="ArrowRight"&&t.length>1&&(c(S=>Ee(S,1,t.length)),g.preventDefault())))};return window.addEventListener("keydown",h),()=>window.removeEventListener("keydown",h)},[t,u,n]);const x=sa(l,t.length);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"detail-section",children:[e.jsxs("h4",{children:["Photo",t.length>1?`s (${x+1}/${t.length})`:""]}),e.jsxs("div",{className:"carousel-container",children:[e.jsx("img",{src:t[x],alt:`${i} — photo ${x+1}`,loading:"lazy",className:"carousel-img",onClick:()=>{f(!0),b(1)},style:{cursor:"zoom-in"},title:"Click to enlarge (← → to cycle, Esc to close)",onError:h=>{h.currentTarget.style.display="none";const g=h.currentTarget.nextElementSibling;g!=null&&g.classList.contains("carousel-img-fallback")&&(g.style.display="flex")}}),e.jsx("div",{className:"carousel-img-fallback",style:{display:"none",alignItems:"center",justifyContent:"center",height:200,color:"var(--text-secondary, #888)",fontSize:13},children:"Image unavailable"}),t.length>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"carousel-btn carousel-prev",onClick:()=>c(h=>Ee(h,-1,t.length)),title:"Previous photo",children:"‹"}),e.jsx("button",{className:"carousel-btn carousel-next",onClick:()=>c(h=>Ee(h,1,t.length)),title:"Next photo",children:"›"}),e.jsx("div",{className:"carousel-dots",children:t.map((h,g)=>e.jsx("button",{className:`carousel-dot${g===x?" active":""}`,onClick:()=>c(g)},g))})]})]})]}),u&&e.jsx("div",{className:"lightbox-overlay",onClick:h=>{h.target===h.currentTarget&&(f(!1),b(1))},role:"dialog","aria-label":"Image lightbox",children:e.jsxs("div",{className:"lightbox-content",children:[e.jsx("img",{src:t[x],alt:`${i} — photo ${x+1}`,className:"lightbox-img",style:{transform:`scale(${d})`},draggable:!1,onError:h=>{h.currentTarget.style.display="none";const g=h.currentTarget.nextElementSibling;g!=null&&g.classList.contains("lightbox-img-fallback")&&(g.style.display="flex")}}),e.jsx("div",{className:"lightbox-img-fallback",style:{display:"none",alignItems:"center",justifyContent:"center",color:"#ccc",fontSize:16},children:"Image unavailable"}),t.length>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"lightbox-nav lightbox-prev",onClick:()=>c(h=>Ee(h,-1,t.length)),title:"Previous (←)",children:"‹"}),e.jsx("button",{className:"lightbox-nav lightbox-next",onClick:()=>c(h=>Ee(h,1,t.length)),title:"Next (→)",children:"›"})]}),e.jsxs("div",{className:"lightbox-toolbar",children:[e.jsxs("span",{className:"lightbox-caption",children:[i,t.length>1?` (${x+1}/${t.length})`:""]}),e.jsxs("div",{className:"lightbox-zoom-controls",children:[e.jsx("button",{onClick:()=>b(h=>mt(h,-.5)),title:"Zoom out (−)",children:"−"}),e.jsxs("span",{children:[(d*100).toFixed(0),"%"]}),e.jsx("button",{onClick:()=>b(h=>mt(h,.5)),title:"Zoom in (+)",children:"+"}),d!==1&&e.jsx("button",{onClick:()=>b(1),title:"Reset zoom (0)",children:"1:1"})]}),e.jsx("button",{className:"lightbox-close",onClick:()=>{f(!1),b(1)},title:"Close (Esc)",children:"✕"})]})]})})]})}const ca=`
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

  /* ── Data Count Badge ── */
  .data-count-badge {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    padding: 3px 8px;
    font-size: 11px;
    color: var(--text-secondary);
    opacity: 0.6;
    pointer-events: auto;
    z-index: 5;
    transition: opacity 0.15s;
    &:hover { opacity: 1; }
  }

  /* ── Floating Proximity Card ── */
  .proximity-floating-card {
    position: absolute;
    bottom: 16px;
    left: 16px;
    width: 280px;
    max-height: calc(100% - 32px);
    overflow-y: auto;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    z-index: 20;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .proximity-floating-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-primary);
    padding-bottom: 4px;
    border-bottom: 1px solid var(--border-secondary);
  }

  .proximity-floating-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 16px;
    cursor: pointer;
    padding: 0 2px;
    line-height: 1;
    border-radius: 4px;
  }
  .proximity-floating-close:hover {
    color: var(--text-primary);
    background: var(--bg-hover);
  }

  .proximity-floating-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .proximity-floating-label {
    font-size: 10px;
    font-weight: 600;
    color: var(--text-label);
    text-transform: uppercase;
    letter-spacing: 0.05em;
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
  .proximity-nearby-item:focus-visible {
    outline: 2px solid var(--accent-primary, #6366f1);
    outline-offset: -2px;
    border-color: var(--accent-primary, #6366f1);
    box-shadow: inset 2px 0 0 var(--accent-primary, #6366f1);
    z-index: 1;
  }
  .proximity-nearby-item:focus:not(:focus-visible) {
    outline: none;
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

  /* ── Gallery mode ── */
  .proximity-nearby-scroll.gallery-mode {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 6px;
    max-height: 360px;
    padding: 2px;
  }

  .gallery-card {
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    border: 1px solid var(--border-secondary);
    background: var(--bg-secondary);
    cursor: pointer;
    overflow: hidden;
    transition: border-color 0.12s, box-shadow 0.12s;
    padding: 0;
    text-align: left;
    color: var(--text-primary);
    font-size: 11px;
  }
  .gallery-card:hover {
    border-color: var(--text-muted);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  .gallery-card.active {
    border-color: var(--accent-primary, #6366f1);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.25);
  }
  .gallery-card.hovered {
    border-color: rgba(250, 204, 21, 0.6);
    box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.15);
  }
  .gallery-card:focus-visible {
    outline: 2px solid var(--accent-primary, #6366f1);
    outline-offset: -2px;
    border-color: var(--accent-primary, #6366f1);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.35);
    z-index: 1;
  }
  .gallery-card:focus:not(:focus-visible) {
    outline: none;
  }

  .gallery-thumb {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    background: var(--bg-tertiary);
    overflow: hidden;
  }
  .gallery-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .gallery-no-photo {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-tertiary);
  }
  .gallery-no-photo .proximity-nearby-surface {
    width: 22px;
    height: 22px;
    font-size: 11px;
    line-height: 22px;
    border-radius: 4px;
    opacity: 0.5;
  }
  .gallery-rank {
    position: absolute;
    top: 3px;
    left: 3px;
    background: rgba(0,0,0,0.6);
    color: #fff;
    font-size: 8px;
    padding: 1px 3px;
    border-radius: 3px;
    font-weight: 600;
    line-height: 1.2;
  }
  .gallery-dist {
    position: absolute;
    bottom: 3px;
    right: 3px;
    background: rgba(0,0,0,0.6);
    color: #fff;
    font-size: 8px;
    padding: 1px 3px;
    border-radius: 3px;
    font-variant-numeric: tabular-nums;
    line-height: 1.2;
  }

  .gallery-info {
    padding: 4px 5px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .gallery-name {
    font-size: 9px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  }
  .gallery-meta {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  /* ── List-view thumbnails ── */
  .list-thumb {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    object-fit: cover;
    border-radius: 3px;
    border: 1px solid var(--border-secondary);
  }
  .list-thumb-placeholder {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border-radius: 3px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-secondary);
  }

  /* ── Preview card layout with thumb ── */
  .proximity-preview-top {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    margin-bottom: 4px;
  }
  .preview-thumb {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid var(--border-secondary);
  }

  /* ── Photo filter pill ── */
  .proximity-pill.photo-pill {
    font-size: 10px;
    letter-spacing: -0.5px;
  }
  .proximity-pill.photo-pill.on {
    background: var(--accent-primary, #6366f1);
    color: white;
    border-color: var(--accent-primary, #6366f1);
  }

  /* ── Gallery photo count badge ── */
  .gallery-photo-count {
    position: absolute;
    top: 3px;
    right: 3px;
    background: rgba(0,0,0,0.6);
    color: #fff;
    font-size: 8px;
    padding: 1px 3px;
    border-radius: 3px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.3px;
  }

  /* ── Image Carousel ── */
  .carousel-container {
    position: relative;
    width: 100%;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid var(--border-primary);
    background: var(--bg-tertiary);
  }
  .carousel-img {
    display: block;
    width: 100%;
    max-height: 220px;
    object-fit: cover;
  }
  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.5);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.15s;
    z-index: 2;
  }
  .carousel-container:hover .carousel-btn {
    opacity: 1;
  }
  .carousel-btn:hover {
    background: rgba(0,0,0,0.75);
  }
  .carousel-prev { left: 6px; }
  .carousel-next { right: 6px; }
  .carousel-dots {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 4px;
    z-index: 2;
  }
  .carousel-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: none;
    background: rgba(255,255,255,0.4);
    cursor: pointer;
    padding: 0;
    transition: background 0.15s;
  }
  .carousel-dot.active {
    background: #fff;
  }
  .carousel-dot:hover {
    background: rgba(255,255,255,0.8);
  }

  /* ── List-view photo count badge ── */
  .list-photo-count {
    flex-shrink: 0;
    font-size: 8px;
    color: var(--text-muted);
    background: var(--bg-tertiary);
    border: 1px solid var(--border-secondary);
    border-radius: 3px;
    padding: 0 3px;
    line-height: 14px;
    font-variant-numeric: tabular-nums;
    margin-left: -2px;
  }

  /* ── Lightbox ── */
  .lightbox-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.88);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: lightbox-fade-in 0.15s ease-out;
  }
  @keyframes lightbox-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .lightbox-content {
    position: relative;
    max-width: 90vw;
    max-height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .lightbox-img {
    max-width: 90vw;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 4px;
    transition: transform 0.2s ease;
    user-select: none;
  }
  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255,255,255,0.12);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s;
    z-index: 2;
  }
  .lightbox-nav:hover {
    background: rgba(255,255,255,0.25);
  }
  .lightbox-prev { left: -54px; }
  .lightbox-next { right: -54px; }

  .lightbox-toolbar {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 12px;
    white-space: nowrap;
  }
  .lightbox-caption {
    color: rgba(255,255,255,0.7);
    font-size: 12px;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .lightbox-zoom-controls {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .lightbox-zoom-controls button {
    background: rgba(255,255,255,0.12);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 4px;
    width: 24px;
    height: 24px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;
  }
  .lightbox-zoom-controls button:hover {
    background: rgba(255,255,255,0.25);
  }
  .lightbox-zoom-controls span {
    color: rgba(255,255,255,0.6);
    font-size: 11px;
    min-width: 32px;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
  .lightbox-close {
    background: rgba(255,255,255,0.12);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 4px;
    width: 28px;
    height: 28px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;
  }
  .lightbox-close:hover {
    background: rgba(255, 60, 60, 0.4);
  }

  .plot-container {
    flex: 1;
    min-width: 0;
    position: relative;
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

  /* ─── Surface Prediction Legend ──────────────────────────── */

  .prediction-legend {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    color: var(--text-secondary, #999);
    padding: 4px 0 2px 22px;
    flex-wrap: wrap;
  }
  .pred-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 2px;
    margin-right: 2px;
  }

  /* ── Kiosk / Booth Mode ───────────────────────────────────────────── */
  .stull-explorer.kiosk-active {
    position: relative;
  }
  .stull-explorer.kiosk-active .plot-container {
    width: 100%;
    flex: 1;
  }

  .kiosk-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px 40px;
  }

  .kiosk-brand {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .kiosk-title {
    font-size: 42px;
    font-weight: 800;
    letter-spacing: -1px;
    color: rgba(255, 255, 255, 0.85);
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.6), 0 0 60px rgba(99, 102, 241, 0.3);
    font-family: var(--font-heading, system-ui);
  }

  .kiosk-tagline {
    font-size: 18px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.55);
    text-shadow: 0 1px 10px rgba(0, 0, 0, 0.5);
    letter-spacing: 0.5px;
  }

  .kiosk-hint {
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.4);
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
    text-align: right;
    letter-spacing: 0.3px;
  }

  @keyframes kiosk-fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .kiosk-overlay .kiosk-brand {
    animation: kiosk-fade-in 1.5s ease-out;
  }
  .kiosk-overlay .kiosk-hint {
    animation: kiosk-fade-in 2s ease-out 0.5s both;
  }

  /* ── Mobile breakpoints ── */

  /* Tablet / small desktop */
  @media (max-width: 768px) {
    .proximity-nearby-scroll.gallery-mode {
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 8px;
      max-height: none;
      padding: 4px;
    }

    .gallery-card {
      font-size: 12px;
    }

    .gallery-name {
      font-size: 10px;
    }

    .carousel-btn {
      opacity: 1;
      width: 32px;
      height: 32px;
      font-size: 18px;
    }

    .lightbox-prev { left: 8px; }
    .lightbox-next { right: 8px; }

    .lightbox-content {
      max-width: 96vw;
      max-height: 88vh;
    }
    .lightbox-img {
      max-width: 96vw;
      max-height: 82vh;
    }

    .lightbox-toolbar {
      bottom: -44px;
      gap: 8px;
    }

    .proximity-preview {
      display: none;
    }
  }

  /* Phone portrait */
  @media (max-width: 480px) {
    .proximity-nearby-scroll.gallery-mode {
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }

    .gallery-thumb {
      aspect-ratio: 4/3;
    }

    .gallery-info {
      padding: 5px 6px;
    }

    .gallery-name {
      font-size: 11px;
    }

    .gallery-rank {
      font-size: 9px;
      padding: 1px 4px;
    }

    .gallery-dist {
      font-size: 9px;
      padding: 1px 4px;
    }

    .carousel-img {
      max-height: 180px;
    }

    .carousel-btn {
      width: 36px;
      height: 36px;
      font-size: 20px;
    }

    .lightbox-nav {
      width: 44px;
      height: 44px;
      font-size: 24px;
    }
    .lightbox-prev { left: 4px; }
    .lightbox-next { right: 4px; }

    .lightbox-toolbar {
      flex-wrap: wrap;
      justify-content: center;
      bottom: -52px;
      gap: 6px;
    }

    .lightbox-close {
      width: 32px;
      height: 32px;
    }

    .lightbox-zoom-controls button {
      width: 28px;
      height: 28px;
    }

    .proximity-nearby-header {
      flex-wrap: wrap;
      gap: 4px;
    }

    .proximity-filter-pills {
      flex-wrap: wrap;
    }

    .proximity-nearby-item {
      font-size: 11px;
    }

    .list-thumb {
      width: 28px;
      height: 28px;
    }
  }
`,da=o.lazy(()=>Ye(()=>Promise.resolve().then(()=>aa),void 0).then(t=>({default:t.StullPlot3D}))),pa=o.lazy(()=>Ye(()=>import("./ComparePanel-D0QpnKE_.js"),__vite__mapDeps([3,1,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18])).then(t=>({default:t.ComparePanel}))),xa=o.lazy(()=>Ye(()=>import("./index-4a_lvNVI.js"),__vite__mapDeps([19,1,4,5,6,7])).then(t=>({default:t.AnalysisPanel}))),ua=o.lazy(()=>Ye(()=>import("./index-DNJCmhuO.js"),__vite__mapDeps([20,1,10,11])).then(t=>({default:t.DigitalfirePanel}))),ma=["oxidation","reduction","neutral","unknown"],ha=["gloss","satin","matte","crystalline","crawl","unknown"];function ga(){const[t,i]=o.useState(!0),{atmospheres:n,surfaces:l,coneMin:c,coneMax:u,hasIngredients:f,hasImages:d,activeCount:b,toggleAtmosphere:x,toggleSurface:h,setConeRange:g,setHasIngredients:S,setHasImages:L,clearAll:k}=Wt();return e.jsxs("div",{className:"control-group filter-panel",children:[e.jsxs("h3",{style:{cursor:"pointer",display:"flex",alignItems:"center",gap:6,userSelect:"none"},onClick:()=>i(!t),children:[e.jsx("span",{style:{fontSize:10,transition:"transform 0.15s",transform:t?"rotate(90deg)":"rotate(0)"},children:"▶"}),"Filters",b>0&&e.jsx("span",{className:"filter-badge",children:b})]}),t&&e.jsxs("div",{className:"filter-body",children:[e.jsxs("div",{className:"filter-section",children:[e.jsx("span",{className:"filter-label",children:"Atmosphere"}),e.jsx("div",{className:"filter-chips",children:ma.map(v=>e.jsx("button",{className:`filter-chip ${n.has(v)?"active":""}`,onClick:()=>x(v),"aria-pressed":n.has(v),"aria-label":`Atmosphere: ${v}`,children:v==="unknown"?"?":v.slice(0,3)},v))})]}),e.jsxs("div",{className:"filter-section",children:[e.jsx("span",{className:"filter-label",children:"Surface"}),e.jsx("div",{className:"filter-chips",children:ha.map(v=>e.jsx("button",{className:`filter-chip ${l.has(v)?"active":""}`,onClick:()=>h(v),"aria-pressed":l.has(v),"aria-label":`Surface: ${v}`,children:v==="unknown"?"?":v==="crystalline"?"crys":v.slice(0,4)},v))})]}),e.jsxs("div",{className:"filter-section",children:[e.jsx("span",{className:"filter-label",children:"Cone range"}),e.jsxs("div",{className:"cone-range-inputs",children:[e.jsx("input",{type:"number",className:"cone-input",placeholder:"min",value:c??"",onChange:v=>{const H=v.target.value===""?null:Number(v.target.value);g(H,u)},min:-6,max:13}),e.jsx("span",{style:{color:"var(--text-secondary)",fontSize:12},children:"to"}),e.jsx("input",{type:"number",className:"cone-input",placeholder:"max",value:u??"",onChange:v=>{const H=v.target.value===""?null:Number(v.target.value);g(c,H)},min:-6,max:13})]})]}),e.jsxs("div",{className:"filter-section",children:[e.jsxs("label",{className:"filter-flag",children:[e.jsx("input",{type:"checkbox",checked:f,onChange:v=>S(v.target.checked)}),"Has recipe"]}),e.jsxs("label",{className:"filter-flag",children:[e.jsx("input",{type:"checkbox",checked:d,onChange:v=>L(v.target.checked)}),"Has photo"]})]}),b>0&&e.jsx("button",{className:"filter-clear",onClick:k,children:"Clear all filters"})]})]})}function ba(){const t=ar(),[i,n]=o.useState("SiO2"),[l,c]=o.useState("Al2O3"),[u,f]=o.useState("cone"),[d,b]=o.useState(1),[x,h]=o.useState(!1),[g,S]=o.useState("B2O3"),[L,k]=o.useState(!0),[v,H]=o.useState(.35),[ie,P]=o.useState(!1),[K,J]=o.useState("default"),[G,U]=o.useState(!1),[se,ee]=o.useState("6"),[z,I]=o.useState(.5),[w,T]=o.useState(!1),[ae,E]=o.useState({x:1,y:-1,z:2}),[le,m]=o.useState(null),[N,C]=o.useState([]),[A,W]=o.useState(!1),[te,ce]=o.useState(.5);o.useEffect(()=>{if(!t.active)return;h(!0),W(!0),ce(.3),f("cone"),k(!0),H(.25),I(.6),De(.8),ke(3);const R=new URLSearchParams(window.location.search||window.location.hash.split("?")[1]||"").get("z");R&&S(R)},[t.active]);const[ve,ke]=o.useState(2.5),[he,De]=o.useState(.8),[Te,Oe]=o.useState(!1),[Ie,p]=o.useState(.35),[y,Y]=o.useState(null),[ue,$]=o.useState(null),[Z,re]=o.useState(null),[we,Ne]=o.useState([]),[de,Ke]=o.useState({...Ge}),[ge,pe]=o.useState(!1),[Be,qe]=o.useState(0),Xe=o.useCallback((a,R)=>{m(a),C(R)},[]),Ze=o.useCallback(()=>{qe(a=>a+1)},[]);o.useEffect(()=>{if(!x)return;const a=["default","top","side-x","side-y"],R=B=>{const F=B.target;(F==null?void 0:F.tagName)==="INPUT"||(F==null?void 0:F.tagName)==="TEXTAREA"||(F==null?void 0:F.tagName)==="SELECT"||F!=null&&F.isContentEditable||(B.key>="1"&&B.key<="4"?(J(a[Number(B.key)-1]),B.preventDefault()):B.key==="r"||B.key==="R"?(W(je=>!je),B.preventDefault()):B.key==="0"&&(Ze(),B.preventDefault()))};return window.addEventListener("keydown",R),()=>window.removeEventListener("keydown",R)},[x,Ze]),o.useEffect(()=>{x&&f("z_axis")},[x,g]);const _=fe(a=>a.selectedGlaze),Qe=fe(a=>a.showSidebar),be=fe(a=>a.sidebarTab);o.useEffect(()=>{_||(Oe(!1),$(null))},[_]);const Je=fe(a=>a.toggleSidebar),Ae=fe(a=>a.setSidebarTab),Ue=fe(a=>a.setSelectedGlaze),et=fe(a=>a.addToCompare),Me=fe(a=>a.compareGlazes),st=fe(a=>a.removeFromCompare),it=fe(a=>a.clearCompare),He=Re(a=>a.glazes),tt=Re(a=>a.stats),[lt,rt]=o.useState([]),[ct,at]=o.useState(null),gt=o.useCallback(a=>{rt(a),at(null)},[]),bt=o.useCallback((a,R)=>{at({x:a.x,y:a.y,r:R}),rt([])},[]),[dt,ft]=o.useState(null),[r,s]=o.useState(!1),O=o.useCallback(a=>{ft(a),a&&s(!0)},[]),{results:j,weights:D,count:V,setCount:oe,updateWeight:xe,resetWeights:me,oxides:ne}=mr(_,He),q=["SiO2","Al2O3","B2O3","Na2O","K2O","CaO","MgO","ZnO","BaO"],ye=[...x?[{value:"z_axis",label:"↕ Z Axis"}]:[],{value:"cone",label:"Cone"},{value:"glaze_type",label:"Glaze Type"},{value:"surface",label:"Surface"},{value:"source",label:"Source"},{value:"flux_ratio",label:"R2O:RO Ratio"},{value:"boron",label:"Boron"},{value:"confidence",label:"Confidence"}],Se=[{value:"Li2O",label:"Li₂O (Lithium)",group:"Fluxes – R₂O"},{value:"Na2O",label:"Na₂O (Sodium)",group:"Fluxes – R₂O"},{value:"K2O",label:"K₂O (Potassium)",group:"Fluxes – R₂O"},{value:"CaO",label:"CaO (Calcium)",group:"Fluxes – RO"},{value:"MgO",label:"MgO (Magnesium)",group:"Fluxes – RO"},{value:"SrO",label:"SrO (Strontium)",group:"Fluxes – RO"},{value:"BaO",label:"BaO (Barium)",group:"Fluxes – RO"},{value:"ZnO",label:"ZnO (Zinc)",group:"Fluxes – RO"},{value:"PbO",label:"PbO (Lead)",group:"Fluxes – RO"},{value:"B2O3",label:"B₂O₃ (Boron)",group:"Stabilizers"},{value:"Fe2O3",label:"Fe₂O₃ (Iron)",group:"Stabilizers"},{value:"TiO2",label:"TiO₂ (Titanium)",group:"Glass Formers"},{value:"ZrO2",label:"ZrO₂ (Zirconium)",group:"Glass Formers"},{value:"SnO2",label:"SnO₂ (Tin)",group:"Glass Formers"},{value:"MnO",label:"MnO (Manganese)",group:"Colorants"},{value:"MnO2",label:"MnO₂ (Manganese IV)",group:"Colorants"},{value:"NiO",label:"NiO (Nickel)",group:"Colorants"},{value:"CuO",label:"CuO (Copper)",group:"Colorants"},{value:"Cu2O",label:"Cu₂O (Cuprous)",group:"Colorants"},{value:"CoO",label:"CoO (Cobalt)",group:"Colorants"},{value:"Cr2O3",label:"Cr₂O₃ (Chromium)",group:"Colorants"},{value:"P2O5",label:"P₂O₅ (Phosphorus)",group:"Colorants"},{value:"cone",label:"Cone (Temperature)",group:"Ratios & Sums"},{value:"flux_ratio",label:"R₂O:RO Ratio",group:"Ratios & Sums"},{value:"SiO2_Al2O3_ratio",label:"SiO₂:Al₂O₃ Ratio",group:"Ratios & Sums"},{value:"total_flux_moles",label:"Total Flux Moles",group:"Ratios & Sums"},{value:"thermal_expansion",label:"Thermal Exp. (COE)",group:"Ratios & Sums"},{value:"nbo_t",label:"NBO/T (Network Breakup)",group:"Glass Structure"},{value:"optical_basicity",label:"Optical Basicity (Λ)",group:"Glass Structure"},{value:"flux_entropy",label:"Flux Diversity (Entropy)",group:"Flux Analysis"},{value:"cao_mgo_ratio",label:"CaO:MgO (Texture Dial)",group:"Flux Analysis"},{value:"combined_alkali",label:"Combined Alkali (KNaO)",group:"Flux Analysis"},{value:"na2o_k2o_ratio",label:"Na₂O:K₂O Ratio",group:"Flux Analysis"},{value:"viscosity_index",label:"Viscosity Index",group:"Physical"},{value:"surface_tension",label:"Surface Tension (Dietzel)",group:"Physical"},{value:"durability",label:"Chemical Durability",group:"Physical"},{value:"total_colorant",label:"Total Colorant Load",group:"Colorant"},{value:"fe_ti_ratio",label:"Fe:Ti Ratio",group:"Colorant"}];return e.jsxs("div",{className:`stull-explorer${t.active?" kiosk-active":""}`,role:"application","aria-label":"Stull Chart Glaze Explorer",children:[!t.active&&e.jsxs("aside",{className:"controls-panel","aria-label":"Plot controls",children:[e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{id:"axes-heading",children:"Axes"}),e.jsxs("div",{className:"axis-controls",role:"group","aria-labelledby":"axes-heading",children:[e.jsxs("label",{children:["X Axis",e.jsx("select",{value:i,onChange:a=>n(a.target.value),children:q.map(a=>e.jsx("option",{value:a,children:a},a))})]}),e.jsxs("label",{children:["Y Axis",e.jsx("select",{value:l,onChange:a=>c(a.target.value),children:q.map(a=>e.jsx("option",{value:a,children:a},a))})]})]})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Color By"}),e.jsx("select",{value:u,onChange:a=>f(a.target.value),className:"color-select",children:ye.map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"View"}),e.jsx("button",{className:`view-toggle ${x?"active":""}`,onClick:()=>h(!x),"aria-pressed":x,"aria-label":x?"Switch to 2D view":"Switch to 3D view",children:x?"◆ 3D":"◇ 2D"}),x&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"z-axis-control",children:e.jsxs("label",{children:["Z Axis",e.jsx("select",{value:g,onChange:a=>S(a.target.value),children:Array.from(new Set(Se.map(a=>a.group))).map(a=>e.jsx("optgroup",{label:a,children:Se.filter(R=>R.group===a).map(R=>e.jsx("option",{value:R.value,children:R.label},R.value))},a))})]})}),e.jsxs("div",{className:"three-d-extras",children:[e.jsxs("label",{className:"surface-toggle",children:[e.jsx("input",{type:"checkbox",checked:L,onChange:a=>k(a.target.checked)}),"Fitted Surface"]}),L&&e.jsxs("div",{className:"surface-opacity",children:[e.jsx("span",{children:"Opacity"}),e.jsx("input",{type:"range",min:"0.1",max:"0.8",step:"0.05",value:v,onChange:a=>H(Number(a.target.value))}),e.jsxs("span",{className:"opacity-value",children:[Math.round(v*100),"%"]})]}),e.jsxs("label",{className:"surface-toggle",children:[e.jsx("input",{type:"checkbox",checked:ie,onChange:a=>P(a.target.checked)}),"Predict Surface"]}),ie&&e.jsxs("div",{className:"prediction-legend",children:[e.jsx("span",{className:"pred-dot",style:{background:"#22c55e"}}),"Matte",e.jsx("span",{className:"pred-dot",style:{background:"#3b82f6"}}),"Gloss",e.jsx("span",{className:"pred-dot",style:{background:"#f59e0b"}}),"Satin",e.jsx("span",{className:"pred-dot",style:{background:"#a855f7"}}),"Crystal"]})]}),e.jsxs("div",{className:"camera-presets",children:[e.jsx("span",{className:"presets-label",children:"Camera"}),e.jsxs("div",{className:"preset-buttons",children:[["default","top","side-x","side-y"].map(a=>e.jsx("button",{className:`preset-btn ${K===a?"active":""}`,onClick:()=>J(a),title:{default:"Perspective view (1)",top:"Top-down / birds eye (2)","side-x":"Side view along Al₂O₃ (3)","side-y":"Side view along SiO₂ (4)"}[a],children:{default:"⬢",top:"⮝","side-x":"⮞","side-y":"⮜"}[a]},a)),e.jsx("button",{className:"preset-btn",onClick:Ze,title:"Reset camera to current preset",children:"↺"})]})]}),e.jsxs("div",{className:"three-d-control-row",children:[e.jsxs("label",{className:"surface-toggle",children:[e.jsx("input",{type:"checkbox",checked:A,onChange:a=>W(a.target.checked)}),"Auto-Rotate"]}),A&&e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"0.1",max:"2",step:"0.1",value:te,onChange:a=>ce(Number(a.target.value)),title:`Speed: ${te.toFixed(1)}x`}),e.jsxs("span",{className:"slider-value",children:[te.toFixed(1),"x"]})]})]}),e.jsxs("div",{className:"three-d-control-row",children:[e.jsx("span",{className:"control-row-label",children:"Point Size"}),e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"1",max:"8",step:"0.5",value:ve,onChange:a=>ke(Number(a.target.value))}),e.jsx("span",{className:"slider-value",children:ve.toFixed(1)})]})]}),e.jsxs("div",{className:"three-d-control-row",children:[e.jsx("span",{className:"control-row-label",children:"Z Stretch"}),e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"0.2",max:"2.0",step:"0.1",value:he,onChange:a=>De(Number(a.target.value))}),e.jsx("span",{className:"slider-value",children:he.toFixed(1)})]})]}),e.jsxs("div",{className:"three-d-control-row",children:[e.jsx("span",{className:"control-row-label",children:"Perspective"}),e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:z,onChange:a=>I(Number(a.target.value)),title:z<.01?"Orthographic":`Perspective: ${Math.round(z*100)}%`}),e.jsx("span",{className:"slider-value",children:z<.01?"Ortho":`${Math.round(z*100)}%`})]})]}),e.jsxs("div",{className:"light-control",children:[e.jsxs("label",{className:"surface-toggle",children:[e.jsx("input",{type:"checkbox",checked:w,onChange:a=>T(a.target.checked)}),"Light Source"]}),w&&e.jsx("div",{style:{marginTop:6,display:"flex",flexDirection:"column",gap:4},children:["x","y","z"].map(a=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:12},children:[e.jsx("span",{style:{width:12,color:"var(--text-secondary)"},children:a.toUpperCase()}),e.jsx("input",{type:"range",min:"-3",max:"3",step:"0.1",value:ae[a],onChange:R=>E(B=>({...B,[a]:Number(R.target.value)})),style:{flex:1}}),e.jsx("span",{style:{fontSize:11,color:"var(--text-dim)",minWidth:28,textAlign:"right"},children:ae[a].toFixed(1)})]},a))})]}),e.jsxs("div",{className:"three-d-control-row proximity-control",children:[e.jsxs("label",{className:"surface-toggle",style:{margin:0},children:[e.jsx("input",{type:"checkbox",checked:Te,onChange:a=>Oe(a.target.checked),disabled:!_}),"Proximity"]}),Te&&!_&&e.jsx("span",{className:"slider-value",style:{fontSize:10,opacity:.6},children:"Select a glaze"}),Te&&_&&y&&e.jsxs("span",{className:"slider-value",style:{fontSize:10},children:[y.visible,"/",y.total]})]}),e.jsxs("div",{className:"three-d-shortcuts-hint",children:[e.jsx("kbd",{children:"1"}),"–",e.jsx("kbd",{children:"4"})," camera presets   ",e.jsx("kbd",{children:"R"})," rotate   ",e.jsx("kbd",{children:"0"})," reset"]})]})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Zoom"}),e.jsxs("div",{className:"zoom-control",children:[e.jsx("input",{type:"range",min:"0.5",max:"4",step:"0.1",value:d,onChange:a=>b(Number(a.target.value)),"aria-label":`Zoom level: ${d.toFixed(1)}x`}),e.jsxs("span",{className:"zoom-value",children:[d.toFixed(1),"x"]})]}),e.jsx("button",{className:"reset-zoom",onClick:()=>b(1),children:"Reset"})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Limit Formulas"}),e.jsxs("label",{className:"surface-toggle",style:{marginBottom:4},children:[e.jsx("input",{type:"checkbox",checked:G,onChange:a=>U(a.target.checked)}),"Show Limits"]}),G&&e.jsxs("div",{style:{marginTop:4},children:[e.jsxs("label",{style:{fontSize:12,color:"var(--text-secondary)"},children:["Highlight Cone",e.jsxs("select",{value:se,onChange:a=>ee(a.target.value),style:{marginLeft:6,fontSize:12},children:[e.jsx("option",{value:"06",children:"Cone 06"}),e.jsx("option",{value:"05",children:"Cone 05"}),e.jsx("option",{value:"04",children:"Cone 04"}),e.jsx("option",{value:"03",children:"Cone 03"}),e.jsx("option",{value:"02",children:"Cone 02"}),e.jsx("option",{value:"01",children:"Cone 01"}),e.jsx("option",{value:"1",children:"Cone 1"}),e.jsx("option",{value:"2",children:"Cone 2"}),e.jsx("option",{value:"3",children:"Cone 3"}),e.jsx("option",{value:"4",children:"Cone 4"}),e.jsx("option",{value:"5",children:"Cone 5"}),e.jsx("option",{value:"6",children:"Cone 6"}),e.jsx("option",{value:"7",children:"Cone 7"}),e.jsx("option",{value:"8",children:"Cone 8"}),e.jsx("option",{value:"9",children:"Cone 9"}),e.jsx("option",{value:"10",children:"Cone 10"}),e.jsx("option",{value:"11",children:"Cone 11"}),e.jsx("option",{value:"12",children:"Cone 12"}),e.jsx("option",{value:"13",children:"Cone 13"})]})]}),e.jsx("p",{style:{fontSize:10,color:"var(--text-tertiary)",margin:"4px 0 0",lineHeight:1.3},children:"Safe oxide ranges from Digitalfire & ceramic literature"})]})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Export"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("button",{className:"reset-zoom",onClick:()=>Lt("png","stull-atlas-chart"),title:"Save chart as a high-res PNG image",children:"📷 Save Image (PNG)"}),e.jsx("button",{className:"reset-zoom",onClick:()=>Lt("svg","stull-atlas-chart"),title:"Save chart as SVG vector graphic",children:"🖼 Save Image (SVG)"}),e.jsx("button",{className:"reset-zoom",onClick:()=>cr("Stull Atlas"),title:"Print or save as PDF",children:"🖨 Print / PDF"}),x&&le&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{borderTop:"1px solid var(--border)",margin:"4px 0",paddingTop:4},children:e.jsx("span",{style:{fontSize:10,color:"var(--text-tertiary)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em"},children:"3D Surface"})}),e.jsx("button",{className:"reset-zoom",onClick:()=>dr(le,{zLabel:ze(g),scatterPoints:N}),title:"Export surface mesh as OBJ — opens in Blender, MeshLab, etc.",children:"🧊 Surface Mesh (OBJ)"}),e.jsx("button",{className:"reset-zoom",onClick:()=>pr(le),title:"Export surface mesh as STL — for 3D printing or CAD tools",children:"🔺 Surface Mesh (STL)"}),e.jsx("button",{className:"reset-zoom",onClick:()=>xr(N,{zLabel:ze(g)}),title:"Export glaze scatter points as CSV with 3D coordinates",children:"📊 3D Points (CSV)"})]})]})]}),$e.molarWeights&&e.jsx(Pr,{}),$e.analysisSetPicker&&e.jsx(Er,{}),e.jsx(kr,{}),$e.filterPanel&&e.jsx(ga,{}),dt&&e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Overlays"}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,fontSize:13,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:r,onChange:a=>s(a.target.checked)}),"Density Heatmap"]})]})]}),e.jsxs("main",{className:"plot-container","aria-label":"Stull chart visualization",children:[t.active&&e.jsxs("div",{className:"kiosk-overlay",children:[e.jsxs("div",{className:"kiosk-brand",children:[e.jsx("span",{className:"kiosk-title",children:"Stull Atlas"}),e.jsx("span",{className:"kiosk-tagline",children:"Ceramic chemistry in three dimensions"})]}),e.jsx("div",{className:"kiosk-hint",children:"stullatlas.com"})]}),x?e.jsx(o.Suspense,{fallback:e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",flex:1,color:"var(--text-secondary)",fontSize:14},children:"Loading 3D view..."}),children:e.jsx(da,{zAxis:g,colorBy:u,zoom:d,highlightPointIds:lt,highlightCircle:ct,showSurface:L,surfaceOpacity:v,showPrediction:ie,cameraPreset:K,perspective:z,lightPosition:w?ae:void 0,onSurfaceGridReady:Xe,autoRotate:A,autoRotateSpeed:te,pointSize:ve,zStretch:he,proximityRadius:Te&&_?Ie:null,proximityCenterId:ue,proximityWeights:de,hoveredNeighborId:Z,onProximityStats:Y,onResetCamera:Ze,kioskMode:t.active},Be)}):e.jsx(zr,{xAxis:i,yAxis:l,colorBy:u,zoom:d,highlightPointIds:lt,highlightCircle:ct,densityMap:r?dt:null,showLimits:G,limitCone:G?se:null}),x&&Te&&_&&e.jsxs("div",{className:"proximity-floating-card",children:[e.jsxs("div",{className:"proximity-floating-header",children:[e.jsx("span",{children:"Proximity Options"}),e.jsx("button",{className:"proximity-floating-close",onClick:()=>Oe(!1),"aria-label":"Close proximity",children:"×"})]}),e.jsxs("div",{className:"proximity-floating-section",children:[e.jsx("label",{className:"proximity-floating-label",children:"Radius"}),e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"0.05",max:"1.5",step:"0.05",value:Ie,onChange:a=>p(Number(a.target.value)),title:`Radius: ${(Ie*100).toFixed(0)}%`}),e.jsx("span",{className:"slider-value",children:y?`${y.visible}/${y.total}`:`${(Ie*100).toFixed(0)}%`})]})]}),(()=>{const a=[{label:"Balanced",title:"Equal weight on all axes",weights:{x:.5,y:.5,z:.5,cone:0,surface:0}},{label:"Chemistry Twin",title:"Prioritize SiO₂ and Al₂O₃ match",weights:{x:1,y:1,z:.3,cone:0,surface:0}},{label:"Same Surface",title:"Must match surface type",weights:{x:.3,y:.3,z:.2,cone:0,surface:1}},{label:"Same Cone",title:"Prioritize firing temperature match",weights:{x:.2,y:.2,z:.2,cone:1,surface:0}},{label:"Flux Sibling",title:"Match on Z-axis (flux/ratio)",weights:{x:.2,y:.2,z:1,cone:0,surface:0}}],R=[{key:"x",label:"SiO₂",color:"#3b82f6"},{key:"y",label:"Al₂O₃",color:"#22c55e"},{key:"z",label:ze(g),color:"#f59e0b"},{key:"cone",label:"Cone",color:"#a855f7"},{key:"surface",label:"Surface",color:"#ec4899"}],B=Object.keys(Ge).every(F=>de[F]===Ge[F]);return e.jsxs("div",{className:"aesthetic-compass",style:{margin:0},children:[e.jsxs("button",{className:`compass-toggle${ge?" open":""}`,onClick:()=>pe(F=>!F),children:[e.jsx("span",{className:"compass-icon",children:"🧭"}),e.jsx("span",{children:"Aesthetic Compass"}),!B&&e.jsx("span",{className:"compass-active-dot"}),e.jsx("span",{className:"compass-chevron",children:ge?"▾":"▸"})]}),ge&&e.jsxs("div",{className:"compass-body",children:[e.jsx("div",{className:"compass-presets",children:a.map(F=>{const je=Object.keys(F.weights).every(Ce=>Math.abs(de[Ce]-F.weights[Ce])<.01);return e.jsx("button",{className:`compass-preset-btn${je?" active":""}`,onClick:()=>Ke({...F.weights}),title:F.title,children:F.label},F.label)})}),e.jsx("div",{className:"compass-sliders",children:R.map(F=>e.jsxs("div",{className:"compass-slider-row",children:[e.jsx("span",{className:"compass-slider-label",style:{color:F.color},children:F.label}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:de[F.key],onChange:je=>Ke(Ce=>({...Ce,[F.key]:Number(je.target.value)})),className:"compass-slider",style:{"--slider-color":F.color}}),e.jsxs("span",{className:"compass-slider-val",children:[(de[F.key]*100).toFixed(0),"%"]})]},F.key))}),!B&&e.jsx("button",{className:"compass-reset-btn",onClick:()=>Ke({...Ge}),children:"Reset to default"})]})]})})(),y&&y.nearby.length>0&&e.jsx(na,{proximityStats:y,glazes:He,selectedGlaze:_,pinnedCenterId:ue,hoveredNeighborId:Z,explorationPath:we,zAxis:g,onSelectGlaze:Ue,onCompareGlaze:et,onHoverNeighbor:re,onPinCenter:$,onExplorationPathChange:Ne})]}),!t.active&&tt.total>0&&e.jsxs("div",{className:"data-count-badge",title:`${tt.total.toLocaleString()} glazes in database`,children:[tt.total.toLocaleString()," glazes"]})]}),Qe&&!t.active&&e.jsxs("aside",{className:"detail-panel","aria-label":"Glaze details",children:[e.jsx("button",{className:"close-sidebar",onClick:Je,"aria-label":"Close sidebar",children:"×"}),e.jsxs("div",{className:"sidebar-tabs",role:"tablist","aria-label":"Detail panel views",children:[e.jsx("button",{className:`sidebar-tab ${be==="detail"?"active":""}`,onClick:()=>Ae("detail"),role:"tab","aria-selected":be==="detail",children:"Detail"}),e.jsxs("button",{className:`sidebar-tab ${be==="compare"?"active":""}`,onClick:()=>Ae("compare"),role:"tab","aria-selected":be==="compare",children:["Compare",Me.length>0?` (${Me.length})`:""]}),e.jsx("button",{className:`sidebar-tab ${be==="analysis"?"active":""}`,onClick:()=>Ae("analysis"),role:"tab","aria-selected":be==="analysis",children:"Analysis"}),$e.knowledgeTab&&e.jsx("button",{className:`sidebar-tab ${be==="knowledge"?"active":""}`,onClick:()=>Ae("knowledge"),role:"tab","aria-selected":be==="knowledge",title:"Ceramic knowledge from Tony Hansen's Digitalfire Reference Library",children:"Knowledge"})]}),be==="detail"&&e.jsx(e.Fragment,{children:_?e.jsxs("div",{className:"glaze-detail",role:"tabpanel","aria-label":"Selected glaze details",children:[e.jsxs("div",{className:"sr-only","aria-live":"polite",children:["Selected: ",_.name,", Cone ",Fe(Number(_.coneRange[0]))," to ",Fe(Number(_.coneRange[1])),", ",_.surfaceType," surface"]}),e.jsx("h2",{children:_.name}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8},children:e.jsx(hr,{glazeTypeId:_.glazeTypeId,showParent:!0})}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Source"}),e.jsx("p",{children:_.source}),_.sourceUrl&&e.jsx("a",{href:_.sourceUrl,target:"_blank",rel:"noopener noreferrer",children:"View original →"}),_.id.startsWith("glazy_")&&e.jsx("a",{href:`https://glazy.org/recipes/${_.id.replace("glazy_","")}`,target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:4,fontSize:12,marginTop:4},children:"View on Glazy →"})]}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Firing"}),e.jsx(gr,{coneRange:_.coneRange}),_.atmosphere!=="unknown"&&e.jsx("p",{style:{margin:"4px 0 0",fontSize:12,color:"var(--text-label)"},children:_.atmosphere})]}),(()=>{var B,F;const a=_.umf;if(!a)return null;const R=[{label:"Fluxes (R₂O)",oxides:["Li2O","Na2O","K2O"]},{label:"Fluxes (RO)",oxides:["CaO","MgO","ZnO","BaO","SrO"]},{label:"Stabilizers",oxides:["Al2O3","B2O3","Fe2O3"]},{label:"Glass Formers",oxides:["SiO2","TiO2","ZrO2"]}];return e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"UMF"}),e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-start",marginBottom:8},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6,alignItems:"center"},children:[e.jsx(qt,{umf:a,size:56}),e.jsx(vr,{x:((B=a.SiO2)==null?void 0:B.value)??0,y:((F=a.Al2O3)==null?void 0:F.value)??0,size:56})]}),e.jsxs("div",{style:{flex:1},children:[e.jsx(Yt,{umf:a,showLabels:!0,width:160}),e.jsx(ir,{umf:a,size:130})]})]}),e.jsx("table",{className:"recipe-table",style:{fontSize:12},children:e.jsxs("tbody",{children:[R.map(je=>{const Ce=je.oxides.filter(X=>{var Q;return(((Q=a[X])==null?void 0:Q.value)??0)>.001}).map(X=>{var Q;return{ox:X,val:((Q=a[X])==null?void 0:Q.value)??0}});return Ce.length===0?null:e.jsxs(Ot.Fragment,{children:[e.jsx("tr",{children:e.jsx("td",{colSpan:2,style:{color:"var(--text-muted)",fontSize:11,paddingTop:6},children:je.label})}),Ce.map(({ox:X,val:Q})=>e.jsxs("tr",{children:[e.jsx(lr,{oxide:X}),e.jsx("td",{className:"amount",children:Q.toFixed(3)})]},X))]},je.label)}),a._meta&&e.jsxs(e.Fragment,{children:[e.jsx("tr",{children:e.jsx("td",{colSpan:2,style:{color:"var(--text-muted)",fontSize:11,paddingTop:6},children:"Ratios"})}),e.jsxs("tr",{children:[e.jsx("td",{children:"Si:Al"}),e.jsx("td",{className:"amount",children:a._meta.SiO2_Al2O3_ratio.toFixed(2)})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"R₂O:RO"}),e.jsx("td",{className:"amount",children:a._meta.R2O_RO_ratio.toFixed(2)})]})]})]})})]})})(),_.images&&_.images.length>0&&e.jsx(la,{images:_.images,glazeName:_.name,sidebarTab:be}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Recipe"}),_.ingredients.length>0?e.jsxs(e.Fragment,{children:[e.jsx(br,{ingredients:_.ingredients}),e.jsx("table",{className:"recipe-table",style:{marginTop:6},children:e.jsx("tbody",{children:_.ingredients.map((a,R)=>e.jsxs("tr",{children:[e.jsx("td",{children:a.material}),e.jsx("td",{className:"amount",children:a.amount})]},R))})})]}):e.jsx("p",{style:{color:"var(--text-muted)",fontSize:12,margin:0},children:"No recipe data available"})]}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Similar Glazes"}),e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:8},children:[e.jsx("select",{value:V,onChange:a=>oe(Number(a.target.value)),style:{width:70,background:"var(--bg-tertiary)",border:"1px solid var(--border-primary)",borderRadius:6,color:"var(--text-label)",fontSize:12,padding:"4px 6px"},children:[3,6,9,12].map(a=>e.jsx("option",{value:a,children:a},a))}),e.jsx("button",{onClick:me,style:{background:"var(--bg-tertiary)",border:"1px solid var(--border-primary)",borderRadius:6,color:"var(--text-label)",fontSize:12,padding:"4px 8px",cursor:"pointer"},children:"Reset"})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6,marginBottom:10},children:ne.map(a=>e.jsxs("label",{style:{display:"grid",gridTemplateColumns:"58px 1fr 40px",alignItems:"center",gap:8,fontSize:12,color:"var(--text-label)"},children:[e.jsx("span",{children:a}),e.jsx("input",{type:"range",min:"0",max:"3",step:"0.25",value:D[a]??1,onChange:R=>xe(a,Number(R.target.value))}),e.jsx("span",{style:{color:"var(--text-muted)",textAlign:"right"},children:(D[a]??1).toFixed(2)})]},a))}),j.length>0?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6},children:j.map(({glaze:a,dist:R},B)=>e.jsxs("button",{onClick:()=>Ue(a),style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 8px",background:"var(--bg-tertiary)",border:"1px solid var(--border-primary)",borderRadius:6,color:"var(--text-label)",fontSize:12,cursor:"pointer"},children:[e.jsx("span",{style:{textAlign:"left"},children:a.name}),e.jsx("span",{style:{color:"var(--text-muted)"},children:R.toFixed(2)})]},a.id))}):e.jsx("p",{style:{color:"var(--text-muted)",fontSize:12,margin:0},children:"No similar matches found"})]}),_.notes&&e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Notes"}),e.jsx("p",{children:_.notes})]}),e.jsx("button",{className:"add-compare-btn",onClick:()=>et(_),disabled:Me.length>=3||Me.some(a=>a.id===_.id),title:Me.some(a=>a.id===_.id)?"Already in comparison":Me.length>=3?"Max 3 glazes":"Add to comparison",children:Me.some(a=>a.id===_.id)?"✓ In Compare":"+ Add to Compare"})]}):e.jsx("div",{className:"no-selection",children:e.jsx("p",{children:"Click a point to see glaze details"})})}),be==="compare"&&e.jsx(o.Suspense,{fallback:e.jsx("div",{style:{padding:16,fontSize:13,color:"var(--text-secondary)"},children:"Loading compare..."}),children:e.jsx(pa,{glazes:Me,onRemove:st,onClear:it,onSelect:Ue})}),be==="analysis"&&e.jsx(o.Suspense,{fallback:e.jsx("div",{style:{padding:16,fontSize:13,color:"var(--text-secondary)"},children:"Loading analysis..."}),children:e.jsx(xa,{onHighlightCluster:gt,onHighlightVoid:bt,onDensityMap:O})}),$e.knowledgeTab&&be==="knowledge"&&e.jsx(o.Suspense,{fallback:e.jsx("div",{style:{padding:16,fontSize:13,color:"var(--text-secondary)"},children:"Loading knowledge..."}),children:e.jsx(ua,{selectedGlaze:_})})]}),e.jsx("style",{children:ca})]})}function Ut(){ur("Explorer");const{isLoading:t,loadError:i,retry:n}=or();return i?e.jsxs("div",{style:{display:"flex",flex:1,alignItems:"center",justifyContent:"center",background:"var(--bg-primary)",color:"var(--text-primary)",flexDirection:"column",gap:16,padding:40},children:[e.jsx("div",{style:{fontSize:48,opacity:.3},children:"⚗"}),e.jsx("h2",{style:{margin:0,fontSize:18},children:"Failed to load glaze dataset"}),e.jsx("p",{style:{color:"var(--text-secondary)",fontSize:14,maxWidth:400,textAlign:"center",margin:0},children:i}),e.jsx("button",{onClick:n,style:{padding:"8px 20px",background:"var(--accent-bg)",border:"1px solid var(--accent)",borderRadius:6,color:"var(--text-bright)",fontSize:14,cursor:"pointer"},children:"Retry"})]}):t?e.jsxs("div",{style:{display:"flex",flex:1,alignItems:"center",justifyContent:"center",background:"var(--bg-primary)",color:"var(--text-secondary)",flexDirection:"column",gap:16},children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{style:{fontSize:14},children:"Loading glaze dataset…"}),e.jsx("style",{children:`
          .loading-spinner {
            width: 40px; height: 40px;
            border: 3px solid var(--border-primary);
            border-top-color: var(--accent);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg) } }
        `})]}):e.jsx(ba,{})}const Ma=Object.freeze(Object.defineProperty({__proto__:null,ExplorerPage:Ut,default:Ut},Symbol.toStringTag,{value:"Module"}));export{gr as C,Ma as E,hr as G};
