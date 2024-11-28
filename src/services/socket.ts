import { ClientToServerEvents, ServerToClientEvents } from "@/domain/socket";
import { Cookies } from "react-cookie";
import { io, Socket } from "socket.io-client";

interface SocketOptions {
  token?: string;
}

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private options: SocketOptions = {};

  private constructor() { }
  // Singleton para garantir uma única instância
  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  // Configuração inicial das opções do socket
  public setOptions(options: SocketOptions): void {
    this.options = options;
  }

  // Método para inicializar a conexão do socket
  public connect(): Socket {
    if (this.socket) {
      if (this.socket.connected) {
        console.log("Socket already connected");
        return this.socket;
      }
      console.log("Socket exists but not connected, attempting to reconnect...");
    }

    const cookies = new Cookies();
    const token = this.options.token || cookies.get("sprint-poker.token");

    this.socket = io(import.meta.env.VITE_API_URL!, {
      auth: { token },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupErrorHandlers();
    return this.socket;
  }

  // Configuração de handlers de erro e reconexão
  private setupErrorHandlers(): void {
    if (!this.socket) return;

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log(`Reconnected to socket after ${attemptNumber} attempts`);
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('Socket reconnection error:', error);
    });
  }

  // Método para desconectar o socket
  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Método genérico para emitir eventos
  public emit<T extends keyof ClientToServerEvents>(
    event: T,
    ...args: Parameters<ClientToServerEvents[T]>
  ): void {
    this.ensureConnection().emit(event as string, ...args);
  }

  // Utilitário para garantir que temos uma conexão antes de emitir eventos
  private ensureConnection(): Socket {
    if (!this.socket) {
      return this.connect();
    }
    return this.socket;
  }

  // Método genérico para adicionar listeners de eventos
  public on<T extends keyof ServerToClientEvents>(
    event: T,
    callback: ServerToClientEvents[T]
  ): void {
    const socket = this.ensureConnection();
    socket.off(event as string); // Remove qualquer listener anterior para o mesmo evento
    socket.on(event as string, callback);
  }

  // Método para remover listeners de eventos
  public off<T extends keyof ServerToClientEvents>(
    event: T,
  ): void {
    this.ensureConnection().off(event as string);
  }

  // Método para verificar estado da conexão
  public isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

}

export default SocketService;