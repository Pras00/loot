'use client';

import { clamp } from './math';

export type StageVars = Readonly<Record<`--${string}`, string>>;
export type StageChoreography = (progress: number) => StageVars;

interface StageBinding {
  readonly el: HTMLElement;
  readonly damping: number;
  readonly choreography: StageChoreography;
  readonly applied: Map<string, string>;
  target: number;
  value: number;
}

const REST_THRESHOLD = 0.0004;
const DEFAULT_DAMPING = 11.5;

const bindings = new Set<StageBinding>();
const actListeners = new Set<(id: string) => void>();
let currentActiveAct = 'origin';

let frameHandle: number | null = null;
let lastTimestamp = 0;
let motionQuery: MediaQueryList | null = null;
let listening = false;

function prefersReducedMotion(): boolean {
  if (motionQuery === null && typeof window !== 'undefined') {
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  }
  return motionQuery?.matches ?? false;
}

/** Writes only the custom properties whose value actually changed. */
function apply(binding: StageBinding): void {
  const vars = binding.choreography(binding.value);
  const entries = Object.entries(vars);

  for (const [key, raw] of entries) {
    if (binding.applied.get(key) === raw) {
      continue;
    }
    binding.el.style.setProperty(key, raw);
    binding.applied.set(key, raw);
  }

  // Drop properties the choreography no longer emits (phase exits).
  for (const key of binding.applied.keys()) {
    if (!(key in vars)) {
      binding.el.style.removeProperty(key);
      binding.applied.delete(key);
    }
  }
}

function measureNow(binding: StageBinding): void {
  const rect = binding.el.getBoundingClientRect();
  const scrollable = Math.max(1, binding.el.offsetHeight - window.innerHeight);
  const target = clamp(-rect.top / scrollable, 0, 1);
  binding.target = target;
  binding.value = target;
  apply(binding);
}

function schedule(): void {
  if (frameHandle !== null) {
    return;
  }
  frameHandle = window.requestAnimationFrame(tick);
}

function resolveActiveAct(viewportHeight: number): void {
  if (actListeners.size === 0 || typeof document === 'undefined') {
    return;
  }
  const probeY = viewportHeight * 0.45;
  const sections = document.querySelectorAll<HTMLElement>('main section[id]');
  let matched: string | null = null;
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    const threshold = section.classList.contains('overlap-stage') ? 8 : probeY;
    if (rect.top <= threshold && rect.bottom > probeY) {
      matched = section.id;
    }
  }
  if (matched !== null && matched !== currentActiveAct) {
    currentActiveAct = matched;
    for (const listener of actListeners) {
      listener(matched);
    }
  }
}

function tick(timestamp: number): void {
  frameHandle = null;

  const dt = lastTimestamp === 0 ? 1 / 60 : Math.min(0.05, (timestamp - lastTimestamp) / 1000);
  lastTimestamp = timestamp;

  const reduced = prefersReducedMotion();
  const viewportHeight = window.innerHeight;

  // Read phase: geometry only, no writes interleaved.
  const reads: Array<{ binding: StageBinding; top: number; height: number }> = [];
  for (const binding of bindings) {
    const rect = binding.el.getBoundingClientRect();
    reads.push({ binding, top: rect.top, height: binding.el.offsetHeight });
  }
  resolveActiveAct(viewportHeight);

  let moving = false;

  for (const read of reads) {
    const scrollable = Math.max(1, read.height - viewportHeight);
    const target = clamp(-read.top / scrollable, 0, 1);
    read.binding.target = target;

    if (reduced) {
      read.binding.value = target;
      continue;
    }

    const delta = target - read.binding.value;
    if (Math.abs(delta) < REST_THRESHOLD) {
      read.binding.value = target;
      continue;
    }

    read.binding.value += delta * (1 - Math.exp(-read.binding.damping * dt));
    moving = true;
  }

  // Write phase.
  for (const read of reads) {
    apply(read.binding);
  }

  if (moving) {
    schedule();
  } else {
    lastTimestamp = 0;
  }
}

function handleScrollOrResize(): void {
  schedule();
}

function startListening(): void {
  if (listening) {
    return;
  }
  listening = true;
  window.addEventListener('scroll', handleScrollOrResize, { passive: true });
  window.addEventListener('resize', handleScrollOrResize, { passive: true });
  window.addEventListener('orientationchange', handleScrollOrResize, { passive: true });
}

function stopListening(): void {
  if (!listening) {
    return;
  }
  listening = false;
  window.removeEventListener('scroll', handleScrollOrResize);
  window.removeEventListener('resize', handleScrollOrResize);
  window.removeEventListener('orientationchange', handleScrollOrResize);
}

/**
 * Binds a sticky stage to the single page-wide scroll loop.
 * Returns an unbind function.
 */
export function registerStage(
  el: HTMLElement,
  choreography: StageChoreography,
  damping: number = DEFAULT_DAMPING,
): () => void {
  // Reduced motion renders the static story instead of the stages. Binding a
  // hidden stage would keep a listener and a rAF loop alive for nothing.
  if (prefersReducedMotion()) {
    return () => {};
  }

  const binding: StageBinding = {
    el,
    damping,
    choreography,
    applied: new Map<string, string>(),
    target: 0,
    value: 0,
  };

  bindings.add(binding);
  startListening();
  measureNow(binding);
  schedule();

  return () => {
    bindings.delete(binding);
    binding.applied.clear();
    if (bindings.size === 0) {
      stopListening();
      if (frameHandle !== null) {
        window.cancelAnimationFrame(frameHandle);
        frameHandle = null;
      }
      lastTimestamp = 0;
    }
  };
}

/** Subscribes to active act changes resolved during the engine's read phase. */
export function subscribeActiveAct(listener: (id: string) => void): () => void {
  actListeners.add(listener);
  if (typeof window !== 'undefined') {
    resolveActiveAct(window.innerHeight);
    listener(currentActiveAct);
  }
  return () => {
    actListeners.delete(listener);
  };
}

const CHAPTER_LANDING: Readonly<Record<string, number>> = {
  origin: 0.04,
  anatomy: 0.78,
  flow: 0.78,
  forge: 0.45,
  spec: 0,
};

/** Scrolls a stage to a normalized progress value. Used by chapter controls. */
export function scrollStageTo(el: HTMLElement, ratio: number): void {
  const rect = el.getBoundingClientRect();
  const top = window.scrollY + rect.top;
  const scrollable = Math.max(0, el.offsetHeight - window.innerHeight);
  window.scrollTo({
    top: Math.max(0, top + scrollable * clamp(ratio, 0, 1)),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
}

/** Scrolls cleanly to a named act at its settled editorial dwell plateau. */
export function scrollToChapter(id: string, ratioOverride?: number): void {
  if (typeof document === 'undefined') {
    return;
  }
  const element = document.getElementById(id);
  if (element !== null) {
    scrollStageTo(element, ratioOverride ?? CHAPTER_LANDING[id] ?? 0);
  }
}
