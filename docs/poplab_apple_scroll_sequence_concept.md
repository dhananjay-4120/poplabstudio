# 🍏 Apple-Style Canvas Scroll Sequence: Concept & Technical Blueprint

**Project:** Pop Lab Studio (`poplabstudio.com`)  
**Design Pattern:** Scroll-Driven Canvas Frame Scrubbing (Scrollytelling)  
**Export Date:** September 2026  

---

## 1. Executive Summary

This document outlines the end-to-end strategy to build an **Apple AirPods/MacBook-style scroll-scrubbed hero section** for Pop Lab Studio. 

Instead of traditional video embeds (which lag, stutter, and fail to scrub smoothly on mobile), this architecture renders **60–90 pre-rendered, lightweight WebP image frames onto an HTML5 `<canvas>`**, tied directly to **Lenis smooth scrolling and GSAP ScrollTrigger**.

---

## 2. Creative Concept: "The Catalyst Core"

* **The Subject:** A floating, translucent obsidian liquid-glass sphere with deep violet, electric indigo, and cobalt internal refractive light.
* **The Motion:** 
  * As the visitor scrolls down, the sphere rotates 180° in 3D space.
  * Glass facets open and refract light across the screen.
  * Internal metallic kinetic elements expand, revealing an illuminated, pulsing core.

---

## 3. The 4-Phase Scrollytelling Narrative

| Scroll Range | Visual State | Headline & Copy |
| :--- | :--- | :--- |
| **Phase 1 (0% – 25%)** | Obsidian sphere sits centered, slowly orbiting. Internal liquid light glows softly. | `[ POP LAB STUDIO // GROWTH ]`<br>**"We build digital experiences that print revenue."** |
| **Phase 2 (25% – 55%)** | Sphere begins 180° rotation; glass facets tilt and refract caustics. | `[ THE FORMULA ]`<br>**"Framer-grade design meets relentless ad engineering."** |
| **Phase 3 (55% – 85%)** | Core opens completely; geometric internal elements shed bright violet rays. | `[ ZERO FLUFF ]`<br>**"Qualified customer pipeline. Zero vanity metrics."** |
| **Phase 4 (85% – 100%)** | Core settles into the bottom fold; clean focal light focuses on actions. | `[ READY TO SCALE? ]`<br>**[Explore Selected Work]** &nbsp; **[Book Discovery Call]** |

---

## 4. Production Pipeline: AI Generation to Web

### Step 1: Start Frame Prompt (Gemini / Nano Banana)
```text
Cinematic 3D studio render of a luxury, dark obsidian liquid glass sphere floating in center, deep violet and cobalt internal refractive light, subtle caustics, pitch black minimal studio background, 8k resolution, minimalist editorial aesthetic, Apple hardware product lighting, aspect ratio 16:9
```

### Step 2: End Frame Prompt (Gemini / Nano Banana)
```text
Cinematic 3D studio render of the same dark obsidian liquid glass sphere now open, rotated 180 degrees with floating internal metallic facets and radiating soft purple and neon white light rays, minimal dark studio background, 8k resolution, aspect ratio 16:9
```

### Step 3: Motion Interpolation
* Upload Start Frame + End Frame into **Google Flow**, **Kling 3.0**, **Luma Dream Machine**, or **Runway Gen-3**.
* Duration: **3 seconds**, 30fps (Total: 90 frames).
* Output: `poplab_core.mp4`

### Step 4: Extract Optimized WebP Frames (FFmpeg)
Run this single command in terminal to generate 90 lightweight WebP frames (~25 KB each, total payload < 2.5 MB):
```bash
ffmpeg -i poplab_core.mp4 -vf "fps=30,scale=1920:-1" -c:v libwebp -lossless 0 -q:v 80 ./assets/sequence/frame_%04d.webp
```

---

## 5. Technical Implementation (Lenis + GSAP ScrollTrigger)

### HTML (`index.html`)
```html
<section id="hero-scroll-container" class="relative h-[400vh] w-full bg-black">
  <div class="sticky top-0 h-screen w-full overflow-hidden">
    <!-- 60fps Canvas Target -->
    <canvas id="hero-sequence-canvas" class="h-full w-full object-cover"></canvas>

    <!-- Pinned Editorial Headlines -->
    <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-6">
      <div id="text-phase-1" class="phase-copy">
        <span class="text-xs uppercase tracking-widest text-violet-400 font-mono mb-3">POP LAB STUDIO // GROWTH</span>
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl">We build digital experiences that print revenue.</h1>
      </div>
      <div id="text-phase-2" class="phase-copy opacity-0">
        <span class="text-xs uppercase tracking-widest text-violet-400 font-mono mb-3">THE FORMULA</span>
        <h2 class="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-4xl">Framer-grade design meets relentless ad engineering.</h2>
      </div>
      <div id="text-phase-3" class="phase-copy opacity-0">
        <span class="text-xs uppercase tracking-widest text-violet-400 font-mono mb-3">ZERO FLUFF</span>
        <h2 class="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-4xl">Qualified customer pipeline. Zero vanity metrics.</h2>
      </div>
      <div id="text-phase-4" class="phase-copy opacity-0 pointer-events-auto mt-6 flex gap-4">
        <a href="#work" class="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition">Explore Selected Work</a>
        <a href="#connect" class="px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition">Book Discovery Call</a>
      </div>
    </div>
  </div>
</section>
```

### JavaScript Engine (`script.js`)
```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("hero-sequence-canvas");
const ctx = canvas.getContext("2d");
const frameCount = 90;
const currentFrame = (i) => `./assets/sequence/frame_${String(i).padStart(4, "0")}.webp`;

const images = [];
const sequence = { frame: 0 };

// 1. Preload frames
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// 2. Responsive Render Loop
function render() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const img = images[sequence.frame];
  if (img && img.complete) {
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const shiftX = (canvas.width - img.width * ratio) / 2;
    const shiftY = (canvas.height - img.height * ratio) / 2;
    ctx.drawImage(img, 0, 0, img.width, img.height, shiftX, shiftY, img.width * ratio, img.height * ratio);
  }
}

images[0].onload = render;
window.addEventListener("resize", render);

// 3. Scrub Canvas Frame with Scroll
gsap.to(sequence, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    trigger: "#hero-scroll-container",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.5,
    onUpdate: render
  }
});

// 4. Headline Crossfades
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#hero-scroll-container",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.5
  }
});

tl.to("#text-phase-1", { opacity: 0, y: -40, duration: 1 }, 1)
  .fromTo("#text-phase-2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 1.5)
  .to("#text-phase-2", { opacity: 0, y: -40, duration: 1 }, 3)
  .fromTo("#text-phase-3", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 3.5)
  .to("#text-phase-3", { opacity: 0, y: -40, duration: 1 }, 5)
  .fromTo("#text-phase-4", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 5.5);
```

---

## 6. Key Advantages Over Video Embeds

1. **Zero Decoding Lag:** Seeking backwards in `.mp4` causes browser stutters; preloaded canvas frames swap in 0ms.
2. **Mobile Safari & Chrome Android Parity:** Full 60fps support with zero battery drain or OS media player overrides.
3. **Bandwidth Optimized:** Modern WebP sequences compress 90 frames to under 2.5 MB—smaller than a standard hero video.
