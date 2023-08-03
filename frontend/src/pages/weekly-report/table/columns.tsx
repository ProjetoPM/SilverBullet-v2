import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader'
import { Checkbox } from '@/components/ui'
import { createColumnHelper } from '@tanstack/react-table'
import i18next from 'i18next'

const helper = createColumnHelper<any>()

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
        aria-label={i18next.t('select_all')}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={i18next.t('select_row')}
      />
    ),
    enableSorting: false,
    enableHiding: false
  }),
  /**
   * User Name
   */
  helper.accessor((row) => row.user.name, {
    id: 'user.name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={'User'}
      />
    ),
    cell: ({ row }) => <div id={`user-${row.index}`}>{row.getValue('user.name')}</div>,
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Evaluation Name
   */
  helper.accessor((row) => row.evaluationName, {
    id: 'evaluationName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={'Evaluation Name'}
      />
    ),
    cell: ({ row }) => (
      <div id={`evaluation-name-${row.index}`}>{row.getValue('evaluationName')}</div>
    ),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={'Actions'}
      />
    ),
    cell: () => <h1>Actions!</h1>,
    enableSorting: false,
    enableHiding: false
  })
]
