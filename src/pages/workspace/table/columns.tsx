import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader'
import { Button, Checkbox, DropdownMenu } from '@/components/ui'
import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'
import { Copy, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface Workspace {
  _id: string
  name: string
  url: string
  planStatus: string
  createdAt: string
}

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
      const data = row.original

      return (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">{i18next.t('open_menu')}</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Label>{i18next.t('btn.actions')}</DropdownMenu.Label>
            <DropdownMenu.Item
              onClick={() => navigator.clipboard.writeText(data._id)}
              className="flex gap-3"
            >
              <Copy size={18} />
              {i18next.t('btn.copy_id')}
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <Link to={`/workspaces/${data._id}/edit`}>
              <DropdownMenu.Item className="flex gap-3">
                <Pencil size={18} />
                {i18next.t('btn.edit')}
              </DropdownMenu.Item>
            </Link>
            <DropdownMenu.Item className="flex gap-3 focus:text-white focus:bg-destructive">
              <Trash2 size={18} />
              {i18next.t('btn.delete')}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )
    }
  }
]
