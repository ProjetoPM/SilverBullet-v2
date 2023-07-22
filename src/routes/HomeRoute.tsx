import { RouteObject } from 'react-router-dom'

import { ComponentLayout } from '@/layout/ComponentLayout'

import HomePage from '@/pages/home'
import { AuthGuard } from '@/utils/guard'

export const HomeRoutes: RouteObject = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <ComponentLayout layout="simple" />
        </AuthGuard>
      ),
      children: [
        {
          path: 'home',
          element: <HomePage />
        }
      ]
    }
  ]
}
