import { createContext, useState, useEffect, ReactNode } from "react";
import { AuthContextType } from "./useAuth";
import { jwtDecode } from "jwt-decode"



export const AuthContext = createContext<AuthContextType | null>(null);

const useAuthProvider = (): AuthContextType => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Initial loading state

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded?.exp && decoded.exp * 1000 > Date.now()) {
                setAuthToken(token);
                setAuthenticated(true);
            } else {
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = (token: string): void => {
        localStorage.setItem('access_token', token);
        console.log({ token })
        setAuthToken(token);
        setAuthenticated(true)
    };

    const logout = (): void => {
        localStorage.removeItem('access_token');
        setAuthToken(null);
        setAuthenticated(false)
    };

    return {
        authToken,
        login,
        logout,
        authenticated,
        loading
    };
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const auth = useAuthProvider();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};