import { cn } from '@/lib/utils'
import { BubbleMenu as _BubbleMenu, Editor } from '@tiptap/react'
import {
  Bold,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  PanelTopClose,
  Redo2,
  Strikethrough,
  Underline,
  Undo2
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BubbleButton } from './Button'
import { hideOnEsc } from './hideOnEsc'

interface BaseButtonProps {
  editor: Editor
  className?: string
  enabled: boolean
  setEnabled: () => void
}

const BubbleMenu = ({
  enabled = false,
  editor,
  className,
  setEnabled
}: BaseButtonProps) => {
  const { t } = useTranslation('editor')

  return (
    <_BubbleMenu
      className={cn(
        'flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-lg divide-x divide-neutral-600 max-w-[400px]',
        className,
        enabled ? '' : 'hidden'
      )}
      tippyOptions={{
        duration: 100,
        appendTo: 'parent',
        plugins: [hideOnEsc],
        maxWidth: 400
      }}
      editor={editor}
    >
      <div className="flex items-center">
        <BubbleButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          data-active={editor.isActive('heading', { level: 1 })}
          data-first
        >
          <Heading1 className="w-5 h-5" />
        </BubbleButton>
        <BubbleButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          data-active={editor.isActive('heading', { level: 2 })}
        >
          <Heading2 className="w-5 h-5" />
        </BubbleButton>
      </div>
      <div className="flex items-center">
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
        >
          <Strikethrough className="w-4 h-4" />
        </BubbleButton>
        <BubbleButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          data-active={editor.isActive('underline')}
          aria-label={
            editor.isActive('underline')
              ? t('editor:remove.underline')
              : t('editor:add.underline')
          }
        >
          <Underline className="w-4 h-4" />
        </BubbleButton>
      </div>
      <div className="flex items-center">
        <BubbleButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          data-active={editor.isActive('orderedList')}
          aria-label={
            editor.isActive('orderedList')
              ? t('editor:remove.ordered_list')
              : t('editor:add.ordered_list')
          }
        >
          <ListOrdered className="w-4 h-4" />
        </BubbleButton>
        <BubbleButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          data-active={editor.isActive('bulletList')}
          aria-label={
            editor.isActive('bulletList')
              ? t('editor:remove.bullet_list')
              : t('editor:add.bullet_list')
          }
        >
          <List className="w-4 h-4" />
        </BubbleButton>
      </div>
      <div className="flex items-center">
        <BubbleButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          aria-label={'redo'}
        >
          <Undo2 className="w-4 h-4" />
        </BubbleButton>
        <BubbleButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          aria-label={'redo'}
        >
          <Redo2 className="w-4 h-4" />
        </BubbleButton>
      </div>
      <div className="flex items-center">
        <BubbleButton onClick={setEnabled} data-last>
          <PanelTopClose className="w-4 h-4" />
        </BubbleButton>
      </div>
    </_BubbleMenu>
  )
}

export { BubbleMenu }
