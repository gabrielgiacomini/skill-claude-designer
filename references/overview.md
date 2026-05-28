# Overview

## What it is

Claude Design (https://claude.ai/design) is a web tool from Anthropic Labs for generating designs, interactive prototypes, slide decks, and microsites by chatting with Claude. The header reads "Claude Design — Research Preview — by Anthropic Labs."

## How it differs from claude.ai chat and from Artifacts

- **Chat / Artifacts:** one-off canvases inside a conversation. Good for a single mockup or prototype, but no persistent project, no inline comments, no design-system inheritance, and limited export.
- **Claude Design:** named projects with their own URL, a chat-and-canvas split UI, file structure (Pages + Components), an inline Comment mode, a "Tweaks" panel for adding live controls, an Edit mode for direct property changes, an org-wide Design System that all projects inherit, and a real export menu (PDF, PPTX, .zip, standalone HTML, Canva, Claude Code handoff).
- **Claude Design also has its own usage meter,** separate from chat and Claude Code limits.

## Who can use it

Available to **Pro, Max, Team, and Enterprise** plans. On Enterprise it's **default-off** — an admin must turn it on under Organization settings → Capabilities → Anthropic Labs. No free-plan access.

## What it produces

A project is a small site:

- **Pages** — `.html` files. Render the actual visible layout on the canvas.
- **Components** — `.jsx` files. The reusable React components Claude wrote and placed onto the page.

In our test, a single prompt for a 360-px "Morning Brief card" produced one `Morning Brief.html` page that lays out **five** stylistic variations side-by-side on a canvas (V1 Classic, V2 Ledger, V3 Editorial, V4 Timeline-first, V5 Day Band). Cards were grouped under section headlines (e.g. "Classic — by-the-book", "Expressive — typography-led"). Generating multiple variations on one canvas appears to be the default behavior for hi-fi prototype prompts.

## Available models (model picker, top-right of chat input)

- Claude Haiku 4.5
- **Claude Opus 4.7** (default)
- Claude Sonnet 4.6
- Claude Opus 3
- Claude Opus 4.6
- Claude Sonnet 4.5

The picker is the small downward-chevron button next to the chat input.

## Status disclaimers worth keeping in mind

- "Research preview" is shown in the header at all times.
- The admin guide explicitly notes Claude Design **does not yet support audit logs or usage analytics**.
- It does not currently support **data residency** controls.
- It is web-only (`claude.ai/design`) — no desktop app, no AWS Bedrock / GCP Vertex availability today.
