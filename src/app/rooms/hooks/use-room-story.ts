import SocketService from "@/services/socket";

export function useRoomStory(socket: SocketService, roomId: string) {
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

  return {
    selectStory,
    deselectStory,
  }
}