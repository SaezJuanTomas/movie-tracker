export default function MovieCard({ movie, onAddToWatchlist, onMarkWatched, isInWatchlist, isWatched }) {
  return (
    <div className="movie-card">
      {movie.poster ? (
        <img src={movie.poster} alt={`${movie.title} poster`} />
      ) : (
        <div className="movie-card-placeholder">No poster</div>
      )}
      <div className="movie-card-body">
        <h3>{movie.title}</h3>
        <span className="movie-year">{movie.year}</span>
        <p className="movie-overview">{movie.overview}</p>
        <div className="movie-card-actions">
          {!isWatched && (
            <button
              className={isInWatchlist ? 'btn-remove' : 'btn-add'}
              onClick={() => onAddToWatchlist(movie)}
            >
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          )}
          <button
            className={isWatched ? 'btn-remove' : 'btn-add'}
            onClick={() => onMarkWatched(movie)}
          >
            {isWatched ? 'Remove from Watched' : 'Mark as Watched'}
          </button>
        </div>
      </div>
    </div>
  )
}
