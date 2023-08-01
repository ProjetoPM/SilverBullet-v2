import { cn } from '@/lib/utils'
import { BubbleMenu as _BubbleMenu, Editor } from '@tiptap/react'
import { Buttons } from './Buttons'
import { hideOnEsc } from './hideOnEsc'

interface BaseButtonProps {
  editor: Editor
  className?: string
  isFixed: boolean
  setFixed: () => void
}

const BubbleMenu = ({
  isFixed,
  editor,
  className,
  setFixed
}: BaseButtonProps) => {
  return (
    <_BubbleMenu
      className={cn(
        'flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-lg divide-x divide-neutral-600 max-w-[400px]',
        className,
        isFixed ? '' : 'hidden'
      )}
      tippyOptions={{
        duration: 100,
        appendTo: 'parent',
        plugins: [hideOnEsc],
        maxWidth: 400
      }}
      editor={editor}
    >
      <Buttons editor={editor} isFixed={isFixed} setFixed={setFixed} />
    </_BubbleMenu>
  )
}

export { BubbleMenu }
