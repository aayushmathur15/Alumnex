import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'

export const fetchCompanies = createAsyncThunk('companies/fetch', async (params) => {
  const res = await api.getCompanies(params)
  return res.data
})

const companiesSlice = createSlice({
  name: 'companies',
  initialState: { list: [], meta: {}, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => { state.status = 'loading' })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload.companies || action.payload.data || []
        state.meta = action.payload.meta || {}
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default companiesSlice.reducer
