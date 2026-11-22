'use client';

import React, { useEffect } from 'react';
import Button from '@/components/pop/Button';
import { Container } from '@/components/pop/Section';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Check if error is related to chunk loading failure
    const isChunk =
      error.message?.includes('ChunkLoadError') ||
      error.message?.includes('Loading chunk') ||
      error.message?.includes('dynamically imported module');

    if (isChunk) {
      const key = 'poplab_chunk_retry_timestamp';
      const now = Date.now();
      const last = sessionStorage.getItem(key);
      if (!last || now - parseInt(last, 10) > 10000) {
        sessionStorage.setItem(key, now.toString());
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <main className="w-full pt-36 sm:pt-44 pb-24 sm:pb-32">
      <Container>
        <h1 className="font-display text-section sm:text-[clamp(2.75rem,6.5vw,6rem)] max-w-[18ch]">
          Something broke on our side.
        </h1>
        <p className="mt-6 max-w-[56ch] text-lg sm:text-xl leading-relaxed text-cream/70">
          A newer version of the site may have just gone live, or your connection stalled. Try again, and if it keeps
          happening, head back home.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            size="lg"
            onClick={() => {
              reset();
              window.location.reload();
            }}
          >
            Try again
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            Go home
          </Button>
        </div>
      </Container>
    </main>
  );
}
