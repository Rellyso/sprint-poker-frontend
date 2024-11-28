import { Player } from '@/domain/player'
import { useAuth } from '@/hooks/use-auth'
import { useSocket } from '@/hooks/use-socket'
import { createContext, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRoomPlayers } from '../hooks/use-room-players'
import { GameType, Session } from '@/domain/session'
import { useRoomInfo } from '../hooks/use-room-info'

interface RoomContextProps {
  players: Player[]
  player?: Player
  roomInfo?: Session
  changeGameType: (gameType: GameType) => void
  changeVotesAreRevealed: (votesIsRevealed: boolean) => void
  submitVote: (vote: string) => void
}

const RoomContext = createContext<RoomContextProps>({
  players: [],
  player: undefined,
  changeGameType: () => {},
  changeVotesAreRevealed: () => {},
  submitVote: () => {},
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
  const { submitVote, changeVotesAreRevealed, roomInfo, changeGameType } =
    useRoomInfo(socket, roomId as string, player)

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
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}

export const useRoom = () => {
  return useContext(RoomContext)
}
