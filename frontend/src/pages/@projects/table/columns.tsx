import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader'
import { Checkbox } from '@/components/ui'
import { replaceHtmlTags } from '@/utils/replace-html-tags'
import { createColumnHelper } from '@tanstack/react-table'
import i18next, { t } from 'i18next'
import { ProjectData } from '../projects.types'
import { ProjectActions } from './projects.actions'

const helper = createColumnHelper<ProjectData>()

export const columns = [
  /**
   * Select
   */
  helper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label={t('select_all')}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={t('select_row')}
      />
    ),
    enableSorting: false,
    enableHiding: false
  }),
  /**
   * Name
   */
  helper.accessor((row) => row.name, {
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} header={t('data-table:name')} />
    ),
    cell: ({ row }) => (
      <div id={`name-${row.index}`}>
        {replaceHtmlTags(row.getValue('name'))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Description
   */
  helper.accessor((row) => row.description, {
    id: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={t('data-table:description')}
      />
    ),
    cell: ({ row }) => {
      return (
        <div id={`description-${row.index}`} className="line-clamp-1 max-w-lg">
          {replaceHtmlTags(row.getValue('description'))}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Created At
   */
  helper.accessor((row) => row.createdAt, {
    id: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={t('data-table:created_at')}
      />
    ),
    cell: ({ row }) => {
      const data = new Date(row.getValue('createdAt'))

      const formatted = new Intl.DateTimeFormat(i18next.language, {
        dateStyle: 'medium'
      }).format(data)

      return <div className="font-medium">{formatted}</div>
    },
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} header={t('data-table:actions')} />
    ),
    cell: ({ row }) => {
      return <ProjectActions id={row.index.toString()} data={row.original} />
    }
  })
]
