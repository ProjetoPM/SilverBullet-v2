import { ComponentLayout } from '@/layout/ComponentLayout'
import { GuestGuard } from '@/utils/guard'
import { RouteObject } from 'react-router-dom'

import LoginPage from '@/pages/auth/login'

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
          path: 'login',
          element: <LoginPage />
        },
        {
          path: 'register',
          element: <h1>Register</h1>
        }
      ]
    }
  ]
}
