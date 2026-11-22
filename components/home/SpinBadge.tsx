import React from 'react';

function burstPath(points: number, outer: number, inner: number, cx = 100, cy = 100) {
  const step = Math.PI / points;
  let d = '';
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = i * step - Math.PI / 2;
    d += `${i === 0 ? 'M' : 'L'}${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }
  return d + 'Z';
}
const BURST = burstPath(16, 70, 58);
const RING_TEXT = 'brand  •  content  •  paid ads  •  AI search  •  growth  •  ';

/**
 * Spinning starburst inside a rotating ring of text, with a rolling "$1M+" counter.
 * All motion is CSS, so it costs no JavaScript and respects reduced-motion.
 */
export default function SpinBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`relative aspect-square ${className}`}>
      {/* rotating text ring */}
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="ring" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
        </defs>
        <circle cx="100" cy="100" r="99" fill="#fff" stroke="#000" strokeWidth="2" />
        <text fontSize="12.5" fontWeight="800" letterSpacing="1.5" fill="#000" style={{ fontStretch: '125%' }}>
          <textPath href="#ring" textLength="548" lengthAdjust="spacing">{RING_TEXT}</textPath>
        </text>
      </svg>
      {/* counter-rotating burst */}
      <svg viewBox="0 0 200 200" className="spin-rev absolute inset-[13%] h-[74%] w-[74%] overflow-visible" aria-hidden="true">
        <path d={BURST} transform="translate(4 4)" fill="#000" />
        <path d={BURST} fill="#FF5E14" stroke="#000" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      <p className="absolute inset-0 grid place-items-center text-center">
        <span className="-rotate-[8deg]">
          <span className="block text-[11px] sm:text-[13px] lg:text-[14px] font-bold">We’ve managed</span>
          <span className="font-display flex items-center justify-center leading-none my-1 text-[1.8rem] sm:text-[2.2rem] lg:text-[2.35rem]">
            $<span className="roll" aria-hidden="true"><span className="roll-track"><span>0</span><span>3</span><span>7</span><span>2</span><span>9</span><span>5</span><span>1</span></span></span>
            <span className="sr-only">1</span>M+
          </span>
          <span className="block text-[11px] sm:text-[13px] lg:text-[14px] font-bold">in ad spend</span>
        </span>
      </p>
    </div>
  );
}
