# LOOT — Anti-Slop Rules

A quality floor for pixels, words, and code. Extends the bans in
`.agents/skills/scrollytelling-design/references/anti-slop-guardrails.md` and
`.agents/skills/frontend-design/SKILL.md` with the specific tells this project is at risk of.

**How to use this file**: read §1–§6 before designing a component, run §7 before committing,
run §8 before saying "done". If a rule conflicts with the brief, the brief wins — but say so
out loud in the commit message.

**Severity** is marked per section: `BAN` = remove it, no discussion. `JUDGE` = allowed only
with a written reason at the call site.

---

## §1 Layout and composition — BAN except where marked

| # | Rule | Why it reads as generated | Instead |
|---|---|---|---|
| 1.1 | Do not centre every act | Centring is the zero-decision layout; five centred acts read as five slides | At most 2 of 5 acts centred. LOOT: Act 2 and Act 5 only |
| 1.2 | No three equal cards | The most generated layout on the internet | Unequal weight: one hero + two stacked, or 4/5/3 columns |
| 1.3 | No exact 50/50 splits | Halves look measured, not composed | 5/7, 4/8, or 3/9 |
| 1.4 | Break the vertical rhythm | One uniform gap for everything removes hierarchy | Tight inside a group (8–16), generous between groups (64–128) |
| 1.5 | Max two nested surfaces | Card inside card inside card is chrome cosplay | Flatten; use a hairline to imply containment |
| 1.6 | Hairline only between real groups | Borders on every element = wireframe, not interface | One rule per actual boundary |
| 1.7 | No single radius on everything | The SaaS-card tell | 18 card / 24 panel / 999 pill / 1 rule |
| 1.8 | No act made of stacked text blocks at `100vh` | The banned "slide deck" | Every act has a spatial mechanic (blueprint §5) |
| 1.9 | Leave the first screen incomplete | Nothing to scroll toward reads as a static poster | The card needs room to fall |
| 1.10 | No fake browser chrome | Dots, tabs, URL bars are props, not product | Show the real UI, or nothing |
| 1.11 | No centred divider with a dot | Decorative symmetry masquerading as structure | A hairline that separates real content |
| 1.12 | Bento only when content differs | Bento as the default for any multi-item set is a template | Items must differ in size *because* their content differs |
| 1.13 | No duplicated identity | Logo in the HUD and again in the hero body | One mark, one place |

## §2 Typography — BAN

| # | Rule | Why | Instead |
|---|---|---|---|
| 2.1 | No gradient text | Instantly 2023-template | Solid `--color-signal` or ink |
| 2.2 | No ALL-CAPS eyebrow above every heading | Templates label everything | Let the heading be the heading |
| 2.3 | No single accented word in a headline | The commonest generated headline move | Accent the whole line, or none |
| 2.4 | No `01 / 02 / 03` outside a real sequence | Numbering decorates, it does not inform | Numbers only where order matters |
| 2.5 | Mono for real data only | Mono labels are costume | Act 3 ledger figures; nothing else |
| 2.6 | Max three weights per viewport | Weight soup hides hierarchy | Display 700, body 400, data 500 |
| 2.7 | No tracking on body copy | Added letter-spacing to look "designed" | Tracking only on the wordmark (0.28em) |
| 2.8 | Sentence case for headings | Title Case Everywhere is an SEO-template habit | `Three layers. One decision.` |
| 2.9 | No faux small caps for labels | Uppercase + tracking as a universal label style | Lowercase, muted ink, smaller size |
| 2.10 | Body never below 16px | 12px text reads as "premium" but excludes readers | 16px body, 14px secondary, 11px only for spec tables |
| 2.11 | No justified body text | Rivers of white, unreadable at small sizes | Ragged right |
| 2.12 | Line length under 80 characters | Wide paragraphs are unread skimmable | `max-w-prose` scale |
| 2.13 | One family, two widths | Two competing display faces is indecision | Archivo `wdth 100/125` |

## §3 Colour and material — BAN

| # | Rule | Why | Instead |
|---|---|---|---|
| 3.1 | No gradient blob or aurora background | The signature AI hero | Flat surface + one light source |
| 3.2 | No glow without a visible source | Light that lights nothing | Bloom must trace back to a highlight on the card |
| 3.3 | No glassmorphism | `backdrop-blur` cards are the 2022 default | Solid surface + hairline |
| 3.4 | No neon on every element | Neon everywhere means neon means nothing | One signal per viewport |
| 3.5 | Accent never at equal weight to base | Two equal colours cancel hierarchy | ~90% charcoal/alabaster, ~8% violet, ~2% lime |
| 3.6 | No neutral grey shadows on dark | Grey on charcoal reads as dirt | Shadow tinted `--color-ultraviolet-900` |
| 3.7 | Never pure `#000` | Pure black kills material response | `#0c0c0f` floor, `#18181c` canvas |
| 3.8 | No violet→blue gradient | Generic "crypto SaaS" ramp | Violet is a light, not a ramp |
| 3.9 | Max one signal colour | Two accents = no accent | Lime is the only signal |
| 3.10 | Grain is mandatory | Ungrained dark surfaces look like flat CSS | Inline `feTurbulence` at 2–4% |
| 3.11 | No sub-4.5:1 body text | "Looks nicer" is not a contrast argument | Body ≥ 4.5:1; display ≥ 3:1 |
| 3.12 | **Violet is never body ink** | `#723BFA` on `#18181C` = 3.12:1 — display-only | Alabaster on violet (5.66:1) |

## §4 Motion — BAN

| # | Rule | Why | Instead |
|---|---|---|---|
| 4.1 | No fade-up on every section | The banned default | Each act has its own vector |
| 4.2 | No stagger on every child | Cascade-on-mount is the generated signature | One orchestrated entrance per page |
| 4.3 | No motion without a dwell | Unreadable moving targets | 15–25% of the act held still |
| 4.4 | One focal mover per frame | Five things moving = nothing moves | One flow head, one card, one sheet |
| 4.5 | No parallax on body text | Text that drifts cannot be read | Parallax on planes, never paragraphs |
| 4.6 | No ambient infinite loops | A pulse with nothing to say is decoration | Motion only as an answer to scroll or click |
| 4.7 | No fake "live" dot | Pulsing green + "Live" that is not live is a lie | Show the real timestamp |
| 4.8 | Hover only on interactive elements | Hover on static cards teaches a false affordance | Cursor + hover on real controls only |
| 4.9 | No bounce easing on small elements | 1.2s spring on a 12px chip is comedy | `--ease-loot`, 180–320ms |
| 4.10 | Motion must not imply false causality | A bar that grows when nothing changed | Choreography follows the data |
| 4.11 | No autoplay marquee of logos | The "trusted by" strip | Named customers with a figure, or nothing |
| 4.12 | No bouncing scroll arrow | Impatience dressed as guidance | Labelled Act rail |
| 4.13 | Never hide content behind hover | Touch users lose it entirely | Visible by default |
| 4.14 | Animations must not delay first paint | A gate before value reads as slow | CSS-only load moment |

## §5 Copy — BAN

| # | Rule | Why | Instead |
|---|---|---|---|
| 5.1 | No magic verbs: unlock, elevate, supercharge, transform, revolutionise | Verbs that promise without informing | Plain verbs: pay, divide, settle, hold |
| 5.2 | No unsourced statistics | `99.9% uptime`, `10× faster`, `$2.4B processed` are props | A figure the product model produces, or delete the claim |
| 5.3 | No em-dash triads | `fast — secure — simple` is a generated rhythm | One claim per sentence |
| 5.4 | No middle-dot meta strings | `Order · Speed · Craft` says nothing | Say the actual thing |
| 5.5 | Never narrate the animation | "Watch as the card splits" explains the demo, not the product | Say what the split means for the user |
| 5.6 | No tech badge lists | `Built with Next.js` is for READMEs | — |
| 5.7 | No stock-face testimonials | Undermines every real claim on the page | Named, verifiable, or none |
| 5.8 | No exclamation marks | Enthusiasm is not evidence | — |
| 5.9 | No sentence that fits any fintech | "Take control of your finances" | Name the mechanism: *every payment divides itself before it clears* |
| 5.10 | Numbers or deletion | Adjective-only claims are noise | `offline auth under 400 ms` |
| 5.11 | Banned words | next-gen, seamless, effortless, cutting-edge, AI-powered, game-changing, zero-latency | — |
| 5.12 | No "01 / 005 — PORTAL" style act ids in UI | Internal names leaking into the interface | Human section names |

## §6 Code — BAN

| # | Rule | Why | Instead |
|---|---|---|---|
| 6.1 | No `any` | Erases the contract at the boundary | `unknown` + narrow, or a real type |
| 6.2 | No non-null assertions | `!` hides a lifecycle bug | Guard, or narrow |
| 6.3 | No `as` outside a documented boundary | Casts silently lie | Parse/validate at input, then trust |
| 6.4 | No arbitrary `[]` beyond blueprint §2 | Escaped values drift from the system | Extend `@theme` |
| 6.5 | No inline hex in components | Two sources of truth for one colour | Semantic token |
| 6.6 | One scroll listener for the page | Five listeners × 60fps is jank | `lib/scroll/engine.ts` only |
| 6.7 | No `setState` per frame | 300 renders/second | Write CSS vars, render on semantics |
| 6.8 | Never animate layout properties | Margin/top/width thrash | `transform`, `opacity` |
| 6.9 | Decorative layers need `pointer-events-none` | The commonest dead-CTA bug in this genre | Explicit on every overlay |
| 6.10 | No `!important` | A specificity bug wearing a bandaid | Fix the cascade |
| 6.11 | No speculative code | Single-caller abstractions, unused props, "might need it" | Delete until a second caller exists |
| 6.12 | No comments that narrate code | `// set opacity` teaches nothing | Comment the *why* or nothing |
| 6.13 | `will-change` must be scoped and removed | Permanent promotion wastes GPU memory | Add on enter, remove on settle |

## §7 Mechanical checks

Run before every commit. Each must return nothing (or only the noted file).

```bash
# gradient / glass / cliché backgrounds
rg -n "bg-gradient-to|bg-clip-text|backdrop-blur|from-purple|to-indigo" src

# inline colour values
rg -n "text-\[#|bg-\[#|border-\[#|stroke-\[#" src

# type-safety escapes
rg -n ":\s*any\b|<any>|as [A-Z][A-Za-z]+|\)!" src

# neutral shadows on dark surfaces
rg -n "shadow-(sm|md|lg|xl)\b" src

# banned copy
rg -ni "next-gen|seamless|effortless|cutting-edge|ai-powered|game-changing|zero-latency|unlock the|elevate your" src

# decorative numbering
rg -n "0[1-9]\s*[/·]\s*0[1-9]" src

# infinite loops and fake liveness
rg -n "animate-(pulse|bounce|marquee)|aria-live=\"assertive\"" src

# scroll listeners must exist only in the engine
rg -n "addEventListener\(['\"]scroll" src

# !important
rg -n "!important" src

# stray corner radii outside the 4-radius system (card / panel / full / none)
rg -n "rounded-(sm|md|lg|xl|2xl)\b" src
```

## §8 Review protocol

For each act, capture three states: `p ≈ 0.05` (entry), the dwell plateau, `p ≈ 0.95` (exit),
at `1440×900` and `375×667`. Then answer:

1. **What does this frame tell me that the previous one didn't?** If nothing, the frame is
   decoration.
2. **Could this screenshot belong to another fintech site?** If yes, it is generic.
3. **Where is the one light source, and does every highlight agree with it?**
4. **Is exactly one thing moving?**
5. **Can I read every word without waiting for the scroll to stop?**

Then apply the mirror test: remove one accessory. If the composition improves, it was slop.

## §9 LOOT-specific traps

| Trap | Why it is tempting | Correct behaviour |
|---|---|---|
| Photoreal payment terminal | "More premium" | Flat vector: charcoal slab, 2px lime LED, violet glass, same grain |
| Violet body text on charcoal | Looks branded | Display only; body on violet uses alabaster |
| Lime everywhere | It is the accent | One lime element per viewport |
| Declined state in the hero | Shows the limit honestly | Move it to Act 4, where the user caused it |
| Fake precision (`Rp 479.982`) | Suggests a real engine | Round to a value the rules actually produce |
| Split that does not sum to the charge | Rounding slips | Largest-remainder; assert the invariant |
| Card scaling into a portal | Archetype 01 is proven | The **receipt** becomes the portal — causality, not zoom |
| Terminal discarded after Act 1 | Each act wants a new prop | The terminal is the object dissected in Act 2 |
| Five acts of centred hero type | Consistency | One hero word pair only, in Act 1 |
| Spec table with 8 columns on mobile | Density feels technical | Two columns + labels above, `sm:` for the full table |

---

## §10 Extended architectural & continuity rules — BAN

Hardened lessons from production passes so choreography, copy, and layout stay tightly coupled across viewports.

| # | Rule | Why it reads as generated | Instead |
|---|---|---|---|
| A1 | **Prop-state continuity (zero teleport)** | Switching a shared object to a simplified placeholder across an Act boundary breaks physical illusion | `p = 1.0` of Act $N$ and `p = 0.0` of Act $N+1$ must share identical surface patterns, labels, and card face details |
| A2 | **No information echo** | Repeating the same four numbers across two Acts turns a narrative beat into visual filler | Each Act adds a new dimension: Act 1 proves the *event split*; Act 3 proves *settlement action & vault balance delta* |
| A3 | **Coupled coordinate stage** | Mixing `vw` from viewport center on one object and `rem` from an edge on its target drifts on tablets and ultrawides | Anchor interacting pairs (Card ↔ Terminal, Leader lines ↔ Plates, Iris ↔ Secure Core) to shared responsive CSS tokens |
| A4 | **Surface-aware fixed chrome** | Fixed elements rendered outside `<section>` fail contrast when scrolling from charcoal into alabaster | Track active room polarity (`dark` / `light`) explicitly on global chrome (`ActRail`) |
| A5 | **Cause-and-effect interactivity** | Interactive widgets that only swap colours or cosmetics are toys, not product proof | Controls in Act 4 must drive the real domain model (`splitSpend`, rule presets, and limit enforcement) |
| A6 | **Strict 4-radius lock** | Mixing `rounded-md`, `rounded-lg`, `rounded-xl` weakens physical hardware/paper contrast | Restrict radii strictly to `rounded-card` (18px), `rounded-panel` (24px), `rounded-full` (pill), and `rounded-none` / hairline |
| A7 | **Zero 3D / motion text occlusion** | Extruding plates or docking cards that rise into headlines or labels destroy legibility | Give 3D projection stages dedicated vertical/horizontal bounding clearance so moving plates never cross text at any `p ∈ [0, 1]` |
| A8 | **Structured stage framing (55–75% occupancy)** | Leaving >40% of a sticky `100svh` stage empty makes the page feel barren and uninformative | Frame every stage with contextual top/bottom telemetry strips and multi-column domain data |
| A9 | **Balanced triad chromatic hierarchy** | Starving `#B9F500` to invisible 1px lines leaves dark & light acts cold and monotonous | Pair `#18181C` (structural mass & high-contrast headers), `#723BFA` (engine/circuit depth), and `#B9F500` (live execution badges, primary vault bars & active nodes) |

