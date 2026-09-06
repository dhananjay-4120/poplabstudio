# 🍏 Apple Canvas Scroll Sequence Template

Use this template to create buttery-smooth, 60fps frame scrubbing landing pages.

## Step 1: Extract Video Frames
Place your 2-5s video (e.g. `product_morph.mp4`) in your project and run:
```bash
python scripts/extract_frames.py product_morph.mp4 -o ./public/sequence --fps 30
```

## Step 2: Drop into your Next.js Page
```tsx
import CanvasScrollSequence from "./components/CanvasScrollSequence";

export default function HeroSection() {
  return (
    <section className="relative w-full">
      {/* The 400vh Scroll Canvas */}
      <CanvasScrollSequence 
        totalFrames={90} 
        folderPath="/sequence" 
      />

      {/* Your Text / Headings pinned over the canvas */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white tracking-tight">
          Crafted to Perfection.
        </h1>
      </div>
    </section>
  );
}
```