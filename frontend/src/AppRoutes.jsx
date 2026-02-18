import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Toast from './components/Toast'

const Home = lazy(() => import('./pages/Home'))
const CompanyDetail = lazy(() => import('./pages/CompanyDetail'))
const ThreadDetail = lazy(() => import('./pages/ThreadDetail'))
const SearchResults = lazy(() => import('./pages/SearchResults'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function AppRoutes(){
  return (
    <>
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/company/:slug" element={<CompanyDetail/>} />
          <Route path="/thread/:id" element={<ThreadDetail/>} />
          <Route path="/search" element={<SearchResults/>} />
          <Route path="/admin/*" element={<div className="p-6">Admin (future)</div>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Suspense>
      <Toast />
    </>
  )
}
