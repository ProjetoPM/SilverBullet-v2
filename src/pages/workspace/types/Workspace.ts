export type Workspace = {
  plan: string
  planStatus: string
  _id: string
  name: string
  url: string
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

export type WorkspaceList = {
  count: number
  rows: Workspace[]
}
