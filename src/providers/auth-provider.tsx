import { LoginSuccessResponse } from "@/domain/login";
import { User } from "@/domain/user";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { isAxiosError } from "axios";
import { createContext, useState } from "react";
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast()
  const [session, setSession] = useState<Session | null>(null)
  const [, setCookie] = useCookies(['token'])

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post<LoginSuccessResponse>('/api/auth/login', { email, password })

      if (response.data.token) {
        setCookie('token', response.data.token, { path: '/' })
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      }

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
      if (!err) return
      toast({
        description: error.response?.data.message,
        variant: 'destructive',
      })
    }
  }

  const signOut = async () => {
    setSession(null)
    setCookie('token', '', { path: '/' })
    delete api.defaults.headers.common['Authorization']
  }

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