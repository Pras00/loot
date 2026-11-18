'use client';

import { useRef, useState } from 'react';

import { ANATOMY } from '@/lib/content/copy';
import { useStage } from '@/lib/scroll/use-stage';

import { anatomyChoreography } from './choreography';
import { LayerStack, type AnatomyLayerId } from './layer-stack';

interface LayerBenefitMeta {
  readonly badge: string;
  readonly summary: string;
  readonly highlights: readonly [string, string];
}

const LAYER_BENEFITS: Readonly<Record<AnatomyLayerId, LayerBenefitMeta>> = {
  shell: {
    badge: 'Top layer',
    summary: '0.78 mm thin, 6.1 g',
    highlights: ['Single-piece metal build', 'Scratch-resistant finish'],
  },
  core: {
    badge: 'Middle layer',
    summary: 'Approves in 0.4 seconds',
    highlights: ['Works without internet', '1-tap freeze in the app'],
  },
  engine: {
    badge: 'Bottom layer',
    summary: 'Holds up to 6 pockets',
    highlights: ['Sorts money on the spot', 'Exact to the last rupiah'],
  },
};

const LEADER_PATHS = [
  { d: 'M 8 88 H 72 L 104 60 H 152', cy1: 88, cy2: 60 },
  { d: 'M 8 180 H 152', cy1: 180, cy2: 180 },
  { d: 'M 8 272 H 72 L 104 300 H 152', cy1: 272, cy2: 300 },
] as const;

const LINE_VARS = ['var(--line-0)', 'var(--line-1)', 'var(--line-2)'] as const;

const EVERYDAY_BENEFITS = [
  { title: 'Works in subways & flights', detail: 'No mobile data or Wi-Fi required to pay and split' },
  { title: 'Never needs charging', detail: 'Powered wirelessly the moment it touches a payment reader' },
  { title: 'Protected if lost', detail: 'Freeze or replace your card anytime from the LOOT app' },
] as const;

export function ActTwoAnatomy() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useStage(sectionRef, anatomyChoreography);
  const [activeLayer, setActiveLayer] = useState<AnatomyLayerId | null>('core');

  const toggleLayer = (id: AnatomyLayerId): void => {
    setActiveLayer((current) => (current === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      id="anatomy"
      aria-labelledby="anatomy-title"
      className="runway-anatomy overlap-stage room-dark pointer-events-none relative z-20"
    >
      <div className="sticky top-0 h-svh overflow-hidden" style={{ opacity: 'var(--stage-o, 0)' }}>
        <div
          className="pointer-events-auto relative h-full w-full bg-canvas"
          style={{
            clipPath: 'inset(calc((1 - var(--curtain, 0)) * 100%) 0 0 0)',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: 'var(--violet)',
              background:
                'radial-gradient(52% 54% at 28% 58%, color-mix(in oklab, var(--color-ultraviolet-500) 30%, transparent), transparent 72%)',
            }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between px-5 pb-5 pt-14 md:hidden">
            <header
              style={{
                opacity: 'var(--type-o)',
                transform: 'translate3d(0, var(--type-y), 0)',
              }}
            >
              <span className="inline-block rounded-full bg-signal px-3 py-0.5 text-micro font-semibold text-ink">
                Inside the card
              </span>
              <h2 className="mt-2 text-title text-balance">{ANATOMY.title}</h2>
              <p className="mt-1 text-micro text-ink-secondary">{ANATOMY.lead}</p>
            </header>

            <div className="my-auto flex items-center justify-center py-6">
              <div className="w-44">
                <LayerStack activeLayer={activeLayer} />
              </div>
            </div>

            <ol className="space-y-2">
              {ANATOMY.layers.map((layer, index) => {
                const isSelected = activeLayer === layer.id;
                const meta = LAYER_BENEFITS[layer.id];
                return (
                  <li
                    key={layer.id}
                    style={{
                      opacity: LINE_VARS[index],
                      transform: `translate3d(0, calc((1 - ${LINE_VARS[index]}) * 0.5rem), 0)`,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleLayer(layer.id)}
                      aria-pressed={isSelected}
                      className={`w-full rounded-card border px-3.5 py-2.5 text-left transition-colors duration-200 ease-loot ${
                        isSelected
                          ? 'border-signal bg-charcoal-900'
                          : 'border-hairline bg-charcoal-950/85'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-body-sm font-semibold text-ink-primary">
                          {layer.name}
                        </span>
                        <span className="text-micro font-medium text-signal">
                          {meta.summary}
                        </span>
                      </div>
                      <p className="mt-0.5 text-micro text-ink-secondary">{layer.detail}</p>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative z-10 mx-auto hidden h-full max-w-6xl flex-col justify-between px-10 pb-7 pt-8 md:flex">
            <header
              className="grid grid-cols-12 items-end gap-8 border-b border-hairline pb-4"
              style={{
                opacity: 'var(--type-o)',
                transform: 'translate3d(0, var(--type-y), 0)',
              }}
            >
              <div className="col-span-7">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-signal px-3 py-0.5 text-micro font-semibold text-ink">
                    Inside the card
                  </span>
                  <span className="text-micro font-medium text-ink-secondary">
                    Why your rules live on the card, not just in an app
                  </span>
                </div>
                <h2 id="anatomy-title" className="mt-2.5 text-display-md text-balance">
                  {ANATOMY.title}
                </h2>
              </div>

              <div className="col-span-5">
                <p className="text-body-sm text-ink-secondary">{ANATOMY.lead}</p>
              </div>
            </header>

            <div className="my-auto grid grid-cols-12 items-center py-2">
              <div className="col-span-5">
                <div className="relative rounded-panel border border-ultraviolet-500/30 bg-charcoal-950/65 px-6 pb-8 pt-14">
                  <div className="absolute inset-x-5 top-4 flex items-center justify-between text-micro text-ink-secondary">
                    <span>3 layers in 0.78 mm</span>
                    <span className="font-medium text-signal">
                      {activeLayer === null ? 'Showing all layers' : 'Layer highlighted'}
                    </span>
                  </div>

                  <div className="mx-auto w-full max-w-xs lg:max-w-sm">
                    <LayerStack activeLayer={activeLayer} />
                  </div>

                  <div
                    className="mt-10 flex items-center justify-between border-t border-hairline pt-3 text-micro text-ink-secondary"
                    style={{ opacity: 'var(--labels-o)' }}
                  >
                    <span>Standard wallet size</span>
                    <span className="font-medium text-signal">Click any card on the right to inspect</span>
                  </div>
                </div>
              </div>

              <div className="col-span-2 relative h-80">
                <svg
                  viewBox="0 0 160 360"
                  className="pointer-events-none size-full"
                  fill="none"
                  aria-hidden="true"
                >
                  {LEADER_PATHS.map((path, index) => {
                    const layer = ANATOMY.layers[index];
                    const isSelected = layer !== undefined && activeLayer === layer.id;
                    return (
                      <g key={path.d} style={{ opacity: LINE_VARS[index] }}>
                        <path
                          d={path.d}
                          stroke="var(--color-ultraviolet-500)"
                          strokeOpacity={0.28}
                          strokeWidth={1.25}
                        />
                        <path
                          d={path.d}
                          stroke={
                            isSelected ? 'var(--color-signal-400)' : 'var(--color-ultraviolet-500)'
                          }
                          strokeOpacity={isSelected ? 1 : 0.75}
                          strokeWidth={isSelected ? 2 : 1.5}
                          pathLength={1}
                          strokeDasharray={1}
                          style={{ strokeDashoffset: `calc(1 - ${LINE_VARS[index]})` }}
                        />
                        <circle
                          cx={8}
                          cy={path.cy1}
                          r={3.5}
                          fill={
                            isSelected ? 'var(--color-signal-400)' : 'var(--color-ultraviolet-500)'
                          }
                        />
                        <circle
                          cx={152}
                          cy={path.cy2}
                          r={3.5}
                          fill={
                            isSelected ? 'var(--color-signal-400)' : 'var(--color-ultraviolet-500)'
                          }
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="col-span-5">
                <ol className="space-y-3">
                  {ANATOMY.layers.map((layer, index) => {
                    const isSelected = activeLayer === layer.id;
                    const meta = LAYER_BENEFITS[layer.id];
                    return (
                      <li
                        key={layer.id}
                        style={{
                          opacity: LINE_VARS[index],
                          transform: `translate3d(calc((1 - ${LINE_VARS[index]}) * 1rem), 0, 0)`,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => toggleLayer(layer.id)}
                          aria-pressed={isSelected}
                          className={`group relative w-full rounded-card border p-4 text-left transition-colors duration-200 ease-loot ${
                            isSelected
                              ? 'border-signal bg-charcoal-900 shadow-paper'
                              : 'border-ultraviolet-500/30 bg-charcoal-950/85 hover:border-ultraviolet-500'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-micro font-semibold ${
                                isSelected
                                  ? 'bg-signal text-ink'
                                  : 'bg-ultraviolet-900 text-alabaster-50 ring-1 ring-ultraviolet-500/40'
                              }`}
                            >
                              {meta.badge}
                            </span>
                            <span className="text-micro font-semibold text-signal">
                              {meta.summary}
                            </span>
                          </div>

                          <h3 className="mt-2 text-body font-semibold text-ink-primary">
                            {layer.name}
                          </h3>
                          <p className="mt-1 text-micro text-ink-secondary">{layer.detail}</p>

                          <div className="mt-3 flex flex-wrap gap-2 border-t border-hairline pt-2.5">
                            {meta.highlights.map((item) => (
                              <span
                                key={item}
                                className="rounded-full bg-charcoal-800 px-2.5 py-0.5 text-micro text-ink-secondary"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            <dl
              className="grid grid-cols-3 gap-6 border-t border-hairline pt-3.5"
              style={{ opacity: 'var(--labels-o)' }}
            >
              {EVERYDAY_BENEFITS.map((item, index) => (
                <div
                  key={item.title}
                  className="border-r border-hairline pr-4 last:border-r-0 last:pr-0"
                >
                  <dt
                    className={`text-micro font-semibold ${
                      index === 0 ? 'text-signal' : 'text-ink-primary'
                    }`}
                  >
                    {item.title}
                  </dt>
                  <dd className="mt-0.5 text-micro text-ink-secondary">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
