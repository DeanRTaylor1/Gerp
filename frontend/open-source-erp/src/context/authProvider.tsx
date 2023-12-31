import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { AuthContextType } from './useAuth';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload, UserResponse } from '../axios';
import { useUserApi } from '../hooks/useUserApi';
import { handleApiError } from '../utils/error';
import { useToast } from '../hooks/useToast';
import useTranslator from '../hooks/useTranslator';

export const AuthContext = createContext<AuthContextType | null>(null);

const useAuthProvider = (): AuthContextType => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [payload, setPayload] = useState<JwtPayload>({} as JwtPayload);
  const [user, setUser] = useState<UserResponse>({} as UserResponse);
  const userApi = useUserApi();
  const showToast = useToast();
  const translator = useTranslator();

  const getUser = useCallback(
    async (userId: number) => {
      try {
        const response = await userApi.usersUserIdGet(userId);
        if (response.data.data) {
          console.log({ user: response.data.data });
          setUser(response.data.data);
        }
      } catch (error) {
        handleApiError(error, showToast, translator);
        logout();
      }
    },
    [userApi]
  );

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        setAuthToken(token);
        setAuthenticated(true);
        setPayload(decoded);
        getUser(decoded.user_id);
      } else {
        logout();
      }
    }
    setLoading(false);
  }, [userApi, getUser]);

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
    setPayload({} as JwtPayload);
  };

  return {
    authToken,
    payload,
    login,
    logout,
    authenticated,
    loading,
    user,
  };
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
