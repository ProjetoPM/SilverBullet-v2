import { Table } from '@tanstack/react-table'

import { Input } from '@/components/ui'
import { DataTableViewOptions } from './DataTableViewOptions'

interface DataTableHeaderProps<TData> {
  table: Table<TData>
}

export function DataTableHeader<TData>({ table }: DataTableHeaderProps<TData>) {
  return (
    <div className="flex items-center pb-4 gap-2">
      <Input
        placeholder={'Filter...'}
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn('name')?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <DataTableViewOptions table={table} />
    </div>
  )
}
