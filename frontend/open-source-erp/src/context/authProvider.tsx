import { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType } from './useAuth';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../axios';

export const AuthContext = createContext<AuthContextType | null>(null);

const useAuthProvider = (): AuthContextType => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [payload, setPayload] = useState<JwtPayload>({});

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      if (decoded?.exp && decoded.exp * 1000 > Date.now()) {
        setAuthToken(token);
        setAuthenticated(true);
        console.log({ decoded });
        setPayload(decoded);
      } else {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string): void => {
    localStorage.setItem('access_token', token);
    setAuthToken(token);
    setAuthenticated(true);
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    console.log({ decoded });
    setPayload(decoded);
  };

  const logout = (): void => {
    localStorage.removeItem('access_token');
    setAuthToken(null);
    setAuthenticated(false);
    setPayload({});
  };

  return {
    authToken,
    payload,
    login,
    logout,
    authenticated,
    loading,
  };
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
