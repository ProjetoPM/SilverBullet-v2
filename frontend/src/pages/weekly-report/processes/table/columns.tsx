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
  helper.accessor((row) => row.folder, {
    id: 'folder',
    header: 'Actions',
    cell: ({ row }) => {
      const folder = row.getValue('folder')

      return (
        <div className="flex gap-2">
          <View
            className="w-4 h-4 cursor-pointer"
            onClick={() => console.log('view', folder)}
          />
          <FileMinus2
            className="w-4 h-4 cursor-pointer hover:text-destructive"
            onClick={() => console.log('delete file in', folder)}
          />
          {row.getValue('folder')}
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  })
]
