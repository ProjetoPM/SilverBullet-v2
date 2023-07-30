import StarterKit from '@tiptap/starter-kit'

import { EditorOptions } from '@tiptap/react'
import { editorStyles } from './configs.style'

export const configs: Partial<EditorOptions> = {
  injectCSS: false,
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: editorStyles
    }
  }
}
