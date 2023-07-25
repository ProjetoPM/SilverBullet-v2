import { z } from 'zod'

export const schema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(100)
})

export const defaultValues = {
  email: '',
  password: ''
}

export type LoginSchema = z.infer<typeof schema>
