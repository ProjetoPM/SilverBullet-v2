import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(64)
})

export const defaultValues = {
  email: '',
  password: ''
}
