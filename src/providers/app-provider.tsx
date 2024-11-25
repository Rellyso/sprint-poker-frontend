import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from './auth-provider';
import { useEffect } from 'react';
import { useSocket } from '@/hooks/use-socket';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useSocket()

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })

    return () => {
      socket.off('connect')
    }
  }, [])

  return (
    <CookiesProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </CookiesProvider>
  );
};
