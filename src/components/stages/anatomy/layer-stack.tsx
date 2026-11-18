'use client';

import { useRef, type PointerEvent } from 'react';

import { LootCard } from '@/components/card/loot-card';
import { clamp } from '@/lib/scroll/math';
import { VAULT_RULES } from '@/lib/treasury/rules';

export type AnatomyLayerId = 'shell' | 'core' | 'engine';

const ZONE_LIST = [
  { id: 'shell', x: '76%', y: '28%' },
  { id: 'core', x: '24%', y: '50%' },
  { id: 'engine', x: '66%', y: '68%' },
] as const;

const ZONE_COORDS: Readonly<Record<AnatomyLayerId, { readonly x: string; readonly y: string }>> = {
  shell: ZONE_LIST[0],
  core: ZONE_LIST[1],
  engine: ZONE_LIST[2],
};

interface CardScannerProps {
  readonly activeLayer: AnatomyLayerId | null;
  readonly pointerActive: boolean;
  readonly onHoverZone: (id: AnatomyLayerId | null) => void;
}

/**
 * Optical hover X-Ray scanner (`dennypratama.com` reference). Moving the cursor
 * over the card steers a circular optical lens revealing the peaceful internal
 * pocket architecture — aluminium shell, offline security chip, and 4 pockets —
 * without mechanical PCB graphics.
 */
export function LayerStack({ activeLayer, pointerActive, onHoverZone }: CardScannerProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    const el = stageRef.current;
    if (el === null) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 12, 88);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 14, 86);
    el.style.setProperty('--scan-x', `${x.toFixed(1)}%`);
    el.style.setProperty('--scan-y', `${y.toFixed(1)}%`);
  };

  const targetCoords = activeLayer !== null ? ZONE_COORDS[activeLayer] : null;
  const lensX = pointerActive
    ? 'var(--scan-x, 50%)'
    : (targetCoords?.x ?? 'var(--scan-auto-x, 45%)');
  const lensY = pointerActive
    ? 'var(--scan-y, 50%)'
    : (targetCoords?.y ?? 'var(--scan-auto-y, 50%)');

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => onHoverZone(null)}
      className="card-face relative mx-auto w-full cursor-crosshair select-none"
      style={{
        opacity: 'var(--card-enter, 1)',
        transform: 'translate3d(0, calc((1 - var(--card-enter, 1)) * 1rem), 0)',
      }}
    >
      {/* Exterior Matte Metal Card */}
      <LootCard edition="stealth" className="h-full w-full" />

      {/* Circular Optical X-Ray Blueprint Lens */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-card border border-signal/70 bg-ultraviolet-900"
        style={{
          /* Blueprint §2 exception #1: circular optical iris lens following pointer or active zone */
          clipPath: `circle(29% at ${lensX} ${lensY})`,
          transition: pointerActive ? 'none' : 'clip-path 380ms var(--ease-loot)',
        }}
      >
        <div
          className="blueprint absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to right, color-mix(in oklab, var(--color-signal-400) 22%, transparent) 0 1px, transparent 1px 1.5rem), repeating-linear-gradient(to bottom, color-mix(in oklab, var(--color-signal-400) 22%, transparent) 0 1px, transparent 1px 1.5rem)',
          }}
        />

        {/* Smooth architectural interior lines (non-mechanical curves & clean zones) */}
        <svg viewBox="0 0 340 214" fill="none" className="absolute inset-0 size-full">
          <rect
            x="16"
            y="16"
            width="308"
            height="182"
            rx="12"
            stroke="var(--color-alabaster-50)"
            strokeOpacity={0.28}
            strokeWidth={1}
          />
          <rect
            x="40"
            y="84"
            width="42"
            height="32"
            rx="5"
            stroke="var(--color-signal-400)"
            strokeWidth={1.25}
          />
          <circle
            cx="61"
            cy="100"
            r="26"
            stroke="var(--color-ultraviolet-500)"
            strokeOpacity={0.65}
            strokeDasharray="3 3"
            strokeWidth={1}
          />
          <path
            d="M82 100 C 145 100, 155 62, 224 62"
            stroke="var(--color-signal-400)"
            strokeOpacity={0.8}
            strokeWidth={1.25}
          />
          <path
            d="M82 100 C 145 100, 155 152, 224 152"
            stroke="var(--color-ultraviolet-500)"
            strokeOpacity={0.85}
            strokeWidth={1.25}
          />
        </svg>

        <div className="relative flex h-full flex-col justify-between p-5 text-alabaster-50">
          <div className="flex items-center justify-between text-micro">
            <span className="font-medium text-signal">Internal X-ray view</span>
            <span className="text-alabaster-50/75">0.78 mm aluminium</span>
          </div>

          <div className="ml-auto w-1/2 space-y-1 text-micro">
            {VAULT_RULES.map((rule) => (
              <div key={rule.id} className="flex items-baseline justify-between gap-2">
                <span className="text-alabaster-50/80">{rule.label}</span>
                <span className="tabular font-semibold text-signal">{rule.sharePct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Scanner Reticle Ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/80"
        style={{
          left: lensX,
          top: lensY,
          transition: pointerActive ? 'none' : 'left 380ms var(--ease-loot), top 380ms var(--ease-loot)',
        }}
      />

      {/* Interactive Zone Anchor Dots */}
      {ZONE_LIST.map((zone) => {
        const isSelected = activeLayer === zone.id;
        return (
          <button
            key={zone.id}
            type="button"
            onMouseEnter={() => onHoverZone(zone.id)}
            onFocus={() => onHoverZone(zone.id)}
            onClick={() => onHoverZone(zone.id)}
            aria-label={`Inspect ${zone.id} zone`}
            className="absolute z-20 grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
            style={{ left: zone.x, top: zone.y }}
          >
            <span
              className={`size-2.5 rounded-full transition-transform duration-200 ${
                isSelected ? 'scale-125 bg-signal' : 'bg-alabaster-50/80 hover:scale-125'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
