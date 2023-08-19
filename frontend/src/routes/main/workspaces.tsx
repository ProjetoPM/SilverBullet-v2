import { RouteObject } from 'react-router-dom'

import { ComponentLayout } from '@/layout/ComponentLayout'

import WorkspaceUsersPage from '@/pages/@workspace/users/workspace.users.list'
import WorkspacePage from '@/pages/@workspace/workspace'
import WorkspaceListPage from '@/pages/@workspace/workspace.list'
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
          element: <WorkspaceListPage />
        },
        {
          path: routes.workspaces.new,
          element: <WorkspacePage />
        },
        {
          path: routes.workspaces.edit,
          element: <WorkspacePage />
        },
        {
          path: routes.workspaces.users.index,
          element: <WorkspaceUsersPage />
        }
      ]
    }
  ]
}
