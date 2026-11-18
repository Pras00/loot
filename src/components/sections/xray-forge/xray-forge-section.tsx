'use client';

import { useRef, useState, type PointerEvent } from 'react';

import { BrandMark } from '@/components/brand/brand-mark';
import { LootCard } from '@/components/brand/loot-card';
import { FORGE, type EditionId } from '@/lib/content/copy';
import { clamp } from '@/lib/scroll/math';
import { useStage } from '@/lib/scroll/use-stage';
import { formatIdr, formatNumber } from '@/lib/treasury/format';
import { RULE_PRESETS, SCENARIO, SLIDER } from '@/lib/treasury/rules';
import { splitSpend } from '@/lib/treasury/split';

import { xrayForgeChoreography } from './choreography';

const POCKET_CODES = ['01', '02', '03', '04'] as const;

/**
 * Section 4 — "One card. Both sides of the line."
 */
export function XrayForgeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useStage(sectionRef, xrayForgeChoreography);

  const [edition, setEdition] = useState<EditionId>('stealth');
  const [presetId, setPresetId] = useState<string>(RULE_PRESETS[0].id);
  const [limitIdr, setLimitIdr] = useState<number>(SCENARIO.perTransactionLimitIdr);
  const [amountIdr, setAmountIdr] = useState<number>(SLIDER.defaultIdr);
  const [scrubPct, setScrubPct] = useState<number>(52);
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
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-6 sm:px-12 sm:py-8">
            <header className="grid grid-cols-1 items-end gap-4 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-8">
                <h2 id="forge-title" className="text-display-md text-ink-primary lg:text-display-lg">
                  {FORGE.title}
                </h2>
              </div>
              <div className="md:col-span-4">
                <p className="text-body-sm text-ink-secondary">{FORGE.lead}</p>
              </div>
            </header>

            <div className="my-auto grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
              {/* Left 7 Columns: Framed Inspection Chamber */}
              <div className="border border-hairline bg-charcoal-900/70 lg:col-span-7">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-2">
                  <span className="tabular text-micro text-ink-muted">
                    ISO/IEC 7810 ID-1 · 0.78 MM
                  </span>

                  <fieldset aria-label={FORGE.editionLabel} className="flex items-center gap-5">
                    {FORGE.editions.map((option, idx) => {
                      const active = edition === option.id;
                      return (
                        <label key={option.id} className="cursor-pointer">
                          <input
                            type="radio"
                            name="edition"
                            value={option.id}
                            checked={active}
                            onChange={() => setEdition(option.id)}
                            className="sr-only"
                          />
                          <span
                            className={`flex items-center gap-2 border-b-2 pb-1 text-micro transition-colors duration-200 ease-loot ${
                              active
                                ? 'border-signal text-ink-primary'
                                : 'border-transparent text-ink-muted hover:text-ink-secondary'
                            }`}
                          >
                            <span
                              aria-hidden
                              className="size-2 border border-alabaster-50/25"
                              style={{ backgroundColor: option.hex }}
                            />
                            <span className="tabular text-ink-muted">0{idx + 1}</span>
                            <span>{option.name}</span>
                          </span>
                        </label>
                      );
                    })}
                  </fieldset>
                </div>

                {/* 23.6° Interactive X-Ray vs Live Metal Frame */}
                <div
                  onPointerMove={handleFramePointerMove}
                  onPointerUp={() => setDragging(false)}
                  onPointerLeave={() => setDragging(false)}
                  className="relative h-56 w-full select-none overflow-hidden bg-charcoal-900 sm:h-68"
                >
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="w-60 sm:w-76">
                      <LootCard edition={edition} />
                    </div>
                    <span className="absolute bottom-2.5 right-4 text-micro text-ink-muted">
                      Surface · {edition}
                    </span>
                  </div>

                  {/* Left Side: Precision CAD X-Ray Schematic */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-charcoal-950"
                    style={{
                      /* Blueprint §2 exception #1: 23.6° diagonal CAD slicer */
                      clipPath: `polygon(0% 0%, ${topX}% 0%, ${bottomX}% 100%, 0% 100%)`,
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(to right, color-mix(in oklab, var(--color-ultraviolet-500) 24%, transparent) 0 1px, transparent 1px 2.5rem), repeating-linear-gradient(to bottom, color-mix(in oklab, var(--color-alabaster-50) 10%, transparent) 0 1px, transparent 1px 1.25rem)',
                      }}
                    />

                    <div className="relative flex h-full items-center justify-center p-4">
                      <div className="card-face relative w-60 sm:w-76">
                        <svg
                          viewBox="0 0 320 202"
                          fill="none"
                          className="size-full overflow-visible"
                        >
                          <rect
                            x="1"
                            y="1"
                            width="318"
                            height="200"
                            rx="18"
                            stroke="var(--color-alabaster-50)"
                            strokeOpacity={0.35}
                            strokeWidth={1}
                          />
                          <rect
                            x="9"
                            y="9"
                            width="302"
                            height="184"
                            rx="12"
                            stroke="var(--color-ultraviolet-500)"
                            strokeOpacity={0.7}
                            strokeWidth={1}
                            strokeDasharray="3 3"
                          />
                          <rect
                            x="14"
                            y="14"
                            width="292"
                            height="174"
                            rx="9"
                            stroke="var(--color-ultraviolet-500)"
                            strokeOpacity={0.4}
                            strokeWidth={0.8}
                          />

                          <path
                            d="M 160 4 V 16 M 154 10 H 166 M 160 186 V 198 M 154 192 H 166"
                            stroke="var(--color-signal-400)"
                            strokeOpacity={0.65}
                            strokeWidth={0.9}
                          />

                          <rect
                            x="24"
                            y="76"
                            width="44"
                            height="34"
                            rx="4"
                            fill="var(--color-ultraviolet-900)"
                            fillOpacity={0.7}
                            stroke="var(--color-signal-400)"
                            strokeWidth={1.1}
                          />
                          <rect
                            x="37"
                            y="85"
                            width="18"
                            height="16"
                            stroke="var(--color-alabaster-50)"
                            strokeOpacity={0.8}
                            strokeWidth={0.9}
                          />
                          <circle cx="46" cy="93" r="3" fill="var(--color-signal-400)" />

                          <path
                            d="M 68 83 H 126 L 154 54 H 256"
                            stroke="var(--color-signal-400)"
                            strokeOpacity={0.85}
                            strokeWidth={1.2}
                          />
                          <path
                            d="M 68 90 H 256"
                            stroke="var(--color-ultraviolet-500)"
                            strokeOpacity={0.9}
                            strokeWidth={1.2}
                          />
                          <path
                            d="M 68 97 H 134 L 160 124 H 256"
                            stroke="var(--color-alabaster-50)"
                            strokeOpacity={0.55}
                            strokeWidth={1.1}
                          />
                          <path
                            d="M 68 103 H 120 L 146 154 H 256"
                            stroke="var(--color-ultraviolet-500)"
                            strokeOpacity={0.55}
                            strokeWidth={1}
                            strokeDasharray="2 2"
                          />

                          {activePreset.rules.map((rule, idx) => {
                            const yCoords = [54, 90, 124, 154] as const;
                            const y = yCoords[idx] ?? 54;
                            return (
                              <g key={rule.id}>
                                <rect
                                  x="256"
                                  y={y - 3}
                                  width="6"
                                  height="6"
                                  fill={
                                    idx === 0
                                      ? 'var(--color-signal-400)'
                                      : 'var(--color-alabaster-50)'
                                  }
                                />
                                <text
                                  x="268"
                                  y={y + 3}
                                  fill="var(--color-alabaster-50)"
                                  fillOpacity={0.78}
                                  fontSize="9"
                                >
                                  {rule.label.toUpperCase()} {rule.sharePct}%
                                </text>
                              </g>
                            );
                          })}

                          <text x="24" y="34" fill="var(--color-signal-400)" fontSize="9">
                            EAL6+ · 0.40s OFFLINE ENGINE
                          </text>
                          <text
                            x="24"
                            y="174"
                            fill="var(--color-alabaster-50)"
                            fillOpacity={0.6}
                            fontSize="8.5"
                          >
                            85.60 × 53.98 MM · AL-7075 CORE
                          </text>
                        </svg>

                        <div className="absolute bottom-4 right-5 text-alabaster-50/75">
                          <BrandMark variant="wireframe" className="size-5" />
                        </div>
                      </div>

                      <span className="absolute bottom-2.5 left-4 text-micro text-signal">
                        CAD X-Ray · 23.6° cut
                      </span>
                    </div>
                  </div>

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

                  <button
                    type="button"
                    onPointerDown={(event) => {
                      event.currentTarget.setPointerCapture(event.pointerId);
                      setDragging(true);
                    }}
                    aria-label="Scrub across the card between CAD X-Ray and live metal surface"
                    className="top-3/5 absolute z-20 flex -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center gap-1.5 rounded-full border border-signal bg-charcoal-950 px-3 py-1 text-micro text-ink-primary shadow-paper"
                    style={{ left: `${scrubPct}%` }}
                  >
                    <span aria-hidden className="text-signal">
                      ‹
                    </span>
                    <span>Scrub</span>
                    <span aria-hidden className="text-signal">
                      ›
                    </span>
                  </button>
                </div>
              </div>

              {/* Right 5 Columns: Hairline Preset Tabs + Gigantic Bill Slider */}
              <div className="lg:col-span-5">
                <fieldset
                  aria-label={FORGE.ruleLabel}
                  className="mb-5 grid grid-cols-3 border-b border-hairline"
                >
                  {RULE_PRESETS.map((preset) => {
                    const active = presetId === preset.id;
                    return (
                      <label key={preset.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="rule-preset"
                          value={preset.id}
                          checked={active}
                          onChange={() => setPresetId(preset.id)}
                          className="sr-only"
                        />
                        <span
                          className={`block border-b-2 pb-2.5 pr-2 text-left transition-colors duration-200 ease-loot ${
                            active
                              ? 'border-signal text-ink-primary'
                              : 'border-transparent text-ink-muted hover:text-ink-secondary'
                          }`}
                        >
                          <span className="block text-micro font-medium">{preset.name}</span>
                          <span className="tabular mt-0.5 block text-micro opacity-65">
                            {preset.rules.map((r) => r.sharePct).join('/')}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </fieldset>

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
                  className="range-loot mt-2"
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
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-l-2 border-l-warning pl-3 text-micro text-warning">
                    <span>{FORGE.declined}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setAmountIdr(limitIdr)}
                        className="border border-warning px-2.5 py-0.5 text-warning"
                      >
                        Cap at {formatIdr(limitIdr)}
                      </button>
                      {limitIdr < SCENARIO.raisedLimitIdr ? (
                        <button
                          type="button"
                          onClick={() => setLimitIdr(SCENARIO.raisedLimitIdr)}
                          className="bg-signal px-2.5 py-0.5 font-medium text-ink"
                        >
                          Raise limit
                        </button>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 border-l-2 border-l-signal pl-3 text-micro text-ink-secondary">
                    {FORGE.authorised}
                  </p>
                )}
              </div>
            </div>

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
                    <dt className="mt-2.5 flex items-baseline justify-between gap-2 text-micro text-ink-muted">
                      <span>
                        <span>{POCKET_CODES[index] ?? '01'}</span>
                        <span className="mx-1">/</span>
                        <span>04</span>
                        <span className="ml-2 text-body-sm text-ink-primary">{line.label}</span>
                      </span>
                      <span className="tabular text-signal">{pct}%</span>
                    </dt>
                    <dd className="tabular mt-0.5 text-title text-ink-primary">
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
