import { useAuth } from '@/stores/useAuth'
import axios, { AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'

const setup = () => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API as string,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === StatusCodes.UNAUTHORIZED) {
        useAuth.getState().signOut()
      }
      return Promise.reject(error)
    }
  )
  return api
}

export const api = setup()
