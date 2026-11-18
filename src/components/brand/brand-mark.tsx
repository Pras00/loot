export interface PrismShard {
  readonly id: 'ops' | 'yield' | 'tax' | 'payroll';
  readonly d: string;
}

/**
 * The 4-Vault Prism geometry, centered at (0, 0) within [-18..18, -19..19].
 * Every diagonal facet follows the 23.6° axis, dividing one solid monolith
 * into four interlocking pocket shards (Ops, Yield, Tax, Payroll).
 */
export const LOOT_PRISM_SHARDS: readonly PrismShard[] = [
  {
    id: 'ops',
    d: 'M -17 -19 L 4.5 -19 L 4.5 -9.5 L -6 -4.9 L -6 6.2 L -17 11 Z',
  },
  {
    id: 'yield',
    d: 'M 8 -19 L 17 -19 L 17 -15 L 8 -11 Z',
  },
  {
    id: 'payroll',
    d: 'M 17 19 L -4.5 19 L -4.5 9.5 L 6 4.9 L 6 -6.2 L 17 -11 Z',
  },
  {
    id: 'tax',
    d: 'M -8 19 L -17 19 L -17 15 L -8 11 Z',
  },
] as const;

interface BrandMarkProps {
  readonly className?: string;
  readonly variant?: 'solid' | 'wireframe';
  readonly accentShard?: boolean;
}

/**
 * The 4-Vault Prism emblem. Four precision shards separated by a 23.6° aperture.
 */
export function BrandMark({
  className,
  variant = 'solid',
  accentShard = false,
}: BrandMarkProps) {
  return (
    <svg viewBox="-20 -22 40 44" fill="none" aria-hidden="true" className={className}>
      {LOOT_PRISM_SHARDS.map((shard) => {
        const isAccent = accentShard && shard.id === 'yield';
        if (variant === 'wireframe') {
          return (
            <path
              key={shard.id}
              d={shard.d}
              stroke={isAccent ? 'var(--color-signal-400)' : 'currentColor'}
              strokeWidth={1.6}
              vectorEffect="non-scaling-stroke"
            />
          );
        }

        return (
          <path
            key={shard.id}
            d={shard.d}
            fill={isAccent ? 'var(--color-signal-400)' : 'currentColor'}
            className={
              shard.id === 'ops' || shard.id === 'payroll'
                ? 'brand-draw__shard'
                : 'brand-draw__shard brand-draw__shard--late'
            }
          />
        );
      })}
    </svg>
  );
}
