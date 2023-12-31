import { Editor } from '@/components/Editor/Editor'
import { Button, Form } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, RotateCcw, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useProjects } from './hooks/useProject'
import { Project, ProjectSchema, defaultValues, max } from './projects.schema'
import { ProjectData } from './projects.types'

interface ProjectFormPageProps {
  data?: ProjectData
}

export const ProjectForm = ({ data }: ProjectFormPageProps) => {
  const { t } = useTranslation(['default', 'projects'])
  const { create, update } = useProjects({})

  const form = useForm<Project>({
    mode: 'all',
    resolver: zodResolver(ProjectSchema),
    defaultValues: data ?? defaultValues
  })

  const onSubmit = async (form: Project) => {
    if (data) {
      await update.mutateAsync({ _id: data._id, ...form })
    } else {
      await create.mutateAsync(form)
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
              <Form.Label required>{t('projects:edit.name')}</Form.Label>
              <Form.Control>
                <Editor
                  limit={max.name}
                  placeholder={t('projects:name.placeholder')}
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="description"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>{t('projects:edit.description')}</Form.Label>
              <Form.Control>
                <Editor
                  limit={max.description}
                  placeholder={t('projects:description.placeholder')}
                  as="textarea-3"
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
