import { RouteObject } from 'react-router-dom'

import { ComponentLayout } from '@/layout/ComponentLayout'

import LoginPage from '@/pages/auth/login'
import RegisterPage from '@/pages/auth/register'

import { GuestGuard } from '@/utils/guard'

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
          element: <LoginPage title="Sign In" />
        },
        {
          path: 'register',
          element: <RegisterPage title="Sign Up" />
        }
      ]
    }
  ]
}
