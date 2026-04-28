# Scripts — TypeScript helpers for agentic use of the Claude Design skill

Small, focused, dependency-free TypeScript utilities. Each script is **pure logic** — none of them call Chrome MCP, the Claude API, or any network. They take structured input, run a decision tree, and print structured output. The agent invokes them, reads the result, and acts on it.

## Running

```bash
# preferred: tsx via npx (no install)
npx tsx <script>.ts <args>

# or, if tsx is installed globally
tsx <script>.ts <args>

# or, if you have bun
bun run <script>.ts <args>
```

> **Cleanup note:** All scripts were verified end-to-end by installing `tsx` locally during build. That left a `node_modules/`, `package.json`, `package-lock.json`, and a few `*.ts.bak` files in this folder (the build sandbox couldn't delete them). They're listed in `.gitignore` so git will ignore them, but you can delete them outright with:
>
> ```bash
> rm -rf node_modules package.json package-lock.json *.ts.bak
> ```
>
> Future `npx tsx` invocations will re-fetch on demand.

All scripts:

- Parse CLI args using only Node's built-in `process.argv` (no external deps).
- Print to **stdout**: human-readable text by default; pass `--json` for machine-parseable JSON.
- Exit code `0` on success, `1` on usage error.
- Pass `--help` to any script for inline usage.

## What's here

| Script                   | Purpose                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `build-prompt.ts`        | Assemble a well-structured Claude Design prompt from goal/layout/content/audience/dimensions/palette.     |
| `validate-prompt.ts`     | Score an existing prompt against the four-part formula; report what's missing.                            |
| `pick-project-type.ts`   | Recommend a project type (Prototype + fidelity / Slide deck / From template / Other) for a deliverable.   |
| `pick-export.ts`         | Recommend a Share-menu export option from recipient + intent.                                             |
| `pick-model.ts`          | Recommend a model (Opus 4.7 / Sonnet 4.6 / Haiku 4.5 / etc.) by task phase and cost sensitivity.          |
| `triage-error.ts`        | Match an error symptom to its documented workaround.                                                      |
| `chrome-snippets.ts`     | Library of named JS snippets the agent can pass to `mcp__Claude_in_Chrome__javascript_tool` for state extraction. |

## Examples

```bash
# Build a prompt
npx tsx build-prompt.ts \
  --goal "executive dashboard" \
  --layout "3-col KPI strip on top, chart row below, table at the bottom" \
  --content "MRR, churn rate, NPS — each as a card with sparkline + delta" \
  --audience "CEO weekly review" \
  --dimensions "1440x900" \
  --palette "minimal monochrome with one warm accent" \
  --mode light --device desktop

# Validate a prompt
npx tsx validate-prompt.ts "Make a dashboard"
# → reports missing: layout, content, audience

# Pick the right project type
npx tsx pick-project-type.ts --deliverable "polished marketing landing page"

# Pick the right export
npx tsx pick-export.ts --recipient "CEO" --intent "sign-off"

# Pick a model
npx tsx pick-model.ts --phase iterate --complexity simple --cost low

# Triage an error
npx tsx triage-error.ts "comments aren't taking"

# List Chrome injection snippets
npx tsx chrome-snippets.ts list
npx tsx chrome-snippets.ts get extract-share-menu
```

## When to call which script

| You're about to…                                                                | Call                       |
| ------------------------------------------------------------------------------- | -------------------------- |
| Compose a prompt for the user                                                    | `build-prompt.ts`          |
| Send a user-supplied prompt straight through (sanity check)                       | `validate-prompt.ts`       |
| Pick from the four picker tabs                                                   | `pick-project-type.ts`     |
| The user asks for an export and you're not sure which                             | `pick-export.ts`           |
| The user wants to save credits or speed up iteration                              | `pick-model.ts`            |
| Something errored in the UI                                                      | `triage-error.ts`          |
| Need to read the model picker / share menu / file tree without clicking around    | `chrome-snippets.ts`       |
