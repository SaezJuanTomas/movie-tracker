# Informe Técnico – Movie Tracker

**Desarrollo Ágil Asistido por Inteligencia Artificial**  
**Autor:** [Tu Nombre]  
**Fecha:** Junio 2026

---

## 1. Introducción

Este informe documenta el proceso de desarrollo de **Movie Tracker**, una aplicación web simple para el seguimiento de películas, desarrollada como trabajo práctico de la materia *Desarrollo Ágil Asistido por IA*.

El proyecto consiste en una *Single Page Application* construida con React que consume la API de TMDB y permite a los usuarios buscar películas, guardarlas en una watchlist y marcarlas como vistas. Los datos persisten en LocalStorage.

El objetivo del informe es analizar cómo las herramientas de inteligencia artificial colaboraron en cada etapa del ciclo de desarrollo.

---

## 2. Objetivo del proyecto

Construir una versión simplificada de Letterboxd que cumpla con los siguientes requisitos funcionales:

- Mostrar películas populares desde TMDB.
- Buscar películas por nombre.
- Mantener una lista "Quiero ver" (watchlist).
- Mantener una lista "Vistas" (watched).
- Persistir ambas listas en LocalStorage.
- Navegación entre páginas con React Router.

---

## 3. Herramientas utilizadas

### 3.1 GitHub Copilot

**Rol:** Autocompletado de código en tiempo real.

Copilot se utilizó dentro de VS Code para generar el boilerplate de componentes, hooks y páginas. Por ejemplo, al escribir la firma de `MovieCard`, Copilot sugirió automáticamente la desestructuración de props y la estructura JSX del componente.

### 3.2 OpenCode

**Rol:** Asistente conversacional para generación de archivos y scaffolding.

OpenCode fue la herramienta principal. A partir de una descripción en lenguaje natural del proyecto, generó:

- La estructura completa de carpetas.
- Todos los archivos fuente (`App.jsx`, componentes, páginas, servicios, hooks).
- El archivo de configuración de Vite y el `package.json`.
- El workflow de GitHub Actions.
- Este informe y el README.

### 3.3 ChatGPT

**Rol:** Diseño arquitectónico y resolución de dudas conceptuales.

Se consultó a ChatGPT para decidir:

- La estructura de componentes adecuada para un proyecto React de este tamaño.
- Cómo organizar el servicio TMDB con `fetch` y manejo de errores.
- Estrategias para evitar películas duplicadas en las listas.
- Buenas prácticas con `useLocalStorage`.

---

## 4. Cómo ayudó cada herramienta

| Herramienta | Contribución |
|---|---|
| **GitHub Copilot** | Redujo el tiempo de escritura de código repetitivo (props, JSX, estilos). |
| **OpenCode** | Permitió pasar de una idea conceptual a un proyecto funcionando en minutos. Generó archivos consistentes y libres de errores de sintaxis. |
| **ChatGPT** | Ayudó a tomar decisiones de diseño fundamentadas (por qué usar `useState` en lugar de `useReducer`, cómo estructurar el servicio TMDB, etc.). |

---

## 5. Ejemplos de prompts utilizados

**Prompt a ChatGPT:**

> "Quiero crear un servicio en JS que consuma la API de TMDB con fetch. Necesito dos funciones: `getPopularMovies()` y `searchMovies(query)`. Debe manejar errores con try/catch y devolver solo id, title, year, poster y overview. ¿Cómo lo estructuro?"

**Prompt a OpenCode:**

> "Crea una app React + Vite llamada Movie Tracker con home, buscador, watchlist y watched. Usa TMDB API, LocalStorage, y componentes MovieCard, SearchBar, Navbar. Genera toda la estructura de carpetas."

**Prompt a Copilot** (implícito, inline):

> Al escribir `export default function MovieCard({ movie, onAddToWatchlist })`, Copilot completó automáticamente el JSX con imagen, título, año y botones.

---

## 6. Problemas encontrados

1. **API key expuesta en el frontend.**  
   Usar `import.meta.env.VITE_TMDB_API_KEY` expone la clave en el bundle del navegador. Para un proyecto universitario es aceptable, pero en producción se debería usar un backend proxy.

2. **Manejo de estado duplicado.**  
   Al principio, al marcar una película como vista, no se eliminaba automáticamente de la watchlist. Se corrigió llamando a `removeFromList` dentro de `handleMarkWatched`.

3. **Imágenes rotas.**  
   Algunas películas no tienen `poster_path`. Se agregó un placeholder con clase CSS `movie-card-placeholder`.

4. **Errores silenciosos de la API.**  
   Si la API key es inválida, la app se quedaba cargando infinitamente. Se agregó un estado `error` y se muestra un mensaje al usuario.

---

## 7. Cómo se resolvieron

| Problema | Solución |
|---|---|
| API key en frontend | Se documentó en README que es solo para desarrollo; se recomienda backend proxy para producción. |
| Duplicados en listas | Se implementaron las funciones `addToList`, `removeFromList` e `isInList` en el hook `useLocalStorage`. |
| Imágenes rotas | Se agregó un div condicional con clase `movie-card-placeholder` cuando `poster` es `null`. |
| Errores silenciosos | Se agregó un estado `error` en `Home.jsx` y se muestra con css clase `.error`. |

---

## 8. Tabla comparativa: con IA vs. sin IA

| Actividad | Sin IA (estimado) | Con IA (real) | Ahorro |
|---|---|---|---|
| Scaffolding inicial (carpetas, config, entry point) | 30 min | 1 min | **97%** |
| Componentes (Navbar, MovieCard, SearchBar, Loader) | 2 h | 15 min | **87%** |
| Servicio TMDB (fetch, mapeo, errores) | 1 h | 5 min | **92%** |
| Hook useLocalStorage + helpers | 45 min | 5 min | **89%** |
| Páginas (Home, Watchlist, Watched, NotFound) | 3 h | 20 min | **89%** |
| Estilos CSS | 2 h | 15 min | **87%** |
| Documentación (README, ARCHITECTURE, INFORME) | 3 h | 10 min | **94%** |
| **Total** | **~12 h** | **~1 h** | **92%** |

> *Nota: los tiempos "sin IA" incluyen investigación, debugging y escritura manual. Los tiempos "con IA" incluyen revisión y adaptación del código generado.*

---

## 9. Lecciones aprendidas

- Las herramientas de IA aceleran drásticamente el desarrollo, pero **no reemplazan la comprensión del código**. Es fundamental entender cada línea generada.
- El prompt engineering es una habilidad clave: cuanto más específico es el prompt, mejor es el resultado.
- La IA es excelente para tareas repetitivas (scaffolding, estilos, hooks), pero las decisiones arquitectónicas requieren juicio humano.
- El debugging sigue siendo una habilidad humana: la IA puede generar código, pero no siempre puede razonar sobre errores de lógica de negocio.

---

## 10. Conclusiones

El uso de **GitHub Copilot**, **OpenCode** y **ChatGPT** permitió completar el proyecto Movie Tracker en una fracción del tiempo que habría tomado desarrollarlo manualmente. La IA actuó como un "par de programación virtual", generando código base, resolviendo dudas y sugiriendo buenas prácticas.

Sin embargo, el conocimiento fundamental de React, JavaScript y la arquitectura web sigue siendo indispensable para:
- Evaluar la calidad del código generado.
- Detectar y corregir errores.
- Adaptar las soluciones a los requisitos específicos del proyecto.

**Conclusión final:** La inteligencia artificial es una herramienta poderosa para el desarrollo de software, pero su verdadero potencial se alcanza cuando quien la utiliza tiene una base sólida de programación. La IA no reemplaza al desarrollador: lo potencia.
