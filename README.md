# Movie Tracker 🎬

Aplicación web para el seguimiento de películas. Inspirada en Letterboxd, permite explorar películas populares, buscarlas, guardarlas en una lista de "Quiero ver" y marcarlas como vistas. Los datos persisten en el navegador mediante LocalStorage.

## Capturas de pantalla

> *(Agregá acá las capturas después del deploy)*

| Home | Watchlist | Watched |
|------|-----------|---------|
| ![](screenshots/home.png) | ![](screenshots/watchlist.png) | ![](screenshots/watched.png) |

## Características

- **Películas populares** – Navegá las películas del momento desde TMDB.
- **Búsqueda** – Buscá cualquier película por nombre.
- **Watchlist** – Guardá películas para ver después.
- **Vistas** – Marcá películas como ya vistas (se eliminan automáticamente de la watchlist).
- **Filtro local** – Filtrá tus listas por título.
- **Persistencia** – Las listas se guardan en LocalStorage y sobreviven al cerrar el navegador.
- **404** – Página de error para rutas inexistentes.

## Tecnologías

| Tecnología | Versión | Propósito |
|---|---|---|
| React | 18 | Librería de UI |
| Vite | 5 | Build tool y dev server |
| React Router | 6 | Enrutamiento SPA |
| TMDB API | v3 | Fuente de datos de películas |
| LocalStorage | — | Persistencia en el cliente |
| CSS | — | Estilos (sin frameworks) |

## Arquitectura

```
src/
├── components/     ← Componentes reutilizables (Navbar, MovieCard, SearchBar, Loader)
├── pages/          ← Páginas (Home, Watchlist, Watched, NotFound)
├── services/       ← Llamadas a la API de TMDB
├── hooks/          ← Lógica de estado y persistencia
├── App.jsx         ← Estado global y definición de rutas
└── main.jsx        ← Entry point con BrowserRouter
```

**Flujo de datos:**

```
TMDB API  ──►  tmdb.js  ──►  Pages  ──►  MovieCard
                                    │
                    App.jsx (estado global) ◄── useLocalStorage
                                    │
                               LocalStorage
```

## Instalación

```bash
git clone https://github.com/tu-usuario/movie-tracker.git
cd movie-tracker
npm install
```

## Obtener API Key de TMDB

1. Creá una cuenta en [TMDB](https://www.themoviedb.org/).
2. Andá a *Settings → API* y solicitá una API Key.
3. Copiá `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
4. Completá tu clave:
   ```
   VITE_TMDB_API_KEY=tu_api_key_aqui
   ```

## Ejecución local

```bash
npm run dev
```

Abrí [http://localhost:5173](http://localhost:5173).

## Build de producción

```bash
npm run build
npm run preview
```

## Cómo hacer deploy en Netlify (más simple que Vercel)

**Pasos (guiados, 5 minutos):**

1. Hacé build del proyecto:
   ```bash
   npm run build
   ```
2. Andá a [Netlify](https://app.netlify.com) e inicá sesión (podés usar GitHub).
3. Arrastrá la carpeta `dist/` (que se generó en el paso 1) al área de *Drag and drop your site folder here*.
4. Apretá *Add environment variables* → agregá `VITE_TMDB_API_KEY` con tu API key de TMDB.
5. Listo. Netlify te da una URL como `https://nombre-aleatorio.netlify.app`.

**Alternativa: Deploy desde GitHub:**
1. Subí el repo a GitHub.
2. En Netlify: *Add new site → Import an existing project → GitHub*.
3. Elegí el repo.
4. En *Environment variables* agregá `VITE_TMDB_API_KEY`.
5. *Deploy site*.

Tu app se redeployea automáticamente cada vez que hacés push a `main`.

## Herramientas de IA utilizadas

- **GitHub Copilot** – Autocompletado de código en VS Code.
- **OpenCode** – Generación de scaffolding, componentes y documentación.
- **ChatGPT** – Decisiones arquitectónicas y revisión de código.

## Autor

**Tu Nombre** – [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com)

UTN – Desarrollo Ágil Asistido por IA
