````markdown
# USB Drive — Studio Edition

Custom printed USB drives pre-loaded with **Stull Atlas Studio** for
handout at NCECA, clay guild workshops, and ceramic supply shops.

## Vendor
- **Source**: [Brilliant Promos — Custom USB Flash Drives](https://www.brilliantpromos.com/BP-Config?ProductID=555691000)
- **SKU**: SFWW0324
- **Base price**: ~$0.93/unit (varies by quantity)
- **Setup charge**: One-time artwork imprint fee (confirm at checkout)
- **Production time**: ~10 business days

## Recommended Order

| Qty   | Approx. Unit | Total   | Use case                     |
|-------|-------------|---------|------------------------------|
| 50    | ~$1.50      | ~$75    | Local guild demos            |
| 100   | ~$1.20      | ~$120   | NCECA booth handouts         |
| 250   | ~$1.00      | ~$250   | Full conference + extras     |

*Prices are estimates — request a formal quote.*

## Spec

| Detail           | Value                                        |
|------------------|----------------------------------------------|
| Capacity         | 128 MB minimum (installer is <4 MB)          |
| Imprint method   | Pad print or laser engrave                   |
| Logo             | Stull Atlas wordmark (white on drive body)   |
| Text line 2      | `stullatlas.app` (smaller, below logo)       |
| Color            | Navy / Dark Blue body preferred              |

## Pre-Loaded Contents

```
USB Root/
├── Stull-Atlas-Studio-Setup.exe   (~3.8 MB NSIS installer)
├── README.html                    (Branded landing page — opens in browser)
├── sample-glazes.json             (Importable sample recipes)
└── QUICK-START.txt                (Plain-text 5-line install guide)
```

### QUICK-START.txt
```
STULL ATLAS STUDIO — Quick Start
================================
1. Plug in this USB drive
2. Run "Stull-Atlas-Studio-Setup.exe"
3. Open Stull Atlas Studio from your desktop
4. (Optional) Import "sample-glazes.json" from File > Import
5. Visit stullatlas.app for the web version
```

## Imprint Artwork

Use the wordmark from `marketing/assets/logos/wordmark-light.svg`.

Print area is small (~1.5" × 0.5"), so use:
- **Line 1**: STULL ATLAS (wordmark, white)  
- **Line 2**: stullatlas.app (smaller, 6pt equivalent)

If laser engraving, supply vector `.ai` or `.eps` — export from the SVG.

## Flashing the Drives

Use `scripts/flash-usb.ps1` to batch-copy files to all connected drives:

```powershell
.\scripts\flash-usb.ps1
```

The script:
1. Detects all removable USB drives
2. Copies the Studio installer, README.html, sample glazes, and QUICK-START.txt
3. Safely ejects each drive when done

## Budget Notes

| Item                         | Cost       |
|------------------------------|------------|
| 100× USB drives (printed)   | ~$120      |
| Shipping                     | ~$15-25    |
| Self-flashing time           | ~15 min    |
| **Total**                    | **~$140**  |

Compare to 100 business cards (~$40) — USBs cost ~$1 more per contact
but deliver the actual software, not just a link.

## Venues / Distribution

- **NCECA 2026** (Detroit, March 25-28) — booth handout
- **Local clay guilds** — workshop demos
- **Ceramic supply shops** — leave a few at the counter
  (Axner, Sheffield Pottery, Ceramic Supply Chicago, Seattle Pottery Supply)
- **University ceramics departments** — professor sample kits

## Talking Point (30 seconds)

> "This USB has Stull Atlas Studio — it's a desktop app for ceramic
> glaze chemistry. Everything's unlocked, works offline, no account
> needed. Plug it in, run the installer, and you've got an interactive
> Stull chart with 3,000+ glazes, blend calculators, and a recipe
> optimizer. The web version is free at stullatlas.app if you prefer."

````
