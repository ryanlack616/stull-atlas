# NCECA 2026 — Countdown Checklist

**Conference**: March 18–21, 2026 | Detroit, MI (Huntington Place)
**Today**: February 9, 2026 | **37 days out**

---

## Week 1: Feb 9–15 (5 weeks out)

### Print Orders (long lead time — do first)
- [ ] **Business cards** — Finalize artwork from `marketing/print/nceca-card.md`
  - Export QR codes (200 unique, one per card)
  - Upload to MOO — Super Soft Touch, 18pt
  - 200 qty (flyer covers most handout needs)
  - Budget: ~$80
- [ ] **Retractable banner** — Finalize artwork from `marketing/print/booth-banner.md`
  - 33"×80", 150 DPI, PDF/X-1a
  - Screenshot of Explorer page at good angle
  - Order with stand + carry case
  - Budget: ~$150-250
- [ ] **USB drives** — Order from [Brilliant Promos](https://www.brilliantpromos.com/BP-Config?ProductID=555691000)
  - 100 qty, smallest capacity, navy body
  - Imprint: Stull Atlas wordmark + stullatlas.app
  - ~10 business days production
  - Budget: ~$120 + shipping
- [ ] **Quarter-sheet flyers** — Double-sided postcard handout
  - 6"×4" (or 5.5"×4.25"), 14pt cardstock, UV gloss front
  - Front: Logo, tagline, Explorer screenshot, QR code to stullatlas.app
  - Back: Feature bullets, Studio Edition callout, contact info
  - 500 qty — Vistaprint postcards or PrintPlace
  - Budget: ~$50

### Software
- [ ] Final Tauri build — `npm run tauri:build`, verify .exe installs clean
- [ ] Test Studio Edition on a fresh Windows machine (VM or second PC)
- [ ] Verify offline data loads work (disconnect WiFi after install)

---

## Week 2: Feb 16–22 (4 weeks out)

### Data & Backend
- [ ] Load 500 trial codes into Supabase: `generate_trial_codes('NCECA_2026_A', 500)`
- [ ] Test QR → trial code redemption flow end-to-end
- [ ] Verify trial expiry logic (30 days)
- [ ] Set up email templates in transactional provider (Resend/Postmark)
  - Welcome, trial-activated, trial-expiring, trial-expired, nceca-followup

### USB Prep
- [ ] Flash script dry run: `.\scripts\flash-usb.ps1` with 1 test USB
- [ ] Verify README.html renders correctly when opened from USB
- [ ] Confirm installer runs from USB (some drives are slow — test)

---

## Week 3: Feb 23–Mar 1 (3 weeks out)

### Print Arrives (check tracking)
- [ ] Business cards received — spot check QR codes (scan 5 random)
- [ ] Quarter-sheet flyers received — check colors, QR code scans, text accuracy
- [ ] Banner received — unroll, check colors and text
- [ ] USB drives received — test imprint quality

### Flash USBs
- [ ] Batch flash all 100 drives: `.\scripts\flash-usb.ps1`
- [ ] Spot check 5 random drives — insert, run installer, verify app launches
- [ ] Pack drives in small bags or a tray for booth

### Web Deploy
- [ ] Final web deploy to stullatlas.app — `.\scripts\deploy.ps1`
- [ ] Smoke test: sign up, redeem trial code, verify Pro features unlock
- [ ] Check Plausible analytics is tracking

---

## Week 4: Mar 2–8 (2 weeks out)

### Booth Logistics
- [ ] Confirm booth assignment / floor plan from NCECA
- [ ] Driving from Howell (~60 min) — plan to leave by 7 AM each day
- [ ] Optional: book 1 hotel night near Huntington Place (setup eve or late teardown)
- [ ] Research parking at/near Huntington Place (prepay if possible)
- [ ] Booth furnishing — do you need a table, chair, monitor, power strip?
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

## Week 5: Mar 9–15 (1 week out)

### Final Checks
- [ ] Pack checklist:
  - [ ] Retractable banner + stand + carry case
  - [ ] Business cards (all 200)
  - [ ] Quarter-sheet flyers (all 500)
  - [ ] USB drives (all 100)
  - [ ] Demo laptop + charger
  - [ ] Extension cord / power strip
  - [ ] Phone charger
  - [ ] Tape, zip ties, small toolkit (booths always need something)
  - [ ] Water bottle, snacks
- [ ] Test stullatlas.app one more time from phone (conference WiFi is always bad)
- [ ] Charge everything

---

## Conference: Mar 18–21

### Day 0 — Setup (Mar 17 or early Mar 18)
- [ ] Set up booth: banner, table, laptop, cards, USB tray
- [ ] Test WiFi at venue (have offline fallback ready)
- [ ] Open Explorer on laptop, Cone 6 view ready

### Each Day
- [ ] Restock cards, flyers, and USBs at booth
- [ ] Track how many cards/flyers/USBs handed out (rough count)
- [ ] Note any feature requests or common questions
- [ ] Post 1 photo/update to social media if you want

### Day 4 — Teardown (Mar 21)
- [ ] Pack everything
- [ ] Note remaining card/flyer/USB counts
- [ ] Send follow-up email blast (nceca-followup template) within 48 hours

---

## Post-Conference: Mar 23–27

- [ ] Send NCECA follow-up email to anyone who redeemed a trial code
- [ ] Review Plausible analytics — traffic spike from conference?
- [ ] Check Supabase — how many trial codes redeemed?
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
| Business cards (200, Super)   | $80         | MOO Super 18pt Soft Touch — moo.com/us      |
| Quarter-sheet flyers (500)    | $50         | Vistaprint 6"×4" postcards, 14pt UV gloss   |
| Retractable banner (33×81")   | $110        | Vistaprint Standard vinyl — vistaprint.com  |
| USB drives (100, printed)     | $120        | Brilliant Promos SFWW0324 — brilliantpromos.com |
| Gas (4 days × 120 mi @ $0.25) | $120       |                                             |
| Parking (Huntington Place)    | $100        | Rooftop garage, $25/day × 4, credit card only |
| Hotel (0-1 nights, optional)  | $0-200      |                                             |
| Misc (food, tolls, extras)    | $150        |                                             |
| **Total**                     | **~$2,850-3,050** |                                       |

> **Parking tip:** Wayne State Lot 12 (6050 Woodward) is $5/day + free QLINE
> streetcar to Huntington Place — saves $80 over 4 days if you don't
> need to haul gear each morning.
