import { api } from '@/service/api'
import { AxiosHeaders } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type AuthCredentials = {
  email: string
  password: string
}

type AuthProps = {
  token: string | null
  signIn: (credentials: AuthCredentials) => Promise<AxiosHeaders>
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
            .catch((err) => err)

          if (response.status === StatusCodes.OK) {
            set({ token: response.data })
            api.defaults.headers['Authorization'] = `Bearer ${get().token}`
          }
          return response
        }
      }),
      {
        name: 'token'
      }
    )
  )
)

export { useAuth }
