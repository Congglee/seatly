# Seatly Web AGENTS Guide

## Analysis Summary

- Package type: standalone Next.js front-end package inside the Seatly multi-package repo; npm package-local install via `package-lock.json`.
- Stack: Next.js App Router `14.2.35`, React `18`, TypeScript strict mode, Tailwind CSS `3.4.1`, shadcn/ui/Radix primitives, TanStack Query `^5.56.2`, Zustand `^5.0.1`, Zod `^3.25.76`, Socket.IO client `^4.8.0`.
- Major source areas: routes in `src/app/**`, shared UI in `src/components/**`, backend wrappers in `src/apis/**`, query hooks in `src/queries/**`, contracts in `src/schemas/**`, state in `src/store/**`, utilities in `src/lib/**`.
- Build system: no root workspace manager; scripts are `next dev`, `next build`, `next start`, and `next lint`.
- Testing setup: no test runner, test scripts, or `*.test.*`/`*.spec.*` files currently configured.

## Package Identity

- `seatly-web/` is the Seatly front-end for staff management, guest QR entry, guest menu ordering, order tracking, and auth bridge routes.
- Treat this file as the nearest-wins guide for all files under `seatly-web/**`.
- If a task also touches `../seatly-server/`, inspect both package `AGENTS.md` and both `package.json` files first.

## Setup & Run

- Install deps: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Start production build: `npm run start`
- Lint: `npm run lint`
- Typecheck: `npm exec tsc -- --noEmit`

## Version Contract

- Use Next.js App Router `14.2.35`; do not use Next.js 15/16 APIs, defaults, examples, or migration guidance.
- Keep `eslint-config-next` aligned with `next` at `14.2.35` unless the user explicitly requests an upgrade.
- Use React `18` patterns; do not assume React 19 APIs or React Compiler behavior.
- Use Tailwind CSS `3.4.1`; do not copy Tailwind CSS v4 syntax, config shape, or plugin guidance.
- shadcn components must stay compatible with `components.json`; install new components with `npx shadcn@2.3.0 add component_name` only.

## Directory Map

- App Router routes: `src/app/**`
- Public landing/auth/table entry: `src/app/(public)/**`
- Guest ordering flow: `src/app/guest/**`
- Staff dashboard and operations: `src/app/manage/**`
- Next route handlers for auth/cookie bridge: `src/app/api/**/route.ts`
- Shared components and shadcn primitives: `src/components/**`, `src/components/ui/**`
- API wrappers and query hooks: `src/apis/**`, `src/queries/**`
- Zod schemas/types: `src/schemas/**`, `src/types/**`
- Global state: `src/providers/app-provider.tsx`, `src/store/**`
- Tokens and styling: `DESIGN.md`, `src/styles/globals.css`, `tailwind.config.ts`, `components.json`

## App Router Patterns

- Keep `page.tsx` as Server Components by default; follow `src/app/manage/dishes/page.tsx` delegating to `dishes-view.tsx`.
- Add `"use client"` only for hooks, event handlers, browser APIs, localStorage, Socket.IO, TanStack Query hooks, or client-only UI.
- Colocate route-specific UI in `_components/` folders, e.g. `src/app/manage/orders/_components/order-table.tsx`.
- Use route layouts for shell concerns: `src/app/manage/layout.tsx`, `src/app/guest/layout.tsx`, and `src/app/layout.tsx`.
- Any Client Component using `useSearchParams` must render under `Suspense`; reference `src/components/search-params-loader.tsx`.

## Imports And TypeScript

- Use the `@/*` alias from `tsconfig.json` for source imports; it maps to `./src/*`.
- Prefer `import { Button } from "@/components/ui/button";` over long relative imports.
- Keep relative imports only for very local same-folder modules when it is clearly simpler.
- Keep reusable API/domain types derived from Zod schemas in `src/schemas/**`; avoid duplicating contract types in components.
- Do not introduce `any` unless an external boundary forces it and a narrower type is not practical.

## Design System

- Read `DESIGN.md` before changing UI, layout, color, typography, spacing, radius, animation, or accessibility behavior.
- Use semantic tokens from `src/styles/globals.css` and `tailwind.config.ts`: `bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-muted-foreground`, `bg-primary`.
- Shared primitives live in `src/components/ui/**`; extend existing shadcn/Radix primitives before creating new reusable primitives.
- Use `cn` from `src/lib/utils.ts` for class merging; do not add another class composition helper.
- Avoid hardcoded color drift. `DESIGN.md` currently calls out examples like `#f97316`, `#888888`, `bg-zinc-*`, and `bg-white` as values to replace with semantic tokens unless explicitly justified.
- Do not add CSS Modules, Material UI, Ant Design, styled-components, Emotion, Chakra UI, Tailwind v4, or a newer shadcn registry.

## Data And API Patterns

- Backend HTTP behavior is centralized in `src/lib/http.ts`; do not create ad hoc fetch wrappers in feature components.
- Resource wrappers live in `src/apis/*.api.ts`, e.g. `src/apis/order.api.ts` and `src/apis/auth.api.ts`.
- TanStack Query hooks live in `src/queries/**`, e.g. `src/queries/use-order.ts`; keep `queryKey` names stable and invalidate related keys after mutations.
- Zod request/response contracts live in `src/schemas/**`; keep them aligned with `../seatly-server/src/schemas/**` when API contracts change.
- `http` returns `{ status, payload }`; UI code should read API data through `payload` and handle `EntityError`/`HttpError` where forms or flows need explicit feedback.
- Public env validation is centralized in `src/config/environment.ts`; browser-safe vars must be `NEXT_PUBLIC_*` and mirrored in `.env.example`.

## Auth And Route Handlers

- Next route handlers in `src/app/api/auth/**` and `src/app/api/guest/auth/**` proxy backend auth and manage HTTP-only cookies.
- Client auth API methods use local route handlers with `{ baseUrl: "" }`, e.g. `loginFromClient` in `src/apis/auth.api.ts`.
- Server auth API methods call the backend directly, e.g. `loginFromServer` and `logoutFromServer` in `src/apis/auth.api.ts`.
- Route protection and role redirects live in `src/middleware.ts`; update `managePaths`, `guestPaths`, `onlyOwnerPaths`, and `matcher` together.
- Tokens are also mirrored in localStorage by `src/lib/http.ts` for client API calls; do not scatter token storage logic outside `src/lib/utils/token-storage.ts`.
- Never expose JWT secrets, backend secrets, or non-public env vars in this front-end package.

## Realtime And State

- Global auth/sidebar/socket state lives in `src/providers/app-provider.tsx` using Zustand `persist` for `sidebarOpen` only.
- Feature modal/sheet state lives in small stores under `src/store/**`, e.g. `src/store/dishes/use-new-dish.ts`.
- Socket creation is centralized in `src/lib/utils/socket.ts`; reuse `generateSocketInstace(accessToken)` instead of creating raw Socket.IO clients.
- Socket listeners must register and clean up in the same effect; follow `src/app/manage/orders/_components/order-table.tsx` and `src/app/guest/orders/orders-view.tsx`.
- Avoid duplicating in-flight refresh/logout requests; `src/apis/auth.api.ts`, `src/apis/guest.api.ts`, and `src/lib/http.ts` already guard these flows.

## Forms, Tables, Charts

- Forms use `react-hook-form`, `zodResolver`, and shadcn form primitives; copy patterns from `src/app/manage/dishes/_components/new-dish.tsx` or `src/app/(public)/(auth)/login/_components/login-card.tsx`.
- API validation errors should flow through helpers such as `src/lib/utils/api-error.ts` instead of one-off parsing in every form.
- Tables use shared `src/components/data-table.tsx` with `ColumnDef` definitions in route `_components/columns.tsx` files.
- Dashboard charts use Recharts components in `src/app/manage/dashboard/_components/**`; keep chart config types in `src/types/utils.type.ts` and reusable chart constants in `src/constants/charts.ts`.

## Images And Assets

- Use `Image` from `next/image` for app images; avoid raw `<img>` unless a documented edge case requires it.
- Provide meaningful `alt`; use `alt=""` only for decorative images.
- Provide `width` and `height`, or use `fill` with a positioned parent, explicit dimensions, and `sizes`.
- Use `priority` only for the primary above-the-fold LCP image.
- Add remote image hosts through `next.config.mjs` `images.remotePatterns`; keep new `protocol`, `hostname`, `port`, and `pathname` as narrow as practical.

## Do / Do Not Copy

- DO: thin Server Component pages plus focused Client Components, like `src/app/manage/dishes/page.tsx` and `src/app/manage/dishes/dishes-view.tsx`.
- DO: `@/` imports, like `src/app/layout.tsx` and `src/components/ui/button.tsx`.
- DO: API wrapper plus query hook layering, like `src/apis/order.api.ts` and `src/queries/use-order.ts`.
- DO: schema-first forms, like `src/app/manage/tables/_components/new-table.tsx`.
- DO: Zustand stores for small UI state, like `src/store/tables/use-new-table.ts`.
- DO NOT: convert a whole `page.tsx` to a Client Component just because one child needs interactivity.
- DO NOT: call backend URLs directly from route components when `src/lib/http.ts` and `src/apis/**` can be used.
- DO NOT: add `useMemo`/`useCallback` by habit; use them only for measured expensive work, stable dependencies, or memoized child contracts.
- DO NOT: define reusable constants, status maps, or utility functions at the top of React component files; move them to `src/constants/**` or `src/lib/utils/**`.
- DO NOT: edit `.next/`, `node_modules/`, `.env`, or generated `tsconfig.tsbuildinfo` as source.

## JIT Index Hints

- Find pages/layouts: `rg -n "export default function|export const metadata" src/app`
- Find route handlers: `rg -n "export async function (GET|POST|PUT|DELETE)" src/app/api`
- Find Client Components: `rg -n "^\"use client\"|^'use client'" src`
- Find API wrappers: `rg -n "http\.(get|post|put|delete)" src/apis src/lib/http.ts`
- Find query hooks: `rg -n "useQuery|useMutation|useQueryClient" src/queries src/app`
- Find Zod schemas: `rg -n "z\.object|z\.enum|z\.string|z\.number" src/schemas`
- Find forms: `rg -n "useForm\(|zodResolver|FormField" src/app src/components`
- Find tables: `rg -n "DataTable|ColumnDef|useReactTable" src`
- Find Socket.IO usage: `rg -n "socket|io\(" src`
- Find raw image tags: `rg -n "<img" src`
- Find forbidden styling systems: `rg -n "\.module\.css|@mui|antd|styled-components|@emotion|@chakra-ui|tailwindcss/v4" .`

## Common Gotchas

- `useSearchParams` can work in dev but fail production build without a `Suspense` boundary.
- `cache: "no-store"` is a Fetch API option; it does not apply to arbitrary client libraries beyond `src/lib/http.ts` behavior.
- Server Components cannot access `window`, `document`, localStorage, Socket.IO clients, or React client hooks.
- `src/app/api/**` route handlers are part of the Next app, not the Fastify backend; backend APIs live in `../seatly-server/`.
- `next.config.mjs` currently allows broad `pathname: "/**"` for existing image hosts; do not broaden new hosts further.

## Testing

- No test runner or test files are currently configured in `seatly-web`.
- Baseline verification for changes is lint, typecheck, and build.
- If adding tests, first add explicit package scripts and document the runner/pattern here.
- For cross-package API/schema changes, also run the relevant `../seatly-server/` checks after syncing server schemas.

## Pre-PR Checks

`npm run lint && npm exec tsc -- --noEmit && npm run build`
