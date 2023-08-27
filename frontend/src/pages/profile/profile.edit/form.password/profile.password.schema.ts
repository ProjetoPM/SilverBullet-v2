import { t } from 'i18next'
import { z } from 'zod'

export const max = {
  password: 255
}

export const PasswordSchema = z.object({
  passwords: z
    .object({
      confirmPassword: z.string().min(3).max(max.password),
      newPassword: z.string().min(3).max(max.password)
    })
    .refine((data) => data.confirmPassword === data.newPassword, {
      //message: 'senhas não coincidem!',
      message: t('custom:password_not_match'),
      path: ['confirmPassword']
    }),
  currentPassword: z.string().min(3).max(max.password)
})

export const defaultValues: z.infer<typeof PasswordSchema> = {
  passwords: { newPassword: '', confirmPassword: '' },
  currentPassword: ''
}
