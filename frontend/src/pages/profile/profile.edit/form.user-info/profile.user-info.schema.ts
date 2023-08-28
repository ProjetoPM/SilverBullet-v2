import { z } from 'zod'

export const max = {
  firstName: 80,
  lastName: 170,
  fullName: 255,
  email: 255
}

export const ProfileSchema = z.object({
  firstName: z.string().min(3).max(max.firstName),
  lastName: z.string().max(max.lastName).optional(),
  fullName: z.string().max(max.fullName).optional(),
  email: z.string().email().max(max.email)
})

export const defaultValues = {
  firstName: '',
  lastName: '',
  fullName: '',
  email: ''
}
