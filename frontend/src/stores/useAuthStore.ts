import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { StatusCodes } from 'http-status-codes'
import i18next from 'i18next'
import { toast } from 'react-toastify'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { resetWorkspaceStore } from './useWorkspaceStore'

type AuthCredentials = {
  email: string
  password: string
  rememberMe: boolean
}

type State = {
  token: string | null
  rememberMe: boolean
  isAuthenticating: boolean
  email?: string
}

type Actions = {
  signIn: (credentials: AuthCredentials) => Promise<void>
  signOut: () => void
}

export const useAuthStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        rememberMe: false,
        isAuthenticating: false,
        email: undefined,
        signIn: async ({ email, password }: AuthCredentials) => {
          set({ isAuthenticating: true })

          const response = await api
            .post('/auth/sign-in', {
              email,
              password
            })
            .then((res) => res)
            .catch((err) => err.response)
            .finally(() => set({ isAuthenticating: false }))

          if (!response) {
            toast.error(i18next.t('error.unknown_error'))
            return
          }

          if (response.status === StatusCodes.BAD_REQUEST) {
            set({ isAuthenticating: false })
            toast.error(response.data)
            return
          }

          if (response.status === StatusCodes.OK) {
            set({ token: response.data, isAuthenticating: false, email: email })
            toast.success(i18next.t('success.sign_in'))
            history.pushState(null, '', routes.workspaces.index)
          }
        },
        signOut: () => {
          set({ token: null, email: undefined })
          resetWorkspaceStore()
          toast.info(i18next.t('info.sign_out'))
          history.pushState(null, '', routes.auth.index)
        }
      }),
      {
        name: 'token',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ token: state.token, email: state.email })
      }
    )
  )
)
