import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'

export const fetchThreads = createAsyncThunk('threads/fetch', async (params) => {
  const res = await api.getThreads(params)
  return res.data
})

export const fetchThreadById = createAsyncThunk('threads/fetchById', async (id) => {
  const res = await api.getThread(id)
  return res.data
})

const threadsSlice = createSlice({
  name: 'threads',
  initialState: { list: [], current: null, meta: {}, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => { state.status = 'loading' })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload.threads || action.payload.data || []
        state.meta = action.payload.meta || {}
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchThreadById.pending, (state) => { state.status = 'loading' })
      .addCase(fetchThreadById.fulfilled, (state, action) => { state.status = 'succeeded'; state.current = action.payload })
      .addCase(fetchThreadById.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message })
  }
})

export default threadsSlice.reducer
