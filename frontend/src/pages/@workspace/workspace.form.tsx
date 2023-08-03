import { Editor } from '@/components/Editor/Editor'
import { Button, Form } from '@/components/ui'
import { routes } from '@/routes/routes'
import WorkspaceService from '@/services/modules/WorkspaceService'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { Edit, RotateCcw, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Workspace } from '@/@types/Workspace'
import { WorkspaceSchema, defaultValues, max } from './workspace.schema'

type Form = z.infer<typeof WorkspaceSchema>

interface WorkspaceFormProps {
  data?: Pick<Workspace, '_id' | 'name'>
}

const WorkspaceForm = ({ data }: WorkspaceFormProps) => {
  const { t } = useTranslation('workspace')
  const navigate = useNavigate()

  const form = useForm<Form>({
    mode: 'all',
    resolver: zodResolver(WorkspaceSchema),
    defaultValues: data ?? defaultValues
  })

  const onSubmit = async (form: Form) => {
    let response: AxiosResponse | undefined

    if (data) {
      response = await WorkspaceService.edit(data._id, form)
    } else {
      response = await WorkspaceService.create(form)
    }

    if (response?.status === StatusCodes.OK) {
      navigate(routes.workspaces.index)
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
                <Editor
                  limit={max.name}
                  content={data?.name}
                  placeholder={t('name.placeholder')}
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <div className="space-y-2 space-x-2.5">
          <Button
            type="submit"
            className="w-30 gap-1 font-medium"
          >
            {data && (
              <>
                <Edit size={20} />
                {t('btn.edit')}
              </>
            )}
            {!data && (
              <>
                <Save size={20} />
                {t('btn.save')}
              </>
            )}
          </Button>
          <Button
            type="button"
            className="w-30 gap-1"
            variant={'secondary'}
            onClick={() => form.reset()}
          >
            <RotateCcw size={20} /> {t('default:btn.reset')}
          </Button>
        </div>
      </form>
    </Form.Root>
  )
}

export default WorkspaceForm
