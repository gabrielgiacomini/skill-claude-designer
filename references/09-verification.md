# Verification — checking the artifact actually delivers

Claiming "done" without inspecting the result is a guess, not a delivery. Claude Design has its own built-in verifier agent (you'll see "Done, Fork verifier agent" → "Verifying…" in the chat panel after generation), and that handles a lot of the basics — but it doesn't replace your responsibility to confirm the artifact actually serves the user's brief.

This file describes the verification you should do **after** Claude Design's verifier agent reports done, **before** telling the user the work is delivered.

## The verification loop (after Claude Design reports done)

1. **Confirm the canvas rendered the artboards described in chat.** Compare Claude's delivery message ("Delivered 3 artboards: A · …, B · …, C · …") against the file list in the Design Files panel. Missing files mean the run partially failed.
2. **Open the host HTML on the canvas.** Click into it and check it actually loads (not a blank canvas, not an error state).
3. **For multi-artboard canvases: pan/zoom and inspect each artboard.** Don't assume the visible portion is the whole result. Drag/scroll the canvas or hit the fit-to-screen control.
4. **Check the chat activity log for unfixed issues.** Claude's verifier agent often calls out problems — *"Now let me also fix the M2.7-pro tooltip overflow"* — and either fixes them (good) or flags them as deferred (you need to follow up). Read the last 5–10 chat messages.
5. **Click through at least one interactive element** if the deliverable claims interactivity (a tab strip, a hover state, an open tooltip). Don't assume the click handler works because "the chat said Tabs are functional."
6. **Open the host HTML standalone if you'll be exporting it.** `Download project as .zip`, unzip, and `open` the `.html` file in a real browser — `claude.ai/design`'s canvas iframe is forgiving in ways a vanilla browser is not. Read the console.

Only after these checks pass should you tell the user the artifact is delivered.

## What "console clean" means (when you do open standalone)

A clean console has:

- No `Failed to load resource: 404` entries — usually fonts, images, or external CSS.
- No red `Uncaught …` errors — JS or React mount failures.
- No React `Warning: Each child in a list should have a unique key` warnings — these cause silent reconciliation bugs.
- No CORS or CSP errors on font/image fetches.
- No mixed-content warnings (HTTP resources on an HTTPS page).

Yellow dev warnings about specific React patterns (deprecated APIs) are acceptable if behavior is fine. But any red error → fix it before claiming done, even if the page seems to render.

## Format-specific checks

### Slide decks (Slide deck project type)

- [ ] Prev/next arrows and keyboard nav both work
- [ ] Slide counter updates with each navigation
- [ ] Slide index persists (refresh → same slide)
- [ ] Letterboxes cleanly on viewports narrower than 1920px
- [ ] Body text ≥ 24px, headers ≥ 64px
- [ ] Speaker notes (if you toggled them on) visible in the right pane and in sync with slide index

### Interactive prototypes (Prototype → High fidelity)

- [ ] Primary flow advances end-to-end without console errors
- [ ] Form inputs accept text and update state visibly
- [ ] Hover / focus / active states defined (not just default browser styles)
- [ ] No `scrollIntoView` calls in the JSX (jarring on canvas iframes)
- [ ] Device frame (if used) matches the platform — iOS frame for iOS UI, etc.

### Hi-fi designs with multiple artboards on a canvas

- [ ] Each artboard has a clear label / section header
- [ ] Artboards are consistent in size unless variation is the point
- [ ] Canvas background doesn't fight with artboard backgrounds
- [ ] No overflow that crops content inside an artboard
- [ ] Variation count matches what the prompt asked for (don't accept 5 variants when you asked for 3, or vice versa)

### After an iteration (Chat / Comments / Tweaks / Edit)

- [ ] The change you asked for is visible in the canvas
- [ ] The change you DIDN'T ask for is *not* present (Claude sometimes "improves" things you didn't touch — read the diff)
- [ ] Iteration didn't regress the rest of the artboards (open them all)
- [ ] If the iteration added new components (e.g. Tweaks card), they're styled consistently with the rest of the artboard

## When verification fails — fix the root cause

If a check fails, fix the root cause via a fresh chat message, a Comment, or a Tweak. Don't:

- Ignore a missing artboard ("close enough — the chat said it shipped 3")
- Hide a broken element via Edit mode
- Skip the standalone-HTML console check because "the canvas looked fine"
- Accept a verifier agent's deferred TODO without acting on it

Each is a silent "I'll fix it later" that ships a brittle artifact.

## When the user asks for a mid-task check

If the user says *"can you screenshot and check the spacing on artboard 2"* or *"does the hover state work"*, don't wait to verify at the end — verify now, report back, continue. Targeted mid-task verification catches issues while context is fresh and is cheap (one snippet inject or one screenshot).

## Don't over-verify speculatively

Don't pan the canvas and screenshot every artboard for a one-line CSS iteration. Don't standalone-export and unzip for a tiny tooltip change. Match the check to the change:

- A local spacing edit needs a local visual check.
- A new tab strip needs a click-through.
- A whole-canvas regeneration needs the full pass above.
- An export-as-PDF needs the standalone-render check.

Over-verification wastes context and the user's patience. Under-verification ships broken work.

## Tooling notes

- The `chrome-snippets get is-generation-running` snippet (in `scripts/`) tells you whether Claude is still working — use it before claiming done.
- The Design Files panel + the canvas iframe are the in-tool verification surfaces. Both work.
- For deeper inspection, `Download project as .zip`, extract, and open the host `.html` in a regular browser tab — that's the truest test of whether the artifact stands alone.

---

*Adapted from the [`verification.md`](https://github.com/jiji262/claude-design-skill/blob/main/references/verification.md) reference in [jiji262/claude-design-skill](https://github.com/jiji262/claude-design-skill) (MIT). The original assumes the agent is producing HTML directly; this version is tuned for verifying Claude Design's canvas output and exports.*
