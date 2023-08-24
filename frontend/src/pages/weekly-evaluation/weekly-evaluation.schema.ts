import { html, params } from '@/utils/replace-html-tags'
import { z } from 'zod'

export const max = {
  name: 50
}

export const WeeklyEvaluationSchema = z.object({
  name: z
    .string()
    .refine((value) => html(value, 3, '>='), params('at_least', 3))
    .refine(
      (value) => html(value, max.name, '<='),
      params('at_most', max.name)
    ),
  dates: z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date()
  }),
  type: z.enum(['Individual Report', 'Group Report']),
  metricGroupId: z.string().refine((value) => value.length > 0)
})

export const defaultValues = {
  name: '',
  dates: {
    startDate: undefined,
    endDate: undefined
  },
  type: undefined,
  scoreId: ''
}

export type WeeklyEvaluation = z.infer<typeof WeeklyEvaluationSchema>
