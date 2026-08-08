# Heroes App - Frontend

Frontend de la aplicación Heroes App, construido con Next.js 14+ (App Router), TypeScript y TailwindCSS.

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
npm install
```

## Configuración

El archivo `.env.local` ya está configurado con:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Asegurate de que el backend esté corriendo en el puerto 3000 antes de iniciar el frontend.

## Ejecutar en desarrollo

```bash
npm run dev
```

El frontend estará disponible en: http://localhost:3001

## Levantando ambos proyectos

```bash
# Terminal 1 - Backend (puerto 3000)
cd backend
npm install
docker-compose up -d  # Levanta PostgreSQL
npm run start:dev

# Terminal 2 - Frontend (puerto 3001)
cd frontend
npm install
npm run dev
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Redirige a /login o /dashboard según el estado de autenticación |
| `/login` | Formulario de inicio de sesión |
| `/register` | Formulario de registro |
| `/dashboard` | Página protegida (requiere estar logueado) |

## Probando los endpoints

### Registro

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123","nombre":"Test User"}'
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

### Perfil (requiere token)

```bash
curl http://localhost:3000/auth/profile \
  -H "Authorization: Bearer <TOKEN>"
```

## Estructura del proyecto

```
frontend/
├── app/
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Página raíz (redirect)
│   ├── globals.css     # Estilos globales
│   ├── login/
│   │   └── page.tsx    # Página de login
│   ├── register/
│   │   └── page.tsx    # Página de registro
│   └── dashboard/
│       └── page.tsx    # Dashboard protegido
├── components/
│   └── AuthGuard.tsx   # Componente para proteger rutas
└── lib/
    ├── api.ts          # Cliente HTTP centralizado con axios
    └── types.ts        # Tipos TypeScript
```
