/* Configuración y helpers del Mood Board.
   El grid es fijo: 8 celdas en 2 filas de 4. La fila superior usa una
   proporción 340/453 y la inferior 340/639. */

export const CELL_COUNT = 8;
export const ROW_TOP_COUNT = 4;

export const ZOOM_MIN = 1;
export const ZOOM_MAX = 3;
export const ZOOM_STEP = 0.25;

/** Vista (pan + zoom) de una celda. `x`/`y` son fracción del lado de la celda. */
export interface CellView {
  x: number;
  y: number;
  zoom: number;
}

/** Lo que se guarda en localStorage por imagen: su celda + su vista. */
export interface StoredView extends CellView {
  cell: number;
}

const STORE_KEY = 'heroes.moodboard.views.v1';

/** Solo aceptamos http(s) para no meter `data:`/`javascript:`/etc. */
export function isValidImageUrl(raw: string): boolean {
  try {
    const u = new URL(raw.trim());
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

/** Saca una URL de imagen de un evento de drag & drop entre pestañas. */
export function extractDroppedUrl(dt: DataTransfer): string | null {
  for (const type of ['text/uri-list', 'text/plain']) {
    const line = dt
      .getData(type)
      .split('\n')
      .map((s) => s.trim())
      .find((s) => s.length > 0 && !s.startsWith('#'));
    if (line && isValidImageUrl(line)) return line;
  }

  const html = dt.getData('text/html');
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (match && isValidImageUrl(match[1])) return match[1];

  return null;
}

/** Limita zoom a [1, 3] y el pan para que la imagen nunca deje ver el marco. */
export function clampView(view: CellView): CellView {
  const zoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, view.zoom));
  const max = zoom <= 1 ? 0 : (zoom - 1) / (2 * zoom);
  return {
    zoom,
    x: Math.min(max, Math.max(-max, view.x)),
    y: Math.min(max, Math.max(-max, view.y)),
  };
}

export function loadViews(): Record<string, StoredView> {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, StoredView>) : {};
  } catch {
    return {};
  }
}

export function saveView(imageId: string, view: StoredView): void {
  try {
    const all = loadViews();
    all[imageId] = view;
    localStorage.setItem(STORE_KEY, JSON.stringify(all));
  } catch {
    /* almacenamiento no disponible: no es crítico */
  }
}

export function removeView(imageId: string): void {
  try {
    const all = loadViews();
    delete all[imageId];
    localStorage.setItem(STORE_KEY, JSON.stringify(all));
  } catch {
    /* idem */
  }
}
