'use client';

import { useEffect, useRef } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Diálogo de confirmación accesible, en el mismo lenguaje visual que el
 * LinkModal (overlay con scope al contenedor central del portal).
 */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Eliminar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="link-modal-overlay"
      role="presentation"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        className="quest-panel link-modal-panel rise"
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
      >
        <span className="bracket-tl" aria-hidden="true" />
        <span className="bracket-tr" aria-hidden="true" />
        <span className="bracket-bl" aria-hidden="true" />
        <span className="bracket-br" aria-hidden="true" />

        <h2
          className="font-display text-lg font-semibold mb-3"
          style={{ color: 'var(--ink)' }}
        >
          {title}
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--ink-muted)' }}>
          {message}
        </p>

        <div className="flex justify-end gap-4">
          <button type="button" className="btn-portal-ghost" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            type="button"
            className="btn-portal"
            style={{ background: 'var(--danger)', borderColor: 'var(--ink)' }}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
