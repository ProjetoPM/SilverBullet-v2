import { cn } from '@/lib/utils'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { EditorContent, EditorContentProps, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ComponentPropsWithoutRef, forwardRef, useEffect, useMemo } from 'react'
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

    const memoEditor = useMemo(
      () => <EditorContent editor={editor} />,
      [editor]
    )

    useEffect(() => {
      const newValue = value.toString()
      const oldValue = editor?.getHTML()

      if (newValue !== oldValue && editor) {
        editor.commands.setContent(value.toString())
      }
    }, [editor, value])

    return (
      <>
        {editor && <BaseBubbleMenu editor={editor} />}
        <div className={cn('relative w-full', props.className)}>
          {memoEditor}
          {editor && (
            <span className="absolute text-xs -top-6 right-0">
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
