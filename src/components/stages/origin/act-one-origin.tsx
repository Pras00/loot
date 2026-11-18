'use client';

import { useRef } from 'react';

import { LootCard } from '@/components/card/loot-card';
import { BrandMark } from '@/components/chrome/brand-mark';
import { actionClass, ActionLink } from '@/components/ui/action';
import { HERO, RECEIPT, RULESET } from '@/lib/content/copy';
import { scrollToChapter } from '@/lib/scroll/engine';
import { useStage } from '@/lib/scroll/use-stage';
import { formatIdrCompact, formatNumber } from '@/lib/treasury/format';
import { SCENARIO, VAULT_LEDGER, VAULT_RULES } from '@/lib/treasury/rules';
import { splitSpend } from '@/lib/treasury/split';

import { originChoreography } from './choreography';
import { LootTerminal } from './loot-terminal';
import { Receipt } from './receipt';

const BAR_TONES = [
  'bg-signal',
  'bg-ultraviolet-500',
  'bg-alabaster-50',
  'bg-alabaster-50/60',
] as const;

const HOW_IT_WORKS_STEPS = [
  { step: 'Step 1', text: 'Tap your card once to pay the bill' },
  { step: 'Step 2', text: 'The card divides the amount in 0.4 seconds' },
  { step: 'Step 3', text: 'All 4 money pockets update automatically' },
] as const;

/**
 * Act 1 — Origin. Welcoming hero stage followed by a crystal-clear real-world
 * payment example showing how one Rp 480.000 tap is divided into four pockets.
 */
export function ActOneOrigin() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useStage(sectionRef, originChoreography);

  const split = splitSpend(SCENARIO.amountIdr);
  const spokenSplit = split.lines.map((line) => `${line.label} ${formatNumber(line.amountIdr)}`);

  return (
    <section
      ref={sectionRef}
      id="origin"
      aria-labelledby="origin-title"
      className="surface-dark runway-origin relative z-10"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-canvas" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(56% 50% at 54% 38%, color-mix(in oklab, var(--color-ultraviolet-500) 30%, transparent), transparent 72%)',
          }}
        />

        <header
          className="pointer-events-none absolute inset-x-5 top-5 z-30 flex items-center justify-between gap-4 sm:inset-x-10 sm:top-6"
          style={{ opacity: 'var(--hud-o)' }}
        >
          <a
            href="#origin"
            className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-hairline bg-charcoal-950/90 py-1.5 pl-1.5 pr-4 transition-colors duration-200 ease-loot hover:border-signal"
          >
            <span className="grid size-6 place-items-center rounded-full bg-signal text-ink">
              <BrandMark className="h-3.5 w-2.5" />
            </span>
            <span className="font-display tracking-wordmark text-data font-bold uppercase text-ink-primary">
              LOOT
            </span>
          </a>

          <div className="pointer-events-auto">
            <ActionLink href="#claim" variant="ghost" className="px-4 py-1.5 text-micro sm:text-data">
              <span>{HERO.topCta}</span>
              <ArrowUpRight className="size-3.5 text-signal" />
            </ActionLink>
          </div>
        </header>

        <div
          className="pointer-events-none absolute inset-x-5 top-20 z-10 flex items-baseline justify-between gap-4 sm:inset-x-10 sm:top-22"
          style={{ opacity: 'var(--headline-o)' }}
        >
          <p className="text-micro font-medium text-signal">{HERO.eyebrow}</p>
          <p className="hidden items-center gap-3 text-micro text-ink-muted sm:flex">
            <span>{HERO.editionYear}</span>
            <span className="text-ultraviolet-500">/</span>
            <span>{HERO.editionTag}</span>
          </p>
        </div>

        <div
          className="pointer-events-none absolute inset-x-5 top-26 z-10 sm:inset-x-10 sm:top-28"
          style={{ opacity: 'var(--headline-o)' }}
        >
          <h1 id="origin-title" className="text-display-xl text-balance">
            <span className="block" style={{ transform: 'translate3d(0, var(--line1-y), 0)' }}>
              {HERO.displayLines[0]}
            </span>
            <span
              className="block text-right"
              style={{ transform: 'translate3d(0, var(--line2-y), 0)' }}
            >
              {HERO.displayLines[1]}
            </span>
          </h1>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between px-5 pb-6 pt-6 sm:px-10 sm:pb-8 sm:pt-8"
          style={{
            opacity: 'var(--stage-o)',
            transform: 'translate3d(0, var(--stage-y), 0)',
          }}
        >
          <div className="mx-auto hidden w-full max-w-5xl items-center justify-between border-b border-hairline pb-3 text-micro sm:flex">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-ultraviolet-900 px-3 py-0.5 font-medium text-alabaster-50 ring-1 ring-ultraviolet-500/50">
                Real payment example
              </span>
              <span className="text-ink-secondary">
                See what happens when you tap Rp 480.000 for a team dinner
              </span>
            </div>
            <span className="font-medium text-signal">No manual sorting needed</span>
          </div>

          <div className="mx-auto my-auto grid w-full max-w-5xl items-start gap-5 sm:grid-cols-12 sm:gap-8">
            <div className="rounded-panel border border-ultraviolet-500/30 bg-charcoal-950/90 p-5 shadow-paper sm:col-span-5 sm:p-6">
              <div className="flex items-center justify-between gap-2 border-b border-hairline pb-3">
                <div>
                  <span className="text-micro font-medium text-signal">Set once in your app</span>
                  <h2 className="mt-0.5 text-title text-ink-primary">{RULESET.label}</h2>
                </div>
                <span className="rounded-full border border-ultraviolet-500/40 bg-ultraviolet-900/60 px-3 py-1 text-micro font-medium text-alabaster-50">
                  100% total
                </span>
              </div>

              <p className="mt-2.5 text-body-sm text-ink-secondary">{RULESET.note}</p>

              <ul className="mt-3 divide-y divide-hairline border-t border-hairline">
                {VAULT_RULES.map((rule, index) => {
                  const line = split.lines[index];
                  const amountIdr = line?.amountIdr ?? 0;
                  const meta = VAULT_LEDGER[rule.id];
                  return (
                    <li key={rule.id} className="py-2.5">
                      <div className="flex items-baseline justify-between gap-2 text-micro sm:text-body-sm">
                        <div className="flex items-baseline gap-2">
                          <span className="font-semibold text-ink-primary">{rule.label}</span>
                          <span className="text-micro text-ink-muted">{meta.action}</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="tabular text-micro text-ink-secondary">
                            {rule.sharePct}%
                          </span>
                          <span
                            className="tabular font-semibold text-signal"
                            style={{ opacity: `var(--row-${index})` }}
                          >
                            {formatIdrCompact(amountIdr)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-charcoal-800">
                        <div
                          className={`h-full origin-left rounded-full ${BAR_TONES[index] ?? 'bg-alabaster-50'}`}
                          style={{
                            width: `${rule.sharePct}%`,
                            transform: `scaleX(var(--row-${index}))`,
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-3 flex items-center justify-between border-t border-hairline pt-2.5 text-micro">
                <span className="text-ink-muted">Applies to every payment</span>
                <span
                  className="font-semibold text-signal"
                  style={{ opacity: 'var(--settle)' }}
                >
                  All 4 pockets updated
                </span>
              </div>
            </div>

            <div className="sm:col-span-7">
              <LootTerminal />
              <Receipt split={split} />
            </div>
          </div>

          <dl className="mx-auto hidden w-full max-w-5xl grid-cols-3 gap-6 border-t border-hairline pt-3.5 sm:grid">
            {HOW_IT_WORKS_STEPS.map((item, index) => (
              <div
                key={item.step}
                className="flex items-baseline gap-3 border-r border-hairline pr-4 last:border-r-0 last:pr-0"
              >
                <dt
                  className={`rounded-full px-2.5 py-0.5 text-micro font-semibold ${
                    index === 0
                      ? 'bg-signal text-ink'
                      : 'bg-ultraviolet-900 text-alabaster-50 ring-1 ring-ultraviolet-500/40'
                  }`}
                >
                  {item.step}
                </dt>
                <dd className="text-micro text-ink-secondary">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="perspective-distant pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-5 sm:px-10">
          <div className="w-full max-w-5xl">
            <div
              className="relative mx-auto w-56 sm:w-88 lg:w-104"
              style={{
                transform:
                  'translate3d(var(--card-x, 0%), var(--card-y, -4svh), 0) scale(var(--card-s)) rotateX(var(--card-rx)) rotateY(var(--card-ry)) rotateZ(var(--card-rz))',
              }}
            >
              <div className="dispatch-rise">
                <LootCard edition="stealth" />
              </div>

              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 size-24 rounded-full border border-signal sm:size-28"
                style={{
                  opacity: 'var(--nfc)',
                  transform: 'translate3d(-50%, -50%, 0) scale(calc(0.4 + var(--nfc) * 1.1))',
                }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 size-24 rounded-full border border-ultraviolet-500 sm:size-28"
                style={{
                  opacity: 'calc(var(--nfc) * 0.6)',
                  transform: 'translate3d(-50%, -50%, 0) scale(calc(0.4 + var(--nfc) * 1.9))',
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-5 bottom-5 z-30 sm:inset-x-10 sm:bottom-8"
          style={{ opacity: 'var(--hud-o)', transform: 'translate3d(0, var(--hud-y), 0)' }}
        >
          <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-ultraviolet-500/40 bg-charcoal-950/90 px-3 py-1 text-micro font-medium text-ink-primary">
                <span aria-hidden className="size-1.5 rounded-full bg-signal" />
                {HERO.specBadge}
              </span>
              <div className="mt-3 text-title">
                <p className="text-ink-primary">{HERO.manifesto[0]}</p>
                <p className="text-signal">{HERO.manifesto[1]}</p>
                <p className="text-ink-primary">{HERO.manifesto[2]}</p>
              </div>
            </div>

            <div className="pointer-events-auto md:col-span-5 md:col-start-8 md:flex md:flex-col md:items-end md:text-right">
              <p className="hidden max-w-sm text-body-sm text-ink-secondary sm:block">
                {HERO.hudSupport}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 sm:mt-4 md:justify-end">
                <ActionLink href="#claim">
                  <span>{HERO.cta}</span>
                  <ArrowUpRight className="size-3.5" />
                </ActionLink>
                <button
                  type="button"
                  onClick={() => scrollToChapter('origin', 0.72)}
                  className={actionClass('ghost')}
                >
                  <span>{HERO.exploreCta}</span>
                  <ArrowDown className="size-3.5 text-signal" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="sr-only">
          {RECEIPT.merchant}. {RECEIPT.approved}. Total {formatNumber(split.totalIdr)} rupiah. Split
          on approval: {spokenSplit.join('. ')}.
        </p>
      </div>
    </section>
  );
}

function ArrowUpRight({ className }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDown({ className }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M8 3.5v9M4.5 9 8 12.5 11.5 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
