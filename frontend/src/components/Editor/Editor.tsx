import { cn } from '@/lib/utils'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import { EditorContent, EditorContentProps, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { forwardRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BubbleMenu } from './Menu/BubbleMenu'
import { FixedMenu } from './Menu/FixedMenu'
import { starterKitConfigs } from './configs'
import { editorStyles, placeholderStyles } from './configs.style'

type EditorProps = Omit<EditorContentProps, 'editor' | 'ref'> & {
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

    const editor = useEditor({
      editorProps: {
        attributes: {
          class: cn(editorStyles, getSizeTextarea({ as: props.as }) ?? ''),
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
          placeholder: props.placeholder,
          emptyEditorClass: placeholderStyles
        }),
        CharacterCount.configure({
          limit: props.limit
        }),
        Underline
      ],
      content: content,
      onUpdate: ({ editor }) => {
        props.onChange?.(editor.getHTML())
      },
      editable: !readOnly
    })

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

    /**
     * Change between the bubble menu and fixed menu.
     */
    const handleFixed = () => {
      setFixed((previous) => !previous)
    }

    const chars = editor?.storage.characterCount.characters() ?? 0
    const words = editor?.storage.characterCount.words() ?? 0

    return (
      <div className={cn('relative w-full', props.className)}>
        {editor && (
          <>
            <FixedMenu isFixed={fixed} setFixed={handleFixed} editor={editor} />
            <BubbleMenu
              isFixed={fixed}
              setFixed={handleFixed}
              editor={editor}
            />
          </>
        )}
        <EditorContent
          className="[&>*]:data-[is-fixed=true]:rounded-t-none"
          data-is-fixed={fixed}
          editor={editor}
        />
        {editor && (
          <>
            <span className="absolute text-[11.25px] text-neutral-500 -top-[22.75px] right-0">
              {props.limit && chars + '/' + props.limit}
              <span className="hidden xs:inline-flex">
                &nbsp;{props.limit && `${t('characters')}`}&nbsp;
              </span>
              <span className="hidden sm:inline-flex">
                | {words} {t(words > 1 ? 'words' : 'word')}
              </span>
            </span>
            <input
              {...props}
              className="absolute w-0 h-0 opacity-0"
              onFocus={() => editor.commands.focus()}
              tabIndex={-1}
              ref={ref}
            />
          </>
        )}
      </div>
    )
  }
)
