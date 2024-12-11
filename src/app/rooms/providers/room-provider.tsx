import { Player } from '@/domain/player'
import { useAuth } from '@/hooks/use-auth'
import { useSocket } from '@/hooks/use-socket'
import { createContext, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRoomPlayers } from '../hooks/use-room-players'
import { GameType, Session } from '@/domain/session'
import { useRoomInfo } from '../hooks/use-room-info'
import { useRoomStory } from '../hooks/use-room-story'
import { Story } from '@/domain/story'

interface RoomContextProps {
  players: Player[]
  player?: Player
  roomInfo?: Session
  selectedStory?: Story
  changeGameType: (gameType: GameType) => void
  changeVotesAreRevealed: (votesIsRevealed: boolean) => void
  resetVotes: () => void
  selectStory: (storyId: string) => void
  deselectStory: (storyId: string) => void
  submitVote: (vote: string) => void
  submitScore: (score: string) => void
}

const RoomContext = createContext<RoomContextProps>({
  players: [],
  player: undefined,
  selectedStory: undefined,
  changeGameType: () => {},
  changeVotesAreRevealed: () => {},
  submitVote: () => {},
  resetVotes: () => {},
  selectStory: () => {},
  deselectStory: () => {},
  submitScore: () => {},
})

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const { session } = useAuth()
  const userId = session?.user.id
  const socket = useSocket()
  const { roomId } = useParams()
  const { player, players } = useRoomPlayers(
    socket,
    roomId as string,
    userId as string
  )
  const {
    submitVote,
    changeVotesAreRevealed,
    roomInfo,
    changeGameType,
    resetVotes,
  } = useRoomInfo(socket, roomId as string, player)

  const { selectStory, deselectStory, selectedStory, submitScore } =
    useRoomStory(socket, roomId as string, roomInfo?.selected_story)

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (roomId && userId) {
        socket.emit('/room/leave', { userId, roomId })
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [roomId, userId])

  return (
    <RoomContext.Provider
      value={{
        players,
        player,
        roomInfo,
        submitVote,
        changeVotesAreRevealed,
        changeGameType,
        selectStory,
        deselectStory,
        selectedStory,
        submitScore,
        resetVotes,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}

export const useRoom = () => {
  return useContext(RoomContext)
}
