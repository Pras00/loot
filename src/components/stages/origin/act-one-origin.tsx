'use client';

import { useRef, useState, type PointerEvent } from 'react';

import { LootCard } from '@/components/card/loot-card';
import { BrandMark } from '@/components/chrome/brand-mark';
import { actionClass, ActionLink } from '@/components/ui/action';
import { HERO } from '@/lib/content/copy';
import { scrollToChapter } from '@/lib/scroll/engine';
import { clamp } from '@/lib/scroll/math';
import { useStage } from '@/lib/scroll/use-stage';

import { originChoreography } from './choreography';

const TUNNEL_RINGS = [
  { scale: 1.55, rot: 0, wireframe: false, opacity: 0.92 },
  { scale: 1.22, rot: -15, wireframe: true, opacity: 0.78 },
  { scale: 0.94, rot: -30, wireframe: true, opacity: 0.68 },
  { scale: 0.72, rot: -45, wireframe: false, opacity: 0.58 },
  { scale: 0.54, rot: -60, wireframe: true, opacity: 0.48 },
  { scale: 0.38, rot: -75, wireframe: true, opacity: 0.38 },
] as const;

const FRAME_VARS = [
  'var(--frame-0)',
  'var(--frame-1)',
  'var(--frame-2)',
  'var(--frame-3)',
] as const;

/**
 * Section 1 — Hero & The Dimensional Dive (`000° -> 145°`).
 *
 * Starts with the 23.6° diagonal slash hero (whole LOOT card in the center,
 * scrubbable 0%–100% from far-left edge to far-right edge). As the user scrolls,
 * the camera flies through a rotating 3D/wireframe tunnel of the LOOT emblem
 * while four gigantic `Archivo 300` statements sequence in the bottom-left.
 */
export function ActOneOrigin() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useStage(sectionRef, originChoreography);

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

  // Signature 23.6° angle offset across the viewport height, unclamped so 0%..100% sweeps edge-to-edge.
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

        {/* 3D & Blueprint Wireframe Tunnel (Rotates 00° -> 145° and zooms on scroll) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ opacity: 'var(--tunnel-o, 1)' }}
        >
          <div
            className="relative flex size-96 items-center justify-center sm:size-136"
            style={{
              transform: 'scale(var(--tunnel-s, 1)) rotate(var(--tunnel-r, 0deg))',
            }}
          >
            {TUNNEL_RINGS.map((ring, idx) => (
              <svg
                key={ring.scale}
                viewBox="-220 -320 440 640"
                className="absolute inset-0 size-full overflow-visible"
                style={{
                  transform: `scale(${ring.scale}) rotate(${ring.rot}deg)`,
                  opacity: ring.opacity,
                }}
              >
                {/* Left half of the monumental double-loop LOOT sculpture */}
                <path
                  d="M -24 -250 L -150 -160 L -150 -20 L -45 -20 L -150 65 L -150 220 L -24 140 L -24 25 L -95 -20 L -24 -85 Z"
                  fill={ring.wireframe ? 'none' : 'var(--color-alabaster-50)'}
                  fillOpacity={ring.wireframe ? 0 : idx === 0 ? 0.92 : 0.14}
                  stroke={
                    idx % 2 === 0 ? 'var(--color-alabaster-50)' : 'var(--color-ultraviolet-500)'
                  }
                  strokeOpacity={ring.wireframe ? 0.55 : 0.85}
                  strokeWidth={ring.wireframe ? 1.2 : 1.8}
                  vectorEffect="non-scaling-stroke"
                />
                {/* Right half mirrored across the 23.6° slash */}
                <path
                  d="M 24 250 L 150 160 L 150 20 L 45 20 L 150 -65 L 150 -220 L 24 -140 L 24 -25 L 95 20 L 24 85 Z"
                  fill={ring.wireframe ? 'none' : 'var(--color-alabaster-50)'}
                  fillOpacity={ring.wireframe ? 0 : idx === 0 ? 0.88 : 0.12}
                  stroke={idx === 1 ? 'var(--color-signal-400)' : 'var(--color-alabaster-50)'}
                  strokeOpacity={ring.wireframe ? 0.55 : 0.85}
                  strokeWidth={ring.wireframe ? 1.2 : 1.8}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            ))}

            {/* Central Vanishing-Point Glow inside the tunnel */}
            <div
              className="size-28 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, var(--color-alabaster-50) 0%, color-mix(in oklab, var(--color-ultraviolet-500) 45%, transparent) 55%, transparent 75%)',
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
          style={{ opacity: 'var(--hud-o)' }}
        >
          {/* Lower-Right Blueprint Dimension (with vertical architectural columns & 236 ruler) */}
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

            {/* Architectural Dimension Ruler on the right above CTA (like `236` in dennypratama.com) */}
            <div className="absolute bottom-24 right-16 hidden flex-col items-center md:flex">
              <span className="h-px w-3 bg-signal" />
              <span className="h-28 w-px bg-signal/60" />
              <span className="my-1.5 tabular text-micro text-signal">23.6°</span>
              <span className="h-12 w-px bg-signal/60" />
              <span className="h-px w-3 bg-signal" />
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

          {/* Draggable Scrub Handle + Brand Circle on the 23.6° line */}
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
            <span aria-hidden className="size-2 rounded-full bg-signal" />
            <span>Scrub</span>
          </button>
        </div>

        {/* Whole, Uncut Centerpiece LOOT Card at rest (scales forward as dive begins) */}
        <div
          className="perspective-distant pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6"
          style={{
            opacity: 'var(--card-o)',
            transform: 'scale(var(--card-s))',
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

        {/* Hero Bottom Negative-Space Bio & CTA */}
        <div
          className="pointer-events-none absolute inset-x-6 bottom-6 z-30 sm:inset-x-12 sm:bottom-8"
          style={{ opacity: 'var(--hud-o)', transform: 'translate3d(0, var(--hud-y), 0)' }}
        >
          <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="max-w-md text-body-sm text-ink-secondary">{HERO.hudSupport}</p>
              <p className="mt-2 text-micro text-ink-muted">{HERO.specBadge}</p>
            </div>

            <div className="pointer-events-auto flex flex-wrap items-center gap-3 md:col-span-5 md:col-start-8 md:justify-end">
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

        {/* 4 Sequential Gigantic Dive Statements (01..04) during the Tunnel Flight */}
        <div className="pointer-events-none absolute inset-x-6 bottom-24 z-20 mx-auto max-w-7xl sm:inset-x-12 sm:bottom-28">
          {HERO.diveFrames.map((frame, index) => (
            <div
              key={frame.code}
              className="max-w-3xl"
              style={{
                opacity: FRAME_VARS[index],
                transform: `translate3d(0, calc((1 - ${FRAME_VARS[index]}) * 1.25rem), 0)`,
                position: index === 0 ? 'relative' : 'absolute',
                inset: index === 0 ? undefined : 'auto auto 0 0',
              }}
            >
              <p className="text-micro text-ink-secondary">
                <span className="tabular text-signal">{frame.code}</span>
                <span className="mx-2 text-ink-muted">/</span>
                <span>{frame.tag}</span>
              </p>
              <p className="mt-2 text-display-md text-balance text-ink-primary">{frame.headline}</p>
            </div>
          ))}
        </div>

        {/* Bottom-Center Live Degree Counter (`00° -> 145°`, identical to dennypratama.com) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex flex-col items-center text-center sm:bottom-8"
          style={{ opacity: 'var(--tunnel-o, 1)' }}
        >
          <span className="deg-counter tabular text-display-md text-signal" />
          <span className="mt-1 text-micro text-ink-muted">{HERO.exploreCta}</span>
        </div>

        {/* White/Alabaster Vanishing-Point Light Exit into Section 2 */}
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
