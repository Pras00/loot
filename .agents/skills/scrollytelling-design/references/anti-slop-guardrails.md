# Depth, Surface Rhythm & Anti-Slop Guardrails

This document defines the aesthetic quality floor, tonal surface choreography, and strict **Anti-AI-Slop Guardrails** for scrollytelling websites.

---

## 1. Strict Bans: What Makes Scroll-Hijacking Look Like "AI Slop"

Never ship any of the following patterns:

1. **The Monotonous Slide Deck (Fade-Up Repetition):**
   - **BANNED:** Stacking 5 `100vh` sections where every section simply fades and slides text up (`translateY(20px -> 0)`) over a static dark background.
   - **REQUIRED:** Every Act must change the **spatial camera vector** (e.g., Act 1 zooms *in* through a portal -> Act 2 shrinks a monolith *sideways* -> Act 3 peels a sheet *upward* -> Act 4 converges scattered fragments *radially* -> Act 5 physically stacks tactile sheets).
2. **Unreadable Moving Targets (Zero Dwell Zone):**
   - **BANNED:** Tying text `translateY` linearly to `progress` across `0.00 -> 1.00` so the user has to chase moving paragraphs or moving buttons with their cursor.
   - **REQUIRED:** Every headline, body paragraph, and CTA button must lock into a stationary **Dwell Plateau** (`translate3d(0,0,0)`, `opacity: 1`) for a generous scroll window before transitioning out.
3. **Ghost Overlay Blocking (`pointer-events` Bug):**
   - **BANNED:** Leaving invisible or faded-out foreground/background layers (`opacity: 0`) with default `pointer-events: auto`, which blocks the user from clicking buttons, copying email addresses, or selecting cards underneath.
   - **REQUIRED:** Any decorative layer, atmospheric mist veil, or faded-out phase layer must explicitly set `pointer-events-none` (or dynamically toggle `pointer-events-auto` only when `opacity > 0.6`).
4. **Self-Bragging Technical Badges & Robotic Telemetry:**
   - **BANNED:** Littering user-facing UI (or companion CMS/Studio Control pages) with self-congratulatory engineering buzzwords or robotic telemetry badges such as `"60FPS Spatial Canvas"`, `"WebGL2 Engine"`, `"Zero-Latency"`, `"PostgreSQL Active"`, `"AES-GCM Encrypted"`, `"Editorial Reveal"`, `"Tactile Stack"`, `"001 / 005 — PORTAL"`, or raw database keys like `"ID: proj-2"`.
   - **REQUIRED:** Write with a warm, grounded, human voice (*"Selected Works"*, *"What I Do"*, *"Experience & Background"*, *"Private Client Project"*). Let the 60fps smoothness of the interface speak for itself without bragging about it in text badges.
5. **Abstract AI Vector Slop Inside Gallery Tiles & Project Cards:**
   - **BANNED:** Filling 3×3 mosaic tiles or project cards with generic abstract SVG boxes, meaningless radar circles, or fake wireframe bars that scream "placeholder AI template", or cluttering outer mosaic tiles with text labels and category pills.
   - **REQUIRED:** Every project cover and mosaic tile must look like an **authentic dark-mode website hero screenshot or real product interface** (complete with subtle top navigation, strong editorial headline typography, atmospheric focal lighting, and realistic UI chrome). Keep the 8 outer tiles of a 3×3 mosaic **100% pure visual bleed** (zero text overlays).
6. **Text-Over-Face Collisions & Duplicate Identity Logos:**
   - **BANNED:** Placing headlines, paragraphs, or CTA buttons directly across the focal subject's face/chest, or rendering a second `[P]` brand logo inside the hero content when the top-left HUD bar already displays the brand logo.
   - **REQUIRED:** Use **Subject Occlusion** (monumental display type on `Plane 2` behind the cutout subject on `Plane 3`) and anchor all foreground editorial HUD copy (`Plane 4`) in the bottom-left and bottom-right negative space over a subtle bottom vignette. Fade out the corner HUD early (`progress: 0.04 -> 0.20`) before shrinking/docking the hero stage.
7. **Layout Thrashing & Janky Scroll:**
   - **BANNED:** Animating CSS `margin`, `padding`, `font-size`, or un-composited `top/left` on complex DOM trees during scroll, or attaching non-passive scroll listeners that block the main thread.
   - **REQUIRED:** Use `will-change-transform` on moving stage layers and drive motion via `translate3d`, `scale`, `rotate`, and `opacity`.

---

## 2. Tonal Surface Rhythm (Alternating Architectural Rooms)

A world-class scrollytelling experience (like `13322566869.com`, `GRID`, and `peär.`) uses **bold surface temperature shifts** between acts so the user feels like they are walking through curated architectural spaces:

### Exemplar Palette Systems

#### A. Editorial Spatial Gallery (`3D-Porto` & `13322566869.com`)
- **Obsidian / Charcoal (Dark Acts):** `#0e0e10` / `#161618` with `#222226` elevated surfaces and `#f4f3ef` warm ivory ink.
- **Alabaster / Paper (Light Acts):** `#ffffff` / `#f4f3ef` with `#e4e2da` stone borders and `#121214` deep ink.
- **Atmospheric Accent Scenes:** Warm Amber/Terracotta (`#f59e0b` / `#c2410c`), Glacial Deep Blue (`#0284c7`), and Emerald (`#10b981`).

#### B. Neo-Classical Blueprint (`peär.`)
- **Electric Blueprint Cobalt:** `#0E47D8` with `rgba(255,255,255,0.14)` `1px` architectural grid lines, `+` crosshairs, and crisp white serif/sans typography.
- **Alabaster Drafting Paper:** `#E8EAED` / `#F5F6F8` with `rgba(14,18,24,0.08)` `1px` grid lines and `#0E1218` ink.
- **Renaissance Oil & Gold Accents:** High-contrast classical chiaroscuro imagery paired with warm gold (`#D4AF37`) and sky blue highlights.

#### C. Tactile Craft & Culinary Contrast (`GRID`)
- **Warm Parchment Cream:** `#F5F0E6` with `#181818` espresso ink.
- **Deep Roast Charcoal:** `#181818` with `#F5F0E6` cream ink.
- **Rich Cocoa & Vermilion Split:** `#5C3A21` warm brown and `#C84B31` terracotta organic accents.

---

## 3. The 4-Plane Z-Index Sandwich & Subject Occlusion Checklist

When building any sticky stage (`sticky top-0 h-svh w-full overflow-hidden`), structure its JSX children in back-to-front order so the subject physically sits *between* the monumental background type and the foreground corner HUD:

1. **Plane 1 — Chiaroscuro Canvas & Atmospheric Lighting (`z-0`):**
   - Base surface color (`#09090b`), diagonal tungsten light shaft (`radial-gradient`), or split-screen color wipe.
2. **Plane 2 — Mid-Back Monumental Context (`z-10`):**
   - Monumental display typography (`"CODE TO" / "CRAFT"`), sliced SVG emblem arcs, or atmospheric glow gradients that parallax **behind** the hero subject.
3. **Plane 3 — Foreground Cutout Subject / Interactive Stage (`z-20`):**
   - The cutout portrait silhouette (which partially occludes Plane 2 typography for true optical depth), evolving product assembly, Bento card convergence grid, or project showcase card, plus a subtle bottom vignette (`chiaroscuro-vignette`).
4. **Plane 4 — Negative-Space Editorial HUD & Navigation (`z-30` to `z-40`):**
   - Bottom-corner editorial manifesto, concise bio, tactile action pills, and minimalist chapter navigation dots (`EditorialScrollIndicator`).

---

## 4. Typography, Humanized Copywriting & Mobile `100svh` Budget

- **Contrast of Scale:** Pair monumental display headlines (`text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-none`) with compact, high-legibility body copy (`max-w-md` or `max-w-lg`, `text-xs sm:text-sm leading-relaxed`) and clean, natural section labels.
- **Poetic Staccato Statements & Conversational Bridges:**
  - In the Hero HUD, use a crisp 3-line staccato manifesto (*"Thoughtful Design. / Clean, Reliable Code. / Built Around Users."*) paired with a left-bordered identity signature.
  - Between major content acts, use short, conversational 3-to-6 word transitional statements (*"NEXT, LET'S TAKE A LOOK"*, *"ALRIGHT, NEED SOMEONE WHO CAN HANDLE IT ALL?"*).
- **Mobile & Tablet `100svh` Vertical Density Budget (Keeping Scroll-Hijacking Smooth on Phones):**
  - Never disable scrollytelling on mobile or tablet—instead, design every `sticky top-0 h-svh overflow-hidden` stage so its entire stacked content fits comfortably inside a `375×667px` mobile screen:
    1. Convert vertical tag lists (`<ul>`) inside glass cards into horizontal flex-wrap pills on mobile (`flex flex-wrap gap-1.5 sm:block sm:space-y-1`).
    2. Use responsive thumbnail heights (`h-24 sm:h-36 lg:h-44`) and compact padding (`px-4 pt-20 pb-6 sm:px-10 sm:pt-24 sm:pb-12`).
    3. Apply `line-clamp-2` or `line-clamp-3` on mobile (`sm:line-clamp-none`) for long descriptions inside `h-svh` stages.
    4. Use `sm:sticky` on multi-sheet archive stacks (`Archetype 10`) so tall single-column cards flow naturally on phones while stacking tactilely on tablets and desktops.

