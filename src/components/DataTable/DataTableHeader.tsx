import { Table } from '@tanstack/react-table'

import { Input } from '@/components/ui'
import { DataTableViewOptions } from './DataTableViewOptions'
import { useTranslation } from 'react-i18next'

interface DataTableHeaderProps<TData> {
  table: Table<TData>
}

export function DataTableHeader<TData>({ table }: DataTableHeaderProps<TData>) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center pb-4 gap-2">
      <div className="flex-1">
        <Input
          placeholder={t('label.search_by')}
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
