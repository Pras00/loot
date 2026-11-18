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
  eyebrow: 'Smart metal card',
  editionYear: '2026 Edition',
  editionTag: '6.1 g aluminium',
  displayLines: ['You tap once.', 'It splits four ways.'],
  specBadge: 'Accepted in 42 countries / 0.4 s offline approval',
  manifesto: ['One Metal Card.', 'Automatic Money Pockets.', 'Zero Manual Accounting.'],
  hud: 'One metal card. Automatic money pockets. Zero manual accounting.',
  hudSupport:
    'Eight years of messy month-end spreadsheets replaced by a single metal card. Pay once at any counter, and your tax, daily expenses, savings, and payroll sort themselves on the spot.',
  cta: 'Claim your card',
  topCta: 'Claim your card',
  exploreCta: 'Scroll to go through the slash',
  diveFrames: [
    {
      code: '01',
      tag: 'b / the bill',
      headline: 'Every payment starts as one single bill.',
    },
    {
      code: '02',
      tag: 'm / the mess',
      headline: 'Most cards dump it into one mixed balance.',
    },
    {
      code: '03',
      tag: 'g / the gap',
      headline: 'Sorting receipts by hand is where time disappears.',
    },
    {
      code: '04',
      tag: 'l / loot automatic',
      headline: "You don't sort it later. The card splits it on the spot.",
    },
  ],
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
  title: 'Paid once. Sorted four ways.',
  lead: 'One Rp 480.000 dinner updates all four of your pockets at the exact same moment. Point at any pocket to see its share.',
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
  title: 'The card, constructed.',
  lead: 'One angle, 23.6°, and three thin layers pressed into 0.78 millimeters of solid metal. The lines become a card the same way a rule becomes automatic.',
  balances: 'Your pocket balances after dinner',
  note: 'Money lands in each pocket the same second you tap. No waiting for overnight bank batches.',
} as const;

export const FORGE = {
  title: 'One card. Both sides of the line.',
  lead: 'Scrub across the 23.6° cut to inspect the internal pocket blueprint, then slide the bill amount below to test your live split.',
  editionLabel: 'Card finish',
  ruleLabel: 'Splitting style',
  amountLabel: 'Slide the bill amount',
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
  title: 'Zero manual accounting.',
  lead: 'Everything you need to know about how LOOT works in the real world.',
  stories: [
    {
      index: '01',
      total: '03',
      author: 'At the restaurant',
      role: 'Team dinner, Rp 480.000',
      quote: 'Dinner is paid in one tap.',
      body: 'Instead of saving paper receipts for your accountant, 20% is already in your tax pocket and 45% is deducted from daily operating funds before you leave the table.',
    },
    {
      index: '02',
      total: '03',
      author: 'In the air or subway',
      role: 'Zero phone signal',
      quote: 'Phone off. Still works.',
      body: 'Because your splitting rules live inside the 0.78 mm metal card itself, payments approve in 0.4 seconds even when your phone battery is dead or you have no roaming data.',
    },
    {
      index: '03',
      total: '03',
      author: 'At tax day',
      role: 'End of the quarter',
      quote: 'Tax is already waiting.',
      body: 'Every transaction all quarter long automatically set aside its exact rupiah share. When tax day arrives, the money is already sitting in its own pocket.',
    },
  ],
  stats: [
    { figure: '0.4s', label: 'Approval speed', sub: 'Offline at any reader', barPct: 92 },
    { figure: '6.1g', label: 'Solid aluminium', sub: '0.78 mm wallet profile', barPct: 78 },
    { figure: '100%', label: 'Rupiah accuracy', sub: 'Zero rounding drift', barPct: 100 },
    { figure: '42', label: 'Countries supported', sub: 'Tracked 3-day delivery', barPct: 84 },
    { figure: 'Rp 0', label: 'Monthly effort', sub: 'No manual spreadsheets', barPct: 96 },
  ],
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
  note: 'Interactive product concept. No card is shipped and your email is never stored.',
  success: 'Spot reserved in the concept preview. No email was stored.',
} as const;

export const FOOTER = {
  note: 'LOOT — Designed and built with the same precision. Interactive product concept.',
} as const;

export const ACTS = [
  { id: 'origin', label: 'The dive' },
  { id: 'anatomy', label: 'Four pockets' },
  { id: 'flow', label: 'Constructed' },
  { id: 'forge', label: 'Both sides' },
  { id: 'spec', label: 'Proof' },
] as const satisfies readonly ActMeta[];
