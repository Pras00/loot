---
name: scrollytelling-design
description: >-
  Use this skill whenever designing, architecting, or implementing scrollytelling,
  scroll-hijacking, scroll-driven animations, spatial landing pages, interactive
  portfolios, or multi-act narrative websites. Combines the proven choreography
  of 13322566869.com, igloo.inc, GRID (object-led assembly), and peär.
  (neo-classical blueprint scrollytelling) with a 5-Axis Generative Improvisation
  Matrix so every website features bespoke, non-repetitive, 60fps spatial
  scroll mechanics without generic slide-by-slide AI slop.
metadata:
  version: "2.0.0"
  tags: "scrollytelling, scroll-hijacking, spatial-web, chiaroscuro, animation, landing-page, portfolio, anti-ai-slop, responsive-scrollytelling"
---

# Scrollytelling & Spatial Scroll-Hijacking Design System (v2.0)

Use this skill to design and engineer award-caliber **scrollytelling and scroll-hijacking web experiences** that feel tactile, human, spatial, and cinematically choreographed—never like a monotonous stack of vertical slides with generic fade-up animations or robotic AI-slop telemetry.

This system is built on a **Dual-Engine Philosophy**:
1. **Immutable Core Laws**: Non-negotiable physics, pacing, depth occlusion, humanized copywriting, visual authenticity, and mobile `100svh` density rules that keep scroll-driven interfaces legible, responsive, and 60fps smooth across Desktop, Tablet, and Mobile.
2. **Seed Archetypes + Generative Improvisation**: A foundation of 10 battle-tested choreography archetypes (distilled from `13322566869.com`, `igloo.inc`, the `3D-porto` Chiaroscuro & Editorial Spatial Gallery, `GRID`, and `peär.`) paired with a **5-Axis Improvisation Matrix** that empowers you to invent brand-new, domain-specific scroll mechanics, layouts, and interactive widgets for every project.

---

## Reference Library (Progressive Disclosure)

Load these reference manuals as needed during planning and implementation:

1. **[Choreography Catalog (10 Seed Archetypes)](./references/choreography-catalog.md)** — Detailed breakdown of the 10 foundational scrollytelling mechanics, their scroll phase timelines (`0.00 -> 1.00`), and structural anatomy.
2. **[5-Axis Generative Improvisation Matrix](./references/improvisation-matrix.md)** — How to invent new scroll mechanics, custom UI widgets, camera vectors, and domain metaphors beyond the 10 seed archetypes.
3. **[Scroll Math & Physics Engine](./references/scroll-math-engine.md)** — Complete TypeScript implementation of `scrollMath.ts` (`useSectionScrollProgress` with frame-rate independent exponential damping, `easedRange`, `bellCurve`, stepped dwell-vs-transition math, and `prefers-reduced-motion`).
4. **[Depth, Surface Rhythm & Anti-Slop Guardrails](./references/anti-slop-guardrails.md)** — The 4-Plane Z-Index Sandwich, act-to-act tonal contrast choreography, typography rules, and strict bans against generic AI scroll slop.

---

## The 6 Immutable Laws of Scrollytelling

No matter how experimental or bespoke a design is, **every scrollytelling page must obey these 6 laws**:

### Law 1: Sticky Stage + Scroll Runway Architecture
Never hijack or break the browser's native scrollbar with heavy external scroll-jacking libraries when a native sticky runway can achieve deterministic 60fps control:
- **Outer Container (`<section>`)**: Defines the **scroll runway** via `minHeight` (typically `240vh` to `420vh` depending on narrative density) and holds `ref={sectionRef}`.
- **Inner Stage (`<div>`)**: Uses `sticky top-0 h-svh w-full overflow-hidden` as the fixed theatrical stage where spatial transformations unfold as normalized progress `p ∈ [0, 1]` advances. Using `h-svh` (Small Viewport Height) prevents mobile browser address-bar resize jumps.
- **Exception (Adaptive Tactile Card Stacking)**: Physical stacking stages use `sm:sticky sm:top-22`, `sm:top-26`, `sm:top-30` on individual child `<article>` sheets inside a naturally flowing parent grid so cards stack tactilely on tablet/desktop while flowing cleanly without premature text occlusion on single-column mobile screens.

### Law 2: The Dwell vs. Transition Principle (Readable Pacing)
The #1 failure of amateur scroll-hijacking is continuous linear motion where text drifts past the user's eyes before they can read or click it.
- Every narrative beat **must** be divided into a **Dwell Zone** (where typography, cards, and interactive buttons lock into a stable, high-contrast plateau) and a **Transition Zone** (where camera dives, wipes, object assemblies, or atmospheric mist bursts occur).
- For multi-item showcases (e.g., 3–6 projects or chapters), use **stepped dwell math** (`transitionRatio ≈ 0.40–0.48`) so the user spends ~65% of their scroll distance comfortably inspecting content and ~35% transitioning between items.

### Law 3: The 4-Plane Depth Sandwich & Subject Occlusion
Flat scrollytelling feels like PowerPoint. Every sticky stage must orchestrate **4 distinct depth planes** moving at different vectors or rates, using **true optical occlusion**:
- **Plane 1 (`z-0` — Chiaroscuro Canvas / Backdrop)**: Full-bleed tonal surface, diagonal tungsten light shaft (`radial-gradient` / `conic` lighting), or architectural grid.
- **Plane 2 (`z-10` — Mid-Back Monumental Typography)**: Oversized display typography (e.g., split `"CODE" / "TO"` at top corners and centered `"CRAFT"`), orbital SVG trajectories, or geometric arcs placed **behind** the focal subject.
- **Plane 3 (`z-20` — Foreground Cutout Subject / Focal Anchor)**: The cutout portrait silhouette (with warm rim lighting), 3D object, or portal frame that **physically overlaps and partially occludes** Plane 2 typography, creating genuine 3D depth on a 2D screen.
- **Plane 4 (`z-30` — Negative-Space Editorial HUD)**: Asymmetric corner HUD anchored in the bottom negative space (`bottom-left` identity & staccato manifesto; `bottom-right` concise bio & tactile pill actions) over a subtle bottom vignette. Fade out Plane 4 early (`p: 0.04 -> 0.20`) before camera docking/zooming so text never collides mid-transition.

### Law 4: Act-to-Act Vector & Tonal Contrast
Never repeat the same scroll mechanic or background tone in two consecutive sections (`Acts`):
- **Vector Alternation**: If Act 1 moves along the **Z-axis** (e.g., docking a chiaroscuro stage into a 3×3 mosaic and diving through the center portal), Act 2 must shift to a **lateral X-axis monolith wipe**, **vertical sheet peel**, or **radial scatter-to-converge**.
- **Tonal Alternation**: Alternate the canvas temperature across acts (e.g., *Matte Obsidian `#0e0e10`* → *Warm Alabaster Paper `#ffffff` / `#f4f3ef`* → *Deep Atmospheric Scene* → *Warm Stone `#e4e2da`*). This creates a physical sense of entering and exiting distinct architectural rooms.

### Law 5: Humanized Copywriting, Authentic Imagery & Zero AI-Slop Telemetry
- **Zero Self-Bragging Technical Badges**: Never litter the UI (or companion admin/CMS pages) with robotic engineering bragging pills or internal metadata (`"60FPS Spatial Canvas"`, `"WebGL2 Engine"`, `"Zero-Latency"`, `"PostgreSQL Active"`, `"Editorial Reveal"`, `"001 / 005 — PORTAL"`, or `"ID: proj-2"`). Let the smoothness of the choreography prove the engineering quality.
- **Authentic Web/Product Imagery over Abstract Vectors**: Inside 3×3 mosaic tiles and project showcase cards, never use generic abstract SVG boxes or fake wireframe diagrams. Use realistic, high-contrast dark-mode website hero screenshots or authentic product renders, and keep outer mosaic tiles **100% pure visual bleed** (zero text labels overlaid on outer tiles).
- **Single-Identity Rule**: Never duplicate the brand logo in both the top floating HUD and the hero body directly below it.

### Law 6: 60fps GPU-Only, Reduced-Motion & Mobile `100svh` Density Budget
- Animate **only** compositor-friendly properties (`transform: translate3d(...) scale(...) rotate(...)` and `opacity`).
- Smooth raw scroll jumps using frame-rate independent exponential damping (`alpha = 1 - Math.exp(-dampingRate * dt)` with `dampingRate ∈ [10, 13]`).
- **Mobile & Tablet `100svh` Vertical Density Budget**: Keep scrollytelling / scroll-hijacking 100% active on mobile (`375×667px`) and tablet (`768×1024px`) by compacting vertical height inside `h-svh overflow-hidden` stages—render tag lists as horizontal flex-wrap pills on mobile (`flex flex-wrap gap-1.5 sm:block`), apply `line-clamp-2`/`line-clamp-3` on mobile (`sm:line-clamp-none`), and use responsive thumbnail heights (`h-24 sm:h-36 lg:h-44`) so content never overflows or clips during scroll-hijacking.
- Always detect `prefers-reduced-motion: reduce` and render a clean, accessible, non-hijacked editorial layout when active.

---

## Workflow: How to Design a Scrollytelling Website

Follow this 4-step workflow whenever the user asks to create or redesign a scrollytelling / scroll-hijacking page:

### Step 1: Establish Subject Matter & Tonal World
1. Identify the product/brand domain, target audience, and emotional register (e.g., *Editorial Spatial Gallery*, *Fine-Art meets Technical Blueprint*, *Warm Tactile Culinary/Craft*, *Precision Hardware Studio*).
2. Define a **3-Layer Design Token Palette** in `globals.css` (`@theme inline`) featuring at least:
   - Two dark architectural surfaces (e.g., Obsidian & Charcoal)
   - Two warm light editorial surfaces (e.g., Paper & Ivory/Stone)
   - One or two deliberate signal accents (e.g., Warm Tungsten `#f59e0b`, Electric Cobalt `#0E47D8`, Vermilion, or Emerald).

### Step 2: Compose the Multi-Act Storyboard (Mix Seed Archetypes + Improvisation)
Read [choreography-catalog.md](./references/choreography-catalog.md) and [improvisation-matrix.md](./references/improvisation-matrix.md). Plan a sequence of **4 to 6 Acts** where every Act has a distinct spatial mechanic:
- **Select 2–3 Seed Archetypes** from the catalog that fit the narrative structure (e.g., *Portal Window Dive*, *Monolith Shrink Wipe*, *Stepped Dwell + Atmospheric Mist*, *Persistent Object Assembly*, *Reverse-Portal Frame Docking*, or *Scatter-to-Converge*).
- **Improvise 1–2 Bespoke Domain Mechanics** using the [5-Axis Improvisation Matrix](./references/improvisation-matrix.md) so the website has signature interactive moments unique to its subject matter (e.g., *Exploded Product Dissection*, *Interactive SVG Constellation Graph*, *Counter-Scrolling Split Hemisphere*, or *Wireframe-to-Live-UI Morph*).
- Present a concise **Act-by-Act Storyboard Table** (Act #, Title, Scroll Runway `vh`, Tonal Surface, Spatial Mechanic, Dwell Content) if the user asked for a plan first, or proceed directly to implementation.

### Step 3: Implement the Scroll Math Engine & Stage Components
1. Ensure `scrollMath.ts` is present with `useSectionScrollProgress`, `clamp`, `lerp`, `smoothstep`, `rangeProgress`, `easedRange`, and `bellCurve` (see [scroll-math-engine.md](./references/scroll-math-engine.md)).
2. Build each Act as a self-contained, strongly-typed component (zero `any`, zero arbitrary Tailwind brackets where theme tokens apply).
3. Include a floating **Editorial Scroll Indicator** (`EditorialScrollIndicator`) so the user always knows where they are in the narrative and can click any dot to smooth-scroll directly to that Act or sub-item.

### Step 4: Self-Critique Against Anti-Slop Guardrails
Before finishing, audit your implementation against [anti-slop-guardrails.md](./references/anti-slop-guardrails.md):
- Verify that no two adjacent sections use the same animation direction.
- Verify that every text block has a stable dwell window (`opacity: 1`, `translate3d(0,0,0)`) for at least `15%–25%` of the section's scroll progress, and that hero corner HUDs fade out early before stage docking/zooming so text never collides.
- Verify zero self-bragging technical badges (`"60FPS"`, `"WebGL2"`, `"001 / 005"`) and zero duplicate logos.
- Verify that every sticky `h-svh` stage fits 100% cleanly on a `375×667px` mobile viewport and `768×1024px` tablet viewport without vertical clipping.
- Verify that interactive buttons (`pointer-events-auto`) are never blocked by invisible overlay layers (`pointer-events-none`).
- Run TypeScript verification (`tsc --noEmit`) and production build checks.

