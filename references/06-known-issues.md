# Known issues and workarounds

Claude Design is in research preview. The official docs explicitly call out the following issues with workarounds; we've reproduced or confirmed several during exploration on 2026-04-26. Re-check before relying on any of these — fixes ship continuously.

## Inline comments occasionally vanish

**Symptom:** You drop a Comment on the canvas, hit "Send to Claude", and Claude doesn't seem to receive it.

**Workaround (official):** Paste the same comment text into the chat input on the left and send it from there. Use comment positioning ("on the V2 weather chip") in your wording so Claude knows what you're pointing at.

## Save errors in compact view

**Symptom:** Compact layout mode triggers save errors when iterating on a design.

**Workaround (official):** Switch to full view and retry the save.

## Lag with very large codebases

**Symptom:** Linking a huge monorepo to a project causes browser slowness or hangs during context loading.

**Workaround (official):** Link a specific subdirectory rather than the whole repo. Pick the directory that contains your component library / design tokens — you don't need the entire codebase for Claude to understand your patterns.

## "Chat upstream error"

**Symptom:** A chat thread errors out and won't recover.

**Workaround (official):** Open a new chat tab inside the same project (the **+** next to the Chat / Comments tabs at the top of the chat panel). The project state — files, design system, history — carries over. You're just starting a fresh conversation thread.

## No audit logs / no usage analytics dashboard

**Symptom:** Admins can't pull a report of who used Claude Design when, or how much.

**Workaround (official):** Track adoption qualitatively — check in with each rollout group, set up a feedback channel, periodically sample projects to assess design-system compliance.

## No data-residency controls

**Symptom:** Org needs guarantees about which region data is stored in.

**Workaround:** Today, none. If this is a hard requirement, contact your Anthropic sales contact before turning the feature on.

## Web-only

**Symptom:** No native desktop app, no AWS Bedrock or GCP Vertex availability.

**Workaround:** Use https://claude.ai/design in a browser. If your org requires availability through cloud-provider agreements, the admin docs say to reach out to Anthropic Sales.

## No Figma export

**Symptom:** You want to push a design back into Figma after generating it.

**Workaround:** None directly. Figma is supported as **input** (drag-in) but not as an output target. If you need it in Figma, the closest option is Export as standalone HTML and rebuild in Figma, or export as PDF and import that as a layer for reference.

## Behaviors that look like bugs but are intentional

- **Plain Return inserts a newline.** To submit a prompt, use **⌘ + Return** (Mac) or **Ctrl + Return** (Windows/Linux). The UI shows a "FYI: ⌘+Enter submits" toast on first try.
- **Hi-fi prompts produce multiple variations on one canvas.** This is the default behavior, not over-generation. To get just one design, ask for one explicitly: "Just give me a single design, no variations."
- **A "Verifier agent" runs after generation.** It's part of the pipeline — Claude self-checks before declaring done. The "Verifying…" pane with a small live preview iframe is normal.
- **The chat title auto-renames itself** based on your first message (e.g. "Morning Brief Card").

## When in doubt

- Click the **Docs** chip in the lower-left of the project picker — it links to the official help-center landing page for Claude Design.
- Use the support search (it's a public help center) for fast answers on edge cases.
