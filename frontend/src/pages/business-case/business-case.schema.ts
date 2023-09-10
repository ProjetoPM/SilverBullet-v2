import { html, params } from '@/utils/replace-html-tags'
import { z } from 'zod'

export const max = {
  businessNeeds: 4000,
  situationAnalysis: 4000,
  recommendation: 4000,
  evaluation: 4000
}

export const BusinessCaseSchema = z.object({
  businessNeeds: z
    .string()
    .refine((value) => html(value, 1, '>='), params('at_least', 1))
    .refine(
      (value) => html(value, max.businessNeeds, '<='),
      params('at_most', max.businessNeeds)
    ),
  situationAnalysis: z
    .string()
    .refine((value) => html(value, 1, '>='), params('at_least', 1))
    .refine(
      (value) => html(value, max.situationAnalysis, '<='),
      params('at_most', max.situationAnalysis)
    ),
  recommendation: z
    .string()
    .refine((value) => html(value, 1, '>='), params('at_least', 1))
    .refine(
      (value) => html(value, max.recommendation, '<='),
      params('at_most', max.recommendation)
    ),
  evaluation: z
    .string()
    .refine((value) => html(value, 1, '>='), params('at_least', 1))
    .refine(
      (value) => html(value, max.evaluation, '<='),
      params('at_most', max.evaluation)
    )
})

export const defaultValues = {
  businessNeeds: '',
  situationAnalysis: '',
  recommendation: '',
  evaluation: ''
}
