import { Header } from '@/components/header'
import { CommandsMenu } from './components/commands-menu'
import { useEffect, useState } from 'react'
import { useSocket } from '@/hooks/use-socket'
import { useParams } from 'react-router-dom'
import { ChoiceVoteMenu } from './components/choice-vote-menu'
import { PlayerVotes } from './components/player-votes'
import { useAuth } from '@/hooks/use-auth'

export interface Player {
  userId: string
  name: string
  email: string
}

export function RoomPage() {
  const { session } = useAuth()
  const userId = session?.user.id
  const socket = useSocket()
  const { roomId } = useParams()
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    // Listeners de eventos de sala

    if (roomId && userId) {
      socket.emit('join-room', { userId, roomId })
    }

    socket.on('user-joined', (user) => {
      // Lógica de atualização de usuários
      setPlayers((prevUsers) => {
        // Verifica se usuário já existe
        const existingUserIndex = prevUsers.findIndex(
          (u) => u.userId === user.userId,
        )

        if (existingUserIndex === -1) {
          // Adiciona novo usuário
          return [...prevUsers, user]
        }

        // Se já existe, mantém o array como está
        return prevUsers
      })
    })

    socket.on('users-online', (users) => {
      // Atualização completa de usuários
      console.log(users)
      setPlayers(users)
    })

    return () => {
      // Limpa listeners
      socket.off('user-joined')
      socket.off('users-online')
    }
  }, [roomId, userId])

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Envia evento de desconexão
      socket.emit('leave-room', roomId);
    };

    // Adiciona listener para antes de fechar a aba
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Limpa listener ao desmontar componente
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [roomId]);

  console.log(players)

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="container space-y-4 mx-auto px-4 pt-6">
        <CommandsMenu />
        <ChoiceVoteMenu />
        <PlayerVotes players={players} />
      </div>
    </div>
  )
}
