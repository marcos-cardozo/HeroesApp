<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-created the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project notes (HeroesApp / frontend)

- Monorepo: `backend/` (NestJS + Postgres) and `frontend/` (Next.js 16 app router,
  React 19, Tailwind v4). Frontend dev: `npm run dev` (port 3001). Backend: port 3000.
- `.next/` IS tracked in git (unusual). Avoid committing build-artifact churn:
  run `git checkout -- frontend/.next && git clean -fdx -- frontend/.next` after
  running `npm run build`/`dev` to keep diffs source-only. `node_modules/` is ignored.
- Design system classes live in `frontend/app/globals.css`: `.panel`, `.input-field`,
  `.btn-primary`, `.btn-ghost`, `.mono-label`, `.divider`, `.portal-halo`, `.rise`.
  The `quest-*`/`bracket-*`/`portal-glow` classes are NOT in the committed source
  (only in stale tracked `.next` build artifacts) — they were added fresh when needed
  for the Portal "Agregar link" modal (`frontend/components/LinkModal.tsx`).
- Portal persistence: backend `POST /portal/mood-board {imageUrl, order}` etc.
  Frontend client in `frontend/lib/api.ts` → `portalApi` (shared axios instance
  with auth + 401 interceptors).
- AppRouter quirk: folders prefixed with `_` are private and excluded from routing.
- To QA a client page that needs auth without spinning up the backend, create a
  throwaway route folder (NOT `_`-prefixed) rendering the component with mock data,
  screenshot, then delete it. Don't leave test routes in the tree.
