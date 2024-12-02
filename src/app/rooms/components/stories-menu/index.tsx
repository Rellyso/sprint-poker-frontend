import { useState } from 'react'
import { StoriesSelectDialog } from './stories-select-dialog'
import { Button } from '@/components/ui/button'
import { BookText, Replace } from 'lucide-react'
import { useRoom } from '../../providers/room-provider'
import { useQuery } from '@tanstack/react-query'
import api from '@/services/api'
import { Story } from '@/domain/story'

export function StoriesMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { roomInfo } = useRoom()
  const hasStorySelected = !!roomInfo?.selected_story

  const { data } = useQuery({
    queryKey: ['stories', roomInfo?.selected_story],
    queryFn: async () => {
      const response = await api.get<Story>(
        `/api/stories/${roomInfo?.selected_story}`
      )

      return response.data
    },
    enabled: hasStorySelected,
  })

  return (
    <div className="flex items-center gap-2 border-border w-full border p-1 rounded-md">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        {hasStorySelected ? <Replace /> : <BookText />}
      </Button>

      {hasStorySelected && (
        <div className="flex gap-2 text-sm text-muted-foreground">
          <a href={data?.link} target="_blank" rel="noreferrer">
            <span className="underline">{data?.code}</span>
          </a>
          {' - '}
          {data?.name}
        </div>
      )}
      {!hasStorySelected && (
        <span className="text-muted-foreground">
          Nenhuma história selecionada
        </span>
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
