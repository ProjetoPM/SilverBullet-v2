import { createBrowserRouter, RouteObject } from 'react-router-dom'

import { AuthRoutes } from './auth/AuthRoutes'
import { HomeRoutes } from './HomeRoute'

const routes: RouteObject[] = [
  AuthRoutes,
  HomeRoutes,
  {
    path: '*',
    element: <h1>Error 404</h1>
  }
]

export const router = createBrowserRouter(routes)
