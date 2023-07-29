import {
  EditorContent,
  EditorContentProps,
  PureEditorContent,
  useEditor
} from '@tiptap/react'
import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { BaseBubbleMenu } from './Buttons/BaseBubbleMenu'
import { configs } from './configs'

type InputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'onFocus' | 'onChange'
>
type ContentProps = Omit<EditorContentProps, 'editor' | 'ref'>
type EditorProps = InputProps &
  ContentProps & {
    onChange?: (content: string) => void
  }

export const RichEditor = forwardRef<PureEditorContent, EditorProps>(
  ({ content, onChange, ...props }, ref) => {
    const editor = useEditor(
      {
        ...configs,
        content: content,
        onUpdate: ({ editor }) => {
          const html = editor.getHTML()
          onChange?.(html)
          editor.commands.setContent(html)
        }
      },
      [content]
    )

    return (
      <>
        {editor && <BaseBubbleMenu editor={editor} />}
        <EditorContent
          className="w-full"
          ref={ref}
          editor={editor}
          {...props}
        />
      </>
    )
  }
)
