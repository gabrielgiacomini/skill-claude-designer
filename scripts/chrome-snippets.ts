#!/usr/bin/env -S npx tsx
/**
 * chrome-snippets.ts — library of JavaScript snippets to inject into the
 * Claude Design page via the Chrome MCP `javascript_tool` (or any equivalent).
 *
 * The snippets are pure DOM/JS that read the current page state — they don't
 * mutate anything, they only return data. This lets the agent extract project
 * state without clicking around (faster + cheaper than UI scraping with
 * read_page + screenshot).
 *
 * Usage:
 *   npx tsx chrome-snippets.ts list                 # list all snippet names
 *   npx tsx chrome-snippets.ts get <name>           # print the JS for one snippet
 *   npx tsx chrome-snippets.ts get <name> --json    # print as JSON {name, description, code}
 *
 * The agent's flow:
 *   1. `npx tsx chrome-snippets.ts get extract-share-menu`
 *   2. copy the JS
 *   3. pass it as the `text` arg to mcp__Claude_in_Chrome__javascript_tool
 *
 * Every snippet evaluates to a JSON-serializable value as its last expression
 * (per the `javascript_tool` contract — no `return` statement at the top level).
 */

interface Snippet {
  name: string;
  description: string;
  code: string;
}

const SNIPPETS: Snippet[] = [
  {
    name: "list-models",
    description: "After clicking the model picker, dump every model name in the dropdown. Looks for an open popover/menu first; falls back to body scan with a strict regex.",
    code: `JSON.stringify((() => { const open = document.querySelector('[data-state="open"][role="menu"], [data-radix-popper-content-wrapper], [role="listbox"], [role="dialog"][open]'); const root = open || document.body; const items = root.querySelectorAll('[role="menuitem"], [role="option"], li, button'); const names = new Set(); items.forEach(el => { const t = (el.innerText || '').trim(); if (/^Claude\\s+(Opus|Sonnet|Haiku)\\s+\\d/i.test(t)) names.add(t.split('\\n')[0]); }); return [...names]; })())`,
  },
  {
    name: "extract-share-menu",
    description: "After clicking Share, extract every Access option and Export action label.",
    code: `JSON.stringify([...new Set(Array.from(document.querySelectorAll('button, a, div')).filter(e => e.children.length <= 2).map(e => e.innerText && e.innerText.trim()).filter(t => t && /Duplicate|Download|Export|Send to|Handoff|Copy link|Teammates|Private|Access/i.test(t) && t.length < 200))])`,
  },
  {
    name: "extract-examples-gallery",
    description: "On the /design#gallery (Examples) tab, return every example { title, prompt } pair.",
    code: `JSON.stringify(Array.from(document.querySelectorAll('button')).filter(b => /use this prompt/i.test(b.innerText)).map(b => { let p = b.parentElement; for (let i = 0; i < 5 && p; i++) { const t = p.innerText; if (t.length > 50) { const lines = t.split('\\n').filter(Boolean); return { title: lines[0], prompt: lines.slice(1).filter(l => !/use this prompt/i.test(l)).join(' ') }; } p = p.parentElement; } return null; }).filter(Boolean))`,
  },
  {
    name: "extract-file-tree",
    description: "Inside an open project, list every file in the Design Files tab as { name, type, modified }.",
    code: `JSON.stringify(Array.from(document.querySelectorAll('[role="row"], li, div')).map(e => { const text = e.innerText && e.innerText.trim(); if (!text || text.length > 200 || !/\\.(html|jsx|tsx|css|js|svg|png|jpg|jpeg|gif)$/i.test(text)) return null; const lines = text.split('\\n').filter(Boolean); return { name: lines[0], type: lines[1] || null, modified: lines.find(l => /ago|just now|today|yesterday/i.test(l)) || null }; }).filter(Boolean))`,
  },
  {
    name: "current-project-id",
    description: "Return the project UUID from the URL (or null if not in a project).",
    code: `JSON.stringify({ url: window.location.href, projectId: (window.location.pathname.match(/\\/design\\/p\\/([0-9a-f-]+)/) || [])[1] || null, file: new URLSearchParams(window.location.search).get('file') || null })`,
  },
  {
    name: "is-generation-running",
    description: "Heuristic: are there active generation indicators in the chat panel right now? Catches Writing/Verifying/Copying/Placed/Created/Adding/Reading/Searching/Editing/Listing — observed across multiple projects.",
    code: `JSON.stringify({ running: /\\b(Writing|Verifying|Copying starter|Placed|Created|Adding|Reading|Searching|Editing|Listing files|Caramelizing)\\b/i.test(document.body.innerText), indicators: Array.from(document.querySelectorAll('div, span')).map(e => e.innerText && e.innerText.trim()).filter(t => t && /^(Writing |Verifying|Copying starter|Placed |Created |Adding |Reading |Searching|Editing|Listing files|Caramelizing|Done, Fork)/i.test(t)).slice(0, 10) })`,
  },
  {
    name: "extract-tweaks-ideas",
    description: "After clicking 'Ideas' in the Tweaks popover, return Claude's suggested tweak ideas as a list.",
    code: `JSON.stringify(Array.from(document.querySelectorAll('button, li, [role="option"]')).map(e => e.innerText && e.innerText.trim()).filter(t => t && t.length > 5 && t.length < 200))`,
  },
  {
    name: "current-org-and-user",
    description: "Read the org name and user chip from the project picker footer.",
    code: `JSON.stringify({ org: (Array.from(document.querySelectorAll('button')).find(b => /Organization/i.test(b.innerText)) || {}).innerText || null, user: (Array.from(document.querySelectorAll('button')).find(b => /@/.test(b.innerText)) || {}).innerText || null })`,
  },
  {
    name: "active-canvas-tool",
    description: "Which canvas tool (Tweaks, Comment, Edit, Draw) is currently active? Active tools have a distinct background.",
    code: `JSON.stringify(Array.from(document.querySelectorAll('button')).filter(b => /^(Tweaks|Comment|Edit|Draw)$/i.test(b.innerText.trim())).map(b => ({ tool: b.innerText.trim(), active: b.matches('[data-state="on"], .active, [aria-pressed="true"]') || /background-color: rgb\\(\\d+/.test(b.style.cssText) })))`,
  },
  {
    name: "design-system-status",
    description: "On /design (picker), is a design system set up for the current org?",
    code: `JSON.stringify({ hasSetupCTA: !!Array.from(document.querySelectorAll('button')).find(b => /Set up design system/i.test(b.innerText)), designSystemsTabContent: (document.querySelector('[role="tabpanel"]') || document.body).innerText.slice(0, 500) })`,
  },
  {
    name: "wait-marker",
    description: "Tiny snippet that returns the current millisecond timestamp. Useful as a synchronous wait barrier (run between two other snippets to confirm DOM has settled).",
    code: `Date.now()`,
  },
];

function parseArgs(argv: string[]): { cmd?: string; name?: string; json: boolean; help: boolean } {
  const out: { cmd?: string; name?: string; json: boolean; help: boolean } = { json: false, help: false };
  const positional: string[] = [];
  for (const a of argv) {
    if (a === "--json") out.json = true;
    else if (a === "--help" || a === "-h") out.help = true;
    else if (!a.startsWith("--")) positional.push(a);
  }
  out.cmd = positional[0];
  out.name = positional[1];
  return out;
}

function help(): never {
  process.stdout.write(
    `chrome-snippets.ts — JS snippets to inject via Chrome MCP javascript_tool.\n\n` +
      `Usage:\n` +
      `  npx tsx chrome-snippets.ts list                  list all snippets\n` +
      `  npx tsx chrome-snippets.ts get <name>            print the JS code for one snippet\n` +
      `  npx tsx chrome-snippets.ts get <name> --json     print {name, description, code} as JSON\n` +
      `  npx tsx chrome-snippets.ts <name>                shortcut for 'get <name>'\n`,
  );
  process.exit(0);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) help();

  // Handle "list" or no args
  if (!args.cmd || args.cmd === "list") {
    if (args.json) {
      process.stdout.write(JSON.stringify(SNIPPETS.map(({ name, description }) => ({ name, description })), null, 2) + "\n");
    } else {
      for (const s of SNIPPETS) process.stdout.write(`${s.name.padEnd(28)} ${s.description}\n`);
    }
    return;
  }

  // Handle "get <name>" or just "<name>"
  const wantedName = args.cmd === "get" ? args.name : args.cmd;
  if (!wantedName) {
    process.stderr.write("error: snippet name required.\n");
    process.exit(1);
  }
  const snippet = SNIPPETS.find((s) => s.name === wantedName);
  if (!snippet) {
    process.stderr.write(`error: no snippet named "${wantedName}".\n`);
    process.stderr.write(`available: ${SNIPPETS.map((s) => s.name).join(", ")}\n`);
    process.exit(1);
  }
  if (args.json) {
    process.stdout.write(JSON.stringify(snippet, null, 2) + "\n");
  } else {
    process.stdout.write(snippet.code + "\n");
  }
}

process.stdout.on('error', (e: NodeJS.ErrnoException) => { if (e.code === 'EPIPE') process.exit(0); });
main();
