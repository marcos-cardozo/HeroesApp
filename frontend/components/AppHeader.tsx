'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import api, { authApi } from '@/lib/api';
import { User } from '@/lib/types';

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Habits', href: '/habits' },
  { label: 'Calendar', href: '/calendar' },
  { label: 'Portal', href: '/portal' },
  { label: 'Boss Fight', href: '/boss-fight' },
  { label: 'Checklist', href: '/checklist' },
];

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        const data: User = await authApi.getProfile();
        if (active) setUser(data);
      } catch {
        if (active) setUser(null);
      }
    };

    const loadBalance = async () => {
      try {
        const response = await api.get<{ balance: number }>('/fragments/balance');
        if (active) setBalance(response.data.balance);
      } catch {
        if (active) setBalance(null);
      } finally {
        if (active) setBalanceLoading(false);
      }
    };

    loadProfile();
    loadBalance();

    return () => {
      active = false;
    };
  }, []);

  // Cerrar menú al cambiar de ruta
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem('accessToken');
    router.push('/login');
    setIsLoggingOut(false);
    closeMobileMenu();
  };

  const initial = user?.nombre?.trim()?.charAt(0)?.toUpperCase() || '?';

  return (
    <header
      className="w-full sticky top-0 z-50"
      style={{
        background: 'var(--panel)',
        borderBottom: '1px solid var(--panel-edge)',
      }}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        {/* Top row: greeting + fragments/avatar */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 py-3 sm:py-4">
          <div className="flex-1 min-w-0">
            <p
              className="font-display text-sm sm:text-base md:text-lg lg:text-xl truncate"
              style={{ color: 'var(--parchment)' }}
            >
              Bienvenido, <span style={{ color: 'var(--gold)' }}>{user?.nombre ?? '—'}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Fragments balance */}
            <div
              className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm"
              style={{ color: 'var(--parchment)' }}
              title="Fragmentos"
            >
              <svg
                width="16"
                height="16"
                className="sm:w-[18px] sm:h-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 3h12l3 6-9 12L3 9l3-6Z"
                  stroke="var(--gold)"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  fill="rgba(201,164,75,0.18)"
                />
                <path
                  d="M3 9h18M9 3 12 21 15 3M9 3l3 6 3-6"
                  stroke="var(--gold)"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{ color: 'var(--gold)' }} className="font-semibold tabular-nums">
                {balanceLoading || balance === null ? '—' : balance}
              </span>
            </div>

            {/* Avatar */}
            <div
              className="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full font-display text-xs sm:text-sm font-semibold select-none flex-shrink-0"
              style={{
                background: 'var(--gold-dim)',
                color: 'var(--gold)',
                border: '1px solid var(--gold)',
              }}
              title={user?.nombre ?? ''}
            >
              {initial}
            </div>

            {/* Botón hamburguesa para mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-1.5 rounded-lg transition-colors hover:bg-white/5"
              aria-label="Menú de navegación"
              style={{ color: 'var(--parchment)' }}
            >
              <span
                className="block w-5 h-0.5 transition-all duration-300"
                style={{
                  background: 'var(--parchment)',
                  transform: isMobileMenuOpen ? 'rotate(45deg) translateY(2.5px)' : 'none',
                }}
              />
              <span
                className="block w-5 h-0.5 transition-all duration-300"
                style={{
                  background: 'var(--parchment)',
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-0.5 transition-all duration-300"
                style={{
                  background: 'var(--parchment)',
                  transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-2.5px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

        {/* Nav tabs - Desktop */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto pb-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm whitespace-nowrap transition-colors relative"
                style={{
                  color: isActive ? 'var(--gold)' : 'var(--parchment-muted)',
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: 'var(--gold)' }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Nav tabs - Mobile (dropdown) */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-0.5 pb-3 pt-1 border-t border-white/5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2.5 text-sm transition-colors rounded-lg"
                  style={{
                    color: isActive ? 'var(--gold)' : 'var(--parchment-muted)',
                    background: isActive ? 'rgba(124,108,255,0.08)' : 'transparent',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            
            {/* Separador y logout en mobile */}
            <div className="border-t border-white/5 my-2" />
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="px-3 py-2.5 text-sm transition-colors rounded-lg flex items-center gap-2 hover:bg-white/5 w-full"
              style={{ color: 'var(--blood)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;