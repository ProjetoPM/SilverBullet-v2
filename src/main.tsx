import 'react-toastify/dist/ReactToastify.css'
import './i18n'
import './index.css'

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { router } from './routes'
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
        <RouterProvider router={router} />
      </HelmetProvider>
      {theme && <ToastContainer position="top-right" autoClose={3000} theme={theme} />}
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
