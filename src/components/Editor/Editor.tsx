import { cn } from '@/lib/utils'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
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
        StarterKit.configure({
          ...starterKitConfigs,
          bulletList: {
            HTMLAttributes: {
              class: 'list-disc ml-4 my-2'
            }
          },
          orderedList: {
            HTMLAttributes: {
              class: 'list-decimal ml-4 my-2'
            }
          }
        }),
        Typography,
        Placeholder.configure({
          placeholder: props.placeholder ?? '...',
          emptyEditorClass: placeholderStyles
        }),
        CharacterCount.configure({
          limit: limit
        }),
        Underline
      ],
      content: content,
      editable: !readOnly,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML())
      }
    })

    useEffect(() => {
      const newValue = value.toString()
      const oldValue = editor?.getHTML()

      if (newValue !== oldValue && editor) {
        editor.commands.setContent(value.toString())
      }
    }, [editor, value])

    return (
      <>
        <div className={cn('relative w-full', props.className)}>
          {editor && (
            <BaseBubbleMenu
              editor={editor}
              className="absolute -top-10 -right-10"
            />
          )}
          <EditorContent editor={editor} spellCheck="false" {...props} />
          {editor && (
            <span className="absolute text-xs font-bold -top-6 right-0">
              {editor.storage.characterCount.characters()}/{limit}
            </span>
          )}
          {editor && (
            <input
              className="absolute top-0 left-0 w-0 h-0 opacity-0"
              tabIndex={-1}
              onFocus={() => editor.commands.focus()}
              ref={ref}
            />
          )}
        </div>
      </>
    )
  }
)
