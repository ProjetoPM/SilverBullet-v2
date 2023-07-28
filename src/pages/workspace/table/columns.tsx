import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader'
import { Checkbox } from '@/components/ui'
import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'
import { Workspace } from '../types/Workspace'
import { WorkspaceActions } from './workspace.actions'

export const columns: ColumnDef<Workspace>[] = [
  {
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
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'planStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plan Status" />
    ),
    cell: ({ row }) => <div>{row.getValue('planStatus')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const data = parseFloat(row.getValue('createdAt'))
      const formatted = new Intl.DateTimeFormat(i18next.language, {
        dateStyle: 'medium'
      }).format(data)

      return <div className="font-medium">{formatted}</div>
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <WorkspaceActions data={row.original} />
    }
  }
]
