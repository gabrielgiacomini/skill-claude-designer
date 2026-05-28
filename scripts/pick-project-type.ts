#!/usr/bin/env -S npx tsx
/**
 * pick-project-type.ts — recommend a Claude Design project type from a deliverable description.
 *
 * Usage:
 *   npx tsx pick-project-type.ts --deliverable "polished landing page for an API product"
 *   npx tsx pick-project-type.ts --deliverable "rough wireframe of a settings screen" --json
 *
 * Returns one of: Prototype (Wireframe | High fidelity), Slide deck, From template, Other.
 */

/**
 * Claude Design picker tab label for the recommended starting path.
 *
 * @remarks
 * Values mirror the product UI taxonomy returned to stdout or `--json` consumers.
 */
type ProjectType = "Prototype" | "Slide deck" | "From template" | "Other";

/**
 * Prototype fidelity when `projectType` is Prototype; otherwise unused (`null`).
 *
 * @remarks
 * Slide decks and template flows do not use wireframe vs hi-fi branching.
 */
type Fidelity = "Wireframe" | "High fidelity" | null;

/**
 * Structured recommendation plus ranked alternatives for operator review.
 *
 * @remarks
 * `alternatives` stays human-facing; JSON output embeds this object verbatim.
 */
interface Recommendation {
  projectType: ProjectType;
  fidelity: Fidelity;
  rationale: string;
  alternatives: { projectType: ProjectType; fidelity: Fidelity; reason: string }[];
}

const DECK_PATTERNS = /\b(deck|slides?|presentation|pitch|keynote|powerpoint|pptx|all[- ]hands)\b/i;
const TEMPLATE_PATTERNS = /\b(template|reuse|same as|clone|like the [a-z]+ project|using the .* template|same structure as)\b/i;
const ANIMATION_PATTERNS = /\b(animation|motion|animated|loops?|transitions?|tween|easing|sprite|particle|shader)\b/i;
const WIREFRAME_PATTERNS = /\b(wireframe|sketch|rough|low[- ]?fi(?:delity)?|lo[- ]?fi(?:delity)?|just the structure|skeleton|outline|first draft|exploratory)\b/i;
/** Matches polished/marketing language cues without the hi-fi fidelity spelling variants. */
const HIFI_QUALITY_PATTERNS =
  /\b(polished|production|launch[- ]?ready|brand|on[- ]brand|interactive prototype|microsite|landing|marketing|customer[- ]facing|design system)\b/i;

/** Matches explicit hi-fi / high-fidelity shorthand spellings. */
const HIFI_FIDELITY_SPELLING_PATTERNS = /\b(hi[- ]?fi(?:delity)?|high[- ]?fi(?:delity)?)\b/i;

/**
 * Parses CLI flags from raw argv without mutating the input array.
 *
 * @remarks
 * Flags after `--deliverable` consume the next token as the value; unknown tokens are ignored.
 *
 * @param argv - Arguments after `process.argv.slice(2)`.
 */
function parseArgs(argv: string[]): { deliverable?: string; json: boolean; help: boolean } {
  const out: { deliverable?: string; json: boolean; help: boolean } = { json: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--deliverable") out.deliverable = argv[++i];
    else if (argv[i] === "--json") out.json = true;
    else if (argv[i] === "--help" || argv[i] === "-h") out.help = true;
  }
  return out;
}

/**
 * Prints usage to stdout and terminates the process successfully.
 *
 * @remarks
 * I/O: writes help text then calls `process.exit(0)`; does not return.
 */
function help(): never {
  process.stdout.write(
    `pick-project-type.ts — recommend the right Claude Design project type.\n\n` +
      `Usage:\n` +
      `  npx tsx pick-project-type.ts --deliverable "<text>" [--json]\n\n` +
      `Examples:\n` +
      `  npx tsx pick-project-type.ts --deliverable "polished landing page for our API"\n` +
      `  npx tsx pick-project-type.ts --deliverable "5-slide pitch deck for the board"\n`,
  );
  process.exit(0);
}

/**
 * Classifies free-text deliverable intent into a Claude Design project type and fidelity.
 *
 * @remarks
 * Priority: slide deck → animation/template cues → prototype fidelity from wording.
 * PURITY: no I/O; safe to call from tests or other orchestrators.
 *
 * @param deliverable - Raw user description (case-folded internally).
 */
function recommend(deliverable: string): Recommendation {
  const text = deliverable.toLowerCase();
  const alternatives: Recommendation["alternatives"] = [];

  // Slide deck wins outright if the user mentions deck-language.
  if (DECK_PATTERNS.test(text)) {
    return {
      projectType: "Slide deck",
      fidelity: null,
      rationale: 'Mentions deck/presentation language. Use the **Slide deck** tab in the picker. Toggle "Use speaker notes" if it\'s for a live talk.',
      alternatives: [
        { projectType: "Prototype", fidelity: "High fidelity", reason: "If you want an HTML microsite instead of slides." },
      ],
    };
  }

  // Animation template if the user wants motion + the only built-in template is Animation.
  if (ANIMATION_PATTERNS.test(text)) {
    return {
      projectType: "From template",
      fidelity: null,
      rationale: "Mentions motion/animation. Start **From template → Animation** (timeline-based motion design template) for the best motion scaffolding.",
      alternatives: [
        { projectType: "Prototype", fidelity: "High fidelity", reason: "If you want a static design with subtle motion only." },
        { projectType: "Other", fidelity: null, reason: "If the animation is unconventional and templates feel limiting." },
      ],
    };
  }

  // Explicit template re-use.
  if (TEMPLATE_PATTERNS.test(text)) {
    return {
      projectType: "From template",
      fidelity: null,
      rationale: "Mentions reusing a template. Open the **From template** tab and pick the right one. If your team's template isn't there, create one via Share → Duplicate as template from a finished project first.",
      alternatives: [
        { projectType: "Prototype", fidelity: "High fidelity", reason: "If no suitable template exists yet." },
      ],
    };
  }

  // Default to Prototype. Fidelity depends on language.
  const wantsWireframe = WIREFRAME_PATTERNS.test(text);
  const wantsHifi = HIFI_QUALITY_PATTERNS.test(text) || HIFI_FIDELITY_SPELLING_PATTERNS.test(text);

  if (wantsWireframe && !wantsHifi) {
    alternatives.push({ projectType: "Prototype", fidelity: "High fidelity", reason: "If you want it polished from the start, skip wireframe." });
    return {
      projectType: "Prototype",
      fidelity: "Wireframe",
      rationale: "Mentions sketch / rough / lo-fi language. Use **Prototype → Wireframe** — cheaper, faster, exploratory.",
      alternatives,
    };
  }

  // Default: Prototype + Hi-fi.
  alternatives.push({ projectType: "Prototype", fidelity: "Wireframe", reason: "If you want to explore quickly and cheaply first." });
  alternatives.push({ projectType: "Other", fidelity: null, reason: "If the deliverable doesn't fit Prototype / Slide deck / Template (e.g. a one-off canvas)." });
  return {
    projectType: "Prototype",
    fidelity: "High fidelity",
    rationale: "Default for polished / brand-correct output. Use **Prototype → High fidelity** — inherits the design system, gets full polish.",
    alternatives,
  };
}

/**
 * CLI entry: parses args, routes help/errors, prints recommendation as text or JSON.
 *
 * @remarks
 * I/O: reads `process.argv`, writes stdout/stderr, may call `process.exit`.
 */
function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) help();
  if (!args.deliverable) {
    process.stderr.write("error: --deliverable required.\n");
    process.exit(1);
  }
  const rec = recommend(args.deliverable);
  if (args.json) {
    process.stdout.write(JSON.stringify({ input: args.deliverable, recommendation: rec }, null, 2) + "\n");
  } else {
    const recommendationFidelitySuffix = rec.fidelity ? ` → ${rec.fidelity}` : "";
    process.stdout.write(`Recommendation: ${rec.projectType}${recommendationFidelitySuffix}\n\n`);
    process.stdout.write(`Why: ${rec.rationale}\n`);
    if (rec.alternatives.length) {
      process.stdout.write(`\nAlternatives to consider:\n`);
      for (const a of rec.alternatives) {
        const alternativeFidelitySuffix = a.fidelity ? ` → ${a.fidelity}` : "";
        process.stdout.write(`  - ${a.projectType}${alternativeFidelitySuffix}: ${a.reason}\n`);
      }
    }
  }
}

process.stdout.on('error', (e: NodeJS.ErrnoException) => { if (e.code === 'EPIPE') process.exit(0); });
main();
