import { useState } from 'react'
import MovieCard from '../components/MovieCard'

export default function Watched({ watchlist, watched, onAddToWatchlist, onMarkWatched }) {
  const [filter, setFilter] = useState('')

  const filtered = watched.filter(m =>
    m.title.toLowerCase().includes(filter.toLowerCase())
  )

  if (watched.length === 0) {
    return (
      <div className="page">
        <h2>Watched</h2>
        <p className="status-msg">No movies marked as watched yet.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h2>Watched ({watched.length})</h2>
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
              isInWatchlist={watchlist.some(m => m.id === movie.id)}
              isWatched={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}
