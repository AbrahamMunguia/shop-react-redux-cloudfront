// AuthContext.tsx
import axios from 'axios';
import {
    createContext,
    useContext,
    useMemo,
    useState,
} from 'react';
import API_PATHS from '~/constants/apiPaths';

type AuthContextType = {
    authenticated: boolean;
    login: (
        user: string,
        pass: string
    ) => Promise<boolean>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [authenticated, setAuthenticated] = useState(() => {
        return Boolean(localStorage.getItem('basic-auth'));
    });

    const login = async (username: string, password: string) => {
        try {
            const loginUrl = API_PATHS.cart;

            const response = await axios.get(loginUrl, {
                auth: { username, password },
            });

            if (response.status === 200) {
                localStorage.setItem(
                    'basic-auth',
                    btoa(`${username}:${password}`)
                );
                setAuthenticated(true);
                return true;
            }

            return false;
        } catch {
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('basic-auth');
        setAuthenticated(false);
    };

    const value = useMemo(
        () => ({
            authenticated,
            login,
            logout,
        }),
        [authenticated],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            'useAuth must be used within AuthProvider',
        );
    }

    return context;
}