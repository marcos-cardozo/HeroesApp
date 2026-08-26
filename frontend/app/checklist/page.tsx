<<<<<<< HEAD
'use client';

import { AuthGuard } from '@/components/AuthGuard';
import { AppHeader } from '@/components/AppHeader';

function ChecklistContent() {
  return (
    <div className="quest-bg min-h-screen">
      <AppHeader />
      <main className="max-w-6xl mx-auto px-4 py-16 flex items-center justify-center">
        <div className="quest-panel relative w-full max-w-lg p-10 text-center">
          <span className="bracket-tl" aria-hidden="true" />
          <span className="bracket-tr" aria-hidden="true" />
          <span className="bracket-bl" aria-hidden="true" />
          <span className="bracket-br" aria-hidden="true" />
          <h1 className="font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--gold)' }}>
            Checklist
          </h1>
          <p className="mt-3 text-sm" style={{ color: 'var(--parchment-muted)' }}>
            Próximamente
          </p>
        </div>
      </main>
    </div>
  );
}

export default function ChecklistPage() {
  return (
    <AuthGuard>
      <ChecklistContent />
    </AuthGuard>
=======
import { ComingSoonPage } from '@/components/ComingSoonPage';

export default function ChecklistPage() {
  return (
    <ComingSoonPage
      eyebrow="— Módulo 04"
      title="Checklist"
      description="Listas mínimas y efectivas. Tachá lo hecho, avanzá sin ruido."
    />
>>>>>>> 03678f32c1a5e7f1b1df29389ff3e8c036972211
  );
}
