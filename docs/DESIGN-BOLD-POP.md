# Pop Lab Studio — "Bold Pop" design system (Nov 2026)

Subject: a Chandigarh creative growth studio that builds the brand, earns attention and runs paid growth as one team.
Audience: founders and marketing leads of Indian D2C, local-service and B2B brands.
Primary job: show that Pop Lab *thinks* before it shouts, then get the visitor to book a 30-minute diagnostic.

The idea: **the lab notebook, printed as a pop poster.** Every strategy is an experiment:
problem → insight → bet → result. We show that chain loudly, with real numbers from real campaigns.

## Colour (CSS vars in app/globals.css, Tailwind names in tailwind.config.ts)

| Token | Hex | Tailwind | Use |
| --- | --- | --- | --- |
| Ink | #000000 | `ink` | All text, 2px outlines, hard shadows |
| Paper | #FFFFFF | `paper` | Page background |
| Pop orange | #FF5E14 | `pop` | Brand. Primary buttons, the CTA block, key highlights |
| Lemon | #FFE14D | `lemon` | Section blocks, stickers, selection colour |
| Cobalt | #2B3FFF | `cobalt` | Links on hover, attention engine, secondary blocks (white text on it) |
| Blush | #FFC2DC | `blush` | Soft block colour, used rarely (one place per page) |
| Fog | #F2F2EE | `fog` | Quiet panels, form fields |

Rules: text is always Ink on light colours, or Paper on Ink/Cobalt. Never put orange text on white for body copy (contrast) — orange is a fill colour.
No gradients, no glass, no glows, no blur.

## Type

One family: **Archivo** (variable, weight 100–900, width 62–125), loaded with next/font as `--font-archivo`.

- Display (`.font-display` / `font-display` utility): Archivo, `font-stretch: 125%`, weight 800–900, tracking -0.02em, line-height 0.92–1.0. Headlines are BIG: hero `clamp(3rem, 9vw, 8.5rem)`, section `clamp(2.25rem, 5vw, 4.5rem)`.
- Body: Archivo width 100%, weight 400/500, 17–18px, line-height 1.55, max 68ch.
- Small labels: Archivo 500, 14px, sentence case. **No all-caps tracked eyebrows, no monospace labels.**
- No single italic/coloured word accents inside headlines. If a headline needs emphasis, the whole line gets a Lemon highlighter box (`.mark`), used at most once per page.

## Shape & depth

- Outline: `border-2 border-ink`.
- Pop shadow: `shadow-hard` = `6px 6px 0 0 #000` (cards, buttons), `shadow-hard-sm` = `4px 4px 0 0 #000`.
- Radius by hierarchy: buttons and tags fully round (`rounded-full`); content cards `rounded-2xl`; big colour sections `rounded-[2rem]` on desktop inset from the edge; images `rounded-xl`.
- Buttons press: on hover translate(-2px,-2px) + larger shadow; on active translate(2px,2px) + no shadow.

## Layout

- Container: `max-w-[1240px] mx-auto px-5 sm:px-8`.
- Left-aligned everywhere except the final CTA block.
- Sections alternate Paper with one full-colour block (Lemon / Cobalt / Ink / Pop) — never two coloured blocks back to back.
- Numbered markers only where content is a real sequence (the thinking chain, the 5-stage process).

## Motion

- One orchestrated moment: the hero thinking board "pops" its four steps in on load (stagger, spring). Respect `prefers-reduced-motion`.
- Everything else moves only in response to the user (tabs, hover press, menu open).
- No fade-up-on-scroll for every section.

## Copy

Plain, active, specific. Say what we do and for whom. Buttons say what happens ("Book a 30-minute diagnostic", "Message us on WhatsApp", "See the case study"). No arrows appended to button text. No jargon like "cultural gravity", "high-velocity", "telemetry".
Only numbers that come from data/case-studies.ts (they're backed by Ads Manager screenshots) may be shown as results.

## Shared components (components/pop/)

- `Button` — variants `primary` (Pop fill), `ink`, `outline`, `lemon`; `href` renders Link (or `<a>` for external).
- `Section` — padding + container; `tone` = paper | lemon | cobalt | ink | pop | fog.
- `PageHeader` — inner-page hero: small context line, display headline, lede, optional actions.
- `Tag` — rounded-full outlined chip.
- `Card` — outlined card with pop shadow.
