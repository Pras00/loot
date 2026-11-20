# Scroll Math & Zero-Re-Render CSS Custom Property Engine

All scrollytelling stages must be driven by a **single, page-wide, dependency-free scroll engine** that writes CSS custom properties directly to stage DOM nodes—**zero React `setState` per animation frame**.

Why this architecture outperforms both heavy scroll-jacking libraries and per-component `useState(progress)` hooks:
- **Zero Per-Frame React Re-Renders**: React only renders on semantic state changes (active chapter dot, selected tab, slider input), never 60–120 times per second during scroll.
- **Single Listener + Batched Read/Write**: One passive `scroll` listener and one `requestAnimationFrame` loop read all `getBoundingClientRect()` values together before writing any `style.setProperty(...)`, eliminating layout thrashing.
- **Native Scrollbar Integrity**: Preserves native trackpad momentum, touch inertia, keyboard `PageDown`/`Space`, and browser find-in-page.
- **Frame-Rate Independent Exponential Damping**: Smooths discrete wheel ticks (`alpha = 1 - Math.exp(-damping * dt)`) consistently across 60Hz, 120Hz, and 144Hz displays.
- **0% Idle CPU**: The rAF loop terminates automatically once `Math.abs(delta) < 0.0004`.

---

## Architecture Overview (3 Small Files in `src/lib/scroll/`)

1. **`math.ts`** — Pure deterministic easing functions (`clamp`, `lerp`, `smoothstep`, `rangeProgress`, `easedRange`, `bellCurve`, `css`).
2. **`engine.ts`** — Single page-wide scheduler (`registerStage`, `subscribeActiveAct`, `scrollToChapter`).
3. **`use-stage.ts`** — Thin React hook that binds a section `ref` to its pure `choreography.ts` function.

---

## 1. Pure Scroll Math (`src/lib/scroll/math.ts`)

```ts
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/** C1-continuous Hermite smoothstep (3t^2 - 2t^3). */
export function smoothstep(t: number): number {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

export function rangeProgress(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start), 0, 1);
}

export function easedRange(value: number, start: number, end: number): number {
  return smoothstep(rangeProgress(value, start, end));
}

/** 0 -> 1 -> 0 over [start, end], peaking at the midpoint. */
export function bellCurve(value: number, start: number, end: number): number {
  return Math.sin(rangeProgress(value, start, end) * Math.PI);
}

/** Fixed-decimal string for CSS custom properties. */
export function css(value: number, decimals = 3): string {
  return value.toFixed(decimals);
}
```

---

## 2. Single-Loop Batched Scheduler (`src/lib/scroll/engine.ts`)

```ts
'use client';

import { clamp } from './math';

export type StageVars = Readonly<Record<`--${string}`, string>>;
export type StageChoreography = (progress: number) => StageVars;

interface StageBinding {
  readonly el: HTMLElement;
  readonly damping: number;
  readonly choreography: StageChoreography;
  readonly applied: Map<string, string>;
  target: number;
  value: number;
}

const REST_THRESHOLD = 0.0004;
const DEFAULT_DAMPING = 11.5;

const bindings = new Set<StageBinding>();
const actListeners = new Set<(id: string) => void>();
let currentActiveAct = 'origin';
let frameHandle: number | null = null;
let lastTimestamp = 0;
let motionQuery: MediaQueryList | null = null;
let listening = false;

function prefersReducedMotion(): boolean {
  if (motionQuery === null && typeof window !== 'undefined') {
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  }
  return motionQuery?.matches ?? false;
}

/** Writes only custom properties whose value actually changed. */
function apply(binding: StageBinding): void {
  const vars = binding.choreography(binding.value);
  for (const [key, raw] of Object.entries(vars)) {
    if (binding.applied.get(key) === raw) continue;
    binding.el.style.setProperty(key, raw);
    binding.applied.set(key, raw);
  }
  for (const key of binding.applied.keys()) {
    if (!(key in vars)) {
      binding.el.style.removeProperty(key);
      binding.applied.delete(key);
    }
  }
}

function schedule(): void {
  if (frameHandle !== null) return;
  frameHandle = window.requestAnimationFrame(tick);
}

function tick(timestamp: number): void {
  frameHandle = null;
  const dt = lastTimestamp === 0 ? 1 / 60 : Math.min(0.05, (timestamp - lastTimestamp) / 1000);
  lastTimestamp = timestamp;
  const reduced = prefersReducedMotion();
  const viewportHeight = window.innerHeight;

  // 1. Batched READ phase (geometry only)
  const reads: Array<{ binding: StageBinding; top: number; height: number }> = [];
  for (const binding of bindings) {
    const rect = binding.el.getBoundingClientRect();
    reads.push({ binding, top: rect.top, height: binding.el.offsetHeight });
  }

  let moving = false;
  for (const read of reads) {
    const scrollable = Math.max(1, read.height - viewportHeight);
    const target = clamp(-read.top / scrollable, 0, 1);
    read.binding.target = target;

    const delta = target - read.binding.value;
    if (reduced || Math.abs(delta) < REST_THRESHOLD) {
      read.binding.value = target;
      continue;
    }
    read.binding.value += delta * (1 - Math.exp(-read.binding.damping * dt));
    moving = true;
  }

  // 2. Batched WRITE phase (CSS custom properties only)
  for (const read of reads) apply(read.binding);

  if (moving) schedule();
  else lastTimestamp = 0;
}

export function registerStage(
  el: HTMLElement,
  choreography: StageChoreography,
  damping: number = DEFAULT_DAMPING,
): () => void {
  if (prefersReducedMotion()) return () => {};

  const binding: StageBinding = {
    el,
    damping,
    choreography,
    applied: new Map<string, string>(),
    target: 0,
    value: 0,
  };
  bindings.add(binding);

  if (!listening) {
    listening = true;
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
  }

  // Immediate initial measure so styles settle on mount
  const rect = el.getBoundingClientRect();
  const scrollable = Math.max(1, el.offsetHeight - window.innerHeight);
  binding.value = binding.target = clamp(-rect.top / scrollable, 0, 1);
  apply(binding);
  schedule();

  return () => {
    bindings.delete(binding);
    binding.applied.clear();
    if (bindings.size === 0 && listening) {
      listening = false;
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frameHandle !== null) {
        window.cancelAnimationFrame(frameHandle);
        frameHandle = null;
      }
      lastTimestamp = 0;
    }
  };
}
```

---

## 3. React Hook (`src/lib/scroll/use-stage.ts`)

```ts
'use client';

import { useEffect, type RefObject } from 'react';
import { registerStage, type StageChoreography } from './engine';

export function useStage(
  ref: RefObject<HTMLElement | null>,
  choreography: StageChoreography,
  damping = 11.5,
): void {
  useEffect(() => {
    const el = ref.current;
    if (el === null) return;
    return registerStage(el, choreography, damping);
  }, [ref, choreography, damping]);
}
```

---

## 4. Mandatory SSR Pre-Hydration Fallback Discipline (Anti-Flash Law)

Because `useStage` runs in `useEffect` *after* initial HTML paint, **any custom property without a fallback default will resolve as invalid on SSR**, causing `opacity: var(--frame-0)` to fall back to `opacity: 1` and flash overlapping hidden text on every reload!

**Always apply BOTH safeguards:**
1. **Inline CSS Fallback Defaults** on every scroll-driven element:
   - Hidden-at-load elements: `opacity: 'var(--frame-0, 0)'`, `opacity: 'var(--stage-o, 0)'`
   - Visible-at-load elements: `opacity: 'var(--hud-o, 1)'`, `transform: 'scale(var(--card-s, 1))'`
2. **Typed `@property` Initial Values** in `globals.css`:
```css
@property --p       { syntax: "<number>";  inherits: true; initial-value: 0; }
@property --frame-0 { syntax: "<number>";  inherits: true; initial-value: 0; }
@property --ms-num  { syntax: "<integer>"; inherits: true; initial-value: 0; }
```

---

## 5. Pure-CSS 60fps Live Counters (`@property` + `counter()`)

To animate a ticking number during scroll (e.g., `0.00s -> 0.40s` chip execution time, percentage, or depth) with **zero React renders**:

```css
@property --ms-num {
  syntax: "<integer>";
  inherits: true;
  initial-value: 0;
}

.ms-counter::before {
  counter-reset: ms var(--ms-num, 0);
  content: "0." counter(ms, decimal-leading-zero) "s";
}
```
Emit `'--ms-num': String(Math.round(lerp(0, 40, dive)))` inside `choreography.ts`.

---

## 6. Zero-Seam Stage Overlap & Stepped Dwell Math

### Zero-Seam Overlap Between Consecutive Sticky Acts
When Act $N+1$ wipes or fades directly over Act $N$ with zero dead scroll space:
- Give Act $N+1$ an overlap class (`margin-top: -150svh;`) and higher `z-index` (`z-20`, `z-30`, `z-40`).
- Gate its visibility in `choreography.ts` (`'--stage-o': css(p <= 0.002 ? 0 : 1, 2)`) and put `pointer-events-none` on the outer `<section>` and `pointer-events-auto` on the visible inner surface so it never blocks buttons in Act $N$.

### Enter -> Dwell -> Exit Window (3-Phase Element Lifecycle)
```ts
const enterT = easedRange(p, 0.25, 0.42);
const exitT = easedRange(p, 0.68, 0.84);
const opacity = enterT * (1 - exitT);
const yRem = lerp(1.5, 0, enterT) + lerp(0, -1.25, exitT);
```
During `p ∈ [0.42, 0.68]`, `opacity = 1` and `yRem = 0`—a rock-solid dwell plateau.

### Multi-Item Stepped Dwell Math (`computeSteppedTransition`)
For $N$ items in one sticky stage, use `transitionRatio = 0.46`, `unit = 1 / (count + (count - 1) * transitionRatio)`, `dwellWidth = unit`, `stride = unit * (1 + transitionRatio)`. During `local <= dwellWidth`, `blend = 0` and `burstIntensity = 0`. During transition, `blend = smoothstep(rawT)` and `burstIntensity = Math.sin(rawT * Math.PI)`.

### Scroll Runway Sizing Formula (`min-height`)
- **Single-Beat Curtain / Wipe:** `240svh – 300svh`
- **Interactive Scrubber / Dissection:** `320svh – 360svh`
- **Multi-Beat Dive or Construction:** `480svh – 540svh`
- **Multi-Item Stepped Showcase ($N$ items):** `${Math.max(340, count * 115)}svh`
