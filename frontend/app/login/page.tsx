"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authApi, setAuthToken } from "@/lib/api";
import { AuthResponse } from "@/lib/types";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
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
      const response: AuthResponse = await authApi.login({
        email: formData.email,
        password: formData.password,
      });
      console.log("Login successful:", response);
      setAuthToken(response.access_token);
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const err = error as {
          response?: {
            status?: number;
            data?: { message?: string | string[] };
          };
        };
        if (err.response?.status === 401) {
          setApiError(
            "Credenciales incorrectas. Verificá tu email y contraseña.",
          );
        } else {
          const message = err.response?.data?.message;
          if (Array.isArray(message)) {
            setApiError(message[0]);
          } else if (typeof message === "string") {
            setApiError(message);
          } else {
            setApiError("Error al iniciar sesión. Intenta de nuevo.");
          }
        }
      } else {
        setApiError("Error al iniciar sesión. Intenta de nuevo.");
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
            <Image
              src="/logo.png"
              alt="Heroes App"
              width={56}
              height={56}
              className="h-full w-full"
              priority
            />
          </div>
          <p className="font-display text-xs tracking-[0.35em] text-(--gold) uppercase mb-2">
            Heroes App
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-(--parchment)">
            Bienvenido de vuelta
          </h1>
          <p className="mt-2 text-sm text-(--parchment-muted)">
            Iniciá sesión para continuar tu misión
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="quest-panel p-8 sm:p-9 space-y-6"
        >
          <span className="bracket-tl" aria-hidden="true" />
          <span className="bracket-tr" aria-hidden="true" />
          <span className="bracket-bl" aria-hidden="true" />
          <span className="bracket-br" aria-hidden="true" />

          {apiError && (
            <div
              className="rounded-sm px-4 py-3 text-sm border"
              style={{
                background: "var(--blood-soft)",
                borderColor: "var(--blood)",
                color: "#f0c9c6",
              }}
            >
              {apiError}
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium tracking-wider uppercase text-(--parchment-muted) mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`quest-input w-full px-4 py-3 rounded-sm ${errors.email ? "field-error" : ""}`}
              placeholder="tu@email.com"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm" style={{ color: "#e08b85" }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium tracking-wider uppercase text-(--parchment-muted) mb-2"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={`quest-input w-full px-4 py-3 rounded-sm ${errors.password ? "field-error" : ""}`}
              placeholder="••••••••"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1.5 text-sm" style={{ color: "#e08b85" }}>
                {errors.password}
              </p>
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
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Iniciando sesión...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>

        {/* Link to register */}
        <p className="text-center text-(--parchment-muted) mt-6 text-sm">
          ¿No tenés cuenta?{" "}
          <Link
            href="/register"
            className="text-(--gold) hover:text-(--gold-bright) font-medium transition-colors"
          >
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}
