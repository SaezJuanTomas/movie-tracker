import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page not-found">
      <h2>404 — Page not found</h2>
      <p className="status-msg">The page you are looking for does not exist.</p>
      <Link to="/" className="btn-back" style={{ display: 'inline-block', marginTop: '1rem' }}>
        Back to Home
      </Link>
    </div>
  )
}
