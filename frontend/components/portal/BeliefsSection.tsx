import { KeyBelief } from '@/lib/types';
import { EmptyHint, PortalSection } from './ui';

export function BeliefsSection({ beliefs }: { beliefs: KeyBelief[] }) {
  return (
    <PortalSection title="Creencias" tag="Slide 02">
      {beliefs.length === 0 ? (
        <EmptyHint>Sin creencias registradas todavía.</EmptyHint>
      ) : (
        <ul className="space-y-3 max-w-2xl">
          {beliefs.map((belief, idx) => (
            <li key={belief.id} className="panel p-5 flex items-start gap-4">
              <span
                className="mono-label shrink-0 pt-0.5"
                style={{ color: 'var(--accent)' }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
                {belief.text}
              </p>
            </li>
          ))}
        </ul>
      )}
    </PortalSection>
  );
}
