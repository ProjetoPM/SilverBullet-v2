import { WorkspaceList } from "@/@types/Workspace"
import { DataTable } from "@/components/DataTable/DataTable"
import { Separator } from "@/components/ui"
import { columns } from "@/pages/@workspace/table/columns"
import WorkspaceService from "@/services/modules/WorkspaceService"
import { useQuery } from "react-query"

const WorkspacesList = () => {
  const getData = async () => {
    return await WorkspaceService.list()
  }

  const { data, isLoading } = useQuery<WorkspaceList>('workspaces', getData)

  return (
    <>
    <Separator className="my-5" />
    <DataTable
      isLoading={isLoading}
      columns={columns}
      data={data?.rows ?? []}
    />
  </>
  )
}

export { WorkspacesList}
