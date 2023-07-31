import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/react'
import { t } from 'i18next'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Redo2,
  Strikethrough,
  Underline,
  Undo2
} from 'lucide-react'
import { BubbleButton } from './Button'

type FixedMenuProps = {
  enabled: boolean
  editor: Editor
}

const FixedMenu = ({ enabled = true, editor }: FixedMenuProps) => {
  return (
    <div
      className={cn(
        'flex items-center bg-accent rounded-lg rounded-b-none mb-0 divide-x divide-neutral-600',
        editor.isFocused ? 'mb-0' : '',
        enabled ? '' : 'hidden'
      )}
    >
      <div className="flex items-center">
        <BubbleButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          data-active={editor.isActive('bold')}
          aria-label={
            editor.isActive('bold')
              ? t('editor:remove.bold')
              : t('editor:add.bold')
          }
          data-first-fixed
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
    </div>
  )
}

export { FixedMenu }
