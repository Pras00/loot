/**
 * Dependency-free scroll math. Every value is a pure function of progress so
 * scrubbing backward is frame-accurate.
 */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/** C1-continuous Hermite smoothstep. */
export function smoothstep(t: number): number {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

export function rangeProgress(value: number, start: number, end: number): number {
  if (end <= start) {
    return value >= end ? 1 : 0;
  }
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
