import { RouteObject } from 'react-router-dom'

import { ComponentLayout } from '@/layout/ComponentLayout'

import Profile from '@/pages/profile/profile/profile'
import ProfileEdit from '@/pages/profile/profile.edit/profile.edit'
import { AuthGuard } from '@/utils/guard'
import { routes } from '../routes'

export const ProfileRoutes: RouteObject = {
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
          path: routes.profile.index,
          element: <Profile />
        },
        {
          path: routes.profile.edit,
          element: <ProfileEdit />
        }
      ]
    }
  ]
}
