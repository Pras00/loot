import type { StageVars } from '@/lib/scroll/engine';
import { bellCurve, clamp, css, easedRange, lerp } from '@/lib/scroll/math';

/**
 * Section 1 — Hero & The Dimensional Dive (`000° -> 145°`).
 *
 * 0.00–0.14  Initial 23.6° diagonal slash hero ("You tap once." / "It splits four ways.")
 * 0.10–0.84  Camera flies down the 3D/wireframe tunnel of the LOOT emblem & card
 *            while 4 gigantic narrative frames (01..04) sequence in the bottom-left
 *            and the degree counter turns from 00° to 145°.
 * 0.76–0.90  Central vanishing-point light expands into the warm alabaster surface
 *            of Section 2.
 */
export function originChoreography(progress: number): StageVars {
  const p = clamp(progress, 0, 1);

  const hudExit = easedRange(p, 0.06, 0.18);
  const dive = easedRange(p, 0.08, 0.82);
  const cardFade = 1 - easedRange(p, 0.14, 0.34);
  const exitLight = easedRange(p, 0.76, 0.89);

  const f0 = bellCurve(p, 0.14, 0.34);
  const f1 = bellCurve(p, 0.31, 0.51);
  const f2 = bellCurve(p, 0.48, 0.68);
  const f3 = easedRange(p, 0.64, 0.76) * (1 - easedRange(p, 0.82, 0.89));

  const degInt = Math.round(lerp(0, 145, dive));

  return {
    '--p': css(p, 4),
    '--dive': css(dive, 4),
    '--deg-num': String(degInt),

    '--hud-o': css(1 - hudExit, 4),
    '--hud-y': `${css(hudExit * 1.25, 3)}rem`,
    '--card-o': css(cardFade, 4),
    '--card-s': css(lerp(1, 1.35, easedRange(p, 0.06, 0.32)), 4),

    '--tunnel-s': css(lerp(0.88, 3.4, dive), 4),
    '--tunnel-r': `${css(lerp(0, 145, dive), 2)}deg`,
    '--tunnel-o': css(1 - exitLight * 0.85, 4),

    '--frame-0': css(f0, 4),
    '--frame-1': css(f1, 4),
    '--frame-2': css(f2, 4),
    '--frame-3': css(f3, 4),

    '--exit-light': css(exitLight, 4),
  };
}
