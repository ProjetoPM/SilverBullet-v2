import { useCreate } from './useCreate'
import { useEdit } from './useEdit'
import { useFileList } from './useFileList'
import { useList } from './useList'
import { usePhases } from './usePhases'
import { useUpdate } from './useUpdate'
import { useWeeklyEvaluation } from './useWeeklyEvaluation'

export const useWeeklyReport = () => {
  const { phases } = usePhases()

  return {
    phases,
    create: useCreate(),
    update: useUpdate(),
    weeklyEvaluationList: useWeeklyEvaluation(),
    useEdit: () => useEdit(),
    useList: () => useList(),
    useFileList: () => useFileList((state) => state)
  }
}
