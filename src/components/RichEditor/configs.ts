import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

import { EditorOptions } from '@tiptap/react'

export const configs: Partial<EditorOptions> = {
  autofocus: true,
  injectCSS: false,
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ['heading']
    }),
    Placeholder.configure({
      placeholder: 'Type something...',
      emptyEditorClass:
        'first:before:h-0 first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none'
    })
  ],
  editorProps: {
    attributes: {
      class:
        'outline-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 prose dark:prose-invert'
    }
  }
}
