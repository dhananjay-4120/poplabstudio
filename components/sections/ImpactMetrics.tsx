'use client';

import React from 'react';

const METRICS = [
  { value: '10M+', label: 'Cultural Impressions Delivered', detail: 'Organic & PR reach across media' },
  { value: '3.8×', label: 'Average Revenue Multiple', detail: 'Blended D2C & Commerce scale' },
  { value: '0', label: 'Agency Silos or Handoffs', detail: 'Strategy to checkout execution' },
];

export default function ImpactMetrics() {
  return (
    <section className="w-full py-20 px-6 relative z-10 max-w-5xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
        {METRICS.map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            <span className="font-serif text-5xl sm:text-6xl md:text-7xl font-light text-bone-alabaster tracking-tight mb-2">
              <span className="text-electric-tangerine">{metric.value.slice(-1)}</span>
              {metric.value.slice(0, -1)}
            </span>
            <span className="font-grotesk text-xs uppercase tracking-[0.18em] text-bone-alabaster/80 font-medium mb-1">
              {metric.label}
            </span>
            <span className="font-sans text-xs text-bone-alabaster/40 font-light">
              {metric.detail}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
