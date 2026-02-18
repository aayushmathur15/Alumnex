import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { store } from './store/store'
import './styles.css'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  )
}

createRoot(document.getElementById('root')).render(<App />)
