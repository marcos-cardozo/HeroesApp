'use client';

import { AuthGuard } from '@/components/AuthGuard';
import { AppHeader } from '@/components/AppHeader';
import {
  BeliefsSection,
  MoodBoardSection,
  NarrativeSection,
  SlidesSection,
  usePortalData,
} from '@/components/portal';

function PortalLoading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--void)' }}
    >
      <div className="text-center">
        <div
          className="spinner h-8 w-8 border-2 rounded-full mx-auto mb-4"
          style={{ borderColor: 'var(--panel-edge)', borderTopColor: 'var(--accent)' }}
        />
        <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
          Cargando portal...
        </p>
      </div>
    </div>
  );
}

function PortalContent() {
  const { user, overview, isLoading, error } = usePortalData();

  if (isLoading) return <PortalLoading />;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--void)' }}>
      <AppHeader userName={user?.nombre} />

      <main className="relative flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <p className="mono-label mb-4">— Portal</p>
        <h1
          className="font-display text-4xl sm:text-5xl font-bold mb-4"
          style={{ color: 'var(--ink)' }}
        >
          Tu portal
        </h1>
        <p className="text-base max-w-xl mb-12" style={{ color: 'var(--ink-muted)' }}>
          Mood board, creencias, diapositivas y narrativa. Una visión editorial de
          quién estás construyendo ser.
        </p>

        {error && (
          <div className="alert-error px-4 py-3 text-sm mb-12 max-w-xl">{error}</div>
        )}

        <MoodBoardSection initialImages={overview?.moodBoard ?? []} />
        <BeliefsSection beliefs={overview?.beliefs ?? []} />
        <SlidesSection slides={overview?.slides ?? []} />
        <NarrativeSection narrative={overview?.narrative ?? null} />
      </main>
    </div>
  );
}

export default function PortalPage() {
  return (
    <AuthGuard>
      <PortalContent />
    </AuthGuard>
  );
}
