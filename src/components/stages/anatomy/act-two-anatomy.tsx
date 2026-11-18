'use client';

import { useRef, useState } from 'react';

import { ANATOMY, RECEIPT } from '@/lib/content/copy';
import { useStage } from '@/lib/scroll/use-stage';
import { formatIdr, formatIdrCompact } from '@/lib/treasury/format';
import { SCENARIO, VAULT_LEDGER, VAULT_RULES, type VaultId } from '@/lib/treasury/rules';
import { splitSpend } from '@/lib/treasury/split';

import { anatomyChoreography } from './choreography';

interface PocketDisplayMeta {
  readonly id: VaultId;
  readonly code: string;
  readonly displayTitle: string;
  readonly category: string;
  readonly note: string;
}

const POCKET_ROWS = [
  {
    id: 'ops',
    code: '01',
    displayTitle: 'Daily Expenses',
    category: 'Operating float',
    note: 'Ready immediately for everyday bills, travel, and team meals.',
  },
  {
    id: 'yield',
    code: '02',
    displayTitle: 'Savings & Yield',
    category: 'Daily interest',
    note: 'Moved automatically into your interest-bearing reserve on every tap.',
  },
  {
    id: 'tax',
    code: '03',
    displayTitle: 'Tax Reserve',
    category: 'Quarterly tax',
    note: 'Set aside before you can spend it, so tax day is already paid for.',
  },
  {
    id: 'payroll',
    code: '04',
    displayTitle: 'Team Payroll',
    category: 'Salary reserve',
    note: 'Protected in its own pocket for upcoming biweekly salaries.',
  },
] as const satisfies readonly PocketDisplayMeta[];

const ROW_VARS = ['var(--row-0)', 'var(--row-1)', 'var(--row-2)', 'var(--row-3)'] as const;

/**
 * Section 2 — "Paid once. Sorted four ways." (`dennypratama.com` Section 2 style:
 * warm bone/alabaster room, 4 full-width gigantic `Archivo 300` rows, and one
 * floating preview card on the right that updates as you point at any pocket).
 */
export function ActTwoAnatomy() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useStage(sectionRef, anatomyChoreography);

  const [activeId, setActiveId] = useState<VaultId>('ops');
  const split = splitSpend(SCENARIO.amountIdr);

  const activeMeta = POCKET_ROWS.find((item) => item.id === activeId) ?? POCKET_ROWS[0];
  const activeRule = VAULT_RULES.find((rule) => rule.id === activeMeta.id) ?? VAULT_RULES[0];
  const activeLine = split.lines.find((line) => line.id === activeMeta.id);
  const ledger = VAULT_LEDGER[activeMeta.id];
  const deltaIdr = activeLine?.amountIdr ?? 0;
  const settledIdr = ledger.startingBalanceIdr + deltaIdr;

  return (
    <section
      ref={sectionRef}
      id="anatomy"
      aria-labelledby="anatomy-title"
      className="runway-anatomy overlap-stage room-light pointer-events-none relative z-20"
    >
      <div className="sticky top-0 h-svh overflow-hidden" style={{ opacity: 'var(--stage-o, 0)' }}>
        <div
          className="pointer-events-auto relative h-full w-full bg-canvas"
          style={{
            opacity: 'var(--curtain, 0)',
          }}
        >
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 pb-8 pt-10 sm:px-12 sm:pb-10 sm:pt-12">
            {/* Top Editorial Header (Gigantic left title + calm right lead) */}
            <header
              className="grid grid-cols-1 items-end gap-6 md:grid-cols-12 md:gap-8"
              style={{
                opacity: 'var(--type-o)',
                transform: 'translate3d(0, var(--type-y), 0)',
              }}
            >
              <div className="md:col-span-8">
                <h2 id="anatomy-title" className="text-display-lg text-ink-primary">
                  {ANATOMY.title}
                </h2>
              </div>
              <div className="md:col-span-4">
                <p className="text-body-sm text-ink-secondary">{ANATOMY.lead}</p>
              </div>
            </header>

            {/* Full-Width Gigantic Pocket Index + Floating Preview Card */}
            <div className="relative my-auto">
              <ul className="divide-y divide-ink/15 border-y border-ink/20">
                {POCKET_ROWS.map((row, index) => {
                  const isSelected = row.id === activeMeta.id;
                  const rule = VAULT_RULES.find((r) => r.id === row.id);
                  const pct = rule?.sharePct ?? 0;
                  return (
                    <li
                      key={row.id}
                      style={{
                        opacity: ROW_VARS[index],
                        transform: `translate3d(0, calc((1 - ${ROW_VARS[index]}) * 0.75rem), 0)`,
                      }}
                    >
                      <button
                        type="button"
                        onMouseEnter={() => setActiveId(row.id)}
                        onFocus={() => setActiveId(row.id)}
                        onClick={() => setActiveId(row.id)}
                        aria-pressed={isSelected}
                        className="group flex w-full items-baseline justify-between gap-4 py-3 text-left sm:py-4"
                      >
                        <div className="flex items-baseline gap-6 sm:gap-10">
                          <span className="tabular w-8 text-data text-ink-muted">{row.code}</span>
                          <span
                            className={`text-display-md transition-all duration-300 ease-loot sm:text-display-lg ${
                              isSelected
                                ? 'translate-x-3 text-ink-primary'
                                : 'text-ink/22 group-hover:translate-x-2 group-hover:text-ink/60'
                            }`}
                          >
                            {row.displayTitle}
                          </span>
                        </div>

                        <span className="hidden text-micro text-ink-muted sm:inline">
                          {row.category} ({pct}%)
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Floating Live Pocket Preview Card on the right (like Halden preview in Image 5) */}
              <aside
                aria-label="Selected pocket live breakdown"
                className="mt-4 rounded-card border border-ink/15 bg-alabaster-50 p-5 shadow-paper md:absolute md:bottom-4 md:right-0 md:mt-0 md:w-88 lg:w-96 lg:p-6"
                style={{
                  opacity: 'var(--preview-o)',
                  transform: 'translate3d(0, var(--preview-y), 0)',
                }}
              >
                <div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-3 text-micro">
                  <span className="text-ink-muted">
                    {SCENARIO.merchant} ({formatIdrCompact(SCENARIO.amountIdr)})
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-0.5 font-medium text-signal">
                    <span aria-hidden className="size-1.5 rounded-full bg-signal" />
                    {RECEIPT.approved} in 0.4s
                  </span>
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <div>
                    <p className="text-micro text-ink-muted">{activeMeta.displayTitle} share</p>
                    <p className="tabular mt-1 text-display-md text-ink-primary">
                      +{formatIdrCompact(deltaIdr)}
                    </p>
                  </div>
                  <span className="tabular text-title text-ultraviolet-600">
                    {activeRule.sharePct}%
                  </span>
                </div>

                <div className="mt-3 h-1 w-full overflow-hidden bg-ink/10">
                  <div
                    className="h-full bg-ultraviolet-500 transition-all duration-300 ease-loot"
                    style={{ width: `${activeRule.sharePct}%` }}
                  />
                </div>

                <p className="mt-3 text-micro text-ink-secondary">{activeMeta.note}</p>

                <div className="mt-4 flex items-baseline justify-between border-t border-ink/10 pt-3 text-micro">
                  <span className="text-ink-muted">Updated pocket balance</span>
                  <span className="tabular font-semibold text-ink-primary">
                    {formatIdr(settledIdr)}
                  </span>
                </div>
              </aside>
            </div>

            {/* Clean Bottom Caption */}
            <div className="flex items-baseline justify-between text-micro text-ink-muted">
              <span>Point at a pocket to inspect its share</span>
              <span>100% of Rp 480.000 sorted automatically</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
