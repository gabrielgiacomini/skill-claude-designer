---
name: claude-designer
description: when configuring Claude Design mockups, prototypes, landing pages, dashboards, slide decks, microsites. Design-system inheritance, brand-on exports. MCP-compatible. Not for non-Claude Design.
---

# GG → Claude Designer → Claude Design

> **Snapshot age:** collected 2026-04-26 (~7 days old as of today).
> Verify release-sensitive answers with the official help center before responding with high confidence.

Claude Design (https://claude.ai/design) is Anthropic Labs' research-preview web tool for creating designs, interactive prototypes, slide decks, and microsites by chatting with Claude. It is distinct from claude.ai chat / Artifacts: named projects with their own URLs, a chat-and-canvas split UI, an organization design system, inline comments, on-canvas Tweaks, an Edit mode, and dedicated exports (PDF, PPTX, .zip, standalone HTML, Canva, Claude Code handoff). It has its own usage meter, separate from chat and Claude Code limits.

For a direct command lookup, see [Quick Commands](#quick-commands) below.

## When to Use This Skill

**TRIGGER when:**

- User asks for a UI mockup, prototype, landing page, dashboard, microsite, signup flow, or settings screen that should be shareable and exportable.
- User mentions "Claude Design" by name.
- User wants output to match their brand via design system inheritance.
- User wants a slide deck exportable to PPTX or handoff to Canva.
- User needs visual iteration with inline comments, on-canvas tweaks, or direct property edits.
- User wants to hand a design off to Claude Code for implementation.
- User asks how to set up an org-wide design system.
- User hits a Claude Design issue (vanishing comments, save errors, "chat upstream error").

**SKIP when:**

- User wants a single throwaway visual inside a chat — plain Artifacts is a better fit.
- User asks about general design theory without a specific Claude Design task.

## Quick Commands

Run from the skill folder with `npx tsx scripts/<name>.ts <args>`. Pass `--json` for machine-parseable output.

| Task | Command |
|------|---------|
| Assemble a prompt | `npx tsx scripts/build-prompt.ts --goal "..." --layout "..." --content "..." --audience "..."` |
| Validate a user prompt | `npx tsx scripts/validate-prompt.ts "..."` |
| Pick the right export | `npx tsx scripts/pick-export.ts --recipient "..." --intent "..."` |
| Triage a UI error | `npx tsx scripts/triage-error.ts "<symptom>"` |

For the full script inventory and examples, see `scripts/README.md`.

## Common Misconceptions

| # | Misconception | Correction | Key concept |
|---|---------------|------------|-------------|
| 1 | Claude Design is the same as claude.ai chat / Artifacts | It is a separate tool with named projects, design systems, inline comments, Tweaks, and real exports | Project-bound tool |
| 2 | Claude will infer the brand from a vague brief | Without a design system and real brand assets, output is generic | Asset-first protocol |
| 3 | Comments are the most reliable way to make small changes | Comments occasionally vanish; chat is more reliable; Tweaks are best for value fiddling | Interaction-mode matching |
| 4 | Figma export is available | Figma is input-only; closest output is standalone HTML | Export boundaries |
| 5 | Opus should be used for every iteration | Sonnet/Haiku are fine for iteration; Opus is for initial generation | Model economics |
| 6 | Design can skip fact verification | Verify with WebSearch before prompting | Fact-first |

## Non-Negotiable Policy

1. **Verify facts before prompting.** Any factual claim about a specific product, version, or recent event must be verified via `WebSearch` before composing a Claude Design prompt. See `fact-verification.md`.
2. **Never reconstruct commands or steps from memory.** Always read the relevant reference file or run the relevant script before stating CLI flags, UI paths, or setup steps.
3. **Use the reference index to locate the right file before broad reading.** Load only the subset of `references/` the task requires.
4. **Do not modify sharing/access permissions or trigger file downloads on the user's behalf.** Ask the user to flip toggles or approve downloads explicitly.
5. **For any answer about models, pricing, or current version:** treat bundled data as likely stale and verify with WebSearch before stating specifics.
6. **Verify the artifact before claiming done.** Open the host HTML, check the console for errors, confirm artboards match the chat description, and click through at least one interactive element. See `verification.md`.
7. **Do not ask Claude Design to SVG-draw logos, product shots, or hero illustrations.** Use real assets or labeled placeholders. See `design-principles.md`.

## Claude Designer Quality Checklist

Use this checklist before and during any Claude Designer operation.

| # | Checklist Item | Why It Matters | Gate |
|---|---------------|---------------|------|
| 1 | **Facts verified** — WebSearch ran for products/companies/versions | Correct context | Pre-draft |
| 2 | **Brand assets gathered** — Logo, colors, fonts, UI screenshots | Asset-first protocol | Pre-draft |
| 3 | **Design system declared** — Type scale, backgrounds, accent, spacing | Brand consistency | Draft |
| 4 | **Prompt built** — scripts/build-prompt.ts ran | Structured prompt | Draft |
| 5 | **Prompt validated** — scripts/validate-prompt.ts passed | Quality gate | Draft |
| 6 | **Output verified** — Console checked, artboards match, interactions work | Correctness | Closeout |
| 7 | **Export selected** — scripts/pick-export.ts ran | Right format | Closeout |
| 8 | **Real assets used** — No SVG logos or product shots | Design quality | Draft |

### Quality Tiers

| Tier | Criteria | Use When |
|------|----------|----------|
| **Minimal** | Items 1-3, 6 | Quick mockup |
| **Standard** | Items 1-5, 6, 7 | Full design |
| **Full** | All 8 items | Brand-sensitive design |

### Pre-Draft Verification

```
□ Facts verified with WebSearch
□ Brand assets gathered
□ Design system declared
□ Prompt built with scripts/build-prompt.ts
□ Prompt validated
```

## Claude Designer Consistency Validator

Before finalizing, verify:

### Consistency Check Matrix

| Check | What to Verify | How to Fix |
|-------|---------------|------------|
| **Facts vs Memory** | WebSearch ran for named entities | Add WebSearch |
| **Assets vs Generic** | Brand assets gathered | Add assets |
| **System vs Output** | Design system declared | Add system |
| **Verification vs Claim** | Artifact verified before done | Run verification |

### Red Flags (Never Present)

- [ ] Facts stated without WebSearch
- [ ] Generic output with no brand assets
- [ ] SVG logos or product shots requested
- [ ] Output claimed done without verification
- [ ] Export format wrong for recipient

## Workflow

```
1. Verify facts        → WebSearch any named product/company/version
2. Understand the ask  → clarify deliverable, fidelity, variation count, brand/system
3. Gather brand assets → logo, product shots, UI screenshots, colors, fonts
4. Declare the system  → name type scale, backgrounds, accent, spacing grid
5. Compose the prompt  → run scripts/build-prompt.ts; validate with scripts/validate-prompt.ts
6. Submit and poll     → ⌘+Return; use scripts/chrome-snippets.ts get is-generation-running
7. Verify the output   → see verification.md
8. Summarize briefly   → caveats + next steps; do not re-describe the canvas
```

Steps 1, 3, 4 are not optional. Skipping them is the top cause of generic-looking output.

### Reference loading by task type

For diagnostic requests, run `scripts/triage-error.ts` or `scripts/chrome-snippets.ts get <probe>` before loading any reference files. Load only the subset the task needs.

| Task type | Load these files first | Skip |
|-----------|------------------------|------|
| Fact-check a product/brand | `fact-verification.md` | Everything else until facts are confirmed |
| Compose a new prompt | `prompting-and-iteration.md`, `design-principles.md`, `prompt-templates.md` | `known-issues.md`, `exports-and-sharing.md` |
| Operate the UI / drive via Chrome MCP | `ui-and-workflows.md`, `canvas-reference.md` | `design-principles.md` |
| Iterate an existing design | `prompting-and-iteration.md` | `overview.md` |
| Pick an export format | `export-decision-guide.md` | `design-systems-and-pricing.md` |
| Set up a design system | `design-systems-and-pricing.md` | `prompt-templates.md` |
| Troubleshoot an error | `known-issues.md`, `triage-error.ts` | `prompt-templates.md` |
| Verify output quality | `verification.md` | `overview.md` |

## Access and Setup

- Tool is at https://claude.ai/design. Web only — no desktop app, no Bedrock/Vertex availability.
- Plans: Pro, Max, Team, Enterprise. Default-off on Enterprise — admin must enable under Organization settings → Capabilities → Anthropic Labs → Claude Design toggle.
- The user must already be signed in at claude.ai. Never enter credentials on their behalf.
- Verify the page rendered the picker before composing prompts. Three failure modes look identical: not signed in, plan ineligible/org disabled, or slow render. Disambiguate with `scripts/chrome-snippets.ts get current-org-and-user`.
- For multi-Chrome setups, call `mcp__Claude_in_Chrome__list_connected_browsers` first; ask the user which one to drive.

## Command Decision Guide

| Scenario | Recommended command |
|----------|---------------------|
| Polished mockup or microsite | `pick-project-type.ts --deliverable "polished marketing landing page"` → Prototype → High fidelity |
| Quick sketch, low fidelity | Prototype → Wireframe |
| Presentation | Slide deck (toggle "Use speaker notes" for live talks) |
| Reuse a known structure | From template |
| One-off experiment | Other |
| Set up org design system | Set up design system card |

**Rule of thumb:** pick based on the deliverable, not the topic.

## Export Decision Guide

| Recipient | Pick |
|-----------|------|
| PowerPoint user | Export as PPTX |
| PDF reviewer | Export as PDF |
| Canva-native team | Send to Canva |
| Engineer implementing it | Handoff to Claude Code, or Download project as .zip |
| Designer in Figma | No direct export; use standalone HTML + comment-access link |
| Self-hosted page | Export as standalone HTML |
| Long-term archive | Download project as .zip |
| Try a risky change | Duplicate project |
| Reuse structure repeatedly | Duplicate as template |

For the full decision tree, see `export-decision-guide.md`.

## Prompting

A good first prompt names four things: **goal**, **layout**, **content**, **audience/device**. Add **dimensions** and **palette** for sharper output. If you want one design, say so explicitly; the default is multiple variations.

For ready-made prompt patterns by use case, see `prompt-templates.md`. For anti-slop rules, see `design-principles.md`.

## Iterating

Four modes; pick the one that matches the change:

| Mode | Best for |
|------|----------|
| Chat | Big structural moves, aesthetic shifts, alternatives, reviews |
| Comments | Targeted component-level changes (unreliable — fall back to chat if they vanish) |
| Tweaks | Adding live on-canvas controls for value fiddling without re-prompting |
| Edit | Direct property tweaks via docked panel |

To fork without losing state: ask "Save what we have and try a completely different approach."

For the full canvas toolbar reference, see `canvas-reference.md`.

## Models

Default is **Claude Opus 4.7**. Available: Haiku 4.5, Opus 4.7, Sonnet 4.6, Opus 3, Opus 4.6, Sonnet 4.5. Use Sonnet/Haiku for cheaper/faster iteration; use Opus for initial generation.

## Adding Context

Before the first prompt, seed Claude via Design System (biggest lever), screenshots, codebase attachment (use a subdirectory for monorepos), or Figma files. Cross-project context works by naming a sibling project in the prompt; projects can be generated in parallel in different tabs.

## Exporting and Sharing

The Share button (top-right) opens access controls and exports. Cowork safety rules apply: do not toggle access levels or trigger downloads without explicit user approval. Confirm before invoking Send to Canva or Handoff to Claude Code.

For the full menu breakdown, see `exports-and-sharing.md`.

## Known Issues

- Comments don't take → paste into chat with location context.
- Save errors in compact view → switch to full view.
- Lag with big repo → link a subdirectory.
- "Chat upstream error" → start a new chat tab (+ next to Chat).

For the full list with workarounds, see `known-issues.md`.

## Common Pitfalls

1. **Skipping brand-asset gathering.** Colors and fonts alone are not enough. Always ask for logo, product shots, and UI screenshots. See `prompting-and-iteration.md`.
2. **Vague feedback.** "Make it pop" produces random output. Name the property, the value, and the scope. See `design-principles.md`.
3. **Using Comments for critical changes.** Comments vanish unpredictably. Use chat for anything you cannot afford to lose.
4. **Forgetting to verify before claiming done.** The canvas iframe is forgiving; the standalone HTML may not be. Always unzip and open in a real browser.
5. **Linking an entire monorepo.** Attach only the component library or design-tokens subdirectory.
6. **Not telling Claude to use one design.** The default is multiple variations. Say "just one design, no variations" if that is what you want.

## Troubleshooting

| Symptom | Likely cause | Fix | Reference |
|---------|--------------|-----|-----------|
| Canvas is blank after generation | Partial failure — missing files | Check Design Files panel against chat delivery message; re-prompt | `verification.md` |
| Comment didn't take | Known race condition | Paste the same text into chat with location context | `known-issues.md` |
| Save fails repeatedly | Compact view bug | Switch to full view and retry | `known-issues.md` |
| "Chat upstream error" | Thread corruption | Click + next to Chat tab to start fresh chat in same project | `known-issues.md` |
| Output looks generic | Missing design system or brand assets | Set up design system; gather logo, screenshots, product shots | `design-systems-and-pricing.md`, `prompting-and-iteration.md` |
| Slow / hanging during context load | Monorepo too large | Re-link a specific subdirectory | `known-issues.md` |

## Working Defaults

- High fidelity, not wireframe.
- Opus 4.7 model.
- Variations enabled (ask once if user wants one or several).
- Light mode unless they say dark.
- Desktop-first unless they say mobile.

## Reference Files

12 files, flat (no subfolders).

### Priority 0 / craft baseline

| File | Description |
|------|-------------|
| `fact-verification.md` | Search-before-you-assume rule, highest priority |
| `design-principles.md` | Anti-slop rules and craft baseline for prompts |
| `verification.md` | Check the artifact actually delivers |

### Background docs

| File | Description |
|------|-------------|
| `overview.md` | What Claude Design is, vs. chat/Artifacts, models, plans |
| `ui-and-workflows.md` | Picker, project view, canvas, file structure, project types |
| `prompting-and-iteration.md` | Effective prompts, four interaction modes, brand-asset protocol |
| `exports-and-sharing.md` | Every Share menu item and when to use it |
| `design-systems-and-pricing.md` | Design system setup, per-plan allowances, admin toggle |
| `known-issues.md` | Research-preview bugs and confirmed workarounds |

### Quick lookup

| File | Description |
|------|-------------|
| `prompt-templates.md` | Reusable prompts by use case plus named style anchors |
| `canvas-reference.md` | Every canvas-toolbar control and project-view UI element |
| `export-decision-guide.md` | Pick the right export format from the Share menu |

## Scripts

| Script | Purpose |
|--------|---------|
| `build-prompt.ts` | Assemble a prompt from goal/layout/content/audience/dimensions/palette |
| `validate-prompt.ts` | Score a prompt against the four-part formula |
| `pick-project-type.ts` | Recommend project type for a deliverable |
| `pick-export.ts` | Recommend Share-menu export from recipient + intent |
| `pick-model.ts` | Recommend model by task phase and cost sensitivity |
| `triage-error.ts` | Match error symptom to documented workaround |
| `chrome-snippets.ts` | JS snippets to inject via Chrome MCP `javascript_tool` |

Run with `npx tsx scripts/<name>.ts <args>`. Pass `--json` for machine-parseable output. See `scripts/README.md` for examples.

## Assets

- `icon-small.svg`, `icon-large.png`, `icon-master.png` — skill icon assets.
