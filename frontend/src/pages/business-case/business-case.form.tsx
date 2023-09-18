import { Editor } from '@/components/Editor/Editor'
import { Button, Form } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, RotateCcw, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { BusinessCaseSchema, defaultValues, max } from './business-case.schema'
import { BusinessCase, FormBusinesscase } from './business-case.types'
import { useBusinessCase } from './hooks/useBusiness-case'
interface BusinessCaseFormPageProps {
  data?: BusinessCase
}

export const BusinessCaseForm = ({ data }: BusinessCaseFormPageProps) => {
  const { edit, create } = useBusinessCase()

  const form = useForm<FormBusinesscase>({
    mode: 'all',
    resolver: zodResolver(BusinessCaseSchema),
    defaultValues: data ?? defaultValues
  })

  const onSubmit = async (form: FormBusinesscase) => {
    console.log(form)
    if (data && data !== null) {
      await edit.mutateAsync({ id: data.id, ...form })
    } else {
      await create.mutateAsync({ ...form })
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
          name="businessNeeds"
          render={({ field }) => (
            <Form.Item>
              <Form.Label required>{'Business Needs'}</Form.Label>
              <Form.Control>
                <Editor
                  limit={max.businessNeeds}
                  placeholder={'Business Needs'}
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="situationAnalysis"
          render={({ field }) => (
            <Form.Item>
              <Form.Label required>{'Situation Analysis'}</Form.Label>
              <Form.Control>
                <Editor
                  limit={max.businessNeeds}
                  placeholder={'Situation Analysis'}
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="recommendation"
          render={({ field }) => (
            <Form.Item>
              <Form.Label required>{'Recommendation'}</Form.Label>
              <Form.Control>
                <Editor
                  limit={max.businessNeeds}
                  placeholder={'Recommendation'}
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="evaluation"
          render={({ field }) => (
            <Form.Item>
              <Form.Label required>{'Evaluation'}</Form.Label>
              <Form.Control>
                <Editor
                  limit={max.businessNeeds}
                  placeholder={'Evaluation'}
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
            isLoading={create.isLoading || edit.isLoading}
          >
            {data && (
              <>
                <Edit size={20} />
                {'btn.edit'}
              </>
            )}
            {!data && (
              <>
                <Save size={20} />
                {'btn.save'}
              </>
            )}
          </Button>
          <Button
            type="button"
            className="w-30 gap-1"
            variant={'secondary'}
            onClick={() => form.reset()}
          >
            <RotateCcw size={20} /> {'default:btn.reset'}
          </Button>
        </div>
      </form>
    </Form.Root>
  )
}
