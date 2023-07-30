import { BubbleMenu, Editor } from '@tiptap/react'
import { Bold, Italic, Strikethrough } from 'lucide-react'
import { BubbleButton } from './BubbleButton'

interface BaseButtonProps {
  editor: Editor
  children?: React.ReactNode
}

export const BaseBubbleMenu = ({ editor, children }: BaseButtonProps) => {
  return (
    <BubbleMenu
      className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-lg border"
      editor={editor}
    >
      <BubbleButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        data-active={editor.isActive('bold')}
      >
        <Bold className="w-4 h-4" />
      </BubbleButton>
      <BubbleButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        data-active={editor.isActive('italic')}
      >
        <Italic className="w-4 h-4" />
      </BubbleButton>
      <BubbleButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        data-active={editor.isActive('strike')}
        data-last
      >
        <Strikethrough className="w-4 h-4" />
      </BubbleButton>
      {children}
    </BubbleMenu>
  )
}
