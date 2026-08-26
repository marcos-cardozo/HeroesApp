'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '@/lib/api';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
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

  return <>{children}</>;
}
