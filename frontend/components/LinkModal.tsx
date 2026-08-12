'use client';

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';

export interface LinkModalProps {
  open: boolean;
  title?: string;
  submitLabel?: string;
  label?: string;
  placeholder?: string;
  initialValue?: string;
  onSubmit: (value: string) => Promise<void> | void;
  onClose: () => void;
  /**
   * Elemento que abrió el modal. Recibe el foco cuando el modal se cierra.
   * Si se omite, se intenta devolver el foco al último elemento enfocado.
   */
  triggerRef?: React.RefObject<HTMLElement | null>;
  /** Contenido extra bajo el input (p.ej. previsualización). */
  children?: ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function LinkModal({
  open,
  title = 'Agregar link',
  submitLabel = 'Agregar',
  label = 'URL',
  placeholder = 'https://...',
  initialValue = '',
  onSubmit,
  onClose,
  triggerRef,
  children,
}: LinkModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Autofocus + Escape. El estado se reinicia en cada apertura porque el
  // componente se desmonta al cerrar (ver `if (!open) return null` abajo),
  // por lo que useState(initialValue) arranca limpio cada vez.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);

    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);

    // No bloqueamos el scroll global: el overlay es absoluto al contenedor
    // central, así que el header y el resto de la página siguen siendo
    // navegables.

    const triggerEl = triggerRef?.current ?? null;
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', handleKey);
      const target = triggerEl ?? previouslyFocused;
      if (target && typeof target.focus === 'function') {
        target.focus();
      }
    };
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  const focusTrap = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panelRef.current) return;
    const nodes = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((el) => el.offsetParent !== null);
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const handleOverlayPointerDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Cierra solo si el click arranca (y termina) en el overlay, no en el panel.
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Ingresá una URL.');
      return;
    }
    try {
      new URL(trimmed);
    } catch {
      setError('La URL no es válida.');
      return;
    }
    try {
      setSubmitting(true);
      await onSubmit(trimmed);
      onClose();
    } catch {
      setError('No se pudo guardar. Intentá de nuevo.');
      setSubmitting(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      className="link-modal-overlay"
      role="presentation"
      onPointerDown={handleOverlayPointerDown}
    >
      <div
        ref={panelRef}
        className="quest-panel link-modal-panel rise"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onKeyDown={focusTrap}
      >
        <span className="bracket-tl" aria-hidden="true" />
        <span className="bracket-tr" aria-hidden="true" />
        <span className="bracket-bl" aria-hidden="true" />
        <span className="bracket-br" aria-hidden="true" />

        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-display text-lg font-semibold" style={{ color: 'var(--ink)' }}>
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="quest-modal-close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="link-modal-input"
            className="block mono-label mb-2"
          >
            {label}
          </label>
          <input
            id="link-modal-input"
            ref={inputRef}
            type="url"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className={`quest-input w-full px-4 py-3 rounded-sm ${
              error ? 'field-error' : ''
            }`}
          />
          {error && (
            <p className="text-sm" style={{ color: 'var(--danger)' }}>
              {error}
            </p>
          )}

          {children}

          <div className="flex justify-end gap-4 pt-2">
            <button type="button" onClick={onClose} className="btn-portal-ghost">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-portal"
            >
              {submitting ? 'Guardando…' : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LinkModal;
