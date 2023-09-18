import { create } from 'zustand'

type Content = {
  folder: string
  files: FileList
}

type FileUpload = {
  content: Array<Content>
  setContent: (content: Array<Content>) => void
}

export const useFileList = create<FileUpload>()((set) => ({
  content: [],
  setContent: (content: Array<Content>) => set({ content })
}))
