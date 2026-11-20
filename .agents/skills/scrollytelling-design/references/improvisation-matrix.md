# 5-Axis Generative Improvisation Matrix & Originality Protocol

The 13 Seed Archetypes in [choreography-catalog.md](./choreography-catalog.md) are **a vocabulary, never a mold**.

Every scrollytelling website should feel invented for its specific brand and audience. Use the **5-Axis Matrix** below to compose fresh mechanics, and apply the **Transmute, Never Clone** protocol whenever drawing inspiration from existing reference sites.

---

## The "Transmute, Never Clone" Protocol (Anti-Plagiarism & Exploration Rule)

When a project takes inspiration from an existing award-winning site (such as `dennypratama.com`, `igloo.inc`, `13322566869.com`, `GRID`, or `peär.`), **never copy its signature gimmick, layout coordinates, or visual identity 1:1**. Before writing code, run every borrowed idea through 4 transmutations:

1. **Transmute the Geometry:** Replace the reference's monogram, shapes, or mascot with **custom geometry derived from the current product's own logo, form factor, or core mechanism** (e.g., 4 interlocking vault shards that split 4 ways instead of a spinning initials tunnel).
2. **Transmute the Telemetry:** Replace decorative counters (like a generic `000°` angle or `01 / 05`) with a **real product-truth metric** that teaches something about the product (e.g., `0.00s -> 0.40s` offline authorization time, real-time rupiah split, latency ms, or pressure/temperature).
3. **Transmute the Spatial Placement:** Move HUD readouts, narrative beats, and controls to a **different spatial rhythm** (e.g., top-center execution strip + quadrant-alternating headlines instead of bottom-center counter + bottom-left text stack).
4. **Explore Fresh Aesthetic Worlds:** Do not default to the same font (`Archivo`), same diagonal angle (`23.6°`), or same dark-violet-lime palette on future projects. Deliberately explore editorial serifs, Swiss grotesks, kinetic monospace, warm earth/ink palettes, architectural cobalt, or monochromatic print aesthetics depending on the brand.

---

## How to Improvise a Bespoke Scrollytelling Act

Pick **one element from each of the 5 Axes** and bind them to `progress ∈ [0, 1]` inside a pure `choreography.ts` function:

$$\text{Bespoke Stage} = \text{Camera Vector} \times \text{Subject Physics} \times \text{Aperture/Surface} \times \text{Interactive Control} \times \text{Domain Metaphor}$$

---

## Axis 1: Camera & Spatial Vector (How the Viewport Moves)

1. **Macro-to-Canopy Pull-Back (Z-Out):** Start zoomed `3.5x` on a microscopic detail (a watch escapement, a stitch, a chip die, a single line of code) and scale down to `1.0x` to reveal the whole ecosystem.
2. **Counter-Scrolling Split Hemispheres (Opposing Y-Vectors):** Left column translates *downward* while right column translates *upward*, locking together when matching pairs align at center.
3. **Orbital / Rotary Dial (Polar Coordinate Scroll):** Map scroll `progress` to an angle $\theta = \text{lerp}(0^\circ, 180^\circ, p)$ so artifacts orbit smoothly along a circular arc like a precision lens ring.
4. **Isometric / Architectural Plane Tilt (3D Perspective):** Tilt a flat 2D schematic (`rotateX(52deg) rotateZ(-28deg)`) and extrude internal layers along the Z-axis.
5. **Horizontal Panoramic Pan + Depth Parallax:** Translate a wide `300vw` gallery laterally (`translate3d(0 -> -200vw, 0, 0)`) while foreground/background planes move at `1.35x` and `0.65x`.
6. **Quadrant Aperture Dive (Z-In + Radial Split):** Zoom into the center of a brand emblem while its component shards expand outward toward opposing screen quadrants.

---

## Axis 2: Focal Subject Physics (How the Hero Artifact Transforms)

1. **Brand-Emblem Shard Expansion:** Deconstruct a custom geometric logo into its meaningful parts (e.g., 2, 3, or 4 shards) that separate along purposeful vectors on scroll and re-converge in a later construction act.
2. **Exploded View / Surgical Dissection:** Separate stacked hardware or software layers along an axis (`layerOffset = idx * 48 * t`) with crisp `1px` SVG leader lines to factual spec labels.
3. **Fidelity Morph (Wireframe → Construction Threads → Solid Product):** Draw `1px` CAD axes and curved construction paths (`stroke-dashoffset`) that solidify seamlessly into the rendered product.
4. **Fanned Deck / Folio Spread:** Start with stacked sheets at center (`rotate: 0deg`) and fan them into an inspectable arc or horizontal spread during the dwell plateau.
5. **Equilibrium / Balance Physics:** Two competing forces (e.g., *Speed vs. Accuracy*, *Risk vs. Reserve*) sit on a structural beam that resolves to `0deg` equilibrium as scroll advances.

---

## Axis 3: Surface, Masking & Aperture (How Scenes Reveal)

1. **Edge-to-Edge Diagonal Reality Split (`clip-path: polygon(...)`):** Divide a viewport diagonally between two contrasting worlds (solid vs. blueprint, before vs. after) that the user can scrub freely from `0%` to `100%`.
2. **Typographic Aperture / Giant Letterform Portal:** Mask artwork or a contrasting room inside an oversized display character and scale it from `1x` to `25x` so the visitor flies through its negative space.
3. **Iris / Geometric Clip-Path Expansion:** Reveal the next tonal room via an expanding circular iris (`clip-path: circle(...)`) or architectural polygon morphing to full-bleed.
4. **Lateral Curtain Wipe (`clip-path: inset(...)`):** Sweep a contrasting room horizontally or vertically over the outgoing stage during an overlap window.
5. **Venetian Louver / Split Curtain Reveal:** Part a stage center-out (`-50vw` / `+50vw`) or across staggered architectural louvers.

---

## Axis 4: Direct-Manipulation Scrolly-Widgets (Zero Pill Clutter)

Embed live interactive controls that feel native to architectural/editorial design—**never generic glassmorphic popups or floating capsule pill clusters**:

1. **Pixel-Exact CAD X-Ray Scrubber:** A `0%–100%` draggable diagonal slicer overlaying a precision SVG internal schematic directly onto the live rendered product, with **flush hairline underline tabs** integrated into the frame header.
2. **Full-Width Hairline Index + Floating Inspector:** Interactive `1px`-divided display rows where hover/focus updates a single vertically centered detail card.
3. **Scroll-Synced Live Simulator / Calculator:** A native `<input type="range">` or hairline tab switcher that computes real domain math (currency splits, latency budgets, physics outputs) with `tabular-nums` and `whitespace-nowrap`.
4. **Pure-CSS `@property` Telemetry Rail:** Live numeric counters driven directly by the scroll engine's integer custom properties (zero React `setState` per frame).
5. **Scroll-Synced Code / State Inspector:** As scroll advances, crisp code or rules highlight on one side while the live artifact mutates on the other.

---

## Axis 5: Domain Metaphor Invention (Mandatory Per-Project Rule)

Never recycle an unrelated industry's visual metaphor. Invent **1 to 2 bespoke mechanics** rooted in what the product actually does:

| Product / Domain | Custom Scrollytelling Metaphor Examples |
| :--- | :--- |
| **FinTech / Treasury / Hardware Card** | Diagonal reality scrubber separating 1 tap from 4 pockets; custom 4-shard emblem splitting during a `0.00s -> 0.40s` chip dive; pixel-exact NFC/EAL6+ CAD X-Ray bench with live rupiah split math. |
| **Developer Tools / Infra / AI** | Unstructured logs/traces converging into a deterministic pipeline; 2D schema extruding into a live request graph; hairline diff scrubber comparing legacy vs. compiled output. |
| **Consumer Goods / Culinary / Craft** | Pinned central object assembling layer-by-layer on scroll; macro zoom-out from raw texture grain to finished craft; split-hemisphere flavor/material contrast wipes. |
| **Architecture / Industrial / Mobility** | Fullscreen spatial elevation docking into a 2D orthographic blueprint; isometric structural floor-stack extrusion; daylight-to-dusk solar lighting temperature scrub. |
| **Creative Studio / Editorial Portfolio** | Chiaroscuro focal occlusion docking into a full-bleed exhibition mosaic; dark monolith shrinking to reveal an alabaster index; atmospheric mist transitions; tactile stacking archive sheets. |

---

## Improvisation Quality Checklist

Before shipping any newly invented mechanic, verify:
1. **Dwell Plateau:** Can the visitor stop scrolling and comfortably read every headline and interact with every control?
2. **Deterministic Reversibility:** Are all visual transforms pure functions of `progress ∈ [0, 1]` so scrolling upward reverses every frame cleanly?
3. **Originality Check:** Does the geometry, telemetry, and layout belong unmistakably to *this* brand rather than copying a reference site?
4. **Laptop + Mobile Safety:** Do all offsets, floating inspectors, and hairline indices fit inside `100svh` without clipping on both `1366×620` laptops and `375×667` phones?
