'use client';

import { type KeyboardEvent, type PointerEvent, useRef, useState } from 'react';
import { MoodBoardImage } from '@/lib/types';
import {
  type CellView,
  ZOOM_MAX,
  ZOOM_MIN,
  ZOOM_STEP,
  clampView,
  extractDroppedUrl,
} from './moodboardConfig';

const ASPECT: Record<'top' | 'bottom', string> = {
  top: '340 / 453',
  bottom: '340 / 639',
};

/** Movimiento en px por debajo del cual un pointerup se considera "click". */
const CLICK_THRESHOLD = 4;

interface MoodBoardCellProps {
  index: number;
  rowType: 'top' | 'bottom';
  image: MoodBoardImage | null;
  view: CellView;
  onRequestAdd: (index: number) => void;
  onDropUrl: (index: number, url: string) => void;
  onDelete: (index: number) => void;
  onViewChange: (index: number, view: CellView) => void;
  onOpenLightbox: (image: MoodBoardImage) => void;
}

export function MoodBoardCell({
  index,
  rowType,
  image,
  view,
  onRequestAdd,
  onDropUrl,
  onDelete,
  onViewChange,
  onOpenLightbox,
}: MoodBoardCellProps) {
  const [dragOver, setDragOver] = useState(false);
  const [broken, setBroken] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);
  const pan = useRef<{
    cx: number;
    cy: number;
    x: number;
    y: number;
    moved: boolean;
  } | null>(null);

  const style = { aspectRatio: ASPECT[rowType] };

  /* ----------------------------- Celda vacía ----------------------------- */
  if (!image) {
    return (
      <button
        type="button"
        className={`moodboard-cell moodboard-cell--empty${dragOver ? ' is-dragover' : ''}`}
        style={style}
        aria-label={`Agregar imagen a la celda ${index + 1}`}
        onClick={() => onRequestAdd(index)}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const url = extractDroppedUrl(e.dataTransfer);
          if (url) onDropUrl(index, url);
        }}
      >
        + image
      </button>
    );
  }

  /* ----------------------------- Celda llena ---------------------------- */
  const canPan = view.zoom > 1;

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pan.current = { cx: e.clientX, cy: e.clientY, x: view.x, y: view.y, moved: false };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!pan.current || !canPan || !mediaRef.current) return;
    const dxPx = e.clientX - pan.current.cx;
    const dyPx = e.clientY - pan.current.cy;
    if (Math.abs(dxPx) > CLICK_THRESHOLD || Math.abs(dyPx) > CLICK_THRESHOLD) {
      pan.current.moved = true;
    }
    const rect = mediaRef.current.getBoundingClientRect();
    onViewChange(
      index,
      clampView({
        zoom: view.zoom,
        x: pan.current.x + dxPx / rect.width / view.zoom,
        y: pan.current.y + dyPx / rect.height / view.zoom,
      }),
    );
  };

  const endPointer = () => {
    const wasClick = pan.current !== null && !pan.current.moved;
    pan.current = null;
    if (wasClick) onOpenLightbox(image);
  };

  const nudgeZoom = (next: number) =>
    onViewChange(
      index,
      clampView({ ...view, zoom: Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next)) }),
    );

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenLightbox(image);
    }
  };

  const isReset = view.zoom === 1 && view.x === 0 && view.y === 0;

  return (
    <div
      className="moodboard-cell moodboard-cell--filled"
      style={style}
      onContextMenu={(e) => {
        e.preventDefault();
        onDelete(index);
      }}
    >
      <div
        key={image.id}
        ref={mediaRef}
        className="moodboard-media moodboard-enter"
        role="button"
        tabIndex={0}
        aria-label="Ampliar imagen"
        style={{ cursor: canPan ? 'grab' : 'zoom-in' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={() => {
          pan.current = null;
        }}
        onKeyDown={onKeyDown}
      >
        {broken ? (
          <div className="moodboard-broken">Imagen no disponible</div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.imageUrl}
            alt="Imagen del mood board"
            draggable={false}
            onError={() => setBroken(true)}
            style={{
              transform: `scale(${view.zoom}) translate(${view.x * 100}%, ${view.y * 100}%)`,
            }}
          />
        )}
      </div>

      <button
        type="button"
        className="moodboard-overlay-btn moodboard-del"
        aria-label="Eliminar imagen"
        onClick={() => onDelete(index)}
      >
        ×
      </button>

      {!broken && (
        <div className="moodboard-zoom" role="group" aria-label="Control de zoom">
          <button
            type="button"
            className="moodboard-overlay-btn"
            aria-label="Alejar"
            onClick={() => nudgeZoom(view.zoom - ZOOM_STEP)}
            disabled={view.zoom <= ZOOM_MIN}
          >
            −
          </button>
          <button
            type="button"
            className="moodboard-overlay-btn"
            aria-label="Restablecer zoom"
            onClick={() => onViewChange(index, { x: 0, y: 0, zoom: 1 })}
            disabled={isReset}
          >
            ⤢
          </button>
          <button
            type="button"
            className="moodboard-overlay-btn"
            aria-label="Acercar"
            onClick={() => nudgeZoom(view.zoom + ZOOM_STEP)}
            disabled={view.zoom >= ZOOM_MAX}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
