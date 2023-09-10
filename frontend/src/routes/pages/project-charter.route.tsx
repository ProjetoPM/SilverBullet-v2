import { RouteObject } from 'react-router-dom'

import { ComponentLayout } from '@/layout/ComponentLayout'

import ProjectCharter from '@/pages/areas/integration/initiating/project-charter/project-charter'
import { AuthGuard } from '@/utils/guard'
import { routes } from '../routes'

export const ProjectCharterRoutes: RouteObject = {
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
          path: routes.integration.project_charter.index,
          element: <ProjectCharter />
        }
      ]
    }
  ]
}
