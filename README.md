# skill-claude-designer

A Claude skill for using **Claude Design** (https://claude.ai/design) — Anthropic Labs' research-preview web tool for prototypes, slide decks, microsites, and presentations — through a Claude agent.

The skill teaches a fresh agent how to operate Claude Design end-to-end: pick the right project type, compose a well-formed prompt, drive the canvas via Chrome MCP, iterate via Chat / Comments / Tweaks / Edit, choose the right export, and triage the research-preview rough edges.

## Why this exists

Claude Design produces excellent design output, but operating it from a Claude agent (e.g. via Cowork mode + the Claude-in-Chrome MCP) has gotchas: a non-obvious submit shortcut (`⌘+Return`, not Return), file-attachment surfaces that aren't drivable from automation, a canvas iframe that captures its own input, and exports that fall into three different categories (instant / Claude-generated / external). The skill encodes those gotchas plus a set of small TypeScript helpers that turn vague requests into concrete script calls.

## Quick install

Drop the skill folder into your Claude skills directory. Concretely:

```bash
# clone next to your other skills (adjust path for your platform)
git clone https://github.com/gabrielgiacomini/skill-claude-designer.git ~/.claude/skills/claude-designer

# the agent picks it up via the SKILL.md frontmatter "name" field
```

Or vendor the contents directly into your project's skills folder.

## Layout

```
.
├── SKILL.md                              ← entry point, with YAML frontmatter
├── references/                           ← topic docs the skill loads on demand
│   ├── 01-overview.md                    ← what Claude Design is, who it's for, models
│   ├── 02-ui-and-workflows.md            ← picker, project view, every project type
│   ├── 03-prompting-and-iteration.md     ← Chat vs. Comments vs. Tweaks vs. Edit
│   ├── 04-exports-and-sharing.md         ← Share menu, three export categories
│   ├── 05-design-systems-and-pricing.md  ← design system setup, plan allowances
│   ├── 06-known-issues.md                ← research-preview bugs and workarounds
│   ├── canvas-reference.md               ← every UI control catalogued
│   ├── export-decision-guide.md          ← pick the right export format
│   └── prompt-templates.md               ← reusable prompts by use case
└── scripts/                              ← TypeScript helpers for agentic use
    ├── README.md
    ├── build-prompt.ts                   ← assemble a well-formed prompt
    ├── validate-prompt.ts                ← score a prompt against the four-part formula
    ├── pick-project-type.ts              ← Prototype / Slide deck / Template / Other
    ├── pick-export.ts                    ← which Share-menu option, given recipient
    ├── pick-model.ts                     ← which Claude model, given task phase
    ├── triage-error.ts                   ← symptom → documented workaround
    └── chrome-snippets.ts                ← JS to inject via Chrome MCP javascript_tool
```

## How an agent actually uses this

The skill's trigger map at the top of [SKILL.md](./SKILL.md) maps user situations to script calls. Concretely:

| When this happens…                                                              | Run                                  |
| ------------------------------------------------------------------------------- | ------------------------------------ |
| About to compose a prompt                                                       | `build-prompt.ts`                    |
| About to forward a user-supplied prompt straight through                         | `validate-prompt.ts`                 |
| Need to pick from the four picker tabs                                           | `pick-project-type.ts`               |
| User asks for an export and you're not sure which                                | `pick-export.ts --recipient … --intent …` |
| User wants to save credits, or you're on iteration 3+                            | `pick-model.ts`                      |
| **Anything errored in the UI**                                                   | `triage-error.ts "<symptom>"` BEFORE asking the user |
| Need to read state from the page without clicking around                          | `chrome-snippets.ts get <name>` then pass to `javascript_tool` |

## Running the scripts

All scripts are pure-logic TypeScript — they take CLI input and emit JSON or human-readable text. No network, no Chrome MCP calls. The agent calls them, reads the output, then acts on it.

```bash
# preferred: tsx via npx
npx tsx scripts/<script>.ts <args>

# pass --json for machine-parseable output
npx tsx scripts/build-prompt.ts --goal "…" --layout "…" --content "…" --audience "…" --json

# pass --help to any script
npx tsx scripts/build-prompt.ts --help
```

See [scripts/README.md](./scripts/README.md) for full examples.

## What's been validated

The skill was built from a hands-on walk through the live tool, then exercised across four real Claude Design projects covering Chat-based iteration, Tweaks-based iteration, sibling-project context inheritance, and `.zip` exports. Findings from that exercise round-tripped back into the skill — see commit history.

## Caveats

- **Research preview.** Claude Design is in research preview. UI surfaces, model lists, and export options will shift. Re-verify before relying on a specific detail.
- **Cmd+Return submits.** Plain Return inserts a newline. The skill harps on this for a reason.
- **Three categories of "export."** `Download project as .zip` is an instant download (~5–50 KB). `Export as PDF` and `Export as standalone HTML` are sub-Claude generations that take 5–10 minutes and produce new files in the project. `Send to Canva` and `Handoff to Claude Code` push to external tools.
- **Cross-project context.** Mention a sibling project by name in the prompt and Claude Design will read its files for visual consistency. Undocumented, but reliable.
- **Cowork safety rules apply** when an agent operates Claude Design on a user's behalf: downloads need explicit user approval, sharing/access changes are off-limits.

## License

MIT — see [LICENSE](./LICENSE).

## Provenance

Built and validated on 2026-04-26 against Claude Design v(research preview), models Claude Opus 4.7 (default) / Sonnet 4.6 / Haiku 4.5 / and earlier. Cross-checked against the official help-center articles linked in [references/01-overview.md](./references/01-overview.md).

Issues, fixes, and prompt-pattern contributions welcome.
