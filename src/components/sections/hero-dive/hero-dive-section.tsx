'use client';

import { useRef, useState, type PointerEvent } from 'react';

import { BrandMark, LOOT_PRISM_SHARDS } from '@/components/brand/brand-mark';
import { LootCard } from '@/components/brand/loot-card';
import { actionClass, ActionLink } from '@/components/ui/action';
import { HERO } from '@/lib/content/copy';
import { scrollToChapter } from '@/lib/scroll/engine';
import { clamp } from '@/lib/scroll/math';
import { useStage } from '@/lib/scroll/use-stage';

import { heroDiveChoreography } from './choreography';

const TUNNEL_DEPTHS = [
  { scale: 1.48, wireframe: false, opacity: 0.92, spread: 1.0 },
  { scale: 1.18, wireframe: true, opacity: 0.72, spread: 0.82 },
  { scale: 0.92, wireframe: true, opacity: 0.58, spread: 0.65 },
  { scale: 0.7, wireframe: false, opacity: 0.45, spread: 0.5 },
  { scale: 0.52, wireframe: true, opacity: 0.36, spread: 0.38 },
] as const;

const SHARD_DIRECTIONS: Readonly<Record<string, { readonly dx: number; readonly dy: number }>> = {
  ops: { dx: -16, dy: -14 },
  yield: { dx: 18, dy: -16 },
  payroll: { dx: 16, dy: 14 },
  tax: { dx: -18, dy: 16 },
};

const FRAME_VARS = [
  'var(--frame-0, 0)',
  'var(--frame-1, 0)',
  'var(--frame-2, 0)',
  'var(--frame-3, 0)',
] as const;

const QUADRANT_POSITIONS = [
  'inset-x-6 top-28 items-start justify-start text-left sm:inset-x-12 sm:top-32',
  'inset-x-6 top-28 items-start justify-end text-right sm:inset-x-12 sm:top-32',
  'inset-x-6 bottom-14 items-end justify-start text-left sm:inset-x-12 sm:bottom-20',
  'inset-x-6 bottom-16 items-end justify-center text-center sm:inset-x-12 sm:bottom-24',
] as const;

/**
 * Section 1 — Hero & The 0.40s 4-Vault Prism Split Dive.
 */
export function HeroDiveSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useStage(sectionRef, heroDiveChoreography);

  const [slashPct, setSlashPct] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateSlashFromPointer = (clientX: number, rect: DOMRect): void => {
    const pct = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
    setSlashPct(Number(pct.toFixed(1)));
  };

  const handleHeroPointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (!dragging && event.pointerType !== 'mouse') {
      return;
    }
    updateSlashFromPointer(event.clientX, event.currentTarget.getBoundingClientRect());
  };

  // Signature 23.6° diagonal span across viewport height; unclamped 0..100 for edge-to-edge scrub.
  const tiltSpan = 21.8;
  const topX = clamp(slashPct + tiltSpan, 0, 100);
  const bottomX = clamp(slashPct - tiltSpan, 0, 100);

  return (
    <section
      ref={sectionRef}
      id="origin"
      aria-labelledby="origin-title"
      className="surface-dark runway-origin relative z-10"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-charcoal-950" />

        {/* 3D 4-Vault Prism Split Monument */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ opacity: 'var(--tunnel-o, 1)' }}
        >
          <div
            className="relative flex size-88 items-center justify-center sm:size-128"
            style={{
              transform: 'scale(var(--tunnel-s, 1)) rotate(var(--tunnel-r, 0deg))',
            }}
          >
            {TUNNEL_DEPTHS.map((layer, layerIdx) => (
              <svg
                key={layer.scale}
                viewBox="-36 -38 72 76"
                className="absolute inset-0 size-full overflow-visible"
                style={{
                  transform: `scale(${layer.scale})`,
                  opacity: layer.opacity,
                }}
              >
                {LOOT_PRISM_SHARDS.map((shard) => {
                  const dir = SHARD_DIRECTIONS[shard.id] ?? { dx: 0, dy: 0 };
                  const tx = `calc(var(--split-exp, 0) * ${dir.dx * layer.spread}px)`;
                  const ty = `calc(var(--split-exp, 0) * ${dir.dy * layer.spread}px)`;
                  const isSolidFront = !layer.wireframe && layerIdx === 0;
                  const isVioletEdge = shard.id === 'tax' || layerIdx % 2 === 1;
                  return (
                    <path
                      key={shard.id}
                      d={shard.d}
                      fill={layer.wireframe ? 'none' : 'var(--color-alabaster-50)'}
                      fillOpacity={layer.wireframe ? 0 : isSolidFront ? 0.92 : 0.14}
                      stroke={
                        shard.id === 'yield' && layerIdx <= 1
                          ? 'var(--color-signal-400)'
                          : isVioletEdge
                            ? 'var(--color-ultraviolet-500)'
                            : 'var(--color-alabaster-50)'
                      }
                      strokeOpacity={layer.wireframe ? 0.65 : 0.88}
                      strokeWidth={layer.wireframe ? 0.9 : 1.1}
                      vectorEffect="non-scaling-stroke"
                      style={{
                        transform: `translate(${tx}, ${ty})`,
                      }}
                    />
                  );
                })}
              </svg>
            ))}

            {/* Central Vault Aperture Glow */}
            <div
              className="size-24 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, var(--color-alabaster-50) 0%, color-mix(in oklab, var(--color-ultraviolet-500) 48%, transparent) 55%, transparent 75%)',
              }}
            />
          </div>
        </div>

        {/* Hero 23.6° Diagonal Split Plane (Scrubbable 0% to 100% edge-to-edge) */}
        <div
          onPointerMove={handleHeroPointerMove}
          onPointerUp={() => setDragging(false)}
          onPointerLeave={() => setDragging(false)}
          className="absolute inset-0 z-10 select-none"
          style={{ opacity: 'var(--hud-o, 1)' }}
        >
          {/* Lower-Right Blueprint Dimension */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-charcoal-950/85"
            style={{
              /* Blueprint §2 exception #1: edge-to-edge 23.6° diagonal polygon */
              clipPath: `polygon(${topX}% 0%, 100% 0%, 100% 100%, ${bottomX}% 100%)`,
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to right, color-mix(in oklab, var(--color-ultraviolet-500) 24%, transparent) 0 1px, transparent 1px 4.5rem), repeating-linear-gradient(to bottom, color-mix(in oklab, var(--color-alabaster-50) 10%, transparent) 0 1px, transparent 1px 1.5rem)',
              }}
            />

            <div className="mx-auto flex h-full max-w-7xl items-center justify-end px-6 sm:px-12">
              <div className="mt-24 text-right sm:mt-16">
                <p className="text-display-lg text-ink-secondary">{HERO.displayLines[1]}</p>
              </div>
            </div>

            <div className="absolute bottom-24 right-16 hidden flex-col items-center md:flex">
              <span className="h-px w-3 bg-ink-muted" />
              <span className="h-24 w-px bg-hairline" />
              <span className="tabular my-1.5 text-micro text-ink-secondary">23.6°</span>
              <span className="h-10 w-px bg-hairline" />
              <span className="h-px w-3 bg-ink-muted" />
            </div>
          </div>

          {/* Upper-Left Solid Surface Dimension */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              /* Blueprint §2 exception #1: upper-left complement of the 23.6° slash */
              clipPath: `polygon(0% 0%, ${topX}% 0%, ${bottomX}% 100%, 0% 100%)`,
            }}
          >
            <div className="mx-auto flex h-full max-w-7xl items-center px-6 sm:px-12">
              <div className="-mt-28 sm:-mt-16">
                <p className="mb-3 text-micro text-ink-secondary">{HERO.eyebrow}</p>
                <h1 id="origin-title" className="text-display-lg text-ink-primary">
                  {HERO.displayLines[0]}
                </h1>
              </div>
            </div>
          </div>

          {/* Full-Bleed 23.6° Diagonal Slash Line */}
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
              strokeOpacity={0.85}
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
            aria-label="Drag left or right to scrub the diagonal slash across the screen"
            className="pointer-events-auto absolute top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center gap-2 rounded-full border border-signal bg-charcoal-950/95 px-3.5 py-1.5 text-micro font-medium text-ink-primary shadow-paper"
            style={{ left: `${slashPct}%` }}
          >
            <span aria-hidden className="size-1.5 rounded-full bg-signal" />
            <span>Scrub</span>
          </button>
        </div>

        {/* Whole, Uncut Centerpiece LOOT Card at rest */}
        <div
          className="perspective-distant pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6"
          style={{
            opacity: 'var(--card-o, 1)',
            transform: 'scale(var(--card-s, 1))',
          }}
        >
          <div className="w-60 sm:w-84 lg:w-96" style={{ transform: 'rotate(-8deg)' }}>
            <div className="dispatch-rise">
              <LootCard edition="stealth" />
            </div>
          </div>
        </div>

        {/* Top Header Chrome */}
        <header
          className="pointer-events-none absolute inset-x-6 top-6 z-30 flex items-center justify-between gap-4 sm:inset-x-12 sm:top-7"
          style={{ opacity: 'var(--hud-o, 1)' }}
        >
          <a
            href="#origin"
            className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-hairline bg-charcoal-950/90 px-3.5 py-1.5 transition-colors duration-200 ease-loot hover:border-signal"
          >
            <BrandMark className="size-4 text-alabaster-50" />
            <span className="font-display tracking-wordmark text-data font-bold uppercase text-ink-primary">
              LOOT
            </span>
          </a>

          <div className="pointer-events-auto flex items-center gap-6">
            <span className="hidden text-micro text-ink-muted md:inline">
              {HERO.editionYear} / {HERO.editionTag}
            </span>
            <ActionLink href="#claim" variant="ghost" className="px-4 py-1.5 text-micro sm:text-data">
              <span>{HERO.topCta}</span>
              <ArrowUpRight className="size-3.5 text-signal" />
            </ActionLink>
          </div>
        </header>

        {/* Top-Center Live Chip Execution Telemetry */}
        <div
          className="pointer-events-none absolute inset-x-0 top-6 z-20 mx-auto flex max-w-md flex-col items-center px-6 sm:top-8"
          style={{ opacity: 'var(--dive-hud-o, 0)' }}
        >
          <div className="flex w-full items-baseline justify-between text-micro">
            <span className="text-ink-muted">EAL6+ offline sort</span>
            <span className="ms-counter tabular text-title text-signal" />
            <span className="text-ink-muted">4 pockets</span>
          </div>
          <div className="mt-2 h-0.5 w-full overflow-hidden bg-alabaster-50/15">
            <div
              className="h-full origin-left bg-signal"
              style={{ transform: 'scaleX(var(--split-exp, 0))' }}
            />
          </div>
        </div>

        {/* Hero Bottom Negative-Space Bio, Scroll Cue & CTA */}
        <div
          className="pointer-events-none absolute inset-x-6 bottom-6 z-30 sm:inset-x-12 sm:bottom-8"
          style={{ opacity: 'var(--hud-o, 1)', transform: 'translate3d(0, var(--hud-y, 0rem), 0)' }}
        >
          <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="max-w-md text-body-sm text-ink-secondary">{HERO.hudSupport}</p>
              <p className="mt-2 text-micro text-ink-muted">{HERO.specBadge}</p>
            </div>

            <div className="hidden text-center md:col-span-2 md:block">
              <span className="text-micro text-ink-muted">{HERO.exploreCta}</span>
            </div>

            <div className="pointer-events-auto flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end">
              <ActionLink href="#claim">
                <span>{HERO.cta}</span>
                <ArrowUpRight className="size-3.5" />
              </ActionLink>
              <button
                type="button"
                onClick={() => scrollToChapter('anatomy')}
                className={actionClass('ghost')}
              >
                <span>Four pockets</span>
                <ArrowDown className="size-3.5 text-signal" />
              </button>
            </div>
          </div>
        </div>

        {/* Quadrant-Anchored Dive Statements */}
        {HERO.diveFrames.map((frame, index) => (
          <div
            key={frame.code}
            className={`pointer-events-none absolute z-20 mx-auto flex max-w-7xl ${QUADRANT_POSITIONS[index] ?? QUADRANT_POSITIONS[0]}`}
            style={{
              opacity: FRAME_VARS[index],
              transform: `translate3d(0, calc((1 - ${FRAME_VARS[index]}) * 1.15rem), 0)`,
            }}
          >
            <div className="max-w-2xl">
              <p className="text-micro text-ink-secondary">
                <span className="tabular text-signal">{frame.code}</span>
                <span className="mx-2 text-ink-muted">/</span>
                <span>{frame.tag}</span>
              </p>
              <p className="mt-2 text-display-md text-balance text-ink-primary">{frame.headline}</p>
            </div>
          </div>
        ))}

        {/* Alabaster Vanishing-Point Light Exit into Section 2 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-40 bg-alabaster-50"
          style={{ opacity: 'var(--exit-light, 0)' }}
        />
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
