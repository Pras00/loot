# Depth, Typography, Copywriting & Anti-Slop Guardrails

This document defines the non-negotiable aesthetic, typographic, editorial, and responsive quality floor for scrollytelling websites.

---

## 1. Strict Bans: What Makes Scrollytelling Look Like "AI Slop"

Never ship any of the following patterns:

1. **The Monotonous Slide Deck (Fade-Up Repetition):**
   - **BANNED:** Stacking 5 sections where every section simply fades and slides text up (`translateY(20px -> 0)`) over the same background tone.
   - **REQUIRED:** Alternate both **spatial camera vector** and **tonal room temperature** on every adjacent act.
2. **Card Soup, Box-in-Box Clutter & Glassmorphism Blur:**
   - **BANNED:** Wrapping every feature, metric, or list item inside identical rounded cards (`rounded-2xl border bg-white/5 backdrop-blur-md`), or stacking equal 3-card grids on every section.
   - **REQUIRED:** Use **Architectural Hairline Layouts** (`1px` horizontal dividers, open negative space, full-width display index rows, and at most one focal preview artifact per stage).
3. **Floating Capsule Pill Clusters:**
   - **BANNED:** Scattering rows of oval pill buttons (`rounded-full border px-3 py-1`) with colored dots to toggle modes, finishes, or filters—this reads immediately as a generic SaaS dashboard template.
   - **REQUIRED:** Use **flush architectural hairline tabs** (underline active rules integrated into a frame header or above a live figure) with sharp geometric swatches.
4. **1:1 Reference Gimmick Cloning:**
   - **BANNED:** Copying a reference site's exact trademark gimmick, counter format, or corner layout verbatim (e.g., copying `dennypratama.com`'s bottom-center `000°` degree counter + bottom-left `01 / m/01` text stack).
   - **REQUIRED:** Apply the **Transmute, Never Clone** protocol—use the brand's own custom geometric emblem, domain-native telemetry, and an original spatial layout.
5. **Number Soup & Stiff Mechanical Jargon:**
   - **BANNED:** Flooding a screen with 10+ unanchored stats, robotic buzzwords (`"next-gen"`, `"seamless"`, `"effortless"`, `"unlock"`, `"elevate"`, `"zero-latency"`, `"AI-powered"`, `"60FPS Spatial Canvas"`, `"WebGL2 Engine"`), or overly mechanical motherboard/circuit clichés when the product story is human.
   - **REQUIRED:** **One clear fact per scroll beat**, expressed in plain everyday verbs (*"You tap once. It splits four ways."*, *"Phone off. Still works."*).
6. **Wrapped Currency / Metric Figures:**
   - **BANNED:** Allowing a headline figure like `+Rp 216k` or `$12,400` to break onto two lines (`+Rp` on line 1, `216k` on line 2) inside a narrow preview card.
   - **REQUIRED:** Always pair financial/metric displays with `tabular` (`font-variant-numeric: tabular-nums`) and `whitespace-nowrap`, sizing the figure token (`text-figure` vs. `text-display-md`) to the container width.
7. **Unreadable Moving Targets & Ghost Overlay Blocking:**
   - **BANNED:** Continuous linear text drift with zero dwell plateau, or faded-out layers (`opacity: 0`) left with `pointer-events: auto` blocking clicks underneath.
   - **REQUIRED:** Lock every readable block into a stationary dwell plateau (`>= 15%–25%` of the act), and put `pointer-events-none` on every decorative or inactive layer.
8. **SSR Pre-Hydration Text Flash & Per-Frame `setState`:**
   - **BANNED:** Omitting CSS fallback values (`var(--frame-0)` without `, 0`) so hidden dive headlines flash simultaneously at `opacity: 1` on page reload, or calling React `setState(progress)` on every scroll frame.
   - **REQUIRED:** Use the single-loop CSS custom property engine + explicit `@property` `initial-value` and inline `var(--x, 0)` fallbacks.

---

## 2. Gigantic Editorial Typography & Scale Contrast

Timid mid-sized headings (`40px–56px` bold) paired with 4–5 medium font sizes create visual clutter. High-craft editorial scrollytelling uses **extreme scale contrast** and **eliminates the "muddy middle"**:

- **Gigantic Light-Weight Display (Modern Editorial Option):**
  - Pair huge fluid scales (`clamp(2.5rem, 6.8vw, 6.75rem)` up to `11rem`) with **Light weight (`300`)**, tight negative tracking (`-0.04em` to `-0.055em`), and tight line-height (`0.88–0.92`). Light weight at gigantic scale feels sculptural and calm rather than shouty.
- **Explore Font Families Freely:**
  - Do **not** hardcode one font across every project. Choose a **single variable sans** (e.g., `Archivo`, `Instrument Sans`, `Plus Jakarta Sans`, `General Sans`, `Space Grotesk`) OR an intentional **editorial serif + grotesk pairing** (e.g., `Instrument Serif` + `Inter`) that genuinely matches the brand's voice.
- **Scale Discipline (2–3 Distinct Tiers Per View):**
  - **Tier 1 (Monumental Statement):** One gigantic focal headline or figure that anchors the room.
  - **Tier 2 (Calm Human Lead / Body-Sm):** One short, max `45ch–55ch` plain-language paragraph explaining the "why" in `0.875rem–1rem`.
  - **Tier 3 (Micro Anchors):** Crisp `0.75rem` labels, `1px` rules, and `tabular-nums` figures—never uppercase-eyebrow-above-every-heading clutter.

---

## 3. Tonal Surface Rhythm (Alternating Architectural Rooms)

Shift room temperature cleanly between adjacent acts so each section feels like entering a new physical space. Invent fresh palettes per project rather than reusing one color scheme:

- **Obsidian / Alabaster High-Contrast:** Deep charcoal (`#0c0c0f` / `#18181c`) alternating with warm alabaster (`#f4f4f6` / `#ebebef`) and one disciplined signal accent (e.g., acid lime, electric cobalt, warm tungsten, or vermilion).
- **Architectural Blueprint:** Electric drafting cobalt (`#0E47D8`) alternating with drafting paper (`#E8EAED`) and `1px` grid crosshairs.
- **Warm Editorial Craft:** Deep espresso charcoal (`#181818`) alternating with parchment cream (`#F5F0E6`) and terracotta/gold accents.
- **Color Discipline:** Never use glowing gradients without a visible light source; limit saturated signal accents to **one focal element per viewport**; keep `2%–4%` subtle film grain on dark rooms so dark surfaces read as physical material rather than flat `#000`.

---

## 4. The 4-Plane Z-Index Sandwich Checklist

Structure every sticky stage (`sticky top-0 h-svh w-full overflow-hidden`) back-to-front:
1. **Plane 1 (`z-0`):** Base surface, directional light source, or scrubbable diagonal plane.
2. **Plane 2 (`z-10`):** Monumental display typography, custom 3D brand-emblem monument, or geometric construction guides.
3. **Plane 3 (`z-20`):** Whole focal product object, interactive CAD frame, or foreground subject occluding Plane 2.
4. **Plane 4 (`z-30`–`z-40`):** Asymmetric negative-space HUD (fades out early before camera transitions) and floating chapter rail (`section-rail`).

---

## 5. Dual Viewport `100svh` Budget (Laptop `~610px` Height + Mobile `375×667`)

Sticky `h-svh overflow-hidden` stages clip easily on **both** standard Windows laptops (where `1366×768` minus OS taskbar and browser chrome leaves only `~610px–650px` usable height) **and** phones (`375×667`):

1. **Budget Vertical Height Explicitly:** On laptop viewports, keep stage vertical padding compact (`py-6 sm:py-8`), scale repeated index rows with `text-title sm:text-display-md` (not `display-lg` × 4 rows), and verify all rows + bottom bar fit inside `610px` height with breathing room.
2. **Center Floating Inspectors Vertically:** Never pin a floating preview card to `bottom-0` / `bottom-4` inside `h-svh` where it can slice off at the bottom edge. Wrap it in `md:absolute md:inset-y-0 md:right-0 md:flex md:items-center` so it always centers cleanly without conflicting with inner `transform: translate3d(...)` scroll animations.
3. **Mobile Compactness:** Keep scrollytelling active on phones (`375×667`) by switching multi-column inspectors to clean compact stacks, capping media heights (`h-24 sm:h-36 lg:h-44`), using `sm:sticky` on tall archive sheets, and keeping `overflow-x: clip` on `html`.
