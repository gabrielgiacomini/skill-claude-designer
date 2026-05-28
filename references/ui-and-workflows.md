# UI map and workflows

## The project picker (the homepage at `/design`)

A two-column layout.

### Left column — the create panel

Tabs across the top let you pick what you're making:

| Tab               | Inputs / options                                                                                                                                     | Use it for                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Prototype**     | Project name + a fidelity choice: **Wireframe** (lo-fi) or **High fidelity** (default; gets the design system, real components, polish).             | UI mockups, interactive prototypes, microsites, landing pages.                       |
| **Slide deck**    | Project name + **Use speaker notes** toggle ("less text on slides").                                                                                  | Presentations. The toggle pushes content into speaker notes and keeps slides clean.  |
| **From template** | Project name + a list of templates. Today the only built-in template is **Animation — timeline-based motion design**. Link: "How to create a template". | Reusing a structure your team has codified as a template.                            |
| **Other**         | Project name only.                                                                                                                                   | Anything that doesn't fit the above (e.g. a quick experiment or one-off canvas).     |

Below the create panel there's always:
- "Only you can see your project by default."
- A **Set up design system** card — wide orange CTA to bootstrap an org-wide design system.

Footer:
- **Docs** chip — links to https://support.claude.com/en/articles/14604416-get-started-with-claude-design
- Org chip — current org name.
- User chip — your name.

### Right column — your project library

Top-level tabs: **Designs** | **Examples** | **Design systems**.

- **Designs**:
  - Sub-tabs: **Recent** / **Your designs**.
  - Search box.
  - Cards for each project. A "Learn about Claude Design — Quick tutorial" card is shown by default for new accounts (dismissible).
- **Examples**: a video gallery of inspirational example projects, each with a "**Use this prompt**" button that pre-fills a new project. We saw 9 examples on the page including: Cosmic scale animation, Text particle effects, Calculator construction kit, Globe loader, Shader wallpapers, Organic loaders, Text streaming, App onboarding, Iridescent card. These are the best place to mine prompt patterns from.
- **Design systems**:
  - "**Create new design system** — Teach Claude your brand and product."
  - "**Templates**" section — initially empty: "No templates yet. Create one from any project via the Share menu → File type."

### Onboarding modal (first time clicking the tutorial)

Asks "What do you do? Pick all that apply — we'll tailor tips to your workflow." Options: Design, Engineering, Product, Sales, Data, Marketing, Other. Has a **Skip** link if you'd rather not.

## The project view (after clicking Create)

URL pattern: `claude.ai/design/p/<uuid>`. Two columns plus a top toolbar.

### Left column — Chat

- Tabs: **Chat** | **Comments** | **+** (new chat tab — useful when a chat hits a "chat upstream error", per the docs).
- Above the input, a **"Start with context"** card with four context-attachment shortcuts (visible until you send your first prompt):
  1. **Design System** — pull from your org design system.
  2. **Add screenshot** — upload images (mockups, competitor screens, references).
  3. **Attach codebase** — link a repo so Claude understands your real components/styling.
  4. **Drag in a Figma file** — accepts Figma exports (info tooltip available).
- Prompt input at the bottom. Default chips applied to a hi-fi project: `Hi-fi design ×` and `Interactive prototype ×` (you can dismiss either).
- Submit shortcut: **⌘ + Return**. Plain Return adds a newline (the UI tells you this with a "FYI: ⌘+Enter submits" toast on first attempt).
- Input toolbar: **Change model** (chevron), **Attach file** (paperclip), **Start voice input** (⌘G tap or hold).

### Right column — Canvas

Top tab strip: **Design Files** is the project file tree. Opening any file (e.g. `Morning Brief.html`) opens it as an additional tab next to Design Files.

When viewing a file:
- File toolbar (left side of canvas top): up-one-level, reload, breadcrumb (e.g. `project`).
- Canvas tools (right side of canvas top): **+ Tweaks**, **Comment**, **Edit**, **Draw**, **100% (Zoom level)**.
- Page header: a section title Claude wrote (e.g. "Classic — by-the-book"), then artboards with little drag handles and labels (e.g. "V1 · Stacked sections"). The chat tells you "Drag artboards to reorder, double-click any one to focus fullscreen."

### Top toolbar (always visible)

- Project title chip (top-left) — click to navigate / rename.
- **Share** (top-right) — opens the access + export menu (see [exports-and-sharing.md](exports-and-sharing.md)).
- **Profile and connectors** — account menu.
- **Help** (in chat panel) — small help icon.
- **Present** — fullscreen presentation mode (visible top-right when a file is open).

## File structure inside a project

A finished project has two sections in its Design Files tree:

- **PAGES** — `.html` files. The renderable pages.
- **COMPONENTS** — `.jsx` files. Reusable React components Claude wrote (in our test: `design-canvas.jsx` plus internal components like `<DCSection>` and `<CardLedger>`).

The right-hand preview pane shows a thumbnail, an **Open** button, and metadata (e.g. "Modified just now · 30.4 KB · JSX").

## What happens during generation (chat side)

You see a live activity log under Claude's reply, including:
- "Copying starter, Writing ×N" (collapsed tool-use rows).
- "Writing <FileName>.html"
- "Placed `<Component>`"
- "Created `<NewComponent>`"
- "Adding `<prop>`"
- A **Verifier agent** ("Done, Fork verifier agent" + "Verifying…" with a small live preview iframe) that double-checks the output before declaring done.

This makes the run feel transparent — you can usually tell what Claude is on without expanding the rows.

## Workflows by project type

| You want to…                                  | Pick                                  | Notes                                                                                                                                |
| --------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Sketch a flow without committing to fidelity  | Prototype → **Wireframe**             | Cheaper, faster; lower compute. Good for early exploration.                                                                          |
| Build a polished mockup or microsite          | Prototype → **High fidelity**          | Inherits design system. Default tags include `Interactive prototype`.                                                                |
| Make a presentation                           | **Slide deck**                        | Toggle **Use speaker notes** if your slides will be presented live; leave off if the deck is for self-serve reading.                  |
| Reuse a known structure                        | **From template**                     | Templates come from your org. Animation is the only built-in template today.                                                         |
| One-off / experimental canvas                 | **Other**                             | No fidelity scaffold; minimal opinions.                                                                                              |
| Set up the design system other projects use   | **Set up design system** card          | One-time job per org; see [design-systems-and-pricing.md](design-systems-and-pricing.md).                                    |
