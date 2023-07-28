import { Table } from '@tanstack/react-table'

import { Input } from '@/components/ui'
import { DataTableViewOptions } from './DataTableViewOptions'

interface DataTableHeaderProps<TData> {
  table: Table<TData>
}

export function DataTableHeader<TData>({ table }: DataTableHeaderProps<TData>) {
  return (
    <div className="flex items-center pb-4 gap-2">
      <div className="flex-1">
        <Input
          placeholder={'Filter...'}
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
