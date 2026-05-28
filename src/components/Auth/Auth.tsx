import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';
import API_PATHS from '~/constants/apiPaths';

export const isAuthenticated = () => {
    const credentials = localStorage.getItem('basic-auth');

    if (!credentials) {
        return false;
    }

    try {
        const { username, password } = JSON.parse(credentials);

        return Boolean(username && password);
    } catch {
        return false;
    }
};

export default function AuthGuard() {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
export const login = async (username: string, password: string) => {
    const loginUrl = `${API_PATHS.cart}`
    const response = await axios.get(loginUrl, { auth: { username, password } })
    if (response.status === 200) {
        localStorage.setItem(
            'basic-auth',
            JSON.stringify({
                username,
                password,
            }),
        );
        return true;
    } else {
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem('basic-auth');
};