import { RouteObject } from 'react-router-dom'

import { Error404 } from '@/layout/Errors/Error404'

export const ErrorRoutes: RouteObject = {
  path: '/',
  children: [
    {
      path: '/401',
      element: <Error404 /> // TODO: Change to 401 page
    },
    {
      path: '/404',
      element: <Error404 />
    },
    {
      path: '*',
      element: <Error404 />
    }
  ]
}
