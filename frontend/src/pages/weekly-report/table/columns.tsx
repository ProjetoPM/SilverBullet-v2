import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader'
import { Checkbox } from '@/components/ui'
import { replaceHtmlTags } from '@/utils/replace-html-tags'
import { createColumnHelper } from '@tanstack/react-table'
import i18next, { t } from 'i18next'
import { WeeklyReport } from '../weekly-report.types'
import { WeeklyReportActions } from './weekly-report.actions'

const helper = createColumnHelper<WeeklyReport>()

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
  helper.accessor((row) => row.weeklyEvaluation.name, {
    id: 'evaluationName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={t('data-table:evaluation_name')}
      />
    ),
    cell: ({ row }) => (
      <div id={`evaluation-name-${row.index}`}>
        {row.getValue('evaluationName')}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Tool Evaluation
   */
  helper.accessor((row) => row.toolEvaluation, {
    id: 'toolEvaluation',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={t('data-table:tool_evaluation')}
      />
    ),
    cell: ({ row }) => (
      <div
        id={`evaluation-name-${row.index}`}
        className="line-clamp-1 max-w-lg"
      >
        {replaceHtmlTags(row.getValue('toolEvaluation'))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Created At
   */
  helper.accessor((row) => row.createdAt, {
    id: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        header={i18next.t('data-table:created_at')}
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
      <WeeklyReportActions data={row.original} id="weekly-report" />
    ),
    enableSorting: false,
    enableHiding: true
  })
]
