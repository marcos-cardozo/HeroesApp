import { PortalSlide } from '@/lib/types';
import { EmptyHint, ImageTile, PortalSection } from './ui';

export function SlidesSection({ slides }: { slides: PortalSlide[] }) {
  return (
    <PortalSection title="Diapositivas" tag="Slide 03">
      {slides.length === 0 ? (
        <EmptyHint>Sin diapositivas registradas todavía.</EmptyHint>
      ) : (
        <div className="space-y-6">
          {slides.map((slide, idx) => (
            <article key={slide.id} className="panel p-6 sm:p-8">
              <div className="flex items-baseline justify-between mb-4">
                <h3
                  className="font-display text-lg font-medium"
                  style={{ color: 'var(--ink)' }}
                >
                  {slide.title || `Diapositiva ${idx + 1}`}
                </h3>
                <span className="mono-label">
                  {`Slide ${String(idx + 1).padStart(2, '0')}`}
                </span>
              </div>

              {slide.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                  {slide.images.map((image) => (
                    <ImageTile
                      key={image.id}
                      src={image.imageUrl}
                      alt={`Diapositiva ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
                {slide.narrativeText}
              </p>
            </article>
          ))}
        </div>
      )}
    </PortalSection>
  );
}
