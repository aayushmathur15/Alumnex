import React from 'react'
import Header from '../components/Header'

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6 w-full">{children}</main>
      <footer className="text-center text-sm text-muted py-6">© Alumnex</footer>
    </div>
  )
}
