# Competitive Analysis — Stull Atlas

*Last updated: February 2026*

## Market Overview

The ceramic glaze chemistry software market is small and underserved. Only two significant tools exist, both built by solo developers over many years. Neither has venture funding or large teams. The market is niche but passionate — potters, glaze technicians, educators, and students who care deeply about craft and are willing to pay for tools that make their work better.

---

## Competitor 1: Glazy

**URL**: https://glazy.org  
**Creator**: Derek Au (solo developer)  
**Founded**: ~2016  
**Tech Stack**: Vue.js, Laravel, MySQL  
**Business Model**: Free + Patreon ($2/mo for patron features)

### What They Do Well
- **Community database**: 10,000+ recipes with user-uploaded photos and test results
- **Social/sharing**: Users verify, bookmark, and comment on each other's recipes
- **Open philosophy**: "Glazy will always remain open and free" — strong community trust
- **Free for students/teachers**: .edu email gets 12 months free patron status
- **Comprehensive reference**: Extensive help docs covering ceramic chemistry concepts
- **Recipe export**: Export to Insight, GlazeChem, recipe cards
- **Inventory & batch costing**: Track your materials and calculate batch costs
- **Kiln schedules**: Store and share firing schedules

### Patron-Only Features ($2/mo via Patreon)
- Target & Solve (reformulate a recipe with different materials)
- Blends (line, triaxial, biaxial)
- Dark mode
- Calculated thermal expansion
- Adjustable decimal places
- Limit formula overlays (Cushing, Hesselberth & Roy, Montmollin)

### Weaknesses / Gaps
- **No interactive Stull chart exploration** — has a static Stull overlay on 2D scatter, but no zooming, filtering, or 3D
- **No AI/NLP** — no natural language query ("find me a matte celadon at cone 6")
- **No optimization** — can't set a target UMF and have the system find recipes
- **No experimental design** — no space-filling, quadaxial, or radial blend tools
- **No clustering/density analysis** — no statistical analysis of the glaze landscape
- **No surface fitting** — can't model response surfaces across compositions
- **Blends are basic** — line, triaxial, biaxial only; no quadaxial, radial, or space-filling DOE
- **Limited offline** — web-only, no offline/PWA capability
- **Patreon-based billing** — no proper SaaS billing, no team management

### Their Moat
The recipe database and community. 10K+ recipes with real photos and test results is extremely hard to replicate. Users contribute because they trust Glazy and Derek.

---

## Competitor 2: Digitalfire Insight / Insight-Live

**URL**: https://insight-live.com / https://digitalfire.com  
**Creator**: Tony Hansen (solo developer)  
**Founded**: 1979 (desktop), ~2012 (Insight-Live cloud)  
**Tech Stack**: Custom PHP, SQLite (desktop), proprietary  
**Business Model**: Paid subscriptions

### Pricing
| Plan | Price | Users |
|------|-------|-------|
| Personal | $22/year (365 days) | 1 |
| Group | $179/year (365 days) | 20 |
| Managed | Custom | 20+ with training |

### What They Do Well
- **Deep chemistry expertise**: 40+ years of ceramic materials knowledge from Tony Hansen
- **Digitalfire Reference Library**: Massive free reference site (hundreds of glossary entries, materials, articles)
- **Desktop app**: Runs offline on Windows/Mac/Linux, no internet needed
- **Side-by-side recipe comparison**: Core UX since 1979 — compare two recipes and their formulas interactively
- **LIMS capability**: Projects, testing records, firing schedules — real lab information management
- **Production-grade**: Used by ceramic manufacturers and university labs worldwide
- **No tracking, no ads**: Privacy-respecting, trust-building

### Weaknesses / Gaps
- **Dated UI/UX**: Desktop app looks like 1990s software; web version is basic
- **No visualization** — no Stull chart, no 2D/3D plotting, no scatter plots of glaze populations
- **No community database** — stores only your own recipes; no browsing others' work
- **No AI/NLP** — no suggestions, no natural language
- **No blend calculators** — no triaxial, biaxial, radial, space-filling
- **No optimization** — no genetic algorithms or target-seeking
- **No analysis tools** — no clustering, density, void detection
- **Steep learning curve** — requires significant ceramic chemistry knowledge to use effectively
- **No free tier** — trial only, then paid
- **Solo developer risk** — Tony Hansen has been building this since the 1980s; succession plan unclear

### Their Moat
Credibility and depth. Tony Hansen is one of the most respected voices in ceramic technology. The Digitalfire Reference Library is the Wikipedia of ceramic chemistry. Decades of trust from production ceramicists and educators.

---

## Competitive Positioning Map

```
                    ANALYSIS DEPTH
                         ▲
                         │
           Insight-Live  │  ★ Stull Atlas
           (deep chem,   │  (visual + computational
            lab mgmt)    │   + AI + design of experiments)
                         │
     ────────────────────┼─────────────────────► VISUAL / MODERN UX
                         │
                         │
              Glazy      │
           (community,   │
            recipes,     │
            social)      │
                         │
```

## Feature Comparison Matrix

| Capability | Glazy | Insight-Live | Stull Atlas |
|---|:---:|:---:|:---:|
| **Visualization** | | | |
| Interactive 2D Stull chart | Limited | — | **Full** |
| 3D Stull chart | — | — | **Yes** |
| Glaze photos on chart | Yes | — | Planned |
| **Chemistry** | | | |
| UMF calculator | Yes | Yes | Yes |
| Target & Solve | Patron | — | Planned |
| Thermal expansion calc | Patron | Yes | Planned |
| Limit formula overlays | Patron | Yes | Yes (free) |
| Side-by-side comparison | — | **Core** | Compare Panel |
| **Blends & Design** | | | |
| Line blend | Patron | — | Solo |
| Triaxial blend | Patron | — | Pro |
| Biaxial blend | Patron | — | Pro |
| Quadaxial blend | — | — | **Pro** |
| Radial blend | — | — | **Pro** |
| Space-filling DOE | — | — | **Pro** |
| **Optimization & AI** | | | |
| Glaze optimizer | — | — | **Pro** |
| Genetic algorithm | — | — | **Pro** |
| AI suggestion engine | — | — | **Pro** |
| Natural language query | — | — | **Pro** |
| **Analysis** | | | |
| DBSCAN clustering | — | — | **Pro** |
| Density analysis | — | — | **Pro** |
| Void detection | — | — | **Pro** |
| Surface fitting | — | — | **Pro** |
| Similarity search | — | — | Solo |
| **Data & Community** | | | |
| Community recipe database | **10K+** | — | 10K+ (Glazy data) |
| User-uploaded photos | **Yes** | Yes | — |
| Social/sharing/comments | **Yes** | — | — |
| Recipe verification | **Yes** | — | — |
| **Lab Management** | | | |
| Projects & testing records | — | **Yes** | — |
| Inventory & batch costing | **Yes** | Yes | — |
| Kiln schedules | **Yes** | **Yes** | — |
| **Platform** | | | |
| Free tier | **Yes** | Trial only | **Yes** |
| Offline / desktop | — | **Yes** | PWA-capable |
| Modern web UI | Yes | — | **Yes** |
| Mobile responsive | Partial | — | **Yes** |
| API access | — | **Yes** | Planned |
| No tracking / privacy | Partial | **Yes** | **Yes** |

---

## Stull Atlas Positioning

### We Are
- The **visual exploration and computational design** tool for glaze chemistry
- The only tool with AI-powered suggestions, genetic optimization, and DOE
- Modern, fast, beautiful — the tool potters actually want to use
- Complementary to Glazy (we use their data) and Insight (we share their rigor)

### We Are Not
- A recipe database or social network (that's Glazy)
- A lab information management system (that's Insight-Live)
- A replacement for either — we're the third leg of the stool

### Our Unique Value
1. **See the landscape** — Interactive 2D/3D Stull charts showing where glazes cluster
2. **Design experiments** — Space-filling DOE, quadaxial, radial blends nobody else offers
3. **Optimize computationally** — Set a target, let the genetic algorithm find it
4. **Ask in English** — "Find me a matte celadon at cone 6" actually works
5. **Analyze patterns** — Clustering, density, voids, surface fitting reveal structure in the data

### Ideal Customer
- **Studio potter** who has outgrown guessing and wants to understand their glazes visually
- **Glaze nerd** who already uses Glazy but wants deeper analysis and design tools
- **Educator** who needs a visual, interactive way to teach glaze chemistry
- **Production potter** optimizing consistency and exploring new compositions systematically

---

## Pricing Comparison

| Tool | Free | Lowest Paid | Full Access |
|---|---|---|---|
| **Glazy** | Most features | $2/mo (Patreon) | $2/mo |
| **Insight-Live** | Trial only | ~$1.82/mo ($22/yr) | ~$14.90/mo ($179/yr group) |
| **Stull Atlas** | Explorer + UMF calc | $8/mo (Solo) | $18/mo (Pro) |

Our pricing is higher than Glazy's Patreon but justified by features neither competitor offers (AI, optimizer, DOE, advanced blends, analysis suite). We're in the same ballpark as Insight-Live Group but deliver a fundamentally different — and more modern — experience.

---

## Strategic Implications

### Coexistence, Not War
- **Glazy** is an ally. We use their dataset. Potters who love Glazy will find Stull Atlas adds a layer they can't get elsewhere. Don't compete on community or recipes.
- **Insight-Live** serves a different audience (lab/production). Respect Tony Hansen's legacy. Our tools solve different problems.

### Growth Vectors
1. **NCECA / conference presence** — Direct access to the exact audience that cares
2. **Edu market** — Classroom accounts, visual teaching tool, free for students
3. **Glazy integration** — "Open in Stull Atlas" button or browser extension
4. **Content marketing** — Blog posts analyzing glaze trends using our tools (clustering cone 6 glazes, mapping matte-to-glossy transitions, etc.)

### Risks
- **Glazy adds features** — If Derek builds optimization or AI, we lose differentiation. Our moat is computational depth + design of experiments.
- **Niche market size** — The total addressable market is small. Need to convert a high percentage to paid.
- **Data dependency** — We rely on Glazy's dataset. If they restrict access, we need our own data pipeline.
