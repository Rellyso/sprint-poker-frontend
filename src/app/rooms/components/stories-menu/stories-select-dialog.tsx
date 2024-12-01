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
import { ArrowRight, MoveRight, Trash } from 'lucide-react'

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

  const { data: stories } = useQuery({
    queryKey: ['stories', roomId],
    queryFn: async () => {
      const response = await api.get<Story[]>(`/api/sessions/${roomId}/stories`)

      return response.data
    },
  })

  const showEmptyStoriesMessage = stories?.length === 0 && !isOpenCreateForm

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
    console.log(story)
    onDismiss()
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
        {showEmptyStoriesMessage && (
          <Button
            variant="link"
            onClick={() => setIsOpenCreateForm(!isOpenCreateForm)}
          >
            Nenhuma história adicionada, clique aqui para adicionar uma agora
          </Button>
        )}

        {isOpenCreateForm && <CreateStoryForm onSubmit={handleCreateStory} />}

        {stories && stories.length > 0 && (
          <div className="flex flex-col gap-2 w-full">
            {stories.map((story) => (
              <div
                key={story._id}
                onClick={() => handleSelectStory(story)}
                className="flex gap-2"
              >
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
