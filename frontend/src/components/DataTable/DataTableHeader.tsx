import { Table } from '@tanstack/react-table'

import { Button, Dialog, DropdownMenu, Input } from '@/components/ui'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Check, Filter, Trash2 } from 'lucide-react'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DataTableViewOptions } from './DataTableViewOptions'
import { DebouncedInput } from './DebouncedInput'

interface DataTableHeaderProps<TData> {
  table: Table<TData>
  globalFilter: string
  setGlobalFilter: Dispatch<SetStateAction<string>>
  fn?: Function
}

type CommonDeleteProp = {
  tableDeletionId: string
  roles?: string[]
}

export function DataTableHeader<TData>({
  globalFilter,
  setGlobalFilter,
  table,
  fn
}: DataTableHeaderProps<TData>) {
  const { t } = useTranslation(['default', 'data-table'])
  const [type, setType] = useState<'first' | 'all'>('first')
  const [isLoading, setLoading] = useState(false)

  const getFirstColumn = useMemo(() => {
    return table.getAllColumns().at(1)
  }, [table])

  const handleDeleteRows = async () => {
    setLoading(true)

    const data = table
      .getSelectedRowModel()
      .rows.map((row) => row.original) as CommonDeleteProp[]

    const ids: Array<string> = []

    data.forEach((row) => {
      ids.push(row.tableDeletionId)
    })
    await fn?.(ids)
    setLoading(false)
  }

  return (
    <div className="flex items-center pb-4 gap-2">
      <div className="flex items-center gap-2">
        {type === 'all' && (
          <DebouncedInput
            id="search-debounced-input"
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder={t('label.search_by')}
            debounce={100}
            className="sm:min-w-[300px]"
          />
        )}
        {type === 'first' && (
          <Input
            id="search-input"
            placeholder={t('label.search_by')}
            value={(getFirstColumn?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              getFirstColumn?.setFilterValue(event.target.value)
            }
            className="sm:min-w-[300px]"
          />
        )}
        <DropdownMenu.Root>
          <DropdownMenuTrigger asChild>
            <Button size={'icon'} variant={'outline'}>
              <Filter className="w-[18px] h-[18px]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              className="flex justify-between gap-2"
              onClick={() => setType('first')}
            >
              <span>{t('data-table:first_column')}</span>
              {type === 'first' && <Check className="w-5 h-5" />}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="flex justify-between gap-2"
              onClick={() => setType('all')}
            >
              <span>{t('data-table:all_columns')}</span>
              {type === 'all' && <Check className="w-5 h-5" />}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        {fn && (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button
                size={'icon'}
                variant={'destructive'}
                className="flex gap-2"
                disabled={table.getSelectedRowModel().rows.length === 0}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header className="space-y-3">
                <Dialog.Title>{t('data-table:are_you_certain')}</Dialog.Title>
                <Dialog.Description>
                  {t('data-table:delete_rows_selected')}
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer>
                <Dialog.Trigger asChild>
                  <Button variant="ghost">{t('default:btn.cancel')}</Button>
                </Dialog.Trigger>
                <Dialog.Trigger asChild>
                  <Button
                    variant="delete"
                    onClick={handleDeleteRows}
                    isLoading={isLoading}
                  >
                    {t('default:btn.confirm')}
                  </Button>
                </Dialog.Trigger>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
