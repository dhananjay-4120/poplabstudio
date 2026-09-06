"use client";

import React, { useEffect, useRef, useState } from "react";

interface CanvasScrollSequenceProps {
  totalFrames: number;
  framePrefix?: string;
  frameExtension?: string;
  folderPath?: string;
  className?: string;
}

export default function CanvasScrollSequence({
  totalFrames,
  framePrefix = "frame_",
  frameExtension = ".webp",
  folderPath = "/sequence",
  className = "",
}: CanvasScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Pad number to 4 digits: 1 -> "0001"
  const padIndex = (num: number) => String(num).padStart(4, "0");

  // Preload all frames into browser memory for 60fps instant scrub
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `${folderPath}/${framePrefix}${padIndex(i)}${frameExtension}`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setLoaded(true);
        }
      };
      imgArray.push(img);
    }
    setImages(imgArray);
  }, [totalFrames, framePrefix, frameExtension, folderPath]);

  // Render frame matching scroll progress
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = rect.height - windowHeight;

      if (scrollableDistance <= 0) return;

      // Calculate 0.0 to 1.0 progress through this section
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

      // Pick corresponding frame index
      const frameIndex = Math.min(
        Math.floor(progress * totalFrames),
        totalFrames - 1
      );

      const currentImg = images[frameIndex];
      if (currentImg && currentImg.complete) {
        // Clear & draw image keeping aspect ratio cover
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const hRatio = canvas.width / currentImg.width;
        const vRatio = canvas.height / currentImg.height;
        const ratio = Math.max(hRatio, vRatio);
        
        const centerShiftX = (canvas.width - currentImg.width * ratio) / 2;
        const centerShiftY = (canvas.height - currentImg.height * ratio) / 2;

        ctx.drawImage(
          currentImg,
          0,
          0,
          currentImg.width,
          currentImg.height,
          centerShiftX,
          centerShiftY,
          currentImg.width * ratio,
          currentImg.height * ratio
        );
      }
    };

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(render);
    };

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
      }
    });

    render();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [images, loaded, totalFrames]);

  return (
    <div ref={containerRef} className={`relative h-[400vh] w-full ${className}`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
        />
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black text-white/50 text-sm">
            Loading animation frames...
          </div>
        )}
      </div>
    </div>
  );
}