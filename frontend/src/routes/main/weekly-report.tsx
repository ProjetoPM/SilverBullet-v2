import { RouteObject } from 'react-router-dom'

import { ComponentLayout } from '@/layout/ComponentLayout'
import { AuthGuard } from '@/utils/guard'
import { routes } from '../routes'

import WeeklyReportPage from '@/pages/weekly-report/weekly-report'
import WeeklyReportList from '@/pages/weekly-report/weekly-report.list'

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
          element: <WeeklyReportList />
        },
        {
          path: routes.weekly_report.new,
          element: <WeeklyReportPage />
        },
        {
          path: routes.weekly_report.edit,
          element: <WeeklyReportPage />
        }
      ]
    }
  ]
}
