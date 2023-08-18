import { Label } from '@/components/ui'
import { supabase } from '@/lib/supabase'
import { XCircle } from 'lucide-react'
import { ChangeEvent, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useFileList } from '../hooks/useWeeklyReport'
import { DataTableProcesses } from './DataTable/DataTableProcesses'
import { FieldsProcessProps } from './processes.items'
import { FileObject, columns } from './table/columns'

export const ViewFileList = ({
  index,
  form
}: Pick<FieldsProcessProps, 'index' | 'form'>) => {
  const { t } = useTranslation(['default', 'weekly-report'])
  const [files, setFiles] = useState<FileList>()
  const content = useFileList((state) => state.content)

  const folder = useMemo(() => {
    const uuid = form.getValues(`processes.${index}.filesFolder`)
    return uuid ?? crypto.randomUUID()
  }, [])

  const { data: cloudFiles } = useQuery<FileObject[]>(
    [`files-${folder}`, folder],
    async () => {
      const isEditMode = form.getValues(`processes.${index}.filesFolder`)

      if (!isEditMode) {
        return []
      }

      const { data, error } = await supabase.storage
        .from('weekly-report')
        .list(`processes/${folder}`)

      if (error) {
        console.error(error)
        return []
      }

      const filesWithFolder = data.map((file) => ({
        ...file,
        folder: folder
      }))
      return filesWithFolder
    }
  )

  const onRemove = async (fileIndex: number) => {
    if (!files) return

    const updateFiles = new DataTransfer()

    Array.from(files).filter((file, index) => {
      if (fileIndex !== index) {
        updateFiles.items.add(file)
      }
    })
    setFiles(updateFiles.files)

    content.forEach((element) => {
      if (element.folder === folder) {
        element.files = updateFiles.files
      }
    })
  }

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const targetFiles = e.target.files
    console.log(content)
    /**
     * Caso tenha cancelado a escolha de novos arquivos,
     * não fazer nada.
     */
    if (!targetFiles) {
      return
    }

    /**
     * Caso ainda não tenha sido adicionado arquivos no processo,
     * basta colocar os arquivos do target.
     */
    if (!files) {
      setFiles(targetFiles)
    }

    /**
     * Percorrer todos os arquivos e ignorar os arquivos com nome
     * duplicado. Assim, fazendo apenas o `append` de novos arquivos.
     */
    const filteredFiles = new DataTransfer()

    if (files) {
      const filesToAdd = Array.from(targetFiles).filter((file) => {
        return !Array.from(files).some((f) => f.name === file.name)
      })

      Array.from(files).forEach((file) => filteredFiles.items.add(file))
      Array.from(filesToAdd).forEach((file) => filteredFiles.items.add(file))
    }

    /**
     * Caso já exista conteúdo no estado global, percorrer todos os itens
     * até encontrar a pasta dos arquivos.
     */
    let hasFolder = false

    content.forEach((element) => {
      if (element.folder === folder) {
        setFiles(filteredFiles.files)
        element.files = filteredFiles.files
        hasFolder = true
      }
    })

    /**
     * Caso não encontre a pasta gerada para este processo, é porque ainda
     * não existe essa pasta. Desta forma, é feito um `push`.
     */
    if (!hasFolder) {
      content.push({ folder: folder, files: targetFiles })
    }
    form.setValue(`processes.${index}.filesFolder`, folder)
  }

  return (
    <div className="flex flex-col gap-3">
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
        <div>
          <Label className="text-sm font-medium">
            {t('weekly-report:files_to_upload')}
          </Label>
          <div className="flex flex-wrap gap-1.5 mt-2">
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
        </div>
      )}
      {cloudFiles && cloudFiles.length > 0 && (
        <div>
          <Label className="text-sm font-medium">
            {t('files_already_uploaded')}
          </Label>
          <DataTableProcesses
            data={cloudFiles}
            columns={columns}
            className="mt-2"
          />
        </div>
      )}
    </div>
  )
}
