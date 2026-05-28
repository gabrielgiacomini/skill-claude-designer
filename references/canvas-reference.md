# Canvas and project-view reference

A flat reference of every UI control inside a Claude Design project, observed live on 2026-04-26.

## Top toolbar (always visible)

| Element                      | Behavior                                                                                              |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Project title** (top-left)  | Click to navigate / rename. The little Claude Design palette icon next to it returns you to `/design`. |
| **Design Files tab**          | Tab in the canvas area; the project's file tree.                                                      |
| **`<filename>` tab**         | Opens when you click a file. Becomes active in the canvas area.                                       |
| **Profile and connectors**    | Account menu (top-right area).                                                                        |
| **Help**                      | Small help icon in the chat panel.                                                                    |
| **Share** (top-right)         | Opens the access + export popover (see export-decision-guide.md).                                     |
| **Present**                   | Visible top-right when a file is open. Fullscreen presentation mode.                                  |
| **Back to projects**          | Returns to `/design`.                                                                                 |

## Chat panel (left side)

| Element                       | Behavior                                                                                                                                  |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Chat tab**                  | Conversation with Claude.                                                                                                                  |
| **Comments tab**              | Discussion items left as Comments (not "Send to Claude" — those become chat turns).                                                        |
| **+** (plus, after the tabs)  | Start a new chat tab inside the same project. Use this if a chat hits "chat upstream error".                                              |
| **"Start with context" card** | Visible until first prompt. Four shortcuts: Design System, Add screenshot, Attach codebase, Drag in a Figma file.                          |
| **Prompt input**              | Multi-line. **Submit with ⌘+Return.** Plain Return inserts a newline.                                                                      |
| **Hi-fi design / Interactive prototype chips** | Default tags applied to a hi-fi prototype project. Click `×` to dismiss. Removing them changes the kind of output Claude produces. |
| **Change model** (chevron)    | Picker: Haiku 4.5, **Opus 4.7** (default), Sonnet 4.6, Opus 3, Opus 4.6, Sonnet 4.5.                                                       |
| **Attach file** (paperclip)   | Adds a screenshot, image, or other reference.                                                                                              |
| **Start voice input**         | ⌘G to tap or hold.                                                                                                                         |

### Activity log items (under each Claude reply during generation)

You'll typically see a sequence like:

1. Claude's text reply (design intent / direction).
2. **"Copying starter, Writing ×N"** — collapsed tool-use rows. Click the chevron to expand.
3. **"Writing <file>.html"** / **"Placed <Component>"** / **"Created <Component>"** / **"Added <prop>"** — file and component manipulations.
4. **"Done, Fork verifier agent"** — a verifier agent forks to QA the output.
5. **"Verifying…"** with a small live preview iframe.
6. Final message confirming the design is ready.

## Canvas area (right side)

### File toolbar (top-left of canvas)

| Element            | Behavior                                                       |
| ------------------ | -------------------------------------------------------------- |
| **Up one level**   | Navigate to parent directory in the file tree.                |
| **Reload**         | Re-render the current file.                                    |
| **Breadcrumb**     | E.g. `project`. Click to navigate.                             |

### Canvas tools (top-right of canvas)

| Tool         | Behavior                                                                                                                                                                                                                |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **+ Tweaks** | Opens a "Describe a tweak…" popover with an **Ideas** button. Asks Claude to add interactive controls (sliders, toggles, color pickers) to the design so you can fiddle without re-prompting.                          |
| **Comment**  | Toggles a mode where clicking on the canvas opens a comment popover. The popover offers **Comment** (saves to Comments tab) and **Send to Claude** (fires it as an iteration request).                                |
| **Edit**     | Toggles an Edit mode. Docks a property panel on the right. Page-level: Background, Font (default Inter), Base size (default 16px). Selecting an element exposes its own properties.                                    |
| **Draw**     | Sketch / annotation overlay (we noted its presence; not exhaustively tested).                                                                                                                                          |
| **Zoom level** | Defaults to 100%. Standard zoom controls.                                                                                                                                                                            |

### Page structure (visible on the canvas)

- A **page headline** at the top (e.g. "Classic — by-the-book").
- One or more **section sub-headlines** (e.g. "Expressive — typography-led").
- **Artboards** under each section, each labeled with a name (e.g. "V1 · Stacked sections", "V2 · Quiet ledger") and a small drag handle. Drag to reorder. Double-click to focus an artboard fullscreen.

## File tree (Design Files tab)

Two sections:

- **PAGES** — `.html` files. The renderable pages.
- **COMPONENTS** — `.jsx` files. Reusable React components Claude wrote.

The right-hand preview pane for a selected file shows a thumbnail, an **Open** button, the filename, the type ("Component" / "HTML page"), and metadata: "Modified just now · 30.4 KB · JSX".

## Share / export popover (Share button top-right)

### Access section

- Teammates can view
- Teammates can comment
- Teammates can edit
- Private (default — "Only you can see this project")
- **Copy link** button (respects whichever access level is selected)

### Action items (top-to-bottom)

1. **Duplicate project** — fork into a new project you own.
2. **Duplicate as template** — saves as a template available in `/design` → Design systems → Templates and via the "From template" tab in the picker.
3. **Download project as .zip** — full archive (HTML pages, JSX components, assets).
4. **Export as PDF** — renders canvas to PDF.
5. **Export as PPTX…** — generates a PowerPoint deck.
6. **Send to Canva…** — pushes design into Canva for further editing.
7. **Export as standalone HTML** — single self-contained `.html` file.
8. **Handoff to Claude Code…** — hands design intent + assets to Claude Code as a coding task. (Per the docs, also includes "Send to local coding agent" and "Send to Claude Code Web" sub-options.)

### Comments / feedback inside the share panel

The share panel also has a "Leave feedback for your teammates" textbox with a **Send** button. Distinct from canvas Comments and from the chat thread.

## Project picker (`/design` homepage)

Refer to [ui-and-workflows.md](ui-and-workflows.md) for full coverage. Quick map:

- **Left column:** Tabs (Prototype / Slide deck / From template / Other), inputs per type, "Set up design system" CTA, footer chips (Docs, Org, User).
- **Right column:** Tabs (Designs / Examples / Design systems), sub-tabs and search, project cards / examples gallery / design-system management.

## Keyboard shortcuts to memorize

- **⌘ + Return** — submit a prompt (the most-missed one — Return alone makes a newline).
- **⌘ + G** — voice input toggle (tap or hold).
- **Esc** — close popover / exit a mode (Comment, Tweaks, etc.).
- **Double-click an artboard** — focus it fullscreen.
