import{r as s,j as e}from"./vendor-react-D0vdeqNS.js";import{c as l,i as o}from"./index-Cx-RWLMS.js";import{u as c}from"./usePageTitle-Dfez-EUD.js";import{A as d}from"./AuthModal-Xt3bW5bL.js";import{L as r}from"./vendor-router-DjLFn5nj.js";import"./vendor-state-DTYbmM1J.js";const x="/assets/02-explorer-main-voTuCKib.png",p="/assets/03-explorer-detail-CBknkUhR.png",h="/assets/05-calculators-xaXyk8Vb.png";function v(){c("NCECA 2026 — Stull Atlas");const{user:i}=l(),[n,t]=s.useState(!1),a=o();return e.jsxs("div",{className:"nceca-page",children:[e.jsxs("div",{className:"nceca-content",children:[e.jsxs("section",{className:"nceca-hero",children:[e.jsx("span",{className:"nceca-badge",children:"NCECA 2026 — Detroit"}),e.jsx("h1",{children:"Welcome to Stull Atlas"}),e.jsxs("p",{className:"nceca-subtitle",children:["A computational glaze explorer — 114 years after Stull's original chart.",e.jsx("br",{}),"Explore 10,000+ glazes, run blend calculations, and use AI to find your next recipe."]})]}),e.jsx("section",{className:"nceca-trial",children:i?e.jsxs(e.Fragment,{children:[e.jsx("h2",{children:"You're All Set"}),e.jsx("p",{children:a?"All Pro features are unlocked through April. Dive in!":"Your account is active. Explore the full suite."}),e.jsx(r,{to:"/",className:"trial-submit",style:{display:"inline-block",textDecoration:"none",textAlign:"center"},children:"Open Explorer"})]}):e.jsxs(e.Fragment,{children:[e.jsx("h2",{children:a?"Free Through April":"Get Started"}),e.jsx("p",{children:a?e.jsxs(e.Fragment,{children:["Sign up with your email to unlock ",e.jsx("strong",{children:"all Pro features"})," — no credit card, no code needed."]}):e.jsx(e.Fragment,{children:"Create a free account to start exploring."})}),e.jsx("button",{className:"trial-submit",onClick:()=>t(!0),children:a?"Sign Up Free":"Create Account"}),e.jsxs("p",{className:"trial-note",children:["Already have an account?"," ",e.jsx("button",{className:"nceca-link",onClick:()=>t(!0),children:"Sign in"})]})]})}),e.jsxs("section",{className:"nceca-features",children:[e.jsx("h2",{children:"What You Can Do"}),e.jsxs("div",{className:"feature-grid",children:[e.jsxs("div",{className:"feature-item",children:[e.jsx("h3",{children:"Explore"}),e.jsx("p",{children:"Map 9,000+ glazes on an interactive Stull chart. Filter by cone, surface, color, and more."}),e.jsx(r,{to:"/",children:"Open Explorer"})]}),e.jsxs("div",{className:"feature-item",children:[e.jsx("h3",{children:"Calculate"}),e.jsx("p",{children:"UMF calculator, line blends, triaxial, biaxial, radial, and space-filling designs."}),e.jsx(r,{to:"/calc",children:"Open Calculators"})]}),e.jsxs("div",{className:"feature-item",children:[e.jsx("h3",{children:"Optimize"}),e.jsx("p",{children:"Set target UMF values and constraints — let the optimizer find your recipe."}),e.jsx(r,{to:"/calc/optimizer",children:"Open Optimizer"})]}),e.jsxs("div",{className:"feature-item",children:[e.jsx("h3",{children:"Suggest"}),e.jsx("p",{children:"Describe what you want in plain English. The AI engine recommends recipes."}),e.jsx(r,{to:"/suggest",children:"Open Suggestions"})]})]})]}),e.jsxs("section",{className:"nceca-screenshots",children:[e.jsx("h2",{children:"See It in Action"}),e.jsxs("div",{className:"screenshot-gallery",children:[e.jsxs("figure",{className:"screenshot-item",children:[e.jsx("img",{src:x,alt:"Stull Atlas Explorer — interactive Stull chart with 9,000+ glazes",loading:"lazy"}),e.jsx("figcaption",{children:"Interactive Stull chart with 9,000+ glazes — filter by cone, surface, color, and more"})]}),e.jsxs("figure",{className:"screenshot-item",children:[e.jsx("img",{src:p,alt:"Stull Atlas glaze detail — UMF analysis, recipe breakdown, and similar glazes",loading:"lazy"}),e.jsx("figcaption",{children:"Glaze detail panel — UMF analysis, recipe breakdown, and related glazes"})]}),e.jsxs("figure",{className:"screenshot-item",children:[e.jsx("img",{src:h,alt:"Stull Atlas calculators — UMF, line blends, triaxial, and optimizer",loading:"lazy"}),e.jsx("figcaption",{children:"Calculators: UMF converter, blend tools, optimizer, and AI suggestions"})]})]})]}),e.jsxs("section",{className:"nceca-deal",children:[e.jsx("h2",{children:"NCECA Deals"}),e.jsxs("div",{className:"deal-cards",children:[e.jsxs("div",{className:"deal-card",children:[e.jsx("h3",{children:"Pro — $29 / 3 months"}),e.jsx("p",{className:"deal-subtitle",children:"Full optimizer, AI suggestions, all blend calculators, analysis suite."}),e.jsx("p",{className:"deal-features",children:"✓ Optimizer · ✓ AI Suggestions · ✓ All Blends · ✓ Analysis"})]}),e.jsxs("div",{className:"deal-card deal-card-highlight",children:[e.jsx("h3",{children:"Atlas 3D — $49 / 3 months"}),e.jsxs("p",{className:"deal-subtitle",children:["Everything in Pro ",e.jsx("strong",{children:"plus"})," the full 3D explorer, proximity analysis, surface fitting, and 3D model export."]}),e.jsx("p",{className:"deal-features",children:"✓ Everything in Pro · ✓ 3D Explorer · ✓ Proximity · ✓ OBJ/STL Export"})]})]}),e.jsx("p",{className:"deal-fine",children:"Available at the booth or online through March 28, 2026."})]}),e.jsx("section",{className:"nceca-cta",children:e.jsxs("p",{children:["Questions? Email ",e.jsx("a",{href:"mailto:hello@stullatlas.app",children:"hello@stullatlas.app"})," or check out our"," ",e.jsx(r,{to:"/pricing",children:"plans"}),"."]})})]}),e.jsx(d,{isOpen:n,onClose:()=>t(!1),defaultTab:"signup"}),e.jsx("style",{children:`
        .nceca-page {
          flex: 1;
          overflow-y: auto;
          display: flex;
          justify-content: center;
        }

        .nceca-content {
          max-width: 800px;
          width: 100%;
          padding: 48px 24px 60px;
        }

        .nceca-hero {
          text-align: center;
          margin-bottom: 48px;
        }

        .nceca-badge {
          display: inline-block;
          padding: 4px 16px;
          border-radius: 20px;
          background: color-mix(in srgb, var(--accent) 20%, transparent);
          color: var(--accent);
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 16px;
          letter-spacing: 0.5px;
        }

        .nceca-hero h1 {
          font-size: 36px;
          font-weight: 700;
          margin: 0 0 16px;
          color: var(--text-bright);
        }

        .nceca-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .nceca-trial {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 32px;
          text-align: center;
          margin-bottom: 48px;
        }

        .nceca-trial h2 {
          font-size: 22px;
          font-weight: 600;
          margin: 0 0 8px;
          color: var(--text-bright);
        }

        .nceca-trial p {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0 0 20px;
        }

        .trial-submit {
          padding: 12px 24px;
          border-radius: 6px;
          border: 1px solid var(--accent);
          background: var(--accent);
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
        }

        .trial-submit:hover:not(:disabled) {
          opacity: 0.9;
        }

        .trial-note {
          margin: 12px 0 0;
          font-size: 13px;
          color: var(--text-dim);
        }

        .nceca-link {
          background: none;
          border: none;
          color: var(--text-link);
          font-size: 13px;
          cursor: pointer;
          padding: 0;
        }

        .nceca-link:hover {
          text-decoration: underline;
        }

        .nceca-features {
          margin-bottom: 48px;
        }

        .nceca-features h2 {
          font-size: 22px;
          font-weight: 600;
          margin: 0 0 20px;
          color: var(--text-bright);
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 540px) {
          .feature-grid { grid-template-columns: 1fr; }
          .trial-form { flex-direction: column; }
        }

        .feature-item {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          padding: 20px;
        }

        .feature-item h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 8px;
          color: var(--text-bright);
        }

        .feature-item p {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0 0 12px;
          line-height: 1.5;
        }

        .feature-item a {
          font-size: 13px;
          color: var(--text-link);
          text-decoration: none;
        }

        .feature-item a:hover {
          text-decoration: underline;
        }

        .nceca-screenshots {
          margin-bottom: 48px;
        }

        .nceca-screenshots h2 {
          font-size: 22px;
          font-weight: 600;
          margin: 0 0 20px;
          color: var(--text-bright);
        }

        .screenshot-gallery {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .screenshot-item {
          margin: 0;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border-primary);
          background: var(--bg-secondary);
        }

        .screenshot-item img {
          width: 100%;
          display: block;
          border-bottom: 1px solid var(--border-primary);
        }

        .screenshot-item figcaption {
          padding: 12px 16px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .nceca-deal {
          background: var(--bg-secondary);
          border: 2px solid var(--accent);
          border-radius: 12px;
          padding: 28px 32px;
          text-align: center;
          margin-bottom: 48px;
        }

        .nceca-deal h2 {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 16px;
          color: var(--text-bright);
        }

        .deal-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        @media (max-width: 540px) {
          .deal-cards { grid-template-columns: 1fr; }
        }

        .deal-card {
          background: var(--bg-primary, #111);
          border: 1px solid var(--border-primary);
          border-radius: 10px;
          padding: 20px;
          text-align: left;
        }

        .deal-card h3 {
          font-size: 17px;
          font-weight: 600;
          margin: 0 0 8px;
          color: var(--text-bright);
        }

        .deal-card-highlight {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent);
        }

        .deal-subtitle {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0 0 12px;
          line-height: 1.5;
        }

        .deal-features p {
          font-size: 13px;
          color: var(--text-primary);
          margin: 0 0 12px;
        }

        .deal-fine {
          font-size: 12px;
          color: var(--text-tertiary);
          margin: 0;
        }

        .nceca-cta {
          text-align: center;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .nceca-cta a {
          color: var(--text-link);
          text-decoration: none;
        }

        .nceca-cta a:hover {
          text-decoration: underline;
        }
      `})]})}export{v as NCECAPage};
