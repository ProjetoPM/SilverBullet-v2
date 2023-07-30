import { EditorOptions } from '@tiptap/react'
import { StarterKitOptions } from '@tiptap/starter-kit'
import { editorStyles } from './configs.style'

export const configs: Partial<EditorOptions> = {
  injectCSS: false,
  editorProps: {
    attributes: {
      class: editorStyles
    }
  }
}

export const starterKitConfigs: Partial<StarterKitOptions> = {
  blockquote: false,
  bulletList: false,
  codeBlock: false,
  heading: false,
  horizontalRule: false,
  listItem: false,
  orderedList: false,
  code: false
}
