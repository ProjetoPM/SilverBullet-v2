import { Table } from '@tanstack/react-table'

import { Button, DropdownMenu, Input } from '@/components/ui'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Check, Filter } from 'lucide-react'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DataTableViewOptions } from './DataTableViewOptions'
import { DebouncedInput } from './DebouncedInput'

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
  const [type, setType] = useState<'first' | 'all'>('first')

  const getFirstColumn = useMemo(() => {
    return table.getAllColumns().at(1)
  }, [table])

  return (
    <div className="flex items-center pb-4 gap-2">
      <div className="flex items-center gap-2">
        {type === 'all' && (
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder={t('label.search_by')}
            debounce={100}
            className="lg:min-w-[300px]"
          />
        )}
        {type === 'first' && (
          <Input
            placeholder={t('label.search_by')}
            value={(getFirstColumn?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              getFirstColumn?.setFilterValue(event.target.value)
            }
            className="lg:min-w-[300px]"
          />
        )}
        <DropdownMenu.Root>
          <DropdownMenuTrigger asChild>
            <Button size={'icon'} variant={'outline'}>
              <Filter className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              className="flex justify-between gap-2"
              onClick={() => setType('first')}
            >
              <span>{t('data-table:first_column')}</span>
              {type === 'first' && <Check className="w-4 h-4" />}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="flex justify-between gap-2"
              onClick={() => setType('all')}
            >
              <span>{t('data-table:all_columns')}</span>
              {type === 'all' && <Check className="w-4 h-4" />}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
