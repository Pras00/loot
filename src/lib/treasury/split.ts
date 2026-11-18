import { VAULT_RULES, type VaultId, type VaultRule } from './rules';

export interface SplitLine {
  readonly id: VaultId;
  readonly label: string;
  readonly amountIdr: number;
}

export interface SplitResult {
  readonly totalIdr: number;
  readonly lines: readonly SplitLine[];
}

/**
 * Largest-remainder split.
 *
 * Invariant: the lines always sum to `totalIdr`, for every input, including
 * totals that do not divide evenly by the rule percentages. Ties break by rule
 * order, never by sort instability.
 */
export function splitSpend(
  totalIdr: number,
  rules: readonly VaultRule[] = VAULT_RULES,
): SplitResult {
  const total = Math.max(0, Math.round(totalIdr));

  if (rules.length === 0) {
    return { totalIdr: total, lines: [] };
  }

  const weights = rules.map((rule) => Math.max(0, rule.sharePct));
  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);

  if (weightSum === 0) {
    return {
      totalIdr: total,
      lines: rules.map((rule, index) => ({
        id: rule.id,
        label: rule.label,
        amountIdr: index === 0 ? total : 0,
      })),
    };
  }

  const exact = weights.map((weight) => (total * weight) / weightSum);
  const amounts = exact.map((value) => Math.floor(value));
  let assigned = amounts.reduce((sum, value) => sum + value, 0);

  const byFraction = exact
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction || a.index - b.index);

  let cursor = 0;
  while (assigned < total && byFraction.length > 0) {
    const slot = byFraction[cursor % byFraction.length];
    if (slot !== undefined) {
      amounts[slot.index] = (amounts[slot.index] ?? 0) + 1;
      assigned += 1;
    }
    cursor += 1;
  }

  return {
    totalIdr: total,
    lines: rules.map((rule, index) => ({
      id: rule.id,
      label: rule.label,
      amountIdr: amounts[index] ?? 0,
    })),
  };
}
