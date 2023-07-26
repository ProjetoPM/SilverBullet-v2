import { createBrowserRouter, RouteObject } from 'react-router-dom'

import { AuthRoutes } from './auth'
import { WorkspaceRoutes } from './other/workspaces'
import { Error404 } from '@/layout/Errors/Error404'

const routes: RouteObject[] = [
  AuthRoutes,
  WorkspaceRoutes,
  {
    path: '*',
    element: <Error404 />
  }
]

export const router = createBrowserRouter(routes)
