# LOOT — Project Blueprint

**Programmable smart card & autonomous treasury OS.**
A single-page, scroll-choreographed product narrative. Five acts. One persistent object.

Status: design locked, implementation not started.
Quality floor: `docs/ANTI-SLOP.md` — binding on copy, code, and pixels.
Repo rules: `AGENTS.md`.
Owner: —
Last updated: 2026-11-12

---

## 1. Thesis

Most fintech sites *claim* autonomy. LOOT *demonstrates* it: a card pays, and the money
is already divided before the receipt finishes printing — then one vault settles a future
obligation on its own.

The site is not a scroll animation with product copy attached. Every scroll beat carries
one fact. If a component cannot name the question it answers and the number it shows, it
does not ship.

### Audience

- Design-engineering recruiters and studio clients evaluating craft.
- Secondary: fintech operators who will read the numbers, not the adjectives.

### Non-goals

- No dashboard product tour. The card is the product surface.
- No pricing tiers, no blog, no auth.
- No decorative motion. No 3D engine. No photoreal EIC/EDC renders.

---

## 2. Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js App Router | `16.4.6` |
| UI runtime | React | `19.3.1` |
| Language | TypeScript, `strict` | `7.0.2` |
| Styling | Tailwind CSS v4 (`@theme`, no config file) | `4.3.5` |
| PostCSS | `@tailwindcss/postcss` | `4.3.5` |
| Fonts | `next/font/google` (self-hosted at build) | — |
| Animation | Hand-written scroll engine + CSS variables | — |

**No** GSAP, Framer Motion, Lenis, Locomotive, or ScrollTrigger. Native sticky + a single
`requestAnimationFrame` scheduler. Rationale: deterministic, reversible, zero bundle cost,
and it keeps native scrollbar, keyboard, trackpad momentum, and find-in-page intact.

### TypeScript rules

- `"strict": true`, `"noUncheckedIndexedAccess": true`, `"exactOptionalPropertyTypes": true`.
- No `any`. No `as` casts except at a documented boundary (parsing `FormData`, reading
  `style.setProperty` values). No non-null assertions — narrow instead.
- `readonly` on all data shapes. Discriminated unions over booleans for state.
- Named exports only. No default exports except Next.js `page.tsx` / `layout.tsx`.
- `type` for data shapes, `interface` for extension points.
- Every exported function gets an explicit return type.
- Unused-code discipline: no `utils/` grab bag. Helpers live next to their only caller
  until a second caller exists.

### Tailwind conventions

Use theme tokens; arbitrary values are the exception, not the habit.

| Do | Don't | Why |
|---|---|---|
| `bg-charcoal-900` | `bg-[#18181C]` | token changes in one place |
| `top-22` | `top-[88px]` | v4 generates any spacing step |
| `text-display-xl` | `text-[clamp(4.5rem,14vw,16rem)]` | fluid scale lives in `@theme` |
| `h-svh` | `h-[100svh]` | built-in unit |
| `motion-reduce:transition-none` | JS media query for a single rule | native variant |
| `text-glow-400` (custom) | `text-violet-600` | never shadow the default palette |

**Permitted arbitrary values** (document why in a comment at the call site):

1. `clip-path` polygon/circle percentages — iris transitions.
2. `translate3d()` with `vw`/`vh` units — cross-viewport scatter.
3. `conic-gradient()` / `radial-gradient()` color stops — card sheen and lighting.
4. `grid-cols-[4fr_8fr]` — asymmetric editorial splits that no scale expresses.

Everything else: extend `@theme` instead of escaping it.

---

## 3. Design tokens

Three layers: **primitive → semantic → act surface**. Only semantic tokens are used in
components. Act tokens are used only by the act's root element.

### 3.1 Primitive

```css
@theme {
  /* charred architecture */
  --color-charcoal-950: #0c0c0f;
  --color-charcoal-900: #18181c;
  --color-charcoal-800: #22222a;
  --color-charcoal-700: #2e2e38;

  /* electric violet — light, never ink */
  --color-ultraviolet-500: #723bfa;
  --color-ultraviolet-600: #5a2bd1;
  --color-ultraviolet-900: #1d0f3d;

  /* acid lime — signal only */
  --color-signal-400: #b9f500;
  --color-signal-600: #8fbf00;

  /* alabaster light room */
  --color-alabaster-50: #f4f4f6;
  --color-alabaster-100: #ebebef;
  --color-alabaster-300: #d8d8e0;

  --color-ink: #121216;
}
```

### 3.2 Semantic

```css
@theme inline {
  --color-canvas: var(--surface-act);
  --color-surface: var(--color-charcoal-800);
  --color-ink-primary: var(--ink-primary);
  --color-ink-secondary: var(--ink-secondary);
  --color-ink-muted: var(--ink-muted);
  --color-hairline: var(--hairline);
  --color-signal: var(--color-signal-400);
  --color-glow: var(--color-ultraviolet-500);
  --color-focus: var(--color-signal-400);
}
```

`--ink-primary` / `--hairline` are set per act surface (dark act: alabaster ink;
light act: ink `#121216`). One set of component classes works in both rooms.

### 3.3 Act surfaces

| Act | Surface | Room | Rationale |
|---|---|---|---|
| 1 Origin | `#18181C` | Charcoal vault | product as object in the dark |
| 2 Anatomy | `#18181C` → `#723BFA` | Violet flood | the interior is lit |
| 3 Flow | `#F4F4F6` | Alabaster | daylight, legibility for numbers |
| 4 Forge | `#18181C` | Charcoal showroom | specular card reads best on dark |
| 5 Spec | `#F4F4F6` | Alabaster dossier | print metaphor, high-contrast close |

No two adjacent acts share a surface. Act 2 *ends* violet so Act 3's alabaster is a cut,
not a fade.

### 3.4 Color discipline (hard rules)

- **Lime budget: one signal element per viewport.** Hairline, active dot, card edge, or a
  single figure. Never a large repeating fill. The accent dies if it is used twice.
- **Violet is light, not text.** `#723BFA` on `#18181C` measures **3.12:1** — legal for
  display ≥24px bold and decorative geometry only. Body copy on violet uses alabaster
  (**5.66:1**).
- Lime on charcoal: **13.5:1**. Charcoal on lime: **13.5:1**. Both safe for any size.
- No gradient *washes* as decoration. Gradients exist only as light (bloom behind the
  card, specular band) and must have a visible light source.
- Grain overlay at 2–4% opacity is mandatory on every act. It is what makes dark surfaces
  read as material rather than as `#000`.

### 3.5 Type

One architectural sans-serif family with variable width and weight contrast, pairing `tabular-nums` for figures.

- **Archivo** (variable, `wght 100–900`, `wdth 62–125`) — display, headings, body, UI controls, and financial data.

```
Wordmark:  Archivo 700, tracking 0.28em, uppercase             (only the mark)
Display:   Archivo 500, tracking -0.04em, uppercase            (hero display lines)
Headings:  Archivo 500, tracking -0.03em, sentence case
Body/UI:   Archivo 400, tracking 0,       sentence case
Data:      Archivo tabular-nums (500/600 weight)
```

Scale tokens (fluid, no arbitrary brackets in components):

```css
@theme {
  --text-display-xl: clamp(4.5rem, 14vw, 15rem);
  --text-display-xl--line-height: 0.86;
  --text-display-xl--letter-spacing: -0.04em;

  --text-display-lg: clamp(2.75rem, 7vw, 5.5rem);
  --text-display-lg--line-height: 0.92;

  --text-display-md: clamp(2rem, 4vw, 3.25rem);
  --text-display-md--line-height: 1;

  --text-title: clamp(1.25rem, 2.2vw, 1.875rem);
  --text-body: 1rem;
  --text-body--line-height: 1.65;
  --text-body-sm: 0.875rem;
  --text-data: 0.8125rem;
  --text-micro: 0.6875rem;
  --text-micro--letter-spacing: 0.08em;
}
```

**Banned typography**: ALL-CAPS eyebrow above every heading; mono for small labels;
`01 / 02 / 03` numbering on every act; accenting a single word in a headline with a
different color; middle-dot meta strings.

### 3.6 Space, radius, elevation, motion

```css
@theme {
  --radius-card: 1.125rem;   /* 18px — the card */
  --radius-panel: 1.5rem;    /* 24px — sheets and panels */
  --radius-pill: 999px;

  --ease-loot: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-snap: cubic-bezier(0.16, 1, 0.3, 1);
}
```

- Radius is *not* uniform: card 18, panel 24, pill 999, hairline 1. A single radius on
  everything is the SaaS-card tell.
- Elevation on dark = light, not shadow: 1px inner top highlight
  (`inset 0 1px 0 rgb(255 255 255 / 0.06)`), 0.5px inner bottom shadow, one wide soft
  drop shadow tinted violet, never neutral gray.
- Scroll damping: `alpha = 1 - Math.exp(-11.5 * dt)`, idle cutoff `|delta| < 0.0004`.
- Only `transform`, `opacity`, `filter` (on isolated layers), and custom properties
  animate. Never `margin`, `padding`, `top/left`, `width/height`, `font-size`.

---

## 4. Narrative spine

Six questions, six answers. Every act owns one; no act answers two.

| # | Visitor asks | Act | Proof carried |
|---|---|---|---|
| 1 | What is it? | 1 | a metal card that pays |
| 2 | What's different? | 1 | the receipt splits 4 ways by itself |
| 3 | How? | 2 | three layers, real hardware |
| 4 | Prove it | 3 | live pipes, vault balances |
| 5 | Can I set the rules? | 4 | drag the slider, watch the split |
| 6 | Can I have one? | 5 | spec sheet + reserve |

### Causality chain (one continuous film, not five slides)

```
card falls → tap → receipt prints → receipt splits → one vault settles a future bill
   → the receipt floods the frame with ledger paper → the card is cut open on that light table
   → the secure core irises open → light enters (alabaster room)
   → pipes fill and divide → four vaults
   → the bench: user changes the card and the rules
   → the dossier: specs stack, claim
```

The card raised in Act 1 is the object dissected in Act 2, on the same alabaster surface the
receipt became. One prop survives three acts; that continuity is what reads as expensive.

**As built, Act 1 ends on an alabaster ledger flood, not a charcoal portal, and Act 2 opens
on that same light table with the card face-up.** The blueprint originally dissected the
terminal; the card is the product, so the card is what gets opened — and the visual handoff
between the two acts carries the continuity instead of a cut.

---

## 5. Act choreography

Runway = outer `<section>` height. Stage = inner `sticky top-0 h-svh`.

| Act | Runway | Camera vector | Subject physics | Mechanic |
|---|---|---|---|---|
| 1 Origin | `380vh` | Z dive (in) | gravity → tap → print | object + aperture |
| 2 Anatomy | `320vh` | isometric tilt + Z extrude | surgical split | dissection |
| 3 Flow | `300vh` | top-down cascade | hydraulic fill | data widget |
| 4 Forge | `220vh` | none (locked bench) | user-driven | click + drag |
| 5 Spec | `260vh` | Y stack (physical) | sheets settle | dossier |

No two acts share a camera vector, a surface, or a mechanic family.

### Act 1 — Origin (8 beats, `380vh`)

| Beat | `p` | Motion | Information payload |
|---|---|---|---|
| 1A Drop | load, 900ms | card falls, 1 bounce, shadow lengthens, violet rim light | it is a physical object: thickness, chamfer, lime edge |
| 1B Dwell | `0.02–0.18` | still. `AUTONOMOUS / WEALTH` behind the card, card occludes the `W` | what it is; CTA clickable |
| 1C Approach | `0.18–0.34` | card descends and tilts toward the terminal, parallax 1.4× | context: it pays |
| 1D Tap | `0.34–0.44` | two NFC ripples, terminal LED wakes lime | contactless, no PIN |
| 1E Approve | `0.44–0.56` | `APPROVED · Rp 480.000`, tabular | a real figure |
| 1F Split | `0.56–0.74` | four receipt lines resolve in sequence — **dwell 18%** | **Tax 96k / Ops 216k / Yield 120k / Payroll 48k** |
| 1G Settle | `0.74–0.86` | Tax line detaches, rises, stamps `TAX Q3 · SETTLED EARLY · 14 OCT` | **proof of "autonomous"** |
| 1H Portal | `0.86–1.00` | receipt stretches into a full-bleed alabaster ledger grid, with a fixed rule line | transition into Act 2 |

Rules:

- 1A runs **once on load** via CSS keyframes. On scroll-back it must not replay.
- Beat stops: nothing moves between `0.02–0.18` except the card's ambient sheen.
- Merchant is `Team dinner · Rp 480.000` — a business expense. Tax/payroll splits on a
  personal coffee would be incoherent, and finance readers will catch it.
- Amounts must sum exactly to the charge. See §7.
- The terminal is flat vector: charcoal slab, 2px lime LED, violet glass screen with the
  same grain as the page. Never a photoreal EDC.
- The terminal sits bottom-right and the card lands on top of its left edge. The receipt
  unfolds from the terminal's mouth; it must never overflow the stage.
- Rule set A (`Tax 20 · Ops 45 · Yield 25 · Payroll 10`) fades in on the left at `0.28` as
  the receipt resolves, so the split has a stated cause before the numbers appear.

### Act 2 — Anatomy (`320vh`)

| Phase | `p` | Motion | Payload |
|---|---|---|---|
| Establish | `0.00–0.16` | the alabaster ledger from 1H is still on screen; the card sits face-up on it, front face only | we are on the light table |
| Dim | `0.08–0.30` | the room darkens to charcoal; violet rim light rises from the card edge | we are inside the machine |
| Tilt | `0.18–0.40` | `perspective(1200px) rotateX(52deg) rotateZ(-24deg)`, background floods ultraviolet | blueprint reading plane |
| Extrude | `0.40–0.70` | three layers separate on Z: engine `translateZ(0)`, core `+110`, shell `+220`; 0.8mm edge shadow per layer | three real parts |
| Annotate | `0.55–0.82` | leader lines scale out from the right rail; labels lock in | `Anodized shell` / `Secure core` / `Spend engine` — each with one clause of what it does |
| Iris out | `0.82–1.00` | secure core becomes an aperture, `clip-path: circle(0% → 120%)`, alabaster light floods | causal cut into Act 3 |

Labels state function, not poetry: `Secure core — a device-bound element authorises in under
400 ms, offline.`

Extrusion is `110 / 220px`, not `40 / 80px`: at the blueprint's values the plates still read as
one card at 1440×900. The larger offsets are what make the dissection legible without a
labelled cutaway.

On mobile the plates stack vertically above a three-row label list, and the three labels are
rows rather than a grid — three columns of 11px type at 375px wide is unreadable.

### Act 3 — Flow (`300vh`)

| Phase | `p` | Motion | Payload |
|---|---|---|---|
| Land | `0.00–0.22` | alabaster room settles, headline dwell | "Money that moves while you sleep." |
| Cascade | `0.22–0.68` | a single flow head descends; pipes branch in sequence, not together; stroke widths track each vault's share | the split ratio is legible as *width* |
| Settle | `0.68–0.86` | four vault nodes lock; figures snap in, tabular | balances in IDR |

Figures **snap**, they do not count up. A count-up implies the balance is still moving; these
are settled amounts, and animating them would be a lie told in 24 frames.
| Hold | `0.86–1.00` | still; one lime hairline under the active node | dwell for reading |

Pipes are 1px hairline geometry, not glowing tubes. The flow head is the only moving
element at any moment — one focal point per frame.

The field opens on a source node above the junction: `Team dinner`, the total, and
`Approved in 0.4 s`. Without it the diagram is an abstract tree; with it, the branches are
money leaving a specific charge. On mobile the same figures become four full-width rows with
bars, and the source line is the receipt total at the top.

### Act 4 — Forge (`220vh`)

| Phase | `p` | Motion |
|---|---|---|
| Turn | `0.00–0.22` | card rotates from side profile to face-on under a studio key light |
| Lock | `0.22–1.00` | **stage is fully static** — this act belongs to the user |

Interactive, all live without re-rendering the stage:

- **Edition picker**: Stealth Charcoal / Ultraviolet / Acid. Two CSS variables on the card
  root change; no component remount.
- **Spend slider**: native `<input type="range">`, keyboard accessible, `aria-valuetext`
  in IDR. Drives the split preview.
- **Over-limit state**: past the cap, the terminal strip turns to muted amber and reads
  `Declined · over per-transaction limit` with `Adjust limit` — the refusal belongs here,
  where it answers the user's own action, never in the hero.
- **Tap moment**: clicking the card fires the NFC ripple and an 800ms split animation.
  One memorable micro-interaction, not decoration.

### Act 5 — Spec (`260vh`)

| Phase | `p` | Motion |
|---|---|---|
| Stack | `sm:sticky` sheets at `4rem + 0 / 1.25 / 2.5 / 3.75rem` | dossier settles sheet over sheet |
| Read | dwell per sheet | specs in dense small type — the scale contrast against Act 1 is the point |
| Claim | `0.80–1.00` | single field, single button, one lime hairline |

Sheets: `Materials`, `Security`, `Treasury rules`, `Issuing`. Each carries a die-cut notch
and a 1px foil line — the physical cue that makes a spec table feel printed.

---

## 6. Page skeleton

```
<main>
  <GrainOverlay />                 fixed, pointer-events-none, z-50
  <ActRail />                      fixed right, dots + labels on focus
  <ActOneOrigin />                 section 380vh > sticky stage
    <Plane1 backdrop />
    <Plane2 type AUTONOMOUS / WEALTH />   z-10, parallax -44px
    <Plane3 Card />                       z-20, occludes the W
    <Plane3.5 Terminal + Receipt />       z-20
    <Plane4 hud />                        z-30, fades 0.04→0.18
  <ActTwoAnatomy />
  <ActThreeFlow />
  <ActFourForge />
  <ActFiveSpec />
  <Footer />
</main>
```

Four planes per stage, back to front. Plane 4 (editorial HUD) always fades out before any
camera move so text never collides with the transition.

### File structure

```
src/
  app/
    layout.tsx                 fonts, metadata, <html> surface
    page.tsx                   server component, composes acts
    globals.css                @import tailwindcss, @theme, @property, grain
  components/
    stages/
      origin/        ActOneOrigin.tsx  LootCard.tsx  Terminal.tsx  Receipt.tsx
      anatomy/       ActTwoAnatomy.tsx LayerStack.tsx LeaderLine.tsx
      flow/          ActThreeFlow.tsx  PipeField.tsx  VaultNode.tsx
      forge/         ActFourForge.tsx  EditionPicker.tsx  SpendSlider.tsx  SplitPreview.tsx
      spec/          ActFiveSpec.tsx   SpecSheet.tsx  ClaimForm.tsx
    chrome/          ActRail.tsx  BrandMark.tsx  GrainOverlay.tsx  Hairline.tsx
    ui/              Button.tsx  Range.tsx  Pill.tsx
  lib/
    scroll/          engine.ts  use-stage-progress.ts  math.ts
    treasury/        split.ts  rules.ts  format.ts
    content/         acts.ts  copy.ts
```

Server components by default. `'use client'` only on files that own a stage or a control.

---

## 7. Treasury logic (types + invariants)

`split()` must be exact under rounding. Use the largest-remainder method so parts always
sum to the charge — a split that leaves Rp 1 unassigned is a credibility bug.

```ts
export type VaultId = 'tax' | 'ops' | 'yield' | 'payroll';

export interface VaultRule {
  readonly id: VaultId;
  readonly label: string;
  readonly sharePct: number;      // 0–100, sums to 100 across rules
}

export interface SplitLine {
  readonly id: VaultId;
  readonly label: string;
  readonly amountIdr: number;
}

export interface SplitResult {
  readonly totalIdr: number;
  readonly lines: readonly SplitLine[];
  readonly remainderIdr: number;  // always 0 after distribution
}
```

Invariants, asserted in a test:

1. `lines.reduce(sum) === totalIdr` for every `totalIdr ∈ {0, 1, 479_999, 480_000, 1e9}`.
2. `remainderIdr === 0`.
3. `rules.reduce(sharePct) === 100` — validated at compile-time by a literal tuple, at
   runtime by a dev-only assertion.
4. Ties in largest remainder break by a fixed vault order, never by sort instability.

Default rules: `tax 20 · ops 45 · yield 25 · payroll 10`.

Reference figures for Act 1 at Rp 480.000: **96.000 / 216.000 / 120.000 / 48.000**.

Formatting: `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })`.
Never hand-roll a thousands separator.

---

## 8. Scroll engine

One scheduler for the whole page. One `scroll` listener, passive. One rAF loop that
terminates when everything is at rest — 0% CPU idle.

```ts
export interface StageBinding {
  readonly el: HTMLElement;
  readonly damping: number;      // 10–13
}

/** Registers a sticky stage; engine writes `--p` and derived vars on its element. */
export function bindStage(binding: StageBinding): () => void;
```

Per frame, in this exact order:

1. **Read** every binding's `getBoundingClientRect().top` and `offsetHeight` (batched).
2. Compute `raw = clamp(-top / (height - viewport), 0, 1)`.
3. Damp toward `raw` with the frame-rate-independent alpha.
4. **Write** `el.style.setProperty('--p', p)` plus derived vars the act needs:
   `--enter`, `--exit`, `--bell`, `--split`, `--content`.

Never `setState` per frame. React renders only on semantic transitions
(`activeAct`, `isOverLimit`, `edition`).

CSS cannot do `smoothstep`, so derived easing is computed in TS and written as a second
variable. Register both so `calc()` interoperates with typed custom properties:

```css
@property --p    { syntax: '<number>'; inherits: true; initial-value: 0; }
@property --enter{ syntax: '<number>'; inherits: true; initial-value: 0; }
```

Layout thrash guard: reads are batched before writes; no binding may call
`getBoundingClientRect` outside the engine's read phase.

`scrollToProgress(actId, ratio)` exists for the Act rail and for clickable pills. Uses
`behavior: reducedMotion ? 'auto' : 'smooth'`.

---

## 9. Accessibility

Not optional, and not a post-pass.

- **Reduced motion**: `prefers-reduced-motion: reduce` renders the editorial stack — all
  five acts as normal flowing sections, every figure and spec visible, no sticky stages,
  no scroll linkage. The content must be complete, not a "best viewed with animation"
  apology.
- **The receipt is readable without watching.** A static `sr-only` paragraph carries
  `Team dinner. Approved. Total Rp 480.000. Split on approval: Tax 96.000. Ops 216.000.
  Yield 120.000. Payroll 48.000.` It is present from the first frame, so screen readers get
  the payload immediately instead of waiting for a scroll position. A per-frame `aria-live`
  region would re-announce the same receipt on every tick and was rejected.
- **Keyboard**: Act rail is a real `nav` with focusable buttons and visible `--color-focus`
  rings. Slider is a native range. Edition picker is a `radiogroup` with arrow-key support.
- **Pointer discipline**: every decorative, faded, or off-phase layer is
  `pointer-events-none`. Buttons inside stages are `pointer-events-auto`. No CTA may ever
  be covered by a `opacity-0` overlay.
- Focus order follows DOM order; no `tabindex > 0`.
- Contrast: enforced by §3.4. Violet never carries body text.
- Form: labelled input, `aria-describedby` for the note, `:user-invalid` styling, real
  `<form>` submit, no client-side-only validation theatre.

---

## 10. Performance budget

| Metric | Target |
|---|---|
| Framework JS (Next + React) | ≤ 130 kB gzip |
| Total page JS | ≤ 180 kB gzip |
| Lighthouse Performance | ≥ 92 desktop, ≥ 82 mobile |
| CLS | < 0.02 |
| Frames | 60fps at 1440×900 on a 4× CPU throttle |
| Animated layers per frame | ≤ 6 transform-only elements |
| Idle CPU | 0% (rAF terminated) |

Techniques: CSS-only load drop, `will-change-transform` scoped to actively moving layers
and removed after, no image assets except the OG card, grain as inline SVG `feTurbulence`
(one node, `mix-blend-overlay`), font subsets via `next/font` with `display: swap`.

Mobile: `h-svh` everywhere, offsets clamped to viewport, terminal at 40% scale, receipt
collapsed to two lines plus four vault pills, sheets non-sticky below `sm`.

---

## 11. Copy deck

Voice: plain verbs, sentence case, no adjectives doing the work of facts. Numbers are
always real.

| Slot | Copy |
|---|---|
| Hero display | `AUTONOMOUS` / `WEALTH` |
| Hero HUD | Spend once. Divided four ways. Automatically. |
| Hero CTA | Reserve a card |
| 1E approve | APPROVED · Rp 480.000 · Team dinner |
| 1G settle | TAX Q3 · SETTLED EARLY · 14 OCT |
| Act 2 title | Three layers. One decision. |
| Act 2 labels | Anodized shell — sealed, 6.1 g. · Secure core — offline auth under 400 ms. · Spend engine — your rules, executed locally. |
| Act 3 title | Money that moves while you sleep. |
| Act 3 body | Set a rule once. Every payment divides itself before it clears. |
| Act 4 title | Set the rules once. |
| Act 4 body | Change the edition, move the slider, watch the split resolve. |
| Act 4 declined | Declined · over per-transaction limit |
| Act 5 title | Everything, specified. |
| Claim | Reserve a card · No charge until it ships |

Banned strings: `60FPS`, `WebGL2`, `Zero-Latency`, `AES-256`, `001 / 005`, `Powered by AI`,
`Next-Gen`, `Seamless`, `Unlock the power of`.

---

## 12. Acceptance criteria

Ship only when all pass.

- [ ] `tsc --noEmit` clean under the flags in §2.
- [ ] `next build` clean, no hydration warnings in console.
- [ ] Zero arbitrary `[]` values outside the four documented exceptions.
- [ ] No two adjacent acts share surface or camera vector.
- [ ] Every text block holds `opacity: 1`, `translate3d(0,0,0)` for ≥ 15% of its act.
- [ ] `375×667` and `768×1024`: no clipping, no horizontal scroll, all copy reachable.
- [ ] Reduced motion: full content readable, zero scroll linkage.
- [ ] Keyboard-only path reaches every control with visible focus.
- [ ] `aria-live` receipt fires once, not on every frame.
- [ ] Split invariants pass (§7) including `totalIdr = 1` and `479_999`.
- [ ] No `pointer-events` dead zones over any button.
- [ ] Idle CPU 0% after 2s without scroll.

---

## 13. Build phases

| Phase | Scope | Exit |
|---|---|---|
| P0 | scaffold, `@theme` tokens, fonts, grain, engine, act rail shell | blank page scrolls at 60fps, tokens visible in a swatch route |
| P1 | Act 1, all 8 beats, reduced-motion fallback | receipt splits and announces correctly |
| P2 | Act 2, tilt/extrude/leader lines, iris out | transition feels causal at 4× throttle |
| P3 | Act 3, hydraulic cascade, counting figures | widths track the real ratios |
| P4 | Act 4, edition picker, slider, over-limit state | keyboard-only pass |
| P5 | Act 5, sheet stack, claim form, footer | no clipping on 375×667 |
| P6 | audit against §12, Lighthouse, mobile pass | all boxes checked |

Housekeeping — **done 2026-11-12**: the root `SKILL.md` stub was removed (it registered the
whole repo as an unfilled skill), and `.opencode/skills` is now a directory junction to
`.agents/skills`, so there is one copy and no version drift. Repo rules live in `AGENTS.md`;
the quality floor lives in `docs/ANTI-SLOP.md`.

---

## 14. Open questions

1. **Brand mark.** The double-loop `8` is referenced but no asset exists. Options: hand
   build an SVG with two stroked loops so it can draw itself on load; or commission.
2. **OG image.** Generated at build from the Act 1 frame, or a static render?
3. **Product UI inside the portal.** For 1H and Act 3, do we render a real mini-ledger
   component (more work, more credible) or a stylised panel (faster, weaker)? Recommend
   a real component driven by the same `split()` used in Act 4, so the numbers match.
4. **Analytics.** None planned. Confirm no tracking script is required.
