---
name: claude-designer
description: How to use Claude Design (https://claude.ai/design) — Anthropic Labs' web-based design tool for prototypes, slide decks, microsites, and presentations. Use this skill whenever the user wants to create a UI mockup, interactive prototype, landing page, dashboard, slide deck, microsite, or wants to "design" or "prototype" something visually, ESPECIALLY if they mention "Claude Design", a design system, brand-on prototypes, or want to hand off a design to engineering. Also use when the user wants to iterate on an existing Claude Design project, change export options, set up a design system, or troubleshoot a Claude Design issue (vanishing comments, save errors in compact view, large-codebase lag, chat upstream errors). Do NOT use for general chat-based mockups via Artifacts — use this when the user specifically wants the dedicated design tool's project structure, design-system inheritance, inline comments, tweaks, or PDF/PPTX/Canva/Claude-Code exports.
---

# Claude Design — operating guide

Claude Design (https://claude.ai/design) is Anthropic Labs' research-preview web tool for creating designs, interactive prototypes, slide decks, and microsites by chatting with Claude. It is distinct from claude.ai chat / Artifacts: it has named projects, a chat-and-canvas split UI, an organization design system, inline comments, on-canvas Tweaks (live controls), an Edit mode, and dedicated exports (PDF, PPTX, .zip, standalone HTML, Canva, Claude Code handoff). It also has its own usage meter, separate from chat and Claude Code limits.

## Script trigger map (when to invoke which helper)

The `scripts/` folder contains TypeScript helpers. **Default behavior should be to invoke the relevant script rather than reason from scratch.** Run with `npx tsx scripts/<name>.ts <args>` from the skill folder. Pass `--json` for machine-parseable output.

| When this happens…                                                              | Run                                  |
| ------------------------------------------------------------------------------- | ------------------------------------ |
| About to compose a prompt to send to Claude Design                              | `build-prompt.ts` (assemble it)      |
| About to forward a user-supplied prompt straight through                         | `validate-prompt.ts` (sanity check)  |
| Need to pick from the four picker tabs (Prototype / Slide deck / Template / Other) | `pick-project-type.ts`               |
| User asks for an export and you're not sure which                                | `pick-export.ts --recipient … --intent …` |
| User wants to save credits, or you're on iteration 3+ of the same project        | `pick-model.ts`                      |
| **Anything errored in the UI** (canvas blank, comment vanished, save failed, "chat upstream error", quota-related, etc.) | `triage-error.ts "<symptom>"` BEFORE asking the user |
| Need to read state from the Claude Design page without clicking around (model list, share-menu options, file tree, generation status, project ID, etc.) | `chrome-snippets.ts get <name>` then pass the snippet to `mcp__Claude_in_Chrome__javascript_tool` |

## When to reach for this skill

Reach for it when the user:

- Asks for a UI mockup, prototype, landing page, dashboard, microsite, signup flow, settings screen, etc., and the deliverable should be **shareable and exportable** (not a one-off chat artifact).
- Mentions "Claude Design" by name.
- Wants the output to **match their brand** (design system inheritance) instead of generic styling.
- Wants a **slide deck** they can export to PPTX or hand off to a Canva user.
- Needs to **iterate visually** with inline comments, on-canvas tweaks, or direct property edits.
- Wants to **hand a design off to Claude Code** for implementation.
- Asks how to set up an org-wide **design system**, or how to enable Claude Design for their team.
- Hits a Claude Design issue (vanishing comments, save errors in compact view, monorepo lag, "chat upstream error").

If the user just wants a single throwaway visual inside a chat, plain Artifacts may be a better fit — Claude Design starts a real project with its own URL.

## Access prerequisites

- The tool is at **https://claude.ai/design**. Web only — no desktop app, no Bedrock/Vertex availability today.
- Plans: Pro, Max, Team, Enterprise. **Default-off on Enterprise** — admin must enable it under Organization settings → Capabilities → Anthropic Labs → Claude Design toggle.
- The user must already be signed in at claude.ai. If they aren't, hand off the auth — never enter a password on someone's behalf.

## Verifying access state before doing real work

Before composing prompts or kicking off generation, check the page actually rendered the picker. Three failure modes look identical from a screenshot:

1. **Not signed in** — page redirects to a login form. The org/user chips at the bottom-left of `/design` are absent.
2. **Plan ineligible / org disabled the feature** — page loads but the picker tabs (Prototype / Slide deck / From template / Other) are missing.
3. **Page just slow to render** — give it ~3 seconds and re-screenshot.

How to disambiguate without guessing:

```bash
# Inject a state probe via Chrome MCP javascript_tool
npx tsx scripts/chrome-snippets.ts get current-org-and-user
```

If the snippet returns `{ org: null, user: null }`, the user isn't signed in — ask them to sign in, don't try to fix it. If org/user are populated but the picker tabs aren't, run `chrome-snippets.ts get design-system-status` and `triage-error.ts "can't find picker"` for the right escalation.

For a multi-Chrome setup: call `mcp__Claude_in_Chrome__list_connected_browsers` first; if more than one is returned, ask the user which one to drive (the user has the working sign-in state in their head, you don't).

## How to operate the tool (Cowork / Chrome MCP)

When the task involves driving the tool on the user's behalf via the Claude-in-Chrome MCP:

1. Confirm which Chrome browser to drive if more than one is connected (`list_connected_browsers` → ask the user → `select_browser`).
2. Open https://claude.ai/design in a new tab. If the user isn't logged in, ask them to sign in — don't auto-fill credentials.
3. Take a screenshot to confirm state before acting.
4. **Submit prompts with ⌘+Return** on macOS, **Ctrl+Return** on Windows/Linux. Plain Return only inserts a newline. The UI will show a "FYI: ⌘+Enter submits" toast on the first wrong attempt — that's expected. If you don't know which OS the browser is on, check `mcp__Claude_in_Chrome__list_connected_browsers` — each browser entry includes `osPlatform` (e.g. `"macOS"` vs `"Windows"`).
5. After hitting Create on a new project, the URL becomes `https://claude.ai/design/p/<uuid>`. Generation takes 30–90 seconds for a hi-fi prototype; wait between screenshots rather than spamming them.
6. Generation produces **multiple stylistic variations on a single canvas by default** (we saw 5 variants for a small card prompt). If the user only wants one, say so explicitly in the prompt.

## The picker — choosing a project type

The left sidebar of `/design` has four tabs. Pick based on the deliverable, not the topic:

| User wants…                                  | Pick                                 |
| -------------------------------------------- | ------------------------------------ |
| Polished mockup or microsite                  | **Prototype** → **High fidelity** (default) |
| Quick sketch, low fidelity                    | **Prototype** → **Wireframe**         |
| Presentation                                 | **Slide deck** (toggle "Use speaker notes" if it's a live talk) |
| Reuse a known structure                       | **From template**                    |
| Something that doesn't fit the above          | **Other**                            |
| Set up the org design system                  | **Set up design system** card         |

For inspiration, the **Examples** tab contains a video gallery; clicking "Use this prompt" pre-fills a new project with a curated prompt.

## Prompting — what makes a first prompt land

A good first prompt names four things:

1. **Goal** — what you're building.
2. **Layout** — how things should be arranged.
3. **Content** — actual copy / data / sample values.
4. **Audience / device** — who'll use it, mobile/desktop, etc.

Add **dimensions** ("360px wide", "200×200") and **palette / aesthetic** ("monochrome", "warm off-white background, single warm accent") for sharper output. If you want multiples, ask for them ("show 3 alternative layouts on a wrapping grid"); if you want one, say so.

For ready-made prompt patterns by use case, see [references/prompt-templates.md](./references/prompt-templates.md). The `scripts/build-prompt.ts` helper assembles a well-formed prompt from structured input — useful when an agent is composing a prompt on the user's behalf.

## Iterating — pick the right interaction mode

Four modes; pick the one that matches the change:

- **Chat** — big structural moves, aesthetic shifts, "show me alternatives", explanations, accessibility / consistency reviews.
- **Comments** — click the Comment button (top-right of canvas), then click on the canvas. A popover offers **Comment** (saves a discussion item) or **Send to Claude** (fires it as an iteration request). Comments occasionally vanish before Claude reads them — fall back to chat if a comment doesn't take.
- **Tweaks** — click **+ Tweaks**, describe the control or use **Ideas**. Asks Claude to add **interactive controls** (sliders, toggles) to the design so you can play with values without re-prompting. If the user keeps asking for "a bit more X / less X" — switch to Tweaks.
- **Edit** — direct property edits via a docked panel on the right. Page-level shows Background / Font / Base size; selecting an element exposes its own properties.

To "fork" a design without losing the current state, just ask: "Save what we have and try a completely different approach."

For the canvas toolbar layout in detail (every button, every panel), see [references/canvas-reference.md](./references/canvas-reference.md). For programmatic state extraction via the Chrome MCP `javascript_tool`, see `scripts/chrome-snippets.ts`.

## Models

Default is **Claude Opus 4.7**. Pick a different model from the **Change model** chevron next to the chat input. Available: Claude Haiku 4.5, Claude Opus 4.7, Claude Sonnet 4.6, Claude Opus 3, Claude Opus 4.6, Claude Sonnet 4.5. Use Sonnet/Haiku for cheaper / faster iteration once the design is roughly right; use Opus for the initial generation if quality matters.

## Adding context (the "Start with context" panel)

Before sending the first prompt, four shortcuts let you seed Claude:

- **Design System** — pull from the org design system. Single biggest lever for brand fidelity.
- **Add screenshot** — drop in mockups, competitor screens, "make it look like this" references.
- **Attach codebase** — link a repo. Use a **specific subdirectory** for large monorepos to avoid lag.
- **Drag in a Figma file** — Figma exports are accepted as input.

Tip: a finished landing page tells Claude more about brand feel than a color palette alone. If you know a component name in the design system, mention it directly ("Use the Primary Button component").

### Cross-project context (undocumented but powerful)

**Claude Design will proactively read sibling projects** in the same workspace if you mention them by name in the prompt. Example: writing *"sibling project: '<your earlier project name here>' — inherit the design system / tokens from there if you can"* causes Claude to list and read that project's files before starting work, then carry the same color tokens, spacing, typography, and chrome into the new project. Output reads as if from the same product. Confirmed across 4 sibling projects in one session.

Use this when:
- A brief naturally splits into themed sub-projects (e.g. one playground per modality).
- You want visual consistency without redoing the design-system setup.
- You want Claude to inherit prior decisions (sidebar IA, semantic color usage, etc.).

**Concurrency tip:** these themed projects can be generated **in parallel in different tabs** without rate-limit issues — much faster than serializing them. Just kick off each one and poll for completion separately.

## Exporting / sharing

The **Share** button (top-right) opens a single popover with both access controls and exports. To pick the right export, see [references/export-decision-guide.md](./references/export-decision-guide.md), or run `scripts/pick-export.ts` with the recipient/intent for a one-line recommendation. The full list:

- Access: View / Comment / Edit / Private (default Private). Copy link.
- Duplicate project; Duplicate as template.
- Download project as .zip.
- Export as PDF; Export as PPTX; Send to Canva.
- Export as standalone HTML.
- Handoff to Claude Code.

> **Cowork safety rules apply here. Two distinct rules are in play:**
>
> 1. **Sharing / access changes are prohibited.** Don't toggle Teammates can view / comment / edit on the user's behalf. Ask the user to flip the toggle themselves.
> 2. **Downloads require explicit user approval.** Before clicking any export that produces a file (Download project as .zip, Export as PDF, Export as PPTX, Export as standalone HTML), confirm with the user using AskUserQuestion: name the filename, the format, and where it'll land. The agent should not silently trigger a file download just because an earlier turn implied "export it."
>
> **Send to Canva** and **Handoff to Claude Code** also leave the user's environment — confirm before invoking, even though no local file is downloaded.

## Known issues — quick triage

- **Comments don't take** → paste the same text into chat, mention the location explicitly.
- **Save errors in compact view** → switch to full view, retry.
- **Slow with a big repo** → re-link a specific subdirectory (component library / design tokens), not the whole monorepo.
- **"Chat upstream error"** → click `+` next to the Chat tab to start a fresh chat in the same project. Files and design-system context carry over.
- **No audit logs / usage analytics** for admins yet — track adoption qualitatively.
- **No data residency** controls yet — flag this to the user before they upload sensitive assets.
- **No Figma export** — Figma is input-only. Closest output is standalone HTML.

## Working defaults to assume unless the user says otherwise

- **High fidelity**, not wireframe.
- **Opus 4.7** model.
- **Variations enabled** (Claude will produce several stylistic options on one canvas). Ask the user once whether they want one design or several.
- **Light mode** unless they say dark.
- **Desktop-first** unless they say mobile.

## Troubleshooting common user asks

- **"Create a deck about X"** → use the Slide deck project type. Toggle Use speaker notes if it's for a live presentation.
- **"Make it on-brand / make it look like our product"** → make sure their org has a Design System set up (Design systems tab → Create new design system, or Set up design system from the picker). Without one, output is generic.
- **"Export it for engineering"** → Handoff to Claude Code, or Download project as .zip if they prefer to start fresh in their own tooling.
- **"Send it to Canva"** → Share menu → Send to Canva.
- **"Hand it to my designer in Figma"** → no direct Figma export. Closest fit: Export as standalone HTML; or share a Comment-access link to the project.
- **"How much does this cost?"** → Claude Design has its own weekly allowance per user, separate from chat and Claude Code. See [references/05-design-systems-and-pricing.md](./references/05-design-systems-and-pricing.md) for the per-plan breakdown.

## Reference files in this skill

Background docs (read these for deep understanding before doing anything non-trivial):

- [references/01-overview.md](./references/01-overview.md) — what Claude Design is, vs. chat/Artifacts, models, plan availability.
- [references/02-ui-and-workflows.md](./references/02-ui-and-workflows.md) — the picker, project view, canvas, file structure, every project type.
- [references/03-prompting-and-iteration.md](./references/03-prompting-and-iteration.md) — effective prompts; Chat vs. Comments vs. Tweaks vs. Edit.
- [references/04-exports-and-sharing.md](./references/04-exports-and-sharing.md) — every Share menu item and when to use it.
- [references/05-design-systems-and-pricing.md](./references/05-design-systems-and-pricing.md) — design system setup, per-plan allowances, admin toggle.
- [references/06-known-issues.md](./references/06-known-issues.md) — research-preview bugs and confirmed workarounds.

Quick lookup references (load on demand):

- [references/prompt-templates.md](./references/prompt-templates.md) — reusable prompts by use case (dashboard, onboarding, settings, landing page, deck, animation).
- [references/canvas-reference.md](./references/canvas-reference.md) — every canvas-toolbar control and every project-view UI element.
- [references/export-decision-guide.md](./references/export-decision-guide.md) — pick the right export format from the Share menu.

## Helper scripts (in `scripts/`)

Small TypeScript utilities that reduce friction when an agent is operating the tool. Run with `tsx <script>.ts <args>` from the `scripts/` directory (or `npx tsx`). All scripts are pure logic — they don't touch Chrome themselves; the agent does that. They emit JSON or human-readable text the agent can use directly.

- `build-prompt.ts` — assemble a well-formed Claude Design prompt from goal/layout/content/audience/dimensions/palette.
- `validate-prompt.ts` — check whether a prompt has all four required parts; report what's missing.
- `pick-project-type.ts` — given a deliverable description, recommend Prototype (Wireframe vs. Hi-fi) / Slide deck / From template / Other.
- `pick-export.ts` — given recipient + intent, recommend the right Share menu option.
- `pick-model.ts` — given task phase + cost sensitivity, recommend a model.
- `triage-error.ts` — given an error symptom, return the documented workaround.
- `chrome-snippets.ts` — exports JS strings to inject via the Chrome MCP `javascript_tool` (extract project state, list models, dump share-menu items, count generated files, etc.).

See `scripts/README.md` for invocation examples.
