# TableTap Web AGENTS Guide

## Package Identity

- `tabletap-web/` is the front-end app for TableTap, built with Next.js App Router.
- Primary stack: Next.js `14.2.35`, React `18`, TypeScript, shadcn/ui `2.3.0`, Tailwind CSS `3.4.1`, TanStack Query, Zustand, and Zod.

## Setup & Run

- Install deps: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Typecheck: `npm exec tsc -- --noEmit`
- Start production build: `npm run start`

## UI/UX System Contract

- The entire front-end must use only `shadcn/ui` version `2.3.0` together with Tailwind CSS `v3`.
- Do not introduce any other UI library or styling solution, including CSS Modules, Material UI, Ant Design, styled-components, Emotion, Chakra UI, Tailwind CSS `v4`, or any `shadcn/ui` version newer than `2.3.0`.
- Styling must stay inside the approved system: shadcn/ui components, Tailwind utility classes, CSS variables, and the shared theme tokens already defined in `src/styles/globals.css` and `tailwind.config.ts`.
- When adding or updating UI, prefer extending existing shadcn primitives in `src/components/ui/` over inventing a parallel component system.

## shadcn Documentation & Installation Rules

- Use the official shadcn documentation at `https://v3.shadcn.com/` when referencing component APIs, installation steps, or patterns.
- Preferred installation guide for this app: `https://v3.shadcn.com/docs/installation/next`
- If another source is unavoidable, only use material that is explicitly compatible with `shadcn/ui 2.3.0` and Tailwind CSS `v3`.
- Always install shadcn components with the exact command format: `npx shadcn@2.3.0 add component_name`
- Never use `npx shadcn@latest ...`, never omit the version, and never follow examples written for Tailwind CSS `v4`.
- If documentation is unclear or version-specific behavior needs confirmation, use the shadcn MCP server (`user-shadcn` in this workspace) before improvising.

## Patterns & Conventions

- App Router files live under `src/app/`; shared UI primitives live under `src/components/ui/`.
- Global styling and theme tokens live in `src/styles/globals.css`; Tailwind theme extension lives in `tailwind.config.ts`.
- Use `@/` imports consistently; see `src/app/layout.tsx` and `src/components/ui/button.tsx`.
- Compose top-level providers in `src/app/layout.tsx`; follow the pattern from `src/providers/query-provider.tsx` and `src/providers/app-provider.tsx`.
- Keep request logic and auth-aware HTTP behavior centralized in `src/lib/http.ts`; do not spread ad hoc fetch wrappers across features.
- Validate public runtime env values with Zod in `src/config/enviroment.ts` before using them.
- Reuse `cn` from `src/lib/utils.ts` for class merging instead of writing new helpers.
- When adding a new primitive, mirror the structure and variant style used by `src/components/ui/button.tsx`.
- Prefer CSS variables and Tailwind utility classes over one-off hardcoded colors or custom style islands.
- Keep client-side state bootstrap inside providers/stores; current app bootstrap lives in `src/providers/app-provider.tsx`.
- Treat `src/app/page.tsx` as a placeholder entry screen, not as the standard architecture for real product pages.

## Do / Do Not Copy

- `DO`: Add shared primitives under `src/components/ui/`, following `src/components/ui/button.tsx`.
- `DO`: Compose app-level providers in `src/app/layout.tsx`.
- `DO`: Keep token helpers in `src/lib/utils/token-storage.ts` and network/auth orchestration in `src/lib/http.ts`.
- `DO`: Keep env parsing in `src/config/enviroment.ts`.
- `DON'T`: Copy the minimal placeholder structure from `src/app/page.tsx` into real features.
- `DON'T`: Introduce `.module.css` files, CSS-in-JS, or a second styling system beside Tailwind + shadcn tokens from `src/styles/globals.css`.
- `DON'T`: Trust generated shadcn defaults blindly; verify output paths and imported CSS before committing generated files.

## Touch Points / Key Files

- App shell and global providers: `src/app/layout.tsx`
- Current root placeholder page: `src/app/page.tsx`
- Global theme tokens and base styles: `src/styles/globals.css`
- Tailwind v3 config: `tailwind.config.ts`
- shadcn registry config: `components.json`
- Shared UI reference: `src/components/ui/button.tsx`
- API client and auth handling: `src/lib/http.ts`
- Token persistence helpers: `src/lib/utils/token-storage.ts`
- Query provider: `src/providers/query-provider.tsx`
- App bootstrap provider: `src/providers/app-provider.tsx`
- Public env validation: `src/config/enviroment.ts`

## JIT Index Hints

- Find App Router pages and layouts: `rg -n "export default function|export const metadata" "src/app"`
- Find shadcn primitives and variants: `rg -n "forwardRef|cva\\(" "src/components/ui"`
- Find provider entry points: `rg -n "Provider" "src/providers"`
- Find env usage: `rg -n "NEXT_PUBLIC_|envConfig" "src"`
- Find API wrappers and auth flow: `rg -n "fetch\\(|request<|HttpError|EntityError|refreshToken" "src/lib"`
- Find Zod validation: `rg -n "z\\.object|z\\.enum|z\\.string|safeParse" "src/config" "src/schemas"`

## Common Gotchas

- The project uses Tailwind CSS `3.4.1`; do not paste Tailwind CSS `v4` syntax, config, or docs examples.
- Keep client-safe env vars prefixed with `NEXT_PUBLIC_`; anything else is not safe for browser code.
- `src/lib/http.ts` currently imports token-storage function names with `LocaleStorage`, while `src/lib/utils/token-storage.ts` exports `LocalStorage`; verify naming carefully before refactoring auth storage helpers.

## Pre-PR Checks

`npm run lint && npm exec tsc -- --noEmit && npm run build`
