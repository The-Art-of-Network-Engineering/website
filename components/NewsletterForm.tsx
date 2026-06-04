'use client';

import { useEffect, useRef } from 'react';

// Beehiiv v3 subscribe form ID for "The Shortest Path".
// The loader script injects the form into the container it's appended to.
const BEEHIIV_FORM_ID = 'e33e6a8f-eb96-4900-a2df-0133e76553a3';

export function NewsletterForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (container.querySelector('script[data-beehiiv-form]')) return;

    const script = document.createElement('script');
    script.src = 'https://subscribe-forms.beehiiv.com/v3/loader.js';
    script.async = true;
    script.setAttribute('data-beehiiv-form', BEEHIIV_FORM_ID);
    container.appendChild(script);
  }, []);

  return <div ref={containerRef} />;
}
