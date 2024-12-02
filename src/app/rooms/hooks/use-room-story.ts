import { Story } from "@/domain/story";
import api from "@/services/api";
import SocketService from "@/services/socket";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useRoomStory(socket: SocketService, roomId: string, selected_story?: string | null) {
  const hasStorySelected = !!selected_story
  
  const { data: selectedStory, refetch } = useQuery({
    queryKey: ['stories', selected_story],
    queryFn: async () => {
      const response = await api.get<Story>(
        `/api/stories/${selected_story}`
      )

      return response.data
    },
    enabled: hasStorySelected,
  })

  
  function selectStory(storyId: string) {
    socket.emit('/room/select-story', {
      roomId,
      storyId,
    })
  }

  function deselectStory() {
    socket.emit('/room/deselect-story', {
      roomId,
    })
  }

  function submitScore(score: string) {
    if (!selected_story) return
    socket.emit('/room/story/submit-score', {
      roomId,
      storyId: selected_story,
      score,
    })
  }

  useEffect(() => {
    socket.on('/room/story/updated', () => {
      refetch()
    })

    return () => {
      socket.off('/room/story/updated')
    }
    
  }, [])

  return {
    selectStory,
    deselectStory,
    selectedStory,
    submitScore,
  }
}