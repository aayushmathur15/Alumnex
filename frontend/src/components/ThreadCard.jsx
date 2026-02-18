import React from 'react'
import { Link } from 'react-router-dom'

export default function ThreadCard({ thread }) {
  return (
    <article className="card p-4">
      <Link to={`/thread/${thread._id || thread.id}`} className="font-semibold hover:underline">{thread.title}</Link>
      <div className="flex items-center justify-between mt-2 text-sm text-muted">
        <div>{thread.companyName}</div>
        <div className="flex gap-2 items-center">
          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{thread.difficulty || 'N/A'}</span>
          <span className="text-xs">{thread.year || ''}</span>
        </div>
      </div>
    </article>
  )
}
