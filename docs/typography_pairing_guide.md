# 🎨 Typography & Font Pairing Master Guide (Pop Lab Studio)

This guide provides proven font pairing formulas, Google Fonts imports, and CSS code snippets for building modern, high-end agency websites and client landers.

---

## 📂 1. Installed Typography Skills & Repositories

| Repository / Skill | Location | Primary Purpose |
| :--- | :--- | :--- |
| **`wondelai-skills`** | `D:\antigravity_scratch\wondelai-skills` | Agent skill for visual hierarchy, fluid scale calculations, and readability scoring. |
| **`fonttrio`** | `D:\antigravity_scratch\fonttrio` | Curated registry of 3-font typography pairing systems with pre-configured CSS variables. |
| **`mengto-skills`** | `D:\antigravity_scratch\.agents\skills\mengto-skills` | High-craft typography hierarchy rules for Framer-style web interfaces. |
| **`impeccable`** | `D:\antigravity_scratch\impeccable` | Negative-prompt steering rules banning default Inter fonts in favor of curated Google Fonts. |

---

## 🔥 2. Top Proven Font Combination Formulas

### Formula A: Luxury Editorial & Home Decor (e.g. Zarapie)
*   **Headline Font:** `Fraunces` or `Playfair Display` (Serif — Elegant & High-End)
*   **Body Font:** `Inter Tight` or `Plus Jakarta Sans` (Sans-Serif — Clean & Readable)
*   **Accent/Badge Font:** `Space Mono` (Monospace — Modern Technical Contrast)

```css
/* Google Font Import */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Inter+Tight:wght@400;500;600&family=Space+Mono&display=swap');

:root {
  --font-display: 'Fraunces', serif;
  --font-body: 'Inter Tight', sans-serif;
  --font-mono: 'Space Mono', monospace;
}
```

---

### Formula B: AI Agency & Framer-Style Web (e.g. Pop Lab Studio)
*   **Headline Font:** `Outfit` or `Cabinet Grotesk` (Geometric Sans — Punchy & Modern)
*   **Body Font:** `Inter` or `Geist Sans` (Sans-Serif — Crisp & Neutral)
*   **Code/Metrics Font:** `JetBrains Mono` or `Fira Code` (Technical Precision)

```css
/* Google Font Import */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-display: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

### Formula C: EdTech & Coding Platform (e.g. Coding Masters)
*   **Headline Font:** `Syne` or `Space Grotesk` (Bold Tech Aesthetic)
*   **Body Font:** `DM Sans` or `Outfit` (Friendly & Accessible)
*   **Code Snippet Font:** `Fira Code` or `Source Code Pro` (Monospace with Ligatures)

```css
/* Google Font Import */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@400;500;700&family=Fira+Code:wght@400;500&display=swap');

:root {
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'Fira Code', monospace;
}
```

---

## ⚡ 3. The 3 Rules for High-End Typography

1. **Limit File Loads:** Load a maximum of 2–3 font families per project to maintain fast page speeds (`font-display: swap;`).
2. **Strict Size Scale:** Use a consistent typographic scale (e.g., `h1: clamp(2.5rem, 5vw, 4.5rem)`, `body: 1rem / 1.6 line-height`).
3. **Contrast Over Similarity:** Pair a Serif headline with a Sans-Serif body, or pair a heavy geometric font (`Outfit 700`) with a light body font (`Inter 400`). Never pair two similar fonts.
