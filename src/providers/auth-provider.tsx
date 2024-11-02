import { LoginSuccessResponse } from "@/domain/login";
import { User } from "@/domain/user";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { isAxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
interface Session {
  token: string
  user: User
}

export interface AuthContextProps {
  session?: Session | null
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  signIn: async () => { },
  signOut: async () => { },
  session: null
})

const TOKEN_COOKIE = 'sprint-poker.token'
const SESSION_COOKIE = 'sprint-poker.session'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const [session, setSession] = useState<Session | null>(null)
  const [
    { [TOKEN_COOKIE]: tokenCookie, [SESSION_COOKIE]: sessionCookie },
    setCookie
  ] = useCookies([TOKEN_COOKIE, SESSION_COOKIE])

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post<LoginSuccessResponse>('/api/auth/login', { email, password })

      if (response.data.token) {
        setCookie(TOKEN_COOKIE, response.data.token, { path: '/' })
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      }

      const session: Session = {
        token: response.data.token,
        user: {
          name: response.data.name,
          email: response.data.email,
          id: response.data.userId
        }
      }
      const stringSession = JSON.stringify(session)
      setCookie(SESSION_COOKIE, stringSession, { path: '/' })

      setSession({
        token: response.data.token,
        user: {
          name: response.data.name,
          email: response.data.email,
          id: response.data.userId
        }
      })
    } catch (error) {
      const err = isAxiosError(error)
      if (!err) { console.error(err); return }
      toast({
        description: error.response?.data.message,
        variant: 'destructive',
      })
    }
  }

  const signOut = async () => {
    setSession(null)
    setCookie(SESSION_COOKIE, '', { path: '/' })
    setCookie(TOKEN_COOKIE, '', { path: '/' })
    delete api.defaults.headers.common['Authorization']
  }

  useEffect(() => {
    if (sessionCookie) {
      const session = sessionCookie
      setSession(session)
    }
  }, [sessionCookie])

  useEffect(() => {
    if (tokenCookie) {
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenCookie}`
    }
  }, [tokenCookie])

  return (
    <AuthContext.Provider value={{
      isAuthenticated: session?.user.id !== undefined,
      signIn,
      signOut,
      session
    }}>
      {children}
    </AuthContext.Provider>
  )
}