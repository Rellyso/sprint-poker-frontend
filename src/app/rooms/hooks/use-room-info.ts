import { Player } from "@/domain/player"
import { GameType, Session } from "@/domain/session"
import SocketService from "@/services/socket"
import { useEffect, useState } from "react"

export function useRoomInfo(socket: SocketService, roomId: string, player?: Player) {
  const [roomInfo, setRoomInfo] = useState<Session | undefined>()

  const submitVote = (receivedVote: string) => {
    if (!player) return

    const _vote = receivedVote === player.vote ? null : receivedVote

    socket.emit('/room/player/vote', { roomId: roomId as string, vote: _vote })
  }

  const changeVotesAreRevealed = (revealed: boolean) => {
    if (!roomId) return
    socket.emit('/room/reveal', roomId, revealed)
  }

  const changeGameType = (gameType: GameType) => {
    if (!roomId) return
    socket.emit('/room/game-type/update', roomId, gameType)
  }

  useEffect(() => {
    if (roomId) {
      socket.on('/room/info', (info) => {
        console.log(info)
        if (info !== undefined) {
          setRoomInfo(info)
        }
      })
    }

    return () => {
      socket.off('/room/info')
    }

  }, [socket])

  return {
    submitVote,
    roomInfo,
    changeVotesAreRevealed,
    changeGameType,
  }
}