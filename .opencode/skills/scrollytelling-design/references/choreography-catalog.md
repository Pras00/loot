# Scrollytelling Choreography Catalog (13 Seed Archetypes)

This catalog documents **13 foundational scrollytelling archetypes** distilled from award-winning spatial web craft (`13322566869.com`, `igloo.inc`, `GRID`, `peär.`, `dennypratama.com`, and precision fintech/hardware storytelling).

> **Originality Rule:** Treat these 13 archetypes as **structural grammar, never copy-paste templates**. Always transmute the geometry, telemetry, copy, and surface palette to fit the brand using the [5-Axis Improvisation Matrix](./improvisation-matrix.md).

---

## Archetype 01: Chiaroscuro Focal Occlusion -> 3x3 Mosaic Docking -> Portal Window Dive
* **Best Used For:** Visual portfolios, creative studios, and gallery-driven Act 1 Heroes.
* **Spatial Concept (`minHeight: 340svh`):**
  1. **Phase A (`0.00 -> 0.16`) — 4-Plane Focal Occlusion:** Deep dark canvas (`z-0`), monumental split display typography (`z-10`), foreground cutout subject or artifact (`z-20`) physically occluding the center word with subtle opposing parallax, and an asymmetric bottom-corner HUD (`z-30`) that fades out early (`0.04 -> 0.20`).
  2. **Phase B (`0.16 -> 0.44`, Dwell `0.44 -> 0.56`) — Reverse-Docking into a 3x3 Visual Grid:** The hero stage scales down (`1 -> 0.315`) and docks into the center tile of a `3x3` full-bleed showcase mosaic. Outer tiles remain 100% pure visual bleed (zero text clutter).
  3. **Phase C (`0.56 -> 0.98`) — Center Portal Dive:** The mosaic scales up (`1 -> 3.48`) so the center tile expands past the viewport edges while outer tiles dissolve, pulling the visitor into Act 2.

---

## Archetype 02: Reverse-Portal / Fullscreen-to-Framed-Card Docking
* **Best Used For:** Transitioning from an immersive full-bleed visual scene into a structured 2-column architectural or editorial explanation.
* **Phase Timeline (`minHeight: 260svh`):**
  - `0.00 -> 0.30` (**Fullscreen Immersion**): Full-bleed artwork or interactive canvas fills `100vw × 100svh`.
  - `0.30 -> 0.70` (**Frame Docking**): Scene scales (`1 -> 0.44`) and translates horizontally (`0 -> -24vw`) to dock into a crisp bordered frame on the left column.
  - `0.58 -> 1.00` (**Editorial Dwell**): Right column reveals structured headline, plain human copy, and proof figures.

---

## Archetype 03: Persistent Central Object Assembly (Object-Led Scrollytelling)
* **Best Used For:** Physical products, culinary/craft storytelling, or multi-layer software architecture.
* **Phase Timeline (`minHeight: 380svh`):** A single hero object remains pinned at viewport center while 3–4 scroll chapters add layers, attachments, or active states onto it (`0.00 -> 0.20` Base → `0.20 -> 0.45` Layer +1 → `0.45 -> 0.70` Active Flow → `0.70 -> 1.00` Assembled Dwell with hairline variant selectors).

---

## Archetype 04: Multi-Zone Split Background Wipe (Independent Hemispheres)
* **Best Used For:** Contrasting dual modes, before/after states, or opposing product traits behind a pinned focal object.
* **Spatial Concept:** Behind a centered foreground subject, the canvas divides into Top/Bottom or Left/Right hemispheres that wipe and switch color temperatures independently, pairing opposing headlines on each side like an editorial magazine spread.

---

## Archetype 05: Monolith Shrink & Contrast Curtain Morph
* **Best Used For:** Bridging a dark opening act into a bright alabaster/paper exhibition room (or vice versa).
* **Phase Timeline (`minHeight: 240svh`):**
  - `0.00 -> 0.28`: Opening transitional statement on a full-bleed dark canvas.
  - `0.16 -> 0.62`: Dark surface insets, rounds corners, and shrinks (`100% -> 27%` width) into a left monolith, uncovering a bright paper canvas and kinetic headline on the right.
  - `0.72 -> 0.98`: Monolith glides off-screen left (`translate3d(-125%, 0, 0)`) as the exhibition headline locks in.

---

## Archetype 06: Stepped Dwell Showcase + Atmospheric Mist Sweep
* **Best Used For:** Flagship Case Studies, Selected Works, or multi-chapter deep dives.
* **Spatial Concept:** Combines a Sheet Peel entrance (`0.00 -> 0.20`) with **stepped dwell math** (`transitionRatio ≈ 0.46`). Each item locks 100% stationary during its dwell plateau. Between items, a bell-curve atmospheric veil (`Math.sin(rawT * Math.PI)`) sweeps cleanly across the stage while the next item slides into focus.

---

## Archetype 07: Surgical Object Slicing / Split-Apart Dissection
* **Best Used For:** Explaining internal mechanics, revenue/value splits, or precision hardware engineering.
* **Spatial Concept:** A unified focal object separates cleanly along an axis (`translateX(±delta)` or Z-extrusion) on scroll, exposing internal geometry, crisp `1px` SVG leader lines, and factual annotations between the halves.

---

## Archetype 08: Scattered Fragments Converging to Unified Order
* **Best Used For:** Bringing chaotic inputs, integrations, or capabilities into one structured system.
* **Spatial Concept:** Fragments and sliced SVG emblem arcs begin scattered across the viewport with deterministic 2D offset vectors (`vw/vh`) and rotations. On scroll (`0.10 -> 0.68`), `scatterAmount = 1 - easedRange(p, 0.10, 0.68)` drives all offsets to `0`, snapping fragments into an ordered architectural grid.

---

## Archetype 09: Blueprint Grid, Point-Cloud Morph & Scroll-Drawn Constellation
* **Best Used For:** Process architecture, data/AI systems, or technical craft narratives.
* **Spatial Concept:** A `1px` architectural grid with `+` alignment crosshairs frames a stippled/wireframe subject while scroll-driven SVG paths (`pathLength={1}`, `strokeDashoffset: calc(1 - var(--draw, 0))`) connect numbered nodes into an interactive diagram.

---

## Archetype 10: Tactile Physical Stacking Sheets (Adaptive `sm:sticky`)
* **Best Used For:** Specifications, timelines, credentials, or structured dossiers near the close of a narrative.
* **Spatial Concept:** Left 4 columns hold a sticky curatorial intro (`lg:sticky lg:top-28`); right 8 columns hold full-width `<article>` sheets with incrementing sticky offsets (`sm:sticky sm:top-22`, `sm:top-26`, `sm:top-30`) on tablet/desktop while flowing naturally without clipping on single-column mobile.

---

## Archetype 11: Edge-to-Edge Diagonal Reality Scrubber + Brand-Emblem 3D Split Dive
* **Best Used For:** Product heroes that bridge two realities (e.g., *one action -> four outcomes*, *physical -> digital*, *concept -> production*).
* **Spatial Concept (`minHeight: 540svh`):**
  1. **At Rest (`0.00 -> 0.12`) — Full-Bleed Scrubbable Diagonal Plane:** An interactive `0%–100%` edge-to-edge diagonal `clip-path` divides only the background and opposing gigantic light headlines (e.g., left solid room vs. right architectural grid), while the **whole, uncut focal product** sits cleanly in the center in front of a multi-layer 3D monument built from the **brand's own custom geometric emblem**.
  2. **The Split Dive (`0.08 -> 0.84`) — Custom Emblem Expansion + Domain-Native Telemetry:** As the user scrolls, the hero HUD clears early (`0.06 -> 0.16`), the camera zooms forward through the emblem's central aperture, and the emblem's geometric shards **expand outward into distinct spatial vectors** (e.g., 4 shards separating toward 4 quadrants). A **domain-native pure-CSS `@property` counter** (e.g., chip execution `0.00s -> 0.40s` in a sleek top-center bar) ticks live at 60fps while 3–4 gigantic statements appear sequentially in **alternating quadrants** (never stacked in one predictable corner).
  3. **Aperture Light Exit (`0.76 -> 0.89`):** A central vanishing-point light expands to hand off seamlessly into the next light-room act.

---

## Archetype 12: Full-Width Architectural Hairline Index + Centered Floating Inspector
* **Best Used For:** Replacing generic 3- or 4-card grids when showcasing features, categories, pockets, or case studies on a clean light or dark editorial room.
* **Spatial Concept (`minHeight: 420svh–500svh`):**
  - Instead of boxed cards, render **3–5 full-width gigantic light-weight typography rows** separated only by crisp `1px` horizontal hairlines (`divide-y border-y`).
  - Rows reveal sequentially on scroll (`--row-0..3`) and hold a generous dwell plateau (`0.55 -> 1.00`).
  - Hovering, focusing, or clicking any row shifts it subtly right (`translate-x-2`), illuminates its ink contrast, and live-updates **one single floating inspector card** vertically centered on the right (`md:inset-y-0 md:flex md:items-center`) so nothing ever clips at the bottom of `100svh` laptop screens.

---

## Archetype 13: Progressive Thread Construction + Pixel-Exact CAD X-Ray Scrubber
* **Best Used For:** Demonstrating how a physical/digital product is engineered from geometry to reality, followed by hands-on interactive inspection.
* **Spatial Concept (Two-Act Pair):**
  - **Construction Stage (`minHeight: 460svh–520svh`):** On a drafting-paper room, `1px` construction axes (`--grid-d`), converging Bezier threads (`--threads-d`), and wireframe product/emblem outlines (`--outline-d`) draw progressively via `stroke-dashoffset` before solidifying into the finished object (`--solid-o`), tracked by a 3-column bottom progress rule.
  - **CAD X-Ray Scrubber (`minHeight: 320svh–360svh`):** A dark studio bench pairing a **pixel-aligned `0%–100%` diagonal scrubber** (left: precision SVG internal X-Ray schematic with real dimensions, traces, and wireframe brand mark; right: live rendered product) with **hairline underline control tabs** (zero floating capsule pills) and a live interactive calculator/simulator.
