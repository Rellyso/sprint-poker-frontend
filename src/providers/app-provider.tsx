import { CookiesProvider } from 'react-cookie'
import { AuthProvider } from './auth-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/services/query-client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CookiesProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthProvider>
    </CookiesProvider>
  )
}
