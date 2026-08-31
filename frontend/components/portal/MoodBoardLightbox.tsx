'use client';

import { useEffect, useRef } from 'react';

interface MoodBoardLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

/** Visor a pantalla completa. Se cierra con Escape o click fuera de la imagen. */
export function MoodBoardLightbox({ src, alt, onClose }: MoodBoardLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="moodboard-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="moodboard-overlay-btn"
        style={{ position: 'absolute', top: 16, right: 16 }}
      >
        ×
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
    </div>
  );
}
