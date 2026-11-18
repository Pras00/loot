import type { StageVars } from '@/lib/scroll/engine';
import { clamp, css, easedRange, lerp } from '@/lib/scroll/math';

/**
 * Act 2 — Anatomy (runway 500svh, scrollable 400svh, -150svh overlap).
 *
 * Curtain completes before Act 1 unsticks (0.11 < 0.125). As the three plates
 * extrude upward along Z, --scene-y shifts the base downward (+2.75rem) so the
 * exploded stack stays centered inside its dedicated CAD chamber and never
 * occludes the top header copy.
 */
export function anatomyChoreography(progress: number): StageVars {
  const p = clamp(progress, 0, 1);

  const stageO = p <= 0.002 ? 0 : 1;
  const curtain = easedRange(p, 0.005, 0.11);
  const titleIn = easedRange(p, 0.09, 0.22);
  const tilt = easedRange(p, 0.16, 0.36);
  const extrude = easedRange(p, 0.32, 0.54);
  const annotate = easedRange(p, 0.48, 0.62);

  const vars: Record<`--${string}`, string> = {
    '--p': css(p, 4),
    '--stage-o': css(stageO, 2),
    '--curtain': css(curtain, 4),
    '--violet': css(easedRange(p, 0.14, 0.64), 4),

    '--type-o': css(titleIn, 4),
    '--type-y': `${css(lerp(0.85, 0, titleIn), 3)}rem`,

    '--ax': `${css(lerp(0, 52, tilt), 2)}deg`,
    '--az': `${css(lerp(0, -22, tilt), 2)}deg`,
    '--scene-s': css(lerp(1, 0.88, tilt), 4),
    '--scene-y': `${css(lerp(0, 2.75, extrude), 2)}rem`,

    '--z-core': `${css(lerp(0, 74, extrude), 2)}px`,
    '--z-shell': `${css(lerp(0, 148, extrude), 2)}px`,
    '--plate-shadow': css(extrude, 3),
    '--sheen-deg': `${css(lerp(210, 250, tilt), 1)}deg`,

    '--labels-o': css(annotate, 4),
  };

  for (let index = 0; index < 3; index += 1) {
    const start = 0.48 + index * 0.06;
    vars[`--line-${index}`] = css(easedRange(p, start, start + 0.1), 4);
  }

  return vars;
}
