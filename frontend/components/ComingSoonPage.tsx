'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthGuard } from '@/components/AuthGuard';
import { AppHeader } from '@/components/AppHeader';
import { getAuthToken, removeAuthToken } from '@/lib/api';
import { User } from '@/lib/types';

interface ComingSoonPageProps {
  eyebrow: string;
  title: string;
  description: string;
}

function ComingSoonContent({ eyebrow, title, description }: ComingSoonPageProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          removeAuthToken();
          router.push('/login');
        }
      } catch {
        removeAuthToken();
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--void)' }}>
        <div className="text-center">
          <div
            className="spinner h-8 w-8 border-2 rounded-full mx-auto mb-4"
            style={{ borderColor: 'var(--panel-edge)', borderTopColor: 'var(--accent)' }}
          />
          <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--void)' }}>
      <AppHeader userName={user?.nombre} />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <p className="mono-label mb-4">{eyebrow}</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
          {title}
        </h1>
        <p className="text-base max-w-xl mb-10" style={{ color: 'var(--ink-muted)' }}>
          {description}
        </p>
        <div className="divider mb-8" />
        <div className="panel p-8 sm:p-10 max-w-xl">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full mb-4"
            style={{ background: 'var(--accent)' }}
            aria-hidden="true"
          />
          <p className="font-display text-xl font-medium mb-2" style={{ color: 'var(--ink)' }}>
            Próximamente
          </p>
          <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
            Esta sección está en desarrollo. Volvé pronto.
          </p>
        </div>
      </main>
    </div>
  );
}

export function ComingSoonPage({ eyebrow, title, description }: ComingSoonPageProps) {
  return (
    <AuthGuard>
      <ComingSoonContent eyebrow={eyebrow} title={title} description={description} />
    </AuthGuard>
  );
}
