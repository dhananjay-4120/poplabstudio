import React from 'react';

/** Pop-art starburst badge. Points are generated so the shape stays crisp at any size. */
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

const PATH = burstPath(18, 98, 82);

export default function Starburst({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 208 208" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <path d={PATH} transform="translate(8 8)" fill="#000" />
        <path d={PATH} fill="#FF5E14" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
      </svg>
      <div className="relative grid h-full w-full place-items-center text-center">{children}</div>
    </div>
  );
}
