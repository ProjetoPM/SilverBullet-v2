import 'react-toastify/dist/ReactToastify.css'
import './i18n'
import './index.css'

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { router } from './routes'
import { queryClient } from './services/react-query'
import { useTheme } from './stores/useTheme'

export const App = () => {
  const theme = useTheme((state) => state.theme)

  useEffect(() => {
    document.body.removeAttribute('class')
    document.body.classList.add(theme)
  }, [theme])

  return (
    <React.StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
      {theme && (
        <ToastContainer position="top-right" autoClose={1500} theme={theme} />
      )}
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
