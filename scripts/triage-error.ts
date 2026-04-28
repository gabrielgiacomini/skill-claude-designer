#!/usr/bin/env -S npx tsx
/**
 * triage-error.ts — match a Claude Design error symptom to its documented workaround.
 *
 * Usage:
 *   npx tsx triage-error.ts "comments aren't being picked up"
 *   npx tsx triage-error.ts "chat upstream error" --json
 *   npx tsx triage-error.ts list   # list all known issues
 *
 * Workarounds come from the official help-center articles + observed behavior,
 * captured in references/06-known-issues.md.
 */

interface KnownIssue {
  id: string;
  matchers: RegExp[];
  symptom: string;
  workaround: string;
  source: string;
}

const ISSUES: KnownIssue[] = [
  {
    id: "comment-vanish",
    matchers: [/comment/i, /not (being |getting )?(picked up|received|saved|applied|read)/i, /vanish/i, /disappear/i],
    symptom: "Inline canvas comments don't reach Claude.",
    workaround: 'Paste the same comment text into the chat input on the left. Mention the location explicitly ("on the V2 weather chip"). The Comments tab also still keeps them as discussion items for teammates.',
    source: "Get started with Claude Design — Known limitations",
  },
  {
    id: "save-error-compact",
    matchers: [/save error/i, /can'?t save/i, /failed to save/i, /compact view/i, /compact layout/i],
    symptom: "Save errors when iterating — often in compact view.",
    workaround: "Switch out of compact layout into full view, then retry the save.",
    source: "Get started with Claude Design — Known limitations",
  },
  {
    id: "monorepo-lag",
    matchers: [/lag/i, /slow/i, /hang/i, /freeze/i, /large (codebase|repo|monorepo)/i, /attach codebase/i],
    symptom: "Browser slowdown or hang after attaching a large codebase / monorepo.",
    workaround: "Re-link a specific subdirectory rather than the whole repo. Pick the directory containing your component library and design tokens — that's all Claude needs.",
    source: "Get started with Claude Design — Known limitations",
  },
  {
    id: "chat-upstream-error",
    matchers: [/chat upstream/i, /upstream error/i, /chat (error|broken|stuck)/i, /can'?t (send|chat)/i],
    symptom: '"Chat upstream error" message in the chat panel.',
    workaround: "Click the **+** next to the Chat / Comments tabs to start a fresh chat tab inside the same project. Files, design system, and project state carry over — only the chat thread restarts.",
    source: "Get started with Claude Design — Known limitations",
  },
  {
    id: "no-audit-logs",
    matchers: [/audit log/i, /usage analytics/i, /usage tracking/i, /(who|what).{0,30}usage/i],
    symptom: "Admin can't pull usage analytics or audit logs.",
    workaround: "Track adoption qualitatively — set up a feedback channel, check in with each rollout group, and periodically sample projects for design-system compliance. Anthropic Labs has not shipped audit logs yet.",
    source: "Claude Design admin guide",
  },
  {
    id: "no-data-residency",
    matchers: [/data residency/i, /region/i, /eu only/i, /us only/i, /where.{0,30}stored/i],
    symptom: "Org needs guarantees about data storage region.",
    workaround: "Not currently supported. Don't enable Claude Design for users with hard residency requirements; reach out to your Anthropic sales contact before turning the feature on.",
    source: "Claude Design admin guide",
  },
  {
    id: "no-figma-export",
    matchers: [/figma.{0,20}export/i, /export.{0,20}figma/i, /to figma/i, /(into|in) figma/i],
    symptom: "Want to push the design back into Figma after generating it.",
    workaround: "No direct Figma export exists. Closest options: Export as standalone HTML (give the designer a link), or Export as PDF (import as a static reference layer). Figma is supported as input only.",
    source: "Get started with Claude Design — Export formats list",
  },
  {
    id: "submit-newline",
    matchers: [/return.{0,10}new ?line/i, /enter.{0,10}new ?line/i, /can'?t submit/i, /how.{0,20}submit/i, /prompt.{0,20}sent/i],
    symptom: "Pressing Return adds a newline instead of submitting.",
    workaround: "Submit with **⌘ + Return** (Mac) / **Ctrl + Return** (Windows/Linux). The UI shows a 'FYI: ⌘+Enter submits' toast on first wrong attempt — that's expected.",
    source: "Observed live behavior",
  },
  {
    id: "default-off-enterprise",
    matchers: [/can'?t (find|see|access|enable)/i, /not (showing|visible|available)/i, /enterprise/i, /admin (settings|toggle)/i],
    symptom: "Claude Design isn't available for an Enterprise user.",
    workaround: "Default-off on Enterprise. An admin must turn it on under **Organization settings → Capabilities → Anthropic Labs → Claude Design** toggle. Then set up a design system before broad rollout, otherwise output looks generic.",
    source: "Claude Design admin guide",
  },
  {
    id: "generic-output",
    matchers: [/generic/i, /not on.?brand/i, /doesn'?t look like our (brand|product)/i, /wrong (colors?|fonts?|style)/i],
    symptom: "Output doesn't reflect our brand / design system.",
    workaround: "Set up the org design system first. Project picker → 'Set up design system' card, or Design systems tab → Create new design system. Once the design system is **Published**, every new project inherits it automatically.",
    source: "Set up your design system in Claude Design",
  },
];

function parseArgs(argv: string[]): { json: boolean; help: boolean; positional: string[] } {
  const out = { json: false, help: false, positional: [] as string[] };
  for (const a of argv) {
    if (a === "--json") out.json = true;
    else if (a === "--help" || a === "-h") out.help = true;
    else if (!a.startsWith("--")) out.positional.push(a);
  }
  return out;
}

function help(): never {
  process.stdout.write(
    `triage-error.ts — match an error symptom to its documented workaround.\n\n` +
      `Usage:\n` +
      `  npx tsx triage-error.ts "<symptom text>"\n` +
      `  npx tsx triage-error.ts list\n` +
      `  npx tsx triage-error.ts "<symptom>" --json\n`,
  );
  process.exit(0);
}

function listAll(json: boolean) {
  if (json) {
    process.stdout.write(JSON.stringify(ISSUES.map(({ id, symptom, workaround, source }) => ({ id, symptom, workaround, source })), null, 2) + "\n");
  } else {
    for (const i of ISSUES) {
      process.stdout.write(`[${i.id}] ${i.symptom}\n  Workaround: ${i.workaround}\n  Source: ${i.source}\n\n`);
    }
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) help();
  const query = args.positional.join(" ").trim();

  if (!query || query === "list") {
    listAll(args.json);
    return;
  }

  const matched = ISSUES.filter((iss) => iss.matchers.some((m) => m.test(query)));

  if (args.json) {
    process.stdout.write(JSON.stringify({ query, matches: matched.map(({ id, symptom, workaround, source }) => ({ id, symptom, workaround, source })) }, null, 2) + "\n");
  } else {
    if (!matched.length) {
      process.stdout.write(`No known issue matched "${query}".\n\n`);
      process.stdout.write(`Run with no args to see all known issues.\n`);
      return;
    }
    for (const i of matched) {
      process.stdout.write(`[${i.id}] ${i.symptom}\n  Workaround: ${i.workaround}\n  Source: ${i.source}\n\n`);
    }
  }
}

process.stdout.on('error', (e: NodeJS.ErrnoException) => { if (e.code === 'EPIPE') process.exit(0); });
main();
