import { useContext } from 'react';
import { AuthContext } from './authProvider';
import { JwtPayload, UserResponse } from '../axios';

export interface AuthContextType {
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
  authenticated: boolean;
  loading: boolean;
  payload: JwtPayload;
  user: UserResponse;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
