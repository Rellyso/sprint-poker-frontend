import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from './auth-provider';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CookiesProvider>
      <AuthProvider>{children}</AuthProvider>
    </CookiesProvider>
  );
};
