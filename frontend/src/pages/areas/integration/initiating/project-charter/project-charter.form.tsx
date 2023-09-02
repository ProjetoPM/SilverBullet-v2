import { Editor } from '@/components/Editor/Editor'
import { Form } from '@/components/ui'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ProjectCharter, defaultValues, max } from './project-charter.schema'

type ProjectCharterFormProps = {
  data?: ProjectCharter & { id: string }
}

export const ProjectCharterForm = ({ data }: ProjectCharterFormProps) => {
  const { t } = useTranslation('project-charter')

  const form = useForm<ProjectCharter>({
    mode: 'all',
    defaultValues: data ?? defaultValues
  })

  const onSubmit = (data: ProjectCharter) => {
    console.table(data)
  }

  return (
    <Form.Root {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form.Field
          control={form.control}
          name="highLevelProjectDescription"
          render={({ field }) => (
            <Form.Item>
              <Form.Label required>
                {t('high_level_project_description.label')}
              </Form.Label>
              <Form.Control>
                <Editor
                  as="textarea-4"
                  limit={max.highLevelProjectDescription}
                  placeholder={t('high_level_project_description.description')}
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      </form>
    </Form.Root>
  )
}
