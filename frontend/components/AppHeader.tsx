'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { removeAuthToken } from '@/lib/api';

interface AppHeaderProps {
  userName?: string | null;
}

const NAV_ITEMS: { href: string; label: string }[] = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/portal', label: 'Portal' },
  { href: '/habits', label: 'Hábitos' },
  { href: '/calendar', label: 'Calendario' },
  { href: '/checklist', label: 'Checklist' },
  { href: '/boss-fight', label: 'Boss Fight' },
];

export function AppHeader({ userName }: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    removeAuthToken();
    router.push('/login');
  };

  return (
    <header
      className="border-b"
      style={{ borderColor: 'var(--panel-edge)', background: 'var(--void)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: 'var(--accent)' }}
            aria-hidden="true"
          />
          <span className="mono-label" style={{ color: 'var(--ink)' }}>
            Heroes
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className="mono-label px-3 py-2 rounded-[3px] transition-colors whitespace-nowrap"
                style={{
                  color: isActive ? 'var(--ink)' : 'var(--ink-muted)',
                  background: isActive ? 'var(--accent-soft)' : 'transparent',
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          {userName && (
            <span
              className="hidden sm:block text-xs"
              style={{ color: 'var(--ink-muted)' }}
            >
              {userName}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="btn-ghost text-xs px-3 py-2"
          >
            Salir
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <nav
        className="md:hidden flex items-center gap-1 overflow-x-auto px-4 pb-3"
        style={{ borderColor: 'var(--panel-edge)' }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="mono-label px-2.5 py-1.5 rounded-[3px] transition-colors whitespace-nowrap"
              style={{
                color: isActive ? 'var(--ink)' : 'var(--ink-muted)',
                background: isActive ? 'var(--accent-soft)' : 'transparent',
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
