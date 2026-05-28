# Design principles — how to avoid AI-slop in your prompts

Claude Design *will* produce gorgeous output if you ask for it well, and will produce instantly-recognizable AI-slop if you don't. This file is a checklist of anti-patterns to keep out of your prompts and a craft baseline to ask for in your prompts.

It applies whether you're writing a `build-prompt.ts` invocation by hand or composing a follow-up iteration in chat.

## Anti-slop rules — patterns to keep out of your prompts

These are the patterns that instantly date a design as "AI made this." Either explicitly forbid them in your prompt or ask for the alternative directly.

**No aggressive gradient backgrounds.** Especially not purple-to-blue, sunset, or conic rainbows. If you need a background with visual interest, ask for: *"a solid brand color"*, *"a subtle single-hue gradient (≤10° hue variance)"*, *"a muted texture"*, or *"a full-bleed photograph"*. Decorative gradients are the single most-generated tell.

**No emoji unless the brand uses them.** Emoji in headlines or as bullet markers is a tell. If the brand's real comms don't use emoji, say so in your prompt: *"no emoji anywhere — use real icons or labeled placeholders for missing assets."*

**No rounded-corner cards with a left-border accent stripe.** Especially paired with a muted icon and a gradient background. This is the most-generated "dashboard card" in the world. If you're asking for a dashboard or feature callout, name a different container metaphor: *"a full-bleed panel"*, *"a numbered sequence"*, *"a framed cell"*, *"a hand-drawn outline"*, *"a ticket / receipt shape"*, *"an overlapping duo"* — whatever the brand suggests.

**No SVG-drawn imagery as a substitute for real assets.** Don't ask Claude Design to SVG-draw a hero illustration, a product screenshot, a portrait, or a 3D object. Drawing "the product" in SVG always looks like a diagram, not a product. Ask for placeholders instead: *"`[hero: product running in browser, 1400×900]`"* and provide real materials via the brand-asset gathering step.

**No CSS silhouettes standing in for real product shots.** A common Claude Design failure: asking for a launch animation or hero for a physical product (a phone, a camera, a headset) and ending up with a CSS-drawn silhouette or gradient-filled shape. This is the *exact* signature of "generic AI tech animation" — every brand ends up looking the same because no brand actually shows up. Either provide the real product render in your prompt context, or ask for a labeled placeholder explicitly.

**No decorative gradient orbs "representing AI".** The floating purple-to-pink gradient orb as a stand-in for "AI magic" is the single most over-used signifier in contemporary tech design. If your concept calls for "AI", ask for a less-worn metaphor: a diagram, a waveform, a specific product surface, a typeset word.

**No overused font stacks.** Inter, Roboto, Arial, system-ui, Fraunces, and the other defaults are rarely the right answer. If you have a brand font, name it in your prompt. If you have free range, name a deliberate pairing: *"JetBrains Mono + Söhne"*, *"Tiempos + Inter Display"*, *"PP Neue Montreal + Commit Mono"*, *"IBM Plex Sans + Plex Serif"* — and commit. If you don't know good pairings, ask the user or anchor on a reference brand's system.

**No decoration-by-dataviz.** Fake stats, invented numbers, decorative charts that don't represent anything — these are slop, not design. If your prompt mentions stats, either give the real numbers or be explicit they're placeholders to be replaced.

**No "3-column feature grid" as the default page structure.** The landing-page pattern of *hero → three-column feature grid → testimonials → CTA* is the pre-trained path of least resistance. When asking for a landing page, consider naming a different structure: *"a single-column editorial narrative"*, *"a comparison table"*, *"a full-bleed product demo"*, *"a stacked case-study format"*, *"an interactive exploration"*. Three-column is sometimes right — but pick it because it fits, not because it's the default.

**No over-iconified bullet lists.** Bullet lists with an icon per item (often a pastel circle with a tiny symbol) rarely add clarity — they add noise. Ask for a plain bullet list or a numbered list unless the icons carry real signal (e.g., file-type indicators).

## Craft rules — what to ask for instead

**Commit to a system in the prompt itself.** State (in your prompt) the type scale, the 1–2 background colors, the layout rhythm, the section-header pattern. Examples:

- *"Type scale: 72/48/32/20/16/13 — use those exact sizes only."*
- *"Two backgrounds across the system: #0E1014 base for body sections, #1A1D24 for elevated panels. Pick one accent (amber #E8B547) and use it only for primary CTAs and the active sidebar item."*
- *"Spacing grid: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64. No 28px just because it 'feels right'."*

A coherent system in the prompt makes Claude Design's output coherent on the canvas.

**Scale floors are real:**
- Slides at 1920×1080: body text ≥ 24px, headers much larger. 12px is illegible from the back of a room.
- Print: ≥ 12pt body.
- Mobile: hit targets ≥ 44px × 44px. Hairlines at <1px don't render reliably on subpixel devices.

If the deliverable is a slide deck or a mobile prototype, write the floors into your prompt.

**Ask for modern CSS where it pays.** When asking for typography polish or layout, mention:
- `text-wrap: pretty` and `text-wrap: balance` — instant typographic polish on headlines.
- CSS Grid + `subgrid` — real layouts without wrapper hell.
- `oklch()` — derive harmonious color variants without inventing new hues.
- Container queries — variants that respond to their container, not the viewport.
- `view-timeline` and `animation-timeline: scroll()` — scroll-driven motion without JS.

You don't have to specify the implementation, but mentioning the *result* you want ("balanced headline wrapping", "scroll-driven hero reveal") gives Claude Design permission to reach for these.

**Color from existing brand / system first.** If a brand doc or token file exists, paste those exact hex values into the prompt. If you need a derived color, mention `oklch()` so Claude can keep it harmonious. Don't invent colors from thin air — you'll get discordant palettes.

**Placeholders beat fakes.** If you don't have an icon, a logo, a headshot, a product screenshot, or a chart — say so in the prompt: *"draw labeled placeholders, do not invent a logo"*, *"hero spot is a `[product photo placeholder, 1400×900]` — I'll provide the real shot later"*. Claude Design will respect this and the artifact stays honest.

**Use visual rhythm.** Tell Claude how the artifact reads top-to-bottom: alternate heavy and light sections; give full-bleed imagery room to breathe; use 1–2 background colors so different backgrounds *mean something*. Silence between sections is a design tool — name it.

## Content rules — what NOT to add

These are the rules designers forget and copywriters never would. Bake them into your prompt as guardrails.

**No filler content.** Forbid in your prompt:
- Dummy sections ("Our values", "Why choose us", "Team section" when the user didn't ask)
- Placeholder paragraphs beyond what's needed to show layout
- Decorative stats / numbers / icons with no meaning ("data slop")
- "Testimonial" sections without real testimonials
- Feature grids to fill the middle of a landing page

If a section feels empty, that's a design problem — solve it with composition, scale, full-bleed imagery, intentional negative space, or a bigger hero. Not with invented content.

**One thousand no's for every yes.** Before asking Claude Design to add something, ask yourself: is this here because it's needed, or because the layout looked sparse? If the latter — instead of adding, ask to make existing content bigger, bolder, or rebalanced.

**Use the user's voice.** If they gave you copy, paste it verbatim into your prompt. If you're writing placeholder copy, match the register the user used in the brief. Don't let Claude Design invent slick marketing-speak for a technical product (or vice versa).

## How to encode these in `build-prompt.ts`

The `build-prompt.ts` helper takes structured input — you can express these principles as fields:

- `--palette "monochrome with one warm accent (#E8B547), no gradients, no orbs"`
- `--content "<actual user copy here, no invented testimonials, no decorative stats>"`
- `--layout "single-column editorial narrative — NOT three-column feature grid"`

For things the helper doesn't directly model (e.g., "no rounded-corner-with-left-stripe cards"), put them in `--layout` or append after invoking the helper.

## Final gut check before sending the Claude Design prompt

Before you `⌘+Return`, skim your prompt as if you've never seen it and ask:

- Does this prompt force a specific point of view, or did I hedge every decision?
- Have I named at least one anti-pattern to forbid?
- Have I named exactly which colors / fonts / spacing values to use, not just "modern" or "polished"?
- Is there one memorable thing the artifact will have, or is this a checklist?

If the answer to any of these is "generic," rebalance: pick the bolder color, commit to the heavier type weight, name the hero shape, remove the safe fallback.

A distinctive imperfect artifact beats a "safe" forgettable one. Claude Design optimizes for what you ask for — ask for opinion.

---

*Adapted from the [`design-principles.md`](https://github.com/jiji262/claude-design-skill/blob/main/references/design-principles.md) reference in [jiji262/claude-design-skill](https://github.com/jiji262/claude-design-skill) (MIT). The original targets HTML-direct artifact generation; this version is tuned for prompts you send to Claude Design.*
