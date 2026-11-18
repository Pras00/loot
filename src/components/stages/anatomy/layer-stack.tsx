import type { ReactNode } from 'react';

import { LootCard } from '@/components/card/loot-card';
import { VAULT_RULES } from '@/lib/treasury/rules';

export type AnatomyLayerId = 'shell' | 'core' | 'engine';

interface LayerStackProps {
  readonly activeLayer?: AnatomyLayerId | null;
}

/**
 * The card, exploded into its three physical layers: solid aluminium body,
 * offline security chip, and built-in pocket memory.
 */
export function LayerStack({ activeLayer = null }: LayerStackProps) {
  const plateOpacity = (id: AnatomyLayerId): number =>
    activeLayer === null || activeLayer === id ? 1 : 0.38;

  return (
    <div className="perspective-distant w-full">
      <div
        className="card-face relative mx-auto w-full"
        style={{
          transformStyle: 'preserve-3d',
          transform:
            'translate3d(0, var(--scene-y), 0) scale(var(--scene-s)) rotateX(var(--ax)) rotateZ(var(--az))',
        }}
      >
        <Plate
          z="0px"
          opacity={plateOpacity('engine')}
          highlighted={activeLayer === 'engine'}
          className="bg-charcoal-950 ring-1 ring-ultraviolet-500/45"
          label="Built-in pocket memory"
        >
          <svg
            viewBox="0 0 340 214"
            className="pointer-events-none absolute inset-0 size-full text-ultraviolet-500"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M36 42 H132 L156 66 H254"
              stroke="currentColor"
              strokeOpacity={0.4}
              strokeWidth={1.2}
            />
            <path
              d="M36 62 H118 L142 86 H286"
              stroke="var(--color-signal-400)"
              strokeOpacity={0.5}
              strokeWidth={1.2}
            />
            <path
              d="M208 168 H292 L310 150 V52"
              stroke="currentColor"
              strokeOpacity={0.4}
              strokeWidth={1.2}
            />
            <rect
              x="252"
              y="118"
              width="52"
              height="52"
              stroke="currentColor"
              strokeOpacity={0.6}
              strokeWidth={1.2}
            />
            <rect
              x="266"
              y="132"
              width="24"
              height="24"
              fill="var(--color-signal-400)"
              fillOpacity={0.85}
            />
          </svg>

          <div className="relative flex h-full flex-col justify-between p-5">
            <div className="flex items-center justify-between text-micro text-alabaster-50/80">
              <span>Built-in pocket memory</span>
              <span className="rounded-full bg-signal px-2.5 py-0.5 font-semibold text-ink">
                4 pockets
              </span>
            </div>

            <div className="flex items-end gap-3">
              {VAULT_RULES.map((rule, index) => (
                <div key={rule.id} className="flex flex-col items-start gap-1">
                  <span className="tabular text-micro font-medium text-alabaster-50/85">
                    {rule.sharePct}%
                  </span>
                  <span
                    className={`block w-5 rounded-full ${
                      index === 1 ? 'bg-signal' : 'bg-ultraviolet-500'
                    }`}
                    style={{ height: `calc(${rule.sharePct} * 1.35px)` }}
                  />
                  <span className="text-micro text-alabaster-50/65">{rule.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Plate>

        <Plate
          z="var(--z-core)"
          opacity={plateOpacity('core')}
          highlighted={activeLayer === 'core'}
          className="bg-ultraviolet-900/95 ring-1 ring-ultraviolet-500/70"
          label="Offline security chip"
        >
          <svg
            viewBox="0 0 340 214"
            className="pointer-events-none absolute inset-0 size-full text-ultraviolet-500"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="16"
              y="16"
              width="308"
              height="182"
              rx="10"
              stroke="currentColor"
              strokeOpacity={0.4}
              strokeWidth={1}
            />
            <rect
              x="26"
              y="26"
              width="288"
              height="162"
              rx="8"
              stroke="currentColor"
              strokeOpacity={0.55}
              strokeWidth={1}
            />
            <rect
              x="36"
              y="36"
              width="268"
              height="142"
              rx="6"
              stroke="var(--color-signal-400)"
              strokeOpacity={0.5}
              strokeWidth={1}
            />
            <path
              d="M170 52 V82 M170 132 V162 M108 107 H144 M196 107 H232"
              stroke="var(--color-signal-400)"
              strokeOpacity={0.75}
              strokeWidth={1.25}
            />
            <rect
              x="144"
              y="81"
              width="52"
              height="52"
              stroke="var(--color-signal-400)"
              strokeOpacity={0.9}
              strokeWidth={1.5}
            />
            <rect x="157" y="94" width="26" height="26" fill="var(--color-signal-400)" />
          </svg>
          <div className="relative flex h-full items-end justify-between p-5 text-micro text-alabaster-50">
            <span>Offline security chip</span>
            <span className="font-semibold text-signal">Approves in 0.4 s</span>
          </div>
        </Plate>

        <Plate
          z="var(--z-shell)"
          opacity={plateOpacity('shell')}
          highlighted={activeLayer === 'shell'}
          className="ring-1 ring-alabaster-50/30"
          label="Solid aluminium body"
        >
          <LootCard edition="stealth" className="h-full w-full" />
        </Plate>
      </div>
    </div>
  );
}

interface PlateProps {
  readonly z: string;
  readonly label: string;
  readonly opacity: number;
  readonly highlighted: boolean;
  readonly className: string;
  readonly children: ReactNode;
}

function Plate({ z, label, opacity, highlighted, className, children }: PlateProps) {
  return (
    <div
      aria-label={label}
      role="group"
      className={`card-face absolute inset-0 overflow-hidden rounded-card text-alabaster-50 transition-opacity duration-300 ${className} ${
        highlighted ? 'ring-2 ring-signal' : ''
      }`}
      style={{
        opacity,
        transform: `translateZ(${z})`,
        boxShadow:
          'inset 0 1px 0 rgb(255 255 255 / 0.12), 0 28px 56px -34px rgb(0 0 0 / calc(0.45 + var(--plate-shadow) * 0.55))',
      }}
    >
      {children}
    </div>
  );
}
