# Prompt templates by use case

Drop-in starting prompts for common Claude Design asks. Replace the `[bracketed]` placeholders with the user's real values, then send. All have been adapted from prompts the official docs and Examples gallery treat as exemplary.

## The four-part formula

Every effective prompt names: **goal**, **layout**, **content**, **audience / device**. Add **dimensions** and **palette** for sharper output.

If unsure, ask the user one clarifying question before generating — Claude Design is metered, and the cost of a wasted generation is real.

---

## Dashboard

```
Create a [analytics / ops / executive] dashboard for [audience].
Layout: [3-column KPI strip on top, chart row below, table below that].
Filters: [date range, region, product line].
KPIs to show: [active users, MRR, churn rate, NPS] — each as a card with current value, sparkline, and delta vs. last period.
Aesthetic: [clean and minimal / dense and information-rich / playful and colorful], [light/dark] mode, [our design system / monochrome / brand palette].
```

## Onboarding flow

```
Design an [iOS / Android / web] onboarding flow for [product, e.g. a bikesharing app].
[N] screens that walk users through [the core value prop, signing up, granting permissions, first action].
Layout: full-screen, centered illustration on top, copy below, primary CTA at the bottom.
Aesthetic: [color scheme], [typeface family if known], rounded corners, plenty of whitespace.
Show all screens side-by-side on the canvas so I can compare.
```

## Landing / marketing page

```
Build a landing page for [product]. Sections: hero (headline, subhead, primary CTA), three feature cards, code-or-demo block, social proof / logos strip, pricing comparison (3 tiers), FAQ accordion, footer.
Audience: [developers / SMB owners / enterprise buyers].
Tone: [authoritative / playful / minimal].
Use [our design system / a [color] + [color] modern palette].
Make sure it works at desktop and mobile widths.
```

## Settings / preferences screen

```
Design a settings screen for [product type]. Group settings under [General / Notifications / Privacy / Connected accounts / Billing].
Each row: label on the left, current value or control on the right, helper text underneath.
Style: [minimal, native-feeling / playful, branded].
Width: [600px / responsive].
[Light/dark] mode, [our design system / generic system].
```

## Form

```
Create a [customer feedback / contact / support / signup] form.
Fields: [name, email, category dropdown, free-text feedback]. Use conditional logic — show [follow-up question] only when [category = X].
Validation: inline, on blur, accessible error messages.
Submit button: [primary brand color], full-width on mobile.
Empty state if no input yet: [helpful placeholder copy].
```

## Internal tool

```
Design an internal tool for our [ops / support / moderation] team to [review and approve content submissions].
Layout: list view on the left (filterable by status, assignee, date), detail view on the right (the submission, its metadata, action buttons).
Bulk actions in the list view header.
Keyboard shortcuts: [J/K to navigate, A to approve, R to reject].
Density: high — these users live in this tool all day.
```

## Slide deck

```
Create a slide deck about [topic] for [audience], roughly [N] slides.
Structure: title slide, agenda, [3-5 main sections each with intro slide + supporting content], summary, Q&A.
Each content slide: clear headline, supporting visual on one side, 2-4 bullets on the other.
Aesthetic: [our design system / minimal monochrome / colorful and playful].
[If for a live presentation: also fill in speaker notes — toggle "Use speaker notes" before clicking Create.]
```

## Animation / motion piece

```
Create a [sprite-based / particle / shader / SVG] animation that [shows X / illustrates Y].
[Optional: use circles of various sizes as celestial bodies; mix abstract motion with text-based animation.]
Palette: [monochrome, helvetica / two-tone / brand].
Loop continuously.
Render area: [800×600 / full canvas].
```

## Loader / micro-interaction grid

```
Prototype [N] simple, tasteful indeterminate loading indicators that fit in a 200×200 space, on a wrapping grid.
All [black and white / brand-colored], no text.
[Optional: all should have an organic, blobby feeling / all geometric and crisp.]
Each labeled underneath with a one-word style name.
```

## Iridescent / fancy single component

```
Create a [monochromatic / branded] [card / button / badge].
Display it on the page with a rich perspective hover effect and glow.
The bright areas should be iridescent; subtle noise texture; specular glow that reacts to mouse position.
Add tweaks for as many aspects of this effect as you can.
```

> Note the explicit "**add tweaks for as many aspects … as you can**" — this primes Claude to populate the Tweaks panel with sliders/toggles, which lets you fiddle without re-prompting.

---

## Iteration prompts (after the first generation)

Pick the right tool first (Chat / Comments / Tweaks / Edit). For chat:

- "Show me 2-3 alternative layouts for the [V2] card."
- "Make the color scheme darker and more minimal."
- "Tighten the spacing between form fields to 8px throughout."
- "Audit this for WCAG AA contrast on body text — list every combination that fails."
- "Reduce the headline weight to medium and add a 4px letter-spacing."
- "Reorganize so the chart is on top, KPIs below — keep the filter bar where it is."
- "Save what we have and try a completely different approach — maybe editorial / magazine-style."
- "Replace the radio buttons in the [Notifications] section with a single multi-select dropdown."

For inline comments (click the canvas, then describe locally):

- "Make this button padding larger."
- "Use the primary brand color here."
- "Change this to a dropdown instead of radio buttons."
- "Make this section collapsible."

For Tweaks (when the user keeps fiddling with one property):

- "Add a slider for the corner radius from 0 to 24."
- "Add a color picker for the accent color."
- "Add a toggle for dark mode."
- "Add tweaks for as many parameters of this animation as you can."

## Asking Claude to grade its own work

- "Audit this design for accessibility (WCAG AA): contrast, focus states, keyboard nav, ARIA."
- "Check that every component on this page is using a token from our design system. List anything hardcoded."
- "Review the information hierarchy on the landing page — what's competing for attention?"
- "Stress-test this on mobile (375px) and tablet (768px). What breaks?"
- "Suggest 3 small changes that would meaningfully improve this design."

---

## Named style anchors — for when the brief is too vague

When the brief is too vague to execute (*"make a landing page"*, *"design something nice"*, *"I don't know what style I want"*), don't improvise on generic intuition — that's how AI-slop is born. Anchor on a named design language and tell Claude Design which one. Each anchor below is enough to commit to a system without further research.

For a vague brief: propose 2–3 from different schools to the user, let them pick, then drop into the picked anchor's specifics in the prompt.

### Structural modernism

**1. Swiss editorial** (Pentagram / Vignelli lineage)
- Feeling: precision, authority, editorial gravity. Keywords: *structural · monochrome · grid-disciplined · quiet*.
- Type: Neue Haas Grotesk / Helvetica Now / GT America / Söhne — one sans, 3–4 sizes, weight contrast via bold not color.
- Color: near-black on cream / off-white / structured greys; one saturated accent (red, blue, or yellow) used sparingly.
- Layout: strict grid, horizontal rules, generous negative space, numbered sections.
- Signature: oversized folio numerals, hairline rules, left-flush headlines, body columns at 12–14 char widths.
- Right for: editorial, B2B professional services, serious products, data-forward UIs.
- Avoid: gradients, drop shadows, 3D, blur.

**2. Bauhaus geometric** (Müller-Brockmann / Karel Martens lineage)
- Feeling: primary, architectural, confident. Keywords: *geometric · primary-color · flat · rhythmic*.
- Type: geometric sans (Futura, Avenir, PP Neue Montreal), large scale, sometimes rotated 90°.
- Color: primary red / blue / yellow on black or white; can push to fluorescent (#FF3C00, #0019FF, #F5E100).
- Layout: circles, squares, triangles as primary composition elements — not decoration.
- Signature: type-as-shape, giant circular composition anchors, bold diagonal rhythms.
- Right for: posters, arts programming, cultural identity work.
- Avoid: photography, 3D perspective.

### Quiet minimalism

**3. Kenya Hara emptiness** (MUJI / Hara lineage)
- Feeling: quiet, meditative, reverent. Keywords: *generous-whitespace · monochrome · patient · reduced*.
- Type: delicate serif (Tsukushi Mincho, Chronicle Text) OR a humanist sans at quiet sizes; never loud weights.
- Color: off-white dominant, single warm neutral or subtle natural color; never pure black — always warm ink or charcoal.
- Layout: ~70–80% negative space; tiny content islands; precise vertical rhythm.
- Signature: single object on infinite white, captions smaller than expected, faded grey page numbers.
- Right for: lifestyle, wellness, high-end product reveals, editorial retreats.
- Avoid: anything loud, saturated accents, more than 2 type sizes per layout.

**4. Dieter Rams industrial** (Braun / early Apple lineage)
- Feeling: useful, honest, restrained, quietly confident. Keywords: *honest · functional · neutral · timeless*.
- Type: utilitarian sans (Akzidenz-Grotesk, Helvetica) at modest sizes.
- Color: warm neutrals + one signal color (Braun orange, early-Apple aqua); never flashy.
- Layout: orthogonal, panel-aligned, unornamented; function decides the form.
- Signature: physical-product photography on neutral seamless, technical line drawings, monospace for specs.
- Right for: hardware product pages, industrial / B2B catalogs, design-history homages.
- Avoid: anything that prioritizes mood over utility.

### Editorial / publication

**5. Magazine editorial** (Wired / The Atlantic / Domus lineage)
- Feeling: long-form, considered, rich. Keywords: *typographic · serif-led · column-rich · captioned*.
- Type: serif display (Tiempos, Lyon, Domaine) + a clean sans for captions / metadata.
- Color: cream paper backgrounds, deep ink, occasional spot accent.
- Layout: 2–3 column body, generous pull quotes, deep captions, intentional figure-frame ratios.
- Signature: drop caps, pull quotes spanning gutters, photo + caption pairings.
- Right for: long-form articles, brand stories, annual reports, considered marketing pages.

**6. Zine / risograph** (artist-run small press)
- Feeling: tactile, hand-made, slightly off-register. Keywords: *limited-palette · halftone · printed · raw*.
- Type: chunky mono-display (Druk, Adieu, Untitled Sans), often paired with an unhinged hand font.
- Color: 2–3 punchy colors that look like spot inks (dayglo, saturated blue, ink black).
- Layout: split-screen, layered, intentionally misaligned by 1–2 px.
- Signature: halftone textures, paper noise, slight overlap-print color shifts.
- Right for: artist-led brands, limited drops, indie launches, type-led content.
- Avoid: corporate contexts where polish matters more than personality.

### Computational / experimental

**7. Field.io computational** (kinetic identity work)
- Feeling: alive, generative, technical. Keywords: *kinetic · technical · monochrome · WebGL*.
- Type: monospace and grotesque sans together; specs and IDs are part of the design.
- Color: high-contrast monochrome with one technical accent (cyan, hot pink, terminal green).
- Layout: layered, with WebGL or canvas elements that respond to scroll/cursor.
- Signature: shader gradients that look earned (not decorative), live data overlays, technical readouts.
- Right for: AI / ML companies, computational tools, art-tech, festivals.
- Avoid: contexts where audience can't render WebGL or shouldn't be distracted by motion.

**8. Brutalist web** (Read.cv / Are.na lineage)
- Feeling: raw, unornamented, intentionally awkward. Keywords: *system-font · default-styles · grid-broken · honest*.
- Type: literally Times New Roman, Arial, or system-ui — no design font at all.
- Color: one or two flat colors, often default browser blue links underlined.
- Layout: violates contemporary web convention deliberately — left-aligned, full-width text, no max-width.
- Signature: visible borders, default form controls, no hover states beyond cursor, no shadows.
- Right for: artist platforms, anti-corporate manifestos, "real internet" tools.
- Avoid: anywhere the audience expects polish.

### Maximalist / expressive

**9. Sagmeister expressive** (Sagmeister & Walsh lineage)
- Feeling: emotional, hand-touched, narrative-led. Keywords: *photographic · type-as-image · expressive · personal*.
- Type: photography of physical type (chalk, cake, sand, body) as headlines; clean sans for support.
- Color: high-contrast photographs are the color; minimal UI overlay.
- Layout: full-bleed photographic spreads with minimal interruption.
- Signature: handwritten annotations, props as type, body-and-place compositions.
- Right for: brand storytelling, identity launches, films, exhibitions.
- Avoid: data-heavy or utility products.

**10. Y2K futurism** (early-2000s revival)
- Feeling: glossy, optimistic-naive, plastic-shiny. Keywords: *chrome · gradient-glass · fisheye · saturated*.
- Type: rounded sans (Eurostile, Aktiv Grotesk Round) and the occasional glossy chrome script.
- Color: candy-saturated, chrome and glass surface treatments, dayglo accents (#FF00FF, #00FFFF).
- Layout: hero objects in 3D, fisheye-distorted compositions, marquee tickers.
- Signature: WebGL chrome materials, spinning glossy logos, lens-flare overlays.
- Right for: nostalgia-aware fashion / music / cultural launches.
- Avoid: serious contexts, accessibility-critical UIs (contrast often fails).

### How to use these in a Claude Design prompt

When you've picked a style, paste 4 things into your prompt:

1. The style name and one-sentence pitch (anchors Claude immediately).
2. The 3 keyword vibe (sets tone for variations).
3. The exact font and color specs from the entry above.
4. The "Avoid" line, transformed into a forbid-list.

Example, dropped into your prompt as the aesthetic block:

> *"**Style anchor: Swiss editorial** (Pentagram / Vignelli lineage). Vibe: structural · monochrome · grid-disciplined · quiet. Type: Söhne, three sizes only (72/32/16), weight contrast via bold. Color: near-black ink on cream (#F4EFE6); one accent — a saturated red (#D52B1E) used only for call-to-action buttons. Layout: strict 12-column grid, hairline rules between sections, oversized folio numerals starting each section, body columns at 14 char widths max. **Forbid:** gradients, drop shadows, 3D, blur, decorative icons, emoji."*

That paragraph alone — dropped into the `--palette` arg of `build-prompt.ts`, or pasted into the prompt — takes Claude Design from generic "modern web design" output to a specific committed system.

*Named-style framework adapted from [`design-styles.md`](https://github.com/jiji262/claude-design-skill/blob/main/references/design-styles.md) in [jiji262/claude-design-skill](https://github.com/jiji262/claude-design-skill) (MIT). The original includes a 10-page HTML gallery showing each style applied to identical content — see their `demos/style-gallery/` for visual reference.*
