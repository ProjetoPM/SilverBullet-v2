export type WeeklyReport = {
  evaluationName: string
  toolEvaluation: string
  processes: {
    group: string
    name: string
    description: string
    files?: FileList
  }[]
}
