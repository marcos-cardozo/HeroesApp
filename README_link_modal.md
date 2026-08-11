# Modal "Agregar link" — blur limitado al sector central

Arreglo del comportamiento visual del modal de "Agregar link" del Portal.
Antes el modal era un overlay que cubría/difuminaba toda la pantalla
(incluido el `AppHeader`). Ahora el blur + dimmer se limita al sector
central del portal (el contenedor `max-w-6xl`/`<main>`), y el header y el
resto de la página permanecen nítidos.

## Cambios (resumen)

- `frontend/components/LinkModal.tsx` (nuevo): modal reutilizable con
  overlay `position: absolute; inset: 0` (no `fixed`), de modo que el
  blur/dimmer queda acotado al contenedor relativo donde se monta.
  Incluye autofocus, cierre con Escape, click fuera del panel, focus
  trap (Tab) y devolución del foco al botón que lo abrió al cerrar.
- `frontend/app/portal/page.tsx`: se extrae `MoodBoardSection` con el
  botón "+ Agregar link"; el `<main>` pasa a `position: relative` para
  anclar el overlay; se persiste con `portalApi.createMoodBoardImage` y
  se actualiza el estado de forma optimista.
- `frontend/app/globals.css`: clases `quest-panel`, `quest-input`,
  `quest-btn`, `bracket-*` y `portal-glow` (no existían en el fuente
  del repo, solo en artefactos de build). Overlay `.link-modal-overlay`
  con `rgba(0,0,0,0.6)` + `backdrop-filter: blur(6px)`, animación de
  apertura fade/scale de bajo impacto, reglas de movimiento reducido y
  ajustes para viewport estrecho.
- `frontend/lib/api.ts`: `portalApi` (getOverview / createMoodBoardImage
  / deleteMoodBoardImage) sobre el cliente axios compartido.

## Cómo probarlo

```bash
# 1) Backend (Nest + Postgres) — el modal persiste contra /portal/mood-board
cd backend
docker compose up -d postgres
cp .env.example .env   # ajustá DATABASE_URL / JWT si hace falta
npm install && npm run start:dev   # http://localhost:3000

# 2) Frontend
cd ../frontend
npm install
npm run dev          # http://localhost:3001
```

Iniciá sesión y abrí `/portal`. En la sección **Mood Board** tocá
**"+ Agregar link"**.

> Verificación rápida SIN backend (la que se usó para el QA visual):
> Next.js excluye del routing las carpetas con prefijo `_`, así que
> para aislar el modal podés crear temporalmente
> `app/_linkmodal-preview/page.tsx` que renderice `AppHeader` + un
> `<main className="relative …">` con un `MoodBoardSection` y datos
> mock. Tomá capturas y luego borrá la carpeta. (No se incluye en el
> patch por ser solo de QA.)

## Criterios de aceptación (QA)

- [x] Al abrir el modal, **solo** la zona central del portal se difumina
      y oscurece; el `AppHeader` y el resto de la página siguen nítidos.
- [x] El modal está centrado dentro del área difuminada y el campo URL
      recibe autofocus al abrir.
- [x] Click fuera del panel cierra el modal; **Esc** cierra el modal.
- [x] Sin solapamiento de z-index: el overlay vive dentro del `<main>`
      relativo (z-index 50 sobre el contenido central); el header queda
      fuera de ese contexto de apilado.
- [x] Funciona en escritorio y móvil (overlay con `overflow-y: auto` y
      padding reducido en `max-width:640px`).

## Accesibilidad

- `role="dialog"` + `aria-modal="true"` + `aria-label` en el panel.
- Autofocus del input al abrir (retardo de 30 ms para asegurar el
  montaje).
- Focus trap: Tab/Shift+Tab cicla entre los elementos enfocables del
  panel.
- Escape cierra (listener en `window`, `stopPropagation` para no
  burbujear).
- Devolución de foco: al cerrar vuelve el foco al botón que abrió el
  modal (`triggerRef`) o, si no existe, al elemento previamente enfocado.
- `prefers-reduced-motion`: se desactivan las animaciones de fade/scale.

## Capturas

- `before_modal.png` — página del portal con el modal cerrado.
- `after_modal_open.png` — modal abierto: el sector central queda
  difuminado/oscurecido mientras el `AppHeader` permanece nítido.

Tomá tus propias capturas con DevTools (`Cmd/Ctrl+Shift+P` →
"Capture full size screenshot") o con la herramienta de captura del SO.

## Alternativas de scope (recomendación)

1. **Blur sobre TODO el contenedor central** (implementada por defecto):
   el `<main>` es el contenedor relativo y el `<section>` del Mood Board
   **no** lo es. El overlay (anclado al ancestro posicionado más cercano)
   tapa todo el panel central, y el modal queda claramente por encima.
   Simple y consistente; buena en móvil.
2. **Blur solo sobre el Mood Board** (alternativa): hacé relativo el
   `<section>` (`className="mb-20 relative"`) y quitá `relative` del
   `<main>`. El overlay se ancla entonces a la sección, así que solo se
   difumina el Mood Board y las demás secciones siguen nítidas. Más
   "quirúrgico", pero en pantallas chicas el área difuminada es chica y
   el modal puede verse desproporcionado respecto al resto.

   En ambos casos el `<LinkModal>` se monta dentro del `<section>` (no
   hace falta moverlo); solo cambia qué ancestro es `position: relative`.

**Recomendación:** usá la opción 1 (contenedor central) para móviles;
reserva la opción 2 solo si querés preservar visibilidad de las demás
secciones en escritorio. Ambas están soportadas por el mismo
`LinkModal`.
