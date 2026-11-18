'use client';

import { useState, type FormEvent } from 'react';

import { BrandMark } from '@/components/brand/brand-mark';
import { CLAIM, FOOTER, SPEC } from '@/lib/content/copy';

/**
 * Section 5 — Proof, Specifications & Full-Bleed Dark Editorial Footer.
 */
export function ProofFooterSection() {
  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);
  const [claimedEmail, setClaimedEmail] = useState<string | null>(null);

  const activeStory = SPEC.stories[activeStoryIdx] ?? SPEC.stories[0];

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const raw = formData.get('email');
    const email = typeof raw === 'string' ? raw.trim() : '';
    if (email.length > 0) {
      setClaimedEmail(email);
    }
  };

  return (
    <section id="spec" aria-labelledby="spec-title" className="surface-light relative z-40 bg-canvas">
      {/* Part 1: Gigantic Scenario Quote & 3-Step Selector */}
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-24 sm:px-12 sm:pt-32">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <span aria-hidden className="block text-display-md leading-none text-ultraviolet-500">
              “
            </span>
            <h2 id="spec-title" className="mt-2 text-display-lg text-ink-primary">
              {activeStory.quote}
            </h2>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-8">
            <p className="text-body text-ink-secondary">{activeStory.body}</p>

            <div className="mt-8 flex items-center gap-3.5 border-t border-ink/15 pt-5">
              <span className="grid size-10 place-items-center rounded-full bg-ink text-body-sm font-medium text-alabaster-50">
                {activeStory.author.charAt(0)}
              </span>
              <div>
                <p className="text-body-sm font-medium text-ink-primary">{activeStory.author}</p>
                <p className="text-micro text-ink-muted">{activeStory.role}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-24 sm:grid-cols-3 sm:gap-8">
          {SPEC.stories.map((story, idx) => {
            const isSelected = idx === activeStoryIdx;
            return (
              <button
                key={story.index}
                type="button"
                onClick={() => setActiveStoryIdx(idx)}
                aria-pressed={isSelected}
                className="group text-left"
              >
                <div className="h-0.5 w-full bg-ink/15">
                  <div
                    className={`h-full transition-all duration-300 ease-loot ${
                      isSelected
                        ? 'w-full bg-ultraviolet-500'
                        : 'w-0 bg-ink/40 group-hover:w-1/3'
                    }`}
                  />
                </div>
                <div className="mt-3.5 flex items-baseline gap-3">
                  <span className="tabular text-micro text-ink-muted">
                    <span>{story.index}</span>
                    <span className="mx-1">/</span>
                    <span>{story.total}</span>
                  </span>
                  <span
                    className={`text-title transition-colors ${
                      isSelected
                        ? 'text-ink-primary'
                        : 'text-ink-muted group-hover:text-ink-secondary'
                    }`}
                  >
                    {story.author}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Part 2: 5-Column Proof & Hardware Stats Grid */}
        <dl className="mt-24 grid grid-cols-2 gap-8 border-y border-ink/15 py-14 sm:grid-cols-5">
          {SPEC.stats.map((stat, idx) => (
            <div key={stat.label} className="flex flex-col justify-between">
              <div>
                <dd className="tabular text-display-md text-ink-primary">{stat.figure}</dd>
                <dt className="mt-3 text-body-sm font-medium text-ink-primary">{stat.label}</dt>
                <p className="mt-0.5 text-micro text-ink-muted">{stat.sub}</p>
              </div>
              <div className="mt-6 h-1 w-full bg-ink/10">
                <div
                  className={idx % 2 === 0 ? 'h-full bg-ultraviolet-500' : 'h-full bg-ink'}
                  style={{ width: `${stat.barPct}%` }}
                />
              </div>
            </div>
          ))}
        </dl>

        {/* Part 3: Clean Open Hairline Specification Index */}
        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-micro text-ultraviolet-600">Specifications</p>
            <h3 className="mt-2 text-display-md text-ink-primary">{SPEC.title}</h3>
            <p className="mt-3 max-w-sm text-body-sm text-ink-secondary">{SPEC.lead}</p>
          </div>

          <div className="divide-y divide-ink/15 border-t border-ink/15 lg:col-span-8">
            {SPEC.sheets.map((sheet) => (
              <article key={sheet.id} id={`sheet-${sheet.id}`} className="relative py-8">
                <div className="flex flex-col justify-between gap-2 pb-4 sm:flex-row sm:items-baseline">
                  <h4 className="text-title text-ink-primary">{sheet.title}</h4>
                  <p className="text-micro text-ink-muted">{sheet.blurb}</p>
                </div>
                <dl className="grid gap-x-10 border-t border-ink/10 sm:grid-cols-2">
                  {sheet.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-2.5 text-body-sm"
                    >
                      <dt className="text-ink-secondary">{row.label}</dt>
                      <dd className="text-right font-medium text-ink-primary">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Part 4: Full-Bleed Dark Editorial Footer */}
      <footer id="claim" className="surface-dark bg-charcoal-950 text-alabaster-50">
        <div className="mx-auto max-w-7xl px-6 pb-12 pt-20 sm:px-12 sm:pt-28">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-6 text-micro text-ink-secondary">
            <div className="flex items-center gap-2.5">
              <span aria-hidden className="size-2 rounded-full bg-signal" />
              <span>Early access batch open / Ships in 3 working days</span>
            </div>
            <span>Jakarta / GMT+7</span>
          </div>

          <div className="mt-14 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h3 className="text-display-lg text-ink-primary">Ready to stop sorting receipts?</h3>
              <p id="claim-note" className="mt-4 max-w-md text-body-sm text-ink-secondary">
                {CLAIM.note}
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              className="w-full lg:col-span-5"
              aria-describedby="claim-note"
            >
              <label htmlFor="claim-email" className="text-micro text-ink-muted">
                {CLAIM.label}
              </label>
              <div className="mt-2.5 flex flex-col gap-3 sm:flex-row">
                <input
                  id="claim-email"
                  name="email"
                  type="email"
                  required
                  disabled={claimedEmail !== null}
                  autoComplete="email"
                  placeholder={CLAIM.placeholder}
                  className="min-w-0 flex-1 rounded-full border border-hairline bg-charcoal-900 px-5 py-3 text-body-sm text-ink-primary placeholder:text-ink-muted focus-visible:border-signal disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={claimedEmail !== null}
                  className="rounded-full bg-signal px-6 py-3 text-body-sm font-semibold text-ink transition-colors duration-200 ease-loot hover:bg-signal-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {claimedEmail !== null ? 'Reserved' : CLAIM.cta}
                </button>
              </div>
              <div
                role="status"
                className="mt-3 flex min-h-5 flex-wrap items-baseline gap-3 text-micro text-signal"
              >
                {claimedEmail !== null ? (
                  <>
                    <span>
                      {CLAIM.success} ({claimedEmail})
                    </span>
                    <button
                      type="button"
                      onClick={() => setClaimedEmail(null)}
                      className="text-ink-primary underline underline-offset-4"
                    >
                      Use another email
                    </button>
                  </>
                ) : null}
              </div>
            </form>
          </div>

          <div className="mt-20 flex flex-col gap-6 border-t border-hairline pt-6 text-micro text-ink-muted sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <BrandMark className="size-4 text-alabaster-50" accentShard />
              <span>{FOOTER.note}</span>
            </div>
            <a href="#origin" className="text-ink-secondary hover:text-signal">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
