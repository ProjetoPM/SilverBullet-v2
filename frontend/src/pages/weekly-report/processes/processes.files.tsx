import { Label } from '@/components/ui'
import { XCircle } from 'lucide-react'
import { ChangeEvent, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFileList } from '../hooks/useWeeklyReport'
import { FieldsProcessProps } from './processes.items'

export const ViewFileList = ({
  index,
  form
}: Pick<FieldsProcessProps, 'index' | 'form'>) => {
  const { t } = useTranslation('weekly-report')
  const [files, setFiles] = useState<File[]>()
  const uuidv4 = useMemo(() => {
    const uuid = form.getValues(`processes.${index}.content.uuid`)
    return uuid ?? crypto.randomUUID()
  }, [])

  const globalFiles = useFileList((state) => state.files)
  const setGlobalFiles = useFileList((state) => state.setFiles)

  const onRemove = async (fileIndex: number) => {
    if (!files) return

    const updatedFiles = [...files]

    if (fileIndex >= 0 && fileIndex < updatedFiles.length) {
      updatedFiles.splice(fileIndex, 1)
      await handleFile(null, updatedFiles)
    }
  }

  const handleFile = async (
    e: ChangeEvent<HTMLInputElement> | null,
    files?: File[]
  ) => {
    const targetFiles = e?.target.files || files

    /**
     * Caso tenha cancelado a escolha de novos arquivos,
     * não fazer nada.
     */
    if (!targetFiles) {
      return
    }

    /**
     * Pegando os nomes dos arquivos já enviados.
     */
    const fileNames = Array.from(targetFiles).map((file) => ({
      name: file.name
    }))

    /**
     * Caso ainda não tenha sido adicionado arquivos,
     * basta colocar os arquivos do target.
     */
    if (!files) {
      setFiles(Array.from(targetFiles))
      setGlobalFiles([...globalFiles, ...targetFiles])
      form.setValue(`processes.${index}.content.uuid`, uuidv4)
      form.setValue(`processes.${index}.content.files`, fileNames)
      return
    }

    /**
     * Caso já tenha arquivos, filtrar para que os nomes
     * dos arquivos não sejam iguais, isto é, ignorar
     * os arquivos 'duplicados'.
     */
    const target = Array.from(targetFiles).filter((target) => {
      return !files.some((file) => file.name === target.name)
    })
    setFiles([...files, ...target])

    /**
     * Adicionar ao estado global de arquivos e ao form.
     */
    setGlobalFiles([...globalFiles, ...target])
    form.setValue(`processes.${index}.content.uuid`, uuidv4)
    form.setValue(`processes.${index}.content.files`, fileNames)
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
        onChange={handleFile}
      />
      {files && files.length > 0 && (
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
