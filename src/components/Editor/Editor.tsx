import { cn } from '@/lib/utils'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import { EditorContent, EditorContentProps, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useState
} from 'react'
import { BubbleMenu } from './Menu/BubbleMenu'
import { FixedMenu } from './Menu/FixedMenu'
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
    const [bubbleMenu, setBubbleMenu] = useState(false)

    const editor = useEditor(
      {
        editorProps: {
          attributes: {
            class: cn(editorStyles, bubbleMenu ? '' : 'rounded-t-none')
          }
        },
        extensions: [
          StarterKit.configure({
            ...starterKitConfigs,
            bulletList: {
              HTMLAttributes: {
                class: 'list-disc ml-5 my-2'
              }
            },
            orderedList: {
              HTMLAttributes: {
                class: 'list-decimal ml-5 my-2'
              }
            },
            history: {
              depth: 10
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
      },
      [bubbleMenu]
    )

    useEffect(() => {
      const newValue = value.toString()
      const oldValue = editor?.getHTML()

      if (newValue !== oldValue && editor) {
        editor.commands.setContent(value.toString())
      }
    }, [editor, value])

    const handleMenu = () => {
      console.log(bubbleMenu)
      setBubbleMenu((value) => !value)
    }

    return (
      <>
        <div className={cn('relative w-full', props.className)}>
          {editor && (
            <>
              <FixedMenu enabled={!bubbleMenu} editor={editor} />
              <BubbleMenu enabled={bubbleMenu} editor={editor} />
            </>
          )}
          <EditorContent editor={editor} spellCheck="false" {...props} />
          {editor && (
            <>
              <div className="flex items-center gap-2">
                <span className="absolute text-xs font-bold -top-6 right-0">
                  {editor.storage.characterCount.characters()}/{limit}
                </span>
                <button
                  type="button"
                  className="absolute -bottom-5 right-0 text-xs"
                  onClick={handleMenu}
                >
                  Ativar menu fixado
                </button>
              </div>
              <input
                className="absolute top-0 left-0 w-0 h-0 opacity-0"
                tabIndex={-1}
                onFocus={() => editor.commands.focus()}
                ref={ref}
              />
            </>
          )}
        </div>
      </>
    )
  }
)
