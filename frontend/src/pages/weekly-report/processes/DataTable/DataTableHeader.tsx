import { Table } from '@tanstack/react-table'

import { DataTableViewOptions } from '@/components/DataTable/DataTableViewOptions'
import { DebouncedInput } from '@/components/DataTable/DebouncedInput'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

interface DataTableHeaderProps<TData> {
  table: Table<TData>
  globalFilter: string
  setGlobalFilter: Dispatch<SetStateAction<string>>
}

export function DataTableHeader<TData>({
  globalFilter,
  setGlobalFilter,
  table
}: DataTableHeaderProps<TData>) {
  const { t } = useTranslation(['default', 'data-table'])

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 mb-3">
      <DebouncedInput
        value={globalFilter ?? ''}
        onChange={(value) => setGlobalFilter(String(value))}
        placeholder={t('label.search_by')}
        debounce={100}
      />
      <DataTableViewOptions table={table} />
    </div>
  )
}
