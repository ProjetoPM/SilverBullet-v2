import { changePassword } from './useChangePassword'
import { useMe } from './useMe'
import { update } from './useUpdate'

export const useProfile = () => {
  return { useMe: useMe, update: update(), changePassword: changePassword() }
}
