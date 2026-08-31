'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LinkModal } from '@/components/LinkModal';
import { portalApi } from '@/lib/api';
import { MoodBoardImage } from '@/lib/types';
import { useInView } from '@/lib/useInView';
import { PortalSection } from './ui';
import { MoodBoardCell } from './MoodBoardCell';
import { MoodBoardLightbox } from './MoodBoardLightbox';
import { ConfirmDialog } from './ConfirmDialog';
import {
  CELL_COUNT,
  type CellView,
  ROW_TOP_COUNT,
  clampView,
  isValidImageUrl,
  loadViews,
  removeView,
  saveView,
} from './moodboardConfig';

interface Cell {
  image: MoodBoardImage | null;
  view: CellView;
}

const EMPTY: CellView = { x: 0, y: 0, zoom: 1 };

/**
 * Reparte las imágenes del backend en 8 celdas fijas. Respeta la celda
 * guardada en localStorage cuando existe; si no, va llenando la primera
 * libre en orden.
 */
function buildCells(images: MoodBoardImage[]): Cell[] {
  const views = loadViews();
  const cells: Cell[] = Array.from({ length: CELL_COUNT }, () => ({
    image: null,
    view: { ...EMPTY },
  }));
  const used = new Set<number>();
  const pending: MoodBoardImage[] = [];

  for (const img of [...images].sort((a, b) => a.order - b.order)) {
    const v = views[img.id];
    if (
      v &&
      Number.isInteger(v.cell) &&
      v.cell >= 0 &&
      v.cell < CELL_COUNT &&
      !used.has(v.cell)
    ) {
      used.add(v.cell);
      cells[v.cell] = { image: img, view: clampView({ x: v.x, y: v.y, zoom: v.zoom }) };
    } else {
      pending.push(img);
    }
  }

  let k = 0;
  for (const img of pending) {
    while (k < CELL_COUNT && used.has(k)) k += 1;
    if (k >= CELL_COUNT) break;
    used.add(k);
    const v = views[img.id];
    cells[k] = {
      image: img,
      view: v ? clampView({ x: v.x, y: v.y, zoom: v.zoom }) : { ...EMPTY },
    };
  }

  return cells;
}

export function MoodBoardSection({
  initialImages,
}: {
  initialImages: MoodBoardImage[];
}) {
  const [cells, setCells] = useState<Cell[]>(() => buildCells(initialImages));
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingCell, setPendingCell] = useState<number | null>(null);
  const [confirmCell, setConfirmCell] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const addBtnRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const { ref: revealRef, inView: revealed } = useInView<HTMLDivElement>();

  const firstEmpty = useMemo(() => cells.findIndex((c) => !c.image), [cells]);
  const filledCount = useMemo(() => cells.filter((c) => c.image).length, [cells]);
  const boardFull = firstEmpty === -1;

  const openModalFor = useCallback((index: number) => {
    setPendingCell(index);
    setFeedback(null);
    setModalOpen(true);
  }, []);

  const placeImage = useCallback(async (index: number, url: string) => {
    if (!isValidImageUrl(url)) throw new Error('URL inválida');
    const created = (await portalApi.createMoodBoardImage({
      imageUrl: url,
      order: index,
    })) as MoodBoardImage;
    setCells((prev) => {
      const next = [...prev];
      next[index] = { image: created, view: { ...EMPTY } };
      return next;
    });
    saveView(created.id, { cell: index, ...EMPTY });
  }, []);

  const handleModalSubmit = useCallback(
    async (url: string) => {
      const target = pendingCell ?? cells.findIndex((c) => !c.image);
      if (target < 0 || target >= CELL_COUNT) {
        setFeedback('El mood board está completo.');
        return;
      }
      await placeImage(target, url);
    },
    [pendingCell, cells, placeImage],
  );

  const handleDrop = useCallback(
    (index: number, url: string) => {
      setFeedback(null);
      void placeImage(index, url).catch(() =>
        setFeedback('No se pudo agregar la imagen arrastrada.'),
      );
    },
    [placeImage],
  );

  const confirmDelete = useCallback(async () => {
    const index = confirmCell;
    setConfirmCell(null);
    if (index == null) return;
    const image = cells[index]?.image;
    if (!image) return;

    setBusy(true);
    try {
      await portalApi.deleteMoodBoardImage(image.id);
      removeView(image.id);
      setCells((prev) => {
        const next = [...prev];
        next[index] = { image: null, view: { ...EMPTY } };
        return next;
      });
    } catch {
      setFeedback('No se pudo eliminar la imagen.');
    } finally {
      setBusy(false);
    }
  }, [confirmCell, cells]);

  const handleViewChange = useCallback(
    (index: number, view: CellView) => {
      setCells((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], view };
        return next;
      });
      const image = cells[index]?.image;
      if (image) saveView(image.id, { cell: index, ...view });
    },
    [cells],
  );

  const handleExport = useCallback(async () => {
    if (!frameRef.current) return;
    setBusy(true);
    setFeedback(null);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(frameRef.current, {
        backgroundColor: '#0A0A0B',
        scale: 2,
        useCORS: true,
        // El botón de pantalla completa vive dentro del frame; fuera del PNG.
        ignoreElements: (el) => el.classList.contains('moodboard-expand'),
      });
      const link = document.createElement('a');
      link.download = `moodboard-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      setFeedback(
        'No se pudo exportar. Puede que alguna imagen bloquee la captura por CORS.',
      );
    } finally {
      setBusy(false);
    }
  }, []);

  /* ------------------------- Focus Mode (pantalla completa) ---------------- */
  // 'closing' mantiene el nodo montado mientras corre la animación de salida.
  const [fs, setFs] = useState<'closed' | 'open' | 'closing'>('closed');
  const fsTriggerRef = useRef<HTMLButtonElement>(null);
  const fsCloseRef = useRef<HTMLButtonElement>(null);
  const prevFs = useRef<'closed' | 'open' | 'closing'>('closed');

  const openFullscreen = useCallback(() => setFs('open'), []);

  const closeFullscreen = useCallback(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    setFs((cur) => (cur !== 'open' ? cur : reduce ? 'closed' : 'closing'));
  }, []);

  // Bloqueo del scroll del body mientras el Focus Mode está montado. El
  // cleanup restaura el valor previo tanto al cerrar como al desmontar el
  // componente, así el overflow del body nunca queda bloqueado por accidente.
  useEffect(() => {
    if (fs === 'closed') return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [fs]);

  // Escape + foco al botón de cerrar, solo mientras está abierto.
  useEffect(() => {
    if (fs !== 'open') return;
    fsCloseRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullscreen();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fs, closeFullscreen]);

  // Al volver a 'closed', devolvemos el foco al botón que abrió el modo.
  useEffect(() => {
    if (prevFs.current !== 'closed' && fs === 'closed') {
      fsTriggerRef.current?.focus();
    }
    prevFs.current = fs;
  }, [fs]);

  // Red de seguridad: si `animationend` no dispara, forzamos el cierre.
  useEffect(() => {
    if (fs !== 'closing') return;
    const t = window.setTimeout(() => setFs('closed'), 450);
    return () => window.clearTimeout(t);
  }, [fs]);

  return (
    <PortalSection title="Mood Board" tag="Slide 01">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          ref={addBtnRef}
          type="button"
          className="btn-portal"
          onClick={() => openModalFor(firstEmpty)}
          disabled={boardFull || busy}
        >
          + Agregar link
        </button>
        <button
          type="button"
          className="btn-portal-ghost"
          onClick={handleExport}
          disabled={busy || filledCount === 0}
        >
          Exportar PNG
        </button>
        <span className="mono-label" style={{ marginLeft: 'auto' }}>
          {filledCount} / {CELL_COUNT}
        </span>
      </div>

      {boardFull && (
        <p className="moodboard-complete mb-4">
          El mood board está completo. Eliminá una imagen para agregar otra.
        </p>
      )}
      {feedback && (
        <p className="text-sm mb-4" style={{ color: 'var(--danger)' }}>
          {feedback}
        </p>
      )}

      <div
        ref={revealRef}
        className={
          fs === 'closed'
            ? `reveal-on-scroll${revealed ? ' is-visible' : ''}`
            : `moodboard-stage moodboard-stage--fs${fs === 'closing' ? ' is-closing' : ''}`
        }
        role={fs === 'open' ? 'dialog' : undefined}
        aria-modal={fs === 'open' ? true : undefined}
        aria-label={fs !== 'closed' ? 'Mood Board — pantalla completa' : undefined}
        onPointerDown={
          fs === 'closed'
            ? undefined
            : (e) => {
                if (e.target === e.currentTarget) closeFullscreen();
              }
        }
        onAnimationEnd={
          fs === 'closing'
            ? (e) => {
                if (e.target === e.currentTarget) setFs('closed');
              }
            : undefined
        }
      >
        {fs !== 'closed' && (
          <button
            key="mb-fs-close"
            ref={fsCloseRef}
            type="button"
            className="moodboard-overlay-btn moodboard-fs-close"
            aria-label="Salir de pantalla completa"
            onClick={closeFullscreen}
          >
            ×
          </button>
        )}
        <div key="mb-frame" className="moodboard-frame" ref={frameRef}>
          <button
            ref={fsTriggerRef}
            type="button"
            className="moodboard-overlay-btn moodboard-expand"
            aria-label="Ver el mood board en pantalla completa"
            title="Pantalla completa"
            onClick={openFullscreen}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </button>
          <div className="moodboard-grid">
            {cells.map((cell, i) => (
              <MoodBoardCell
                key={`cell-${i}`}
                index={i}
                rowType={i < ROW_TOP_COUNT ? 'top' : 'bottom'}
                image={cell.image}
                view={cell.view}
                onRequestAdd={openModalFor}
                onDropUrl={handleDrop}
                onDelete={setConfirmCell}
                onViewChange={handleViewChange}
                onOpenLightbox={(img) => setLightbox(img.imageUrl)}
              />
            ))}
          </div>
        </div>
      </div>

      <LinkModal
        open={modalOpen}
        title="Agregar imagen al mood board"
        label="URL de la imagen"
        placeholder="https://..."
        submitLabel="Agregar"
        triggerRef={addBtnRef}
        onClose={() => {
          setModalOpen(false);
          setPendingCell(null);
        }}
        onSubmit={handleModalSubmit}
      />

      <ConfirmDialog
        open={confirmCell !== null}
        title="Eliminar imagen"
        message="¿Seguro que querés quitar esta imagen del mood board?"
        confirmLabel="Eliminar"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmCell(null)}
      />

      {lightbox && (
        <MoodBoardLightbox
          src={lightbox}
          alt="Imagen del mood board"
          onClose={() => setLightbox(null)}
        />
      )}
    </PortalSection>
  );
}
