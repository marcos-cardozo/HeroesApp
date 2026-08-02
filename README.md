# HeroesApp Backend

Backend con NestJS y autenticación JWT.

## Requisitos

- Node.js 18+
- Docker y Docker Compose (para la base de datos PostgreSQL)
- npm o yarn

## Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd HeroesApp
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo y ajústalo según sea necesario:

```bash
cp .env.example .env
```

Las variables de entorno disponibles son:

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `DB_HOST` | Host de PostgreSQL | localhost |
| `DB_PORT` | Puerto de PostgreSQL | 5432 |
| `DB_USERNAME` | Usuario de PostgreSQL | postgres |
| `DB_PASSWORD` | Contraseña de PostgreSQL | postgres123 |
| `DB_NAME` | Nombre de la base de datos | heroes_app |
| `JWT_SECRET` | Secreto para firmar JWT | (debe cambiarse en producción) |
| `JWT_EXPIRATION` | Tiempo de expiración del token | 1d |
| `PORT` | Puerto del servidor | 3000 |
| `NODE_ENV` | Entorno de ejecución | development |

### 4. Levantar la base de datos

Con Docker Compose:

```bash
docker-compose up -d
```

Verificar que PostgreSQL está corriendo:

```bash
docker-compose ps
```

### 5. Ejecutar la aplicación

**Desarrollo:**
```bash
npm run start:dev
```

**Producción:**
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Registro de usuario

**POST** `/auth/register`

Registra un nuevo usuario en el sistema.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "nombre": "Juan Pérez",
  "password": "contraseña123"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": "uuid-del-usuario",
    "email": "usuario@ejemplo.com",
    "nombre": "Juan Pérez"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Posibles errores:**
- `400 Bad Request` - Datos inválidos o contraseña muy corta
- `409 Conflict` - El email ya está registrado

---

### Inicio de sesión

**POST** `/auth/login`

Inicia sesión con credenciales existentes.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "uuid-del-usuario",
    "email": "usuario@ejemplo.com",
    "nombre": "Juan Pérez"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Posibles errores:**
- `401 Unauthorized` - Credenciales inválidas

---

### Perfil del usuario (ruta protegida)

**GET** `/auth/profile`

Obtiene la información del usuario autenticado. Requiere un token JWT válido.

**Headers:**
```
Authorization: Bearer <token-jwt>
```

**Response (200 OK):**
```json
{
  "id": "uuid-del-usuario",
  "email": "usuario@ejemplo.com",
  "nombre": "Juan Pérez"
}
```

**Posibles errores:**
- `401 Unauthorized` - Token inválido o no proporcionado

---

## Pruebas con curl

### Registrar un usuario

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@ejemplo.com",
    "nombre": "Usuario Test",
    "password": "password123"
  }'
```

### Iniciar sesión

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@ejemplo.com",
    "password": "password123"
  }'
```

### Obtener perfil (con token)

Reemplaza `<TU_TOKEN>` con el token recibido en el registro o inicio de sesión:

```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer <TU_TOKEN>"
```

## Desarrollo

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run start:dev` | Inicia el servidor en modo desarrollo con hot-reload |
| `npm run build` | Compila el proyecto TypeScript a JavaScript |
| `npm run start` | Inicia el servidor en producción |
| `npm run lint` | Ejecuta el linter |
| `npm run test` | Ejecuta los tests unitarios |

### Estructura del proyecto

```
src/
├── main.ts                 # Punto de entrada de la aplicación
├── app.module.ts           # Módulo principal
├── auth/
│   ├── auth.module.ts      # Módulo de autenticación
│   ├── auth.controller.ts  # Controlador de autenticación
│   ├── auth.service.ts     # Servicio de autenticación
│   ├── dto/                # Data Transfer Objects
│   │   ├── register.dto.ts
│   │   └── login.dto.ts
│   ├── guards/             # Guards de autenticación
│   │   └── jwt-auth.guard.ts
│   └── strategies/        # Estrategias de Passport
│       └── jwt.strategy.ts
└── users/
    ├── users.module.ts     # Módulo de usuarios
    ├── users.service.ts    # Servicio de usuarios
    ├── dto/
    │   └── create-user.dto.ts
    └── entities/
        └── user.entity.ts  # Entidad User de TypeORM
```

## Base de datos

La aplicación usa PostgreSQL con TypeORM. La configuración de sincronización automática (`synchronize: true`) está habilitada en desarrollo, lo que significa que las tablas se crean automáticamente al iniciar.

**⚠️ Nota:** En producción, desactiva `synchronize` y usa migraciones en su lugar.

## Detener los servicios

```bash
# Detener el servidor (Ctrl+C en la terminal)
# Detener PostgreSQL
docker-compose down

# Eliminar también los datos persistidos
docker-compose down -v
```
