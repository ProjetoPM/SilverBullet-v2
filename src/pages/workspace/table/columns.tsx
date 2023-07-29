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
      <DataTableColumnHeader
        column={column}
        header={i18next.t('workspace:label.name')}
      />
    ),
    cell: ({ row }) => (
      <div id={`name-${row.index}`}>{row.getValue('name')}</div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'planStatus',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={i18next.t('workspace:label.plan_status')}
      />
    ),
    cell: ({ row }) => (
      <div id={`plan-status-${row.index}`}>{row.getValue('planStatus')}</div>
    ),
    enableSorting: false,
    enableHiding: true
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={i18next.t('workspace:label.created_at')}
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
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return <WorkspaceActions id={row.index.toString()} data={row.original} />
    }
  }
]
