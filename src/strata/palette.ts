/**
 * Agent Stratigraphy — Stratigraphic Color Palette
 * ANSI 256-color mappings for terminal rendering
 * Ryan Howells & Claude-Howell, 2026
 */

export interface PaletteEntry {
  hex: string;
  ansi: number;
  label: string;
  layer: string;
}

export const PALETTE: Record<number, PaletteEntry> = {
  0:  { hex: '#7C1D1D', ansi: 88,  label: 'Garnet',     layer: 'Bedrock' },
  1:  { hex: '#A0522D', ansi: 130, label: 'Sienna',     layer: 'Bedrock' },
  2:  { hex: '#B8860B', ansi: 136, label: 'Sandstone',  layer: 'Foundation' },
  3:  { hex: '#8B7355', ansi: 137, label: 'Mudstone',   layer: 'Foundation' },
  4:  { hex: '#2D5A27', ansi: 22,  label: 'Forest',     layer: 'Growth' },
  5:  { hex: '#2E8B57', ansi: 29,  label: 'Sea Green',  layer: 'Growth' },
  6:  { hex: '#1A7A7A', ansi: 30,  label: 'Teal',       layer: 'Surface' },
  7:  { hex: '#2070B4', ansi: 32,  label: 'Steel Blue', layer: 'Surface' },
  8:  { hex: '#5B4FA0', ansi: 61,  label: 'Slate Blue', layer: 'Atmosphere' },
  9:  { hex: '#7B52AB', ansi: 133, label: 'Amethyst',   layer: 'Atmosphere' },
  10: { hex: '#DAA520', ansi: 178, label: 'Goldenrod',  layer: 'Horizon' },
};

/**
 * ANSI escape helpers
 */
export const ansi = {
  fg256: (code: number, text: string) => `\x1b[38;5;${code}m${text}\x1b[0m`,
  bg256: (code: number, text: string) => `\x1b[48;5;${code}m${text}\x1b[0m`,
  bold: (text: string) => `\x1b[1m${text}\x1b[0m`,
  dim: (text: string) => `\x1b[2m${text}\x1b[0m`,
  italic: (text: string) => `\x1b[3m${text}\x1b[0m`,
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
  white: (text: string) => `\x1b[37m${text}\x1b[0m`,
  gray: (text: string) => `\x1b[90m${text}\x1b[0m`,
  reset: '\x1b[0m',
};

/**
 * Render a colored confidence bar
 */
export function renderBar(confidence: number, width: number = 10, gateId: number): string {
  const filled = Math.round(confidence * width);
  const empty = width - filled;
  const color = PALETTE[gateId]?.ansi ?? 7;
  const bar = ansi.fg256(color, '█'.repeat(filled)) + ansi.gray('░'.repeat(empty));
  return bar;
}

/**
 * Colorize text with a gate's palette color
 */
export function gateColor(gateId: number, text: string): string {
  const color = PALETTE[gateId]?.ansi ?? 7;
  return ansi.fg256(color, text);
}

/**
 * Status symbol with appropriate coloring
 */
export function statusSymbol(status: string): string {
  switch (status) {
    case 'passed':      return ansi.green('✓ PASSED');
    case 'partial':     return ansi.yellow('⚠ PARTIAL');
    case 'not-started': return ansi.gray('· NOT STARTED');
    case 'failed':      return ansi.red('✗ FAILED');
    case 'stale':       return ansi.yellow('⏳ STALE');
    default:            return ansi.gray('? UNKNOWN');
  }
}

/**
 * Layer names in display order (top to bottom = Horizon to Bedrock)
 */
export const LAYERS_DISPLAY_ORDER = [
  'Horizon',
  'Atmosphere',
  'Surface',
  'Growth',
  'Foundation',
  'Bedrock',
];

/**
 * Gates per layer (display order within layer: highest gate first)
 */
export const LAYER_GATES: Record<string, number[]> = {
  'Horizon':    [10],
  'Atmosphere': [9, 8],
  'Surface':    [7, 6],
  'Growth':     [5, 4],
  'Foundation': [3, 2],
  'Bedrock':    [1, 0],
};
