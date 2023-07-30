import { EditorOptions } from '@tiptap/react'
import { editorStyles } from './configs.style'

export const configs: Partial<EditorOptions> = {
  injectCSS: false,
  editorProps: {
    attributes: {
      class: editorStyles
    }
  }
}
