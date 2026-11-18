import type { StageVars } from '@/lib/scroll/engine';
import { bellCurve, clamp, css, easedRange, lerp } from '@/lib/scroll/math';

const ROW_COUNT = 4;

function isCompactViewport(): boolean {
  // Read-only viewport probe: the only environment input to this choreography.
  return typeof window !== 'undefined' && window.innerWidth < 640;
}

/**
 * Act 1 — Origin (runway 540svh, scrollable 440svh).
 *
 * Act 2 overlaps at p ≈ 0.886, so all beats conclude cleanly by 0.68, giving
 * a generous dwell plateau where all 4 receipt rows and the Tax Q3 settle stamp
 * stay 100% locked and legible before the charcoal curtain rises.
 *
 * 0.00 load      card drops (CSS keyframe, once) + BrandMark draws
 * 0.00–0.14      hero dwell: headline + HUD + manifesto
 * 0.14–0.26      hero exits cleanly
 * 0.22–0.38      Rule Matrix + hardware reader enter; card docks into NFC bay
 * 0.38–0.46      tap: NFC rings fire, reader LED wakes
 * 0.44–0.56      approval locks on reader; receipt feeds out
 * 0.50–0.62      four vault rows & rule bars resolve sequentially
 * 0.60–0.68      tax settle stamp locks at 100% opacity
 * 0.68–1.00      stationary dwell while Act 2 curtain rises at 0.886
 */
export function originChoreography(progress: number): StageVars {
  const p = clamp(progress, 0, 1);
  const compact = isCompactViewport();

  const hudExit = easedRange(p, 0.12, 0.24);
  const stageIn = easedRange(p, 0.22, 0.35);
  const approach = easedRange(p, 0.2, 0.38);
  const tap = bellCurve(p, 0.38, 0.46);
  const approve = easedRange(p, 0.44, 0.52);
  const paper = easedRange(p, 0.46, 0.58);
  const settle = easedRange(p, 0.6, 0.68);

  const vars: Record<`--${string}`, string> = {
    '--p': css(p, 4),
    '--approach': css(approach, 4),
    '--tap': css(tap, 4),

    '--hud-o': css(1 - hudExit, 4),
    '--hud-y': `${css(hudExit * 1.1, 3)}rem`,

    '--line1-y': `${css(lerp(0, -2, easedRange(p, 0.12, 0.28)), 3)}rem`,
    '--line2-y': `${css(lerp(0, 1, easedRange(p, 0.12, 0.28)), 3)}rem`,
    '--headline-o': css(1 - easedRange(p, 0.14, 0.26), 4),

    '--stage-o': css(stageIn, 4),
    '--stage-y': `${css(lerp(1.25, 0, stageIn), 3)}rem`,

    '--card-x': `${css(lerp(0, compact ? -22 : 12.5, approach), 2)}%`,
    '--card-y': `calc(${css(lerp(-4, 0, approach), 2)}svh + ${css(lerp(0, compact ? -1.2 : -8.4, approach), 2)}rem + ${css(tap * 0.35, 2)}rem)`,
    '--card-s': css(lerp(1, compact ? 0.36 : 0.39, approach), 4),
    '--card-rx': `${css(lerp(13, 2, approach), 2)}deg`,
    '--card-ry': `${css(lerp(-21, -4, approach), 2)}deg`,
    '--card-rz': `${css(lerp(-12, 0, approach), 2)}deg`,
    '--sheen-deg': `${css(lerp(210, 245, approach), 1)}deg`,

    '--nfc': css(tap, 4),
    '--led': css(Math.max(tap * 0.75, approve), 4),

    '--screen-idle': css(1 - approve, 4),
    '--screen-o': css(approve, 4),

    '--paper-y': `${css(lerp(-104, 0, paper), 2)}%`,
    '--paper-o': css(easedRange(p, 0.46, 0.52), 4),

    '--settle': css(settle, 4),
    '--settle-y': `${css(lerp(0.5, 0, settle), 3)}rem`,
    '--settle-r': `${css(lerp(-8, -2, settle), 2)}deg`,
  };

  for (let index = 0; index < ROW_COUNT; index += 1) {
    const start = 0.5 + index * 0.025;
    vars[`--row-${index}`] = css(easedRange(p, start, start + 0.07), 4);
  }

  return vars;
}
