import { BubbleMenu, Editor } from '@tiptap/react'
import { Bold, Italic, Strikethrough } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BubbleButton } from './BubbleButton'
import { hideOnEsc } from './hideOnEsc'

interface BaseButtonProps {
  editor: Editor
  children?: React.ReactNode
}

export const BaseBubbleMenu = ({ editor, children }: BaseButtonProps) => {
  const { t } = useTranslation('editor')

  return (
    <BubbleMenu
      className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-lg border"
      tippyOptions={{
        duration: 100,
        appendTo: 'parent',
        plugins: [hideOnEsc]
      }}
      editor={editor}
    >
      <BubbleButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        data-active={editor.isActive('bold')}
        aria-label={
          editor.isActive('bold')
            ? t('editor:remove.bold')
            : t('editor:add.bold')
        }
      >
        <Bold className="w-4 h-4" />
      </BubbleButton>
      <BubbleButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        data-active={editor.isActive('italic')}
        aria-label={
          editor.isActive('italic')
            ? t('editor:remove.italic')
            : t('editor:add.italic')
        }
      >
        <Italic className="w-4 h-4" />
      </BubbleButton>
      <BubbleButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        data-active={editor.isActive('strike')}
        aria-label={
          editor.isActive('strike')
            ? t('editor:remove.strike')
            : t('editor:add.strike')
        }
        data-last
      >
        <Strikethrough className="w-4 h-4" />
      </BubbleButton>
      {children}
    </BubbleMenu>
  )
}
