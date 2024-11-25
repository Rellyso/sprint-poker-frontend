import { socket } from "@/services/socket";
import React, { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext({
  socket: socket()
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socketInstance] = useState(socket())

  useEffect(() => {
    socketInstance.connect()

    return () => {
      socketInstance.disconnect();
    }
  }, [socketInstance]);

  return <SocketContext.Provider value={{ socket: socketInstance }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
