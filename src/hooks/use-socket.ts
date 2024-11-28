import SocketService from "@/services/socket"

export const useSocket = () => {
  return SocketService.getInstance()
}