import { create } from './useCreate'
import { edit } from './useEdit'
import { useFind } from './useFind'

export const useBusinessCase = () => {
  return { useFind: useFind(), edit: edit(), create: create() }
}
