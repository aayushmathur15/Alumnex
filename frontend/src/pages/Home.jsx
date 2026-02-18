import React, { useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCompanies } from '../features/companiesSlice'
import CompanyCard from '../components/CompanyCard'
import Skeleton from '../components/Skeleton'

export default function Home() {
  const dispatch = useDispatch()
  const { list, status } = useSelector(s => s.companies)

  useEffect(() => { dispatch(fetchCompanies({ page: 1, perPage: 12 })) }, [dispatch])

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-2xl font-semibold">Companies</h1>
          {status === 'loading' ? (
            <div className="space-y-3">
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </div>
          ) : (
            list.map((c) => <CompanyCard key={c._id || c.id} company={c} />)
          )}
        </div>
        <aside className="space-y-4">
          <div className="card p-4">
            <h3 className="font-semibold">Overview</h3>
            <div className="text-sm text-muted mt-2">Filter by company, role, year, difficulty</div>
          </div>
        </aside>
      </div>
    </MainLayout>
  )
}
