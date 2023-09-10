import { createBrowserRouter, RouteObject } from 'react-router-dom'

import { AuthRoutes } from './auth'
import { BusinessCaseRoute } from './main/business-case'
import { ProjectsRoutes } from './main/projects'
import { WeeklyReportRoutes } from './main/weekly-report'
import { WorkspaceRoutes } from './main/workspaces'
import { ErrorRoutes } from './other/errors'
const routes: RouteObject[] = [
  AuthRoutes,
  WorkspaceRoutes,
  ProjectsRoutes,
  WeeklyReportRoutes,
  ErrorRoutes,
  BusinessCaseRoute
]

export const router = createBrowserRouter(routes)
