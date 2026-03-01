const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/plotly-custom-2d-Dif0dPrU.js","assets/find_empties-DDImwCJs.js","assets/vendor-react-D0vdeqNS.js","assets/find_empties-CuCRB34y.css","assets/plotly-custom-3d-C7fpJNb8.js","assets/ComparePanel-CVgh3RLY.js","assets/index-Cx-RWLMS.js","assets/vendor-state-DTYbmM1J.js","assets/vendor-router-DjLFn5nj.js","assets/index-JM3wRy89.css","assets/OxideRadar-CqX15nAb.js","assets/OxideLink-Ckb8-Aqr.js","assets/domain-digitalfire-DfgmtSpv.js","assets/data-digitalfire-CCT-bSzB.js","assets/factory-BujE-kDv.js","assets/umf-DcIxpM70.js","assets/validation-D_egBSYF.js","assets/featureFlags-DeKxyuZW.js","assets/glazeService-tLrMZEgR.js","assets/export-UL09t0Ez.js","assets/usePageTitle-Dfez-EUD.js","assets/BlendLauncher-BNLXdh8s.js","assets/index-B9lzSaMo.js","assets/index-BaEZnZPS.js"])))=>i.map(i=>d[i]);
import{r as o,j as e,R as Mt}from"./vendor-react-D0vdeqNS.js";import{d as Kt,b as Fe,g as Ht,f as Tt,h as rr,_ as Ge,j as Lt,k as ne,u as Gt,l as Yt,C as zt,n as Ot,o as $e,q as ar,s as or,t as nr,v as sr}from"./index-Cx-RWLMS.js";import{c as qt}from"./factory-BujE-kDv.js";import{g as ft}from"./umf-DcIxpM70.js";import{C as ir}from"./validation-D_egBSYF.js";import{f as We}from"./featureFlags-DeKxyuZW.js";import{f as lr}from"./glazeService-tLrMZEgR.js";import{U as Xt,F as Qt,O as cr}from"./OxideRadar-CqX15nAb.js";import{a as dr}from"./OxideLink-Ckb8-Aqr.js";import{exportPlotAsImage as Rt,exportAsPrintPDF as pr,exportSurfaceAsOBJ as xr,exportSurfaceAsSTL as ur,exportScatterAsCSV as mr}from"./export-UL09t0Ez.js";import{u as hr}from"./usePageTitle-Dfez-EUD.js";const gt=["SiO2","Al2O3","B2O3","Na2O","K2O","CaO","MgO","ZnO","SrO","BaO"];function gr(t,i){const[n,l]=o.useState(()=>gt.reduce((S,L)=>({...S,[L]:1}),{})),[d,u]=o.useState(6),[f,p]=o.useState(n),b=o.useRef();o.useEffect(()=>(b.current=setTimeout(()=>p(n),150),()=>clearTimeout(b.current)),[n]);const x=o.useCallback(()=>{const S=gt.reduce((L,k)=>({...L,[k]:1}),{});l(S),p(S)},[]),h=o.useCallback((S,L)=>{l(k=>({...k,[S]:L}))},[]);return{results:o.useMemo(()=>{if(!t)return[];const S=Array.from(i.values());return lr(t,S,{weights:f,count:d,oxides:gt})},[t,i,f,d]),weights:n,count:d,setCount:u,updateWeight:h,resetWeights:x,oxides:gt}}function Jt(t){const{atmospheres:i,surfaces:n,coneMin:l,coneMax:d,hasIngredients:u,hasImages:f,activeCount:p}=Kt(),b=Fe(x=>x.glazes);return o.useMemo(()=>p===0?t:t.filter(x=>{const h=b.get(x.id);if(i.size>0){const g=(h==null?void 0:h.atmosphere)??"unknown";if(!i.has(g))return!1}return!(n.size>0&&!n.has(x.surfaceType)||l!==null&&x.cone!==null&&x.cone<l||d!==null&&x.cone!==null&&x.cone>d||u&&h&&(!h.ingredients||h.ingredients.length===0)||f&&h&&(!h.images||h.images.length===0))}),[t,i,n,l,d,u,f,p,b])}function br({glazeTypeId:t,showParent:i=!1,size:n="md"}){if(t==null)return e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:5,padding:n==="sm"?"1px 6px":"2px 8px",borderRadius:10,background:"var(--bg-tertiary, #2a2a3a)",fontSize:n==="sm"?10:11,color:"var(--text-muted, #666)"},children:[e.jsx("span",{style:{width:n==="sm"?6:8,height:n==="sm"?6:8,borderRadius:"50%",background:"#555",flexShrink:0}}),"Unclassified"]});const l=Ht(t),d=Tt(t),u=rr(t),f=u&&u.id!==t?u.name:null;return e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:5,padding:n==="sm"?"1px 6px":"2px 8px",borderRadius:10,background:`${d}18`,border:`1px solid ${d}40`,fontSize:n==="sm"?10:11,color:"var(--text-label, #ccc)",lineHeight:1.4},children:[e.jsx("span",{style:{width:n==="sm"?6:8,height:n==="sm"?6:8,borderRadius:"50%",background:d,flexShrink:0}}),i&&f&&e.jsxs("span",{style:{color:"var(--text-muted, #666)"},children:[f," ›"]}),l]})}const Ft=[{cone:-6,label:"06",color:"#6366f1"},{cone:-5,label:"05",color:"#818cf8"},{cone:-4,label:"04",color:"#3b82f6"},{cone:-3,label:"03",color:"#06b6d4"},{cone:-2,label:"02",color:"#14b8a6"},{cone:-1,label:"01",color:"#10b981"},{cone:0,label:"0",color:"#22c55e"},{cone:1,label:"1",color:"#84cc16"},{cone:2,label:"2",color:"#a3e635"},{cone:3,label:"3",color:"#eab308"},{cone:4,label:"4",color:"#facc15"},{cone:5,label:"5",color:"#f59e0b"},{cone:6,label:"6",color:"#f97316"},{cone:7,label:"7",color:"#ef4444"},{cone:8,label:"8",color:"#dc2626"},{cone:9,label:"9",color:"#e11d48"},{cone:10,label:"10",color:"#be185d"},{cone:11,label:"11",color:"#a855f7"},{cone:12,label:"12",color:"#7c3aed"}];function At(t){if(typeof t=="number")return t;const i=String(t).trim().toLowerCase();return/^0\d$/.test(i)?-parseInt(i[1]):parseInt(i)||0}function fr({coneRange:t,width:i=220,height:n=20}){const l=At(t[0]),d=At(t[1]),u=Math.min(l,d),f=Math.max(l,d),p=Ft.length,b=i/p,x=10,h=x+12;return e.jsx("svg",{width:i,height:n,viewBox:`0 0 ${i} ${n}`,style:{display:"block"},"aria-label":`Firing range: cone ${t[0]} to ${t[1]}`,children:Ft.map((g,S)=>{const L=g.cone>=u&&g.cone<=f;return e.jsxs("g",{children:[e.jsx("rect",{x:S*b,y:0,width:b,height:x,fill:L?g.color:"var(--bg-tertiary, #2a2a3a)",opacity:L?.9:.3,rx:S===0||S===p-1?3:0,children:e.jsxs("title",{children:["Cone ",g.label]})}),(g.cone===u||g.cone===f||g.cone===6||g.cone===0&&!L)&&e.jsx("text",{x:S*b+b/2,y:h,textAnchor:"middle",fill:L?"var(--text-label, #ccc)":"var(--text-muted, #555)",fontSize:8,fontFamily:"system-ui, sans-serif",fontWeight:L?600:400,children:g.label})]},g.cone)})})}const Pt=["#3b82f6","#f59e0b","#22c55e","#ef4444","#8b5cf6","#06b6d4","#f97316","#14b8a6","#e11d48","#a3e635","#6366f1","#eab308"];function yr({ingredients:t,width:i=220,barHeight:n=18,gap:l=3}){const d=o.useMemo(()=>[...t.filter(h=>h.amount>0)].sort((h,g)=>g.amount-h.amount),[t]);if(d.length===0)return null;const u=d.reduce((x,h)=>x+h.amount,0),f=90,p=i-f-35,b=d.length*(n+l)-l;return e.jsx("svg",{width:i,height:b,viewBox:`0 0 ${i} ${b}`,style:{display:"block"},"aria-label":"Recipe ingredient proportions",children:d.map((x,h)=>{const g=h*(n+l),S=x.amount/u*100,L=Math.max(S/100*p,2),k=Pt[h%Pt.length];return e.jsxs("g",{children:[e.jsx("text",{x:f-4,y:g+n/2+1,textAnchor:"end",dominantBaseline:"central",fill:"var(--text-label, #aaa)",fontSize:10,fontFamily:"system-ui, sans-serif",children:x.material.length>14?x.material.slice(0,13)+"…":x.material}),e.jsx("rect",{x:f,y:g,width:p,height:n,fill:"var(--bg-tertiary, #2a2a3a)",rx:3}),e.jsx("rect",{x:f,y:g,width:L,height:n,fill:k,opacity:.8,rx:3,children:e.jsxs("title",{children:[x.material,": ",x.amount.toFixed(1)," (",S.toFixed(1),"%)"]})}),e.jsxs("text",{x:f+p+4,y:g+n/2+1,dominantBaseline:"central",fill:"var(--text-muted, #888)",fontSize:9,fontFamily:"'SF Mono', monospace",children:[S.toFixed(0),"%"]})]},`${x.material}-${h}`)})})}const Et=.5,vr=7.2,kr=0,$t=1;function jr({x:t,y:i,comparePoint:n,size:l=80}){const d=b=>(b-Et)/(vr-Et)*l,u=b=>($t-b)/($t-kr)*l,f=d(t),p=u(i);return e.jsxs("svg",{width:l,height:l,viewBox:`0 0 ${l} ${l}`,style:{display:"block",border:"1px solid var(--border-primary, #333)",borderRadius:4,background:"var(--bg-tertiary, #1e1e2e)"},"aria-label":`Stull position: SiO₂=${t.toFixed(2)}, Al₂O₃=${i.toFixed(2)}`,children:[e.jsx("rect",{x:0,y:0,width:d(3.2),height:u(.4),fill:"rgba(139,92,246,0.1)",rx:2}),e.jsx("rect",{x:d(3.2),y:u(.4),width:l-d(3.2),height:l-u(.4),fill:"rgba(34,197,94,0.08)",rx:2}),e.jsx("line",{x1:d(1.5),y1:u(.85),x2:d(6),y2:u(.15),stroke:"var(--border-primary, #444)",strokeWidth:.8,strokeDasharray:"3,2"}),e.jsx("text",{x:l/2,y:l-2,textAnchor:"middle",fill:"var(--text-muted, #555)",fontSize:7,fontFamily:"system-ui",children:"SiO₂"}),e.jsx("text",{x:3,y:l/2,textAnchor:"start",dominantBaseline:"central",fill:"var(--text-muted, #555)",fontSize:7,fontFamily:"system-ui",transform:`rotate(-90, 6, ${l/2})`,children:"Al₂O₃"}),e.jsx("text",{x:d(2),y:u(.7),textAnchor:"middle",fill:"var(--text-muted, #444)",fontSize:7,children:"M"}),e.jsx("text",{x:d(4.5),y:u(.2),textAnchor:"middle",fill:"var(--text-muted, #444)",fontSize:7,children:"G"}),n&&e.jsx("circle",{cx:d(n.x),cy:u(n.y),r:3,fill:"none",stroke:"#ef4444",strokeWidth:1.5}),e.jsx("circle",{cx:f,cy:p,r:4,fill:"#3b82f6",stroke:"white",strokeWidth:1.5,children:e.jsxs("title",{children:["SiO₂: ",t.toFixed(2),", Al₂O₃: ",i.toFixed(2)]})})]})}function wr(){const t=Fe(d=>d.glazes),[i,n]=o.useState(!1);return o.useMemo(()=>{const d=Array.from(t.values()),u=new Map,f=new Map;for(const x of d){u.set(x.surfaceType,(u.get(x.surfaceType)??0)+1);const h=x.glazeTypeId??null;f.set(h,(f.get(h)??0)+1)}const p=[...f.entries()].filter(([x])=>x!==null).sort((x,h)=>h[1]-x[1]).slice(0,8),b=f.get(null)??0;return{total:d.length,bySurface:u,topTypes:p,unclassified:b}},[t]).total===0,null}const Sr={surface:"Viridis",source:"Set1",flux_ratio:"Portland",confidence:"Greys",boron:"YlOrRd"},Cr=[[0,"#818cf8"],[.5/19,"#818cf8"],[.5/19,"#6366f1"],[1.5/19,"#6366f1"],[1.5/19,"#3b82f6"],[2.5/19,"#3b82f6"],[2.5/19,"#06b6d4"],[3.5/19,"#06b6d4"],[3.5/19,"#14b8a6"],[4.5/19,"#14b8a6"],[4.5/19,"#10b981"],[5.5/19,"#10b981"],[5.5/19,"#22c55e"],[6.5/19,"#22c55e"],[6.5/19,"#84cc16"],[7.5/19,"#84cc16"],[7.5/19,"#a3e635"],[8.5/19,"#a3e635"],[8.5/19,"#d9f99d"],[9.5/19,"#d9f99d"],[9.5/19,"#facc15"],[10.5/19,"#facc15"],[10.5/19,"#f59e0b"],[11.5/19,"#f59e0b"],[11.5/19,"#f97316"],[12.5/19,"#f97316"],[12.5/19,"#ef4444"],[13.5/19,"#ef4444"],[13.5/19,"#dc2626"],[14.5/19,"#dc2626"],[14.5/19,"#e11d48"],[15.5/19,"#e11d48"],[15.5/19,"#a855f7"],[16.5/19,"#a855f7"],[16.5/19,"#7c3aed"],[17.5/19,"#7c3aed"],[17.5/19,"#6d28d9"],[18.5/19,"#6d28d9"],[18.5/19,"#581c87"],[1,"#581c87"]],zr={unfused:{path:"M 0.5,0.39 L 2.8,1.0 L 0.5,1.0 Z",color:"rgba(120, 120, 120, 0.12)",label:"Unfused"},matte:{path:"M 0.5,0.05 L 0.5,0.39 L 2.8,1.0 L 4.0,1.0 Z",color:"rgba(76, 175, 80, 0.12)",label:"Matte"},semi_matte:{path:"M 1.2,0.242 L 4.0,1.0 L 5.0,1.0 Z",color:"rgba(139, 195, 74, 0.10)",label:"Semi-Matte"},bright_gloss:{path:"M 0.5,0.0 L 0.5,1.0 L 1.67,1.0 L 2.1,0.5 L 2.38,0.25 L 2.7,0.23 L 3.3,0.25 L 3.9,0.28 L 4.2,0.29 L 5.4,0.49 L 7.2,0.615 L 7.2,0 Z",color:"rgba(33, 150, 243, 0.08)",label:"Bright Gloss"},underfired:{path:"M 1.75,0.0 L 7.2,0.65 L 7.2,0.0 Z",color:"rgba(158, 158, 158, 0.12)",label:"Underfired"},crazed:{path:"M 0.5,0.0 L 0.5,0.05 L 1.2,0.242 L 1.75,0.0 Z",color:"rgba(244, 67, 54, 0.12)",label:"Crazed"}},Dt={path:"M 1.8,0.2 L 4.2,0.6 L 6.0,0.8 L 7.2,0.92",color:"rgba(255, 255, 255, 0.35)"},Or={1280:{path:"M 1.8 0.4 L 1.8 0.85 L 6.6 0.85 L 6.6 0.4 Z",color:"rgba(255, 255, 255, 0.4)",label:"1280°C"},1270:{path:"M 1.8 0.68 L 2.0 0.69 L 2.05 0.8 L 2.12 0.85 L 6.6 0.85 L 6.6 0.455 L 6.35 0.43 L 5.8 0.4 L 1.8 0.4 Z",color:"rgba(255, 255, 204, 0.4)",label:"1270°C"},1260:{path:"M 1.8 0.642 L 2.05 0.66 L 2.18 0.8 L 2.28 0.85 L 5.55 0.85 L 6.1 0.83 L 6.6 0.83 L 6.6 0.483 L 6.2 0.46 L 5.75 0.45 L 5.4 0.422 L 5.05 0.4 L 1.8 0.4 Z",color:"rgba(255, 255, 136, 0.4)",label:"1260°C"},1250:{path:"M 1.8 0.63 L 2.25 0.66 L 2.4 0.76 L 2.35 0.81 L 2.43 0.85 L 4.3 0.85 L 4.6 0.84 L 5.0 0.86 L 5.55 0.82 L 6.1 0.8 L 6.6 0.79 L 6.6 0.58 L 6.2 0.55 L 5.65 0.49 L 5.4 0.48 L 5.05 0.47 L 4.35 0.4 L 1.8 0.4 Z",color:"rgba(255, 255, 34, 0.4)",label:"1250°C"},1240:{path:"M 2.7 0.85 L 2.65 0.8 L 2.71 0.765 L 2.6 0.72 L 2.45 0.655 L 2.0 0.618 L 1.8 0.58 L 1.8 0.4 L 3.55 0.424 L 4.2 0.438 L 4.6 0.475 L 4.9 0.505 L 4.96 0.545 L 5.4 0.572 L 6.0 0.62 L 6.2 0.67 L 6.1 0.72 L 5.55 0.77 L 5.05 0.77 L 4.8 0.79 L 4.42 0.821 L 4.1 0.84 L 3.9 0.85 Z",color:"rgba(255, 221, 0, 0.4)",label:"1240°C"}};function Nr({xAxis:t="SiO2",yAxis:i="Al2O3",colorBy:n="cone",zoom:l=1,width:d,height:u,highlightPointIds:f,highlightCircle:p,densityMap:b,showLimits:x=!1,limitCone:h=null}){const[g,S]=o.useState(null),[L,k]=o.useState(!1),[v,H]=o.useState(!1),[le,P]=o.useState(0);o.useEffect(()=>{let c=!0;k(!1),H(!1);const y=setTimeout(()=>{c&&H(!0)},12e3);return Ge(()=>import("./plotly-custom-2d-Dif0dPrU.js"),__vite__mapDeps([0,1,2,3])).then(X=>{if(!c)return;clearTimeout(y);const me=qt(X.default??X);S(()=>me)}).catch(()=>{c&&(clearTimeout(y),k(!0))}),()=>{c=!1,clearTimeout(y)}},[le]);const K=Fe(c=>c.getPlotPoints),ee=Lt(c=>c.currentSetId),G=ne(c=>c.selectedGlaze),W=ne(c=>c.setSelectedGlaze),ie=ne(c=>c.setHoveredPoint),te=ne(c=>c.selectedForBlend),C=ne(c=>c.addToBlendSelection),Z=ne(c=>c.setSidebarTab),E=Gt(c=>c.blendResults),T=Yt(c=>c.theme),M=o.useMemo(()=>{const c=T==="dark";return{paper:c?"#1a1a1a":"#ffffff",plot:c?"#1e1e1e":"#f8f8f8",grid:c?"#333":"#ddd",zeroline:c?"#444":"#ccc",axisTitle:c?"#aaa":"#555",tick:c?"#888":"#666",font:c?"#ccc":"#333",regionLabel:c?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.18)",regionLabelStrong:c?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.22)",qLabel:c?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.3)",tempLabel:c?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.4)",coneBorder:c?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.07)",limitFill:c?"rgba(59,130,246,0.12)":"rgba(59,130,246,0.08)",limitBorder:c?"rgba(59,130,246,0.5)":"rgba(59,130,246,0.4)",limitLabel:c?"rgba(59,130,246,0.7)":"rgba(59,130,246,0.6)",limitDimBorder:c?"rgba(150,150,150,0.15)":"rgba(100,100,100,0.12)"}},[T]),$=o.useMemo(()=>{if(!x)return{shapes:[],annotations:[]};const c=re=>({SiO2:"SiO2",Al2O3:"Al2O3",B2O3:"B2O3",Na2O:"KNaO",K2O:"KNaO",CaO:"CaO",MgO:"MgO",ZnO:"ZnO",BaO:"BaO"})[re]??null,y=c(t),X=c(i);if(!y||!X)return{shapes:[],annotations:[]};const me=[],B=[],D=h||null;for(const re of ir){const fe=re[y],Ce=re[X];if(!fe||!Ce)continue;const he=D===re.cone;me.push({type:"rect",x0:fe.min,x1:fe.max,y0:Ce.min,y1:Ce.max,fillcolor:he?M.limitFill:"transparent",line:{color:he?M.limitBorder:M.limitDimBorder,width:he?2:1,dash:he?"solid":"dot"},layer:"below"}),B.push({x:fe.max,y:Ce.max,text:`▲${re.cone}`,showarrow:!1,font:{color:he?M.limitBorder:M.limitDimBorder,size:he?11:9},xanchor:"right",yanchor:"bottom"})}return{shapes:me,annotations:B}},[x,h,t,i,M]),ue=o.useMemo(()=>K(ee),[K,ee]),m=Jt(ue),A=o.useMemo(()=>{if(E.length===0)return null;const c=E.map(me=>ft(me.umf,t)),y=E.map(me=>ft(me.umf,i)),X=E.map((me,B)=>{var D;return((D=me.recipe)==null?void 0:D.name)||`Blend ${B+1}`});return{type:"scattergl",mode:"markers",x:c,y,text:X,name:"Blend Results",marker:{size:8,symbol:"diamond",color:"#ff9800",opacity:.9,line:{width:1,color:"#fff"}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>${t}: %{x:.2f}<br>${i}: %{y:.2f}<extra>Blend</extra>`}},[E,t,i]),w=o.useMemo(()=>{if(!p)return null;const{x:c,y,r:X}=p;return{type:"circle",xref:"x",yref:"y",x0:c-X,y0:y-X,x1:c+X,y1:y+X,fillcolor:"rgba(244, 67, 54, 0.08)",line:{color:"rgba(244, 67, 54, 0.5)",width:2,dash:"dash"},layer:"above"}},[p]),O=o.useMemo(()=>m.filter(c=>c.x!=null&&c.y!=null&&!isNaN(c.x)&&!isNaN(c.y)&&c.x>0&&c.y>0&&(c.cone==null||c.cone>=-6&&c.cone<=13)),[m]),V=o.useMemo(()=>{if(!f||f.length===0)return null;const c=O.filter(y=>f.includes(y.id));return c.length===0?null:{type:"scattergl",mode:"markers",x:c.map(y=>y.x),y:c.map(y=>y.y),text:c.map(y=>y.name),name:"Highlighted",marker:{size:10,symbol:"circle",color:"rgba(255, 235, 59, 0.8)",line:{width:2,color:"#fff"}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>${t}: %{x:.2f}<br>${i}: %{y:.2f}<extra>Cluster</extra>`}},[f,O,t,i]),q=o.useMemo(()=>{if(!b||b.grid.length===0)return null;const{grid:c,bounds:y,resolution:X}=b,me=Array.from({length:X},(D,re)=>y.xMin+re/(X-1)*(y.xMax-y.xMin)),B=Array.from({length:c.length},(D,re)=>y.yMin+re/(c.length-1)*(y.yMax-y.yMin));return{type:"contour",x:me,y:B,z:c,name:"Density",showscale:!1,contours:{coloring:"heatmap"},colorscale:[[0,"rgba(0,0,0,0)"],[.2,"rgba(33,150,243,0.08)"],[.4,"rgba(33,150,243,0.15)"],[.6,"rgba(255,235,59,0.2)"],[.8,"rgba(255,152,0,0.25)"],[1,"rgba(244,67,54,0.3)"]],hoverinfo:"skip"}},[b]),ce=o.useMemo(()=>n==="glaze_type"?O.map(c=>Tt(c.glazeTypeId)):O.map(c=>{switch(n){case"cone":return c.cone??6;case"surface":return Mr(c.surfaceType);case"source":return Tr(c.source);case"flux_ratio":return c.fluxRatio;case"confidence":return Lr(c.confidence);case"boron":return c.boron;default:return 0}}),[O,n]),we=o.useMemo(()=>({type:"scattergl",mode:"markers",x:O.map(c=>c.x),y:O.map(c=>c.y),customdata:O.map(c=>c.id),text:O.map(c=>c.name),marker:{size:5,opacity:.7,color:ce,...n==="glaze_type"?{}:{colorscale:n==="cone"?Cr:Sr[n]||"Viridis",reversescale:!1,cmin:n==="cone"?-6:void 0,cmax:n==="cone"?13:void 0,colorbar:{title:_r(n),thickness:15,len:.7,tickvals:n==="cone"?Ot:void 0,ticktext:n==="cone"?zt:void 0}},line:{width:O.map(c=>(G==null?void 0:G.id)===c.id?2:te.some(y=>y.id===c.id)?1.5:0),color:O.map(c=>(G==null?void 0:G.id)===c.id?"white":te.some(y=>y.id===c.id)?"orange":"transparent")}},hoverinfo:"text",hovertemplate:O.map(c=>{const y=[`<b>${c.name}</b>`,`${t}: ${c.x.toFixed(2)}`,`${i}: ${c.y.toFixed(2)}`,`Cone: ${c.cone!=null?$e(c.cone):"unknown"}`];return n==="glaze_type"&&y.push(Ht(c.glazeTypeId)),y.join("<br>")+"<extra></extra>"})}),[O,ce,n,t,i,G,te]),Se=3.85,ve=.5,Ae=3.35/l,Oe=.5/l,De=o.useMemo(()=>({xaxis:{title:{text:t,font:{color:M.axisTitle}},range:[Se-Ae,Se+Ae],gridcolor:M.grid,zerolinecolor:M.zeroline,tickfont:{color:M.tick}},yaxis:{title:{text:i,font:{color:M.axisTitle}},range:[ve-Oe,ve+Oe],gridcolor:M.grid,zerolinecolor:M.zeroline,tickfont:{color:M.tick}},paper_bgcolor:M.paper,plot_bgcolor:M.plot,font:{color:M.font},dragmode:"pan",hovermode:"closest",margin:{l:60,r:30,t:30,b:60},annotations:[{x:1.5,y:.75,text:"UNFUSED",showarrow:!1,font:{color:M.regionLabel,size:11},textangle:-35},{x:2.3,y:.55,text:"MATTE",showarrow:!1,font:{color:M.regionLabelStrong,size:12},textangle:-35},{x:3.4,y:.65,text:"SEMI-MATTE",showarrow:!1,font:{color:M.regionLabel,size:10},textangle:-30},{x:4.5,y:.25,text:"BRIGHT GLOSS",showarrow:!1,font:{color:M.regionLabel,size:11}},{x:5,y:.1,text:"UNDERFIRED",showarrow:!1,font:{color:M.regionLabelStrong,size:10},textangle:-15},{x:1.2,y:.08,text:"CRAZED",showarrow:!1,font:{color:M.regionLabelStrong,size:10}},{x:6.8,y:.88,text:"Q",showarrow:!1,font:{color:M.qLabel,size:11,family:"serif"}},...We.tempContours?[{x:6.4,y:.42,text:"1280°C",showarrow:!1,font:{color:M.tempLabel,size:9}},{x:6.4,y:.48,text:"1270°C",showarrow:!1,font:{color:"rgba(255,255,204,0.6)",size:9}},{x:6.4,y:.52,text:"1260°C",showarrow:!1,font:{color:"rgba(255,255,136,0.7)",size:9}},{x:6.4,y:.6,text:"1250°C",showarrow:!1,font:{color:"rgba(255,255,34,0.7)",size:9}},{x:5.9,y:.68,text:"1240°C",showarrow:!1,font:{color:"rgba(255,221,0,0.8)",size:9}}]:[],...$.annotations],shapes:[...Object.values(zr).map(c=>({type:"path",path:c.path,fillcolor:c.color,line:{width:0},layer:"below"})),{type:"path",path:Dt.path,fillcolor:"transparent",line:{color:Dt.color,width:1.5,dash:"dot"},layer:"below"},...We.tempContours?Object.values(Or).map(c=>({type:"path",path:c.path,fillcolor:"transparent",line:{color:c.color,width:1},layer:"below"})):[],...$.shapes,...w?[w]:[]]}),[t,i,Ae,Oe,w,M,$]),Pe=o.useCallback(c=>{var X;const y=(X=c.points)==null?void 0:X[0];if(y!=null&&y.customdata){const B=Fe.getState().glazes.get(y.customdata);if(B){const D=c.event;D!=null&&D.shiftKey?(C(B),Z("blend")):W(B)}}},[W,C,Z]),Le=o.useCallback(c=>{var X;const y=(X=c.points)==null?void 0:X[0];y&&ie({id:y.customdata,name:y.text,source:"unknown",x:y.x,y:y.y,cone:null,surfaceType:"unknown",fluxRatio:0,boron:0,confidence:"inferred",glazeTypeId:null})},[ie]),Ne={displayModeBar:!0,modeBarButtonsToRemove:["select2d","lasso2d","autoScale2d"],scrollZoom:!0,doubleClick:"reset"};return g?e.jsx(g,{data:[...q?[q]:[],we,...A?[A]:[],...V?[V]:[]],layout:De,config:Ne,onClick:Pe,onHover:Le,useResizeHandler:!0,style:{width:d||"100%",height:u||"100%"}}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,width:d||"100%",height:u||"100%",color:"#777",fontSize:13,background:"var(--bg-secondary, #1a1a1a)",borderRadius:8,...L?{}:{animation:"pulse 1.5s ease-in-out infinite"}},children:[e.jsx("style",{children:"@keyframes pulse { 0%,100% { opacity: 0.6 } 50% { opacity: 1 } }"}),L?e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{fontSize:22},children:"⚠"}),e.jsx("span",{children:"Chart engine failed to load"}),e.jsx("button",{onClick:()=>P(c=>c+1),style:{marginTop:4,padding:"6px 16px",borderRadius:6,border:"1px solid #555",background:"var(--bg-tertiary, #252525)",color:"#ccc",cursor:"pointer",fontSize:13},children:"Tap to retry"})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Loading chart engine…"}),v&&e.jsx("span",{style:{fontSize:11,color:"#666"},children:"Slow connection — still trying…"})]})]})}function Mr(t){return{matte:1,satin:2,gloss:3,crystalline:4,crawl:5,unknown:0}[t]??0}function Tr(t){return{glazy:1,digitalfire:2,user:3,calculated:4}[t]??0}function Lr(t){return{unknown:0,assumed:1,inferred:2,declared:3,verified:4}[t]??0}function _r(t){return{cone:"Cone",surface:"Surface",source:"Source",flux_ratio:"R2O:RO",confidence:"Confidence",boron:"B2O3"}[t]||t}const Rr="https://iupac.org/what-we-do/periodic-table-of-elements/",Fr="https://www.ciaaw.org/atomic-weights.htm",Ar=[{label:"Fluxes (R₂O)",oxides:["Li2O","Na2O","K2O"]},{label:"Fluxes (RO)",oxides:["MgO","CaO","SrO","BaO","ZnO","PbO"]},{label:"Stabilizers (R₂O₃)",oxides:["Al2O3","B2O3","Fe2O3"]},{label:"Glass Formers (RO₂)",oxides:["SiO2","TiO2","ZrO2","SnO2"]},{label:"Colorants / Other",oxides:["MnO","MnO2","NiO","CuO","Cu2O","CoO","Cr2O3","P2O5","F"]}],Pr=["₀","₁","₂","₃","₄","₅","₆","₇","₈","₉"];function Er(t){return t.replace(/\d/g,i=>Pr[parseInt(i)])}function $r(){const{currentSetId:t,availableSets:i,setMolarWeightSet:n}=Lt(),[l,d]=o.useState(!1),u=o.useMemo(()=>i.find(p=>p.id===t),[i,t]),f=o.useMemo(()=>ar(t),[t]);return e.jsxs("div",{className:"molar-set-picker",children:[e.jsxs("div",{className:"molar-header",children:[e.jsx("h3",{children:"Molar Weights"}),e.jsx("button",{className:"molar-info-toggle",onClick:()=>d(!l),title:l?"Hide weight table":"Show all molecular weights",children:l?"▾":"ⓘ"})]}),e.jsx("div",{className:"molar-set-buttons",children:i.map(p=>e.jsxs("button",{className:`molar-set-button ${t===p.id?"active":""}`,onClick:()=>n(p.id),title:p.notes,children:[e.jsx("span",{className:"molar-set-name",children:p.name}),p.year&&e.jsx("span",{className:"molar-set-year",children:p.year})]},p.id))}),e.jsxs("div",{className:"molar-source-info",children:[e.jsxs("p",{className:"molar-source-text",children:["Default: ",e.jsx("strong",{children:"IUPAC 2023"})," Standard Atomic Weights with 2024 revisions (Gd, Lu, Zr)."]}),e.jsxs("div",{className:"molar-source-links",children:[e.jsx("a",{href:Rr,target:"_blank",rel:"noopener noreferrer",children:"IUPAC Periodic Table"}),e.jsx("span",{className:"molar-link-sep",children:"·"}),e.jsx("a",{href:Fr,target:"_blank",rel:"noopener noreferrer",children:"CIAAW Atomic Weights"})]})]}),l&&e.jsxs("div",{className:"molar-weight-table",children:[e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Oxide"}),e.jsx("th",{children:"g/mol"})]})}),e.jsx("tbody",{children:Ar.map(p=>e.jsxs(Mt.Fragment,{children:[e.jsx("tr",{className:"molar-group-header",children:e.jsx("td",{colSpan:2,children:p.label})}),p.oxides.map(b=>{var x;return e.jsxs("tr",{children:[e.jsx("td",{className:"molar-oxide-name",children:Er(b)}),e.jsx("td",{className:"molar-oxide-value",children:((x=f[b])==null?void 0:x.toFixed(4))??"—"})]},b)})]},p.label))})]}),e.jsxs("p",{className:"molar-table-note",children:["Active set: ",(u==null?void 0:u.name)??t,(u==null?void 0:u.notes)&&e.jsxs(e.Fragment,{children:[e.jsx("br",{}),u.notes]})]})]}),e.jsx("style",{children:`
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
      `})]})}function Dr(){const{currentSetId:t,availableSets:i,setAnalysisSet:n}=or(),[l,d]=o.useState(!1),u=i.find(p=>p.id===t),f=i.filter(p=>p.status==="populated"||p.id==="app_default");return f.length<=1?null:e.jsxs("div",{className:"analysis-set-picker",children:[e.jsxs("div",{className:"analysis-header",children:[e.jsx("h3",{children:"Material Analyses"}),e.jsx("button",{className:"analysis-info-toggle",onClick:()=>d(!l),title:l?"Hide details":"Show source details",children:l?"▾":"ⓘ"})]}),e.jsx("div",{className:"analysis-set-buttons",children:f.map(p=>e.jsxs("button",{className:`analysis-set-button ${t===p.id?"active":""}`,onClick:()=>n(p.id),title:p.notes,children:[e.jsx("span",{className:"analysis-set-name",children:p.name}),e.jsxs("span",{className:"analysis-set-meta",children:[p.year&&e.jsx("span",{className:"analysis-set-year",children:p.year}),p.materialCount>0&&e.jsxs("span",{className:"analysis-set-count",children:[p.materialCount," mat",p.materialCount!==1?"s":""]})]})]},p.id))}),e.jsxs("div",{className:"analysis-source-info",children:[e.jsx("p",{className:"analysis-source-text",children:(u==null?void 0:u.id)==="app_default"?e.jsxs(e.Fragment,{children:["Default: ",e.jsx("strong",{children:"Stull Atlas built-in"})," analyses from"," ",e.jsx("a",{href:"https://digitalfire.com",target:"_blank",rel:"noopener noreferrer",children:"Digitalfire"}),", verified Feb 2026."]}):e.jsxs(e.Fragment,{children:["Active: ",e.jsx("strong",{children:u==null?void 0:u.name}),(u==null?void 0:u.authority)&&e.jsxs(e.Fragment,{children:[" — ",u.authority]})]})}),u&&u.materialCount>0&&u.id!=="app_default"&&e.jsxs("p",{className:"analysis-override-note",children:[u.materialCount," material",u.materialCount!==1?"s":""," overridden — all others use default values."]})]}),l&&e.jsx("div",{className:"analysis-details",children:f.map(p=>e.jsxs("div",{className:"analysis-detail-row",children:[e.jsxs("div",{className:"analysis-detail-header",children:[e.jsx("strong",{children:p.name}),e.jsx("span",{className:"analysis-detail-year",children:p.year})]}),e.jsxs("div",{className:"analysis-detail-meta",children:[p.source,p.authority&&e.jsxs(e.Fragment,{children:[" — ",p.authority]})]}),p.notes&&e.jsx("div",{className:"analysis-detail-notes",children:p.notes})]},p.id))}),e.jsx("p",{className:"analysis-thanks",children:"Thanks, Tony"}),e.jsx("style",{children:`
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
      `})]})}function er(t,i){return Math.exp(-t/(2*i))}function Br(t,i,n){const l=t.length;if(l<4)return .3;const d=i[1]-i[0]||1,u=n[1]-n[0]||1,f=t.map(k=>(k.x-i[0])/d),p=t.map(k=>(k.y-n[0])/u),b=f.reduce((k,v)=>k+v,0)/l,x=p.reduce((k,v)=>k+v,0)/l,h=Math.sqrt(f.reduce((k,v)=>k+(v-b)**2,0)/l)||.1,g=Math.sqrt(p.reduce((k,v)=>k+(v-x)**2,0)/l)||.1,L=1.4*((h+g)/2)*Math.pow(l,-.2);return Math.max(L,.03)}function Ir(t,i,n,l,d){let u=0,f=0;for(const p of n){const b=t-p.nx,x=i-p.ny,h=b*b+x*x,g=er(h,l)*p.robustWeight;u+=g*p.z,f+=g}return f>=d?u/f:null}function Zr(t,i,n){const l=i[t];let d=0,u=0;for(let f=0;f<i.length;f++){if(f===t)continue;const p=i[f],b=l.nx-p.nx,x=l.ny-p.ny,h=b*b+x*x,g=er(h,n)*p.robustWeight;d+=g*p.z,u+=g}return u>.01?d/u:null}function Ur(t,i){const{xRange:n,yRange:l,resolution:d=35,minWeight:u=.5}=i,f=i.bandwidth??Br(t,n,l),p=n[1]-n[0],b=l[1]-l[0],x=Array.from({length:d},(C,Z)=>n[0]+Z/(d-1)*p),h=Array.from({length:d},(C,Z)=>l[0]+Z/(d-1)*b),g=1/(p||1),S=1/(b||1),L=f*f,k=t.filter(C=>isFinite(C.z)&&!isNaN(C.z)).map(C=>({nx:(C.x-n[0])*g,ny:(C.y-l[0])*S,z:C.z,robustWeight:1}));if(k.length===0)return{xCoords:x,yCoords:h,z:h.map(()=>x.map(()=>null)),stats:{validCells:0,totalCells:d*d,zMin:0,zMax:0,zMean:0}};const v=[];for(let C=0;C<k.length;C++){const Z=Zr(C,k,L);v.push(Z!=null?Math.abs(k[C].z-Z):0)}const H=v.filter(C=>C>0).sort((C,Z)=>C-Z),le=H.length>0?H[Math.floor(H.length/2)]*1.4826:1,P=3*Math.max(le,1e-6);let K=0;for(let C=0;C<k.length;C++)v[C]>P&&(k[C].robustWeight=P/v[C],K++);const ee=[];let G=0,W=1/0,ie=-1/0,te=0;for(let C=0;C<d;C++){const Z=[],E=(h[C]-l[0])*S;for(let T=0;T<d;T++){const M=(x[T]-n[0])*g,$=Ir(M,E,k,L,u);$!=null?(Z.push($),G++,$<W&&(W=$),$>ie&&(ie=$),te+=$):Z.push(null)}ee.push(Z)}return K>0&&console.debug(`[surfaceFit] Robust fit downweighted ${K} of ${k.length} points (MAD=${le.toFixed(4)}, threshold=${P.toFixed(4)})`),{xCoords:x,yCoords:h,z:ee,stats:{validCells:G,totalCells:d*d,zMin:G>0?W:0,zMax:G>0?ie:0,zMean:G>0?te/G:0}}}function Wr(t,i){return Math.exp(-t/(2*i))}function Vr(t,i,n){const l=t.length;if(l<4)return .3;const d=i[1]-i[0]||1,u=n[1]-n[0]||1,f=t.map(k=>(k.x-i[0])/d),p=t.map(k=>(k.y-n[0])/u),b=f.reduce((k,v)=>k+v,0)/l,x=p.reduce((k,v)=>k+v,0)/l,h=Math.sqrt(f.reduce((k,v)=>k+(v-b)**2,0)/l)||.1,g=Math.sqrt(p.reduce((k,v)=>k+(v-x)**2,0)/l)||.1,L=1.6*((h+g)/2)*Math.pow(l,-.2);return Math.max(L,.03)}const Kr=["gloss","matte","satin","crystalline","crawl"];function Hr(t,i){const{xRange:n,yRange:l,resolution:d=30,minWeight:u=.3,minConfidence:f=.3}=i,p=i.bandwidth??Vr(t,n,l),b=n[1]-n[0],x=l[1]-l[0],h=Array.from({length:d},(K,ee)=>n[0]+ee/(d-1)*b),g=Array.from({length:d},(K,ee)=>l[0]+ee/(d-1)*x),S=1/(b||1),L=1/(x||1),k=p*p,v=t.filter(K=>K.surfaceType&&K.surfaceType!=="unknown").map(K=>({nx:(K.x-n[0])*S,ny:(K.y-l[0])*L,type:K.surfaceType}));if(v.length===0)return{xCoords:h,yCoords:g,cells:g.map(()=>h.map(()=>null)),stats:{validCells:0,totalCells:d*d,typeCounts:{}}};const H=[];let le=0;const P={};for(let K=0;K<d;K++){const ee=[],G=(g[K]-l[0])*L;for(let W=0;W<d;W++){const ie=(h[W]-n[0])*S,te={};let C=0;for(const Z of v){const E=ie-Z.nx,T=G-Z.ny,M=E*E+T*T,$=Wr(M,k);te[Z.type]=(te[Z.type]??0)+$,C+=$}if(C>=u){let Z="unknown",E=0;for(const M of Kr){const $=te[M]??0;$>E&&(E=$,Z=M)}const T=C>0?E/C:0;T>=f?(ee.push({type:Z,confidence:T,votes:te}),le++,P[Z]=(P[Z]??0)+1):ee.push(null)}else ee.push(null)}H.push(ee)}return{xCoords:h,yCoords:g,cells:H,stats:{validCells:le,totalCells:d*d,typeCounts:P}}}const Gr={gloss:"#3b82f6",matte:"#22c55e",satin:"#f59e0b",crystalline:"#a855f7",crawl:"#ef4444",unknown:"#6b7280"},Bt=(t,i)=>{const n=Gr[t]??"#6b7280",l=parseInt(n.slice(1,3),16),d=parseInt(n.slice(3,5),16),u=parseInt(n.slice(5,7),16);return`rgba(${l}, ${d}, ${u}, ${i})`},Yr=[["SiO2",2,.48],["Al2O3",3,.6],["B2O3",3,.42],["Na2O",1,1.15],["K2O",1,1.4],["Li2O",1,1],["CaO",1,1],["MgO",1,.78],["BaO",1,1.15],["SrO",1,1.1],["ZnO",1,.92],["PbO",1,1.15],["Fe2O3",3,.75],["TiO2",2,.61],["ZrO2",2,.55],["MnO",1,.95],["NiO",1,.9],["CuO",1,.9],["CoO",1,.9],["Cr2O3",3,.65],["P2O5",5,.4]],qr=[["SiO2",1,1.57],["Al2O3",2,.84],["B2O3",2,1.34],["Na2O",2,.19],["K2O",2,.13],["Li2O",2,.23],["CaO",1,.33],["MgO",1,.45],["BaO",1,.24],["SrO",1,.28],["ZnO",1,.4],["PbO",1,.27],["Fe2O3",2,.73],["TiO2",1,1.19]],Re={x:[.4,7.5],y:[0,1.1]};function Nt(t,i,n){var Z;if(i==="cone")return n??6;if(!t)return 0;const l=E=>{var T;return((T=t==null?void 0:t[E])==null?void 0:T.value)??0},d=l("SiO2"),u=l("Al2O3"),f=l("B2O3"),p=l("Na2O"),b=l("K2O"),x=l("Li2O"),h=l("CaO"),g=l("MgO"),S=l("ZnO"),L=l("BaO"),k=l("SrO"),v=l("PbO"),H=l("Fe2O3"),le=l("TiO2"),P=l("MnO"),K=l("NiO"),ee=l("CuO"),G=l("CoO"),W=l("Cr2O3");l("P2O5");const ie=p+b+x,te=h+g+S+L+k+v,C=ie+te;switch(i){case"flux_ratio":return C>0?ie/C:0;case"SiO2_Al2O3_ratio":return u>0?d/u:0;case"total_flux_moles":return((Z=t._meta)==null?void 0:Z.totalFluxMoles)??0;case"thermal_expansion":return p*33.3+b*28.3+x*27+h*16.3+g*4.5+S*7+L*14+k*12+f*-5+u*5+d*3.8;case"nbo_t":{const E=d+2*u;return E>0?Math.max(0,2*(C-u))/E:0}case"optical_basicity":{let E=0,T=0;for(const[M,$,ue]of Yr){const m=l(M);E+=m*$*ue,T+=m*$}return T>0?E/T:0}case"flux_entropy":{const E=[p,b,x,h,g,S,L,k,v].filter($=>$>0),T=E.reduce(($,ue)=>$+ue,0);if(T<=0)return 0;let M=0;for(const $ of E){const ue=$/T;M-=ue*Math.log(ue)}return M}case"cao_mgo_ratio":return h+g>0?h/(h+g):.5;case"combined_alkali":return ie;case"na2o_k2o_ratio":return p+b>0?p/(p+b):.5;case"viscosity_index":return C>0?(d+u)/C:0;case"surface_tension":{let E=0,T=0;for(const[M,$,ue]of qr){const m=l(M);E+=m*$*ue,T+=m*$}return T>0?E/T:0}case"durability":return ie>.001?d/ie:d*100;case"total_colorant":return H+ee+G+P+K+W+le;case"fe_ti_ratio":return H+le>0?H/(H+le):.5;default:return l(i)}}const Xe={x:.5,y:.5,z:.5,cone:0,surface:0},tr=[[0,"#818cf8"],[.5/19,"#818cf8"],[.5/19,"#6366f1"],[1.5/19,"#6366f1"],[1.5/19,"#3b82f6"],[2.5/19,"#3b82f6"],[2.5/19,"#06b6d4"],[3.5/19,"#06b6d4"],[3.5/19,"#14b8a6"],[4.5/19,"#14b8a6"],[4.5/19,"#10b981"],[5.5/19,"#10b981"],[5.5/19,"#22c55e"],[6.5/19,"#22c55e"],[6.5/19,"#84cc16"],[7.5/19,"#84cc16"],[7.5/19,"#a3e635"],[8.5/19,"#a3e635"],[8.5/19,"#d9f99d"],[9.5/19,"#d9f99d"],[9.5/19,"#facc15"],[10.5/19,"#facc15"],[10.5/19,"#f59e0b"],[11.5/19,"#f59e0b"],[11.5/19,"#f97316"],[12.5/19,"#f97316"],[12.5/19,"#ef4444"],[13.5/19,"#ef4444"],[13.5/19,"#dc2626"],[14.5/19,"#dc2626"],[14.5/19,"#e11d48"],[15.5/19,"#e11d48"],[15.5/19,"#a855f7"],[16.5/19,"#a855f7"],[16.5/19,"#7c3aed"],[17.5/19,"#7c3aed"],[17.5/19,"#6d28d9"],[18.5/19,"#6d28d9"],[18.5/19,"#581c87"],[1,"#581c87"]],Xr={cone:tr,surface:"Viridis",source:"Set1",flux_ratio:"Portland",confidence:"Greys",boron:"YlOrRd",z_axis:"Viridis"},Qr={default:t=>({eye:{x:1.5/t,y:-1.8/t,z:1.2/t},up:{x:0,y:0,z:1}}),top:t=>({eye:{x:.001,y:-.001,z:3/t},up:{x:0,y:1,z:0}}),"side-x":t=>({eye:{x:0,y:-3/t,z:.5/t},up:{x:0,y:0,z:1}}),"side-y":t=>({eye:{x:3/t,y:0,z:.5/t},up:{x:0,y:0,z:1}})};function Jr(t){return[{name:"Unfused",vertices:[[.5,.39],[2.8,1],[.5,1]],triangles:[[0,1,2]],color:"rgba(120, 120, 120, 0.15)"},{name:"Matte",vertices:[[.5,.05],[.5,.39],[2.8,1],[4,1]],triangles:[[0,1,2],[0,2,3]],color:"rgba(76, 175, 80, 0.15)"},{name:"Semi-Matte",vertices:[[1.2,.242],[4,1],[5,1]],triangles:[[0,1,2]],color:"rgba(139, 195, 74, 0.12)"},{name:"Crazed",vertices:[[.5,0],[.5,.05],[1.2,.242],[1.75,0]],triangles:[[0,1,2],[0,2,3]],color:"rgba(244, 67, 54, 0.15)"},{name:"Underfired",vertices:[[1.75,0],[7.2,.65],[7.2,0]],triangles:[[0,1,2]],color:"rgba(158, 158, 158, 0.15)"},{name:"Bright Gloss",vertices:[[.5,0],[.5,.05],[1.2,.242],[1.75,0],[2.7,.23],[3.3,.25],[3.9,.28],[4.2,.29],[5.4,.49],[7.2,.615],[7.2,0]],triangles:[[0,3,10],[3,4,10],[4,5,10],[5,6,10],[6,7,10],[7,8,10],[8,9,10]],color:"rgba(33, 150, 243, 0.10)"}].map(n=>{const l=[],d=[],u=[],f=[],p=[],b=[];for(const x of n.vertices)l.push(x[0]),d.push(x[1]),u.push(t);for(const x of n.triangles)f.push(x[0]),p.push(x[1]),b.push(x[2]);return{type:"mesh3d",x:l,y:d,z:u,i:f,j:p,k:b,color:n.color,opacity:.3,flatshading:!0,hoverinfo:"text",hovertext:n.name,name:n.name,showlegend:!1,lighting:{ambient:1,diffuse:0,specular:0}}})}function ea(t,i){return[{label:"1280°C",vertices:[[1.8,.4],[1.8,.85],[6.6,.85],[6.6,.4]],triangles:[[0,1,2],[0,2,3]],color:i?"rgba(239, 68, 68, 0.06)":"rgba(239, 68, 68, 0.04)"},{label:"1260°C",vertices:[[2,.45],[2,.8],[6.2,.8],[6.2,.45]],triangles:[[0,1,2],[0,2,3]],color:i?"rgba(245, 158, 11, 0.06)":"rgba(245, 158, 11, 0.04)"},{label:"1240°C",vertices:[[2.4,.5],[2.4,.75],[5.8,.75],[5.8,.5]],triangles:[[0,1,2],[0,2,3]],color:i?"rgba(234, 179, 8, 0.06)":"rgba(234, 179, 8, 0.04)"}].map(l=>{const d=[],u=[],f=[],p=[],b=[],x=[];for(const h of l.vertices)d.push(h[0]),u.push(h[1]),f.push(t);for(const h of l.triangles)p.push(h[0]),b.push(h[1]),x.push(h[2]);return{type:"mesh3d",x:d,y:u,z:f,i:p,j:b,k:x,color:l.color,opacity:.5,flatshading:!0,hoverinfo:"text",hovertext:l.label,name:l.label,showlegend:!1,lighting:{ambient:1,diffuse:0,specular:0}}})}function ta(t){return{type:"scatter3d",mode:"lines",x:[1.8,4.2,6,7.2],y:[.2,.6,.8,.92],z:[t,t,t,t],line:{color:"rgba(255, 255, 255, 0.4)",width:3,dash:"dot"},hoverinfo:"text",hovertext:"Q-line",name:"Q-line",showlegend:!1}}function ra(t,i,n,l,d){return{type:"surface",x:t.xCoords,y:t.yCoords,z:t.z,opacity:n,colorscale:"Viridis",showscale:!1,hoverinfo:"z",hovertemplate:`${ze(i)}: %{z:.3f}<extra>Surface</extra>`,name:"Fitted Surface",showlegend:!1,contours:{z:{show:!0,usecolormap:!0,highlightcolor:l?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.2)",project:{z:!0}}},lighting:d?{ambient:.5,diffuse:.8,specular:.4,roughness:.4,fresnel:.2}:{ambient:.8,diffuse:.3,specular:.15,roughness:.6},lightposition:d?{x:d.x*1e5,y:d.y*1e5,z:d.z*1e5}:{x:0,y:0,z:1e4}}}function aa(t,i,n,l){const u=[],f=[],p=[];for(let b=0;b<=32;b++){const x=b/32*Math.PI*2;u.push(t.x+i*Math.cos(x)),f.push(t.y+i*Math.sin(x)),p.push(n)}u.push(null),f.push(null),p.push(null);for(let b=0;b<=32;b++){const x=b/32*Math.PI*2;u.push(t.x+i*Math.cos(x)),f.push(t.y+i*Math.sin(x)),p.push(l)}u.push(null),f.push(null),p.push(null);for(let b=0;b<4;b++){const x=b/4*Math.PI*2,h=t.x+i*Math.cos(x),g=t.y+i*Math.sin(x);u.push(h,h,null),f.push(g,g,null),p.push(n,l,null)}return{type:"scatter3d",mode:"lines",x:u,y:f,z:p,line:{color:"rgba(244, 67, 54, 0.5)",width:2,dash:"dash"},hoverinfo:"text",hovertext:"Void region",name:"Void",showlegend:!1}}function It({zAxis:t="B2O3",colorBy:i="cone",zoom:n=1,width:l,height:d,highlightPointIds:u,highlightCircle:f,showSurface:p=!0,surfaceOpacity:b=.35,showPrediction:x=!1,cameraPreset:h="default",perspective:g=.5,lightPosition:S,onSurfaceGridReady:L,autoRotate:k=!1,autoRotateSpeed:v=.5,pointSize:H=2.5,zStretch:le=.8,proximityRadius:P=null,proximityCenterId:K=null,proximityWeights:ee=Xe,hoveredNeighborId:G=null,onProximityStats:W,onResetCamera:ie,kioskMode:te=!1}){const[C,Z]=o.useState(null),[E,T]=o.useState(!1),[M,$]=o.useState(!1),[ue,m]=o.useState(0),A=o.useRef(null),w=o.useRef(null),O=o.useRef(null),V=o.useRef(0),q=o.useRef(null);o.useEffect(()=>{let a=!0;T(!1),$(!1);const s=setTimeout(()=>{a&&$(!0)},12e3);return Ge(()=>import("./plotly-custom-3d-C7fpJNb8.js"),__vite__mapDeps([4,1,2,3])).then(z=>{if(!a)return;clearTimeout(s);const j=z.default??z;w.current=j;const I=qt(j);Z(()=>I)}).catch(()=>{a&&(clearTimeout(s),T(!0))}),()=>{a=!1,clearTimeout(s)}},[ue]);const ce=Fe(a=>a.getPlotPoints),we=Lt(a=>a.currentSetId),Se=Fe(a=>a.glazes),ve=ne(a=>a.selectedGlaze),Ae=ne(a=>a.setSelectedGlaze),Oe=ne(a=>a.setHoveredPoint),De=ne(a=>a.addToBlendSelection),Pe=ne(a=>a.setSidebarTab),Le=Gt(a=>a.blendResults),c=Yt(a=>a.theme)==="dark",y=o.useMemo(()=>({paper:c?"#1a1a1a":"#ffffff",bg:c?"#1a1a1a":"#f5f5f5",axisbg:c?"#1e1e1e":"#f8f8f8",grid:c?"#333":"#ddd",zeroline:c?"#444":"#ccc",axisTitle:c?"#aaa":"#555",tick:c?"#888":"#666",font:c?"#ccc":"#333",regionLabel:c?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.22)"}),[c]),X=o.useMemo(()=>ce(we),[ce,we]),me=Jt(X),B=o.useMemo(()=>me.filter(a=>a.x!=null&&a.y!=null&&!isNaN(a.x)&&!isNaN(a.y)&&a.x>=Re.x[0]&&a.x<=Re.x[1]&&a.y>=Re.y[0]&&a.y<=Re.y[1]&&(a.cone==null||a.cone>=-6&&a.cone<=13)).map(a=>{const s=Se.get(a.id),z=s==null?void 0:s.umf,j=Nt(z,t,a.cone);return{...a,z:j}}).filter(a=>isFinite(a.z)),[me,Se,t]),{visibleData:D,proximityCenter:re,axisRanges:fe,nearby:Ce}=o.useMemo(()=>{if(P==null||!ve||B.length===0)return{visibleData:B,proximityCenter:null,axisRanges:null,nearby:[]};const a=K??ve.id,s=B.find(N=>N.id===a);if(!s)return{visibleData:B,proximityCenter:null,axisRanges:null,nearby:[]};let z=1/0,j=-1/0,I=1/0,U=-1/0,Y=1/0,xe=-1/0,ge=1/0,se=-1/0;for(const N of B)N.x<z&&(z=N.x),N.x>j&&(j=N.x),N.y<I&&(I=N.y),N.y>U&&(U=N.y),isFinite(N.z)&&(N.z<Y&&(Y=N.z),N.z>xe&&(xe=N.z)),N.cone!=null&&(N.cone<ge&&(ge=N.cone),N.cone>se&&(se=N.cone));const ae=Math.max(j-z,.001),ye=Math.max(U-I,.001),Te=Math.max(Y<1/0?xe-Y:1,.001),_e=Math.max(se-ge,1),r={x:ae,y:ye,z:Te},R=ee,oe=Math.max(0,Math.min(1,R.x)),F=Math.max(0,Math.min(1,R.y)),je=Math.max(0,Math.min(1,R.z)),Q=Math.max(0,Math.min(1,R.cone)),J=Math.max(0,Math.min(1,R.surface)),be=oe+F+je+Q+J,at=be>0?Math.sqrt(be):1,Ze=[],Ke=[],kt=s.cone??6,mt=s.surfaceType??"unknown";for(const N of B){const He=(N.x-s.x)/r.x,ot=(N.y-s.y)/r.y,jt=(N.z-s.z)/r.z,wt=N.cone!=null&&s.cone!=null?Math.abs((N.cone-kt)/_e):.5,St=(N.surfaceType??"unknown")===mt?0:1,_t=Math.sqrt(oe*He*He+F*ot*ot+je*jt*jt+Q*wt*wt+J*St*St)/at;_t<=P&&(Ze.push(N),N.id!==s.id&&Ke.push({point:N,dist:_t,dx:Math.abs(He),dy:Math.abs(ot),dz:Math.abs(jt),dCone:wt,dSurface:St}))}Ze.find(N=>N.id===s.id)||Ze.push(s),Ke.sort((N,He)=>N.dist-He.dist);const ht=Ke.slice(0,50).map(N=>({id:N.point.id,name:N.point.name,distance:N.dist,x:N.point.x,y:N.point.y,z:N.point.z,cone:N.point.cone,surfaceType:N.point.surfaceType??"unknown",dx:N.dx,dy:N.dy,dz:N.dz,dCone:N.dCone,dSurface:N.dSurface}));return{visibleData:Ze,proximityCenter:s,axisRanges:r,nearby:ht}},[B,ve,P,K,ee]);o.useEffect(()=>{P!=null&&re?W==null||W({visible:D.length,total:B.length,nearby:Ce}):W==null||W(null)},[D.length,B.length,P,re,Ce,W]);const he=o.useMemo(()=>{if(i==="cone"||i==="glaze_type")return null;let a=1/0,s=-1/0;for(const z of B){let j;switch(i){case"z_axis":j=z.z;break;case"surface":j=Zt(z.surfaceType);break;case"source":j=Ut(z.source);break;case"flux_ratio":j=z.fluxRatio;break;case"confidence":j=Wt(z.confidence);break;case"boron":j=z.boron;break;default:j=0}isFinite(j)&&(j<a&&(a=j),j>s&&(s=j))}return a===1/0?null:{min:a,max:s===a?a+1:s}},[B,i]),nt=o.useMemo(()=>i==="glaze_type"?D.map(a=>Tt(a.glazeTypeId)):D.map(a=>{switch(i){case"z_axis":return a.z;case"cone":return a.cone??6;case"surface":return Zt(a.surfaceType);case"source":return Ut(a.source);case"flux_ratio":return a.fluxRatio;case"confidence":return Wt(a.confidence);case"boron":return a.boron;default:return 0}}),[D,i]),ke=o.useMemo(()=>{const a=[];for(const U of B)isFinite(U.z)&&!isNaN(U.z)&&a.push(U.z);if(a.length===0)return{min:0,max:1};a.sort((U,Y)=>U-Y);const s=a[0],z=a[Math.min(Math.floor(a.length*.99),a.length-1)],j=a[a.length-1],I=z===s?s+1:z*1.1;return{min:s,max:Math.min(I,j)}},[B]),de=ke.min-(ke.max-ke.min)*.05,Ve=o.useMemo(()=>!p||B.length<10?null:Ur(B.map(a=>({x:a.x,y:a.y,z:a.z})),{xRange:[...Re.x],yRange:[...Re.y],resolution:40}),[B,p]);o.useEffect(()=>{L==null||L(Ve,B.map(a=>({x:a.x,y:a.y,z:a.z,name:a.name??""})))},[Ve,B,L]);const Be=o.useMemo(()=>{if(!x||B.length<10)return null;const a=B.filter(s=>s.surfaceType&&s.surfaceType!=="unknown").map(s=>({x:s.x,y:s.y,surfaceType:s.surfaceType}));return a.length<5?null:Hr(a,{xRange:[...Re.x],yRange:[...Re.y],resolution:30})},[B,x]),_=o.useMemo(()=>{var r,R,oe,F,je;if(!Be)return null;const{xCoords:a,yCoords:s,cells:z}=Be,j=a.length,I=s.length,U=[],Y=[],xe=[],ge=[],se=[],ae=[],ye=[],Te=[],_e=de+(ke.max-ke.min)*.001;for(let Q=0;Q<I;Q++)for(let J=0;J<j;J++){U.push(a[J]),Y.push(s[Q]),xe.push(_e);const be=(r=z[Q])==null?void 0:r[J];ge.push((be==null?void 0:be.confidence)??0)}for(let Q=0;Q<I-1;Q++)for(let J=0;J<j-1;J++){const be=(R=z[Q])==null?void 0:R[J],at=(oe=z[Q])==null?void 0:oe[J+1],Ze=(F=z[Q+1])==null?void 0:F[J],Ke=(je=z[Q+1])==null?void 0:je[J+1];if(!be||!at||!Ze||!Ke)continue;const kt=Q*j+J,mt=Q*j+J+1,ht=(Q+1)*j+J,N=(Q+1)*j+J+1,He=(be.confidence+at.confidence+Ze.confidence)/3,ot=(at.confidence+Ze.confidence+Ke.confidence)/3;se.push(kt),ae.push(mt),ye.push(ht),Te.push(Bt(be.type,.15+He*.35)),se.push(mt),ae.push(N),ye.push(ht),Te.push(Bt(Ke.type,.15+ot*.35))}return se.length===0?null:{type:"mesh3d",x:U,y:Y,z:xe,i:se,j:ae,k:ye,facecolor:Te,opacity:.6,flatshading:!0,hoverinfo:"skip",name:"Surface Prediction",showlegend:!1,lighting:{ambient:1,diffuse:0,specular:0}}},[Be,de,ke.max]),st=o.useMemo(()=>{const a=i==="cone";return{type:"scatter3d",mode:"markers",x:D.map(s=>s.x),y:D.map(s=>s.y),z:D.map(s=>s.z),customdata:D.map(s=>s.id),text:D.map(s=>s.name),marker:{size:H,opacity:p?.65:.8,color:nt,...i==="glaze_type"?{}:{colorscale:a?tr:Xr[i]||"Viridis",reversescale:!1,cmin:a?-6:he==null?void 0:he.min,cmax:a?13:he==null?void 0:he.max,colorbar:{title:i==="z_axis"?ze(t):oa(i),thickness:15,len:.5,tickvals:a?Ot:void 0,ticktext:a?zt:void 0}},line:{width:0}},hoverinfo:"text",hovertemplate:D.map(s=>{const z=t==="cone"?s.cone!=null?$e(s.cone):"unknown":s.z.toFixed(3),j=[`<b>${s.name}</b>`,`SiO₂: ${s.x.toFixed(2)}`,`Al₂O₃: ${s.y.toFixed(2)}`,`${ze(t)}: ${z}`];return s.cone!=null?j.push(`Cone: ${$e(s.cone)}`):j.push("Cone: unknown"),s.surfaceType&&s.surfaceType!=="unknown"&&j.push(`Surface: ${s.surfaceType}`),s.source&&s.source!=="unknown"&&j.push(`Source: ${s.source}`),j.join("<br>")+"<extra></extra>"}),name:"Glazes",showlegend:!1}},[D,nt,i,he,t,p,H]),pe=o.useMemo(()=>{if(!ve)return null;const a=D.find(s=>s.id===ve.id);return a?{type:"scatter3d",mode:"markers",x:[a.x],y:[a.y],z:[a.z],text:[a.name],marker:{size:10,symbol:"circle",color:"rgba(255, 255, 255, 0.9)",line:{width:3,color:"#facc15"}},hoverinfo:"text",hovertemplate:"<b>%{text}</b> (selected)<extra></extra>",name:"Selected",showlegend:!1}:null},[ve,D]),Qe=o.useMemo(()=>{if(!ve)return null;const a=D.find(s=>s.id===ve.id);return a?{type:"scatter3d",mode:"lines",x:[a.x,a.x],y:[a.y,a.y],z:[a.z,de],line:{color:"rgba(250, 204, 21, 0.6)",width:2,dash:"dot"},hoverinfo:"skip",showlegend:!1,name:"selected-drop"}:null},[ve,D,de]),Ee=o.useMemo(()=>{if(Le.length===0)return null;const a=Le.map(I=>ft(I.umf,"SiO2")),s=Le.map(I=>ft(I.umf,"Al2O3")),z=Le.map(I=>Nt(I.umf,t)),j=Le.map((I,U)=>{var Y;return((Y=I.recipe)==null?void 0:Y.name)||`Blend ${U+1}`});return{type:"scatter3d",mode:"markers",x:a,y:s,z,text:j,marker:{size:6,symbol:"diamond",color:"#ff9800",opacity:.9,line:{width:1,color:"#fff"}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>SiO₂: %{x:.2f}<br>Al₂O₃: %{y:.2f}<br>${ze(t)}: %{z:.3f}<br><extra>Blend</extra>`,name:"Blend Results",showlegend:!1}},[Le,t]),Ie=o.useMemo(()=>{if(!u||u.length===0)return null;const a=D.filter(s=>u.includes(s.id));return a.length===0?null:{type:"scatter3d",mode:"markers",x:a.map(s=>s.x),y:a.map(s=>s.y),z:a.map(s=>s.z),text:a.map(s=>s.name),marker:{size:7,symbol:"circle",color:"rgba(255, 235, 59, 0.85)",line:{width:2,color:"#fff"}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>SiO₂: %{x:.2f}<br>Al₂O₃: %{y:.2f}<br>${ze(t)}: %{z:.3f}<br><extra>Cluster</extra>`,name:"Highlighted",showlegend:!1}},[u,D,t]),Ye=o.useMemo(()=>f?aa(f,f.r,de,ke.max):null,[f,de,ke.max]),Me=o.useMemo(()=>{if(D.length>300)return null;const a=[],s=[],z=[];for(const j of D)a.push(j.x,j.x,null),s.push(j.y,j.y,null),z.push(j.z,de,null);return{type:"scatter3d",mode:"lines",x:a,y:s,z,line:{color:"rgba(255,255,255,0.04)",width:1},hoverinfo:"skip",showlegend:!1,name:"droplines"}},[D,de]),it=o.useMemo(()=>Jr(de),[de]),lt=o.useMemo(()=>We.tempContours?ea(de,c):[],[de,c]),qe=o.useMemo(()=>ta(de),[de]),ct=o.useMemo(()=>({type:"scatter3d",mode:"text",x:[1.5,2.3,3.4,4.5,5,1.2],y:[.75,.55,.65,.25,.1,.08],z:Array(6).fill(de),text:["UNFUSED","MATTE","SEMI-MATTE","BRIGHT GLOSS","UNDERFIRED","CRAZED"],textfont:{color:y.regionLabel,size:10},hoverinfo:"skip",showlegend:!1,name:"labels"}),[de,y]),Je=o.useMemo(()=>{if(!re||!fe||P==null)return null;const a=24,s=re.x,z=re.y,j=re.z,I=P*fe.x,U=P*fe.y,Y=P*fe.z,xe=[],ge=[],se=[];for(let ae=0;ae<=a;ae+=3){const ye=Math.PI*ae/a-Math.PI/2,Te=Math.cos(ye),_e=Math.sin(ye);for(let r=0;r<=a;r++){const R=2*Math.PI*r/a;xe.push(s+I*Te*Math.cos(R)),ge.push(z+U*Te*Math.sin(R)),se.push(j+Y*_e)}xe.push(null),ge.push(null),se.push(null)}for(let ae=0;ae<a;ae+=3){const ye=2*Math.PI*ae/a,Te=Math.cos(ye),_e=Math.sin(ye);for(let r=0;r<=a;r++){const R=Math.PI*r/a-Math.PI/2;xe.push(s+I*Math.cos(R)*Te),ge.push(z+U*Math.cos(R)*_e),se.push(j+Y*Math.sin(R))}xe.push(null),ge.push(null),se.push(null)}return{type:"scatter3d",mode:"lines",x:xe,y:ge,z:se,line:{color:"rgba(255,165,0,0.35)",width:1.5},hoverinfo:"skip",showlegend:!1,name:"proximity-sphere",connectgaps:!1}},[re,fe,P]),dt=o.useMemo(()=>{const a=[...it,...lt,qe,ct];if(Me&&a.push(Me),_&&a.push(_),Ve&&p){const s=P!=null&&D.length<B.length;a.push(ra(Ve,t,s?Math.min(b,.15):b,c,S))}if(a.push(st),Ie&&a.push(Ie),Ye&&a.push(Ye),Ee&&a.push(Ee),pe&&a.push(pe),Qe&&a.push(Qe),Je&&a.push(Je),re&&Ce.length>0){const s=Ce.slice(0,8),z=[],j=[],I=[];for(const U of s)z.push(re.x,U.x,null),j.push(re.y,U.y,null),I.push(re.z,U.z,null);a.push({type:"scatter3d",mode:"lines",x:z,y:j,z:I,line:{color:"rgba(250, 204, 21, 0.25)",width:1.5,dash:"dot"},hoverinfo:"skip",showlegend:!1,name:"proximity-lines",connectgaps:!1})}if(G){const s=D.find(z=>z.id===G);s&&(a.push({type:"scatter3d",mode:"markers",x:[s.x],y:[s.y],z:[s.z],text:[s.name],marker:{size:12,symbol:"circle",color:"rgba(250, 204, 21, 0.2)",line:{width:2.5,color:"#facc15"}},hoverinfo:"skip",showlegend:!1,name:"hovered-neighbor"}),a.push({type:"scatter3d",mode:"lines",x:[s.x,s.x],y:[s.y,s.y],z:[s.z,de],line:{color:"rgba(250, 204, 21, 0.4)",width:1.5,dash:"dot"},hoverinfo:"skip",showlegend:!1,name:"hovered-drop"}))}return a},[it,lt,qe,ct,Me,Ve,p,b,t,c,S,_,st,Ie,Ye,Ee,pe,Qe,Je,P,D.length,B.length,re,Ce,G,de]),et=Qr[h](n),tt=O.current??et;o.useEffect(()=>{O.current=null},[h,n]),o.useEffect(()=>{if(!k){q.current&&(cancelAnimationFrame(q.current),q.current=null);return}let a=performance.now();const s=z=>{var se;const j=(se=A.current)==null?void 0:se.el,I=w.current;if(!j||!I){a=z,q.current=requestAnimationFrame(s);return}const U=(z-a)/1e3;a=z,V.current+=v*U*.5;const Y=V.current,xe=2.5/n,ge={x:Math.cos(Y)*xe,y:Math.sin(Y)*xe,z:1.2/n};try{I.relayout(j,{"scene.camera.eye":ge,"scene.camera.up":{x:0,y:0,z:1}})}catch{}q.current=requestAnimationFrame(s)};return q.current=requestAnimationFrame(s),()=>{q.current&&(cancelAnimationFrame(q.current),q.current=null)}},[k,v,n]);const pt=o.useCallback(a=>{const s=a==null?void 0:a["scene.camera"];s&&!k&&(O.current=s),s!=null&&s.eye&&k&&(V.current=Math.atan2(s.eye.y,s.eye.x))},[k]),rt=o.useMemo(()=>({...tt,projection:{type:g>.01?"perspective":"orthographic"}}),[tt,g]),xt=o.useMemo(()=>({scene:{xaxis:{title:{text:"SiO₂",font:{color:y.axisTitle}},range:[...Re.x],gridcolor:y.grid,zerolinecolor:y.zeroline,tickfont:{color:y.tick},backgroundcolor:y.axisbg},yaxis:{title:{text:"Al₂O₃",font:{color:y.axisTitle}},range:[...Re.y],gridcolor:y.grid,zerolinecolor:y.zeroline,tickfont:{color:y.tick},backgroundcolor:y.axisbg},zaxis:{title:{text:ze(t),font:{color:y.axisTitle}},range:[ke.min-(ke.max-ke.min)*.05,ke.max],gridcolor:y.grid,zerolinecolor:y.zeroline,tickfont:{color:y.tick},backgroundcolor:y.axisbg,...t==="cone"?{tickvals:Ot,ticktext:zt}:{}},bgcolor:y.bg,camera:rt,aspectmode:"manual",aspectratio:{x:2,y:1,z:le}},paper_bgcolor:y.paper,font:{color:y.font},margin:{l:0,r:0,t:0,b:0},hovermode:"closest",showlegend:!1,uirevision:"stull3d"}),[t,ke,y,rt,le]),yt=o.useCallback(a=>{var z,j,I;const s=(z=a.points)==null?void 0:z[0];if(s!=null&&s.customdata&&((j=s==null?void 0:s.data)==null?void 0:j.type)==="scatter3d"&&((I=s==null?void 0:s.data)==null?void 0:I.mode)==="markers"){const U=Fe.getState().glazes.get(s.customdata);if(U){const Y=a.event;Y!=null&&Y.shiftKey?(De(U),Pe("blend")):Ae(U)}}},[Ae,De,Pe]),vt=o.useCallback(a=>{var z,j,I,U,Y,xe,ge,se;const s=(z=a.points)==null?void 0:z[0];if(s!=null&&s.customdata&&((j=s==null?void 0:s.data)==null?void 0:j.type)==="scatter3d"&&((I=s==null?void 0:s.data)==null?void 0:I.mode)==="markers"){const ae=Fe.getState().glazes.get(s.customdata);if(ae){const ye=(U=ae.coneRange)==null?void 0:U[0];Oe({id:s.customdata,name:ae.name,source:ae.source??"unknown",x:s.x,y:s.y,cone:typeof ye=="number"?ye:null,surfaceType:ae.surfaceType??"unknown",fluxRatio:((xe=(Y=ae.umf)==null?void 0:Y._meta)==null?void 0:xe.R2O_RO_ratio)??0,boron:((se=(ge=ae.umf)==null?void 0:ge.B2O3)==null?void 0:se.value)??0,confidence:ae.umfConfidence??"inferred",glazeTypeId:ae.glazeTypeId??null})}}},[Oe]),ut=o.useMemo(()=>({displayModeBar:!te,modeBarButtonsToRemove:["select2d","lasso2d","toImage"],scrollZoom:!te,displaylogo:!1}),[te]);return C?e.jsx(C,{ref:A,data:dt,layout:xt,config:ut,onClick:yt,onHover:vt,onRelayout:pt,useResizeHandler:!0,style:{width:l||"100%",height:d||"100%"}}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,width:l||"100%",height:d||"100%",color:"#777",fontSize:13,background:"var(--bg-secondary, #1a1a1a)",borderRadius:8,...E?{}:{animation:"pulse 1.5s ease-in-out infinite"}},children:[e.jsx("style",{children:"@keyframes pulse { 0%,100% { opacity: 0.6 } 50% { opacity: 1 } }"}),E?e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{fontSize:22},children:"⚠"}),e.jsx("span",{children:"3D engine failed to load"}),e.jsx("button",{onClick:()=>m(a=>a+1),style:{marginTop:4,padding:"6px 16px",borderRadius:6,border:"1px solid #555",background:"var(--bg-tertiary, #252525)",color:"#ccc",cursor:"pointer",fontSize:13},children:"Tap to retry"})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Loading 3D engine…"}),M&&e.jsx("span",{style:{fontSize:11,color:"#666"},children:"Slow connection — still trying…"})]})]})}function Zt(t){return{matte:1,satin:2,gloss:3,crystalline:4,crawl:5,unknown:0}[t]??0}function Ut(t){return{glazy:1,digitalfire:2,user:3,calculated:4}[t]??0}function Wt(t){return{unknown:0,assumed:1,inferred:2,declared:3,verified:4}[t]??0}function oa(t){return{cone:"Cone",surface:"Surface",source:"Source",flux_ratio:"R₂O:RO",confidence:"Confidence",boron:"B₂O₃"}[t]||t}function ze(t){return{Li2O:"Li₂O",Na2O:"Na₂O",K2O:"K₂O",MgO:"MgO",CaO:"CaO",SrO:"SrO",BaO:"BaO",ZnO:"ZnO",PbO:"PbO",B2O3:"B₂O₃",Fe2O3:"Fe₂O₃",TiO2:"TiO₂",ZrO2:"ZrO₂",SnO2:"SnO₂",MnO:"MnO",MnO2:"MnO₂",NiO:"NiO",CuO:"CuO",Cu2O:"Cu₂O",CoO:"CoO",Cr2O3:"Cr₂O₃",P2O5:"P₂O₅",cone:"Cone",flux_ratio:"R₂O:RO",SiO2_Al2O3_ratio:"SiO₂:Al₂O₃",total_flux_moles:"Total Flux Moles",thermal_expansion:"Thermal Exp. (COE)",nbo_t:"NBO/T",optical_basicity:"Optical Basicity (Λ)",flux_entropy:"Flux Diversity",cao_mgo_ratio:"CaO:MgO",combined_alkali:"Combined Alkali",na2o_k2o_ratio:"Na₂O:K₂O",viscosity_index:"Viscosity Index",surface_tension:"Surface Tension",durability:"Chem. Durability",total_colorant:"Total Colorant",fe_ti_ratio:"Fe:Ti"}[t]||t}const na=Object.freeze(Object.defineProperty({__proto__:null,DEFAULT_PROXIMITY_WEIGHTS:Xe,StullPlot3D:It,computeZFromUMF:Nt,default:It,zAxisLabel:ze},Symbol.toStringTag,{value:"Module"})),Ct=t=>t==="gloss"?"G":t==="matte"?"M":t==="satin"?"S":t==="crystalline"?"X":t==="crawl"?"C":"?",sa=[{key:"gloss",label:"G"},{key:"matte",label:"M"},{key:"satin",label:"S"},{key:"crystalline",label:"X"},{key:"crawl",label:"C"},{key:"unknown",label:"?"}];function ia({proximityStats:t,glazes:i,selectedGlaze:n,pinnedCenterId:l,hoveredNeighborId:d,explorationPath:u,zAxis:f,onSelectGlaze:p,onCompareGlaze:b,onHoverNeighbor:x,onPinCenter:h,onExplorationPathChange:g}){var $,ue;const[S,L]=o.useState(new Set),[k,v]=o.useState(!1),[H,le]=o.useState("distance"),[P,K]=o.useState("list"),ee=o.useRef(null),G=o.useMemo(()=>new Set(t.nearby.map(m=>m.surfaceType)),[t.nearby]),W=o.useMemo(()=>{const m=new Map;for(const A of t.nearby){const w=i.get(A.id);w&&m.set(A.id,w)}return m},[t.nearby,i]),ie=o.useMemo(()=>t.nearby.filter(m=>{const A=W.get(m.id);return(A==null?void 0:A.images)&&A.images.length>0}).length,[t.nearby,W]),te=o.useMemo(()=>{let m=S.size===0?[...t.nearby]:t.nearby.filter(A=>S.has(A.surfaceType));return k&&(m=m.filter(A=>{const w=W.get(A.id);return(w==null?void 0:w.images)&&w.images.length>0})),H==="cone"?m.sort((A,w)=>(A.cone??99)-(w.cone??99)||A.distance-w.distance):H==="name"&&m.sort((A,w)=>A.name.localeCompare(w.name)),m},[t.nearby,S,k,H,W]),C=3,Z=o.useCallback(m=>{var q;const A=ee.current;if(!A)return;const w=Array.from(A.querySelectorAll(P==="gallery"?".gallery-card":".proximity-nearby-item"));if(w.length===0)return;const O=w.findIndex(ce=>ce===document.activeElement);let V=-1;switch(m.key){case"ArrowDown":P==="gallery"?V=O<0?0:Math.min(O+C,w.length-1):V=O<0?0:Math.min(O+1,w.length-1);break;case"ArrowUp":P==="gallery"?V=O<0?0:Math.max(O-C,0):V=O<0?0:Math.max(O-1,0);break;case"ArrowRight":P==="gallery"&&(V=O<0?0:Math.min(O+1,w.length-1));break;case"ArrowLeft":P==="gallery"&&(V=O<0?0:Math.max(O-1,0));break;case"Home":V=0;break;case"End":V=w.length-1;break;case"Enter":O>=0&&w[O].click();return;default:return}if(V>=0&&V!==O){m.preventDefault(),w[V].focus(),w[V].scrollIntoView({block:"nearest"});const ce=((q=te[V])==null?void 0:q.id)??null;x(ce)}},[P,te,x]),E=d?t.nearby.find(m=>m.id===d)??null:null,T=d?W.get(d)??null:null,M=(m,A)=>{const w=W.get(A.id);w&&(m.shiftKey?b(w):(n&&!l&&g((()=>{const O=u;return O.length>0&&O[O.length-1].id===n.id?O:[...O,{id:n.id,name:n.name}].slice(-10)})()),p(w)))};return e.jsxs("div",{className:"proximity-nearby-list",children:[u.length>0&&e.jsx("div",{className:"proximity-breadcrumb",children:u.map((m,A)=>e.jsxs(Mt.Fragment,{children:[A>0&&e.jsx("span",{className:"breadcrumb-arrow",children:"›"}),e.jsx("button",{className:"breadcrumb-btn",onClick:()=>{const w=i.get(m.id);w&&(p(w),g(u.slice(0,A)))},title:m.name,children:m.name.length>12?m.name.slice(0,11)+"…":m.name})]},m.id))}),e.jsxs("div",{className:"proximity-nearby-header",children:[e.jsxs("span",{children:["Nearby (",te.length,S.size>0?`/${t.nearby.length}`:"",")"]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsxs("div",{className:"proximity-sort-btns",children:[e.jsx("button",{className:`proximity-sort-btn${P==="list"?" on":""}`,onClick:()=>K("list"),title:"List view",children:"≡"}),e.jsx("button",{className:`proximity-sort-btn${P==="gallery"?" on":""}`,onClick:()=>K("gallery"),title:"Gallery view",children:"▦"})]}),e.jsx("div",{className:"proximity-sort-btns",children:["distance","cone","name"].map(m=>e.jsx("button",{className:`proximity-sort-btn${H===m?" on":""}`,onClick:()=>le(m),title:`Sort by ${m}`,children:m==="distance"?"↔":m==="cone"?"△":"Az"},m))}),e.jsx("button",{className:`proximity-pin-btn${l?" pinned":""}`,onClick:()=>h(l?null:(n==null?void 0:n.id)??null),title:l?"Unpin center — proximity follows selection":"Pin center — keep this neighborhood while exploring",children:l?"📌":"📌Pin"})]})]}),e.jsxs("div",{className:"proximity-filter-pills",children:[sa.filter(m=>G.has(m.key)).map(m=>e.jsx("button",{className:`proximity-pill st-${m.key}${S.has(m.key)?" on":""}`,onClick:()=>L(A=>{const w=new Set(A);return w.has(m.key)?w.delete(m.key):w.add(m.key),w}),title:m.key,children:m.label},m.key)),e.jsxs("button",{className:`proximity-pill photo-pill${k?" on":""}`,onClick:()=>v(m=>!m),title:`Show only glazes with photos (${ie})`,children:["📷",k?` ${ie}`:""]}),(S.size>0||k)&&e.jsx("button",{className:"proximity-pill clear",onClick:()=>{L(new Set),v(!1)},title:"Clear all filters",children:"×"})]}),e.jsx("div",{ref:ee,className:`proximity-nearby-scroll${P==="gallery"?" gallery-mode":""}`,onKeyDown:Z,role:"listbox","aria-label":`Nearby glazes ${P} view`,children:P==="gallery"?te.map((m,A)=>{var V,q;const w=W.get(m.id),O=((V=w==null?void 0:w.images)==null?void 0:V[0])??null;return e.jsxs("button",{className:`gallery-card${(n==null?void 0:n.id)===m.id?" active":""}${d===m.id?" hovered":""}`,onClick:ce=>M(ce,m),onMouseEnter:()=>x(m.id),onMouseLeave:()=>x(null),onFocus:()=>x(m.id),onBlur:()=>x(null),role:"option","aria-selected":(n==null?void 0:n.id)===m.id,title:`${m.name}
SiO₂: ${m.x.toFixed(2)}, Al₂O₃: ${m.y.toFixed(2)}
Shift+click to compare`,children:[e.jsxs("div",{className:"gallery-thumb",children:[O?e.jsx("img",{src:O,alt:m.name,loading:"lazy",onError:ce=>{const we=ce.currentTarget;we.style.display="none";const Se=we.nextElementSibling;Se&&(Se.style.display="")}}):null,e.jsx("div",{className:"gallery-no-photo",style:O?{display:"none"}:void 0,children:e.jsx("span",{className:`proximity-nearby-surface st-${m.surfaceType}`,children:Ct(m.surfaceType)})}),e.jsxs("span",{className:"gallery-rank",children:["#",A+1]}),(((q=w==null?void 0:w.images)==null?void 0:q.length)??0)>1&&e.jsxs("span",{className:"gallery-photo-count",children:["📷",w.images.length]}),e.jsx("span",{className:"gallery-dist",children:m.distance.toFixed(2)})]}),e.jsxs("div",{className:"gallery-info",children:[e.jsx("span",{className:"gallery-name",children:m.name}),e.jsxs("div",{className:"gallery-meta",children:[m.cone!=null&&e.jsxs("span",{className:"proximity-nearby-cone",children:["△",$e(m.cone)]}),e.jsx("span",{className:`proximity-nearby-surface st-${m.surfaceType}`,children:Ct(m.surfaceType)})]})]})]},m.id)}):te.map((m,A)=>{var V,q;const w=W.get(m.id),O=((V=w==null?void 0:w.images)==null?void 0:V[0])??null;return e.jsxs("button",{className:`proximity-nearby-item${(n==null?void 0:n.id)===m.id?" active":""}${d===m.id?" hovered":""}`,onClick:ce=>M(ce,m),onMouseEnter:()=>x(m.id),onMouseLeave:()=>x(null),onFocus:()=>x(m.id),onBlur:()=>x(null),role:"option","aria-selected":(n==null?void 0:n.id)===m.id,title:`SiO₂: ${m.x.toFixed(2)}, Al₂O₃: ${m.y.toFixed(2)}, ${ze(f)}: ${m.z.toFixed(3)}
Shift+click to compare`,children:[O?e.jsx("img",{className:"list-thumb",src:O,alt:"",loading:"lazy",onError:ce=>{const we=ce.currentTarget;we.style.display="none";const Se=we.nextElementSibling;Se&&(Se.style.display="")}}):null,e.jsx("span",{className:"list-thumb-placeholder",style:O?{display:"none"}:void 0}),(((q=w==null?void 0:w.images)==null?void 0:q.length)??0)>1&&e.jsx("span",{className:"list-photo-count",children:w.images.length}),e.jsx("span",{className:"proximity-nearby-rank",children:A+1}),e.jsx("span",{className:"proximity-nearby-name",children:m.name}),m.cone!=null&&e.jsxs("span",{className:"proximity-nearby-cone",children:["△",$e(m.cone)]}),e.jsx("span",{className:`proximity-nearby-surface st-${m.surfaceType}`,title:m.surfaceType,children:Ct(m.surfaceType)}),e.jsxs("span",{className:"proximity-nearby-bars",title:`SiO₂: ${(Math.max(0,1-m.dx)*100).toFixed(0)}% | Al₂O₃: ${(Math.max(0,1-m.dy)*100).toFixed(0)}% | ${ze(f)}: ${(Math.max(0,1-m.dz)*100).toFixed(0)}%`,children:[e.jsx("span",{className:"sim-bar bar-x",style:{width:`${Math.max(0,1-m.dx)*100}%`}}),e.jsx("span",{className:"sim-bar bar-y",style:{width:`${Math.max(0,1-m.dy)*100}%`}}),e.jsx("span",{className:"sim-bar bar-z",style:{width:`${Math.max(0,1-m.dz)*100}%`}})]}),e.jsx("span",{className:"proximity-nearby-dist",children:m.distance.toFixed(2)})]},m.id)})}),(T==null?void 0:T.umf)&&E&&e.jsxs("div",{className:"proximity-preview",children:[e.jsxs("div",{className:"proximity-preview-top",children:[(($=T.images)==null?void 0:$[0])&&e.jsx("img",{className:"preview-thumb",src:T.images[0],alt:"",loading:"lazy",onError:m=>{m.currentTarget.style.display="none"}}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"proximity-preview-name",children:T.name}),e.jsxs("div",{className:"proximity-preview-meta",children:[((ue=T.coneRange)==null?void 0:ue[0])!=null&&e.jsxs("span",{children:["△",$e(Number(T.coneRange[0])),T.coneRange[1]!==T.coneRange[0]?`–${$e(Number(T.coneRange[1]))}`:""]}),e.jsx("span",{children:T.surfaceType}),e.jsx("span",{children:T.atmosphere}),e.jsxs("span",{children:["d=",E.distance.toFixed(3)]})]})]})]}),e.jsxs("div",{className:"proximity-preview-row",children:[e.jsx(Xt,{umf:T.umf,width:120,height:10,compact:!0}),e.jsx(Qt,{umf:T.umf,size:32,innerRadius:.55})]})]}),e.jsxs("div",{className:"proximity-nearby-legend",children:[e.jsxs("span",{className:"sim-legend-item",children:[e.jsx("span",{className:"sim-dot dot-x"}),"SiO","₂"]}),e.jsxs("span",{className:"sim-legend-item",children:[e.jsx("span",{className:"sim-dot dot-y"}),"Al","₂","O","₃"]}),e.jsxs("span",{className:"sim-legend-item",children:[e.jsx("span",{className:"sim-dot dot-z"}),ze(f)]})]})]})}function Ue(t,i,n){return n<=0?0:((t+i)%n+n)%n}function la(t,i){return i<=0?0:Math.min(t,i-1)}function bt(t,i,n=.5,l=4){const d=t+i;return d>l?l:d<n?n:d}function ca(t){if(!t||typeof t!="object")return!1;const i=t;if(!i.tagName)return!1;const n=i.tagName;return!!(n==="INPUT"||n==="TEXTAREA"||n==="SELECT"||i.isContentEditable)}function da({images:t,glazeName:i,sidebarTab:n}){const[l,d]=o.useState(0),[u,f]=o.useState(!1),[p,b]=o.useState(1);o.useEffect(()=>{d(0),f(!1),b(1)},[t]),o.useEffect(()=>{if(!t||t.length===0)return;const h=g=>{ca(g.target)||(u?g.key==="Escape"?(f(!1),b(1),g.preventDefault()):g.key==="ArrowLeft"?(d(S=>Ue(S,-1,t.length)),g.preventDefault()):g.key==="ArrowRight"?(d(S=>Ue(S,1,t.length)),g.preventDefault()):g.key==="+"||g.key==="="?(b(S=>bt(S,.5)),g.preventDefault()):g.key==="-"?(b(S=>bt(S,-.5)),g.preventDefault()):g.key==="0"&&(b(1),g.preventDefault()):n==="detail"&&(g.key==="ArrowLeft"&&t.length>1?(d(S=>Ue(S,-1,t.length)),g.preventDefault()):g.key==="ArrowRight"&&t.length>1&&(d(S=>Ue(S,1,t.length)),g.preventDefault())))};return window.addEventListener("keydown",h),()=>window.removeEventListener("keydown",h)},[t,u,n]);const x=la(l,t.length);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"detail-section",children:[e.jsxs("h4",{children:["Photo",t.length>1?`s (${x+1}/${t.length})`:""]}),e.jsxs("div",{className:"carousel-container",children:[e.jsx("img",{src:t[x],alt:`${i} — photo ${x+1}`,loading:"lazy",className:"carousel-img",onClick:()=>{f(!0),b(1)},style:{cursor:"zoom-in"},title:"Click to enlarge (← → to cycle, Esc to close)",onError:h=>{h.currentTarget.style.display="none";const g=h.currentTarget.nextElementSibling;g!=null&&g.classList.contains("carousel-img-fallback")&&(g.style.display="flex")}}),e.jsx("div",{className:"carousel-img-fallback",style:{display:"none",alignItems:"center",justifyContent:"center",height:200,color:"var(--text-secondary, #888)",fontSize:13},children:"Image unavailable"}),t.length>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"carousel-btn carousel-prev",onClick:()=>d(h=>Ue(h,-1,t.length)),title:"Previous photo",children:"‹"}),e.jsx("button",{className:"carousel-btn carousel-next",onClick:()=>d(h=>Ue(h,1,t.length)),title:"Next photo",children:"›"}),e.jsx("div",{className:"carousel-dots",children:t.map((h,g)=>e.jsx("button",{className:`carousel-dot${g===x?" active":""}`,onClick:()=>d(g)},g))})]})]})]}),u&&e.jsx("div",{className:"lightbox-overlay",onClick:h=>{h.target===h.currentTarget&&(f(!1),b(1))},role:"dialog","aria-label":"Image lightbox",children:e.jsxs("div",{className:"lightbox-content",children:[e.jsx("img",{src:t[x],alt:`${i} — photo ${x+1}`,className:"lightbox-img",style:{transform:`scale(${p})`},draggable:!1,onError:h=>{h.currentTarget.style.display="none";const g=h.currentTarget.nextElementSibling;g!=null&&g.classList.contains("lightbox-img-fallback")&&(g.style.display="flex")}}),e.jsx("div",{className:"lightbox-img-fallback",style:{display:"none",alignItems:"center",justifyContent:"center",color:"#ccc",fontSize:16},children:"Image unavailable"}),t.length>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"lightbox-nav lightbox-prev",onClick:()=>d(h=>Ue(h,-1,t.length)),title:"Previous (←)",children:"‹"}),e.jsx("button",{className:"lightbox-nav lightbox-next",onClick:()=>d(h=>Ue(h,1,t.length)),title:"Next (→)",children:"›"})]}),e.jsxs("div",{className:"lightbox-toolbar",children:[e.jsxs("span",{className:"lightbox-caption",children:[i,t.length>1?` (${x+1}/${t.length})`:""]}),e.jsxs("div",{className:"lightbox-zoom-controls",children:[e.jsx("button",{onClick:()=>b(h=>bt(h,-.5)),title:"Zoom out (−)",children:"−"}),e.jsxs("span",{children:[(p*100).toFixed(0),"%"]}),e.jsx("button",{onClick:()=>b(h=>bt(h,.5)),title:"Zoom in (+)",children:"+"}),p!==1&&e.jsx("button",{onClick:()=>b(1),title:"Reset zoom (0)",children:"1:1"})]}),e.jsx("button",{className:"lightbox-close",onClick:()=>{f(!1),b(1)},title:"Close (Esc)",children:"✕"})]})]})})]})}const pa=`
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
`,xa=o.lazy(()=>Ge(()=>Promise.resolve().then(()=>na),void 0).then(t=>({default:t.StullPlot3D}))),ua=o.lazy(()=>Ge(()=>import("./ComparePanel-CVgh3RLY.js"),__vite__mapDeps([5,2,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])).then(t=>({default:t.ComparePanel}))),ma=o.lazy(()=>Ge(()=>import("./BlendLauncher-BNLXdh8s.js"),__vite__mapDeps([21,2,6,7,8,9,10])).then(t=>({default:t.BlendLauncher}))),ha=o.lazy(()=>Ge(()=>import("./index-B9lzSaMo.js"),__vite__mapDeps([22,2,6,7,8,9])).then(t=>({default:t.AnalysisPanel}))),ga=o.lazy(()=>Ge(()=>import("./index-BaEZnZPS.js"),__vite__mapDeps([23,2,12,13])).then(t=>({default:t.DigitalfirePanel}))),ba=["oxidation","reduction","neutral","unknown"],fa=["gloss","satin","matte","crystalline","crawl","unknown"];function ya(){const[t,i]=o.useState(!0),{atmospheres:n,surfaces:l,coneMin:d,coneMax:u,hasIngredients:f,hasImages:p,activeCount:b,toggleAtmosphere:x,toggleSurface:h,setConeRange:g,setHasIngredients:S,setHasImages:L,clearAll:k}=Kt();return e.jsxs("div",{className:"control-group filter-panel",children:[e.jsxs("h3",{style:{cursor:"pointer",display:"flex",alignItems:"center",gap:6,userSelect:"none"},onClick:()=>i(!t),children:[e.jsx("span",{style:{fontSize:10,transition:"transform 0.15s",transform:t?"rotate(90deg)":"rotate(0)"},children:"▶"}),"Filters",b>0&&e.jsx("span",{className:"filter-badge",children:b})]}),t&&e.jsxs("div",{className:"filter-body",children:[e.jsxs("div",{className:"filter-section",children:[e.jsx("span",{className:"filter-label",children:"Atmosphere"}),e.jsx("div",{className:"filter-chips",children:ba.map(v=>e.jsx("button",{className:`filter-chip ${n.has(v)?"active":""}`,onClick:()=>x(v),"aria-pressed":n.has(v),"aria-label":`Atmosphere: ${v}`,children:v==="unknown"?"?":v.slice(0,3)},v))})]}),e.jsxs("div",{className:"filter-section",children:[e.jsx("span",{className:"filter-label",children:"Surface"}),e.jsx("div",{className:"filter-chips",children:fa.map(v=>e.jsx("button",{className:`filter-chip ${l.has(v)?"active":""}`,onClick:()=>h(v),"aria-pressed":l.has(v),"aria-label":`Surface: ${v}`,children:v==="unknown"?"?":v==="crystalline"?"crys":v.slice(0,4)},v))})]}),e.jsxs("div",{className:"filter-section",children:[e.jsx("span",{className:"filter-label",children:"Cone range"}),e.jsxs("div",{className:"cone-range-inputs",children:[e.jsx("input",{type:"number",className:"cone-input",placeholder:"min",value:d??"",onChange:v=>{const H=v.target.value===""?null:Number(v.target.value);g(H,u)},min:-6,max:13}),e.jsx("span",{style:{color:"var(--text-secondary)",fontSize:12},children:"to"}),e.jsx("input",{type:"number",className:"cone-input",placeholder:"max",value:u??"",onChange:v=>{const H=v.target.value===""?null:Number(v.target.value);g(d,H)},min:-6,max:13})]})]}),e.jsxs("div",{className:"filter-section",children:[e.jsxs("label",{className:"filter-flag",children:[e.jsx("input",{type:"checkbox",checked:f,onChange:v=>S(v.target.checked)}),"Has recipe"]}),e.jsxs("label",{className:"filter-flag",children:[e.jsx("input",{type:"checkbox",checked:p,onChange:v=>L(v.target.checked)}),"Has photo"]})]}),b>0&&e.jsx("button",{className:"filter-clear",onClick:k,children:"Clear all filters"})]})]})}function va(){const t=nr(),[i,n]=o.useState("SiO2"),[l,d]=o.useState("Al2O3"),[u,f]=o.useState("cone"),[p,b]=o.useState(1),[x,h]=o.useState(!1),[g,S]=o.useState("B2O3"),[L,k]=o.useState(!0),[v,H]=o.useState(.35),[le,P]=o.useState(!1),[K,ee]=o.useState("default"),[G,W]=o.useState(!1),[ie,te]=o.useState("6"),[C,Z]=o.useState(.5),[E,T]=o.useState(!1),[M,$]=o.useState({x:1,y:-1,z:2}),[ue,m]=o.useState(null),[A,w]=o.useState([]),[O,V]=o.useState(!1),[q,ce]=o.useState(.5);o.useEffect(()=>{if(!t.active)return;h(!0),V(!0),ce(.3),f("cone"),k(!0),H(.25),Z(.6),Ae(.8),Se(3);const R=new URLSearchParams(window.location.search||window.location.hash.split("?")[1]||"").get("z");R&&S(R)},[t.active]);const[we,Se]=o.useState(2.5),[ve,Ae]=o.useState(.8),[Oe,De]=o.useState(!1),[Pe,Le]=o.useState(.35),[Ne,c]=o.useState(null),[y,X]=o.useState(null),[me,B]=o.useState(null),[D,re]=o.useState([]),[fe,Ce]=o.useState({...Xe}),[he,nt]=o.useState(!1),[ke,de]=o.useState(0),Ve=o.useCallback((r,R)=>{m(r),w(R)},[]),Be=o.useCallback(()=>{de(r=>r+1)},[]);o.useEffect(()=>{if(!x)return;const r=["default","top","side-x","side-y"],R=oe=>{const F=oe.target;(F==null?void 0:F.tagName)==="INPUT"||(F==null?void 0:F.tagName)==="TEXTAREA"||(F==null?void 0:F.tagName)==="SELECT"||F!=null&&F.isContentEditable||(oe.key>="1"&&oe.key<="4"?(ee(r[Number(oe.key)-1]),oe.preventDefault()):oe.key==="r"||oe.key==="R"?(V(je=>!je),oe.preventDefault()):oe.key==="0"&&(Be(),oe.preventDefault()))};return window.addEventListener("keydown",R),()=>window.removeEventListener("keydown",R)},[x,Be]),o.useEffect(()=>{x&&f("z_axis")},[x,g]);const _=ne(r=>r.selectedGlaze),st=ne(r=>r.showSidebar),pe=ne(r=>r.sidebarTab);o.useEffect(()=>{_||(De(!1),X(null))},[_]);const Qe=ne(r=>r.toggleSidebar),Ee=ne(r=>r.setSidebarTab),Ie=ne(r=>r.setSelectedGlaze),Ye=ne(r=>r.addToCompare),Me=ne(r=>r.compareGlazes),it=ne(r=>r.removeFromCompare),lt=ne(r=>r.clearCompare),qe=ne(r=>r.selectedForBlend),ct=ne(r=>r.removeFromBlendSelection),Je=ne(r=>r.clearBlendSelection),dt=Fe(r=>r.glazes),et=Fe(r=>r.stats),[tt,pt]=o.useState([]),[rt,xt]=o.useState(null),yt=o.useCallback(r=>{pt(r),xt(null)},[]),vt=o.useCallback((r,R)=>{xt({x:r.x,y:r.y,r:R}),pt([])},[]),[ut,a]=o.useState(null),[s,z]=o.useState(!1),j=o.useCallback(r=>{a(r),r&&z(!0)},[]),{results:I,weights:U,count:Y,setCount:xe,updateWeight:ge,resetWeights:se,oxides:ae}=gr(_,dt),ye=["SiO2","Al2O3","B2O3","Na2O","K2O","CaO","MgO","ZnO","BaO"],Te=[...x?[{value:"z_axis",label:"↕ Z Axis"}]:[],{value:"cone",label:"Cone"},{value:"glaze_type",label:"Glaze Type"},{value:"surface",label:"Surface"},{value:"source",label:"Source"},{value:"flux_ratio",label:"R2O:RO Ratio"},{value:"boron",label:"Boron"},{value:"confidence",label:"Confidence"}],_e=[{value:"Li2O",label:"Li₂O (Lithium)",group:"Fluxes – R₂O"},{value:"Na2O",label:"Na₂O (Sodium)",group:"Fluxes – R₂O"},{value:"K2O",label:"K₂O (Potassium)",group:"Fluxes – R₂O"},{value:"CaO",label:"CaO (Calcium)",group:"Fluxes – RO"},{value:"MgO",label:"MgO (Magnesium)",group:"Fluxes – RO"},{value:"SrO",label:"SrO (Strontium)",group:"Fluxes – RO"},{value:"BaO",label:"BaO (Barium)",group:"Fluxes – RO"},{value:"ZnO",label:"ZnO (Zinc)",group:"Fluxes – RO"},{value:"PbO",label:"PbO (Lead)",group:"Fluxes – RO"},{value:"B2O3",label:"B₂O₃ (Boron)",group:"Stabilizers"},{value:"Fe2O3",label:"Fe₂O₃ (Iron)",group:"Stabilizers"},{value:"TiO2",label:"TiO₂ (Titanium)",group:"Glass Formers"},{value:"ZrO2",label:"ZrO₂ (Zirconium)",group:"Glass Formers"},{value:"SnO2",label:"SnO₂ (Tin)",group:"Glass Formers"},{value:"MnO",label:"MnO (Manganese)",group:"Colorants"},{value:"MnO2",label:"MnO₂ (Manganese IV)",group:"Colorants"},{value:"NiO",label:"NiO (Nickel)",group:"Colorants"},{value:"CuO",label:"CuO (Copper)",group:"Colorants"},{value:"Cu2O",label:"Cu₂O (Cuprous)",group:"Colorants"},{value:"CoO",label:"CoO (Cobalt)",group:"Colorants"},{value:"Cr2O3",label:"Cr₂O₃ (Chromium)",group:"Colorants"},{value:"P2O5",label:"P₂O₅ (Phosphorus)",group:"Colorants"},{value:"cone",label:"Cone (Temperature)",group:"Ratios & Sums"},{value:"flux_ratio",label:"R₂O:RO Ratio",group:"Ratios & Sums"},{value:"SiO2_Al2O3_ratio",label:"SiO₂:Al₂O₃ Ratio",group:"Ratios & Sums"},{value:"total_flux_moles",label:"Total Flux Moles",group:"Ratios & Sums"},{value:"thermal_expansion",label:"Thermal Exp. (COE)",group:"Ratios & Sums"},{value:"nbo_t",label:"NBO/T (Network Breakup)",group:"Glass Structure"},{value:"optical_basicity",label:"Optical Basicity (Λ)",group:"Glass Structure"},{value:"flux_entropy",label:"Flux Diversity (Entropy)",group:"Flux Analysis"},{value:"cao_mgo_ratio",label:"CaO:MgO (Texture Dial)",group:"Flux Analysis"},{value:"combined_alkali",label:"Combined Alkali (KNaO)",group:"Flux Analysis"},{value:"na2o_k2o_ratio",label:"Na₂O:K₂O Ratio",group:"Flux Analysis"},{value:"viscosity_index",label:"Viscosity Index",group:"Physical"},{value:"surface_tension",label:"Surface Tension (Dietzel)",group:"Physical"},{value:"durability",label:"Chemical Durability",group:"Physical"},{value:"total_colorant",label:"Total Colorant Load",group:"Colorant"},{value:"fe_ti_ratio",label:"Fe:Ti Ratio",group:"Colorant"}];return e.jsxs("div",{className:`stull-explorer${t.active?" kiosk-active":""}`,role:"application","aria-label":"Stull Chart Glaze Explorer",children:[!t.active&&e.jsxs("aside",{className:"controls-panel","aria-label":"Plot controls",children:[e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{id:"axes-heading",children:"Axes"}),e.jsxs("div",{className:"axis-controls",role:"group","aria-labelledby":"axes-heading",children:[e.jsxs("label",{children:["X Axis",e.jsx("select",{value:i,onChange:r=>n(r.target.value),children:ye.map(r=>e.jsx("option",{value:r,children:r},r))})]}),e.jsxs("label",{children:["Y Axis",e.jsx("select",{value:l,onChange:r=>d(r.target.value),children:ye.map(r=>e.jsx("option",{value:r,children:r},r))})]})]})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Color By"}),e.jsx("select",{value:u,onChange:r=>f(r.target.value),className:"color-select",children:Te.map(r=>e.jsx("option",{value:r.value,children:r.label},r.value))})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"View"}),e.jsx("button",{className:`view-toggle ${x?"active":""}`,onClick:()=>h(!x),"aria-pressed":x,"aria-label":x?"Switch to 2D view":"Switch to 3D view",children:x?"◆ 3D":"◇ 2D"}),x&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"z-axis-control",children:e.jsxs("label",{children:["Z Axis",e.jsx("select",{value:g,onChange:r=>S(r.target.value),children:Array.from(new Set(_e.map(r=>r.group))).map(r=>e.jsx("optgroup",{label:r,children:_e.filter(R=>R.group===r).map(R=>e.jsx("option",{value:R.value,children:R.label},R.value))},r))})]})}),e.jsxs("div",{className:"three-d-extras",children:[e.jsxs("label",{className:"surface-toggle",children:[e.jsx("input",{type:"checkbox",checked:L,onChange:r=>k(r.target.checked)}),"Fitted Surface"]}),L&&e.jsxs("div",{className:"surface-opacity",children:[e.jsx("span",{children:"Opacity"}),e.jsx("input",{type:"range",min:"0.1",max:"0.8",step:"0.05",value:v,onChange:r=>H(Number(r.target.value))}),e.jsxs("span",{className:"opacity-value",children:[Math.round(v*100),"%"]})]}),e.jsxs("label",{className:"surface-toggle",children:[e.jsx("input",{type:"checkbox",checked:le,onChange:r=>P(r.target.checked)}),"Predict Surface"]}),le&&e.jsxs("div",{className:"prediction-legend",children:[e.jsx("span",{className:"pred-dot",style:{background:"#22c55e"}}),"Matte",e.jsx("span",{className:"pred-dot",style:{background:"#3b82f6"}}),"Gloss",e.jsx("span",{className:"pred-dot",style:{background:"#f59e0b"}}),"Satin",e.jsx("span",{className:"pred-dot",style:{background:"#a855f7"}}),"Crystal"]})]}),e.jsxs("div",{className:"camera-presets",children:[e.jsx("span",{className:"presets-label",children:"Camera"}),e.jsxs("div",{className:"preset-buttons",children:[["default","top","side-x","side-y"].map(r=>e.jsx("button",{className:`preset-btn ${K===r?"active":""}`,onClick:()=>ee(r),title:{default:"Perspective view (1)",top:"Top-down / birds eye (2)","side-x":"Side view along Al₂O₃ (3)","side-y":"Side view along SiO₂ (4)"}[r],children:{default:"⬢",top:"⮝","side-x":"⮞","side-y":"⮜"}[r]},r)),e.jsx("button",{className:"preset-btn",onClick:Be,title:"Reset camera to current preset",children:"↺"})]})]}),e.jsxs("div",{className:"three-d-control-row",children:[e.jsxs("label",{className:"surface-toggle",children:[e.jsx("input",{type:"checkbox",checked:O,onChange:r=>V(r.target.checked)}),"Auto-Rotate"]}),O&&e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"0.1",max:"2",step:"0.1",value:q,onChange:r=>ce(Number(r.target.value)),title:`Speed: ${q.toFixed(1)}x`}),e.jsxs("span",{className:"slider-value",children:[q.toFixed(1),"x"]})]})]}),e.jsxs("div",{className:"three-d-control-row",children:[e.jsx("span",{className:"control-row-label",children:"Point Size"}),e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"1",max:"8",step:"0.5",value:we,onChange:r=>Se(Number(r.target.value))}),e.jsx("span",{className:"slider-value",children:we.toFixed(1)})]})]}),e.jsxs("div",{className:"three-d-control-row",children:[e.jsx("span",{className:"control-row-label",children:"Z Stretch"}),e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"0.2",max:"2.0",step:"0.1",value:ve,onChange:r=>Ae(Number(r.target.value))}),e.jsx("span",{className:"slider-value",children:ve.toFixed(1)})]})]}),e.jsxs("div",{className:"three-d-control-row",children:[e.jsx("span",{className:"control-row-label",children:"Perspective"}),e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:C,onChange:r=>Z(Number(r.target.value)),title:C<.01?"Orthographic":`Perspective: ${Math.round(C*100)}%`}),e.jsx("span",{className:"slider-value",children:C<.01?"Ortho":`${Math.round(C*100)}%`})]})]}),e.jsxs("div",{className:"light-control",children:[e.jsxs("label",{className:"surface-toggle",children:[e.jsx("input",{type:"checkbox",checked:E,onChange:r=>T(r.target.checked)}),"Light Source"]}),E&&e.jsx("div",{style:{marginTop:6,display:"flex",flexDirection:"column",gap:4},children:["x","y","z"].map(r=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:12},children:[e.jsx("span",{style:{width:12,color:"var(--text-secondary)"},children:r.toUpperCase()}),e.jsx("input",{type:"range",min:"-3",max:"3",step:"0.1",value:M[r],onChange:R=>$(oe=>({...oe,[r]:Number(R.target.value)})),style:{flex:1}}),e.jsx("span",{style:{fontSize:11,color:"var(--text-dim)",minWidth:28,textAlign:"right"},children:M[r].toFixed(1)})]},r))})]}),e.jsxs("div",{className:"three-d-control-row proximity-control",children:[e.jsxs("label",{className:"surface-toggle",style:{margin:0},children:[e.jsx("input",{type:"checkbox",checked:Oe,onChange:r=>De(r.target.checked),disabled:!_}),"Proximity"]}),Oe&&!_&&e.jsx("span",{className:"slider-value",style:{fontSize:10,opacity:.6},children:"Select a glaze"}),Oe&&_&&Ne&&e.jsxs("span",{className:"slider-value",style:{fontSize:10},children:[Ne.visible,"/",Ne.total]})]}),e.jsxs("div",{className:"three-d-shortcuts-hint",children:[e.jsx("kbd",{children:"1"}),"–",e.jsx("kbd",{children:"4"})," camera presets   ",e.jsx("kbd",{children:"R"})," rotate   ",e.jsx("kbd",{children:"0"})," reset"]})]})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Zoom"}),e.jsxs("div",{className:"zoom-control",children:[e.jsx("input",{type:"range",min:"0.5",max:"4",step:"0.1",value:p,onChange:r=>b(Number(r.target.value)),"aria-label":`Zoom level: ${p.toFixed(1)}x`}),e.jsxs("span",{className:"zoom-value",children:[p.toFixed(1),"x"]})]}),e.jsx("button",{className:"reset-zoom",onClick:()=>b(1),children:"Reset"})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Limit Formulas"}),e.jsxs("label",{className:"surface-toggle",style:{marginBottom:4},children:[e.jsx("input",{type:"checkbox",checked:G,onChange:r=>W(r.target.checked)}),"Show Limits"]}),G&&e.jsxs("div",{style:{marginTop:4},children:[e.jsxs("label",{style:{fontSize:12,color:"var(--text-secondary)"},children:["Highlight Cone",e.jsxs("select",{value:ie,onChange:r=>te(r.target.value),style:{marginLeft:6,fontSize:12},children:[e.jsx("option",{value:"06",children:"Cone 06"}),e.jsx("option",{value:"05",children:"Cone 05"}),e.jsx("option",{value:"04",children:"Cone 04"}),e.jsx("option",{value:"03",children:"Cone 03"}),e.jsx("option",{value:"02",children:"Cone 02"}),e.jsx("option",{value:"01",children:"Cone 01"}),e.jsx("option",{value:"1",children:"Cone 1"}),e.jsx("option",{value:"2",children:"Cone 2"}),e.jsx("option",{value:"3",children:"Cone 3"}),e.jsx("option",{value:"4",children:"Cone 4"}),e.jsx("option",{value:"5",children:"Cone 5"}),e.jsx("option",{value:"6",children:"Cone 6"}),e.jsx("option",{value:"7",children:"Cone 7"}),e.jsx("option",{value:"8",children:"Cone 8"}),e.jsx("option",{value:"9",children:"Cone 9"}),e.jsx("option",{value:"10",children:"Cone 10"}),e.jsx("option",{value:"11",children:"Cone 11"}),e.jsx("option",{value:"12",children:"Cone 12"}),e.jsx("option",{value:"13",children:"Cone 13"})]})]}),e.jsx("p",{style:{fontSize:10,color:"var(--text-tertiary)",margin:"4px 0 0",lineHeight:1.3},children:"Safe oxide ranges from Digitalfire & ceramic literature"})]})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Export"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("button",{className:"reset-zoom",onClick:()=>Rt("png","stull-atlas-chart"),title:"Save chart as a high-res PNG image",children:"📷 Save Image (PNG)"}),e.jsx("button",{className:"reset-zoom",onClick:()=>Rt("svg","stull-atlas-chart"),title:"Save chart as SVG vector graphic",children:"🖼 Save Image (SVG)"}),e.jsx("button",{className:"reset-zoom",onClick:()=>pr("Stull Atlas"),title:"Print or save as PDF",children:"🖨 Print / PDF"}),x&&ue&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{borderTop:"1px solid var(--border)",margin:"4px 0",paddingTop:4},children:e.jsx("span",{style:{fontSize:10,color:"var(--text-tertiary)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em"},children:"3D Surface"})}),e.jsx("button",{className:"reset-zoom",onClick:()=>xr(ue,{zLabel:ze(g),scatterPoints:A}),title:"Export surface mesh as OBJ — opens in Blender, MeshLab, etc.",children:"🧊 Surface Mesh (OBJ)"}),e.jsx("button",{className:"reset-zoom",onClick:()=>ur(ue),title:"Export surface mesh as STL — for 3D printing or CAD tools",children:"🔺 Surface Mesh (STL)"}),e.jsx("button",{className:"reset-zoom",onClick:()=>mr(A,{zLabel:ze(g)}),title:"Export glaze scatter points as CSV with 3D coordinates",children:"📊 3D Points (CSV)"})]})]})]}),We.molarWeights&&e.jsx($r,{}),We.analysisSetPicker&&e.jsx(Dr,{}),e.jsx(wr,{}),We.filterPanel&&e.jsx(ya,{}),ut&&e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Overlays"}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,fontSize:13,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:s,onChange:r=>z(r.target.checked)}),"Density Heatmap"]})]})]}),e.jsxs("main",{className:"plot-container","aria-label":"Stull chart visualization",children:[t.active&&e.jsxs("div",{className:"kiosk-overlay",children:[e.jsxs("div",{className:"kiosk-brand",children:[e.jsx("span",{className:"kiosk-title",children:"Stull Atlas"}),e.jsx("span",{className:"kiosk-tagline",children:"Ceramic chemistry in three dimensions"})]}),e.jsx("div",{className:"kiosk-hint",children:"stullatlas.com"})]}),x?e.jsx(o.Suspense,{fallback:e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",flex:1,color:"var(--text-secondary)",fontSize:14},children:"Loading 3D view..."}),children:e.jsx(xa,{zAxis:g,colorBy:u,zoom:p,highlightPointIds:tt,highlightCircle:rt,showSurface:L,surfaceOpacity:v,showPrediction:le,cameraPreset:K,perspective:C,lightPosition:E?M:void 0,onSurfaceGridReady:Ve,autoRotate:O,autoRotateSpeed:q,pointSize:we,zStretch:ve,proximityRadius:Oe&&_?Pe:null,proximityCenterId:y,proximityWeights:fe,hoveredNeighborId:me,onProximityStats:c,onResetCamera:Be,kioskMode:t.active},ke)}):e.jsx(Nr,{xAxis:i,yAxis:l,colorBy:u,zoom:p,highlightPointIds:tt,highlightCircle:rt,densityMap:s?ut:null,showLimits:G,limitCone:G?ie:null}),x&&Oe&&_&&e.jsxs("div",{className:"proximity-floating-card",children:[e.jsxs("div",{className:"proximity-floating-header",children:[e.jsx("span",{children:"Proximity Options"}),e.jsx("button",{className:"proximity-floating-close",onClick:()=>De(!1),"aria-label":"Close proximity",children:"×"})]}),e.jsxs("div",{className:"proximity-floating-section",children:[e.jsx("label",{className:"proximity-floating-label",children:"Radius"}),e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"0.05",max:"1.5",step:"0.05",value:Pe,onChange:r=>Le(Number(r.target.value)),title:`Radius: ${(Pe*100).toFixed(0)}%`}),e.jsx("span",{className:"slider-value",children:Ne?`${Ne.visible}/${Ne.total}`:`${(Pe*100).toFixed(0)}%`})]})]}),(()=>{const r=[{label:"Balanced",title:"Equal weight on all axes",weights:{x:.5,y:.5,z:.5,cone:0,surface:0}},{label:"Chemistry Twin",title:"Prioritize SiO₂ and Al₂O₃ match",weights:{x:1,y:1,z:.3,cone:0,surface:0}},{label:"Same Surface",title:"Must match surface type",weights:{x:.3,y:.3,z:.2,cone:0,surface:1}},{label:"Same Cone",title:"Prioritize firing temperature match",weights:{x:.2,y:.2,z:.2,cone:1,surface:0}},{label:"Flux Sibling",title:"Match on Z-axis (flux/ratio)",weights:{x:.2,y:.2,z:1,cone:0,surface:0}}],R=[{key:"x",label:"SiO₂",color:"#3b82f6"},{key:"y",label:"Al₂O₃",color:"#22c55e"},{key:"z",label:ze(g),color:"#f59e0b"},{key:"cone",label:"Cone",color:"#a855f7"},{key:"surface",label:"Surface",color:"#ec4899"}],oe=Object.keys(Xe).every(F=>fe[F]===Xe[F]);return e.jsxs("div",{className:"aesthetic-compass",style:{margin:0},children:[e.jsxs("button",{className:`compass-toggle${he?" open":""}`,onClick:()=>nt(F=>!F),children:[e.jsx("span",{className:"compass-icon",children:"🧭"}),e.jsx("span",{children:"Aesthetic Compass"}),!oe&&e.jsx("span",{className:"compass-active-dot"}),e.jsx("span",{className:"compass-chevron",children:he?"▾":"▸"})]}),he&&e.jsxs("div",{className:"compass-body",children:[e.jsx("div",{className:"compass-presets",children:r.map(F=>{const je=Object.keys(F.weights).every(Q=>Math.abs(fe[Q]-F.weights[Q])<.01);return e.jsx("button",{className:`compass-preset-btn${je?" active":""}`,onClick:()=>Ce({...F.weights}),title:F.title,children:F.label},F.label)})}),e.jsx("div",{className:"compass-sliders",children:R.map(F=>e.jsxs("div",{className:"compass-slider-row",children:[e.jsx("span",{className:"compass-slider-label",style:{color:F.color},children:F.label}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:fe[F.key],onChange:je=>Ce(Q=>({...Q,[F.key]:Number(je.target.value)})),className:"compass-slider",style:{"--slider-color":F.color}}),e.jsxs("span",{className:"compass-slider-val",children:[(fe[F.key]*100).toFixed(0),"%"]})]},F.key))}),!oe&&e.jsx("button",{className:"compass-reset-btn",onClick:()=>Ce({...Xe}),children:"Reset to default"})]})]})})(),Ne&&Ne.nearby.length>0&&e.jsx(ia,{proximityStats:Ne,glazes:dt,selectedGlaze:_,pinnedCenterId:y,hoveredNeighborId:me,explorationPath:D,zAxis:g,onSelectGlaze:Ie,onCompareGlaze:Ye,onHoverNeighbor:B,onPinCenter:X,onExplorationPathChange:re})]}),!t.active&&et.total>0&&e.jsxs("div",{className:"data-count-badge",title:`${et.total.toLocaleString()} glazes in database`,children:[et.total.toLocaleString()," glazes"]})]}),st&&!t.active&&e.jsxs("aside",{className:"detail-panel","aria-label":"Glaze details",children:[e.jsx("button",{className:"close-sidebar",onClick:Qe,"aria-label":"Close sidebar",children:"×"}),e.jsxs("div",{className:"sidebar-tabs",role:"tablist","aria-label":"Detail panel views",children:[e.jsx("button",{className:`sidebar-tab ${pe==="detail"?"active":""}`,onClick:()=>Ee("detail"),role:"tab","aria-selected":pe==="detail",children:"Detail"}),e.jsxs("button",{className:`sidebar-tab ${pe==="compare"?"active":""}`,onClick:()=>Ee("compare"),role:"tab","aria-selected":pe==="compare",children:["Compare",Me.length>0?` (${Me.length})`:""]}),e.jsxs("button",{className:`sidebar-tab ${pe==="blend"?"active":""}`,onClick:()=>Ee("blend"),role:"tab","aria-selected":pe==="blend",children:["Blend",qe.length>0?` (${qe.length})`:""]}),e.jsx("button",{className:`sidebar-tab ${pe==="analysis"?"active":""}`,onClick:()=>Ee("analysis"),role:"tab","aria-selected":pe==="analysis",children:"Analysis"}),We.knowledgeTab&&e.jsx("button",{className:`sidebar-tab ${pe==="knowledge"?"active":""}`,onClick:()=>Ee("knowledge"),role:"tab","aria-selected":pe==="knowledge",title:"Ceramic knowledge from Tony Hansen's Digitalfire Reference Library",children:"Knowledge"})]}),pe==="detail"&&e.jsx(e.Fragment,{children:_?e.jsxs("div",{className:"glaze-detail",role:"tabpanel","aria-label":"Selected glaze details",children:[e.jsxs("div",{className:"sr-only","aria-live":"polite",children:["Selected: ",_.name,", Cone ",$e(Number(_.coneRange[0]))," to ",$e(Number(_.coneRange[1])),", ",_.surfaceType," surface"]}),e.jsx("h2",{children:_.name}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8},children:e.jsx(br,{glazeTypeId:_.glazeTypeId,showParent:!0})}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Source"}),e.jsx("p",{children:_.source}),_.sourceUrl&&e.jsx("a",{href:_.sourceUrl,target:"_blank",rel:"noopener noreferrer",children:"View original →"}),_.id.startsWith("glazy_")&&e.jsx("a",{href:`https://glazy.org/recipes/${_.id.replace("glazy_","")}`,target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:4,fontSize:12,marginTop:4},children:"View on Glazy →"})]}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Firing"}),e.jsx(fr,{coneRange:_.coneRange}),_.atmosphere!=="unknown"&&e.jsx("p",{style:{margin:"4px 0 0",fontSize:12,color:"var(--text-label)"},children:_.atmosphere})]}),(()=>{var oe,F;const r=_.umf;if(!r)return null;const R=[{label:"Fluxes (R₂O)",oxides:["Li2O","Na2O","K2O"]},{label:"Fluxes (RO)",oxides:["CaO","MgO","ZnO","BaO","SrO"]},{label:"Stabilizers",oxides:["Al2O3","B2O3","Fe2O3"]},{label:"Glass Formers",oxides:["SiO2","TiO2","ZrO2"]}];return e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"UMF"}),e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-start",marginBottom:8},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6,alignItems:"center"},children:[e.jsx(Qt,{umf:r,size:56}),e.jsx(jr,{x:((oe=r.SiO2)==null?void 0:oe.value)??0,y:((F=r.Al2O3)==null?void 0:F.value)??0,size:56})]}),e.jsxs("div",{style:{flex:1},children:[e.jsx(Xt,{umf:r,showLabels:!0,width:160}),e.jsx(cr,{umf:r,size:130})]})]}),e.jsx("table",{className:"recipe-table",style:{fontSize:12},children:e.jsxs("tbody",{children:[R.map(je=>{const Q=je.oxides.filter(J=>{var be;return(((be=r[J])==null?void 0:be.value)??0)>.001}).map(J=>{var be;return{ox:J,val:((be=r[J])==null?void 0:be.value)??0}});return Q.length===0?null:e.jsxs(Mt.Fragment,{children:[e.jsx("tr",{children:e.jsx("td",{colSpan:2,style:{color:"var(--text-muted)",fontSize:11,paddingTop:6},children:je.label})}),Q.map(({ox:J,val:be})=>e.jsxs("tr",{children:[e.jsx(dr,{oxide:J}),e.jsx("td",{className:"amount",children:be.toFixed(3)})]},J))]},je.label)}),r._meta&&e.jsxs(e.Fragment,{children:[e.jsx("tr",{children:e.jsx("td",{colSpan:2,style:{color:"var(--text-muted)",fontSize:11,paddingTop:6},children:"Ratios"})}),e.jsxs("tr",{children:[e.jsx("td",{children:"Si:Al"}),e.jsx("td",{className:"amount",children:r._meta.SiO2_Al2O3_ratio.toFixed(2)})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"R₂O:RO"}),e.jsx("td",{className:"amount",children:r._meta.R2O_RO_ratio.toFixed(2)})]})]})]})})]})})(),_.images&&_.images.length>0&&e.jsx(da,{images:_.images,glazeName:_.name,sidebarTab:pe}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Recipe"}),_.ingredients.length>0?e.jsxs(e.Fragment,{children:[e.jsx(yr,{ingredients:_.ingredients}),e.jsx("table",{className:"recipe-table",style:{marginTop:6},children:e.jsx("tbody",{children:_.ingredients.map((r,R)=>e.jsxs("tr",{children:[e.jsx("td",{children:r.material}),e.jsx("td",{className:"amount",children:r.amount})]},R))})})]}):e.jsx("p",{style:{color:"var(--text-muted)",fontSize:12,margin:0},children:"No recipe data available"})]}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Similar Glazes"}),e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:8},children:[e.jsx("select",{value:Y,onChange:r=>xe(Number(r.target.value)),style:{width:70,background:"var(--bg-tertiary)",border:"1px solid var(--border-primary)",borderRadius:6,color:"var(--text-label)",fontSize:12,padding:"4px 6px"},children:[3,6,9,12].map(r=>e.jsx("option",{value:r,children:r},r))}),e.jsx("button",{onClick:se,style:{background:"var(--bg-tertiary)",border:"1px solid var(--border-primary)",borderRadius:6,color:"var(--text-label)",fontSize:12,padding:"4px 8px",cursor:"pointer"},children:"Reset"})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6,marginBottom:10},children:ae.map(r=>e.jsxs("label",{style:{display:"grid",gridTemplateColumns:"58px 1fr 40px",alignItems:"center",gap:8,fontSize:12,color:"var(--text-label)"},children:[e.jsx("span",{children:r}),e.jsx("input",{type:"range",min:"0",max:"3",step:"0.25",value:U[r]??1,onChange:R=>ge(r,Number(R.target.value))}),e.jsx("span",{style:{color:"var(--text-muted)",textAlign:"right"},children:(U[r]??1).toFixed(2)})]},r))}),I.length>0?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6},children:I.map(({glaze:r,dist:R},oe)=>e.jsxs("button",{onClick:()=>Ie(r),style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 8px",background:"var(--bg-tertiary)",border:"1px solid var(--border-primary)",borderRadius:6,color:"var(--text-label)",fontSize:12,cursor:"pointer"},children:[e.jsx("span",{style:{textAlign:"left"},children:r.name}),e.jsx("span",{style:{color:"var(--text-muted)"},children:R.toFixed(2)})]},r.id))}):e.jsx("p",{style:{color:"var(--text-muted)",fontSize:12,margin:0},children:"No similar matches found"})]}),_.notes&&e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Notes"}),e.jsx("p",{children:_.notes})]}),e.jsx("button",{className:"add-compare-btn",onClick:()=>Ye(_),disabled:Me.length>=3||Me.some(r=>r.id===_.id),title:Me.some(r=>r.id===_.id)?"Already in comparison":Me.length>=3?"Max 3 glazes":"Add to comparison",children:Me.some(r=>r.id===_.id)?"✓ In Compare":"+ Add to Compare"})]}):e.jsx("div",{className:"no-selection",children:e.jsx("p",{children:"Click a point to see glaze details"})})}),pe==="compare"&&e.jsx(o.Suspense,{fallback:e.jsx("div",{style:{padding:16,fontSize:13,color:"var(--text-secondary)"},children:"Loading compare..."}),children:e.jsx(ua,{glazes:Me,onRemove:it,onClear:lt,onSelect:Ie})}),pe==="blend"&&e.jsx(o.Suspense,{fallback:e.jsx("div",{style:{padding:16,fontSize:13,color:"var(--text-secondary)"},children:"Loading blend..."}),children:e.jsx(ma,{glazes:qe,onRemove:ct,onClear:Je,onSelect:Ie})}),pe==="analysis"&&e.jsx(o.Suspense,{fallback:e.jsx("div",{style:{padding:16,fontSize:13,color:"var(--text-secondary)"},children:"Loading analysis..."}),children:e.jsx(ha,{onHighlightCluster:yt,onHighlightVoid:vt,onDensityMap:j})}),We.knowledgeTab&&pe==="knowledge"&&e.jsx(o.Suspense,{fallback:e.jsx("div",{style:{padding:16,fontSize:13,color:"var(--text-secondary)"},children:"Loading knowledge..."}),children:e.jsx(ga,{selectedGlaze:_})})]}),e.jsx("style",{children:pa})]})}function Vt(){hr("Explorer");const{isLoading:t,loadError:i,retry:n}=sr();return i?e.jsxs("div",{style:{display:"flex",flex:1,alignItems:"center",justifyContent:"center",background:"var(--bg-primary)",color:"var(--text-primary)",flexDirection:"column",gap:16,padding:40},children:[e.jsx("div",{style:{fontSize:48,opacity:.3},children:"⚗"}),e.jsx("h2",{style:{margin:0,fontSize:18},children:"Failed to load glaze dataset"}),e.jsx("p",{style:{color:"var(--text-secondary)",fontSize:14,maxWidth:400,textAlign:"center",margin:0},children:i}),e.jsx("button",{onClick:n,style:{padding:"8px 20px",background:"var(--accent-bg)",border:"1px solid var(--accent)",borderRadius:6,color:"var(--text-bright)",fontSize:14,cursor:"pointer"},children:"Retry"})]}):t?e.jsxs("div",{style:{display:"flex",flex:1,alignItems:"center",justifyContent:"center",background:"var(--bg-primary)",color:"var(--text-secondary)",flexDirection:"column",gap:16},children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{style:{fontSize:14},children:"Loading glaze dataset…"}),e.jsx("style",{children:`
          .loading-spinner {
            width: 40px; height: 40px;
            border: 3px solid var(--border-primary);
            border-top-color: var(--accent);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg) } }
        `})]}):e.jsx(va,{})}const _a=Object.freeze(Object.defineProperty({__proto__:null,ExplorerPage:Vt,default:Vt},Symbol.toStringTag,{value:"Module"}));export{fr as C,_a as E,br as G};
