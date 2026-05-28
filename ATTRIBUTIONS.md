# Attributions

This skill draws materially on prior work by other authors. All adapted material is licensed MIT (matching this skill's license) and is attributed in-place at the bottom of each adapted file as well as listed here.

## Adapted from [jiji262/claude-design-skill](https://github.com/jiji262/claude-design-skill) (MIT, 2026)

A craft-focused Claude skill for producing design artifacts in HTML directly. Their skill and this one are complementary — theirs is about *what makes a good design*, ours is about *how to operate Claude Design as an agent*. We owe most of the craft layer to them.

| Their file | Our file | What we adapted |
| --- | --- | --- |
| [`references/fact-verification.md`](https://github.com/jiji262/claude-design-skill/blob/main/references/fact-verification.md) | [`references/fact-verification.md`](./references/fact-verification.md) | The Priority 0 search-before-you-assume rule, forbidden phrasings, security warnings about untrusted web content, and the `product-facts.md` template. Tuned for the operating-Claude-Design context (where wrong premises waste a 5-minute generation slot). |
| [`references/design-principles.md`](https://github.com/jiji262/claude-design-skill/blob/main/references/design-principles.md) | [`references/design-principles.md`](./references/design-principles.md) | Anti-slop rules (no gradients, no emoji bullets, no rounded-corner cards with left-border accent stripe, no CSS silhouettes, no decorative gradient orbs, etc.), the craft baseline (modern CSS, scale floors, color from system, placeholders beat fakes), and the content rules (no filler, one-thousand-no's, use the user's voice). Adapted to "what to ask for in a Claude Design prompt." |
| [`references/verification.md`](https://github.com/jiji262/claude-design-skill/blob/main/references/verification.md) | [`references/verification.md`](./references/verification.md) | The post-render checklist (browser load, console clean, viewport scale, click flow, font loading), the format-specific checks (decks, prototypes, animations), and the fail-fix-don't-hide rule. Adapted to verify Claude Design's canvas output and exports. |
| [`references/brand-context.md`](https://github.com/jiji262/claude-design-skill/blob/main/references/brand-context.md) | New section *Brand-asset gathering — the Core Asset Protocol* in [`references/prompting-and-iteration.md`](./references/prompting-and-iteration.md) | The 5-step protocol (Ask / Search / Acquire / Verify / Freeze), the assets > specifications philosophy, the asset weight table, the 5-10-2-8 quality threshold, and the `brand-spec.md` template. Adapted to "context to gather *before* opening Claude Design." |
| [`references/design-styles.md`](https://github.com/jiji262/claude-design-skill/blob/main/references/design-styles.md) | New section *Named style anchors* in [`references/prompt-templates.md`](./references/prompt-templates.md) | The 10 named style anchors (Swiss editorial, Bauhaus geometric, Hara emptiness, Dieter Rams, Magazine editorial, Zine/risograph, Field.io computational, Brutalist web, Sagmeister expressive, Y2K futurism), each with feeling/keywords/type/color/layout/signature/right-for/avoid fields. Adapted to "paste this into your Claude Design prompt." We did not port the 10-page HTML gallery — see their `demos/style-gallery/` for that. |
| Their SKILL.md "Priority #0", "The workflow", and overall craft framing | Our [`SKILL.md`](./SKILL.md) — the new Priority 0 block and the 8-step workflow at the top | Front-loading craft and verification *before* tool mechanics. Their structural choice was the right one. |

## Things we did not port

- **`Claude-Design-Sys-Prompt.txt`** — author-specific system prompt scaffolding. Out of scope.
- **`assets/` (deck-stage.html, prototype-shell.html, tweaks-starter.html, animations.jsx)** — these are skill-internal HTML scaffolds for an agent producing HTML directly. Our skill routes the user to claude.ai/design which generates its own HTML, so the scaffolds don't fit the model.
- **`demos/style-gallery/`** (10 HTML pages applying each named style to identical content) — heavy commitment, deferred. Linked from the prompt-templates entry instead.
- **`references/react-babel.md`** — implementation-deep, off-mission for our agent-operation focus.
- **`references/output-formats.md`** — overlaps materially with our `exports-and-sharing.md`.
- **`test-prompts.json`** — useful pattern, deferred until our own regression-testing workflow is mature.
- **README.zh.md** — Chinese translation of README. Deferred until adoption justifies translation maintenance.

## License

The adapted material remains MIT. Both the original ([jiji262/claude-design-skill](https://github.com/jiji262/claude-design-skill/blob/main/LICENSE)) and this skill ([LICENSE](./LICENSE)) are MIT. No license incompatibility.

## Reverse direction — what we contribute that's new

For completeness, the parts of this skill that are not adapted from the inspiration repo:

- The **Script trigger map** at the top of SKILL.md (task → helper-script dispatch table).
- All seven **TypeScript helper scripts** (`build-prompt.ts`, `validate-prompt.ts`, `pick-project-type.ts`, `pick-export.ts`, `pick-model.ts`, `triage-error.ts`, `chrome-snippets.ts`) and their JSON output schema.
- The **access-state diagnostics** (signed-in vs. plan-ineligible vs. page-slow disambiguation).
- The **Claude Design–specific UI map** (picker, chat panel, canvas tools, file structure, export menu) in `references/ui-and-workflows.md` and `references/canvas-reference.md`.
- The **three-category export distinction** (instant `.zip` download vs. Claude-generated PDF/HTML vs. external destinations) in `references/exports-and-sharing.md`.
- The **known-issues catalog with confirmed workarounds** in `references/known-issues.md` (e.g., comments-vanish, save-error-compact, chat-upstream-error, monorepo-lag).
- The **Cmd+Return platform-shortcut note** and the **Cowork-mode safety-rule cross-references** (download approval, sharing prohibition).
- The **cross-project context inheritance** finding (mention a sibling project by name → Claude Design reads its files for visual consistency) — observed in our multi-project run.

## How to add new attributions

If you add adapted material from another source, append a row to the relevant table above and add an attribution footer to the adapted file. The footer pattern is:

```
*Adapted from [`<filename>`](<source-url>) in [<repo>](<repo-url>) (<license>). Notes on tuning: <one sentence>.*
```
