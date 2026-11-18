import { RECEIPT } from '@/lib/content/copy';
import { formatIdr } from '@/lib/treasury/format';
import { SCENARIO } from '@/lib/treasury/rules';

/**
 * Clean, welcoming contactless payment reader. Left 5 columns form a dedicated
 * contactless landing pad for the card; right 7 columns show the payment status.
 */
export function LootTerminal() {
  return (
    <div className="w-full">
      <div className="rounded-panel border border-ultraviolet-500/30 bg-charcoal-800 p-3.5 shadow-paper">
        <div className="mb-2.5 flex items-center justify-between px-1 text-micro">
          <span className="font-medium text-ink-secondary">Contactless payment reader</span>
          <span className="text-ink-muted">Works without internet</span>
        </div>

        <div className="grid grid-cols-12 items-stretch gap-3">
          <div
            aria-label="Contactless tap pad"
            className="relative col-span-5 flex min-h-24 items-center justify-center rounded-card border border-ultraviolet-500/30 bg-charcoal-950/90 p-3 sm:min-h-28"
          >
            <span
              aria-hidden
              className="size-11 rounded-full border border-ultraviolet-500/35"
              style={{ opacity: 'var(--screen-idle)' }}
            />
          </div>

          <div className="relative col-span-7 flex flex-col justify-between overflow-hidden rounded-card border border-hairline bg-charcoal-950 px-4 py-3">
            <div
              className="flex h-full flex-col items-end justify-between text-right"
              style={{ opacity: 'var(--screen-idle)' }}
            >
              <span className="text-micro text-ink-muted">Ready to pay</span>
              <span className="tabular text-body font-semibold text-ink-secondary">
                {formatIdr(SCENARIO.amountIdr)}
              </span>
              <span className="text-micro text-ink-muted">Hold card near reader</span>
            </div>

            <div
              className="absolute inset-0 flex flex-col justify-between bg-charcoal-950 px-4 py-3 text-right"
              style={{ opacity: 'var(--screen-o)' }}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span className="text-micro text-ink-secondary">Approved in 0.4 s</span>
                <span className="rounded-full bg-signal px-2.5 py-0.5 text-micro font-semibold text-ink">
                  {RECEIPT.approved}
                </span>
              </div>

              <div className="my-auto pt-1">
                <p className="text-micro text-ink-muted">{SCENARIO.merchant}</p>
                <p className="tabular text-title font-bold text-ink-primary">
                  {formatIdr(SCENARIO.amountIdr)}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-hairline pt-1.5">
                <span className="text-micro text-ink-muted">Splitting into 4 pockets</span>
                <span
                  aria-hidden
                  className="h-1 w-12 rounded-full bg-signal"
                  style={{ opacity: 'var(--led)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
