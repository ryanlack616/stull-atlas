const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/plotly-gl2d-B8_X3w7e.js","assets/vendor-react-D380Hx73.js","assets/plotly-gl3d-DYPPaO4p.js","assets/ComparePanel-CYxR2KXm.js","assets/OxideRadar-BRo5lEwo.js","assets/index-CShX2zP3.js","assets/vendor-state-CUnBHQ16.js","assets/vendor-router-1trnvaIQ.js","assets/index-JM3wRy89.css","assets/OxideLink-DfHeNf4K.js","assets/domain-digitalfire-DfgmtSpv.js","assets/data-digitalfire-CCT-bSzB.js","assets/factory-BqgISpRP.js","assets/umf-Bjrc84p_.js","assets/validation-CfzxZFBo.js","assets/featureFlags-DeKxyuZW.js","assets/glazeService-07J2DCzw.js","assets/export-CZymxRhW.js","assets/usePageTitle-DBGH44HI.js","assets/index-CE_NHNbc.js","assets/index-DNJCmhuO.js"])))=>i.map(i=>d[i]);
import{r as o,j as e,R as St}from"./vendor-react-D380Hx73.js";import{d as Bt,b as _e,g as Ot,f as ht,h as Yt,_ as He,j as zt,k as be,u as Zt,l as Ut,n as qt,o as Xt,q as Qt,s as Jt}from"./index-CShX2zP3.js";import{c as Wt}from"./factory-BqgISpRP.js";import{g as mt}from"./umf-Bjrc84p_.js";import{C as er}from"./validation-CfzxZFBo.js";import{f as Ae}from"./featureFlags-DeKxyuZW.js";import{f as tr}from"./glazeService-07J2DCzw.js";import{U as Vt,F as Kt,O as rr}from"./OxideRadar-BRo5lEwo.js";import{a as ar}from"./OxideLink-DfHeNf4K.js";import{exportPlotAsImage as Nt,exportAsPrintPDF as or,exportSurfaceAsOBJ as nr,exportSurfaceAsSTL as sr,exportScatterAsCSV as lr}from"./export-CZymxRhW.js";import{u as ir}from"./usePageTitle-DBGH44HI.js";const xt=["SiO2","Al2O3","B2O3","Na2O","K2O","CaO","MgO","ZnO","SrO","BaO"];function cr(t,i){const[n,l]=o.useState(()=>xt.reduce((w,L)=>({...w,[L]:1}),{})),[c,m]=o.useState(6),[b,p]=o.useState(n),f=o.useRef();o.useEffect(()=>(f.current=setTimeout(()=>p(n),150),()=>clearTimeout(f.current)),[n]);const u=o.useCallback(()=>{const w=xt.reduce((L,S)=>({...L,[S]:1}),{});l(w),p(w)},[]),h=o.useCallback((w,L)=>{l(S=>({...S,[w]:L}))},[]);return{results:o.useMemo(()=>{if(!t)return[];const w=Array.from(i.values());return tr(t,w,{weights:b,count:c,oxides:xt})},[t,i,b,c]),weights:n,count:c,setCount:m,updateWeight:h,resetWeights:u,oxides:xt}}function Ht(t){const{atmospheres:i,surfaces:n,coneMin:l,coneMax:c,hasIngredients:m,hasImages:b,activeCount:p}=Bt(),f=_e(u=>u.glazes);return o.useMemo(()=>p===0?t:t.filter(u=>{const h=f.get(u.id);if(i.size>0){const g=(h==null?void 0:h.atmosphere)??"unknown";if(!i.has(g))return!1}return!(n.size>0&&!n.has(u.surfaceType)||l!==null&&u.cone!==null&&u.cone<l||c!==null&&u.cone!==null&&u.cone>c||m&&h&&(!h.ingredients||h.ingredients.length===0)||b&&h&&(!h.images||h.images.length===0))}),[t,i,n,l,c,m,b,p,f])}function dr({glazeTypeId:t,showParent:i=!1,size:n="md"}){if(t==null)return e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:5,padding:n==="sm"?"1px 6px":"2px 8px",borderRadius:10,background:"var(--bg-tertiary, #2a2a3a)",fontSize:n==="sm"?10:11,color:"var(--text-muted, #666)"},children:[e.jsx("span",{style:{width:n==="sm"?6:8,height:n==="sm"?6:8,borderRadius:"50%",background:"#555",flexShrink:0}}),"Unclassified"]});const l=Ot(t),c=ht(t),m=Yt(t),b=m&&m.id!==t?m.name:null;return e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:5,padding:n==="sm"?"1px 6px":"2px 8px",borderRadius:10,background:`${c}18`,border:`1px solid ${c}40`,fontSize:n==="sm"?10:11,color:"var(--text-label, #ccc)",lineHeight:1.4},children:[e.jsx("span",{style:{width:n==="sm"?6:8,height:n==="sm"?6:8,borderRadius:"50%",background:c,flexShrink:0}}),i&&b&&e.jsxs("span",{style:{color:"var(--text-muted, #666)"},children:[b," ›"]}),l]})}const Mt=[{cone:-6,label:"06",color:"#6366f1"},{cone:-5,label:"05",color:"#818cf8"},{cone:-4,label:"04",color:"#3b82f6"},{cone:-3,label:"03",color:"#06b6d4"},{cone:-2,label:"02",color:"#14b8a6"},{cone:-1,label:"01",color:"#10b981"},{cone:0,label:"0",color:"#22c55e"},{cone:1,label:"1",color:"#84cc16"},{cone:2,label:"2",color:"#a3e635"},{cone:3,label:"3",color:"#eab308"},{cone:4,label:"4",color:"#facc15"},{cone:5,label:"5",color:"#f59e0b"},{cone:6,label:"6",color:"#f97316"},{cone:7,label:"7",color:"#ef4444"},{cone:8,label:"8",color:"#dc2626"},{cone:9,label:"9",color:"#e11d48"},{cone:10,label:"10",color:"#be185d"},{cone:11,label:"11",color:"#a855f7"},{cone:12,label:"12",color:"#7c3aed"}];function Tt(t){if(typeof t=="number")return t;const i=String(t).trim().toLowerCase();return/^0\d$/.test(i)?-parseInt(i[1]):parseInt(i)||0}function pr({coneRange:t,width:i=220,height:n=20}){const l=Tt(t[0]),c=Tt(t[1]),m=Math.min(l,c),b=Math.max(l,c),p=Mt.length,f=i/p,u=10,h=u+12;return e.jsx("svg",{width:i,height:n,viewBox:`0 0 ${i} ${n}`,style:{display:"block"},"aria-label":`Firing range: cone ${t[0]} to ${t[1]}`,children:Mt.map((g,w)=>{const L=g.cone>=m&&g.cone<=b;return e.jsxs("g",{children:[e.jsx("rect",{x:w*f,y:0,width:f,height:u,fill:L?g.color:"var(--bg-tertiary, #2a2a3a)",opacity:L?.9:.3,rx:w===0||w===p-1?3:0,children:e.jsxs("title",{children:["Cone ",g.label]})}),(g.cone===m||g.cone===b||g.cone===6||g.cone===0&&!L)&&e.jsx("text",{x:w*f+f/2,y:h,textAnchor:"middle",fill:L?"var(--text-label, #ccc)":"var(--text-muted, #555)",fontSize:8,fontFamily:"system-ui, sans-serif",fontWeight:L?600:400,children:g.label})]},g.cone)})})}const Lt=["#3b82f6","#f59e0b","#22c55e","#ef4444","#8b5cf6","#06b6d4","#f97316","#14b8a6","#e11d48","#a3e635","#6366f1","#eab308"];function xr({ingredients:t,width:i=220,barHeight:n=18,gap:l=3}){const c=o.useMemo(()=>[...t.filter(h=>h.amount>0)].sort((h,g)=>g.amount-h.amount),[t]);if(c.length===0)return null;const m=c.reduce((u,h)=>u+h.amount,0),b=90,p=i-b-35,f=c.length*(n+l)-l;return e.jsx("svg",{width:i,height:f,viewBox:`0 0 ${i} ${f}`,style:{display:"block"},"aria-label":"Recipe ingredient proportions",children:c.map((u,h)=>{const g=h*(n+l),w=u.amount/m*100,L=Math.max(w/100*p,2),S=Lt[h%Lt.length];return e.jsxs("g",{children:[e.jsx("text",{x:b-4,y:g+n/2+1,textAnchor:"end",dominantBaseline:"central",fill:"var(--text-label, #aaa)",fontSize:10,fontFamily:"system-ui, sans-serif",children:u.material.length>14?u.material.slice(0,13)+"…":u.material}),e.jsx("rect",{x:b,y:g,width:p,height:n,fill:"var(--bg-tertiary, #2a2a3a)",rx:3}),e.jsx("rect",{x:b,y:g,width:L,height:n,fill:S,opacity:.8,rx:3,children:e.jsxs("title",{children:[u.material,": ",u.amount.toFixed(1)," (",w.toFixed(1),"%)"]})}),e.jsxs("text",{x:b+p+4,y:g+n/2+1,dominantBaseline:"central",fill:"var(--text-muted, #888)",fontSize:9,fontFamily:"'SF Mono', monospace",children:[w.toFixed(0),"%"]})]},`${u.material}-${h}`)})})}const _t=.5,ur=7.2,mr=0,Rt=1;function hr({x:t,y:i,comparePoint:n,size:l=80}){const c=f=>(f-_t)/(ur-_t)*l,m=f=>(Rt-f)/(Rt-mr)*l,b=c(t),p=m(i);return e.jsxs("svg",{width:l,height:l,viewBox:`0 0 ${l} ${l}`,style:{display:"block",border:"1px solid var(--border-primary, #333)",borderRadius:4,background:"var(--bg-tertiary, #1e1e2e)"},"aria-label":`Stull position: SiO₂=${t.toFixed(2)}, Al₂O₃=${i.toFixed(2)}`,children:[e.jsx("rect",{x:0,y:0,width:c(3.2),height:m(.4),fill:"rgba(139,92,246,0.1)",rx:2}),e.jsx("rect",{x:c(3.2),y:m(.4),width:l-c(3.2),height:l-m(.4),fill:"rgba(34,197,94,0.08)",rx:2}),e.jsx("line",{x1:c(1.5),y1:m(.85),x2:c(6),y2:m(.15),stroke:"var(--border-primary, #444)",strokeWidth:.8,strokeDasharray:"3,2"}),e.jsx("text",{x:l/2,y:l-2,textAnchor:"middle",fill:"var(--text-muted, #555)",fontSize:7,fontFamily:"system-ui",children:"SiO₂"}),e.jsx("text",{x:3,y:l/2,textAnchor:"start",dominantBaseline:"central",fill:"var(--text-muted, #555)",fontSize:7,fontFamily:"system-ui",transform:`rotate(-90, 6, ${l/2})`,children:"Al₂O₃"}),e.jsx("text",{x:c(2),y:m(.7),textAnchor:"middle",fill:"var(--text-muted, #444)",fontSize:7,children:"M"}),e.jsx("text",{x:c(4.5),y:m(.2),textAnchor:"middle",fill:"var(--text-muted, #444)",fontSize:7,children:"G"}),n&&e.jsx("circle",{cx:c(n.x),cy:m(n.y),r:3,fill:"none",stroke:"#ef4444",strokeWidth:1.5}),e.jsx("circle",{cx:b,cy:p,r:4,fill:"#3b82f6",stroke:"white",strokeWidth:1.5,children:e.jsxs("title",{children:["SiO₂: ",t.toFixed(2),", Al₂O₃: ",i.toFixed(2)]})})]})}function gr(){const t=_e(c=>c.glazes),[i,n]=o.useState(!1),l=o.useMemo(()=>{const c=Array.from(t.values()),m=new Map,b=new Map;for(const u of c){m.set(u.surfaceType,(m.get(u.surfaceType)??0)+1);const h=u.glazeTypeId??null;b.set(h,(b.get(h)??0)+1)}const p=[...b.entries()].filter(([u])=>u!==null).sort((u,h)=>h[1]-u[1]).slice(0,8),f=b.get(null)??0;return{total:c.length,bySurface:m,topTypes:p,unclassified:f}},[t]);return l.total===0?null:e.jsxs("div",{style:{fontSize:11,color:"var(--text-label)"},children:[e.jsxs("button",{onClick:()=>n(!i),style:{background:"none",border:"none",color:"var(--text-secondary)",cursor:"pointer",fontSize:11,padding:"4px 0",display:"flex",alignItems:"center",gap:4,width:"100%"},children:[e.jsx("span",{style:{fontSize:9},children:i?"▾":"▸"}),l.total.toLocaleString()," glazes loaded"]}),i&&e.jsxs("div",{style:{padding:"4px 0 8px 12px",display:"flex",flexDirection:"column",gap:8},children:[e.jsxs("div",{children:[e.jsx("div",{style:{color:"var(--text-muted)",marginBottom:2},children:"By surface"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"2px 8px"},children:["gloss","matte","satin","crystalline","crawl","unknown"].map(c=>{const m=l.bySurface.get(c)??0;return m===0?null:e.jsxs("span",{children:[c,": ",e.jsx("strong",{children:m})]},c)})})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"var(--text-muted)",marginBottom:2},children:"Top glaze types"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:2},children:[l.topTypes.map(([c,m])=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:ht(c),flexShrink:0}}),e.jsx("span",{style:{flex:1},children:Ot(c)}),e.jsx("span",{style:{color:"var(--text-muted)"},children:m})]},c)),l.unclassified>0&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"#555",flexShrink:0}}),e.jsx("span",{style:{flex:1,color:"var(--text-muted)"},children:"Unclassified"}),e.jsx("span",{style:{color:"var(--text-muted)"},children:l.unclassified})]})]})]})]})]})}const fr={surface:"Viridis",source:"Set1",flux_ratio:"Portland",confidence:"Greys",boron:"YlOrRd"},br=[[0,"#6366f1"],[.5/14,"#6366f1"],[.5/14,"#3b82f6"],[1.5/14,"#3b82f6"],[1.5/14,"#06b6d4"],[2.5/14,"#06b6d4"],[2.5/14,"#14b8a6"],[3.5/14,"#14b8a6"],[3.5/14,"#10b981"],[4.5/14,"#10b981"],[4.5/14,"#22c55e"],[5.5/14,"#22c55e"],[5.5/14,"#84cc16"],[6.5/14,"#84cc16"],[6.5/14,"#a3e635"],[7.5/14,"#a3e635"],[7.5/14,"#facc15"],[8.5/14,"#facc15"],[8.5/14,"#f59e0b"],[9.5/14,"#f59e0b"],[9.5/14,"#f97316"],[10.5/14,"#f97316"],[10.5/14,"#ef4444"],[11.5/14,"#ef4444"],[11.5/14,"#dc2626"],[12.5/14,"#dc2626"],[12.5/14,"#e11d48"],[13.5/14,"#e11d48"],[13.5/14,"#a855f7"],[1,"#a855f7"]],yr={unfused:{path:"M 0.5,0.39 L 2.8,1.0 L 0.5,1.0 Z",color:"rgba(120, 120, 120, 0.12)",label:"Unfused"},matte:{path:"M 0.5,0.05 L 0.5,0.39 L 2.8,1.0 L 4.0,1.0 Z",color:"rgba(76, 175, 80, 0.12)",label:"Matte"},semi_matte:{path:"M 1.2,0.242 L 4.0,1.0 L 5.0,1.0 Z",color:"rgba(139, 195, 74, 0.10)",label:"Semi-Matte"},bright_gloss:{path:"M 0.5,0.0 L 0.5,1.0 L 1.67,1.0 L 2.1,0.5 L 2.38,0.25 L 2.7,0.23 L 3.3,0.25 L 3.9,0.28 L 4.2,0.29 L 5.4,0.49 L 7.2,0.615 L 7.2,0 Z",color:"rgba(33, 150, 243, 0.08)",label:"Bright Gloss"},underfired:{path:"M 1.75,0.0 L 7.2,0.65 L 7.2,0.0 Z",color:"rgba(158, 158, 158, 0.12)",label:"Underfired"},crazed:{path:"M 0.5,0.0 L 0.5,0.05 L 1.2,0.242 L 1.75,0.0 Z",color:"rgba(244, 67, 54, 0.12)",label:"Crazed"}},Ft={path:"M 1.8,0.2 L 4.2,0.6 L 6.0,0.8 L 7.2,0.92",color:"rgba(255, 255, 255, 0.35)"},vr={1280:{path:"M 1.8 0.4 L 1.8 0.85 L 6.6 0.85 L 6.6 0.4 Z",color:"rgba(255, 255, 255, 0.4)",label:"1280°C"},1270:{path:"M 1.8 0.68 L 2.0 0.69 L 2.05 0.8 L 2.12 0.85 L 6.6 0.85 L 6.6 0.455 L 6.35 0.43 L 5.8 0.4 L 1.8 0.4 Z",color:"rgba(255, 255, 204, 0.4)",label:"1270°C"},1260:{path:"M 1.8 0.642 L 2.05 0.66 L 2.18 0.8 L 2.28 0.85 L 5.55 0.85 L 6.1 0.83 L 6.6 0.83 L 6.6 0.483 L 6.2 0.46 L 5.75 0.45 L 5.4 0.422 L 5.05 0.4 L 1.8 0.4 Z",color:"rgba(255, 255, 136, 0.4)",label:"1260°C"},1250:{path:"M 1.8 0.63 L 2.25 0.66 L 2.4 0.76 L 2.35 0.81 L 2.43 0.85 L 4.3 0.85 L 4.6 0.84 L 5.0 0.86 L 5.55 0.82 L 6.1 0.8 L 6.6 0.79 L 6.6 0.58 L 6.2 0.55 L 5.65 0.49 L 5.4 0.48 L 5.05 0.47 L 4.35 0.4 L 1.8 0.4 Z",color:"rgba(255, 255, 34, 0.4)",label:"1250°C"},1240:{path:"M 2.7 0.85 L 2.65 0.8 L 2.71 0.765 L 2.6 0.72 L 2.45 0.655 L 2.0 0.618 L 1.8 0.58 L 1.8 0.4 L 3.55 0.424 L 4.2 0.438 L 4.6 0.475 L 4.9 0.505 L 4.96 0.545 L 5.4 0.572 L 6.0 0.62 L 6.2 0.67 L 6.1 0.72 L 5.55 0.77 L 5.05 0.77 L 4.8 0.79 L 4.42 0.821 L 4.1 0.84 L 3.9 0.85 Z",color:"rgba(255, 221, 0, 0.4)",label:"1240°C"}};function kr({xAxis:t="SiO2",yAxis:i="Al2O3",colorBy:n="cone",zoom:l=1,width:c,height:m,highlightPointIds:b,highlightCircle:p,densityMap:f,showLimits:u=!1,limitCone:h=null}){const[g,w]=o.useState(null),[L,S]=o.useState(!1),[k,B]=o.useState(!1),[ne,F]=o.useState(0);o.useEffect(()=>{let d=!0;S(!1),B(!1);const y=setTimeout(()=>{d&&B(!0)},12e3);return He(()=>import("./plotly-gl2d-B8_X3w7e.js").then(G=>G.p),__vite__mapDeps([0,1])).then(G=>{if(!d)return;clearTimeout(y);const xe=Wt(G.default??G);w(()=>xe)}).catch(()=>{d&&(clearTimeout(y),S(!0))}),()=>{d=!1,clearTimeout(y)}},[ne]);const K=_e(d=>d.getPlotPoints),A=zt(d=>d.currentSetId),W=be(d=>d.selectedGlaze),H=be(d=>d.setSelectedGlaze),se=be(d=>d.setHoveredPoint),re=be(d=>d.selectedForBlend),Z=Zt(d=>d.blendResults),Y=Ut(d=>d.theme),v=o.useMemo(()=>{const d=Y==="dark";return{paper:d?"#1a1a1a":"#ffffff",plot:d?"#1e1e1e":"#f8f8f8",grid:d?"#333":"#ddd",zeroline:d?"#444":"#ccc",axisTitle:d?"#aaa":"#555",tick:d?"#888":"#666",font:d?"#ccc":"#333",regionLabel:d?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.18)",regionLabelStrong:d?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.22)",qLabel:d?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.3)",tempLabel:d?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.4)",coneBorder:d?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.07)",limitFill:d?"rgba(59,130,246,0.12)":"rgba(59,130,246,0.08)",limitBorder:d?"rgba(59,130,246,0.5)":"rgba(59,130,246,0.4)",limitLabel:d?"rgba(59,130,246,0.7)":"rgba(59,130,246,0.6)",limitDimBorder:d?"rgba(150,150,150,0.15)":"rgba(100,100,100,0.12)"}},[Y]),T=o.useMemo(()=>{if(!u)return{shapes:[],annotations:[]};const d=J=>({SiO2:"SiO2",Al2O3:"Al2O3",B2O3:"B2O3",Na2O:"KNaO",K2O:"KNaO",CaO:"CaO",MgO:"MgO",ZnO:"ZnO",BaO:"BaO"})[J]??null,y=d(t),G=d(i);if(!y||!G)return{shapes:[],annotations:[]};const xe=[],P=[],D=h||null;for(const J of er){const je=J[y],ze=J[G];if(!je||!ze)continue;const ce=D===J.cone;xe.push({type:"rect",x0:je.min,x1:je.max,y0:ze.min,y1:ze.max,fillcolor:ce?v.limitFill:"transparent",line:{color:ce?v.limitBorder:v.limitDimBorder,width:ce?2:1,dash:ce?"solid":"dot"},layer:"below"}),P.push({x:je.max,y:ze.max,text:`▲${J.cone}`,showarrow:!1,font:{color:ce?v.limitBorder:v.limitDimBorder,size:ce?11:9},xanchor:"right",yanchor:"bottom"})}return{shapes:xe,annotations:P}},[u,h,t,i,v]),X=o.useMemo(()=>K(A),[K,A]),V=Ht(X),ae=o.useMemo(()=>{if(Z.length===0)return null;const d=Z.map(xe=>mt(xe.umf,t)),y=Z.map(xe=>mt(xe.umf,i)),G=Z.map((xe,P)=>{var D;return((D=xe.recipe)==null?void 0:D.name)||`Blend ${P+1}`});return{type:"scattergl",mode:"markers",x:d,y,text:G,name:"Blend Results",marker:{size:8,symbol:"diamond",color:"#ff9800",opacity:.9,line:{width:1,color:"#fff"}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>${t}: %{x:.2f}<br>${i}: %{y:.2f}<extra>Blend</extra>`}},[Z,t,i]),x=o.useMemo(()=>{if(!p)return null;const{x:d,y,r:G}=p;return{type:"circle",xref:"x",yref:"y",x0:d-G,y0:y-G,x1:d+G,y1:y+G,fillcolor:"rgba(244, 67, 54, 0.08)",line:{color:"rgba(244, 67, 54, 0.5)",width:2,dash:"dash"},layer:"above"}},[p]),N=o.useMemo(()=>V.filter(d=>d.x!=null&&d.y!=null&&!isNaN(d.x)&&!isNaN(d.y)&&d.x>0&&d.y>0&&d.cone!=null&&d.cone>=-4&&d.cone<=10),[V]),O=o.useMemo(()=>{if(!b||b.length===0)return null;const d=N.filter(y=>b.includes(y.id));return d.length===0?null:{type:"scattergl",mode:"markers",x:d.map(y=>y.x),y:d.map(y=>y.y),text:d.map(y=>y.name),name:"Highlighted",marker:{size:10,symbol:"circle",color:"rgba(255, 235, 59, 0.8)",line:{width:2,color:"#fff"}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>${t}: %{x:.2f}<br>${i}: %{y:.2f}<extra>Cluster</extra>`}},[b,N,t,i]),R=o.useMemo(()=>{if(!f||f.grid.length===0)return null;const{grid:d,bounds:y,resolution:G}=f,xe=Array.from({length:G},(D,J)=>y.xMin+J/(G-1)*(y.xMax-y.xMin)),P=Array.from({length:d.length},(D,J)=>y.yMin+J/(d.length-1)*(y.yMax-y.yMin));return{type:"contour",x:xe,y:P,z:d,name:"Density",showscale:!1,contours:{coloring:"heatmap"},colorscale:[[0,"rgba(0,0,0,0)"],[.2,"rgba(33,150,243,0.08)"],[.4,"rgba(33,150,243,0.15)"],[.6,"rgba(255,235,59,0.2)"],[.8,"rgba(255,152,0,0.25)"],[1,"rgba(244,67,54,0.3)"]],hoverinfo:"skip"}},[f]),U=o.useMemo(()=>n==="glaze_type"?N.map(d=>ht(d.glazeTypeId)):N.map(d=>{switch(n){case"cone":return d.cone??6;case"surface":return jr(d.surfaceType);case"source":return wr(d.source);case"flux_ratio":return d.fluxRatio;case"confidence":return Sr(d.confidence);case"boron":return d.boron;default:return 0}}),[N,n]),Q=o.useMemo(()=>({type:"scattergl",mode:"markers",x:N.map(d=>d.x),y:N.map(d=>d.y),customdata:N.map(d=>d.id),text:N.map(d=>d.name),marker:{size:5,opacity:.7,color:U,...n==="glaze_type"?{}:{colorscale:n==="cone"?br:fr[n]||"Viridis",reversescale:!1,cmin:n==="cone"?-6:void 0,cmax:n==="cone"?12:void 0,colorbar:{title:Or(n),thickness:15,len:.7,tickvals:n==="cone"?[-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12]:void 0,ticktext:n==="cone"?["04","03","02","01","0","1","2","3","4","5","6","7","8","9","10"]:void 0}},line:{width:N.map(d=>(W==null?void 0:W.id)===d.id?2:re.some(y=>y.id===d.id)?1.5:0),color:N.map(d=>(W==null?void 0:W.id)===d.id?"white":re.some(y=>y.id===d.id)?"orange":"transparent")}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>${t}: %{x:.2f}<br>${i}: %{y:.2f}<br>`+(n==="glaze_type"?"%{meta}<br>":"")+"<extra></extra>",meta:n==="glaze_type"?N.map(d=>Ot(d.glazeTypeId)):void 0}),[N,U,n,t,i,W,re]),ie=3.85,ye=.5,ve=3.35/l,he=.5/l,Ee=o.useMemo(()=>({xaxis:{title:{text:t,font:{color:v.axisTitle}},range:[ie-ve,ie+ve],gridcolor:v.grid,zerolinecolor:v.zeroline,tickfont:{color:v.tick}},yaxis:{title:{text:i,font:{color:v.axisTitle}},range:[ye-he,ye+he],gridcolor:v.grid,zerolinecolor:v.zeroline,tickfont:{color:v.tick}},paper_bgcolor:v.paper,plot_bgcolor:v.plot,font:{color:v.font},dragmode:"pan",hovermode:"closest",margin:{l:60,r:30,t:30,b:60},annotations:[{x:1.5,y:.75,text:"UNFUSED",showarrow:!1,font:{color:v.regionLabel,size:11},textangle:-35},{x:2.3,y:.55,text:"MATTE",showarrow:!1,font:{color:v.regionLabelStrong,size:12},textangle:-35},{x:3.4,y:.65,text:"SEMI-MATTE",showarrow:!1,font:{color:v.regionLabel,size:10},textangle:-30},{x:4.5,y:.25,text:"BRIGHT GLOSS",showarrow:!1,font:{color:v.regionLabel,size:11}},{x:5,y:.1,text:"UNDERFIRED",showarrow:!1,font:{color:v.regionLabelStrong,size:10},textangle:-15},{x:1.2,y:.08,text:"CRAZED",showarrow:!1,font:{color:v.regionLabelStrong,size:10}},{x:6.8,y:.88,text:"Q",showarrow:!1,font:{color:v.qLabel,size:11,family:"serif"}},...Ae.tempContours?[{x:6.4,y:.42,text:"1280°C",showarrow:!1,font:{color:v.tempLabel,size:9}},{x:6.4,y:.48,text:"1270°C",showarrow:!1,font:{color:"rgba(255,255,204,0.6)",size:9}},{x:6.4,y:.52,text:"1260°C",showarrow:!1,font:{color:"rgba(255,255,136,0.7)",size:9}},{x:6.4,y:.6,text:"1250°C",showarrow:!1,font:{color:"rgba(255,255,34,0.7)",size:9}},{x:5.9,y:.68,text:"1240°C",showarrow:!1,font:{color:"rgba(255,221,0,0.8)",size:9}}]:[],...T.annotations],shapes:[...Object.values(yr).map(d=>({type:"path",path:d.path,fillcolor:d.color,line:{width:0},layer:"below"})),{type:"path",path:Ft.path,fillcolor:"transparent",line:{color:Ft.color,width:1.5,dash:"dot"},layer:"below"},...Ae.tempContours?Object.values(vr).map(d=>({type:"path",path:d.path,fillcolor:"transparent",line:{color:d.color,width:1},layer:"below"})):[],...T.shapes,...x?[x]:[]]}),[t,i,ve,he,x,v,T]),Ne=o.useCallback(d=>{var G;const y=(G=d.points)==null?void 0:G[0];if(y!=null&&y.customdata){const P=_e.getState().glazes.get(y.customdata);P&&H(P)}},[H]),Me=o.useCallback(d=>{var G;const y=(G=d.points)==null?void 0:G[0];y&&se({id:y.customdata,name:y.text,source:"unknown",x:y.x,y:y.y,cone:null,surfaceType:"unknown",fluxRatio:0,boron:0,confidence:"inferred",glazeTypeId:null})},[se]),$e={displayModeBar:!0,modeBarButtonsToRemove:["select2d","lasso2d","autoScale2d"],scrollZoom:!0,doubleClick:"reset"};return g?e.jsx(g,{data:[...R?[R]:[],Q,...ae?[ae]:[],...O?[O]:[]],layout:Ee,config:$e,onClick:Ne,onHover:Me,useResizeHandler:!0,style:{width:c||"100%",height:m||"100%"}}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,width:c||"100%",height:m||"100%",color:"#777",fontSize:13,background:"var(--bg-secondary, #1a1a1a)",borderRadius:8,...L?{}:{animation:"pulse 1.5s ease-in-out infinite"}},children:[e.jsx("style",{children:"@keyframes pulse { 0%,100% { opacity: 0.6 } 50% { opacity: 1 } }"}),L?e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{fontSize:22},children:"⚠"}),e.jsx("span",{children:"Chart engine failed to load"}),e.jsx("button",{onClick:()=>F(d=>d+1),style:{marginTop:4,padding:"6px 16px",borderRadius:6,border:"1px solid #555",background:"var(--bg-tertiary, #252525)",color:"#ccc",cursor:"pointer",fontSize:13},children:"Tap to retry"})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Loading chart engine…"}),k&&e.jsx("span",{style:{fontSize:11,color:"#666"},children:"Slow connection — still trying…"})]})]})}function jr(t){return{matte:1,satin:2,gloss:3,crystalline:4,crawl:5,unknown:0}[t]??0}function wr(t){return{glazy:1,digitalfire:2,user:3,calculated:4}[t]??0}function Sr(t){return{unknown:0,assumed:1,inferred:2,declared:3,verified:4}[t]??0}function Or(t){return{cone:"Cone",surface:"Surface",source:"Source",flux_ratio:"R2O:RO",confidence:"Confidence",boron:"B2O3"}[t]||t}const zr="https://iupac.org/what-we-do/periodic-table-of-elements/",Cr="https://www.ciaaw.org/atomic-weights.htm",Nr=[{label:"Fluxes (R₂O)",oxides:["Li2O","Na2O","K2O"]},{label:"Fluxes (RO)",oxides:["MgO","CaO","SrO","BaO","ZnO","PbO"]},{label:"Stabilizers (R₂O₃)",oxides:["Al2O3","B2O3","Fe2O3"]},{label:"Glass Formers (RO₂)",oxides:["SiO2","TiO2","ZrO2","SnO2"]},{label:"Colorants / Other",oxides:["MnO","MnO2","NiO","CuO","Cu2O","CoO","Cr2O3","P2O5","F"]}],Mr=["₀","₁","₂","₃","₄","₅","₆","₇","₈","₉"];function Tr(t){return t.replace(/\d/g,i=>Mr[parseInt(i)])}function Lr(){const{currentSetId:t,availableSets:i,setMolarWeightSet:n}=zt(),[l,c]=o.useState(!1),m=o.useMemo(()=>i.find(p=>p.id===t),[i,t]),b=o.useMemo(()=>qt(t),[t]);return e.jsxs("div",{className:"molar-set-picker",children:[e.jsxs("div",{className:"molar-header",children:[e.jsx("h3",{children:"Molar Weights"}),e.jsx("button",{className:"molar-info-toggle",onClick:()=>c(!l),title:l?"Hide weight table":"Show all molecular weights",children:l?"▾":"ⓘ"})]}),e.jsx("div",{className:"molar-set-buttons",children:i.map(p=>e.jsxs("button",{className:`molar-set-button ${t===p.id?"active":""}`,onClick:()=>n(p.id),title:p.notes,children:[e.jsx("span",{className:"molar-set-name",children:p.name}),p.year&&e.jsx("span",{className:"molar-set-year",children:p.year})]},p.id))}),e.jsxs("div",{className:"molar-source-info",children:[e.jsxs("p",{className:"molar-source-text",children:["Default: ",e.jsx("strong",{children:"IUPAC 2023"})," Standard Atomic Weights with 2024 revisions (Gd, Lu, Zr)."]}),e.jsxs("div",{className:"molar-source-links",children:[e.jsx("a",{href:zr,target:"_blank",rel:"noopener noreferrer",children:"IUPAC Periodic Table"}),e.jsx("span",{className:"molar-link-sep",children:"·"}),e.jsx("a",{href:Cr,target:"_blank",rel:"noopener noreferrer",children:"CIAAW Atomic Weights"})]})]}),l&&e.jsxs("div",{className:"molar-weight-table",children:[e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Oxide"}),e.jsx("th",{children:"g/mol"})]})}),e.jsx("tbody",{children:Nr.map(p=>e.jsxs(St.Fragment,{children:[e.jsx("tr",{className:"molar-group-header",children:e.jsx("td",{colSpan:2,children:p.label})}),p.oxides.map(f=>{var u;return e.jsxs("tr",{children:[e.jsx("td",{className:"molar-oxide-name",children:Tr(f)}),e.jsx("td",{className:"molar-oxide-value",children:((u=b[f])==null?void 0:u.toFixed(4))??"—"})]},f)})]},p.label))})]}),e.jsxs("p",{className:"molar-table-note",children:["Active set: ",(m==null?void 0:m.name)??t,(m==null?void 0:m.notes)&&e.jsxs(e.Fragment,{children:[e.jsx("br",{}),m.notes]})]})]}),e.jsx("style",{children:`
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
      `})]})}function _r(){const{currentSetId:t,availableSets:i,setAnalysisSet:n}=Xt(),[l,c]=o.useState(!1),m=i.find(p=>p.id===t),b=i.filter(p=>p.status==="populated"||p.id==="app_default");return b.length<=1?null:e.jsxs("div",{className:"analysis-set-picker",children:[e.jsxs("div",{className:"analysis-header",children:[e.jsx("h3",{children:"Material Analyses"}),e.jsx("button",{className:"analysis-info-toggle",onClick:()=>c(!l),title:l?"Hide details":"Show source details",children:l?"▾":"ⓘ"})]}),e.jsx("div",{className:"analysis-set-buttons",children:b.map(p=>e.jsxs("button",{className:`analysis-set-button ${t===p.id?"active":""}`,onClick:()=>n(p.id),title:p.notes,children:[e.jsx("span",{className:"analysis-set-name",children:p.name}),e.jsxs("span",{className:"analysis-set-meta",children:[p.year&&e.jsx("span",{className:"analysis-set-year",children:p.year}),p.materialCount>0&&e.jsxs("span",{className:"analysis-set-count",children:[p.materialCount," mat",p.materialCount!==1?"s":""]})]})]},p.id))}),e.jsxs("div",{className:"analysis-source-info",children:[e.jsx("p",{className:"analysis-source-text",children:(m==null?void 0:m.id)==="app_default"?e.jsxs(e.Fragment,{children:["Default: ",e.jsx("strong",{children:"Stull Atlas built-in"})," analyses from"," ",e.jsx("a",{href:"https://digitalfire.com",target:"_blank",rel:"noopener noreferrer",children:"Digitalfire"}),", verified Feb 2026."]}):e.jsxs(e.Fragment,{children:["Active: ",e.jsx("strong",{children:m==null?void 0:m.name}),(m==null?void 0:m.authority)&&e.jsxs(e.Fragment,{children:[" — ",m.authority]})]})}),m&&m.materialCount>0&&m.id!=="app_default"&&e.jsxs("p",{className:"analysis-override-note",children:[m.materialCount," material",m.materialCount!==1?"s":""," overridden — all others use default values."]})]}),l&&e.jsx("div",{className:"analysis-details",children:b.map(p=>e.jsxs("div",{className:"analysis-detail-row",children:[e.jsxs("div",{className:"analysis-detail-header",children:[e.jsx("strong",{children:p.name}),e.jsx("span",{className:"analysis-detail-year",children:p.year})]}),e.jsxs("div",{className:"analysis-detail-meta",children:[p.source,p.authority&&e.jsxs(e.Fragment,{children:[" — ",p.authority]})]}),p.notes&&e.jsx("div",{className:"analysis-detail-notes",children:p.notes})]},p.id))}),e.jsx("p",{className:"analysis-thanks",children:"Thanks, Tony"}),e.jsx("style",{children:`
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
      `})]})}function Rr(t,i){return Math.exp(-t/(2*i))}function Fr(t,i,n){const l=t.length;if(l<4)return .3;const c=i[1]-i[0]||1,m=n[1]-n[0]||1,b=t.map(S=>(S.x-i[0])/c),p=t.map(S=>(S.y-n[0])/m),f=b.reduce((S,k)=>S+k,0)/l,u=p.reduce((S,k)=>S+k,0)/l,h=Math.sqrt(b.reduce((S,k)=>S+(k-f)**2,0)/l)||.1,g=Math.sqrt(p.reduce((S,k)=>S+(k-u)**2,0)/l)||.1,L=1.4*((h+g)/2)*Math.pow(l,-.2);return Math.max(L,.03)}function Pr(t,i){const{xRange:n,yRange:l,resolution:c=35,minWeight:m=.5}=i,b=i.bandwidth??Fr(t,n,l),p=n[1]-n[0],f=l[1]-l[0],u=Array.from({length:c},(A,W)=>n[0]+W/(c-1)*p),h=Array.from({length:c},(A,W)=>l[0]+W/(c-1)*f),g=1/(p||1),w=1/(f||1),L=b*b,S=t.filter(A=>isFinite(A.z)&&!isNaN(A.z)).map(A=>({nx:(A.x-n[0])*g,ny:(A.y-l[0])*w,z:A.z}));if(S.length===0)return{xCoords:u,yCoords:h,z:h.map(()=>u.map(()=>null)),stats:{validCells:0,totalCells:c*c,zMin:0,zMax:0,zMean:0}};const k=[];let B=0,ne=1/0,F=-1/0,K=0;for(let A=0;A<c;A++){const W=[],H=(h[A]-l[0])*w;for(let se=0;se<c;se++){const re=(u[se]-n[0])*g;let Z=0,Y=0;for(const v of S){const T=re-v.nx,X=H-v.ny,V=T*T+X*X,ae=Rr(V,L);Z+=ae*v.z,Y+=ae}if(Y>=m){const v=Z/Y;W.push(v),B++,v<ne&&(ne=v),v>F&&(F=v),K+=v}else W.push(null)}k.push(W)}return{xCoords:u,yCoords:h,z:k,stats:{validCells:B,totalCells:c*c,zMin:B>0?ne:0,zMax:B>0?F:0,zMean:B>0?K/B:0}}}function Ar(t,i){return Math.exp(-t/(2*i))}function Er(t,i,n){const l=t.length;if(l<4)return .3;const c=i[1]-i[0]||1,m=n[1]-n[0]||1,b=t.map(S=>(S.x-i[0])/c),p=t.map(S=>(S.y-n[0])/m),f=b.reduce((S,k)=>S+k,0)/l,u=p.reduce((S,k)=>S+k,0)/l,h=Math.sqrt(b.reduce((S,k)=>S+(k-f)**2,0)/l)||.1,g=Math.sqrt(p.reduce((S,k)=>S+(k-u)**2,0)/l)||.1,L=1.6*((h+g)/2)*Math.pow(l,-.2);return Math.max(L,.03)}const $r=["gloss","matte","satin","crystalline","crawl"];function Dr(t,i){const{xRange:n,yRange:l,resolution:c=30,minWeight:m=.3,minConfidence:b=.3}=i,p=i.bandwidth??Er(t,n,l),f=n[1]-n[0],u=l[1]-l[0],h=Array.from({length:c},(K,A)=>n[0]+A/(c-1)*f),g=Array.from({length:c},(K,A)=>l[0]+A/(c-1)*u),w=1/(f||1),L=1/(u||1),S=p*p,k=t.filter(K=>K.surfaceType&&K.surfaceType!=="unknown").map(K=>({nx:(K.x-n[0])*w,ny:(K.y-l[0])*L,type:K.surfaceType}));if(k.length===0)return{xCoords:h,yCoords:g,cells:g.map(()=>h.map(()=>null)),stats:{validCells:0,totalCells:c*c,typeCounts:{}}};const B=[];let ne=0;const F={};for(let K=0;K<c;K++){const A=[],W=(g[K]-l[0])*L;for(let H=0;H<c;H++){const se=(h[H]-n[0])*w,re={};let Z=0;for(const Y of k){const v=se-Y.nx,T=W-Y.ny,X=v*v+T*T,V=Ar(X,S);re[Y.type]=(re[Y.type]??0)+V,Z+=V}if(Z>=m){let Y="unknown",v=0;for(const X of $r){const V=re[X]??0;V>v&&(v=V,Y=X)}const T=Z>0?v/Z:0;T>=b?(A.push({type:Y,confidence:T,votes:re}),ne++,F[Y]=(F[Y]??0)+1):A.push(null)}else A.push(null)}B.push(A)}return{xCoords:h,yCoords:g,cells:B,stats:{validCells:ne,totalCells:c*c,typeCounts:F}}}const Ir={gloss:"#3b82f6",matte:"#22c55e",satin:"#f59e0b",crystalline:"#a855f7",crawl:"#ef4444",unknown:"#6b7280"},Pt=(t,i)=>{const n=Ir[t]??"#6b7280",l=parseInt(n.slice(1,3),16),c=parseInt(n.slice(3,5),16),m=parseInt(n.slice(5,7),16);return`rgba(${l}, ${c}, ${m}, ${i})`},Br=[["SiO2",2,.48],["Al2O3",3,.6],["B2O3",3,.42],["Na2O",1,1.15],["K2O",1,1.4],["Li2O",1,1],["CaO",1,1],["MgO",1,.78],["BaO",1,1.15],["SrO",1,1.1],["ZnO",1,.92],["PbO",1,1.15],["Fe2O3",3,.75],["TiO2",2,.61],["ZrO2",2,.55],["MnO",1,.95],["NiO",1,.9],["CuO",1,.9],["CoO",1,.9],["Cr2O3",3,.65],["P2O5",5,.4]],Zr=[["SiO2",1,1.57],["Al2O3",2,.84],["B2O3",2,1.34],["Na2O",2,.19],["K2O",2,.13],["Li2O",2,.23],["CaO",1,.33],["MgO",1,.45],["BaO",1,.24],["SrO",1,.28],["ZnO",1,.4],["PbO",1,.27],["Fe2O3",2,.73],["TiO2",1,1.19]];function wt(t,i,n){var Y;if(i==="cone")return n??6;if(!t)return 0;const l=v=>{var T;return((T=t==null?void 0:t[v])==null?void 0:T.value)??0},c=l("SiO2"),m=l("Al2O3"),b=l("B2O3"),p=l("Na2O"),f=l("K2O"),u=l("Li2O"),h=l("CaO"),g=l("MgO"),w=l("ZnO"),L=l("BaO"),S=l("SrO"),k=l("PbO"),B=l("Fe2O3"),ne=l("TiO2"),F=l("MnO"),K=l("NiO"),A=l("CuO"),W=l("CoO"),H=l("Cr2O3");l("P2O5");const se=p+f+u,re=h+g+w+L+S+k,Z=se+re;switch(i){case"flux_ratio":return Z>0?se/Z:0;case"SiO2_Al2O3_ratio":return m>0?c/m:0;case"total_flux_moles":return((Y=t._meta)==null?void 0:Y.totalFluxMoles)??0;case"thermal_expansion":return p*33.3+f*28.3+u*27+h*16.3+g*4.5+w*7+L*14+S*12+b*-5+m*5+c*3.8;case"nbo_t":{const v=c+2*m;return v>0?Math.max(0,2*(Z-m))/v:0}case"optical_basicity":{let v=0,T=0;for(const[X,V,ae]of Br){const x=l(X);v+=x*V*ae,T+=x*V}return T>0?v/T:0}case"flux_entropy":{const v=[p,f,u,h,g,w,L,S,k].filter(V=>V>0),T=v.reduce((V,ae)=>V+ae,0);if(T<=0)return 0;let X=0;for(const V of v){const ae=V/T;X-=ae*Math.log(ae)}return X}case"cao_mgo_ratio":return h+g>0?h/(h+g):.5;case"combined_alkali":return se;case"na2o_k2o_ratio":return p+f>0?p/(p+f):.5;case"viscosity_index":return Z>0?(c+m)/Z:0;case"surface_tension":{let v=0,T=0;for(const[X,V,ae]of Zr){const x=l(X);v+=x*V*ae,T+=x*V}return T>0?v/T:0}case"durability":return se>.001?c/se:c*100;case"total_colorant":return B+A+W+F+K+H+ne;case"fe_ti_ratio":return B+ne>0?B/(B+ne):.5;default:return l(i)}}const Ke={x:.5,y:.5,z:.5,cone:0,surface:0},Gt=[[0,"#6366f1"],[.5/14,"#6366f1"],[.5/14,"#3b82f6"],[1.5/14,"#3b82f6"],[1.5/14,"#06b6d4"],[2.5/14,"#06b6d4"],[2.5/14,"#14b8a6"],[3.5/14,"#14b8a6"],[3.5/14,"#10b981"],[4.5/14,"#10b981"],[4.5/14,"#22c55e"],[5.5/14,"#22c55e"],[5.5/14,"#84cc16"],[6.5/14,"#84cc16"],[6.5/14,"#a3e635"],[7.5/14,"#a3e635"],[7.5/14,"#facc15"],[8.5/14,"#facc15"],[8.5/14,"#f59e0b"],[9.5/14,"#f59e0b"],[9.5/14,"#f97316"],[10.5/14,"#f97316"],[10.5/14,"#ef4444"],[11.5/14,"#ef4444"],[11.5/14,"#dc2626"],[12.5/14,"#dc2626"],[12.5/14,"#e11d48"],[13.5/14,"#e11d48"],[13.5/14,"#a855f7"],[1,"#a855f7"]],Ur={cone:Gt,surface:"Viridis",source:"Set1",flux_ratio:"Portland",confidence:"Greys",boron:"YlOrRd",z_axis:"Viridis"},Wr={default:t=>({eye:{x:1.5/t,y:-1.8/t,z:1.2/t},up:{x:0,y:0,z:1}}),top:t=>({eye:{x:.001,y:-.001,z:3/t},up:{x:0,y:1,z:0}}),"side-x":t=>({eye:{x:0,y:-3/t,z:.5/t},up:{x:0,y:0,z:1}}),"side-y":t=>({eye:{x:3/t,y:0,z:.5/t},up:{x:0,y:0,z:1}})};function Vr(t){return[{name:"Unfused",vertices:[[.5,.39],[2.8,1],[.5,1]],triangles:[[0,1,2]],color:"rgba(120, 120, 120, 0.15)"},{name:"Matte",vertices:[[.5,.05],[.5,.39],[2.8,1],[4,1]],triangles:[[0,1,2],[0,2,3]],color:"rgba(76, 175, 80, 0.15)"},{name:"Semi-Matte",vertices:[[1.2,.242],[4,1],[5,1]],triangles:[[0,1,2]],color:"rgba(139, 195, 74, 0.12)"},{name:"Crazed",vertices:[[.5,0],[.5,.05],[1.2,.242],[1.75,0]],triangles:[[0,1,2],[0,2,3]],color:"rgba(244, 67, 54, 0.15)"},{name:"Underfired",vertices:[[1.75,0],[7.2,.65],[7.2,0]],triangles:[[0,1,2]],color:"rgba(158, 158, 158, 0.15)"},{name:"Bright Gloss",vertices:[[.5,0],[.5,.05],[1.2,.242],[1.75,0],[2.7,.23],[3.3,.25],[3.9,.28],[4.2,.29],[5.4,.49],[7.2,.615],[7.2,0]],triangles:[[0,3,10],[3,4,10],[4,5,10],[5,6,10],[6,7,10],[7,8,10],[8,9,10]],color:"rgba(33, 150, 243, 0.10)"}].map(n=>{const l=[],c=[],m=[],b=[],p=[],f=[];for(const u of n.vertices)l.push(u[0]),c.push(u[1]),m.push(t);for(const u of n.triangles)b.push(u[0]),p.push(u[1]),f.push(u[2]);return{type:"mesh3d",x:l,y:c,z:m,i:b,j:p,k:f,color:n.color,opacity:.3,flatshading:!0,hoverinfo:"text",hovertext:n.name,name:n.name,showlegend:!1,lighting:{ambient:1,diffuse:0,specular:0}}})}function Kr(t,i){return[{label:"1280°C",vertices:[[1.8,.4],[1.8,.85],[6.6,.85],[6.6,.4]],triangles:[[0,1,2],[0,2,3]],color:i?"rgba(239, 68, 68, 0.06)":"rgba(239, 68, 68, 0.04)"},{label:"1260°C",vertices:[[2,.45],[2,.8],[6.2,.8],[6.2,.45]],triangles:[[0,1,2],[0,2,3]],color:i?"rgba(245, 158, 11, 0.06)":"rgba(245, 158, 11, 0.04)"},{label:"1240°C",vertices:[[2.4,.5],[2.4,.75],[5.8,.75],[5.8,.5]],triangles:[[0,1,2],[0,2,3]],color:i?"rgba(234, 179, 8, 0.06)":"rgba(234, 179, 8, 0.04)"}].map(l=>{const c=[],m=[],b=[],p=[],f=[],u=[];for(const h of l.vertices)c.push(h[0]),m.push(h[1]),b.push(t);for(const h of l.triangles)p.push(h[0]),f.push(h[1]),u.push(h[2]);return{type:"mesh3d",x:c,y:m,z:b,i:p,j:f,k:u,color:l.color,opacity:.5,flatshading:!0,hoverinfo:"text",hovertext:l.label,name:l.label,showlegend:!1,lighting:{ambient:1,diffuse:0,specular:0}}})}function Hr(t){return{type:"scatter3d",mode:"lines",x:[1.8,4.2,6,7.2],y:[.2,.6,.8,.92],z:[t,t,t,t],line:{color:"rgba(255, 255, 255, 0.4)",width:3,dash:"dot"},hoverinfo:"text",hovertext:"Q-line",name:"Q-line",showlegend:!1}}function Gr(t,i,n,l,c){return{type:"surface",x:t.xCoords,y:t.yCoords,z:t.z,opacity:n,colorscale:"Viridis",showscale:!1,hoverinfo:"z",hovertemplate:`${Oe(i)}: %{z:.3f}<extra>Surface</extra>`,name:"Fitted Surface",showlegend:!1,contours:{z:{show:!0,usecolormap:!0,highlightcolor:l?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.2)",project:{z:!0}}},lighting:c?{ambient:.5,diffuse:.8,specular:.4,roughness:.4,fresnel:.2}:{ambient:.8,diffuse:.3,specular:.15,roughness:.6},lightposition:c?{x:c.x*1e5,y:c.y*1e5,z:c.z*1e5}:{x:0,y:0,z:1e4}}}function Yr(t,i,n,l){const m=[],b=[],p=[];for(let f=0;f<=32;f++){const u=f/32*Math.PI*2;m.push(t.x+i*Math.cos(u)),b.push(t.y+i*Math.sin(u)),p.push(n)}m.push(null),b.push(null),p.push(null);for(let f=0;f<=32;f++){const u=f/32*Math.PI*2;m.push(t.x+i*Math.cos(u)),b.push(t.y+i*Math.sin(u)),p.push(l)}m.push(null),b.push(null),p.push(null);for(let f=0;f<4;f++){const u=f/4*Math.PI*2,h=t.x+i*Math.cos(u),g=t.y+i*Math.sin(u);m.push(h,h,null),b.push(g,g,null),p.push(n,l,null)}return{type:"scatter3d",mode:"lines",x:m,y:b,z:p,line:{color:"rgba(244, 67, 54, 0.5)",width:2,dash:"dash"},hoverinfo:"text",hovertext:"Void region",name:"Void",showlegend:!1}}function At({zAxis:t="B2O3",colorBy:i="cone",zoom:n=1,width:l,height:c,highlightPointIds:m,highlightCircle:b,showSurface:p=!0,surfaceOpacity:f=.35,showPrediction:u=!1,cameraPreset:h="default",perspective:g=.5,lightPosition:w,onSurfaceGridReady:L,autoRotate:S=!1,autoRotateSpeed:k=.5,pointSize:B=2.5,zStretch:ne=.8,proximityRadius:F=null,proximityCenterId:K=null,proximityWeights:A=Ke,hoveredNeighborId:W=null,onProximityStats:H,onResetCamera:se,kioskMode:re=!1}){const[Z,Y]=o.useState(null),[v,T]=o.useState(!1),[X,V]=o.useState(!1),[ae,x]=o.useState(0),N=o.useRef(null),O=o.useRef(null),R=o.useRef(null),U=o.useRef(0),Q=o.useRef(null);o.useEffect(()=>{let a=!0;T(!1),V(!1);const s=setTimeout(()=>{a&&V(!0)},12e3);return He(()=>import("./plotly-gl3d-DYPPaO4p.js").then(z=>z.p),__vite__mapDeps([2,1])).then(z=>{if(!a)return;clearTimeout(s);const j=z.default??z;O.current=j;const I=Wt(j);Y(()=>I)}).catch(()=>{a&&(clearTimeout(s),T(!0))}),()=>{a=!1,clearTimeout(s)}},[ae]);const ie=_e(a=>a.getPlotPoints),ye=zt(a=>a.currentSetId),ve=_e(a=>a.glazes),he=be(a=>a.selectedGlaze),Ee=be(a=>a.setSelectedGlaze),Ne=be(a=>a.setHoveredPoint),Me=Zt(a=>a.blendResults),d=Ut(a=>a.theme)==="dark",y=o.useMemo(()=>({paper:d?"#1a1a1a":"#ffffff",bg:d?"#1a1a1a":"#f5f5f5",axisbg:d?"#1e1e1e":"#f8f8f8",grid:d?"#333":"#ddd",zeroline:d?"#444":"#ccc",axisTitle:d?"#aaa":"#555",tick:d?"#888":"#666",font:d?"#ccc":"#333",regionLabel:d?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.22)"}),[d]),G=o.useMemo(()=>ie(ye),[ie,ye]),xe=Ht(G),P=o.useMemo(()=>xe.filter(a=>a.x!=null&&a.y!=null&&!isNaN(a.x)&&!isNaN(a.y)&&a.x>0&&a.y>0&&a.cone!=null&&a.cone>=-4&&a.cone<=10).map(a=>{const s=ve.get(a.id),z=s==null?void 0:s.umf,j=wt(z,t,a.cone);return{...a,z:j}}).filter(a=>isFinite(a.z)),[xe,ve,t]),{visibleData:D,proximityCenter:J,axisRanges:je,nearby:ze}=o.useMemo(()=>{if(F==null||!he||P.length===0)return{visibleData:P,proximityCenter:null,axisRanges:null,nearby:[]};const a=K??he.id,s=P.find(M=>M.id===a);if(!s)return{visibleData:P,proximityCenter:null,axisRanges:null,nearby:[]};let z=1/0,j=-1/0,I=1/0,ee=-1/0,le=1/0,pe=-1/0,ue=1/0,oe=-1/0;for(const M of P)M.x<z&&(z=M.x),M.x>j&&(j=M.x),M.y<I&&(I=M.y),M.y>ee&&(ee=M.y),isFinite(M.z)&&(M.z<le&&(le=M.z),M.z>pe&&(pe=M.z)),M.cone!=null&&(M.cone<ue&&(ue=M.cone),M.cone>oe&&(oe=M.cone));const te=Math.max(j-z,.001),fe=Math.max(ee-I,.001),r=Math.max(le<1/0?pe-le:1,.001),E=Math.max(oe-ue,1),$={x:te,y:fe,z:r},C=A,ke=Math.max(0,Math.min(1,C.x)),we=Math.max(0,Math.min(1,C.y)),Se=Math.max(0,Math.min(1,C.z)),q=Math.max(0,Math.min(1,C.cone)),me=Math.max(0,Math.min(1,C.surface)),Le=ke+we+Se+q+me,et=Le>0?Math.sqrt(Le):1,Fe=[],Ze=[],bt=s.cone??6,dt=s.surfaceType??"unknown";for(const M of P){const Ue=(M.x-s.x)/$.x,tt=(M.y-s.y)/$.y,yt=(M.z-s.z)/$.z,vt=M.cone!=null&&s.cone!=null?Math.abs((M.cone-bt)/E):.5,kt=(M.surfaceType??"unknown")===dt?0:1,Ct=Math.sqrt(ke*Ue*Ue+we*tt*tt+Se*yt*yt+q*vt*vt+me*kt*kt)/et;Ct<=F&&(Fe.push(M),M.id!==s.id&&Ze.push({point:M,dist:Ct,dx:Math.abs(Ue),dy:Math.abs(tt),dz:Math.abs(yt),dCone:vt,dSurface:kt}))}Fe.find(M=>M.id===s.id)||Fe.push(s),Ze.sort((M,Ue)=>M.dist-Ue.dist);const pt=Ze.slice(0,50).map(M=>({id:M.point.id,name:M.point.name,distance:M.dist,x:M.point.x,y:M.point.y,z:M.point.z,cone:M.point.cone,surfaceType:M.point.surfaceType??"unknown",dx:M.dx,dy:M.dy,dz:M.dz,dCone:M.dCone,dSurface:M.dSurface}));return{visibleData:Fe,proximityCenter:s,axisRanges:$,nearby:pt}},[P,he,F,K,A]);o.useEffect(()=>{F!=null&&J?H==null||H({visible:D.length,total:P.length,nearby:ze}):H==null||H(null)},[D.length,P.length,F,J,ze,H]);const ce=o.useMemo(()=>{if(i==="cone"||i==="glaze_type")return null;let a=1/0,s=-1/0;for(const z of P){let j;switch(i){case"z_axis":j=z.z;break;case"surface":j=Et(z.surfaceType);break;case"source":j=$t(z.source);break;case"flux_ratio":j=z.fluxRatio;break;case"confidence":j=Dt(z.confidence);break;case"boron":j=z.boron;break;default:j=0}isFinite(j)&&(j<a&&(a=j),j>s&&(s=j))}return a===1/0?null:{min:a,max:s===a?a+1:s}},[P,i]),We=o.useMemo(()=>i==="glaze_type"?D.map(a=>ht(a.glazeTypeId)):D.map(a=>{switch(i){case"z_axis":return a.z;case"cone":return a.cone??6;case"surface":return Et(a.surfaceType);case"source":return $t(a.source);case"flux_ratio":return a.fluxRatio;case"confidence":return Dt(a.confidence);case"boron":return a.boron;default:return 0}}),[D,i]),Ce=o.useMemo(()=>{let a=1/0,s=-1/0;for(const z of P){const j=z.z;isFinite(j)&&!isNaN(j)&&(j<a&&(a=j),j>s&&(s=j))}return a===1/0?{min:0,max:1}:{min:a,max:s===a?a+1:s}},[P]),de=Ce.min-(Ce.max-Ce.min)*.05,De=o.useMemo(()=>!p||P.length<10?null:Pr(P.map(a=>({x:a.x,y:a.y,z:a.z})),{xRange:[.5,7.2],yRange:[0,1],resolution:40}),[P,p]);o.useEffect(()=>{L==null||L(De,P.map(a=>({x:a.x,y:a.y,z:a.z,name:a.name??""})))},[De,P,L]);const Ge=o.useMemo(()=>{if(!u||P.length<10)return null;const a=P.filter(s=>s.surfaceType&&s.surfaceType!=="unknown").map(s=>({x:s.x,y:s.y,surfaceType:s.surfaceType}));return a.length<5?null:Dr(a,{xRange:[.5,7.2],yRange:[0,1],resolution:30})},[P,u]),Ye=o.useMemo(()=>{var $,C,ke,we,Se;if(!Ge)return null;const{xCoords:a,yCoords:s,cells:z}=Ge,j=a.length,I=s.length,ee=[],le=[],pe=[],ue=[],oe=[],te=[],fe=[],r=[],E=de+(Ce.max-Ce.min)*.001;for(let q=0;q<I;q++)for(let me=0;me<j;me++){ee.push(a[me]),le.push(s[q]),pe.push(E);const Le=($=z[q])==null?void 0:$[me];ue.push((Le==null?void 0:Le.confidence)??0)}for(let q=0;q<I-1;q++)for(let me=0;me<j-1;me++){const Le=(C=z[q])==null?void 0:C[me],et=(ke=z[q])==null?void 0:ke[me+1],Fe=(we=z[q+1])==null?void 0:we[me],Ze=(Se=z[q+1])==null?void 0:Se[me+1];if(!Le||!et||!Fe||!Ze)continue;const bt=q*j+me,dt=q*j+me+1,pt=(q+1)*j+me,M=(q+1)*j+me+1,Ue=(Le.confidence+et.confidence+Fe.confidence)/3,tt=(et.confidence+Fe.confidence+Ze.confidence)/3;oe.push(bt),te.push(dt),fe.push(pt),r.push(Pt(Le.type,.15+Ue*.35)),oe.push(dt),te.push(M),fe.push(pt),r.push(Pt(Ze.type,.15+tt*.35))}return oe.length===0?null:{type:"mesh3d",x:ee,y:le,z:pe,i:oe,j:te,k:fe,facecolor:r,opacity:.6,flatshading:!0,hoverinfo:"skip",name:"Surface Prediction",showlegend:!1,lighting:{ambient:1,diffuse:0,specular:0}}},[Ge,de,Ce.max]),Ie=o.useMemo(()=>{const a=i==="cone";return{type:"scatter3d",mode:"markers",x:D.map(s=>s.x),y:D.map(s=>s.y),z:D.map(s=>s.z),customdata:D.map(s=>s.id),text:D.map(s=>s.name),marker:{size:B,opacity:p?.65:.8,color:We,...i==="glaze_type"?{}:{colorscale:a?Gt:Ur[i]||"Viridis",reversescale:!1,cmin:a?-4:ce==null?void 0:ce.min,cmax:a?10:ce==null?void 0:ce.max,colorbar:{title:i==="z_axis"?Oe(t):qr(i),thickness:15,len:.5,tickvals:a?[-4,-2,0,2,4,6,8,10]:void 0,ticktext:a?["04","02","0","2","4","6","8","10"]:void 0}},line:{width:0}},hoverinfo:"text",hovertemplate:D.map(s=>{const z=[`<b>${s.name}</b>`,`SiO₂: ${s.x.toFixed(2)}`,`Al₂O₃: ${s.y.toFixed(2)}`,`${Oe(t)}: ${t==="cone"?s.z:s.z.toFixed(3)}`];return s.cone!=null&&z.push(`Cone: ${s.cone}`),s.surfaceType&&s.surfaceType!=="unknown"&&z.push(`Surface: ${s.surfaceType}`),s.source&&s.source!=="unknown"&&z.push(`Source: ${s.source}`),z.join("<br>")+"<extra></extra>"}),name:"Glazes",showlegend:!1}},[D,We,i,ce,t,p,B]),_=o.useMemo(()=>{if(!he)return null;const a=D.find(s=>s.id===he.id);return a?{type:"scatter3d",mode:"markers",x:[a.x],y:[a.y],z:[a.z],text:[a.name],marker:{size:10,symbol:"circle",color:"rgba(255, 255, 255, 0.9)",line:{width:3,color:"#facc15"}},hoverinfo:"text",hovertemplate:"<b>%{text}</b> (selected)<extra></extra>",name:"Selected",showlegend:!1}:null},[he,D]),qe=o.useMemo(()=>{if(!he)return null;const a=D.find(s=>s.id===he.id);return a?{type:"scatter3d",mode:"lines",x:[a.x,a.x],y:[a.y,a.y],z:[a.z,de],line:{color:"rgba(250, 204, 21, 0.6)",width:2,dash:"dot"},hoverinfo:"skip",showlegend:!1,name:"selected-drop"}:null},[he,D,de]),ge=o.useMemo(()=>{if(Me.length===0)return null;const a=Me.map(I=>mt(I.umf,"SiO2")),s=Me.map(I=>mt(I.umf,"Al2O3")),z=Me.map(I=>wt(I.umf,t)),j=Me.map((I,ee)=>{var le;return((le=I.recipe)==null?void 0:le.name)||`Blend ${ee+1}`});return{type:"scatter3d",mode:"markers",x:a,y:s,z,text:j,marker:{size:6,symbol:"diamond",color:"#ff9800",opacity:.9,line:{width:1,color:"#fff"}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>SiO₂: %{x:.2f}<br>Al₂O₃: %{y:.2f}<br>${Oe(t)}: %{z:.3f}<br><extra>Blend</extra>`,name:"Blend Results",showlegend:!1}},[Me,t]),Xe=o.useMemo(()=>{if(!m||m.length===0)return null;const a=D.filter(s=>m.includes(s.id));return a.length===0?null:{type:"scatter3d",mode:"markers",x:a.map(s=>s.x),y:a.map(s=>s.y),z:a.map(s=>s.z),text:a.map(s=>s.name),marker:{size:7,symbol:"circle",color:"rgba(255, 235, 59, 0.85)",line:{width:2,color:"#fff"}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>SiO₂: %{x:.2f}<br>Al₂O₃: %{y:.2f}<br>${Oe(t)}: %{z:.3f}<br><extra>Cluster</extra>`,name:"Highlighted",showlegend:!1}},[m,D,t]),Re=o.useMemo(()=>b?Yr(b,b.r,de,Ce.max):null,[b,de,Ce.max]),Be=o.useMemo(()=>{if(D.length>300)return null;const a=[],s=[],z=[];for(const j of D)a.push(j.x,j.x,null),s.push(j.y,j.y,null),z.push(j.z,de,null);return{type:"scatter3d",mode:"lines",x:a,y:s,z,line:{color:"rgba(255,255,255,0.04)",width:1},hoverinfo:"skip",showlegend:!1,name:"droplines"}},[D,de]),Qe=o.useMemo(()=>Vr(de),[de]),Te=o.useMemo(()=>Ae.tempContours?Kr(de,d):[],[de,d]),rt=o.useMemo(()=>Hr(de),[de]),at=o.useMemo(()=>({type:"scatter3d",mode:"text",x:[1.5,2.3,3.4,4.5,5,1.2],y:[.75,.55,.65,.25,.1,.08],z:Array(6).fill(de),text:["UNFUSED","MATTE","SEMI-MATTE","BRIGHT GLOSS","UNDERFIRED","CRAZED"],textfont:{color:y.regionLabel,size:10},hoverinfo:"skip",showlegend:!1,name:"labels"}),[de,y]),Ve=o.useMemo(()=>{if(!J||!je||F==null)return null;const a=24,s=J.x,z=J.y,j=J.z,I=F*je.x,ee=F*je.y,le=F*je.z,pe=[],ue=[],oe=[];for(let te=0;te<=a;te+=3){const fe=Math.PI*te/a-Math.PI/2,r=Math.cos(fe),E=Math.sin(fe);for(let $=0;$<=a;$++){const C=2*Math.PI*$/a;pe.push(s+I*r*Math.cos(C)),ue.push(z+ee*r*Math.sin(C)),oe.push(j+le*E)}pe.push(null),ue.push(null),oe.push(null)}for(let te=0;te<a;te+=3){const fe=2*Math.PI*te/a,r=Math.cos(fe),E=Math.sin(fe);for(let $=0;$<=a;$++){const C=Math.PI*$/a-Math.PI/2;pe.push(s+I*Math.cos(C)*r),ue.push(z+ee*Math.cos(C)*E),oe.push(j+le*Math.sin(C))}pe.push(null),ue.push(null),oe.push(null)}return{type:"scatter3d",mode:"lines",x:pe,y:ue,z:oe,line:{color:"rgba(255,165,0,0.35)",width:1.5},hoverinfo:"skip",showlegend:!1,name:"proximity-sphere",connectgaps:!1}},[J,je,F]),ot=o.useMemo(()=>{const a=[...Qe,...Te,rt,at];if(Be&&a.push(Be),Ye&&a.push(Ye),De&&p){const s=F!=null&&D.length<P.length;a.push(Gr(De,t,s?Math.min(f,.15):f,d,w))}if(a.push(Ie),Xe&&a.push(Xe),Re&&a.push(Re),ge&&a.push(ge),_&&a.push(_),qe&&a.push(qe),Ve&&a.push(Ve),J&&ze.length>0){const s=ze.slice(0,8),z=[],j=[],I=[];for(const ee of s)z.push(J.x,ee.x,null),j.push(J.y,ee.y,null),I.push(J.z,ee.z,null);a.push({type:"scatter3d",mode:"lines",x:z,y:j,z:I,line:{color:"rgba(250, 204, 21, 0.25)",width:1.5,dash:"dot"},hoverinfo:"skip",showlegend:!1,name:"proximity-lines",connectgaps:!1})}if(W){const s=D.find(z=>z.id===W);s&&(a.push({type:"scatter3d",mode:"markers",x:[s.x],y:[s.y],z:[s.z],text:[s.name],marker:{size:12,symbol:"circle",color:"rgba(250, 204, 21, 0.2)",line:{width:2.5,color:"#facc15"}},hoverinfo:"skip",showlegend:!1,name:"hovered-neighbor"}),a.push({type:"scatter3d",mode:"lines",x:[s.x,s.x],y:[s.y,s.y],z:[s.z,de],line:{color:"rgba(250, 204, 21, 0.4)",width:1.5,dash:"dot"},hoverinfo:"skip",showlegend:!1,name:"hovered-drop"}))}return a},[Qe,Te,rt,at,Be,De,p,f,t,d,w,Ye,Ie,Xe,Re,ge,_,qe,Ve,F,D.length,P.length,J,ze,W,de]),nt=Wr[h](n),Je=R.current??nt;o.useEffect(()=>{R.current=null},[h,n]),o.useEffect(()=>{if(!S){Q.current&&(cancelAnimationFrame(Q.current),Q.current=null);return}let a=performance.now();const s=z=>{var oe;const j=(oe=N.current)==null?void 0:oe.el,I=O.current;if(!j||!I){a=z,Q.current=requestAnimationFrame(s);return}const ee=(z-a)/1e3;a=z,U.current+=k*ee*.5;const le=U.current,pe=2.5/n,ue={x:Math.cos(le)*pe,y:Math.sin(le)*pe,z:1.2/n};try{I.relayout(j,{"scene.camera.eye":ue,"scene.camera.up":{x:0,y:0,z:1}})}catch{}Q.current=requestAnimationFrame(s)};return Q.current=requestAnimationFrame(s),()=>{Q.current&&(cancelAnimationFrame(Q.current),Q.current=null)}},[S,k,n]);const st=o.useCallback(a=>{const s=a==null?void 0:a["scene.camera"];s&&!S&&(R.current=s),s!=null&&s.eye&&S&&(U.current=Math.atan2(s.eye.y,s.eye.x))},[S]),lt=o.useMemo(()=>({...Je,projection:{type:g>.01?"perspective":"orthographic"}}),[Je,g]),gt=o.useMemo(()=>({scene:{xaxis:{title:{text:"SiO₂",font:{color:y.axisTitle}},range:[.5,7.2],gridcolor:y.grid,zerolinecolor:y.zeroline,tickfont:{color:y.tick},backgroundcolor:y.axisbg},yaxis:{title:{text:"Al₂O₃",font:{color:y.axisTitle}},range:[0,1],gridcolor:y.grid,zerolinecolor:y.zeroline,tickfont:{color:y.tick},backgroundcolor:y.axisbg},zaxis:{title:{text:Oe(t),font:{color:y.axisTitle}},gridcolor:y.grid,zerolinecolor:y.zeroline,tickfont:{color:y.tick},backgroundcolor:y.axisbg},bgcolor:y.bg,camera:lt,aspectmode:"manual",aspectratio:{x:2,y:1,z:ne}},paper_bgcolor:y.paper,font:{color:y.font},margin:{l:0,r:0,t:0,b:0},hovermode:"closest",showlegend:!1,uirevision:"stull3d"}),[t,y,lt,ne]),it=o.useCallback(a=>{var z,j,I;const s=(z=a.points)==null?void 0:z[0];if(s!=null&&s.customdata&&((j=s==null?void 0:s.data)==null?void 0:j.type)==="scatter3d"&&((I=s==null?void 0:s.data)==null?void 0:I.mode)==="markers"){const ee=_e.getState().glazes.get(s.customdata);ee&&Ee(ee)}},[Ee]),ft=o.useCallback(a=>{var z,j,I,ee,le,pe,ue,oe;const s=(z=a.points)==null?void 0:z[0];if(s!=null&&s.customdata&&((j=s==null?void 0:s.data)==null?void 0:j.type)==="scatter3d"&&((I=s==null?void 0:s.data)==null?void 0:I.mode)==="markers"){const te=_e.getState().glazes.get(s.customdata);if(te){const fe=(ee=te.coneRange)==null?void 0:ee[0];Ne({id:s.customdata,name:te.name,source:te.source??"unknown",x:s.x,y:s.y,cone:typeof fe=="number"?fe:null,surfaceType:te.surfaceType??"unknown",fluxRatio:((pe=(le=te.umf)==null?void 0:le._meta)==null?void 0:pe.R2O_RO_ratio)??0,boron:((oe=(ue=te.umf)==null?void 0:ue.B2O3)==null?void 0:oe.value)??0,confidence:te.umfConfidence??"inferred",glazeTypeId:te.glazeTypeId??null})}}},[Ne]),ct=o.useMemo(()=>({displayModeBar:!re,modeBarButtonsToRemove:["select2d","lasso2d","toImage"],scrollZoom:!re,displaylogo:!1}),[re]);return Z?e.jsx(Z,{ref:N,data:ot,layout:gt,config:ct,onClick:it,onHover:ft,onRelayout:st,useResizeHandler:!0,style:{width:l||"100%",height:c||"100%"}}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,width:l||"100%",height:c||"100%",color:"#777",fontSize:13,background:"var(--bg-secondary, #1a1a1a)",borderRadius:8,...v?{}:{animation:"pulse 1.5s ease-in-out infinite"}},children:[e.jsx("style",{children:"@keyframes pulse { 0%,100% { opacity: 0.6 } 50% { opacity: 1 } }"}),v?e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{fontSize:22},children:"⚠"}),e.jsx("span",{children:"3D engine failed to load"}),e.jsx("button",{onClick:()=>x(a=>a+1),style:{marginTop:4,padding:"6px 16px",borderRadius:6,border:"1px solid #555",background:"var(--bg-tertiary, #252525)",color:"#ccc",cursor:"pointer",fontSize:13},children:"Tap to retry"})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Loading 3D engine…"}),X&&e.jsx("span",{style:{fontSize:11,color:"#666"},children:"Slow connection — still trying…"})]})]})}function Et(t){return{matte:1,satin:2,gloss:3,crystalline:4,crawl:5,unknown:0}[t]??0}function $t(t){return{glazy:1,digitalfire:2,user:3,calculated:4}[t]??0}function Dt(t){return{unknown:0,assumed:1,inferred:2,declared:3,verified:4}[t]??0}function qr(t){return{cone:"Cone",surface:"Surface",source:"Source",flux_ratio:"R₂O:RO",confidence:"Confidence",boron:"B₂O₃"}[t]||t}function Oe(t){return{Li2O:"Li₂O",Na2O:"Na₂O",K2O:"K₂O",MgO:"MgO",CaO:"CaO",SrO:"SrO",BaO:"BaO",ZnO:"ZnO",PbO:"PbO",B2O3:"B₂O₃",Fe2O3:"Fe₂O₃",TiO2:"TiO₂",ZrO2:"ZrO₂",SnO2:"SnO₂",MnO:"MnO",MnO2:"MnO₂",NiO:"NiO",CuO:"CuO",Cu2O:"Cu₂O",CoO:"CoO",Cr2O3:"Cr₂O₃",P2O5:"P₂O₅",cone:"Cone",flux_ratio:"R₂O:RO",SiO2_Al2O3_ratio:"SiO₂:Al₂O₃",total_flux_moles:"Total Flux Moles",thermal_expansion:"Thermal Exp. (COE)",nbo_t:"NBO/T",optical_basicity:"Optical Basicity (Λ)",flux_entropy:"Flux Diversity",cao_mgo_ratio:"CaO:MgO",combined_alkali:"Combined Alkali",na2o_k2o_ratio:"Na₂O:K₂O",viscosity_index:"Viscosity Index",surface_tension:"Surface Tension",durability:"Chem. Durability",total_colorant:"Total Colorant",fe_ti_ratio:"Fe:Ti"}[t]||t}const Xr=Object.freeze(Object.defineProperty({__proto__:null,DEFAULT_PROXIMITY_WEIGHTS:Ke,StullPlot3D:At,computeZFromUMF:wt,default:At,zAxisLabel:Oe},Symbol.toStringTag,{value:"Module"})),jt=t=>t==="gloss"?"G":t==="matte"?"M":t==="satin"?"S":t==="crystalline"?"X":t==="crawl"?"C":"?",Qr=[{key:"gloss",label:"G"},{key:"matte",label:"M"},{key:"satin",label:"S"},{key:"crystalline",label:"X"},{key:"crawl",label:"C"},{key:"unknown",label:"?"}];function Jr({proximityStats:t,glazes:i,selectedGlaze:n,pinnedCenterId:l,hoveredNeighborId:c,explorationPath:m,zAxis:b,onSelectGlaze:p,onCompareGlaze:f,onHoverNeighbor:u,onPinCenter:h,onExplorationPathChange:g}){var V,ae;const[w,L]=o.useState(new Set),[S,k]=o.useState(!1),[B,ne]=o.useState("distance"),[F,K]=o.useState("list"),A=o.useRef(null),W=o.useMemo(()=>new Set(t.nearby.map(x=>x.surfaceType)),[t.nearby]),H=o.useMemo(()=>{const x=new Map;for(const N of t.nearby){const O=i.get(N.id);O&&x.set(N.id,O)}return x},[t.nearby,i]),se=o.useMemo(()=>t.nearby.filter(x=>{const N=H.get(x.id);return(N==null?void 0:N.images)&&N.images.length>0}).length,[t.nearby,H]),re=o.useMemo(()=>{let x=w.size===0?[...t.nearby]:t.nearby.filter(N=>w.has(N.surfaceType));return S&&(x=x.filter(N=>{const O=H.get(N.id);return(O==null?void 0:O.images)&&O.images.length>0})),B==="cone"?x.sort((N,O)=>(N.cone??99)-(O.cone??99)||N.distance-O.distance):B==="name"&&x.sort((N,O)=>N.name.localeCompare(O.name)),x},[t.nearby,w,S,B,H]),Z=3,Y=o.useCallback(x=>{var Q;const N=A.current;if(!N)return;const O=Array.from(N.querySelectorAll(F==="gallery"?".gallery-card":".proximity-nearby-item"));if(O.length===0)return;const R=O.findIndex(ie=>ie===document.activeElement);let U=-1;switch(x.key){case"ArrowDown":F==="gallery"?U=R<0?0:Math.min(R+Z,O.length-1):U=R<0?0:Math.min(R+1,O.length-1);break;case"ArrowUp":F==="gallery"?U=R<0?0:Math.max(R-Z,0):U=R<0?0:Math.max(R-1,0);break;case"ArrowRight":F==="gallery"&&(U=R<0?0:Math.min(R+1,O.length-1));break;case"ArrowLeft":F==="gallery"&&(U=R<0?0:Math.max(R-1,0));break;case"Home":U=0;break;case"End":U=O.length-1;break;case"Enter":R>=0&&O[R].click();return;default:return}if(U>=0&&U!==R){x.preventDefault(),O[U].focus(),O[U].scrollIntoView({block:"nearest"});const ie=((Q=re[U])==null?void 0:Q.id)??null;u(ie)}},[F,re,u]),v=c?t.nearby.find(x=>x.id===c)??null:null,T=c?H.get(c)??null:null,X=(x,N)=>{const O=H.get(N.id);O&&(x.shiftKey?f(O):(n&&!l&&g((()=>{const R=m;return R.length>0&&R[R.length-1].id===n.id?R:[...R,{id:n.id,name:n.name}].slice(-10)})()),p(O)))};return e.jsxs("div",{className:"proximity-nearby-list",children:[m.length>0&&e.jsx("div",{className:"proximity-breadcrumb",children:m.map((x,N)=>e.jsxs(St.Fragment,{children:[N>0&&e.jsx("span",{className:"breadcrumb-arrow",children:"›"}),e.jsx("button",{className:"breadcrumb-btn",onClick:()=>{const O=i.get(x.id);O&&(p(O),g(m.slice(0,N)))},title:x.name,children:x.name.length>12?x.name.slice(0,11)+"…":x.name})]},x.id))}),e.jsxs("div",{className:"proximity-nearby-header",children:[e.jsxs("span",{children:["Nearby (",re.length,w.size>0?`/${t.nearby.length}`:"",")"]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsxs("div",{className:"proximity-sort-btns",children:[e.jsx("button",{className:`proximity-sort-btn${F==="list"?" on":""}`,onClick:()=>K("list"),title:"List view",children:"≡"}),e.jsx("button",{className:`proximity-sort-btn${F==="gallery"?" on":""}`,onClick:()=>K("gallery"),title:"Gallery view",children:"▦"})]}),e.jsx("div",{className:"proximity-sort-btns",children:["distance","cone","name"].map(x=>e.jsx("button",{className:`proximity-sort-btn${B===x?" on":""}`,onClick:()=>ne(x),title:`Sort by ${x}`,children:x==="distance"?"↔":x==="cone"?"△":"Az"},x))}),e.jsx("button",{className:`proximity-pin-btn${l?" pinned":""}`,onClick:()=>h(l?null:(n==null?void 0:n.id)??null),title:l?"Unpin center — proximity follows selection":"Pin center — keep this neighborhood while exploring",children:l?"📌":"📌Pin"})]})]}),e.jsxs("div",{className:"proximity-filter-pills",children:[Qr.filter(x=>W.has(x.key)).map(x=>e.jsx("button",{className:`proximity-pill st-${x.key}${w.has(x.key)?" on":""}`,onClick:()=>L(N=>{const O=new Set(N);return O.has(x.key)?O.delete(x.key):O.add(x.key),O}),title:x.key,children:x.label},x.key)),e.jsxs("button",{className:`proximity-pill photo-pill${S?" on":""}`,onClick:()=>k(x=>!x),title:`Show only glazes with photos (${se})`,children:["📷",S?` ${se}`:""]}),(w.size>0||S)&&e.jsx("button",{className:"proximity-pill clear",onClick:()=>{L(new Set),k(!1)},title:"Clear all filters",children:"×"})]}),e.jsx("div",{ref:A,className:`proximity-nearby-scroll${F==="gallery"?" gallery-mode":""}`,onKeyDown:Y,role:"listbox","aria-label":`Nearby glazes ${F} view`,children:F==="gallery"?re.map((x,N)=>{var U,Q;const O=H.get(x.id),R=((U=O==null?void 0:O.images)==null?void 0:U[0])??null;return e.jsxs("button",{className:`gallery-card${(n==null?void 0:n.id)===x.id?" active":""}${c===x.id?" hovered":""}`,onClick:ie=>X(ie,x),onMouseEnter:()=>u(x.id),onMouseLeave:()=>u(null),onFocus:()=>u(x.id),onBlur:()=>u(null),role:"option","aria-selected":(n==null?void 0:n.id)===x.id,title:`${x.name}
SiO₂: ${x.x.toFixed(2)}, Al₂O₃: ${x.y.toFixed(2)}
Shift+click to compare`,children:[e.jsxs("div",{className:"gallery-thumb",children:[R?e.jsx("img",{src:R,alt:x.name,loading:"lazy",onError:ie=>{const ye=ie.currentTarget;ye.style.display="none";const ve=ye.nextElementSibling;ve&&(ve.style.display="")}}):null,e.jsx("div",{className:"gallery-no-photo",style:R?{display:"none"}:void 0,children:e.jsx("span",{className:`proximity-nearby-surface st-${x.surfaceType}`,children:jt(x.surfaceType)})}),e.jsxs("span",{className:"gallery-rank",children:["#",N+1]}),(((Q=O==null?void 0:O.images)==null?void 0:Q.length)??0)>1&&e.jsxs("span",{className:"gallery-photo-count",children:["📷",O.images.length]}),e.jsx("span",{className:"gallery-dist",children:x.distance.toFixed(2)})]}),e.jsxs("div",{className:"gallery-info",children:[e.jsx("span",{className:"gallery-name",children:x.name}),e.jsxs("div",{className:"gallery-meta",children:[x.cone!=null&&e.jsxs("span",{className:"proximity-nearby-cone",children:["△",x.cone]}),e.jsx("span",{className:`proximity-nearby-surface st-${x.surfaceType}`,children:jt(x.surfaceType)})]})]})]},x.id)}):re.map((x,N)=>{var U,Q;const O=H.get(x.id),R=((U=O==null?void 0:O.images)==null?void 0:U[0])??null;return e.jsxs("button",{className:`proximity-nearby-item${(n==null?void 0:n.id)===x.id?" active":""}${c===x.id?" hovered":""}`,onClick:ie=>X(ie,x),onMouseEnter:()=>u(x.id),onMouseLeave:()=>u(null),onFocus:()=>u(x.id),onBlur:()=>u(null),role:"option","aria-selected":(n==null?void 0:n.id)===x.id,title:`SiO₂: ${x.x.toFixed(2)}, Al₂O₃: ${x.y.toFixed(2)}, ${Oe(b)}: ${x.z.toFixed(3)}
Shift+click to compare`,children:[R?e.jsx("img",{className:"list-thumb",src:R,alt:"",loading:"lazy",onError:ie=>{const ye=ie.currentTarget;ye.style.display="none";const ve=ye.nextElementSibling;ve&&(ve.style.display="")}}):null,e.jsx("span",{className:"list-thumb-placeholder",style:R?{display:"none"}:void 0}),(((Q=O==null?void 0:O.images)==null?void 0:Q.length)??0)>1&&e.jsx("span",{className:"list-photo-count",children:O.images.length}),e.jsx("span",{className:"proximity-nearby-rank",children:N+1}),e.jsx("span",{className:"proximity-nearby-name",children:x.name}),x.cone!=null&&e.jsxs("span",{className:"proximity-nearby-cone",children:["△",(typeof x.cone=="number"&&x.cone===Math.floor(x.cone),x.cone)]}),e.jsx("span",{className:`proximity-nearby-surface st-${x.surfaceType}`,title:x.surfaceType,children:jt(x.surfaceType)}),e.jsxs("span",{className:"proximity-nearby-bars",title:`SiO₂: ${(Math.max(0,1-x.dx)*100).toFixed(0)}% | Al₂O₃: ${(Math.max(0,1-x.dy)*100).toFixed(0)}% | ${Oe(b)}: ${(Math.max(0,1-x.dz)*100).toFixed(0)}%`,children:[e.jsx("span",{className:"sim-bar bar-x",style:{width:`${Math.max(0,1-x.dx)*100}%`}}),e.jsx("span",{className:"sim-bar bar-y",style:{width:`${Math.max(0,1-x.dy)*100}%`}}),e.jsx("span",{className:"sim-bar bar-z",style:{width:`${Math.max(0,1-x.dz)*100}%`}})]}),e.jsx("span",{className:"proximity-nearby-dist",children:x.distance.toFixed(2)})]},x.id)})}),(T==null?void 0:T.umf)&&v&&e.jsxs("div",{className:"proximity-preview",children:[e.jsxs("div",{className:"proximity-preview-top",children:[((V=T.images)==null?void 0:V[0])&&e.jsx("img",{className:"preview-thumb",src:T.images[0],alt:"",loading:"lazy",onError:x=>{x.currentTarget.style.display="none"}}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"proximity-preview-name",children:T.name}),e.jsxs("div",{className:"proximity-preview-meta",children:[((ae=T.coneRange)==null?void 0:ae[0])!=null&&e.jsxs("span",{children:["△",T.coneRange[0],T.coneRange[1]!==T.coneRange[0]?`–${T.coneRange[1]}`:""]}),e.jsx("span",{children:T.surfaceType}),e.jsx("span",{children:T.atmosphere}),e.jsxs("span",{children:["d=",v.distance.toFixed(3)]})]})]})]}),e.jsxs("div",{className:"proximity-preview-row",children:[e.jsx(Vt,{umf:T.umf,width:120,height:10,compact:!0}),e.jsx(Kt,{umf:T.umf,size:32,innerRadius:.55})]})]}),e.jsxs("div",{className:"proximity-nearby-legend",children:[e.jsxs("span",{className:"sim-legend-item",children:[e.jsx("span",{className:"sim-dot dot-x"}),"SiO","₂"]}),e.jsxs("span",{className:"sim-legend-item",children:[e.jsx("span",{className:"sim-dot dot-y"}),"Al","₂","O","₃"]}),e.jsxs("span",{className:"sim-legend-item",children:[e.jsx("span",{className:"sim-dot dot-z"}),Oe(b)]})]})]})}function Pe(t,i,n){return n<=0?0:((t+i)%n+n)%n}function ea(t,i){return i<=0?0:Math.min(t,i-1)}function ut(t,i,n=.5,l=4){const c=t+i;return c>l?l:c<n?n:c}function ta(t){if(!t||typeof t!="object")return!1;const i=t;if(!i.tagName)return!1;const n=i.tagName;return!!(n==="INPUT"||n==="TEXTAREA"||n==="SELECT"||i.isContentEditable)}function ra({images:t,glazeName:i,sidebarTab:n}){const[l,c]=o.useState(0),[m,b]=o.useState(!1),[p,f]=o.useState(1);o.useEffect(()=>{c(0),b(!1),f(1)},[t]),o.useEffect(()=>{if(!t||t.length===0)return;const h=g=>{ta(g.target)||(m?g.key==="Escape"?(b(!1),f(1),g.preventDefault()):g.key==="ArrowLeft"?(c(w=>Pe(w,-1,t.length)),g.preventDefault()):g.key==="ArrowRight"?(c(w=>Pe(w,1,t.length)),g.preventDefault()):g.key==="+"||g.key==="="?(f(w=>ut(w,.5)),g.preventDefault()):g.key==="-"?(f(w=>ut(w,-.5)),g.preventDefault()):g.key==="0"&&(f(1),g.preventDefault()):n==="detail"&&(g.key==="ArrowLeft"&&t.length>1?(c(w=>Pe(w,-1,t.length)),g.preventDefault()):g.key==="ArrowRight"&&t.length>1&&(c(w=>Pe(w,1,t.length)),g.preventDefault())))};return window.addEventListener("keydown",h),()=>window.removeEventListener("keydown",h)},[t,m,n]);const u=ea(l,t.length);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"detail-section",children:[e.jsxs("h4",{children:["Photo",t.length>1?`s (${u+1}/${t.length})`:""]}),e.jsxs("div",{className:"carousel-container",children:[e.jsx("img",{src:t[u],alt:`${i} — photo ${u+1}`,loading:"lazy",className:"carousel-img",onClick:()=>{b(!0),f(1)},style:{cursor:"zoom-in"},title:"Click to enlarge (← → to cycle, Esc to close)",onError:h=>{h.currentTarget.style.display="none";const g=h.currentTarget.nextElementSibling;g!=null&&g.classList.contains("carousel-img-fallback")&&(g.style.display="flex")}}),e.jsx("div",{className:"carousel-img-fallback",style:{display:"none",alignItems:"center",justifyContent:"center",height:200,color:"var(--text-secondary, #888)",fontSize:13},children:"Image unavailable"}),t.length>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"carousel-btn carousel-prev",onClick:()=>c(h=>Pe(h,-1,t.length)),title:"Previous photo",children:"‹"}),e.jsx("button",{className:"carousel-btn carousel-next",onClick:()=>c(h=>Pe(h,1,t.length)),title:"Next photo",children:"›"}),e.jsx("div",{className:"carousel-dots",children:t.map((h,g)=>e.jsx("button",{className:`carousel-dot${g===u?" active":""}`,onClick:()=>c(g)},g))})]})]})]}),m&&e.jsx("div",{className:"lightbox-overlay",onClick:h=>{h.target===h.currentTarget&&(b(!1),f(1))},role:"dialog","aria-label":"Image lightbox",children:e.jsxs("div",{className:"lightbox-content",children:[e.jsx("img",{src:t[u],alt:`${i} — photo ${u+1}`,className:"lightbox-img",style:{transform:`scale(${p})`},draggable:!1,onError:h=>{h.currentTarget.style.display="none";const g=h.currentTarget.nextElementSibling;g!=null&&g.classList.contains("lightbox-img-fallback")&&(g.style.display="flex")}}),e.jsx("div",{className:"lightbox-img-fallback",style:{display:"none",alignItems:"center",justifyContent:"center",color:"#ccc",fontSize:16},children:"Image unavailable"}),t.length>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"lightbox-nav lightbox-prev",onClick:()=>c(h=>Pe(h,-1,t.length)),title:"Previous (←)",children:"‹"}),e.jsx("button",{className:"lightbox-nav lightbox-next",onClick:()=>c(h=>Pe(h,1,t.length)),title:"Next (→)",children:"›"})]}),e.jsxs("div",{className:"lightbox-toolbar",children:[e.jsxs("span",{className:"lightbox-caption",children:[i,t.length>1?` (${u+1}/${t.length})`:""]}),e.jsxs("div",{className:"lightbox-zoom-controls",children:[e.jsx("button",{onClick:()=>f(h=>ut(h,-.5)),title:"Zoom out (−)",children:"−"}),e.jsxs("span",{children:[(p*100).toFixed(0),"%"]}),e.jsx("button",{onClick:()=>f(h=>ut(h,.5)),title:"Zoom in (+)",children:"+"}),p!==1&&e.jsx("button",{onClick:()=>f(1),title:"Reset zoom (0)",children:"1:1"})]}),e.jsx("button",{className:"lightbox-close",onClick:()=>{b(!1),f(1)},title:"Close (Esc)",children:"✕"})]})]})})]})}const aa=`
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
`,oa=o.lazy(()=>He(()=>Promise.resolve().then(()=>Xr),void 0).then(t=>({default:t.StullPlot3D}))),na=o.lazy(()=>He(()=>import("./ComparePanel-CYxR2KXm.js"),__vite__mapDeps([3,1,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18])).then(t=>({default:t.ComparePanel}))),sa=o.lazy(()=>He(()=>import("./index-CE_NHNbc.js"),__vite__mapDeps([19,1,5,6,7,8])).then(t=>({default:t.AnalysisPanel}))),la=o.lazy(()=>He(()=>import("./index-DNJCmhuO.js"),__vite__mapDeps([20,1,10,11])).then(t=>({default:t.DigitalfirePanel}))),ia=["oxidation","reduction","neutral","unknown"],ca=["gloss","satin","matte","crystalline","crawl","unknown"];function da(){const[t,i]=o.useState(!0),{atmospheres:n,surfaces:l,coneMin:c,coneMax:m,hasIngredients:b,hasImages:p,activeCount:f,toggleAtmosphere:u,toggleSurface:h,setConeRange:g,setHasIngredients:w,setHasImages:L,clearAll:S}=Bt();return e.jsxs("div",{className:"control-group filter-panel",children:[e.jsxs("h3",{style:{cursor:"pointer",display:"flex",alignItems:"center",gap:6,userSelect:"none"},onClick:()=>i(!t),children:[e.jsx("span",{style:{fontSize:10,transition:"transform 0.15s",transform:t?"rotate(90deg)":"rotate(0)"},children:"▶"}),"Filters",f>0&&e.jsx("span",{className:"filter-badge",children:f})]}),t&&e.jsxs("div",{className:"filter-body",children:[e.jsxs("div",{className:"filter-section",children:[e.jsx("span",{className:"filter-label",children:"Atmosphere"}),e.jsx("div",{className:"filter-chips",children:ia.map(k=>e.jsx("button",{className:`filter-chip ${n.has(k)?"active":""}`,onClick:()=>u(k),"aria-pressed":n.has(k),"aria-label":`Atmosphere: ${k}`,children:k==="unknown"?"?":k.slice(0,3)},k))})]}),e.jsxs("div",{className:"filter-section",children:[e.jsx("span",{className:"filter-label",children:"Surface"}),e.jsx("div",{className:"filter-chips",children:ca.map(k=>e.jsx("button",{className:`filter-chip ${l.has(k)?"active":""}`,onClick:()=>h(k),"aria-pressed":l.has(k),"aria-label":`Surface: ${k}`,children:k==="unknown"?"?":k==="crystalline"?"crys":k.slice(0,4)},k))})]}),e.jsxs("div",{className:"filter-section",children:[e.jsx("span",{className:"filter-label",children:"Cone range"}),e.jsxs("div",{className:"cone-range-inputs",children:[e.jsx("input",{type:"number",className:"cone-input",placeholder:"min",value:c??"",onChange:k=>{const B=k.target.value===""?null:Number(k.target.value);g(B,m)},min:-4,max:14}),e.jsx("span",{style:{color:"var(--text-secondary)",fontSize:12},children:"to"}),e.jsx("input",{type:"number",className:"cone-input",placeholder:"max",value:m??"",onChange:k=>{const B=k.target.value===""?null:Number(k.target.value);g(c,B)},min:-4,max:14})]})]}),e.jsxs("div",{className:"filter-section",children:[e.jsxs("label",{className:"filter-flag",children:[e.jsx("input",{type:"checkbox",checked:b,onChange:k=>w(k.target.checked)}),"Has recipe"]}),e.jsxs("label",{className:"filter-flag",children:[e.jsx("input",{type:"checkbox",checked:p,onChange:k=>L(k.target.checked)}),"Has photo"]})]}),f>0&&e.jsx("button",{className:"filter-clear",onClick:S,children:"Clear all filters"})]})]})}function pa(){const t=Qt(),[i,n]=o.useState("SiO2"),[l,c]=o.useState("Al2O3"),[m,b]=o.useState("cone"),[p,f]=o.useState(1),[u,h]=o.useState(!1),[g,w]=o.useState("B2O3"),[L,S]=o.useState(!0),[k,B]=o.useState(.35),[ne,F]=o.useState(!1),[K,A]=o.useState("default"),[W,H]=o.useState(!1),[se,re]=o.useState("6"),[Z,Y]=o.useState(.5),[v,T]=o.useState(!1),[X,V]=o.useState({x:1,y:-1,z:2}),[ae,x]=o.useState(null),[N,O]=o.useState([]),[R,U]=o.useState(!1),[Q,ie]=o.useState(.5);o.useEffect(()=>{if(!t.active)return;h(!0),U(!0),ie(.3),b("cone"),S(!0),B(.25),Y(.6),Ee(.8),ve(3);const E=new URLSearchParams(window.location.search||window.location.hash.split("?")[1]||"").get("z");E&&w(E)},[t.active]);const[ye,ve]=o.useState(2.5),[he,Ee]=o.useState(.8),[Ne,Me]=o.useState(!1),[$e,d]=o.useState(.35),[y,G]=o.useState(null),[xe,P]=o.useState(null),[D,J]=o.useState(null),[je,ze]=o.useState([]),[ce,We]=o.useState({...Ke}),[Ce,de]=o.useState(!1),[De,Ge]=o.useState(0),Ye=o.useCallback((r,E)=>{x(r),O(E)},[]),Ie=o.useCallback(()=>{Ge(r=>r+1)},[]);o.useEffect(()=>{if(!u)return;const r=["default","top","side-x","side-y"],E=$=>{const C=$.target;(C==null?void 0:C.tagName)==="INPUT"||(C==null?void 0:C.tagName)==="TEXTAREA"||(C==null?void 0:C.tagName)==="SELECT"||C!=null&&C.isContentEditable||($.key>="1"&&$.key<="4"?(A(r[Number($.key)-1]),$.preventDefault()):$.key==="r"||$.key==="R"?(U(ke=>!ke),$.preventDefault()):$.key==="0"&&(Ie(),$.preventDefault()))};return window.addEventListener("keydown",E),()=>window.removeEventListener("keydown",E)},[u,Ie]),o.useEffect(()=>{u&&b("z_axis")},[u,g]);const _=be(r=>r.selectedGlaze),qe=be(r=>r.showSidebar),ge=be(r=>r.sidebarTab);o.useEffect(()=>{_||(Me(!1),P(null))},[_]);const Xe=be(r=>r.toggleSidebar),Re=be(r=>r.setSidebarTab),Be=be(r=>r.setSelectedGlaze),Qe=be(r=>r.addToCompare),Te=be(r=>r.compareGlazes),rt=be(r=>r.removeFromCompare),at=be(r=>r.clearCompare),Ve=_e(r=>r.glazes),[ot,nt]=o.useState([]),[Je,st]=o.useState(null),lt=o.useCallback(r=>{nt(r),st(null)},[]),gt=o.useCallback((r,E)=>{st({x:r.x,y:r.y,r:E}),nt([])},[]),[it,ft]=o.useState(null),[ct,a]=o.useState(!1),s=o.useCallback(r=>{ft(r),r&&a(!0)},[]),{results:z,weights:j,count:I,setCount:ee,updateWeight:le,resetWeights:pe,oxides:ue}=cr(_,Ve),oe=["SiO2","Al2O3","B2O3","Na2O","K2O","CaO","MgO","ZnO","BaO"],te=[...u?[{value:"z_axis",label:"↕ Z Axis"}]:[],{value:"cone",label:"Cone"},{value:"glaze_type",label:"Glaze Type"},{value:"surface",label:"Surface"},{value:"source",label:"Source"},{value:"flux_ratio",label:"R2O:RO Ratio"},{value:"boron",label:"Boron"},{value:"confidence",label:"Confidence"}],fe=[{value:"Li2O",label:"Li₂O (Lithium)",group:"Fluxes – R₂O"},{value:"Na2O",label:"Na₂O (Sodium)",group:"Fluxes – R₂O"},{value:"K2O",label:"K₂O (Potassium)",group:"Fluxes – R₂O"},{value:"CaO",label:"CaO (Calcium)",group:"Fluxes – RO"},{value:"MgO",label:"MgO (Magnesium)",group:"Fluxes – RO"},{value:"SrO",label:"SrO (Strontium)",group:"Fluxes – RO"},{value:"BaO",label:"BaO (Barium)",group:"Fluxes – RO"},{value:"ZnO",label:"ZnO (Zinc)",group:"Fluxes – RO"},{value:"PbO",label:"PbO (Lead)",group:"Fluxes – RO"},{value:"B2O3",label:"B₂O₃ (Boron)",group:"Stabilizers"},{value:"Fe2O3",label:"Fe₂O₃ (Iron)",group:"Stabilizers"},{value:"TiO2",label:"TiO₂ (Titanium)",group:"Glass Formers"},{value:"ZrO2",label:"ZrO₂ (Zirconium)",group:"Glass Formers"},{value:"SnO2",label:"SnO₂ (Tin)",group:"Glass Formers"},{value:"MnO",label:"MnO (Manganese)",group:"Colorants"},{value:"MnO2",label:"MnO₂ (Manganese IV)",group:"Colorants"},{value:"NiO",label:"NiO (Nickel)",group:"Colorants"},{value:"CuO",label:"CuO (Copper)",group:"Colorants"},{value:"Cu2O",label:"Cu₂O (Cuprous)",group:"Colorants"},{value:"CoO",label:"CoO (Cobalt)",group:"Colorants"},{value:"Cr2O3",label:"Cr₂O₃ (Chromium)",group:"Colorants"},{value:"P2O5",label:"P₂O₅ (Phosphorus)",group:"Colorants"},{value:"cone",label:"Cone (Temperature)",group:"Ratios & Sums"},{value:"flux_ratio",label:"R₂O:RO Ratio",group:"Ratios & Sums"},{value:"SiO2_Al2O3_ratio",label:"SiO₂:Al₂O₃ Ratio",group:"Ratios & Sums"},{value:"total_flux_moles",label:"Total Flux Moles",group:"Ratios & Sums"},{value:"thermal_expansion",label:"Thermal Exp. (COE)",group:"Ratios & Sums"},{value:"nbo_t",label:"NBO/T (Network Breakup)",group:"Glass Structure"},{value:"optical_basicity",label:"Optical Basicity (Λ)",group:"Glass Structure"},{value:"flux_entropy",label:"Flux Diversity (Entropy)",group:"Flux Analysis"},{value:"cao_mgo_ratio",label:"CaO:MgO (Texture Dial)",group:"Flux Analysis"},{value:"combined_alkali",label:"Combined Alkali (KNaO)",group:"Flux Analysis"},{value:"na2o_k2o_ratio",label:"Na₂O:K₂O Ratio",group:"Flux Analysis"},{value:"viscosity_index",label:"Viscosity Index",group:"Physical"},{value:"surface_tension",label:"Surface Tension (Dietzel)",group:"Physical"},{value:"durability",label:"Chemical Durability",group:"Physical"},{value:"total_colorant",label:"Total Colorant Load",group:"Colorant"},{value:"fe_ti_ratio",label:"Fe:Ti Ratio",group:"Colorant"}];return e.jsxs("div",{className:`stull-explorer${t.active?" kiosk-active":""}`,role:"application","aria-label":"Stull Chart Glaze Explorer",children:[!t.active&&e.jsxs("aside",{className:"controls-panel","aria-label":"Plot controls",children:[e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{id:"axes-heading",children:"Axes"}),e.jsxs("div",{className:"axis-controls",role:"group","aria-labelledby":"axes-heading",children:[e.jsxs("label",{children:["X Axis",e.jsx("select",{value:i,onChange:r=>n(r.target.value),children:oe.map(r=>e.jsx("option",{value:r,children:r},r))})]}),e.jsxs("label",{children:["Y Axis",e.jsx("select",{value:l,onChange:r=>c(r.target.value),children:oe.map(r=>e.jsx("option",{value:r,children:r},r))})]})]})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Color By"}),e.jsx("select",{value:m,onChange:r=>b(r.target.value),className:"color-select",children:te.map(r=>e.jsx("option",{value:r.value,children:r.label},r.value))})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"View"}),e.jsx("button",{className:`view-toggle ${u?"active":""}`,onClick:()=>h(!u),"aria-pressed":u,"aria-label":u?"Switch to 2D view":"Switch to 3D view",children:u?"◆ 3D":"◇ 2D"}),u&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"z-axis-control",children:e.jsxs("label",{children:["Z Axis",e.jsx("select",{value:g,onChange:r=>w(r.target.value),children:Array.from(new Set(fe.map(r=>r.group))).map(r=>e.jsx("optgroup",{label:r,children:fe.filter(E=>E.group===r).map(E=>e.jsx("option",{value:E.value,children:E.label},E.value))},r))})]})}),e.jsxs("div",{className:"three-d-extras",children:[e.jsxs("label",{className:"surface-toggle",children:[e.jsx("input",{type:"checkbox",checked:L,onChange:r=>S(r.target.checked)}),"Fitted Surface"]}),L&&e.jsxs("div",{className:"surface-opacity",children:[e.jsx("span",{children:"Opacity"}),e.jsx("input",{type:"range",min:"0.1",max:"0.8",step:"0.05",value:k,onChange:r=>B(Number(r.target.value))}),e.jsxs("span",{className:"opacity-value",children:[Math.round(k*100),"%"]})]}),e.jsxs("label",{className:"surface-toggle",children:[e.jsx("input",{type:"checkbox",checked:ne,onChange:r=>F(r.target.checked)}),"Predict Surface"]}),ne&&e.jsxs("div",{className:"prediction-legend",children:[e.jsx("span",{className:"pred-dot",style:{background:"#22c55e"}}),"Matte",e.jsx("span",{className:"pred-dot",style:{background:"#3b82f6"}}),"Gloss",e.jsx("span",{className:"pred-dot",style:{background:"#f59e0b"}}),"Satin",e.jsx("span",{className:"pred-dot",style:{background:"#a855f7"}}),"Crystal"]})]}),e.jsxs("div",{className:"camera-presets",children:[e.jsx("span",{className:"presets-label",children:"Camera"}),e.jsxs("div",{className:"preset-buttons",children:[["default","top","side-x","side-y"].map(r=>e.jsx("button",{className:`preset-btn ${K===r?"active":""}`,onClick:()=>A(r),title:{default:"Perspective view (1)",top:"Top-down / birds eye (2)","side-x":"Side view along Al₂O₃ (3)","side-y":"Side view along SiO₂ (4)"}[r],children:{default:"⬢",top:"⮝","side-x":"⮞","side-y":"⮜"}[r]},r)),e.jsx("button",{className:"preset-btn",onClick:Ie,title:"Reset camera to current preset",children:"↺"})]})]}),e.jsxs("div",{className:"three-d-control-row",children:[e.jsxs("label",{className:"surface-toggle",children:[e.jsx("input",{type:"checkbox",checked:R,onChange:r=>U(r.target.checked)}),"Auto-Rotate"]}),R&&e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"0.1",max:"2",step:"0.1",value:Q,onChange:r=>ie(Number(r.target.value)),title:`Speed: ${Q.toFixed(1)}x`}),e.jsxs("span",{className:"slider-value",children:[Q.toFixed(1),"x"]})]})]}),e.jsxs("div",{className:"three-d-control-row",children:[e.jsx("span",{className:"control-row-label",children:"Point Size"}),e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"1",max:"8",step:"0.5",value:ye,onChange:r=>ve(Number(r.target.value))}),e.jsx("span",{className:"slider-value",children:ye.toFixed(1)})]})]}),e.jsxs("div",{className:"three-d-control-row",children:[e.jsx("span",{className:"control-row-label",children:"Z Stretch"}),e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"0.2",max:"2.0",step:"0.1",value:he,onChange:r=>Ee(Number(r.target.value))}),e.jsx("span",{className:"slider-value",children:he.toFixed(1)})]})]}),e.jsxs("div",{className:"three-d-control-row",children:[e.jsx("span",{className:"control-row-label",children:"Perspective"}),e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:Z,onChange:r=>Y(Number(r.target.value)),title:Z<.01?"Orthographic":`Perspective: ${Math.round(Z*100)}%`}),e.jsx("span",{className:"slider-value",children:Z<.01?"Ortho":`${Math.round(Z*100)}%`})]})]}),e.jsxs("div",{className:"light-control",children:[e.jsxs("label",{className:"surface-toggle",children:[e.jsx("input",{type:"checkbox",checked:v,onChange:r=>T(r.target.checked)}),"Light Source"]}),v&&e.jsx("div",{style:{marginTop:6,display:"flex",flexDirection:"column",gap:4},children:["x","y","z"].map(r=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:12},children:[e.jsx("span",{style:{width:12,color:"var(--text-secondary)"},children:r.toUpperCase()}),e.jsx("input",{type:"range",min:"-3",max:"3",step:"0.1",value:X[r],onChange:E=>V($=>({...$,[r]:Number(E.target.value)})),style:{flex:1}}),e.jsx("span",{style:{fontSize:11,color:"var(--text-dim)",minWidth:28,textAlign:"right"},children:X[r].toFixed(1)})]},r))})]}),e.jsxs("div",{className:"three-d-control-row proximity-control",children:[e.jsxs("label",{className:"surface-toggle",style:{margin:0},children:[e.jsx("input",{type:"checkbox",checked:Ne,onChange:r=>Me(r.target.checked),disabled:!_}),"Proximity"]}),Ne&&_&&e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"0.05",max:"1.5",step:"0.05",value:$e,onChange:r=>d(Number(r.target.value)),title:`Radius: ${($e*100).toFixed(0)}%`}),e.jsx("span",{className:"slider-value",children:y?`${y.visible}/${y.total}`:`${($e*100).toFixed(0)}%`})]}),Ne&&!_&&e.jsx("span",{className:"slider-value",style:{fontSize:10,opacity:.6},children:"Select a glaze"})]}),Ne&&_&&(()=>{const r=[{label:"Balanced",title:"Equal weight on all axes",weights:{x:.5,y:.5,z:.5,cone:0,surface:0}},{label:"Chemistry Twin",title:"Prioritize SiO₂ and Al₂O₃ match",weights:{x:1,y:1,z:.3,cone:0,surface:0}},{label:"Same Surface",title:"Must match surface type",weights:{x:.3,y:.3,z:.2,cone:0,surface:1}},{label:"Same Cone",title:"Prioritize firing temperature match",weights:{x:.2,y:.2,z:.2,cone:1,surface:0}},{label:"Flux Sibling",title:"Match on Z-axis (flux/ratio)",weights:{x:.2,y:.2,z:1,cone:0,surface:0}}],E=[{key:"x",label:"SiO₂",color:"#3b82f6"},{key:"y",label:"Al₂O₃",color:"#22c55e"},{key:"z",label:Oe(g),color:"#f59e0b"},{key:"cone",label:"Cone",color:"#a855f7"},{key:"surface",label:"Surface",color:"#ec4899"}],$=Object.keys(Ke).every(C=>ce[C]===Ke[C]);return e.jsxs("div",{className:"aesthetic-compass",children:[e.jsxs("button",{className:`compass-toggle${Ce?" open":""}`,onClick:()=>de(C=>!C),children:[e.jsx("span",{className:"compass-icon",children:"🧭"}),e.jsx("span",{children:"Aesthetic Compass"}),!$&&e.jsx("span",{className:"compass-active-dot"}),e.jsx("span",{className:"compass-chevron",children:Ce?"▾":"▸"})]}),Ce&&e.jsxs("div",{className:"compass-body",children:[e.jsx("div",{className:"compass-presets",children:r.map(C=>{const ke=Object.keys(C.weights).every(we=>Math.abs(ce[we]-C.weights[we])<.01);return e.jsx("button",{className:`compass-preset-btn${ke?" active":""}`,onClick:()=>We({...C.weights}),title:C.title,children:C.label},C.label)})}),e.jsx("div",{className:"compass-sliders",children:E.map(C=>e.jsxs("div",{className:"compass-slider-row",children:[e.jsx("span",{className:"compass-slider-label",style:{color:C.color},children:C.label}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:ce[C.key],onChange:ke=>We(we=>({...we,[C.key]:Number(ke.target.value)})),className:"compass-slider",style:{"--slider-color":C.color}}),e.jsxs("span",{className:"compass-slider-val",children:[(ce[C.key]*100).toFixed(0),"%"]})]},C.key))}),!$&&e.jsx("button",{className:"compass-reset-btn",onClick:()=>We({...Ke}),children:"Reset to default"})]})]})})(),Ne&&y&&y.nearby.length>0&&e.jsx(Jr,{proximityStats:y,glazes:Ve,selectedGlaze:_,pinnedCenterId:xe,hoveredNeighborId:D,explorationPath:je,zAxis:g,onSelectGlaze:Be,onCompareGlaze:Qe,onHoverNeighbor:J,onPinCenter:P,onExplorationPathChange:ze}),e.jsxs("div",{className:"three-d-shortcuts-hint",children:[e.jsx("kbd",{children:"1"}),"–",e.jsx("kbd",{children:"4"})," camera presets   ",e.jsx("kbd",{children:"R"})," rotate   ",e.jsx("kbd",{children:"0"})," reset"]})]})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Zoom"}),e.jsxs("div",{className:"zoom-control",children:[e.jsx("input",{type:"range",min:"0.5",max:"4",step:"0.1",value:p,onChange:r=>f(Number(r.target.value)),"aria-label":`Zoom level: ${p.toFixed(1)}x`}),e.jsxs("span",{className:"zoom-value",children:[p.toFixed(1),"x"]})]}),e.jsx("button",{className:"reset-zoom",onClick:()=>f(1),children:"Reset"})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Limit Formulas"}),e.jsxs("label",{className:"surface-toggle",style:{marginBottom:4},children:[e.jsx("input",{type:"checkbox",checked:W,onChange:r=>H(r.target.checked)}),"Show Limits"]}),W&&e.jsxs("div",{style:{marginTop:4},children:[e.jsxs("label",{style:{fontSize:12,color:"var(--text-secondary)"},children:["Highlight Cone",e.jsxs("select",{value:se,onChange:r=>re(r.target.value),style:{marginLeft:6,fontSize:12},children:[e.jsx("option",{value:"06",children:"Cone 06"}),e.jsx("option",{value:"04",children:"Cone 04"}),e.jsx("option",{value:"6",children:"Cone 6"}),e.jsx("option",{value:"9",children:"Cone 9"}),e.jsx("option",{value:"10",children:"Cone 10"}),e.jsx("option",{value:"11",children:"Cone 11"})]})]}),e.jsx("p",{style:{fontSize:10,color:"var(--text-tertiary)",margin:"4px 0 0",lineHeight:1.3},children:"Safe oxide ranges from Digitalfire & ceramic literature"})]})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Export"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("button",{className:"reset-zoom",onClick:()=>Nt("png","stull-atlas-chart"),title:"Save chart as a high-res PNG image",children:"📷 Save Image (PNG)"}),e.jsx("button",{className:"reset-zoom",onClick:()=>Nt("svg","stull-atlas-chart"),title:"Save chart as SVG vector graphic",children:"🖼 Save Image (SVG)"}),e.jsx("button",{className:"reset-zoom",onClick:()=>or("Stull Atlas"),title:"Print or save as PDF",children:"🖨 Print / PDF"}),u&&ae&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{borderTop:"1px solid var(--border)",margin:"4px 0",paddingTop:4},children:e.jsx("span",{style:{fontSize:10,color:"var(--text-tertiary)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em"},children:"3D Surface"})}),e.jsx("button",{className:"reset-zoom",onClick:()=>nr(ae,{zLabel:Oe(g),scatterPoints:N}),title:"Export surface mesh as OBJ — opens in Blender, MeshLab, etc.",children:"🧊 Surface Mesh (OBJ)"}),e.jsx("button",{className:"reset-zoom",onClick:()=>sr(ae),title:"Export surface mesh as STL — for 3D printing or CAD tools",children:"🔺 Surface Mesh (STL)"}),e.jsx("button",{className:"reset-zoom",onClick:()=>lr(N,{zLabel:Oe(g)}),title:"Export glaze scatter points as CSV with 3D coordinates",children:"📊 3D Points (CSV)"})]})]})]}),Ae.molarWeights&&e.jsx(Lr,{}),Ae.analysisSetPicker&&e.jsx(_r,{}),e.jsx(gr,{}),Ae.filterPanel&&e.jsx(da,{}),it&&e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Overlays"}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,fontSize:13,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:ct,onChange:r=>a(r.target.checked)}),"Density Heatmap"]})]})]}),e.jsxs("main",{className:"plot-container","aria-label":"Stull chart visualization",children:[t.active&&e.jsxs("div",{className:"kiosk-overlay",children:[e.jsxs("div",{className:"kiosk-brand",children:[e.jsx("span",{className:"kiosk-title",children:"Stull Atlas"}),e.jsx("span",{className:"kiosk-tagline",children:"Ceramic chemistry in three dimensions"})]}),e.jsx("div",{className:"kiosk-hint",children:"stullatlas.com"})]}),u?e.jsx(o.Suspense,{fallback:e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",flex:1,color:"var(--text-secondary)",fontSize:14},children:"Loading 3D view..."}),children:e.jsx(oa,{zAxis:g,colorBy:m,zoom:p,highlightPointIds:ot,highlightCircle:Je,showSurface:L,surfaceOpacity:k,showPrediction:ne,cameraPreset:K,perspective:Z,lightPosition:v?X:void 0,onSurfaceGridReady:Ye,autoRotate:R,autoRotateSpeed:Q,pointSize:ye,zStretch:he,proximityRadius:Ne&&_?$e:null,proximityCenterId:xe,proximityWeights:ce,hoveredNeighborId:D,onProximityStats:G,onResetCamera:Ie,kioskMode:t.active},De)}):e.jsx(kr,{xAxis:i,yAxis:l,colorBy:m,zoom:p,highlightPointIds:ot,highlightCircle:Je,densityMap:ct?it:null,showLimits:W,limitCone:W?se:null})]}),qe&&!t.active&&e.jsxs("aside",{className:"detail-panel","aria-label":"Glaze details",children:[e.jsx("button",{className:"close-sidebar",onClick:Xe,"aria-label":"Close sidebar",children:"×"}),e.jsxs("div",{className:"sidebar-tabs",role:"tablist","aria-label":"Detail panel views",children:[e.jsx("button",{className:`sidebar-tab ${ge==="detail"?"active":""}`,onClick:()=>Re("detail"),role:"tab","aria-selected":ge==="detail",children:"Detail"}),e.jsxs("button",{className:`sidebar-tab ${ge==="compare"?"active":""}`,onClick:()=>Re("compare"),role:"tab","aria-selected":ge==="compare",children:["Compare",Te.length>0?` (${Te.length})`:""]}),e.jsx("button",{className:`sidebar-tab ${ge==="analysis"?"active":""}`,onClick:()=>Re("analysis"),role:"tab","aria-selected":ge==="analysis",children:"Analysis"}),Ae.knowledgeTab&&e.jsx("button",{className:`sidebar-tab ${ge==="knowledge"?"active":""}`,onClick:()=>Re("knowledge"),role:"tab","aria-selected":ge==="knowledge",title:"Ceramic knowledge from Tony Hansen's Digitalfire Reference Library",children:"Knowledge"})]}),ge==="detail"&&e.jsx(e.Fragment,{children:_?e.jsxs("div",{className:"glaze-detail",role:"tabpanel","aria-label":"Selected glaze details",children:[e.jsxs("div",{className:"sr-only","aria-live":"polite",children:["Selected: ",_.name,", Cone ",_.coneRange[0]," to ",_.coneRange[1],", ",_.surfaceType," surface"]}),e.jsx("h2",{children:_.name}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8},children:e.jsx(dr,{glazeTypeId:_.glazeTypeId,showParent:!0})}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Source"}),e.jsx("p",{children:_.source}),_.sourceUrl&&e.jsx("a",{href:_.sourceUrl,target:"_blank",rel:"noopener noreferrer",children:"View original →"}),_.id.startsWith("glazy_")&&e.jsx("a",{href:`https://glazy.org/recipes/${_.id.replace("glazy_","")}`,target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:4,fontSize:12,marginTop:4},children:"View on Glazy →"})]}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Firing"}),e.jsx(pr,{coneRange:_.coneRange}),_.atmosphere!=="unknown"&&e.jsx("p",{style:{margin:"4px 0 0",fontSize:12,color:"var(--text-label)"},children:_.atmosphere})]}),(()=>{var $,C;const r=_.umf;if(!r)return null;const E=[{label:"Fluxes (R₂O)",oxides:["Li2O","Na2O","K2O"]},{label:"Fluxes (RO)",oxides:["CaO","MgO","ZnO","BaO","SrO"]},{label:"Stabilizers",oxides:["Al2O3","B2O3","Fe2O3"]},{label:"Glass Formers",oxides:["SiO2","TiO2","ZrO2"]}];return e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"UMF"}),e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-start",marginBottom:8},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6,alignItems:"center"},children:[e.jsx(Kt,{umf:r,size:56}),e.jsx(hr,{x:(($=r.SiO2)==null?void 0:$.value)??0,y:((C=r.Al2O3)==null?void 0:C.value)??0,size:56})]}),e.jsxs("div",{style:{flex:1},children:[e.jsx(Vt,{umf:r,showLabels:!0,width:160}),e.jsx(rr,{umf:r,size:130})]})]}),e.jsx("table",{className:"recipe-table",style:{fontSize:12},children:e.jsxs("tbody",{children:[E.map(ke=>{const we=ke.oxides.filter(Se=>{var q;return(((q=r[Se])==null?void 0:q.value)??0)>.001}).map(Se=>{var q;return{ox:Se,val:((q=r[Se])==null?void 0:q.value)??0}});return we.length===0?null:e.jsxs(St.Fragment,{children:[e.jsx("tr",{children:e.jsx("td",{colSpan:2,style:{color:"var(--text-muted)",fontSize:11,paddingTop:6},children:ke.label})}),we.map(({ox:Se,val:q})=>e.jsxs("tr",{children:[e.jsx(ar,{oxide:Se}),e.jsx("td",{className:"amount",children:q.toFixed(3)})]},Se))]},ke.label)}),r._meta&&e.jsxs(e.Fragment,{children:[e.jsx("tr",{children:e.jsx("td",{colSpan:2,style:{color:"var(--text-muted)",fontSize:11,paddingTop:6},children:"Ratios"})}),e.jsxs("tr",{children:[e.jsx("td",{children:"Si:Al"}),e.jsx("td",{className:"amount",children:r._meta.SiO2_Al2O3_ratio.toFixed(2)})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"R₂O:RO"}),e.jsx("td",{className:"amount",children:r._meta.R2O_RO_ratio.toFixed(2)})]})]})]})})]})})(),_.images&&_.images.length>0&&e.jsx(ra,{images:_.images,glazeName:_.name,sidebarTab:ge}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Recipe"}),_.ingredients.length>0?e.jsxs(e.Fragment,{children:[e.jsx(xr,{ingredients:_.ingredients}),e.jsx("table",{className:"recipe-table",style:{marginTop:6},children:e.jsx("tbody",{children:_.ingredients.map((r,E)=>e.jsxs("tr",{children:[e.jsx("td",{children:r.material}),e.jsx("td",{className:"amount",children:r.amount})]},E))})})]}):e.jsx("p",{style:{color:"var(--text-muted)",fontSize:12,margin:0},children:"No recipe data available"})]}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Similar Glazes"}),e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:8},children:[e.jsx("select",{value:I,onChange:r=>ee(Number(r.target.value)),style:{width:70,background:"var(--bg-tertiary)",border:"1px solid var(--border-primary)",borderRadius:6,color:"var(--text-label)",fontSize:12,padding:"4px 6px"},children:[3,6,9,12].map(r=>e.jsx("option",{value:r,children:r},r))}),e.jsx("button",{onClick:pe,style:{background:"var(--bg-tertiary)",border:"1px solid var(--border-primary)",borderRadius:6,color:"var(--text-label)",fontSize:12,padding:"4px 8px",cursor:"pointer"},children:"Reset"})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6,marginBottom:10},children:ue.map(r=>e.jsxs("label",{style:{display:"grid",gridTemplateColumns:"58px 1fr 40px",alignItems:"center",gap:8,fontSize:12,color:"var(--text-label)"},children:[e.jsx("span",{children:r}),e.jsx("input",{type:"range",min:"0",max:"3",step:"0.25",value:j[r]??1,onChange:E=>le(r,Number(E.target.value))}),e.jsx("span",{style:{color:"var(--text-muted)",textAlign:"right"},children:(j[r]??1).toFixed(2)})]},r))}),z.length>0?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6},children:z.map(({glaze:r,dist:E},$)=>e.jsxs("button",{onClick:()=>Be(r),style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 8px",background:"var(--bg-tertiary)",border:"1px solid var(--border-primary)",borderRadius:6,color:"var(--text-label)",fontSize:12,cursor:"pointer"},children:[e.jsx("span",{style:{textAlign:"left"},children:r.name}),e.jsx("span",{style:{color:"var(--text-muted)"},children:E.toFixed(2)})]},r.id))}):e.jsx("p",{style:{color:"var(--text-muted)",fontSize:12,margin:0},children:"No similar matches found"})]}),_.notes&&e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Notes"}),e.jsx("p",{children:_.notes})]}),e.jsx("button",{className:"add-compare-btn",onClick:()=>Qe(_),disabled:Te.length>=3||Te.some(r=>r.id===_.id),title:Te.some(r=>r.id===_.id)?"Already in comparison":Te.length>=3?"Max 3 glazes":"Add to comparison",children:Te.some(r=>r.id===_.id)?"✓ In Compare":"+ Add to Compare"})]}):e.jsx("div",{className:"no-selection",children:e.jsx("p",{children:"Click a point to see glaze details"})})}),ge==="compare"&&e.jsx(o.Suspense,{fallback:e.jsx("div",{style:{padding:16,fontSize:13,color:"var(--text-secondary)"},children:"Loading compare..."}),children:e.jsx(na,{glazes:Te,onRemove:rt,onClear:at,onSelect:Be})}),ge==="analysis"&&e.jsx(o.Suspense,{fallback:e.jsx("div",{style:{padding:16,fontSize:13,color:"var(--text-secondary)"},children:"Loading analysis..."}),children:e.jsx(sa,{onHighlightCluster:lt,onHighlightVoid:gt,onDensityMap:s})}),Ae.knowledgeTab&&ge==="knowledge"&&e.jsx(o.Suspense,{fallback:e.jsx("div",{style:{padding:16,fontSize:13,color:"var(--text-secondary)"},children:"Loading knowledge..."}),children:e.jsx(la,{selectedGlaze:_})})]}),e.jsx("style",{children:aa})]})}function It(){ir("Explorer");const{isLoading:t,loadError:i,retry:n}=Jt();return i?e.jsxs("div",{style:{display:"flex",flex:1,alignItems:"center",justifyContent:"center",background:"var(--bg-primary)",color:"var(--text-primary)",flexDirection:"column",gap:16,padding:40},children:[e.jsx("div",{style:{fontSize:48,opacity:.3},children:"⚗"}),e.jsx("h2",{style:{margin:0,fontSize:18},children:"Failed to load glaze dataset"}),e.jsx("p",{style:{color:"var(--text-secondary)",fontSize:14,maxWidth:400,textAlign:"center",margin:0},children:i}),e.jsx("button",{onClick:n,style:{padding:"8px 20px",background:"var(--accent-bg)",border:"1px solid var(--accent)",borderRadius:6,color:"var(--text-bright)",fontSize:14,cursor:"pointer"},children:"Retry"})]}):t?e.jsxs("div",{style:{display:"flex",flex:1,alignItems:"center",justifyContent:"center",background:"var(--bg-primary)",color:"var(--text-secondary)",flexDirection:"column",gap:16},children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{style:{fontSize:14},children:"Loading glaze dataset…"}),e.jsx("style",{children:`
          .loading-spinner {
            width: 40px; height: 40px;
            border: 3px solid var(--border-primary);
            border-top-color: var(--accent);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg) } }
        `})]}):e.jsx(pa,{})}const wa=Object.freeze(Object.defineProperty({__proto__:null,ExplorerPage:It,default:It},Symbol.toStringTag,{value:"Module"}));export{pr as C,wa as E,dr as G};
