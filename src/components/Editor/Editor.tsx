import { cn } from '@/lib/utils'
import { replaceHtmlTags } from '@/utils/replace-html-tags'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import {
  EditorContent,
  EditorContentProps,
  PureEditorContent,
  useEditor
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ComponentPropsWithoutRef, forwardRef, useEffect } from 'react'
import { BaseBubbleMenu } from './Buttons/BaseBubbleMenu'
import { configs, starterKitConfigs } from './configs'
import { placeholderStyles } from './configs.style'

type InputProps = Omit<
  ComponentPropsWithoutRef<'textarea'>,
  'onFocus' | 'onChange'
>
type ContentProps = Omit<EditorContentProps, 'editor' | 'ref'>
type EditorProps = InputProps &
  ContentProps & {
    limit?: number
    onChange?: (content: string) => void
  }

export const Editor = forwardRef<PureEditorContent, EditorProps>(
  ({ content, readOnly, value = '', onChange, limit = 50, ...props }, ref) => {
    const editor = useEditor({
      ...configs,
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
          <EditorContent ref={ref} editor={editor} {...props} />
          {editor && (
            <span className="absolute text-xs -top-6 right-0">
              {editor.storage.characterCount.characters()}/{limit}
            </span>
          )}
        </div>
      </>
    )
  }
)
