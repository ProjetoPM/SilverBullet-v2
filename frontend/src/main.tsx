import 'react-toastify/dist/ReactToastify.css'
import './i18n'
import './index.css'

import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Loading } from './components/Loading'
import { router } from './routes'
import { queryClient } from './services/react-query'
import { useThemeStore } from './stores/useThemeStore'

export const App = () => {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    document.body.removeAttribute('class')
    document.body.classList.add(theme)
  }, [theme])

  return (
    <React.StrictMode>
      <>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<Loading size={32} />}>
              <RouterProvider router={router} />
            </Suspense>
          </QueryClientProvider>
        </HelmetProvider>
        {theme && (
          <ToastContainer
            position="bottom-right"
            autoClose={2250}
            theme={theme}
          />
        )}
      </>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
