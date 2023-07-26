import { RouteObject } from 'react-router-dom'

import { ComponentLayout } from '@/layout/ComponentLayout'

import HomePage from '@/pages/workspace'
import { AuthGuard } from '@/utils/guard'
import { routes } from '../routes'

export const WorkspaceRoutes: RouteObject = {
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
          path: routes.workspaces.index,
          element: <HomePage />
        }
      ]
    }
  ]
}
