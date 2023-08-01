import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/react'
import { Buttons } from './Buttons'

type FixedMenuProps = {
  editor: Editor
  isFixed: boolean
  setFixed: () => void
}

const FixedMenu = ({ editor, isFixed, setFixed }: FixedMenuProps) => {
  return (
    <div
      className={cn(
        'flex items-center bg-accent rounded-lg rounded-b-none mb-0 divide-x divide-neutral-300 dark:divide-neutral-600 overflow-x-auto',
        editor.isFocused ? 'mb-0' : '',
        isFixed ? '' : 'hidden'
      )}
    >
      <Buttons editor={editor} isFixed={isFixed} setFixed={setFixed} />
    </div>
  )
}

export { FixedMenu }
