'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#FFFFFF',
          color: '#000000',
          fontFamily: 'Arial, Helvetica, sans-serif',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: 440, textAlign: 'center' }}>
          <h1 style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.05, margin: '0 0 12px' }}>Something broke on our side.</h1>
          <p style={{ fontSize: 17, lineHeight: 1.5, margin: '0 0 28px' }}>
            Reload the page to try again. If it keeps happening, message us on WhatsApp at +91 88375 65738.
          </p>
          <button
            onClick={() => {
              reset();
              window.location.reload();
            }}
            style={{
              height: 52,
              padding: '0 28px',
              borderRadius: 999,
              border: '2px solid #000',
              background: '#FF5E14',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '4px 4px 0 0 #000',
            }}
          >
            Reload the page
          </button>
        </div>
      </body>
    </html>
  );
}
