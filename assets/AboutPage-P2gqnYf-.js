import{j as e}from"./vendor-react-D0vdeqNS.js";import{e as i}from"./index-Cx-RWLMS.js";import{u as a}from"./usePageTitle-Dfez-EUD.js";import{f as t,a as s}from"./featureFlags-DeKxyuZW.js";import{L as r}from"./vendor-router-DjLFn5nj.js";import"./vendor-state-DTYbmM1J.js";function p(){return a("About"),e.jsxs("div",{className:"about-page",children:[e.jsxs("div",{className:"about-content",children:[e.jsxs("section",{className:"about-hero",children:[e.jsx("h1",{children:"Stull Atlas"}),e.jsx("p",{className:"subtitle",children:"A Computational Ceramic Glaze Explorer - 114 years after Stull"}),e.jsx("hr",{style:{border:"none",borderTop:"1px solid var(--border)",margin:"12px 0 0"}}),e.jsxs("p",{style:{marginTop:0},children:["📄 ",e.jsx("a",{href:"/info/index.html",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--text-link)"},children:"Documentation Hub"})," - ",e.jsx("span",{style:{color:"var(--text-secondary)",fontSize:"0.9em"},children:"In-depth technical reports covering the math, chemistry, and analysis."})]})]}),e.jsxs("section",{className:"about-section",style:{marginTop:0},children:[e.jsx("h2",{children:"What is this?"}),e.jsxs("p",{children:["Stull Atlas is a tool for ceramic artists and glaze chemists. It lets you explore thousands of glaze recipes mapped onto a ",e.jsx("strong",{children:"Stull chart"})," - the standard coordinate system for understanding glaze chemistry through Unity Molecular Formula (UMF)."]}),e.jsx("p",{children:"In 1912, Ray T. Stull published a paper mapping the relationship between silica (SiO₂) and alumina (Al₂O₃) in ceramic glazes. His chart revealed that glaze surface quality - matte, satin, or glossy - could be predicted by the ratio of these two oxides. Over a century later, this framework remains the foundation of glaze chemistry."}),e.jsxs("figure",{className:"original-chart",children:[e.jsx("img",{src:"/stull-original-1912.jpg",alt:"Original Stull Chart from 1912 - Chart 1 from Transactions of the American Ceramic Society, Vol. XIV, showing the relationship between molecules of SiO₂ (x-axis) and Al₂O₃ (y-axis) with labeled regions for Unfused, Mattes, Semi-Matte, Bright Gloss, and Devitrified zones",loading:"lazy"}),e.jsxs("figcaption",{children:["The original Stull chart - Chart 1 from ",e.jsx("em",{children:"Transactions of the American Ceramic Society"}),", Vol. XIV (1912). Stull mapped test glazes by their SiO₂:Al₂O₃ molar ratio and identified the regions that predict surface quality."]})]}),e.jsx("p",{children:"This tool takes Stull's insight and applies it to a modern dataset of real-world glazes, giving you an interactive map of the glaze chemistry landscape."})]}),e.jsxs("section",{className:"about-section",children:[e.jsx("h2",{children:"The Dataset"}),e.jsxs("p",{children:["The primary dataset comes from ",e.jsx("a",{href:"https://glazy.org",target:"_blank",rel:"noopener noreferrer",children:"Glazy"}),", an open-source glaze recipe database maintained by Derek Philip Au. It contains thousands of community-contributed recipes with calculated UMF values, cone temperatures, surface types, and firing atmospheres."]}),e.jsx("p",{children:"Each point on the chart represents a real glaze recipe that someone has mixed, fired, and documented."})]}),e.jsxs("section",{className:"about-section",children:[e.jsx("h2",{children:"How to Use"}),e.jsxs("div",{className:"feature-list",children:[e.jsxs("div",{className:"feature",children:[e.jsxs("h3",{children:["🗺 ",e.jsx(r,{to:"/",children:"Explorer"})]}),e.jsx("p",{children:"The main Stull chart. Each dot is a glaze recipe plotted by its SiO₂ (x-axis) and Al₂O₃ (y-axis) values. The chart shows Stull's empirical regions:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Bright Gloss"})," - Low alumina relative to silica. Smooth, reflective surfaces."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Matte"})," - Higher alumina. Soft, non-reflective surfaces."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Semi-Matte"})," - The transition zone between matte and gloss."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Crazed"})," - Too little silica. The glaze contracts more than the clay body, creating cracks."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Underfired"})," - Not enough flux to fully melt at temperature."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Unfused"})," - Extreme alumina. Won't melt into a glaze."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Click any point"})," to see the full recipe, UMF breakdown, firing info, and similar glazes ranked by oxide-distance."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Compare mode"})," - select up to 3 glazes for side-by-side UMF comparison. See differences in flux balance, Si:Al ratio, and recipe ingredients at a glance."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Color by"})," cone temperature, surface type, source, flux ratio (R₂O:RO), boron content, or data confidence."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"3D mode"})," adds a Z-axis - choose any oxide, cone, flux ratio, or Si:Al ratio to see the data in three dimensions."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Analysis tab"})," in the sidebar provides clustering (DBSCAN), density heatmap, and void detection - find gaps in the explored chemistry space."]})]}),e.jsxs("div",{className:"feature",children:[e.jsxs("h3",{children:["🧮 ",e.jsx(r,{to:"/calc",children:"Calculators"})]}),e.jsx("p",{children:"Tools for computing and exploring glaze recipes:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"UMF Calculator"})," - Enter a recipe by weight, get the Unity Molecular Formula."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Line Blend"})," - Interpolate between two recipes across N steps."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Triaxial Blend"})," - Three-corner blend with configurable divisions."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Biaxial Blend"})," - Two-axis grid blend (4 corners)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Quadaxial Blend"})," - Four-material blend."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Radial Blend"})," - Circular blend pattern around a center point."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Space-Filling"})," - Algorithmic blend exploration using space-filling curves."]})]}),e.jsx("p",{children:"All blend calculators export CSV for your studio notebook and can overlay results on the Stull chart."})]}),e.jsxs("div",{className:"feature",children:[e.jsxs("h3",{children:["🧱 ",e.jsx(r,{to:"/materials",children:"Materials"})]}),e.jsx("p",{children:"Browse the raw materials database (sourced from Digitalfire). Search by name or category, see the oxide analysis for each material. This is the data that drives the UMF calculations - knowing what's in your materials is how you know what's in your glaze."})]}),e.jsxs("div",{className:"feature",children:[e.jsxs("h3",{children:["📦 ",e.jsx(r,{to:"/import-export",children:"Import / Export"})]}),e.jsx("p",{children:"Import your own glaze recipes (JSON or CSV) and export saved recipes. Bring your studio notebook into the atlas, or take data out for further analysis."})]}),e.jsxs("div",{className:"feature",children:[e.jsxs("h3",{children:["📖 ",e.jsx(r,{to:"/guide",children:"Guide"})]}),e.jsx("p",{children:"In-depth documentation covering every feature, from reading the Stull chart to setting up blend tests. Includes workflow examples, a glossary of ceramic chemistry terms, and tips for getting the most out of each tool."})]})]}),e.jsx("h3",{style:{marginTop:24},children:"Interface Features"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Light / dark mode"})," - Toggle with the ☀/🌙 button in the header. Your preference is saved between sessions."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Print support"})," - Press Ctrl+P (Cmd+P on Mac) on any page for a clean, paper-friendly layout with light colors and hidden UI controls."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Keyboard accessible"})," - Full keyboard navigation with visible focus indicators, screen-reader labels, and skip-to-content link."]})]})]}),e.jsxs("section",{className:"about-section",children:[e.jsx("h2",{children:"Understanding UMF"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Unity Molecular Formula"}),' expresses a glaze recipe not as weights of raw materials, but as molar ratios of the oxides those materials contribute. The "unity" part means the flux oxides (R₂O + RO) are normalized to sum to 1.0.']}),e.jsx("p",{children:"This gives you three groups of oxides:"}),e.jsxs("table",{className:"umf-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Group"}),e.jsx("th",{children:"Role"}),e.jsx("th",{children:"Common Oxides"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Fluxes"})}),e.jsx("td",{children:"Melt the glass. Sum = 1.0"}),e.jsx("td",{children:"Na₂O, K₂O, CaO, MgO, ZnO, BaO, Li₂O"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Stabilizers"})}),e.jsx("td",{children:"Control viscosity and surface"}),e.jsx("td",{children:"Al₂O₃, B₂O₃"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Glass Formers"})}),e.jsx("td",{children:"Build the glass network"}),e.jsx("td",{children:"SiO₂"})]})]})]}),e.jsx("p",{children:"The Stull chart plots SiO₂ against Al₂O₃ because those two ratios most strongly determine surface quality. But the flux choices (which fluxes, in what ratios) control melting temperature, thermal expansion, color response, and durability."})]}),e.jsxs("section",{className:"about-section",children:[e.jsx("h2",{children:"Stull Regions"}),e.jsx("p",{children:"The colored regions on the chart are empirical boundaries - not hard lines, but zones where glazes tend to behave a certain way. Real glazes don't always obey the chart: boron and lithium can push a glaze to melt where alumina alone would predict matte. Firing temperature matters. Kiln atmosphere matters. The clay body matters."}),e.jsx("p",{children:"Use the regions as a map, not a law. The chart tells you where to look, not what you'll find when you open the kiln."})]}),t.tempContoursAbout&&e.jsxs("section",{className:"about-section",children:[e.jsx("h2",{children:"Temperature Contours"}),e.jsxs("p",{children:["The faint contour lines on the chart show approximate temperature zones (1240°C–1280°C) based on empirical data collected by"," ",e.jsx("a",{href:"https://glazy.org",target:"_blank",rel:"noopener noreferrer",children:"Derek Philip Au"}),". These indicate where glazes at a given UMF position tend to mature. They're guides, not guarantees - your kiln, your firing schedule, and your materials will shift these boundaries."]})]}),e.jsxs("section",{className:"about-section",children:[e.jsx("h2",{children:"Credits & Sources"}),e.jsx("p",{style:{marginBottom:16,fontStyle:"italic",opacity:.85},children:"Every tool is built from what came before it. The potters and researchers listed here didn't just advance ceramic chemistry - they gave their work away so others could build on it. Stull Atlas is our attempt to carry that forward."}),e.jsxs("ul",{className:"credits-list",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Ray T. Stull"})," (1912) - Original SiO₂/Al₂O₃ diagram and zone classifications"]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("a",{href:"https://glazy.org",target:"_blank",rel:"noopener noreferrer",children:"Derek Philip Au"})})," - Derek's contributions to open-source ceramic chemistry tools are extraordinary. He created"," ",e.jsx("a",{href:"https://glazy.org",target:"_blank",rel:"noopener noreferrer",children:"Glazy"}),", the largest open glaze recipe database in the world, giving potters free access to thousands of recipes with full UMF analysis. His"," ",e.jsx("a",{href:"https://github.com/derekphilipau/ceramic-chemistry-visualization",target:"_blank",rel:"noopener noreferrer",children:"ceramic-chemistry-visualization"})," ","project (GPL-3.0) provided the empirical Stull region boundary geometry, temperature contour data, and Q-line coordinates that form the foundation of both the 2D and 3D plots in Stull Atlas. Before Derek's work, this kind of data-driven glaze visualization was locked away in academic papers and proprietary software. He made it accessible to everyone. The entire Stull Atlas dataset of 9,000+ glazes comes from Glazy's open data. Thank you, Derek."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("a",{href:"https://digitalfire.com",target:"_blank",rel:"noopener noreferrer",children:"Digitalfire Reference Library"})})," (Tony Hansen) - Comprehensive ceramic chemistry knowledge base, materials database, oxide reference, and troubleshooting guides. Tony Hansen has spent over 30 years building the most thorough freely-available reference library in ceramics. His work on understanding glaze chemistry, material properties, and ceramic testing is foundational to how modern potters think about glazes. The knowledge panel in our Explorer and the contextual links throughout Stull Atlas draw from his library - always linking back to the original articles at"," ",e.jsx("a",{href:"https://digitalfire.com",target:"_blank",rel:"noopener noreferrer",children:"digitalfire.com"}),"."]})]})]}),t.standingOnShoulders&&e.jsxs("section",{className:"about-section studio-appreciation",children:[e.jsx("h2",{children:"Standing on Shoulders"}),e.jsx("p",{className:"appreciation-intro",children:"Stull Atlas wouldn't exist without the generosity of the ceramics community. Two projects in particular made this tool possible - both built by individuals who chose to share their life's work openly."}),e.jsxs("div",{className:"appreciation-cards",children:[e.jsxs("a",{href:"https://digitalfire.com",target:"_blank",rel:"noopener noreferrer",className:"appreciation-card",children:[e.jsx("div",{className:"card-logo digitalfire-logo",children:e.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("circle",{cx:"24",cy:"24",r:"22",stroke:"#2B5797",strokeWidth:"2",fill:"none"}),e.jsx("path",{d:"M24 8 C20 16, 14 20, 14 28 C14 34, 18 40, 24 40 C30 40, 34 34, 34 28 C34 20, 28 16, 24 8Z",fill:"#2B5797",opacity:"0.9"}),e.jsx("path",{d:"M24 14 C22 20, 18 23, 18 28 C18 32, 20 36, 24 36 C28 36, 30 32, 30 28 C30 23, 26 20, 24 14Z",fill:"#4A90D9",opacity:"0.7"}),e.jsx("path",{d:"M24 22 C23 25, 21 27, 21 30 C21 32, 22 34, 24 34 C26 34, 27 32, 27 30 C27 27, 25 25, 24 22Z",fill:"#7AB8F5",opacity:"0.6"})]})}),e.jsxs("div",{className:"card-text",children:[e.jsx("h3",{children:"Digitalfire"}),e.jsx("p",{className:"card-author",children:"Tony Hansen"}),e.jsx("p",{className:"card-desc",children:"Over 30 years of ceramic chemistry reference material, freely shared. The materials database, oxide data, and troubleshooting knowledge that powers Stull Atlas all trace back to Tony's extraordinary library. Every potter who understands why their glaze crazes, or how to read a unity formula, owes something to this work."})]})]}),e.jsxs("a",{href:"https://glazy.org",target:"_blank",rel:"noopener noreferrer",className:"appreciation-card",children:[e.jsx("div",{className:"card-logo glazy-logo",children:e.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("circle",{cx:"24",cy:"24",r:"22",stroke:"#26A69A",strokeWidth:"2",fill:"none"}),e.jsx("path",{d:"M16 14 L16 32 C16 36, 19 40, 24 40 C29 40, 32 36, 32 32 L32 14",stroke:"#26A69A",strokeWidth:"2.5",fill:"none",strokeLinecap:"round"}),e.jsx("path",{d:"M12 14 L36 14",stroke:"#26A69A",strokeWidth:"2.5",strokeLinecap:"round"}),e.jsx("ellipse",{cx:"24",cy:"30",rx:"6",ry:"3",fill:"#26A69A",opacity:"0.3"}),e.jsx("circle",{cx:"21",cy:"24",r:"1.5",fill:"#4DB6AC",opacity:"0.7"}),e.jsx("circle",{cx:"27",cy:"22",r:"1",fill:"#4DB6AC",opacity:"0.5"}),e.jsx("circle",{cx:"24",cy:"26",r:"1.2",fill:"#4DB6AC",opacity:"0.6"})]})}),e.jsxs("div",{className:"card-text",children:[e.jsx("h3",{children:"Glazy"}),e.jsx("p",{className:"card-author",children:"Derek Philip Au"}),e.jsx("p",{className:"card-desc",children:"The world's largest open glaze recipe database - 9,000+ recipes with full UMF analysis, all CC BY-NC-SA 4.0 licensed. Derek's Stull region geometry, temperature contours, and ceramic-chemistry-visualization project made data-driven glaze exploration possible for everyone. The entire dataset in Stull Atlas comes from Glazy."})]})]})]}),e.jsx("p",{className:"appreciation-closing",children:"These two projects represent decades of work given freely to the ceramics community."})]}),e.jsxs("section",{className:"about-section",children:[e.jsx("h2",{children:"Documentation"}),e.jsx("p",{children:"In-depth technical reports covering the math, chemistry, and analysis."}),e.jsx("div",{className:"feature-list",children:e.jsxs("div",{className:"feature",children:[e.jsxs("h3",{children:["📄 ",e.jsx("a",{href:"/info/index.html",target:"_blank",rel:"noopener noreferrer",children:"Documentation Hub"})]}),e.jsx("p",{children:"Six comprehensive reports: the complete specification (133 computed properties, 22 oxides), equations deep-dive (40 core equations with history and worked examples), flux chemistry, colorant & crystal field theory, crystallisation & phase equilibria, and the advanced analysis compendium covering defect physics, sensitivity analysis, firing science."})]})})]}),e.jsxs("section",{className:"about-section about-footer",children:[e.jsx("p",{children:"Built by Ryan L - Michigan."}),e.jsxs("p",{style:{marginTop:8},children:[e.jsx(r,{to:"/nceca",style:{color:"var(--text-link)"},children:"NCECA 2026 - Detroit"}),i.showPricing," · ",e.jsx(r,{to:"/help/variability",style:{color:"var(--text-link)"},children:"Understanding Variability"})]}),e.jsxs("p",{className:"version",children:["v",s]})]})]}),e.jsx("style",{children:`
        .about-page {
          flex: 1;
          overflow-y: auto;
          background: var(--bg-primary);
          color: var(--text-primary);
          padding: 12px 20px 40px;
        }

        .about-content {
          max-width: 720px;
          margin: 0 auto;
        }

        .about-hero {
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-primary);
        }

        .about-hero h1 {
          font-size: 32px;
          margin: 0 0 8px;
          font-weight: 700;
        }

        .about-hero .subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0;
          font-style: italic;
        }

        .about-section {
          margin-bottom: 36px;
        }

        .original-chart {
          margin: 20px 0 24px;
          padding: 0;
          text-align: center;
        }

        .original-chart img {
          max-width: 100%;
          width: 520px;
          border-radius: 8px;
          border: 1px solid var(--border-primary);
          background: #f5f5f0;
        }

        .original-chart figcaption {
          margin-top: 10px;
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-muted);
          font-style: italic;
        }

        .about-section h2 {
          font-size: 20px;
          margin: 0 0 12px;
          color: var(--text-primary);
          font-weight: 600;
        }

        .about-section p {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-body);
          margin: 0 0 12px;
        }

        .about-section a {
          color: var(--text-link);
          text-decoration: none;
        }

        .about-section a:hover {
          text-decoration: underline;
        }

        .about-section ul {
          padding-left: 20px;
          margin: 0 0 12px;
        }

        .about-section li {
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-body);
          margin-bottom: 4px;
        }

        .about-section strong {
          color: var(--text-primary);
        }

        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .feature {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 20px;
        }

        .feature h3 {
          margin: 0 0 10px;
          font-size: 16px;
        }

        .feature h3 a {
          color: var(--text-link);
          text-decoration: none;
        }

        .feature h3 a:hover {
          text-decoration: underline;
        }

        .feature p, .feature li {
          font-size: 14px;
          line-height: 1.6;
        }

        .umf-table {
          width: 100%;
          border-collapse: collapse;
          margin: 12px 0;
          font-size: 14px;
        }

        .umf-table th, .umf-table td {
          padding: 8px 12px;
          text-align: left;
          border-bottom: 1px solid var(--border-subtle);
        }

        .umf-table th {
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .umf-table td {
          color: var(--text-body);
        }

        .credits-list {
          list-style: none;
          padding: 0;
        }

        .credits-list li {
          padding: 8px 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .about-footer {
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid var(--border-primary);
        }

        .about-footer .version {
          font-size: 12px;
          color: var(--text-dim);
        }

        /* ── Studio Appreciation Section ──────────── */
        .studio-appreciation {
          margin-top: 48px;
          padding-top: 32px;
          border-top: 2px solid var(--accent);
        }

        .studio-appreciation h2 {
          text-align: center;
          font-size: 22px;
          margin-bottom: 8px;
        }

        .appreciation-intro {
          text-align: center;
          font-style: italic;
          opacity: 0.85;
          max-width: 560px;
          margin: 0 auto 28px;
        }

        .appreciation-cards {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 24px;
        }

        .appreciation-card {
          display: flex;
          gap: 20px;
          padding: 24px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 10px;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s;
          align-items: flex-start;
        }

        .appreciation-card:hover {
          border-color: var(--accent);
          background: var(--bg-elevated);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .card-logo {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: var(--bg-tertiary);
          padding: 4px;
        }

        .card-text h3 {
          margin: 0 0 2px;
          font-size: 18px;
          font-family: var(--font-display);
          color: var(--text-bright);
        }

        .card-author {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0 0 8px;
          font-style: italic;
        }

        .card-desc {
          font-size: 14px;
          line-height: 1.65;
          color: var(--text-body);
          margin: 0;
        }

        .appreciation-closing {
          text-align: center;
          font-size: 14px;
          color: var(--text-secondary);
          font-style: italic;
        }

        @media (max-width: 480px) {
          .appreciation-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 20px 16px;
          }
        }
      `})]})}export{p as AboutPage,p as default};
