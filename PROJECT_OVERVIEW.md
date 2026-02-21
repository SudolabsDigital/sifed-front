# 📋 SIFED — Resumen del Proyecto

> **Sistema Integrado de Gestión Académica — Facultad de Educación UNCP**

Este documento resume la arquitectura, estructura de carpetas, modelos de datos y flujos principales del proyecto **SIFED Frontend**.

---

## 🗂️ Estructura General del Repositorio

```
sifed-front/
├── app/                  # Rutas y páginas (Next.js App Router)
├── components/           # Componentes reutilizables de UI
├── hooks/                # Hooks personalizados de React
├── lib/                  # Utilidades, configuración de API y servicios
├── types/                # Definiciones de tipos TypeScript
├── public/               # Assets estáticos (imágenes, PDFs, SVGs)
├── next.config.ts        # Configuración de Next.js
├── package.json          # Dependencias y scripts
├── tsconfig.json         # Configuración de TypeScript
└── proxy.ts              # Proxy de desarrollo (para CORS local)
```

---

## 📁 Estructura del Frontend (`app/`)

### Rutas Públicas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page (hero, noticias destacadas, ecosistema, posgrado) |
| `/login` | Hub de inicio de sesión con 3 roles |
| `/noticias` | Portal de noticias público (categorías + artículos) |
| `/noticias/[slug]` | Detalle de una noticia |
| `/documentos-normativos` | Documentos legales y normativos |
| `/posgrado` | Sección de posgrado |
| `/posgrado/maestrias` | Programas de maestría |
| `/en-construccion` | Página en construcción |
| `/acceso-denegado` | Página de acceso denegado |

### Rutas Protegidas (requieren autenticación)

| Ruta | Descripción | Rol |
|------|-------------|-----|
| `/admin/dashboard` | Dashboard administrativo principal | Admin |
| `/admin/portal` | Hub de gestión del portal | Admin |
| `/admin/portal/noticias` | Gestión de noticias (CRUD) | Admin |
| `/admin/portal/noticias/nuevo` | Crear nueva noticia | Admin |
| `/admin/portal/noticias/[id]` | Editar noticia | Admin |
| `/admin/portal/noticias/secciones/nueva` | Crear categoría | Admin |
| `/admin/portal/noticias/secciones/[id]` | Editar categoría | Admin |
| `/admin/configuracion` | Configuración del sistema | Admin |
| `/docente/dashboard` | Portal del docente | Docente |
| `/estudiante/dashboard` | Aula virtual del estudiante | Estudiante |

### Route Handlers (BFF — Backend for Frontend)

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/auth/login` | POST | Autentica al usuario y establece cookies |
| `/api/auth/logout` | POST | Elimina cookies y redirige al login |

---

## 📁 Estructura de Componentes (`components/`)

```
components/
├── layout/
│   ├── Header.tsx                  # Barra de navegación principal con mega-menú
│   └── Footer.tsx                  # Pie de página
├── dashboard/
│   ├── shell.tsx                   # Contenedor del layout del dashboard
│   ├── sidebar.tsx                 # Barra lateral de navegación
│   └── header.tsx                  # Cabecera del dashboard
├── auth/
│   ├── login-hub.tsx               # UI unificada de login con 3 roles
│   ├── login-form.tsx              # Formulario de login
│   └── role-guard.tsx              # HOC de protección de rutas por rol
├── ui/
│   ├── service-card.tsx            # Tarjeta de servicio
│   ├── editorial-card.tsx          # Tarjeta de noticia
│   ├── status-card.tsx             # Tarjeta de estado
│   ├── category-section.tsx        # Sección de noticias por categoría
│   ├── BackButton.tsx              # Botón de navegación atrás
│   └── toast.tsx                   # Notificaciones toast
├── landing/
│   ├── hero-section.tsx            # Sección hero de la landing
│   ├── info-section.tsx            # Información de la facultad
│   ├── ecosistema-section.tsx      # Sección del ecosistema
│   ├── posgrado-section.tsx        # Sección de posgrado en landing
│   ├── maestria-content.tsx        # Contenido de maestrías
│   ├── documentos-normativos-content.tsx # Documentos normativos
│   └── facebook-section.tsx        # Sección de redes sociales
├── posgrado/
│   ├── posgrado-hero.tsx           # Hero banner del posgrado
│   ├── posgrado-cta.tsx            # Call to action
│   ├── posgrado-identity.tsx       # Identidad de marca
│   └── strategic-axes.tsx          # Ejes estratégicos
├── portal/news/
│   ├── NewsCollage.tsx             # Collage de noticias destacadas
│   ├── NewsCard.tsx                # Tarjeta de noticia individual
│   └── NewsToolbar.tsx             # Toolbar de filtros y búsqueda
└── admin/noticias/
    ├── noticia-form.tsx            # Formulario CRUD de noticias
    └── categoria-form.tsx          # Formulario CRUD de categorías
```

---

## 📁 Servicios y API (`lib/`)

### `lib/api.ts` — Cliente Axios

```typescript
// Configuración
baseURL: process.env.NEXT_PUBLIC_API_URL  // default: http://localhost:8000/api
withCredentials: true
Content-Type: application/json

// Interceptores
Request:  Inyecta Bearer token desde cookie "sifed_session_token"
Response: Logging de errores y depuración de red
```

### `lib/services/noticia-service.ts` — Servicio de Noticias

| Método | Endpoint Backend | Descripción |
|--------|-----------------|-------------|
| `getAllPublic(page, categoria)` | `GET /portal/noticias` | Noticias públicas paginadas |
| `getBySlugPublic(slug)` | `GET /portal/noticias/{slug}` | Detalle de noticia por slug |
| `getCategoriesWithNews()` | `GET /portal/noticias-categorias` | Categorías con sus noticias |
| `getAllAdmin(page)` | `GET /admin/noticias` | Todas las noticias (admin) |
| `getByIdAdmin(id)` | `GET /admin/noticias/{id}` | Noticia por ID (admin) |
| `create(formData)` | `POST /admin/noticias` | Crear noticia (multipart) |
| `update(id, formData)` | `POST /admin/noticias/{id}?_method=PUT` | Actualizar noticia |
| `delete(id)` | `DELETE /admin/noticias/{id}` | Eliminar noticia |
| `getAllCategories()` | `GET /admin/noticias-categorias` | Todas las categorías |
| `getCategoryById(id)` | `GET /admin/noticias-categorias/{id}` | Categoría por ID |
| `createCategory(data)` | `POST /admin/noticias-categorias` | Crear categoría |
| `updateCategory(id, data)` | `PUT /admin/noticias-categorias/{id}` | Actualizar categoría |
| `deleteCategory(id)` | `DELETE /admin/noticias-categorias/{id}` | Eliminar categoría |

### `lib/services/auth-service.ts` — Servicio de Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `login(email, password)` | `POST /api/auth/login` | Login via BFF handler |
| `logout()` | `POST /api/auth/logout` | Cierra sesión y limpia cookies |
| `me()` | `GET /api/me` | Obtiene datos del usuario actual |

---

## 🗄️ Modelos de Datos (inferidos de los tipos TypeScript)

### `Noticia` — Noticias

```typescript
interface Noticia {
  id: number;
  titulo: string;
  slug: string;
  categoria: {
    id: number;
    nombre: string;
    estilo_visual: string;
  } | null;
  resumen: string | null;
  contenido: string;
  autor_nombre: string | null;
  tiempo_lectura: number | null;   // minutos estimados
  imagen_url: string | null;       // URL de la imagen principal
  fecha_publicacion: string;       // ISO 8601
  fecha_humana: string;            // Ej: "Hace 2 días"
  destacada: boolean;
  estado: 'borrador' | 'publicado';
}

// Respuesta paginada
interface NoticiaResponse {
  data: Noticia[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: { first, last, prev, next };
}
```

### `NoticiaCategoria` — Categorías de Noticias

```typescript
interface NoticiaCategoria {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
  orden: number;                           // Orden de visualización
  estilo_visual: 'green' | 'gold' | 'blue' | 'brand';  // Color de la tarjeta
  activo: boolean;
  noticias_count?: number;                 // Contador de noticias asociadas
  noticias?: Noticia[];                    // Noticias de la categoría
}
```

### `User` — Usuarios (inferido de `hooks/use-auth.ts`)

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];          // Ej: ['admin'], ['docente'], ['estudiante']
  foto_url?: string;
  estado: string;
}
```

---

## 🔐 Sistema de Autenticación

### Flujo de Login

```
1. Usuario ingresa credenciales en /login
2. LoginForm llama a authService.login(email, password)
3. auth-service.ts hace POST /api/auth/login (Route Handler BFF)
4. Route Handler llama al backend POST /login
5. Backend retorna { token, user }
6. Route Handler guarda en cookies:
   - sifed_session_token  (el token Bearer)
   - sifed_user_data      (datos del usuario en JSON)
7. Cliente redirige según rol:
   - admin     → /admin/dashboard
   - docente   → /docente/dashboard
   - estudiante → /estudiante/dashboard
```

### Protección de Rutas

El componente `RoleGuard` (HOC) verifica:
1. Si el token de sesión existe en cookies
2. Si el rol del usuario coincide con el rol requerido
3. Redirige a `/acceso-denegado` si no tiene acceso
4. Redirige a `/login` si no está autenticado

### Cookies utilizadas

| Cookie | Descripción | Expiración |
|--------|-------------|------------|
| `sifed_session_token` | Bearer token JWT | 24 horas |
| `sifed_user_data` | JSON con datos del usuario | 24 horas |

---

## 🎨 Sistema de Diseño

### Paleta de Colores

| Variable | Uso |
|----------|-----|
| `bg-brand-600` | Azul institucional (primario) |
| `bg-brand-50` | Fondos suaves |
| `text-uncp-gold` | Dorado UNCP (acento) |

### Tipografía

- **Playfair Display** — Títulos y encabezados (serif)
- **Plus Jakarta Sans** — Cuerpo de texto (sans-serif)

### Estilos de Categoría de Noticias

| Estilo | Color |
|--------|-------|
| `brand` | Azul institucional |
| `gold` | Dorado |
| `blue` | Azul |
| `green` | Verde |

---

## ⚙️ Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```ini
# URL de la API del Backend
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# URL base del Backend (para cookies CSRF y rutas BFF)
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

---

## 🚀 Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js | 16.1.6 |
| Librería UI | React | 19.2.3 |
| Lenguaje | TypeScript | ^5 |
| Estilos | Tailwind CSS | ^4 |
| HTTP Client | Axios | ^1.13.4 |
| Animaciones | Framer Motion | ^12.34.0 |
| Iconos | Lucide React | ^0.563.0 |
| Carrusel | Embla Carousel | ^8.6.0 |
| Cookies | js-cookie | ^3.0.5 |
| Classnames | clsx + tailwind-merge | Latest |

---

## 🔗 Integración con el Backend

El frontend se comunica con una API REST en `http://localhost:8000/api`. El patrón BFF (Backend-for-Frontend) se usa para la autenticación, donde los Route Handlers de Next.js actúan como intermediarios para gestionar las cookies de sesión de forma segura.

### Diagrama de Arquitectura

```
Browser (3000)
    │
    ├─ Rutas Públicas ────────────────────────────────────────────────▶ Muestra datos públicos
    │
    ├─ /api/auth/* (Next.js Route Handlers / BFF)
    │       │
    │       └─────────────────────────────────────────────────────────▶ Backend API (8000)
    │                                                                        ├─ POST /login
    │                                                                        ├─ GET  /me
    │                                                                        └─ ...
    │
    └─ Rutas Protegidas (RoleGuard)
            │
            └─ lib/api.ts (Axios + Bearer token desde cookie) ─────────▶ Backend API (8000)
                                                                             ├─ /portal/*
                                                                             └─ /admin/*
```

---

> **Nota:** Este documento fue generado como resumen del análisis del proyecto. El backend y la base de datos residen en un repositorio separado.
