import { z } from 'zod'
import { BusinessCaseSchema } from './business-case.schema'

export type BusinessCase = {
  businessNeeds: string
  situationAnalysis: string
  recommendation: string
  evaluation: string
  project: {
    _id: string
  }
  createdBy: string
  updatedBy: string
  tenant: {
    _id: string
  }
}

export type BusinessCaseData = z.infer<typeof BusinessCaseSchema> & {
  project: {
    _id: string
  }
  createdBy: string
  updatedBy: string
  tenant: {
    _id: string
  }
}

export type FormBusinesscase = Pick<
  BusinessCase,
  | 'project'
  | 'businessNeeds'
  | 'situationAnalysis'
  | 'recommendation'
  | 'evaluation'
>
