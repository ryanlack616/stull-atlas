# Skins & Instruments

## Philosophy
Skins are not separate apps. They are synchronized instruments rendering the same canonical recipe state.

## Four instruments
1) DOS (pixel terminal)
2) Windows ~95 (split panes + toolbar)
3) Mac mid-90s (document + inspector)
4) Web (modern hybrid)

## Instrument cards
Recommended placement: Advanced → Library (“Open as…”).

### Card properties
- id
- title/subtitle
- open_mode: window | dock | modal
- capabilities: view_only | safe_edit | full_edit
- layout_preset
- input_profile

## Scope boundaries (recommended)
- DOS: view_only or safe_edit; no deep tools
- Win95: safe_edit calculator workbench
- Mac: safe_edit document + inspector
- Web: full tools

## Safe-edit rules
Allowed:
- edit % values
- normalize to 100
- set cone/atmos
- recalc/preview
Commit:
- apply as Variant (recommended default)

## Layout presets
- TerminalLayout (DOS)
- SplitPaneLayout (Win95)
- DocumentWindowLayout (Mac)
- PanelStackLayout or GridLayout (Web)

## Input profiles
- DOS: F-keys, Esc-back, arrow navigation
- Win95: accelerators, context menus, splitters
- Mac: inspector palettes, menu semantics
- Web: touch-first, / search, Ctrl+K palette (optional)
