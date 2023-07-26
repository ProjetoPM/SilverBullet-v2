import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(100),
  rememberMe: z.boolean()
})

export const defaultValues = {
  email: '',
  password: '',
  rememberMe: true
}
