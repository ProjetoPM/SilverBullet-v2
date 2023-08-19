export interface WeeklyEvaluation {
  _id: string
  name: string
}

export interface WeeklyReport {
  _id: string
  toolEvaluation: string
  weeklyEvaluation: WeeklyEvaluation
  createdAt: string
  updatedAt: string
}

export interface WeeklyReportList {
  rows: WeeklyReport[]
  count: number
}
