import { useContext } from 'react';
import { AuthContext } from './authProvider';

export interface AuthContextType {
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
  authenticated: boolean;
  loading: boolean;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
