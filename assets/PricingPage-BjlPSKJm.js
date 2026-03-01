import{r as m,j as e}from"./vendor-react-D0vdeqNS.js";import{c as k,i as N}from"./index-DFhyK2mv.js";import{u as A}from"./usePageTitle-Dfez-EUD.js";import{A as z}from"./AuthModal-CkmXedy_.js";import"./vendor-state-DTYbmM1J.js";import"./vendor-router-DjLFn5nj.js";const S={explorer_2d:"free",explorer_detail:"free",umf_calculator:"free",guide:"free",materials_browse:"free",similarity_search:"solo",compare_glazes:"solo",recipe_save:"solo",import_export:"solo",line_blend:"solo",validation_warnings:"solo",optimizer:"pro",genetic_optimizer:"pro",suggestion_engine:"pro",triaxial_blend:"pro",quadaxial_blend:"pro",biaxial_blend:"pro",radial_blend:"pro",space_filling:"pro",analysis_clustering:"pro",analysis_density:"pro",analysis_voids:"pro",explorer_3d:"atlas_3d",surface_fit_3d:"atlas_3d",proximity_3d:"atlas_3d",export_3d:"atlas_3d",lighting_3d:"atlas_3d",camera_presets_3d:"atlas_3d"},b={free:0,solo:1,edu_individual:1,pro:2,edu_classroom:2,atlas_3d:3};function u(t){return Object.entries(S).filter(([,o])=>b[t]>=b[o]).map(([o])=>o)}const C={explorer_2d:"2D Stull Chart Explorer",explorer_detail:"Glaze Detail Panel",explorer_3d:"3D Stull Chart Explorer",umf_calculator:"UMF Calculator",similarity_search:"Similarity Search",compare_glazes:"Compare Panel",optimizer:"Glaze Optimizer",genetic_optimizer:"Genetic Algorithm Optimizer",suggestion_engine:"AI Suggestion Engine",line_blend:"Line Blend Calculator",triaxial_blend:"Triaxial Blend",quadaxial_blend:"Quadaxial Blend",biaxial_blend:"Biaxial Blend",radial_blend:"Radial Blend",space_filling:"Space-Filling Designs",recipe_save:"Save Recipes",import_export:"Import / Export",analysis_clustering:"DBSCAN Clustering",analysis_density:"Density Analysis",analysis_voids:"Void Detection",surface_fit_3d:"3D Surface Fitting",proximity_3d:"Proximity Exploration",export_3d:"3D Export (OBJ / STL / CSV)",lighting_3d:"Lighting & Material Controls",camera_presets_3d:"Camera Presets & Auto-Rotate",materials_browse:"Materials Browser",guide:"Interactive Guide",validation_warnings:"Limit Warnings"};function g({name:t,price:o,period:d,description:a,features:s,highlight:c,cta:i,onAction:p,current:n}){return e.jsxs("div",{className:`tier-card ${c?"tier-highlight":""} ${n?"tier-current":""}`,children:[n&&e.jsx("span",{className:"tier-current-badge",children:"Current Plan"}),e.jsx("h3",{className:"tier-name",children:t}),e.jsxs("div",{className:"tier-price",children:[e.jsx("span",{className:"tier-amount",children:o}),d&&e.jsxs("span",{className:"tier-period",children:["/",d]})]}),e.jsx("p",{className:"tier-desc",children:a}),e.jsx("button",{className:"tier-cta",onClick:p,disabled:n,children:n?"Active":i}),e.jsx("ul",{className:"tier-features",children:s.map(r=>e.jsx("li",{children:C[r]??r},r))})]})}function L(){A("Pricing");const{user:t,profile:o}=k(),[d,a]=m.useState(!1),[s,c]=m.useState(null),[i,p]=m.useState("annual"),n=(o==null?void 0:o.tier)??"free",r=N(),y=u("free"),v=u("solo"),j=u("pro"),_=u("atlas_3d"),w=()=>{t||a(!0)},x=l=>{if(!t){a(!0);return}const h=(i==="annual"?{solo:"#",pro:"#",atlas_3d:"#"}:{solo:"#",pro:"#",atlas_3d:"#"})[l];if(h&&h!=="#"){const f=new URL(h);t.email&&f.searchParams.set("prefilled_email",t.email),window.open(f.toString(),"_blank")}else c({tier:l,email:t.email??""})};return e.jsxs("div",{className:"pricing-page",children:[e.jsxs("div",{className:"pricing-content",children:[e.jsxs("section",{className:"pricing-hero",children:[e.jsx("h1",{children:"Choose Your Plan"}),e.jsx("p",{className:"pricing-subtitle",children:"Stull Atlas is free for basic exploration. Upgrade for advanced tools, saving, and analysis."}),r&&e.jsxs("div",{className:"pricing-free-banner",children:["All features free through April 30 — ",e.jsx("button",{className:"pricing-free-link",onClick:()=>a(!0),children:"sign up"})," to unlock everything."]})]}),e.jsxs("div",{className:"billing-toggle",children:[e.jsx("button",{className:`billing-btn ${i==="monthly"?"billing-active":""}`,onClick:()=>p("monthly"),children:"Monthly"}),e.jsxs("button",{className:`billing-btn ${i==="annual"?"billing-active":""}`,onClick:()=>p("annual"),children:["Annual ",e.jsx("span",{className:"billing-save",children:"Save 2 months"})]})]}),e.jsxs("div",{className:"tier-grid",children:[e.jsx(g,{name:"Free",price:"$0",description:"Explore the Stull chart with 3,000+ community glazes",features:y,cta:t?"Active":"Get Started",onAction:w,current:n==="free"&&!!t}),e.jsx(g,{name:"Solo",price:i==="annual"?"$89":"$10",period:i==="annual"?"year":"month",description:"For the studio potter who wants deeper glaze analysis",features:v,cta:r?"Free Through April":"Upgrade to Solo",onAction:()=>r?a(!0):x("solo"),current:n==="solo"}),e.jsx(g,{name:"Pro",price:i==="annual"?"$219":"$25",period:i==="annual"?"year":"month",description:"Full toolset — optimizer, AI suggestions, advanced analysis",features:j,cta:r?"Free Through April":"Upgrade to Pro",onAction:()=>r?a(!0):x("pro"),current:n==="pro"}),e.jsx(g,{name:"Atlas 3D",price:i==="annual"?"$349":"$40",period:i==="annual"?"year":"month",description:"Everything in Pro plus full 3D exploration, proximity analysis, and model export",features:_,highlight:!0,cta:r?"Free Through April":"Upgrade to Atlas 3D",onAction:()=>r?a(!0):x("atlas_3d"),current:n==="atlas_3d"})]}),e.jsxs("div",{className:"edu-callout",children:[e.jsx("span",{children:"Students, professors & departments —"})," ",e.jsx("button",{className:"edu-callout-link",onClick:()=>{var l;return(l=document.getElementById("edu-section"))==null?void 0:l.scrollIntoView({behavior:"smooth"})},children:"see education pricing"})]}),e.jsxs("section",{className:"edu-section",id:"edu-section",children:[e.jsx("h2",{children:"Education Pricing"}),e.jsx("p",{className:"edu-subtitle",children:"Special rates for students, professors, and ceramic arts departments."}),e.jsxs("div",{className:"edu-grid",children:[e.jsxs("div",{className:"edu-card",children:[e.jsx("h3",{children:"Student"}),e.jsx("div",{className:"edu-price",children:"Free"}),e.jsx("p",{className:"edu-desc",children:"Solo-level access for students with a .edu email address. Auto-verified on signup."}),e.jsx("button",{className:"edu-cta",onClick:()=>a(!0),children:"Sign Up with .edu"})]}),e.jsxs("div",{className:"edu-card edu-card-highlight",children:[e.jsx("h3",{children:"Classroom"}),e.jsxs("div",{className:"edu-price",children:["$300",e.jsx("span",{className:"edu-period",children:"/year"})]}),e.jsx("p",{className:"edu-desc",children:"Pro access for up to 30 students. Perfect for a single course section in glaze calculation or ceramic chemistry."}),e.jsx("a",{className:"edu-cta",href:"mailto:contact@stullatlas.app?subject=Classroom%20License%20Inquiry",children:"Request Classroom License"})]}),e.jsxs("div",{className:"edu-card",children:[e.jsx("h3",{children:"Department"}),e.jsxs("div",{className:"edu-price",children:["$750",e.jsx("span",{className:"edu-period",children:"/year"})]}),e.jsx("p",{className:"edu-desc",children:"Full Atlas 3D access for unlimited seats across your entire ceramics program. All students and faculty."}),e.jsx("a",{className:"edu-cta",href:"mailto:contact@stullatlas.app?subject=Department%20License%20Inquiry",children:"Request Department License"})]})]}),e.jsxs("p",{className:"edu-footnote",children:["Budget tight? If you're a professor who wants to use Stull Atlas in the classroom but can't swing the license fee, ",e.jsx("a",{href:"mailto:contact@stullatlas.app?subject=Edu%20Budget%20Request",children:"just reach out"}),". We'll figure it out."]})]}),e.jsxs("section",{className:"pricing-faq",children:[e.jsx("h2",{children:"Frequently Asked"}),e.jsxs("details",{children:[e.jsx("summary",{children:"Can I use Stull Atlas without signing up?"}),e.jsx("p",{children:"Yes. The 2D explorer, UMF calculator, guide, and materials browser all work without an account. Creating a free account lets us save your preferences."})]}),e.jsxs("details",{children:[e.jsx("summary",{children:'What does "free through April" mean?'}),e.jsx("p",{children:"Through April 30, 2026, all features are unlocked for anyone who signs up with a verified email. No credit card required. After the free period, you can continue on the Free plan or upgrade to Solo or Pro."})]}),e.jsxs("details",{children:[e.jsx("summary",{children:"Can I cancel anytime?"}),e.jsx("p",{children:"Yes. Cancel from your account settings. You keep access until the end of your billing period."})]}),e.jsxs("details",{children:[e.jsx("summary",{children:"How do educational licenses work?"}),e.jsxs("p",{children:["Students get free Solo access with any .edu email. Professors can purchase a Classroom license ($200/yr, up to 30 seats) or a Department license ($500/yr, unlimited seats). ",e.jsx("a",{href:"mailto:contact@stullatlas.app?subject=Edu%20License%20Inquiry",children:"Email us"})," to get started."]})]}),e.jsxs("details",{children:[e.jsx("summary",{children:"Is my data safe?"}),e.jsx("p",{children:"Your recipes and settings are stored in a secure database. We never share your data. Export your data at any time."})]}),e.jsxs("details",{children:[e.jsx("summary",{children:"Do you offer a conference discount?"}),e.jsxs("p",{children:["Yes! At NCECA 2026 in Detroit (March 25–28): ",e.jsx("strong",{children:"3 months of Pro for $29"})," or ",e.jsx("strong",{children:"3 months of Atlas 3D for $49"})," — sign up at the booth or online through March 28."]})]})]})]}),e.jsx(z,{isOpen:d,onClose:()=>a(!1),defaultTab:"signup"}),s&&e.jsx("div",{className:"upgrade-overlay",onClick:()=>c(null),children:e.jsxs("div",{className:"upgrade-notice",onClick:l=>l.stopPropagation(),children:[e.jsx("h3",{children:r?"Free Through April":"Get Started Today"}),e.jsx("p",{children:r?"Sign up with a verified email to unlock all Pro features through April 30, 2026. No credit card needed.":"Online payments coming soon — request access by email and we'll get you set up."}),r?e.jsx("button",{className:"upgrade-notice-cta",style:{border:"none",cursor:"pointer"},onClick:()=>{c(null),a(!0)},children:"Sign Up Free"}):e.jsx("a",{href:`mailto:contact@stullatlas.app?subject=${encodeURIComponent(`${s.tier.charAt(0).toUpperCase()+s.tier.slice(1)} Access Request`)}&body=${encodeURIComponent(`Hi, I'd like to upgrade to ${s.tier}.

Email: ${s.email}`)}`,className:"upgrade-notice-cta",children:"Request Access"}),e.jsx("button",{className:"upgrade-notice-close",onClick:()=>c(null),children:"Maybe later"})]})}),e.jsx("style",{children:`
        .pricing-page {
          flex: 1;
          overflow-y: auto;
          display: flex;
          justify-content: center;
        }

        .pricing-content {
          max-width: 1100px;
          width: 100%;
          padding: 40px 24px 60px;
        }

        .pricing-hero {
          text-align: center;
          margin-bottom: 40px;
        }

        .pricing-hero h1 {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 12px;
          color: var(--text-bright);
        }

        .pricing-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0;
        }

        .pricing-free-banner {
          margin-top: 16px;
          padding: 10px 20px;
          border-radius: 8px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
          font-size: 14px;
          font-weight: 500;
        }

        .pricing-free-link {
          background: none;
          border: none;
          color: #10b981;
          text-decoration: underline;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          padding: 0;
        }

        .billing-toggle {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-bottom: 32px;
          background: var(--bg-tertiary, var(--bg-secondary));
          border-radius: 8px;
          padding: 4px;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }

        .billing-btn {
          padding: 8px 20px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
        }

        .billing-active {
          background: var(--bg-secondary);
          color: var(--text-bright);
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }

        .billing-save {
          font-size: 11px;
          color: #10b981;
          font-weight: 600;
          margin-left: 6px;
        }

        .tier-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 60px;
        }

        @media (max-width: 900px) {
          .tier-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 540px) {
          .tier-grid { grid-template-columns: 1fr; }
        }

        .tier-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .tier-highlight {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent);
        }

        .tier-current {
          border-color: var(--accent);
        }

        .tier-current-badge {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: #000;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 12px;
          border-radius: 10px;
        }

        .tier-name {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 8px;
          color: var(--text-bright);
        }

        .tier-price {
          margin-bottom: 12px;
        }

        .tier-amount {
          font-size: 30px;
          font-weight: 700;
          color: var(--text-bright);
        }

        .tier-period {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .tier-desc {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0 0 20px;
          flex: 0;
        }

        .tier-cta {
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid var(--accent);
          background: var(--accent-bg);
          color: var(--text-bright);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          margin-bottom: 20px;
        }

        .tier-cta:hover:not(:disabled) {
          background: var(--accent-hover);
        }

        .tier-cta:disabled {
          opacity: 0.5;
          cursor: default;
        }

        .tier-highlight .tier-cta {
          background: var(--accent);
          color: #fff;
        }

        .tier-features {
          list-style: none;
          margin: 0;
          padding: 0;
          font-size: 13px;
          color: var(--text-label);
          flex: 1;
        }

        .tier-features li {
          padding: 5px 0;
          border-top: 1px solid var(--border-primary);
        }

        .tier-features li::before {
          content: '✓ ';
          color: #10b981;
          font-weight: 600;
        }

        .pricing-faq {
          max-width: 700px;
          margin: 0 auto;
        }

        .pricing-faq h2 {
          font-size: 22px;
          font-weight: 600;
          margin: 0 0 20px;
          color: var(--text-bright);
        }

        .pricing-faq details {
          border-bottom: 1px solid var(--border-primary);
        }

        .pricing-faq summary {
          padding: 14px 0;
          cursor: pointer;
          font-size: 14px;
          color: var(--text-primary);
          font-weight: 500;
        }

        .pricing-faq summary:hover {
          color: var(--text-bright);
        }

        .pricing-faq details p {
          margin: 0 0 14px;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .pricing-faq details a {
          color: var(--text-link);
        }

        .edu-section {
          max-width: 900px;
          margin: 0 auto 60px;
        }

        .edu-section h2 {
          font-size: 22px;
          font-weight: 600;
          color: var(--text-bright);
          margin: 0 0 8px;
          text-align: center;
        }

        .edu-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0 0 24px;
          text-align: center;
        }

        .edu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        @media (max-width: 700px) {
          .edu-grid { grid-template-columns: 1fr; }
        }

        .edu-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 10px;
          padding: 24px 20px;
          text-align: center;
        }

        .edu-card-highlight {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent);
        }

        .edu-card h3 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-bright);
          margin: 0 0 8px;
        }

        .edu-price {
          font-size: 28px;
          font-weight: 700;
          color: var(--text-bright);
          margin-bottom: 8px;
        }

        .edu-period {
          font-size: 14px;
          color: var(--text-secondary);
          font-weight: 400;
        }

        .edu-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0 0 16px;
        }

        .edu-cta {
          display: inline-block;
          padding: 8px 24px;
          border-radius: 6px;
          border: 1px solid var(--accent);
          background: var(--accent-bg);
          color: var(--text-bright);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.15s;
        }

        .edu-cta:hover {
          background: var(--accent-hover);
        }

        .edu-card-highlight .edu-cta {
          background: var(--accent);
          color: #fff;
        }

        .edu-footnote {
          margin-top: 20px;
          font-size: 13px;
          color: var(--text-secondary);
          text-align: center;
          opacity: 0.85;
        }

        .edu-footnote a {
          color: var(--accent);
        }

        .edu-callout {
          text-align: center;
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 60px;
        }

        .edu-callout-link {
          background: none;
          border: none;
          color: var(--text-link);
          font-size: 14px;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
        }

        .upgrade-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .upgrade-notice {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 32px;
          max-width: 420px;
          width: 90%;
          text-align: center;
        }

        .upgrade-notice h3 {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 600;
          color: var(--text-bright);
          margin: 0 0 12px;
        }

        .upgrade-notice p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0 0 24px;
        }

        .upgrade-notice-cta {
          display: block;
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          background: var(--accent);
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          text-align: center;
          margin-bottom: 10px;
        }

        .upgrade-notice-cta:hover {
          opacity: 0.9;
        }

        .upgrade-notice-close {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 13px;
          cursor: pointer;
          padding: 6px;
        }

        .upgrade-notice-close:hover {
          color: var(--text-secondary);
        }
      `})]})}export{L as PricingPage};
