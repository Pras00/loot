import type { StageVars } from '@/lib/scroll/engine';
import { clamp, css, easedRange, lerp } from '@/lib/scroll/math';

/**
 * Act 4 — Forge (runway 360svh, scrollable 260svh, -150svh overlap).
 *
 * Sweeps laterally over Act 3 before Act 3 unsticks (0.14 < 0.192), turns
 * the interactive card onto the pedestal by 0.26, then holds static through
 * 1.00 so the user has unhurried scroll cushion while interacting.
 */
export function forgeChoreography(progress: number): StageVars {
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
