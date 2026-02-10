/**
 * Agent Stratigraphy — ESPG Document Loader
 * Finds and parses espg-gates.json from the project directory
 * Ryan Howells & Claude-Howell, 2026
 */

import { readFileSync, existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import type { ESPGDocument } from './types.js';

const ESPG_FILENAME = 'espg-gates.json';

/**
 * Search paths to auto-discover espg-gates.json
 */
const SEARCH_PATHS = [
  '.',
  'docs',
  'src/docs',
  '.strata',
  '.github',
];

/**
 * Auto-discover espg-gates.json from project root
 * Walks up from cwd and checks common locations
 */
export function findESPGFile(fromDir?: string): string | null {
  const startDir = fromDir ? resolve(fromDir) : process.cwd();

  // Check common locations relative to start dir
  for (const search of SEARCH_PATHS) {
    const candidate = join(startDir, search, ESPG_FILENAME);
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  // Walk up directory tree
  let dir = startDir;
  const root = dirname(dir);
  while (dir !== root) {
    for (const search of SEARCH_PATHS) {
      const candidate = join(dir, search, ESPG_FILENAME);
      if (existsSync(candidate)) {
        return candidate;
      }
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  return null;
}

/**
 * Load and parse an ESPG document
 */
export function loadESPG(configPath?: string): ESPGDocument {
  const filePath = configPath ?? findESPGFile();

  if (!filePath) {
    throw new StrataError(
      `Could not find ${ESPG_FILENAME}.\n` +
      `  Searched: ${SEARCH_PATHS.join(', ')}\n` +
      `  Run 'strata init' to create one, or use --config <path>.`
    );
  }

  if (!existsSync(filePath)) {
    throw new StrataError(`File not found: ${filePath}`);
  }

  try {
    const raw = readFileSync(filePath, 'utf-8');
    const doc = JSON.parse(raw) as ESPGDocument;
    validateESPG(doc);
    return doc;
  } catch (err) {
    if (err instanceof StrataError) throw err;
    throw new StrataError(`Failed to parse ${filePath}: ${(err as Error).message}`);
  }
}

/**
 * Basic structural validation of an ESPG document
 */
function validateESPG(doc: ESPGDocument): void {
  if (!doc.meta) throw new StrataError('Missing "meta" section');
  if (!doc.gates || !Array.isArray(doc.gates)) throw new StrataError('Missing "gates" array');
  if (doc.gates.length === 0) throw new StrataError('Gates array is empty');

  for (const gate of doc.gates) {
    if (gate.id === undefined) throw new StrataError(`Gate missing "id" field`);
    if (!gate.name) throw new StrataError(`Gate ${gate.id} missing "name"`);
    if (gate.confidence === undefined) throw new StrataError(`Gate ${gate.id} missing "confidence"`);
    if (!gate.status) throw new StrataError(`Gate ${gate.id} missing "status"`);
  }
}

/**
 * Custom error class for strata tool
 */
export class StrataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StrataError';
  }
}
