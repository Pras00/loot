import type { StageVars } from '@/lib/scroll/engine';
import { bellCurve, clamp, css, easedRange, lerp } from '@/lib/scroll/math';

/**
 * Section 1 — Hero & The 0.40s 4-Vault Prism Split Dive.
 *
 * 0.00–0.12  Initial 23.6° diagonal slash hero with whole card & LOOT 4-Vault Prism behind it.
 * 0.08–0.84  Camera flies straight through the prism aperture as the 4 shards separate
 *            outward into 4 quadrants, chip timer counts 0.00s -> 0.40s, and 4 statements
 *            appear sequentially in alternating quadrants.
 * 0.76–0.89  Central vanishing-point glow expands into the warm alabaster surface of Section 2.
 */
export function heroDiveChoreography(progress: number): StageVars {
  const p = clamp(progress, 0, 1);

  const hudExit = easedRange(p, 0.06, 0.16);
  const dive = easedRange(p, 0.08, 0.82);
  const cardFade = 1 - easedRange(p, 0.12, 0.3);
  const exitLight = easedRange(p, 0.76, 0.89);

  const diveHudIn = easedRange(p, 0.08, 0.18);
  const diveHudOut = 1 - easedRange(p, 0.76, 0.88);

  const f0 = bellCurve(p, 0.13, 0.33);
  const f1 = bellCurve(p, 0.3, 0.5);
  const f2 = bellCurve(p, 0.47, 0.67);
  const f3 = easedRange(p, 0.63, 0.75) * (1 - easedRange(p, 0.82, 0.89));

  const msInt = Math.round(lerp(0, 40, dive));

  return {
    '--p': css(p, 4),
    '--dive': css(dive, 4),
    '--ms-num': String(msInt),
    '--split-exp': css(easedRange(dive, 0.04, 0.94), 4),

    '--hud-o': css(1 - hudExit, 4),
    '--hud-y': `${css(hudExit * 1.25, 3)}rem`,
    '--dive-hud-o': css(diveHudIn * diveHudOut, 4),

    '--card-o': css(cardFade, 4),
    '--card-s': css(lerp(1, 1.32, easedRange(p, 0.06, 0.3)), 4),

    '--tunnel-s': css(lerp(1, 2.85, dive), 4),
    '--tunnel-r': `${css(lerp(0, 23.6, dive), 2)}deg`,
    '--tunnel-o': css(1 - exitLight * 0.85, 4),

    '--frame-0': css(f0, 4),
    '--frame-1': css(f1, 4),
    '--frame-2': css(f2, 4),
    '--frame-3': css(f3, 4),

    '--exit-light': css(exitLight, 4),
  };
}
