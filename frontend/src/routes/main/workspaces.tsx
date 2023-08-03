import { RouteObject } from 'react-router-dom'

import { ComponentLayout } from '@/layout/ComponentLayout'

import { AuthGuard } from '@/utils/guard'
import { routes } from '../routes'
import WorkspaceListPage from '@/pages/@workspace/workspace.list'
import WorkspacePage from '@/pages/@workspace/workspace'

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
          element: <WorkspaceListPage />
        },
        {
          path: routes.workspaces.new,
          element: <WorkspacePage />
        },
        {
          path: routes.workspaces.edit,
          element: <WorkspacePage />
        }
      ]
    }
  ]
}
