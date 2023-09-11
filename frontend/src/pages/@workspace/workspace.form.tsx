import { Editor } from '@/components/Editor/Editor'
import { Button, Form } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, RotateCcw, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useWorkspace } from './hooks/useWorkspace'
import {
  Workspace,
  WorkspaceSchema,
  defaultValues,
  max
} from './workspace.schema'
import { WorkspaceData } from './workspace.types'

interface WorkspaceFormPageProps {
  data?: WorkspaceData
}

export const WorkspaceForm = ({ data }: WorkspaceFormPageProps) => {
  const { t } = useTranslation('workspace')
  const { create, update } = useWorkspace({})

  const form = useForm<Workspace>({
    mode: 'all',
    resolver: zodResolver(WorkspaceSchema),
    defaultValues: data ?? defaultValues
  })

  const onSubmit = async (form: Workspace) => {
    if (data) {
      await update.mutateAsync(form)
      return
    }
    await create.mutateAsync(form)
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
              <Form.Label required>{t('edit.name')}</Form.Label>
              <Form.Control>
                <Editor
                  limit={max.name}
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
            isLoading={create.isLoading || update.isLoading}
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
