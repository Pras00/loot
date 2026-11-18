interface BrandMarkProps {
  readonly className?: string;
}

/**
 * The double-loop 8. Two machined loops, drawn as strokes so the mark can
 * animate itself on first paint.
 */
export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 44 68" fill="none" aria-hidden="true" className={className}>
      <rect
        x="5"
        y="5"
        width="34"
        height="24"
        rx="11"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="7"
        className="brand-draw__loop"
      />
      <rect
        x="5"
        y="39"
        width="34"
        height="24"
        rx="11"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="7"
        className="brand-draw__loop brand-draw__loop--late"
      />
    </svg>
  );
}
