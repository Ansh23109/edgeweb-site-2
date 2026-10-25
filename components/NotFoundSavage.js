'use client';

import { useEffect, useState } from 'react';

// Detects (client-side only — not-found.js has no route params to read)
// whether this 404 was reached by someone following an old link to the
// since-removed founder bio pages, and shows a sharper aside aimed at
// them specifically. Everyone else still gets the base line.
export default function NotFoundSavage() {
  const [targeted, setTargeted] = useState(false);

  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('founder') || path.includes('ansh') || path.includes('aneesh')) {
      setTargeted(true);
    }
  }, []);

  return (
    <p className="nf-savage">
      {targeted && (
        <span className="nf-savage-aim">Looking for Ansh or Aneesh&apos;s page? It&apos;s gone.</span>
      )}
      Don&apos;t support? Fine. Just don&apos;t jinx the journey.
    </p>
  );
}
