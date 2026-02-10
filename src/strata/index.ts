#!/usr/bin/env node
/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║  strata — Epistemic Project Audit Tool                   ║
 * ║  Agent Stratigraphy Framework                             ║
 * ║  Ryan Howells & Claude-Howell, 2026                       ║
 * ║                                                           ║
 * ║  "Belief ≠ truth. The strata don't lie."                  ║
 * ╚═══════════════════════════════════════════════════════════╝
 *
 * Usage:
 *   strata scan [--config <path>] [--json] [--ci]
 *   strata gate <n> [--config <path>] [--json]
 *   strata audit [--config <path>] [--json] [--ci]
 *   strata decay [--config <path>] [--json] [--ci]
 *   strata init [--output <path>] [--force]
 *   strata --help
 */

import { scan } from './commands/scan.js';
import { gate } from './commands/gate.js';
import { audit } from './commands/audit.js';
import { decay } from './commands/decay.js';
import { init } from './commands/init.js';
import { ansi } from './palette.js';
import { StrataError } from './loader.js';

const VERSION = '0.1.0';

function parseArgs(args: string[]): { command: string; positional: string[]; flags: Record<string, string | boolean> } {
  const command = args[0] ?? 'help';
  const positional: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(arg);
    }
  }

  return { command, positional, flags };
}

function showHelp(): void {
  console.log(`
  ${ansi.bold('strata')} — Epistemic Project Audit Tool  ${ansi.dim(`v${VERSION}`)}
  ${ansi.dim('Agent Stratigraphy Framework')}

  ${ansi.bold('COMMANDS')}

    ${ansi.bold('scan')}   Core-sample the project. Renders the stratigraphic column
           with confidence bars, colors, and status for all 11 ESPG gates.
           ${ansi.dim('Flags: --config <path>, --json, --ci')}

    ${ansi.bold('gate')}   Deep-dive into a specific gate (0-10). Shows evidence
           checklist, epistemic checks, and DO-NOT-PROCEED conditions.
           ${ansi.dim('Usage: strata gate <n> [--config <path>] [--json]')}

    ${ansi.bold('audit')}  Run all DO-NOT-PROCEED checks across all gates.
           Returns pass/fail for each condition.
           ${ansi.dim('Flags: --config <path>, --json, --ci')}

    ${ansi.bold('decay')}  Check for stale beliefs. Flags any gate whose evidence
           is older than the staleness window (default: 30 days).
           ${ansi.dim('Flags: --config <path>, --json, --ci')}

    ${ansi.bold('init')}   Initialize a new espg-gates.json for a project.
           All 11 gates start at not-started with 0% confidence.
           ${ansi.dim('Flags: --output <path>, --force')}

  ${ansi.bold('CI INTEGRATION')}

    ${ansi.dim('Exit codes:')}
      0  All evaluated gates meet thresholds
      1  One or more gates below threshold or blocking conditions
      2  No espg-gates.json found

  ${ansi.dim(ansi.italic('"Belief ≠ truth. The strata don\'t lie."'))}
`);
}

function main(): void {
  const args = process.argv.slice(2);
  const { command, positional, flags } = parseArgs(args);

  try {
    let exitCode = 0;

    switch (command) {
      case 'scan':
        exitCode = scan({
          config: typeof flags.config === 'string' ? flags.config : undefined,
          json: !!flags.json,
          ci: !!flags.ci,
        });
        break;

      case 'gate': {
        const gateId = parseInt(positional[0], 10);
        if (isNaN(gateId) || gateId < 0 || gateId > 10) {
          console.error(`\n  ${ansi.red('Error:')} Gate number must be 0-10. Got: ${positional[0]}\n`);
          process.exit(1);
        }
        exitCode = gate(gateId, {
          config: typeof flags.config === 'string' ? flags.config : undefined,
          json: !!flags.json,
        });
        break;
      }

      case 'audit':
        exitCode = audit({
          config: typeof flags.config === 'string' ? flags.config : undefined,
          json: !!flags.json,
          ci: !!flags.ci,
        });
        break;

      case 'decay':
        exitCode = decay({
          config: typeof flags.config === 'string' ? flags.config : undefined,
          json: !!flags.json,
          ci: !!flags.ci,
        });
        break;

      case 'init':
        exitCode = init({
          output: typeof flags.output === 'string' ? flags.output : undefined,
          force: !!flags.force,
        });
        break;

      case 'help':
      case '--help':
      case '-h':
        showHelp();
        break;

      case 'version':
      case '--version':
      case '-v':
        console.log(`strata v${VERSION}`);
        break;

      default:
        console.error(`\n  ${ansi.red('Unknown command:')} ${command}`);
        console.error(`  Run ${ansi.bold('strata --help')} for usage.\n`);
        process.exit(1);
    }

    process.exit(exitCode);
  } catch (err) {
    if (err instanceof StrataError) {
      console.error(`\n  ${ansi.red('Error:')} ${err.message}\n`);
      process.exit(2);
    }
    throw err;
  }
}

main();
