import { useState } from 'react'
import { StoriesSelectDialog } from './stories-select-dialog'
import { Button } from '@/components/ui/button'
import { BookText, Replace } from 'lucide-react'
import { useRoom } from '../../providers/room-provider'
import { AddUpdateScore } from './add-update-score'

export function StoriesMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { roomInfo, selectedStory, submitScore } = useRoom()
  const hasStorySelected = !!selectedStory?._id

  const handleSubmitScore = (score: string) => {
    if (!roomInfo?.selected_story) return
    submitScore(score)
  }

  return (
    <div className="flex items-center gap-2 border-border w-full border p-1 rounded-md">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        {hasStorySelected ? <Replace /> : <BookText />}
      </Button>

      {!hasStorySelected && (
        <span className="text-muted-foreground">
          Nenhuma história selecionada
        </span>
      )}

      {hasStorySelected && (
        <>
          <div className="flex gap-2 text-sm text-muted-foreground">
            <a href={selectedStory?.link} target="_blank" rel="noreferrer">
              <span className="underline">{selectedStory?.code}</span>
            </a>
            {' - '}
            {selectedStory?.name}
          </div>

          <AddUpdateScore
            score={selectedStory?.score}
            onSubmit={handleSubmitScore}
          />
        </>
      )}

      {isOpen && (
        <StoriesSelectDialog
          isOpen={isOpen}
          onDismiss={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
