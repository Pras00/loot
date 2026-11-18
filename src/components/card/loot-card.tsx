import { BrandMark } from '@/components/chrome/brand-mark';
import type { EditionId } from '@/lib/content/copy';

const EDITION_NAMES: Readonly<Record<EditionId, string>> = {
  stealth: 'Stealth',
  ultraviolet: 'Ultraviolet',
  acid: 'Acid',
};

interface LootCardProps {
  readonly edition?: EditionId;
  readonly className?: string;
}

/** The card face. Purely presentational — motion is applied by the caller. */
export function LootCard({ edition = 'stealth', className }: LootCardProps) {
  return (
    <div className={`loot-card ${className ?? ''}`} data-edition={edition}>
      <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="font-display tracking-wordmark text-body-sm font-bold uppercase">
            LOOT
          </span>
          <span className="rounded-full border border-current/20 px-2.5 py-0.5 text-micro font-medium opacity-75">
            {EDITION_NAMES[edition]}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ChipMark className="h-7 w-9 sm:h-8 sm:w-11" />
          <ContactlessMark className="size-4 opacity-75 sm:size-5" />
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-micro opacity-65">Smart treasury card</p>
            <p className="tabular mt-0.5 text-data font-medium tracking-widest opacity-90">
              •••• 4402
            </p>
          </div>
          <BrandMark className="h-5 w-3.5 opacity-85 sm:h-6 sm:w-4" />
        </div>
      </div>
      <span aria-hidden className="loot-card__edge" />
    </div>
  );
}

function ChipMark({ className }: { readonly className?: string }) {
  return (
    <span aria-hidden className={`loot-card__chip relative block overflow-hidden ${className ?? ''}`}>
      <svg viewBox="0 0 44 32" fill="none" className="size-full text-ink/35">
        <path d="M15 0 V32 M29 0 V32 M0 11 H15 M29 11 H44 M0 21 H15 M29 21 H44" stroke="currentColor" strokeWidth="1" />
        <rect x="15" y="9" width="14" height="14" stroke="currentColor" strokeWidth="1" />
      </svg>
    </span>
  );
}

function ContactlessMark({ className }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M6.5 8.5a7 7 0 0 1 0 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 6a11 11 0 0 1 0 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13.5 3.5a15 15 0 0 1 0 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
