#!/usr/bin/env -S npx tsx
/**
 * pick-export.ts — recommend a Share-menu export option from recipient + intent.
 *
 * Usage:
 *   npx tsx pick-export.ts --recipient "CEO" --intent "sign-off"
 *   npx tsx pick-export.ts --recipient "engineer" --intent "implementation" --json
 *
 * Returns one of:
 *   Duplicate project / Duplicate as template
 *   Download project as .zip
 *   Export as PDF / PPTX / standalone HTML
 *   Send to Canva
 *   Handoff to Claude Code
 *   (or "Use Access controls instead — no export needed")
 */

interface Recommendation {
  primary: string;
  rationale: string;
  alternatives: { option: string; reason: string }[];
  warnings: string[];
}

/**
 * Each rule has separate matchers for `recipient` and `intent` so a role-word
 * appearing in a name (e.g. "Engineer the team's lead, Alex") doesn't unduly
 * outrank a strong intent signal. Score = 2 × intent hits + recipient hits.
 * The highest-scoring rule wins; ties break by array order.
 */
type Matcher = { recipient?: RegExp; intent?: RegExp; either?: RegExp };

interface Rule {
  matchers: Matcher[];
  rec: () => Recommendation;
}

function score(rule: Rule, recipient: string, intent: string): number {
  let s = 0;
  for (const m of rule.matchers) {
    if (m.recipient && m.recipient.test(recipient)) s += 1;
    if (m.intent && m.intent.test(intent)) s += 2;
    if (m.either && (m.either.test(recipient) || m.either.test(intent))) s += 1;
  }
  return s;
}

const RULES: Rule[] = [
  {
    // Engineering implementation
    matchers: [
      { recipient: /\b(engineer|dev|developer|coder|programmer)\b/i },
      { intent: /\b(implement|build|code|ship|production|engineering|integrate)\b/i },
    ],
    rec: () => ({
      primary: "Handoff to Claude Code",
      rationale: "Engineering implementation has the cleanest seam through the Claude Code handoff — passes design intent + assets directly as a coding task.",
      alternatives: [
        { option: "Download project as .zip", reason: "If the engineer wants the source files to start from in their own setup." },
        { option: "Export as standalone HTML", reason: "If they just need a reference renderable in any browser." },
      ],
      warnings: [],
    }),
  },
  {
    // PowerPoint / Keynote / Slides world
    matchers: [{ either: /\b(powerpoint|pptx|keynote|google slides|\.pptx)\b/i }, { intent: /\bslides?\b/i }],
    rec: () => ({
      primary: "Export as PPTX",
      rationale: "PPTX opens cleanly in PowerPoint, Keynote, and Google Slides.",
      alternatives: [{ option: "Export as PDF", reason: "Use if the audience won't edit the slides." }],
      warnings: ["For best PPTX output, use the Slide deck project type from the start."],
    }),
  },
  {
    // PDF reviewer / sign-off
    matchers: [
      { recipient: /\b(ceo|cto|cfo|exec(?:utive)?|board|partner|vp|director|stakeholder|investor)\b/i },
      { intent: /\b(review|sign[- ]off|approve|approval|async|sign|stakeholder)\b/i },
    ],
    rec: () => ({
      primary: "Export as PDF",
      rationale: "PDF is the universal sign-off / async review format. Render-anywhere, no edit risk.",
      alternatives: [
        { option: "Use Access → Teammates can comment + Copy link", reason: "If the reviewer is in your org, a comment-access link is more interactive." },
      ],
      warnings: [],
    }),
  },
  {
    // Canva users
    matchers: [{ either: /\bcanva\b/i }, { recipient: /\b(brand|marketing)\b/i }],
    rec: () => ({
      primary: "Send to Canva",
      rationale: "Canva-native teams (often brand / marketing) prefer to finish polish in their own tool.",
      alternatives: [{ option: "Export as PDF", reason: "If they only need the final asset, not editable source." }],
      warnings: ["Recipient needs a Canva account."],
    }),
  },
  {
    // Figma user
    matchers: [{ either: /\bfigma\b/i }],
    rec: () => ({
      primary: "Export as standalone HTML",
      rationale: "There is no direct Figma export. Standalone HTML is the closest — give them a link to the rendered output. They can rebuild structurally in Figma using it as reference.",
      alternatives: [
        { option: "Export as PDF", reason: "If they only need a static reference layer to import." },
        { option: "Use Access → Teammates can view + Copy link", reason: "If they're in your org, a view link to the live project is the lowest-friction option." },
      ],
      warnings: ["Figma is supported as input (drag in a Figma file) but not as output."],
    }),
  },
  {
    // Embed / host externally
    matchers: [{ intent: /\b(embed|host|website|microsite|static site|landing|notion|wiki|confluence|docs?)\b/i }],
    rec: () => ({
      primary: "Export as standalone HTML",
      rationale: "Single self-contained HTML file. Drop it into a static host, embed in a doc, or attach to a wiki page.",
      alternatives: [{ option: "Export as PDF", reason: "If the embed target previews PDFs (Notion, Confluence)." }],
      warnings: ["Claude Design doesn't host the output for you — bring your own host."],
    }),
  },
  {
    // Archive / contractor
    matchers: [
      { intent: /\b(archive|backup|hand off source|\.zip|files|source)\b/i },
      { recipient: /\b(contractor|freelancer|agency)\b/i },
    ],
    rec: () => ({
      primary: "Download project as .zip",
      rationale: "Full archive: HTML pages, JSX components, assets. Good for backups or handing source off to someone outside Claude Design.",
      alternatives: [{ option: "Handoff to Claude Code", reason: "If they'll do further work and you want a coding-task seam." }],
      warnings: [],
    }),
  },
  {
    // Fork / risk-free experiment
    matchers: [{ intent: /\b(fork|branch|copy|try a different|risky|experiment|alternate|alternative|backup version)\b/i }],
    rec: () => ({
      primary: "Duplicate project",
      rationale: "Forking before a risky change is what Duplicate project is for. Iterate in the copy without losing the original.",
      alternatives: [
        { option: 'Just chat: "Save what we have and try a completely different approach"', reason: "Lighter-weight in-conversation fork; Claude saves the current state and starts a new direction." },
      ],
      warnings: [],
    }),
  },
  {
    // Make a template for reuse
    matchers: [{ intent: /\b(template|reuse|reusable|standard format|every project|all our|future projects)\b/i }],
    rec: () => ({
      primary: "Duplicate as template",
      rationale: "Codify a project structure so future projects can start From template → <your template>.",
      alternatives: [],
      warnings: ["Templates are scoped to your org."],
    }),
  },
  {
    // Internal teammate → access controls instead
    matchers: [{ recipient: /\b(teammate|colleague|coworker|team member|in.{0,20}org)\b/i }],
    rec: () => ({
      primary: "Use Access controls instead — no export needed",
      rationale: "For an in-org teammate, set Access to Teammates can view / comment / edit and Copy link. Keeps the project live and editable.",
      alternatives: [{ option: "Export as PDF", reason: "If they want an offline copy too." }],
      warnings: ["Cowork's safety rules forbid Claude from changing sharing settings on your behalf — flip the Access toggle yourself."],
    }),
  },
];

function parseArgs(argv: string[]): { recipient?: string; intent?: string; json: boolean; help: boolean } {
  const out: { recipient?: string; intent?: string; json: boolean; help: boolean } = { json: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--recipient") out.recipient = argv[++i];
    else if (argv[i] === "--intent") out.intent = argv[++i];
    else if (argv[i] === "--json") out.json = true;
    else if (argv[i] === "--help" || argv[i] === "-h") out.help = true;
  }
  return out;
}

function help(): never {
  process.stdout.write(
    `pick-export.ts — recommend the right export from the Share menu.\n\n` +
      `Usage:\n` +
      `  npx tsx pick-export.ts --recipient "<text>" [--intent "<text>"] [--json]\n\n` +
      `Examples:\n` +
      `  npx tsx pick-export.ts --recipient "CEO" --intent "weekly review sign-off"\n` +
      `  npx tsx pick-export.ts --recipient "engineer" --intent "implementation"\n` +
      `  npx tsx pick-export.ts --recipient "marketing team in Canva"\n`,
  );
  process.exit(0);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) help();
  if (!args.recipient) {
    process.stderr.write("error: --recipient required.\n");
    process.exit(1);
  }
  const recipient = args.recipient;
  const intent = args.intent ?? "";

  // Score every rule; pick the highest-scoring rule. Ties break to first occurrence (engineering > sign-off > canva > …).
  const scored = RULES.map((rule, idx) => ({ rule, idx, score: score(rule, recipient, intent) }));
  const best = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.idx - b.idx)[0];

  const rec = best
    ? best.rule.rec()
    : {
        primary: "Export as PDF",
        rationale: "No specific recipient pattern matched. PDF is the safest universal default.",
        alternatives: [
          { option: "Use Access controls + Copy link", reason: "If recipient is inside your org." },
          { option: "Export as standalone HTML", reason: "If they need to embed or host it." },
        ],
        warnings: [],
      };

  if (args.json) {
    process.stdout.write(JSON.stringify({ input: { recipient, intent }, recommendation: rec }, null, 2) + "\n");
  } else {
    process.stdout.write(`Recommendation: ${rec.primary}\n\n`);
    process.stdout.write(`Why: ${rec.rationale}\n`);
    if (rec.alternatives.length) {
      process.stdout.write(`\nAlternatives:\n`);
      for (const a of rec.alternatives) process.stdout.write(`  - ${a.option}: ${a.reason}\n`);
    }
    if (rec.warnings.length) {
      process.stdout.write(`\nWarnings:\n`);
      for (const w of rec.warnings) process.stdout.write(`  ! ${w}\n`);
    }
  }
}

process.stdout.on('error', (e: NodeJS.ErrnoException) => { if (e.code === 'EPIPE') process.exit(0); });
main();
