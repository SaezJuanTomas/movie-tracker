import { useState, useEffect } from 'react'
import { getPopularMovies, searchMovies } from '../services/tmdb'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
import Loader from '../components/Loader'

export default function Home({ watchlist, watched, onAddToWatchlist, onMarkWatched }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    loadPopular()
  }, [])

  async function loadPopular() {
    setLoading(true)
    setError(null)
    setIsSearching(false)
    const data = await getPopularMovies()
    if (data.length === 0) {
      setError('Could not load popular movies. Check your API key.')
    } else {
      setMovies(data)
    }
    setLoading(false)
  }

  async function handleSearch(query) {
    setLoading(true)
    setError(null)
    setIsSearching(true)
    const data = await searchMovies(query)
    if (data.length === 0) {
      setError(`No results found for "${query}".`)
    } else {
      setMovies(data)
    }
    setLoading(false)
  }

  function isInWatchlist(id) {
    return watchlist.some(m => m.id === id)
  }

  function isWatched(id) {
    return watched.some(m => m.id === id)
  }

  return (
    <div className="page">
      <SearchBar onSearch={handleSearch} />
      <div className="search-actions">
        {isSearching && (
          <button className="btn-back" onClick={loadPopular}>Back to Popular</button>
        )}
      </div>

      {loading && <Loader />}
      {error && <p className="status-msg error">{error}</p>}

      <div className="movie-grid">
        {!loading && movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAddToWatchlist={onAddToWatchlist}
            onMarkWatched={onMarkWatched}
            isInWatchlist={isInWatchlist(movie.id)}
            isWatched={isWatched(movie.id)}
          />
        ))}
      </div>
    </div>
  )
}
