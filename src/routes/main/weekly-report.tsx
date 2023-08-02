import { RouteObject } from 'react-router-dom'

import { ComponentLayout } from '@/layout/ComponentLayout'

import WeeklyReportPage from '@/pages/weekly-report/weekly-report'
import { AuthGuard } from '@/utils/guard'
import { routes } from '../routes'

export const WeeklyReportRoutes: RouteObject = {
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
          path: routes.weekly_report.index,
          element: <WeeklyReportPage />
        },
        {
          path: routes.weekly_report.new,
          element: <WeeklyReportPage />
        }
      ]
    }
  ]
}
