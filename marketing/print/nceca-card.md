# NCECA Business Card Spec

## Dimensions
- **Size**: 3.5" × 2" (standard US business card)
- **Bleed**: 0.125" on all sides
- **Safe zone**: 0.125" inside trim
- **Corners**: 0.125" radius round

## Front Layout
```
+----------------------------------+
|                                  |
|    STULL ATLAS                   |
|    Navigate the chemistry        |
|    of ceramics.                  |
|                                  |
|    Free through April 2026 ->    |
|              +-----+            |
|              | QR  |            |
|              |CODE |            |
|              +-----+            |
|                                  |
+----------------------------------+
```
- Background: Dark indigo (#1E1B4B)
- Text: White (#F5F3FF)
- QR Code: White on indigo, 0.75" x 0.75"
- QR URL: `https://stullatlas.app` (same on all cards)

## Back Layout
```
┌──────────────────────────────────┐
│                                  │
│  ✓ Interactive Stull Charts      │
│  ✓ 3,000+ glaze recipes         │
│  ✓ Blend calculators             │
│  ✓ AI-powered suggestions        │
│                                  │
│  stullatlas.app                 │
│                                  │
└──────────────────────────────────┘
```
- Background: White
- Text: Dark indigo (#1E1B4B)
- Check marks: Amber (#F59E0B)
- URL: Indigo, bold

## Print Notes
- All cards have the **same QR code** pointing to stullatlas.app
- Free Pro access through April 30, 2026 -- sign up with any email
- Print run: 300 cards
- Stock: 16pt matte with soft-touch laminate
- Vendor: MOO (Super Soft Touch, 18pt)

## QR Code Generation
Single QR code for all cards:
```
URL: https://stullatlas.app
Error correction: M (15%)
Size: 0.75" at 300dpi = 225×225 pixels minimum
Format: SVG preferred for print
```
