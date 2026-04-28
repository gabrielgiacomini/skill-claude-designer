#!/usr/bin/env -S npx tsx
/**
 * validate-prompt.ts — score a prompt against the four-part formula.
 *
 * Usage:
 *   npx tsx validate-prompt.ts "your prompt text here"
 *   npx tsx validate-prompt.ts --json "your prompt text"
 *   echo "..." | npx tsx validate-prompt.ts --stdin
 *
 * Reports which of {goal, layout, content, audience} are present, plus
 * suggestions for what to add.
 */

type Part = "goal" | "layout" | "content" | "audience";

const PART_HINTS: Record<Part, RegExp[]> = {
  // Goal: usually a noun phrase like "create / design / build a [thing]"
  goal: [
    /\b(create|design|build|prototype|make|generate|sketch|draft)\s+(a|an|the)?\s*\w+/i,
    /\b(dashboard|landing|onboarding|signup|settings|form|deck|presentation|microsite|page|app|component|card|widget|tool|view|screen|flow)\b/i,
  ],
  // Layout: arrangement words
  layout: [
    /\b(layout|arrange|column|row|grid|sidebar|header|footer|hero|sections?|stacked|side[- ]by[- ]side|on top|below|left|right|center|two[- ]column|three[- ]column|N screens?|wrapping)\b/i,
    /\b\d+\s*(columns?|rows?|cards?|cells?|screens?|sections?)\b/i,
  ],
  // Content: data / fields / what's shown
  content: [
    /\b(show|display|with|including|fields?|metrics?|copy|text|values?|data|content|filters?|tabs?|buttons?|charts?|tables?|inputs?|prompts?|placeholders?|sample)\b/i,
    /["'].+["']/, // quoted sample copy
    /:\s*\w+/, // colon-prefixed list items
  ],
  // Audience: who / for whom / where
  audience: [
    /\b(for|audience|users?|team|customers?|stakeholders?|exec(?:utive)?s?|engineers?|designers?|PMs?|admins?|moderators?|operators?|reviewers?|recruiters?)\b/i,
    /\b(internal|external|enterprise|consumer|b2b|b2c|public|private|onboarding|self[- ]serve|live presentation|sign[- ]off)\b/i,
  ],
};

const SUGGESTIONS: Record<Part, string> = {
  goal: 'Add what you\'re building. Example: "Design a settings screen for…"',
  layout: 'Add how things are arranged. Example: "Two-column layout, sidebar on the left, content on the right."',
  content: 'Add the actual data, fields, or sample copy. Example: "Show MRR, churn rate, and NPS as cards with sparklines."',
  audience: 'Add who it\'s for or where it\'ll live. Example: "For our exec team\'s weekly review" or "for first-time customers on mobile."',
};

const QUALITY_BOOSTERS = [
  { name: "dimensions", regex: /\b(\d+\s*x\s*\d+|\d+\s*px|\d+\s*pt|mobile|tablet|desktop|responsive)\b/i, hint: "Add dimensions or device target (e.g. 360px wide, 1440x900, mobile-first) for sharper output." },
  { name: "palette", regex: /\b(monochrome|palette|colou?rs?|brand|warm|cool|dark|light|neutral|pastel|vibrant)\b/i, hint: "Add a palette / aesthetic (monochrome, warm accent, brand colors) so the look isn't generic." },
  { name: "variation count", regex: /\b(single|one|alternative|variations?|options?|versions?|2-?3|3-?5)\b/i, hint: 'Say whether you want one design or alternatives ("show 3 alternatives" or "just one").' },
];

function parseArgs(argv: string[]): { json: boolean; stdin: boolean; help: boolean; positional: string[] } {
  const out = { json: false, stdin: false, help: false, positional: [] as string[] };
  for (const a of argv) {
    if (a === "--json") out.json = true;
    else if (a === "--stdin") out.stdin = true;
    else if (a === "--help" || a === "-h") out.help = true;
    else if (!a.startsWith("--")) out.positional.push(a);
  }
  return out;
}

async function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (c) => (data += c));
    process.stdin.on("end", () => resolve(data));
  });
}

function help(): never {
  process.stdout.write(
    `validate-prompt.ts — score a prompt against the four-part formula.\n\n` +
      `Usage:\n` +
      `  npx tsx validate-prompt.ts "your prompt text"\n` +
      `  npx tsx validate-prompt.ts --json "your prompt text"\n` +
      `  echo "..." | npx tsx validate-prompt.ts --stdin\n`,
  );
  process.exit(0);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) help();

  let prompt = args.positional.join(" ").trim();
  if (args.stdin || !prompt) {
    if (process.stdin.isTTY && !args.stdin) {
      process.stderr.write("error: no prompt supplied. Pass as arg or use --stdin.\n");
      process.exit(1);
    }
    prompt = (await readStdin()).trim();
  }
  if (!prompt) {
    process.stderr.write("error: empty prompt.\n");
    process.exit(1);
  }

  const present: Part[] = [];
  const missing: Part[] = [];
  for (const part of Object.keys(PART_HINTS) as Part[]) {
    const hit = PART_HINTS[part].some((re) => re.test(prompt));
    if (hit) present.push(part);
    else missing.push(part);
  }

  const boosters = QUALITY_BOOSTERS.filter((b) => !b.regex.test(prompt));
  const score = present.length / 4;

  if (args.json) {
    process.stdout.write(
      JSON.stringify(
        {
          prompt,
          score,
          present,
          missing,
          suggestions: missing.map((m) => ({ part: m, hint: SUGGESTIONS[m] })),
          quality_boosters: boosters.map((b) => ({ name: b.name, hint: b.hint })),
        },
        null,
        2,
      ) + "\n",
    );
  } else {
    process.stdout.write(`Score: ${(score * 4).toFixed(0)} / 4\n`);
    process.stdout.write(`Present: ${present.join(", ") || "(none)"}\n`);
    process.stdout.write(`Missing: ${missing.join(", ") || "(none)"}\n`);
    if (missing.length) {
      process.stdout.write(`\nSuggestions:\n`);
      for (const m of missing) process.stdout.write(`  - [${m}] ${SUGGESTIONS[m]}\n`);
    }
    if (boosters.length) {
      process.stdout.write(`\nQuality boosters you could still add:\n`);
      for (const b of boosters) process.stdout.write(`  - [${b.name}] ${b.hint}\n`);
    }
  }
  process.exit(missing.length ? 0 : 0);
}

process.stdout.on('error', (e: NodeJS.ErrnoException) => { if (e.code === 'EPIPE') process.exit(0); });
main();
