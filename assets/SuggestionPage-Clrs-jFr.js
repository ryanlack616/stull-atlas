import{r as b,j as e}from"./vendor-react-D380Hx73.js";import{m as k}from"./index-DUKXpxkf.js";import{o as B,a as P}from"./geneticOptimizer-D5z6wYYG.js";import{getContextualRefs as H,getTroubleRef as K}from"./domain-digitalfire-DfgmtSpv.js";import{u as L}from"./usePageTitle-DBGH44HI.js";import{c as G}from"./calc-styles-u5C4IXOP.js";import{O as W}from"./OxideLink-DfHeNf4K.js";import"./vendor-state-CUnBHQ16.js";import"./vendor-router-1trnvaIQ.js";import"./data-digitalfire-CCT-bSzB.js";const I=[/cone\s*(\d+)/i,/c\/?\s*(\d+)/i,/\^(\d+)/,/(\d+)\s*cone/i,/at\s+(\d+)/i,/cone\s*0+(\d+)/i],_=[/cone\s*0(\d+)/i,/low\s*fire/i,/earthenware/i],D={reduction:"reduction",reducing:"reduction",reduced:"reduction",redux:"reduction",oxidation:"oxidation",oxidizing:"oxidation",electric:"oxidation","electric kiln":"oxidation",neutral:"neutral"},U={gloss:"gloss",glossy:"gloss",shiny:"gloss",brilliant:"gloss",satin:"satin","semi-matte":"satin","semi matte":"satin",eggshell:"satin",silky:"satin",matte:"matte",matt:"matte",mat:"matte",dry:"matte",flat:"matte",crystalline:"crystalline",crystal:"crystalline",crawl:"crawl",crawling:"crawl",lichen:"crawl",volcanic:"crawl"},Z=["red","blue","green","yellow","orange","purple","brown","black","white","cream","amber","honey","jade","teal","turquoise","lavender","pink","rust","tan","ivory","celadon green","oxblood","sang de boeuf","opalescent"],Y=new Set(["i","want","need","make","a","an","the","for","to","at","in","on","with","something","like","similar","give","me","can","you","please","would","looking","look","try","find","suggest","recommend","that","is","it","of","my","some","glaze","recipe","about","around","how"]),Q=["celadon","tenmoku","temmoku","temoku","shino","ash","crystalline","crystal","majolica","maiolica","tin","faience","delft","raku","salt","soda","copper red","sang de boeuf","oxblood","flambe","copper green","verdigris","rutile","floating blue","chun","jun","opalescent","cobalt","cobalt blue","iron","iron red","iron saturate","clear","transparent","liner","matte","matt","satin","gloss","white","black","functional","crawl","lichen","texture","volcanic","porcelain","stoneware","earthenware","hares fur","hare's fur","oil spot","carbon trap","wood fire","wood fired","nuka"];function V(i){const t=i.trim(),a=t.toLowerCase();let n=0,r=null;for(const h of _){const x=a.match(h);if(x){x[1]?r=-parseInt(x[1],10):/low\s*fire/i.test(a)?r=-6:/earthenware/i.test(a)&&(r=-4);break}}if(r===null)for(const h of I){const x=a.match(h);if(x){r=parseInt(x[1],10);break}}r===null&&(/high\s*fire|stoneware|porcelain/i.test(a)&&!/cone/i.test(a)?r=10:/mid[\s-]*fire/i.test(a)&&(r=6)),r!==null&&(n+=.3);let s=null;for(const[h,x]of Object.entries(D))if(a.includes(h)){s=x,n+=.1;break}let o=null;for(const[h,x]of Object.entries(U))if(a.includes(h)){o=x,n+=.1;break}const d=[];for(const h of Z)a.includes(h)&&(d.push(h),n+=.05);const m=[],p=[...Q].sort((h,x)=>x.length-h.length);let u=a;for(const h of p)u.includes(h)&&(m.push(h),u=u.replace(h," "),n+=.2);const g=u.split(/\s+/).filter(h=>h.length>2&&!Y.has(h)),y=[...new Set(g.filter(h=>!m.includes(h)&&!d.includes(h)))];return n=Math.min(n,1),m.length===0&&r===null&&d.length===0&&(n=Math.max(n,.05)),{raw:t,glazeTerms:m,cone:r,atmosphere:s,surface:o,colors:d,tags:y,confidence:n}}const A=[{id:"celadon-cone10-reduction",name:"Celadon (Cone 10 Reduction)",aliases:["celadon","green celadon","jade","qingci","chinese celadon","korean celadon"],family:"celadon",description:"Classic Asian celadon — pale jade-green from 1-3% iron oxide in a high-silica, high-alumina base fired in reduction. The iron reduces to FeO, giving the characteristic blue-green.",targets:[{oxide:"SiO2",min:3.5,max:4.5,weight:3},{oxide:"Al2O3",min:.35,max:.55,weight:3},{oxide:"CaO",min:.4,max:.65,weight:2},{oxide:"K2O",min:.1,max:.25,weight:1},{oxide:"Na2O",min:.05,max:.15,weight:1},{oxide:"MgO",min:0,max:.1,weight:1}],coneRange:[9,12],atmosphere:"reduction",surface:"gloss",keyMaterials:["custer-feldspar","silica","whiting","epk","ball-clay"],colorants:{"red-iron-oxide":{min:1,max:3}},notes:"Must fire in reduction for blue-green color. Oxidation gives amber/olive.",tags:["celadon","green","jade","blue-green","asian","traditional","iron","reduction","stoneware","porcelain"]},{id:"celadon-cone6-oxidation",name:"Celadon (Cone 6 Oxidation)",aliases:["cone 6 celadon","fake celadon","faux celadon","oxidation celadon"],family:"celadon",description:"Cone 6 oxidation celadon approximation — uses small amounts of chrome or copper for green tones instead of traditional iron reduction. Or iron with calcium borate flux.",targets:[{oxide:"SiO2",min:3,max:4,weight:3},{oxide:"Al2O3",min:.25,max:.4,weight:3},{oxide:"CaO",min:.3,max:.5,weight:2},{oxide:"Na2O",min:.1,max:.25,weight:1},{oxide:"K2O",min:.05,max:.2,weight:1},{oxide:"B2O3",min:.05,max:.2,weight:1}],coneRange:[5,7],atmosphere:"oxidation",surface:"gloss",keyMaterials:["custer-feldspar","silica","whiting","epk","ferro-frit-3134"],colorants:{"chrome-oxide":{min:.1,max:.5}},notes:"Won't look exactly like a cone 10 reduction celadon but can be close with the right colorants.",tags:["celadon","green","cone 6","oxidation","mid-fire"]},{id:"tenmoku-classic",name:"Tenmoku (Classic)",aliases:["tenmoku","temmoku","temoku","jian","hare's fur","oil spot"],family:"tenmoku",description:"Classic tenmoku — saturated iron glaze (8-12% iron) producing deep brown-black with possible hare's fur or oil spot effects. High calcium, moderate silica.",targets:[{oxide:"SiO2",min:3,max:4,weight:2},{oxide:"Al2O3",min:.3,max:.45,weight:2},{oxide:"CaO",min:.5,max:.7,weight:3},{oxide:"K2O",min:.1,max:.25,weight:1},{oxide:"MgO",min:0,max:.15,weight:1}],coneRange:[9,11],atmosphere:"reduction",surface:"gloss",keyMaterials:["custer-feldspar","silica","whiting","epk","ball-clay"],colorants:{"red-iron-oxide":{min:8,max:13}},notes:"Oil spot effect requires 10-12% iron and specific firing schedule. Hare's fur at 8-10%.",tags:["tenmoku","temmoku","iron","brown","black","hares fur","oil spot","jian","japanese","chinese"]},{id:"iron-saturate-cone6",name:"Iron Saturate (Cone 6)",aliases:["iron red","iron saturate","cone 6 tenmoku","amber","honey"],family:"iron",description:"Mid-fire iron-saturated glaze producing amber, honey, or red-brown depending on thickness and iron amount.",targets:[{oxide:"SiO2",min:2.8,max:3.8,weight:2},{oxide:"Al2O3",min:.25,max:.4,weight:2},{oxide:"CaO",min:.3,max:.5,weight:2},{oxide:"Na2O",min:.1,max:.25,weight:1},{oxide:"K2O",min:.05,max:.2,weight:1},{oxide:"B2O3",min:.05,max:.2,weight:1}],coneRange:[5,7],atmosphere:"oxidation",surface:"gloss",keyMaterials:["custer-feldspar","silica","whiting","epk","ferro-frit-3134"],colorants:{"red-iron-oxide":{min:4,max:10}},tags:["iron","amber","honey","brown","red","cone 6","saturate"]},{id:"shino-traditional",name:"Shino (Traditional)",aliases:["shino","american shino","carbon trap shino","white shino"],family:"shino",description:"High soda feldspar glaze with thick, crawling white surface. Characteristic orange flash from carbon trapping. Very high Na2O, low alumina typical.",targets:[{oxide:"SiO2",min:3,max:4.5,weight:2},{oxide:"Al2O3",min:.2,max:.5,weight:2},{oxide:"Na2O",min:.4,max:.8,weight:3},{oxide:"K2O",min:.05,max:.2,weight:1},{oxide:"CaO",min:0,max:.15,weight:1}],coneRange:[9,12],atmosphere:"reduction",surface:"satin",keyMaterials:["nepheline-syenite","spodumene","soda-ash","epk","ball-clay","silica"],notes:"Apply thick. Carbon trapping requires heavy reduction early in the firing.",tags:["shino","white","orange","carbon trap","crawl","japanese","soda","alkali"]},{id:"ash-glaze-natural",name:"Natural Ash Glaze",aliases:["ash glaze","wood ash","natural ash","nuka"],family:"ash",description:"Wood ash provides calcium, potassium, phosphorus, and silica. Produces warm, varied surfaces with subtle greens/browns. Typically 40-50% ash + feldspar + clay.",targets:[{oxide:"SiO2",min:3,max:4.5,weight:2},{oxide:"Al2O3",min:.25,max:.45,weight:2},{oxide:"CaO",min:.4,max:.7,weight:3},{oxide:"K2O",min:.1,max:.3,weight:1},{oxide:"MgO",min:.05,max:.2,weight:1},{oxide:"P2O5",min:.01,max:.1,weight:1}],coneRange:[9,13],atmosphere:"either",surface:"satin",keyMaterials:["custer-feldspar","silica","whiting","epk","dolomite"],notes:"Natural ash is variable — washing helps consistency. Bone ash can substitute for P2O5.",tags:["ash","wood","natural","nuka","warm","earth","green","brown","phosphorus"]},{id:"crystalline-zinc",name:"Crystalline (Zinc)",aliases:["crystalline","crystal glaze","macro crystalline","zinc crystal"],family:"crystalline",description:"Zinc silicate crystals grown during controlled cooling. Very high ZnO (0.3-0.5), high SiO2, near-zero alumina (Al2O3 < 0.1 prevents crystal nucleation).",targets:[{oxide:"SiO2",min:3.5,max:5,weight:2},{oxide:"Al2O3",min:0,max:.08,weight:5},{oxide:"ZnO",min:.3,max:.55,weight:4},{oxide:"CaO",min:.1,max:.3,weight:1},{oxide:"Na2O",min:.1,max:.3,weight:1},{oxide:"B2O3",min:0,max:.15,weight:1}],coneRange:[8,11],atmosphere:"oxidation",surface:"crystalline",keyMaterials:["zinc-oxide","silica","ferro-frit-3110","lithium-carbonate"],colorants:{"nickel-oxide":{min:1,max:3},"copper-carbonate":{min:1,max:3},"cobalt-carbonate":{min:.5,max:2},"manganese-dioxide":{min:2,max:5},"titanium-dioxide":{min:2,max:5}},notes:"Requires controlled cooling schedule — hold at 1040°C for 2-4 hours for crystal growth. Extremely runny — use a catch basin. Very low or zero alumina is critical.",tags:["crystalline","crystal","zinc","macro","large","flowers","science","technical"]},{id:"majolica-traditional",name:"Majolica (Tin Glaze)",aliases:["majolica","maiolica","tin glaze","faience","delft"],family:"majolica",description:"Low-fire white opaque glaze using tin oxide as opacifier. Classic base for overglaze decoration. High alkali, moderate boron.",targets:[{oxide:"SiO2",min:1.5,max:2.8,weight:2},{oxide:"Al2O3",min:.05,max:.2,weight:2},{oxide:"B2O3",min:.3,max:.6,weight:2},{oxide:"Na2O",min:.3,max:.5,weight:2},{oxide:"CaO",min:.1,max:.3,weight:1},{oxide:"K2O",min:.05,max:.2,weight:1}],coneRange:[-6,2],atmosphere:"oxidation",surface:"gloss",keyMaterials:["ferro-frit-3124","ferro-frit-3134","silica","epk"],colorants:{"tin-oxide":{min:5,max:10}},notes:"Tin oxide at 5-10% gives opacity. Can substitute zircopax (10-15%) for tin.",tags:["majolica","maiolica","tin","white","opaque","low fire","earthenware","decorative","faience","delft"]},{id:"clear-cone6",name:"Clear Gloss (Cone 6)",aliases:["clear","transparent","clear gloss","liner","cone 6 clear"],family:"clear",description:"Workhorse clear glaze for mid-fire. Balanced flux, medium-high silica. Reliable base for stains and oxides.",targets:[{oxide:"SiO2",min:3.2,max:4,weight:3},{oxide:"Al2O3",min:.3,max:.4,weight:3},{oxide:"CaO",min:.3,max:.5,weight:2},{oxide:"Na2O",min:.1,max:.25,weight:1},{oxide:"K2O",min:.05,max:.2,weight:1},{oxide:"B2O3",min:.05,max:.15,weight:1},{oxide:"MgO",min:0,max:.15,weight:1}],coneRange:[5,7],atmosphere:"either",surface:"gloss",keyMaterials:["custer-feldspar","silica","whiting","epk","talc","ferro-frit-3134"],tags:["clear","transparent","gloss","functional","liner","cone 6","base"]},{id:"clear-cone10",name:"Clear Gloss (Cone 10)",aliases:["cone 10 clear","high fire clear","porcelain clear"],family:"clear",description:"High-fire clear — fewer fluxes needed since the temperature does the work. Feldspar-heavy with silica and whiting.",targets:[{oxide:"SiO2",min:3.5,max:4.5,weight:3},{oxide:"Al2O3",min:.35,max:.5,weight:3},{oxide:"CaO",min:.4,max:.6,weight:2},{oxide:"K2O",min:.15,max:.3,weight:2},{oxide:"Na2O",min:.05,max:.15,weight:1}],coneRange:[9,11],atmosphere:"either",surface:"gloss",keyMaterials:["custer-feldspar","silica","whiting","epk"],tags:["clear","transparent","gloss","cone 10","high fire","porcelain"]},{id:"clear-lowfire",name:"Clear Gloss (Low Fire)",aliases:["low fire clear","earthenware clear","cone 06 clear"],family:"clear",description:"Low-fire clear — relies on boron frits for melting. Standard earthenware liner glaze.",targets:[{oxide:"SiO2",min:1.8,max:2.8,weight:2},{oxide:"Al2O3",min:.1,max:.25,weight:2},{oxide:"B2O3",min:.3,max:.6,weight:3},{oxide:"Na2O",min:.25,max:.45,weight:2},{oxide:"CaO",min:.1,max:.4,weight:1}],coneRange:[-6,1],atmosphere:"oxidation",surface:"gloss",keyMaterials:["ferro-frit-3134","ferro-frit-3124","silica","epk"],tags:["clear","transparent","gloss","low fire","earthenware","frit","boron"]},{id:"matte-cone6-magnesia",name:"Magnesia Matte (Cone 6)",aliases:["magnesia matte","dolomite matte","buttery matte","satin matte"],family:"matte",description:"Smooth, buttery matte from high MgO. Dolomite or talc provide the magnesia. Silky surface, excellent for layering.",targets:[{oxide:"SiO2",min:2.8,max:3.5,weight:2},{oxide:"Al2O3",min:.35,max:.55,weight:2},{oxide:"MgO",min:.2,max:.4,weight:3},{oxide:"CaO",min:.2,max:.4,weight:2},{oxide:"K2O",min:.05,max:.2,weight:1},{oxide:"Na2O",min:.05,max:.2,weight:1}],coneRange:[5,7],atmosphere:"either",surface:"matte",keyMaterials:["custer-feldspar","silica","dolomite","talc","epk","whiting"],tags:["matte","magnesia","dolomite","talc","buttery","smooth","cone 6","satin"]},{id:"matte-cone6-calcium",name:"Calcium Matte (Cone 6)",aliases:["calcium matte","lime matte","whiting matte"],family:"matte",description:"Higher alumina, higher calcium produces a dry matte from devitrification. More textured than magnesia mattes.",targets:[{oxide:"SiO2",min:2.5,max:3.2,weight:2},{oxide:"Al2O3",min:.4,max:.6,weight:3},{oxide:"CaO",min:.5,max:.7,weight:3},{oxide:"K2O",min:.1,max:.25,weight:1},{oxide:"MgO",min:0,max:.1,weight:1}],coneRange:[5,7],atmosphere:"either",surface:"matte",keyMaterials:["custer-feldspar","silica","whiting","epk","wollastonite"],tags:["matte","calcium","lime","dry","textured","cone 6"]},{id:"matte-cone10",name:"Matte (Cone 10)",aliases:["cone 10 matte","high fire matte","stoneware matte"],family:"matte",description:"High-fire matte — excess alumina relative to silica creates a dry, velvety surface. Classic stoneware look.",targets:[{oxide:"SiO2",min:2.8,max:3.8,weight:2},{oxide:"Al2O3",min:.5,max:.75,weight:3},{oxide:"CaO",min:.4,max:.6,weight:2},{oxide:"K2O",min:.1,max:.25,weight:1},{oxide:"MgO",min:.05,max:.2,weight:1}],coneRange:[9,11],atmosphere:"either",surface:"matte",keyMaterials:["custer-feldspar","silica","whiting","epk","dolomite"],tags:["matte","cone 10","high fire","stoneware","dry","velvety"]},{id:"copper-red",name:"Copper Red (Sang de Boeuf)",aliases:["copper red","sang de boeuf","oxblood","flambe","jun","lang"],family:"copper",description:"Blood red from colloidal copper in heavy reduction. Very finicky — needs low alumina, alkaline flux, and precise reduction timing.",targets:[{oxide:"SiO2",min:3,max:4,weight:2},{oxide:"Al2O3",min:.2,max:.35,weight:3},{oxide:"CaO",min:.3,max:.5,weight:2},{oxide:"Na2O",min:.15,max:.35,weight:2},{oxide:"K2O",min:.1,max:.25,weight:1},{oxide:"B2O3",min:.1,max:.3,weight:2}],coneRange:[9,11],atmosphere:"reduction",surface:"gloss",keyMaterials:["custer-feldspar","silica","whiting","epk","ferro-frit-3134","bone-ash"],colorants:{"copper-carbonate":{min:.5,max:2},"tin-oxide":{min:1,max:3}},notes:"Tin oxide helps develop red. 1% copper typical. Boron flux helps. Heavy reduction between 1000-1100°C crucial.",tags:["copper","red","sang de boeuf","oxblood","flambe","reduction","technical","chinese"]},{id:"copper-green-cone6",name:"Copper Green (Cone 6)",aliases:["copper green","verdigris","patina green"],family:"copper",description:"Bright copper green in oxidation. Works well at cone 6 with alkaline flux.",targets:[{oxide:"SiO2",min:3,max:3.8,weight:2},{oxide:"Al2O3",min:.25,max:.4,weight:2},{oxide:"CaO",min:.25,max:.45,weight:2},{oxide:"Na2O",min:.15,max:.3,weight:2},{oxide:"K2O",min:.05,max:.2,weight:1},{oxide:"B2O3",min:.05,max:.2,weight:1}],coneRange:[5,7],atmosphere:"oxidation",surface:"gloss",keyMaterials:["custer-feldspar","silica","whiting","epk","ferro-frit-3134"],colorants:{"copper-carbonate":{min:2,max:5}},tags:["copper","green","cone 6","oxidation","bright"]},{id:"rutile-blue",name:"Rutile Blue",aliases:["rutile blue","floating blue","blue rutile"],family:"rutile",description:"Striking blue/tan variegation from rutile (TiO2) in a magnesia-flux base. The rutile causes phase separation and light scatter.",targets:[{oxide:"SiO2",min:3,max:3.8,weight:2},{oxide:"Al2O3",min:.3,max:.45,weight:2},{oxide:"MgO",min:.15,max:.35,weight:3},{oxide:"CaO",min:.25,max:.45,weight:2},{oxide:"Na2O",min:.1,max:.25,weight:1},{oxide:"K2O",min:.05,max:.2,weight:1}],coneRange:[5,7],atmosphere:"either",surface:"satin",keyMaterials:["custer-feldspar","silica","dolomite","talc","epk","whiting"],colorants:{rutile:{min:3,max:6},"cobalt-carbonate":{min:.5,max:2}},notes:"The blue comes from cobalt + rutile interaction. Without cobalt, rutile alone gives tan/amber.",tags:["rutile","blue","floating","variegated","magnesia","cone 6"]},{id:"chun-jun",name:"Chun / Jun Blue",aliases:["chun","jun","opalescent","phosphorus blue","blue chun"],family:"specialty",description:"Opalescent blue from phosphorus-induced phase separation. High P2O5 (from bone ash) creates milky blue opalescence in a high-fire base.",targets:[{oxide:"SiO2",min:3,max:4.5,weight:2},{oxide:"Al2O3",min:.25,max:.45,weight:2},{oxide:"CaO",min:.4,max:.65,weight:2},{oxide:"K2O",min:.1,max:.25,weight:1},{oxide:"P2O5",min:.05,max:.15,weight:3}],coneRange:[9,11],atmosphere:"reduction",surface:"gloss",keyMaterials:["custer-feldspar","silica","whiting","epk","bone-ash"],colorants:{"copper-carbonate":{min:.3,max:1}},notes:"Bone ash at 5-10% provides the P2O5. Very sensitive to thickness — thin areas clear, thick areas opalescent.",tags:["chun","jun","blue","opalescent","phosphorus","bone ash","chinese","song"]},{id:"cobalt-blue",name:"Cobalt Blue",aliases:["cobalt blue","blue","cobalt","traditional blue"],family:"specialty",description:"Classic cobalt blue — works at any temperature. 0.5-2% cobalt gives reliable blue in almost any base glaze.",targets:[{oxide:"SiO2",min:3,max:4,weight:2},{oxide:"Al2O3",min:.3,max:.45,weight:2},{oxide:"CaO",min:.3,max:.55,weight:2},{oxide:"K2O",min:.1,max:.25,weight:1},{oxide:"Na2O",min:.05,max:.2,weight:1}],coneRange:[5,11],atmosphere:"either",surface:"gloss",keyMaterials:["custer-feldspar","silica","whiting","epk"],colorants:{"cobalt-carbonate":{min:.5,max:2}},notes:"Cobalt is very strong — start with 0.5%. Zinc or magnesia can shift the shade.",tags:["cobalt","blue","reliable","any temperature","classic"]},{id:"white-satin-cone6",name:"White Satin (Cone 6)",aliases:["white satin","satin white","silky white","porcelain white"],family:"satin",description:"Soft, silky white with a gentle satin sheen. Balanced between matte and gloss — the modern functional pottery favorite.",targets:[{oxide:"SiO2",min:3,max:3.8,weight:2},{oxide:"Al2O3",min:.35,max:.5,weight:3},{oxide:"CaO",min:.25,max:.45,weight:2},{oxide:"MgO",min:.1,max:.25,weight:2},{oxide:"K2O",min:.05,max:.2,weight:1},{oxide:"Na2O",min:.05,max:.2,weight:1}],coneRange:[5,7],atmosphere:"either",surface:"satin",keyMaterials:["custer-feldspar","silica","whiting","epk","talc","zinc-oxide"],colorants:{zircopax:{min:5,max:12}},notes:"Add 5-10% zircopax for extra whiteness, but it can work without.",tags:["white","satin","smooth","functional","cone 6","pottery"]},{id:"crawl-texture",name:"Crawl / Lichen Texture",aliases:["crawl","lichen","texture","volcanic","crater"],family:"specialty",description:"Intentional crawling/beading for decorative texture. High magnesia + high alumina + thick application promotes crawl.",targets:[{oxide:"SiO2",min:2.2,max:3,weight:2},{oxide:"Al2O3",min:.5,max:.8,weight:3},{oxide:"MgO",min:.3,max:.5,weight:3},{oxide:"CaO",min:.1,max:.3,weight:1},{oxide:"K2O",min:.05,max:.2,weight:1}],coneRange:[5,10],atmosphere:"either",surface:"crawl",keyMaterials:["epk","ball-clay","magnesium-carbonate","talc","custer-feldspar","silica"],notes:"Apply very thick (double or triple normal thickness). Magnesium carbonate in raw form promotes maximum crawl.",tags:["crawl","lichen","texture","volcanic","crater","decorative","thick"]}];function X(i){const t=i.toLowerCase().split(/\s+/).filter(Boolean);return t.length===0?[]:A.map(n=>{let r=0;for(const s of t)n.name.toLowerCase().includes(s)&&(r+=10),n.aliases.some(o=>o.includes(s))&&(r+=8),n.tags.some(o=>o.includes(s))&&(r+=5),n.family.includes(s)&&(r+=6),n.description.toLowerCase().includes(s)&&(r+=2);return{archetype:n,score:r}}).filter(n=>n.score>0).sort((n,r)=>r.score-n.score).map(n=>n.archetype)}function J(i){return A.filter(t=>i>=t.coneRange[0]&&i<=t.coneRange[1])}function T(i){return{"-6":1566,"-5":1607,"-4":1650,"-3":1683,"-2":1706,"-1":1728,0:1750,1:1787,2:1814,3:1841,4:1868,5:1888,6:2232,7:2264,8:2300,9:2336,10:2381,11:2399,12:2419,13:2455}[String(i)]??(i<=1?1800:i<=7?2250:2350)}function w(i){return Math.round((i-32)*5/9)}function ee(i){return{id:"bisque",name:"Bisque Fire (Cone 06)",description:"Standard bisque firing to prepare ware for glazing.",atmosphere:"oxidation",cone:-6,segments:[{tempF:200,tempC:93,rateF:100,holdMinutes:0,note:"Slow start — drive off remaining moisture"},{tempF:400,tempC:204,rateF:150,holdMinutes:0,note:"Quartz inversion zone — go slowly"},{tempF:1e3,tempC:538,rateF:200,holdMinutes:0,note:"Burnout phase — organics and carbon leave the clay"},{tempF:1100,tempC:593,rateF:100,holdMinutes:15,note:"Quartz inversion (1063°F) — hold to equalize"},{tempF:1828,tempC:998,rateF:250,holdMinutes:10,note:"Final temperature — cone 06"}],tips:["Ensure all ware is completely dry before firing.","Candle (hold at 200°F) overnight if pieces are thick or recently made.","Leave the kiln lid cracked until 1000°F to let moisture escape."]}}function ie(i){const t=T(i),a=[{tempF:250,tempC:w(250),rateF:150,holdMinutes:0,note:"Warm up — drive off glaze moisture"},{tempF:1e3,tempC:w(1e3),rateF:300,holdMinutes:0,note:"Medium ramp through early sintering"},{tempF:t-200,tempC:w(t-200),rateF:250,holdMinutes:0,note:"Approach to maturity"},{tempF:t,tempC:w(t),rateF:150,holdMinutes:10,note:`Final temperature — cone ${i}. Soak for even heat.`}];return i>=5&&a.push({tempF:t-200,tempC:w(t-200),rateF:-150,holdMinutes:0,note:"Controlled cool through crystal formation range"}),{id:`oxidation-c${i}`,name:`Oxidation Glaze Fire (Cone ${i})`,description:`Standard oxidation glaze fire to cone ${i}.`,atmosphere:"oxidation",cone:i,segments:a,tips:["Use witness cones to verify temperature.","Soak time at top temperature helps even out hot/cold spots.",i>=5?"For more matte/satin surfaces, slow-cool through 2000-1800°F.":"","Do not open the kiln until below 200°F to avoid thermal shock."].filter(Boolean)}}function ae(i){const t=T(i),a=i>=8?1650:1550;return{id:`reduction-c${i}`,name:`Reduction Glaze Fire (Cone ${i})`,description:`Gas reduction fire to cone ${i}. Body reduction begins around cone 010 (${a}°F).`,atmosphere:"reduction",cone:i,segments:[{tempF:250,tempC:w(250),rateF:150,holdMinutes:0,note:"Warm up — oxidation atmosphere"},{tempF:1e3,tempC:w(1e3),rateF:300,holdMinutes:0,note:"Medium ramp — still in oxidation"},{tempF:a,tempC:w(a),rateF:200,holdMinutes:15,note:"Begin body reduction — close damper, increase gas"},{tempF:t-200,tempC:w(t-200),rateF:200,holdMinutes:0,note:"Continue medium reduction"},{tempF:t,tempC:w(t),rateF:120,holdMinutes:15,note:`Final temperature — cone ${i}. Heavy reduction for last 15 min.`}],tips:["Body reduction (around cone 010) converts iron in the clay body.","Adjust damper to see light flame at the peep holes for reduction.","Heavy reduction at the end locks in color development.","For copper reds, maintain strong reduction from cone 010 to finish.","Too early or too heavy reduction can cause bloating."]}}function te(i){const t=T(i);return{id:`crystalline-c${i}`,name:`Crystalline Glaze Fire (Cone ${i})`,description:"Specialized firing for zinc-silicate crystal growth. Requires precise temperature control.",atmosphere:"oxidation",cone:i,segments:[{tempF:250,tempC:w(250),rateF:200,holdMinutes:0,note:"Warm up"},{tempF:1e3,tempC:w(1e3),rateF:400,holdMinutes:0,note:"Fast ramp through early phases"},{tempF:t,tempC:w(t),rateF:300,holdMinutes:5,note:`Peak temperature — cone ${i}. Brief soak to mature glaze.`},{tempF:2050,tempC:w(2050),rateF:-999,holdMinutes:0,note:"Crash cool to crystal seeding range (fast as possible)"},{tempF:2050,tempC:w(2050),rateF:0,holdMinutes:120,note:"Crystal growth hold #1 — 2 hours at 2050°F"},{tempF:1950,tempC:w(1950),rateF:-25,holdMinutes:60,note:"Crystal growth hold #2 — slow descent, 1 hour"},{tempF:1100,tempC:w(1100),rateF:-100,holdMinutes:15,note:"Anneal — hold to relieve glass stress"}],tips:["Use a drip catch (pedestal + catch plate) — crystalline glazes run heavily.","Crystal growth happens during the controlled cool between 2050-1950°F.","Longer holds produce larger crystals.","Precise temperature control is critical — use a programmable controller.","Zinc carbonate or zinc oxide at 25-35% is typical."]}}function ne(i,t,a){const n=[];let r;a==="crystalline"?(r=te(i),n.push("Crystalline glazes require a programmable kiln controller for the controlled cooling phases.")):t==="reduction"?(r=ae(i),n.push("Reduction firing requires a fuel-burning kiln (gas, wood, etc.).")):(r=ie(i),i>=5&&n.push("For satin/matte surfaces, extend the cooling phase between 2000-1800°F."));const s=ee();return a==="shino"&&n.push("Some shino glazes benefit from a carbon trap — early reduction around cone 012."),a==="ash"&&n.push("Ash glazes can be unpredictable. Test tiles with varying thicknesses."),a==="copper"&&n.push("Copper red development requires consistent reduction from body reduction through top temperature."),{glazeFire:r,bisqueFire:s,notes:n}}const re=[{category:"Potash Feldspar",members:[{name:"Custer Feldspar",aliases:["Custer"],ratio:1},{name:"G-200 Feldspar",aliases:["G200","G-200"],ratio:1,notes:"Slightly higher K₂O"},{name:"G-200 HP",aliases:["G200HP","G-200 HP"],ratio:1},{name:"Minspar 200",aliases:["Minspar"],ratio:1,notes:"Slightly more Na₂O than Custer"},{name:"Mahavir Feldspar",aliases:["Mahavir"],ratio:1}]},{category:"Soda Feldspar",members:[{name:"Nepheline Syenite",aliases:["Neph Sy","Nepheline"],ratio:.75,notes:"Much higher in Na₂O, melts more aggressively — reduce by ~25%"},{name:"F-4 Feldspar",aliases:["F4"],ratio:1},{name:"Kona F-4",aliases:["Kona"],ratio:1}]},{category:"Kaolin / China Clay",members:[{name:"EPK Kaolin",aliases:["EPK","Edgar Plastic Kaolin"],ratio:1},{name:"Grolleg Kaolin",aliases:["Grolleg"],ratio:1,notes:"Whiter, less plastic. Preferred for porcelain."},{name:"Tile #6",aliases:["Tile 6"],ratio:1,notes:"More plastic. May shrink slightly more."},{name:"Helmer Kaolin",aliases:["Helmer"],ratio:1},{name:"Calcined Kaolin",aliases:["Glomax"],ratio:1,notes:"No plasticity. Used when shrinkage must be minimized."}]},{category:"Ball Clay",members:[{name:"OM-4 Ball Clay",aliases:["OM4","OM-4"],ratio:1},{name:"Old Hickory #5",aliases:["Old Hickory"],ratio:1},{name:"XX Sagger",aliases:["XX Sagger Ball Clay"],ratio:1},{name:"Foundry Hill Creme",aliases:["FHC"],ratio:1,notes:"Lower iron than OM-4"}]},{category:"Silica",members:[{name:"Silica",aliases:["Flint","Quartz","SiO₂"],ratio:1},{name:"Fine Silica",aliases:["200 mesh silica"],ratio:1,notes:"Finer grind dissolves faster into the melt"}]},{category:"Calcium Source",members:[{name:"Whiting",aliases:["Calcium Carbonate","CaCO₃"],ratio:1},{name:"Wollastonite",aliases:["CaSiO₃"],ratio:1.4,notes:"Also adds SiO₂ — adjust silica down. No LOI (no gas release)."},{name:"Dolomite",aliases:[],ratio:1,notes:"Also brings MgO — adds a different quality to the melt."}]},{category:"Magnesium Source",members:[{name:"Talc",aliases:["Magnesium Silicate"],ratio:1},{name:"Dolomite",aliases:[],ratio:.8,notes:"Also brings CaO."},{name:"Magnesium Carbonate",aliases:["MgCO₃","Mag Carb"],ratio:.45,notes:"Pure MgO source. Higher LOI."}]},{category:"Boron Frit",members:[{name:"Ferro Frit 3134",aliases:["Frit 3134","FF3134"],ratio:1,notes:"High boron, no alumina. Major low/mid-fire flux."},{name:"Ferro Frit 3124",aliases:["Frit 3124","FF3124"],ratio:1,notes:"Contains alumina. Less fluid than 3134."},{name:"Ferro Frit 3195",aliases:["Frit 3195","FF3195"],ratio:.95,notes:"Similar to 3124 but slightly different soda/boron balance."}]},{category:"Alumina Source",members:[{name:"Alumina Hydrate",aliases:["Al(OH)₃"],ratio:1},{name:"Calcined Alumina",aliases:["Al₂O₃"],ratio:.65,notes:"No LOI — use about 65% of the alumina hydrate amount."}]},{category:"Lithium Source",members:[{name:"Spodumene",aliases:[],ratio:1},{name:"Petalite",aliases:[],ratio:1.3,notes:"Lower Li₂O, higher SiO₂. Adjust silica down."},{name:"Lithium Carbonate",aliases:["Li₂CO₃"],ratio:.25,notes:"Concentrated lithium — use much less. Very active flux."}]},{category:"Barium Source",members:[{name:"Barium Carbonate",aliases:["BaCO₃"],ratio:1,notes:"Toxic — handle with care. Creates satin/matte surfaces."}]},{category:"Zinc Source",members:[{name:"Zinc Oxide",aliases:["ZnO"],ratio:1}]},{category:"Strontium Source",members:[{name:"Strontium Carbonate",aliases:["SrCO₃"],ratio:1,notes:"Safe barium substitute for some matte effects."}]},{category:"Ash",members:[{name:"Mixed Hardwood Ash",aliases:["Wood Ash","Hardwood Ash"],ratio:1},{name:"Softwood Ash",aliases:["Pine Ash"],ratio:1.1,notes:"Higher in K₂O, lower in CaO. Slightly more flux."},{name:"Synthetic Ash",aliases:[],ratio:1,notes:"Mix of whiting, silica, and feldspar. More consistent than real ash."}]}];function z(i){return i.toLowerCase().replace(/[^a-z0-9]/g,"")}function oe(i){const t=z(i);for(const a of re)for(let n=0;n<a.members.length;n++){const r=a.members[n];if(z(r.name)===t)return{group:a,memberIndex:n};for(const s of r.aliases)if(z(s)===t)return{group:a,memberIndex:n}}return null}function se(i){const t=oe(i);if(!t)return[];const{group:a,memberIndex:n}=t,r=a.members[n],s=[];for(let o=0;o<a.members.length;o++){if(o===n)continue;const d=a.members[o],m=d.ratio/r.ratio,p=Math.round(m*100);let u;Math.abs(m-1)<.02?u="Use the same amount":m<1?u=`Use ${p}% of the original amount`:u=`Use ${p}% of the original amount (more needed)`;const g=Math.abs(m-1)<.05?1:Math.abs(m-1)<.3?2:3;s.push({original:r.name,substitute:d.name,adjustment:u,reason:d.notes??`Both are ${a.category.toLowerCase()} materials with similar chemistry.`,quality:g})}return s.sort((o,d)=>o.quality-d.quality),s}function le(i){const t=new Map;for(const a of i){const n=se(a);n.length>0&&t.set(a,n)}return t}const M={"high-fire":["custer-feldspar","silica","epk","whiting","dolomite","talc","ball-clay","nepheline-syenite","wollastonite"],"mid-fire":["custer-feldspar","silica","epk","whiting","talc","zinc-oxide","ferro-frit-3134","ferro-frit-3124","dolomite","nepheline-syenite","wollastonite"],"low-fire":["ferro-frit-3134","ferro-frit-3124","ferro-frit-3110","silica","epk","whiting","ball-clay"],crystalline:["zinc-oxide","silica","ferro-frit-3110","lithium-carbonate","custer-feldspar","bone-ash"]},ce={celadon:["custer-feldspar","silica","whiting","epk"],shino:["nepheline-syenite","spodumene","epk","silica","ball-clay"],ash:["custer-feldspar","silica","whiting","epk","dolomite","bone-ash"],crystalline:["zinc-oxide","silica","ferro-frit-3110","lithium-carbonate"],majolica:["ferro-frit-3124","ferro-frit-3134","silica","epk"],copper:["custer-feldspar","silica","whiting","epk","ferro-frit-3134","bone-ash"]},de={"red-iron-oxide":"warm amber to dark brown (light → heavy amounts)","copper-carbonate":"green in oxidation, red in reduction","cobalt-carbonate":"strong blue (small amounts go a long way)","cobalt-oxide":"intense blue (half the amount of carbonate)","manganese-dioxide":"purple-brown, metallic in reduction","chrome-oxide":"green; pink with tin in low-temperature zinc glazes","nickel-oxide":"gray-green to brown; blue with zinc",rutile:"tan/amber crystalline streaks; blue with cobalt","titanium-dioxide":"opacifier; crystalline effects in higher amounts","tin-oxide":"white opacifier; promotes copper red development",zircopax:"white opacifier; softer than tin","iron-chromate":"gray-brown muted tones"};function R(i){const t=performance.now(),{query:a,maxSuggestions:n=3,method:r="gradient"}=i,s=V(a);let o=me(s);if(o.length===0)return{query:s,suggestions:[],status:"no-match",message:we(s),durationMs:performance.now()-t};if(s.cone!==null){const u=o.filter(g=>s.cone>=g.coneRange[0]&&s.cone<=g.coneRange[1]);u.length>0&&(o=u)}if(s.atmosphere){const u=o.filter(g=>g.atmosphere===s.atmosphere||g.atmosphere==="either");u.length>0&&(o=u)}o=o.slice(0,n+2);const d=[];for(const u of o){const g=he(u,s,i,r);g&&d.push(g)}d.sort((u,g)=>g.relevance-u.relevance);const m=d.slice(0,n),p=performance.now()-t;return{query:s,suggestions:m,status:m.length>0?"success":"partial",message:m.length>0?`Found ${m.length} recipe suggestion${m.length>1?"s":""} for "${a}"`:`Could generate partial results for "${a}" — try being more specific.`,durationMs:p}}function me(i){const t=[...i.glazeTerms,...i.colors,...i.tags].join(" ");let a=X(t);return a.length===0&&i.cone!==null&&(a=J(i.cone)),i.surface&&a.length===0&&(a=A.filter(n=>n.surface===i.surface)),a}function ue(i,t,a){if(a&&a.length>=3)return a;const n=new Set(i.keyMaterials),r=ce[i.family];if(r)for(const m of r)n.add(m);const s=t.cone??(i.coneRange[0]+i.coneRange[1])/2;let o;s<=1?o=M["low-fire"]:s<=7?o=M["mid-fire"]:o=M["high-fire"],i.family==="crystalline"&&(o=M.crystalline);for(const m of o)n.add(m);const d=[];for(const m of n){const p=k.resolve(m)??k.getMaterial(m);p&&d.push(p.id)}return d}function he(i,t,a,n){const r=ue(i,t,a.availableMaterials);if(r.length<2)return null;const s=ge(i.targets,t.cone,i.coneRange),o={resolve(c){return k.resolve(c)??k.getMaterial(c)??null},getAnalysis(c){return k.getAnalysis(c)}};let d;try{n==="genetic"?d=B({materialIds:r,targets:s,populationSize:60,generations:150,tolerance:.03},o).best:d=P({materialIds:r,targets:s,maxIterations:2e3,tolerance:.03},o)}catch(c){return console.warn("Optimizer failed for archetype:",i.name,c),null}const m=pe(i,t,d),p=xe(i),u=fe(i,t,d,p),g=be(i,t,d),y=t.cone??Math.round((i.coneRange[0]+i.coneRange[1])/2),x=(t.atmosphere??i.atmosphere)==="reduction"?"reduction":"oxidation",O=ne(y,x,i.family),C=le(d.materialNames),j=H({materialNames:d.materialNames,oxideSymbols:s.map(c=>c.oxide),surfaceType:i.surface,atmosphere:i.atmosphere,glazeFamily:i.family,coneRange:i.coneRange});return{archetype:i,recipe:d,materialIds:r,colorants:p,relevance:m,explanation:u,warnings:g,firingSchedule:O,substitutions:C,digitalfireRefs:j}}function ge(i,t,a){if(t===null)return i;const n=(a[0]+a[1])/2,r=t-n;if(Math.abs(r)<2)return i;const s=1+r*.02;return i.map(o=>o.oxide==="SiO2"||o.oxide==="Al2O3"?{...o,target:o.target?o.target*s:void 0,min:o.min?o.min*s:void 0,max:o.max?o.max*s:void 0}:o)}function pe(i,t,a){let n=.3;if(n+=t.confidence*.2,a.converged)n+=.3;else{const r=a.targetResults.filter(s=>s.satisfied).length/Math.max(a.targetResults.length,1);n+=r*.2}return t.cone!==null&&t.cone>=i.coneRange[0]&&t.cone<=i.coneRange[1]&&(n+=.1),t.atmosphere&&(i.atmosphere===t.atmosphere||i.atmosphere==="either")&&(n+=.1),Math.min(n,1)}function xe(i){return i.colorants?Object.entries(i.colorants).map(([t,a])=>{const n=k.resolve(t)??k.getMaterial(t);return{materialId:t,materialName:(n==null?void 0:n.primaryName)??t.replace(/-/g," "),minPercent:a.min,maxPercent:a.max,effect:de[t]??"color addition"}}):[]}function fe(i,t,a,n){const r=[];if(r.push(i.description),a.converged)r.push("The optimizer found a recipe that meets all UMF targets.");else{const s=a.targetResults.filter(d=>d.satisfied).length,o=a.targetResults.length;r.push(`The optimizer met ${s}/${o} oxide targets. Minor adjustments may improve results.`)}if(n.length>0){const s=n.map(o=>`${o.minPercent}-${o.maxPercent}% ${o.materialName} (${o.effect})`).join("; ");r.push(`Recommended additions: ${s}`)}return i.notes&&r.push(i.notes),r.join(`

`)}function be(i,t,a){const n=[];if(t.cone!==null&&(t.cone<i.coneRange[0]||t.cone>i.coneRange[1])&&n.push(`This glaze type is typically fired at cone ${i.coneRange[0]}-${i.coneRange[1]}, but you requested cone ${t.cone}. Results may vary.`),i.atmosphere==="reduction"&&t.atmosphere==="oxidation"&&n.push("This glaze traditionally requires reduction firing. In oxidation, the color will be different."),a.converged||n.push("The optimizer didn't fully converge. Try adding more materials or adjusting targets."),i.family==="crystalline"){const r=a.umf.Al2O3??0;if(r>.1){const s=K("crystalline"),o=s?` See: ${s.url}`:"";n.push(`Al2O3 at ${r.toFixed(2)} is too high for crystal growth — target is under 0.08. Remove clay or alumina-bearing materials.${o}`)}}return n}function we(i){const t=[`Couldn't find a glaze archetype matching "${i.raw}".`];return t.push(`
Try describing what you want with terms like:`),t.push("  • A glaze type: celadon, tenmoku, shino, majolica, crystalline..."),t.push("  • A surface: gloss, satin, matte, crawl..."),t.push("  • A color: blue, green, white, copper red..."),t.push('  • A cone: "at cone 6", "cone 10", "low fire"...'),t.push("  • An atmosphere: oxidation, reduction..."),t.push(`
Examples:`),t.push('  "celadon at cone 10"'),t.push('  "matte white stoneware cone 6"'),t.push('  "floating blue satin"'),t.push('  "copper red reduction"'),t.join(`
`)}const ye=["celadon at cone 10","copper red reduction","floating blue satin cone 6","matte white stoneware","crystalline zinc glaze","tenmoku hare's fur","majolica low fire","shino carbon trap","cobalt blue cone 6","magnesia matte","ash glaze cone 10"];function $e(){L("Recipe Suggestions");const[i,t]=b.useState(""),[a,n]=b.useState(null),[r,s]=b.useState(!1),[o,d]=b.useState("gradient"),[m,p]=b.useState(3),[u,g]=b.useState(null),[y,h]=b.useState(null),x=b.useRef(null);b.useEffect(()=>{var c;(c=x.current)==null||c.focus()},[]);const O=b.useCallback(c=>{c==null||c.preventDefault(),!(!i.trim()||r)&&(s(!0),g(null),setTimeout(()=>{const f=R({query:i.trim(),method:o,maxSuggestions:m});n(f),s(!1),f.suggestions.length>0&&g(0)},50))},[i,o,m,r]),C=b.useCallback(c=>{t(c),n(null),setTimeout(()=>{s(!0),setTimeout(()=>{const f=R({query:c,method:o,maxSuggestions:m});n(f),s(!1),f.suggestions.length>0&&g(0)},50)},100)},[o,m]),j=b.useCallback((c,f)=>{if(!a||!a.suggestions[c])return;const S=`${a.suggestions[c].archetype.name} ${f}`;t(S),h(null),s(!0),setTimeout(()=>{const N=R({query:S,method:o,maxSuggestions:m});n(N),s(!1),N.suggestions.length>0&&g(0)},50)},[a,o,m]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:G}),e.jsx("style",{children:Oe}),e.jsxs("div",{className:"calc-page",children:[e.jsxs("div",{className:"calc-sidebar",children:[e.jsxs("div",{className:"calc-section",children:[e.jsx("h3",{children:"Describe Your Glaze"}),e.jsxs("form",{onSubmit:O,className:"suggestion-form",children:[e.jsx("input",{ref:x,type:"text",value:i,onChange:c=>t(c.target.value),placeholder:'e.g. "celadon at cone 10"',className:"suggestion-input",disabled:r}),e.jsx("button",{type:"submit",className:"suggestion-submit",disabled:!i.trim()||r,children:r?"Thinking...":"Suggest Recipes"})]})]}),e.jsxs("div",{className:"calc-section",children:[e.jsx("h3",{children:"Options"}),e.jsxs("div",{className:"option-row",children:[e.jsx("label",{children:"Method"}),e.jsxs("select",{value:o,onChange:c=>d(c.target.value),children:[e.jsx("option",{value:"gradient",children:"Gradient (fast)"}),e.jsx("option",{value:"genetic",children:"Genetic (diverse)"})]})]}),e.jsxs("div",{className:"option-row",children:[e.jsx("label",{children:"Max Results"}),e.jsxs("select",{value:m,onChange:c=>p(Number(c.target.value)),children:[e.jsx("option",{value:1,children:"1"}),e.jsx("option",{value:3,children:"3"}),e.jsx("option",{value:5,children:"5"})]})]})]}),e.jsxs("div",{className:"calc-section",children:[e.jsx("h3",{children:"Try These"}),e.jsx("div",{className:"example-grid",children:ye.map(c=>e.jsx("button",{className:"example-chip",onClick:()=>C(c),disabled:r,children:c},c))})]}),a&&e.jsxs("div",{className:"calc-section",children:[e.jsx("h3",{children:"Understood"}),e.jsxs("div",{className:"parsed-query",children:[a.query.glazeTerms.length>0&&e.jsxs("div",{className:"parsed-row",children:[e.jsx("span",{className:"parsed-label",children:"Type:"}),e.jsx("span",{children:a.query.glazeTerms.join(", ")})]}),a.query.cone!==null&&e.jsxs("div",{className:"parsed-row",children:[e.jsx("span",{className:"parsed-label",children:"Cone:"}),e.jsx("span",{children:a.query.cone<0?`0${Math.abs(a.query.cone)}`:a.query.cone})]}),a.query.atmosphere&&e.jsxs("div",{className:"parsed-row",children:[e.jsx("span",{className:"parsed-label",children:"Atmosphere:"}),e.jsx("span",{children:a.query.atmosphere})]}),a.query.surface&&e.jsxs("div",{className:"parsed-row",children:[e.jsx("span",{className:"parsed-label",children:"Surface:"}),e.jsx("span",{children:a.query.surface})]}),a.query.colors.length>0&&e.jsxs("div",{className:"parsed-row",children:[e.jsx("span",{className:"parsed-label",children:"Color:"}),e.jsx("span",{children:a.query.colors.join(", ")})]}),e.jsxs("div",{className:"parsed-row",children:[e.jsx("span",{className:"parsed-label",children:"Confidence:"}),e.jsxs("span",{className:`confidence-badge ${a.query.confidence>.6?"high":a.query.confidence>.3?"medium":"low"}`,children:[Math.round(a.query.confidence*100),"%"]})]})]})]})]}),e.jsxs("div",{className:"calc-main",children:[!a&&!r&&e.jsxs("div",{className:"suggestion-empty",children:[e.jsx("div",{className:"empty-icon",children:"🎨"}),e.jsx("h2",{children:"AI Recipe Suggestions"}),e.jsx("p",{children:"Describe the glaze you want in plain language. The engine will match your description to known glaze archetypes, select appropriate materials, and optimize a recipe for you."}),e.jsxs("p",{className:"empty-hint",children:["Try: ",e.jsx("em",{children:'"celadon at cone 10"'})," or ",e.jsx("em",{children:'"floating blue satin cone 6"'})]})]}),r&&e.jsxs("div",{className:"suggestion-loading",children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{children:"Matching archetypes and optimizing recipes..."})]}),a&&!r&&e.jsxs("div",{className:"suggestion-results",children:[e.jsxs("div",{className:"results-header",children:[e.jsx("h2",{children:a.message}),e.jsxs("span",{className:"results-timing",children:[a.durationMs.toFixed(0),"ms"]})]}),a.status==="no-match"&&e.jsx("div",{className:"no-match-help",children:e.jsx("pre",{children:a.message})}),a.suggestions.map((c,f)=>e.jsx(ve,{suggestion:c,index:f,expanded:u===f,onToggle:()=>g(u===f?null:f),refinement:(y==null?void 0:y.idx)===f?y.text:null,onRefineStart:()=>h({idx:f,text:""}),onRefineChange:F=>h({idx:f,text:F}),onRefineSubmit:()=>y&&j(f,y.text),onRefineCancel:()=>h(null)},c.archetype.id))]})]})]})]})}function ve({suggestion:i,index:t,expanded:a,onToggle:n,refinement:r,onRefineStart:s,onRefineChange:o,onRefineSubmit:d,onRefineCancel:m}){const{archetype:p,recipe:u,colorants:g,relevance:y,explanation:h,warnings:x,firingSchedule:O,substitutions:C,digitalfireRefs:j}=i,[c,f]=b.useState(!1),[F,S]=b.useState(!1),N=b.useMemo(()=>u.materialNames.map((l,v)=>({name:l,weight:u.weights[v]})).filter(l=>l.weight>.5).sort((l,v)=>v.weight-l.weight),[u]),E=b.useMemo(()=>N.reduce((l,v)=>l+v.weight,0),[N]);return e.jsxs("div",{className:`suggestion-card ${a?"expanded":""}`,children:[e.jsxs("div",{className:"card-header",onClick:n,children:[e.jsxs("div",{className:"card-rank",children:["#",t+1]}),e.jsxs("div",{className:"card-title",children:[e.jsx("h3",{children:p.name}),e.jsxs("div",{className:"card-badges",children:[e.jsx("span",{className:"badge surface",children:p.surface}),e.jsxs("span",{className:"badge cone",children:["Cone ",p.coneRange[0],"â€“",p.coneRange[1]]}),e.jsx("span",{className:"badge atmosphere",children:p.atmosphere}),u.converged&&e.jsx("span",{className:"badge converged",children:"Converged"}),e.jsxs("span",{className:`badge relevance ${y>.7?"high":y>.4?"medium":"low"}`,children:[Math.round(y*100),"% match"]})]})]}),e.jsx("div",{className:"card-expand",children:a?"â–¼":"â–¶"})]}),a&&e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"card-section",children:[e.jsx("h4",{children:"Suggested Recipe"}),e.jsxs("table",{className:"recipe-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Material"}),e.jsx("th",{children:"%"})]})}),e.jsxs("tbody",{children:[N.map(l=>e.jsxs("tr",{children:[e.jsx("td",{children:l.name}),e.jsx("td",{children:l.weight.toFixed(1)})]},l.name)),e.jsxs("tr",{className:"recipe-total",children:[e.jsx("td",{children:"Total"}),e.jsx("td",{children:E.toFixed(1)})]})]})]})]}),g.length>0&&e.jsxs("div",{className:"card-section",children:[e.jsx("h4",{children:"Add (on top of 100%)"}),e.jsxs("table",{className:"recipe-table colorant-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Colorant"}),e.jsx("th",{children:"Amount"}),e.jsx("th",{children:"Effect"})]})}),e.jsx("tbody",{children:g.map(l=>e.jsxs("tr",{children:[e.jsx("td",{children:l.materialName}),e.jsxs("td",{children:[l.minPercent,"â€“",l.maxPercent,"%"]}),e.jsx("td",{className:"colorant-effect",children:l.effect})]},l.materialId))})]})]}),e.jsxs("div",{className:"card-section",children:[e.jsx("h4",{children:"Resulting UMF"}),e.jsx("div",{className:"umf-grid",children:u.targetResults.map(l=>{var v,q;return e.jsxs("div",{className:`umf-cell ${l.satisfied?"satisfied":"off-target"}`,children:[e.jsx("span",{className:"umf-oxide",children:e.jsx(W,{oxide:l.oxide})}),e.jsx("span",{className:"umf-value",children:l.actual.toFixed(3)}),e.jsx("span",{className:"umf-target",children:l.target!==null?`target: ${l.target.toFixed(2)}`:`${((v=l.min)==null?void 0:v.toFixed(2))??"?"}â€“${((q=l.max)==null?void 0:q.toFixed(2))??"?"}`}),e.jsx("span",{className:`umf-status ${l.satisfied?"ok":"miss"}`,children:l.satisfied?"âœ“":`Î”${l.delta>0?"+":""}${l.delta.toFixed(3)}`})]},l.oxide)})})]}),e.jsxs("div",{className:"card-section",children:[e.jsx("h4",{children:"About This Glaze"}),e.jsx("div",{className:"explanation",children:h.split(`

`).map((l,v)=>e.jsx("p",{children:l},v))})]}),x.length>0&&e.jsxs("div",{className:"card-section",children:[e.jsx("h4",{children:"Notes & Warnings"}),e.jsx("ul",{className:"warnings-list",children:x.map((l,v)=>e.jsxs("li",{className:"warning-item",children:["âš  ",l]},v))})]}),j&&j.length>0&&e.jsxs("div",{className:"card-section",children:[e.jsx("h4",{children:"Learn More"}),e.jsx("div",{className:"df-refs-list",children:j.slice(0,4).map((l,v)=>e.jsxs("a",{href:l.url,target:"_blank",rel:"noopener noreferrer",className:"df-ref-link",children:[e.jsx("span",{className:"df-ref-category",children:l.category}),e.jsx("span",{className:"df-ref-name",children:l.title}),e.jsx("span",{className:"df-ref-arrow",children:"→"})]},l.url+v))}),e.jsxs("p",{className:"df-attribution-line",children:["Source: ",e.jsx("a",{href:"https://digitalfire.com",target:"_blank",rel:"noopener noreferrer",children:"Tony Hansen, Digitalfire Reference Library"})]})]}),O&&e.jsxs("div",{className:"card-section",children:[e.jsxs("h4",{className:"section-toggle",onClick:()=>f(!c),children:["Firing Schedule ",c?"▼":"▶"]}),c&&e.jsx(je,{recommendation:O})]}),C.size>0&&e.jsxs("div",{className:"card-section",children:[e.jsxs("h4",{className:"section-toggle",onClick:()=>S(!F),children:["Material Substitutions ",F?"â–¼":"â–¶"]}),F&&e.jsx(ke,{substitutions:C})]}),e.jsx("div",{className:"card-section refine-section",children:r===null?e.jsx("button",{className:"refine-btn",onClick:s,children:"Refine This Recipe"}):e.jsxs("div",{className:"refine-form",children:[e.jsx("p",{className:"refine-hint",children:'Add constraints, e.g. "more matte", "at cone 6", "without zinc"'}),e.jsxs("div",{className:"refine-row",children:[e.jsx("input",{type:"text",value:r,onChange:l=>o(l.target.value),placeholder:"e.g. more matte, without zinc",className:"refine-input",onKeyDown:l=>l.key==="Enter"&&d(),autoFocus:!0}),e.jsx("button",{className:"refine-submit",onClick:d,disabled:!r.trim(),children:"Go"}),e.jsx("button",{className:"refine-cancel",onClick:m,children:"Cancel"})]})]})})]})]})}function je({recommendation:i}){const{glazeFire:t,bisqueFire:a,notes:n}=i,[r,s]=b.useState(!1);return e.jsxs("div",{className:"firing-panel",children:[e.jsx($,{schedule:t}),a&&e.jsxs("div",{className:"bisque-toggle",children:[e.jsxs("button",{className:"toggle-btn",onClick:()=>s(!r),children:[r?"Hide":"Show"," Bisque Schedule"]}),r&&e.jsx($,{schedule:a})]}),n.length>0&&e.jsx("ul",{className:"firing-notes",children:n.map((o,d)=>e.jsx("li",{children:o},d))})]})}function $({schedule:i}){return e.jsxs("div",{className:"schedule-block",children:[e.jsx("div",{className:"schedule-name",children:i.name}),e.jsx("p",{className:"schedule-desc",children:i.description}),e.jsxs("table",{className:"recipe-table firing-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Temp (Â°F / Â°C)"}),e.jsx("th",{children:"Rate"}),e.jsx("th",{children:"Hold"}),e.jsx("th",{children:"Note"})]})}),e.jsx("tbody",{children:i.segments.map((t,a)=>e.jsxs("tr",{children:[e.jsxs("td",{className:"temp-cell",children:[t.tempF,"Â°F / ",t.tempC,"Â°C"]}),e.jsx("td",{children:t.rateF===0?"Hold":t.rateF===-999?"Crash cool":t.rateF<0?`${Math.abs(t.rateF)}Â°F/hr â†“`:`${t.rateF}Â°F/hr`}),e.jsx("td",{children:t.holdMinutes>0?`${t.holdMinutes} min`:"â€”"}),e.jsx("td",{className:"seg-note",children:t.note})]},a))})]}),i.tips.length>0&&e.jsx("ul",{className:"schedule-tips",children:i.tips.map((t,a)=>e.jsx("li",{children:t},a))})]})}function ke({substitutions:i}){return e.jsx("div",{className:"subs-panel",children:Array.from(i.entries()).map(([t,a])=>e.jsxs("div",{className:"subs-group",children:[e.jsxs("div",{className:"subs-material",children:["Don't have ",e.jsx("strong",{children:t}),"? Try:"]}),e.jsx("div",{className:"subs-list",children:a.slice(0,3).map(n=>e.jsxs("div",{className:"sub-item",children:[e.jsxs("div",{className:"sub-header",children:[e.jsx("span",{className:"sub-name",children:n.substitute}),e.jsx("span",{className:`sub-quality q${n.quality}`,children:n.quality===1?"Excellent":n.quality===2?"Good":"Rough"})]}),e.jsx("div",{className:"sub-detail",children:n.adjustment}),e.jsx("div",{className:"sub-reason",children:n.reason})]},n.substitute))})]},t))})}const Oe=`
  .suggestion-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .suggestion-input {
    width: 100%;
    padding: 12px 14px;
    border: 2px solid var(--border-primary);
    border-radius: 10px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 15px;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }

  .suggestion-input:focus {
    outline: none;
    border-color: var(--accent, #6366F1);
  }

  .suggestion-input::placeholder {
    color: var(--text-tertiary);
    font-style: italic;
  }

  .suggestion-submit {
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    background: var(--accent, #6366F1);
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }

  .suggestion-submit:hover:not(:disabled) {
    background: var(--accent-hover, #363380);
    transform: translateY(-1px);
  }

  .suggestion-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .option-row label {
    font-size: 13px;
    color: var(--text-secondary);
  }

  .option-row select {
    padding: 4px 8px;
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 13px;
  }

  .example-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .example-chip {
    padding: 4px 10px;
    border: 1px solid var(--border-primary);
    border-radius: 16px;
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .example-chip:hover:not(:disabled) {
    background: var(--accent, #6366F1);
    color: white;
    border-color: var(--accent, #6366F1);
  }

  .parsed-query {
    background: var(--bg-tertiary);
    border-radius: 8px;
    padding: 10px;
  }

  .parsed-row {
    display: flex;
    justify-content: space-between;
    padding: 3px 0;
    font-size: 13px;
  }

  .parsed-label {
    color: var(--text-secondary);
    font-weight: 500;
  }

  .confidence-badge {
    padding: 1px 8px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
  }

  .confidence-badge.high { background: #27ae6022; color: #27ae60; }
  .confidence-badge.medium { background: #f39c1222; color: #f39c12; }
  .confidence-badge.low { background: #e74c3c22; color: #e74c3c; }

  /* Empty state */
  .suggestion-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 60px 30px;
    color: var(--text-secondary);
    max-width: 500px;
    margin: 0 auto;
  }

  .empty-icon {
    font-size: 64px;
    margin-bottom: 16px;
  }

  .suggestion-empty h2 {
    margin: 0 0 12px 0;
    color: var(--text-primary);
  }

  .suggestion-empty p {
    margin: 0 0 8px 0;
    font-size: 14px;
    line-height: 1.6;
  }

  .empty-hint {
    color: var(--text-tertiary);
    font-size: 13px !important;
  }

  /* Loading */
  .suggestion-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px;
    color: var(--text-secondary);
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border-primary);
    border-top-color: var(--accent, #6366F1);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 16px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Results */
  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 16px;
  }

  .results-header h2 {
    margin: 0;
    font-size: 16px;
    color: var(--text-primary);
  }

  .results-timing {
    font-size: 12px;
    color: var(--text-tertiary);
  }

  .no-match-help {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 10px;
    padding: 20px;
  }

  .no-match-help pre {
    white-space: pre-wrap;
    font-size: 13px;
    color: var(--text-secondary);
    margin: 0;
    font-family: inherit;
  }

  /* Suggestion Card */
  .suggestion-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 12px;
    margin-bottom: 12px;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .suggestion-card:hover {
    border-color: var(--accent, #6366F1);
  }

  .suggestion-card.expanded {
    border-color: var(--accent, #6366F1);
  }

  .card-header {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    cursor: pointer;
    gap: 12px;
  }

  .card-rank {
    font-size: 20px;
    font-weight: 700;
    color: var(--accent, #6366F1);
    min-width: 32px;
  }

  .card-title {
    flex: 1;
  }

  .card-title h3 {
    margin: 0 0 6px 0;
    font-size: 15px;
    color: var(--text-primary);
  }

  .card-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .badge {
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 500;
  }

  .badge.surface { background: #8e44ad22; color: #8e44ad; }
  .badge.cone { background: #e67e2222; color: #e67e22; }
  .badge.atmosphere { background: #6366F122; color: #6366F1; }
  .badge.converged { background: #27ae6022; color: #27ae60; }
  .badge.relevance.high { background: #27ae6022; color: #27ae60; }
  .badge.relevance.medium { background: #f39c1222; color: #f39c12; }
  .badge.relevance.low { background: #e74c3c22; color: #e74c3c; }

  .card-expand {
    color: var(--text-tertiary);
    font-size: 12px;
  }

  .card-body {
    padding: 0 16px 16px 16px;
    border-top: 1px solid var(--border-primary);
  }

  .card-section {
    margin-top: 16px;
  }

  .card-section h4 {
    margin: 0 0 10px 0;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-secondary);
    letter-spacing: 0.4px;
  }

  /* Recipe table */
  .recipe-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  .recipe-table th {
    text-align: left;
    padding: 6px 8px;
    font-size: 12px;
    color: var(--text-tertiary);
    border-bottom: 1px solid var(--border-primary);
  }

  .recipe-table td {
    padding: 6px 8px;
    border-bottom: 1px solid var(--border-primary);
  }

  .recipe-table td:last-child,
  .recipe-table th:last-child {
    text-align: right;
  }

  .recipe-total {
    font-weight: 600;
  }

  .colorant-table td:last-child {
    text-align: left;
    font-size: 12px;
    color: var(--text-secondary);
  }

  .colorant-effect {
    font-style: italic;
  }

  /* UMF grid */
  .umf-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 8px;
  }

  .umf-cell {
    background: var(--bg-tertiary);
    border-radius: 8px;
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .umf-cell.satisfied { border-left: 3px solid #27ae60; }
  .umf-cell.off-target { border-left: 3px solid #e74c3c; }

  .umf-oxide {
    font-weight: 600;
    font-size: 13px;
  }

  .umf-value {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
  }

  .umf-target {
    font-size: 11px;
    color: var(--text-tertiary);
  }

  .umf-status {
    font-size: 12px;
    font-weight: 600;
  }

  .umf-status.ok { color: #27ae60; }
  .umf-status.miss { color: #e74c3c; }

  /* Explanation */
  .explanation p {
    margin: 0 0 8px 0;
    font-size: 13px;
    line-height: 1.6;
    color: var(--text-secondary);
  }

  .explanation p:first-child {
    color: var(--text-primary);
    font-size: 14px;
  }

  /* Warnings */
  .warnings-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .warning-item {
    padding: 6px 10px;
    margin-bottom: 4px;
    background: #f39c1210;
    border-radius: 6px;
    font-size: 13px;
    color: #f39c12;
  }

  /* Section toggle (expandable) */
  .section-toggle {
    cursor: pointer;
    user-select: none;
    transition: color 0.2s;
  }
  .section-toggle:hover {
    color: var(--accent, #6366F1);
  }

  /* Firing schedule */
  .firing-panel {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .schedule-block {
    background: var(--bg-tertiary);
    border-radius: 8px;
    padding: 12px;
  }

  .schedule-name {
    font-weight: 600;
    font-size: 14px;
    color: var(--text-primary);
    margin-bottom: 4px;
  }

  .schedule-desc {
    font-size: 12px;
    color: var(--text-secondary);
    margin: 0 0 10px;
  }

  .firing-table td {
    font-size: 13px;
  }

  .temp-cell {
    font-weight: 500;
    white-space: nowrap;
  }

  .seg-note {
    font-size: 12px !important;
    color: var(--text-secondary);
    font-style: italic;
  }

  .schedule-tips {
    margin: 10px 0 0;
    padding-left: 18px;
    font-size: 12px;
    color: var(--text-secondary);
    line-height: 1.5;
  }

  .bisque-toggle {
    margin-top: 4px;
  }

  .toggle-btn {
    padding: 4px 10px;
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    font-size: 12px;
    cursor: pointer;
    margin-bottom: 8px;
  }

  .toggle-btn:hover {
    border-color: var(--accent, #6366F1);
    color: var(--accent, #6366F1);
  }

  .firing-notes {
    margin: 4px 0 0;
    padding-left: 18px;
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* Material substitutions */
  .subs-panel {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .subs-group {
    background: var(--bg-tertiary);
    border-radius: 8px;
    padding: 10px 12px;
  }

  .subs-material {
    font-size: 13px;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  .subs-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .sub-item {
    background: var(--bg-primary);
    border-radius: 6px;
    padding: 8px 10px;
    border-left: 3px solid var(--accent, #6366F1);
  }

  .sub-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2px;
  }

  .sub-name {
    font-weight: 600;
    font-size: 13px;
    color: var(--text-primary);
  }

  .sub-quality {
    padding: 1px 6px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 500;
  }

  .sub-quality.q1 { background: #27ae6022; color: #27ae60; }
  .sub-quality.q2 { background: #f39c1222; color: #f39c12; }
  .sub-quality.q3 { background: #e74c3c22; color: #e74c3c; }

  .sub-detail {
    font-size: 12px;
    color: var(--text-primary);
    margin-bottom: 2px;
  }

  .sub-reason {
    font-size: 12px;
    color: var(--text-tertiary);
    font-style: italic;
  }

  /* Refinement / Feedback */
  .refine-section {
    border-top: 1px solid var(--border-primary);
    padding-top: 12px;
  }

  .refine-btn {
    padding: 8px 16px;
    border: 1px dashed var(--accent, #6366F1);
    border-radius: 8px;
    background: transparent;
    color: var(--accent, #6366F1);
    font-size: 13px;
    cursor: pointer;
    width: 100%;
    transition: all 0.2s;
  }

  .refine-btn:hover {
    background: var(--accent, #6366F1);
    color: white;
    border-style: solid;
  }

  .refine-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .refine-hint {
    font-size: 12px;
    color: var(--text-tertiary);
    margin: 0;
    font-style: italic;
  }

  .refine-row {
    display: flex;
    gap: 6px;
  }

  .refine-input {
    flex: 1;
    padding: 8px 10px;
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 13px;
  }

  .refine-input:focus {
    outline: none;
    border-color: var(--accent, #6366F1);
  }

  .refine-submit {
    padding: 8px 14px;
    border: none;
    border-radius: 6px;
    background: var(--accent, #6366F1);
    color: white;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }

  .refine-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .refine-cancel {
    padding: 8px 12px;
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    background: transparent;
    color: var(--text-secondary);
    font-size: 13px;
    cursor: pointer;
  }

  .refine-cancel:hover {
    border-color: var(--text-secondary);
  }

  /* Digitalfire Reference Links */
  .df-refs-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 8px;
  }

  .df-ref-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    background: var(--bg-tertiary, #1a1a2e);
    border: 1px solid var(--border-subtle, #2a2a3e);
    border-radius: 4px;
    text-decoration: none;
    color: inherit;
    font-size: 12px;
    transition: border-color 0.15s;
  }

  .df-ref-link:hover {
    border-color: var(--accent, #6366F1);
  }

  .df-ref-category {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    color: var(--text-dim, #666);
    background: var(--bg-input, #252538);
    padding: 2px 5px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  .df-ref-name {
    flex: 1;
    color: var(--text-link, #818cf8);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .df-ref-arrow {
    color: var(--text-dim, #666);
    font-size: 11px;
  }

  .df-attribution-line {
    font-size: 10px;
    color: var(--text-dim, #666);
    margin: 4px 0 0;
    text-align: right;
  }

  .df-attribution-line a {
    color: var(--text-muted, #888);
    text-decoration: none;
  }

  .df-attribution-line a:hover {
    text-decoration: underline;
  }
`;export{$e as SuggestionPage};
