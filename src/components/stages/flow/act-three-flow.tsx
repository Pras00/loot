'use client';

import { useRef, useState } from 'react';

import { FLOW, RECEIPT } from '@/lib/content/copy';
import { useStage } from '@/lib/scroll/use-stage';
import { formatIdr, formatIdrCompact } from '@/lib/treasury/format';
import {
  RULE_PRESETS,
  SCENARIO,
  VAULT_LEDGER,
  VAULT_RULES,
  type VaultId,
} from '@/lib/treasury/rules';
import { splitSpend } from '@/lib/treasury/split';

import { flowChoreography } from './choreography';

const ROW_CENTERS_Y = [50, 150, 250, 350] as const;

const SEGMENT_TONES = [
  'bg-signal',
  'bg-ultraviolet-500',
  'bg-alabaster-50',
  'bg-alabaster-50/45',
] as const;

const strokeWidthFor = (sharePct: number): number =>
  Number((1.6 + (sharePct / 45) * 1.8).toFixed(2));

export function ActThreeFlow() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useStage(sectionRef, flowChoreography);
  const [selectedVault, setSelectedVault] = useState<VaultId>('ops');

  const split = splitSpend(SCENARIO.amountIdr);

  const rows = VAULT_RULES.map((rule, index) => {
    const line = split.lines.find((candidate) => candidate.id === rule.id);
    const meta = VAULT_LEDGER[rule.id];
    const deltaIdr = line?.amountIdr ?? 0;
    const settledIdr = meta.startingBalanceIdr + deltaIdr;
    return {
      ...rule,
      deltaIdr,
      startingBalanceIdr: meta.startingBalanceIdr,
      settledIdr,
      action: meta.action,
      targetY: ROW_CENTERS_Y[index] ?? 200,
    };
  });

  const firstRule = VAULT_RULES[0];
  const firstMeta = VAULT_LEDGER[firstRule.id];
  const activeRow = rows.find((row) => row.id === selectedVault) ??
    rows[0] ?? {
      ...firstRule,
      deltaIdr: 0,
      startingBalanceIdr: firstMeta.startingBalanceIdr,
      settledIdr: firstMeta.startingBalanceIdr,
      action: firstMeta.action,
      targetY: ROW_CENTERS_Y[0],
    };

  return (
    <section
      ref={sectionRef}
      id="flow"
      aria-labelledby="flow-title"
      className="runway-flow overlap-stage room-light pointer-events-none relative z-30"
    >
      <div className="sticky top-0 h-svh overflow-hidden" style={{ opacity: 'var(--stage-o, 0)' }}>
        <div
          className="anatomy-iris pointer-events-auto relative h-full w-full bg-canvas"
          style={{
            clipPath: 'circle(calc(var(--iris, 0) * 145%) at var(--iris-x) var(--iris-y))',
          }}
        >
          <div aria-hidden className="blueprint pointer-events-none absolute inset-0 opacity-60" />

          <div className="relative z-10 flex h-full flex-col justify-between px-5 pb-5 pt-14 md:hidden">
            <header style={{ opacity: 'var(--type-o)' }}>
              <span className="inline-block rounded-full bg-charcoal-900 px-3 py-0.5 text-micro font-semibold text-signal">
                Automatic pocket updates
              </span>
              <h2 className="mt-2 text-title text-balance">{FLOW.title}</h2>
              <p className="mt-1 text-micro text-ink-secondary">{FLOW.lead}</p>
            </header>

            <div
              className="flex items-center justify-between rounded-card border border-charcoal-700 bg-charcoal-900 px-4 py-3 text-alabaster-50"
              style={{ opacity: 'var(--source)' }}
            >
              <div>
                <p className="text-micro text-alabaster-50/70">{SCENARIO.merchant}</p>
                <span className="mt-1 inline-block rounded-full bg-signal px-2.5 py-0.5 text-micro font-semibold text-ink">
                  {RECEIPT.approved} in 0.4 s
                </span>
              </div>
              <p className="tabular text-title font-bold text-alabaster-50">
                {formatIdr(split.totalIdr)}
              </p>
            </div>

            <ol className="divide-y divide-hairline overflow-hidden rounded-card border border-ink/15 bg-alabaster-100">
              {rows.map((row, index) => {
                const isSelected = row.id === selectedVault;
                return (
                  <li
                    key={row.id}
                    style={{
                      opacity: `var(--row-${index})`,
                      transform: `translate3d(0, calc((1 - var(--row-${index})) * 0.5rem), 0)`,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedVault(row.id)}
                      aria-pressed={isSelected}
                      className={`w-full border-l-4 px-3.5 py-2.5 text-left transition-colors duration-200 ${
                        isSelected
                          ? 'border-l-ultraviolet-500 bg-alabaster-50'
                          : 'border-l-transparent bg-alabaster-100'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-body-sm font-semibold text-ink-primary">
                          {row.label}
                          <span className="ml-2 text-micro font-normal text-ink-muted">
                            ({row.sharePct}%)
                          </span>
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="rounded-full bg-signal px-2 py-0.5 text-micro font-semibold text-ink">
                            +{formatIdrCompact(row.deltaIdr)}
                          </span>
                          <span
                            className="tabular text-body-sm font-bold text-ink-primary"
                            style={{ opacity: `var(--figure-${index})` }}
                          >
                            {formatIdr(row.settledIdr)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-1.5 h-1 w-full rounded-full bg-hairline">
                        <span
                          className={`block h-full origin-left rounded-full ${
                            isSelected ? 'bg-ultraviolet-500' : 'bg-ink'
                          }`}
                          style={{
                            width: `${row.sharePct}%`,
                            transform: `scaleX(var(--branch-${index}))`,
                          }}
                        />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>

            <p className="rounded-card bg-charcoal-900 px-3.5 py-2.5 tabular text-micro text-alabaster-50">
              <span className="font-semibold text-signal">{activeRow.label} pocket:</span>{' '}
              {formatIdr(activeRow.startingBalanceIdr)} + {formatIdrCompact(activeRow.deltaIdr)} ={' '}
              <span className="font-semibold">{formatIdr(activeRow.settledIdr)}</span>
            </p>
          </div>

          <div className="relative z-10 mx-auto hidden h-full max-w-6xl flex-col justify-between px-10 pb-7 pt-8 md:flex">
            <header
              className="grid grid-cols-12 items-end gap-8 border-b border-ink/15 pb-4"
              style={{ opacity: 'var(--type-o)' }}
            >
              <div className="col-span-7">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-charcoal-900 px-3 py-1 text-micro font-semibold text-signal">
                    How your money flows
                  </span>
                  <span className="text-micro font-medium text-ink-secondary">
                    One tap updates every pocket at the same time
                  </span>
                </div>
                <h2 id="flow-title" className="mt-2.5 text-display-md text-balance">
                  {FLOW.title}
                </h2>
                <p className="mt-1.5 text-body-sm text-ink-secondary">{FLOW.lead}</p>
              </div>

              <dl className="col-span-5 grid grid-cols-3 divide-x divide-ink/10 overflow-hidden rounded-card border border-ink/15 bg-alabaster-100">
                <div className="p-3.5">
                  <dt className="text-micro text-ink-muted">One payment</dt>
                  <dd className="tabular mt-1 text-body-sm font-bold text-ink-primary">
                    {formatIdr(split.totalIdr)}
                  </dd>
                </div>
                <div className="p-3.5">
                  <dt className="text-micro text-ink-muted">Sorting speed</dt>
                  <dd className="mt-1 text-body-sm font-bold text-ultraviolet-600">
                    Instant (0.4 s)
                  </dd>
                </div>
                <div className="p-3.5">
                  <dt className="text-micro text-ink-muted">Left unsorted</dt>
                  <dd className="tabular mt-1 text-body-sm font-bold text-ink-primary">
                    Rp 0
                  </dd>
                </div>
              </dl>
            </header>

            <div className="my-auto grid grid-cols-12 items-stretch py-2">
              <div
                className="col-span-4 flex items-center"
                style={{
                  opacity: 'var(--source)',
                  transform: 'translate3d(calc((1 - var(--source)) * -1rem), 0, 0)',
                }}
              >
                <div className="w-full overflow-hidden rounded-panel border border-charcoal-700 bg-charcoal-900 p-5 text-alabaster-50 shadow-paper lg:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-micro font-medium text-alabaster-50/75">
                      One payment at the counter
                    </span>
                    <span className="rounded-full bg-signal px-2.5 py-0.5 text-micro font-semibold text-ink">
                      {RECEIPT.approved} in 0.4 s
                    </span>
                  </div>

                  <p className="mt-3 text-body-sm text-alabaster-50/80">{SCENARIO.merchant}</p>
                  <p className="tabular mt-1 whitespace-nowrap text-figure font-bold text-alabaster-50">
                    {formatIdr(split.totalIdr)}
                  </p>

                  <dl className="mt-5 space-y-2 border-t border-alabaster-50/15 pt-3.5 text-micro">
                    <div className="flex items-baseline justify-between gap-2">
                      <dt className="text-alabaster-50/65">Paid with</dt>
                      <dd className="font-medium text-alabaster-50">LOOT Stealth card</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <dt className="text-alabaster-50/65">Splitting style</dt>
                      <dd className="font-semibold text-signal">{RULE_PRESETS[0].name}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <dt className="text-alabaster-50/65">Where it goes</dt>
                      <dd className="font-medium text-alabaster-50">4 money pockets</dd>
                    </div>
                  </dl>

                  <div className="mt-4">
                    <div className="flex items-baseline justify-between text-micro text-alabaster-50/65">
                      <span>How the bill is shared</span>
                      <span className="tabular font-medium text-signal">20% / 45% / 25% / 10%</span>
                    </div>
                    <div className="mt-1.5 flex h-1.5 w-full gap-0.5 overflow-hidden rounded-full bg-charcoal-800">
                      {VAULT_RULES.map((rule, index) => (
                        <span
                          key={rule.id}
                          className={`block h-full ${SEGMENT_TONES[index] ?? 'bg-alabaster-50'}`}
                          style={{ width: `${rule.sharePct}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-1 relative">
                <svg
                  viewBox="0 0 200 400"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 size-full text-ink"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="4"
                    cy="200"
                    r="5"
                    fill="var(--color-signal-400)"
                    stroke="var(--color-ink)"
                    strokeWidth="1.5"
                    style={{ opacity: 'var(--source)' }}
                  />
                  {rows.map((row, index) => {
                    const path = `M 0 200 C 105 200, 95 ${row.targetY}, 200 ${row.targetY}`;
                    const width = strokeWidthFor(row.sharePct);
                    const isSelected = row.id === selectedVault;
                    return (
                      <g key={row.id}>
                        <path
                          d={path}
                          stroke="currentColor"
                          strokeOpacity={0.14}
                          strokeWidth={width}
                          vectorEffect="non-scaling-stroke"
                        />
                        <path
                          d={path}
                          stroke={
                            isSelected ? 'var(--color-ultraviolet-500)' : 'var(--color-ink)'
                          }
                          strokeOpacity={isSelected ? 1 : 0.45}
                          strokeWidth={isSelected ? width + 0.8 : width}
                          vectorEffect="non-scaling-stroke"
                          pathLength={1}
                          strokeDasharray={1}
                          style={{
                            strokeDashoffset: `calc(1 - var(--branch-${index}))`,
                            transition: 'stroke-opacity 200ms var(--ease-loot)',
                          }}
                        />
                        <circle
                          cx="196"
                          cy={row.targetY}
                          r={isSelected ? 4.5 : 3}
                          fill={
                            isSelected
                              ? 'var(--color-signal-400)'
                              : 'var(--color-ultraviolet-500)'
                          }
                          stroke="var(--color-ink)"
                          strokeWidth="1"
                          style={{ opacity: `var(--branch-${index})` }}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="col-span-7 grid grid-rows-4 divide-y divide-ink/10 overflow-hidden rounded-panel border border-ink/20 bg-alabaster-100 shadow-sheet">
                {rows.map((row, index) => {
                  const isSelected = row.id === selectedVault;
                  return (
                    <button
                      key={row.id}
                      type="button"
                      onClick={() => setSelectedVault(row.id)}
                      aria-pressed={isSelected}
                      className={`group flex flex-col justify-center border-l-4 px-4 py-3 text-left transition-colors duration-200 ease-loot lg:px-5 ${
                        isSelected
                          ? 'border-l-ultraviolet-500 bg-alabaster-50'
                          : 'border-l-transparent bg-alabaster-100 hover:bg-alabaster-50/70'
                      }`}
                      style={{
                        opacity: `var(--row-${index})`,
                        transform: `translate3d(calc((1 - var(--row-${index})) * 0.75rem), 0, 0)`,
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span className="font-display text-body font-semibold text-ink-primary">
                            {row.label}
                          </span>
                          <span
                            className={`tabular rounded-full px-2.5 py-0.5 text-micro font-semibold ${
                              isSelected
                                ? 'bg-charcoal-900 text-signal'
                                : 'bg-ink/10 text-ink-secondary'
                            }`}
                          >
                            {row.sharePct}%
                          </span>
                          <span className="hidden truncate text-micro text-ink-secondary lg:inline">
                            {row.action}
                          </span>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                          <span className="hidden tabular whitespace-nowrap text-micro text-ink-muted xl:inline">
                            Before: {formatIdrCompact(row.startingBalanceIdr)}
                          </span>
                          <span
                            className={`tabular whitespace-nowrap rounded-full px-2.5 py-0.5 text-micro font-semibold ${
                              isSelected
                                ? 'bg-signal text-ink ring-1 ring-ink/15'
                                : 'bg-ultraviolet-500/15 text-ultraviolet-600'
                            }`}
                            style={{ opacity: `var(--figure-${index})` }}
                          >
                            +{formatIdrCompact(row.deltaIdr)} added
                          </span>
                          <span
                            className="tabular whitespace-nowrap text-figure font-bold text-ink-primary"
                            style={{ opacity: `var(--figure-${index})` }}
                          >
                            {formatIdr(row.settledIdr)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
                        <span
                          className={`block h-full origin-left rounded-full ${
                            isSelected ? 'bg-ultraviolet-500' : 'bg-charcoal-900'
                          }`}
                          style={{
                            width: `${row.sharePct}%`,
                            transform: `scaleX(var(--branch-${index}))`,
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <footer
              className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-charcoal-700 bg-charcoal-900 px-5 py-3.5 text-micro text-alabaster-50"
              style={{ opacity: 'var(--hold)' }}
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-signal px-2.5 py-0.5 font-semibold text-ink">
                  Selected pocket
                </span>
                <p className="tabular text-alabaster-50">
                  <span className="font-semibold">{activeRow.label}</span> started at{' '}
                  {formatIdr(activeRow.startingBalanceIdr)}, received{' '}
                  <span className="font-semibold text-signal">
                    +{formatIdrCompact(activeRow.deltaIdr)}
                  </span>
                  , and now holds{' '}
                  <span className="font-bold text-alabaster-50">
                    {formatIdr(activeRow.settledIdr)}
                  </span>
                  .
                </p>
              </div>
              <p className="text-alabaster-50/70">{FLOW.note}</p>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
