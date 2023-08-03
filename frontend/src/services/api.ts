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

  /**
   * Interceptor to handle the errors
   */
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === StatusCodes.UNAUTHORIZED) {
        history.pushState({}, '', '/401')
      }
      return Promise.reject(error)
    }
  )

  /**
   * Interceptor to add the token and the lang
   * in the request header
   */
  api.interceptors.request.use((config) => {
    const token = useAuth.getState().token
    const lang = localStorage.getItem('lang') ?? 'en-US'

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers['Accept-Language'] = lang
    return config
  })

  return api
}

export const api = setup()
