# Stull Atlas — Landing Page & Homepage Plan
## What visitors see at stullatlas.app before they sign up

---

## Current State
- The app loads directly into the Explorer (with Welcome overlay for first visits)
- No external marketing homepage — the app IS the homepage
- NCECA page exists at /#/nceca
- Pricing page exists at /#/pricing
- About page exists at /#/about

## Decision: Separate Homepage vs. App-as-Homepage

### Option A: Keep app-as-homepage (RECOMMENDED for now)
**Pros**: No new infrastructure, the product IS the pitch, zero friction to demo
**Cons**: No SEO-friendly landing page, no conversion funnel before they're in the app
**When**: Pre-NCECA, limited time, single developer

### Option B: Separate marketing site at stullatlas.app, app at app.stullatlas.app
**Pros**: SEO, conversion funnel, professional presence, can be a simple static page
**Cons**: Two deployments to maintain, subdomain setup, DNS changes
**When**: Post-NCECA, when you have traction and want to optimize conversion

### Option C: Hybrid — marketing homepage component within the app
**Pros**: Single deployment, can A/B test, serves both purposes
**Cons**: More complex routing, SPA isn't great for SEO
**When**: If you want something before NCECA without the infra overhead

**Recommendation**: Stick with Option A for now. The Welcome overlay + NCECA page 
handle the "what is this?" question. Post-NCECA, build Option B as a simple static 
site (even a single HTML page on Netlify/Vercel).

---

## Future Marketing Homepage (Option B) — Spec

### Hero Section
```
┌─────────────────────────────────────────────┐
│                                             │
│     ⚗ Stull Atlas                          │
│                                             │
│     The ceramicist's workbench              │
│     for glaze chemistry                     │
│                                             │
│     9,000+ real glazes mapped on            │
│     interactive Stull charts.               │
│     Blend, optimize, discover.              │
│                                             │
│     [Try Free →]     [See Plans]            │
│                                             │
│     ┌─────────────────────────────┐         │
│     │   (Screenshot of explorer)  │         │
│     │   with a glaze selected     │         │
│     └─────────────────────────────┘         │
│                                             │
└─────────────────────────────────────────────┘
```

### Feature Sections (scroll down)

**Section 1: Explore**
- Screenshot: 2D explorer with cone 6 filter, a glaze selected
- Copy: "Every dot is a glaze someone mixed and fired. Filter by cone, surface, color, atmosphere. Click any point for the full recipe, UMF breakdown, and the 5 most similar glazes."

**Section 2: Calculate**
- Screenshot: Triaxial blend with colored grid
- Copy: "Six blend calculators — line, triaxial, biaxial, quadaxial, radial, and space-filling. Set your recipes, pick your divisions, export CSV for the studio. Plan before you mix."

**Section 3: Optimize**
- Screenshot: Optimizer with target values and converged result
- Copy: "Set UMF targets. Gradient descent finds the nearest material recipe. Genetic algorithms explore more broadly. Both give you recipes you can weigh out today."

**Section 4: Suggest**
- Screenshot: AI suggest panel with "satin celadon cone 6" and result
- Copy: "Describe the glaze you want in plain English. The AI engine returns optimized recipes with full UMF analysis. It's not magic — it's constraint optimization with natural language on top."

**Section 5: Analyze**
- Screenshot: 3D explorer or clustering view
- Copy: "DBSCAN clustering, density heatmaps, void detection, surface fitting. See where glazes cluster, where the gaps are, and what's unexplored."

### Social Proof Section
```
"Built on data from:"
[Glazy logo/name]   [Digitalfire logo/name]

"The dataset comes from Glazy — the world's largest open glaze recipe 
database. Materials knowledge from Digitalfire's 30-year reference library."
```

### Pricing Preview
- Quick 4-column showing Free / Solo / Pro / Edu
- "Always Free: Explorer, UMF Calculator, Materials, Guide"
- [See Full Plans →]

### Footer
```
Built by Ryan Lack at My Clay Corner Studio — Howell, Michigan.
Coming to NCECA 2026 — Detroit, March 25-27.
hello@stullatlas.app
```

---

## SEO Strategy (Post-NCECA)

### Target Keywords
| Keyword | Monthly Search Vol (est.) | Competition |
|---------|--------------------------|-------------|
| glaze chemistry | 800 | Low |
| stull chart | 200 | Very low |
| glaze calculator | 500 | Low |
| UMF calculator | 300 | Very low |
| glaze recipe database | 400 | Low (Glazy dominates) |
| triaxial glaze blend | 200 | Very low |
| cone 6 glaze recipes | 1,200 | Medium |

### Pages to Target
- Homepage → "glaze chemistry explorer", "stull chart"
- /calc → "glaze calculator", "glaze blend calculator"
- /calc/triaxial → "triaxial glaze blend calculator"
- /about → "stull chart history", "ray stull 1912"
- /guide → "how to read UMF", "glaze chemistry guide"

### Meta Tags (when you build the static page)
```html
<title>Stull Atlas — Glaze Chemistry Explorer for Ceramic Artists</title>
<meta name="description" content="Map 9,000+ real glazes on interactive Stull charts. Blend calculators, recipe optimizer, and AI suggestions for ceramic artists. Free to explore." />
<meta property="og:title" content="Stull Atlas" />
<meta property="og:description" content="A computational glaze chemistry explorer — 114 years after Stull." />
<meta property="og:image" content="/og-image.png" />
<meta property="og:type" content="website" />
```

### Content Marketing Ideas (post-launch)
1. **Blog post**: "Understanding the Stull Chart — A Modern Guide" (evergreen SEO play)
2. **Blog post**: "How to Plan a Triaxial Blend Test" (practical, links to tool)
3. **Blog post**: "What 9,000 Glazes Tell Us About Cone 6 Chemistry" (data analysis)
4. **Video**: "5-Minute Tour of Stull Atlas" (YouTube, embed on homepage)
5. **PDF**: "Quick Reference: Stull Chart Regions" (lead magnet for email signups)

---

## Domain & Infrastructure Notes

- **Domain**: stullatlas.app (assumed — verify registration)
- **Email**: hello@stullatlas.app (verify this is set up and receiving)
- **Hosting**: Likely Netlify or Vercel for the SPA
- **Analytics**: Add Plausible or Fathom (privacy-respecting) before NCECA
  - Track: page views, /#/nceca visits, signup funnel
  - Don't use Google Analytics (potters don't like being tracked)

---

## Pre-NCECA Priorities (what to do NOW)

1. ✅ NCECA page exists and works
2. ✅ Pricing page exists and works  
3. ✅ Demo mode works
4. [ ] Verify stullatlas.app domain is live and pointing to the app
5. [ ] Verify hello@stullatlas.app email works
6. [ ] Add basic analytics (Plausible — one script tag)
7. [ ] Create og-image.png for social sharing (when someone shares the URL)
8. [ ] Confirm Resource Hall availability (email resourcehall@nceca.net)
9. [ ] Set up Stripe payment links for the $29 NCECA deal
