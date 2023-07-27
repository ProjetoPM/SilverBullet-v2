import { Button, Form, Input } from '@/components/ui'
import { routes } from '@/routes/routes'
import WorkspaceService from '@/services/workspace/WorkspaceService'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { Edit, RotateCcw, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Workspace } from './table/columns'
import { WorkspaceSchema, defaultValues } from './workspace.schema'

type Form = z.infer<typeof WorkspaceSchema>

interface WorkspaceFormProps {
  data?: Pick<Workspace, '_id' | 'name'>
}

const WorkspaceForm = ({ data }: WorkspaceFormProps) => {
  const { t } = useTranslation('workspace')
  const navigator = useNavigate()

  const form = useForm<Form>({
    mode: 'all',
    resolver: zodResolver(WorkspaceSchema),
    defaultValues: data ?? defaultValues
  })

  const onSubmit = async (form: Form) => {
    let response: AxiosResponse

    if (data) {
      response = await WorkspaceService.edit(data._id, form)
    } else {
      response = await WorkspaceService.create(form)
    }

    if (response.status === StatusCodes.OK) {
      navigator(routes.workspaces.index)
    }
  }

  return (
    <Form.Root {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 min-h-screen"
      >
        <Form.Field
          control={form.control}
          name="name"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>{t('edit.name')}</Form.Label>
              <Form.Control>
                <Input placeholder={'Name'} {...field} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <div className="space-y-2 space-x-2.5">
          <Button type="submit" className="w-28 gap-1">
            {data && (
              <>
                <Edit size={20} />
                <span>{t('btn.edit')}</span>
              </>
            )}
            {!data && (
              <>
                <Save size={20} />
                <span>{t('btn.save')}</span>
              </>
            )}
          </Button>
          <Button
            type="button"
            className="w-28 gap-1"
            variant={'secondary'}
            onClick={() => form.reset()}
          >
            <RotateCcw size={20} /> {t('btn.reset')}
          </Button>
        </div>
      </form>
    </Form.Root>
  )
}

export default WorkspaceForm