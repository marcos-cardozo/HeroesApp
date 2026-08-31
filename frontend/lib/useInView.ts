'use client';

import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /** Si es true (default) se dispara una sola vez y no vuelve a ocultarse. */
  once?: boolean;
  /** Margen del root para adelantar/atrasar el disparo. */
  rootMargin?: string;
  /** Fracción del elemento que debe verse para contar como visible. */
  threshold?: number;
}

/**
 * Devuelve un ref y un booleano `inView` que pasa a true cuando el elemento
 * entra en el viewport. Pensado para animaciones de aparición al scrollear.
 */
export function useInView<T extends HTMLElement = HTMLElement>({
  once = true,
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.12,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Entorno sin IntersectionObserver: mostrar sin animar (en el próximo
    // frame, para no llamar setState de forma síncrona dentro del efecto).
    if (typeof IntersectionObserver === 'undefined') {
      const raf = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
