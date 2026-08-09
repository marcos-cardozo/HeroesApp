'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi, setAuthToken } from '@/lib/api';
import { AuthResponse } from '@/lib/types';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ nombre?: string; email?: string; password?: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { nombre?: string; email?: string; password?: string } = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response: AuthResponse = await authApi.register({
        email: formData.email,
        password: formData.password,
        nombre: formData.nombre,
      });

      setAuthToken(response.access_token);
      router.push('/dashboard');
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string | string[] } } };
        const message = err.response?.data?.message;
        if (Array.isArray(message)) {
          setApiError(message[0]);
        } else if (typeof message === 'string') {
          setApiError(message);
        } else {
          setApiError('Error al registrar. Intenta de nuevo.');
        }
      } else {
        setApiError('Error al registrar. Intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="quest-bg min-h-screen flex items-center justify-center px-4 py-12">
      <div className="quest-rise w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-14 w-14">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 4L41 10V22C41 32.5 34 39.5 24 44C14 39.5 7 32.5 7 22V10L24 4Z"
                stroke="var(--gold)"
                strokeWidth="1.5"
                fill="rgba(201,164,75,0.08)"
              />
              <path d="M24 14L27.5 21.5L35 22.5L29.5 27.5L31 35L24 31L17 35L18.5 27.5L13 22.5L20.5 21.5L24 14Z" fill="var(--gold)" />
            </svg>
          </div>
          <p className="font-display text-xs tracking-[0.35em] text-[var(--gold)] uppercase mb-2">
            Heroes App
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--parchment)]">
            Forjá tu héroe
          </h1>
          <p className="mt-2 text-sm text-[var(--parchment-muted)]">
            Creá tu cuenta y empezá tu primera misión
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="quest-panel p-8 sm:p-9 space-y-6">
          <span className="bracket-tl" aria-hidden="true" />
          <span className="bracket-tr" aria-hidden="true" />
          <span className="bracket-bl" aria-hidden="true" />
          <span className="bracket-br" aria-hidden="true" />

          {apiError && (
            <div className="rounded-sm px-4 py-3 text-sm border" style={{ background: 'var(--blood-soft)', borderColor: 'var(--blood)', color: '#f0c9c6' }}>
              {apiError}
            </div>
          )}

          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-xs font-medium tracking-wider uppercase text-[var(--parchment-muted)] mb-2">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className={`quest-input w-full px-4 py-3 rounded-sm ${errors.nombre ? 'field-error' : ''}`}
              placeholder="Tu nombre"
              disabled={isLoading}
            />
            {errors.nombre && (
              <p className="mt-1.5 text-sm" style={{ color: '#e08b85' }}>{errors.nombre}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-medium tracking-wider uppercase text-[var(--parchment-muted)] mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`quest-input w-full px-4 py-3 rounded-sm ${errors.email ? 'field-error' : ''}`}
              placeholder="tu@email.com"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm" style={{ color: '#e08b85' }}>{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-xs font-medium tracking-wider uppercase text-[var(--parchment-muted)] mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`quest-input w-full px-4 py-3 rounded-sm ${errors.password ? 'field-error' : ''}`}
              placeholder="••••••••"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1.5 text-sm" style={{ color: '#e08b85' }}>{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="quest-btn w-full py-3 px-4 rounded-sm font-semibold tracking-wide flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Registrando...
              </>
            ) : (
              'Crear cuenta'
            )}
          </button>
        </form>

        {/* Link to login */}
        <p className="text-center text-[var(--parchment-muted)] mt-6 text-sm">
          ¿Ya tenés cuenta?{' '}
          <Link href="/login" className="text-[var(--gold)] hover:text-[var(--gold-bright)] font-medium transition-colors">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
