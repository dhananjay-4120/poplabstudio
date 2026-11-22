'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Decorative shapes that bob on their own and drift with the mouse (desktop).
 * Writes --mx/--my on the wrapper; each shape multiplies them by its own depth in CSS.
 */
export default function FloatField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        ref.current?.style.setProperty('--mx', x.toFixed(3));
        ref.current?.style.setProperty('--my', y.toFixed(3));
      });
    };
    el.addEventListener('pointermove', onMove);
    return () => {
      el.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="float-field pointer-events-none absolute inset-0" aria-hidden="true">
      {/* cobalt dot */}
      <span className="shape hidden lg:block" style={{ ['--d' as string]: 40, left: '44%', top: '86%' }}>
        <span className="bob block h-14 w-14 rounded-full border-2 border-black bg-cobalt" style={{ animationDelay: '-1s' }} />
      </span>
      {/* pink pill */}
      <span className="shape hidden lg:block" style={{ ['--d' as string]: -60, left: '64%', top: '2.5%' }}>
        <span className="bob-tilt block h-10 w-24 rounded-full border-2 border-black bg-blush" />
      </span>
      {/* black sparkle */}
      <span className="shape" style={{ ['--d' as string]: 70, right: '6%', top: '8%' }}>
        <svg viewBox="0 0 40 40" className="spin-slow h-10 w-10 sm:h-12 sm:w-12">
          <path d="M20 0 C22 14 26 18 40 20 C26 22 22 26 20 40 C18 26 14 22 0 20 C14 18 18 14 20 0Z" fill="#000" />
        </svg>
      </span>
      {/* white ring */}
      <span className="shape hidden md:block" style={{ ['--d' as string]: -35, left: '60%', top: '82%' }}>
        <span className="bob block h-16 w-16 rounded-full border-[6px] border-black bg-transparent" style={{ animationDelay: '-2.5s' }} />
      </span>
    </div>
  );
}
