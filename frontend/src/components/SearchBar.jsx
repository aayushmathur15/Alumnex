import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import useDebounce from '../hooks/useDebounce'
import { useState, useEffect } from 'react'

export default function SearchBar({ initial = '' }) {
  const [q, setQ] = useState(initial)
  const debounced = useDebounce(q, 350)
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (debounced.length === 0) return
    params.set('q', debounced)
    setParams(params)
    navigate('/search?' + params.toString())
  }, [debounced])

  return (
    <div className="w-full">
      <input
        aria-label="Search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search companies, roles, experiences..."
        className="w-full border rounded-lg px-3 py-2 shadow-sm"
      />
    </div>
  )
}
