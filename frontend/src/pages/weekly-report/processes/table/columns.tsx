import { createColumnHelper } from '@tanstack/react-table'
import i18next from 'i18next'
import { FileMinus2, View } from 'lucide-react'

export type FileObject = {
  name: string
  created_at: string
  folder: string
}

const helper = createColumnHelper<FileObject>()

export const columns = [
  /**
   * File Name
   */
  helper.accessor((row) => row.name, {
    id: 'name',
    header: () => 'File Name',
    cell: ({ row }) => row.getValue('name')
  }),
  /**
   * Created At
   */
  helper.accessor((row) => row.created_at, {
    id: 'created_at',
    header: () => 'Created At',
    cell: ({ row }) => {
      const data = new Date(row.getValue('created_at'))

      const formatted = new Intl.DateTimeFormat(i18next.language, {
        dateStyle: 'medium'
      }).format(data)

      return formatted
    }
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <View className="w-4 h-4 cursor-pointer" />
        <FileMinus2 className="w-4 h-4 cursor-pointer hover:text-destructive" />
        {row.getValue('folder')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  })
]
