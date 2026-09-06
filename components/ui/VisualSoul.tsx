import React from 'react';

/**
 * Traditional Chinese Vermilion / Electric Orange Seal Stamp
 * Represents the studio's "Qinglü Shanshui x Swiss Editorial" heritage identity.
 */
export function InkSealStamp({
  className = '',
  text = 'POP LAB',
  subtext = 'GROWTH',
  size = 56,
}: {
  className?: string;
  text?: string;
  subtext?: string;
  size?: number;
}) {
  return (
    <div
      className={`inline-flex flex-col items-center justify-center p-2 rounded-lg border-2 border-[#FF5E14] bg-[#FF5E14]/10 text-[#FF5E14] font-mono select-none relative rotate-[-2deg] transition-transform hover:rotate-0 ${className}`}
      style={{ minWidth: size, minHeight: size }}
      title="Pop Lab Studio Verified Seal"
    >
      <div className="text-[10px] font-bold tracking-[0.25em] uppercase leading-none">{text}</div>
      <div className="w-full h-[1px] bg-[#FF5E14]/40 my-1" />
      <div className="text-[8px] tracking-[0.2em] uppercase opacity-90 leading-none">{subtext}</div>
      {/* Hand-carved stone stamp corner notches */}
      <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#FF5E14]" />
      <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#FF5E14]" />
    </div>
  );
}

/**
 * Humanly Hand-Drawn Arrow (Organic, expressive, imperfect stroke)
 * Includes authentic loop-the-loop variants matching user reference drawings.
 */
export function HandDrawnArrow({
  className = '',
  direction = 'right',
  color = '#FF5E14',
}: {
  className?: string;
  direction?: 'right' | 'down' | 'curved' | 'loop-down' | 'loop-up';
  color?: string;
}) {
  if (direction === 'loop-down') {
    return (
      <svg
        className={`inline-block pointer-events-none select-none overflow-visible ${className}`}
        width="64"
        height="44"
        viewBox="0 0 72 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Authentic hand-drawn loop-the-loop downwards (User Ref 2) */}
        <path
          d="M6 12C12 24 22 34 30 32C36 30 36 18 28 19C20 20 22 33 32 35C44 37 56 36 68 36"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-scribble"
        />
        <path
          d="M57 30L68 36L58 43"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (direction === 'loop-up') {
    return (
      <svg
        className={`inline-block pointer-events-none select-none overflow-visible ${className}`}
        width="64"
        height="44"
        viewBox="0 0 72 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Authentic hand-drawn loop-the-loop upwards (User Ref 3) */}
        <path
          d="M6 38C18 38 28 36 33 28C37 20 30 18 28 26C26 34 36 38 48 28C56 20 60 14 65 9"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-scribble"
        />
        <path
          d="M54 11L65 8L64 19"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (direction === 'down') {
    return (
      <svg
        className={`inline-block ${className}`}
        width="28"
        height="44"
        viewBox="0 0 28 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M13.5 2C13 12 11.5 25 14.5 38M14.5 38C11.5 33 6.5 28 3 26M14.5 38C17 32.5 22.5 28 25.5 26"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (direction === 'curved') {
    return (
      <svg
        className={`inline-block ${className}`}
        width="48"
        height="32"
        viewBox="0 0 48 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M3 26C12 28 26 26 38 14M38 14C35 10 32 6 31 3M38 14C33 16 28 17 24 17"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className={`inline-block ${className}`}
      width="44"
      height="24"
      viewBox="0 0 44 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 12.5C12 12 27 11.5 40 12.5M40 12.5C35 9 30 5 28 2M40 12.5C35 15.5 30 19 28 22"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Hand-Drawn Organic Highlight Circle / Loopy Sketch
 * Humanly sketched double-loop that wraps around words with natural hand wobble.
 */
export function HandDrawnHighlight({
  children,
  className = '',
  strokeColor = '#FF5E14',
}: {
  children: React.ReactNode;
  className?: string;
  strokeColor?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute -inset-x-2.5 -inset-y-1.5 w-[calc(100%+20px)] h-[calc(100%+12px)] pointer-events-none z-0 overflow-visible"
        viewBox="0 0 160 50"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Loop 1: Hand-sketched primary loop */}
        <path
          d="M6 34C35 44 125 46 152 32C158 28 156 12 128 8C90 4 25 10 10 22C-2 32 30 46 80 44"
          stroke={strokeColor}
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeDasharray="260"
          className="animate-scribble opacity-90"
        />
        {/* Loop 2: Expressive secondary hand sketch line */}
        <path
          d="M12 36C40 45 120 48 148 34C154 30 152 16 126 11C94 7 32 13 18 24C8 33 36 44 92 42"
          stroke={strokeColor}
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeDasharray="260"
          className="animate-scribble opacity-60"
          style={{ animationDelay: '150ms' }}
        />
      </svg>
    </span>
  );
}

/**
 * Architectural Signal Filtration Diagram
 * Shows: Broad Traffic -> Filter Layer -> Qualified Buyers
 */
export function SignalFiltrationDiagram({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full p-6 sm:p-8 rounded-2xl bg-black/[0.03] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 ${className}`}>
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/10 dark:border-white/10 font-mono text-[11px] uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
          ARCHITECTURAL BLUEPRINT
        </span>
        <span>FIG. 01 // QUALIFIED FILTERING</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative">
        {/* Stage 1 */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#0D1522] border border-black/5 dark:border-white/5 relative">
          <span className="font-mono text-[10px] text-[#FF5E14] uppercase tracking-wider block mb-2">
            PHASE 01 · INGESTION
          </span>
          <h4 className="font-serif text-lg text-[#121824] dark:text-[#F5F2EB] mb-2">Broad Market Reach</h4>
          <p className="font-sans text-xs text-[#121824]/70 dark:text-[#F5F2EB]/60 leading-relaxed">
            Algorithmic distribution across Meta, Google &amp; Search. Millions reached without budget dilution on vanity impressions.
          </p>
          <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 font-mono text-[10px] text-[#121824]/50 dark:text-[#F5F2EB]/40 flex justify-between">
            <span>VOLUME</span>
            <span className="text-[#121824] dark:text-[#F5F2EB] font-bold">100% UNFILTERED</span>
          </div>
        </div>

        {/* Stage 2 */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#0D1522] border-2 border-[#FF5E14]/40 relative shadow-sm">
          <div className="absolute -top-3 left-4 px-2 py-0.5 rounded-full bg-[#FF5E14] text-white font-mono text-[9px] uppercase tracking-wider">
            POPLAB FILTER CORE
          </div>
          <span className="font-mono text-[10px] text-[#FF5E14] uppercase tracking-wider block mb-2 mt-1">
            PHASE 02 · SEPARATION
          </span>
          <h4 className="font-serif text-lg text-[#121824] dark:text-[#F5F2EB] mb-2">Strategic Friction</h4>
          <p className="font-sans text-xs text-[#121824]/70 dark:text-[#F5F2EB]/60 leading-relaxed">
            Negative keyword insulation, multi-question qualifying forms, verified WhatsApp numbers &amp; AOV thresholding.
          </p>
          <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 font-mono text-[10px] text-[#FF5E14] flex justify-between">
            <span>DISCARD RATE</span>
            <span className="font-bold">85% NON-BUYERS</span>
          </div>
        </div>

        {/* Stage 3 */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#0D1522] border border-black/5 dark:border-white/5 relative">
          <span className="font-mono text-[10px] text-[#0E4D7A] dark:text-[#38BDF8] uppercase tracking-wider block mb-2">
            PHASE 03 · TRANSFORMATION
          </span>
          <h4 className="font-serif text-lg text-[#121824] dark:text-[#F5F2EB] mb-2">High-Ticket Consults</h4>
          <p className="font-sans text-xs text-[#121824]/70 dark:text-[#F5F2EB]/60 leading-relaxed">
            High-intent showroom bookings &amp; closed enterprise deals. Server-side CAPI feeds winning conversion signals back to algorithm.
          </p>
          <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 font-mono text-[10px] text-[#121824]/50 dark:text-[#F5F2EB]/40 flex justify-between">
            <span>CONVERSION RATIO</span>
            <span className="text-[#FF5E14] font-bold">3.2x INDUSTRY BENCHMARK</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Server-Side Attribution Schematic Diagram
 */
export function AttributionSignalDiagram({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full p-6 sm:p-8 rounded-2xl bg-black/[0.03] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 ${className}`}>
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/10 dark:border-white/10 font-mono text-[11px] uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D7A] dark:bg-[#38BDF8]" />
          ATTRIBUTION INTEGRITY
        </span>
        <span>CAPI + OCI ENGINE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-white dark:bg-[#0D1522] border border-red-500/20">
          <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest block mb-2">
            TRADITIONAL CLIENT SETUP (BROKEN)
          </span>
          <h4 className="font-serif text-base text-[#121824] dark:text-[#F5F2EB] mb-3">Client Browser Only</h4>
          <ul className="space-y-2 font-mono text-xs text-[#121824]/70 dark:text-[#F5F2EB]/60">
            <li className="flex items-center gap-2">
              <span className="text-red-500">✕</span> iOS 14+ Private Click Measurement drops 35%
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✕</span> Ad-blockers prevent pixel script execution
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✕</span> Bidding algorithm starves on fake zero-conversions
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-[#0D1522] border border-[#FF5E14]/40">
          <span className="font-mono text-[10px] text-[#FF5E14] uppercase tracking-widest block mb-2">
            POPLAB DUAL-STREAM PIPELINE (ROBUST)
          </span>
          <h4 className="font-serif text-base text-[#121824] dark:text-[#F5F2EB] mb-3">Server-Side CAPI + GTM</h4>
          <ul className="space-y-2 font-mono text-xs text-[#121824]/70 dark:text-[#F5F2EB]/60">
            <li className="flex items-center gap-2">
              <span className="text-[#FF5E14]">✓</span> 100% Server-to-server webhook telemetry
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#FF5E14]">✓</span> Offline Conversion Import (OCI) synced to CRM wins
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#FF5E14]">✓</span> Algorithm optimizes for cash deposits, not clicks
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * MountainContourFlourish (Deprecated & silenced)
 * Removed per direct user feedback to eliminate the senseless graph/wave lines across the site.
 */
export function MountainContourFlourish(_props: { className?: string; color?: string }) {
  return null;
}

/**
 * Ref 1: Hand-Drawn Radial Spark Burst
 * 3 curved organic rays radiating outward from a letter, badge, or callout corner.
 */
export function HandDrawnSparkBurst({
  className = '',
  color = '#818cf8',
  size = 32,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg
      className={`inline-block pointer-events-none select-none overflow-visible ${className}`}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Ray 1: Curves upward-right */}
      <path
        d="M16 16C18.5 10.5 22 5.5 27 2"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Ray 2: Curves up-left */}
      <path
        d="M13 18C8.5 15 4 12.5 0.5 11"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Ray 3: Curves down-left */}
      <path
        d="M14 21C9.5 23.5 5 26.5 0.5 28.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Ref 2: Hand-Drawn Loop-the-Loop Downward Arrow
 * Authentic hand-sketched arrow curving downward with a 360-degree loop before the arrowhead.
 */
export function HandDrawnLoopArrowDown({
  className = '',
  color = '#818cf8',
  width = 64,
  height = 44,
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      className={`inline-block pointer-events-none select-none overflow-visible ${className}`}
      width={width}
      height={height}
      viewBox="0 0 72 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 12C12 24 22 34 30 32C36 30 36 18 28 19C20 20 22 33 32 35C44 37 56 36 68 36"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-scribble"
      />
      <path
        d="M57 30L68 36L58 43"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Ref 3: Hand-Drawn Loop-the-Loop Upward Arrow
 * Authentic hand-sketched arrow curving upward with a 360-degree loop pointing up-right.
 */
export function HandDrawnLoopArrowUp({
  className = '',
  color = '#818cf8',
  width = 64,
  height = 44,
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      className={`inline-block pointer-events-none select-none overflow-visible ${className}`}
      width={width}
      height={height}
      viewBox="0 0 72 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 38C18 38 28 36 33 28C37 20 30 18 28 26C26 34 36 38 48 28C56 20 60 14 65 9"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-scribble"
      />
      <path
        d="M54 11L65 8L64 19"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Ref 4: Delicate Monoline Loop Spiral
 * Thin 1.3px editorial flourish with an airy arch, center loop, and organic descent.
 */
export function HandDrawnMonolineSpiral({
  className = '',
  color = '#FF5E14',
  width = 72,
  height = 96,
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      className={`inline-block pointer-events-none select-none overflow-visible ${className}`}
      width={width}
      height={height}
      viewBox="0 0 80 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 18C16 12 36 10 52 20C68 31 72 50 56 58C40 65 34 46 48 38C62 30 74 48 70 68C65 88 48 100 40 108"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-70"
      />
    </svg>
  );
}

/**
 * Hand-Drawn Scribble Connector
 * Connects Process Steps with an organic hand-sketched doodle based on Ref 2 & 3.
 */
export function HandDrawnScribbleConnector({
  className = '',
  color = '#818cf8',
  direction = 'horizontal',
  label = '',
}: {
  className?: string;
  color?: string;
  direction?: 'horizontal' | 'vertical' | 'down-right';
  label?: string;
}) {
  if (direction === 'vertical') {
    return (
      <div className={`flex flex-col items-center justify-center my-3 ${className}`}>
        {label && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#818cf8] mb-1 font-medium">
            {label}
          </span>
        )}
        <HandDrawnLoopArrowDown color={color} width={48} height={36} />
      </div>
    );
  }

  // Horizontal loop connector
  return (
    <div className={`hidden md:flex items-center justify-center relative px-2 ${className}`}>
      <HandDrawnLoopArrowDown color={color} width={64} height={40} />
      {label && (
        <span className="absolute -top-2 font-mono text-[9px] uppercase tracking-wider text-[#818cf8] whitespace-nowrap font-medium">
          {label}
        </span>
      )}
    </div>
  );
}

/**
 * Hand-Drawn Sparkle / Asterisk
 */
export function HandDrawnSparkle({ className = '', color = '#FF5E14' }: { className?: string; color?: string }) {
  return (
    <svg
      className={`inline-block ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2C12.5 7 13 11 18 12C13 13 12.5 17 12 22C11.5 17 11 13 6 12C11 11 11.5 7 12 2Z"
        fill={color}
        className="opacity-80"
      />
    </svg>
  );
}

/**
 * Visual Sprint Process Flow Diagram
 * High-craft SVG connecting Day 0 through Horizontal Scaling.
 */
export function SprintProcessFlowDiagram({ className = '' }: { className?: string }) {
  const steps = [
    { num: '01', phase: 'DAY 0', title: 'Diagnostic Teardown', detail: '30-min live ad screen-share & budget leak identification', tag: 'INPUT' },
    { num: '02', phase: 'WEEK 1', title: 'Attribution & Tracking', detail: 'Server-side CAPI, sGTM, and negative keyword insulation', tag: 'TELEMETRY' },
    { num: '03', phase: 'WEEK 2', title: 'Creative Build & Launch', detail: 'Four format variants tested against single ICP segment', tag: 'DEPLOYMENT' },
    { num: '04', phase: 'WEEK 3+', title: 'Rapid Iteration', detail: 'Weekly pruning of losers and doubling of winning hooks', tag: 'OPTIMIZATION' },
    { num: '05', phase: 'SCALE', title: 'Controlled Expansion', detail: 'Methodical spend scale protecting marginal unit ROAS', tag: 'EXPANSION' },
  ];

  return (
    <div className={`w-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D1522] border border-black/10 dark:border-white/10 shadow-sm ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 pb-4 border-b border-black/10 dark:border-white/10 font-mono text-[11px] uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF5E14]" />
          SPRINT ARCHITECTURE FLOW
        </span>
        <span>CONTINUOUS 5-PHASE CADENCE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {steps.map((s, idx) => (
          <div
            key={s.num}
            className="p-5 rounded-2xl bg-black/[0.02] dark:bg-[#121A2A] border border-black/5 dark:border-white/5 flex flex-col justify-between relative group hover:border-[#FF5E14]/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-serif text-2xl font-bold text-[#FF5E14]">{s.num}</span>
                <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FF5E14]/10 text-[#FF5E14]">
                  {s.phase}
                </span>
              </div>
              <h4 className="font-serif text-base text-[#121824] dark:text-[#F5F2EB] mb-2 leading-snug">
                {s.title}
              </h4>
              <p className="font-sans text-xs text-[#121824]/75 dark:text-[#F5F2EB]/65 font-light leading-relaxed">
                {s.detail}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 font-mono text-[9px] text-[#121824]/50 dark:text-[#F5F2EB]/40 flex items-center justify-between">
              <span>{s.tag}</span>
              {idx < steps.length - 1 && (
                <svg
                  className="hidden md:inline-block w-6 h-3 text-[#FF5E14] overflow-visible"
                  viewBox="0 0 24 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 6C7 4 14 8 22 6M22 6L17 2M22 6L17 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Luxury Showroom & High-Intent Filtering Schematic (Jewellery Case Study)
 */
export function LuxuryShowroomFlowDiagram({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D1522] border border-black/10 dark:border-white/10 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/10 dark:border-white/10 font-mono text-[11px] uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
          HIGH-INTENT QUALIFICATION ENGINE
        </span>
        <span>FIG. 02 // LUXURY JEWELLERY</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl bg-black/[0.02] dark:bg-[#121A2A] border border-black/5 dark:border-white/5">
          <span className="font-mono text-[10px] text-[#FF5E14] uppercase tracking-widest block mb-2">STAGE 01 · SEARCH INTENT</span>
          <h4 className="font-serif text-lg text-[#121824] dark:text-[#F5F2EB] mb-2">Exact-Match Bridal Queries</h4>
          <p className="font-sans text-xs text-[#121824]/75 dark:text-[#F5F2EB]/65 leading-relaxed">
            Ultra-targeted search terms (&ldquo;bespoke uncut diamond bridal set&rdquo;). Negative keyword insulation blocks generic &ldquo;cheap jewellery&rdquo; queries.
          </p>
          <div className="mt-4 font-mono text-[10px] text-[#121824]/60 dark:text-[#F5F2EB]/50">
            CPC FILTER: <span className="text-[#FF5E14] font-bold">₹628 INTENTIONAL</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-black/[0.02] dark:bg-[#121A2A] border-2 border-[#FF5E14]/30">
          <span className="font-mono text-[10px] text-[#FF5E14] uppercase tracking-widest block mb-2">STAGE 02 · QUALIFYING GATE</span>
          <h4 className="font-serif text-lg text-[#121824] dark:text-[#F5F2EB] mb-2">Curated Lookbook Portal</h4>
          <p className="font-sans text-xs text-[#121824]/75 dark:text-[#F5F2EB]/65 leading-relaxed">
            High-definition editorial craftsmanship imagery. Requires prospective brides to select wedding dates and budget range before requesting consultation.
          </p>
          <div className="mt-4 font-mono text-[10px] text-[#FF5E14]">
            DROPOFF: <span className="font-bold">CURIOUS NON-BUYERS REMOVED</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-black/[0.02] dark:bg-[#121A2A] border border-black/5 dark:border-white/5">
          <span className="font-mono text-[10px] text-[#0E4D7A] dark:text-[#38BDF8] uppercase tracking-widest block mb-2">STAGE 03 · CONVERSION</span>
          <h4 className="font-serif text-lg text-[#121824] dark:text-[#F5F2EB] mb-2">In-Person Showroom Visit</h4>
          <p className="font-sans text-xs text-[#121824]/75 dark:text-[#F5F2EB]/65 leading-relaxed">
            5 to 7 high-intent prospective bridal parties booked weekly into physical atelier. Blended purchase conversion over 45% at ₹5L+ average order value.
          </p>
          <div className="mt-4 font-mono text-[10px] text-[#FF5E14] font-bold">
            CLOSED CONSULTATIONS: 5-7 WEEKLY
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Two-Channel Search & Wanderlust Flywheel Schematic (Travel & Holiday Case Studies)
 */
export function TwoChannelFlywheelDiagram({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D1522] border border-black/10 dark:border-white/10 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/10 dark:border-white/10 font-mono text-[11px] uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D7A] dark:bg-[#38BDF8]" />
          TWO-CHANNEL ATTRIBUTION FLYWHEEL
        </span>
        <span>FIG. 03 // BESPOKE TRAVEL</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-black/[0.02] dark:bg-[#121A2A] border border-black/5 dark:border-white/5">
          <span className="font-mono text-[10px] text-[#FF5E14] uppercase tracking-widest block mb-2">CHANNEL A · GOOGLE SEARCH</span>
          <h4 className="font-serif text-lg text-[#121824] dark:text-[#F5F2EB] mb-2">Capturing Active Itinerary Demand</h4>
          <p className="font-sans text-xs text-[#121824]/75 dark:text-[#F5F2EB]/65 leading-relaxed mb-4">
            Captures travelers with active dates (&ldquo;luxury Swiss Alps summer tour&rdquo;). Converts intent directly onto dynamic itinerary landing pages.
          </p>
          <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-black/5 dark:border-white/5 text-[#121824]/70 dark:text-[#F5F2EB]/60">
            <span>DIRECT INTENT CPL</span>
            <span className="text-[#FF5E14] font-bold">₹131 (TARGET ₹130)</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-black/[0.02] dark:bg-[#121A2A] border border-black/5 dark:border-white/5">
          <span className="font-mono text-[10px] text-[#0E4D7A] dark:text-[#38BDF8] uppercase tracking-widest block mb-2">CHANNEL B · META BROAD REELS</span>
          <h4 className="font-serif text-lg text-[#121824] dark:text-[#F5F2EB] mb-2">Seeding Emotional Wanderlust</h4>
          <p className="font-sans text-xs text-[#121824]/75 dark:text-[#F5F2EB]/65 leading-relaxed mb-4">
            High-resolution drone cinematography of private villas and Amalfi cliffside drives. Builds brand familiarity across 11.4L affluent potential travelers.
          </p>
          <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-black/5 dark:border-white/5 text-[#121824]/70 dark:text-[#F5F2EB]/60">
            <span>QUALIFIED REACH</span>
            <span className="text-[#FF5E14] font-bold">11.4L AFFLUENT PROFILES</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Creative Testing Matrix Schematic (Wellness Case Study)
 */
export function CreativeTestingMatrixDiagram({ className = '' }: { className?: string }) {
  const formats = [
    { title: 'Format 01 · Typographic Static', leads: '79 leads', cpl: '$0.52 CPL', status: 'BASELINE' },
    { title: 'Format 02 · Short Testimonial Cut', leads: '32 leads', cpl: '$0.63 CPL', status: 'PAUSED' },
    { title: 'Format 03 · Feature Carousel', leads: '44 leads', cpl: '$0.52 CPL', status: 'MAINTAINED' },
    { title: 'Format 04 · Clinical Empathy Video', leads: '221 leads', cpl: '$0.45 CPL', status: 'WINNER (80% ALLOC)', isWinner: true },
  ];

  return (
    <div className={`w-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D1522] border border-black/10 dark:border-white/10 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/10 dark:border-white/10 font-mono text-[11px] uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
          4-FORMAT SIMULTANEOUS TESTING SPRINT
        </span>
        <span>FIG. 04 // WELLNESS D2C</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {formats.map((f, i) => (
          <div
            key={i}
            className={`p-5 rounded-xl border flex flex-col justify-between ${
              f.isWinner
                ? 'bg-[#FF5E14]/10 border-[#FF5E14] shadow-md'
                : 'bg-black/[0.02] dark:bg-[#121A2A] border-black/5 dark:border-white/5'
            }`}
          >
            <div>
              <span className={`font-mono text-[9px] uppercase tracking-wider block mb-2 ${f.isWinner ? 'text-[#FF5E14] font-bold' : 'text-[#121824]/50 dark:text-[#F5F2EB]/40'}`}>
                {f.status}
              </span>
              <h4 className="font-serif text-base text-[#121824] dark:text-[#F5F2EB] mb-3 leading-snug">
                {f.title}
              </h4>
            </div>
            <div className="pt-3 border-t border-black/5 dark:border-white/5">
              <div className={`font-serif text-xl ${f.isWinner ? 'text-[#FF5E14] font-bold' : 'text-[#121824] dark:text-[#F5F2EB]'}`}>
                {f.cpl}
              </div>
              <div className="font-mono text-[10px] text-[#121824]/60 dark:text-[#F5F2EB]/50">
                {f.leads}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Enterprise Deal Pipeline & InMail Funnel Schematic (LinkedIn Case Study)
 */
export function EnterprisePipelineDiagram({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D1522] border border-black/10 dark:border-white/10 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/10 dark:border-white/10 font-mono text-[11px] uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D7A] dark:bg-[#38BDF8]" />
          ENTERPRISE PIPELINE FILTRATION
        </span>
        <span>FIG. 05 // B2B ENTERPRISE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl bg-black/[0.02] dark:bg-[#121A2A] border border-black/5 dark:border-white/5">
          <span className="font-mono text-[10px] text-[#FF5E14] uppercase tracking-widest block mb-2">TARGET UNIVERSE</span>
          <h4 className="font-serif text-lg text-[#121824] dark:text-[#F5F2EB] mb-2">17,400 ICP Accounts</h4>
          <p className="font-sans text-xs text-[#121824]/75 dark:text-[#F5F2EB]/65 leading-relaxed">
            Curated list of enterprise VP Engineering &amp; CTO profiles at companies with 200+ employees and active cloud spend.
          </p>
          <div className="mt-4 font-mono text-[10px] text-[#121824]/60 dark:text-[#F5F2EB]/50">
            FILTER: <span className="font-bold text-[#121824] dark:text-[#F5F2EB]">SENIOR DECISION-MAKERS ONLY</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-black/[0.02] dark:bg-[#121A2A] border border-black/5 dark:border-white/5">
          <span className="font-mono text-[10px] text-[#FF5E14] uppercase tracking-widest block mb-2">OUTREACH CADENCE</span>
          <h4 className="font-serif text-lg text-[#121824] dark:text-[#F5F2EB] mb-2">54.7% Acceptance Rate</h4>
          <p className="font-sans text-xs text-[#121824]/75 dark:text-[#F5F2EB]/65 leading-relaxed">
            Peer-to-peer technical inquiry angles focused on specific engineering pain points rather than generic sales pitches.
          </p>
          <div className="mt-4 font-mono text-[10px] text-[#FF5E14] font-bold">
            CONVERSION: 54.7% ACCEPTANCE
          </div>
        </div>

        <div className="p-5 rounded-xl bg-black/[0.02] dark:bg-[#121A2A] border border-[#FF5E14]/30">
          <span className="font-mono text-[10px] text-[#0E4D7A] dark:text-[#38BDF8] uppercase tracking-widest block mb-2">QUALIFIED PIPELINE</span>
          <h4 className="font-serif text-lg text-[#121824] dark:text-[#F5F2EB] mb-2">97 Enterprise Demos</h4>
          <p className="font-sans text-xs text-[#121824]/75 dark:text-[#F5F2EB]/65 leading-relaxed">
            97 scheduled sales briefings directly onto AE calendars, yielding over $420,000 in validated qualified enterprise pipeline.
          </p>
          <div className="mt-4 font-mono text-[10px] text-[#FF5E14] font-bold">
            MEETINGS BOOKED: 97 QUALIFIED
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Architectural Residential Interiors Funnel Schematic (Interiors Case Study)
 */
export function ArchitecturalFunnelDiagram({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D1522] border border-black/10 dark:border-white/10 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/10 dark:border-white/10 font-mono text-[11px] uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
          HIGH-AOV ARCHITECTURAL CONSULTATION ENGINE
        </span>
        <span>FIG. 06 // RESIDENTIAL INTERIORS</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl bg-black/[0.02] dark:bg-[#121A2A] border border-black/5 dark:border-white/5">
          <span className="font-mono text-[10px] text-[#FF5E14] uppercase tracking-widest block mb-2">ACQUISITION</span>
          <h4 className="font-serif text-lg text-[#121824] dark:text-[#F5F2EB] mb-2">Architectural Visual Reels</h4>
          <p className="font-sans text-xs text-[#121824]/75 dark:text-[#F5F2EB]/65 leading-relaxed">
            Cinematic walk-throughs of 4,000+ sq ft turnkey villas. Filtered by luxury pin codes and high-net-worth property signals.
          </p>
          <div className="mt-4 font-mono text-[10px] text-[#121824]/60 dark:text-[#F5F2EB]/50">
            MINIMUM PROJECT AOV: <span className="text-[#FF5E14] font-bold">₹25L+</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-black/[0.02] dark:bg-[#121A2A] border-2 border-[#FF5E14]/30">
          <span className="font-mono text-[10px] text-[#FF5E14] uppercase tracking-widest block mb-2">QUALIFICATION</span>
          <h4 className="font-serif text-lg text-[#121824] dark:text-[#F5F2EB] mb-2">Floorplan Consultation Gate</h4>
          <p className="font-sans text-xs text-[#121824]/75 dark:text-[#F5F2EB]/65 leading-relaxed">
            Multi-stage intake requiring homeowners to upload property blueprints and tentative handover timeline before booking.
          </p>
          <div className="mt-4 font-mono text-[10px] text-[#FF5E14] font-bold">
            NON-BUYER BOUNCE: 78% BLOCKED
          </div>
        </div>

        <div className="p-5 rounded-xl bg-black/[0.02] dark:bg-[#121A2A] border border-black/5 dark:border-white/5">
          <span className="font-mono text-[10px] text-[#0E4D7A] dark:text-[#38BDF8] uppercase tracking-widest block mb-2">CLOSE</span>
          <h4 className="font-serif text-lg text-[#121824] dark:text-[#F5F2EB] mb-2">18 Studio Design Pitches</h4>
          <p className="font-sans text-xs text-[#121824]/75 dark:text-[#F5F2EB]/65 leading-relaxed">
            Principal architect 1-on-1 pitch presentations resulting in 6 signed turnkey residential execution contracts in 90 days.
          </p>
          <div className="mt-4 font-mono text-[10px] text-[#FF5E14] font-bold">
            CLOSED CONTRACT VALUE: ₹1.8CR+
          </div>
        </div>
      </div>
    </div>
  );
}

