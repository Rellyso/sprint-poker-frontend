import { Player } from "@/domain/player"
import SocketService from "@/services/socket"
import { useEffect, useState } from "react"

export function useRoomPlayers(socket: SocketService, roomId: string, userId: string) {
  const [players, setPlayers] = useState<Player[]>([])
  const player = players.find(player => player.userId === userId)

  useEffect(() => {
    if (roomId && userId) {
      socket.emit('/room/join', { userId, roomId })
    }

    socket.on('/room/players', (players) => {
      setPlayers(players || [])
    })

    return () => {
      socket.off('/room/players')
    }
  }, [roomId, userId])

  return {
    player,
    players,
  }
}