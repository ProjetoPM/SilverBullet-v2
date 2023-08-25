import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader'
import { Checkbox } from '@/components/ui'
import { replaceHtmlTags } from '@/utils/replace-html-tags'
import { createColumnHelper } from '@tanstack/react-table'
import i18next, { t } from 'i18next'
import { WeeklyEvaluationData } from '../weekly-evaluation.types'
import { WeeklyEvaluationActions } from './weekly-evaluation.actions'

const helper = createColumnHelper<WeeklyEvaluationData>()

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
   * Evaluation Name
   */
  helper.accessor((row) => row.name, {
    id: 'evaluationName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={t('data-table:evaluation_name')}
      />
    ),
    cell: ({ row }) => (
      <div id={`evaluation-name-${row.index}`}>
        {replaceHtmlTags(row.getValue('evaluationName'))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Report type
   */
  helper.accessor((row) => row.type, {
    id: 'reportType',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={t('data-table:report_type')}
      />
    ),
    cell: ({ row }) => (
      <div
        id={`evaluation-name-${row.index}`}
        className="line-clamp-1 max-w-lg"
      >
        {replaceHtmlTags(row.getValue('reportType'))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Start Date
   */
  helper.accessor((row) => row.startDate, {
    id: 'startDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={i18next.t('data-table:start_date')}
      />
    ),
    cell: ({ row }) => {
      const data = new Date(row.getValue('startDate'))

      const formatted = new Intl.DateTimeFormat(i18next.language, {
        dateStyle: 'medium'
      }).format(data)

      return <div className="font-medium">{formatted}</div>
    },
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * End Date
   */
  helper.accessor((row) => row.endDate, {
    id: 'endDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={i18next.t('data-table:end_date')}
      />
    ),
    cell: ({ row }) => {
      const data = new Date(row.getValue('endDate'))

      const formatted = new Intl.DateTimeFormat(i18next.language, {
        dateStyle: 'medium'
      }).format(data)

      return <div className="font-medium">{formatted}</div>
    },
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} header={'Actions'} />
    ),
    cell: ({ row }) => (
      <WeeklyEvaluationActions data={row.original} id="weekly-evaluation" />
    ),
    enableSorting: false,
    enableHiding: true
  })
]
