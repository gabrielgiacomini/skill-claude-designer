#!/usr/bin/env -S npx tsx
/**
 * build-prompt.ts — assemble a well-structured Claude Design prompt.
 *
 * Implements the four-part formula (goal/layout/content/audience) plus optional
 * dimensions, palette, mode, device, variations, and project-type framing.
 *
 * Usage:
 *   npx tsx build-prompt.ts \
 *     --goal "executive dashboard" \
 *     --layout "3-col KPI strip, chart row, table" \
 *     --content "MRR, churn rate, NPS — each with sparkline" \
 *     --audience "CEO weekly review" \
 *     [--dimensions "1440x900"] \
 *     [--palette "minimal monochrome"] \
 *     [--mode light|dark|system] \
 *     [--device desktop|mobile|tablet|responsive] \
 *     [--variations one|several] \
 *     [--type prototype|wireframe|deck|other] \
 *     [--design-system on|off] \
 *     [--json]
 *
 * Pass --help for inline help.
 */

type Args = Record<string, string | boolean>;

function parseArgs(argv: string[]): Args {
  const out: Args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) {
      out[key] = true;
    } else {
      out[key] = next;
      i++;
    }
  }
  return out;
}

function help(): never {
  process.stdout.write(
    `build-prompt.ts — assemble a Claude Design prompt.\n\n` +
      `Required:\n` +
      `  --goal      <text>   What you're building.\n` +
      `  --layout    <text>   How things are arranged.\n` +
      `  --content   <text>   What data / copy / sample values appear.\n` +
      `  --audience  <text>   Who will use it / context.\n\n` +
      `Optional:\n` +
      `  --dimensions <WxH | label>     e.g. 1440x900, 360px wide, mobile-first\n` +
      `  --palette   <text>             e.g. monochrome, brand colors, warm accent\n` +
      `  --mode      light|dark|system  default: light\n` +
      `  --device    desktop|mobile|tablet|responsive  default: desktop\n` +
      `  --variations one|several       default: several (Claude Design's default)\n` +
      `  --type      prototype|wireframe|deck|other  default: prototype\n` +
      `  --design-system on|off         default: on (assumes user has one)\n` +
      `  --json                         emit JSON instead of plain text\n` +
      `  --help                         this help\n`,
  );
  process.exit(0);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) help();

  const required = ["goal", "layout", "content", "audience"] as const;
  const missing = required.filter((k) => !args[k] || typeof args[k] === "boolean");
  if (missing.length) {
    process.stderr.write(
      `error: missing required: ${missing.map((m) => `--${m}`).join(", ")}\n` +
        `run with --help for usage.\n`,
    );
    process.exit(1);
  }

  const goal = String(args.goal);
  const layout = String(args.layout);
  const content = String(args.content);
  const audience = String(args.audience);
  const dimensions = (args.dimensions as string) ?? null;
  const palette = (args.palette as string) ?? null;
  const mode = (args.mode as string) ?? "light";
  const device = (args.device as string) ?? "desktop";
  const variations = (args.variations as string) ?? "several";
  const type = (args.type as string) ?? "prototype";
  const designSystem = (args["design-system"] as string) ?? "on";

  // Compose the prompt
  const sentences: string[] = [];

  // Opening sentence: type + goal. Handle a/an grammar.
  const article = /^[aeiouAEIOU]/.test(goal.trim()) ? "an" : "a";
  if (type === "deck") {
    sentences.push(`Create a slide deck about ${goal}, for ${audience}.`);
  } else {
    sentences.push(`Design ${article} ${goal} for ${audience}.`);
  }

  // Layout
  sentences.push(`Layout: ${layout}.`);

  // Content
  sentences.push(`Content: ${content}.`);

  // Dimensions
  if (dimensions) sentences.push(`Dimensions: ${dimensions}.`);

  // Aesthetic line: palette + mode
  const aesthetic: string[] = [];
  if (palette) aesthetic.push(palette);
  aesthetic.push(`${mode} mode`);
  sentences.push(`Aesthetic: ${aesthetic.join(", ")}.`);

  // Device
  if (device !== "desktop") {
    sentences.push(`Make sure it works at ${device} widths.`);
  }

  // Variations
  if (variations === "one") {
    sentences.push(`Just give me a single design — no variations.`);
  } else {
    sentences.push(`Show 3 stylistic alternatives side-by-side on the canvas so I can compare.`);
  }

  // Design system mention
  if (designSystem === "on") {
    sentences.push(`Use our design system tokens and components.`);
  }

  const prompt = sentences.join(" ");

  if (args.json) {
    const out = {
      prompt,
      parts: { goal, layout, content, audience, dimensions, palette, mode, device, variations, type, designSystem },
    };
    process.stdout.write(JSON.stringify(out, null, 2) + "\n");
  } else {
    process.stdout.write(prompt + "\n");
  }
}

process.stdout.on('error', (e: NodeJS.ErrnoException) => { if (e.code === 'EPIPE') process.exit(0); });
main();
