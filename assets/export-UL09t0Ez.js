const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/plotly-custom-2d-Dif0dPrU.js","assets/find_empties-DDImwCJs.js","assets/vendor-react-D0vdeqNS.js","assets/find_empties-CuCRB34y.css"])))=>i.map(i=>d[i]);
import{_ as R}from"./index-Cx-RWLMS.js";import{g}from"./umf-DcIxpM70.js";import"./vendor-react-D0vdeqNS.js";import"./vendor-state-DTYbmM1J.js";import"./vendor-router-DjLFn5nj.js";const O=["SiO2","Al2O3","B2O3","Na2O","K2O","CaO","MgO","ZnO","BaO","SrO","Li2O","Fe2O3","TiO2"];function j(t){const a=t.length>0&&t[0].meta?Object.keys(t[0].meta):[],n=["Label",...a,...O].join(","),o=t.map(i=>{const s=a.map(c=>{var r;return((r=i.meta)==null?void 0:r[c])??""}),e=O.map(c=>g(i.umf,c).toFixed(4));return[`"${i.label.replace(/"/g,'""')}"`,...s,...e].join(",")});return[n,...o].join(`
`)}function G(t,a="stull-atlas-export.csv"){const n=j(t);_(n,a,"text/csv")}function Z(t,a,n){const o=[];o.push("Recipe"),o.push("Material,Amount");for(const s of t.ingredients)o.push(`"${s.material}",${s.amount}`);o.push(""),o.push("Unity Molecular Formula"),o.push("Oxide,Value");for(const s of O){const e=g(a,s);e>.001&&o.push(`${s},${e.toFixed(4)}`)}const i=o.join(`
`);_(i,`${t.name||"recipe"}.csv`,"text/csv")}function E(t){return`<!DOCTYPE html>
<html>
<head>
<title>Stull Atlas — Test Tile Labels</title>
<style>
  @page { margin: 10mm; }
  body { font-family: -apple-system, sans-serif; color: #111; }
  .label {
    border: 1px solid #ccc;
    padding: 8px 12px;
    margin: 4px 0;
    break-inside: avoid;
    font-size: 11px;
  }
  .label-name { font-weight: 700; font-size: 13px; margin-bottom: 4px; }
  .label-umf { color: #555; }
  .label-recipe { margin-top: 4px; color: #888; font-size: 10px; }
  @media print {
    .label { border: 1px solid #999; }
  }
</style>
</head>
<body>
${t.map(n=>{const o=O.map(s=>({oxide:s,val:g(n.umf,s)})).filter(s=>s.val>.001),i=n.recipe?n.recipe.ingredients.map(s=>`${s.material}: ${s.amount}`).join("<br/>"):"";return`
      <div class="label">
        <div class="label-name">${n.label}</div>
        <div class="label-umf">
          ${o.map(s=>`<span>${s.oxide}: ${s.val.toFixed(2)}</span>`).join(" · ")}
        </div>
        ${i?`<div class="label-recipe">${i}</div>`:""}
      </div>
    `}).join("")}
</body>
</html>`}function Y(t){const a=E(t),n=window.open("","_blank");n&&(n.document.write(a),n.document.close(),setTimeout(()=>n.print(),500))}function _(t,a,n){const o=new Blob([t],{type:n}),i=URL.createObjectURL(o),s=document.createElement("a");s.href=i,s.download=a,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i)}function v(t,a){const n=URL.createObjectURL(t),o=document.createElement("a");o.href=n,o.download=a,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(n)}async function D(t="png",a="stull-atlas-chart",n=1920,o=1080){try{const i=await R(()=>import("./plotly-custom-2d-Dif0dPrU.js"),__vite__mapDeps([0,1,2,3])),s=document.querySelector(".js-plotly-plot");if(!s)return console.warn("[Export] No Plotly chart found in DOM"),!1;const e=await i.toImage(s,{format:t,width:n,height:o,scale:2}),r=await(await fetch(e)).blob();return v(r,`${a}.${t}`),!0}catch(i){return console.error("[Export] Failed to export chart image:",i),!1}}function J(t="Stull Atlas Export"){const a=document.createElement("style");a.id="print-export-styles",a.textContent=`
    @media print {
      /* Hide navigation, controls */
      .layout-nav, .layout-header, .calc-sidebar,
      .explorer-controls, .filter-panel, .whatif-panel,
      button, .tabs, .tab-bar { display: none !important; }
      
      /* Make content fill the page */
      .calc-main, .calc-page, .explorer-main,
      .about-page, .about-content { 
        width: 100% !important;
        max-width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      
      /* Ensure chart is visible */
      .js-plotly-plot {
        width: 100% !important;
        height: auto !important;
      }
      
      /* Print header */
      body::before {
        content: '${t} — stullatlas.app';
        display: block;
        text-align: center;
        font-size: 12pt;
        color: #666;
        padding: 8px 0 16px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 16px;
      }
      
      /* Ensure tables print well */
      .results-table { font-size: 10pt; }
      .results-panel { break-inside: avoid; }
    }
  `,document.head.appendChild(a),window.print(),setTimeout(()=>{const n=document.getElementById("print-export-styles");n&&n.remove()},1e3)}const A=["SiO2","Al2O3","B2O3","Li2O","Na2O","K2O","CaO","MgO","BaO","SrO","ZnO","MnO","Fe2O3","TiO2","ZrO2","P2O5","Cr2O3","NiO","CuO","CoO","SnO2"],L={gloss:1,satin:2,matte:3,unknown:4,crystalline:5,crawl:6},C={transparent:1,translucent:2,opaque:3},T={oxidation:1,reduction:2,neutral:3};function U(t){const a={};if(t.umf)for(const n of A){const o=g(t.umf,n);o>0&&(a[n]=parseFloat(o.toFixed(4)))}return{id:t.id.replace(/^glazy_/,""),name:t.name,source:t.source,base_type_id:t.baseTypeId??460,type_id:t.glazeTypeId??null,subtype_id:t.subtypeId??null,from_orton_cone:t.coneRange[0]!=="?"?t.coneRange[0]:null,to_orton_cone:t.coneRange[1]!=="?"?t.coneRange[1]:null,surface_type:L[t.surfaceType]??4,transparency_type:t.transparency?C[t.transparency]??null:null,atmosphere:T[t.atmosphere]??null,country:t.country??null,status:t.status??"draft",description:t.description??t.notes??"",specific_gravity:t.specificGravity??null,material_components:t.ingredients.map((n,o)=>({material_id:n.glazyMaterialId??null,material_name:n.material,percentage_amount:n.amount,is_additional:n.isAdditional??!1,sort_order:o})),umf:a,images:t.images??[],source_url:t.sourceUrl??null,created_at:t.createdAt??null,updated_at:t.updatedAt??null}}function q(t,a="stull-atlas-glazy-export.csv"){const o=["id","name","from_orton_cone","to_orton_cone","surface_type","transparency_type","atmosphere","base_type_id","type_id","subtype_id","country",...A.map(e=>`${e}_umf`)].join(","),i=t.map(e=>{const c=A.map(r=>e.umf?g(e.umf,r).toFixed(4):"");return[e.id.replace(/^glazy_/,""),`"${(e.name||"").replace(/"/g,'""')}"`,e.coneRange[0]!=="?"?e.coneRange[0]:"",e.coneRange[1]!=="?"?e.coneRange[1]:"",L[e.surfaceType]??"",e.transparency?C[e.transparency]??"":"",T[e.atmosphere]??"",e.baseTypeId??460,e.glazeTypeId??"",e.subtypeId??"",e.country??"",...c].join(",")}),s=[o,...i].join(`
`);v(new Blob([s],{type:"text/csv"}),a)}function H(t,a="stull-atlas-glazy-export.json"){const n=t.map(U),o=JSON.stringify(n,null,2);v(new Blob([o],{type:"application/json"}),a)}function z(t){var p;const{xCoords:a,yCoords:n,z:o}=t,i=a.length,s=n.length,e=[],c=new Map;for(let l=0;l<s;l++)for(let u=0;u<i;u++){const f=(p=o[l])==null?void 0:p[u];f==null||!isFinite(f)||(e.push([a[u],n[l],f]),c.set(`${l},${u}`,e.length))}const r=[];for(let l=0;l<s-1;l++)for(let u=0;u<i-1;u++){const f=c.get(`${l},${u}`),h=c.get(`${l},${u+1}`),d=c.get(`${l+1},${u}`),m=c.get(`${l+1},${u+1}`);f&&h&&d&&m&&(r.push([f,d,h]),r.push([h,d,m]))}return{vertices:e,faces:r}}function M(t,a={}){const{zLabel:n="Z",scatterPoints:o}=a,{vertices:i,faces:s}=z(t),e=["# Stull Atlas 3D Surface Export",`# Axes: X = SiO2 (UMF), Y = Al2O3 (UMF), Z = ${n}`,"# Generated by stullatlas.app",`# Vertices: ${i.length}, Faces: ${s.length}`,"","o FittedSurface"];for(const[c,r,p]of i)e.push(`v ${c.toFixed(6)} ${r.toFixed(6)} ${p.toFixed(6)}`);e.push("");for(const[c,r,p]of s)e.push(`f ${c} ${r} ${p}`);if(o&&o.length>0){e.push(""),e.push("o GlazePoints");const c=i.length;for(const r of o)e.push(`v ${r.x.toFixed(6)} ${r.y.toFixed(6)} ${r.z.toFixed(6)}`);for(let r=0;r<o.length;r++)e.push(`p ${c+r+1}`)}return e.push(""),e.join(`
`)}function K(t,a={}){const{filename:n="stull-atlas-surface.obj",...o}=a,i=M(t,o);_(i,n,"model/obj")}function B(t){const{vertices:a,faces:n}=z(t),o=n.length,i=84+o*50,s=new ArrayBuffer(i),e=new DataView(s),p=new TextEncoder().encode("Stull Atlas Surface Export - stullatlas.app");for(let u=0;u<Math.min(80,p.length);u++)e.setUint8(u,p[u]);e.setUint32(80,o,!0);let l=84;for(const[u,f,h]of n){const d=a[u-1],m=a[f-1],b=a[h-1],y=[m[0]-d[0],m[1]-d[1],m[2]-d[2]],x=[b[0]-d[0],b[1]-d[1],b[2]-d[2]],$=y[1]*x[2]-y[2]*x[1],F=y[2]*x[0]-y[0]*x[2],S=y[0]*x[1]-y[1]*x[0],w=Math.sqrt($*$+F*F+S*S)||1;e.setFloat32(l,$/w,!0),l+=4,e.setFloat32(l,F/w,!0),l+=4,e.setFloat32(l,S/w,!0),l+=4,e.setFloat32(l,d[0],!0),l+=4,e.setFloat32(l,d[1],!0),l+=4,e.setFloat32(l,d[2],!0),l+=4,e.setFloat32(l,m[0],!0),l+=4,e.setFloat32(l,m[1],!0),l+=4,e.setFloat32(l,m[2],!0),l+=4,e.setFloat32(l,b[0],!0),l+=4,e.setFloat32(l,b[1],!0),l+=4,e.setFloat32(l,b[2],!0),l+=4,e.setUint16(l,0,!0),l+=2}return s}function X(t,a={}){const{filename:n="stull-atlas-surface.stl"}=a,o=B(t);v(new Blob([o],{type:"model/stl"}),n)}function Q(t,a={}){const{filename:n="stull-atlas-3d-points.csv",zLabel:o="Z"}=a,i=`SiO2,Al2O3,${o},Name`,s=t.map(e=>`${e.x.toFixed(4)},${e.y.toFixed(4)},${e.z.toFixed(4)},"${(e.name||"").replace(/"/g,'""')}"`);_([i,...s].join(`
`),n,"text/csv")}export{j as buildBlendCSV,M as buildOBJContent,B as buildSTLBuffer,J as exportAsPrintPDF,G as exportBlendCSV,q as exportGlazyCSV,H as exportGlazyJSON,D as exportPlotAsImage,Z as exportRecipeCSV,Q as exportScatterAsCSV,K as exportSurfaceAsOBJ,X as exportSurfaceAsSTL,E as generateLabelsHTML,Y as printLabels,U as recipeToGlazyJSON,z as triangulateSurfaceGrid};
