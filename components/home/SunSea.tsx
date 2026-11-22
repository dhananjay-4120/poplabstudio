import React from 'react';

// Reflection bars under the sun: y offset below the horizon, half-width, and shimmer delay.
const BARS = [
  { y: 14, w: 150, d: 0 },
  { y: 34, w: 128, d: -0.6 },
  { y: 56, w: 140, d: -1.4 },
  { y: 80, w: 104, d: -2.1 },
  { y: 106, w: 118, d: -0.9 },
  { y: 134, w: 86, d: -2.8 },
  { y: 164, w: 98, d: -1.7 },
  { y: 196, w: 64, d: -3.2 },
  { y: 230, w: 76, d: -0.3 },
  { y: 266, w: 46, d: -2.4 },
  { y: 304, w: 54, d: -1.1 },
];

const HORIZON = 640;
const SUN_X = 800;

/**
 * Cinematic hero scene drawn in SVG: a sun rising over a deep-blue sea with a shimmering reflection,
 * drifting haze and film grain. No video, no JavaScript; all motion is CSS and respects reduced motion.
 */
export default function SunSea({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="ss-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#070B14" />
            <stop offset="0.45" stopColor="#0C1529" />
            <stop offset="0.66" stopColor="#1B2440" />
            <stop offset="0.74" stopColor="#4A2A2C" />
            <stop offset="0.8" stopColor="#B4471C" />
          </linearGradient>
          <radialGradient id="ss-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FF7A33" stopOpacity="0.7" />
            <stop offset="0.35" stopColor="#FF5E14" stopOpacity="0.28" />
            <stop offset="1" stopColor="#FF5E14" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ss-sun" cx="0.45" cy="0.4" r="0.6">
            <stop offset="0" stopColor="#FFE2C4" />
            <stop offset="0.35" stopColor="#FF9A5C" />
            <stop offset="0.75" stopColor="#FF5E14" />
            <stop offset="1" stopColor="#D9480B" />
          </radialGradient>
          <linearGradient id="ss-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1C2645" />
            <stop offset="0.35" stopColor="#111A30" />
            <stop offset="1" stopColor="#070B14" />
          </linearGradient>
          <linearGradient id="ss-bar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FF5E14" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FF8A4C" stopOpacity="0.95" />
            <stop offset="1" stopColor="#FF5E14" stopOpacity="0" />
          </linearGradient>
          <clipPath id="ss-above">
            <rect x="0" y="0" width="1600" height={HORIZON} />
          </clipPath>
          <filter id="ss-blur" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        {/* sky */}
        <rect width="1600" height={HORIZON} fill="url(#ss-sky)" />

        {/* sun glow + sun, clipped at the horizon */}
        <g clipPath="url(#ss-above)">
          <circle className="glow-pulse" cx={SUN_X} cy={HORIZON - 20} r="520" fill="url(#ss-glow)" />
          <circle className="sun-rise" cx={SUN_X} cy={HORIZON - 30} r="132" fill="url(#ss-sun)" />
        </g>

        {/* drifting haze bands across the sky */}
        <g className="drift" opacity="0.18" filter="url(#ss-blur)">
          {[0, 1600].map((dx) => (
            <g key={dx} transform={`translate(${dx} 0)`}>
              <ellipse cx="300" cy={HORIZON - 110} rx="380" ry="16" fill="#F5F2EB" />
              <ellipse cx="1100" cy={HORIZON - 60} rx="300" ry="10" fill="#FFB27A" />
              <ellipse cx="760" cy={HORIZON - 190} rx="260" ry="12" fill="#F5F2EB" />
            </g>
          ))}
        </g>

        {/* sea */}
        <rect y={HORIZON} width="1600" height={1000 - HORIZON} fill="url(#ss-sea)" />
        <line x1="0" y1={HORIZON} x2="1600" y2={HORIZON} stroke="#FFB27A" strokeOpacity="0.55" strokeWidth="1.5" />

        {/* shimmering reflection */}
        <g>
          {BARS.map((b) => (
            <rect
              key={b.y}
              className="shimmer"
              style={{ animationDelay: `${b.d}s` }}
              x={SUN_X - b.w}
              y={HORIZON + b.y}
              width={b.w * 2}
              height={Math.max(3, 9 - b.y / 45)}
              rx="4"
              fill="url(#ss-bar)"
            />
          ))}
        </g>

        {/* faint wave lines drifting across the sea */}
        <g className="drift" opacity="0.14">
          {[0, 1600].map((dx) => (
            <g key={dx} transform={`translate(${dx} 0)`} stroke="#F5F2EB" strokeWidth="1.5" strokeLinecap="round">
              <line x1="120" y1={HORIZON + 60} x2="320" y2={HORIZON + 60} />
              <line x1="1180" y1={HORIZON + 120} x2="1420" y2={HORIZON + 120} />
              <line x1="420" y1={HORIZON + 200} x2="700" y2={HORIZON + 200} />
              <line x1="980" y1={HORIZON + 280} x2="1140" y2={HORIZON + 280} />
            </g>
          ))}
        </g>
      </svg>

      {/* film grain */}
      <div className="absolute inset-[-10%] grain opacity-[0.09] mix-blend-overlay">
        <svg className="h-full w-full">
          <filter id="ss-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#ss-noise)" />
        </svg>
      </div>
    </div>
  );
}
