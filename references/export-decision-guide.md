# Export decision guide

The Share menu (top-right) combines access controls and exports. Use this guide to pick the right export by working through three questions.

> **Reminder:** Cowork's safety rules forbid Claude from changing sharing/access controls on the user's behalf. Always ask the user to flip the access toggle themselves, even if you've been asked to "share with X".

## The three questions

### 1. Who's the recipient, and what tool do they live in?

| Recipient            | Pick                                                     |
| -------------------- | -------------------------------------------------------- |
| PowerPoint user      | **Export as PPTX**                                       |
| PDF reviewer         | **Export as PDF**                                        |
| Canva-native team    | **Send to Canva**                                        |
| Engineer implementing it | **Handoff to Claude Code** (best seam) or **Download project as .zip** if they prefer to start fresh in their own setup |
| Designer in Figma    | No direct export. Workarounds: **Export as standalone HTML** + comment-access link, or PDF for reference only |
| Anyone in your org    | Use **Access → Teammates can view/comment/edit** + **Copy link** — no export needed |

### 2. Does it need to live somewhere outside Claude?

| Need                                          | Pick                                  |
| --------------------------------------------- | ------------------------------------- |
| Self-hosted page or doc embed                  | **Export as standalone HTML**         |
| Long-term archive / source backup              | **Download project as .zip**          |
| Email attachment / async sign-off              | **Export as PDF**                     |
| Slack / Notion / wiki — needs to render inline | **Export as PDF** (most apps preview it) or **standalone HTML** if hosted somewhere |

### 3. Is the "export" really a fork?

| Intent                                         | Pick                                  |
| ---------------------------------------------- | ------------------------------------- |
| "I want to try a risky change without losing this" | **Duplicate project**             |
| "I want to reuse this structure in many future projects" | **Duplicate as template**     |

## Quick reference table

| Option                        | Output                       | Best for                                                    | Caveats                                                  |
| ----------------------------- | ---------------------------- | ----------------------------------------------------------- | -------------------------------------------------------- |
| Duplicate project             | New Claude Design project    | Branching before risky changes                               | Lives in Claude Design; not a file                       |
| Duplicate as template         | Template in your org         | Codifying a reusable structure                               | Surfaces in From template tab + Design systems → Templates |
| Download project as .zip      | `.zip` file                  | Full archive, contractor handoff                             | Requires user confirmation to download                   |
| Export as PDF                 | `.pdf`                        | Stakeholder review, sign-off, attaching to docs              | Static — no interactivity                                |
| Export as PPTX                | `.pptx`                       | PowerPoint / Keynote / Slides users                          | Best paired with Slide deck project type                 |
| Send to Canva                 | Canva design                  | Marketing / brand teams in Canva                             | Requires Canva account                                   |
| Export as standalone HTML     | Single `.html` file           | Hosting on a static site, embedding, sharing outside Claude  | One file — assets inlined                                |
| Handoff to Claude Code        | Claude Code task              | Engineering implementation                                   | Requires Claude Code access                              |

## Per the official docs

These additional handoff options are documented as supported (sometimes nested under "Handoff to Claude Code…"):

- Send to local coding agent
- Send to Claude Code Web

## What you cannot export to (yet)

- **Figma** — input only.
- **Sketch / Adobe XD / Principle / ProtoPie / Webflow / Framer** — no direct exports.
- **Custom domains / hosting** — no built-in hosting. Bring your own host with standalone HTML.

If a needed format is missing, the admin docs suggest contacting your Anthropic sales contact.

## Access controls cheat sheet

| Setting                  | Who can see / do what                                                    |
| ------------------------ | ------------------------------------------------------------------------ |
| Private (default)        | Only you.                                                                 |
| Teammates can view       | Anyone in the org with the link can view but not change.                 |
| Teammates can comment    | View + leave comments via Comment mode (separate from chat).              |
| Teammates can edit       | Full edit access — can chat with Claude inside the project.               |

Copy link respects whichever level is currently selected. There is no separate "anyone with the link" toggle — the link works only for people in your org at the chosen access level.

## Common user requests → suggested action

- **"Send this to my CEO for sign-off"** → Export as PDF; share the PDF directly.
- **"My eng team needs to build this"** → Handoff to Claude Code, or Download as .zip if they want to inspect source first.
- **"Make this a template we can reuse"** → Share → Duplicate as template.
- **"Put this in our Notion doc"** → Export as PDF (renders inline) or standalone HTML (link out).
- **"Hand this to our brand team in Canva"** → Send to Canva.
- **"Embed this on our marketing site"** → Export as standalone HTML; user hosts it.
- **"Try a different style without losing this one"** → Duplicate project, then iterate in the copy.
