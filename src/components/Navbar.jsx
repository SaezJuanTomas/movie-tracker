import { Link, useLocation } from 'react-router-dom'
import '../App.css'

export default function Navbar() {
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/watchlist', label: 'Watchlist' },
    { to: '/watched', label: 'Watched' },
  ]

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Movie Tracker</Link>
      <div className="navbar-links">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={pathname === link.to ? 'active' : ''}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
