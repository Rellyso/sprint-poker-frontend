import { Header } from "@/components/header";
import { CommandsMenu } from "./components/commands-menu";
import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/use-socket";
import { useParams } from "react-router-dom";

interface UserInRoom {
  userId: string;
  name: string;
  email: string;
}


export function RoomPage() {
  const socket = useSocket()
  const { roomId } = useParams()
  const [roomUsers, setRoomUsers] = useState<UserInRoom[]>([]);

  useEffect(() => {
    // Listeners de eventos de sala

    if (roomId) {
      socket.emit('join-room', roomId)
    }

    socket.on('user-joined', (user) => {
      // Lógica de atualização de usuários
      setRoomUsers(prevUsers => {
        // Verifica se usuário já existe
        const existingUserIndex = prevUsers.findIndex(u => u.userId === user.userId);

        if (existingUserIndex === -1) {
          // Adiciona novo usuário
          return [...prevUsers, user];
        }

        // Se já existe, mantém o array como está
        return prevUsers;
      });
    });

    socket.on('room-users', (users) => {
      // Atualização completa de usuários
      setRoomUsers(users);
    });

    return () => {
      // Limpa listeners
      socket.off('user-joined');
      socket.off('room-users');
    };
  }, []);

  console.log(roomUsers);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-6">
        <CommandsMenu />
        {roomUsers.map((user) => (
          <div key={user.userId}>{user.name}</div>
        ))}
      </div>
    </div>
  )
}