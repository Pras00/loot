---
name: scrollytelling-design
description: >-
  Use this skill whenever designing, architecting, or implementing scrollytelling,
  scroll-hijacking, scroll-driven animations, spatial landing pages, interactive
  portfolios, or multi-act narrative websites. Combines 7 immutable engineering
  and editorial laws, a zero-re-render CSS custom property scroll engine, 13
  seed choreography archetypes, and a 5-Axis Generative Improvisation Matrix
  with a Transmute-Never-Clone originality mandate so every website is bespoke,
  human, 60fps, and free of monotonous AI slop.
metadata:
  version: "3.0.0"
  tags: "scrollytelling, scroll-hijacking, spatial-web, editorial-typography, animation, landing-page, portfolio, anti-ai-slop, css-custom-properties, responsive-scrollytelling"
---

# Scrollytelling & Spatial Scroll-Hijacking Design System (v3.0)

Use this skill to design and engineer award-caliber **scrollytelling and scroll-hijacking web experiences** that feel tactile, human, architectural, and cinematically choreographed—never like a monotonous stack of fade-up slides, a boxed SaaS card template, or a clone of another site.

This system runs on a **Dual-Engine Philosophy**:
1. **7 Immutable Core Laws**: Non-negotiable physics, zero-re-render CSS variable scheduling, SSR hydration safety, readable dwell pacing, clear narrative facts, humanized copywriting, and dual Laptop + Mobile `100svh` density rules.
2. **Seed Archetypes + Open Creative Exploration**: A library of 13 proven choreography archetypes paired with a **5-Axis Improvisation Matrix** and the **Transmute, Never Clone** protocol. **References in this skill are sparks of craft, never mandatory templates**—actively explore fresh visual worlds, typography systems, color temperatures, and domain-native mechanics for every new project so no two sites feel repetitive.

---

## Reference Library (Progressive Disclosure)

Load these reference manuals as needed during planning and implementation:

1. **[Choreography Catalog (13 Seed Archetypes)](./references/choreography-catalog.md)** — 13 battle-tested scrollytelling mechanics, phase timelines (`0.00 -> 1.00`), and structural anatomy (including diagonal reality scrubbers, brand-emblem 3D split dives, hairline index lists, and CAD X-Ray scrubbers).
2. **[5-Axis Generative Improvisation Matrix](./references/improvisation-matrix.md)** — How to invent original scroll mechanics, direct-manipulation widgets, camera vectors, and domain metaphors—plus the **Transmute, Never Clone** originality protocol.
3. **[Scroll Math & Physics Engine](./references/scroll-math-engine.md)** — Zero-re-render single-loop `engine.ts` + `useStage` + pure `choreography.ts` writing CSS custom properties, `@property` live counters, zero-seam runway overlaps, and SSR pre-hydration fallback discipline.
4. **[Depth, Typography & Anti-Slop Guardrails](./references/anti-slop-guardrails.md)** — The 4-Plane Z-Index Sandwich, gigantic light-weight editorial typography, plain human copywriting, hairline-over-cards discipline, dual Laptop/Mobile `100svh` budgets, and strict anti-slop bans.

---

## The 7 Immutable Laws of Scrollytelling

No matter how experimental or bespoke a design is, **every scrollytelling page must obey these 7 laws**:

### Law 1: Sticky Stage + Scroll Runway Architecture (Zero-Seam)
Never hijack or break the browser's native scrollbar with heavy external scroll-jacking libraries when a native sticky runway delivers deterministic 60fps control:
- **Outer Container (`<section>`)**: Defines the **scroll runway** via `min-height` (typically `260svh` to `540svh` depending on narrative beats) and holds `ref={sectionRef}`.
- **Inner Stage (`<div>`)**: Uses `sticky top-0 h-svh w-full overflow-hidden` so spatial transformations unfold deterministically as normalized progress `p ∈ [0, 1]` advances. Always use `h-svh` (Small Viewport Height) to prevent mobile address-bar resize jumps.
- **Zero-Seam Overlaps**: When transitioning seamlessly between consecutive sticky acts without dead `100svh` scroll gaps, overlap the incoming `<section>` (`margin-top: -150svh`) and gate its visibility cleanly via `--stage-o` (`0` until `p > 0.002`) plus `pointer-events-none` on the outer shell and `pointer-events-auto` on the active surface.
- **Exception (Adaptive Stacking)**: Physical stacking sheets use `sm:sticky` on child `<article>` elements inside a flowing grid so they stack tactilely on tablet/desktop while flowing naturally without occlusion on narrow mobile screens.

### Law 2: The Dwell vs. Transition Principle (Readable Pacing)
The #1 failure of amateur scroll-hijacking is continuous linear motion where text drifts past the user's eyes before they can read or click it.
- Every narrative beat **must** separate its **Dwell Zone** (typography, inspector cards, and controls lock stationary at `opacity: 1`, `translate3d(0,0,0)` for `>= 15%–25%` of the stage) from its **Transition Zone** (camera dives, wipes, emblem splits, or atmospheric sweeps).
- For multi-item showcases (3–6 items), use **stepped dwell math** (`transitionRatio ≈ 0.40–0.48`) so visitors spend ~65% of scroll distance reading/interacting and ~35% transitioning.

### Law 3: The 4-Plane Depth Sandwich & Focal Occlusion
Flat scrollytelling feels like a slide deck. Every sticky stage orchestrates **4 distinct depth planes** moving at different vectors or rates:
- **Plane 1 (`z-0` — Architectural Canvas / Lighting)**: Full-bleed tonal room, directional light source, diagonal split plane, or `1px` drafting grid.
- **Plane 2 (`z-10` — Mid-Back Monumental Context)**: Oversized display typography, custom brand-emblem 3D monument, or geometric construction arcs positioned **behind** the focal subject.
- **Plane 3 (`z-20` — Focal Subject / Interactive Artifact)**: The product object, physical hardware card, custom brand sculpture, cutout subject, or live interactive frame that **physically overlaps and partially occludes** Plane 2 for genuine optical depth. Keep hero objects whole and legible—never slice a product awkwardly unless an interactive CAD/X-Ray inspection is the explicit point.
- **Plane 4 (`z-30` — Negative-Space Editorial HUD)**: Asymmetric corner HUD anchored in negative space. Fade out Plane 4 early (`p: 0.06 -> 0.18`) before any camera dive or stage shrink so text never collides mid-transition.

### Law 4: Act-to-Act Vector & Tonal Contrast
Never repeat the same scroll mechanic or background temperature in two consecutive sections:
- **Vector Alternation**: Alternate camera vectors across adjacent acts (e.g., Z-axis Emblem Split Dive → Curtain Reveal + Hairline Index → SVG Thread Construction → Lateral Wipe + Interactive Scrubber → Editorial Proof & Full-Bleed Footer).
- **Tonal Alternation**: Shift room polarity between acts (e.g., *Deep Charcoal* → *Warm Alabaster* → *Drafting Stone* → *Obsidian Studio* → *Light Dossier + Dark Footer*) so visitors feel like they are walking through distinct physical rooms.

### Law 5: One Fact Per Beat, Plain Human Voice & Anti-Card Discipline
- **Every Scroll Beat Carries One Clear Fact**: Name the single question a section answers and the concrete proof/number it shows. Never dump "number soup" (a dozen disconnected KPIs) or stiff, mechanical corporate jargon onto one screen. Write in short, vivid, human sentences (*"You tap once. It splits four ways."*, *"Phone off. Still works."*).
- **Hairline Architecture Over Card Soup**: Avoid wrapping everything in repeated rounded boxes, glassmorphism blur, or floating oval pill clusters. Prefer full-width `1px` hairline index rows, flush underline tab strips, generous negative space, and at most one focal preview artifact per stage.
- **Zero AI-Slop Telemetry & Duplicate Logos**: Never ship self-bragging badges (`"60FPS Engine"`, `"Zero-Latency"`, `"Next-Gen"`, `"AI-Powered"`, `"001 / 005 — PORTAL"`) or duplicate the brand logo in both navbar and hero body.

### Law 6: Transmute, Never Clone (Originality Mandate)
Studying great websites (`dennypratama.com`, `igloo.inc`, `13322566869.com`, `GRID`, `peär.`, and beyond) is for mastering **craft principles**—never for copying signatures 1:1:
- **Own the Geometry**: Build centerpiece 3D/wireframe monuments and scroll-drawn animations from the **brand's own custom geometric emblem or product geometry**, never another site's monogram or generic shapes.
- **Own the Telemetry & Layout**: Replace any reference gimmick (e.g., a bottom-center `000°` degree counter + bottom-left text stack) with **product-truth telemetry** (e.g., a `0.00s -> 0.40s` chip execution strip at top-center + quadrant-anchored statements) that only makes sense for this product.
- **Explore Beyond the Catalog**: Do not lock into one font (`Archivo`), one angle (`23.6°`), or one palette. Choose typography, rhythm, and mechanics fresh for every brand's identity.

### Law 7: Zero-Re-Render 60fps Engine, SSR Safety & Dual Viewport `100svh` Budget
- **Single-Loop CSS Custom Property Engine**: Use **one** passive `scroll` listener and **one** batched Read-then-Write `requestAnimationFrame` loop for the whole page, writing CSS custom properties (`--p`, `--dive`, etc.) directly to stage elements—**zero React `setState` per frame**, 0% idle CPU when settled (`|delta| < 0.0004`). Animate only `transform`, `opacity`, `clip-path`, and custom properties.
- **SSR Pre-Hydration Fallback Discipline**: Every scroll-driven element that starts hidden MUST declare both a CSS fallback (`opacity: var(--frame-0, 0)`) and an `@property` `initial-value: 0` in `globals.css` so SSR initial paint never flashes overlapping text before JS hydrates.
- **Dual `100svh` Vertical Budget (Laptop + Mobile)**: Every `sticky top-0 h-svh overflow-hidden` stage must fit cleanly with zero bottom clipping on **both** standard laptop viewports (`1366×768`, usable browser height `~610px`) **and** phones (`375×667`). Center floating previews vertically (`md:inset-y-0 md:flex md:items-center`) instead of pinning to `bottom`, and apply `whitespace-nowrap tabular` to currency/metric figures so values never wrap awkwardly onto two lines.
- **Full Reduced-Motion Equivalence**: Detect `prefers-reduced-motion: reduce` and render the complete editorial story as normal flowing sections—never a degraded apology.

---

## Workflow: Designing a Scrollytelling Website

### Step 1: Establish Brand World, Narrative Spine & Typography
1. Define the product domain, emotional register, and **1-question-per-act narrative spine** (4–6 Acts).
2. Choose an intentional **Typography System** tailored to the brand (e.g., a single variable sans with gigantic light `300` display scales and tight negative tracking, OR a high-contrast editorial serif + grotesk pairing). Eliminate the "muddy middle": pair gigantic display headlines with crisp micro/body-sm copy and generous negative space.
3. Define a **3-Layer Design Token Palette** in `globals.css` (`@theme` primitives → `@theme inline` semantic tokens → per-room surface utilities) with strict accent discipline (typically one dominant signal accent per viewport).

### Step 2: Compose an Original Multi-Act Storyboard
Read [choreography-catalog.md](./references/choreography-catalog.md) and [improvisation-matrix.md](./references/improvisation-matrix.md):
- Select 1–2 **Seed Archetypes** as structural starting points, then **transmute** them into the brand's own geometry and story.
- Improvise 1–2 **bespoke domain mechanics** using the 5-Axis Matrix so the experience feels unmistakably original.
- If the user wants alignment first, present a concise **Act-by-Act Storyboard** (Act, Question Answered, Runway `svh`, Surface Tone, Spatial Mechanic, Interactive Control) before coding.

### Step 3: Architect Clean, Feature-Sliced Code
Organize the codebase cleanly by layer and feature:
- `src/lib/scroll/` — `engine.ts` (single rAF scheduler), `math.ts` (pure easing), `use-stage.ts` (React hook)
- `src/components/brand/` — custom SVG emblem (`brand-mark.tsx`) & flagship product artifacts
- `src/components/navigation/` — floating chapter rail (`section-rail.tsx`) with surface-aware polarity
- `src/components/sections/<feature-name>/` — paired `<name>-section.tsx` + pure `choreography.ts` (keeping scroll math decoupled from JSX) + `reduced-motion-story.tsx`

### Step 4: Self-Audit Against Anti-Slop & Build Gates
Before finishing, verify against [anti-slop-guardrails.md](./references/anti-slop-guardrails.md):
- Zero adjacent acts sharing the same camera vector or surface tone.
- Every scroll-hidden element has CSS fallback defaults (`var(--x, 0)`) and `@property` declarations (zero SSR reload flash).
- Zero bottom clipping inside `h-svh` at both `1366×620` (laptop) and `375×667` (mobile); zero wrapped currency/metric figures (`whitespace-nowrap`).
- Zero card soup, glassmorphism blur, floating capsule pill clusters, dead files, or `setState`-per-frame loops.
- Interactive controls (`pointer-events-auto`) are never blocked by invisible overlays (`pointer-events-none`).
- Run `npx tsc --noEmit` and production build (`npx next build`) cleanly.
