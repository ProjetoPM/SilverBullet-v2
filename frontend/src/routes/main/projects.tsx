import { RouteObject } from 'react-router-dom'

import { ComponentLayout } from '@/layout/ComponentLayout'

import ProjectsListPage from '@/pages/@projects/projects.list'
import { AuthGuard } from '@/utils/guard'
import { routes } from '../routes'
import ProjectsPage from '@/pages/@projects/projects'

export const ProjectsRoutes: RouteObject = {
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
          path: routes.projects.index,
          element: <ProjectsListPage />
        },
        {
          path: routes.projects.new,
          element: <ProjectsPage />
        },
        {
          path: routes.projects.edit,
          element: <ProjectsPage />
        }
      ]
    }
  ]
}
