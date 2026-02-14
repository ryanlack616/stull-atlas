const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/plotly-gl2d-B8_X3w7e.js","assets/vendor-react-D380Hx73.js","assets/plotly-gl3d-DYPPaO4p.js","assets/ComparePanel-D5vB-OOe.js","assets/OxideRadar-BRo5lEwo.js","assets/index-DUKXpxkf.js","assets/vendor-state-CUnBHQ16.js","assets/vendor-router-1trnvaIQ.js","assets/index-JM3wRy89.css","assets/OxideLink-DfHeNf4K.js","assets/domain-digitalfire-DfgmtSpv.js","assets/data-digitalfire-CCT-bSzB.js","assets/umf-Bx7e6FOm.js","assets/validation-BBji9Y6-.js","assets/glazeService-CW_f59Iq.js","assets/export-BPAFPFXr.js","assets/usePageTitle-DBGH44HI.js","assets/index-BAskAcIm.js","assets/index-DNJCmhuO.js"])))=>i.map(i=>d[i]);
import{r as n,j as e,g as Gt,R as wt}from"./vendor-react-D380Hx73.js";import{c as Xt,a as Re,g as jt,d as ht,f as Qt,_ as qe,h as St,j as ge,u as $t,k as It,l as Jt,n as er,o as tr,q as rr}from"./index-DUKXpxkf.js";import{g as We}from"./umf-Bx7e6FOm.js";import{C as ar}from"./validation-BBji9Y6-.js";import{f as nr}from"./glazeService-CW_f59Iq.js";import{U as Bt,F as Ut,O as or}from"./OxideRadar-BRo5lEwo.js";import{a as sr}from"./OxideLink-DfHeNf4K.js";import{exportPlotAsImage as Ct,exportAsPrintPDF as ir,exportSurfaceAsOBJ as lr,exportSurfaceAsSTL as cr,exportScatterAsCSV as dr}from"./export-BPAFPFXr.js";import{u as pr}from"./usePageTitle-DBGH44HI.js";const ut=["SiO2","Al2O3","B2O3","Na2O","K2O","CaO","MgO","ZnO","SrO","BaO"];function ur(t,i){const[o,c]=n.useState(()=>ut.reduce((N,I)=>({...N,[I]:1}),{})),[d,f]=n.useState(6),[y,h]=n.useState(o),v=n.useRef();n.useEffect(()=>(v.current=setTimeout(()=>h(o),150),()=>clearTimeout(v.current)),[o]);const x=n.useCallback(()=>{const N=ut.reduce((I,S)=>({...I,[S]:1}),{});c(N),h(N)},[]),g=n.useCallback((N,I)=>{c(S=>({...S,[N]:I}))},[]);return{results:n.useMemo(()=>{if(!t)return[];const N=Array.from(i.values());return nr(t,N,{weights:y,count:d,oxides:ut})},[t,i,y,d]),weights:o,count:d,setCount:f,updateWeight:g,resetWeights:x,oxides:ut}}function Wt(t){const{atmospheres:i,surfaces:o,coneMin:c,coneMax:d,hasIngredients:f,hasImages:y,activeCount:h}=Xt(),v=Re(x=>x.glazes);return n.useMemo(()=>h===0?t:t.filter(x=>{const g=v.get(x.id);if(i.size>0){const m=(g==null?void 0:g.atmosphere)??"unknown";if(!i.has(m))return!1}return!(o.size>0&&!o.has(x.surfaceType)||c!==null&&x.cone!==null&&x.cone<c||d!==null&&x.cone!==null&&x.cone>d||f&&g&&(!g.ingredients||g.ingredients.length===0)||y&&g&&(!g.images||g.images.length===0))}),[t,i,o,c,d,f,y,h,v])}function xr({glazeTypeId:t,showParent:i=!1,size:o="md"}){if(t==null)return e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:5,padding:o==="sm"?"1px 6px":"2px 8px",borderRadius:10,background:"var(--bg-tertiary, #2a2a3a)",fontSize:o==="sm"?10:11,color:"var(--text-muted, #666)"},children:[e.jsx("span",{style:{width:o==="sm"?6:8,height:o==="sm"?6:8,borderRadius:"50%",background:"#555",flexShrink:0}}),"Unclassified"]});const c=jt(t),d=ht(t),f=Qt(t),y=f&&f.id!==t?f.name:null;return e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:5,padding:o==="sm"?"1px 6px":"2px 8px",borderRadius:10,background:`${d}18`,border:`1px solid ${d}40`,fontSize:o==="sm"?10:11,color:"var(--text-label, #ccc)",lineHeight:1.4},children:[e.jsx("span",{style:{width:o==="sm"?6:8,height:o==="sm"?6:8,borderRadius:"50%",background:d,flexShrink:0}}),i&&y&&e.jsxs("span",{style:{color:"var(--text-muted, #666)"},children:[y," ›"]}),c]})}const Ot=[{cone:-6,label:"06",color:"#6366f1"},{cone:-5,label:"05",color:"#818cf8"},{cone:-4,label:"04",color:"#3b82f6"},{cone:-3,label:"03",color:"#06b6d4"},{cone:-2,label:"02",color:"#14b8a6"},{cone:-1,label:"01",color:"#10b981"},{cone:0,label:"0",color:"#22c55e"},{cone:1,label:"1",color:"#84cc16"},{cone:2,label:"2",color:"#a3e635"},{cone:3,label:"3",color:"#eab308"},{cone:4,label:"4",color:"#facc15"},{cone:5,label:"5",color:"#f59e0b"},{cone:6,label:"6",color:"#f97316"},{cone:7,label:"7",color:"#ef4444"},{cone:8,label:"8",color:"#dc2626"},{cone:9,label:"9",color:"#e11d48"},{cone:10,label:"10",color:"#be185d"},{cone:11,label:"11",color:"#a855f7"},{cone:12,label:"12",color:"#7c3aed"}];function Nt(t){if(typeof t=="number")return t;const i=String(t).trim().toLowerCase();return/^0\d$/.test(i)?-parseInt(i[1]):parseInt(i)||0}function hr({coneRange:t,width:i=220,height:o=20}){const c=Nt(t[0]),d=Nt(t[1]),f=Math.min(c,d),y=Math.max(c,d),h=Ot.length,v=i/h,x=10,g=x+12;return e.jsx("svg",{width:i,height:o,viewBox:`0 0 ${i} ${o}`,style:{display:"block"},"aria-label":`Firing range: cone ${t[0]} to ${t[1]}`,children:Ot.map((m,N)=>{const I=m.cone>=f&&m.cone<=y;return e.jsxs("g",{children:[e.jsx("rect",{x:N*v,y:0,width:v,height:x,fill:I?m.color:"var(--bg-tertiary, #2a2a3a)",opacity:I?.9:.3,rx:N===0||N===h-1?3:0,children:e.jsxs("title",{children:["Cone ",m.label]})}),(m.cone===f||m.cone===y||m.cone===6||m.cone===0&&!I)&&e.jsx("text",{x:N*v+v/2,y:g,textAnchor:"middle",fill:I?"var(--text-label, #ccc)":"var(--text-muted, #555)",fontSize:8,fontFamily:"system-ui, sans-serif",fontWeight:I?600:400,children:m.label})]},m.cone)})})}const Mt=["#3b82f6","#f59e0b","#22c55e","#ef4444","#8b5cf6","#06b6d4","#f97316","#14b8a6","#e11d48","#a3e635","#6366f1","#eab308"];function fr({ingredients:t,width:i=220,barHeight:o=18,gap:c=3}){const d=n.useMemo(()=>[...t.filter(g=>g.amount>0)].sort((g,m)=>m.amount-g.amount),[t]);if(d.length===0)return null;const f=d.reduce((x,g)=>x+g.amount,0),y=90,h=i-y-35,v=d.length*(o+c)-c;return e.jsx("svg",{width:i,height:v,viewBox:`0 0 ${i} ${v}`,style:{display:"block"},"aria-label":"Recipe ingredient proportions",children:d.map((x,g)=>{const m=g*(o+c),N=x.amount/f*100,I=Math.max(N/100*h,2),S=Mt[g%Mt.length];return e.jsxs("g",{children:[e.jsx("text",{x:y-4,y:m+o/2+1,textAnchor:"end",dominantBaseline:"central",fill:"var(--text-label, #aaa)",fontSize:10,fontFamily:"system-ui, sans-serif",children:x.material.length>14?x.material.slice(0,13)+"…":x.material}),e.jsx("rect",{x:y,y:m,width:h,height:o,fill:"var(--bg-tertiary, #2a2a3a)",rx:3}),e.jsx("rect",{x:y,y:m,width:I,height:o,fill:S,opacity:.8,rx:3,children:e.jsxs("title",{children:[x.material,": ",x.amount.toFixed(1)," (",N.toFixed(1),"%)"]})}),e.jsxs("text",{x:y+h+4,y:m+o/2+1,dominantBaseline:"central",fill:"var(--text-muted, #888)",fontSize:9,fontFamily:"'SF Mono', monospace",children:[N.toFixed(0),"%"]})]},`${x.material}-${g}`)})})}const Tt=.5,mr=7.2,gr=0,_t=1;function br({x:t,y:i,comparePoint:o,size:c=80}){const d=v=>(v-Tt)/(mr-Tt)*c,f=v=>(_t-v)/(_t-gr)*c,y=d(t),h=f(i);return e.jsxs("svg",{width:c,height:c,viewBox:`0 0 ${c} ${c}`,style:{display:"block",border:"1px solid var(--border-primary, #333)",borderRadius:4,background:"var(--bg-tertiary, #1e1e2e)"},"aria-label":`Stull position: SiO₂=${t.toFixed(2)}, Al₂O₃=${i.toFixed(2)}`,children:[e.jsx("rect",{x:0,y:0,width:d(3.2),height:f(.4),fill:"rgba(139,92,246,0.1)",rx:2}),e.jsx("rect",{x:d(3.2),y:f(.4),width:c-d(3.2),height:c-f(.4),fill:"rgba(34,197,94,0.08)",rx:2}),e.jsx("line",{x1:d(1.5),y1:f(.85),x2:d(6),y2:f(.15),stroke:"var(--border-primary, #444)",strokeWidth:.8,strokeDasharray:"3,2"}),e.jsx("text",{x:c/2,y:c-2,textAnchor:"middle",fill:"var(--text-muted, #555)",fontSize:7,fontFamily:"system-ui",children:"SiO₂"}),e.jsx("text",{x:3,y:c/2,textAnchor:"start",dominantBaseline:"central",fill:"var(--text-muted, #555)",fontSize:7,fontFamily:"system-ui",transform:`rotate(-90, 6, ${c/2})`,children:"Al₂O₃"}),e.jsx("text",{x:d(2),y:f(.7),textAnchor:"middle",fill:"var(--text-muted, #444)",fontSize:7,children:"M"}),e.jsx("text",{x:d(4.5),y:f(.2),textAnchor:"middle",fill:"var(--text-muted, #444)",fontSize:7,children:"G"}),o&&e.jsx("circle",{cx:d(o.x),cy:f(o.y),r:3,fill:"none",stroke:"#ef4444",strokeWidth:1.5}),e.jsx("circle",{cx:y,cy:h,r:4,fill:"#3b82f6",stroke:"white",strokeWidth:1.5,children:e.jsxs("title",{children:["SiO₂: ",t.toFixed(2),", Al₂O₃: ",i.toFixed(2)]})})]})}function yr(){const t=Re(d=>d.glazes),[i,o]=n.useState(!1),c=n.useMemo(()=>{const d=Array.from(t.values()),f=new Map,y=new Map;for(const x of d){f.set(x.surfaceType,(f.get(x.surfaceType)??0)+1);const g=x.glazeTypeId??null;y.set(g,(y.get(g)??0)+1)}const h=[...y.entries()].filter(([x])=>x!==null).sort((x,g)=>g[1]-x[1]).slice(0,8),v=y.get(null)??0;return{total:d.length,bySurface:f,topTypes:h,unclassified:v}},[t]);return c.total===0?null:e.jsxs("div",{style:{fontSize:11,color:"var(--text-label)"},children:[e.jsxs("button",{onClick:()=>o(!i),style:{background:"none",border:"none",color:"var(--text-secondary)",cursor:"pointer",fontSize:11,padding:"4px 0",display:"flex",alignItems:"center",gap:4,width:"100%"},children:[e.jsx("span",{style:{fontSize:9},children:i?"▾":"▸"}),c.total.toLocaleString()," glazes loaded"]}),i&&e.jsxs("div",{style:{padding:"4px 0 8px 12px",display:"flex",flexDirection:"column",gap:8},children:[e.jsxs("div",{children:[e.jsx("div",{style:{color:"var(--text-muted)",marginBottom:2},children:"By surface"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"2px 8px"},children:["gloss","matte","satin","crystalline","crawl","unknown"].map(d=>{const f=c.bySurface.get(d)??0;return f===0?null:e.jsxs("span",{children:[d,": ",e.jsx("strong",{children:f})]},d)})})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"var(--text-muted)",marginBottom:2},children:"Top glaze types"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:2},children:[c.topTypes.map(([d,f])=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:ht(d),flexShrink:0}}),e.jsx("span",{style:{flex:1},children:jt(d)}),e.jsx("span",{style:{color:"var(--text-muted)"},children:f})]},d)),c.unclassified>0&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"#555",flexShrink:0}}),e.jsx("span",{style:{flex:1,color:"var(--text-muted)"},children:"Unclassified"}),e.jsx("span",{style:{color:"var(--text-muted)"},children:c.unclassified})]})]})]})]})]})}var Ht={},Zt={exports:{}},vr="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",kr=vr,wr=kr;function Vt(){}function qt(){}qt.resetWarningCache=Vt;var jr=function(){function t(c,d,f,y,h,v){if(v!==wr){var x=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw x.name="Invariant Violation",x}}t.isRequired=t;function i(){return t}var o={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:i,element:t,elementType:t,instanceOf:i,node:t,objectOf:i,oneOf:i,oneOfType:i,shape:i,exact:i,checkPropTypes:qt,resetWarningCache:Vt};return o.PropTypes=o,o};Zt.exports=jr();var Sr=Zt.exports;(function(t){function i(b){"@babel/helpers - typeof";return i=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(w){return typeof w}:function(w){return w&&typeof Symbol=="function"&&w.constructor===Symbol&&w!==Symbol.prototype?"symbol":typeof w},i(b)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=Z;var o=y(n),c=d(Sr);function d(b){return b&&b.__esModule?b:{default:b}}function f(b){if(typeof WeakMap!="function")return null;var w=new WeakMap,U=new WeakMap;return(f=function(L){return L?U:w})(b)}function y(b,w){if(b&&b.__esModule)return b;if(b===null||i(b)!=="object"&&typeof b!="function")return{default:b};var U=f(w);if(U&&U.has(b))return U.get(b);var P={},L=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var R in b)if(R!=="default"&&Object.prototype.hasOwnProperty.call(b,R)){var l=L?Object.getOwnPropertyDescriptor(b,R):null;l&&(l.get||l.set)?Object.defineProperty(P,R,l):P[R]=b[R]}return P.default=b,U&&U.set(b,P),P}function h(b,w){if(!(b instanceof w))throw new TypeError("Cannot call a class as a function")}function v(b,w){for(var U=0;U<w.length;U++){var P=w[U];P.enumerable=P.enumerable||!1,P.configurable=!0,"value"in P&&(P.writable=!0),Object.defineProperty(b,P.key,P)}}function x(b,w,U){return w&&v(b.prototype,w),Object.defineProperty(b,"prototype",{writable:!1}),b}function g(b,w){if(typeof w!="function"&&w!==null)throw new TypeError("Super expression must either be null or a function");b.prototype=Object.create(w&&w.prototype,{constructor:{value:b,writable:!0,configurable:!0}}),Object.defineProperty(b,"prototype",{writable:!1}),w&&m(b,w)}function m(b,w){return m=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(P,L){return P.__proto__=L,P},m(b,w)}function N(b){var w=H();return function(){var P=Q(b),L;if(w){var R=Q(this).constructor;L=Reflect.construct(P,arguments,R)}else L=P.apply(this,arguments);return I(this,L)}}function I(b,w){if(w&&(i(w)==="object"||typeof w=="function"))return w;if(w!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return S(b)}function S(b){if(b===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return b}function H(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Q(b){return Q=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(U){return U.__proto__||Object.getPrototypeOf(U)},Q(b)}var ce=["AfterExport","AfterPlot","Animated","AnimatingFrame","AnimationInterrupted","AutoSize","BeforeExport","BeforeHover","ButtonClicked","Click","ClickAnnotation","Deselect","DoubleClick","Framework","Hover","LegendClick","LegendDoubleClick","Relayout","Relayouting","Restyle","Redraw","Selected","Selecting","SliderChange","SliderEnd","SliderStart","SunburstClick","Transitioning","TransitionInterrupted","Unhover","WebGlContextLost"],B=["plotly_restyle","plotly_redraw","plotly_relayout","plotly_relayouting","plotly_doubleclick","plotly_animated","plotly_sunburstclick"],K=typeof window<"u";function Z(b){var w=function(U){g(L,U);var P=N(L);function L(R){var l;return h(this,L),l=P.call(this,R),l.p=Promise.resolve(),l.resizeHandler=null,l.handlers={},l.syncWindowResize=l.syncWindowResize.bind(S(l)),l.syncEventHandlers=l.syncEventHandlers.bind(S(l)),l.attachUpdateEvents=l.attachUpdateEvents.bind(S(l)),l.getRef=l.getRef.bind(S(l)),l.handleUpdate=l.handleUpdate.bind(S(l)),l.figureCallback=l.figureCallback.bind(S(l)),l.updatePlotly=l.updatePlotly.bind(S(l)),l}return x(L,[{key:"updatePlotly",value:function(l,O,Y){var D=this;this.p=this.p.then(function(){if(!D.unmounting){if(!D.el)throw new Error("Missing element reference");return b.react(D.el,{data:D.props.data,layout:D.props.layout,config:D.props.config,frames:D.props.frames})}}).then(function(){D.unmounting||(D.syncWindowResize(l),D.syncEventHandlers(),D.figureCallback(O),Y&&D.attachUpdateEvents())}).catch(function(ae){D.props.onError&&D.props.onError(ae)})}},{key:"componentDidMount",value:function(){this.unmounting=!1,this.updatePlotly(!0,this.props.onInitialized,!0)}},{key:"componentDidUpdate",value:function(l){this.unmounting=!1;var O=l.frames&&l.frames.length?l.frames.length:0,Y=this.props.frames&&this.props.frames.length?this.props.frames.length:0,D=!(l.layout===this.props.layout&&l.data===this.props.data&&l.config===this.props.config&&Y===O),ae=l.revision!==void 0,u=l.revision!==this.props.revision;!D&&(!ae||ae&&!u)||this.updatePlotly(!1,this.props.onUpdate,!1)}},{key:"componentWillUnmount",value:function(){this.unmounting=!0,this.figureCallback(this.props.onPurge),this.resizeHandler&&K&&(window.removeEventListener("resize",this.resizeHandler),this.resizeHandler=null),this.removeUpdateEvents(),b.purge(this.el)}},{key:"attachUpdateEvents",value:function(){var l=this;!this.el||!this.el.removeListener||B.forEach(function(O){l.el.on(O,l.handleUpdate)})}},{key:"removeUpdateEvents",value:function(){var l=this;!this.el||!this.el.removeListener||B.forEach(function(O){l.el.removeListener(O,l.handleUpdate)})}},{key:"handleUpdate",value:function(){this.figureCallback(this.props.onUpdate)}},{key:"figureCallback",value:function(l){if(typeof l=="function"){var O=this.el,Y=O.data,D=O.layout,ae=this.el._transitionData?this.el._transitionData._frames:null,u={data:Y,layout:D,frames:ae};l(u,this.el)}}},{key:"syncWindowResize",value:function(l){var O=this;K&&(this.props.useResizeHandler&&!this.resizeHandler?(this.resizeHandler=function(){return b.Plots.resize(O.el)},window.addEventListener("resize",this.resizeHandler),l&&this.resizeHandler()):!this.props.useResizeHandler&&this.resizeHandler&&(window.removeEventListener("resize",this.resizeHandler),this.resizeHandler=null))}},{key:"getRef",value:function(l){this.el=l,this.props.debug&&K&&(window.gd=this.el)}},{key:"syncEventHandlers",value:function(){var l=this;ce.forEach(function(O){var Y=l.props["on"+O],D=l.handlers[O],ae=!!D;Y&&!ae?l.addEventHandler(O,Y):!Y&&ae?l.removeEventHandler(O):Y&&ae&&Y!==D&&(l.removeEventHandler(O),l.addEventHandler(O,Y))})}},{key:"addEventHandler",value:function(l,O){this.handlers[l]=O,this.el.on(this.getPlotlyEventName(l),this.handlers[l])}},{key:"removeEventHandler",value:function(l){this.el.removeListener(this.getPlotlyEventName(l),this.handlers[l]),delete this.handlers[l]}},{key:"getPlotlyEventName",value:function(l){return"plotly_"+l.toLowerCase()}},{key:"render",value:function(){return o.default.createElement("div",{id:this.props.divId,style:this.props.style,ref:this.getRef,className:this.props.className})}}]),L}(o.Component);return w.propTypes={data:c.default.arrayOf(c.default.object),config:c.default.object,layout:c.default.object,frames:c.default.arrayOf(c.default.object),revision:c.default.number,onInitialized:c.default.func,onPurge:c.default.func,onError:c.default.func,onUpdate:c.default.func,debug:c.default.bool,style:c.default.object,className:c.default.string,useResizeHandler:c.default.bool,divId:c.default.string},ce.forEach(function(U){w.propTypes["on"+U]=c.default.func}),w.defaultProps={debug:!1,useResizeHandler:!1,data:[],style:{position:"relative",display:"inline-block"}},w}})(Ht);const Kt=Gt(Ht),zr={surface:"Viridis",source:"Set1",flux_ratio:"Portland",confidence:"Greys",boron:"YlOrRd"},Cr=[[0,"#6366f1"],[.5/14,"#6366f1"],[.5/14,"#3b82f6"],[1.5/14,"#3b82f6"],[1.5/14,"#06b6d4"],[2.5/14,"#06b6d4"],[2.5/14,"#14b8a6"],[3.5/14,"#14b8a6"],[3.5/14,"#10b981"],[4.5/14,"#10b981"],[4.5/14,"#22c55e"],[5.5/14,"#22c55e"],[5.5/14,"#84cc16"],[6.5/14,"#84cc16"],[6.5/14,"#a3e635"],[7.5/14,"#a3e635"],[7.5/14,"#facc15"],[8.5/14,"#facc15"],[8.5/14,"#f59e0b"],[9.5/14,"#f59e0b"],[9.5/14,"#f97316"],[10.5/14,"#f97316"],[10.5/14,"#ef4444"],[11.5/14,"#ef4444"],[11.5/14,"#dc2626"],[12.5/14,"#dc2626"],[12.5/14,"#e11d48"],[13.5/14,"#e11d48"],[13.5/14,"#a855f7"],[1,"#a855f7"]],Or={unfused:{path:"M 0.5,0.39 L 2.8,1.0 L 0.5,1.0 Z",color:"rgba(120, 120, 120, 0.12)",label:"Unfused"},matte:{path:"M 0.5,0.05 L 0.5,0.39 L 2.8,1.0 L 4.0,1.0 Z",color:"rgba(76, 175, 80, 0.12)",label:"Matte"},semi_matte:{path:"M 1.2,0.242 L 4.0,1.0 L 5.0,1.0 Z",color:"rgba(139, 195, 74, 0.10)",label:"Semi-Matte"},bright_gloss:{path:"M 0.5,0.0 L 0.5,1.0 L 1.67,1.0 L 2.1,0.5 L 2.38,0.25 L 2.7,0.23 L 3.3,0.25 L 3.9,0.28 L 4.2,0.29 L 5.4,0.49 L 7.2,0.615 L 7.2,0 Z",color:"rgba(33, 150, 243, 0.08)",label:"Bright Gloss"},underfired:{path:"M 1.75,0.0 L 7.2,0.65 L 7.2,0.0 Z",color:"rgba(158, 158, 158, 0.12)",label:"Underfired"},crazed:{path:"M 0.5,0.0 L 0.5,0.05 L 1.2,0.242 L 1.75,0.0 Z",color:"rgba(244, 67, 54, 0.12)",label:"Crazed"}},Rt={path:"M 1.8,0.2 L 4.2,0.6 L 6.0,0.8 L 7.2,0.92",color:"rgba(255, 255, 255, 0.35)"};function Nr({xAxis:t="SiO2",yAxis:i="Al2O3",colorBy:o="cone",zoom:c=1,width:d,height:f,highlightPointIds:y,highlightCircle:h,densityMap:v,showLimits:x=!1,limitCone:g=null}){const[m,N]=n.useState(null),[I,S]=n.useState(!1),[H,Q]=n.useState(!1),[ce,B]=n.useState(0);n.useEffect(()=>{let p=!0;S(!1),Q(!1);const k=setTimeout(()=>{p&&Q(!0)},12e3);return qe(()=>import("./plotly-gl2d-B8_X3w7e.js").then(ee=>ee.p),__vite__mapDeps([0,1])).then(ee=>{if(!p)return;clearTimeout(k);const ue=Kt(ee.default??ee);N(()=>ue)}).catch(()=>{p&&(clearTimeout(k),S(!0))}),()=>{p=!1,clearTimeout(k)}},[ce]);const K=Re(p=>p.getPlotPoints),Z=St(p=>p.currentSetId),b=ge(p=>p.selectedGlaze),w=ge(p=>p.setSelectedGlaze),U=ge(p=>p.setHoveredPoint),P=ge(p=>p.selectedForBlend),L=$t(p=>p.blendResults),R=It(p=>p.theme),l=n.useMemo(()=>{const p=R==="dark";return{paper:p?"#1a1a1a":"#ffffff",plot:p?"#1e1e1e":"#f8f8f8",grid:p?"#333":"#ddd",zeroline:p?"#444":"#ccc",axisTitle:p?"#aaa":"#555",tick:p?"#888":"#666",font:p?"#ccc":"#333",regionLabel:p?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.18)",regionLabelStrong:p?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.22)",qLabel:p?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.3)",tempLabel:p?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.4)",coneBorder:p?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.07)",limitFill:p?"rgba(59,130,246,0.12)":"rgba(59,130,246,0.08)",limitBorder:p?"rgba(59,130,246,0.5)":"rgba(59,130,246,0.4)",limitLabel:p?"rgba(59,130,246,0.7)":"rgba(59,130,246,0.6)",limitDimBorder:p?"rgba(150,150,150,0.15)":"rgba(100,100,100,0.12)"}},[R]),O=n.useMemo(()=>{if(!x)return{shapes:[],annotations:[]};const p=oe=>({SiO2:"SiO2",Al2O3:"Al2O3",B2O3:"B2O3",Na2O:"KNaO",K2O:"KNaO",CaO:"CaO",MgO:"MgO",ZnO:"ZnO",BaO:"BaO"})[oe]??null,k=p(t),ee=p(i);if(!k||!ee)return{shapes:[],annotations:[]};const ue=[],W=[],q=g||null;for(const oe of ar){const we=oe[k],Ce=oe[ee];if(!we||!Ce)continue;const pe=q===oe.cone;ue.push({type:"rect",x0:we.min,x1:we.max,y0:Ce.min,y1:Ce.max,fillcolor:pe?l.limitFill:"transparent",line:{color:pe?l.limitBorder:l.limitDimBorder,width:pe?2:1,dash:pe?"solid":"dot"},layer:"below"}),W.push({x:we.max,y:Ce.max,text:`▲${oe.cone}`,showarrow:!1,font:{color:pe?l.limitBorder:l.limitDimBorder,size:pe?11:9},xanchor:"right",yanchor:"bottom"})}return{shapes:ue,annotations:W}},[x,g,t,i,l]),Y=n.useMemo(()=>K(Z),[K,Z]),D=Wt(Y),ae=n.useMemo(()=>{if(L.length===0)return null;const p=L.map(ue=>We(ue.umf,t)),k=L.map(ue=>We(ue.umf,i)),ee=L.map((ue,W)=>{var q;return((q=ue.recipe)==null?void 0:q.name)||`Blend ${W+1}`});return{type:"scattergl",mode:"markers",x:p,y:k,text:ee,name:"Blend Results",marker:{size:8,symbol:"diamond",color:"#ff9800",opacity:.9,line:{width:1,color:"#fff"}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>${t}: %{x:.2f}<br>${i}: %{y:.2f}<extra>Blend</extra>`}},[L,t,i]),u=n.useMemo(()=>{if(!h)return null;const{x:p,y:k,r:ee}=h;return{type:"circle",xref:"x",yref:"y",x0:p-ee,y0:k-ee,x1:p+ee,y1:k+ee,fillcolor:"rgba(244, 67, 54, 0.08)",line:{color:"rgba(244, 67, 54, 0.5)",width:2,dash:"dash"},layer:"above"}},[h]),T=n.useMemo(()=>D.filter(p=>p.x!=null&&p.y!=null&&!isNaN(p.x)&&!isNaN(p.y)&&p.x>0&&p.y>0&&p.cone!=null&&p.cone>=-4&&p.cone<=10),[D]),C=n.useMemo(()=>{if(!y||y.length===0)return null;const p=T.filter(k=>y.includes(k.id));return p.length===0?null:{type:"scattergl",mode:"markers",x:p.map(k=>k.x),y:p.map(k=>k.y),text:p.map(k=>k.name),name:"Highlighted",marker:{size:10,symbol:"circle",color:"rgba(255, 235, 59, 0.8)",line:{width:2,color:"#fff"}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>${t}: %{x:.2f}<br>${i}: %{y:.2f}<extra>Cluster</extra>`}},[y,T,t,i]),$=n.useMemo(()=>{if(!v||v.grid.length===0)return null;const{grid:p,bounds:k,resolution:ee}=v,ue=Array.from({length:ee},(q,oe)=>k.xMin+oe/(ee-1)*(k.xMax-k.xMin)),W=Array.from({length:p.length},(q,oe)=>k.yMin+oe/(p.length-1)*(k.yMax-k.yMin));return{type:"contour",x:ue,y:W,z:p,name:"Density",showscale:!1,contours:{coloring:"heatmap"},colorscale:[[0,"rgba(0,0,0,0)"],[.2,"rgba(33,150,243,0.08)"],[.4,"rgba(33,150,243,0.15)"],[.6,"rgba(255,235,59,0.2)"],[.8,"rgba(255,152,0,0.25)"],[1,"rgba(244,67,54,0.3)"]],hoverinfo:"skip"}},[v]),G=n.useMemo(()=>o==="glaze_type"?T.map(p=>ht(p.glazeTypeId)):T.map(p=>{switch(o){case"cone":return p.cone??6;case"surface":return Mr(p.surfaceType);case"source":return Tr(p.source);case"flux_ratio":return p.fluxRatio;case"confidence":return _r(p.confidence);case"boron":return p.boron;default:return 0}}),[T,o]),ne=n.useMemo(()=>({type:"scattergl",mode:"markers",x:T.map(p=>p.x),y:T.map(p=>p.y),customdata:T.map(p=>p.id),text:T.map(p=>p.name),marker:{size:5,opacity:.7,color:G,...o==="glaze_type"?{}:{colorscale:o==="cone"?Cr:zr[o]||"Viridis",reversescale:!1,cmin:o==="cone"?-6:void 0,cmax:o==="cone"?12:void 0,colorbar:{title:Rr(o),thickness:15,len:.7,tickvals:o==="cone"?[-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12]:void 0,ticktext:o==="cone"?["04","03","02","01","0","1","2","3","4","5","6","7","8","9","10"]:void 0}},line:{width:T.map(p=>(b==null?void 0:b.id)===p.id?2:P.some(k=>k.id===p.id)?1.5:0),color:T.map(p=>(b==null?void 0:b.id)===p.id?"white":P.some(k=>k.id===p.id)?"orange":"transparent")}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>${t}: %{x:.2f}<br>${i}: %{y:.2f}<br>`+(o==="glaze_type"?"%{meta}<br>":"")+"<extra></extra>",meta:o==="glaze_type"?T.map(p=>jt(p.glazeTypeId)):void 0}),[T,G,o,t,i,b,P]),de=3.85,be=.5,ye=3.35/c,me=.5/c,Le=n.useMemo(()=>({xaxis:{title:{text:t,font:{color:l.axisTitle}},range:[de-ye,de+ye],gridcolor:l.grid,zerolinecolor:l.zeroline,tickfont:{color:l.tick}},yaxis:{title:{text:i,font:{color:l.axisTitle}},range:[be-me,be+me],gridcolor:l.grid,zerolinecolor:l.zeroline,tickfont:{color:l.tick}},paper_bgcolor:l.paper,plot_bgcolor:l.plot,font:{color:l.font},dragmode:"pan",hovermode:"closest",margin:{l:60,r:30,t:30,b:60},annotations:[{x:1.5,y:.75,text:"UNFUSED",showarrow:!1,font:{color:l.regionLabel,size:11},textangle:-35},{x:2.3,y:.55,text:"MATTE",showarrow:!1,font:{color:l.regionLabelStrong,size:12},textangle:-35},{x:3.4,y:.65,text:"SEMI-MATTE",showarrow:!1,font:{color:l.regionLabel,size:10},textangle:-30},{x:4.5,y:.25,text:"BRIGHT GLOSS",showarrow:!1,font:{color:l.regionLabel,size:11}},{x:5,y:.1,text:"UNDERFIRED",showarrow:!1,font:{color:l.regionLabelStrong,size:10},textangle:-15},{x:1.2,y:.08,text:"CRAZED",showarrow:!1,font:{color:l.regionLabelStrong,size:10}},{x:6.8,y:.88,text:"Q",showarrow:!1,font:{color:l.qLabel,size:11,family:"serif"}},...O.annotations],shapes:[...Object.values(Or).map(p=>({type:"path",path:p.path,fillcolor:p.color,line:{width:0},layer:"below"})),{type:"path",path:Rt.path,fillcolor:"transparent",line:{color:Rt.color,width:1.5,dash:"dot"},layer:"below"},...O.shapes,...u?[u]:[]]}),[t,i,ye,me,u,l,O]),Ne=n.useCallback(p=>{var ee;const k=(ee=p.points)==null?void 0:ee[0];if(k!=null&&k.customdata){const W=Re.getState().glazes.get(k.customdata);W&&w(W)}},[w]),Me=n.useCallback(p=>{var ee;const k=(ee=p.points)==null?void 0:ee[0];k&&U({id:k.customdata,name:k.text,source:"unknown",x:k.x,y:k.y,cone:null,surfaceType:"unknown",fluxRatio:0,boron:0,confidence:"inferred",glazeTypeId:null})},[U]),Fe={displayModeBar:!0,modeBarButtonsToRemove:["select2d","lasso2d","autoScale2d"],scrollZoom:!0,doubleClick:"reset"};return m?e.jsx(m,{data:[...$?[$]:[],ne,...ae?[ae]:[],...C?[C]:[]],layout:Le,config:Fe,onClick:Ne,onHover:Me,useResizeHandler:!0,style:{width:d||"100%",height:f||"100%"}}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,width:d||"100%",height:f||"100%",color:"#777",fontSize:13,background:"var(--bg-secondary, #1a1a1a)",borderRadius:8,...I?{}:{animation:"pulse 1.5s ease-in-out infinite"}},children:[e.jsx("style",{children:"@keyframes pulse { 0%,100% { opacity: 0.6 } 50% { opacity: 1 } }"}),I?e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{fontSize:22},children:"⚠"}),e.jsx("span",{children:"Chart engine failed to load"}),e.jsx("button",{onClick:()=>B(p=>p+1),style:{marginTop:4,padding:"6px 16px",borderRadius:6,border:"1px solid #555",background:"var(--bg-tertiary, #252525)",color:"#ccc",cursor:"pointer",fontSize:13},children:"Tap to retry"})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Loading chart engine…"}),H&&e.jsx("span",{style:{fontSize:11,color:"#666"},children:"Slow connection — still trying…"})]})]})}function Mr(t){return{matte:1,satin:2,gloss:3,crystalline:4,crawl:5,unknown:0}[t]??0}function Tr(t){return{glazy:1,digitalfire:2,user:3,calculated:4}[t]??0}function _r(t){return{unknown:0,assumed:1,inferred:2,declared:3,verified:4}[t]??0}function Rr(t){return{cone:"Cone",surface:"Surface",source:"Source",flux_ratio:"R2O:RO",confidence:"Confidence",boron:"B2O3"}[t]||t}const Er="https://iupac.org/what-we-do/periodic-table-of-elements/",Pr="https://www.ciaaw.org/atomic-weights.htm",Lr=[{label:"Fluxes (R₂O)",oxides:["Li2O","Na2O","K2O"]},{label:"Fluxes (RO)",oxides:["MgO","CaO","SrO","BaO","ZnO","PbO"]},{label:"Stabilizers (R₂O₃)",oxides:["Al2O3","B2O3","Fe2O3"]},{label:"Glass Formers (RO₂)",oxides:["SiO2","TiO2","ZrO2","SnO2"]},{label:"Colorants / Other",oxides:["MnO","MnO2","NiO","CuO","Cu2O","CoO","Cr2O3","P2O5","F"]}],Fr=["₀","₁","₂","₃","₄","₅","₆","₇","₈","₉"];function Ar(t){return t.replace(/\d/g,i=>Fr[parseInt(i)])}function Dr(){const{currentSetId:t,availableSets:i,setMolarWeightSet:o}=St(),[c,d]=n.useState(!1),f=n.useMemo(()=>i.find(h=>h.id===t),[i,t]),y=n.useMemo(()=>Jt(t),[t]);return e.jsxs("div",{className:"molar-set-picker",children:[e.jsxs("div",{className:"molar-header",children:[e.jsx("h3",{children:"Molar Weights"}),e.jsx("button",{className:"molar-info-toggle",onClick:()=>d(!c),title:c?"Hide weight table":"Show all molecular weights",children:c?"▾":"ⓘ"})]}),e.jsx("div",{className:"molar-set-buttons",children:i.map(h=>e.jsxs("button",{className:`molar-set-button ${t===h.id?"active":""}`,onClick:()=>o(h.id),title:h.notes,children:[e.jsx("span",{className:"molar-set-name",children:h.name}),h.year&&e.jsx("span",{className:"molar-set-year",children:h.year})]},h.id))}),e.jsxs("div",{className:"molar-source-info",children:[e.jsxs("p",{className:"molar-source-text",children:["Default: ",e.jsx("strong",{children:"IUPAC 2023"})," Standard Atomic Weights with 2024 revisions (Gd, Lu, Zr)."]}),e.jsxs("div",{className:"molar-source-links",children:[e.jsx("a",{href:Er,target:"_blank",rel:"noopener noreferrer",children:"IUPAC Periodic Table"}),e.jsx("span",{className:"molar-link-sep",children:"·"}),e.jsx("a",{href:Pr,target:"_blank",rel:"noopener noreferrer",children:"CIAAW Atomic Weights"})]})]}),c&&e.jsxs("div",{className:"molar-weight-table",children:[e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Oxide"}),e.jsx("th",{children:"g/mol"})]})}),e.jsx("tbody",{children:Lr.map(h=>e.jsxs(wt.Fragment,{children:[e.jsx("tr",{className:"molar-group-header",children:e.jsx("td",{colSpan:2,children:h.label})}),h.oxides.map(v=>{var x;return e.jsxs("tr",{children:[e.jsx("td",{className:"molar-oxide-name",children:Ar(v)}),e.jsx("td",{className:"molar-oxide-value",children:((x=y[v])==null?void 0:x.toFixed(4))??"—"})]},v)})]},h.label))})]}),e.jsxs("p",{className:"molar-table-note",children:["Active set: ",(f==null?void 0:f.name)??t,(f==null?void 0:f.notes)&&e.jsxs(e.Fragment,{children:[e.jsx("br",{}),f.notes]})]})]}),e.jsx("style",{children:`
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
      `})]})}function $r(){const{currentSetId:t,availableSets:i,setAnalysisSet:o}=er(),[c,d]=n.useState(!1),f=i.find(h=>h.id===t),y=i.filter(h=>h.status==="populated"||h.id==="app_default");return y.length<=1?null:e.jsxs("div",{className:"analysis-set-picker",children:[e.jsxs("div",{className:"analysis-header",children:[e.jsx("h3",{children:"Material Analyses"}),e.jsx("button",{className:"analysis-info-toggle",onClick:()=>d(!c),title:c?"Hide details":"Show source details",children:c?"▾":"ⓘ"})]}),e.jsx("div",{className:"analysis-set-buttons",children:y.map(h=>e.jsxs("button",{className:`analysis-set-button ${t===h.id?"active":""}`,onClick:()=>o(h.id),title:h.notes,children:[e.jsx("span",{className:"analysis-set-name",children:h.name}),e.jsxs("span",{className:"analysis-set-meta",children:[h.year&&e.jsx("span",{className:"analysis-set-year",children:h.year}),h.materialCount>0&&e.jsxs("span",{className:"analysis-set-count",children:[h.materialCount," mat",h.materialCount!==1?"s":""]})]})]},h.id))}),e.jsxs("div",{className:"analysis-source-info",children:[e.jsx("p",{className:"analysis-source-text",children:(f==null?void 0:f.id)==="app_default"?e.jsxs(e.Fragment,{children:["Default: ",e.jsx("strong",{children:"Stull Atlas built-in"})," analyses from"," ",e.jsx("a",{href:"https://digitalfire.com",target:"_blank",rel:"noopener noreferrer",children:"Digitalfire"}),", verified Feb 2026."]}):e.jsxs(e.Fragment,{children:["Active: ",e.jsx("strong",{children:f==null?void 0:f.name}),(f==null?void 0:f.authority)&&e.jsxs(e.Fragment,{children:[" — ",f.authority]})]})}),f&&f.materialCount>0&&f.id!=="app_default"&&e.jsxs("p",{className:"analysis-override-note",children:[f.materialCount," material",f.materialCount!==1?"s":""," overridden — all others use default values."]})]}),c&&e.jsx("div",{className:"analysis-details",children:y.map(h=>e.jsxs("div",{className:"analysis-detail-row",children:[e.jsxs("div",{className:"analysis-detail-header",children:[e.jsx("strong",{children:h.name}),e.jsx("span",{className:"analysis-detail-year",children:h.year})]}),e.jsxs("div",{className:"analysis-detail-meta",children:[h.source,h.authority&&e.jsxs(e.Fragment,{children:[" — ",h.authority]})]}),h.notes&&e.jsx("div",{className:"analysis-detail-notes",children:h.notes})]},h.id))}),e.jsx("p",{className:"analysis-thanks",children:"Thanks, Tony"}),e.jsx("style",{children:`
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
      `})]})}function Ir(t,i){return Math.exp(-t/(2*i))}function Br(t,i,o){const c=t.length;if(c<4)return .3;const d=i[1]-i[0]||1,f=o[1]-o[0]||1,y=t.map(S=>(S.x-i[0])/d),h=t.map(S=>(S.y-o[0])/f),v=y.reduce((S,H)=>S+H,0)/c,x=h.reduce((S,H)=>S+H,0)/c,g=Math.sqrt(y.reduce((S,H)=>S+(H-v)**2,0)/c)||.1,m=Math.sqrt(h.reduce((S,H)=>S+(H-x)**2,0)/c)||.1,I=1.4*((g+m)/2)*Math.pow(c,-.2);return Math.max(I,.03)}function Ur(t,i){const{xRange:o,yRange:c,resolution:d=35,minWeight:f=.5}=i,y=i.bandwidth??Br(t,o,c),h=o[1]-o[0],v=c[1]-c[0],x=Array.from({length:d},(Z,b)=>o[0]+b/(d-1)*h),g=Array.from({length:d},(Z,b)=>c[0]+b/(d-1)*v),m=1/(h||1),N=1/(v||1),I=y*y,S=t.filter(Z=>isFinite(Z.z)&&!isNaN(Z.z)).map(Z=>({nx:(Z.x-o[0])*m,ny:(Z.y-c[0])*N,z:Z.z}));if(S.length===0)return{xCoords:x,yCoords:g,z:g.map(()=>x.map(()=>null)),stats:{validCells:0,totalCells:d*d,zMin:0,zMax:0,zMean:0}};const H=[];let Q=0,ce=1/0,B=-1/0,K=0;for(let Z=0;Z<d;Z++){const b=[],w=(g[Z]-c[0])*N;for(let U=0;U<d;U++){const P=(x[U]-o[0])*m;let L=0,R=0;for(const l of S){const O=P-l.nx,Y=w-l.ny,D=O*O+Y*Y,ae=Ir(D,I);L+=ae*l.z,R+=ae}if(R>=f){const l=L/R;b.push(l),Q++,l<ce&&(ce=l),l>B&&(B=l),K+=l}else b.push(null)}H.push(b)}return{xCoords:x,yCoords:g,z:H,stats:{validCells:Q,totalCells:d*d,zMin:Q>0?ce:0,zMax:Q>0?B:0,zMean:Q>0?K/Q:0}}}function Wr(t,i){return Math.exp(-t/(2*i))}function Hr(t,i,o){const c=t.length;if(c<4)return .3;const d=i[1]-i[0]||1,f=o[1]-o[0]||1,y=t.map(S=>(S.x-i[0])/d),h=t.map(S=>(S.y-o[0])/f),v=y.reduce((S,H)=>S+H,0)/c,x=h.reduce((S,H)=>S+H,0)/c,g=Math.sqrt(y.reduce((S,H)=>S+(H-v)**2,0)/c)||.1,m=Math.sqrt(h.reduce((S,H)=>S+(H-x)**2,0)/c)||.1,I=1.6*((g+m)/2)*Math.pow(c,-.2);return Math.max(I,.03)}const Zr=["gloss","matte","satin","crystalline","crawl"];function Vr(t,i){const{xRange:o,yRange:c,resolution:d=30,minWeight:f=.3,minConfidence:y=.3}=i,h=i.bandwidth??Hr(t,o,c),v=o[1]-o[0],x=c[1]-c[0],g=Array.from({length:d},(K,Z)=>o[0]+Z/(d-1)*v),m=Array.from({length:d},(K,Z)=>c[0]+Z/(d-1)*x),N=1/(v||1),I=1/(x||1),S=h*h,H=t.filter(K=>K.surfaceType&&K.surfaceType!=="unknown").map(K=>({nx:(K.x-o[0])*N,ny:(K.y-c[0])*I,type:K.surfaceType}));if(H.length===0)return{xCoords:g,yCoords:m,cells:m.map(()=>g.map(()=>null)),stats:{validCells:0,totalCells:d*d,typeCounts:{}}};const Q=[];let ce=0;const B={};for(let K=0;K<d;K++){const Z=[],b=(m[K]-c[0])*I;for(let w=0;w<d;w++){const U=(g[w]-o[0])*N,P={};let L=0;for(const R of H){const l=U-R.nx,O=b-R.ny,Y=l*l+O*O,D=Wr(Y,S);P[R.type]=(P[R.type]??0)+D,L+=D}if(L>=f){let R="unknown",l=0;for(const Y of Zr){const D=P[Y]??0;D>l&&(l=D,R=Y)}const O=L>0?l/L:0;O>=y?(Z.push({type:R,confidence:O,votes:P}),ce++,B[R]=(B[R]??0)+1):Z.push(null)}else Z.push(null)}Q.push(Z)}return{xCoords:g,yCoords:m,cells:Q,stats:{validCells:ce,totalCells:d*d,typeCounts:B}}}const qr={gloss:"#3b82f6",matte:"#22c55e",satin:"#f59e0b",crystalline:"#a855f7",crawl:"#ef4444",unknown:"#6b7280"},Et=(t,i)=>{const o=qr[t]??"#6b7280",c=parseInt(o.slice(1,3),16),d=parseInt(o.slice(3,5),16),f=parseInt(o.slice(5,7),16);return`rgba(${c}, ${d}, ${f}, ${i})`},Ve={x:.5,y:.5,z:.5,cone:0,surface:0},Yt=[[0,"#6366f1"],[.5/14,"#6366f1"],[.5/14,"#3b82f6"],[1.5/14,"#3b82f6"],[1.5/14,"#06b6d4"],[2.5/14,"#06b6d4"],[2.5/14,"#14b8a6"],[3.5/14,"#14b8a6"],[3.5/14,"#10b981"],[4.5/14,"#10b981"],[4.5/14,"#22c55e"],[5.5/14,"#22c55e"],[5.5/14,"#84cc16"],[6.5/14,"#84cc16"],[6.5/14,"#a3e635"],[7.5/14,"#a3e635"],[7.5/14,"#facc15"],[8.5/14,"#facc15"],[8.5/14,"#f59e0b"],[9.5/14,"#f59e0b"],[9.5/14,"#f97316"],[10.5/14,"#f97316"],[10.5/14,"#ef4444"],[11.5/14,"#ef4444"],[11.5/14,"#dc2626"],[12.5/14,"#dc2626"],[12.5/14,"#e11d48"],[13.5/14,"#e11d48"],[13.5/14,"#a855f7"],[1,"#a855f7"]],Kr={cone:Yt,surface:"Viridis",source:"Set1",flux_ratio:"Portland",confidence:"Greys",boron:"YlOrRd",z_axis:"Viridis"},Yr={default:t=>({eye:{x:1.5/t,y:-1.8/t,z:1.2/t},up:{x:0,y:0,z:1}}),top:t=>({eye:{x:.001,y:-.001,z:3/t},up:{x:0,y:1,z:0}}),"side-x":t=>({eye:{x:0,y:-3/t,z:.5/t},up:{x:0,y:0,z:1}}),"side-y":t=>({eye:{x:3/t,y:0,z:.5/t},up:{x:0,y:0,z:1}})};function Gr(t){return[{name:"Unfused",vertices:[[.5,.39],[2.8,1],[.5,1]],triangles:[[0,1,2]],color:"rgba(120, 120, 120, 0.15)"},{name:"Matte",vertices:[[.5,.05],[.5,.39],[2.8,1],[4,1]],triangles:[[0,1,2],[0,2,3]],color:"rgba(76, 175, 80, 0.15)"},{name:"Semi-Matte",vertices:[[1.2,.242],[4,1],[5,1]],triangles:[[0,1,2]],color:"rgba(139, 195, 74, 0.12)"},{name:"Crazed",vertices:[[.5,0],[.5,.05],[1.2,.242],[1.75,0]],triangles:[[0,1,2],[0,2,3]],color:"rgba(244, 67, 54, 0.15)"},{name:"Underfired",vertices:[[1.75,0],[7.2,.65],[7.2,0]],triangles:[[0,1,2]],color:"rgba(158, 158, 158, 0.15)"},{name:"Bright Gloss",vertices:[[.5,0],[.5,.05],[1.2,.242],[1.75,0],[2.7,.23],[3.3,.25],[3.9,.28],[4.2,.29],[5.4,.49],[7.2,.615],[7.2,0]],triangles:[[0,3,10],[3,4,10],[4,5,10],[5,6,10],[6,7,10],[7,8,10],[8,9,10]],color:"rgba(33, 150, 243, 0.10)"}].map(o=>{const c=[],d=[],f=[],y=[],h=[],v=[];for(const x of o.vertices)c.push(x[0]),d.push(x[1]),f.push(t);for(const x of o.triangles)y.push(x[0]),h.push(x[1]),v.push(x[2]);return{type:"mesh3d",x:c,y:d,z:f,i:y,j:h,k:v,color:o.color,opacity:.3,flatshading:!0,hoverinfo:"text",hovertext:o.name,name:o.name,showlegend:!1,lighting:{ambient:1,diffuse:0,specular:0}}})}function Xr(t){return{type:"scatter3d",mode:"lines",x:[1.8,4.2,6,7.2],y:[.2,.6,.8,.92],z:[t,t,t,t],line:{color:"rgba(255, 255, 255, 0.4)",width:3,dash:"dot"},hoverinfo:"text",hovertext:"Q-line",name:"Q-line",showlegend:!1}}function Qr(t,i,o,c,d){return{type:"surface",x:t.xCoords,y:t.yCoords,z:t.z,opacity:o,colorscale:"Viridis",showscale:!1,hoverinfo:"z",hovertemplate:`${ze(i)}: %{z:.3f}<extra>Surface</extra>`,name:"Fitted Surface",showlegend:!1,contours:{z:{show:!0,usecolormap:!0,highlightcolor:c?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.2)",project:{z:!0}}},lighting:d?{ambient:.5,diffuse:.8,specular:.4,roughness:.4,fresnel:.2}:{ambient:.8,diffuse:.3,specular:.15,roughness:.6},lightposition:d?{x:d.x*1e5,y:d.y*1e5,z:d.z*1e5}:{x:0,y:0,z:1e4}}}function Jr(t,i,o,c){const f=[],y=[],h=[];for(let v=0;v<=32;v++){const x=v/32*Math.PI*2;f.push(t.x+i*Math.cos(x)),y.push(t.y+i*Math.sin(x)),h.push(o)}f.push(null),y.push(null),h.push(null);for(let v=0;v<=32;v++){const x=v/32*Math.PI*2;f.push(t.x+i*Math.cos(x)),y.push(t.y+i*Math.sin(x)),h.push(c)}f.push(null),y.push(null),h.push(null);for(let v=0;v<4;v++){const x=v/4*Math.PI*2,g=t.x+i*Math.cos(x),m=t.y+i*Math.sin(x);f.push(g,g,null),y.push(m,m,null),h.push(o,c,null)}return{type:"scatter3d",mode:"lines",x:f,y,z:h,line:{color:"rgba(244, 67, 54, 0.5)",width:2,dash:"dash"},hoverinfo:"text",hovertext:"Void region",name:"Void",showlegend:!1}}function Pt({zAxis:t="B2O3",colorBy:i="cone",zoom:o=1,width:c,height:d,highlightPointIds:f,highlightCircle:y,showSurface:h=!0,surfaceOpacity:v=.35,showPrediction:x=!1,cameraPreset:g="default",perspective:m=.5,lightPosition:N,onSurfaceGridReady:I,autoRotate:S=!1,autoRotateSpeed:H=.5,pointSize:Q=2.5,zStretch:ce=.8,proximityRadius:B=null,proximityCenterId:K=null,proximityWeights:Z=Ve,hoveredNeighborId:b=null,onProximityStats:w,onResetCamera:U,kioskMode:P=!1}){const[L,R]=n.useState(null),[l,O]=n.useState(!1),[Y,D]=n.useState(!1),[ae,u]=n.useState(0),T=n.useRef(null),C=n.useRef(null),$=n.useRef(null),G=n.useRef(0),ne=n.useRef(null);n.useEffect(()=>{let a=!0;O(!1),D(!1);const s=setTimeout(()=>{a&&D(!0)},12e3);return qe(()=>import("./plotly-gl3d-DYPPaO4p.js").then(z=>z.p),__vite__mapDeps([2,1])).then(z=>{if(!a)return;clearTimeout(s);const j=z.default??z;C.current=j;const E=Kt(j);R(()=>E)}).catch(()=>{a&&(clearTimeout(s),O(!0))}),()=>{a=!1,clearTimeout(s)}},[ae]);const de=Re(a=>a.getPlotPoints),be=St(a=>a.currentSetId),ye=Re(a=>a.glazes),me=ge(a=>a.selectedGlaze),Le=ge(a=>a.setSelectedGlaze),Ne=ge(a=>a.setHoveredPoint),Me=$t(a=>a.blendResults),p=It(a=>a.theme)==="dark",k=n.useMemo(()=>({paper:p?"#1a1a1a":"#ffffff",bg:p?"#1a1a1a":"#f5f5f5",axisbg:p?"#1e1e1e":"#f8f8f8",grid:p?"#333":"#ddd",zeroline:p?"#444":"#ccc",axisTitle:p?"#aaa":"#555",tick:p?"#888":"#666",font:p?"#ccc":"#333",regionLabel:p?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.22)"}),[p]),ee=n.useMemo(()=>de(be),[de,be]),ue=Wt(ee),W=n.useMemo(()=>ue.filter(a=>a.x!=null&&a.y!=null&&!isNaN(a.x)&&!isNaN(a.y)&&a.x>0&&a.y>0&&a.cone!=null&&a.cone>=-4&&a.cone<=10).map(a=>{var E,X;const s=ye.get(a.id),z=s==null?void 0:s.umf;let j=0;switch(t){case"cone":j=a.cone??6;break;case"flux_ratio":j=a.fluxRatio;break;case"SiO2_Al2O3_ratio":j=a.x>0&&a.y>0?a.x/a.y:0;break;case"B2O3":j=((E=z==null?void 0:z.B2O3)==null?void 0:E.value)??a.boron??0;break;default:j=((X=z==null?void 0:z[t])==null?void 0:X.value)??0;break}return{...a,z:j}}).filter(a=>isFinite(a.z)),[ue,ye,t]),{visibleData:q,proximityCenter:oe,axisRanges:we,nearby:Ce}=n.useMemo(()=>{if(B==null||!me||W.length===0)return{visibleData:W,proximityCenter:null,axisRanges:null,nearby:[]};const a=K??me.id,s=W.find(_=>_.id===a);if(!s)return{visibleData:W,proximityCenter:null,axisRanges:null,nearby:[]};let z=1/0,j=-1/0,E=1/0,X=-1/0,se=1/0,ie=-1/0,le=1/0,te=-1/0;for(const _ of W)_.x<z&&(z=_.x),_.x>j&&(j=_.x),_.y<E&&(E=_.y),_.y>X&&(X=_.y),isFinite(_.z)&&(_.z<se&&(se=_.z),_.z>ie&&(ie=_.z)),_.cone!=null&&(_.cone<le&&(le=_.cone),_.cone>te&&(te=_.cone));const J=Math.max(j-z,.001),xe=Math.max(X-E,.001),r=Math.max(se<1/0?ie-se:1,.001),V=Math.max(te-le,1),A={x:J,y:xe,z:r},M=Z,ve=Math.max(0,Math.min(1,M.x)),je=Math.max(0,Math.min(1,M.y)),Se=Math.max(0,Math.min(1,M.z)),re=Math.max(0,Math.min(1,M.cone)),fe=Math.max(0,Math.min(1,M.surface)),_e=ve+je+Se+re+fe,et=_e>0?Math.sqrt(_e):1,Ee=[],Be=[],gt=s.cone??6,dt=s.surfaceType??"unknown";for(const _ of W){const Ue=(_.x-s.x)/A.x,tt=(_.y-s.y)/A.y,bt=(_.z-s.z)/A.z,yt=_.cone!=null&&s.cone!=null?Math.abs((_.cone-gt)/V):.5,vt=(_.surfaceType??"unknown")===dt?0:1,zt=Math.sqrt(ve*Ue*Ue+je*tt*tt+Se*bt*bt+re*yt*yt+fe*vt*vt)/et;zt<=B&&(Ee.push(_),_.id!==s.id&&Be.push({point:_,dist:zt,dx:Math.abs(Ue),dy:Math.abs(tt),dz:Math.abs(bt),dCone:yt,dSurface:vt}))}Ee.find(_=>_.id===s.id)||Ee.push(s),Be.sort((_,Ue)=>_.dist-Ue.dist);const pt=Be.slice(0,50).map(_=>({id:_.point.id,name:_.point.name,distance:_.dist,x:_.point.x,y:_.point.y,z:_.point.z,cone:_.point.cone,surfaceType:_.point.surfaceType??"unknown",dx:_.dx,dy:_.dy,dz:_.dz,dCone:_.dCone,dSurface:_.dSurface}));return{visibleData:Ee,proximityCenter:s,axisRanges:A,nearby:pt}},[W,me,B,K,Z]);n.useEffect(()=>{B!=null&&oe?w==null||w({visible:q.length,total:W.length,nearby:Ce}):w==null||w(null)},[q.length,W.length,B,oe,Ce,w]);const pe=n.useMemo(()=>{if(i==="cone"||i==="glaze_type")return null;let a=1/0,s=-1/0;for(const z of W){let j;switch(i){case"z_axis":j=z.z;break;case"surface":j=Lt(z.surfaceType);break;case"source":j=Ft(z.source);break;case"flux_ratio":j=z.fluxRatio;break;case"confidence":j=At(z.confidence);break;case"boron":j=z.boron;break;default:j=0}isFinite(j)&&(j<a&&(a=j),j>s&&(s=j))}return a===1/0?null:{min:a,max:s===a?a+1:s}},[W,i]),He=n.useMemo(()=>i==="glaze_type"?q.map(a=>ht(a.glazeTypeId)):q.map(a=>{switch(i){case"z_axis":return a.z;case"cone":return a.cone??6;case"surface":return Lt(a.surfaceType);case"source":return Ft(a.source);case"flux_ratio":return a.fluxRatio;case"confidence":return At(a.confidence);case"boron":return a.boron;default:return 0}}),[q,i]),Oe=n.useMemo(()=>{let a=1/0,s=-1/0;for(const z of W){const j=z.z;isFinite(j)&&!isNaN(j)&&(j<a&&(a=j),j>s&&(s=j))}return a===1/0?{min:0,max:1}:{min:a,max:s===a?a+1:s}},[W]),he=Oe.min-(Oe.max-Oe.min)*.05,Ae=n.useMemo(()=>!h||W.length<10?null:Ur(W.map(a=>({x:a.x,y:a.y,z:a.z})),{xRange:[.5,7.2],yRange:[0,1],resolution:40}),[W,h]);n.useEffect(()=>{I==null||I(Ae,W.map(a=>({x:a.x,y:a.y,z:a.z,name:a.name??""})))},[Ae,W,I]);const Ke=n.useMemo(()=>{if(!x||W.length<10)return null;const a=W.filter(s=>s.surfaceType&&s.surfaceType!=="unknown").map(s=>({x:s.x,y:s.y,surfaceType:s.surfaceType}));return a.length<5?null:Vr(a,{xRange:[.5,7.2],yRange:[0,1],resolution:30})},[W,x]),Ye=n.useMemo(()=>{var A,M,ve,je,Se;if(!Ke)return null;const{xCoords:a,yCoords:s,cells:z}=Ke,j=a.length,E=s.length,X=[],se=[],ie=[],le=[],te=[],J=[],xe=[],r=[],V=he+(Oe.max-Oe.min)*.001;for(let re=0;re<E;re++)for(let fe=0;fe<j;fe++){X.push(a[fe]),se.push(s[re]),ie.push(V);const _e=(A=z[re])==null?void 0:A[fe];le.push((_e==null?void 0:_e.confidence)??0)}for(let re=0;re<E-1;re++)for(let fe=0;fe<j-1;fe++){const _e=(M=z[re])==null?void 0:M[fe],et=(ve=z[re])==null?void 0:ve[fe+1],Ee=(je=z[re+1])==null?void 0:je[fe],Be=(Se=z[re+1])==null?void 0:Se[fe+1];if(!_e||!et||!Ee||!Be)continue;const gt=re*j+fe,dt=re*j+fe+1,pt=(re+1)*j+fe,_=(re+1)*j+fe+1,Ue=(_e.confidence+et.confidence+Ee.confidence)/3,tt=(et.confidence+Ee.confidence+Be.confidence)/3;te.push(gt),J.push(dt),xe.push(pt),r.push(Et(_e.type,.15+Ue*.35)),te.push(dt),J.push(_),xe.push(pt),r.push(Et(Be.type,.15+tt*.35))}return te.length===0?null:{type:"mesh3d",x:X,y:se,z:ie,i:te,j:J,k:xe,facecolor:r,opacity:.6,flatshading:!0,hoverinfo:"skip",name:"Surface Prediction",showlegend:!1,lighting:{ambient:1,diffuse:0,specular:0}}},[Ke,he,Oe.max]),De=n.useMemo(()=>{const a=i==="cone";return{type:"scatter3d",mode:"markers",x:q.map(s=>s.x),y:q.map(s=>s.y),z:q.map(s=>s.z),customdata:q.map(s=>s.id),text:q.map(s=>s.name),marker:{size:Q,opacity:h?.65:.8,color:He,...i==="glaze_type"?{}:{colorscale:a?Yt:Kr[i]||"Viridis",reversescale:!1,cmin:a?-4:pe==null?void 0:pe.min,cmax:a?10:pe==null?void 0:pe.max,colorbar:{title:i==="z_axis"?ze(t):ea(i),thickness:15,len:.5,tickvals:a?[-4,-2,0,2,4,6,8,10]:void 0,ticktext:a?["04","02","0","2","4","6","8","10"]:void 0}},line:{width:0}},hoverinfo:"text",hovertemplate:q.map(s=>{const z=[`<b>${s.name}</b>`,`SiO₂: ${s.x.toFixed(2)}`,`Al₂O₃: ${s.y.toFixed(2)}`,`${ze(t)}: ${t==="cone"?s.z:s.z.toFixed(3)}`];return s.cone!=null&&z.push(`Cone: ${s.cone}`),s.surfaceType&&s.surfaceType!=="unknown"&&z.push(`Surface: ${s.surfaceType}`),s.source&&s.source!=="unknown"&&z.push(`Source: ${s.source}`),z.join("<br>")+"<extra></extra>"}),name:"Glazes",showlegend:!1}},[q,He,i,pe,t,h,Q]),F=n.useMemo(()=>{if(!me)return null;const a=q.find(s=>s.id===me.id);return a?{type:"scatter3d",mode:"markers",x:[a.x],y:[a.y],z:[a.z],text:[a.name],marker:{size:10,symbol:"circle",color:"rgba(255, 255, 255, 0.9)",line:{width:3,color:"#facc15"}},hoverinfo:"text",hovertemplate:"<b>%{text}</b> (selected)<extra></extra>",name:"Selected",showlegend:!1}:null},[me,q]),Ge=n.useMemo(()=>{if(!me)return null;const a=q.find(s=>s.id===me.id);return a?{type:"scatter3d",mode:"lines",x:[a.x,a.x],y:[a.y,a.y],z:[a.z,he],line:{color:"rgba(250, 204, 21, 0.6)",width:2,dash:"dot"},hoverinfo:"skip",showlegend:!1,name:"selected-drop"}:null},[me,q,he]),ke=n.useMemo(()=>{if(Me.length===0)return null;const a=Me.map(E=>We(E.umf,"SiO2")),s=Me.map(E=>We(E.umf,"Al2O3")),z=Me.map(E=>{var X,se,ie,le,te,J,xe,r;switch(t){case"cone":return 6;case"flux_ratio":{const V=(((X=E.umf.Na2O)==null?void 0:X.value)??0)+(((se=E.umf.K2O)==null?void 0:se.value)??0)+(((ie=E.umf.Li2O)==null?void 0:ie.value)??0),A=(((le=E.umf.CaO)==null?void 0:le.value)??0)+(((te=E.umf.MgO)==null?void 0:te.value)??0)+(((J=E.umf.ZnO)==null?void 0:J.value)??0)+(((xe=E.umf.BaO)==null?void 0:xe.value)??0)+(((r=E.umf.SrO)==null?void 0:r.value)??0);return V+A>0?V/(V+A):0}case"SiO2_Al2O3_ratio":{const V=We(E.umf,"SiO2"),A=We(E.umf,"Al2O3");return A>0?V/A:0}default:return We(E.umf,t)}}),j=Me.map((E,X)=>{var se;return((se=E.recipe)==null?void 0:se.name)||`Blend ${X+1}`});return{type:"scatter3d",mode:"markers",x:a,y:s,z,text:j,marker:{size:6,symbol:"diamond",color:"#ff9800",opacity:.9,line:{width:1,color:"#fff"}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>SiO₂: %{x:.2f}<br>Al₂O₃: %{y:.2f}<br>${ze(t)}: %{z:.3f}<br><extra>Blend</extra>`,name:"Blend Results",showlegend:!1}},[Me,t]),Xe=n.useMemo(()=>{if(!f||f.length===0)return null;const a=q.filter(s=>f.includes(s.id));return a.length===0?null:{type:"scatter3d",mode:"markers",x:a.map(s=>s.x),y:a.map(s=>s.y),z:a.map(s=>s.z),text:a.map(s=>s.name),marker:{size:7,symbol:"circle",color:"rgba(255, 235, 59, 0.85)",line:{width:2,color:"#fff"}},hoverinfo:"text",hovertemplate:`<b>%{text}</b><br>SiO₂: %{x:.2f}<br>Al₂O₃: %{y:.2f}<br>${ze(t)}: %{z:.3f}<br><extra>Cluster</extra>`,name:"Highlighted",showlegend:!1}},[f,q,t]),$e=n.useMemo(()=>y?Jr(y,y.r,he,Oe.max):null,[y,he,Oe.max]),Ie=n.useMemo(()=>{if(q.length>300)return null;const a=[],s=[],z=[];for(const j of q)a.push(j.x,j.x,null),s.push(j.y,j.y,null),z.push(j.z,he,null);return{type:"scatter3d",mode:"lines",x:a,y:s,z,line:{color:"rgba(255,255,255,0.04)",width:1},hoverinfo:"skip",showlegend:!1,name:"droplines"}},[q,he]),Qe=n.useMemo(()=>Gr(he),[he]),Te=[],rt=n.useMemo(()=>Xr(he),[he]),at=n.useMemo(()=>({type:"scatter3d",mode:"text",x:[1.5,2.3,3.4,4.5,5,1.2],y:[.75,.55,.65,.25,.1,.08],z:Array(6).fill(he),text:["UNFUSED","MATTE","SEMI-MATTE","BRIGHT GLOSS","UNDERFIRED","CRAZED"],textfont:{color:k.regionLabel,size:10},hoverinfo:"skip",showlegend:!1,name:"labels"}),[he,k]),Ze=n.useMemo(()=>{if(!oe||!we||B==null)return null;const a=24,s=oe.x,z=oe.y,j=oe.z,E=B*we.x,X=B*we.y,se=B*we.z,ie=[],le=[],te=[];for(let J=0;J<=a;J+=3){const xe=Math.PI*J/a-Math.PI/2,r=Math.cos(xe),V=Math.sin(xe);for(let A=0;A<=a;A++){const M=2*Math.PI*A/a;ie.push(s+E*r*Math.cos(M)),le.push(z+X*r*Math.sin(M)),te.push(j+se*V)}ie.push(null),le.push(null),te.push(null)}for(let J=0;J<a;J+=3){const xe=2*Math.PI*J/a,r=Math.cos(xe),V=Math.sin(xe);for(let A=0;A<=a;A++){const M=Math.PI*A/a-Math.PI/2;ie.push(s+E*Math.cos(M)*r),le.push(z+X*Math.cos(M)*V),te.push(j+se*Math.sin(M))}ie.push(null),le.push(null),te.push(null)}return{type:"scatter3d",mode:"lines",x:ie,y:le,z:te,line:{color:"rgba(255,165,0,0.35)",width:1.5},hoverinfo:"skip",showlegend:!1,name:"proximity-sphere",connectgaps:!1}},[oe,we,B]),nt=n.useMemo(()=>{const a=[...Qe,...Te,rt,at];if(Ie&&a.push(Ie),Ye&&a.push(Ye),Ae&&h){const s=B!=null&&q.length<W.length;a.push(Qr(Ae,t,s?Math.min(v,.15):v,p,N))}if(a.push(De),Xe&&a.push(Xe),$e&&a.push($e),ke&&a.push(ke),F&&a.push(F),Ge&&a.push(Ge),Ze&&a.push(Ze),oe&&Ce.length>0){const s=Ce.slice(0,8),z=[],j=[],E=[];for(const X of s)z.push(oe.x,X.x,null),j.push(oe.y,X.y,null),E.push(oe.z,X.z,null);a.push({type:"scatter3d",mode:"lines",x:z,y:j,z:E,line:{color:"rgba(250, 204, 21, 0.25)",width:1.5,dash:"dot"},hoverinfo:"skip",showlegend:!1,name:"proximity-lines",connectgaps:!1})}if(b){const s=q.find(z=>z.id===b);s&&(a.push({type:"scatter3d",mode:"markers",x:[s.x],y:[s.y],z:[s.z],text:[s.name],marker:{size:12,symbol:"circle",color:"rgba(250, 204, 21, 0.2)",line:{width:2.5,color:"#facc15"}},hoverinfo:"skip",showlegend:!1,name:"hovered-neighbor"}),a.push({type:"scatter3d",mode:"lines",x:[s.x,s.x],y:[s.y,s.y],z:[s.z,he],line:{color:"rgba(250, 204, 21, 0.4)",width:1.5,dash:"dot"},hoverinfo:"skip",showlegend:!1,name:"hovered-drop"}))}return a},[Qe,Te,rt,at,Ie,Ae,h,v,t,p,N,Ye,De,Xe,$e,ke,F,Ge,Ze,B,q.length,W.length,oe,Ce,b,he]),ot=Yr[g](o),Je=$.current??ot;n.useEffect(()=>{$.current=null},[g,o]),n.useEffect(()=>{if(!S){ne.current&&(cancelAnimationFrame(ne.current),ne.current=null);return}let a=performance.now();const s=z=>{var te;const j=(te=T.current)==null?void 0:te.el,E=C.current;if(!j||!E){a=z,ne.current=requestAnimationFrame(s);return}const X=(z-a)/1e3;a=z,G.current+=H*X*.5;const se=G.current,ie=2.5/o,le={x:Math.cos(se)*ie,y:Math.sin(se)*ie,z:1.2/o};try{E.relayout(j,{"scene.camera.eye":le,"scene.camera.up":{x:0,y:0,z:1}})}catch{}ne.current=requestAnimationFrame(s)};return ne.current=requestAnimationFrame(s),()=>{ne.current&&(cancelAnimationFrame(ne.current),ne.current=null)}},[S,H,o]);const st=n.useCallback(a=>{const s=a==null?void 0:a["scene.camera"];s&&!S&&($.current=s),s!=null&&s.eye&&S&&(G.current=Math.atan2(s.eye.y,s.eye.x))},[S]),it=n.useMemo(()=>({...Je,projection:{type:m>.01?"perspective":"orthographic"}}),[Je,m]),ft=n.useMemo(()=>({scene:{xaxis:{title:{text:"SiO₂",font:{color:k.axisTitle}},range:[.5,7.2],gridcolor:k.grid,zerolinecolor:k.zeroline,tickfont:{color:k.tick},backgroundcolor:k.axisbg},yaxis:{title:{text:"Al₂O₃",font:{color:k.axisTitle}},range:[0,1],gridcolor:k.grid,zerolinecolor:k.zeroline,tickfont:{color:k.tick},backgroundcolor:k.axisbg},zaxis:{title:{text:ze(t),font:{color:k.axisTitle}},gridcolor:k.grid,zerolinecolor:k.zeroline,tickfont:{color:k.tick},backgroundcolor:k.axisbg},bgcolor:k.bg,camera:it,aspectmode:"manual",aspectratio:{x:2,y:1,z:ce}},paper_bgcolor:k.paper,font:{color:k.font},margin:{l:0,r:0,t:0,b:0},hovermode:"closest",showlegend:!1,uirevision:"stull3d"}),[t,k,it,ce]),lt=n.useCallback(a=>{var z,j,E;const s=(z=a.points)==null?void 0:z[0];if(s!=null&&s.customdata&&((j=s==null?void 0:s.data)==null?void 0:j.type)==="scatter3d"&&((E=s==null?void 0:s.data)==null?void 0:E.mode)==="markers"){const X=Re.getState().glazes.get(s.customdata);X&&Le(X)}},[Le]),mt=n.useCallback(a=>{var z,j,E,X,se,ie,le,te;const s=(z=a.points)==null?void 0:z[0];if(s!=null&&s.customdata&&((j=s==null?void 0:s.data)==null?void 0:j.type)==="scatter3d"&&((E=s==null?void 0:s.data)==null?void 0:E.mode)==="markers"){const J=Re.getState().glazes.get(s.customdata);if(J){const xe=(X=J.coneRange)==null?void 0:X[0];Ne({id:s.customdata,name:J.name,source:J.source??"unknown",x:s.x,y:s.y,cone:typeof xe=="number"?xe:null,surfaceType:J.surfaceType??"unknown",fluxRatio:((ie=(se=J.umf)==null?void 0:se._meta)==null?void 0:ie.R2O_RO_ratio)??0,boron:((te=(le=J.umf)==null?void 0:le.B2O3)==null?void 0:te.value)??0,confidence:J.umfConfidence??"inferred",glazeTypeId:J.glazeTypeId??null})}}},[Ne]),ct=n.useMemo(()=>({displayModeBar:!P,modeBarButtonsToRemove:["select2d","lasso2d","toImage"],scrollZoom:!P,displaylogo:!1}),[P]);return L?e.jsx(L,{ref:T,data:nt,layout:ft,config:ct,onClick:lt,onHover:mt,onRelayout:st,useResizeHandler:!0,style:{width:c||"100%",height:d||"100%"}}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,width:c||"100%",height:d||"100%",color:"#777",fontSize:13,background:"var(--bg-secondary, #1a1a1a)",borderRadius:8,...l?{}:{animation:"pulse 1.5s ease-in-out infinite"}},children:[e.jsx("style",{children:"@keyframes pulse { 0%,100% { opacity: 0.6 } 50% { opacity: 1 } }"}),l?e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{fontSize:22},children:"⚠"}),e.jsx("span",{children:"3D engine failed to load"}),e.jsx("button",{onClick:()=>u(a=>a+1),style:{marginTop:4,padding:"6px 16px",borderRadius:6,border:"1px solid #555",background:"var(--bg-tertiary, #252525)",color:"#ccc",cursor:"pointer",fontSize:13},children:"Tap to retry"})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Loading 3D engine…"}),Y&&e.jsx("span",{style:{fontSize:11,color:"#666"},children:"Slow connection — still trying…"})]})]})}function Lt(t){return{matte:1,satin:2,gloss:3,crystalline:4,crawl:5,unknown:0}[t]??0}function Ft(t){return{glazy:1,digitalfire:2,user:3,calculated:4}[t]??0}function At(t){return{unknown:0,assumed:1,inferred:2,declared:3,verified:4}[t]??0}function ea(t){return{cone:"Cone",surface:"Surface",source:"Source",flux_ratio:"R₂O:RO",confidence:"Confidence",boron:"B₂O₃"}[t]||t}function ze(t){return{B2O3:"B₂O₃",CaO:"CaO",MgO:"MgO",Na2O:"Na₂O",K2O:"K₂O",ZnO:"ZnO",BaO:"BaO",Fe2O3:"Fe₂O₃",cone:"Cone",flux_ratio:"R₂O:RO",SiO2_Al2O3_ratio:"SiO₂:Al₂O₃"}[t]||t}const ta=Object.freeze(Object.defineProperty({__proto__:null,DEFAULT_PROXIMITY_WEIGHTS:Ve,StullPlot3D:Pt,default:Pt,zAxisLabel:ze},Symbol.toStringTag,{value:"Module"})),kt=t=>t==="gloss"?"G":t==="matte"?"M":t==="satin"?"S":t==="crystalline"?"X":t==="crawl"?"C":"?",ra=[{key:"gloss",label:"G"},{key:"matte",label:"M"},{key:"satin",label:"S"},{key:"crystalline",label:"X"},{key:"crawl",label:"C"},{key:"unknown",label:"?"}];function aa({proximityStats:t,glazes:i,selectedGlaze:o,pinnedCenterId:c,hoveredNeighborId:d,explorationPath:f,zAxis:y,onSelectGlaze:h,onCompareGlaze:v,onHoverNeighbor:x,onPinCenter:g,onExplorationPathChange:m}){var D,ae;const[N,I]=n.useState(new Set),[S,H]=n.useState(!1),[Q,ce]=n.useState("distance"),[B,K]=n.useState("list"),Z=n.useRef(null),b=n.useMemo(()=>new Set(t.nearby.map(u=>u.surfaceType)),[t.nearby]),w=n.useMemo(()=>{const u=new Map;for(const T of t.nearby){const C=i.get(T.id);C&&u.set(T.id,C)}return u},[t.nearby,i]),U=n.useMemo(()=>t.nearby.filter(u=>{const T=w.get(u.id);return(T==null?void 0:T.images)&&T.images.length>0}).length,[t.nearby,w]),P=n.useMemo(()=>{let u=N.size===0?[...t.nearby]:t.nearby.filter(T=>N.has(T.surfaceType));return S&&(u=u.filter(T=>{const C=w.get(T.id);return(C==null?void 0:C.images)&&C.images.length>0})),Q==="cone"?u.sort((T,C)=>(T.cone??99)-(C.cone??99)||T.distance-C.distance):Q==="name"&&u.sort((T,C)=>T.name.localeCompare(C.name)),u},[t.nearby,N,S,Q,w]),L=3,R=n.useCallback(u=>{var ne;const T=Z.current;if(!T)return;const C=Array.from(T.querySelectorAll(B==="gallery"?".gallery-card":".proximity-nearby-item"));if(C.length===0)return;const $=C.findIndex(de=>de===document.activeElement);let G=-1;switch(u.key){case"ArrowDown":B==="gallery"?G=$<0?0:Math.min($+L,C.length-1):G=$<0?0:Math.min($+1,C.length-1);break;case"ArrowUp":B==="gallery"?G=$<0?0:Math.max($-L,0):G=$<0?0:Math.max($-1,0);break;case"ArrowRight":B==="gallery"&&(G=$<0?0:Math.min($+1,C.length-1));break;case"ArrowLeft":B==="gallery"&&(G=$<0?0:Math.max($-1,0));break;case"Home":G=0;break;case"End":G=C.length-1;break;case"Enter":$>=0&&C[$].click();return;default:return}if(G>=0&&G!==$){u.preventDefault(),C[G].focus(),C[G].scrollIntoView({block:"nearest"});const de=((ne=P[G])==null?void 0:ne.id)??null;x(de)}},[B,P,x]),l=d?t.nearby.find(u=>u.id===d)??null:null,O=d?w.get(d)??null:null,Y=(u,T)=>{const C=w.get(T.id);C&&(u.shiftKey?v(C):(o&&!c&&m((()=>{const $=f;return $.length>0&&$[$.length-1].id===o.id?$:[...$,{id:o.id,name:o.name}].slice(-10)})()),h(C)))};return e.jsxs("div",{className:"proximity-nearby-list",children:[f.length>0&&e.jsx("div",{className:"proximity-breadcrumb",children:f.map((u,T)=>e.jsxs(wt.Fragment,{children:[T>0&&e.jsx("span",{className:"breadcrumb-arrow",children:"›"}),e.jsx("button",{className:"breadcrumb-btn",onClick:()=>{const C=i.get(u.id);C&&(h(C),m(f.slice(0,T)))},title:u.name,children:u.name.length>12?u.name.slice(0,11)+"…":u.name})]},u.id))}),e.jsxs("div",{className:"proximity-nearby-header",children:[e.jsxs("span",{children:["Nearby (",P.length,N.size>0?`/${t.nearby.length}`:"",")"]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsxs("div",{className:"proximity-sort-btns",children:[e.jsx("button",{className:`proximity-sort-btn${B==="list"?" on":""}`,onClick:()=>K("list"),title:"List view",children:"≡"}),e.jsx("button",{className:`proximity-sort-btn${B==="gallery"?" on":""}`,onClick:()=>K("gallery"),title:"Gallery view",children:"▦"})]}),e.jsx("div",{className:"proximity-sort-btns",children:["distance","cone","name"].map(u=>e.jsx("button",{className:`proximity-sort-btn${Q===u?" on":""}`,onClick:()=>ce(u),title:`Sort by ${u}`,children:u==="distance"?"↔":u==="cone"?"△":"Az"},u))}),e.jsx("button",{className:`proximity-pin-btn${c?" pinned":""}`,onClick:()=>g(c?null:(o==null?void 0:o.id)??null),title:c?"Unpin center — proximity follows selection":"Pin center — keep this neighborhood while exploring",children:c?"📌":"📌Pin"})]})]}),e.jsxs("div",{className:"proximity-filter-pills",children:[ra.filter(u=>b.has(u.key)).map(u=>e.jsx("button",{className:`proximity-pill st-${u.key}${N.has(u.key)?" on":""}`,onClick:()=>I(T=>{const C=new Set(T);return C.has(u.key)?C.delete(u.key):C.add(u.key),C}),title:u.key,children:u.label},u.key)),e.jsxs("button",{className:`proximity-pill photo-pill${S?" on":""}`,onClick:()=>H(u=>!u),title:`Show only glazes with photos (${U})`,children:["📷",S?` ${U}`:""]}),(N.size>0||S)&&e.jsx("button",{className:"proximity-pill clear",onClick:()=>{I(new Set),H(!1)},title:"Clear all filters",children:"×"})]}),e.jsx("div",{ref:Z,className:`proximity-nearby-scroll${B==="gallery"?" gallery-mode":""}`,onKeyDown:R,role:"listbox","aria-label":`Nearby glazes ${B} view`,children:B==="gallery"?P.map((u,T)=>{var G,ne;const C=w.get(u.id),$=((G=C==null?void 0:C.images)==null?void 0:G[0])??null;return e.jsxs("button",{className:`gallery-card${(o==null?void 0:o.id)===u.id?" active":""}${d===u.id?" hovered":""}`,onClick:de=>Y(de,u),onMouseEnter:()=>x(u.id),onMouseLeave:()=>x(null),onFocus:()=>x(u.id),onBlur:()=>x(null),role:"option","aria-selected":(o==null?void 0:o.id)===u.id,title:`${u.name}
SiO₂: ${u.x.toFixed(2)}, Al₂O₃: ${u.y.toFixed(2)}
Shift+click to compare`,children:[e.jsxs("div",{className:"gallery-thumb",children:[$?e.jsx("img",{src:$,alt:u.name,loading:"lazy",onError:de=>{const be=de.currentTarget;be.style.display="none";const ye=be.nextElementSibling;ye&&(ye.style.display="")}}):null,e.jsx("div",{className:"gallery-no-photo",style:$?{display:"none"}:void 0,children:e.jsx("span",{className:`proximity-nearby-surface st-${u.surfaceType}`,children:kt(u.surfaceType)})}),e.jsxs("span",{className:"gallery-rank",children:["#",T+1]}),(((ne=C==null?void 0:C.images)==null?void 0:ne.length)??0)>1&&e.jsxs("span",{className:"gallery-photo-count",children:["📷",C.images.length]}),e.jsx("span",{className:"gallery-dist",children:u.distance.toFixed(2)})]}),e.jsxs("div",{className:"gallery-info",children:[e.jsx("span",{className:"gallery-name",children:u.name}),e.jsxs("div",{className:"gallery-meta",children:[u.cone!=null&&e.jsxs("span",{className:"proximity-nearby-cone",children:["△",u.cone]}),e.jsx("span",{className:`proximity-nearby-surface st-${u.surfaceType}`,children:kt(u.surfaceType)})]})]})]},u.id)}):P.map((u,T)=>{var G,ne;const C=w.get(u.id),$=((G=C==null?void 0:C.images)==null?void 0:G[0])??null;return e.jsxs("button",{className:`proximity-nearby-item${(o==null?void 0:o.id)===u.id?" active":""}${d===u.id?" hovered":""}`,onClick:de=>Y(de,u),onMouseEnter:()=>x(u.id),onMouseLeave:()=>x(null),onFocus:()=>x(u.id),onBlur:()=>x(null),role:"option","aria-selected":(o==null?void 0:o.id)===u.id,title:`SiO₂: ${u.x.toFixed(2)}, Al₂O₃: ${u.y.toFixed(2)}, ${ze(y)}: ${u.z.toFixed(3)}
Shift+click to compare`,children:[$?e.jsx("img",{className:"list-thumb",src:$,alt:"",loading:"lazy",onError:de=>{const be=de.currentTarget;be.style.display="none";const ye=be.nextElementSibling;ye&&(ye.style.display="")}}):null,e.jsx("span",{className:"list-thumb-placeholder",style:$?{display:"none"}:void 0}),(((ne=C==null?void 0:C.images)==null?void 0:ne.length)??0)>1&&e.jsx("span",{className:"list-photo-count",children:C.images.length}),e.jsx("span",{className:"proximity-nearby-rank",children:T+1}),e.jsx("span",{className:"proximity-nearby-name",children:u.name}),u.cone!=null&&e.jsxs("span",{className:"proximity-nearby-cone",children:["△",(typeof u.cone=="number"&&u.cone===Math.floor(u.cone),u.cone)]}),e.jsx("span",{className:`proximity-nearby-surface st-${u.surfaceType}`,title:u.surfaceType,children:kt(u.surfaceType)}),e.jsxs("span",{className:"proximity-nearby-bars",title:`SiO₂: ${(Math.max(0,1-u.dx)*100).toFixed(0)}% | Al₂O₃: ${(Math.max(0,1-u.dy)*100).toFixed(0)}% | ${ze(y)}: ${(Math.max(0,1-u.dz)*100).toFixed(0)}%`,children:[e.jsx("span",{className:"sim-bar bar-x",style:{width:`${Math.max(0,1-u.dx)*100}%`}}),e.jsx("span",{className:"sim-bar bar-y",style:{width:`${Math.max(0,1-u.dy)*100}%`}}),e.jsx("span",{className:"sim-bar bar-z",style:{width:`${Math.max(0,1-u.dz)*100}%`}})]}),e.jsx("span",{className:"proximity-nearby-dist",children:u.distance.toFixed(2)})]},u.id)})}),(O==null?void 0:O.umf)&&l&&e.jsxs("div",{className:"proximity-preview",children:[e.jsxs("div",{className:"proximity-preview-top",children:[((D=O.images)==null?void 0:D[0])&&e.jsx("img",{className:"preview-thumb",src:O.images[0],alt:"",loading:"lazy",onError:u=>{u.currentTarget.style.display="none"}}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"proximity-preview-name",children:O.name}),e.jsxs("div",{className:"proximity-preview-meta",children:[((ae=O.coneRange)==null?void 0:ae[0])!=null&&e.jsxs("span",{children:["△",O.coneRange[0],O.coneRange[1]!==O.coneRange[0]?`–${O.coneRange[1]}`:""]}),e.jsx("span",{children:O.surfaceType}),e.jsx("span",{children:O.atmosphere}),e.jsxs("span",{children:["d=",l.distance.toFixed(3)]})]})]})]}),e.jsxs("div",{className:"proximity-preview-row",children:[e.jsx(Bt,{umf:O.umf,width:120,height:10,compact:!0}),e.jsx(Ut,{umf:O.umf,size:32,innerRadius:.55})]})]}),e.jsxs("div",{className:"proximity-nearby-legend",children:[e.jsxs("span",{className:"sim-legend-item",children:[e.jsx("span",{className:"sim-dot dot-x"}),"SiO","₂"]}),e.jsxs("span",{className:"sim-legend-item",children:[e.jsx("span",{className:"sim-dot dot-y"}),"Al","₂","O","₃"]}),e.jsxs("span",{className:"sim-legend-item",children:[e.jsx("span",{className:"sim-dot dot-z"}),ze(y)]})]})]})}function Pe(t,i,o){return o<=0?0:((t+i)%o+o)%o}function na(t,i){return i<=0?0:Math.min(t,i-1)}function xt(t,i,o=.5,c=4){const d=t+i;return d>c?c:d<o?o:d}function oa(t){if(!t||typeof t!="object")return!1;const i=t;if(!i.tagName)return!1;const o=i.tagName;return!!(o==="INPUT"||o==="TEXTAREA"||o==="SELECT"||i.isContentEditable)}function sa({images:t,glazeName:i,sidebarTab:o}){const[c,d]=n.useState(0),[f,y]=n.useState(!1),[h,v]=n.useState(1);n.useEffect(()=>{d(0),y(!1),v(1)},[t]),n.useEffect(()=>{if(!t||t.length===0)return;const g=m=>{oa(m.target)||(f?m.key==="Escape"?(y(!1),v(1),m.preventDefault()):m.key==="ArrowLeft"?(d(N=>Pe(N,-1,t.length)),m.preventDefault()):m.key==="ArrowRight"?(d(N=>Pe(N,1,t.length)),m.preventDefault()):m.key==="+"||m.key==="="?(v(N=>xt(N,.5)),m.preventDefault()):m.key==="-"?(v(N=>xt(N,-.5)),m.preventDefault()):m.key==="0"&&(v(1),m.preventDefault()):o==="detail"&&(m.key==="ArrowLeft"&&t.length>1?(d(N=>Pe(N,-1,t.length)),m.preventDefault()):m.key==="ArrowRight"&&t.length>1&&(d(N=>Pe(N,1,t.length)),m.preventDefault())))};return window.addEventListener("keydown",g),()=>window.removeEventListener("keydown",g)},[t,f,o]);const x=na(c,t.length);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"detail-section",children:[e.jsxs("h4",{children:["Photo",t.length>1?`s (${x+1}/${t.length})`:""]}),e.jsxs("div",{className:"carousel-container",children:[e.jsx("img",{src:t[x],alt:`${i} — photo ${x+1}`,loading:"lazy",className:"carousel-img",onClick:()=>{y(!0),v(1)},style:{cursor:"zoom-in"},title:"Click to enlarge (← → to cycle, Esc to close)",onError:g=>{g.currentTarget.style.display="none";const m=g.currentTarget.nextElementSibling;m!=null&&m.classList.contains("carousel-img-fallback")&&(m.style.display="flex")}}),e.jsx("div",{className:"carousel-img-fallback",style:{display:"none",alignItems:"center",justifyContent:"center",height:200,color:"var(--text-secondary, #888)",fontSize:13},children:"Image unavailable"}),t.length>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"carousel-btn carousel-prev",onClick:()=>d(g=>Pe(g,-1,t.length)),title:"Previous photo",children:"‹"}),e.jsx("button",{className:"carousel-btn carousel-next",onClick:()=>d(g=>Pe(g,1,t.length)),title:"Next photo",children:"›"}),e.jsx("div",{className:"carousel-dots",children:t.map((g,m)=>e.jsx("button",{className:`carousel-dot${m===x?" active":""}`,onClick:()=>d(m)},m))})]})]})]}),f&&e.jsx("div",{className:"lightbox-overlay",onClick:g=>{g.target===g.currentTarget&&(y(!1),v(1))},role:"dialog","aria-label":"Image lightbox",children:e.jsxs("div",{className:"lightbox-content",children:[e.jsx("img",{src:t[x],alt:`${i} — photo ${x+1}`,className:"lightbox-img",style:{transform:`scale(${h})`},draggable:!1,onError:g=>{g.currentTarget.style.display="none";const m=g.currentTarget.nextElementSibling;m!=null&&m.classList.contains("lightbox-img-fallback")&&(m.style.display="flex")}}),e.jsx("div",{className:"lightbox-img-fallback",style:{display:"none",alignItems:"center",justifyContent:"center",color:"#ccc",fontSize:16},children:"Image unavailable"}),t.length>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"lightbox-nav lightbox-prev",onClick:()=>d(g=>Pe(g,-1,t.length)),title:"Previous (←)",children:"‹"}),e.jsx("button",{className:"lightbox-nav lightbox-next",onClick:()=>d(g=>Pe(g,1,t.length)),title:"Next (→)",children:"›"})]}),e.jsxs("div",{className:"lightbox-toolbar",children:[e.jsxs("span",{className:"lightbox-caption",children:[i,t.length>1?` (${x+1}/${t.length})`:""]}),e.jsxs("div",{className:"lightbox-zoom-controls",children:[e.jsx("button",{onClick:()=>v(g=>xt(g,-.5)),title:"Zoom out (−)",children:"−"}),e.jsxs("span",{children:[(h*100).toFixed(0),"%"]}),e.jsx("button",{onClick:()=>v(g=>xt(g,.5)),title:"Zoom in (+)",children:"+"}),h!==1&&e.jsx("button",{onClick:()=>v(1),title:"Reset zoom (0)",children:"1:1"})]}),e.jsx("button",{className:"lightbox-close",onClick:()=>{y(!1),v(1)},title:"Close (Esc)",children:"✕"})]})]})})]})}const ia=`
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
`,la=n.lazy(()=>qe(()=>Promise.resolve().then(()=>ta),void 0).then(t=>({default:t.StullPlot3D}))),ca=n.lazy(()=>qe(()=>import("./ComparePanel-D5vB-OOe.js"),__vite__mapDeps([3,1,4,5,6,7,8,9,10,11,12,13,14,15,16])).then(t=>({default:t.ComparePanel}))),da=n.lazy(()=>qe(()=>import("./index-BAskAcIm.js"),__vite__mapDeps([17,1,5,6,7,8])).then(t=>({default:t.AnalysisPanel})));n.lazy(()=>qe(()=>import("./index-DNJCmhuO.js"),__vite__mapDeps([18,1,10,11])).then(t=>({default:t.DigitalfirePanel})));function pa(){const t=tr(),[i,o]=n.useState("SiO2"),[c,d]=n.useState("Al2O3"),[f,y]=n.useState("cone"),[h,v]=n.useState(1),[x,g]=n.useState(!1),[m,N]=n.useState("B2O3"),[I,S]=n.useState(!0),[H,Q]=n.useState(.35),[ce,B]=n.useState(!1),[K,Z]=n.useState("default"),[b,w]=n.useState(!1),[U,P]=n.useState("6"),[L,R]=n.useState(.5),[l,O]=n.useState(!1),[Y,D]=n.useState({x:1,y:-1,z:2}),[ae,u]=n.useState(null),[T,C]=n.useState([]),[$,G]=n.useState(!1),[ne,de]=n.useState(.5);n.useEffect(()=>{if(!t.active)return;g(!0),G(!0),de(.3),y("cone"),S(!0),Q(.25),R(.6),Le(.8),ye(3);const V=new URLSearchParams(window.location.search||window.location.hash.split("?")[1]||"").get("z");V&&N(V)},[t.active]);const[be,ye]=n.useState(2.5),[me,Le]=n.useState(.8),[Ne,Me]=n.useState(!1),[Fe,p]=n.useState(.35),[k,ee]=n.useState(null),[ue,W]=n.useState(null),[q,oe]=n.useState(null),[we,Ce]=n.useState([]),[pe,He]=n.useState({...Ve}),[Oe,he]=n.useState(!1),[Ae,Ke]=n.useState(0),Ye=n.useCallback((r,V)=>{u(r),C(V)},[]),De=n.useCallback(()=>{Ke(r=>r+1)},[]);n.useEffect(()=>{if(!x)return;const r=["default","top","side-x","side-y"],V=A=>{const M=A.target;(M==null?void 0:M.tagName)==="INPUT"||(M==null?void 0:M.tagName)==="TEXTAREA"||(M==null?void 0:M.tagName)==="SELECT"||M!=null&&M.isContentEditable||(A.key>="1"&&A.key<="4"?(Z(r[Number(A.key)-1]),A.preventDefault()):A.key==="r"||A.key==="R"?(G(ve=>!ve),A.preventDefault()):A.key==="0"&&(De(),A.preventDefault()))};return window.addEventListener("keydown",V),()=>window.removeEventListener("keydown",V)},[x,De]),n.useEffect(()=>{x&&y("z_axis")},[x,m]);const F=ge(r=>r.selectedGlaze),Ge=ge(r=>r.showSidebar),ke=ge(r=>r.sidebarTab);n.useEffect(()=>{F||(Me(!1),W(null))},[F]);const Xe=ge(r=>r.toggleSidebar),$e=ge(r=>r.setSidebarTab),Ie=ge(r=>r.setSelectedGlaze),Qe=ge(r=>r.addToCompare),Te=ge(r=>r.compareGlazes),rt=ge(r=>r.removeFromCompare),at=ge(r=>r.clearCompare),Ze=Re(r=>r.glazes),[nt,ot]=n.useState([]),[Je,st]=n.useState(null),it=n.useCallback(r=>{ot(r),st(null)},[]),ft=n.useCallback((r,V)=>{st({x:r.x,y:r.y,r:V}),ot([])},[]),[lt,mt]=n.useState(null),[ct,a]=n.useState(!1),s=n.useCallback(r=>{mt(r),r&&a(!0)},[]),{results:z,weights:j,count:E,setCount:X,updateWeight:se,resetWeights:ie,oxides:le}=ur(F,Ze),te=["SiO2","Al2O3","B2O3","Na2O","K2O","CaO","MgO","ZnO","BaO"],J=[...x?[{value:"z_axis",label:"↕ Z Axis"}]:[],{value:"cone",label:"Cone"},{value:"glaze_type",label:"Glaze Type"},{value:"surface",label:"Surface"},{value:"source",label:"Source"},{value:"flux_ratio",label:"R2O:RO Ratio"},{value:"boron",label:"Boron"},{value:"confidence",label:"Confidence"}],xe=[{value:"B2O3",label:"B₂O₃ (Boron)"},{value:"CaO",label:"CaO (Calcium)"},{value:"MgO",label:"MgO (Magnesium)"},{value:"Na2O",label:"Na₂O (Sodium)"},{value:"K2O",label:"K₂O (Potassium)"},{value:"ZnO",label:"ZnO (Zinc)"},{value:"BaO",label:"BaO (Barium)"},{value:"Fe2O3",label:"Fe₂O₃ (Iron)"},{value:"cone",label:"Cone (Temperature)"},{value:"flux_ratio",label:"R₂O:RO Ratio"},{value:"SiO2_Al2O3_ratio",label:"SiO₂:Al₂O₃ Ratio"}];return e.jsxs("div",{className:`stull-explorer${t.active?" kiosk-active":""}`,role:"application","aria-label":"Stull Chart Glaze Explorer",children:[!t.active&&e.jsxs("aside",{className:"controls-panel","aria-label":"Plot controls",children:[e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{id:"axes-heading",children:"Axes"}),e.jsxs("div",{className:"axis-controls",role:"group","aria-labelledby":"axes-heading",children:[e.jsxs("label",{children:["X Axis",e.jsx("select",{value:i,onChange:r=>o(r.target.value),children:te.map(r=>e.jsx("option",{value:r,children:r},r))})]}),e.jsxs("label",{children:["Y Axis",e.jsx("select",{value:c,onChange:r=>d(r.target.value),children:te.map(r=>e.jsx("option",{value:r,children:r},r))})]})]})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Color By"}),e.jsx("select",{value:f,onChange:r=>y(r.target.value),className:"color-select",children:J.map(r=>e.jsx("option",{value:r.value,children:r.label},r.value))})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"View"}),e.jsx("button",{className:`view-toggle ${x?"active":""}`,onClick:()=>g(!x),"aria-pressed":x,"aria-label":x?"Switch to 2D view":"Switch to 3D view",children:x?"◆ 3D":"◇ 2D"}),x&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"z-axis-control",children:e.jsxs("label",{children:["Z Axis",e.jsx("select",{value:m,onChange:r=>N(r.target.value),children:xe.map(r=>e.jsx("option",{value:r.value,children:r.label},r.value))})]})}),e.jsxs("div",{className:"three-d-extras",children:[e.jsxs("label",{className:"surface-toggle",children:[e.jsx("input",{type:"checkbox",checked:I,onChange:r=>S(r.target.checked)}),"Fitted Surface"]}),I&&e.jsxs("div",{className:"surface-opacity",children:[e.jsx("span",{children:"Opacity"}),e.jsx("input",{type:"range",min:"0.1",max:"0.8",step:"0.05",value:H,onChange:r=>Q(Number(r.target.value))}),e.jsxs("span",{className:"opacity-value",children:[Math.round(H*100),"%"]})]}),e.jsxs("label",{className:"surface-toggle",children:[e.jsx("input",{type:"checkbox",checked:ce,onChange:r=>B(r.target.checked)}),"Predict Surface"]}),ce&&e.jsxs("div",{className:"prediction-legend",children:[e.jsx("span",{className:"pred-dot",style:{background:"#22c55e"}}),"Matte",e.jsx("span",{className:"pred-dot",style:{background:"#3b82f6"}}),"Gloss",e.jsx("span",{className:"pred-dot",style:{background:"#f59e0b"}}),"Satin",e.jsx("span",{className:"pred-dot",style:{background:"#a855f7"}}),"Crystal"]})]}),e.jsxs("div",{className:"camera-presets",children:[e.jsx("span",{className:"presets-label",children:"Camera"}),e.jsxs("div",{className:"preset-buttons",children:[["default","top","side-x","side-y"].map(r=>e.jsx("button",{className:`preset-btn ${K===r?"active":""}`,onClick:()=>Z(r),title:{default:"Perspective view (1)",top:"Top-down / birds eye (2)","side-x":"Side view along Al₂O₃ (3)","side-y":"Side view along SiO₂ (4)"}[r],children:{default:"⬢",top:"⮝","side-x":"⮞","side-y":"⮜"}[r]},r)),e.jsx("button",{className:"preset-btn",onClick:De,title:"Reset camera to current preset",children:"↺"})]})]}),e.jsxs("div",{className:"three-d-control-row",children:[e.jsxs("label",{className:"surface-toggle",children:[e.jsx("input",{type:"checkbox",checked:$,onChange:r=>G(r.target.checked)}),"Auto-Rotate"]}),$&&e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"0.1",max:"2",step:"0.1",value:ne,onChange:r=>de(Number(r.target.value)),title:`Speed: ${ne.toFixed(1)}x`}),e.jsxs("span",{className:"slider-value",children:[ne.toFixed(1),"x"]})]})]}),e.jsxs("div",{className:"three-d-control-row",children:[e.jsx("span",{className:"control-row-label",children:"Point Size"}),e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"1",max:"8",step:"0.5",value:be,onChange:r=>ye(Number(r.target.value))}),e.jsx("span",{className:"slider-value",children:be.toFixed(1)})]})]}),e.jsxs("div",{className:"three-d-control-row",children:[e.jsx("span",{className:"control-row-label",children:"Z Stretch"}),e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"0.2",max:"2.0",step:"0.1",value:me,onChange:r=>Le(Number(r.target.value))}),e.jsx("span",{className:"slider-value",children:me.toFixed(1)})]})]}),e.jsxs("div",{className:"three-d-control-row",children:[e.jsx("span",{className:"control-row-label",children:"Perspective"}),e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:L,onChange:r=>R(Number(r.target.value)),title:L<.01?"Orthographic":`Perspective: ${Math.round(L*100)}%`}),e.jsx("span",{className:"slider-value",children:L<.01?"Ortho":`${Math.round(L*100)}%`})]})]}),e.jsxs("div",{className:"light-control",children:[e.jsxs("label",{className:"surface-toggle",children:[e.jsx("input",{type:"checkbox",checked:l,onChange:r=>O(r.target.checked)}),"Light Source"]}),l&&e.jsx("div",{style:{marginTop:6,display:"flex",flexDirection:"column",gap:4},children:["x","y","z"].map(r=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:12},children:[e.jsx("span",{style:{width:12,color:"var(--text-secondary)"},children:r.toUpperCase()}),e.jsx("input",{type:"range",min:"-3",max:"3",step:"0.1",value:Y[r],onChange:V=>D(A=>({...A,[r]:Number(V.target.value)})),style:{flex:1}}),e.jsx("span",{style:{fontSize:11,color:"var(--text-dim)",minWidth:28,textAlign:"right"},children:Y[r].toFixed(1)})]},r))})]}),e.jsxs("div",{className:"three-d-control-row proximity-control",children:[e.jsxs("label",{className:"surface-toggle",style:{margin:0},children:[e.jsx("input",{type:"checkbox",checked:Ne,onChange:r=>Me(r.target.checked),disabled:!F}),"Proximity"]}),Ne&&F&&e.jsxs("div",{className:"inline-slider",children:[e.jsx("input",{type:"range",min:"0.05",max:"1.5",step:"0.05",value:Fe,onChange:r=>p(Number(r.target.value)),title:`Radius: ${(Fe*100).toFixed(0)}%`}),e.jsx("span",{className:"slider-value",children:k?`${k.visible}/${k.total}`:`${(Fe*100).toFixed(0)}%`})]}),Ne&&!F&&e.jsx("span",{className:"slider-value",style:{fontSize:10,opacity:.6},children:"Select a glaze"})]}),Ne&&F&&(()=>{const r=[{label:"Balanced",title:"Equal weight on all axes",weights:{x:.5,y:.5,z:.5,cone:0,surface:0}},{label:"Chemistry Twin",title:"Prioritize SiO₂ and Al₂O₃ match",weights:{x:1,y:1,z:.3,cone:0,surface:0}},{label:"Same Surface",title:"Must match surface type",weights:{x:.3,y:.3,z:.2,cone:0,surface:1}},{label:"Same Cone",title:"Prioritize firing temperature match",weights:{x:.2,y:.2,z:.2,cone:1,surface:0}},{label:"Flux Sibling",title:"Match on Z-axis (flux/ratio)",weights:{x:.2,y:.2,z:1,cone:0,surface:0}}],V=[{key:"x",label:"SiO₂",color:"#3b82f6"},{key:"y",label:"Al₂O₃",color:"#22c55e"},{key:"z",label:ze(m),color:"#f59e0b"},{key:"cone",label:"Cone",color:"#a855f7"},{key:"surface",label:"Surface",color:"#ec4899"}],A=Object.keys(Ve).every(M=>pe[M]===Ve[M]);return e.jsxs("div",{className:"aesthetic-compass",children:[e.jsxs("button",{className:`compass-toggle${Oe?" open":""}`,onClick:()=>he(M=>!M),children:[e.jsx("span",{className:"compass-icon",children:"🧭"}),e.jsx("span",{children:"Aesthetic Compass"}),!A&&e.jsx("span",{className:"compass-active-dot"}),e.jsx("span",{className:"compass-chevron",children:Oe?"▾":"▸"})]}),Oe&&e.jsxs("div",{className:"compass-body",children:[e.jsx("div",{className:"compass-presets",children:r.map(M=>{const ve=Object.keys(M.weights).every(je=>Math.abs(pe[je]-M.weights[je])<.01);return e.jsx("button",{className:`compass-preset-btn${ve?" active":""}`,onClick:()=>He({...M.weights}),title:M.title,children:M.label},M.label)})}),e.jsx("div",{className:"compass-sliders",children:V.map(M=>e.jsxs("div",{className:"compass-slider-row",children:[e.jsx("span",{className:"compass-slider-label",style:{color:M.color},children:M.label}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:pe[M.key],onChange:ve=>He(je=>({...je,[M.key]:Number(ve.target.value)})),className:"compass-slider",style:{"--slider-color":M.color}}),e.jsxs("span",{className:"compass-slider-val",children:[(pe[M.key]*100).toFixed(0),"%"]})]},M.key))}),!A&&e.jsx("button",{className:"compass-reset-btn",onClick:()=>He({...Ve}),children:"Reset to default"})]})]})})(),Ne&&k&&k.nearby.length>0&&e.jsx(aa,{proximityStats:k,glazes:Ze,selectedGlaze:F,pinnedCenterId:ue,hoveredNeighborId:q,explorationPath:we,zAxis:m,onSelectGlaze:Ie,onCompareGlaze:Qe,onHoverNeighbor:oe,onPinCenter:W,onExplorationPathChange:Ce}),e.jsxs("div",{className:"three-d-shortcuts-hint",children:[e.jsx("kbd",{children:"1"}),"–",e.jsx("kbd",{children:"4"})," camera presets   ",e.jsx("kbd",{children:"R"})," rotate   ",e.jsx("kbd",{children:"0"})," reset"]})]})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Zoom"}),e.jsxs("div",{className:"zoom-control",children:[e.jsx("input",{type:"range",min:"0.5",max:"4",step:"0.1",value:h,onChange:r=>v(Number(r.target.value)),"aria-label":`Zoom level: ${h.toFixed(1)}x`}),e.jsxs("span",{className:"zoom-value",children:[h.toFixed(1),"x"]})]}),e.jsx("button",{className:"reset-zoom",onClick:()=>v(1),children:"Reset"})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Limit Formulas"}),e.jsxs("label",{className:"surface-toggle",style:{marginBottom:4},children:[e.jsx("input",{type:"checkbox",checked:b,onChange:r=>w(r.target.checked)}),"Show Limits"]}),b&&e.jsxs("div",{style:{marginTop:4},children:[e.jsxs("label",{style:{fontSize:12,color:"var(--text-secondary)"},children:["Highlight Cone",e.jsxs("select",{value:U,onChange:r=>P(r.target.value),style:{marginLeft:6,fontSize:12},children:[e.jsx("option",{value:"06",children:"Cone 06"}),e.jsx("option",{value:"04",children:"Cone 04"}),e.jsx("option",{value:"6",children:"Cone 6"}),e.jsx("option",{value:"9",children:"Cone 9"}),e.jsx("option",{value:"10",children:"Cone 10"}),e.jsx("option",{value:"11",children:"Cone 11"})]})]}),e.jsx("p",{style:{fontSize:10,color:"var(--text-tertiary)",margin:"4px 0 0",lineHeight:1.3},children:"Safe oxide ranges from Digitalfire & ceramic literature"})]})]}),e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Export"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("button",{className:"reset-zoom",onClick:()=>Ct("png","stull-atlas-chart"),title:"Save chart as a high-res PNG image",children:"📷 Save Image (PNG)"}),e.jsx("button",{className:"reset-zoom",onClick:()=>Ct("svg","stull-atlas-chart"),title:"Save chart as SVG vector graphic",children:"🖼 Save Image (SVG)"}),e.jsx("button",{className:"reset-zoom",onClick:()=>ir("Stull Atlas"),title:"Print or save as PDF",children:"🖨 Print / PDF"}),x&&ae&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{borderTop:"1px solid var(--border)",margin:"4px 0",paddingTop:4},children:e.jsx("span",{style:{fontSize:10,color:"var(--text-tertiary)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em"},children:"3D Surface"})}),e.jsx("button",{className:"reset-zoom",onClick:()=>lr(ae,{zLabel:ze(m),scatterPoints:T}),title:"Export surface mesh as OBJ — opens in Blender, MeshLab, etc.",children:"🧊 Surface Mesh (OBJ)"}),e.jsx("button",{className:"reset-zoom",onClick:()=>cr(ae),title:"Export surface mesh as STL — for 3D printing or CAD tools",children:"🔺 Surface Mesh (STL)"}),e.jsx("button",{className:"reset-zoom",onClick:()=>dr(T,{zLabel:ze(m)}),title:"Export glaze scatter points as CSV with 3D coordinates",children:"📊 3D Points (CSV)"})]})]})]}),e.jsx(Dr,{}),e.jsx($r,{}),e.jsx(yr,{}),lt&&e.jsxs("div",{className:"control-group",children:[e.jsx("h3",{children:"Overlays"}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,fontSize:13,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:ct,onChange:r=>a(r.target.checked)}),"Density Heatmap"]})]})]}),e.jsxs("main",{className:"plot-container","aria-label":"Stull chart visualization",children:[t.active&&e.jsxs("div",{className:"kiosk-overlay",children:[e.jsxs("div",{className:"kiosk-brand",children:[e.jsx("span",{className:"kiosk-title",children:"Stull Atlas"}),e.jsx("span",{className:"kiosk-tagline",children:"Ceramic chemistry in three dimensions"})]}),e.jsx("div",{className:"kiosk-hint",children:"stullatlas.com"})]}),x?e.jsx(n.Suspense,{fallback:e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",flex:1,color:"var(--text-secondary)",fontSize:14},children:"Loading 3D view..."}),children:e.jsx(la,{zAxis:m,colorBy:f,zoom:h,highlightPointIds:nt,highlightCircle:Je,showSurface:I,surfaceOpacity:H,showPrediction:ce,cameraPreset:K,perspective:L,lightPosition:l?Y:void 0,onSurfaceGridReady:Ye,autoRotate:$,autoRotateSpeed:ne,pointSize:be,zStretch:me,proximityRadius:Ne&&F?Fe:null,proximityCenterId:ue,proximityWeights:pe,hoveredNeighborId:q,onProximityStats:ee,onResetCamera:De,kioskMode:t.active},Ae)}):e.jsx(Nr,{xAxis:i,yAxis:c,colorBy:f,zoom:h,highlightPointIds:nt,highlightCircle:Je,densityMap:ct?lt:null,showLimits:b,limitCone:b?U:null})]}),Ge&&!t.active&&e.jsxs("aside",{className:"detail-panel","aria-label":"Glaze details",children:[e.jsx("button",{className:"close-sidebar",onClick:Xe,"aria-label":"Close sidebar",children:"×"}),e.jsxs("div",{className:"sidebar-tabs",role:"tablist","aria-label":"Detail panel views",children:[e.jsx("button",{className:`sidebar-tab ${ke==="detail"?"active":""}`,onClick:()=>$e("detail"),role:"tab","aria-selected":ke==="detail",children:"Detail"}),e.jsxs("button",{className:`sidebar-tab ${ke==="compare"?"active":""}`,onClick:()=>$e("compare"),role:"tab","aria-selected":ke==="compare",children:["Compare",Te.length>0?` (${Te.length})`:""]}),e.jsx("button",{className:`sidebar-tab ${ke==="analysis"?"active":""}`,onClick:()=>$e("analysis"),role:"tab","aria-selected":ke==="analysis",children:"Analysis"})]}),ke==="detail"&&e.jsx(e.Fragment,{children:F?e.jsxs("div",{className:"glaze-detail",role:"tabpanel","aria-label":"Selected glaze details",children:[e.jsxs("div",{className:"sr-only","aria-live":"polite",children:["Selected: ",F.name,", Cone ",F.coneRange[0]," to ",F.coneRange[1],", ",F.surfaceType," surface"]}),e.jsx("h2",{children:F.name}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8},children:e.jsx(xr,{glazeTypeId:F.glazeTypeId,showParent:!0})}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Source"}),e.jsx("p",{children:F.source}),F.sourceUrl&&e.jsx("a",{href:F.sourceUrl,target:"_blank",rel:"noopener noreferrer",children:"View original →"}),F.id.startsWith("glazy_")&&e.jsx("a",{href:`https://glazy.org/recipes/${F.id.replace("glazy_","")}`,target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:4,fontSize:12,marginTop:4},children:"View on Glazy →"})]}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Firing"}),e.jsx(hr,{coneRange:F.coneRange}),F.atmosphere!=="unknown"&&e.jsx("p",{style:{margin:"4px 0 0",fontSize:12,color:"var(--text-label)"},children:F.atmosphere})]}),(()=>{var A,M;const r=F.umf;if(!r)return null;const V=[{label:"Fluxes (R₂O)",oxides:["Li2O","Na2O","K2O"]},{label:"Fluxes (RO)",oxides:["CaO","MgO","ZnO","BaO","SrO"]},{label:"Stabilizers",oxides:["Al2O3","B2O3","Fe2O3"]},{label:"Glass Formers",oxides:["SiO2","TiO2","ZrO2"]}];return e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"UMF"}),e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-start",marginBottom:8},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6,alignItems:"center"},children:[e.jsx(Ut,{umf:r,size:56}),e.jsx(br,{x:((A=r.SiO2)==null?void 0:A.value)??0,y:((M=r.Al2O3)==null?void 0:M.value)??0,size:56})]}),e.jsxs("div",{style:{flex:1},children:[e.jsx(Bt,{umf:r,showLabels:!0,width:160}),e.jsx(or,{umf:r,size:130})]})]}),e.jsx("table",{className:"recipe-table",style:{fontSize:12},children:e.jsxs("tbody",{children:[V.map(ve=>{const je=ve.oxides.filter(Se=>{var re;return(((re=r[Se])==null?void 0:re.value)??0)>.001}).map(Se=>{var re;return{ox:Se,val:((re=r[Se])==null?void 0:re.value)??0}});return je.length===0?null:e.jsxs(wt.Fragment,{children:[e.jsx("tr",{children:e.jsx("td",{colSpan:2,style:{color:"var(--text-muted)",fontSize:11,paddingTop:6},children:ve.label})}),je.map(({ox:Se,val:re})=>e.jsxs("tr",{children:[e.jsx(sr,{oxide:Se}),e.jsx("td",{className:"amount",children:re.toFixed(3)})]},Se))]},ve.label)}),r._meta&&e.jsxs(e.Fragment,{children:[e.jsx("tr",{children:e.jsx("td",{colSpan:2,style:{color:"var(--text-muted)",fontSize:11,paddingTop:6},children:"Ratios"})}),e.jsxs("tr",{children:[e.jsx("td",{children:"Si:Al"}),e.jsx("td",{className:"amount",children:r._meta.SiO2_Al2O3_ratio.toFixed(2)})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"R₂O:RO"}),e.jsx("td",{className:"amount",children:r._meta.R2O_RO_ratio.toFixed(2)})]})]})]})})]})})(),F.images&&F.images.length>0&&e.jsx(sa,{images:F.images,glazeName:F.name,sidebarTab:ke}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Recipe"}),F.ingredients.length>0?e.jsxs(e.Fragment,{children:[e.jsx(fr,{ingredients:F.ingredients}),e.jsx("table",{className:"recipe-table",style:{marginTop:6},children:e.jsx("tbody",{children:F.ingredients.map((r,V)=>e.jsxs("tr",{children:[e.jsx("td",{children:r.material}),e.jsx("td",{className:"amount",children:r.amount})]},V))})})]}):e.jsx("p",{style:{color:"var(--text-muted)",fontSize:12,margin:0},children:"No recipe data available"})]}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Similar Glazes"}),e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:8},children:[e.jsx("select",{value:E,onChange:r=>X(Number(r.target.value)),style:{width:70,background:"var(--bg-tertiary)",border:"1px solid var(--border-primary)",borderRadius:6,color:"var(--text-label)",fontSize:12,padding:"4px 6px"},children:[3,6,9,12].map(r=>e.jsx("option",{value:r,children:r},r))}),e.jsx("button",{onClick:ie,style:{background:"var(--bg-tertiary)",border:"1px solid var(--border-primary)",borderRadius:6,color:"var(--text-label)",fontSize:12,padding:"4px 8px",cursor:"pointer"},children:"Reset"})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6,marginBottom:10},children:le.map(r=>e.jsxs("label",{style:{display:"grid",gridTemplateColumns:"58px 1fr 40px",alignItems:"center",gap:8,fontSize:12,color:"var(--text-label)"},children:[e.jsx("span",{children:r}),e.jsx("input",{type:"range",min:"0",max:"3",step:"0.25",value:j[r]??1,onChange:V=>se(r,Number(V.target.value))}),e.jsx("span",{style:{color:"var(--text-muted)",textAlign:"right"},children:(j[r]??1).toFixed(2)})]},r))}),z.length>0?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6},children:z.map(({glaze:r,dist:V},A)=>e.jsxs("button",{onClick:()=>Ie(r),style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 8px",background:"var(--bg-tertiary)",border:"1px solid var(--border-primary)",borderRadius:6,color:"var(--text-label)",fontSize:12,cursor:"pointer"},children:[e.jsx("span",{style:{textAlign:"left"},children:r.name}),e.jsx("span",{style:{color:"var(--text-muted)"},children:V.toFixed(2)})]},r.id))}):e.jsx("p",{style:{color:"var(--text-muted)",fontSize:12,margin:0},children:"No similar matches found"})]}),F.notes&&e.jsxs("div",{className:"detail-section",children:[e.jsx("h4",{children:"Notes"}),e.jsx("p",{children:F.notes})]}),e.jsx("button",{className:"add-compare-btn",onClick:()=>Qe(F),disabled:Te.length>=3||Te.some(r=>r.id===F.id),title:Te.some(r=>r.id===F.id)?"Already in comparison":Te.length>=3?"Max 3 glazes":"Add to comparison",children:Te.some(r=>r.id===F.id)?"✓ In Compare":"+ Add to Compare"})]}):e.jsx("div",{className:"no-selection",children:e.jsx("p",{children:"Click a point to see glaze details"})})}),ke==="compare"&&e.jsx(n.Suspense,{fallback:e.jsx("div",{style:{padding:16,fontSize:13,color:"var(--text-secondary)"},children:"Loading compare..."}),children:e.jsx(ca,{glazes:Te,onRemove:rt,onClear:at,onSelect:Ie})}),ke==="analysis"&&e.jsx(n.Suspense,{fallback:e.jsx("div",{style:{padding:16,fontSize:13,color:"var(--text-secondary)"},children:"Loading analysis..."}),children:e.jsx(da,{onHighlightCluster:it,onHighlightVoid:ft,onDensityMap:s})})]}),e.jsx("style",{children:ia})]})}function Dt(){pr("Explorer");const{isLoading:t,loadError:i,retry:o}=rr();return i?e.jsxs("div",{style:{display:"flex",flex:1,alignItems:"center",justifyContent:"center",background:"var(--bg-primary)",color:"var(--text-primary)",flexDirection:"column",gap:16,padding:40},children:[e.jsx("div",{style:{fontSize:48,opacity:.3},children:"⚗"}),e.jsx("h2",{style:{margin:0,fontSize:18},children:"Failed to load glaze dataset"}),e.jsx("p",{style:{color:"var(--text-secondary)",fontSize:14,maxWidth:400,textAlign:"center",margin:0},children:i}),e.jsx("button",{onClick:o,style:{padding:"8px 20px",background:"var(--accent-bg)",border:"1px solid var(--accent)",borderRadius:6,color:"var(--text-bright)",fontSize:14,cursor:"pointer"},children:"Retry"})]}):t?e.jsxs("div",{style:{display:"flex",flex:1,alignItems:"center",justifyContent:"center",background:"var(--bg-primary)",color:"var(--text-secondary)",flexDirection:"column",gap:16},children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{style:{fontSize:14},children:"Loading glaze dataset…"}),e.jsx("style",{children:`
          .loading-spinner {
            width: 40px; height: 40px;
            border: 3px solid var(--border-primary);
            border-top-color: var(--accent);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg) } }
        `})]}):e.jsx(pa,{})}const ka=Object.freeze(Object.defineProperty({__proto__:null,ExplorerPage:Dt,default:Dt},Symbol.toStringTag,{value:"Module"}));export{hr as C,ka as E,xr as G};
