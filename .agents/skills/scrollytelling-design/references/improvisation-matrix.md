# 5-Axis Generative Improvisation Matrix

The 10 Seed Archetypes in [choreography-catalog.md](./choreography-catalog.md) are **a floor, never a ceiling**.

To ensure every website we build feels original, tailored to its subject matter, and free of repetitive templates, you **must** actively improvise and invent new scrollytelling choreographies, UI components, and spatial transitions by combining parameters across the **5 Axes** below while strictly obeying the **5 Immutable Laws** in `SKILL.md`.

---

## How to Improvise a New Scrollytelling Act

To invent a fresh scrollytelling stage, pick **one element from each of the 5 Axes** and bind them to `progress ∈ [0, 1]` using `easedRange`, `lerp`, and `bellCurve`:

$$\text{Bespoke Stage} = \text{Camera Vector} \times \text{Subject Physics} \times \text{Aperture/Surface} \times \text{Scrolly-Widget} \times \text{Domain Metaphor}$$

---

## Axis 1: Camera & Spatial Vector (How the Viewport Moves)

Instead of defaulting to vertical upwards scrolling, choose from or combine these spatial vectors:

1. **Macro-to-Canopy Continuous Pull-Back (Z-Out):**
   - Start zoomed in `3.5x` on a microscopic detail (a single line of code, a watch gear, a botanical graft, a fabric weave). As the user scrolls, scale down to `1.0x` to reveal the entire ecosystem surrounding that detail.
2. **Counter-Scrolling Split Hemispheres (Opposing Y-Vectors):**
   - Divide the sticky stage into two vertical columns: the left column translates *downward* (`translate3d(0, -100% -> 0%, 0)`) while the right column translates *upward* (`translate3d(0, 0% -> -100%, 0)`), locking together when matching pairs align in the center.
3. **Orbital / Rotary Dial (Polar Coordinate Scroll):**
   - Convert linear scroll `progress` into an angle $\theta = \text{lerp}(0^\circ, 180^\circ, p)$. Arrange cards, planets, or product nodes along a large circular arc (`translate3d(R * cos(θ), R * sin(θ), 0)`) that rotates like a precision camera lens ring or vinyl turntable as the user scrolls.
4. **Isometric / Architectural Plane Tilt (3D Perspective):**
   - Start with a flat 2D technical blueprint or UI wireframe (`rotateX(0deg) rotateZ(0deg)`). On scroll, tilt the plane in 3D perspective (`perspective(1200px) rotateX(52deg) rotateZ(-28deg)`) and extrude vertical layers upward along the Z-axis (`translateZ(40px)`, `translateZ(80px)`).
5. **Horizontal Gallery Pan + Depth Parallax:**
   - Translate a wide horizontal panoramic canvas (`width: 300vw`) across the viewport (`translate3d(0 -> -200vw, 0, 0)`) while foreground pillars and background typography move at `1.4x` and `0.6x` parallax multipliers.

---

## Axis 2: Focal Subject Physics (How the Hero Object Transforms)

Never leave the main visual static. Give the focal artifact physical behavior tied to scroll:

1. **Exploded View / Surgical Dissection:**
   - Start with a unified product, interface, or emblem. As scroll progresses from `0.20 -> 0.65`, separate its constituent layers along an axis (`layerOffset = idx * 48 * easedRange(p, 0.2, 0.65)`) and draw thin SVG leader lines (`1px` dashed/solid) to floating spec labels on the left and right. Optionally re-assemble (`0.75 -> 0.95`) using `bellCurve(p, 0.15, 0.90)`.
2. **Fidelity Morph (Wireframe → Point-Cloud → Photorealistic/Live UI):**
   - Layer three representations of the same subject on top of each other:
     - *Phase A (`0.00 -> 0.35`):* Technical `1px` blueprint wireframe / CAD outline.
     - *Phase B (`0.30 -> 0.68`):* Stippled halftone / ASCII / particle dot-matrix mesh.
     - *Phase C (`0.62 -> 1.00`):* Full-color tactile render or live interactive component.
3. **Accordion / Fanned Deck Expansion:**
   - Start with 5 cards tightly stacked as a single deck at the center (`rotate: 0deg, translateX: 0`). On scroll, fan them out into an arc or horizontal spread (`translateX: (i - 2) * 220px`, `rotate: (i - 2) * 6deg`) so the user can inspect and click any card during the dwell plateau.
4. **Pendulum / Balance Scale Physics:**
   - Two competing concepts (e.g., *Speed vs. Security*, *Risk vs. Upside*, *Cost vs. Quality*) sit on a structural beam that tilts and re-balances to `0deg` equilibrium as scroll progresses.

---

## Axis 3: Surface, Masking & Aperture (How Scenes Reveal)

Replace standard opacity crossfades with architectural apertures:

1. **Typographic Aperture / Giant Letterform Portal:**
   - Mask a full-screen video, 3D scene, or vibrant artwork inside an oversized display wordmark (e.g., `clip-path` or high-contrast SVG mask). On scroll, scale the letterform from `1x` to `25x` so the camera flies *through* the negative space of the letter into the scene inside.
2. **Iris / Geometric Clip-Path Expansion:**
   - Reveal the next contrasting tonal act via an expanding CSS `clip-path`:
     - Circular iris: `clip-path: circle(${lerp(0, 140, t)}% at 50% 50%)`
     - Architectural arch or diamond polygon morphing to full-bleed `inset(0% 0% 0% 0% round 0px)`.
3. **Venetian Louver / Slatted Blind Wipe:**
   - Slice a canvas into 5–8 vertical or horizontal architectural louvers that flip or slide sequentially with staggered ranges (`easedRange(p, i * 0.06, 0.5 + i * 0.06)`).
4. **Split Curtain Reveal (Center-Out):**
   - The current canvas splits down the vertical centerline; left half slides to `-50vw` and right half slides to `+50vw`, uncovering the next act waiting underneath in the center.

---

## Axis 4: Interactive Scrolly-Widgets (UI Components Inside the Stage)

A scrollytelling stage should not be a passive movie—embed **live, interactive micro-components** that respond to *both* scroll position and direct user clicks/hovers during dwell plateaus:

1. **Scroll-Synced Code / Terminal Compiler:**
   - As the user scrolls, lines of code or terminal commands type/highlight on the left while the rendered UI preview on the right dynamically mutates its state, theme, or 3D geometry in real time.
2. **Interactive Node / Constellation Inspector:**
   - An SVG network or trajectory path draws itself on scroll (`strokeDashoffset`). Each node (`01`, `02`, `03`) automatically highlights when scroll passes its threshold, AND users can click any node directly to inspect its glassmorphic detail card.
3. **Live Telemetry & Scrubbable Metric Gauges:**
   - Numbers, radial dials, latency bars, or financial split calculators that interpolate smoothly (`lerp(startVal, endVal, t)`) with `tabular-nums` monospace precision as scroll advances.
4. **Dual-Control Stage Switcher (Scroll + Pill Click):**
   - Pair stepped scroll chapters with clickable floating pills (like the flavor tokens in `GRID` or project pills in `ExhibitionWorksStage`) that call `scrollToProgress(targetRatio)` when clicked—bridging scroll-hijacking and traditional click navigation seamlessly.

---

## Axis 5: Domain Metaphor Invention (Mandatory Customization Rule)

Whenever designing a website for a specific industry or brief, **never copy a metaphor from an unrelated industry**. Invent at least **1 to 2 custom scroll mechanics** that dramatize the product's core value proposition:

| Product / Domain | Custom Scrollytelling Metaphor Examples |
| :--- | :--- |
| **Developer Tools / SaaS / AI** | Chaotic raw logs/JSON fragments converging into a clean structured dashboard; a 2D wireframe extruding into a 3D system architecture; latency benchmarks racing across a blueprint grid. |
| **FinTech / Venture / Web3** | A golden asset slicing into transparent revenue-share proportions (`peär.`); a vault aperture unlocking on scroll; real-time ledger nodes linking into a verified chain. |
| **F&B / Craft / Consumer Goods** | Pinned central product with progressive ingredient assembly & liquid pour (`GRID`); macro zoom-out from raw material grain to finished plated product; split-screen flavor contrast wipes. |
| **Architecture / Interior / Industrial** | Fullscreen courtyard scene scaling down into a framed 2D floorplan (`peär.`); isometric elevation layers stacking from foundation to roof; daylight-to-dusk lighting temperature morph. |
| **Creative Studio / Portfolio** | 3x3 mosaic portal window dive (`13322566869.com`); dark monolith shrinking to reveal alabaster exhibition gallery; Igloo mist transitions between flagship works; tactile stacking dossier sheets. |

---

## Improvisation Quality Checklist

Before finalizing any newly improvised scroll mechanic, verify:
1. **Does it have a clear Dwell Plateau?** Can the user stop scrolling in the middle and comfortably read the headline and click the CTA?
2. **Is the motion driven by `scrollMath.ts`?** Are all transforms computed purely as deterministic functions of `progress ∈ [0, 1]` so scrolling backward reverses the animation with 100% mathematical precision?
3. **Is it distinct from the adjacent Acts?** Does it change camera vector and surface tone compared to the section before and after it?
4. **Does it degrade gracefully on mobile & `prefers-reduced-motion`?** On narrow screens (`< 768px`), keep scatter/split offsets within viewport bounds (`vw/vh` clamped) so no horizontal overflow occurs.

