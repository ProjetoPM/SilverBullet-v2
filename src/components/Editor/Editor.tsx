import { cn } from '@/lib/utils'
import { replaceHtmlTags } from '@/utils/replace-html-tags'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { EditorContent, EditorContentProps, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ComponentPropsWithoutRef, forwardRef, useEffect } from 'react'
import { BaseBubbleMenu } from './Buttons/BaseBubbleMenu'
import { starterKitConfigs } from './configs'
import { editorStyles, placeholderStyles } from './configs.style'

type InputProps = ComponentPropsWithoutRef<'div'>
type ContentProps = Omit<EditorContentProps, 'editor' | 'ref'>
type EditorProps = InputProps &
  ContentProps & {
    limit?: number
    onChange?: (content: string) => void
    hasError?: boolean
  }

export const Editor = forwardRef<HTMLInputElement, EditorProps>(
  ({ content, readOnly, value = '', limit = 50, onChange, ...props }, ref) => {
    const editor = useEditor({
      editorProps: {
        attributes: {
          class: editorStyles
        }
      },
      extensions: [
        StarterKit.configure(starterKitConfigs),
        Typography,
        Placeholder.configure({
          placeholder: props.placeholder ?? '...',
          emptyEditorClass: placeholderStyles
        }),
        CharacterCount.configure({
          limit: limit
        })
      ],
      content: content,
      editable: !readOnly,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML())
      }
    })

    useEffect(() => {
      const oldValue = replaceHtmlTags(value.toString())
      const newValue = replaceHtmlTags(editor?.getHTML().toString() ?? '')

      if (oldValue !== newValue && editor) {
        const timer = setTimeout(() => {
          editor.commands.setContent(value.toString())
        }, 150)

        return () => clearTimeout(timer)
      }
    }, [editor, value])

    return (
      <>
        {editor && <BaseBubbleMenu editor={editor} />}
        <div className={cn('relative w-full', props.className)}>
          <EditorContent editor={editor} {...props} />
          {editor && (
            <span className="absolute text-xs -top-6 right-0">
              {editor.storage.characterCount.characters()}/{limit}
            </span>
          )}
          <input
            className="absolute top-0 left-0 w-0 h-0 opacity-0"
            tabIndex={-1}
            onFocus={() => editor?.commands.focus()}
            ref={ref}
          />
        </div>
      </>
    )
  }
)
