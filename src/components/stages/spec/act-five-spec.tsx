'use client';

import { useEffect, useState, type FormEvent } from 'react';

import { CLAIM, FOOTER, SPEC } from '@/lib/content/copy';

const AT_A_GLANCE = [
  { label: 'Thickness', value: '0.78 mm' },
  { label: 'Weight', value: '6.1 g' },
  { label: 'Approval', value: '0.4 s' },
] as const;

const TOPIC_BADGES = ['Hardware', 'Protection', 'Money sorting', 'Shipping'] as const;

/**
 * Act 5 — Spec. Clean, welcoming product details organized into four clear
 * cards, paired with a sticky summary on the left and a warm card reservation
 * box at the bottom.
 */
export function ActFiveSpec() {
  const [claimedEmail, setClaimedEmail] = useState<string | null>(null);
  const [activeSheetId, setActiveSheetId] = useState<string>(SPEC.sheets[0].id);

  useEffect(() => {
    const elements = SPEC.sheets
      .map((sheet) => document.getElementById(`sheet-${sheet.id}`))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSheetId(entry.target.id.replace('sheet-', ''));
          }
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0.05 },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

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
      <div aria-hidden className="blueprint pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-10 sm:pt-24">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
          <header className="lg:sticky lg:top-20 lg:col-span-4">
            <span className="inline-block rounded-full bg-charcoal-900 px-3 py-1 text-micro font-semibold text-signal">
              Product details
            </span>
            <h2 id="spec-title" className="mt-3 text-display-md text-balance">
              {SPEC.title}
            </h2>
            <p className="mt-2.5 max-w-sm text-body-sm text-ink-secondary">{SPEC.lead}</p>

            <nav
              aria-label="Product detail topics"
              className="mt-7 hidden overflow-hidden rounded-card border border-ink/15 bg-alabaster-100 lg:block"
            >
              <ol className="divide-y divide-hairline">
                {SPEC.sheets.map((sheet, index) => {
                  const isActive = activeSheetId === sheet.id;
                  return (
                    <li key={sheet.id}>
                      <a
                        href={`#sheet-${sheet.id}`}
                        className={`flex items-center justify-between border-l-4 px-4 py-3 text-body-sm transition-all duration-200 ease-loot ${
                          isActive
                            ? 'border-l-ultraviolet-500 bg-charcoal-900 font-semibold text-alabaster-50'
                            : 'border-l-transparent text-ink-secondary hover:bg-alabaster-50 hover:text-ink-primary'
                        }`}
                      >
                        <span>{sheet.title}</span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-micro font-medium ${
                            isActive ? 'bg-signal text-ink' : 'bg-ink/5 text-ink-muted'
                          }`}
                        >
                          {TOPIC_BADGES[index] ?? 'Details'}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="mt-7 hidden rounded-card border border-charcoal-700 bg-charcoal-900 p-5 text-alabaster-50 shadow-paper lg:block">
              <div className="flex items-center justify-between border-b border-alabaster-50/15 pb-2.5 text-micro">
                <span className="font-medium text-alabaster-50/75">At a glance</span>
                <span className="font-semibold text-signal">Standard wallet fit</span>
              </div>
              <dl className="mt-3.5 grid grid-cols-3 divide-x divide-alabaster-50/15">
                {AT_A_GLANCE.map((item) => (
                  <div key={item.label} className="px-2.5 first:pl-0 last:pr-0">
                    <dt className="text-micro text-alabaster-50/65">{item.label}</dt>
                    <dd className="tabular mt-1 text-body-sm font-bold text-signal">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div aria-hidden className="mt-4 h-1 w-full rounded-full bg-ultraviolet-500" />
            </div>
          </header>

          <div className="mt-10 space-y-6 sm:mt-14 lg:col-span-8 lg:mt-0">
            {SPEC.sheets.map((sheet, index) => (
              <article
                id={`sheet-${sheet.id}`}
                key={sheet.id}
                className="sheet relative scroll-mt-20 overflow-hidden rounded-panel border border-ink/20 bg-alabaster-100 shadow-sheet"
              >
                <div className="flex flex-col gap-2 bg-charcoal-900 px-5 py-4 text-alabaster-50 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-signal px-3 py-0.5 text-micro font-semibold text-ink">
                      {TOPIC_BADGES[index] ?? 'Overview'}
                    </span>
                    <h3 className="text-title text-alabaster-50">{sheet.title}</h3>
                  </div>
                  <p className="max-w-md text-micro text-alabaster-50/75 sm:text-right">
                    {sheet.blurb}
                  </p>
                </div>

                <dl className="grid gap-x-8 p-5 sm:grid-cols-2 sm:p-7">
                  {sheet.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3"
                    >
                      <dt className="flex items-center gap-2 text-body-sm text-ink-secondary">
                        <span aria-hidden className="size-1.5 rounded-full bg-ultraviolet-500" />
                        <span>{row.label}</span>
                      </dt>
                      <dd className="text-right text-body-sm font-semibold text-ink-primary">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>

        <div
          id="claim"
          className="relative mt-16 overflow-hidden rounded-panel border border-ultraviolet-500/40 bg-charcoal-900 p-6 text-alabaster-50 shadow-paper sm:mt-24 sm:p-10 lg:p-12"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(55% 65% at 82% 20%, color-mix(in oklab, var(--color-ultraviolet-500) 30%, transparent), transparent 70%)',
            }}
          />

          <div className="relative z-10 grid gap-8 sm:grid-cols-12 sm:items-end">
            <div className="sm:col-span-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-signal px-3 py-0.5 text-micro font-semibold text-ink">
                Early access preview
              </span>
              <h3 className="mt-3 text-display-md text-balance text-alabaster-50">{CLAIM.cta}</h3>
              <p id="claim-note" className="mt-2.5 max-w-sm text-body-sm text-alabaster-50/75">
                {CLAIM.note}
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              className="w-full sm:col-span-6 sm:col-start-7"
              aria-describedby="claim-note"
            >
              <label
                htmlFor="claim-email"
                className="text-micro font-medium text-alabaster-50/80"
              >
                {CLAIM.label}
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  id="claim-email"
                  name="email"
                  type="email"
                  required
                  disabled={claimedEmail !== null}
                  autoComplete="email"
                  placeholder={CLAIM.placeholder}
                  className="min-w-0 flex-1 rounded-full border border-alabaster-50/25 bg-charcoal-950 px-4 py-2.5 text-body-sm text-alabaster-50 placeholder:text-alabaster-50/40 focus-visible:border-signal disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={claimedEmail !== null}
                  className="rounded-full bg-signal px-6 py-2.5 text-body-sm font-semibold text-ink transition-colors duration-200 ease-loot hover:bg-signal-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {claimedEmail !== null ? 'Reserved' : CLAIM.cta}
                </button>
              </div>
              <div
                role="status"
                className="mt-3 flex min-h-5 flex-wrap items-baseline gap-3 text-micro font-medium text-signal"
              >
                {claimedEmail !== null ? (
                  <>
                    <span>
                      {CLAIM.success} ({claimedEmail})
                    </span>
                    <button
                      type="button"
                      onClick={() => setClaimedEmail(null)}
                      className="text-alabaster-50 underline underline-offset-4"
                    >
                      Use another email
                    </button>
                  </>
                ) : null}
              </div>
            </form>
          </div>
        </div>

        <footer className="mt-16 flex flex-col gap-6 border-t border-ink/15 pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-micro text-ink-muted">{FOOTER.note}</p>
          <a
            href="#origin"
            className="text-micro font-semibold text-ink-primary hover:text-ultraviolet-600"
          >
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
