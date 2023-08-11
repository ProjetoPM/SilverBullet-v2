import { Label } from '@/components/ui'
import { XCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FieldsProcessProps } from './processes.items'

export const ViewFileList = ({
  index,
  form
}: Pick<FieldsProcessProps, 'index' | 'form'>) => {
  const { t } = useTranslation('weekly-report')
  const files = form.watch(`processes.${index}.files`) ?? []

  const onRemove = (fileIndex: number) => {
    const updatedFiles = new DataTransfer()

    for (let i = 0; i < files.length; i++) {
      if (i !== fileIndex) {
        updatedFiles.items.add(files[i])
      }
    }
    form.setValue(`processes.${index}.files`, updatedFiles.files)
  }

  return (
    <>
      {/**
       * This input will be triggered by the upload button
       * using the id field
       **/}
      <input
        className="hidden"
        type="file"
        multiple
        accept="image/*, application/pdf"
        id={`files-${index}`}
        {...form.register(`processes.${index}.files`)}
      />
      {files.length > 0 && (
        <>
          <Label className="text-sm font-medium">{t('files_to_upload')}</Label>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {Array.from(files).map((file, index) => {
              return (
                <span
                  key={index}
                  className="flex items-center border border-foreground/10 dark:border-accent rounded-full px-2 py-1 gap-1"
                >
                  <span className="text-sm">{file.name}</span>
                  <XCircle
                    size={17}
                    onClick={() => onRemove(index)}
                    className="cursor-pointer text-neutral-300 dark:text-neutral-600 hover:text-red-500 dark:hover:text-destructive transition-colors duration-300"
                  />
                </span>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
