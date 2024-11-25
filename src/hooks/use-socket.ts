import { socket } from "@/services/socket"
import { useState } from "react"

export const useSocket = () => {
  const [socketInstance] = useState(socket())

  return socketInstance
}