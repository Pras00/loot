'use client';

import { useEffect, useState } from 'react';

import { ACTS } from '@/lib/content/copy';
import { scrollToChapter, subscribeActiveAct } from '@/lib/scroll/engine';

const LIGHT_SECTIONS = new Set<string>(['anatomy', 'flow', 'spec']);

export function SectionRail() {
  const [active, setActive] = useState<string>('origin');

  useEffect(() => subscribeActiveAct(setActive), []);

  const surface = LIGHT_SECTIONS.has(active) ? 'light' : 'dark';

  return (
    <nav
      aria-label="Chapters"
      data-surface={surface}
      className="act-rail fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-4 motion-reduce:hidden sm:flex"
    >
      {ACTS.map((act) => {
        const isActive = active === act.id;
        return (
          <button
            key={act.id}
            type="button"
            aria-label={act.label}
            aria-current={isActive ? 'true' : 'false'}
            onClick={() => scrollToChapter(act.id)}
            className="group flex min-h-6 items-center gap-3"
          >
            <span className="text-micro text-ink-secondary opacity-0 transition-opacity duration-200 ease-loot group-hover:opacity-100 group-focus-visible:opacity-100">
              {act.label}
            </span>
            <span
              aria-hidden
              className={`rounded-full transition-all duration-200 ease-loot ${
                isActive ? 'h-4 w-1 bg-signal' : 'size-1.5 bg-ink-muted hover:bg-ink-primary'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
