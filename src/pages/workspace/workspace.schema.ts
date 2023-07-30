import { string, z } from 'zod'

export const max_length = {
  name: 50
}

export const WorkspaceSchema = z.object({
  name: string()
    .refine((value) => value.replace(/<[^>]+>/g, '').length >= 3, {
      params: {
        i18n: { key: 'at_least', values: { minimum: 3 } }
      }
    })
    .refine(
      (value) => value.replace(/<[^>]+>/g, '').length <= max_length.name,
      {
        params: {
          i18n: { key: 'at_most', values: { maximum: max_length.name } }
        }
      }
    )
})

export const defaultValues = {
  name: ''
}
