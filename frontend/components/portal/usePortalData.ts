'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi, getAuthToken, portalApi } from '@/lib/api';
import { PortalOverview, User } from '@/lib/types';

const LOAD_ERROR = 'No se pudo cargar el portal. Intentá de nuevo más tarde.';

interface PortalData {
  user: User | null;
  overview: PortalOverview | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Carga el perfil del usuario y el overview del portal en paralelo.
 * El manejo de 401 (borrar token + volver al login) lo hace el
 * interceptor de `lib/api.ts`.
 */
export function usePortalData(): PortalData {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [overview, setOverview] = useState<PortalOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getAuthToken()) {
      router.push('/login');
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const [profile, portalOverview] = await Promise.all([
          authApi.getProfile(),
          portalApi.getOverview(),
        ]);
        if (cancelled) return;
        setUser(profile);
        setOverview(portalOverview);
      } catch {
        if (!cancelled) setError(LOAD_ERROR);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return { user, overview, isLoading, error };
}
