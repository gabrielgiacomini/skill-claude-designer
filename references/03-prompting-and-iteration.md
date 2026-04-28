# Prompting and iteration

## Writing the first prompt

A good first prompt names four things:

1. **Goal** — what you're building ("a dashboard", "an onboarding flow", "a morning brief card").
2. **Layout** — how things should be arranged ("two columns", "4 screens", "hero + pricing + footer").
3. **Content** — what data or copy should appear ("monthly revenue with filters for region and product line"; "weather, 3 calendar events, 2 priority tasks").
4. **Audience / context** — who will see it / what device ("mobile", "internal ops team", "stakeholder review").

If you don't supply these, Claude will ask clarifying questions in chat — but you'll get a much better first generation if you front-load.

### Prompts that work well (from the official help center and the Examples gallery)

> "Create a dashboard showing monthly revenue with filters for region and product line."
>
> "Design a mobile app onboarding flow with 4 screens that walks users through our core features."
>
> "Build a landing page for our new API product with a hero section, code examples, and pricing."
>
> "Create a form for collecting customer feedback with conditional questions based on category."
>
> "Design an internal tool for our ops team to review and approve content submissions."
>
> "Create a sprite-based animation that gives fun facts about the distance and sizes of celestial bodies. Mix abstract animations using circles of various sizes as celestial bodies with text-based animation. Use a monochrome, helvetica palette."
>
> "Prototype a loading indicator that shows the globe spinning with real country outlines, full monochrome, no text, 200×200 centered on off-white background. Add a whirl effect around it."
>
> "On a responsive grid, animate 10 different text-streaming animations for a chat app; sample each one in a 300×300 cell; show a user question and stream a response below. Loop it. Monochrome."

Patterns to notice:
- They specify **dimensions** (200×200, 300×300, 360px wide).
- They specify **palette / aesthetic** ("monochrome", "off-white", "modern blue + orange").
- They request **multiples on one canvas** ("animate 10 different…", "20 simple, tasteful indeterminate loading indicators…on a wrapping grid"). This pairs well with how Claude Design defaults to producing variations.

## Adding context before you prompt

The "Start with context" panel offers four ways to seed Claude. The more you provide, the more the output looks like *your* product instead of a generic one.

- **Design System** — your org's design tokens, components, color, type. This is the single biggest lever.
- **Add screenshot** — drop in mockups, competitor screens, "make it look like this" references.
- **Attach codebase** — link a repo so Claude can read your real components and styling. Linking very large repos can lag — link a specific subdirectory rather than a whole monorepo.
- **Drag in a Figma file** — supports Figma exports.

The official tips: "Include real examples, not just specs. A finished landing page or marketing site tells Claude more about your brand's feel than a color palette alone." And: "Reference your design system. If you know a component exists in your brand's system, mention it by name."

## Iterating: the four interaction modes

Claude Design exposes four ways to push the design forward. Pick the one that matches the size and type of change.

| Mode        | Trigger                                                                                              | Best for                                                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Chat**    | Type into the prompt input on the left.                                                              | Big structural moves, aesthetic shifts, "show me 2–3 alternatives", explanations, design reviews, accessibility checks.            |
| **Comments**| Click the **Comment** button in the canvas top-right, then click anywhere on the canvas.              | Targeted, component-level changes ("make this button padding larger", "use the primary brand color here").                          |
| **Tweaks**  | Click **+ Tweaks** in the canvas top-right. A "Describe a tweak…" popover appears with an **Ideas** button. | Adding live, on-canvas controls (sliders/toggles) so *you* can play with values without re-prompting Claude every time.            |
| **Edit**    | Click **Edit** in the canvas top-right. A property panel docks on the right.                         | Direct property tweaks. Page-level shows Background / Font / Base size; selecting an element exposes its own properties.            |

### Comment mode — how it actually works

Click the **Comment** button (it turns orange when active), then click on a spot on the canvas. A popover appears with a textbox ("Describe the issue or suggestion…") and two buttons:

- **Comment** — saves the note as a discussion item for teammates (visible in the **Comments** tab on the chat side).
- **Send to Claude** — fires the comment off as an iteration request immediately.

Known issue from the docs: comments occasionally vanish before Claude reads them. Workaround: paste the same text into the chat box.

### Tweaks — the most underused mode

Tweaks ask Claude to add **interactive controls** to your design (sliders, toggles, color pickers, etc.). Once added, you can manipulate them yourself without round-tripping through Claude. The "Ideas" button asks Claude to suggest tweak controls that would be useful for the current design.

If you find yourself sending five iterations in a row about the same property ("a bit darker", "no, lighter", "try the warmer shade"), stop and ask for a Tweak instead.

### Saving a fork to try a different direction

There's no obvious "branch" UI. The official trick is just to ask:

> "Save what we have and try a completely different approach."

Claude will save your current state and confirm where it lives, so you can reference earlier iterations later in the conversation.

## Other behaviors worth knowing

- **Default behavior is variations.** A single prompt typically yields multiple stylistic variants on one canvas, grouped under section headlines. If you only want one, say so explicitly.
- **The chat title auto-renames** based on your first prompt (we saw "Morning Brief Card" appear after the first message).
- **A verifier agent runs after generation.** You'll see "Done, Fork verifier agent" and "Verifying…" — Claude double-checks its own output before declaring done.
- **Use a new chat tab on errors.** If you see "chat upstream error", click the `+` next to the Chat tab to start a fresh chat in the same project.
- **Compact view can trigger save errors.** Switch to full view if a save fails.

## Effective feedback (vs. ineffective feedback)

- ❌ "This doesn't look right."
- ✅ "Tighten the spacing between form fields to 8px."

- ❌ "Make it pop."
- ✅ "Use a single warm accent for the CTA — try amber/ochre — and increase the headline weight to bold."

- ❌ "Make it more accessible."
- ✅ "Audit this for WCAG AA contrast on the body text, and tell me which combinations fail."

The pattern: name the property, name the value (or the test), name the scope.

## Asking Claude to grade its own work

Claude Design is happy to review the design it just produced. Ask for:

- An **accessibility review** (contrast ratios, focus states, ARIA).
- An **information hierarchy review**.
- A **consistency review** against the design system ("which elements aren't using design-system tokens?").
- A **mobile/desktop responsiveness pass**.

The official docs put it well: "Treat it as a design collaborator, not just a generator."
