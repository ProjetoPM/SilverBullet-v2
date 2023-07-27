import { createBrowserRouter, RouteObject } from 'react-router-dom'

import { AuthRoutes } from './auth'
import { ErrorRoutes } from './other/errors'
import { WorkspaceRoutes } from './other/workspaces'

const routes: RouteObject[] = [AuthRoutes, WorkspaceRoutes, ErrorRoutes]

export const router = createBrowserRouter(routes)
