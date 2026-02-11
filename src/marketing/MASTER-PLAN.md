# STULL ATLAS — MASTER PLAN
## Product Strategy · NCECA 2026 · Marketing Execution
### February 10, 2026 — Ryan Lack / My Clay Corner Studio

---

# PART I — THE PRODUCT

## 1. What Stull Atlas Is

Stull Atlas is a computational glaze chemistry explorer for ceramic artists. It maps 9,000+ real-world glaze recipes onto an interactive Stull chart — the 114-year-old coordinate system that plots SiO₂ (silica) against Al₂O₃ (alumina) to predict glaze surface quality. Every dot on the chart is a recipe someone actually mixed, fired, and documented.

In a field where most tools are spreadsheets with chemistry behind them, Stull Atlas is a spatial, visual, AI-augmented workbench. You don't search for a glaze — you walk through glaze space and find what's there.

**One-liner:** *A computational glaze chemistry explorer — 114 years after Stull.*

**Elevator pitch (30 seconds):**
> Stull Atlas maps 9,000+ real glaze recipes on interactive Stull charts. Filter by cone, surface, color — click any point to see the full recipe and UMF breakdown. It has blend calculators, a recipe optimizer, and an AI engine that takes plain-English descriptions like "satin celadon, cone 6" and gives you optimized recipes. The explorer and UMF calculator are always free.

**Conference pitch (10 seconds):**
> "It's like Google Maps for glaze chemistry — 9,000+ real glazes on a Stull chart. Try it free, scan the QR code."

---

## 2. Current Product State (v3.5.0)

### Version History
| Version | Codename | What Shipped | Status |
|---------|----------|-------------|--------|
| **3.4** | The Compass | Weighted 5-axis similarity, surface prediction heatmap, proximity system, exploration breadcrumbs | ✅ Shipped |
| **3.5** | The Gallery | Photo thumbnails in nearby list, gallery mode, image carousel, click-to-zoom lightbox | ✅ Shipped |

**Stability:** 269/269 tests passing, TypeScript clean, production build at HEAD (018348f on master).

**Dataset:** 9,000+ glazes sourced from Glazy (CC BY-NC-SA 4.0), materials data from Digitalfire.

---

## 3. Feature Inventory — What Exists Today

### Always Free (No Account Needed)
| Feature | Description |
|---------|-------------|
| **2D Stull Chart Explorer** | Interactive scatter plot of all 9,000+ glazes by SiO₂ vs. Al₂O₃. Stull region overlays (Matte, Bright Gloss, Semi-Matte, Crazed, Underfired, Unfused). Temperature contour lines. |
| **Glaze Detail Panel** | Click any dot → full recipe, UMF breakdown, firing info, source link |
| **UMF Calculator** | Enter a recipe by weight → get Unity Molecular Formula |
| **Materials Browser** | Searchable raw materials database with oxide analyses (from Digitalfire) |
| **Interactive Guide** | In-depth documentation: reading Stull charts, UMF, blend planning, glossary |
| **Color Modes** | Color by cone, surface type, source, flux ratio (R₂O:RO), boron, confidence |
| **Light/Dark Mode** | Theme preference saved between sessions |
| **Print Support** | Ctrl+P on any page → clean paper layout |

### Solo Tier ($10/month or $89/year)
| Feature | Description |
|---------|-------------|
| **Similarity Search** | 5 most similar glazes ranked by oxide distance |
| **Glaze Compare** | Side-by-side UMF comparison of up to 3 glazes |
| **Save Recipes** | Persistent personal glaze library |
| **Import/Export** | JSON, CSV, Insight XML import + export |
| **Line Blend Calculator** | Interpolate between 2 recipes across N steps |
| **Limit Warnings** | Oxide limit validation alerts |

### Pro Tier ($25/month or $219/year)
| Feature | Description |
|---------|-------------|
| **Triaxial Blend** | 3-corner blend with configurable divisions |
| **Biaxial Blend** | 2-axis grid blend (4 corners) |
| **Quadaxial Blend** | 4-material blend |
| **Radial Blend** | Circular blend pattern around center |
| **Space-Filling Designs** | Algorithmic blend exploration using space-filling curves |
| **Recipe Optimizer** | Set UMF targets → gradient descent finds material recipe |
| **Genetic Optimizer** | Evolutionary algorithm explores broader recipe space |
| **AI Suggestion Engine** | Plain-English input ("satin celadon cone 6") → optimized recipe |
| **DBSCAN Clustering** | Auto-detect clusters in glaze data |
| **Density Analysis** | Heatmap of where glazes concentrate |
| **Void Detection** | Find unexplored gaps in chemistry space |

### Atlas 3D Tier ($40/month or $349/year)
| Feature | Description |
|---------|-------------|
| **3D Stull Chart Explorer** | SiO₂ × Al₂O₃ × configurable Z-axis (cone, flux ratio, boron, any oxide). Full orbit, zoom, rotate. |
| **Proximity Exploration** | Sphere-based neighborhood with distance lines, cross-highlight, filter pills |
| **3D Surface Fitting** | Fit mathematical surfaces to glaze regions |
| **3D Export (OBJ / STL / CSV)** | Export 3D glaze landscapes as meshable geometry |
| **Lighting & Material Controls** | Adjustable lighting, surface materials for 3D rendering |
| **Camera Presets & Auto-Rotate** | Named viewpoints, cinematic auto-rotation |
| **Aesthetic Compass** | 5-axis weighted similarity with presets (Balanced, Chemistry Twin, Same Surface, Same Cone, Flux Sibling) |
| **Surface Prediction Heatmap** | Nadaraya-Watson kernel classification paints the Stull floor with matte/gloss/satin predictions |

### Education Pricing
| Tier | Price | Scope |
|------|-------|-------|
| **Student** | Free | Solo-level access with .edu email — auto-verified |
| **Classroom** | $300/year | Pro access for up to 30 students (one course section) |
| **Department** | $750/year | Full Atlas 3D for unlimited seats across the entire ceramics program |

---

## 4. The 3D Glaze Exploration — Scope & Vision

The 3D explorer is the differentiator. No one else is building spatial glaze navigation.

### What It Does Today
- Plots all 9,000+ glazes in three dimensions: SiO₂ (x) × Al₂O₃ (y) × configurable Z-axis
- Z-axis options: cone temperature, flux ratio, boron content, individual oxides
- Full orbit camera: drag to rotate, scroll to zoom, middle-drag for free orbit
- 15-level discrete cone colorscale (04 through 10, each cone gets a unique color)
- Stull regions and temperature contours projected onto the chart floor
- Click any point → detail panel with recipe, UMF, similarity panel
- Proximity sphere: adjustable radius shows nearby glazes with distance lines
- Surface prediction heatmap paints the floor with matte/gloss/satin predictions
- Aesthetic Compass: 5-axis weighted similarity (SiO₂, Al₂O₃, Z, Cone, Surface) with named presets
- Gallery mode: photo thumbnails in the nearby list, image carousel in detail panel
- 3D export: OBJ, STL, and CSV output of the glaze landscape
- Camera presets and auto-rotate for presentation/demo use

### Where It's Going (Roadmap)
| Version | Feature | Description |
|---------|---------|-------------|
| **v3.6 The Walk** | Recipe interpolation | Animated path between two glazes — slider shows UMF step by step, surface prediction updates, recipe delta as material adjustments |
| **v3.7 Constellations** | Named glaze families | Auto-detected clusters with names ("Celadon Territory," "Tenmoku Belt"), boundary polygons, navigation picker |
| **v3.8 Knowledge Graph** | Visual graph navigation | Force-directed graph with photos inside nodes, relationship edges, "fly to" search, exploration history trails |
| **v3.9 Controls** | Spatial navigation keys | WASD orbit, keyboard shortcuts for every feature, mouse+key power combos, printable reference card |
| **v3.10 Studio** | Material substitution | Pick a material → see substitutes → see UMF shift on chart. Live recipe ↔ chart sync. |
| **v4.0 Community** | Shared exploration | User profiles, saved paths, shared annotations, federated database |

### Why This Matters
Traditional glaze tools (Insight, Glazy, HyperGlaze) show you a recipe as a list of numbers. Stull Atlas shows you a *landscape*. You can see where your glaze lives, what's near it, and what terrain you'd cross to get somewhere else. The 3D explorer makes that literal — you're not reading a spreadsheet, you're orbiting a world of 9,000 glazes.

**No one is building this.** Not Glazy (social-first), not Digitalfire (reference-first), not Insight (desktop calculator). We're building the first tool where you can SEE what a glaze looks like, UNDERSTAND where it lives in chemistry space, and WALK toward what you want to make.

### Competitive Position
| Capability | Glazy | Digitalfire | Insight | **Stull Atlas** |
|-----------|-------|-------------|---------|-----------------|
| Recipe calculator | ✓ | ✓ | ✓ | ✓ |
| UMF display | ✓ | ✓ | ✓ | ✓ |
| Stull chart | — | static | — | **Interactive 3D** |
| Weighted similarity | — | — | — | **✅ v3.4** |
| Surface prediction | — | — | — | **✅ v3.4** |
| Photo exploration | list | — | — | **✅ v3.5** |
| Recipe interpolation | — | — | — | **Planned v3.6** |
| Glaze families | tags | — | — | **Planned v3.7** |
| Knowledge graph | — | — | — | **Vision v3.8** |
| AI suggestion engine | — | — | — | **✅ Now** |
| 6 blend calculators | — | — | — | **✅ Now** |

---

# PART II — NCECA 2026 CONFERENCE PLAN

## 5. Conference Overview

| Item | Detail |
|------|--------|
| **Event** | NCECA (National Council on Education for the Ceramic Arts) Annual Conference |
| **Location** | Detroit, Michigan |
| **Dates** | March 25–27, 2026 (Resource Hall closed March 28) |
| **Booth** | Resource Hall — 6-foot table, 2 chairs, 3 four-day passes, signage |
| **Contact** | resourcehall@nceca.net |
| **Distance** | ~1 hour from Howell, MI — no hotel needed |

### Conference Goals (Prioritized)
1. **Lead generation** — Collect 50–100 email addresses of serious glaze potters
2. **Brand awareness** — Establish Stull Atlas as a known name in the glaze chemistry community
3. **Revenue** — Sell $29/3-month Pro deals at the booth
4. **Feedback** — Hear what potters actually want from a glaze tool
5. **Community** — Connect with Derek Au (Glazy), Tony Hansen (Digitalfire), educators, and working potters

---

## 6. Booth Setup & Operations

### Hardware Kit
| Item | Purpose | Priority |
|------|---------|----------|
| Laptop #1 | Attendee hands-on exploration | Must-have |
| Laptop #2 or tablet | Presenter demo screen | Must-have |
| External monitor (15-17" USB-C) | Aisle-visible draw-in display | Must-have |
| Personal wifi hotspot | Conference wifi will fail | Must-have |
| Power strip + 10ft extension | Tables have inconvenient outlets | Must-have |
| iPad or tablet | Email signup kiosk (Google Form) | Nice-to-have |
| Table cloth (dark, wrinkle-free) | Professional look, hide cables | Nice-to-have |

### Software Setup (Night Before)
```bash
# Enable demo mode (bypasses auth, fake Pro profile)
VITE_DEMO_MODE=true

# Build production bundle for offline capability
npm run build

# Serve locally (no internet dependency)
npx serve dist -p 5173
```

### Pre-loaded Demo State
- Explorer with cone 6 filter active (most attendees fire cone 6)
- A glaze selected in detail panel (e.g., a classic tenmoku)
- Triaxial blend pre-configured and ready to show
- AI suggest panel ready with "satin celadon cone 6" typed

### Physical Props (The Secret Weapon)
Tech demo at a ceramics conference needs a physical bridge:
- **3–5 fired test tiles** from a triaxial blend — laid on the table next to the screen showing the same triaxial. Physical + digital side by side = instant credibility.
- **A notebook** with handwritten glaze notes next to the import feature = "bring your notebook into the digital age"
- **A mug or bowl** glazed with a recipe from the app. "Does it work?" → hand them the proof.

### Demo Script (5 minutes, flexible)

| Segment | Time | What to Show |
|---------|------|-------------|
| **Hook** | 30 sec | "This is Stull Atlas — 9,000 real glazes mapped on a Stull chart. Every dot is a recipe someone mixed and fired." |
| **Explore** | 90 sec | Click a point → recipe + UMF → similarity panel → "See these 5 similar glazes? Ranked by oxide distance." Toggle 3D briefly — visual wow. |
| **Calculate** | 60 sec | Triaxial blend → "Pick 3 glazes, set divisions, get every blend point with recipes. Export CSV for your notebook." |
| **Optimize** | 60 sec | Optimizer → "Set your target UMF — SiO₂ 3.5, Al₂O₃ 0.35 — and it finds material recipes that hit those numbers." |
| **Suggest** | 30 sec | AI suggest → type "matte white cone 6, no barium" → show result. This is always the jaw-dropper. |
| **Close** | 30 sec | "$29 gets you 3 months of Pro — scan the QR or grab a card." |

### Daily Schedule
| Time | Activity |
|------|----------|
| 8:00 AM | Arrive, power on everything, test QR |
| 8:30 AM | Instagram story: "Day [X] at NCECA" |
| 9:00 AM – 5:00 PM | Demos, conversations, card handouts |
| 12:00 PM | Lunch — stagger if second person available |
| 3:00 PM | Quick social post: interesting conversation, demo clip |
| 5:00 PM | Pack sensitive items if booth unsecured overnight |
| Evening | Review collected emails, note memorable conversations |

### Talking Points for Common Questions

**"How is this different from Glazy?"**
> "Glazy is the database — Derek Au did amazing work making it open. Stull Atlas is a different lens on that data — interactive Stull charts, blend calculators, an optimizer, AI suggestions. They're complementary."

**"How is this different from Insight?"**
> "Insight is recipe-level calculation. Stull Atlas starts from the other direction — see the whole landscape first, then drill into recipes. Plus blend calculators and AI suggestions are unique."

**"Is this free?"**
> "The explorer, UMF calculator, materials database, and guide are always free. Blend calculators, optimizer, and AI suggestions are Pro — $18/month or $29 for 3 months NCECA deal."

**"Who built this?"**
> "I did — I'm Ryan Lack, a potter in Howell, Michigan, about an hour from here. I wanted a better way to visualize glaze chemistry, and this is what happened."

### Emergency Fallbacks
| Failure | Fallback |
|---------|----------|
| No wifi, hotspot dead | `npx serve dist` — entire app works offline once built |
| Laptop dies | Demo from phone (responsive), or backup screenshots on USB |
| External monitor fails | Demo from laptop, angle toward aisle |
| Nobody comes | Walk the floor with business cards |
| QR doesn't scan | URL printed on card: stullatlas.app/nceca |
| Supabase/auth down | Demo mode bypasses auth entirely |

---

## 7. Lead Capture Strategy

### Method 1: QR → NCECA Landing Page (Primary)
Attendees scan QR at booth or later from hotel → `stullatlas.app/#/nceca` handles signup. Lowest friction — already built.

### Method 2: iPad Kiosk (Backup)
Google Form in Safari Guided Access mode on iPad. Fields: Name, Email, Cone Range, "What would be most useful?"

### Method 3: Handout Card (Passive)
Card with QR → NCECA page. They sign up on their own time. 200 printed.

**Goal:** 50–100 emails over 3 days. Follow up within 48 hours.

---

# PART III — MARKETING MATERIALS INVENTORY

## 8. What Exists and How Each Piece Gets Used

### Print Materials

| Material | File | Status | Quantity | How It Gets Used |
|----------|------|--------|----------|-----------------|
| **Handout Cards** | `marketing/nceca-handout-card.html` | ✅ Designed | Print 200 | Half-page cardstock. Handed to every person who stops at the booth. Has QR code, feature list, pricing, URL. They take it to their hotel and scan it later. 60% of signups will come from these. |
| **QR Poster (tabletop)** | Not yet generated | ❌ Needs creation | Print 2 | 11"×17" standing poster on table. QR points to `stullatlas.app/#/nceca`. Visible from 3–4 feet. Draws people to scan while you're talking to someone else. |
| **QR Poster (standing)** | Not yet generated | ❌ Needs creation | Print 1 | 24"×36" foam board or retractable banner. Visible from the aisle 10+ feet away. This is the "billboard" — it pulls foot traffic to the booth. Must be readable from far away. |
| **Business Cards** | Not yet designed | ❌ Needs creation | Print 100 | Standard 3.5"×2". For networking conversations — hand to educators, gallery owners, other vendors. URL + QR + tagline. Smaller, more personal than the handout card. |

### Digital Assets

| Asset | File | Status | How It Gets Used |
|-------|------|--------|-----------------|
| **NCECA Landing Page** | `pages/NCECAPage.tsx` | ✅ Built | URL: `/#/nceca`. This is where every QR code points. Hero + signup form + feature showcase + deal cards + screenshots. The "front door" for every conference contact. |
| **Pricing Page** | `pages/PricingPage.tsx` | ✅ Built | URL: `/#/pricing`. 4-tier grid (Free/Solo/Pro/Atlas 3D) + monthly/annual toggle + education section + FAQ. Where people go when they're deciding whether to pay. |
| **About Page** | `pages/AboutPage.tsx` | ✅ Built | Full product explanation, Stull chart history, UMF primer, credits to Glazy and Digitalfire. Establishes credibility and shows respect for the community. |
| **og-image.png** | Not yet created | ❌ Needs creation | 1200×630px. Shows when someone shares stullatlas.app on Facebook, Twitter, iMessage, Slack. Dark background, 3D explorer screenshot, "Stull Atlas" branding. Without this, shared links look broken. |
| **Demo Mode** | `useKioskMode.ts` + env vars | ✅ Built | Activated via `VITE_DEMO_MODE=true` or `?demo=1` URL param. Bypasses auth with fake Pro profile. All features unlocked. Used at the booth so attendees can touch everything without signing up first. |
| **Screenshots** | `marketing/assets/screenshots/` | ✅ Exist | Used on NCECA page, social posts, handout card. 3 screenshots: full explorer, detail panel, calculators. |

### Social Media Templates

| Template Set | File | Status | How It Gets Used |
|-------------|------|--------|-----------------|
| **Instagram Posts (8 templates)** | `marketing/instagram-post-templates.md` | ✅ Written | 8 ready-to-use captions with image specs. Cover: introduction, history (1912 vs now), triaxial, AI suggest, 3D explorer, optimizer, NCECA announcement, "built by a potter" origin story. Post 1 per week starting Feb 10 through NCECA. |
| **Instagram Reels (5 concepts)** | Same file, bottom section | ✅ Written | 15–30 second screen recordings. "Every dot is a glaze," "Type what you want," "Plan your triaxial," "1912 → 2026," "Booth setup." Reels get 3–5x reach vs static posts. |
| **Hashtag Sets** | Same file, bottom section | ✅ Written | 4 ready-to-paste sets: Primary (every post), Secondary (rotate), NCECA-specific (start March 3), Discovery/reach. |

### Outreach Templates

| Template | File | Status | How It Gets Used |
|----------|------|--------|-----------------|
| **Logo Permission Emails** | `marketing/logo-permission-emails.md` | ✅ Drafted | 2 emails: Derek Au (Glazy) and Tony Hansen (Digitalfire). Requesting permission to display their logos next to attribution. Send by Feb 14. Polite, specific, includes what you've built and how you credit them. |
| **Post-NCECA Follow-up Emails (4)** | `marketing/email-followup-templates.md` | ✅ Written | 4-email drip sequence: (1) Thank you + Pro access live (send within 48 hours), (2) Personalized follow-up for engaged conversations, (3) 2-week reminder before trial expires, (4) End of free period — what stays free, what's paid. |

### Strategy Documents

| Document | File | Status | Purpose |
|----------|------|--------|---------|
| **Booth Plan** | `marketing/nceca-booth-plan.md` | ✅ Complete | Hardware kit, software setup, demo script, daily schedule, talking points, lead capture, emergency fallbacks |
| **Social Outreach Plan** | `marketing/social-outreach-plan.md` | ✅ Complete | 6-week content calendar (Feb 10 → March 25), platform priority tiers, messaging framework, key dates |
| **Landing Page Plan** | `marketing/landing-page-plan.md` | ✅ Complete | Homepage strategy (app-as-homepage now, separate marketing site later), future homepage spec, SEO keywords, meta tags |
| **This Document** | `marketing/MASTER-PLAN.md` | ✅ Current | Unified strategy document tying everything together |

---

# PART IV — MARKETING EXECUTION TIMELINE

## 9. Six-Week Countdown (Feb 10 → March 25)

### WEEK 1: Feb 10–16 — SETUP & PERMISSIONS
**Theme:** Get the foundations in place. Nothing public yet except Instagram.

| Task | Owner | Deadline | Status | Notes |
|------|-------|----------|--------|-------|
| Create @stullatlas Instagram account | Ryan | Feb 10 | ❌ | Bio: "Glaze chemistry explorer · 9,000+ recipes · Interactive Stull charts · Free to try · NCECA 2026" |
| First Instagram post (POST 1: Introduction) | Ryan | Feb 10–12 | ❌ | Screenshot of 2D explorer with glaze selected. Caption from templates. |
| Link in bio → stullatlas.app/#/nceca | Ryan | Feb 10 | ❌ | |
| Send permission email to Derek Au (Glazy) | Ryan | Feb 14 | ❌ | Template in `logo-permission-emails.md`. Be warm — he's more likely to respond. |
| Send permission email to Tony Hansen (Digitalfire) | Ryan | Feb 14 | ❌ | Use contact form at digitalfire.com. Template ready. |
| Confirm Resource Hall availability with NCECA | Ryan | Feb 14 | ❌ | Email resourcehall@nceca.net |
| Create og-image.png | Agent | Feb 14 | ❌ | 1200×630px, dark bg, 3D screenshot, branding |
| Generate QR code (print-ready, 300 DPI) | Ryan/Agent | Feb 16 | ❌ | URL: stullatlas.app/#/nceca. Error correction Level H. Brand purple (#4f46e5) on white. Test scan from 6 feet. |

### WEEK 2: Feb 17–23 — FEATURE SHOWCASES
**Theme:** Show the product. Educational + visual content.

| Task | Owner | Deadline | Notes |
|------|-------|----------|-------|
| Instagram POST 2: Then vs. Now (1912 chart) | Ryan | Feb 17 | Side-by-side original Stull + explorer |
| Instagram POST 3: Triaxial Blend | Ryan | Feb 19 | Screenshot + caption from templates |
| Instagram REEL 1: "Every dot is a glaze" | Ryan | Feb 21 | 15-second screen recording |
| Join 2–3 Facebook groups | Ryan | Feb 17 | Critical Craft Forum, Glaze Chemistry for Potters, Cone 6 Potters |
| Answer a glaze chemistry question in a group using the app | Ryan | Feb 20 | Show value first, don't pitch |
| Set up Stripe payment links | Ryan | Feb 20 | Solo ($10/$89), Pro ($25/$219), Atlas 3D ($40/$349), NCECA deal ($29/3mo) |

### WEEK 3: Feb 24 – Mar 2 — AI & OPTIMIZER + REDDIT
**Theme:** Show the "wow" features. Expand beyond Instagram.

| Task | Owner | Deadline | Notes |
|------|-------|----------|-------|
| Instagram POST 4: AI Suggest (the hook) | Ryan | Feb 24 | Screen recording of typing "matte celadon cone 6" → recipe appears |
| Instagram POST 5: 3D Explorer | Ryan | Feb 26 | Dramatic angle of 3D chart, colored by cone |
| Reddit post: r/pottery | Ryan | Feb 24 | "I built a free glaze chemistry explorer with 9,000+ glazes — would love feedback." Be genuine. |
| Cross-post to r/ceramics | Ryan | Feb 25 | |
| Instagram POST 6: Optimizer | Ryan | Feb 28 | Target UMF values → converged result |
| Add analytics (Plausible, not Google) | Ryan/Agent | Mar 1 | One script tag. Track page views, /#/nceca, signup funnel. Potters don't like being tracked. |

### WEEK 4: Mar 3–9 — NCECA BUILDUP
**Theme:** Start branding as a conference presence. The deal goes public.

| Task | Owner | Deadline | Notes |
|------|-------|----------|-------|
| Start using #NCECA2026 #NCECADetroit on every post | Ryan | Mar 3 | |
| Instagram POST 7: NCECA Announcement | Ryan | Mar 3 | "We're coming to NCECA 2026. Detroit. March 25–27. Resource Hall." |
| Instagram POST 8: "Built by a Potter" | Ryan | Mar 5 | Photo from studio or a mug glazed with an app recipe |
| The $29/3-month deal announcement graphic | Ryan | Mar 7 | Clean, visual, easy to understand |
| 3D explorer "wow" screenshot post | Ryan | Mar 9 | |

### WEEK 5: Mar 10–16 — PRE-CONFERENCE PUSH
**Theme:** Urgency. Countdown. Print.

| Task | Owner | Deadline | Notes |
|------|-------|----------|-------|
| "1 week until NCECA" countdown post | Ryan | Mar 10 | |
| Feature summary carousel (5 slides) | Ryan | Mar 12 | Explore → Calculate → Optimize → Suggest → Analyze |
| Print handout cards (200 copies, heavy cardstock) | Ryan | Mar 10 | From `nceca-handout-card.html`. Color, thick stock. |
| Print QR poster (11×17 tabletop, 2 copies) | Ryan | Mar 10 | |
| Print QR poster (24×36 standing, 1 copy) | Ryan | Mar 10 | Foam board or retractable banner |
| Print business cards (100) | Ryan | Mar 12 | |
| Go live: deploy to stullatlas.app root | Ryan | Mar 14–18 | `npm run deploy` — promote dev build to production |
| Post in Facebook groups: "Heading to NCECA" | Ryan | Mar 14 | |
| Email blast to any collected addresses | Ryan | Mar 16 | If you have a list |

### WEEK 6: Mar 17–24 — WEEK OF
**Theme:** Final prep. Last social push. Pack.

| Task | Owner | Deadline | Notes |
|------|-------|----------|-------|
| Test demo mode end-to-end | Ryan | Mar 20 | `VITE_DEMO_MODE=true`, build, serve, walk full demo |
| Pack gear: laptops, monitor, power strip, hotspot | Ryan | Mar 22 | Checklist in booth plan |
| Prepare test tiles and physical pieces | Ryan | Mar 22 | 3–5 tiles from a triaxial + a mug or bowl |
| "See you tomorrow at NCECA" post | Ryan | Mar 24 | |
| Setup booth (March 24 evening or 25 morning) | Ryan | Mar 24–25 | Photo of setup for social |

### POST-NCECA: Mar 28+
| Task | Owner | Deadline | Notes |
|------|-------|----------|-------|
| Follow-up emails — within 48 hours | Ryan | Mar 30 | Template in `email-followup-templates.md` |
| Thank-you post with booth photos | Ryan | Mar 28 | |
| Share attendee reactions/quotes | Ryan | Mar 30 | |
| Blog post: "What I Learned Showing Glaze Software at NCECA" | Ryan | Apr 5 | For Ceramic Arts Network or personal blog |
| Pitch Ceramics Monthly for coverage | Ryan | Apr 10 | "New Tool for Glaze Chemistry" angle |
| 2-week follow-up email (to non-engagers) | Ryan | Apr 10 | Template 3 in email-followup-templates |
| End-of-trial email | Ryan | April 25 | Template 4 — what stays free, what's paid |

---

# PART V — TECHNICAL GAPS & INFRASTRUCTURE

## 10. Things That Must Be Done Before NCECA

### Critical Path (Blocking)
| Task | Detail | Owner | Deadline |
|------|--------|-------|----------|
| **Stripe payment links** | Create products + prices in Stripe. Solo ($10/$89), Pro ($25/$219), Atlas 3D ($40/$349), NCECA deal ($29/3mo). Set env vars `VITE_STRIPE_LINK_*` in Netlify. | Ryan | Mar 1 |
| **Supabase project setup** | Schema SQL ready in `docs/supabase-schema.sql`. Need to create project, run migrations, add `atlas_3d` to tier enum. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. | Ryan | Mar 1 |
| **Domain verification** | Verify stullatlas.app is live, DNS correct, SSL working. | Ryan | Feb 20 |
| **Email setup** | Verify hello@stullatlas.app and contact@stullatlas.app work. Needed for educator inquiries and customer support. | Ryan | Feb 20 |
| **QR code generation** | High-res (300 DPI), Level H error correction, brand purple on white. Test print at poster size, scan from 6 feet. | Ryan/Agent | Feb 16 |
| **Print materials** | Cards (200), tabletop poster (2), standing poster (1), business cards (100). Order by Mar 10 to have in hand by Mar 20. | Ryan | Mar 10 |

### Important (Not Blocking, But Highly Valuable)
| Task | Detail | Owner | Deadline |
|------|--------|-------|----------|
| **og-image.png** | 1200×630px for social sharing. Without this, shared links show generic/broken preview. | Agent | Feb 14 |
| **Analytics** | Plausible or Fathom (privacy-respecting). Track page views, NCECA page visits, signup funnel. One script tag. | Ryan/Agent | Mar 1 |
| **Logo permission responses** | Need replies from Derek and Tony before March 10 print deadline. If no response, use text-only attribution (no logos on printed materials). | Ryan | Mar 10 |
| **Re-scrape Glazy for images** | Only ~13 glazes have photos. Gallery view is limited without more. Would significantly improve the 3D and Gallery experience for demos. | Agent | Mar 1 |

---

# PART VI — REVENUE MODEL & PROJECTIONS

## 11. Pricing Architecture

### NCECA Special: $29 for 3 Months Pro
This is the lead offer. It's 46% off monthly Pro ($25 × 3 = $75 → $29). 

**Why:** It gets people past the "I'll try it later" barrier. Three months gives them time to actually integrate it into studio work. If they use it for spring firing season, they'll convert to paid.

### Steady-State Pricing
| Tier | Monthly | Annual | Annual Savings |
|------|---------|--------|----------------|
| Free | $0 | $0 | — |
| Solo | $10 | $89 | 2 months free |
| Pro | $25 | $219 | 2 months free |
| Atlas 3D | $40 | $349 | 2 months free |

### Free Through April Strategy
All signed-up users get full Pro access through April 30, 2026. This is the `FREE_UNTIL = 2026-04-30` constant. No credit card needed. This:
- Removes friction at the booth ("just sign up, it's free through April")
- Gives everyone a real trial, not a crippled one
- Creates a natural conversion point in late April

### Revenue Scenarios (Conservative)
| Scenario | NCECA Signups | Convert to Paid (10–20%) | Avg Annual Revenue |
|--------|--------------|-------------------------|-------------------|
| Low | 50 | 5 at Solo ($89) | $445/yr |
| Base | 100 | 15 mixed Solo/Pro | ~$2,200/yr |
| Good | 100 | 10 Solo + 5 Pro + 2 Atlas 3D | ~$2,588/yr |
| Word-of-mouth (6 mo) | +200 organic | 30 mixed | ~$5,000+/yr |

Revenue is a secondary goal. The primary goals are community awareness and product validation. If 100 potters try it and 15 come back, the product works.

---

# PART VII — POSITIONING & MESSAGING

## 12. Who This Is For

### Primary Audience
- **Studio potters who mix from raw materials** — They read Digitalfire, they care about UMF, they do triaxial tests. They're the ones who'll immediately understand what the Stull chart means. 
- **Ceramic arts students and professors** — Glaze chemistry courses need visualization tools. The education pricing makes institutional adoption possible.

### Secondary Audience
- **Hobby potters exploring glaze chemistry for the first time** — The free explorer and guide are their entry point. They might not know what UMF means yet, but the "click a dot, see a recipe" experience hooks them. 
- **Production potters optimizing existing recipes** — The optimizer and material substitution features save them time.

### Not Our Audience (Important to Know)
- Potters who only use commercial glazes (they don't mix, don't care about chemistry)
- Industrial ceramics engineers (they have Factsage, HSC Chemistry, etc.)
- People looking for a social network (that's Glazy)

## 13. Key Messages

### What We Say
1. **"114 years after Stull."** — We're extending a respected framework, not inventing something unproven.
2. **"Every dot is a real glaze."** — This is data, not theory. Someone mixed and fired each one.
3. **"Built by a potter."** — Solo maker, not a tech company. Same values as the audience.
4. **"Free to explore."** — Remove the barrier. Let curiosity pull people in.
5. **"Glazy is the database. We're the lens."** — Complementary, not competitive. Credit, don't compete.

### What We Don't Say
- We never position against Glazy or Insight. They're respected community resources. We complement them.
- We don't use the word "disrupt." We're serving a community.
- We don't oversell the AI. It's constraint optimization with NLP, not magic. But it feels like magic.
- We don't call it "the best" or "the only." We call it "a new way to see glaze chemistry."

---

# PART VIII — POST-NCECA GROWTH

## 14. After the Conference

### Immediate (March 28 – April 30)
1. Email everyone within 48 hours (templates ready)
2. Social content: booth photos, attendee reactions, demo clips
3. Blog post: "What I Learned at NCECA" — pitch to Ceramics Monthly or Ceramic Arts Network
4. Monitor: who's using the free trial? Which features? How deep?
5. Personal follow-ups with educators (classroom/department sales have the highest LTV)

### Short-term (May – August 2026)
1. Free period ends April 30 — send end-of-trial email, conversion push
2. Build separate marketing homepage (Option B from landing page plan) for SEO
3. Content marketing: 3 blog posts targeting "glaze chemistry," "stull chart," "glaze calculator" keywords
4. YouTube: 5-minute tour video (evergreen)
5. PDF lead magnet: "Quick Reference: Stull Chart Regions"

### Medium-term (Fall 2026)
1. Ship v3.6 The Walk — recipe interpolation (the "how do I make this?" feature)
2. Ship v3.7 Constellations — named glaze families
3. Target fall semester: push education pricing to ceramics departments
4. Consider a webinar: "Introduction to Glaze Chemistry with Stull Atlas"

### Long-term (2027+)
1. Stull Atlas Studio (Tauri desktop app) — full offline support
2. v3.8 Knowledge Graph — the capstone spatial experience
3. Community features: shared exploration, user annotations
4. Potential: Ceramics Monthly or CAD partnership

---

# PART IX — RISK REGISTER

## 15. What Could Go Wrong

| Risk | Severity | Likelihood | Mitigation |
|------|----------|-----------|------------|
| Nobody comes to the booth | Medium | Low | Walk the floor with cards. Post in hallways. The app demos itself if anyone clicks. |
| Conference wifi dies | High | Very High | Personal hotspot. App works offline from `npx serve dist`. |
| Stripe not set up in time | High | Medium | Free-through-April bypass means nobody needs to pay at NCECA. Manual invoicing as fallback. |
| Derek/Tony say no to logo use | Low | Low | Use text-only attribution. Already credited in About page. No logos on printed materials. |
| Supabase not set up | Medium | Medium | Demo mode + free-through-April means auth isn't required at NCECA. Can soft-launch auth post-conference. |
| Someone asks a chemistry question you can't answer | Low | Medium | Be honest: "I don't know, but let's look it up on the chart." The tool speaks for itself. |
| Negative comparison to Glazy/Insight | Medium | Medium | Prepared talking points. Always complementary, never competitive. |
| Print materials arrive late | High | Low | Order by March 10. Have PDF backup to print at FedEx same-day if needed. |

---

# APPENDICES

## A. File Reference

| File | Location | Purpose |
|------|----------|---------|
| MASTER-PLAN.md | `marketing/MASTER-PLAN.md` | This document — unified strategy |
| nceca-booth-plan.md | `marketing/nceca-booth-plan.md` | Detailed booth operations |
| social-outreach-plan.md | `marketing/social-outreach-plan.md` | 6-week social calendar |
| instagram-post-templates.md | `marketing/instagram-post-templates.md` | 8 posts + 5 reels + hashtags |
| email-followup-templates.md | `marketing/email-followup-templates.md` | 4-email post-NCECA drip |
| logo-permission-emails.md | `marketing/logo-permission-emails.md` | Derek Au + Tony Hansen emails |
| landing-page-plan.md | `marketing/landing-page-plan.md` | Homepage strategy + SEO |
| nceca-handout-card.html | `marketing/nceca-handout-card.html` | Print-ready handout card |
| roadmap.md | `docs/roadmap.md` | Product roadmap v3.5 → v4.0 |
| project-manifest.json | `docs/project-manifest.json` | Phase tracking + integration gaps |

## B. Key Dates Summary

| Date | Milestone |
|------|-----------|
| **Feb 10** | Week 1 starts: Instagram, first post |
| **Feb 14** | Permission emails to Derek + Tony |
| **Feb 14** | Confirm Resource Hall with NCECA |
| **Feb 20** | Domain + email verification |
| **Feb 24** | Reddit launch post |
| **Mar 1** | Stripe setup, analytics, Supabase |
| **Mar 3** | Start #NCECA2026 content |
| **Mar 10** | Order print materials |
| **Mar 14–18** | Go live: deploy to stullatlas.app root |
| **Mar 20** | Full demo test, pack gear |
| **Mar 24** | "See you tomorrow" post |
| **Mar 25–27** | NCECA Resource Hall — live |
| **Mar 28** | Follow-up emails + thank-you post |
| **Apr 30** | Free period ends — conversion push |

## C. Brand Assets

| Asset | Value |
|-------|-------|
| Brand color | Indigo #4f46e5 |
| Font | Segoe UI / system-ui / -apple-system |
| Icon | ⚗ (alembic emoji) |
| Tagline | "A computational glaze chemistry explorer — 114 years after Stull" |
| Domain | stullatlas.app |
| Contact | hello@stullatlas.app |

---

*Last updated: February 10, 2026 — CH-260210-3*
