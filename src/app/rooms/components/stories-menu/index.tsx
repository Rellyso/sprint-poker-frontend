import { useState } from 'react'
import { StoriesSelectDialog } from './stories-select-dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function StoriesMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center gap-2 border-border w-full border p-1 rounded-md">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <Plus />
      </Button>

      <p className="text-sm text-muted-foreground">
        Nenhuma história selecionada
      </p>
      {isOpen && (
        <StoriesSelectDialog
          isOpen={isOpen}
          onDismiss={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
