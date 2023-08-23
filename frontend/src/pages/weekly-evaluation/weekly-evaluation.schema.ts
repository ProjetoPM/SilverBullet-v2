import { html, params } from '@/utils/replace-html-tags'
import { string, z } from 'zod'

export const max = {
  name: 200
}

export const WeeklyEvaluationSchema = z.object({
  name: string()
    .refine((value) => html(value, 3, '>='), params('at_least', 3))
    .refine(
      (value) => html(value, max.name, '<='),
      params('at_most', max.name)
    ),
  dates: z
    .object({
      startDate: z.coerce.date(),
      endDate: z.coerce.date()
    })
    .refine((date) => date.startDate <= date.endDate, {
      message: 'teste',
      path: ['endDate']
    }),
  type: z.enum(['Individual Report', 'Group Report'])
})

export const defaultValues = {
  name: undefined,
  dates: {
    startDate: undefined,
    endDate: undefined
  },
  type: undefined
}

export type WeeklyEvaluation = z.infer<typeof WeeklyEvaluationSchema>
