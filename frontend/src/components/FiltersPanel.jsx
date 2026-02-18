import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function FiltersPanel({ filters = {}, onChange = () => {} }) {
  const [params] = useSearchParams()

  return (
    <aside className="w-full md:w-64 space-y-4">
      <div className="card p-4">
        <h4 className="font-semibold">Filters</h4>
        <div className="mt-3 text-sm text-muted">Syncs with URL query params</div>
      </div>
      <div className="card p-4 space-y-2">
        <label className="text-xs text-muted">Difficulty</label>
        <div className="flex gap-2 mt-2">
          {['Easy','Medium','Hard'].map(d => (
            <button key={d} onClick={() => onChange('difficulty', d)} className="px-2 py-1 bg-gray-100 rounded text-sm">{d}</button>
          ))}
        </div>
      </div>
    </aside>
  )
}
