import type { StageVars } from '@/lib/scroll/engine';
import { clamp, css, easedRange } from '@/lib/scroll/math';

/**
 * Act 3 — Flow (runway 520svh, scrollable 420svh, -150svh overlap).
 *
 * Iris finishes opening before Act 2 unsticks (0.105 < 0.119). All Bezier
 * branches, vault ledger rows, and settled rupiah balances complete at 0.74,
 * holding stationary through Act 4's lateral wipe at 0.881.
 *
 * 0.005–0.105  alabaster iris opens from Act 2's card into daylight
 * 0.10–0.22    headline and source payment lock
 * 0.22–0.58    four cubic Bezier branches draw sequentially left-to-right
 * 0.30–0.64    vault ledger rows settle sequentially
 * 0.56–0.71    exact rupiah balances resolve
 * 0.68–0.74    reconciliation footer locks
 * 0.74–1.00    stationary dwell plateau for Act 4 wipe handoff (0.881)
 */
export function flowChoreography(progress: number): StageVars {
  const p = clamp(progress, 0, 1);

  const stageO = p <= 0.002 ? 0 : 1;
  const iris = easedRange(p, 0.005, 0.105);

  const vars: Record<`--${string}`, string> = {
    '--p': css(p, 4),
    '--stage-o': css(stageO, 2),
    '--iris': css(iris, 4),
    '--type-o': css(easedRange(p, 0.1, 0.2), 4),
    '--source': css(easedRange(p, 0.12, 0.22), 4),
    '--hold': css(easedRange(p, 0.66, 0.74), 4),
  };

  for (let index = 0; index < 4; index += 1) {
    const curveStart = 0.22 + index * 0.08;
    const rowStart = 0.3 + index * 0.08;
    const figStart = 0.54 + index * 0.035;

    vars[`--branch-${index}`] = css(easedRange(p, curveStart, curveStart + 0.12), 4);
    vars[`--row-${index}`] = css(easedRange(p, rowStart, rowStart + 0.1), 4);
    vars[`--figure-${index}`] = css(easedRange(p, figStart, figStart + 0.08), 4);
  }

  return vars;
}
