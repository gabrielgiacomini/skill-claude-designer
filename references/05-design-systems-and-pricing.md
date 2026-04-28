# Design systems, pricing, and admin

## Design systems — the most important thing to set up first

Without a design system, Claude Design produces functional but generic output. With one, every project an org member creates automatically inherits brand colors, typography, components, and layout patterns. Setup is a one-time job per organization.

### Who should set it up

The official admin guide recommends pulling in **designers from both brand and product** — together they cover both visual identity and product UI patterns.

Setting up a design system is gated by **a separate permission** from general Claude Design access. This lets admins grant editing rights to a small group of trusted designers while still rolling broad feature access out to the rest of the company.

### How to set it up (live steps)

1. Open https://claude.ai/design.
2. In the **lower-left** of the project picker, click the current organization name and confirm you're on the right org (or create a new one).
3. You'll be redirected into the design-system onboarding flow.
4. Upload source material — at least one of:
   - A **codebase** (e.g. a React component library) — link or upload the repo. Claude reads components and styles directly.
   - **Prototypes** — screenshots, web flows, existing design files.
   - **Slide decks or documents** that reflect the brand (a well-designed PDF or PPTX is enough — Claude pulls colors, type, and layout patterns from it).
   - **Individual assets** — logos, color palette files, typography specimens.
5. Claude analyzes the material and generates a design system: color palette, typography, components (buttons, cards, nav, etc.), and layout patterns.
6. Validate it by spinning up a test project (e.g. "Create a landing page for [your product]") and check that the output matches expectations.
7. **Flip the "Published" toggle on** — this is the step that makes the system live for everyone in the org. Until you publish, projects fall back to the default system.

### Updating it later

In Design systems → click **Open** next to the system → click **Remix** in the upper right. That opens the chat interface so you can ask Claude to change the system.

## Recommended rollout (Team / Enterprise)

The admin guide lays out a phased plan:

- **Phase 1 — Design system setup.** 2–4 trusted designers/leads. Goal: build and validate the system.
- **Phase 2 — Design team onboarding.** Full design team. Goal: stress-test the system across real projects.
- **Phase 3 — Product and UX.** PMs, UX researchers, adjacent functions. Goal: faster prototyping and design collaboration.
- **Phase 4 — Broader org / specific departments.** Goal: design creation available widely while keeping brand consistent.

Use **custom roles (RBAC)** to gate access per phase rather than turning the org-wide toggle on too early.

## Plan-by-plan availability and limits

Claude Design is **priced and metered separately** from chat and Claude Code — its usage never draws from those buckets. Each user gets their own bucket; allowances are not pooled at the org level.

### Individual plans

| Plan        | Allowance shape                                                | Who it's positioned for                                    |
| ----------- | -------------------------------------------------------------- | ---------------------------------------------------------- |
| Pro         | Recurring weekly allowance (resets every 7 days). Extra usage purchasable. | Quick explorations, one-off use.                          |
| Max 5×      | Recurring weekly, larger.                                       | Semi-regular use — PMs and engineers producing regular mock-ups. |
| Max 20×     | Recurring weekly, largest individual tier.                      | Power users — designers and creatives.                     |

### Team plan

| Seat type | Allowance shape                                            | Who it's for                                       |
| --------- | ---------------------------------------------------------- | -------------------------------------------------- |
| Standard  | Per-seat recurring weekly allowance.                        | Quick explorations, one-off use.                   |
| Premium   | Per-seat recurring weekly, larger.                          | Power users — designers and creatives.             |

Admins can purchase extra usage on top.

### Enterprise — legacy seat-based

| Seat type | Allowance shape                                            | Who it's for                                       |
| --------- | ---------------------------------------------------------- | -------------------------------------------------- |
| Standard  | Per-seat recurring weekly.                                  | Semi-regular use — PMs and engineers.              |
| Premium   | Per-seat recurring weekly, larger.                          | Power users — designers and creatives.             |

### Enterprise — usage-based

Bills at standard API rates under your existing agreement. Anthropic is offering a one-time getting-started credit per user — roughly 20 typical prompts — that **expires July 17, 2026**. The credit is consumed first.

### Important framing

The weekly allowances are described as "**beta-period rate limits**" — they're ongoing, but Anthropic reserves the right to change them. Don't anchor a long-term workflow on the exact size of today's bucket.

## Admin enable / disable

For Team and Enterprise plan admins:

1. Go to **Organization settings → Capabilities**.
2. Find the **Claude Design toggle under Anthropic Labs** and switch it on.
3. (Recommended) **Set up the design system before broad rollout** — otherwise teams get generic-looking output.
4. (Recommended) Use **custom roles** to control access by phase as you roll it out.

Default-off for Enterprise plans.

## What admins don't get yet

- **No audit logs** for Claude Design activity.
- **No usage analytics dashboard** — admins should track adoption qualitatively (check-ins, sample reviews, feedback channel).
- **No data residency** controls.

Uploaded assets fall under the same data retention and deletion policies as other Anthropic enterprise products and are stored persistently.

## FAQ snippets worth memorizing

- "**Do all team members need to upload brand assets?**" — No. Once one designer publishes the design system, everyone's projects automatically use it.
- "**Can we have multiple design systems for different brands or sub-teams?**" — Yes.
- "**How many users can we onboard at once?**" — No strict limits, but the phased rollout exists for quality reasons.
- "**Can we restrict it to specific departments?**" — Yes, via RBAC custom roles.
