# DOS Overlay (Easter Egg) — Pixel-Perfect Spec

## Goal
Hidden overlay renders a pixel-perfect DOS-style screen with CP437 line art and function-key menu behavior.

## Rendering rules
- Grid: 80×25
- Encoding: CP437
- Font: IBM VGA/EGA CP437 bitmap 8×16 (fallback 9×16)
- Palette: 16-color IBM/EGA
- Scaling: integer-only; nearest neighbor; no smoothing
- Alignment: whole pixels; devicePixelRatio-aware

## Template
- Two panes:
  - Left: materials list on purple background; white text; yellow totals
  - Right: “FLUX-UNITY FORMULA” on dark red background; cyan frame; white labels
- Bottom full-width menu bar: “INSIGHT 4.1 MAIN MENU:” + verbs.

## Keystrokes
Global:
- Esc: back/close; at top prompts to exit overlay
- F1..F10: bottom menu items
- Tab/Shift+Tab: next/prev
Navigation:
- arrows, Home/End, PgUp/PgDn
- Enter commits/opens
Editing:
- Backspace/Delete edits fields

### Bottom bar mapping (default)
- F1 Calculate
- F2 DOS Shell (fake A:\> prompt)
- F3 Edit
- F4 File
- F5 Help (shows keys)
- F6 Mark
- F7 Print (text report preview)
- F8 Quit (confirm)
- F9 Setup
- F10 Utility

## State machine
MAIN → (CALC|EDIT|FILE|HELP|MARK|PRINT|SETUP|UTILITY|SHELL) → MAIN

## Safety
May reflect current recipe name (optional). Must not mutate state. No network calls.
