# Scroll Math & Physics Engine (`scrollMath.ts`)

All scrollytelling stages must be driven by a deterministic, dependency-free **Scroll Math & Physics Engine** that converts native browser scroll position into a damped, normalized progress value $p \in [0, 1]$.

Why this architecture outperforms heavy scroll-jacking libraries:
- **Native Scrollbar Integrity**: The user keeps native trackpad momentum, touch scrolling, keyboard `PageDown`/`Space` navigation, and browser find-in-page.
- **Frame-Rate Independent Exponential Damping**: Smooths out discrete mouse-wheel ticks (`alpha = 1 - Math.exp(-dampingRate * dt)`) without lag on 60Hz, 120Hz ProMotion, or 144Hz displays.
- **100% Reversible**: Every visual property (`translate3d`, `scale`, `rotate`, `opacity`) is a pure mathematical function of `progress`. Scrolling up reverses every animation frame-accurately.
- **Zero-Cost Idle**: The `requestAnimationFrame` loop automatically terminates (`rafRef.current = null`) the instant `Math.abs(delta) < 0.0004`, consuming 0% CPU/GPU when the user stops scrolling.

---

## Complete Reference Implementation (`src/components/scrollytelling/scrollMath.ts`)

Copy or adapt this module in any React / Next.js project:

```tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Clamps a number between [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Linear interpolation between start and end for t in [0, 1]. */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/** C1-continuous Hermite smoothstep (3t^2 - 2t^3) for organic acceleration/deceleration. */
export function smoothstep(t: number): number {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
}

/** Maps a global progress value [0, 1] into a normalized sub-range [start, end] -> [0, 1]. */
export function rangeProgress(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start), 0, 1);
}

/** Maps a global progress value into a smoothstepped sub-range [start, end] -> [0, 1]. */
export function easedRange(value: number, start: number, end: number): number {
  return smoothstep(rangeProgress(value, start, end));
}

/**
 * Generates a smooth 0 -> 1 -> 0 bell curve over [start, end] peaking at the midpoint.
 * Ideal for atmospheric mist bursts, temporary chromatic shifts, or midpoint scale pulses.
 */
export function bellCurve(value: number, start: number, end: number): number {
  const t = rangeProgress(value, start, end);
  return Math.sin(t * Math.PI);
}

export interface UseSectionScrollResult {
  readonly sectionRef: React.RefObject<HTMLElement | null>;
  readonly progress: number;
  readonly reducedMotion: boolean;
  readonly scrollToProgress: (targetRatio: number) => void;
}

/**
 * Tracks normalized scroll progress [0..1] through a tall <section> runway
 * containing a `sticky top-0 h-svh` stage, with exponential damping and
 * automatic `prefers-reduced-motion` support.
 */
export function useSectionScrollProgress(
  dampingRate: number = 11.5
): UseSectionScrollResult {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const targetRef = useRef<number>(0);
  const currentRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = (): void => {
      setReducedMotion(motionQuery.matches);
    };
    syncMotion();

    const tick = (now: number): void => {
      const dt =
        lastTimeRef.current > 0
          ? Math.min(0.05, (now - lastTimeRef.current) / 1000)
          : 1 / 60;
      lastTimeRef.current = now;

      const delta = targetRef.current - currentRef.current;
      if (Math.abs(delta) < 0.0004) {
        currentRef.current = targetRef.current;
        setProgress(targetRef.current);
        rafRef.current = null;
        lastTimeRef.current = 0;
        return;
      }

      const alpha = 1 - Math.exp(-dampingRate * dt);
      const next = currentRef.current + delta * alpha;
      currentRef.current = next;
      setProgress(next);
      rafRef.current = window.requestAnimationFrame(tick);
    };

    const measure = (immediate: boolean): void => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollable = Math.max(1, el.offsetHeight - window.innerHeight);
      const raw = clamp(-rect.top / scrollable, 0, 1);
      targetRef.current = raw;

      if (immediate || motionQuery.matches) {
        currentRef.current = raw;
        setProgress(raw);
        return;
      }

      if (rafRef.current === null) {
        lastTimeRef.current = 0;
        rafRef.current = window.requestAnimationFrame(tick);
      }
    };

    const handleScrollOrResize = (): void => measure(false);

    measure(true);
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    motionQuery.addEventListener('change', syncMotion);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      motionQuery.removeEventListener('change', syncMotion);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [dampingRate]);

  const scrollToProgress = useCallback(
    (targetRatio: number): void => {
      const el = sectionRef.current;
      if (!el || typeof window === 'undefined') return;

      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollable = Math.max(0, el.offsetHeight - window.innerHeight);
      const destination = sectionTop + scrollable * clamp(targetRatio, 0, 1);

      window.scrollTo({
        top: Math.max(0, destination),
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    },
    [reducedMotion]
  );

  return {
    sectionRef,
    progress,
    reducedMotion,
    scrollToProgress,
  };
}
```

---

## Essential Choreography Math Patterns

### 1. Enter -> Dwell -> Exit Window (3-Phase Element Lifecycle)
To make a headline or card enter smoothly, stay locked at `100%` opacity and `0px` offset during its **Dwell Plateau**, and then exit cleanly:

```ts
// Enters during [0.25 -> 0.42], dwells cleanly during [0.42 -> 0.68], exits during [0.68 -> 0.84]
const enterT = easedRange(progress, 0.25, 0.42);
const exitT = easedRange(progress, 0.68, 0.84);

const opacity = enterT * (1 - exitT);
const translateY = lerp(32, 0, enterT) + lerp(0, -28, exitT);
```
*Notice that for `progress ∈ [0.42, 0.68]`, `enterT = 1` and `exitT = 0`, which guarantees `opacity = 1` and `translateY = 0`—a rock-solid dwell plateau!*

### 2. Multi-Item Stepped Dwell vs. Transition Math (`computeSteppedTransition`)
When cycling through $N$ items (projects, product flavors, chapters) inside a single sticky stage:

```ts
export interface SteppedTransitionState {
  readonly fromIndex: number;
  readonly toIndex: number;
  readonly blend: number;        // 0 during dwell, smoothstep(0..1) during transition
  readonly burstIntensity: number; // 0 during dwell, sin(t * PI) peaking at 1.0 mid-transition
  readonly activeIndex: number;
}

export function computeSteppedTransition(
  progress: number,
  count: number,
  transitionRatio: number = 0.46
): SteppedTransitionState {
  if (count <= 1) {
    return { fromIndex: 0, toIndex: 0, blend: 0, burstIntensity: 0, activeIndex: 0 };
  }

  const unit = 1 / (count + (count - 1) * transitionRatio);
  const dwellWidth = unit;
  const transWidth = unit * transitionRatio;
  const stride = dwellWidth + transWidth;

  const p = clamp(progress, 0, 1);
  const seg = Math.min(count - 1, Math.floor(p / stride));
  const local = p - seg * stride;

  if (seg >= count - 1 || local <= dwellWidth) {
    return {
      fromIndex: seg,
      toIndex: seg,
      blend: 0,
      burstIntensity: 0,
      activeIndex: seg,
    };
  }

  const rawT = clamp((local - dwellWidth) / Math.max(0.0001, transWidth), 0, 1);
  const blend = smoothstep(rawT);
  const burstIntensity = Math.sin(rawT * Math.PI);

  return {
    fromIndex: seg,
    toIndex: seg + 1,
    blend,
    burstIntensity,
    activeIndex: blend >= 0.5 ? seg + 1 : seg,
  };
}
```

### 3. Scroll Runway Sizing Formula (`minHeight`)
Choose `minHeight` on the outer `<section>` so the scroll velocity feels natural and unhurried:
- **Single-Beat Portal Dive or Curtain Morph:** `220vh – 270vh`
- **Scatter-to-Converge or Object Dissection:** `280vh – 320vh`
- **Multi-Item Stepped Showcase ($N$ items):** `${Math.max(320, count * 115)}vh` (approx. `110vh–125vh` per item so each item gets ~`75vh` of dwell runway and ~`40vh` of transition runway).

