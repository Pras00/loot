# Scrollytelling Choreography Catalog (10 Seed Archetypes)

This catalog documents the **10 foundational scrollytelling archetypes** distilled from four benchmark references:
1. **`prazzz.vercel.app` (3D-Porto) & `13322566869.com`** (*Editorial Spatial Gallery*)
2. **`igloo.inc`** (*Atmospheric Mist & Stepped Telemetry Showcase*)
3. **`GRID` Belgian Waffle Concept** (*Object-Led Progressive Assembly & Split-Stage Wipe*)
4. **`peär.` Creative Capital Concept** (*Neo-Classical Fine-Art meets Blueprint Grid*)

Use these 10 archetypes as **proven building blocks**, and combine or mutate them using the [5-Axis Improvisation Matrix](./improvisation-matrix.md).

---

## Archetype 01: Chiaroscuro Subject Occlusion -> 3x3 Mosaic Docking -> Portal Window Dive
* **Source Inspiration:** `13322566869.com`, Fine-Art Chiaroscuro Portraiture & `PortalWindowHero.tsx`
* **Best Used For:** Act 1 Hero / Opening Signature Stage.
* **Spatial Concept:** Instead of starting immediately as a busy 9-tile grid, the hero unfolds across **three seamless spatial phases** inside a `340vh` sticky runway:
  1. **Act 1A — Full-Screen 4-Plane Chiaroscuro Stage with Subject Occlusion (`0.00 -> 0.16`):**
     - **Plane 1 (`z-0`):** Deep obsidian canvas (`#09090b`) lit by a warm diagonal tungsten light shaft (`#f59e0b`).
     - **Plane 2 (`z-10`):** Monumental display typography (`"CODE"` top-left, `"TO"` top-right, `"CRAFT"` centered) rendered **behind** the subject.
     - **Plane 3 (`z-20`):** Foreground cutout portrait silhouette (`/praz-silhouette.webp`) with warm rim lighting that **physically occludes** the center word (`"CRAFT"`), creating genuine optical depth. Differential parallax moves Plane 2 slightly upward (`0 -> -44px`) and Plane 3 subtly downward/forward (`0 -> +18px`, `scale: 1 -> 1.035`).
     - **Plane 4 (`z-30`):** Asymmetric corner editorial HUD anchored in the bottom negative space (`bottom-left`: Location/Status, 3-line poetic staccato statement, Name/Role; `bottom-right`: concise bio + tactile pill actions). Plane 4 fades out early (`0.04 -> 0.20`) so it never collides when the stage shrinks.
  2. **Act 1B — Reverse-Docking into the 3x3 Visual Gallery (`0.16 -> 0.44`, Dwell `0.44 -> 0.56`):**
     - The full-screen Chiaroscuro stage scales down (`scale: 1 -> 0.315`), rounds its corners (`rounded-none -> rounded-2xl`), and docks directly into **Tile 5 (the Center Portal Window)** of a `3x3` full-bleed visual gallery (`scale: 1.16 -> 1.0`).
     - All 8 outer tiles display **100% pure full-bleed dark-mode website hero screenshots** (zero text overlays or category clutter on outer tiles), while the center tile displays a clean studio wordmark (`"PRAZ STUDIO"`).
  3. **Act 1C — Camera Dive Through the Center Portal (`0.56 -> 0.98`):**
     - The entire `3x3` mosaic scales up (`scale: 1 -> 3.48`) so the center portal expands past the edges of the viewport while the 8 outer tiles fade away, pulling the visitor into Act 2.

---

## Archetype 02: Reverse-Portal / Fullscreen-to-Framed-Card Docking
* **Source Inspiration:** `peär.` (`00:08 – 00:10`, Fresco Scaffolding -> Framed Square Plan)
* **Best Used For:** Transitioning from an immersive full-screen visual story into a structured 2-column editorial explanation (e.g., Pricing, Architecture, Philosophy).
* **Spatial Concept:** The exact inverse of Archetype 01. The stage begins as a `100vw x 100svh` full-bleed visual scene (an illustration, 3D canvas, or photography sequence). As scroll progresses, the camera tilts/zooms out and the entire full-screen canvas **scales down (`scale: 1 -> 0.44`) and translates horizontally (`translateX: 0 -> -24vw`)** to dock neatly inside a framed square/portrait card in the left column, while the right column reveals high-contrast editorial copy on a clean light background.
* **Phase Timeline (`minHeight: 260vh`):**
  - `0.00 -> 0.30` (**Fullscreen Immersion**): Full-bleed visual scene fills `100vw x 100svh` with a short overlay caption.
  - `0.30 -> 0.70` (**Frame Docking**): Scene container animates `width/scale`, `borderRadius` (`0px -> 20px`), and `translate3d` to dock into the left 5 columns of a 12-column grid, adding a crisp architectural border frame.
  - `0.58 -> 1.00` (**Editorial Dwell**): Right 6 columns fade and slide in with structured headline, body copy, and interactive callouts.

---

## Archetype 03: Persistent Central Object Assembly (Object-Led Scrollytelling)
* **Source Inspiration:** `GRID` Waffle Concept (`00:00 – 00:05`)
* **Best Used For:** Product features, hardware anatomy, culinary/craft storytelling, or multi-layer software architecture.
* **Spatial Concept:** A single hero object stays **pinned (`sticky`) in the exact center of the viewport** across 4–5 scroll chapters. Rather than scrolling the object away, each scroll chapter **adds a new layer, attachment, or state** onto the central object while the background and typography behind it morph.
* **Phase Timeline (`minHeight: 380vh`):**
  - `0.00 -> 0.20` (**Base State**): Core object floats in center surrounded by a thin orbital SVG ring (`1px` stroke + curved path text).
  - `0.20 -> 0.45` (**Layer +1 Attachment**): Second component drops/scales onto the core object (`translateY: -120px -> 0`, spring/smoothstep easing) while background splits into contrasting top/bottom halves.
  - `0.45 -> 0.70` (**Dynamic Pour / Active Stream**): Third element flows from top edge or sides into the center object while headline updates on the left.
  - `0.70 -> 1.00` (**Final Plated / Assembled State**): A base/pedestal rises from below (`translateY: 80px -> 0`), interactive circular variant tokens appear above, and the completed object settles into a balanced two-column editorial spread.

---

## Archetype 04: Multi-Zone Split Background Wipe (Independent Hemispheres)
* **Source Inspiration:** `GRID` (`00:01 – 00:04`)
* **Best Used For:** Comparing dual capabilities, contrasting flavors/modes, or keeping multi-chapter product tours visually electric.
* **Spatial Concept:** Behind a pinned foreground subject, the background canvas is divided into **Top and Bottom (or Left and Right / Diagonal) zones** that wipe and change color palettes independently (`Cream #F5F0E6` ↔ `Espresso Charcoal #181818` ↔ `Warm Cocoa #5C3A21` ↔ `Terracotta #C84B31`).
* **Key Detail:** While the top half displays dark-mode typography (`"COLD ON GOLD"`) with dark secondary floating props on the right, the bottom half simultaneously displays light-mode typography (`"BRIGHT BY NATURE"`) with warm abstract SVG shapes—creating a rich magazine spread that shifts planes on scroll.

---

## Archetype 05: Monolith Shrink & Contrast Curtain Morph
* **Source Inspiration:** `13322566869.com` & `ContrastCurtainMorph.tsx`
* **Best Used For:** Act 2 Bridge — transitioning from a dark opening hero into a bright ivory/paper exhibition section (or vice versa).
* **Spatial Concept:** Starts as a `100%` full-bleed matte charcoal screen with a centered transitional statement. As the user scrolls, the dark screen **insets from the viewport edges (`0px -> 16px`), rounds its corners (`0px -> 24px`), and shrinks its width (`100% -> 27%`)** into a vertical monolith card on the left side, uncovering a bright alabaster/paper canvas underneath with large kinetic typography. Finally, the monolith glides off-screen to the left (`translateX: 0 -> -125%`).
* **Phase Timeline (`minHeight: 240vh`):**
  - `0.00 -> 0.28`: Opening statement on dark canvas.
  - `0.16 -> 0.62`: Dark monolith shrinks to `27%` width, revealing Headline 1 (`"NEXT, LET'S TAKE A LOOK"`) on the bright right-hand canvas.
  - `0.72 -> 0.98`: Monolith exits left while Headline 1 morphs into Headline 2 (`"Selected works · 001 — 004"`).

---

## Archetype 06: Stepped Dwell Showcase + Igloo Atmospheric Mist Sweep
* **Source Inspiration:** `igloo.inc` & `ExhibitionWorksStage.tsx`
* **Best Used For:** Selected Works, Case Studies, or Flagship Feature Deep-Dives.
* **Spatial Concept:** Combines a **Sheet Peel entrance** (`0.00 -> 0.20`) with a **Stepped Dwell Showcase** (`0.21 -> 1.00`). Each project locks solidly in place during its dwell window. When scrolling from Project $i$ to Project $i+1$, a bell-curve **atmospheric mist veil** (`mistIntensity = Math.sin(rawT * Math.PI)`) sweeps across the viewport accompanied by subtle dual-ghost chromatic aberration (`translateX(±10px)` in cyan/amber) and a vertical parallax swap.
* **Key Formula:**
  - `transitionRatio = 0.46`
  - `unit = 1 / (count + (count - 1) * transitionRatio)`
  - During `local <= dwellWidth`: `blend = 0`, `mistIntensity = 0` (100% rock-solid readability).
  - During `local > dwellWidth`: `blend = smoothstep(rawT)`, `mistIntensity = Math.sin(rawT * Math.PI)`.

---

## Archetype 07: Interactive Object Slicing / Surgical Split-Apart
* **Source Inspiration:** `peär.` (`00:04 – 00:05`, Golden Pear Sliced in Half) & Hardware Exploded Views
* **Best Used For:** Explaining business models ("sharing the upside"), system architecture layers, or internal product craftsmanship.
* **Spatial Concept:** A unified hero object (a golden fruit, a hardware device, a credit card, or a UI stack) sits at the center of an architectural grid. As the user scrolls through the transition range, the object **cleanly separates into two (or more) halves** along a horizontal, vertical, or Z-axis vector (`leftHalf: translateX(-delta)`, `rightHalf: translateX(+delta)`), exposing internal details, annotations, or callout lines between the separated pieces.

---

## Archetype 08: Scattered Fragments Converging to Unified Order
* **Source Inspiration:** `13322566869.com` & `ScatterConvergeStage.tsx`
* **Best Used For:** Capabilities, Tech Stack, Ecosystem Integrations, or "How We Bring Everything Together".
* **Spatial Concept:** Six to eight domain cards and sliced SVG geometric emblem arcs start scattered across the viewport with deterministic 2D offset vectors (`xVw`, `yVh`) and rotations (`deg`). A monumental question sits in the center (`"NEED SOMEONE WHO CAN HANDLE IT?"`). As the user scrolls (`0.10 -> 0.68`), `scatterAmount = 1 - easedRange(p, 0.10, 0.68)` drives all vectors and rotations to `0`, locking the scattered cards into a crisp Bento grid and uniting the sliced SVG arcs into a complete geometric circle.

---

## Archetype 09: Blueprint Grid, Point-Cloud Morph & SVG Constellation Graph
* **Source Inspiration:** `peär.` (`00:00, 00:06–00:07, 00:13–00:16`)
* **Best Used For:** Process steps, AI/Data intelligence, Roadmap/Application flow, or Neo-Classical/Technical brand storytelling.
* **Spatial Concept:**
  1. **Technical Blueprint Surface**: Electric cobalt (`#0E47D8`) or alabaster gray (`#E8EAED`) overlaid with a `1px` architectural grid and `+` crosshair markers at intersections.
  2. **Halftone / Point-Cloud Subject**: A 3D orstippled ASCII/dot-matrix render of the subject rotates or scales on one side while technical copy sits on the other.
  3. **Scroll-Drawn Constellation**: As scroll progresses, an SVG path (`stroke-dasharray` / `stroke-dashoffset` driven by `progress`) draws connecting lines between glowing constellation nodes in the sky/canvas, popping open glassmorphic inspector cards at each node (`01`, `02`, `03`).

---

## Archetype 10: Tactile Physical Stacking Sheets (Adaptive `sm:sticky`)
* **Source Inspiration:** `13322566869.com` & `StackedArchiveStage.tsx`
* **Best Used For:** Experience timeline, Highlights, Credentials/Certificates, and Skills Archive near the end of a page.
* **Spatial Concept:** Uses a 12-column grid where the left 4 columns hold a `lg:sticky lg:top-28` curatorial introduction, and the right 8 columns contain 3–4 full-width `<article>` sheets with incrementing sticky offsets (`sm:sticky sm:top-22`, `sm:top-26`, `sm:top-30`, `sm:top-34`) and alternating tonal surfaces (`bg-gallery-paper`, `bg-gallery-stone`, `bg-gallery-charcoal`).
* **Responsive Safeguard (`sm:sticky`):** On tablet and desktop (`>= 640px`), each new sheet slides up and physically stacks on top of the previous sheet like tabbed dossier folders. On narrow single-column mobile screens (`< 640px`), where individual sheets are taller than the viewport, `sm:sticky` allows sheets to flow naturally so the bottom half of long experience lists is never covered before the user finishes reading.

