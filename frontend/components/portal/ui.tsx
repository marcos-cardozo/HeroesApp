import { ReactNode } from 'react';

/**
 * Encabezado de sección del portal: título + etiqueta mono + divisor.
 * Los márgenes son configurables porque la sección de narrativa usa un
 * espaciado distinto al resto.
 */
export function PortalSection({
  title,
  tag,
  children,
  className = 'mb-20',
  dividerClassName = 'mb-8',
}: {
  title: string;
  tag: string;
  children: ReactNode;
  className?: string;
  dividerClassName?: string;
}) {
  return (
    <section className={className}>
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--ink)' }}>
          {title}
        </h2>
        <span className="mono-label">{tag}</span>
      </div>
      <div className={`divider ${dividerClassName}`} />
      {children}
    </section>
  );
}

/** Texto gris para el estado vacío de una sección. */
export function EmptyHint({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
      {children}
    </p>
  );
}

/** Tile cuadrado con imagen recortada (mood board y slides). */
export function ImageTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="panel overflow-hidden aspect-square">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
    </div>
  );
}
