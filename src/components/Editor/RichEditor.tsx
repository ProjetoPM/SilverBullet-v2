import { cn } from '@/lib/utils'
import Placeholder from '@tiptap/extension-placeholder'
import {
  EditorContent,
  EditorContentProps,
  PureEditorContent,
  useEditor
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ComponentPropsWithoutRef, forwardRef, useEffect } from 'react'
import { BaseBubbleMenu } from './Buttons/BaseBubbleMenu'
import { configs } from './configs'
import { placeholderStyles } from './configs.style'

type InputProps = Omit<
  ComponentPropsWithoutRef<'textarea'>,
  'onFocus' | 'onChange'
>
type ContentProps = Omit<EditorContentProps, 'editor' | 'ref'>
type EditorProps = InputProps &
  ContentProps & {
    onChange?: (content: string) => void
  }

export const Editor = forwardRef<PureEditorContent, EditorProps>(
  ({ content, readOnly, value = '', onChange, ...props }, ref) => {
    const editor = useEditor({
      ...configs,
      extensions: [
        StarterKit.configure({
          listItem: false,
          bulletList: false,
          orderedList: false,
          heading: false
        }),
        Placeholder.configure({
          placeholder: props.placeholder ?? '...',
          emptyEditorClass: placeholderStyles
        })
      ],
      content: content,
      editable: !readOnly,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML())
      }
    })

    useEffect(() => {
      const oldValue = value.toString().replace(/<[^>]+>/g, '')
      const newValue = editor
        ?.getHTML()
        .toString()
        .replace(/<[^>]+>/g, '')

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
        <EditorContent
          className={cn('w-full', props.className)}
          ref={ref}
          editor={editor}
          {...props}
        />
      </>
    )
  }
)
