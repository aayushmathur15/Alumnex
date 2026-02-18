import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="w-full border-b bg-white sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-sky-400 flex items-center justify-center text-white font-semibold">A</div>
          <div>
            <div className="font-semibold">Alumnex</div>
            <div className="text-xs text-muted">Placement Experience Platform</div>
          </div>
        </Link>
        <nav className="flex items-center gap-3">
          <Link to="/" className="text-sm text-muted hover:text-gray-900">Companies</Link>
          <Link to="/search" className="text-sm text-muted hover:text-gray-900">Search</Link>
        </nav>
      </div>
    </header>
  )
}
