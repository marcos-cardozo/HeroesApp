'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthGuard } from '@/components/AuthGuard';
import { AppHeader } from '@/components/AppHeader';
import { getAuthToken, removeAuthToken } from '@/lib/api';
import { User } from '@/lib/types';

function DashboardContent() {
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
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12">
        <p className="mono-label mb-3">— Dashboard</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--ink)' }}>
          ¡Bienvenido{user?.nombre ? `, ${user.nombre}` : ''}!
        </h1>
        <p className="text-sm mb-10" style={{ color: 'var(--ink-muted)' }}>
          Estás autenticado correctamente en Heroes App.
        </p>

        <div className="divider mb-8" />

        {user && (
          <div className="panel p-6 max-w-md">
            <p className="mono-label mb-4">Perfil</p>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline gap-4">
                <span className="text-sm" style={{ color: 'var(--ink-muted)' }}>ID</span>
                <span className="font-mono text-xs" style={{ color: 'var(--ink)' }}>{user.id}</span>
              </div>
              <div className="divider" />
              <div className="flex justify-between items-baseline gap-4">
                <span className="text-sm" style={{ color: 'var(--ink-muted)' }}>Email</span>
                <span className="text-sm" style={{ color: 'var(--ink)' }}>{user.email}</span>
              </div>
              <div className="divider" />
              <div className="flex justify-between items-baseline gap-4">
                <span className="text-sm" style={{ color: 'var(--ink-muted)' }}>Nombre</span>
                <span className="text-sm" style={{ color: 'var(--ink)' }}>{user.nombre}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
