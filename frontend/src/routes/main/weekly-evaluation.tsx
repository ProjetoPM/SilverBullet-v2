import { RouteObject } from 'react-router-dom'

import { ComponentLayout } from '@/layout/ComponentLayout'
import WeeklyEvaluationPage from '@/pages/weekly-evaluation/weekly-evaluation'
import { AuthGuard } from '@/utils/guard'
import { routes } from '../routes'

export const WeeklyEvaluationRoutes: RouteObject = {
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
          path: routes.weekly_evaluation.index,
          element: <WeeklyEvaluationPage />
        }
      ]
    }
  ]
}
