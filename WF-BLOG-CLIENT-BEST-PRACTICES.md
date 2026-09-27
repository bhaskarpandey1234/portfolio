# `wf-blog-client` Best-Practices Audit

This document records reusable practices observed in the reference project at:

`C:\Users\bhask\Projects\workfall\wf-blog-client`

It is an evidence-based audit, not a claim that every implementation detail in that project should be copied. The portfolio’s stricter defensive-layout rules remain authoritative; see [`UI-BEST-PRACTICES.md`](UI-BEST-PRACTICES.md).

## Reference stack

The project uses:

- Next.js 15.3.4 with the App Router and React 19.
- TypeScript with strict mode and the `@/*` alias to `src/*`.
- Tailwind CSS v4 through `@tailwindcss/postcss`.
- shadcn-style components backed by Radix UI primitives.
- `class-variance-authority`, `clsx`, and `tailwind-merge` for typed variants and class composition.
- Framer Motion for component animation.
- Lucide React and React Icons for iconography.
- Embla Carousel with autoplay for carousel interactions.

Evidence: `package.json`, `tsconfig.json`, `components.json`, and `postcss.config.mjs`.

## Practices worth adopting

### 1. App Router organization

The project uses route groups to organize page families without changing URL paths:

- `src/app/(pages)/articles/page.tsx`
- `src/app/(pages)/articles/[slug]/page.tsx`
- `src/app/(pages)/events/page.tsx`
- `src/app/(pages)/topics/[category]/page.tsx`

Dynamic segments make content routes explicit, while the shared `src/app/layout.tsx` owns fonts, metadata, navigation, and the footer. `src/app/not-found.tsx` provides a branded fallback instead of relying on the framework default.

Adopt in the portfolio:

- [ ] Group related routes with route groups when the route hierarchy grows.
- [ ] Keep site-wide shell concerns in `src/app/layout.tsx`.
- [ ] Add route-specific `not-found.tsx`, `loading.tsx`, or `error.tsx` files when a route needs custom states.
- [ ] Keep dynamic route parameters typed and validated at the route boundary.

### 2. Feature-oriented component structure

The project separates components by responsibility:

- `src/components/Layout/` contains the navbar, mobile navigation, and footer.
- `src/components/modules/` contains page-specific feature sections such as Home, Articles, Events, Topics, and TechNews.
- `src/components/common/` contains reusable content cards, pagination, forms, animation helpers, and shared data.
- `src/components/ui/` contains low-level primitives such as buttons, inputs, selects, tabs, popovers, and navigation menus.

This makes page composition easy to scan. For example, `src/app/page.tsx` composes `Hero`, `InsightfulReads`, `CustomerWins`, `Projects`, and `NewsletterSignUp` instead of owning all markup itself.

Adopt in the portfolio:

- [ ] Keep `src/components/ui/` for reusable primitives.
- [ ] Use feature or module folders for substantial page sections.
- [ ] Keep the root route focused on composition rather than implementation details.
- [ ] Keep global layout components separate from page modules.

### 3. Server/client boundaries

Most route pages are server components by default. Interactive components explicitly opt into the client runtime:

- `src/components/Layout/Navbar.tsx` uses client state and `useRouter` for search.
- `src/components/Layout/MobileNaveMenu.tsx` uses state, pathname inspection, and browser scroll locking.
- `src/app/(pages)/search/page.tsx` uses search params, state, effects, memoized filtering, and pagination.
- `src/components/ui/popover.tsx`, `select.tsx`, and `tabs.tsx` wrap interactive Radix primitives.

Adopt in the portfolio:

- [ ] Keep Server Components as the default.
- [ ] Add `"use client"` only for state, effects, event handlers, browser APIs, or client-only libraries.
- [ ] Keep client boundaries as low in the tree as practical.
- [ ] Pass serializable data into client components instead of moving entire pages to the client.

### 4. Semantic Tailwind design tokens

`src/app/globals.css` defines semantic CSS variables for background, foreground, card, popover, primary, secondary, muted, accent, border, input, ring, destructive, charts, sidebar colors, and radii. The `@theme inline` block exposes those variables as Tailwind utilities such as `bg-primary`, `text-muted-foreground`, `border-border`, and `bg-popover`.

The `.dark` token set changes values without requiring component markup to be rewritten. Radius tokens are derived from one `--radius` value, keeping control shapes consistent.

Adopt in the portfolio:

- [ ] Define semantic tokens in `src/app/globals.css` rather than scattering color literals through JSX.
- [ ] Expose tokens through Tailwind’s `@theme` block.
- [ ] Keep light/dark values behind the same semantic names.
- [ ] Derive related radius values from one base token.
- [ ] Preserve the portfolio’s fluid spacing, typography, and z-index tokens.

### 5. Primitive components with Radix and shadcn conventions

The UI layer wraps Radix primitives instead of repeating accessibility and positioning behavior in every feature:

- `src/components/ui/button.tsx` uses Radix Slot and CVA.
- `src/components/ui/navigation-menu.tsx` uses Radix Navigation Menu.
- `src/components/ui/popover.tsx` uses a Radix Portal and collision-aware content.
- `src/components/ui/select.tsx` uses Radix Select with a popper-positioned content layer.
- `src/components/ui/tabs.tsx` uses Radix Tabs.

The wrappers add project styling, data-slot attributes, variants, and `cn()` composition while preserving the primitive APIs.

Adopt in the portfolio:

- [ ] Use Radix/shadcn primitives for dialogs, popovers, menus, selects, and tabs.
- [ ] Keep primitive APIs typed from the underlying Radix component props.
- [ ] Keep focus, keyboard, portal, and collision behavior inside the primitive wrapper.
- [ ] Keep feature components responsible for content and state, not low-level interaction mechanics.

### 6. `cn()` and CVA for component APIs

`src/lib/utils.ts` centralizes class composition:

```ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

`src/components/ui/button.tsx` uses `cva()` to define typed `variant` and `size` options, while allowing a caller-provided `className` to merge predictably.

Adopt in the portfolio:

- [ ] Use `cn()` for conditional or overrideable class names.
- [ ] Use CVA when a component has a stable set of visual variants.
- [ ] Keep variants typed and define sensible defaults.
- [ ] Avoid string concatenation that can leave contradictory utilities active.

### 7. Typed data and component boundaries

`src/app/types/posts.ts` defines shared content models such as `BlogPostData`, `PosetCardData`, and `searchPosetCardData`. Reusable components define explicit props, for example `src/components/common/PostCard.tsx` and `src/components/common/Pagination.tsx`.

The UI primitives use `React.ComponentProps`, `VariantProps`, and `forwardRef` to preserve native element and primitive-library contracts.

Adopt in the portfolio:

- [ ] Define shared domain types near the route or feature boundary.
- [ ] Give reusable components explicit prop types.
- [ ] Extend native element props when building input-like primitives.
- [ ] Prefer `unknown` plus narrowing over `any` for external or untrusted data.

### 8. Next.js asset, font, and navigation APIs

The reference uses Next.js APIs consistently in the main UI:

- `next/image` is used for logos, card images, and responsive media.
- `next/link` is used for internal navigation in cards, mobile menus, and error states.
- `next/font/google` loads and exposes font variables from `src/app/layout.tsx`.
- `metadata` is exported from `src/app/layout.tsx` for title, description, and favicon configuration.
- Search navigation uses `encodeURIComponent` before writing a query into the URL in `src/components/Layout/Navbar.tsx`.

Adopt in the portfolio:

- [ ] Use `next/image` with meaningful alt text and reserved dimensions or aspect ratios.
- [ ] Use `next/link` for internal routes and normal anchors for external destinations.
- [ ] Keep font loading and site metadata in the root layout.
- [ ] Encode user-controlled query parameters before building URLs.
- [ ] Validate remote image configuration and avoid disabling optimization globally without a documented reason.

### 9. Search, pagination, and URL state

`src/app/(pages)/search/page.tsx` demonstrates a complete interactive flow:

- The search field is controlled state.
- The query is synchronized to `useSearchParams` and updated with `router.replace`.
- Filtering is memoized with `useMemo`.
- Pagination derives total pages and visible indexes from constants.
- `src/components/common/Pagination.tsx` memoizes handlers and page options.
- A `Suspense` boundary wraps the search client content.

Adopt in the portfolio:

- [ ] Keep URL state shareable when it represents navigation or filtering state.
- [ ] Centralize pagination arithmetic and define a page-size constant.
- [ ] Use memoization only for derived work or handlers where it improves stability.
- [ ] Add loading or Suspense fallbacks for client content that depends on navigation state.

### 10. Accessibility-aware interaction patterns

The reference includes several good accessibility patterns:

- `aria-label` on icon-only mobile navigation buttons in `src/components/Layout/MobileNaveMenu.tsx`.
- `aria-hidden="true"` and `sr-only` labels for decorative icons and pagination controls.
- `focus-visible` ring and border styles in the UI primitives.
- Disabled states that prevent pointer interaction and communicate reduced opacity.
- Semantic `nav`, `form`, `button`, `ul`, `li`, and heading elements.
- Radix primitives for keyboard navigation and focus management.

Adopt in the portfolio:

- [ ] Give icon-only controls an accessible name.
- [ ] Hide decorative icons from assistive technology.
- [ ] Keep visible focus styles for keyboard users.
- [ ] Use semantic landmarks and native controls before custom behavior.
- [ ] Test interactive states with keyboard navigation.

### 11. Responsive navigation and page composition

`src/components/Layout/Navbar.tsx` provides desktop navigation and actions, while `src/components/Layout/MobileNaveMenu.tsx` provides a mobile drawer, active-route state, nested Topics navigation, search, and body scroll locking. The page shell chooses which experience to show at responsive breakpoints.

Page modules are composed in route files, for example:

```tsx
<Hero />
<InsightfulReads />
<CustomerWins />
<Projects />
<NewsletterSignUp />
```

Adopt in the portfolio:

- [ ] Keep desktop and mobile navigation behavior in dedicated components.
- [ ] Derive active navigation state from the current pathname.
- [ ] Close transient navigation state when the route changes.
- [ ] Ensure mobile drawers have a visible close control, focus behavior, and safe scroll handling.

### 12. Animation and motion organization

The project centralizes reusable Framer Motion variants in `src/components/common/animations.ts` and uses them from animated components. It also uses `tw-animate-css` for Tailwind-compatible enter/exit utilities in Radix wrappers.

Adopt in the portfolio:

- [ ] Keep shared motion variants in a small, typed module.
- [ ] Use animation only to clarify state or hierarchy.
- [ ] Respect reduced-motion preferences for non-essential movement.
- [ ] Keep animation dependencies out of server-only components.
- [ ] Prefer CSS transitions for simple hover/focus changes.

## Do not copy directly

The reference project also contains patterns that conflict with the portfolio’s defensive rules or need tightening:

- **Hard-coded colors:** Many feature files use values such as `bg-[#F9FAFB]`, `text-[#333333]`, and inline gradients. Reuse the semantic token approach instead.
- **Excessive arbitrary utilities:** Examples include `w-[850px]`, `h-[462px]`, `text-[70px]`, `top-[1px]`, and `z-[1]`. Prefer project tokens, intrinsic sizing, and the approved z-index scale.
- **Broad `any` types:** `src/components/modules/Home/Projects.tsx` and several DTO fields use `any`. Model external data explicitly or narrow from `unknown`.
- **Inconsistent z-index values:** The reference uses `z-30`, `z-40`, `z-50`, `z-[1]`, `z-10`, and `z-20` for overlapping features. Use the portfolio’s documented `z-0`/`z-10`/`z-20`/`z-50` meanings.
- **Large global CSS surface:** `src/app/globals.css` contains component-specific carousel and button implementation styles. Prefer local component styles or Tailwind utilities unless a rule is truly global.
- **Unsafe body-style mutation:** Mobile navigation and pagination directly assign `document.body.style.overflow`. Use a cleanup-safe hook or a dialog/drawer primitive that owns scroll locking.
- **Internal plain anchors:** `src/components/Layout/Navbar.tsx` uses `<a href="/">` for an internal route. Use `next/link` for client-side navigation.
- **Globally unoptimized images:** `next.config.ts` sets `unoptimized: true`. Keep image optimization enabled unless a specific asset pipeline requires otherwise.
- **Nested interactive elements:** `src/components/common/AnimatedButton.tsx` renders a `<button>` inside a `Link`. Use a styled link or Radix Slot so interactive elements are not nested.
- **Duplicated or fragile event handling:** `src/components/common/Pagination.tsx` registers the `scrollend` listener twice in its smooth-scroll helper. Register once and always clean up listeners and timers.
- **Unvalidated HTML/content strings:** `src/components/common/constants.tsx` contains large HTML strings and inline styles. Sanitize or use structured content before rendering untrusted data.

## Portfolio adoption checklist

- [ ] Keep the portfolio’s existing [`UI-BEST-PRACTICES.md`](UI-BEST-PRACTICES.md) rules as the final layout authority.
- [ ] Preserve the current `src/app/` App Router structure and use route groups as routes grow.
- [ ] Use `src/components/` for feature composition and `src/components/ui/` for primitives.
- [ ] Keep tokens in `src/app/globals.css` and prefer semantic utility names.
- [ ] Continue using `cn()` from `src/lib/utils.ts` and CVA for typed variants.
- [ ] Add Radix/shadcn primitives only when the feature needs them.
- [ ] Keep data types explicit and avoid introducing new `any` values.
- [ ] Use Next.js `Image`, `Link`, font, metadata, and route APIs correctly.
- [ ] Add accessible names, focus states, and semantic structure to interactive UI.
- [ ] Centralize reusable motion variants and respect reduced motion.
- [ ] Review arbitrary values, z-indexes, external images, and client boundaries before merging.

## Evidence map

| Practice | Reference evidence |
| --- | --- |
| Route groups and dynamic segments | `src/app/(pages)/**` |
| Shared layout and metadata | `src/app/layout.tsx` |
| Branded 404 | `src/app/not-found.tsx` |
| Feature composition | `src/app/page.tsx`, `src/components/modules/**` |
| Semantic design tokens | `src/app/globals.css` |
| Typed primitive variants | `src/components/ui/button.tsx` |
| Radix wrappers | `src/components/ui/navigation-menu.tsx`, `popover.tsx`, `select.tsx`, `tabs.tsx` |
| Class composition | `src/lib/utils.ts` |
| Shared content models | `src/app/types/posts.ts` |
| Search and URL state | `src/app/(pages)/search/page.tsx` |
| Pagination | `src/components/common/Pagination.tsx` |
| Responsive navigation | `src/components/Layout/Navbar.tsx`, `MobileNaveMenu.tsx` |
| Motion variants | `src/components/common/animations.ts` |
| Reusable cards | `src/components/common/PostCard.tsx`, `EventCard.tsx` |
