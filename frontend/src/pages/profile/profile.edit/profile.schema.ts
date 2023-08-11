import { string, z } from 'zod'

export const max = {
  firstName: 80,
  lastName: 175,
  fullName: 255,
  email: 255
}

export const ProfileSchema = z.object({
  firstName: string(),
  lastName: string(),
  fullName: string(),
  phoneNumber: string(),
  email: string(),
})

export const defaultValues = {
  firstName: '',
  lastName: '',
  fullName: '',
  email: ''
}
