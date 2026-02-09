# NCECA 2026 — Countdown Checklist

**Conference**: March 18–21, 2026 | Detroit, MI (Huntington Place)
**Today**: February 9, 2026 | **37 days out**

---

## Week 1: Feb 9–15 (5 weeks out)

### Print Orders (long lead time — do first)
- [ ] **Business cards** — Finalize artwork from `marketing/print/nceca-card.md`
  - Export QR codes (500 unique, one per card)
  - Upload to Moo / Vistaprint / local printer
  - 16pt matte, soft-touch laminate, 500 qty
  - Budget: ~$80-120
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
  - [ ] Business cards (all 500)
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
- [ ] Restock cards and USBs at booth
- [ ] Track how many cards/USBs handed out (rough count)
- [ ] Note any feature requests or common questions
- [ ] Post 1 photo/update to social media if you want

### Day 4 — Teardown (Mar 21)
- [ ] Pack everything
- [ ] Note remaining card/USB counts
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

| Item                          | Est. Cost   |
|-------------------------------|-------------|
| Booth fee                     | $1,900      |
| Booth staff (weekend)         | $320        |
| Business cards (500)          | ~$100       |
| Retractable banner            | ~$200       |
| USB drives (100, printed)     | ~$135       |
| Gas (4 days × 120 mi @ $0.25) | ~$120      |
| Parking (convention center)   | ~$80-120    |
| Hotel (0-1 nights, optional)  | $0-200      |
| Misc (food, tolls, extras)    | ~$150       |
| **Total**                     | **~$3,005-3,245** |
