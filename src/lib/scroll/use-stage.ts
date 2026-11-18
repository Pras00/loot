'use client';

import { useEffect, type RefObject } from 'react';

import { registerStage, type StageChoreography } from './engine';

const DEFAULT_DAMPING = 11.5;

/**
 * Drives CSS custom properties on a sticky stage. The choreography must be a
 * stable reference (module scope or `useCallback`) — no React render per frame.
 */
export function useStage(
  ref: RefObject<HTMLElement | null>,
  choreography: StageChoreography,
  damping: number = DEFAULT_DAMPING,
): void {
  useEffect(() => {
    const el = ref.current;
    if (el === null) {
      return;
    }
    return registerStage(el, choreography, damping);
  }, [ref, choreography, damping]);
}
