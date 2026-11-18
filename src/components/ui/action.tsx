import type { ReactNode } from 'react';

export type ActionVariant = 'signal' | 'ghost' | 'quiet';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-body-sm font-semibold transition-colors duration-200 ease-loot disabled:cursor-not-allowed disabled:opacity-50';

const VARIANTS: Readonly<Record<ActionVariant, string>> = {
  signal: 'bg-signal text-ink hover:bg-signal-600',
  ghost: 'border border-hairline text-ink-primary hover:border-ink-primary',
  quiet: 'text-ink-secondary hover:text-ink-primary',
};

export function actionClass(variant: ActionVariant = 'signal'): string {
  return `${BASE} ${VARIANTS[variant]}`;
}

interface ActionLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: ActionVariant;
  readonly className?: string;
}

export function ActionLink({ href, children, variant, className }: ActionLinkProps) {
  return (
    <a href={href} className={`${actionClass(variant)} ${className ?? ''}`}>
      {children}
    </a>
  );
}
