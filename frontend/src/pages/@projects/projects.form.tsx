import { Editor } from '@/components/Editor/Editor'
import { Button, Form } from '@/components/ui'
import { routes } from '@/routes/routes'
import ProjectService, { ProjectData } from '@/services/modules/ProjectService'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { Edit, RotateCcw, Save } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Project, ProjectSchema, defaultValues, max } from './projects.schema'

interface ProjectFormPageProps {
  data?: ProjectData
}

export const ProjectForm = ({ data }: ProjectFormPageProps) => {
  const { t } = useTranslation(['default', 'projects'])
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<Project>({
    mode: 'all',
    resolver: zodResolver(ProjectSchema),
    defaultValues: data ?? defaultValues
  })

  const onSubmit = async (form: Project) => {
    setLoading(true)
    let response: AxiosResponse | undefined

    if (data) {
      response = await ProjectService.edit(data._id, form)
    } else {
      response = await ProjectService.create(form)
    }

    if (response?.status === StatusCodes.OK) {
      navigate(routes.projects.index)
    }
    setLoading(false)
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
            disabled={isLoading}
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
