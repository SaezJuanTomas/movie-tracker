import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Watchlist from './pages/Watchlist'
import Watched from './pages/Watched'
import NotFound from './pages/NotFound'
import { useLocalStorage, addToList, removeFromList } from './hooks/useLocalStorage'
import './App.css'

export default function App() {
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', [])
  const [watched, setWatched] = useLocalStorage('watched', [])

  function handleAddToWatchlist(movie) {
    setWatchlist(current => addToList(current, movie))
  }

  function handleRemoveFromWatchlist(movieId) {
    setWatchlist(current => removeFromList(current, movieId))
  }

  function handleMarkWatched(movie) {
    const isWatched = watched.some(m => m.id === movie.id)
    if (isWatched) {
      setWatched(current => removeFromList(current, movie.id))
    } else {
      setWatched(current => addToList(current, movie))
      setWatchlist(current => removeFromList(current, movie.id))
    }
  }

  function handleAddToWatchlistOrRemove(movie) {
    const inWatchlist = watchlist.some(m => m.id === movie.id)
    if (inWatchlist) {
      handleRemoveFromWatchlist(movie.id)
    } else {
      handleAddToWatchlist(movie)
    }
  }

  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                watchlist={watchlist}
                watched={watched}
                onAddToWatchlist={handleAddToWatchlistOrRemove}
                onMarkWatched={handleMarkWatched}
              />
            }
          />
          <Route
            path="/watchlist"
            element={
              <Watchlist
                watchlist={watchlist}
                watched={watched}
                onAddToWatchlist={handleAddToWatchlistOrRemove}
                onMarkWatched={handleMarkWatched}
              />
            }
          />
          <Route
            path="/watched"
            element={
              <Watched
                watchlist={watchlist}
                watched={watched}
                onAddToWatchlist={handleAddToWatchlistOrRemove}
                onMarkWatched={handleMarkWatched}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}
