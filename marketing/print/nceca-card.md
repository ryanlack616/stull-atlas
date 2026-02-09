# NCECA Business Card Spec

## Dimensions
- **Size**: 3.5" × 2" (standard US business card)
- **Bleed**: 0.125" on all sides
- **Safe zone**: 0.125" inside trim
- **Corners**: 0.125" radius round

## Front Layout
```
┌──────────────────────────────────┐
│                                  │
│    STULL ATLAS                   │
│    Navigate the chemistry        │
│    of ceramics.                  │
│                                  │
│    Scan for 30 days free →       │
│              ┌─────┐            │
│              │ QR  │            │
│              │CODE │            │
│              └─────┘            │
│                                  │
└──────────────────────────────────┘
```
- Background: Dark indigo (#1E1B4B)
- Text: White (#F5F3FF)
- QR Code: White on indigo, 0.75" × 0.75"
- QR URL: `https://rlv.lol/stullv2/#/nceca?code=NCECA-XXXX-XXXX`

## Back Layout
```
┌──────────────────────────────────┐
│                                  │
│  ✓ Interactive Stull Charts      │
│  ✓ 10,000+ glaze recipes        │
│  ✓ Blend calculators             │
│  ✓ AI-powered suggestions        │
│                                  │
│  rlv.lol/stullv2                 │
│                                  │
└──────────────────────────────────┘
```
- Background: White
- Text: Dark indigo (#1E1B4B)
- Check marks: Amber (#F59E0B)
- URL: Indigo, bold

## Print Notes
- Each card gets a **unique QR code** with a unique trial code
- Print run: 500 cards (matches trial code batch)
- Stock: 16pt matte with soft-touch laminate
- Vendor: TBD (Moo, Vistaprint, or local)

## QR Code Generation
Use `qrcode` npm package or similar:
```
URL pattern: https://rlv.lol/stullv2/#/nceca?code=NCECA-{4char}-{4char}
Error correction: M (15%)
Size: 0.75" at 300dpi = 225×225 pixels minimum
Format: SVG preferred for print
```
