import { string, z } from 'zod'

export const WorkspaceSchema = z.object({
  name: string()
    .min(3)
    .max(50)
    .refine((value) => value.replace(/<[^>]+>/g, '').length >= 3, {
      params: {
        i18n: { key: 'at_least', values: { minimum: 3 } }
      }
    })
    .refine((value) => value.replace(/<[^>]+>/g, '').length <= 50, {
      params: {
        i18n: { key: 'at_most', values: { maximum: 50 } }
      }
    })
})

export const defaultValues = {
  name: ''
}
