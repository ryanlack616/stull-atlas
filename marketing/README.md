# Stull Atlas — Marketing

All marketing assets, copy, email templates, and press materials for Stull Atlas.

## Directory Structure

```
marketing/
├── README.md              ← You are here
├── copy/                  ← Landing page & promotional copy
│   ├── taglines.md        ← Brand taglines & value props
│   ├── nceca-2026.md      ← Conference-specific copy
│   ├── pricing-copy.md    ← Tier descriptions & CTAs
│   └── feature-matrix.md  ← Feature comparison tables
├── assets/                ← Logos, screenshots, social images
│   ├── logos/             ← SVG + PNG brand marks
│   ├── screenshots/       ← App screenshots for promo
│   ├── social/            ← Social media sized images
│   └── press-kit/         ← High-res assets for press
├── emails/                ← Email templates (HTML + text)
│   ├── welcome.md         ← New user welcome
│   ├── trial-activated.md ← Trial start confirmation
│   ├── trial-expiring.md  ← 3-day warning
│   ├── trial-expired.md   ← Trial ended, upgrade CTA
│   └── nceca-followup.md  ← Post-conference follow-up
└── print/                 ← Physical collateral
    ├── nceca-card.md       ← Business card spec (QR → /#/nceca?code=)
    ├── booth-banner.md     ← Banner/poster specs
    ├── usb-drive.md        ← USB drive spec (Studio Edition handout)
    └── usb-readme.html     ← Branded README page pre-loaded on USB
```

## Usage

- **Copy** files are Markdown with final approved text. Pull from these when updating React pages.
- **Assets** are the source-of-truth for brand imagery. Export from Figma/Illustrator into the appropriate subfolder.
- **Emails** are templates ready to paste into your transactional email provider (Resend, Postmark, etc.).
- **Print** specs for physical collateral — dimensions, bleed, QR code URLs.

## Brand Quick Reference

- **Product Name**: Stull Atlas
- **Tagline**: "Navigate the chemistry of ceramics."
- **Primary Color**: Indigo (#4F46E5) — dark UI uses lighter Indigo-500 (#6366F1)
- **Accent Color**: Amber (#F59E0B)
- **Dark Background**: #1E1B4B (deep indigo for print), #121212 (app dark mode)
- **Tone**: Expert but approachable. Like a knowledgeable studio mate, not a textbook.
- **Display Font**: Source Serif 4 (headings), system sans-serif (body)
- **Logos**: `assets/logos/` — wordmark-dark.svg, wordmark-light.svg, icon-mark.svg
