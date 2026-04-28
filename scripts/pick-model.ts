#!/usr/bin/env -S npx tsx
/**
 * pick-model.ts — recommend a Claude Design model.
 *
 * Usage:
 *   npx tsx pick-model.ts --phase initial|iterate|review --complexity simple|complex --cost low|normal [--json]
 *
 * Models available in Claude Design (as of 2026-04-26):
 *   - Claude Opus 4.7 (default — strongest, costliest)
 *   - Claude Opus 4.6
 *   - Claude Sonnet 4.6
 *   - Claude Sonnet 4.5
 *   - Claude Haiku 4.5
 *   - Claude Opus 3 (legacy)
 */

const MODELS = ["Opus 4.7", "Opus 4.6", "Sonnet 4.6", "Sonnet 4.5", "Haiku 4.5", "Opus 3"] as const;
type Model = (typeof MODELS)[number];

interface Recommendation {
  primary: Model;
  rationale: string;
  alternatives: { model: Model; reason: string }[];
}

function parseArgs(argv: string[]): { phase?: string; complexity?: string; cost?: string; json: boolean; help: boolean } {
  const out: { phase?: string; complexity?: string; cost?: string; json: boolean; help: boolean } = { json: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--phase") out.phase = argv[++i];
    else if (argv[i] === "--complexity") out.complexity = argv[++i];
    else if (argv[i] === "--cost") out.cost = argv[++i];
    else if (argv[i] === "--json") out.json = true;
    else if (argv[i] === "--help" || argv[i] === "-h") out.help = true;
  }
  return out;
}

function help(): never {
  process.stdout.write(
    `pick-model.ts — recommend a Claude Design model.\n\n` +
      `Usage:\n` +
      `  npx tsx pick-model.ts --phase initial|iterate|review --complexity simple|complex --cost low|normal [--json]\n\n` +
      `--phase       initial   First generation of a new project (quality matters most)\n` +
      `              iterate   Refining an existing design\n` +
      `              review    Asking Claude to review/critique an existing design\n` +
      `--complexity  simple    A small component, micro-interaction, or single screen\n` +
      `              complex   Multi-screen flow, dashboard, full microsite, big deck\n` +
      `--cost        low       Save credits / weekly allowance\n` +
      `              normal    No cost constraint\n`,
  );
  process.exit(0);
}

function recommend(phase: string, complexity: string, cost: string): Recommendation {
  // Initial generation: lean toward Opus 4.7 for quality.
  if (phase === "initial") {
    if (cost === "low" && complexity === "simple") {
      return {
        primary: "Sonnet 4.6",
        rationale: "Initial generation of a simple deliverable, but cost-sensitive — Sonnet 4.6 hits a strong quality/cost balance.",
        alternatives: [
          { model: "Opus 4.7", reason: "If quality on the first generation matters more than cost." },
          { model: "Haiku 4.5", reason: "Cheapest option; expect simpler output." },
        ],
      };
    }
    return {
      primary: "Opus 4.7",
      rationale: "First generation deserves the strongest model. Opus 4.7 is the default and produces the best variations on the canvas.",
      alternatives: [
        { model: "Opus 4.6", reason: "If 4.7 misbehaves, the previous Opus is a known-good fallback." },
        { model: "Sonnet 4.6", reason: "If you're cost-sensitive on the first pass." },
      ],
    };
  }

  // Iteration: lean cheaper. The design is already mostly right.
  if (phase === "iterate") {
    if (complexity === "complex" && cost !== "low") {
      return {
        primary: "Opus 4.7",
        rationale: "Complex iteration on a multi-screen project — keep Opus 4.7 to preserve coherence across the canvas.",
        alternatives: [
          { model: "Sonnet 4.6", reason: "If you're tight on credits and the change is contained." },
        ],
      };
    }
    return {
      primary: "Sonnet 4.6",
      rationale: "Most iteration steps don't need the strongest model. Sonnet 4.6 is fast, cheap, and competent for refinements.",
      alternatives: [
        { model: "Haiku 4.5", reason: "For tiny changes (color tweaks, copy edits) Haiku is even cheaper." },
        { model: "Opus 4.7", reason: "If iteration starts touching architecture / multi-section coherence." },
      ],
    };
  }

  // Review: medium model is fine.
  if (phase === "review") {
    return {
      primary: "Sonnet 4.6",
      rationale: "Reviewing / critiquing an existing design — Sonnet 4.6 is plenty for accessibility, hierarchy, and consistency reviews.",
      alternatives: [
        { model: "Opus 4.7", reason: "For an in-depth design audit on a complex project." },
        { model: "Haiku 4.5", reason: "For a quick smoke-check review." },
      ],
    };
  }

  // Unknown phase — default to Opus 4.7.
  return {
    primary: "Opus 4.7",
    rationale: "No phase specified; defaulting to the model Claude Design itself defaults to.",
    alternatives: [],
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) help();

  const phase = (args.phase ?? "initial").toLowerCase();
  const complexity = (args.complexity ?? "complex").toLowerCase();
  const cost = (args.cost ?? "normal").toLowerCase();

  const validPhases = new Set(["initial", "iterate", "review"]);
  const validComplexities = new Set(["simple", "complex"]);
  const validCosts = new Set(["low", "normal"]);

  if (!validPhases.has(phase)) {
    process.stderr.write(`error: --phase must be one of initial|iterate|review (got: ${phase}).\n`);
    process.exit(1);
  }
  if (!validComplexities.has(complexity)) {
    process.stderr.write(`error: --complexity must be simple|complex.\n`);
    process.exit(1);
  }
  if (!validCosts.has(cost)) {
    process.stderr.write(`error: --cost must be low|normal.\n`);
    process.exit(1);
  }

  const rec = recommend(phase, complexity, cost);
  if (args.json) {
    process.stdout.write(JSON.stringify({ input: { phase, complexity, cost }, recommendation: rec }, null, 2) + "\n");
  } else {
    process.stdout.write(`Recommendation: Claude ${rec.primary}\n\n`);
    process.stdout.write(`Why: ${rec.rationale}\n`);
    if (rec.alternatives.length) {
      process.stdout.write(`\nAlternatives:\n`);
      for (const a of rec.alternatives) process.stdout.write(`  - Claude ${a.model}: ${a.reason}\n`);
    }
  }
}

process.stdout.on('error', (e: NodeJS.ErrnoException) => { if (e.code === 'EPIPE') process.exit(0); });
main();
