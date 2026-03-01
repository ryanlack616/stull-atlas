const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-ciw763aw.js","assets/glazeService-D-m3Bc_x.js","assets/umf-Bef8OHIG.js","assets/glazySearch-CBQEdmqG.js","assets/vendor-react-D0vdeqNS.js","assets/vendor-state-DTYbmM1J.js","assets/vendor-router-DjLFn5nj.js","assets/domain-digitalfire-DfgmtSpv.js","assets/data-digitalfire-CCT-bSzB.js","assets/index-BuGgJ8RX.js","assets/CalculatorsPage-U5uPHD_d.js","assets/usePageTitle-Dfez-EUD.js","assets/calc-styles-u5C4IXOP.js","assets/UMFCalculatorPage-DrY3OWiy.js","assets/index-C6l8ZLGi.js","assets/OxideLink-Ckb8-Aqr.js","assets/validation-D1rEx81t.js","assets/export-BXZ-GFcd.js","assets/OxideRadar-CqX15nAb.js","assets/LineBlendPage-CwVTmu9x.js","assets/simplex-I_iDn5AG.js","assets/blend-xGiHwjeo.js","assets/TriaxialBlendPage-BPxNLYCN.js","assets/QuadaxialBlendPage-b_gHUVnZ.js","assets/BiaxialBlendPage-CTcHMG94.js","assets/RadialBlendPage-CmTW1DAJ.js","assets/FluxTriaxialPage-BllPN59K.js","assets/factory-BujE-kDv.js","assets/SpaceFillingPage-BJyrKzuk.js","assets/MaterialsPage-Cr-BVHmU.js","assets/ImportExportPage-C4yCmJHF.js","assets/AboutPage-CZvBZv16.js","assets/featureFlags-DeKxyuZW.js","assets/GuidePage-CpllZBbi.js","assets/OptimizerPage-CSztBC1D.js","assets/geneticOptimizer-D0tKq7l0.js","assets/UpdatesPage-0FJ3HTBm.js","assets/SuggestionPage-3PotdOhr.js","assets/PricingPage-BjlPSKJm.js","assets/AuthModal-CkmXedy_.js","assets/NCECAPage-E8FdKgdH.js","assets/VariabilityPage-633p4FGM.js","assets/ExplorerPage-CVvnvK-5.js","assets/HenryPage-DNZbwaRE.js","assets/MarksPage-BFwyGYqX.js","assets/NotFoundPage-BH3INFa1.js"])))=>i.map(i=>d[i]);
var Ae=Object.defineProperty;var Ie=(e,a,t)=>a in e?Ae(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t;var A=(e,a,t)=>Ie(e,typeof a!="symbol"?a+"":a,t);import{r as d,j as i,c as Pe,R as Ne}from"./vendor-react-D0vdeqNS.js";import{c as P,i as Ee,e as je}from"./vendor-state-DTYbmM1J.js";import{u as Me,a as Te,N,O as ze,R as Fe,b as O,H as Re}from"./vendor-router-DjLFn5nj.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();const Le="modulepreload",Be=function(e){return"/"+e},ne={},f=function(a,t,r){let n=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),l=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));n=Promise.allSettled(t.map(c=>{if(c=Be(c),c in ne)return;ne[c]=!0;const u=c.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${h}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":Le,u||(p.as="script"),p.crossOrigin="",p.href=c,l&&p.setAttribute("nonce",l),document.head.appendChild(p),u)return new Promise((y,m)=>{p.addEventListener("load",y),p.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return n.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return a().catch(o)})};function ue(e){if(typeof e=="number")return e;if(!e||e==="?")return null;const a=String(e).trim();if(!a)return null;if(/^0\d+$/.test(a))return-parseInt(a,10);const t=parseInt(a,10);return isNaN(t)?null:t}function Ct(e){return ue(e)??0}function pe(e){return e==null?"?":e<0?"0"+Math.abs(e):String(e)}const _t=["06","05","04","03","02","01","0","1","2","3","4","5","6","7","8","9","10","11","12","13"],De=[-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13],St=De.map(e=>pe(e)),We=[{set_id:"stull_1912",name:"Stull 1912 Era (International Committee)",year:1912,source:"International Committee on Atomic Weights",authority:"primary_historical",standard:"O = 16",status:"to_be_reconstructed",url:"https://ciaaw.org/historical-atomic-weights.htm",notes:"Atomic weights used by R.T. Stull in his original glaze research. Based on O=16 standard. Values approximate - need reconstruction from 1912 Int'l Committee report.",significance:"Foundation of systematic glaze chemistry - essential for reproducing historical glazes",elements:{},oxides:{},reconstruction_priority:"HIGH"},{set_id:"iupac_1961",name:"IUPAC 1961 (First C-12 Standard)",year:1961,source:"IUPAC Commission on Atomic Weights",authority:"primary",standard:"C-12 = 12",status:"to_be_added",notes:"Historic milestone - first atomic weights based on Carbon-12 = 12 standard (switched from O=16). All values from prior years need conversion.",significance:"Major transition point - essential for understanding mid-20th century ceramics literature",elements:{},oxides:{},reconstruction_priority:"HIGH"},{set_id:"parmelee_1973",name:"Parmelee 'Ceramic Glazes' (1973, 3rd Edition)",year:1973,source:"Cullen W. Parmelee textbook",authority:"ceramics_reference",status:"to_be_extracted",notes:"Classic American ceramics textbook. Widely used baseline for American potters. Uses IUPAC values from late 1960s / early 1970s.",significance:"Historical baseline for traditional American studio pottery",elements:{},oxides:{},reconstruction_priority:"HIGH"},{set_id:"iupac_1993",name:"IUPAC 1993 Standard Atomic Weights",year:1993,source:"IUPAC Commission on Isotopic Abundances and Atomic Weights",authority:"primary",standard:"C-12 = 12",status:"available_from_iupac",url:"https://iupac.qmul.ac.uk/AtWt/AtWt93.html",notes:"Early 90s baseline for digital era ceramics",elements:{},oxides:{}},{set_id:"iupac_1995",name:"IUPAC 1995 Standard Atomic Weights",year:1995,source:"IUPAC CIAAW",authority:"primary",standard:"C-12 = 12",status:"available_from_iupac",url:"https://iupac.qmul.ac.uk/AtWt/AtWt95.html",publication:"Pure Appl. Chem. 68, 2339-2359 (1996)",elements:{},oxides:{}},{set_id:"iupac_1997",name:"IUPAC 1997 Standard Atomic Weights",year:1997,source:"IUPAC CIAAW",authority:"primary",standard:"C-12 = 12",status:"available_from_iupac",url:"https://iupac.qmul.ac.uk/AtWt/AtWt97.html",publication:"Pure Appl. Chem. 71, 1593-1607 (1999)",elements:{},oxides:{}},{set_id:"iupac_1999",name:"IUPAC 1999 Standard Atomic Weights",year:1999,source:"IUPAC CIAAW",authority:"primary",standard:"C-12 = 12",status:"available_from_iupac",url:"https://iupac.qmul.ac.uk/AtWt/AtWt99.html",publication:"Pure Appl. Chem. 73, 667-683 (2001)",elements:{},oxides:{}},{set_id:"iupac_2001",name:"IUPAC 2001 Standard Atomic Weights",year:2001,source:"IUPAC CIAAW",authority:"primary",standard:"C-12 = 12",status:"available_from_iupac",url:"https://iupac.qmul.ac.uk/AtWt/AtWt01.html",publication:"Pure Appl. Chem. 75, 1107-1122 (2003)",notes:"Early digital era - likely used by early DigitalFire versions",elements:{},oxides:{}},{set_id:"crc_2003",name:"CRC Handbook 84th Edition (2003-2004)",year:2003,source:"CRC Handbook of Chemistry and Physics",authority:"reference",standard:"C-12 = 12",status:"populated",url:"https://pubs.acs.org/doi/10.1021/ja0336372",notes:"American chemical reference standard, widely used in US universities and ceramics programs. Different rounding conventions than IUPAC.",significance:"Common baseline for American ceramics education",elements:{},oxides:{Al2O3:101.961,B2O3:69.62,BaO:153.326,BeO:25.011,CaO:56.077,CdO:128.41,CoO:74.932,Cr2O3:151.99,Cu2O:143.091,CuO:79.545,Fe2O3:159.688,FeO:71.844,K2O:94.196,Li2O:29.881,MgO:40.304,MnO:70.937,MnO2:86.937,Na2O:61.979,NiO:74.692,P2O5:141.945,PbO:223.2,SiO2:60.085,SnO2:150.709,SrO:103.62,TiO2:79.866,V2O5:181.88,ZnO:81.39,ZrO2:123.223}},{set_id:"hamer_hamer_2004",name:"The Potter's Dictionary (Hamer & Hamer, 2004)",year:2004,source:"Frank and Janet Hamer",authority:"ceramics_reference",status:"to_be_extracted",notes:"Authoritative British ceramics reference. Likely uses IUPAC late 1990s / early 2000s values",significance:"International ceramics authority - British perspective",elements:{},oxides:{},reconstruction_priority:"HIGH"},{set_id:"iupac_2005",name:"IUPAC 2005 Standard Atomic Weights",year:2005,source:"IUPAC CIAAW",authority:"primary",standard:"C-12 = 12",status:"available_from_iupac",url:"https://iupac.qmul.ac.uk/AtWt/AtWt05.html",publication:"Pure Appl. Chem. 78, 2051-2066 (2006)",elements:{},oxides:{}},{set_id:"iupac_2007",name:"IUPAC 2007 Standard Atomic Weights",year:2007,source:"IUPAC CIAAW",authority:"primary",standard:"C-12 = 12",status:"available_from_iupac",url:"https://iupac.qmul.ac.uk/AtWt/AtWt07.html",publication:"Pure Appl. Chem. 81, 2131-2156 (2009)",notes:"Last revision of Lutetium until 2024",elements:{},oxides:{}},{set_id:"iupac_2009",name:"IUPAC 2009 Standard Atomic Weights (Interval Notation Introduced)",year:2009,source:"IUPAC CIAAW",authority:"primary",standard:"C-12 = 12 (with intervals)",status:"available_from_iupac",url:"https://iupac.qmul.ac.uk/AtWt/AtWt09.html",publication:"Pure Appl. Chem. 83, 359-396 (2011)",notes:"PARADIGM SHIFT: Introduced interval notation for 10 elements with variable isotopic composition",significance:"Revolutionary change - recognized natural variation in atomic weights",interval_elements_introduced:["H","Li","B","C","N","O","Si","S","Cl","Tl"],example:"Lithium changed from 6.941±0.002 to [6.938, 6.997]",elements:{},oxides:{},reconstruction_priority:"CRITICAL"},{set_id:"iupac_2011",name:"IUPAC 2011 Standard Atomic Weights",year:2011,source:"IUPAC CIAAW",authority:"primary",standard:"C-12 = 12 (with intervals)",status:"available_from_iupac",url:"https://iupac.qmul.ac.uk/AtWt/AtWt11.html",publication:"Pure Appl. Chem. 85, 1047-1078 (2013)",notes:"Expanded interval notation - added Br (Bromine) and Mg (Magnesium) to interval list",elements:{},oxides:{}},{set_id:"iupac_2013",name:"IUPAC 2013 Standard Atomic Weights",year:2013,source:"IUPAC CIAAW",authority:"primary",standard:"C-12 = 12 (with intervals)",status:"available_from_iupac",url:"https://iupac.qmul.ac.uk/AtWt/AtWt13.html",publication:"Pure Appl. Chem. 88, 265-291 (2016)",notes:"Major revision: Br, Mg, Ge, In, Hg changes. Yb: 173.054(5) → 173.045(10)",elements:{},oxides:{},reconstruction_priority:"HIGH"},{set_id:"iupac_2015",name:"IUPAC 2015 Standard Atomic Weights",year:2015,source:"IUPAC CIAAW",authority:"primary",standard:"C-12 = 12 (with intervals)",status:"available_from_iupac",url:"https://iupac.qmul.ac.uk/AtWt/AtWt15.html",notes:"Ytterbium revision",elements:{},oxides:{}},{set_id:"iupac_2019",name:"IUPAC 2019 Standard Atomic Weights",year:2019,source:"IUPAC CIAAW",authority:"primary",standard:"C-12 = 12 (with intervals)",status:"available_from_iupac",url:"https://iupac.qmul.ac.uk/AtWt/AtWt19.html",notes:"Multiple element revisions",elements:{},oxides:{}},{set_id:"iupac_2021",name:"IUPAC 2021 Standard Atomic Weights",year:2021,source:"IUPAC Commission on Isotopic Abundances and Atomic Weights",authority:"primary",standard:"C-12 = 12 (with intervals)",status:"populated",url:"https://iupac.qmul.ac.uk/AtWt/AtWt21.html",publication:"Pure Appl. Chem. 94, 573-600 (2022)",notes:"Major changes: Ar and Pb changed to intervals. Hf, Ir, Yb revised. Predecessor to 2023.",major_changes:{Ar:"Changed to interval [39.792, 39.963]",Pb:"Changed to interval [206.14, 207.94]",Hf:"178.49±0.02 → 178.486±0.006",Ir:"Uncertainty reduced",Yb:"173.054±0.005 → 173.045±0.010"},elements:{H:1.008,Li:6.94,B:10.81,C:12.011,N:14.007,O:15.999,F:18.998403162,Na:22.98976928,Mg:24.305,Al:26.9815384,Si:28.085,P:30.973761998,S:32.06,K:39.0983,Ca:40.078,Ti:47.867,V:50.9415,Cr:51.9961,Mn:54.938043,Fe:55.845,Co:58.933194,Ni:58.6934,Cu:63.546,Zn:65.38,As:74.921595,Sr:87.62,Zr:91.224,Mo:95.95,Ag:107.8682,Cd:112.414,Sn:118.71,Sb:121.76,Ba:137.327,La:138.90547,Ce:140.116,Pr:140.90766,Nd:144.242,Sm:150.36,Gd:157.25,Dy:162.5,Er:167.259,Yb:173.045,Lu:174.9668,Hf:178.486,Ta:180.94788,W:183.84,Pb:207.2,Bi:208.9804,Th:232.0377,U:238.02891},oxides:{SiO2:60.083,Al2O3:101.9601,Fe2O3:159.687,FeO:71.844,CaO:56.077,MgO:40.304,K2O:94.1956,Na2O:61.9785,TiO2:79.865,P2O5:141.9425,MnO:70.937,MnO2:86.936,ZnO:81.379,Li2O:29.879,BaO:153.326,SrO:103.619,CoO:74.9322,Co2O3:165.8634,Co3O4:240.7956,NiO:74.6924,Cr2O3:151.9892,CuO:79.545,Cu2O:143.091,ZrO2:123.222,V2O5:181.878,B2O3:69.617,PbO:223.199,SnO2:150.708,Sb2O3:291.517,CdO:128.413,As2O3:197.8402,HfO2:210.484,La2O3:325.8079,CeO2:172.114,Pr2O3:329.8123,Nd2O3:336.481,Ta2O5:441.8908,WO3:231.837,MoO3:143.947,Bi2O3:465.9578,ThO2:264.0357,UO2:270.0269,U3O8:842.0787}},{set_id:"iupac_2023",name:"IUPAC 2023 Standard Atomic Weights (Current)",year:2023,source:"IUPAC Commission on Isotopic Abundances and Atomic Weights",authority:"primary",standard:"C-12 = 12 (with intervals)",status:"populated",url:"https://iupac.qmul.ac.uk/AtWt/",notes:"Current international standard. Based on 2021 with 2024 revisions for Gd, Lu, Zr",latest_revisions_2024:{Gd:{old:157.25,new:157.249,last_revised_before:1969,note:"Not updated for 55 years!"},Lu:{old:174.9668,new:174.96669,last_revised_before:2007,note:"Improved precision"},Zr:{old:91.224,new:91.222,last_revised_before:1983,note:"Not updated for 41 years! Affects ZrO₂ in ceramics"}},elements:{H:1.008,Li:6.94,B:10.81,C:12.011,N:14.007,O:15.999,F:18.998403162,Na:22.98976928,Mg:24.305,Al:26.9815384,Si:28.085,P:30.973761998,S:32.06,K:39.0983,Ca:40.078,Ti:47.867,V:50.9415,Cr:51.9961,Mn:54.938043,Fe:55.845,Co:58.933194,Ni:58.6934,Cu:63.546,Zn:65.38,As:74.921595,Sr:87.62,Zr:91.222,Mo:95.95,Ag:107.8682,Cd:112.414,Sn:118.71,Sb:121.76,Ba:137.327,La:138.90547,Ce:140.116,Pr:140.90766,Nd:144.242,Sm:150.36,Gd:157.249,Dy:162.5,Er:167.259,Yb:173.045,Lu:174.96669,Hf:178.486,Ta:180.94788,W:183.84,Pb:207.2,Bi:208.9804,Th:232.0377,U:238.02891},oxides:{SiO2:60.083,Al2O3:101.9601,Fe2O3:159.687,FeO:71.844,CaO:56.077,MgO:40.304,K2O:94.1956,Na2O:61.9785,TiO2:79.865,P2O5:141.9425,MnO:70.937,MnO2:86.936,ZnO:81.379,Li2O:29.879,BaO:153.326,SrO:103.619,CoO:74.9322,Co2O3:165.8634,Co3O4:240.7956,NiO:74.6924,Cr2O3:151.9892,CuO:79.545,Cu2O:143.091,ZrO2:123.22,V2O5:181.878,B2O3:69.617,PbO:223.199,SnO2:150.708,Sb2O3:291.517,CdO:128.413,As2O3:197.8402,HfO2:210.484,La2O3:325.8079,CeO2:172.114,Pr2O3:329.8123,Nd2O3:336.481,Ta2O5:441.8908,WO3:231.837,MoO3:143.947,Bi2O3:465.9578,ThO2:264.0357,UO2:270.0269,U3O8:842.0787}},{set_id:"glazy_current",name:"Glazy.org v1 (2024)",year:2024,source:"Glazy.org / Derek Au",authority:"industry",standard:"C-12 = 12",status:"populated",url:"https://glazy.org",notes:"Mix of PubChem and CRC Handbook 2003-2004 values with high precision (5+ decimals). Used in popular Glazy ceramics database.",comparison_sources:["PubChem","CRC Handbook 84th Ed"],precision:"5+ decimal places",elements:{},oxides:{Al2O3:101.96137,B2O3:69.6217,BaO:153.3271,BeO:25.01158,CaO:56.0778,CdO:128.4104,CoO:74.93263,Cr2O3:151.99061,Cu2O:143.0914,CuO:79.5454,Fe2O3:159.6887,FeO:71.8446,K2O:94.19605,Li2O:29.8818,MgO:40.30449,MnO:70.93748,MnO2:86.93691,Na2O:61.97897,NiO:74.69287,P2O5:141.94467,PbO:223.2094,SiO2:60.08439,SnO2:150.7096,SrO:103.6204,TiO2:79.866,V2O5:181.88,ZnO:81.3814,ZrO:107.2234,ZrO2:123.2231}},{set_id:"digitalfire_current",name:"DigitalFire / Insight-live (Tony Hansen)",year:2024,source:"DigitalFire / Tony Hansen",authority:"industry",status:"populated",url:"https://digitalfire.com",notes:"Extracted from DigitalFire 7,730-page database (Feb 2026). Industry-standard values used by Insight-live glaze software. Based on IUPAC 1990s-2000s era values with practical rounding. 11 oxides extracted directly from pure-material Oxide Weight fields; Fe2O3 from comparison table; remaining reconstructed via DigitalFire rounding convention. Contains confirmed FeO error (81.8 vs correct 71.844).",extraction_source:"Ryan's DigitalFire database (7,730 pages) - single-oxide material pages",extraction_date:"2026-02-09",significance:"Major computational ceramics authority - Tony Hansen is leading figure in field",rounding_pattern:"Practical rounding to 1-2 decimals, tendency toward simpler numbers",known_discrepancies:{FeO:{digitalfire_value:81.8,correct_value:71.844,difference:9.956,percent_error:13.86,note:"Confirmed data entry error - all other sources agree on ~71.844"}},data_provenance:{direct_from_db:["SiO2","Al2O3","MgO","ZnO","TiO2","SnO2","MnO2","CuO","Cr2O3"],from_comparison_table:["Fe2O3","ZrO2"],known_error_preserved:["FeO"],reconstructed_via_rounding:["Li2O","Na2O","K2O","CaO","SrO","BaO","PbO","B2O3","MnO","NiO","Cu2O","CoO","P2O5","F"]},elements:{},oxides:{SiO2:60.1,Al2O3:102,Fe2O3:160,FeO:81.8,CaO:56.1,MgO:40.3,K2O:94.2,Na2O:62,TiO2:79.9,P2O5:141.94,MnO:70.94,MnO2:86.9,ZnO:81.4,Li2O:29.9,BaO:153.33,SrO:103.62,CoO:74.93,NiO:74.7,Cr2O3:152,CuO:79.54,Cu2O:143.1,ZrO2:123.22,B2O3:69.62,PbO:223.2,SnO2:150.71,V2O5:181.88,F:19}},{set_id:"pubchem_current",name:"PubChem (NIST)",year:2024,source:"PubChem / National Institute of Standards and Technology",authority:"reference",standard:"C-12 = 12",status:"documented",url:"https://pubchem.ncbi.nlm.nih.gov",notes:"US NIST free online database. Generally matches IUPAC but with different precision. Documented in Glazy comparison table.",elements:{},oxides:{}}],Ue={molar_weight_sets:We},U=["Li2O","Na2O","K2O","MgO","CaO","SrO","BaO","ZnO","PbO","Al2O3","B2O3","Fe2O3","SiO2","TiO2","ZrO2","SnO2","MnO","MnO2","NiO","CuO","Cu2O","CoO","Cr2O3","P2O5","F"],K={Li2O:29.879,Na2O:61.9785,K2O:94.1956,MgO:40.304,CaO:56.077,SrO:103.619,BaO:153.326,ZnO:81.379,PbO:223.199,Al2O3:101.9601,B2O3:69.617,Fe2O3:159.687,SiO2:60.083,TiO2:79.865,ZrO2:123.22,SnO2:150.708,MnO:70.937,MnO2:86.936,NiO:74.6924,CuO:79.545,Cu2O:143.091,CoO:74.9322,Cr2O3:151.9892,P2O5:141.9425,F:18.998},Ge=Ue.molar_weight_sets,Q=Ge.filter(e=>e.status==="populated"&&Object.keys(e.oxides).length>0);function Ke(e){const a={...K};for(const t of U)t in e&&(a[t]=e[t]);return a}const ee=new Map;ee.set("app_default",K);for(const e of Q){const a=e.set_id;ee.set(a,Ke(e.oxides))}function He(){const e=[{id:"app_default",name:"IUPAC 2023 (Standard)",year:2023,source:"IUPAC",authority:"IUPAC",notes:"IUPAC 2023 Standard Atomic Weights with 2024 revisions — current international standard",oxideCount:U.length}];for(const a of Q)e.push({id:a.set_id,name:a.name,year:a.year,source:a.source,authority:a.authority,notes:a.notes??"",oxideCount:Object.keys(a.oxides).length});return e}function $(e){const a=ee.get(e);return a||K}function Ze(){return K}function qe(){return["app_default",...Q.map(e=>e.set_id)]}function Ve(e,a,t){if(a===t)return e;const r=$(a),n=$(t),o={};for(const c of U){const u=e[c];!u||u.value===0||(o[c]=u.value*(r[c]/n[c]))}let s=0;for(const c of Ye)s+=o[c]??0;s===0&&(s=1);const l={};for(const c of U){const u=e[c];!u||u.value===0||(l[c]={...u,value:(o[c]??0)/s})}return l}const Ye=["Li2O","Na2O","K2O","MgO","CaO","SrO","BaO","ZnO","PbO"],se={glazes:new Map,isLoading:!1,loadError:null,_version:0,stats:{total:0,bySource:{},byCone:{}}};let I=null;const E=new Map,z=P()(Ee((e,a)=>({...se,loadGlazes:t=>e(r=>{for(const n of t)r.glazes.set(n.id,n);r._version++,H(r)}),addGlaze:t=>e(r=>{r.glazes.set(t.id,t),r._version++,H(r)}),removeGlaze:t=>e(r=>{r.glazes.delete(t),r._version++,H(r)}),updateGlaze:(t,r)=>e(n=>{const o=n.glazes.get(t);o&&(n.glazes.set(t,{...o,...r}),n._version++)}),getGlazesArray:()=>Array.from(a().glazes.values()),getPlotPoints:t=>{const r=a()._version;if(!t||t==="app_default"){if(I&&I.version===r)return I.points;const c=X(a().getGlazesArray());return I={version:r,points:c},E.set("app_default",{version:r,points:c}),c}const n=E.get(t);if(n&&n.version===r)return n.points;if(!I||I.version!==r){const c=X(a().getGlazesArray());I={version:r,points:c},E.set("app_default",{version:r,points:c})}const o="glazy_current",s=a().getGlazesArray(),l=he(s,o,t);return E.set(t,{version:r,points:l}),l},clear:()=>e(se),setLoading:t=>e(r=>{r.isLoading=t}),setError:t=>e(r=>{r.loadError=t})})));function H(e){const a=Array.from(e.glazes.values());e.stats.total=a.length,e.stats.bySource={};for(const t of a)e.stats.bySource[t.source]=(e.stats.bySource[t.source]||0)+1;e.stats.byCone={};for(const t of a){const r=String(t.coneRange[0]);e.stats.byCone[r]=(e.stats.byCone[r]||0)+1}}function me(e){return e.umf??null}function ge(e,a){var l,c,u,h,p,y,m,C,S,k,j,g;const t=((l=a.SiO2)==null?void 0:l.value)??0,r=((c=a.Al2O3)==null?void 0:c.value)??0,n=(((u=a.Li2O)==null?void 0:u.value)??0)+(((h=a.Na2O)==null?void 0:h.value)??0)+(((p=a.K2O)==null?void 0:p.value)??0),o=(((y=a.MgO)==null?void 0:y.value)??0)+(((m=a.CaO)==null?void 0:m.value)??0)+(((C=a.BaO)==null?void 0:C.value)??0)+(((S=a.SrO)==null?void 0:S.value)??0)+(((k=a.ZnO)==null?void 0:k.value)??0)+(((j=a.PbO)==null?void 0:j.value)??0),s=n+o;return{id:e.id,name:e.name,source:e.source,x:t,y:r,cone:ue(e.coneRange[0]),surfaceType:e.surfaceType,glazeTypeId:e.glazeTypeId??null,fluxRatio:s>.001?n/s:0,boron:((g=a.B2O3)==null?void 0:g.value)??0,confidence:e.umfConfidence}}function X(e){return e.map(a=>{const t=me(a);return t?ge(a,t):null}).filter(a=>a!==null)}function he(e,a,t){return e.map(r=>{const n=me(r);if(!n)return null;const o=Ve(n,a,t);return ge(r,o)}).filter(r=>r!==null)}function $e(){const e=z.getState(),a=e._version,t=e.getGlazesArray(),r=X(t);I={version:a,points:r},E.set("app_default",{version:a,points:r}),E.set("glazy_current",{version:a,points:r});const n="glazy_current";for(const o of qe()){if(o==="app_default"||o==="glazy_current")continue;const s=he(t,n,o);E.set(o,{version:a,points:s})}}const fe=["Li2O","Na2O","K2O"],ye=["MgO","CaO","SrO","BaO","ZnO","PbO"],Xe=[...fe,...ye],Je={R2O:fe,RO:ye},Oe={Li2O:29.879,Na2O:61.9785,K2O:94.1956,MgO:40.304,CaO:56.077,SrO:103.619,BaO:153.326,ZnO:81.379,PbO:223.199,Al2O3:101.9601,B2O3:69.617,Fe2O3:159.687,SiO2:60.083,TiO2:79.865,ZrO2:123.22,SnO2:150.708,MnO:70.937,MnO2:86.936,NiO:74.6924,CuO:79.545,Cu2O:143.091,CoO:74.9322,Cr2O3:151.9892,P2O5:141.9425,F:18.998};let T=Oe;function Qe(e){T=e}const kt=new Proxy(Oe,{get(e,a,t){return a===Symbol.toPrimitive||a===Symbol.iterator?Reflect.get(T,a,t):Reflect.get(T,a)},ownKeys(){return Reflect.ownKeys(T)},getOwnPropertyDescriptor(e,a){return Object.getOwnPropertyDescriptor(T,a)},has(e,a){return a in T}}),At=Je,It=Xe,Pt={umfOxide:2,moles:4},Nt=1e-4;function Et(e,a){const t=Math.pow(10,a);return Math.round(e*t)/t}const ea=P(e=>({currentSetId:"app_default",weights:Ze(),availableSets:He(),setMolarWeightSet:a=>{e({currentSetId:a,weights:$(a)})}}));ea.subscribe(e=>{Qe(e.weights)});const aa=[{set_id:"app_default",name:"Stull Atlas Default",year:2026,source:"Stull Atlas built-in database",authority:"Digitalfire / Tony Hansen (verified)",status:"populated",notes:"Current app defaults. Digitalfire 2024 analyses verified and corrected Feb 2026.",materials:{}},{set_id:"digitalfire_2024",name:"Digitalfire 2024",year:2024,source:"digitalfire.com",authority:"Tony Hansen",status:"populated",notes:"Current Digitalfire Reference Library analyses, cross-checked Feb 2026 via MCP. Corrections applied where our stored values diverged from Digitalfire's current published data.",materials:{epk:{analysis:{SiO2:45.73,Al2O3:37.36,Fe2O3:.79,TiO2:.36,CaO:.18,MgO:.1,K2O:.33,Na2O:.06,P2O5:.24},loi:13.2},redart:{analysis:{SiO2:64.95,Al2O3:15.51,Fe2O3:7.04,K2O:4.15,MgO:1.59,TiO2:1.09,Na2O:.38,CaO:.26,P2O5:.22},loi:4.8},ball_clay:{analysis:{SiO2:59,Al2O3:25,TiO2:1,Fe2O3:.97,K2O:.9,MgO:.29,CaO:.27,Na2O:.4},loi:12},goldart:{analysis:{SiO2:55.2,Al2O3:28.8,K2O:1.9,Fe2O3:1.4,TiO2:1.8,MgO:.4,Na2O:.2,CaO:.2},loi:10},pyrophyllite:{analysis:{SiO2:67.7,Al2O3:28.3},loi:4},red_iron_oxide:{analysis:{Fe2O3:95},loi:5},cobalt_oxide:{analysis:{CoO:93.35},loi:6.65},custer_feldspar:{analysis:{SiO2:68.5,Al2O3:17,K2O:10,Na2O:3.04,CaO:.3,Fe2O3:.08},loi:.3},frit_3134:{analysis:{SiO2:45.56,Al2O3:2,B2O3:22.79,CaO:19.51,Na2O:10.14},loi:0},gerstley_borate:{analysis:{B2O3:26.8,CaO:19.4,SiO2:14.7,Na2O:4.09,MgO:3.5,Al2O3:1.03,K2O:.51,Fe2O3:.34,SrO:1.73,P2O5:.04,TiO2:.03},loi:29.5}}},{set_id:"rhodes_1973",name:"Rhodes (1973)",year:1973,source:"Clay and Glazes for the Potter, 2nd Ed.",authority:"Daniel Rhodes",status:"stub",notes:"THE classic reference. Many potters still formulate from these values. Material analyses reflect 1960s-70s mining and supplier data.",materials:{}},{set_id:"cardew_1969",name:"Cardew (1969)",year:1969,source:"Pioneer Pottery",authority:"Michael Cardew",status:"stub",notes:"Influential stoneware/wood fire reference. Analyses reflect British and West African raw materials of the era.",materials:{}},{set_id:"hamer_1986",name:"Hamer & Hamer (1986)",year:1986,source:"The Potter's Dictionary of Materials and Techniques",authority:"Frank & Janet Hamer",status:"stub",notes:"Comprehensive UK/international reference. Widely used in European ceramics education.",materials:{}},{set_id:"nelson_1984",name:"Nelson (1984)",year:1984,source:"Ceramics: A Potter's Handbook, 5th Ed.",authority:"Glenn C. Nelson",status:"stub",notes:"Standard American university ceramics textbook for decades.",materials:{}},{set_id:"hesselberth_2002",name:"Hesselberth & Roy (2002)",year:2002,source:"Mastering Cone 6 Glazes",authority:"John Hesselberth & Ron Roy",status:"stub",notes:"Modern mid-fire reference. Analyses reflect late 1990s-early 2000s supplier data.",materials:{}},{set_id:"glazy_current",name:"Glazy (current)",year:2024,source:"glazy.org",authority:"Derek Au / Community",status:"stub",notes:"Open-source glaze database. Community-maintained analyses.",materials:{}},{set_id:"insight_legacy",name:"Insight / Foresight (~1995)",year:1995,source:"Digitalfire Insight desktop software",authority:"Tony Hansen",status:"stub",notes:"Tony Hansen's original desktop glaze software. These were the standard digital analyses for the pre-web era.",materials:{}}],ta={analysis_sets:aa},be=ta.analysis_sets,ra=be.filter(e=>e.status==="populated"||e.set_id==="app_default"),ae=new Map;ae.set("app_default",new Map);for(const e of be){if(e.set_id==="app_default"||e.status!=="populated")continue;const a=new Map;for(const[t,r]of Object.entries(e.materials))a.set(t,{analysis:r.analysis,loi:r.loi});ae.set(e.set_id,a)}function ia(){return ra.map(e=>({id:e.set_id,name:e.name,year:e.year,source:e.source,authority:e.authority,status:e.status,notes:e.notes??"",materialCount:Object.keys(e.materials).length}))}function oa(e){return ae.get(e)??new Map}function na(){return"app_default"}const sa=[{id:"kaolin",primaryName:"Kaolin",aliases:["Kaolin (Theoretical)","China Clay","Kaolinite"],category:"clay",analysis:{SiO2:46.54,Al2O3:39.5},loi:13.96},{id:"epk",primaryName:"EPK Kaolin",aliases:["EPK","Edgar Plastic Kaolin","EP Kaolin"],category:"clay",analysis:{SiO2:45.87,Al2O3:37.62,Fe2O3:.81,TiO2:.36,CaO:.18,MgO:.12,K2O:.35,Na2O:.07},loi:13.2},{id:"grolleg_kaolin",primaryName:"Grolleg Kaolin",aliases:["Grolleg","Grolleg China Clay","English China Clay"],category:"clay",analysis:{SiO2:48,Al2O3:37,K2O:1.9,Fe2O3:.7,MgO:.3,CaO:.1,Na2O:.1,TiO2:.03},loi:12.01},{id:"tile6_kaolin",primaryName:"Tile #6 Kaolin",aliases:["Tile 6","Tile #6","Tile6","No. 6 Tile Clay"],category:"clay",analysis:{SiO2:45.25,Al2O3:38.22,TiO2:1.63,Fe2O3:.47,K2O:.28,Na2O:.18,MgO:.12,CaO:.06},loi:13.79},{id:"ball_clay",primaryName:"Ball Clay",aliases:["OM4","Old Mine 4","OM-4"],category:"clay",analysis:{SiO2:59,Al2O3:25,TiO2:1,Fe2O3:.97,K2O:.73,MgO:.29,CaO:.27,Na2O:.26},loi:12},{id:"goldart",primaryName:"Goldart",aliases:["Goldart Stoneware","Gold Art"],category:"clay",analysis:{SiO2:55.2,Al2O3:28.8,K2O:1.9,Fe2O3:1.4,TiO2:1.8,MgO:.6,Na2O:.2,CaO:.4},loi:10},{id:"redart",primaryName:"Redart",aliases:["Red Art","Cedar Heights Redart","Redart Clay"],category:"clay",analysis:{SiO2:64.21,Al2O3:16.42,Fe2O3:7.04,K2O:3.09,MgO:1.36,TiO2:.89,Na2O:.61,CaO:.23},loi:6.15},{id:"bentonite",primaryName:"Bentonite",aliases:["Montmorillonite","Bentonite USA"],category:"clay",analysis:{SiO2:59,Al2O3:20,Fe2O3:3.5,Na2O:3,MgO:2,CaO:1,K2O:1},loi:10},{id:"barnard_slip",primaryName:"Barnard Slip",aliases:["Barnard Clay","Blackbird Slip","Blackbird Clay"],category:"clay",analysis:{SiO2:59,Fe2O3:15,Al2O3:10,MnO:3.5,K2O:2,MgO:.8,TiO2:.7,CaO:.3},loi:8.31},{id:"albany_slip",primaryName:"Albany Slip",aliases:["Albany Clay","New York Slip"],category:"clay",analysis:{SiO2:57.82,Al2O3:14.63,CaO:5.81,Fe2O3:5.21,K2O:3.2,MgO:2.71,Na2O:.8,TiO2:.4},loi:9.41},{id:"alberta_slip",primaryName:"Alberta Slip",aliases:["Archie Bray Slip"],category:"clay",analysis:{SiO2:53.54,Al2O3:15.2,CaO:5.9,Fe2O3:4.5,MgO:3.9,K2O:3.5,Na2O:2.2,TiO2:.3,P2O5:.1},loi:9.2},{id:"pyrophyllite",primaryName:"Pyrophyllite",aliases:["Pyrophyllite (Theoretical)"],category:"clay",analysis:{SiO2:66.7,Al2O3:28.3},loi:5},{id:"silica",primaryName:"Silica",aliases:["Flint","Quartz","SiO2","Silica Sand"],category:"silica",analysis:{SiO2:100},loi:0},{id:"potash_feldspar",primaryName:"Potash Feldspar",aliases:["Orthoclase","K-Feldspar","Potassium Feldspar"],category:"feldspar",analysis:{SiO2:64.76,Al2O3:18.32,K2O:16.92},loi:0},{id:"soda_feldspar",primaryName:"Soda Feldspar",aliases:["Albite","Na-Feldspar","Sodium Feldspar"],category:"feldspar",analysis:{SiO2:68.74,Al2O3:19.44,Na2O:11.82},loi:0},{id:"custer_feldspar",primaryName:"Custer Feldspar",aliases:["Custer","Custer Spar"],category:"feldspar",analysis:{SiO2:68.5,Al2O3:17,K2O:10.28,Na2O:3.04,CaO:.3,Fe2O3:.08,MgO:0},loi:.45},{id:"g200_feldspar",primaryName:"G-200 Feldspar",aliases:["G200","G-200 HP","G 200 Feldspar","G200 Spar"],category:"feldspar",analysis:{SiO2:66.3,Al2O3:18.5,K2O:10.8,Na2O:3.1,CaO:.8,Fe2O3:.08,MgO:.05},loi:.15},{id:"minspar_200",primaryName:"Minspar 200",aliases:["Minspar","NC-4 Feldspar"],category:"feldspar",analysis:{SiO2:68.8,Al2O3:18.2,Na2O:6.5,K2O:4.1,CaO:1.5,Fe2O3:.07},loi:.3},{id:"nepheline_syenite",primaryName:"Nepheline Syenite",aliases:["Neph Sy","A-400","Nepheline Syenite A400"],category:"feldspar",analysis:{SiO2:60.7,Al2O3:23.3,Na2O:9.8,K2O:4.6,CaO:.7,MgO:.1,Fe2O3:.08},loi:.72},{id:"cornwall_stone",primaryName:"Cornwall Stone",aliases:["Cornish Stone","China Stone","Corn Stn"],category:"feldspar",analysis:{SiO2:73.76,Al2O3:16.33,K2O:4.31,Na2O:3.3,CaO:1.81,Fe2O3:.2,TiO2:.15,MgO:.14},loi:0},{id:"spodumene",primaryName:"Spodumene",aliases:["Lithium Feldspar"],category:"feldspar",analysis:{SiO2:64.6,Al2O3:27.4,Li2O:8.01,Na2O:.3,Fe2O3:.1},loi:0},{id:"petalite",primaryName:"Petalite",aliases:["Lithium Aluminum Silicate"],category:"feldspar",analysis:{SiO2:78.49,Al2O3:16.65,Li2O:4.87},loi:0},{id:"whiting",primaryName:"Whiting",aliases:["Calcium Carbonate","CaCO3"],category:"calcium",analysis:{CaO:56.1},loi:43.9},{id:"wollastonite",primaryName:"Wollastonite",aliases:["Calcium Silicate","CaSiO3"],category:"calcium",analysis:{SiO2:51.72,CaO:48.28},loi:0},{id:"dolomite",primaryName:"Dolomite",aliases:["Calcium Magnesium Carbonate"],category:"calcium",analysis:{CaO:30.41,MgO:21.86},loi:47.73},{id:"talc",primaryName:"Talc",aliases:["Magnesium Silicate","3MgO.4SiO2.H2O","Soapstone"],category:"magnesium",analysis:{SiO2:63.37,MgO:31.88},loi:4.75},{id:"magnesium_carbonate",primaryName:"Magnesium Carbonate",aliases:["MgCO3","Magnesite"],category:"magnesium",analysis:{MgO:47.81},loi:52.19},{id:"frit_3134",primaryName:"Ferro Frit 3134",aliases:["Frit 3134","3134","F3134"],category:"frit",analysis:{SiO2:45.56,Al2O3:2,B2O3:22.79,CaO:19.51,Na2O:10.28},loi:0},{id:"frit_3110",primaryName:"Ferro Frit 3110",aliases:["Frit 3110","3110","F3110"],category:"frit",analysis:{SiO2:69.77,Na2O:15.24,CaO:6.29,Al2O3:3.7,B2O3:2.64,K2O:2.36},loi:0},{id:"frit_3124",primaryName:"Ferro Frit 3124",aliases:["Frit 3124","3124","F3124"],category:"frit",analysis:{SiO2:54.94,CaO:14.28,B2O3:13.74,Al2O3:10.01,Na2O:6.4,K2O:.68},loi:0},{id:"frit_3195",primaryName:"Ferro Frit 3195",aliases:["Frit 3195","3195","F3195"],category:"frit",analysis:{SiO2:48.35,B2O3:22.62,Al2O3:11.98,CaO:11.36,Na2O:5.69},loi:0},{id:"frit_3249",primaryName:"Ferro Frit 3249",aliases:["Frit 3249","3249","F3249"],category:"frit",analysis:{SiO2:42.1,B2O3:28.9,Al2O3:13.3,MgO:12.2,CaO:3.5},loi:0},{id:"gerstley_borate",primaryName:"Gerstley Borate",aliases:["GB"],category:"flux",analysis:{B2O3:26.8,CaO:19.4,SiO2:14.7,Na2O:4.09,MgO:3.5,Al2O3:1.03,K2O:.51,Fe2O3:.34},loi:29.5},{id:"gillespie_borate",primaryName:"Gillespie Borate",aliases:["Gilespie Borate","GB Substitute"],category:"flux",analysis:{B2O3:24.5,CaO:23,SiO2:11.8,MgO:3.9,Na2O:3.77,Al2O3:1.7,SrO:.45},loi:30.9},{id:"borax",primaryName:"Borax",aliases:["Sodium Tetraborate Decahydrate","Na2B4O7.10H2O"],category:"flux",analysis:{B2O3:36.51,Na2O:16.25},loi:47.24},{id:"boric_acid",primaryName:"Boric Acid",aliases:["H3BO3","Boracic Acid"],category:"flux",analysis:{B2O3:56.3},loi:43.7},{id:"soda_ash",primaryName:"Soda Ash",aliases:["Sodium Carbonate","Na2CO3"],category:"flux",analysis:{Na2O:58.48},loi:41.52},{id:"pearl_ash",primaryName:"Pearl Ash",aliases:["Potassium Carbonate","K2CO3","Potash"],category:"flux",analysis:{K2O:68.15},loi:31.85},{id:"zinc_oxide",primaryName:"Zinc Oxide",aliases:["ZnO"],category:"flux",analysis:{ZnO:100},loi:0},{id:"bone_ash",primaryName:"Bone Ash",aliases:["Calcium Phosphate","Tricalcium Phosphate"],category:"flux",analysis:{CaO:55.82,P2O5:42.39},loi:1.79},{id:"barium_carbonate",primaryName:"Barium Carbonate",aliases:["BaCO3"],category:"flux",analysis:{BaO:77.7},loi:22.3},{id:"strontium_carbonate",primaryName:"Strontium Carbonate",aliases:["SrCO3"],category:"flux",analysis:{SrO:70.19},loi:29.81},{id:"lithium_carbonate",primaryName:"Lithium Carbonate",aliases:["Li2CO3"],category:"flux",analysis:{Li2O:40.44},loi:59.56},{id:"alumina",primaryName:"Alumina",aliases:["Calcined Alumina","Aluminum Oxide","Al2O3"],category:"other",analysis:{Al2O3:100},loi:0},{id:"alumina_hydrate",primaryName:"Alumina Hydrate",aliases:["Aluminum Hydroxide","Al(OH)3","Al2O3.3H2O"],category:"other",analysis:{Al2O3:65.4},loi:34.6},{id:"zircopax",primaryName:"Zircopax",aliases:["Zirconium Silicate","ZrSiO4","Superpax","Zircon"],category:"opacifier",analysis:{ZrO2:67.21,SiO2:32.79},loi:0},{id:"tin_oxide",primaryName:"Tin Oxide",aliases:["SnO2","Stannic Oxide","Tin Dioxide"],category:"opacifier",analysis:{SnO2:100},loi:0},{id:"red_iron_oxide",primaryName:"Red Iron Oxide",aliases:["RIO","Fe2O3","Iron Oxide","Spanish Red Iron Oxide"],category:"colorant",analysis:{Fe2O3:95},loi:3},{id:"cobalt_oxide",primaryName:"Cobalt Oxide",aliases:["CoO","Black Cobalt Oxide"],category:"colorant",analysis:{CoO:100},loi:0},{id:"cobalt_carbonate",primaryName:"Cobalt Carbonate",aliases:["CoCO3"],category:"colorant",analysis:{CoO:63},loi:37},{id:"copper_carbonate",primaryName:"Copper Carbonate",aliases:["CuCO3"],category:"colorant",analysis:{CuO:57.48},loi:42.52},{id:"copper_oxide",primaryName:"Copper Oxide",aliases:["CuO","Black Copper Oxide","Cupric Oxide"],category:"colorant",analysis:{CuO:100},loi:0},{id:"chrome_oxide",primaryName:"Chrome Oxide",aliases:["Cr2O3","Chromium Oxide"],category:"colorant",analysis:{Cr2O3:100},loi:0},{id:"rutile",primaryName:"Rutile",aliases:["Ceramic Rutile","Iron Titanium"],category:"colorant",analysis:{TiO2:90,Fe2O3:10},loi:.1},{id:"titanium_dioxide",primaryName:"Titanium Dioxide",aliases:["TiO2","Titania"],category:"colorant",analysis:{TiO2:100},loi:0},{id:"manganese_dioxide",primaryName:"Manganese Dioxide",aliases:["MnO2","Pyrolusite"],category:"colorant",analysis:{MnO2:100},loi:0},{id:"manganese_carbonate",primaryName:"Manganese Carbonate",aliases:["MnCO3","Rhodochrosite"],category:"colorant",analysis:{MnO:61.71},loi:38.29},{id:"nickel_oxide",primaryName:"Nickel Oxide",aliases:["NiO","Green Nickel Oxide"],category:"colorant",analysis:{NiO:100},loi:0},{id:"calcined_kaolin",primaryName:"Calcined Kaolin",aliases:["Cal Kaolin","Meta Kaolin","Kal"],category:"clay",analysis:{Al2O3:45.9,SiO2:54.1},loi:0},{id:"mahavir_feldspar",primaryName:"Mahavir Potash Feldspar",aliases:["Mahavir Feldspar","PF-01 Potassium Feldspar","PF-01 Potash Feldspar"],category:"feldspar",analysis:{SiO2:67,Al2O3:17.5,K2O:11.5,Na2O:3,CaO:.15,MgO:.15,Fe2O3:.08},loi:.5},{id:"kyanite",primaryName:"Kyanite",aliases:["Disthene","Cyanite"],category:"other",analysis:{Al2O3:62.92,SiO2:37.08},loi:0},{id:"hawthorne_bond",primaryName:"Hawthorne Bond",aliases:["Hawthorne Fireclay","Hawthorn","Hawthorn Bond"],category:"clay",analysis:{SiO2:50.2,Al2O3:31.2,TiO2:1.95,Fe2O3:1.5,K2O:.5,CaO:.25,MgO:.2,Na2O:.15},loi:13},{id:"ulexite",primaryName:"Ulexite",aliases:["Television Stone"],category:"flux",analysis:{B2O3:42.95,CaO:13.84,Na2O:7.65},loi:35.55},{id:"volcanic_ash",primaryName:"Volcanic Ash",aliases:["Pumicite"],category:"other",analysis:{SiO2:67,Al2O3:15,CaO:6,Na2O:4,MgO:3,Fe2O3:2,K2O:1,TiO2:.5},loi:1},{id:"yellow_ochre",primaryName:"Yellow Ochre",aliases:["Hydrated Ferric Oxide","Yellow Iron Oxide"],category:"colorant",analysis:{SiO2:57.78,Fe2O3:22.01,Al2O3:19.92,CaO:.23,MgO:.06},loi:0},{id:"iron_chromate",primaryName:"Iron Chromate",aliases:["Ferric Chromate","Chromite","Chromate of Iron"],category:"colorant",analysis:{Cr2O3:67.85,FeO:32.4},loi:0},{id:"fusion_frit_f19",primaryName:"Fusion Frit F-19",aliases:["Fusion F19","F-19"],category:"frit",analysis:{SiO2:54.5,CaO:14.2,B2O3:14.6,Al2O3:9.7,Na2O:7},loi:0},{id:"xx_sagger",primaryName:"XX Sagger Ball Clay",aliases:["XX Sagger","Sagger XX","Saggar"],category:"clay",analysis:{SiO2:56.73,Al2O3:29.17,TiO2:1.71,K2O:.89,Fe2O3:.69,CaO:.5,MgO:.3,Na2O:.3},loi:9.71},{id:"lizella_clay",primaryName:"Lizella Clay",aliases:["Lizzella","Lizzela"],category:"clay",analysis:{SiO2:59.1,Al2O3:20.9,Fe2O3:5,K2O:1.3,TiO2:1.1,MgO:.8,Na2O:.6,CaO:.5},loi:10.5}],la={materials:sa};class ca{constructor(){A(this,"materials",new Map);A(this,"aliases",new Map);A(this,"analyses",new Map);A(this,"lois",new Map);A(this,"baseAnalyses",new Map);A(this,"baseLois",new Map);A(this,"overridesActive",!1);this.loadDigitalfire()}loadDigitalfire(){const a=la;for(const t of a.materials){const r={id:t.id,primaryName:t.primaryName,aliases:t.aliases||[],category:t.category,discontinued:t.discontinued||!1};t.loi!==void 0&&this.lois.set(t.id,t.loi);const n={};for(const[o,s]of Object.entries(t.analysis))n[o]=s;this.analyses.has(t.id)||this.analyses.set(t.id,n),this.materials.set(t.id,r),this.aliases.set(t.primaryName.toLowerCase(),t.id);for(const o of t.aliases||[])this.aliases.set(o.toLowerCase(),t.id)}}resolve(a){const t=a.toLowerCase().trim();if(!t)return null;const r=this.aliases.get(t);if(r)return this.materials.get(r)||null;if(t.length<3)return null;let n=null;for(const[o,s]of this.aliases){let l=0;if(o===t)l=100;else if(o.startsWith(t))l=80-(o.length-t.length);else if(t.startsWith(o)&&o.length>=4)l=60-(t.length-o.length);else if(o.includes(t)&&t.length>=4)l=40-(o.length-t.length);else continue;(!n||l>n.score)&&(n={materialId:s,score:l})}return n&&this.materials.get(n.materialId)||null}getAnalysis(a){return this.analyses.get(a)??null}getAllMaterials(){return Array.from(this.materials.values())}getMaterial(a){return this.materials.get(a)||null}getMaterialCount(){return this.materials.size}getLoi(a){return this.lois.get(a)??null}snapshotBase(){if(!(this.baseAnalyses.size>0)){for(const[a,t]of this.analyses)this.baseAnalyses.set(a,{...t});for(const[a,t]of this.lois)this.baseLois.set(a,t)}}setAnalysisOverrides(a){this.snapshotBase();for(const[t,r]of this.baseAnalyses)this.analyses.set(t,{...r});for(const[t,r]of this.baseLois)this.lois.set(t,r);if(a.size>0){for(const[t,r]of a){if(!this.materials.has(t))continue;const n=this.baseAnalyses.get(t),o=n?{...n,...r.analysis}:{...r.analysis};this.analyses.set(t,o),r.loi!==void 0&&this.lois.set(t,r.loi)}this.overridesActive=!0}else this.overridesActive=!1}hasActiveOverrides(){return this.overridesActive}}const da=new ca,ua=P(e=>({currentSetId:na(),availableSets:ia(),setAnalysisSet:a=>{e({currentSetId:a})}}));ua.subscribe(e=>{const a=oa(e.currentSetId);da.setAnalysisOverrides(a)});const jt=P(e=>({selectedGlaze:null,selectedPoint:null,hoveredGlaze:null,hoveredPoint:null,selectedForBlend:[],maxBlendSelection:5,compareGlazes:[],showSidebar:!0,sidebarTab:"detail",setSelectedGlaze:a=>e({selectedGlaze:a,showSidebar:a!==null}),setSelectedPoint:a=>e({selectedPoint:a}),setHoveredGlaze:a=>e({hoveredGlaze:a}),setHoveredPoint:a=>e({hoveredPoint:a}),addToBlendSelection:a=>e(t=>t.selectedForBlend.some(r=>r.id===a.id)||t.selectedForBlend.length>=t.maxBlendSelection?t:{selectedForBlend:[...t.selectedForBlend,a]}),removeFromBlendSelection:a=>e(t=>({selectedForBlend:t.selectedForBlend.filter(r=>r.id!==a)})),clearBlendSelection:()=>e({selectedForBlend:[]}),setMaxBlendSelection:a=>e(t=>({maxBlendSelection:a,selectedForBlend:t.selectedForBlend.slice(0,a)})),toggleSidebar:()=>e(a=>({showSidebar:!a.showSidebar})),setSidebarTab:a=>e({sidebarTab:a,showSidebar:!0}),addToCompare:a=>e(t=>t.compareGlazes.some(r=>r.id===a.id)||t.compareGlazes.length>=3?t:{compareGlazes:[...t.compareGlazes,a],sidebarTab:"compare",showSidebar:!0}),removeFromCompare:a=>e(t=>({compareGlazes:t.compareGlazes.filter(r=>r.id!==a)})),clearCompare:()=>e({compareGlazes:[]}),clearSelection:()=>e({selectedGlaze:null,selectedPoint:null,hoveredGlaze:null,hoveredPoint:null,selectedForBlend:[],compareGlazes:[]})})),pa="https://sjsrdqcgqaxgondcjvox.supabase.co",xe="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqc3JkcWNncWF4Z29uZGNqdm94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1OTEyNDIsImV4cCI6MjA4NjE2NzI0Mn0.sibJdqOOQ9Iinft5brY-Vv0Bozl9pU1M-6LkEZHt0Q8",F=!!xe;let L=null,B=null;async function _(){return L||B||(B=(async()=>{const{createClient:e}=await f(async()=>{const{createClient:a}=await import("./index-D1CIjMd7.js");return{createClient:a}},[]);return L=e(pa,xe,{auth:{autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0}}),L})(),B)}function we(e,a){return{id:e.id,user_id:a,name:e.name??"",source:e.source??"user",recipe_data:e}}function ma(e){return e.recipe_data}async function ga(e){if(!F)return[];const a=await _(),{data:t,error:r}=await a.from("saved_recipes").select("recipe_data").eq("user_id",e).order("updated_at",{ascending:!1});return r?(console.warn("[RecipeSync] Failed to fetch recipes:",r.message),[]):(t??[]).map(ma)}async function le(e,a){if(!F)return!1;const t=await _(),r=we(e,a),{error:n}=await t.from("saved_recipes").upsert(r,{onConflict:"id,user_id"});return n?(console.warn("[RecipeSync] Failed to upsert recipe:",n.message),!1):!0}async function ha(e,a){if(!F)return!1;const t=await _(),{error:r}=await t.from("saved_recipes").delete().eq("id",e).eq("user_id",a);return r?(console.warn("[RecipeSync] Failed to delete recipe:",r.message),!1):!0}async function fa(e,a){if(!F||e.length===0)return!1;const t=await _(),r=e.map(o=>we(o,a)),{error:n}=await t.from("saved_recipes").upsert(r,{onConflict:"id,user_id"});return n?(console.warn("[RecipeSync] Failed to push recipes:",n.message),!1):!0}async function ya(e){if(!F)return!1;const a=await _(),{error:t}=await a.from("saved_recipes").delete().eq("user_id",e);return t?(console.warn("[RecipeSync] Failed to clear cloud recipes:",t.message),!1):!0}function Oa(e,a){const t=new Map;for(const r of e)t.set(r.id,r);for(const r of a)t.set(r.id,r);return Array.from(t.values())}const te="stull-atlas-recipes",re="stull-atlas-blend-results",ve=1;function ba(e){return e}function Ce(e){if(e.umf&&typeof e.umf=="object"&&!e.umf.SiO2&&!e.umf._meta){const a=Object.keys(e.umf);a.length>0&&typeof e.umf[a[0]]=="object"&&(e.umf=e.umf[a[0]])}return{...e,umf:e.umf??null}}function xa(){try{const e=localStorage.getItem(te);if(!e)return[];const a=JSON.parse(e);return(a._v?a.recipes:a).map(Ce)}catch(e){return console.warn("Failed to load recipes from localStorage:",e),[]}}function D(e){try{localStorage.setItem(te,JSON.stringify({_v:ve,recipes:e.map(ba)}))}catch(a){console.warn("Failed to save recipes to localStorage:",a)}}function wa(){try{const e=localStorage.getItem(re);if(!e)return[];const a=JSON.parse(e);return(a._v?a.points:a).map(r=>({...r,recipe:r.recipe?Ce(r.recipe):r.recipe}))}catch(e){return console.warn("Failed to load blend results from localStorage:",e),[]}}function va(e){try{localStorage.setItem(re,JSON.stringify({_v:ve,points:e.map(a=>({...a,recipe:a.recipe?a.recipe:a.recipe}))}))}catch(a){console.warn("Failed to save blend results:",a)}}const Z=P((e,a)=>({recipes:xa(),blendResults:wa(),blendRecipes:[],_syncUserId:null,saveRecipe:t=>e(r=>{const n=r.recipes.findIndex(l=>l.id===t.id),o=[...r.recipes];n>=0?o[n]=t:o.push(t),D(o);const s=a()._syncUserId;return s&&le(t,s),{recipes:o}}),removeRecipe:t=>e(r=>{const n=r.recipes.filter(s=>s.id!==t);D(n);const o=a()._syncUserId;return o&&ha(t,o),{recipes:n}}),updateRecipe:(t,r)=>e(n=>{const o=n.recipes.map(c=>c.id===t?{...c,...r}:c);D(o);const s=o.find(c=>c.id===t),l=a()._syncUserId;return l&&s&&le(s,l),{recipes:o}}),getRecipe:t=>a().recipes.find(r=>r.id===t),clearAll:()=>{localStorage.removeItem(te);const t=a()._syncUserId;t&&ya(t),e({recipes:[]})},setBlendResults:t=>{va(t),e({blendResults:t})},clearBlendResults:()=>{localStorage.removeItem(re),e({blendResults:[]})},setBlendRecipes:t=>e({blendRecipes:t}),clearBlendRecipes:()=>e({blendRecipes:[]}),setSyncUserId:t=>e({_syncUserId:t}),syncFromCloud:async t=>{const r=await ga(t),n=a().recipes,o=Oa(n,r),s=new Set(r.map(c=>c.id)),l=n.filter(c=>!s.has(c.id));l.length>0&&fa(l,t),D(o),e({recipes:o,_syncUserId:t})}})),Ca=[{id:"normal",label:"Normal",preview:"#708090"},{id:"digitalfire",label:"Digitalfire",preview:"#2B5797"},{id:"glazy",label:"Glazy",preview:"#26A69A"}];function _e(){try{const e=localStorage.getItem("stull-theme");if(e==="light"||e==="dark"||e==="normal"||e==="digitalfire"||e==="glazy")return e}catch{}return"dark"}function J(e){document.documentElement.setAttribute("data-theme",e);try{localStorage.setItem("stull-theme",e)}catch{}}J(_e());const q=P((e,a)=>({theme:_e(),toggle:()=>{const t=a().theme==="dark"?"light":"dark";J(t),e({theme:t})},setTheme:t=>{J(t),e({theme:t})}}));function R(e){let a=0;return e.atmospheres.size>0&&a++,e.surfaces.size>0&&a++,(e.coneMin!==null||e.coneMax!==null)&&a++,e.hasIngredients&&a++,e.hasImages&&a++,a}const Mt=P()(e=>({atmospheres:new Set,surfaces:new Set,coneMin:null,coneMax:null,hasIngredients:!1,hasImages:!1,activeCount:0,toggleAtmosphere:a=>e(t=>{const r=new Set(t.atmospheres);r.has(a)?r.delete(a):r.add(a);const n={...t,atmospheres:r};return{...n,activeCount:R(n)}}),toggleSurface:a=>e(t=>{const r=new Set(t.surfaces);r.has(a)?r.delete(a):r.add(a);const n={...t,surfaces:r};return{...n,activeCount:R(n)}}),setConeRange:(a,t)=>e(r=>{const n={...r,coneMin:a,coneMax:t};return{...n,activeCount:R(n)}}),setHasIngredients:a=>e(t=>{const r={...t,hasIngredients:a};return{...r,activeCount:R(r)}}),setHasImages:a=>e(t=>{const r={...t,hasImages:a};return{...r,activeCount:R(r)}}),clearAll:()=>e({atmospheres:new Set,surfaces:new Set,coneMin:null,coneMax:null,hasIngredients:!1,hasImages:!1,activeCount:0})})),_a=typeof window<"u"&&"__TAURI_INTERNALS__"in window,Sa={name:"Stull Atlas",allUnlocked:!1,showPricing:!1,extraSkins:!1},ka={name:"Stull Atlas Studio",allUnlocked:!0,showPricing:!1,extraSkins:!0},W=_a?ka:Sa,Se=typeof window<"u"&&new URLSearchParams(window.location.search).get("demo")==="1",Aa={id:"demo-user",email:"demo@stullatlas.com",display_name:"NCECA Demo",tier:"pro",trial_start:new Date().toISOString(),trial_end:new Date(Date.now()+365*864e5).toISOString(),stripe_customer_id:null,avatar_url:null,bio:null,studio_name:null,website:null,location:null,is_public:!1,social_links:{},onboarding_completed:!0,created_at:new Date().toISOString(),updated_at:new Date().toISOString()};function Ia(e){if(!(e!=null&&e.trial_start)||!(e!=null&&e.trial_end))return"none";const a=new Date,t=new Date(e.trial_end);return a<=t?"active":"expired"}const ce=new Date("2026-04-30T23:59:59-04:00");function Tt(){return ce!==null&&new Date<=ce}const ke=Se,Pa=P((e,a)=>({session:null,user:null,profile:null,initialized:!1,loading:!1,error:null,initialize:async()=>{if(!a().initialized){if(W.allUnlocked){e({initialized:!0});return}if(Se){e({profile:Aa,initialized:!0});return}if(!F){e({initialized:!0});return}try{const t=await _(),{data:{session:r}}=await t.auth.getSession();e({session:r,user:(r==null?void 0:r.user)??null}),r!=null&&r.user&&(await a().fetchProfile(),Z.getState().syncFromCloud(r.user.id));const{data:{subscription:n}}=t.auth.onAuthStateChange(async(o,s)=>{e({session:s,user:(s==null?void 0:s.user)??null}),s!=null&&s.user?(await a().fetchProfile(),Z.getState().syncFromCloud(s.user.id)):(e({profile:null}),Z.getState().setSyncUserId(null))});window.__stullAuthSub=n}catch(t){console.error("[Auth] Failed to initialize:",t)}finally{e({initialized:!0})}}},signUp:async(t,r)=>{e({loading:!0,error:null});try{const n=await _(),{error:o}=await n.auth.signUp({email:t,password:r});return o?(e({error:o.message}),{error:o.message}):{error:null}}catch(n){const o=(n==null?void 0:n.message)||"Sign up failed";return e({error:o}),{error:o}}finally{e({loading:!1})}},signIn:async(t,r)=>{e({loading:!0,error:null});try{const n=await _(),{error:o}=await n.auth.signInWithPassword({email:t,password:r});return o?(e({error:o.message}),{error:o.message}):{error:null}}catch(n){const o=(n==null?void 0:n.message)||"Sign in failed";return e({error:o}),{error:o}}finally{e({loading:!1})}},signOut:async()=>{e({loading:!0}),await(await _()).auth.signOut(),e({session:null,user:null,profile:null,loading:!1})},fetchProfile:async()=>{const t=a().user;if(!t)return;const r=await _(),{data:n,error:o}=await r.from("profiles").select("*").eq("id",t.id).single();if(o&&o.code==="PGRST116"){const s={id:t.id,email:t.email??"",display_name:null,tier:"free",trial_start:null,trial_end:null,stripe_customer_id:null},{data:l}=await r.from("profiles").insert(s).select().single();e({profile:l??null})}else e({profile:n??null})},redeemCode:async t=>{const r=a().user;if(!r)return{error:"You must be signed in to redeem a code."};e({loading:!0,error:null});try{const n=await _(),o=t.trim().toUpperCase(),{data:s,error:l}=await n.from("trial_codes").select("*").eq("code",o).single();if(l||!s){const m="Invalid code. Please check and try again.";return e({error:m}),{error:m}}if(s.status!=="unused"){const m="This code has already been used.";return e({error:m}),{error:m}}const c=a().profile;if(c&&Ia(c)==="active"){const m="You already have an active trial.";return e({error:m}),{error:m}}const u=new Date,h=new Date(u);h.setDate(h.getDate()+30);const{error:p}=await n.from("trial_codes").update({status:"redeemed",redeemed_at:u.toISOString(),redeemed_by:r.id}).eq("code",o).eq("status","unused");if(p){const m="Failed to redeem code. Please try again.";return e({error:m}),{error:m}}const{error:y}=await n.from("profiles").update({trial_start:u.toISOString(),trial_end:h.toISOString()}).eq("id",r.id);if(y){const m="Code redeemed but failed to activate trial. Contact support.";return e({error:m}),{error:m}}return await a().fetchProfile(),{error:null}}catch(n){const o=(n==null?void 0:n.message)||"Code redemption failed";return e({error:o}),{error:o}}finally{e({loading:!1})}},clearError:()=>e({error:null})}));je();const de="stull-atlas-welcomed",Na=[{icon:"🔬",title:"9,000+ Real Glazes",desc:"Explore a curated dataset of glaze analyses from Glazy, plotted on interactive Stull charts by oxide composition."},{icon:"🧪",title:"Blend Calculators",desc:"Line, triaxial, biaxial, radial, and space-filling blend tools — plan your test tiles before mixing."},{icon:"⚡",title:"Recipe Optimizer",desc:"Set UMF targets and let gradient descent or genetic algorithms find material recipes that hit them."},{icon:"💬",title:"AI Suggestions",desc:'Describe the glaze you want in plain English — "matte celadon, cone 6" — and get optimized recipes.'}];function Ea(){const[e,a]=d.useState(!1);d.useEffect(()=>{if(ke)return;if(!localStorage.getItem(de)){const o=setTimeout(()=>a(!0),400);return()=>clearTimeout(o)}},[]);const t=d.useCallback(()=>{a(!1),localStorage.setItem(de,"1")},[]),r=d.useCallback(()=>{a(!0)},[]);return{showWelcome:e,dismiss:t,reshow:r}}function ja({onDismiss:e}){const a=Me(),[t,r]=d.useState(0),n=()=>{e()};return d.useEffect(()=>{const o=s=>{s.key==="Escape"&&e()};return document.addEventListener("keydown",o),()=>document.removeEventListener("keydown",o)},[e]),i.jsxs("div",{className:"welcome-overlay",onClick:e,children:[i.jsx("div",{className:"welcome-card",role:"dialog","aria-modal":"true","aria-label":"Welcome to Stull Atlas",onClick:o=>o.stopPropagation(),children:t===0?i.jsxs(i.Fragment,{children:[i.jsxs("div",{className:"welcome-hero",children:[i.jsx("div",{className:"welcome-logo",children:"⚗"}),i.jsx("h1",{children:"Stull Atlas"}),i.jsx("p",{className:"welcome-tagline",children:"The ceramicist's workbench for glaze chemistry"})]}),i.jsx("p",{className:"welcome-body",children:"Stull Atlas puts 9,000+ real glaze analyses at your fingertips — plotted on interactive oxide charts with tools for blending, optimizing, and discovering new recipes."}),i.jsx("p",{className:"welcome-body welcome-body-secondary",children:"Built by a potter, for potters. Free to explore."}),i.jsxs("div",{className:"welcome-migration",children:[i.jsx("span",{className:"welcome-migration-label",children:"Coming from another tool?"}),i.jsxs("div",{className:"welcome-migration-links",children:[i.jsx("button",{className:"welcome-migration-btn",onClick:()=>{e(),a("/guide#from-glazy")},children:"Switching from Glazy →"}),i.jsx("button",{className:"welcome-migration-btn",onClick:()=>{e(),a("/guide#from-insight")},children:"Switching from Insight →"})]})]}),i.jsxs("div",{className:"welcome-actions",children:[i.jsx("button",{className:"welcome-btn welcome-btn-primary",onClick:()=>r(1),children:"See What's Inside →"}),i.jsx("button",{className:"welcome-btn welcome-btn-ghost",onClick:n,children:"Jump Straight In"})]})]}):i.jsxs(i.Fragment,{children:[i.jsx("h2",{className:"welcome-features-title",children:"What you can do"}),i.jsx("div",{className:"welcome-features",children:Na.map((o,s)=>i.jsxs("div",{className:"welcome-feature",children:[i.jsx("span",{className:"welcome-feature-icon",children:o.icon}),i.jsxs("div",{children:[i.jsx("strong",{children:o.title}),i.jsx("p",{children:o.desc})]})]},s))}),i.jsxs("div",{className:"welcome-actions",children:[i.jsx("button",{className:"welcome-btn welcome-btn-primary",onClick:n,children:"Start Exploring"}),i.jsx("button",{className:"welcome-btn welcome-btn-ghost",onClick:n,children:"Jump Straight In"})]}),i.jsx("p",{className:"welcome-footnote",children:"The explorer, UMF calculator, materials database, and guide are always free."})]})}),i.jsx("style",{children:`
        .welcome-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(6px);
          animation: welcomeFadeIn 0.3s ease;
        }

        @keyframes welcomeFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes welcomeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .welcome-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 16px;
          padding: 40px;
          max-width: 520px;
          width: calc(100% - 32px);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
          animation: welcomeSlideUp 0.35s ease;
        }

        .welcome-hero {
          text-align: center;
          margin-bottom: 24px;
        }

        .welcome-logo {
          font-size: 56px;
          margin-bottom: 8px;
          filter: grayscale(0.3);
        }

        .welcome-hero h1 {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: var(--text-bright);
          letter-spacing: -0.5px;
        }

        .welcome-tagline {
          margin: 6px 0 0;
          font-size: 15px;
          color: var(--accent);
          font-weight: 500;
        }

        .welcome-body {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-body);
          margin: 0 0 12px;
        }

        .welcome-body-secondary {
          font-style: italic;
          color: var(--text-secondary);
          font-size: 14px;
        }

        .welcome-actions {
          display: flex;
          gap: 10px;
          margin-top: 24px;
        }

        .welcome-btn {
          flex: 1;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          border: none;
        }

        .welcome-btn-primary {
          background: var(--accent);
          color: #fff;
        }

        .welcome-btn-primary:hover {
          filter: brightness(1.15);
        }

        .welcome-btn-ghost {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-secondary);
        }

        .welcome-btn-ghost:hover {
          color: var(--text-label);
          border-color: var(--accent);
          background: var(--accent-bg);
        }

        .welcome-features-title {
          margin: 0 0 20px;
          font-size: 20px;
          font-weight: 600;
          color: var(--text-bright);
        }

        .welcome-features {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 8px;
        }

        .welcome-feature {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .welcome-feature-icon {
          font-size: 28px;
          flex-shrink: 0;
          width: 36px;
          text-align: center;
          margin-top: 2px;
        }

        .welcome-feature strong {
          display: block;
          font-size: 14px;
          color: var(--text-bright);
          margin-bottom: 2px;
        }

        .welcome-feature p {
          margin: 0;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .welcome-footnote {
          text-align: center;
          font-size: 12px;
          color: var(--text-muted);
          margin: 16px 0 0;
        }

        .welcome-migration {
          margin: 16px 0 0;
          padding: 12px 16px;
          background: var(--bg-tertiary, rgba(255,255,255,0.03));
          border: 1px solid var(--border-subtle, rgba(255,255,255,0.06));
          border-radius: 8px;
        }

        .welcome-migration-label {
          display: block;
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 8px;
          font-weight: 500;
        }

        .welcome-migration-links {
          display: flex;
          gap: 8px;
        }

        .welcome-migration-btn {
          flex: 1;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          background: transparent;
          color: var(--accent);
          border: 1px solid var(--accent);
          opacity: 0.7;
        }

        .welcome-migration-btn:hover {
          opacity: 1;
          background: var(--accent-bg, rgba(59,130,246,0.1));
        }

        @media (max-width: 480px) {
          .welcome-card {
            padding: 28px 20px;
          }

          .welcome-hero h1 {
            font-size: 26px;
          }

          .welcome-actions {
            flex-direction: column;
          }
        }
      `})]})}const V=[{target:null,title:"Welcome to Stull Atlas",body:"This quick tour will show you the key features. It takes about 60 seconds.",position:"bottom"},{target:".stull-plot-container",title:"The Stull Chart",body:"Each dot is a real glaze analysis. The X and Y axes show oxide moles (SiO₂ vs Al₂O₃ by default). Click any dot to see its full recipe and UMF analysis.",position:"right"},{target:".controls-panel",title:"Plot Controls",body:"Change the axes to plot different oxides, switch the color scheme, toggle 3D mode, and filter by cone range. The controls panel gives you full command of the visualization.",position:"right"},{target:".dataset-switcher",title:"Dataset Switcher",body:"Browse the full Glazy dataset (9,000+ glazes) or switch to focused subsets like cone 6 stoneware, cone 10 reduction, or low-fire earthenware.",position:"bottom"},{target:".view-toggle",title:"3D Visualization",body:"Switch to 3D mode to add a third oxide axis. Rotate, zoom, and fly through the data. A fitted surface shows concentration trends.",position:"right"},{target:".sidebar-panel",title:"Glaze Details",body:"When you click a glaze, this panel shows its full UMF analysis, recipe breakdown, similarity search results, and options to compare or add to your collection.",position:"left"},{target:".main-nav",title:"Calculators & Tools",body:"Beyond the explorer: blend calculators (line, triaxial, biaxial), a recipe optimizer with gradient descent and genetic algorithms, AI suggestions, and a full materials database.",position:"bottom"},{target:null,title:"Ready to Explore!",body:"Click any dot on the chart to start exploring. The free tier gives you full access to the explorer, UMF calculator, materials database, and guide.",position:"bottom"}];function Ma({onClose:e}){const[a,t]=d.useState(0),[r,n]=d.useState(null),o=V[a],s=a===0,l=a===V.length-1;d.useEffect(()=>{var m;if(!o.target){n(null);return}const p=document.querySelector(o.target);if(p){const C=p.getBoundingClientRect();n(C)}else n(null);(m=o.onEnter)==null||m.call(o);const y=()=>{if(!o.target)return;const C=document.querySelector(o.target);C&&n(C.getBoundingClientRect())};return window.addEventListener("resize",y),()=>window.removeEventListener("resize",y)},[a,o]);const c=d.useCallback(()=>{l?e():t(p=>p+1)},[l,e]),u=d.useCallback(()=>{t(p=>Math.max(0,p-1))},[]);d.useEffect(()=>{const p=y=>{y.key==="Escape"&&e(),(y.key==="ArrowRight"||y.key==="Enter")&&c(),y.key==="ArrowLeft"&&u()};return window.addEventListener("keydown",p),()=>window.removeEventListener("keydown",p)},[c,u,e]);const h=()=>{if(!r)return{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)"};const p=16;switch(o.position){case"right":return{position:"fixed",top:Math.max(p,r.top),left:r.right+p,maxWidth:`calc(100vw - ${r.right+p*2}px)`};case"left":return{position:"fixed",top:Math.max(p,r.top),right:`calc(100vw - ${r.left-p}px)`,maxWidth:r.left-p*2};case"bottom":return{position:"fixed",top:r.bottom+p,left:Math.max(p,r.left),maxWidth:400};case"top":return{position:"fixed",bottom:`calc(100vh - ${r.top-p}px)`,left:Math.max(p,r.left),maxWidth:400}}};return i.jsxs("div",{className:"tour-overlay",children:[i.jsxs("svg",{className:"tour-backdrop",width:"100%",height:"100%",children:[i.jsx("defs",{children:i.jsxs("mask",{id:"tour-mask",children:[i.jsx("rect",{width:"100%",height:"100%",fill:"white"}),r&&i.jsx("rect",{x:r.left-6,y:r.top-6,width:r.width+12,height:r.height+12,rx:"8",fill:"black"})]})}),i.jsx("rect",{width:"100%",height:"100%",fill:"rgba(0,0,0,0.65)",mask:"url(#tour-mask)"}),r&&i.jsx("rect",{x:r.left-6,y:r.top-6,width:r.width+12,height:r.height+12,rx:"8",fill:"none",stroke:"var(--accent)",strokeWidth:"2",className:"tour-highlight-ring"})]}),i.jsxs("div",{className:"tour-tooltip",style:h(),children:[i.jsxs("div",{className:"tour-step-indicator",children:[a+1," / ",V.length]}),i.jsx("h3",{className:"tour-title",children:o.title}),i.jsx("p",{className:"tour-body",children:o.body}),i.jsxs("div",{className:"tour-nav",children:[!s&&i.jsx("button",{className:"tour-btn tour-btn-ghost",onClick:u,children:"← Back"}),i.jsx("div",{style:{flex:1}}),i.jsx("button",{className:"tour-btn tour-btn-ghost",onClick:e,children:"Skip"}),i.jsx("button",{className:"tour-btn tour-btn-primary",onClick:c,children:l?"Done":"Next →"})]})]}),i.jsx("style",{children:`
        .tour-overlay {
          position: fixed;
          inset: 0;
          z-index: 10001;
          pointer-events: none;
        }

        .tour-backdrop {
          position: absolute;
          inset: 0;
          pointer-events: all;
        }

        .tour-highlight-ring {
          animation: tourPulse 2s ease-in-out infinite;
        }

        @keyframes tourPulse {
          0%, 100% { stroke-opacity: 1; }
          50% { stroke-opacity: 0.4; }
        }

        .tour-tooltip {
          pointer-events: all;
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 20px 24px;
          max-width: 380px;
          min-width: 280px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
          animation: tourFadeIn 0.25s ease;
          z-index: 10002;
        }

        @keyframes tourFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .tour-step-indicator {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .tour-title {
          margin: 0 0 8px;
          font-size: 17px;
          font-weight: 600;
          color: var(--text-bright);
        }

        .tour-body {
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-body);
        }

        .tour-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
        }

        .tour-btn {
          padding: 7px 16px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          border: none;
          white-space: nowrap;
        }

        .tour-btn-primary {
          background: var(--accent);
          color: #fff;
        }

        .tour-btn-primary:hover {
          filter: brightness(1.15);
        }

        .tour-btn-ghost {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-secondary);
        }

        .tour-btn-ghost:hover {
          color: var(--text-label);
          border-color: var(--accent);
        }

        @media (max-width: 600px) {
          .tour-tooltip {
            position: fixed !important;
            bottom: 16px !important;
            left: 16px !important;
            right: 16px !important;
            top: auto !important;
            transform: none !important;
            max-width: none;
          }
        }
      `})]})}function Ta(){const[e,a]=d.useState(!1),t=d.useCallback(()=>a(!0),[]),r=d.useCallback(()=>a(!1),[]);return{showTour:e,startTour:t,closeTour:r}}function za(){const{loadGlazes:e,setLoading:a,setError:t,isLoading:r,loadError:n}=z(),o=d.useCallback(async(l={current:!1})=>{a(!0),t(null);try{const{loadGlazyDataset:c}=await f(async()=>{const{loadGlazyDataset:h}=await import("./index-ciw763aw.js");return{loadGlazyDataset:h}},__vite__mapDeps([0,1,2,3,4,5,6])),u=await c();l.current||(e(u),$e())}catch(c){l.current||t(c.message||"Failed to load dataset")}finally{l.current||a(!1)}},[e,a,t]);d.useEffect(()=>{if(z.getState().stats.total>0)return;const l={current:!1};return o(l),()=>{l.current=!0}},[o]);const s=d.useCallback(()=>{o()},[o]);return{isLoading:r,loadError:n,retry:s}}const ie=[{id:470,name:"Clear",color:"#e0e0e0",parentId:null,keywords:["clear","transparent glaze","clear base"]},{id:480,name:"White",color:"#fefef0",parentId:null,keywords:["white","off-white","porcelain glaze"]},{id:490,name:"Iron",color:"#b22222",parentId:null,keywords:["iron"]},{id:500,name:"Celadon",color:"#ace1af",parentId:490,keywords:["celadon"]},{id:510,name:"Celadon Blue",color:"#c4d1e1",parentId:500,keywords:["blue celadon","celadon blue"]},{id:520,name:"Celadon Green",color:"#4b945e",parentId:500,keywords:["green celadon","celadon green"]},{id:530,name:"Celadon Yellow",color:"#ffdb58",parentId:500,keywords:["yellow celadon","celadon yellow"]},{id:533,name:"Chun / Jun",color:"#91a2a3",parentId:500,keywords:["chun","jun"]},{id:535,name:"Amber",color:"#ffbf00",parentId:490,keywords:["amber"]},{id:540,name:"Tenmoku",color:"#654321",parentId:490,keywords:["tenmoku","temmoku","tianmu","temoku"]},{id:550,name:"Tea Dust",color:"#6c6517",parentId:490,keywords:["tea dust"]},{id:560,name:"Hare's Fur",color:"#63382f",parentId:490,keywords:["hare's fur","hares fur","tessha"]},{id:570,name:"Kaki / Tomato Red",color:"#9b391c",parentId:490,keywords:["kaki","tomato red","persimmon"]},{id:580,name:"Oil Spot",color:"#3d3b32",parentId:490,keywords:["oil spot","oilspot"]},{id:585,name:"Iron Slip",color:"#8e2222",parentId:490,keywords:["iron slip","slip-based iron"]},{id:590,name:"Shino",color:"#efeee7",parentId:null,keywords:["shino"]},{id:600,name:"Traditional Shino",color:"#e0d7c5",parentId:590,keywords:["traditional shino"]},{id:610,name:"Carbon Trap Shino",color:"#de815b",parentId:590,keywords:["carbon trap"]},{id:620,name:"High-Alumina Shino",color:"#f4e8d0",parentId:590,keywords:["high-alumina shino","hi alumina shino"]},{id:630,name:"White Shino",color:"#f7f3eb",parentId:590,keywords:["white shino"]},{id:635,name:"Red",color:"#ee0000",parentId:null,keywords:[]},{id:640,name:"Copper Red",color:"#a52927",parentId:635,keywords:["copper red","sang de boeuf"]},{id:650,name:"Oxblood",color:"#9d1624",parentId:640,keywords:["oxblood"]},{id:660,name:"Flambé",color:"#ca211f",parentId:640,keywords:["flambe","flambé"]},{id:670,name:"Peach Bloom",color:"#c7a09a",parentId:640,keywords:["peach bloom","peachbloom"]},{id:673,name:"Pink",color:"#ffc0cb",parentId:635,keywords:["pink"]},{id:675,name:"Red Stain",color:"#ff1515",parentId:635,keywords:["red stain"]},{id:680,name:"Green",color:"#00cc00",parentId:null,keywords:[]},{id:690,name:"Copper Green",color:"#2c7649",parentId:680,keywords:["copper green"]},{id:700,name:"Oribe",color:"#457640",parentId:680,keywords:["oribe"]},{id:710,name:"Chrome Green",color:"#437f3f",parentId:680,keywords:["chrome green"]},{id:720,name:"Titanium Green",color:"#529777",parentId:680,keywords:["titanium green"]},{id:730,name:"Nickel Green",color:"#749686",parentId:680,keywords:["nickel green"]},{id:740,name:"Green Stain",color:"#00ff00",parentId:680,keywords:["green stain"]},{id:745,name:"Turquoise",color:"#40e0d0",parentId:null,keywords:["turquoise","egyptian blue","alkaline blue"]},{id:750,name:"Blue",color:"#0000ff",parentId:null,keywords:[]},{id:760,name:"Cobalt Blue",color:"#0047ab",parentId:750,keywords:["cobalt"]},{id:770,name:"Rutile Blue",color:"#6c94b6",parentId:750,keywords:["rutile blue","rutile"]},{id:780,name:"Barium Blue",color:"#29499c",parentId:750,keywords:["barium blue"]},{id:790,name:"Strontium Blue",color:"#33a8b9",parentId:750,keywords:["strontium blue"]},{id:800,name:"Nickel Blue",color:"#436a92",parentId:750,keywords:["nickel blue"]},{id:810,name:"Blue Stain",color:"#0000cc",parentId:750,keywords:["blue stain"]},{id:820,name:"Purple",color:"#800080",parentId:null,keywords:["purple","violet","plum"]},{id:830,name:"Mag Matte Purple",color:"#a41ca4",parentId:820,keywords:["magnesium matte purple","mag purple"]},{id:840,name:"Nickel Purple",color:"#8a0a95",parentId:820,keywords:["nickel purple"]},{id:850,name:"Manganese Purple",color:"#5d015d",parentId:820,keywords:["manganese purple"]},{id:860,name:"Matte",color:"#cccccc",parentId:null,keywords:[]},{id:870,name:"Magnesium Matte",color:"#bfbfbf",parentId:860,keywords:["magnesium matte","mag matte","dolomite matte"]},{id:880,name:"Black",color:"#333333",parentId:null,keywords:["black"]},{id:890,name:"Black Slip",color:"#2a1c0e",parentId:880,keywords:["black slip"]},{id:900,name:"Black Glossy",color:"#222222",parentId:880,keywords:["black gloss","glossy black"]},{id:910,name:"Black Satin",color:"#111111",parentId:880,keywords:["black satin"]},{id:920,name:"Yellow",color:"#ffff00",parentId:null,keywords:["yellow"]},{id:930,name:"Iron Yellow",color:"#ffe484",parentId:920,keywords:["iron yellow"]},{id:940,name:"Barium Yellow",color:"#e8d04c",parentId:920,keywords:["barium yellow"]},{id:950,name:"Manganese Yellow",color:"#f5ee25",parentId:920,keywords:["manganese yellow"]},{id:960,name:"Yellow Stain",color:"#ffff00",parentId:920,keywords:["yellow stain"]},{id:970,name:"Nickel Yellow",color:"#fff700",parentId:920,keywords:["nickel yellow"]},{id:980,name:"Crystalline",color:"#88ccee",parentId:null,keywords:["crystalline","crystal"]},{id:990,name:"Micro Crystalline",color:"#aaddff",parentId:980,keywords:["micro crystal"]},{id:1e3,name:"Aventurine",color:"#cc8844",parentId:980,keywords:["aventurine"]},{id:1010,name:"Manganese Crystal",color:"#9955cc",parentId:980,keywords:["manganese crystal"]},{id:1020,name:"Macro Crystalline",color:"#77bbdd",parentId:980,keywords:["macro crystal"]},{id:1030,name:"Single-Fire",color:"#dddddd",parentId:null,keywords:["single fire","single-fire","raw glaze"]},{id:1040,name:"Wood",color:"#8b7355",parentId:null,keywords:["wood fire","wood-fire","woodfire","anagama","noborigama"]},{id:1050,name:"Salt & Soda",color:"#d4a574",parentId:null,keywords:["salt","soda fire","soda glaze","salt glaze","salt & soda"]},{id:1055,name:"Raku",color:"#cc6644",parentId:null,keywords:["raku"]},{id:1060,name:"Ash",color:"#a0926b",parentId:null,keywords:["ash"]},{id:1070,name:"Nuka",color:"#e8e0cc",parentId:1060,keywords:["nuka"]},{id:1080,name:"Synthetic Ash",color:"#bbb49c",parentId:1060,keywords:["synthetic ash","fake ash"]},{id:1090,name:"Ash Slip",color:"#8a7e60",parentId:1060,keywords:["ash slip"]},{id:1100,name:"Majolica",color:"#ffcc33",parentId:null,keywords:["majolica","maiolica"]},{id:1130,name:"Specialty",color:"#999999",parentId:null,keywords:[]},{id:1140,name:"Crackle",color:"#ccccdd",parentId:1130,keywords:["crackle","crazing"]},{id:1150,name:"Crawling",color:"#bbaa99",parentId:1130,keywords:["crawl","crawling"]},{id:1160,name:"Crater",color:"#aa8877",parentId:1130,keywords:["crater","volcanic"]},{id:1170,name:"Metallic",color:"#888888",parentId:1130,keywords:["metallic","lustrous","lustre","luster"]}],G=new Map(ie.map(e=>[e.id,e]));new Map(ie.map(e=>[e.name.toLowerCase(),e]));const Fa=ie.flatMap(e=>e.keywords.map(a=>({keyword:a,typeId:e.id}))).sort((e,a)=>a.keyword.length-e.keyword.length);function zt(e){const a=e.toLowerCase();for(const{keyword:t,typeId:r}of Fa)if(a.includes(t))return r;return null}function Ft(e){var a;return e===null?"Unclassified":((a=G.get(e))==null?void 0:a.name)??"Unclassified"}function Rt(e){var a;return e===null?"#777777":((a=G.get(e))==null?void 0:a.color)??"#777777"}function Lt(e){let a=G.get(e);for(;a&&a.parentId!==null;)a=G.get(a.parentId);return a??null}let Y=null;async function Ra(){return Y||(Y=await f(()=>import("./domain-digitalfire-DfgmtSpv.js"),__vite__mapDeps([7,8]))),Y}const La=[{title:"Explorer (Stull Plot)",path:"/",keywords:"stull plot atlas explorer chart scatter umf"},{title:"AI Recipe Suggestions",path:"/suggest",keywords:"suggest ai recipe generate glaze idea"},{title:"UMF Calculator",path:"/calc/umf",keywords:"calculator umf unity molecular formula recipe"},{title:"Line Blend",path:"/calc/line-blend",keywords:"line blend two recipes steps"},{title:"Triaxial Blend",path:"/calc/triaxial",keywords:"triaxial blend three triangle simplex"},{title:"Quadaxial Blend",path:"/calc/quadaxial",keywords:"quadaxial blend four recipes"},{title:"Biaxial Blend",path:"/calc/biaxial",keywords:"biaxial grid blend two axis"},{title:"Radial Blend",path:"/calc/radial",keywords:"radial blend center variations"},{title:"Space-Filling Design",path:"/calc/space-filling",keywords:"space filling design coverage tiles"},{title:"Recipe Optimizer",path:"/calc/optimizer",keywords:"optimizer target gradient descent genetic algorithm"},{title:"Materials Database",path:"/materials",keywords:"materials database feldspar kaolin silica"},{title:"Import / Export",path:"/import-export",keywords:"import export csv json download upload"},{title:"Guide",path:"/guide",keywords:"guide tutorial help how to get started"},{title:"About",path:"/about",keywords:"about credits tony hansen digitalfire"},{title:"What's New",path:"/updates",keywords:"updates changelog release notes version"}];function Ba(e,a,t=8){var s;const r=e.toLowerCase(),n=r.split(/\s+/).filter(l=>l.length>1),o=[];for(const l of a){const c=l.name.toLowerCase();let u=0;if(c===r)u=100;else if(c.startsWith(r))u=80;else if(c.includes(r))u=60;else for(const h of n)c.includes(h)&&(u+=20);if(u>0){const h=((s=l.coneRange)==null?void 0:s[0])!==void 0?`Cone ${pe(Number(l.coneRange[0]))}`:"",p=l.atmosphere!=="unknown"?l.atmosphere:"",y=l.surfaceType!=="unknown"?l.surfaceType:"",m=[h,p,y].filter(Boolean);o.push({id:`glaze-${l.id}`,title:l.name,subtitle:m.join(" · ")||l.source,category:"glaze",action:l.id,score:u})}if(o.length>=t*3)break}return o.sort((l,c)=>c.score-l.score),o.slice(0,t)}function Da(e){const a=e.toLowerCase(),t=a.split(/\s+/).filter(n=>n.length>1),r=[];for(const n of La){const o=n.title.toLowerCase();let s=0;if(o.includes(a))s=60;else for(const l of t)o.includes(l)&&(s+=20),n.keywords.includes(l)&&(s+=10);s>0&&r.push({id:`page-${n.path}`,title:n.title,subtitle:n.path,category:"page",action:n.path,score:s})}return r.sort((n,o)=>o.score-n.score),r.slice(0,4)}async function Wa(e,a=8){try{return(await Ra()).searchKnowledge(e,a).map((n,o)=>{var s;return{id:`df-${n.category}-${o}`,title:n.title,subtitle:((s=n.excerpt)==null?void 0:s.slice(0,120))||"",category:"knowledge",action:n.url,badge:n.category,score:50-o}})}catch{return[]}}function Ua(){const[e,a]=d.useState(!1),[t,r]=d.useState(""),[n,o]=d.useState(0),s=z(g=>g.getGlazesArray),l=d.useRef(),[c,u]=d.useState(""),[h,p]=d.useState([]);d.useEffect(()=>(l.current&&clearTimeout(l.current),l.current=setTimeout(()=>{u(t),o(0)},120),()=>{l.current&&clearTimeout(l.current)}),[t]),d.useEffect(()=>{const g=c.trim();if(g.length<2){p([]);return}let w=!1;return Wa(g).then(M=>{w||p(M)}),()=>{w=!0}},[c]);const y=d.useMemo(()=>{const g=c.trim();if(g.length<2)return[];const w=s(),M=Ba(g,w);return[...Da(g),...M,...h]},[c,s,h]),m=d.useMemo(()=>{const g={page:[],glaze:[],knowledge:[]};for(const w of y)g[w.category].push(w);return g},[y]),C=d.useMemo(()=>{const g=[];return m.page.length&&g.push(...m.page),m.glaze.length&&g.push(...m.glaze),m.knowledge.length&&g.push(...m.knowledge),g},[m]),S=d.useCallback(()=>{a(g=>(g||(r(""),u(""),o(0)),!g))},[]),k=d.useCallback(()=>{a(!1),r(""),u(""),o(0)},[]);d.useEffect(()=>{const g=w=>{(w.ctrlKey||w.metaKey)&&w.key==="k"&&(w.preventDefault(),S()),w.key==="Escape"&&e&&(w.preventDefault(),k())};return window.addEventListener("keydown",g),()=>window.removeEventListener("keydown",g)},[S,k,e]);const j=d.useCallback(g=>{g.key==="ArrowDown"?(g.preventDefault(),o(w=>Math.min(w+1,C.length-1))):g.key==="ArrowUp"&&(g.preventDefault(),o(w=>Math.max(w-1,0)))},[C.length]);return{open:e,query:t,setQuery:r,toggle:S,close:k,grouped:m,flatResults:C,selectedIndex:n,setSelectedIndex:o,handleKeyDown:j,results:y}}function Ga(){const[e,a]=d.useState(typeof navigator<"u"?navigator.onLine:!0),[t,r]=d.useState(!1);d.useEffect(()=>{var c;const o=()=>a(!0),s=()=>a(!1);window.addEventListener("online",o),window.addEventListener("offline",s);const l=u=>{var h;((h=u.data)==null?void 0:h.type)==="SW_UPDATED"&&r(!0)};return(c=navigator.serviceWorker)==null||c.addEventListener("message",l),"serviceWorker"in navigator&&navigator.onLine&&navigator.serviceWorker.ready.then(u=>{var h;(h=u.active)==null||h.postMessage({type:"CACHE_LAZY"})}),()=>{var u;window.removeEventListener("online",o),window.removeEventListener("offline",s),(u=navigator.serviceWorker)==null||u.removeEventListener("message",l)}},[]);const n=d.useCallback(()=>{window.location.reload()},[]);return{isOnline:e,hasUpdate:t,applyUpdate:n}}function Ka(){const[e,a]=d.useState(()=>new URLSearchParams(window.location.search||window.location.hash.split("?")[1]||"").get("kiosk")==="1");d.useEffect(()=>{if(!e)return;const r=n=>{if(n.key==="Escape"){a(!1);const o=new URL(window.location.href);o.searchParams.delete("kiosk"),o.hash.includes("kiosk")&&(o.hash=o.hash.replace(/[?&]kiosk=1/,"").replace(/\?$/,"")),window.history.replaceState({},"",o.toString())}};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[e]),d.useEffect(()=>{if(!e){document.body.classList.remove("kiosk-mode"),document.body.style.cursor="";return}document.body.classList.add("kiosk-mode");let r;const n=()=>{document.body.style.cursor="",clearTimeout(r),r=setTimeout(()=>{document.body.style.cursor="none"},3e3)};return n(),window.addEventListener("mousemove",n),()=>{clearTimeout(r),document.body.style.cursor="",document.body.classList.remove("kiosk-mode"),window.removeEventListener("mousemove",n)}},[e]);const t=d.useCallback(()=>a(!1),[]);return{active:e,exit:t}}const Ha=d.lazy(()=>f(()=>import("./index-BuGgJ8RX.js"),__vite__mapDeps([9,4,8,6,5])));function Za(){const e=z(v=>v.stats),a=z(v=>v.isLoading),t=q(v=>v.theme),r=q(v=>v.toggle),n=q(v=>v.setTheme),o=Pa(v=>v.initialize),{showWelcome:s,dismiss:l}=Ea(),{showTour:c,startTour:u,closeTour:h}=Ta(),{loadError:p,retry:y}=za(),[m,C]=d.useState(!1),S=Te(),{open:k}=Ua(),{isOnline:j,hasUpdate:g,applyUpdate:w}=Ga(),M=Ka();d.useEffect(()=>{C(!1)},[S.pathname]);const oe=d.useCallback(()=>C(v=>!v),[]);return d.useEffect(()=>{o()},[o]),i.jsxs("div",{className:`app-layout${M.active?" kiosk-layout":""}`,children:[i.jsx("a",{href:"#main-content",className:"skip-link",children:"Skip to main content"}),!M.active&&i.jsxs("header",{className:"atlas-header",role:"banner",children:[i.jsxs("div",{className:"header-left",children:[i.jsx(N,{to:"/",className:"logo-link",children:i.jsx("h1",{children:W.name})}),i.jsxs("button",{className:`hamburger${m?" open":""}`,onClick:oe,"aria-label":m?"Close navigation menu":"Open navigation menu","aria-expanded":m,"aria-controls":"main-nav",children:[i.jsx("span",{}),i.jsx("span",{}),i.jsx("span",{})]}),i.jsxs("nav",{className:`main-nav${m?" show":""}`,id:"main-nav","aria-label":"Main navigation",children:[i.jsx(N,{to:"/",end:!0,children:"Explorer"}),i.jsx(N,{to:"/calc",children:"Calculators"}),i.jsx(N,{to:"/materials",children:"Materials"}),i.jsx(N,{to:"/import-export",children:"Import/Export"}),i.jsx(N,{to:"/guide",children:"Guide"}),i.jsx(N,{to:"/about",children:"About"}),W.showPricing]})]}),i.jsxs("div",{className:"header-right",children:[ke&&i.jsx("span",{style:{padding:"3px 10px",borderRadius:10,fontSize:11,fontWeight:600,background:"rgba(46, 204, 113, 0.2)",color:"#2ecc71",whiteSpace:"nowrap"},children:"DEMO MODE"}),i.jsx("button",{className:"tour-trigger",onClick:u,title:"Start guided tour","aria-label":"Start guided tour",children:"?"}),i.jsx("button",{className:"theme-toggle",onClick:r,title:`Switch to ${t==="dark"?"light":"dark"} mode`,"aria-label":`Switch to ${t==="dark"?"light":"dark"} mode`,children:t==="dark"?"☀":"🌙"}),W.extraSkins&&i.jsx("div",{className:"skin-picker",children:Ca.map(v=>i.jsx("button",{className:`skin-dot${t===v.id?" active":""}`,onClick:()=>n(v.id),title:v.label,"aria-label":`${v.label} skin`,style:{background:v.preview}},v.id))}),i.jsx("span",{className:"stats","aria-live":"polite",children:p?i.jsx("button",{className:"retry-btn",onClick:y,title:"Tap to retry loading",children:"⚠ Load failed · Retry"}):a?"Loading...":`${e.total.toLocaleString()} glazes`})]})]}),!j&&i.jsxs("div",{className:"offline-banner",role:"alert",children:[i.jsx("span",{className:"offline-icon",children:"⚡"}),"You're offline — cached data is still available"]}),g&&i.jsxs("div",{className:"update-banner",role:"alert",children:[i.jsx("span",{children:"A new version of Stull Atlas is available"}),i.jsx("button",{className:"update-btn",onClick:w,children:"Refresh"})]}),i.jsx("main",{id:"main-content",className:"page-content",children:i.jsx(ze,{})}),s&&i.jsx(ja,{onDismiss:l}),c&&i.jsx(Ma,{onClose:h}),k&&i.jsx(d.Suspense,{fallback:null,children:i.jsx(Ha,{})}),i.jsx("style",{children:`
        .app-layout {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: var(--font-body);
        }

        .atlas-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-primary);
          flex-shrink: 0;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .logo-link {
          text-decoration: none;
          color: inherit;
        }

        .header-left h1 {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          font-family: var(--font-display);
          letter-spacing: -0.01em;
        }

        .main-nav {
          display: flex;
          gap: 4px;
        }

        .main-nav a {
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 14px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.15s;
        }

        .main-nav a:hover {
          color: var(--text-label);
          background: var(--bg-elevated);
        }

        .main-nav a.active {
          color: var(--text-bright);
          background: var(--accent-bg);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .theme-toggle {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid var(--border-secondary);
          background: var(--bg-input);
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          padding: 0;
          line-height: 1;
        }

        .theme-toggle:hover {
          border-color: var(--accent);
          background: var(--bg-elevated);
        }

        .skin-picker {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 2px 4px;
          border-radius: 6px;
          border: 1px solid var(--border-secondary);
          background: var(--bg-input);
        }

        .skin-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          padding: 0;
          transition: all 0.15s;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.15);
        }

        .skin-dot:hover {
          transform: scale(1.2);
          border-color: var(--text-secondary);
        }

        .skin-dot.active {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent), inset 0 0 0 1px rgba(0,0,0,0.15);
        }

        .stats {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .retry-btn {
          background: rgba(231, 76, 60, 0.15);
          color: #e74c3c;
          border: 1px solid rgba(231, 76, 60, 0.3);
          border-radius: 6px;
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }

        .retry-btn:hover {
          background: rgba(231, 76, 60, 0.25);
          border-color: #e74c3c;
        }

        .tour-trigger {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid var(--border-secondary);
          background: var(--bg-input);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 700;
          font-family: var(--font-display);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          padding: 0;
          line-height: 1;
        }

        .tour-trigger:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--accent-bg);
        }

        /* ── Search trigger button ─────────────────── */
        .search-trigger {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 6px;
          border: 1px solid var(--border-secondary);
          background: var(--bg-input);
          color: var(--text-secondary);
          font-size: 13px;
          font-family: var(--font-body);
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }

        .search-trigger:hover {
          border-color: var(--accent);
          color: var(--text-primary);
          background: var(--accent-bg);
        }

        .search-trigger-icon {
          font-size: 13px;
          line-height: 1;
        }

        .search-trigger-label {
          font-size: 13px;
        }

        .search-trigger-kbd {
          font-size: 10px;
          font-weight: 600;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-primary);
          border-radius: 3px;
          padding: 1px 5px;
          margin-left: 4px;
          font-family: var(--font-body);
        }

        .page-content {
          flex: 1;
          overflow: hidden;
          display: flex;
        }

        @media (max-width: 768px) {
          .page-content {
            overflow: auto;
          }
        }

        /* ── Hamburger button ─────────────────────── */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          width: 32px;
          height: 32px;
          background: none;
          border: 1px solid var(--border-secondary);
          border-radius: 6px;
          cursor: pointer;
          padding: 6px;
          transition: all 0.15s;
        }

        .hamburger span {
          display: block;
          height: 2px;
          background: var(--text-secondary);
          border-radius: 1px;
          transition: all 0.25s;
        }

        .hamburger:hover {
          border-color: var(--accent);
        }

        .hamburger:hover span {
          background: var(--accent);
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(4px, 4px);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(4px, -4px);
        }

        /* ── Mobile responsive ────────────────────── */
        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }

          .atlas-header {
            flex-wrap: wrap;
            padding: 8px 12px;
          }

          .header-left {
            gap: 12px;
          }

          .header-left h1 {
            font-size: 16px;
          }

          .main-nav {
            display: none;
            flex-direction: column;
            width: 100%;
            gap: 2px;
            padding-top: 8px;
            order: 3;
          }

          .main-nav.show {
            display: flex;
          }

          .main-nav a {
            padding: 10px 14px;
            font-size: 15px;
          }

          .header-right {
            gap: 8px;
          }

          .header-right .stats {
            display: none;
          }

          .tour-trigger {
            display: none;
          }

          .search-trigger-label,
          .search-trigger-kbd {
            display: none;
          }
        }

        .skip-link {
          position: absolute;
          top: -40px;
          left: 0;
          background: var(--accent);
          color: var(--text-bright);
          padding: 8px 16px;
          z-index: 100;
          font-size: 14px;
          text-decoration: none;
          border-radius: 0 0 6px 0;
          transition: top 0.15s;
        }

        .skip-link:focus {
          top: 0;
        }

        /* ── Offline / update banners ── */
        .offline-banner,
        .update-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          text-align: center;
          flex-shrink: 0;
          animation: bannerSlideDown 0.25s ease-out;
        }

        @keyframes bannerSlideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }

        .offline-banner {
          background: rgba(231, 76, 60, 0.15);
          color: #e74c3c;
          border-bottom: 1px solid rgba(231, 76, 60, 0.3);
        }

        .offline-icon {
          font-size: 16px;
        }

        .update-banner {
          background: rgba(52, 152, 219, 0.15);
          color: #3498db;
          border-bottom: 1px solid rgba(52, 152, 219, 0.3);
        }

        .update-btn {
          background: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
        }

        .update-btn:hover {
          background: #2980b9;
        }

        /* ── Kiosk / booth mode ── */
        .kiosk-layout .atlas-header {
          display: none;
        }
        .kiosk-layout .page-content {
          height: 100vh;
        }
      `})]})}class qa extends d.Component{constructor(a){super(a),this.state={hasError:!1,error:null}}static getDerivedStateFromError(a){return{hasError:!0,error:a}}componentDidCatch(a,t){console.error("Stull Atlas Error:",a,t)}render(){var a,t;return this.state.hasError?i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",background:"var(--bg-primary, #121212)",color:"var(--text-primary, #e0e0e0)",fontFamily:"-apple-system, sans-serif",padding:40},children:[i.jsx("h1",{style:{fontSize:48,margin:"0 0 16px",opacity:.3},children:"âš—"}),i.jsx("h2",{style:{margin:"0 0 12px",fontSize:20},children:"Something went wrong"}),i.jsx("p",{style:{color:"var(--text-secondary, #888)",fontSize:14,maxWidth:500,textAlign:"center",margin:"0 0 24px"},children:((a=this.state.error)==null?void 0:a.message)||"An unexpected error occurred"}),i.jsx("button",{onClick:()=>{this.setState({hasError:!1,error:null}),window.location.href="/"},style:{padding:"10px 24px",background:"var(--accent-bg, #282560)",border:"1px solid var(--accent, #6366F1)",borderRadius:6,color:"var(--text-bright, #fff)",fontSize:14,cursor:"pointer"},children:"Back to Explorer"}),i.jsxs("details",{style:{marginTop:24,maxWidth:600,fontSize:12,color:"var(--text-muted, #666)"},children:[i.jsx("summary",{style:{cursor:"pointer"},children:"Error details"}),i.jsx("pre",{style:{whiteSpace:"pre-wrap",marginTop:8},children:(t=this.state.error)==null?void 0:t.stack})]})]}):this.props.children}}function b(e){return d.lazy(()=>e().catch(a=>{throw sessionStorage.getItem("stull-chunk-retry")||(sessionStorage.setItem("stull-chunk-retry","1"),window.location.reload()),a}))}const Va=b(()=>f(()=>import("./CalculatorsPage-U5uPHD_d.js"),__vite__mapDeps([10,4,11,12,6,5])).then(e=>({default:e.CalculatorsPage}))),Ya=b(()=>f(()=>import("./UMFCalculatorPage-DrY3OWiy.js"),__vite__mapDeps([13,4,14,2,15,7,8,16,17,5,6,11,18,12])).then(e=>({default:e.UMFCalculatorPage}))),$a=b(()=>f(()=>import("./LineBlendPage-CwVTmu9x.js"),__vite__mapDeps([19,4,14,20,2,21,17,5,6,11,12])).then(e=>({default:e.LineBlendPage}))),Xa=b(()=>f(()=>import("./TriaxialBlendPage-BPxNLYCN.js"),__vite__mapDeps([22,4,14,20,2,21,17,5,6,11,12])).then(e=>({default:e.TriaxialBlendPage}))),Ja=b(()=>f(()=>import("./QuadaxialBlendPage-b_gHUVnZ.js"),__vite__mapDeps([23,4,14,20,2,21,17,5,6,11,12])).then(e=>({default:e.QuadaxialBlendPage}))),Qa=b(()=>f(()=>import("./BiaxialBlendPage-CTcHMG94.js"),__vite__mapDeps([24,4,14,2,16,21,17,5,6,11,12])).then(e=>({default:e.BiaxialBlendPage}))),et=b(()=>f(()=>import("./RadialBlendPage-CmTW1DAJ.js"),__vite__mapDeps([25,4,14,2,21,17,5,6,11,12])).then(e=>({default:e.RadialBlendPage}))),at=b(()=>f(()=>import("./FluxTriaxialPage-BllPN59K.js"),__vite__mapDeps([26,4,27,14,20,2,21,17,5,6,11,12])).then(e=>({default:e.FluxTriaxialPage}))),tt=b(()=>f(()=>import("./SpaceFillingPage-BJyrKzuk.js"),__vite__mapDeps([28,4,2,21,17,5,6,11,12])).then(e=>({default:e.SpaceFillingPage}))),rt=b(()=>f(()=>import("./MaterialsPage-Cr-BVHmU.js"),__vite__mapDeps([29,4,11,12,7,8,5,6])).then(e=>({default:e.MaterialsPage}))),it=b(()=>f(()=>import("./ImportExportPage-C4yCmJHF.js"),__vite__mapDeps([30,4,11,12,5,6])).then(e=>({default:e.ImportExportPage}))),ot=b(()=>f(()=>import("./AboutPage-CZvBZv16.js"),__vite__mapDeps([31,4,11,32,6,5])).then(e=>({default:e.AboutPage}))),nt=b(()=>f(()=>import("./GuidePage-CpllZBbi.js"),__vite__mapDeps([33,4,11,6,5])).then(e=>({default:e.GuidePage}))),st=b(()=>f(()=>import("./OptimizerPage-CSztBC1D.js"),__vite__mapDeps([34,4,35,11,15,7,8,12,5,6])).then(e=>({default:e.OptimizerPage}))),lt=b(()=>f(()=>import("./UpdatesPage-0FJ3HTBm.js"),__vite__mapDeps([36,4,11,32,6,5])).then(e=>({default:e.UpdatesPage}))),ct=b(()=>f(()=>import("./SuggestionPage-3PotdOhr.js"),__vite__mapDeps([37,4,35,7,8,11,12,15,5,6])).then(e=>({default:e.SuggestionPage})));b(()=>f(()=>import("./PricingPage-BjlPSKJm.js"),__vite__mapDeps([38,4,11,39,5,6])).then(e=>({default:e.PricingPage})));const dt=b(()=>f(()=>import("./NCECAPage-E8FdKgdH.js"),__vite__mapDeps([40,4,11,39,6,5])).then(e=>({default:e.NCECAPage}))),ut=b(()=>f(()=>import("./VariabilityPage-633p4FGM.js"),__vite__mapDeps([41,4,11,6,5])).then(e=>({default:e.VariabilityPage}))),pt=b(()=>f(()=>import("./ExplorerPage-CVvnvK-5.js").then(e=>e.E),__vite__mapDeps([42,4,27,2,16,32,1,18,15,7,8,17,5,6,11])).then(e=>({default:e.ExplorerPage}))),mt=b(()=>f(()=>import("./HenryPage-DNZbwaRE.js"),__vite__mapDeps([43,4,11,6,5])).then(e=>({default:e.HenryPage}))),gt=b(()=>f(()=>import("./MarksPage-BFwyGYqX.js"),__vite__mapDeps([44,4])).then(e=>({default:e.MarksPage}))),ht=b(()=>f(()=>import("./NotFoundPage-BH3INFa1.js"),__vite__mapDeps([45,4,11,6,5])).then(e=>({default:e.NotFoundPage})));sessionStorage.getItem("stull-chunk-retry")&&sessionStorage.removeItem("stull-chunk-retry");class ft extends d.Component{constructor(a){super(a),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}render(){return this.state.hasError?i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flex:1,gap:12,color:"var(--text-secondary)",fontSize:14,padding:40},children:[i.jsx("p",{children:"This page failed to load â€” the app may have been updated."}),i.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"8px 20px",background:"var(--accent-bg, #282560)",border:"1px solid var(--accent, #6366F1)",borderRadius:6,color:"var(--text-bright, #fff)",fontSize:13,cursor:"pointer"},children:"Reload Page"})]}):this.props.children}}function yt(){return i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flex:1,color:"var(--text-secondary)",fontSize:14,gap:16},children:[i.jsx("div",{style:{width:32,height:32,border:"3px solid var(--border-primary, #333)",borderTopColor:"var(--accent, #6366F1)",borderRadius:"50%",animation:"page-spin 0.8s linear infinite"}}),i.jsx("style",{children:"@keyframes page-spin { to { transform: rotate(360deg) } }"})]})}function x({children:e}){return i.jsx(ft,{children:i.jsx(d.Suspense,{fallback:i.jsx(yt,{}),children:e})})}function Ot(){return i.jsx(qa,{children:i.jsx(Fe,{children:i.jsxs(O,{element:i.jsx(Za,{}),children:[i.jsx(O,{index:!0,element:i.jsx(x,{children:i.jsx(pt,{})})}),i.jsx(O,{path:"calc",element:i.jsx(x,{children:i.jsx(Va,{})})}),i.jsx(O,{path:"calc/umf",element:i.jsx(x,{children:i.jsx(Ya,{})})}),i.jsx(O,{path:"calc/line-blend",element:i.jsx(x,{children:i.jsx($a,{})})}),i.jsx(O,{path:"calc/triaxial",element:i.jsx(x,{children:i.jsx(Xa,{})})}),i.jsx(O,{path:"calc/quadaxial",element:i.jsx(x,{children:i.jsx(Ja,{})})}),i.jsx(O,{path:"calc/biaxial",element:i.jsx(x,{children:i.jsx(Qa,{})})}),i.jsx(O,{path:"calc/radial",element:i.jsx(x,{children:i.jsx(et,{})})}),i.jsx(O,{path:"calc/flux-triaxial",element:i.jsx(x,{children:i.jsx(at,{})})}),i.jsx(O,{path:"calc/space-filling",element:i.jsx(x,{children:i.jsx(tt,{})})}),i.jsx(O,{path:"calc/optimizer",element:i.jsx(x,{children:i.jsx(st,{})})}),i.jsx(O,{path:"materials",element:i.jsx(x,{children:i.jsx(rt,{})})}),i.jsx(O,{path:"import-export",element:i.jsx(x,{children:i.jsx(it,{})})}),i.jsx(O,{path:"about",element:i.jsx(x,{children:i.jsx(ot,{})})}),i.jsx(O,{path:"guide",element:i.jsx(x,{children:i.jsx(nt,{})})}),i.jsx(O,{path:"suggest",element:i.jsx(x,{children:i.jsx(ct,{})})}),i.jsx(O,{path:"updates",element:i.jsx(x,{children:i.jsx(lt,{})})}),i.jsx(O,{path:"nceca",element:i.jsx(x,{children:i.jsx(dt,{})})}),i.jsx(O,{path:"help/variability",element:i.jsx(x,{children:i.jsx(ut,{})})}),i.jsx(O,{path:"henry",element:i.jsx(x,{children:i.jsx(mt,{})})}),i.jsx(O,{path:"marks",element:i.jsx(x,{children:i.jsx(gt,{})})}),i.jsx(O,{path:"*",element:i.jsx(x,{children:i.jsx(ht,{})})})]})})})}Pe.createRoot(document.getElementById("root")).render(i.jsx(Ne.StrictMode,{children:i.jsx(Re,{children:i.jsx(Ot,{})})}));export{_t as A,St as C,Nt as E,It as F,G,kt as M,Je as O,Pt as P,f as _,At as a,z as b,Pa as c,Mt as d,W as e,Rt as f,Ft as g,Lt as h,Tt as i,ea as j,jt as k,q as l,da as m,De as n,pe as o,Ct as p,$ as q,Et as r,ua as s,Ka as t,Z as u,za as v,Ua as w,ie as x,zt as y};
