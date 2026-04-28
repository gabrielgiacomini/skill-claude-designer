# Exports and sharing

The **Share** button in the top-right of any project opens a single popover that combines access controls and every export option. The full menu, observed live on 2026-04-26.

> **Critical distinction observed live in a multi-project run:** the export options are NOT all the same kind of operation.
>
> - **Instant downloads** (the only category that actually puts a file on disk in seconds): `Download project as .zip`. ~5–50 KB. One click → download starts immediately.
> - **Claude-generated exports** (these spawn a sub-Claude task that takes 5–10+ minutes and consumes Claude Design quota): `Export as PDF`, `Export as standalone HTML`. Output is a NEW file added to the project, which you then download in a second step. Claude announces this with copy like *"I'll create a print-ready version. The current file uses a pan/zoom design canvas — for print, I'll lay each artboard out as its own page at native dimensions."*
> - **External destinations** (push to another tool — needs that tool's account): `Send to Canva`, `Handoff to Claude Code`.
> - **In-Claude actions** (no file produced): `Duplicate project`, `Duplicate as template`.
>
> **Default to `.zip`** when the goal is "I want to inspect / archive the source." Reserve PDF/HTML for actual final-distribution needs.

## Access section

- **Teammates can view** — read-only.
- **Teammates can comment** — read + add comments via the Comment tool.
- **Teammates can edit** — full edit access (also able to chat with Claude inside the project).
- **Private** — only you (default for new projects; the panel reads "Only you can see this project").

Plus a **Copy link** button (to share whatever access level is currently selected).

> **Sharing changes who can see and edit your work.** Per Cowork's safety rules, Claude does not modify sharing or access permissions on behalf of the user. If a session needs to change sharing, ask the user to flip the toggle themselves.

## Export / duplicate options (top-to-bottom in the menu)

| Option                        | What it does                                                                                                                                | Best for                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Duplicate project**         | Clones the entire project (chat + canvas) into a new project you own. Original is untouched.                                                 | Forking a working version before trying something risky; making a personal copy of a teammate's project. |
| **Duplicate as template**     | Saves the project as a template that other projects can be created **From template** in the picker. Templates show up under Design systems → Templates. | Codifying a structure your team uses repeatedly (deck format, dashboard skeleton, landing layout).   |
| **Download project as .zip** | Bundles the project's files (HTML pages, JSX components, assets) as a downloadable archive.                                                  | Local archival, offline review, handing the source files to a contractor.                            |
| **Export as PDF**             | Renders the canvas to a PDF.                                                                                                                | Stakeholder review, attaching to a doc/PR/email, async sign-off.                                     |
| **Export as PPTX…**           | Generates a PowerPoint deck.                                                                                                                | When the audience expects a `.pptx`; opens in Keynote / Google Slides too.                            |
| **Send to Canva…**            | Pushes the design into Canva for further editing.                                                                                            | Marketing / brand teams that already live in Canva.                                                  |
| **Export as standalone HTML** | A single self-contained `.html` file that runs anywhere.                                                                                     | Embedding in a doc, hosting on a static site, sending to someone who doesn't use Claude.             |
| **Handoff to Claude Code…**   | Hands the design intent + assets to Claude Code as a coding task.                                                                            | Engineering implementation. The cleanest seam between design and dev.                                |

The official docs additionally mention **Send to local coding agent** and **Send to Claude Code Web** as Claude Code-targeted handoff options. These weren't visible as separate menu items in our test (likely surfaced from inside the "Handoff to Claude Code…" submenu), but they're documented as supported paths.

## Picking the right export — the 60-second guide

Use this order of questions:

1. **Who's the recipient, and what tool do they live in?**
   - PowerPoint world → **PPTX**.
   - PDF reviewer / sign-off → **PDF**.
   - Marketing / brand in Canva → **Send to Canva**.
   - Engineer about to implement it → **Handoff to Claude Code** (or Download as .zip if they prefer to start fresh).

2. **Does it need to live somewhere outside Claude?**
   - Self-hosted page or doc embed → **Export as standalone HTML**.
   - Long-term archive / source backup → **Download project as .zip**.

3. **Is the "export" really a fork?**
   - "I want to try a risky change without losing this" → **Duplicate project**.
   - "I want to reuse this structure across many projects" → **Duplicate as template**.

## Sharing inside an org

The Access selector lets you grant view / comment / edit to teammates and copy a link. The link respects whichever access level you pick — there isn't a separate "anyone with the link" toggle.

For audit logging or per-user sharing reports: **not yet supported.** The admin guide explicitly says: "Claude Design is an Anthropic Labs release that doesn't support audit logs or usage tracking yet."

## What you cannot export to (yet)

- **Figma** — there's no "Send to Figma" option. Figma is supported as **input** (drag in a Figma file when starting a project), not output.
- **Sketch / Adobe XD / Principle / ProtoPie / Webflow / Framer** — no direct exports.
- **Custom domains / hosting** — Claude Design doesn't host the export for you. Standalone HTML lets you bring your own host.

If your org needs a format that isn't on the list, the admin docs suggest reaching out to your Anthropic sales contact.
