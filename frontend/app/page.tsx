'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '@/lib/api';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

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
