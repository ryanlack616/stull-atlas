# NCECA 2026 — Countdown Checklist

**Conference**: March 25–28, 2026 | Detroit, MI (Huntington Place)
**Exhibitor Check-In/Setup**: March 24 (Tuesday)
**Resource Hall Open**: March 25–27 (Wed–Fri) | Closed Saturday
**Today**: February 9, 2026 | **44 days out**

> **Booth includes**: 3 four-day rep passes, 6' draped table, 2 chairs,
> wastebasket, ID signage, 8' back drape, 3' side drapes.

---

## Week 1: Feb 9–15 (6.5 weeks out)

### Print Orders (long lead time — do first)
- [ ] **Business cards** — Finalize artwork from `marketing/print/nceca-card.md`
  - QR code → stullatlas.app (same on every card)
  - Upload to MOO — Super Soft Touch, 18pt
  - 300 qty (flyer covers most handout needs)
  - Budget: ~$115
- [ ] **Retractable banner** — Finalize artwork from `marketing/print/booth-banner.md`
  - 33"×80", 150 DPI, PDF/X-1a
  - Screenshot of Explorer page at good angle
  - Order with stand + carry case
  - Budget: ~$150-250
- [ ] **Journals** — Vistaprint Softy Classic Journal (black, qty 50)
  - Front imprint: original 1912 Stull chart artwork
  - 80 lined pages, A6, elastic closure
  - No setup fee
  - Budget: ~$130
- [ ] **USB drives** — Metal mini style, custom logo imprint
  - 25 qty, smallest capacity
  - Imprint: Stull Atlas wordmark + stullatlas.app
  - Budget: ~$50-75
- [ ] **Small fabric bags** — Muslin/cotton drawstring pouches, 3"×4"
  - 25 qty (one per USB drive)
  - Each bag gets: USB drive + business card
  - Budget: ~$5-12
- [ ] **Quarter-sheet flyers** — Double-sided postcard handout
  - 6"×4" (or 5.5"×4.25"), 14pt cardstock, UV gloss front
  - Front: Logo, tagline, Explorer screenshot, QR code to stullatlas.app
  - Back: Feature bullets, Studio Edition callout, contact info
  - 600 qty — Vistaprint postcards or PrintPlace
  - Budget: ~$55

### Software
- [ ] Final Tauri build — `npm run tauri:build`, verify .exe installs clean
- [ ] Test Studio Edition on a fresh Windows machine (VM or second PC)
- [ ] Verify offline data loads work (disconnect WiFi after install)

---

## Week 2: Feb 16–22 (5.5 weeks out)

### Data & Backend
- [x] Implement free-month flag: all verified signups get Pro access Mar 15 – Apr 30
  - `FREE_UNTIL` date check in authStore.ts — committed `1d4dff5`
  - No trial codes needed — just sign up with verified email → full access
- [ ] Test signup → email verification → Pro features unlock flow
- [ ] **Set up custom SMTP in Supabase** (Authentication → Emails → SMTP Settings)
  - Built-in email service has 3 emails/hr rate limit — will fail at conference
  - Resend free tier: 100 emails/day, easy setup
  - Or use Postmark (free dev tier)
- [ ] Set up email templates in transactional provider (Resend/Postmark)
  - Welcome ("free through April"), nceca-followup, free-period-ending

### USB Prep
- [ ] Flash script dry run: `.\scripts\flash-usb.ps1` with 1 test USB
- [ ] Verify README.html renders correctly when opened from USB
- [ ] Confirm installer runs from USB (some drives are slow — test)

---

## Week 3: Feb 23–Mar 1 (4.5 weeks out)

### Print Arrives (check tracking)
- [ ] Business cards received — spot check QR code scans to stullatlas.app
- [ ] Quarter-sheet flyers received — check colors, QR code scans, text accuracy
- [ ] Banner received — unroll, check colors and text
- [ ] USB drives received — test imprint quality
- [ ] Journals received — check Stull chart print quality, elastic band
- [ ] Fabric bags received — check size fits USB + card

### Flash USBs
- [ ] Batch flash all 25 drives: `.\scripts\flash-usb.ps1`
- [ ] Spot check 3 random drives — insert, run installer, verify app launches
- [ ] Assemble gift bags: 1 USB + 1 business card per fabric pouch

### Web Deploy
- [ ] Final web deploy to stullatlas.app — `.\scripts\deploy.ps1`
- [ ] Smoke test: sign up → verify email → confirm Pro features unlocked
- [ ] Check Plausible analytics is tracking

---

## Week 4: Mar 2–8 (3.5 weeks out)

### Booth Logistics
- [ ] Confirm booth assignment / floor plan from NCECA
- [ ] Driving from Howell (~60 min) — plan to leave by 7 AM each day
- [ ] Optional: book 1 hotel night near Huntington Place (setup eve or late teardown)
- [ ] Research parking at/near Huntington Place (prepay if possible)
- [ ] Booth furnishing — table + 2 chairs included; do you need a monitor, power strip?
- [ ] Laptop for live demo (charged, offline data works, good screen)
- [ ] Extension cord + power strip (booths sometimes only get 1 outlet)

### Demo Prep
- [ ] Practice the 5 talking points (see `marketing/copy/nceca-2026.md`)
- [ ] Pre-load 3 demo scenarios on laptop:
  1. Explorer with Cone 6 glazes visible
  2. Similarity search: "Leach 4321"
  3. Triaxial blend between two interesting glazes
- [ ] Make sure demo laptop has both Web + Studio installed

---

## Week 5: Mar 9–15 (2.5 weeks out)

### Dry Run
- [ ] Full signup test: new email → verify → sign in → confirm Pro features
- [ ] Test on phone (mobile Safari / Chrome)
- [ ] Verify SMTP delivery speed (should be < 30 sec)
- [ ] Deploy final web build to stullatlas.app

---

## Week 6: Mar 16–22 (1 week out)

### Final Checks
- [ ] Pack checklist:
  - [ ] Retractable banner + stand + carry case
  - [ ] Business cards (all 300)
  - [ ] Journals (all 50)
  - [ ] Quarter-sheet flyers (all 600)
  - [ ] USB gift bags (all 25)
  - [ ] Demo laptop + charger
  - [ ] Extension cord / power strip
  - [ ] Phone charger
  - [ ] Tape, zip ties, small toolkit (booths always need something)
  - [ ] Water bottle, snacks
- [ ] Test stullatlas.app one more time from phone (conference WiFi is always bad)
- [ ] Charge everything

---

## Conference: Mar 24–28

### Day 0 — Setup (Tue Mar 24, 12:00–6:00 PM)
- [ ] Exhibitor check-in / badge printing (10 AM–6 PM)
- [ ] Set up booth: banner, table, laptop, cards, USB tray
- [ ] Test WiFi at venue (have offline fallback ready)
- [ ] Open Explorer on laptop, Cone 6 view ready

### Resource Hall Days (Wed–Fri, Mar 25–27)
**Hours**: Wed & Thu 9 AM – 5 PM, Fri 9 AM – 4:30 PM
- [ ] Restock cards, journals, flyers, and USB gift bags at booth
- [ ] Track how many cards/journals/flyers/USBs handed out (rough count)
- [ ] Note any feature requests or common questions
- [ ] Post 1 photo/update to social media if you want

### Fri Mar 27 — Teardown (4:30–10:30 PM)
- [ ] Pack everything
- [ ] Note remaining card/journal/flyer/USB counts
- [ ] Send follow-up email blast (nceca-followup template) within 48 hours

### Sat Mar 28 — Resource Hall CLOSED
Conference programming continues but no booth duty.

---

## Post-Conference: Mar 30 – Apr 3

- [ ] Send NCECA follow-up email to new signups from the free period
- [ ] Review Plausible analytics — traffic spike from conference?
- [ ] Check Supabase — how many new verified signups during free window?
- [ ] Plan conversion: free period ends Apr 30 — send "thanks, here's what Pro costs" email
- [ ] Write up lessons learned (what worked, what to change next time)
- [ ] Reorder materials if planning more events

---

## Budget Summary

Howell, MI → Huntington Place, Detroit: ~60 mi / 1 hr each way.
Plan to commute daily; hotel optional (1 night max if setup runs late).

| Item                          | Est. Cost   | Vendor / Notes                              |
|-------------------------------|-------------|---------------------------------------------|
| Booth fee                     | $1,900      | NCECA exhibitor registration                |
| Booth staff (weekend)         | $320        |                                             |
| Journals (50, Stull chart)    | $130        | Vistaprint Softy Classic Journal, black     |
| Business cards (300, Super)   | $115        | MOO Super 18pt Soft Touch — moo.com/us      |
| Retractable banner (33×81")   | $110        | Vistaprint Standard vinyl — vistaprint.com  |
| USB drives (25, metal mini)   | $50-75      | Custom logo imprint                         |
| Fabric pouches (25)           | $5-12       | Muslin drawstring 3"×4" — Amazon/packaging  |
| Quarter-sheet flyers (600)    | $55         | Vistaprint 6"×4" postcards, 14pt UV gloss   |
| Gas (4 days × 120 mi @ $0.25) | $120       |                                             |
| Parking (Huntington Place)    | $100        | Rooftop garage, $25/day × 4, credit card only |
| Hotel (0-1 nights, optional)  | $0-200      |                                             |
| Misc (food, tolls, extras)    | $150        |                                             |
| **Total**                     | **~$2,955-3,187** |                                       |

> **Parking tip:** Wayne State Lot 12 (6050 Woodward) is $5/day + free QLINE
> streetcar to Huntington Place — saves $80 over 4 days if you don't
> need to haul gear each morning.
