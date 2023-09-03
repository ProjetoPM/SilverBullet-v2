import { createColumnHelper } from '@tanstack/react-table'
import i18next from 'i18next'
import { FilesActions } from './files.actions'

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
    cell: ({ row }) => <FilesActions row={row} />,
    enableSorting: false,
    enableHiding: false
  })
]
