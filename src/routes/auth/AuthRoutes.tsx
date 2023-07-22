import { RouteObject } from 'react-router-dom'

import { ComponentLayout } from '@/layout/ComponentLayout'

import SignIn from '@/pages/auth/sign-in'
import SignUp from '@/pages/auth/sign-up'

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
          element: <SignIn title="Sign In" />
        },
        {
          path: 'register',
          element: <SignUp title="Sign Up" />
        }
      ]
    }
  ]
}
