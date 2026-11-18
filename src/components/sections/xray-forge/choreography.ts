import type { StageVars } from '@/lib/scroll/engine';
import { clamp, css, easedRange, lerp } from '@/lib/scroll/math';

/**
 * Section 4 — X-Ray Forge (runway 360svh, scrollable 260svh, -150svh overlap).
 */
export function xrayForgeChoreography(progress: number): StageVars {
  const p = clamp(progress, 0, 1);
  const stageO = p <= 0.002 ? 0 : 1;
  const wipe = easedRange(p, 0.005, 0.14);
  const turn = easedRange(p, 0.1, 0.26);

  return {
    '--p': css(p, 4),
    '--stage-o': css(stageO, 2),
    '--wipe': css(wipe, 4),
    '--turn': css(turn, 4),
    '--turn-y': `${css(lerp(-1.5, 0, turn), 2)}rem`,
    '--turn-o': css(lerp(0.4, 1, turn), 4),
  };
}
