'use client';

import { useRef } from 'react';

import { LootCard } from '@/components/card/loot-card';
import { FLOW } from '@/lib/content/copy';
import { useStage } from '@/lib/scroll/use-stage';

import { flowChoreography } from './choreography';

const CONSTRUCTION_STEPS = [
  {
    idx: '01',
    title: 'One angle, 23.6°',
    body: 'Every proportion on the card turns on a single 23.6° geometric axis.',
    varName: 'var(--step-0)',
  },
  {
    idx: '02',
    title: 'Woven into four pockets',
    body: 'Fine internal pathways connect your single tap to four isolated pocket registers.',
    varName: 'var(--step-1)',
  },
  {
    idx: '03',
    title: 'Drawn, then milled in metal',
    body: 'The lines solidify into 6.1 grams of 0.78 mm anodized aluminium that works offline.',
    varName: 'var(--step-2)',
  },
] as const;

const THREAD_Y_OFFSETS = [-110, -75, -40, 0, 40, 75, 110] as const;

/**
 * Section 3 — "The card, constructed." (`dennypratama.com` Section 3 style:
 * geometric construction threads, 23.6° datum lines, and vertex callouts weave
 * together on scroll and solidify into the finished LOOT card).
 */
export function ActThreeFlow() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useStage(sectionRef, flowChoreography);

  return (
    <section
      ref={sectionRef}
      id="flow"
      aria-labelledby="flow-title"
      className="runway-flow overlap-stage room-light pointer-events-none relative z-30"
    >
      <div className="sticky top-0 h-svh overflow-hidden" style={{ opacity: 'var(--stage-o, 0)' }}>
        <div
          className="pointer-events-auto relative h-full w-full bg-alabaster-100"
          style={{
            clipPath: 'inset(calc((1 - var(--reveal, 0)) * 100%) 0 0 0)',
          }}
        >
          <div aria-hidden className="blueprint pointer-events-none absolute inset-0 opacity-45" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 pb-8 pt-10 sm:px-12 sm:pb-10 sm:pt-12">
            {/* Top Editorial Header */}
            <header
              className="grid grid-cols-1 items-end gap-6 md:grid-cols-12 md:gap-8"
              style={{ opacity: 'var(--type-o)' }}
            >
              <div className="md:col-span-7">
                <h2 id="flow-title" className="text-display-lg text-ink-primary">
                  {FLOW.title}
                </h2>
              </div>
              <div className="md:col-span-5">
                <p className="text-body-sm text-ink-secondary">{FLOW.lead}</p>
              </div>
            </header>

            {/* Center Geometric Thread Construction & Solidification Stage */}
            <div className="relative my-auto flex items-center justify-center py-4">
              <div className="relative flex w-full max-w-4xl items-center justify-center">
                <svg
                  viewBox="0 0 880 420"
                  className="w-full overflow-visible text-ink"
                  fill="none"
                  aria-hidden="true"
                >
                  {/* Phase 1: Architectural Construction Axes & 23.6° Slash Guides */}
                  <g style={{ opacity: 'var(--grid-d)' }}>
                    <line
                      x1="60"
                      y1="210"
                      x2="820"
                      y2="210"
                      stroke="currentColor"
                      strokeOpacity={0.18}
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="440"
                      y1="20"
                      x2="440"
                      y2="400"
                      stroke="currentColor"
                      strokeOpacity={0.18}
                      strokeDasharray="4 4"
                    />
                    {/* 23.6° Diagonal Construction Axis */}
                    <line
                      x1="348"
                      y1="400"
                      x2="532"
                      y2="20"
                      stroke="var(--color-ultraviolet-500)"
                      strokeOpacity={0.75}
                      strokeWidth={1.25}
                      pathLength={1}
                      strokeDasharray={1}
                      style={{ strokeDashoffset: 'calc(1 - var(--grid-d))' }}
                    />
                    <circle
                      cx="440"
                      cy="210"
                      r="156"
                      stroke="currentColor"
                      strokeOpacity={0.16}
                      pathLength={1}
                      strokeDasharray={1}
                      style={{ strokeDashoffset: 'calc(1 - var(--grid-d))' }}
                    />
                    <text x="542" y="42" fill="var(--color-ultraviolet-600)" fontSize="12">
                      23.6° axis
                    </text>
                    <text x="642" y="96" fill="currentColor" fillOpacity={0.5} fontSize="12">
                      85.60 × 53.98 mm
                    </text>
                    <text x="150" y="346" fill="currentColor" fillOpacity={0.5} fontSize="12">
                      r = 3.18 mm
                    </text>
                  </g>

                  {/* Phase 2: Converging Curved Threads Weaving the Card & Double-Loop Emblem */}
                  {THREAD_Y_OFFSETS.map((offset, index) => {
                    const startY = 210 + offset * 1.45;
                    const midY = 210 + offset * 0.35;
                    const endY = 210 - offset * 1.45;
                    const isAccent = index === 2 || index === 4;
                    return (
                      <path
                        key={offset}
                        d={`M 40 ${startY} C 230 ${startY}, 310 ${midY}, 440 210 C 570 ${midY}, 650 ${endY}, 840 ${endY}`}
                        stroke={
                          isAccent
                            ? 'var(--color-ultraviolet-500)'
                            : index === 3
                              ? 'var(--color-signal-600)'
                              : 'currentColor'
                        }
                        strokeOpacity={isAccent || index === 3 ? 0.65 : 0.22}
                        strokeWidth={index === 3 ? 1.8 : 1.1}
                        pathLength={1}
                        strokeDasharray={1}
                        style={{ strokeDashoffset: 'calc(1 - var(--threads-d))' }}
                      />
                    );
                  })}

                  {/* Phase 2B: Wireframe Card Outline & Central Double-Loop 8 Geometry */}
                  <rect
                    x="220"
                    y="72"
                    width="440"
                    height="276"
                    rx="22"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    pathLength={1}
                    strokeDasharray={1}
                    style={{ strokeDashoffset: 'calc(1 - var(--outline-d))' }}
                  />
                  <rect
                    x="404"
                    y="128"
                    width="72"
                    height="76"
                    rx="26"
                    stroke="var(--color-ultraviolet-500)"
                    strokeWidth={2}
                    pathLength={1}
                    strokeDasharray={1}
                    style={{ strokeDashoffset: 'calc(1 - var(--outline-d))' }}
                  />
                  <rect
                    x="404"
                    y="216"
                    width="72"
                    height="76"
                    rx="26"
                    stroke="currentColor"
                    strokeWidth={2}
                    pathLength={1}
                    strokeDasharray={1}
                    style={{ strokeDashoffset: 'calc(1 - var(--outline-d))' }}
                  />
                </svg>

                {/* Phase 3: Solidified Finished Metal Card ("The lines become a solid") */}
                <div
                  className="pointer-events-none absolute w-64 sm:w-88 lg:w-100"
                  style={{
                    opacity: 'var(--solid-o)',
                    transform: 'scale(calc(0.92 + var(--solid-o, 0) * 0.08))',
                  }}
                >
                  <LootCard edition="stealth" />
                </div>
              </div>
            </div>

            {/* Bottom 3-Column Progress Bar (dennypratama.com construction progress style) */}
            <ol className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
              {CONSTRUCTION_STEPS.map((step) => (
                <li key={step.idx}>
                  <div className="h-0.5 w-full bg-ink/12">
                    <div
                      className="h-full origin-left bg-ultraviolet-500"
                      style={{ transform: `scaleX(${step.varName})` }}
                    />
                  </div>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="tabular text-micro text-ink-muted">
                      <span>{step.idx}</span>
                      <span className="mx-1">/</span>
                      <span>03</span>
                    </span>
                    <h3 className="text-body font-medium text-ink-primary">{step.title}</h3>
                  </div>
                  <p className="mt-1 hidden text-micro text-ink-secondary sm:block">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
