import { api } from '@/service/api'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'react-toastify'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type AuthCredentials = {
  email: string
  password: string
}

type AuthProps = {
  token: string | null
  signIn: (credentials: AuthCredentials) => Promise<void>
  signOut: () => void
}

const useAuth = create<AuthProps>()(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        signIn: async ({ email, password }: AuthCredentials) => {
          const response = await api
            .post('/auth/sign-in', {
              email,
              password
            })
            .then((res) => res)
            .catch((err) => err.response)

          if (response.status === StatusCodes.BAD_REQUEST) {
            toast.error(response.data)
            return
          }

          if (response.status === StatusCodes.OK) {
            set({ token: response.data })
            api.defaults.headers['Authorization'] = `Bearer ${get().token}`
            toast.success('Logged in successfully!')
            history.pushState(null, '', '/home')
          }
        },
        signOut: () => {
          set({ token: null })
          api.defaults.headers['Authorization'] = null
          toast.success('Logged out successfully!')
          history.pushState(null, '', '/login')
        }
      }),
      {
        name: 'token'
      }
    )
  )
)

export { useAuth }
