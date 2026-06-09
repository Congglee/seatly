# Seatly Web AGENTS Guide

## Package Identity

- `seatly-web/` is the Seatly front-end app for staff management, guest QR entry, guest menu ordering, and order tracking.
- Primary stack: Next.js `14.2.35`, React `18`, TypeScript strict mode, Tailwind CSS `3.4.1`, shadcn/ui `2.3.0`, TanStack Query `^5.56.2`, Zustand `^5.0.1`, Zod `^3.25.76`, and Socket.IO client `^4.8.0`.
- This package uses npm with its own `package-lock.json`; do not assume a root workspace manager.

## Setup & Run

- Install deps: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Typecheck: `npm exec tsc -- --noEmit`
- Start production build: `npm run start`

## Next.js Version Contract

- This app uses Next.js `14.2.35`; do not use Next.js 15 or 16 APIs, examples, defaults, or migration guidance.
- Keep `eslint-config-next` aligned with `next` at `14.2.35` unless the user explicitly requests an upgrade.
- When researching docs, use documentation and examples compatible with Next.js App Router `14.2.x`, React `18`, Tailwind CSS `3.4.1`, and shadcn/ui `2.3.0`.
- If a cross-stack task also touches `../seatly-server/`, inspect both `package.json` files first and check dependency versions using semantic versioning.

## Import Alias

- Always use the `@/*` alias configured in `tsconfig.json`; it maps to `./src/*`.
- Prefer `import { Button } from "@/components/ui/button";` over relative imports like `../../../components/ui/button`.
- Use `@/components/**`, `@/lib/**`, `@/schemas/**`, `@/queries/**`, and `@/store/**` for source imports.
- Keep relative imports only for very local same-folder modules when it is clearly simpler.

## Fonts

- Prefer fonts from `next/font/google` for new font work so Next.js downloads, optimizes, and serves fonts from the app build output.
- Use font variables/classes in `src/app/layout.tsx` and shared layouts, not scattered across feature components.
- Do not add external `<link>` font imports in app code or custom CSS because they can increase layout shift and delay rendering.
- Current `src/app/layout.tsx` uses `geist/font/sans`; if refactoring fonts, prefer moving to `next/font/google` instead of adding another font package.

## Images

- Always use `Image` from `next/image` for local and remote images; avoid raw `<img>` unless there is a documented reason.
- `Image` improves size selection, image quality, format optimization, lazy loading, LCP, layout-shift prevention, and Next.js ESLint compliance.
- Always provide meaningful `alt`; use empty `alt=""` only for decorative images.
- Provide `width` and `height`, or use `fill` with a positioned parent and explicit layout size.
- Use `priority` only for the primary above-the-fold LCP image.
- Use `sizes` when an image is responsive, especially with `fill`.
- Use `quality` intentionally; default is `75`, and higher values should be justified.
- Use `placeholder="blur"` only when blur data is available or supported by the image source.
- Remote images must be allowed in `next.config.mjs` via `images.remotePatterns`.
- Current allowed remote hosts include `localhost:4000`, `upload.wikimedia.org`, `images.pexels.com`, `picsum.photos`, and `images.unsplash.com`.
- When adding a remote host, keep `protocol`, `hostname`, `port`, and `pathname` as narrow as practical.

## Server Components And Client Components

- Keep `page.tsx` files as Server Components by default.
- Prefer Server Components for SEO, lower client bundle size, server-rendered HTML, and server-side data access.
- Add `"use client"` only when a component needs React hooks, event handlers, browser APIs, realtime updates, or client-only libraries.
- Split the smallest interactive part into a Client Component; keep the parent route/page/layout as a Server Component whenever possible.
- Do not move a full route to Client Component just because one button, form, socket listener, or query-param reader needs client behavior.
- Follow the current route split pattern in `src/app/manage/dishes/page.tsx` and feature components under `src/app/**/_components/**`.

## Fetching And Cache Control

- Prefer explicit per-request cache control over broad dynamic behavior.
- Recommended for non-cacheable API reads: pass `cache: "no-store"` to the Fetch API request options.
- Avoid using `cookies()` or `headers()` only to disable caching; those dynamic functions affect the entire component scope.
- Remember `cache: "no-store"` is a Fetch API option and does not apply to Axios.
- Keep backend HTTP behavior centralized in `src/lib/http.ts`; do not create ad hoc fetch wrappers in feature components.
- When adding API wrappers, place them under `src/apis/**` or `src/queries/**` following existing query/API organization.

## useSearchParams And Suspense

- Any Client Component that calls `useSearchParams` must be rendered under a `Suspense` boundary to avoid `Missing Suspense boundary with useSearchParams` during build.
- Prefer isolating query-param reading in a tiny Client Component and wrapping that component with `Suspense` from the parent.
- Existing helper/reference: `src/components/search-params-loader.tsx`.
- Existing call sites to review carefully include table/dish filters and auth/guest entry components under `src/app/**/_components/**`.

## UI And Styling System

- For all UI work, read `DESIGN.md` before editing components, layouts, colors, typography, spacing, radius, or component states.
- Use semantic design tokens from `DESIGN.md`, `src/styles/globals.css`, and `tailwind.config.ts`; do not hardcode colors, spacing, radius, or typography when a token exists.
- If implementation and `DESIGN.md` conflict, report the mismatch and ask whether to update code or sync `DESIGN.md`.
- Preserve accessibility rules from `DESIGN.md`, especially contrast, focus-visible, keyboard behavior, form errors, and touch target requirements.
- The entire front-end must use only shadcn/ui `2.3.0` together with Tailwind CSS `3.4.1`.
- Do not integrate any other UI library or styling solution, including CSS Modules, Material UI, Ant Design, styled-components, Emotion, Chakra UI, Tailwind CSS v4, or any shadcn/ui version newer than `2.3.0`.
- Styling is only allowed through shadcn/ui components, Tailwind CSS v3 utility classes, CSS variables, and theme tokens already defined in `src/styles/globals.css` and `tailwind.config.ts`.
- Shared primitives live in `src/components/ui/**`; always prefer extending or customizing existing shadcn primitives there before creating new reusable component patterns.
- Global styles and CSS variables live in `src/styles/globals.css`; Tailwind theme extension lives in `tailwind.config.ts`.
- Use `cn` from `src/lib/utils.ts` for class merging instead of adding another helper or class composition package.
- Do not copy or reference Tailwind CSS v4 examples, syntax, config shape, plugin guidance, or docs.

## shadcn Documentation And Installation

- Use the official shadcn documentation at `https://v3.shadcn.com/` for component APIs, installation instructions, and implementation patterns.
- Only use external examples that are explicitly compatible with shadcn/ui `2.3.0` and Tailwind CSS `3.4.1`.
- Install shadcn components with the exact pinned CLI pattern: `npx shadcn@2.3.0 add component_name`.
- Never use `npx shadcn@latest ...`, never omit the `2.3.0` version, and never install components from a newer shadcn registry.
- Keep generated component output aligned with `components.json`, especially aliases for `@/components`, `@/components/ui`, `@/lib/utils`, and `src/styles/globals.css`.

## Patterns & Conventions

- App Router routes live in `src/app/**`; colocate route-specific UI under `_components/` folders.
- Shared reusable components live in `src/components/**`; shadcn primitives live in `src/components/ui/**`.
- App providers are composed in `src/app/layout.tsx` using `src/providers/query-provider.tsx`, `src/providers/app-provider.tsx`, and `src/providers/theme-provider.tsx`.
- Public runtime env validation is centralized in `src/config/environment.ts`; browser-safe env vars must start with `NEXT_PUBLIC_`.
- Keep request/response schemas in `src/schemas/**` aligned with `../seatly-server/src/schemas/**` when API contracts change.
- Store small UI state with Zustand stores under `src/store/**`, following `src/store/dishes/use-new-dish.ts` and `src/store/tables/use-new-table.ts`.
- Keep reusable query logic under `src/queries/**`, following `src/queries/use-table.ts`, `src/queries/use-media.ts`, and `src/queries/use-guest.ts`.

## Do / Do Not Copy

- `DO`: Use `@/` imports like `src/app/layout.tsx` and `src/components/ui/button.tsx`.
- `DO`: Use `Image` from `next/image` like `src/app/guest/menu/_components/menu-dish-card.tsx` and `src/app/manage/dishes/_components/dish-image-upload.tsx`.
- `DO`: Keep Server Component pages thin and delegate interactive UI to `_components/**` Client Components.
- `DO`: Wrap `useSearchParams` call sites in `Suspense`; use `src/components/search-params-loader.tsx` as a reference pattern.
- `DO`: Add remote image domains in `next.config.mjs` using `images.remotePatterns`.
- `DO`: Extend shadcn primitives in `src/components/ui/**` and use Tailwind v3 utility classes plus existing CSS variables from `src/styles/globals.css`.
- `DON'T`: Use raw `<img>` for normal app images.
- `DON'T`: Convert `page.tsx` into a Client Component unless the full route truly requires client-only behavior.
- `DON'T`: Use Next.js 15/16 docs, `next@latest`, or examples incompatible with Next.js `14.2.35`.
- `DON'T`: Use long relative imports like `../../../components/ui/button` for source modules.
- `DON'T`: Add CSS Modules, Material UI, Ant Design, styled-components, Emotion, Chakra UI, Tailwind CSS v4, or shadcn/ui newer than `2.3.0`.

## Key Image Props

| Prop          | Type                         | Default                | Notes                               |
| ------------- | ---------------------------- | ---------------------- | ----------------------------------- |
| `src`         | `string` / `StaticImageData` | required               | Local import or remote URL.         |
| `alt`         | `string`                     | required               | Required accessibility text.        |
| `width`       | `number`                     | required unless `fill` | Intrinsic optimized width in px.    |
| `height`      | `number`                     | required unless `fill` | Intrinsic optimized height in px.   |
| `quality`     | `number`                     | `75`                   | Image quality from 1 to 100.        |
| `fill`        | `boolean`                    | `false`                | Fill a positioned parent container. |
| `priority`    | `boolean`                    | `false`                | Preload the LCP image only.         |
| `placeholder` | `"blur"` / `"empty"`         | `"empty"`              | Loading placeholder behavior.       |
| `className`   | `string`                     | none                   | Styling hook.                       |
| `sizes`       | `string`                     | none                   | Responsive image hint.              |

## Touch Points / Key Files

- App root layout/providers/fonts: `src/app/layout.tsx`
- Next.js image remote config: `next.config.mjs`
- Import alias config: `tsconfig.json`
- Global theme tokens: `src/styles/globals.css`
- Tailwind v3 config: `tailwind.config.ts`
- shadcn registry config: `components.json`
- API client: `src/lib/http.ts`
- Search params helper: `src/components/search-params-loader.tsx`
- Example `next/image` usage: `src/app/guest/menu/_components/menu-dish-card.tsx`
- Public env validation: `src/config/environment.ts`

## JIT Index Hints

- Find App Router pages/layouts: `rg -n "export default function|export const metadata" src/app`
- Find Client Components: `rg -n "^\"use client\"|^'use client'" src`
- Find `useSearchParams`: `rg -n "useSearchParams" src`
- Find raw image tags: `rg -n "<img" src`
- Find Next image usage: `rg -n "next/image|<Image" src`
- Find remote image config: `rg -n "remotePatterns|images:" next.config.mjs`
- Find relative parent imports to replace: `rg -n "from [\"']\.\./\.\./|from [\"']\.\./\.\./\.\./" src`
- Find API/cache usage: `rg -n "cache:|no-store|fetch\(|http\." src`
- Find forbidden styling systems: `rg -n "\.module\.css|@mui|antd|styled-components|@emotion|@chakra-ui|tailwindcss/v4" .`

## Common Gotchas

- `next.config.mjs` currently allows broad `pathname: "/**"` for several image hosts; narrow new domains where feasible.
- `useSearchParams` can work in dev but fail during production build without `Suspense`.
- `cache: "no-store"` only affects Fetch API based requests, not Axios or arbitrary client libraries.
- Server Components cannot use hooks, event handlers, `window`, `document`, localStorage, or Socket.IO client code.
- `.next/`, `node_modules/`, and real `.env*` files are not source files and should not be edited or committed.

## Testing

- No test runner or `*.test.*` files are currently configured in this package.
- Use lint, typecheck, and build as baseline verification for UI/Next.js changes.
- If adding tests, first add explicit package scripts and document the runner here.

## Pre-PR Checks

`npm run lint && npm exec tsc -- --noEmit && npm run build`
