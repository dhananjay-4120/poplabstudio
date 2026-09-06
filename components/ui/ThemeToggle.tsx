'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Minimal Icon-Only Theme Toggle (Pop Lab Studio)
 * Pure icon toggle (44x44px ergonomic touch target).
 * Zero text, zero clutter. Directly switches between Light and Dark modes.
 */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const applyTheme = (dark: boolean) => {
      const root = document.documentElement;
      if (dark) {
        root.classList.add('dark');
        root.classList.remove('light');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        root.style.colorScheme = 'light';
      }
      setIsDark(dark);
    };

    // Check stored preference or system preference
    const stored = localStorage.getItem('poplab-theme');
    if (stored === 'light') {
      applyTheme(false);
    } else if (stored === 'dark') {
      applyTheme(true);
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(systemDark);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    const root = document.documentElement;
    if (nextDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
      localStorage.setItem('poplab-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.colorScheme = 'light';
      localStorage.setItem('poplab-theme', 'light');
    }
  };

  if (!mounted) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed bottom-6 right-6 z-50 select-none"
      aria-label="Theme Controller"
    >
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className={`w-11 h-11 rounded-full backdrop-blur-2xl border transition-all duration-300 shadow-2xl flex items-center justify-center active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] group ${
          isDark
            ? 'bg-[#0D1522]/90 border-white/15 text-[#F5F2EB] hover:border-[#FF5E14]/60 hover:shadow-[0_0_25px_rgba(255,94,20,0.35)]'
            : 'bg-white/95 border-black/15 text-[#121824] hover:border-[#FF5E14]/60 hover:shadow-[0_0_25px_rgba(255,94,20,0.2)]'
        }`}
      >
        {isDark ? (
          /* Sun Icon (Click to activate light) */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF5E14"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        ) : (
          /* Moon Icon (Click to activate dark) */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF5E14"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4.5 h-4.5 transition-transform duration-300 group-hover:-rotate-12"
            aria-hidden="true"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </button>
    </motion.aside>
  );
}
