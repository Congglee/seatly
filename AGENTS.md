# Seatly AGENTS Guide

## Project Snapshot

- Seatly is a two-package app for QR table ordering and restaurant operations.
- Front-end: `seatly-web/` with Next.js App Router, React 18, TypeScript, Tailwind CSS 3, shadcn/ui, TanStack Query, Zustand, and Zod.
- Back-end: `seatly-server/` with Fastify 4, TypeScript strict mode, Prisma 5, PostgreSQL, Socket.IO, JWT auth, and Zod validation.
- Package-specific rules live in the nearest `AGENTS.md`; open the sub-folder guide before editing files there.

## Root Setup Commands

- Install web deps: `cd seatly-web && npm install`
- Install server deps: `cd seatly-server && npm install`
- Run web dev server: `cd seatly-web && npm run dev`
- Run server dev server: `cd seatly-server && npm run dev`
- Build web: `cd seatly-web && npm run build`
- Build server: `cd seatly-server && npm run build`
- Validate Prisma schema: `cd seatly-server && npm run db:validate:dev`
- Generate Prisma client: `cd seatly-server && npm run db:generate:dev`

## Universal Conventions

- Use TypeScript strict-mode patterns; both packages define `@/*` path aliases to their own `src/*`.
- Prefer small, package-local changes over cross-package abstractions unless the contract is clear.
- Keep request/response schemas aligned between `seatly-server/src/schemas/**` and `seatly-web/src/schemas/**` when API contracts change.
- Preserve existing formatting style per package: web currently uses semicolons/double quotes; server uses Prettier with single quotes/no semicolons.
- Do not introduce a root workspace manager unless explicitly requested; each package currently has its own `package-lock.json` and `node_modules/`.

## Dependency And Documentation Rules

- For any task touching both `seatly-web/` and `seatly-server/`, inspect `seatly-web/package.json` and `seatly-server/package.json` first.
- Check dependency names and versions using semantic versioning before selecting APIs, examples, or generated code.
- When researching online docs, prefer sources compatible with the versions currently declared in those package files.
- Do not use examples for incompatible major versions, especially Next.js, React, Tailwind CSS, shadcn/ui, Fastify, Prisma, Socket.IO, TanStack Query, and Zod.
- If a version range uses `^`, treat the declared package and lockfile as the source of truth when behavior may differ by minor/patch version.

## Security & Secrets

- Never commit real secrets, tokens, database URLs, JWT secrets, or production credentials.
- Keep env values in package-local `.env*` files; use `.env.example` only for non-secret templates.
- Backend env validation is centralized in `seatly-server/src/config/environment.ts`.
- Frontend public env validation is centralized in `seatly-web/src/config/environment.ts`; browser-safe variables must use `NEXT_PUBLIC_`.

## JIT Index

### Package Structure

- Web UI: `seatly-web/` -> see `seatly-web/AGENTS.md`
- API/server: `seatly-server/` -> see `seatly-server/AGENTS.md`
- Project docs: `docs/` -> see `docs/AGENTS.md`

### Quick Find Commands

- Find web routes/pages: `rg -n "export default function|export const metadata" seatly-web/src/app`
- Find web API calls: `rg -n "http\.|fetch\(|useQuery|useMutation" seatly-web/src`
- Find server routes: `rg -n "fastify\.(get|post|put|delete)" seatly-server/src/routes`
- Find server controllers: `rg -n "export const .*Controller" seatly-server/src/controllers`
- Find Zod schemas: `rg -n "z\.object|z\.enum|z\.string" seatly-web/src/schemas seatly-server/src/schemas`
- Find Prisma models: `rg -n "^model " seatly-server/prisma/schema.prisma`
- Find Socket.IO usage: `rg -n "socket|io\." seatly-web/src seatly-server/src`
- Find project requirements: `rg -n "Seatly|order|table|guest|staff|dish" docs`

## Definition Of Done

- Relevant package `AGENTS.md` rules were followed.
- Cross-package API/schema changes are reflected in both web and server code.
- Dependency-sensitive code was checked against current `package.json` versions and compatible docs.
- No secrets or generated build artifacts were added unintentionally.
- Run the package-specific Pre-PR commands listed in the nearest `AGENTS.md` before opening a PR.
