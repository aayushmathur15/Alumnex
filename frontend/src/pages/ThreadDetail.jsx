import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { fetchThreadById } from '../features/threadsSlice'
import Skeleton from '../components/Skeleton'

export default function ThreadDetail(){
  const { id } = useParams()
  const dispatch = useDispatch()
  const { current, status } = useSelector(s => s.threads)

  useEffect(() => { dispatch(fetchThreadById(id)) }, [dispatch, id])

  return (
    <MainLayout>
      {status === 'loading' ? <Skeleton className="h-8" /> : (
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{current?.title}</h1>
          <div className="text-sm text-muted">{current?.companyName} • {current?.difficulty}</div>
          <div className="prose">{current?.body}</div>
        </div>
      )}
    </MainLayout>
  )
}
