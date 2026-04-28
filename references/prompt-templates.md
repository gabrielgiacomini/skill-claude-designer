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
