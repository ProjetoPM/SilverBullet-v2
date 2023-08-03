export type Project = {
  _id: string
  name: string
  description?: string
  tenant: string
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

export type ProjectList = {
  count: number
  rows: Project[]
}
