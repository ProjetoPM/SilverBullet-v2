import { createBrowserRouter, RouteObject } from 'react-router-dom'

import { AuthRoutes } from './auth'
import { ProjectsRoutes } from './main/projects'
import { WeeklyEvaluationRoutes } from './main/weekly-evaluation'
import { WeeklyReportRoutes } from './main/weekly-report'
import { WorkspaceRoutes } from './main/workspaces'
import { ErrorRoutes } from './other/errors'

const routes: RouteObject[] = [
  AuthRoutes,
  WorkspaceRoutes,
  ProjectsRoutes,
  WeeklyReportRoutes,
  WeeklyEvaluationRoutes,
  ErrorRoutes
]

export const router = createBrowserRouter(routes)
