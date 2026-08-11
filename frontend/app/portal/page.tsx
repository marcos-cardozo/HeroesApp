'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthGuard } from '@/components/AuthGuard';
import { AppHeader } from '@/components/AppHeader';
import { getAuthToken, removeAuthToken } from '@/lib/api';
import { PortalOverview, User } from '@/lib/types';

function PortalContent() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [overview, setOverview] = useState<PortalOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          router.push('/login');
          return;
        }

        const [profileRes, portalRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/portal`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (profileRes.ok) {
          setUser(await profileRes.json());
        } else if (profileRes.status === 401) {
          removeAuthToken();
          router.push('/login');
          return;
        }

        if (portalRes.ok) {
          setOverview(await portalRes.json());
        } else if (portalRes.status === 401) {
          removeAuthToken();
          router.push('/login');
          return;
        } else {
          setError('No se pudo cargar el portal. Intentá de nuevo más tarde.');
        }
      } catch {
        setError('No se pudo cargar el portal. Intentá de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--void)' }}>
        <div className="text-center">
          <div
            className="spinner h-8 w-8 border-2 rounded-full mx-auto mb-4"
            style={{ borderColor: 'var(--panel-edge)', borderTopColor: 'var(--accent)' }}
          />
          <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>Cargando portal...</p>
        </div>
      </div>
    );
  }

  const slides = overview?.slides ?? [];
  const moodBoard = overview?.moodBoard ?? [];
  const beliefs = overview?.beliefs ?? [];
  const narrative = overview?.narrative ?? null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--void)' }}>
      <AppHeader userName={user?.nombre} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Encabezado */}
        <p className="mono-label mb-4">— Portal</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
          Tu portal
        </h1>
        <p className="text-base max-w-xl mb-12" style={{ color: 'var(--ink-muted)' }}>
          Mood board, creencias, diapositivas y narrativa. Una visión editorial de quién estás construyendo ser.
        </p>

        {error && (
          <div className="alert-error px-4 py-3 text-sm mb-12 max-w-xl">{error}</div>
        )}

        {/* ===========================================================
            SECCIÓN 01 — MOOD BOARD
           =========================================================== */}
        <section className="mb-20">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--ink)' }}>
              Mood Board
            </h2>
            <span className="mono-label">Slide 01</span>
          </div>
          <div className="divider mb-8" />

          {moodBoard.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
              Sin imágenes en el mood board todavía.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {moodBoard.map((img) => (
                <div
                  key={img.id}
                  className="panel overflow-hidden aspect-square"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.imageUrl}
                    alt="Mood board"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ===========================================================
            SECCIÓN 02 — CREENCIAS
           =========================================================== */}
        <section className="mb-20">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--ink)' }}>
              Creencias
            </h2>
            <span className="mono-label">Slide 02</span>
          </div>
          <div className="divider mb-8" />

          {beliefs.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
              Sin creencias registradas todavía.
            </p>
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
        </section>

        {/* ===========================================================
            SECCIÓN 03 — SLIDES
           =========================================================== */}
        <section className="mb-20">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--ink)' }}>
              Diapositivas
            </h2>
            <span className="mono-label">Slide 03</span>
          </div>
          <div className="divider mb-8" />

          {slides.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
              Sin diapositivas registradas todavía.
            </p>
          ) : (
            <div className="space-y-6">
              {slides.map((slide, idx) => (
                <div key={slide.id} className="panel p-6 sm:p-8">
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="font-display text-lg font-medium" style={{ color: 'var(--ink)' }}>
                      {slide.title || `Diapositiva ${idx + 1}`}
                    </h3>
                    <span className="mono-label">
                      {`Slide ${String(idx + 1).padStart(2, '0')}`}
                    </span>
                  </div>

                  {slide.images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                      {slide.images.map((image) => (
                        <div key={image.id} className="panel overflow-hidden aspect-square">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={image.imageUrl}
                            alt={`Diapositiva ${idx + 1}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
                    {slide.narrativeText}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ===========================================================
            SECCIÓN 04 — PORTAL (narrativa larga) + HALO DE FIRMA
            Único efecto especial de toda la app.
           =========================================================== */}
        <section className="mb-12">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--ink)' }}>
              Portal
            </h2>
            <span className="mono-label">Narrativa</span>
          </div>
          <div className="divider mb-10" />

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
        </section>
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
