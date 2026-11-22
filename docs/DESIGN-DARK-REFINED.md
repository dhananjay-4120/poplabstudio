# Pop Lab Studio — "Dark, refined" design system (Nov 2026)

Matches the brand's Instagram (@poplabstudio.hq): deep blue-black, strong Poplab orange, elegant serif headlines
with an orange accent phrase, cinematic imagery. Premium, international, calm.

Audience: founders and marketing leads of growing D2C, service and B2B brands, in India and internationally.
Job: make Pop Lab feel like a serious, senior studio, then get the visitor to book a 30-minute diagnostic.

## Colour (Tailwind tokens in tailwind.config.ts, CSS vars in app/globals.css)

| Token | Hex | Use |
| --- | --- | --- |
| `night` | #070B14 | Page background (deep ink-blue black) |
| `deep` | #0D1524 | Raised surfaces: cards, panels, inset blocks |
| `navy` | #18284A | Secondary blocks, hover states, the sea/sky in the hero |
| `cream` | #F5F2EB | Primary text, light inverted blocks |
| `pop` | #FF5E14 | Poplab orange: primary buttons, accent phrases, key numbers. Never body text. |
| lines | `border-cream/10` – `border-cream/20` | Hairline borders (1px) |
| muted text | `text-cream/70` (body secondary), `text-cream/55` (meta only, ≥14px) |

Text on `night`/`deep`/`navy` is cream. Text on `cream` blocks is `night`. Text on `pop` is `night`.
Orange text is allowed only at ≥ 20px (headline accents, big numbers) — it passes 3:1 for large text on night.

## Type

- Display: **Cormorant Garamond** (`font-display` / `font-serif`), weight 500–600, tracking -0.01em, line-height 0.95–1.05.
  Sizes: hero `text-hero`, sections `text-section`, sub `text-subsection`.
- Accent: like the Instagram posts, one short phrase per headline may be orange (`<em className="accent">`),
  set in Cormorant italic. Max one accent per headline.
- Body/UI: **Plus Jakarta Sans** (`font-sans`, default), 17px, line-height 1.6, max ~68ch. Labels 14–15px, sentence case.
- No all-caps tracked labels, no monospace.

## Shape & depth

- Hairline borders: `border border-cream/10` (cards), `border-cream/20` (inputs, ghost buttons).
- Radius: buttons `rounded-full`; cards `rounded-2xl`; big blocks `rounded-[2rem]` inset from the page edge.
- No hard offset shadows. Depth comes from surface colour (`night` → `deep` → `navy`) and a soft glow on primary CTAs only.

## Components (components/pop/)
- `Button` variants: `primary` (orange fill, night text), `light` (cream fill), `ghost` (hairline outline), `link`.
- `Section` tones: `night` (default, no block), `deep`, `navy`, `cream`, `pop` (inset rounded blocks).
- `Card`, `Tag`, `PageHeader` — read the files.

## Motion
- Hero: one slow cinematic loop (sun over sea, shimmering reflection, film grain). CSS/SVG only.
- Headline lines rise in once on load. Inner page titles fade/rise once (`title-in`).
- Subtle scroll reveals (`scroll-pop`) on section headings; slow hairline marquee of services.
- Everything respects `prefers-reduced-motion`.

## Copy
Plain, confident, international. No city-based positioning. Results only from data/case-studies.ts.
Ad spend line: "$1M+ in ad spend managed".
