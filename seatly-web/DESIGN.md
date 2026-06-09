---
version: alpha
name: Seatly Web Design System
description: Design tokens and UI rules for the Seatly Next.js front-end, derived from Tailwind CSS, CSS variables, and shadcn/ui primitives.
sources:
  tokens:
    - src/styles/globals.css
    - tailwind.config.ts
    - components.json
  components:
    - src/components/ui/button.tsx
    - src/components/ui/input.tsx
    - src/components/ui/card.tsx
    - src/components/ui/dialog.tsx
    - src/components/ui/badge.tsx
    - src/components/ui/table.tsx
    - src/components/ui/form.tsx
colors:
  background: "#f8f7f2"
  foreground: "#1a1a1a"
  card: "#ffffff"
  card-foreground: "#1a1a1a"
  popover: "#ffffff"
  popover-foreground: "#1a1a1a"
  primary: "#c1a875"
  primary-foreground: "#ffffff"
  secondary: "#e5e1d5"
  secondary-foreground: "#1a1a1a"
  muted: "#f1ede1"
  muted-foreground: "#6b6352"
  accent: "#c1a875"
  accent-foreground: "#ffffff"
  destructive: "#d32f2f"
  destructive-foreground: "#ffffff"
  border: "#e2decb"
  input: "#e2decb"
  ring: "#c1a875"
  chart-1: "#c1a875"
  chart-2: "#3d4147"
  chart-3: "#e5e1d5"
  chart-4: "#8a7d5e"
  chart-5: "#2a2d31"
  dark-background: "#141412"
  dark-foreground: "#f8f7f2"
  dark-card: "#1e1e1c"
  dark-primary: "#d4bc8b"
  dark-secondary: "#2d2b28"
  dark-muted: "#242422"
  dark-muted-foreground: "#a39e94"
  dark-border: "#2d2b28"
  dark-destructive: "#ef4444"
typography:
  headline-lg:
    fontFamily: "var(--font-sans), Inter, -apple-system, sans-serif"
    fontSize: 30px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -0.02em
  headline-md:
    fontFamily: "var(--font-sans), Inter, -apple-system, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: "var(--font-sans), Inter, -apple-system, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.02em
  body-md:
    fontFamily: "var(--font-sans), Inter, -apple-system, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "var(--font-sans), Inter, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: "var(--font-sans), Inter, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
  label-sm:
    fontFamily: "var(--font-sans), Inter, -apple-system, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.5
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  page-gutter-mobile: 16px
  card-padding: 24px
  dashboard-gap: 16px
  desktop-sidebar-collapsed: 90px
  desktop-sidebar-expanded: 288px
rounded:
  sm: 4px
  md: 8px
  lg: 8px
  xl: 12px
  full: 9999px
elevation:
  shadow-sm: "0px 8px 15px 0px rgb(0 0 0 / 0.05), 0px 1px 2px -1px rgb(0 0 0 / 0.05)"
  shadow-md: "0px 8px 15px 0px rgb(0 0 0 / 0.05), 0px 2px 4px -1px rgb(0 0 0 / 0.05)"
  shadow-lg: "0px 8px 15px 0px rgb(0 0 0 / 0.05), 0px 4px 6px -1px rgb(0 0 0 / 0.05)"
motion:
  fast: 100ms
  standard: 200ms
  layout: 300ms
  easing: ease-in-out
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    hoverBackgroundColor: "{colors.primary}"
    hoverOpacity: "90%"
    rounded: "{rounded.md}"
    height: 40px
    paddingX: 16px
    focusRingWidth: 2px
    focusRingColor: "{colors.ring}"
    focusRingOffset: 2px
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    hoverBackgroundColor: "{colors.secondary}"
    hoverOpacity: "80%"
    rounded: "{rounded.md}"
    height: 40px
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    hoverBackgroundColor: "{colors.destructive}"
    hoverOpacity: "90%"
    rounded: "{rounded.md}"
    height: 40px
  input:
    backgroundColor: "{colors.background}"
    borderColor: "{colors.input}"
    textColor: "{colors.foreground}"
    placeholderColor: "{colors.muted-foreground}"
    rounded: "{rounded.md}"
    height: 40px
    paddingX: 12px
    focusRingWidth: 2px
    focusRingColor: "{colors.ring}"
    focusRingOffset: 2px
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    borderColor: "{colors.border}"
    rounded: "{rounded.lg}"
    shadow: "{elevation.shadow-sm}"
    padding: 24px
  dialog:
    backgroundColor: "{colors.background}"
    borderColor: "{colors.border}"
    overlayColor: "rgb(0 0 0 / 0.80)"
    rounded: "{rounded.lg}"
    shadow: "{elevation.shadow-lg}"
    maxWidth: 512px
  table-row:
    borderColor: "{colors.border}"
    hoverBackgroundColor: "{colors.muted}"
    hoverOpacity: "50%"
    selectedBackgroundColor: "{colors.muted}"
---

## Overview

Seatly Web is a restaurant operations and QR table ordering interface. It serves two related surfaces: a staff management dashboard and a guest-facing ordering flow. The design language is warm, pragmatic, and operations-focused: soft cream surfaces, muted gold primary actions, compact tables, calm cards, and clear form states.

The canonical implementation stack is shadcn/ui `2.3.0`, Tailwind CSS `3.4.1`, Radix primitives, CSS variables in `src/styles/globals.css`, and semantic Tailwind mappings in `tailwind.config.ts`. Do not introduce another UI system.

Use moderate density for staff dashboard pages and tighter mobile-first hierarchy for guest flows. Motion should be functional and low-intensity: subtle transitions, accordion/collapsible animations, dialog/sheet enter-exit transitions, and simple active-state feedback.

Evidence sources: `src/styles/globals.css`, `tailwind.config.ts`, `components.json`, `src/components/ui/**`, `src/app/manage/**`, and `src/app/guest/**`.

## Colors

The palette is token-driven through HSL CSS variables and Tailwind semantic colors. The YAML hex values are normalized from the light/dark HSL values in `src/styles/globals.css`.

| Role             | Light     | Dark      | Source token          | Usage                                                  |
| ---------------- | --------- | --------- | --------------------- | ------------------------------------------------------ |
| Background       | `#f8f7f2` | `#141412` | `--background`        | App body and quiet page surfaces.                      |
| Foreground       | `#1a1a1a` | `#f8f7f2` | `--foreground`        | Primary text.                                          |
| Card             | `#ffffff` | `#1e1e1c` | `--card`              | Cards, panels, popover-like elevated surfaces.         |
| Primary          | `#c1a875` | `#d4bc8b` | `--primary`           | Main action, selected accents, focus-related emphasis. |
| Secondary        | `#e5e1d5` | `#2d2b28` | `--secondary`         | Secondary buttons and quieter controls.                |
| Muted            | `#f1ede1` | `#242422` | `--muted`             | Skeletons, table hover, subtle fills.                  |
| Muted foreground | `#6b6352` | `#a39e94` | `--muted-foreground`  | Descriptions, captions, helper text.                   |
| Border/Input     | `#e2decb` | `#2d2b28` | `--border`, `--input` | Borders, separators, input outlines.                   |
| Destructive      | `#d32f2f` | `#ef4444` | `--destructive`       | Errors, destructive actions, invalid form labels.      |

Accessibility guardrails:

- Use `text-foreground` on `bg-background`, `text-card-foreground` on `bg-card`, and `text-primary-foreground` on `bg-primary`.
- Do not place `primary` text on `background` for body copy; reserve primary for action and emphasis.
- Error text should use `text-destructive` with clear labels/messages, not color alone.
- Focus states must use visible `ring-ring` and `ring-offset-background`, as implemented in shadcn primitives.
- Avoid hardcoded colors. Current drift examples include `#f97316`, `#888888`, `bg-zinc-*`, and `bg-white`; prefer semantic tokens unless the value has an approved component role.

## Typography

The current token source defines `--font-sans: Inter, -apple-system, sans-serif`, `--font-serif: Georgia, serif`, `--font-mono: JetBrains Mono, monospace`, and `--tracking-normal: -0.02em` in `src/styles/globals.css`.

Typography rules:

- Use the sans stack for app UI. Prefer `next/font/google` for future font refactors so fonts are optimized by Next.js.
- Use `text-2xl lg:text-3xl font-medium tracking-tight` for management page headings, following `src/app/manage/_components/manage-heading.tsx`.
- Use `text-lg font-semibold tracking-tight` for compact guest-page primary headings.
- Use `text-sm text-muted-foreground leading-relaxed` for descriptions and helper copy.
- Use `text-xs` or `text-[10px]` only for dense metadata, badges, status timestamps, and mobile microcopy.
- Keep line length moderate; dense dashboard panels should favor scannable labels over paragraphs.

## Layout & Spacing

Tailwind spacing is based on the default `4px` scale. Most implemented components use `gap-2`, `gap-3`, `gap-4`, `space-y-4`, `p-4`, `p-6`, and mobile gutters of `px-4`.

Layout rules:

- Dashboard pages use a sidebar shell with `md:ml-[90px]` collapsed and `md:ml-72` expanded, from `src/app/manage/_components/layouts/manage-panel-layout.tsx`.
- Staff dashboard content should use `mt-4` to `mt-8`, `space-y-8`, and grid gaps around `gap-4`.
- Guest pages should stay narrow and mobile-first with `max-w-lg mx-auto w-full px-4`.
- Cards use `p-6` internal spacing by default; form rows commonly use `space-y-4` and field items use `space-y-2`.
- Tables are compact: `text-sm`, header height `h-12`, cells `p-4`, and border-separated rows.
- Touch targets should be at least `40px` high by default, matching `h-10` buttons and inputs; use `44px` or larger when designing mobile-first high-frequency controls.

## Elevation & Depth

Depth is restrained. The system primarily uses borders, muted backgrounds, and small shadows instead of heavy elevation.

Use these layer rules:

- Default cards: `rounded-lg border bg-card text-card-foreground shadow-sm`.
- Sidebar/container depth: `shadow-md` is acceptable for persistent shell surfaces.
- Dialogs and sheets: `shadow-lg` with overlay `bg-black/80` and animated Radix state classes.
- Tables and form sections: prefer `rounded-md border` without heavy shadow.
- Avoid nested cards with multiple strong shadows; use spacing, separators, or `bg-muted/30` instead.

## Shapes

The base radius token is `--radius: 0.5rem` (`8px`) in `src/styles/globals.css`.

Shape rules:

- Buttons, inputs, textareas, selects, skeletons, and table containers use `rounded-md`.
- Cards and mobile image containers commonly use `rounded-lg`.
- Pills and badges use `rounded-full`.
- Select items and small menu rows use `rounded-sm`.
- Dialog content uses `sm:rounded-lg`; full-width mobile presentation is acceptable before the `sm` breakpoint.

## Components

All shared primitives should be implemented or extended in `src/components/ui/**`. Use shadcn/ui `2.3.0` only, installed with `npx shadcn@2.3.0 add component_name`.

Button:

- Source: `src/components/ui/button.tsx`.
- Base: `inline-flex`, `h-10`, `rounded-md`, `text-sm`, `font-medium`, `transition-colors`.
- Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`.
- Required states: hover color shift, `focus-visible:ring-2`, disabled opacity `50`, disabled pointer events off.
- Use icon buttons with `size="icon"`; maintain accessible labels outside decorative SVGs.

Input, Textarea, Select:

- Sources: `src/components/ui/input.tsx`, `src/components/ui/textarea.tsx`, `src/components/ui/select.tsx`.
- Base: `rounded-md border border-input bg-background`, `text-sm`, `placeholder:text-muted-foreground`.
- Focus: visible `ring-2 ring-ring ring-offset-2`.
- Disabled: `cursor-not-allowed opacity-50`.
- Error: pair with `FormLabel` and `FormMessage` using `text-destructive`; keep `aria-invalid` from `FormControl`.

Card:

- Source: `src/components/ui/card.tsx`.
- Base: `rounded-lg border bg-card text-card-foreground shadow-sm`.
- Header/content/footer use `p-6`; avoid arbitrary per-card padding unless density requires it.

Dialog and overlays:

- Source: `src/components/ui/dialog.tsx`.
- Overlay: `bg-black/80`.
- Content: `max-w-lg`, `p-6`, `shadow-lg`, Radix state animations.
- Always include an accessible title and close control.

Badge and status labels:

- Source: `src/components/ui/badge.tsx`.
- Base: `rounded-full border px-2.5 py-0.5 text-xs font-semibold`.
- Status colors should use semantic variants first. If a feature needs a new status palette, add semantic mapping instead of scattering hardcoded utility colors.

Table and data display:

- Sources: `src/components/ui/table.tsx`, `src/components/data-table.tsx`.
- Use `rounded-md border` wrappers, `text-sm`, `hover:bg-muted/50`, and `data-[state=selected]:bg-muted`.
- Loading states should use `Skeleton` from `src/components/ui/skeleton.tsx` or a muted text fallback.

Navigation and shell:

- Management shell uses fixed sidebar widths and `duration-300 ease-in-out` layout transitions.
- Guest surfaces should stay narrow, readable, and mobile-first with compact headers and sticky summaries only when needed.

## Do's and Don'ts

Do:

- Read this file before changing UI, layout, colors, typography, spacing, radius, or component states.
- Use semantic tokens from `tailwind.config.ts` and `src/styles/globals.css`.
- Extend shadcn primitives in `src/components/ui/**` before adding new reusable UI abstractions.
- Keep focus-visible states, keyboard navigation, labels, ARIA descriptions, and error messages intact.
- Use `next/image` for images and keep visual layout shift low.
- Preserve mobile-first guest flows and dense-but-readable staff dashboard layouts.

Don't:

- Do not add CSS Modules, Material UI, Ant Design, styled-components, Emotion, Chakra UI, Tailwind CSS v4, or shadcn/ui newer than `2.3.0`.
- Do not use `npx shadcn@latest`; use `npx shadcn@2.3.0 add component_name`.
- Do not hardcode colors when semantic tokens exist.
- Do not remove visible focus rings or rely on color alone for status/error communication.
- Do not create unrelated card styles, button variants, or typography scales without first checking existing primitives.
- Do not use Tailwind CSS v4 docs, examples, config syntax, or plugin guidance.

Maintainability notes:

- If implementation tokens change, update the YAML front matter first, then prose.
- If `DESIGN.md` and source code disagree, treat source files as evidence and report the mismatch before making broad visual changes.
- Keep this file concise and source-backed; add references to implementation files instead of pasting component code.
