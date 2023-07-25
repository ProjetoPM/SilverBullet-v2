import { createBrowserRouter, RouteObject } from 'react-router-dom'

import { AuthRoutes } from './auth/auth-routes'
import { HomeRoutes } from './home-routes'

const routes: RouteObject[] = [
  AuthRoutes,
  HomeRoutes,
  {
    path: '*',
    element: <h1>Error 404</h1>
  }
]

export const router = createBrowserRouter(routes)
