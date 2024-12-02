import { Player } from "./player";
import { GameType, Session } from "./session";
import { Story } from "./story";

export interface ServerToClientEvents {
  // Eventos de sala
  '/room/players': (players?: Player[]) => void;
  '/room/revealed': (revealed?: boolean) => void;
  '/room/info': (roomData: Session) => void;
  '/room/story/updated': (story: Story) => void;
  // Eventos de jogador
  '/room/player/voted': (vote: string | null) => void;
  // Eventos de erro
  'error': (errorData: {
    code: string;
    message: string;
  }) => void;
}

// Definição dos tipos de eventos do cliente para o servidor
export interface ClientToServerEvents {
  // Eventos de sala
  '/room/join': (roomData: {
    roomId: string;
    userId: string;
  }) => void;
  '/room/leave': (roomData: {
    roomId: string;
    userId: string;
  }) => void;
  '/room/reveal': (roomId: string, revealed: boolean) => void;
  '/room/game-type/update': (roomId: string, gameType: GameType) => void;
  // Eventos do jogador na sala
  '/room/player/vote': (data: {
    roomId: string;
    vote: string | null;
  }) => void;
  '/room/select-story': (data: {
    storyId: string;
    roomId: string;
  }) => void;
  '/room/deselect-story': (data: {
    roomId: string;
  }) => void;
  '/room/story/submit-score': (data: {
    roomId: string;
    storyId: string;
    score: string;
  }) => void;

  // Eventos de jogador
  'player:setName': (name: string) => void;
}
