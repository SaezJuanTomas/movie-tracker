# Arquitectura de Movie Tracker

## Estructura de carpetas

```
src/
├── components/         ← Componentes reutilizables
│   ├── Navbar.jsx      ← Barra de navegación (Home, Watchlist, Watched)
│   ├── MovieCard.jsx   ← Tarjeta individual de película
│   ├── SearchBar.jsx   ← Input de búsqueda + botón
│   └── Loader.jsx      ← Spinner animado para carga
├── pages/              ← Páginas (cada una es una ruta)
│   ├── Home.jsx        ← Películas populares + búsqueda
│   ├── Watchlist.jsx   ← Lista "Quiero ver" con filtro
│   ├── Watched.jsx     ← Lista "Vistas" con filtro
│   └── NotFound.jsx    ← 404
├── services/
│   └── tmdb.js         ↑ Servicio de API (fetch, try/catch, mapeo)
├── hooks/
│   └── useLocalStorage.js  ↑ Hook + helpers (addToList, removeFromList, isInList)
├── App.jsx             ↑ Estado global + definición de rutas
├── App.css             ↑ Estilos generales
├── main.jsx            ↑ Entry point (BrowserRouter)
└── index.css           ↑ Reset y variables globales
```

## Flujo de datos

```
                         ┌─────────────────────┐
                         │    TMDB API (HTTP)   │
                         └────────┬────────────┘
                                  │ fetch()
                                  ▼
                         ┌─────────────────────┐
                         │   services/tmdb.js   │
                         │  getPopularMovies()  │
                         │  searchMovies(query) │
                         └────────┬────────────┘
                                  │ array de {id, title, year, poster, overview}
                                  ▼
                         ┌─────────────────────┐
                         │  App.jsx (estado)    │
                         │                      │
                         │  watchlist []        │◄──── useLocalStorage('watchlist')
                         │  watched   []        │◄──── useLocalStorage('watched')
                         │                      │
                         │  handleAddToWatchlist │
                         │  handleMarkWatched    │
                         └────────┬────────────┘
                                  │ props
                                  ▼
                ┌─────────────────────────────────┐
                │         React Router             │
                │  /  →  Home                      │
                │  /watchlist  →  Watchlist        │
                │  /watched    →  Watched          │
                │  *    →  NotFound                │
                └─────────────────────────────────┘
                                  │ props
                                  ▼
            ┌─────────────────────────────────────────┐
            │    MovieCard (componente compartido)     │
            │    Recibe: movie, onAddToWatchlist,      │
            │    onMarkWatched, isInWatchlist, isWatched│
            └─────────────────────────────────────────┘
```

## Flujo de estado

1. La app arranca en `main.jsx` con `<BrowserRouter>`.
2. `App.jsx` inicializa `watchlist` y `watched` desde `useLocalStorage` (carga automática).
3. Cada página recibe las listas y los handlers por props.
4. Cuando el usuario hace clic en *"Add to Watchlist"* o *"Mark as Watched"*:
   - `App.jsx` ejecuta el handler correspondiente.
   - El hook `useLocalStorage` actualiza el estado y persiste en `localStorage`.
5. Los helpers `addToList` y `removeFromList` evitan duplicados.

## Persistencia (LocalStorage)

| Clave | Valor | Ejemplo |
|---|---|---|
| `watchlist` | `[{id, title, year, poster, overview}]` | Lista de películas para ver |
| `watched` | `[{id, title, year, poster, overview}]` | Lista de películas vistas |

- Se guarda **cada vez que se modifica** una lista.
- Se carga **al iniciar la app** (en `useState` con lazy initializer).

## Dependencias externas

- `react` / `react-dom` – UI
- `react-router-dom` – Enrutamiento
- `vite` / `@vitejs/plugin-react` – Build tool
- TMDB API (v3) – Fuente de datos
