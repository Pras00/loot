export type VaultId = 'tax' | 'ops' | 'yield' | 'payroll';

export interface VaultRule {
  readonly id: VaultId;
  readonly label: string;
  readonly sharePct: number;
}

export interface RulePreset {
  readonly id: string;
  readonly name: string;
  readonly rules: readonly VaultRule[];
}

export interface VaultLedgerMeta {
  readonly id: VaultId;
  readonly startingBalanceIdr: number;
  readonly action: string;
}

/** Default rule set. Shares must total 100. */
export const VAULT_RULES = [
  { id: 'tax', label: 'Tax', sharePct: 20 },
  { id: 'ops', label: 'Ops', sharePct: 45 },
  { id: 'yield', label: 'Yield', sharePct: 25 },
  { id: 'payroll', label: 'Payroll', sharePct: 10 },
] as const satisfies readonly VaultRule[];

/** Starting balances and clear, human-friendly pocket descriptions. */
export const VAULT_LEDGER: Readonly<Record<VaultId, VaultLedgerMeta>> = {
  tax: {
    id: 'tax',
    startingBalanceIdr: 14_400_000,
    action: 'Set aside for quarterly tax',
  },
  ops: {
    id: 'ops',
    startingBalanceIdr: 28_500_000,
    action: 'Ready for daily expenses',
  },
  yield: {
    id: 'yield',
    startingBalanceIdr: 42_000_000,
    action: 'Growing in daily savings',
  },
  payroll: {
    id: 'payroll',
    startingBalanceIdr: 18_200_000,
    action: 'Reserved for team salaries',
  },
};

/** Programmable rule presets selectable in Act 4 (Forge). Each sums to 100. */
export const RULE_PRESETS = [
  {
    id: 'operating',
    name: 'Daily business',
    rules: VAULT_RULES,
  },
  {
    id: 'yield-first',
    name: 'Savings focus',
    rules: [
      { id: 'tax', label: 'Tax', sharePct: 15 },
      { id: 'ops', label: 'Ops', sharePct: 30 },
      { id: 'yield', label: 'Yield', sharePct: 45 },
      { id: 'payroll', label: 'Payroll', sharePct: 10 },
    ],
  },
  {
    id: 'tax-shield',
    name: 'Tax priority',
    rules: [
      { id: 'tax', label: 'Tax', sharePct: 35 },
      { id: 'ops', label: 'Ops', sharePct: 35 },
      { id: 'yield', label: 'Yield', sharePct: 20 },
      { id: 'payroll', label: 'Payroll', sharePct: 10 },
    ],
  },
] as const satisfies readonly RulePreset[];

/** The charge demonstrated in Act 1 and reused across the page. */
export const SCENARIO = {
  merchant: 'Team dinner',
  amountIdr: 480_000,
  perTransactionLimitIdr: 600_000,
  raisedLimitIdr: 1_000_000,
} as const;

export const SLIDER = {
  minIdr: 24_000,
  maxIdr: 1_200_000,
  stepIdr: 6_000,
  defaultIdr: 480_000,
} as const;
