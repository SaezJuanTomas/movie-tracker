import { useState } from 'react'
import MovieCard from '../components/MovieCard'

export default function Watchlist({ watchlist, watched, onAddToWatchlist, onMarkWatched }) {
  const [filter, setFilter] = useState('')

  const filtered = watchlist.filter(m =>
    m.title.toLowerCase().includes(filter.toLowerCase())
  )

  if (watchlist.length === 0) {
    return (
      <div className="page">
        <h2>Watchlist</h2>
        <p className="status-msg">Your watchlist is empty. Search for movies and add them!</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h2>Watchlist ({watchlist.length})</h2>
      <input
        className="list-filter"
        type="text"
        placeholder="Filter by title..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      {filtered.length === 0 ? (
        <p className="status-msg">No movies match "{filter}".</p>
      ) : (
        <div className="movie-grid">
          {filtered.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAddToWatchlist={onAddToWatchlist}
              onMarkWatched={onMarkWatched}
              isInWatchlist={true}
              isWatched={watched.some(m => m.id === movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
