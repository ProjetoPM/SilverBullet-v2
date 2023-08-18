import { getWorkspaceId } from '@/stores/useWorkspaceStore'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useLength } from './useLength'

export const useEdit = () => {
  const { id } = useParams()
  const setLength = useLength((state) => state.setLength)

  const getData = async (id?: string) => {
    const url = `/tenant/${getWorkspaceId()}/weekly-report/:id`

    // const data = api.get(url).then((res) => res.data)

    // console.log(data)

    // // if (id) {
    // //   return api.get(url).then((res) => res.data)
    // // }
    return null
  }

  const { data, ...props } = useQuery<any>([`wr-${id}`, id], async () =>
    getData(id)
  )

  setLength(0)

  return { id, data, ...props }
}
