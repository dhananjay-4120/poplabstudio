# Project: Pop Lab Studio Homepage

## Architecture
Pop Lab Studio (`poplabstudio.com`) is a high-craft creative growth studio. The homepage is built on Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS. It integrates an interactive WebGL background canvas using `shadergradient` and `@react-three/fiber` tied to Lenis smooth scrolling, featuring curated typography pairings, strict anti-slop craftsmanship, direct-response brand positioning, and automated Puppeteer headless verification.

### System Architecture
1. **Core Framework**: Next.js 15 (App Router), React 19, TypeScript (strict).
2. **Design Tokens & Styling**: Tailwind CSS with CSS variables in `globals.css` representing Pop Lab's brand palette:
   - Electric Tangerine (`#FF5E14` / `rgb(255, 94, 20)`)
   - Maritime Azure (`#0E4D7A` / `rgb(14, 77, 122)`)
   - Twilight Indigo (`#1A2436` / `rgb(26, 36, 54)`)
   - Bone Alabaster (`#F5F2EB` / `rgb(245, 242, 235)`)
   - Deep Void Background (`#090D14`)
3. **Curated Typography**:
   - Display Serif: `Cormorant Garamond` (variable weights + italic) & `Italiana` (statuesque Roman titles).
   - Technical Body & Accents: `Plus Jakarta Sans` (body copy) & `Space Grotesk` (uppercase kickers, tags, counters).
   - Loaded via `next/font/google` in `app/layout.tsx` for zero CLS.
4. **Interactive 3D / WebGL Background**:
   - `@shadergradient/react` + `@react-three/fiber` (v9) + `three` in Client Component (`"use client"`).
   - Local 3D lighting (`lightType="3d"`) to avoid external remote HDR fetches.
   - Pop Lab brand colors mapped to `color1`, `color2`, `color3`.
   - Dynamic motion synchronized with Lenis smooth scroll velocity via RAF refs (zero React state thrashing).
5. **Brand Positioning & Content Narrative**:
   - Hero: *"We make brands impossible to ignore."* / *"Story First. Growth Always."*
   - Manifesto: *"Marketing shouldn't live in silos."*
   - 3-Engine Capability Architecture:
     1. Brand Engine (*Strategy + Creative + Content*)
     2. Attention Engine (*PR + Creators + AI Search/GEO*)
     3. Growth Engine (*Performance + Quick Commerce/Blinkit + CRO*)
   - Direct-Response Primary CTA: *"Let's Make Your Brand Matter →"*
6. **Anti-Slop Craftsmanship Standard**:
   - ZERO generic Lucide icon badge spam on cards.
   - Fine typographic line accents (`—`), numbered steps (`01`, `02`, `03`), high-contrast whitespace.
   - Blurred liquid glass navigation pill (`backdrop-blur-xl bg-twilight-indigo/60 border border-bone-alabaster/10`).
   - ZERO horizontal overflow (`overflow-x: hidden`).
7. **Verification Harness**:
   - Standalone Puppeteer script (`scripts/verify-ui.mjs` or `scripts/audit.mjs`).
   - Asserts HTTP 200, WebGL canvas context active, fonts loaded, zero console errors.
   - Generates `audit_desktop.png` (1920x1080) and `audit_mobile.png` (390x844).

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Next.js 15 & TS Scaffold | Initialize Next.js 15 App Router with TypeScript strict mode, package.json, next.config.mjs, tsconfig.json | M1 | Survey 1 |
| 2 | Tailwind CSS & Token Architecture | Tailwind setup with CSS custom properties in globals.css for 4 brand tokens + deep void | M1 | Survey 2 |
| 3 | Curated Typography Integration | Google fonts loading in layout.tsx: Cormorant Garamond, Italiana, Plus Jakarta Sans, Space Grotesk | M1 | Survey 2 |
| 4 | Liquid Glass Navbar | Responsive blurred navigation bar with liquid glass styling and contact anchor | M1 | R1, R3 |
| 5 | WebGL ShaderGradient Canvas | Fluid 3D background canvas with Pop Lab brand colors (azure, tangerine, indigo) & lightType="3d" | M2 | R2, Survey 3 |
| 6 | Lenis Smooth Scroll Sync | Lenis smooth scroll provider coupled with optical shader motion via animation refs | M2 | R2, Survey 3 |
| 7 | Hero Section | "We make brands impossible to ignore." + "Story First. Growth Always." + primary CTA | M3 | R3, Survey 2 |
| 8 | Anti-Silo Manifesto Section | "Marketing shouldn't live in silos." contrarian direct-response agency critique | M3 | R3, Survey 2 |
| 9 | 3-Engine Capability Architecture | Brand Engine, Attention Engine, and Growth Engine cards with zero icon spam | M3 | R3, Survey 2 |
| 10 | Studio Philosophy & Direct CTA | Studio pillars, direct founder access trust badges, and conversion CTA button | M3 | R3, Survey 2 |
| 11 | Headless Puppeteer Audit Script | Automated Puppeteer script testing localhost:3000, WebGL context, overflow, console errors | M4 | R4, Survey 3 |
| 12 | Visual Verification Artifacts | Execution of audit script generating audit_desktop.png (1920x1080) and audit_mobile.png (390x844) | M4 | R4, Survey 3 |
| 13 | Forensic Integrity Audit | Systematic forensic audit verifying authentic implementation and zero cheating | M5 | Integrity Policy |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Frontend Architecture & Anti-Slop UI/UX | Project initialization, Next.js 15 App Router, TypeScript, Tailwind CSS, Google Fonts, brand tokens, layout shell, liquid glass navbar | none | DONE |
| M2 | Interactive 3D & Shader Experience | WebGL ShaderGradient background canvas, Three.js / R3F integration, Lenis smooth scrolling | M1 | DONE |
| M3 | Brand Positioning & Content Engine | Complete homepage content: Hero, Anti-Silo Manifesto, 3-Engine Architecture, Philosophy, Direct CTA, responsive layout | M1, M2 | DONE |
| M4 | Verification & Headless Screenshots | Dev server boot, Puppeteer automated test script execution, capturing audit_desktop.png & audit_mobile.png | M1, M2, M3 | PLANNED |
| M5 | Forensic Integrity & Sentinel Sign-off | Forensic audit verification, full review gating, completion report to Sentinel | M4 | PLANNED |

---

## Interface Contracts

### M1 ↔ M2: Layout & Canvas Mounting
- `app/layout.tsx` exposes root layout with `<body className="bg-[#090D14] text-[#F5F2EB] antialiased overflow-x-hidden">`.
- `components/canvas/ShaderBackground.tsx` is a Client Component mounted with `next/dynamic({ ssr: false })` positioned as `fixed inset-0 -z-10 pointer-events-none`.
- Semi-transparent dark overlay ensures text contrast meets WCAG AAA.

### M2 ↔ M3: Scroll Velocity & Canvas Motion
- Lenis instance provides scroll velocity / progress.
- Canvas animation loop reads scroll velocity without triggering React state re-renders.
- Section components in `components/sections/` render in normal DOM flow with `relative z-10`.

### M3 ↔ M4: Verification Selectors & Endpoints
- Dev server serves `http://localhost:3000` with HTTP 200 OK.
- DOM renders `<canvas>` element with active WebGL context.
- Section IDs `#top`, `#hero`, `#manifesto`, `#engines`, `#philosophy`, `#contact` available.
- Zero elements with `.lucide` icons inside capability/engine cards.
- Viewport `document.documentElement.scrollWidth <= window.innerWidth` at 1920px and 390px.

---

## Code Layout
```
D:\website_developer/
├── app/
│   ├── layout.tsx             # Root layout: Cormorant, Italiana, Jakarta, Space Grotesk fonts + metadata
│   ├── page.tsx               # Pop Lab Studio homepage (Hero, Manifesto, 3-Engine Architecture, CTA)
│   ├── globals.css            # Tailwind directives, color tokens, liquid-glass styles, scrollbar styling
│   └── favicon.ico
├── components/
│   ├── canvas/
│   │   ├── ShaderBackground.tsx   # Client component with dynamic ShaderGradient
│   │   └── ViewportCanvas.tsx     # Three.js / R3F wrapper with fallback
│   ├── navigation/
│   │   └── Navbar.tsx             # Floating liquid glass pill navbar
│   ├── sections/
│   │   ├── Hero.tsx               # "We make brands impossible to ignore."
│   │   ├── Manifesto.tsx          # "Marketing shouldn't live in silos."
│   │   ├── EngineArchitecture.tsx # 3-Engine cards (Brand, Attention, Growth) with fine lines & no icon spam
│   │   ├── Philosophy.tsx         # Studio standards / pillars
│   │   └── ContactCTA.tsx         # "Let's Make Your Brand Matter →"
│   └── ui/
│       ├── SmoothScroll.tsx       # Lenis client wrapper
│       └── MagneticButton.tsx     # Emil Kowalski spring physics button
├── scripts/
│   └── verify-ui.mjs          # Puppeteer script: captures audit_desktop.png (1920x1080) & audit_mobile.png (390x844)
├── package.json
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.mjs
```
