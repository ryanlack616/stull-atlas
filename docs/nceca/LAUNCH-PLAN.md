# NCECA Launch Plan — Master Checklist
## Stull Atlas → NCECA 2026, Detroit — March 25-28
### Last updated: February 11, 2026

---

## Current State (as of tonight)

| Area | Status | Notes |
|------|--------|-------|
| App | **Live** | stullatlas.app — HTTP 200 |
| Tests | **294/294 passing** | tsc clean, vite build clean |
| Version | **v3.5.0** | Gallery complete, lightbox, carousel, keyboard nav |
| Glazes | **9,000+** | UMF fingerprinting, blend tools, comparison mode |
| Free period | **Active** | All features unlocked through April 30, 2026 |
| Demo mode | **Working** | `?demo=1` URL param — skips welcome, shows banner |
| Mobile | **Ready** | Breakpoints for 768px and 480px added |
| First Principle | **In README** | "Useful for Potters" — Henry Crissman named |
| Git | **Clean** | master, pushed to origin, HEAD at 53f3db5 |

---

## 42-Day Sprint Plan (Feb 11 → Mar 28)

### Phase 1: Outreach (Feb 11-17) — "Open the doors"
- [ ] Send Henry Crissman email (draft ready at `docs/nceca/email-henry-crissman.md`)
- [ ] Send Tony Hansen permission email
- [ ] Send Derek Philipau courtesy email
- [ ] Email resourcehall@nceca.net to confirm table
- [ ] Create @stullatlas Instagram account
- [ ] First Instagram post (app screenshot + "Coming to NCECA")
- [ ] Verify Plausible analytics account is active

### Phase 2: Network (Feb 18-28) — "Widen the circle"
- [ ] Reach out to Ken Shenstone (Facebook)
- [ ] Connect with Steven Johnson (Rovin, in person)
- [ ] Contact Brett Gray & Kevin Kwiatkowski (Pewabic)
- [ ] Social media: feature showcase posts (Gallery, UMF tools, blend calculator)
- [ ] Join ceramics Facebook groups, start contributing
- [ ] Finalize community graph data — add corrections from Henry if he's responded
- [ ] Get community graph to demo-ready state

### Phase 3: Build Sprint (Mar 1-14) — "Make it undeniable"
- [ ] Community graph: polish UI for NCECA kiosk demo
- [ ] Refresh screenshots for v3.5 Gallery features
- [ ] Test demo mode end-to-end (`?demo=1` on phone + laptop)
- [ ] Print handout cards (`nceca-handout-card.html` → PDF → print shop)
- [ ] Social media: AI & Optimizer content, community workflow demos
- [ ] Prepare community graph kiosk: "Add yourself to the network" flow
- [ ] Second pass on Henry's email if first didn't land — phone call?

### Phase 4: Polish (Mar 15-24) — "Leave nothing to chance"
- [ ] Final production deploy — stullatlas.app
- [ ] Verify QR code → `/#/nceca` landing
- [ ] Hardware check: laptop charged, hotspot ready, backup device
- [ ] Demo script rehearsal: 60-second pitch, 3-minute deep dive
- [ ] Pack booth: laptop, phone stand, printed cards, QR display, signage
- [ ] NCECA countdown social posts
- [ ] Community graph: seed with any new data from outreach responses

### Phase 5: NCECA (Mar 25-28) — "Show, don't tell"
- [ ] Resource Hall table: Stull Atlas on laptop, community graph on second screen
- [ ] Kiosk mode: visitors add themselves to the community graph live
- [ ] Collect emails/contacts for post-NCECA follow-up
- [ ] Henry at booth (offer extra Resource Hall pass — 3 included, only need 1)
- [ ] Daily social posts from the floor
- [ ] Take photos of booth visitors for community graph v2.0

### Phase 6: Follow-Up (Mar 29 - Apr 7) — "Keep the momentum"
- [ ] Send follow-up emails to all new contacts (templates ready)
- [ ] Add NCECA contacts to community graph
- [ ] Post NCECA recap on Instagram
- [ ] Evaluate: what worked, what didn't, what's next

---

## People — Emails to Send

### Priority 1: By Feb 14

| Who | Why | Email | Status | Draft Location |
|-----|-----|-------|--------|----------------|
| **Henry Crissman** | First Principle author, Ceramics School Hamtramck, today's meeting at Rovin | Need his email (ask Henry directly or via Virginia Torrence) | **Draft ready** | `docs/nceca/email-henry-crissman.md` |
| **Tony Hansen** | Digitalfire — proprietary material data, permission genuinely needed | tony@digitalfire.com | **Draft ready** | `docs/nceca/permission-emails.md` |
| **Derek Philipau** | Glazy — CC BY-NC-SA 4.0 (legally covered), but courtesy/relationship email | derek@glazy.org | **Draft ready** | `docs/nceca/permission-emails.md` |

### Priority 2: By Feb 21

| Who | Why | Contact |
|-----|-----|---------|
| **Ken Shenstone** | Albion Anagama, Henry's mentor, Ryan donated brick to NOMMO kiln | Facebook: Ken Shenstone Ceramic Studio |
| **Steven Johnson** | Rovin Ceramics Ann Arbor, recurring meeting point with Henry | In person or via Rovin |
| **Brett Gray** | Pewabic Pottery | Via Pewabic |
| **Kevin Kwiatkowski** | Pewabic Pottery | Via Pewabic |
| **resourcehall@nceca.net** | Confirm booth availability | resourcehall@nceca.net |

### Priority 3: Post-NCECA follow-ups

- 4 email templates ready in `src/marketing/email-followup-templates.md`
- A/B subject lines included

---

## Marketing Assets

### Ready
| Asset | Location | Notes |
|-------|----------|-------|
| QR code (300dpi) | `docs/nceca/qr-nceca-300dpi.png` | Points to stullatlas.app (verify — should be `/#/nceca`) |
| og-image | `docs/nceca/og-image.png` | For social sharing / link previews |
| Email header | `docs/nceca/email-header.png` | Branded ASCII art header for Supabase auth emails |
| Handout card (HTML) | `src/marketing/nceca-handout-card.html` | 2-up print layout for letter paper |
| Booth plan | `src/marketing/nceca-booth-plan.md` | Hardware, software, demo script, talking points |
| Instagram templates | `src/marketing/instagram-post-templates.md` | 8 posts + 5 reels + hashtag sets |
| Social outreach plan | `src/marketing/social-outreach-plan.md` | 6-week content calendar starting Feb 10 |
| Logo permission drafts | `src/marketing/logo-permission-emails.md` | Derek Au + Tony Hansen logo usage requests |
| Master plan | `src/marketing/MASTER-PLAN.md` | Full strategy doc |
| Screenshots | `src/marketing/assets/screenshots/` | 8 screenshots — may need refresh for v3.5 Gallery |

### Not Ready
| Asset | What's Needed | Priority |
|-------|--------------|----------|
| **Stripe payment links** | Create products in Stripe dashboard, get payment link URLs, add to `.env.local` | Medium — not needed until post-free-period (May) |
| **Supabase project** | Schema SQL ready in `docs/`, auth store ready, just needs project creation + credentials | Medium — auth works without it during free period |
| **Dev deploy** | `scripts/deploy-dev.ps1` exists, `dist-dev/` exists, but `stullatlas.app/rje/dev/` returns error | Low — main site works fine |
| **Instagram account** | Create @stullatlas, set bio, first post | **High — Week 1 task (this week)** |
| **Domain email** | Verify hello@stullatlas.app works | Medium |
| **Screenshot refresh** | 8 existing screenshots may not show v3.5 Gallery features | Medium — before handout card printing |

---

## Analytics

| Item | Status |
|------|--------|
| Plausible script | **In source** `index.html` — `data-domain="stullatlas.app"` |
| Plausible account | **Unknown** — need to verify account exists at plausible.io |
| Plausible paying? | Free trial or paid? Check. Script will silently fail if no account. |

---

## Content Calendar — Key Dates

| Date | Action |
|------|--------|
| **Feb 10-14** | Send Henry, Tony, Derek emails. Create @stullatlas Instagram. First post. |
| **Feb 14** | Permission email deadline (Tony + Derek) |
| **Feb 17-23** | Feature showcase posts. Join Facebook groups. |
| **Feb 24-Mar 2** | AI + Optimizer content. Nerdy crowd. |
| **Mar 3-9** | Community content. Real potter workflow demos. |
| **Mar 10-16** | NCECA countdown. Booth prep hardware check. |
| **Mar 17-24** | Final push. Deploy prod build. Verify demo mode. Print handout cards. |
| **Mar 18** | Go-live target for production deploy |
| **Mar 25-28** | **NCECA — Resource Hall, Detroit (Huntington Place)** |
| **Mar 28-Apr 7** | Post-NCECA follow-up emails |

---

## The Network (Henry's Social Graph)

```
Henry Crissman (Ceramics School, Hamtramck)
    ↓ mentored by
Ken Shenstone (Albion Anagama, Albion MI)
    ↑ Ryan donated brick to NOMMO kiln
    ↑ Henry & Virginia Torrence wrote about Ken (Ceramics Monthly, April 2024)

Steven Johnson (Rovin Ceramics, Ann Arbor)
    = recurring meeting point for Henry + Ryan

Brett Gray & Kevin Kwiatkowski (Pewabic Pottery)
    = named in First Principle network

Gary Navarre (Norway, MI → downstate)
    → gave Ryan the Olympic kiln
    → soft brick from Olympic → Ken's NOMMO dome
```

All are potential NCECA connections and Stull Atlas stakeholders. Henry is the linchpin — his endorsement carries weight with the rest.

---

## Software Tasks Before NCECA

| Task | Priority | Effort | Notes |
|------|----------|--------|-------|
| Verify QR code points to `/#/nceca` | High | 5 min | Scan it |
| Refresh screenshots with v3.5 Gallery | Medium | 30 min | Gallery grid, lightbox, photo badges |
| Test demo mode end-to-end | High | 15 min | `?demo=1` on phone + laptop |
| Print handout cards | High | 15 min | `nceca-handout-card.html` → PDF → print shop |
| Stripe products + links | Medium | 1 hr | Only if you want to take payment at NCECA |
| Supabase project creation | Medium | 30 min | Only if you want sign-ups at NCECA |
| v3.6 "The Walk" features | Low | Multi-day | UMF delta display, interpolation — nice to have, not blocking |

---

## For Henry Specifically

- **Link to send:** `stullatlas.app` (no hash, no params — just the clean URL)
- **Email draft:** `docs/nceca/email-henry-crissman.md`
- **What he'll see:** Full app, all features unlocked, 9,000+ glazes, no login required
- **Why it matters:** His feedback is the First Principle. If he uses it and finds it useful, that validates everything. If he doesn't, we need to know why.
- **Follow-up plan:** Ask for his honest reaction. Not compliments — critique. What's confusing? What's missing? What would he actually use while mixing?
