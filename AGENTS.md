<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio project guidance

Before creating or modifying UI, consult both [`UI-BEST-PRACTICES.md`](UI-BEST-PRACTICES.md) for defensive layout rules and [`WF-BLOG-CLIENT-BEST-PRACTICES.md`](WF-BLOG-CLIENT-BEST-PRACTICES.md) for the evidence-based architecture audit. This file remains the operational instruction set for agents.

## UI skill gate

Before creating or modifying UI, also follow [`UI-SKILLS.md`](UI-SKILLS.md). For new UI, use `frontend-design` → `ui-ux-pro-max` → `web-design-guidelines` → `vercel-composition-patterns`. For existing UI, run `impeccable`'s `critique` first and finish complete work with `impeccable`'s `polish`. Use `distill` only for deliberate simplification, use exactly one tone operator (`bolder`, `quieter`, `delight`, or `high-end-visual-design`) when requested, and use `emil-design-eng` for motion review. Record which creation, review, and polish skills were invoked. Do not apply excluded mobile, canvas, or extraction workflows. These skills supplement the repository rules; they do not override this file or the two referenced UI standards.

## Project overview

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS v4 for styling
- `@/*` resolves to `src/*`

## Project structure

- `src/app/` contains routes, layouts, metadata, and page-level UI.
- `src/app/globals.css` contains global styles and Tailwind imports.
- `public/` contains static assets served from the site root.

## Implementation conventions

- Use TypeScript for application code and keep types explicit at public boundaries.
- Prefer Tailwind utility classes for component styling and keep global CSS limited to shared foundations.
- Use `next/image` for local or optimized images, with meaningful alternative text.
- Prefer semantic, accessible HTML and preserve keyboard and reduced-motion behavior.
- Use Server Components by default. Add `"use client"` only when browser APIs, event handlers, or client-side state are required.
- Before changing version-sensitive Next.js APIs, read the relevant documentation installed under `node_modules/next/dist/docs/` as required by the managed notice above.

## Development commands

```bash
npm run dev
npm run lint
npm run build
```

Run `npm run lint` and `npm run build` after meaningful UI or configuration changes.

## Defensive layout rules

- Use fluid, full-width containers with a sensible `max-w-*`; do not use arbitrary fixed widths for major structural containers.
- Keep `overflow-x-hidden` on the root shell as a safety net, and use `break-words` or `truncate` for dynamic text that may contain long unbroken values.
- Prefer `min-h-*` over fixed section heights so content can grow without collapse.
- Add `shrink-0` to icons, avatars, logos, and other flex children that must retain their size.
- Use only this z-index scale: `z-0` for page content, `z-10` for sticky navigation, `z-20` for dropdowns/popovers/tooltips, and `z-50` for modals/overlays. Do not invent arbitrary z-index values.
- Create stacking contexts intentionally with `relative` or `isolate`; keep layered UI inside its owning context.
- Let parent flex/grid containers own sibling spacing through `gap`; components must not add outer margins to position themselves.
- Prefer grid `auto-fit`/`minmax()` for resilient card collections and `@container` queries for reusable components whose layout depends on their parent width.
- Use the shared fluid `clamp()` tokens for display typography and keep prose constrained with `max-w-prose` or approximately `65ch`.
- Prefer logical CSS properties for directional custom CSS, explicit aspect ratios for media, and `contain-layout`/`contain-paint` when isolating complex regions is useful.
- Use the shared design tokens in `src/app/globals.css`; justify any exceptional arbitrary value locally rather than expanding the z-index scale.

## Component boundaries

- Components are layout-neutral boxes: they own internal layout, while parents own placement and outer spacing.
- Put reusable components in `src/components/` and shadcn-style primitives in `src/components/ui/`.
- Use `cn` from `@/lib/utils` when composing conditional Tailwind classes.
- Use shadcn/Radix primitives for future dialogs, menus, popovers, and other collision-sensitive interactions.
