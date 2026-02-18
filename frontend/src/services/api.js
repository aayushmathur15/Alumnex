import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const client = axios.create({ baseURL: BASE, timeout: 15000 })

export default {
  getCompanies: (params) => client.get('/companies', { params }),
  getCompanyBySlug: (slug) => client.get(`/companies/${slug}`),
  getThreads: (params) => client.get('/threads', { params }),
  getThread: (id) => client.get(`/threads/${id}`),
  search: (q, params) => client.get('/search', { params: { q, ...params } }),
  getStats: (type) => client.get(`/stats/${type}`)
}
