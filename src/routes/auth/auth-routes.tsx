import { ComponentLayout } from '@/layout/ComponentLayout'
import { GuestGuard } from '@/utils/guard'
import { RouteObject } from 'react-router-dom'

import LoginPage from '@/pages/auth/login'
import { routes } from '../routes'

export const AuthRoutes: RouteObject = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <GuestGuard>
          <ComponentLayout />
        </GuestGuard>
      ),
      children: [
        {
          path: routes.auth.index,
          element: <LoginPage />
        },
        {
          path: routes.auth.register,
          element: <h1>Register</h1>
        }
      ]
    }
  ]
}
