import { createBrowserRouter, RouteObject } from 'react-router-dom'

import { AuthRoutes } from './auth'
import { ErrorRoutes } from './other/errors'
import { WorkspaceRoutes } from './main/workspaces'
import { ProjectsRoutes } from './main/projects'
import { WeeklyReportRoutes } from './main/weekly-report'
import { ProfileRoutes } from './main/profile'
const routes: RouteObject[] = [
  AuthRoutes,
  WorkspaceRoutes,
  ProjectsRoutes,
  WeeklyReportRoutes,
  ErrorRoutes,
  ProfileRoutes
]

export const router = createBrowserRouter(routes)
