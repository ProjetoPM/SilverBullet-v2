import { cn } from '@/lib/utils'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import { EditorContent, EditorContentProps, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ComponentPropsWithoutRef, forwardRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BubbleMenu } from './Menu/BubbleMenu'
import { FixedMenu } from './Menu/FixedMenu'
import { starterKitConfigs } from './configs'
import { editorStyles, placeholderStyles } from './configs.style'

type InputProps = ComponentPropsWithoutRef<'div'>
type ContentProps = Omit<EditorContentProps, 'editor' | 'ref'>
type EditorProps = InputProps &
  ContentProps & {
    limit?: number
    isFixed?: boolean
    as?: 'textarea-3' | 'textarea-4' | 'textarea-5'
    onChange?: (content: string) => void
  }

const getSizeTextarea = ({ as }: Pick<EditorProps, 'as'>) => {
  switch (as) {
    case 'textarea-3':
      return 'min-h-[5rem]'
    case 'textarea-4':
      return 'min-h-[6.25rem]'
    case 'textarea-5':
      return 'min-h-[7.5rem]'
  }
}

export const Editor = forwardRef<HTMLInputElement, EditorProps>(
  ({ content, readOnly, value = '', isFixed = false, ...props }, ref) => {
    const { t } = useTranslation('editor')
    const [fixed, setFixed] = useState(isFixed)

    const editor = useEditor(
      {
        editorProps: {
          attributes: {
            class: cn(
              editorStyles,
              fixed ? 'rounded-t-none' : '',
              getSizeTextarea({ as: props.as }) ?? ''
            ),
            spellcheck: 'false'
          }
        },
        extensions: [
          StarterKit.configure({
            ...starterKitConfigs,
            heading: {
              levels: [1, 2]
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
            limit: props.limit
          }),
          Underline
        ],
        content: content,
        editable: !readOnly,
        onUpdate: ({ editor }) => {
          props.onChange?.(editor.getHTML())
        }
      },
      [fixed]
    )

    /**
     * Update the placeholder after changing the language.
     */
    useEffect(() => {
      if (editor) {
        editor.extensionManager.extensions.filter(
          (extension) => extension.name === 'placeholder'
        )[0].options['placeholder'] = props.placeholder
        editor.view.dispatch(editor.state.tr)
      }
    }, [editor, props.placeholder])

    /**
     * Prevents the 'bubble menu' from closing when it is
     * not convenient.
     */
    useEffect(() => {
      const newValue = value.toString()
      const oldValue = editor?.getHTML()

      if (newValue !== oldValue && editor) {
        editor.commands.setContent(value.toString())
      }
    }, [editor, value])

    const handleFixed = () => {
      setFixed((previous) => !previous)
    }

    const chars = editor?.storage.characterCount.characters() ?? 0
    const words = editor?.storage.characterCount.words() ?? 0

    return (
      <div className={cn('relative w-full', props.className)}>
        {editor && (
          <>
            <FixedMenu
              isFixed={fixed}
              setFixed={handleFixed}
              editor={editor}
            />
            <BubbleMenu
              isFixed={fixed}
              setFixed={handleFixed}
              editor={editor}
            />
          </>
        )}
        <EditorContent
          editor={editor}
          {...props}
        />
        {editor && (
          <>
            <span className="absolute text-[11.25px] text-neutral-500 -top-5 right-0">
              <span>
                {chars}/{props.limit} {t('characters')} | {words}{' '}
                {words > 1 ? t('words') : t('word')}
              </span>
            </span>
            <input
              className="absolute top-0 left-0 w-0 h-0 opacity-0"
              tabIndex={-1}
              onFocus={() => editor.commands.focus()}
              ref={ref}
            />
          </>
        )}
      </div>
    )
  }
)
