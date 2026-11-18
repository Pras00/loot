'use client';

import { useRef, useState, type PointerEvent } from 'react';

import { LootCard } from '@/components/card/loot-card';
import { FORGE, type EditionId } from '@/lib/content/copy';
import { clamp } from '@/lib/scroll/math';
import { useStage } from '@/lib/scroll/use-stage';
import { formatIdr, formatIdrCompact, formatNumber } from '@/lib/treasury/format';
import { RULE_PRESETS, SCENARIO, SLIDER, VAULT_LEDGER } from '@/lib/treasury/rules';
import { splitSpend } from '@/lib/treasury/split';

import { forgeChoreography } from './choreography';

const SEGMENT_TONES = [
  'bg-signal',
  'bg-ultraviolet-500',
  'bg-alabaster-50',
  'bg-alabaster-50/45',
] as const;

/**
 * Act 4 — Forge. An inviting, easy-to-understand interactive simulator where
 * visitors can pick a card finish, choose a splitting style, and slide the
 * payment amount to see their four money pockets update live.
 */
export function ActFourForge() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  useStage(sectionRef, forgeChoreography);

  const [edition, setEdition] = useState<EditionId>('stealth');
  const [presetId, setPresetId] = useState<string>(RULE_PRESETS[0].id);
  const [limitIdr, setLimitIdr] = useState<number>(SCENARIO.perTransactionLimitIdr);
  const [amountIdr, setAmountIdr] = useState<number>(SLIDER.defaultIdr);
  const [taps, setTaps] = useState(0);

  const activePreset = RULE_PRESETS.find((preset) => preset.id === presetId) ?? RULE_PRESETS[0];
  const activeEdition =
    FORGE.editions.find((candidate) => candidate.id === edition) ?? FORGE.editions[0];
  const overLimit = amountIdr > limitIdr;
  const authorised = taps > 0 && !overLimit;
  const split = splitSpend(amountIdr, activePreset.rules);

  const selectAmount = (next: number): void => {
    setAmountIdr(next);
    setTaps(0);
  };

  const triggerTap = (): void => {
    if (!overLimit) {
      setTaps((value) => value + 1);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    const el = tiltRef.current;
    if (el === null || event.pointerType !== 'mouse') {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const nx = clamp((event.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5);
    const ny = clamp((event.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5);
    el.style.setProperty('--tilt-rx', `${(-ny * 10).toFixed(2)}deg`);
    el.style.setProperty('--tilt-ry', `${(nx * 12).toFixed(2)}deg`);
    el.style.setProperty('--sheen-deg', `${(210 + nx * 64).toFixed(1)}deg`);
  };

  const handlePointerLeave = (): void => {
    const el = tiltRef.current;
    if (el === null) {
      return;
    }
    el.style.setProperty('--tilt-rx', '0deg');
    el.style.setProperty('--tilt-ry', '0deg');
    el.style.setProperty('--sheen-deg', '210deg');
  };

  return (
    <section
      ref={sectionRef}
      id="forge"
      aria-labelledby="forge-title"
      className="runway-forge overlap-stage room-dark pointer-events-none relative z-40"
    >
      <div className="sticky top-0 h-svh overflow-hidden" style={{ opacity: 'var(--stage-o, 0)' }}>
        <div
          className="pointer-events-auto relative h-full w-full bg-canvas"
          style={{
            clipPath: 'inset(0 0 0 calc((1 - var(--wipe, 0)) * 100%))',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(50% 54% at 26% 46%, color-mix(in oklab, var(--color-ultraviolet-500) 28%, transparent), transparent 72%)',
            }}
          />

          <div className="relative z-10 mx-auto grid h-full max-w-6xl content-center items-stretch gap-4 px-5 py-5 sm:grid-cols-12 sm:gap-8 sm:px-10 sm:py-10">
            <div className="flex flex-col justify-between rounded-panel border border-ultraviolet-500/30 bg-charcoal-950/90 p-5 shadow-paper sm:col-span-5 sm:p-6">
              <div className="flex items-center justify-between gap-2 border-b border-hairline pb-3">
                <span className="text-micro font-semibold text-signal">
                  Interactive card preview
                </span>
                <span className="rounded-full border border-ultraviolet-500/40 bg-ultraviolet-900/60 px-3 py-0.5 text-micro font-medium text-alabaster-50">
                  {activeEdition.name} finish
                </span>
              </div>

              <div className="my-auto py-3 sm:py-5">
                <div
                  ref={tiltRef}
                  onPointerMove={handlePointerMove}
                  onPointerLeave={handlePointerLeave}
                  className="perspective-distant mx-auto w-full max-w-44 sm:max-w-xs lg:max-w-sm"
                >
                  <div
                    style={{
                      transform:
                        'translate3d(0, var(--turn-y), 0) rotateY(calc((1 - var(--turn)) * -64deg + var(--tilt-ry, 0deg))) rotateX(calc((1 - var(--turn)) * 8deg + var(--tilt-rx, 0deg)))',
                      opacity: 'var(--turn-o)',
                      transition: 'transform 240ms var(--ease-loot)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={triggerTap}
                      aria-label={`${FORGE.tap}. ${formatIdr(amountIdr)}, ${edition} edition, ${activePreset.name} rule.`}
                      aria-describedby="forge-status"
                      className="relative block w-full rounded-card transition-transform duration-300 ease-loot hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <LootCard edition={edition} />
                      {taps > 0 && !overLimit ? (
                        <span key={taps} aria-hidden className="pointer-events-none absolute inset-0">
                          <span className="nfc-ring absolute left-1/2 top-1/2 size-1/2 rounded-full border border-signal" />
                          <span className="nfc-ring nfc-ring--late absolute left-1/2 top-1/2 size-1/2 rounded-full border border-ultraviolet-500" />
                        </span>
                      ) : null}
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={triggerTap}
                    disabled={overLimit}
                    className="inline-flex items-center gap-2.5 rounded-full border border-signal/60 bg-charcoal-900 px-4 py-2 text-micro font-medium text-ink-primary transition-colors duration-200 ease-loot hover:bg-signal hover:text-ink disabled:cursor-not-allowed disabled:border-warning/40 disabled:opacity-50"
                  >
                    <span className="size-2 rounded-full bg-signal" />
                    <span>{FORGE.tapHint}</span>
                    <span className="rounded-full bg-signal px-2.5 py-0.5 text-micro font-bold text-ink">
                      {authorised ? 'Tested' : 'Tap'}
                    </span>
                  </button>
                </div>
              </div>

              <dl className="hidden grid-cols-2 gap-3 border-t border-hairline pt-3.5 text-micro sm:grid">
                <div>
                  <dt className="text-ink-muted">Selected finish</dt>
                  <dd className="mt-0.5 font-medium text-ink-primary">{activeEdition.note}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Splitting style</dt>
                  <dd className="mt-0.5 font-semibold text-signal">{activePreset.name}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Approval speed</dt>
                  <dd className="mt-0.5 font-medium text-ink-primary">0.4 seconds, offline</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Remaining limit</dt>
                  <dd
                    className={`mt-0.5 tabular font-medium ${
                      overLimit ? 'text-warning' : 'text-ink-primary'
                    }`}
                  >
                    {overLimit
                      ? `${formatIdrCompact(amountIdr - limitIdr)} over limit`
                      : `${formatIdrCompact(limitIdr - amountIdr)} available`}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col justify-between sm:col-span-7">
              <div>
                <h2 id="forge-title" className="text-title text-balance sm:text-display-md">
                  {FORGE.title}
                </h2>
                <p className="mt-1 hidden text-body-sm text-ink-secondary sm:block">
                  {FORGE.lead}
                </p>
              </div>

              <div className="mt-3 rounded-panel border border-hairline bg-charcoal-950/85 p-4 sm:mt-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-hairline pb-3.5">
                  <fieldset>
                    <legend className="text-micro font-medium text-ink-muted">
                      {FORGE.editionLabel}
                    </legend>
                    <div className="mt-1.5 flex gap-1.5 sm:gap-2">
                      {FORGE.editions.map((option) => (
                        <label key={option.id} className="cursor-pointer">
                          <input
                            type="radio"
                            name="edition"
                            value={option.id}
                            checked={edition === option.id}
                            onChange={() => setEdition(option.id)}
                            className="peer sr-only"
                          />
                          <span className="flex items-center gap-1.5 rounded-full border border-hairline bg-charcoal-900 px-3 py-1.5 text-micro font-medium text-ink-secondary transition-colors duration-200 ease-loot peer-checked:border-signal peer-checked:text-ink-primary peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal">
                            <span
                              aria-hidden
                              className="size-2 rounded-full"
                              style={{ backgroundColor: option.hex }}
                            />
                            {option.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-micro font-medium text-ink-muted">
                      {FORGE.ruleLabel}
                    </legend>
                    <div className="mt-1.5 flex gap-1.5 sm:gap-2">
                      {RULE_PRESETS.map((preset) => (
                        <label key={preset.id} className="cursor-pointer">
                          <input
                            type="radio"
                            name="rule-preset"
                            value={preset.id}
                            checked={presetId === preset.id}
                            onChange={() => {
                              setPresetId(preset.id);
                              setTaps(0);
                            }}
                            className="peer sr-only"
                          />
                          <span className="inline-flex rounded-full border border-hairline bg-charcoal-900 px-3 py-1.5 text-micro font-medium text-ink-secondary transition-colors duration-200 ease-loot peer-checked:border-ultraviolet-500 peer-checked:bg-ultraviolet-900/70 peer-checked:text-signal peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal">
                            {preset.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="mt-3.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <label htmlFor="forge-amount" className="text-micro font-medium text-ink-muted">
                      {FORGE.amountLabel}
                    </label>
                    <output
                      htmlFor="forge-amount"
                      className="tabular text-figure font-bold text-signal"
                    >
                      {formatIdr(amountIdr)}
                    </output>
                  </div>
                  <input
                    id="forge-amount"
                    type="range"
                    min={SLIDER.minIdr}
                    max={SLIDER.maxIdr}
                    step={SLIDER.stepIdr}
                    value={amountIdr}
                    onChange={(event) => selectAmount(Number(event.currentTarget.value))}
                    aria-valuetext={`${formatNumber(amountIdr)} rupiah`}
                    className="range-loot mt-1"
                  />
                  <div className="flex items-baseline justify-between text-micro text-ink-muted">
                    <span>{formatIdr(SLIDER.minIdr)}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="tabular text-ink-secondary">
                        {FORGE.limitLabel}: {formatIdr(limitIdr)}
                      </span>
                      {limitIdr > SCENARIO.perTransactionLimitIdr ? (
                        <button
                          type="button"
                          onClick={() => {
                            setLimitIdr(SCENARIO.perTransactionLimitIdr);
                            setTaps(0);
                          }}
                          className="font-medium text-signal underline underline-offset-4"
                        >
                          Reset limit
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div
                  id="forge-status"
                  aria-live="polite"
                  className={`mt-3 flex flex-wrap items-center justify-between gap-2 rounded-card border border-l-4 px-3.5 py-2.5 text-micro ${
                    overLimit
                      ? 'border-warning/40 border-l-warning bg-charcoal-900 text-warning'
                      : authorised
                        ? 'border-signal/40 border-l-signal bg-charcoal-900 font-medium text-signal'
                        : 'border-ultraviolet-500/40 border-l-ultraviolet-500 bg-charcoal-900 text-ink-primary'
                  }`}
                >
                  <span>
                    {overLimit
                      ? FORGE.declined
                      : authorised
                        ? FORGE.authorised
                        : FORGE.withinLimit}
                  </span>
                  {overLimit ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => selectAmount(limitIdr)}
                        className="shrink-0 rounded-full border border-warning px-3 py-0.5 font-semibold text-warning"
                      >
                        Cap at {formatIdr(limitIdr)}
                      </button>
                      {limitIdr < SCENARIO.raisedLimitIdr ? (
                        <button
                          type="button"
                          onClick={() => {
                            setLimitIdr(SCENARIO.raisedLimitIdr);
                            setTaps(0);
                          }}
                          className="shrink-0 rounded-full bg-signal px-3 py-0.5 font-semibold text-ink"
                        >
                          Raise limit to {formatIdr(SCENARIO.raisedLimitIdr)}
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-3">
                <div
                  aria-hidden
                  className="flex h-2 w-full gap-0.5 overflow-hidden rounded-full bg-charcoal-800"
                  style={{ opacity: overLimit ? 0.35 : 1 }}
                >
                  {activePreset.rules.map((rule, index) => (
                    <span
                      key={rule.id}
                      className={`block h-full transition-all duration-300 ease-loot ${
                        SEGMENT_TONES[index] ?? 'bg-alabaster-50/40'
                      }`}
                      style={{ width: `${rule.sharePct}%` }}
                    />
                  ))}
                </div>

                <dl className="mt-2.5 grid grid-cols-2 gap-2.5">
                  {split.lines.map((line, index) => {
                    const pct = activePreset.rules[index]?.sharePct ?? 0;
                    const meta = VAULT_LEDGER[line.id];
                    return (
                      <div
                        key={line.id}
                        className="rounded-card border border-hairline bg-charcoal-950/90 p-3.5 transition-opacity duration-200"
                        style={{ opacity: overLimit ? 0.42 : 1 }}
                      >
                        <dt className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-2 text-body-sm font-semibold text-ink-primary">
                            <span
                              aria-hidden
                              className={`size-2 shrink-0 rounded-full ${
                                SEGMENT_TONES[index] ?? 'bg-alabaster-50'
                              }`}
                            />
                            {line.label}
                          </span>
                          <span className="tabular rounded-full bg-charcoal-800 px-2.5 py-0.5 text-micro font-semibold text-signal">
                            {pct}%
                          </span>
                        </dt>
                        <dd className="mt-1.5 flex items-baseline justify-between gap-2">
                          <span className="hidden truncate text-micro text-ink-muted sm:inline">
                            {meta.action}
                          </span>
                          <span className="tabular text-body-sm font-bold text-ink-primary">
                            {formatIdr(line.amountIdr)}
                          </span>
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
