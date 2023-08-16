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
  const [files, setFiles] = useState<File[]>()
  const globalFiles = useFileList((state) => state.files)
  const setGlobalFiles = useFileList((state) => state.setFiles)

  const folder = useMemo(() => {
    const uuid = form.getValues(`processes.${index}.content.folder`)
    return uuid ?? crypto.randomUUID()
  }, [])

  const { data: cloudFiles } = useQuery<FileObject[]>(
    [`files-${folder}`, folder],
    async () => {
      const isEditMode = form.getValues(`processes.${index}.content.folder`)

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

    const updatedFiles = [...files]

    if (fileIndex >= 0 && fileIndex < updatedFiles.length) {
      updatedFiles.splice(fileIndex, 1)
      setFiles(updatedFiles)
    }
  }

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const targetFiles = e.target.files

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
      form.setValue(`processes.${index}.content.folder`, folder)
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
    form.setValue(`processes.${index}.content.folder`, folder)
    form.setValue(`processes.${index}.content.files`, fileNames)
  }

  console.log(cloudFiles)

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
          {/* <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head className="py-2">File Name</Table.Head>
                <Table.Head className="py-2">Created At</Table.Head>
                <Table.Head className="py-2">Actions</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {cloudFiles.map((file, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell className="py-2">{file.name}</Table.Cell>
                    <Table.Cell className="py-2">{file.created_at}</Table.Cell>
                    <Table.Cell className="py-2">
                      <button
                        className="bg-red-400"
                        onClick={() => onRemoveFromCloud(file.name)}
                      >
                        teste
                      </button>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table.Root> */}
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
