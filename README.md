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

### Autenticación

#### Registro de usuario

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

## Hábitos

Todos los endpoints de hábitos requieren autenticación. Incluye el token JWT en el header `Authorization: Bearer <token>`.

### Crear hábito

**POST** `/habits`

**Body:**
```json
{
  "name": "Meditar",
  "icon": "🧘"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "name": "Meditar",
  "icon": "🧘",
  "currentStreak": 0,
  "longestStreak": 0,
  "active": true,
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

---

### Listar hábitos activos

**GET** `/habits`

**Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "Meditar",
    "icon": "🧘",
    "currentStreak": 5,
    "longestStreak": 10,
    "active": true
  }
]
```

---

### Ver detalle de hábito

**GET** `/habits/:id`

Obtiene el hábito con su historial de los últimos 30 días.

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Meditar",
  "icon": "🧘",
  "currentStreak": 5,
  "longestStreak": 10,
  "active": true,
  "recentLogs": [
    {
      "id": "log-uuid",
      "date": "2024-01-15",
      "completedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Errores:**
- `404` - Hábito no encontrado
- `403` - No tienes acceso a este hábito

---

### Editar hábito

**PATCH** `/habits/:id`

**Body:**
```json
{
  "name": "Meditación",
  "icon": "🧘‍♀️"
}
```

---

### Eliminar hábito (soft delete)

**DELETE** `/habits/:id`

Marca el hábito como inactivo. No lo borra de la base de datos.

**Response:** `204 No Content`

---

### Completar hábito

**POST** `/habits/:id/complete`

Marca el hábito como completado para hoy. Actualiza la racha.

**Response (200):**
```json
{
  "id": "uuid",
  "currentStreak": 6,
  "longestStreak": 10,
  ...
}
```

**Errores:**
- `400` - Ya completaste este hábito hoy

---

### Deshacer completado de hoy

**DELETE** `/habits/:id/complete`

Deshace el marcado de hoy y recalcula la racha.

**Response:** `204 No Content`

**Errores:**
- `400` - No hay registro para deshacer hoy

---

## Calendario

Todos los endpoints requieren autenticación JWT.

### Cálculo de períodos

Los eventos se agrupan dinámicamente según la hora de inicio:
- **MORNING**: antes de las 12:00
- **AFTERNOON**: 12:00 - 17:59
- **EVENING**: desde las 18:00

### Crear evento

**POST** `/calendar/events`

```json
{
  "title": "Reunión de equipo",
  "description": "Discussión del sprint",
  "date": "2024-01-15",
  "startTime": "10:00",
  "endTime": "11:00",
  "isRecurring": true,
  "recurrenceRule": "WEEKLY"
}
```

**Enums disponibles:**
- `recurrenceRule`: `DAILY`, `WEEKLY`, `WEEKDAYS`

---

### Listar eventos por rango

**GET** `/calendar/events?from=2024-01-15&to=2024-01-21`

Incluye eventos manuales y hábitos expandidos como eventos virtuales.

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Reunión de equipo",
    "date": "2024-01-15",
    "startTime": "10:00",
    "endTime": "11:00",
    "type": "event",
    "period": "MORNING",
    "completed": false
  },
  {
    "id": "habit-habit-uuid-2024-01-15",
    "title": "Ejercicio",
    "date": "2024-01-15",
    "startTime": "09:00",
    "type": "habit",
    "period": "MORNING",
    "completed": false
  }
]
```

---

### Ver eventos de un día (agrupados)

**GET** `/calendar/day/2024-01-15`

Respuesta lista para la vista del calendario:

```json
{
  "MORNING": [
    { "id": "uuid", "title": "Ejercicio", "startTime": "09:00", "period": "MORNING", ... }
  ],
  "AFTERNOON": [
    { "id": "uuid", "title": "Reunión", "startTime": "14:00", "period": "AFTERNOON", ... }
  ],
  "EVENING": []
}
```

---

### Eventos de hoy (para Dashboard)

**GET** `/calendar/today`

Misma estructura que `/calendar/day/:date`, pero usa la fecha actual.

---

### Ver detalle de evento

**GET** `/calendar/events/:id`

---

### Editar evento

**PATCH** `/calendar/events/:id`

```json
{
  "title": "Nuevo título",
  "startTime": "15:00",
  "endTime": "16:00"
}
```

**Nota:** No se pueden editar eventos de tipo `habit`.

---

### Eliminar evento

**DELETE** `/calendar/events/:id`

**Nota:** No se pueden eliminar eventos de tipo `habit`.

---

### Marcar/desmarcar como completado

**PATCH** `/calendar/events/:id/complete`

Toggle: alterna entre completado y no completado.

---

## Challenges

Endpoints para retos/checklists globales con progreso por usuario.

### Listar challenges activos

**GET** `/challenges`

Devuelve todos los challenges con el progreso del usuario autenticado.

**Response:**
```json
[
  {
    "id": "uuid",
    "slug": "modo-creativo",
    "name": "Modo Creativo",
    "description": "Mentalidad y bases",
    "durationDays": 5,
    "totalTasks": 5,
    "progress": {
      "completed": 2,
      "total": 5,
      "percentage": 40
    }
  }
]
```

---

### Ver detalle de challenge

**GET** `/challenges/:slug`

Incluye todas las secciones con sus items y el estado de completado de cada uno para el usuario.

**Response:**
```json
{
  "id": "uuid",
  "slug": "modo-creativo",
  "name": "Modo Creativo",
  "progress": {
    "completed": 1,
    "total": 5,
    "percentage": 20
  },
  "sections": [
    {
      "id": "uuid",
      "title": "Inicio · Antes de empezar",
      "progress": { "completed": 1, "total": 3 },
      "items": [
        {
          "id": "uuid",
          "title": "Entender qué es el Heroes Protocol",
          "completed": true,
          "completedAt": "2024-01-15T10:30:00.000Z"
        },
        {
          "id": "uuid",
          "title": "Entender por qué Modo Creativo es tan importante",
          "completed": false,
          "completedAt": null
        }
      ]
    }
  ]
}
```

---

### Completar item de checklist

**POST** `/challenges/:slug/items/:itemId/complete`

Marca un item como completado para el usuario. Es idempotente (si ya estaba completado, no hace nada).

**Response:**
```json
{
  "message": "Item marcado como completado"
}
```

**Errores:**
- `404` - Challenge o item no encontrado

---

### Deshacer completado de item

**DELETE** `/challenges/:slug/items/:itemId/complete`

**Response:**
```json
{
  "message": "Completado deshecho"
}
```

---

## Seed de Challenges

Cargar datos iniciales de ejemplo:

```bash
npm run seed
```

Esto crea:
- Challenge "modo-creativo" con 2 secciones y 5 items

---

## Boss Fights

Batallas contra bosses que se desbloquean al completar un challenge al 100%.

### Listar todos los bosses

**GET** `/boss-fights`

Devuelve todos los bosses con su estado para el usuario.

**Response:**
```json
{
  "bosses": [
    {
      "id": "uuid",
      "challengeSlug": "modo-creativo",
      "name": "Boss Final - Modo Creativo",
      "unlocked": false,
      "defeated": false
    }
  ],
  "totalDefeated": 0,
  "totalBosses": 1
}
```

---

### Ver detalle de un boss

**GET** `/boss-fights/:challengeSlug`

Si no está desbloqueado (challenge < 100%), devuelve 403 con las tareas faltantes.

**Response (desbloqueado):**
```json
{
  "id": "uuid",
  "name": "Boss Final - Modo Creativo",
  "unlocked": true,
  "defeated": false,
  "totalQuestions": 5,
  "maxFails": 3
}
```

---

### Iniciar intento de boss fight

**POST** `/boss-fights/:challengeSlug/start`

Solo funciona si el boss está desbloqueado. Retorna la primera pregunta.

**Response:**
```json
{
  "attemptId": "uuid",
  "question": {
    "id": "uuid",
    "text": "¿Qué es el Heroes Protocol?",
    "options": ["Un protocolo de comunicación", "Un sistema para construir hábitos", "..."],
    "order": 1
  },
  "currentIndex": 0,
  "totalQuestions": 5,
  "failCount": 0,
  "maxFails": 3
}
```

---

### Ver pregunta actual

**GET** `/boss-fights/attempts/:attemptId/current-question`

Si el intento terminó, devuelve el resultado final en vez de una pregunta.

---

### Responder pregunta

**POST** `/boss-fights/attempts/:attemptId/answer`

```json
{
  "selectedOptionIndex": 1
}
```

**Respuesta si sigue en juego:**
```json
{
  "type": "QUESTION",
  "attemptId": "uuid",
  "wasCorrect": true,
  "question": { ... },
  "currentIndex": 1,
  "failCount": 0,
  "maxFails": 3,
  "totalQuestions": 5
}
```

**Respuesta si gana (todas correctas):**
```json
{
  "type": "RESULT",
  "attemptId": "uuid",
  "wasCorrect": true,
  "status": "WON",
  "correctCount": 5
}
```

**Respuesta si pierde (fallos excedidos):**
```json
{
  "type": "RESULT",
  "attemptId": "uuid",
  "wasCorrect": false,
  "status": "LOST",
  "failCount": 4,
  "correctCount": 2
}
```

---

### Reintentar (si perdió)

**POST** `/boss-fights/:challengeSlug/retry`

Solo si tienes un intento LOST y no derrotaste al boss.

---

## Seed de Boss Fights

```bash
npm run seed:boss
```

O ejecutar todos los seeds:

```bash
npm run seed:all
```

Esto crea:
- Boss "Boss Final - Modo Creativo" con 5 preguntas de ejemplo

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

### Crear hábito

```bash
curl -X POST http://localhost:3000/habits \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TU_TOKEN>" \
  -d '{"name": "Meditar", "icon": "🧘"}'
```

### Listar hábitos

```bash
curl -X GET http://localhost:3000/habits \
  -H "Authorization: Bearer <TU_TOKEN>"
```

### Ver detalle de un hábito

```bash
curl -X GET http://localhost:3000/habits/<HABIT_ID> \
  -H "Authorization: Bearer <TU_TOKEN>"
```

### Completar hábito

```bash
curl -X POST http://localhost:3000/habits/<HABIT_ID>/complete \
  -H "Authorization: Bearer <TU_TOKEN>"
```

### Deshacer completado

```bash
curl -X DELETE http://localhost:3000/habits/<HABIT_ID>/complete \
  -H "Authorization: Bearer <TU_TOKEN>"
```

### Crear evento de calendario

```bash
curl -X POST http://localhost:3000/calendar/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TU_TOKEN>" \
  -d '{
    "title": "Reunión de equipo",
    "date": "2024-01-15",
    "startTime": "10:00",
    "endTime": "11:00"
  }'
```

### Ver eventos del día (agrupados por período)

```bash
curl -X GET "http://localhost:3000/calendar/day/2024-01-15" \
  -H "Authorization: Bearer <TU_TOKEN>"
```

### Ver eventos de hoy

```bash
curl -X GET http://localhost:3000/calendar/today \
  -H "Authorization: Bearer <TU_TOKEN>"
```

### Listar eventos de la semana

```bash
curl -X GET "http://localhost:3000/calendar/events?from=2024-01-15&to=2024-01-21" \
  -H "Authorization: Bearer <TU_TOKEN>"
```

### Listar challenges con progreso

```bash
curl -X GET http://localhost:3000/challenges \
  -H "Authorization: Bearer <TU_TOKEN>"
```

### Ver detalle de un challenge

```bash
curl -X GET http://localhost:3000/challenges/modo-creativo \
  -H "Authorization: Bearer <TU_TOKEN>"
```

### Completar un item de checklist

```bash
curl -X POST http://localhost:3000/challenges/modo-creativo/items/<ITEM_ID>/complete \
  -H "Authorization: Bearer <TU_TOKEN>"
```

### Listar bosses

```bash
curl -X GET http://localhost:3000/boss-fights \
  -H "Authorization: Bearer <TU_TOKEN>"
```

### Iniciar boss fight

```bash
curl -X POST http://localhost:3000/boss-fights/modo-creativo/start \
  -H "Authorization: Bearer <TU_TOKEN>"
```

### Responder pregunta

```bash
curl -X POST http://localhost:3000/boss-fights/attempts/<ATTEMPT_ID>/answer \
  -H "Authorization: Bearer <TU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"selectedOptionIndex": 1}'
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
├── users/
│   ├── users.module.ts     # Módulo de usuarios
│   ├── users.service.ts    # Servicio de usuarios
│   ├── dto/
│   │   └── create-user.dto.ts
│   └── entities/
│       └── user.entity.ts  # Entidad User de TypeORM
└── habits/
    ├── habits.module.ts    # Módulo de hábitos
    ├── habits.controller.ts # Controlador de hábitos
    ├── habits.service.ts   # Servicio de hábitos
    ├── habits.service.spec.ts # Tests unitarios
    ├── dto/
    │   ├── create-habit.dto.ts
    │   └── update-habit.dto.ts
    └── entities/
        ├── habit.entity.ts    # Entidad Habit
        └── habit-log.entity.ts # Entidad HabitLog
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
