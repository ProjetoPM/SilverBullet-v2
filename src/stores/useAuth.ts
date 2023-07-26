import { routes } from '@/routes/routes'
import { api } from '@/services/api'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'react-toastify'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type AuthCredentials = {
  email: string
  password: string
  rememberMe: boolean
}

type State = {
  token: string | null
  rememberMe: boolean
  isAuthenticating: boolean
}

type Actions = {
  signIn: (credentials: AuthCredentials) => Promise<void>
  signOut: () => void
}

const useAuth = create<State & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        rememberMe: false,
        isAuthenticating: false,
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
            toast.error('Unknown error')
            return
          }

          if (response.status === StatusCodes.BAD_REQUEST) {
            set({ isAuthenticating: false })
            toast.error(response.data)
            return
          }

          if (response.status === StatusCodes.OK) {
            set({ token: response.data, isAuthenticating: false })
            api.defaults.headers['Authorization'] = `Bearer ${get().token}`
            toast.success('Logged in successfully!')
            history.pushState(null, '', routes.auth.index)
          }
        },
        signOut: () => {
          set({ token: null })
          api.defaults.headers['Authorization'] = null
          toast.info('Logged out successfully!')
          history.pushState(null, '', routes.auth.index)
        }
      }),
      {
        name: 'token',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ token: state.token })
      }
    )
  )
)

export { useAuth }
