import { ComponentLayout } from '@/layout/ComponentLayout'
import BusinessCasePage from '@/pages/business-case/business-case'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { RouteObject } from 'react-router-dom'
import { routes } from '../routes'

export const BusinessCaseRoute: RouteObject = {
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
          path: routes.business_case.edit,
          element: <BusinessCasePage />
        }
      ]
    }
  ]
}
