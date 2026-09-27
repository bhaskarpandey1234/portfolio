# Defensive UI Best Practices

This guide is the human-readable reference for building resilient portfolio UI with Next.js and Tailwind CSS. Use it when designing, implementing, reviewing, or visually testing a component.

The rules marked **enforced** are currently supported by project code or lint configuration. Rules marked **guidance** must be applied during implementation and review until a dedicated automated check exists.

## 1. Overflow-safe layouts

### Rules

- Use `w-full` with a sensible `max-w-*` for structural containers. Do not use arbitrary fixed widths such as `w-[1200px]` for page shells or major sections.
- Keep `overflow-x-hidden` on the root shell as a final safety net against accidental horizontal scrolling. Do not use vertical `overflow-hidden` to conceal content that should be allowed to grow.
- Apply `break-words` to dynamic titles, URLs, identifiers, and other values that may contain long unbroken strings. Use `truncate` only when omission is intentional and the full value is available elsewhere.
- Prefer intrinsic sizing and `min-w-0` for flexible text columns so content can wrap instead of forcing its siblings wider.
- Prefer logical properties such as `margin-inline`, `padding-inline`, and `inset-inline-start` in custom CSS so layouts remain adaptable to RTL content.

### Example

```tsx
<section className="w-full max-w-5xl px-6 lg:px-16">
  <h2 className="max-w-prose break-words">{project.title}</h2>
</section>
```

### Review checklist

- [ ] No major structural container depends on an arbitrary fixed width.
- [ ] Root horizontal overflow protection is present.
- [ ] Dynamic text wraps or truncates intentionally.
- [ ] Flexible text children can shrink with `min-w-0` where needed.

## 2. Collapse prevention and space budgeting

### Rules

- Use `min-h-*` for substantial sections, especially hero and project sections. Avoid fixed heights that can clip growing content.
- Add `shrink-0` to icons, avatars, logos, and controls that must retain their dimensions inside flex layouts.
- Let the parent own space between siblings with `gap-*`. Reusable components must not add outer margins to position themselves.
- Use `max-w-prose` or approximately `65ch` for readable text blocks.
- Use `flex-wrap` when a row may not fit. Use `min-w-0` on text columns and `shrink-0` on protected controls.
- Reserve media space with `aspect-*` or explicit intrinsic dimensions before images and video load to prevent cumulative layout shift.

### Example

```tsx
<div className="flex flex-wrap items-center gap-4">
  <img className="size-10 shrink-0 rounded-full" src="/avatar.jpg" alt="Profile" />
  <p className="min-w-0 max-w-prose break-words">A description that can safely grow.</p>
</div>
```

### Review checklist

- [ ] Growing content cannot be clipped by a fixed section height.
- [ ] Important flex children cannot collapse.
- [ ] Sibling spacing is controlled by a parent gap.
- [ ] Images and video reserve their layout space.

## 3. Stacking and z-index

Use only this project-wide scale:

| Class | Meaning |
| --- | --- |
| `z-0` | Default page content |
| `z-10` | Sticky headers and navigation |
| `z-20` | Dropdowns, popovers, and tooltips |
| `z-50` | Modals and full-screen overlays |

### Rules

- Never invent values such as `z-999` or `z-[9999]`.
- Create stacking contexts intentionally with `relative` or `isolate` on the owning wrapper.
- Keep a layered component inside its own stacking context so children cannot unexpectedly escape and overlap unrelated UI.
- Use `fixed` and `absolute` only when the positioning relationship is explicit and the containing block is intentional.

### Review checklist

- [ ] Every z-index has one of the four approved meanings.
- [ ] Layered regions have an intentional positioned or isolated parent.
- [ ] No arbitrary z-index values exist.
- [ ] Overlays do not rely on accidental DOM order.

## 4. Token-driven styling

Every color, spacing value, display size, and z-index should come from a named design token whenever a suitable token exists. Avoid fragmented one-off values such as `top-[13px]`, custom hex colors in JSX, or arbitrary structural widths.

The current Tailwind v4 tokens live in [`src/app/globals.css`](src/app/globals.css) under `@theme inline` and include:

- `background`, `foreground`, `muted`, and `border` colors;
- `section` spacing based on `clamp()`;
- `fluid-h1` typography based on `clamp()`;
- content, navigation, popover, and modal z-index levels.

If an exceptional arbitrary value is genuinely required, keep it local, explain why it cannot be a token, and do not expand the z-index scale. The current lint setup warns about unnecessary arbitrary values but does not ban every valid Tailwind v4 arbitrary value.

### Review checklist

- [ ] Existing tokens were reused before adding a new value.
- [ ] No custom color or spacing value is duplicated across components.
- [ ] Exceptions are local and justified.
- [ ] Typography uses fluid tokens where the size must span viewports.

## 5. Layout-neutral component composition

Components should behave like predictable boxes:

- A component owns its internal layout and visual styling.
- Its parent owns placement, outer spacing, and relationship to siblings.
- Use layout primitives such as Stack, Cluster, and Grid patterns to express spacing through `gap`.
- Do not put `margin-right`, `margin-top`, or other directional outer spacing inside reusable buttons, cards, or content components.
- Use `cn` from [`src/lib/utils.ts`](src/lib/utils.ts) for conditional class composition.

### Example

```tsx
<div className="flex flex-col gap-6">
  <ProjectCard />
  <ProjectCard />
</div>
```

### Review checklist

- [ ] Removing or reordering a sibling does not leave a margin artifact.
- [ ] Reusable components do not assume a particular parent or page position.
- [ ] Layout responsibilities are visible in the parent structure.
- [ ] Conditional classes use `cn` when composition becomes non-trivial.

## 6. Responsive architecture

### Container queries

Use `@container` on a reusable component’s parent when the component should respond to the width available to it rather than the browser viewport. This allows the same card to work in a sidebar and a wide content grid.

```tsx
<div className="@container">
  <article className="flex flex-col gap-4 @md:flex-row">...</article>
</div>
```

### Grid auto-fit

For repeating cards, prefer a grid that mathematically fits available space instead of hardcoding a column count at breakpoints.

```tsx
<div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-6">
  {projects.map((project) => <ProjectCard key={project.id} {...project} />)}
</div>
```

### Fluid type and spacing

Use `clamp(min, preferred, max)` tokens for sizes that should scale continuously. This avoids abrupt breakpoint jumps and reduces awkward wrapping at intermediate widths.

### Review checklist

- [ ] Reusable components use container queries when parent width is the true constraint.
- [ ] Repeating cards use resilient grid tracks where appropriate.
- [ ] Flexible rows wrap instead of crushing children.
- [ ] Fluid tokens handle intermediate widths without breakpoint-only hacks.

## 7. Isolation, performance, and media stability

- Use `isolate` to create an independent stacking context for complex regions.
- Use `contain-layout` or `contain-paint` when a self-contained component should not affect or visually bleed into surrounding layout.
- Use `content-visibility: auto` only for appropriate off-screen, independent sections and ensure an intrinsic size is reserved when needed.
- Always provide image dimensions, `aspect-*`, or an equivalent placeholder before media loads.
- Preserve keyboard access, visible focus, semantic landmarks, and `prefers-reduced-motion` behavior when adding visual effects.

### Review checklist

- [ ] Complex regions have intentional containment boundaries.
- [ ] Off-screen optimization does not remove reserved layout space.
- [ ] Media cannot cause a layout jump when it loads.
- [ ] Accessibility and reduced-motion behavior remain intact.

## 8. Complex UI primitives

Use shadcn/Radix-style primitives for dialogs, menus, popovers, tooltips, and other collision-sensitive interactions. They provide tested portal, focus, keyboard, and viewport-boundary behavior.

Current project locations:

- Reusable components: `src/components/`
- UI primitives: `src/components/ui/`
- Class utility: `src/lib/utils.ts`
- shadcn configuration: `components.json`

Do not add a dependency for a primitive that the product does not yet need.

## 9. Current enforcement and validation

### Enforced today

- Tailwind class conflict and ordering checks through `eslint-plugin-tailwindcss`.
- Root/body horizontal overflow protection.
- Shared color, spacing, typography, and z-index tokens in `src/app/globals.css`.
- TypeScript checking through the project compiler configuration.
- Server Components by default through the Next.js App Router.

### Guidance requiring review

- Container queries and grid `auto-fit/minmax()` for new reusable collections.
- Parent-owned gaps and layout-neutral component boundaries.
- Logical properties, containment, and content-visibility decisions.
- Explicit aspect-ratio invariants for every media component.
- Avoiding arbitrary values beyond what the current lint rules can detect.

## Final visual QA checklist

Test every meaningful UI change at narrow mobile, intermediate tablet, and wide desktop widths:

- [ ] No horizontal scrollbar or clipped content.
- [ ] No section collapses to zero height.
- [ ] Text wraps without overlap or unreadable truncation.
- [ ] Images and icons retain their intended dimensions.
- [ ] Cards maintain consistent grid alignment.
- [ ] Sticky navigation, dropdowns, tooltips, and modals layer correctly.
- [ ] No unexpected overlap caused by positioning or z-index.
- [ ] Keyboard focus remains visible and usable.
- [ ] Reduced-motion preferences are respected.
- [ ] `npm run lint` passes.
- [ ] `npx tsc --noEmit` passes.
- [ ] `npm run build` passes, or any environment-only external font/network failure is documented.
