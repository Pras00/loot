import { RECEIPT } from '@/lib/content/copy';
import { formatIdr, formatIdrCompact } from '@/lib/treasury/format';
import { VAULT_LEDGER, VAULT_RULES } from '@/lib/treasury/rules';
import type { SplitResult } from '@/lib/treasury/split';

const ROW_VARS = ['var(--row-0)', 'var(--row-1)', 'var(--row-2)', 'var(--row-3)'] as const;

interface ReceiptProps {
  readonly split: SplitResult;
}

/** Clear, human-readable payment receipt showing how one bill is divided automatically. */
export function Receipt({ split }: ReceiptProps) {
  return (
    <div className="w-full overflow-hidden">
      <div
        className="origin-top"
        style={{
          transform: 'translate3d(0, var(--paper-y), 0)',
          opacity: 'var(--paper-o)',
        }}
      >
        <div className="rounded-card border border-ink/15 bg-alabaster-50 px-4 pb-4 pt-3.5 text-ink shadow-paper sm:px-5">
          <div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-2.5">
            <div>
              <span className="text-body-sm font-bold text-ink">{RECEIPT.merchant}</span>
              <span className="ml-2 text-micro text-ink/60">Restaurant bill</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-0.5 text-micro font-semibold text-signal">
              <span aria-hidden className="size-1.5 rounded-full bg-signal" />
              {RECEIPT.approved}
            </span>
          </div>

          <div className="mt-2.5 flex items-baseline justify-between text-micro text-ink/65">
            <span>{RECEIPT.splitLabel}</span>
            <span className="font-medium">4 pockets</span>
          </div>

          <ul className="mt-2 divide-y divide-ink/10 border-y border-ink/10">
            {split.lines.map((line, index) => {
              const rule = VAULT_RULES[index];
              const pct = rule?.sharePct ?? 0;
              const action = VAULT_LEDGER[line.id].action;
              return (
                <li
                  key={line.id}
                  className="flex items-baseline justify-between gap-3 py-2 text-micro sm:text-data"
                  style={{ opacity: ROW_VARS[index] ?? '1' }}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-ink">{line.label}</span>
                    <span className="tabular text-micro text-ink/60">({pct}%)</span>
                    <span className="hidden text-micro text-ink/60 sm:inline">{action}</span>
                  </div>
                  <span className="tabular font-bold text-ink">
                    {formatIdrCompact(line.amountIdr)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-2.5 flex items-baseline justify-between gap-2 text-data">
            <span className="font-medium text-ink/75">{RECEIPT.totalLabel}</span>
            <span className="tabular text-body-sm font-bold text-ink">
              {formatIdr(split.totalIdr)}
            </span>
          </div>

          <div
            className="mt-3 flex items-center justify-between gap-2 rounded-full bg-signal px-3.5 py-1.5 text-micro text-ink"
            style={{
              opacity: 'var(--settle)',
              transform: 'translate3d(0, var(--settle-y), 0) rotate(var(--settle-r))',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="font-bold">{RECEIPT.stampTitle}:</span>
              <span className="font-medium">{RECEIPT.stampLine}</span>
            </div>
            <span className="font-semibold">{RECEIPT.stampDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
