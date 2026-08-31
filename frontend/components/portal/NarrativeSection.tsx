import { PortalNarrative } from '@/lib/types';
import { PortalSection } from './ui';

export function NarrativeSection({
  narrative,
}: {
  narrative: PortalNarrative | null;
}) {
  return (
    <PortalSection
      title="Portal"
      tag="Narrativa"
      className="mb-12"
      dividerClassName="mb-10"
    >
      <div className="portal-halo relative">
        <div className="panel p-8 sm:p-12 max-w-3xl mx-auto">
          <p className="mono-label mb-6">— Tu narrativa</p>
          {narrative ? (
            <p
              className="font-display text-lg sm:text-xl leading-relaxed whitespace-pre-wrap"
              style={{ color: 'var(--ink)' }}
            >
              {narrative.text}
            </p>
          ) : (
            <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
              Aún no escribiste tu narrativa. Cuando lo hagas, aparecerá acá —
              rodeada por el único resplandor de toda la app.
            </p>
          )}
        </div>
      </div>
    </PortalSection>
  );
}
