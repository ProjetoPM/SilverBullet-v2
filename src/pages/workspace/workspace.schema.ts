import { replaceHtmlTagsComparing } from '@/utils/replace-html-tags'
import { string, z } from 'zod'

export const max_length = {
  name: 50
}

export const WorkspaceSchema = z.object({
  name: string()
    .refine((value) => replaceHtmlTagsComparing(value, 3, '>='), {
      params: {
        i18n: { key: 'at_least', values: { minimum: 3 } }
      }
    })
    .refine((value) => replaceHtmlTagsComparing(value, max_length.name, '<='), {
      params: {
        i18n: { key: 'at_most', values: { maximum: max_length.name } }
      }
    })
})

export const defaultValues = {
  name: ''
}
