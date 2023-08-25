import { WeeklyEvaluation } from './weekly-evaluation.schema'

export type WeeklyEvaluationData = Omit<WeeklyEvaluation, 'dates'> & {
  id: string
  createdAt: string
  startDate: string
  endDate: string
}
