/** All user-facing copy. Shared by the scrollytelling stages and the reduced-motion layout. */

export interface SpecRow {
  readonly label: string;
  readonly value: string;
}

export interface SpecSheet {
  readonly id: string;
  readonly title: string;
  readonly blurb: string;
  readonly rows: readonly SpecRow[];
}

export type EditionId = 'stealth' | 'ultraviolet' | 'acid';

export interface Edition {
  readonly id: EditionId;
  readonly name: string;
  readonly hex: string;
  readonly note: string;
}

export interface ActMeta {
  readonly id: string;
  readonly label: string;
}

export const HERO = {
  eyebrow: 'Smart metal card for automatic money sorting',
  editionYear: '2026 Edition',
  editionTag: '6.1 g solid aluminium',
  displayLines: ['LIQUID BY', 'DESIGN'],
  specBadge: 'Accepted in 42 countries',
  manifesto: ['One Metal Card.', 'Automatic Money Pockets.', 'Zero Manual Accounting.'],
  hud: 'One metal card. Automatic money pockets. Zero manual accounting.',
  hudSupport:
    'Pay once at any counter, and LOOT automatically divides the bill across your tax, daily expenses, savings, and payroll pockets.',
  cta: 'Get LOOT Card',
  topCta: 'Claim your card',
  exploreCta: 'See how it works',
} as const;

export const RECEIPT = {
  merchant: 'Team dinner',
  approved: 'Approved',
  splitLabel: 'Automatically divided into your pockets',
  totalLabel: 'Total paid',
  stampTitle: 'Tax pocket',
  stampLine: 'Rp 96k set aside',
  stampDate: 'Instant',
  portalLabel: 'Balances',
} as const;

export const RULESET = {
  label: 'Your automatic split',
  note: 'Set your percentages once, and the card handles every payment.',
} as const;

export const ANATOMY = {
  title: 'Works anywhere, even when your phone is offline.',
  lead: 'Most cards rely on an app or bank server to sort your money. LOOT stores your pocket rules inside the card itself, so every tap finishes in under half a second.',
  layers: [
    {
      id: 'shell',
      name: 'Solid aluminium body',
      detail: 'Carved from a single piece of 6.1 g aluminium so it feels light in your hand and never bends or peels.',
    },
    {
      id: 'core',
      name: 'Offline security chip',
      detail: 'Approves your payment in 0.4 seconds right at the counter, without needing mobile signal or internet.',
    },
    {
      id: 'engine',
      name: 'Built-in pocket memory',
      detail: 'Keeps your percentage rules inside the card so your tax and savings are separated the moment you tap.',
    },
  ],
} as const;

export const FLOW = {
  title: 'Every pocket stays funded without lifting a finger.',
  lead: 'No more sorting receipts or moving money between accounts at the end of the month. One payment updates all four of your balances at once.',
  balances: 'Your pocket balances after dinner',
  note: 'Money lands in each pocket the same second you tap. No waiting for overnight bank batches.',
} as const;

export const FORGE = {
  title: 'Try it yourself. Set your own split.',
  lead: 'Pick a card finish, choose how you want to divide your money, and slide the payment amount to see your pockets update live.',
  editionLabel: 'Card finish',
  ruleLabel: 'Splitting style',
  amountLabel: 'Payment amount to test',
  limitLabel: 'Spending limit',
  declined: 'Over your spending limit. Lower the amount or raise your limit.',
  tap: 'Test this payment',
  tapHint: 'Tap the card to test this payment',
  withinLimit: 'Within your spending limit. Ready to tap.',
  authorised: 'Approved in 0.4 seconds. All four pockets updated.',
  editions: [
    { id: 'stealth', name: 'Stealth', hex: '#18181C', note: 'Matte charcoal with a lime edge.' },
    { id: 'ultraviolet', name: 'Ultraviolet', hex: '#723BFA', note: 'Deep violet with a satin finish.' },
    { id: 'acid', name: 'Acid', hex: '#B9F500', note: 'Bright lime with dark laser etching.' },
  ] as const satisfies readonly Edition[],
} as const;

export const SPEC = {
  title: 'Simple, transparent details.',
  lead: 'Everything you need to know about the physical card, your security, how pockets work, and delivery.',
  sheets: [
    {
      id: 'card',
      title: 'The physical card',
      blurb: 'Real machined metal built for everyday use, not coated plastic.',
      rows: [
        { label: 'Material', value: 'Anodized aluminium' },
        { label: 'Weight', value: '6.1 grams' },
        { label: 'Thickness', value: '0.78 mm (standard wallet fit)' },
        { label: 'Durability', value: 'Scratch & water resistant' },
        { label: 'Edge finish', value: '0.3 mm precision bevel' },
      ],
    },
    {
      id: 'security',
      title: 'Security & peace of mind',
      blurb: 'Your security keys stay locked inside the card and can never be copied.',
      rows: [
        { label: 'Payment approval', value: 'Works offline in 0.4 seconds' },
        { label: 'Lost or stolen card', value: 'Freeze in one tap from the app' },
        { label: 'Spending limits', value: 'Set per tap, per day, or per pocket' },
        { label: 'Privacy', value: 'Keys never leave the card chip' },
        { label: 'Backup control', value: 'Change rules anytime in the app' },
      ],
    },
    {
      id: 'treasury',
      title: 'How pockets work',
      blurb: 'Your money is divided the moment you pay, with zero rounding errors.',
      rows: [
        { label: 'Number of pockets', value: 'Up to 6 custom pockets' },
        { label: 'Sorting speed', value: 'Instant, right when you tap' },
        { label: 'Rupiah accuracy', value: 'Exact to the last rupiah' },
        { label: 'Transaction history', value: 'Clear breakdown for every bill' },
        { label: 'Exporting data', value: 'One-click CSV & accounting export' },
      ],
    },
    {
      id: 'issuing',
      title: 'Delivery & membership',
      blurb: 'Fast tracked shipping and straightforward terms with no hidden fees.',
      rows: [
        { label: 'Delivery time', value: '3 working days' },
        { label: 'Where it works', value: '42 countries worldwide' },
        { label: 'Getting started', value: 'Tap card to your phone to activate' },
        { label: 'Card replacement', value: '1 free replacement every year' },
        { label: 'Cancellation', value: 'Cancel anytime, Rp 0 fee' },
      ],
    },
  ] as const satisfies readonly SpecSheet[],
} as const;

export const CLAIM = {
  label: 'Your email address',
  placeholder: 'you@company.com',
  cta: 'Reserve your card',
  note: 'This is an interactive product concept. No card is shipped and your email is never stored.',
  success: 'Spot reserved in the concept preview. No email was stored.',
} as const;

export const FOOTER = {
  note: 'LOOT — Interactive product concept. No money is charged and no personal data is collected.',
} as const;

export const ACTS = [
  { id: 'origin', label: 'Overview' },
  { id: 'anatomy', label: 'Inside the card' },
  { id: 'flow', label: 'How money flows' },
  { id: 'forge', label: 'Try it live' },
  { id: 'spec', label: 'Details' },
] as const satisfies readonly ActMeta[];
