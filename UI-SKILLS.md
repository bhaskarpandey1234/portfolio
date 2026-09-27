# Portfolio UI skills

This manifest records the UI skills installed for this repository and the routing rules for using them. The skills are procedural guidance only; they are not application runtime dependencies and do not override `AGENTS.md`, `UI-BEST-PRACTICES.md`, or the evidence-based [Workfall audit](WF-BLOG-CLIENT-BEST-PRACTICES.md).

The catalog and installation workflow are documented by [skills.sh](https://www.skills.sh/agent/codex) and its [Design & UI catalog](https://www.skills.sh/topic/design). The project-local copies are installed under `.agents/skills/` and pinned in [`skills-lock.json`](skills-lock.json).

## Installed skills

| Skill | Source repository | Purpose |
| --- | --- | --- |
| `frontend-design` | `https://github.com/anthropics/skills` | Establish distinctive, production-ready visual direction, typography, color, composition, and motion. |
| `ui-ux-pro-max` | `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill` | Searchable UI/UX reasoning for product surfaces, patterns, and implementation decisions. |
| `web-design-guidelines` | `https://github.com/vercel-labs/agent-skills` | Review an implementation against current web-interface, accessibility, and interaction guidance. |
| `vercel-composition-patterns` | `https://github.com/vercel-labs/agent-skills` | Apply React composition patterns and avoid brittle prop or component APIs. |
| `impeccable` | `https://github.com/pbakaus/impeccable` | Umbrella skill containing the `critique`, `polish`, `delight`, `distill`, `quieter`, and `bolder` operators. These operators are commands within one installed skill, not separate runtime packages. |
| `design-taste-frontend` | `https://github.com/Leonxlnx/taste-skill` | Audit visual direction and reduce generic, repetitive AI-generated portfolio patterns. |
| `high-end-visual-design` | `https://github.com/Leonxlnx/taste-skill` | Optional high-end visual direction when that tone is explicitly requested. |
| `emil-design-eng` | `https://github.com/emilkowalski/skills` | Review animation and interaction craftsmanship, including timing and reduced-motion behavior. |

## Mandatory routing

Before any UI work, read `AGENTS.md`, `UI-BEST-PRACTICES.md`, and `WF-BLOG-CLIENT-BEST-PRACTICES.md`. Then route the work as follows:

1. **New portfolio UI:** use `frontend-design` → `ui-ux-pro-max` → `web-design-guidelines` → `vercel-composition-patterns`.
2. **Existing UI review:** run `impeccable`'s `critique` first, then make targeted implementation fixes.
3. **Final visual pass:** run `impeccable`'s `polish` after the UI is functionally complete.
4. **Simplification:** run `impeccable`'s `distill` only when the interface is too complex or visually noisy.
5. **Tone adjustment:** invoke exactly one of `bolder`, `quieter`, `delight`, or `high-end-visual-design` when the requested direction calls for it. Do not combine contradictory style operators in one pass.
6. **Motion and interaction detail:** use `emil-design-eng` when adding or reviewing animation, hover states, transitions, or gesture-like interactions.
7. **Portfolio anti-slop review:** use `design-taste-frontend` while choosing the visual direction and auditing for generic AI patterns.

Record the creation, review, and polish skills used in the task's implementation notes or final handoff before the first portfolio UI implementation. If a route does not apply, record that it was intentionally skipped.

### Installation-task record

- Creation skills: not invoked; this task installed and documented skills without creating portfolio UI.
- Review skill: not invoked; no existing UI was changed in this task.
- Polish skill: not invoked; no visual implementation was completed in this task.
- Excluded workflows: extraction, mobile, and canvas were intentionally skipped.

## Explicit exclusions

Do not apply `extract-design-system`, mobile-app skills, or canvas-design skills to this workflow. This is a new web portfolio with no target public site to extract and no mobile or canvas deliverable. The exclusions prevent a mismatched workflow from being introduced accidentally.

## Project conventions

- Keep the skill set in `.agents/skills/` and its provenance in `skills-lock.json`; do not add these repositories to `package.json`.
- Treat `AGENTS.md` as the operational authority and `UI-BEST-PRACTICES.md` as the detailed defensive-layout standard.
- Keep server components as the default, use the `@/*` alias, and follow the approved token and z-index scales.
- New components belong in `src/components/`; reusable primitives belong in `src/components/ui/`.
- Review installed skill instructions before applying them. External skills run with agent permissions, so inspect their guidance and generated changes before accepting them.

## Enforcement status

The repository currently enforces the project baseline through TypeScript, ESLint, Tailwind v4 tokens, and the documented component/layout conventions. The skill routing above is an agent workflow gate and is not a replacement for linting or type checking. Rules that are documented as guidance remain subject to review until a corresponding code or lint check exists.
