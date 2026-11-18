# LOOT — agent rules

Read in this order before touching code:

1. `docs/LOOT-BLUEPRINT.md` — the spec: choreography, tokens, types, acceptance criteria.
2. `docs/ANTI-SLOP.md` — the quality floor. Non-negotiable, applies to copy, code, and pixels.

## Stack

`next@16` App Router · `react@19` · `typescript@7` (strict) · `tailwindcss@4` (`@theme`, no config file).
No GSAP, Framer Motion, Lenis, or ScrollTrigger. Native sticky + one rAF engine.

## Non-negotiables

- Server components by default. `'use client'` only in files that own a stage or a control.
- No `any`, no non-null assertions, no `as` outside a documented boundary.
- Theme tokens over arbitrary values. The only four allowed `[]` exceptions are listed in
  blueprint §2; anything else extends `@theme` instead.
- Animate `transform`, `opacity`, and custom properties only.
- One scroll listener, one rAF loop, no `setState` per frame.
- **Every scroll beat carries a fact.** If a component cannot name the question it answers
  and the number it shows, it does not ship.
- `prefers-reduced-motion` renders the complete editorial stack. Never a degraded apology.
- Violet is light, never body ink. One lime signal element per viewport.
- Every number is either computed by the product's own model or sourced. No invented metrics.

## Banned shorthand

Words: next-gen, seamless, effortless, unlock, elevate, supercharge, revolutionary,
cutting-edge, zero-latency, AI-powered, game-changing.

Patterns: gradient text · glassmorphism · glow without a light source · three equal cards ·
centred-everything · fake browser chrome · fake live dot · emoji icons · tech badge lists ·
`01 / 02 / 03` outside a true sequence · parallax on body text · unsourced statistics ·
testimonials with stock faces.

Full list with replacements: `docs/ANTI-SLOP.md`.

## Verify before saying done

```bash
npx tsc --noEmit
npx next build
```

Then run the `rg` checks in `docs/ANTI-SLOP.md` §7 and the review protocol in §8.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
