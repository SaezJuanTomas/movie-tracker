const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const options = {
  method: 'GET',
  headers: { accept: 'application/json' },
}

async function fetchFromTMDB(endpoint) {
  try {
    const response = await fetch(
      `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}&language=en-US`,
      options
    )
    if (!response.ok) {
      throw new Error(`TMDB error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? movie.release_date.slice(0, 4) : 'N/A',
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      overview: movie.overview,
    }))
  } catch (error) {
    console.error('Failed to fetch from TMDB:', error.message)
    return []
  }
}

export async function getPopularMovies() {
  return fetchFromTMDB('/movie/popular')
}

export async function searchMovies(query) {
  const encoded = encodeURIComponent(query.trim())
  return fetchFromTMDB(`/search/movie?query=${encoded}`)
}
