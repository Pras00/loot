'use client';

import { useRef, useState, type PointerEvent } from 'react';

import { LootCard } from '@/components/card/loot-card';
import { FORGE, type EditionId } from '@/lib/content/copy';
import { clamp } from '@/lib/scroll/math';
import { useStage } from '@/lib/scroll/use-stage';
import { formatIdr, formatNumber } from '@/lib/treasury/format';
import { RULE_PRESETS, SCENARIO, SLIDER } from '@/lib/treasury/rules';
import { splitSpend } from '@/lib/treasury/split';

import { forgeChoreography } from './choreography';

const POCKET_CODES = ['01', '02', '03', '04'] as const;

/**
 * Section 4 — "One card. Both sides of the line." (`dennypratama.com` Section 4
 * style: interactive 23.6° blueprint vs live-card scrubber from 0% to 100%,
 * gigantic `Archivo 300` bill amount slider, and a 4-column progress bar at
 * the bottom).
 */
export function ActFourForge() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useStage(sectionRef, forgeChoreography);

  const [edition, setEdition] = useState<EditionId>('stealth');
  const [presetId, setPresetId] = useState<string>(RULE_PRESETS[0].id);
  const [limitIdr, setLimitIdr] = useState<number>(SCENARIO.perTransactionLimitIdr);
  const [amountIdr, setAmountIdr] = useState<number>(SLIDER.defaultIdr);
  const [scrubPct, setScrubPct] = useState<number>(48);
  const [dragging, setDragging] = useState<boolean>(false);

  const activePreset = RULE_PRESETS.find((preset) => preset.id === presetId) ?? RULE_PRESETS[0];
  const overLimit = amountIdr > limitIdr;
  const split = splitSpend(amountIdr, activePreset.rules);

  const handleFramePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (!dragging && event.pointerType !== 'mouse') {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const pct = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
    setScrubPct(Number(pct.toFixed(1)));
  };

  const tiltSpan = 16;
  const topX = clamp(scrubPct + tiltSpan, 0, 100);
  const bottomX = clamp(scrubPct - tiltSpan, 0, 100);

  return (
    <section
      ref={sectionRef}
      id="forge"
      aria-labelledby="forge-title"
      className="runway-forge overlap-stage room-dark pointer-events-none relative z-40"
    >
      <div className="sticky top-0 h-svh overflow-hidden" style={{ opacity: 'var(--stage-o, 0)' }}>
        <div
          className="pointer-events-auto relative h-full w-full bg-charcoal-950"
          style={{
            clipPath: 'inset(0 0 0 calc((1 - var(--wipe, 0)) * 100%))',
          }}
        >
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 pb-8 pt-10 sm:px-12 sm:pb-10 sm:pt-12">
            {/* Top Header + Edition & Preset Toggles */}
            <header className="grid grid-cols-1 items-end gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-7">
                <h2 id="forge-title" className="text-display-lg text-ink-primary">
                  {FORGE.title}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-4 md:col-span-5 md:justify-end">
                <fieldset aria-label={FORGE.editionLabel} className="flex gap-1.5">
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
                      <span className="flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1 text-micro text-ink-secondary transition-colors duration-200 ease-loot peer-checked:border-signal peer-checked:text-ink-primary">
                        <span
                          aria-hidden
                          className="size-2 rounded-full"
                          style={{ backgroundColor: option.hex }}
                        />
                        {option.name}
                      </span>
                    </label>
                  ))}
                </fieldset>

                <fieldset aria-label={FORGE.ruleLabel} className="flex gap-1.5">
                  {RULE_PRESETS.map((preset) => (
                    <label key={preset.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="rule-preset"
                        value={preset.id}
                        checked={presetId === preset.id}
                        onChange={() => setPresetId(preset.id)}
                        className="peer sr-only"
                      />
                      <span className="inline-flex rounded-full border border-hairline px-3 py-1 text-micro text-ink-secondary transition-colors duration-200 ease-loot peer-checked:border-ultraviolet-500 peer-checked:text-signal">
                        {preset.name}
                      </span>
                    </label>
                  ))}
                </fieldset>
              </div>
            </header>

            {/* Middle Interactive 23.6° Blueprint vs Live Card Scrubber (0% to 100%) */}
            <div className="my-auto grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
              <div
                onPointerMove={handleFramePointerMove}
                onPointerUp={() => setDragging(false)}
                onPointerLeave={() => setDragging(false)}
                className="relative h-64 w-full select-none overflow-hidden border border-hairline bg-charcoal-900 sm:h-76 lg:col-span-7"
              >
                {/* Right Side: Live Rendered Card Surface */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="w-56 sm:w-72">
                    <LootCard edition={edition} />
                  </div>
                  <span className="absolute bottom-3 right-4 text-micro text-ink-muted">
                    p / live card ({edition})
                  </span>
                </div>

                {/* Left Side: CAD Wireframe Blueprint (clipped by 23.6° slash) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-charcoal-950"
                  style={{
                    /* Blueprint §2 exception #1: 23.6° diagonal blueprint scrubber */
                    clipPath: `polygon(0% 0%, ${topX}% 0%, ${bottomX}% 100%, 0% 100%)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-35"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(to right, color-mix(in oklab, var(--color-ultraviolet-500) 28%, transparent) 0 1px, transparent 1px 3.25rem), repeating-linear-gradient(to bottom, color-mix(in oklab, var(--color-alabaster-50) 10%, transparent) 0 1px, transparent 1px 1.25rem)',
                    }}
                  />

                  <div className="relative flex h-full items-center justify-center p-6">
                    <div className="card-face relative w-56 border border-signal/75 bg-ultraviolet-900/35 p-4 sm:w-72">
                      <div className="flex h-full flex-col justify-between text-micro text-alabaster-50">
                        <div className="flex justify-between">
                          <span className="text-signal">d / blueprint</span>
                          <span className="tabular text-alabaster-50/70">85.6 × 54 mm</span>
                        </div>
                        <div className="my-auto flex items-center justify-between border-y border-signal/30 py-2">
                          <span>Offline chip (0.4s)</span>
                          <span className="tabular text-signal">
                            {activePreset.rules.map((r) => r.sharePct).join(' / ')}%
                          </span>
                        </div>
                        <div className="flex justify-between text-alabaster-50/70">
                          <span>0.78 mm stack</span>
                          <span>23.6° cut</span>
                        </div>
                      </div>
                    </div>

                    <span className="absolute bottom-3 left-4 text-micro text-signal">
                      d / internal architecture
                    </span>
                  </div>
                </div>

                {/* 23.6° Slash Line */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 size-full"
                  aria-hidden="true"
                >
                  <line
                    x1={topX}
                    y1={0}
                    x2={bottomX}
                    y2={100}
                    stroke="var(--color-signal-400)"
                    strokeWidth={1.5}
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {/* Draggable Scrub Handle */}
                <button
                  type="button"
                  onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    setDragging(true);
                  }}
                  aria-label="Scrub across the card between blueprint and finished metal"
                  className="absolute top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center gap-1.5 rounded-full border border-signal bg-charcoal-950 px-3 py-1 text-micro text-ink-primary"
                  style={{ left: `${scrubPct}%` }}
                >
                  <span aria-hidden className="size-1.5 rounded-full bg-signal" />
                  <span>Scrub</span>
                </button>
              </div>

              {/* Right 5 Columns: Gigantic `Archivo 300` Bill Amount & Slider */}
              <div className="lg:col-span-5">
                <label htmlFor="forge-amount" className="block text-micro text-ink-muted">
                  {FORGE.amountLabel}
                </label>
                <output
                  htmlFor="forge-amount"
                  className="tabular mt-1 block text-display-md text-ink-primary"
                >
                  {formatIdr(amountIdr)}
                </output>

                <input
                  id="forge-amount"
                  type="range"
                  min={SLIDER.minIdr}
                  max={SLIDER.maxIdr}
                  step={SLIDER.stepIdr}
                  value={amountIdr}
                  onChange={(event) => setAmountIdr(Number(event.currentTarget.value))}
                  aria-valuetext={`${formatNumber(amountIdr)} rupiah`}
                  className="range-loot mt-3"
                />

                <div className="flex items-baseline justify-between text-micro text-ink-muted">
                  <span>{formatIdr(SLIDER.minIdr)}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="tabular">
                      {FORGE.limitLabel}: {formatIdr(limitIdr)}
                    </span>
                    {limitIdr > SCENARIO.perTransactionLimitIdr ? (
                      <button
                        type="button"
                        onClick={() => setLimitIdr(SCENARIO.perTransactionLimitIdr)}
                        className="text-signal underline underline-offset-4"
                      >
                        Reset
                      </button>
                    ) : null}
                  </div>
                </div>

                {overLimit ? (
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-l-2 border-l-warning pl-3 text-micro text-warning">
                    <span>{FORGE.declined}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setAmountIdr(limitIdr)}
                        className="rounded-full border border-warning px-2.5 py-0.5 text-warning"
                      >
                        Cap at {formatIdr(limitIdr)}
                      </button>
                      {limitIdr < SCENARIO.raisedLimitIdr ? (
                        <button
                          type="button"
                          onClick={() => setLimitIdr(SCENARIO.raisedLimitIdr)}
                          className="rounded-full bg-signal px-2.5 py-0.5 font-medium text-ink"
                        >
                          Raise limit
                        </button>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 border-l-2 border-l-signal pl-3 text-micro text-ink-secondary">
                    {FORGE.authorised}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom 4-Column Progress Selector Bar (dennypratama.com Image 7 style) */}
            <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
              {split.lines.map((line, index) => {
                const pct = activePreset.rules[index]?.sharePct ?? 0;
                return (
                  <div
                    key={line.id}
                    className="transition-opacity duration-200"
                    style={{ opacity: overLimit ? 0.4 : 1 }}
                  >
                    <div className="h-0.5 w-full bg-charcoal-800">
                      <div
                        className={`h-full transition-all duration-300 ease-loot ${
                          index === 0 || index === 1 ? 'bg-signal' : 'bg-ultraviolet-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <dt className="mt-3 flex items-baseline justify-between gap-2 text-micro text-ink-muted">
                      <span>
                        <span>{POCKET_CODES[index] ?? '01'}</span>
                        <span className="mx-1">/</span>
                        <span>04</span>
                        <span className="ml-2 text-body-sm text-ink-primary">{line.label}</span>
                      </span>
                      <span className="tabular text-signal">{pct}%</span>
                    </dt>
                    <dd className="tabular mt-1 text-title text-ink-primary">
                      {formatIdr(line.amountIdr)}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
