'use client';

import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface SpotlightCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
}

/**
 * SpotlightCard
 * 
 * Recreates the celebrated Linear / Raycast "spotlight border" aesthetic.
 * Tracks local mouse coordinates on hover to illuminate borders and surfaces.
 * Now equipped with mobile micro-motion physics and touch response.
 */
export default function SpotlightCard({
  children,
  spotlightColor = 'rgba(255, 94, 20, 0.15)',
  className = '',
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -400, y: -400 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`touch-motion-card relative rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0D1522]/85 text-[#121824] dark:text-[#F5F2EB] overflow-hidden group transition-all duration-300 shadow-sm dark:shadow-none hover:shadow-md ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Top Specular Border Glint with subtle ambient glint on mobile */}
      <div className="ambient-card-glint absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-black/[0.08] dark:via-[#FF5E14]/30 to-transparent pointer-events-none z-10" />

      {/* Card Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </motion.div>
  );
}
