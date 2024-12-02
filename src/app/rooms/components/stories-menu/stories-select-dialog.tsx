import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CreateStoryForm } from './create-story-form'
import { useState } from 'react'
import { CreateStorySchema } from '@/schemas/create-story'
import api from '@/services/api'
import { isAxiosError } from 'axios'
import { useToast } from '@/hooks/use-toast'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Story } from '@/domain/story'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash } from 'lucide-react'
import { useRoom } from '../../providers/room-provider'

interface StoriesSelectDialogProps {
  isOpen: boolean
  onDismiss: () => void
}

export function StoriesSelectDialog({
  isOpen,
  onDismiss,
}: StoriesSelectDialogProps) {
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false)
  const { toast } = useToast()
  const { roomId } = useParams()
  const { selectStory, roomInfo } = useRoom()

  const { data: stories, refetch: refetchStories } = useQuery({
    queryKey: ['stories', roomId],
    queryFn: async () => {
      const response = await api.get<Story[]>(`/api/sessions/${roomId}/stories`)

      return response.data
    },
  })

  const handleCreateStory = async (data: CreateStorySchema) => {
    try {
      const submitData = {
        ...data,
        sessionToken: roomId,
      }

      const response = await api.post<CreateStorySchema>(
        '/api/stories',
        submitData
      )

      setIsOpenCreateForm(false)
      toast({
        description: `História ${response.data.code} criada com sucesso`,
        variant: 'default',
      })
      refetchStories()
    } catch (err) {
      const isAxiosErr = isAxiosError(err)
      if (isAxiosErr) {
        toast({
          description: err.response?.data.message,
          variant: 'destructive',
        })
      }
    }
  }

  const handleSelectStory = (story: Story) => {
    selectStory(story._id)
    onDismiss()
  }

  const handleDeleteStory = async (story: Story) => {
    try {
      await api.delete(`/api/stories/${story._id}`)
      if (roomInfo?.selected_story === story._id) {
        selectStory('')
      }
      toast({
        description: `História ${story.code} deletada com sucesso`,
        variant: 'default',
      })
      refetchStories()
    } catch (err) {
      const isAxiosErr = isAxiosError(err)
      if (isAxiosErr) {
        toast({
          description: err.response?.data.message,
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onDismiss}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecione uma história</DialogTitle>
          <DialogDescription>
            Adicione suas histórias para salvar a pontuação escolhida!
          </DialogDescription>
        </DialogHeader>
        <div className="flex">
          <Button
            size="sm"
            onClick={() => setIsOpenCreateForm(!isOpenCreateForm)}
          >
            <Plus /> Adicionar
          </Button>
        </div>

        {isOpenCreateForm && (
          <CreateStoryForm
            isOpen={isOpenCreateForm}
            onDismiss={() => setIsOpenCreateForm(false)}
            onSubmit={handleCreateStory}
          />
        )}

        {stories && stories.length > 0 && (
          <div className="flex flex-col gap-2 w-full">
            {stories.map((story) => (
              <div key={story._id} className="flex gap-2">
                <p
                  onClick={() => handleSelectStory(story)}
                  className="hover:bg-muted cursor-pointer items-center border border-border rounded-md w-full py-2 px-2 flex gap-2 text-sm text-foreground"
                >
                  {story.code} - {story.name}
                </p>
                <div className="flex gap-2 items-center">
                  {story.score && (
                    <Badge className="justify-center items-center">
                      {story.score}
                    </Badge>
                  )}

                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-200"
                    onClick={() => handleDeleteStory(story)}
                  >
                    <Trash className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
