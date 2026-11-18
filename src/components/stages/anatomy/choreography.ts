import type { StageVars } from '@/lib/scroll/engine';
import { clamp, css, easedRange, lerp } from '@/lib/scroll/math';

/**
 * Section 2 — "Paid once. Sorted four ways." (runway 500svh, scrollable 400svh).
 *
 * Blends out of Section 1's bright tunnel exit onto the warm alabaster surface,
 * reveals the four gigantic pocket rows (`--row-0..3`), and holds steady from
 * 0.68 to 1.00 so visitors can point at any row to inspect its floating preview.
 */
export function anatomyChoreography(progress: number): StageVars {
  const p = clamp(progress, 0, 1);

  const stageO = p <= 0.002 ? 0 : 1;
  const curtain = easedRange(p, 0.005, 0.11);
  const titleIn = easedRange(p, 0.06, 0.2);
  const previewIn = easedRange(p, 0.24, 0.42);

  const vars: Record<`--${string}`, string> = {
    '--p': css(p, 4),
    '--stage-o': css(stageO, 2),
    '--curtain': css(curtain, 4),

    '--type-o': css(titleIn, 4),
    '--type-y': `${css(lerp(1, 0, titleIn), 3)}rem`,
    '--preview-o': css(previewIn, 4),
    '--preview-y': `${css(lerp(1.25, 0, previewIn), 3)}rem`,
  };

  for (let index = 0; index < 4; index += 1) {
    const start = 0.14 + index * 0.08;
    vars[`--row-${index}`] = css(easedRange(p, start, start + 0.14), 4);
  }

  return vars;
}
