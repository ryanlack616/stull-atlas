# NCECA 2026 — Booth Setup & Operations Plan
## Resource Hall · Detroit · March 25-27, 2026

---

## Booth Specs (Resource Hall)
- **Space**: 6-foot table + 2 chairs
- **Included**: 3 four-day passes, signage
- **Open**: March 25-27 (Resource Hall closed March 28)
- **Contact**: resourcehall@nceca.net

---

## Hardware Kit

### Must-Have
| Item | Purpose | Notes |
|------|---------|-------|
| Laptop #1 | Attendee hands-on exploration | Run in demo mode. Big trackpad helps. |
| Laptop #2 or tablet | Your demo / presentation screen | Mirror to external display if possible |
| External monitor (15-17") | Visible from aisle for draw-in | Portable USB-C monitor ideal |
| Personal wifi hotspot | Conference wifi will fail you | Tether to phone if no dedicated hotspot |
| Power strip + 10ft extension | Tables sometimes have inconvenient outlets | |
| Phone charger cable | You'll be filming + demoing all day | |
| USB backup drive | Offline fallback if everything dies | Pre-loaded with screenshots + pitch deck |

### Nice-to-Have
| Item | Purpose | Notes |
|------|---------|-------|
| iPad or tablet | Email signup kiosk | Run a Google Form or Typeform |
| Bluetooth keyboard | Makes demo typing faster/cleaner | |
| Small desk lamp | Booths can be dim | Clip-on LED, warm white |
| Table cloth (dark) | Professional look, hide cables | Black or charcoal, no wrinkles |

---

## Software Setup (Night Before)

```bash
# 1. Enable demo mode (bypasses auth, fake Pro profile)
# In .env or .env.local:
VITE_DEMO_MODE=true

# 2. Build production bundle
npm run build

# 3. Serve locally (no internet dependency)
npx serve dist -p 5173

# 4. Or use dev server as fallback
npm run dev
```

### Pre-load the app with good demo state:
- Open Explorer with cone 6 filter active (most attendees fire cone 6)
- Have a glaze selected in the detail panel (e.g., a classic tenmoku)
- Keep a triaxial blend pre-configured and ready to show
- Have the AI suggest panel ready with "satin celadon cone 6" typed

### Demo Script (5 minutes, flexible)

**Hook** (30 sec): "This is Stull Atlas — 9,000 real glazes mapped on a Stull chart. Every dot is a recipe someone mixed and fired."

**Explore** (90 sec): Click a point → show recipe + UMF → show similarity panel → "See these 5 similar glazes? They're ranked by oxide distance." Toggle 3D mode briefly — visual wow.

**Calculate** (60 sec): Open triaxial blend → "Pick 3 glazes, set divisions, get every blend point with recipes. Export CSV for your notebook."

**Optimize** (60 sec): Open optimizer → "Set your target UMF — say you want SiO₂ 3.5, Al₂O₃ 0.35 — and it finds material recipes that hit those numbers."

**Suggest** (30 sec): Open AI suggest → type "matte white cone 6, no barium" → show result. This is always the jaw-dropper.

**Close** (30 sec): "The explorer and UMF calculator are always free. We've got a $29 deal for 3 months of the full Pro suite — scan the QR or grab a card."

---

## Print Materials Checklist

| Item | Qty | File | Print Specs |
|------|-----|------|-------------|
| Handout cards (half-page) | 200 | `nceca-handout-card.html` | 80-110 lb cardstock, color |
| QR poster (tabletop) | 2 | Generate separately | 11"×17" or larger, QR for stullatlas.app/#/nceca |
| QR poster (standing) | 1 | Generate separately | 24"×36" foam board or retractable banner |
| Business cards | 100 | Create | Standard 3.5"×2", URL + QR + tagline |

### QR Code Specs
- **URL**: `https://stullatlas.app/#/nceca`
- **Size**: Minimum 1" for cards, 4"+ for posters
- **Error correction**: Level H (30% — handles slight damage/smudging)
- **Color**: Dark on light, high contrast. Can use brand purple (#4f46e5) on white.
- **Test it**: Print a test QR at poster size and scan from 6 feet away

---

## Physical Props (The Secret Weapon)

A tech demo at a ceramics conference needs a physical bridge:
- **3-5 fired test tiles** from a triaxial blend — lay them on the table next to the screen showing the same triaxial in the app. Physical + digital side by side = instant credibility.
- **A notebook** with handwritten glaze notes next to the import/export feature = "bring your notebook into the digital age"
- **A mug or bowl** you glazed with a recipe from the app. If someone asks "does it work?" you hand them the proof.

---

## Lead Capture

### Method 1: QR → Google Form (Easiest)
Create a simple Google Form:
- Name
- Email  
- Cone range (dropdown: Low / Mid / High)
- "What would be most useful?" (checkboxes: blend calculators / recipe database / AI suggestions / optimizer)

Print the form QR on a small standing card: "Get free Pro access through April — scan to sign up"

### Method 2: iPad Kiosk
- Same Google Form, but open in Safari on an iPad
- Set it as a kiosk (Guided Access mode on iOS)
- Stand it up with a tablet stand
- "Sign up here for free Pro access"

### Method 3: Handout card QR → NCECA landing page
- They scan at the booth or later from their hotel
- /#/nceca page handles signup
- This is the lowest-friction option and already built

**Goal**: Collect 50-100 emails over 3 days. Follow up within 48 hours.

---

## Daily Schedule Template

### Setup Day (March 24, evening or March 25 morning)
- [ ] Arrive early, find booth location
- [ ] Set up table cloth, display, laptop(s)
- [ ] Test wifi / hotspot connectivity
- [ ] Test demo mode — run through full demo once
- [ ] Print materials laid out: cards in neat stack, QR poster visible
- [ ] Test tiles / physical pieces arranged
- [ ] Photo of booth setup for social media

### Conference Days (March 25-27)
| Time | Activity |
|------|----------|
| 8:00 AM | Arrive, power on everything, test QR |
| 8:30 AM | Instagram story: "Day [X] at NCECA — come find us at [location]" |
| 9:00 AM - 5:00 PM | Demos, conversations, card handouts |
| 12:00 PM | Lunch break — stagger with second person if possible |
| 3:00 PM | Quick social post: interesting conversation, attendee reaction, demo clip |
| 5:00 PM | Pack sensitive items if booth is unsecured overnight |
| Evening | Review collected emails, note memorable conversations |

### Breakdown Day (March 27 end or March 28)
- [ ] Pack everything
- [ ] Final booth photo
- [ ] Thank-you post that evening
- [ ] Export all collected emails

---

## Talking Points for Common Questions

**"How is this different from Glazy?"**
> "Glazy is the database — it's where all this data comes from, and Derek Au did amazing work making it open. Stull Atlas is a different lens on that data — interactive Stull charts, blend calculators, an optimizer, AI suggestions. They're complementary. If you love Glazy, you'll like having this too."

**"How is this different from Insight/Insight-Live?"**
> "Insight is a recipe-level calculation tool — you enter a recipe and get the chemistry. Stull Atlas starts from the other direction — you see the whole landscape of glazes first, then drill into individual recipes. Plus the blend calculators and AI suggestions are unique. We actually support Insight XML import."

**"Is this free?"**
> "The explorer, UMF calculator, materials database, and guide are always free. Blend calculators, the optimizer, and AI suggestions are in the Pro tier — $18/month or we've got a $29 for 3 months NCECA deal."

**"What data do you use?"**
> "9,000+ recipes from Glazy's open database, all CC BY-NC-SA 4.0. Materials data informed by Digitalfire. Both are credited prominently on the About page."

**"Can I import my own recipes?"**
> "Yes — JSON or CSV import. You can also export everything you save."

**"Does this work offline?"**  
> "The web app needs a connection, but we're building a desktop version (Stull Atlas Studio) with full offline support."

**"Who built this?"**
> "I did — I'm Ryan Lack, I'm a potter in Howell, Michigan, about an hour from here. I wanted a better way to visualize glaze chemistry, and this is what happened."

---

## Emergency Fallback Plans

| Failure | Fallback |
|---------|----------|
| No wifi, hotspot dead | Run from local `npx serve dist` — entire app works offline once built |
| Laptop dies | Show from phone (responsive), or use backup screenshots on USB |
| External monitor fails | Demo from laptop screen, angle toward aisle |
| No one comes to booth | Walk the floor with business cards, start conversations at other booths |
| QR code doesn't scan | Have URL printed clearly on card, verbal: "stullatlas.app/nceca" |
| Supabase/auth is down | Demo mode bypasses auth entirely — this is already built |
