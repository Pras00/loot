import { BrandMark } from '@/components/brand/brand-mark';
import { LootCard } from '@/components/brand/loot-card';
import { ActionLink } from '@/components/ui/action';
import { ANATOMY, FLOW, FORGE, HERO, RECEIPT, RULESET } from '@/lib/content/copy';
import { formatIdr, formatIdrCompact } from '@/lib/treasury/format';
import { SCENARIO, SLIDER, VAULT_LEDGER, VAULT_RULES } from '@/lib/treasury/rules';
import { splitSpend } from '@/lib/treasury/split';

/**
 * The complete editorial stack. Rendered when `prefers-reduced-motion: reduce`
 * is set: no sticky stages, no scroll linkage, every figure present.
 */
export function ReducedMotionStory() {
  const split = splitSpend(SCENARIO.amountIdr);
  const preview = splitSpend(SLIDER.defaultIdr);
  const stamp = `${RECEIPT.stampTitle}. ${RECEIPT.stampLine}. ${RECEIPT.stampDate}.`;

  return (
    <div>
      <section className="surface-dark relative overflow-hidden px-5 py-16 sm:px-10">
        <div className="flex items-center gap-3">
          <BrandMark className="size-6 text-alabaster-50" />
          <span className="tracking-wordmark text-body-sm font-bold uppercase">LOOT</span>
        </div>

        <h1 className="mt-10 text-display-lg">
          {HERO.displayLines[0]} {HERO.displayLines[1]}
        </h1>
        <p className="mt-6 max-w-lg text-body text-ink-secondary">{HERO.hud}</p>
        <p className="mt-2 max-w-lg text-body-sm text-ink-secondary">{HERO.hudSupport}</p>
        <div className="mt-6">
          <ActionLink href="#claim">{HERO.cta}</ActionLink>
        </div>

        <div className="mt-12 w-full max-w-sm">
          <LootCard edition="stealth" />
        </div>

        <div className="mt-10 max-w-sm rounded-none bg-alabaster-50 p-4 text-ink">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-micro font-semibold">{RECEIPT.merchant}</span>
            <span className="text-micro text-ink/60">{RECEIPT.approved}</span>
          </div>
          <p className="mt-3 text-micro text-ink/55">{RECEIPT.splitLabel}</p>
          <ul className="mt-2 space-y-1.5">
            {split.lines.map((line) => (
              <li key={line.id} className="flex justify-between text-micro">
                <span>{line.label}</span>
                <span className="tabular font-medium">{formatIdr(line.amountIdr)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t border-ink/10 pt-2 text-micro">
            <span>{RECEIPT.totalLabel}</span>
            <span className="tabular font-semibold">{formatIdr(split.totalIdr)}</span>
          </div>
          <p className="mt-3 text-micro">{stamp}</p>
        </div>
      </section>

      <section className="surface-violet px-5 py-16 sm:px-10">
        <h2 className="text-display-md text-balance">{ANATOMY.title}</h2>
        <p className="mt-3 max-w-xl text-body-sm text-ink-secondary">{ANATOMY.lead}</p>
        <ol className="mt-8 max-w-2xl border-t border-hairline">
          {ANATOMY.layers.map((layer) => (
            <li key={layer.id} className="border-b border-hairline py-4">
              <p className="text-body font-semibold">{layer.name}</p>
              <p className="mt-1 text-body-sm text-ink-secondary">{layer.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="surface-light px-5 py-16 sm:px-10">
        <h2 className="text-display-md text-balance">{FLOW.title}</h2>
        <p className="mt-3 max-w-xl text-body-sm text-ink-secondary">{FLOW.lead}</p>
        <p className="mt-8 text-micro text-ink-muted">{FLOW.balances}</p>
        <dl className="mt-2 max-w-2xl border-t border-hairline">
          {VAULT_RULES.map((rule) => {
            const line = split.lines.find((candidate) => candidate.id === rule.id);
            const meta = VAULT_LEDGER[rule.id];
            const deltaIdr = line?.amountIdr ?? 0;
            const settledIdr = meta.startingBalanceIdr + deltaIdr;
            return (
              <div
                key={rule.id}
                className="flex items-baseline justify-between gap-4 border-b border-hairline py-3"
              >
                <dt className="text-body-sm">
                  <span>{rule.label}</span>
                  <span className="ml-2 text-micro text-ink-muted">{rule.sharePct}%</span>
                  <span className="ml-3 text-micro text-ink-muted">{meta.action}</span>
                </dt>
                <dd className="tabular text-right text-body-sm font-semibold">
                  <span>{formatIdr(settledIdr)}</span>
                  <span className="ml-2 text-micro font-normal text-ink-muted">
                    +{formatIdrCompact(deltaIdr)}
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>
        <p className="mt-4 max-w-md text-micro text-ink-muted">{FLOW.note}</p>
      </section>

      <section className="surface-dark px-5 py-16 sm:px-10">
        <h2 className="text-display-md text-balance">{FORGE.title}</h2>
        <p className="mt-3 max-w-xl text-body-sm text-ink-secondary">{FORGE.lead}</p>

        <h3 className="mt-8 text-micro text-ink-muted">{RULESET.label}</h3>
        <dl className="mt-2 max-w-md border-t border-hairline">
          {VAULT_RULES.map((rule) => (
            <div
              key={rule.id}
              className="flex items-baseline justify-between border-b border-hairline py-2 text-body-sm"
            >
              <dt className="text-ink-secondary">{rule.label}</dt>
              <dd className="tabular font-medium">{rule.sharePct}%</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 max-w-md text-micro text-ink-muted">{RULESET.note}</p>

        <h3 className="mt-8 text-micro text-ink-muted">
          {FORGE.amountLabel} {formatIdr(SLIDER.defaultIdr)}
        </h3>
        <dl className="mt-2 max-w-md border-t border-hairline">
          {preview.lines.map((line) => (
            <div
              key={line.id}
              className="flex items-baseline justify-between border-b border-hairline py-2 text-body-sm"
            >
              <dt className="text-ink-secondary">{line.label}</dt>
              <dd className="tabular font-medium">{formatIdr(line.amountIdr)}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-micro text-ink-muted">
          Three editions: {FORGE.editions.map((edition) => edition.name).join(', ')}.
        </p>
      </section>
    </div>
  );
}
