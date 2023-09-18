import { createBrowserRouter, RouteObject } from 'react-router-dom'

import { AuthRoutes } from './auth'
import { BusinessCaseRoute } from './main/business-case'
import { ProjectsRoutes } from './main/projects'
import { WeeklyEvaluationRoutes } from './main/weekly-evaluation'
import { WeeklyReportRoutes } from './main/weekly-report'
import { WorkspaceRoutes } from './main/workspaces'
import { ErrorRoutes } from './other/errors'
import { ProjectCharterRoutes } from './pages/project-charter.route'

const routes: RouteObject[] = [
  AuthRoutes,
  WorkspaceRoutes,
  ProjectsRoutes,
  WeeklyReportRoutes,
  WeeklyEvaluationRoutes,
  ErrorRoutes,
  ProjectCharterRoutes,
  BusinessCaseRoute
]

export const router = createBrowserRouter(routes)
