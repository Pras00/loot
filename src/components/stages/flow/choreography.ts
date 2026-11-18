import type { StageVars } from '@/lib/scroll/engine';
import { clamp, css, easedRange } from '@/lib/scroll/math';

/**
 * Section 3 — "The card, constructed." (runway 520svh, scrollable 420svh).
 *
 * Inspired by dennypratama.com's `section.con` ("The mark, constructed"):
 * geometric construction axes, the 23.6° slash line, and fine curved threads
 * draw progressively on scroll (`--grid-d`, `--threads-d`, `--outline-d`) before
 * solidifying into the finished metal card (`--solid-o`).
 */
export function flowChoreography(progress: number): StageVars {
  const p = clamp(progress, 0, 1);

  const stageO = p <= 0.002 ? 0 : 1;
  const reveal = easedRange(p, 0.005, 0.11);

  const gridDraw = easedRange(p, 0.08, 0.32);
  const threadsDraw = easedRange(p, 0.2, 0.52);
  const outlineDraw = easedRange(p, 0.34, 0.62);
  const solidIn = easedRange(p, 0.56, 0.76);

  const step0 = easedRange(p, 0.08, 0.34);
  const step1 = easedRange(p, 0.34, 0.58);
  const step2 = easedRange(p, 0.58, 0.78);

  return {
    '--p': css(p, 4),
    '--stage-o': css(stageO, 2),
    '--reveal': css(reveal, 4),
    '--type-o': css(easedRange(p, 0.06, 0.18), 4),

    '--grid-d': css(gridDraw, 4),
    '--threads-d': css(threadsDraw, 4),
    '--outline-d': css(outlineDraw, 4),
    '--solid-o': css(solidIn, 4),

    '--step-0': css(step0, 4),
    '--step-1': css(step1, 4),
    '--step-2': css(step2, 4),
  };
}
