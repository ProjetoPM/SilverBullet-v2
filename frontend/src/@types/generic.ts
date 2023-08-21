export type Props = {
  useList?: boolean
  useEdit?: string
}

export type Delete = {
  _id: string
}

export interface Users {
  id: string
  _id: string
  email: string
  roles: string[]
  status: string
}
